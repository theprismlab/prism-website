<template>
  <v-app :style="cssProps">
    <TheAppBanner v-if="showBanner" @dismiss="showBanner = false" />
    <TheAppBar :has-banner="showBanner" />
    <router-view />
  </v-app>
</template>

<script>
  import TheAppBar from '@/components/TheAppBar.vue';
  import TheAppBanner from '@/components/TheAppBanner.vue';
  export default {
    components: { TheAppBar, TheAppBanner },
    data() {
      return {
        showBanner: true,
      };
    },
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
