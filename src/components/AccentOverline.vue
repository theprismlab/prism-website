<template>
  <component
    :is="tag"
    class="accent-overline"
    :style="{ '--accent-overline-start': colors.from, '--accent-overline-end': colors.to }"
  >
    <v-icon
      v-if="icon"
      :icon="icon"
      :size="iconSize"
      class="accent-overline__icon"
      aria-hidden="true"
    />
    <span class="accent-overline__text prism-text-overline font-weight-black">
      <slot />
    </span>
  </component>
</template>

<script>
  /**
   * AccentOverline
   *
   * Small uppercase label with gradient text and an optional leading icon,
   * tinted to the gradient's start color so the pair reads as one mark.
   *
   * Usage:
   *   <accent-overline icon="mdi-file-document-outline">
   *     Oncology Reference · Manuscript
   *   </accent-overline>
   *
   * Renders a <span> by default so it can sit above a page's <h1> without
   * adding a heading out of order. Pass tag="h2" when it should label a section
   * (SectionOverline already covers the plain/blue-gradient section case).
   *
   * Colors come from a named `scheme` (see SCHEMES below):
   *   <accent-overline scheme="blue">...</accent-overline>
   * `from` / `to` (any CSS color or var()) override either end of the scheme.
   */

  // Gradient start/end per scheme. Add new schemes here.
  const SCHEMES = {
    // Material deep-orange darken-2 -> pink darken-2
    warm: { from: '#e64a19', to: '#c2185b' },
    // Same blue -> indigo as SectionOverline's `gradient` variant
    blue: { from: 'var(--v-blue-darken-2)', to: 'var(--v-indigo-darken-3)' },
  };

  export default {
    name: 'AccentOverline',
    props: {
      // MDI icon name; omit for text only
      icon: { type: String, default: '' },
      iconSize: { type: [String, Number], default: 18 },
      // Wrapper element: 'span' (default), 'div', 'p', 'h2', ...
      tag: { type: String, default: 'span' },
      // Named color scheme: 'warm' | 'blue'
      scheme: {
        type: String,
        default: 'warm',
        validator: (value) => value in SCHEMES,
      },
      // Optional overrides for either end of the gradient
      from: { type: String, default: '' },
      to: { type: String, default: '' },
    },
    computed: {
      colors() {
        const base = SCHEMES[this.scheme] || SCHEMES.warm;
        return { from: this.from || base.from, to: this.to || base.to };
      },
    },
  };
</script>

<style scoped>
  .accent-overline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
  }
  .accent-overline__icon {
    color: var(--accent-overline-start);
  }
  .accent-overline__text {
    display: inline-block;
    background: linear-gradient(90deg, var(--accent-overline-start), var(--accent-overline-end));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
</style>
