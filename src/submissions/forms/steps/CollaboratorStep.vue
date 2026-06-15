<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourName"
        label="Your Name"
        variant="outlined"
        density="compact"
        :error-messages="errors.yourName"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourEmail"
        label="Your Email"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors.yourEmail"
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
        :error-messages="errors.investigatorName"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.investigatorEmail"
        label="Investigator Email"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors.investigatorEmail"
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
        :error-messages="errors.dataAccessManagerNames"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.dataAccessManagerEmails"
        label="Data Access Manager Email(s)"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors.dataAccessManagerEmails"
      />
    </v-col>
  </v-row>
</template>

<script>
  export function getInitialData() {
    return {
      yourName: '',
      yourEmail: '',
      investigatorName: '',
      investigatorEmail: '',
      dataAccessManagerNames: '',
      dataAccessManagerEmails: '',
    };
  }

  export function validate(data, _screenType) {
    const errors = {};
    if (!data.yourName) errors.yourName = 'Required';
    if (!data.yourEmail) errors.yourEmail = 'Required';
    if (!data.investigatorName) errors.investigatorName = 'Required';
    if (!data.investigatorEmail) errors.investigatorEmail = 'Required';
    return errors;
  }

  export default {
    name: 'CollaboratorStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
  };
</script>
