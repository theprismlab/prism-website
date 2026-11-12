<template>
  <div class="term-item">
    <dt class="prism-text-title-small">
      <slot name="name" />
    </dt>
    <dd class="term-item__definition prism-text-body-medium">
      <slot name="definition" />
    </dd>
  </div>
</template>

<script>
  /**
   * TermItem
   *
   * One name/definition pair inside a <term-list>. The list owns the box
   * styling; this component only owns the <dt>/<dd> markup and typography.
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
    name: 'TermItem',
  };
</script>

<style scoped>
  .term-item__definition {
    margin: 0.33em 0 0;
    color: rgba(var(--v-theme-on-surface), 0.77);
  }
</style>
