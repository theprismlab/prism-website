<template>
  <div>
    <p class="prism-text-body-2 text-medium-emphasis mb-4">
      Review your submission details before sending.
    </p>
    <v-list lines="one" density="compact" class="mb-4">
      <v-list-subheader>Summary</v-list-subheader>
      <v-list-item
        title="Contact Info"
        subtitle="Completed"
        prepend-icon="mdi-check-circle-outline"
      />
      <v-list-item
        title="Screen Details"
        subtitle="Completed"
        prepend-icon="mdi-check-circle-outline"
      />
      <v-list-item
        title="Application"
        subtitle="Completed"
        prepend-icon="mdi-check-circle-outline"
      />
      <v-list-item
        title="Supporting Documents"
        subtitle="Completed"
        prepend-icon="mdi-check-circle-outline"
      />
    </v-list>
    <v-checkbox
      v-model="data.confirmed"
      label="I confirm all information is accurate and complete."
      hide-details
      class="mb-2"
    />
  </div>
</template>

<script>
  export default {
    name: 'ReviewStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
