<template>
  <div ref="chart" class="parallel-sets-chart-host"></div>
</template>

<script>
  import { ExtendedParallelSetsChart } from '@/lib/charts/ExtendedParallelSetsChart.js';

  /**
   * Vue wrapper for ExtendedParallelSetsChart.js (prism-charts' ParallelSetsChart
   * plus `labelPosition`): every prop is a chart option, and changing one redraws
   * the chart. See ParallelSetsChart.js in prism-charts for what each means.
   *
   * Leave `width` unset to size the chart to its container: the chart measures
   * the container itself and follows its resizes.
   */
  export default {
    name: 'ParallelSetsChart',
    props: {
      // Records, one per item; the chart counts them
      data: { type: Array, required: true },
      // [{ field, title, domain, format, sort }] in column order
      dimensions: { type: Array, required: true },
      // { color: { field, title, domain, range, format } }
      axis: { type: Object, default: () => ({}) },
      nodeWidth: { type: Number, default: 4 },
      nodePadding: { type: Number, default: 10 },
      // 'outside' (right of each node) or 'inside' (in the node; needs a wide nodeWidth)
      labelPosition: { type: String, default: 'outside' },
      // Fill and outline for every node; null keeps the library's look
      nodeFill: { type: String, default: null },
      nodeStroke: { type: String, default: null },
      // false leaves category counts out of the labels and tooltips
      showCounts: { type: Boolean, default: true },
      fillColumns: { type: Boolean, default: true },
      hover: { type: Boolean, default: true },
      tooltip: { type: Function, default: null },
      unit: { type: String, default: 'records' },
      fontSize: { type: [String, Number], default: 'medium' },
      // Fixed pixel width; null fits the container
      width: { type: Number, default: null },
      height: { type: Number, default: 480 },
    },
    computed: {
      options() {
        const {
          data,
          dimensions,
          axis,
          nodeWidth,
          nodePadding,
          labelPosition,
          nodeFill,
          nodeStroke,
          showCounts,
          fillColumns,
          hover,
          tooltip,
          unit,
          fontSize,
          width,
          height,
        } = this;
        return {
          data,
          dimensions,
          axis,
          nodeWidth,
          nodePadding,
          labelPosition,
          nodeFill,
          nodeStroke,
          showCounts,
          fillColumns,
          hover,
          tooltip,
          unit,
          fontSize,
          width,
          height,
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
      this.chart = new ExtendedParallelSetsChart(this.$refs.chart, this.options);
    },
    beforeUnmount() {
      this.chart.destroy();
    },
  };
</script>

<style scoped>
  .parallel-sets-chart-host {
    width: 100%;
  }
</style>
