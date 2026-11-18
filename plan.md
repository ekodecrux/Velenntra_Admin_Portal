# Production persistence and automatic event subdomains

## Goal
Move the coordinator portal’s durable event and website state from browser-only storage to the Hostinger MySQL database and make each created event available at its entered subdomain without per-event manual server configuration.

## Implementation approach
- Add an event-scoped state table for the existing portal data model so current modules can be persisted without changing their UI contracts.
- Add server APIs for state hydration, upsert, deletion, event lookup, and event-host resolution.
- Add a client persistence bridge that hydrates server state before rendering and mirrors supported `velentra-*` writes to the database while retaining localStorage as a resilient cache.
- Add hostname-aware event resolution for `*.velentraconferences.com`, preserving the root Admin portal and the separate default website.
- Add wildcard Nginx/HTTPS routing only after the application’s host resolution is ready.
- Preserve event deletion semantics by removing the event registry record and invalidating its employee login and website state.

## Project structure
- `server/`: database schema, state APIs, and hostname resolution.
- `client/src/`: portal bootstrap and persistence bridge; existing dashboards continue using their current event-scoped keys.
- `client/public/event-site/`: event website preview and public event-site synchronization.
- `drizzle/`: MySQL migrations.
- Hostinger: `/var/www/velentraconferences`, dedicated systemd service, and dedicated Nginx host configuration.

## Delivery
Run typecheck, tests, production build, migration checks, and Git diff validation. Commit only the verified implementation and push the same commit to both configured `main` remotes and the production checkout.
