<template>
  <v-expansion-panels class="prism-expansion-panels" elevation="0">
    <slot />
  </v-expansion-panels>
</template>

<script>
  /**
   * PrismExpansionPanels
   *
   * Styled wrapper around <v-expansion-panels>. Carries the bordered,
   * flat "stepper accordion" look used by the submission forms so the
   * same styling can be reused anywhere without copying CSS.
   *
   * The template is intentionally blank: put your own <v-expansion-panel>
   * items in the default slot. All attrs (v-model, multiple, variant, ...)
   * fall through to the underlying <v-expansion-panels>.
   *
   * Optional class hooks the styles understand:
   *   .is-completed   on <v-expansion-panel> and/or <v-expansion-panel-title>
   *                   → teal border, muted title text
   *   disabled        on <v-expansion-panel>
   *                   → "locked" look: no hover, muted text, not-allowed cursor
   *   .step-number    icon shown before the title (numbered circle)
   *   .step-icon      icon shown before the title (completed check)
   *   .step-lock      trailing lock icon for disabled panels
   *
   * Usage:
   *   <prism-expansion-panels v-model="open">
   *     <v-expansion-panel
   *       v-for="(item, i) in items"
   *       :key="item.id"
   *       :value="i"
   *       :disabled="item.locked"
   *       :class="{ 'is-completed': item.done }"
   *     >
   *       <v-expansion-panel-title :class="{ 'is-completed': item.done }">
   *         <v-icon v-if="item.done" class="step-icon mr-2" color="teal-accent-4" size="26">
   *           mdi-check-circle
   *         </v-icon>
   *         <v-icon v-else class="step-number mr-2" size="26" :icon="`mdi-numeric-${i + 1}-circle-outline`" />
   *         <span>{{ item.title }}</span>
   *         <v-icon v-if="item.locked" class="step-lock ml-auto" size="20" icon="mdi-lock-outline" />
   *       </v-expansion-panel-title>
   *       <v-expansion-panel-text>
   *         ...
   *       </v-expansion-panel-text>
   *     </v-expansion-panel>
   *   </prism-expansion-panels>
   */
  export default {
    name: 'PrismExpansionPanels',
  };
</script>

<style scoped>
  /*
   * Slot content is rendered by the parent, so it does not receive this
   * component's scope id. Every rule is therefore anchored on the root
   * class and reaches into the panels with :deep().
   */

  /* ── Panel frame ──────────────────────────────────────────── */
  .prism-expansion-panels :deep(.v-expansion-panel) {
    margin-top: -1px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    box-shadow: none !important;
  }
  .prism-expansion-panels :deep(.v-expansion-panel:not(:first-child)::after) {
    display: none;
  }
  .prism-expansion-panels :deep(.v-expansion-panel--active:not(.is-completed)) {
    border-color: var(--prism-color-primary);
    margin-bottom: 1px;
  }
  .prism-expansion-panels :deep(.v-expansion-panel.is-completed.v-expansion-panel--active) {
    border-color: rgba(var(--v-theme-teal-accent-4), 0.4);
  }

  /* ── Title typography ─────────────────────────────────────── */
  .prism-expansion-panels :deep(.v-expansion-panel-title) {
    font-size: 0.925rem;
    font-weight: var(--prism-font-weight-semibold);
    letter-spacing: 0.01em;
  }
  .prism-expansion-panels :deep(.v-expansion-panel-title span) {
    color: var(--prism-color-text) !important;
  }
  .prism-expansion-panels :deep(.v-expansion-panel-title.is-completed span),
  .prism-expansion-panels :deep(.v-expansion-panel.is-completed .v-expansion-panel-title span) {
    color: rgba(var(--v-theme-on-surface), 0.45) !important;
  }
  .prism-expansion-panels :deep(.v-expansion-panel-title--active) {
    background-color: rgba(var(--v-theme-on-surface), 0.02);
  }

  /* ── Step indicators ──────────────────────────────────────── */
  .prism-expansion-panels :deep(.step-number) {
    flex-shrink: 0;
    color: rgba(var(--v-theme-on-surface), 0.35);
  }
  .prism-expansion-panels :deep(.step-icon) {
    flex-shrink: 0;
  }
  .prism-expansion-panels :deep(.v-expansion-panel-title--active .step-number) {
    color: var(--prism-color-primary);
  }
  .prism-expansion-panels :deep(.step-lock) {
    flex-shrink: 0;
    color: rgba(var(--v-theme-on-surface), 0.3);
  }

  /* ── Locked (disabled) panels ─────────────────────────────── */
  .prism-expansion-panels :deep(.v-expansion-panel--disabled) {
    background-color: rgb(var(--v-theme-surface));
    border-color: rgba(var(--v-theme-on-surface), 0.08);
  }
  .prism-expansion-panels :deep(.v-expansion-panel--disabled .v-expansion-panel-title__overlay) {
    opacity: 0 !important;
  }
  .prism-expansion-panels :deep(.v-expansion-panel--disabled .v-expansion-panel-title) {
    cursor: not-allowed;
  }
  .prism-expansion-panels :deep(.v-expansion-panel--disabled .step-number) {
    color: rgba(var(--v-theme-on-surface), 0.22);
  }
  .prism-expansion-panels :deep(.v-expansion-panel--disabled .v-expansion-panel-title span) {
    color: rgba(var(--v-theme-on-surface), 0.4) !important;
  }
  .prism-expansion-panels :deep(.v-expansion-panel--disabled .v-expansion-panel-title__icon) {
    margin-inline-start: 0;
  }
</style>
