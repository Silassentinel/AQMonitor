# BelAQI: scoping (nothing is implemented yet)

Status: **scope only**, for decision. Date: 2026-10-08.

## 1. Why

Belgium's official air quality index is **BelAQI**, published by IRCEL-CELINE (the Belgian
Interregional Environment Agency). The service currently returns the WAQI index with US EPA bands,
which is not what Belgian authorities, the BelAQI app or local news quote. For a user in Belgium the
BelAQI number is the one that matches the official advice.

## 2. What BelAQI is, and how sure we are

Evidence level: **S** = search-result summary of an IRCEL/press page, **C** = read in the community
client's source code. **Not read first-hand**: IRCEL's own pages could not be opened from the
build sandbox (see section 8).

| Fact | Level |
|---|---|
| Based on four pollutants: PM2.5, PM10, NO2, O3 | S |
| Scale 1 (excellent) to 10 (extremely poor) | S |
| One sub-index per pollutant; **the worst one is the overall BelAQI** | S |
| 2022 revision is based on the WHO 2021 guidelines; the old 2017 PM2.5 scale is superseded and must not be mixed in | S |
| Current index: hourly values for PM2.5, PM10, NO2 converted via the daily-mean / daily-max-hour relationship. Past days and forecasts: daily mean (PM2.5, PM10, NO2) and daily highest 8-hour mean (O3) | S |
| Exceeding the annual limit (PM) or summer average (O3) gives at least 3; exceeding the WHO daily limit gives at least 6; PM/NO2 reach 10 above WHO interim target 2; O3 is 8 at 160 µg/m3 (max 8-h mean) | S |
| The IRCEL "BelATMO" page is outdated and lists SO2; SO2 is not part of the current index | S |

**Not known (must come from the official table, never from memory):** the full breakpoint table
(index 1-10 per pollutant and averaging period) and the exact label for each of the 10 levels.
Official location: `irceline.be/en/air-quality/measurements/belaqi-2022/belaqi-table`.

## 3. Where the data can come from

| Option | How | Verdict |
|---|---|---|
| **A. Fetch BelAQI from IRCEL (recommended)** | WMS `GetFeatureInfo` point query by lat/lng (below) | Official number, no calculation to get wrong, no API token. Contract is known from a community client, **not from official docs**. |
| B. Compute BelAQI ourselves from raw concentrations | IRCEL SOS/WFS concentrations + the official table | Re-implements an official index; any breakpoint or averaging mistake gives wrong health advice. More code, more tests. Not recommended. |
| C. Derive from WAQI numbers | none | **Rejected.** WAQI's `iaqi` values are, as far as I know, per-pollutant AQI sub-indices, not concentrations (unverified), and IRCEL itself publishes a page explaining why its values differ from aqicn.org (title only; content unread). |

