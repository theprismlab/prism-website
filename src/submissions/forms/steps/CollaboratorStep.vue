<template>
  <v-row dense>
    <v-col cols="12">
      <h3 class="prism-text-h4">Your information</h3>
    </v-col>
    <v-col cols="12" sm="5">
      <v-text-field
        v-model="data[F.YOUR_NAME.key]"
        :label="F.YOUR_NAME.label"
        :placeholder="F.YOUR_NAME.placeholder"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.YOUR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="7">
      <v-text-field
        v-model="data[F.YOUR_EMAIL.key]"
        :label="F.YOUR_EMAIL.label"
        :placeholder="F.YOUR_EMAIL.placeholder"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.YOUR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12">
      <h3 class="prism-text-h4">Investigator information</h3>
    </v-col>
    <v-col cols="12" sm="5">
      <v-text-field
        v-model="data[F.INVESTIGATOR_NAME.key]"
        :label="F.INVESTIGATOR_NAME.label"
        :placeholder="F.INVESTIGATOR_NAME.placeholder"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INVESTIGATOR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="7">
      <v-text-field
        v-model="data[F.INVESTIGATOR_EMAIL.key]"
        :label="F.INVESTIGATOR_EMAIL.label"
        :placeholder="F.INVESTIGATOR_EMAIL.placeholder"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.INVESTIGATOR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <h3>Data Access Managers</h3>
    </v-col>
    <v-col cols="12">
      <v-row v-for="(manager, i) in data[F.DATA_ACCESS_MANAGERS.key]" :key="i" dense>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="manager.name"
            :label="i === 0 ? F.DATA_ACCESS_MANAGERS.nameLabel : ''"
            :placeholder="i > 0 ? 'Data Access Manager Name' : ''"
            variant="outlined"
            density="compact"
            :error-messages="errors[`dataAccessManagers_${i}_name`]"
          />
        </v-col>
        <v-col cols="12" sm="7">
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
    </v-col>
  </v-row>
</template>

<script>
  import { FIELDS } from './collaboratorSchema';

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
