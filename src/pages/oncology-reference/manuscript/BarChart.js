import * as d3 from 'd3';
import './BarChart.css';
import { defaultColors } from './chartColors.js';
import { drawLegend } from './chartLegend.js';
import { maxTextWidth, resolveFontSize } from './chartText.js';

// Gap between an axis' tick labels and the plot, and between a bar and its count
const LABEL_GAP = 12;
const COUNT_GAP = 6;

/**
 * Options, all optional except `data`. Change them later with `update()`.
 *
 * data         [{ label, count }], one per bar; see countBy in barChartData.js. Bar
 *              order comes from the category axis domain, else the order of the data.
 * orientation  'vertical' bars stand on the x axis (default); 'horizontal' bars run
 *              from the y axis, one row per bar, and the chart is as tall as its
 *              rows need.
 * total        Total the percentages are taken from (default: the sum of the counts).
 * axis         { x, y, color }. x and y are the screen axes, so which one holds the
 *              bars depends on the orientation: vertical bars are on x with counts
 *              up y, and horizontal bars are on y with counts across x. The color
 *              axis is the bar fill, and the legend appears when it has a title.
 *              Every axis is optional, and so is every property on it:
 *              title   Axis title (for color, the legend title).
 *              domain  bars: labels in order (left to right, or top to bottom);
 *                      labels missing from it are added after it, and a listed label
 *                      with no data gets an empty bar. counts: [min, max]. color:
 *                      labels the colors are assigned to.
 *              range   bars: [start, end] pixels along the axis. counts: [start, end]
 *                      pixels along the axis (vertical charts count upward, so give
 *                      [bottom, top]). color: array of colors, reused in order if
 *                      too short.
 *              ticks   bars: labels to show ticks for. counts: a tick count or an
 *                      array of values. color: labels to list in the legend.
 *              Defaults: bar domain from the data, count domain [0, max count]
 *              rounded up with about 5 ticks, color domain from the bars, color
 *              range from defaultColors in chartColors.js.
 * fontSize     Size of every text in the chart (ticks, counts, titles, legend):
 *              'small', 'medium' (default) or 'large' (see chartText.js), or a
 *              number of pixels. The margins scale with it.
 * width        Pixels; the chart scales down to fit a narrower container. Default 640.
 * height       Vertical charts only. Default 320.
 * rowHeight    Horizontal charts only: the height of each bar's row. Default 28.
 */
const DEFAULTS = {
  data: [],
  orientation: 'vertical',
  total: null,
  axis: {},
  fontSize: 'medium',
  width: 640,
  height: 320,
  rowHeight: 28,
};

/**
 * SVG bar chart of counts per category, drawn into a container element:
 *
 *   const chart = new BarChart(el, { data, orientation: 'horizontal', axis });
 *   chart.setData(newData);
 *   chart.update({ fontSize: 'small' });
 *   chart.destroy();
 */
export default class BarChart {
  constructor(container, options = {}) {
    if (!container) throw new Error('BarChart: a container element is required');
    this.container = container;
    this.options = { ...DEFAULTS, ...options };

    this.root = d3.select(container).classed('bar-chart', true);
    this.legend = this.root.append('div');
    this.svg = this.root.append('svg').attr('class', 'bar-chart__svg').attr('role', 'img');
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
    this.root.classed('bar-chart', false).style('max-width', null);
  }

