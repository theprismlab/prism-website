<template>
  <div ref="host" class="parallel-sets" @mouseleave="clearHover">
    <svg
      v-if="layout"
      class="parallel-sets__svg"
      :viewBox="`0 0 ${width} ${svgHeight}`"
      :width="width"
      :height="svgHeight"
      role="img"
      :aria-label="ariaLabel"
    >
      <g :transform="`translate(0,${margin.top})`">
        <!-- Column headers, aligned the same way as that column's labels -->
        <text
          v-for="col in layout.columns"
          :key="`h-${col.label}`"
          class="parallel-sets__header"
          :x="labelX(col.nodes[0])"
          :y="-12"
          :text-anchor="labelAnchor(col.nodes[0])"
        >
          {{ col.label }}
        </text>

        <!-- Links: one stroked path per strand per adjacent column pair -->
        <g fill="none">
          <path
            v-for="(link, i) in layout.links"
            :key="`l-${i}`"
            class="parallel-sets__link"
            :class="{
              'is-muted': hover && !isLinkActive(link),
              'is-active': hover && isLinkActive(link),
            }"
            :d="link.path"
            :stroke="colorOf(link.keys[colorDim])"
            :stroke-width="Math.max(link.width, 1)"
            @mouseenter="hoverLink(link, $event)"
            @mousemove="moveTooltip"
          />
        </g>

        <!-- Nodes -->
        <g
          v-for="node in layout.nodes"
          :key="`n-${node.dim}-${node.key}`"
          class="parallel-sets__node"
          :class="{ 'is-muted': hover && !isNodeActive(node) }"
          @mouseenter="hoverNode(node, $event)"
          @mousemove="moveTooltip"
        >
          <rect
            :x="node.x0"
            :y="node.y0"
            :width="node.x1 - node.x0"
            :height="Math.max(node.y1 - node.y0, 1)"
            :fill="node.dim === colorDim ? colorOf(node.key) : nodeColor"
          />
          <!-- Wider invisible hit target so thin nodes are easy to hover -->
          <rect
            :x="node.x0 - 6"
            :y="node.y0 - 4"
            :width="node.x1 - node.x0 + 12"
            :height="Math.max(node.y1 - node.y0, 1) + 8"
            fill="transparent"
          />
          <text
            class="parallel-sets__label"
            :x="labelX(node)"
            :y="(node.y0 + node.y1) / 2"
            dy="0.35em"
            :text-anchor="labelAnchor(node)"
          >
            {{ node.name }}
            <tspan class="parallel-sets__label-count">{{ node.count }}</tspan>
          </text>
        </g>
      </g>
    </svg>

    <div v-if="tooltip" class="parallel-sets__tooltip" :style="tooltipStyle">
      <div class="parallel-sets__tooltip-title">{{ tooltip.title }}</div>
      <table>
        <tr v-for="[k, v] in tooltip.rows" :key="k">
          <th>{{ k }}</th>
          <td>{{ v }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { scaleOrdinal } from 'd3';
  import { defaultColors } from '@/lib/charts/prism-charts.js';
  import { parallelSetsLayout } from './parallelSets.js';

  /**
   * Parallel sets chart (d3-sankey layout, see parallelSets.js): a thin column
   * of category nodes per dimension and stroked links between adjacent columns
   * sized by the rows that share both categories. Links are colored by the
   * `colorBy` dimension and blended with multiply, so each category of that
   * column reads as a strand flowing through the rest of the chart. Strands are
   * sorted by the color column so same-colored strands stay together.
   *
   * Presentational: everything comes in through props and the only state is
   * hover. Dimensions must arrive fully described ({ field, label, order,
   * labels }; see the Dimension typedef in parallelSets.js). Controls such as a
   * color picker belong to the parent.
   *
   * Hovering a node highlights every strand passing through it. Hovering a link
   * highlights the whole band between its two nodes (every strand sharing that
   * category path so far) and traces it across the chart the same way. A
   * tooltip gives the count and share.
   *
   * Labels sit to the right of nodes in the left half of the chart and to the
   * left of nodes in the right half, as in the Observable example. Width tracks
   * the container through a ResizeObserver; `height` is the plot height.
   */
  export default {
    name: 'ParallelSetsChart',
    props: {
      rows: { type: Array, required: true },
      // Dimension objects in column order; see parallelSets.js
      dimensions: { type: Array, required: true },
      // Field of the dimension that colors the links; defaults to the first column
      colorBy: { type: String, default: null },
      // { domain, range } for the color column's categories; defaults to the
      // chart library's palette in node order
      colors: { type: Object, default: null },
      height: { type: Number, default: 480 },
      nodeWidth: { type: Number, default: 4 },
      nodePadding: { type: Number, default: 10 },
      // Noun for the tooltip counts
      unit: { type: String, default: 'rows' },
    },
    data() {
      return {
        width: 640,
        margin: { top: 28, bottom: 4 },
        // { type: 'node', node } | { type: 'link', prefix } | null
        hover: null,
        tooltip: null,
        nodeColor: '#333',
      };
    },
    computed: {
      svgHeight() {
        return this.height + this.margin.top + this.margin.bottom;
      },
      // Column index of the color field; falls back to the first column
      colorDim() {
        const i = this.dimensions.findIndex((d) => d.field === this.colorBy);
        return i >= 0 ? i : 0;
      },
      layout() {
        if (!this.rows.length || this.dimensions.length < 2) return null;
        return parallelSetsLayout(this.rows, this.dimensions, {
          width: this.width,
          height: this.height,
          nodeWidth: this.nodeWidth,
          nodePadding: this.nodePadding,
          primary: this.colorDim,
        });
      },
      colorScale() {
        const column = this.layout?.columns[this.colorDim];
        const domain = this.colors?.domain ?? column?.nodes.map((n) => n.key) ?? [];
        // defaultColors(n) returns n colors from the library palette
        const range = this.colors?.range ?? defaultColors(domain.length);
        return scaleOrdinal(domain, range).unknown('#ccc');
      },
      // Node ids touched by any active link, so muting follows whole strands
      activeNodeIds() {
        if (!this.hover || !this.layout) return null;
        const ids = new Set();
        for (const link of this.layout.links) {
          if (!this.isLinkActive(link)) continue;
          link.keys.forEach((key, dim) => ids.add(`${dim}\u0000${key}`));
        }
        return ids;
      },
      ariaLabel() {
        const names = this.layout?.columns.map((c) => c.label).join(', ') ?? '';
        return `Parallel sets of ${this.rows.length} ${this.unit} across ${names}`;
      },
      tooltipStyle() {
        if (!this.tooltip) return {};
        return { left: `${this.tooltip.x}px`, top: `${this.tooltip.y}px` };
      },
    },
    mounted() {
      this.measure();
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.measure());
        this.resizeObserver.observe(this.$refs.host);
      }
    },
    beforeUnmount() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
    },
    methods: {
      measure() {
        const width = Math.round(this.$refs.host.clientWidth);
        if (width > 0) this.width = width;
      },
      colorOf(key) {
        return this.colorScale(key);
      },
      // Left half of the chart labels to the right of the node, right half to the left
      labelX(node) {
        return node.x0 < this.width / 2 ? node.x1 + 6 : node.x0 - 6;
      },
      labelAnchor(node) {
        return node.x0 < this.width / 2 ? 'start' : 'end';
      },
      // Node hover: every strand through that node. Link hover: every strand
      // sharing the hovered link's category path up to its target column, i.e.
      // the whole visible band between those two nodes, traced across the chart.
      isLinkActive(link) {
        const h = this.hover;
        if (!h) return true;
        if (h.type === 'link') return h.prefix.every((key, i) => link.keys[i] === key);
        return link.keys[h.node.dim] === h.node.key;
      },
      isNodeActive(node) {
        return this.activeNodeIds ? this.activeNodeIds.has(`${node.dim}\u0000${node.key}`) : true;
      },
      percent(count) {
        const total = this.layout?.total || 1;
        const share = count / total;
        return `${(100 * share).toFixed(share < 0.1 ? 1 : 0)}%`;
      },
      columnLabel(i) {
        return this.layout.columns[i].label;
      },
      hoverNode(node, event) {
        this.hover = { type: 'node', node };
        this.tooltip = {
          title: node.name,
          rows: [
            [this.columnLabel(node.dim), node.name],
            [
              this.unit[0].toUpperCase() + this.unit.slice(1),
              `${node.count} of ${this.layout.total} (${this.percent(node.count)})`,
            ],
          ],
          ...this.tooltipPosition(event),
        };
      },
      hoverLink(link, event) {
        // Categories from the first column through this link's target column
        const prefix = link.keys.slice(0, link.pair + 2);
        this.hover = { type: 'link', prefix };
        // Size of the whole band: strands in this column pair sharing the prefix
        const bandValue = this.layout.links
          .filter((l) => l.pair === link.pair && this.isLinkActive(l))
          .reduce((sum, l) => sum + l.value, 0);
        this.tooltip = {
          title: `${bandValue} ${this.unit} (${this.percent(bandValue)})`,
          rows: prefix.map((_, i) => [this.columnLabel(i), link.names[i]]),
          ...this.tooltipPosition(event),
        };
      },
      moveTooltip(event) {
        if (this.tooltip) Object.assign(this.tooltip, this.tooltipPosition(event));
      },
      tooltipPosition(event) {
        const rect = this.$refs.host.getBoundingClientRect();
        let x = event.clientX - rect.left + 14;
        const y = event.clientY - rect.top + 14;
        // Keep the tooltip inside the host on the right edge
        if (x + 260 > rect.width) x = Math.max(event.clientX - rect.left - 260, 0);
        return { x, y };
      },
      clearHover() {
        this.hover = null;
        this.tooltip = null;
      },
    },
  };
