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
const AMOUNT_UNITS = ['uL'];

// ── Field registry ─────────────────────────────────────────────────────────
// Canonical definitions: key, label, type, default options.
// All fields required by default; set required: false to opt out.
// Validators here are for format/pattern checks only (e.g. BRD regex).
// Business rule validation (conc, amount) lives in the per-screen validators below.

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
  CONC_AMOUNT: { key: 'amount', label: 'Amount', type: 'number' },
  CONC_AMOUNT_UNIT: { key: 'amount_unit', label: 'Amount Unit', options: AMOUNT_UNITS },
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
  SMILES: { key: 'smiles', label: 'SMILES', required: false },
  CANCER_CELL_LINES: {
    key: 'cancer_cell_lines',
    label: 'Previously Tested Cancer Cell Lines',
    required: false,
  },
  TARGET_MOA: { key: 'target_moa', label: 'Target/MOA', required: false },
};

// Keyed by data key for O(1) lookups in getSummary and getInitialData.
const FIELDS_BY_KEY = Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f]));

// ── Screen config ──────────────────────────────────────────────────────────
// Exported so UI copy, instructions, and tests can reference these values
// directly without duplicating them.

export const SCREEN_CONFIG = {
  MTS: { concMultiplier: 1000, minAmountUL: 150 },
  CPS: { concMultiplier: 1000, minAmountUL: 150 }, // solo; combo amount = 400 × n (see validateCPS)
  EPS: { concMultiplier: 1000, minAmountHighDilutionUL: 600, minAmountLowDilutionUL: 720, dilutionThreshold: 3 },
  APS: { concMultiplier: 250, minAmountUL: 1000, unitPairs: { uM: 'mM', 'ug/mL': 'mg/mL' } },
  AIR: { concMultiplier: 500, minAmountUL: 500, maxTopDoseUgML: 2 },
};

// MTS: concAmountUnit must be uL (microliters)
// CPS: concAmountUnit must be uL (microliters)
// EPS: concAmountUnit must be uL (microliters)
// APS: concAmountUnit must match Top Dose Unit (ug/mL or )

// ── Shared field groups ────────────────────────────────────────────────────

const SUPPLIER_FIELDS = [FIELDS.SUPPLIER, FIELDS.SUPPLIER_CATALOG_NAME, FIELDS.STORAGE_CONDITIONS];
const SAFETY_FIELDS = [
  FIELDS.QC_LAST_SIX_MONTHS,
  FIELDS.SDS_AVAILABLE,
  FIELDS.HEALTH_HAZARD,
  FIELDS.ACUTELY_TOXIC,
];
const OPTIONAL_FIELDS = [FIELDS.SMILES, FIELDS.CANCER_CELL_LINES, FIELDS.TARGET_MOA];

// ── Screen field lists ─────────────────────────────────────────────────────
// Pure structure: field order, options, required overrides.
// No validators here — business rules live in the per-screen validators below.

const SCREENS = {
  // DMSO-based. Stock = 1000× top dose (N uM assay → N mM stock). Min 150 uL.
  MTS: {
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      ...SUPPLIER_FIELDS,
      ...SAFETY_FIELDS,
      FIELDS.FULL_BRD,
      ...OPTIONAL_FIELDS,
    ],
  },

  // DMSO-based. Solo: same rules as MTS. Combo: 400 uL × n combinations.
  CPS: {
    combinationFields: [
      { key: 'drug_a_name',          label: 'Drug A Name' },
      { key: 'drug_a_top_dose',      label: 'Drug A Top Dose', type: 'number' },
      { key: 'drug_a_top_dose_unit', label: 'Drug A Top Dose Unit', options: ['uM'] },
      { key: 'drug_b_name',          label: 'Drug B Name' },
      { key: 'drug_b_dose',          label: 'Drug B Dose', type: 'number' },
      { key: 'drug_b_dose_unit',     label: 'Drug B Dose Unit', options: ['uM'] },
    ],
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      ...SUPPLIER_FIELDS,
      ...SAFETY_FIELDS,
      FIELDS.FULL_BRD,
      ...OPTIONAL_FIELDS,
    ],
  },

  // DMSO-based. Includes dilution factor. Min 600 uL.
  EPS: {
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.DILUTION_FACTOR,
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      ...SUPPLIER_FIELDS,
      ...SAFETY_FIELDS,
      FIELDS.FULL_BRD,
      ...OPTIONAL_FIELDS,
    ],
  },

  // Aqueous. Unit pairing: uM→mM, ug/mL→mg/mL. Min 1000 uL.
  APS: {
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.MOLECULE_TYPE,
      FIELDS.SOLVENT,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM', 'ug/mL'] },
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM', 'mg/mL'] },
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      ...SUPPLIER_FIELDS,
      ...SAFETY_FIELDS,
      ...OPTIONAL_FIELDS,
    ],
  },

  // Aqueous in reagent. Top dose capped at 2 ug/mL. Min 500 uL.
  AIR: {
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.MOLECULE_TYPE,
      FIELDS.SOLVENT,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['ug/mL'] },
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mg/mL'] },
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      ...SUPPLIER_FIELDS,
      ...SAFETY_FIELDS,
      ...OPTIONAL_FIELDS,
    ],
  },
};

// ── Per-screen validators ──────────────────────────────────────────────────
// Each function takes a row and returns { fieldKey: errorMessage }.
// Call them directly in unit tests with a plain row object.

