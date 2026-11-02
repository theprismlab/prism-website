<template>
  <v-card variant="outlined" class="agent-breakdown pa-6">
    <div class="agent-breakdown__header">
      <div>
        <v-card-title class="px-0 pt-0">{{ config.title }}</v-card-title>
        <p class="text-body-2 text-medium-emphasis mb-0">{{ config.description }}</p>
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
        class="agent-breakdown__color-select"
      />
    </div>
    <parallel-sets-chart
      :rows="rows"
      :dimensions="config.dimensions"
      :color-by="colorBy"
      :height="config.height"
      :unit="config.unit"
      class="mt-4"
    />
  </v-card>
</template>

<script>
  import ParallelSetsChart from './ParallelSetsChart.vue';
  import { AGENT_PARALLEL_SETS } from './agentParallelSets.js';

  /**
   * Controller for the test agent breakdown card: card copy, the "Color by"
   * control, and the parallel sets chart. Owns the color selection and maps
   * the config (see agentParallelSets.js) onto chart props explicitly, so the
   * chart stays presentational and the config stays free of prop names.
   */
  export default {
    name: 'AgentBreakdown',
    components: { ParallelSetsChart },
    props: {
      // Test agent rows to chart (already filtered by the page)
      rows: { type: Array, required: true },
      // Card copy and chart dimensions; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_PARALLEL_SETS },
    },
    data() {
      return {
        colorBy: this.config.defaultColorBy ?? this.config.dimensions[0]?.field ?? null,
      };
    },
    computed: {
      colorOptions() {
        return this.config.dimensions.map((d) => ({ field: d.field, label: d.label ?? d.field }));
      },
    },
  };
</script>

<style scoped>
  .agent-breakdown__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .agent-breakdown__color-select {
    flex: 0 0 200px;
  }
  .agent-breakdown__color-select :deep(.v-field__input),
  .agent-breakdown__color-select :deep(.v-label) {
    font-size: 0.8125rem;
  }

  @media (max-width: 600px) {
    .agent-breakdown__header {
      flex-direction: column;
    }
    .agent-breakdown__color-select {
      flex-basis: auto;
      width: 100%;
    }
  }
</style>
