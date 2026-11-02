<template>
  <div ref="chart" class="scatter-plot-host"></div>
</template>

<script>
  import { ScatterPlot } from '@/lib/charts/prism-charts.js';

  /**
   * Vue wrapper for ScatterPlot.js: every prop is a ScatterPlot option, and changing
   * one redraws the plot with the zoom preserved. See ScatterPlot.js for what each
   * means. On top of the options:
   *
   *   highlight     `(record, layerId) => boolean` or null, forwarded to
   *                 setHighlight so a parent can emphasise points declaratively.
   *   pointKey      The plot's `key` option (named apart from Vue's reserved `key`).
   *   @zoom-change  Emitted with true after a drag-zoom and false after a reset.
   *   @highlight-change  Emitted with the plot's Highlight after a legend click or
   *                 highlight change.
   *   resetZoom(), zoomTo(xDomain, yDomain)  Methods, for a parent via a ref.
   *
   * Give a layer its own records with `layers: [{ id, data, … }]`; `data` is the
   * first layer's. Leave `width` unset to size the plot to its container.
   */
  export default {
    name: 'ScatterPlot',
    props: {
      // Records of the first layer, one per point
      data: { type: Array, default: () => [] },
      // { x, y, color, radius } axis configs
      axis: { type: Object, default: () => ({}) },
      // Layers to draw; every layer but the first carries its own `data`
      layers: { type: Array, default: () => [{}] },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null fits the container
      width: { type: Number, default: null },
      height: { type: Number, default: 480 },
      margin: { type: Object, default: () => ({}) },
      // Data join key `(record, index) => id`, so points keep identity across updates
      pointKey: { type: Function, default: null },
      hoverRadius: { type: Number, default: 24 },
      rangePadding: { type: Number, default: 10 },
      border: { type: Boolean, default: false },
      duration: { type: Number, default: 500 },
      tooltip: { type: Function, default: null },
      // Highlight predicate `(record, layerId) => boolean`; null for none
      highlight: { type: Function, default: null },
    },
    emits: ['zoom-change', 'highlight-change'],
    computed: {
      options() {
        const {
          data,
          axis,
          layers,
          fontSize,
          width,
          height,
          margin,
          pointKey,
          hoverRadius,
          rangePadding,
          border,
          duration,
          tooltip,
        } = this;
        const options = {
          data,
          axis,
          layers,
          fontSize,
          width,
          height,
          margin,
          hoverRadius,
          rangePadding,
          border,
          duration,
          tooltip,
        };
        if (pointKey) options.key = pointKey;
        return options;
      },
    },
    watch: {
      options: {
        handler(options) {
          this.plot.update(options);
        },
        deep: true,
      },
      highlight(predicate) {
        this.plot.setHighlight(predicate);
      },
    },
    mounted() {
      // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
      // object graph in reactive proxies.
      this.plot = new ScatterPlot(this.$refs.chart, {
        ...this.options,
        onZoomChange: (zoomed) => this.$emit('zoom-change', zoomed),
        onHighlightChange: (highlight) => this.$emit('highlight-change', highlight),
      });
      if (this.highlight) this.plot.setHighlight(this.highlight);
    },
    beforeUnmount() {
      this.plot.destroy();
      this.plot = null;
    },
    methods: {
      resetZoom() {
        this.plot?.resetZoom();
      },
      zoomTo(xDomain, yDomain) {
        this.plot?.zoomTo(xDomain, yDomain);
      },
    },
  };
</script>

<style scoped>
  .scatter-plot-host {
    width: 100%;
  }
</style>
