import * as d3 from 'd3';
import { ScatterPlot } from '@/lib/charts/prism-charts.js';

// Gap in pixels between a point's edge and its label
const LABEL_GAP = 3;
// Opacity of labels on points outside the current highlight
const MUTED_LABEL_OPACITY = 0.2;
// Gap in pixels between a selected point's edge and its selection ring
const SELECTION_GAP = 3;
// Gap in pixels between a hover-target point's edge and its ring
const HOVER_TARGET_GAP = 3;
// Width in pixels of the tooltip's left edge in the hovered point's colour
const TOOLTIP_ACCENT_WIDTH = 4;
// Default opacity of every other point and label while a selection is active
const UNSELECTED_OPACITY = 0.3;
// Pixels the pointer may move between press and release and still count as a
// click. Matches the library, which ignores drag-zooms under 4px.
const CLICK_TOLERANCE = 4;

/**
 * ScatterPlot with point labels, point clicks, a selection ring and hover
 * linking.
 * prism-charts.js is a vendored bundle, so these are added here rather than in
 * the library.
 *
 * Extra options:
 *   label         `(record, layerId) => string | null`. A non-empty value is
 *                 drawn to the right of the point; null or '' draws nothing.
 *   selected      `(record, layerId) => boolean` or null. Matching points get a
 *                 ring and a bold, larger label (class
 *                 `scatter-plot__label--selected`); while anything is
 *                 selected, every other point and label fades.
 *   unselectedOpacity  Opacity of the faded points and labels; default 0.3, 1
 *                 turns the fading off.
 *   onPointClick  `(record | null, layerId | null) => void`, called on a click
 *                 inside the plot area: with the nearest clickable point within
 *                 `hoverRadius` of where the press began, or with nulls for a
 *                 click on empty space. Up to CLICK_TOLERANCE px of movement
 *                 still counts as a click; more is a drag-zoom or pan.
 *   clickLayers   Layer ids whose points can be clicked, or null for every
 *                 layer. Other layers are left out of click hit-testing, so
 *                 they never block a clickable point beneath them.
 *
 * Extra method:
 *   setHoverTarget(predicate)  `(record, layerId) => boolean` or null. Rings
 *                 the matching points as if hovered, e.g. while the mouse is on
 *                 their row in a linked table.
 *
 * A point's label turns bold (class `scatter-plot__label--hovered`) while the
 * point is hovered in the plot (the point the tooltip shows) or matches the
 * hover target. The tooltip gets a left edge in the hovered point's colour.
 *
 * Labels and rings redraw whenever the points do (data/option updates, zoom,
 * pan and highlight changes), sit in the same clipped area, follow the same
 * transitions, and ignore the mouse so the brush and tooltip work as before.
 *
 * This hooks the library's `_drawPoints`, `_buildDelaunay` and `_setHovered`
 * and reads its `svg`, `root`, `plot`, `scales`, `layers`, `layerGroups`,
 * `nodes`, `hovered`, `tooltip.div`, `innerSize`, `brushing`, `panning`, `highlight`,
 * `_px/_py/_pr`, `_pcolor` and `_keys` internals; recheck them when prism-charts.js is
 * updated.
 */
export class ExtendedScatterPlot extends ScatterPlot {
  constructor(container, options = {}) {
    super(container, options);
    // A press and release within CLICK_TOLERANCE px is a click. The svg's own
    // `click` is not used: d3-brush swallows it after any movement at all, so
    // a slightly shaky click did nothing. Capture-phase native listeners run
    // before the brush overlay sees the pointer, and leave its handlers alone.
    const svg = this.svg.node();
    svg.addEventListener('pointerdown', (event) => this._onPointerDown(event), true);
    svg.addEventListener('pointerup', (event) => this._onPointerUp(event), true);
    svg.addEventListener('pointercancel', () => (this._press = null), true);
    // Namespaced so the library's own svg listeners are left alone
    this.svg
      .on('mousemove.point', (event) => this._updatePointerCursor(event))
      .on('mouseleave.point', () => this.root.classed('scatter-plot--point-hover', false));
  }

  // ── Overrides ────────────────────────────────────────────────────────────────
  _drawPoints(transition) {
    super._drawPoints(transition);
    this._fadeUnselectedPoints();
    this._drawLabels(transition);
    this._drawSelection(transition);
    this._drawHoverTarget(transition);
  }

