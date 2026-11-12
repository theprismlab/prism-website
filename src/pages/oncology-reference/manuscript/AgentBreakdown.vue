<template>
  <div class="agent-breakdown">
    <div class="agent-breakdown__header">
      <h3 class="agent-breakdown__title">{{ config.title }}</h3>
      <p v-if="config.description" class="agent-breakdown__description">
        {{ config.description }}
      </p>
    </div>

    <p v-if="error" class="agent-breakdown__message text-error">{{ error }}</p>
    <p v-else-if="!agents" class="agent-breakdown__message">Loading data…</p>

    <template v-else>
      <!-- 1. Choose a subset: one bar list per field, every bar a toggle -->
      <agent-breakdown-facets
        :facets="facets"
        :unit="config.unit"
        @toggle="toggleValue"
        @clear="clearField"
        @hover="hoverValue = $event"
      />

      <div class="agent-breakdown__status">
        <span class="agent-breakdown__count" aria-live="polite">
          Showing <strong>{{ matchedAgents.length }}</strong> of {{ agents.length }}
          {{ config.unit }}
        </span>
        <v-chip
          v-for="chip in chips"
          :key="chip.key"
          size="small"
          closable
          :text="chip.text"
          :close-label="`Remove filter ${chip.text}`"
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
          Clear filters
        </v-btn>
      </div>

      <!-- 2. Choose how the matrix breaks the subset down -->
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
        <v-btn
          icon="mdi-swap-horizontal"
          variant="text"
          size="small"
          :disabled="!xField"
          aria-label="Swap rows and columns"
          title="Swap rows and columns"
          @click="swapAxes"
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
        <v-checkbox
          v-model="hideUnmatched"
          :label="`Hide ${config.unit} outside the selection`"
          :disabled="!filtered"
          density="compact"
          hide-details
          class="agent-breakdown__toggle"
        />
      </div>

      <agent-breakdown-matrix
        :data="matrixAgents"
        :axis="axis"
        :highlight="hideUnmatched ? null : highlight"
        :hover-target="hoverTarget"
        :selection="filters"
        :unit-key="unitKey"
        :unit-label="unitLabel"
        :tooltip="tooltip"
        :unit="config.unit"
        @toggle="toggleValue"
        @cell-click="selectCell"
        @hover="hoverValue = $event"
      />
    </template>
  </div>
</template>

<script>
  import AgentBreakdownFacets from './AgentBreakdownFacets.vue';
  import AgentBreakdownMatrix from './AgentBreakdownMatrix.vue';
  import { AGENT_BREAKDOWN } from './agentBreakdown.js';
  import { facetCounts, matchesFilters, orderedValues, valueOf } from './breakdown.js';
  import { getOncRefData } from './oncref.js';

  // Value of the "Columns" select for a matrix with a single column
  const NO_COLUMNS = '(none)';

  /**
   * The test agent breakdown explorer: a card where the reader first narrows
   * the library to a subset, then chooses how a unit matrix breaks that subset
   * down.
   *
   *   Filter charts (AgentBreakdownFacets): one bar list per metadata field.
   *     Clicking bars selects values: any of the selected values within a
   *     field, and all fields together.
   *   Matrix (AgentBreakdownMatrix): one square per agent, grouped into rows
   *     and columns by two fields and colored by a third, all three chosen
   *     here. Its headers, legend and cells toggle the same selection.
   *
   * Self-contained: loads the test agent rows itself through the shared, cached
   * getOncRefData() and owns the selection and the layout choices. Which
   * columns take part, their colors and the copy come from the config (see
   * agentBreakdown.js); the counting is in breakdown.js.
   */
  export default {
    name: 'AgentBreakdown',
    components: { AgentBreakdownFacets, AgentBreakdownMatrix },
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
        // Selected raw values per field, e.g. { Class: ['biologic'], … }
        filters: Object.fromEntries(dimensions.map((d) => [d.field, []])),
        // Fields the matrix lays out: rows, columns (null for one column), color
        yField: defaults.y,
        xField: defaults.x ?? null,
        colorField: defaults.color,
        // true drops agents outside the selection; false keeps them as hollow squares
        hideUnmatched: false,
        // `{ field, value }` of the bar, header or legend entry under the
        // cursor; the matrix dims every other agent. Null otherwise.
        hoverValue: null,
        noColumns: NO_COLUMNS,
      };
    },
    computed: {
      // The config's dimensions with `domain` completed from the data: every
      // value, in display order. Fixed by the full library, so filtering never
      // reorders rows or recolors a value.
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
      // Plain copy of the fields that have a selection. Everything derived
      // from the selection reads this, so it all updates together.
      activeFilters() {
        const active = {};
        for (const [field, values] of Object.entries(this.filters)) {
          if (values.length) active[field] = [...values];
        }
        return active;
      },
      filtered() {
        return Object.keys(this.activeFilters).length > 0;
      },
      matchedAgents() {
        const active = this.activeFilters;
        return this.filtered
          ? this.agents.filter((row) => matchesFilters(row, active))
          : this.agents;
      },
      // Selection predicate for the matrix; null when nothing is selected
      highlight() {
        const active = this.activeFilters;
        return this.filtered ? (row) => matchesFilters(row, active) : null;
      },
      // Hover predicate for the matrix; null when nothing is hovered
      hoverTarget() {
        const target = this.hoverValue;
        return target ? (row) => valueOf(row, target.field) === target.value : null;
      },
      matrixAgents() {
        return this.hideUnmatched ? this.matchedAgents : this.agents;
      },
      facets() {
        return facetCounts(this.agents, this.dimensions, this.activeFilters);
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
      clearField(field) {
        this.filters[field] = [];
      },
      clearFilters() {
        for (const field of Object.keys(this.filters)) this.filters[field] = [];
      },
      // Narrow the row and column fields to one cell's values. Clicking the
      // cell that is already the whole selection on those fields clears them.
      selectCell({ x, y }) {
        const targets = [[this.yField, y]];
        if (this.xField) targets.push([this.xField, x]);
        const isOnly = targets.every(
          ([field, value]) => this.filters[field].length === 1 && this.filters[field][0] === value,
        );
        for (const [field, value] of targets) this.filters[field] = isOnly ? [] : [value];
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
      swapAxes() {
        if (!this.xField) return;
        [this.xField, this.yField] = [this.yField, this.xField];
      },
    },
  };
</script>

<style scoped>
  /* Card styling matches AgentExplorer.vue */
  .agent-breakdown {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  .agent-breakdown__header {
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

  .agent-breakdown__description {
    max-width: 80ch;
    margin: 4px 0 0;
    font-size: 0.8125rem;
    line-height: 1.45;
    color: rgba(0, 0, 0, 0.6);
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
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    background: rgba(0, 0, 0, 0.02);
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

  /* ── Matrix controls ──────────────────────────────────────────────── */
  .agent-breakdown__controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 8px;
    padding: 16px 16px 4px;
  }

  .agent-breakdown__select {
    flex: 0 1 220px;
    min-width: 180px;
  }

  .agent-breakdown__toggle {
    flex: 0 0 auto;
    margin-left: 8px;
  }

  .agent-breakdown__toggle :deep(.v-label) {
    font-size: 0.8125rem;
  }

  @media (max-width: 600px) {
    .agent-breakdown__select {
      flex: 1 1 100%;
    }

    .agent-breakdown__toggle {
      margin-left: 0;
    }
  }
</style>
