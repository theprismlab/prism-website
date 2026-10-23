import * as d3 from 'd3';
import './UmapPlot.css';

// ─── Defaults ─────────────────────────────────────────────────────────────────

/** 18 categorical colours: Tableau 10 followed by ColorBrewer Set2. */
export const CATEGORICAL_RANGE = [...d3.schemeTableau10, ...d3.schemeSet2];

/**
 * Every axis (x, y, color, radius) shares the same shape. Any property can be
 * overridden per axis via the constructor options.
 *
 *   field       string key or accessor `(d) => value`. Null disables the axis
 *               (color falls back to `range[0]`, radius to `range[0]` px).
 *   title       label shown on the axis / legend / tooltip
 *   type        x, y, radius: 'linear' | 'log' | 'sqrt' | 'constant'
 *               color:        'categorical' | 'sequential'
 *   domain      [min, max] or category list; null derives it from the data
 *   range       x, y: pixel range (null = fit the plot area)
 *               color: colour list (categorical) or interpolator / colour list (sequential)
 *               radius: [minPx, maxPx]; a 'constant' radius uses range[0]
 *   ticks       tick count hint for the axis / legend
 *   tickValues  explicit tick values (overrides `ticks`)
 *   format      value formatter for ticks and the tooltip
 */
const AXIS_DEFAULTS = {
  x: { field: 'x', title: 'x', type: 'linear', domain: null, range: null, ticks: 6, tickValues: null, format: null },
  y: { field: 'y', title: 'y', type: 'linear', domain: null, range: null, ticks: 6, tickValues: null, format: null },
  color: { field: null, title: 'Color', type: 'categorical', domain: null, range: CATEGORICAL_RANGE, ticks: 5, tickValues: null, format: null },
  radius: { field: null, title: 'Radius', type: 'constant', domain: null, range: [4, 4], ticks: 3, tickValues: null, format: null },
};

const DEFAULTS = {
  height: 480,
  margin: { top: 16, right: 16, bottom: 48, left: 56 },
  /** Data join key, so points keep their identity across `setData` calls. */
  key: (d, i) => i,
  /** Furthest a point may be from the cursor (px) and still get a tooltip. */
  hoverRadius: 24,
  /** Fraction of the data extent added on each side of an auto-derived domain. */
  domainPadding: 0.05,
  /** Zoom transition duration in ms. */
  duration: 500,
  /**
   * Custom tooltip content: `(d, defaultRows) => rows | htmlString`, where rows
   * is an array of `[label, value]` pairs. Defaults to the x, y and color axes.
   */
  tooltip: null,
  /** Called with `true` after a drag-zoom and `false` after a reset. */
  onZoomChange: null,
};

const DEFAULT_FORMAT = (v) => (typeof v === 'number' ? d3.format('.2f')(v) : String(v));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toAccessor(field) {
  if (field == null) return null;
  return typeof field === 'function' ? field : (d) => d[field];
}

function resolveAxis(name, overrides = {}) {
  const axis = { ...AXIS_DEFAULTS[name], ...overrides };
  axis.accessor = toAccessor(axis.field);
  axis.format = axis.format ?? DEFAULT_FORMAT;
  return axis;
}

function paddedExtent(values, padding) {
  let [lo, hi] = d3.extent(values);
  if (lo === undefined) return [0, 1];
  if (lo === hi) return [lo - 1, hi + 1];
  const pad = (hi - lo) * padding;
  return [lo - pad, hi + pad];
}

function continuousScale(type) {
  switch (type) {
    case 'log':
      return d3.scaleLog();
    case 'sqrt':
      return d3.scaleSqrt();
    default:
      return d3.scaleLinear();
  }
}

function applyTicks(axisGenerator, axis) {
  if (axis.tickValues) axisGenerator.tickValues(axis.tickValues);
  else if (axis.ticks != null) axisGenerator.ticks(axis.ticks);
  axisGenerator.tickFormat(axis.format);
  return axisGenerator;
}

