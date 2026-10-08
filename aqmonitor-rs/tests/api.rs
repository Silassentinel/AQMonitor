//! End-to-end tests: the real router and the real WAQI client, talking to a local mock upstream.
//!
//! The fixture below is synthetic (shaped after the former TS models), not a recording of the
//! live WAQI API — see the note in `src/waqi.rs`.

use std::{
    collections::HashMap,
    net::SocketAddr,
    sync::{
        Arc, Mutex,
        atomic::{AtomicUsize, Ordering},
    },
    time::Duration,
};

use aqmonitor::{
    api::{AppState, router},
    config::Secret,
    query::Location,
    waqi::WaqiClient,
};
use axum::{
    Router,
    body::Body,
    extract::{Path, Query, State},
    http::{Request, StatusCode, header},
    response::{IntoResponse, Response},
    routing::get,
};
use http_body_util::BodyExt;
use tower::ServiceExt;
use url::Url;

const TOKEN: &str = "test-token-s3cr3t";

const BRUSSELS: &str = r#"{"status":"ok","data":{"aqi":42,"idx":5724,
  "attributions":[{"url":"https://www.irceline.be/","name":"IRCEL-CELINE"}],
  "city":{"geo":[50.8466,4.3528],"name":"Brussels","url":"https://aqicn.org/city/belgium/brussels"},
  "dominentpol":"pm25","iaqi":{"pm25":{"v":42},"pm10":{"v":20.5},"t":{"v":14.5}},
  "time":{"s":"2026-10-07 18:00:00","tz":"+02:00","v":1759860000,"iso":"2026-10-07T18:00:00+02:00"}}}"#;

/// (decoded path segment, token query param) of one upstream request.
type SeenRequest = (String, Option<String>);

#[derive(Clone, Default)]
struct Mock {
    hits: Arc<AtomicUsize>,
    elsewhere_hits: Arc<AtomicUsize>,
    seen: Arc<Mutex<Vec<SeenRequest>>>,
}

