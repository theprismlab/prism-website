<template>
  <v-table density="compact" class="perturbation-table">
    <thead>
      <tr>
        <th v-for="f in fields" :key="f.key">{{ f.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="f in fields" :key="f.key">
          <v-select
            v-if="f.options"
            v-model="row[f.key]"
            :items="f.options"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[f.key]"
          />
          <v-text-field
            v-else
            v-model="row[f.key]"
            :type="f.type || 'text'"
            variant="plain"
            density="compact"
            single-line
            :error-messages="errors[f.key]"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    name: 'TestAgentTable',
    props: {
      fields: { type: Array,  required: true },
      row:    { type: Object, required: true },
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
