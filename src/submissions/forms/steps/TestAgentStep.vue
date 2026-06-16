<template>
  <div>
    <test-agent-table
      :fields="screenFields"
      :rows="[row]"
      :errors="[fieldErrors]"
    />
    <test-agent-table
      v-if="combinationFields.length"
      :fields="combinationFields"
      :rows="combinations"
      :errors="combinationErrors"
      multi-row
      add-label="Add combination"
      class="mt-4"
      @add-row="addRow"
      @remove-row="removeRow"
    />
  </div>
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';
  import { buildCombinationFields, buildScreenFields, getInitialCombinationRow } from './testAgentSchema.js';

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
      row() {
        return this.data.row;
      },
      combinations() {
        return this.data.combinations ?? [];
      },
      fieldErrors() {
        const { combinations: _, ...rest } = this.errors;
        return rest;
      },
      combinationErrors() {
        return this.errors.combinations ?? [];
      },
    },
    methods: {
      addRow() {
        this.data.combinations.push(getInitialCombinationRow(this.screenType));
      },
      removeRow(index) {
        this.data.combinations.splice(index, 1);
      },
    },
  };
</script>
