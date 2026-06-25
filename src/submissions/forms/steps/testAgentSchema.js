// Test Agent field schema and per-screen rules.
// Pure JS — no Vue dependencies — so it can be unit-tested and reused
// outside the component (e.g. server-side validation, CSV import, review step).

import { validNumber } from './validationHelpers';

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

export const FIELDS = {
  COMPOUND_NAME: { key: 'compound_name', label: 'Test Agent Name' },
  MOLECULE_TYPE: { key: 'molecule_type', label: 'Molecule Type', options: MOLECULE_TYPES },
  SOLVENT: { key: 'solvent', label: 'Solvent' },
  TOP_DOSE: {
    key: 'top_dose',
    label: 'Top Screening Dose',
    inputmode: 'decimal',
    validate: validNumber,
  },
  TOP_DOSE_UNIT: { key: 'top_dose_unit', label: 'Top Dose Unit' },
  CONC: { key: 'conc', label: 'Stock Concentration', inputmode: 'decimal', validate: validNumber },
  CONC_UNIT: { key: 'conc_unit', label: 'Stock Conc. Unit' },
  DILUTION_FACTOR: {
    key: 'dilution_factor',
    label: 'Dilution Factor',
    inputmode: 'decimal',
    validate: validNumber,
  },
  CONC_AMOUNT: { key: 'amount', label: 'Amount', inputmode: 'decimal', validate: validNumber },
  CONC_AMOUNT_UNIT: { key: 'amount_unit', label: 'Amount Unit', options: AMOUNT_UNITS },
  STORAGE_CONDITIONS: {
    key: 'storage_conditions',
    label: 'Storage Conditions',
    options: STORAGE_OPTIONS,
  },
  HEALTH_HAZARD: { key: 'health_hazard', label: 'Health Hazard?', options: YES_NO },
};

// Keyed by data key for O(1) lookups in getSummary and getInitialData.
const FIELDS_BY_KEY = Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f]));

// ── Screen config ──────────────────────────────────────────────────────────
// Exported so UI copy, instructions, and tests can reference these values
// directly without duplicating them.

export const SCREEN_CONFIG = {
  MTS: { concMultiplier: 1000, minAmountUL: 150 },
  CPS: { concMultiplier: 1000, minAmountUL: 150, comboAmountPerSlotUL: 400 }, // solo: 150 uL; combo: 400 × n slots
  EPS: {
    concMultiplier: 1000,
    minDilutionFactor: 2,
    minAmountHighDilutionUL: 600,
    minAmountLowDilutionUL: 720,
    dilutionThreshold: 3,
  },
  APS: { concMultiplier: 250, minAmountUL: 1000, unitPairs: { uM: 'mM', 'ug/mL': 'mg/mL' } },
  AIR: { concMultiplier: 500, minAmountUL: 500, maxTopDoseUgML: 2 },
};

