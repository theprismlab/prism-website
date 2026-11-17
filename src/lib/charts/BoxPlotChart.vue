<template>
  <div
    ref="host"
    class="box-plot-chart-host"
  >
    <div ref="chart" />
  </div>
</template>

<script>
  import { BoxPlotChart } from '@/lib/charts/prism-charts.js';

  /**
   * Vue wrapper for BoxPlotChart in prism-charts.js: every prop is a chart
   * option, and changing one redraws the chart. On top of the options:
   *
   *   highlight  `(record, box) => boolean` or null, forwarded to setHighlight
   *              so a parent can emphasise observations declaratively; the
   *              rest draw grey.
   *
   * Leave `width` unset to size the chart to its container: the host element
   * is measured with a ResizeObserver, so the chart follows the layout.
   */
  export default {
    name: 'BoxPlotChart',
    props: {
      data: { type: Array, required: true },
      orientation: { type: String, default: 'horizontal' },
      // { x, y, group, color } axis configs; x and y map to category and value by orientation
      axis: { type: Object, default: () => ({}) },
      // Draw every observation inside its box
      points: { type: Boolean, default: false },
      showCounts: { type: Boolean, default: false },
      // { value, label } reference line on the value axis
      threshold: { type: Object, default: null },
      rangePadding: { type: Number, default: 10 },
      border: { type: Boolean, default: false },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null measures the container instead
      width: { type: Number, default: null },
      height: { type: Number, default: 320 },
      rowHeight: { type: Number, default: 28 },
      hoverRadius: { type: Number, default: 6 },
      // `(record, rows, box) => rows` to adjust the tooltip's [label, value] rows
      tooltip: { type: Function, default: null },
      // Highlight predicate `(record, box) => boolean`; null for none
      highlight: { type: Function, default: null },
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
        const {
          data,
          orientation,
          axis,
          points,
          showCounts,
          threshold,
          rangePadding,
          border,
          fontSize,
          chartWidth,
          height,
          rowHeight,
          hoverRadius,
          tooltip,
        } = this;
        return {
          data,
          orientation,
          axis,
          points,
          showCounts,
          threshold,
          rangePadding,
          border,
          fontSize,
          width: chartWidth,
          height,
          rowHeight,
          hoverRadius,
          tooltip,
        };
      },
    },
    watch: {
      options: {
        handler(options) {
          this.chart.update(options);
        },
        deep: true,
      },
      highlight(predicate) {
        this.chart.setHighlight(predicate);
      },
    },
    mounted() {
      this.measure();
      // Stored as plain properties (not in data()) so Vue doesn't wrap the d3
      // object graph or the observer in reactive proxies.
      this.chart = new BoxPlotChart(this.$refs.chart, this.options);
      if (this.highlight) this.chart.setHighlight(this.highlight);
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
  .box-plot-chart-host {
    width: 100%;
  }
</style>
