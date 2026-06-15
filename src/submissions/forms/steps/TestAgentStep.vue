<template>
  <test-agent-table :fields="screenFields" :row="data.rows[0]" :errors="errors" />
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
    },
  };
</script>
