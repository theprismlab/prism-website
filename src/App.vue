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
        // showBanner: localStorage.getItem(SHOW_BANNER_KEY) !== 'false',
        showBanner: sessionStorage.getItem(SHOW_BANNER_KEY) !== 'false',
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
    // mounted() {
    //   window.addEventListener('storage', this.onStorageChange);
    // },
    // beforeUnmount() {
    //   window.removeEventListener('storage', this.onStorageChange);
    // },
    methods: {
      dismissBanner() {
        this.showBanner = false;
        // localStorage.setItem(SHOW_BANNER_KEY, 'false');
        sessionStorage.setItem(SHOW_BANNER_KEY, 'false');
      },
      // 'storage' only fires for changes made in *other* tabs/apps, so this
      // is what lets a dismissal there propagate here without a reload.
      // Not usable with sessionStorage (it's per-tab), so this listener is disabled.
      // onStorageChange(event) {
      //   if (event.key === SHOW_BANNER_KEY) {
      //     this.showBanner = event.newValue !== 'false';
      //   }
      // },
    },
  };
</script>
