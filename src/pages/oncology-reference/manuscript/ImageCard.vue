<template>
  <v-card
    variant="outlined"
    class="image-card"
    :class="[`image-card--${layout}`, { 'image-card--reverse': reverse }]"
  >
    <div class="image-card__media">
      <v-img v-if="image" eager :src="image" :alt="title" class="image-card__img" />
      <div v-else class="image-card__placeholder">
        <v-icon icon="mdi-image-outline" size="40" />
        <span v-if="caption" class="image-card__placeholder-caption">{{ caption }}</span>
      </div>
    </div>
    <div class="image-card__content">
      <section-overline v-if="category" gradient>{{ category }}</section-overline>
      <h3 class="image-card__title prism-text-headline-small">{{ title }}</h3>
      <p class="image-card__body prism-text-body-large">{{ body }}</p>
      <p v-if="caption" class="image-card__caption">{{ caption }}</p>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'ImageCard',
    props: {
      title: { type: String, required: true },
      body: { type: String, default: '' },
      // Figure reference shown under the body (and in the placeholder when there is no image)
      caption: { type: String, default: '' },
      // Short overline label, e.g. the topic the case study belongs to
      category: { type: String, default: '' },
      // Image URL; when empty a placeholder panel is shown instead
      image: { type: String, default: '' },
      // 'horizontal' puts the image beside the text; 'vertical' stacks it above
      layout: {
        type: String,
        default: 'horizontal',
        validator: (v) => ['horizontal', 'vertical'].includes(v),
      },
      // Horizontal layout only: put the image on the right instead of the left
      reverse: { type: Boolean, default: false },
    },
  };
</script>

<style scoped>
  /* Vertical by default: image stacked above the text */
  .image-card {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
  }
  /* Horizontal: image beside the text (falls back to stacked on small screens) */
  .image-card--horizontal {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 28px;
  }
  .image-card--horizontal.image-card--reverse .image-card__media {
    order: 2;
  }

  .image-card__media {
    display: flex;
    align-items: center;
    min-height: 220px;
    border-radius: var(--prism-radius-md, 12px);
    overflow: hidden;
    background: rgba(var(--v-theme-on-surface), 0.035);
  }
  .image-card__img {
    width: 100%;
  }
  .image-card__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 24px;
    text-align: center;
    color: var(--v-grey-darken-1);
  }
  .image-card__placeholder-caption {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .image-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
  .image-card__title {
    margin: 4px 0 12px;
  }
  .image-card__body {
    margin: 0;
  }
  .image-card__caption {
    margin: 16px 0 0;
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--v-grey-darken-1);
  }

  /* sm and below: horizontal cards stack image over text like vertical ones */
  @media (max-width: 960px) {
    .image-card {
      padding: 20px 16px;
    }
    .image-card--horizontal {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .image-card--horizontal.image-card--reverse .image-card__media {
      order: 0;
    }
    .image-card__media {
      min-height: 180px;
    }
  }
</style>
