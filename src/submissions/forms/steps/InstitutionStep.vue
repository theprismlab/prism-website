<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data[F.INSTITUTION_TYPE.key]"
        :label="F.INSTITUTION_TYPE.label"
        :items="institutionTypeOptions"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INSTITUTION_TYPE.key]"
      />
    </v-col>

    <v-col v-if="show(F.INSTITUTION_NAME)" cols="12" sm="6">
      <v-select
        v-if="hasDropdownNames"
        v-model="data[F.INSTITUTION_NAME.key]"
        :label="F.INSTITUTION_NAME.label"
        :items="institutionNames"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INSTITUTION_NAME.key]"
      />
      <v-text-field
        v-else
        v-model="data[F.INSTITUTION_NAME.key]"
        :label="F.INSTITUTION_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INSTITUTION_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.QUOTE_ACKNOWLEDGEMENT)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.QUOTE_ACKNOWLEDGEMENT.key]"
        :label="F.QUOTE_ACKNOWLEDGEMENT.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.QUOTE_ACKNOWLEDGEMENT.key]"
      />
    </v-col>

    <v-col v-if="show(F.COMMERCIAL_USE)" cols="12" sm="6">
      <v-select
        v-model="data[F.COMMERCIAL_USE.key]"
        :label="F.COMMERCIAL_USE.label"
        :items="['Yes', 'No']"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.COMMERCIAL_USE.key]"
      />
    </v-col>

    <v-col v-if="show(F.COMMERCIAL_USE_ACKNOWLEDGEMENT)" cols="12">
      <v-text-field
        v-model="data[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
        :label="F.COMMERCIAL_USE_ACKNOWLEDGEMENT.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
      />
    </v-col>

    <v-col v-if="show(F.FUNDING_INSTITUTION_NAME)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.FUNDING_INSTITUTION_NAME.key]"
        :label="F.FUNDING_INSTITUTION_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.FUNDING_INSTITUTION_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.FUNDING_INSTITUTION_ADDRESS)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.FUNDING_INSTITUTION_ADDRESS.key]"
        :label="F.FUNDING_INSTITUTION_ADDRESS.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.FUNDING_INSTITUTION_ADDRESS.key]"
      />
    </v-col>

    <v-col v-if="show(F.BILLING_CONTACT_NAME)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.BILLING_CONTACT_NAME.key]"
        :label="F.BILLING_CONTACT_NAME.label"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.BILLING_CONTACT_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.BILLING_CONTACT_EMAIL)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.BILLING_CONTACT_EMAIL.key]"
        :label="F.BILLING_CONTACT_EMAIL.label"
        variant="outlined"
        density="compact"
        type="email"
        :error-messages="errors[F.BILLING_CONTACT_EMAIL.key]"
      />
    </v-col>

    <v-col v-if="show(F.COMMENTS)" cols="12">
      <v-textarea
        v-model="data[F.COMMENTS.key]"
        :label="F.COMMENTS.label"
        variant="outlined"
        density="compact"
        rows="3"
        auto-grow
      />
    </v-col>
  </v-row>
</template>

<script>
  import api from '@/submissions/api.js';
  import {
    FIELDS,
    COLLABORATOR_TYPE_OPTIONS,
    INSTITUTION_TYPE_OPTIONS,
  } from './institutionSchema.js';

  export default {
    name: 'InstitutionStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() {
      return {
        F: FIELDS,
        institutionTypeOptions: INSTITUTION_TYPE_OPTIONS,
        allInstitutions: [],
      };
    },
    computed: {
      hasDropdownNames() {
        return (
          this.data[F.INSTITUTION_TYPE.key] === COLLABORATOR_TYPE_OPTIONS.DMC.key ||
          this.data[F.INSTITUTION_TYPE.key] === COLLABORATOR_TYPE_OPTIONS.BROAD.key
        );
      },
      institutionNames() {
        return this.allInstitutions
          .filter((i) => i.collaboration_type === this.data[F.INSTITUTION_TYPE.key])
          .map((i) => i.name);
      },
    },
    created() {
      this.loadInstitutionNames();
    },
    methods: {
      async loadInstitutionNames() {
        try {
          const institutions = await api.getCollaboratorList(import.meta.env.VITE_API_URL);
          this.allInstitutions = institutions;
        } catch (error) {
          console.error('Failed to load institution names', error);
        }
      },
      show(field) {
        return !field.showIf || field.showIf(this.data);
      },
    },
  };
</script>