  draw() {
    const { width, total: fixedTotal, rowHeight } = this.options;
    const horizontal = this.options.orientation === 'horizontal';
    const svgElement = this.svg.node();
    const fs = resolveFontSize(this.options.fontSize);
    const ax = this.options.axis.x || {};
    const ay = this.options.axis.y || {};
    const ac = this.options.axis.color || {};
    // The category axis holds the bars, the value axis the counts
    const [cat, val] = horizontal ? [ay, ax] : [ax, ay];

    const counts = new Map(this.options.data.map((d) => [d.label, d.count]));
    const labels = [...new Set([...(cat.domain || []), ...counts.keys()])];
    const bars = labels.map((label) => ({ label, count: counts.get(label) || 0 }));
    const total = fixedTotal ?? d3.sum(bars, (d) => d.count);
    const countLabel = (d) => `${d.count} (${Math.round((d.count / total) * 100)}%)`;

    // The count scale's domain and ticks don't depend on the layout, and the
    // layout needs the tick labels to size the margins
    const linear = d3.scaleLinear();
    if (val.domain) linear.domain(val.domain);
    else linear.domain([0, d3.max(bars, (d) => d.count) || 1]).nice();
    const valTicks = Array.isArray(val.ticks) ? val.ticks : linear.ticks(val.ticks ?? 5);
    const catTicks = cat.ticks || labels;

    // Layout. Margins hold the tick labels, the axis titles (one line of text
    // each) and the count beside the end of the longest bar. Horizontal: the
    // height fits every row. Vertical: labels too long to sit side by side are
    // tilted, and the chart grows taller by the room they need so the plot area
    // keeps its height.
    const titleLane = fs + 16;
    const labelWidth = maxTextWidth(labels, fs, svgElement);
    let margin, height, tilt;
    if (horizontal) {
      margin = {
        top: fs,
        right: maxTextWidth(bars.map(countLabel), fs, svgElement, 600) + COUNT_GAP + 8,
        bottom: 2 * fs + 32,
        left: titleLane + labelWidth + LABEL_GAP,
      };
      height = margin.top + labels.length * rowHeight + margin.bottom;
    } else {
      margin = {
        top: fs + 16,
        right: 16,
        bottom: 2 * fs + 40,
        left: titleLane + maxTextWidth(valTicks, fs, svgElement) + LABEL_GAP,
      };
      const innerWidth = width - margin.left - margin.right;
      tilt = innerWidth / labels.length < labelWidth;
      const extra = tilt ? Math.round(labelWidth * Math.sin(Math.PI / 4)) : 0;
      margin.bottom += extra;
      height = this.options.height + extra;
    }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales: the bars along one screen axis, the counts along the other
    const band = d3
      .scaleBand()
      .domain(labels)
      .range(cat.range || [0, horizontal ? innerHeight : innerWidth])
      .padding(horizontal ? 0.3 : 0.35);
    linear.range(val.range || (horizontal ? [0, innerWidth] : [innerHeight, 0]));
    const colorDomain = ac.domain || labels;
    const color = d3.scaleOrdinal(colorDomain, ac.range || defaultColors(colorDomain.length));
    const [x, y] = horizontal ? [linear, band] : [band, linear];

    this.root.style('max-width', `${width}px`);
    const svg = this.svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr(
        'aria-label',
        `Bar chart of ${val.title || 'count'} by ${cat.title || 'category'}. ` +
          bars.map((d) => `${d.label}: ${d.count}`).join(', '),
      );
    svg.selectAll('*').remove();
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Axes: a tick per bar on the category axis, count ticks on the value axis.
    // d3 sets its own font family on an axis; clearing it lets the page's
    // through, which is also what the labels were measured in.
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
      axis.attr('font-family', null).attr('font-size', fs);
      axis.selectAll('text').attr('fill', 'rgba(0,0,0,0.7)');
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
      .attr('font-size', fs)
      .attr('font-weight', 600)
      .attr('fill', 'rgba(0,0,0,0.87)')
      .text(countLabel);
    if (horizontal) {
      rect
        .attr('x', x(0))
        .attr('y', (d) => y(d.label))
        .attr('width', (d) => Math.max(0, x(d.count) - x(0)))
        .attr('height', y.bandwidth());
      label
        .attr('x', (d) => x(d.count) + COUNT_GAP)
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
        .attr('y', (d) => y(d.count) - COUNT_GAP)
        .attr('text-anchor', 'middle');
    }
    rect.append('title').text((d) => `${d.label}: ${d.count} of ${total}`);

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
