// Test Agent field schema and per-screen rules.
// Pure JS — no Vue dependencies — so it can be unit-tested and reused
// outside the component (e.g. server-side validation, CSV import, review step).

import { validPositiveNumber } from './validationHelpers';

const YES_NO = ['Yes', 'No'];
const STORAGE_OPTIONS = ['Room temperature', '4°C', '-20°C'];
const MOLECULE_TYPES = [
  'Antibody',
  'Aqueous Small Molecule',
  'Antibody Drug Conjugate',
  'Small Molecule',
];
const AMOUNT_UNITS = ['uL'];
const NONE = 'None'; // sentinel for CPS combination rows testing Drug A alone

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
    validate: validPositiveNumber,
  },
  TOP_DOSE_UNIT: { key: 'top_dose_unit', label: 'Top Dose Unit' },
  CONC: {
    key: 'conc',
    label: 'Stock Concentration',
    inputmode: 'decimal',
    validate: validPositiveNumber,
  },
  CONC_UNIT: { key: 'conc_unit', label: 'Stock Conc. Unit' },
  DILUTION_FACTOR: {
    key: 'dilution_factor',
    label: 'Dilution Factor',
    inputmode: 'decimal',
    validate: validPositiveNumber,
  },
  CONC_AMOUNT: {
    key: 'amount',
    label: 'Amount',
    inputmode: 'decimal',
    validate: validPositiveNumber,
  },
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
// directly without duplicating them. Kept as one flat table (rather than
// nested under SCREEN_DEFINITIONS below) so the numeric rules for all five
// screens can be compared at a glance.

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

// ── Shared row rules ────────────────────────────────────────────────────────
// Each returns an errors-object fragment ({} when the row is valid), so
// per-screen validators below can compose them with object spread.

// Shared across all screens: stock conc must equal top dose × (concMultiplier / 1000).
function checkConcMatchesTopDose(row, concMultiplier) {
  if (!row.top_dose) return {};
  const expected = Number(row.top_dose) * (concMultiplier / 1000);
  if (Math.abs(Number(row.conc) - expected) > 0.001) {
    return {
      conc: `Must equal ${concMultiplier}× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`,
    };
  }
  return {};
}

// Shared by every screen with a flat minimum-volume rule (MTS, CPS solo, APS, AIR).
// EPS's minimum depends on dilution factor and CPS's combo slots have their own
// rule on top of this, so both keep their own logic below.
function checkMinAmount(row, minAmountUL) {
  if (Number(row.amount) < minAmountUL) return { amount: `Minimum ${minAmountUL} uL required` };
  return {};
}

// Shared tooltip defaults: compound name uniqueness note, the conc/top-dose
// example sentence, the optional top-dose cap, and the optional unit-pairing
// note. `unitOverrides` lets AIR (ug/mL → mg/mL) swap in its own units/example
// instead of the default DMSO-screen uM → mM.
function commonTooltips(cfg, unitOverrides = {}) {
  const { topUnit = 'uM', stockUnit = 'mM', exampleTopDose = 10 } = unitOverrides;
  const tooltips = {};

  tooltips.compound_name =
    'Must be unique. For testing the same compound at multiple top doses, use a distinct name for each entry (e.g. append "-2")';

  if (cfg.maxTopDoseUgML !== undefined) tooltips.top_dose = `Maximum ${cfg.maxTopDoseUgML} ug/mL`;

  const divisor = 1000 / cfg.concMultiplier;
  const divisorText = divisor === 1 ? 'numerically' : `÷ ${divisor}`;
  tooltips.conc = `Must equal Top Screening Dose ${divisorText} (e.g. ${exampleTopDose} ${topUnit} → ${exampleTopDose / divisor} ${stockUnit} stock)`;

  if (cfg.unitPairs)
    tooltips.conc_unit = `Must pair with Top Dose Unit: ${Object.entries(cfg.unitPairs)
      .map(([k, v]) => `${k} → ${v}`)
      .join(', ')}`;

  return tooltips;
}

