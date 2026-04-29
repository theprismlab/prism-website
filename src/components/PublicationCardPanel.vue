<template>
  <v-card
    class="publication-card"
    :class="[featured ? 'publication-card--featured h-100' : 'mb-3']"
    variant="flat"
    elevation="0"
    :style="{ borderColor: typeStyle.bg }"
  >
    <div class="publication-card__content">
      <div class="publication-card__icon" :style="{ backgroundColor: typeStyle.bg }">
        <v-icon size="28" :color="typeStyle.fg">{{ typeStyle.icon }}</v-icon>
      </div>

      <div class="publication-card__body">
        <p v-if="featured" class="publication-card__type" :style="{ color: typeStyle.bg }">
          {{ item.type }}
        </p>
        <h3 class="publication-card__title">{{ item.title }}</h3>
        <div class="publication-card__meta">
          <span v-if="item.author">{{ item.author }}, et al. </span>
          <span v-if="item.publisher"
            ><i>{{ item.publisher }}</i
            >,
          </span>
          <span>{{ item.date || item.year }}</span
          >.
        </div>
        <div v-if="links.length" class="publication-card__links">
          <a
            v-for="link in links"
            :key="link.field"
            class="publication-card__link"
            :href="link.href"
            target="_blank"
          >
            {{ link.label }}
            <v-icon size="14" class="publication-card__link-icon">mdi-arrow-top-right</v-icon>
          </a>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'PublicationCardPanel',
    props: {
      item: { type: Object, required: true },
      typeStyle: { type: Object, required: true },
      links: { type: Array, default: () => [] },
      featured: { type: Boolean, default: false },
    },
  };
</script>

<style scoped>
  /* ---------- Shared base ---------- */
  .publication-card {
    --my-title: 0.5rem;
    border: 0.2px solid rgba(0, 0, 0, 0.16);
    border-radius: 12px;
    overflow: hidden;
  }

  .publication-card__content {
    display: flex;
    align-items: stretch;
    gap: 0;
  }

  .publication-card__icon {
    display: grid;
    place-items: center;
    align-self: stretch;
    flex-shrink: 0;
    min-width: 0;
    padding: 0.75rem;
  }

  .publication-card__body {
    flex: 1;
    min-width: 0;
    padding: 1rem;
  }

  .publication-card__title {
    margin: var(--my-title) 0;
    font-size: 1rem;
    line-height: 1.35;
    font-weight: 600;
    color: rgb(23, 23, 23);
    text-decoration: none;
  }

  .publication-card__meta {
    font-size: 0.875rem;
    color: rgb(99, 107, 123);
  }

  .publication-card__links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: 0.75rem;
  }

  .publication-card__link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.825rem;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    transition: opacity 150ms ease;
  }

  .publication-card__link:hover {
    opacity: 0.8;
  }

  .publication-card__link-icon {
    transition: transform 150ms ease;
  }

  .publication-card__link:hover .publication-card__link-icon {
    transform: translate(1px, -1px);
  }

  /* ---------- Featured-only overrides ---------- */
  .publication-card--featured {
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
  }

  .publication-card--featured:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(20, 30, 60, 0.14);
  }

  /* Card fills row height; body stretches to push links to bottom */
  .publication-card--featured .publication-card__content {
    height: 100%;
  }

  .publication-card--featured .publication-card__body {
    display: flex;
    flex-direction: column;
  }

  /* Type label (only rendered when featured) */
  .publication-card__type {
    margin: 0 0 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    font-size: 0.8rem;
    font-weight: 700;
    line-height: 1;
  }

  /* Larger title for featured */
  .publication-card--featured .publication-card__title {
    font-size: 1.15rem;
  }

  /* Push links to bottom of card */
  .publication-card--featured .publication-card__links {
    margin-top: auto;
    padding-top: 0.7rem;
    justify-content: space-between;
  }
</style>
