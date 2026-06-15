<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourName"
        label="Your Name"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourEmail"
        label="Your Email"
        variant="outlined"
        density="compact"
        type="email"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.investigatorName"
        label="Investigator Name"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.investigatorEmail"
        label="Investigator Email"
        variant="outlined"
        density="compact"
        type="email"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.dataAccessManagerNames"
        label="Data Access Manager Name(s)"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.dataAccessManagerEmails"
        label="Data Access Manager Email(s)"
        variant="outlined"
        density="compact"
        type="email"
      />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'CollaboratorStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
