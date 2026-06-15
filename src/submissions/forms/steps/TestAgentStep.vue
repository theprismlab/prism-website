<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th>pert_name</th>
        <th>pert_dose</th>
        <th>pert_id</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-text-field
            v-model="data.rows[0].pert_name"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors.pert_name"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0].pert_dose"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors.pert_dose"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0].pert_id"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors.pert_id"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export function getInitialData() {
    return { rows: [{ pert_name: '', pert_dose: '', pert_id: '' }] };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return [
      { label: 'Perturbation Name', value: row.pert_name },
      { label: 'Perturbation Dose', value: row.pert_dose },
      { label: 'Perturbation ID', value: row.pert_id },
    ].filter((item) => item.value);
  }

  export function validate(data, _screenType) {
    const errors = {};
    const row = data.rows[0];
    if (!row.pert_name) errors.pert_name = 'Required';
    if (!row.pert_dose) errors.pert_dose = 'Required';
    if (!row.pert_id) errors.pert_id = 'Required';
    return errors;
  }

  export default {
    name: 'TestAgentStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
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
