<template>
  <figure class="figure-cards">
    <div class="figure-cards__grid" :style="gridStyle">
      <v-card
        v-for="item in items"
        :key="item.title"
        variant="flat"
        class="figure-card"
        :class="`figure-card--${align}`"
      >
        <div class="figure-card__header">
          <h3 class="figure-card__title prism-text-title-medium">
            {{ item.title }}
          </h3>
          <p
            v-if="item.subtitle"
            class="figure-card__subtitle prism-text-body-medium text-medium-emphasis"
          >
            {{ item.subtitle }}
          </p>
        </div>
        <div class="figure-card__media">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.alt || item.title"
            class="figure-card__img"
          />
          <!-- No image yet: a labeled placeholder of the same width -->
          <div
            v-else
            class="figure-card__placeholder"
            role="img"
            :aria-label="`${item.title} (image to come)`"
          >
            <v-icon icon="mdi-image-outline" size="32" />
            <span v-if="item.placeholder" class="prism-text-body-small">{{
              item.placeholder
            }}</span>
          </div>
        </div>
      </v-card>
    </div>
    <figcaption v-if="caption || $slots.caption" class="figure-cards__caption">
      <slot name="caption">
        <figure-caption>{{ caption }}</figure-caption>
      </slot>
    </figcaption>
  </figure>
</template>

<script>
  /**
   * FigureCards
   *
   * A row of titled image cards that together form one figure, e.g. the panels
   * of a schematic in a white paper. The grid always has as many columns as
   * there are items, so a group of two, three or four cards fills the full
   * content width. On small screens it drops to two columns, then one.
   *
   * Images are rendered with a plain <img> rather than <v-img>: the figure
   * assets are SVGs with a viewBox but no width/height, and v-img derives its
   * aspect ratio from the image's natural size, which such SVGs do not report
   * consistently. A plain <img> at width: 100% scales from the viewBox in every
   * browser.
   *
   * Usage:
   *   <figure-cards :items="panels" caption="Fig.1. Schematic of the PRISM assay" />
   *   items: [{ title, subtitle?, image?, alt?, placeholder? }]
   * An item with `subtitle` shows it in smaller, muted text under the title.
   * An item without `image` shows a placeholder box, with `placeholder` as its
   * text, so a figure can be laid out before its artwork exists.
   */
  export default {
    name: 'FigureCards',
    props: {
      // [{ title: String, subtitle?: String, image: String, alt?: String }]
      items: { type: Array, required: true },
      // Caption rendered under the row. Use the `caption` slot for markup.
      caption: { type: String, default: '' },
      // Vertical alignment of the image inside the card when cards in a row
      // have different image heights: 'start' | 'center' | 'end' (bottom)
      align: {
        type: String,
        default: 'end',
        validator: (v) => ['start', 'center', 'end'].includes(v),
      },
      // Largest number of columns on wide screens. Defaults to one per item;
      // lower it to wrap a long list onto several rows.
      maxColumns: { type: Number, default: null },
    },
    computed: {
      gridStyle() {
        const columns = Math.max(1, this.maxColumns || this.items.length);
        return { '--figure-cards-columns': columns };
      },
    },
  };
</script>

<style scoped>
  .figure-cards {
    margin: 2rem 0 0;
  }

  /* One column per card, so every group spans the full content width */
  .figure-cards__grid {
    display: grid;
    grid-template-columns: repeat(var(--figure-cards-columns, 4), minmax(0, 1fr));
    gap: 6px;
  }

  .figure-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    /* Tight gutters: the image should use nearly the whole card width */
    padding: 12px 12px 8px;
    border-radius: var(--prism-radius-lg);
  }

  .figure-card__header {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .figure-card__title,
  .figure-card__subtitle {
    margin: 0;
    line-height: 1.33em !important;
  }

  /* Images sit on the bottom edge by default, so a row of cards with
     different image heights shares one baseline */
  .figure-card__media {
    display: flex;
    flex: 1;
    align-items: flex-end;
    min-width: 0;
  }
  .figure-card--start .figure-card__media {
    align-items: flex-start;
  }
  .figure-card--center .figure-card__media {
    align-items: center;
  }

  .figure-card__img {
    display: block;
    width: 100%;
    height: auto;
  }

  .figure-card__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    aspect-ratio: 1;
    color: var(--v-grey-darken-1);
    text-align: center;
    background: rgba(var(--v-theme-on-surface), 0.035);
    border: 1px dashed rgba(var(--v-theme-on-surface), 0.25);
    border-radius: var(--prism-radius-md, 12px);
  }

  /* The caption component carries its own top margin */
  .figure-cards__caption {
    margin: 0;
  }

  @media (max-width: 960px) {
    .figure-cards__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .figure-cards__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
