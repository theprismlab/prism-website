<template>
  <dl class="term-list my-6" :class="{ 'term-list--shaded': shaded }">
    <slot />
  </dl>
</template>

<script>
  /**
   * TermList
   *
   * A definition list of <term-item>s. Pass `shaded` for the grey box.
   *
   * Usage:
   *   <term-list shaded>
   *     <term-item>
   *       <template #name>Linker</template>
   *       <template #definition>Can be cleavable or non-cleavable ...</template>
   *     </term-item>
   *   </term-list>
   */
  export default {
    name: 'TermList',
    props: {
      // Grey background with inset padding; off by default
      shaded: { type: Boolean, default: false },
    },
  };
</script>

<style scoped>
  .term-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 1rem 0 1rem;
  }
  .term-list--shaded {
    padding: 16px 24px 24px;
    background: rgba(var(--v-theme-on-surface), 0.025);
    border-radius: var(--prism-radius-md);
  }
</style>
