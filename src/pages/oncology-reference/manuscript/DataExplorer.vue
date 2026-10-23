<template>
  <div class="data-explorer">
    <p v-if="error" class="text-error">{{ error }}</p>
    <p v-else-if="!loaded" class="prism-text-body-large text-medium-emphasis">Loading data…</p>

    <div v-else class="data-explorer__card">
      <div class="data-explorer__toolbar">
        <v-autocomplete
          v-for="field in filterFields"
          :key="field.key"
          v-model="activeFilters[field.key]"
          :items="filterOptions[field.key]"
          :label="field.label"
          multiple
          chips
          closable-chips
          clearable
          hide-details
          density="compact"
          variant="outlined"
          bg-color="white"
          class="data-explorer__filter"
        />
        <v-text-field
          v-model="search"
          placeholder="Search…"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          density="compact"
          variant="outlined"
          bg-color="white"
          class="data-explorer__filter"
        />
      </div>

      <div class="data-explorer__status">
        <span class="data-explorer__count">
          Showing <strong>{{ filteredAgents.length }}</strong> of {{ agents.length }} agents
        </span>
        <v-btn
          v-if="activeFilterCount"
          variant="text"
          size="small"
          color="primary"
          prepend-icon="mdi-filter-remove-outline"
          @click="clearFilters"
        >
          Clear filters
        </v-btn>
      </div>

      <div class="data-explorer__plot">
        <div class="data-explorer__plot-header">
          <span class="data-explorer__plot-title">Test agent UMAP</span>
          <span class="data-explorer__count">
            <strong>{{ umapPoints.length }}</strong> plotted
            <template v-if="unplottedCount"> · {{ unplottedCount }} without coordinates</template>
          </span>
          <v-btn
            v-if="zoomed"
            variant="text"
            size="small"
            color="primary"
            prepend-icon="mdi-magnify-minus-outline"
            @click="resetZoom"
          >
            Reset zoom
          </v-btn>
        </div>
        <div ref="umap" class="data-explorer__umap" />
      </div>

      <v-data-table
        :headers="headers"
        :items="filteredAgents"
        :search="search"
        :items-per-page="10"
        :items-per-page-options="[10, 25, 50, 100, { value: -1, title: 'All' }]"
        :sort-by="[{ key: 'FormattedName', order: 'asc' }]"
        density="compact"
        hover
        no-data-text="No agents match the current filters."
        class="data-explorer__table"
      >
        <template #[`item.GeneSymbolOfTargets`]="{ value }">
          {{ splitList(value).join(', ') }}
        </template>
        <template #[`item.TargetOrMechanism`]="{ value }">
          {{ splitList(value).join('; ') }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import { getOncRefData } from './oncref.js';
  import UmapPlot from './UmapPlot.js';

  // Columns that get a multiselect filter, in table column order. `list` marks
  // semicolon-delimited CSV fields, where a row matches if any value is selected.
  const FILTER_FIELDS = [
    { key: 'GeneSymbolOfTargets', label: 'Targets', list: true },
    { key: 'TargetOrMechanism', label: 'Mechanism', list: true },
    { key: 'Class', label: 'Class' },
    { key: 'Modality', label: 'Modality' },
    { key: 'TargetPathway', label: 'Pathway' },
    { key: 'HighestClinicalStage', label: 'Clinical stage' },
  ];

  export default {
    name: 'DataExplorer',
    data() {
      return {
        // One object per test agent: the CSV row plus `umap` ({ x, y, umapCls, n }
        // from the JSON, or null for agents without a UMAP point)
        agents: null,
        // CRISPR gene UMAP points from the JSON, kept separate for the scatter plot
        crisprGenes: null,
        error: null,
        search: '',
        // Mirrors the plot's zoom state so the "Reset zoom" button can react
        zoomed: false,
        filterFields: FILTER_FIELDS,
        // Selected values per filter field, e.g. { Class: ['biologic'], ... }
        activeFilters: Object.fromEntries(FILTER_FIELDS.map((f) => [f.key, []])),
        // `key` is the CSV column name; `title` is what the header shows
        headers: [
          { title: 'Agent', key: 'FormattedName' },
          { title: 'Targets', key: 'GeneSymbolOfTargets' },
          { title: 'Mechanism', key: 'TargetOrMechanism' },
          { title: 'Class', key: 'Class' },
          { title: 'Modality', key: 'Modality' },
          { title: 'Pathway', key: 'TargetPathway' },
          { title: 'Clinical stage', key: 'HighestClinicalStage' },
        ],
      };
    },
    computed: {
      loaded() {
        return this.agents !== null;
      },
      activeFilterCount() {
        return Object.values(this.activeFilters).filter((v) => v.length).length;
      },
      filteredAgents() {
        // Watched by the plot before data arrives, so tolerate the null state
        if (!this.agents) return [];
        return this.agents.filter((row) =>
          this.filterFields.every((field) => this.matchesFilter(row, field)),
        );
      },
      // Filtered agents that have a UMAP point, i.e. what the scatter plot shows
      umapPoints() {
        return this.filteredAgents.filter((row) => row.umap);
      },
      unplottedCount() {
        return this.filteredAgents.length - this.umapPoints.length;
      },
      // Every UMAP class across *all* agents, most common first. Passed to the
      // plot as a fixed colour domain so filtering never recolours a class.
      umapClasses() {
        const counts = new Map();
        for (const row of this.agents ?? []) {
          if (row.umap) counts.set(row.umap.umapCls, (counts.get(row.umap.umapCls) || 0) + 1);
        }
        return [...counts]
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .map(([cls]) => cls);
      },
      // Dropdown options per field, with counts that reflect every *other* active
      // filter, so each option shows how many rows selecting it would leave.
      filterOptions() {
        const options = {};
        for (const field of this.filterFields) {
          const others = this.filterFields.filter((f) => f.key !== field.key);
          const rows = this.agents.filter((row) =>
            others.every((other) => this.matchesFilter(row, other)),
          );

          const counts = new Map();
          for (const row of this.agents) {
            for (const v of this.valuesOf(row, field)) counts.set(v, 0);
          }
          for (const row of rows) {
            for (const v of this.valuesOf(row, field)) counts.set(v, counts.get(v) + 1);
          }

          options[field.key] = [...counts]
            .map(([value, count]) => ({ title: `${value} (${count})`, value }))
            .sort(
              (a, b) => counts.get(b.value) - counts.get(a.value) || a.value.localeCompare(b.value),
            );
        }
        return options;
      },
    },
    watch: {
      umapPoints(points) {
        if (this.plot) this.plot.setData(points);
      },
    },
    async mounted() {
      await this.getData();
      if (this.loaded) {
        // The plot container only exists once the loaded branch has rendered
        await this.$nextTick();
        this.createPlot();
      }
    },
    beforeUnmount() {
      if (this.plot) this.plot.destroy();
      this.plot = null;
    },
    methods: {
      async getData() {
        try {
          const { agents, crisprGenes } = await getOncRefData();
          this.agents = agents;
          this.crisprGenes = crisprGenes;
        } catch (err) {
          this.error = 'Failed to load OncRef data.';
          console.error(err);
        }
      },
      createPlot() {
        // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
        // object graph in reactive proxies.
        this.plot = new UmapPlot(this.$refs.umap, {
          height: 460,
          key: (d) => d.CompoundName,
          x: { field: (d) => d.umap.x, title: 'UMAP 1' },
          y: { field: (d) => d.umap.y, title: 'UMAP 2' },
          color: {
            field: (d) => d.umap.umapCls,
            title: 'Class',
            type: 'categorical',
            domain: this.umapClasses,
          },
          tooltip: (d, rows) => [['Agent', d.FormattedName], ...rows],
          onZoomChange: (zoomed) => {
            this.zoomed = zoomed;
          },
        });
        this.plot.setData(this.umapPoints);
      },
      resetZoom() {
        if (this.plot) this.plot.resetZoom();
      },
      splitList(value) {
        return (value || '')
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean);
      },
      // All values a row has for a filter field (one for plain columns, several for lists)
      valuesOf(row, field) {
        return field.list ? this.splitList(row[field.key]) : [row[field.key]].filter(Boolean);
      },
      matchesFilter(row, field) {
        const selected = this.activeFilters[field.key];
        if (!selected.length) return true;
        return this.valuesOf(row, field).some((v) => selected.includes(v));
      },
      clearFilters() {
        for (const field of this.filterFields) this.activeFilters[field.key] = [];
      },
    },
  };
