# Screen validity & status: migrating from static schedule to API

Notes from reviewing `PRISM-data-portal`'s `SubmissionsPage` to inform replacing prism-website's
static `SCHEDULE` JSON ([schedule.js](schedule.js)) with live API data for screen validity and status.

## Current state (prism-website)

- [schedule.js](schedule.js) hardcodes a `SCHEDULE` array (screen name, window start/end,
  data delivery date) and derives `status` (`SCHEDULED` / `OPEN` / `IN-PROGRESS`) by comparing
  today's date (ET) against the window dates.
- [api.js](api.js) already has:
  - `fetchSubmissionMessage(apiURL, submission_type)` — matches the portal's implementation
    byte-for-byte.
  - `findScreen(apiURL, screen)` — looks up **one screen by exact name** against
    `prism_screens`, throws if not `ACTIVE`. Used by `validateScreen()`.
- [window-status-store.js](window-status-store.js) (Pinia `useWindowStatusStore`) loads
  `fetchSubmissionMessage` results once and keys them by `submission_type`.
- [forms/screen-type.vue](forms/screen-type.vue) combines the static schedule display
  (`resolveScreenDisplay`) with `windowStore` messages and a `validateScreen()` call for
  pass/fail validation.

## PRISM-data-portal reference implementation

**Component:** `PRISM-data-portal/vue/src/views/SubmissionsPage.vue` ([mounted hook, lines
445-503](../../../PRISM-data-portal/vue/src/views/SubmissionsPage.vue#L445-L503))

### `findScreens(apiURL)`

`PRISM-data-portal/vue/src/js/utils/api-classes.js:203-215`

- `GET {apiURL}prism_screens?filter={"where":{"screen_category":"EXTERNAL"}}`
- Returns **all** EXTERNAL screens (not filtered by name), shape:
  ```js
  { screen_category, screen_type, name, status, date_created, date_updated, ... }
  ```
- `status` values observed: `ACTIVE`, `ACTIVE - WINDOW CLOSED`, `COMPLETE`, `DEPRECATED`

### `fetchSubmissionMessage(apiURL, submission_type?)`

`PRISM-data-portal/vue/src/js/utils/api-classes.js:321-337`

- `GET {apiURL}prism_submission_window_message[?filter=...]`
- Returns `{ submission_type, status, message }[]`, `status` ∈ `OPEN` / `MAX_CAPACITY` /
  `CLOSE` / `INVALID`
- Identical to prism-website's existing `fetchSubmissionMessage`.

### Logic in `SubmissionsPage.vue`

1. Fetch all EXTERNAL screens via `findScreens`; strip `_SEQ` suffix from `screen_type`
   (e.g. `MTS_SEQ` → `MTS`).
2. Group screens by `screen_type` (`_.groupBy`).
3. For each type, pick the "current" screen with a priority fallback:
   - Newest `ACTIVE` screen (by `date_created`), else
   - Newest `ACTIVE - WINDOW CLOSED` screen (by `date_updated`), else
   - Newest `COMPLETE` screen (by `date_updated`)
   - That screen's `name` becomes the active screen name for the type — this is what
     determines **screen validity** (is there a live screen at all).
4. Fetch all submission messages via `fetchSubmissionMessage` (no filter), strip `_SEQ` the
   same way, and assign `status` / `message` per type directly from the response — this
   drives the **screen status** alert (open / closed / max capacity / invalid).
5. No Pinia/Vuex store — plain component `data()` state (`submission_types`). No equivalent
   to `useWindowStatusStore`.

## Implications for prism-website

- Add a `findScreens` (plural, unfiltered by name, `screen_category: EXTERNAL`) call to
  `api.js` — only single-screen `findScreen` exists today.
- Replace `resolveScreenDisplay`'s reliance on hardcoded `window_start` / `window_end` dates
  with the priority-fallback logic above (`ACTIVE` → `ACTIVE - WINDOW CLOSED` → `COMPLETE`) to
  pick the current screen name/status per type.
- Keep `fetchSubmissionMessage` / `windowStatusStore` as-is for status/message (already
  matches); source screen **validity** from `findScreens` grouping instead of
  `validateScreen()` + `SCHEDULE` window-date math.
