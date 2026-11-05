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
 * ParallelSetsChart with merged ribbons, inside labels and node styling.
 * prism-charts.js is a vendored bundle, so these are added here rather than in
 * the library.
 *
 * Extra options:
 *   bundleLinks    false (default) keeps the library's ribbons: one per full
 *                  path through every column, ordered by the color column. true
 *                  merges, between each pair of adjacent columns, the ribbons
 *                  that share a source node, target node and color into one,
 *                  and stacks each node's ribbons in the order of the nodes they
 *                  lead to (then by color), so ribbons bound for the same node
 *                  leave together and cross as little as possible. Hovering a
 *                  node or ribbon still traces exactly its agents through every
 *                  column: the matching share of each ribbon is drawn on top.
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
 * With bundleLinks, `onHover` receives `{ type: 'node', node }` or
 * `{ type: 'link', link, value }` (link: a merged ribbon), and the `tooltip`
 * option gets the same objects.
 *
 * This reruns after the library's `draw` (which also runs on resize and
 * highlight changes); overrides its `_bindHover`, `_nodeTooltip` and
 * `_linkTooltip`; sets its `_applyHover`; and reads its `svg`, `width`,
 * `options`, `hovered`, `tooltip`, `_setHovered`, `_countRow` and `prepared`
 * (`columns`, `colorIndex`, `paths`) plus the d3 data bound to its
 * `.parallel-sets__*` elements. Recheck them when prism-charts.js is updated.
 */
export class ExtendedParallelSetsChart extends ParallelSetsChart {
  draw() {
    this.bundledLinks = null;
    super.draw();
    const nodeG = this.svg.selectAll('.parallel-sets__node');
    if (nodeG.empty()) return;
    const inside = this.options.labelPosition === 'inside';

    this._styleNodes();
    if (inside) this._spreadColumns(nodeG);
    if (this.options.bundleLinks) {
      this._bundleLinks();
      if (this.options.hover) this._bindBundledHover(nodeG);
    } else if (inside) {
      this.svg.selectAll('.parallel-sets__link').attr('d', linkPath);
    }
    if (inside) this._placeLabelsInside(nodeG);
    else if (!this.options.showCounts) this._removeLabelCounts();
  }

  /** Apply the nodeFill / nodeStroke overrides, if set, to every node rect. */
  _styleNodes() {
    const { nodeFill, nodeStroke } = this.options;
    const rects = this.svg.selectAll('.parallel-sets__node-rect');
    if (nodeFill) rects.attr('fill', nodeFill);
    if (nodeStroke) rects.attr('stroke', nodeStroke).attr('stroke-width', 1);
  }

  // ── Merged ribbons ─────────────────────────────────────────────────────────

  /**
   * Replace the library's per-path ribbons with one per (column pair, source,
   * target, color), stacked within each node by the position of the node at
   * the other end, then by color order.
   */
  _bundleLinks() {
    const old = this.svg.selectAll('.parallel-sets__link');
    if (old.empty()) return;
    const linkG = d3.select(old.node().parentNode);
    const { paths, columns, colorIndex } = this.prepared;
    const pathByRecords = new Map(paths.map((p) => [p.records, p]));

    const merged = new Map();
    old.each(function (l) {
      const id = `${l.pair}|${l.source.id}|${l.target.id}|${l.colorKey}`;
      let m = merged.get(id);
      if (!m) {
        m = {
          source: l.source,
          target: l.target,
          pair: l.pair,
          colorKey: l.colorKey,
          value: 0,
          width: 0,
          paths: [],
          // Same for every ribbon of this color, including the legend's greying
          stroke: d3.select(this).attr('stroke'),
        };
        merged.set(id, m);
      }
      m.value += l.value;
      m.width += l.width;
      m.paths.push(pathByRecords.get(l.records));
    });
    const links = [...merged.values()];

    const colorOrder = new Map(columns[colorIndex].nodes.map((n) => [n.key, n.index]));
    const byColor = (a, b) => (colorOrder.get(a.colorKey) ?? 0) - (colorOrder.get(b.colorKey) ?? 0);
    // Source side: stack each node's outgoing ribbons by target position
    for (const group of d3.group(links, (l) => l.source).values()) {
      group.sort((a, b) => a.target.y0 - b.target.y0 || byColor(a, b));
      let y = group[0].source.y0;
      for (const l of group) {
        l.y0 = y + l.width / 2;
        y += l.width;
      }
    }
    // Target side: stack each node's incoming ribbons by source position
    for (const group of d3.group(links, (l) => l.target).values()) {
      group.sort((a, b) => a.source.y0 - b.source.y0 || byColor(a, b));
      let y = group[0].target.y0;
      for (const l of group) {
        l.y1 = y + l.width / 2;
        y += l.width;
      }
    }

    old.remove();
    this.bundledLinks = linkG
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('class', 'parallel-sets__link')
      .attr('d', linkPath)
      .attr('stroke', (l) => l.stroke)
      .attr('stroke-width', (l) => Math.max(l.width, 1));
    // The hovered agents' share of each ribbon, drawn over the muted ribbons
    this.hoverLayer = linkG.append('g').style('pointer-events', 'none');
  }

