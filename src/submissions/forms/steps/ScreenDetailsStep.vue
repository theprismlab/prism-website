<template>
  <v-row dense>
    <v-col cols="12">
      <v-select
        v-model="data.screenType"
        label="Screen Type"
        :items="['Digital', 'Static', 'Interactive', 'Programmatic']"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        v-model="data.location"
        label="Location / Address"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="data.weeklyImpressions"
        label="Weekly Impressions (est.)"
        variant="outlined"
        density="compact"
        type="number"
      />
    </v-col>
    <v-col cols="12" sm="6">
      <v-select
        v-model="data.audienceCategory"
        label="Audience Category"
        :items="['General', 'Commuters', 'Shoppers', 'Sports Fans']"
        variant="outlined"
        density="compact"
      />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ScreenDetailsStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
