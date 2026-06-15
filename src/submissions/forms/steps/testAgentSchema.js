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
// Canonical definitions: key, label, type, default options.
// All fields required by default; set required: false to opt out.

const FIELDS = {
  COMPOUND_NAME: { key: 'compound_name', label: 'Test Agent Name' },
  FULL_BRD: {
    key: 'full_brd',
    label: 'Full BRD',
    required: false,
    validate: (val) => (BRD_REGEX.test(val.toUpperCase()) ? undefined : 'Must be a valid BRD ID'),
  },
  MOLECULE_TYPE: { key: 'molecule_type', label: 'Molecule Type', options: MOLECULE_TYPES },
  SOLVENT: { key: 'solvent', label: 'Solvent' },
  TOP_DOSE: { key: 'top_dose', label: 'Top Screening Dose', type: 'number' },
  TOP_DOSE_UNIT: { key: 'top_dose_unit', label: 'Top Dose Unit' },
  CONC: { key: 'conc', label: 'Stock Concentration', type: 'number' },
  CONC_UNIT: { key: 'conc_unit', label: 'Stock Conc. Unit' },
  DILUTION_FACTOR: { key: 'dilution_factor', label: 'Dilution Factor' },
  AMOUNT: { key: 'amount', label: 'Amount', type: 'number' },
  AMOUNT_UNIT: { key: 'amount_unit', label: 'Amount Unit', options: AMOUNT_UNITS },
  SUPPLIER: { key: 'supplier', label: 'Supplier' },
  SUPPLIER_CATALOG_NAME: { key: 'supplier_catalog_name', label: 'Supplier Catalog Name' },
  STORAGE_CONDITIONS: {
    key: 'storage_conditions',
    label: 'Storage Conditions',
    options: STORAGE_OPTIONS,
  },
  QC_LAST_SIX_MONTHS: {
    key: 'qc_last_six_months',
    label: "QC'd in last 6 months?",
    options: YES_NO,
  },
  SDS_AVAILABLE: { key: 'sds_available', label: 'SDS Available?', options: YES_NO },
  HEALTH_HAZARD: { key: 'health_hazard', label: 'Health Hazard?', options: YES_NO },
  ACUTELY_TOXIC: { key: 'acutely_toxic', label: 'Acutely Toxic?', options: YES_NO },
};

// Keyed by data key for O(1) lookups in getSummary and getInitialData.
const FIELDS_BY_KEY = Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f]));

// ── Per-screen validators ──────────────────────────────────────────────────

function validateDmsoConc(val, row) {
  const topDose = row.top_dose;
  if (!topDose) return;
  if (Number(val) !== Number(topDose)) return `Must equal 1000× top dose (expected ${topDose} mM)`;
}