function validateMTS(row) {
  const { concMultiplier, minAmountUL } = SCREEN_CONFIG.MTS;
  const errors = {};

  if (Number(row.amount) < minAmountUL) errors.amount = `Minimum ${minAmountUL} uL required`;

  if (row.top_dose) {
    const expected = Number(row.top_dose) * (concMultiplier / 1000);
    if (Math.abs(Number(row.conc) - expected) > 0.001)
      errors.conc = `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
  }

  return errors;
}

// Solo mode uses MTS-equivalent rules. Combo flow will extend this with 400 uL × n logic.
function validateCPS(row) {
  const { concMultiplier, minAmountUL } = SCREEN_CONFIG.CPS;
  const errors = {};

  if (Number(row.amount) < minAmountUL) errors.amount = `Minimum ${minAmountUL} uL required`;

  if (row.top_dose) {
    const expected = Number(row.top_dose) * (concMultiplier / 1000);
    if (Math.abs(Number(row.conc) - expected) > 0.001)
      errors.conc = `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
  }

  return errors;
}

function validateEPS(row) {
  const { concMultiplier, minAmountHighDilutionUL, minAmountLowDilutionUL, dilutionThreshold } =
    SCREEN_CONFIG.EPS;
  const errors = {};

  const dilutionFactor = Number(row.dilution_factor) || 0;
  const minAmount = dilutionFactor >= dilutionThreshold ? minAmountHighDilutionUL : minAmountLowDilutionUL;
  if (Number(row.amount) < minAmount)
    errors.amount = `Minimum ${minAmount} uL required (${dilutionFactor >= dilutionThreshold ? `≥${dilutionThreshold}` : `2–${dilutionThreshold}`}-fold dilution)`;

  if (row.top_dose) {
    const expected = Number(row.top_dose) * (concMultiplier / 1000);
    if (Math.abs(Number(row.conc) - expected) > 0.001)
      errors.conc = `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
  }

  return errors;
}

function validateAPS(row) {
  const { concMultiplier, minAmountUL, unitPairs } = SCREEN_CONFIG.APS;
  const errors = {};

  if (Number(row.amount) < minAmountUL) errors.amount = `Minimum ${minAmountUL} uL required`;

  if (row.top_dose) {
    const expected = Number(row.top_dose) * (concMultiplier / 1000);
    if (Math.abs(Number(row.conc) - expected) > 0.001)
      errors.conc = `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
  }

  const expectedUnit = unitPairs[row.top_dose_unit];
  if (expectedUnit && expectedUnit !== row.conc_unit)
    errors.conc_unit = `Must be ${expectedUnit} when top dose unit is ${row.top_dose_unit}`;

  return errors;
}

function validateAIR(row) {
  const { concMultiplier, minAmountUL, maxTopDoseUgML } = SCREEN_CONFIG.AIR;
  const errors = {};

  if (Number(row.top_dose) > maxTopDoseUgML)
    errors.top_dose = `Max top dose for AIR submissions is ${maxTopDoseUgML} ug/mL`;

  if (Number(row.amount) < minAmountUL) errors.amount = `Minimum ${minAmountUL} uL required`;

  if (row.top_dose) {
    const expected = Number(row.top_dose) * (concMultiplier / 1000);
    if (Math.abs(Number(row.conc) - expected) > 0.001)
      errors.conc = `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
  }

  return errors;
}

const SCREEN_VALIDATORS = {
  MTS: validateMTS,
  CPS: validateCPS,
  EPS: validateEPS,
  APS: validateAPS,
  AIR: validateAIR,
};

// ── Step lifecycle helpers ─────────────────────────────────────────────────

export function buildScreenFields(screenType) {
  const screen = SCREENS[screenType];
  if (!screen) return [];
  return screen.fields.map((f) => ({ required: true, ...f }));
}

export function buildCombinationFields(screenType) {
  return SCREENS[screenType]?.combinationFields ?? [];
}

export function getInitialCombinationRow(screenType) {
  return Object.fromEntries(buildCombinationFields(screenType).map((f) => [f.key, '']));
}

export function getInitialData(screenType) {
  const data = { row: Object.fromEntries(Object.keys(FIELDS_BY_KEY).map((k) => [k, ''])) };
  if (buildCombinationFields(screenType).length > 0) {
    data.combinations = [getInitialCombinationRow(screenType)];
  }
  return data;
}

export function getSummary(data) {
  return Object.entries(data.row)
    .filter(([, v]) => v)
    .map(([key, value]) => ({ label: FIELDS_BY_KEY[key]?.label ?? key, value }));
}

export function validate(data, screenType) {
  const { row } = data;
  const errors = {};

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

  const combinationFields = buildCombinationFields(screenType);
  if (combinationFields.length > 0 && data.combinations) {
    const combinationErrors = data.combinations.map((comboRow) => {
      const rowErrors = {};
      for (const f of combinationFields) {
        if (!comboRow[f.key]) rowErrors[f.key] = 'Required';
      }
      return rowErrors;
    });
    if (combinationErrors.some((e) => Object.keys(e).length > 0)) {
      errors.combinations = combinationErrors;
    }
  }

  return { ...errors, ...(SCREEN_VALIDATORS[screenType]?.(row) ?? {}) };
}
