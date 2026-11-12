<template>
  <div class="agent-breakdown">
    <div class="agent-breakdown__toolbar">
      <h3 class="agent-breakdown__title">{{ config.title }}</h3>
      <div v-if="agents" class="agent-breakdown__controls">
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

    <p v-if="error" class="agent-breakdown__message text-error">{{ error }}</p>
    <p v-else-if="!agents" class="agent-breakdown__message">Loading data…</p>

    <template v-else>
      <!-- Always present, so the matrix does not jump when a selection starts:
           a hint until something is selected, then the selection itself -->
      <div class="agent-breakdown__status">
        <span class="agent-breakdown__count" aria-live="polite">
          <template v-if="chips.length">
            Showing <strong>{{ matchedCount }}</strong> of {{ agents.length }} {{ config.unit }}
          </template>
          <template v-else>{{ config.hint }}</template>
        </span>
        <v-chip
          v-for="chip in chips"
          :key="chip.key"
          size="small"
          closable
          :text="chip.text"
          :close-label="`Remove ${chip.text}`"
          @click:close="toggleValue(chip)"
        />
        <v-btn
          v-if="chips.length"
          variant="text"
          size="small"
          color="primary"
          prepend-icon="mdi-filter-remove-outline"
          class="agent-breakdown__clear"
          @click="clearFilters"
        >
          Clear
        </v-btn>
      </div>

      <agent-breakdown-matrix
        :data="agents"
        :axis="axis"
        :highlight="highlight"
        :selection="filters"
        :unit-key="unitKey"
        :unit-label="unitLabel"
        :tooltip="tooltip"
        :unit="config.unit"
        @toggle="toggleValue"
      />
    </template>
  </div>
</template>

<script>
  import AgentBreakdownMatrix from './AgentBreakdownMatrix.vue';
  import { AGENT_BREAKDOWN } from './agentBreakdown.js';
  import { matchesFilters, orderedValues } from './breakdown.js';
  import { getOncRefData } from './oncref.js';

  // Value of the "Columns" select for a matrix with a single column
  const NO_COLUMNS = '(none)';

  /**
   * The test agent breakdown card: one unit matrix (AgentBreakdownMatrix) with
   * one square per agent, grouped into rows and columns by two metadata fields
   * and colored by a third. The three selects choose the fields.
   *
   * Clicking an entry in the color legend selects a subset: its agents stay
   * colored and the rest turn hollow. The selection is listed as chips above
   * the matrix and survives a change of fields. Rows, columns and squares are
   * not clickable; hovering a square shows its agent.
   *
   * Self-contained: loads the test agent rows itself through the shared, cached
   * getOncRefData() and owns the selection and the field choices. Which columns
   * take part, their colors and the copy come from the config (see
   * agentBreakdown.js); the counting is in breakdown.js.
   */
  export default {
    name: 'AgentBreakdown',
    components: { AgentBreakdownMatrix },
    props: {
      // Card copy, dimensions, defaults and colors; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_BREAKDOWN },
    },
    data() {
      const { defaults, dimensions } = this.config;
      return {
        // Test agent rows, loaded in mounted(); null until then
        agents: null,
        error: null,
        // Selected raw values per field, e.g. { Class: ['biologic'], … }. A
        // field matches on any of its values, and every field has to match.
        filters: Object.fromEntries(dimensions.map((d) => [d.field, []])),
        // Fields the matrix lays out: rows, columns (null for one column), color
        yField: defaults.y,
        xField: defaults.x ?? null,
        colorField: defaults.color,
        noColumns: NO_COLUMNS,
      };
    },
    computed: {
      // The config's dimensions with `domain` completed from the data: every
      // value, in display order. Fixed by the full library, so a selection
      // never reorders rows or recolors a value.
      dimensions() {
        return this.config.dimensions.map((dimension) => ({
          ...dimension,
          domain: orderedValues(this.agents, dimension).map((v) => v.value),
        }));
      },
      fieldOptions() {
        return this.dimensions.map((d) => ({ title: d.title, value: d.field }));
      },
      columnOptions() {
        return [{ title: 'None', value: NO_COLUMNS }, ...this.fieldOptions];
      },
      // One removable chip per selected value, fields in dimension order
      chips() {
        return this.dimensions.flatMap((d) =>
          this.filters[d.field].map((value) => ({
            key: `${d.field}|${value}`,
            field: d.field,
            value,
            text: `${d.title}: ${d.format ? d.format(value) : value}`,
          })),
        );
      },
      // Selection predicate for the matrix; null when nothing is selected.
      // Closes over a plain copy, so a new selection always gives a new function.
      highlight() {
        if (!this.chips.length) return null;
        const selected = Object.fromEntries(
          Object.entries(this.filters).map(([field, values]) => [field, [...values]]),
        );
        return (row) => matchesFilters(row, selected);
      },
      matchedCount() {
        const { highlight } = this;
        return highlight ? this.agents.filter(highlight).length : this.agents.length;
      },
      colorAxis() {
        const dimension = this.dimension(this.colorField);
        const scale = (this.config.colors?.[dimension.field] ?? this.config.defaultColors)(
          this.agents,
          dimension.field,
        );
        return {
          ...dimension,
          type: 'categorical',
          domain: scale.domain ?? dimension.domain,
          range: scale.range,
        };
      },
      axis() {
        return {
          y: this.dimension(this.yField),
          x: this.xField ? this.dimension(this.xField) : null,
          color: this.colorAxis,
        };
      },
      unitKey() {
        const { keyField } = this.config;
        return (row) => row[keyField];
      },
      unitLabel() {
        const { labelField } = this.config;
        return (row) => row[labelField];
      },
      // Tooltip rows for one agent, skipping empty values
      tooltip() {
        const fields = this.config.tooltip;
        return (row) =>
          fields
            .map(({ field, title, format }) => [title, format ? format(row[field]) : row[field]])
            .filter(([, value]) => value);
      },
    },
    async mounted() {
      try {
        const { agents } = await getOncRefData();
        this.agents = agents;
      } catch (err) {
        this.error = 'Failed to load test agent data.';
        console.error(err);
      }
    },
    methods: {
      dimension(field) {
        return this.dimensions.find((d) => d.field === field);
      },
      // Add a value to its field's selection, or remove it if already there
      toggleValue({ field, value }) {
        const selected = this.filters[field];
        const i = selected.indexOf(value);
        if (i < 0) selected.push(value);
        else selected.splice(i, 1);
      },
      clearFilters() {
        for (const field of Object.keys(this.filters)) this.filters[field] = [];
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
          this.yField = this.xField ?? this.dimensions.find((d) => d.field !== field).field;
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

  .agent-breakdown__message {
    margin: 0;
    padding: 16px;
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  /* ── Selection summary ────────────────────────────────────────────── */
  .agent-breakdown__status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 8px;
    min-height: 44px;
    padding: 6px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-breakdown__count {
    margin-right: 4px;
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .agent-breakdown__count strong {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 600;
  }

  .agent-breakdown__clear {
    margin-left: auto;
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
