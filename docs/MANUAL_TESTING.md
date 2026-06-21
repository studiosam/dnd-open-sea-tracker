# Manual Testing Checklist

This checklist covers browser behavior that the automated Node tests do not fully prove.

Use this checklist after changes that affect:

- Rendering
- Buttons or event handlers
- Turn flow
- Action assignment
- Player view publishing
- Import/export
- localStorage
- Setup/start state
- Major styling or layout

Do not use this as an exhaustive QA document. It is a browser smoke test. It should stay practical enough to run in about 5 to 10 minutes.

---

# How to Use This Checklist

Before starting, run:

```powershell
npm run ci
```

The command should pass formatting, syntax checks, and automated tests.

Use the checkboxes while testing. If you mark items complete in VS Code, do not commit the checked-off version unless you intentionally want to save a test record. The repo version should normally stay blank.

---

# Test Environment

Use a normal desktop browser.

Recommended browsers:

- Chrome
- Edge
- Firefox

Recommended local setup:

- Open the DM screen: `open_sea_tracker.html`
- Open the player screen: `player_view.html`
- Open both pages in the same browser profile so localStorage sync works.
- Open DevTools Console on both pages.

If using Live Server, browser warnings from Live Server are acceptable as long as they do not reference project files or break the app.

---

# Serious Console Errors

These are acceptable:

- Browser or Live Server warnings that do not reference project files.
- Layout or style warnings that do not break behavior.

These are not acceptable:

- `SyntaxError`
- `ReferenceError`
- `TypeError`
- `Cannot read properties of null`
- Missing function errors
- Missing script errors
- Failed loads for project files such as:
  - `js/action_metadata.js`
  - `js/tracker_state.js`
  - `js/tracker_render.js`
  - `js/tracker_gameplay.js`
  - `js/tracker_persistence.js`
  - `js/tracker.js`
  - `js/player_view.js`
  - `css/styles.css`

---

# 1. Automated Baseline

Run this before opening the browser:

```powershell
npm run ci
```

Confirm:

- [ ] Prettier formatting check passes.
- [ ] JavaScript syntax check passes.
- [ ] Automated tests pass.
- [ ] No command fails before browser testing begins.

---

# 2. DM Screen Initial Load

Open `open_sea_tracker.html`.

On initial load, do not expect action assignment controls to be visible yet. Those are checked later after the tracker reaches the action-assignment phase.

Confirm:

- [ ] The page loads instead of showing a blank screen.
- [ ] The favicon appears in the browser tab.
- [ ] The main DM app layout is visible.
- [ ] The current day and turn are visible.
- [ ] The turn-flow area is visible.
- [ ] The voyage or travel status area is visible.
- [ ] The ship status area is visible.
- [ ] The water or ingress status area is visible.
- [ ] The supplies area is visible.
- [ ] The crew section is visible.
- [ ] The crew section lists the expected characters, such as Leopold, Delilah, Toady, Xander, Grumbo, and Tommy.
- [ ] The log or history area is visible.
- [ ] The DevTools Console shows no serious console errors.

---

# 3. Player Screen Initial Load

Open `player_view.html` in the same browser profile.

Confirm:

- [ ] The page loads instead of showing a blank screen.
- [ ] The favicon appears in the browser tab.
- [ ] The player-facing layout is visible.
- [ ] The voyage or travel section is visible.
- [ ] The ship condition section is visible.
- [ ] The water display is visible.
- [ ] The systems display is visible.
- [ ] The supplies display is visible.
- [ ] The crew display is visible.
- [ ] The DevTools Console shows no serious console errors.

The player screen does not need to show every DM value. Hidden player information should stay hidden until revealed by the rules.

---

# 4. Reset to a Known Baseline

On the DM screen:

- [ ] Click `Reset`.
- [ ] Confirm the reset prompt appears.
- [ ] Confirm the reset.

After reset, confirm:

- [ ] The tracker shows Day 1, Turn 1.
- [ ] Travel remaining is at the default starting value.
- [ ] Course Meter is at the default starting value.
- [ ] Water Level is at the default starting value.
- [ ] Minimum Ingress is at the default starting value.
- [ ] Active Leaks are at the default starting value.
- [ ] Food is at the default starting value.
- [ ] Fresh Water is at the default starting value.
- [ ] Repair Supplies are at the default starting value.
- [ ] Mast status is functional.
- [ ] Rudder status is functional.
- [ ] Pump status is functional.
- [ ] Net status is usable.
- [ ] Rigging status is intact.
- [ ] Crew names appear correctly.
- [ ] The log records the reset or current state cleanly.

