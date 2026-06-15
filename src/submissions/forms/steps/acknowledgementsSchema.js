// Acknowledgements step field schema and per-screen rules.
// Pure JS — no Vue dependencies.

const FIELDS = {
  ACKNOWLEDGEMENT_1: { key: 'acknowledgement1', label: 'Acknowledgement 1', default: false },
  ACKNOWLEDGEMENT_2: { key: 'acknowledgement2', label: 'Acknowledgement 2', default: false },
};

// Per-screen field lists — extend as screen variants are added.
const SCREEN_CONFIGS = {
  default: ['ACKNOWLEDGEMENT_1', 'ACKNOWLEDGEMENT_2'],
};

export function buildScreenFields(screenType) {
  const keys = SCREEN_CONFIGS[screenType] || SCREEN_CONFIGS.default;
  return keys.map((k) => FIELDS[k]);
}

export function getInitialData() {
  return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f.default]));
}

export function getSummary(data) {
  return Object.values(FIELDS)
    .map((f) => ({ label: f.label, value: data[f.key] ? 'Confirmed' : null }))
    .filter((item) => item.value);
}

export function validate(data, screenType) {
  const errors = {};
  for (const f of buildScreenFields(screenType)) {
    if (!data[f.key]) errors[f.key] = 'Required';
  }
  return errors;
}
