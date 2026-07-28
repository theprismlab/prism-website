<template>
  <div class="mt-4">
    <v-alert
      v-if="submitted > 0 && generalErrors.length"
      type="error"
      variant="tonal"
      density="compact"
      class="mb-4"
    >
      <div v-for="(msg, i) in generalErrors" :key="i">{{ msg }}</div>
    </v-alert>
    <test-agent-table
      :fields="screenFields"
      :rows="rows"
      :errors="rowErrors"
      :submitted="submitted"
      multi-row
      add-label="Add test agent"
      @add-row="addCompoundRow"
      @remove-row="removeCompoundRow"
    />
    <test-agent-table
      v-if="combinationFields.length"
      :fields="combinationFields"
      :rows="combinations"
      :errors="combinationErrors"
      :submitted="submitted"
      multi-row
      add-label="Add combination"
      class="mt-4"
      @add-row="addCombinationRow"
      @remove-row="removeCombinationRow"
    />
  </div>
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';
  import {
    buildCombinationFields,
    buildScreenFields,
    getInitialCombinationRow,
    getInitialRow,
  } from './testAgentSchema.js';

  export default {
    name: 'TestAgentStep',
    components: { TestAgentTable },
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
      submitted: { type: Number, default: 0 },
    },
    computed: {
      screenFields() {
        return buildScreenFields(this.screenType);
      },
      combinationFields() {
        const compoundNames = this.rows.map((r) => r.compound_name).filter(Boolean);
        return buildCombinationFields(this.screenType, compoundNames);
      },
      rows() {
        return this.data.rows ?? [];
      },
      combinations() {
        return this.data.combinations ?? [];
      },
      rowErrors() {
        return this.errors.rows ?? [];
      },
      combinationErrors() {
        return this.errors.combinations ?? [];
      },
      generalErrors() {
        return this.errors.general ?? [];
      },
    },
    watch: {
      combinations: {
        deep: true,
        handler(rows) {
          rows.forEach((row) => {
            this.combinationFields.forEach((f) => {
              if (typeof f.disabled === 'function' && f.disabled(row) && row[f.key]) {
                row[f.key] = '';
              }
            });
          });
        },
      },
    },
    methods: {
      addCompoundRow() {
        this.data.rows.push(getInitialRow());
      },
      removeCompoundRow(index) {
        this.data.rows.splice(index, 1);
      },
      addCombinationRow() {
        this.data.combinations.push(getInitialCombinationRow(this.screenType));
      },
      removeCombinationRow(index) {
        this.data.combinations.splice(index, 1);
      },
    },
  };
</script>
