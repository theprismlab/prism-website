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

  /**
   * Attach UMAP coordinates to each CSV agent row, matched by compound name
   * (case-insensitive). Agents with no UMAP point get null coordinates.
   */
  function joinUmap(agents, compounds) {
    const byName = new Map(compounds.map((c) => [c.n.toUpperCase(), c]));
    return agents.map((row) => {
      const umap = byName.get(row.CompoundName.toUpperCase());
      return {
        ...row,
        umapX: umap ? umap.x : null,
        umapY: umap ? umap.y : null,
        umapClass: umap ? umap.umapCls : null,
      };
    });
  }

  export default {
    name: 'DataExplorer',
    data() {
      return {
        // One object per test agent: the CSV row plus UMAP fields from the JSON
        // (umapX, umapY, umapClass are null for agents without a UMAP point)
        agents: null,
        // CRISPR gene UMAP points from the JSON, kept separate for the scatter plot
        crisprGenes: null,
        error: null,
      };
    },
    computed: {
      loaded() {
        return this.agents !== null;
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

          this.agents = joinUmap(testAgents, landingPageData.compounds);
          this.crisprGenes = landingPageData.crisprGenes;

          console.log('OncRef agents (CSV + UMAP):', this.agents);
          console.log('OncRef CRISPR genes:', this.crisprGenes);
        } catch (err) {
          this.error = 'Failed to load OncRef data.';
          console.error(err);
        }
      },
    },
  };
</script>
