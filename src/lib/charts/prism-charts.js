import * as d from "d3";
function $t(i) {
  return i == null ? null : typeof i == "function" ? i : (t) => t[i];
}
function S(i, t = {}) {
  const e = { ...i, ...t };
  return e.accessor = $t(e.field), e;
}
function X(i, t) {
  return i.title ?? (typeof i.field == "string" ? i.field : t);
}
function R(i, t) {
  return [.../* @__PURE__ */ new Set([...i ?? [], ...t])];
}
function pt(i) {
  var t;
  return ((t = i.tickValues) == null ? void 0 : t.filter((e) => i.domain.includes(e))) ?? null;
}
function J(i) {
  switch (i) {
    case "log":
      return d.scaleLog();
    case "sqrt":
      return d.scaleSqrt();
    default:
      return d.scaleLinear();
  }
}
function ot(i, t = [0, 1]) {
  const [e, a] = d.extent(i);
  return e === void 0 ? t : e === a ? [e - 1, a + 1] : [e, a];
}
function it(i, t, e) {
  return J(i).domain(t).nice(e ?? void 0).domain();
}
function st(i, t) {
  return t.tickValues ? t.tickValues : i.ticks ? i.ticks(t.ticks ?? void 0) : i.domain();
}
function tt(i, t) {
  return t.tickValues ? i.tickValues(t.tickValues) : t.ticks != null && i.ticks(t.ticks), t.format && i.tickFormat(t.format), i;
}
const zt = [
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
function Y(i) {
  return i <= d.schemeTableau10.length ? d.schemeTableau10 : zt;
}
function he(i, t) {
  const e = d.rollup(
    i,
    (n) => n.length,
    (n) => n[t] || "(blank)"
  ), a = Array.from(e).sort((n, s) => s[1] - n[1]).map(([n]) => n);
  return { domain: a, range: Y(a.length) };
}
const Lt = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Tt = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Ot = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function de(i, t, { sort: e } = {}) {
  const a = d.rollup(
    i,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(a, ([s, o]) => ({ label: s, count: o }));
  return e === "descending" ? n.sort((s, o) => o.count - s.count) : e === "ascending" && n.sort((s, o) => s.count - o.count), n;
}
function Mt(i = [], t = {}) {
  const e = t.axis ?? {}, a = t.orientation === "horizontal", n = S(Lt, a ? e.y : e.x), s = S(Tt, a ? e.x : e.y), o = S(Ot, e.color), c = o.accessor ?? n.accessor, h = d.rollup(
    i,
    (p) => ({ count: d.sum(p, s.accessor), color: c(p[0]) }),
    n.accessor
  );
  n.domain = R(n.domain, h.keys()), n.tickValues = pt(n);
  const r = n.domain.map((p) => {
    var x, f;
    return {
      label: p,
      count: ((x = h.get(p)) == null ? void 0 : x.count) ?? 0,
      color: ((f = h.get(p)) == null ? void 0 : f.color) ?? p
    };
  });
  s.domain ?? (s.domain = it(s.type, [0, d.max(r, (p) => p.count) || 1], s.ticks)), o.domain = R(
    o.domain,
    r.map((p) => p.color)
  ), o.range ?? (o.range = Y(o.domain.length));
  const u = t.total ?? d.sum(r, (p) => p.count);
  return { axes: { category: n, value: s, color: o }, bars: r, total: u };
}
function rt(i, t, e) {
  const { title: a, tickValues: n, shape: s = "square", fontSize: o } = e, c = e.format ?? ((r) => r);
  if (i.selectAll("*").remove(), !a) {
    i.style("display", "none");
    return;
  }
  i.attr("class", "chart-legend").style("display", null).style("font-size", o ? `${o}px` : null), i.append("div").attr("class", "chart-legend__title").text(a);
  const h = i.append("div").attr("class", "chart-legend__items").selectAll("span").data(n || t.domain()).join("span").attr("class", "chart-legend__item");
  h.append("i").attr("class", `chart-legend__swatch chart-legend__swatch--${s}`).style("background", (r) => t(r)), h.append("span").text((r) => c(r));
}
const yt = { small: 10, medium: 12, large: 14 };
function lt(i = "medium") {
  if (typeof i == "number") return i;
  if (!(i in yt)) throw new Error(`Unknown chart font size "${i}"`);
  return yt[i];
}
function B(i, t) {
  return t ? i + 16 : 0;
}
let et;
const Ct = 0.55;
function Vt(i, t, e, a = 400) {
  if (et === void 0 && (et = document.createElement("canvas").getContext("2d")), !et) return String(i).length * t * Ct;
  const n = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return et.font = `${a} ${t}px ${n}`, et.measureText(String(i)).width;
}
function j(i, t, e, a) {
  let n = 0;
  for (const s of i)
    n = Math.max(n, Vt(s, t, e, a));
  return n;
}
const _t = 12, ht = 6, Pt = {
  data: [],
  orientation: "vertical",
  total: null,
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28
};
class pe {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Pt, ...e }, this.root = d.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the records and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, a = this.options.orientation === "horizontal", n = this.svg.node(), s = lt(this.options.fontSize), { axes: o, bars: c, total: h } = Mt(this.options.data, this.options), { category: r, value: u, color: p } = o, x = r.domain, f = r.format ?? String, _ = (g) => `${g.count} (${Math.round(g.count / h * 100)}%)`, y = J(u.type).domain(u.domain), z = st(y, u), L = u.format ?? y.tickFormat(u.ticks ?? void 0), T = r.tickValues ?? x, [V, v] = a ? [u.title, r.title] : [r.title, u.title], D = j(x.map(f), s, n);
    let k, I, F;
    if (a)
      k = {
        top: s,
        right: j(c.map(_), s, n, 600) + ht + 8,
        bottom: s + 16 + B(s, V),
        left: B(s, v) + D + _t
      }, I = k.top + x.length * e + k.bottom;
    else {
      k = {
        top: s + 16,
        right: 16,
        bottom: s + 24 + B(s, V),
        left: B(s, v) + j(z.map(L), s, n) + _t
      }, F = (t - k.left - k.right) / x.length < D;
      const at = F ? Math.round(D * Math.sin(Math.PI / 4)) : 0;
      k.bottom += at, I = this.options.height + at;
    }
    const P = t - k.left - k.right, O = I - k.top - k.bottom, G = d.scaleBand().domain(x).range(r.range || [0, a ? O : P]).padding(a ? 0.3 : 0.35);
    y.range(u.range || (a ? [0, P] : [O, 0]));
    const M = d.scaleOrdinal(p.domain, p.range), [b, $] = a ? [y, G] : [G, y];
    this.root.style("max-width", `${t}px`);
    const m = this.svg.attr("viewBox", `0 0 ${t} ${I}`).attr(
      "aria-label",
      `Bar chart of ${X(u, "count")} by ${X(r, "category")}. ` + c.map((g) => `${f(g.label)}: ${g.count}`).join(", ")
    );
    m.selectAll("*").remove();
    const E = m.append("g").attr("transform", `translate(${k.left},${k.top})`), U = E.append("g").call(
      d.axisLeft($).tickValues(a ? T : z).tickFormat(a ? f : L).tickSizeOuter(0)
    ), C = E.append("g").attr("transform", `translate(0,${O})`).call(
      d.axisBottom(b).tickValues(a ? z : T).tickFormat(a ? L : f).tickSizeOuter(0)
    );
    for (const g of [U, C])
      g.attr("font-family", null).attr("font-size", s), g.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), g.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    F && C.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const q = E.insert("g", ":first-child").selectAll("line").data(z).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    a ? q.attr("y2", O).attr("x1", (g) => b(g)).attr("x2", (g) => b(g)) : q.attr("x2", P).attr("y1", (g) => $(g)).attr("y2", (g) => $(g));
    const W = E.append("g").selectAll("g").data(c).join("g"), w = W.append("rect").attr("rx", 3).attr("fill", (g) => M(g.color)), Z = W.append("text").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.87)").text(_);
    a ? (w.attr("x", b(0)).attr("y", (g) => $(g.label)).attr("width", (g) => Math.max(0, b(g.count) - b(0))).attr("height", $.bandwidth()), Z.attr("x", (g) => b(g.count) + ht).attr("y", (g) => $(g.label) + $.bandwidth() / 2).attr("dy", "0.35em")) : (w.attr("x", (g) => b(g.label)).attr("y", (g) => $(g.count)).attr("width", b.bandwidth()).attr("height", (g) => Math.max(0, O - $(g.count))), Z.attr("x", (g) => b(g.label) + b.bandwidth() / 2).attr("y", (g) => $(g.count) - ht).attr("text-anchor", "middle")), w.append("title").text((g) => `${f(g.label)}: ${g.count} of ${h}`);
    const N = (g) => m.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(g || "");
    N(V).attr("x", k.left + P / 2).attr("y", I - s), N(v).attr(
      "transform",
      `translate(${s + 2},${k.top + O / 2}) rotate(-90)`
    ), rt(this.legend, M, { ...p, fontSize: s });
  }
}
const Et = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Bt = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Dt = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ue(i, t, e, { sort: a } = {}) {
  const n = d.group(i, (o) => o[t] || "(blank)"), s = Array.from(n, ([o, c]) => ({ label: o, count: c.length, group: c }));
  return a === "descending" ? s.sort((o, c) => c.count - o.count) : a === "ascending" && s.sort((o, c) => o.count - c.count), s.flatMap(
    ({ label: o, group: c }) => Array.from(
      d.rollup(
        c,
        (h) => h.length,
        (h) => h[e] || "(blank)"
      ),
      ([h, r]) => ({ label: o, key: h, count: r })
    )
  );
}
function It(i = [], t = {}) {
  const e = t.axis ?? {}, a = S(Et, e.y), n = S(Bt, e.x), s = S(Dt, e.color), o = d.rollup(
    i,
    (r) => d.sum(r, n.accessor),
    a.accessor,
    s.accessor
  );
  a.domain = R(a.domain, o.keys()), a.tickValues = pt(a), s.domain = R(s.domain, i.map(s.accessor));
  const c = a.domain.map((r) => {
    const u = o.get(r);
    let p = 0;
    const x = [];
    for (const f of s.domain) {
      const _ = (u == null ? void 0 : u.get(f)) ?? 0;
      _ > 0 && x.push({ key: f, count: _, start: p, end: p += _ });
    }
    return { label: r, count: p, segments: x };
  });
  n.domain ?? (n.domain = it(n.type, [0, d.max(c, (r) => r.count) || 1], n.ticks)), s.range ?? (s.range = Y(s.domain.length));
  const h = t.total ?? d.sum(c, (r) => r.count);
  return { axes: { category: a, value: n, color: s }, bars: c, total: h };
}
const Ft = 12, bt = 6, Rt = {
  data: [],
  total: null,
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28
};
class me {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Rt, ...e }, this.root = d.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the records and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("stacked-bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, a = this.svg.node(), n = lt(this.options.fontSize), { axes: s, bars: o, total: c } = It(this.options.data, this.options), { category: h, value: r, color: u } = s, p = h.domain, x = h.format ?? String, f = u.format ?? String, _ = (m) => `${m.count} (${Math.round(m.count / c * 100)}%)`, y = {
      top: n,
      right: j(o.map(_), n, a, 600) + bt + 8,
      bottom: n + 16 + B(n, r.title),
      left: B(n, h.title) + j(p.map(x), n, a) + Ft
    }, z = t - y.left - y.right, L = p.length * e, T = y.top + L + y.bottom, V = d.scaleBand().domain(p).range(h.range || [0, L]).padding(0.3), v = J(r.type).domain(r.domain).range(r.range || [0, z]), D = d.scaleOrdinal(u.domain, u.range), k = st(v, r), I = r.format ?? v.tickFormat(r.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const F = o.map((m) => {
      const E = m.segments.map((U) => `${f(U.key)} ${U.count}`).join(", ");
      return `${x(m.label)}: ${m.count} (${E})`;
    }).join("; "), P = this.svg.attr("viewBox", `0 0 ${t} ${T}`).attr(
      "aria-label",
      `Stacked bar chart of ${X(r, "count")} by ${X(h, "category")}, split by ${X(u, "group")}. ${F}`
    );
    P.selectAll("*").remove();
    const O = P.append("g").attr("transform", `translate(${y.left},${y.top})`), G = O.append("g").call(
      d.axisLeft(V).tickValues(h.tickValues ?? p).tickFormat(x).tickSizeOuter(0)
    ), M = O.append("g").attr("transform", `translate(0,${L})`).call(d.axisBottom(v).tickValues(k).tickFormat(I).tickSizeOuter(0));
    for (const m of [G, M])
      m.attr("font-family", null).attr("font-size", n), m.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), m.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    O.insert("g", ":first-child").selectAll("line").data(k).join("line").attr("y2", L).attr("x1", (m) => v(m)).attr("x2", (m) => v(m)).attr("stroke", "rgba(0,0,0,0.08)");
    const b = O.append("g").selectAll("g").data(o).join("g");
    b.selectAll("rect").data((m) => m.segments.map((E) => ({ ...E, label: m.label, barCount: m.count }))).join("rect").attr("x", (m) => v(m.start)).attr("y", (m) => V(m.label)).attr("width", (m) => Math.max(0, v(m.end) - v(m.start))).attr("height", V.bandwidth()).attr("fill", (m) => D(m.key)).attr("stroke", "#fff").attr("stroke-width", 1).append("title").text(
      (m) => `${x(m.label)}, ${f(m.key)}: ${m.count} of ${m.barCount} (${c} total)`
    ), b.append("text").attr("x", (m) => v(m.count) + bt).attr("y", (m) => V(m.label) + V.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", n).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.87)").text(_);
    const $ = (m) => P.append("text").attr("text-anchor", "middle").attr("font-size", n).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(m || "");
    $(r.title).attr("x", y.left + z / 2).attr("y", T - n), $(h.title).attr(
      "transform",
      `translate(${n + 2},${y.top + L / 2}) rotate(-90)`
    ), rt(this.legend, D, { ...u, fontSize: n });
  }
}
const ut = (i) => typeof i == "number" ? d.format(".2f")(i) : String(i), At = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: ut
}, qt = { ...At, field: "y" }, Xt = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: ut
}, jt = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: ut
}, Gt = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Nt(i = [{}], t = []) {
  const e = i.map((n, s) => ({
    ...Gt,
    ...n,
    data: s === 0 ? t : n.data ?? []
  }));
  if (new Set(e.map((n) => n.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Ht(i = [], t = {}) {
  const e = t.axis ?? {}, a = S(At, e.x), n = S(qt, e.y), s = S(Xt, e.color), o = S(jt, e.radius), c = Nt(t.layers, i), h = c.flatMap((r) => r.data);
  for (const r of [a, n]) r.domain ?? (r.domain = it(r.type, ot(h.map(r.accessor))));
  if (s.accessor) {
    const r = c.filter((u) => !u.color).flatMap((u) => u.data.map(s.accessor));
    s.type === "sequential" ? (s.domain ?? (s.domain = ot(r)), s.range ?? (s.range = d.interpolateViridis)) : (s.domain = R(s.domain, r), s.range ?? (s.range = Y(s.domain.length)));
  }
  return o.accessor && o.type !== "constant" && (o.domain ?? (o.domain = ot(h.map(o.accessor)))), { axes: { x: a, y: n, color: s, radius: o }, layers: c };
}
const kt = {
  data: [],
  axis: {},
  layers: [{}],
  fontSize: "medium",
  width: null,
  height: 480,
  margin: { top: 16, right: 16 },
  key: (i, t) => t,
  hoverRadius: 24,
  rangePadding: 10,
  border: !1,
  duration: 500,
  tooltip: null,
  onZoomChange: null
}, Yt = 0.92;
function dt(i, t, e) {
  return J(i.type).domain(t).range(i.range ?? e);
}
function Ut(i) {
  if (!i.accessor)
    return () => Array.isArray(i.range) ? i.range[0] : Y(1)[0];
  if (i.type === "sequential") {
    const t = typeof i.range == "function" ? i.range : d.interpolateRgbBasis(i.range);
    return d.scaleSequential(i.domain, t);
  }
  return d.scaleOrdinal(i.domain, i.range);
}
function Wt(i) {
  return !i.accessor || i.type === "constant" ? () => i.range[0] : J(i.type).domain(i.domain).range(i.range);
}
class fe {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...kt }, this.axes = null, this.layers = [], this.highlightPredicate = null, this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this._build(), this.update(e), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the records of one layer (the first layer by default) and redraw. The
   * current zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    const a = this.layers.findIndex((s) => s.id === e);
    if (a < 0) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    if (a === 0) return this.update({ data: t });
    const n = this.options.layers.map(
      (s, o) => o === a ? { ...s, data: t } : s
    );
    return this.update({ layers: n });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = lt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`);
    const { axes: e, layers: a } = Ht(this.options.data, this.options);
    this.axes = e, this.layers = a, this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (n) => n.id).join("g").attr("class", (n) => `scatter-plot__layer scatter-plot__layer--${n.id}`), this._hideTooltip(), this._render(!1);
  }
  /** Every record across all layers. */
  get allData() {
    return this.layers.flatMap((t) => t.data);
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
    const { x: a, y: n } = this.scales, [s, o] = a.domain(), [c, h] = n.domain(), r = a.invert(0) - a.invert(t), u = n.invert(0) - n.invert(e);
    this._setZoomDomain({ x: [s + r, o + r], y: [c + u, h + u] }, !1);
  }
  _setZoomDomain(t, e) {
    var n, s;
    const a = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), a || (s = (n = this.options).onZoomChange) == null || s.call(n, !0);
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
    this.root = d.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle").attr("transform", "rotate(-90)"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.highlight = this.plot.append("circle").attr("class", "scatter-plot__highlight").style("display", "none"), this.brush = d.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = d.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = this.root.append("div").attr("class", "scatter-plot__tooltip").style("display", "none");
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this._render(!1);
    }), this.resizeObserver.observe(this.container));
  }
  // ── Rendering ───────────────────────────────────────────────────────────────
  /** The x and y domains in view: the zoom, else the axes' base domains. */
  get _viewDomain() {
    return this.zoomDomain ?? { x: this.axes.x.domain, y: this.axes.y.domain };
  }
  /**
   * The margins for this render: the options, with any side left out sized to the
   * text it holds (tick labels, and an axis title only when there is one). The
   * left side depends on the y tick labels, which change with the zoom, so this
   * runs on every render.
   */
  _resolveMargin() {
    const t = this.fontSize, { x: e, y: a } = this.axes, n = { ...kt.margin, ...this.options.margin };
    if (n.bottom ?? (n.bottom = t + 8 + B(t, e.title)), n.left == null) {
      const s = dt(a, this._viewDomain.y, [0, 1]), o = st(s, a).map(a.format);
      n.left = B(t, a.title) + j(o, t * Yt, this.container) + 8;
    }
    return n;
  }
  _render(t) {
    const { height: e, duration: a } = this.options, n = this.margin = this._resolveMargin(), s = this.options.width ?? (this.container.clientWidth || 640), o = Math.max(s - n.left - n.right, 10), c = Math.max(e - n.top - n.bottom, 10);
    this.width = s, this.innerSize = [o, c], this.svg.attr("width", s).attr("height", e), this.plot.attr("transform", `translate(${n.left},${n.top})`), this.clipRect.attr("width", o).attr("height", c), this._updateScales(o, c), this.brush.extent([
      [0, 0],
      [o, c]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const h = t ? this.svg.transition().duration(a) : null;
    this._drawAxes(o, c, h), this._drawPoints(h), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: a, y: n, color: s, radius: o } = this.axes, c = this._viewDomain, h = this.options.rangePadding;
    this.scales = {
      x: dt(a, c.x, [h, t - h]),
      y: dt(n, c.y, [e - h, h]),
      color: Ut(s),
      radius: Wt(o)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? d.Delaunay.from(
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
    const { color: a } = this.axes;
    return a.accessor ? this.scales.color(a.accessor(t)) : this.scales.color();
  }
  _drawAxes(t, e, a) {
    const { x: n, y: s } = this.axes, { margin: o, fontSize: c } = this, h = (r) => a ? r.transition(a) : r;
    h(this.gridX).call(
      tt(d.axisBottom(this.scales.x), n).tickSize(e).tickFormat("")
    ), h(this.gridY).call(
      tt(d.axisLeft(this.scales.y), s).tickSize(-t).tickFormat("")
    ), h(this.axisX.attr("transform", `translate(0,${e})`)).call(
      tt(d.axisBottom(this.scales.x), n).tickSizeOuter(0)
    ), h(this.axisY).call(tt(d.axisLeft(this.scales.y), s).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + o.bottom - 8).text(n.title ?? ""), this.titleY.attr("x", -e / 2).attr("y", -o.left + c + 2).text(s.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(a) {
      e._drawLayer(d.select(this), a, t);
    });
  }
  _drawLayer(t, e, a) {
    const n = e.key ?? this.options.key, s = e.mark === "outline" ? "stroke" : "fill", o = (f) => this._px(f), c = (f) => this._py(f), h = (f) => this._pr(f), r = (f) => this._pcolor(f, e), u = t.selectAll("circle").data(e.data, n);
    u.exit().remove(), u.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", o).attr("cy", c).attr("r", h).attr(s, r), (a ? u.transition(a) : u).attr("cx", o).attr("cy", c).attr("r", h).attr(s, r);
    const p = this.highlightPredicate, x = t.selectAll("circle");
    x.classed("scatter-plot__point--muted", (f) => p ? !p(f, e.id) : !1), p && x.filter((f) => p(f, e.id)).raise();
  }
  _drawLegends() {
    this._drawColorLegend(), this._drawLayerLegend(), this._drawSizeLegend();
  }
  /** The color axis legend: swatches for categories, a ramp for a sequential scale. */
  _drawColorLegend() {
    const t = this.axes.color, e = this.scales.color;
    if (this.legend.selectAll("*").remove(), !t.accessor || !t.title) return this.legend.style("display", "none");
    if (t.type === "sequential") {
      this.legend.attr("class", "scatter-plot__legend").style("display", null), this.legend.append("span").attr("class", "scatter-plot__legend-title").text(t.title);
      const [a, n] = e.domain(), s = 160, o = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", s).attr("height", 30), c = `${this.clipId}-ramp`;
      o.append("linearGradient").attr("id", c).selectAll("stop").data(d.ticks(0, 1, 10)).join("stop").attr("offset", (r) => r).attr("stop-color", (r) => e(a + r * (n - a))), o.append("rect").attr("width", s).attr("height", 8).attr("fill", `url(#${c})`);
      const h = d.scaleLinear([a, n], [0, s]);
      return o.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(tt(d.axisBottom(h), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return rt(this.legend, e, { ...t, shape: "circle", fontSize: this.fontSize }), this.legend;
  }
  /** One entry per labelled, non-empty layer, drawn with its mark and colour. */
  _drawLayerLegend() {
    const t = this.layers.filter((a) => a.label && a.data.length);
    if (this.layerLegend.selectAll("*").remove(), !t.length) return this.layerLegend.style("display", "none");
    this.layerLegend.style("display", null);
    const e = this.layerLegend.selectAll(".scatter-plot__legend-item").data(t, (a) => a.id).join("span").attr("class", "scatter-plot__legend-item");
    return e.append("i").attr("class", (a) => `scatter-plot__swatch scatter-plot__swatch--${a.mark}`).style("color", (a) => a.color ?? "currentColor"), e.append("span").text((a) => a.label), this.layerLegend;
  }
  _drawSizeLegend() {
    const t = this.axes.radius, e = this.scales.radius;
    if (this.sizeLegend.selectAll("*").remove(), !t.accessor || t.type === "constant" || !t.title)
      return this.sizeLegend.style("display", "none");
    this.sizeLegend.style("display", null), this.sizeLegend.append("span").attr("class", "scatter-plot__legend-title").text(t.title);
    const a = st(e, t), n = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(a).join("span").attr("class", "scatter-plot__legend-item"), s = Math.max(...a.map(e));
    return n.append("svg").attr("width", s * 2 + 2).attr("height", s * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", s + 1).attr("cy", s + 1).attr("r", (o) => e(o)), n.append("span").text((o) => t.format(o)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, a], [n, s]] = t.selection;
    if (Math.abs(n - e) < 4 || Math.abs(s - a) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: o, y: c } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([o.invert(e), o.invert(n)], [c.invert(s), c.invert(a)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, a] = d.pointer(t, this.plot.node()), [n, s] = this.innerSize;
    if (e < 0 || e > n || a < 0 || a > s) return this._hideTooltip();
    const o = this.nodes[this.delaunay.find(e, a)];
    if (!o) return this._hideTooltip();
    const c = this._px(o.d), h = this._py(o.d);
    if (Math.hypot(c - e, h - a) > this.options.hoverRadius) return this._hideTooltip();
    this.highlight.style("display", null).attr("cx", c).attr("cy", h).attr("r", this._pr(o.d) + 3), this._showTooltip(o, t);
  }
  _tooltipRows({ d: t, layer: e }) {
    const a = [];
    for (const s of ["x", "y", "color"]) {
      const o = this.axes[s];
      s === "color" && e.color || o.accessor && a.push([X(o, s), o.format(o.accessor(t))]);
    }
    const n = e.tooltip ?? this.options.tooltip;
    return n ? n(t, a, e) : a;
  }
  _showTooltip(t, e) {
    const a = this._tooltipRows(t);
    if (this.tooltip.selectAll("*").remove(), typeof a == "string")
      this.tooltip.html(a);
    else {
      const u = this.tooltip.append("table").selectAll("tr").data(a).join("tr");
      u.append("th").text(([p]) => p), u.append("td").text(([, p]) => p);
    }
    const [n, s] = d.pointer(e, this.container), o = this.tooltip.style("display", null).node(), c = 14, h = n + c + o.offsetWidth > this.container.clientWidth ? n - c - o.offsetWidth : n + c, r = s + c + o.offsetHeight > this.container.clientHeight ? s - c - o.offsetHeight : s + c;
    this.tooltip.style("left", `${Math.max(0, h)}px`).style("top", `${Math.max(0, r)}px`);
  }
  _hideTooltip() {
    this.tooltip.style("display", "none"), this.highlight.style("display", "none");
  }
}
const Zt = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Kt = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Jt = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Qt = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function te(i) {
  const t = [...i].sort(d.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = d.quantile(t, 0.25), a = d.quantile(t, 0.5), n = d.quantile(t, 0.75), s = n - e, o = t.filter((r) => r >= e - 1.5 * s && r <= n + 1.5 * s), c = Math.min(o.length ? o[0] : t[0], e), h = Math.max(o.length ? o[o.length - 1] : t[t.length - 1], n);
  return { q1: e, median: a, q3: n, min: c, max: h, mean: d.mean(t) };
}
function ee(i) {
  return i.filter((t) => t != null && t !== "").map(Number).filter((t) => Number.isFinite(t));
}
function se(i = [], t = {}) {
  const e = t.axis ?? {}, a = S(Zt, e.y), n = S(Kt, e.x), s = S(Jt, e.group), o = S(Qt, e.color), c = $t(a.context), h = (u, p, x) => {
    const f = ee(x.map(n.accessor)), _ = te(f), y = x[0];
    return {
      group: u,
      label: p,
      context: c && y ? c(y) ?? null : null,
      count: f.length,
      values: f,
      stats: _,
      outliers: f.filter((z) => z < _.min || z > _.max),
      color: o.accessor && y ? o.accessor(y) ?? null : null
    };
  };
  let r;
  if (s.accessor) {
    const u = d.group(i, s.accessor, a.accessor);
    s.domain = R(s.domain, u.keys()), r = s.domain.flatMap((p) => {
      const x = u.get(p) ?? /* @__PURE__ */ new Map();
      return R(a.domain, x.keys()).filter((_) => x.has(_)).map((_) => h(p, _, x.get(_)));
    });
  } else {
    const u = d.group(i, a.accessor);
    r = R(a.domain, u.keys()).map(
      (p) => h(null, p, u.get(p) ?? [])
    );
  }
  if (a.domain = [...new Set(r.map((u) => u.label))], a.tickValues = pt(a), n.domain ?? (n.domain = it(n.type, ot(r.flatMap((u) => u.values)))), o.accessor) {
    const u = r.map((p) => p.color).filter((p) => p != null);
    o.domain = R(o.domain, u), o.range ?? (o.range = Y(o.domain.length));
  }
  return { axes: { category: a, value: n, group: s, color: o }, boxes: r };
}
const ae = 12, ne = {
  data: [],
  axis: {},
  points: !1,
  showCounts: !1,
  threshold: null,
  rangePadding: 10,
  border: !1,
  fontSize: "medium",
  width: 640,
  rowHeight: 28
}, wt = 0.3, oe = 0.35, ie = 0.55, vt = 2, re = 0.45;
function le(i) {
  const t = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class ge {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...ne, ...e }, this.root = d.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const a = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = a.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = a.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the records and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("box-plot-chart", !1).style("max-width", null);
  }
  draw() {
    var xt;
    const { width: t, rowHeight: e, points: a, showCounts: n, threshold: s, rangePadding: o, border: c } = this.options, h = this.svg.node(), r = lt(this.options.fontSize), { axes: u, boxes: p } = se(this.options.data, this.options), { category: x, value: f, group: _, color: y } = u, z = x.format ?? String, L = _.format ?? String, T = f.format ?? d.format(".3~f"), V = (l) => l.context != null ? `${l.context} / ` : "", v = (l) => n ? ` (n=${l.count})` : "", D = (l) => V(l) + z(l.label) + v(l), k = (l) => (l.group != null ? `${L(l.group)} / ` : "") + D(l), I = new Set(x.tickValues ?? x.domain), F = J(f.type).domain(f.domain), P = st(F, f), O = f.format ?? F.tickFormat(f.ticks ?? void 0), G = (s == null ? void 0 : s.value) != null && s.value >= Math.min(...f.domain) && s.value <= Math.max(...f.domain), M = [];
    for (const l of p)
      l.group != null && l.group !== ((xt = M.at(-1)) == null ? void 0 : xt.group) && M.push({ group: l.group }), M.push({ group: l.group, box: l });
    const b = e * (M.length + 1), $ = d.scaleBand(d.range(M.length), [0, b]).paddingInner(wt).paddingOuter((1 + wt) / 2), m = $.bandwidth();
    M.forEach((l, A) => {
      l.y = $(A) + m / 2, l.box && (l.box.y = l.y);
    });
    const E = M.filter((l) => !l.box).map((l) => L(l.group)), U = Math.max(
      j(p.map(D), r, h),
      j(E, r, h, 600)
    ), C = {
      top: G && s.label ? 2 * r + 8 : r,
      right: 16,
      bottom: r + 16 + B(r, f.title),
      left: B(r, x.title) + U + ae
    }, q = t - C.left - C.right, W = C.top + b + C.bottom, w = F.range(f.range || [o, q - o]), Z = y.accessor ? d.scaleOrdinal(y.domain, y.range) : () => Array.isArray(y.range) ? y.range[0] : Y(1)[0], N = (l) => y.accessor ? Z(l.color) : Z(), g = y.accessor ? ie : oe;
    this.root.style("max-width", `${t}px`);
    const at = p.filter((l) => l.count).map((l) => `${k(l)}: median ${T(l.stats.median)}`).join("; "), ct = this.svg.attr("viewBox", `0 0 ${t} ${W}`).attr(
      "aria-label",
      `Box plot of ${X(f, "value")} by ${X(x, "row")}. ${at}`
    );
    ct.selectAll("*").remove();
    const H = ct.append("g").attr("transform", `translate(${C.left},${C.top})`);
    H.append("g").selectAll("line").data(P).join("line").attr("y2", b).attr("x1", (l) => w(l)).attr("x2", (l) => w(l)).attr("stroke", "rgba(0,0,0,0.08)");
    const nt = H.append("g").attr("transform", `translate(0,${b})`).call(d.axisBottom(w).tickValues(P).tickFormat(O).tickSizeOuter(0));
    nt.attr("font-family", null).attr("font-size", r), nt.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), nt.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), nt.select(".domain").remove(), H.append("path").attr("d", c ? `M0,0H${q}V${b}H0Z` : `M0,0V${b}H${q}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const mt = H.append("g").attr("font-size", r).selectAll("g").data(M.filter((l) => !l.box || I.has(l.box.label))).join("g").attr("transform", (l) => `translate(0,${l.y})`);
    if (mt.append("line").attr("x1", -6).attr("x2", (l) => l.box ? 0 : q).attr("stroke", "rgba(0,0,0,0.5)"), mt.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: l, box: A }) {
      const Q = d.select(this);
      return A ? (A.context != null && Q.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(V(A)), Q.append("tspan").text(z(A.label)), n && Q.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(v(A)), Q) : Q.attr("font-weight", 600).text(L(l));
    }), G) {
      const l = w(s.value);
      H.append("line").attr("x1", l).attr("x2", l).attr("y1", 0).attr("y2", b).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), s.label && H.append("text").attr("x", l).attr("y", -6).attr("text-anchor", "middle").attr("font-size", r).attr("fill", "rgba(0,0,0,0.6)").text(s.label);
    }
    const ft = p.filter((l) => l.count), K = H.append("g").selectAll("g").data(ft).join("g").attr("transform", (l) => `translate(0,${l.y - m / 2})`).attr("stroke", N).attr("fill", N);
    this.drawPoints(a ? ft : [], {
      width: t,
      height: W,
      x: (l) => C.left + w(l),
      y: (l, A) => C.top + l.y + le(A) * m / 2,
      color: N
    }), K.append("line").attr("x1", (l) => w(l.stats.min)).attr("x2", (l) => w(l.stats.max)).attr("y1", m / 2).attr("y2", m / 2), K.selectAll(".cap").data((l) => [l.stats.min, l.stats.max]).join("line").attr("class", "cap").attr("x1", w).attr("x2", w).attr("y1", m * 0.25).attr("y2", m * 0.75), K.append("rect").attr("x", (l) => w(l.stats.q1)).attr("width", (l) => Math.max(1, w(l.stats.q3) - w(l.stats.q1))).attr("height", m).attr("fill-opacity", g).append("title").text((l) => {
      const A = l.stats;
      return `${k(l)}: n=${l.count}, median ${T(A.median)}, mean ${T(A.mean)}, q1 ${T(A.q1)}, q3 ${T(A.q3)}, whiskers ${T(A.min)} to ${T(A.max)}`;
    });
    const St = y.accessor ? "rgba(0,0,0,0.87)" : N;
    K.append("line").attr("x1", (l) => w(l.stats.median)).attr("x2", (l) => w(l.stats.median)).attr("y1", 0).attr("y2", m).attr("stroke", St).attr("stroke-width", 2), K.append("circle").attr("cx", (l) => w(l.stats.mean)).attr("cy", m / 2).attr("r", 3).attr("fill", "rgba(0,0,0,0.87)"), a || K.selectAll(".outlier").data((l) => l.outliers).join("circle").attr("class", "outlier").attr("cx", w).attr("cy", m / 2).attr("r", 2.5).attr("fill", "#fff");
    const gt = (l) => ct.append("text").attr("text-anchor", "middle").attr("font-size", r).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(l || "");
    gt(f.title).attr("x", C.left + q / 2).attr("y", W - r), gt(x.title).attr(
      "transform",
      `translate(${r + 2},${C.top + b / 2}) rotate(-90)`
    ), rt(this.legend, Z, {
      ...y,
      title: y.accessor ? y.title : null,
      fontSize: r
    });
  }
  /**
   * Draw a dot per value of each box on the canvas, which is sized to the SVG's
   * coordinate space (times the device pixel ratio, so the dots stay sharp) and
   * hidden when there is nothing to draw. `x(value)` and `y(box, index)` give a
   * dot's position in that space, and `color(box)` its fill.
   */
  drawPoints(t, { width: e, height: a, x: n, y: s, color: o }) {
    var r, u;
    this.canvas.style("display", t.length ? null : "none");
    const c = (u = (r = this.canvas.node()).getContext) == null ? void 0 : u.call(r, "2d");
    if (!c) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(a * h)), c.setTransform(h, 0, 0, h, 0, 0), c.clearRect(0, 0, e, a), c.globalAlpha = re;
    for (const p of t)
      c.fillStyle = o(p), c.beginPath(), p.values.forEach((x, f) => {
        const _ = n(x), y = s(p, f);
        c.moveTo(_ + vt, y), c.arc(_, y, vt, 0, 2 * Math.PI);
      }), c.fill();
  }
}
export {
  pe as BarChart,
  ge as BoxPlotChart,
  yt as FONT_SIZES,
  fe as ScatterPlot,
  me as StackedBarChart,
  te as boxStats,
  he as categoryColors,
  de as countBy,
  ue as countByStacked,
  Y as defaultColors,
  rt as drawLegend,
  j as maxTextWidth,
  Vt as measureText,
  Mt as prepareBarChart,
  se as prepareBoxPlotChart,
  Ht as prepareScatterPlot,
  It as prepareStackedBarChart,
  lt as resolveFontSize,
  B as titleLane
};
