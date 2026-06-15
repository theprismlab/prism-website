<template>
  <v-row dense>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data.institutionType"
        label="Institution Type"
        :items="institutionTypes"
        variant="outlined"
        density="compact"
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
      />
      <v-text-field
        v-else
        v-model="data.institutionName"
        label="Institution Name"
        variant="outlined"
        density="compact"
      />
    </v-col>

    <template v-if="showExtendedFields">
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="data.quoteAcknowledgement"
          label="Quote Acknowledgement"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="data.commerecialUse"
          label="Commercial Use?"
          :items="['Yes', 'No']"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col v-if="data.commerecialUse === 'Yes'" cols="12">
        <v-text-field
          v-model="data.commerecialUseAcknowledgement"
          label="Commercial Use Acknowledgement"
          variant="outlined"
          density="compact"
        />
      </v-col>

      <template v-if="data.institutionType === 'industry'">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.fundingInstitutionName"
            label="Funding Institution Name"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.fundingInstitutionAddress"
            label="Funding Institution Address"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.billingInvoiceContactName"
            label="Billing / Invoice Contact Name"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="data.billingInvoiceContactEmail"
            label="Billing / Invoice Contact Email"
            variant="outlined"
            density="compact"
            type="email"
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

  export default {
    name: 'InstitutionStep',
    props: {
      data: { type: Object, required: true },
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