function positionalScale(axis, domain, pixelRange) {
  const scale = continuousScale(axis.type).domain(domain).range(axis.range ?? pixelRange);
  if (!axis.domain) scale.nice(axis.ticks ?? undefined);
  return scale;
}

function colorScale(axis, data) {
  if (!axis.accessor) return () => (Array.isArray(axis.range) ? axis.range[0] : '#4e79a7');
  const values = data.map(axis.accessor);
  if (axis.type === 'sequential') {
    const domain = axis.domain ?? d3.extent(values);
    const interpolator =
      typeof axis.range === 'function' ? axis.range : d3.interpolateRgbBasis(axis.range);
    return d3.scaleSequential(domain, interpolator);
  }
  const domain = axis.domain ?? [...new Set(values)];
  return d3.scaleOrdinal(domain, axis.range);
}

function radiusScale(axis, data) {
  if (!axis.accessor || axis.type === 'constant') return () => axis.range[0];
  const domain = axis.domain ?? d3.extent(data, axis.accessor);
  return continuousScale(axis.type).domain(domain).range(axis.range);
}

// ─── Class ────────────────────────────────────────────────────────────────────

/**
 * SVG scatter plot for 2-D embeddings (UMAP, t-SNE, PCA…) with configurable
 * x / y / color / radius axes, click-and-drag zoom and hover tooltips.
 *
 * Usage:
 *   const plot = new UmapPlot(el, {
 *     x: { field: (d) => d.umap.x, title: 'UMAP 1' },
 *     y: { field: (d) => d.umap.y, title: 'UMAP 2' },
 *     color: { field: (d) => d.umap.umapCls, title: 'Class', type: 'categorical' },
 *   });
 *   plot.setData(points);
 *   plot.destroy();
 *
 * Interaction: drag on the plot to zoom into that rectangle, double-click (or
 * call `resetZoom()`) to zoom back out, hover a point for its tooltip.
 */
