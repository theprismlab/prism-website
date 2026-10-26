<template>
  <div ref="chart"></div>
</template>

<script>
  import StackedBarChart from './StackedBarChart.js';

  /**
   * Vue wrapper for StackedBarChart.js: every prop is a StackedBarChart option, and
   * changing one redraws the chart. See StackedBarChart.js for what each means.
   */
  export default {
    name: 'StackedBarChart',
    props: {
      data: { type: Array, required: true },
      total: { type: Number, default: null },
      axis: { type: Object, default: () => ({}) },
      fontSize: { type: [String, Number], default: 'medium' },
      width: { type: Number, default: 640 },
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      options() {
        const { data, total, axis, fontSize, width, rowHeight } = this;
        return { data, total, axis, fontSize, width, rowHeight };
      },
    },
    watch: {
      options: {
        handler(options) {
          this.chart.update(options);
        },
        deep: true,
      },
    },
    mounted() {
      // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
      // object graph in reactive proxies.
      this.chart = new StackedBarChart(this.$refs.chart, this.options);
    },
    beforeUnmount() {
      this.chart.destroy();
    },
  };
</script>