On the player screen:

- [ ] Confirm the player view updates after reset.
- [ ] Confirm player-hidden values remain hidden if they should not be known yet.
- [ ] Confirm no DM-only values are exposed incorrectly.

---

# 5. Reach the Action-Assignment Phase

This section checks that the normal turn flow can reach the point where crew actions are assigned.

On the DM screen:

- [ ] Click `Check Scripted Events`.
- [ ] If a scripted prompt appears, confirm it displays cleanly.
- [ ] Resolve or acknowledge any required scripted prompt if the UI requires it.
- [ ] If an Open Sea Event is required, click `Roll Open Sea Event`.
- [ ] If an Open Sea Event appears, confirm the event title and description display cleanly.
- [ ] Click `Confirm Event` when available.
- [ ] Continue until the app reaches the action-assignment phase.

At the action-assignment phase, confirm:

- [ ] Action assignment controls are now visible for available crew.
- [ ] Each available crew member has an action selector or action control.
- [ ] The available action list appears readable.
- [ ] Disabled or unavailable actions are handled clearly.
- [ ] The app does not show duplicate action controls for the same crew member.

---

# 6. Complete a Simple Idle Turn

This section confirms that the basic turn loop works without special actions.

On the DM screen:

- [ ] Click `Set Unset to Idle`.
- [ ] Confirm every available crew member now has an assigned action.
- [ ] Click `Confirm All Available`.
- [ ] Confirm the app moves past action assignment.
- [ ] If any prompts appear, resolve them or confirm that they are expected.
- [ ] Click `Apply Water Formula` when available.
- [ ] Confirm water updates or remains stable according to the displayed values.
- [ ] Click `Advance Turn`.
- [ ] Confirm the tracker advances to the next turn.
- [ ] Confirm the log records the turn activity.

On the player screen:

- [ ] Confirm the player view updates after the turn advances.
- [ ] Confirm crew action/status information changes appropriately.
- [ ] Confirm hidden information remains hidden unless revealed.

---

# 7. Navigate Action Test

This section checks the navigation prompt, DC display, Course Meter behavior, and player Course State / Travel Remaining reveal.

On the DM screen, proceed to an action-assignment phase.

Then:

- [ ] Assign one crew member to `Navigate / Study Map` or the equivalent navigation action.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm a Navigate prompt appears.
- [ ] Confirm the Navigate prompt shows a visible DC.
- [ ] Resolve the Navigate prompt with a success result.
- [ ] Confirm the Course Meter changes appropriately.
- [ ] Confirm the Course State updates if the result changes it.
- [ ] Confirm the log records the Navigate result.
- [ ] Apply the water formula if required.
- [ ] Advance the turn.

On the player screen:

- [ ] Confirm Course State becomes visible if the Navigate result should reveal it.
- [ ] Confirm the displayed Course State matches the DM result.
- [ ] Confirm Travel Remaining becomes visible rounded to the nearest 0.5 day.
- [ ] Confirm unrelated hidden values remain hidden.

---

# 8. Helm Action Test

This section checks travel progress from the Helm action.

On the DM screen, proceed to an action-assignment phase while the mast and rudder are functional.

Then:

- [ ] Assign one crew member to `Man Helm`.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm a Helm prompt appears.
- [ ] Confirm the Helm prompt shows a visible DC.
- [ ] Resolve the Helm prompt with a success result.
- [ ] Confirm travel remaining changes according to the current Course State.
- [ ] Confirm the log records the Helm result.
- [ ] Apply the water formula if required.
- [ ] Advance the turn.

On the player screen:

- [ ] Confirm travel information updates if travel is player-visible.
- [ ] Confirm crew action/status information updates.

---

# 9. Broken Mast Helm Behavior

This section checks that the app handles a broken mast without creating a normal Helm check.

On the DM screen:

- [ ] Use the DM controls to break the mast.
- [ ] Proceed to an action-assignment phase.
- [ ] Assign one crew member to `Man Helm`.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm no normal Helm check appears.
- [ ] Confirm normal Helm travel progress is not applied.
- [ ] Confirm the log explains that the mast is broken.
- [ ] Repair or restore the mast after the test if needed.

---

# 10. Broken Rudder Helm Behavior

This section checks that the app handles a broken rudder without creating a normal Helm check.

On the DM screen:

