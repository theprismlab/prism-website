<template>
  <page>
    <page-header background="multi-focal-cool" narrow>
      <template #title> Oncology Reference </template>
      <p class="prism-text-headline-medium">
        A pan-cancer reference of cancer therapeutics from the PRISM platform — 265 clinically
        relevant agents screened across 891 barcoded cancer cell lines spanning 29 tumor lineages,
        integrated with genome-wide CRISPR knockout profiles.
      </p>
    </page-header>
    <page-section width="narrow">
      <section-overline gradient>Summary</section-overline>
      <p class="prism-text-body-large">
        Transformative therapeutic approaches are emerging to address cancer complexity and
        heterogeneity, underscoring the need for systematic drug evaluation methodologies to
        accelerate the translation to improved patient outcomes. Cell line profiling is a powerful
        tool; however, mechanistic interpretation requires large-scale collections with extensive
        molecular characterization. We screened the PRISM collection of 891 deeply characterized
        barcoded cancer cell lines spanning 29 lineages with 265 clinically relevant agents,
        encompassing small molecules, protein degraders, and biologics, to generate an Oncology
        Reference (OncRef) resource.
      </p>
    </page-section>
    <page-section width="narrow">
      <stat-grid :stats="stats" />
    </page-section>
    <page-section v-if="agents" width="narrow">
      <v-card variant="outlined" class="pa-6">
        <v-card-title class="px-0">Previously screened</v-card-title>
        <bar-chart
          font-size="small"
          :data="previouslyScreenedCounts"
          :axis="previouslyScreenedAxis"
        />
      </v-card>
    </page-section>
    <page-section v-if="agents" width="narrow">
      <v-card variant="outlined" class="pa-6">
        <v-card-title class="px-0">Target pathway</v-card-title>
        <bar-chart
          orientation="horizontal"
          font-size="small"
          :data="targetPathwayCounts"
          :axis="targetPathwayAxis"
        />
      </v-card>
    </page-section>
    <page-section v-if="agents" width="narrow">
      <v-card variant="outlined" class="pa-6">
        <v-card-title class="px-0">Target pathway by modality</v-card-title>
        <stacked-bar-chart
          font-size="small"
          :data="targetPathwayModalityCounts"
          :axis="targetPathwayModalityAxis"
        />
      </v-card>
    </page-section>
    <page-section width="narrow">
      <p>
        Most inhibitory molecules produced effects consistent with genetic inactivation of their
        annotated targets. The strength of these associations frequently aligns with differential
        clinical trial outcomes. Beyond primary target characterization, we develop a new framework
        to quantify specificity, selectivity, on-target polypharmacology, and non-target effects,
        identifying unintended targets and mediators of toxicity modulating cellular response. This
        resource establishes a benchmark for oncology therapeutics, providing a scalable framework
        for evaluating new targets and modalities.
      </p>
    </page-section>
    <page-section width="narrow">
      <section-overline gradient>About the dataset</section-overline>
      <p class="prism-text-body-large">
        OncRef is generated using
        <router-link to="/about-us/about-prism" target="_blank">PRISM</router-link> (Profiling
        Relative Inhibition Simultaneously in Mixtures), a high-throughput drug screening platform
        developed at the Broad Institute that introduces unique 24-nucleotide DNA barcodes into
        individual cancer cell lines, enabling pooled multiplexed screening. Each compound was
        profiled in triplicate 8-point dose-response. <br /><br />
        The collection encompasses 172 agents (65%) not represented in other large-scale public
        datasets, spanning small molecules, protein degraders (PROTACs), and biologics including
        antibody-drug conjugates. Parallel genome-wide CRISPR knockout screens enable a new
        analytical framework that deconvolves polypharmacology, off-target effects, and on-target
        selectivity.
      </p>
    </page-section>

    <page-section width="narrow">
      <prism-section-title>Screening workflow</prism-section-title>
      <workflow-steps :steps="assayWorkflow" color="var(--v-teal-darken-1)" />
    </page-section>

    <page-section width="wide">
      <data-explorer />
    </page-section>

    <page-section width="narrow">
      <v-card variant="outlined" class="nominations-cta">
        <div class="nominations-cta__content">
          <section-overline gradient>Nominations</section-overline>
          <h2 class="prism-text-display-small mt-1 mb-3">Help grow the Oncology Reference</h2>
          <p class="prism-text-body-large mb-0">
            We are excited to accept nominations from all researchers to continue to grow our
            Oncology Reference library. Based on our in-process manuscript to create a living
            resource of Oncology Reference test agents, the PRISM Team will be screening 150 new
            test agents per year, composed of small molecules, antibodies, and ADCs.
          </p>
        </div>
        <v-btn
          to="/oncology-reference/nominations"
          color="primary"
          variant="flat"
          size="large"
          append-icon="mdi-arrow-right"
          class="align-self-start"
        >
          Learn more about nominations
        </v-btn>
      </v-card>
    </page-section>
  </page>
