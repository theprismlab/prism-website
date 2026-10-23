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

        <prism-sub-section-title class="mb-4">Screening workflow</prism-sub-section-title>
        <workflow-steps :steps="assayWorkflow" color="var(--v-teal-darken-1)" class="mb-10" />
      </app-container>
    </page-section>

    <page-section width="wide" :padding="10">
      <data-explorer />
    </page-section>
  </page>
</template>

<script>
  import DataExplorer from './manuscript/DataExplorer.vue';

  export default {
    name: 'OncologyReferenceManuscript',
    components: { DataExplorer },
    data() {
      return {
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
    computed: {},
    async created() {},
    methods: {},
  };
</script>
