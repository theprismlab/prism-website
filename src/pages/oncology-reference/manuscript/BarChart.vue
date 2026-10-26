<template>
  <div class="bar-chart" :style="{ maxWidth: `${width}px` }">
    <div ref="legend"></div>
    <svg ref="svg" class="bar-chart__svg" role="img" :aria-label="ariaLabel"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import { drawLegend } from './chartLegend.js';
  import {
    CHAR_WIDTH,
    barChartMixin,
    colorScale,
    countLabel,
    countScale,
    countTicks,
    drawAxisTitles,
    drawGridlines,
    mergeLabels,
    resetSvg,
    styleAxes,
  } from './barChartShared.js';

  const MARGIN = { top: 28, right: 16, bottom: 64, left: 64 };

  export default {
    name: 'BarChart',
    mixins: [barChartMixin],
    props: {
      // [{ label, count }], one per bar (see countBy in chartData.js). Bar order comes
      // from axis.x.domain, else the order of the data.
      data: { type: Array, required: true },
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
      // 5 ticks, color domain from x, color range from defaultColors (chartColors.js).
      height: { type: Number, default: 320 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        return `Bar chart of ${this.axis.y?.title || 'count'} by ${this.axis.x?.title || 'category'}. ${bars}`;
      },
    },
    methods: {
      draw() {
        const { width } = this;
        const ax = this.axis.x || {};
        const ay = this.axis.y || {};
        const ac = this.axis.color || {};

        const counts = new Map(this.data.map((d) => [d.label, d.count]));
        const labels = mergeLabels(ax.domain, counts.keys());
        const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
        const total = this.total ?? d3.sum(bars, (d) => d.count);

        const margin = { ...MARGIN };
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
        const y = countScale(
          ay,
          [innerHeight, 0],
          d3.max(bars, (d) => d.count),
        );
        const color = colorScale(ac, labels);
        const yTicks = countTicks(ay, y);

        const svg = resetSvg(this.$refs.svg, width, height);
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
        styleAxes(yAxis, xAxis);

        if (tilt) {
          xAxis
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')
            .attr('dx', '-0.6em')
            .attr('dy', '0.15em');
        }

        drawGridlines(g, yTicks, y, 'horizontal', innerWidth);

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
          .text((d) => countLabel(d.count, total));

        drawAxisTitles(svg, {
          x: ax.title,
          y: ay.title,
          margin,
          innerWidth,
          innerHeight,
          height,
        });
        drawLegend(d3.select(this.$refs.legend), color, ac);
      },
    },
  };
</script>