- [ ] Make sure the mast is functional.
- [ ] Use the DM controls to break the rudder.
- [ ] Proceed to an action-assignment phase.
- [ ] Assign one crew member to `Man Helm`.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm no normal Helm check appears.
- [ ] Confirm the app applies the broken-rudder movement behavior.
- [ ] Confirm the log explains the broken rudder behavior.
- [ ] Repair or restore the rudder after the test if needed.

---

# 11. Bilge Sounding Rod and Player Knowledge

This section checks water visibility and Total Ingress reveal behavior.

On the DM screen:

- [ ] Set Water Level below Cargo Hold if needed.
- [ ] Proceed to an action-assignment phase.
- [ ] Assign one crew member to examine the Bilge Sounding Rod.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm the Bilge Rod prompt appears.
- [ ] Confirm the prompt explains what success and failure reveal.
- [ ] Resolve the prompt.

After resolving:

- [ ] Confirm Water Level is revealed if the result should reveal it.
- [ ] Confirm Total Ingress is revealed only if the result or knowledge rules say it should be revealed.
- [ ] Confirm the log records the Bilge Rod result.

On the player screen:

- [ ] Confirm Water Level appears after it is revealed.
- [ ] Confirm Total Ingress appears only when the rules say it should.
- [ ] Confirm below-cargo water is hidden before it is revealed.
- [ ] Confirm water at or above Cargo Hold becomes automatically visible.

---

# 12. Group Action Test

This section checks that multi-crew actions are handled correctly.

On the DM screen, proceed to an action-assignment phase.

First test invalid assignment:

- [ ] Assign only one crew member to a two-person or group action, such as cooperative pumping or another group-based action.
- [ ] Try to confirm actions.
- [ ] Confirm the app prevents the invalid group assignment or clearly warns that the group is incomplete.
- [ ] Confirm the app does not silently create a broken group action.

Then test valid assignment:

- [ ] Assign the correct number of crew members to the group action.
- [ ] Set all other unset crew to Idle.
- [ ] Confirm all available crew actions.
- [ ] Confirm only one shared group prompt or work item is created.
- [ ] Resolve the prompt or complete the work if required.
- [ ] Confirm the log records the group action correctly.

On the player screen:

- [ ] Confirm participating crew display the correct current action.
- [ ] Confirm turns remaining displays correctly for ongoing work.
- [ ] Confirm no duplicate group action rows appear.

---

# 13. Water Formula Test

This section checks that the water formula applies once and logs clearly.

On the DM screen:

- [ ] Set or create a known water situation with Minimum Ingress, Active Leaks, Pumping, and/or Bucket Brigade.
- [ ] Click `Apply Water Formula`.
- [ ] Confirm Water Level changes according to the displayed values.
- [ ] Confirm the water update is logged.
- [ ] Confirm the app does not apply the water formula twice in the same turn unless intentionally reset.
- [ ] Confirm water threshold prompts appear if Water Level crosses a threshold.

On the player screen:

- [ ] Confirm Water Level visibility follows player knowledge rules.
- [ ] Confirm Total Ingress visibility follows player knowledge rules.
- [ ] Confirm water severity display updates if visible.

---

# 14. Supplies and Inventory Actions

This section checks player reveal behavior for supplies.

On the DM screen, proceed to an action-assignment phase.

Food:

- [ ] Assign one crew member to inventory food.
- [ ] Complete or advance the action according to its duration.
- [ ] Confirm Food becomes known to players.
- [ ] Confirm the log records the inventory action.

Fresh Water:

- [ ] Assign one crew member to inventory fresh water.
- [ ] Complete or advance the action according to its duration.
- [ ] Confirm Fresh Water becomes known to players.
- [ ] Confirm the log records the inventory action.

Repair Supplies:

- [ ] Assign one crew member to inventory repair supplies.
- [ ] Complete or advance the action according to its duration.
- [ ] Confirm Repair Supplies become known to players.
- [ ] Confirm the log records the inventory action.

On the player screen:

- [ ] Confirm revealed supplies are shown.
- [ ] Confirm unrevealed supplies remain hidden.
- [ ] Confirm revealed values match the DM screen.

---

# 15. Scripted Scene Turn

This section checks that scripted scene turns interrupt normal turn flow safely.

On the DM screen:

