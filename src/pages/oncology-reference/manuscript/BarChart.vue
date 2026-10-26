<template>
  <div ref="host" class="bar-chart-host">
    <div ref="chart"></div>
  </div>
</template>

<script>
  import { BarChart } from '@/lib/charts/prism-charts.js';

  /**
   * Vue wrapper for BarChart.js: every prop is a BarChart option, and changing one
   * redraws the chart. See BarChart.js for what each means.
   *
   * Leave `width` unset to size the chart to its container: the host element is
   * measured with a ResizeObserver, so the chart follows the layout as it changes.
   */
  export default {
    name: 'BarChart',
    props: {
      data: { type: Array, required: true },
      orientation: { type: String, default: 'vertical' },
      total: { type: Number, default: null },
      axis: { type: Object, default: () => ({}) },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null measures the container instead
      width: { type: Number, default: null },
      height: { type: Number, default: 320 },
      rowHeight: { type: Number, default: 28 },
    },
    data() {
      return {
        // Container width from the ResizeObserver, used when `width` is unset
        measuredWidth: null,
      };
    },
    computed: {
      chartWidth() {
        return this.width ?? this.measuredWidth ?? 640;
      },
      options() {
        const { data, orientation, total, axis, fontSize, chartWidth, height, rowHeight } = this;
        return { data, orientation, total, axis, fontSize, width: chartWidth, height, rowHeight };
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
      this.measure();
      // Stored as plain properties (not in data()) so Vue doesn't wrap the d3
      // object graph or the observer in reactive proxies.
      this.chart = new BarChart(this.$refs.chart, this.options);
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.measure());
        this.resizeObserver.observe(this.$refs.host);
      }
    },
    beforeUnmount() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.chart.destroy();
    },
    methods: {
      // The chart caps its own div at the drawn width, so measure the host around it,
      // which always fills the parent.
      measure() {
        const width = Math.round(this.$refs.host.clientWidth);
        if (width > 0) this.measuredWidth = width;
      },
    },
  };
</script>

<style scoped>
  .bar-chart-host {
    width: 100%;
  }
</style>
