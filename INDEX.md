# INDEX

Map of the repository. Keep this file updated whenever files or directories are added, moved or removed.

## Current: Rust backend (`aqmonitor-rs/`)

LAN-only HTTP JSON API for a Raspberry Pi 4; fetches air quality from WAQI.

| Path | Purpose |
|---|---|
| `aqmonitor-rs/Cargo.toml`, `Cargo.lock` | crate manifest and pinned dependencies (lockfile is committed: this is a binary) |
| `aqmonitor-rs/src/main.rs` | startup: config, HTTP client, listener, graceful shutdown (SIGTERM/Ctrl-C) |
| `aqmonitor-rs/src/lib.rs` | module list |
| `aqmonitor-rs/src/config.rs` | env-var config; `Secret` wrapper that never prints the token |
| `aqmonitor-rs/src/query.rs` | validation of `city` / `lat` / `lng` (runs before cache and upstream) |
| `aqmonitor-rs/src/waqi.rs` | WAQI client + tolerant response parser (timeouts, size cap, no redirects, token scrubbing) |
| `aqmonitor-rs/src/category.rs` | AQI → health category (US EPA bands) |
| `aqmonitor-rs/src/cache.rs` | bounded TTL cache |
| `aqmonitor-rs/src/api.rs` | routes `/health`, `/api/aqi`; error mapping; shared state |
| `aqmonitor-rs/tests/api.rs` | end-to-end tests against a local mock upstream |
| `aqmonitor-rs/deploy/` | `aqmonitor.service` (systemd, untested) and `aqmonitor.env.example` |
| `aqmonitor-rs/README.md` | API, config, build/deploy, security notes, known gaps |

## Legacy: TypeScript backend (to be removed once the Rust rewrite is accepted)

| Path | Purpose |
|---|---|
| `src/`, `test/` | unfinished Express/TypeScript scaffold (crashes on start, empty repositories) |
| `package.json`, `package-lock.json`, `tsconfig.json`, `.eslintrc.json`, `.prettier*` | its tooling; dependencies updated for security advisories |

## Root

| Path | Purpose |
|---|---|
| `README.md` | entry point |
| `INDEX.md` | this file |
| `.gitignore` | ignore rules |
