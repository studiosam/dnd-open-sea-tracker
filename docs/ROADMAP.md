# Open Sea Tracker Roadmap

This roadmap tracks the current direction for the Open Sea Tracker project.

The project began as the Marrowwind voyage tracker for one campaign, but the long-term goal is to turn it into a reusable browser-based encounter tracker for dangerous sea travel and other high-bookkeeping tabletop scenarios.

---

# Current Project Status

The project is a working MVP.

The core tracker can now be used at the table with a DM screen and a player-facing screen. It has automated tests, formatting checks, syntax checks, GitHub Actions CI, manual browser testing documentation, import/export support, save protection, and a functional new-voyage setup flow.

## Completed Core Systems

- DM-facing tracker screen
- Player-facing display screen
- Browser `localStorage` saving
- Export and import
- Import validation and migration
- Undo support
- Turn-flow guidance
- Open Sea Event handling
- Scripted scene turns
- Crew action assignment
- Required checks and saves
- Water ingress tracking
- Course Meter and travel tracking
- Player knowledge and hidden information
- Player-safe state publishing
- Player view auto-sync through browser storage
- Activity log
- Automated Node test suite
- Prettier formatting
- Syntax checks
- GitHub Actions CI
- Manual browser testing checklist

---

# Recently Completed Setup Work

The landing and setup flow has been completed through Stage 3.

## Stage 1: Ship Name Foundation — Complete

Completed items:

- Added `shipName` to tracker state.
- Added default ship name: `The Marrowwind`.
- Added migration support for old saves missing `shipName`.
- Added validation for imported ship names.
- Included `shipName` in exported saves.
- Included `shipName` in published player state.
- Rendered ship name on the DM screen.
- Rendered ship name on the player screen.
- Added player-view fallback for older player snapshots.

## Stage 2: Setup Mode Shell — Complete

Completed items:

- Added landing/setup/tracker app modes.
- Changed `Start a New Voyage` to open setup mode.
- Added temporary setup draft state.
- Added setup screen shell.
- Added voyage preset display.
- Added ship-name setup field.
- Added crew-size setup field.
- Added active crew-name setup fields.
- Added background/proficiency trait checkboxes.
- Added `Back to Landing`.
- Added `Reset Setup Defaults`.
- Preserved existing saves when opening setup.
- Preserved existing saves when editing setup.
- Preserved existing saves when backing out of setup.

## Stage 2.5: Setup File Split — Complete

Completed items:

- Added `js/tracker_render_setup.js` for landing/setup rendering.
- Added `js/tracker_setup.js` for setup-mode behavior.
- Kept main tracker rendering in `js/tracker_render.js`.
- Kept persistence behavior in `js/tracker_persistence.js`.
- Updated browser script order.
- Updated syntax checks.
- Updated test harness loading.

## Stage 3: Setup Validation and Start Voyage — Complete

Completed items:

- Added setup validation for ship name.
- Reused active crew-name validation.
- Blocked invalid setup from starting.
- Blocked invalid setup from saving.
- Blocked invalid setup from publishing player state.
- Required active crew names to be unique after trimming, case-insensitive.
- Allowed inactive crew rows to be ignored when crew size is smaller.
- Enabled `Start Voyage` for valid setup.
- Created full tracker state from setup draft.
- Applied configured ship name.
- Applied configured crew size.
- Applied configured crew names.
- Applied configured background/proficiency traits.
- Saved valid setup-created voyage to `localStorage`.
- Published valid setup-created player state.
- Entered tracker mode after successful setup.
- Logged new voyage creation.
- Added existing-save overwrite confirmation.
- Preserved old save when overwrite confirmation is cancelled.

---

# Current Immediate Priorities

These are the next practical steps before adding larger feature systems.

## 1. Run Manual Browser Testing

Status: Next

Use `docs/MANUAL_TESTING.md` to test the current app in a real browser.

Focus areas:

