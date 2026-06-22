<template>
  <div>
    <test-agent-table
      :fields="screenFields"
      :rows="rows"
      :errors="rowErrors"
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
      data:       { type: Object, required: true },
      errors:     { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return buildScreenFields(this.screenType);
      },
      combinationFields() {
        return buildCombinationFields(this.screenType);
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
