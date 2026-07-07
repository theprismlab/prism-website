# Screen validation & routing

How the submission form determines "which screen" it's for, whether that screen is valid,
and how navigation keeps those two in sync. This replaces the static `SCHEDULE` json as the
source of truth for the form — modeled on `PRISM-data-portal`'s `SubmissionFormPage.vue`.

## Where `SCHEDULE` json still lives

[schedule.js](schedule.js) (`SCHEDULE`, `enrichedSchedule`, `FIELD_LABELS`, `TABLE_FIELD_KEYS`)
is used **only** by [index.vue](index.vue) — the Submission Hub's schedule table (window
dates, timepoint, data delivery estimates). Nothing under `forms/` reads it anymore.

Its `status` column isn't purely date math anymore, either. `enrichedSchedule(validationFor)`
takes an optional `(screenName, screenType) => { status, message }` lookup — `computedStatus` in
[schedule.js](schedule.js) checks whether *this* entry's `screen_name`/`screen_type` pair comes
back valid, before falling back to comparing `window_start`/`window_end` against today. `index.vue`
passes `screenStatusStore.validationFor` directly (the same getter documented below, not a
separately-built check), so a `SCHEDULE` entry only gets overridden to `OPEN` when it's both the
newest-`ACTIVE` screen for that type **and** that type's submission window is currently `OPEN` per
`prism_submission_window_message` — not merely *some* `ACTIVE` screen with a matching name, and
not a screen whose window has since closed. (An earlier version of this check compared against
`activeScreenNameFor` alone — identity only — which meant a closed-window screen could still show
`OPEN` in the hub table even after `validationFor` correctly blocked its actual form.) This also
still matters because `SCHEDULE` can have more than one entry per type (e.g. `MTS033` and
`MTS034`); without the identity half, an older `ACTIVE` entry could show as `OPEN` even after a
newer one supersedes it. `schedule` is a computed, not a static `data()` value, so the table
re-renders once the store resolves. There's no reverse override — if the dates say a window is
open but the API doesn't confirm both identity and accessibility, the date-based guess still
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
| [ScreenSelector.vue](ScreenSelector.vue) (type dropdown, shown in the forms/instructions drawers) | Reads `screenStatusStore.activeScreenNameFor(newType)` when switching type while already on the forms path, so it never carries over the old type's screen name — this also covers picking a type for the first time from the bare `/submission-hub/forms` page. |
| [SubmissionsDrawer.vue](SubmissionsDrawer.vue) / [InstructionsSubDrawer.vue](instructions/InstructionsSubDrawer.vue) | Read the same store via a `resolvedScreenName` computed (`screenStatusStore.activeScreenNameFor(screenType)`); the "Forms" link/button falls back to the generic `/submission-hub/forms` path if nothing is active. |

## `screen-status-store.js` — single source of truth for "what do we know about screens"

This used to be two stores (`active-screen-store.js` for `prism_screens`,
`window-status-store.js` for `prism_submission_window_message`), merged into one
[screen-status-store.js](screen-status-store.js) so every consumer of either concept shares one
`loaded` flag instead of each caller having to remember to guard on two stores' loading state
(a real gap: `FormsSubDrawer.vue` originally only guarded on `active-screen-store.js`'s `loaded`,
even after its `validationFor` started depending on window-message data too).

**Governing principle — the two source APIs answer two different questions and neither
substitutes for the other:**
- `prism_screens.status` (`ACTIVE` / `ACTIVE - WINDOW CLOSED` / `COMPLETE`) answers *"which
  screen is currently the one for this type"* — identity only. It is never read as a signal for
  whether that screen currently accepts submissions.
- `prism_submission_window_message.status` (`OPEN` / `MAX_CAPACITY` / `CLOSE` / `INVALID`)
  answers *"does this type currently accept submissions"* — accessibility. It is the only source
  for that question.

The store's state (`statuses`) is keyed by screen type (from the message rows — the canonical
list of known submission types), each entry merging both APIs: the raw
`prism_submission_window_message` row (`status`, `message`, ...) plus a `name` field resolved from
`prism_screens` (newest `ACTIVE` screen of that type, by `date_created` — same tier-1-only
resolution the old `active-screen-store.js` used; the `ACTIVE → ACTIVE - WINDOW CLOSED →
COMPLETE` fallback the pre-migration portal used is a separate, not-yet-restored concern).