- Landing screen
- New voyage setup
- Setup validation
- Existing-save overwrite protection
- Resume current voyage
- Import saved voyage
- DM tracker load
- Player view sync
- Water visibility rules
- Navigate reveal behavior
- Scripted scene turn behavior
- Export/import
- Invalid import rejection
- Prompt escaping
- Layout smoke test

Reason:

Automated tests are strong, but browser UI behavior, layout, localStorage behavior, and second-screen sync still need manual verification.

## 2. Add README Screenshots

Status: Not Started

Add simple screenshots or images showing:

- Landing screen
- Setup screen
- DM tracker screen
- Player screen

Reason:

The README is now accurate, but screenshots would make the project much easier to understand for another DM or developer.

## 3. Clean Up Old Scratch Notes

Status: Not Started

Review `docs/todo.txt` and decide whether to:

- move useful items into this roadmap,
- rename it to a focused backlog file,
- or delete it if the content is obsolete.

Known item from the old scratch notes:

- Temporary skeleton helpers

Reason:

The roadmap should become the main planning document. Loose scratch notes should not become the source of truth.

---

# Next Feature Phase: First-Time Use Improvements

The setup flow now works. The next first-time-use work should make setup more useful without turning it into a full scenario builder yet.

## Starting Presets

Status: Not Started

Goal:

Allow the DM to choose from predefined starting configurations.

Possible first presets:

- Marrowwind Voyage
- Open Sea Default
- Short Demo Voyage

Each preset could define:

- default ship name
- default crew size
- default crew names
- default crew traits
- starting travel distance
- starting water level
- starting supplies
- starting repair materials
- starting Course Meter
- scripted event table
- Open Sea Event table

Keep this limited at first. Do not build custom event-table editing during the first preset pass.

## Demo Mode

Status: Not Started

Goal:

Add a safe demo voyage that lets someone try the tracker without understanding the full Marrowwind scenario.

Possible behavior:

- Demo button on landing screen
- Shorter travel distance
- preconfigured ship and crew
- known example starting state
- maybe one or two scripted moments

Reason:

A demo mode would make the project easier to show, test, and eventually publish.

## Setup Polish

Status: Not Started

Possible improvements:

- clearer setup validation messages
- better visual grouping of background/proficiency traits
- short help text explaining which traits affect which actions
- optional collapse/expand for advanced fields

Do not add advanced mechanical setup yet unless presets require it.

---

# Next Feature Phase: Event Table Improvements

The current Open Sea Event system works, but it is still tied closely to the current voyage implementation.

## Move Open Sea Events Into Table Data

Status: Not Started

Goal:

Represent Open Sea Events as structured data rather than hardcoded control flow where possible.

Possible event data fields:

- roll range
- event name
- DM-facing description
- player-facing description, if needed
- whether the event requires confirmation
- whether the event creates prompts
- whether the event modifies state
- whether the event blocks normal turn flow

Reason:

This is the foundation for reusable event tables and future custom scenarios.

## Built-In Event Table Selector

Status: Not Started

Goal:

Allow the DM to choose a built-in event table during setup or preset selection.

Possible built-in tables:

- Marrowwind Open Sea
- Generic Open Sea
- Calm Coastal Waters
- Stormy Waters

Keep the first version simple. Do not build a custom event-table editor yet.

## Custom Event Table Editor

Status: Future

Goal:

Allow a DM to define their own event table.

This should wait until built-in event table data is stable.

Possible future fields:

- d20 range
- event title
- event text
- mechanical tags
- prompt creation
- state effects

This is likely a larger publishability feature, not a near-term cleanup task.

---

# Next Feature Phase: Player View and Presentation

The player view works, but it can eventually become more visually useful at the table.

## Player View Polish

Status: Not Started

Possible improvements:

- stronger ship-name header
- clearer travel/water/supply grouping
- better active-effects layout
- improved crew status cards
- more readable projection mode
- small visual indicators for hidden vs known information

## Ship Diagram

Status: Future

Goal:

Add a simple visual ship status diagram.

