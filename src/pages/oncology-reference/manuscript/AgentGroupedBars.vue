<template>
  <v-card variant="outlined" class="pa-6">
    <v-card-title class="px-0">{{ config.title }}</v-card-title>
    <bar-chart v-bind="config.chart" :data="records" :axis="axis" />
  </v-card>
</template>

<script>
  import BarChart from '@/lib/charts/BarChart.vue';
  import { AGENT_GROUPED_BARS, groupedColorAxis } from './agentGroupedBars.js';
  import { groupedCounts } from './stats.js';

  /**
   * The test agent grouped bar chart: one bar chart with a group of bars per
   * CSV column (pathway, modality, clinical stage), each group under a heading
   * and on its own color scale. Which columns, their colors and the chart's
   * axes come from the config (see agentGroupedBars.js); the records from
   * groupedCounts in stats.js.
   */
  export default {
    name: 'AgentGroupedBars',
    components: { BarChart },
    props: {
      // Test agent rows to count
      rows: { type: Array, required: true },
      // Columns, chart props and axes; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_GROUPED_BARS },
    },
    computed: {
      records() {
        return groupedCounts(
          this.rows,
          this.config.groups.map((g) => g.field),
        );
      },
      // The config's axes plus a color axis composed from the groups' scales
      axis() {
        return {
          ...this.config.axis,
          color: groupedColorAxis(this.config.groups, this.records, this.rows),
        };
      },
    },
  };
</script>
