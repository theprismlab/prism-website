<template>
  <div class="breakdown-matrix">
    <!-- Color legend: every entry toggles its value in the selection -->
    <div
      class="breakdown-matrix__legend"
      role="group"
      :aria-label="`Colored by ${axis.color.title}. Select a value to focus on it.`"
    >
      <span class="breakdown-matrix__legend-title">{{ axis.color.title }}</span>
      <button
        v-for="item in legend"
        :key="item.value"
        type="button"
        :class="[
          'breakdown-matrix__legend-item',
          { 'breakdown-matrix__legend-item--off': item.off },
        ]"
        :aria-pressed="item.selected"
        @click="$emit('toggle', { field: axis.color.field, value: item.value })"
        v-on="hoverOn(axis.color.field, item.value)"
      >
        <span class="breakdown-matrix__swatch" :style="{ background: item.color }"></span>
        {{ item.label }}
      </button>
      <span v-if="hasUnmatched" class="breakdown-matrix__legend-note">
        <span class="breakdown-matrix__swatch breakdown-matrix__swatch--ghost"></span>
        Outside the selection
      </span>
    </div>

    <div class="breakdown-matrix__scroll">
      <!-- A table of unit cells laid out as a grid. Every cell is placed
           explicitly, so the layout never depends on source order. -->
      <div
        class="breakdown-matrix__grid"
        role="table"
        :aria-label="tableLabel"
        :style="gridStyle"
        @mouseover="onMouseOver"
        @mousemove="onMouseMove"
        @mouseleave="hideTooltip"
      >
        <div role="row" class="breakdown-matrix__tr">
          <div
            role="columnheader"
            aria-rowspan="2"
            class="breakdown-matrix__corner"
            style="grid-row: 1 / span 2; grid-column: 1"
          >
            <span class="breakdown-matrix__axis-title">{{ axis.y.title }}</span>
          </div>
          <div
            v-if="axis.x"
            role="columnheader"
            :aria-colspan="matrix.columns.length"
            class="breakdown-matrix__x-title"
            style="grid-row: 1; grid-column: 2 / -1"
          >
            <span class="breakdown-matrix__axis-title">{{ axis.x.title }}</span>
          </div>
        </div>

        <div role="row" class="breakdown-matrix__tr">
          <div
            v-for="(column, j) in matrix.columns"
            :key="column.value ?? 'all'"
            role="columnheader"
            class="breakdown-matrix__col-head"
            :style="{ gridRow: '2', gridColumn: String(j + 2) }"
          >
            <span class="breakdown-matrix__head-text">
              {{ axis.x ? breakable(column.label) : `All ${unit}` }}
            </span>
            <span class="breakdown-matrix__count">{{ countText(column) }}</span>
          </div>
        </div>

        <div
          v-for="(row, i) in matrix.rows"
          :key="row.value"
          role="row"
          :class="['breakdown-matrix__tr', { 'breakdown-matrix__tr--first': i === 0 }]"
        >
          <div
            role="rowheader"
            class="breakdown-matrix__row-head"
            :style="{ gridRow: String(i + 3), gridColumn: '1' }"
          >
            <span class="breakdown-matrix__head-text">{{ breakable(row.label) }}</span>
            <span class="breakdown-matrix__count">{{ countText(row) }}</span>
          </div>

          <div
            v-for="(cell, j) in row.cells"
            :key="j"
            role="cell"
            class="breakdown-matrix__cell"
            :aria-label="cellLabel(row, matrix.columns[j], cell)"
            :style="{ gridRow: String(i + 3), gridColumn: String(j + 2) }"
          >
            <!-- Squares are not clickable; hovering one shows its agent -->
            <template v-if="cell.total">
              <span
                v-for="mark in cell.units"
                :key="mark.key"
                :class="[
                  'breakdown-matrix__unit',
                  {
                    'breakdown-matrix__unit--ghost': !mark.matched,
                    'breakdown-matrix__unit--dim': isDimmed(mark.row),
                  },
                ]"
                :style="{ '--unit-color': mark.color }"
                :data-key="mark.key"
                aria-hidden="true"
              ></span>
              <span class="breakdown-matrix__cell-count" aria-hidden="true">
                {{ countText(cell) }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- On the body so no card or scroll container can clip it -->
    <Teleport to="body">
      <div v-show="hovered" ref="tooltip" class="breakdown-matrix__tooltip" role="tooltip">
        <template v-if="hovered">
          <div class="breakdown-matrix__tooltip-title">
            <span class="breakdown-matrix__swatch" :style="{ background: hovered.color }"></span>
            {{ hovered.label }}
          </div>
          <table v-if="tooltipRows.length">
            <tbody>
              <tr v-for="[label, value] in tooltipRows" :key="label">
                <th scope="row">{{ label }}</th>
                <td>{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </Teleport>
  </div>
</template>

<script>
  import { buildMatrix, colorOf, valueOf } from './breakdown.js';

  // Narrowest a data column gets before the matrix scrolls sideways, in pixels
  const MIN_COLUMN_WIDTH = 64;
  // Gap between the cursor and the tooltip, in pixels
  const TOOLTIP_OFFSET = 14;
  // Gap kept between the tooltip and the window edge, in pixels
  const TOOLTIP_MARGIN = 4;

  /**
   * A unit matrix: every record is one square, placed in the cell for its row
   * and column values and colored by a third field. The color legend is the
   * only control: clicking an entry toggles its value in the selection, and
   * hovering or focusing one dims every square outside it. Rows, columns and
   * squares are not clickable; hovering a square shows its record in a
   * tooltip. Self-contained (no chart library); the option names follow the
   * prism-charts axis vocabulary.
   *
   *   data         Records to draw, one square each.
   *   axis         `{ x, y, color }`, each `{ field, title, domain, format }`:
   *                `y` gives the rows, `x` the columns (null for a single
   *                column), `color` the square colors, with `range` as the
   *                color per `domain` entry.
   *   highlight    `(record) => boolean` or null: records failing it are drawn
   *                as hollow squares and left out of the counts.
   *   selection    `{ [field]: string[] }`: the values currently selected, so
   *                legend entries can show as pressed.
   *   unitKey      `(record) => id`, unique per record.
   *   unitLabel    `(record) => string`, the tooltip heading.
   *   tooltip      `(record) => [[label, value], …]`, the tooltip rows.
   *   unit         Noun for the counts.
   *
   *   @toggle      `{ field, value }` on a click on a legend entry.
   */
  export default {
    name: 'AgentBreakdownMatrix',
    props: {
      data: { type: Array, required: true },
      axis: { type: Object, required: true },
      highlight: { type: Function, default: null },
      selection: { type: Object, default: () => ({}) },
      unitKey: { type: Function, required: true },
      unitLabel: { type: Function, required: true },
      tooltip: { type: Function, default: null },
      unit: { type: String, default: 'records' },
    },
    emits: ['toggle'],
    data() {
      return {
        // The unit under the cursor, or null; drives the tooltip
        hovered: null,
        // `{ field, value }` of the legend entry that is hovered or
        // focused, or null; every square outside it is dimmed
        hoverValue: null,
      };
    },
    computed: {
      matrix() {
        return buildMatrix(this.data, this.axis, {
          highlight: this.highlight,
          key: this.unitKey,
          label: this.unitLabel,
        });
      },
      // Units by their `data-key` attribute, for the delegated hover handler
      unitsByKey() {
        const byKey = new Map();
        for (const row of this.matrix.rows) {
          for (const cell of row.cells) {
            for (const mark of cell.units) byKey.set(String(mark.key), mark);
          }
        }
        return byKey;
      },
      hasUnmatched() {
        return this.matrix.matched < this.matrix.total;
      },
      // One entry per value of the color field, in the scale's order. Built
      // from the scale, not the drawn records, so it holds still while filtering.
      legend() {
        const { field, domain, format } = this.axis.color;
        const selected = this.selection[field] ?? [];
        return (domain ?? []).map((value) => ({
          value,
          label: format ? format(value) : value,
          color: colorOf(this.axis.color, value),
          selected: selected.includes(value),
          off: selected.length > 0 && !selected.includes(value),
        }));
      },
      // Label column sized to its text up to a cap, then one column per value,
      // wider where a column's fullest cell holds more units
      gridStyle() {
        const columns = this.matrix.columns
          .map((column) => `minmax(${MIN_COLUMN_WIDTH}px, ${column.weight.toFixed(2)}fr)`)
          .join(' ');
        return { gridTemplateColumns: `fit-content(var(--breakdown-label-max)) ${columns}` };
      },
      tableLabel() {
        const { x, y, color } = this.axis;
        const by = x ? `${y.title} by ${x.title}` : y.title;
        return `Count of ${this.unit} by ${by}, colored by ${color.title}`;
      },
      tooltipRows() {
        return this.hovered && this.tooltip ? this.tooltip(this.hovered.row) : [];
      },
    },
    watch: {
      // The hovered unit belongs to the old layout once the matrix is rebuilt
      matrix() {
        this.hovered = null;
      },
    },
    mounted() {
      // A fixed tooltip would stay behind while the page scrolls under the cursor
      window.addEventListener('scroll', this.hideTooltip, { passive: true, capture: true });
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.hideTooltip, { capture: true });
    },
    methods: {
      // Listeners for a legend entry: while it is hovered or focused, the
      // squares outside its value are dimmed
      hoverOn(field, value) {
        const enter = () => {
          this.hoverValue = { field, value };
        };
        const leave = () => {
          this.hoverValue = null;
        };
        return { mouseenter: enter, mouseleave: leave, focus: enter, blur: leave };
      },
      isDimmed(record) {
        const target = this.hoverValue;
        return !!target && valueOf(record, target.field) !== target.value;
      },
      // "8/21" while a selection leaves some out, else the plain count
      countText({ matched, total }) {
        return matched === total ? String(total) : `${matched}/${total}`;
      },
      cellLabel(row, column, cell) {
        const where = column.label ? `${row.label}, ${column.label}` : row.label;
        const count = cell.matched === cell.total ? cell.total : `${cell.matched} of ${cell.total}`;
        return `${where}: ${count} ${this.unit}`;
      },
      // Let slash-joined names such as "inhibitor/antagonist" wrap after the slash
      breakable(label) {
        return String(label).replace(/\//g, '/​');
      },

      // ── Tooltip ────────────────────────────────────────────────────────
      onMouseOver(event) {
        const el = event.target.closest('[data-key]');
        const mark = el ? this.unitsByKey.get(el.dataset.key) : null;
        if (!mark) {
          this.hideTooltip();
          return;
        }
        this.hovered = mark;
        // Placed once the new content is rendered, so its size is known
        this.$nextTick(() => this.placeTooltip(event));
      },
      onMouseMove(event) {
        if (this.hovered) this.placeTooltip(event);
      },
      hideTooltip() {
        this.hovered = null;
      },
      // Beside the cursor, flipped to the other side where it would leave the window
      placeTooltip(event) {
        const el = this.$refs.tooltip;
        if (!el) return;
        const { clientX: x, clientY: y } = event;
        const { offsetWidth: width, offsetHeight: height } = el;
        const left =
          x + TOOLTIP_OFFSET + width > window.innerWidth
            ? x - TOOLTIP_OFFSET - width
            : x + TOOLTIP_OFFSET;
        const top =
          y + TOOLTIP_OFFSET + height > window.innerHeight
            ? y - TOOLTIP_OFFSET - height
            : y + TOOLTIP_OFFSET;
        el.style.left = `${Math.max(TOOLTIP_MARGIN, left)}px`;
        el.style.top = `${Math.max(TOOLTIP_MARGIN, top)}px`;
      },
    },
  };
</script>

<style scoped>
  .breakdown-matrix {
    /* Widest the row label column gets before its labels wrap */
    --breakdown-label-max: 220px;
    /* Side of one unit square, and the gap between squares */
    --breakdown-unit: 12px;
    --breakdown-gap: 2px;
    padding: 12px 16px 16px;
  }

  /* ── Legend ───────────────────────────────────────────────────────── */
  .breakdown-matrix__legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px 4px;
    margin-bottom: 12px;
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.82);
  }

  .breakdown-matrix__legend-title,
  .breakdown-matrix__axis-title {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
  }

  .breakdown-matrix__legend-title {
    margin-right: 6px;
  }

  .breakdown-matrix__legend-item,
  .breakdown-matrix__legend-note {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border: 1px solid transparent;
    border-radius: 999px;
  }

  .breakdown-matrix__legend-item {
    background: none;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }

  .breakdown-matrix__legend-item:hover {
    background: rgba(0, 0, 0, 0.045);
  }

  .breakdown-matrix__legend-item[aria-pressed='true'] {
    border-color: rgba(0, 0, 0, 0.32);
    background: rgba(0, 0, 0, 0.045);
    font-weight: 600;
  }

  /* A value left out of its field's selection */
  .breakdown-matrix__legend-item--off {
    color: rgba(0, 0, 0, 0.45);
  }

  .breakdown-matrix__legend-item--off .breakdown-matrix__swatch {
    opacity: 0.35;
  }

  .breakdown-matrix__legend-note {
    color: rgba(0, 0, 0, 0.6);
  }

  /* Fallback size for the tooltip's swatch, which sits outside .breakdown-matrix */
  .breakdown-matrix__swatch {
    flex: none;
    width: var(--breakdown-unit, 12px);
    height: var(--breakdown-unit, 12px);
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  }

  .breakdown-matrix__swatch--ghost {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.28);
  }

  /* ── Grid ─────────────────────────────────────────────────────────── */
  /* Scrolls sideways when the columns cannot all keep their minimum width */
  .breakdown-matrix__scroll {
    overflow-x: auto;
  }

  .breakdown-matrix__grid {
    display: grid;
    font-size: 0.8125rem;
    line-height: 1.25;
    color: rgba(0, 0, 0, 0.82);
  }

  /* Rows exist for the table semantics only; their cells sit on the grid */
  .breakdown-matrix__tr {
    display: contents;
  }

  /* The label column stays put while the data columns scroll under it */
  .breakdown-matrix__corner,
  .breakdown-matrix__row-head {
    position: sticky;
    left: 0;
    z-index: 1;
    background: #fff;
  }

  .breakdown-matrix__corner {
    display: flex;
    align-items: flex-end;
    padding: 4px 12px 8px 0;
  }

  .breakdown-matrix__x-title {
    padding: 0 8px 2px;
  }

  .breakdown-matrix__col-head {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 2px;
    min-width: 0;
    padding: 4px 8px 8px;
  }

  .breakdown-matrix__row-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 12px 6px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  /* Row and column labels wrap inside their header, mid-word if they must */
  .breakdown-matrix__head-text {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .breakdown-matrix__legend-item:focus-visible {
    outline: 2px solid rgba(var(--v-theme-primary), 0.6);
    outline-offset: 1px;
  }

  .breakdown-matrix__count,
  .breakdown-matrix__cell-count {
    font-size: 0.6875rem;
    font-variant-numeric: tabular-nums;
    color: rgba(0, 0, 0, 0.55);
    white-space: nowrap;
  }

  /* Squares wrap inside their cell, followed by the cell's count */
  .breakdown-matrix__cell {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: center;
    gap: var(--breakdown-gap);
    min-width: 0;
    padding: 6px 8px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-left: 1px solid rgba(0, 0, 0, 0.06);
  }

  /* A firmer rule under the column headers */
  .breakdown-matrix__tr--first .breakdown-matrix__row-head,
  .breakdown-matrix__tr--first .breakdown-matrix__cell {
    border-top-color: rgba(0, 0, 0, 0.24);
  }

  /* ── Units ────────────────────────────────────────────────────────── */
  .breakdown-matrix__unit {
    flex: none;
    width: var(--breakdown-unit);
    height: var(--breakdown-unit);
    border-radius: 2px;
    background: var(--unit-color);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
    transition: opacity 0.12s ease;
  }

  /* Outside the selection: hollow, so it never reads as a category color */
  .breakdown-matrix__unit--ghost {
    background: transparent;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.24);
  }

  .breakdown-matrix__unit--dim {
    opacity: 0.14;
  }

  .breakdown-matrix__unit:hover {
    outline: 2px solid rgba(0, 0, 0, 0.78);
    outline-offset: 1px;
  }

  /* Follows the last square like the label at the end of a bar */
  .breakdown-matrix__cell-count {
    margin-left: 3px;
    line-height: var(--breakdown-unit);
  }

  /* ── Tooltip ──────────────────────────────────────────────────────── */
  .breakdown-matrix__tooltip {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2400;
    pointer-events: none;
    max-width: 320px;
    padding: 8px 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    font-size: 0.75rem;
    line-height: 1.35;
    color: rgba(0, 0, 0, 0.87);
  }

  .breakdown-matrix__tooltip-title {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  .breakdown-matrix__tooltip table {
    border-collapse: collapse;
  }

  .breakdown-matrix__tooltip th {
    padding: 1px 10px 1px 0;
    text-align: left;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.55);
    white-space: nowrap;
    vertical-align: top;
  }

  .breakdown-matrix__tooltip td {
    padding: 1px 0;
    overflow-wrap: anywhere;
  }

  /* xs */
  @media (max-width: 600px) {
    .breakdown-matrix {
      --breakdown-label-max: 132px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .breakdown-matrix__unit {
      transition: none;
    }
  }
</style>
