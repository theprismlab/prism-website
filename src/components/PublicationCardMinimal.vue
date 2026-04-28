<template>
  <v-card
    class="pub-card-minimal"
    :class="[featured ? 'pub-card-minimal--featured h-100' : 'mb-3']"
    variant="flat"
    elevation="0"
  >
    <div class="pub-card-minimal__body">
      <!-- Header row: prominent type badge + subtle date -->
      <div class="pub-card-minimal__header">
        <span
          class="pub-card-minimal__badge"
          :style="{
            color: typeStyle.bg,
            backgroundColor: typeStyle.bgSoft || `${typeStyle.bg}14`,
          }"
        >
          <v-icon size="14" class="pub-card-minimal__badge-icon">
            {{ typeStyle.icon }}
          </v-icon>
          {{ item.type }}
        </span>
        <span v-if="item.date || item.year" class="pub-card-minimal__date">
          {{ item.date || item.year }}
        </span>
      </div>

      <h3 class="pub-card-minimal__title">{{ item.title }}</h3>

      <div v-if="item.author || item.publisher" class="pub-card-minimal__meta">
        <span v-if="item.author">{{ item.author }}, et al.</span>
        <span v-if="item.author && item.publisher"> · </span>
        <i v-if="item.publisher">{{ item.publisher }}</i>
      </div>

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
  </v-card>
</template>

<script>
  export default {
    name: 'PublicationCardMinimal',
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
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
  }

  .pub-card-minimal:hover {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 4px 14px rgba(20, 30, 60, 0.05);
  }

  .pub-card-minimal__body {
    padding: 1rem 1.15rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
  }

  /* ---------- Header: type badge + date ---------- */
  .pub-card-minimal__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .pub-card-minimal__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.55rem;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1;
    white-space: nowrap;
  }

  .pub-card-minimal__badge-icon {
    flex-shrink: 0;
  }

  .pub-card-minimal__date {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgb(140, 146, 158);
    white-space: nowrap;
  }

  /* ---------- Title & meta ---------- */
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

  /* ---------- Links ---------- */
  .pub-card-minimal__links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-top: auto;
    padding-top: 0.25rem;
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

  /* ---------- Featured-only ---------- */
  .pub-card-minimal--featured .pub-card-minimal__title {
    font-size: 1.18rem;
    line-height: 1.3;
  }

  .pub-card-minimal--featured .pub-card-minimal__body {
    padding: 1.25rem 1.35rem;
    gap: 0.65rem;
  }

  .pub-card-minimal--featured .pub-card-minimal__badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.65rem;
  }
</style>