- [ ] Set the tracker to a scripted scene turn, such as Day 1 Turn 8.
- [ ] Click `Check Scripted Events`.
- [ ] Confirm the scripted event appears.
- [ ] Confirm Open Sea Event rolling is blocked if the scripted event blocks it.
- [ ] Confirm the scripted event text displays cleanly.
- [ ] Click `Force All Idle for Scene`.
- [ ] Confirm all crew are forced to Idle.
- [ ] Confirm pending action prompts are removed.
- [ ] Confirm ongoing work is preserved.
- [ ] Confirm ongoing work does not tick during the scripted scene turn.
- [ ] Advance the turn.
- [ ] Confirm normal flow resumes afterward.

On the player screen:

- [ ] Confirm player-facing state updates cleanly after the scripted scene turn.
- [ ] Confirm no broken or duplicated crew actions appear.

---

# 16. Player View Sync

This section checks that the DM page publishes state to the player page.

With both pages open in the same browser profile:

- [ ] Change a visible ship system on the DM screen.
- [ ] Confirm the player view updates.
- [ ] Change Water Level on the DM screen.
- [ ] Confirm the player view updates according to visibility rules.
- [ ] Reveal travel information if needed.
- [ ] Confirm the player view updates.
- [ ] Assign a crew action.
- [ ] Confirm the player view updates.
- [ ] Advance the turn.
- [ ] Confirm the player view updates.

Expected behavior:

- The player view should update automatically while both pages are open in the same browser profile.
- If the player view does not update immediately, refreshing the player page should show the latest published player state.

---

# 17. Export and Valid Import

This section checks that valid save files can be exported and restored.

On the DM screen:

- [ ] Export the current state.
- [ ] Confirm a JSON file downloads.
- [ ] Reset the tracker.
- [ ] Import the exported JSON file.
- [ ] Confirm the imported state restores correctly.
- [ ] Confirm day, turn, crew, ship state, supplies, water, and log match the exported state.
- [ ] Confirm the log records the import.
- [ ] Confirm the player screen updates after import.

---

# 18. Invalid Import

This section checks that bad save files are rejected without damaging the current state.

Create a temporary bad JSON file:

```json
{
  "day": -1,
  "turn": 1,
  "crew": []
}
```

On the DM screen:

- [ ] Try to import the bad file.
- [ ] Confirm the import is rejected.
- [ ] Confirm an error message appears.
- [ ] Confirm the current tracker state is not damaged.
- [ ] Confirm the app still works after the failed import.
- [ ] Confirm the player screen is not corrupted by the failed import.

Delete the temporary bad JSON file after the test if you do not need it.

---

# 19. Prompt Escaping

This section only needs to be run after changes to import validation, pending prompt rendering, or prompt display.

Create a temporary JSON import file that includes suspicious prompt text. The goal is to confirm that text displays as text, not as real HTML.

Use prompt text like:

```html
<img src=x onerror=alert('bad')> <b>test</b>
```

After importing or displaying the test prompt:

- [ ] Confirm the text displays as literal text.
- [ ] Confirm no alert appears.
- [ ] Confirm the browser does not render the fake HTML as real HTML.
- [ ] Confirm prompt buttons still work.
- [ ] Confirm the app still works after the prompt is resolved.

Delete the temporary test file after the test if you do not need it.

---

# 20. Layout Smoke Test

DM screen:

- [ ] Confirm the main controls are usable at normal desktop width.
- [ ] Confirm the turn-flow section is readable.
- [ ] Confirm the ship status panels are readable.
- [ ] Confirm the crew section is readable.
- [ ] Confirm pending prompts are readable.
- [ ] Confirm the log remains usable.
- [ ] Shrink the window and confirm the app remains recoverable.

Player screen:

- [ ] Confirm the player screen is readable at fullscreen size.
- [ ] Confirm it remains readable when projected or shown on a second display.
- [ ] Confirm the water meter/readout is not hidden behind marker lines.
- [ ] Confirm crew rows do not overlap badly.
- [ ] Confirm major ship status panels do not overlap.

---

# 21. Final Pass Before Commit

Before committing a major change:

- [ ] Run `npm run ci`.
- [ ] Run the relevant parts of this manual checklist if browser behavior may have changed.
- [ ] Confirm the app still loads from a clean browser tab.
- [ ] Confirm no serious console errors appear.
- [ ] Commit the code.
- [ ] Push the code.
- [ ] Confirm GitHub Actions passes after pushing.

---

# Notes for Future Expansion

When new features are added, add short sections for them.

Future checklist sections to add later:

- Setup screen
- Ship name setup
- Crew setup
- Starting presets
- Demo mode
- Built-in event table selector
- Custom event table editor
- Temporary skeleton helpers
- Save slots
- GitHub Pages deployment

Only add checklist sections for features that create new ways the app can visibly break in the browser.
