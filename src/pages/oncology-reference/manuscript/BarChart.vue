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

  // Vertical bars: fixed margins, the y axis title sits in the left margin
  const VERTICAL_MARGIN = { top: 28, right: 16, bottom: 64, left: 64 };
  // Horizontal bars: the left margin is sized to the labels when drawing
  const HORIZONTAL_MARGIN = { top: 12, right: 76, bottom: 56, left: 0 };
  // Room for the y axis title, and the gap between the labels and the plot
  const Y_TITLE_WIDTH = 28;
  const LABEL_GAP = 12;
  // Approximate pixel width of one character of 12px axis text
  const CHAR_WIDTH = 6.5;

  export default {
    name: 'BarChart',
    props: {
      // [{ label, count }], one per bar; see countBy in barChart.js. Bar order comes
      // from the category axis domain, else the order of the data.
      data: { type: Array, required: true },
      // 'vertical' bars stand on the x axis; 'horizontal' bars run from the y axis,
      // one row per bar, and the chart is as tall as its rows need.
      orientation: {
        type: String,
        default: 'vertical',
        validator: (v) => ['vertical', 'horizontal'].includes(v),
      },
      // Total the percentages are taken from (defaults to the sum of the counts)
      total: { type: Number, default: null },
      // { x, y, color }. x and y are the screen axes, so which one holds the bars
      // depends on the orientation: vertical bars are on x with counts up y, and
      // horizontal bars are on y with counts across x. The color axis is the bar
      // fill, and the legend appears when it has a title. Every axis is optional,
      // and so is every property on it:
      // title  Axis title (for color, the legend title).
      // domain bars: labels in order (left to right, or top to bottom); labels
      //        missing from it are added after it, and a listed label with no data
      //        gets an empty bar. counts: [min, max]. color: labels the colors are
      //        assigned to.
      // range  bars: [start, end] pixels along the axis. counts: [start, end]
      //        pixels along the axis (vertical charts count upward, so give
      //        [bottom, top]). color: array of colors, reused in order if too short.
      // ticks  bars: labels to show ticks for. counts: a tick count or an array of
      //        values. color: labels to list in the legend.
      // Defaults: bar domain from the data, count domain [0, max count] rounded up
      // with about 5 ticks, color domain from the bars, color range from
      // defaultColors in chartColors.js.
      axis: { type: Object, default: () => ({}) },
      width: { type: Number, default: 640 },
      // Vertical charts only
      height: { type: Number, default: 320 },
      // Horizontal charts only: the height of each bar's row
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      horizontal() {
        return this.orientation === 'horizontal';
      },
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        const [cat, val] = this.horizontal
          ? [this.axis.y, this.axis.x]
          : [this.axis.x, this.axis.y];
        return `Bar chart of ${val?.title || 'count'} by ${cat?.title || 'category'}. ${bars}`;
      },
    },
    watch: {
      data: { handler: 'draw', deep: true },
      axis: { handler: 'draw', deep: true },
      orientation: 'draw',
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        const { width, horizontal } = this;
        const ax = this.axis.x || {};
        const ay = this.axis.y || {};
        const ac = this.axis.color || {};
        // The category axis holds the bars, the value axis the counts
        const [cat, val] = horizontal ? [ay, ax] : [ax, ay];

        const counts = new Map(this.data.map((d) => [d.label, d.count]));
        const labels = [...new Set([...(cat.domain || []), ...counts.keys()])];
        const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
        const total = this.total ?? d3.sum(bars, (d) => d.count);
        const longest = d3.max(labels, (label) => label.length) || 0;

        // Layout. Horizontal: the left margin fits the longest label and the height
        // fits every row. Vertical: labels too long to sit side by side are tilted,
        // and the chart grows taller by the room they need so the plot area keeps
        // its height.
        let margin, height, tilt;
        if (horizontal) {
          margin = {
            ...HORIZONTAL_MARGIN,
            left: Y_TITLE_WIDTH + Math.ceil(longest * CHAR_WIDTH) + LABEL_GAP,
          };
          height = margin.top + labels.length * this.rowHeight + margin.bottom;
        } else {
          margin = { ...VERTICAL_MARGIN };
          const innerWidth = width - margin.left - margin.right;
          tilt = innerWidth / labels.length < longest * CHAR_WIDTH;
          const extra = tilt ? Math.round(longest * CHAR_WIDTH * Math.sin(Math.PI / 4)) : 0;
          margin.bottom += extra;
          height = this.height + extra;
        }
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales: the bars along one screen axis, the counts along the other
        const band = d3
          .scaleBand()
          .domain(labels)
          .range(cat.range || [0, horizontal ? innerHeight : innerWidth])
          .padding(horizontal ? 0.3 : 0.35);
        const linear = d3
          .scaleLinear()
          .range(val.range || (horizontal ? [0, innerWidth] : [innerHeight, 0]));
        if (val.domain) linear.domain(val.domain);
        else linear.domain([0, d3.max(bars, (d) => d.count) || 1]).nice();
        const colorDomain = ac.domain || labels;
        const color = d3.scaleOrdinal(colorDomain, ac.range || defaultColors(colorDomain.length));
        const valTicks = Array.isArray(val.ticks) ? val.ticks : linear.ticks(val.ticks ?? 5);
        const catTicks = cat.ticks || labels;
        const [x, y] = horizontal ? [linear, band] : [band, linear];

        const svg = d3.select(this.$refs.svg).attr('viewBox', `0 0 ${width} ${height}`);
        svg.selectAll('*').remove();
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Axes: a tick per bar on the category axis, count ticks on the value axis
        const yAxis = g.append('g').call(
          d3
            .axisLeft(y)
            .tickValues(horizontal ? catTicks : valTicks)
            .tickSizeOuter(0),
        );
        const xAxis = g
          .append('g')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(
            d3
              .axisBottom(x)
              .tickValues(horizontal ? valTicks : catTicks)
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

        // Light gridlines at each count tick, drawn behind the bars
        const grid = g
          .insert('g', ':first-child')
          .selectAll('line')
          .data(valTicks)
          .join('line')
          .attr('stroke', 'rgba(0,0,0,0.08)');
        if (horizontal) {
          grid
            .attr('y2', innerHeight)
            .attr('x1', (d) => x(d))
            .attr('x2', (d) => x(d));
        } else {
          grid
            .attr('x2', innerWidth)
            .attr('y1', (d) => y(d))
            .attr('y2', (d) => y(d));
        }

        // Bars, each with its count and share of the total beside its end
        const bar = g.append('g').selectAll('g').data(bars).join('g');
        const rect = bar
          .append('rect')
          .attr('rx', 3)
          .attr('fill', (d) => color(d.label));
        const label = bar
          .append('text')
          .attr('font-size', 12)
          .attr('font-weight', 600)
          .attr('fill', 'rgba(0,0,0,0.87)')
          .text((d) => `${d.count} (${Math.round((d.count / total) * 100)}%)`);
        if (horizontal) {
          rect
            .attr('x', x(0))
            .attr('y', (d) => y(d.label))
            .attr('width', (d) => Math.max(0, x(d.count) - x(0)))
            .attr('height', y.bandwidth());
          label
            .attr('x', (d) => x(d.count) + 6)
            .attr('y', (d) => y(d.label) + y.bandwidth() / 2)
            .attr('dy', '0.35em');
        } else {
          rect
            .attr('x', (d) => x(d.label))
            .attr('y', (d) => y(d.count))
            .attr('width', x.bandwidth())
            .attr('height', (d) => Math.max(0, innerHeight - y(d.count)));
          label
            .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
            .attr('y', (d) => y(d.count) - 6)
            .attr('text-anchor', 'middle');
        }
        rect.append('title').text((d) => `${d.label}: ${d.count} of ${total}`);

        // Axis titles: x centered under the plot, y rotated at the left edge
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

        drawLegend(d3.select(this.$refs.legend), color, ac);
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
