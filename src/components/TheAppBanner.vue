<template>
  <v-system-bar :height="bannerHeight" color="transparent">
    <prism-top-banner
      ref="bannerContent"
      variant="primary"
      message="This is a top banner — it sits above the AppBar."
      @dismiss="$emit('dismiss')"
    />
  </v-system-bar>
</template>

<script>
  export default {
    name: 'TheAppBanner',
    emits: ['dismiss'],
    data() {
      return {
        bannerHeight: 0,
      };
    },
    mounted() {
      // Measure the inner prism-top-banner, not v-system-bar's own box —
      // v-system-bar's height is *set by* bannerHeight, so measuring it
      // directly would just read back whatever we last assigned.
      const contentEl = this.$refs.bannerContent?.$el;
      if (!contentEl) return;
      this.bannerHeight = contentEl.getBoundingClientRect().height;
      this._resizeObserver = new ResizeObserver(() => {
        this.bannerHeight = contentEl.getBoundingClientRect().height;
      });
      this._resizeObserver.observe(contentEl);
    },
    beforeUnmount() {
      this._resizeObserver?.disconnect();
    },
  };
</script>

<style>
  /*
 * v-system-bar defaults to flex/flex-end/padding/a surface background —
 * all meant for its usual icon-tray content. prism-top-banner supplies
 * its own full-bleed background per variant, so reset the shell to plain
 * width:100% and let it fill naturally.
 */
  .v-system-bar {
    padding-inline: 0 !important;
    justify-content: normal !important;
    width: 100%;
  }
</style>
