use std::process::ExitCode;

use aqmonitor::{
    api::{AppState, router},
    config::Config,
    waqi::WaqiClient,
};
use tracing::{error, info, warn};
use tracing_subscriber::EnvFilter;
use url::Url;

const WAQI_BASE_URL: &str = "https://api.waqi.info";

#[tokio::main]
async fn main() -> ExitCode {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info")),
        )
        .init();

    let config = match Config::from_env() {
        Ok(c) => c,
        Err(e) => {
            error!("configuration error: {e}");
            return ExitCode::FAILURE;
        }
    };

    let base = Url::parse(WAQI_BASE_URL).expect("constant URL is valid");
    let client = match WaqiClient::new(base, config.token.clone()) {
        Ok(c) => c,
        Err(e) => {
            error!("cannot build HTTP client: {e}");
            return ExitCode::FAILURE;
        }
    };

    let app = router(AppState::new(client, config.cache_ttl));
    let listener = match tokio::net::TcpListener::bind(config.bind).await {
        Ok(l) => l,
        Err(e) => {
            error!("cannot bind {}: {e}", config.bind);
            return ExitCode::FAILURE;
        }
    };

    if config.bind.ip().is_loopback() {
        info!("listening on {} (loopback only)", config.bind);
    } else {
        warn!(
            "listening on {} — reachable from the network; keep it behind your LAN firewall",
            config.bind
        );
    }

    if let Err(e) = axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
    {
        error!("server error: {e}");
        return ExitCode::FAILURE;
    }
    info!("shut down cleanly");
    ExitCode::SUCCESS
}

/// Resolves on Ctrl-C or SIGTERM (what systemd sends on `stop`).
async fn shutdown_signal() {
    let ctrl_c = async {
        let _ = tokio::signal::ctrl_c().await;
    };
    #[cfg(unix)]
    let terminate = async {
        match tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate()) {
            Ok(mut s) => {
                s.recv().await;
            }
            Err(_) => std::future::pending::<()>().await,
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        () = ctrl_c => {},
        () = terminate => {},
    }
}
