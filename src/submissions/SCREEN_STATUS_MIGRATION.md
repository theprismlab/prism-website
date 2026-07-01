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

## `active-screen-store.js` — single source of truth for "what do we know about screens"

Every screen-related question in this app — which nav components should link to, what the
form itself is allowed to submit against — is really the same underlying question asked
differently: "given the cached list of EXTERNAL screens, what's true about this
type/name?" [active-screen-store.js](active-screen-store.js) (a Pinia store, same shape as
[window-status-store.js](window-status-store.js)) is the one place that list lives, and the
one place the derived questions about it are answered:

- `load(apiUrl)` / `refresh(apiUrl)` / the `loading`/`loaded`/`error` state — come from
  [loadable.js](loadable.js), a small shared helper both this store and `window-status-store.js`
  build on, so the load-once/share-in-flight/error bookkeeping only lives in one place.
  `load(apiUrl)` fetches `findScreens` and caches the raw list. Returns a promise; once `loaded`
  is `true` it resolves immediately, but while a fetch is already in flight, concurrent callers
  **share that same promise** rather than getting an empty no-op back — `await
  store.load(apiUrl)` is always safe to follow with a read of `store.screens`. Use this for
  "give me *a* answer, cached is fine" (page loads, nav links). `refresh(apiUrl)` has the same
  in-flight-sharing behavior, but **always re-fetches**, bypassing the cache. Use this when the
  answer needs to be current as of right now (see `ReviewStep.vue` below) — `load()` alone would
  just replay whatever was cached at page-load time forever, since it only ever fetches once.
