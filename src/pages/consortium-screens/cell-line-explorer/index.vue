<template>
  <div>
    <prism-page-title>Cell Line Explorer</prism-page-title>
    <div class="chart-container">
      <svg
        id="cell-line-explorer-svg"
        ref="chart"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
      ></svg>
    </div>
  </div>
</template>
<script>
  import { getCellLines } from '@/submissions/api.js';
  import * as d3 from 'd3';
  export default {
    name: 'CellLineExplorer',
    data() {
      return {
        cellLines: [],
        // hierarchy: ['cell_lineage', 'primary_disease', 'subtype', 'cell_line'],
      };
    },
    async mounted() {
      try {
        await this.loadData();
        console.log(
          'Cell lines loaded:',
          Array.isArray(this.cellLines),
          this.cellLines.length,
          this.cellLines,
        );
        const groups = d3.group(
          this.cellLines,
          (d) => d.cell_lineage,
          (d) => d.primary_disease,
          (d) => d.subtype,
        );
        console.log('Groups created:', groups.size, groups);
        const hierarchy = d3.hierarchy([null, groups], ([, values]) =>
          values instanceof Map ? Array.from(values) : null,
        );
        console.log('Hierarchy created:', hierarchy.descendants().length, 'nodes', hierarchy);
        this.renderHierarchy(hierarchy);
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
      renderHierarchy(hierarchy) {
        const viewWidth = 800;
        const viewHeight = 600;
        const margin = { top: 20, right: 100, bottom: 20, left: 20 };
        const innerWidth = viewWidth - margin.left - margin.right;
        const innerHeight = viewHeight - margin.top - margin.bottom;

        const svg = d3
          .select(this.$refs.chart)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        // x = breadth (top-to-bottom), y = depth (left-to-right)
        const treeLayout = d3.tree().size([innerHeight, innerWidth]);
        const root = treeLayout(hierarchy);
        // Render nodes and links
        svg
          .selectAll('line')
          .data(root.links())
          .enter()
          .append('line')
          .attr('x1', (d) => d.source.y)
          .attr('y1', (d) => d.source.x)
          .attr('x2', (d) => d.target.y)
          .attr('y2', (d) => d.target.x)
          .attr('stroke', 'black');
        svg
          .selectAll('circle')
          .data(root.descendants())
          .enter()
          .append('circle')
          .attr('cx', (d) => d.y)
          .attr('cy', (d) => d.x)
          .attr('r', 5)
          .attr('fill', 'blue');
        svg
          .selectAll('text')
          .data(root.descendants())
          .enter()
          .append('text')
          .attr('x', (d) => d.y + 10)
          .attr('y', (d) => d.x)
          .attr('dy', '0.35em')
          .attr('text-anchor', 'start')
          .text((d) => d.data[0]);
      },
    },
    computed: {},
  };
</script>
<style scoped>
  .chart-container {
    width: 100%;
    height: 80vh;
  }

  .chart-container svg {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
