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
