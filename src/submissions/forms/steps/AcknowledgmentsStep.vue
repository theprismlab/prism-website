<template>
  <div>
    <v-checkbox
      v-model="data[F.ACKNOWLEDGEMENT_1.key]"
      :label="F.ACKNOWLEDGEMENT_1.label"
      hide-details="auto"
      class="mb-2"
      :error-messages="errors[F.ACKNOWLEDGEMENT_1.key]"
    />
    <v-checkbox
      v-model="data[F.ACKNOWLEDGEMENT_2.key]"
      :label="F.ACKNOWLEDGEMENT_2.label"
      hide-details="auto"
      :error-messages="errors[F.ACKNOWLEDGEMENT_2.key]"
    />
  </div>
</template>

<script>
  const FIELDS = {
    ACKNOWLEDGEMENT_1: { key: 'acknowledgement1', label: 'Acknowledgement 1', default: false },
    ACKNOWLEDGEMENT_2: { key: 'acknowledgement2', label: 'Acknowledgement 2', default: false },
  };

  export function getInitialData() {
    return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, f.default]));
  }

  export function getSummary(data) {
    return Object.values(FIELDS)
      .map((f) => ({ label: f.label, value: data[f.key] ? 'Confirmed' : null }))
      .filter((item) => item.value);
  }

  export function validate(data, _screenType) {
    const errors = {};
    Object.values(FIELDS).forEach((f) => {
      if (!data[f.key]) errors[f.key] = 'Required';
    });
    return errors;
  }

  export default {
    name: 'AcknowledgmentsStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() {
      return { F: FIELDS };
    },
  };
</script>