export default class UmapPlot {
  constructor(container, options = {}) {
    if (!container) throw new Error('UmapPlot: a container element is required');
    this.container = container;
    this.options = { ...DEFAULTS, ...options, margin: { ...DEFAULTS.margin, ...options.margin } };
    this.axes = {
      x: resolveAxis('x', options.x),
      y: resolveAxis('y', options.y),
      color: resolveAxis('color', options.color),
      radius: resolveAxis('radius', options.radius),
    };

    this.data = [];
    this.baseDomain = { x: [0, 1], y: [0, 1] };
    this.zoomDomain = null; // { x, y } while zoomed in, otherwise null
    this.scales = null;
    this.delaunay = null;
    this.brushing = false;
    this.width = 0;

    this._build();
    this._observeResize();
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  /** Replace the plotted points. The current zoom is preserved. */
  setData(data = []) {
    this.data = Array.isArray(data) ? data : [];
    const { x, y } = this.axes;
    const padding = this.options.domainPadding;
    this.baseDomain = {
      x: x.domain ?? paddedExtent(this.data.map(x.accessor), padding),
      y: y.domain ?? paddedExtent(this.data.map(y.accessor), padding),
    };
    this._hideTooltip();
    this._render(false);
  }

  /** Zoom into a data-space rectangle. */
  zoomTo(xDomain, yDomain) {
    this.zoomDomain = { x: xDomain, y: yDomain };
    this._hideTooltip();
    this._render(true);
    this.options.onZoomChange?.(true);
  }

  resetZoom() {
    if (!this.zoomDomain) return;
    this.zoomDomain = null;
    this._hideTooltip();
    this._render(true);
    this.options.onZoomChange?.(false);
  }

  get zoomed() {
    return this.zoomDomain !== null;
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.root.selectAll('*').remove();
    this.root.classed('umap-plot', false);
  }

  // ── DOM scaffold ────────────────────────────────────────────────────────────

  _build() {
    this.root = d3.select(this.container).classed('umap-plot', true);
    this.svg = this.root.append('svg').attr('class', 'umap-plot__svg');

    this.clipId = `umap-plot-clip-${Math.random().toString(36).slice(2, 9)}`;
    this.clipRect = this.svg.append('defs').append('clipPath').attr('id', this.clipId).append('rect');

    this.plot = this.svg.append('g').attr('class', 'umap-plot__plot');
    this.gridX = this.plot.append('g').attr('class', 'umap-plot__grid');
    this.gridY = this.plot.append('g').attr('class', 'umap-plot__grid');
    this.axisX = this.plot.append('g').attr('class', 'umap-plot__axis umap-plot__axis--x');
    this.axisY = this.plot.append('g').attr('class', 'umap-plot__axis umap-plot__axis--y');
    this.titleX = this.plot.append('text').attr('class', 'umap-plot__axis-title').attr('text-anchor', 'middle');
    this.titleY = this.plot
      .append('text')
      .attr('class', 'umap-plot__axis-title')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)');

    // Points sit above the brush but ignore pointer events (see CSS), so the
    // brush overlay receives every drag and hover is resolved via Delaunay.
    this.brushG = this.plot.append('g').attr('class', 'umap-plot__brush');
    this.pointsG = this.plot.append('g').attr('class', 'umap-plot__points').attr('clip-path', `url(#${this.clipId})`);
    this.highlight = this.plot.append('circle').attr('class', 'umap-plot__highlight').style('display', 'none');

    this.brush = d3
      .brush()
      .on('start', () => {
        this.brushing = true;
        this._hideTooltip();
      })
      .on('end', (event) => this._onBrushEnd(event));

    this.svg
      .on('mousemove', (event) => this._onMouseMove(event))
      .on('mouseleave', () => this._hideTooltip())
      .on('dblclick', () => this.resetZoom());

    this.footer = this.root.append('div').attr('class', 'umap-plot__footer');
    this.legend = this.footer.append('div').attr('class', 'umap-plot__legend');
    this.sizeLegend = this.footer.append('div').attr('class', 'umap-plot__legend');
    this.footer.append('div').attr('class', 'umap-plot__hint').text('Drag to zoom · double-click to reset');

    this.tooltip = this.root.append('div').attr('class', 'umap-plot__tooltip').style('display', 'none');
  }

  _observeResize() {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver(() => {
      if (this.container.clientWidth !== this.width) this._render(false);
    });
    this.resizeObserver.observe(this.container);
  }

  // ── Rendering ───────────────────────────────────────────────────────────────

  _render(animate) {
    const { margin, height, duration } = this.options;
    const width = this.container.clientWidth || 640;
    const innerW = Math.max(width - margin.left - margin.right, 10);
    const innerH = Math.max(height - margin.top - margin.bottom, 10);
    this.width = width;

    this.svg.attr('width', width).attr('height', height);
    this.plot.attr('transform', `translate(${margin.left},${margin.top})`);
    this.clipRect.attr('width', innerW).attr('height', innerH);

    this._updateScales(innerW, innerH);

    this.brush.extent([
      [0, 0],
      [innerW, innerH],
    ]);
    this.brushG.call(this.brush);

    const t = animate ? this.svg.transition().duration(duration) : null;
    this._drawAxes(innerW, innerH, t);
    this._drawPoints(t);
    this._drawLegends();

    const { x, y } = this.axes;
    this.delaunay = this.data.length
      ? d3.Delaunay.from(
          this.data,
          (d) => this.scales.x(x.accessor(d)),
          (d) => this.scales.y(y.accessor(d)),
        )
      : null;
  }

  _updateScales(innerW, innerH) {
    const { x, y, color, radius } = this.axes;
    const domain = this.zoomDomain ?? this.baseDomain;
    this.scales = {
      x: positionalScale(x, domain.x, [0, innerW]),
      y: positionalScale(y, domain.y, [innerH, 0]),
      color: colorScale(color, this.data),
      radius: radiusScale(radius, this.data),
    };
  }

