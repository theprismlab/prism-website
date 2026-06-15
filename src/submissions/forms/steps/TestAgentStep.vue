<template>
  <test-agent-table :fields="screenFields" :row="data.rows[0]" :errors="errors" />
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';

  const BRD_REGEX = /^BRD-[AKUMC][0-9]{8}-[0-9]{3}-[0-9]{2}-[0-9]$|^BRD-[AKUM][0-9]{8}$/;
  const YES_NO = ['Yes', 'No'];
  const STORAGE_OPTIONS = ['Room temperature', '4°C', '-20°C'];
  const MOLECULE_TYPES = [
    'Antibody',
    'Aqueous Small Molecule',
    'Antibody Drug Conjugate',
    'Small Molecule',
  ];

  // ── Shared field groups ────────────────────────────────────────────────────

  const ID_FIELDS = {
    COMPOUND_NAME: { key: 'compound_name', label: 'Test Agent Name', required: true },
    FULL_BRD: {
      key: 'full_brd',
      label: 'Full BRD',
      validate: (val) =>
        !BRD_REGEX.test(val.toUpperCase()) ? 'Must be a valid BRD ID' : undefined,
    },
  };

  const AQUEOUS_ID_FIELDS = {
    COMPOUND_NAME: { key: 'compound_name', label: 'Test Agent Name', required: true },
    MOLECULE_TYPE: {
      key: 'molecule_type',
      label: 'Molecule Type',
      required: true,
      options: MOLECULE_TYPES,
    },
    SOLVENT: { key: 'solvent', label: 'Solvent', required: true },
  };

  const VOLUME_FIELDS = {
    AMOUNT: { key: 'amount', label: 'Amount', required: true, type: 'number' },
    AMOUNT_UNIT: { key: 'amount_unit', label: 'Amount Unit', required: true, options: ['uL'] },
  };

  const SAFETY_FIELDS = {
    SUPPLIER: { key: 'supplier', label: 'Supplier', required: true },
    SUPPLIER_CATALOG_NAME: {
      key: 'supplier_catalog_name',
      label: 'Supplier Catalog Name',
      required: true,
    },
    STORAGE_CONDITIONS: {
      key: 'storage_conditions',
      label: 'Storage Conditions',
      required: true,
      options: STORAGE_OPTIONS,
    },
    QC_LAST_SIX_MONTHS: {
      key: 'qc_last_six_months',
      label: "QC'd in last 6 months?",
      required: true,
      options: YES_NO,
    },
    SDS_AVAILABLE: {
      key: 'sds_available',
      label: 'SDS Available?',
      required: true,
      options: YES_NO,
    },
    HEALTH_HAZARD: {
      key: 'health_hazard',
      label: 'Health Hazard?',
      required: true,
      options: YES_NO,
    },
    ACUTELY_TOXIC: {
      key: 'acutely_toxic',
      label: 'Acutely Toxic?',
      required: true,
      options: YES_NO,
    },
  };

  // ── Screen-specific dose field groups ─────────────────────────────────────

  const DMSO_DOSE_FIELDS = {
    TOP_DOSE: { key: 'top_dose', label: 'Top Screening Dose', required: true, type: 'number' },
    TOP_DOSE_UNIT: {
      key: 'top_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: ['uM'],
    },
    CONC: {
      key: 'conc',
      label: 'Stock Concentration',
      required: true,
      type: 'number',
      validate: (val, row) => {
        if (row.top_dose && Number(val) !== Number(row.top_dose))
          return `Must equal 1000× top dose (expected ${row.top_dose} mM)`;
      },
    },
    CONC_UNIT: { key: 'conc_unit', label: 'Stock Conc. Unit', required: true, options: ['mM'] },
  };

  const APS_DOSE_FIELDS = {
    TOP_DOSE: { key: 'top_dose', label: 'Top Screening Dose', required: true, type: 'number' },
    TOP_DOSE_UNIT: {
      key: 'top_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: ['uM', 'ug/mL'],
    },
    CONC: {
      key: 'conc',
      label: 'Stock Concentration',
      required: true,
      type: 'number',
      validate: (val, row) => {
        if (!row.top_dose) return;
        const expected = Number(row.top_dose) * 0.25;
        if (Math.abs(Number(val) - expected) > 0.001)
          return `Must equal 250× top dose (expected ${expected.toFixed(3)} ${row.conc_unit || ''})`;
      },
    },
    CONC_UNIT: {
      key: 'conc_unit',
      label: 'Stock Conc. Unit',
      required: true,
      options: ['mM', 'mg/mL'],
      validate: (val, row) => {
        const pairs = { uM: 'mM', 'ug/mL': 'mg/mL' };
        if (row.top_dose_unit && pairs[row.top_dose_unit] !== val)
          return `Must be ${pairs[row.top_dose_unit]} when top dose unit is ${row.top_dose_unit}`;
      },
    },
  };

  const AIR_DOSE_FIELDS = {
    TOP_DOSE: {
      key: 'top_dose',
      label: 'Top Screening Dose',
      required: true,
      type: 'number',
      validate: (val) =>
        Number(val) > 2 ? 'Max top dose for AIR submissions is 2 ug/mL' : undefined,
    },
    TOP_DOSE_UNIT: {
      key: 'top_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: ['ug/mL'],
    },
    CONC: {
      key: 'conc',
      label: 'Stock Concentration',
      required: true,
      type: 'number',
      validate: (val, row) => {
        if (!row.top_dose) return;
        const expected = Number(row.top_dose) * 0.5;
        if (Math.abs(Number(val) - expected) > 0.001)
          return `Must equal 500× top dose (expected ${expected.toFixed(3)} mg/mL)`;
      },
    },
    CONC_UNIT: { key: 'conc_unit', label: 'Stock Conc. Unit', required: true, options: ['mg/mL'] },
  };

  // ── Screen configs ─────────────────────────────────────────────────────────

  const mtsConfig = { ...ID_FIELDS, ...DMSO_DOSE_FIELDS, ...VOLUME_FIELDS, ...SAFETY_FIELDS };

  const SCREEN_FIELDS = {
    MTS: mtsConfig,
    CPS: mtsConfig,
    EPS: {
      ...ID_FIELDS,
      ...DMSO_DOSE_FIELDS,
      DILUTION_FACTOR: { key: 'dilution_factor', label: 'Dilution Factor', required: true },
      ...VOLUME_FIELDS,
      ...SAFETY_FIELDS,
    },
    APS: { ...AQUEOUS_ID_FIELDS, ...APS_DOSE_FIELDS, ...VOLUME_FIELDS, ...SAFETY_FIELDS },
    AIR: { ...AQUEOUS_ID_FIELDS, ...AIR_DOSE_FIELDS, ...VOLUME_FIELDS, ...SAFETY_FIELDS },
  };

  // ── Exports ────────────────────────────────────────────────────────────────

  const ALL_FIELD_LABELS = Object.fromEntries(
    Object.values(SCREEN_FIELDS).flatMap((fields) =>
      Object.values(fields).map((f) => [f.key, f.label]),
    ),
  );

  export function getInitialData() {
    const allKeys = [
      ...new Set(
        Object.values(SCREEN_FIELDS).flatMap((fields) => Object.values(fields).map((f) => f.key)),
      ),
    ];
    return { rows: [Object.fromEntries(allKeys.map((k) => [k, '']))] };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return Object.entries(row)
      .filter(([, v]) => v)
      .map(([key, value]) => ({ label: ALL_FIELD_LABELS[key] || key, value }));
  }

  export function validate(data, screenType) {
    const errors = {};
    const row = data.rows[0];
    for (const f of Object.values(SCREEN_FIELDS[screenType] || {})) {
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

  export default {
    name: 'TestAgentStep',
    components: { TestAgentTable },
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return Object.values(SCREEN_FIELDS[this.screenType] || {});
      },
    },
  };
</script>
