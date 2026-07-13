<template>
  <v-system-bar :height="bannerHeight" color="transparent">
    <prism-top-banner ref="bannerContent" variant="primary" @dismiss="$emit('dismiss')">
      <p class="prism-text-body-xlarge">
        The submission window for MTS033 is now open! Visit our
        <a href="/submission-hub" target="_blank" rel="noopener noreferrer">
          Submission Hub<v-icon size="small" color="#ffe5ad">mdi-arrow-top-right</v-icon>
        </a>
        for more information.
      </p>
    </prism-top-banner>
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

<style scoped>
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
  .v-system-bar .v-icon {
    opacity: 1 !important;
    color: #ffe5ad !important;
  }
  a {
    font-weight: bold;
    /* background: linear-gradient(90deg, #eafbff 0%, #dff6fb 50%, #c4f0ff 100%); */
    background: linear-gradient(90deg, #fff3ad 0%, #fbeea0 50%, #fcde9f 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-decoration: none;
  }
  .v-icon {
    opacity: 1 !important;
    color: #ffe5ad !important;
  }
</style>
