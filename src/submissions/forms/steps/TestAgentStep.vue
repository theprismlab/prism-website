<template>
  <test-agent-table :fields="screenFields" :row="row" :errors="errors" />
</template>

<script>
  import TestAgentTable from './TestAgentTable.vue';
  import { buildScreenFields } from './testAgentSchema.js';

  export default {
    name: 'TestAgentStep',
    components: { TestAgentTable },
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
      screenType: { type: String, default: null },
    },
    computed: {
      screenFields() {
        return buildScreenFields(this.screenType);
      },
      row() {
        return this.data.row;
      },
    },
  };
</script>
