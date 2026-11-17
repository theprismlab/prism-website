<template>
  <div :class="['app-container', { 'app-container--wide': wide, 'app-container--narrow': narrow }]">
    <slot />
  </div>
</template>

<script>
  /**
   * AppContainer
   *
   * A single centered column with a responsive max-width. Replaces the
   * previous v-container > v-row > v-col stack with one element.
   *
   * Width tiers (share of the page width, matching the old grid columns):
   *   - default: 8/12 on lg+, 10/12 of 92% on md, 92% on sm, 96% on xs
   *   - wide:    10/12 on lg+, 92% on md and sm, 96% on xs
   *   - narrow:  the default tier capped at 780px
   *
   * For a section of a page, prefer `<page-section width="...">`, which renders
   * this for you along with the section's padding and background.
   *
   * Use it directly where a block needs only a width, e.g. inside an article
   * that mixes a narrow text column with wider figures:
   *   <article>
   *     <section>
   *       <app-container narrow>...heading and text...</app-container>
   *       <app-container>...figure...</app-container>
   *     </section>
   *   </article>
   */
  export default {
    name: 'AppContainer',
    props: {
      wide: { type: Boolean, default: false },
      narrow: { type: Boolean, default: false },
    },
  };
</script>

<style scoped>
  /* Tier widths and their breakpoints are the --prism-container-* variables in
     src/styles/main.scss. */
  .app-container {
    box-sizing: border-box;
    width: var(--prism-container-default);
    margin-inline: auto;
    /* Horizontal gutter only. Vertical rhythm belongs to PageSection. */
    padding: 0 var(--prism-container-gutter);
  }

  .app-container--wide {
    width: var(--prism-container-wide);
  }

  .app-container--narrow {
    max-width: var(--prism-container-narrow-max);
  }
</style>