  // The library binds hover to its own ribbons; with bundleLinks, ours replace them
  _bindHover(nodeG, links, layout) {
    if (!this.options.bundleLinks) super._bindHover(nodeG, links, layout);
  }

  _bindBundledHover(nodeG) {
    this._applyHover = () => this._applyBundledHover();
    const move = (event) => this.tooltip.move(event);
    nodeG
      .on('mouseenter', (event, node) => {
        const hovered = { type: 'node', node };
        this._setHovered(hovered);
        this.tooltip.show(this._nodeTooltip(hovered), event, node);
      })
      .on('mousemove', move);
    this.bundledLinks
      .on('mouseenter', (event, link) => {
        const hovered = { type: 'link', link, value: link.value };
        this._setHovered(hovered);
        this.tooltip.show(this._bundledLinkTooltip(hovered), event, link);
      })
      .on('mousemove', move);
  }

  /**
   * Mute every ribbon and node, then draw the hovered agents' share of each
   * ribbon on top (at the ribbon's top edge) and unmute the nodes they pass.
   */
  _applyBundledHover() {
    const links = this.bundledLinks;
    if (!links) return;
    const nodeG = this.svg.selectAll('.parallel-sets__node');
    const hovered = this.hovered;
    this.hoverLayer.selectAll('*').remove();
    links.classed('parallel-sets__link--muted', Boolean(hovered));
    if (!hovered) {
      nodeG.classed('parallel-sets__node--muted', false);
      return;
    }

    let match;
    if (hovered.type === 'node') {
      const { dim, key } = hovered.node;
      match = (p) => p.keys[dim] === key;
    } else {
      const own = new Set(hovered.link.paths);
      match = (p) => own.has(p);
    }

    const parts = [];
    const activeNodes = new Set();
    for (const l of links.data()) {
      const value = d3.sum(l.paths, (p) => (match(p) ? p.value : 0));
      if (!value) continue;
      const width = (l.width * value) / l.value;
      const offset = (width - l.width) / 2;
      parts.push({ ...l, width, y0: l.y0 + offset, y1: l.y1 + offset });
      activeNodes.add(l.source.id);
      activeNodes.add(l.target.id);
    }
    this.hoverLayer
      .selectAll('path')
      .data(parts)
      .join('path')
      .attr('class', 'parallel-sets__link parallel-sets__link--active')
      .attr('d', linkPath)
      .attr('stroke', (l) => l.stroke)
      .attr('stroke-width', (l) => Math.max(l.width, 1));
    nodeG.classed('parallel-sets__node--muted', (n) => !activeNodes.has(n.id));
  }

  /** Tooltip rows for a merged ribbon: its two columns, its color, its count. */
  _bundledLinkTooltip(hovered) {
    const { columns, colorIndex } = this.prepared;
    const { link } = hovered;
    const rows = [
      [columns[link.pair].title, link.source.label],
      [columns[link.pair + 1].title, link.target.label],
    ];
    if (colorIndex !== link.pair && colorIndex !== link.pair + 1) {
      rows.push([columns[colorIndex].title, link.paths[0].labels[colorIndex]]);
    }
    if (this.options.showCounts) rows.push(this._countRow(link.value));
    return this.options.tooltip ? this.options.tooltip(hovered, rows) : rows;
  }

  // ── Inside labels ──────────────────────────────────────────────────────────

  /**
   * Move the columns so the last one ends at the chart's right edge (the
   * library leaves room there for outside labels), along with the node rects,
   * their hover targets and the column headers.
   */
  _spreadColumns(nodeG) {
    const nodes = nodeG.data();
    const nodeWidth = this.options.nodeWidth;
    const lastX0 = d3.max(nodes, (d) => d.x0);
    const targetX0 = Math.max(this.width - nodeWidth, 0);
    if (lastX0 && lastX0 < targetX0) {
      const k = targetX0 / lastX0;
      for (const d of nodes) {
        d.x0 *= k;
        d.x1 = d.x0 + nodeWidth;
      }
    }
    nodeG.select('.parallel-sets__node-rect').attr('x', (d) => d.x0);
    nodeG.select('.parallel-sets__node-hit').attr('x', (d) => d.x0 - HIT_PAD);
    // Column headers line up with their nodes' left edges
    const columnX = new Map(nodes.map((d) => [d.dim, d.x0]));
    this.svg.selectAll('.parallel-sets__header').attr('x', (col) => columnX.get(col.index) ?? 0);
  }

  _placeLabelsInside(nodeG) {
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
