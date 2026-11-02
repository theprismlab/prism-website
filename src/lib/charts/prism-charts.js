import * as b from "d3";
const De = [
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
function ft(o) {
  return o <= b.schemeTableau10.length ? b.schemeTableau10 : De;
}
function bn(o, t) {
  const e = b.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: n, range: ft(n.length) };
}
function ze(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function q(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = ze(e.field), e;
}
function G(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function at(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function ie(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function St(o) {
  switch (o) {
    case "log":
      return b.scaleLog();
    case "sqrt":
      return b.scaleSqrt();
    default:
      return b.scaleLinear();
  }
}
function Mt(o, t = [0, 1]) {
  const [e, n] = b.extent(o);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function Ut(o, t, e) {
  return St(o).domain(t).nice(e ?? void 0).domain();
}
function Pt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function $t(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
function Te(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : ft(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : b.interpolateRgbBasis(o.range);
    return b.scaleSequential(o.domain, t);
  }
  return b.scaleOrdinal(o.domain, o.range);
}
function Ve(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : St(o.type).domain(o.domain).range(o.range);
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
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ge = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function wn(o, t, { sort: e, group: n } = {}) {
  const s = (a) => (l) => l[a] || "(blank)", i = (a, l) => {
    const c = b.rollup(a, (p) => p.length, s(t)), h = Array.from(
      c,
      ([p, x]) => n == null ? { label: p, count: x } : { group: l, label: p, count: x }
    );
    return e === "descending" ? h.sort((p, x) => x.count - p.count) : e === "ascending" && h.sort((p, x) => p.count - x.count), h;
  };
  return n == null ? i(o) : Array.from(
    b.group(o, s(n)),
    ([a, l]) => i(l, a)
  ).flat();
}
function Xt(o, t, e = "both") {
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
function qe(o = [], t = {}) {
  const e = t.axis ?? {}, n = t.orientation === "horizontal", s = q(Ne, e.category ?? (n ? e.y : e.x)), i = q(Fe, e.value ?? (n ? e.x : e.y)), a = q(je, e.group), l = q(Ge, e.color), c = l.accessor ?? s.accessor, h = (f) => ({
    count: b.sum(f, i.accessor),
    color: c(f[0])
  });
  let p;
  if (a.accessor) {
    const f = b.rollup(o, h, a.accessor, s.accessor);
    a.domain = at(a.domain, f.keys()), p = a.domain.flatMap((k) => {
      const _ = f.get(k) ?? /* @__PURE__ */ new Map();
      return at(s.domain, _.keys()).filter((m) => _.has(m)).map((m) => ({ group: k, label: m, ..._.get(m) }));
    }), s.domain = [...new Set(p.map((k) => k.label))];
  } else {
    const f = b.rollup(o, h, s.accessor);
    s.domain = at(s.domain, f.keys()), p = s.domain.map((k) => {
      var _, m;
      return {
        group: null,
        label: k,
        count: ((_ = f.get(k)) == null ? void 0 : _.count) ?? 0,
        color: ((m = f.get(k)) == null ? void 0 : m.color) ?? k
      };
    });
  }
  s.tickValues = ie(s), i.domain ?? (i.domain = Ut(i.type, [0, b.max(p, (f) => f.count) || 1], i.ticks)), l.domain = at(
    l.domain,
    p.map((f) => f.color)
  ), l.range ?? (l.range = ft(l.domain.length));
  const x = t.total ?? b.sum(p, (f) => f.count);
  return { axes: { category: s, value: i, group: a, color: l }, bars: p, total: x };
}
const xt = "#cfcfcf";
class Tt {
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
    return this.includes(e, n, s) ? t : xt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Xe = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function At(o, t, e) {
  const { title: n, tickValues: s, fontSize: i, highlight: a, dimension: l = "color" } = e, c = e.format ?? ((w) => w), h = e.key ?? ((w) => w), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", x = (w) => Xe.has(p(w)) ? p(w) : "square";
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const f = a != null, k = (w) => f && a.active && !a.isSelected(l, h(w)), _ = (w, $) => a.toggle(l, h($), { extend: w.shiftKey || w.metaKey }), m = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", f).classed("chart-legend__item--muted", k);
  f && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (w) => a.isSelected(l, h(w))).on("click", _).on("keydown", (w, $) => {
    w.key !== "Enter" && w.key !== " " || (w.preventDefault(), _(w, $));
  }), m.append("i").attr("class", (w) => `chart-legend__swatch chart-legend__swatch--${x(w)}`).style("color", (w) => k(w) ? xt : t(w)), m.append("span").text((w) => c(w));
}
let We = 0;
function Ue(o, t, e) {
  const { title: n, fontSize: s, width: i = 160 } = e;
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  const a = s ?? 12;
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const [l, c] = t.domain(), h = Math.ceil(a * 1.5), p = Math.round(a * 0.67), x = o.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), f = `chart-legend-ramp-${We += 1}`;
  x.append("linearGradient").attr("id", f).selectAll("stop").data(b.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(l + m * (c - l)));
  const k = x.append("g").attr("transform", `translate(${h},0)`);
  k.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${f})`);
  const _ = b.axisBottom(b.scaleLinear([l, c], [0, i]));
  k.append("g").attr("transform", `translate(0,${p})`).call($t(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const he = { small: 10, medium: 12, large: 14 };
function Ct(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in he)) throw new Error(`Unknown chart font size "${o}"`);
  return he[o];
}
function bt(o, t) {
  return t ? o + 16 : 0;
}
const Ye = 0.5, Ke = 0.72, Ze = 5, Ce = 8;
function It(o) {
  return !!o.title && o.titlePosition === "top";
}
function Bt(o) {
  return o * 1.5 + Ce;
}
function Yt(o, t, { fontSize: e, color: n }) {
  const s = e * Ye, i = -(e / 2 + Ce), a = o.append("g").attr("class", "axis-title axis-title--top"), l = a.append("text").attr("x", s + Ze).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), c = s / 2, h = s / 2, p = i - e * Ke, x = a.append("path").attr("d", `M${c},${i}V${p}M${c - h},${p + h}L${c},${p}L${c + h},${p + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (l.attr("fill", n), x.attr("stroke", n)), a;
}
let Et;
const Qe = 0.55;
function zt(o, t, e, n = 400) {
  if (Et === void 0 && (Et = document.createElement("canvas").getContext("2d")), !Et) return String(o).length * t * Qe;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Et.font = `${n} ${t}px ${s}`, Et.measureText(String(o)).width;
}
function vt(o, t, e, n) {
  let s = 0;
  for (const i of o)
    s = Math.max(s, zt(i, t, e, n));
  return s;
}
class Ht {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = b.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
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
    const [e, n] = b.pointer(t, this.root), s = this.div.node(), i = 14, a = e + i + s.offsetWidth > this.root.clientWidth ? e - i - s.offsetWidth : e + i, l = n + i + s.offsetHeight > this.root.clientHeight ? n - i - s.offsetHeight : n + i;
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
const de = 12, ue = 6, Vt = 6, Kt = 0.85, Je = "rgba(0,0,0,0.55)", pe = "rgba(0,0,0,0.6)", ts = {
  data: [],
  orientation: "vertical",
  total: null,
  barLabel: "both",
  axis: {},
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28,
  groupPadding: null,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
};
class kn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...ts, ...e }, this.highlight = new Tt(() => this._onHighlightChange()), this.hovered = null, this.root = b.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Ht(t), this.draw();
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
  /**
   * The layout is the same whichever way the chart is turned: lanes along the
   * category axis, one per bar, and the counts along the value axis. Everything
   * is placed in those terms, as a position `along` the category axis and one
   * `across` it (a screen position on the value axis), and `at` maps the pair to
   * screen coordinates: the one place the orientation turns the layout.
   */
  draw() {
    var ce;
    const { width: t, rowHeight: e, groupPadding: n } = this.options, s = this.options.orientation === "horizontal", i = this.svg.node(), a = Ct(this.options.fontSize);
    this.tooltip.fontSize(a), this._setHovered(null);
    const { axes: l, bars: c, total: h } = qe(this.options.data, this.options), { category: p, value: x, group: f, color: k } = l, _ = !!f.accessor, m = p.domain, w = p.format ?? String, $ = f.format ?? String, z = (v) => (_ ? `${$(v.group)} / ` : "") + w(v.label), M = this.options.barLabel !== "none", C = (v) => Xt(v.count, h, this.options.barLabel);
    this._tooltipRows = (v) => {
      const B = Xt(v.count, h, "percent"), ct = [
        [G(p, "category"), w(v.label)],
        [G(x, "count"), `${v.count} of ${h} (${B})`]
      ];
      return _ && ct.unshift([G(f, "group"), $(v.group)]), this.options.tooltip ? this.options.tooltip(v, ct) : ct;
    };
    const F = St(x.type).domain(x.domain), O = Pt(F, x), Z = x.format ?? F.tickFormat(x.ticks ?? void 0), Y = new Set(p.tickValues ?? m), D = [];
    for (const v of c)
      _ && v.group !== ((ce = D.at(-1)) == null ? void 0 : ce.group) && D.push({ group: v.group }), D.push({ group: v.group, bar: v });
    const et = _ ? f.domain.map($) : [], j = s ? 0.3 : 0.35, V = _ ? (n ?? j) / 2 : 0, I = j, nt = _ ? (1 + j) / 2 + V : j;
    let r = 0;
    const A = D.map((v, B) => {
      _ && B > 0 && !v.bar && (r += V);
      const ct = r;
      return r += 1, _ && !v.bar && (r += V), ct;
    }), L = I + r - j + nt, g = (I + (1 - j) / 2) / L, [y, S] = s ? [x.title, p.title] : [p.title, x.title], H = It(s ? p : x), P = H ? 0 : bt(a, S), X = Math.max(
      vt(m.map(w), a, i),
      vt(et, a, i, 600)
    ), ot = vt(c.map(C), a * Kt, i, 600);
    let R, st, K = !1;
    if (s)
      R = {
        top: H ? Bt(a) : a,
        right: ot + ue + 8,
        bottom: a + 16 + bt(a, y),
        left: P + X + de
      }, st = R.top + (_ ? L : D.length) * e + R.bottom;
    else {
      R = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((M ? a * Kt : 0) + 16, H ? Bt(a) : 0),
        right: 16,
        bottom: 0,
        // below
        left: P + vt(O.map(Z), a, i) + de
      }, st = this.options.height, K = (t - R.left - R.right) / L < X;
      const v = Vt + 3 + a, B = K ? (X + Vt + 3 + 0.75 * a) * Math.SQRT1_2 + 0.3 * a : v;
      if (R.bottom = B + 15 + bt(a, y), st += B - v, K) {
        const ct = Math.round(X * Math.SQRT1_2), ht = g;
        R.left = Math.max(R.left, Math.ceil((ct - ht * (t - R.right)) / (1 - ht)));
      }
    }
    const gt = t - R.left - R.right, rt = st - R.top - R.bottom, wt = s ? rt : gt, ut = s ? gt : rt, Q = (v, B) => s ? [B, v] : [v, B], dt = s ? 0 : rt, lt = s ? -1 : 1, [mt, kt] = p.range || [0, wt], yt = (kt - mt) / L, J = yt * (1 - j);
    D.forEach((v, B) => {
      v.pos = mt + (I + A[B]) * yt + J / 2, v.bar && (v.bar.pos = v.pos);
    });
    const tt = F.range(x.range || (s ? [0, gt] : [rt, 0])), u = tt(F.domain()[0]), T = b.scaleOrdinal(k.domain, k.range), W = (v) => this.highlight.color(T(v.color), v, { color: v.color }), it = (v, B, ct) => v.attr("x1", (ht) => B(ht)[0]).attr("y1", (ht) => B(ht)[1]).attr("x2", (ht) => ct(ht)[0]).attr("y2", (ht) => ct(ht)[1]);
    this.root.style("max-width", `${t}px`);
    const U = this.svg.attr("viewBox", `0 0 ${t} ${st}`).attr(
      "aria-label",
      `Bar chart of ${G(x, "count")} by ${G(p, "category")}` + (_ ? ` within ${G(f, "group")}` : "") + `. ${c.map((v) => `${z(v)}: ${v.count}`).join(", ")}`
    );
    U.selectAll("*").remove();
    const pt = U.append("g").attr("transform", `translate(${R.left},${R.top})`), Ot = pt.append("g").selectAll("line").data(O).join("line");
    Ot.attr("stroke", "rgba(0,0,0,0.08)"), it(
      Ot,
      (v) => Q(0, tt(v)),
      (v) => Q(wt, tt(v))
    );
    const d = pt.append("g").attr("transform", s ? `translate(0,${rt})` : null).call(
      (s ? b.axisBottom(tt) : b.axisLeft(tt)).tickValues(O).tickFormat(Z).tickSizeOuter(0)
    ), E = pt.append("g");
    E.append("path").attr("class", "domain").attr("fill", "none").attr("d", `M${Q(0, dt).join(",")}L${Q(wt, dt).join(",")}`);
    const N = E.selectAll("g").data(D.filter((v) => !v.bar || Y.has(v.bar.label))).join("g").attr("transform", (v) => `translate(${Q(v.pos, dt).join(",")})`), Ee = (v) => !v.bar && v !== D[0];
    it(
      N.append("line"),
      () => Q(0, lt * Vt),
      (v) => Q(0, Ee(v) ? -lt * ut : 0)
    );
    const [Re, Pe] = Q(0, lt * (Vt + 3)), Ie = N.append("text").attr("x", Re).attr("y", Pe).attr("text-anchor", s ? "end" : "middle").attr("dy", s ? "0.32em" : "0.71em").attr("font-weight", (v) => v.bar ? null : 600).text((v) => v.bar ? w(v.bar.label) : $(v.group));
    K && Ie.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em");
    for (const v of [d, E])
      v.attr("font-family", null).attr("font-size", a), v.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), v.selectAll(".domain, line").attr("stroke", "rgba(0,0,0,0.5)");
    const Dt = (v) => {
      const [B, ct] = Q(v.pos - J / 2, Math.min(u, tt(v.count))), [ht, Be] = Q(J, Math.abs(tt(v.count) - u));
      return { x: B, y: ct, w: ht, h: Be };
    }, re = pt.append("g").selectAll("g").data(c).join("g");
    if (re.append("rect").attr("rx", 3).attr("fill", W).attr("x", (v) => Dt(v).x).attr("y", (v) => Dt(v).y).attr("width", (v) => Dt(v).w).attr("height", (v) => Dt(v).h).on("mouseenter", (v, B) => this._setHovered(B, v)).on("mousemove", (v) => this.tooltip.move(v)).on("mouseleave", () => this._setHovered(null)), M) {
      const v = (B) => Q(B.pos, tt(B.count) - lt * ue);
      re.append("text").attr("x", (B) => v(B)[0]).attr("y", (B) => v(B)[1]).attr("dy", s ? "0.35em" : null).attr("text-anchor", s ? "start" : "middle").attr("font-size", a * Kt).attr("font-weight", 600).attr("fill", Je).text(C);
    }
    const le = (v) => U.append("text").attr("text-anchor", "middle").attr("font-size", a).attr("font-weight", 600).attr("fill", pe).text(v || "");
    le(y).attr("x", R.left + gt / 2).attr("y", st - a), H ? Yt(pt, S, { fontSize: a, color: pe }) : le(S).attr(
      "transform",
      `translate(${a + 2},${R.top + rt / 2}) rotate(-90)`
    ), At(this.legend, T, { ...k, fontSize: a, highlight: this.highlight });
  }
}
const es = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, ss = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, ns = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Ln(o, t, e, { sort: n } = {}) {
  const s = b.group(o, (a) => a[t] || "(blank)"), i = Array.from(s, ([a, l]) => ({ label: a, count: l.length, group: l }));
  return n === "descending" ? i.sort((a, l) => l.count - a.count) : n === "ascending" && i.sort((a, l) => a.count - l.count), i.flatMap(
    ({ label: a, group: l }) => Array.from(
      b.rollup(
        l,
        (c) => c.length,
        (c) => c[e] || "(blank)"
      ),
      ([c, h]) => ({ label: a, key: c, count: h })
    )
  );
}
function os(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(es, e.y), s = q(ss, e.x), i = q(ns, e.color), a = b.rollup(
    o,
    (h) => b.sum(h, s.accessor),
    n.accessor,
    i.accessor
  );
  n.domain = at(n.domain, a.keys()), n.tickValues = ie(n), i.domain = at(i.domain, o.map(i.accessor));
  const l = n.domain.map((h) => {
    const p = a.get(h);
    let x = 0;
    const f = [];
    for (const k of i.domain) {
      const _ = (p == null ? void 0 : p.get(k)) ?? 0;
      _ > 0 && f.push({ key: k, count: _, start: x, end: x += _ });
    }
    return { label: h, count: x, segments: f };
  });
  s.domain ?? (s.domain = Ut(s.type, [0, b.max(l, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = ft(i.domain.length));
  const c = t.total ?? b.sum(l, (h) => h.count);
  return { axes: { category: n, value: s, color: i }, bars: l, total: c };
}
const is = 12, fe = 6, ge = 0.85, as = "rgba(0,0,0,0.55)", rs = {
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
class An {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...rs, ...e }, this.highlight = new Tt(() => this._onHighlightChange()), this.hovered = null, this.root = b.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Ht(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = Ct(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: l } = os(this.options.data, this.options), { category: c, value: h, color: p } = i, x = c.domain, f = c.format ?? String, k = p.format ?? String, _ = (g) => Xt(g.count, l, this.options.barLabel);
    this._tooltipRows = (g) => {
      const y = [
        [G(c, "category"), f(g.label)],
        [G(p, "group"), k(g.key)],
        [G(h, "count"), `${g.count} of ${g.barCount}`],
        ["Share of total", Xt(g.count, l, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(g, y) : y;
    };
    const m = It(c), w = vt(x.map(f), s, n), $ = {
      top: m ? Bt(s) : s,
      right: vt(a.map(_), s * ge, n, 600) + fe + 8,
      bottom: s + 16 + bt(s, h.title),
      left: (m ? 0 : bt(s, c.title)) + w + is
    }, z = t - $.left - $.right, M = x.length * e, C = $.top + M + $.bottom, F = b.scaleBand().domain(x).range(c.range || [0, M]).padding(0.3), O = St(h.type).domain(h.domain).range(h.range || [0, z]), Z = b.scaleOrdinal(p.domain, p.range), Y = (g) => this.highlight.color(Z(g.key), g, { color: g.key }), D = Pt(O, h), et = h.format ?? O.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const j = a.map((g) => {
      const y = g.segments.map((S) => `${k(S.key)} ${S.count}`).join(", ");
      return `${f(g.label)}: ${g.count} (${y})`;
    }).join("; "), V = this.svg.attr("viewBox", `0 0 ${t} ${C}`).attr(
      "aria-label",
      `Stacked bar chart of ${G(h, "count")} by ${G(c, "category")}, split by ${G(p, "group")}. ${j}`
    );
    V.selectAll("*").remove();
    const I = V.append("g").attr("transform", `translate(${$.left},${$.top})`), nt = I.append("g").call(
      b.axisLeft(F).tickValues(c.tickValues ?? x).tickFormat(f).tickSizeOuter(0)
    ), r = I.append("g").attr("transform", `translate(0,${M})`).call(b.axisBottom(O).tickValues(D).tickFormat(et).tickSizeOuter(0));
    for (const g of [nt, r])
      g.attr("font-family", null).attr("font-size", s), g.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), g.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    I.insert("g", ":first-child").selectAll("line").data(D).join("line").attr("y2", M).attr("x1", (g) => O(g)).attr("x2", (g) => O(g)).attr("stroke", "rgba(0,0,0,0.08)");
    const A = I.append("g").selectAll("g").data(a).join("g");
    A.selectAll("rect").data((g) => g.segments.map((y) => ({ ...y, label: g.label, barCount: g.count }))).join("rect").attr("x", (g) => O(g.start)).attr("y", (g) => F(g.label)).attr("width", (g) => Math.max(0, O(g.end) - O(g.start))).attr("height", F.bandwidth()).attr("fill", Y).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (g, y) => this._setHovered(y, g)).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && A.append("text").attr("x", (g) => O(g.count) + fe).attr("y", (g) => F(g.label) + F.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * ge).attr("font-weight", 600).attr("fill", as).text(_);
    const L = (g) => V.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(g || "");
    L(h.title).attr("x", $.left + z / 2).attr("y", C - s), m ? Yt(I, c.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : L(c.title).attr(
      "transform",
      `translate(${s + 2},${$.top + M / 2}) rotate(-90)`
    ), At(this.legend, Z, { ...p, fontSize: s, highlight: this.highlight });
  }
}
const ae = (o) => typeof o == "number" ? b.format(".2f")(o) : String(o), He = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: ae
}, ls = { ...He, field: "y" }, cs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: ae
}, hs = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: ae
}, ds = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function us(o = [{}], t = []) {
  const e = o.map((s, i) => ({
    ...ds,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function ps(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(He, e.x), s = q(ls, e.y), i = q(cs, e.color), a = q(hs, e.radius), l = us(t.layers, o), c = l.flatMap((h) => h.data);
  for (const h of [n, s]) h.domain ?? (h.domain = Ut(h.type, Mt(c.map(h.accessor))));
  if (i.accessor) {
    const h = l.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = Mt(h)), i.range ?? (i.range = b.interpolateViridis)) : (i.domain = at(i.domain, h), i.range ?? (i.range = ft(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Mt(c.map(a.accessor)))), { axes: { x: n, y: s, color: i, radius: a }, layers: l };
}
const fs = {
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
}, gs = 0.92;
function Zt(o, t, e) {
  return St(o.type).domain(t).range(o.range ?? e);
}
function ms(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : ft(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : b.interpolateRgbBasis(o.range);
    return b.scaleSequential(o.domain, t);
  }
  return b.scaleOrdinal(o.domain, o.range);
}
function ys(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : St(o.type).domain(o.domain).range(o.range);
}
class Sn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...fs }, this.axes = null, this.layers = [], this.highlight = new Tt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = Ct(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = ps(this.options.data, this.options);
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
    const { x: n, y: s } = this.scales, [i, a] = n.domain(), [l, c] = s.domain(), h = n.invert(0) - n.invert(t), p = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [i + h, a + h], y: [l + p, c + p] }, !1);
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
    this.root = b.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = b.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = b.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new Ht(this.container);
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
    const t = this.fontSize, { x: e, y: n } = this.axes, s = It(n), i = { ...this.options.margin };
    if (i.top ?? (i.top = s ? Bt(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + bt(t, e.title)), i.left == null) {
      const a = Zt(n, this._viewDomain.y, [0, 1]), l = Pt(a, n).map(n.format), c = vt(l, t * gs, this.container);
      i.left = (s ? 0 : bt(t, n.title)) + c + 8;
    }
    return i;
  }
  _render(t) {
    const { height: e, duration: n } = this.options, s = this.margin = this._resolveMargin(), i = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(i - s.left - s.right, 10), l = Math.max(e - s.top - s.bottom, 10);
    this.width = i, this.innerSize = [a, l], this.svg.attr("width", i).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", a).attr("height", l), this._updateScales(a, l), this.brush.extent([
      [0, 0],
      [a, l]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const c = t ? this.svg.transition().duration(n) : null;
    this._drawAxes(a, l, c), this._drawPoints(c), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: n, y: s, color: i, radius: a } = this.axes, l = this._viewDomain, c = this.options.rangePadding;
    this.scales = {
      x: Zt(n, l.x, [c, t - c]),
      y: Zt(s, l.y, [e - c, c]),
      color: ms(i),
      radius: ys(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? b.Delaunay.from(
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
    const { x: s, y: i } = this.axes, { margin: a, fontSize: l } = this, c = (h) => n ? h.transition(n) : h;
    c(this.gridX).call(
      $t(b.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), c(this.gridY).call(
      $t(b.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), c(this.axisX.attr("transform", `translate(0,${e})`)).call(
      $t(b.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), c(this.axisY).call($t(b.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), It(i) ? Yt(this.titleY, i.title, { fontSize: l }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + l + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(n) {
      e._drawLayer(b.select(this), n, t);
    });
  }
  _drawLayer(t, e, n) {
    const s = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (f) => this._px(f), l = (f) => this._py(f), c = (f) => this._pr(f), { highlight: h } = this, p = (f) => h.color(this._pcolor(f, e), f, this._keys(f, e)), x = t.selectAll("circle").data(e.data, s);
    x.exit().remove(), x.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", l).attr("r", c).attr(i, p), (n ? x.transition(n) : x).attr("cx", a).attr("cy", l).attr("r", c).attr(i, p), h.active && t.selectAll("circle").filter((f) => h.includes(f, this._keys(f, e))).raise();
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
      a.append("linearGradient").attr("id", l).selectAll("stop").data(b.ticks(0, 1, 10)).join("stop").attr("offset", (h) => h).attr("stop-color", (h) => e(n + h * (s - n))), a.append("rect").attr("width", i).attr("height", 8).attr("fill", `url(#${l})`);
      const c = b.scaleLinear([n, s], [0, i]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call($t(b.axisBottom(c), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return At(this.legend, e, {
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
    return At(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const n = Pt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(n).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...n.map(e));
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
    const [e, n] = b.pointer(t, this.plot.node()), [s, i] = this.innerSize;
    if (e < 0 || e > s || n < 0 || n > i) return this._hideTooltip();
    const a = this.nodes[this.delaunay.find(e, n)];
    if (!a) return this._hideTooltip();
    const l = this._px(a.d), c = this._py(a.d);
    if (Math.hypot(l - e, c - n) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", l).attr("cy", c).attr("r", this._pr(a.d) + 3), this.tooltip.show(this._tooltipRows(a), t, a.d), this._setHovered(a);
  }
  _setHovered(t) {
    var e, n, s;
    ((t == null ? void 0 : t.d) ?? null) !== (((e = this.hovered) == null ? void 0 : e.d) ?? null) && (this.hovered = t, (s = (n = this.options).onHover) == null || s.call(n, (t == null ? void 0 : t.d) ?? null, (t == null ? void 0 : t.layer.id) ?? null));
  }
  _tooltipRows({ d: t, layer: e }) {
    const n = [];
    for (const i of ["x", "y", "color"]) {
      const a = this.axes[i];
      i === "color" && e.color || a.accessor && n.push([G(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const xs = {
  field: "label",
  context: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, _s = {
  field: "value",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, vs = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, bs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function ws(o) {
  const t = [...o].sort(b.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = b.quantile(t, 0.25), n = b.quantile(t, 0.5), s = b.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), l = Math.min(a.length ? a[0] : t[0], e), c = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: l, max: c, mean: b.mean(t) };
}
function ks(o, t) {
  const e = [], n = [];
  for (const s of o) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function Ls(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(xs, e.y), s = q(_s, e.x), i = q(vs, e.group), a = q(bs, e.color), l = ze(n.context), c = (p, x, f) => {
    const { records: k, values: _ } = ks(f, s.accessor), m = ws(_), w = f[0];
    return {
      group: p,
      label: x,
      context: l && w ? l(w) ?? null : null,
      count: _.length,
      records: k,
      values: _,
      stats: m,
      outliers: _.map(($, z) => z).filter(($) => _[$] < m.min || _[$] > m.max),
      color: a.accessor && w ? a.accessor(w) ?? null : null
    };
  };
  let h;
  if (i.accessor) {
    const p = b.group(o, i.accessor, n.accessor);
    i.domain = at(i.domain, p.keys()), h = i.domain.flatMap((x) => {
      const f = p.get(x) ?? /* @__PURE__ */ new Map();
      return at(n.domain, f.keys()).filter((_) => f.has(_)).map((_) => c(x, _, f.get(_)));
    });
  } else {
    const p = b.group(o, n.accessor);
    h = at(n.domain, p.keys()).map(
      (x) => c(null, x, p.get(x) ?? [])
    );
  }
  if (n.domain = [...new Set(h.map((p) => p.label))], n.tickValues = ie(n), s.domain ?? (s.domain = Ut(s.type, Mt(h.flatMap((p) => p.values)))), a.accessor) {
    const p = h.map((x) => x.color).filter((x) => x != null);
    a.domain = at(a.domain, p), a.range ?? (a.range = ft(a.domain.length));
  }
  return { axes: { category: n, value: s, group: i, color: a }, boxes: h };
}
const As = 12, Ss = {
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
}, me = 0.3, $s = 0.35, Ms = 0.55, zs = "rgba(0,0,0,0.87)", Qt = 2, Nt = 2.5, ye = 0.45, Ts = 0.9;
function Cs(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class $n {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...Ss, ...e }, this.highlight = new Tt(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = b.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const n = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = n.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = n.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Ht(t), this.draw();
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
    var Ot;
    const { width: t, rowHeight: e, points: n, showCounts: s, threshold: i, rangePadding: a, border: l } = this.options, c = this.svg.node(), h = Ct(this.options.fontSize);
    this.tooltip.fontSize(h), this._leave();
    const { axes: p, boxes: x } = Ls(this.options.data, this.options), { category: f, value: k, group: _, color: m } = p, w = f.format ?? String, $ = _.format ?? String, z = k.format ?? b.format(".3~f"), M = (d) => d.context != null ? `${d.context} / ` : "", C = (d) => s ? ` (n=${d.count})` : "", F = (d) => M(d) + w(d.label) + C(d), O = (d) => (d.group != null ? `${$(d.group)} / ` : "") + F(d), Z = new Set(f.tickValues ?? f.domain), Y = St(k.type).domain(k.domain), D = Pt(Y, k), et = k.format ?? Y.tickFormat(k.ticks ?? void 0), j = (i == null ? void 0 : i.value) != null && i.value >= Math.min(...k.domain) && i.value <= Math.max(...k.domain), V = [];
    for (const d of x)
      d.group != null && d.group !== ((Ot = V.at(-1)) == null ? void 0 : Ot.group) && V.push({ group: d.group }), V.push({ group: d.group, box: d });
    const I = e * (V.length + 1), nt = b.scaleBand(b.range(V.length), [0, I]).paddingInner(me).paddingOuter((1 + me) / 2), r = nt.bandwidth();
    V.forEach((d, E) => {
      d.y = nt(E) + r / 2, d.box && (d.box.y = d.y);
    });
    const A = V.filter((d) => !d.box).map((d) => $(d.group)), L = It(f), g = Math.max(
      vt(x.map(F), h, c),
      vt(A, h, c, 600)
    ), y = {
      top: Math.max(
        j && i.label ? 2 * h + 8 : h,
        L ? Bt(h) : 0
      ),
      right: 16,
      bottom: h + 16 + bt(h, k.title),
      left: (L ? 0 : bt(h, f.title)) + g + As
    }, S = t - y.left - y.right, H = y.top + I + y.bottom, P = Y.range(k.range || [a, S - a]), X = m.accessor ? b.scaleOrdinal(m.domain, m.range) : () => Array.isArray(m.range) ? m.range[0] : ft(1)[0], { highlight: ot } = this, R = (d, E) => ot.includes(d.records[E], { color: d.color }, d), st = new Map(
      x.map((d) => [d, !ot.active || d.records.some((E, N) => R(d, N))])
    ), K = (d) => m.accessor ? X(d.color) : X(), gt = (d) => st.get(d) ? K(d) : xt, rt = (d) => st.get(d) ? m.accessor ? zs : K(d) : xt, wt = m.accessor ? Ms : $s, ut = x.filter((d) => d.count), Q = (d, E, N) => ({
      box: d,
      index: E,
      record: d.records[E],
      value: d.values[E],
      x: P(d.values[E]),
      y: N,
      lit: R(d, E)
    }), dt = ut.flatMap(
      (d) => n ? d.values.map((E, N) => Q(d, N, d.y + Cs(N) * r / 2)) : d.outliers.map((E) => Q(d, E, d.y))
    ), lt = b.group(dt, (d) => d.box), mt = (d) => d.lit ? K(d.box) : xt;
    this.root.style("max-width", `${t}px`);
    const kt = ut.map((d) => `${O(d)}: median ${z(d.stats.median)}`).join("; "), yt = this.svg.attr("viewBox", `0 0 ${t} ${H}`).attr(
      "aria-label",
      `Box plot of ${G(k, "value")} by ${G(f, "row")}. ${kt}`
    );
    yt.selectAll("*").remove();
    const J = yt.append("g").attr("transform", `translate(${y.left},${y.top})`);
    J.append("g").selectAll("line").data(D).join("line").attr("y2", I).attr("x1", (d) => P(d)).attr("x2", (d) => P(d)).attr("stroke", "rgba(0,0,0,0.08)");
    const tt = J.append("g").attr("transform", `translate(0,${I})`).call(b.axisBottom(P).tickValues(D).tickFormat(et).tickSizeOuter(0));
    tt.attr("font-family", null).attr("font-size", h), tt.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), tt.selectAll(".tick line").attr("stroke", "rgba(0,0,0,0.5)"), tt.select(".domain").remove(), J.append("path").attr("d", l ? `M0,0H${S}V${I}H0Z` : `M0,0V${I}H${S}`).attr("fill", "none").attr("stroke", "rgba(0,0,0,0.5)");
    const T = J.append("g").attr("font-size", h).selectAll("g").data(V.filter((d) => !d.box || Z.has(d.box.label))).join("g").attr("transform", (d) => `translate(0,${d.y})`);
    if (T.append("line").attr("x1", -6).attr("x2", (d) => d.box ? 0 : S).attr("stroke", "rgba(0,0,0,0.5)"), T.append("text").attr("x", -9).attr("dy", "0.32em").attr("text-anchor", "end").attr("fill", "rgba(0,0,0,0.7)").each(function({ group: d, box: E }) {
      const N = b.select(this);
      return E ? (E.context != null && N.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(M(E)), N.append("tspan").text(w(E.label)), s && N.append("tspan").attr("fill", "rgba(0,0,0,0.45)").text(C(E)), N) : N.attr("font-weight", 600).text($(d));
    }), j) {
      const d = P(i.value);
      J.append("line").attr("x1", d).attr("x2", d).attr("y1", 0).attr("y2", I).attr("stroke", "rgba(0,0,0,0.5)").attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), i.label && J.append("text").attr("x", d).attr("y", -6).attr("text-anchor", "middle").attr("font-size", h).attr("fill", "rgba(0,0,0,0.6)").text(i.label);
    }
    const W = J.append("g").selectAll("g").data(ut).join("g").attr("transform", (d) => `translate(0,${d.y - r / 2})`).attr("stroke", gt).attr("fill", gt);
    this.drawPoints(n ? dt : [], {
      width: t,
      height: H,
      offset: [y.left, y.top],
      color: mt,
      emphasis: ot.active
    }), W.append("line").attr("x1", (d) => P(d.stats.min)).attr("x2", (d) => P(d.stats.max)).attr("y1", r / 2).attr("y2", r / 2), W.selectAll(".cap").data((d) => [d.stats.min, d.stats.max]).join("line").attr("class", "cap").attr("x1", P).attr("x2", P).attr("y1", r * 0.25).attr("y2", r * 0.75), W.append("rect").attr("x", (d) => P(d.stats.q1)).attr("width", (d) => Math.max(1, P(d.stats.q3) - P(d.stats.q1))).attr("height", r).attr("fill-opacity", wt), W.append("line").attr("x1", (d) => P(d.stats.median)).attr("x2", (d) => P(d.stats.median)).attr("y1", 0).attr("y2", r).attr("stroke", rt).attr("stroke-width", 2), W.append("circle").attr("cx", (d) => P(d.stats.mean)).attr("cy", r / 2).attr("r", 3).attr("fill", rt), n || W.selectAll(".outlier").data((d) => lt.get(d) ?? []).join("circle").attr("class", "outlier").attr("cx", (d) => d.x).attr("cy", r / 2).attr("r", Nt).attr("fill", "#fff").attr("stroke", mt), this.hoverRing = J.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (n ? Qt : Nt) + 2.5).style("display", "none");
    const it = (d) => yt.append("text").attr("text-anchor", "middle").attr("font-size", h).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(d || "");
    it(k.title).attr("x", y.left + S / 2).attr("y", H - h), L ? Yt(J, f.title, { fontSize: h, color: "rgba(0,0,0,0.6)" }) : it(f.title).attr(
      "transform",
      `translate(${h + 2},${y.top + I / 2}) rotate(-90)`
    ), At(this.legend, X, {
      ...m,
      title: m.accessor ? m.title : null,
      fontSize: h,
      highlight: this.highlight
    });
    const { tooltip: U } = this.options, pt = G(f, "row");
    this.hit = {
      margin: y,
      marks: dt,
      delaunay: dt.length ? b.Delaunay.from(
        dt,
        (d) => d.x,
        (d) => d.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (d, E) => ut.find(
        (N) => Math.abs(E - N.y) <= r / 2 && d >= P(N.stats.min) - Nt && d <= P(N.stats.max) + Nt
      ) ?? null,
      markRows: (d) => {
        const E = [
          [pt, O(d.box)],
          [G(k, "value"), z(d.value)]
        ];
        return U ? U(d.record, E, d.box) : E;
      },
      boxRows: (d) => {
        const E = d.stats, N = [
          [pt, O(d)],
          ["n", String(d.count)],
          ["Median", z(E.median)],
          ["Mean", z(E.mean)],
          ["Q1", z(E.q1)],
          ["Q3", z(E.q3)],
          ["Whiskers", `${z(E.min)} to ${z(E.max)}`]
        ];
        return U ? U(null, N, d) : N;
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
    var k, _;
    this.canvas.style("display", t.length ? null : "none");
    const c = (_ = (k = this.canvas.node()).getContext) == null ? void 0 : _.call(k, "2d");
    if (!c) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(n * h)), c.setTransform(h, 0, 0, h, 0, 0), c.clearRect(0, 0, e, n);
    const p = (m, w, $) => {
      c.globalAlpha = $, c.fillStyle = m, c.beginPath();
      for (const z of w) {
        const M = z.x + s, C = z.y + i;
        c.moveTo(M + Qt, C), c.arc(M, C, Qt, 0, 2 * Math.PI);
      }
      c.fill();
    }, x = b.group(t, a), f = x.get(xt);
    f && p(xt, f, ye);
    for (const [m, w] of x)
      m !== xt && p(m, w, l ? Ts : ye);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [n, s] = b.pointer(t, this.svg.node()), i = n - e.margin.left, a = s - e.margin.top, l = e.delaunay ? e.marks[e.delaunay.find(i, a)] : null;
    if (l && Math.hypot(l.x - i, l.y - a) <= e.radius) {
      this.hoverRing.style("display", null).attr("cx", l.x).attr("cy", l.y), this.tooltip.show(e.markRows(l), t, l), this._setHovered(l.record, l.box);
      return;
    }
    this.hoverRing.style("display", "none");
    const c = e.boxAt(i, a);
    if (c) {
      this.tooltip.show(e.boxRows(c), t, c), this._setHovered(null, c);
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
const Hs = { field: null, title: null, format: null }, Os = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Es = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function _t(o) {
  return o != null && o !== "" && !(typeof o == "number" && Number.isNaN(o));
}
function Rs(o = [], t = {}) {
  var x;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((f) => q(Hs, f)), s = q(Os, e.color), i = q(Es, e.radius), a = s.accessor ?? i.accessor, l = { key: "", label: "", level: -1, record: null, children: [] }, c = /* @__PURE__ */ new Map([[l.key, l]]);
  for (const f of o) {
    const k = [];
    for (const $ of n) {
      const z = (x = $.accessor) == null ? void 0 : x.call($, f);
      if (!_t(z)) break;
      k.push(z);
    }
    if (!k.length) continue;
    let _ = l;
    k.forEach(($, z) => {
      const M = JSON.stringify(k.slice(0, z + 1));
      let C = c.get(M);
      C || (C = { key: M, label: $, level: z, record: null, children: [] }, c.set(M, C), _.children.push(C)), _ = C;
    });
    const m = _, w = a && !_t(a(m.record ?? {})) && _t(a(f));
    (!m.record || w) && (m.record = f);
  }
  const h = [...c.values()].filter((f) => f !== l);
  for (const f of h)
    f.value = f.record && a ? a(f.record) : null, f.empty = !f.record || a != null && !_t(f.value), f.colorValue = !f.empty && s.accessor ? s.accessor(f.record) : null, f.radiusValue = !f.empty && i.accessor ? i.accessor(f.record) : null;
  const p = h.filter((f) => !f.empty);
  if (s.accessor) {
    const f = p.map((k) => k.colorValue).filter(_t);
    s.type === "sequential" ? (s.domain ?? (s.domain = Mt(f)), s.range ?? (s.range = b.interpolateViridis)) : (s.domain = at(s.domain, f), s.range ?? (s.range = ft(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Mt(p.map((f) => f.radiusValue).filter(_t)))), { axes: { color: s, radius: i }, levels: n, root: l, nodes: h };
}
const xe = 12, _e = 2, Ps = 1.5, Is = 2.9, Bs = 7, Jt = 1.1, ve = 4, Rt = 2, Ds = 3.3, Vs = 0.92, Ns = (o) => typeof o == "number" ? b.format(".2f")(o) : String(o), Fs = { color: "#b4b2aa", radius: 6, label: null }, js = {
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
function Gs(o, t, e, n) {
  const s = String(o ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const l of s) {
    const c = a ? `${a} ${l}` : l;
    a && zt(c, e, n) > t ? (i.push(a), a = l) : a = c;
  }
  return a && i.push(a), i;
}
function qs(o) {
  const { l: t } = b.lab(o);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class Mn {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...js, ...e }, this.highlight = new Tt(() => this._onHighlightChange()), this.hovered = null, this.root = b.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Ht(t), this.draw(), this._observeResize();
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
    var tt;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...Fs, ...this.options.empty }, i = Ct(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const l = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: c, levels: h, root: p } = Rs(this.options.data, this.options);
    this.axes = c;
    const x = Te(c.color), f = Ve(c.radius), k = c.color.accessor ? c.color : c.radius, _ = k.format ?? Ns, m = (u) => {
      const T = h[u.level];
      return T != null && T.format ? T.format(u.label) : u.label;
    };
    this._tooltipRows = (u) => {
      const T = [[G(h[u.level], `Level ${u.level + 1}`), m(u)]];
      return _t(u.value) && T.push([G(k, "value"), _(u.value)]), this.options.tooltip ? this.options.tooltip(u, T) : T;
    };
    const w = (u) => u.empty ? s.color : c.color.accessor ? x(u.colorValue) : x(), $ = (u) => u.empty || c.radius.accessor && c.radius.type !== "constant" && !_t(u.radiusValue) ? s.radius : f(u.radiusValue), z = (u) => this.highlight.color(w(u.data), u.data, { color: u.data.colorValue }), M = b.hierarchy(p), C = M.descendants().filter((u) => u.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      x,
      i,
      s,
      C.some((u) => u.data.empty)
    ), !C.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const F = Jt * i, O = /* @__PURE__ */ new Map();
    for (const u of C) {
      const T = h[u.depth - 1], W = T != null && T.format ? T.format(u.data.label) : u.data.label, it = Gs(W, Bs * i, i, l), U = Math.max(0, ...it.map((pt) => zt(pt, i, l)));
      O.set(u, { lines: it, width: U, height: it.length * F });
    }
    const Z = (u) => $(u.data), Y = (u) => Math.max(Z(u), O.get(u).height / 2), D = (u) => Z(u) + ve + O.get(u).width + Rt, et = M.height || 1, j = C.filter((u) => !u.children && u.depth === et), V = Math.ceil(Math.max(0, ...j.map(D))), I = Math.max(0, ...C.filter((u) => u.depth === 1 && u.children).map(D));
    let nt = xe, r = t;
    for (let u = 0; u < 3; u += 1)
      r = Math.max(1, Math.min(t, (a - nt - V) / et)), nt = Math.max(xe, Math.ceil(I - r));
    const A = Math.round(Is * i);
    b.tree().nodeSize([1, r]).separation((u, T) => {
      const W = Y(u) + Y(T) + _e;
      return u.parent === T.parent ? W : W * Ps;
    })(M);
    let L = 1 / 0, g = -1 / 0, y = 0;
    for (const u of C)
      L = Math.min(L, u.x), g = Math.max(g, u.x), y = Math.max(y, Y(u));
    const S = g - L, H = y + _e, P = A + S + H * 2, X = Math.max(this.options.height, Math.ceil(P)), ot = X - A, R = S > 0 ? (ot - H * 2) / S : 1, st = A + (ot - S * R) / 2, K = (u) => (u.x - L) * R, gt = (u) => u.depth === 0 ? r - Ds * i : u.y, rt = this.svg.attr("width", a).attr("height", X).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((u, T) => G(u, `level ${T + 1}`)).join(", then ")}: ${C.length} nodes`
    ), wt = rt.append("g").attr("transform", `translate(${nt},${st})`), ut = /* @__PURE__ */ new Map();
    for (const u of C)
      ut.has(u.depth) || ut.set(u.depth, ((tt = h[u.depth - 1]) == null ? void 0 : tt.title) ?? "");
    rt.append("g").selectAll("text").data([...ut]).join("text").attr("class", "tree-chart__header").attr("x", ([u]) => nt + u * r).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, u]) => u);
    const Q = M.children.length > 1, dt = wt.append("g").selectAll("path").data(M.links().filter((u) => Q || u.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", b.linkHorizontal().x(gt).y(K)), lt = wt.append("g").selectAll("g").data(C).join("g").attr("class", "tree-chart__node").attr("transform", (u) => `translate(${u.y},${K(u)})`);
    lt.append("circle").attr("class", "tree-chart__circle").attr("r", Z).attr("fill", z), n && lt.filter((u) => _t(u.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * Vs).attr("fill", (u) => qs(z(u))).text((u) => _(u.data.value));
    const mt = (u) => !!u.children, kt = (u) => (mt(u) ? -1 : 1) * (Z(u) + ve), yt = lt.filter((u) => O.get(u).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (u) => u.data.empty);
    yt.append("rect").attr("class", "tree-chart__label-bg").attr("x", (u) => {
      const { width: T } = O.get(u);
      return (mt(u) ? kt(u) - T : kt(u)) - Rt;
    }).attr("y", (u) => -O.get(u).height / 2 - Rt).attr("width", (u) => O.get(u).width + Rt * 2).attr("height", (u) => O.get(u).height + Rt * 2), yt.append("text").attr("text-anchor", (u) => mt(u) ? "end" : "start").selectAll("tspan").data((u) => {
      const { lines: T } = O.get(u);
      return T.map((W, it) => ({ line: W, i: it, count: T.length, x: kt(u) }));
    }).join("tspan").attr("x", (u) => u.x).attr(
      "dy",
      (u) => u.i === 0 ? `${0.31 - (u.count - 1) * Jt / 2}em` : `${Jt}em`
    ).text((u) => u.line);
    const J = (u) => {
      if (!e) return;
      const T = u && /* @__PURE__ */ new Set([...u.ancestors(), ...u.descendants()]), W = (U) => !!(T && T.has(U)), it = (U) => W(U.source) && W(U.target);
      lt.classed("tree-chart__node--off-path", (U) => !!T && !W(U)), dt.classed("tree-chart__link--on-path", it).classed("tree-chart__link--off-path", (U) => !!T && !it(U));
    };
    lt.on("mouseenter", (u, T) => {
      J(T), this._setHovered(T.data, u);
    }).on("mousemove", (u) => this.tooltip.move(u)).on("mouseleave", () => {
      J(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Ue(this.legend, t, a) : At(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const l = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    l.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), l.append("span").text(n.label);
  }
}
function be(o, t) {
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
function Xs(o, t) {
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
function te(o, t) {
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
function Ws(o, t) {
  return o.sourceLinks.length ? o.depth : t - 1;
}
function Ft(o) {
  return function() {
    return o;
  };
}
function we(o, t) {
  return Wt(o.source, t.source) || o.index - t.index;
}
function ke(o, t) {
  return Wt(o.target, t.target) || o.index - t.index;
}
function Wt(o, t) {
  return o.y0 - t.y0;
}
function ee(o) {
  return o.value;
}
function Us(o) {
  return o.index;
}
function Ys(o) {
  return o.nodes;
}
function Ks(o) {
  return o.links;
}
function Le(o, t) {
  const e = o.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function Ae({ nodes: o }) {
  for (const t of o) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function Zs() {
  let o = 0, t = 0, e = 1, n = 1, s = 24, i = 8, a, l = Us, c = Ws, h, p, x = Ys, f = Ks, k = 6;
  function _() {
    const r = { nodes: x.apply(null, arguments), links: f.apply(null, arguments) };
    return m(r), w(r), $(r), z(r), F(r), Ae(r), r;
  }
  _.update = function(r) {
    return Ae(r), r;
  }, _.nodeId = function(r) {
    return arguments.length ? (l = typeof r == "function" ? r : Ft(r), _) : l;
  }, _.nodeAlign = function(r) {
    return arguments.length ? (c = typeof r == "function" ? r : Ft(r), _) : c;
  }, _.nodeSort = function(r) {
    return arguments.length ? (h = r, _) : h;
  }, _.nodeWidth = function(r) {
    return arguments.length ? (s = +r, _) : s;
  }, _.nodePadding = function(r) {
    return arguments.length ? (i = a = +r, _) : i;
  }, _.nodes = function(r) {
    return arguments.length ? (x = typeof r == "function" ? r : Ft(r), _) : x;
  }, _.links = function(r) {
    return arguments.length ? (f = typeof r == "function" ? r : Ft(r), _) : f;
  }, _.linkSort = function(r) {
    return arguments.length ? (p = r, _) : p;
  }, _.size = function(r) {
    return arguments.length ? (o = t = 0, e = +r[0], n = +r[1], _) : [e - o, n - t];
  }, _.extent = function(r) {
    return arguments.length ? (o = +r[0][0], e = +r[1][0], t = +r[0][1], n = +r[1][1], _) : [[o, t], [e, n]];
  }, _.iterations = function(r) {
    return arguments.length ? (k = +r, _) : k;
  };
  function m({ nodes: r, links: A }) {
    for (const [g, y] of r.entries())
      y.index = g, y.sourceLinks = [], y.targetLinks = [];
    const L = new Map(r.map((g, y) => [l(g, y, r), g]));
    for (const [g, y] of A.entries()) {
      y.index = g;
      let { source: S, target: H } = y;
      typeof S != "object" && (S = y.source = Le(L, S)), typeof H != "object" && (H = y.target = Le(L, H)), S.sourceLinks.push(y), H.targetLinks.push(y);
    }
    if (p != null)
      for (const { sourceLinks: g, targetLinks: y } of r)
        g.sort(p), y.sort(p);
  }
  function w({ nodes: r }) {
    for (const A of r)
      A.value = A.fixedValue === void 0 ? Math.max(te(A.sourceLinks, ee), te(A.targetLinks, ee)) : A.fixedValue;
  }
  function $({ nodes: r }) {
    const A = r.length;
    let L = new Set(r), g = /* @__PURE__ */ new Set(), y = 0;
    for (; L.size; ) {
      for (const S of L) {
        S.depth = y;
        for (const { target: H } of S.sourceLinks)
          g.add(H);
      }
      if (++y > A) throw new Error("circular link");
      L = g, g = /* @__PURE__ */ new Set();
    }
  }
  function z({ nodes: r }) {
    const A = r.length;
    let L = new Set(r), g = /* @__PURE__ */ new Set(), y = 0;
    for (; L.size; ) {
      for (const S of L) {
        S.height = y;
        for (const { source: H } of S.targetLinks)
          g.add(H);
      }
      if (++y > A) throw new Error("circular link");
      L = g, g = /* @__PURE__ */ new Set();
    }
  }
  function M({ nodes: r }) {
    const A = be(r, (y) => y.depth) + 1, L = (e - o - s) / (A - 1), g = new Array(A);
    for (const y of r) {
      const S = Math.max(0, Math.min(A - 1, Math.floor(c.call(null, y, A))));
      y.layer = S, y.x0 = o + S * L, y.x1 = y.x0 + s, g[S] ? g[S].push(y) : g[S] = [y];
    }
    if (h) for (const y of g)
      y.sort(h);
    return g;
  }
  function C(r) {
    const A = Xs(r, (L) => (n - t - (L.length - 1) * a) / te(L, ee));
    for (const L of r) {
      let g = t;
      for (const y of L) {
        y.y0 = g, y.y1 = g + y.value * A, g = y.y1 + a;
        for (const S of y.sourceLinks)
          S.width = S.value * A;
      }
      g = (n - g + a) / (L.length + 1);
      for (let y = 0; y < L.length; ++y) {
        const S = L[y];
        S.y0 += g * (y + 1), S.y1 += g * (y + 1);
      }
      V(L);
    }
  }
  function F(r) {
    const A = M(r);
    a = Math.min(i, (n - t) / (be(A, (L) => L.length) - 1)), C(A);
    for (let L = 0; L < k; ++L) {
      const g = Math.pow(0.99, L), y = Math.max(1 - g, (L + 1) / k);
      Z(A, g, y), O(A, g, y);
    }
  }
  function O(r, A, L) {
    for (let g = 1, y = r.length; g < y; ++g) {
      const S = r[g];
      for (const H of S) {
        let P = 0, X = 0;
        for (const { source: R, value: st } of H.targetLinks) {
          let K = st * (H.layer - R.layer);
          P += I(R, H) * K, X += K;
        }
        if (!(X > 0)) continue;
        let ot = (P / X - H.y0) * A;
        H.y0 += ot, H.y1 += ot, j(H);
      }
      h === void 0 && S.sort(Wt), Y(S, L);
    }
  }
  function Z(r, A, L) {
    for (let g = r.length, y = g - 2; y >= 0; --y) {
      const S = r[y];
      for (const H of S) {
        let P = 0, X = 0;
        for (const { target: R, value: st } of H.sourceLinks) {
          let K = st * (R.layer - H.layer);
          P += nt(H, R) * K, X += K;
        }
        if (!(X > 0)) continue;
        let ot = (P / X - H.y0) * A;
        H.y0 += ot, H.y1 += ot, j(H);
      }
      h === void 0 && S.sort(Wt), Y(S, L);
    }
  }
  function Y(r, A) {
    const L = r.length >> 1, g = r[L];
    et(r, g.y0 - a, L - 1, A), D(r, g.y1 + a, L + 1, A), et(r, n, r.length - 1, A), D(r, t, 0, A);
  }
  function D(r, A, L, g) {
    for (; L < r.length; ++L) {
      const y = r[L], S = (A - y.y0) * g;
      S > 1e-6 && (y.y0 += S, y.y1 += S), A = y.y1 + a;
    }
  }
  function et(r, A, L, g) {
    for (; L >= 0; --L) {
      const y = r[L], S = (y.y1 - A) * g;
      S > 1e-6 && (y.y0 -= S, y.y1 -= S), A = y.y0 - a;
    }
  }
  function j({ sourceLinks: r, targetLinks: A }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: L } } of A)
        L.sort(ke);
      for (const { target: { targetLinks: L } } of r)
        L.sort(we);
    }
  }
  function V(r) {
    if (p === void 0)
      for (const { sourceLinks: A, targetLinks: L } of r)
        A.sort(ke), L.sort(we);
  }
  function I(r, A) {
    let L = r.y0 - (r.sourceLinks.length - 1) * a / 2;
    for (const { target: g, width: y } of r.sourceLinks) {
      if (g === A) break;
      L += y + a;
    }
    for (const { source: g, width: y } of A.targetLinks) {
      if (g === r) break;
      L -= y;
    }
    return L;
  }
  function nt(r, A) {
    let L = A.y0 - (A.targetLinks.length - 1) * a / 2;
    for (const { source: g, width: y } of A.targetLinks) {
      if (g === r) break;
      L += y + a;
    }
    for (const { target: g, width: y } of r.sourceLinks) {
      if (g === A) break;
      L -= y;
    }
    return L;
  }
  return _;
}
var se = Math.PI, ne = 2 * se, Lt = 1e-6, Qs = ne - Lt;
function oe() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Oe() {
  return new oe();
}
oe.prototype = Oe.prototype = {
  constructor: oe,
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
    var i = this._x1, a = this._y1, l = e - o, c = n - t, h = i - o, p = a - t, x = h * h + p * p;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = o) + "," + (this._y1 = t);
    else if (x > Lt) if (!(Math.abs(p * l - c * h) > Lt) || !s)
      this._ += "L" + (this._x1 = o) + "," + (this._y1 = t);
    else {
      var f = e - i, k = n - a, _ = l * l + c * c, m = f * f + k * k, w = Math.sqrt(_), $ = Math.sqrt(x), z = s * Math.tan((se - Math.acos((_ + x - m) / (2 * w * $))) / 2), M = z / $, C = z / w;
      Math.abs(M - 1) > Lt && (this._ += "L" + (o + M * h) + "," + (t + M * p)), this._ += "A" + s + "," + s + ",0,0," + +(p * f > h * k) + "," + (this._x1 = o + C * l) + "," + (this._y1 = t + C * c);
    }
  },
  arc: function(o, t, e, n, s, i) {
    o = +o, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(n), l = e * Math.sin(n), c = o + a, h = t + l, p = 1 ^ i, x = i ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + c + "," + h : (Math.abs(this._x1 - c) > Lt || Math.abs(this._y1 - h) > Lt) && (this._ += "L" + c + "," + h), e && (x < 0 && (x = x % ne + ne), x > Qs ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (o - a) + "," + (t - l) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = c) + "," + (this._y1 = h) : x > Lt && (this._ += "A" + e + "," + e + ",0," + +(x >= se) + "," + p + "," + (this._x1 = o + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(o, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Se(o) {
  return function() {
    return o;
  };
}
function Js(o) {
  return o[0];
}
function tn(o) {
  return o[1];
}
var en = Array.prototype.slice;
function sn(o) {
  return o.source;
}
function nn(o) {
  return o.target;
}
function on(o) {
  var t = sn, e = nn, n = Js, s = tn, i = null;
  function a() {
    var l, c = en.call(arguments), h = t.apply(this, c), p = e.apply(this, c);
    if (i || (i = l = Oe()), o(i, +n.apply(this, (c[0] = h, c)), +s.apply(this, c), +n.apply(this, (c[0] = p, c)), +s.apply(this, c)), l) return i = null, l + "" || null;
  }
  return a.source = function(l) {
    return arguments.length ? (t = l, a) : t;
  }, a.target = function(l) {
    return arguments.length ? (e = l, a) : e;
  }, a.x = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : Se(+l), a) : n;
  }, a.y = function(l) {
    return arguments.length ? (s = typeof l == "function" ? l : Se(+l), a) : s;
  }, a.context = function(l) {
    return arguments.length ? (i = l ?? null, a) : i;
  }, a;
}
function an(o, t, e, n, s) {
  o.moveTo(t, e), o.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function rn() {
  return on(an);
}
function ln(o) {
  return [o.source.x1, o.y0];
}
function cn(o) {
  return [o.target.x0, o.y1];
}
function hn() {
  return rn().source(ln).target(cn);
}
const dn = "(blank)", un = { field: null, title: null, domain: null, format: null, sort: "descending" }, pn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, jt = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? dn : String(e);
};
function fn(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function gn(o = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((m) => q(un, m)), n = q(pn, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((m) => m.field != null && m.field === n.field), i = Math.max(0, s), a = e.map((m, w) => {
    const $ = b.rollup(
      o,
      (M) => M.length,
      (M) => jt(m.accessor, M)
    ), z = fn($, m).map((M, C) => ({
      id: -1,
      dim: w,
      index: C,
      key: M,
      label: m.format ? m.format(M) : M,
      count: $.get(M)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: w,
      nodes: z,
      byKey: new Map(z.map((M) => [M.key, M]))
    };
  }), l = a.flatMap((m) => m.nodes);
  l.forEach((m, w) => {
    m.id = w;
  });
  const c = (m) => e.map((w) => jt(w.accessor, m)).join("\0"), h = b.rollups(o, (m) => m, c).map(([, m]) => {
    const w = e.map((z) => jt(z.accessor, m[0])), $ = w.map((z, M) => a[M].byKey.get(z));
    return {
      keys: w,
      labels: $.map((z) => z.label),
      nodes: $,
      records: m,
      value: m.length
    };
  }), p = [i, ...e.map((m, w) => w).filter((m) => m !== i)];
  h.sort((m, w) => {
    for (const $ of p) {
      const z = m.nodes[$].index - w.nodes[$].index;
      if (z) return z;
    }
    return 0;
  });
  const x = [];
  for (const m of h)
    for (let w = 1; w < e.length; w++)
      x.push({
        source: m.nodes[w - 1].id,
        target: m.nodes[w].id,
        pair: w - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const f = a[i], k = e[i];
  return k && (n.field ?? (n.field = k.field), n.accessor = (m) => jt(k.accessor, m), n.format ?? (n.format = k.format)), n.domain = at(
    n.domain,
    f ? f.nodes.map((m) => m.key) : []
  ), n.range ?? (n.range = ft(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: w, nodes: $ }) => ({
      title: m,
      index: w,
      nodes: $
    })),
    nodes: l,
    paths: h,
    links: x,
    total: o.length
  };
}
const mn = 2.3, $e = 5, Me = 6, yn = 2, Gt = 6, qt = 0.92, xn = "#333", _n = {
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
class zn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ..._n, ...e }, this.highlight = new Tt(() => this._onHighlightChange()), this.hovered = null, this.root = b.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Ht(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: i } = this.options, a = Ct(this.options.fontSize), l = this.options.width ?? (this.container.clientWidth || 640);
    this.width = l, this.tooltip.fontSize(a);
    const c = gn(this.options.data, this.options);
    this.prepared = c;
    const { axes: h, columns: p, colorIndex: x, total: f } = c, k = Te(h.color), _ = (r) => this.highlight.includes(r, { color: r.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(k, a), !c.nodes.length || p.length < 2) {
      this.svg.attr("width", l).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), w = p[p.length - 1], $ = (r) => zt(`${r.label} `, a, m) + zt(r.count, a * qt, m), z = Math.ceil(
      Math.max(
        zt(w.title, a * qt, m, 600),
        ...w.nodes.map($)
      )
    ) + Me + yn, M = Math.round(mn * a), C = Math.max(l - z, t * p.length), F = [
      [0, M + $e],
      [C, M + this.options.height - $e]
    ], O = Zs().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(F)({
      nodes: c.nodes.map((r) => ({ ...r })),
      links: c.links.map((r) => ({ ...r }))
    });
    n && vn(O.nodes, p.length, F[0][1], F[1][1]);
    const Z = hn(), Y = (r) => r.x1 + Me, D = (r) => r.dim === x ? this.highlight.color(k(r.key), r, { color: r.key }) : !this.highlight.active || r.sourceLinks.some(_) || r.targetLinks.some(_) ? xn : xt, et = this.svg.attr("width", l).attr("height", M + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${f} ${i} across ${p.map((r) => r.title).join(", ")}`
    ), j = (r) => O.nodes.find((A) => A.dim === r.index);
    et.append("g").selectAll("text").data(p.filter(j)).join("text").attr("class", "parallel-sets__header").attr("x", (r) => Y(j(r))).attr("y", M - a * 0.9).attr("text-anchor", "start").attr("font-size", a * qt).text((r) => r.title);
    const V = et.append("g").attr("fill", "none").selectAll("path").data(O.links).join("path").attr("class", "parallel-sets__link").attr("d", Z).attr("stroke", (r) => this.highlight.color(k(r.colorKey), r, { color: r.colorKey })).attr("stroke-width", (r) => Math.max(r.width, 1)), I = et.append("g").selectAll("g").data(O.nodes).join("g").attr("class", "parallel-sets__node");
    I.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (r) => r.x0).attr("y", (r) => r.y0).attr("width", (r) => r.x1 - r.x0).attr("height", (r) => Math.max(r.y1 - r.y0, 1)).attr("fill", D), I.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (r) => r.x0 - Gt).attr("y", (r) => r.y0 - Gt / 2).attr("width", (r) => r.x1 - r.x0 + Gt * 2).attr("height", (r) => Math.max(r.y1 - r.y0, 1) + Gt), I.append("text").attr("class", "parallel-sets__label").attr("x", Y).attr("y", (r) => (r.y0 + r.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((r) => `${r.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * qt).text((r) => r.count), s && this._bindHover(I, V, O);
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
      return l ? l.type === "link" ? l.keys.every((c, h) => a.keys[h] === c) : a.keys[l.node.dim] === l.node.key : !0;
    }, i = () => {
      const a = this.hovered != null, l = /* @__PURE__ */ new Set();
      if (a)
        for (const c of n.links)
          s(c) && (l.add(c.source.id), l.add(c.target.id));
      e.classed("parallel-sets__link--active", (c) => a && s(c)).classed("parallel-sets__link--muted", (c) => a && !s(c)), t.classed("parallel-sets__node--muted", (c) => a && !l.has(c.id));
    };
    this._applyHover = i, t.on("mouseenter", (a, l) => {
      const c = { type: "node", node: l };
      this._setHovered(c), this.tooltip.show(this._nodeTooltip(c), a, l);
    }).on("mousemove", (a) => this.tooltip.move(a)), e.on("mouseenter", (a, l) => {
      const c = l.keys.slice(0, l.pair + 2), h = n.links.filter((f) => f.pair === l.pair && c.every((k, _) => f.keys[_] === k)).reduce((f, k) => f + k.value, 0), p = l.labels.slice(0, c.length), x = { type: "link", keys: c, labels: p, pair: l.pair, value: h };
      this._setHovered(x), this.tooltip.show(this._linkTooltip(x), a, l);
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
    At(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function vn(o, t, e, n) {
  for (let s = 0; s < t; s++) {
    const i = o.filter((h) => h.dim === s).sort((h, p) => h.y0 - p.y0);
    if (i.length < 2) continue;
    const a = i.reduce((h, p) => h + (p.y1 - p.y0), 0), l = (n - e - a) / (i.length - 1);
    let c = e;
    for (const h of i) {
      const p = h.y1 - h.y0;
      h.y0 = c, h.y1 = c + p, c += p + l;
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
  kn as BarChart,
  $n as BoxPlotChart,
  he as FONT_SIZES,
  Tt as Highlight,
  xt as MUTED_COLOR,
  zn as ParallelSetsChart,
  Sn as ScatterPlot,
  An as StackedBarChart,
  Ht as Tooltip,
  Mn as TreeChart,
  Xt as barLabel,
  ws as boxStats,
  bn as categoryColors,
  wn as countBy,
  Ln as countByStacked,
  ft as defaultColors,
  At as drawLegend,
  Ue as drawSequentialLegend,
  Yt as drawTopTitle,
  _t as hasValue,
  vt as maxTextWidth,
  zt as measureText,
  qe as prepareBarChart,
  Ls as prepareBoxPlotChart,
  gn as prepareParallelSets,
  ps as prepareScatterPlot,
  os as prepareStackedBarChart,
  Rs as prepareTreeChart,
  Ct as resolveFontSize,
  bt as titleLane,
  It as titleOnTop,
  Bt as topTitleLane
};
