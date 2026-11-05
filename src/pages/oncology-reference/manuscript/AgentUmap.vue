<template>
  <div class="agent-umap">
    <div class="agent-umap__header">
      <span class="agent-umap__title">{{ title ?? config.title }}</span>
      <span class="agent-umap__count">
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
        class="agent-umap__toggle"
      />
      <v-btn
        v-if="zoomed"
        variant="text"
        size="small"
        color="primary"
        prepend-icon="mdi-magnify-minus-outline"
        @click="$refs.plot.resetZoom()"
      >
        Reset zoom
      </v-btn>
    </div>
    <scatter-plot
      ref="plot"
      class="agent-umap__plot"
      :data="points"
      :layers="layers"
      :axis="axis"
      :point-key="pointKey"
      :highlight="highlightPredicate"
      :point-label="pointLabel"
      :selected="selectedPredicate"
      :click-layers="['agents']"
      :height="height"
      :font-size="fontSize"
      @zoom-change="zoomed = $event"
      @point-click="onPointClick"
    />
  </div>
</template>

<script>
  import { categoryColors } from '@/lib/charts/prism-charts.js';
  import ScatterPlot from '@/lib/charts/ScatterPlot.vue';
  import { fieldLabel } from './fields.js';
  import { AGENT_EXPLORER } from './agentExplorer.js';

  function splitList(value) {
    return (value || '')
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  /**
   * The test agent UMAP: a scatter of agents (filled, coloured by target pathway)
   * with CRISPR genes overlaid as outlined circles. Owns the header, the
   * adaptation of agents and genes into points, and the layer and highlight
   * config for the ScatterPlot wrapper. Copy and colors come from `config`, the
   * `umap` section of agentExplorer.js by default.
   *
   * `agents` is the full list (used to fix the colour domain so filtering never
   * recolours a pathway); `rows` is the subset to plot, typically the filtered
   * table rows. Rows without a `umap` point are counted but not drawn.
   * `genes` are `{ n, x, y, label, showLabel }` CRISPR gene points from the
   * UMAP CSV. Agents and genes flagged show_label get their LabelName drawn
   * beside the point.
   * `highlighted`, when not null, is the subset of rows to emphasise (e.g. search
   * hits); every other agent is drawn grey, as is every gene that none of the
   * highlighted agents target.
   *
   * `selected` is the CompoundName of the selected agent (or null), used with
   * v-model:selected. Clicking an agent selects it, clicking empty plot space
   * clears the selection, and gene clicks are ignored. The selected agent gets
   * a ring and is always labelled.
   *
   * Agents and genes are adapted into uniform `{ id, x, y, … }` points so the
   * plot's axes read the same fields for both layers.
   */
  export default {
    name: 'AgentUmap',
    components: { ScatterPlot },
    props: {
      agents: { type: Array, required: true },
      rows: { type: Array, required: true },
      genes: { type: Array, default: () => [] },
      highlighted: { type: Array, default: null },
      // CompoundName of the selected agent, or null (v-model:selected)
      selected: { type: String, default: null },
      // Copy, color column and gene layer; see the `umap` section of agentExplorer.js
      config: { type: Object, default: () => AGENT_EXPLORER.umap },
      // Overrides the config's title
      title: { type: String, default: null },
      height: { type: Number, default: 460 },
      // 'small', 'medium' or 'large' (see chartText.js), or a number of pixels
      fontSize: { type: [String, Number], default: 'medium' },
    },
    emits: ['update:selected'],
    data() {
      return {
        // Mirrors the plot's zoom state so the "Reset zoom" button can react
        zoomed: false,
        showGenes: true,
        pointKey: (d) => d.id,
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
            pathway: row[this.config.colorField] || '(blank)',
            label: row.umap.showLabel ? row.umap.label : null,
            labelName: row.umap.label,
            agent: row,
          }));
      },
      // Empty while genes are hidden, so the plot's gene layer simply drains
      genePoints() {
        if (!this.showGenes) return [];
        return this.genes.map((gene) => ({
          id: gene.n,
          x: gene.x,
          y: gene.y,
          label: gene.showLabel ? gene.label : null,
          gene: gene.n,
        }));
      },
      unplottedCount() {
        return this.rows.length - this.points.length;
      },
      // Pathway colors from all agents (not just the plotted rows), so filtering
      // never recolors a pathway. The same mapping colors the pathway bar chart.
      pathwayColors() {
        return categoryColors(this.agents, this.config.colorField);
      },
      axis() {
        return {
          x: { field: 'x', title: this.config.axisTitles.x },
          y: { field: 'y', title: this.config.axisTitles.y },
          color: {
            field: 'pathway',
            title: fieldLabel(this.config.colorField),
            type: 'categorical',
            domain: this.pathwayColors.domain,
            range: this.pathwayColors.range,
          },
        };
      },
      // The agents layer draws `points` (the plot's `data`); the genes layer
      // carries its own records
      layers() {
        return [
          {
            id: 'agents',
            mark: 'filled',
            tooltip: (d, rows) => [[fieldLabel('FormattedName'), d.agent.FormattedName], ...rows],
          },
          {
            id: 'genes',
            label: this.config.genes.label,
            mark: 'outline',
            color: this.config.genes.color,
            data: this.genePoints,
            tooltip: (d, rows) => [['Gene', d.gene], ...rows],
          },
        ];
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
      highlightPredicate() {
        const keys = this.highlightedKeys;
        return keys ? (d, layer) => keys[layer].has(d.id) : null;
      },
      // LabelName from the UMAP CSV for points flagged show_label, and always
      // for the selected agent
      pointLabel() {
        const selected = this.selected;
        return (d, layer) =>
          layer === 'agents' && d.id === selected ? d.labelName || d.id : d.label;
      },
      selectedPredicate() {
        const selected = this.selected;
        return selected ? (d, layer) => layer === 'agents' && d.id === selected : null;
      },
      highlightedPointCount() {
        const keys = this.highlightedKeys;
        return keys ? this.points.filter((p) => keys.agents.has(p.id)).length : 0;
      },
    },
    methods: {
      // Only agent points are clickable (see click-layers); null is empty space
      onPointClick(point) {
        this.$emit('update:selected', point ? point.id : null);
      },
    },
  };
</script>

<style scoped>
  .agent-umap {
    padding: 8px 16px 12px;
  }

  .agent-umap__header {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 36px;
    margin-bottom: 4px;
  }

  .agent-umap__toggle {
    flex: 0 0 auto;
    margin-left: auto;
  }

  .agent-umap__toggle :deep(.v-label) {
    font-size: 0.8125rem;
  }

  .agent-umap__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.82);
  }

  .agent-umap__count {
    font-size: 0.8125rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .agent-umap__count strong {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 600;
  }

  .agent-umap__plot {
    width: 100%;
  }
</style>
