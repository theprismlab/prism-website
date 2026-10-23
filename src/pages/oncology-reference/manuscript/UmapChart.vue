<template>
  <div class="umap-chart">
    <div class="umap-chart__header">
      <span class="umap-chart__title">{{ title }}</span>
      <span class="umap-chart__count">
        <strong>{{ points.length }}</strong> plotted
        <template v-if="unplottedCount"> · {{ unplottedCount }} without coordinates</template>
      </span>
      <v-btn
        v-if="zoomed"
        variant="text"
        size="small"
        color="primary"
        prepend-icon="mdi-magnify-minus-outline"
        @click="resetZoom"
      >
        Reset zoom
      </v-btn>
    </div>
    <div ref="plot" class="umap-chart__plot" />
  </div>
</template>

<script>
  import UmapPlot from './UmapPlot.js';

  /**
   * UMAP scatter of test agents, coloured by UMAP class.
   *
   * `agents` is the full list (used to fix the colour domain so filtering never
   * recolours a class); `rows` is the subset to plot, typically the filtered
   * table rows. Rows without a `umap` point are counted but not drawn.
   */
  export default {
    name: 'UmapChart',
    props: {
      agents: { type: Array, required: true },
      rows: { type: Array, required: true },
      title: { type: String, default: 'Test agent UMAP' },
      height: { type: Number, default: 460 },
    },
    data() {
      return {
        // Mirrors the plot's zoom state so the "Reset zoom" button can react
        zoomed: false,
      };
    },
    computed: {
      points() {
        return this.rows.filter((row) => row.umap);
      },
      unplottedCount() {
        return this.rows.length - this.points.length;
      },
      // Every UMAP class across all agents, most common first
      classes() {
        const counts = new Map();
        for (const row of this.agents) {
          if (row.umap) counts.set(row.umap.umapCls, (counts.get(row.umap.umapCls) || 0) + 1);
        }
        return [...counts]
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .map(([cls]) => cls);
      },
    },
    watch: {
      points(points) {
        if (this.plot) this.plot.setData(points);
      },
    },
    mounted() {
      // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
      // object graph in reactive proxies.
      this.plot = new UmapPlot(this.$refs.plot, {
        height: this.height,
        key: (d) => d.CompoundName,
        x: { field: (d) => d.umap.x, title: 'UMAP 1' },
        y: { field: (d) => d.umap.y, title: 'UMAP 2' },
        color: {
          field: (d) => d.umap.umapCls,
          title: 'Class',
          type: 'categorical',
          domain: this.classes,
        },
        tooltip: (d, rows) => [['Agent', d.FormattedName], ...rows],
        onZoomChange: (zoomed) => {
          this.zoomed = zoomed;
        },
      });
      this.plot.setData(this.points);
    },
    beforeUnmount() {
      if (this.plot) this.plot.destroy();
      this.plot = null;
    },
    methods: {
      resetZoom() {
        if (this.plot) this.plot.resetZoom();
      },
    },
  };
</script>

<style scoped>
  .umap-chart {
    padding: 8px 16px 12px;
  }

  .umap-chart__header {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 36px;
    margin-bottom: 4px;
  }

  .umap-chart__header .v-btn {
    margin-left: auto;
  }

  .umap-chart__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
  }

  .umap-chart__count {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .umap-chart__count strong {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 600;
  }

  .umap-chart__plot {
    width: 100%;
  }
</style>
