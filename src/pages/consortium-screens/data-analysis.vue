<template>
  <page>
    <page-header narrow>
      <template #title>Data Analysis</template>
      <p class="prism-text-body-large">
        PRISM sensitivity profiles are compared to deep multi-omic cell line characterization
        information in univariate analyses as well as multivariate predictive modeling algorithms to
        identify features that correlate with sensitivity.
      </p>
    </page-header>

    <page-section width="narrow">
      <v-img
        eager
        style="max-width: 800px"
        :src="`${imgPath}${imgFile}`"
        alt="Data analysis workflow diagram"
        class="mb-10"
      ></v-img>

      <p class="prism-text-body-large">
        The Broad Institute feature sets used to understand the differences between sensitive and
        insensitive cell lines are from the
        <a href="https://depmap.org/portal/" target="_blank">Cancer Dependency Map</a> include:
      </p>

      <ul class="prism-text-body-large ma-8">
        <li>
          Cell line lineage and subtype, mutation status, gene expression, protein expression, copy
          number, methylation, and metabolomics
        </li>
        <li>Loss-of-function genetic perturbation data using CRISPR and shRNA</li>
        <li>
          PRISM viability data from over 6,000 annotated commercial drugs (Drug Repurposing Hub)
        </li>
      </ul>
      <p class="prism-text-body-medium text-medium-emphasis mb-6">
        Note: PRISM only uses baseline genomic features - we do not use post-transcriptomics.
      </p>

      <p class="prism-text-body-large">
        A current list of datasets used for each of the feature analyses can be found on our
        <a
          href="https://github.com/cmap/dockerized_mts/blob/master/biomarker_files/README.md"
          target="_blank"
          >GitHub repository</a
        >
        and is available for download in the
        <a href="https://depmap.org/portal/data_page/?tab=allData" target="_blank">DepMap portal</a
        >.
      </p>
    </page-section>
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
