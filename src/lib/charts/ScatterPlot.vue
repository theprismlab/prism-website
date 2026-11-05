<template>
  <div ref="chart" class="scatter-plot-host"></div>
</template>

<script>
  import { ExtendedScatterPlot } from '@/lib/charts/ExtendedScatterPlot.js';

  /**
   * Vue wrapper for ScatterPlot.js: every prop is a ScatterPlot option, and changing
   * one redraws the plot with the zoom preserved. See ScatterPlot.js for what each
   * means. On top of the options:
   *
   *   highlight     `(record, layerId) => boolean` or null, forwarded to
   *                 setHighlight so a parent can emphasise points declaratively.
   *   pointKey      The plot's `key` option (named apart from Vue's reserved `key`).
   *   pointLabel    `(record, layerId) => string | null`: text drawn beside a point;
   *                 null or '' draws no label.
   *   selected      `(record, layerId) => boolean` or null: points to ring.
   *   clickLayers   Layer ids whose points can be clicked; null for all.
   *   @point-click  Emitted with (record, layerId) on a click on a point, or
   *                 (null, null) on a click on empty plot space.
   * The last four come from ExtendedScatterPlot.js.
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
      // Point label `(record, layerId) => string | null`; null for no labels
      pointLabel: { type: Function, default: null },
      // Selection predicate `(record, layerId) => boolean`; null for none
      selected: { type: Function, default: null },
      // Layer ids whose points emit point-click; null for every layer
      clickLayers: { type: Array, default: null },
    },
    emits: ['zoom-change', 'highlight-change', 'point-click'],
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
          pointLabel,
          selected,
          clickLayers,
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
          label: pointLabel,
          selected,
          clickLayers,
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
      this.plot = new ExtendedScatterPlot(this.$refs.chart, {
        ...this.options,
        onZoomChange: (zoomed) => this.$emit('zoom-change', zoomed),
        onHighlightChange: (highlight) => this.$emit('highlight-change', highlight),
        onPointClick: (record, layerId) => this.$emit('point-click', record, layerId),
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

  /* Point labels drawn by ExtendedScatterPlot, with a white halo for legibility */
  .scatter-plot-host :deep(.scatter-plot__label) {
    font-size: 0.85em;
    fill: rgba(0, 0, 0, 0.82);
    paint-order: stroke;
    stroke: #fff;
    stroke-width: 3px;
    stroke-linejoin: round;
  }

  /* The selected point's label: bolder and larger */
  .scatter-plot-host :deep(.scatter-plot__label--selected) {
    font-size: 1.05em;
    font-weight: 700;
    fill: rgba(0, 0, 0, 0.92);
    stroke-width: 4px;
  }

  /* Ring around the selected point */
  .scatter-plot-host :deep(.scatter-plot__selection-ring) {
    fill: none;
    stroke: rgba(0, 0, 0, 0.85);
    stroke-width: 2.5;
  }

  /* Pointer cursor over a clickable point (the brush overlay sits under the mouse) */
  .scatter-plot-host.scatter-plot--point-hover :deep(.scatter-plot__brush .overlay) {
    cursor: pointer;
  }
</style>
