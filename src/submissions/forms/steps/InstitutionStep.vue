<template>
  <v-row dense>
    <v-col cols="12" sm="12">
      <v-select
        v-model="data[F.INSTITUTION_TYPE.key]"
        :label="F.INSTITUTION_TYPE.label"
        :placeholder="F.INSTITUTION_TYPE.placeholder"
        :items="institutionTypeOptions"
        variant="outlined"
        :error-messages="errors[F.INSTITUTION_TYPE.key]"
        @update:model-value="onTypeChange"
      />
    </v-col>

    <v-col v-if="show(F.INSTITUTION_NAME)" cols="12" sm="6">
      <v-select
        v-if="hasDropdownNames"
        v-model="data[F.INSTITUTION_NAME.key]"
        :label="F.INSTITUTION_NAME.label"
        :placeholder="F.INSTITUTION_NAME.placeholder"
        :items="institutionNames"
        variant="outlined"
        :error-messages="errors[F.INSTITUTION_NAME.key]"
      />
      <v-text-field
        v-else
        v-model="data[F.INSTITUTION_NAME.key]"
        :label="F.INSTITUTION_NAME.label"
        :placeholder="F.INSTITUTION_NAME.placeholder"
        variant="outlined"
        :error-messages="errors[F.INSTITUTION_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.QUOTE_ACKNOWLEDGEMENT)" cols="12">
      <h3 class="text-subtitle-2 font-weight-bold mb-1">Quote acknowledgement</h3>
      <p class="text-body-2 mb-2">
        A quote based on the number of test agents being submitted for PRISM screen will be sent to
        you following submission of this form. The quote will need to be funded by a purchase order
        before accepting your test agents for PRISM screening and clearing your group for shipment
        to our lab.
      </p>
      <v-checkbox
        v-model="data[F.QUOTE_ACKNOWLEDGEMENT.key]"
        label="I acknowledge and agree."
        :error-messages="errors[F.QUOTE_ACKNOWLEDGEMENT.key]"
        hide-details="auto"
      />
    </v-col>

    <v-col v-if="show(F.COMMERCIAL_USE)" cols="12">
      <h3 class="text-subtitle-2 font-weight-bold mb-1">Commercial use</h3>
      <p class="text-body-2 mb-2">
        Are these submissions being submitted for commercial/industry use, on behalf of a
        commercial/industry partner, or in collaboration with a commercial/industry partner?
      </p>
      <v-radio-group
        v-model="data[F.COMMERCIAL_USE.key]"
        :error-messages="errors[F.COMMERCIAL_USE.key]"
        hide-details="auto"
        inline
      >
        <v-radio label="Yes" value="Yes" />
        <v-radio label="No" value="No" />
      </v-radio-group>
    </v-col>

    <v-col v-if="show(F.COMMERCIAL_USE_ACKNOWLEDGEMENT)" cols="12">
      <h3 class="text-subtitle-2 font-weight-bold mb-1">Commercial use acknowledgement</h3>
      <p class="text-body-2 mb-2">
        PRISM screen submissions submitted by academics/non-profits receive subsidized pricing and
        thus, results are for academic/research purposes only. Collaborators wanting to use the
        results from this screen submission for commercial/industry will either be charged the
        standard industry rate or will need to purchase a license from the Broad Institute.
      </p>
      <v-checkbox
        v-model="data[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
        label="I acknowledge and agree."
        :error-messages="errors[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
        hide-details="auto"
      />
    </v-col>
    <v-col v-if="show(F.FUNDING_INSTITUTION_NAME)" cols="12" sm="12">
      <h3 class="text-subtitle-2 font-weight-bold mb-1">Funding Institution</h3>
    </v-col>
    <v-col v-if="show(F.FUNDING_INSTITUTION_NAME)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.FUNDING_INSTITUTION_NAME.key]"
        :label="F.FUNDING_INSTITUTION_NAME.label"
        :placeholder="F.FUNDING_INSTITUTION_NAME.placeholder"
        variant="outlined"
        :error-messages="errors[F.FUNDING_INSTITUTION_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.FUNDING_INSTITUTION_ADDRESS)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.FUNDING_INSTITUTION_ADDRESS.key]"
        :label="F.FUNDING_INSTITUTION_ADDRESS.label"
        :placeholder="F.FUNDING_INSTITUTION_ADDRESS.placeholder"
        :error-messages="errors[F.FUNDING_INSTITUTION_ADDRESS.key]"
        variant="outlined"
      />
    </v-col>

    <v-col v-if="show(F.BILLING_CONTACT_NAME)" cols="12" sm="12">
      <h3 class="text-subtitle-2 font-weight-bold mb-1">Billing / Invoicing Contact</h3>
      <p class="text-body-2 mb-2">
        Please include the appropriate contact at the funding institution to ensure that funding is
        received for the quote provided for your submission and to ensure payment of the invoice.
      </p>
    </v-col>
    <v-col v-if="show(F.BILLING_CONTACT_NAME)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.BILLING_CONTACT_NAME.key]"
        :label="F.BILLING_CONTACT_NAME.label"
        :placeholder="F.BILLING_CONTACT_NAME.placeholder"
        variant="outlined"
        :error-messages="errors[F.BILLING_CONTACT_NAME.key]"
      />
    </v-col>

    <v-col v-if="show(F.BILLING_CONTACT_EMAIL)" cols="12" sm="6">
      <v-text-field
        v-model="data[F.BILLING_CONTACT_EMAIL.key]"
        :label="F.BILLING_CONTACT_EMAIL.label"
        :placeholder="F.BILLING_CONTACT_EMAIL.placeholder"
        type="email"
        variant="outlined"
        :error-messages="errors[F.BILLING_CONTACT_EMAIL.key]"
      />
    </v-col>

    <v-col v-if="show(F.COMMENTS)" cols="12">
      <v-textarea
        v-model="data[F.COMMENTS.key]"
        :label="F.COMMENTS.label"
        :placeholder="F.COMMENTS.placeholder"
        rows="3"
        variant="outlined"
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
          this.data[FIELDS.INSTITUTION_TYPE.key] === COLLABORATOR_TYPE_OPTIONS.DMC.key ||
          this.data[FIELDS.INSTITUTION_TYPE.key] === COLLABORATOR_TYPE_OPTIONS.BROAD.key
        );
      },
      institutionNames() {
        return this.allInstitutions
          .filter((i) => i.collaboration_type === this.data[FIELDS.INSTITUTION_TYPE.key])
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
          console.log('Loaded institutions:', institutions);
        } catch (error) {
          console.error('Failed to load institution names', error);
        }
      },
      onTypeChange() {
        Object.values(FIELDS).forEach((f) => {
          if (f.key !== FIELDS.INSTITUTION_TYPE.key) this.data[f.key] = '';
        });
      },
      show(field) {
        return !field.showIf || field.showIf(this.data);
      },
    },
  };
</script>
