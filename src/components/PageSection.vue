<template>
  <section :class="['page-section', `page-section--bg-${background}`]" :style="paddingStyle">
    <slot />
  </section>
</template>

<script>
  /**
   * PageSection
   *
   * Standard wrapper for a vertical section of a page. Owns:
   *   - vertical spacing (padding)
   *   - optional full-bleed background
   *
   * Composition rule:
   *   <page>
   *     <page-section background="muted">
   *       <container-md>...content / section-component...</container-md>
   *     </page-section>
   *   </page>
   *
   * Section components (e.g. MainVisual, OurPortal) MUST NOT add their own
   * container or background — those belong here.
   */
  export default {
    name: 'PageSection',
    props: {
      // Background variant: 'default' | 'muted' | 'tinted' | 'gradient'
      background: { type: String, default: 'default' },
      // Vertical padding (in Vuetify spacing units, e.g. 12 -> py-12)
      padding: { type: [String, Number], default: 12 },
    },
    computed: {
      paddingStyle() {
        const n = Number(this.padding);
        if (!Number.isFinite(n)) return {};
        // 1 spacing unit = 4px (matches Vuetify's py-N)
        const v = `${n * 4}px`;
        return { paddingTop: v, paddingBottom: v };
      },
    },
  };
</script>

<style scoped>
  .page-section {
    width: 100%;
  }
  .page-section--bg-muted {
    background-color: var(--v-grey-lighten-5);
  }
  .page-section--bg-tinted {
    background-color: var(--v-primary-lighten-6-desaturated);
  }
  .page-section--bg-gradient {
    color: white;
    background: linear-gradient(
      120deg,
      var(--v-primary-accent-3),
      var(--v-primary-darken-4)
    );
  }
</style>
