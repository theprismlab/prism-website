<template>
  <page>
    <app-container>
      <v-row>
        <v-col>
          <prism-page-title>Data Analysis</prism-page-title>
          <p class="text-body-1">
            PRISM sensitivity profiles are compared to deep multi-omic cell line characterization
            information in univariate analyses as well as multivariate predictive modeling
            algorithms to identify features that correlate with sensitivity.
          </p>
        </v-col>
      </v-row>

      <v-row class="justify-center mb-4">
        <v-img
          eager
          style="max-width: 800px"
          :src="`${imgPath}${imgFile}`"
          alt="Cell Line Collection"
        ></v-img>
      </v-row>

      <v-row>
        <v-col>
          <p class="text-body-1">
            The Broad Institute feature sets used to understand the differences between sensitive
            and insensitive cell lines are from the
            <a href="https://depmap.org/portal/" target="_blank">Cancer Dependency Map</a> include:
          </p>
          <ul class="text-body-1 ma-8 ml-12">
            <li>
              Cell line lineage and subtype, mutation status, gene expression, protein expression,
              copy number, methylation, and metabolomics
            </li>
            <li>Loss-of-function genetic perturbation data using CRISPR and shRNA</li>
            <li>
              PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing Hub)
            </li>
          </ul>
          <p class="text-body-1">
            A current list of datasets used for each of the feature analyses can be found on our
            <a
              href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md"
              target="_blank"
              >GitHub repository</a
            >
            and is available for download in the
            <a href="https://depmap.org/portal/data_page/?tab=allData" target="_blank"
              >DepMap portal</a
            >.
          </p>
        </v-col>
      </v-row>
    </app-container>
  </page>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';

  export default {
    name: 'DataAnalysis',
    data() {
      return {
        imgFile: 'data-analysis.png',
      };
    },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
    },
    components: {},
  };
</script>

<style scoped>
  li {
    line-height: 1.45em;
    margin-bottom: 0.5em;
  }
</style>
