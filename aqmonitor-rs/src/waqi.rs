//! Client for the WAQI "feed" endpoint (`/feed/<city>/` and `/feed/geo:<lat>;<lng>/`).
//!
//! The response contract below is based on this repository's former TypeScript model classes
//! (`ApiResponse`, `WeatherData`, `Iaqi`, ...) and on recollection of the public docs. It has NOT
//! been verified against the live API (the build sandbox cannot reach aqicn.org). Parsing is
//! therefore deliberately tolerant: every field except `aqi` is optional.
//!
//! Security properties:
//! - The token only travels as a query parameter to the configured base URL; redirects are
//!   disabled so it can never be forwarded elsewhere.
//! - Errors never include the request URL (reqwest embeds it, token included) — see
//!   `without_url()` — and upstream messages are scrubbed of the token before they are logged.
//! - Total timeout, connect timeout and a hard response-size cap bound the cost of one call.

use std::{collections::BTreeMap, fmt, time::Duration};

use serde::Serialize;
use serde_json::Value;
use url::Url;

use crate::{category::Category, config::Secret, query::Location};

const MAX_BODY_BYTES: usize = 256 * 1024;
const MAX_POLLUTANTS: usize = 32;
const MAX_ATTRIBUTIONS: usize = 10;
const MAX_TEXT_CHARS: usize = 200;

#[derive(Debug, Clone, Serialize)]
pub struct Station {
    pub name: Option<String>,
    pub lat: Option<f64>,
    pub lng: Option<f64>,
    pub url: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Attribution {
    pub name: Option<String>,
    pub url: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct Reading {
    pub aqi: u32,
    pub category: Category,
    pub dominant_pollutant: Option<String>,
    pub station: Station,
    pub observed_at: Option<String>,
    /// Individual values (`pm25`, `pm10`, `o3`, `t`, `h`, ...), in the units WAQI reports.
    pub pollutants: BTreeMap<String, f64>,
    /// Data attribution; keep it visible in any UI built on top of this API.
    pub attributions: Vec<Attribution>,
}

#[derive(Debug)]
pub enum WaqiError {
    Transport(String),
    Status(u16),
    TooLarge,
    BadPayload(&'static str),
    UnknownStation,
    /// Station exists but reports no usable AQI right now (WAQI sends `"-"`).
    NoData,
    Rejected(String),
    BadBaseUrl,
}

impl fmt::Display for WaqiError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Transport(e) => write!(f, "transport error: {e}"),
            Self::Status(c) => write!(f, "upstream returned HTTP {c}"),
            Self::TooLarge => write!(f, "upstream response exceeded {MAX_BODY_BYTES} bytes"),
            Self::BadPayload(why) => write!(f, "unexpected upstream payload: {why}"),
            Self::UnknownStation => write!(f, "unknown station"),
            Self::NoData => write!(f, "station has no current AQI"),
            Self::Rejected(m) => write!(f, "upstream rejected the request: {m}"),
            Self::BadBaseUrl => write!(f, "base URL cannot be used as an API root"),
        }
    }
}

impl std::error::Error for WaqiError {}

pub struct WaqiClient {
    http: reqwest::Client,
    base: Url,
    token: Secret,
}

impl WaqiClient {
    pub fn new(base: Url, token: Secret) -> Result<Self, WaqiError> {
        if base.cannot_be_a_base() {
            return Err(WaqiError::BadBaseUrl);
        }
        let http = reqwest::Client::builder()
            .timeout(Duration::from_secs(8))
            .connect_timeout(Duration::from_secs(3))
            .redirect(reqwest::redirect::Policy::none())
            .user_agent(concat!("aqmonitor/", env!("CARGO_PKG_VERSION")))
            .build()
            .map_err(|e| WaqiError::Transport(e.without_url().to_string()))?;
        Ok(Self { http, base, token })
    }

    pub async fn fetch(&self, location: &Location) -> Result<Reading, WaqiError> {
        let url = self.feed_url(location)?;
        let mut resp = self
            .http
            .get(url)
            .send()
            .await
            .map_err(|e| WaqiError::Transport(e.without_url().to_string()))?;

        if !resp.status().is_success() {
            return Err(WaqiError::Status(resp.status().as_u16()));
        }
        if resp
            .content_length()
            .is_some_and(|n| n > MAX_BODY_BYTES as u64)
        {
            return Err(WaqiError::TooLarge);
        }

        let mut body = Vec::new();
        while let Some(chunk) = resp
            .chunk()
            .await
            .map_err(|e| WaqiError::Transport(e.without_url().to_string()))?
        {
            if body.len() + chunk.len() > MAX_BODY_BYTES {
                return Err(WaqiError::TooLarge);
            }
            body.extend_from_slice(&chunk);
        }

        parse_feed(&body).map_err(|e| match e {
            WaqiError::Rejected(msg) => {
                WaqiError::Rejected(msg.replace(self.token.expose(), "<redacted>"))
            }
            other => other,
        })
    }

