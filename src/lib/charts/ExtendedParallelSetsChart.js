import * as d3 from 'd3';
import { ParallelSetsChart } from '@/lib/charts/prism-charts.js';

// Horizontal padding in pixels between a node's edge and its inside label
const INSIDE_PADDING = 6;
// Pixels the library's invisible hover target extends past each side of a node
const HIT_PAD = 6;
// Label text color on light fills and over ribbons
const DARK_INK = 'rgba(0, 0, 0, 0.82)';
// Halo around labels too tall for their node, so they read over the ribbons
const GLOW_COLOR = '#fff';
const GLOW_WIDTH = 4;
// Line spacing of wrapped inside labels, in ems
const LINE_HEIGHT = 1.15;
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
 *   showCounts     true (default) shows each category's count after its label
 *                  and as a tooltip row; false leaves counts out of both.
 *   labelPosition  'outside' (default, the library's layout: labels to the
 *                  right of each node) or 'inside'. Inside labels are centered
 *                  in the node, in black or white to suit the node's fill, and
 *                  wrap onto more lines between words to fit its width. They
 *                  never show counts. A node too short for its label still
 *                  shows it, in dark text with a white glow so it reads where
 *                  it spills over the ribbons. Column headers align with the
 *                  nodes' left edges, and the columns spread across the full
 *                  width, since no space is needed right of the last column.
 *                  Pair it with a wide `nodeWidth` (e.g. 150).
 *
 * This overrides the library's `_nodeTooltip` / `_linkTooltip`, reruns after its `draw` (which also runs on resize and
 * highlight changes) and reads its `svg`, `width`, `options` and `prepared.columns` and the d3 data
 * bound to its `.parallel-sets__*` elements; recheck them when prism-charts.js
 * is updated.
 */
export class ExtendedParallelSetsChart extends ParallelSetsChart {
  draw() {
    super.draw();
    this._styleNodes();
    if (this.options.labelPosition === 'inside') this._placeLabelsInside();
    else if (!this.options.showCounts) this._removeLabelCounts();
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
      const lines = wrapLabel(label.node(), d.label, d.x1 - d.x0 - INSIDE_PADDING * 2);
      const cx = (d.x0 + d.x1) / 2;
      // Rebuild the label as one centered tspan per line (the count is dropped),
      // with the block of lines centered on the node vertically
      label.text(null).attr('x', cx).attr('text-anchor', 'middle').attr('dy', null);
      lines.forEach((line, i) => {
        label
          .append('tspan')
          .attr('x', cx)
          .attr(
            'dy',
            i === 0 ? `${0.35 - ((lines.length - 1) * LINE_HEIGHT) / 2}em` : `${LINE_HEIGHT}em`,
          )
          .text(line);
      });
      // A node shorter than its label can't hold it, so the label spills over
      // the node's edges onto the ribbons: give it a white glow
      const overflows = d.y1 - d.y0 < lines.length * LINE_HEIGHT * fontSize;
      const fill = g.select('.parallel-sets__node-rect').attr('fill');
      label
        // Inline styles, so they beat the library's halo and fill rules
        .style('fill', overflows ? DARK_INK : textColorFor(fill))
        .style('stroke', overflows ? GLOW_COLOR : 'none')
        .style('stroke-width', overflows ? `${GLOW_WIDTH}px` : null)
        .style('stroke-linejoin', 'round')
        .style('paint-order', 'stroke');
    });
  }

  /** Outside labels: drop the count after each label when showCounts is false. */
  _removeLabelCounts() {
    this.svg.selectAll('.parallel-sets__label-count').remove();
  }

  // Tooltips: the library adds a count row last; drop it when showCounts is false
  _nodeTooltip(hovered) {
    if (this.options.showCounts) return super._nodeTooltip(hovered);
    const rows = [[this.prepared.columns[hovered.node.dim].title, hovered.node.label]];
    return this.options.tooltip ? this.options.tooltip(hovered, rows) : rows;
  }

  _linkTooltip(hovered) {
    if (this.options.showCounts) return super._linkTooltip(hovered);
    const rows = hovered.keys.map((_, i) => [this.prepared.columns[i].title, hovered.labels[i]]);
    return this.options.tooltip ? this.options.tooltip(hovered, rows) : rows;
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
  if (!color) return DARK_INK;
  return d3.lab(color).l > 60 ? DARK_INK : '#fff';
}

/**
 * Split `label` into lines no wider than `maxWidth`, breaking between words,
 * measured with `textEl` (whose content this overwrites). A single word wider
 * than `maxWidth` gets a line to itself and overflows it.
 */
function wrapLabel(textEl, label, maxWidth) {
  const words = String(label).split(/\s+/).filter(Boolean);
  if (!textEl || !words.length) return [String(label)];
  const fits = (text) => {
    textEl.textContent = text;
    // 0 when the chart isn't laid out; everything "fits" on one line then
    return textEl.getComputedTextLength() <= maxWidth;
  };
  const lines = [];
  let line = words[0];
  for (const word of words.slice(1)) {
    const candidate = `${line} ${word}`;
    if (fits(candidate)) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  lines.push(line);
  return lines;
}
