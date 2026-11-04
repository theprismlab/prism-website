<template>
  <div class="manuscript-figures">
    <figure
      v-for="(fig, i) in figures"
      :key="fig.label || fig.caption || i"
      class="manuscript-figure"
      :style="{ '--figure-cols': fig.cols || 12 }"
    >
      <div class="manuscript-figure__media">
        <v-img
          v-if="fig.src"
          eager
          :src="fig.src"
          :alt="fig.alt || fig.caption || fig.label"
          :max-height="fig.maxHeight"
        />
        <div v-else class="manuscript-figure__placeholder" aria-hidden="true">
          <v-icon icon="mdi-image-outline" size="40" />
        </div>
      </div>
      <figcaption class="manuscript-figure__caption">
        <span v-if="fig.label" class="manuscript-figure__label">{{ fig.label }}</span>
        <span v-if="fig.caption">{{ fig.caption }}</span>
      </figcaption>
    </figure>
  </div>
</template>

<script>
  /**
   * ManuscriptFigures
   *
   * A set of manuscript figures, each an image with its caption beneath, laid
   * out on a 12-column grid so figures can share rows in any combination.
   *
   * Props:
   *   figures — [{ src, alt?, label?, caption, cols?, maxHeight? }]
   *     src      image URL (a path under /public, or an imported asset); an empty
   *              string shows a placeholder so captions can be written first
   *     alt      alt text; falls back to the caption, then the label
   *     label    short lead-in rendered bold, e.g. "Figure 1."
   *     caption  the caption text
   *     cols     columns out of 12 the figure spans on md+ screens (default 12,
   *              i.e. a full row); e.g. two figures with cols: 6 share a row.
   *              Below md every figure spans the full width.
   *     maxHeight  caps the image height; a number is px, a string is any CSS
   *              length (e.g. '60vh'). The image scales down to fit, uncropped,
   *              centered on its surface. Omit for the image's natural height.
   */
  export default {
    name: 'ManuscriptFigures',
    props: {
      figures: { type: Array, required: true },
    },
  };
</script>

<style scoped>
  .manuscript-figures {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 32px 24px;
    margin-top: 16px;
  }

  /* --figure-cols is set per figure from `cols` (default 12). Grid items
     stretch to the row height; the column layout lets the media area absorb
     that height so figures sharing a row match and captions align. */
  .manuscript-figure {
    grid-column: span var(--figure-cols, 12);
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  /* The image sits on a bordered surface so light figure backgrounds still
     read as a bounded panel against the page. It fills the figure's height
     and centers the image inside it. */
  .manuscript-figure__media {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    border-radius: var(--prism-radius-lg);
    background: rgb(var(--v-theme-surface));
  }
  .manuscript-figure__media > * {
    width: 100%;
  }
  .manuscript-figure__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 16 / 9;
    color: rgba(var(--v-theme-on-surface), 0.3);
    background: rgba(var(--v-theme-on-surface), 0.03);
  }

  .manuscript-figure__caption {
    margin-top: 12px;
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(var(--v-theme-on-surface), 0.7);
  }
  .manuscript-figure__label {
    margin-right: 6px;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
  }

  /* sm and below: one figure per row regardless of `cols` */
  @media (max-width: 959.98px) {
    .manuscript-figure {
      grid-column: 1 / -1;
    }
  }
</style>