- `error` — `null` unless the last `load()`/`refresh()` failed, in which case it holds the
  thrown error and `loaded` stays `false` (so a subsequent `load()` naturally retries instead of
  no-op'ing). Neither `load()` nor `refresh()` ever *rejects* — failures are swallowed into this
  field instead, so best-effort callers (nav links, the Hub schedule table) don't need a
  `try`/`catch` and just silently fall back to "no active screen" on failure. Callers that need
  to know whether the fetch actually succeeded (`screen-type.vue`'s error alert,
  `ReviewStep.vue`'s pre-submit check — both below) read `error` explicitly after awaiting.
- `activeScreenFor(screenType)` (getter) — filters the cached list to this type (via
  `stripSeqSuffix` from `api.js`, e.g. `MTS_SEQ` → `MTS`) and `status === 'ACTIVE'`. If more
  than one screen of the type is `ACTIVE`, picks the newest by `date_created` — matches
  `CompoundSubmissionConstants.sortScreens(activeScreens, 'date_created')` in the portal's
  `SubmissionsPage.vue`. Returns `null` if nothing is currently active.
- `activeScreenNameFor(screenType)` (getter) — thin wrapper around `activeScreenFor(...)?.name`
  that also tolerates a falsy `screenType`, so consumers don't each need their own null-guard.
- `validationFor(screenName, screenType)` (getter) — is *this exact* screen name valid to
  submit against for this type? Returns `{ status: null, message: null }` only when
  `screenName === activeScreenNameFor(screenType)` — i.e. it's the one screen the app treats as
  current for that type, not merely *some* `ACTIVE` screen sharing the type. Anything else is
  `{ status: 'INVALID', message }`, but never the same generic message — each failure mode is
  distinguished so the alert/dialog says something accurate, not just "invalid":
  - No screen with that exact `name` exists at all → *"Screen 'X' is not registered"*.
  - A screen with that `name` exists but its `screen_type` (`_SEQ`-stripped) doesn't match
    `screenType` → *"Screen 'X' is not associated with submission type 'Y'"* — this is what
    catches a mismatched URL like `/submission-hub/forms/MTS/CPS017` (a real screen, wrong
    type), mirroring what the portal does via `CompoundSubmissionConstants.validateScreen`.
  - The name and type both check out, but it isn't the screen `activeScreenNameFor` currently
    designates (e.g. it's `COMPLETE`, `DEPRECATED`, or its window closed) →
    *"Screen 'X' is not currently open for submissions"*. None of these three cases render a
    viewable or submittable form — only the exact currently-designated screen does.

Every consumer just calls `store.load(apiUrl)` once on `mounted` and reads whichever getter it
needs as a plain computed — no per-component data property, watcher, async method, or
duplicate network call. `window-status-store.js` is built on the same `loadable.js` helper for
`fetchSubmissionMessage`, keying its `statuses` map by `submission_type` with the same
`stripSeqSuffix` applied, and exposes a `messageFor(submissionType)` getter mirroring
`activeScreenNameFor` instead of making its one consumer (`screen-type.vue`'s `apiStatus`) reach
into `.statuses[type]` directly. It gets `refresh()` for free via the shared helper too — nothing
currently calls it (nothing re-checks the window-status message mid-session), but it's there for
interface symmetry.

## `api.js`

**`getTempApiKey(apiURL)`** — every authed call needs this short-lived credential first. It's
memoized per `apiURL` (an in-flight/resolved promise cached in a module-level `Map`, same
shared-promise trick the stores use), so the several authed calls that fire within one page load
(`active-screen-store`, `window-status-store`, `InstitutionStep.vue`'s `getCollaboratorList`,
`postSubmission`) share a single fetch instead of each re-requesting their own key. A failed
fetch isn't cached (the next call retries cleanly), and `authedGet` retries once with a fresh key
if a request comes back `401`/`403`, since the cached key can expire mid-session. `postSubmission`
calls `getTempApiKey` directly rather than through `authedGet` and benefits from the shared cache
too, but deliberately does **not** get the same auto-retry-on-auth-failure — retrying a POST
automatically risks a double-submit if the backend doesn't treat `createSubmission` as
idempotent; its failures still surface through `ReviewStep.vue`'s existing `catch` block.

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
- `screenValidation` is a **plain computed**, not local state assigned from an async method:
  `!activeScreenStore.loaded ? null : activeScreenStore.validationFor(screenName, screenType)`.
  `mounted()` just calls `activeScreenStore.load(apiUrl)` (fire-and-forget) — once it resolves,
  the computed re-evaluates on its own, no manual "await then assign" plumbing.
- `loadError` is a separate computed reading `activeScreenStore.error` directly. It exists
  because `screenValidation` alone can't distinguish "still loading" from "failed to load" — both
  leave `loaded: false` forever (see `loadable.js`'s `error` behavior above). The template checks
  `loadError` *before* the three-way `screenValidation` branch below, rendering a retryable error
  alert (its button just calls `activeScreenStore.load(apiUrl)` again — safe, since `loaded`
  never flipped `true`) instead of leaving the loading spinner spinning forever on a network
  failure.
- The template is a three-way branch on that computed, not a two-way `v-if`/`v-else`: `INVALID`
  → error alert; `null` (store hasn't loaded yet) → a loading spinner; anything else (valid) →
  the step accordion. This matters because the default has to be "don't show the form" — a
  two-way `v-if`/`v-else` would treat the `null` loading state the same as "valid" and render
  the form immediately, before the API confirms it, letting a since-closed or never-`ACTIVE`
  screen (e.g. a completed/deprecated one someone still has a link to) show a fully usable form
  for as long as the fetch takes.
- No header meta strip, no schedule-derived display fields, no status-driven color logic —
  the header shows only `screenType` / `screenName`; the only styled alert is the plain
  window-status message from `fetchSubmissionMessage`.
- That computed only reflects the store's *cached* state, though — it does **not** gate the
  Submit button in `ReviewStep.vue`, which only requires a fully valid, reviewed form
  (`data.reviewed && allStepsValid`). Instead, `ReviewStep.vue` imports `active-screen-store.js`
  directly (no prop-drilling) and, in `submitForm()`, calls `activeScreenStore.refresh(apiUrl)`
  — a genuine re-fetch, not the cache — then reads `activeScreenStore.validationFor(screenName,
  screenType)` fresh, right before building the payload. Because both components read the same
  store, `screen-type.vue`'s `screenValidation` computed picks up that refreshed result too,
  automatically, with no event needed. On `INVALID` at submit time, `ReviewStep.vue` shows the
  same success/failure dialog used for the actual API call, with an explanatory message, and
  skips calling `postSubmission`. Since `refresh()` never rejects (see `loadable.js` above), it
  also checks `activeScreenStore.error` right after the `await` and, if the refresh itself
  failed, shows a "couldn't verify screen status" dialog and returns *without* calling
  `validationFor`/`postSubmission` — otherwise a failed refresh would silently fall through to
  validating against whatever was cached before, which could be stale or empty.
- `screenName` is passed down to `ReviewStep.vue` → `parseFormDataForApi(formData, screenType,
  screenName)` ([parseApiPayload.js](forms/steps/parseApiPayload.js)) as the `screen` field in
  the submission payload — also no longer sourced from `schedule.js`.
- `formStore` (`useFormProgressStore`, [store.js](store.js)) is keyed by `screenName`, not
  `screenType` — see "State management" in [forms/README.md](forms/README.md). This matters
  for the same reason as everything above: a type can have more than one screen over time
  (`MTS033`, then later `MTS034`), and each needs its own fresh in-progress form rather than
  inheriting a prior screen's draft.
