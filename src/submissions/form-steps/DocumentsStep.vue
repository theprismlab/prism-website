<template>
  <v-row dense>
    <v-col cols="12">
      <v-file-input
        label="Upload creative assets"
        variant="outlined"
        density="compact"
        multiple
        prepend-icon=""
        prepend-inner-icon="mdi-paperclip"
      />
    </v-col>
    <v-col cols="12">
      <v-file-input
        label="Upload supporting documentation"
        variant="outlined"
        density="compact"
        prepend-icon=""
        prepend-inner-icon="mdi-file-document-outline"
      />
    </v-col>
    <v-col cols="12">
      <v-textarea
        v-model="data.notes"
        label="Notes"
        variant="outlined"
        density="compact"
        rows="2"
      />
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'DocumentsStep',
    props: {
      data: { type: Object, required: true },
    },
  };
</script>
