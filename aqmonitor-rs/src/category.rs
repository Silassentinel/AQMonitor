//! AQI → health category.
//!
//! Bands follow the US EPA AQI scale (0–50 good … 301+ hazardous). WAQI reports AQI on this
//! scale; that detail comes from memory, not from the (unreachable from the build sandbox) WAQI
//! docs, so verify it before relying on the labels for health advice. Belgium's own index
//! (BelAQI, IRCEL-CELINE) uses different bands and is deliberately not mixed in here.

use serde::Serialize;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Category {
    Good,
    Moderate,
    UnhealthyForSensitiveGroups,
    Unhealthy,
    VeryUnhealthy,
    Hazardous,
}

impl Category {
    pub fn from_aqi(aqi: u32) -> Self {
        match aqi {
            0..=50 => Self::Good,
            51..=100 => Self::Moderate,
            101..=150 => Self::UnhealthyForSensitiveGroups,
            151..=200 => Self::Unhealthy,
            201..=300 => Self::VeryUnhealthy,
            _ => Self::Hazardous,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn band_edges() {
        let cases = [
            (0, Category::Good),
            (50, Category::Good),
            (51, Category::Moderate),
            (100, Category::Moderate),
            (101, Category::UnhealthyForSensitiveGroups),
            (150, Category::UnhealthyForSensitiveGroups),
            (151, Category::Unhealthy),
            (200, Category::Unhealthy),
            (201, Category::VeryUnhealthy),
            (300, Category::VeryUnhealthy),
            (301, Category::Hazardous),
            (u32::MAX, Category::Hazardous),
        ];
        for (aqi, expected) in cases {
            assert_eq!(Category::from_aqi(aqi), expected, "aqi {aqi}");
        }
    }

    #[test]
    fn serializes_as_snake_case() {
        let s = serde_json::to_string(&Category::UnhealthyForSensitiveGroups).unwrap();
        assert_eq!(s, "\"unhealthy_for_sensitive_groups\"");
    }
}
