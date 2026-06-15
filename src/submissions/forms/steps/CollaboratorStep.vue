<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourName"
        :label="F.YOUR_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors.yourName"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.yourEmail"
        :label="F.YOUR_EMAIL.label"
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
        :label="F.INVESTIGATOR_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors.investigatorName"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.investigatorEmail"
        :label="F.INVESTIGATOR_EMAIL.label"
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
        :label="F.DATA_ACCESS_MANAGER_NAMES.label"
        variant="outlined"
        density="compact"
        :error-messages="errors.dataAccessManagerNames"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.dataAccessManagerEmails"
        :label="F.DATA_ACCESS_MANAGER_EMAILS.label"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors.dataAccessManagerEmails"
      />
    </v-col>
  </v-row>
</template>

<script>
  const FIELDS = {
    YOUR_NAME: { key: 'yourName', label: 'Your Name' },
    YOUR_EMAIL: { key: 'yourEmail', label: 'Your Email' },
    INVESTIGATOR_NAME: { key: 'investigatorName', label: 'Investigator Name' },
    INVESTIGATOR_EMAIL: { key: 'investigatorEmail', label: 'Investigator Email' },
    DATA_ACCESS_MANAGER_NAMES: { key: 'dataAccessManagerNames', label: 'Data Access Manager Name(s)' },
    DATA_ACCESS_MANAGER_EMAILS: { key: 'dataAccessManagerEmails', label: 'Data Access Manager Email(s)' },
  };

  export function getInitialData() {
    return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']));
  }

  export function getSummary(data) {
    return Object.values(FIELDS)
      .map((f) => ({ label: f.label, value: data[f.key] }))
      .filter((item) => item.value);
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
    data() {
      return { F: FIELDS };
    },
  };
</script>
