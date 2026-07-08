<template>
  <v-app-bar app clipped-left color="white" elevation="0" height="64">
    <prism-app-bar site="marketing" :base-url="baseUrl" />
  </v-app-bar>
</template>

<script>
  export default {
    name: 'TheAppBar',
    data() {
      return {
        baseUrl: window.location.origin,
      };
    },
    computed: {},
  };
</script>

<style>
  /* v-app-bar handles fixed positioning — reset prism's own sticky */
  .prism-app-bar-root {
    position: static !important;
    z-index: unset !important;
    width: 100%;
  }
  /* Remove v-app-bar's default horizontal padding so prism-app-bar fills full width */
  .v-app-bar .v-toolbar__content {
    padding: 0 !important;
    width: 100%;
  }

  /*
 * Vuetify 2 injects transform: translateY(0px) on v-app-bar even at rest.
 * Any transform creates a containing block for position:fixed descendants,
 * so the prism mobile drawer/backdrop get anchored to the bar instead of
 * the viewport and are clipped by the toolbar's overflow:hidden.
 */
  .v-app-bar {
    transform: none !important;
  }
  .v-app-bar,
  .v-app-bar .v-toolbar__content {
    overflow: visible !important;
  }

  /* Z-index scale: 100 = mobile nav backdrop, 110 = mobile nav drawer panel */
  .prism-nav-drawer__backdrop {
    z-index: 100 !important;
  }
  .prism-nav-drawer {
    z-index: 110 !important;
  }
</style>
