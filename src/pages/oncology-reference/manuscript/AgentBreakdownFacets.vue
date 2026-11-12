<template>
  <div class="breakdown-facets">
    <section
      v-for="facet in facets"
      :key="facet.field"
      class="breakdown-facets__facet"
      role="group"
      :aria-label="`Filter by ${facet.title}`"
    >
      <div class="breakdown-facets__head">
        <h4 class="breakdown-facets__title">{{ facet.title }}</h4>
        <button
          v-if="facet.selectedCount"
          type="button"
          class="breakdown-facets__clear"
          @click="$emit('clear', facet.field)"
        >
          Clear
        </button>
      </div>

      <!-- One toggle per value: label, a bar of its total with the current
           subset filled in, and the subset count -->
      <button
        v-for="item in facet.values"
        :key="item.value"
        type="button"
        :class="[
          'breakdown-facets__row',
          {
            'breakdown-facets__row--selected': item.selected,
            'breakdown-facets__row--unselected': facet.selectedCount && !item.selected,
          },
        ]"
        :aria-pressed="item.selected"
        :disabled="item.disabled"
        :title="`${item.label}: ${item.count} of ${item.total} ${unit}`"
        @click="$emit('toggle', { field: facet.field, value: item.value })"
        @mouseenter="$emit('hover', { field: facet.field, value: item.value })"
        @mouseleave="$emit('hover', null)"
        @focus="$emit('hover', { field: facet.field, value: item.value })"
        @blur="$emit('hover', null)"
      >
        <v-icon
          size="16"
          class="breakdown-facets__check"
          :icon="item.selected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
        />
        <span class="breakdown-facets__label">{{ item.label }}</span>
        <span class="breakdown-facets__bar" aria-hidden="true">
          <span class="breakdown-facets__track" :style="{ width: percent(item.total, facet.max) }">
            <span
              class="breakdown-facets__fill"
              :style="{ width: percent(item.count, item.total) }"
            ></span>
          </span>
        </span>
        <span class="breakdown-facets__count">{{ item.count }}</span>
      </button>
    </section>
  </div>
</template>

<script>
  /**
   * The filter charts of the test agent breakdown explorer: one ranked bar list
   * per metadata field, where every bar is a toggle. Each bar's grey track is
   * the value's total across the library, on a scale shared within the field;
   * the filled part is how many of those are in the current subset.
   *
   * Presentational: `facets` comes from facetCounts() in breakdown.js, and the
   * parent owns the selection.
   *
   *   @toggle  `{ field, value }` when a bar is clicked
   *   @clear   `field` when a field's Clear is clicked
   *   @hover   `{ field, value }` while a bar is hovered or focused, else null
   */
  export default {
    name: 'AgentBreakdownFacets',
    props: {
      // [{ field, title, max, selectedCount, values: [{ value, label, total,
      // count, selected, disabled }] }], see facetCounts() in breakdown.js
      facets: { type: Array, required: true },
      // Noun for the counts in each bar's title
      unit: { type: String, default: 'records' },
    },
    emits: ['toggle', 'clear', 'hover'],
    methods: {
      percent(part, whole) {
        return whole ? `${(100 * part) / whole}%` : '0%';
      },
    },
  };
</script>

<style scoped>
  /* Fields flow into as many columns as fit, balanced by the browser */
  .breakdown-facets {
    columns: 3 280px;
    column-gap: 32px;
    padding: 16px 16px 0;
  }

  .breakdown-facets__facet {
    break-inside: avoid;
    padding-bottom: 16px;
  }

  .breakdown-facets__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    min-height: 24px;
    padding: 0 6px;
  }

  .breakdown-facets__title {
    margin: 0;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
  }

  .breakdown-facets__clear {
    padding: 0 2px;
    border: 0;
    border-radius: 3px;
    background: none;
    font: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    color: rgb(var(--v-theme-primary));
    cursor: pointer;
  }

  .breakdown-facets__clear:hover {
    text-decoration: underline;
  }

  /* ── Value toggle ─────────────────────────────────────────────────── */
  .breakdown-facets__row {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr) minmax(48px, 34%) 3ch;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 3px 6px;
    border: 0;
    border-radius: 4px;
    background: none;
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.25;
    color: rgba(0, 0, 0, 0.82);
    text-align: left;
    cursor: pointer;
  }

  .breakdown-facets__row:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.045);
  }

  .breakdown-facets__row:focus-visible,
  .breakdown-facets__clear:focus-visible {
    outline: 2px solid rgba(var(--v-theme-primary), 0.6);
    outline-offset: 1px;
  }

  /* A value with nothing left in the subset: selecting it would empty the matrix */
  .breakdown-facets__row:disabled {
    color: rgba(0, 0, 0, 0.38);
    cursor: default;
  }

  .breakdown-facets__check {
    color: rgba(0, 0, 0, 0.38);
  }

  .breakdown-facets__row--selected .breakdown-facets__check {
    color: rgb(var(--v-theme-primary));
  }

  .breakdown-facets__row--selected .breakdown-facets__label {
    font-weight: 600;
  }

  .breakdown-facets__label {
    overflow-wrap: anywhere;
  }

  .breakdown-facets__bar {
    display: block;
    height: 10px;
  }

  .breakdown-facets__track {
    display: block;
    height: 100%;
    min-width: 2px;
    overflow: hidden;
    border-radius: 0 3px 3px 0;
    background: rgba(0, 0, 0, 0.09);
  }

  .breakdown-facets__fill {
    display: block;
    height: 100%;
    border-radius: 0 3px 3px 0;
    background: rgb(var(--v-theme-primary));
    transition: width 0.2s ease;
  }

  /* Values left out of this field's selection keep their count but step back */
  .breakdown-facets__row--unselected .breakdown-facets__fill {
    opacity: 0.35;
  }

  .breakdown-facets__count {
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: rgba(0, 0, 0, 0.6);
  }

  .breakdown-facets__row:disabled .breakdown-facets__count {
    color: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    .breakdown-facets__fill {
      transition: none;
    }
  }
</style>
