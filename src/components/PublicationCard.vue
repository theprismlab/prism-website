<template>
  <!-- Featured layout: icon + type pill in header, title below -->
  <v-card v-if="featured" class="featured-card h-100" variant="flat">
    <div class="featured-card__content">
      <div class="featured-card__body">
        <div class="featured-card__header">
          <div class="featured-card__icon" :style="{ backgroundColor: typeStyle.bg }">
            <v-icon size="20" :color="typeStyle.fg">{{ typeStyle.icon }}</v-icon>
          </div>
          <p class="featured-card__type" :style="{ color: typeStyle.bg }">{{ item.type }}</p>
        </div>
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
  <v-card v-else class="publication-card mb-3" variant="flat">
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
    },
  };
</script>

<style scoped>
  /* Featured layout */
  .featured-card {
    border: 1px solid rgba(63, 81, 181, 0.14);
    border-radius: 14px;
    box-shadow: 0 8px 22px rgba(20, 30, 60, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(249, 251, 255, 0.96));
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
  }
  .featured-card:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(20, 30, 60, 0.14);
  }
  .featured-card__content {
    display: block;
    padding: 1rem;
  }
  .featured-card__header {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-bottom: 0.55rem;
  }
  .featured-card__icon {
    min-width: 36px;
    min-height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  .featured-card__body {
    flex: 1;
    min-width: 0;
  }
  .featured-card__type {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
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
    margin-top: 0.7rem;
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

  /* Compact list layout */
  .publication-card {
    border-radius: 12px;
    border: 0.2px solid rgba(0, 0, 0, 0.16);
    overflow: hidden;
  }
  .publication-card__content {
    display: flex;
    align-items: stretch;
    gap: 0;
  }
  .publication-card__icon {
    align-self: stretch;
    min-width: 0px;
    padding: 1rem;
    display: grid;
    place-items: center;
    border-radius: 0;
    flex-shrink: 0;
  }
  .publication-card__details {
    flex: 1;
    padding: 1rem;
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
