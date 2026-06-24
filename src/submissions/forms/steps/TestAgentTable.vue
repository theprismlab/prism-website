<template>
  <div>
    <v-table density="compact" class="perturbation-table">
      <thead>
        <tr>
          <th v-for="f in fields" :key="f.key">
            <span class="th-inner">
              {{ f.label }}
              <v-tooltip v-if="f.tooltip" :text="f.tooltip" location="top" max-width="260">
                <template #activator="{ props }">
                  <v-icon v-bind="props" size="x-small" icon="mdi-information-outline" class="th-info-icon" />
                </template>
              </v-tooltip>
            </span>
          </th>
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
              :placeholder="f.placeholder"
              density="compact"
              single-line
              :error-messages="errors[i]?.[f.key]"
              class="perturbation-table-field"
            />
            <v-text-field
              v-else
              v-model="row[f.key]"
              :inputmode="f.inputmode ?? 'text'"
              :placeholder="f.placeholder"
              density="compact"
              single-line
              :error-messages="errors[i]?.[f.key]"
              class="perturbation-table-field"
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
      fields: { type: Array, required: true },
      rows: { type: Array, required: true },
      errors: { type: Array, default: () => [] },
      multiRow: { type: Boolean, default: false },
      addLabel: { type: String, default: 'Add row' },
    },
    emits: ['add-row', 'remove-row'],
  };
</script>

<style scoped>
  .perturbation-table th {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .th-info-icon {
    opacity: 0.5;
  }
  .th-info-icon:hover {
    opacity: 1;
  }
  .perturbation-table :deep(td) {
    padding: 0rem 0rem !important;
    border-radius: 0 !important;
    min-width: 100px !important;
  }

  .perturbation-table {
    border-radius: 0;
  }
  .perturbation-table :deep(.v-field) {
    border-radius: 0;
  }
</style>
