import * as d3 from 'd3';
import { defaultColors } from './chartColors.js';
import './barChart.css';

// Everything the bar charts have in common: the props they all take, redrawing when
// they change, and the drawing steps that look the same whichever way the bars point.

// Approximate pixel width of one character of 12px axis text
export const CHAR_WIDTH = 6.5;

/** "12 (34%)" label shown beside each bar. */
export function countLabel(count, total) {
  return `${count} (${Math.round((count / total) * 100)}%)`;
}

/**
 * Props and redraw wiring for a bar chart component. The component supplies a `draw()`
 * method, an `svg` ref and a `legend` ref, and its own `data` prop.
 */
export const barChartMixin = {
  props: {
    // Total the percentages are taken from (defaults to the sum of the counts)
    total: { type: Number, default: null },
    // { x, y, color }, each optional, each with optional title, domain, range and ticks.
    // The chart's own docs say what each means for it.
    axis: { type: Object, default: () => ({}) },
    width: { type: Number, default: 640 },
  },
  watch: {
    data: { handler: 'draw', deep: true },
    axis: { handler: 'draw', deep: true },
  },
  mounted() {
    this.draw();
  },
};

/** Labels in domain order, followed by any labels in the data the domain left out. */
export function mergeLabels(domain, dataLabels) {
  return [...new Set([...(domain || []), ...dataLabels])];
}

/** Ordinal color scale from a color axis config, defaulting its domain to `fallback`. */
export function colorScale(config, fallback) {
  const domain = config.domain || fallback;
  return d3.scaleOrdinal(domain, config.range || defaultColors(domain.length));
}

/** Linear count scale: the axis domain if given, otherwise 0 to `max`, rounded up. */
export function countScale(config, range, max) {
  const scale = d3.scaleLinear().range(config.range || range);
  if (config.domain) scale.domain(config.domain);
  else scale.domain([0, max || 1]).nice();
  return scale;
}

/** Tick values for a count scale: the array in config.ticks, or about that many. */
export function countTicks(config, scale) {
  return Array.isArray(config.ticks) ? config.ticks : scale.ticks(config.ticks ?? 5);
}

/** Clear the SVG and size it to its viewBox; returns the d3 selection. */
export function resetSvg(svgElement, width, height) {
  const svg = d3.select(svgElement).attr('viewBox', `0 0 ${width} ${height}`);
  svg.selectAll('*').remove();
  return svg;
}

/** Give axis groups the charts' shared text and line colors. */
export function styleAxes(...axes) {
  for (const axis of axes) {
    axis.selectAll('text').attr('font-size', 12).attr('fill', 'rgba(0,0,0,0.7)');
    axis.selectAll('.domain, .tick line').attr('stroke', 'rgba(0,0,0,0.5)');
  }
}

/**
 * Light gridlines at each tick, drawn behind everything else in `g`.
 *
 * @param g d3 selection of the plot area
 * @param {number[]} ticks values of the count scale to draw a line at
 * @param scale the count scale
 * @param {'horizontal'|'vertical'} direction 'horizontal' lines run across the plot (for
 *   a vertical bar chart's y ticks); 'vertical' lines run down it
 * @param {number} length how far the lines run
 */
export function drawGridlines(g, ticks, scale, direction, length) {
  const lines = g.insert('g', ':first-child').selectAll('line').data(ticks).join('line');
  lines.attr('stroke', 'rgba(0,0,0,0.08)');
  if (direction === 'horizontal') {
    lines
      .attr('x2', length)
      .attr('y1', (d) => scale(d))
      .attr('y2', (d) => scale(d));
  } else {
    lines
      .attr('y2', length)
      .attr('x1', (d) => scale(d))
      .attr('x2', (d) => scale(d));
  }
}

/** Axis titles: x centered under the plot, y rotated at the left edge. */
export function drawAxisTitles(svg, { x, y, margin, innerWidth, innerHeight, height }) {
  const title = (text) =>
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .attr('fill', 'rgba(0,0,0,0.6)')
      .text(text || '');
  title(x)
    .attr('x', margin.left + innerWidth / 2)
    .attr('y', height - 12);
  title(y).attr('transform', `translate(14,${margin.top + innerHeight / 2}) rotate(-90)`);
}
