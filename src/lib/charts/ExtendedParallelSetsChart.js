import * as d3 from 'd3';
import { ParallelSetsChart } from '@/lib/charts/prism-charts.js';

// Horizontal padding in pixels between a node's edge and its inside label
const INSIDE_PADDING = 6;
// Pixels the library's invisible hover target extends past each side of a node
const HIT_PAD = 6;
// Link path between node edges; the same shape the library draws
const linkPath = d3
  .linkHorizontal()
  .source((d) => [d.source.x1, d.y0])
  .target((d) => [d.target.x0, d.y1]);

/**
 * ParallelSetsChart with an option to draw node labels inside the nodes.
 * prism-charts.js is a vendored bundle, so this is added here rather than in
 * the library.
 *
 * Extra options:
 *   nodeFill       Fill for every node, e.g. '#fff', replacing the library's
 *                  dark grey (and the color column's category colors); null
 *                  keeps the library's fills.
 *   nodeStroke     Outline color for every node, drawn 1px wide; null for none.
 *   labelPosition  'outside' (default, the library's layout: labels to the
 *                  right of each node) or 'inside'. Inside labels sit in the
 *                  node, left-aligned, in black or white to suit the node's
 *                  fill, and are truncated with an ellipsis to fit its width.
 *                  A node shorter than one line of text gets no label (its
 *                  tooltip still names it). Column headers align with the
 *                  nodes' left edges, and the columns spread across the full
 *                  width, since no space is needed right of the last column.
 *                  Pair it with a wide `nodeWidth` (e.g. 150).
 *
 * This reruns after the library's `draw` (which also runs on resize and
 * highlight changes) and reads its `svg`, `width` and `options` and the d3 data
 * bound to its `.parallel-sets__*` elements; recheck them when prism-charts.js
 * is updated.
 */
export class ExtendedParallelSetsChart extends ParallelSetsChart {
  draw() {
    super.draw();
    this._styleNodes();
    if (this.options.labelPosition === 'inside') this._placeLabelsInside();
  }

  /** Apply the nodeFill / nodeStroke overrides, if set, to every node rect. */
  _styleNodes() {
    const { nodeFill, nodeStroke } = this.options;
    const rects = this.svg.selectAll('.parallel-sets__node-rect');
    if (nodeFill) rects.attr('fill', nodeFill);
    if (nodeStroke) rects.attr('stroke', nodeStroke).attr('stroke-width', 1);
  }

  _placeLabelsInside() {
    const nodeG = this.svg.selectAll('.parallel-sets__node');
    const nodes = nodeG.data();
    if (!nodes.length) return;

    this._spreadColumns(nodes);

    // Node rects, their (wider) hover targets, and the links between them
    nodeG.select('.parallel-sets__node-rect').attr('x', (d) => d.x0);
    nodeG.select('.parallel-sets__node-hit').attr('x', (d) => d.x0 - HIT_PAD);
    this.svg.selectAll('.parallel-sets__link').attr('d', linkPath);

    // Column headers line up with their nodes' left edges
    const columnX = new Map(nodes.map((d) => [d.dim, d.x0]));
    const headers = this.svg.selectAll('.parallel-sets__header');
    headers.attr('x', (col) => columnX.get(col.index) ?? 0);

    const fontSize = +this.svg.attr('font-size') || 14;
    nodeG.each(function (d) {
      const g = d3.select(this);
      const label = g.select('.parallel-sets__label');
      // A node shorter than a line of text can't hold its label, so the label
      // spills over the node's edges onto the ribbons: give it a white glow
      const overflows = d.y1 - d.y0 < fontSize;
      const fill = g.select('.parallel-sets__node-rect').attr('fill');
      const ink = overflows ? DARK_INK : textColorFor(fill);
      label
        .attr('x', d.x0 + INSIDE_PADDING)
        // Inline styles, so they beat the library's halo and fill rules
        .style('fill', ink)
        .style('stroke', overflows ? GLOW_COLOR : 'none')
        .style('stroke-width', overflows ? `${GLOW_WIDTH}px` : null)
        .style('stroke-linejoin', 'round')
        .style('paint-order', 'stroke');
      label.select('.parallel-sets__label-count').style('fill', ink).style('fill-opacity', 0.7);
      fitLabel(label.node(), d.label, d.x1 - d.x0 - INSIDE_PADDING * 2);
    });
  }

  /**
   * Move the columns so the last one ends at the chart's right edge. The
   * library leaves room for outside labels there; inside labels don't need it.
   */
  _spreadColumns(nodes) {
    const nodeWidth = this.options.nodeWidth;
    const lastX0 = d3.max(nodes, (d) => d.x0);
    const targetX0 = Math.max(this.width - nodeWidth, 0);
    if (!lastX0 || lastX0 >= targetX0) return;
    const k = targetX0 / lastX0;
    for (const d of nodes) {
      d.x0 *= k;
      d.x1 = d.x0 + nodeWidth;
    }
  }
}

/** Black or white, whichever reads better on `fill`. */
function textColorFor(fill) {
  const color = d3.color(fill);
  if (!color) return 'rgba(0, 0, 0, 0.82)';
  return d3.lab(color).l > 60 ? 'rgba(0, 0, 0, 0.82)' : '#fff';
}

/**
 * Shorten the label part of a node label (its first text node; the count
 * tspan stays whole) with an ellipsis until the whole text fits `maxWidth`.
 */
function fitLabel(textEl, label, maxWidth) {
  const labelNode = textEl?.firstChild;
  if (!labelNode || labelNode.nodeType !== Node.TEXT_NODE) return;
  labelNode.nodeValue = `${label} `;
  // getComputedTextLength is 0 when the chart isn't laid out; leave it whole then
  if (textEl.getComputedTextLength() <= maxWidth) return;
  let n = label.length;
  while (n > 0) {
    labelNode.nodeValue = `${label.slice(0, n).trimEnd()}… `;
    if (textEl.getComputedTextLength() <= maxWidth) return;
    n -= 1;
  }
}
