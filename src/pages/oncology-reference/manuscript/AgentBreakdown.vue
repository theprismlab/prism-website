<template>
  <div class="agent-breakdown">
    <div class="agent-breakdown__toolbar">
      <h3 class="agent-breakdown__title">{{ config.title }}</h3>
      <!-- The inputs the config's `controls` lists, in that order -->
      <div v-if="controls.length" class="agent-breakdown__controls">
        <template v-for="control in controls" :key="control">
          <v-btn
            v-if="control === 'swap'"
            icon="mdi-swap-horizontal"
            variant="text"
            size="small"
            :disabled="!xField"
            aria-label="Swap rows and columns"
            title="Swap rows and columns"
            @click="swapAxes"
          />
          <v-select
            v-else
            :model-value="selected(control)"
            :items="control === 'columns' ? columnOptions : fieldOptions"
            :label="labels[control]"
            density="compact"
            variant="outlined"
            bg-color="white"
            hide-details
            class="agent-breakdown__select"
            @update:model-value="select(control, $event)"
          />
        </template>
      </div>
    </div>

    <div class="agent-breakdown__body">
      <p v-if="error" class="text-error mb-0">{{ error }}</p>
      <p v-else-if="!rows" class="agent-breakdown__status mb-0">Loading data…</p>
      <template v-else>
        <p v-if="config.description" class="agent-breakdown__status">{{ config.description }}</p>
        <unit-matrix-chart
          ref="chart"
          :data="rows"
          :dimensions="dimensions"
          :axis="axis"
          :tooltip="tooltip"
          :unit-size="config.unitSize"
          :unit-padding="config.unitPadding"
          :show-counts="config.showCounts"
          :unit="config.unit"
          @axis-change="onAxisChange"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import UnitMatrixChart from '@/lib/charts/UnitMatrixChart.vue';
  import { AGENT_BREAKDOWN } from './agentBreakdown.js';
  import { getOncRefData } from './oncref.js';

  // Value of the "Columns" select for a matrix with a single column
  const NO_COLUMNS = '(none)';
  // The inputs the config's `controls` can list, with the label of each select
  const LABELS = { rows: 'Rows', columns: 'Columns', color: 'Color by' };

  /**
   * The test agent breakdown card: card copy, the inputs the config's `controls`
   * lists ("Rows", "Columns", "Color by" and a swap button), and the unit matrix
   * (prism-charts' UnitMatrixChart via its Vue wrapper), with one square per
   * agent. Self-contained: loads the test agent rows itself through the shared,
   * cached getOncRefData(). Owns the three field selections and maps the config
   * (see agentBreakdown.js) onto chart props explicitly, so the chart stays
   * generic and the config stays free of prop names.
   *
   * The swap is the chart's own (`swapAxes`); the card follows it through
   * `axis-change`. Highlighting belongs to the chart too: a click on a legend
   * entry highlights its agents, as in every prism-charts chart.
   */
  export default {
    name: 'AgentBreakdown',
    components: { UnitMatrixChart },
    props: {
      // Card copy, dimensions, defaults, controls and colors; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_BREAKDOWN },
    },
    data() {
      const { defaults } = this.config;
      return {
        // Test agent rows, loaded in mounted(); null until then
        rows: null,
        error: null,
        // Fields on each axis: rows, columns (null for one column), color
        yField: defaults.y,
        xField: defaults.x ?? null,
        colorField: defaults.color,
        labels: LABELS,
      };
    },
    computed: {
      // The config's controls this card knows, in the config's order
      controls() {
        return (this.config.controls ?? []).filter((c) => c === 'swap' || c in LABELS);
      },
      fieldOptions() {
        return this.config.dimensions.map((d) => ({ title: d.title ?? d.field, value: d.field }));
      },
      columnOptions() {
        return [{ title: 'None', value: NO_COLUMNS }, ...this.fieldOptions];
      },
      // The chart's dimensions: each config dimension is already an axis config
      // ({ field, title, domain, format }); `color` adds its field's color scale,
      // which applies when the field colors the squares
      dimensions() {
        const { colors, defaultColors } = this.config;
        return this.config.dimensions.map((dimension) => ({
          ...dimension,
          color: (colors?.[dimension.field] ?? defaultColors)(this.rows, dimension.field),
        }));
      },
      // The chart's axes, each naming a dimension by its field
      axis() {
        return {
          y: { field: this.yField },
          x: this.xField ? { field: this.xField } : {},
          color: { field: this.colorField },
        };
      },
      // Tooltip rows for one square: its agent's fields, skipping empty values
      tooltip() {
        const fields = this.config.tooltip;
        return ({ record }) =>
          fields
            .map(({ field, title, format }) => [
              title,
              format ? format(record[field]) : record[field],
            ])
            .filter(([, value]) => value);
      },
    },
    async mounted() {
      try {
        const { agents } = await getOncRefData();
        this.rows = agents;
      } catch (err) {
        this.error = 'Failed to load test agent data.';
        console.error(err);
      }
    },
    methods: {
      // Value shown by a control's select
      selected(control) {
        if (control === 'rows') return this.yField;
        if (control === 'columns') return this.xField ?? NO_COLUMNS;
        return this.colorField;
      },
      select(control, value) {
        if (control === 'rows') this.setY(value);
        else if (control === 'columns') this.setX(value);
        else this.colorField = value;
      },
      // Rows and columns never show the same field: picking the other axis'
      // field for one swaps the two
      setY(field) {
        if (field === this.xField) this.xField = this.yField;
        this.yField = field;
      },
      setX(value) {
        const field = value === NO_COLUMNS ? null : value;
        if (field && field === this.yField) {
          // With no columns to trade, the rows move to the first other field
          this.yField = this.xField ?? this.config.dimensions.find((d) => d.field !== field).field;
        }
        this.xField = field;
      },
      // The chart trades its row and column fields and reports the result
      swapAxes() {
        this.$refs.chart?.swapAxes();
      },
      onAxisChange(axis) {
        this.yField = axis.y?.field ?? this.yField;
        this.xField = axis.x?.field ?? null;
        this.colorField = axis.color?.field ?? this.colorField;
      },
    },
  };
</script>

<style scoped>
  /* Card styling matches AgentExplorer.vue and AgentParallelSets.vue */
  .agent-breakdown {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  /* ── Toolbar ──────────────────────────────────────────────────────── */
  .agent-breakdown__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-breakdown__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
  }

  .agent-breakdown__controls {
    display: flex;
    flex: 1 1 480px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .agent-breakdown__select {
    flex: 0 1 200px;
    min-width: 160px;
  }

  /* ── Chart ────────────────────────────────────────────────────────── */
  .agent-breakdown__body {
    padding: 16px;
  }

  .agent-breakdown__status {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    .agent-breakdown__controls {
      justify-content: flex-start;
    }

    .agent-breakdown__select {
      flex: 1 1 100%;
    }
  }
</style>
