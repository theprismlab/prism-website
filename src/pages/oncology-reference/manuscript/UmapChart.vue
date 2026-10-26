<template>
  <div class="umap-chart">
    <div class="umap-chart__header">
      <span class="umap-chart__title">{{ title }}</span>
      <span class="umap-chart__count">
        <strong>{{ points.length }}</strong> plotted
        <template v-if="unplottedCount"> · {{ unplottedCount }} without coordinates</template>
        <template v-if="highlighted">
          · <strong>{{ highlightedPointCount }}</strong> match search</template
        >
      </span>
      <v-checkbox
        v-model="showGenes"
        label="Show genes"
        density="compact"
        hide-details
        class="umap-chart__toggle"
      />
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
  import { ScatterPlot, categoryColors } from '@/lib/charts/prism-charts.js';

  const GENE_COLOR = '#555';

  function splitList(value) {
    return (value || '')
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  /**
   * UMAP scatter of test agents (filled, coloured by target pathway) with CRISPR
   * genes overlaid as outlined circles.
   *
   * `agents` is the full list (used to fix the colour domain so filtering never
   * recolours a pathway); `rows` is the subset to plot, typically the filtered
   * table rows. Rows without a `umap` point are counted but not drawn.
   * `genes` are `{ n, x, y }` CRISPR gene points from the JSON.
   * `highlighted`, when not null, is the subset of rows to emphasise (e.g. search
   * hits); every other agent is drawn grey, as is every gene that none of the
   * highlighted agents target.
   *
   * Agents and genes are adapted into uniform `{ id, x, y, … }` points so the
   * plot's axes read the same fields for both layers.
   */
  export default {
    name: 'UmapChart',
    props: {
      agents: { type: Array, required: true },
      rows: { type: Array, required: true },
      genes: { type: Array, default: () => [] },
      highlighted: { type: Array, default: null },
      title: { type: String, default: 'Test agent UMAP' },
      height: { type: Number, default: 460 },
      // 'small', 'medium' or 'large' (see chartText.js), or a number of pixels
      fontSize: { type: [String, Number], default: 'medium' },
    },
    data() {
      return {
        // Mirrors the plot's zoom state so the "Reset zoom" button can react
        zoomed: false,
        showGenes: true,
      };
    },
    computed: {
      points() {
        return this.rows
          .filter((row) => row.umap)
          .map((row) => ({
            id: row.CompoundName,
            x: row.umap.x,
            y: row.umap.y,
            pathway: row.TargetPathway || '(blank)',
            agent: row,
          }));
      },
      // Empty while genes are hidden, so the plot's gene layer simply drains
      genePoints() {
        if (!this.showGenes) return [];
        return this.genes.map((gene) => ({ id: gene.n, x: gene.x, y: gene.y, gene: gene.n }));
      },
      unplottedCount() {
        return this.rows.length - this.points.length;
      },
      // Ids to keep coloured per layer, or null when nothing is highlighted.
      // Genes stay coloured when a highlighted agent targets them.
      highlightedKeys() {
        if (!this.highlighted) return null;
        const agents = new Set();
        const genes = new Set();
        for (const row of this.highlighted) {
          agents.add(row.CompoundName);
          for (const gene of splitList(row.GeneSymbolOfTargets)) genes.add(gene);
        }
        return { agents, genes };
      },
      highlightedPointCount() {
        const keys = this.highlightedKeys;
        return keys ? this.points.filter((p) => keys.agents.has(p.id)).length : 0;
      },
      // Pathway colors from all agents (not just the plotted rows), so filtering
      // never recolors a pathway. The same mapping colors the pathway bar chart.
      pathwayColors() {
        return categoryColors(this.agents, 'TargetPathway');
      },
    },
    watch: {
      points(points) {
        if (this.plot) this.plot.setData(points, 'agents');
      },
      genePoints(points) {
        if (this.plot) this.plot.setData(points, 'genes');
      },
      highlightedKeys() {
        this.applyHighlight();
      },
    },
    mounted() {
      // Stored as a plain property (not in data()) so Vue doesn't wrap the d3
      // object graph in reactive proxies.
      this.plot = new ScatterPlot(this.$refs.plot, {
        height: this.height,
        fontSize: this.fontSize,
        key: (d) => d.id,
        x: { field: 'x', title: 'X Axis' },
        y: { field: 'y', title: 'Y Axis' },
        color: {
          field: 'pathway',
          title: 'Target Pathways',
          type: 'categorical',
          domain: this.pathwayColors.domain,
          range: this.pathwayColors.range,
        },
        layers: [
          {
            id: 'agents',
            mark: 'filled',
            // The legend title is plural, so the tooltip row uses the singular
            tooltip: (d, rows) => [
              ['Agent', d.agent.FormattedName],
              ...rows.map(([label, value]) =>
                label === 'Target Pathways' ? ['Target pathway', value] : [label, value],
              ),
            ],
          },
          {
            id: 'genes',
            label: 'CRISPR gene',
            mark: 'outline',
            color: GENE_COLOR,
            tooltip: (d, rows) => [['Gene', d.gene], ...rows],
          },
        ],
        onZoomChange: (zoomed) => {
          this.zoomed = zoomed;
        },
      });
      this.plot.setData(this.points, 'agents');
      this.plot.setData(this.genePoints, 'genes');
      this.applyHighlight();
    },
    beforeUnmount() {
      if (this.plot) this.plot.destroy();
      this.plot = null;
    },
    methods: {
      resetZoom() {
        if (this.plot) this.plot.resetZoom();
      },
      applyHighlight() {
        if (!this.plot) return;
        const keys = this.highlightedKeys;
        this.plot.setHighlight(keys ? (d, layer) => keys[layer].has(d.id) : null);
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

  .umap-chart__toggle {
    flex: 0 0 auto;
    margin-left: auto;
  }

  .umap-chart__toggle :deep(.v-label) {
    font-size: 0.8125rem;
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
