# Screen validation & routing

How the submission form determines "which screen" it's for, whether that screen is valid,
and how navigation keeps those two in sync. This replaces the static `SCHEDULE` json as the
source of truth for the form — modeled on `PRISM-data-portal`'s `SubmissionFormPage.vue`.

## Where `SCHEDULE` json still lives

[schedule.js](schedule.js) (`SCHEDULE`, `enrichedSchedule`, `FIELD_LABELS`, `TABLE_FIELD_KEYS`)
is used **only** by [index.vue](index.vue) — the Submission Hub's schedule table (window
dates, timepoint, data delivery estimates). Nothing under `forms/` reads it anymore.

Its `status` column isn't purely date math anymore, either. `enrichedSchedule(activeScreenNames)`
takes an optional `Set` of screen names the API currently reports as `ACTIVE`
(`computedStatus` in [schedule.js](schedule.js) checks it first, before falling back to
comparing `window_start`/`window_end` against today). `index.vue` builds that set from
`activeScreenStore.screens` (the same shared store the nav drawers use — see below) filtered
to `status === 'ACTIVE'`, and `schedule` is a computed, not a static `data()` value, so the
table re-renders once the store resolves. Net effect: if the API says a `SCHEDULE` entry's
screen is `ACTIVE`, the table shows `OPEN` (and links to the form) regardless of what the
hardcoded window dates say. There's no reverse override — if the dates say a window is open
but the API doesn't confirm an `ACTIVE` screen with that name, the date-based guess still
stands.

## Routing

The form route now carries the resolved screen name, not just the type:

```
/submission-hub/forms/:screenType/:screen
```

e.g. `/submission-hub/forms/MTS/MTS033`. This mirrors the portal's
`/submissions/forms/:type/:screen` — the portal's `SubmissionFormPage.vue` never resolves
"which screen" itself; whatever links to it always supplies both params already resolved.

Three things build links into this route, since prism-website (unlike the portal) has more
than one nav surface:

| Component | How it resolves `:screen` |
|---|---|
| [index.vue](index.vue) hub table | Already has it — each row is a static `SCHEDULE` entry with its own `screen_name`. |
| [ScreenSelector.vue](ScreenSelector.vue) (type dropdown, shown in the forms/instructions drawers) | Reads `activeScreenStore.activeScreenFor(newType)` when switching type while already on a `:screen` route, so it never carries over the old type's screen name. |
| [SubmissionsDrawer.vue](SubmissionsDrawer.vue) / [InstructionsSubDrawer.vue](instructions/InstructionsSubDrawer.vue) | Read the same store via a `resolvedScreenName` computed; the "Forms" link/button falls back to the generic `/submission-hub/forms` path if nothing is active. |

## `active-screen-store.js` — shared cache for "what's the active screen for this type"

The three nav components above, plus [index.vue](index.vue)'s hub table, all need the same
underlying data (which screens are currently `ACTIVE`), and used to each fetch it
independently. [active-screen-store.js](active-screen-store.js) is a Pinia store (same shape
as [window-status-store.js](window-status-store.js)) that centralizes it:

- `load(apiUrl)` — fetches `findScreens` **once** (guarded by `loaded`/`loading`, like
  `windowStatusStore.load`) and caches the raw list of all EXTERNAL screens.
- `activeScreenFor(screenType)` (getter) — filters the cached list to this type (stripping the
  `_SEQ` suffix variant, e.g. `MTS_SEQ` → `MTS`) and `status === 'ACTIVE'`. If more than one
  screen of the type is `ACTIVE`, picks the newest by `date_created` — matches
  `CompoundSubmissionConstants.sortScreens(activeScreens, 'date_created')` in the portal's
  `SubmissionsPage.vue`. Returns `null` if nothing is currently active.

Each consumer just calls `store.load(apiUrl)` once on `mounted` and reads
`store.activeScreenFor(type)` as a plain computed — no per-component data property, watcher,
or duplicate network call.

## `api.js`

**`findScreens(apiURL)`** — `GET prism_screens?filter={screen_category: 'EXTERNAL'}`. Returns
every external screen record (`name`, `screen_type`, `status`, `date_created`, ...). Backs
`active-screen-store.js`.

**`findScreen(apiURL, screen)`** / **`validateScreen(apiURL, screen, screenType)`** — the
actual validity check, run by the form itself. `findScreen` looks up one screen by exact
`name` and throws if it isn't `ACTIVE`. `validateScreen` additionally confirms the found
record's `screen_type` (`_SEQ`-stripped) matches the expected `screenType` — this catches a
mismatched URL like `/submission-hub/forms/MTS/CPS017` (a real, ACTIVE screen, but the wrong
type). This is the piece PRISM-data-portal's `SubmissionFormPage.vue` also does via
`CompoundSubmissionConstants.validateScreen`.

**`fetchSubmissionMessage(apiURL, submission_type?)`** — unchanged, drives the window-status
alert (`OPEN` / `MAX_CAPACITY` / `CLOSE` / `INVALID` + message) via `windowStatusStore`.

## `forms/screen-type.vue`

- `screenType` — `$route.params.screenType`.
- `screenName` — `$route.params.screen` (falls back to `screenType` only if somehow absent).
- On `mounted` and whenever `screenName` changes, calls `validateScreen()`
  (`api.validateScreen(apiURL, screenName, screenType)`) and stores the result in
  `screenValidation`. `INVALID` renders the error alert and hides the step accordion.
- No header meta strip, no schedule-derived display fields, no status-driven color logic —
  the header shows only `screenType` / `screenName`; the only styled alert is the plain
  window-status message from `fetchSubmissionMessage`.
- `screenName` is passed down to `ReviewStep.vue` → `parseFormDataForApi(formData, screenType,
  screenName)` ([parseApiPayload.js](forms/steps/parseApiPayload.js)) as the `screen` field in
  the submission payload — also no longer sourced from `schedule.js`.
