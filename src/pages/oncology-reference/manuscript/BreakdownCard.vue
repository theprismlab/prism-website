<template>
  <v-card variant="outlined" class="breakdown-card">
    <div class="breakdown-card__header">
      <h3 class="breakdown-card__title">{{ title }}</h3>
      <div class="breakdown-card__total">
        <strong>{{ rows.length }}</strong> rows in the test agents file
      </div>
    </div>

    <section v-for="chart in charts" :key="chart.column" class="breakdown-chart">
      <h4 class="breakdown-chart__title">{{ chart.title }}</h4>
      <bar-chart
        :data="barsFor(chart)"
        :total="rows.length"
        :x-label="chart.column"
        y-label="Test agents"
      />
    </section>
  </v-card>
</template>

<script>
  import * as d3 from 'd3';
  import BarChart from './BarChart.vue';

  export default {
    name: 'BreakdownCard',
    components: { BarChart },
    props: {
      title: { type: String, default: 'Test agent breakdowns' },
      // One object per CSV row (test agent)
      rows: { type: Array, required: true },
      // Charts stacked top to bottom: [{ title, column, domain? }]. Each chart counts
      // the rows by the distinct values found in that CSV column. `domain` is the
      // optional left-to-right order of the bars; without it, bars follow the order
      // the values first appear in the CSV.
      charts: { type: Array, required: true },
    },
    methods: {
      // One bar per value in the chart's column. Empty cells are counted as "(blank)".
      // Values missing from `domain` are added after it, so the bars always add up to
      // the row total, and domain values with no rows get a zero-height bar.
      barsFor(chart) {
        const counts = d3.rollup(
          this.rows,
          (group) => group.length,
          (row) => row[chart.column] || '(blank)',
        );
        const labels = [...new Set([...(chart.domain || []), ...counts.keys()])];
        // Each chart gets its own scale, so colors are assigned per value
        const color = d3.scaleOrdinal(labels, d3.schemeTableau10);
        return labels.map((label) => ({
          label,
          count: counts.get(label) || 0,
          color: color(label),
        }));
      },
    },
  };
</script>

<style scoped>
  .breakdown-card {
    padding: 24px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 12px;
  }

  .breakdown-card__header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 4px 16px;
    margin-bottom: 8px;
  }

  .breakdown-card__title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .breakdown-card__total {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .breakdown-chart {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .breakdown-chart__title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--v-grey-darken-1);
  }

  .breakdown-chart__source {
    margin: 2px 0 12px;
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .breakdown-chart__source code {
    padding: 1px 5px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    font-size: 0.78rem;
  }

  /* xs */
  @media (max-width: 600px) {
    .breakdown-card {
      padding: 16px;
    }
  }
</style>
