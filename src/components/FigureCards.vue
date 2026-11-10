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
        <h3 class="figure-card__title prism-text-title-medium">{{ item.title }}</h3>
        <div class="figure-card__media">
          <img :src="item.image" :alt="item.alt || item.title" class="figure-card__img" />
        </div>
      </v-card>
    </div>
    <figcaption v-if="caption || $slots.caption" class="figure-cards__caption">
      <slot name="caption">
        <p class="prism-text-body-medium text-medium-emphasis">{{ caption }}</p>
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
   *   items: [{ title, image, alt? }]
   */
  export default {
    name: 'FigureCards',
    props: {
      // [{ title: String, image: String, alt?: String }]
      items: { type: Array, required: true },
      // Caption rendered under the row. Use the `caption` slot for markup.
      caption: { type: String, default: '' },
      // Vertical alignment of the image inside the card when cards in a row
      // have different image heights: 'start' | 'center'
      align: {
        type: String,
        default: 'start',
        validator: (v) => ['start', 'center'].includes(v),
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

  .figure-card__title {
    margin: 0;
  }

  .figure-card__media {
    display: flex;
    flex: 1;
    align-items: flex-start;
    min-width: 0;
  }
  .figure-card--center .figure-card__media {
    align-items: center;
  }

  .figure-card__img {
    display: block;
    width: 100%;
    height: auto;
  }

  .figure-cards__caption {
    margin-top: 0.75rem;
  }
  .figure-cards__caption p {
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
