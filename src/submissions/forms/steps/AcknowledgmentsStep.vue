<template>
  <div>
    <v-checkbox
      v-model="data.acknowledgement1"
      label="Acknowledgement 1"
      hide-details
      class="mb-2"
    />
    <v-checkbox
      v-model="data.acknowledgement2"
      label="Acknowledgement 2"
      hide-details
    />
  </div>
</template>

<script>
  export default {
    name: 'AcknowledgmentsStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
