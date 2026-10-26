<template>
  <div ref="host" class="stacked-bar-chart-host">
    <div ref="chart"></div>
  </div>
</template>

<script>
  import { StackedBarChart } from '@/lib/charts/prism-charts.js';

  /**
   * Vue wrapper for StackedBarChart.js: every prop is a StackedBarChart option, and
   * changing one redraws the chart. See StackedBarChart.js for what each means.
   *
   * Leave `width` unset to size the chart to its container: the host element is
   * measured with a ResizeObserver, so the chart follows the layout as it changes.
   */
  export default {
    name: 'StackedBarChart',
    props: {
      data: { type: Array, required: true },
      total: { type: Number, default: null },
      axis: { type: Object, default: () => ({}) },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null measures the container instead
      width: { type: Number, default: null },
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
        const { data, total, axis, fontSize, chartWidth, rowHeight } = this;
        return { data, total, axis, fontSize, width: chartWidth, rowHeight };
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
      this.chart = new StackedBarChart(this.$refs.chart, this.options);
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
  .stacked-bar-chart-host {
    width: 100%;
  }
</style>
