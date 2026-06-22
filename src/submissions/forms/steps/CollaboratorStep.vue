<template>
  <v-row dense>
    <v-col cols="12">
      <h3 class="prism-text-form-group-label">Your information</h3>
    </v-col>
    <v-col cols="12" sm="5">
      <h4 class="prism-text-form-label">{{ F.YOUR_NAME.label }}</h4>
      <v-text-field
        v-model="data[F.YOUR_NAME.key]"
        variant="outlined"
        hide-details="auto"
        :error-messages="errors[F.YOUR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="7">
      <h4 class="prism-text-form-label">{{ F.YOUR_EMAIL.label }}</h4>
      <v-text-field
        v-model="data[F.YOUR_EMAIL.key]"
        variant="outlined"
        type="email"
        :hint="F.YOUR_EMAIL.hint"
        persistent-hint
        :error-messages="errors[F.YOUR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12">
      <h3 class="prism-text-form-group-label">Investigator information</h3>
    </v-col>
    <v-col cols="12" sm="5">
      <h4 class="prism-text-form-label">{{ F.INVESTIGATOR_NAME.label }}</h4>
      <v-text-field
        v-model="data[F.INVESTIGATOR_NAME.key]"
        variant="outlined"
        hide-details="auto"
        :error-messages="errors[F.INVESTIGATOR_NAME.key]"
      />
    </v-col>
    <v-col cols="12" sm="7">
      <h4 class="prism-text-form-label">{{ F.INVESTIGATOR_EMAIL.label }}</h4>

      <v-text-field
        v-model="data[F.INVESTIGATOR_EMAIL.key]"
        variant="outlined"
        type="email"
        :hint="F.INVESTIGATOR_EMAIL.hint"
        persistent-hint
        :error-messages="errors[F.INVESTIGATOR_EMAIL.key]"
      />
    </v-col>
  </v-row>
  <v-row dense>
    <v-col cols="12">
      <h3 class="prism-text-form-group-label">Data Access Managers</h3>
    </v-col>
    <v-col cols="12">
      <v-row dense class="mb-1">
        <v-col cols="12" sm="5">
          <h4 class="prism-text-form-label">{{
            F.DATA_ACCESS_MANAGERS.nameLabel
          }}</h4>
        </v-col>
        <v-col cols="12" sm="6">
          <h4 class="prism-text-form-label">{{
            F.DATA_ACCESS_MANAGERS.emailLabel
          }}</h4>
        </v-col>
      </v-row>
      <v-row v-for="(manager, i) in data[F.DATA_ACCESS_MANAGERS.key]" :key="i" dense align="start">
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="manager.name"
            variant="outlined"
            hide-details="auto"
            :error-messages="errors[`dataAccessManagers_${i}_name`]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="manager.email"
            variant="outlined"
            type="email"
            :hint="F.DATA_ACCESS_MANAGERS.hint"
            persistent-hint
            :error-messages="errors[`dataAccessManagers_${i}_email`]"
          />
        </v-col>
        <v-col cols="auto" class="d-flex align-start pt-1">
          <v-btn
            icon="mdi-delete-outline"
            variant="text"
            color="medium-emphasis"
            :aria-label="`Remove manager ${i + 1}`"
            @click="removeManager(i)"
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
      removeManager(i) {
        this.data[FIELDS.DATA_ACCESS_MANAGERS.key].splice(i, 1);
      },
    },
  };
</script>
