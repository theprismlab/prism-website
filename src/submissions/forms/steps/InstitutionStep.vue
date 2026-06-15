<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data.institutionType"
        label="Institution Type"
        :items="institutionTypes"
        variant="outlined"
        density="compact"
        :error-messages="errors.institutionType"
      />
    </v-col>

    <v-col v-if="data.institutionType" cols="12" sm="6">
      <v-select
        v-if="hasDropdownNames"
        v-model="data.institutionName"
        label="Institution Name"
        :items="institutionNameOptions"
        variant="outlined"
        density="compact"
        :error-messages="errors.institutionName"
      />
      <v-text-field
        v-else
        v-model="data.institutionName"
        label="Institution Name"
        variant="outlined"
        density="compact"
        :error-messages="errors.institutionName"
      />
    </v-col>

    <template v-if="showExtendedFields">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="data.quoteAcknowledgement"
          label="Quote Acknowledgement"
          variant="outlined"
          density="compact"
          :error-messages="errors.quoteAcknowledgement"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="data.commerecialUse"
          label="Commercial Use?"
          :items="['Yes', 'No']"
          variant="outlined"
          density="compact"
          :error-messages="errors.commerecialUse"
        />
      </v-col>

      <v-col v-if="data.commerecialUse === 'Yes'" cols="12">
        <v-text-field
          v-model="data.commerecialUseAcknowledgement"
          label="Commercial Use Acknowledgement"
          variant="outlined"
          density="compact"
          :error-messages="errors.commerecialUseAcknowledgement"
        />
      </v-col>

      <template v-if="data.institutionType === 'industry'">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.fundingInstitutionName"
            label="Funding Institution Name"
            variant="outlined"
            density="compact"
            :error-messages="errors.fundingInstitutionName"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.fundingInstitutionAddress"
            label="Funding Institution Address"
            variant="outlined"
            density="compact"
            :error-messages="errors.fundingInstitutionAddress"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.billingInvoiceContactName"
            label="Billing / Invoice Contact Name"
            variant="outlined"
            density="compact"
            :error-messages="errors.billingInvoiceContactName"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.billingInvoiceContactEmail"
            label="Billing / Invoice Contact Email"
            variant="outlined"
            density="compact"
            type="email"
            :error-messages="errors.billingInvoiceContactEmail"
          />
        </v-col>
      </template>

      <v-col cols="12">
        <v-textarea
          v-model="data.comments"
          label="Comments"
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

  export function getInitialData() {
    return {
      institutionType: '',
      institutionName: '',
      quoteAcknowledgement: '',
      commerecialUse: '',
      commerecialUseAcknowledgement: '',
      fundingInstitutionName: '',
      fundingInstitutionAddress: '',
      billingInvoiceContactName: '',
      billingInvoiceContactEmail: '',
      comments: '',
    };
  }

  export function getSummary(data) {
    const items = [
      { label: 'Institution Type', value: data.institutionType },
      { label: 'Institution Name', value: data.institutionName },
    ];
    if (data.institutionType && data.institutionType !== 'dmc') {
      items.push({ label: 'Quote Acknowledgement', value: data.quoteAcknowledgement });
      items.push({ label: 'Commercial Use', value: data.commerecialUse });
      if (data.commerecialUse === 'Yes')
        items.push({ label: 'Commercial Use Acknowledgement', value: data.commerecialUseAcknowledgement });
    }
    if (data.institutionType === 'industry') {
      items.push({ label: 'Funding Institution Name', value: data.fundingInstitutionName });
      items.push({ label: 'Funding Institution Address', value: data.fundingInstitutionAddress });
      items.push({ label: 'Billing Contact Name', value: data.billingInvoiceContactName });
      items.push({ label: 'Billing Contact Email', value: data.billingInvoiceContactEmail });
    }
    if (data.comments) items.push({ label: 'Comments', value: data.comments });
    return items.filter((item) => item.value);
  }

  export function validate(data, _screenType) {
    const errors = {};
    if (!data.institutionType) errors.institutionType = 'Required';
    if (!data.institutionName) errors.institutionName = 'Required';
    if (data.institutionType && data.institutionType !== 'dmc') {
      if (!data.quoteAcknowledgement) errors.quoteAcknowledgement = 'Required';
      if (!data.commerecialUse) errors.commerecialUse = 'Required';
      if (data.commerecialUse === 'Yes' && !data.commerecialUseAcknowledgement)
        errors.commerecialUseAcknowledgement = 'Required';
    }
    if (data.institutionType === 'industry') {
      if (!data.fundingInstitutionName) errors.fundingInstitutionName = 'Required';
      if (!data.fundingInstitutionAddress) errors.fundingInstitutionAddress = 'Required';
      if (!data.billingInvoiceContactName) errors.billingInvoiceContactName = 'Required';
      if (!data.billingInvoiceContactEmail) errors.billingInvoiceContactEmail = 'Required';
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
        institutionTypes: ['broad', 'dmc', 'academic', 'industry'],
      };
    },
    computed: {
      hasDropdownNames() {
        return this.data.institutionType === 'broad' || this.data.institutionType === 'dmc';
      },
      institutionNameOptions() {
        if (this.data.institutionType === 'broad') return BROAD_NAMES;
        if (this.data.institutionType === 'dmc') return DMC_NAMES;
        return [];
      },
      showExtendedFields() {
        return (
          this.data.institutionType &&
          this.data.institutionType !== 'dmc' &&
          this.data.institutionName
        );
      },
    },
  };
</script>
