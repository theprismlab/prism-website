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
   * Prefer `<page-section width="...">`, which renders this for you, over
   * placing an AppContainer by hand inside a section.
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
  .app-container {
    box-sizing: border-box;
    width: 66.667%;
    margin-inline: auto;
    /* The old grid contributed 16px of vertical padding per container.
       Kept so vertical rhythm is unchanged by the DOM simplification. */
    padding: 16px;
  }

  .app-container--wide {
    width: 83.333%;
  }

  .app-container--narrow {
    max-width: 780px;
  }

  /* md */
  @media (max-width: 1279.98px) {
    .app-container {
      width: 76.667%;
    }
    .app-container--wide {
      width: 92%;
    }
  }

  /* sm */
  @media (max-width: 959.98px) {
    .app-container,
    .app-container--wide {
      width: 92%;
    }
  }

  /* xs */
  @media (max-width: 599.98px) {
    .app-container,
    .app-container--wide {
      width: 96%;
    }
  }
</style>
