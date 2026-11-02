import * as v from "d3";
const Ae = [
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
function at(i) {
  return i <= v.schemeTableau10.length ? v.schemeTableau10 : Ae;
}
function on(i, t) {
  const e = v.rollup(
    i,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, o) => o[1] - s[1]).map(([s]) => s);
  return { domain: n, range: at(n.length) };
}
function ve(i) {
  return i == null ? null : typeof i == "function" ? i : (t) => t[i];
}
function q(i, t = {}) {
  const e = { ...i, ...t };
  return e.accessor = ve(e.field), e;
}
function X(i, t) {
  return i.title ?? (typeof i.field == "string" ? i.field : t);
}
function it(i, t) {
  return [.../* @__PURE__ */ new Set([...i ?? [], ...t])];
}
function Zt(i) {
  var t;
  return ((t = i.tickValues) == null ? void 0 : t.filter((e) => i.domain.includes(e))) ?? null;
}
function yt(i) {
  switch (i) {
    case "log":
      return v.scaleLog();
    case "sqrt":
      return v.scaleSqrt();
    default:
      return v.scaleLinear();
  }
}
function wt(i, t = [0, 1]) {
  const [e, n] = v.extent(i);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function Dt(i, t, e) {
  return yt(i).domain(t).nice(e ?? void 0).domain();
}
function Mt(i, t) {
  return t.tickValues ? t.tickValues : i.ticks ? i.ticks(t.ticks ?? void 0) : i.domain();
}
function vt(i, t) {
  return t.tickValues ? i.tickValues(t.tickValues) : t.ticks != null && i.ticks(t.ticks), t.format && i.tickFormat(t.format), i;
}
function we(i) {
  if (!i.accessor)
    return () => Array.isArray(i.range) ? i.range[0] : at(1)[0];
  if (i.type === "sequential") {
    const t = typeof i.range == "function" ? i.range : v.interpolateRgbBasis(i.range);
    return v.scaleSequential(i.domain, t);
  }
  return v.scaleOrdinal(i.domain, i.range);
}
function Se(i) {
  return !i.accessor || i.type === "constant" ? () => i.range[0] : yt(i.type).domain(i.domain).range(i.range);
}
const $e = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Me = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, ze = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function an(i, t, { sort: e } = {}) {
  const n = v.rollup(
    i,
    (o) => o.length,
    (o) => o[t] || "(blank)"
  ), s = Array.from(n, ([o, a]) => ({ label: o, count: a }));
  return e === "descending" ? s.sort((o, a) => a.count - o.count) : e === "ascending" && s.sort((o, a) => o.count - a.count), s;
}
function It(i, t, e = "both") {
  const n = `${t ? Math.round(i / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(i);
    case "percent":
      return n;
    case "none":
      return "";
    default:
      return `${i} (${n})`;
  }
}
function Te(i = [], t = {}) {
  const e = t.axis ?? {}, n = t.orientation === "horizontal", s = q($e, n ? e.y : e.x), o = q(Me, n ? e.x : e.y), a = q(ze, e.color), r = a.accessor ?? s.accessor, l = v.rollup(
    i,
    (x) => ({ count: v.sum(x, o.accessor), color: r(x[0]) }),
    s.accessor
  );
  s.domain = it(s.domain, l.keys()), s.tickValues = Zt(s);
  const c = s.domain.map((x) => {
    var m, b;
    return {
      label: x,
      count: ((m = l.get(x)) == null ? void 0 : m.count) ?? 0,
      color: ((b = l.get(x)) == null ? void 0 : b.color) ?? x
    };
  });
  o.domain ?? (o.domain = Dt(o.type, [0, v.max(c, (x) => x.count) || 1], o.ticks)), a.domain = it(
    a.domain,
    c.map((x) => x.color)
  ), a.range ?? (a.range = at(a.domain.length));
  const f = t.total ?? v.sum(c, (x) => x.count);
  return { axes: { category: s, value: o, color: a }, bars: c, total: f };
}
const rt = "#cfcfcf";
class kt {
  /** @param {() => void} [onChange] called after every change of state */
  constructor(t) {
    this.predicate = null, this.selection = /* @__PURE__ */ new Map(), this.onChange = t ?? null;
  }
  /** Whether anything is highlighted, and so everything else muted. */
  get active() {
    return this.predicate != null || this.selection.size > 0;
  }
  /**
   * Set the predicate: `(record, context) => boolean`, or null to drop it. The
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
    var n;
    return ((n = this.selection.get(t)) == null ? void 0 : n.has(e)) ?? !1;
  }
  /**
   * A legend click. Without `extend`, the key becomes the dimension's only
   * selection, or clears it when it already was. With `extend` (shift or cmd
   * click), the key is added to or removed from the selection.
   */
  toggle(t, e, { extend: n = !1 } = {}) {
    const s = this.selection.get(t) ?? /* @__PURE__ */ new Set();
    let o;
    n ? (o = new Set(s), o.has(e) ? o.delete(e) : o.add(e)) : o = s.size === 1 && s.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), o.size ? this.selection.set(t, o) : this.selection.delete(t), this._changed();
  }
  /** Drop the predicate and every selection. */
  clear() {
    this.predicate = null, this.selection.clear(), this._changed();
  }
  /**
   * Whether a mark is highlighted. `keys` holds the mark's key in each dimension
   * it belongs to, e.g. `{ color: 'Lung', layer: 'samples' }`; a dimension with a
   * selection that the mark has no key in counts as not selected. `context` is
   * passed to the predicate after the record: by default the layer key, so a
   * chart without layers can pass what its predicate should see instead.
   */
  includes(t, e = {}, n = e.layer) {
    if (this.predicate && !this.predicate(t, n)) return !1;
    for (const [s, o] of this.selection)
      if (!o.has(e[s])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, n, s) {
    return this.includes(e, n, s) ? t : rt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Ce = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function mt(i, t, e) {
  const { title: n, tickValues: s, fontSize: o, highlight: a, dimension: r = "color" } = e, l = e.format ?? ((w) => w), c = e.key ?? ((w) => w), f = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", x = (w) => Ce.has(f(w)) ? f(w) : "square";
  if (i.selectAll("*").remove(), n == null) {
    i.style("display", "none");
    return;
  }
  i.attr("class", "chart-legend").style("display", null).style("font-size", o ? `${o}px` : null), n && i.append("div").attr("class", "chart-legend__title").text(n);
  const m = a != null, b = (w) => m && a.active && !a.isSelected(r, c(w)), k = (w, S) => a.toggle(r, c(S), { extend: w.shiftKey || w.metaKey }), y = i.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", m).classed("chart-legend__item--muted", b);
  m && y.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (w) => a.isSelected(r, c(w))).on("click", k).on("keydown", (w, S) => {
    w.key !== "Enter" && w.key !== " " || (w.preventDefault(), k(w, S));
  }), y.append("i").attr("class", (w) => `chart-legend__swatch chart-legend__swatch--${x(w)}`).style("color", (w) => b(w) ? rt : t(w)), y.append("span").text((w) => l(w));
}
let He = 0;
function Oe(i, t, e) {
  const { title: n, fontSize: s, width: o = 160 } = e;
  if (i.selectAll("*").remove(), n == null) {
    i.style("display", "none");
    return;
  }
  const a = s ?? 12;
  i.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && i.append("div").attr("class", "chart-legend__title").text(n);
  const [r, l] = t.domain(), c = Math.ceil(a * 1.5), f = Math.round(a * 0.67), x = i.append("svg").attr("class", "chart-legend__ramp").attr("width", o + c * 2).attr("height", f + 3 + Math.ceil(a * 1.4)), m = `chart-legend-ramp-${He += 1}`;
  x.append("linearGradient").attr("id", m).selectAll("stop").data(v.ticks(0, 1, 10)).join("stop").attr("offset", (y) => y).attr("stop-color", (y) => t(r + y * (l - r)));
  const b = x.append("g").attr("transform", `translate(${c},0)`);
  b.append("rect").attr("width", o).attr("height", f).attr("fill", `url(#${m})`);
  const k = v.axisBottom(v.scaleLinear([r, l], [0, o]));
  b.append("g").attr("transform", `translate(0,${f})`).call(vt(k, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const ee = { small: 10, medium: 12, large: 14 };
function bt(i = "medium") {
  if (typeof i == "number") return i;
  if (!(i in ee)) throw new Error(`Unknown chart font size "${i}"`);
  return ee[i];
}
function ct(i, t) {
  return t ? i + 16 : 0;
}
const Ee = 0.5, Re = 0.72, Pe = 5, ke = 8;
function zt(i) {
  return !!i.title && i.titlePosition === "top";
}
function Tt(i) {
  return i * 1.5 + ke;
}
function Vt(i, t, { fontSize: e, color: n }) {
  const s = e * Ee, o = -(e / 2 + ke), a = i.append("g").attr("class", "axis-title axis-title--top"), r = a.append("text").attr("x", s + Pe).attr("y", o).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, c = s / 2, f = o - e * Re, x = a.append("path").attr("d", `M${l},${o}V${f}M${l - c},${f + c}L${l},${f}L${l + c},${f + c}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (r.attr("fill", n), x.attr("stroke", n)), a;
}
let St;
const Ie = 0.55;
function Qt(i, t, e, n = 400) {
  if (St === void 0 && (St = document.createElement("canvas").getContext("2d")), !St) return String(i).length * t * Ie;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return St.font = `${n} ${t}px ${s}`, St.measureText(String(i)).width;
}
function ht(i, t, e, n) {
  let s = 0;
  for (const o of i)
    s = Math.max(s, Qt(o, t, e, n));
  return s;
}
class Lt {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = v.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
  }
  /** Set the text size in px (the chart's font size). */
  fontSize(t) {
    return this.div.style("font-size", `${t}px`), this;
  }
  /**
   * Show `content` for `target` beside the cursor of `event`. The content is
   * rebuilt only when the target changes.
   */
  show(t, e, n = t) {
    if (n !== this.target)
      if (this.target = n, this.div.selectAll("*").remove(), typeof t == "string")
        this.div.html(t);
      else {
        const s = this.div.append("table").selectAll("tr").data(t).join("tr");
        s.append("th").text(([o]) => o), s.append("td").text(([, o]) => o);
      }
    this.div.style("display", null), this.move(e);
  }
  /** Place the tooltip beside the cursor of `event`, flipping to stay inside the root. */
  move(t) {
    const [e, n] = v.pointer(t, this.root), s = this.div.node(), o = 14, a = e + o + s.offsetWidth > this.root.clientWidth ? e - o - s.offsetWidth : e + o, r = n + o + s.offsetHeight > this.root.clientHeight ? n - o - s.offsetHeight : n + o;
    this.div.style("left", `${Math.max(0, a)}px`).style("top", `${Math.max(0, r)}px`);
  }
  hide() {
    this.target = null, this.div.style("display", "none");
  }
  /** Whether the tooltip is showing. */
  get visible() {
    return this.target !== null;
  }
}
const se = 12, Nt = 6, Ft = 0.85, Be = "rgba(0,0,0,0.55)", ne = "rgba(0,0,0,0.6)", De = {
  data: [],
  orientation: "vertical",
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
};
class rn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...De, ...e }, this.highlight = new kt(() => this._onHighlightChange()), this.hovered = null, this.root = v.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Lt(t), this.draw();
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
  // The bar under the cursor: shows its tooltip, and reports a change through onHover
  _setHovered(t, e) {
    var n, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, t));
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, n = this.options.orientation === "horizontal", s = this.svg.node(), o = bt(this.options.fontSize);
    this.tooltip.fontSize(o), this._setHovered(null);
    const { axes: a, bars: r, total: l } = Te(this.options.data, this.options), { category: c, value: f, color: x } = a, m = c.domain, b = c.format ?? String, k = this.options.barLabel !== "none", y = (M) => It(M.count, l, this.options.barLabel);
    this._tooltipRows = (M) => {
      const st = It(M.count, l, "percent"), tt = [
        [X(c, "category"), b(M.label)],
        [X(f, "count"), `${M.count} of ${l} (${st})`]
      ];
      return this.options.tooltip ? this.options.tooltip(M, tt) : tt;
    };
    const w = yt(f.type).domain(f.domain), S = Mt(w, f), z = f.format ?? w.tickFormat(f.ticks ?? void 0), T = c.tickValues ?? m, [C, V] = n ? [f.title, c.title] : [c.title, f.title], R = zt(n ? c : f), j = R ? 0 : ct(o, V), D = ht(m.map(b), o, s), W = n ? 0.3 : 0.35;
    let E, U, _;
    if (n)
      E = {
        top: R ? Tt(o) : o,
        right: ht(r.map(y), o * Ft, s, 600) + Nt + 8,
        bottom: o + 16 + ct(o, C),
        left: j + D + se
      }, U = E.top + m.length * e + E.bottom;
    else if (E = {
      // The label above the tallest bar, or the title above the top tick
      top: Math.max((k ? o * Ft : 0) + 16, R ? Tt(o) : 0),
      right: 16,
      bottom: o + 24 + ct(o, C),
      left: j + ht(S.map(z), o, s) + se
    }, U = this.options.height, _ = (t - E.left - E.right) / m.length < D, _) {
      const st = Math.round(D * Math.sin(Math.PI / 4)), tt = (1 + W) / 2 / (m.length + W);
      E.bottom += st, U += st, E.left = Math.max(E.left, Math.ceil((st - tt * (t - E.right)) / (1 - tt)));
    }
    const B = t - E.left - E.right, G = U - E.top - E.bottom, u = v.scaleBand().domain(m).range(c.range || [0, n ? G : B]).padding(W);
    w.range(f.range || (n ? [0, B] : [G, 0]));
    const A = v.scaleOrdinal(x.domain, x.range), L = (M) => this.highlight.color(A(M.color), M, { color: M.color }), [p, g] = n ? [w, u] : [u, w];
    this.root.style("max-width", `${t}px`);
    const $ = this.svg.attr("viewBox", `0 0 ${t} ${U}`).attr(
      "aria-label",
      `Bar chart of ${X(f, "count")} by ${X(c, "category")}. ` + r.map((M) => `${b(M.label)}: ${M.count}`).join(", ")
    );
    $.selectAll("*").remove();
    const H = $.append("g").attr("transform", `translate(${E.left},${E.top})`), I = H.append("g").call(
      v.axisLeft(g).tickValues(n ? T : S).tickFormat(n ? b : z).tickSizeOuter(0)
    ), Y = H.append("g").attr("transform", `translate(0,${G})`).call(
      v.axisBottom(p).tickValues(n ? S : T).tickFormat(n ? z : b).tickSizeOuter(0)
    );
    for (const M of [I, Y])
      M.attr("font-family", null).attr("font-size", o), M.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), M.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    _ && Y.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const Z = H.insert("g", ":first-child").selectAll("line").data(S).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    n ? Z.attr("y2", G).attr("x1", (M) => p(M)).attr("x2", (M) => p(M)) : Z.attr("x2", B).attr("y1", (M) => g(M)).attr("y2", (M) => g(M));
    const J = H.append("g").selectAll("g").data(r).join("g"), et = J.append("rect").attr("rx", 3).attr("fill", L), N = k ? J.append("text").attr("font-size", o * Ft).attr("font-weight", 600).attr("fill", Be).text(y) : null;
    n ? (et.attr("x", p(0)).attr("y", (M) => g(M.label)).attr("width", (M) => Math.max(0, p(M.count) - p(0))).attr("height", g.bandwidth()), N == null || N.attr("x", (M) => p(M.count) + Nt).attr("y", (M) => g(M.label) + g.bandwidth() / 2).attr("dy", "0.35em")) : (et.attr("x", (M) => p(M.label)).attr("y", (M) => g(M.count)).attr("width", p.bandwidth()).attr("height", (M) => Math.max(0, G - g(M.count))), N == null || N.attr("x", (M) => p(M.label) + p.bandwidth() / 2).attr("y", (M) => g(M.count) - Nt).attr("text-anchor", "middle")), et.on("mouseenter", (M, st) => this._setHovered(st, M)).on("mousemove", (M) => this.tooltip.move(M)).on("mouseleave", () => this._setHovered(null));
    const dt = (M) => $.append("text").attr("text-anchor", "middle").attr("font-size", o).attr("font-weight", 600).attr("fill", ne).text(M || "");
    dt(C).attr("x", E.left + B / 2).attr("y", U - o), R ? Vt(H, V, { fontSize: o, color: ne }) : dt(V).attr(
      "transform",
      `translate(${o + 2},${E.top + G / 2}) rotate(-90)`
    ), mt(this.legend, A, { ...x, fontSize: o, highlight: this.highlight });
  }
}
const Ve = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ne = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Fe = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ln(i, t, e, { sort: n } = {}) {
  const s = v.group(i, (a) => a[t] || "(blank)"), o = Array.from(s, ([a, r]) => ({ label: a, count: r.length, group: r }));
  return n === "descending" ? o.sort((a, r) => r.count - a.count) : n === "ascending" && o.sort((a, r) => a.count - r.count), o.flatMap(
    ({ label: a, group: r }) => Array.from(
      v.rollup(
        r,
        (l) => l.length,
        (l) => l[e] || "(blank)"
      ),
      ([l, c]) => ({ label: a, key: l, count: c })
    )
  );
}
function qe(i = [], t = {}) {
  const e = t.axis ?? {}, n = q(Ve, e.y), s = q(Ne, e.x), o = q(Fe, e.color), a = v.rollup(
    i,
    (c) => v.sum(c, s.accessor),
    n.accessor,
    o.accessor
  );
  n.domain = it(n.domain, a.keys()), n.tickValues = Zt(n), o.domain = it(o.domain, i.map(o.accessor));
  const r = n.domain.map((c) => {
    const f = a.get(c);
    let x = 0;
    const m = [];
    for (const b of o.domain) {
      const k = (f == null ? void 0 : f.get(b)) ?? 0;
      k > 0 && m.push({ key: b, count: k, start: x, end: x += k });
    }
    return { label: c, count: x, segments: m };
  });
  s.domain ?? (s.domain = Dt(s.type, [0, v.max(r, (c) => c.count) || 1], s.ticks)), o.range ?? (o.range = at(o.domain.length));
  const l = t.total ?? v.sum(r, (c) => c.count);
  return { axes: { category: n, value: s, color: o }, bars: r, total: l };
}
const je = 12, oe = 6, ie = 0.85, Ge = "rgba(0,0,0,0.55)", Xe = {
  data: [],
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  rowHeight: 28,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
};
class cn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Xe, ...e }, this.highlight = new kt(() => this._onHighlightChange()), this.hovered = null, this.root = v.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Lt(t), this.draw();
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
  // The segment under the cursor: shows its tooltip, and reports a change through onHover
  _setHovered(t, e) {
    var n, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, t));
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = bt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: o, bars: a, total: r } = qe(this.options.data, this.options), { category: l, value: c, color: f } = o, x = l.domain, m = l.format ?? String, b = f.format ?? String, k = (p) => It(p.count, r, this.options.barLabel);
    this._tooltipRows = (p) => {
      const g = [
        [X(l, "category"), m(p.label)],
        [X(f, "group"), b(p.key)],
        [X(c, "count"), `${p.count} of ${p.barCount}`],
        ["Share of total", It(p.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(p, g) : g;
    };
    const y = zt(l), w = ht(x.map(m), s, n), S = {
      top: y ? Tt(s) : s,
      right: ht(a.map(k), s * ie, n, 600) + oe + 8,
      bottom: s + 16 + ct(s, c.title),
      left: (y ? 0 : ct(s, l.title)) + w + je
    }, z = t - S.left - S.right, T = x.length * e, C = S.top + T + S.bottom, V = v.scaleBand().domain(x).range(l.range || [0, T]).padding(0.3), R = yt(c.type).domain(c.domain).range(c.range || [0, z]), j = v.scaleOrdinal(f.domain, f.range), D = (p) => this.highlight.color(j(p.key), p, { color: p.key }), W = Mt(R, c), E = c.format ?? R.tickFormat(c.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const U = a.map((p) => {
      const g = p.segments.map(($) => `${b($.key)} ${$.count}`).join(", ");
      return `${m(p.label)}: ${p.count} (${g})`;
    }).join("; "), _ = this.svg.attr("viewBox", `0 0 ${t} ${C}`).attr(
      "aria-label",
      `Stacked bar chart of ${X(c, "count")} by ${X(l, "category")}, split by ${X(f, "group")}. ${U}`
    );
    _.selectAll("*").remove();
    const B = _.append("g").attr("transform", `translate(${S.left},${S.top})`), G = B.append("g").call(
      v.axisLeft(V).tickValues(l.tickValues ?? x).tickFormat(m).tickSizeOuter(0)
    ), u = B.append("g").attr("transform", `translate(0,${T})`).call(v.axisBottom(R).tickValues(W).tickFormat(E).tickSizeOuter(0));
    for (const p of [G, u])
      p.attr("font-family", null).attr("font-size", s), p.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), p.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    B.insert("g", ":first-child").selectAll("line").data(W).join("line").attr("y2", T).attr("x1", (p) => R(p)).attr("x2", (p) => R(p)).attr("stroke", "rgba(0,0,0,0.08)");
    const A = B.append("g").selectAll("g").data(a).join("g");
    A.selectAll("rect").data((p) => p.segments.map((g) => ({ ...g, label: p.label, barCount: p.count }))).join("rect").attr("x", (p) => R(p.start)).attr("y", (p) => V(p.label)).attr("width", (p) => Math.max(0, R(p.end) - R(p.start))).attr("height", V.bandwidth()).attr("fill", D).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (p, g) => this._setHovered(g, p)).on("mousemove", (p) => this.tooltip.move(p)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && A.append("text").attr("x", (p) => R(p.count) + oe).attr("y", (p) => V(p.label) + V.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * ie).attr("font-weight", 600).attr("fill", Ge).text(k);
    const L = (p) => _.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(p || "");
    L(c.title).attr("x", S.left + z / 2).attr("y", C - s), y ? Vt(B, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : L(l.title).attr(
      "transform",
      `translate(${s + 2},${S.top + T / 2}) rotate(-90)`
    ), mt(this.legend, j, { ...f, fontSize: s, highlight: this.highlight });
  }
}
const Jt = (i) => typeof i == "number" ? v.format(".2f")(i) : String(i), be = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: Jt
}, We = { ...be, field: "y" }, Ue = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: Jt
}, Ye = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: Jt
}, Ke = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Ze(i = [{}], t = []) {
  const e = i.map((s, o) => ({
    ...Ke,
    ...s,
    data: o === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Qe(i = [], t = {}) {
  const e = t.axis ?? {}, n = q(be, e.x), s = q(We, e.y), o = q(Ue, e.color), a = q(Ye, e.radius), r = Ze(t.layers, i), l = r.flatMap((c) => c.data);
  for (const c of [n, s]) c.domain ?? (c.domain = Dt(c.type, wt(l.map(c.accessor))));
  if (o.accessor) {
    const c = r.filter((f) => !f.color).flatMap((f) => f.data.map(o.accessor));
    o.type === "sequential" ? (o.domain ?? (o.domain = wt(c)), o.range ?? (o.range = v.interpolateViridis)) : (o.domain = it(o.domain, c), o.range ?? (o.range = at(o.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = wt(l.map(a.accessor)))), { axes: { x: n, y: s, color: o, radius: a }, layers: r };
}
const Je = {
  data: [],
  axis: {},
  layers: [{}],
  fontSize: "medium",
  width: null,
  height: 480,
  margin: {},
  key: (i, t) => t,
  hoverRadius: 24,
  rangePadding: 10,
  border: !1,
  duration: 500,
  tooltip: null,
  onZoomChange: null,
  onHover: null,
  onHighlightChange: null
}, ts = 0.92;
function qt(i, t, e) {
  return yt(i.type).domain(t).range(i.range ?? e);
}
function es(i) {
  if (!i.accessor)
    return () => Array.isArray(i.range) ? i.range[0] : at(1)[0];
  if (i.type === "sequential") {
    const t = typeof i.range == "function" ? i.range : v.interpolateRgbBasis(i.range);
    return v.scaleSequential(i.domain, t);
  }
  return v.scaleOrdinal(i.domain, i.range);
}
function ss(i) {
  return !i.accessor || i.type === "constant" ? () => i.range[0] : yt(i.type).domain(i.domain).range(i.range);
}
class hn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...Je }, this.axes = null, this.layers = [], this.highlight = new kt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the records of one layer (the first layer by default) and redraw. The
   * current zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    const n = this.layers.findIndex((o) => o.id === e);
    if (n < 0) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    if (n === 0) return this.update({ data: t });
    const s = this.options.layers.map(
      (o, a) => a === n ? { ...o, data: t } : o
    );
    return this.update({ layers: s });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = bt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = Qe(this.options.data, this.options);
    this.axes = e, this.layers = n, this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (s) => s.id).join("g").attr("class", (s) => `scatter-plot__layer scatter-plot__layer--${s.id}`), this._hideTooltip(), this._render(!1);
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
    const { x: n, y: s } = this.scales, [o, a] = n.domain(), [r, l] = s.domain(), c = n.invert(0) - n.invert(t), f = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [o + c, a + c], y: [r + f, l + f] }, !1);
  }
  _setZoomDomain(t, e) {
    var s, o;
    const n = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), n || (o = (s = this.options).onZoomChange) == null || o.call(s, !0);
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
    this.root = v.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = v.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = v.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new Lt(this.container);
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
    const t = this.fontSize, { x: e, y: n } = this.axes, s = zt(n), o = { ...this.options.margin };
    if (o.top ?? (o.top = s ? Tt(t) : 16), o.right ?? (o.right = 16), o.bottom ?? (o.bottom = t + 8 + ct(t, e.title)), o.left == null) {
      const a = qt(n, this._viewDomain.y, [0, 1]), r = Mt(a, n).map(n.format), l = ht(r, t * ts, this.container);
      o.left = (s ? 0 : ct(t, n.title)) + l + 8;
    }
    return o;
  }
  _render(t) {
    const { height: e, duration: n } = this.options, s = this.margin = this._resolveMargin(), o = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(o - s.left - s.right, 10), r = Math.max(e - s.top - s.bottom, 10);
    this.width = o, this.innerSize = [a, r], this.svg.attr("width", o).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", a).attr("height", r), this._updateScales(a, r), this.brush.extent([
      [0, 0],
      [a, r]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const l = t ? this.svg.transition().duration(n) : null;
    this._drawAxes(a, r, l), this._drawPoints(l), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: n, y: s, color: o, radius: a } = this.axes, r = this._viewDomain, l = this.options.rangePadding;
    this.scales = {
      x: qt(n, r.x, [l, t - l]),
      y: qt(s, r.y, [e - l, l]),
      color: es(o),
      radius: ss(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? v.Delaunay.from(
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
    const { color: n } = this.axes;
    return n.accessor ? this.scales.color(n.accessor(t)) : this.scales.color();
  }
  // A point's keys in the highlight's dimensions: its color value (none for a
  // fixed-color layer) and its layer
  _keys(t, e) {
    const { color: n } = this.axes;
    return { color: !e.color && n.accessor ? n.accessor(t) : void 0, layer: e.id };
  }
  _drawAxes(t, e, n) {
    const { x: s, y: o } = this.axes, { margin: a, fontSize: r } = this, l = (c) => n ? c.transition(n) : c;
    l(this.gridX).call(
      vt(v.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      vt(v.axisLeft(this.scales.y), o).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      vt(v.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(vt(v.axisLeft(this.scales.y), o).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), zt(o) ? Vt(this.titleY, o.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + r + 2).text(o.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(n) {
      e._drawLayer(v.select(this), n, t);
    });
  }
  _drawLayer(t, e, n) {
    const s = e.key ?? this.options.key, o = e.mark === "outline" ? "stroke" : "fill", a = (m) => this._px(m), r = (m) => this._py(m), l = (m) => this._pr(m), { highlight: c } = this, f = (m) => c.color(this._pcolor(m, e), m, this._keys(m, e)), x = t.selectAll("circle").data(e.data, s);
    x.exit().remove(), x.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", r).attr("r", l).attr(o, f), (n ? x.transition(n) : x).attr("cx", a).attr("cy", r).attr("r", l).attr(o, f), c.active && t.selectAll("circle").filter((m) => c.includes(m, this._keys(m, e))).raise();
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
      const [n, s] = e.domain(), o = 160, a = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", o).attr("height", 30), r = `${this.clipId}-ramp`;
      a.append("linearGradient").attr("id", r).selectAll("stop").data(v.ticks(0, 1, 10)).join("stop").attr("offset", (c) => c).attr("stop-color", (c) => e(n + c * (s - n))), a.append("rect").attr("width", o).attr("height", 8).attr("fill", `url(#${r})`);
      const l = v.scaleLinear([n, s], [0, o]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(vt(v.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return mt(this.legend, e, {
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
    return mt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const n = Mt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(n).join("span").attr("class", "scatter-plot__legend-item"), o = Math.max(...n.map(e));
    return s.append("svg").attr("width", o * 2 + 2).attr("height", o * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", o + 1).attr("cy", o + 1).attr("r", (a) => e(a)), s.append("span").text((a) => t.format(a)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, n], [s, o]] = t.selection;
    if (Math.abs(s - e) < 4 || Math.abs(o - n) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: a, y: r } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([a.invert(e), a.invert(s)], [r.invert(o), r.invert(n)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, n] = v.pointer(t, this.plot.node()), [s, o] = this.innerSize;
    if (e < 0 || e > s || n < 0 || n > o) return this._hideTooltip();
    const a = this.nodes[this.delaunay.find(e, n)];
    if (!a) return this._hideTooltip();
    const r = this._px(a.d), l = this._py(a.d);
    if (Math.hypot(r - e, l - n) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", r).attr("cy", l).attr("r", this._pr(a.d) + 3), this.tooltip.show(this._tooltipRows(a), t, a.d), this._setHovered(a);
  }
  _setHovered(t) {
    var e, n, s;
    ((t == null ? void 0 : t.d) ?? null) !== (((e = this.hovered) == null ? void 0 : e.d) ?? null) && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, (t == null ? void 0 : t.d) ?? null, (t == null ? void 0 : t.layer.id) ?? null));
  }
  _tooltipRows({ d: t, layer: e }) {
    const n = [];
    for (const o of ["x", "y", "color"]) {
      const a = this.axes[o];
      o === "color" && e.color || a.accessor && n.push([X(a, o), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const ns = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, os = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, is = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, as = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function rs(i) {
  const t = [...i].sort(v.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = v.quantile(t, 0.25), n = v.quantile(t, 0.5), s = v.quantile(t, 0.75), o = s - e, a = t.filter((c) => c >= e - 1.5 * o && c <= s + 1.5 * o), r = Math.min(a.length ? a[0] : t[0], e), l = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: r, max: l, mean: v.mean(t) };
}
function ls(i, t) {
  const e = [], n = [];
  for (const s of i) {
    const o = t(s);
    if (o == null || o === "") continue;
    const a = Number(o);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function cs(i = [], t = {}) {
  const e = t.axis ?? {}, n = q(ns, e.y), s = q(os, e.x), o = q(is, e.group), a = q(as, e.color), r = ve(n.context), l = (f, x, m) => {
    const { records: b, values: k } = ls(m, s.accessor), y = rs(k), w = m[0];
    return {
      group: f,
      label: x,
      context: r && w ? r(w) ?? null : null,
      count: k.length,
      records: b,
      values: k,
      stats: y,
      outliers: k.map((S, z) => z).filter((S) => k[S] < y.min || k[S] > y.max),
      color: a.accessor && w ? a.accessor(w) ?? null : null
    };
  };
  let c;
  if (o.accessor) {
    const f = v.group(i, o.accessor, n.accessor);
    o.domain = it(o.domain, f.keys()), c = o.domain.flatMap((x) => {
      const m = f.get(x) ?? /* @__PURE__ */ new Map();
      return it(n.domain, m.keys()).filter((k) => m.has(k)).map((k) => l(x, k, m.get(k)));
    });
  } else {
    const f = v.group(i, n.accessor);
    c = it(n.domain, f.keys()).map(
      (x) => l(null, x, f.get(x) ?? [])
    );
  }
  if (n.domain = [...new Set(c.map((f) => f.label))], n.tickValues = Zt(n), s.domain ?? (s.domain = Dt(s.type, wt(c.flatMap((f) => f.values)))), a.accessor) {
    const f = c.map((x) => x.color).filter((x) => x != null);
    a.domain = it(a.domain, f), a.range ?? (a.range = at(a.domain.length));
  }
  return { axes: { category: n, value: s, group: o, color: a }, boxes: c };
}
const hs = 12, ds = {
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
  hoverRadius: 6,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
}, ae = 0.3, us = 0.35, ps = 0.55, fs = "rgba(0,0,0,0.87)", jt = 2, Ot = 2.5, re = 0.45, gs = 0.9;
function ms(i) {
  const t = Math.sin((i + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class dn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...ds, ...e }, this.highlight = new kt(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = v.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const n = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = n.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = n.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Lt(t), this.draw();
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
   * Emphasise the observations that pass `predicate`, drawing the rest grey; a
   * box stays in color while any of its observations passes. Combines with the
   * legend's selection. Pass null to drop the predicate.
   * @param {((record: object, box: object) => boolean) | null} predicate
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
    var te;
    const { width: t, rowHeight: e, points: n, showCounts: s, threshold: o, rangePadding: a, border: r } = this.options, l = this.svg.node(), c = bt(this.options.fontSize);
    this.tooltip.fontSize(c), this._leave();
    const { axes: f, boxes: x } = cs(this.options.data, this.options), { category: m, value: b, group: k, color: y } = f, w = m.format ?? String, S = k.format ?? String, z = b.format ?? v.format(".3~f"), T = (h) => h.context != null ? `${h.context} / ` : "", C = (h) => s ? ` (n=${h.count})` : "", V = (h) => T(h) + w(h.label) + C(h), R = (h) => (h.group != null ? `${S(h.group)} / ` : "") + V(h), j = new Set(m.tickValues ?? m.domain), D = yt(b.type).domain(b.domain), W = Mt(D, b), E = b.format ?? D.tickFormat(b.ticks ?? void 0), U = (o == null ? void 0 : o.value) != null && o.value >= Math.min(...b.domain) && o.value <= Math.max(...b.domain), _ = [];
    for (const h of x)
      h.group != null && h.group !== ((te = _.at(-1)) == null ? void 0 : te.group) && _.push({ group: h.group }), _.push({ group: h.group, box: h });
    const B = e * (_.length + 1), G = v.scaleBand(v.range(_.length), [0, B]).paddingInner(ae).paddingOuter((1 + ae) / 2), u = G.bandwidth();
    _.forEach((h, P) => {
      h.y = G(P) + u / 2, h.box && (h.box.y = h.y);
    });
    const A = _.filter((h) => !h.box).map((h) => S(h.group)), L = zt(m), p = Math.max(
      ht(x.map(V), c, l),
      ht(A, c, l, 600)
    ), g = {
      top: Math.max(
        U && o.label ? 2 * c + 8 : c,
        L ? Tt(c) : 0
      ),
      right: 16,
      bottom: c + 16 + ct(c, b.title),
      left: (L ? 0 : ct(c, m.title)) + p + hs
    }, $ = t - g.left - g.right, H = g.top + B + g.bottom, I = D.range(b.range || [a, $ - a]), Y = y.accessor ? v.scaleOrdinal(y.domain, y.range) : () => Array.isArray(y.range) ? y.range[0] : at(1)[0], { highlight: Z } = this, J = (h, P) => Z.includes(h.records[P], { color: h.color }, h), et = new Map(
      x.map((h) => [h, !Z.active || h.records.some((P, F) => J(h, F))])
    ), N = (h) => y.accessor ? Y(h.color) : Y(), dt = (h) => et.get(h) ? N(h) : rt, M = (h) => et.get(h) ? y.accessor ? fs : N(h) : rt, st = y.accessor ? ps : us, tt = x.filter((h) => h.count), Ct = (h, P, F) => ({
      box: h,
      index: P,
      record: h.records[P],
      value: h.values[P],
      x: I(h.values[P]),
      y: F,
      lit: J(h, P)
    }), ut = tt.flatMap(
      (h) => n ? h.values.map((P, F) => Ct(h, F, h.y + ms(F) * u / 2)) : h.outliers.map((P) => Ct(h, P, h.y))
    ), pt = v.group(ut, (h) => h.box), xt = (h) => h.lit ? N(h.box) : rt;
    this.root.style("max-width", `${t}px`);
    const At = tt.map((h) => `${R(h)}: median ${z(h.stats.median)}`).join("; "), _t = this.svg.attr("viewBox", `0 0 ${t} ${H}`).attr(
      "aria-label",
      `Box plot of ${X(b, "value")} by ${X(m, "row")}. ${At}`
    );
    _t.selectAll("*").remove();
    const nt = _t.append("g").attr("transform", `translate(${g.left},${g.top})`);
    nt.append("g").selectAll("line").data(W).join("line").attr("y2", B).attr("x1", (h) => I(h)).attr("x2", (h) => I(h)).attr("stroke", "rgba(0,0,0,0.08)");
    const ft = nt.append("g").attr("transform", `translate(0,${B})`).call(v.axisBottom(I).tickValues(W).tickFormat(E).tickSizeOuter(0));
    ft.attr("font-family", null).attr("font-size", c), ft.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), ft.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), ft.select(".domain").remove(), nt.append("path").attr("d", r ? `M0,0H${$}V${B}H0Z` : `M0,0V${B}H${$}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const O = nt.append("g").attr("font-size", c).selectAll("g").data(_.filter((h) => !h.box || j.has(h.box.label))).join("g").attr("transform", (h) => `translate(0,${h.y})`);
    if (O.append("line").attr("x1", -6).attr("x2", (h) => h.box ? 0 : $).attr("stroke", "rgba(0,0,0,0.5)"), O.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: h, box: P }) {
      const F = v.select(this);
      return P ? (P.context != null && F.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(T(P)), F.append("tspan").text(w(P.label)), s && F.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(C(P)), F) : F.attr("font-weight", 600).text(S(h));
    }), U) {
      const h = I(o.value);
      nt.append("line").attr("x1", h).attr("x2", h).attr("y1", 0).attr("y2", B).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), o.label && nt.append("text").attr("x", h).attr("y", -6).attr("text-anchor", "middle").attr("font-size", c).attr("fill", "rgba(0,0,0,0.6)").text(o.label);
    }
    const K = nt.append("g").selectAll("g").data(tt).join("g").attr("transform", (h) => `translate(0,${h.y - u / 2})`).attr("stroke", dt).attr("fill", dt);
    this.drawPoints(n ? ut : [], {
      width: t,
      height: H,
      offset: [g.left, g.top],
      color: xt,
      emphasis: Z.active
    }), K.append("line").attr("x1", (h) => I(h.stats.min)).attr("x2", (h) => I(h.stats.max)).attr("y1", u / 2).attr("y2", u / 2), K.selectAll(".cap").data((h) => [h.stats.min, h.stats.max]).join("line").attr("class", "cap").attr("x1", I).attr("x2", I).attr("y1", u * 0.25).attr("y2", u * 0.75), K.append("rect").attr("x", (h) => I(h.stats.q1)).attr("width", (h) => Math.max(1, I(h.stats.q3) - I(h.stats.q1))).attr("height", u).attr("fill-opacity", st), K.append("line").attr("x1", (h) => I(h.stats.median)).attr("x2", (h) => I(h.stats.median)).attr("y1", 0).attr("y2", u).attr("stroke", M).attr("stroke-width", 2), K.append("circle").attr("cx", (h) => I(h.stats.mean)).attr("cy", u / 2).attr("r", 3).attr("fill", M), n || K.selectAll(".outlier").data((h) => pt.get(h) ?? []).join("circle").attr("class", "outlier").attr("cx", (h) => h.x).attr("cy", u / 2).attr("r", Ot).attr("fill", "#fff").attr("stroke", xt), this.hoverRing = nt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (n ? jt : Ot) + 2.5).style("display", "none");
    const ot = (h) => _t.append("text").attr("text-anchor", "middle").attr("font-size", c).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(h || "");
    ot(b.title).attr("x", g.left + $ / 2).attr("y", H - c), L ? Vt(nt, m.title, { fontSize: c, color: "rgba(0,0,0,0.6)" }) : ot(m.title).attr(
      "transform",
      `translate(${c + 2},${g.top + B / 2}) rotate(-90)`
    ), mt(this.legend, Y, {
      ...y,
      title: y.accessor ? y.title : null,
      fontSize: c,
      highlight: this.highlight
    });
    const { tooltip: Q } = this.options, Ht = X(m, "row");
    this.hit = {
      margin: g,
      marks: ut,
      delaunay: ut.length ? v.Delaunay.from(
        ut,
        (h) => h.x,
        (h) => h.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (h, P) => tt.find(
        (F) => Math.abs(P - F.y) <= u / 2 && h >= I(F.stats.min) - Ot && h <= I(F.stats.max) + Ot
      ) ?? null,
      markRows: (h) => {
        const P = [
          [Ht, R(h.box)],
          [X(b, "value"), z(h.value)]
        ];
        return Q ? Q(h.record, P, h.box) : P;
      },
      boxRows: (h) => {
        const P = h.stats, F = [
          [Ht, R(h)],
          ["n", String(h.count)],
          ["Median", z(P.median)],
          ["Mean", z(P.mean)],
          ["Q1", z(P.q1)],
          ["Q3", z(P.q3)],
          ["Whiskers", `${z(P.min)} to ${z(P.max)}`]
        ];
        return Q ? Q(null, F, h) : F;
      }
    };
  }
  /**
   * Draw a dot per mark on the canvas, which is sized to the SVG's coordinate
   * space (times the device pixel ratio, so the dots stay sharp) and hidden
   * when there is nothing to draw. The marks' positions are in plot space, and
   * `offset` is the plot's origin within the canvas. The dots are batched by
   * `color(mark)`, one path per color, with the muted grey first so the
   * highlighted dots sit on top, drawn opaquer while `emphasis` is on.
   */
  drawPoints(t, { width: e, height: n, offset: [s, o], color: a, emphasis: r }) {
    var b, k;
    this.canvas.style("display", t.length ? null : "none");
    const l = (k = (b = this.canvas.node()).getContext) == null ? void 0 : k.call(b, "2d");
    if (!l) return;
    const c = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * c)).attr("height", Math.round(n * c)), l.setTransform(c, 0, 0, c, 0, 0), l.clearRect(0, 0, e, n);
    const f = (y, w, S) => {
      l.globalAlpha = S, l.fillStyle = y, l.beginPath();
      for (const z of w) {
        const T = z.x + s, C = z.y + o;
        l.moveTo(T + jt, C), l.arc(T, C, jt, 0, 2 * Math.PI);
      }
      l.fill();
    }, x = v.group(t, a), m = x.get(rt);
    m && f(rt, m, re);
    for (const [y, w] of x)
      y !== rt && f(y, w, r ? gs : re);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [n, s] = v.pointer(t, this.svg.node()), o = n - e.margin.left, a = s - e.margin.top, r = e.delaunay ? e.marks[e.delaunay.find(o, a)] : null;
    if (r && Math.hypot(r.x - o, r.y - a) <= e.radius) {
      this.hoverRing.style("display", null).attr("cx", r.x).attr("cy", r.y), this.tooltip.show(e.markRows(r), t, r), this._setHovered(r.record, r.box);
      return;
    }
    this.hoverRing.style("display", "none");
    const l = e.boxAt(o, a);
    if (l) {
      this.tooltip.show(e.boxRows(l), t, l), this._setHovered(null, l);
      return;
    }
    this._leave();
  }
  _leave() {
    var t;
    (t = this.hoverRing) == null || t.style("display", "none"), this.tooltip.hide(), this._setHovered(null, null);
  }
  _setHovered(t, e) {
    var n, s;
    t === this.hovered.record && e === this.hovered.box || (this.hovered = { record: t, box: e }, (s = (n = this.options).onHover) == null || s.call(n, t, e));
  }
}
const ys = { field: null, title: null, format: null }, xs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, _s = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function lt(i) {
  return i != null && i !== "" && !(typeof i == "number" && Number.isNaN(i));
}
function vs(i = [], t = {}) {
  var x;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((m) => q(ys, m)), s = q(xs, e.color), o = q(_s, e.radius), a = s.accessor ?? o.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const m of i) {
    const b = [];
    for (const S of n) {
      const z = (x = S.accessor) == null ? void 0 : x.call(S, m);
      if (!lt(z)) break;
      b.push(z);
    }
    if (!b.length) continue;
    let k = r;
    b.forEach((S, z) => {
      const T = JSON.stringify(b.slice(0, z + 1));
      let C = l.get(T);
      C || (C = { key: T, label: S, level: z, record: null, children: [] }, l.set(T, C), k.children.push(C)), k = C;
    });
    const y = k, w = a && !lt(a(y.record ?? {})) && lt(a(m));
    (!y.record || w) && (y.record = m);
  }
  const c = [...l.values()].filter((m) => m !== r);
  for (const m of c)
    m.value = m.record && a ? a(m.record) : null, m.empty = !m.record || a != null && !lt(m.value), m.colorValue = !m.empty && s.accessor ? s.accessor(m.record) : null, m.radiusValue = !m.empty && o.accessor ? o.accessor(m.record) : null;
  const f = c.filter((m) => !m.empty);
  if (s.accessor) {
    const m = f.map((b) => b.colorValue).filter(lt);
    s.type === "sequential" ? (s.domain ?? (s.domain = wt(m)), s.range ?? (s.range = v.interpolateViridis)) : (s.domain = it(s.domain, m), s.range ?? (s.range = at(s.domain.length)));
  }
  return o.accessor && o.type !== "constant" && (o.domain ?? (o.domain = wt(f.map((m) => m.radiusValue).filter(lt)))), { axes: { color: s, radius: o }, levels: n, root: r, nodes: c };
}
const le = 12, ce = 2, ws = 1.5, ks = 2.9, bs = 7, Gt = 1.1, he = 4, $t = 2, Ls = 3.3, As = 0.92, Ss = (i) => typeof i == "number" ? v.format(".2f")(i) : String(i), $s = { color: "#b4b2aa", radius: 6, label: null }, Ms = {
  data: [],
  levels: [],
  axis: {},
  empty: {},
  columnWidth: 165,
  valueLabel: !1,
  hover: !0,
  tooltip: null,
  onHover: null,
  fontSize: "medium",
  width: null,
  height: 300,
  onHighlightChange: null
};
function zs(i, t, e, n) {
  const s = String(i ?? "").split(/\s+/).filter(Boolean), o = [];
  let a = "";
  for (const r of s) {
    const l = a ? `${a} ${r}` : r;
    a && Qt(l, e, n) > t ? (o.push(a), a = r) : a = l;
  }
  return a && o.push(a), o;
}
function Ts(i) {
  const { l: t } = v.lab(i);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class un {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...Ms, ...e }, this.highlight = new kt(() => this._onHighlightChange()), this.hovered = null, this.root = v.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Lt(t), this.draw(), this._observeResize();
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
  // The node under the cursor: shows its tooltip, and reports a change through onHover
  _setHovered(t, e) {
    var n, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, t));
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    var ft;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...$s, ...this.options.empty }, o = bt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const r = this.svg.node();
    this.tooltip.fontSize(o), this._setHovered(null);
    const { axes: l, levels: c, root: f } = vs(this.options.data, this.options);
    this.axes = l;
    const x = we(l.color), m = Se(l.radius), b = l.color.accessor ? l.color : l.radius, k = b.format ?? Ss, y = (d) => {
      const O = c[d.level];
      return O != null && O.format ? O.format(d.label) : d.label;
    };
    this._tooltipRows = (d) => {
      const O = [[X(c[d.level], `Level ${d.level + 1}`), y(d)]];
      return lt(d.value) && O.push([X(b, "value"), k(d.value)]), this.options.tooltip ? this.options.tooltip(d, O) : O;
    };
    const w = (d) => d.empty ? s.color : l.color.accessor ? x(d.colorValue) : x(), S = (d) => d.empty || l.radius.accessor && l.radius.type !== "constant" && !lt(d.radiusValue) ? s.radius : m(d.radiusValue), z = (d) => this.highlight.color(w(d.data), d.data, { color: d.data.colorValue }), T = v.hierarchy(f), C = T.descendants().filter((d) => d.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      x,
      o,
      s,
      C.some((d) => d.data.empty)
    ), !C.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const V = Gt * o, R = /* @__PURE__ */ new Map();
    for (const d of C) {
      const O = c[d.depth - 1], K = O != null && O.format ? O.format(d.data.label) : d.data.label, ot = zs(K, bs * o, o, r), Q = Math.max(0, ...ot.map((Ht) => Qt(Ht, o, r)));
      R.set(d, { lines: ot, width: Q, height: ot.length * V });
    }
    const j = (d) => S(d.data), D = (d) => Math.max(j(d), R.get(d).height / 2), W = (d) => j(d) + he + R.get(d).width + $t, E = T.height || 1, U = C.filter((d) => !d.children && d.depth === E), _ = Math.ceil(Math.max(0, ...U.map(W))), B = Math.max(0, ...C.filter((d) => d.depth === 1 && d.children).map(W));
    let G = le, u = t;
    for (let d = 0; d < 3; d += 1)
      u = Math.max(1, Math.min(t, (a - G - _) / E)), G = Math.max(le, Math.ceil(B - u));
    const A = Math.round(ks * o);
    v.tree().nodeSize([1, u]).separation((d, O) => {
      const K = D(d) + D(O) + ce;
      return d.parent === O.parent ? K : K * ws;
    })(T);
    let L = 1 / 0, p = -1 / 0, g = 0;
    for (const d of C)
      L = Math.min(L, d.x), p = Math.max(p, d.x), g = Math.max(g, D(d));
    const $ = p - L, H = g + ce, I = A + $ + H * 2, Y = Math.max(this.options.height, Math.ceil(I)), Z = Y - A, J = $ > 0 ? (Z - H * 2) / $ : 1, et = A + (Z - $ * J) / 2, N = (d) => (d.x - L) * J, dt = (d) => d.depth === 0 ? u - Ls * o : d.y, M = this.svg.attr("width", a).attr("height", Y).attr("font-size", o).attr(
      "aria-label",
      `Tree of ${c.map((d, O) => X(d, `level ${O + 1}`)).join(", then ")}: ${C.length} nodes`
    ), st = M.append("g").attr("transform", `translate(${G},${et})`), tt = /* @__PURE__ */ new Map();
    for (const d of C)
      tt.has(d.depth) || tt.set(d.depth, ((ft = c[d.depth - 1]) == null ? void 0 : ft.title) ?? "");
    M.append("g").selectAll("text").data([...tt]).join("text").attr("class", "tree-chart__header").attr("x", ([d]) => G + d * u).attr("y", o * 1.2).attr("text-anchor", "middle").text(([, d]) => d);
    const Ct = T.children.length > 1, ut = st.append("g").selectAll("path").data(T.links().filter((d) => Ct || d.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", v.linkHorizontal().x(dt).y(N)), pt = st.append("g").selectAll("g").data(C).join("g").attr("class", "tree-chart__node").attr("transform", (d) => `translate(${d.y},${N(d)})`);
    pt.append("circle").attr("class", "tree-chart__circle").attr("r", j).attr("fill", z), n && pt.filter((d) => lt(d.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", o * As).attr("fill", (d) => Ts(z(d))).text((d) => k(d.data.value));
    const xt = (d) => !!d.children, At = (d) => (xt(d) ? -1 : 1) * (j(d) + he), _t = pt.filter((d) => R.get(d).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (d) => d.data.empty);
    _t.append("rect").attr("class", "tree-chart__label-bg").attr("x", (d) => {
      const { width: O } = R.get(d);
      return (xt(d) ? At(d) - O : At(d)) - $t;
    }).attr("y", (d) => -R.get(d).height / 2 - $t).attr("width", (d) => R.get(d).width + $t * 2).attr("height", (d) => R.get(d).height + $t * 2), _t.append("text").attr("text-anchor", (d) => xt(d) ? "end" : "start").selectAll("tspan").data((d) => {
      const { lines: O } = R.get(d);
      return O.map((K, ot) => ({ line: K, i: ot, count: O.length, x: At(d) }));
    }).join("tspan").attr("x", (d) => d.x).attr(
      "dy",
      (d) => d.i === 0 ? `${0.31 - (d.count - 1) * Gt / 2}em` : `${Gt}em`
    ).text((d) => d.line);
    const nt = (d) => {
      if (!e) return;
      const O = d && /* @__PURE__ */ new Set([...d.ancestors(), ...d.descendants()]), K = (Q) => !!(O && O.has(Q)), ot = (Q) => K(Q.source) && K(Q.target);
      pt.classed("tree-chart__node--off-path", (Q) => !!O && !K(Q)), ut.classed("tree-chart__link--on-path", ot).classed("tree-chart__link--off-path", (Q) => !!O && !ot(Q));
    };
    pt.on("mouseenter", (d, O) => {
      nt(O), this._setHovered(O.data, d);
    }).on("mousemove", (d) => this.tooltip.move(d)).on("mouseleave", () => {
      nt(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const o = this.axes.color, a = { ...o, title: o.accessor ? o.title : null, fontSize: e };
    if (o.type === "sequential" ? Oe(this.legend, t, a) : mt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), r.append("span").text(n.label);
  }
}
function de(i, t) {
  let e;
  if (t === void 0)
    for (const n of i)
      n != null && (e < n || e === void 0 && n >= n) && (e = n);
  else {
    let n = -1;
    for (let s of i)
      (s = t(s, ++n, i)) != null && (e < s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function Cs(i, t) {
  let e;
  if (t === void 0)
    for (const n of i)
      n != null && (e > n || e === void 0 && n >= n) && (e = n);
  else {
    let n = -1;
    for (let s of i)
      (s = t(s, ++n, i)) != null && (e > s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function Xt(i, t) {
  let e = 0;
  if (t === void 0)
    for (let n of i)
      (n = +n) && (e += n);
  else {
    let n = -1;
    for (let s of i)
      (s = +t(s, ++n, i)) && (e += s);
  }
  return e;
}
function Hs(i, t) {
  return i.sourceLinks.length ? i.depth : t - 1;
}
function Et(i) {
  return function() {
    return i;
  };
}
function ue(i, t) {
  return Bt(i.source, t.source) || i.index - t.index;
}
function pe(i, t) {
  return Bt(i.target, t.target) || i.index - t.index;
}
function Bt(i, t) {
  return i.y0 - t.y0;
}
function Wt(i) {
  return i.value;
}
function Os(i) {
  return i.index;
}
function Es(i) {
  return i.nodes;
}
function Rs(i) {
  return i.links;
}
function fe(i, t) {
  const e = i.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function ge({ nodes: i }) {
  for (const t of i) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function Ps() {
  let i = 0, t = 0, e = 1, n = 1, s = 24, o = 8, a, r = Os, l = Hs, c, f, x = Es, m = Rs, b = 6;
  function k() {
    const u = { nodes: x.apply(null, arguments), links: m.apply(null, arguments) };
    return y(u), w(u), S(u), z(u), V(u), ge(u), u;
  }
  k.update = function(u) {
    return ge(u), u;
  }, k.nodeId = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : Et(u), k) : r;
  }, k.nodeAlign = function(u) {
    return arguments.length ? (l = typeof u == "function" ? u : Et(u), k) : l;
  }, k.nodeSort = function(u) {
    return arguments.length ? (c = u, k) : c;
  }, k.nodeWidth = function(u) {
    return arguments.length ? (s = +u, k) : s;
  }, k.nodePadding = function(u) {
    return arguments.length ? (o = a = +u, k) : o;
  }, k.nodes = function(u) {
    return arguments.length ? (x = typeof u == "function" ? u : Et(u), k) : x;
  }, k.links = function(u) {
    return arguments.length ? (m = typeof u == "function" ? u : Et(u), k) : m;
  }, k.linkSort = function(u) {
    return arguments.length ? (f = u, k) : f;
  }, k.size = function(u) {
    return arguments.length ? (i = t = 0, e = +u[0], n = +u[1], k) : [e - i, n - t];
  }, k.extent = function(u) {
    return arguments.length ? (i = +u[0][0], e = +u[1][0], t = +u[0][1], n = +u[1][1], k) : [[i, t], [e, n]];
  }, k.iterations = function(u) {
    return arguments.length ? (b = +u, k) : b;
  };
  function y({ nodes: u, links: A }) {
    for (const [p, g] of u.entries())
      g.index = p, g.sourceLinks = [], g.targetLinks = [];
    const L = new Map(u.map((p, g) => [r(p, g, u), p]));
    for (const [p, g] of A.entries()) {
      g.index = p;
      let { source: $, target: H } = g;
      typeof $ != "object" && ($ = g.source = fe(L, $)), typeof H != "object" && (H = g.target = fe(L, H)), $.sourceLinks.push(g), H.targetLinks.push(g);
    }
    if (f != null)
      for (const { sourceLinks: p, targetLinks: g } of u)
        p.sort(f), g.sort(f);
  }
  function w({ nodes: u }) {
    for (const A of u)
      A.value = A.fixedValue === void 0 ? Math.max(Xt(A.sourceLinks, Wt), Xt(A.targetLinks, Wt)) : A.fixedValue;
  }
  function S({ nodes: u }) {
    const A = u.length;
    let L = new Set(u), p = /* @__PURE__ */ new Set(), g = 0;
    for (; L.size; ) {
      for (const $ of L) {
        $.depth = g;
        for (const { target: H } of $.sourceLinks)
          p.add(H);
      }
      if (++g > A) throw new Error("circular link");
      L = p, p = /* @__PURE__ */ new Set();
    }
  }
  function z({ nodes: u }) {
    const A = u.length;
    let L = new Set(u), p = /* @__PURE__ */ new Set(), g = 0;
    for (; L.size; ) {
      for (const $ of L) {
        $.height = g;
        for (const { source: H } of $.targetLinks)
          p.add(H);
      }
      if (++g > A) throw new Error("circular link");
      L = p, p = /* @__PURE__ */ new Set();
    }
  }
  function T({ nodes: u }) {
    const A = de(u, (g) => g.depth) + 1, L = (e - i - s) / (A - 1), p = new Array(A);
    for (const g of u) {
      const $ = Math.max(0, Math.min(A - 1, Math.floor(l.call(null, g, A))));
      g.layer = $, g.x0 = i + $ * L, g.x1 = g.x0 + s, p[$] ? p[$].push(g) : p[$] = [g];
    }
    if (c) for (const g of p)
      g.sort(c);
    return p;
  }
  function C(u) {
    const A = Cs(u, (L) => (n - t - (L.length - 1) * a) / Xt(L, Wt));
    for (const L of u) {
      let p = t;
      for (const g of L) {
        g.y0 = p, g.y1 = p + g.value * A, p = g.y1 + a;
        for (const $ of g.sourceLinks)
          $.width = $.value * A;
      }
      p = (n - p + a) / (L.length + 1);
      for (let g = 0; g < L.length; ++g) {
        const $ = L[g];
        $.y0 += p * (g + 1), $.y1 += p * (g + 1);
      }
      _(L);
    }
  }
  function V(u) {
    const A = T(u);
    a = Math.min(o, (n - t) / (de(A, (L) => L.length) - 1)), C(A);
    for (let L = 0; L < b; ++L) {
      const p = Math.pow(0.99, L), g = Math.max(1 - p, (L + 1) / b);
      j(A, p, g), R(A, p, g);
    }
  }
  function R(u, A, L) {
    for (let p = 1, g = u.length; p < g; ++p) {
      const $ = u[p];
      for (const H of $) {
        let I = 0, Y = 0;
        for (const { source: J, value: et } of H.targetLinks) {
          let N = et * (H.layer - J.layer);
          I += B(J, H) * N, Y += N;
        }
        if (!(Y > 0)) continue;
        let Z = (I / Y - H.y0) * A;
        H.y0 += Z, H.y1 += Z, U(H);
      }
      c === void 0 && $.sort(Bt), D($, L);
    }
  }
  function j(u, A, L) {
    for (let p = u.length, g = p - 2; g >= 0; --g) {
      const $ = u[g];
      for (const H of $) {
        let I = 0, Y = 0;
        for (const { target: J, value: et } of H.sourceLinks) {
          let N = et * (J.layer - H.layer);
          I += G(H, J) * N, Y += N;
        }
        if (!(Y > 0)) continue;
        let Z = (I / Y - H.y0) * A;
        H.y0 += Z, H.y1 += Z, U(H);
      }
      c === void 0 && $.sort(Bt), D($, L);
    }
  }
  function D(u, A) {
    const L = u.length >> 1, p = u[L];
    E(u, p.y0 - a, L - 1, A), W(u, p.y1 + a, L + 1, A), E(u, n, u.length - 1, A), W(u, t, 0, A);
  }
  function W(u, A, L, p) {
    for (; L < u.length; ++L) {
      const g = u[L], $ = (A - g.y0) * p;
      $ > 1e-6 && (g.y0 += $, g.y1 += $), A = g.y1 + a;
    }
  }
  function E(u, A, L, p) {
    for (; L >= 0; --L) {
      const g = u[L], $ = (g.y1 - A) * p;
      $ > 1e-6 && (g.y0 -= $, g.y1 -= $), A = g.y0 - a;
    }
  }
  function U({ sourceLinks: u, targetLinks: A }) {
    if (f === void 0) {
      for (const { source: { sourceLinks: L } } of A)
        L.sort(pe);
      for (const { target: { targetLinks: L } } of u)
        L.sort(ue);
    }
  }
  function _(u) {
    if (f === void 0)
      for (const { sourceLinks: A, targetLinks: L } of u)
        A.sort(pe), L.sort(ue);
  }
  function B(u, A) {
    let L = u.y0 - (u.sourceLinks.length - 1) * a / 2;
    for (const { target: p, width: g } of u.sourceLinks) {
      if (p === A) break;
      L += g + a;
    }
    for (const { source: p, width: g } of A.targetLinks) {
      if (p === u) break;
      L -= g;
    }
    return L;
  }
  function G(u, A) {
    let L = A.y0 - (A.targetLinks.length - 1) * a / 2;
    for (const { source: p, width: g } of A.targetLinks) {
      if (p === u) break;
      L += g + a;
    }
    for (const { target: p, width: g } of u.sourceLinks) {
      if (p === A) break;
      L -= g;
    }
    return L;
  }
  return k;
}
var Ut = Math.PI, Yt = 2 * Ut, gt = 1e-6, Is = Yt - gt;
function Kt() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Le() {
  return new Kt();
}
Kt.prototype = Le.prototype = {
  constructor: Kt,
  moveTo: function(i, t) {
    this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(i, t) {
    this._ += "L" + (this._x1 = +i) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(i, t, e, n) {
    this._ += "Q" + +i + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +n);
  },
  bezierCurveTo: function(i, t, e, n, s, o) {
    this._ += "C" + +i + "," + +t + "," + +e + "," + +n + "," + (this._x1 = +s) + "," + (this._y1 = +o);
  },
  arcTo: function(i, t, e, n, s) {
    i = +i, t = +t, e = +e, n = +n, s = +s;
    var o = this._x1, a = this._y1, r = e - i, l = n - t, c = o - i, f = a - t, x = c * c + f * f;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = i) + "," + (this._y1 = t);
    else if (x > gt) if (!(Math.abs(f * r - l * c) > gt) || !s)
      this._ += "L" + (this._x1 = i) + "," + (this._y1 = t);
    else {
      var m = e - o, b = n - a, k = r * r + l * l, y = m * m + b * b, w = Math.sqrt(k), S = Math.sqrt(x), z = s * Math.tan((Ut - Math.acos((k + x - y) / (2 * w * S))) / 2), T = z / S, C = z / w;
      Math.abs(T - 1) > gt && (this._ += "L" + (i + T * c) + "," + (t + T * f)), this._ += "A" + s + "," + s + ",0,0," + +(f * m > c * b) + "," + (this._x1 = i + C * r) + "," + (this._y1 = t + C * l);
    }
  },
  arc: function(i, t, e, n, s, o) {
    i = +i, t = +t, e = +e, o = !!o;
    var a = e * Math.cos(n), r = e * Math.sin(n), l = i + a, c = t + r, f = 1 ^ o, x = o ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + c : (Math.abs(this._x1 - l) > gt || Math.abs(this._y1 - c) > gt) && (this._ += "L" + l + "," + c), e && (x < 0 && (x = x % Yt + Yt), x > Is ? this._ += "A" + e + "," + e + ",0,1," + f + "," + (i - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + f + "," + (this._x1 = l) + "," + (this._y1 = c) : x > gt && (this._ += "A" + e + "," + e + ",0," + +(x >= Ut) + "," + f + "," + (this._x1 = i + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(i, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function me(i) {
  return function() {
    return i;
  };
}
function Bs(i) {
  return i[0];
}
function Ds(i) {
  return i[1];
}
var Vs = Array.prototype.slice;
function Ns(i) {
  return i.source;
}
function Fs(i) {
  return i.target;
}
function qs(i) {
  var t = Ns, e = Fs, n = Bs, s = Ds, o = null;
  function a() {
    var r, l = Vs.call(arguments), c = t.apply(this, l), f = e.apply(this, l);
    if (o || (o = r = Le()), i(o, +n.apply(this, (l[0] = c, l)), +s.apply(this, l), +n.apply(this, (l[0] = f, l)), +s.apply(this, l)), r) return o = null, r + "" || null;
  }
  return a.source = function(r) {
    return arguments.length ? (t = r, a) : t;
  }, a.target = function(r) {
    return arguments.length ? (e = r, a) : e;
  }, a.x = function(r) {
    return arguments.length ? (n = typeof r == "function" ? r : me(+r), a) : n;
  }, a.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : me(+r), a) : s;
  }, a.context = function(r) {
    return arguments.length ? (o = r ?? null, a) : o;
  }, a;
}
function js(i, t, e, n, s) {
  i.moveTo(t, e), i.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function Gs() {
  return qs(js);
}
function Xs(i) {
  return [i.source.x1, i.y0];
}
function Ws(i) {
  return [i.target.x0, i.y1];
}
function Us() {
  return Gs().source(Xs).target(Ws);
}
const Ys = "(blank)", Ks = { field: null, title: null, domain: null, format: null, sort: "descending" }, Zs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, Rt = (i, t) => {
  const e = i == null ? void 0 : i(t);
  return e == null || e === "" ? Ys : String(e);
};
function Qs(i, t) {
  const e = [...i.keys()];
  t.sort === "descending" ? e.sort((s, o) => i.get(o) - i.get(s)) : t.sort === "ascending" && e.sort((s, o) => i.get(s) - i.get(o));
  const n = (t.domain ?? []).filter((s) => i.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function Js(i = [], t = {}) {
  var k;
  const e = (t.dimensions ?? []).map((y) => q(Ks, y)), n = q(Zs, (k = t.axis) == null ? void 0 : k.color), s = e.findIndex((y) => y.field != null && y.field === n.field), o = Math.max(0, s), a = e.map((y, w) => {
    const S = v.rollup(
      i,
      (T) => T.length,
      (T) => Rt(y.accessor, T)
    ), z = Qs(S, y).map((T, C) => ({
      id: -1,
      dim: w,
      index: C,
      key: T,
      label: y.format ? y.format(T) : T,
      count: S.get(T)
    }));
    return {
      title: y.title ?? (typeof y.field == "string" ? y.field : ""),
      index: w,
      nodes: z,
      byKey: new Map(z.map((T) => [T.key, T]))
    };
  }), r = a.flatMap((y) => y.nodes);
  r.forEach((y, w) => {
    y.id = w;
  });
  const l = (y) => e.map((w) => Rt(w.accessor, y)).join("\0"), c = v.rollups(i, (y) => y, l).map(([, y]) => {
    const w = e.map((z) => Rt(z.accessor, y[0])), S = w.map((z, T) => a[T].byKey.get(z));
    return {
      keys: w,
      labels: S.map((z) => z.label),
      nodes: S,
      records: y,
      value: y.length
    };
  }), f = [o, ...e.map((y, w) => w).filter((y) => y !== o)];
  c.sort((y, w) => {
    for (const S of f) {
      const z = y.nodes[S].index - w.nodes[S].index;
      if (z) return z;
    }
    return 0;
  });
  const x = [];
  for (const y of c)
    for (let w = 1; w < e.length; w++)
      x.push({
        source: y.nodes[w - 1].id,
        target: y.nodes[w].id,
        pair: w - 1,
        keys: y.keys,
        labels: y.labels,
        records: y.records,
        value: y.value,
        colorKey: y.keys[o]
      });
  const m = a[o], b = e[o];
  return b && (n.field ?? (n.field = b.field), n.accessor = (y) => Rt(b.accessor, y), n.format ?? (n.format = b.format)), n.domain = it(
    n.domain,
    m ? m.nodes.map((y) => y.key) : []
  ), n.range ?? (n.range = at(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: o,
    columns: a.map(({ title: y, index: w, nodes: S }) => ({
      title: y,
      index: w,
      nodes: S
    })),
    nodes: r,
    paths: c,
    links: x,
    total: i.length
  };
}
const tn = 2.3, ye = 5, xe = 6, Pt = 6, _e = 0.92, en = "#333", sn = {
  data: [],
  dimensions: [],
  axis: {},
  nodeWidth: 4,
  nodePadding: 10,
  fillColumns: !0,
  hover: !0,
  tooltip: null,
  onHover: null,
  unit: "records",
  fontSize: "medium",
  width: null,
  height: 480,
  onHighlightChange: null
};
class pn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...sn, ...e }, this.highlight = new kt(() => this._onHighlightChange()), this.hovered = null, this.root = v.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Lt(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: o } = this.options, a = bt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(a);
    const l = Js(this.options.data, this.options);
    this.prepared = l;
    const { axes: c, columns: f, colorIndex: x, total: m } = l, b = we(c.color), k = (_) => this.highlight.includes(_, { color: _.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(b, a), !l.nodes.length || f.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const y = Math.round(tn * a), w = [
      [0, y + ye],
      [r, y + this.options.height - ye]
    ], S = Ps().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(w)({
      nodes: l.nodes.map((_) => ({ ..._ })),
      links: l.links.map((_) => ({ ..._ }))
    });
    n && nn(S.nodes, f.length, w[0][1], w[1][1]);
    const z = Us(), T = (_) => _.x0 < r / 2, C = (_) => T(_) ? _.x1 + xe : _.x0 - xe, V = (_) => T(_) ? "start" : "end", R = (_) => _.dim === x ? this.highlight.color(b(_.key), _, { color: _.key }) : !this.highlight.active || _.sourceLinks.some(k) || _.targetLinks.some(k) ? en : rt, j = this.svg.attr("width", r).attr("height", y + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${m} ${o} across ${f.map((_) => _.title).join(", ")}`
    ), D = (_) => S.nodes.find((B) => B.dim === _.index);
    j.append("g").selectAll("text").data(f.filter(D)).join("text").attr("class", "parallel-sets__header").attr("x", (_) => C(D(_))).attr("y", y - a * 0.9).attr("text-anchor", (_) => V(D(_))).attr("font-size", a * _e).text((_) => _.title);
    const W = j.append("g").attr("fill", "none").selectAll("path").data(S.links).join("path").attr("class", "parallel-sets__link").attr("d", z).attr("stroke", (_) => this.highlight.color(b(_.colorKey), _, { color: _.colorKey })).attr("stroke-width", (_) => Math.max(_.width, 1)), E = j.append("g").selectAll("g").data(S.nodes).join("g").attr("class", "parallel-sets__node");
    E.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (_) => _.x0).attr("y", (_) => _.y0).attr("width", (_) => _.x1 - _.x0).attr("height", (_) => Math.max(_.y1 - _.y0, 1)).attr("fill", R), E.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (_) => _.x0 - Pt).attr("y", (_) => _.y0 - Pt / 2).attr("width", (_) => _.x1 - _.x0 + Pt * 2).attr("height", (_) => Math.max(_.y1 - _.y0, 1) + Pt), E.append("text").attr("class", "parallel-sets__label").attr("x", C).attr("y", (_) => (_.y0 + _.y1) / 2).attr("dy", "0.35em").attr("text-anchor", V).text((_) => `${_.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * _e).text((_) => _.count), s && this._bindHover(E, W, S);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  /**
   * Node hover: every strand through that node. Link hover: every strand sharing
   * the hovered link's category path up to its target column, i.e. the whole
   * visible band between those two nodes, traced across the chart.
   */
  _bindHover(t, e, n) {
    const s = (a) => {
      const r = this.hovered;
      return r ? r.type === "link" ? r.keys.every((l, c) => a.keys[c] === l) : a.keys[r.node.dim] === r.node.key : !0;
    }, o = () => {
      const a = this.hovered != null, r = /* @__PURE__ */ new Set();
      if (a)
        for (const l of n.links)
          s(l) && (r.add(l.source.id), r.add(l.target.id));
      e.classed("parallel-sets__link--active", (l) => a && s(l)).classed("parallel-sets__link--muted", (l) => a && !s(l)), t.classed("parallel-sets__node--muted", (l) => a && !r.has(l.id));
    };
    this._applyHover = o, t.on("mouseenter", (a, r) => {
      const l = { type: "node", node: r };
      this._setHovered(l), this.tooltip.show(this._nodeTooltip(l), a, r);
    }).on("mousemove", (a) => this.tooltip.move(a)), e.on("mouseenter", (a, r) => {
      const l = r.keys.slice(0, r.pair + 2), c = n.links.filter((m) => m.pair === r.pair && l.every((b, k) => m.keys[k] === b)).reduce((m, b) => m + b.value, 0), f = r.labels.slice(0, l.length), x = { type: "link", keys: l, labels: f, pair: r.pair, value: c };
      this._setHovered(x), this.tooltip.show(this._linkTooltip(x), a, r);
    }).on("mousemove", (a) => this.tooltip.move(a));
  }
  // The hovered target: applies the emphasis, hides the tooltip when nothing is
  // hovered, and reports a change through onHover
  _setHovered(t) {
    var n, s, o;
    const e = t !== this.hovered;
    this.hovered = t, (n = this._applyHover) == null || n.call(this), t || this.tooltip.hide(), e && ((o = (s = this.options).onHover) == null || o.call(s, t));
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
    const { node: e } = t, n = [[this.prepared.columns[e.dim].title, e.label], this._countRow(e.count)];
    return this.options.tooltip ? this.options.tooltip(t, n) : n;
  }
  _linkTooltip(t) {
    const e = t.keys.map((n, s) => [this.prepared.columns[s].title, t.labels[s]]);
    return e.push(this._countRow(t.value)), this.options.tooltip ? this.options.tooltip(t, e) : e;
  }
  /** The color axis legend below the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const n = this.prepared.axes.color;
    mt(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function nn(i, t, e, n) {
  for (let s = 0; s < t; s++) {
    const o = i.filter((c) => c.dim === s).sort((c, f) => c.y0 - f.y0);
    if (o.length < 2) continue;
    const a = o.reduce((c, f) => c + (f.y1 - f.y0), 0), r = (n - e - a) / (o.length - 1);
    let l = e;
    for (const c of o) {
      const f = c.y1 - c.y0;
      c.y0 = l, c.y1 = l + f, l += f + r;
    }
  }
  for (const s of i) {
    let o = s.y0;
    for (const r of s.sourceLinks)
      r.y0 = o + r.width / 2, o += r.width;
    let a = s.y0;
    for (const r of s.targetLinks)
      r.y1 = a + r.width / 2, a += r.width;
  }
}
export {
  rn as BarChart,
  dn as BoxPlotChart,
  ee as FONT_SIZES,
  kt as Highlight,
  rt as MUTED_COLOR,
  pn as ParallelSetsChart,
  hn as ScatterPlot,
  cn as StackedBarChart,
  Lt as Tooltip,
  un as TreeChart,
  It as barLabel,
  rs as boxStats,
  on as categoryColors,
  an as countBy,
  ln as countByStacked,
  at as defaultColors,
  mt as drawLegend,
  Oe as drawSequentialLegend,
  Vt as drawTopTitle,
  lt as hasValue,
  ht as maxTextWidth,
  Qt as measureText,
  Te as prepareBarChart,
  cs as prepareBoxPlotChart,
  Js as prepareParallelSets,
  Qe as prepareScatterPlot,
  qe as prepareStackedBarChart,
  vs as prepareTreeChart,
  bt as resolveFontSize,
  ct as titleLane,
  zt as titleOnTop,
  Tt as topTitleLane
};
