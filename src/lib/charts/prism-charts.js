import * as h from "d3";
const ot = [
  "#6929c4",
  // Purple 70
  "#d2a106",
  // Yellow 40
  "#005d5d",
  // Teal 70
  "#ff7eb6",
  // Magenta 40
  "#8a3800",
  // Orange 70
  "#33b1ff",
  // Cyan 40
  "#da1e28",
  // Red 60
  "#42be65",
  // Green 40
  "#002d9c",
  // Blue 80
  "#ffb784",
  // Orange 30
  "#9f1853",
  // Magenta 70
  "#3ddbd9",
  // Teal 30
  "#570408",
  // Red 90
  "#be95ff"
  // Purple 40
];
function W(o) {
  return o <= h.schemeTableau10.length ? h.schemeTableau10 : ot;
}
function _t(o, t) {
  const e = h.rollup(
    o,
    (a) => a.length,
    (a) => a[t] || "(blank)"
  ), s = Array.from(e).sort((a, n) => n[1] - a[1]).map(([a]) => a);
  return { domain: s, range: W(s.length) };
}
function X(o, t, e) {
  const { title: s, ticks: a, format: n = (p) => p, shape: i = "square", fontSize: l } = e;
  if (o.selectAll("*").remove(), !s) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", l ? `${l}px` : null), o.append("div").attr("class", "chart-legend__title").text(s);
  const d = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(a || t.domain()).join("span").attr("class", "chart-legend__item");
  d.append("i").attr("class", `chart-legend__swatch chart-legend__swatch--${i}`).style("background", (p) => t(p)), d.append("span").text((p) => n(p));
}
const Q = { small: 10, medium: 12, large: 14 };
function Y(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in Q)) throw new Error(`Unknown chart font size "${o}"`);
  return Q[o];
}
let F;
const nt = 0.55;
function rt(o, t, e, s = 400) {
  if (F === void 0 && (F = document.createElement("canvas").getContext("2d")), !F) return String(o).length * t * nt;
  const a = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return F.font = `${s} ${t}px ${a}`, F.measureText(String(o)).width;
}
function P(o, t, e, s) {
  let a = 0;
  for (const n of o)
    a = Math.max(a, rt(n, t, e, s));
  return a;
}
const tt = 12, U = 6, lt = {
  data: [],
  orientation: "vertical",
  total: null,
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28
};
class bt {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...lt, ...e }, this.root = h.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the bars and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, total: e, rowHeight: s } = this.options, a = this.options.orientation === "horizontal", n = this.svg.node(), i = Y(this.options.fontSize), l = this.options.axis.x || {}, d = this.options.axis.y || {}, p = this.options.axis.color || {}, [u, g] = a ? [d, l] : [l, d], k = new Map(this.options.data.map((c) => [c.label, c.count])), w = [.../* @__PURE__ */ new Set([...u.domain || [], ...k.keys()])], f = w.map((c) => ({
      label: c,
      count: k.get(c) || 0
    })), S = e ?? h.sum(f, (c) => c.count), R = (c) => `${c.count} (${Math.round(c.count / S * 100)}%)`, z = h.scaleLinear();
    g.domain ? z.domain(g.domain) : z.domain([0, h.max(f, (c) => c.count) || 1]).nice();
    const x = Array.isArray(g.ticks) ? g.ticks : z.ticks(g.ticks ?? 5), V = u.ticks || w, L = i + 16, B = P(w, i, n);
    let m, y, E;
    if (a)
      m = {
        top: i,
        right: P(f.map(R), i, n, 600) + U + 8,
        bottom: 2 * i + 32,
        left: L + B + tt
      }, y = m.top + w.length * s + m.bottom;
    else {
      m = {
        top: i + 16,
        right: 16,
        bottom: 2 * i + 40,
        left: L + P(x, i, n) + tt
      }, E = (t - m.left - m.right) / w.length < B;
      const J = E ? Math.round(B * Math.sin(Math.PI / 4)) : 0;
      m.bottom += J, y = this.options.height + J;
    }
    const D = t - m.left - m.right, T = y - m.top - m.bottom, C = h.scaleBand().domain(w).range(u.range || [0, a ? T : D]).padding(a ? 0.3 : 0.35);
    z.range(g.range || (a ? [0, D] : [T, 0]));
    const M = p.domain || w, q = h.scaleOrdinal(M, p.range || W(M.length)), [_, b] = a ? [z, C] : [C, z];
    this.root.style("max-width", `${t}px`);
    const O = this.svg.attr("viewBox", `0 0 ${t} ${y}`).attr(
      "aria-label",
      `Bar chart of ${g.title || "count"} by ${u.title || "category"}. ` + f.map((c) => `${c.label}: ${c.count}`).join(", ")
    );
    O.selectAll("*").remove();
    const r = O.append("g").attr("transform", `translate(${m.left},${m.top})`), v = r.append("g").call(
      h.axisLeft(b).tickValues(a ? V : x).tickSizeOuter(0)
    ), $ = r.append("g").attr("transform", `translate(0,${T})`).call(
      h.axisBottom(_).tickValues(a ? x : V).tickSizeOuter(0)
    );
    for (const c of [v, $])
      c.attr("font-family", null).attr("font-size", i), c.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), c.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    E && $.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const Z = r.insert("g", ":first-child").selectAll("line").data(x).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    a ? Z.attr("y2", T).attr("x1", (c) => _(c)).attr("x2", (c) => _(c)) : Z.attr("x2", D).attr("y1", (c) => b(c)).attr("y2", (c) => b(c));
    const A = r.append("g").selectAll("g").data(f).join("g"), j = A.append("rect").attr("rx", 3).attr("fill", (c) => q(c.label)), K = A.append("text").attr("font-size", i).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.87)").text(R);
    a ? (j.attr("x", _(0)).attr("y", (c) => b(c.label)).attr("width", (c) => Math.max(0, _(c.count) - _(0))).attr("height", b.bandwidth()), K.attr("x", (c) => _(c.count) + U).attr("y", (c) => b(c.label) + b.bandwidth() / 2).attr("dy", "0.35em")) : (j.attr("x", (c) => _(c.label)).attr("y", (c) => b(c.count)).attr("width", _.bandwidth()).attr("height", (c) => Math.max(0, T - b(c.count))), K.attr("x", (c) => _(c.label) + _.bandwidth() / 2).attr("y", (c) => b(c.count) - U).attr("text-anchor", "middle")), j.append("title").text((c) => `${c.label}: ${c.count} of ${S}`);
    const N = (c) => O.append("text").attr("text-anchor", "middle").attr("font-size", i).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(c || "");
    N(l.title).attr("x", m.left + D / 2).attr("y", y - i), N(d.title).attr(
      "transform",
      `translate(${i + 2},${m.top + T / 2}) rotate(-90)`
    ), X(this.legend, q, { ...p, fontSize: i });
  }
}
const ct = 12, et = 6, ht = {
  data: [],
  total: null,
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28
};
class kt {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...ht, ...e }, this.root = h.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the bars and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("stacked-bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, total: e, rowHeight: s, data: a } = this.options, n = this.svg.node(), i = Y(this.options.fontSize), l = this.options.axis.x || {}, d = this.options.axis.y || {}, p = this.options.axis.color || {}, u = new Map(a.map((r) => [r.label, r.segments])), g = [.../* @__PURE__ */ new Set([...d.domain || [], ...u.keys()])], k = p.domain || [...new Set(a.flatMap((r) => r.segments.map((v) => v.key)))], w = new Map(k.map((r, v) => [r, v])), f = (r) => w.get(r) ?? k.length, S = g.map((r) => {
      const v = [...u.get(r) || []].filter((A) => A.count > 0).sort((A, j) => f(A.key) - f(j.key));
      let $ = 0;
      const Z = v.map((A) => ({
        key: A.key,
        count: A.count,
        start: $,
        end: $ += A.count
      }));
      return { label: r, count: $, segments: Z };
    }), R = e ?? h.sum(S, (r) => r.count), z = (r) => `${r.count} (${Math.round(r.count / R * 100)}%)`, x = {
      top: i,
      right: P(S.map(z), i, n, 600) + et + 8,
      bottom: 2 * i + 32,
      left: i + 16 + P(g, i, n) + ct
    }, V = t - x.left - x.right, L = g.length * s, B = x.top + L + x.bottom, m = h.scaleBand().domain(g).range(d.range || [0, L]).padding(0.3), y = h.scaleLinear().range(l.range || [0, V]);
    l.domain ? y.domain(l.domain) : y.domain([0, h.max(S, (r) => r.count) || 1]).nice();
    const E = h.scaleOrdinal(k, p.range || W(k.length)), D = Array.isArray(l.ticks) ? l.ticks : y.ticks(l.ticks ?? 5);
    this.root.style("max-width", `${t}px`);
    const T = S.map((r) => {
      const v = r.segments.map(($) => `${$.key} ${$.count}`).join(", ");
      return `${r.label}: ${r.count} (${v})`;
    }).join("; "), C = this.svg.attr("viewBox", `0 0 ${t} ${B}`).attr(
      "aria-label",
      `Stacked bar chart of ${l.title || "count"} by ${d.title || "category"}, split by ${p.title || "group"}. ${T}`
    );
    C.selectAll("*").remove();
    const M = C.append("g").attr("transform", `translate(${x.left},${x.top})`), q = M.append("g").call(
      h.axisLeft(m).tickValues(d.ticks || g).tickSizeOuter(0)
    ), _ = M.append("g").attr("transform", `translate(0,${L})`).call(h.axisBottom(y).tickValues(D).tickSizeOuter(0));
    for (const r of [q, _])
      r.attr("font-family", null).attr("font-size", i), r.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), r.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    M.insert("g", ":first-child").selectAll("line").data(D).join("line").attr("y2", L).attr("x1", (r) => y(r)).attr("x2", (r) => y(r)).attr("stroke", "rgba(0,0,0,0.08)");
    const b = M.append("g").selectAll("g").data(S).join("g");
    b.selectAll("rect").data((r) => r.segments.map((v) => ({ ...v, label: r.label, barCount: r.count }))).join("rect").attr("x", (r) => y(r.start)).attr("y", (r) => m(r.label)).attr("width", (r) => Math.max(0, y(r.end) - y(r.start))).attr("height", m.bandwidth()).attr("fill", (r) => E(r.key)).attr("stroke", "#fff").attr("stroke-width", 1).append("title").text((r) => `${r.label}, ${r.key}: ${r.count} of ${r.barCount} (${R} total)`), b.append("text").attr("x", (r) => y(r.count) + et).attr("y", (r) => m(r.label) + m.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", i).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.87)").text(z);
    const O = (r) => C.append("text").attr("text-anchor", "middle").attr("font-size", i).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(r || "");
    O(l.title).attr("x", x.left + V / 2).attr("y", B - i), O(d.title).attr(
      "transform",
      `translate(${i + 2},${x.top + L / 2}) rotate(-90)`
    ), X(this.legend, E, { ...p, fontSize: i });
  }
}
const dt = {
  x: {
    field: "x",
    title: "x",
    type: "linear",
    domain: null,
    range: null,
    ticks: 6,
    tickValues: null,
    format: null
  },
  y: {
    field: "y",
    title: "y",
    type: "linear",
    domain: null,
    range: null,
    ticks: 6,
    tickValues: null,
    format: null
  },
  color: {
    field: null,
    title: "Color",
    type: "categorical",
    domain: null,
    range: null,
    ticks: 5,
    tickValues: null,
    format: null
  },
  radius: {
    field: null,
    title: "Radius",
    type: "constant",
    domain: null,
    range: [4, 4],
    ticks: 3,
    tickValues: null,
    format: null
  }
}, pt = {
  id: "points",
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
}, st = {
  height: 480,
  /**
   * Size of every text in the plot (ticks, titles, legends, tooltip): 'small',
   * 'medium' or 'large' (see chartText.js), or a number of pixels.
   */
  fontSize: "medium",
  /**
   * Any side left out is sized from the font: the bottom holds the x ticks and
   * title, and the left holds the y title and the widest y tick label.
   */
  margin: { top: 16, right: 16 },
  /** Data join key, so points keep their identity across `setData` calls. */
  key: (o, t) => t,
  /** Layers to draw; a single filled layer by default. See LAYER_DEFAULTS. */
  layers: [{}],
  /** Furthest a point may be from the cursor (px) and still get a tooltip. */
  hoverRadius: 24,
  /** Fraction of the data extent added on each side of an auto-derived domain. */
  domainPadding: 0.05,
  /** Zoom transition duration in ms. */
  duration: 500,
  /**
   * Default tooltip content: `(d, defaultRows, layer) => rows | htmlString`,
   * where rows is an array of `[label, value]` pairs for the x, y and color axes.
   */
  tooltip: null,
  /** Called with `true` after a drag-zoom and `false` after a reset. */
  onZoomChange: null
}, ut = (o) => typeof o == "number" ? h.format(".2f")(o) : String(o), gt = 0.92;
function mt(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function H(o, t = {}) {
  const e = { ...dt[o], ...t };
  return e.accessor = mt(e.field), e.format = e.format ?? ut, e;
}
function ft(o) {
  const t = o.map((s) => ({ ...pt, ...s }));
  if (new Set(t.map((s) => s.id)).size !== t.length) throw new Error("ScatterPlot: layer ids must be unique");
  return t;
}
function at(o, t) {
  let [e, s] = h.extent(o);
  if (e === void 0) return [0, 1];
  if (e === s) return [e - 1, s + 1];
  const a = (s - e) * t;
  return [e - a, s + a];
}
function it(o) {
  switch (o) {
    case "log":
      return h.scaleLog();
    case "sqrt":
      return h.scaleSqrt();
    default:
      return h.scaleLinear();
  }
}
function G(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), o.tickFormat(t.format), o;
}
function I(o, t, e, s) {
  const a = it(o.type).domain(t).range(o.range ?? e);
  return s && a.nice(o.ticks ?? void 0), a;
}
function yt(o, t) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : W(1)[0];
  const e = t.map(o.accessor);
  if (o.type === "sequential") {
    const a = o.domain ?? h.extent(e), n = o.range == null ? h.interpolateViridis : typeof o.range == "function" ? o.range : h.interpolateRgbBasis(o.range);
    return h.scaleSequential(a, n);
  }
  const s = o.domain ?? [...new Set(e)];
  return h.scaleOrdinal(s, o.range ?? W(s.length));
}
function xt(o, t) {
  if (!o.accessor || o.type === "constant") return () => o.range[0];
  const e = o.domain ?? h.extent(t, o.accessor);
  return it(o.type).domain(e).range(o.range);
}
class wt {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = {
      ...st,
      ...e,
      margin: { ...st.margin, ...e.margin }
    }, this.fontSize = Y(this.options.fontSize), this.margin = null, this.axes = {
      x: H("x", e.x),
      y: H("y", e.y),
      color: H("color", e.color),
      radius: H("radius", e.radius)
    }, this.layers = ft(this.options.layers), this.dataByLayer = new Map(this.layers.map((s) => [s.id, []])), this.highlightPredicate = null, this.baseDomain = { x: [0, 1], y: [0, 1] }, this.zoomDomain = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this._build(), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the points of one layer (the first layer by default). The current
   * zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    if (!this.dataByLayer.has(e)) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    this.dataByLayer.set(e, Array.isArray(t) ? t : []);
    const { x: s, y: a } = this.axes, n = this.allData, i = this.options.domainPadding;
    this.baseDomain = {
      x: s.domain ?? at(n.map(s.accessor), i),
      y: a.domain ?? at(n.map(a.accessor), i)
    }, this._hideTooltip(), this._render(!1);
  }
  /** Every point across all layers. */
  get allData() {
    return [...this.dataByLayer.values()].flat();
  }
  /**
   * Emphasise a subset of points: those failing `predicate` are drawn grey and
   * the rest are raised within their layer. Pass null to clear.
   * @param {((d: object, layerId: string) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlightPredicate = t ?? null, this.scales && this._drawPoints(null);
  }
  /** Zoom into a data-space rectangle. */
  zoomTo(t, e) {
    this._setZoomDomain({ x: t, y: e }, !0);
  }
  /** Shift the current view by a pixel offset, e.g. from a drag. */
  panBy(t, e) {
    const { x: s, y: a } = this.scales, [n, i] = s.domain(), [l, d] = a.domain(), p = s.invert(0) - s.invert(t), u = a.invert(0) - a.invert(e);
    this._setZoomDomain({ x: [n + p, i + p], y: [l + u, d + u] }, !1);
  }
  _setZoomDomain(t, e) {
    var a, n;
    const s = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), s || (n = (a = this.options).onZoomChange) == null || n.call(a, !0);
  }
  resetZoom() {
    var t, e;
    this.zoomDomain && (this.zoomDomain = null, this._hideTooltip(), this._render(!0), (e = (t = this.options).onZoomChange) == null || e.call(t, !1));
  }
  get zoomed() {
    return this.zoomDomain !== null;
  }
  destroy() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.root.selectAll("*").remove(), this.root.classed("scatter-plot", !1).style("font-size", null);
  }
  // ── DOM scaffold ────────────────────────────────────────────────────────────
  _build() {
    this.root = h.select(this.container).classed("scatter-plot", !0).style("font-size", `${this.fontSize}px`), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle").attr("transform", "rotate(-90)"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (t) => t.id).join("g").attr("class", (t) => `scatter-plot__layer scatter-plot__layer--${t.id}`), this.highlight = this.plot.append("circle").attr("class", "scatter-plot__highlight").style("display", "none"), this.brush = h.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = h.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = this.root.append("div").attr("class", "scatter-plot__tooltip").style("display", "none");
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.container.clientWidth !== this.width && this._render(!1);
    }), this.resizeObserver.observe(this.container));
  }
  // ── Rendering ───────────────────────────────────────────────────────────────
  /**
   * The margins for this render: the options, with any side left out sized to the
   * text it holds. The left side depends on the y tick labels, which change with
   * the zoom, so this runs on every render.
   */
  _resolveMargin() {
    const t = this.fontSize, e = { ...this.options.margin };
    if (e.bottom ?? (e.bottom = 2 * t + 24), e.left == null) {
      const { y: s } = this.axes, a = (this.zoomDomain ?? this.baseDomain).y, n = I(s, a, [0, 1], !this.zoomDomain && !s.domain), l = (s.tickValues ?? n.ticks(s.ticks ?? void 0)).map(s.format);
      e.left = t + 16 + P(l, t * gt, this.container) + 8;
    }
    return e;
  }
  _render(t) {
    const { height: e, duration: s } = this.options, a = this.margin = this._resolveMargin(), n = this.container.clientWidth || 640, i = Math.max(n - a.left - a.right, 10), l = Math.max(e - a.top - a.bottom, 10);
    this.width = n, this.svg.attr("width", n).attr("height", e), this.plot.attr("transform", `translate(${a.left},${a.top})`), this.clipRect.attr("width", i).attr("height", l), this._updateScales(i, l), this.brush.extent([
      [0, 0],
      [i, l]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const d = t ? this.svg.transition().duration(s) : null;
    this._drawAxes(i, l, d), this._drawPoints(d), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: s, y: a, color: n, radius: i } = this.axes, l = this.zoomDomain ?? this.baseDomain, d = !this.zoomDomain, p = this.layers.filter((u) => !u.color).flatMap((u) => this.dataByLayer.get(u.id));
    this.scales = {
      x: I(s, l.x, [0, t], d && !s.domain),
      y: I(a, l.y, [e, 0], d && !a.domain),
      color: yt(n, p),
      radius: xt(i, this.allData)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap(
      (t) => this.dataByLayer.get(t.id).map((e) => ({ d: e, layer: t }))
    ), this.delaunay = this.nodes.length ? h.Delaunay.from(
      this.nodes,
      (t) => this._px(t.d),
      (t) => this._py(t.d)
    ) : null;
  }
  // Pixel position / size / colour of a point
  _px(t) {
    return this.scales.x(this.axes.x.accessor(t));
  }
  _py(t) {
    return this.scales.y(this.axes.y.accessor(t));
  }
  _pr(t) {
    const { radius: e } = this.axes;
    return e.accessor ? this.scales.radius(e.accessor(t)) : this.scales.radius();
  }
  _pcolor(t, e) {
    if (e.color) return e.color;
    const { color: s } = this.axes;
    return s.accessor ? this.scales.color(s.accessor(t)) : this.scales.color();
  }
  _drawAxes(t, e, s) {
    const { x: a, y: n } = this.axes, { margin: i, fontSize: l } = this, d = (p) => s ? p.transition(s) : p;
    d(this.gridX).call(
      G(h.axisBottom(this.scales.x), a).tickSize(e).tickFormat("")
    ), d(this.gridY).call(
      G(h.axisLeft(this.scales.y), n).tickSize(-t).tickFormat("")
    ), d(this.axisX.attr("transform", `translate(0,${e})`)).call(
      G(h.axisBottom(this.scales.x), a).tickSizeOuter(0)
    ), d(this.axisY).call(G(h.axisLeft(this.scales.y), n).tickSizeOuter(0)), this.titleX.attr("x", t / 2).attr("y", e + i.bottom - 8).text(a.title), this.titleY.attr("x", -e / 2).attr("y", -i.left + l + 2).text(n.title);
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(s) {
      e._drawLayer(h.select(this), s, t);
    });
  }
  _drawLayer(t, e, s) {
    const a = this.dataByLayer.get(e.id), n = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", l = (f) => this._px(f), d = (f) => this._py(f), p = (f) => this._pr(f), u = (f) => this._pcolor(f, e), g = t.selectAll("circle").data(a, n);
    g.exit().remove(), g.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", l).attr("cy", d).attr("r", p).attr(i, u), (s ? g.transition(s) : g).attr("cx", l).attr("cy", d).attr("r", p).attr(i, u);
    const k = this.highlightPredicate, w = t.selectAll("circle");
    w.classed("scatter-plot__point--muted", (f) => k ? !k(f, e.id) : !1), k && w.filter((f) => k(f, e.id)).raise();
  }
  _drawLegends() {
    this._drawColorLegend(), this._drawLayerLegend(), this._drawSizeLegend();
  }
  _drawColorLegend() {
    const t = this.axes.color, e = this.scales.color;
    if (this.legend.selectAll("*").remove(), !t.accessor) return this.legend.style("display", "none");
    if (t.type === "sequential") {
      this.legend.attr("class", "scatter-plot__legend").style("display", null), this.legend.append("span").attr("class", "scatter-plot__legend-title").text(t.title);
      const [s, a] = e.domain(), n = 160, i = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", n).attr("height", 30), l = `${this.clipId}-ramp`;
      i.append("linearGradient").attr("id", l).selectAll("stop").data(h.ticks(0, 1, 10)).join("stop").attr("offset", (p) => p).attr("stop-color", (p) => e(s + p * (a - s))), i.append("rect").attr("width", n).attr("height", 8).attr("fill", `url(#${l})`);
      const d = h.scaleLinear([s, a], [0, n]);
      return i.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(G(h.axisBottom(d), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return X(this.legend, e, {
      title: t.title,
      format: t.format,
      shape: "circle",
      fontSize: this.fontSize
    }), this.legend;
  }
  /** One entry per labelled, non-empty layer, drawn with its mark and colour. */
  _drawLayerLegend() {
    const t = this.layers.filter(
      (s) => s.label && this.dataByLayer.get(s.id).length
    );
    if (this.layerLegend.selectAll("*").remove(), !t.length) return this.layerLegend.style("display", "none");
    this.layerLegend.style("display", null);
    const e = this.layerLegend.selectAll(".scatter-plot__legend-item").data(t, (s) => s.id).join("span").attr("class", "scatter-plot__legend-item");
    return e.append("i").attr("class", (s) => `scatter-plot__swatch scatter-plot__swatch--${s.mark}`).style("color", (s) => s.color ?? "currentColor"), e.append("span").text((s) => s.label), this.layerLegend;
  }
  _drawSizeLegend() {
    const t = this.axes.radius, e = this.scales.radius;
    if (this.sizeLegend.selectAll("*").remove(), !t.accessor || t.type === "constant") return this.sizeLegend.style("display", "none");
    this.sizeLegend.style("display", null), this.sizeLegend.append("span").attr("class", "scatter-plot__legend-title").text(t.title);
    const s = t.tickValues ?? e.ticks(t.ticks ?? 3), a = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(s).join("span").attr("class", "scatter-plot__legend-item"), n = Math.max(...s.map(e));
    return a.append("svg").attr("width", n * 2 + 2).attr("height", n * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", n + 1).attr("cy", n + 1).attr("r", (i) => e(i)), a.append("span").text((i) => t.format(i)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, s], [a, n]] = t.selection;
    if (Math.abs(a - e) < 4 || Math.abs(n - s) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: i, y: l } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([i.invert(e), i.invert(a)], [l.invert(n), l.invert(s)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, s] = h.pointer(t, this.plot.node()), [a, n] = this.scales.x.range(), [i, l] = this.scales.y.range();
    if (e < a || e > n || s < l || s > i) return this._hideTooltip();
    const d = this.nodes[this.delaunay.find(e, s)];
    if (!d) return this._hideTooltip();
    const p = this._px(d.d), u = this._py(d.d);
    if (Math.hypot(p - e, u - s) > this.options.hoverRadius) return this._hideTooltip();
    this.highlight.style("display", null).attr("cx", p).attr("cy", u).attr("r", this._pr(d.d) + 3), this._showTooltip(d, t);
  }
  _tooltipRows({ d: t, layer: e }) {
    const s = [];
    for (const n of ["x", "y", "color"]) {
      const i = this.axes[n];
      n === "color" && e.color || i.accessor && s.push([i.title, i.format(i.accessor(t))]);
    }
    const a = e.tooltip ?? this.options.tooltip;
    return a ? a(t, s, e) : s;
  }
  _showTooltip(t, e) {
    const s = this._tooltipRows(t);
    if (this.tooltip.selectAll("*").remove(), typeof s == "string")
      this.tooltip.html(s);
    else {
      const u = this.tooltip.append("table").selectAll("tr").data(s).join("tr");
      u.append("th").text(([g]) => g), u.append("td").text(([, g]) => g);
    }
    const [a, n] = h.pointer(e, this.container), i = this.tooltip.style("display", null).node(), l = 14, d = a + l + i.offsetWidth > this.container.clientWidth ? a - l - i.offsetWidth : a + l, p = n + l + i.offsetHeight > this.container.clientHeight ? n - l - i.offsetHeight : n + l;
    this.tooltip.style("left", `${Math.max(0, d)}px`).style("top", `${Math.max(0, p)}px`);
  }
  _hideTooltip() {
    this.tooltip.style("display", "none"), this.highlight.style("display", "none");
  }
}
function vt(o, t, { sort: e } = {}) {
  const s = h.rollup(
    o,
    (n) => n.length,
    (n) => n[t] || "(blank)"
  ), a = Array.from(s, ([n, i]) => ({ label: n, count: i }));
  return e === "descending" ? a.sort((n, i) => i.count - n.count) : e === "ascending" && a.sort((n, i) => n.count - i.count), a;
}
function At(o, t, e, { sort: s } = {}) {
  const a = h.group(o, (i) => i[t] || "(blank)"), n = Array.from(a, ([i, l]) => ({
    label: i,
    count: l.length,
    segments: Array.from(
      h.rollup(
        l,
        (d) => d.length,
        (d) => d[e] || "(blank)"
      ),
      ([d, p]) => ({ key: d, count: p })
    )
  }));
  return s === "descending" ? n.sort((i, l) => l.count - i.count) : s === "ascending" && n.sort((i, l) => i.count - l.count), n;
}
export {
  bt as BarChart,
  Q as FONT_SIZES,
  wt as ScatterPlot,
  kt as StackedBarChart,
  _t as categoryColors,
  vt as countBy,
  At as countByStacked,
  W as defaultColors,
  X as drawLegend,
  P as maxTextWidth,
  rt as measureText,
  Y as resolveFontSize
};
