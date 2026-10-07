<template>
  <page>
    <!-- TODO: manuscript details and lineage/subtype figure data are placeholders -->
    <page-section width="narrow" background="multi-focal-cool" :padding="14">
      <section-overline gradient>Broad Institute of MIT & Harvard · 2026</section-overline>
      <prism-page-title>{{ manuscript.title }}</prism-page-title>
      <p class="prism-text-body-large">{{ manuscript.summary }}</p>

      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn
          color="primary"
          rounded
          flat
          :href="manuscript.paperUrl"
          target="_blank"
          prepend-icon="mdi-file-document-outline"
          >Read the paper</v-btn
        >
        <v-btn
          variant="outlined"
          color="primary"
          rounded
          :href="manuscript.dataUrl"
          target="_blank"
          prepend-icon="mdi-download"
          >Download dataset</v-btn
        >
      </div>
    </page-section>

    <page-section width="wide">
      <stat-grid :stats="stats" />
    </page-section>

    <page-section width="narrow" :padding="4">
      <v-card class="details-card" elevation="0">
        <v-row>
          <v-col v-for="item in details" :key="item.label" cols="12" sm="6">
            <div class="detail-label">{{ item.label }}</div>
            <a v-if="item.href" :href="item.href" target="_blank" class="detail-value">{{
              item.value
            }}</a>
            <div v-else class="detail-value">{{ item.value }}</div>
          </v-col>
        </v-row>
      </v-card>
    </page-section>

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

    <page-section width="default" background="multi-focal-cool" :padding="12">
      <section-overline gradient>The underlying technology</section-overline>
      <prism-section-title>
        The PRISM platform: multiplexed cancer drug screening at scale
      </prism-section-title>
      <p class="prism-text-body-large mb-10" style="max-width: 760px">
        OncRef is built on PRISM (Profiling Relative Inhibition Simultaneously in Mixtures), a
        high-throughput multiplexed viability screening platform developed at the
        <a href="https://www.broadinstitute.org/" target="_blank" rel="noopener">Broad Institute</a
        >. PRISM introduces unique 24-nucleotide DNA barcodes into cancer cell lines, enabling
        hundreds of cell lines to be screened simultaneously in a single well — dramatically
        reducing cost and increasing throughput compared to traditional approaches.
      </p>

      <workflow-steps :steps="platformWorkflow" color="var(--v-teal-darken-1)" class="mb-10" />

      <div class="d-flex flex-wrap ga-2 mb-8">
        <v-chip
          v-for="feature in platformFeatures"
          :key="feature"
          color="teal-darken-1"
          variant="tonal"
          prepend-icon="mdi-circle-small"
        >
          {{ feature }}
        </v-chip>
      </div>

      <div class="d-flex flex-wrap ga-3">
        <v-btn color="primary" rounded to="/about-us/about-prism" append-icon="mdi-arrow-right"
          >Learn about PRISM</v-btn
        >
        <v-btn
          variant="outlined"
          color="primary"
          rounded
          href="https://depmap.org"
          target="_blank"
          append-icon="mdi-open-in-new"
          >DepMap portal</v-btn
        >
      </div>
    </page-section>

    <page-section width="wide" background="muted" :padding="10">
      <div class="text-center">
        <section-overline gradient>Dataset overview</section-overline>
        <prism-section-title>Lineage and subtype breakdown</prism-section-title>
        <p class="prism-text-body-large mx-auto mb-8" style="max-width: 560px">
          The OncRef Compounds dataset spans a broad range of cancer lineages and molecular subtypes
          profiled across the PRISM cell line collection.
        </p>
      </div>
      <subtype-breakdown :lineages="lineages" />
    </page-section>

    <page-section width="narrow" :padding="8">
      <prism-section-title>How to cite</prism-section-title>
      <div class="citation-block">{{ manuscript.citation }}</div>
    </page-section>
  </page>
</template>

