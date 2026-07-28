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
                  <v-icon
                    v-bind="props"
                    size="x-small"
                    icon="mdi-information-outline"
                    class="th-info-icon"
                  />
                </template>
              </v-tooltip>
            </span>
          </th>
          <th v-if="multiRow" />
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, i) in rows" :key="i">
          <tr>
            <td v-for="f in fields" :key="f.key">
              <v-select
                v-if="f.options"
                v-model="row[f.key]"
                :items="f.options"
                :placeholder="f.placeholder"
                density="compact"
                single-line
                hide-details
                :disabled="isDisabled(row, f)"
                :error="hasError(row, i, f.key)"
                class="perturbation-table-field"
              />
              <v-text-field
                v-else
                v-model="row[f.key]"
                :inputmode="f.inputmode ?? 'text'"
                :placeholder="f.placeholder"
                density="compact"
                single-line
                hide-details
                :disabled="isDisabled(row, f)"
                :error="hasError(row, i, f.key)"
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
          <tr v-if="fields.some(f => hasError(row, i, f.key))" class="error-row">
            <td v-for="f in fields" :key="f.key" class="error-cell">
              <span v-if="hasError(row, i, f.key)" class="field-error">{{ errors[i][f.key] }}</span>
            </td>
            <td v-if="multiRow" class="error-cell" />
          </tr>
        </template>
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
      submitted: { type: Number, default: 0 },
    },
    emits: ['add-row', 'remove-row'],
    data() {
      return { submittedRows: [] };
    },
    watch: {
      submitted(val) {
        if (val > 0) this.rows.forEach(r => {
          if (!this.submittedRows.includes(r)) this.submittedRows.push(r);
        });
      },
    },
    methods: {
      hasError(row, i, fieldKey) {
        if (!this.submittedRows.includes(row)) return false;
        return !!this.errors[i]?.[fieldKey];
      },
      isDisabled(row, f) {
        return typeof f.disabled === 'function' ? f.disabled(row) : false;
      },
    },
  };
</script>

<style scoped>
  .perturbation-table th {
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    padding: 0 4px !important;
    white-space: normal;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .th-info-icon {
    opacity: 0.5;
    flex-shrink: 0;
  }
  .th-info-icon:hover {
    opacity: 1;
  }
  .perturbation-table :deep(td) {
    padding: 0 !important;
    border-radius: 0 !important;
    min-width: 80px !important;
    vertical-align: middle;
  }
  .perturbation-table :deep(th) {
    vertical-align: middle;
  }
  .error-row td {
    min-width: 80px !important;
    padding: 2px 6px 4px !important;
    border-radius: 0 !important;
    vertical-align: top !important;
    height: 18px;
  }
  .field-error {
    font-size: 0.65rem;
    color: rgb(var(--v-theme-error));
    white-space: normal;
    display: block;
    max-width: 140px;
  }
  .perturbation-table {
    border-radius: 0;
  }
  .perturbation-table :deep(.v-field) {
    border-radius: 0;
    font-size: 0.75rem;
    --v-field-input-min-height: 32px;
  }
  .perturbation-table :deep(.v-field__input) {
    font-size: 0.75rem;
    padding-inline: 8px;
    min-height: 32px;
    align-items: center;
  }
  .perturbation-table :deep(input) {
    font-size: 0.75rem;
  }
</style>