</script>

<style scoped>
  .data-explorer__card {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  /* ── Toolbar ──────────────────────────────────────────────────────── */
  .data-explorer__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .data-explorer__filter {
    flex: 1 1 200px;
    min-width: 200px;
    max-width: 320px;
  }

  .data-explorer__status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    padding: 4px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .data-explorer__count {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .data-explorer__count strong {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 600;
  }

  /* ── UMAP plot ────────────────────────────────────────────────────────── */
  .data-explorer__plot {
    padding: 8px 16px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .data-explorer__plot-header {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 36px;
    margin-bottom: 4px;
  }

  .data-explorer__plot-header .v-btn {
    margin-left: auto;
  }

  .data-explorer__plot-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
  }

  .data-explorer__umap {
    width: 100%;
  }

  /* ── Table ────────────────────────────────────────────────────────── */
  .data-explorer__table :deep(table) {
    table-layout: fixed;
    width: 100%;
  }

  .data-explorer__table :deep(.v-data-table__td) {
    overflow-wrap: anywhere;
  }

  .data-explorer__table :deep(.v-data-table__th) {
    font-size: 0.7rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6) !important;
    background: rgba(0, 0, 0, 0.015);
    white-space: nowrap;
    height: 44px !important;
  }

  .data-explorer__table :deep(thead tr) {
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  }

  .data-explorer__table :deep(.v-data-table__td) {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.82);
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  }

  .data-explorer__table :deep(tbody tr:nth-child(even) > td) {
    background: rgba(0, 0, 0, 0.012);
  }

  .data-explorer__table :deep(tbody tr:last-child > td) {
    border-bottom: 0 !important;
  }

  .data-explorer__table :deep(.v-data-table-footer) {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
