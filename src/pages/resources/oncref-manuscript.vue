<template>
  <page>
    <!-- TODO: manuscript details and lineage/subtype figure data are placeholders -->
    <app-container narrow>
      <section-overline>Manuscript</section-overline>
      <prism-page-title>{{ manuscript.title }}</prism-page-title>
      <p class="prism-text-body-large">{{ manuscript.summary }}</p>

      <div class="d-flex flex-wrap ga-3 mt-6">
        <v-btn
          color="primary"
          rounded
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
    </app-container>

    <page-section>
      <app-container wide>
        <stat-grid :stats="stats" />
      </app-container>
    </page-section>

    <page-section :padding="4">
      <app-container narrow>
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
      </app-container>
    </page-section>

    <page-section :padding="10">
      <app-container narrow>
        <section-overline>About the dataset</section-overline>
        <prism-section-title>A benchmark for oncology therapeutics</prism-section-title>
        <p class="prism-text-body-large mb-4">
          OncRef is generated using
          <router-link to="/about-us/about-prism">PRISM</router-link> (Profiling Relative
          Inhibition Simultaneously in Mixtures), a high-throughput drug screening platform
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
        <prism-timeline
          :steps="workflow"
          :variant="$vuetify.display.smAndDown ? 'vertical' : 'horizontal'"
        />
      </app-container>
    </page-section>

    <page-section background="muted" :padding="10">
      <app-container wide>
        <div class="text-center">
          <section-overline>Dataset overview</section-overline>
          <prism-section-title>Lineage and subtype breakdown</prism-section-title>
          <p class="prism-text-body-large mx-auto mb-8" style="max-width: 560px">
            The OncRef Compounds dataset spans a broad range of cancer lineages and molecular
            subtypes profiled across the PRISM cell line collection.
          </p>
        </div>
        <subtype-breakdown :lineages="lineages" />
      </app-container>
    </page-section>

    <app-container narrow class="my-8">
      <prism-section-title>How to cite</prism-section-title>
      <div class="citation-block">{{ manuscript.citation }}</div>
    </app-container>
  </page>
</template>

<script>
  import StatGrid from './oncref-manuscript/StatGrid.vue';
  import SubtypeBreakdown from './oncref-manuscript/SubtypeBreakdown.vue';

  export default {
    name: 'OncrefManuscript',
    components: { StatGrid, SubtypeBreakdown },
    data() {
      return {
        manuscript: {
          title: 'OncRef Compounds',
          summary:
            'A reference dataset of oncology compounds profiled across hundreds of barcoded cancer cell lines using PRISM multiplexed viability screening, enabling systematic comparison of drug sensitivity across lineages and subtypes.',
          authors: 'Author A, Author B, Author C, et al.',
          journal: 'Journal Name',
          publisher: 'Publisher Name',
          published: 'January 1, 2026',
          doi: '10.0000/placeholder.0000',
          paperUrl: 'https://doi.org/10.0000/placeholder.0000',
          dataUrl: '#',
          citation:
            'Author A, Author B, Author C, et al. OncRef Compounds: a PRISM reference dataset of oncology compounds. Journal Name. 2026. doi:10.0000/placeholder.0000',
        },
        stats: [
          { value: '265', label: 'Agents screened', color: 'var(--v-blue-darken-1)' },
          { value: '891', label: 'Cancer cell lines', color: 'var(--v-blue-darken-1)' },
          { value: '29', label: 'Tumor lineages', color: 'var(--v-teal-darken-1)' },
          { value: '8 × 3', label: 'Dose × replicate', color: 'var(--v-orange-darken-1)' },
          { value: '172', label: 'Novel to public data', color: 'var(--v-deep-purple-accent-2)' },
        ],
        agentClasses: [
          { value: '211', label: 'Targeted small molecules', color: 'var(--v-blue-darken-1)' },
          { value: '23', label: 'Biologics / ADCs', color: 'var(--v-orange-darken-1)' },
          { value: '26', label: 'Cytotoxic agents', color: 'var(--v-red-darken-1)' },
          { value: '18', label: 'PROTAC degraders', color: 'var(--v-deep-purple-accent-2)' },
        ],
        workflow: [
          { title: 'Pool', caption: '891 barcoded cell lines, ~25 lines per pool' },
          { title: 'Treat', caption: '265 agents × 8 doses × 3 replicates' },
          { title: 'Incubate', caption: '5-day exposure across 39 pools × 26 plates' },
          { title: 'Amplify', caption: 'Biotinylated PCR of barcodes' },
          { title: 'Detect', caption: 'Luminex bead fluorescence readout' },
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
