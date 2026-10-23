<template>
  <div class="data-explorer">
    <p v-if="error" class="text-error">{{ error }}</p>
    <p v-else-if="!loaded" class="prism-text-body-large text-medium-emphasis">Loading data…</p>
  </div>
</template>

<script>
  import { getOncRefData } from './oncref.js';

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
          const { agents, crisprGenes } = await getOncRefData();
          this.agents = agents;
          this.crisprGenes = crisprGenes;

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
