# Submissions Forms

Multi-step submission form for PRISM screening requests. Each submission is scoped to a **screen** (e.g. `MTS-001`, `APS-042`) and persists state in a Pinia store across navigation.

## Directory structure

```
submissions/
├── store.js                     # Pinia store + FORM_STEPS definition
├── forms/
│   ├── screen-type.vue          # Page component — renders the accordion, drives step logic
│   ├── index.vue                # Entry point / route wrapper
│   ├── FormsSubDrawer.vue       # Sidebar drawer for the forms section
│   └── steps/
│       ├── registry.js          # STEP_REGISTRY — wires schema modules to step IDs
│       ├── validationHelpers.js # Shared primitive validators (required, validEmail, validNumber)
│       ├── collaboratorSchema.js
│       ├── institutionSchema.js
│       ├── testAgentSchema.js
│       ├── acknowledgementsSchema.js
│       ├── reviewSchema.js
│       ├── CollaboratorStep.vue
│       ├── InstitutionStep.vue
│       ├── TestAgentStep.vue
│       ├── TestAgentTable.vue
│       ├── AcknowledgementsStep.vue
│       └── ReviewStep.vue
```

## Form steps

Steps are defined in `store.js` as `FORM_STEPS` (ordered array) and wired up in `steps/registry.js`:

| Step ID            | Title            | Schema file                 |
| ------------------ | ---------------- | --------------------------- |
| `collaborator`     | Collaborator     | `collaboratorSchema.js`     |
| `institution`      | Institution      | `institutionSchema.js`      |
| `testAgent`        | Test Agent       | `testAgentSchema.js`        |
| `acknowledgements` | Acknowledgements | `acknowledgementsSchema.js` |
| `review`           | Review & Submit  | `reviewSchema.js`           |

The review step behaves differently from the others — it owns its own Submit button and does not use the shared Continue button rendered by `screen-type.vue`.

## Review & Submit step

`ReviewStep.vue` renders a summary of all previous steps, a confirmation checkbox, and a Submit button.

**Flow:**

