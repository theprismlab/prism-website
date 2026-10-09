<template>
  <!--
    Card layout alternative to NominationTable. Same props, emits and error contract:
    one card per row, one labelled input or select per field. Swap the tag in
    nominations.vue to compare the two designs.
  -->
  <div>
    <v-card
      v-for="(row, i) in rows"
      :key="i"
      variant="outlined"
      class="nomination-agent-card"
      :class="{ 'nomination-agent-card--error': rowHasError(i) }"
    >
      <div class="nomination-agent-card__header">
        <span class="nomination-agent-card__title">
          {{ cardTitle }} {{ multiRow ? i + 1 : '' }}
        </span>
        <v-btn
          v-if="multiRow"
          icon="mdi-delete-outline"
          size="small"
          variant="text"
          :disabled="rows.length === 1"
          aria-label="Remove"
          @click="$emit('remove-row', i)"
        />
      </div>

      <v-row dense class="nomination-agent-card__body">
        <v-col v-for="f in fields" :key="f.key" :cols="mobileSpan(f)" :md="span(f)">
          <!-- Label sits above the field so long labels and tooltips never truncate. -->
          <div class="field-label" :title="f.label">
            <span class="field-label__text">{{ f.label }}</span>
            <v-tooltip v-if="f.tooltip" :text="f.tooltip" location="top" max-width="260">
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  size="small"
                  icon="mdi-information-outline"
                  class="field-info-icon"
                />
              </template>
            </v-tooltip>
          </div>
          <!-- Radio group: one radio per option. The value is the option string
               ('Yes' / 'No') so validation and the payload match the select version. -->
          <v-radio-group
            v-if="f.type === 'radio'"
            v-model="row[f.key]"
            inline
            density="compact"
            hide-details="auto"
            :aria-label="f.label"
            :disabled="isDisabled(row, f)"
            :error="hasError(i, f.key)"
            :error-messages="errorMessages(i, f.key)"
            class="nomination-card-field nomination-radio-group"
          >
            <v-radio v-for="opt in f.options" :key="opt" :label="opt" :value="opt" />
          </v-radio-group>
          <v-select
            v-else-if="f.options"
            v-model="row[f.key]"
            :items="f.options"
            :placeholder="f.placeholder"
            variant="outlined"
            density="compact"
            single-line
            hide-details="auto"
            :disabled="isDisabled(row, f)"
            :error="hasError(i, f.key)"
            :error-messages="errorMessages(i, f.key)"
            class="nomination-card-field"
          />
          <v-text-field
            v-else
            v-model="row[f.key]"
            :inputmode="f.inputmode ?? 'text'"
            :placeholder="f.placeholder"
            variant="outlined"
            density="compact"
            single-line
            hide-details="auto"
            :disabled="isDisabled(row, f)"
            :error="hasError(i, f.key)"
            :error-messages="errorMessages(i, f.key)"
            class="nomination-card-field"
          />
        </v-col>
      </v-row>
    </v-card>

    <v-btn
      v-if="multiRow"
      prepend-icon="mdi-plus"
      size="small"
      variant="text"
      class="mt-1"
      color="var(--prism-color-primary)"
      @click="$emit('add-row')"
    >
      {{ addLabel }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'NominationCards',
    props: {
      fields: { type: Array, required: true },
      rows: { type: Array, required: true },
      errors: { type: Array, default: () => [] },
      multiRow: { type: Boolean, default: false },
      addLabel: { type: String, default: 'Add row' },
      // Additions over NominationTable: the heading on each card, and the column
      // widths (of 12) a field gets when its definition sets no `span` / `mobileSpan`.
      // `span` applies from the md breakpoint (960px) up, `mobileSpan` below it.
      cardTitle: { type: String, default: 'Test agent' },
      defaultSpan: { type: Number, default: 4 },
      defaultMobileSpan: { type: Number, default: 12 },
    },
    emits: ['add-row', 'remove-row'],
    methods: {
      // The parent decides when errors apply (it passes [] until the step is touched).
      hasError(i, fieldKey) {
        return !!this.errors[i]?.[fieldKey];
      },
      // Vuetify renders the message under the field; same string the table shows.
      errorMessages(i, fieldKey) {
        return this.hasError(i, fieldKey) ? [this.errors[i][fieldKey]] : [];
      },
      rowHasError(i) {
        return this.fields.some((f) => this.hasError(i, f.key));
      },
      isDisabled(row, f) {
        return typeof f.disabled === 'function' ? f.disabled(row) : false;
      },
      // Column widths on a 12-column grid: the field's own value, else the component default.
      span(f) {
        return f.span ?? this.defaultSpan;
      },
      mobileSpan(f) {
        return f.mobileSpan ?? this.defaultMobileSpan;
      },
    },
  };
</script>

<style scoped>
  .nomination-agent-card {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg, 8px);
    margin-bottom: 10px;
  }
  .nomination-agent-card--error {
    border-color: rgb(var(--v-theme-error));
  }
  .nomination-agent-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 4px 2px 12px;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    background: rgba(var(--v-theme-on-surface), 0.025);
  }
  .nomination-agent-card__title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
  .nomination-agent-card__body {
    padding: 8px 12px 10px;
  }
  /* dense rows already use 4px gutters; the column padding sets the row-to-row gap */
  .nomination-agent-card__body :deep(.v-col) {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .field-label {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 2px;
    font-size: 0.75rem;
    line-height: 1.2;
    letter-spacing: 0.04em;
    max-width: 100%;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }
  /* Long labels in narrow columns truncate; the title attribute and tooltip carry the full text. */
  .field-label__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .field-info-icon {
    opacity: 0.5;
    flex-shrink: 0;
  }
  .field-info-icon:hover {
    opacity: 1;
  }
  /* Same 34px control height as the table so the two designs compare like for like. */
  .nomination-card-field :deep(.v-field) {
    font-size: 0.75rem;
    --v-field-input-min-height: 34px;
    --v-input-control-height: 34px;
  }
  .nomination-card-field :deep(.v-field__input) {
    font-size: 0.75rem;
    padding-inline: 8px;
    min-height: 34px;
    align-items: center;
  }
  .nomination-card-field :deep(input) {
    font-size: 0.75rem;
  }
  .nomination-card-field :deep(.v-input__details) {
    padding-top: 2px;
    min-height: 0;
  }
  .nomination-card-field :deep(.v-messages__message) {
    font-size: 0.65rem;
    line-height: 1.2;
  }

  /* Yes / No radios sit inline, matching the 34px control height of the other fields. */
  .nomination-radio-group :deep(.v-selection-control-group) {
    gap: 0 20px;
    min-height: 34px;
  }
  .nomination-radio-group :deep(.v-selection-control) {
    min-height: 34px;
  }
  .nomination-radio-group :deep(.v-label) {
    font-size: 0.8rem;
    opacity: 1;
  }

  /* xs */
  @media (max-width: 600px) {
    .nomination-agent-card__body {
      padding: 8px 8px 0;
    }
  }
</style>
