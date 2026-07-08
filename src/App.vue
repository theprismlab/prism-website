<template>
  <v-app :style="cssProps">
    <TheAppBar />
    <router-view />
  </v-app>
</template>

<script>
import TheAppBar from '@/components/TheAppBar.vue';

export default {
  components: { TheAppBar },
  computed: {
    cssProps() {
      var themeColors = {};
      Object.keys(this.$vuetify.theme.themes.light.colors).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light.colors[color];
      });
      return themeColors;
    },
  },
};
</script>