Option A endpoints, taken from the source of the community client
[`python-irceline`](https://github.com/jdejaegh/python-irceline) (`api.py`, `data.py`, `forecast.py`, `rio.py`):

| Data | Endpoint | Layer |
|---|---|---|
| Current (hourly, interpolated RIO-IFDM) | `https://geobelair.irceline.be/rioifdm/wms` | `rioifdm:belaqi` |
| Forecast, today + 3 days | `https://geo.irceline.be/forecast/wms` | `forecast:belaqi_d0` ... `forecast:belaqi_d3` |

Request shape (WMS 1.1.1): `request=GetFeatureInfo&info_format=application/json&srs=EPSG:4326&width=1&height=1&X=1&Y=1`
with `bbox=<lon>,<lat>,<lon+0.00001>,<lat+0.00001>`, `layers` and `query_layers` set to the layer.
The value is `features[0].properties.GRAY_INDEX`; the response carries a `timeStamp`. Empty
`features` means no value. The client's README states the data is under CC BY 4.0 (to confirm on
IRCEL's open-data page: `irceline.be/en/documentation/open-data`).

## 4. Proposed API (draft, not built)

```
GET /api/belaqi?lat=50.8466&lng=4.3528
```
```json
{
  "belaqi": 3,
  "label": "<official label for 3>",
  "valid_at": "2026-10-08T09:00:00Z",
  "forecast": [{ "date": "2026-10-08", "belaqi": 3 }, { "date": "2026-10-09", "belaqi": 4 }],
  "source": "IRCEL-CELINE",
  "attribution": "<wording required by the licence>",
  "cached": false
}
```
Rules: coordinates must be inside Belgium (a bounding-box check **before** any upstream call;
exact box to be derived from the official data coverage, not guessed); outside gives a clear 404.
City names are out of scope for the first slice (needs a geocoder or a two-step WAQI lookup; see
question 2).

## 5. Work breakdown (small, independently shippable)

| # | Task | Done when |
|---|---|---|
| 1 | Capture real responses (current + 4 forecast days, an in-Belgium point, an outside point, a no-data point) from a machine that can reach IRCEL, and commit them as fixtures | fixtures reviewed; units and value type (integer vs fractional `GRAY_INDEX`) confirmed |
| 2 | Add the official breakpoint table / labels as a documented data file, with source and date | table matches the official page row by row |
| 3 | `irceline` client module: URL builder, timeouts, size cap, no redirects, tolerant parser | unit + mock-upstream tests, same standard as `waqi.rs` (token-free, but same hardening) |
| 4 | Belgium bounding-box validation | tests for edges and for non-Belgian points |
| 5 | `/api/belaqi` route, caching (current: 15-30 min; forecast: until next day) | end-to-end tests |
| 6 | Docs, attribution, CI | `cargo test`, clippy, audit green |

Rough size: about one focused day, most of it tasks 1 and 2 (which need real data and the official table).

## 6. Risks

| Risk | Mitigation |
|---|---|
| Unofficial contract (layer names and `GRAY_INDEX` come from a community client and may change) | Fixtures from real calls (task 1); degrade to a clear 502 and keep `/api/aqi` unaffected; an ignored "canary" test run manually on the Pi |
| Wrong health advice from a wrong table | Table copied from the official page, with a test that every row is checked against the source; no figures from memory |
| Licence / attribution (CC BY 4.0 per the client README) | Attribution field in every response; confirm wording on IRCEL's open-data page |
| Two new upstream hosts (fixed, not user-controlled, so no SSRF) | Same controls as WAQI: timeouts (the client uses 60 s; we keep 8 s), response cap, no redirects, concurrency limit, bounded cache |
| Load on a public agency server | Cache; Belgium-only guard; honest User-Agent |
| Index vs forecast semantics differ (hourly conversion vs daily mean / max 8-h) | Present them as separate fields, never averaged together |

## 7. Decisions needed from you

1. Should BelAQI **replace** the WAQI category in `/api/aqi`, or be a **separate** endpoint next to it? (Recommended: separate endpoint; WAQI keeps worldwide coverage.)
2. Do you need **city names** in Belgium, or are coordinates enough for the first version? (City names add a geocoding dependency.)
3. Do you want the **4-day forecast** or only the current value?
4. Label language: English only, or Dutch / French as well?

## 8. What I could not verify

- IRCEL pages (`irceline.be`, `geo.irceline.be`, `geobelair.irceline.be`) are unreachable from the build sandbox, so no endpoint was called and no response was seen.
- The full 2022 breakpoint table, the 10 level labels, the licence wording, Belgium's data-coverage box, and whether `GRAY_INDEX` is an integer index.
- The content of IRCEL's "why values differ from aqicn.org" page.

## Sources

- IRCEL-CELINE, BelAQI table (2022): <https://irceline.be/en/air-quality/measurements/belaqi-2022/belaqi-table> (not opened)
- IRCEL-CELINE, new BelAQI index: <https://irceline.be/en/news/new-belaqi-index> (via search summary)
- IRCEL-CELINE, annual scales adapted to WHO guideline values: <https://irceline.be/en/news/annual-average-concentration-scales-adapted-to-the-stricter-who-guideline-values> (via search summary)
- IRCEL-CELINE, why values differ from aqicn.org: <https://irceline.be/en/news/why-do-the-values-shown-on-the-irceline-website-differ-from-those-on-aqicn-org> (title only)
- IRCEL-CELINE, BelATMO (outdated): <https://irceline.be/en/air-quality/measurements/belatmo> (via search summary)
- Brussels Times, Belgium adapts its air quality index to the latest WHO recommendations: <https://brusselstimes.com/312318/belgium-adapts-its-air-quality-index-to-the-latest-who-recommendations>
- IRCEL SOS/timeseries API documentation: <https://geo.irceline.be/sos/static/doc/api-doc/> (not opened)
- Community client source (endpoints, layers, request shape): <https://github.com/jdejaegh/python-irceline> (`src/open_irceline/*.py`, read in full)