    fn feed_url(&self, location: &Location) -> Result<Url, WaqiError> {
        let mut url = self.base.clone();
        {
            let mut segments = url.path_segments_mut().map_err(|_| WaqiError::BadBaseUrl)?;
            segments.pop_if_empty().push("feed");
            match location {
                // `push` percent-encodes the segment, so user input cannot add path/query parts.
                Location::City(name) => segments.push(name),
                Location::Geo { lat, lng } => segments.push(&format!("geo:{lat:.3};{lng:.3}")),
            };
            segments.push(""); // trailing slash, as in the WAQI docs
        }
        url.query_pairs_mut()
            .append_pair("token", self.token.expose());
        Ok(url)
    }
}

/// Pure parsing step, separated so it can be unit-tested without a network.
pub fn parse_feed(body: &[u8]) -> Result<Reading, WaqiError> {
    let envelope: Value =
        serde_json::from_slice(body).map_err(|_| WaqiError::BadPayload("not valid JSON"))?;
    let status = envelope
        .get("status")
        .and_then(Value::as_str)
        .ok_or(WaqiError::BadPayload("missing status"))?;
    let data = envelope
        .get("data")
        .ok_or(WaqiError::BadPayload("missing data"))?;

    if status != "ok" {
        let message = data
            .as_str()
            .or_else(|| data.get("message").and_then(Value::as_str))
            .unwrap_or("error");
        return Err(if message.to_lowercase().contains("unknown station") {
            WaqiError::UnknownStation
        } else {
            WaqiError::Rejected(truncate(message))
        });
    }

    let aqi = data
        .get("aqi")
        .and_then(aqi_value)
        .ok_or(WaqiError::NoData)?;

    let city = data.get("city");
    let (lat, lng) = city
        .and_then(|c| c.get("geo"))
        .and_then(Value::as_array)
        .map(|g| (g.first().and_then(number), g.get(1).and_then(number)))
        .unwrap_or((None, None));

    let pollutants = data
        .get("iaqi")
        .and_then(Value::as_object)
        .map(|m| {
            m.iter()
                .filter_map(|(k, v)| Some((truncate(k), v.get("v").and_then(number)?)))
                .take(MAX_POLLUTANTS)
                .collect()
        })
        .unwrap_or_default();

    let attributions = data
        .get("attributions")
        .and_then(Value::as_array)
        .map(|a| {
            a.iter()
                .take(MAX_ATTRIBUTIONS)
                .map(|x| Attribution {
                    name: text(x.get("name")),
                    url: text(x.get("url")),
                })
                .collect()
        })
        .unwrap_or_default();

    let time = data.get("time");
    Ok(Reading {
        aqi,
        category: Category::from_aqi(aqi),
        // WAQI spells this key "dominentpol".
        dominant_pollutant: text(data.get("dominentpol")).or_else(|| text(data.get("dominantpol"))),
        station: Station {
            name: text(city.and_then(|c| c.get("name"))),
            lat,
            lng,
            url: text(city.and_then(|c| c.get("url"))),
        },
        observed_at: text(time.and_then(|t| t.get("iso")))
            .or_else(|| text(time.and_then(|t| t.get("s")))),
        pollutants,
        attributions,
    })
}

/// WAQI sends `aqi` as a number, or as the string `"-"` when a station has no data.
fn aqi_value(v: &Value) -> Option<u32> {
    let n = number(v)?;
    (n.is_finite() && n >= 0.0 && n <= f64::from(u32::MAX)).then(|| n.round() as u32)
}

fn number(v: &Value) -> Option<f64> {
    match v {
        Value::Number(n) => n.as_f64(),
        Value::String(s) => s.trim().parse().ok(),
        _ => None,
    }
    .filter(|n| n.is_finite())
}

fn text(v: Option<&Value>) -> Option<String> {
    v.and_then(Value::as_str).map(truncate)
}