async fn feed(
    State(m): State<Mock>,
    Path(loc): Path<String>,
    Query(q): Query<HashMap<String, String>>,
) -> Response {
    m.hits.fetch_add(1, Ordering::SeqCst);
    let token = q.get("token").cloned();
    m.seen.lock().unwrap().push((loc.clone(), token.clone()));
    let json = |s: String| ([(header::CONTENT_TYPE, "application/json")], s).into_response();
    match loc.as_str() {
        "nowhere" => json(r#"{"status":"error","data":"Unknown station"}"#.into()),
        "dash" => json(r#"{"status":"ok","data":{"aqi":"-"}}"#.into()),
        "boom" => StatusCode::INTERNAL_SERVER_ERROR.into_response(),
        // A hostile/buggy upstream echoing the caller's token back in its error message.
        "echo" => json(format!(
            r#"{{"status":"error","data":"Invalid key {}"}}"#,
            token.unwrap_or_default()
        )),
        "huge" => json(format!(
            r#"{{"status":"ok","data":{{"aqi":1,"pad":"{}"}}}}"#,
            "x".repeat(300 * 1024)
        )),
        "redirect" => (StatusCode::FOUND, [(header::LOCATION, "/elsewhere")]).into_response(),
        _ => json(BRUSSELS.into()),
    }
}

async fn elsewhere(State(m): State<Mock>) -> StatusCode {
    m.elsewhere_hits.fetch_add(1, Ordering::SeqCst);
    StatusCode::OK
}

async fn spawn_mock() -> (SocketAddr, Mock) {
    let mock = Mock::default();
    let app = Router::new()
        .route("/feed/{loc}/", get(feed))
        .route("/elsewhere", get(elsewhere))
        .with_state(mock.clone());
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let addr = listener.local_addr().unwrap();
    tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
    (addr, mock)
}

fn client_for(base: &str) -> WaqiClient {
    WaqiClient::new(Url::parse(base).unwrap(), Secret::new(TOKEN)).unwrap()
}

async fn app_with_mock() -> (Router, Mock) {
    let (addr, mock) = spawn_mock().await;
    let state = AppState::new(
        client_for(&format!("http://{addr}")),
        Duration::from_secs(600),
    );
    (router(state), mock)
}

async fn call(app: &Router, method: &str, uri: &str) -> (StatusCode, String) {
    let req = Request::builder()
        .method(method)
        .uri(uri)
        .body(Body::empty())
        .unwrap();
    let resp = app.clone().oneshot(req).await.unwrap();
    let status = resp.status();
    let bytes = resp.into_body().collect().await.unwrap().to_bytes();
    (status, String::from_utf8_lossy(&bytes).into_owned())
}

async fn get_json(app: &Router, uri: &str) -> (StatusCode, serde_json::Value) {
    let (status, body) = call(app, "GET", uri).await;
    (
        status,
        serde_json::from_str(&body).unwrap_or(serde_json::Value::Null),
    )
}

#[tokio::test]
async fn city_lookup_returns_reading_and_sends_token_upstream() {
    let (app, mock) = app_with_mock().await;
    let (status, body) = get_json(&app, "/api/aqi?city=Brussels").await;

    assert_eq!(status, StatusCode::OK);
    assert_eq!(body["aqi"], 42);
    assert_eq!(body["category"], "good");
    assert_eq!(body["dominant_pollutant"], "pm25");
    assert_eq!(body["station"]["name"], "Brussels");
    assert_eq!(body["observed_at"], "2026-10-07T18:00:00+02:00");
    assert_eq!(body["pollutants"]["pm10"], 20.5);
    assert_eq!(body["attributions"][0]["name"], "IRCEL-CELINE");
    assert_eq!(body["cached"], false);

    let seen = mock.seen.lock().unwrap();
    assert_eq!(
        seen.as_slice(),
        [("Brussels".to_owned(), Some(TOKEN.to_owned()))]
    );
    assert!(
        !body.to_string().contains(TOKEN),
        "token must not appear in the response"
    );
}

#[tokio::test]
async fn repeat_requests_are_served_from_cache_case_insensitively() {
    let (app, mock) = app_with_mock().await;
    let (_, first) = get_json(&app, "/api/aqi?city=Brussels").await;
    let (_, second) = get_json(&app, "/api/aqi?city=BRUSSELS").await;
    assert_eq!(first["cached"], false);
    assert_eq!(second["cached"], true);
    assert_eq!(second["aqi"], 42);
    assert_eq!(mock.hits.load(Ordering::SeqCst), 1);
}

#[tokio::test]
async fn coordinates_are_rounded_and_sent_as_geo_segment() {
    let (app, mock) = app_with_mock().await;
    let (status, _) = get_json(&app, "/api/aqi?lat=50.84667&lng=4.35247").await;
    assert_eq!(status, StatusCode::OK);
    assert_eq!(mock.seen.lock().unwrap()[0].0, "geo:50.847;4.352");
}

#[tokio::test]
async fn invalid_input_is_rejected_without_touching_upstream() {
    let (app, mock) = app_with_mock().await;
    for uri in [
        "/api/aqi",
        "/api/aqi?city=",
        "/api/aqi?city=..",
        "/api/aqi?city=a%2Fb",
        "/api/aqi?city=a%3Ftoken%3Dx",
        "/api/aqi?city=%3Cscript%3E",
        "/api/aqi?city=Brussels&lat=1&lng=1",
        "/api/aqi?lat=91&lng=0",
        "/api/aqi?lat=0&lng=181",
        "/api/aqi?lat=NaN&lng=0",
        "/api/aqi?lat=1",
        "/api/aqi?city=a&city=b",
    ] {
        let (status, body) = call(&app, "GET", uri).await;
        assert_eq!(status, StatusCode::BAD_REQUEST, "{uri} -> {body}");
    }
    assert_eq!(
        mock.hits.load(Ordering::SeqCst),
        0,
        "upstream must never be called"
    );
}

#[tokio::test]
async fn unknown_station_and_no_data_map_to_404() {
    let (app, _) = app_with_mock().await;
    let (s1, b1) = get_json(&app, "/api/aqi?city=nowhere").await;
    let (s2, b2) = get_json(&app, "/api/aqi?city=dash").await;
    assert_eq!((s1, s2), (StatusCode::NOT_FOUND, StatusCode::NOT_FOUND));
    assert_eq!(b1["error"], "unknown station");
    assert_eq!(b2["error"], "station has no current reading");
}

#[tokio::test]
async fn upstream_failures_become_generic_502_without_leaking_detail() {
    let (app, _) = app_with_mock().await;
    for city in ["boom", "echo", "huge", "redirect"] {
        let (status, body) = call(&app, "GET", &format!("/api/aqi?city={city}")).await;
        assert_eq!(status, StatusCode::BAD_GATEWAY, "{city}");
        assert!(
            !body.contains(TOKEN),
            "{city}: token leaked into response: {body}"
        );
        assert!(
            body.contains("air quality provider unavailable"),
            "{city}: {body}"
        );
    }
}

#[tokio::test]
async fn redirects_are_never_followed() {
    let (app, mock) = app_with_mock().await;
    let (status, _) = call(&app, "GET", "/api/aqi?city=redirect").await;
    assert_eq!(status, StatusCode::BAD_GATEWAY);
    assert_eq!(mock.elsewhere_hits.load(Ordering::SeqCst), 0);
}

#[tokio::test]
async fn client_errors_never_contain_the_token() {
    // 1) upstream echoes the token in its error message
    let (addr, _) = spawn_mock().await;
    let client = client_for(&format!("http://{addr}"));
    let err = client
        .fetch(&Location::City("echo".into()))
        .await
        .unwrap_err();
    assert!(!err.to_string().contains(TOKEN), "{err}");
    assert!(!format!("{err:?}").contains(TOKEN), "{err:?}");

    // 2) connection refused: reqwest would normally embed the full URL (with ?token=) in the error
    let dead = client_for("http://127.0.0.1:1");
    let err = dead
        .fetch(&Location::City("Brussels".into()))
        .await
        .unwrap_err();
    assert!(!err.to_string().contains(TOKEN), "{err}");
    assert!(!format!("{err:?}").contains(TOKEN), "{err:?}");
}

#[tokio::test]
async fn unreachable_upstream_is_502() {
    let state = AppState::new(client_for("http://127.0.0.1:1"), Duration::from_secs(600));
    let (status, body) = call(&router(state), "GET", "/api/aqi?city=Brussels").await;
    assert_eq!(status, StatusCode::BAD_GATEWAY);
    assert!(!body.contains(TOKEN));
}

#[tokio::test]
async fn health_and_routing_edges() {
    let (app, _) = app_with_mock().await;
    assert_eq!(
        get_json(&app, "/health").await,
        (StatusCode::OK, serde_json::json!({"status":"ok"}))
    );
    let (status, body) = get_json(&app, "/nope").await;
    assert_eq!(status, StatusCode::NOT_FOUND);
    assert_eq!(body["error"], "no such route");
    assert_eq!(
        call(&app, "POST", "/api/aqi?city=x").await.0,
        StatusCode::METHOD_NOT_ALLOWED
    );
}

#[tokio::test]
async fn responses_carry_no_permissive_cors_headers() {
    let (app, _) = app_with_mock().await;
    let req = Request::builder()
        .uri("/api/aqi?city=Brussels")
        .header(header::ORIGIN, "https://evil.example")
        .body(Body::empty())
        .unwrap();
    let resp = app.clone().oneshot(req).await.unwrap();
    assert!(
        resp.headers()
            .get(header::ACCESS_CONTROL_ALLOW_ORIGIN)
            .is_none()
    );
}
