<template>
<page>
  <container-sm>
    <page-title>Data</page-title>
    <section id="data-analysis-and-predictive-modeling">
    <h2 class="text-h3">Analysis and Predictive Modeling</h2>
    <p class="text-body-1">PRISM sensitivity profiles are compared to deep multi-omic cell line characterization information in univariate analyses as well as multivariate predictive modeling algorithms to identify features that correlate with sensitivity.
      <br><br>
      The Broad Institute feature sets used to understand the differences between sensitive and insensitive cell lines are from the <a href="https://depmap.org/portal/" target="_blank">Cancer Dependency Map</a> include:
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;" class="mr-0 text-black">mdi-circle</v-icon>
          </template>
          <v-list-item-title>
            Cell line lineage and subtype, mutation status, gene expression, protein expression, copy number, methylation, and metabolomics
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;" class="mr-0 text-black">mdi-circle</v-icon>
          </template>
          <v-list-item-title>
          Loss-of-function genetic perturbation data using CRISPR and shRNA 
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;" class="mr-0 text-black">mdi-circle</v-icon>
          </template>
          <v-list-item-title>
          PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing Hub)
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <br>
      A current list of datasets used for each of the feature analyses can be found on our <a href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md" target="_blank">GitHub repository</a>, and are available for download in the <a href="https://depmap.org/portal/data_page/?tab=allData">DepMap portal</a>.
    </p>
  </section>
  <section id="data-deliverables">
    <h2 class="text-h3">Deliverables</h2>
    <p class="text-body-1">We provide a complete analysis of your data via a secure data portal. Data analysis includes the viability of all 900 cell lines, metrics for the quality of the assay, univariate and multivariate feature set correlation analysis, and all the raw data from your test agents. Validation compounds run on each assay plate are shared also. See below for more details.
    </p>
    <section id="test-agent-data">
      <h3 class="text-h4">Test agent data</h3>
      <v-list>
        <v-list-subheader class="text-h5 text-primary font-weight-light">Standard deliverables</v-list-subheader>
        <!-- <v-list-subheader class="text-h5 text-subtitle-1 text-primary-accent-2 font-weight-bold">Standard deliverables:</v-list-subheader> -->
        <v-list-item
          title="Viability heatmap">
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em; line-height:1em;" class="mr-0 text-black">mdi-circle</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="Dose response curves"
        > 
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="Lineage enrichment"
          >
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="Mutation analysis"
        >
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="Baseline univariate and multivariate correlations with Dependency Map features and the Drug Repurposing PRISM data"
        >
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
      </v-list>
      <v-list lines="5">
        <v-list-subheader class="text-h5 text-primary font-weight-light">Combination deliverables</v-list-subheader>
        <v-list-item
          title="Standard devliverables for each single agent alone and in combination"
        >
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
        <v-list-item
          title="Analysis of the differential response between single agent and combination including synergy by dose"
        >
          <template v-slot:prepend>
            <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
          </template>
        </v-list-item>
      </v-list>
      <p class="text-body-1">All of your test agent data are downloadable as raw files as well as matrix versions formatted for upload into the DepMap data explorer tool. </p>
  </section>

  <section id="validation-data">
    <h3 class="text-h4">Validation data</h3>
    
    <v-list lines="auto">
        <!-- <v-list-subheader class="text-h5 text-secondary-darken-3 font-weight-medium">Single-agent small molecule (DMSO) screens (MTS)
        </v-list-subheader> -->
        <v-list-subheader class="text-h5 text-primary font-weight-light">Single-agent small molecule (DMSO) screens (MTS)
        </v-list-subheader>
        <v-list-item
          title="3 validation compounds run on each compound plate. Each screen will have multiple instances of our 3 validation compounds for your review in parallel:"
        >
          <v-list>
            <v-list-item
              title="AZ-628, a pan-RAF inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
            <v-list-item
              title="Imatinib, a BCR-ABL1 kinase, KIT, and PDGFR receptor tyrosine kinase inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
            <v-list-item
              title="Nutlin-3a, an inhibitor of the MDM2-p53 interaction"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
      <v-list lines="auto">
        <v-list-subheader class="text-h5 text-primary font-weight-light">Aqueous screens (APS)
        </v-list-subheader>
        <v-list-item
          title="2 validation compounds run in parallel:"
        >
          <v-list>
            <v-list-item
              title="Imatinib, a BCR-ABL1 kinase, KIT, and PDGFR receptor tyrosine kinase inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
            <v-list-item
              title="Palbociclib, a CDK4/6 inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
      <v-list lines="auto">
        <v-list-subheader class="text-h5 text-primary font-weight-light">Combination screens (CPS)
        </v-list-subheader>
        <v-list-item
          title="1 known synergistic combination run in parallel:"
        >
          <v-list>
            <v-list-item
              title="Temozolomide, a DNA alkylating agent + O6-benzylguanine, an alkyltransferase inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
      <v-list lines="auto">
        <v-list-subheader class="text-h5 text-primary font-weight-light">Extended Assay (EPS)
        </v-list-subheader>
        <v-list-item
          title="1 validation compound run in parallel:"
        >
          <v-list>
            <v-list-item
              title="KSQ4279 a USP1 inhibitor"
            >
              <template v-slot:prepend>
                <v-icon style="font-size: 0.6em;">mdi-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
  </section>
</section>


  </container-sm>
</page>
   
</template>

<script setup>
  
</script>
  
<style scoped>
.v-list{
  max-width:800px;
}
.v-list-item{
  min-height: auto;
}
</style>