  // Called by the library whenever the point under the mouse changes
  _setHovered(node) {
    super._setHovered(node);
    this._updateHoveredLabels();
    this._colorTooltip(node);
  }

  // The library's Delaunay spans every layer (for the tooltip); clicks get their
  // own over the clickable layers only, so a gene sitting on top of an agent
  // never blocks the agent's click.
  _buildDelaunay() {
    super._buildDelaunay();
    this.clickNodes = this.nodes.filter((node) => this._isClickable(node.layer));
    this.clickDelaunay = this.clickNodes.length
      ? d3.Delaunay.from(
          this.clickNodes,
          (node) => this._px(node.d),
          (node) => this._py(node.d),
        )
      : null;
  }

  // ── Hover ────────────────────────────────────────────────────────────────────
  setHoverTarget(predicate) {
    this.hoverTarget = predicate ?? null;
    if (!this.scales) return;
    this._drawHoverTarget(null);
    this._updateHoveredLabels();
  }

  /** Hovered in the plot (the library's `hovered` node) or by the hover target. */
  _isHovered(d, layer) {
    return this.hovered?.d === d || Boolean(this.hoverTarget?.(d, layer.id));
  }

  /** Bold the hovered points' labels and lift them above their neighbours. */
  _updateHoveredLabels() {
    if (!this.labelsG) return;
    const isHovered = (item) => this._isHovered(item.d, item.layer);
    this.labelsG
      .selectAll('text')
      .classed('scatter-plot__label--hovered', isHovered)
      .filter(isHovered)
      .raise();
  }

  /**
   * Edge the tooltip in the hovered point's own colour (its color-axis or
   * layer colour, not the highlight's grey), so it reads as that point's.
   */
  _colorTooltip(node) {
    const color = node ? this._pcolor(node.d, node.layer) : null;
    this.tooltip.div.style(
      'border-left',
      color ? `${TOOLTIP_ACCENT_WIDTH}px solid ${color}` : null,
    );
  }

  _drawHoverTarget(transition) {
    this.hoverTargetG ??= this._overlayGroup('scatter-plot__hover-target');

    const target = this.hoverTarget;
    const items = target ? this._collect((d, layer) => target(d, layer.id)) : [];

    const cx = (item) => this._px(item.d);
    const cy = (item) => this._py(item.d);
    const r = (item) => this._pr(item.d) + HOVER_TARGET_GAP;

    const rings = this.hoverTargetG
      .selectAll('circle')
      .data(items, (item) => item.id)
      .join((enter) =>
        enter
          .append('circle')
          .attr('class', 'scatter-plot__hover-target-ring')
          .attr('cx', cx)
          .attr('cy', cy),
      );
    (transition ? rings.transition(transition) : rings).attr('cx', cx).attr('cy', cy).attr('r', r);
  }

  // ── Selection state ──────────────────────────────────────────────────────────
  /** Whether a selection is active, i.e. the `selected` option is set. */
  get _hasSelection() {
    return typeof this.options.selected === 'function';
  }

  _isSelected(d, layer) {
    return this._hasSelection && Boolean(this.options.selected(d, layer.id));
  }

  /** Opacity for a mark: 1 when selected or with no selection, faded otherwise. */
  _selectionOpacity(d, layer) {
    if (!this._hasSelection || this._isSelected(d, layer)) return 1;
    return this.options.unselectedOpacity ?? UNSELECTED_OPACITY;
  }

  /**
   * Fade the library's point circles that are not selected. Uses the inline
   * `opacity` style, which multiplies with the marks' fill/stroke opacity and
   * the highlight's grey, and clears it when nothing is selected.
   */
  _fadeUnselectedPoints() {
    const plot = this;
    this.layerGroups.each(function (layer) {
      d3.select(this)
        .selectAll('circle')
        .style('opacity', (d) => {
          const opacity = plot._selectionOpacity(d, layer);
          return opacity === 1 ? null : opacity;
        });
    });
  }

  // ── Clicks ───────────────────────────────────────────────────────────────────
  _isClickable(layer) {
    const { clickLayers } = this.options;
    return !clickLayers || clickLayers.includes(layer.id);
  }

  /**
   * The nearest clickable node ({ d, layer }) to a pointer event, within
   * `hoverRadius`; null over empty space, undefined outside the plot area.
   */
  _nodeAt(event) {
    const [px, py] = d3.pointer(event, this.plot.node());
    const [width, height] = this.innerSize;
    if (px < 0 || px > width || py < 0 || py > height) return undefined;
    const node = this.clickDelaunay ? this.clickNodes[this.clickDelaunay.find(px, py)] : null;
    if (!node) return null;
    const distance = Math.hypot(this._px(node.d) - px, this._py(node.d) - py);
    return distance <= this.options.hoverRadius ? node : null;
  }

