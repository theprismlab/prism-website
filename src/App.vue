<template>
  <v-app :style="cssProps">
    <TheAppBanner v-if="showBanner" @dismiss="dismissBanner" />
    <TheAppBar :has-banner="showBanner" />
    <router-view />
  </v-app>
</template>

<script>
  import TheAppBar from '@/components/TheAppBar.vue';
  import TheAppBanner from '@/components/TheAppBanner.vue';

  const SHOW_BANNER_KEY = 'prism:showBanner';

  export default {
    components: { TheAppBar, TheAppBanner },
    data() {
      return {
        showBanner: false,
        //    showBanner: sessionStorage.getItem(SHOW_BANNER_KEY) !== 'false',
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
    methods: {
      dismissBanner() {
        this.showBanner = false;
        sessionStorage.setItem(SHOW_BANNER_KEY, 'false');
      },
    },
  };
</script>