  _drawAxes(innerW, innerH, t) {
    const { x, y } = this.axes;
    const { margin } = this.options;
    const withT = (sel) => (t ? sel.transition(t) : sel);

    withT(this.gridX).call(
      applyTicks(d3.axisBottom(this.scales.x), x).tickSize(innerH).tickFormat(''),
    );
    withT(this.gridY).call(
      applyTicks(d3.axisLeft(this.scales.y), y).tickSize(-innerW).tickFormat(''),
    );
    withT(this.axisX.attr('transform', `translate(0,${innerH})`)).call(
      applyTicks(d3.axisBottom(this.scales.x), x).tickSizeOuter(0),
    );
    withT(this.axisY).call(applyTicks(d3.axisLeft(this.scales.y), y).tickSizeOuter(0));

    this.titleX.attr('x', innerW / 2).attr('y', innerH + margin.bottom - 8).text(x.title);
    this.titleY.attr('x', -innerH / 2).attr('y', -margin.left + 14).text(y.title);
  }

  _drawPoints(t) {
    const { x, y, color, radius } = this.axes;
    const s = this.scales;
    const cx = (d) => s.x(x.accessor(d));
    const cy = (d) => s.y(y.accessor(d));
    const r = (d) => (radius.accessor ? s.radius(radius.accessor(d)) : s.radius());
    const fill = (d) => (color.accessor ? s.color(color.accessor(d)) : s.color());

    const circles = this.pointsG.selectAll('circle').data(this.data, this.options.key);
    circles.exit().remove();
    circles
      .enter()
      .append('circle')
      .attr('class', 'umap-plot__point')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fill', fill);
    (t ? circles.transition(t) : circles).attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', fill);
  }

  _drawLegends() {
    this._drawColorLegend();
    this._drawSizeLegend();
  }

  _drawColorLegend() {
    const axis = this.axes.color;
    const scale = this.scales.color;
    this.legend.selectAll('*').remove();
    if (!axis.accessor) return this.legend.style('display', 'none');
    this.legend.style('display', null);
    this.legend.append('span').attr('class', 'umap-plot__legend-title').text(axis.title);

    if (axis.type === 'sequential') {
      const [lo, hi] = scale.domain();
      const width = 160;
      const svg = this.legend.append('svg').attr('class', 'umap-plot__ramp').attr('width', width).attr('height', 30);
      const gradientId = `${this.clipId}-ramp`;
      svg
        .append('linearGradient')
        .attr('id', gradientId)
        .selectAll('stop')
        .data(d3.ticks(0, 1, 10))
        .join('stop')
        .attr('offset', (p) => p)
        .attr('stop-color', (p) => scale(lo + p * (hi - lo)));
      svg.append('rect').attr('width', width).attr('height', 8).attr('fill', `url(#${gradientId})`);
      const rampScale = d3.scaleLinear([lo, hi], [0, width]);
      svg
        .append('g')
        .attr('class', 'umap-plot__axis')
        .attr('transform', 'translate(0,8)')
        .call(applyTicks(d3.axisBottom(rampScale), axis).tickSize(3).tickSizeOuter(0));
      return this.legend;
    }

    const items = this.legend
      .selectAll('.umap-plot__legend-item')
      .data(scale.domain())
      .join('span')
      .attr('class', 'umap-plot__legend-item');
    items.append('i').attr('class', 'umap-plot__swatch').style('background', (v) => scale(v));
    items.append('span').text((v) => axis.format(v));
    return this.legend;
  }