- `load(apiUrl)` / `refresh(apiUrl)` / the `loaded` state — come from [loadable.js](loadable.js).
  `load(apiUrl)` runs `findScreens` and `fetchSubmissionMessage` in parallel (`Promise.all`) and
  builds `statuses` from both. Returns a promise; once `loaded` is `true` it resolves
  immediately, but while a fetch is already in flight, concurrent callers **share that same
  promise** rather than getting an empty no-op back. Use this for "give me *a* answer, cached is
  fine" (page loads, nav links). `refresh(apiUrl)` has the same in-flight-sharing behavior, but
  **always re-fetches**, bypassing the cache.
- Neither `load()` nor `refresh()` ever *rejects* — a failed fetch is caught, logged via
  `console.error`, and just leaves `loaded: false` (so a subsequent `load()` naturally retries
  instead of no-op'ing). There's no dedicated error state today — every consumer treats "still
  loading" and "failed to load" the same way (optimistically, until `loaded` flips `true`). This
  was tried and rolled back once already; see "Possible future improvement" near the end of this
  doc before re-adding it.
- `statusFor(screenType)` (getter) — the merged per-type entry, or `null` if `screenType` is
  falsy or unknown.
- `activeScreenNameFor(screenType)` (getter) — `statusFor(screenType)?.name ?? null`. Identity
  only, from `prism_screens`.
- `isValidType(screenType)` (getter) — is this a real, known submission type at all (own-key
  lookup on `statuses`, case-insensitive)? Used where there's no `:screen` to resolve, only a
  `:screenType` to validate (`Instructions*`).
- `messageFor(screenType)` (getter) — alias of `statusFor`; drives the informational
  window-status banner in `screen-type.vue` (`apiStatus`).
- `validationFor(screenName, screenType)` (getter) — is *this exact* screen name valid to submit
  against for this type? Two independent checks, matching the governing principle above:
  `screenName === statusFor(screenType)?.name` (identity, from `prism_screens`) **and**
  `statusFor(screenType)?.status === 'OPEN'` (accessibility, from
  `prism_submission_window_message`). Both must hold; anything else is one generic
  `{ status: 'INVALID', message }` — a deliberate simplification (matches how the pre-migration
  portal's single check worked) rather than a distinct message per failure reason.

Every consumer just calls `store.load(apiUrl)` once on `mounted` and reads whichever getter it
needs as a plain computed — no per-component data property, watcher, async method, or duplicate
network call.

## `api.js`

**`getTempApiKey(apiURL)`** — every authed call (`authedGet`, `postSubmission`) fetches its own
fresh temp key; there's no caching or sharing across calls. A version with a module-level `Map`
cache (sharing one key across concurrent/sequential calls) plus a retry-once-on-`401`/`403` in
`authedGet` was tried and then deliberately reverted: the caching only saved a couple of
redundant requests during initial page load, `postSubmission` — the one request where a stale
key would matter most, since it happens after a potentially long form fill — never benefited
from the retry logic anyway (retrying a POST automatically risks a double-submit, so it
deliberately wasn't wired up there), and the cache+retry interaction had a real if narrow
concurrency edge case (two concurrent calls racing to evict/refetch the same expired key). Plain
per-call fetching has no shared state and self-heals by construction.

**`findScreens(apiURL)`** — `GET prism_screens?filter={screen_category: 'EXTERNAL'}`. Returns
every external screen record (`name`, `screen_type`, `status`, `date_created`, ...). Backs the
`name` (identity) half of `screen-status-store.js`.

**`stripSeqSuffix(type)`** — strips the `_SEQ` suffix variant some screen/submission types come
back with (e.g. `MTS_SEQ` → `MTS`). Shared by `screen-status-store.js` and
`forms/screen-type.vue`, so this comparison rule only lives in one place.

**`fetchSubmissionMessage(apiURL, submission_type?)`** — drives both the informational
window-status alert (`OPEN` / `MAX_CAPACITY` / `CLOSE` / `INVALID` + message) and, since the
store merge, the accessibility half of `validationFor` via `screen-status-store.js`.

There's no `findScreen`/`validateScreen` here anymore — that single-name lookup used to be a
separate network call; see below.

## `forms/screen-type.vue`

- `screenType` — `$route.params.screenType`.
- `screenName` — `$route.params.screen` (falls back to `screenType` only if somehow absent).
- `screenValidation` is a **plain computed**, not local state assigned from an async method:
  `!screenStatusStore.loaded ? null : screenStatusStore.validationFor(screenName, screenType)`.
  `mounted()` just calls `screenStatusStore.load(apiUrl)` (fire-and-forget) — once it resolves,
  the computed re-evaluates on its own, no manual "await then assign" plumbing.
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
  (`data.reviewed && allStepsValid`). `ReviewStep.vue`'s `submitForm()` used to also re-check
  `validationFor(...)` fresh (via a `refresh()` call) right before submitting, to catch a screen
  that closed mid-fill — this was removed after it caused a real bug: the pre-flight `refresh()`
  could itself fail on a transient blip *unrelated to the actual submission*, and blocking the
  whole submit on that failure produced a "fails once, works on retry" experience where the first
  click's real submission was never even attempted. `submitForm()` now calls
  `api.postSubmission(...)` directly; if the screen genuinely is no longer valid by submit time,
  the backend rejects the POST and that error surfaces through the normal `catch` block like any
  other submission failure. `ReviewStep.vue` no longer imports `screen-status-store.js` at all.
- `screenName` is passed down to `ReviewStep.vue` → `parseFormDataForApi(formData, screenType,
  screenName)` ([parseApiPayload.js](forms/steps/parseApiPayload.js)) as the `screen` field in
  the submission payload — also no longer sourced from `schedule.js`.
- `formStore` (`useFormProgressStore`, [store.js](store.js)) is keyed by `screenName`, not
  `screenType` — see "State management" in [forms/README.md](forms/README.md). This matters
  for the same reason as everything above: a type can have more than one screen over time
  (`MTS033`, then later `MTS034`), and each needs its own fresh in-progress form rather than
  inheriting a prior screen's draft.

## Possible future improvement — centralizing loading/error handling

Not implemented; written down so the reasoning isn't lost if this comes up again.

Today, if a store's fetch outright fails (network down, server unreachable — not "the screen
doesn't exist," which `validationFor`/`isValidType` already handle correctly), every consumer
treats "still loading" and "will never load" identically, since `loaded` just stays `false`
forever either way (see `loadable.js` above). A bad screen name/type in the URL still shows the
correct, specific message immediately, because that path doesn't depend on the fetch failing —
only a genuine fetch failure is affected.

An `error` field on `loadable.js` plus a manual `if (store.error) return X; if (!store.loaded)
return Y;` check was added to six consumers (`screen-type.vue`, `FormsSubDrawer.vue`,
`InstructionsSubDrawer.vue`, `ScreenSelector.vue`, `test-agent.vue`, `shipping.vue`) to fix this,
then rolled back — the duplication itself became a bug source (two of the six sites initially
missed the `.error` check), and the value was narrow enough (only a total-fetch-failure, not the
much more common bad-URL case, and a page refresh already recovers) that removing it was judged
a reasonable trade for now.

If this gets revisited, the fix isn't to re-duplicate the same three-line check in six places
again — it's to fold loading/error awareness into the **one function each consumer already
calls**: `screen-status-store.js`'s `validationFor()` and `isValidType()`. Concretely:

- Both getters currently assume `loaded` is already `true` by the time they're called (callers
  check `!loaded` themselves first). Change them to a **tri-state return** instead:
  `validationFor(screenName, screenType)` → `null` (still loading), `{ status: 'INVALID',
  message }` (invalid — including "couldn't load" as one of the invalid reasons), or `{ status:
  null, message: null }` (confirmed valid). This is the *same* three shapes `screen-type.vue`'s
  template already branches on today, so no template changes would be needed there.
  `isValidType(submissionType)` → `null` (loading), `false` (confirmed not a known type, or
  couldn't confirm), or `true` (confirmed known type).
- `null` always means "don't know yet, treat optimistically" (matches the "avoid flashing"
  comments already throughout this codebase); `false`/`INVALID` always means "confirmed bad *or*
  couldn't check" — collapsing those two outcomes is intentional, since `screen-type.vue` already
  renders both identically (a red alert), just with different message text.
- Every consumer then makes exactly one call to the domain getter and one comparison against its
  result — no separate `loaded`/`error` branching left in any of them, and no way for a future
  consumer to "forget" the check, since it's baked into the function they already have to call
  to get their answer.
- `messageFor()` (the non-gating informational banner) wouldn't need this — it already fails
  silently to `null` on missing data, which is fine for something that's just an FYI, not a gate.
