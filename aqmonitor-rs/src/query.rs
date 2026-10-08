//! Validation of untrusted query parameters. Runs before any cache or upstream access.
//!
//! The location ends up as a URL path segment sent to WAQI, so the city allow-list is strict
//! (letters, digits, space and a few punctuation marks) and the segment is additionally
//! percent-encoded by the URL builder in `waqi.rs`.

use std::fmt;

const MAX_CITY_CHARS: usize = 64;

#[derive(Debug, Clone, PartialEq)]
pub enum Location {
    City(String),
    /// Coordinates rounded to 3 decimals (~110 m); used for both the upstream call and cache key.
    Geo {
        lat: f64,
        lng: f64,
    },
}

impl Location {
    /// Stable cache key. Case-insensitive for cities.
    pub fn cache_key(&self) -> String {
        match self {
            Self::City(name) => format!("city:{}", name.to_lowercase()),
            Self::Geo { lat, lng } => format!("geo:{lat:.3}:{lng:.3}"),
        }
    }
}

#[derive(Debug, PartialEq, Eq)]
pub enum QueryError {
    NoLocation,
    Ambiguous,
    InvalidCity,
    InvalidCoordinates,
}

impl fmt::Display for QueryError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(match self {
            Self::NoLocation => "provide either `city` or both `lat` and `lng`",
            Self::Ambiguous => "provide either `city` or `lat`/`lng`, not both",
            Self::InvalidCity => {
                "`city` must be 1-64 characters: letters, digits, spaces and - ' . ,"
            }
            Self::InvalidCoordinates => "`lat` must be within -90..90 and `lng` within -180..180",
        })
    }
}

pub fn parse_location(
    city: Option<&str>,
    lat: Option<&str>,
    lng: Option<&str>,
) -> Result<Location, QueryError> {
    match (city, lat, lng) {
        (Some(_), Some(_), _) | (Some(_), _, Some(_)) => Err(QueryError::Ambiguous),
        (Some(city), None, None) => parse_city(city),
        (None, Some(lat), Some(lng)) => parse_geo(lat, lng),
        (None, Some(_), None) | (None, None, Some(_)) => Err(QueryError::InvalidCoordinates),
        (None, None, None) => Err(QueryError::NoLocation),
    }
}

fn parse_city(raw: &str) -> Result<Location, QueryError> {
    let city = raw.trim();
    let len = city.chars().count();
    let ok = (1..=MAX_CITY_CHARS).contains(&len)
        // "." and ".." are dot-segments in URL paths; require a real letter/digit.
        && city.chars().any(char::is_alphanumeric)
        && city
            .chars()
            .all(|c| c.is_alphanumeric() || matches!(c, ' ' | '-' | '\'' | '.' | ','));
    if ok {
        Ok(Location::City(city.to_owned()))
    } else {
        Err(QueryError::InvalidCity)
    }
}

fn parse_geo(lat: &str, lng: &str) -> Result<Location, QueryError> {
    let parse = |s: &str| s.trim().parse::<f64>().ok().filter(|v| v.is_finite());
    match (parse(lat), parse(lng)) {
        (Some(lat), Some(lng))
            if (-90.0..=90.0).contains(&lat) && (-180.0..=180.0).contains(&lng) =>
        {
            // Round via formatting so the key and the upstream request agree exactly.
            let round = |v: f64| format!("{v:.3}").parse::<f64>().unwrap_or(v);
            Ok(Location::Geo {
                lat: round(lat),
                lng: round(lng),
            })
        }
        _ => Err(QueryError::InvalidCoordinates),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn accepts_plain_and_unicode_cities() {
        for c in [
            "Brussels",
            "  Liège ",
            "Sint-Niklaas",
            "St. John's",
            "Washington, D.C.",
            "Zürich 1",
        ] {
            assert!(
                matches!(parse_location(Some(c), None, None), Ok(Location::City(_))),
                "{c}"
            );
        }
    }

    #[test]
    fn trims_whitespace() {
        assert_eq!(
            parse_location(Some("  Gent "), None, None).unwrap(),
            Location::City("Gent".into())
        );
    }

    #[test]
    fn rejects_injection_shaped_cities() {
        let long = "a".repeat(65);
        for c in [
            "",
            "   ",
            "../etc/passwd",
            "a/b",
            "a?token=x",
            "a#b",
            "a%2Fb",
            "a;b",
            "a\nb",
            "a\0b",
            "<script>",
            "a&b=c",
            "a\\b",
            &long,
            ".",
            "..",
            "...",
            "-",
            "'",
            " . ",
        ] {
            assert_eq!(
                parse_location(Some(c), None, None),
                Err(QueryError::InvalidCity),
                "{c:?}"
            );
        }
    }

    #[test]
    fn max_length_city_is_accepted() {
        assert!(parse_location(Some(&"a".repeat(64)), None, None).is_ok());
    }

    #[test]
    fn geo_valid_and_rounded() {
        let l = parse_location(None, Some("50.84667"), Some("4.35247")).unwrap();
        assert_eq!(
            l,
            Location::Geo {
                lat: 50.847,
                lng: 4.352
            }
        );
        assert_eq!(l.cache_key(), "geo:50.847:4.352");
    }

    #[test]
    fn geo_rejects_out_of_range_nan_and_garbage() {
        for (la, ln) in [
            ("90.001", "0"),
            ("-90.1", "0"),
            ("0", "180.1"),
            ("0", "-181"),
            ("NaN", "0"),
            ("0", "inf"),
            ("abc", "1"),
            ("", "1"),
        ] {
            assert_eq!(
                parse_location(None, Some(la), Some(ln)),
                Err(QueryError::InvalidCoordinates),
                "{la},{ln}"
            );
        }
    }

    #[test]
    fn requires_exactly_one_mode() {
        assert_eq!(
            parse_location(None, None, None),
            Err(QueryError::NoLocation)
        );
        assert_eq!(
            parse_location(Some("a"), Some("1"), Some("1")),
            Err(QueryError::Ambiguous)
        );
        assert_eq!(
            parse_location(Some("a"), Some("1"), None),
            Err(QueryError::Ambiguous)
        );
        assert_eq!(
            parse_location(None, Some("1"), None),
            Err(QueryError::InvalidCoordinates)
        );
        assert_eq!(
            parse_location(None, None, Some("1")),
            Err(QueryError::InvalidCoordinates)
        );
    }

    #[test]
    fn city_cache_key_is_case_insensitive() {
        let a = parse_location(Some("BRUSSELS"), None, None).unwrap();
        let b = parse_location(Some("brussels"), None, None).unwrap();
        assert_eq!(a.cache_key(), b.cache_key());
    }
}
