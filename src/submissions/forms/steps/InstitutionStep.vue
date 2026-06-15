<template>
  <v-row dense>
    <v-col cols="12">
      <v-textarea
        v-model="data.campaignDescription"
        label="Campaign Description"
        variant="outlined"
        density="compact"
        rows="3"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.campaignStartDate"
        label="Campaign Start Date"
        variant="outlined"
        density="compact"
        type="date"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data.duration"
        label="Duration"
        :items="['1 week', '2 weeks', '1 month', '3 months', '6 months']"
        variant="outlined"
        density="compact"
      />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'InstitutionStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
