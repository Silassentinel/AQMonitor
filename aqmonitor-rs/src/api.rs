//! HTTP layer: routes, error mapping and shared state.

use std::{sync::Arc, time::Duration};

use axum::{
    Json, Router,
    extract::{Query, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tokio::sync::Semaphore;
use tower_http::trace::TraceLayer;

use crate::{
    cache::TtlCache,
    query::{QueryError, parse_location},
    waqi::{Reading, WaqiClient, WaqiError},
};

/// Max distinct cached locations. Bounds memory on the Pi (a reading is well under 2 KiB).
const CACHE_CAPACITY: usize = 512;
/// Max simultaneous upstream calls; beyond this we answer 503 instead of queueing without limit.
const MAX_UPSTREAM_CALLS: usize = 8;

#[derive(Clone)]
pub struct AppState {
    client: Arc<WaqiClient>,
    cache: Arc<TtlCache<Reading>>,
    upstream_slots: Arc<Semaphore>,
}

impl AppState {
    pub fn new(client: WaqiClient, cache_ttl: Duration) -> Self {
        Self {
            client: Arc::new(client),
            cache: Arc::new(TtlCache::new(cache_ttl, CACHE_CAPACITY)),
            upstream_slots: Arc::new(Semaphore::new(MAX_UPSTREAM_CALLS)),
        }
    }
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/api/aqi", get(aqi))
        .fallback(not_found)
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}

async fn health() -> Json<serde_json::Value> {
    Json(json!({ "status": "ok" }))
}

async fn not_found() -> ApiError {
    ApiError::NotFound("no such route")
}

#[derive(Deserialize)]
struct AqiParams {
    city: Option<String>,
    lat: Option<String>,
    lng: Option<String>,
}

#[derive(Serialize)]
struct AqiBody {
    #[serde(flatten)]
    reading: Reading,
    /// `true` when served from the local cache rather than a fresh upstream call.
    cached: bool,
}

async fn aqi(
    State(state): State<AppState>,
    Query(params): Query<AqiParams>,
) -> Result<Json<AqiBody>, ApiError> {
    let location = parse_location(
        params.city.as_deref(),
        params.lat.as_deref(),
        params.lng.as_deref(),
    )?;
    let key = location.cache_key();

    if let Some(reading) = state.cache.get(&key) {
        return Ok(Json(AqiBody {
            reading,
            cached: true,
        }));
    }

    let _slot = state
        .upstream_slots
        .try_acquire()
        .map_err(|_| ApiError::Busy)?;
    match state.client.fetch(&location).await {
        Ok(reading) => {
            state.cache.insert(key, reading.clone());
            Ok(Json(AqiBody {
                reading,
                cached: false,
            }))
        }
        Err(err) => {
            // Detail goes to the log only; clients get a generic message (no upstream internals).
            tracing::warn!(error = %err, "upstream request failed");
            Err(err.into())
        }
    }
}

#[derive(Debug)]
pub enum ApiError {
    BadRequest(String),
    NotFound(&'static str),
    Busy,
    Upstream,
}

impl From<QueryError> for ApiError {
    fn from(e: QueryError) -> Self {
        Self::BadRequest(e.to_string())
    }
}

impl From<WaqiError> for ApiError {
    fn from(e: WaqiError) -> Self {
        match e {
            WaqiError::UnknownStation => Self::NotFound("unknown station"),
            WaqiError::NoData => Self::NotFound("station has no current reading"),
            _ => Self::Upstream,
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            Self::BadRequest(m) => (StatusCode::BAD_REQUEST, m),
            Self::NotFound(m) => (StatusCode::NOT_FOUND, m.to_owned()),
            Self::Busy => (
                StatusCode::SERVICE_UNAVAILABLE,
                "busy, retry shortly".to_owned(),
            ),
            Self::Upstream => (
                StatusCode::BAD_GATEWAY,
                "air quality provider unavailable".to_owned(),
            ),
        };
        (status, Json(json!({ "error": message }))).into_response()
    }
}
