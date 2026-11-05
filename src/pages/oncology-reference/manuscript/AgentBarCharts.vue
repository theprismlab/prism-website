<template>
  <v-row dense>
    <v-col v-for="chart in config.charts" :key="chart.field" cols="12" :md="columnWidth">
      <v-card variant="outlined" class="pa-6 fill-height">
        <v-card-title class="px-0">{{ chart.title ?? fieldLabel(chart.field) }}</v-card-title>
        <bar-chart v-bind="config.chart" :data="counts[chart.counts]" :axis="chart.axis(rows)" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import BarChart from '@/lib/charts/BarChart.vue';
  import { AGENT_BAR_CHARTS } from './agentBarCharts.js';
  import { chartCounts } from './stats.js';
  import { fieldLabel } from './fields.js';

  /**
   * The test agent bar charts: a row of cards, one horizontal bar chart of agent
   * counts per CSV column. Which columns, and each chart's axes, come from the
   * config (see agentBarCharts.js); the counts from chartCounts in stats.js.
   */
  export default {
    name: 'AgentBarCharts',
    components: { BarChart },
    props: {
      // Test agent rows to count
      rows: { type: Array, required: true },
      // Cards and shared chart props; defaults to the manuscript config
      config: { type: Object, default: () => AGENT_BAR_CHARTS },
    },
    computed: {
      counts() {
        return chartCounts(this.rows);
      },
      // Cards share the row equally on md and up
      columnWidth() {
        return Math.max(1, Math.floor(12 / this.config.charts.length));
      },
    },
    methods: { fieldLabel },
  };
</script>