1. User reads the summary tables (pulled from each step's `getSummary`).
2. User checks "I have reviewed my submission and confirm it is correct." — this sets `data.reviewed = true`, which causes the live-validation watcher to mark the step Done.
3. User clicks Submit. The button is disabled until the checkbox is checked.
4. `submitForm()` fires the API call (see placeholder below) and shows a `v-dialog` with the success or error message returned by the API.

`submitForm()` used to also re-confirm the screen was still open (`activeScreenStore.refresh()`)
right before submitting, and block the submit if that refresh failed for any reason. That was
removed after it caused a real bug — a transient failure on that pre-flight check (unrelated to
whether the actual submission would have succeeded) produced a "fails once, works on retry"
experience where the real submission was never even attempted the first time. See
[../SCREEN_STATUS_MIGRATION.md](../SCREEN_STATUS_MIGRATION.md) for the full writeup.

**The API call is wired up** — `submitForm()` calls `api.postSubmission(apiUrl, apiPayload)`,
where `apiPayload` is built by `parseResponseForApi()` →
`parseFormDataForApi(formData, screenType, screenName)`
([parseApiPayload.js](steps/parseApiPayload.js)). On success set `dialogSuccess = true` and a
message; on catch set `dialogSuccess = false` and the error message — the dialog handles both
cases. (There's a stale `// TODO: replace with real API call` comment left over above that
line in `ReviewStep.vue` — the call itself is already real, the comment just wasn't cleaned up.)

## Schema pattern

Every schema module exports three functions consumed by `STEP_REGISTRY`:

```js
// Returns initial form data for a fresh screen.
export function getInitialData(screenType) { ... }

// Returns [{ label, value }] pairs for the Review step summary.
export function getSummary(data) { ... }

// Returns { fieldKey: errorMessage } — empty object means valid.
export function validate(data, screenType) { ... }
```

`screenType` is only meaningful for schemas whose fields or rules actually differ by screen —
`STEP_REGISTRY`/`ReviewStep.vue` call every schema the same way regardless, so a schema that
doesn't need it just omits the parameter. Only `testAgentSchema.js` currently uses `screenType`
in all three functions (different fields, different validation math, and CPS-only combination
rows — see the table below). `collaboratorSchema.js` and `reviewSchema.js` don't take it at all.
`institutionSchema.js` accepts it in `validate(data, _screenType)` but ignores it — same
institution fields for every screen. `acknowledgementsSchema.js` also doesn't take it: every
screen shares the same acknowledgement fields, so unlike `testAgentSchema.js`'s
`buildScreenFields(screenType)`, it exports a plain `getFields()` with no per-screen selection.
(`screenType` is still passed as a _prop_ to `AcknowledgementsStep.vue`, but only to build the
links into screen-specific instructions pages inside the acknowledgement text — not to choose
which fields render.)

Schemas are plain JS with no Vue dependencies, making them easy to unit-test in isolation.

## Screen types

The route is `/submission-hub/forms/:screenType/:screen` — `screenType` (`MTS`, `CPS`, `EPS`,
`APS`, `AIR`) is passed down to every step component as a prop, but (per the previous section)
only `TestAgentStep.vue`/`testAgentSchema.js` actually varies fields or validation by it; other
steps either ignore it or don't take it. `screen` is the specific resolved screen name (e.g.
`MTS033`), used for the header display and as the `screen` field in the submission payload. How
`:screen` gets resolved, cached, and validated against the API is a separate concern from the
form steps documented here — see [../SCREEN_STATUS_MIGRATION.md](../SCREEN_STATUS_MIGRATION.md).

**Test agent requirements by screen type** (`SCREEN_CONFIG` in `testAgentSchema.js`):

| Type | Solvent | Stock multiplier | Min amount                          | Notes                              |
| ---- | ------- | ---------------- | ----------------------------------- | ---------------------------------- |
| MTS  | DMSO    | 1000×            | 150 uL                              | —                                  |
| CPS  | DMSO    | 1000×            | 150 uL solo / 400 uL × combo slots  | Supports Drug A/B combination rows |
| EPS  | DMSO    | 1000×            | 600 uL (≥3× dilution) / 720 uL (2×) | Dilution factor field              |
| APS  | Aqueous | 250×             | 1000 uL                             | Unit pairs: uM→mM, ug/mL→mg/mL     |
| AIR  | Aqueous | 500×             | 500 uL                              | Top dose capped at 2 ug/mL         |

## State management (`store.js`)

State is keyed by the specific resolved **screen name** (e.g. `MTS034`), not the screen type —
a type can have more than one screen over time (`SCHEDULE` has both `MTS033` and `MTS034`),
and each should start with a fresh form rather than inheriting a prior screen's in-progress
draft.

```
store.screens[screenName] = {
  openPanel: number,       // which accordion panel is expanded
  completed: number[],     // indices of steps that passed validation
  formData: { collaborator, institution, testAgent, acknowledgements, review }
}
```

Key store actions — `screenType` is only needed the first time a screen is touched, to build
the right initial form shape (schemas key off the type, not the specific screen name):

| Action                                     | Effect                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `_ensure(screenName, screenType)`          | Initialises state for a screen if not already present                                                         |
| `completeStep(screenName, screenType, i)`  | Marks step `i` complete and advances `openPanel`                                                              |
| `uncompleteStep(screenName, i)`            | Removes step `i` from `completed` (called when live validation detects a regression)                          |
| `markStepValid(screenName, screenType, i)` | Marks a step complete without advancing the panel                                                             |
| `setOpenPanel(screenName, screenType, i)`  | Manually opens a panel (accordion click), but only if `i` is not beyond the first incomplete step — see below |

`screen-type.vue` runs a deep watcher on `formData` to auto-complete or auto-invalidate steps as the user types, so the "Done" chip stays in sync without requiring the user to click Continue.

### Step ordering

Steps must be completed in order. `maxOpenIndex(screenName)` (a getter) returns the index of
the first not-yet-completed step — the furthest step currently reachable. `setOpenPanel` is a
no-op for any index beyond that, so clicking ahead on the accordion title or the sidebar
(`FormsSubDrawer.vue`) does nothing. `screen-type.vue` also disables (`:disabled`) any
`v-expansion-panel` beyond `maxOpenIndex`, and `stepStatus` returns `'locked'` (instead of
`'available'`) for those steps so the sidebar can grey them out and skip the click handler.
Moving forward via `completeStep` is unaffected — it advances `openPanel` directly by exactly
one step, which is always allowed.

## Validation helpers (`validationHelpers.js`)

```js
required(val); // → 'Required' | undefined
validEmail(val); // → 'Invalid email address' | undefined
validNumber(val); // → 'Must be a number' | undefined
```

Chain validators with `||`:

```js
required(val) || validEmail(val);
```

## Adding a new step

1. Create `steps/NewStepSchema.js` exporting `getInitialData`, `getSummary`, `validate`.
2. Create `steps/NewStep.vue` that accepts `:data` and `:errors` props and mutates `data` in place.
3. Add the step to `FORM_STEPS` in `store.js` (order matters — it controls the accordion order).
4. Register it in `STEP_REGISTRY` in `steps/registry.js`.
5. Add a `v-else-if` branch in `screen-type.vue` to render the new component.
