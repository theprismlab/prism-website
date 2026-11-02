<template>
  <page>
    <page-header background="multi-focal-cool" narrow>
      <template #title> Oncology Reference </template>
      <p class="prism-text-headline-small mb-6">
        A pan-cancer reference of cancer therapeutics from the PRISM platform — 265 clinically
        relevant agents screened across 891 barcoded cancer cell lines spanning 29 tumor lineages,
        integrated with genome-wide CRISPR knockout profiles.
      </p>
      <stat-grid class="pb-8" :stats="overviewStats" />
    </page-header>
    <page-section width="narrow" class="manuscript-overlap">
      <v-card variant="outlined" class="manuscript-card">
        <h2 class="prism-text-headline-small manuscript-card__title">{{ manuscript.title }}</h2>
        <p class="prism-text-body-medium manuscript-card__authors mb-0">
          <span v-for="(author, i) in manuscript.authors" :key="author.name">
            {{ author.name }}<sup v-if="author.note">{{ author.note }}</sup
            ><template v-if="i < manuscript.authors.length - 1">, </template>
          </span>
        </p>
        <!-- <div class="manuscript-card__abstract">
          <h3 class="manuscript-card__heading">Abstract</h3>
          <p class="prism-text-body-large mb-0">
            Transformative therapeutic approaches are emerging to address cancer complexity and
            heterogeneity, underscoring the need for systematic drug evaluation methodologies to
            accelerate the translation to improved patient outcomes. Cell line profiling is a
            powerful tool; however, mechanistic interpretation requires large-scale collections with
            extensive molecular characterization. We screened the PRISM collection of 891 deeply
            characterized barcoded cancer cell lines spanning 29 lineages with 265 clinically
            relevant agents, encompassing small molecules, protein degraders, and biologics, to
            generate an Oncology Reference (OncRef) resource.
          </p>
        </div> -->
        <dl class="manuscript-card__meta">
          <div>
            <dt>Journal</dt>
            <dd>{{ manuscript.journal }}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{{ manuscript.date }}</dd>
          </div>
          <div>
            <dt>DOI</dt>
            <dd>
              <a :href="`https://doi.org/${manuscript.doi}`" target="_blank" rel="noopener">
                {{ manuscript.doi }}
              </a>
            </dd>
          </div>
        </dl>
        <div class="manuscript-card__actions">
          <v-btn
            :href="`https://doi.org/${manuscript.doi}`"
            target="_blank"
            rel="noopener"
            color="primary"
            variant="flat"
            rounded
            append-icon="mdi-arrow-top-right"
          >
            Read the manuscript
          </v-btn>
        </div>
      </v-card>
    </page-section>

    <page-section width="narrow">
      <section-overline gradient>About the dataset</section-overline>
      <prism-section-title>A Benchmark for Oncology Therapeutics</prism-section-title>
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
      <!-- Stats computed from the test agent CSV once it loads -->
      <template v-if="agents">
        <stat-grid :stats="agentClassStats" class="mt-4" />
        <stat-grid :stats="agentHighlightStats" class="mt-4" />
      </template>
    </page-section>
    <page-section width="narrow" class="mb-0 pb-0">
      <prism-section-title>Coverage at a Glance</prism-section-title>
    </page-section>
    <page-section v-if="agents" width="wide" class="mt-0 pt-0">
      <v-row dense class="mt-0 pt-0">
        <v-col cols="12">
          <v-card variant="outlined" class="pa-6">
            <v-card-title class="px-0">{{ parallelSets.title }}</v-card-title>
            <p class="text-body-2 text-medium-emphasis mb-4">{{ parallelSets.description }}</p>
            <parallel-sets-chart :rows="breakdownAgents" v-bind="parallelSets.chart" />
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-6 fill-height">
            <v-card-title class="px-0">{{ fieldLabel('TargetPathway') }}</v-card-title>
            <bar-chart
              bar-label="count"
              font-size="medium"
              :data="counts.targetPathway"
              :axis="targetPathwayAxis"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-6 fill-height">
            <v-card-title class="px-0">{{ fieldLabel('Modality') }}</v-card-title>
            <bar-chart
              font-size="medium"
              :data="counts.modality"
              :axis="ModalityAxis"
              bar-label="count"
            />
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card variant="outlined" class="pa-6 fill-height">
            <v-card-title class="px-0">{{ fieldLabel('HighestClinicalStage') }}</v-card-title>
            <bar-chart
              font-size="medium"
              :data="counts.clinicalStage"
              :axis="clinicalStageAxis"
              bar-label="count"
            />
          </v-card>
        </v-col>
        <!-- <v-col cols="12" md="12">
          <v-card variant="outlined" class="pa-6 fill-height">
            <v-card-title class="px-0">Target pathway by modality</v-card-title>
            <stacked-bar-chart
              font-size="medium"
              :data="counts.targetPathwayByModality"
              :axis="targetPathwayModalityAxis"
              bar-label="count"
              id="target-pathway-modality-chart"
              rowHeight="18"
            />
          </v-card>
        </v-col> -->
      </v-row>
    </page-section>

    <page-section width="narrow">
      <section-overline gradient>The Underlying Technology</section-overline>
      <prism-section-title
        >The PRISM Platform — Multiplexed Cancer Drug Screening at Scale</prism-section-title
      >
      <p class="prism-text-body-large">
        OncRef is built on PRISM (Profiling Relative Inhibition Simultaneously in Mixtures), a
        high-throughput multiplexed viability screening platform developed at the Broad Institute.
        PRISM introduces unique 24-nucleotide DNA barcodes into cancer cell lines, enabling hundreds
        of cell lines to be screened simultaneously in a single well — dramatically reducing cost
        and increasing throughput compared to traditional approaches.
      </p>
      <workflow-steps :steps="assayWorkflow" color="var(--v-teal-darken-1)" />
    </page-section>

    <page-section width="narrow">
      <section-overline gradient>Data Vignettes</section-overline>
      <prism-section-title>Key findings from the paper</prism-section-title>
      <p class="prism-text-body-large">
        OncRef goes beyond cataloging drug sensitivity. By correlating each compound's cell-line
        response profile with genome-wide CRISPR dependencies, the framework identifies on-target
        engagement, unexpected polypharmacology, and shared off-target liabilities. Click any figure
        to view it full-size.
      </p>
      <div class="case-studies">
        <image-card
          v-for="(study, i) in caseStudies"
          :key="study.title"
          v-bind="study"
          layout="horizontal"
          :reverse="i % 2 === 1"
        />
      </div>
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
  import { interpolateBlues, quantize, schemeDark2 } from 'd3';
  import DataExplorer from './manuscript/DataExplorer.vue';
  import BarChart from './manuscript/BarChart.vue';
  import ImageCard from './manuscript/ImageCard.vue';
  import { categoryColors } from '@/lib/charts/prism-charts.js';
  import StackedBarChart from './manuscript/StackedBarChart.vue';
  import ParallelSetsChart from './manuscript/ParallelSetsChart.vue';
  import StatGrid from './manuscript/StatGrid.vue';
  import { getOncRefData } from './manuscript/oncref.js';
  import { assayWorkflow } from './manuscript/assayWorkflow.js';
  import {
    OVERVIEW_STATS,
    AGENT_CLASS_STATS,
    AGENT_HIGHLIGHT_STATS,
    nonControlAgents,
    resolveStats,
    chartCounts,
  } from './manuscript/stats.js';
  import { fieldLabel, valueOrder } from './manuscript/fields.js';
  import { AGENT_PARALLEL_SETS } from './manuscript/agentParallelSets.js';
  import caseStudies from './manuscript/CaseStudies.json';
  import PageSection from '@/components/PageSection.vue';

  export default {
    name: 'OncologyReferenceManuscript',
    components: {
      BarChart,
      DataExplorer,
      ImageCard,
      ParallelSetsChart,
      StackedBarChart,
      StatGrid,
    },
    data() {
      return {
        // Test agent rows from the CSV, loaded in created()
        agents: null,
        // Copy and chart props for the parallel sets card (see agentParallelSets.js)
        parallelSets: AGENT_PARALLEL_SETS,
        // PLACEHOLDER: citation details for the OncRef paper. Replace with the real
        // title, author list, venue, date, DOI and links once the manuscript is public.
        manuscript: {
          title:
            'An Oncology Reference of clinically relevant therapeutics profiled across 891 cancer cell lines',
          authors: [
            { name: 'First Author', note: '1,2' },
            { name: 'Second Author', note: '1' },
            { name: 'Third Author', note: '3' },
            { name: 'Fourth Author', note: '1,2' },
            { name: 'Senior Author', note: '1,2,*' },
          ],
          journal: 'bioRxiv (preprint)',
          date: 'Month DD, YYYY',
          doi: '10.1101/2025.XX.XX.XXXXXX',
          pdfUrl: '#',
        },
        // Highlighted findings from the manuscript, one ImageCard each
        // ({ title, body, caption, category, image })
        caseStudies,
        // Dataset totals, matching the figures cited in the page text
        overviewStats: resolveStats(OVERVIEW_STATS),
        assayWorkflow: assayWorkflow,
      };
    },
    computed: {
      // Stat groups resolved against the CSV rows (see stats.js). Empty until
      // the data loads; the template guards on `agents`.
      agentClassStats() {
        return resolveStats(AGENT_CLASS_STATS, this.agents ?? []);
      },
      agentHighlightStats() {
        return resolveStats(AGENT_HIGHLIGHT_STATS, this.agents ?? []);
      },
      // Count data for every chart, keyed by chart (see chartCounts in stats.js)
      counts() {
        return this.agents ? chartCounts(this.agents) : {};
      },
      // Rows for the parallel sets chart: controls would add a stray strand
      breakdownAgents() {
        return this.agents ? nonControlAgents(this.agents) : [];
      },
      // Horizontal chart: x is the counts axis and y holds the pathways. The color
      // axis comes from the shared pathway colors, so the bars match the UMAP.
      targetPathwayAxis() {
        return {
          y: { title: 'Test agents', titlePosition: 'top' },
          color: categoryColors(this.agents, 'TargetPathway'),
        };
      },
      ModalityAxis() {
        return {
          y: { title: 'Test agents', titlePosition: 'top' },
          color: { range: [schemeDark2[0]] },
        };
      },
      clinicalStageAxis() {
        const stages = valueOrder('HighestClinicalStage');
        return {
          y: { title: 'Test agents', titlePosition: 'top' },
          x: { domain: stages },
          color: {
            domain: stages,
            range: quantize((t) => interpolateBlues(0.33 + 0.7 * t), stages.length),
          },
        };
      },
      // Same pathway bars, stacked and colored by modality
      targetPathwayModalityAxis() {
        return {
          x: { title: 'Test agents', titlePosition: 'top' },
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
    methods: { fieldLabel },
  };
</script>

<style scoped>
  /* Pull the card section up so the card overlaps the header gradient. The header
     has 64px of bottom padding, so -64px leaves roughly 32px of card over it
     (the section's own 32px top padding offsets the rest). */
  .manuscript-overlap {
    position: relative;
    z-index: 1;
    margin-top: -64px;
  }
  .manuscript-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px 32px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: var(--prism-radius-lg);
    /* Outlined cards are transparent, so give it a solid fill over the gradient */
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }
  .manuscript-card__title {
    margin: 0;
  }
  .manuscript-card__authors {
    color: rgba(var(--v-theme-on-surface), 0.72);
  }
  .manuscript-card__authors sup {
    font-size: 0.7em;
    margin-left: 1px;
  }
  .manuscript-card__abstract {
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .manuscript-card__heading {
    margin: 0 0 8px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }
  .manuscript-card__meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px 24px;
    margin: 8px 0 0;
    padding-top: 16px;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  }
  .manuscript-card__meta dt {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }
  .manuscript-card__meta dd {
    margin: 4px 0 0;
    font-size: 0.9375rem;
    overflow-wrap: anywhere;
  }
  .manuscript-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
  }

  .case-studies {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 16px;
  }

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
  /* #target-pathway-modality-chart {
    height: 300px;
  } */

  /* xs */
  @media (max-width: 600px) {
    .manuscript-card {
      padding: 20px 16px;
    }
    .nominations-cta {
      gap: 20px;
      padding: 20px 16px;
    }
  }
</style>
