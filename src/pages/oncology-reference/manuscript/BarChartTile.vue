<template>
  <v-card variant="outlined" class="chart-tile">
    <div class="chart-tile__header">
      <h3 class="chart-tile__title">{{ title }}</h3>
      <div class="chart-tile__total">
        <strong>{{ rows.length }}</strong> test agents, counted by <code>{{ column }}</code
        ><template v-if="stackBy">
          and split by <code>{{ stackBy }}</code></template
        >
      </div>
    </div>
    <component
      :is="chartComponent"
      v-bind="chartSize"
      :data="counts"
      :total="rows.length"
      :axis="axis"
    />
  </v-card>
</template>

<script>
  import * as d3 from 'd3';
  import BarChart from './BarChart.vue';
  import HorizontalBarChart from './HorizontalBarChart.vue';
  import HorizontalStackedBarChart from './HorizontalStackedBarChart.vue';

  export default {
    name: 'BarChartTile',
    components: { BarChart, HorizontalBarChart, HorizontalStackedBarChart },
    props: {
      title: { type: String, required: true },
      // One object per CSV row (test agent)
      rows: { type: Array, required: true },
      // CSV column the rows are counted by, one bar per distinct value
      column: { type: String, required: true },
      // This tile's own axis config ({ x, y, color }, each with title, domain, range
      // and ticks); see BarChart.vue, or HorizontalBarChart.vue when `horizontal`
      // is set, where x is the counts axis. Without it, bars follow the order the
      // values first appear in the CSV.
      axis: { type: Object, default: () => ({}) },
      // Draw horizontal bars, one row per value, instead of vertical bars
      horizontal: { type: Boolean, default: false },
      // CSV column to stack each horizontal bar by, one segment per distinct value;
      // see HorizontalStackedBarChart.vue. The color axis should be colored by this
      // column. Ignored unless `horizontal` is set.
      stackBy: { type: String, default: null },
      // Order the bars by count: 'descending' (high to low) or 'ascending'. Ties keep
      // their CSV order. Leave unset to use the axis domain or CSV order instead.
      sort: {
        type: String,
        default: null,
        validator: (v) => [null, 'ascending', 'descending'].includes(v),
      },
      width: { type: Number, default: 640 },
      // Vertical charts only; a horizontal chart is as tall as its rows need
      height: { type: Number, default: 320 },
    },
    computed: {
      chartComponent() {
        if (!this.horizontal) return 'BarChart';
        return this.stackBy ? 'HorizontalStackedBarChart' : 'HorizontalBarChart';
      },
      chartSize() {
        return this.horizontal ? { width: this.width } : { width: this.width, height: this.height };
      },
      // Row counts per value in the column, in order of first appearance. Empty
      // cells are counted as "(blank)" so the bars add up to the row total.
      counts() {
        const labelOf = (row) => row[this.column] || '(blank)';
        const counts =
          this.stackBy && this.horizontal
            ? Array.from(d3.group(this.rows, labelOf), ([label, group]) => ({
                label,
                count: group.length,
                segments: Array.from(
                  d3.rollup(
                    group,
                    (g) => g.length,
                    (row) => row[this.stackBy] || '(blank)',
                  ),
                  ([key, count]) => ({ key, count }),
                ),
              }))
            : Array.from(
                d3.rollup(this.rows, (group) => group.length, labelOf),
                ([label, count]) => ({ label, count }),
              );
        // Array.sort is stable, so ties keep their CSV order
        if (this.sort === 'descending') counts.sort((a, b) => b.count - a.count);
        else if (this.sort === 'ascending') counts.sort((a, b) => a.count - b.count);
        return counts;
      },
    },
  };
</script>

<style scoped>
  .chart-tile {
    padding: 24px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 12px;
  }

  .chart-tile__header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 4px 16px;
    margin-bottom: 12px;
  }

  .chart-tile__title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .chart-tile__total {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .chart-tile__total code {
    padding: 1px 5px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    font-size: 0.78rem;
  }

  /* xs */
  @media (max-width: 600px) {
    .chart-tile {
      padding: 16px;
    }
  }
</style>
