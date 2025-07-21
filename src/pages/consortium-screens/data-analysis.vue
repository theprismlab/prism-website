<template>
<page>
  <container-sm>
    <v-row>
      <v-col>
        <page-title>Data Analysis</page-title>
        <p class="text-body-1">
          PRISM sensitivity profiles are compared to deep multi-omic cell line characterization information in univariate analyses as well as multivariate predictive modeling algorithms to identify features that correlate with sensitivity.
        </p>

      </v-col>
    
    </v-row>  
  



    <v-row class="justify-center">
        <v-img  style="max-width:800px;" :src="`${imgPath}data-analysis-graphic.png`" alt="Cell Line Collection"></v-img>
    </v-row>


    <v-row class="mt-6 mb-6">
      <v-col>
        <p class="text-body-1">
          The Broad Institute feature sets used to understand the differences between sensitive and insensitive cell lines are from the 
          <a hre="https://depmap.org/portal/" target="_blank" class="text-link">Cancer Dependency Map</a> include:
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
          <a href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md" target="_blank" class="text-link">GitHub repository</a>
          and is available for download in the 
          <a hred="https://depmap.org/portal/data_page/?tab=allData" target="_blank" class="text-link">DepMap portal</a>.
        </p>
      </v-col>
    </v-row>


      <v-row class="mt-6 mb-6">
        <v-col>
          <div style="height:250px; background-color:#e2e2e2; margin-bottom:4px;">
          <h2 class="text-center text-white pt-8">Plot</h2>
          </div>
          <p class="text-subtitle-2  text-grey-darken-1">
            PRISM sensitivity profiles of clinically approved BCR-ABL1 inhibitors correlated with fusion status shows stronger and more selective correlation to BCR-ABL1 status for asciminib. This is consistent with clinical findings with week 48 major molecular response rates of 66% for Asciminib, 44% for Nilotinib and 38% for Imatinib.
          </p>
        </v-col>
        <v-col>
          <div style="height:250px; background-color:#e2e2e2; margin-bottom:4px;">
          <h2 class="text-center text-white pt-8">Plot</h2>
          </div>
          <p class="text-subtitle-2 text-grey-darken-1">
            PRISM sensitivity profiles of CDK4/6 inhibitors are correlated with CDK4 or CDK6 CRISPR knockout or shRNA knockdown. Ribociclib and abemaciclib show stronger correlations with CDK4. Palbociclib shows strong correlation with CDK6 knockout and less correlation with CDK4. Ribociclib and abemaciclib have a median overall survival in a metastatic setting of 67.6 vs 51.8 months in an HR+ setting and 66.8 vs 53.7 months versus placebo. Palbociclib has a lower response of 53.8 vs 49.8 months versus placebo. 
          </p>
        </v-col>
      </v-row>
</container-sm>
</page>
</template>

<script>

export default {
  name: 'DataAnalysis',
  data() {
    return {
     
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