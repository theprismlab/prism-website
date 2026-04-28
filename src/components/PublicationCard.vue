<template>
  <v-card
    class="pub-card-minimal"
    :class="[featured ? 'pub-card-minimal--featured h-100' : 'mb-3']"
    variant="flat"
    elevation="0"
    :style="{ '--type-color': typeStyle.bg }"
  >
    <!-- Thin colored accent stripe on the left -->
    <span class="pub-card-minimal__accent" :style="{ backgroundColor: typeStyle.bg }" />

    <div class="pub-card-minimal__body">
      <div v-if="featured" class="pub-card-minimal__eyebrow">
        <v-icon
          class="pub-card-minimal__eyebrow-icon"
          :color="typeStyle.bg"
          size="18"
          :title="item.type"
          :aria-label="item.type"
        >
          {{ typeStyle.icon }}
        </v-icon>
        <span class="pub-card-minimal__eyebrow-label">{{ item.type }}</span>
      </div>

      <h3 v-if="featured" class="pub-card-minimal__title">{{ item.title }}</h3>

      <div v-else>
        <h3 class="pub-card-minimal__title">
          <v-icon
            class="pub-card-minimal__title-icon"
            :color="typeStyle.bg"
            size="16"
            :title="item.type"
            :aria-label="item.type"
          >
            {{ typeStyle.icon }}
          </v-icon>
          <span class="ml-1">{{ item.title }}</span>
        </h3>
      </div>

      <div v-if="item.author || item.publisher" class="pub-card-minimal__meta">
        <span v-if="item.author">{{ item.author }}, et al., </span>
        <span v-if="item.publisher"
          ><i>{{ item.publisher }}, </i></span
        >
        <span v-if="item.date || item.year">
          {{ item.date || item.year }}
        </span>
      </div>

      <div v-if="links.length || item.date || item.year" class="pub-card-minimal__footer">
        <div v-if="links.length" class="pub-card-minimal__links">
          <a
            v-for="link in links"
            :key="link.field"
            class="pub-card-minimal__link"
            :href="link.href"
            target="_blank"
          >
            {{ link.label }}
            <v-icon size="14" class="pub-card-minimal__link-icon">mdi-arrow-top-right</v-icon>
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
  /* ---------- Shared base ---------- */
  .pub-card-minimal {
    position: relative;
    display: flex;
    align-items: stretch;
    gap: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    padding: 1rem 1.15rem 1rem 1.5rem;
    box-shadow:
      0 1px 2px rgba(20, 30, 60, 0.06),
      0 3px 8px rgba(20, 30, 60, 0.07);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
    border-color: color-mix(in srgb, var(--type-color, #000) 10%, transparent);
  }

  .pub-card-minimal:hover {
    border-color: color-mix(in srgb, var(--type-color, #000) 45%, transparent);
    box-shadow:
      0 2px 4px rgba(20, 30, 60, 0.07),
      0 10px 24px rgba(20, 30, 60, 0.11);
  }

  /* Thin colored accent stripe on the left edge */
  .pub-card-minimal__accent {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 10px;
    opacity: 0.28;
  }

  /* ---------- Type icon tile ---------- */
  .pub-card-minimal__type-tile {
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    /* border-radius: 8px; */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ---------- Body ---------- */
  .pub-card-minimal__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .pub-card-minimal__title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.35;
    font-weight: 600;
    color: rgb(23, 23, 23);
    letter-spacing: -0.005em;
  }

  .pub-card-minimal__meta {
    font-size: 0.85rem;
    color: rgb(120, 126, 140);
    line-height: 1.4;
  }

  /* ---------- Footer: links + date ---------- */
  .pub-card-minimal__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 0.25rem;
  }

  .pub-card-minimal__links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  .pub-card-minimal__link {
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

  .pub-card-minimal__link:hover {
    opacity: 0.8;
  }

  .pub-card-minimal__link-icon {
    transition: transform 150ms ease;
  }

  .pub-card-minimal__link:hover .pub-card-minimal__link-icon {
    transform: translate(1px, -1px);
  }

  .pub-card-minimal__date {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgb(140, 146, 158);
    white-space: nowrap;
    margin-left: auto;
  }

  /* ---------- Featured-only ---------- */
  .pub-card-minimal--featured {
    padding: 1.25rem 1.35rem 1.25rem 1.7rem;
    gap: 1.15rem;
  }

  .pub-card-minimal--featured .pub-card-minimal__type-tile {
    width: 44px;
    height: 44px;
    border-radius: 9px;
  }

  /* .pub-card-minimal--featured .pub-card-minimal__title {
    font-size: 1.18rem;
    line-height: 1.3;
    gap: 0.55rem;
  } */

  .pub-card-minimal--featured .pub-card-minimal__body {
    gap: 0.55rem;
  }

  .pub-card-minimal--featured .pub-card-minimal__eyebrow {
    font-size: 0.82rem;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }

  /* ---------- Featured eyebrow (type label above title) ---------- */
  .pub-card-minimal__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    line-height: 1;
    margin-bottom: 0.15rem;
    /* slightly muted version of the type color so it doesn't shout */
    color: color-mix(in srgb, var(--type-color, #000) 98%, rgb(60, 65, 80));
  }

  .pub-card-minimal__eyebrow-icon {
    flex-shrink: 0;
  }

  .pub-card-minimal__eyebrow-label {
    /* subtle separator beneath the label for editorial feel */
    padding-bottom: 1px;
  }
</style>