  _drawSizeLegend() {
    const axis = this.axes.radius;
    const scale = this.scales.radius;
    this.sizeLegend.selectAll('*').remove();
    if (!axis.accessor || axis.type === 'constant') return this.sizeLegend.style('display', 'none');
    this.sizeLegend.style('display', null);
    this.sizeLegend.append('span').attr('class', 'umap-plot__legend-title').text(axis.title);

    const values = axis.tickValues ?? scale.ticks(axis.ticks ?? 3);
    const items = this.sizeLegend
      .selectAll('.umap-plot__legend-item')
      .data(values)
      .join('span')
      .attr('class', 'umap-plot__legend-item');
    const maxR = Math.max(...values.map(scale));
    items
      .append('svg')
      .attr('width', maxR * 2 + 2)
      .attr('height', maxR * 2 + 2)
      .append('circle')
      .attr('class', 'umap-plot__swatch-circle')
      .attr('cx', maxR + 1)
      .attr('cy', maxR + 1)
      .attr('r', (v) => scale(v));
    items.append('span').text((v) => axis.format(v));
    return this.sizeLegend;
  }

  // ── Zoom (brush) ────────────────────────────────────────────────────────────

  _onBrushEnd(event) {
    this.brushing = false;
    if (!event.selection) return; // cleared programmatically or a plain click
    const [[x0, y0], [x1, y1]] = event.selection;
    // Ignore accidental tiny drags
    if (Math.abs(x1 - x0) < 4 || Math.abs(y1 - y0) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x, y } = this.scales;
    this.brushG.call(this.brush.move, null);
    this.zoomTo([x.invert(x0), x.invert(x1)], [y.invert(y1), y.invert(y0)]);
  }

  // ── Hover / tooltip ─────────────────────────────────────────────────────────

  _onMouseMove(event) {
    if (this.brushing || !this.delaunay) return this._hideTooltip();
    const [mx, my] = d3.pointer(event, this.plot.node());
    const [xr0, xr1] = this.scales.x.range();
    const [yr1, yr0] = this.scales.y.range();
    if (mx < xr0 || mx > xr1 || my < yr0 || my > yr1) return this._hideTooltip();

    const i = this.delaunay.find(mx, my);
    const d = this.data[i];
    if (d === undefined) return this._hideTooltip();

    const px = this.scales.x(this.axes.x.accessor(d));
    const py = this.scales.y(this.axes.y.accessor(d));
    if (Math.hypot(px - mx, py - my) > this.options.hoverRadius) return this._hideTooltip();

    const r = this.axes.radius.accessor
      ? this.scales.radius(this.axes.radius.accessor(d))
      : this.scales.radius();
    this.highlight.style('display', null).attr('cx', px).attr('cy', py).attr('r', r + 3);
    this._showTooltip(d, event);
    return undefined;
  }

  _tooltipRows(d) {
    const rows = [];
    for (const name of ['x', 'y', 'color']) {
      const axis = this.axes[name];
      if (axis.accessor) rows.push([axis.title, axis.format(axis.accessor(d))]);
    }
    return this.options.tooltip ? this.options.tooltip(d, rows) : rows;
  }

  _showTooltip(d, event) {
    const content = this._tooltipRows(d);
    this.tooltip.selectAll('*').remove();
    if (typeof content === 'string') {
      this.tooltip.html(content);
    } else {
      const rows = this.tooltip.append('table').selectAll('tr').data(content).join('tr');
      rows.append('th').text(([label]) => label);
      rows.append('td').text(([, value]) => value);
    }

    // Place beside the cursor, flipping to stay inside the container
    const [cx, cy] = d3.pointer(event, this.container);
    const node = this.tooltip.style('display', null).node();
    const offset = 14;
    const left = cx + offset + node.offsetWidth > this.container.clientWidth ? cx - offset - node.offsetWidth : cx + offset;
    const top = cy + offset + node.offsetHeight > this.container.clientHeight ? cy - offset - node.offsetHeight : cy + offset;
    this.tooltip.style('left', `${Math.max(0, left)}px`).style('top', `${Math.max(0, top)}px`);
  }

  _hideTooltip() {
    this.tooltip.style('display', 'none');
    this.highlight.style('display', 'none');
  }
}
