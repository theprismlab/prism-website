<template>
  <div>
    <div class="my-4">
      <h3 class="prism-text-form-group-label mb-4">Test Agent Details:</h3>
      <test-agent-table
        :fields="compoundFields"
        :rows="compoundRows"
        :errors="compoundRowErrors"
        :submitted="submitted"
        multi-row
        add-label="Add test agent"
        @add-row="addCompoundRow"
        @remove-row="removeCompoundRow"
      />
    </div>

    <div v-if="combinationFields.length" class="my-4">
      <h3 class="prism-text-form-group-label mb-4">Combination Details:</h3>
      <test-agent-table
        :fields="combinationFields"
        :rows="combinations"
        :errors="combinationErrors"
        :submitted="submitted"
        multi-row
        add-label="Add combination"
        @add-row="addCombinationRow"
        @remove-row="removeCombinationRow"
      />
    </div>
    <v-alert
      v-if="submitted > 0 && generalErrors.length"
      type="error"
      variant="tonal"
      density="compact"
      class="my-4"
    >
      <div v-for="(msg, i) in generalErrors" :key="i" class="text-body-2">
        {{ msg }}
      </div>
    </v-alert>
  </div>
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';
  import {
    buildCombinationFields,
    buildCompoundFields,
    getInitialCombinationRow,
    getInitialCompoundRow,
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
      compoundFields() {
        return buildCompoundFields(this.screenType);
      },
      combinationFields() {
        const compoundNames = this.compoundRows.map((r) => r.compound_name).filter(Boolean);
        return buildCombinationFields(this.screenType, compoundNames);
      },
      compoundRows() {
        return this.data.rows ?? [];
      },
      combinations() {
        return this.data.combinations ?? [];
      },
      compoundRowErrors() {
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
        this.data.rows.push(getInitialCompoundRow());
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
