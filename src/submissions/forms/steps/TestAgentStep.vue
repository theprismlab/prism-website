<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th>{{ F.PERT_NAME.label }}</th>
        <th>{{ F.PERT_DOSE.label }}</th>
        <th>{{ F.PERT_ID.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_NAME.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_NAME.key]"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_DOSE.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_DOSE.key]"
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0][F.PERT_ID.key]"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[F.PERT_ID.key]"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  const FIELDS = {
    PERT_NAME: { key: 'pert_name', label: 'Perturbation Name' },
    PERT_DOSE: { key: 'pert_dose', label: 'Perturbation Dose' },
    PERT_ID: { key: 'pert_id', label: 'Perturbation ID' },
  };

  export function getInitialData() {
    return {
      rows: [Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']))],
    };
  }

  export function getSummary(data) {
    const row = data.rows[0];
    return Object.values(FIELDS)
      .map((f) => ({ label: f.label, value: row[f.key] }))
      .filter((item) => item.value);
  }

  export function validate(data, _screenType) {
    const errors = {};
    const row = data.rows[0];
    Object.values(FIELDS).forEach((f) => {
      if (!row[f.key]) errors[f.key] = 'Required';
    });
    return errors;
  }

  export default {
    name: 'TestAgentStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() {
      return { F: FIELDS };
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
