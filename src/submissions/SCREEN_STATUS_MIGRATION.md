# Screen validation & routing

How the submission form determines "which screen" it's for, whether that screen is valid,
and how navigation keeps those two in sync. This replaces the static `SCHEDULE` json as the
source of truth for the form — modeled on `PRISM-data-portal`'s `SubmissionFormPage.vue`.

## Where `SCHEDULE` json still lives

[schedule.js](schedule.js) (`SCHEDULE`, `enrichedSchedule`, `FIELD_LABELS`, `TABLE_FIELD_KEYS`)
is used **only** by [index.vue](index.vue) — the Submission Hub's schedule table (window
dates, timepoint, data delivery estimates). Nothing under `forms/` reads it anymore.

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
| [ScreenSelector.vue](ScreenSelector.vue) (type dropdown, shown in the forms/instructions drawers) | Calls `findActiveScreen(apiURL, newType)` when switching type while already on a `:screen` route, so it never carries over the old type's screen name. |
| [SubmissionsDrawer.vue](SubmissionsDrawer.vue) / [InstructionsSubDrawer.vue](instructions/InstructionsSubDrawer.vue) | Resolve via `findActiveScreen` in a `screenType` watcher; the "Forms" link/button falls back to the generic `/submission-hub/forms` path if nothing is active. |

## `api.js` — the two API calls that matter here

**`findScreens(apiURL)`** — `GET prism_screens?filter={screen_category: 'EXTERNAL'}`. Returns
every external screen record (`name`, `screen_type`, `status`, `date_created`, ...).

**`findActiveScreen(apiURL, screenType)`** — filters `findScreens` to this type (stripping the
`_SEQ` suffix variant, e.g. `MTS_SEQ` → `MTS`) and `status === 'ACTIVE'`. If more than one
screen of the type is `ACTIVE`, picks the newest by `date_created` — this matches
`CompoundSubmissionConstants.sortScreens(activeScreens, 'date_created')` in the portal's
`SubmissionsPage.vue`, which does the same when building its hub table. Returns `null` if
nothing is currently active. Used only by the three nav components above, to build links.

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
