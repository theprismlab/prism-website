<template>
  <div class="agent-explorer">
    <p v-if="error" class="text-error">{{ error }}</p>
    <p v-else-if="!loaded" class="prism-text-body-large text-medium-emphasis">Loading data…</p>

    <div v-else class="agent-explorer__card">
      <div class="agent-explorer__toolbar">
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
          class="agent-explorer__filter"
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
          class="agent-explorer__filter"
        />
      </div>

      <div class="agent-explorer__status">
        <span class="agent-explorer__count">
          Showing <strong>{{ filteredAgents.length }}</strong> of {{ agents.length }}
          {{ config.unit }}
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

      <agent-umap
        :config="config.umap"
        :agents="agents"
        :rows="filteredAgents"
        :genes="crisprGenes"
        :highlighted="searchedAgents"
        class="agent-explorer__plot"
      />

      <v-data-table
        :headers="headers"
        :items="filteredAgents"
        :search="search"
        :items-per-page="10"
        :items-per-page-options="[10, 25, 50, 100, { value: -1, title: 'All' }]"
        :sort-by="[{ key: config.sortBy, order: 'asc' }]"
        density="compact"
        hover
        no-data-text="No agents match the current filters."
        class="agent-explorer__table"
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
  import { AGENT_EXPLORER } from './agentExplorer.js';
  import AgentUmap from './AgentUmap.vue';

  /**
   * The test agent explorer: loads the OncRef data, owns the filter and search
   * state, and renders the toolbar, the UMAP (AgentUmap) and the table. Columns,
   * filters and the UMAP's copy come from the config (see agentExplorer.js).
   */
  export default {
    name: 'AgentExplorer',
    components: { AgentUmap },
    props: {
      // Table columns and filter fields; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_EXPLORER },
    },
    data() {
      const { filterFields, headers } = this.config;
      return {
        // One object per test agent: the CSV row plus `umap` ({ x, y, umapCls, n }
        // from the JSON, or null for agents without a UMAP point)
        agents: null,
        // CRISPR gene UMAP points from the JSON, kept separate for the scatter plot
        crisprGenes: null,
        error: null,
        search: '',
        filterFields,
        // Selected values per filter field, e.g. { Class: ['biologic'], ... }
        activeFilters: Object.fromEntries(filterFields.map((f) => [f.key, []])),
        // `key` is the CSV column name; `title` is what the header shows
        headers,
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
        return this.agents.filter((row) =>
          this.filterFields.every((field) => this.matchesFilter(row, field)),
        );
      },
      // Filtered agents matching the search box across the table columns, the
      // same case-insensitive substring match v-data-table applies. Null when
      // the search is empty, so the plot shows no highlight.
      searchedAgents() {
        const query = (this.search || '').trim().toLowerCase();
        if (!query) return null;
        const keys = this.headers.map((h) => h.key);
        return this.filteredAgents.filter((row) =>
          keys.some((key) =>
            String(row[key] ?? '')
              .toLowerCase()
              .includes(query),
          ),
        );
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
    async mounted() {
      await this.getData();
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
  .agent-explorer__card {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  /* ── Toolbar ──────────────────────────────────────────────────────── */
  .agent-explorer__toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-explorer__filter {
    flex: 1 1 200px;
    min-width: 200px;
    max-width: 320px;
  }

  .agent-explorer__status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    padding: 4px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-explorer__count {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .agent-explorer__count strong {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 600;
  }

  .agent-explorer__plot {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  /* ── Table ────────────────────────────────────────────────────────── */
  .agent-explorer__table :deep(table) {
    table-layout: fixed;
    width: 100%;
  }

  .agent-explorer__table :deep(.v-data-table__td) {
    overflow-wrap: anywhere;
  }

  .agent-explorer__table :deep(.v-data-table__th) {
    font-size: 0.7rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6) !important;
    background: rgba(0, 0, 0, 0.015);
    white-space: nowrap;
    height: 44px !important;
  }

  .agent-explorer__table :deep(thead tr) {
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  }

  .agent-explorer__table :deep(.v-data-table__td) {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.82);
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    vertical-align: middle;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  }

  .agent-explorer__table :deep(tbody tr:nth-child(even) > td) {
    background: rgba(0, 0, 0, 0.012);
  }

  .agent-explorer__table :deep(tbody tr:last-child > td) {
    border-bottom: 0 !important;
  }

  .agent-explorer__table :deep(.v-data-table-footer) {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
