<template>
  <div>
    <v-table density="compact" class="perturbation-table">
      <thead>
        <tr>
          <th v-for="f in fields" :key="f.key">{{ f.label }}</th>
          <th v-if="multiRow" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="f in fields" :key="f.key">
            <v-select
              v-if="f.options"
              v-model="row[f.key]"
              :items="f.options"
              variant="plain"
              density="compact"
              single-line
              :error-messages="errors[i]?.[f.key]"
            />
            <v-text-field
              v-else
              v-model="row[f.key]"
              type="text"
              :inputmode="f.type === 'number' ? 'decimal' : 'text'"
              variant="plain"
              density="compact"
              single-line
              :error-messages="errors[i]?.[f.key]"
            />
          </td>
          <td v-if="multiRow">
            <v-btn
              icon="mdi-delete-outline"
              size="small"
              variant="text"
              :disabled="rows.length === 1"
              @click="$emit('remove-row', i)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-btn
      v-if="multiRow"
      prepend-icon="mdi-plus"
      size="small"
      variant="text"
      class="mt-1"
      @click="$emit('add-row')"
    >
      {{ addLabel }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'TestAgentTable',
    props: {
      fields:   { type: Array,   required: true },
      rows:     { type: Array,   required: true },
      errors:   { type: Array,   default: () => [] },
      multiRow: { type: Boolean, default: false },
      addLabel: { type: String,  default: 'Add row' },
    },
    emits: ['add-row', 'remove-row'],
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
