<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th>{{ F.PERT_NAME.label }}</th>
        <th>{{ F.PERT_DOSE.label }}</th>
        <th>{{ F.PERT_DOSE_UNIT.label }}</th>
        <th>{{ F.VOLUME.label }}</th>
        <th>{{ F.PERT_ID.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-text-field v-model="data.rows[0][F.PERT_NAME.key]" variant="plain" density="compact" single-line :error-messages="errors[F.PERT_NAME.key]" />
        </td>
        <td>
          <v-text-field v-model="data.rows[0][F.PERT_DOSE.key]" variant="plain" density="compact" single-line type="number" :error-messages="errors[F.PERT_DOSE.key]" />
        </td>
        <td>
          <v-select v-model="data.rows[0][F.PERT_DOSE_UNIT.key]" :items="F.PERT_DOSE_UNIT.options" variant="plain" density="compact" single-line :error-messages="errors[F.PERT_DOSE_UNIT.key]" />
        </td>
        <td>
          <v-text-field v-model="data.rows[0][F.VOLUME.key]" variant="plain" density="compact" single-line type="number" :error-messages="errors[F.VOLUME.key]" />
        </td>
        <td>
          <v-text-field v-model="data.rows[0][F.PERT_ID.key]" variant="plain" density="compact" single-line :error-messages="errors[F.PERT_ID.key]" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  const DOSE_UNITS = ['uM', 'ug/mL'];

  const FIELDS = {
    PERT_NAME:      { key: 'pert_name',      label: 'Perturbation Name',  required: true },
    PERT_DOSE:      { key: 'pert_dose',      label: 'Top Dose',           required: true },
    PERT_DOSE_UNIT: {
      key: 'pert_dose_unit',
      label: 'Top Dose Unit',
      required: true,
      options: DOSE_UNITS,
      validate: (val) => {
        if (!DOSE_UNITS.includes(val.trim())) return `Must be one of: ${DOSE_UNITS.join(', ')}`;
      },
    },
    VOLUME:  { key: 'volume',  label: 'Volume (uL)',      required: true },
    PERT_ID: { key: 'pert_id', label: 'Perturbation ID',  required: true },
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
    name: 'ApsTestAgentStep',
    props: {
      data:   { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() { return { F: FIELDS }; },
  };
</script>

<style scoped>
  .perturbation-table th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
</style>