// ── CPS: Test Agent row + Combination row ──────────────────────────────────
// CPS is the only screen with two row types: a Test Agent row (like every other screen) and
// a Combination row (Drug A / Drug B pairing). Defined ahead of SCREEN_DEFINITIONS so its
// entry below can just reference these by name.

// Every rule for a single CPS Test Agent row: solo amount/conc business rules (same as MTS),
// plus the combo-slot amount requirement and the "must appear as Drug A or Drug B somewhere"
// rule — both need `combinations` to cross-reference against the combination table.
function validateCPSTestAgentRow(row, combinations) {
  const { concMultiplier, minAmountUL, comboAmountPerSlotUL } = SCREEN_CONFIG.CPS;
  const errors = {
    ...checkMinAmount(row, minAmountUL),
    ...checkConcMatchesTopDose(row, concMultiplier),
  };

  if (combinations?.length > 0 && row.compound_name) {
    // Amount must cover 400 uL × slots this compound appears in (real or solo)
    const n = combinations
      .filter((r) => r.druga || r.drugb)
      .filter((r) => r.druga === row.compound_name || r.drugb === row.compound_name).length;
    if (n > 0) {
      const requiredVolume = n * comboAmountPerSlotUL;
      if (Number(row.amount) < requiredVolume) {
        errors.amount = `Minimum ${requiredVolume} uL required (${n} combination slot${n > 1 ? 's' : ''} × ${comboAmountPerSlotUL} uL)`;
      }
    }

    // Every test agent must be used as Drug A or Drug B in at least one combination
    const usedInCombination = combinations.some(
      (r) => r.druga === row.compound_name || r.drugb === row.compound_name,
    );
    if (!usedInCombination) {
      errors.compound_name = 'Must be used as Drug A or Drug B in a combination below';
    }
  }

  return errors;
}

