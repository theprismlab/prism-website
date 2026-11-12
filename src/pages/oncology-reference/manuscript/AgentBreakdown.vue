<template>
  <div class="agent-breakdown">
    <div class="agent-breakdown__toolbar">
      <h3 class="agent-breakdown__title">{{ config.title }}</h3>
      <div class="agent-breakdown__controls">
        <v-select
          :model-value="yField"
          :items="fieldOptions"
          label="Rows"
          density="compact"
          variant="outlined"
          bg-color="white"
          hide-details
          class="agent-breakdown__select"
          @update:model-value="setY"
        />
        <v-select
          :model-value="xField ?? noColumns"
          :items="columnOptions"
          label="Columns"
          density="compact"
          variant="outlined"
          bg-color="white"
          hide-details
          class="agent-breakdown__select"
          @update:model-value="setX"
        />
        <v-select
          v-model="colorField"
          :items="fieldOptions"
          label="Color by"
          density="compact"
          variant="outlined"
          bg-color="white"
          hide-details
          class="agent-breakdown__select"
        />
      </div>
    </div>

    <div class="agent-breakdown__body">
      <p v-if="error" class="text-error mb-0">{{ error }}</p>
      <p v-else-if="!rows" class="agent-breakdown__status mb-0">Loading data…</p>
      <template v-else>
        <p v-if="config.description" class="agent-breakdown__status">{{ config.description }}</p>
        <unit-matrix-chart
          :data="rows"
          :axis="axis"
          :tooltip="tooltip"
          :unit-size="config.unitSize"
          :unit-padding="config.unitPadding"
          :show-counts="config.showCounts"
          :unit="config.unit"
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

  /**
   * The test agent breakdown card: card copy, the "Rows", "Columns" and "Color
   * by" controls, and the unit matrix (UnitMatrixChart via its Vue wrapper), with
   * one square per agent. Self-contained: loads the test agent rows itself
   * through the shared, cached getOncRefData(). Owns the three field selections
   * and maps the config (see agentBreakdown.js) onto chart props explicitly, so
   * the chart stays generic and the config stays free of prop names.
   *
   * Highlighting belongs to the chart: a click on a legend entry highlights its
   * agents, as in every prism-charts chart.
   */
  export default {
    name: 'AgentBreakdown',
    components: { UnitMatrixChart },
    props: {
      // Card copy, dimensions, defaults and colors; defaults to the manuscript config
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
        noColumns: NO_COLUMNS,
      };
    },
    computed: {
      fieldOptions() {
        return this.config.dimensions.map((d) => ({ title: d.title ?? d.field, value: d.field }));
      },
      columnOptions() {
        return [{ title: 'None', value: NO_COLUMNS }, ...this.fieldOptions];
      },
      // The chart's axes: each dimension is already an axis config ({ field,
      // title, domain, format }); the color axis adds its field's scale
      axis() {
        const color = this.dimension(this.colorField);
        const scale = (this.config.colors?.[color.field] ?? this.config.defaultColors)(
          this.rows,
          color.field,
        );
        return {
          y: this.dimension(this.yField),
          x: this.xField ? this.dimension(this.xField) : {},
          color: { ...color, ...scale },
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
      dimension(field) {
        return this.config.dimensions.find((d) => d.field === field);
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
    justify-content: flex-end;
    gap: 12px;
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
