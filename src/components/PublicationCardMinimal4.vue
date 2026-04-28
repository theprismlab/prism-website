<template>
  <!-- Option 1: Type icon inline with the title -->
  <v-card
    class="pub-card-minimal"
    :class="[featured ? 'pub-card-minimal--featured h-100' : 'mb-3']"
    variant="flat"
    elevation="0"
  >
    <div class="pub-card-minimal__body">
      <h3 class="pub-card-minimal__title">
        <v-icon
          class="pub-card-minimal__title-icon"
          :color="typeStyle.bg"
          :size="featured ? 22 : 18"
          :title="item.type"
          :aria-label="item.type"
        >
          {{ typeStyle.icon }}
        </v-icon>
        <span>{{ item.title }}</span>
      </h3>

      <div v-if="item.author || item.publisher" class="pub-card-minimal__meta">
        <span v-if="item.author">{{ item.author }}, et al.</span>
        <span v-if="item.author && item.publisher"> · </span>
        <i v-if="item.publisher">{{ item.publisher }}</i>
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
        <span v-if="item.date || item.year" class="pub-card-minimal__date">
          {{ item.date || item.year }}
        </span>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'PublicationCardMinimal4',
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: #fff;
    overflow: hidden;
    padding: 1rem 1.15rem;
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
  }

  .pub-card-minimal:hover {
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 4px 14px rgba(20, 30, 60, 0.05);
  }

  .pub-card-minimal__body {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    height: 100%;
  }

  /* ---------- Title with leading type icon ---------- */
  .pub-card-minimal__title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.35;
    font-weight: 600;
    color: rgb(23, 23, 23);
    letter-spacing: -0.005em;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .pub-card-minimal__title-icon {
    flex-shrink: 0;
    /* nudge icon to optically align with text baseline */
    transform: translateY(3px);
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
    padding: 1.25rem 1.35rem;
  }

  .pub-card-minimal--featured .pub-card-minimal__title {
    font-size: 1.18rem;
    line-height: 1.3;
    gap: 0.6rem;
  }

  .pub-card-minimal--featured .pub-card-minimal__body {
    gap: 0.55rem;
  }
</style>
