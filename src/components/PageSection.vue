<template>
  <section
    :class="[
      'page-section',
      `page-section--bg-${background}`,
      { 'page-section--filled': background !== 'default' },
    ]"
    :style="paddingStyle"
  >
    <app-container v-if="width" :wide="width === 'wide'" :narrow="width === 'narrow'">
      <slot />
    </app-container>
    <slot v-else />
  </section>
</template>

<script>
  /**
   * PageSection
   *
   * Standard wrapper for a vertical section of a page. Owns:
   *   - vertical spacing (padding)
   *   - optional full-bleed background
   *   - the centered content column, when `width` is given
   *
   * Vertical rhythm (desktop; scaled to 75% under 600px):
   *   - plain section:  32px top and bottom, so adjacent sections sit 64px apart
   *   - filled section: 64px top and bottom, so the band reads as a block
   * Pass `padding` / `padding-bottom` (Vuetify units, 1 = 4px) only for
   * deliberate exceptions; most pages should not need them.
   *
   * Composition rule:
   *   <page>
   *     <page-section width="wide" background="muted">
   *       ...content / section-component...
   *     </page-section>
   *   </page>
   *
   * Without `width` the section renders its slot unwrapped, which keeps the
   * older `<page-section><app-container>...</app-container></page-section>`
   * form working until those pages migrate.
   *
   * Section components (e.g. MainVisual, OurPortal) MUST NOT add their own
   * container or background — those belong here.
   */
  export default {
    name: 'PageSection',
    props: {
      // Content column width: 'default' | 'wide' | 'narrow' (see AppContainer).
      // Omit to render the slot without a container.
      width: {
        type: String,
        default: null,
        validator: (v) => ['default', 'wide', 'narrow'].includes(v),
      },
      // Background variant: 'default' | 'muted' | 'gradient' | 'blue-indigo-dark'
      //   | 'multi-focal-cool' | 'multi-focal-slate' | 'multi-focal-neutral' | 'multi-focal-warm'
      background: { type: String, default: 'default' },
      // Vertical padding override (Vuetify spacing units, e.g. 12 -> 48px).
      // Omit to use the rhythm defaults above.
      padding: { type: [String, Number], default: null },
      // Bottom padding override, same units. Falls back to `padding`, then the default.
      paddingBottom: { type: [String, Number], default: null },
    },
    computed: {
      paddingStyle() {
        // Overrides are passed as custom properties so the responsive scale
        // in the stylesheet still applies to them.
        const style = {};
        const top = Number(this.padding);
        if (this.padding != null && Number.isFinite(top))
          style['--section-pad-top'] = `${top * 4}px`;
        const bottom = Number(this.paddingBottom);
        if (this.paddingBottom != null && Number.isFinite(bottom)) {
          style['--section-pad-bottom'] = `${bottom * 4}px`;
        }
        return style;
      },
    },
  };
</script>

<style scoped>
  .page-section {
    --section-space: 32px;
    --section-scale: 1;
    width: 100%;
    margin: 0 auto;
    padding-top: calc(var(--section-pad-top, var(--section-space)) * var(--section-scale));
    padding-bottom: calc(
      var(--section-pad-bottom, var(--section-pad-top, var(--section-space))) * var(--section-scale)
    );
  }
  .page-section--filled {
    --section-space: 64px;
  }
  @media (max-width: 599.98px) {
    .page-section {
      --section-scale: 0.75;
    }
  }

  .page-section--bg-muted {
    background-color: var(--v-grey-lighten-5);
  }

  .page-section--bg-gradient {
    color: white;
    background: linear-gradient(120deg, var(--v-blue-base), var(--v-indigo-darken-1));
  }
  .page-section--bg-blue-indigo-dark {
    color: white;
    background: linear-gradient(
      135deg,
      var(--v-blue-darken-3),
      var(--v-indigo-darken-3) 60%,
      var(--v-blue-darken-4)
    );
  }
  .page-section--bg-multi-focal-cool {
    background:
      radial-gradient(ellipse at 12% 65%, rgba(160, 195, 235, 0.18) 0%, transparent 52%),
      radial-gradient(ellipse at 82% 18%, rgba(170, 215, 228, 0.15) 0%, transparent 48%),
      radial-gradient(ellipse at 55% 88%, rgba(185, 168, 230, 0.12) 0%, transparent 44%),
      radial-gradient(ellipse at 72% 52%, rgba(138, 210, 198, 0.1) 0%, transparent 48%),
      radial-gradient(ellipse at 35% 20%, rgba(200, 185, 240, 0.1) 0%, transparent 40%), #f7f9fd;
  }
  /* Light end of the dark slate navy used by the publications explorer toolbar
     (#1e2230 -> #2a2f42 -> #353b52). Same hue family, no new accent colors. */
  .page-section--bg-multi-focal-slate {
    background:
      radial-gradient(ellipse at 14% 68%, rgba(53, 59, 82, 0.12) 0%, transparent 52%),
      radial-gradient(ellipse at 82% 18%, rgba(96, 110, 160, 0.11) 0%, transparent 48%),
      radial-gradient(ellipse at 58% 92%, rgba(42, 47, 66, 0.07) 0%, transparent 44%),
      radial-gradient(ellipse at 38% 22%, rgba(140, 150, 190, 0.08) 0%, transparent 40%), #f5f6fa;
  }
  .page-section--bg-multi-focal-neutral {
    background:
      radial-gradient(ellipse at 15% 60%, rgba(210, 210, 218, 0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 20%, rgba(205, 215, 220, 0.28) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 90%, rgba(215, 210, 220, 0.22) 0%, transparent 48%),
      radial-gradient(ellipse at 70% 55%, rgba(208, 218, 215, 0.2) 0%, transparent 45%), #fafafa;
  }
  .page-section--bg-multi-focal-warm {
    background:
      radial-gradient(ellipse at 20% 65%, rgba(255, 205, 190, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 75% 25%, rgba(255, 220, 200, 0.25) 0%, transparent 45%),
      radial-gradient(ellipse at 55% 85%, rgba(255, 230, 210, 0.2) 0%, transparent 40%),
      radial-gradient(ellipse at 70% 50%, rgba(255, 215, 195, 0.18) 0%, transparent 42%), #fff8f5;
  }
</style>
