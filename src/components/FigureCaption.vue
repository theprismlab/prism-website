<template>
  <p class="figure-caption prism-text-body-medium text-medium-emphasis">
    <b v-if="$slots.title" class="figure-caption__title"><slot name="title" /></b>
    <slot />
  </p>
</template>

<script>
  /**
   * FigureCaption
   *
   * Muted caption text under a figure. The `title` slot is the bold lead
   * ("Fig.5. Synergy in ..."); the default slot is the explanatory body.
   *
   * Usage:
   *   <figure-caption>
   *     <template #title>Fig.5. Synergy in temozolomide + O6-benzylguanine.</template>
   *     Each point is a cell line, colored by ...
   *   </figure-caption>
   */
  export default {
    name: 'FigureCaption',
  };
</script>

<style scoped>
  .figure-caption {
    margin: 1rem 0 0;
  }
</style>
