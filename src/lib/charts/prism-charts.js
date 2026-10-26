import * as p from "d3";
function St(i) {
  return i == null ? null : typeof i == "function" ? i : (t) => t[i];
}
function M(i, t = {}) {
  const e = { ...i, ...t };
  return e.accessor = St(e.field), e;
}
function N(i, t) {
  return i.title ?? (typeof i.field == "string" ? i.field : t);
}
function F(i, t) {
  return [.../* @__PURE__ */ new Set([...i ?? [], ...t])];
}
function ut(i) {
  var t;
  return ((t = i.tickValues) == null ? void 0 : t.filter((e) => i.domain.includes(e))) ?? null;
}
function tt(i) {
  switch (i) {
    case "log":
      return p.scaleLog();
    case "sqrt":
      return p.scaleSqrt();
    default:
      return p.scaleLinear();
  }
}
function it(i, t = [0, 1]) {
  const [e, a] = p.extent(i);
  return e === void 0 ? t : e === a ? [e - 1, a + 1] : [e, a];
}
function rt(i, t, e) {
  return tt(i).domain(t).nice(e ?? void 0).domain();
}
function nt(i, t) {
  return t.tickValues ? t.tickValues : i.ticks ? i.ticks(t.ticks ?? void 0) : i.domain();
}
function st(i, t) {
  return t.tickValues ? i.tickValues(t.tickValues) : t.ticks != null && i.ticks(t.ticks), t.format && i.tickFormat(t.format), i;
}
const Tt = [
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
function Z(i) {
  return i <= p.schemeTableau10.length ? p.schemeTableau10 : Tt;
}
function me(i, t) {
  const e = p.rollup(
    i,
    (n) => n.length,
    (n) => n[t] || "(blank)"
  ), a = Array.from(e).sort((n, s) => s[1] - n[1]).map(([n]) => n);
  return { domain: a, range: Z(a.length) };
}
const Mt = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ct = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Et = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ge(i, t, { sort: e } = {}) {
  const a = p.rollup(
    i,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(a, ([s, o]) => ({ label: s, count: o }));
  return e === "descending" ? n.sort((s, o) => o.count - s.count) : e === "ascending" && n.sort((s, o) => s.count - o.count), n;
}
function Lt(i, t, e = "both") {
  const a = `${t ? Math.round(i / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(i);
    case "percent":
      return a;
    case "none":
      return "";
    default:
      return `${i} (${a})`;
  }
}
function Vt(i = [], t = {}) {
  const e = t.axis ?? {}, a = t.orientation === "horizontal", n = M(Mt, a ? e.y : e.x), s = M(Ct, a ? e.x : e.y), o = M(Et, e.color), c = o.accessor ?? n.accessor, h = p.rollup(
    i,
    (u) => ({ count: p.sum(u, s.accessor), color: c(u[0]) }),
    n.accessor
  );
  n.domain = F(n.domain, h.keys()), n.tickValues = ut(n);
  const r = n.domain.map((u) => {
    var x, m;
    return {
      label: u,
      count: ((x = h.get(u)) == null ? void 0 : x.count) ?? 0,
      color: ((m = h.get(u)) == null ? void 0 : m.color) ?? u
    };
  });
  s.domain ?? (s.domain = rt(s.type, [0, p.max(r, (u) => u.count) || 1], s.ticks)), o.domain = F(
    o.domain,
    r.map((u) => u.color)
  ), o.range ?? (o.range = Z(o.domain.length));
  const f = t.total ?? p.sum(r, (u) => u.count);
  return { axes: { category: n, value: s, color: o }, bars: r, total: f };
}
function lt(i, t, e) {
  const { title: a, tickValues: n, shape: s = "square", fontSize: o } = e, c = e.format ?? ((r) => r);
  if (i.selectAll("*").remove(), !a) {
    i.style("display", "none");
    return;
  }
  i.attr("class", "chart-legend").style("display", null).style("font-size", o ? `${o}px` : null), i.append("div").attr("class", "chart-legend__title").text(a);
  const h = i.append("div").attr("class", "chart-legend__items").selectAll("span").data(n || t.domain()).join("span").attr("class", "chart-legend__item");
  h.append("i").attr("class", `chart-legend__swatch chart-legend__swatch--${s}`).style("background", (r) => t(r)), h.append("span").text((r) => c(r));
}
const _t = { small: 10, medium: 12, large: 14 };
function ct(i = "medium") {
  if (typeof i == "number") return i;
  if (!(i in _t)) throw new Error(`Unknown chart font size "${i}"`);
  return _t[i];
}
function P(i, t) {
  return t ? i + 16 : 0;
}
let at;
const Bt = 0.55;
function Pt(i, t, e, a = 400) {
  if (at === void 0 && (at = document.createElement("canvas").getContext("2d")), !at) return String(i).length * t * Bt;
  const n = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return at.font = `${a} ${t}px ${n}`, at.measureText(String(i)).width;
}
function H(i, t, e, a) {
  let n = 0;
  for (const s of i)
    n = Math.max(n, Pt(s, t, e, a));
  return n;
}
const bt = 12, ht = 6, dt = 0.85, Dt = "rgba(0,0,0,0.55)", It = {
  data: [],
  orientation: "vertical",
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28
};
class xe {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...It, ...e }, this.root = p.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.draw();
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
    const { width: t, rowHeight: e } = this.options, a = this.options.orientation === "horizontal", n = this.svg.node(), s = ct(this.options.fontSize), { axes: o, bars: c, total: h } = Vt(this.options.data, this.options), { category: r, value: f, color: u } = o, x = r.domain, m = r.format ?? String, b = this.options.barLabel !== "none", y = (g) => Lt(g.count, h, this.options.barLabel), L = tt(f.type).domain(f.domain), z = nt(L, f), O = f.format ?? L.tickFormat(f.ticks ?? void 0), E = r.tickValues ?? x, [v, D] = a ? [f.title, r.title] : [r.title, f.title], I = H(x.map(m), s, n), Y = a ? 0.3 : 0.35;
    let _, C, B;
    if (a)
      _ = {
        top: s,
        right: H(c.map(y), s * dt, n, 600) + ht + 8,
        bottom: s + 16 + P(s, v),
        left: P(s, D) + I + bt
      }, C = _.top + x.length * e + _.bottom;
    else if (_ = {
      top: (b ? s * dt : 0) + 16,
      // the label above the tallest bar
      right: 16,
      bottom: s + 24 + P(s, v),
      left: P(s, D) + H(z.map(O), s, n) + bt
    }, C = this.options.height, B = (t - _.left - _.right) / x.length < I, B) {
      const V = Math.round(I * Math.sin(Math.PI / 4)), W = (1 + Y) / 2 / (x.length + Y);
      _.bottom += V, C += V, _.left = Math.max(_.left, Math.ceil((V - W * (t - _.right)) / (1 - W)));
    }
    const R = t - _.left - _.right, w = C - _.top - _.bottom, T = p.scaleBand().domain(x).range(r.range || [0, a ? w : R]).padding(Y);
    L.range(f.range || (a ? [0, R] : [w, 0]));
    const q = p.scaleOrdinal(u.domain, u.range), [d, $] = a ? [L, T] : [T, L];
    this.root.style("max-width", `${t}px`);
    const X = this.svg.attr("viewBox", `0 0 ${t} ${C}`).attr(
      "aria-label",
      `Bar chart of ${N(f, "count")} by ${N(r, "category")}. ` + c.map((g) => `${m(g.label)}: ${g.count}`).join(", ")
    );
    X.selectAll("*").remove();
    const S = X.append("g").attr("transform", `translate(${_.left},${_.top})`), U = S.append("g").call(
      p.axisLeft($).tickValues(a ? E : z).tickFormat(a ? m : O).tickSizeOuter(0)
    ), K = S.append("g").attr("transform", `translate(0,${w})`).call(
      p.axisBottom(d).tickValues(a ? z : E).tickFormat(a ? O : m).tickSizeOuter(0)
    );
    for (const g of [U, K])
      g.attr("font-family", null).attr("font-size", s), g.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), g.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    B && K.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const k = S.insert("g", ":first-child").selectAll("line").data(z).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    a ? k.attr("y2", w).attr("x1", (g) => d(g)).attr("x2", (g) => d(g)) : k.attr("x2", R).attr("y1", (g) => $(g)).attr("y2", (g) => $(g));
    const J = S.append("g").selectAll("g").data(c).join("g"), j = J.append("rect").attr("rx", 3).attr("fill", (g) => q(g.color)), G = b ? J.append("text").attr("font-size", s * dt).attr("font-weight", 600).attr("fill", Dt).text(y) : null;
    a ? (j.attr("x", d(0)).attr("y", (g) => $(g.label)).attr("width", (g) => Math.max(0, d(g.count) - d(0))).attr("height", $.bandwidth()), G == null || G.attr("x", (g) => d(g.count) + ht).attr("y", (g) => $(g.label) + $.bandwidth() / 2).attr("dy", "0.35em")) : (j.attr("x", (g) => d(g.label)).attr("y", (g) => $(g.count)).attr("width", d.bandwidth()).attr("height", (g) => Math.max(0, w - $(g.count))), G == null || G.attr("x", (g) => d(g.label) + d.bandwidth() / 2).attr("y", (g) => $(g.count) - ht).attr("text-anchor", "middle")), j.append("title").text((g) => `${m(g.label)}: ${g.count} of ${h}`);
    const ot = (g) => X.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(g || "");
    ot(v).attr("x", _.left + R / 2).attr("y", C - s), ot(D).attr(
      "transform",
      `translate(${s + 2},${_.top + w / 2}) rotate(-90)`
    ), lt(this.legend, q, { ...u, fontSize: s });
  }
}
const Rt = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ft = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, qt = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ye(i, t, e, { sort: a } = {}) {
  const n = p.group(i, (o) => o[t] || "(blank)"), s = Array.from(n, ([o, c]) => ({ label: o, count: c.length, group: c }));
  return a === "descending" ? s.sort((o, c) => c.count - o.count) : a === "ascending" && s.sort((o, c) => o.count - c.count), s.flatMap(
    ({ label: o, group: c }) => Array.from(
      p.rollup(
        c,
        (h) => h.length,
        (h) => h[e] || "(blank)"
      ),
      ([h, r]) => ({ label: o, key: h, count: r })
    )
  );
}
function Xt(i = [], t = {}) {
  const e = t.axis ?? {}, a = M(Rt, e.y), n = M(Ft, e.x), s = M(qt, e.color), o = p.rollup(
    i,
    (r) => p.sum(r, n.accessor),
    a.accessor,
    s.accessor
  );
  a.domain = F(a.domain, o.keys()), a.tickValues = ut(a), s.domain = F(s.domain, i.map(s.accessor));
  const c = a.domain.map((r) => {
    const f = o.get(r);
    let u = 0;
    const x = [];
    for (const m of s.domain) {
      const b = (f == null ? void 0 : f.get(m)) ?? 0;
      b > 0 && x.push({ key: m, count: b, start: u, end: u += b });
    }
    return { label: r, count: u, segments: x };
  });
  n.domain ?? (n.domain = rt(n.type, [0, p.max(c, (r) => r.count) || 1], n.ticks)), s.range ?? (s.range = Z(s.domain.length));
  const h = t.total ?? p.sum(c, (r) => r.count);
  return { axes: { category: a, value: n, color: s }, bars: c, total: h };
}
const jt = 12, kt = 6, wt = 0.85, Gt = "rgba(0,0,0,0.55)", Nt = {
  data: [],
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28
};
class _e {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Nt, ...e }, this.root = p.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.draw();
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
    const { width: t, rowHeight: e } = this.options, a = this.svg.node(), n = ct(this.options.fontSize), { axes: s, bars: o, total: c } = Xt(this.options.data, this.options), { category: h, value: r, color: f } = s, u = h.domain, x = h.format ?? String, m = f.format ?? String, b = (d) => Lt(d.count, c, this.options.barLabel), y = {
      top: n,
      right: H(o.map(b), n * wt, a, 600) + kt + 8,
      bottom: n + 16 + P(n, r.title),
      left: P(n, h.title) + H(u.map(x), n, a) + jt
    }, L = t - y.left - y.right, z = u.length * e, O = y.top + z + y.bottom, E = p.scaleBand().domain(u).range(h.range || [0, z]).padding(0.3), v = tt(r.type).domain(r.domain).range(r.range || [0, L]), D = p.scaleOrdinal(f.domain, f.range), I = nt(v, r), Y = r.format ?? v.tickFormat(r.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const _ = o.map((d) => {
      const $ = d.segments.map((X) => `${m(X.key)} ${X.count}`).join(", ");
      return `${x(d.label)}: ${d.count} (${$})`;
    }).join("; "), C = this.svg.attr("viewBox", `0 0 ${t} ${O}`).attr(
      "aria-label",
      `Stacked bar chart of ${N(r, "count")} by ${N(h, "category")}, split by ${N(f, "group")}. ${_}`
    );
    C.selectAll("*").remove();
    const B = C.append("g").attr("transform", `translate(${y.left},${y.top})`), R = B.append("g").call(
      p.axisLeft(E).tickValues(h.tickValues ?? u).tickFormat(x).tickSizeOuter(0)
    ), w = B.append("g").attr("transform", `translate(0,${z})`).call(p.axisBottom(v).tickValues(I).tickFormat(Y).tickSizeOuter(0));
    for (const d of [R, w])
      d.attr("font-family", null).attr("font-size", n), d.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), d.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    B.insert("g", ":first-child").selectAll("line").data(I).join("line").attr("y2", z).attr("x1", (d) => v(d)).attr("x2", (d) => v(d)).attr("stroke", "rgba(0,0,0,0.08)");
    const T = B.append("g").selectAll("g").data(o).join("g");
    T.selectAll("rect").data((d) => d.segments.map(($) => ({ ...$, label: d.label, barCount: d.count }))).join("rect").attr("x", (d) => v(d.start)).attr("y", (d) => E(d.label)).attr("width", (d) => Math.max(0, v(d.end) - v(d.start))).attr("height", E.bandwidth()).attr("fill", (d) => D(d.key)).attr("stroke", "#fff").attr("stroke-width", 1).append("title").text(
      (d) => `${x(d.label)}, ${m(d.key)}: ${d.count} of ${d.barCount} (${c} total)`
    ), this.options.barLabel !== "none" && T.append("text").attr("x", (d) => v(d.count) + kt).attr("y", (d) => E(d.label) + E.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", n * wt).attr("font-weight", 600).attr("fill", Gt).text(b);
    const q = (d) => C.append("text").attr("text-anchor", "middle").attr("font-size", n).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(d || "");
    q(r.title).attr("x", y.left + L / 2).attr("y", O - n), q(h.title).attr(
      "transform",
      `translate(${n + 2},${y.top + z / 2}) rotate(-90)`
    ), lt(this.legend, D, { ...f, fontSize: n });
  }
}
const ft = (i) => typeof i == "number" ? p.format(".2f")(i) : String(i), zt = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: ft
}, Ht = { ...zt, field: "y" }, Yt = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: ft
}, Ut = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: ft
}, Wt = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Zt(i = [{}], t = []) {
  const e = i.map((n, s) => ({
    ...Wt,
    ...n,
    data: s === 0 ? t : n.data ?? []
  }));
  if (new Set(e.map((n) => n.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Kt(i = [], t = {}) {
  const e = t.axis ?? {}, a = M(zt, e.x), n = M(Ht, e.y), s = M(Yt, e.color), o = M(Ut, e.radius), c = Zt(t.layers, i), h = c.flatMap((r) => r.data);
  for (const r of [a, n]) r.domain ?? (r.domain = rt(r.type, it(h.map(r.accessor))));
  if (s.accessor) {
    const r = c.filter((f) => !f.color).flatMap((f) => f.data.map(s.accessor));
    s.type === "sequential" ? (s.domain ?? (s.domain = it(r)), s.range ?? (s.range = p.interpolateViridis)) : (s.domain = F(s.domain, r), s.range ?? (s.range = Z(s.domain.length)));
  }
  return o.accessor && o.type !== "constant" && (o.domain ?? (o.domain = it(h.map(o.accessor)))), { axes: { x: a, y: n, color: s, radius: o }, layers: c };
}
const vt = {
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
}, Jt = 0.92;
function pt(i, t, e) {
  return tt(i.type).domain(t).range(i.range ?? e);
}
function Qt(i) {
  if (!i.accessor)
    return () => Array.isArray(i.range) ? i.range[0] : Z(1)[0];
  if (i.type === "sequential") {
    const t = typeof i.range == "function" ? i.range : p.interpolateRgbBasis(i.range);
    return p.scaleSequential(i.domain, t);
  }
  return p.scaleOrdinal(i.domain, i.range);
}
function te(i) {
  return !i.accessor || i.type === "constant" ? () => i.range[0] : tt(i.type).domain(i.domain).range(i.range);
}
class be {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...vt }, this.axes = null, this.layers = [], this.highlightPredicate = null, this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = ct(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`);
    const { axes: e, layers: a } = Kt(this.options.data, this.options);
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
    const { x: a, y: n } = this.scales, [s, o] = a.domain(), [c, h] = n.domain(), r = a.invert(0) - a.invert(t), f = n.invert(0) - n.invert(e);
    this._setZoomDomain({ x: [s + r, o + r], y: [c + f, h + f] }, !1);
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
    this.root = p.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle").attr("transform", "rotate(-90)"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.highlight = this.plot.append("circle").attr("class", "scatter-plot__highlight").style("display", "none"), this.brush = p.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = p.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
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
    const t = this.fontSize, { x: e, y: a } = this.axes, n = { ...vt.margin, ...this.options.margin };
    if (n.bottom ?? (n.bottom = t + 8 + P(t, e.title)), n.left == null) {
      const s = pt(a, this._viewDomain.y, [0, 1]), o = nt(s, a).map(a.format);
      n.left = P(t, a.title) + H(o, t * Jt, this.container) + 8;
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
      x: pt(a, c.x, [h, t - h]),
      y: pt(n, c.y, [e - h, h]),
      color: Qt(s),
      radius: te(o)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? p.Delaunay.from(
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
      st(p.axisBottom(this.scales.x), n).tickSize(e).tickFormat("")
    ), h(this.gridY).call(
      st(p.axisLeft(this.scales.y), s).tickSize(-t).tickFormat("")
    ), h(this.axisX.attr("transform", `translate(0,${e})`)).call(
      st(p.axisBottom(this.scales.x), n).tickSizeOuter(0)
    ), h(this.axisY).call(st(p.axisLeft(this.scales.y), s).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + o.bottom - 8).text(n.title ?? ""), this.titleY.attr("x", -e / 2).attr("y", -o.left + c + 2).text(s.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(a) {
      e._drawLayer(p.select(this), a, t);
    });
  }
  _drawLayer(t, e, a) {
    const n = e.key ?? this.options.key, s = e.mark === "outline" ? "stroke" : "fill", o = (m) => this._px(m), c = (m) => this._py(m), h = (m) => this._pr(m), r = (m) => this._pcolor(m, e), f = t.selectAll("circle").data(e.data, n);
    f.exit().remove(), f.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", o).attr("cy", c).attr("r", h).attr(s, r), (a ? f.transition(a) : f).attr("cx", o).attr("cy", c).attr("r", h).attr(s, r);
    const u = this.highlightPredicate, x = t.selectAll("circle");
    x.classed("scatter-plot__point--muted", (m) => u ? !u(m, e.id) : !1), u && x.filter((m) => u(m, e.id)).raise();
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
      o.append("linearGradient").attr("id", c).selectAll("stop").data(p.ticks(0, 1, 10)).join("stop").attr("offset", (r) => r).attr("stop-color", (r) => e(a + r * (n - a))), o.append("rect").attr("width", s).attr("height", 8).attr("fill", `url(#${c})`);
      const h = p.scaleLinear([a, n], [0, s]);
      return o.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(st(p.axisBottom(h), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return lt(this.legend, e, { ...t, shape: "circle", fontSize: this.fontSize }), this.legend;
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
    const a = nt(e, t), n = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(a).join("span").attr("class", "scatter-plot__legend-item"), s = Math.max(...a.map(e));
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
    const [e, a] = p.pointer(t, this.plot.node()), [n, s] = this.innerSize;
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
      s === "color" && e.color || o.accessor && a.push([N(o, s), o.format(o.accessor(t))]);
    }
    const n = e.tooltip ?? this.options.tooltip;
    return n ? n(t, a, e) : a;
  }
  _showTooltip(t, e) {
    const a = this._tooltipRows(t);
    if (this.tooltip.selectAll("*").remove(), typeof a == "string")
      this.tooltip.html(a);
    else {
      const f = this.tooltip.append("table").selectAll("tr").data(a).join("tr");
      f.append("th").text(([u]) => u), f.append("td").text(([, u]) => u);
    }
    const [n, s] = p.pointer(e, this.container), o = this.tooltip.style("display", null).node(), c = 14, h = n + c + o.offsetWidth > this.container.clientWidth ? n - c - o.offsetWidth : n + c, r = s + c + o.offsetHeight > this.container.clientHeight ? s - c - o.offsetHeight : s + c;
    this.tooltip.style("left", `${Math.max(0, h)}px`).style("top", `${Math.max(0, r)}px`);
  }
  _hideTooltip() {
    this.tooltip.style("display", "none"), this.highlight.style("display", "none");
  }
}
const ee = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, se = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, ae = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, ne = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function oe(i) {
  const t = [...i].sort(p.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = p.quantile(t, 0.25), a = p.quantile(t, 0.5), n = p.quantile(t, 0.75), s = n - e, o = t.filter((r) => r >= e - 1.5 * s && r <= n + 1.5 * s), c = Math.min(o.length ? o[0] : t[0], e), h = Math.max(o.length ? o[o.length - 1] : t[t.length - 1], n);
  return { q1: e, median: a, q3: n, min: c, max: h, mean: p.mean(t) };
}
function ie(i) {
  return i.filter((t) => t != null && t !== "").map(Number).filter((t) => Number.isFinite(t));
}
function re(i = [], t = {}) {
  const e = t.axis ?? {}, a = M(ee, e.y), n = M(se, e.x), s = M(ae, e.group), o = M(ne, e.color), c = St(a.context), h = (f, u, x) => {
    const m = ie(x.map(n.accessor)), b = oe(m), y = x[0];
    return {
      group: f,
      label: u,
      context: c && y ? c(y) ?? null : null,
      count: m.length,
      values: m,
      stats: b,
      outliers: m.filter((L) => L < b.min || L > b.max),
      color: o.accessor && y ? o.accessor(y) ?? null : null
    };
  };
  let r;
  if (s.accessor) {
    const f = p.group(i, s.accessor, a.accessor);
    s.domain = F(s.domain, f.keys()), r = s.domain.flatMap((u) => {
      const x = f.get(u) ?? /* @__PURE__ */ new Map();
      return F(a.domain, x.keys()).filter((b) => x.has(b)).map((b) => h(u, b, x.get(b)));
    });
  } else {
    const f = p.group(i, a.accessor);
    r = F(a.domain, f.keys()).map(
      (u) => h(null, u, f.get(u) ?? [])
    );
  }
  if (a.domain = [...new Set(r.map((f) => f.label))], a.tickValues = ut(a), n.domain ?? (n.domain = rt(n.type, it(r.flatMap((f) => f.values)))), o.accessor) {
    const f = r.map((u) => u.color).filter((u) => u != null);
    o.domain = F(o.domain, f), o.range ?? (o.range = Z(o.domain.length));
  }
  return { axes: { category: a, value: n, group: s, color: o }, boxes: r };
}
const le = 12, ce = {
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
}, $t = 0.3, he = 0.35, de = 0.55, At = 2, pe = 0.45;
function ue(i) {
  const t = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class ke {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...ce, ...e }, this.root = p.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
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
    var yt;
    const { width: t, rowHeight: e, points: a, showCounts: n, threshold: s, rangePadding: o, border: c } = this.options, h = this.svg.node(), r = ct(this.options.fontSize), { axes: f, boxes: u } = re(this.options.data, this.options), { category: x, value: m, group: b, color: y } = f, L = x.format ?? String, z = b.format ?? String, O = m.format ?? p.format(".3~f"), E = (l) => l.context != null ? `${l.context} / ` : "", v = (l) => n ? ` (n=${l.count})` : "", D = (l) => E(l) + L(l.label) + v(l), I = (l) => (l.group != null ? `${z(l.group)} / ` : "") + D(l), Y = new Set(x.tickValues ?? x.domain), _ = tt(m.type).domain(m.domain), C = nt(_, m), B = m.format ?? _.tickFormat(m.ticks ?? void 0), R = (s == null ? void 0 : s.value) != null && s.value >= Math.min(...m.domain) && s.value <= Math.max(...m.domain), w = [];
    for (const l of u)
      l.group != null && l.group !== ((yt = w.at(-1)) == null ? void 0 : yt.group) && w.push({ group: l.group }), w.push({ group: l.group, box: l });
    const T = e * (w.length + 1), q = p.scaleBand(p.range(w.length), [0, T]).paddingInner($t).paddingOuter((1 + $t) / 2), d = q.bandwidth();
    w.forEach((l, A) => {
      l.y = q(A) + d / 2, l.box && (l.box.y = l.y);
    });
    const $ = w.filter((l) => !l.box).map((l) => z(l.group)), X = Math.max(
      H(u.map(D), r, h),
      H($, r, h, 600)
    ), S = {
      top: R && s.label ? 2 * r + 8 : r,
      right: 16,
      bottom: r + 16 + P(r, m.title),
      left: P(r, x.title) + X + le
    }, U = t - S.left - S.right, K = S.top + T + S.bottom, k = _.range(m.range || [o, U - o]), J = y.accessor ? p.scaleOrdinal(y.domain, y.range) : () => Array.isArray(y.range) ? y.range[0] : Z(1)[0], j = (l) => y.accessor ? J(l.color) : J(), G = y.accessor ? de : he;
    this.root.style("max-width", `${t}px`);
    const ot = u.filter((l) => l.count).map((l) => `${I(l)}: median ${O(l.stats.median)}`).join("; "), g = this.svg.attr("viewBox", `0 0 ${t} ${K}`).attr(
      "aria-label",
      `Box plot of ${N(m, "value")} by ${N(x, "row")}. ${ot}`
    );
    g.selectAll("*").remove();
    const V = g.append("g").attr("transform", `translate(${S.left},${S.top})`);
    V.append("g").selectAll("line").data(C).join("line").attr("y2", T).attr("x1", (l) => k(l)).attr("x2", (l) => k(l)).attr("stroke", "rgba(0,0,0,0.08)");
    const W = V.append("g").attr("transform", `translate(0,${T})`).call(p.axisBottom(k).tickValues(C).tickFormat(B).tickSizeOuter(0));
    W.attr("font-family", null).attr("font-size", r), W.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), W.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), W.select(".domain").remove(), V.append("path").attr("d", c ? `M0,0H${U}V${T}H0Z` : `M0,0V${T}H${U}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const mt = V.append("g").attr("font-size", r).selectAll("g").data(w.filter((l) => !l.box || Y.has(l.box.label))).join("g").attr("transform", (l) => `translate(0,${l.y})`);
    if (mt.append("line").attr("x1", -6).attr("x2", (l) => l.box ? 0 : U).attr("stroke", "rgba(0,0,0,0.5)"), mt.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: l, box: A }) {
      const et = p.select(this);
      return A ? (A.context != null && et.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(E(A)), et.append("tspan").text(L(A.label)), n && et.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(v(A)), et) : et.attr("font-weight", 600).text(z(l));
    }), R) {
      const l = k(s.value);
      V.append("line").attr("x1", l).attr("x2", l).attr("y1", 0).attr("y2", T).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), s.label && V.append("text").attr("x", l).attr("y", -6).attr("text-anchor", "middle").attr("font-size", r).attr("fill", "rgba(0,0,0,0.6)").text(s.label);
    }
    const gt = u.filter((l) => l.count), Q = V.append("g").selectAll("g").data(gt).join("g").attr("transform", (l) => `translate(0,${l.y - d / 2})`).attr("stroke", j).attr("fill", j);
    this.drawPoints(a ? gt : [], {
      width: t,
      height: K,
      x: (l) => S.left + k(l),
      y: (l, A) => S.top + l.y + ue(A) * d / 2,
      color: j
    }), Q.append("line").attr("x1", (l) => k(l.stats.min)).attr("x2", (l) => k(l.stats.max)).attr("y1", d / 2).attr("y2", d / 2), Q.selectAll(".cap").data((l) => [l.stats.min, l.stats.max]).join("line").attr("class", "cap").attr("x1", k).attr("x2", k).attr("y1", d * 0.25).attr("y2", d * 0.75), Q.append("rect").attr("x", (l) => k(l.stats.q1)).attr("width", (l) => Math.max(1, k(l.stats.q3) - k(l.stats.q1))).attr("height", d).attr("fill-opacity", G).append("title").text((l) => {
      const A = l.stats;
      return `${I(l)}: n=${l.count}, median ${O(A.median)}, mean ${O(A.mean)}, q1 ${O(A.q1)}, q3 ${O(A.q3)}, whiskers ${O(A.min)} to ${O(A.max)}`;
    });
    const Ot = y.accessor ? "rgba(0,0,0,0.87)" : j;
    Q.append("line").attr("x1", (l) => k(l.stats.median)).attr("x2", (l) => k(l.stats.median)).attr("y1", 0).attr("y2", d).attr("stroke", Ot).attr("stroke-width", 2), Q.append("circle").attr("cx", (l) => k(l.stats.mean)).attr("cy", d / 2).attr("r", 3).attr("fill", "rgba(0,0,0,0.87)"), a || Q.selectAll(".outlier").data((l) => l.outliers).join("circle").attr("class", "outlier").attr("cx", k).attr("cy", d / 2).attr("r", 2.5).attr("fill", "#fff");
    const xt = (l) => g.append("text").attr("text-anchor", "middle").attr("font-size", r).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(l || "");
    xt(m.title).attr("x", S.left + U / 2).attr("y", K - r), xt(x.title).attr(
      "transform",
      `translate(${r + 2},${S.top + T / 2}) rotate(-90)`
    ), lt(this.legend, J, {
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
    var r, f;
    this.canvas.style("display", t.length ? null : "none");
    const c = (f = (r = this.canvas.node()).getContext) == null ? void 0 : f.call(r, "2d");
    if (!c) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(a * h)), c.setTransform(h, 0, 0, h, 0, 0), c.clearRect(0, 0, e, a), c.globalAlpha = pe;
    for (const u of t)
      c.fillStyle = o(u), c.beginPath(), u.values.forEach((x, m) => {
        const b = n(x), y = s(u, m);
        c.moveTo(b + At, y), c.arc(b, y, At, 0, 2 * Math.PI);
      }), c.fill();
  }
}
export {
  xe as BarChart,
  ke as BoxPlotChart,
  _t as FONT_SIZES,
  be as ScatterPlot,
  _e as StackedBarChart,
  Lt as barLabel,
  oe as boxStats,
  me as categoryColors,
  ge as countBy,
  ye as countByStacked,
  Z as defaultColors,
  lt as drawLegend,
  H as maxTextWidth,
  Pt as measureText,
  Vt as prepareBarChart,
  re as prepareBoxPlotChart,
  Kt as prepareScatterPlot,
  Xt as prepareStackedBarChart,
  ct as resolveFontSize,
  P as titleLane
};
