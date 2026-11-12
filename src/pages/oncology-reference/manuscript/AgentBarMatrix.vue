<template>
  <div class="agent-bar-matrix">
    <div class="agent-bar-matrix__toolbar">
      <h3 class="agent-bar-matrix__title">{{ config.title }}</h3>
      <!-- The inputs the config's `controls` lists, in that order -->
      <div v-if="controls.length" class="agent-bar-matrix__controls">
        <template v-for="control in controls" :key="control">
          <v-btn
            v-if="control === 'swap'"
            icon="mdi-swap-horizontal"
            variant="text"
            size="small"
            :disabled="!fields.x"
            aria-label="Swap rows and columns"
            title="Swap rows and columns"
            @click="swapAxes"
          />
          <v-select
            v-else
            :model-value="fields[inputs[control].role] ?? none"
            :items="inputs[control].optional ? optionalOptions : fieldOptions"
            :label="inputs[control].label"
            density="compact"
            variant="outlined"
            bg-color="white"
            hide-details
            class="agent-bar-matrix__select"
            @update:model-value="select(inputs[control].role, $event)"
          />
        </template>
      </div>
    </div>

    <div class="agent-bar-matrix__body">
      <p v-if="error" class="text-error mb-0">{{ error }}</p>
      <p v-else-if="!rows" class="agent-bar-matrix__status mb-0">Loading data…</p>
      <template v-else>
        <p v-if="config.description" class="agent-bar-matrix__status">{{ config.description }}</p>
        <bar-matrix-chart
          ref="chart"
          :data="rows"
          :dimensions="dimensions"
          :axis="axis"
          :bar-size="config.barSize"
          :bar-padding="config.barPadding"
          :group-padding="config.groupPadding"
          :show-values="config.showValues"
          :unit="config.unit"
          @axis-change="onAxisChange"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import BarMatrixChart from '@/lib/charts/BarMatrixChart.vue';
  import { AGENT_BAR_MATRIX } from './agentBarMatrix.js';
  import { getOncRefData } from './oncref.js';

  // Value of a select for an axis left without a field
  const NONE = '(none)';
  // The inputs the config's `controls` can list: the chart axis each sets, its
  // label, and whether it offers "None"
  const INPUTS = {
    rows: { role: 'y', label: 'Rows', optional: true },
    columns: { role: 'x', label: 'Columns', optional: true },
    groups: { role: 'group', label: 'Bar groups', optional: true },
    series: { role: 'series', label: 'Bar series', optional: true },
    color: { role: 'color', label: 'Color by', optional: false },
  };
  // The axes that lay bars out; each field goes on at most one of them
  const POSITIONS = ['y', 'x', 'group', 'series'];

  /**
   * The test agent bar matrix card: card copy, the inputs the config's
   * `controls` lists ("Rows", "Columns", "Bar groups", "Bar series", "Color by"
   * and a swap button), and the bar matrix (prism-charts' BarMatrixChart via its
   * Vue wrapper): a grouped bar chart of agent counts in every cell.
   * Self-contained: loads the test agent rows itself through the shared, cached
   * getOncRefData(). Owns the field selections and maps the config (see
   * agentBarMatrix.js) onto chart props explicitly, so the chart stays generic
   * and the config stays free of prop names.
   *
   * The swap is the chart's own (`swapAxes`); the card follows it through
   * `axis-change`. Highlighting and the tooltip belong to the chart too.
   */
  export default {
    name: 'AgentBarMatrix',
    components: { BarMatrixChart },
    props: {
      // Card copy, dimensions, defaults, controls and colors; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_BAR_MATRIX },
    },
    data() {
      const { defaults } = this.config;
      return {
        // Test agent rows, loaded in mounted(); null until then
        rows: null,
        error: null,
        // The field on each chart axis; null leaves a positional axis empty
        fields: {
          y: defaults.y ?? null,
          x: defaults.x ?? null,
          group: defaults.group ?? null,
          series: defaults.series ?? null,
          color: defaults.color,
        },
        inputs: INPUTS,
        none: NONE,
      };
    },
    computed: {
      // The config's controls this card knows, in the config's order
      controls() {
        return (this.config.controls ?? []).filter((c) => c === 'swap' || c in INPUTS);
      },
      fieldOptions() {
        return this.config.dimensions.map((d) => ({ title: d.title ?? d.field, value: d.field }));
      },
      optionalOptions() {
        return [{ title: 'None', value: NONE }, ...this.fieldOptions];
      },
      // The chart's dimensions: each config dimension is already an axis config
      // ({ field, title, domain, format }); `color` adds its field's color scale,
      // which applies when the field colors the bars
      dimensions() {
        const { colors, defaultColors } = this.config;
        return this.config.dimensions.map((dimension) => ({
          ...dimension,
          color: (colors?.[dimension.field] ?? defaultColors)(this.rows, dimension.field),
        }));
      },
      // The chart's axes, each naming a dimension by its field
      axis() {
        const named = (field) => (field ? { field } : {});
        const { y, x, group, series, color } = this.fields;
        return {
          y: named(y),
          x: named(x),
          group: named(group),
          series: named(series),
          color: named(color),
        };
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
      // Put a field on an axis. A field lays bars out on one axis at a time:
      // giving an axis the field another one shows trades the two.
      select(role, value) {
        const field = value === NONE ? null : value;
        if (field && POSITIONS.includes(role)) {
          const other = POSITIONS.find((p) => p !== role && this.fields[p] === field);
          if (other) this.fields[other] = this.fields[role];
        }
        this.fields[role] = field;
      },
      // The chart trades its row and column fields and reports the result
      swapAxes() {
        this.$refs.chart?.swapAxes();
      },
      onAxisChange(axis) {
        this.fields.y = axis.y?.field ?? null;
        this.fields.x = axis.x?.field ?? null;
      },
    },
  };
</script>

<style scoped>
  /* Card styling matches AgentBreakdown.vue and AgentParallelSets.vue */
  .agent-bar-matrix {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  /* ── Toolbar ──────────────────────────────────────────────────────── */
  .agent-bar-matrix__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-bar-matrix__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
  }

  .agent-bar-matrix__controls {
    display: flex;
    flex: 1 1 480px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .agent-bar-matrix__select {
    flex: 0 1 170px;
    min-width: 150px;
  }

  /* ── Chart ────────────────────────────────────────────────────────── */
  .agent-bar-matrix__body {
    padding: 16px;
  }

  .agent-bar-matrix__status {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    .agent-bar-matrix__controls {
      justify-content: flex-start;
    }

    .agent-bar-matrix__select {
      flex: 1 1 100%;
    }
  }
</style>
