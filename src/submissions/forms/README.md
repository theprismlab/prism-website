# Submissions Forms

Multi-step submission form for PRISM screening requests. Each submission is scoped to a **screen** (e.g. `MTS-001`, `APS-042`) and persists state in a Pinia store across navigation.

## Directory structure

```
submissions/
├── store.js                     # Pinia store + FORM_STEPS definition
├── forms/
│   ├── screen.vue               # Page component — renders the accordion, drives step logic
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
│       ├── AcknowledgmentsStep.vue
│       └── ReviewStep.vue
```

## Form steps

Steps are defined in `store.js` as `FORM_STEPS` (ordered array) and wired up in `steps/registry.js`:

| Step ID          | Title            | Schema file                  |
|------------------|------------------|------------------------------|
| `collaborator`   | Collaborator     | `collaboratorSchema.js`      |
| `institution`    | Institution      | `institutionSchema.js`       |
| `testAgent`      | Test Agent       | `testAgentSchema.js`         |
| `acknowledgments`| Acknowledgments  | `acknowledgementsSchema.js`  |
| `review`         | Review & Submit  | `reviewSchema.js`            |

The review step behaves differently from the others — it owns its own Submit button and does not use the shared Continue button rendered by `screen.vue`.

## Review & Submit step

`ReviewStep.vue` renders a summary of all previous steps, a confirmation checkbox, and a Submit button.

**Flow:**
1. User reads the summary tables (pulled from each step's `getSummary`).
2. User checks "I have reviewed my submission and confirm it is correct." — this sets `data.reviewed = true`, which causes the live-validation watcher to mark the step Done.
3. User clicks Submit. The button is disabled until the checkbox is checked.
4. `submitForm()` fires the API call (see placeholder below) and shows a `v-dialog` with the success or error message returned by the API.

**Adding the real API call** — find the `TODO` comment in `ReviewStep.vue`:
```js
// TODO: replace with real API call, e.g.:
// const result = await ApiClasses.postSubmission(apiURL, this.formData);
await new Promise((resolve) => setTimeout(resolve, 800)); // placeholder
```
Replace the placeholder with the actual call. `this.formData` contains the complete form payload (`collaborator`, `institution`, `testAgent`, `acknowledgments`, `review`). On success set `dialogSuccess = true` and a message; on catch set `dialogSuccess = false` and the error message — the dialog handles both cases.

## Schema pattern

Every schema module exports three functions consumed by `STEP_REGISTRY`:

```js
// Returns initial form data for a fresh screen.
export function getInitialData(screenType) { ... }

// Returns [{ label, value }] pairs for the Review step summary.
export function getSummary(data, screenType) { ... }

// Returns { fieldKey: errorMessage } — empty object means valid.
export function validate(data, screenType) { ... }
```

Schemas are plain JS with no Vue dependencies, making them easy to unit-test in isolation.

## Screen types

The `screenType` param is derived from the route param (`MTS`, `CPS`, `EPS`, `APS`, `AIR`) in `screen.vue` and passed through to every step's `validate` and `buildScreenFields` call.

**Test agent requirements by screen type** (`SCREEN_CONFIG` in `testAgentSchema.js`):

| Type | Solvent | Stock multiplier | Min amount | Notes |
|------|---------|-----------------|------------|-------|
| MTS  | DMSO    | 1000×           | 150 uL     | —     |
| CPS  | DMSO    | 1000×           | 150 uL solo / 400 uL × combo slots | Supports Drug A/B combination rows |
| EPS  | DMSO    | 1000×           | 600 uL (≥3× dilution) / 720 uL (2×) | Dilution factor field |
| APS  | Aqueous | 250×            | 1000 uL    | Unit pairs: uM→mM, ug/mL→mg/mL |
| AIR  | Aqueous | 500×            | 500 uL     | Top dose capped at 2 ug/mL |

## State management (`store.js`)

State is keyed by **screen ID** so the user can fill out multiple screens independently.

```
store.screens[screenId] = {
  openPanel: number,       // which accordion panel is expanded
  completed: number[],     // indices of steps that passed validation
  formData: { collaborator, institution, testAgent, acknowledgments, review }
}
```

Key store actions:

| Action | Effect |
|--------|--------|
| `_ensure(screen)` | Initialises state for a screen if not already present |
| `completeStep(screen, i)` | Marks step `i` complete and advances `openPanel` |
| `uncompleteStep(screen, i)` | Removes step `i` from `completed` (called when live validation detects a regression) |
| `markStepValid(screen, i)` | Marks a step complete without advancing the panel |
| `setOpenPanel(screen, i)` | Manually opens a panel (accordion click) |

`screen.vue` runs a deep watcher on `formData` to auto-complete or auto-invalidate steps as the user types, so the "Done" chip stays in sync without requiring the user to click Continue.

## Validation helpers (`validationHelpers.js`)

```js
required(val)      // → 'Required' | undefined
validEmail(val)    // → 'Invalid email address' | undefined
validNumber(val)   // → 'Must be a number' | undefined
```

Chain validators with `||`:
```js
required(val) || validEmail(val)
```

## Adding a new step

1. Create `steps/NewStepSchema.js` exporting `getInitialData`, `getSummary`, `validate`.
2. Create `steps/NewStep.vue` that accepts `:data` and `:errors` props and mutates `data` in place.
3. Add the step to `FORM_STEPS` in `store.js` (order matters — it controls the accordion order).
4. Register it in `STEP_REGISTRY` in `steps/registry.js`.
5. Add a `v-else-if` branch in `screen.vue` to render the new component.
