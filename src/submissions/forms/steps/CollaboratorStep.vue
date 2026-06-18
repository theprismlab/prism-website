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
  <v-row v-for="(manager, i) in data[F.DATA_ACCESS_MANAGERS.key]" :key="i" dense>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="manager.name"
        :label="i === 0 ? F.DATA_ACCESS_MANAGERS.nameLabel : ''"
        :placeholder="i > 0 ? 'Data Access Manager Name' : ''"
        variant="outlined"
        density="compact"
        :error-messages="errors[`dataAccessManagers_${i}_name`]"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="manager.email"
        :label="i === 0 ? F.DATA_ACCESS_MANAGERS.emailLabel : ''"
        :placeholder="i > 0 ? 'Data Access Manager Email' : ''"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[`dataAccessManagers_${i}_email`]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col>
      <v-btn variant="text" size="small" @click="addManager">+ Add</v-btn>
    </v-col>
  </v-row>
</template>

<script>
  const FIELDS = {
    YOUR_NAME: { key: 'yourName', label: 'Your Name' },
    YOUR_EMAIL: { key: 'yourEmail', label: 'Your Email' },
    INVESTIGATOR_NAME: { key: 'investigatorName', label: 'Investigator Name' },
    INVESTIGATOR_EMAIL: { key: 'investigatorEmail', label: 'Investigator Email' },
    DATA_ACCESS_MANAGERS: {
      key: 'dataAccessManagers',
      nameLabel: 'Data Access Manager Name',
      emailLabel: 'Data Access Manager Email',
    },
  };

  export function getInitialData() {
    return {
      [FIELDS.YOUR_NAME.key]: '',
      [FIELDS.YOUR_EMAIL.key]: '',
      [FIELDS.INVESTIGATOR_NAME.key]: '',
      [FIELDS.INVESTIGATOR_EMAIL.key]: '',
      [FIELDS.DATA_ACCESS_MANAGERS.key]: [{ name: '', email: '' }],
    };
  }

  export function getSummary(data) {
    const simple = [FIELDS.YOUR_NAME, FIELDS.YOUR_EMAIL, FIELDS.INVESTIGATOR_NAME, FIELDS.INVESTIGATOR_EMAIL]
      .map((f) => ({ label: f.label, value: data[f.key] }))
      .filter((item) => item.value);
    const managers = (data[FIELDS.DATA_ACCESS_MANAGERS.key] || [])
      .filter((m) => m.name || m.email)
      .map((m, i) => ({ label: `Data Access Manager ${i + 1}`, value: [m.name, m.email].filter(Boolean).join(', ') }));
    return [...simple, ...managers];
  }

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  export function validate(data, _screenType) {
    const errors = {};
    if (!data[FIELDS.YOUR_NAME.key]) errors[FIELDS.YOUR_NAME.key] = 'Required';
    if (!data[FIELDS.YOUR_EMAIL.key]) errors[FIELDS.YOUR_EMAIL.key] = 'Required';
    else if (!isValidEmail(data[FIELDS.YOUR_EMAIL.key])) errors[FIELDS.YOUR_EMAIL.key] = 'Invalid email address';
    if (!data[FIELDS.INVESTIGATOR_NAME.key]) errors[FIELDS.INVESTIGATOR_NAME.key] = 'Required';
    if (!data[FIELDS.INVESTIGATOR_EMAIL.key]) errors[FIELDS.INVESTIGATOR_EMAIL.key] = 'Required';
    else if (!isValidEmail(data[FIELDS.INVESTIGATOR_EMAIL.key])) errors[FIELDS.INVESTIGATOR_EMAIL.key] = 'Invalid email address';
    data[FIELDS.DATA_ACCESS_MANAGERS.key].forEach((m, i) => {
      if (m.email && !isValidEmail(m.email)) errors[`dataAccessManagers_${i}_email`] = 'Invalid email address';
    });
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
    methods: {
      addManager() {
        this.data[FIELDS.DATA_ACCESS_MANAGERS.key].push({ name: '', email: '' });
      },
    },
  };
</script>
