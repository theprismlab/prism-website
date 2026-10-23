<template>
  <div class="data-explorer">
    <p v-if="error" class="text-error">{{ error }}</p>
    <p v-else-if="!loaded" class="prism-text-body-large text-medium-emphasis">Loading data…</p>

    <template v-else>
      <div class="data-explorer__filters">
        <v-text-field
          v-model="search"
          placeholder="Search…"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          density="compact"
          variant="outlined"
          class="data-explorer__filter"
        />
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
          class="data-explorer__filter"
        />
      </div>

      <div class="data-explorer__status">
        <span class="prism-text-body-small text-medium-emphasis">
          Showing {{ filteredAgents.length }} of {{ agents.length }} agents
        </span>
        <v-btn
          v-if="activeFilterCount"
          variant="text"
          size="small"
          prepend-icon="mdi-filter-remove-outline"
          @click="clearFilters"
        >
          Clear filters
        </v-btn>
      </div>

      <v-data-table
        :headers="headers"
        :items="filteredAgents"
        :search="search"
        :items-per-page="25"
        :sort-by="[{ key: 'FormattedName', order: 'asc' }]"
        density="compact"
        class="data-explorer__table"
      >
        <template #[`item.GeneSymbolOfTargets`]="{ value }">
          {{ splitList(value).join(', ') }}
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
  import { getOncRefData } from './oncref.js';

  // Columns that get a multiselect filter. `list` marks semicolon-delimited
  // CSV fields, where a row matches if any of its values is selected.
  const FILTER_FIELDS = [
    { key: 'Class', label: 'Class' },
    { key: 'Modality', label: 'Modality' },
    { key: 'TargetPathway', label: 'Pathway' },
    { key: 'HighestClinicalStage', label: 'Clinical stage' },
    { key: 'GeneSymbolOfTargets', label: 'Targets', list: true },
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
        filterFields: FILTER_FIELDS,
        // Selected values per filter field, e.g. { Class: ['biologic'], ... }
        activeFilters: Object.fromEntries(FILTER_FIELDS.map((f) => [f.key, []])),
        // `key` is the CSV column name; `title` is what the header shows
        headers: [
          { title: 'Agent', key: 'FormattedName' },
          { title: 'Targets', key: 'GeneSymbolOfTargets' },
          { title: 'Mechanism', key: 'TargetOrMechanism', sortable: false },
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
        return this.agents.filter((row) =>
          this.filterFields.every((field) => this.matchesFilter(row, field)),
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
              (a, b) =>
                counts.get(b.value) - counts.get(a.value) || a.value.localeCompare(b.value),
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
  .data-explorer__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 12px;
  }

  .data-explorer__filter {
    flex: 1 1 200px;
    min-width: 200px;
    max-width: 320px;
  }

  .data-explorer__status {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    margin-bottom: 8px;
  }
</style>
