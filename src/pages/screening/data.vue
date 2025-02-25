<template>
<page>
  <container-sm>
    <page-title>Data</page-title>
    <section id="analysis-and-predictive-modeling">
      <h2 class="text-h3">Analysis and Predictive Modeling</h2>
      <p class="text-body-1">PRISM sensitivity profiles are compared to deep multi-omic cell line characterization information in univariate analyses as well as multivariate predictive modeling algorithms to identify features that correlate with sensitivity.
        <br><br>
        The Broad Institute feature sets used to understand the differences between sensitive and insensitive cell lines are from the 
        <icon-link href="https://depmap.org/portal/" text="Cancer Dependency Map"/> include:
      </p>
      <ul class="ml-10 text-body-2">
        <li>Cell line lineage and subtype, mutation status, gene expression, protein expression, copy number, methylation, and metabolomics</li>
        <li>Loss-of-function genetic perturbation data using CRISPR and shRNA</li>
        <li>PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing Hub)</li>
      </ul>
      <p class="text-body-1">
      A current list of datasets used for each of the feature analyses can be found on our 
      <icon-link href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md" text="GitHub repository"/>, and are available for download in the <icon-link href="https://depmap.org/portal/data_page/?tab=allData" text="DepMap portal"/>.
      </p>
    </section>
    <section id="deliverables">
      <h2 class="text-h3">Deliverables</h2>
      <p class="text-body-1">We provide a complete analysis of your data via a secure data portal. Data analysis includes the viability of all 900 cell lines, metrics for the quality of the assay, univariate and multivariate feature set correlation analysis, and all the raw data from your test agents. Validation compounds run on each assay plate are shared also. See below for more details.
      </p>
      <section id="test-agent-data">
        <h3 class="text-h4">Test agent data</h3>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Standard deliverables</h4>
          <ul class="ml-10 text-body-2">
            <li>Viability heatmap</li>
            <li>Dose response curves</li>
            <li>Lineage enrichment</li>
            <li>Mutation analysis</li>
            <li>Baseline univariate and multivariate correlations with Dependency Map features and the Drug Repurposing PRISM data</li>
          </ul>  
        </div>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Combination deliverables</h4>
          <ul class="ml-10 text-body-2">
            <li>Standard devliverables for each single agent alone and in combination</li>
            <li>Analysis of the differential response between single agent and combination including synergy by dose</li>
          </ul>
        </div>
        <p class="text-body-2">All of your test agent data are downloadable as raw files as well as matrix versions formatted for upload into the DepMap data explorer tool.</p>
      </section>
      <section id="validation-data">
        <h3 class="text-h4">Validation data</h3>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Single-agent small molecule (DMSO) screens (MTS)</h4>
          <p class="text-body-1">3 validation compounds run on each compound plate. Each screen will have multiple instances of our 3 validation compounds for your review in parallel:
          </p>
          <ul class="ml-10 text-body-2">
            <li>AZ-628, a pan-RAF inhibitor</li>
            <li>Imatinib, a BCR-ABL1 kinase, KIT, and PDGFR receptor tyrosine kinase inhibitor</li>
            <li>Nutlin-3a, an inhibitor of the MDM2-p53 interaction</li>
          </ul>  
        </div>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Aqueous screens (APS)</h4>
          <p class="text-body-1">2 validation compounds run in parallel:</p>
          <ul class="ml-10 text-body-2">
            <li>Imatinib, a BCR-ABL1 kinase, KIT, and PDGFR receptor tyrosine kinase inhibitor</li>
            <li>Palbociclib, a CDK4/6 inhibitor</li>
          </ul>  
        </div>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Combination screens (CPS)</h4>
          <p class="text-body-1">1 known synergistic combination run in parallel:</p>
          <ul class="ml-10 text-body-2">
            <li>Temozolomide, a DNA alkylating agent + O6-benzylguanine, an alkyltransferase inhibitor</li>
          </ul>  
        </div>
        <div class="mt-6 mb-6">
          <h4 class="text-h5 text-primary font-weight-regular mt-4 mb-2">Extended Assay (EPS)</h4>
          <p class="text-body-1">1 validation compound run in parallel:</p>
          <ul class="ml-10 text-body-2">
            <li>KSQ4279 a USP1 inhibitor</li>
          </ul>  
        </div>
      </section>
  </section>
</container-sm>
</page>
</template>

<script setup>
  
</script>
  
<style scoped>
li{
  line-height:1.45em;
  margin-bottom: 0.5em;
}

</style>