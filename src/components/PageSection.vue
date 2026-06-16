<template>
  <section
    :class="['page-section', `page-section--bg-${background}`]"
    :style="paddingStyle"
  >
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
   *       <app-container wide>...content / section-component...</app-container>
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
      padding: { type: [String, Number], default: 8 },
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
    background: linear-gradient(120deg, var(--v-primary-accent-3), var(--v-primary-darken-4));
  }
  .page-section--bg-multi-focal-cool {
    background:
      radial-gradient(ellipse at 12% 65%, rgba(160, 195, 235, 0.18) 0%, transparent 52%),
      radial-gradient(ellipse at 82% 18%, rgba(170, 215, 228, 0.15) 0%, transparent 48%),
      radial-gradient(ellipse at 55% 88%, rgba(185, 168, 230, 0.12) 0%, transparent 44%),
      radial-gradient(ellipse at 72% 52%, rgba(138, 210, 198, 0.1) 0%, transparent 48%),
      radial-gradient(ellipse at 35% 20%, rgba(200, 185, 240, 0.1) 0%, transparent 40%), #f7f9fd;
  }
  .page-section--bg-multi-focal-neutral {
    background:
      radial-gradient(ellipse at 15% 60%, rgba(210, 210, 218, 0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(205, 215, 220, 0.28) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(215, 210, 220, 0.22) 0%, transparent 48%),
      radial-gradient(ellipse at 70% 55%, rgba(208, 218, 215, 0.2) 0%, transparent 45%), #fafafa;
  }
</style>