fn truncate(s: &str) -> String {
    s.chars().take(MAX_TEXT_CHARS).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Synthetic fixture shaped after the former TS models; NOT a recording of the live API.
    pub const SAMPLE: &str = r#"{
      "status": "ok",
      "data": {
        "aqi": 42, "idx": 5724,
        "attributions": [{"url": "https://www.irceline.be/", "name": "IRCEL-CELINE"}],
        "city": {"geo": [50.8466, 4.3528], "name": "Brussels", "url": "https://aqicn.org/city/belgium/brussels"},
        "dominentpol": "pm25",
        "iaqi": {"pm25": {"v": 42}, "pm10": {"v": 20.5}, "t": {"v": 14.5}, "h": {"v": "80"}, "x": {"nov": 1}},
        "time": {"s": "2026-10-07 18:00:00", "tz": "+02:00", "v": 1759860000, "iso": "2026-10-07T18:00:00+02:00"},
        "forecast": {"daily": {"pm25": []}}
      }
    }"#;

    #[test]
    fn parses_full_sample() {
        let r = parse_feed(SAMPLE.as_bytes()).unwrap();
        assert_eq!(r.aqi, 42);
        assert_eq!(r.category, Category::Good);
        assert_eq!(r.dominant_pollutant.as_deref(), Some("pm25"));
        assert_eq!(r.station.name.as_deref(), Some("Brussels"));
        assert_eq!(r.station.lat, Some(50.8466));
        assert_eq!(r.observed_at.as_deref(), Some("2026-10-07T18:00:00+02:00"));
        assert_eq!(r.pollutants.get("pm10"), Some(&20.5));
        assert_eq!(
            r.pollutants.get("h"),
            Some(&80.0),
            "numeric strings are accepted"
        );
        assert!(
            !r.pollutants.contains_key("x"),
            "entries without `v` are skipped"
        );
        assert_eq!(r.attributions[0].name.as_deref(), Some("IRCEL-CELINE"));
    }

    #[test]
    fn minimal_payload_only_needs_aqi() {
        let r = parse_feed(br#"{"status":"ok","data":{"aqi":"155"}}"#).unwrap();
        assert_eq!(r.aqi, 155);
        assert_eq!(r.category, Category::Unhealthy);
        assert!(r.station.name.is_none() && r.pollutants.is_empty() && r.attributions.is_empty());
    }

    #[test]
    fn dash_or_missing_aqi_is_no_data() {
        for body in [
            r#"{"status":"ok","data":{"aqi":"-"}}"#,
            r#"{"status":"ok","data":{}}"#,
            r#"{"status":"ok","data":{"aqi":-3}}"#,
            r#"{"status":"ok","data":{"aqi":null}}"#,
        ] {
            assert!(
                matches!(parse_feed(body.as_bytes()), Err(WaqiError::NoData)),
                "{body}"
            );
        }
    }

    #[test]
    fn error_statuses_are_classified() {
        assert!(matches!(
            parse_feed(br#"{"status":"error","data":"Unknown station"}"#),
            Err(WaqiError::UnknownStation)
        ));
        assert!(matches!(
            parse_feed(br#"{"status":"error","data":{"message":"Unknown station"}}"#),
            Err(WaqiError::UnknownStation)
        ));
        assert!(matches!(
            parse_feed(br#"{"status":"error","data":"Invalid key"}"#),
            Err(WaqiError::Rejected(_))
        ));
    }

    #[test]
    fn malformed_payloads_do_not_panic() {
        for body in [
            "",
            "not json",
            "[]",
            "{}",
            r#"{"status":"ok"}"#,
            r#"{"status":5,"data":1}"#,
        ] {
            assert!(parse_feed(body.as_bytes()).is_err(), "{body:?}");
        }
    }

    #[test]
    fn long_upstream_text_is_truncated() {
        let long = "x".repeat(10_000);
        let body = format!(r#"{{"status":"ok","data":{{"aqi":1,"dominentpol":"{long}"}}}}"#);
        let r = parse_feed(body.as_bytes()).unwrap();
        assert_eq!(
            r.dominant_pollutant.unwrap().chars().count(),
            MAX_TEXT_CHARS
        );
    }

    fn client() -> WaqiClient {
        WaqiClient::new(
            Url::parse("https://api.waqi.info").unwrap(),
            Secret::new("tok123"),
        )
        .unwrap()
    }

    #[test]
    fn builds_city_url_with_token_and_encodes_input() {
        let u = client()
            .feed_url(&Location::City("Sint-Niklaas".into()))
            .unwrap();
        assert_eq!(
            u.as_str(),
            "https://api.waqi.info/feed/Sint-Niklaas/?token=tok123"
        );
        let u = client()
            .feed_url(&Location::City("a b/c?d#e".into()))
            .unwrap();
        assert_eq!(u.path(), "/feed/a%20b%2Fc%3Fd%23e/");
        assert_eq!(u.query(), Some("token=tok123"));
    }

    #[test]
    fn builds_geo_url() {
        let u = client()
            .feed_url(&Location::Geo {
                lat: 50.847,
                lng: 4.352,
            })
            .unwrap();
        assert_eq!(u.path(), "/feed/geo:50.847;4.352/");
    }
}
