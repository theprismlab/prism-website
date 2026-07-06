<template>
  <v-expansion-panels variant="accordion" flat>
    <v-expansion-panel v-for="item in items" :key="item.title">
      <v-expansion-panel-title>
        {{ item.title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        {{ item.text }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
  export default {
    name: 'ExpansionPanel',
    components: {},
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>
<style scoped>
  .v-expansion-panel-title {
    font-size: 0.925rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
</style>
