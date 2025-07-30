<template>
<page>
  <container-xs>
    <v-row>
      <v-col>
        <page-title>Data Analysis</page-title>
        <p class="text-body-1">
          PRISM sensitivity profiles are compared to deep multi-omic cell line characterization information in univariate analyses as well as multivariate predictive modeling algorithms to identify features that correlate with sensitivity.
        </p>
      </v-col>
    </v-row>  
  
    <v-row class="justify-center mb-4">
      <v-img style="max-width:800px;" :src="`${imgPath}${imgFiles[selectedIndex]}`" alt="Cell Line Collection"></v-img>
    </v-row>

    <v-row>
      <v-col>
        <p class="text-body-1">
          The Broad Institute feature sets used to understand the differences between sensitive and insensitive cell lines are from the 
          <a href="https://depmap.org/portal/" target="_blank">Cancer Dependency Map</a> include:
        </p>
        <ul class="text-body-1 ma-8 ml-12">
          <li>
            Cell line lineage and subtype, mutation status, gene expression, protein expression, copy number, methylation, and metabolomics
          </li>
          <li>
            Loss-of-function genetic perturbation data using CRISPR and shRNA
          </li>
          <li>
            PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing Hub)
          </li>
        </ul>
        <p class="text-body-1">
          A current list of datasets used for each of the feature analyses can be found on our
          <a href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md" target="_blank">GitHub repository</a>
          and is available for download in the 
          <a href="https://depmap.org/portal/data_page/?tab=allData" target="_blank">DepMap portal</a>.
        </p>
      </v-col>
    </v-row>
    </container-xs>
   
</page>
</template>

<script>

export default {
  name: 'DataAnalysis',
data() {
    return {
      selectedIndex: 1,
      imgFiles: [
        'data-analysis-11.png',
        'data-analysis-09.png',
        'data-analysis-10.png',

      ]
    };
  },
    computed:{
    imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/" : "../../public/images/"
        },
    },
  components: {

  },
}
  
</script>
  
<style scoped>
li{
  line-height:1.45em;
  margin-bottom: 0.5em;
}


</style>