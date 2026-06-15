<template>
  <test-agent-table :fields="screenFields" :row="data.rows[0]" :errors="errors" />
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';

  const BRD_REGEX = /^BRD-[AKUMC][0-9]{8}-[0-9]{3}-[0-9]{2}-[0-9]$|^BRD-[AKUM][0-9]{8}$/;
  const YES_NO          = ['Yes', 'No'];
  const STORAGE_OPTIONS = ['Room temperature', '4°C', '-20°C'];
  const MOLECULE_TYPES  = ['Antibody', 'Aqueous Small Molecule', 'Antibody Drug Conjugate', 'Small Molecule'];

  // ── Field registry ─────────────────────────────────────────────────────────
  // One entry per field: static label, type, and options.
  // Screen-specific options and validate are applied via SCREEN_CONFIGS overrides.

  const FIELDS = {
    compound_name:         { label: 'Test Agent Name' },
    full_brd:              { label: 'Full BRD', required: false,
                             validate: (val) => BRD_REGEX.test(val.toUpperCase()) ? undefined : 'Must be a valid BRD ID' },
    molecule_type:         { label: 'Molecule Type',           options: MOLECULE_TYPES },
    solvent:               { label: 'Solvent' },
    top_dose:              { label: 'Top Screening Dose',      type: 'number' },
    top_dose_unit:         { label: 'Top Dose Unit' },
    conc:                  { label: 'Stock Concentration',     type: 'number' },
    conc_unit:             { label: 'Stock Conc. Unit' },
    dilution_factor:       { label: 'Dilution Factor' },
    amount:                { label: 'Amount',                  type: 'number' },
    amount_unit:           { label: 'Amount Unit',             options: ['uL'] },
    supplier:              { label: 'Supplier' },
    supplier_catalog_name: { label: 'Supplier Catalog Name' },
    storage_conditions:    { label: 'Storage Conditions',      options: STORAGE_OPTIONS },
    qc_last_six_months:    { label: "QC'd in last 6 months?",  options: YES_NO },
    sds_available:         { label: 'SDS Available?',          options: YES_NO },
    health_hazard:         { label: 'Health Hazard?',          options: YES_NO },
    acutely_toxic:         { label: 'Acutely Toxic?',          options: YES_NO },
  };

  // ── Screen configurations ──────────────────────────────────────────────────
  // Each screen lists its fields in column order and overrides for anything
  // that differs from FIELDS defaults (options, validate).

  const DMSO_OVERRIDES = {
    top_dose_unit: { options: ['uM'] },
    conc: {
      validate: (val, row) => {
        if (!row.top_dose) return;
        if (Number(val) !== Number(row.top_dose))
          return `Stock concentration (mM) must equal top dose (uM) — expected ${row.top_dose} mM`;
      },
    },
    conc_unit: { options: ['mM'] },
  };

  const APS_OVERRIDES = {
    top_dose_unit: { options: ['uM', 'ug/mL'] },
    conc: {
      validate: (val, row) => {
        if (!row.top_dose) return;
        const expected = Number(row.top_dose) * 0.25;
        if (Math.abs(Number(val) - expected) > 0.001)
          return `Must equal 250× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
      },
    },
    conc_unit: {
      options: ['mM', 'mg/mL'],
      validate: (val, row) => {
        const pairs = { uM: 'mM', 'ug/mL': 'mg/mL' };
        if (row.top_dose_unit && pairs[row.top_dose_unit] !== val)
          return `Must be ${pairs[row.top_dose_unit]} when top dose unit is ${row.top_dose_unit}`;
      },
    },
  };

  const AIR_OVERRIDES = {
    top_dose: {
      validate: (val) => Number(val) > 2 ? 'Max top dose for AIR submissions is 2 ug/mL' : undefined,
    },
    top_dose_unit: { options: ['ug/mL'] },
    conc: {
      validate: (val, row) => {
        if (!row.top_dose) return;
        const expected = Number(row.top_dose) * 0.5;
        if (Math.abs(Number(val) - expected) > 0.001)
          return `Must equal 500× top dose (expected ${expected.toFixed(3)} mg/mL)`;
      },
    },
    conc_unit: { options: ['mg/mL'] },
  };

  const MTS_CPS_KEYS = [
    'compound_name', 'full_brd',
    'top_dose', 'top_dose_unit', 'conc', 'conc_unit',
    'amount', 'amount_unit',
    'supplier', 'supplier_catalog_name', 'storage_conditions',
    'qc_last_six_months', 'sds_available', 'health_hazard', 'acutely_toxic',
  ];

  const EPS_KEYS = [
    'compound_name', 'full_brd',
    'top_dose', 'top_dose_unit', 'conc', 'conc_unit', 'dilution_factor',
    'amount', 'amount_unit',
    'supplier', 'supplier_catalog_name', 'storage_conditions',
    'qc_last_six_months', 'sds_available', 'health_hazard', 'acutely_toxic',
  ];

  const APS_KEYS = [
    'compound_name', 'molecule_type', 'solvent',
    'top_dose', 'top_dose_unit', 'conc', 'conc_unit',
    'amount', 'amount_unit',
    'supplier', 'supplier_catalog_name', 'storage_conditions',
    'qc_last_six_months', 'sds_available', 'health_hazard', 'acutely_toxic',
  ];

  const AIR_KEYS = [
    'compound_name', 'molecule_type', 'solvent',
    'top_dose', 'top_dose_unit', 'conc', 'conc_unit',
    'amount', 'amount_unit',
    'supplier', 'supplier_catalog_name', 'storage_conditions',
    'qc_last_six_months', 'sds_available', 'health_hazard', 'acutely_toxic',
  ];

  const SCREEN_CONFIGS = {
    MTS: { keys: MTS_CPS_KEYS, overrides: DMSO_OVERRIDES },
    CPS: { keys: MTS_CPS_KEYS, overrides: DMSO_OVERRIDES },
    EPS: { keys: EPS_KEYS, overrides: DMSO_OVERRIDES },
    APS: { keys: APS_KEYS, overrides: APS_OVERRIDES },
    AIR: { keys: AIR_KEYS, overrides: AIR_OVERRIDES },
  };

  // ── Merge helper ───────────────────────────────────────────────────────────

  function buildScreenFields(screenType) {
    const config = SCREEN_CONFIGS[screenType];
    if (!config) return [];
    return config.keys.map((key) => ({
      ...FIELDS[key],
      key,
      required: FIELDS[key].required !== false,
      ...config.overrides[key],
    }));
  }

  // ── Exports ────────────────────────────────────────────────────────────────

  export function getInitialData() {
    return { rows: [Object.fromEntries(Object.keys(FIELDS).map((k) => [k, '']))] };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return Object.entries(row)
      .filter(([, v]) => v)
      .map(([key, value]) => ({ label: FIELDS[key]?.label || key, value }));
  }

  export function validate(data, screenType) {
    const errors = {};
    const row = data.rows[0];
    for (const f of buildScreenFields(screenType)) {
      const val = row[f.key];
      if (f.required && !val) { errors[f.key] = 'Required'; continue; }
      if (f.validate && val) {
        const msg = f.validate(val, row);
        if (msg) errors[f.key] = msg;
      }
    }
    return errors;
  }

  export default {
    name: 'TestAgentStep',
    components: { TestAgentTable },
    props: {
      data:       { type: Object, required: true },
      errors:     { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return buildScreenFields(this.screenType);
      },
    },
  };
</script>
