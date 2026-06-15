<template>
  <test-agent-table :fields="Object.values(F)" :row="data.rows[0]" :errors="errors" />
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';

  const DOSE_UNITS = ['uM'];

  const FIELDS = {
    PERT_NAME:       { key: 'pert_name',       label: 'Perturbation Name', required: true },
    PERT_DOSE:       { key: 'pert_dose',       label: 'Top Dose',          required: true, type: 'number' },
    PERT_DOSE_UNIT:  {
      key: 'pert_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: DOSE_UNITS,
      validate: (val) => {
        if (!DOSE_UNITS.includes(val.trim())) return `Must be one of: ${DOSE_UNITS.join(', ')}`;
      },
    },
    VOLUME:          { key: 'volume',          label: 'Volume (uL)',      required: true, type: 'number' },
    DILUTION_FACTOR: { key: 'dilution_factor', label: 'Dilution Factor',  required: true },
    PERT_ID:         { key: 'pert_id',         label: 'Perturbation ID',  required: true },
  };

  export function getInitialData() {
    return { rows: [Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']))] };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return Object.values(FIELDS).map((f) => ({ label: f.label, value: row[f.key] })).filter((i) => i.value);
  }

  export function validate(data) {
    const errors = {};
    const row = data.rows[0];
    for (const f of Object.values(FIELDS)) {
      const val = row[f.key];
      if (f.required && !val) { errors[f.key] = 'Required'; continue; }
      if (f.validate && val) {
        const msg = f.validate(val);
        if (msg) errors[f.key] = msg;
      }
    }
    return errors;
  }

  export default {
    name: 'EpsTestAgentStep',
    components: { TestAgentTable },
    props: {
      data:   { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() { return { F: FIELDS }; },
  };
</script>