  // Pointer cursor whenever a click here would select a point (styled by the host)
  _updatePointerCursor(event) {
    const clickable = Boolean(
      this.options.onPointClick && !this.brushing && !this.panning && this._nodeAt(event),
    );
    this.root.classed('scatter-plot--point-hover', clickable);
  }

  _onPointerDown(event) {
    if (event.button !== 0 || !this.options.onPointClick) return;
    // Resolve the point where the press began, which is where the user aimed
    this._press = { x: event.clientX, y: event.clientY, node: this._nodeAt(event) };
  }

  _onPointerUp(event) {
    const press = this._press;
    this._press = null;
    const { onPointClick } = this.options;
    if (!press || !onPointClick) return;
    // Anything longer is a drag-zoom or a pan, not a click
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > CLICK_TOLERANCE) return;
    if (press.node === undefined) return;
    if (press.node === null) onPointClick(null, null);
    else onPointClick(press.node.d, press.node.layer.id);
  }

  // ── Overlays ─────────────────────────────────────────────────────────────────
  /** A clipped, mouse-transparent group above the points, created on first use. */
  _overlayGroup(className) {
    return this.plot
      .insert('g', '.scatter-plot__hover-ring')
      .attr('class', className)
      .attr('clip-path', `url(#${this.clipId})`)
      .style('pointer-events', 'none');
  }

  /** `{ d, layer, id }` for every record across layers that passes `test`. */
  _collect(test) {
    const items = [];
    for (const layer of this.layers) {
      const key = layer.key ?? this.options.key;
      layer.data.forEach((d, i) => {
        if (test(d, layer)) items.push({ d, layer, id: `${layer.id}:${key(d, i)}` });
      });
    }
    return items;
  }

  _drawLabels(transition) {
    this.labelsG ??= this._overlayGroup('scatter-plot__labels');

    const labelOf = this.options.label;
    const items = labelOf ? this._collect((d, layer) => labelOf(d, layer.id)) : [];

    const { highlight } = this;
    const x = (item) => this._px(item.d) + this._pr(item.d) + LABEL_GAP;
    const y = (item) => this._py(item.d);
    const highlightOpacity = (item) =>
      !highlight.active || highlight.includes(item.d, this._keys(item.d, item.layer))
        ? 1
        : MUTED_LABEL_OPACITY;
    const opacity = (item) => highlightOpacity(item) * this._selectionOpacity(item.d, item.layer);
    const isSelected = (item) => this._isSelected(item.d, item.layer);

    const labels = this.labelsG
      .selectAll('text')
      .data(items, (item) => item.id)
      .join((enter) =>
        enter
          .append('text')
          .attr('class', 'scatter-plot__label')
          .attr('dominant-baseline', 'central')
          .attr('x', x)
          .attr('y', y),
      )
      .text((item) => labelOf(item.d, item.layer.id))
      .classed('scatter-plot__label--selected', isSelected)
      .attr('opacity', opacity);
    (transition ? labels.transition(transition) : labels).attr('x', x).attr('y', y);

    // Raise unfaded labels so faded ones never cover them, and the selected
    // label above everything
    if (highlight.active || this._hasSelection) {
      labels.filter((item) => opacity(item) === 1).raise();
      labels.filter(isSelected).raise();
    }
    this._updateHoveredLabels();
  }

  _drawSelection(transition) {
    this.selectionG ??= this._overlayGroup('scatter-plot__selection');

    const { selected } = this.options;
    const items = selected ? this._collect((d, layer) => selected(d, layer.id)) : [];

    const cx = (item) => this._px(item.d);
    const cy = (item) => this._py(item.d);
    const r = (item) => this._pr(item.d) + SELECTION_GAP;

    const rings = this.selectionG
      .selectAll('circle')
      .data(items, (item) => item.id)
      .join((enter) =>
        enter
          .append('circle')
          .attr('class', 'scatter-plot__selection-ring')
          .attr('cx', cx)
          .attr('cy', cy),
      );
    (transition ? rings.transition(transition) : rings).attr('cx', cx).attr('cy', cy).attr('r', r);
  }
}

export default ExtendedScatterPlot;
