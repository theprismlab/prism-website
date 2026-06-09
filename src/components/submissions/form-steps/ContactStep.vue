<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field v-model="data.firstName" label="First Name" variant="outlined" density="compact" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="data.lastName" label="Last Name" variant="outlined" density="compact" />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="data.email"
        label="Email"
        variant="outlined"
        density="compact"
        type="email"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field v-model="data.company" label="Company" variant="outlined" density="compact" />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ContactStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
