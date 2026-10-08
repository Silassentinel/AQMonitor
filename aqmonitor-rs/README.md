# aqmonitor (Rust backend)

Small HTTP JSON service for a Raspberry Pi 4 on your LAN. It asks the
[WAQI](https://aqicn.org/api/) service for the current air quality of a city or a coordinate and
returns a compact answer with a health category.

## API

| Request | Result |
|---|---|
| `GET /health` | `{"status":"ok"}` |
| `GET /api/aqi?city=Brussels` | reading for a named city/station |
| `GET /api/aqi?lat=50.8466&lng=4.3528` | reading for the nearest station to a coordinate |

```json
{
  "aqi": 42,
  "category": "good",
  "dominant_pollutant": "pm25",
  "station": { "name": "Brussels", "lat": 50.8466, "lng": 4.3528, "url": "https://aqicn.org/city/belgium/brussels" },
  "observed_at": "2026-10-07T18:00:00+02:00",
  "pollutants": { "pm25": 42.0, "pm10": 20.5, "t": 14.5 },
  "attributions": [{ "name": "IRCEL-CELINE", "url": "https://www.irceline.be/" }],
  "cached": false
}
```

Categories (`good`, `moderate`, `unhealthy_for_sensitive_groups`, `unhealthy`, `very_unhealthy`,
`hazardous`) use the US EPA bands. Errors are `{"error": "..."}` with status 400 (bad input),
404 (unknown station / no current reading), 502 (provider failure) or 503 (busy).
**Show the `attributions` wherever you display the data.**

## Configuration (environment variables)

| Variable | Default | Meaning |
|---|---|---|
| `WAQI_TOKEN` | – (required) | WAQI API token |
| `BIND_ADDR` | `127.0.0.1:8080` | listen address; use the Pi's LAN IP to serve the LAN |
| `CACHE_TTL_SECS` | `600` | cache lifetime, 30–86400 |
| `RUST_LOG` | `info` | log level |

## Build and deploy to the Pi 4

The Pi 4 is ARM, but the binary depends on whether the installed OS is 64-bit or 32-bit. Check on the Pi:

```sh
uname -m     # aarch64 -> 64-bit OS   |   armv7l -> 32-bit OS
```

| `uname -m` | Rust target |
|---|---|
| `aarch64` | `aarch64-unknown-linux-gnu` |
| `armv7l` | `armv7-unknown-linux-gnueabihf` |

CI builds **both** and uploads them as workflow artifacts (with a SHA-256 file), so you can just
download the right one. To build yourself (on your computer, not on the Pi):

```sh
rustup target add aarch64-unknown-linux-gnu        # or armv7-unknown-linux-gnueabihf
pip install ziglang && cargo install cargo-zigbuild --locked
cargo zigbuild --release --target aarch64-unknown-linux-gnu.2.31
scp target/aarch64-unknown-linux-gnu/release/aqmonitor pi@<pi>:
```

The `.2.31` suffix matters: a plain cross-build links against your computer's newer glibc and
then fails on Raspberry Pi OS ("version `GLIBC_2.38' not found"). With it the binary needs glibc
2.30 or older, which runs on Raspberry Pi OS Bullseye and Bookworm; CI fails the build if that
ever regresses. Alternatively run `cargo build --release` on the Pi itself (slow, but always matches).

Both targets were built and their glibc requirement checked; **neither was run on real hardware**.

Service files are in `deploy/` (`aqmonitor.service`, `aqmonitor.env.example`).

## Security notes

- Binds to loopback unless you set `BIND_ADDR`. There is no authentication: only expose it on a
  trusted LAN, bind the Pi's LAN address (not `0.0.0.0`), and do not port-forward it.
- No CORS headers are sent, so browsers on other origins cannot read it. Add a CORS layer
  deliberately if a web page on another host needs it.
- The WAQI token only lives in the environment (`chmod 600` env file), is never logged, and is
  scrubbed from errors. Tests enforce this.
- Input is validated before use; upstream calls have timeouts, a response-size cap, no redirects
  and a concurrency limit; the cache is size-bounded.
- There is no per-client rate limiting. On a home LAN that is acceptable; the cache protects your
  WAQI quota.

## Develop

```sh
cargo test                                 # unit + end-to-end tests (mock upstream, no network)
cargo clippy --all-targets -- -D warnings
cargo fmt --check
cargo audit                                # dependency advisories
WAQI_TOKEN=... cargo run
```

## Known gaps

- The WAQI response contract is modelled from the old TypeScript classes and the public docs from
  memory. It has **not** been checked against the live API yet; test with your real token first.
- Not run on real Pi hardware yet; the systemd unit is untested.
