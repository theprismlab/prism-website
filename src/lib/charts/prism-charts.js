import * as _ from "d3";
const me = [
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
function tt(s) {
  return s <= _.schemeTableau10.length ? _.schemeTableau10 : me;
}
function Kn(s, t) {
  const e = _.rollup(
    s,
    (n) => n.length,
    (n) => n[t] || "(blank)"
  ), o = Array.from(e).sort((n, i) => i[1] - n[1]).map(([n]) => n);
  return { domain: o, range: tt(o.length) };
}
function he(s) {
  return s == null ? null : typeof s == "function" ? s : (t) => t[s];
}
function N(s, t = {}) {
  const e = { ...s, ...t };
  return e.accessor = he(e.field), e;
}
function it(s, t) {
  return s.title ?? (typeof s.field == "string" ? s.field : t);
}
function Z(s, t) {
  return [.../* @__PURE__ */ new Set([...s ?? [], ...t])];
}
function Dt(s) {
  var t;
  return ((t = s.tickValues) == null ? void 0 : t.filter((e) => s.domain.includes(e))) ?? null;
}
function dt(s) {
  switch (s) {
    case "log":
      return _.scaleLog();
    case "sqrt":
      return _.scaleSqrt();
    default:
      return _.scaleLinear();
  }
}
function ft(s, t = [0, 1]) {
  const [e, o] = _.extent(s);
  return e === void 0 ? t : e === o ? [e - 1, o + 1] : [e, o];
}
function zt(s, t, e) {
  return dt(s).domain(t).nice(e ?? void 0).domain();
}
function kt(s, t) {
  return t.tickValues ? t.tickValues : s.ticks ? s.ticks(t.ticks ?? void 0) : s.domain();
}
function pt(s, t) {
  return t.tickValues ? s.tickValues(t.tickValues) : t.ticks != null && s.ticks(t.ticks), t.format && s.tickFormat(t.format), s;
}
function de(s) {
  if (!s.accessor)
    return () => Array.isArray(s.range) ? s.range[0] : tt(1)[0];
  if (s.type === "sequential") {
    const t = typeof s.range == "function" ? s.range : _.interpolateRgbBasis(s.range);
    return _.scaleSequential(s.domain, t);
  }
  return _.scaleOrdinal(s.domain, s.range);
}
function ye(s) {
  return !s.accessor || s.type === "constant" ? () => s.range[0] : dt(s.type).domain(s.domain).range(s.range);
}
const xe = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, _e = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, be = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Zn(s, t, { sort: e } = {}) {
  const o = _.rollup(
    s,
    (i) => i.length,
    (i) => i[t] || "(blank)"
  ), n = Array.from(o, ([i, a]) => ({ label: i, count: a }));
  return e === "descending" ? n.sort((i, a) => a.count - i.count) : e === "ascending" && n.sort((i, a) => i.count - a.count), n;
}
function ue(s, t, e = "both") {
  const o = `${t ? Math.round(s / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(s);
    case "percent":
      return o;
    case "none":
      return "";
    default:
      return `${s} (${o})`;
  }
}
function ke(s = [], t = {}) {
  const e = t.axis ?? {}, o = t.orientation === "horizontal", n = N(xe, o ? e.y : e.x), i = N(_e, o ? e.x : e.y), a = N(be, e.color), l = a.accessor ?? n.accessor, h = _.rollup(
    s,
    (y) => ({ count: _.sum(y, i.accessor), color: l(y[0]) }),
    n.accessor
  );
  n.domain = Z(n.domain, h.keys()), n.tickValues = Dt(n);
  const c = n.domain.map((y) => {
    var g, v;
    return {
      label: y,
      count: ((g = h.get(y)) == null ? void 0 : g.count) ?? 0,
      color: ((v = h.get(y)) == null ? void 0 : v.color) ?? y
    };
  });
  i.domain ?? (i.domain = zt(i.type, [0, _.max(c, (y) => y.count) || 1], i.ticks)), a.domain = Z(
    a.domain,
    c.map((y) => y.color)
  ), a.range ?? (a.range = tt(a.domain.length));
  const p = t.total ?? _.sum(c, (y) => y.count);
  return { axes: { category: n, value: i, color: a }, bars: c, total: p };
}
const Nt = "#cfcfcf";
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
    var o;
    return ((o = this.selection.get(t)) == null ? void 0 : o.has(e)) ?? !1;
  }
  /**
   * A legend click. Without `extend`, the key becomes the dimension's only
   * selection, or clears it when it already was. With `extend` (shift or cmd
   * click), the key is added to or removed from the selection.
   */
  toggle(t, e, { extend: o = !1 } = {}) {
    const n = this.selection.get(t) ?? /* @__PURE__ */ new Set();
    let i;
    o ? (i = new Set(n), i.has(e) ? i.delete(e) : i.add(e)) : i = n.size === 1 && n.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), i.size ? this.selection.set(t, i) : this.selection.delete(t), this._changed();
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
    for (const [o, n] of this.selection)
      if (!n.has(e[o])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, o) {
    return this.includes(e, o) ? t : Nt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const we = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function ht(s, t, e) {
  const { title: o, tickValues: n, fontSize: i, highlight: a, dimension: l = "color" } = e, h = e.format ?? ((b) => b), c = e.key ?? ((b) => b), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", y = (b) => we.has(p(b)) ? p(b) : "square";
  if (s.selectAll("*").remove(), o == null) {
    s.style("display", "none");
    return;
  }
  s.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), o && s.append("div").attr("class", "chart-legend__title").text(o);
  const g = a != null, v = (b) => g && a.active && !a.isSelected(l, c(b)), w = (b, $) => a.toggle(l, c($), { extend: b.shiftKey || b.metaKey }), m = s.append("div").attr("class", "chart-legend__items").selectAll("span").data(n || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", g).classed("chart-legend__item--muted", v);
  g && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (b) => a.isSelected(l, c(b))).on("click", w).on("keydown", (b, $) => {
    b.key !== "Enter" && b.key !== " " || (b.preventDefault(), w(b, $));
  }), m.append("i").attr("class", (b) => `chart-legend__swatch chart-legend__swatch--${y(b)}`).style("color", (b) => v(b) ? Nt : t(b)), m.append("span").text((b) => h(b));
}
let ve = 0;
function Le(s, t, e) {
  const { title: o, fontSize: n, width: i = 160 } = e;
  if (s.selectAll("*").remove(), o == null) {
    s.style("display", "none");
    return;
  }
  const a = n ?? 12;
  s.attr("class", "chart-legend").style("display", null).style("font-size", n ? `${n}px` : null), o && s.append("div").attr("class", "chart-legend__title").text(o);
  const [l, h] = t.domain(), c = Math.ceil(a * 1.5), p = Math.round(a * 0.67), y = s.append("svg").attr("class", "chart-legend__ramp").attr("width", i + c * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), g = `chart-legend-ramp-${ve += 1}`;
  y.append("linearGradient").attr("id", g).selectAll("stop").data(_.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(l + m * (h - l)));
  const v = y.append("g").attr("transform", `translate(${c},0)`);
  v.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${g})`);
  const w = _.axisBottom(_.scaleLinear([l, h], [0, i]));
  v.append("g").attr("transform", `translate(0,${p})`).call(pt(w, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const Gt = { small: 10, medium: 12, large: 14 };
function mt(s = "medium") {
  if (typeof s == "number") return s;
  if (!(s in Gt)) throw new Error(`Unknown chart font size "${s}"`);
  return Gt[s];
}
function at(s, t) {
  return t ? s + 16 : 0;
}
const Ae = 0.5, $e = 0.72, Se = 5, pe = 8;
function wt(s) {
  return !!s.title && s.titlePosition === "top";
}
function vt(s) {
  return s * 1.5 + pe;
}
function Tt(s, t, { fontSize: e, color: o }) {
  const n = e * Ae, i = -(e / 2 + pe), a = s.append("g").attr("class", "axis-title axis-title--top"), l = a.append("text").attr("x", n + Se).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), h = n / 2, c = n / 2, p = i - e * $e, y = a.append("path").attr("d", `M${h},${i}V${p}M${h - c},${p + c}L${h},${p}L${h + c},${p + c}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return o && (l.attr("fill", o), y.attr("stroke", o)), a;
}
let _t;
const Me = 0.55;
function Ft(s, t, e, o = 400) {
  if (_t === void 0 && (_t = document.createElement("canvas").getContext("2d")), !_t) return String(s).length * t * Me;
  const n = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return _t.font = `${o} ${t}px ${n}`, _t.measureText(String(s)).width;
}
function rt(s, t, e, o) {
  let n = 0;
  for (const i of s)
    n = Math.max(n, Ft(i, t, e, o));
  return n;
}
const Xt = 12, Ct = 6, Ot = 0.85, ze = "rgba(0,0,0,0.55)", Wt = "rgba(0,0,0,0.6)", Te = {
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
class Jn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Te, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = _.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.draw();
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
    const { width: t, rowHeight: e } = this.options, o = this.options.orientation === "horizontal", n = this.svg.node(), i = mt(this.options.fontSize), { axes: a, bars: l, total: h } = ke(this.options.data, this.options), { category: c, value: p, color: y } = a, g = c.domain, v = c.format ?? String, w = this.options.barLabel !== "none", m = (S) => ue(S.count, h, this.options.barLabel), b = dt(p.type).domain(p.domain), $ = kt(b, p), z = p.format ?? b.tickFormat(p.ticks ?? void 0), M = c.tickValues ?? g, [H, R] = o ? [p.title, c.title] : [c.title, p.title], B = wt(o ? c : p), F = B ? 0 : at(i, R), I = rt(g.map(v), i, n), q = o ? 0.3 : 0.35;
    let O, j, x;
    if (o)
      O = {
        top: B ? vt(i) : i,
        right: rt(l.map(m), i * Ot, n, 600) + Ct + 8,
        bottom: i + 16 + at(i, H),
        left: F + I + Xt
      }, j = O.top + g.length * e + O.bottom;
    else if (O = {
      // The label above the tallest bar, or the title above the top tick
      top: Math.max((w ? i * Ot : 0) + 16, B ? vt(i) : 0),
      right: 16,
      bottom: i + 24 + at(i, H),
      left: F + rt($.map(z), i, n) + Xt
    }, j = this.options.height, x = (t - O.left - O.right) / g.length < I, x) {
      const W = Math.round(I * Math.sin(Math.PI / 4)), et = (1 + q) / 2 / (g.length + q);
      O.bottom += W, j += W, O.left = Math.max(O.left, Math.ceil((W - et * (t - O.right)) / (1 - et)));
    }
    const E = t - O.left - O.right, V = j - O.top - O.bottom, d = _.scaleBand().domain(g).range(c.range || [0, o ? V : E]).padding(q);
    b.range(p.range || (o ? [0, E] : [V, 0]));
    const L = _.scaleOrdinal(y.domain, y.range), k = (S) => this.highlight.color(L(S.color), S, { color: S.color }), [u, f] = o ? [b, d] : [d, b];
    this.root.style("max-width", `${t}px`);
    const A = this.svg.attr("viewBox", `0 0 ${t} ${j}`).attr(
      "aria-label",
      `Bar chart of ${it(p, "count")} by ${it(c, "category")}. ` + l.map((S) => `${v(S.label)}: ${S.count}`).join(", ")
    );
    A.selectAll("*").remove();
    const C = A.append("g").attr("transform", `translate(${O.left},${O.top})`), P = C.append("g").call(
      _.axisLeft(f).tickValues(o ? M : $).tickFormat(o ? v : z).tickSizeOuter(0)
    ), G = C.append("g").attr("transform", `translate(0,${V})`).call(
      _.axisBottom(u).tickValues(o ? $ : M).tickFormat(o ? z : v).tickSizeOuter(0)
    );
    for (const S of [P, G])
      S.attr("font-family", null).attr("font-size", i), S.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), S.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    x && G.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const U = C.insert("g", ":first-child").selectAll("line").data($).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    o ? U.attr("y2", V).attr("x1", (S) => u(S)).attr("x2", (S) => u(S)) : U.attr("x2", E).attr("y1", (S) => f(S)).attr("y2", (S) => f(S));
    const Y = C.append("g").selectAll("g").data(l).join("g"), K = Y.append("rect").attr("rx", 3).attr("fill", k), X = w ? Y.append("text").attr("font-size", i * Ot).attr("font-weight", 600).attr("fill", ze).text(m) : null;
    o ? (K.attr("x", u(0)).attr("y", (S) => f(S.label)).attr("width", (S) => Math.max(0, u(S.count) - u(0))).attr("height", f.bandwidth()), X == null || X.attr("x", (S) => u(S.count) + Ct).attr("y", (S) => f(S.label) + f.bandwidth() / 2).attr("dy", "0.35em")) : (K.attr("x", (S) => u(S.label)).attr("y", (S) => f(S.count)).attr("width", u.bandwidth()).attr("height", (S) => Math.max(0, V - f(S.count))), X == null || X.attr("x", (S) => u(S.label) + u.bandwidth() / 2).attr("y", (S) => f(S.count) - Ct).attr("text-anchor", "middle")), K.append("title").text((S) => `${v(S.label)}: ${S.count} of ${h}`);
    const lt = (S) => A.append("text").attr("text-anchor", "middle").attr("font-size", i).attr("font-weight", 600).attr("fill", Wt).text(S || "");
    lt(H).attr("x", O.left + E / 2).attr("y", j - i), B ? Tt(C, R, { fontSize: i, color: Wt }) : lt(R).attr(
      "transform",
      `translate(${i + 2},${O.top + V / 2}) rotate(-90)`
    ), ht(this.legend, L, { ...y, fontSize: i, highlight: this.highlight });
  }
}
const Ce = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Oe = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Ee = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Qn(s, t, e, { sort: o } = {}) {
  const n = _.group(s, (a) => a[t] || "(blank)"), i = Array.from(n, ([a, l]) => ({ label: a, count: l.length, group: l }));
  return o === "descending" ? i.sort((a, l) => l.count - a.count) : o === "ascending" && i.sort((a, l) => a.count - l.count), i.flatMap(
    ({ label: a, group: l }) => Array.from(
      _.rollup(
        l,
        (h) => h.length,
        (h) => h[e] || "(blank)"
      ),
      ([h, c]) => ({ label: a, key: h, count: c })
    )
  );
}
function He(s = [], t = {}) {
  const e = t.axis ?? {}, o = N(Ce, e.y), n = N(Oe, e.x), i = N(Ee, e.color), a = _.rollup(
    s,
    (c) => _.sum(c, n.accessor),
    o.accessor,
    i.accessor
  );
  o.domain = Z(o.domain, a.keys()), o.tickValues = Dt(o), i.domain = Z(i.domain, s.map(i.accessor));
  const l = o.domain.map((c) => {
    const p = a.get(c);
    let y = 0;
    const g = [];
    for (const v of i.domain) {
      const w = (p == null ? void 0 : p.get(v)) ?? 0;
      w > 0 && g.push({ key: v, count: w, start: y, end: y += w });
    }
    return { label: c, count: y, segments: g };
  });
  n.domain ?? (n.domain = zt(n.type, [0, _.max(l, (c) => c.count) || 1], n.ticks)), i.range ?? (i.range = tt(i.domain.length));
  const h = t.total ?? _.sum(l, (c) => c.count);
  return { axes: { category: o, value: n, color: i }, bars: l, total: h };
}
const Re = 12, Ut = 6, Yt = 0.85, Pe = "rgba(0,0,0,0.55)", Be = {
  data: [],
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28,
  onHighlightChange: null
};
class ts {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Be, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = _.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.draw();
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
    const { width: t, rowHeight: e } = this.options, o = this.svg.node(), n = mt(this.options.fontSize), { axes: i, bars: a, total: l } = He(this.options.data, this.options), { category: h, value: c, color: p } = i, y = h.domain, g = h.format ?? String, v = p.format ?? String, w = (u) => ue(u.count, l, this.options.barLabel), m = wt(h), b = rt(y.map(g), n, o), $ = {
      top: m ? vt(n) : n,
      right: rt(a.map(w), n * Yt, o, 600) + Ut + 8,
      bottom: n + 16 + at(n, c.title),
      left: (m ? 0 : at(n, h.title)) + b + Re
    }, z = t - $.left - $.right, M = y.length * e, H = $.top + M + $.bottom, R = _.scaleBand().domain(y).range(h.range || [0, M]).padding(0.3), B = dt(c.type).domain(c.domain).range(c.range || [0, z]), F = _.scaleOrdinal(p.domain, p.range), I = (u) => this.highlight.color(F(u.key), u, { color: u.key }), q = kt(B, c), O = c.format ?? B.tickFormat(c.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const j = a.map((u) => {
      const f = u.segments.map((A) => `${v(A.key)} ${A.count}`).join(", ");
      return `${g(u.label)}: ${u.count} (${f})`;
    }).join("; "), x = this.svg.attr("viewBox", `0 0 ${t} ${H}`).attr(
      "aria-label",
      `Stacked bar chart of ${it(c, "count")} by ${it(h, "category")}, split by ${it(p, "group")}. ${j}`
    );
    x.selectAll("*").remove();
    const E = x.append("g").attr("transform", `translate(${$.left},${$.top})`), V = E.append("g").call(
      _.axisLeft(R).tickValues(h.tickValues ?? y).tickFormat(g).tickSizeOuter(0)
    ), d = E.append("g").attr("transform", `translate(0,${M})`).call(_.axisBottom(B).tickValues(q).tickFormat(O).tickSizeOuter(0));
    for (const u of [V, d])
      u.attr("font-family", null).attr("font-size", n), u.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), u.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    E.insert("g", ":first-child").selectAll("line").data(q).join("line").attr("y2", M).attr("x1", (u) => B(u)).attr("x2", (u) => B(u)).attr("stroke", "rgba(0,0,0,0.08)");
    const L = E.append("g").selectAll("g").data(a).join("g");
    L.selectAll("rect").data((u) => u.segments.map((f) => ({ ...f, label: u.label, barCount: u.count }))).join("rect").attr("x", (u) => B(u.start)).attr("y", (u) => R(u.label)).attr("width", (u) => Math.max(0, B(u.end) - B(u.start))).attr("height", R.bandwidth()).attr("fill", I).attr("stroke", "#fff").attr("stroke-width", 1).append("title").text(
      (u) => `${g(u.label)}, ${v(u.key)}: ${u.count} of ${u.barCount} (${l} total)`
    ), this.options.barLabel !== "none" && L.append("text").attr("x", (u) => B(u.count) + Ut).attr("y", (u) => R(u.label) + R.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", n * Yt).attr("font-weight", 600).attr("fill", Pe).text(w);
    const k = (u) => x.append("text").attr("text-anchor", "middle").attr("font-size", n).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(u || "");
    k(c.title).attr("x", $.left + z / 2).attr("y", H - n), m ? Tt(E, h.title, { fontSize: n, color: "rgba(0,0,0,0.6)" }) : k(h.title).attr(
      "transform",
      `translate(${n + 2},${$.top + M / 2}) rotate(-90)`
    ), ht(this.legend, F, { ...p, fontSize: n, highlight: this.highlight });
  }
}
const qt = (s) => typeof s == "number" ? _.format(".2f")(s) : String(s), fe = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: qt
}, Ie = { ...fe, field: "y" }, Ve = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: qt
}, De = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: qt
}, Ne = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Fe(s = [{}], t = []) {
  const e = s.map((n, i) => ({
    ...Ne,
    ...n,
    data: i === 0 ? t : n.data ?? []
  }));
  if (new Set(e.map((n) => n.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function qe(s = [], t = {}) {
  const e = t.axis ?? {}, o = N(fe, e.x), n = N(Ie, e.y), i = N(Ve, e.color), a = N(De, e.radius), l = Fe(t.layers, s), h = l.flatMap((c) => c.data);
  for (const c of [o, n]) c.domain ?? (c.domain = zt(c.type, ft(h.map(c.accessor))));
  if (i.accessor) {
    const c = l.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = ft(c)), i.range ?? (i.range = _.interpolateViridis)) : (i.domain = Z(i.domain, c), i.range ?? (i.range = tt(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = ft(h.map(a.accessor)))), { axes: { x: o, y: n, color: i, radius: a }, layers: l };
}
const je = {
  data: [],
  axis: {},
  layers: [{}],
  fontSize: "medium",
  width: null,
  height: 480,
  margin: {},
  key: (s, t) => t,
  hoverRadius: 24,
  rangePadding: 10,
  border: !1,
  duration: 500,
  tooltip: null,
  onZoomChange: null,
  onHighlightChange: null
}, Ge = 0.92;
function Et(s, t, e) {
  return dt(s.type).domain(t).range(s.range ?? e);
}
function Xe(s) {
  if (!s.accessor)
    return () => Array.isArray(s.range) ? s.range[0] : tt(1)[0];
  if (s.type === "sequential") {
    const t = typeof s.range == "function" ? s.range : _.interpolateRgbBasis(s.range);
    return _.scaleSequential(s.domain, t);
  }
  return _.scaleOrdinal(s.domain, s.range);
}
function We(s) {
  return !s.accessor || s.type === "constant" ? () => s.range[0] : dt(s.type).domain(s.domain).range(s.range);
}
class es {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...je }, this.axes = null, this.layers = [], this.highlight = new gt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this._build(), this.update(e), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the records of one layer (the first layer by default) and redraw. The
   * current zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    const o = this.layers.findIndex((i) => i.id === e);
    if (o < 0) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    if (o === 0) return this.update({ data: t });
    const n = this.options.layers.map(
      (i, a) => a === o ? { ...i, data: t } : i
    );
    return this.update({ layers: n });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = mt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`);
    const { axes: e, layers: o } = qe(this.options.data, this.options);
    this.axes = e, this.layers = o, this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (n) => n.id).join("g").attr("class", (n) => `scatter-plot__layer scatter-plot__layer--${n.id}`), this._hideTooltip(), this._render(!1);
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
    const { x: o, y: n } = this.scales, [i, a] = o.domain(), [l, h] = n.domain(), c = o.invert(0) - o.invert(t), p = n.invert(0) - n.invert(e);
    this._setZoomDomain({ x: [i + c, a + c], y: [l + p, h + p] }, !1);
  }
  _setZoomDomain(t, e) {
    var n, i;
    const o = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), o || (i = (n = this.options).onZoomChange) == null || i.call(n, !0);
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
    this.root = _.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = _.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = _.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
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
    const t = this.fontSize, { x: e, y: o } = this.axes, n = wt(o), i = { ...this.options.margin };
    if (i.top ?? (i.top = n ? vt(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + at(t, e.title)), i.left == null) {
      const a = Et(o, this._viewDomain.y, [0, 1]), l = kt(a, o).map(o.format), h = rt(l, t * Ge, this.container);
      i.left = (n ? 0 : at(t, o.title)) + h + 8;
    }
    return i;
  }
  _render(t) {
    const { height: e, duration: o } = this.options, n = this.margin = this._resolveMargin(), i = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(i - n.left - n.right, 10), l = Math.max(e - n.top - n.bottom, 10);
    this.width = i, this.innerSize = [a, l], this.svg.attr("width", i).attr("height", e), this.plot.attr("transform", `translate(${n.left},${n.top})`), this.clipRect.attr("width", a).attr("height", l), this._updateScales(a, l), this.brush.extent([
      [0, 0],
      [a, l]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const h = t ? this.svg.transition().duration(o) : null;
    this._drawAxes(a, l, h), this._drawPoints(h), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: o, y: n, color: i, radius: a } = this.axes, l = this._viewDomain, h = this.options.rangePadding;
    this.scales = {
      x: Et(o, l.x, [h, t - h]),
      y: Et(n, l.y, [e - h, h]),
      color: Xe(i),
      radius: We(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? _.Delaunay.from(
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
    const { color: o } = this.axes;
    return o.accessor ? this.scales.color(o.accessor(t)) : this.scales.color();
  }
  // A point's keys in the highlight's dimensions: its color value (none for a
  // fixed-color layer) and its layer
  _keys(t, e) {
    const { color: o } = this.axes;
    return { color: !e.color && o.accessor ? o.accessor(t) : void 0, layer: e.id };
  }
  _drawAxes(t, e, o) {
    const { x: n, y: i } = this.axes, { margin: a, fontSize: l } = this, h = (c) => o ? c.transition(o) : c;
    h(this.gridX).call(
      pt(_.axisBottom(this.scales.x), n).tickSize(e).tickFormat("")
    ), h(this.gridY).call(
      pt(_.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), h(this.axisX.attr("transform", `translate(0,${e})`)).call(
      pt(_.axisBottom(this.scales.x), n).tickSizeOuter(0)
    ), h(this.axisY).call(pt(_.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(n.title ?? ""), this.titleY.selectAll("*").remove(), wt(i) ? Tt(this.titleY, i.title, { fontSize: l }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + l + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(o) {
      e._drawLayer(_.select(this), o, t);
    });
  }
  _drawLayer(t, e, o) {
    const n = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (g) => this._px(g), l = (g) => this._py(g), h = (g) => this._pr(g), { highlight: c } = this, p = (g) => c.color(this._pcolor(g, e), g, this._keys(g, e)), y = t.selectAll("circle").data(e.data, n);
    y.exit().remove(), y.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", l).attr("r", h).attr(i, p), (o ? y.transition(o) : y).attr("cx", a).attr("cy", l).attr("r", h).attr(i, p), c.active && t.selectAll("circle").filter((g) => c.includes(g, this._keys(g, e))).raise();
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
      const [o, n] = e.domain(), i = 160, a = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", i).attr("height", 30), l = `${this.clipId}-ramp`;
      a.append("linearGradient").attr("id", l).selectAll("stop").data(_.ticks(0, 1, 10)).join("stop").attr("offset", (c) => c).attr("stop-color", (c) => e(o + c * (n - o))), a.append("rect").attr("width", i).attr("height", 8).attr("fill", `url(#${l})`);
      const h = _.scaleLinear([o, n], [0, i]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(pt(_.axisBottom(h), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return ht(this.legend, e, {
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
    return ht(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const o = kt(e, t), n = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(o).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...o.map(e));
    return n.append("svg").attr("width", i * 2 + 2).attr("height", i * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", i + 1).attr("cy", i + 1).attr("r", (a) => e(a)), n.append("span").text((a) => t.format(a)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, o], [n, i]] = t.selection;
    if (Math.abs(n - e) < 4 || Math.abs(i - o) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: a, y: l } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([a.invert(e), a.invert(n)], [l.invert(i), l.invert(o)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, o] = _.pointer(t, this.plot.node()), [n, i] = this.innerSize;
    if (e < 0 || e > n || o < 0 || o > i) return this._hideTooltip();
    const a = this.nodes[this.delaunay.find(e, o)];
    if (!a) return this._hideTooltip();
    const l = this._px(a.d), h = this._py(a.d);
    if (Math.hypot(l - e, h - o) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", l).attr("cy", h).attr("r", this._pr(a.d) + 3), this._showTooltip(a, t);
  }
  _tooltipRows({ d: t, layer: e }) {
    const o = [];
    for (const i of ["x", "y", "color"]) {
      const a = this.axes[i];
      i === "color" && e.color || a.accessor && o.push([it(a, i), a.format(a.accessor(t))]);
    }
    const n = e.tooltip ?? this.options.tooltip;
    return n ? n(t, o, e) : o;
  }
  _showTooltip(t, e) {
    const o = this._tooltipRows(t);
    if (this.tooltip.selectAll("*").remove(), typeof o == "string")
      this.tooltip.html(o);
    else {
      const p = this.tooltip.append("table").selectAll("tr").data(o).join("tr");
      p.append("th").text(([y]) => y), p.append("td").text(([, y]) => y);
    }
    const [n, i] = _.pointer(e, this.container), a = this.tooltip.style("display", null).node(), l = 14, h = n + l + a.offsetWidth > this.container.clientWidth ? n - l - a.offsetWidth : n + l, c = i + l + a.offsetHeight > this.container.clientHeight ? i - l - a.offsetHeight : i + l;
    this.tooltip.style("left", `${Math.max(0, h)}px`).style("top", `${Math.max(0, c)}px`);
  }
  _hideTooltip() {
    this.tooltip.style("display", "none"), this.hoverRing.style("display", "none");
  }
}
const Ue = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ye = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Ke = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ze = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Je(s) {
  const t = [...s].sort(_.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = _.quantile(t, 0.25), o = _.quantile(t, 0.5), n = _.quantile(t, 0.75), i = n - e, a = t.filter((c) => c >= e - 1.5 * i && c <= n + 1.5 * i), l = Math.min(a.length ? a[0] : t[0], e), h = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], n);
  return { q1: e, median: o, q3: n, min: l, max: h, mean: _.mean(t) };
}
function Qe(s) {
  return s.filter((t) => t != null && t !== "").map(Number).filter((t) => Number.isFinite(t));
}
function tn(s = [], t = {}) {
  const e = t.axis ?? {}, o = N(Ue, e.y), n = N(Ye, e.x), i = N(Ke, e.group), a = N(Ze, e.color), l = he(o.context), h = (p, y, g) => {
    const v = Qe(g.map(n.accessor)), w = Je(v), m = g[0];
    return {
      group: p,
      label: y,
      context: l && m ? l(m) ?? null : null,
      count: v.length,
      values: v,
      stats: w,
      outliers: v.filter((b) => b < w.min || b > w.max),
      color: a.accessor && m ? a.accessor(m) ?? null : null
    };
  };
  let c;
  if (i.accessor) {
    const p = _.group(s, i.accessor, o.accessor);
    i.domain = Z(i.domain, p.keys()), c = i.domain.flatMap((y) => {
      const g = p.get(y) ?? /* @__PURE__ */ new Map();
      return Z(o.domain, g.keys()).filter((w) => g.has(w)).map((w) => h(y, w, g.get(w)));
    });
  } else {
    const p = _.group(s, o.accessor);
    c = Z(o.domain, p.keys()).map(
      (y) => h(null, y, p.get(y) ?? [])
    );
  }
  if (o.domain = [...new Set(c.map((p) => p.label))], o.tickValues = Dt(o), n.domain ?? (n.domain = zt(n.type, ft(c.flatMap((p) => p.values)))), a.accessor) {
    const p = c.map((y) => y.color).filter((y) => y != null);
    a.domain = Z(a.domain, p), a.range ?? (a.range = tt(a.domain.length));
  }
  return { axes: { category: o, value: n, group: i, color: a }, boxes: c };
}
const en = 12, nn = {
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
}, Kt = 0.3, sn = 0.35, on = 0.55, an = "rgba(0,0,0,0.87)", Zt = 2, rn = 0.45;
function ln(s) {
  const t = Math.sin((s + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class ns {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...nn, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = _.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const o = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = o.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = o.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img"), this.draw();
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
    var xt;
    const { width: t, rowHeight: e, points: o, showCounts: n, threshold: i, rangePadding: a, border: l } = this.options, h = this.svg.node(), c = mt(this.options.fontSize), { axes: p, boxes: y } = tn(this.options.data, this.options), { category: g, value: v, group: w, color: m } = p, b = g.format ?? String, $ = w.format ?? String, z = v.format ?? _.format(".3~f"), M = (r) => r.context != null ? `${r.context} / ` : "", H = (r) => n ? ` (n=${r.count})` : "", R = (r) => M(r) + b(r.label) + H(r), B = (r) => (r.group != null ? `${$(r.group)} / ` : "") + R(r), F = new Set(g.tickValues ?? g.domain), I = dt(v.type).domain(v.domain), q = kt(I, v), O = v.format ?? I.tickFormat(v.ticks ?? void 0), j = (i == null ? void 0 : i.value) != null && i.value >= Math.min(...v.domain) && i.value <= Math.max(...v.domain), x = [];
    for (const r of y)
      r.group != null && r.group !== ((xt = x.at(-1)) == null ? void 0 : xt.group) && x.push({ group: r.group }), x.push({ group: r.group, box: r });
    const E = e * (x.length + 1), V = _.scaleBand(_.range(x.length), [0, E]).paddingInner(Kt).paddingOuter((1 + Kt) / 2), d = V.bandwidth();
    x.forEach((r, T) => {
      r.y = V(T) + d / 2, r.box && (r.box.y = r.y);
    });
    const L = x.filter((r) => !r.box).map((r) => $(r.group)), k = wt(g), u = Math.max(
      rt(y.map(R), c, h),
      rt(L, c, h, 600)
    ), f = {
      top: Math.max(
        j && i.label ? 2 * c + 8 : c,
        k ? vt(c) : 0
      ),
      right: 16,
      bottom: c + 16 + at(c, v.title),
      left: (k ? 0 : at(c, g.title)) + u + en
    }, A = t - f.left - f.right, C = f.top + E + f.bottom, P = I.range(v.range || [a, A - a]), G = m.accessor ? _.scaleOrdinal(m.domain, m.range) : () => Array.isArray(m.range) ? m.range[0] : tt(1)[0], U = (r) => m.accessor ? G(r.color) : G(), Y = (r) => this.highlight.color(U(r), r, { color: r.color }), K = (r) => this.highlight.color(m.accessor ? an : U(r), r, { color: r.color }), X = m.accessor ? on : sn;
    this.root.style("max-width", `${t}px`);
    const lt = y.filter((r) => r.count).map((r) => `${B(r)}: median ${z(r.stats.median)}`).join("; "), S = this.svg.attr("viewBox", `0 0 ${t} ${C}`).attr(
      "aria-label",
      `Box plot of ${it(v, "value")} by ${it(g, "row")}. ${lt}`
    );
    S.selectAll("*").remove();
    const W = S.append("g").attr("transform", `translate(${f.left},${f.top})`);
    W.append("g").selectAll("line").data(q).join("line").attr("y2", E).attr("x1", (r) => P(r)).attr("x2", (r) => P(r)).attr("stroke", "rgba(0,0,0,0.08)");
    const et = W.append("g").attr("transform", `translate(0,${E})`).call(_.axisBottom(P).tickValues(q).tickFormat(O).tickSizeOuter(0));
    et.attr("font-family", null).attr("font-size", c), et.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), et.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), et.select(".domain").remove(), W.append("path").attr("d", l ? `M0,0H${A}V${E}H0Z` : `M0,0V${E}H${A}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const nt = W.append("g").attr("font-size", c).selectAll("g").data(x.filter((r) => !r.box || F.has(r.box.label))).join("g").attr("transform", (r) => `translate(0,${r.y})`);
    if (nt.append("line").attr("x1", -6).attr("x2", (r) => r.box ? 0 : A).attr("stroke", "rgba(0,0,0,0.5)"), nt.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: r, box: T }) {
      const D = _.select(this);
      return T ? (T.context != null && D.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(M(T)), D.append("tspan").text(b(T.label)), n && D.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(H(T)), D) : D.attr("font-weight", 600).text($(r));
    }), j) {
      const r = P(i.value);
      W.append("line").attr("x1", r).attr("x2", r).attr("y1", 0).attr("y2", E).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), i.label && W.append("text").attr("x", r).attr("y", -6).attr("text-anchor", "middle").attr("font-size", c).attr("fill", "rgba(0,0,0,0.6)").text(i.label);
    }
    const ut = y.filter((r) => r.count), J = W.append("g").selectAll("g").data(ut).join("g").attr("transform", (r) => `translate(0,${r.y - d / 2})`).attr("stroke", Y).attr("fill", Y);
    this.drawPoints(o ? ut : [], {
      width: t,
      height: C,
      x: (r) => f.left + P(r),
      y: (r, T) => f.top + r.y + ln(T) * d / 2,
      color: Y
    }), J.append("line").attr("x1", (r) => P(r.stats.min)).attr("x2", (r) => P(r.stats.max)).attr("y1", d / 2).attr("y2", d / 2), J.selectAll(".cap").data((r) => [r.stats.min, r.stats.max]).join("line").attr("class", "cap").attr("x1", P).attr("x2", P).attr("y1", d * 0.25).attr("y2", d * 0.75), J.append("rect").attr("x", (r) => P(r.stats.q1)).attr("width", (r) => Math.max(1, P(r.stats.q3) - P(r.stats.q1))).attr("height", d).attr("fill-opacity", X).append("title").text((r) => {
      const T = r.stats;
      return `${B(r)}: n=${r.count}, median ${z(T.median)}, mean ${z(T.mean)}, q1 ${z(T.q1)}, q3 ${z(T.q3)}, whiskers ${z(T.min)} to ${z(T.max)}`;
    }), J.append("line").attr("x1", (r) => P(r.stats.median)).attr("x2", (r) => P(r.stats.median)).attr("y1", 0).attr("y2", d).attr("stroke", K).attr("stroke-width", 2), J.append("circle").attr("cx", (r) => P(r.stats.mean)).attr("cy", d / 2).attr("r", 3).attr("fill", K), o || J.selectAll(".outlier").data((r) => r.outliers).join("circle").attr("class", "outlier").attr("cx", P).attr("cy", d / 2).attr("r", 2.5).attr("fill", "#fff");
    const yt = (r) => S.append("text").attr("text-anchor", "middle").attr("font-size", c).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(r || "");
    yt(v.title).attr("x", f.left + A / 2).attr("y", C - c), k ? Tt(W, g.title, { fontSize: c, color: "rgba(0,0,0,0.6)" }) : yt(g.title).attr(
      "transform",
      `translate(${c + 2},${f.top + E / 2}) rotate(-90)`
    ), ht(this.legend, G, {
      ...m,
      title: m.accessor ? m.title : null,
      fontSize: c,
      highlight: this.highlight
    });
  }
  /**
   * Draw a dot per value of each box on the canvas, which is sized to the SVG's
   * coordinate space (times the device pixel ratio, so the dots stay sharp) and
   * hidden when there is nothing to draw. `x(value)` and `y(box, index)` give a
   * dot's position in that space, and `color(box)` its fill.
   */
  drawPoints(t, { width: e, height: o, x: n, y: i, color: a }) {
    var c, p;
    this.canvas.style("display", t.length ? null : "none");
    const l = (p = (c = this.canvas.node()).getContext) == null ? void 0 : p.call(c, "2d");
    if (!l) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(o * h)), l.setTransform(h, 0, 0, h, 0, 0), l.clearRect(0, 0, e, o), l.globalAlpha = rn;
    for (const y of t)
      l.fillStyle = a(y), l.beginPath(), y.values.forEach((g, v) => {
        const w = n(g), m = i(y, v);
        l.moveTo(w + Zt, m), l.arc(w, m, Zt, 0, 2 * Math.PI);
      }), l.fill();
  }
}
const cn = { field: null, title: null, format: null }, hn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, dn = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function ot(s) {
  return s != null && s !== "" && !(typeof s == "number" && Number.isNaN(s));
}
function un(s = [], t = {}) {
  var y;
  const e = t.axis ?? {}, o = (t.levels ?? []).map((g) => N(cn, g)), n = N(hn, e.color), i = N(dn, e.radius), a = n.accessor ?? i.accessor, l = { key: "", label: "", level: -1, record: null, children: [] }, h = /* @__PURE__ */ new Map([[l.key, l]]);
  for (const g of s) {
    const v = [];
    for (const $ of o) {
      const z = (y = $.accessor) == null ? void 0 : y.call($, g);
      if (!ot(z)) break;
      v.push(z);
    }
    if (!v.length) continue;
    let w = l;
    v.forEach(($, z) => {
      const M = JSON.stringify(v.slice(0, z + 1));
      let H = h.get(M);
      H || (H = { key: M, label: $, level: z, record: null, children: [] }, h.set(M, H), w.children.push(H)), w = H;
    });
    const m = w, b = a && !ot(a(m.record ?? {})) && ot(a(g));
    (!m.record || b) && (m.record = g);
  }
  const c = [...h.values()].filter((g) => g !== l);
  for (const g of c)
    g.value = g.record && a ? a(g.record) : null, g.empty = !g.record || a != null && !ot(g.value), g.colorValue = !g.empty && n.accessor ? n.accessor(g.record) : null, g.radiusValue = !g.empty && i.accessor ? i.accessor(g.record) : null;
  const p = c.filter((g) => !g.empty);
  if (n.accessor) {
    const g = p.map((v) => v.colorValue).filter(ot);
    n.type === "sequential" ? (n.domain ?? (n.domain = ft(g)), n.range ?? (n.range = _.interpolateViridis)) : (n.domain = Z(n.domain, g), n.range ?? (n.range = tt(n.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = ft(p.map((g) => g.radiusValue).filter(ot)))), { axes: { color: n, radius: i }, levels: o, root: l, nodes: c };
}
const Jt = 12, Qt = 2, pn = 1.5, fn = 2.9, gn = 7, Ht = 1.1, te = 4, bt = 2, mn = 3.3, yn = 0.92, xn = (s) => typeof s == "number" ? _.format(".2f")(s) : String(s), _n = { color: "#b4b2aa", radius: 6, label: null }, bn = {
  data: [],
  levels: [],
  axis: {},
  empty: {},
  columnWidth: 165,
  valueLabel: !1,
  hover: !0,
  fontSize: "medium",
  width: null,
  height: 300,
  onHighlightChange: null
};
function kn(s, t, e, o) {
  const n = String(s ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const l of n) {
    const h = a ? `${a} ${l}` : l;
    a && Ft(h, e, o) > t ? (i.push(a), a = l) : a = h;
  }
  return a && i.push(a), i;
}
function wn(s) {
  const { l: t } = _.lab(s);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class ss {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...bn, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.root = _.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.draw(), this._observeResize();
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
   * Emphasise the nodes that pass `predicate`, drawing the rest grey. Combines
   * with the legend's selection. Pass null to drop the predicate.
   * @param {((node: object) => boolean) | null} predicate
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
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), this.root.selectAll("*").remove(), this.root.classed("tree-chart", !1);
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    var xt;
    const { columnWidth: t, hover: e, valueLabel: o } = this.options, n = { ..._n, ...this.options.empty }, i = mt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const l = this.svg.node(), { axes: h, levels: c, root: p } = un(this.options.data, this.options);
    this.axes = h;
    const y = de(h.color), g = ye(h.radius), w = (h.color.accessor ? h.color : h.radius).format ?? xn, m = (r) => r.empty ? n.color : h.color.accessor ? y(r.colorValue) : y(), b = (r) => r.empty || h.radius.accessor && h.radius.type !== "constant" && !ot(r.radiusValue) ? n.radius : g(r.radiusValue), $ = (r) => this.highlight.color(m(r.data), r.data, { color: r.data.colorValue }), z = _.hierarchy(p), M = z.descendants().filter((r) => r.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      y,
      i,
      n,
      M.some((r) => r.data.empty)
    ), !M.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const H = Ht * i, R = /* @__PURE__ */ new Map();
    for (const r of M) {
      const T = c[r.depth - 1], D = T != null && T.format ? T.format(r.data.label) : r.data.label, st = kn(D, gn * i, i, l), Lt = Math.max(0, ...st.map((Q) => Ft(Q, i, l)));
      R.set(r, { lines: st, width: Lt, height: st.length * H });
    }
    const B = (r) => b(r.data), F = (r) => Math.max(B(r), R.get(r).height / 2), I = (r) => B(r) + te + R.get(r).width + bt, q = z.height || 1, O = M.filter((r) => !r.children && r.depth === q), j = Math.ceil(Math.max(0, ...O.map(I))), x = Math.max(0, ...M.filter((r) => r.depth === 1 && r.children).map(I));
    let E = Jt, V = t;
    for (let r = 0; r < 3; r += 1)
      V = Math.max(1, Math.min(t, (a - E - j) / q)), E = Math.max(Jt, Math.ceil(x - V));
    const d = Math.round(fn * i);
    _.tree().nodeSize([1, V]).separation((r, T) => {
      const D = F(r) + F(T) + Qt;
      return r.parent === T.parent ? D : D * pn;
    })(z);
    let L = 1 / 0, k = -1 / 0, u = 0;
    for (const r of M)
      L = Math.min(L, r.x), k = Math.max(k, r.x), u = Math.max(u, F(r));
    const f = k - L, A = u + Qt, C = d + f + A * 2, P = Math.max(this.options.height, Math.ceil(C)), G = P - d, U = f > 0 ? (G - A * 2) / f : 1, Y = d + (G - f * U) / 2, K = (r) => (r.x - L) * U, X = (r) => r.depth === 0 ? V - mn * i : r.y, lt = this.svg.attr("width", a).attr("height", P).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${c.map((r, T) => it(r, `level ${T + 1}`)).join(", then ")}: ${M.length} nodes`
    ), S = lt.append("g").attr("transform", `translate(${E},${Y})`), W = /* @__PURE__ */ new Map();
    for (const r of M)
      W.has(r.depth) || W.set(r.depth, ((xt = c[r.depth - 1]) == null ? void 0 : xt.title) ?? "");
    lt.append("g").selectAll("text").data([...W]).join("text").attr("class", "tree-chart__header").attr("x", ([r]) => E + r * V).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, r]) => r);
    const et = z.children.length > 1, jt = S.append("g").selectAll("path").data(z.links().filter((r) => et || r.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", _.linkHorizontal().x(X).y(K)), nt = S.append("g").selectAll("g").data(M).join("g").attr("class", "tree-chart__node").attr("transform", (r) => `translate(${r.y},${K(r)})`);
    nt.append("circle").attr("class", "tree-chart__circle").attr("r", B).attr("fill", $), nt.append("title").text(
      (r) => ot(r.data.value) ? `${r.data.label}: ${w(r.data.value)}` : r.data.label
    ), o && nt.filter((r) => ot(r.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * yn).attr("fill", (r) => wn($(r))).text((r) => w(r.data.value));
    const ut = (r) => !!r.children, J = (r) => (ut(r) ? -1 : 1) * (B(r) + te), yt = nt.filter((r) => R.get(r).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (r) => r.data.empty);
    if (yt.append("rect").attr("class", "tree-chart__label-bg").attr("x", (r) => {
      const { width: T } = R.get(r);
      return (ut(r) ? J(r) - T : J(r)) - bt;
    }).attr("y", (r) => -R.get(r).height / 2 - bt).attr("width", (r) => R.get(r).width + bt * 2).attr("height", (r) => R.get(r).height + bt * 2), yt.append("text").attr("text-anchor", (r) => ut(r) ? "end" : "start").selectAll("tspan").data((r) => {
      const { lines: T } = R.get(r);
      return T.map((D, st) => ({ line: D, i: st, count: T.length, x: J(r) }));
    }).join("tspan").attr("x", (r) => r.x).attr(
      "dy",
      (r) => r.i === 0 ? `${0.31 - (r.count - 1) * Ht / 2}em` : `${Ht}em`
    ).text((r) => r.line), e) {
      const r = (T) => {
        const D = T && /* @__PURE__ */ new Set([...T.ancestors(), ...T.descendants()]), st = (Q) => !!(D && D.has(Q)), Lt = (Q) => st(Q.source) && st(Q.target);
        nt.classed("tree-chart__node--off-path", (Q) => !!D && !st(Q)), jt.classed("tree-chart__link--on-path", Lt).classed("tree-chart__link--off-path", (Q) => !!D && !Lt(Q));
      };
      nt.on("mouseenter", (T, D) => r(D)).on("mouseleave", () => r(null));
    }
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, o, n) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Le(this.legend, t, a) : ht(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !o.label || !n) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const l = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    l.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", o.color), l.append("span").text(o.label);
  }
}
function ee(s, t) {
  let e;
  if (t === void 0)
    for (const o of s)
      o != null && (e < o || e === void 0 && o >= o) && (e = o);
  else {
    let o = -1;
    for (let n of s)
      (n = t(n, ++o, s)) != null && (e < n || e === void 0 && n >= n) && (e = n);
  }
  return e;
}
function vn(s, t) {
  let e;
  if (t === void 0)
    for (const o of s)
      o != null && (e > o || e === void 0 && o >= o) && (e = o);
  else {
    let o = -1;
    for (let n of s)
      (n = t(n, ++o, s)) != null && (e > n || e === void 0 && n >= n) && (e = n);
  }
  return e;
}
function Rt(s, t) {
  let e = 0;
  if (t === void 0)
    for (let o of s)
      (o = +o) && (e += o);
  else {
    let o = -1;
    for (let n of s)
      (n = +t(n, ++o, s)) && (e += n);
  }
  return e;
}
function Ln(s, t) {
  return s.sourceLinks.length ? s.depth : t - 1;
}
function At(s) {
  return function() {
    return s;
  };
}
function ne(s, t) {
  return Mt(s.source, t.source) || s.index - t.index;
}
function se(s, t) {
  return Mt(s.target, t.target) || s.index - t.index;
}
function Mt(s, t) {
  return s.y0 - t.y0;
}
function Pt(s) {
  return s.value;
}
function An(s) {
  return s.index;
}
function $n(s) {
  return s.nodes;
}
function Sn(s) {
  return s.links;
}
function oe(s, t) {
  const e = s.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function ie({ nodes: s }) {
  for (const t of s) {
    let e = t.y0, o = e;
    for (const n of t.sourceLinks)
      n.y0 = e + n.width / 2, e += n.width;
    for (const n of t.targetLinks)
      n.y1 = o + n.width / 2, o += n.width;
  }
}
function Mn() {
  let s = 0, t = 0, e = 1, o = 1, n = 24, i = 8, a, l = An, h = Ln, c, p, y = $n, g = Sn, v = 6;
  function w() {
    const d = { nodes: y.apply(null, arguments), links: g.apply(null, arguments) };
    return m(d), b(d), $(d), z(d), R(d), ie(d), d;
  }
  w.update = function(d) {
    return ie(d), d;
  }, w.nodeId = function(d) {
    return arguments.length ? (l = typeof d == "function" ? d : At(d), w) : l;
  }, w.nodeAlign = function(d) {
    return arguments.length ? (h = typeof d == "function" ? d : At(d), w) : h;
  }, w.nodeSort = function(d) {
    return arguments.length ? (c = d, w) : c;
  }, w.nodeWidth = function(d) {
    return arguments.length ? (n = +d, w) : n;
  }, w.nodePadding = function(d) {
    return arguments.length ? (i = a = +d, w) : i;
  }, w.nodes = function(d) {
    return arguments.length ? (y = typeof d == "function" ? d : At(d), w) : y;
  }, w.links = function(d) {
    return arguments.length ? (g = typeof d == "function" ? d : At(d), w) : g;
  }, w.linkSort = function(d) {
    return arguments.length ? (p = d, w) : p;
  }, w.size = function(d) {
    return arguments.length ? (s = t = 0, e = +d[0], o = +d[1], w) : [e - s, o - t];
  }, w.extent = function(d) {
    return arguments.length ? (s = +d[0][0], e = +d[1][0], t = +d[0][1], o = +d[1][1], w) : [[s, t], [e, o]];
  }, w.iterations = function(d) {
    return arguments.length ? (v = +d, w) : v;
  };
  function m({ nodes: d, links: L }) {
    for (const [u, f] of d.entries())
      f.index = u, f.sourceLinks = [], f.targetLinks = [];
    const k = new Map(d.map((u, f) => [l(u, f, d), u]));
    for (const [u, f] of L.entries()) {
      f.index = u;
      let { source: A, target: C } = f;
      typeof A != "object" && (A = f.source = oe(k, A)), typeof C != "object" && (C = f.target = oe(k, C)), A.sourceLinks.push(f), C.targetLinks.push(f);
    }
    if (p != null)
      for (const { sourceLinks: u, targetLinks: f } of d)
        u.sort(p), f.sort(p);
  }
  function b({ nodes: d }) {
    for (const L of d)
      L.value = L.fixedValue === void 0 ? Math.max(Rt(L.sourceLinks, Pt), Rt(L.targetLinks, Pt)) : L.fixedValue;
  }
  function $({ nodes: d }) {
    const L = d.length;
    let k = new Set(d), u = /* @__PURE__ */ new Set(), f = 0;
    for (; k.size; ) {
      for (const A of k) {
        A.depth = f;
        for (const { target: C } of A.sourceLinks)
          u.add(C);
      }
      if (++f > L) throw new Error("circular link");
      k = u, u = /* @__PURE__ */ new Set();
    }
  }
  function z({ nodes: d }) {
    const L = d.length;
    let k = new Set(d), u = /* @__PURE__ */ new Set(), f = 0;
    for (; k.size; ) {
      for (const A of k) {
        A.height = f;
        for (const { source: C } of A.targetLinks)
          u.add(C);
      }
      if (++f > L) throw new Error("circular link");
      k = u, u = /* @__PURE__ */ new Set();
    }
  }
  function M({ nodes: d }) {
    const L = ee(d, (f) => f.depth) + 1, k = (e - s - n) / (L - 1), u = new Array(L);
    for (const f of d) {
      const A = Math.max(0, Math.min(L - 1, Math.floor(h.call(null, f, L))));
      f.layer = A, f.x0 = s + A * k, f.x1 = f.x0 + n, u[A] ? u[A].push(f) : u[A] = [f];
    }
    if (c) for (const f of u)
      f.sort(c);
    return u;
  }
  function H(d) {
    const L = vn(d, (k) => (o - t - (k.length - 1) * a) / Rt(k, Pt));
    for (const k of d) {
      let u = t;
      for (const f of k) {
        f.y0 = u, f.y1 = u + f.value * L, u = f.y1 + a;
        for (const A of f.sourceLinks)
          A.width = A.value * L;
      }
      u = (o - u + a) / (k.length + 1);
      for (let f = 0; f < k.length; ++f) {
        const A = k[f];
        A.y0 += u * (f + 1), A.y1 += u * (f + 1);
      }
      x(k);
    }
  }
  function R(d) {
    const L = M(d);
    a = Math.min(i, (o - t) / (ee(L, (k) => k.length) - 1)), H(L);
    for (let k = 0; k < v; ++k) {
      const u = Math.pow(0.99, k), f = Math.max(1 - u, (k + 1) / v);
      F(L, u, f), B(L, u, f);
    }
  }
  function B(d, L, k) {
    for (let u = 1, f = d.length; u < f; ++u) {
      const A = d[u];
      for (const C of A) {
        let P = 0, G = 0;
        for (const { source: Y, value: K } of C.targetLinks) {
          let X = K * (C.layer - Y.layer);
          P += E(Y, C) * X, G += X;
        }
        if (!(G > 0)) continue;
        let U = (P / G - C.y0) * L;
        C.y0 += U, C.y1 += U, j(C);
      }
      c === void 0 && A.sort(Mt), I(A, k);
    }
  }
  function F(d, L, k) {
    for (let u = d.length, f = u - 2; f >= 0; --f) {
      const A = d[f];
      for (const C of A) {
        let P = 0, G = 0;
        for (const { target: Y, value: K } of C.sourceLinks) {
          let X = K * (Y.layer - C.layer);
          P += V(C, Y) * X, G += X;
        }
        if (!(G > 0)) continue;
        let U = (P / G - C.y0) * L;
        C.y0 += U, C.y1 += U, j(C);
      }
      c === void 0 && A.sort(Mt), I(A, k);
    }
  }
  function I(d, L) {
    const k = d.length >> 1, u = d[k];
    O(d, u.y0 - a, k - 1, L), q(d, u.y1 + a, k + 1, L), O(d, o, d.length - 1, L), q(d, t, 0, L);
  }
  function q(d, L, k, u) {
    for (; k < d.length; ++k) {
      const f = d[k], A = (L - f.y0) * u;
      A > 1e-6 && (f.y0 += A, f.y1 += A), L = f.y1 + a;
    }
  }
  function O(d, L, k, u) {
    for (; k >= 0; --k) {
      const f = d[k], A = (f.y1 - L) * u;
      A > 1e-6 && (f.y0 -= A, f.y1 -= A), L = f.y0 - a;
    }
  }
  function j({ sourceLinks: d, targetLinks: L }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: k } } of L)
        k.sort(se);
      for (const { target: { targetLinks: k } } of d)
        k.sort(ne);
    }
  }
  function x(d) {
    if (p === void 0)
      for (const { sourceLinks: L, targetLinks: k } of d)
        L.sort(se), k.sort(ne);
  }
  function E(d, L) {
    let k = d.y0 - (d.sourceLinks.length - 1) * a / 2;
    for (const { target: u, width: f } of d.sourceLinks) {
      if (u === L) break;
      k += f + a;
    }
    for (const { source: u, width: f } of L.targetLinks) {
      if (u === d) break;
      k -= f;
    }
    return k;
  }
  function V(d, L) {
    let k = L.y0 - (L.targetLinks.length - 1) * a / 2;
    for (const { source: u, width: f } of L.targetLinks) {
      if (u === d) break;
      k += f + a;
    }
    for (const { target: u, width: f } of d.sourceLinks) {
      if (u === L) break;
      k -= f;
    }
    return k;
  }
  return w;
}
var Bt = Math.PI, It = 2 * Bt, ct = 1e-6, zn = It - ct;
function Vt() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function ge() {
  return new Vt();
}
Vt.prototype = ge.prototype = {
  constructor: Vt,
  moveTo: function(s, t) {
    this._ += "M" + (this._x0 = this._x1 = +s) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(s, t) {
    this._ += "L" + (this._x1 = +s) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(s, t, e, o) {
    this._ += "Q" + +s + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +o);
  },
  bezierCurveTo: function(s, t, e, o, n, i) {
    this._ += "C" + +s + "," + +t + "," + +e + "," + +o + "," + (this._x1 = +n) + "," + (this._y1 = +i);
  },
  arcTo: function(s, t, e, o, n) {
    s = +s, t = +t, e = +e, o = +o, n = +n;
    var i = this._x1, a = this._y1, l = e - s, h = o - t, c = i - s, p = a - t, y = c * c + p * p;
    if (n < 0) throw new Error("negative radius: " + n);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = s) + "," + (this._y1 = t);
    else if (y > ct) if (!(Math.abs(p * l - h * c) > ct) || !n)
      this._ += "L" + (this._x1 = s) + "," + (this._y1 = t);
    else {
      var g = e - i, v = o - a, w = l * l + h * h, m = g * g + v * v, b = Math.sqrt(w), $ = Math.sqrt(y), z = n * Math.tan((Bt - Math.acos((w + y - m) / (2 * b * $))) / 2), M = z / $, H = z / b;
      Math.abs(M - 1) > ct && (this._ += "L" + (s + M * c) + "," + (t + M * p)), this._ += "A" + n + "," + n + ",0,0," + +(p * g > c * v) + "," + (this._x1 = s + H * l) + "," + (this._y1 = t + H * h);
    }
  },
  arc: function(s, t, e, o, n, i) {
    s = +s, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(o), l = e * Math.sin(o), h = s + a, c = t + l, p = 1 ^ i, y = i ? o - n : n - o;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + h + "," + c : (Math.abs(this._x1 - h) > ct || Math.abs(this._y1 - c) > ct) && (this._ += "L" + h + "," + c), e && (y < 0 && (y = y % It + It), y > zn ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (s - a) + "," + (t - l) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = h) + "," + (this._y1 = c) : y > ct && (this._ += "A" + e + "," + e + ",0," + +(y >= Bt) + "," + p + "," + (this._x1 = s + e * Math.cos(n)) + "," + (this._y1 = t + e * Math.sin(n))));
  },
  rect: function(s, t, e, o) {
    this._ += "M" + (this._x0 = this._x1 = +s) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +o + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function ae(s) {
  return function() {
    return s;
  };
}
function Tn(s) {
  return s[0];
}
function Cn(s) {
  return s[1];
}
var On = Array.prototype.slice;
function En(s) {
  return s.source;
}
function Hn(s) {
  return s.target;
}
function Rn(s) {
  var t = En, e = Hn, o = Tn, n = Cn, i = null;
  function a() {
    var l, h = On.call(arguments), c = t.apply(this, h), p = e.apply(this, h);
    if (i || (i = l = ge()), s(i, +o.apply(this, (h[0] = c, h)), +n.apply(this, h), +o.apply(this, (h[0] = p, h)), +n.apply(this, h)), l) return i = null, l + "" || null;
  }
  return a.source = function(l) {
    return arguments.length ? (t = l, a) : t;
  }, a.target = function(l) {
    return arguments.length ? (e = l, a) : e;
  }, a.x = function(l) {
    return arguments.length ? (o = typeof l == "function" ? l : ae(+l), a) : o;
  }, a.y = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : ae(+l), a) : n;
  }, a.context = function(l) {
    return arguments.length ? (i = l ?? null, a) : i;
  }, a;
}
function Pn(s, t, e, o, n) {
  s.moveTo(t, e), s.bezierCurveTo(t = (t + o) / 2, e, t, n, o, n);
}
function Bn() {
  return Rn(Pn);
}
function In(s) {
  return [s.source.x1, s.y0];
}
function Vn(s) {
  return [s.target.x0, s.y1];
}
function Dn() {
  return Bn().source(In).target(Vn);
}
const Nn = "(blank)", Fn = { field: null, title: null, domain: null, format: null, sort: "descending" }, qn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, $t = (s, t) => {
  const e = s == null ? void 0 : s(t);
  return e == null || e === "" ? Nn : String(e);
};
function jn(s, t) {
  const e = [...s.keys()];
  t.sort === "descending" ? e.sort((n, i) => s.get(i) - s.get(n)) : t.sort === "ascending" && e.sort((n, i) => s.get(n) - s.get(i));
  const o = (t.domain ?? []).filter((n) => s.has(n));
  return [...o, ...e.filter((n) => !o.includes(n))];
}
function Gn(s = [], t = {}) {
  var w;
  const e = (t.dimensions ?? []).map((m) => N(Fn, m)), o = N(qn, (w = t.axis) == null ? void 0 : w.color), n = e.findIndex((m) => m.field != null && m.field === o.field), i = Math.max(0, n), a = e.map((m, b) => {
    const $ = _.rollup(
      s,
      (M) => M.length,
      (M) => $t(m.accessor, M)
    ), z = jn($, m).map((M, H) => ({
      id: -1,
      dim: b,
      index: H,
      key: M,
      label: m.format ? m.format(M) : M,
      count: $.get(M)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: b,
      nodes: z,
      byKey: new Map(z.map((M) => [M.key, M]))
    };
  }), l = a.flatMap((m) => m.nodes);
  l.forEach((m, b) => {
    m.id = b;
  });
  const h = (m) => e.map((b) => $t(b.accessor, m)).join("\0"), c = _.rollups(s, (m) => m, h).map(([, m]) => {
    const b = e.map((z) => $t(z.accessor, m[0])), $ = b.map((z, M) => a[M].byKey.get(z));
    return {
      keys: b,
      labels: $.map((z) => z.label),
      nodes: $,
      records: m,
      value: m.length
    };
  }), p = [i, ...e.map((m, b) => b).filter((m) => m !== i)];
  c.sort((m, b) => {
    for (const $ of p) {
      const z = m.nodes[$].index - b.nodes[$].index;
      if (z) return z;
    }
    return 0;
  });
  const y = [];
  for (const m of c)
    for (let b = 1; b < e.length; b++)
      y.push({
        source: m.nodes[b - 1].id,
        target: m.nodes[b].id,
        pair: b - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const g = a[i], v = e[i];
  return v && (o.field ?? (o.field = v.field), o.accessor = (m) => $t(v.accessor, m), o.format ?? (o.format = v.format)), o.domain = Z(
    o.domain,
    g ? g.nodes.map((m) => m.key) : []
  ), o.range ?? (o.range = tt(o.domain.length)), {
    axes: { color: o },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: b, nodes: $ }) => ({
      title: m,
      index: b,
      nodes: $
    })),
    nodes: l,
    paths: c,
    links: y,
    total: s.length
  };
}
const Xn = 2.3, re = 5, le = 6, St = 6, ce = 0.92, Wn = "#333", Un = {
  data: [],
  dimensions: [],
  axis: {},
  nodeWidth: 4,
  nodePadding: 10,
  fillColumns: !0,
  hover: !0,
  tooltip: null,
  unit: "records",
  fontSize: "medium",
  width: null,
  height: 480,
  onHighlightChange: null
};
class os {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...Un, ...e }, this.highlight = new gt(() => this._onHighlightChange()), this.hovered = null, this.root = _.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = this.root.append("div").attr("class", "parallel-sets__tooltip").style("display", "none"), this.draw(), this._observeResize();
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
   * Emphasise the strands that pass `predicate`, drawing the rest grey. Combines
   * with the legend's selection. Pass null to drop the predicate.
   * @param {((link: object) => boolean) | null} predicate
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
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), this.root.selectAll("*").remove(), this.root.classed("parallel-sets", !1);
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    const { nodeWidth: t, nodePadding: e, fillColumns: o, hover: n, unit: i } = this.options, a = mt(this.options.fontSize), l = this.options.width ?? (this.container.clientWidth || 640);
    this.width = l;
    const h = Gn(this.options.data, this.options);
    this.prepared = h;
    const { axes: c, columns: p, colorIndex: y, total: g } = h, v = de(c.color), w = (x) => this.highlight.includes(x, { color: x.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(v, a), !h.nodes.length || p.length < 2) {
      this.svg.attr("width", l).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = Math.round(Xn * a), b = [
      [0, m + re],
      [l, m + this.options.height - re]
    ], $ = Mn().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(b)({
      nodes: h.nodes.map((x) => ({ ...x })),
      links: h.links.map((x) => ({ ...x }))
    });
    o && Yn($.nodes, p.length, b[0][1], b[1][1]);
    const z = Dn(), M = (x) => x.x0 < l / 2, H = (x) => M(x) ? x.x1 + le : x.x0 - le, R = (x) => M(x) ? "start" : "end", B = (x) => x.dim === y ? this.highlight.color(v(x.key), x, { color: x.key }) : !this.highlight.active || x.sourceLinks.some(w) || x.targetLinks.some(w) ? Wn : Nt, F = this.svg.attr("width", l).attr("height", m + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${g} ${i} across ${p.map((x) => x.title).join(", ")}`
    ), I = (x) => $.nodes.find((E) => E.dim === x.index);
    F.append("g").selectAll("text").data(p.filter(I)).join("text").attr("class", "parallel-sets__header").attr("x", (x) => H(I(x))).attr("y", m - a * 0.9).attr("text-anchor", (x) => R(I(x))).attr("font-size", a * ce).text((x) => x.title);
    const q = F.append("g").attr("fill", "none").selectAll("path").data($.links).join("path").attr("class", "parallel-sets__link").attr("d", z).attr("stroke", (x) => this.highlight.color(v(x.colorKey), x, { color: x.colorKey })).attr("stroke-width", (x) => Math.max(x.width, 1)), O = F.append("g").selectAll("g").data($.nodes).join("g").attr("class", "parallel-sets__node");
    O.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (x) => x.x0).attr("y", (x) => x.y0).attr("width", (x) => x.x1 - x.x0).attr("height", (x) => Math.max(x.y1 - x.y0, 1)).attr("fill", B), O.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (x) => x.x0 - St).attr("y", (x) => x.y0 - St / 2).attr("width", (x) => x.x1 - x.x0 + St * 2).attr("height", (x) => Math.max(x.y1 - x.y0, 1) + St), O.append("text").attr("class", "parallel-sets__label").attr("x", H).attr("y", (x) => (x.y0 + x.y1) / 2).attr("dy", "0.35em").attr("text-anchor", R).text((x) => `${x.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * ce).text((x) => x.count), n && this._bindHover(O, q, $);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  /**
   * Node hover: every strand through that node. Link hover: every strand sharing
   * the hovered link's category path up to its target column, i.e. the whole
   * visible band between those two nodes, traced across the chart.
   */
  _bindHover(t, e, o) {
    const n = (a) => {
      const l = this.hovered;
      return l ? l.type === "link" ? l.prefix.every((h, c) => a.keys[c] === h) : a.keys[l.node.dim] === l.node.key : !0;
    }, i = () => {
      const a = this.hovered != null, l = /* @__PURE__ */ new Set();
      if (a)
        for (const h of o.links)
          n(h) && (l.add(h.source.id), l.add(h.target.id));
      e.classed("parallel-sets__link--active", (h) => a && n(h)).classed("parallel-sets__link--muted", (h) => a && !n(h)), t.classed("parallel-sets__node--muted", (h) => a && !l.has(h.id));
    };
    this._applyHover = i, t.on("mouseenter", (a, l) => {
      this._setHovered({ type: "node", node: l }), this._showTooltip(this._nodeTooltip(l), a);
    }).on("mousemove", (a) => this._moveTooltip(a)), e.on("mouseenter", (a, l) => {
      const h = l.keys.slice(0, l.pair + 2);
      this._setHovered({ type: "link", prefix: h });
      const c = o.links.filter((p) => p.pair === l.pair && n(p)).reduce((p, y) => p + y.value, 0);
      this._showTooltip(this._linkTooltip(l, h, c), a);
    }).on("mousemove", (a) => this._moveTooltip(a));
  }
  _setHovered(t) {
    var e;
    this.hovered = t, (e = this._applyHover) == null || e.call(this), t || this.tooltip.style("display", "none");
  }
  _share(t) {
    const e = t / (this.prepared.total || 1);
    return `${(100 * e).toFixed(e < 0.1 ? 1 : 0)}%`;
  }
  _countRow(t) {
    const { unit: e } = this.options;
    return [e.charAt(0).toUpperCase() + e.slice(1), `${t} of ${this.prepared.total} (${this._share(t)})`];
  }
  _nodeTooltip(t) {
    const e = [[this.prepared.columns[t.dim].title, t.label], this._countRow(t.count)], o = { type: "node", node: t };
    return this.options.tooltip ? this.options.tooltip(o, e) : e;
  }
  _linkTooltip(t, e, o) {
    const n = e.map((a, l) => [this.prepared.columns[l].title, t.labels[l]]);
    n.push(this._countRow(o));
    const i = {
      type: "link",
      keys: e,
      labels: t.labels.slice(0, e.length),
      pair: t.pair,
      value: o
    };
    return this.options.tooltip ? this.options.tooltip(i, n) : n;
  }
  _showTooltip(t, e) {
    if (this.tooltip.selectAll("*").remove(), typeof t == "string")
      this.tooltip.html(t);
    else {
      const o = this.tooltip.append("table").selectAll("tr").data(t).join("tr");
      o.append("th").text(([n]) => n), o.append("td").text(([, n]) => n);
    }
    this.tooltip.style("display", null), this._moveTooltip(e);
  }
  // Place beside the cursor, flipping to stay inside the container
  _moveTooltip(t) {
    const [e, o] = _.pointer(t, this.container), n = this.tooltip.node(), i = 14, a = e + i + n.offsetWidth > this.container.clientWidth ? e - i - n.offsetWidth : e + i, l = o + i + n.offsetHeight > this.container.clientHeight ? o - i - n.offsetHeight : o + i;
    this.tooltip.style("left", `${Math.max(0, a)}px`).style("top", `${Math.max(0, l)}px`);
  }
  /** The color axis legend below the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color;
    ht(this.legend, t, { ...o, fontSize: e, highlight: this.highlight });
  }
}
function Yn(s, t, e, o) {
  for (let n = 0; n < t; n++) {
    const i = s.filter((c) => c.dim === n).sort((c, p) => c.y0 - p.y0);
    if (i.length < 2) continue;
    const a = i.reduce((c, p) => c + (p.y1 - p.y0), 0), l = (o - e - a) / (i.length - 1);
    let h = e;
    for (const c of i) {
      const p = c.y1 - c.y0;
      c.y0 = h, c.y1 = h + p, h += p + l;
    }
  }
  for (const n of s) {
    let i = n.y0;
    for (const l of n.sourceLinks)
      l.y0 = i + l.width / 2, i += l.width;
    let a = n.y0;
    for (const l of n.targetLinks)
      l.y1 = a + l.width / 2, a += l.width;
  }
}
export {
  Jn as BarChart,
  ns as BoxPlotChart,
  Gt as FONT_SIZES,
  gt as Highlight,
  Nt as MUTED_COLOR,
  os as ParallelSetsChart,
  es as ScatterPlot,
  ts as StackedBarChart,
  ss as TreeChart,
  ue as barLabel,
  Je as boxStats,
  Kn as categoryColors,
  Zn as countBy,
  Qn as countByStacked,
  tt as defaultColors,
  ht as drawLegend,
  Le as drawSequentialLegend,
  Tt as drawTopTitle,
  ot as hasValue,
  rt as maxTextWidth,
  Ft as measureText,
  ke as prepareBarChart,
  tn as prepareBoxPlotChart,
  Gn as prepareParallelSets,
  qe as prepareScatterPlot,
  He as prepareStackedBarChart,
  un as prepareTreeChart,
  mt as resolveFontSize,
  at as titleLane,
  wt as titleOnTop,
  vt as topTitleLane
};
