import * as d3 from 'd3';
import './StackedBarChart.css';
import { defaultColors } from './chartColors.js';
import { drawLegend } from './chartLegend.js';
import { maxTextWidth, resolveFontSize } from './chartText.js';

// Gap between the bar labels and the plot, and between a bar and its count
const LABEL_GAP = 12;
const COUNT_GAP = 6;

/**
 * Options, all optional except `data`. Change them later with `update()`.
 *
 * data       [{ label, count, segments: [{ key, count }] }], one per bar; see
 *            countByStacked in stackedBarChartData.js. Bars are horizontal, one row
 *            per bar, and the chart is as tall as its rows need. Each bar is stacked
 *            from its segments, and a segment is colored by its key. Bar order comes
 *            from axis.y.domain, else the order of the data.
 * total      Total the percentages are taken from (default: the sum of all counts).
 * axis       { x, y, color }: x is the horizontal axis (the counts), y the vertical
 *            axis (the bars), and color the segment fill, with the legend shown when
 *            it has a title. Every axis is optional, and so is every property on it:
 *            title   Axis title (for color, the legend title).
 *            domain  x: [min, max] counts. y: bar labels from top to bottom; labels
 *                    missing from it are added after it. color: segment keys the
 *                    colors are assigned to, which is also the stacking order from
 *                    left to right.
 *            range   x: [start, end] pixels across the plot. y: [start, end] pixels
 *                    down the plot. color: array of colors, reused in order if too
 *                    short.
 *            ticks   x: a tick count or an array of values. y: labels to show ticks
 *                    for. color: keys to list in the legend.
 *            Defaults: y domain from the data, x domain [0, max bar total] rounded
 *            up with about 5 ticks, color domain from the segment keys in order of
 *            first appearance, color range from defaultColors in chartColors.js.
 * fontSize   Size of every text in the chart (ticks, counts, titles, legend):
 *            'small', 'medium' (default) or 'large' (see chartText.js), or a number
 *            of pixels. The margins scale with it.
 * width      Pixels; the chart scales down to fit a narrower container. Default 640.
 * rowHeight  Height of each bar's row. Default 28.
 */
const DEFAULTS = {
  data: [],
  total: null,
  axis: {},
  fontSize: 'medium',
  width: 640,
  rowHeight: 28,
};

/**
 * SVG horizontal stacked bar chart, drawn into a container element:
 *
 *   const chart = new StackedBarChart(el, { data, axis });
 *   chart.setData(newData);
 *   chart.update({ fontSize: 'small' });
 *   chart.destroy();
 */
export default class StackedBarChart {
  constructor(container, options = {}) {
    if (!container) throw new Error('StackedBarChart: a container element is required');
    this.container = container;
    this.options = { ...DEFAULTS, ...options };

    this.root = d3.select(container).classed('stacked-bar-chart', true);
    this.legend = this.root.append('div');
    this.svg = this.root.append('svg').attr('class', 'stacked-bar-chart__svg').attr('role', 'img');
    this.draw();
  }

  /** Replace the bars and redraw. */
  setData(data) {
    this.update({ data });
  }

  /** Change any of the constructor options and redraw. */
  update(options) {
    this.options = { ...this.options, ...options };
    this.draw();
  }

  destroy() {
    this.root.selectAll('*').remove();
    this.root.classed('stacked-bar-chart', false).style('max-width', null);
  }

  draw() {
    const { width, total: fixedTotal, rowHeight, data } = this.options;
    const svgElement = this.svg.node();
    const fs = resolveFontSize(this.options.fontSize);
    const ax = this.options.axis.x || {};
    const ay = this.options.axis.y || {};
    const ac = this.options.axis.color || {};

    const byLabel = new Map(data.map((d) => [d.label, d.segments]));
    const labels = [...new Set([...(ay.domain || []), ...byLabel.keys()])];
    const keys = ac.domain || [...new Set(data.flatMap((d) => d.segments.map((s) => s.key)))];

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
    const total = fixedTotal ?? d3.sum(bars, (d) => d.count);
    const countLabel = (d) => `${d.count} (${Math.round((d.count / total) * 100)}%)`;

    // Margins hold the bar labels, the axis titles (one line of text each) and
    // the count beside the end of the longest bar; the height fits every row
    const margin = {
      top: fs,
      right: maxTextWidth(bars.map(countLabel), fs, svgElement, 600) + COUNT_GAP + 8,
      bottom: 2 * fs + 32,
      left: fs + 16 + maxTextWidth(labels, fs, svgElement) + LABEL_GAP,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = labels.length * rowHeight;
    const height = margin.top + innerHeight + margin.bottom;

    const y = d3
      .scaleBand()
      .domain(labels)
      .range(ay.range || [0, innerHeight])
      .padding(0.3);
    const x = d3.scaleLinear().range(ax.range || [0, innerWidth]);
    if (ax.domain) x.domain(ax.domain);
    else x.domain([0, d3.max(bars, (d) => d.count) || 1]).nice();
    const color = d3.scaleOrdinal(keys, ac.range || defaultColors(keys.length));
    const xTicks = Array.isArray(ax.ticks) ? ax.ticks : x.ticks(ax.ticks ?? 5);

    this.root.style('max-width', `${width}px`);
    const described = bars
      .map((d) => {
        const parts = d.segments.map((s) => `${s.key} ${s.count}`).join(', ');
        return `${d.label}: ${d.count} (${parts})`;
      })
      .join('; ');
    const svg = this.svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr(
        'aria-label',
        `Stacked bar chart of ${ax.title || 'count'} by ${ay.title || 'category'}, ` +
          `split by ${ac.title || 'group'}. ${described}`,
      );
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Y axis with a tick beside each bar, and X axis with count ticks. d3 sets
    // its own font family on an axis; clearing it lets the page's through,
    // which is also what the labels were measured in.
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
      axis.attr('font-family', null).attr('font-size', fs);
      axis.selectAll('text').attr('fill', 'rgba(0,0,0,0.7)');
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
      .attr('x', (d) => x(d.count) + COUNT_GAP)
      .attr('y', (d) => y(d.label) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('font-size', fs)
      .attr('font-weight', 600)
      .attr('fill', 'rgba(0,0,0,0.87)')
      .text(countLabel);

    // Axis titles: x centered under the plot, y rotated at the left edge
    const title = (text) =>
      svg
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('font-size', fs)
        .attr('font-weight', 600)
        .attr('fill', 'rgba(0,0,0,0.6)')
        .text(text || '');
    title(ax.title)
      .attr('x', margin.left + innerWidth / 2)
      .attr('y', height - fs);
    title(ay.title).attr(
      'transform',
      `translate(${fs + 2},${margin.top + innerHeight / 2}) rotate(-90)`,
    );

    drawLegend(this.legend, color, { ...ac, fontSize: fs });
  }
}
