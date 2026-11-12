<template>
  <div ref="chart" class="unit-matrix-chart-host"></div>
</template>

<script>
  import UnitMatrixChart from '@/lib/charts/UnitMatrixChart.js';

  /**
   * Vue wrapper for UnitMatrixChart.js: every prop is a chart option, and changing
   * one redraws the chart. See UnitMatrixChart.js for what each means.
   *
   * Leave `width` unset to size the chart to its container: the chart measures
   * the container itself and follows its resizes. There is no `height`: the chart
   * is as tall as its rows need.
   */
  export default {
    name: 'UnitMatrixChart',
    props: {
      // Records, one per item; every record is one unit square
      data: { type: Array, required: true },
      // { x, y, color }, each { field, title, domain, format, sort }; color also takes range
      axis: { type: Object, default: () => ({}) },
      // Px side of a unit square, and px between two units
      unitSize: { type: Number, default: 12 },
      unitPadding: { type: Number, default: 2 },
      // false leaves the counts out of the labels and cells
      showCounts: { type: Boolean, default: true },
      // (unit, defaultRows) => rows | html
      tooltip: { type: Function, default: null },
      unit: { type: String, default: 'records' },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null fits the container
      width: { type: Number, default: null },
    },
    computed: {
      options() {
        const { data, axis, unitSize, unitPadding, showCounts, tooltip, unit, fontSize, width } =
          this;
        return { data, axis, unitSize, unitPadding, showCounts, tooltip, unit, fontSize, width };
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
      this.chart = new UnitMatrixChart(this.$refs.chart, this.options);
    },
    beforeUnmount() {
      this.chart.destroy();
    },
  };
</script>

<style scoped>
  .unit-matrix-chart-host {
    width: 100%;
  }
</style>
