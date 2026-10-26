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

  const MARGIN = { top: 12, right: 76, bottom: 56, left: 0 };
  const LEGEND_HEIGHT = 24;
  // Room for the y axis title, and the gap between the labels and the plot
  const Y_TITLE_WIDTH = 28;
  const LABEL_GAP = 12;
  // Approximate pixel width of one character of 12px axis text
  const CHAR_WIDTH = 6.5;

  export default {
    name: 'HorizontalBarChart',
    props: {
      // [{ label, count }], one per bar. Bar order comes from axis.y.domain.
      data: { type: Array, required: true },
      // Total the percentages are taken from (defaults to the sum of the counts)
      total: { type: Number, default: null },
      // Same config as BarChart, but x and y name the screen axes: x is the horizontal
      // axis (the counts, linear) and y is the vertical axis (the bars, categorical).
      // Every axis is optional, and so is every property on it:
      // title  Axis title (for color, the legend title).
      // domain x: [min, max] counts. y: bar labels from top to bottom; labels missing
      //        from it are added after it, and a listed label with no data gets a
      //        zero-length bar. color: labels the colors are assigned to.
      // range  x: [start, end] pixels across the plot. y: [start, end] pixels down
      //        the plot. color: array of colors, reused in order if too short.
      // ticks  x: a tick count or an array of values. y: labels to show ticks for.
      //        color: labels to list in the legend.
      // Defaults: y domain from the data, x domain [0, max count] rounded up, x about
      // 5 ticks, color domain from y, color range d3.schemeTableau10 (or
      // a 14-color alternating-lightness palette when there are more than 10 bars).
      axis: { type: Object, default: () => ({}) },
      width: { type: Number, default: 640 },
      // Height of each bar's row; the chart is as tall as its rows need
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        return `Bar chart of ${this.axis.x?.title || 'count'} by ${this.axis.y?.title || 'category'}. ${bars}`;
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
        const labels = [...new Set([...(ay.domain || []), ...counts.keys()])];
        const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
        const total = this.total ?? d3.sum(bars, (d) => d.count);

        // The left margin fits the longest bar label, and the height fits every row
        const hasLegend = Boolean(ac.title);
        const longest = d3.max(labels, (label) => label.length) || 0;
        const margin = {
          ...MARGIN,
          top: MARGIN.top + (hasLegend ? LEGEND_HEIGHT : 0),
          left: Y_TITLE_WIDTH + Math.ceil(longest * CHAR_WIDTH) + LABEL_GAP,
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = labels.length * this.rowHeight;
        const height = margin.top + innerHeight + margin.bottom;

        const y = d3
          .scaleBand()
          .domain(labels)
          .range(ay.range || [0, innerHeight])
          .padding(0.3);
        const x = d3.scaleLinear().range(ax.range || [0, innerWidth]);
        if (ax.domain) x.domain(ax.domain);
        else x.domain([0, d3.max(bars, (d) => d.count) || 1]).nice();
        const colorDomain = ac.domain || labels;
        const color = d3.scaleOrdinal(colorDomain, ac.range || defaultColors(colorDomain.length));

        const xTicks = Array.isArray(ax.ticks) ? ax.ticks : x.ticks(ax.ticks ?? 5);

        const svg = d3.select(this.$refs.svg).attr('viewBox', `0 0 ${width} ${height}`);
        svg.selectAll('*').remove();
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Y axis with a tick beside each bar, and X axis with count ticks
        const yAxis = g.append('g').call(
          d3
            .axisLeft(y)
            .tickValues(ay.ticks || labels)
            .tickSizeOuter(0),
        );
        const xAxis = g
          .append('g')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(x).tickValues(xTicks).tickSizeOuter(0));
        for (const axis of [yAxis, xAxis]) {
          axis.selectAll('text').attr('font-size', 12).attr('fill', 'rgba(0,0,0,0.7)');
          axis.selectAll('.domain, .tick line').attr('stroke', 'rgba(0,0,0,0.5)');
        }

        // Light gridlines down the plot at each x tick, drawn behind the bars
        g.insert('g', ':first-child')
          .selectAll('line')
          .data(xTicks)
          .join('line')
          .attr('y2', innerHeight)
          .attr('x1', (d) => x(d))
          .attr('x2', (d) => x(d))
          .attr('stroke', 'rgba(0,0,0,0.08)');

        // Bars, each with its count and share of the total beside it
        const bar = g.append('g').selectAll('g').data(bars).join('g');
        bar
          .append('rect')
          .attr('x', x(0))
          .attr('y', (d) => y(d.label))
          .attr('width', (d) => Math.max(0, x(d.count) - x(0)))
          .attr('height', y.bandwidth())
          .attr('rx', 3)
          .attr('fill', (d) => color(d.label))
          .append('title')
          .text((d) => `${d.label}: ${d.count} of ${total}`);
        bar
          .append('text')
          .attr('x', (d) => x(d.count) + 6)
          .attr('y', (d) => y(d.label) + y.bandwidth() / 2)
          .attr('dy', '0.35em')
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
