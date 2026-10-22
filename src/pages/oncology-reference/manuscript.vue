<template>
  <page>
    <page-section :padding="10">
      <app-container narrow>
        <section-overline gradient>About the dataset</section-overline>
        <prism-section-title>A benchmark for oncology therapeutics</prism-section-title>
        <p class="prism-text-body-large mb-4">
          OncRef is generated using
          <router-link to="/about-us/about-prism" target="_blank">PRISM</router-link> (Profiling
          Relative Inhibition Simultaneously in Mixtures), a high-throughput drug screening platform
          developed at the Broad Institute that introduces unique 24-nucleotide DNA barcodes into
          individual cancer cell lines, enabling pooled multiplexed screening. Each compound was
          profiled in triplicate 8-point dose-response.
        </p>
        <p class="prism-text-body-large mb-8">
          The collection encompasses 172 agents (65%) not represented in other large-scale public
          datasets, spanning small molecules, protein degraders (PROTACs), and biologics including
          antibody-drug conjugates. Parallel genome-wide CRISPR knockout screens enable a new
          analytical framework that deconvolves polypharmacology, off-target effects, and on-target
          selectivity.
        </p>

        <prism-sub-section-title class="mb-4">Agent classes</prism-sub-section-title>
        <stat-grid :stats="agentClasses" :min-width="140" class="mb-10" />

        <prism-sub-section-title class="mb-4">Screening workflow</prism-sub-section-title>
        <workflow-steps :steps="assayWorkflow" color="var(--v-teal-darken-1)" class="mb-10" />
      </app-container>

      <!-- Wide so the summary tables can sit in columns -->
      <app-container wide>
        <prism-sub-section-title class="mb-4">Dataset summary</prism-sub-section-title>
        <v-row v-if="compounds">
          <v-col v-for="group in summaryGroups" :key="group.title" cols="12" sm="6" lg="4">
            <stat-table :title="group.title" :subtitle="group.value" :stats="group.stats" />
          </v-col>
        </v-row>
        <p v-else class="prism-text-body-large text-medium-emphasis">Loading dataset…</p>
      </app-container>
    </page-section>

    <page-section width="wide" :padding="10">
      <data-explorer />
    </page-section>
  </page>
</template>

<script>
  import { loadOncrefData, countWhere, countBy } from '@/utils/oncref';
  import StatGrid from './manuscript/StatGrid.vue';
  import StatTable from './manuscript/StatTable.vue';
  import DataExplorer from './manuscript/DataExplorer.vue';

  export default {
    name: 'OncologyReferenceManuscript',
    components: { StatGrid, StatTable, DataExplorer },
    data() {
      return {
        // Loaded from public/data/oncref/ (see @/utils/oncref)
        compounds: null,
        categories: null,
        // Fields broken down in the dataset summary table
        summaryFields: [
          { field: 'drugClass', title: 'Drug class' },
          { field: 'modality', title: 'Modality' },
          { field: 'pathway', title: 'Pathway' },
          { field: 'clinicalStage', title: 'Clinical stage' },
          { field: 'targets', title: 'Targets', limit: 10 },
        ],
        // Counted from compounds.json; each `filter` is passed to countWhere()
        agentClassFilters: [
          {
            label: 'Targeted small molecules',
            filter: { drugClass: 'targeted small molecule' },
            color: 'var(--v-blue-darken-1)',
          },
          {
            label: 'Biologics / ADCs',
            filter: { drugClass: 'biologic' },
            color: 'var(--v-orange-darken-1)',
          },
          {
            label: 'Cytotoxic agents',
            filter: { drugClass: 'cytotoxic/genotoxic' },
            color: 'var(--v-red-darken-1)',
          },
          {
            label: 'PROTAC degraders',
            filter: { modality: 'PROTAC' },
            color: 'var(--v-deep-purple-accent-2)',
          },
        ],
        // Swap `icon` for `image: '/images/...'` once step graphics are available
        assayWorkflow: [
          {
            title: 'Pool',
            caption: '891 barcoded cell lines, ~25 lines per pool',
            icon: 'mdi-dna',
          },
          { title: 'Treat', caption: '265 agents × 8 doses × 3 replicates', icon: 'mdi-pill' },
          {
            title: 'Incubate',
            caption: '5-day exposure across 39 pools × 26 plates',
            icon: 'mdi-timer-outline',
          },
          { title: 'Amplify', caption: 'Biotinylated PCR of barcodes', icon: 'mdi-repeat' },
          { title: 'Detect', caption: 'Luminex bead fluorescence readout', icon: 'mdi-chart-bar' },
        ],
      };
    },
    computed: {
      agentClasses() {
        return this.agentClassFilters.map(({ label, filter, color }) => ({
          label,
          color,
          value: this.formatCount(this.compounds && countWhere(this.compounds, filter)),
        }));
      },
      summaryGroups() {
        if (!this.compounds) return [];
        const stageOrder = (this.categories?.clinicalStages || []).map((s) => s.name);
        const byStage = (a, b) => {
          // Unlisted stages (e.g. "Not specified") sort last
          const rank = (name) =>
            stageOrder.includes(name) ? stageOrder.indexOf(name) : stageOrder.length;
          return rank(a.name) - rank(b.name);
        };

        return this.summaryFields.map(({ field, title, limit }) => {
          const counts = countBy(this.compounds, field, { missingLabel: 'Not specified' });
          let rows = counts.filter((r) => r.name !== 'Not specified');
          const distinct = rows.length;
          if (field === 'clinicalStage') rows.sort(byStage);
          // Keep "Not specified" at the end of each group
          rows = [...rows, ...counts.filter((r) => r.name === 'Not specified')];
          const shown = limit ? rows.slice(0, limit) : rows;

          return {
            title,
            value: limit ? `${distinct} distinct · top ${limit}` : `${distinct} distinct`,
            stats: shown.map((r) => ({ label: r.name, value: this.formatCount(r.count) })),
          };
        });
      },
    },
    async created() {
      try {
        ({ compounds: this.compounds, categories: this.categories } = await loadOncrefData());
      } catch (err) {
        console.error(err);
      }
    },
    methods: {
      // Placeholder until the data loads (or if it fails to)
      formatCount(n) {
        return n == null ? '—' : n.toLocaleString();
      },
    },
  };
</script>
