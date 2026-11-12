<template>
  <div ref="chart" class="bar-matrix-chart-host"></div>
</template>

<script>
  import { BarMatrixChart } from '@/lib/charts/prism-charts.js';

  /**
   * Vue wrapper for prism-charts' BarMatrixChart: every prop is a chart option, and
   * changing one redraws the chart. See BarMatrixChart.js in prism-charts for what
   * each means.
   *
   * `swapAxes()` (for a parent, via a ref) trades the row and column fields in the
   * chart, and `@axis-change` reports the new `axis` so the parent can keep its own
   * state in step.
   *
   * Leave `width` unset to size the chart to its container: the chart measures
   * the container itself and follows its resizes. There is no `height`: the chart
   * is as tall as its groups and bars need.
   */
  export default {
    name: 'BarMatrixChart',
    props: {
      // Records, one per item; the chart adds them up into bars
      data: { type: Array, required: true },
      // { x, y, group, series, color, value }: matrix columns and rows, the bar
      // groups in a cell, the bars in a group, their color, and what a bar measures
      axis: { type: Object, default: () => ({}) },
      // Fields described once: [{ field, title, domain, format, sort, color }].
      // An axis that names one by `field` takes its description.
      dimensions: { type: Array, default: () => [] },
      // Px thickness of a bar, px between the bars of a group, px between groups
      barSize: { type: Number, default: 10 },
      barPadding: { type: Number, default: 2 },
      groupPadding: { type: Number, default: 8 },
      // false leaves the value off the end of every bar
      showValues: { type: Boolean, default: true },
      // (segment, defaultRows) => rows | html
      tooltip: { type: Function, default: null },
      unit: { type: String, default: 'records' },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null fits the container
      width: { type: Number, default: null },
    },
    emits: ['axis-change'],
    computed: {
      options() {
        const {
          data,
          axis,
          dimensions,
          barSize,
          barPadding,
          groupPadding,
          showValues,
          tooltip,
          unit,
          fontSize,
          width,
        } = this;
        return {
          data,
          axis,
          dimensions,
          barSize,
          barPadding,
          groupPadding,
          showValues,
          tooltip,
          unit,
          fontSize,
          width,
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
    },
    mounted() {
      // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
      // object graph in reactive proxies.
      this.chart = new BarMatrixChart(this.$refs.chart, {
        ...this.options,
        onAxisChange: (axis) => this.$emit('axis-change', axis),
      });
    },
    beforeUnmount() {
      this.chart.destroy();
    },
    methods: {
      swapAxes() {
        this.chart.swapAxes();
      },
    },
  };
</script>

<style scoped>
  .bar-matrix-chart-host {
    width: 100%;
  }
</style>
