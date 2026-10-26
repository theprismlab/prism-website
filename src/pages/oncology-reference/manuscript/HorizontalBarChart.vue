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

  const MARGIN = { top: 12, right: 76, bottom: 56, left: 0 };
  // Room for the y axis title, and the gap between the labels and the plot
  const Y_TITLE_WIDTH = 28;
  const LABEL_GAP = 12;

  export default {
    name: 'HorizontalBarChart',
    mixins: [barChartMixin],
    props: {
      // [{ label, count }], one per bar (see countBy in chartData.js). Bar order comes
      // from axis.y.domain, else the order of the data.
      data: { type: Array, required: true },
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
      // 5 ticks, color domain from y, color range from defaultColors (chartColors.js).
      // Height of each bar's row; the chart is as tall as its rows need
      rowHeight: { type: Number, default: 28 },
    },
    computed: {
      ariaLabel() {
        const bars = this.data.map((d) => `${d.label}: ${d.count}`).join(', ');
        return `Bar chart of ${this.axis.x?.title || 'count'} by ${this.axis.y?.title || 'category'}. ${bars}`;
      },
    },
    methods: {
      draw() {
        const { width } = this;
        const ax = this.axis.x || {};
        const ay = this.axis.y || {};
        const ac = this.axis.color || {};

        const counts = new Map(this.data.map((d) => [d.label, d.count]));
        const labels = mergeLabels(ay.domain, counts.keys());
        const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
        const total = this.total ?? d3.sum(bars, (d) => d.count);

        // The left margin fits the longest bar label, and the height fits every row
        const longest = d3.max(labels, (label) => label.length) || 0;
        const margin = {
          ...MARGIN,
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
        const x = countScale(
          ax,
          [0, innerWidth],
          d3.max(bars, (d) => d.count),
        );
        const color = colorScale(ac, labels);
        const xTicks = countTicks(ax, x);

        const svg = resetSvg(this.$refs.svg, width, height);
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
        styleAxes(yAxis, xAxis);

        drawGridlines(g, xTicks, x, 'vertical', innerHeight);

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