// Every rule for a single CPS combination-table row: required/format fields, Drug A/B name
// matching against the Test Agent table, dose matching, same-name check, duplicate-pair
// detection. `seenPairs` is a Map shared across all rows in one validate() call — the caller
// owns it so duplicates are tracked across the whole combinations array, not per-row.
function validateCPSCombinationRow(comboRow, i, { rows, compoundNames, combinationFields, seenPairs }) {
  const comboErrors = {};
  const isSolo = comboRow.drugb === NONE; // Drug A tested alone: no Drug B dose to validate

  for (const f of combinationFields) {
    if (isSolo && (f.key === 'drugb_dose' || f.key === 'drugb_dose_unit')) continue;
    const val = comboRow[f.key];
    if (f.required !== false && !val) {
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

  // Drug B must be one of the submitted compound names, or "None" (Drug A tested alone)
  if (
    comboRow.drugb &&
    !isSolo &&
    compoundNames.length > 0 &&
    !compoundNames.includes(comboRow.drugb)
  ) {
    comboErrors.drugb = `Must be one of the submitted test agents, or "${NONE}": ${compoundNames.join(', ')}`;
  }

  // Drug A Top Dose must match the Top Screening Dose of that agent in the table above
  if (comboRow.druga && comboRow.druga_top_dose) {
    const matchRow = rows.find((r) => r.compound_name === comboRow.druga);
    if (
      matchRow?.top_dose &&
      Math.abs(Number(comboRow.druga_top_dose) - Number(matchRow.top_dose)) > 0.001
    ) {
      const unit = matchRow.top_dose_unit ? ` ${matchRow.top_dose_unit}` : '';
      comboErrors.druga_top_dose = `Must match Top Screening Dose (${matchRow.top_dose}${unit}) for ${comboRow.druga}`;
    }
  }

  // Drug B Dose must match the Top Screening Dose of that agent in the table above
  if (!isSolo && comboRow.drugb && comboRow.drugb_dose) {
    const matchRow = rows.find((r) => r.compound_name === comboRow.drugb);
    if (
      matchRow?.top_dose &&
      Math.abs(Number(comboRow.drugb_dose) - Number(matchRow.top_dose)) > 0.001
    ) {
      const unit = matchRow.top_dose_unit ? ` ${matchRow.top_dose_unit}` : '';
      comboErrors.drugb_dose = `Must match Top Screening Dose (${matchRow.top_dose}${unit}) for ${comboRow.drugb}`;
    }
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
}

// Table-level rules for CPS: minimum counts on both tables, at least one valid combo entry,
// and the solo/real-combination pairing invariant (every Drug A needs both a combo entry and
// a solo entry, and vice versa). Returns the general-error strings, or [] if the table is valid.
function validateCPSTable(data, compoundNames) {
  const rows = data.rows ?? [];
  const combos = data.combinations ?? [];
  const messages = [];

  // CPS requires at least 2 test agents and at least 2 combination entries
  const nonBlankRowCount = rows.filter((r) => !isBlankRow(r)).length;
  if (nonBlankRowCount < 2) messages.push('At least 2 test agent entries are required.');

  const nonBlankComboCount = combos.filter((r) => !isBlankRow(r)).length;
  if (nonBlankComboCount < 2) messages.push('At least 2 combination entries are required.');

  // CPS requires at least one combination with a Drug A matching a submitted test agent
  const hasValidCombo = combos.some((r) => r.druga && compoundNames.includes(r.druga));
  if (!hasValidCombo) {
    messages.push(
      'The combination table must have at least 1 entry with Drug A matching a submitted test agent.',
    );
  }

  const realCombos = combos.filter((r) => r.druga && r.drugb && r.drugb !== NONE);
  const soloCombos = combos.filter((r) => r.druga && r.drugb === NONE);

  // Every Drug A used in a real combination must also have a solo entry (Drug B = "None").
  // Restricted to known compound names — an invalid Drug A is already flagged by the
  // "must be one of the submitted test agents" check in validateCPSCombinationRow.
  const drugAValues = [...new Set(realCombos.map((r) => r.druga))].filter((druga) =>
    compoundNames.includes(druga),
  );
  const missingNoneEntries = drugAValues.filter(
    (druga) => !soloCombos.some((r) => r.druga === druga),
  );
  messages.push(
    ...missingNoneEntries.map(
      (druga) => `${druga} needs an additional combination entry with Drug B set to "${NONE}"`,
    ),
  );

  // Every solo entry (Drug B = "None") must also have a corresponding real combination entry.
  // Same restriction to known compound names as above.
  const soloDrugAValues = [...new Set(soloCombos.map((r) => r.druga))].filter((druga) =>
    compoundNames.includes(druga),
  );
  const missingComboEntries = soloDrugAValues.filter(
    (druga) => !realCombos.some((r) => r.druga === druga),
  );
  messages.push(
    ...missingComboEntries.map(
      (druga) =>
        `${druga}'s solo entry (Drug B = "${NONE}") needs a corresponding combination entry with an actual Drug B`,
    ),
  );

  return messages;
}

// Every rule for a single EPS row: dilution factor floor, dilution-dependent amount
// minimum (2–<3× → 720 uL, 3+× → 600 uL), plus the shared conc/top-dose rule.
function validateEPSTestAgentRow(row) {
  const {
    concMultiplier,
    minDilutionFactor,
    minAmountHighDilutionUL,
    minAmountLowDilutionUL,
    dilutionThreshold,
  } = SCREEN_CONFIG.EPS;
  const errors = { ...checkConcMatchesTopDose(row, concMultiplier) };

  const dilutionFactor = Number(row.dilution_factor) || 0;
  if (row.dilution_factor && dilutionFactor < minDilutionFactor)
    errors.dilution_factor = `Minimum dilution factor is ${minDilutionFactor}`;

  const minAmount =
    dilutionFactor >= dilutionThreshold ? minAmountHighDilutionUL : minAmountLowDilutionUL;
  if (Number(row.amount) < minAmount)
    errors.amount = `Minimum ${minAmount} uL required (${dilutionFactor >= dilutionThreshold ? `≥${dilutionThreshold}` : `2–${dilutionThreshold}`}-fold dilution)`;

  return errors;
}

// ── Screen definitions ──────────────────────────────────────────────────────
// One entry per screen type, holding everything needed to render and validate
// that screen's table(s): field order, row validator, and tooltips (plus,
// for CPS only, the combination-table field list/validator/tooltips). Reading
// one screen top-to-bottom here tells the whole story instead of jumping
// between separate fields/validators/tooltips maps.

export const SCREEN_DEFINITIONS = {
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
    validateRow: (row) => ({
      ...checkMinAmount(row, SCREEN_CONFIG.MTS.minAmountUL),
      ...checkConcMatchesTopDose(row, SCREEN_CONFIG.MTS.concMultiplier),
    }),
    tooltips: () => ({
      ...commonTooltips(SCREEN_CONFIG.MTS),
      amount: `Minimum ${SCREEN_CONFIG.MTS.minAmountUL} uL required`,
    }),
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
        validate: validPositiveNumber,
      },
      { key: 'druga_top_dose_unit', label: 'Drug A Top Dose Unit', options: ['uM'] },
      { key: 'drugb', label: 'Drug B Compound Name' },
      {
        key: 'drugb_dose',
        label: 'Drug B Dose',
        inputmode: 'decimal',
        validate: validPositiveNumber,
        disabled: (row) => row.drugb === NONE,
      },
      {
        key: 'drugb_dose_unit',
        label: 'Drug B Dose Unit',
        options: ['uM'],
        disabled: (row) => row.drugb === NONE,
      },
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
    validateRow: validateCPSTestAgentRow,
    validateTable: validateCPSTable,
    validateCombinationRow: validateCPSCombinationRow,
    tooltips: () => {
      const cfg = SCREEN_CONFIG.CPS;
      const base = commonTooltips(cfg);
      return {
        ...base,
        amount: `Minimum ${cfg.minAmountUL} uL solo. If in combinations: ${cfg.comboAmountPerSlotUL} uL × number of combination slots`,
        compound_name: `${base.compound_name}. Must also be used as Drug A or Drug B in at least one row of the combination table below`,
      };
    },
    combinationTooltips: () => ({
      druga:
        'Must match the Test Agent Name of a compound in the table above. Each Drug A compound needs both a combination entry (with a real Drug B) and a solo entry (Drug B = "None")',
      druga_top_dose:
        'Must match the Top Screening Dose of the selected Drug A in the table above.',
      drugb:
        'Must match the Test Agent Name of a compound in the table above, or "None" if Drug A is tested alone',
      drugb_dose:
        'Must match the Top Screening Dose of the selected Drug B in the table above. Not required when Drug B is "None"',
      drugb_dose_unit: 'Not required when Drug B is "None"',
    }),
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
    validateRow: validateEPSTestAgentRow,
    tooltips: () => {
      const cfg = SCREEN_CONFIG.EPS;
      return {
        ...commonTooltips(cfg),
        dilution_factor: `Minimum ${cfg.minDilutionFactor}`,
        amount: `Dilution factor ${cfg.minDilutionFactor} to <${cfg.dilutionThreshold}: minimum ${cfg.minAmountLowDilutionUL} uL. Dilution factor ${cfg.dilutionThreshold}+: minimum ${cfg.minAmountHighDilutionUL} uL`,
      };
    },
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
    validateRow: (row) => {
      const { concMultiplier, minAmountUL, unitPairs } = SCREEN_CONFIG.APS;
      const errors = {
        ...checkMinAmount(row, minAmountUL),
        ...checkConcMatchesTopDose(row, concMultiplier),
      };

      const expectedUnit = unitPairs[row.top_dose_unit];
      if (expectedUnit && expectedUnit !== row.conc_unit)
        errors.conc_unit = `Must be ${expectedUnit} when top dose unit is ${row.top_dose_unit}`;

      return errors;
    },
    tooltips: () => ({
      ...commonTooltips(SCREEN_CONFIG.APS),
      amount: `Minimum ${SCREEN_CONFIG.APS.minAmountUL} uL required`,
    }),
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
    validateRow: (row) => {
      const { concMultiplier, minAmountUL, maxTopDoseUgML } = SCREEN_CONFIG.AIR;
      const errors = {
        ...checkMinAmount(row, minAmountUL),
        ...checkConcMatchesTopDose(row, concMultiplier),
      };

      if (Number(row.top_dose) > maxTopDoseUgML)
        errors.top_dose = `Max top dose for AIR submissions is ${maxTopDoseUgML} ug/mL`;

      return errors;
    },
    tooltips: () => ({
      ...commonTooltips(SCREEN_CONFIG.AIR, { topUnit: 'ug/mL', stockUnit: 'mg/mL', exampleTopDose: 1 }),
      amount: `Minimum ${SCREEN_CONFIG.AIR.minAmountUL} uL required`,
    }),
  },
};

// ── Step lifecycle helpers ─────────────────────────────────────────────────

export function buildScreenFields(screenType) {
  const screen = SCREEN_DEFINITIONS[screenType];
  if (!screen) return [];
  const tooltips = screen.tooltips();
  return screen.fields.map((f) => ({ required: true, ...f, tooltip: tooltips[f.key] }));
}

export function buildCombinationFields(screenType, compoundNames = []) {
  const screen = SCREEN_DEFINITIONS[screenType];
  const fields = screen?.combinationFields ?? [];
  const tooltips = screen?.combinationTooltips?.() ?? {};
  return fields.map((f) => ({
    ...f,
    tooltip: tooltips[f.key] ?? f.tooltip,
    ...(f.key === 'drugb' ? { options: [...compoundNames, NONE] } : {}),
  }));
}

// A row the user added but never filled in — skip validation and drop from the submitted payload.
export function isBlankRow(row) {
  return Object.values(row).every((v) => !v);
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
  const compoundNames = rows.map((r) => r.compound_name).filter(Boolean);
  const nameCounts = compoundNames.reduce((acc, name) => {
    acc[name] = (acc[name] ?? 0) + 1;
    return acc;
  }, {});
  const errors = {};
  const screen = SCREEN_DEFINITIONS[screenType];

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

    const screenErrors = screen?.validateRow(row, data.combinations) ?? {};

    const merged = { ...rErrors, ...screenErrors };

    // Test Agent Name must be unique — matching by name elsewhere (combinations,
    // amount-per-slot) becomes ambiguous otherwise
    if (row.compound_name && nameCounts[row.compound_name] > 1) {
      merged.compound_name =
        'Test Agent Name must be unique. Testing the same compound at multiple doses? Use a distinct name for each entry (e.g. append "-2")';
    }

    return merged;
  });

  if (rowErrors.some((e) => Object.keys(e).length > 0)) {
    errors.rows = rowErrors;
  }

  // Table-level validation: screens with a table-level validator (currently just CPS)
  // run their own message set; every other screen just needs at least 1 entry.
  const tableMessages = screen?.validateTable?.(data, compoundNames);
  if (tableMessages) {
    if (tableMessages.length > 0) errors.general = [...(errors.general ?? []), ...tableMessages];
  } else if (rows.filter((r) => !isBlankRow(r)).length < 1) {
    errors.general = ['At least 1 test agent entry is required.'];
  }

  // Combination-table validation (currently just CPS)
  const combinationFields = buildCombinationFields(screenType);
  if (combinationFields.length > 0 && data.combinations && screen?.validateCombinationRow) {
    const seenPairs = new Map();
    const ctx = { rows, compoundNames, combinationFields, seenPairs };

    const combinationErrors = data.combinations.map((comboRow, i) =>
      screen.validateCombinationRow(comboRow, i, ctx),
    );

    if (combinationErrors.some((e) => Object.keys(e).length > 0)) {
      errors.combinations = combinationErrors;
    }
  }

  return errors;
}
