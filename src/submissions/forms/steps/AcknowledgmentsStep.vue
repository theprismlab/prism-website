<template>
  <div>
    <v-checkbox
      v-model="data.acknowledgement1"
      label="Acknowledgement 1"
      hide-details="auto"
      class="mb-2"
      :error-messages="errors.acknowledgement1"
    />
    <v-checkbox
      v-model="data.acknowledgement2"
      label="Acknowledgement 2"
      hide-details="auto"
      :error-messages="errors.acknowledgement2"
    />
  </div>
</template>

<script>
  export function getInitialData() {
    return { acknowledgement1: false, acknowledgement2: false };
  }

  export function validate(data, _screenType) {
    const errors = {};
    if (!data.acknowledgement1) errors.acknowledgement1 = 'Required';
    if (!data.acknowledgement2) errors.acknowledgement2 = 'Required';
    return errors;
  }

  export default {
    name: 'AcknowledgmentsStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
  };
</script>
