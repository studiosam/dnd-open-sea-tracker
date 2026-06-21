# Changelog

This project keeps detailed implementation history in Git. This file records practical release notes for the current usable tracker state.

## Current Snapshot - June 20, 2026

- Split the DM tracker into focused JavaScript files for state, rendering, gameplay, persistence, and bootstrap.
- Replaced inline DM event handlers with delegated `data-action` and `data-change-action` controls.
- Added formal Node tests for the former browser validator, delegated controls, and import validation.
- Hardened JSON import handling with payload validation, migration validation, unsafe-key rejection, and file-size limits.
- Added Course Meter navigation with tick-based travel, DM/player visibility controls, and related action behavior.
- Added player-facing screen support with localStorage sync, hidden player knowledge, water meter, crew status, and ship systems.