</template>

<script>
  import DataExplorer from './manuscript/DataExplorer.vue';
  import BarChart from './manuscript/BarChart.vue';
  import { countBy } from './manuscript/barChart.js';
  import StackedBarChart from './manuscript/StackedBarChart.vue';
  import { countByStacked } from './manuscript/stackedBarChart.js';
  import StatGrid from './manuscript/StatGrid.vue';
  import { categoryColors } from './manuscript/chartColors.js';
  import { getOncRefData } from './manuscript/oncref.js';

  export default {
    name: 'OncologyReferenceManuscript',
    components: { BarChart, DataExplorer, StackedBarChart, StatGrid },
    data() {
      return {
        // Test agent rows from the CSV, loaded in created()
        agents: null,
        // Axis config for the bar charts (x, y and color, each with title, domain,
        // range and ticks; see BarChart.vue). Anything left out uses the chart default.
        previouslyScreenedAxis: {
          x: { title: 'Previously screened' },
          y: { title: 'Test agents' },
        },
        // Dataset totals, matching the figures cited in the page text
        stats: [
          { value: 265, label: 'Test agents', color: 'var(--v-teal-darken-1)' },
          { value: 891, label: 'Cell lines', color: 'var(--v-blue-darken-1)' },
          { value: 29, label: 'Lineages', color: 'var(--v-purple-darken-1)' },
        ],
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
      // Chart data: counts of the test agent rows, in the shape each chart takes
      previouslyScreenedCounts() {
        return countBy(this.agents, 'PreviouslyScreened');
      },
      targetPathwayCounts() {
        return countBy(this.agents, 'TargetPathway', { sort: 'descending' });
      },
      targetPathwayModalityCounts() {
        return countByStacked(this.agents, 'TargetPathway', 'Modality', { sort: 'descending' });
      },
      // Horizontal chart: x is the counts axis and y holds the pathways. The color
      // axis comes from the shared pathway colors, so the bars match the UMAP.
      targetPathwayAxis() {
        return {
          x: { title: 'Test agents' },
          y: { title: 'Target pathway' },
          color: categoryColors(this.agents, 'TargetPathway'),
        };
      },
      // Same pathway bars, stacked and colored by modality
      targetPathwayModalityAxis() {
        return {
          x: { title: 'Test agents' },
          y: { title: 'Target pathway' },
          color: { ...categoryColors(this.agents, 'Modality'), title: 'Modality' },
        };
      },
    },
    async created() {
      try {
        this.agents = (await getOncRefData()).agents;
      } catch (err) {
        // The data explorer reports load failures; the charts just stay hidden
        console.error(err);
      }
    },
    methods: {},
  };
</script>

<style scoped>
  .nominations-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 28px 32px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-on-surface), 0.035) 0%,
      rgba(var(--v-theme-on-surface), 0.015) 100%
    );
  }
  .nominations-cta__content {
    max-width: 640px;
  }

  /* xs */
  @media (max-width: 600px) {
    .nominations-cta {
      gap: 20px;
      padding: 20px 16px;
    }
  }
</style>
