import * as p from "d3";
function Et(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function O(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = Et(e.field), e;
}
function N(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function q(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function bt(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function st(o) {
  switch (o) {
    case "log":
      return p.scaleLog();
    case "sqrt":
      return p.scaleSqrt();
    default:
      return p.scaleLinear();
  }
}
function pt(o, t = [0, 1]) {
  const [e, a] = p.extent(o);
  return e === void 0 ? t : e === a ? [e - 1, a + 1] : [e, a];
}
function ut(o, t, e) {
  return st(o).domain(t).nice(e ?? void 0).domain();
}
function rt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function nt(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
const Bt = [
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
function K(o) {
  return o <= p.schemeTableau10.length ? p.schemeTableau10 : Bt;
}
function Ce(o, t) {
  const e = p.rollup(
    o,
    (i) => i.length,
    (i) => i[t] || "(blank)"
  ), a = Array.from(e).sort((i, s) => s[1] - i[1]).map(([i]) => i);
  return { domain: a, range: K(a.length) };
}
const Dt = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, It = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Ft = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Te(o, t, { sort: e } = {}) {
  const a = p.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), i = Array.from(a, ([s, n]) => ({ label: s, count: n }));
  return e === "descending" ? i.sort((s, n) => n.count - s.count) : e === "ascending" && i.sort((s, n) => s.count - n.count), i;
}
function Rt(o, t, e = "both") {
  const a = `${t ? Math.round(o / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(o);
    case "percent":
      return a;
    case "none":
      return "";
    default:
      return `${o} (${a})`;
  }
}
function qt(o = [], t = {}) {
  const e = t.axis ?? {}, a = t.orientation === "horizontal", i = O(Dt, a ? e.y : e.x), s = O(It, a ? e.x : e.y), n = O(Ft, e.color), c = n.accessor ?? i.accessor, h = p.rollup(
    o,
    (u) => ({ count: p.sum(u, s.accessor), color: c(u[0]) }),
    i.accessor
  );
  i.domain = q(i.domain, h.keys()), i.tickValues = bt(i);
  const r = i.domain.map((u) => {
    var f, y;
    return {
      label: u,
      count: ((f = h.get(u)) == null ? void 0 : f.count) ?? 0,
      color: ((y = h.get(u)) == null ? void 0 : y.color) ?? u
    };
  });
  s.domain ?? (s.domain = ut(s.type, [0, p.max(r, (u) => u.count) || 1], s.ticks)), n.domain = q(
    n.domain,
    r.map((u) => u.color)
  ), n.range ?? (n.range = K(n.domain.length));
  const d = t.total ?? p.sum(r, (u) => u.count);
  return { axes: { category: i, value: s, color: n }, bars: r, total: d };
}
const Ht = "#cfcfcf";
class gt {
  /** @param {() => void} [onChange] called after every change of state */
  constructor(t) {
    this.predicate = null, this.selection = /* @__PURE__ */ new Map(), this.onChange = t ?? null;
  }
  /** Whether anything is highlighted, and so everything else muted. */
  get active() {
    return this.predicate != null || this.selection.size > 0;
  }
  /**
   * Set the predicate: `(record, layerId) => boolean`, or null to drop it. The
   * legend selections are kept.
   */
  setPredicate(t) {
    this.predicate = t ?? null, this._changed();
  }
  /** The selected keys of a dimension, or null while it has no selection. */
  selected(t) {
    return this.selection.get(t) ?? null;
  }
  /** Whether `key` is in the selection of `dimension`. */
  isSelected(t, e) {
    var a;
    return ((a = this.selection.get(t)) == null ? void 0 : a.has(e)) ?? !1;
  }
  /**
   * A legend click. Without `extend`, the key becomes the dimension's only
   * selection, or clears it when it already was. With `extend` (shift or cmd
   * click), the key is added to or removed from the selection.
   */
  toggle(t, e, { extend: a = !1 } = {}) {
    const i = this.selection.get(t) ?? /* @__PURE__ */ new Set();
    let s;
    a ? (s = new Set(i), s.has(e) ? s.delete(e) : s.add(e)) : s = i.size === 1 && i.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), s.size ? this.selection.set(t, s) : this.selection.delete(t), this._changed();
  }
  /** Drop the predicate and every selection. */
  clear() {
    this.predicate = null, this.selection.clear(), this._changed();
  }
  /**
   * Whether a mark is highlighted. `keys` holds the mark's key in each dimension
   * it belongs to, e.g. `{ color: 'Lung', layer: 'samples' }`; a dimension with a
   * selection that the mark has no key in counts as not selected.
   */
  includes(t, e = {}) {
    if (this.predicate && !this.predicate(t, e.layer)) return !1;
    for (const [a, i] of this.selection)
      if (!i.has(e[a])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, a) {
    return this.includes(e, a) ? t : Ht;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Xt = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function lt(o, t, e) {
  const { title: a, tickValues: i, fontSize: s, highlight: n, dimension: c = "color" } = e, h = e.format ?? ((x) => x), r = e.key ?? ((x) => x), d = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", u = (x) => Xt.has(d(x)) ? d(x) : "square";
  if (o.selectAll("*").remove(), a == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), a && o.append("div").attr("class", "chart-legend__title").text(a);
  const f = n != null, y = (x) => f && n.active && !n.isSelected(c, r(x)), b = (x, v) => n.toggle(c, r(v), { extend: x.shiftKey || x.metaKey }), _ = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(i || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", f).classed("chart-legend__item--muted", y);
  f && _.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (x) => n.isSelected(c, r(x))).on("click", b).on("keydown", (x, v) => {
    x.key !== "Enter" && x.key !== " " || (x.preventDefault(), b(x, v));
  }), _.append("i").attr("class", (x) => `chart-legend__swatch chart-legend__swatch--${u(x)}`).style("color", (x) => y(x) ? Ht : t(x)), _.append("span").text((x) => h(x));
}
const St = { small: 10, medium: 12, large: 14 };
function ft(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in St)) throw new Error(`Unknown chart font size "${o}"`);
  return St[o];
}
function X(o, t) {
  return t ? o + 16 : 0;
}
const Gt = 0.5, jt = 0.72, Nt = 5, Pt = 8;
function ct(o) {
  return !!o.title && o.titlePosition === "top";
}
function ht(o) {
  return o * 1.5 + Pt;
}
function mt(o, t, { fontSize: e, color: a }) {
  const i = e * Gt, s = -(e / 2 + Pt), n = o.append("g").attr("class", "axis-title axis-title--top"), c = n.append("text").attr("x", i + Nt).attr("y", s).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), h = i / 2, r = i / 2, d = s - e * jt, u = n.append("path").attr("d", `M${h},${s}V${d}M${h - r},${d + r}L${h},${d}L${h + r},${d + r}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return a && (c.attr("fill", a), u.attr("stroke", a)), n;
}
let ot;
const Wt = 0.55;
function Yt(o, t, e, a = 400) {
  if (ot === void 0 && (ot = document.createElement("canvas").getContext("2d")), !ot) return String(o).length * t * Wt;
  const i = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return ot.font = `${a} ${t}px ${i}`, ot.measureText(String(o)).width;
}
function W(o, t, e, a) {
  let i = 0;
  for (const s of o)
    i = Math.max(i, Yt(s, t, e, a));
  return i;
}
const Lt = 12, xt = 6, yt = 0.85, Ut = "rgba(0,0,0,0.55)", zt = "rgba(0,0,0,0.6)", Zt = {
  data: [],
  orientation: "vertical",
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28,
  onHighlightChange: null
};
class Oe {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Zt, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = p.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the records and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  /**
   * Emphasise the bars whose record passes `predicate`, drawing the rest grey.
   * Combines with the legend's selection. Pass null to drop the predicate.
   * @param {((d: object) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlight.setPredicate(t);
  }
  /** Drop the highlight predicate and the legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }
  _onHighlightChange() {
    var t, e;
    this.draw(), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, a = this.options.orientation === "horizontal", i = this.svg.node(), s = ft(this.options.fontSize), { axes: n, bars: c, total: h } = qt(this.options.data, this.options), { category: r, value: d, color: u } = n, f = r.domain, y = r.format ?? String, b = this.options.barLabel !== "none", _ = (m) => Rt(m.count, h, this.options.barLabel), x = st(d.type).domain(d.domain), v = rt(x, d), T = d.format ?? x.tickFormat(d.ticks ?? void 0), H = r.tickValues ?? f, [B, M] = a ? [d.title, r.title] : [r.title, d.title], S = ct(a ? r : d), Y = S ? 0 : X(s, M), D = W(f.map(y), s, i), I = a ? 0.3 : 0.35;
    let w, P, L;
    if (a)
      w = {
        top: S ? ht(s) : s,
        right: W(c.map(_), s * yt, i, 600) + xt + 8,
        bottom: s + 16 + X(s, B),
        left: Y + D + Lt
      }, P = w.top + f.length * e + w.bottom;
    else if (w = {
      // The label above the tallest bar, or the title above the top tick
      top: Math.max((b ? s * yt : 0) + 16, S ? ht(s) : 0),
      right: 16,
      bottom: s + 24 + X(s, B),
      left: Y + W(v.map(T), s, i) + Lt
    }, P = this.options.height, L = (t - w.left - w.right) / f.length < D, L) {
      const R = Math.round(D * Math.sin(Math.PI / 4)), Z = (1 + I) / 2 / (f.length + I);
      w.bottom += R, P += R, w.left = Math.max(w.left, Math.ceil((R - Z * (t - w.right)) / (1 - Z)));
    }
    const $ = t - w.left - w.right, V = P - w.top - w.bottom, z = p.scaleBand().domain(f).range(r.range || [0, a ? V : $]).padding(I);
    x.range(d.range || (a ? [0, $] : [V, 0]));
    const U = p.scaleOrdinal(u.domain, u.range), G = (m) => this.highlight.color(U(m.color), m, { color: m.color }), [g, k] = a ? [x, z] : [z, x];
    this.root.style("max-width", `${t}px`);
    const E = this.svg.attr("viewBox", `0 0 ${t} ${P}`).attr(
      "aria-label",
      `Bar chart of ${N(d, "count")} by ${N(r, "category")}. ` + c.map((m) => `${y(m.label)}: ${m.count}`).join(", ")
    );
    E.selectAll("*").remove();
    const F = E.append("g").attr("transform", `translate(${w.left},${w.top})`), A = F.append("g").call(
      p.axisLeft(k).tickValues(a ? H : v).tickFormat(a ? y : T).tickSizeOuter(0)
    ), J = F.append("g").attr("transform", `translate(0,${V})`).call(
      p.axisBottom(g).tickValues(a ? v : H).tickFormat(a ? T : y).tickSizeOuter(0)
    );
    for (const m of [A, J])
      m.attr("font-family", null).attr("font-size", s), m.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), m.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    L && J.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const at = F.insert("g", ":first-child").selectAll("line").data(v).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    a ? at.attr("y2", V).attr("x1", (m) => g(m)).attr("x2", (m) => g(m)) : at.attr("x2", $).attr("y1", (m) => k(m)).attr("y2", (m) => k(m));
    const Q = F.append("g").selectAll("g").data(c).join("g"), tt = Q.append("rect").attr("rx", 3).attr("fill", G), j = b ? Q.append("text").attr("font-size", s * yt).attr("font-weight", 600).attr("fill", Ut).text(_) : null;
    a ? (tt.attr("x", g(0)).attr("y", (m) => k(m.label)).attr("width", (m) => Math.max(0, g(m.count) - g(0))).attr("height", k.bandwidth()), j == null || j.attr("x", (m) => g(m.count) + xt).attr("y", (m) => k(m.label) + k.bandwidth() / 2).attr("dy", "0.35em")) : (tt.attr("x", (m) => g(m.label)).attr("y", (m) => k(m.count)).attr("width", g.bandwidth()).attr("height", (m) => Math.max(0, V - k(m.count))), j == null || j.attr("x", (m) => g(m.label) + g.bandwidth() / 2).attr("y", (m) => k(m.count) - xt).attr("text-anchor", "middle")), tt.append("title").text((m) => `${y(m.label)}: ${m.count} of ${h}`);
    const dt = (m) => E.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", zt).text(m || "");
    dt(B).attr("x", w.left + $ / 2).attr("y", P - s), S ? mt(F, M, { fontSize: s, color: zt }) : dt(M).attr(
      "transform",
      `translate(${s + 2},${w.top + V / 2}) rotate(-90)`
    ), lt(this.legend, U, { ...u, fontSize: s, highlight: this.highlight });
  }
}
const Kt = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Jt = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Qt = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Me(o, t, e, { sort: a } = {}) {
  const i = p.group(o, (n) => n[t] || "(blank)"), s = Array.from(i, ([n, c]) => ({ label: n, count: c.length, group: c }));
  return a === "descending" ? s.sort((n, c) => c.count - n.count) : a === "ascending" && s.sort((n, c) => n.count - c.count), s.flatMap(
    ({ label: n, group: c }) => Array.from(
      p.rollup(
        c,
        (h) => h.length,
        (h) => h[e] || "(blank)"
      ),
      ([h, r]) => ({ label: n, key: h, count: r })
    )
  );
}
function te(o = [], t = {}) {
  const e = t.axis ?? {}, a = O(Kt, e.y), i = O(Jt, e.x), s = O(Qt, e.color), n = p.rollup(
    o,
    (r) => p.sum(r, i.accessor),
    a.accessor,
    s.accessor
  );
  a.domain = q(a.domain, n.keys()), a.tickValues = bt(a), s.domain = q(s.domain, o.map(s.accessor));
  const c = a.domain.map((r) => {
    const d = n.get(r);
    let u = 0;
    const f = [];
    for (const y of s.domain) {
      const b = (d == null ? void 0 : d.get(y)) ?? 0;
      b > 0 && f.push({ key: y, count: b, start: u, end: u += b });
    }
    return { label: r, count: u, segments: f };
  });
  i.domain ?? (i.domain = ut(i.type, [0, p.max(c, (r) => r.count) || 1], i.ticks)), s.range ?? (s.range = K(s.domain.length));
  const h = t.total ?? p.sum(c, (r) => r.count);
  return { axes: { category: a, value: i, color: s }, bars: c, total: h };
}
const ee = 12, Ct = 6, Tt = 0.85, se = "rgba(0,0,0,0.55)", ae = {
  data: [],
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28,
  onHighlightChange: null
};
class Ee {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...ae, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = p.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.draw();
  }
  /** Replace the records and redraw. */
  setData(t) {
    this.update({ data: t });
  }
  /** Change any of the constructor options and redraw. Each option given replaces the old one whole. */
  update(t) {
    this.options = { ...this.options, ...t }, this.draw();
  }
  /**
   * Emphasise the segments that pass `predicate`, drawing the rest grey.
   * Combines with the legend's selection. Pass null to drop the predicate.
   * @param {((segment: object) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlight.setPredicate(t);
  }
  /** Drop the highlight predicate and the legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }
  _onHighlightChange() {
    var t, e;
    this.draw(), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("stacked-bar-chart", !1).style("max-width", null);
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, a = this.svg.node(), i = ft(this.options.fontSize), { axes: s, bars: n, total: c } = te(this.options.data, this.options), { category: h, value: r, color: d } = s, u = h.domain, f = h.format ?? String, y = d.format ?? String, b = (g) => Rt(g.count, c, this.options.barLabel), _ = ct(h), x = W(u.map(f), i, a), v = {
      top: _ ? ht(i) : i,
      right: W(n.map(b), i * Tt, a, 600) + Ct + 8,
      bottom: i + 16 + X(i, r.title),
      left: (_ ? 0 : X(i, h.title)) + x + ee
    }, T = t - v.left - v.right, H = u.length * e, B = v.top + H + v.bottom, M = p.scaleBand().domain(u).range(h.range || [0, H]).padding(0.3), S = st(r.type).domain(r.domain).range(r.range || [0, T]), Y = p.scaleOrdinal(d.domain, d.range), D = (g) => this.highlight.color(Y(g.key), g, { color: g.key }), I = rt(S, r), w = r.format ?? S.tickFormat(r.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const P = n.map((g) => {
      const k = g.segments.map((E) => `${y(E.key)} ${E.count}`).join(", ");
      return `${f(g.label)}: ${g.count} (${k})`;
    }).join("; "), L = this.svg.attr("viewBox", `0 0 ${t} ${B}`).attr(
      "aria-label",
      `Stacked bar chart of ${N(r, "count")} by ${N(h, "category")}, split by ${N(d, "group")}. ${P}`
    );
    L.selectAll("*").remove();
    const $ = L.append("g").attr("transform", `translate(${v.left},${v.top})`), V = $.append("g").call(
      p.axisLeft(M).tickValues(h.tickValues ?? u).tickFormat(f).tickSizeOuter(0)
    ), z = $.append("g").attr("transform", `translate(0,${H})`).call(p.axisBottom(S).tickValues(I).tickFormat(w).tickSizeOuter(0));
    for (const g of [V, z])
      g.attr("font-family", null).attr("font-size", i), g.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), g.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    $.insert("g", ":first-child").selectAll("line").data(I).join("line").attr("y2", H).attr("x1", (g) => S(g)).attr("x2", (g) => S(g)).attr("stroke", "rgba(0,0,0,0.08)");
    const U = $.append("g").selectAll("g").data(n).join("g");
    U.selectAll("rect").data((g) => g.segments.map((k) => ({ ...k, label: g.label, barCount: g.count }))).join("rect").attr("x", (g) => S(g.start)).attr("y", (g) => M(g.label)).attr("width", (g) => Math.max(0, S(g.end) - S(g.start))).attr("height", M.bandwidth()).attr("fill", D).attr("stroke", "#fff").attr("stroke-width", 1).append("title").text(
      (g) => `${f(g.label)}, ${y(g.key)}: ${g.count} of ${g.barCount} (${c} total)`
    ), this.options.barLabel !== "none" && U.append("text").attr("x", (g) => S(g.count) + Ct).attr("y", (g) => M(g.label) + M.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", i * Tt).attr("font-weight", 600).attr("fill", se).text(b);
    const G = (g) => L.append("text").attr("text-anchor", "middle").attr("font-size", i).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(g || "");
    G(r.title).attr("x", v.left + T / 2).attr("y", B - i), _ ? mt($, h.title, { fontSize: i, color: "rgba(0,0,0,0.6)" }) : G(h.title).attr(
      "transform",
      `translate(${i + 2},${v.top + H / 2}) rotate(-90)`
    ), lt(this.legend, Y, { ...d, fontSize: i, highlight: this.highlight });
  }
}
const kt = (o) => typeof o == "number" ? p.format(".2f")(o) : String(o), Vt = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: kt
}, ie = { ...Vt, field: "y" }, ne = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: kt
}, oe = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: kt
}, re = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function le(o = [{}], t = []) {
  const e = o.map((i, s) => ({
    ...re,
    ...i,
    data: s === 0 ? t : i.data ?? []
  }));
  if (new Set(e.map((i) => i.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function ce(o = [], t = {}) {
  const e = t.axis ?? {}, a = O(Vt, e.x), i = O(ie, e.y), s = O(ne, e.color), n = O(oe, e.radius), c = le(t.layers, o), h = c.flatMap((r) => r.data);
  for (const r of [a, i]) r.domain ?? (r.domain = ut(r.type, pt(h.map(r.accessor))));
  if (s.accessor) {
    const r = c.filter((d) => !d.color).flatMap((d) => d.data.map(s.accessor));
    s.type === "sequential" ? (s.domain ?? (s.domain = pt(r)), s.range ?? (s.range = p.interpolateViridis)) : (s.domain = q(s.domain, r), s.range ?? (s.range = K(s.domain.length)));
  }
  return n.accessor && n.type !== "constant" && (n.domain ?? (n.domain = pt(h.map(n.accessor)))), { axes: { x: a, y: i, color: s, radius: n }, layers: c };
}
const he = {
  data: [],
  axis: {},
  layers: [{}],
  fontSize: "medium",
  width: null,
  height: 480,
  margin: {},
  key: (o, t) => t,
  hoverRadius: 24,
  rangePadding: 10,
  border: !1,
  duration: 500,
  tooltip: null,
  onZoomChange: null,
  onHighlightChange: null
}, de = 0.92;
function _t(o, t, e) {
  return st(o.type).domain(t).range(o.range ?? e);
}
function pe(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : K(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : p.interpolateRgbBasis(o.range);
    return p.scaleSequential(o.domain, t);
  }
  return p.scaleOrdinal(o.domain, o.range);
}
function ue(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : st(o.type).domain(o.domain).range(o.range);
}
class Re {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...he }, this.axes = null, this.layers = [], this.highlight = new gt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this._build(), this.update(e), this._observeResize();
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
    const i = this.options.layers.map(
      (s, n) => n === a ? { ...s, data: t } : s
    );
    return this.update({ layers: i });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = ft(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`);
    const { axes: e, layers: a } = ce(this.options.data, this.options);
    this.axes = e, this.layers = a, this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (i) => i.id).join("g").attr("class", (i) => `scatter-plot__layer scatter-plot__layer--${i.id}`), this._hideTooltip(), this._render(!1);
  }
  /** Every record across all layers. */
  get allData() {
    return this.layers.flatMap((t) => t.data);
  }
  /**
   * Emphasise a subset of points: those failing `predicate` are drawn grey and
   * the rest are raised within their layer. Combines with the legends'
   * selections. Pass null to drop the predicate.
   * @param {((d: object, layerId: string) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlight.setPredicate(t);
  }
  /** Drop the highlight predicate and every legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }
  _onHighlightChange() {
    var t, e;
    this.scales && (this._drawPoints(null), this._drawLegends()), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  /** Zoom into a data-space rectangle. */
  zoomTo(t, e) {
    this._setZoomDomain({ x: t, y: e }, !0);
  }
  /** Shift the current view by a pixel offset, e.g. from a drag. */
  panBy(t, e) {
    const { x: a, y: i } = this.scales, [s, n] = a.domain(), [c, h] = i.domain(), r = a.invert(0) - a.invert(t), d = i.invert(0) - i.invert(e);
    this._setZoomDomain({ x: [s + r, n + r], y: [c + d, h + d] }, !1);
  }
  _setZoomDomain(t, e) {
    var i, s;
    const a = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), a || (s = (i = this.options).onZoomChange) == null || s.call(i, !0);
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
    this.root = p.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = p.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
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
    const t = this.fontSize, { x: e, y: a } = this.axes, i = ct(a), s = { ...this.options.margin };
    if (s.top ?? (s.top = i ? ht(t) : 16), s.right ?? (s.right = 16), s.bottom ?? (s.bottom = t + 8 + X(t, e.title)), s.left == null) {
      const n = _t(a, this._viewDomain.y, [0, 1]), c = rt(n, a).map(a.format), h = W(c, t * de, this.container);
      s.left = (i ? 0 : X(t, a.title)) + h + 8;
    }
    return s;
  }
  _render(t) {
    const { height: e, duration: a } = this.options, i = this.margin = this._resolveMargin(), s = this.options.width ?? (this.container.clientWidth || 640), n = Math.max(s - i.left - i.right, 10), c = Math.max(e - i.top - i.bottom, 10);
    this.width = s, this.innerSize = [n, c], this.svg.attr("width", s).attr("height", e), this.plot.attr("transform", `translate(${i.left},${i.top})`), this.clipRect.attr("width", n).attr("height", c), this._updateScales(n, c), this.brush.extent([
      [0, 0],
      [n, c]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const h = t ? this.svg.transition().duration(a) : null;
    this._drawAxes(n, c, h), this._drawPoints(h), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: a, y: i, color: s, radius: n } = this.axes, c = this._viewDomain, h = this.options.rangePadding;
    this.scales = {
      x: _t(a, c.x, [h, t - h]),
      y: _t(i, c.y, [e - h, h]),
      color: pe(s),
      radius: ue(n)
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
  // A point's keys in the highlight's dimensions: its color value (none for a
  // fixed-color layer) and its layer
  _keys(t, e) {
    const { color: a } = this.axes;
    return { color: !e.color && a.accessor ? a.accessor(t) : void 0, layer: e.id };
  }
  _drawAxes(t, e, a) {
    const { x: i, y: s } = this.axes, { margin: n, fontSize: c } = this, h = (r) => a ? r.transition(a) : r;
    h(this.gridX).call(
      nt(p.axisBottom(this.scales.x), i).tickSize(e).tickFormat("")
    ), h(this.gridY).call(
      nt(p.axisLeft(this.scales.y), s).tickSize(-t).tickFormat("")
    ), h(this.axisX.attr("transform", `translate(0,${e})`)).call(
      nt(p.axisBottom(this.scales.x), i).tickSizeOuter(0)
    ), h(this.axisY).call(nt(p.axisLeft(this.scales.y), s).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + n.bottom - 8).text(i.title ?? ""), this.titleY.selectAll("*").remove(), ct(s) ? mt(this.titleY, s.title, { fontSize: c }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -n.left + c + 2).text(s.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(a) {
      e._drawLayer(p.select(this), a, t);
    });
  }
  _drawLayer(t, e, a) {
    const i = e.key ?? this.options.key, s = e.mark === "outline" ? "stroke" : "fill", n = (f) => this._px(f), c = (f) => this._py(f), h = (f) => this._pr(f), { highlight: r } = this, d = (f) => r.color(this._pcolor(f, e), f, this._keys(f, e)), u = t.selectAll("circle").data(e.data, i);
    u.exit().remove(), u.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", n).attr("cy", c).attr("r", h).attr(s, d), (a ? u.transition(a) : u).attr("cx", n).attr("cy", c).attr("r", h).attr(s, d), r.active && t.selectAll("circle").filter((f) => r.includes(f, this._keys(f, e))).raise();
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
      const [a, i] = e.domain(), s = 160, n = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", s).attr("height", 30), c = `${this.clipId}-ramp`;
      n.append("linearGradient").attr("id", c).selectAll("stop").data(p.ticks(0, 1, 10)).join("stop").attr("offset", (r) => r).attr("stop-color", (r) => e(a + r * (i - a))), n.append("rect").attr("width", s).attr("height", 8).attr("fill", `url(#${c})`);
      const h = p.scaleLinear([a, i], [0, s]);
      return n.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(nt(p.axisBottom(h), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return lt(this.legend, e, {
      ...t,
      shape: "circle",
      fontSize: this.fontSize,
      highlight: this.highlight
    }), this.legend;
  }
  /**
   * One entry per labelled, non-empty layer, drawn with its mark and colour (a
   * layer without one, colored by the color axis, gets a neutral swatch). The
   * entries select layers in the highlight's 'layer' dimension.
   */
  _drawLayerLegend() {
    const t = this.layers.filter((e) => e.label && e.data.length);
    return lt(this.layerLegend, (e) => e.color ?? "currentColor", {
      title: t.length ? "" : null,
      tickValues: t,
      key: (e) => e.id,
      format: (e) => e.label,
      shape: (e) => e.mark === "outline" ? "ring" : "circle",
      fontSize: this.fontSize,
      highlight: this.highlight,
      dimension: "layer"
    }), this.layerLegend;
  }
  _drawSizeLegend() {
    const t = this.axes.radius, e = this.scales.radius;
    if (this.sizeLegend.selectAll("*").remove(), !t.accessor || t.type === "constant" || !t.title)
      return this.sizeLegend.style("display", "none");
    this.sizeLegend.style("display", null), this.sizeLegend.append("span").attr("class", "scatter-plot__legend-title").text(t.title);
    const a = rt(e, t), i = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(a).join("span").attr("class", "scatter-plot__legend-item"), s = Math.max(...a.map(e));
    return i.append("svg").attr("width", s * 2 + 2).attr("height", s * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", s + 1).attr("cy", s + 1).attr("r", (n) => e(n)), i.append("span").text((n) => t.format(n)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, a], [i, s]] = t.selection;
    if (Math.abs(i - e) < 4 || Math.abs(s - a) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: n, y: c } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([n.invert(e), n.invert(i)], [c.invert(s), c.invert(a)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, a] = p.pointer(t, this.plot.node()), [i, s] = this.innerSize;
    if (e < 0 || e > i || a < 0 || a > s) return this._hideTooltip();
    const n = this.nodes[this.delaunay.find(e, a)];
    if (!n) return this._hideTooltip();
    const c = this._px(n.d), h = this._py(n.d);
    if (Math.hypot(c - e, h - a) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", c).attr("cy", h).attr("r", this._pr(n.d) + 3), this._showTooltip(n, t);
  }
  _tooltipRows({ d: t, layer: e }) {
    const a = [];
    for (const s of ["x", "y", "color"]) {
      const n = this.axes[s];
      s === "color" && e.color || n.accessor && a.push([N(n, s), n.format(n.accessor(t))]);
    }
    const i = e.tooltip ?? this.options.tooltip;
    return i ? i(t, a, e) : a;
  }
  _showTooltip(t, e) {
    const a = this._tooltipRows(t);
    if (this.tooltip.selectAll("*").remove(), typeof a == "string")
      this.tooltip.html(a);
    else {
      const d = this.tooltip.append("table").selectAll("tr").data(a).join("tr");
      d.append("th").text(([u]) => u), d.append("td").text(([, u]) => u);
    }
    const [i, s] = p.pointer(e, this.container), n = this.tooltip.style("display", null).node(), c = 14, h = i + c + n.offsetWidth > this.container.clientWidth ? i - c - n.offsetWidth : i + c, r = s + c + n.offsetHeight > this.container.clientHeight ? s - c - n.offsetHeight : s + c;
    this.tooltip.style("left", `${Math.max(0, h)}px`).style("top", `${Math.max(0, r)}px`);
  }
  _hideTooltip() {
    this.tooltip.style("display", "none"), this.hoverRing.style("display", "none");
  }
}
const ge = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, fe = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, me = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, xe = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ye(o) {
  const t = [...o].sort(p.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = p.quantile(t, 0.25), a = p.quantile(t, 0.5), i = p.quantile(t, 0.75), s = i - e, n = t.filter((r) => r >= e - 1.5 * s && r <= i + 1.5 * s), c = Math.min(n.length ? n[0] : t[0], e), h = Math.max(n.length ? n[n.length - 1] : t[t.length - 1], i);
  return { q1: e, median: a, q3: i, min: c, max: h, mean: p.mean(t) };
}
function _e(o) {
  return o.filter((t) => t != null && t !== "").map(Number).filter((t) => Number.isFinite(t));
}
function be(o = [], t = {}) {
  const e = t.axis ?? {}, a = O(ge, e.y), i = O(fe, e.x), s = O(me, e.group), n = O(xe, e.color), c = Et(a.context), h = (d, u, f) => {
    const y = _e(f.map(i.accessor)), b = ye(y), _ = f[0];
    return {
      group: d,
      label: u,
      context: c && _ ? c(_) ?? null : null,
      count: y.length,
      values: y,
      stats: b,
      outliers: y.filter((x) => x < b.min || x > b.max),
      color: n.accessor && _ ? n.accessor(_) ?? null : null
    };
  };
  let r;
  if (s.accessor) {
    const d = p.group(o, s.accessor, a.accessor);
    s.domain = q(s.domain, d.keys()), r = s.domain.flatMap((u) => {
      const f = d.get(u) ?? /* @__PURE__ */ new Map();
      return q(a.domain, f.keys()).filter((b) => f.has(b)).map((b) => h(u, b, f.get(b)));
    });
  } else {
    const d = p.group(o, a.accessor);
    r = q(a.domain, d.keys()).map(
      (u) => h(null, u, d.get(u) ?? [])
    );
  }
  if (a.domain = [...new Set(r.map((d) => d.label))], a.tickValues = bt(a), i.domain ?? (i.domain = ut(i.type, pt(r.flatMap((d) => d.values)))), n.accessor) {
    const d = r.map((u) => u.color).filter((u) => u != null);
    n.domain = q(n.domain, d), n.range ?? (n.range = K(n.domain.length));
  }
  return { axes: { category: a, value: i, group: s, color: n }, boxes: r };
}
const ke = 12, we = {
  data: [],
  axis: {},
  points: !1,
  showCounts: !1,
  threshold: null,
  rangePadding: 10,
  border: !1,
  fontSize: "medium",
  width: 640,
  rowHeight: 28,
  onHighlightChange: null
}, Ot = 0.3, ve = 0.35, $e = 0.55, Ae = "rgba(0,0,0,0.87)", Mt = 2, Se = 0.45;
function Le(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class He {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...we, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = p.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
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
  /**
   * Emphasise the boxes that pass `predicate`, drawing the rest grey. Combines
   * with the legend's selection. Pass null to drop the predicate.
   * @param {((box: object) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlight.setPredicate(t);
  }
  /** Drop the highlight predicate and the legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }
  _onHighlightChange() {
    var t, e;
    this.draw(), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  destroy() {
    this.root.selectAll("*").remove(), this.root.classed("box-plot-chart", !1).style("max-width", null);
  }
  draw() {
    var At;
    const { width: t, rowHeight: e, points: a, showCounts: i, threshold: s, rangePadding: n, border: c } = this.options, h = this.svg.node(), r = ft(this.options.fontSize), { axes: d, boxes: u } = be(this.options.data, this.options), { category: f, value: y, group: b, color: _ } = d, x = f.format ?? String, v = b.format ?? String, T = y.format ?? p.format(".3~f"), H = (l) => l.context != null ? `${l.context} / ` : "", B = (l) => i ? ` (n=${l.count})` : "", M = (l) => H(l) + x(l.label) + B(l), S = (l) => (l.group != null ? `${v(l.group)} / ` : "") + M(l), Y = new Set(f.tickValues ?? f.domain), D = st(y.type).domain(y.domain), I = rt(D, y), w = y.format ?? D.tickFormat(y.ticks ?? void 0), P = (s == null ? void 0 : s.value) != null && s.value >= Math.min(...y.domain) && s.value <= Math.max(...y.domain), L = [];
    for (const l of u)
      l.group != null && l.group !== ((At = L.at(-1)) == null ? void 0 : At.group) && L.push({ group: l.group }), L.push({ group: l.group, box: l });
    const $ = e * (L.length + 1), V = p.scaleBand(p.range(L.length), [0, $]).paddingInner(Ot).paddingOuter((1 + Ot) / 2), z = V.bandwidth();
    L.forEach((l, C) => {
      l.y = V(C) + z / 2, l.box && (l.box.y = l.y);
    });
    const U = L.filter((l) => !l.box).map((l) => v(l.group)), G = ct(f), g = Math.max(
      W(u.map(M), r, h),
      W(U, r, h, 600)
    ), k = {
      top: Math.max(
        P && s.label ? 2 * r + 8 : r,
        G ? ht(r) : 0
      ),
      right: 16,
      bottom: r + 16 + X(r, y.title),
      left: (G ? 0 : X(r, f.title)) + g + ke
    }, E = t - k.left - k.right, F = k.top + $ + k.bottom, A = D.range(y.range || [n, E - n]), J = _.accessor ? p.scaleOrdinal(_.domain, _.range) : () => Array.isArray(_.range) ? _.range[0] : K(1)[0], at = (l) => _.accessor ? J(l.color) : J(), Q = (l) => this.highlight.color(at(l), l, { color: l.color }), tt = (l) => this.highlight.color(_.accessor ? Ae : at(l), l, { color: l.color }), j = _.accessor ? $e : ve;
    this.root.style("max-width", `${t}px`);
    const dt = u.filter((l) => l.count).map((l) => `${S(l)}: median ${T(l.stats.median)}`).join("; "), m = this.svg.attr("viewBox", `0 0 ${t} ${F}`).attr(
      "aria-label",
      `Box plot of ${N(y, "value")} by ${N(f, "row")}. ${dt}`
    );
    m.selectAll("*").remove();
    const R = m.append("g").attr("transform", `translate(${k.left},${k.top})`);
    R.append("g").selectAll("line").data(I).join("line").attr("y2", $).attr("x1", (l) => A(l)).attr("x2", (l) => A(l)).attr("stroke", "rgba(0,0,0,0.08)");
    const Z = R.append("g").attr("transform", `translate(0,${$})`).call(p.axisBottom(A).tickValues(I).tickFormat(w).tickSizeOuter(0));
    Z.attr("font-family", null).attr("font-size", r), Z.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), Z.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), Z.select(".domain").remove(), R.append("path").attr("d", c ? `M0,0H${E}V${$}H0Z` : `M0,0V${$}H${E}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const wt = R.append("g").attr("font-size", r).selectAll("g").data(L.filter((l) => !l.box || Y.has(l.box.label))).join("g").attr("transform", (l) => `translate(0,${l.y})`);
    if (wt.append("line").attr("x1", -6).attr("x2", (l) => l.box ? 0 : E).attr("stroke", "rgba(0,0,0,0.5)"), wt.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: l, box: C }) {
      const it = p.select(this);
      return C ? (C.context != null && it.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(H(C)), it.append("tspan").text(x(C.label)), i && it.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(B(C)), it) : it.attr("font-weight", 600).text(v(l));
    }), P) {
      const l = A(s.value);
      R.append("line").attr("x1", l).attr("x2", l).attr("y1", 0).attr("y2", $).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), s.label && R.append("text").attr("x", l).attr("y", -6).attr("text-anchor", "middle").attr("font-size", r).attr("fill", "rgba(0,0,0,0.6)").text(s.label);
    }
    const vt = u.filter((l) => l.count), et = R.append("g").selectAll("g").data(vt).join("g").attr("transform", (l) => `translate(0,${l.y - z / 2})`).attr("stroke", Q).attr("fill", Q);
    this.drawPoints(a ? vt : [], {
      width: t,
      height: F,
      x: (l) => k.left + A(l),
      y: (l, C) => k.top + l.y + Le(C) * z / 2,
      color: Q
    }), et.append("line").attr("x1", (l) => A(l.stats.min)).attr("x2", (l) => A(l.stats.max)).attr("y1", z / 2).attr("y2", z / 2), et.selectAll(".cap").data((l) => [l.stats.min, l.stats.max]).join("line").attr("class", "cap").attr("x1", A).attr("x2", A).attr("y1", z * 0.25).attr("y2", z * 0.75), et.append("rect").attr("x", (l) => A(l.stats.q1)).attr("width", (l) => Math.max(1, A(l.stats.q3) - A(l.stats.q1))).attr("height", z).attr("fill-opacity", j).append("title").text((l) => {
      const C = l.stats;
      return `${S(l)}: n=${l.count}, median ${T(C.median)}, mean ${T(C.mean)}, q1 ${T(C.q1)}, q3 ${T(C.q3)}, whiskers ${T(C.min)} to ${T(C.max)}`;
    }), et.append("line").attr("x1", (l) => A(l.stats.median)).attr("x2", (l) => A(l.stats.median)).attr("y1", 0).attr("y2", z).attr("stroke", tt).attr("stroke-width", 2), et.append("circle").attr("cx", (l) => A(l.stats.mean)).attr("cy", z / 2).attr("r", 3).attr("fill", tt), a || et.selectAll(".outlier").data((l) => l.outliers).join("circle").attr("class", "outlier").attr("cx", A).attr("cy", z / 2).attr("r", 2.5).attr("fill", "#fff");
    const $t = (l) => m.append("text").attr("text-anchor", "middle").attr("font-size", r).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(l || "");
    $t(y.title).attr("x", k.left + E / 2).attr("y", F - r), G ? mt(R, f.title, { fontSize: r, color: "rgba(0,0,0,0.6)" }) : $t(f.title).attr(
      "transform",
      `translate(${r + 2},${k.top + $ / 2}) rotate(-90)`
    ), lt(this.legend, J, {
      ..._,
      title: _.accessor ? _.title : null,
      fontSize: r,
      highlight: this.highlight
    });
  }
  /**
   * Draw a dot per value of each box on the canvas, which is sized to the SVG's
   * coordinate space (times the device pixel ratio, so the dots stay sharp) and
   * hidden when there is nothing to draw. `x(value)` and `y(box, index)` give a
   * dot's position in that space, and `color(box)` its fill.
   */
  drawPoints(t, { width: e, height: a, x: i, y: s, color: n }) {
    var r, d;
    this.canvas.style("display", t.length ? null : "none");
    const c = (d = (r = this.canvas.node()).getContext) == null ? void 0 : d.call(r, "2d");
    if (!c) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(a * h)), c.setTransform(h, 0, 0, h, 0, 0), c.clearRect(0, 0, e, a), c.globalAlpha = Se;
    for (const u of t)
      c.fillStyle = n(u), c.beginPath(), u.values.forEach((f, y) => {
        const b = i(f), _ = s(u, y);
        c.moveTo(b + Mt, _), c.arc(b, _, Mt, 0, 2 * Math.PI);
      }), c.fill();
  }
}
export {
  Oe as BarChart,
  He as BoxPlotChart,
  St as FONT_SIZES,
  gt as Highlight,
  Ht as MUTED_COLOR,
  Re as ScatterPlot,
  Ee as StackedBarChart,
  Rt as barLabel,
  ye as boxStats,
  Ce as categoryColors,
  Te as countBy,
  Me as countByStacked,
  K as defaultColors,
  lt as drawLegend,
  mt as drawTopTitle,
  W as maxTextWidth,
  Yt as measureText,
  qt as prepareBarChart,
  be as prepareBoxPlotChart,
  ce as prepareScatterPlot,
  te as prepareStackedBarChart,
  ft as resolveFontSize,
  X as titleLane,
  ct as titleOnTop,
  ht as topTitleLane
};
