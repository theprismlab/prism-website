# Screen validation & routing

How the submission form determines "which screen" it's for, whether that screen is valid,
and how navigation keeps those two in sync. This replaces the static `SCHEDULE` json as the
source of truth for the form — modeled on `PRISM-data-portal`'s `SubmissionFormPage.vue`.

## Where `SCHEDULE` json still lives

[schedule.js](schedule.js) (`SCHEDULE`, `enrichedSchedule`, `FIELD_LABELS`, `TABLE_FIELD_KEYS`)
is used **only** by [index.vue](index.vue) — the Submission Hub's schedule table (window
dates, timepoint, data delivery estimates). Nothing under `forms/` reads it anymore.

Its `status` column isn't purely date math anymore, either. `enrichedSchedule(activeScreenNameFor)`
takes an optional `(screenType) => name|null` lookup — `computedStatus` in
[schedule.js](schedule.js) checks whether *this* entry's `screen_name` is the one that lookup
returns for its `screen_type`, before falling back to comparing `window_start`/`window_end`
against today. `index.vue` passes `activeScreenStore.activeScreenNameFor` directly (the same
getter documented below, not a separately-built list), so a `SCHEDULE` entry only gets
overridden to `OPEN` when it's the newest-`ACTIVE` screen the rest of the app treats as
current for that type — not merely *some* `ACTIVE` screen with a matching name. This matters
because `SCHEDULE` can have more than one entry per type (e.g. `MTS033` and `MTS034`); without
this, an older `ACTIVE` entry could show as `OPEN` even after a newer one supersedes it.
`schedule` is a computed, not a static `data()` value, so the table re-renders once the store
resolves. There's no reverse override — if the dates say a window is open but the API doesn't
confirm that entry as the current `ACTIVE` screen, the date-based guess still stands.

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
| [ScreenSelector.vue](ScreenSelector.vue) (type dropdown, shown in the forms/instructions drawers) | Reads `activeScreenStore.activeScreenNameFor(newType)` when switching type while already on the forms path, so it never carries over the old type's screen name — this also covers picking a type for the first time from the bare `/submission-hub/forms` page. |
| [SubmissionsDrawer.vue](SubmissionsDrawer.vue) / [InstructionsSubDrawer.vue](instructions/InstructionsSubDrawer.vue) | Read the same store via a `resolvedScreenName` computed (`activeScreenStore.activeScreenNameFor(screenType)`); the "Forms" link/button falls back to the generic `/submission-hub/forms` path if nothing is active. |

## `active-screen-store.js` — shared cache for "what's the active screen for this type"

The three nav components above, [index.vue](index.vue)'s hub table, and `forms/screen-type.vue`
itself (see below) all need the same underlying data (which screens are currently `ACTIVE`),
and used to each fetch it independently. [active-screen-store.js](active-screen-store.js) is a
Pinia store (same shape as [window-status-store.js](window-status-store.js)) that centralizes it:

- `load(apiUrl)` — fetches `findScreens` and caches the raw list of all EXTERNAL screens.
  Returns a promise; once `loaded` is `true` it resolves immediately, but while a fetch is
  already in flight, concurrent callers **share that same promise** rather than getting an
  empty no-op back — `await store.load(apiUrl)` is always safe to follow with a read of
  `store.screens`.
- `activeScreenFor(screenType)` (getter) — filters the cached list to this type (via
  `stripSeqSuffix` from `api.js`, e.g. `MTS_SEQ` → `MTS`) and `status === 'ACTIVE'`. If more
  than one screen of the type is `ACTIVE`, picks the newest by `date_created` — matches
  `CompoundSubmissionConstants.sortScreens(activeScreens, 'date_created')` in the portal's
  `SubmissionsPage.vue`. Returns `null` if nothing is currently active.
- `activeScreenNameFor(screenType)` (getter) — thin wrapper around `activeScreenFor(...)?.name`
  that also tolerates a falsy `screenType`, so consumers don't each need their own null-guard.

Each consumer just calls `store.load(apiUrl)` once on `mounted` and reads
`store.activeScreenNameFor(type)` / `store.activeScreenFor(type)` as a plain computed — no
per-component data property, watcher, or duplicate network call.

`window-status-store.js` follows the identical pattern for `fetchSubmissionMessage` (same
shared in-flight promise on `load()`), keying its `statuses` map by `submission_type` with the
same `stripSeqSuffix` applied.

## `api.js`

**`findScreens(apiURL)`** — `GET prism_screens?filter={screen_category: 'EXTERNAL'}`. Returns
every external screen record (`name`, `screen_type`, `status`, `date_created`, ...). Backs
`active-screen-store.js`.

**`stripSeqSuffix(type)`** — strips the `_SEQ` suffix variant some screen/submission types come
back with (e.g. `MTS_SEQ` → `MTS`). Shared by `active-screen-store.js`, `window-status-store.js`,
and `forms/screen-type.vue`, so this comparison rule only lives in one place.

**`fetchSubmissionMessage(apiURL, submission_type?)`** — unchanged, drives the window-status
alert (`OPEN` / `MAX_CAPACITY` / `CLOSE` / `INVALID` + message) via `windowStatusStore`.

There's no `findScreen`/`validateScreen` here anymore — that single-name lookup used to be a
separate network call; see below.

## `forms/screen-type.vue`

- `screenType` — `$route.params.screenType`.
- `screenName` — `$route.params.screen` (falls back to `screenType` only if somehow absent).
- On `mounted` and whenever `screenName` changes, calls `validateScreen()`, which awaits
  `activeScreenStore.load(apiUrl)` and looks up `screenName` in the already-cached
  `activeScreenStore.screens` list (no separate API request) — valid only if a record with
  that exact `name` exists, `status === 'ACTIVE'`, and its `screen_type` (`_SEQ`-stripped)
  matches `screenType`. Result goes in `screenValidation`; `INVALID` renders the error alert
  and hides the step accordion. The `screenType` check is what catches a mismatched URL like
  `/submission-hub/forms/MTS/CPS017` (a real, `ACTIVE` screen, but the wrong type) — mirroring
  what PRISM-data-portal's `SubmissionFormPage.vue` does via `CompoundSubmissionConstants.validateScreen`.
- No header meta strip, no schedule-derived display fields, no status-driven color logic —
  the header shows only `screenType` / `screenName`; the only styled alert is the plain
  window-status message from `fetchSubmissionMessage`.
- `screenName` is passed down to `ReviewStep.vue` → `parseFormDataForApi(formData, screenType,
  screenName)` ([parseApiPayload.js](forms/steps/parseApiPayload.js)) as the `screen` field in
  the submission payload — also no longer sourced from `schedule.js`.
- `formStore` (`useFormProgressStore`, [store.js](store.js)) is keyed by `screenName`, not
  `screenType` — see "State management" in [forms/README.md](forms/README.md). This matters
  for the same reason as everything above: a type can have more than one screen over time
  (`MTS033`, then later `MTS034`), and each needs its own fresh in-progress form rather than
  inheriting a prior screen's draft.
