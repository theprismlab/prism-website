<template>
  <component
    :is="cardLink ? 'a' : 'div'"
    class="resource-card"
    :href="cardLink ? href : undefined"
    :target="cardLink ? '_blank' : undefined"
    :rel="cardLink ? 'noopener noreferrer' : undefined"
    :style="{ '--accent-color': color }"
  >
    <span class="resource-card__accent" />
    <div class="resource-card__body">
      <div v-if="eyebrow" class="resource-card__eyebrow">
        <v-icon v-if="eyebrowIcon" class="resource-card__eyebrow-icon" size="14">{{
          eyebrowIcon
        }}</v-icon>
        <span>{{ eyebrow }}</span>
      </div>

      <slot />

      <div v-if="$slots.links" class="resource-card__footer">
        <div class="resource-card__links">
          <slot name="links" />
        </div>
      </div>
    </div>
  </component>
</template>

<script>
  export default {
    name: 'ResourceCard',
    props: {
      // Accent color used for the left stripe, eyebrow, and links.
      color: { type: String, default: '#277ffd' },
      eyebrow: { type: String, default: '' },
      // mdi icon name, e.g. "mdi-play-circle-outline"
      eyebrowIcon: { type: String, default: '' },
      // When true, the whole card renders as an <a> pointing at `href`.
      cardLink: { type: Boolean, default: false },
      href: { type: String, default: '' },
    },
  };
</script>

<style scoped>
  .resource-card {
    position: relative;
    display: flex;
    align-items: stretch;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    overflow: hidden;
    padding: 1.1rem 1.75rem 1.1rem 2rem;
    box-shadow:
      0 1px 2px rgba(20, 30, 60, 0.06),
      0 3px 8px rgba(20, 30, 60, 0.07);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
    border-color: color-mix(in srgb, var(--accent-color, #277ffd) 10%, transparent);
    text-decoration: none;
    color: inherit;
  }

  .resource-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #277ffd) 40%, transparent);
    box-shadow:
      0 2px 4px rgba(20, 30, 60, 0.07),
      0 10px 24px rgba(20, 30, 60, 0.11);
  }

  .resource-card__accent {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background-color: var(--accent-color, #277ffd);
  }

  .resource-card__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .resource-card__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-color, #277ffd);
    margin-bottom: 0.1rem;
  }

  .resource-card__eyebrow-icon {
    color: var(--accent-color, #277ffd);
  }

  .resource-card__footer {
    margin-top: 0.4rem;
  }

  .resource-card__links {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
  }

  /* Slotted link content (from the parent) is styled here via :deep()
     so consumers just add these class names to their own <a> tags. */
  :deep(.resource-card__link) {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.825rem;
    font-weight: 600;
    color: var(--accent-color, #277ffd);
    transition: opacity 150ms ease;
  }

  .resource-card:hover :deep(.resource-card__link) {
    opacity: 0.75;
  }

  :deep(.resource-card__link-icon) {
    transition: transform 150ms ease;
    color: var(--accent-color, #277ffd);
  }

  .resource-card:hover :deep(.resource-card__link-icon) {
    transform: translate(1px, -1px);
  }
</style>
