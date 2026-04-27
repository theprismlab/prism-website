<template>
  <!-- Featured layout -->
  <v-card
    v-if="featured"
    class="featured-card h-100"
    :class="[`featured-card--icon-${iconVariant}`]"
    variant="flat"
    elevation="0"
    :style="iconVariant === 'panel' ? { borderColor: typeStyle.bg } : null"
  >
    <div class="featured-card__content">
      <!-- Panel variant: full-height left color block -->
      <div
        v-if="iconVariant === 'panel'"
        class="featured-card__icon"
        :style="{ backgroundColor: typeStyle.bg }"
      >
        <v-icon size="28" :color="typeStyle.fg">{{ typeStyle.icon }}</v-icon>
      </div>

      <div class="featured-card__body">
        <!-- Badge variant: icon + type pill in header row -->
        <div v-if="iconVariant === 'badge'" class="featured-card__header">
          <div class="featured-card__icon" :style="{ backgroundColor: typeStyle.bg }">
            <v-icon size="20" :color="typeStyle.fg">{{ typeStyle.icon }}</v-icon>
          </div>
          <p class="featured-card__type" :style="{ color: typeStyle.bg }">{{ item.type }}</p>
        </div>

        <!-- Panel variant: type pill above title in the body -->
        <p
          v-else
          class="featured-card__type featured-card__type--standalone"
          :style="{ color: typeStyle.bg }"
        >
          {{ item.type }}
        </p>

        <h3 class="featured-card__title">{{ item.title }}</h3>
        <div class="featured-card__meta">
          <span v-if="item.author">{{ item.author }}, et al. </span>
          <span v-if="item.publisher"
            ><i>{{ item.publisher }}</i
            >,
          </span>
          <span>{{ item.date || item.year }}</span
          >.
        </div>
        <div class="featured-card__links">
          <a
            v-for="link in links"
            :key="link.field"
            class="featured-card-link"
            :href="link.href"
            target="_blank"
          >
            <v-icon v-if="link.icon" left size="small">{{ link.icon }}</v-icon>
            {{ link.label }}
            <v-icon right size="x-small" class="featured-card-link-icon">mdi-arrow-right</v-icon>
          </a>
        </div>
      </div>
    </div>
  </v-card>

  <!-- Compact list layout: icon to the left of details -->
  <v-card
    v-else
    class="publication-card mb-3"
    :class="[`publication-card--icon-${iconVariant}`]"
    variant="flat"
    :style="iconVariant === 'panel' ? { borderColor: typeStyle.bg } : null"
  >
    <div class="publication-card__content">
      <div class="publication-card__icon" :style="{ backgroundColor: typeStyle.bg }">
        <v-icon size="28" :color="typeStyle.fg">{{ typeStyle.icon }}</v-icon>
      </div>
      <div class="publication-card__details">
        <span class="publication-card__title">{{ item.title }}</span>
        <div class="publication-meta">
          <span v-if="item.author">{{ item.author }}, et al. </span>
          <span v-if="item.publisher"
            ><i>{{ item.publisher }}</i
            >,
          </span>
          <span>{{ item.date || item.year }}</span
          >.
        </div>
        <div class="publication-links">
          <a
            v-for="link in links"
            :key="link.field"
            class="publication-link"
            :href="link.href"
            target="_blank"
          >
            <v-icon v-if="link.icon" left>{{ link.icon }}</v-icon>
            {{ link.label }}
            <v-icon right size="x-small" class="publication-card__external-icon"
              >mdi-arrow-right</v-icon
            >
          </a>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'PublicationCard',
    props: {
      item: { type: Object, required: true },
      typeStyle: { type: Object, required: true },
      links: { type: Array, default: () => [] },
      featured: { type: Boolean, default: false },
      iconVariant: {
        type: String,
        default: 'panel',
        validator: (v) => ['panel', 'badge'].includes(v),
      },
    },
  };
</script>

<style scoped>
  /* Featured layout — shared */
  .featured-card {
    border: 1px solid rgba(63, 81, 181, 0.14);
    border-radius: 14px;
    box-shadow: 0 8px 22px rgba(20, 30, 60, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 251, 255, 0.96));
    overflow: hidden;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
  }
  .featured-card:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(20, 30, 60, 0.14);
  }
  .featured-card__icon {
    display: grid;
    place-items: center;
  }
  .featured-card__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .featured-card__type {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
  }
  .featured-card__title {
    margin: 0;
    font-size: 1.02rem;
    line-height: 1.35;
    color: rgb(20, 24, 34);
    font-weight: 700;
  }
  .featured-card__meta {
    margin-top: 0.4rem;
    font-size: 0.84rem;
    color: rgb(99, 107, 123);
  }
  .featured-card__links {
    margin-top: auto;
    padding-top: 0.7rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .featured-card-link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.84rem;
    font-weight: 600;
    text-decoration: none;
  }
  .featured-card-link:hover {
    opacity: 0.85;
  }

  /* Variant: badge — icon + type pill in header row, content padded inside card */
  .featured-card--icon-badge .featured-card__content {
    display: block;
    padding: 1rem;
    height: 100%;
  }
  .featured-card--icon-badge .featured-card__header {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-bottom: 0.55rem;
  }
  .featured-card--icon-badge .featured-card__icon {
    min-width: 36px;
    min-height: 36px;
    border-radius: 10px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  .featured-card--icon-badge .featured-card__type {
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
  }

  /* Variant: panel — solid color fills full-height left side, flush to card edges */
  .featured-card--icon-panel .featured-card__content {
    display: flex;
    align-items: stretch;
    gap: 0;
    height: 100%;
  }
  .featured-card--icon-panel .featured-card__icon {
    align-self: stretch;
    min-width: 0;
    padding: 1rem;
    flex-shrink: 0;
  }
  .featured-card--icon-panel .featured-card__body {
    padding: 1rem;
  }
  .featured-card--icon-panel .featured-card__type--standalone {
    margin-bottom: 0.4rem;
  }

  /* Compact list layout */
  .publication-card {
    border-radius: 12px;
    border: 0.2px solid rgba(0, 0, 0, 0.16);
    overflow: hidden;
  }
  .publication-card__content {
    display: flex;
  }
  .publication-card__icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .publication-card__details {
    flex: 1;
  }

  /* Variant: panel — solid color fills full-height left side, flush to card edges */
  .publication-card--icon-panel .publication-card__content {
    align-items: stretch;
    gap: 0;
  }
  .publication-card--icon-panel .publication-card__icon {
    align-self: stretch;
    min-width: 0px;
    padding: 1rem;
    border-radius: 0;
  }
  .publication-card--icon-panel .publication-card__details {
    padding: 1rem;
  }

  /* Variant: badge — small rounded icon tile inside padded card (original style) */
  .publication-card--icon-badge {
    padding: 1rem;
  }
  .publication-card--icon-badge .publication-card__content {
    align-items: flex-start;
    gap: 1rem;
  }
  .publication-card--icon-badge .publication-card__icon {
    min-width: 56px;
    min-height: 56px;
    border-radius: 16px;
  }
  .publication-card__title {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: rgb(23, 23, 23);
    text-decoration: none;
  }
  .publication-card__title:hover {
    opacity: 0.88;
  }
  .publication-card__external-icon {
    margin-left: 0.25rem;
  }
  .publication-meta {
    font-size: 0.875rem;
    color: rgb(135, 135, 135);
    margin-top: 4px;
  }
  .publication-links {
    margin-top: 0.75rem;
    display: flex;
    gap: 2.5rem;
  }
  .publication-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--v-primary-base);
    text-decoration: none;
  }
</style>
