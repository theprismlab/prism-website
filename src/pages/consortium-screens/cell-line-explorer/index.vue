<template>
  <div>
    <prism-page-title>Cell Line Explorer</prism-page-title>
    <svg id="cell-line-explorer-svg" ref="chart" width="800" height="600"></svg>
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
        console.log('Rendering hierarchy:', hierarchy.descendants().length, 'nodes');
        // Implement your D3 rendering logic here
        let svg = d3
          .select(this.$refs.chart)
          .append('g')
          .attr('transform', 'translate(40,40)');
        // Example: Create a simple tree layout
        const treeLayout = d3.tree().size([800, 600]);
        const root = treeLayout(hierarchy);
        // Render nodes and links
        svg
          .selectAll('line')
          .data(root.links())
          .enter()
          .append('line')
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)
          .attr('stroke', 'black');
        svg
          .selectAll('circle')
          .data(root.descendants())
          .enter()
          .append('circle')
          .attr('cx', (d) => d.x)
          .attr('cy', (d) => d.y)
          .attr('r', 5)
          .attr('fill', 'blue');
        svg
          .selectAll('text')
          .data(root.descendants())
          .enter()
          .append('text')
          .attr('x', (d) => d.x + 10)
          .attr('y', (d) => d.y)
          .text((d) => d.data[0]);
      },
    },
    computed: {},
  };
</script>