</script>

<style scoped>
  .parallel-sets {
    position: relative;
    width: 100%;
    font-family: inherit;
  }
  .parallel-sets__svg {
    display: block;
    max-width: 100%;
    height: auto;
    overflow: visible;
  }

  .parallel-sets__header {
    fill: rgba(0, 0, 0, 0.6);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .parallel-sets__link {
    mix-blend-mode: multiply;
    stroke-opacity: 0.5;
    transition: stroke-opacity 120ms ease;
  }
  .parallel-sets__link.is-active {
    stroke-opacity: 0.8;
  }
  .parallel-sets__link.is-muted {
    stroke-opacity: 0.06;
  }

  .parallel-sets__node rect,
  .parallel-sets__node text {
    transition: opacity 120ms ease;
  }
  .parallel-sets__node.is-muted rect,
  .parallel-sets__node.is-muted text {
    opacity: 0.25;
  }

  .parallel-sets__label {
    fill: rgba(0, 0, 0, 0.82);
    font-size: 0.8125rem;
    pointer-events: none;
    /* White halo so labels stay readable over links */
    paint-order: stroke;
    stroke: #fff;
    stroke-width: 3px;
    stroke-linejoin: round;
  }
  .parallel-sets__label-count {
    fill: rgba(0, 0, 0, 0.55);
    font-variant-numeric: tabular-nums;
  }

  .parallel-sets__tooltip {
    position: absolute;
    z-index: 2;
    pointer-events: none;
    max-width: 260px;
    padding: 8px 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.97);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    font-size: 0.8125rem;
    line-height: 1.35;
  }
  .parallel-sets__tooltip-title {
    font-weight: 600;
    margin-bottom: 4px;
  }
  .parallel-sets__tooltip table {
    border-collapse: collapse;
  }
  .parallel-sets__tooltip th {
    padding: 1px 10px 1px 0;
    text-align: left;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.55);
    white-space: nowrap;
    vertical-align: top;
  }
  .parallel-sets__tooltip td {
    padding: 1px 0;
    color: rgba(0, 0, 0, 0.87);
  }
</style>
