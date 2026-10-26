<template>
  <svg
    ref="svg"
    class="bar-chart"
    :style="{ maxWidth: `${width}px` }"
    role="img"
    :aria-label="ariaLabel"
  ></svg>
</template>

<script>
  import * as d3 from 'd3';
  import { defaultColors } from './chartColors.js';
  import { drawLegend } from './chartLegend.js';

  const MARGIN = { top: 28, right: 16, bottom: 64, left: 64 };
  const LEGEND_HEIGHT = 24;
  // Approximate pixel width of one character of 12px axis text
  const CHAR_WIDTH = 6.5;

  export default {
    name: 'BarChart',
    props: {
      // [{ label, count }], one per bar. Bar order comes from axis.x.domain.
      data: { type: Array, required: true },
      // Total the percentages are taken from (defaults to the sum of the counts)
      total: { type: Number, default: null },
      // Every axis is optional, and so is every property on it:
      //   x:     the bars (categorical)
      //   y:     the counts (linear)
      //   color: the bar fill (categorical; the legend appears when it has a title)
      // title  Axis title (for color, the legend title).
      // domain x: bar labels in left-to-right order; labels missing from it are
      //        added after it. A listed label with no data gets a zero-height bar.
      //        y: [min, max] counts. color: labels the colors are assigned to.
      // range  x: [start, end] pixels across the plot. y: [bottom, top] pixels
      //        up the plot. color: array of colors, reused in order if too short.
      // ticks  x: labels to show ticks for. y: a tick count or an array of values.
      //        color: labels to list in the legend.
      // Defaults: x domain from the data, y domain [0, max count] rounded up, y about
      // 5 ticks, color domain from x, color range d3.schemeTableau10 (or
      // a 14-color alternating-lightness palette when there are more than 10 bars).
      axis: { type: Object, default: () => ({}) },
      width: { type: Number, default: 640 },
      height: { type: Number, default: 320 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        return `Bar chart of ${this.axis.y?.title || 'count'} by ${this.axis.x?.title || 'category'}. ${bars}`;
      },
    },
    watch: {
      data: { handler: 'draw', deep: true },
      axis: { handler: 'draw', deep: true },
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        const { width } = this;
        const ax = this.axis.x || {};
        const ay = this.axis.y || {};
        const ac = this.axis.color || {};

        const counts = new Map(this.data.map((d) => [d.label, d.count]));
        const labels = [...new Set([...(ax.domain || []), ...counts.keys()])];
        const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
        const total = this.total ?? d3.sum(bars, (d) => d.count);

        const hasLegend = Boolean(ac.title);
        const margin = { ...MARGIN, top: MARGIN.top + (hasLegend ? LEGEND_HEIGHT : 0) };
        const innerWidth = width - margin.left - margin.right;

        // Labels too long to sit side by side are tilted, and the chart grows
        // taller by the room they need so the plot area keeps its height
        const longest = d3.max(labels, (label) => label.length) || 0;
        const tilt = innerWidth / labels.length < longest * CHAR_WIDTH;
        const extra = tilt ? Math.round(longest * CHAR_WIDTH * Math.sin(Math.PI / 4)) : 0;
        const height = this.height + extra;
        margin.bottom += extra;
        const innerHeight = height - margin.top - margin.bottom;

        const x = d3
          .scaleBand()
          .domain(labels)
          .range(ax.range || [0, innerWidth])
          .padding(0.35);
        const y = d3.scaleLinear().range(ay.range || [innerHeight, 0]);
        if (ay.domain) y.domain(ay.domain);
        else y.domain([0, d3.max(bars, (d) => d.count) || 1]).nice();
        const colorDomain = ac.domain || labels;
        const color = d3.scaleOrdinal(colorDomain, ac.range || defaultColors(colorDomain.length));

        const yTicks = Array.isArray(ay.ticks) ? ay.ticks : y.ticks(ay.ticks ?? 5);

        const svg = d3.select(this.$refs.svg).attr('viewBox', `0 0 ${width} ${height}`);
        svg.selectAll('*').remove();
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Y axis with ticks, and X axis with a tick under each bar
        const yAxis = g.append('g').call(d3.axisLeft(y).tickValues(yTicks).tickSizeOuter(0));
        const xAxis = g
          .append('g')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(
            d3
              .axisBottom(x)
              .tickValues(ax.ticks || labels)
              .tickSizeOuter(0),
          );
        for (const axis of [yAxis, xAxis]) {
          axis.selectAll('text').attr('font-size', 12).attr('fill', 'rgba(0,0,0,0.7)');
          axis.selectAll('.domain, .tick line').attr('stroke', 'rgba(0,0,0,0.5)');
        }

        if (tilt) {
          xAxis
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')
            .attr('dx', '-0.6em')
            .attr('dy', '0.15em');
        }

        // Light gridlines across the plot at each y tick, drawn behind the bars
        g.insert('g', ':first-child')
          .selectAll('line')
          .data(yTicks)
          .join('line')
          .attr('x2', innerWidth)
          .attr('y1', (d) => y(d))
          .attr('y2', (d) => y(d))
          .attr('stroke', 'rgba(0,0,0,0.08)');

        // Bars, each with its count and share of the total above it
        const bar = g.append('g').selectAll('g').data(bars).join('g');
        bar
          .append('rect')
          .attr('x', (d) => x(d.label))
          .attr('y', (d) => y(d.count))
          .attr('width', x.bandwidth())
          .attr('height', (d) => Math.max(0, innerHeight - y(d.count)))
          .attr('rx', 3)
          .attr('fill', (d) => color(d.label))
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
          .attr('x', margin.left + innerWidth / 2)
          .attr('y', height - 12)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.6)')
          .text(ax.title || '');
        svg
          .append('text')
          .attr('transform', `translate(14,${margin.top + innerHeight / 2}) rotate(-90)`)
          .attr('text-anchor', 'middle')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.6)')
          .text(ay.title || '');

        if (hasLegend) drawLegend(svg, color, ac, margin.left);
      },
    },
  };
</script>

<style scoped>
  .bar-chart {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