function validateApsConc(val, row) {
  const topDose = row.top_dose;
  if (!topDose) return;
  const expected = Number(topDose) * 0.25;
  if (Math.abs(Number(val) - expected) > 0.001)
    return `Must equal 250× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
}

function validateApsConcUnit(val, row) {
  const pairs = { uM: 'mM', 'ug/mL': 'mg/mL' };
  const expected = pairs[row.top_dose_unit];
  if (expected && expected !== val)
    return `Must be ${expected} when top dose unit is ${row.top_dose_unit}`;
}

function validateAirConc(val, row) {
  const topDose = row.top_dose;
  if (!topDose) return;
  const expected = Number(topDose) * 0.5;
  if (Math.abs(Number(val) - expected) > 0.001)
    return `Must equal 500× top dose (expected ${expected.toFixed(3)} mg/mL)`;
}

function validateAirTopDose(val) {
  return Number(val) > 2 ? 'Max top dose for AIR submissions is 2 ug/mL' : undefined;
}

function minAmount(min) {
  return (val) => (Number(val) < min ? `Minimum ${min} uL required` : undefined);
}

// ── Shared field groups ────────────────────────────────────────────────────

const SUPPLIER_FIELDS = [FIELDS.SUPPLIER, FIELDS.SUPPLIER_CATALOG_NAME, FIELDS.STORAGE_CONDITIONS];
const SAFETY_FIELDS = [
  FIELDS.QC_LAST_SIX_MONTHS,
  FIELDS.SDS_AVAILABLE,
  FIELDS.HEALTH_HAZARD,
  FIELDS.ACUTELY_TOXIC,
];

// ── Per-screen configurations ──────────────────────────────────────────────
// Each entry is the complete, ordered field list for that screen.
// - Fields used as-is: reference FIELDS.X directly.
// - Fields needing screen-specific options or validators: spread FIELDS.X and extend inline.

const SCREENS = {
  // ── MTS ──────────────────────────────────────────────────────────────────
  // DMSO-based. Stock = 1000× top dose (N uM assay → N mM stock). Min 150 uL.
  MTS: [
    FIELDS.COMPOUND_NAME,
    FIELDS.FULL_BRD,
    FIELDS.TOP_DOSE,
    { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
    { ...FIELDS.CONC, validate: validateDmsoConc },
    { ...FIELDS.CONC_UNIT, options: ['mM'] },
    { ...FIELDS.AMOUNT, validate: minAmount(150) },
    FIELDS.AMOUNT_UNIT,
    ...SUPPLIER_FIELDS,
    ...SAFETY_FIELDS,
  ],

  // ── CPS ──────────────────────────────────────────────────────────────────
  // DMSO-based. Stock = 1000× top dose (N uM assay → N mM stock).
  // Min 150 uL per compound (solo); 400 uL × n combinations per compound (combo flow).
  CPS: [
    FIELDS.COMPOUND_NAME,
    FIELDS.FULL_BRD,
    FIELDS.TOP_DOSE,
    { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
    { ...FIELDS.CONC, validate: validateDmsoConc },
    { ...FIELDS.CONC_UNIT, options: ['mM'] },
    { ...FIELDS.AMOUNT, validate: minAmount(150) },
    FIELDS.AMOUNT_UNIT,
    ...SUPPLIER_FIELDS,
    ...SAFETY_FIELDS,
  ],

  // ── EPS ──────────────────────────────────────────────────────────────────
  // DMSO-based. Stock = 1000× top dose (N uM assay → N mM stock).
  // Includes dilution factor. Min 600 uL.
  EPS: [
    FIELDS.COMPOUND_NAME,
    FIELDS.FULL_BRD,
    FIELDS.TOP_DOSE,
    { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
    { ...FIELDS.CONC, validate: validateDmsoConc },
    { ...FIELDS.CONC_UNIT, options: ['mM'] },
    FIELDS.DILUTION_FACTOR,
    { ...FIELDS.AMOUNT, validate: minAmount(600) },
    FIELDS.AMOUNT_UNIT,
    ...SUPPLIER_FIELDS,
    ...SAFETY_FIELDS,
  ],

  // ── APS ──────────────────────────────────────────────────────────────────
  // Aqueous. Stock = 250× top dose. Unit pairing: uM→mM, ug/mL→mg/mL. Min 150 uL.
  APS: [
    FIELDS.COMPOUND_NAME,
    FIELDS.MOLECULE_TYPE,
    FIELDS.SOLVENT,
    FIELDS.TOP_DOSE,
    { ...FIELDS.TOP_DOSE_UNIT, options: ['uM', 'ug/mL'] },
    { ...FIELDS.CONC, validate: validateApsConc },
    { ...FIELDS.CONC_UNIT, options: ['mM', 'mg/mL'], validate: validateApsConcUnit },
    { ...FIELDS.AMOUNT, validate: minAmount(150) },
    FIELDS.AMOUNT_UNIT,
    ...SUPPLIER_FIELDS,
    ...SAFETY_FIELDS,
  ],

  // ── AIR ──────────────────────────────────────────────────────────────────
  // Aqueous in reagent. Stock = 500× top dose (ug/mL → mg/mL).
  // Top dose capped at 2 ug/mL. Min 500 uL.
  AIR: [
    FIELDS.COMPOUND_NAME,
    FIELDS.MOLECULE_TYPE,
    FIELDS.SOLVENT,
    { ...FIELDS.TOP_DOSE, validate: validateAirTopDose },
    { ...FIELDS.TOP_DOSE_UNIT, options: ['ug/mL'] },
    { ...FIELDS.CONC, validate: validateAirConc },
    { ...FIELDS.CONC_UNIT, options: ['mg/mL'] },
    { ...FIELDS.AMOUNT, validate: minAmount(500) },
    FIELDS.AMOUNT_UNIT,
    ...SUPPLIER_FIELDS,
    ...SAFETY_FIELDS,
  ],
};

// ── Merge helper ───────────────────────────────────────────────────────────

export function buildScreenFields(screenType) {
  return (SCREENS[screenType] || []).map((f) => ({ required: true, ...f }));
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
