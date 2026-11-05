<template>
  <page>
    <manuscript-header />
    <page-section width="narrow">
      <manuscript-stat-cards class="mb-12" />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="narrow">
      <prism-section-title gradient>Summary</prism-section-title>
      <p class="prism-text-body-large">
        Transformative therapeutic approaches are emerging to address cancer complexity and
        heterogeneity, underscoring the need for systematic drug evaluation methodologies to
        accelerate the translation to improved patient outcomes. Cell line profiling is a powerful
        tool; however, mechanistic interpretation requires large-scale collections with extensive
        molecular characterization. We screened the PRISM collection of 891 deeply characterized
        barcoded cancer cell lines spanning 29 lineages with 396 clinically relevant agents,
        encompassing small molecules, protein degraders, and biologics, to generate an Oncology
        Reference (OncRef) resource. Most molecules produced effects consistent with modulation of
        their annotated targets. Beyond primary target characterization, we develop a new framework
        to quantify specificity, selectivity, on-target polypharmacology, and non-target effects,
        identifying unintended targets and mediators of toxicity modulating cellular response. This
        resource establishes a benchmark for oncology therapeutics, providing a scalable framework
        for evaluating new targets and modalities.
      </p>
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="default">
      <h3 class="prism-text-headline-medium mb-8" style="text-align: center">
        OncRef composition and association with multiomic features
      </h3>
      <manuscript-figures />
    </page-section>
    <page-section width="default">
      <section-overline gradient>About the dataset</section-overline>
      <prism-section-title gradient>A Benchmark for Oncology Therapeutics</prism-section-title>
      <agent-parallel-sets />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="default">
      <section-overline gradient>The Underlying Technology</section-overline>
      <prism-section-title gradient
        >The PRISM Platform — Multiplexed Cancer Drug Screening at Scale</prism-section-title
      >
      <p class="prism-text-body-large">
        OncRef is built on PRISM (Profiling Relative Inhibition Simultaneously in Mixtures), a
        high-throughput multiplexed viability screening platform developed at the Broad Institute.
        PRISM introduces unique 24-nucleotide DNA barcodes into cancer cell lines, enabling hundreds
        of cell lines to be screened simultaneously in a single well — dramatically reducing cost
        and increasing throughput compared to traditional approaches.
      </p>
      <assay-workflow class="mt-12" />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="default">
      <section-overline gradient>Data Vignettes</section-overline>
      <prism-section-title>Key findings from the paper</prism-section-title>
      <p class="prism-text-body-large">
        OncRef goes beyond cataloging drug sensitivity. By correlating each compound's cell-line
        response profile with genome-wide CRISPR dependencies, the framework identifies on-target
        engagement, unexpected polypharmacology, and shared off-target liabilities.
      </p>
      <manuscript-vignettes class="mt-12" />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="default">
      <section-overline gradient>Overview</section-overline>
      <prism-section-title>At-a-glance</prism-section-title>
      <p class="prism-text-body-large">[TEXT]</p>
      <manuscript-story-cards class="mt-12" />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
    <page-section width="wide">
      <h3 class="prism-text-headline-medium mb-8" style="text-align: center">
        Explore the OncRef similarity map
      </h3>
      <agent-explorer />
    </page-section>
    <!-- -------------------------------------------------------
      SECTION 
      ------------------------------------------------------- -->
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
  import AgentExplorer from './manuscript/AgentExplorer.vue';
  import AssayWorkflow from './manuscript/AssayWorkflow.vue';
  import ManuscriptFigures from './manuscript/ManuscriptFigures.vue';
  import ManuscriptStoryCards from './manuscript/ManuscriptStoryCards.vue';
  import ManuscriptStatCards from './manuscript/ManuscriptStatCards.vue';
  import ManuscriptHeader from './manuscript/ManuscriptHeader.vue';
  import ManuscriptVignettes from './manuscript/ManuscriptVignettes.vue';
  import AgentParallelSets from './manuscript/AgentParallelSets.vue';
  import SectionOverline from '@/components/SectionOverline.vue';

  export default {
    name: 'OncologyReferenceManuscript',
    components: {
      AgentExplorer,
      ManuscriptFigures,
      ManuscriptHeader,
      AssayWorkflow,
      ManuscriptStoryCards,
      ManuscriptStatCards,
      ManuscriptVignettes,
      AgentParallelSets,
    },
    data() {
      return {};
    },
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