<script>
  import { loadOncrefData, countWhere, countBy } from '@/utils/oncref';
  import StatGrid from './manuscript/StatGrid.vue';
  import StatTable from './manuscript/StatTable.vue';
  import SubtypeBreakdown from './manuscript/SubtypeBreakdown.vue';

  export default {
    name: 'OncologyReferenceManuscript',
    components: { StatGrid, StatTable, SubtypeBreakdown },
    data() {
      return {
        manuscript: {
          title: 'OncRef',
          summary:
            'A pan-cancer reference of cancer therapeutics from the PRISM platform — 265 clinically relevant agents screened across 891 barcoded cancer cell lines spanning 29 tumor lineages, integrated with genome-wide CRISPR knockout profiles.',
          authors: 'Author A, Author B, Author C, et al.',
          journal: 'Journal Name',
          publisher: 'Publisher Name',
          published: 'January 1, 2026',
          doi: '10.0000/placeholder.0000',
          paperUrl: '', // TBD
          dataUrl: '#',
          citation:
            'Author A, Author B, Author C, et al. OncRef Compounds: a PRISM reference dataset of oncology compounds. Journal Name. 2026. doi:10.0000/placeholder.0000',
        },
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
        // "About the dataset" section
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
        // "PRISM platform" section
        platformWorkflow: [
          {
            title: 'Pool',
            caption:
              '891 barcoded cell lines assembled into ~25 assay-ready pools (~25 lines/pool)',
            icon: 'mdi-dna',
          },
          {
            title: 'Treat',
            caption:
              '265 agents × 8 doses × 3 replicates across 39 pools and 26 plates, 5-day exposure',
            icon: 'mdi-pill',
          },
          {
            title: 'Collapse',
            caption: 'Pool cells down to ~500 per well, lyse, and extract genomic DNA',
            icon: 'mdi-microscope',
          },
          {
            title: 'Amplify',
            caption: 'Biotinylated PCR enriches barcode sequences from genomic DNA',
            icon: 'mdi-repeat',
          },
          {
            title: 'Detect',
            caption:
              "Luminex bead hybridization reads each barcode's abundance — a proxy for cell viability",
            icon: 'mdi-chart-bar',
          },
        ],
        platformFeatures: [
          '891 barcoded cancer cell lines',
          '29 tumor lineages',
          '265 pharmacological agents',
          '>100K DepMap feature associations per drug',
          'Integrated with DepMap CRISPR · RNAi · Copy Number · Expression · Fusion · Mutation',
        ],
        lineages: [
          {
            name: 'Lung',
            color: 'var(--v-blue-darken-1)',
            subtypes: [
              { name: 'Non-small cell lung cancer', count: 92 },
              { name: 'Small cell lung cancer', count: 34 },
              { name: 'Mesothelioma', count: 12 },
            ],
          },
          {
            name: 'Hematopoietic',
            color: 'var(--v-red-accent-2)',
            subtypes: [
              { name: 'Acute myeloid leukemia', count: 38 },
              { name: 'B-cell lymphoma', count: 29 },
              { name: 'Multiple myeloma', count: 21 },
              { name: 'T-cell leukemia', count: 14 },
            ],
          },
          {
            name: 'Skin',
            color: 'var(--v-amber-accent-4)',
            subtypes: [
              { name: 'Cutaneous melanoma', count: 48 },
              { name: 'Uveal melanoma', count: 9 },
            ],
          },
          {
            name: 'Breast',
            color: 'var(--v-pink-accent-2)',
            subtypes: [
              { name: 'HR+ / HER2-', count: 22 },
              { name: 'HER2+', count: 11 },
              { name: 'Triple negative', count: 24 },
            ],
          },
          {
            name: 'CNS / Brain',
            color: 'var(--v-deep-purple-accent-2)',
            subtypes: [
              { name: 'Glioblastoma', count: 36 },
              { name: 'Medulloblastoma', count: 8 },
              { name: 'Astrocytoma', count: 7 },
            ],
          },
          {
            name: 'Bowel',
            color: 'var(--v-teal-accent-4)',
            subtypes: [
              { name: 'Colorectal adenocarcinoma', count: 44 },
              { name: 'Small bowel', count: 3 },
            ],
          },
          {
            name: 'Pancreas',
            color: 'var(--v-orange-darken-1)',
            subtypes: [
              { name: 'Pancreatic adenocarcinoma', count: 36 },
              { name: 'Neuroendocrine', count: 4 },
            ],
          },
          {
            name: 'Ovary',
            color: 'var(--v-cyan-darken-1)',
            subtypes: [
              { name: 'High-grade serous', count: 24 },
              { name: 'Clear cell', count: 7 },
              { name: 'Endometrioid', count: 5 },
            ],
          },
        ],
      };
    },
    computed: {
      stats() {
        return [
          {
            value: this.formatCount(this.compounds?.length),
            label: 'Agents screened',
            color: 'var(--v-blue-darken-1)',
          },
          // Not in the compound data
          { value: '891', label: 'Cancer cell lines', color: 'var(--v-blue-darken-1)' },
          { value: '29', label: 'Tumor lineages', color: 'var(--v-teal-darken-1)' },
          { value: '8 × 3', label: 'Dose × replicate', color: 'var(--v-orange-darken-1)' },
          { value: '172', label: 'Novel to public data', color: 'var(--v-deep-purple-accent-2)' },
        ];
      },
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
      details() {
        const m = this.manuscript;
        return [
          { label: 'Journal', value: m.journal },
          { label: 'Publisher', value: m.publisher },
          { label: 'Published', value: m.published },
          { label: 'DOI', value: m.doi, href: m.paperUrl },
          { label: 'Authors', value: m.authors },
        ];
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

<style scoped>
  .details-card {
    border: 1px solid #e0e0e0;
    border-left: 4px solid var(--v-primary);
    border-radius: 12px;
    padding: 24px 32px;
  }

  .detail-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--v-grey-darken-1);
    margin-bottom: 2px;
  }

  .detail-value {
    font-size: 1rem;
    color: var(--v-grey-darken-3);
    word-break: break-word;
  }

  a.detail-value {
    color: var(--v-primary);
  }

  .citation-block {
    border-left: 3px solid #e0e0e0;
    background: #fcfcfc;
    padding: 16px 20px;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--v-grey-darken-2);
  }

  /* xs */
  @media (max-width: 600px) {
    .details-card {
      padding: 20px 16px;
    }
  }
</style>
