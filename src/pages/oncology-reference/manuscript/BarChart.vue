<template>
  <svg
    ref="svg"
    class="bar-chart"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    :aria-label="ariaLabel"
  ></svg>
</template>

<script>
  import * as d3 from 'd3';

  const MARGIN = { top: 28, right: 16, bottom: 64, left: 64 };

  export default {
    name: 'BarChart',
    props: {
      // [{ label, count, color }], drawn left to right in the order given
      data: { type: Array, required: true },
      // Total the percentages are taken from (defaults to the sum of the counts)
      total: { type: Number, default: null },
      xLabel: { type: String, default: '' },
      yLabel: { type: String, default: 'Count' },
      width: { type: Number, default: 640 },
      height: { type: Number, default: 320 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        return `Bar chart of ${this.yLabel} by ${this.xLabel}. ${bars}`;
      },
    },
    watch: {
      data: { handler: 'draw', deep: true },
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        const { width, height, data } = this;
        const innerWidth = width - MARGIN.left - MARGIN.right;
        const innerHeight = height - MARGIN.top - MARGIN.bottom;
        const total = this.total ?? d3.sum(data, (d) => d.count);

        const x = d3
          .scaleBand()
          .domain(data.map((d) => d.label))
          .range([0, innerWidth])
          .padding(0.35);
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.count) || 1])
          .nice()
          .range([innerHeight, 0]);

        const svg = d3.select(this.$refs.svg);
        svg.selectAll('*').remove();
        const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

        // Y axis with ticks, and X axis with a tick under each bar
        const yAxis = g.append('g').call(d3.axisLeft(y).ticks(5).tickSizeOuter(0));
        const xAxis = g
          .append('g')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));
        for (const axis of [yAxis, xAxis]) {
          axis.selectAll('text').attr('font-size', 12).attr('fill', 'rgba(0,0,0,0.7)');
          axis.selectAll('.domain, .tick line').attr('stroke', 'rgba(0,0,0,0.5)');
        }

        // Light gridlines across the plot at each y tick, drawn behind the bars
        g.insert('g', ':first-child')
          .selectAll('line')
          .data(y.ticks(5))
          .join('line')
          .attr('x2', innerWidth)
          .attr('y1', (d) => y(d))
          .attr('y2', (d) => y(d))
          .attr('stroke', 'rgba(0,0,0,0.08)');

        // Bars, each with its count and share of the total above it
        const bar = g.append('g').selectAll('g').data(data).join('g');
        bar
          .append('rect')
          .attr('x', (d) => x(d.label))
          .attr('y', (d) => y(d.count))
          .attr('width', x.bandwidth())
          .attr('height', (d) => innerHeight - y(d.count))
          .attr('rx', 3)
          .attr('fill', (d) => d.color)
          .append('title')
          .text((d) => `${d.label}: ${d.count} of ${total}`);
        bar
          .append('text')
          .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
          .attr('y', (d) => y(d.count) - 6)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.87)')
          .text((d) => `${d.count} (${Math.round((d.count / total) * 100)}%)`);

        // Axis titles
        svg
          .append('text')
          .attr('x', MARGIN.left + innerWidth / 2)
          .attr('y', height - 12)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.6)')
          .text(this.xLabel);
        svg
          .append('text')
          .attr('transform', `translate(14,${MARGIN.top + innerHeight / 2}) rotate(-90)`)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.6)')
          .text(this.yLabel);
      },
    },
  };
</script>

<style scoped>
  .bar-chart {
    display: block;
    width: 100%;
    height: auto;
    max-width: 640px;
  }
</style>
