<template>
  <div class="bar-chart" :style="{ maxWidth: `${width}px` }">
    <div ref="legend"></div>
    <svg ref="svg" class="bar-chart__svg" role="img" :aria-label="ariaLabel"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import { defaultColors } from './chartColors.js';
  import { drawLegend } from './chartLegend.js';

  const MARGIN = { top: 12, right: 76, bottom: 56, left: 0 };
  // Room for the y axis title, and the gap between the labels and the plot
  const Y_TITLE_WIDTH = 28;
  const LABEL_GAP = 12;
  // Approximate pixel width of one character of 12px axis text
  const CHAR_WIDTH = 6.5;

  export default {
    name: 'HorizontalStackedBarChart',
    props: {
      // [{ label, segments: [{ key, count }] }], one per bar. Each bar is stacked from
      // its segments, and a segment is colored by its key. Bar order comes from
      // axis.y.domain.
      data: { type: Array, required: true },
      // Total the percentages are taken from (defaults to the sum of all the counts)
      total: { type: Number, default: null },
      // Same config as HorizontalBarChart: x is the horizontal axis (the counts,
      // linear) and y is the vertical axis (the bars, categorical). Every axis is
      // optional, and so is every property on it:
      // title  Axis title (for color, the legend title).
      // domain x: [min, max] counts. y: bar labels from top to bottom; labels missing
      //        from it are added after it. color: segment keys the colors are assigned
      //        to, which is also the stacking order from left to right.
      // range  x: [start, end] pixels across the plot. y: [start, end] pixels down
      //        the plot. color: array of colors, reused in order if too short.
      // ticks  x: a tick count or an array of values. y: labels to show ticks for.
      //        color: keys to list in the legend.
      // Defaults: y domain from the data, x domain [0, max bar total] rounded up, x
      // about 5 ticks, color domain from the segment keys in order of first appearance.
      axis: { type: Object, default: () => ({}) },
      width: { type: Number, default: 640 },
      // Height of each bar's row; the chart is as tall as its rows need
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data
          .map((d) => {
            const parts = d.segments.map((s) => `${s.key} ${s.count}`).join(', ');
            return `${d.label}: ${d3.sum(d.segments, (s) => s.count)} (${parts})`;
          })
          .join('; ');
        return `Stacked bar chart of ${this.axis.x?.title || 'count'} by ${this.axis.y?.title || 'category'}, split by ${this.axis.color?.title || 'group'}. ${bars}`;
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

        const byLabel = new Map(this.data.map((d) => [d.label, d.segments]));
        const labels = [...new Set([...(ay.domain || []), ...byLabel.keys()])];
        const keys = ac.domain || [
          ...new Set(this.data.flatMap((d) => d.segments.map((s) => s.key))),
        ];

        // One entry per bar, with each segment's start and end along the count axis.
        // Segments stack in color-domain order, and keys outside it go last.
        const keyOrder = new Map(keys.map((key, i) => [key, i]));
        const order = (key) => keyOrder.get(key) ?? keys.length;
        const bars = labels.map((label) => {
          const sorted = [...(byLabel.get(label) || [])]
            .filter((s) => s.count > 0)
            .sort((a, b) => order(a.key) - order(b.key));
          let start = 0;
          const segments = sorted.map((s) => ({
            key: s.key,
            count: s.count,
            start,
            end: (start += s.count),
          }));
          return { label, count: start, segments };
        });
        const total = this.total ?? d3.sum(bars, (d) => d.count);

        const svg = d3.select(this.$refs.svg);
        svg.selectAll('*').remove();

        // The left margin fits the longest bar label
        const longest = d3.max(labels, (label) => label.length) || 0;
        const left = Y_TITLE_WIDTH + Math.ceil(longest * CHAR_WIDTH) + LABEL_GAP;
        const color = d3.scaleOrdinal(keys, ac.range || defaultColors(keys.length));
        const margin = { ...MARGIN, left };
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

        const xTicks = Array.isArray(ax.ticks) ? ax.ticks : x.ticks(ax.ticks ?? 5);

        svg.attr('viewBox', `0 0 ${width} ${height}`);
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

        // Bars: one rect per segment, with a thin white gap between neighbors, and
        // the bar's total count and share beside the end of the stack
        const bar = g.append('g').selectAll('g').data(bars).join('g');
        bar
          .selectAll('rect')
          .data((d) => d.segments.map((s) => ({ ...s, label: d.label, barCount: d.count })))
          .join('rect')
          .attr('x', (d) => x(d.start))
          .attr('y', (d) => y(d.label))
          .attr('width', (d) => Math.max(0, x(d.end) - x(d.start)))
          .attr('height', y.bandwidth())
          .attr('fill', (d) => color(d.key))
          .attr('stroke', '#fff')
          .attr('stroke-width', 1)
          .append('title')
          .text((d) => `${d.label}, ${d.key}: ${d.count} of ${d.barCount} (${total} total)`);
        bar
          .append('text')
          .attr('x', (d) => x(d.count) + 6)
          .attr('y', (d) => y(d.label) + y.bandwidth() / 2)
          .attr('dy', '0.35em')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.87)')
          .text((d) => `${d.count} (${Math.round((d.count / total) * 100)}%)`);

        drawLegend(d3.select(this.$refs.legend), color, ac);

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
      },
    },
  };
</script>

<style scoped>
  .bar-chart__svg {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
