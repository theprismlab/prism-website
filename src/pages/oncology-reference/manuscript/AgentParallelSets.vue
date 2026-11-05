<template>
  <v-card variant="outlined" class="agent-parallel-sets pa-6">
    <div class="agent-parallel-sets__header">
      <div>
        <v-card-title class="px-0 pt-0">{{ config.title }}</v-card-title>
        <p class="text-body-2 text-medium-emphasis mb-0"></p>
      </div>
      <v-select
        v-model="colorBy"
        :items="colorOptions"
        item-title="label"
        item-value="field"
        label="Color by"
        density="compact"
        variant="outlined"
        hide-details
        class="agent-parallel-sets__color-select"
      />
    </div>
    <p v-if="error" class="text-error mt-4 mb-0">{{ error }}</p>
    <p v-else-if="!rows" class="text-body-2 text-medium-emphasis mt-4 mb-0">Loading data…</p>
    <parallel-sets-chart
      v-else
      :data="rows"
      :dimensions="config.dimensions"
      :axis="{ color: { field: colorBy } }"
      :height="config.height"
      :node-width="config.nodeWidth"
      :label-position="config.labelPosition"
      :node-fill="config.nodeFill"
      :node-stroke="config.nodeStroke"
      :show-counts="config.showCounts"
      :unit="config.unit"
      class="mt-4"
    />
  </v-card>
</template>

<script>
  import ParallelSetsChart from '@/lib/charts/ParallelSetsChart.vue';
  import { AGENT_PARALLEL_SETS } from './agentParallelSets.js';
  import { getOncRefData } from './oncref.js';

  /**
   * The test agent parallel sets card: card copy, the "Color by"
   * control, and the parallel sets chart (the prism-charts ParallelSetsChart via
   * its Vue wrapper). Self-contained: loads the test agent rows itself through
   * the shared, cached getOncRefData() and drops controls (they would add a
   * stray category). Owns the color selection and maps the config (see
   * agentParallelSets.js) onto chart props explicitly, so the chart stays
   * generic and the config stays free of prop names.
   */
  export default {
    name: 'AgentParallelSets',
    components: { ParallelSetsChart },
    props: {
      // Card copy and chart dimensions; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_PARALLEL_SETS },
    },
    data() {
      return {
        // Non-control test agent rows, loaded in mounted(); null until then
        rows: null,
        error: null,
        colorBy: this.config.defaultColorBy ?? this.config.dimensions[0]?.field ?? null,
      };
    },
    computed: {
      colorOptions() {
        return this.config.dimensions.map((d) => ({ field: d.field, label: d.title ?? d.field }));
      },
    },
    async mounted() {
      try {
        const { agents } = await getOncRefData();
        this.rows = agents;
      } catch (err) {
        this.error = 'Failed to load test agent data.';
        console.error(err);
      }
    },
  };
</script>

<style scoped>
  .agent-parallel-sets__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .agent-parallel-sets__color-select {
    flex: 0 0 200px;
  }
  .agent-parallel-sets__color-select :deep(.v-field__input),
  .agent-parallel-sets__color-select :deep(.v-label) {
    font-size: 0.8125rem;
  }

  @media (max-width: 600px) {
    .agent-parallel-sets__header {
      flex-direction: column;
    }
    .agent-parallel-sets__color-select {
      flex-basis: auto;
      width: 100%;
    }
  }
</style>
