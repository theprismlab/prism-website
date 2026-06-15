<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data[F.INSTITUTION_TYPE.key]"
        :label="F.INSTITUTION_TYPE.label"
        :items="institutionTypes"
        variant="outlined"
        density="compact"
        :error-messages="errors[F.INSTITUTION_TYPE.key]"
      />
    </v-col>

    <v-col v-if="data[F.INSTITUTION_TYPE.key]" cols="12" sm="6">
      <v-select
        v-if="hasDropdownNames"
        v-model="data[F.INSTITUTION_NAME.key]"
        :label="F.INSTITUTION_NAME.label"
        :items="institutionNameOptions"
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

    <template v-if="showExtendedFields">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="data[F.QUOTE_ACKNOWLEDGEMENT.key]"
          :label="F.QUOTE_ACKNOWLEDGEMENT.label"
          variant="outlined"
          density="compact"
          :error-messages="errors[F.QUOTE_ACKNOWLEDGEMENT.key]"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="data[F.COMMERCIAL_USE.key]"
          :label="F.COMMERCIAL_USE.label"
          :items="['Yes', 'No']"
          variant="outlined"
          density="compact"
          :error-messages="errors[F.COMMERCIAL_USE.key]"
        />
      </v-col>

      <v-col v-if="data[F.COMMERCIAL_USE.key] === 'Yes'" cols="12">
        <v-text-field
          v-model="data[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
          :label="F.COMMERCIAL_USE_ACKNOWLEDGEMENT.label"
          variant="outlined"
          density="compact"
          :error-messages="errors[F.COMMERCIAL_USE_ACKNOWLEDGEMENT.key]"
        />
      </v-col>

      <template v-if="data[F.INSTITUTION_TYPE.key] === 'industry'">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data[F.FUNDING_INSTITUTION_NAME.key]"
            :label="F.FUNDING_INSTITUTION_NAME.label"
            variant="outlined"
            density="compact"
            :error-messages="errors[F.FUNDING_INSTITUTION_NAME.key]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data[F.FUNDING_INSTITUTION_ADDRESS.key]"
            :label="F.FUNDING_INSTITUTION_ADDRESS.label"
            variant="outlined"
            density="compact"
            :error-messages="errors[F.FUNDING_INSTITUTION_ADDRESS.key]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data[F.BILLING_CONTACT_NAME.key]"
            :label="F.BILLING_CONTACT_NAME.label"
            variant="outlined"
            density="compact"
            :error-messages="errors[F.BILLING_CONTACT_NAME.key]"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data[F.BILLING_CONTACT_EMAIL.key]"
            :label="F.BILLING_CONTACT_EMAIL.label"
            variant="outlined"
            density="compact"
            type="email"
            :error-messages="errors[F.BILLING_CONTACT_EMAIL.key]"
          />
        </v-col>
      </template>

      <v-col cols="12">
        <v-textarea
          v-model="data[F.COMMENTS.key]"
          :label="F.COMMENTS.label"
          variant="outlined"
          density="compact"
          rows="3"
          auto-grow
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
  const BROAD_NAMES = ['Broad Institute', 'Broad Institute Europe'];
  const DMC_NAMES = ['PRISM DMC', 'Partner DMC'];

  const FIELDS = {
    INSTITUTION_TYPE: { key: 'institutionType', label: 'Institution Type' },
    INSTITUTION_NAME: { key: 'institutionName', label: 'Institution Name' },
    QUOTE_ACKNOWLEDGEMENT: { key: 'quoteAcknowledgement', label: 'Quote Acknowledgement' },
    COMMERCIAL_USE: { key: 'commerecialUse', label: 'Commercial Use?' },
    COMMERCIAL_USE_ACKNOWLEDGEMENT: { key: 'commerecialUseAcknowledgement', label: 'Commercial Use Acknowledgement' },
    FUNDING_INSTITUTION_NAME: { key: 'fundingInstitutionName', label: 'Funding Institution Name' },
    FUNDING_INSTITUTION_ADDRESS: { key: 'fundingInstitutionAddress', label: 'Funding Institution Address' },
    BILLING_CONTACT_NAME: { key: 'billingInvoiceContactName', label: 'Billing / Invoice Contact Name' },
    BILLING_CONTACT_EMAIL: { key: 'billingInvoiceContactEmail', label: 'Billing / Invoice Contact Email' },
    COMMENTS: { key: 'comments', label: 'Comments' },
  };

  export function getInitialData() {
    return Object.fromEntries(Object.values(FIELDS).map((f) => [f.key, '']));
  }

  export function getSummary(data) {
    const f = (field) => ({ label: field.label, value: data[field.key] });

    const items = [f(FIELDS.INSTITUTION_TYPE), f(FIELDS.INSTITUTION_NAME)];

    if (data[FIELDS.INSTITUTION_TYPE.key] && data[FIELDS.INSTITUTION_TYPE.key] !== 'dmc') {
      items.push(f(FIELDS.QUOTE_ACKNOWLEDGEMENT));
      items.push(f(FIELDS.COMMERCIAL_USE));
      if (data[FIELDS.COMMERCIAL_USE.key] === 'Yes')
        items.push(f(FIELDS.COMMERCIAL_USE_ACKNOWLEDGEMENT));
    }
    if (data[FIELDS.INSTITUTION_TYPE.key] === 'industry') {
      items.push(f(FIELDS.FUNDING_INSTITUTION_NAME));
      items.push(f(FIELDS.FUNDING_INSTITUTION_ADDRESS));
      items.push(f(FIELDS.BILLING_CONTACT_NAME));
      items.push(f(FIELDS.BILLING_CONTACT_EMAIL));
    }
    if (data[FIELDS.COMMENTS.key]) items.push(f(FIELDS.COMMENTS));

    return items.filter((item) => item.value);
  }

  export function validate(data, _screenType) {
    const errors = {};
    if (!data[FIELDS.INSTITUTION_TYPE.key]) errors[FIELDS.INSTITUTION_TYPE.key] = 'Required';
    if (!data[FIELDS.INSTITUTION_NAME.key]) errors[FIELDS.INSTITUTION_NAME.key] = 'Required';
    if (data[FIELDS.INSTITUTION_TYPE.key] && data[FIELDS.INSTITUTION_TYPE.key] !== 'dmc') {
      if (!data[FIELDS.QUOTE_ACKNOWLEDGEMENT.key]) errors[FIELDS.QUOTE_ACKNOWLEDGEMENT.key] = 'Required';
      if (!data[FIELDS.COMMERCIAL_USE.key]) errors[FIELDS.COMMERCIAL_USE.key] = 'Required';
      if (data[FIELDS.COMMERCIAL_USE.key] === 'Yes' && !data[FIELDS.COMMERCIAL_USE_ACKNOWLEDGEMENT.key])
        errors[FIELDS.COMMERCIAL_USE_ACKNOWLEDGEMENT.key] = 'Required';
    }
    if (data[FIELDS.INSTITUTION_TYPE.key] === 'industry') {
      if (!data[FIELDS.FUNDING_INSTITUTION_NAME.key]) errors[FIELDS.FUNDING_INSTITUTION_NAME.key] = 'Required';
      if (!data[FIELDS.FUNDING_INSTITUTION_ADDRESS.key]) errors[FIELDS.FUNDING_INSTITUTION_ADDRESS.key] = 'Required';
      if (!data[FIELDS.BILLING_CONTACT_NAME.key]) errors[FIELDS.BILLING_CONTACT_NAME.key] = 'Required';
      if (!data[FIELDS.BILLING_CONTACT_EMAIL.key]) errors[FIELDS.BILLING_CONTACT_EMAIL.key] = 'Required';
    }
    return errors;
  }

  export default {
    name: 'InstitutionStep',
    props: {
      data: { type: Object, required: true },
      errors: { type: Object, default: () => ({}) },
    },
    data() {
      return {
        F: FIELDS,
        institutionTypes: ['broad', 'dmc', 'academic', 'industry'],
      };
    },
    computed: {
      hasDropdownNames() {
        return this.data[FIELDS.INSTITUTION_TYPE.key] === 'broad' || this.data[FIELDS.INSTITUTION_TYPE.key] === 'dmc';
      },
      institutionNameOptions() {
        if (this.data[FIELDS.INSTITUTION_TYPE.key] === 'broad') return BROAD_NAMES;
        if (this.data[FIELDS.INSTITUTION_TYPE.key] === 'dmc') return DMC_NAMES;
        return [];
      },
      showExtendedFields() {
        return (
          this.data[FIELDS.INSTITUTION_TYPE.key] &&
          this.data[FIELDS.INSTITUTION_TYPE.key] !== 'dmc' &&
          this.data[FIELDS.INSTITUTION_NAME.key]
        );
      },
    },
  };
</script>
