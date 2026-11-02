import * as x from "d3";
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
function lt(o) {
  return o <= x.schemeTableau10.length ? x.schemeTableau10 : Ae;
}
function rn(o, t) {
  const e = x.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: n, range: lt(n.length) };
}
function ve(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function F(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = ve(e.field), e;
}
function N(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function st(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function Jt(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function wt(o) {
  switch (o) {
    case "log":
      return x.scaleLog();
    case "sqrt":
      return x.scaleSqrt();
    default:
      return x.scaleLinear();
  }
}
function kt(o, t = [0, 1]) {
  const [e, n] = x.extent(o);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function Nt(o, t, e) {
  return wt(o).domain(t).nice(e ?? void 0).domain();
}
function Tt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function bt(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
function we(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : lt(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : x.interpolateRgbBasis(o.range);
    return x.scaleSequential(o.domain, t);
  }
  return x.scaleOrdinal(o.domain, o.range);
}
function Se(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : wt(o.type).domain(o.domain).range(o.range);
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
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Te = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ln(o, t, { sort: e, group: n } = {}) {
  const s = (a) => (l) => l[a] || "(blank)", i = (a, l) => {
    const d = x.rollup(a, (p) => p.length, s(t)), h = Array.from(
      d,
      ([p, v]) => n == null ? { label: p, count: v } : { group: l, label: p, count: v }
    );
    return e === "descending" ? h.sort((p, v) => v.count - p.count) : e === "ascending" && h.sort((p, v) => p.count - v.count), h;
  };
  return n == null ? i(o) : Array.from(
    x.group(o, s(n)),
    ([a, l]) => i(l, a)
  ).flat();
}
function Vt(o, t, e = "both") {
  const n = `${t ? Math.round(o / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(o);
    case "percent":
      return n;
    case "none":
      return "";
    default:
      return `${o} (${n})`;
  }
}
function Ce(o = [], t = {}) {
  const e = t.axis ?? {}, n = t.orientation === "horizontal", s = F($e, n ? e.y : e.x), i = F(Me, n ? e.x : e.y), a = F(ze, e.group), l = F(Te, e.color), d = l.accessor ?? s.accessor, h = (f) => ({
    count: x.sum(f, i.accessor),
    color: d(f[0])
  });
  let p;
  if (n && a.accessor) {
    const f = x.rollup(o, h, a.accessor, s.accessor);
    a.domain = st(a.domain, f.keys()), p = a.domain.flatMap((w) => {
      const _ = f.get(w) ?? /* @__PURE__ */ new Map();
      return st(s.domain, _.keys()).filter((m) => _.has(m)).map((m) => ({ group: w, label: m, ..._.get(m) }));
    }), s.domain = [...new Set(p.map((w) => w.label))];
  } else {
    const f = x.rollup(o, h, s.accessor);
    s.domain = st(s.domain, f.keys()), p = s.domain.map((w) => {
      var _, m;
      return {
        group: null,
        label: w,
        count: ((_ = f.get(w)) == null ? void 0 : _.count) ?? 0,
        color: ((m = f.get(w)) == null ? void 0 : m.color) ?? w
      };
    });
  }
  s.tickValues = Jt(s), i.domain ?? (i.domain = Nt(i.type, [0, x.max(p, (f) => f.count) || 1], i.ticks)), l.domain = st(
    l.domain,
    p.map((f) => f.color)
  ), l.range ?? (l.range = lt(l.domain.length));
  const v = t.total ?? x.sum(p, (f) => f.count);
  return { axes: { category: s, value: i, group: a, color: l }, bars: p, total: v };
}
const ut = "#cfcfcf";
class At {
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
    let i;
    n ? (i = new Set(s), i.has(e) ? i.delete(e) : i.add(e)) : i = s.size === 1 && s.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), i.size ? this.selection.set(t, i) : this.selection.delete(t), this._changed();
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
    for (const [s, i] of this.selection)
      if (!i.has(e[s])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, n, s) {
    return this.includes(e, n, s) ? t : ut;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const He = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function vt(o, t, e) {
  const { title: n, tickValues: s, fontSize: i, highlight: a, dimension: l = "color" } = e, d = e.format ?? ((k) => k), h = e.key ?? ((k) => k), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", v = (k) => He.has(p(k)) ? p(k) : "square";
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const f = a != null, w = (k) => f && a.active && !a.isSelected(l, h(k)), _ = (k, S) => a.toggle(l, h(S), { extend: k.shiftKey || k.metaKey }), m = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", f).classed("chart-legend__item--muted", w);
  f && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (k) => a.isSelected(l, h(k))).on("click", _).on("keydown", (k, S) => {
    k.key !== "Enter" && k.key !== " " || (k.preventDefault(), _(k, S));
  }), m.append("i").attr("class", (k) => `chart-legend__swatch chart-legend__swatch--${v(k)}`).style("color", (k) => w(k) ? ut : t(k)), m.append("span").text((k) => d(k));
}
let Oe = 0;
function Ee(o, t, e) {
  const { title: n, fontSize: s, width: i = 160 } = e;
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  const a = s ?? 12;
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const [l, d] = t.domain(), h = Math.ceil(a * 1.5), p = Math.round(a * 0.67), v = o.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), f = `chart-legend-ramp-${Oe += 1}`;
  v.append("linearGradient").attr("id", f).selectAll("stop").data(x.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(l + m * (d - l)));
  const w = v.append("g").attr("transform", `translate(${h},0)`);
  w.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${f})`);
  const _ = x.axisBottom(x.scaleLinear([l, d], [0, i]));
  w.append("g").attr("transform", `translate(0,${p})`).call(bt(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const se = { small: 10, medium: 12, large: 14 };
function St(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in se)) throw new Error(`Unknown chart font size "${o}"`);
  return se[o];
}
function gt(o, t) {
  return t ? o + 16 : 0;
}
const Re = 0.5, Pe = 0.72, Ie = 5, be = 8;
function Ct(o) {
  return !!o.title && o.titlePosition === "top";
}
function Ht(o) {
  return o * 1.5 + be;
}
function Ft(o, t, { fontSize: e, color: n }) {
  const s = e * Re, i = -(e / 2 + be), a = o.append("g").attr("class", "axis-title axis-title--top"), l = a.append("text").attr("x", s + Ie).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), d = s / 2, h = s / 2, p = i - e * Pe, v = a.append("path").attr("d", `M${d},${i}V${p}M${d - h},${p + h}L${d},${p}L${d + h},${p + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (l.attr("fill", n), v.attr("stroke", n)), a;
}
let Mt;
const Be = 0.55;
function Lt(o, t, e, n = 400) {
  if (Mt === void 0 && (Mt = document.createElement("canvas").getContext("2d")), !Mt) return String(o).length * t * Be;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Mt.font = `${n} ${t}px ${s}`, Mt.measureText(String(o)).width;
}
function ft(o, t, e, n) {
  let s = 0;
  for (const i of o)
    s = Math.max(s, Lt(i, t, e, n));
  return s;
}
class $t {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = x.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
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
        s.append("th").text(([i]) => i), s.append("td").text(([, i]) => i);
      }
    this.div.style("display", null), this.move(e);
  }
  /** Place the tooltip beside the cursor of `event`, flipping to stay inside the root. */
  move(t) {
    const [e, n] = x.pointer(t, this.root), s = this.div.node(), i = 14, a = e + i + s.offsetWidth > this.root.clientWidth ? e - i - s.offsetWidth : e + i, l = n + i + s.offsetHeight > this.root.clientHeight ? n - i - s.offsetHeight : n + i;
    this.div.style("left", `${Math.max(0, a)}px`).style("top", `${Math.max(0, l)}px`);
  }
  hide() {
    this.target = null, this.div.style("display", "none");
  }
  /** Whether the tooltip is showing. */
  get visible() {
    return this.target !== null;
  }
}
const ne = 12, jt = 6, qt = 0.85, Ve = "rgba(0,0,0,0.55)", oe = "rgba(0,0,0,0.6)", De = {
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
class cn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...De, ...e }, this.highlight = new At(() => this._onHighlightChange()), this.hovered = null, this.root = x.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new $t(t), this.draw();
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
    var rt;
    const { width: t, rowHeight: e } = this.options, n = this.options.orientation === "horizontal", s = this.svg.node(), i = St(this.options.fontSize);
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: a, bars: l, total: d } = Ce(this.options.data, this.options), { category: h, value: p, group: v, color: f } = a, w = n && !!v.accessor, _ = h.domain, m = h.format ?? String, k = v.format ?? String, S = (r) => (w ? `${k(r.group)} / ` : "") + m(r.label), z = this.options.barLabel !== "none", $ = (r) => Vt(r.count, d, this.options.barLabel);
    this._tooltipRows = (r) => {
      const M = Vt(r.count, d, "percent"), C = [
        [N(h, "category"), m(r.label)],
        [N(p, "count"), `${r.count} of ${d} (${M})`]
      ];
      return w && C.unshift([N(v, "group"), k(r.group)]), this.options.tooltip ? this.options.tooltip(r, C) : C;
    };
    const T = wt(p.type).domain(p.domain), D = Tt(T, p), H = p.format ?? T.tickFormat(p.ticks ?? void 0), G = h.tickValues ?? _, I = [];
    if (w)
      for (const r of l)
        r.group !== ((rt = I.at(-1)) == null ? void 0 : rt.group) && I.push({ group: r.group }), I.push({ group: r.group, bar: r });
    const W = I.filter((r) => !r.bar).map((r) => k(r.group)), [X, U] = n ? [p.title, h.title] : [h.title, p.title], V = Ct(n ? h : p), P = V ? 0 : gt(i, U), Y = Math.max(
      ft(_.map(m), i, s),
      W.length ? ft(W, i, s, 600) : 0
    ), c = n ? 0.3 : 0.35;
    let b, L, g;
    if (n) {
      b = {
        top: V ? Ht(i) : i,
        right: ft(l.map($), i * qt, s, 600) + jt + 8,
        bottom: i + 16 + gt(i, X),
        left: P + Y + ne
      };
      const r = w ? I.length + 1 : _.length;
      L = b.top + r * e + b.bottom;
    } else if (b = {
      // The label above the tallest bar, or the title above the top tick
      top: Math.max((z ? i * qt : 0) + 16, V ? Ht(i) : 0),
      right: 16,
      bottom: i + 24 + gt(i, X),
      left: P + ft(D.map(H), i, s) + ne
    }, L = this.options.height, g = (t - b.left - b.right) / _.length < Y, g) {
      const M = Math.round(Y * Math.sin(Math.PI / 4)), C = (1 + c) / 2 / (_.length + c);
      b.bottom += M, L += M, b.left = Math.max(b.left, Math.ceil((M - C * (t - b.right)) / (1 - C)));
    }
    const y = t - b.left - b.right, A = L - b.top - b.bottom, O = x.scaleBand().domain(_).range(h.range || [0, n ? A : y]).padding(c);
    T.range(p.range || (n ? [0, y] : [A, 0]));
    const R = x.scaleOrdinal(f.domain, f.range), K = (r) => this.highlight.color(R(r.color), r, { color: r.color }), [B, j] = n ? [T, O] : [O, T], nt = w ? x.scaleBand(x.range(I.length), [0, A]).paddingInner(c).paddingOuter((1 + c) / 2) : null, Z = /* @__PURE__ */ new Map();
    I.forEach((r, M) => {
      r.y = nt(M) + nt.bandwidth() / 2, r.bar && Z.set(r.bar, r.y);
    });
    const mt = w ? nt.bandwidth() : O.bandwidth(), yt = (r) => w ? Z.get(r) - mt / 2 : j(r.label);
    this.root.style("max-width", `${t}px`);
    const xt = this.svg.attr("viewBox", `0 0 ${t} ${L}`).attr(
      "aria-label",
      `Bar chart of ${N(p, "count")} by ${N(h, "category")}` + (w ? ` within ${N(v, "group")}` : "") + `. ${l.map((r) => `${S(r)}: ${r.count}`).join(", ")}`
    );
    xt.selectAll("*").remove();
    const tt = xt.append("g").attr("transform", `translate(${b.left},${b.top})`), ct = tt.append("g");
    if (w) {
      const r = new Set(G), M = ct.selectAll("g").data(I.filter((C) => !C.bar || r.has(C.bar.label))).join("g").attr("transform", (C) => `translate(0,${C.y})`);
      M.append("line").attr("x1", -6).attr("x2", (C) => C.bar ? 0 : y), M.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("font-weight", (C) => C.bar ? null : 600).text((C) => C.bar ? m(C.bar.label) : k(C.group)), ct.append("path").attr("class", "domain").attr("d", `M0,0V${A}`).attr("fill", "none");
    } else
      ct.call(
        x.axisLeft(j).tickValues(n ? G : D).tickFormat(n ? m : H).tickSizeOuter(0)
      );
    const it = tt.append("g").attr("transform", `translate(0,${A})`).call(
      x.axisBottom(B).tickValues(n ? D : G).tickFormat(n ? H : m).tickSizeOuter(0)
    );
    for (const r of [ct, it])
      r.attr("font-family", null).attr("font-size", i), r.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), r.selectAll(".domain, line").attr("stroke", "rgba(0,0,0,0.5)");
    g && it.selectAll("text").attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    const at = tt.insert("g", ":first-child").selectAll("line").data(D).join("line").attr("stroke", "rgba(0,0,0,0.08)");
    n ? at.attr("y2", A).attr("x1", (r) => B(r)).attr("x2", (r) => B(r)) : at.attr("x2", y).attr("y1", (r) => j(r)).attr("y2", (r) => j(r));
    const ht = tt.append("g").selectAll("g").data(l).join("g"), dt = ht.append("rect").attr("rx", 3).attr("fill", K), et = z ? ht.append("text").attr("font-size", i * qt).attr("font-weight", 600).attr("fill", Ve).text($) : null;
    n ? (dt.attr("x", B(0)).attr("y", yt).attr("width", (r) => Math.max(0, B(r.count) - B(0))).attr("height", mt), et == null || et.attr("x", (r) => B(r.count) + jt).attr("y", (r) => yt(r) + mt / 2).attr("dy", "0.35em")) : (dt.attr("x", (r) => B(r.label)).attr("y", (r) => j(r.count)).attr("width", B.bandwidth()).attr("height", (r) => Math.max(0, A - j(r.count))), et == null || et.attr("x", (r) => B(r.label) + B.bandwidth() / 2).attr("y", (r) => j(r.count) - jt).attr("text-anchor", "middle")), dt.on("mouseenter", (r, M) => this._setHovered(M, r)).on("mousemove", (r) => this.tooltip.move(r)).on("mouseleave", () => this._setHovered(null));
    const Q = (r) => xt.append("text").attr("text-anchor", "middle").attr("font-size", i).attr("font-weight", 600).attr("fill", oe).text(r || "");
    Q(X).attr("x", b.left + y / 2).attr("y", L - i), V ? Ft(tt, U, { fontSize: i, color: oe }) : Q(U).attr(
      "transform",
      `translate(${i + 2},${b.top + A / 2}) rotate(-90)`
    ), vt(this.legend, R, { ...f, fontSize: i, highlight: this.highlight });
  }
}
const Ne = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Fe = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, je = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function hn(o, t, e, { sort: n } = {}) {
  const s = x.group(o, (a) => a[t] || "(blank)"), i = Array.from(s, ([a, l]) => ({ label: a, count: l.length, group: l }));
  return n === "descending" ? i.sort((a, l) => l.count - a.count) : n === "ascending" && i.sort((a, l) => a.count - l.count), i.flatMap(
    ({ label: a, group: l }) => Array.from(
      x.rollup(
        l,
        (d) => d.length,
        (d) => d[e] || "(blank)"
      ),
      ([d, h]) => ({ label: a, key: d, count: h })
    )
  );
}
function qe(o = [], t = {}) {
  const e = t.axis ?? {}, n = F(Ne, e.y), s = F(Fe, e.x), i = F(je, e.color), a = x.rollup(
    o,
    (h) => x.sum(h, s.accessor),
    n.accessor,
    i.accessor
  );
  n.domain = st(n.domain, a.keys()), n.tickValues = Jt(n), i.domain = st(i.domain, o.map(i.accessor));
  const l = n.domain.map((h) => {
    const p = a.get(h);
    let v = 0;
    const f = [];
    for (const w of i.domain) {
      const _ = (p == null ? void 0 : p.get(w)) ?? 0;
      _ > 0 && f.push({ key: w, count: _, start: v, end: v += _ });
    }
    return { label: h, count: v, segments: f };
  });
  s.domain ?? (s.domain = Nt(s.type, [0, x.max(l, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = lt(i.domain.length));
  const d = t.total ?? x.sum(l, (h) => h.count);
  return { axes: { category: n, value: s, color: i }, bars: l, total: d };
}
const Ge = 12, ie = 6, ae = 0.85, Xe = "rgba(0,0,0,0.55)", We = {
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
class dn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...We, ...e }, this.highlight = new At(() => this._onHighlightChange()), this.hovered = null, this.root = x.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new $t(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = St(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: l } = qe(this.options.data, this.options), { category: d, value: h, color: p } = i, v = d.domain, f = d.format ?? String, w = p.format ?? String, _ = (g) => Vt(g.count, l, this.options.barLabel);
    this._tooltipRows = (g) => {
      const y = [
        [N(d, "category"), f(g.label)],
        [N(p, "group"), w(g.key)],
        [N(h, "count"), `${g.count} of ${g.barCount}`],
        ["Share of total", Vt(g.count, l, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(g, y) : y;
    };
    const m = Ct(d), k = ft(v.map(f), s, n), S = {
      top: m ? Ht(s) : s,
      right: ft(a.map(_), s * ae, n, 600) + ie + 8,
      bottom: s + 16 + gt(s, h.title),
      left: (m ? 0 : gt(s, d.title)) + k + Ge
    }, z = t - S.left - S.right, $ = v.length * e, T = S.top + $ + S.bottom, D = x.scaleBand().domain(v).range(d.range || [0, $]).padding(0.3), H = wt(h.type).domain(h.domain).range(h.range || [0, z]), G = x.scaleOrdinal(p.domain, p.range), I = (g) => this.highlight.color(G(g.key), g, { color: g.key }), W = Tt(H, h), X = h.format ?? H.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const U = a.map((g) => {
      const y = g.segments.map((A) => `${w(A.key)} ${A.count}`).join(", ");
      return `${f(g.label)}: ${g.count} (${y})`;
    }).join("; "), V = this.svg.attr("viewBox", `0 0 ${t} ${T}`).attr(
      "aria-label",
      `Stacked bar chart of ${N(h, "count")} by ${N(d, "category")}, split by ${N(p, "group")}. ${U}`
    );
    V.selectAll("*").remove();
    const P = V.append("g").attr("transform", `translate(${S.left},${S.top})`), Y = P.append("g").call(
      x.axisLeft(D).tickValues(d.tickValues ?? v).tickFormat(f).tickSizeOuter(0)
    ), c = P.append("g").attr("transform", `translate(0,${$})`).call(x.axisBottom(H).tickValues(W).tickFormat(X).tickSizeOuter(0));
    for (const g of [Y, c])
      g.attr("font-family", null).attr("font-size", s), g.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), g.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    P.insert("g", ":first-child").selectAll("line").data(W).join("line").attr("y2", $).attr("x1", (g) => H(g)).attr("x2", (g) => H(g)).attr("stroke", "rgba(0,0,0,0.08)");
    const b = P.append("g").selectAll("g").data(a).join("g");
    b.selectAll("rect").data((g) => g.segments.map((y) => ({ ...y, label: g.label, barCount: g.count }))).join("rect").attr("x", (g) => H(g.start)).attr("y", (g) => D(g.label)).attr("width", (g) => Math.max(0, H(g.end) - H(g.start))).attr("height", D.bandwidth()).attr("fill", I).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (g, y) => this._setHovered(y, g)).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && b.append("text").attr("x", (g) => H(g.count) + ie).attr("y", (g) => D(g.label) + D.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * ae).attr("font-weight", 600).attr("fill", Xe).text(_);
    const L = (g) => V.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(g || "");
    L(h.title).attr("x", S.left + z / 2).attr("y", T - s), m ? Ft(P, d.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : L(d.title).attr(
      "transform",
      `translate(${s + 2},${S.top + $ / 2}) rotate(-90)`
    ), vt(this.legend, G, { ...p, fontSize: s, highlight: this.highlight });
  }
}
const te = (o) => typeof o == "number" ? x.format(".2f")(o) : String(o), ke = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: te
}, Ue = { ...ke, field: "y" }, Ye = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: te
}, Ke = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: te
}, Ze = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Qe(o = [{}], t = []) {
  const e = o.map((s, i) => ({
    ...Ze,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Je(o = [], t = {}) {
  const e = t.axis ?? {}, n = F(ke, e.x), s = F(Ue, e.y), i = F(Ye, e.color), a = F(Ke, e.radius), l = Qe(t.layers, o), d = l.flatMap((h) => h.data);
  for (const h of [n, s]) h.domain ?? (h.domain = Nt(h.type, kt(d.map(h.accessor))));
  if (i.accessor) {
    const h = l.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = kt(h)), i.range ?? (i.range = x.interpolateViridis)) : (i.domain = st(i.domain, h), i.range ?? (i.range = lt(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = kt(d.map(a.accessor)))), { axes: { x: n, y: s, color: i, radius: a }, layers: l };
}
const ts = {
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
  onHover: null,
  onHighlightChange: null
}, es = 0.92;
function Gt(o, t, e) {
  return wt(o.type).domain(t).range(o.range ?? e);
}
function ss(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : lt(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : x.interpolateRgbBasis(o.range);
    return x.scaleSequential(o.domain, t);
  }
  return x.scaleOrdinal(o.domain, o.range);
}
function ns(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : wt(o.type).domain(o.domain).range(o.range);
}
class un {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...ts }, this.axes = null, this.layers = [], this.highlight = new At(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the records of one layer (the first layer by default) and redraw. The
   * current zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    const n = this.layers.findIndex((i) => i.id === e);
    if (n < 0) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    if (n === 0) return this.update({ data: t });
    const s = this.options.layers.map(
      (i, a) => a === n ? { ...i, data: t } : i
    );
    return this.update({ layers: s });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = St(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = Je(this.options.data, this.options);
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
    const { x: n, y: s } = this.scales, [i, a] = n.domain(), [l, d] = s.domain(), h = n.invert(0) - n.invert(t), p = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [i + h, a + h], y: [l + p, d + p] }, !1);
  }
  _setZoomDomain(t, e) {
    var s, i;
    const n = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), n || (i = (s = this.options).onZoomChange) == null || i.call(s, !0);
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
    this.root = x.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = x.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = x.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new $t(this.container);
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
    const t = this.fontSize, { x: e, y: n } = this.axes, s = Ct(n), i = { ...this.options.margin };
    if (i.top ?? (i.top = s ? Ht(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + gt(t, e.title)), i.left == null) {
      const a = Gt(n, this._viewDomain.y, [0, 1]), l = Tt(a, n).map(n.format), d = ft(l, t * es, this.container);
      i.left = (s ? 0 : gt(t, n.title)) + d + 8;
    }
    return i;
  }
  _render(t) {
    const { height: e, duration: n } = this.options, s = this.margin = this._resolveMargin(), i = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(i - s.left - s.right, 10), l = Math.max(e - s.top - s.bottom, 10);
    this.width = i, this.innerSize = [a, l], this.svg.attr("width", i).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", a).attr("height", l), this._updateScales(a, l), this.brush.extent([
      [0, 0],
      [a, l]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const d = t ? this.svg.transition().duration(n) : null;
    this._drawAxes(a, l, d), this._drawPoints(d), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: n, y: s, color: i, radius: a } = this.axes, l = this._viewDomain, d = this.options.rangePadding;
    this.scales = {
      x: Gt(n, l.x, [d, t - d]),
      y: Gt(s, l.y, [e - d, d]),
      color: ss(i),
      radius: ns(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? x.Delaunay.from(
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
    const { x: s, y: i } = this.axes, { margin: a, fontSize: l } = this, d = (h) => n ? h.transition(n) : h;
    d(this.gridX).call(
      bt(x.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), d(this.gridY).call(
      bt(x.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), d(this.axisX.attr("transform", `translate(0,${e})`)).call(
      bt(x.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), d(this.axisY).call(bt(x.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), Ct(i) ? Ft(this.titleY, i.title, { fontSize: l }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + l + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(n) {
      e._drawLayer(x.select(this), n, t);
    });
  }
  _drawLayer(t, e, n) {
    const s = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (f) => this._px(f), l = (f) => this._py(f), d = (f) => this._pr(f), { highlight: h } = this, p = (f) => h.color(this._pcolor(f, e), f, this._keys(f, e)), v = t.selectAll("circle").data(e.data, s);
    v.exit().remove(), v.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", l).attr("r", d).attr(i, p), (n ? v.transition(n) : v).attr("cx", a).attr("cy", l).attr("r", d).attr(i, p), h.active && t.selectAll("circle").filter((f) => h.includes(f, this._keys(f, e))).raise();
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
      const [n, s] = e.domain(), i = 160, a = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", i).attr("height", 30), l = `${this.clipId}-ramp`;
      a.append("linearGradient").attr("id", l).selectAll("stop").data(x.ticks(0, 1, 10)).join("stop").attr("offset", (h) => h).attr("stop-color", (h) => e(n + h * (s - n))), a.append("rect").attr("width", i).attr("height", 8).attr("fill", `url(#${l})`);
      const d = x.scaleLinear([n, s], [0, i]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(bt(x.axisBottom(d), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return vt(this.legend, e, {
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
    return vt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const n = Tt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(n).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...n.map(e));
    return s.append("svg").attr("width", i * 2 + 2).attr("height", i * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", i + 1).attr("cy", i + 1).attr("r", (a) => e(a)), s.append("span").text((a) => t.format(a)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, n], [s, i]] = t.selection;
    if (Math.abs(s - e) < 4 || Math.abs(i - n) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: a, y: l } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([a.invert(e), a.invert(s)], [l.invert(i), l.invert(n)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, n] = x.pointer(t, this.plot.node()), [s, i] = this.innerSize;
    if (e < 0 || e > s || n < 0 || n > i) return this._hideTooltip();
    const a = this.nodes[this.delaunay.find(e, n)];
    if (!a) return this._hideTooltip();
    const l = this._px(a.d), d = this._py(a.d);
    if (Math.hypot(l - e, d - n) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", l).attr("cy", d).attr("r", this._pr(a.d) + 3), this.tooltip.show(this._tooltipRows(a), t, a.d), this._setHovered(a);
  }
  _setHovered(t) {
    var e, n, s;
    ((t == null ? void 0 : t.d) ?? null) !== (((e = this.hovered) == null ? void 0 : e.d) ?? null) && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, (t == null ? void 0 : t.d) ?? null, (t == null ? void 0 : t.layer.id) ?? null));
  }
  _tooltipRows({ d: t, layer: e }) {
    const n = [];
    for (const i of ["x", "y", "color"]) {
      const a = this.axes[i];
      i === "color" && e.color || a.accessor && n.push([N(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const os = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, is = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, as = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, rs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ls(o) {
  const t = [...o].sort(x.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = x.quantile(t, 0.25), n = x.quantile(t, 0.5), s = x.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), l = Math.min(a.length ? a[0] : t[0], e), d = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: l, max: d, mean: x.mean(t) };
}
function cs(o, t) {
  const e = [], n = [];
  for (const s of o) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function hs(o = [], t = {}) {
  const e = t.axis ?? {}, n = F(os, e.y), s = F(is, e.x), i = F(as, e.group), a = F(rs, e.color), l = ve(n.context), d = (p, v, f) => {
    const { records: w, values: _ } = cs(f, s.accessor), m = ls(_), k = f[0];
    return {
      group: p,
      label: v,
      context: l && k ? l(k) ?? null : null,
      count: _.length,
      records: w,
      values: _,
      stats: m,
      outliers: _.map((S, z) => z).filter((S) => _[S] < m.min || _[S] > m.max),
      color: a.accessor && k ? a.accessor(k) ?? null : null
    };
  };
  let h;
  if (i.accessor) {
    const p = x.group(o, i.accessor, n.accessor);
    i.domain = st(i.domain, p.keys()), h = i.domain.flatMap((v) => {
      const f = p.get(v) ?? /* @__PURE__ */ new Map();
      return st(n.domain, f.keys()).filter((_) => f.has(_)).map((_) => d(v, _, f.get(_)));
    });
  } else {
    const p = x.group(o, n.accessor);
    h = st(n.domain, p.keys()).map(
      (v) => d(null, v, p.get(v) ?? [])
    );
  }
  if (n.domain = [...new Set(h.map((p) => p.label))], n.tickValues = Jt(n), s.domain ?? (s.domain = Nt(s.type, kt(h.flatMap((p) => p.values)))), a.accessor) {
    const p = h.map((v) => v.color).filter((v) => v != null);
    a.domain = st(a.domain, p), a.range ?? (a.range = lt(a.domain.length));
  }
  return { axes: { category: n, value: s, group: i, color: a }, boxes: h };
}
const ds = 12, us = {
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
}, re = 0.3, ps = 0.35, fs = 0.55, gs = "rgba(0,0,0,0.87)", Xt = 2, Et = 2.5, le = 0.45, ms = 0.9;
function ys(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class pn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...us, ...e }, this.highlight = new At(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = x.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const n = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = n.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = n.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new $t(t), this.draw();
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
    var ee;
    const { width: t, rowHeight: e, points: n, showCounts: s, threshold: i, rangePadding: a, border: l } = this.options, d = this.svg.node(), h = St(this.options.fontSize);
    this.tooltip.fontSize(h), this._leave();
    const { axes: p, boxes: v } = hs(this.options.data, this.options), { category: f, value: w, group: _, color: m } = p, k = f.format ?? String, S = _.format ?? String, z = w.format ?? x.format(".3~f"), $ = (u) => u.context != null ? `${u.context} / ` : "", T = (u) => s ? ` (n=${u.count})` : "", D = (u) => $(u) + k(u.label) + T(u), H = (u) => (u.group != null ? `${S(u.group)} / ` : "") + D(u), G = new Set(f.tickValues ?? f.domain), I = wt(w.type).domain(w.domain), W = Tt(I, w), X = w.format ?? I.tickFormat(w.ticks ?? void 0), U = (i == null ? void 0 : i.value) != null && i.value >= Math.min(...w.domain) && i.value <= Math.max(...w.domain), V = [];
    for (const u of v)
      u.group != null && u.group !== ((ee = V.at(-1)) == null ? void 0 : ee.group) && V.push({ group: u.group }), V.push({ group: u.group, box: u });
    const P = e * (V.length + 1), Y = x.scaleBand(x.range(V.length), [0, P]).paddingInner(re).paddingOuter((1 + re) / 2), c = Y.bandwidth();
    V.forEach((u, E) => {
      u.y = Y(E) + c / 2, u.box && (u.box.y = u.y);
    });
    const b = V.filter((u) => !u.box).map((u) => S(u.group)), L = Ct(f), g = Math.max(
      ft(v.map(D), h, d),
      ft(b, h, d, 600)
    ), y = {
      top: Math.max(
        U && i.label ? 2 * h + 8 : h,
        L ? Ht(h) : 0
      ),
      right: 16,
      bottom: h + 16 + gt(h, w.title),
      left: (L ? 0 : gt(h, f.title)) + g + ds
    }, A = t - y.left - y.right, O = y.top + P + y.bottom, R = I.range(w.range || [a, A - a]), K = m.accessor ? x.scaleOrdinal(m.domain, m.range) : () => Array.isArray(m.range) ? m.range[0] : lt(1)[0], { highlight: B } = this, j = (u, E) => B.includes(u.records[E], { color: u.color }, u), nt = new Map(
      v.map((u) => [u, !B.active || u.records.some((E, q) => j(u, q))])
    ), Z = (u) => m.accessor ? K(u.color) : K(), mt = (u) => nt.get(u) ? Z(u) : ut, yt = (u) => nt.get(u) ? m.accessor ? gs : Z(u) : ut, xt = m.accessor ? fs : ps, tt = v.filter((u) => u.count), ct = (u, E, q) => ({
      box: u,
      index: E,
      record: u.records[E],
      value: u.values[E],
      x: R(u.values[E]),
      y: q,
      lit: j(u, E)
    }), it = tt.flatMap(
      (u) => n ? u.values.map((E, q) => ct(u, q, u.y + ys(q) * c / 2)) : u.outliers.map((E) => ct(u, E, u.y))
    ), at = x.group(it, (u) => u.box), ht = (u) => u.lit ? Z(u.box) : ut;
    this.root.style("max-width", `${t}px`);
    const dt = tt.map((u) => `${H(u)}: median ${z(u.stats.median)}`).join("; "), et = this.svg.attr("viewBox", `0 0 ${t} ${O}`).attr(
      "aria-label",
      `Box plot of ${N(w, "value")} by ${N(f, "row")}. ${dt}`
    );
    et.selectAll("*").remove();
    const Q = et.append("g").attr("transform", `translate(${y.left},${y.top})`);
    Q.append("g").selectAll("line").data(W).join("line").attr("y2", P).attr("x1", (u) => R(u)).attr("x2", (u) => R(u)).attr("stroke", "rgba(0,0,0,0.08)");
    const rt = Q.append("g").attr("transform", `translate(0,${P})`).call(x.axisBottom(R).tickValues(W).tickFormat(X).tickSizeOuter(0));
    rt.attr("font-family", null).attr("font-size", h), rt.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), rt.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), rt.select(".domain").remove(), Q.append("path").attr("d", l ? `M0,0H${A}V${P}H0Z` : `M0,0V${P}H${A}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const M = Q.append("g").attr("font-size", h).selectAll("g").data(V.filter((u) => !u.box || G.has(u.box.label))).join("g").attr("transform", (u) => `translate(0,${u.y})`);
    if (M.append("line").attr("x1", -6).attr("x2", (u) => u.box ? 0 : A).attr("stroke", "rgba(0,0,0,0.5)"), M.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: u, box: E }) {
      const q = x.select(this);
      return E ? (E.context != null && q.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text($(E)), q.append("tspan").text(k(E.label)), s && q.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(T(E)), q) : q.attr("font-weight", 600).text(S(u));
    }), U) {
      const u = R(i.value);
      Q.append("line").attr("x1", u).attr("x2", u).attr("y1", 0).attr("y2", P).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), i.label && Q.append("text").attr("x", u).attr("y", -6).attr("text-anchor", "middle").attr("font-size", h).attr("fill", "rgba(0,0,0,0.6)").text(i.label);
    }
    const C = Q.append("g").selectAll("g").data(tt).join("g").attr("transform", (u) => `translate(0,${u.y - c / 2})`).attr("stroke", mt).attr("fill", mt);
    this.drawPoints(n ? it : [], {
      width: t,
      height: O,
      offset: [y.left, y.top],
      color: ht,
      emphasis: B.active
    }), C.append("line").attr("x1", (u) => R(u.stats.min)).attr("x2", (u) => R(u.stats.max)).attr("y1", c / 2).attr("y2", c / 2), C.selectAll(".cap").data((u) => [u.stats.min, u.stats.max]).join("line").attr("class", "cap").attr("x1", R).attr("x2", R).attr("y1", c * 0.25).attr("y2", c * 0.75), C.append("rect").attr("x", (u) => R(u.stats.q1)).attr("width", (u) => Math.max(1, R(u.stats.q3) - R(u.stats.q1))).attr("height", c).attr("fill-opacity", xt), C.append("line").attr("x1", (u) => R(u.stats.median)).attr("x2", (u) => R(u.stats.median)).attr("y1", 0).attr("y2", c).attr("stroke", yt).attr("stroke-width", 2), C.append("circle").attr("cx", (u) => R(u.stats.mean)).attr("cy", c / 2).attr("r", 3).attr("fill", yt), n || C.selectAll(".outlier").data((u) => at.get(u) ?? []).join("circle").attr("class", "outlier").attr("cx", (u) => u.x).attr("cy", c / 2).attr("r", Et).attr("fill", "#fff").attr("stroke", ht), this.hoverRing = Q.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (n ? Xt : Et) + 2.5).style("display", "none");
    const ot = (u) => et.append("text").attr("text-anchor", "middle").attr("font-size", h).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(u || "");
    ot(w.title).attr("x", y.left + A / 2).attr("y", O - h), L ? Ft(Q, f.title, { fontSize: h, color: "rgba(0,0,0,0.6)" }) : ot(f.title).attr(
      "transform",
      `translate(${h + 2},${y.top + P / 2}) rotate(-90)`
    ), vt(this.legend, K, {
      ...m,
      title: m.accessor ? m.title : null,
      fontSize: h,
      highlight: this.highlight
    });
    const { tooltip: J } = this.options, Ot = N(f, "row");
    this.hit = {
      margin: y,
      marks: it,
      delaunay: it.length ? x.Delaunay.from(
        it,
        (u) => u.x,
        (u) => u.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (u, E) => tt.find(
        (q) => Math.abs(E - q.y) <= c / 2 && u >= R(q.stats.min) - Et && u <= R(q.stats.max) + Et
      ) ?? null,
      markRows: (u) => {
        const E = [
          [Ot, H(u.box)],
          [N(w, "value"), z(u.value)]
        ];
        return J ? J(u.record, E, u.box) : E;
      },
      boxRows: (u) => {
        const E = u.stats, q = [
          [Ot, H(u)],
          ["n", String(u.count)],
          ["Median", z(E.median)],
          ["Mean", z(E.mean)],
          ["Q1", z(E.q1)],
          ["Q3", z(E.q3)],
          ["Whiskers", `${z(E.min)} to ${z(E.max)}`]
        ];
        return J ? J(null, q, u) : q;
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
  drawPoints(t, { width: e, height: n, offset: [s, i], color: a, emphasis: l }) {
    var w, _;
    this.canvas.style("display", t.length ? null : "none");
    const d = (_ = (w = this.canvas.node()).getContext) == null ? void 0 : _.call(w, "2d");
    if (!d) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(n * h)), d.setTransform(h, 0, 0, h, 0, 0), d.clearRect(0, 0, e, n);
    const p = (m, k, S) => {
      d.globalAlpha = S, d.fillStyle = m, d.beginPath();
      for (const z of k) {
        const $ = z.x + s, T = z.y + i;
        d.moveTo($ + Xt, T), d.arc($, T, Xt, 0, 2 * Math.PI);
      }
      d.fill();
    }, v = x.group(t, a), f = v.get(ut);
    f && p(ut, f, le);
    for (const [m, k] of v)
      m !== ut && p(m, k, l ? ms : le);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [n, s] = x.pointer(t, this.svg.node()), i = n - e.margin.left, a = s - e.margin.top, l = e.delaunay ? e.marks[e.delaunay.find(i, a)] : null;
    if (l && Math.hypot(l.x - i, l.y - a) <= e.radius) {
      this.hoverRing.style("display", null).attr("cx", l.x).attr("cy", l.y), this.tooltip.show(e.markRows(l), t, l), this._setHovered(l.record, l.box);
      return;
    }
    this.hoverRing.style("display", "none");
    const d = e.boxAt(i, a);
    if (d) {
      this.tooltip.show(e.boxRows(d), t, d), this._setHovered(null, d);
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
const xs = { field: null, title: null, format: null }, _s = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, vs = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function pt(o) {
  return o != null && o !== "" && !(typeof o == "number" && Number.isNaN(o));
}
function ws(o = [], t = {}) {
  var v;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((f) => F(xs, f)), s = F(_s, e.color), i = F(vs, e.radius), a = s.accessor ?? i.accessor, l = { key: "", label: "", level: -1, record: null, children: [] }, d = /* @__PURE__ */ new Map([[l.key, l]]);
  for (const f of o) {
    const w = [];
    for (const S of n) {
      const z = (v = S.accessor) == null ? void 0 : v.call(S, f);
      if (!pt(z)) break;
      w.push(z);
    }
    if (!w.length) continue;
    let _ = l;
    w.forEach((S, z) => {
      const $ = JSON.stringify(w.slice(0, z + 1));
      let T = d.get($);
      T || (T = { key: $, label: S, level: z, record: null, children: [] }, d.set($, T), _.children.push(T)), _ = T;
    });
    const m = _, k = a && !pt(a(m.record ?? {})) && pt(a(f));
    (!m.record || k) && (m.record = f);
  }
  const h = [...d.values()].filter((f) => f !== l);
  for (const f of h)
    f.value = f.record && a ? a(f.record) : null, f.empty = !f.record || a != null && !pt(f.value), f.colorValue = !f.empty && s.accessor ? s.accessor(f.record) : null, f.radiusValue = !f.empty && i.accessor ? i.accessor(f.record) : null;
  const p = h.filter((f) => !f.empty);
  if (s.accessor) {
    const f = p.map((w) => w.colorValue).filter(pt);
    s.type === "sequential" ? (s.domain ?? (s.domain = kt(f)), s.range ?? (s.range = x.interpolateViridis)) : (s.domain = st(s.domain, f), s.range ?? (s.range = lt(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = kt(p.map((f) => f.radiusValue).filter(pt)))), { axes: { color: s, radius: i }, levels: n, root: l, nodes: h };
}
const ce = 12, he = 2, bs = 1.5, ks = 2.9, Ls = 7, Wt = 1.1, de = 4, zt = 2, As = 3.3, Ss = 0.92, $s = (o) => typeof o == "number" ? x.format(".2f")(o) : String(o), Ms = { color: "#b4b2aa", radius: 6, label: null }, zs = {
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
function Ts(o, t, e, n) {
  const s = String(o ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const l of s) {
    const d = a ? `${a} ${l}` : l;
    a && Lt(d, e, n) > t ? (i.push(a), a = l) : a = d;
  }
  return a && i.push(a), i;
}
function Cs(o) {
  const { l: t } = x.lab(o);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class fn {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...zs, ...e }, this.highlight = new At(() => this._onHighlightChange()), this.hovered = null, this.root = x.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new $t(t), this.draw(), this._observeResize();
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
    var rt;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...Ms, ...this.options.empty }, i = St(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const l = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: d, levels: h, root: p } = ws(this.options.data, this.options);
    this.axes = d;
    const v = we(d.color), f = Se(d.radius), w = d.color.accessor ? d.color : d.radius, _ = w.format ?? $s, m = (r) => {
      const M = h[r.level];
      return M != null && M.format ? M.format(r.label) : r.label;
    };
    this._tooltipRows = (r) => {
      const M = [[N(h[r.level], `Level ${r.level + 1}`), m(r)]];
      return pt(r.value) && M.push([N(w, "value"), _(r.value)]), this.options.tooltip ? this.options.tooltip(r, M) : M;
    };
    const k = (r) => r.empty ? s.color : d.color.accessor ? v(r.colorValue) : v(), S = (r) => r.empty || d.radius.accessor && d.radius.type !== "constant" && !pt(r.radiusValue) ? s.radius : f(r.radiusValue), z = (r) => this.highlight.color(k(r.data), r.data, { color: r.data.colorValue }), $ = x.hierarchy(p), T = $.descendants().filter((r) => r.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      v,
      i,
      s,
      T.some((r) => r.data.empty)
    ), !T.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const D = Wt * i, H = /* @__PURE__ */ new Map();
    for (const r of T) {
      const M = h[r.depth - 1], C = M != null && M.format ? M.format(r.data.label) : r.data.label, ot = Ts(C, Ls * i, i, l), J = Math.max(0, ...ot.map((Ot) => Lt(Ot, i, l)));
      H.set(r, { lines: ot, width: J, height: ot.length * D });
    }
    const G = (r) => S(r.data), I = (r) => Math.max(G(r), H.get(r).height / 2), W = (r) => G(r) + de + H.get(r).width + zt, X = $.height || 1, U = T.filter((r) => !r.children && r.depth === X), V = Math.ceil(Math.max(0, ...U.map(W))), P = Math.max(0, ...T.filter((r) => r.depth === 1 && r.children).map(W));
    let Y = ce, c = t;
    for (let r = 0; r < 3; r += 1)
      c = Math.max(1, Math.min(t, (a - Y - V) / X)), Y = Math.max(ce, Math.ceil(P - c));
    const b = Math.round(ks * i);
    x.tree().nodeSize([1, c]).separation((r, M) => {
      const C = I(r) + I(M) + he;
      return r.parent === M.parent ? C : C * bs;
    })($);
    let L = 1 / 0, g = -1 / 0, y = 0;
    for (const r of T)
      L = Math.min(L, r.x), g = Math.max(g, r.x), y = Math.max(y, I(r));
    const A = g - L, O = y + he, R = b + A + O * 2, K = Math.max(this.options.height, Math.ceil(R)), B = K - b, j = A > 0 ? (B - O * 2) / A : 1, nt = b + (B - A * j) / 2, Z = (r) => (r.x - L) * j, mt = (r) => r.depth === 0 ? c - As * i : r.y, yt = this.svg.attr("width", a).attr("height", K).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((r, M) => N(r, `level ${M + 1}`)).join(", then ")}: ${T.length} nodes`
    ), xt = yt.append("g").attr("transform", `translate(${Y},${nt})`), tt = /* @__PURE__ */ new Map();
    for (const r of T)
      tt.has(r.depth) || tt.set(r.depth, ((rt = h[r.depth - 1]) == null ? void 0 : rt.title) ?? "");
    yt.append("g").selectAll("text").data([...tt]).join("text").attr("class", "tree-chart__header").attr("x", ([r]) => Y + r * c).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, r]) => r);
    const ct = $.children.length > 1, it = xt.append("g").selectAll("path").data($.links().filter((r) => ct || r.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", x.linkHorizontal().x(mt).y(Z)), at = xt.append("g").selectAll("g").data(T).join("g").attr("class", "tree-chart__node").attr("transform", (r) => `translate(${r.y},${Z(r)})`);
    at.append("circle").attr("class", "tree-chart__circle").attr("r", G).attr("fill", z), n && at.filter((r) => pt(r.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * Ss).attr("fill", (r) => Cs(z(r))).text((r) => _(r.data.value));
    const ht = (r) => !!r.children, dt = (r) => (ht(r) ? -1 : 1) * (G(r) + de), et = at.filter((r) => H.get(r).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (r) => r.data.empty);
    et.append("rect").attr("class", "tree-chart__label-bg").attr("x", (r) => {
      const { width: M } = H.get(r);
      return (ht(r) ? dt(r) - M : dt(r)) - zt;
    }).attr("y", (r) => -H.get(r).height / 2 - zt).attr("width", (r) => H.get(r).width + zt * 2).attr("height", (r) => H.get(r).height + zt * 2), et.append("text").attr("text-anchor", (r) => ht(r) ? "end" : "start").selectAll("tspan").data((r) => {
      const { lines: M } = H.get(r);
      return M.map((C, ot) => ({ line: C, i: ot, count: M.length, x: dt(r) }));
    }).join("tspan").attr("x", (r) => r.x).attr(
      "dy",
      (r) => r.i === 0 ? `${0.31 - (r.count - 1) * Wt / 2}em` : `${Wt}em`
    ).text((r) => r.line);
    const Q = (r) => {
      if (!e) return;
      const M = r && /* @__PURE__ */ new Set([...r.ancestors(), ...r.descendants()]), C = (J) => !!(M && M.has(J)), ot = (J) => C(J.source) && C(J.target);
      at.classed("tree-chart__node--off-path", (J) => !!M && !C(J)), it.classed("tree-chart__link--on-path", ot).classed("tree-chart__link--off-path", (J) => !!M && !ot(J));
    };
    at.on("mouseenter", (r, M) => {
      Q(M), this._setHovered(M.data, r);
    }).on("mousemove", (r) => this.tooltip.move(r)).on("mouseleave", () => {
      Q(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Ee(this.legend, t, a) : vt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const l = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    l.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), l.append("span").text(n.label);
  }
}
function ue(o, t) {
  let e;
  if (t === void 0)
    for (const n of o)
      n != null && (e < n || e === void 0 && n >= n) && (e = n);
  else {
    let n = -1;
    for (let s of o)
      (s = t(s, ++n, o)) != null && (e < s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function Hs(o, t) {
  let e;
  if (t === void 0)
    for (const n of o)
      n != null && (e > n || e === void 0 && n >= n) && (e = n);
  else {
    let n = -1;
    for (let s of o)
      (s = t(s, ++n, o)) != null && (e > s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function Ut(o, t) {
  let e = 0;
  if (t === void 0)
    for (let n of o)
      (n = +n) && (e += n);
  else {
    let n = -1;
    for (let s of o)
      (s = +t(s, ++n, o)) && (e += s);
  }
  return e;
}
function Os(o, t) {
  return o.sourceLinks.length ? o.depth : t - 1;
}
function Rt(o) {
  return function() {
    return o;
  };
}
function pe(o, t) {
  return Dt(o.source, t.source) || o.index - t.index;
}
function fe(o, t) {
  return Dt(o.target, t.target) || o.index - t.index;
}
function Dt(o, t) {
  return o.y0 - t.y0;
}
function Yt(o) {
  return o.value;
}
function Es(o) {
  return o.index;
}
function Rs(o) {
  return o.nodes;
}
function Ps(o) {
  return o.links;
}
function ge(o, t) {
  const e = o.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function me({ nodes: o }) {
  for (const t of o) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function Is() {
  let o = 0, t = 0, e = 1, n = 1, s = 24, i = 8, a, l = Es, d = Os, h, p, v = Rs, f = Ps, w = 6;
  function _() {
    const c = { nodes: v.apply(null, arguments), links: f.apply(null, arguments) };
    return m(c), k(c), S(c), z(c), D(c), me(c), c;
  }
  _.update = function(c) {
    return me(c), c;
  }, _.nodeId = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : Rt(c), _) : l;
  }, _.nodeAlign = function(c) {
    return arguments.length ? (d = typeof c == "function" ? c : Rt(c), _) : d;
  }, _.nodeSort = function(c) {
    return arguments.length ? (h = c, _) : h;
  }, _.nodeWidth = function(c) {
    return arguments.length ? (s = +c, _) : s;
  }, _.nodePadding = function(c) {
    return arguments.length ? (i = a = +c, _) : i;
  }, _.nodes = function(c) {
    return arguments.length ? (v = typeof c == "function" ? c : Rt(c), _) : v;
  }, _.links = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : Rt(c), _) : f;
  }, _.linkSort = function(c) {
    return arguments.length ? (p = c, _) : p;
  }, _.size = function(c) {
    return arguments.length ? (o = t = 0, e = +c[0], n = +c[1], _) : [e - o, n - t];
  }, _.extent = function(c) {
    return arguments.length ? (o = +c[0][0], e = +c[1][0], t = +c[0][1], n = +c[1][1], _) : [[o, t], [e, n]];
  }, _.iterations = function(c) {
    return arguments.length ? (w = +c, _) : w;
  };
  function m({ nodes: c, links: b }) {
    for (const [g, y] of c.entries())
      y.index = g, y.sourceLinks = [], y.targetLinks = [];
    const L = new Map(c.map((g, y) => [l(g, y, c), g]));
    for (const [g, y] of b.entries()) {
      y.index = g;
      let { source: A, target: O } = y;
      typeof A != "object" && (A = y.source = ge(L, A)), typeof O != "object" && (O = y.target = ge(L, O)), A.sourceLinks.push(y), O.targetLinks.push(y);
    }
    if (p != null)
      for (const { sourceLinks: g, targetLinks: y } of c)
        g.sort(p), y.sort(p);
  }
  function k({ nodes: c }) {
    for (const b of c)
      b.value = b.fixedValue === void 0 ? Math.max(Ut(b.sourceLinks, Yt), Ut(b.targetLinks, Yt)) : b.fixedValue;
  }
  function S({ nodes: c }) {
    const b = c.length;
    let L = new Set(c), g = /* @__PURE__ */ new Set(), y = 0;
    for (; L.size; ) {
      for (const A of L) {
        A.depth = y;
        for (const { target: O } of A.sourceLinks)
          g.add(O);
      }
      if (++y > b) throw new Error("circular link");
      L = g, g = /* @__PURE__ */ new Set();
    }
  }
  function z({ nodes: c }) {
    const b = c.length;
    let L = new Set(c), g = /* @__PURE__ */ new Set(), y = 0;
    for (; L.size; ) {
      for (const A of L) {
        A.height = y;
        for (const { source: O } of A.targetLinks)
          g.add(O);
      }
      if (++y > b) throw new Error("circular link");
      L = g, g = /* @__PURE__ */ new Set();
    }
  }
  function $({ nodes: c }) {
    const b = ue(c, (y) => y.depth) + 1, L = (e - o - s) / (b - 1), g = new Array(b);
    for (const y of c) {
      const A = Math.max(0, Math.min(b - 1, Math.floor(d.call(null, y, b))));
      y.layer = A, y.x0 = o + A * L, y.x1 = y.x0 + s, g[A] ? g[A].push(y) : g[A] = [y];
    }
    if (h) for (const y of g)
      y.sort(h);
    return g;
  }
  function T(c) {
    const b = Hs(c, (L) => (n - t - (L.length - 1) * a) / Ut(L, Yt));
    for (const L of c) {
      let g = t;
      for (const y of L) {
        y.y0 = g, y.y1 = g + y.value * b, g = y.y1 + a;
        for (const A of y.sourceLinks)
          A.width = A.value * b;
      }
      g = (n - g + a) / (L.length + 1);
      for (let y = 0; y < L.length; ++y) {
        const A = L[y];
        A.y0 += g * (y + 1), A.y1 += g * (y + 1);
      }
      V(L);
    }
  }
  function D(c) {
    const b = $(c);
    a = Math.min(i, (n - t) / (ue(b, (L) => L.length) - 1)), T(b);
    for (let L = 0; L < w; ++L) {
      const g = Math.pow(0.99, L), y = Math.max(1 - g, (L + 1) / w);
      G(b, g, y), H(b, g, y);
    }
  }
  function H(c, b, L) {
    for (let g = 1, y = c.length; g < y; ++g) {
      const A = c[g];
      for (const O of A) {
        let R = 0, K = 0;
        for (const { source: j, value: nt } of O.targetLinks) {
          let Z = nt * (O.layer - j.layer);
          R += P(j, O) * Z, K += Z;
        }
        if (!(K > 0)) continue;
        let B = (R / K - O.y0) * b;
        O.y0 += B, O.y1 += B, U(O);
      }
      h === void 0 && A.sort(Dt), I(A, L);
    }
  }
  function G(c, b, L) {
    for (let g = c.length, y = g - 2; y >= 0; --y) {
      const A = c[y];
      for (const O of A) {
        let R = 0, K = 0;
        for (const { target: j, value: nt } of O.sourceLinks) {
          let Z = nt * (j.layer - O.layer);
          R += Y(O, j) * Z, K += Z;
        }
        if (!(K > 0)) continue;
        let B = (R / K - O.y0) * b;
        O.y0 += B, O.y1 += B, U(O);
      }
      h === void 0 && A.sort(Dt), I(A, L);
    }
  }
  function I(c, b) {
    const L = c.length >> 1, g = c[L];
    X(c, g.y0 - a, L - 1, b), W(c, g.y1 + a, L + 1, b), X(c, n, c.length - 1, b), W(c, t, 0, b);
  }
  function W(c, b, L, g) {
    for (; L < c.length; ++L) {
      const y = c[L], A = (b - y.y0) * g;
      A > 1e-6 && (y.y0 += A, y.y1 += A), b = y.y1 + a;
    }
  }
  function X(c, b, L, g) {
    for (; L >= 0; --L) {
      const y = c[L], A = (y.y1 - b) * g;
      A > 1e-6 && (y.y0 -= A, y.y1 -= A), b = y.y0 - a;
    }
  }
  function U({ sourceLinks: c, targetLinks: b }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: L } } of b)
        L.sort(fe);
      for (const { target: { targetLinks: L } } of c)
        L.sort(pe);
    }
  }
  function V(c) {
    if (p === void 0)
      for (const { sourceLinks: b, targetLinks: L } of c)
        b.sort(fe), L.sort(pe);
  }
  function P(c, b) {
    let L = c.y0 - (c.sourceLinks.length - 1) * a / 2;
    for (const { target: g, width: y } of c.sourceLinks) {
      if (g === b) break;
      L += y + a;
    }
    for (const { source: g, width: y } of b.targetLinks) {
      if (g === c) break;
      L -= y;
    }
    return L;
  }
  function Y(c, b) {
    let L = b.y0 - (b.targetLinks.length - 1) * a / 2;
    for (const { source: g, width: y } of b.targetLinks) {
      if (g === c) break;
      L += y + a;
    }
    for (const { target: g, width: y } of c.sourceLinks) {
      if (g === b) break;
      L -= y;
    }
    return L;
  }
  return _;
}
var Kt = Math.PI, Zt = 2 * Kt, _t = 1e-6, Bs = Zt - _t;
function Qt() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Le() {
  return new Qt();
}
Qt.prototype = Le.prototype = {
  constructor: Qt,
  moveTo: function(o, t) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(o, t) {
    this._ += "L" + (this._x1 = +o) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(o, t, e, n) {
    this._ += "Q" + +o + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +n);
  },
  bezierCurveTo: function(o, t, e, n, s, i) {
    this._ += "C" + +o + "," + +t + "," + +e + "," + +n + "," + (this._x1 = +s) + "," + (this._y1 = +i);
  },
  arcTo: function(o, t, e, n, s) {
    o = +o, t = +t, e = +e, n = +n, s = +s;
    var i = this._x1, a = this._y1, l = e - o, d = n - t, h = i - o, p = a - t, v = h * h + p * p;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = o) + "," + (this._y1 = t);
    else if (v > _t) if (!(Math.abs(p * l - d * h) > _t) || !s)
      this._ += "L" + (this._x1 = o) + "," + (this._y1 = t);
    else {
      var f = e - i, w = n - a, _ = l * l + d * d, m = f * f + w * w, k = Math.sqrt(_), S = Math.sqrt(v), z = s * Math.tan((Kt - Math.acos((_ + v - m) / (2 * k * S))) / 2), $ = z / S, T = z / k;
      Math.abs($ - 1) > _t && (this._ += "L" + (o + $ * h) + "," + (t + $ * p)), this._ += "A" + s + "," + s + ",0,0," + +(p * f > h * w) + "," + (this._x1 = o + T * l) + "," + (this._y1 = t + T * d);
    }
  },
  arc: function(o, t, e, n, s, i) {
    o = +o, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(n), l = e * Math.sin(n), d = o + a, h = t + l, p = 1 ^ i, v = i ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + d + "," + h : (Math.abs(this._x1 - d) > _t || Math.abs(this._y1 - h) > _t) && (this._ += "L" + d + "," + h), e && (v < 0 && (v = v % Zt + Zt), v > Bs ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (o - a) + "," + (t - l) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = d) + "," + (this._y1 = h) : v > _t && (this._ += "A" + e + "," + e + ",0," + +(v >= Kt) + "," + p + "," + (this._x1 = o + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(o, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function ye(o) {
  return function() {
    return o;
  };
}
function Vs(o) {
  return o[0];
}
function Ds(o) {
  return o[1];
}
var Ns = Array.prototype.slice;
function Fs(o) {
  return o.source;
}
function js(o) {
  return o.target;
}
function qs(o) {
  var t = Fs, e = js, n = Vs, s = Ds, i = null;
  function a() {
    var l, d = Ns.call(arguments), h = t.apply(this, d), p = e.apply(this, d);
    if (i || (i = l = Le()), o(i, +n.apply(this, (d[0] = h, d)), +s.apply(this, d), +n.apply(this, (d[0] = p, d)), +s.apply(this, d)), l) return i = null, l + "" || null;
  }
  return a.source = function(l) {
    return arguments.length ? (t = l, a) : t;
  }, a.target = function(l) {
    return arguments.length ? (e = l, a) : e;
  }, a.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : ye(+l), a) : n;
  }, a.y = function(l) {
    return arguments.length ? (s = typeof l == "function" ? l : ye(+l), a) : s;
  }, a.context = function(l) {
    return arguments.length ? (i = l ?? null, a) : i;
  }, a;
}
function Gs(o, t, e, n, s) {
  o.moveTo(t, e), o.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function Xs() {
  return qs(Gs);
}
function Ws(o) {
  return [o.source.x1, o.y0];
}
function Us(o) {
  return [o.target.x0, o.y1];
}
function Ys() {
  return Xs().source(Ws).target(Us);
}
const Ks = "(blank)", Zs = { field: null, title: null, domain: null, format: null, sort: "descending" }, Qs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, Pt = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? Ks : String(e);
};
function Js(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function tn(o = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((m) => F(Zs, m)), n = F(Qs, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((m) => m.field != null && m.field === n.field), i = Math.max(0, s), a = e.map((m, k) => {
    const S = x.rollup(
      o,
      ($) => $.length,
      ($) => Pt(m.accessor, $)
    ), z = Js(S, m).map(($, T) => ({
      id: -1,
      dim: k,
      index: T,
      key: $,
      label: m.format ? m.format($) : $,
      count: S.get($)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: k,
      nodes: z,
      byKey: new Map(z.map(($) => [$.key, $]))
    };
  }), l = a.flatMap((m) => m.nodes);
  l.forEach((m, k) => {
    m.id = k;
  });
  const d = (m) => e.map((k) => Pt(k.accessor, m)).join("\0"), h = x.rollups(o, (m) => m, d).map(([, m]) => {
    const k = e.map((z) => Pt(z.accessor, m[0])), S = k.map((z, $) => a[$].byKey.get(z));
    return {
      keys: k,
      labels: S.map((z) => z.label),
      nodes: S,
      records: m,
      value: m.length
    };
  }), p = [i, ...e.map((m, k) => k).filter((m) => m !== i)];
  h.sort((m, k) => {
    for (const S of p) {
      const z = m.nodes[S].index - k.nodes[S].index;
      if (z) return z;
    }
    return 0;
  });
  const v = [];
  for (const m of h)
    for (let k = 1; k < e.length; k++)
      v.push({
        source: m.nodes[k - 1].id,
        target: m.nodes[k].id,
        pair: k - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const f = a[i], w = e[i];
  return w && (n.field ?? (n.field = w.field), n.accessor = (m) => Pt(w.accessor, m), n.format ?? (n.format = w.format)), n.domain = st(
    n.domain,
    f ? f.nodes.map((m) => m.key) : []
  ), n.range ?? (n.range = lt(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: k, nodes: S }) => ({
      title: m,
      index: k,
      nodes: S
    })),
    nodes: l,
    paths: h,
    links: v,
    total: o.length
  };
}
const en = 2.3, xe = 5, _e = 6, sn = 2, It = 6, Bt = 0.92, nn = "#333", on = {
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
class gn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...on, ...e }, this.highlight = new At(() => this._onHighlightChange()), this.hovered = null, this.root = x.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new $t(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: i } = this.options, a = St(this.options.fontSize), l = this.options.width ?? (this.container.clientWidth || 640);
    this.width = l, this.tooltip.fontSize(a);
    const d = tn(this.options.data, this.options);
    this.prepared = d;
    const { axes: h, columns: p, colorIndex: v, total: f } = d, w = we(h.color), _ = (c) => this.highlight.includes(c, { color: c.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(w, a), !d.nodes.length || p.length < 2) {
      this.svg.attr("width", l).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), k = p[p.length - 1], S = (c) => Lt(`${c.label} `, a, m) + Lt(c.count, a * Bt, m), z = Math.ceil(
      Math.max(
        Lt(k.title, a * Bt, m, 600),
        ...k.nodes.map(S)
      )
    ) + _e + sn, $ = Math.round(en * a), T = Math.max(l - z, t * p.length), D = [
      [0, $ + xe],
      [T, $ + this.options.height - xe]
    ], H = Is().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(D)({
      nodes: d.nodes.map((c) => ({ ...c })),
      links: d.links.map((c) => ({ ...c }))
    });
    n && an(H.nodes, p.length, D[0][1], D[1][1]);
    const G = Ys(), I = (c) => c.x1 + _e, W = (c) => c.dim === v ? this.highlight.color(w(c.key), c, { color: c.key }) : !this.highlight.active || c.sourceLinks.some(_) || c.targetLinks.some(_) ? nn : ut, X = this.svg.attr("width", l).attr("height", $ + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${f} ${i} across ${p.map((c) => c.title).join(", ")}`
    ), U = (c) => H.nodes.find((b) => b.dim === c.index);
    X.append("g").selectAll("text").data(p.filter(U)).join("text").attr("class", "parallel-sets__header").attr("x", (c) => I(U(c))).attr("y", $ - a * 0.9).attr("text-anchor", "start").attr("font-size", a * Bt).text((c) => c.title);
    const V = X.append("g").attr("fill", "none").selectAll("path").data(H.links).join("path").attr("class", "parallel-sets__link").attr("d", G).attr("stroke", (c) => this.highlight.color(w(c.colorKey), c, { color: c.colorKey })).attr("stroke-width", (c) => Math.max(c.width, 1)), P = X.append("g").selectAll("g").data(H.nodes).join("g").attr("class", "parallel-sets__node");
    P.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (c) => c.x0).attr("y", (c) => c.y0).attr("width", (c) => c.x1 - c.x0).attr("height", (c) => Math.max(c.y1 - c.y0, 1)).attr("fill", W), P.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (c) => c.x0 - It).attr("y", (c) => c.y0 - It / 2).attr("width", (c) => c.x1 - c.x0 + It * 2).attr("height", (c) => Math.max(c.y1 - c.y0, 1) + It), P.append("text").attr("class", "parallel-sets__label").attr("x", I).attr("y", (c) => (c.y0 + c.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((c) => `${c.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * Bt).text((c) => c.count), s && this._bindHover(P, V, H);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  /**
   * Node hover: every strand through that node. Link hover: every strand sharing
   * the hovered link's category path up to its target column, i.e. the whole
   * visible band between those two nodes, traced across the chart.
   */
  _bindHover(t, e, n) {
    const s = (a) => {
      const l = this.hovered;
      return l ? l.type === "link" ? l.keys.every((d, h) => a.keys[h] === d) : a.keys[l.node.dim] === l.node.key : !0;
    }, i = () => {
      const a = this.hovered != null, l = /* @__PURE__ */ new Set();
      if (a)
        for (const d of n.links)
          s(d) && (l.add(d.source.id), l.add(d.target.id));
      e.classed("parallel-sets__link--active", (d) => a && s(d)).classed("parallel-sets__link--muted", (d) => a && !s(d)), t.classed("parallel-sets__node--muted", (d) => a && !l.has(d.id));
    };
    this._applyHover = i, t.on("mouseenter", (a, l) => {
      const d = { type: "node", node: l };
      this._setHovered(d), this.tooltip.show(this._nodeTooltip(d), a, l);
    }).on("mousemove", (a) => this.tooltip.move(a)), e.on("mouseenter", (a, l) => {
      const d = l.keys.slice(0, l.pair + 2), h = n.links.filter((f) => f.pair === l.pair && d.every((w, _) => f.keys[_] === w)).reduce((f, w) => f + w.value, 0), p = l.labels.slice(0, d.length), v = { type: "link", keys: d, labels: p, pair: l.pair, value: h };
      this._setHovered(v), this.tooltip.show(this._linkTooltip(v), a, l);
    }).on("mousemove", (a) => this.tooltip.move(a));
  }
  // The hovered target: applies the emphasis, hides the tooltip when nothing is
  // hovered, and reports a change through onHover
  _setHovered(t) {
    var n, s, i;
    const e = t !== this.hovered;
    this.hovered = t, (n = this._applyHover) == null || n.call(this), t || this.tooltip.hide(), e && ((i = (s = this.options).onHover) == null || i.call(s, t));
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
    vt(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function an(o, t, e, n) {
  for (let s = 0; s < t; s++) {
    const i = o.filter((h) => h.dim === s).sort((h, p) => h.y0 - p.y0);
    if (i.length < 2) continue;
    const a = i.reduce((h, p) => h + (p.y1 - p.y0), 0), l = (n - e - a) / (i.length - 1);
    let d = e;
    for (const h of i) {
      const p = h.y1 - h.y0;
      h.y0 = d, h.y1 = d + p, d += p + l;
    }
  }
  for (const s of o) {
    let i = s.y0;
    for (const l of s.sourceLinks)
      l.y0 = i + l.width / 2, i += l.width;
    let a = s.y0;
    for (const l of s.targetLinks)
      l.y1 = a + l.width / 2, a += l.width;
  }
}
export {
  cn as BarChart,
  pn as BoxPlotChart,
  se as FONT_SIZES,
  At as Highlight,
  ut as MUTED_COLOR,
  gn as ParallelSetsChart,
  un as ScatterPlot,
  dn as StackedBarChart,
  $t as Tooltip,
  fn as TreeChart,
  Vt as barLabel,
  ls as boxStats,
  rn as categoryColors,
  ln as countBy,
  hn as countByStacked,
  lt as defaultColors,
  vt as drawLegend,
  Ee as drawSequentialLegend,
  Ft as drawTopTitle,
  pt as hasValue,
  ft as maxTextWidth,
  Lt as measureText,
  Ce as prepareBarChart,
  hs as prepareBoxPlotChart,
  tn as prepareParallelSets,
  Je as prepareScatterPlot,
  qe as prepareStackedBarChart,
  ws as prepareTreeChart,
  St as resolveFontSize,
  gt as titleLane,
  Ct as titleOnTop,
  Ht as topTitleLane
};
