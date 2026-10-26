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
      <p class="breakdown-chart__source">
        Counted from the <code>{{ chart.column }}</code> column
      </p>

      <ul class="breakdown-chart__bars">
        <li v-for="bar in barsFor(chart)" :key="bar.value" class="bar">
          <div class="bar__label">{{ bar.value }}</div>
          <div class="bar__track">
            <div
              class="bar__fill"
              :style="{ width: `${bar.percent}%`, background: bar.color }"
              role="img"
              :aria-label="`${bar.value}: ${bar.count} of ${rows.length}`"
            ></div>
          </div>
          <div class="bar__count">
            <strong>{{ bar.count }}</strong>
            <span class="bar__percent">({{ bar.percent.toFixed(0) }}%)</span>
          </div>
        </li>
      </ul>
    </section>
  </v-card>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'BreakdownCard',
    props: {
      title: { type: String, default: 'Test agent breakdowns' },
      // One object per CSV row (test agent)
      rows: { type: Array, required: true },
      // Charts stacked top to bottom: [{ title, column }]. Each chart counts the
      // rows by every distinct value found in that CSV column.
      charts: { type: Array, required: true },
    },
    methods: {
      // One bar per distinct value in the chart's column, largest first. Empty
      // cells are counted as "(blank)" so the bars always add up to the row total.
      barsFor(chart) {
        const counts = d3
          .rollups(
            this.rows,
            (group) => group.length,
            (row) => row[chart.column] || '(blank)',
          )
          .sort((a, b) => b[1] - a[1] || d3.ascending(a[0], b[0]));
        // Each chart gets its own scale, so colors are assigned per value
        const color = d3.scaleOrdinal(
          counts.map(([value]) => value),
          d3.schemeTableau10,
        );
        return counts.map(([value, count]) => ({
          value,
          count,
          percent: (count / this.rows.length) * 100,
          color: color(value),
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

  .breakdown-chart__bars {
    display: grid;
    gap: 12px;
    padding: 0;
    list-style: none;
  }

  .bar {
    display: grid;
    grid-template-columns: minmax(140px, 1fr) 2fr auto;
    align-items: center;
    gap: 16px;
  }

  .bar__label {
    font-size: 0.875rem;
  }

  .bar__track {
    height: 20px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .bar__fill {
    height: 100%;
    border-radius: 4px;
  }

  .bar__count {
    min-width: 80px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .bar__percent {
    margin-left: 4px;
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  /* xs */
  @media (max-width: 600px) {
    .breakdown-card {
      padding: 16px;
    }

    .bar {
      grid-template-columns: 1fr auto;
      gap: 4px 12px;
    }

    .bar__track {
      grid-column: 1 / -1;
      order: 3;
    }
  }
</style>