// MTS: concAmountUnit must be uL (microliters)
// CPS: concAmountUnit must be uL (microliters)
// EPS: concAmountUnit must be uL (microliters)
// APS: concAmountUnit must match Top Dose Unit (ug/mL or )

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
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      FIELDS.STORAGE_CONDITIONS,
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.HEALTH_HAZARD,
    ],
  },

  // DMSO-based. Solo: same rules as MTS. Combo: 400 uL × n combinations.
  // Keys match getCombinationMapping() in compound-submission-constants.js.
  CPS: {
    combinationFields: [
      { key: 'druga', label: 'Drug A Compound Name' },
      {
        key: 'druga_top_dose',
        label: 'Drug A Top Dose',
        inputmode: 'decimal',
        validate: validNumber,
      },
      { key: 'druga_top_dose_unit', label: 'Drug A Top Dose Unit', options: ['uM'] },
      { key: 'drugb', label: 'Drug B Compound Name', required: false },
      {
        key: 'drugb_dose',
        label: 'Drug B Dose',
        inputmode: 'decimal',
        validate: validNumber,
        required: false,
      },
      { key: 'drugb_dose_unit', label: 'Drug B Dose Unit', options: ['uM'], required: false },
    ],
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      FIELDS.STORAGE_CONDITIONS,
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.HEALTH_HAZARD,
    ],
  },

  // DMSO-based. Includes dilution factor (min 2). Amount: 2 to <3 → 720 uL, 3+× → 600 uL.
  EPS: {
    fields: [
      FIELDS.COMPOUND_NAME,
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM'] },
      FIELDS.DILUTION_FACTOR,
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM'] },
      FIELDS.STORAGE_CONDITIONS,
      FIELDS.HEALTH_HAZARD,
    ],
  },

  // Aqueous. Unit pairing: uM→mM, ug/mL→mg/mL. Min 1000 uL. Stock = top dose / 4.
  APS: {
    fields: [
      FIELDS.COMPOUND_NAME,
      {
        ...FIELDS.MOLECULE_TYPE,
        options: ['Antibody', 'Aqueous Small Molecule', 'Antibody Drug Conjugate (ADC)', 'Other'],
      },
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['uM', 'ug/mL'] },
      FIELDS.SOLVENT,
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mM', 'mg/mL'] },
      FIELDS.STORAGE_CONDITIONS,
      FIELDS.HEALTH_HAZARD,
    ],
  },

  // Aqueous in reagent. Antibody only. Top dose capped at 2 ug/mL. Min 500 uL. Stock = top dose / 2.
  AIR: {
    fields: [
      FIELDS.COMPOUND_NAME,
      { ...FIELDS.MOLECULE_TYPE, options: ['Antibody'] },
      FIELDS.TOP_DOSE,
      { ...FIELDS.TOP_DOSE_UNIT, options: ['ug/mL'] },
      FIELDS.SOLVENT,
      FIELDS.CONC_AMOUNT,
      FIELDS.CONC_AMOUNT_UNIT,
      FIELDS.CONC,
      { ...FIELDS.CONC_UNIT, options: ['mg/mL'] },
      FIELDS.STORAGE_CONDITIONS,
      FIELDS.HEALTH_HAZARD,
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
  const {
    concMultiplier,
    minDilutionFactor,
    minAmountHighDilutionUL,
    minAmountLowDilutionUL,
    dilutionThreshold,
  } = SCREEN_CONFIG.EPS;
  const errors = {};

  const dilutionFactor = Number(row.dilution_factor) || 0;
  if (row.dilution_factor && dilutionFactor < minDilutionFactor)
    errors.dilution_factor = `Minimum dilution factor is ${minDilutionFactor}`;

  const minAmount =
    dilutionFactor >= dilutionThreshold ? minAmountHighDilutionUL : minAmountLowDilutionUL;
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

function buildTooltips(screenType) {
  const cfg = SCREEN_CONFIG[screenType];
  if (!cfg) return {};
  const tooltips = {};
  const divisor = 1000 / cfg.concMultiplier;

  if (cfg.maxTopDoseUgML !== undefined) tooltips.top_dose = `Maximum ${cfg.maxTopDoseUgML} ug/mL`;

  if (screenType === 'EPS') {
    tooltips.dilution_factor = `Minimum ${cfg.minDilutionFactor}`;
    tooltips.amount = `Dilution factor ${cfg.minDilutionFactor} to <${cfg.dilutionThreshold}: minimum ${cfg.minAmountLowDilutionUL} uL. Dilution factor ${cfg.dilutionThreshold}+: minimum ${cfg.minAmountHighDilutionUL} uL`;
  } else if (screenType === 'CPS') {
    tooltips.amount = `Minimum ${cfg.minAmountUL} uL solo. If in combinations: ${cfg.comboAmountPerSlotUL} uL × number of combination slots`;
  } else if (cfg.minAmountUL !== undefined) {
    tooltips.amount = `Minimum ${cfg.minAmountUL} uL required`;
  }

  const exampleTopDose = screenType === 'AIR' ? 1 : 10;
  const divisorText = divisor === 1 ? 'numerically' : `÷ ${divisor}`;
  const topUnit = screenType === 'AIR' ? 'ug/mL' : 'uM';
  const stockUnit = screenType === 'AIR' ? 'mg/mL' : 'mM';
  tooltips.conc = `Must equal Top Screening Dose ${divisorText} (e.g. ${exampleTopDose} ${topUnit} → ${exampleTopDose / divisor} ${stockUnit} stock)`;

  if (cfg.unitPairs)
    tooltips.conc_unit = `Must pair with Top Dose Unit: ${Object.entries(cfg.unitPairs)
      .map(([k, v]) => `${k} → ${v}`)
      .join(', ')}`;

  return tooltips;
}

export function buildScreenFields(screenType) {
  const screen = SCREENS[screenType];
  if (!screen) return [];
  const tooltips = buildTooltips(screenType);
  return screen.fields.map((f) => ({ required: true, ...f, tooltip: tooltips[f.key] }));
}

export function buildCombinationFields(screenType) {
  return SCREENS[screenType]?.combinationFields ?? [];
}

export function getInitialCombinationRow(screenType) {
  return Object.fromEntries(buildCombinationFields(screenType).map((f) => [f.key, '']));
}

export function getInitialRow() {
  return Object.fromEntries(Object.keys(FIELDS_BY_KEY).map((k) => [k, '']));
}

export function getInitialData(screenType) {
  const data = { rows: [getInitialRow()] };
  if (buildCombinationFields(screenType).length > 0) {
    data.combinations = [getInitialCombinationRow(screenType)];
  }
  return data;
}

export function getSummary(data) {
  const rows = data.rows ?? [];
  const prefix = rows.length > 1;
  return rows.flatMap((row, i) =>
    Object.entries(row)
      .filter(([, v]) => v)
      .map(([key, value]) => ({
        label: prefix
          ? `[Agent ${i + 1}] ${FIELDS_BY_KEY[key]?.label ?? key}`
          : (FIELDS_BY_KEY[key]?.label ?? key),
        value,
      })),
  );
}

export function validate(data, screenType) {
  const rows = data.rows ?? [];
  const errors = {};

  // Validate each compound row individually
  const rowErrors = rows.map((row) => {
    const rErrors = {};
    for (const f of buildScreenFields(screenType)) {
      const val = row[f.key];
      if (f.required !== false && !val) {
        rErrors[f.key] = 'Required';
        continue;
      }
      if (f.validate && val) {
        const msg = f.validate(val, row);
        if (msg) rErrors[f.key] = msg;
      }
    }

    const screenErrors = SCREEN_VALIDATORS[screenType]?.(row) ?? {};

    // CPS with combinations: amount must cover 400 uL × slots this compound appears in
    if (screenType === 'CPS' && data.combinations?.length > 0 && row.compound_name) {
      const { comboAmountPerSlotUL } = SCREEN_CONFIG.CPS;
      const n = data.combinations
        .filter((r) => r.druga || r.drugb)
        .filter((r) => r.druga === row.compound_name || r.drugb === row.compound_name).length;
      if (n > 0) {
        const requiredVolume = n * comboAmountPerSlotUL;
        if (Number(row.amount) < requiredVolume) {
          screenErrors.amount = `Minimum ${requiredVolume} uL required (${n} combination slot${n > 1 ? 's' : ''} × ${comboAmountPerSlotUL} uL)`;
        }
      }
    }

    return { ...rErrors, ...screenErrors };
  });

  if (rowErrors.some((e) => Object.keys(e).length > 0)) {
    errors.rows = rowErrors;
  }

  // Combination validation
  const combinationFields = buildCombinationFields(screenType);
  if (combinationFields.length > 0 && data.combinations) {
    const compoundNames = rows.map((r) => r.compound_name).filter(Boolean);
    const DRUG_B_KEYS = new Set(['drugb', 'drugb_dose', 'drugb_dose_unit']);
    const seenPairs = new Map();

    const combinationErrors = data.combinations.map((comboRow, i) => {
      const comboErrors = {};
      for (const f of combinationFields) {
        const val = comboRow[f.key];
        if (DRUG_B_KEYS.has(f.key)) {
          if (comboRow.drugb && !val) comboErrors[f.key] = 'Required when Drug B is specified';
        } else if (f.required !== false && !val) {
          comboErrors[f.key] = 'Required';
        }
        if (f.validate && val) {
          const msg = f.validate(val, comboRow);
          if (msg) comboErrors[f.key] = msg;
        }
      }

      // Drug A must be one of the submitted compound names
      if (comboRow.druga && compoundNames.length > 0 && !compoundNames.includes(comboRow.druga)) {
        comboErrors.druga = `Must be one of the submitted test agents: ${compoundNames.join(', ')}`;
      }

      // Drug B must be one of the submitted compound names
      if (comboRow.drugb && compoundNames.length > 0 && !compoundNames.includes(comboRow.drugb)) {
        comboErrors.drugb = `Must be one of the submitted test agents: ${compoundNames.join(', ')}`;
      }

      // Drug B cannot be the same as Drug A
      if (comboRow.drugb && comboRow.druga && comboRow.drugb === comboRow.druga) {
        comboErrors.drugb = 'Drug B cannot be the same as Drug A';
      }

      // Duplicate (Drug A, Drug B) pair
      const pairKey = `${comboRow.druga}|${comboRow.drugb ?? ''}`;
      if (comboRow.druga) {
        if (seenPairs.has(pairKey)) {
          comboErrors.druga = comboErrors.druga ?? 'Duplicate combination row';
        } else {
          seenPairs.set(pairKey, i);
        }
      }

      return comboErrors;
    });

    if (combinationErrors.some((e) => Object.keys(e).length > 0)) {
      errors.combinations = combinationErrors;
    }

    // Every unique Drug A must appear in at least one solo row (no Drug B)
    const allDrugAs = [...new Set(data.combinations.map((r) => r.druga).filter(Boolean))];
    const soloDrugAs = new Set(
      data.combinations
        .filter((r) => !r.drugb)
        .map((r) => r.druga)
        .filter(Boolean),
    );
    const missingSolo = allDrugAs.filter((a) => !soloDrugAs.has(a));
    if (missingSolo.length > 0) {
      errors.combinations_solo = `Each Drug A must also appear as a solo row (no Drug B): ${missingSolo.join(', ')}`;
    }
  }

  return errors;
}
