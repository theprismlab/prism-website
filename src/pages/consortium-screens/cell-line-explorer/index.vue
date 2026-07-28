<template>
  <div>
    <prism-page-title>Cell Line Explorer</prism-page-title>
    <div class="chart-container" :style="{ height: computedHeight + 'px' }">
      <svg ref="chart" id="cell-line-explorer-svg" font-family="sans-serif"></svg>
    </div>
  </div>
</template>
<script>
  import { getCellLines } from '@/submissions/api.js';
  import * as d3 from 'd3';

  const DURATION = 250;
  const MARGIN = { top: 10, right: 160, bottom: 10, left: 40 };

  export default {
    name: 'CellLineExplorer',
    data() {
      return {
        cellLines: [],
        chartWidth: 1000,
        computedHeight: 600,
      };
    },
    async mounted() {
      try {
        await this.loadData();
        const groups = d3.group(
          this.cellLines,
          (d) => d.cell_lineage,
          (d) => d.primary_disease,
          (d) => d.subtype,
        );
        const root = d3.hierarchy([null, groups], ([, values]) =>
          values instanceof Map ? Array.from(values) : null,
        );

        // Fixed vertical spacing between sibling nodes; horizontal spacing is
        // derived from chartWidth so depth always fits within it.
        const dx = 18;
        const dy = this.chartWidth / (root.height + 1);
        this.tree = d3.tree().nodeSize([dx, dy]);
        this.diagonal = d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x);

        root.x0 = 0;
        root.y0 = 0;
        let id = 0;
        root.descendants().forEach((d) => {
          d.id = id++;
          d._children = d.children;
          // Start with only the top-level lineage branches expanded.
          if (d.depth > 1) d.children = null;
        });
        this.rootNode = root;

        const svg = d3.select(this.$refs.chart);
        this.gLink = svg
          .append('g')
          .attr('fill', 'none')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 1.5);
        this.gNode = svg.append('g').attr('pointer-events', 'all');

        this.update(this.rootNode);
      } catch (err) {
        console.error('Error building/rendering hierarchy:', err);
      }
    },
    methods: {
      async loadData() {
        try {
          const response = await getCellLines(import.meta.env.VITE_API_URL);
          this.cellLines = response;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      },
      update(source) {
        const nodes = this.rootNode.descendants().reverse();
        const links = this.rootNode.links();

        this.tree(this.rootNode);

        let left = this.rootNode;
        let right = this.rootNode;
        this.rootNode.eachBefore((d) => {
          if (d.x < left.x) left = d;
          if (d.x > right.x) right = d;
        });
        const height = right.x - left.x + MARGIN.top + MARGIN.bottom;
        this.computedHeight = height;

        const svg = d3.select(this.$refs.chart);
        const transition = svg
          .transition()
          .duration(DURATION)
          .attr('viewBox', [-MARGIN.left, left.x - MARGIN.top, this.chartWidth, height])
          .attr('width', this.chartWidth)
          .attr('height', height);

        // Nodes.
        const node = this.gNode.selectAll('g').data(nodes, (d) => d.id);

        const nodeEnter = node
          .enter()
          .append('g')
          .attr('transform', () => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .style('cursor', (d) => (d._children ? 'pointer' : 'default'))
          .on('click', (_event, d) => {
            d.children = d.children ? null : d._children;
            this.update(d);
          });

        nodeEnter
          .append('circle')
          .attr('r', 5)
          .attr('fill', (d) => (d.children ? 'steelblue' : d._children ? 'orange' : '#999'));

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .attr('x', (d) => (d._children ? -8 : 8))
          .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
          .attr('font-size', '10px')
          .text((d) => d.data[0] ?? '')
          .clone(true)
          .lower()
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white');

        node
          .merge(nodeEnter)
          .transition(transition)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1)
          .select('circle')
          .attr('fill', (d) => (d.children ? 'steelblue' : d._children ? 'orange' : '#999'));

        node
          .exit()
          .transition(transition)
          .remove()
          .attr('transform', () => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        // Links.
        const link = this.gLink.selectAll('path').data(links, (d) => d.target.id);

        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return this.diagonal({ source: o, target: o });
          });

        link.merge(linkEnter).transition(transition).attr('d', this.diagonal);

        link
          .exit()
          .transition(transition)
          .remove()
          .attr('d', () => {
            const o = { x: source.x, y: source.y };
            return this.diagonal({ source: o, target: o });
          });

        this.rootNode.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      },
    },
    computed: {},
  };
</script>
<style scoped>
  .chart-container {
    width: 100%;
    overflow-x: auto;
  }

  .chart-container svg {
    display: block;
  }
</style>
