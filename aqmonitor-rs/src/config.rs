//! Runtime configuration, read from environment variables.
//!
//! Security notes:
//! - The WAQI token is wrapped in [`Secret`] so it cannot leak through `Debug`/`{:?}` logging.
//! - The default bind address is loopback. Exposing the service to the LAN is an explicit opt-in
//!   (`BIND_ADDR=<pi-lan-ip>:8080`).

use std::{fmt, net::SocketAddr, time::Duration};

const DEFAULT_BIND: &str = "127.0.0.1:8080";
const DEFAULT_CACHE_TTL_SECS: u64 = 600;
/// Lower bound protects the upstream API quota from a misconfigured (tiny) TTL.
const MIN_CACHE_TTL_SECS: u64 = 30;
const MAX_CACHE_TTL_SECS: u64 = 86_400;

/// A string that never prints its contents.
#[derive(Clone)]
pub struct Secret(String);

impl Secret {
    pub fn new(value: impl Into<String>) -> Self {
        Self(value.into())
    }

    /// The only way to read the value; call sites are therefore easy to audit.
    pub fn expose(&self) -> &str {
        &self.0
    }
}

impl fmt::Debug for Secret {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str("Secret(<redacted>)")
    }
}

#[derive(Debug, Clone)]
pub struct Config {
    pub bind: SocketAddr,
    pub token: Secret,
    pub cache_ttl: Duration,
}

#[derive(Debug, PartialEq, Eq)]
pub enum ConfigError {
    MissingToken,
    InvalidBind(String),
    InvalidCacheTtl(String),
}

impl fmt::Display for ConfigError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::MissingToken => write!(f, "WAQI_TOKEN is required and must not be empty"),
            Self::InvalidBind(v) => write!(f, "BIND_ADDR is not a valid socket address: {v:?}"),
            Self::InvalidCacheTtl(v) => write!(
                f,
                "CACHE_TTL_SECS must be an integer between {MIN_CACHE_TTL_SECS} and {MAX_CACHE_TTL_SECS}: {v:?}"
            ),
        }
    }
}

impl std::error::Error for ConfigError {}

impl Config {
    pub fn from_env() -> Result<Self, ConfigError> {
        Self::from_lookup(|key| std::env::var(key).ok())
    }

    /// Testable variant: `lookup` stands in for the process environment.
    pub fn from_lookup(lookup: impl Fn(&str) -> Option<String>) -> Result<Self, ConfigError> {
        let token = lookup("WAQI_TOKEN")
            .map(|t| t.trim().to_owned())
            .filter(|t| !t.is_empty())
            .ok_or(ConfigError::MissingToken)?;

        let bind_raw = lookup("BIND_ADDR").unwrap_or_else(|| DEFAULT_BIND.to_owned());
        let bind = bind_raw
            .parse::<SocketAddr>()
            .map_err(|_| ConfigError::InvalidBind(bind_raw.clone()))?;

        let ttl_secs = match lookup("CACHE_TTL_SECS") {
            None => DEFAULT_CACHE_TTL_SECS,
            Some(raw) => raw
                .trim()
                .parse::<u64>()
                .ok()
                .filter(|s| (MIN_CACHE_TTL_SECS..=MAX_CACHE_TTL_SECS).contains(s))
                .ok_or(ConfigError::InvalidCacheTtl(raw))?,
        };

        Ok(Self {
            bind,
            token: Secret::new(token),
            cache_ttl: Duration::from_secs(ttl_secs),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn cfg(pairs: &[(&str, &str)]) -> Result<Config, ConfigError> {
        let map: HashMap<String, String> = pairs
            .iter()
            .map(|(k, v)| ((*k).to_owned(), (*v).to_owned()))
            .collect();
        Config::from_lookup(|k| map.get(k).cloned())
    }

    #[test]
    fn defaults_to_loopback_and_ten_minute_cache() {
        let c = cfg(&[("WAQI_TOKEN", "abc")]).unwrap();
        assert_eq!(c.bind.to_string(), "127.0.0.1:8080");
        assert!(c.bind.ip().is_loopback());
        assert_eq!(c.cache_ttl, Duration::from_secs(600));
    }

    #[test]
    fn token_is_required_and_trimmed() {
        assert_eq!(cfg(&[]).unwrap_err(), ConfigError::MissingToken);
        assert_eq!(
            cfg(&[("WAQI_TOKEN", "  ")]).unwrap_err(),
            ConfigError::MissingToken
        );
        assert_eq!(
            cfg(&[("WAQI_TOKEN", " abc \n")]).unwrap().token.expose(),
            "abc"
        );
    }

    #[test]
    fn debug_output_never_contains_the_token() {
        let c = cfg(&[("WAQI_TOKEN", "super-secret-token")]).unwrap();
        let printed = format!("{c:?}");
        assert!(!printed.contains("super-secret-token"));
        assert!(printed.contains("redacted"));
    }

    #[test]
    fn rejects_bad_bind_and_out_of_range_ttl() {
        assert!(matches!(
            cfg(&[("WAQI_TOKEN", "a"), ("BIND_ADDR", "nope")]),
            Err(ConfigError::InvalidBind(_))
        ));
        for ttl in ["abc", "0", "29", "86401", "-5"] {
            assert!(
                matches!(
                    cfg(&[("WAQI_TOKEN", "a"), ("CACHE_TTL_SECS", ttl)]),
                    Err(ConfigError::InvalidCacheTtl(_))
                ),
                "ttl {ttl} should be rejected"
            );
        }
    }

    #[test]
    fn lan_bind_is_accepted_when_explicit() {
        let c = cfg(&[("WAQI_TOKEN", "a"), ("BIND_ADDR", "192.168.1.50:9000")]).unwrap();
        assert_eq!(c.bind.port(), 9000);
    }
}
