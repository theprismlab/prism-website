<template>
  <v-card variant="outlined" class="chart-tile">
    <div class="chart-tile__header">
      <h3 class="chart-tile__title">{{ title }}</h3>
      <div class="chart-tile__total">
        <strong>{{ rows.length }}</strong> test agents, counted by <code>{{ column }}</code>
      </div>
    </div>
    <bar-chart
      :data="counts"
      :total="rows.length"
      :axis="axis"
      :width="width"
      :height="height"
    />
  </v-card>
</template>

<script>
  import * as d3 from 'd3';
  import BarChart from './BarChart.vue';

  export default {
    name: 'BarChartTile',
    components: { BarChart },
    props: {
      title: { type: String, required: true },
      // One object per CSV row (test agent)
      rows: { type: Array, required: true },
      // CSV column the rows are counted by, one bar per distinct value
      column: { type: String, required: true },
      // This tile's own axis config ({ x, y, color }, each with title, domain, range
      // and ticks); see BarChart.vue. Without it, bars follow the order the values
      // first appear in the CSV.
      axis: { type: Object, default: () => ({}) },
      width: { type: Number, default: 640 },
      height: { type: Number, default: 320 },
    },
    computed: {
      // Row counts per value in the column, in order of first appearance. Empty
      // cells are counted as "(blank)" so the bars add up to the row total.
      counts() {
        return Array.from(
          d3.rollup(
            this.rows,
            (group) => group.length,
            (row) => row[this.column] || '(blank)',
          ),
          ([label, count]) => ({ label, count }),
        );
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
