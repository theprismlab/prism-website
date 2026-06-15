// Test Agent field schema and per-screen rules.
// Pure JS — no Vue dependencies — so it can be unit-tested and reused
// outside the component (e.g. server-side validation, CSV import, review step).

const BRD_REGEX = /^BRD-[AKUMC][0-9]{8}-[0-9]{3}-[0-9]{2}-[0-9]$|^BRD-[AKUM][0-9]{8}$/;
const YES_NO = ['Yes', 'No'];
const STORAGE_OPTIONS = ['Room temperature', '4°C', '-20°C'];
const MOLECULE_TYPES = [
  'Antibody',
  'Aqueous Small Molecule',
  'Antibody Drug Conjugate',
  'Small Molecule',
];
const AMOUNT_UNITS = ['uL']; // only supported unit

// ── Field registry ─────────────────────────────────────────────────────────
// All fields are required by default; set required: false to opt out.

const FIELDS = {
  COMPOUND_NAME:         { key: 'compound_name',        label: 'Test Agent Name' },
  FULL_BRD:              { key: 'full_brd',              label: 'Full BRD', required: false, validate: (val) => (BRD_REGEX.test(val.toUpperCase()) ? undefined : 'Must be a valid BRD ID') },
  MOLECULE_TYPE:         { key: 'molecule_type',         label: 'Molecule Type', options: MOLECULE_TYPES },
  SOLVENT:               { key: 'solvent',               label: 'Solvent' },
  TOP_DOSE:              { key: 'top_dose',              label: 'Top Screening Dose', type: 'number' },
  TOP_DOSE_UNIT:         { key: 'top_dose_unit',         label: 'Top Dose Unit' },
  CONC:                  { key: 'conc',                  label: 'Stock Concentration', type: 'number' },
  CONC_UNIT:             { key: 'conc_unit',             label: 'Stock Conc. Unit' },
  DILUTION_FACTOR:       { key: 'dilution_factor',       label: 'Dilution Factor' },
  AMOUNT:                { key: 'amount',                label: 'Amount', type: 'number' },
  AMOUNT_UNIT:           { key: 'amount_unit',           label: 'Amount Unit', options: AMOUNT_UNITS },
  SUPPLIER:              { key: 'supplier',              label: 'Supplier' },
  SUPPLIER_CATALOG_NAME: { key: 'supplier_catalog_name', label: 'Supplier Catalog Name' },
  STORAGE_CONDITIONS:    { key: 'storage_conditions',    label: 'Storage Conditions', options: STORAGE_OPTIONS },
  QC_LAST_SIX_MONTHS:   { key: 'qc_last_six_months',    label: "QC'd in last 6 months?", options: YES_NO },
  SDS_AVAILABLE:         { key: 'sds_available',         label: 'SDS Available?', options: YES_NO },
  HEALTH_HAZARD:         { key: 'health_hazard',         label: 'Health Hazard?', options: YES_NO },
  ACUTELY_TOXIC:         { key: 'acutely_toxic',         label: 'Acutely Toxic?', options: YES_NO },
};

// Keyed by data key for O(1) lookups in getSummary and getInitialData.
const FIELDS_BY_KEY = Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f]));

// ── Per-screen overrides ───────────────────────────────────────────────────
// Keyed by FIELDS constant name. row.* references inside validate functions
// use data keys since they reference the runtime data object directly.

const DMSO_OVERRIDES = {
  TOP_DOSE_UNIT: { options: ['uM'] },
  CONC: {
    validate: (val, row) => {
      const topDose = row[FIELDS.TOP_DOSE.key];
      if (!topDose) return;
      if (Number(val) !== Number(topDose))
        return `Must equal 1000× top dose (expected ${topDose} mM)`;
    },
  },
  CONC_UNIT: { options: ['mM'] },
  AMOUNT: {
    validate: (val) =>
      Number(val) < 150 ? 'Minimum 150 uL required (1000× screening concentration in 100% DMSO)' : undefined,
  },
};