Possible displayed systems:

- mast
- rudder
- pump
- leaks
- water level
- cargo hold threshold

This should remain simple and should not block other usability work.

## Value-Change Feedback

Status: Future

Possible improvements:

- subtle visual flash when water changes
- subtle visual flash when travel changes
- subtle visual flash when supplies change
- log emphasis for major turn results

Avoid heavy animations. The tracker should remain readable and stable.

---

# Next Feature Phase: Save and Session Management

The current save/export/import system works, but longer use would benefit from better save management.

## Save Slots

Status: Not Started

Goal:

Allow multiple browser saves instead of one current voyage.

Possible behavior:

- named save slots
- save timestamp
- ship name shown in slot list
- resume selected slot
- delete slot
- export selected slot

This should wait until the current single-save setup flow is fully tested.

## Structured Turn History

Status: Future

Goal:

Improve the activity log into a clearer turn history.

Possible behavior:

- grouped by day/turn
- actions confirmed
- event rolled
- checks resolved
- water update
- travel update
- supplies update

## Copy Recap Button

Status: Future

Goal:

Generate a short plain-text recap from the latest turn or session segment.

Possible uses:

- DM notes
- Discord update
- session recap drafting

---

# Current Known Feature Backlog

## Temporary Skeleton Helpers

Status: Backlog

Goal:

Represent temporary helper crew or skeleton crew members if the scenario calls for them.

Open questions:

- Do skeleton helpers take normal actions?
- Do they have labor/exhaustion?
- Do they appear on the player screen?
- Are they controlled by the DM only?
- Are they temporary effects instead of crew rows?

This should not be built until the desired table behavior is clear.

---

# Publishable Tool Preparation

These tasks matter if the project moves from personal tool to public tool.

## Rename Public Identity

Status: Future

Current identity:

- Marrowwind Open Sea Tracker

Possible broader identity:

- Open Sea Encounter Tracker
- Open Sea Voyage Tracker
- Dangerous Voyage Tracker

Reason:

The current name is campaign-specific. A public tool should sound reusable.

## GitHub Pages Deployment

Status: Future

Goal:

Make the tracker available from a hosted GitHub Pages URL.

Needs:

- stable static file paths
- no local-only assumptions
- README deployment instructions
- final favicon paths
- hosted demo/testing pass

## Scenario and Rules Documentation

Status: Future

Goal:

Document the rules enough that another DM can use the tracker without knowing the original Marrowwind scenario.

Possible docs:

- basic voyage procedure
- crew actions reference
- water/flooding rules
- travel/Course Meter rules
- player knowledge rules
- event table explanation
- setup/preset explanation

## Legal/Product Cleanup

Status: Future

If the project becomes public or monetized, avoid official D&D branding, copied rules text, proprietary setting names, and non-original protected content.

Keep the public framing as an original 5e-compatible encounter tool unless a different license path is chosen.

---

# Not Planned Yet

These are valid ideas, but they should not be built until the current roadmap items are more stable.

- Full scenario builder
- Custom action-list editor
- Custom scripted-event editor
- Custom flooding formula editor
- Custom ship-system editor
- Multiplayer/network sync
- Account system
- Cloud saves
- Mobile-first rewrite
- Framework rewrite
- Full automated browser testing suite

---

# Recommended Next Order

Use this order unless a table need forces something else:

1. Run the manual browser checklist.
2. Fix any manual test failures.
3. Add README screenshots.
4. Clean up old scratch docs.
5. Add demo mode or short demo voyage.
6. Add starting presets.
7. Move Open Sea Events into structured table data.
8. Add built-in event table selector.
9. Improve player view presentation.
10. Add save slots.
11. Prepare for GitHub Pages deployment.

---

# Maintenance Rule

Before starting a new feature phase:

1. Run `npm run ci`.
2. Check that GitHub Actions passes.
3. Run the relevant parts of `docs/MANUAL_TESTING.md`.
4. Update this roadmap if the feature changes the plan.
