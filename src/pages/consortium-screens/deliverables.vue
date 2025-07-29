<template>
<page>
  <container-xs>
    <page-title>Deliverables</page-title>
    <p class="text-body-1">
      We provide a complete analysis of your data via a secure data portal. Data analysis includes the viability of all 900 cell lines, metrics for the quality of the assay, univariate and multivariate feature set correlation analysis, and all the raw data from your test agents. Validation compounds run on each assay plate are shared also. See below for more details.
    </p>
    <section class="mt-12 mb-6">
      <h2 class="text-h3">Test agent data</h2>
      <v-row class="mt-4 mb-4">
        <v-col cols="12" xs="12" sm="12" md="8">
          <div>
            <deliverable-card title="Standard deliverables" :icon="{ path: mdiChartBoxOutline, size: 28}">
              <ul>
                <li>Viability heatmap</li>
                <li>Dose response curves</li>
                <li>Lineage enrichment</li>
                <li>Mutation analysis</li>
                <li>Baseline univariate and multivariate correlations with Dependency Map features and the Drug Repurposing PRISM data</li>
              </ul>  
            </deliverable-card>
            <deliverable-card title="Combination deliverables" :icon="{ path: mdiChartBoxMultipleOutline, size: 28}">
              <ul>
                <li>Standard deliverables for each single agent alone and in combination</li>
                <li>Analysis of the differential response between single agent and combination, including synergy by dose</li>
              </ul>  
            </deliverable-card>
          </div>
        </v-col>
      </v-row>  
      <p class="text-body-1">All of your test agent data is downloadable as raw files as well as matrix versions formatted for upload into the DepMap data explorer tool.</p>
    </section>

    <section class="mt-12 mb-6">
      <h2 class="text-h3">Validation compound data</h2>
      <p class="text-body-1">
        
      For each PRISM screen, we run the same validation compounds to assess data quality over time, between compound plates, and to ensure biomarker analysis is identifying similar correlations over time. Public validation compound data to explore the type of data you can expect can be assessed on the <a href="http://www.theprismlab.org/portal/" target="_blank">PRISM Portal</a>.
      </p>
    </section>

    <section class="mt-12 mb-6">
      <h2 class="text-h3">Secure PRISM Portal</h2>
      <p class="text-body-1">
        Screening data is delivered to collaborators on our secure PRISM Portal. Each project will assign one <i>Data Access Manager</i> who is solely responsible for granting data access to other team members through the Portal. 
      </p>
    </section>
  </container-xs>
</page>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFileChartOutline } from '@mdi/js';
import { mdiChartBoxOutline } from '@mdi/js';
import { mdiChartBoxMultipleOutline } from '@mdi/js';
import { mdiDna } from '@mdi/js';

export default {
  name: "my-component",
  components: {
    SvgIcon
  },
  data() {
    return {
      mdiFileChartOutline: mdiFileChartOutline,
      mdiChartBoxOutline: mdiChartBoxOutline,
      mdiChartBoxMultipleOutline: mdiChartBoxMultipleOutline,
      mdiDna: mdiDna
    }
  }
}
</script>

  
<style scoped>
    .deliverable-card {
        border: 1px solid var(--v-secondary-lighten-4);
    }

</style>