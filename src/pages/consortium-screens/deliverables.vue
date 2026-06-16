<template>
  <page>
    <app-container>
      <prism-page-title>Deliverables</prism-page-title>
      <p class="prism-text-body-1">
        We provide a complete analysis of your data via a secure data portal. Data analysis includes
        the viability of all 900 cell lines, metrics for the quality of the assay, univariate and
        multivariate feature set correlation analysis, and all the raw data from your test agents.
        Validation compounds run on each assay plate are shared also. See below for more details.
      </p>
      <section class="page-section">
        <h2 class="prism-text-h3">Test agent data</h2>
        <deliverable-card
          class="mt-8"
          title="Standard deliverables"
          :icon="{ path: mdiChartBoxOutline, size: 28 }"
        >
          <ul>
            <li>Viability heatmap</li>
            <li>Dose response curves</li>
            <li>Lineage enrichment</li>
            <li>Mutation analysis</li>
            <li>
              Baseline univariate and multivariate correlations with Dependency Map features and the
              Drug Repurposing PRISM data
            </li>
          </ul>
        </deliverable-card>
        <deliverable-card
          class="mb-8"
          title="Combination deliverables"
          :icon="{ path: mdiChartBoxMultipleOutline, size: 28 }"
        >
          <ul>
            <li>Standard deliverables for each single agent alone and in combination</li>
            <li>
              Analysis of the differential response between single agent and combination, including
              synergy by dose
            </li>
          </ul>
        </deliverable-card>
        <p class="prism-text-body-1">
          All of your test agent data is downloadable as raw files as well as matrix versions
          formatted for upload into the DepMap data explorer tool.
        </p>
      </section>

      <section class="page-section">
        <h2 class="prism-text-h3">Validation compound data</h2>
        <p class="prism-text-body-1">
          For each PRISM screen, we run the same validation compounds to assess data quality over
          time, between compound plates, and to ensure biomarker analysis is identifying similar
          correlations over time. Public validation compound data can be accessed on the
          <a
            href="https://www.theprismlab.org/portal/projects/MTS026/MTS026_VALIDATION_COMPOUNDS/compounds"
            target="_blank"
            >PRISM Portal</a
          >.
        </p>
      </section>

      <section class="page-section">
        <h2 class="prism-text-h3">Secure PRISM Portal</h2>
        <p class="prism-text-body-1">
          Screening data is delivered to collaborators on our secure PRISM Portal. Each project will
          assign one <i>Data Access Manager</i> who is solely responsible for granting data access
          to other team members through the Portal.
        </p>
      </section>
    </app-container>
  </page>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiChartBoxOutline } from '@mdi/js';
  import { mdiChartBoxMultipleOutline } from '@mdi/js';
  import DeliverableCard from './deliverables/DeliverableCard.vue';

  export default {
    name: 'Deliverables',
    components: {
      SvgIcon,
      DeliverableCard,
    },
    data() {
      return {
        mdiChartBoxOutline: mdiChartBoxOutline,
        mdiChartBoxMultipleOutline: mdiChartBoxMultipleOutline,
      };
    },
  };
</script>

<style scoped>
  .deliverable-card {
    border: 1px solid var(--v-secondary-lighten-4);
  }
</style>