const APS_OVERRIDES = {
  TOP_DOSE_UNIT: { options: ['uM', 'ug/mL'] },
  CONC: {
    validate: (val, row) => {
      const topDose = row[FIELDS.TOP_DOSE.key];
      if (!topDose) return;
      const expected = Number(topDose) * 0.25;
      if (Math.abs(Number(val) - expected) > 0.001)
        return `Must equal 250× top dose (expected ${expected.toFixed(3)} ${row[FIELDS.CONC_UNIT.key] || ''})`;
    },
  },
  CONC_UNIT: {
    options: ['mM', 'mg/mL'],
    validate: (val, row) => {
      const topDoseUnit = row[FIELDS.TOP_DOSE_UNIT.key];
      const pairs = { uM: 'mM', 'ug/mL': 'mg/mL' };
      if (topDoseUnit && pairs[topDoseUnit] !== val)
        return `Must be ${pairs[topDoseUnit]} when top dose unit is ${topDoseUnit}`;
    },
  },
};

const AIR_OVERRIDES = {
  TOP_DOSE: {
    validate: (val) =>
      Number(val) > 2 ? 'Max top dose for AIR submissions is 2 ug/mL' : undefined,
  },
  TOP_DOSE_UNIT: { options: ['ug/mL'] },
  CONC: {
    validate: (val, row) => {
      const topDose = row[FIELDS.TOP_DOSE.key];
      if (!topDose) return;
      const expected = Number(topDose) * 0.5;
      if (Math.abs(Number(val) - expected) > 0.001)
        return `Must equal 500× top dose (expected ${expected.toFixed(3)} mg/mL)`;
    },
  },
  CONC_UNIT: { options: ['mg/mL'] },
  AMOUNT: {
    validate: (val) =>
      Number(val) < 500 ? 'Minimum 500 uL required (500× screening concentration)' : undefined,
  },
};

// ── Field-group building blocks ────────────────────────────────────────────

const BRD_IDENTITY     = ['COMPOUND_NAME', 'FULL_BRD'];
const AQUEOUS_IDENTITY = ['COMPOUND_NAME', 'MOLECULE_TYPE', 'SOLVENT'];
const DOSE             = ['TOP_DOSE', 'TOP_DOSE_UNIT', 'CONC', 'CONC_UNIT'];
const AMOUNT           = ['AMOUNT', 'AMOUNT_UNIT'];
const SUPPLIER         = ['SUPPLIER', 'SUPPLIER_CATALOG_NAME', 'STORAGE_CONDITIONS'];
const SAFETY           = ['QC_LAST_SIX_MONTHS', 'SDS_AVAILABLE', 'HEALTH_HAZARD', 'ACUTELY_TOXIC'];

const SCREEN_CONFIGS = {
  MTS: { keys: [...BRD_IDENTITY, ...DOSE, ...AMOUNT, ...SUPPLIER, ...SAFETY], overrides: DMSO_OVERRIDES },
  CPS: { keys: [...BRD_IDENTITY, ...DOSE, ...AMOUNT, ...SUPPLIER, ...SAFETY], overrides: DMSO_OVERRIDES },
  EPS: { keys: [...BRD_IDENTITY, ...DOSE, 'DILUTION_FACTOR', ...AMOUNT, ...SUPPLIER, ...SAFETY], overrides: DMSO_OVERRIDES },
  APS: { keys: [...AQUEOUS_IDENTITY, ...DOSE, ...AMOUNT, ...SUPPLIER, ...SAFETY], overrides: APS_OVERRIDES },
  AIR: { keys: [...AQUEOUS_IDENTITY, ...DOSE, ...AMOUNT, ...SUPPLIER, ...SAFETY], overrides: AIR_OVERRIDES },
};

// ── Merge helper ───────────────────────────────────────────────────────────

export function buildScreenFields(screenType) {
  const config = SCREEN_CONFIGS[screenType];
  if (!config) return [];
  return config.keys.map((name) => {
    const field = FIELDS[name];
    return {
      ...field,
      required: field.required !== false,
      ...(config.overrides[name] || {}),
    };
  });
}

// ── Step lifecycle helpers ─────────────────────────────────────────────────

export function getInitialData() {
  return { row: Object.fromEntries(Object.keys(FIELDS_BY_KEY).map((k) => [k, ''])) };
}

export function getSummary(data) {
  return Object.entries(data.row)
    .filter(([, v]) => v)
    .map(([key, value]) => ({ label: FIELDS_BY_KEY[key]?.label ?? key, value }));
}

export function validate(data, screenType) {
  const errors = {};
  const { row } = data;
  for (const f of buildScreenFields(screenType)) {
    const val = row[f.key];
    if (f.required && !val) {
      errors[f.key] = 'Required';
      continue;
    }
    if (f.validate && val) {
      const msg = f.validate(val, row);
      if (msg) errors[f.key] = msg;
    }
  }
  return errors;
}
