<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.YOUR_NAME.key]"
        :label="F.YOUR_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.YOUR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.YOUR_EMAIL.key]"
        :label="F.YOUR_EMAIL.label"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.YOUR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.INVESTIGATOR_NAME.key]"
        :label="F.INVESTIGATOR_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INVESTIGATOR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.INVESTIGATOR_EMAIL.key]"
        :label="F.INVESTIGATOR_EMAIL.label"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.INVESTIGATOR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.DATA_ACCESS_MANAGER_NAMES.key]"
        :label="F.DATA_ACCESS_MANAGER_NAMES.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.DATA_ACCESS_MANAGER_NAMES.key]"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data[F.DATA_ACCESS_MANAGER_EMAILS.key]"
        :label="F.DATA_ACCESS_MANAGER_EMAILS.label"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.DATA_ACCESS_MANAGER_EMAILS.key]"
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
    if (!data[FIELDS.YOUR_NAME.key]) errors[FIELDS.YOUR_NAME.key] = 'Required';
    if (!data[FIELDS.YOUR_EMAIL.key]) errors[FIELDS.YOUR_EMAIL.key] = 'Required';
    if (!data[FIELDS.INVESTIGATOR_NAME.key]) errors[FIELDS.INVESTIGATOR_NAME.key] = 'Required';
    if (!data[FIELDS.INVESTIGATOR_EMAIL.key]) errors[FIELDS.INVESTIGATOR_EMAIL.key] = 'Required';
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
