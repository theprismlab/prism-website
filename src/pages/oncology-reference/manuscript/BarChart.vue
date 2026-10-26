<template>
  <div ref="chart"></div>
</template>

<script>
  import BarChart from './BarChart.js';

  /**
   * Vue wrapper for BarChart.js: every prop is a BarChart option, and changing one
   * redraws the chart. See BarChart.js for what each means.
   */
  export default {
    name: 'BarChart',
    props: {
      data: { type: Array, required: true },
      orientation: { type: String, default: 'vertical' },
      total: { type: Number, default: null },
      axis: { type: Object, default: () => ({}) },
      fontSize: { type: [String, Number], default: 'medium' },
      width: { type: Number, default: 640 },
      height: { type: Number, default: 320 },
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      options() {
        const { data, orientation, total, axis, fontSize, width, height, rowHeight } = this;
        return { data, orientation, total, axis, fontSize, width, height, rowHeight };
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
      this.chart = new BarChart(this.$refs.chart, this.options);
    },
    beforeUnmount() {
      this.chart.destroy();
    },
  };
</script>
