<template>
  <div>
    <v-checkbox
      v-for="f in screenFields"
      :key="f.key"
      v-model="data[f.key]"
      :label="f.label"
      hide-details="auto"
      class="mb-2"
      :error-messages="errors[f.key]"
    />
  </div>
</template>

<script>
  import { buildScreenFields } from './acknowledgementsSchema.js';

  export default {
    name: 'AcknowledgmentsStep',
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
