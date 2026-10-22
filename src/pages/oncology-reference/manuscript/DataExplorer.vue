<template>
  <div class="data-explorer">
    <p v-if="error" class="text-error">{{ error }}</p>
    <p v-else-if="!loaded" class="prism-text-body-large text-medium-emphasis">Loading data…</p>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  const dataPath = import.meta.env.BASE_URL + 'data/';
  const jsonFile = 'OncRef_LandingPage_v3_data.json';
  const csvFile = 'OncRefManuscript_Test_Agents.csv';

  export default {
    name: 'DataExplorer',
    data() {
      return {
        // { compounds: [...], crisprGenes: [...] } from the landing-page JSON
        landingPageData: null,
        // One row per test agent from the manuscript CSV
        testAgents: null,
        error: null,
      };
    },
    computed: {
      loaded() {
        return this.landingPageData !== null && this.testAgents !== null;
      },
    },
    async mounted() {
      await this.getData();
    },
    methods: {
      async getData() {
        try {
          const [landingPageData, testAgents] = await Promise.all([
            d3.json(`${dataPath}${jsonFile}`),
            d3.csv(`${dataPath}${csvFile}`),
          ]);
          this.landingPageData = landingPageData;
          this.testAgents = testAgents;

          console.log('OncRef landing page data:', landingPageData);
          console.log('OncRef manuscript test agents:', testAgents);
        } catch (err) {
          this.error = 'Failed to load OncRef data.';
          console.error(err);
        }
      },
    },
  };
</script>
