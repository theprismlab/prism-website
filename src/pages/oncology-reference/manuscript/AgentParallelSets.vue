<template>
  <div class="agent-parallel-sets">
    <div class="agent-parallel-sets__toolbar">
      <h3 class="agent-parallel-sets__title">{{ config.title }}</h3>
      <v-select
        v-model="colorBy"
        :items="colorOptions"
        item-title="label"
        item-value="field"
        label="Color by"
        density="compact"
        variant="outlined"
        bg-color="white"
        hide-details
        class="agent-parallel-sets__filter"
      />
    </div>

    <div class="agent-parallel-sets__body">
      <p v-if="error" class="text-error mb-0">{{ error }}</p>
      <p v-else-if="!rows" class="agent-parallel-sets__status mb-0">Loading data…</p>
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
      />
    </div>
  </div>
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
  /* Card styling matches AgentExplorer.vue */
  .agent-parallel-sets {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }

  /* ── Toolbar ──────────────────────────────────────────────────────── */
  .agent-parallel-sets__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }

  .agent-parallel-sets__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
  }

  .agent-parallel-sets__filter {
    flex: 0 1 240px;
    min-width: 200px;
    max-width: 320px;
  }

  /* ── Chart ────────────────────────────────────────────────────────── */
  .agent-parallel-sets__body {
    padding: 16px;
  }

  .agent-parallel-sets__status {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 600px) {
    .agent-parallel-sets__filter {
      flex-basis: 100%;
      max-width: none;
    }
  }
</style>
