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
            hide-details
            single-line
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0].pert_dose"
            variant="plain"
            density="compact"
            hide-details
            single-line
          />
        </td>
        <td>
          <v-text-field
            v-model="data.rows[0].pert_id"
            variant="plain"
            density="compact"
            hide-details
            single-line
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    name: 'TestAgentStep',
    props: {
      data: { type: Object, required: true },
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
