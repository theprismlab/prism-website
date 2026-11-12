import * as L from "d3";
const Cs = [
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
function wt(n) {
  return n <= L.schemeTableau10.length ? L.schemeTableau10 : Cs;
}
function Mn(n, t) {
  const e = L.rollup(
    n,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), o = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: o, range: wt(o.length) };
}
const as = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, rs = {
  field: null,
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, ls = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0,
  position: "inline"
}, cs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
};
function ce(n) {
  return n.showTitle === !1 ? null : n.title;
}
function hs(n) {
  return n.showTicks === !1 ? null : n.showTitle === !1 ? n.title == null ? null : "" : n.title;
}
function us(n, t) {
  return {
    category: n.category ?? (t ? n.y : n.x),
    value: n.value ?? (t ? n.x : n.y)
  };
}
function ds(n) {
  return n == null ? null : typeof n == "function" ? n : (t) => t[n];
}
function Q(n, t = {}) {
  const e = { ...n, ...t };
  return e.accessor = ds(e.field), e;
}
function Z(n, t) {
  return n.title ?? (typeof n.field == "string" ? n.field : t);
}
function pt(n, t) {
  return [.../* @__PURE__ */ new Set([...n ?? [], ...t])];
}
function Ce(n) {
  var t;
  return ((t = n.tickValues) == null ? void 0 : t.filter((e) => n.domain.includes(e))) ?? null;
}
function Ht(n) {
  switch (n) {
    case "log":
      return L.scaleLog();
    case "sqrt":
      return L.scaleSqrt();
    default:
      return L.scaleLinear();
  }
}
function Nt(n, t = [0, 1]) {
  const [e, o] = L.extent(n);
  return e === void 0 ? t : e === o ? [e - 1, o + 1] : [e, o];
}
function de(n, t, e) {
  return Ht(n).domain(t).nice(e ?? void 0).domain();
}
function Qt(n, t) {
  return t.tickValues ? t.tickValues : n.ticks ? n.ticks(t.ticks ?? void 0) : n.domain();
}
function Dt(n, t) {
  return t.tickValues ? n.tickValues(t.tickValues) : t.ticks != null && n.ticks(t.ticks), t.format && n.tickFormat(t.format), n;
}
function pe(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : wt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : L.interpolateRgbBasis(n.range);
    return L.scaleSequential(n.domain, t);
  }
  return L.scaleOrdinal(n.domain, n.range);
}
function Es(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : Ht(n.type).domain(n.domain).range(n.range);
}
const Hs = { ...rs, field: "count" };
function $n(n, t, { sort: e, group: o } = {}) {
  const s = (a) => (r) => r[a] || "(blank)", i = (a, r) => {
    const l = L.rollup(a, (d) => d.length, s(t)), h = Array.from(
      l,
      ([d, f]) => o == null ? { label: d, count: f } : { group: r, label: d, count: f }
    );
    return e === "descending" ? h.sort((d, f) => f.count - d.count) : e === "ascending" && h.sort((d, f) => d.count - f.count), h;
  };
  return o == null ? i(n) : Array.from(
    L.group(n, s(o)),
    ([a, r]) => i(r, a)
  ).flat();
}
function he(n, t, e = "both") {
  const o = `${t ? Math.round(n / t * 100) : 0}%`;
  switch (e) {
    case "count":
      return String(n);
    case "percent":
      return o;
    case "none":
      return "";
    default:
      return `${n} (${o})`;
  }
}
function Os(n = [], t = {}) {
  const e = t.axis ?? {}, o = us(e, t.orientation === "horizontal"), s = Q(as, o.category), i = Q(Hs, o.value), a = Q(ls, e.group), r = Q(cs, e.color), l = r.accessor ?? s.accessor, h = (p) => ({
    count: L.sum(p, i.accessor),
    color: l(p[0])
  });
  let d;
  if (a.accessor) {
    const p = L.rollup(n, h, a.accessor, s.accessor);
    a.domain = pt(a.domain, p.keys()), d = a.domain.flatMap((v) => {
      const x = p.get(v) ?? /* @__PURE__ */ new Map();
      return pt(s.domain, x.keys()).filter((m) => x.has(m)).map((m) => ({ group: v, label: m, ...x.get(m) }));
    }), s.domain = [...new Set(d.map((v) => v.label))];
  } else {
    const p = L.rollup(n, h, s.accessor);
    s.domain = pt(s.domain, p.keys()), d = s.domain.map((v) => {
      var x, m;
      return {
        group: null,
        label: v,
        count: ((x = p.get(v)) == null ? void 0 : x.count) ?? 0,
        color: ((m = p.get(v)) == null ? void 0 : m.color) ?? v
      };
    });
  }
  s.tickValues = Ce(s), i.domain ?? (i.domain = de(i.type, [0, L.max(d, (p) => p.count) || 1], i.ticks)), r.domain = pt(
    r.domain,
    d.map((p) => p.color)
  ), r.range ?? (r.range = wt(r.domain.length));
  const f = t.total ?? L.sum(d, (p) => p.count);
  return { axes: { category: s, value: i, group: a, color: r }, bars: d, total: f };
}
const kt = "#cfcfcf";
class Ot {
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
    var o;
    return ((o = this.selection.get(t)) == null ? void 0 : o.has(e)) ?? !1;
  }
  /**
   * A legend click. Without `extend`, the key becomes the dimension's only
   * selection, or clears it when it already was. With `extend` (shift or cmd
   * click), the key is added to or removed from the selection.
   */
  toggle(t, e, { extend: o = !1 } = {}) {
    const s = this.selection.get(t) ?? /* @__PURE__ */ new Set();
    let i;
    o ? (i = new Set(s), i.has(e) ? i.delete(e) : i.add(e)) : i = s.size === 1 && s.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), i.size ? this.selection.set(t, i) : this.selection.delete(t), this._changed();
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
  includes(t, e = {}, o = e.layer) {
    if (this.predicate && !this.predicate(t, o)) return !1;
    for (const [s, i] of this.selection)
      if (!i.has(e[s])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, o, s) {
    return this.includes(e, o, s) ? t : kt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Tt = 6, Vt = 12, ps = 8, fs = 0.35, gs = 0.3, Se = "rgba(0,0,0,0.7)", fe = "rgba(0,0,0,0.5)", Rs = "rgba(0,0,0,0.08)";
function ms(n, t, e) {
  return {
    horizontal: n,
    innerWidth: t,
    innerHeight: e,
    at: (o, s) => n ? [s, o] : [o, s],
    catExtent: n ? e : t,
    valExtent: n ? t : e,
    axisAcross: n ? 0 : e,
    outward: n ? -1 : 1
  };
}
function ys(n, { grouped: t, padding: e, groupPadding: o, headingLanes: s = !0 }) {
  var d;
  const i = t ? o ?? e : 0, a = [];
  for (const f of n) {
    const p = t && f.group !== ((d = a.at(-1)) == null ? void 0 : d.group);
    p && s && a.push({ group: f.group, item: null, starts: !1 }), a.push({ group: f.group, item: f, starts: p });
  }
  const r = t && s ? (1 + e) / 2 + i / 2 : e;
  let l = 0;
  a.forEach((f, p) => {
    const v = !f.item;
    !s && p > 0 && f.starts && (l += i), v && p > 0 && (l += i / 2), f.offset = l, l += 1, v && (l += i / 2);
  });
  const h = 2 * r + l - e;
  return {
    lanes: a,
    totalSteps: h,
    firstFraction: (r + (1 - e) / 2) / h,
    place([f, p]) {
      const v = (p - f) / h, x = v * (1 - e);
      for (const w of a)
        w.pos = f + (r + w.offset) * v + x / 2, w.item && (w.item.pos = w.pos);
      const m = [];
      if (t) {
        for (const w of a) {
          if (!w.item) continue;
          const k = w.pos + x / 2;
          w.starts ? m.push({ group: w.group, from: w.pos - x / 2, to: k, sep: null }) : m.at(-1).to = k;
        }
        m.forEach((w, k) => {
          k > 0 && (w.sep = (m[k - 1].to + w.from) / 2);
        });
      }
      return { step: v, bandwidth: x, spans: m };
    }
  };
}
function xs({ fontSize: n, labelWidth: t, totalSteps: e, firstFraction: o, width: s, left: i, right: a }) {
  const r = (s - i - a) / e < t, l = Tt + 3 + n, h = r ? (t + Tt + 3 + 0.75 * n) * Math.SQRT1_2 + 0.3 * n : l;
  if (!r) return { tilt: r, depth: h, extra: 0, left: i };
  const d = Math.round(t * Math.SQRT1_2), f = o;
  return {
    tilt: r,
    depth: h,
    extra: h - l,
    left: Math.max(i, Math.ceil((d - f * (s - a)) / (1 - f)))
  };
}
function Ft(n, t, e) {
  return n.attr("x1", (o) => t(o)[0]).attr("y1", (o) => t(o)[1]).attr("x2", (o) => e(o)[0]).attr("y2", (o) => e(o)[1]);
}
function _s(n, t, e, o) {
  const s = n.append("g").selectAll("line").data(o).join("line");
  return s.attr("stroke", Rs), Ft(
    s,
    (i) => t.at(0, e(i)),
    (i) => t.at(t.catExtent, e(i))
  );
}
function ws(n, t, e = !1) {
  const { innerWidth: o, innerHeight: s } = t;
  return n.append("path").attr("d", e ? `M0,0H${o}V${s}H0Z` : `M0,0V${s}H${o}`).attr("fill", "none").attr("stroke", fe);
}
function vs(n, t, e, { fontSize: o, tickValues: s, format: i }) {
  const a = t.horizontal ? L.axisBottom(e) : L.axisLeft(e), r = n.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(a.tickValues(s).tickFormat(i).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", o), r.selectAll("text").attr("fill", Se), r.selectAll(".tick line").attr("stroke", fe), r.select(".domain").remove(), r;
}
function bs(n, t, e, { fontSize: o, ticked: s, label: i, heading: a, tilt: r, groups: l }) {
  const { horizontal: h, at: d, axisAcross: f, outward: p, valExtent: v } = t, x = n.append("g").attr("font-size", o), m = x.selectAll("g").data(e.filter((u) => !u.item || s(u.item))).join("g").attr("transform", (u) => `translate(${d(u.pos, f).join(",")})`);
  Ft(
    m.append("line"),
    () => d(0, p * Tt),
    (u) => d(0, u.item ? 0 : -p * v)
  );
  const [w, k] = d(0, p * (Tt + 3)), M = m.append("text").attr("x", w).attr("y", k).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em").attr("fill", Se).each(function(u) {
    const T = L.select(this);
    u.item ? i(T, u.item) : T.attr("font-weight", 600).text(a(u.group));
  });
  if (r && M.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: u, position: T, across: I } = l;
    Ft(
      x.selectAll(".separator").data(u.slice(1)).join("line"),
      (P) => d(P.sep, f),
      (P) => d(P.sep, f - p * v)
    );
    const O = x.selectAll(".heading").data(u).join("text").attr("font-weight", 600).attr("fill", Se).text((P) => a(P.group));
    T === "outside" ? O.attr("transform", (P) => {
      const [K, Y] = d((P.from + P.to) / 2, I);
      return `translate(${K},${Y})` + (h ? " rotate(90)" : "");
    }).attr("text-anchor", "middle") : O.attr("x", (P) => d((P.from + P.to) / 2, I)[0]).attr("y", (P) => d((P.from + P.to) / 2, I)[1]).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em");
  }
  return x.selectAll("line").attr("stroke", fe), x;
}
const Ps = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function zt(n, t, e) {
  const { title: o, tickValues: s, fontSize: i, highlight: a, dimension: r = "color" } = e, l = e.format ?? ((w) => w), h = e.key ?? ((w) => w), d = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", f = (w) => Ps.has(d(w)) ? d(w) : "square";
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  n.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const p = a != null, v = (w) => p && a.active && !a.isSelected(r, h(w)), x = (w, k) => a.toggle(r, h(k), { extend: w.shiftKey || w.metaKey }), m = n.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", p).classed("chart-legend__item--muted", v);
  p && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (w) => a.isSelected(r, h(w))).on("click", x).on("keydown", (w, k) => {
    w.key !== "Enter" && w.key !== " " || (w.preventDefault(), x(w, k));
  }), m.append("i").attr("class", (w) => `chart-legend__swatch chart-legend__swatch--${f(w)}`).style("color", (w) => v(w) ? kt : t(w)), m.append("span").text((w) => l(w));
}
let Is = 0;
function Bs(n, t, e) {
  const { title: o, fontSize: s, width: i = 160 } = e;
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  const a = s ?? 12;
  n.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const [r, l] = t.domain(), h = Math.ceil(a * 1.5), d = Math.round(a * 0.67), f = n.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", d + 3 + Math.ceil(a * 1.4)), p = `chart-legend-ramp-${Is += 1}`;
  f.append("linearGradient").attr("id", p).selectAll("stop").data(L.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(r + m * (l - r)));
  const v = f.append("g").attr("transform", `translate(${h},0)`);
  v.append("rect").attr("width", i).attr("height", d).attr("fill", `url(#${p})`);
  const x = L.axisBottom(L.scaleLinear([r, l], [0, i]));
  v.append("g").attr("transform", `translate(0,${d})`).call(Dt(x, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const Ie = { small: 10, medium: 12, large: 14 };
function Rt(n = "medium") {
  if (typeof n == "number") return n;
  if (!(n in Ie)) throw new Error(`Unknown chart font size "${n}"`);
  return Ie[n];
}
function _t(n, t) {
  return t ? n + 16 : 0;
}
const Ds = 0.5, Ns = 0.72, Vs = 5, ks = 8;
function Jt(n) {
  return !!n.title && n.titlePosition === "top";
}
function Gt(n) {
  return n * 1.5 + ks;
}
function ge(n, t, { fontSize: e, color: o }) {
  const s = e * Ds, i = -(e / 2 + ks), a = n.append("g").attr("class", "axis-title axis-title--top"), r = a.append("text").attr("x", s + Vs).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, h = s / 2, d = i - e * Ns, f = a.append("path").attr("d", `M${l},${i}V${d}M${l - h},${d + h}L${l},${d}L${l + h},${d + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return o && (r.attr("fill", o), f.attr("stroke", o)), a;
}
let Kt;
const Fs = 0.55;
function Et(n, t, e, o = 400) {
  if (Kt === void 0 && (Kt = document.createElement("canvas").getContext("2d")), !Kt) return String(n).length * t * Fs;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Kt.font = `${o} ${t}px ${s}`, Kt.measureText(String(n)).width;
}
function yt(n, t, e, o) {
  let s = 0;
  for (const i of n)
    s = Math.max(s, Et(i, t, e, o));
  return s;
}
class Pt {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = L.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
  }
  /** Set the text size in px (the chart's font size). */
  fontSize(t) {
    return this.div.style("font-size", `${t}px`), this;
  }
  /**
   * Show `content` for `target` beside the cursor of `event`. The content is
   * rebuilt only when the target changes.
   */
  show(t, e, o = t) {
    if (o !== this.target)
      if (this.target = o, this.div.selectAll("*").remove(), typeof t == "string")
        this.div.html(t);
      else {
        const s = this.div.append("table").selectAll("tr").data(t).join("tr");
        s.append("th").text(([i]) => i), s.append("td").text(([, i]) => i);
      }
    this.div.style("display", null), this.move(e);
  }
  /** Place the tooltip beside the cursor of `event`, flipping to stay inside the root. */
  move(t) {
    const [e, o] = L.pointer(t, this.root), s = this.div.node(), i = 14, a = e + i + s.offsetWidth > this.root.clientWidth ? e - i - s.offsetWidth : e + i, r = o + i + s.offsetHeight > this.root.clientHeight ? o - i - s.offsetHeight : o + i;
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
const Be = 6, xe = 0.85, Gs = "rgba(0,0,0,0.55)", De = "rgba(0,0,0,0.6)", Xs = {
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
  rangePadding: 0,
  border: !1,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
};
class Tn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Xs, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = L.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Pt(t), this.draw();
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
    var o, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (o = this.options).onHover) == null || s.call(o, t));
  }
  /**
   * The layout is the same whichever way the chart is turned: lanes along the
   * category axis, one per bar, and the counts along the value axis (see
   * chartLanes.js). Everything is placed as a position `along` the category
   * axis and one `across` it, and the frame's `at` maps the pair to screen
   * coordinates: the one place the orientation turns the layout.
   */
  draw() {
    const { width: t, rowHeight: e, groupPadding: o, rangePadding: s, border: i } = this.options, a = this.options.orientation === "horizontal", r = this.svg.node(), l = Rt(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: h, bars: d, total: f } = Os(this.options.data, this.options), { category: p, value: v, group: x, color: m } = h, w = !!x.accessor, k = p.domain, M = p.format ?? String, u = x.format ?? String, T = (H) => (w ? `${u(H.group)} / ` : "") + M(H.label), I = this.options.barLabel !== "none", O = (H) => he(H.count, f, this.options.barLabel);
    this._tooltipRows = (H) => {
      const ct = he(H.count, f, "percent"), St = [
        [Z(p, "category"), M(H.label)],
        [Z(v, "count"), `${H.count} of ${f} (${ct})`]
      ];
      return w && St.unshift([Z(x, "group"), u(H.group)]), this.options.tooltip ? this.options.tooltip(H, St) : St;
    };
    const P = Ht(v.type).domain(v.domain), K = Qt(P, v), Y = v.format ?? P.tickFormat(v.ticks ?? void 0), at = new Set(p.tickValues ?? k), st = p.showTicks !== !1, ot = v.showTicks !== !1, W = w && x.showTicks !== !1 ? x.position : null, tt = W === "inline", c = W === "axis", S = ys(d, {
      grouped: w,
      padding: a ? gs : fs,
      groupPadding: o,
      headingLanes: tt
    }), { lanes: A, totalSteps: _ } = S, b = w ? x.domain.map(u) : [], [z, N] = [ce(p), ce(v)], [rt, et] = a ? [N, z] : [z, N], lt = !!et && Jt(a ? p : v), ht = lt ? 0 : _t(l, et), ut = yt(b, l, r, 600), nt = Math.max(
      st ? yt(k.map(M), l, r) : 0,
      tt ? ut : 0
    ), ft = st || tt, gt = W === "outside" ? l + ps : 0, xt = yt(d.map(O), l * xe, r, 600);
    let X, dt, vt = !1, $;
    if (a)
      $ = ft ? nt + Vt : 0, X = {
        top: lt ? Gt(l) : l,
        right: xt + Be + 8 + gt,
        bottom: (ot ? l + 16 : 8) + _t(l, rt),
        left: ht + $ + (c ? ut + Vt : 0)
      }, dt = X.top + (w ? _ : A.length) * e + X.bottom;
    else {
      X = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((I ? l * xe : 0) + 16, lt ? Gt(l) : 0) + gt,
        right: 16,
        bottom: 0,
        // below
        left: ht + (ot ? yt(K.map(Y), l, r) + Vt : 0)
      };
      const H = ft ? xs({
        fontSize: l,
        labelWidth: nt,
        totalSteps: _,
        firstFraction: S.firstFraction,
        width: t,
        left: X.left,
        right: X.right
      }) : { tilt: !1, depth: 0, extra: 0, left: X.left };
      vt = H.tilt, $ = H.depth, X.bottom = $ + (c ? Tt + 3 + l : 0) + 15 + _t(l, rt), X.left = H.left, dt = this.options.height + H.extra;
    }
    const C = t - X.left - X.right, F = dt - X.top - X.bottom, q = ms(a, C, F), { at: j, outward: V } = q, { bandwidth: g, spans: E } = S.place(p.range || [0, q.catExtent]), R = P.range(
      v.range || (a ? [s, C - s] : [F - s, s])
    ), B = R(P.domain()[0]), G = L.scaleOrdinal(m.domain, m.range), J = (H) => this.highlight.color(G(H.color), H, { color: H.color });
    this.root.style("max-width", `${t}px`);
    const mt = this.svg.attr("viewBox", `0 0 ${t} ${dt}`).attr(
      "aria-label",
      `Bar chart of ${Z(v, "count")} by ${Z(p, "category")}` + (w ? ` within ${Z(x, "group")}` : "") + `. ${d.map((H) => `${T(H)}: ${H.count}`).join(", ")}`
    );
    mt.selectAll("*").remove();
    const U = mt.append("g").attr("transform", `translate(${X.left},${X.top})`);
    _s(U, q, R, K), ot && vs(U, q, R, { fontSize: l, tickValues: K, format: Y }), ws(U, q, i);
    const te = W && !tt ? {
      spans: E,
      position: W,
      across: W === "outside" ? a ? C + X.right - l : -X.top + l : q.axisAcross + V * ($ + Tt + 3)
    } : null;
    bs(U, q, A, {
      fontSize: l,
      ticked: (H) => st && at.has(H.label),
      label: (H, ct) => H.text(M(ct.label)),
      heading: u,
      tilt: vt,
      groups: te
    });
    const At = (H) => {
      const [ct, St] = j(H.pos - g / 2, Math.min(B, R(H.count))), [me, It] = j(g, Math.abs(R(H.count) - B));
      return { x: ct, y: St, w: me, h: It };
    }, Xt = U.append("g").selectAll("g").data(d).join("g");
    if (Xt.append("rect").attr("rx", 3).attr("fill", J).attr("x", (H) => At(H).x).attr("y", (H) => At(H).y).attr("width", (H) => At(H).w).attr("height", (H) => At(H).h).on("mouseenter", (H, ct) => this._setHovered(ct, H)).on("mousemove", (H) => this.tooltip.move(H)).on("mouseleave", () => this._setHovered(null)), I) {
      const H = (ct) => j(ct.pos, R(ct.count) - V * Be);
      Xt.append("text").attr("x", (ct) => H(ct)[0]).attr("y", (ct) => H(ct)[1]).attr("dy", a ? "0.35em" : null).attr("text-anchor", a ? "start" : "middle").attr("font-size", l * xe).attr("font-weight", 600).attr("fill", Gs).text(O);
    }
    const Ut = (H) => mt.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", De).text(H || "");
    Ut(rt).attr("x", X.left + C / 2).attr("y", dt - l), lt ? ge(U, et, { fontSize: l, color: De }) : Ut(et).attr(
      "transform",
      `translate(${l + 2},${X.top + F / 2}) rotate(-90)`
    ), zt(this.legend, G, {
      ...m,
      title: hs(m),
      fontSize: l,
      highlight: this.highlight
    });
  }
}
const Us = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ws = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, js = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function zn(n, t, e, { sort: o } = {}) {
  const s = L.group(n, (a) => a[t] || "(blank)"), i = Array.from(s, ([a, r]) => ({ label: a, count: r.length, group: r }));
  return o === "descending" ? i.sort((a, r) => r.count - a.count) : o === "ascending" && i.sort((a, r) => a.count - r.count), i.flatMap(
    ({ label: a, group: r }) => Array.from(
      L.rollup(
        r,
        (l) => l.length,
        (l) => l[e] || "(blank)"
      ),
      ([l, h]) => ({ label: a, key: l, count: h })
    )
  );
}
function qs(n = [], t = {}) {
  const e = t.axis ?? {}, o = Q(Us, e.y), s = Q(Ws, e.x), i = Q(js, e.color), a = L.rollup(
    n,
    (h) => L.sum(h, s.accessor),
    o.accessor,
    i.accessor
  );
  o.domain = pt(o.domain, a.keys()), o.tickValues = Ce(o), i.domain = pt(i.domain, n.map(i.accessor));
  const r = o.domain.map((h) => {
    const d = a.get(h);
    let f = 0;
    const p = [];
    for (const v of i.domain) {
      const x = (d == null ? void 0 : d.get(v)) ?? 0;
      x > 0 && p.push({ key: v, count: x, start: f, end: f += x });
    }
    return { label: h, count: f, segments: p };
  });
  s.domain ?? (s.domain = de(s.type, [0, L.max(r, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = wt(i.domain.length));
  const l = t.total ?? L.sum(r, (h) => h.count);
  return { axes: { category: o, value: s, color: i }, bars: r, total: l };
}
const Ks = 12, Ne = 6, Ve = 0.85, Ys = "rgba(0,0,0,0.55)", Zs = {
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
class Cn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Zs, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = L.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Pt(t), this.draw();
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
    var o, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (o = this.options).onHover) == null || s.call(o, t));
  }
  draw() {
    const { width: t, rowHeight: e } = this.options, o = this.svg.node(), s = Rt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: r } = qs(this.options.data, this.options), { category: l, value: h, color: d } = i, f = l.domain, p = l.format ?? String, v = d.format ?? String, x = (_) => he(_.count, r, this.options.barLabel);
    this._tooltipRows = (_) => {
      const b = [
        [Z(l, "category"), p(_.label)],
        [Z(d, "group"), v(_.key)],
        [Z(h, "count"), `${_.count} of ${_.barCount}`],
        ["Share of total", he(_.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(_, b) : b;
    };
    const m = Jt(l), w = yt(f.map(p), s, o), k = {
      top: m ? Gt(s) : s,
      right: yt(a.map(x), s * Ve, o, 600) + Ne + 8,
      bottom: s + 16 + _t(s, h.title),
      left: (m ? 0 : _t(s, l.title)) + w + Ks
    }, M = t - k.left - k.right, u = f.length * e, T = k.top + u + k.bottom, I = L.scaleBand().domain(f).range(l.range || [0, u]).padding(0.3), O = Ht(h.type).domain(h.domain).range(h.range || [0, M]), P = L.scaleOrdinal(d.domain, d.range), K = (_) => this.highlight.color(P(_.key), _, { color: _.key }), Y = Qt(O, h), at = h.format ?? O.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const st = a.map((_) => {
      const b = _.segments.map((z) => `${v(z.key)} ${z.count}`).join(", ");
      return `${p(_.label)}: ${_.count} (${b})`;
    }).join("; "), ot = this.svg.attr("viewBox", `0 0 ${t} ${T}`).attr(
      "aria-label",
      `Stacked bar chart of ${Z(h, "count")} by ${Z(l, "category")}, split by ${Z(d, "group")}. ${st}`
    );
    ot.selectAll("*").remove();
    const W = ot.append("g").attr("transform", `translate(${k.left},${k.top})`), tt = W.append("g").call(
      L.axisLeft(I).tickValues(l.tickValues ?? f).tickFormat(p).tickSizeOuter(0)
    ), c = W.append("g").attr("transform", `translate(0,${u})`).call(L.axisBottom(O).tickValues(Y).tickFormat(at).tickSizeOuter(0));
    for (const _ of [tt, c])
      _.attr("font-family", null).attr("font-size", s), _.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), _.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    W.insert("g", ":first-child").selectAll("line").data(Y).join("line").attr("y2", u).attr("x1", (_) => O(_)).attr("x2", (_) => O(_)).attr("stroke", "rgba(0,0,0,0.08)");
    const S = W.append("g").selectAll("g").data(a).join("g");
    S.selectAll("rect").data((_) => _.segments.map((b) => ({ ...b, label: _.label, barCount: _.count }))).join("rect").attr("x", (_) => O(_.start)).attr("y", (_) => I(_.label)).attr("width", (_) => Math.max(0, O(_.end) - O(_.start))).attr("height", I.bandwidth()).attr("fill", K).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (_, b) => this._setHovered(b, _)).on("mousemove", (_) => this.tooltip.move(_)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && S.append("text").attr("x", (_) => O(_.count) + Ne).attr("y", (_) => I(_.label) + I.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ve).attr("font-weight", 600).attr("fill", Ys).text(x);
    const A = (_) => ot.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(_ || "");
    A(h.title).attr("x", k.left + M / 2).attr("y", T - s), m ? ge(W, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : A(l.title).attr(
      "transform",
      `translate(${s + 2},${k.top + u / 2}) rotate(-90)`
    ), zt(this.legend, P, { ...d, fontSize: s, highlight: this.highlight });
  }
}
const Ee = (n) => typeof n == "number" ? L.format(".2f")(n) : String(n), Ls = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: Ee
}, Qs = { ...Ls, field: "y" }, Js = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: Ee
}, to = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: Ee
}, eo = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function so(n = [{}], t = []) {
  const e = n.map((s, i) => ({
    ...eo,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function oo(n = [], t = {}) {
  const e = t.axis ?? {}, o = Q(Ls, e.x), s = Q(Qs, e.y), i = Q(Js, e.color), a = Q(to, e.radius), r = so(t.layers, n), l = r.flatMap((h) => h.data);
  for (const h of [o, s]) h.domain ?? (h.domain = de(h.type, Nt(l.map(h.accessor))));
  if (i.accessor) {
    const h = r.filter((d) => !d.color).flatMap((d) => d.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = Nt(h)), i.range ?? (i.range = L.interpolateViridis)) : (i.domain = pt(i.domain, h), i.range ?? (i.range = wt(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Nt(l.map(a.accessor)))), { axes: { x: o, y: s, color: i, radius: a }, layers: r };
}
const no = {
  data: [],
  axis: {},
  layers: [{}],
  fontSize: "medium",
  width: null,
  height: 480,
  margin: {},
  key: (n, t) => t,
  hoverRadius: 24,
  rangePadding: 10,
  border: !1,
  duration: 500,
  tooltip: null,
  onZoomChange: null,
  onHover: null,
  onHighlightChange: null
}, io = 0.92;
function _e(n, t, e) {
  return Ht(n.type).domain(t).range(n.range ?? e);
}
function ao(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : wt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : L.interpolateRgbBasis(n.range);
    return L.scaleSequential(n.domain, t);
  }
  return L.scaleOrdinal(n.domain, n.range);
}
function ro(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : Ht(n.type).domain(n.domain).range(n.range);
}
class En {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...no }, this.axes = null, this.layers = [], this.highlight = new Ot(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    const s = this.options.layers.map(
      (i, a) => a === o ? { ...i, data: t } : i
    );
    return this.update({ layers: s });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = Rt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: o } = oo(this.options.data, this.options);
    this.axes = e, this.layers = o, this.layerGroups = this.pointsG.selectAll("g").data(this.layers, (s) => s.id).join("g").attr("class", (s) => `scatter-plot__layer scatter-plot__layer--${s.id}`), this._hideTooltip(), this._render(!1);
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
    const { x: o, y: s } = this.scales, [i, a] = o.domain(), [r, l] = s.domain(), h = o.invert(0) - o.invert(t), d = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [i + h, a + h], y: [r + d, l + d] }, !1);
  }
  _setZoomDomain(t, e) {
    var s, i;
    const o = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), o || (i = (s = this.options).onZoomChange) == null || i.call(s, !0);
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
    this.root = L.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = L.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = L.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new Pt(this.container);
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
    const t = this.fontSize, { x: e, y: o } = this.axes, s = Jt(o), i = { ...this.options.margin };
    if (i.top ?? (i.top = s ? Gt(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + _t(t, e.title)), i.left == null) {
      const a = _e(o, this._viewDomain.y, [0, 1]), r = Qt(a, o).map(o.format), l = yt(r, t * io, this.container);
      i.left = (s ? 0 : _t(t, o.title)) + l + 8;
    }
    return i;
  }
  _render(t) {
    const { height: e, duration: o } = this.options, s = this.margin = this._resolveMargin(), i = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(i - s.left - s.right, 10), r = Math.max(e - s.top - s.bottom, 10);
    this.width = i, this.innerSize = [a, r], this.svg.attr("width", i).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", a).attr("height", r), this._updateScales(a, r), this.brush.extent([
      [0, 0],
      [a, r]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const l = t ? this.svg.transition().duration(o) : null;
    this._drawAxes(a, r, l), this._drawPoints(l), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: o, y: s, color: i, radius: a } = this.axes, r = this._viewDomain, l = this.options.rangePadding;
    this.scales = {
      x: _e(o, r.x, [l, t - l]),
      y: _e(s, r.y, [e - l, l]),
      color: ao(i),
      radius: ro(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? L.Delaunay.from(
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
    const { x: s, y: i } = this.axes, { margin: a, fontSize: r } = this, l = (h) => o ? h.transition(o) : h;
    l(this.gridX).call(
      Dt(L.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      Dt(L.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      Dt(L.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(Dt(L.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), Jt(i) ? ge(this.titleY, i.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + r + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(o) {
      e._drawLayer(L.select(this), o, t);
    });
  }
  _drawLayer(t, e, o) {
    const s = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (p) => this._px(p), r = (p) => this._py(p), l = (p) => this._pr(p), { highlight: h } = this, d = (p) => h.color(this._pcolor(p, e), p, this._keys(p, e)), f = t.selectAll("circle").data(e.data, s);
    f.exit().remove(), f.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", r).attr("r", l).attr(i, d), (o ? f.transition(o) : f).attr("cx", a).attr("cy", r).attr("r", l).attr(i, d), h.active && t.selectAll("circle").filter((p) => h.includes(p, this._keys(p, e))).raise();
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
      const [o, s] = e.domain(), i = 160, a = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", i).attr("height", 30), r = `${this.clipId}-ramp`;
      a.append("linearGradient").attr("id", r).selectAll("stop").data(L.ticks(0, 1, 10)).join("stop").attr("offset", (h) => h).attr("stop-color", (h) => e(o + h * (s - o))), a.append("rect").attr("width", i).attr("height", 8).attr("fill", `url(#${r})`);
      const l = L.scaleLinear([o, s], [0, i]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(Dt(L.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return zt(this.legend, e, {
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
    return zt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const o = Qt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(o).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...o.map(e));
    return s.append("svg").attr("width", i * 2 + 2).attr("height", i * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", i + 1).attr("cy", i + 1).attr("r", (a) => e(a)), s.append("span").text((a) => t.format(a)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, o], [s, i]] = t.selection;
    if (Math.abs(s - e) < 4 || Math.abs(i - o) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: a, y: r } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([a.invert(e), a.invert(s)], [r.invert(i), r.invert(o)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, o] = L.pointer(t, this.plot.node()), [s, i] = this.innerSize;
    if (e < 0 || e > s || o < 0 || o > i) return this._hideTooltip();
    const a = this.nodes[this.delaunay.find(e, o)];
    if (!a) return this._hideTooltip();
    const r = this._px(a.d), l = this._py(a.d);
    if (Math.hypot(r - e, l - o) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", r).attr("cy", l).attr("r", this._pr(a.d) + 3), this.tooltip.show(this._tooltipRows(a), t, a.d), this._setHovered(a);
  }
  _setHovered(t) {
    var e, o, s;
    ((t == null ? void 0 : t.d) ?? null) !== (((e = this.hovered) == null ? void 0 : e.d) ?? null) && (this.hovered = t, (s = (o = this.options).onHover) == null || s.call(o, (t == null ? void 0 : t.d) ?? null, (t == null ? void 0 : t.layer.id) ?? null));
  }
  _tooltipRows({ d: t, layer: e }) {
    const o = [];
    for (const i of ["x", "y", "color"]) {
      const a = this.axes[i];
      i === "color" && e.color || a.accessor && o.push([Z(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, o, e) : o;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const lo = { ...as, context: null }, co = { ...rs, field: "value" };
function ho(n) {
  const t = [...n].sort(L.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = L.quantile(t, 0.25), o = L.quantile(t, 0.5), s = L.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), r = Math.min(a.length ? a[0] : t[0], e), l = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: o, q3: s, min: r, max: l, mean: L.mean(t) };
}
function uo(n, t) {
  const e = [], o = [];
  for (const s of n) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), o.push(a));
  }
  return { records: e, values: o };
}
function po(n = [], t = {}) {
  const e = t.axis ?? {}, o = us(e, t.orientation !== "vertical"), s = Q(lo, o.category), i = Q(co, o.value), a = Q(ls, e.group), r = Q(cs, e.color), l = ds(s.context), h = (f, p, v) => {
    const { records: x, values: m } = uo(v, i.accessor), w = ho(m), k = v[0];
    return {
      group: f,
      label: p,
      context: l && k ? l(k) ?? null : null,
      count: m.length,
      records: x,
      values: m,
      stats: w,
      outliers: m.map((M, u) => u).filter((M) => m[M] < w.min || m[M] > w.max),
      color: r.accessor && k ? r.accessor(k) ?? null : null
    };
  };
  let d;
  if (a.accessor) {
    const f = L.group(n, a.accessor, s.accessor);
    a.domain = pt(a.domain, f.keys()), d = a.domain.flatMap((p) => {
      const v = f.get(p) ?? /* @__PURE__ */ new Map();
      return pt(s.domain, v.keys()).filter((m) => v.has(m)).map((m) => h(p, m, v.get(m)));
    });
  } else {
    const f = L.group(n, s.accessor);
    d = pt(s.domain, f.keys()).map(
      (p) => h(null, p, f.get(p) ?? [])
    );
  }
  if (s.domain = [...new Set(d.map((f) => f.label))], s.tickValues = Ce(s), i.domain ?? (i.domain = de(i.type, Nt(d.flatMap((f) => f.values)))), r.accessor) {
    const f = d.map((p) => p.color).filter((p) => p != null);
    r.domain = pt(r.domain, f), r.range ?? (r.range = wt(r.domain.length));
  }
  return { axes: { category: s, value: i, group: a, color: r }, boxes: d };
}
const Fe = "rgba(0,0,0,0.45)", we = "rgba(0,0,0,0.6)", fo = {
  data: [],
  orientation: "horizontal",
  axis: {},
  points: !1,
  showCounts: !1,
  threshold: null,
  rangePadding: 10,
  border: !1,
  fontSize: "medium",
  width: 640,
  height: 320,
  rowHeight: 28,
  groupPadding: null,
  hoverRadius: 6,
  tooltip: null,
  onHover: null,
  onHighlightChange: null
}, go = 0.35, mo = 0.55, yo = "rgba(0,0,0,0.87)", ve = 2, oe = 2.5, Ge = 0.45, xo = 0.9;
function _o(n) {
  const t = Math.sin((n + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class Hn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...fo, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = L.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const o = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = o.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = o.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Pt(t), this.draw();
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
  /**
   * The layout is the same whichever way the chart is turned: lanes along the
   * category axis, one per box, and the values along the value axis (see
   * chartLanes.js). Everything is placed as a position `along` the category
   * axis and one `across` it, and the frame's `at` maps the pair to screen
   * coordinates: the one place the orientation turns the layout.
   */
  draw() {
    const { width: t, rowHeight: e, groupPadding: o, points: s, showCounts: i, threshold: a, rangePadding: r, border: l } = this.options, h = this.options.orientation !== "vertical", d = this.svg.node(), f = Rt(this.options.fontSize);
    this.tooltip.fontSize(f), this._leave();
    const { axes: p, boxes: v } = po(this.options.data, this.options), { category: x, value: m, group: w, color: k } = p, M = !!w.accessor, u = x.format ?? String, T = w.format ?? String, I = m.format ?? L.format(".3~f"), O = (y) => y.context != null ? `${y.context} / ` : "", P = (y) => i ? ` (n=${y.count})` : "", K = (y) => O(y) + u(y.label) + P(y), Y = (y) => (M ? `${T(y.group)} / ` : "") + K(y), at = new Set(x.tickValues ?? x.domain), st = Ht(m.type).domain(m.domain), ot = Qt(st, m), W = m.format ?? st.tickFormat(m.ticks ?? void 0), tt = (a == null ? void 0 : a.value) != null && a.value >= Math.min(...m.domain) && a.value <= Math.max(...m.domain), c = tt && a.label ? a.label : null, S = x.showTicks !== !1, A = m.showTicks !== !1, _ = M && w.showTicks !== !1 ? w.position : null, b = _ === "inline", z = _ === "axis", N = ys(v, {
      grouped: M,
      padding: h ? gs : fs,
      groupPadding: o,
      headingLanes: b
    }), { lanes: rt, totalSteps: et } = N, lt = M ? w.domain.map(T) : [], [ht, ut] = [ce(x), ce(m)], [nt, ft] = h ? [ut, ht] : [ht, ut], gt = !!ft && Jt(h ? x : m), xt = gt ? 0 : _t(f, ft), X = yt(lt, f, d, 600), dt = Math.max(
      S ? yt(v.map(K), f, d) : 0,
      b ? X : 0
    ), vt = S || b, $ = _ === "outside" ? f + ps : 0;
    let C, F, q = !1, j;
    if (h)
      j = vt ? dt + Vt : 0, C = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(c ? 2 * f + 8 : f, gt ? Gt(f) : 0),
        right: 16 + $,
        bottom: (A ? f + 16 : 8) + _t(f, nt),
        left: xt + j + (z ? X + Vt : 0)
      }, F = C.top + (M ? et : rt.length) * e + C.bottom;
    else {
      C = {
        top: Math.max(f, gt ? Gt(f) : 0) + $,
        // The threshold label to the right of the plot
        right: 16 + (c ? yt([c], f, d) + 6 : 0),
        bottom: 0,
        // below
        left: xt + (A ? yt(ot.map(W), f, d) + Vt : 0)
      };
      const y = vt ? xs({
        fontSize: f,
        labelWidth: dt,
        totalSteps: et,
        firstFraction: N.firstFraction,
        width: t,
        left: C.left,
        right: C.right
      }) : { tilt: !1, depth: 0, extra: 0, left: C.left };
      q = y.tilt, j = y.depth, C.bottom = j + (z ? Tt + 3 + f : 0) + 15 + _t(f, nt), C.left = y.left, F = this.options.height + y.extra;
    }
    const V = t - C.left - C.right, g = F - C.top - C.bottom, E = ms(h, V, g), { at: R, catExtent: B, outward: G } = E, { bandwidth: J, spans: mt } = N.place(x.range || [0, B]), U = st.range(
      m.range || (h ? [r, V - r] : [g - r, r])
    ), te = pe(k), { highlight: At } = this, Xt = (y, D) => At.includes(y.records[D], { color: y.color }, y), Ut = new Map(
      v.map((y) => [y, !At.active || y.records.some((D, it) => Xt(y, it))])
    ), H = (y) => te(y.color), ct = (y) => Ut.get(y) ? H(y) : kt, St = (y) => Ut.get(y) ? k.accessor ? yo : H(y) : kt, me = k.accessor ? mo : go, It = v.filter((y) => y.count), He = (y, D, it) => {
      const [Mt, $t] = R(it, U(y.values[D]));
      return { box: y, index: D, record: y.records[D], value: y.values[D], x: Mt, y: $t, lit: Xt(y, D) };
    }, Wt = It.flatMap(
      (y) => s ? y.values.map((D, it) => He(y, it, y.pos + _o(it) * J / 2)) : y.outliers.map((D) => He(y, D, y.pos))
    ), Ms = L.group(Wt, (y) => y.box), Oe = (y) => y.lit ? H(y.box) : kt;
    this.root.style("max-width", `${t}px`);
    const $s = It.map((y) => `${Y(y)}: median ${I(y.stats.median)}`).join("; "), ye = this.svg.attr("viewBox", `0 0 ${t} ${F}`).attr(
      "aria-label",
      `Box plot of ${Z(m, "value")} by ${Z(x, "category")}` + (M ? ` within ${Z(w, "group")}` : "") + `. ${$s}`
    );
    ye.selectAll("*").remove();
    const bt = ye.append("g").attr("transform", `translate(${C.left},${C.top})`);
    _s(bt, E, U, ot), A && vs(bt, E, U, { fontSize: f, tickValues: ot, format: W }), ws(bt, E, l);
    const Ts = _ && !b ? {
      spans: mt,
      position: _,
      across: _ === "outside" ? h ? V + C.right - f : -C.top + f : E.axisAcross + G * (j + Tt + 3)
    } : null;
    if (bs(bt, E, rt, {
      fontSize: f,
      ticked: (y) => S && at.has(y.label),
      // A box's label in pieces, so the context and count are lighter
      label: (y, D) => {
        D.context != null && y.append("tspan").attr("fill", Fe).text(O(D)), y.append("tspan").text(u(D.label)), i && y.append("tspan").attr("fill", Fe).text(P(D));
      },
      heading: T,
      tilt: q,
      groups: Ts
    }), tt) {
      const y = U(a.value), [D, it] = R(0, y), [Mt, $t] = R(B, y);
      if (bt.append("line").attr("x1", D).attr("y1", it).attr("x2", Mt).attr("y2", $t).attr("stroke", fe).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), c) {
        const [jt, qt] = R(h ? -6 : B + 6, y);
        bt.append("text").attr("x", jt).attr("y", qt).attr("text-anchor", h ? "middle" : "start").attr("dy", h ? null : "0.32em").attr("font-size", f).attr("fill", we).text(c);
      }
    }
    const Bt = bt.append("g").selectAll("g").data(It).join("g").attr("stroke", ct).attr("fill", ct);
    this.drawPoints(s ? Wt : [], {
      width: t,
      height: F,
      offset: [C.left, C.top],
      color: Oe,
      emphasis: At.active
    }), Ft(
      Bt.append("line"),
      (y) => R(y.pos, U(y.stats.min)),
      (y) => R(y.pos, U(y.stats.max))
    ), Ft(
      Bt.selectAll(".cap").data((y) => [y.stats.min, y.stats.max].map((D) => ({ pos: y.pos, v: D }))).join("line").attr("class", "cap"),
      (y) => R(y.pos - J / 4, U(y.v)),
      (y) => R(y.pos + J / 4, U(y.v))
    );
    const ee = (y) => {
      const D = U(y.stats.q1), it = U(y.stats.q3), [Mt, $t] = R(y.pos - J / 2, Math.min(D, it)), [jt, qt] = R(J, Math.max(1, Math.abs(it - D)));
      return { x: Mt, y: $t, w: jt, h: qt };
    };
    Bt.append("rect").attr("x", (y) => ee(y).x).attr("y", (y) => ee(y).y).attr("width", (y) => ee(y).w).attr("height", (y) => ee(y).h).attr("fill-opacity", me), Ft(
      Bt.append("line"),
      (y) => R(y.pos - J / 2, U(y.stats.median)),
      (y) => R(y.pos + J / 2, U(y.stats.median))
    ).attr("stroke", St).attr("stroke-width", 2), Bt.append("circle").attr("cx", (y) => R(y.pos, U(y.stats.mean))[0]).attr("cy", (y) => R(y.pos, U(y.stats.mean))[1]).attr("r", 3).attr("fill", St), s || Bt.selectAll(".outlier").data((y) => Ms.get(y) ?? []).join("circle").attr("class", "outlier").attr("cx", (y) => y.x).attr("cy", (y) => y.y).attr("r", oe).attr("fill", "#fff").attr("stroke", Oe), this.hoverRing = bt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? ve : oe) + 2.5).style("display", "none");
    const Re = (y) => ye.append("text").attr("text-anchor", "middle").attr("font-size", f).attr("font-weight", 600).attr("fill", we).text(y || "");
    Re(nt).attr("x", C.left + V / 2).attr("y", F - f), gt ? ge(bt, ft, { fontSize: f, color: we }) : Re(ft).attr(
      "transform",
      `translate(${f + 2},${C.top + g / 2}) rotate(-90)`
    ), zt(this.legend, te, {
      ...k,
      title: k.accessor ? hs(k) : null,
      fontSize: f,
      highlight: this.highlight
    });
    const { tooltip: se } = this.options, Pe = Z(x, "category"), zs = (y) => {
      const [D, it] = [U(y.stats.min), U(y.stats.max)];
      return [Math.min(D, it) - oe, Math.max(D, it) + oe];
    };
    this.hit = {
      margin: C,
      marks: Wt,
      delaunay: Wt.length ? L.Delaunay.from(
        Wt,
        (y) => y.x,
        (y) => y.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (y, D) => {
        const [it, Mt] = R(y, D);
        return It.find(($t) => {
          const [jt, qt] = zs($t);
          return Math.abs(it - $t.pos) <= J / 2 && Mt >= jt && Mt <= qt;
        }) ?? null;
      },
      markRows: (y) => {
        const D = [
          [Pe, Y(y.box)],
          [Z(m, "value"), I(y.value)]
        ];
        return se ? se(y.record, D, y.box) : D;
      },
      boxRows: (y) => {
        const D = y.stats, it = [
          [Pe, Y(y)],
          ["n", String(y.count)],
          ["Median", I(D.median)],
          ["Mean", I(D.mean)],
          ["Q1", I(D.q1)],
          ["Q3", I(D.q3)],
          ["Whiskers", `${I(D.min)} to ${I(D.max)}`]
        ];
        return se ? se(null, it, y) : it;
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
  drawPoints(t, { width: e, height: o, offset: [s, i], color: a, emphasis: r }) {
    var v, x;
    this.canvas.style("display", t.length ? null : "none");
    const l = (x = (v = this.canvas.node()).getContext) == null ? void 0 : x.call(v, "2d");
    if (!l) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(o * h)), l.setTransform(h, 0, 0, h, 0, 0), l.clearRect(0, 0, e, o);
    const d = (m, w, k) => {
      l.globalAlpha = k, l.fillStyle = m, l.beginPath();
      for (const M of w) {
        const u = M.x + s, T = M.y + i;
        l.moveTo(u + ve, T), l.arc(u, T, ve, 0, 2 * Math.PI);
      }
      l.fill();
    }, f = L.group(t, a), p = f.get(kt);
    p && d(kt, p, Ge);
    for (const [m, w] of f)
      m !== kt && d(m, w, r ? xo : Ge);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [o, s] = L.pointer(t, this.svg.node()), i = o - e.margin.left, a = s - e.margin.top, r = e.delaunay ? e.marks[e.delaunay.find(i, a)] : null;
    if (r && Math.hypot(r.x - i, r.y - a) <= e.radius) {
      this.hoverRing.style("display", null).attr("cx", r.x).attr("cy", r.y), this.tooltip.show(e.markRows(r), t, r), this._setHovered(r.record, r.box);
      return;
    }
    this.hoverRing.style("display", "none");
    const l = e.boxAt(i, a);
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
    var o, s;
    t === this.hovered.record && e === this.hovered.box || (this.hovered = { record: t, box: e }, (s = (o = this.options).onHover) == null || s.call(o, t, e));
  }
}
const wo = { field: null, title: null, format: null }, vo = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, bo = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function Lt(n) {
  return n != null && n !== "" && !(typeof n == "number" && Number.isNaN(n));
}
function ko(n = [], t = {}) {
  var f;
  const e = t.axis ?? {}, o = (t.levels ?? []).map((p) => Q(wo, p)), s = Q(vo, e.color), i = Q(bo, e.radius), a = s.accessor ?? i.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const p of n) {
    const v = [];
    for (const k of o) {
      const M = (f = k.accessor) == null ? void 0 : f.call(k, p);
      if (!Lt(M)) break;
      v.push(M);
    }
    if (!v.length) continue;
    let x = r;
    v.forEach((k, M) => {
      const u = JSON.stringify(v.slice(0, M + 1));
      let T = l.get(u);
      T || (T = { key: u, label: k, level: M, record: null, children: [] }, l.set(u, T), x.children.push(T)), x = T;
    });
    const m = x, w = a && !Lt(a(m.record ?? {})) && Lt(a(p));
    (!m.record || w) && (m.record = p);
  }
  const h = [...l.values()].filter((p) => p !== r);
  for (const p of h)
    p.value = p.record && a ? a(p.record) : null, p.empty = !p.record || a != null && !Lt(p.value), p.colorValue = !p.empty && s.accessor ? s.accessor(p.record) : null, p.radiusValue = !p.empty && i.accessor ? i.accessor(p.record) : null;
  const d = h.filter((p) => !p.empty);
  if (s.accessor) {
    const p = d.map((v) => v.colorValue).filter(Lt);
    s.type === "sequential" ? (s.domain ?? (s.domain = Nt(p)), s.range ?? (s.range = L.interpolateViridis)) : (s.domain = pt(s.domain, p), s.range ?? (s.range = wt(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Nt(d.map((p) => p.radiusValue).filter(Lt)))), { axes: { color: s, radius: i }, levels: o, root: r, nodes: h };
}
const Xe = 12, Ue = 2, Lo = 1.5, Ao = 2.9, So = 7, be = 1.1, We = 4, Yt = 2, Mo = 3.3, $o = 0.92, To = (n) => typeof n == "number" ? L.format(".2f")(n) : String(n), zo = { color: "#b4b2aa", radius: 6, label: null }, Co = {
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
function Eo(n, t, e, o) {
  const s = String(n ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const r of s) {
    const l = a ? `${a} ${r}` : r;
    a && Et(l, e, o) > t ? (i.push(a), a = r) : a = l;
  }
  return a && i.push(a), i;
}
function Ho(n) {
  const { l: t } = L.lab(n);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class On {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...Co, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = L.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
    var o, s;
    t ? this.tooltip.show(this._tooltipRows(t), e, t) : this.tooltip.hide(), t !== this.hovered && (this.hovered = t, (s = (o = this.options).onHover) == null || s.call(o, t));
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    var V;
    const { columnWidth: t, hover: e, valueLabel: o } = this.options, s = { ...zo, ...this.options.empty }, i = Rt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const r = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: l, levels: h, root: d } = ko(this.options.data, this.options);
    this.axes = l;
    const f = pe(l.color), p = Es(l.radius), v = l.color.accessor ? l.color : l.radius, x = v.format ?? To, m = (g) => {
      const E = h[g.level];
      return E != null && E.format ? E.format(g.label) : g.label;
    };
    this._tooltipRows = (g) => {
      const E = [[Z(h[g.level], `Level ${g.level + 1}`), m(g)]];
      return Lt(g.value) && E.push([Z(v, "value"), x(g.value)]), this.options.tooltip ? this.options.tooltip(g, E) : E;
    };
    const w = (g) => g.empty ? s.color : l.color.accessor ? f(g.colorValue) : f(), k = (g) => g.empty || l.radius.accessor && l.radius.type !== "constant" && !Lt(g.radiusValue) ? s.radius : p(g.radiusValue), M = (g) => this.highlight.color(w(g.data), g.data, { color: g.data.colorValue }), u = L.hierarchy(d), T = u.descendants().filter((g) => g.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      f,
      i,
      s,
      T.some((g) => g.data.empty)
    ), !T.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const I = be * i, O = /* @__PURE__ */ new Map();
    for (const g of T) {
      const E = h[g.depth - 1], R = E != null && E.format ? E.format(g.data.label) : g.data.label, B = Eo(R, So * i, i, r), G = Math.max(0, ...B.map((J) => Et(J, i, r)));
      O.set(g, { lines: B, width: G, height: B.length * I });
    }
    const P = (g) => k(g.data), K = (g) => Math.max(P(g), O.get(g).height / 2), Y = (g) => P(g) + We + O.get(g).width + Yt, at = u.height || 1, st = T.filter((g) => !g.children && g.depth === at), ot = Math.ceil(Math.max(0, ...st.map(Y))), W = Math.max(0, ...T.filter((g) => g.depth === 1 && g.children).map(Y));
    let tt = Xe, c = t;
    for (let g = 0; g < 3; g += 1)
      c = Math.max(1, Math.min(t, (a - tt - ot) / at)), tt = Math.max(Xe, Math.ceil(W - c));
    const S = Math.round(Ao * i);
    L.tree().nodeSize([1, c]).separation((g, E) => {
      const R = K(g) + K(E) + Ue;
      return g.parent === E.parent ? R : R * Lo;
    })(u);
    let A = 1 / 0, _ = -1 / 0, b = 0;
    for (const g of T)
      A = Math.min(A, g.x), _ = Math.max(_, g.x), b = Math.max(b, K(g));
    const z = _ - A, N = b + Ue, rt = S + z + N * 2, et = Math.max(this.options.height, Math.ceil(rt)), lt = et - S, ht = z > 0 ? (lt - N * 2) / z : 1, ut = S + (lt - z * ht) / 2, nt = (g) => (g.x - A) * ht, ft = (g) => g.depth === 0 ? c - Mo * i : g.y, gt = this.svg.attr("width", a).attr("height", et).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((g, E) => Z(g, `level ${E + 1}`)).join(", then ")}: ${T.length} nodes`
    ), xt = gt.append("g").attr("transform", `translate(${tt},${ut})`), X = /* @__PURE__ */ new Map();
    for (const g of T)
      X.has(g.depth) || X.set(g.depth, ((V = h[g.depth - 1]) == null ? void 0 : V.title) ?? "");
    gt.append("g").selectAll("text").data([...X]).join("text").attr("class", "tree-chart__header").attr("x", ([g]) => tt + g * c).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, g]) => g);
    const dt = u.children.length > 1, vt = xt.append("g").selectAll("path").data(u.links().filter((g) => dt || g.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", L.linkHorizontal().x(ft).y(nt)), $ = xt.append("g").selectAll("g").data(T).join("g").attr("class", "tree-chart__node").attr("transform", (g) => `translate(${g.y},${nt(g)})`);
    $.append("circle").attr("class", "tree-chart__circle").attr("r", P).attr("fill", M), o && $.filter((g) => Lt(g.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * $o).attr("fill", (g) => Ho(M(g))).text((g) => x(g.data.value));
    const C = (g) => !!g.children, F = (g) => (C(g) ? -1 : 1) * (P(g) + We), q = $.filter((g) => O.get(g).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (g) => g.data.empty);
    q.append("rect").attr("class", "tree-chart__label-bg").attr("x", (g) => {
      const { width: E } = O.get(g);
      return (C(g) ? F(g) - E : F(g)) - Yt;
    }).attr("y", (g) => -O.get(g).height / 2 - Yt).attr("width", (g) => O.get(g).width + Yt * 2).attr("height", (g) => O.get(g).height + Yt * 2), q.append("text").attr("text-anchor", (g) => C(g) ? "end" : "start").selectAll("tspan").data((g) => {
      const { lines: E } = O.get(g);
      return E.map((R, B) => ({ line: R, i: B, count: E.length, x: F(g) }));
    }).join("tspan").attr("x", (g) => g.x).attr(
      "dy",
      (g) => g.i === 0 ? `${0.31 - (g.count - 1) * be / 2}em` : `${be}em`
    ).text((g) => g.line);
    const j = (g) => {
      if (!e) return;
      const E = g && /* @__PURE__ */ new Set([...g.ancestors(), ...g.descendants()]), R = (G) => !!(E && E.has(G)), B = (G) => R(G.source) && R(G.target);
      $.classed("tree-chart__node--off-path", (G) => !!E && !R(G)), vt.classed("tree-chart__link--on-path", B).classed("tree-chart__link--off-path", (G) => !!E && !B(G));
    };
    $.on("mouseenter", (g, E) => {
      j(E), this._setHovered(E.data, g);
    }).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => {
      j(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, o, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Bs(this.legend, t, a) : zt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !o.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", o.color), r.append("span").text(o.label);
  }
}
function je(n, t) {
  let e;
  if (t === void 0)
    for (const o of n)
      o != null && (e < o || e === void 0 && o >= o) && (e = o);
  else {
    let o = -1;
    for (let s of n)
      (s = t(s, ++o, n)) != null && (e < s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function Oo(n, t) {
  let e;
  if (t === void 0)
    for (const o of n)
      o != null && (e > o || e === void 0 && o >= o) && (e = o);
  else {
    let o = -1;
    for (let s of n)
      (s = t(s, ++o, n)) != null && (e > s || e === void 0 && s >= s) && (e = s);
  }
  return e;
}
function ke(n, t) {
  let e = 0;
  if (t === void 0)
    for (let o of n)
      (o = +o) && (e += o);
  else {
    let o = -1;
    for (let s of n)
      (s = +t(s, ++o, n)) && (e += s);
  }
  return e;
}
function Ro(n, t) {
  return n.sourceLinks.length ? n.depth : t - 1;
}
function ne(n) {
  return function() {
    return n;
  };
}
function qe(n, t) {
  return ue(n.source, t.source) || n.index - t.index;
}
function Ke(n, t) {
  return ue(n.target, t.target) || n.index - t.index;
}
function ue(n, t) {
  return n.y0 - t.y0;
}
function Le(n) {
  return n.value;
}
function Po(n) {
  return n.index;
}
function Io(n) {
  return n.nodes;
}
function Bo(n) {
  return n.links;
}
function Ye(n, t) {
  const e = n.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function Ze({ nodes: n }) {
  for (const t of n) {
    let e = t.y0, o = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = o + s.width / 2, o += s.width;
  }
}
function Do() {
  let n = 0, t = 0, e = 1, o = 1, s = 24, i = 8, a, r = Po, l = Ro, h, d, f = Io, p = Bo, v = 6;
  function x() {
    const c = { nodes: f.apply(null, arguments), links: p.apply(null, arguments) };
    return m(c), w(c), k(c), M(c), I(c), Ze(c), c;
  }
  x.update = function(c) {
    return Ze(c), c;
  }, x.nodeId = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : ne(c), x) : r;
  }, x.nodeAlign = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : ne(c), x) : l;
  }, x.nodeSort = function(c) {
    return arguments.length ? (h = c, x) : h;
  }, x.nodeWidth = function(c) {
    return arguments.length ? (s = +c, x) : s;
  }, x.nodePadding = function(c) {
    return arguments.length ? (i = a = +c, x) : i;
  }, x.nodes = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : ne(c), x) : f;
  }, x.links = function(c) {
    return arguments.length ? (p = typeof c == "function" ? c : ne(c), x) : p;
  }, x.linkSort = function(c) {
    return arguments.length ? (d = c, x) : d;
  }, x.size = function(c) {
    return arguments.length ? (n = t = 0, e = +c[0], o = +c[1], x) : [e - n, o - t];
  }, x.extent = function(c) {
    return arguments.length ? (n = +c[0][0], e = +c[1][0], t = +c[0][1], o = +c[1][1], x) : [[n, t], [e, o]];
  }, x.iterations = function(c) {
    return arguments.length ? (v = +c, x) : v;
  };
  function m({ nodes: c, links: S }) {
    for (const [_, b] of c.entries())
      b.index = _, b.sourceLinks = [], b.targetLinks = [];
    const A = new Map(c.map((_, b) => [r(_, b, c), _]));
    for (const [_, b] of S.entries()) {
      b.index = _;
      let { source: z, target: N } = b;
      typeof z != "object" && (z = b.source = Ye(A, z)), typeof N != "object" && (N = b.target = Ye(A, N)), z.sourceLinks.push(b), N.targetLinks.push(b);
    }
    if (d != null)
      for (const { sourceLinks: _, targetLinks: b } of c)
        _.sort(d), b.sort(d);
  }
  function w({ nodes: c }) {
    for (const S of c)
      S.value = S.fixedValue === void 0 ? Math.max(ke(S.sourceLinks, Le), ke(S.targetLinks, Le)) : S.fixedValue;
  }
  function k({ nodes: c }) {
    const S = c.length;
    let A = new Set(c), _ = /* @__PURE__ */ new Set(), b = 0;
    for (; A.size; ) {
      for (const z of A) {
        z.depth = b;
        for (const { target: N } of z.sourceLinks)
          _.add(N);
      }
      if (++b > S) throw new Error("circular link");
      A = _, _ = /* @__PURE__ */ new Set();
    }
  }
  function M({ nodes: c }) {
    const S = c.length;
    let A = new Set(c), _ = /* @__PURE__ */ new Set(), b = 0;
    for (; A.size; ) {
      for (const z of A) {
        z.height = b;
        for (const { source: N } of z.targetLinks)
          _.add(N);
      }
      if (++b > S) throw new Error("circular link");
      A = _, _ = /* @__PURE__ */ new Set();
    }
  }
  function u({ nodes: c }) {
    const S = je(c, (b) => b.depth) + 1, A = (e - n - s) / (S - 1), _ = new Array(S);
    for (const b of c) {
      const z = Math.max(0, Math.min(S - 1, Math.floor(l.call(null, b, S))));
      b.layer = z, b.x0 = n + z * A, b.x1 = b.x0 + s, _[z] ? _[z].push(b) : _[z] = [b];
    }
    if (h) for (const b of _)
      b.sort(h);
    return _;
  }
  function T(c) {
    const S = Oo(c, (A) => (o - t - (A.length - 1) * a) / ke(A, Le));
    for (const A of c) {
      let _ = t;
      for (const b of A) {
        b.y0 = _, b.y1 = _ + b.value * S, _ = b.y1 + a;
        for (const z of b.sourceLinks)
          z.width = z.value * S;
      }
      _ = (o - _ + a) / (A.length + 1);
      for (let b = 0; b < A.length; ++b) {
        const z = A[b];
        z.y0 += _ * (b + 1), z.y1 += _ * (b + 1);
      }
      ot(A);
    }
  }
  function I(c) {
    const S = u(c);
    a = Math.min(i, (o - t) / (je(S, (A) => A.length) - 1)), T(S);
    for (let A = 0; A < v; ++A) {
      const _ = Math.pow(0.99, A), b = Math.max(1 - _, (A + 1) / v);
      P(S, _, b), O(S, _, b);
    }
  }
  function O(c, S, A) {
    for (let _ = 1, b = c.length; _ < b; ++_) {
      const z = c[_];
      for (const N of z) {
        let rt = 0, et = 0;
        for (const { source: ht, value: ut } of N.targetLinks) {
          let nt = ut * (N.layer - ht.layer);
          rt += W(ht, N) * nt, et += nt;
        }
        if (!(et > 0)) continue;
        let lt = (rt / et - N.y0) * S;
        N.y0 += lt, N.y1 += lt, st(N);
      }
      h === void 0 && z.sort(ue), K(z, A);
    }
  }
  function P(c, S, A) {
    for (let _ = c.length, b = _ - 2; b >= 0; --b) {
      const z = c[b];
      for (const N of z) {
        let rt = 0, et = 0;
        for (const { target: ht, value: ut } of N.sourceLinks) {
          let nt = ut * (ht.layer - N.layer);
          rt += tt(N, ht) * nt, et += nt;
        }
        if (!(et > 0)) continue;
        let lt = (rt / et - N.y0) * S;
        N.y0 += lt, N.y1 += lt, st(N);
      }
      h === void 0 && z.sort(ue), K(z, A);
    }
  }
  function K(c, S) {
    const A = c.length >> 1, _ = c[A];
    at(c, _.y0 - a, A - 1, S), Y(c, _.y1 + a, A + 1, S), at(c, o, c.length - 1, S), Y(c, t, 0, S);
  }
  function Y(c, S, A, _) {
    for (; A < c.length; ++A) {
      const b = c[A], z = (S - b.y0) * _;
      z > 1e-6 && (b.y0 += z, b.y1 += z), S = b.y1 + a;
    }
  }
  function at(c, S, A, _) {
    for (; A >= 0; --A) {
      const b = c[A], z = (b.y1 - S) * _;
      z > 1e-6 && (b.y0 -= z, b.y1 -= z), S = b.y0 - a;
    }
  }
  function st({ sourceLinks: c, targetLinks: S }) {
    if (d === void 0) {
      for (const { source: { sourceLinks: A } } of S)
        A.sort(Ke);
      for (const { target: { targetLinks: A } } of c)
        A.sort(qe);
    }
  }
  function ot(c) {
    if (d === void 0)
      for (const { sourceLinks: S, targetLinks: A } of c)
        S.sort(Ke), A.sort(qe);
  }
  function W(c, S) {
    let A = c.y0 - (c.sourceLinks.length - 1) * a / 2;
    for (const { target: _, width: b } of c.sourceLinks) {
      if (_ === S) break;
      A += b + a;
    }
    for (const { source: _, width: b } of S.targetLinks) {
      if (_ === c) break;
      A -= b;
    }
    return A;
  }
  function tt(c, S) {
    let A = S.y0 - (S.targetLinks.length - 1) * a / 2;
    for (const { source: _, width: b } of S.targetLinks) {
      if (_ === c) break;
      A += b + a;
    }
    for (const { target: _, width: b } of c.sourceLinks) {
      if (_ === S) break;
      A -= b;
    }
    return A;
  }
  return x;
}
var Me = Math.PI, $e = 2 * Me, Ct = 1e-6, No = $e - Ct;
function Te() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function As() {
  return new Te();
}
Te.prototype = As.prototype = {
  constructor: Te,
  moveTo: function(n, t) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(n, t) {
    this._ += "L" + (this._x1 = +n) + "," + (this._y1 = +t);
  },
  quadraticCurveTo: function(n, t, e, o) {
    this._ += "Q" + +n + "," + +t + "," + (this._x1 = +e) + "," + (this._y1 = +o);
  },
  bezierCurveTo: function(n, t, e, o, s, i) {
    this._ += "C" + +n + "," + +t + "," + +e + "," + +o + "," + (this._x1 = +s) + "," + (this._y1 = +i);
  },
  arcTo: function(n, t, e, o, s) {
    n = +n, t = +t, e = +e, o = +o, s = +s;
    var i = this._x1, a = this._y1, r = e - n, l = o - t, h = i - n, d = a - t, f = h * h + d * d;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = n) + "," + (this._y1 = t);
    else if (f > Ct) if (!(Math.abs(d * r - l * h) > Ct) || !s)
      this._ += "L" + (this._x1 = n) + "," + (this._y1 = t);
    else {
      var p = e - i, v = o - a, x = r * r + l * l, m = p * p + v * v, w = Math.sqrt(x), k = Math.sqrt(f), M = s * Math.tan((Me - Math.acos((x + f - m) / (2 * w * k))) / 2), u = M / k, T = M / w;
      Math.abs(u - 1) > Ct && (this._ += "L" + (n + u * h) + "," + (t + u * d)), this._ += "A" + s + "," + s + ",0,0," + +(d * p > h * v) + "," + (this._x1 = n + T * r) + "," + (this._y1 = t + T * l);
    }
  },
  arc: function(n, t, e, o, s, i) {
    n = +n, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(o), r = e * Math.sin(o), l = n + a, h = t + r, d = 1 ^ i, f = i ? o - s : s - o;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + h : (Math.abs(this._x1 - l) > Ct || Math.abs(this._y1 - h) > Ct) && (this._ += "L" + l + "," + h), e && (f < 0 && (f = f % $e + $e), f > No ? this._ += "A" + e + "," + e + ",0,1," + d + "," + (n - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + d + "," + (this._x1 = l) + "," + (this._y1 = h) : f > Ct && (this._ += "A" + e + "," + e + ",0," + +(f >= Me) + "," + d + "," + (this._x1 = n + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(n, t, e, o) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +o + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Qe(n) {
  return function() {
    return n;
  };
}
function Vo(n) {
  return n[0];
}
function Fo(n) {
  return n[1];
}
var Go = Array.prototype.slice;
function Xo(n) {
  return n.source;
}
function Uo(n) {
  return n.target;
}
function Wo(n) {
  var t = Xo, e = Uo, o = Vo, s = Fo, i = null;
  function a() {
    var r, l = Go.call(arguments), h = t.apply(this, l), d = e.apply(this, l);
    if (i || (i = r = As()), n(i, +o.apply(this, (l[0] = h, l)), +s.apply(this, l), +o.apply(this, (l[0] = d, l)), +s.apply(this, l)), r) return i = null, r + "" || null;
  }
  return a.source = function(r) {
    return arguments.length ? (t = r, a) : t;
  }, a.target = function(r) {
    return arguments.length ? (e = r, a) : e;
  }, a.x = function(r) {
    return arguments.length ? (o = typeof r == "function" ? r : Qe(+r), a) : o;
  }, a.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : Qe(+r), a) : s;
  }, a.context = function(r) {
    return arguments.length ? (i = r ?? null, a) : i;
  }, a;
}
function jo(n, t, e, o, s) {
  n.moveTo(t, e), n.bezierCurveTo(t = (t + o) / 2, e, t, s, o, s);
}
function qo() {
  return Wo(jo);
}
function Ko(n) {
  return [n.source.x1, n.y0];
}
function Yo(n) {
  return [n.target.x0, n.y1];
}
function Zo() {
  return qo().source(Ko).target(Yo);
}
const Qo = "(blank)", Jo = { field: null, title: null, domain: null, format: null, sort: "descending" }, tn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, ie = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? Qo : String(e);
};
function en(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, i) => n.get(i) - n.get(s)) : t.sort === "ascending" && e.sort((s, i) => n.get(s) - n.get(i));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function sn(n = [], t = {}) {
  var x;
  const e = (t.dimensions ?? []).map((m) => Q(Jo, m)), o = Q(tn, (x = t.axis) == null ? void 0 : x.color), s = e.findIndex((m) => m.field != null && m.field === o.field), i = Math.max(0, s), a = e.map((m, w) => {
    const k = L.rollup(
      n,
      (u) => u.length,
      (u) => ie(m.accessor, u)
    ), M = en(k, m).map((u, T) => ({
      id: -1,
      dim: w,
      index: T,
      key: u,
      label: m.format ? m.format(u) : u,
      count: k.get(u)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: w,
      nodes: M,
      byKey: new Map(M.map((u) => [u.key, u]))
    };
  }), r = a.flatMap((m) => m.nodes);
  r.forEach((m, w) => {
    m.id = w;
  });
  const l = (m) => e.map((w) => ie(w.accessor, m)).join("\0"), h = L.rollups(n, (m) => m, l).map(([, m]) => {
    const w = e.map((M) => ie(M.accessor, m[0])), k = w.map((M, u) => a[u].byKey.get(M));
    return {
      keys: w,
      labels: k.map((M) => M.label),
      nodes: k,
      records: m,
      value: m.length
    };
  }), d = [i, ...e.map((m, w) => w).filter((m) => m !== i)];
  h.sort((m, w) => {
    for (const k of d) {
      const M = m.nodes[k].index - w.nodes[k].index;
      if (M) return M;
    }
    return 0;
  });
  const f = [];
  for (const m of h)
    for (let w = 1; w < e.length; w++)
      f.push({
        source: m.nodes[w - 1].id,
        target: m.nodes[w].id,
        pair: w - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const p = a[i], v = e[i];
  return v && (o.field ?? (o.field = v.field), o.accessor = (m) => ie(v.accessor, m), o.format ?? (o.format = v.format)), o.domain = pt(
    o.domain,
    p ? p.nodes.map((m) => m.key) : []
  ), o.range ?? (o.range = wt(o.domain.length)), {
    axes: { color: o },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: w, nodes: k }) => ({
      title: m,
      index: w,
      nodes: k
    })),
    nodes: r,
    paths: h,
    links: f,
    total: n.length
  };
}
const on = 2.3, Je = 5, ts = 6, nn = 2, ae = 6, re = 0.92, an = "#333", rn = {
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
class Rn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...rn, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = L.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: o, hover: s, unit: i } = this.options, a = Rt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(a);
    const l = sn(this.options.data, this.options);
    this.prepared = l;
    const { axes: h, columns: d, colorIndex: f, total: p } = l, v = pe(h.color), x = (c) => this.highlight.includes(c, { color: c.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(v, a), !l.nodes.length || d.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), w = d[d.length - 1], k = (c) => Et(`${c.label} `, a, m) + Et(c.count, a * re, m), M = Math.ceil(
      Math.max(
        Et(w.title, a * re, m, 600),
        ...w.nodes.map(k)
      )
    ) + ts + nn, u = Math.round(on * a), T = Math.max(r - M, t * d.length), I = [
      [0, u + Je],
      [T, u + this.options.height - Je]
    ], O = Do().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(I)({
      nodes: l.nodes.map((c) => ({ ...c })),
      links: l.links.map((c) => ({ ...c }))
    });
    o && ln(O.nodes, d.length, I[0][1], I[1][1]);
    const P = Zo(), K = (c) => c.x1 + ts, Y = (c) => c.dim === f ? this.highlight.color(v(c.key), c, { color: c.key }) : !this.highlight.active || c.sourceLinks.some(x) || c.targetLinks.some(x) ? an : kt, at = this.svg.attr("width", r).attr("height", u + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${p} ${i} across ${d.map((c) => c.title).join(", ")}`
    ), st = (c) => O.nodes.find((S) => S.dim === c.index);
    at.append("g").selectAll("text").data(d.filter(st)).join("text").attr("class", "parallel-sets__header").attr("x", (c) => K(st(c))).attr("y", u - a * 0.9).attr("text-anchor", "start").attr("font-size", a * re).text((c) => c.title);
    const ot = at.append("g").attr("fill", "none").selectAll("path").data(O.links).join("path").attr("class", "parallel-sets__link").attr("d", P).attr("stroke", (c) => this.highlight.color(v(c.colorKey), c, { color: c.colorKey })).attr("stroke-width", (c) => Math.max(c.width, 1)), W = at.append("g").selectAll("g").data(O.nodes).join("g").attr("class", "parallel-sets__node");
    W.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (c) => c.x0).attr("y", (c) => c.y0).attr("width", (c) => c.x1 - c.x0).attr("height", (c) => Math.max(c.y1 - c.y0, 1)).attr("fill", Y), W.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (c) => c.x0 - ae).attr("y", (c) => c.y0 - ae / 2).attr("width", (c) => c.x1 - c.x0 + ae * 2).attr("height", (c) => Math.max(c.y1 - c.y0, 1) + ae), W.append("text").attr("class", "parallel-sets__label").attr("x", K).attr("y", (c) => (c.y0 + c.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((c) => `${c.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * re).text((c) => c.count), s && this._bindHover(W, ot, O);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  /**
   * Node hover: every strand through that node. Link hover: every strand sharing
   * the hovered link's category path up to its target column, i.e. the whole
   * visible band between those two nodes, traced across the chart.
   */
  _bindHover(t, e, o) {
    const s = (a) => {
      const r = this.hovered;
      return r ? r.type === "link" ? r.keys.every((l, h) => a.keys[h] === l) : a.keys[r.node.dim] === r.node.key : !0;
    }, i = () => {
      const a = this.hovered != null, r = /* @__PURE__ */ new Set();
      if (a)
        for (const l of o.links)
          s(l) && (r.add(l.source.id), r.add(l.target.id));
      e.classed("parallel-sets__link--active", (l) => a && s(l)).classed("parallel-sets__link--muted", (l) => a && !s(l)), t.classed("parallel-sets__node--muted", (l) => a && !r.has(l.id));
    };
    this._applyHover = i, t.on("mouseenter", (a, r) => {
      const l = { type: "node", node: r };
      this._setHovered(l), this.tooltip.show(this._nodeTooltip(l), a, r);
    }).on("mousemove", (a) => this.tooltip.move(a)), e.on("mouseenter", (a, r) => {
      const l = r.keys.slice(0, r.pair + 2), h = o.links.filter((p) => p.pair === r.pair && l.every((v, x) => p.keys[x] === v)).reduce((p, v) => p + v.value, 0), d = r.labels.slice(0, l.length), f = { type: "link", keys: l, labels: d, pair: r.pair, value: h };
      this._setHovered(f), this.tooltip.show(this._linkTooltip(f), a, r);
    }).on("mousemove", (a) => this.tooltip.move(a));
  }
  // The hovered target: applies the emphasis, hides the tooltip when nothing is
  // hovered, and reports a change through onHover
  _setHovered(t) {
    var o, s, i;
    const e = t !== this.hovered;
    this.hovered = t, (o = this._applyHover) == null || o.call(this), t || this.tooltip.hide(), e && ((i = (s = this.options).onHover) == null || i.call(s, t));
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
    const { node: e } = t, o = [[this.prepared.columns[e.dim].title, e.label], this._countRow(e.count)];
    return this.options.tooltip ? this.options.tooltip(t, o) : o;
  }
  _linkTooltip(t) {
    const e = t.keys.map((o, s) => [this.prepared.columns[s].title, t.labels[s]]);
    return e.push(this._countRow(t.value)), this.options.tooltip ? this.options.tooltip(t, e) : e;
  }
  /** The color axis legend below the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color;
    zt(this.legend, t, { ...o, fontSize: e, highlight: this.highlight });
  }
}
function ln(n, t, e, o) {
  for (let s = 0; s < t; s++) {
    const i = n.filter((h) => h.dim === s).sort((h, d) => h.y0 - d.y0);
    if (i.length < 2) continue;
    const a = i.reduce((h, d) => h + (d.y1 - d.y0), 0), r = (o - e - a) / (i.length - 1);
    let l = e;
    for (const h of i) {
      const d = h.y1 - h.y0;
      h.y0 = l, h.y1 = l + d, l += d + r;
    }
  }
  for (const s of n) {
    let i = s.y0;
    for (const r of s.sourceLinks)
      r.y0 = i + r.width / 2, i += r.width;
    let a = s.y0;
    for (const r of s.targetLinks)
      r.y1 = a + r.width / 2, a += r.width;
  }
}
const cn = "(blank)", es = { field: null, title: null, domain: null, format: null, sort: "descending" }, hn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, le = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? cn : String(e);
};
function Ss(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, i) => n.get(i) - n.get(s)) : t.sort === "ascending" && e.sort((s, i) => n.get(s) - n.get(i));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function ss(n, t) {
  if (!t.accessor)
    return n.length ? [{ key: null, label: "", index: 0, count: n.length }] : [];
  const e = L.rollup(
    n,
    (o) => o.length,
    (o) => le(t.accessor, o)
  );
  return Ss(e, t).map((o, s) => ({
    key: o,
    label: t.format ? t.format(o) : o,
    index: s,
    count: e.get(o)
  }));
}
function Ae(n = [], t = {}, e = !1) {
  const o = n.find((a) => a.field != null && a.field === (t == null ? void 0 : t.field));
  if (!o) return t;
  const { color: s, ...i } = o;
  return e ? { ...i, ...s, ...t } : { ...i, ...t };
}
function un(n = [], t = {}) {
  var x, m, w;
  const e = t.dimensions ?? [], o = Q(es, Ae(e, (x = t.axis) == null ? void 0 : x.x)), s = Q(es, Ae(e, (m = t.axis) == null ? void 0 : m.y)), i = Q(hn, Ae(e, (w = t.axis) == null ? void 0 : w.color, !0)), a = ss(n, o), r = ss(n, s).map((k) => ({
    ...k,
    cells: a.map((M) => ({ row: k.index, column: M.index, count: 0, units: [] }))
  }));
  o.domain = a.map((k) => k.key), s.domain = r.map((k) => k.key);
  const l = i.accessor ? (k) => le(i.accessor, k) : () => null;
  if (i.accessor) {
    const k = L.rollup(n, (M) => M.length, l);
    i.domain = pt(i.domain, Ss(k, i)), i.range ?? (i.range = wt(i.domain.length));
  } else
    i.domain = [];
  const h = new Map(i.domain.map((k, M) => [k, M])), d = new Map(r.map((k) => [k.key, k.index])), f = new Map(a.map((k) => [k.key, k.index]));
  n.forEach((k, M) => {
    const u = s.accessor ? le(s.accessor, k) : null, T = o.accessor ? le(o.accessor, k) : null, I = d.get(u), O = f.get(T), P = r[I].cells[O];
    P.units.push({ record: k, index: M, row: I, column: O, rowKey: u, columnKey: T, colorKey: l(k) }), P.count += 1;
  });
  const p = (k) => h.get(k.colorKey) ?? h.size, v = [];
  for (const k of r)
    for (const M of k.cells)
      M.units.sort((u, T) => p(u) - p(T) || u.index - T.index), v.push(...M.units);
  return { axes: { x: o, y: s, color: i }, columns: a, rows: r, units: v, total: n.length };
}
const Zt = 0.92, os = 1.7, dn = 1.9, pn = 1.9, fn = 0.67, gn = 0.5, mn = 1, yn = 1.08, ns = 3, xn = 0.4, ze = 1.25, _n = 2, wn = 0.6, vn = 3, bn = {
  data: [],
  axis: {},
  dimensions: [],
  onAxisChange: null,
  unitSize: 12,
  unitPadding: 2,
  showCounts: !0,
  tooltip: null,
  onHover: null,
  unit: "records",
  fontSize: "medium",
  width: null,
  onHighlightChange: null
};
class Pn {
  constructor(t, e = {}) {
    if (!t) throw new Error("UnitMatrixChart: a container element is required");
    this.container = t, this.options = { ...bn, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = L.select(t).classed("unit-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "unit-matrix__scroll").append("svg").attr("class", "unit-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
   * Emphasise the units whose record passes `predicate`, drawing the rest grey.
   * Combines with the legend's selection. Pass null to drop the predicate.
   * @param {((record: object) => boolean) | null} predicate
   */
  setHighlight(t) {
    this.highlight.setPredicate(t);
  }
  /** Drop the highlight predicate and the legend selection. */
  clearHighlight() {
    this.highlight.clear();
  }
  /** Trade the row and column fields and redraw. Nothing happens without a column field. */
  swapAxes() {
    const { x: t, y: e } = this.options.axis;
    (t == null ? void 0 : t.field) != null && this._setAxis({ ...this.options.axis, x: e ?? {}, y: t });
  }
  // The chart's own `axis` option changes, as update() would change it
  _setAxis(t) {
    var e, o;
    this.options.axis = t, this.draw(), (o = (e = this.options).onAxisChange) == null || o.call(e, t);
  }
  _onHighlightChange() {
    var t, e;
    this.draw(), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  destroy() {
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), this.root.selectAll("*").remove(), this.root.classed("unit-matrix", !1);
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    const { unitSize: t, unitPadding: e, showCounts: o, unit: s } = this.options, i = Rt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a, this.tooltip.fontSize(i);
    const r = un(this.options.data, this.options);
    this.prepared = r;
    const { axes: l, columns: h, rows: d, total: f } = r;
    this._dropStaleSelection(l.color);
    const p = pe(l.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(p, i), !d.length || !h.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty unit matrix");
      return;
    }
    const v = this.svg.node(), x = Sn(r, {
      width: a,
      fontSize: i,
      unitSize: t,
      unitPadding: e,
      showCounts: o,
      measure: (u, T, I) => Et(u, T, v, I)
    });
    this.layout = x;
    const m = [l.y, l.x].filter((u) => u.accessor).map((u, T) => Z(u, T ? "column" : "row")), w = this.svg.attr("width", x.width).attr("height", x.height).attr("font-size", i).attr(
      "aria-label",
      `Unit matrix of ${f} ${s}${m.length ? ` by ${m.join(" and ")}` : ""}`
    );
    w.append("g").selectAll("line").data(x.columns).join("line").attr("class", "unit-matrix__rule unit-matrix__rule--column").attr("x1", (u) => u.x + 0.5).attr("x2", (u) => u.x + 0.5).attr("y1", x.headerHeight).attr("y2", x.height), w.append("g").selectAll("line").data(x.rows).join("line").attr("class", "unit-matrix__rule").classed("unit-matrix__rule--first", (u, T) => T === 0).attr("x1", 0).attr("x2", x.plotRight).attr("y1", (u) => u.y + 0.5).attr("y2", (u) => u.y + 0.5), w.append("g").selectAll("text").data(x.titles).join("text").attr("class", "unit-matrix__title").attr("x", (u) => u.x).attr("y", (u) => u.y).attr("text-anchor", "start").attr("font-size", i * Zt).text((u) => u.text);
    const k = w.append("g").selectAll("text").data([...x.columns, ...x.rows].filter((u) => u.label)).join("text").attr("class", "unit-matrix__label").attr("x", (u) => u.label.x).attr("y", (u) => u.label.y).attr("dy", (u) => u.label.middle ? "0.35em" : null).attr("text-anchor", "start");
    k.selectAll("tspan").data((u) => u.label.lines.map((T, I) => ({ text: T, i: I, x: u.label.x }))).join("tspan").attr("x", (u) => u.x).attr("dy", (u) => u.i ? `${ze}em` : null).text((u) => u.text), o && k.append("tspan").attr("class", "unit-matrix__label-count").attr("font-size", i * Zt).attr("x", (u) => u.label.countBelow ? u.label.x : null).attr("dy", (u) => u.label.countBelow ? `${ze / Zt}em` : null).text((u) => u.label.countBelow ? u.band.count : ` ${u.band.count}`), k.filter((u) => u.label.cut).append("title").text((u) => u.band.label);
    const M = w.append("g").selectAll("rect").data(x.units).join("rect").attr("class", "unit-matrix__unit").attr("x", (u) => u.x + 0.5).attr("y", (u) => u.y + 0.5).attr("width", t - 1).attr("height", t - 1).attr("rx", _n).attr(
      "fill",
      (u) => this.highlight.color(p(u.unit.colorKey), u.unit.record, { color: u.unit.colorKey })
    );
    w.append("g").selectAll("text").data(x.counts).join("text").attr("class", "unit-matrix__count").attr("x", (u) => u.x).attr("y", (u) => u.y).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", i * Zt).text((u) => u.count), this._bindHover(M);
  }
  // ── Highlight ───────────────────────────────────────────────────────────────
  // A legend selection only names categories of the color axis it was made on.
  // Once the axis has none of them (it was given another field), nothing could
  // be highlighted and every unit would be muted, so the selection is dropped.
  _dropStaleSelection(t) {
    var o, s;
    const e = this.highlight.selected("color");
    !e || [...e].some((i) => t.domain.includes(i)) || (this.highlight.selection.delete("color"), (s = (o = this.options).onHighlightChange) == null || s.call(o, this.highlight));
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _bindHover(t) {
    t.on("mouseenter", (e, o) => {
      this._setHovered(o.unit), this.tooltip.show(this._unitTooltip(o.unit), e, o.unit);
    }).on("mousemove", (e) => this.tooltip.move(e));
  }
  // The hovered unit: hides the tooltip when nothing is hovered, and reports a
  // change through onHover
  _setHovered(t) {
    var o, s;
    const e = t !== this.hovered;
    this.hovered = t, t || this.tooltip.hide(), e && ((s = (o = this.options).onHover) == null || s.call(o, t));
  }
  // Default rows: the unit's row, column and color categories, the color one
  // left out when it repeats the row or column field
  _unitTooltip(t) {
    const { axes: e, columns: o, rows: s } = this.prepared, i = [];
    e.y.accessor && i.push([Z(e.y, "Row"), s[t.row].label]), e.x.accessor && i.push([Z(e.x, "Column"), o[t.column].label]);
    const a = [e.x, e.y].some(
      (r) => typeof r.field == "string" && r.field === e.color.field
    );
    if (e.color.accessor && !a) {
      const r = e.color.format ?? ((l) => l);
      i.push([Z(e.color, "Color"), r(t.colorKey)]);
    }
    return this.options.tooltip ? this.options.tooltip(t, i) : i;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color, s = o.accessor ? o.title : null;
    zt(this.legend, t, { ...o, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("unit-matrix__legend", !0);
  }
}
function kn(n, t, e) {
  if (e(n) <= t) return n;
  let o = n.length - 1;
  for (; o > 1 && e(`${n.slice(0, o).trimEnd()}…`) > t; ) o -= 1;
  return `${n.slice(0, o).trimEnd()}…`;
}
function Ln(n) {
  return String(n).split(/\s+/).flatMap((t) => t.split(new RegExp("(?<=\\/)"))).filter(Boolean);
}
function An(n, t, e) {
  const o = [];
  let s = "";
  for (const i of String(n).split(/\s+/).filter(Boolean))
    i.split(new RegExp("(?<=\\/)")).forEach((a, r) => {
      const l = s === "" ? a : `${s}${r ? "" : " "}${a}`;
      s !== "" && e(l) > t ? (o.push(s), s = a) : s = l;
    });
  return (s !== "" || !o.length) && o.push(s), o;
}
function is(n, t, e) {
  if (!n) return 0;
  const o = Math.ceil(n / t), s = o * t - n;
  return e > s ? o + 1 : o;
}
function Sn(n, t) {
  const { axes: e, columns: o, rows: s } = n, { width: i, fontSize: a, unitSize: r, unitPadding: l, showCounts: h, measure: d } = t, f = r + l, p = a * Zt, v = Math.round(a * fn), x = Math.round(a * gn), m = e.x.accessor != null, w = e.y.accessor != null, k = m && e.x.title || null, M = w && e.y.title || null, u = ($) => h ? d($, p) : 0, T = ($) => d(`${$.label} `, a) + u($.count), I = ($) => $ ? d($.toUpperCase(), p, 600) * yn : 0, O = ($) => h ? Math.ceil((u($) + ns) / f) : 0, P = w ? Math.max(0, ...s.map(T)) : 0, K = Math.ceil(
    Math.max(Math.min(P, i * xn), I(M))
  ), Y = K ? K + Math.round(a * mn) : 0, at = o.map(($, C) => s.map((F) => F.cells[C])), st = ($, C) => Math.max(1, ...at[$].map((F) => is(F.count, C, O(F.count)))), ot = at.map(
    ($) => Math.max(1, ...$.map((C) => C.count + O(C.count)))
  ), W = ($) => 2 * v + $ * r + ($ - 1) * l, tt = ($, C) => {
    const F = wn * $ / o.length, q = C.map((B) => Math.max(B, F)), j = (B, G) => Math.max(W(G), q[B]), V = o.map(
      (B, G) => Math.max(1, Math.floor((q[G] - 2 * v + l) / f))
    );
    let g = V.reduce((B, G, J) => B + j(J, G), 0);
    for (; ; ) {
      let B = -1, G = 1;
      if (V.forEach((J, mt) => {
        if (J >= ot[mt] || g + j(mt, J + 1) - j(mt, J) > $) return;
        const U = st(mt, J);
        U > G && (B = mt, G = U);
      }), B < 0) break;
      g += j(B, V[B] + 1) - j(B, V[B]), V[B] += 1;
    }
    const E = Math.max(0, $ - g) / o.length, R = V.map((B, G) => j(G, B) + E);
    return { perLine: V, widths: R, total: R.reduce((B, G) => B + G, 0) };
  }, c = o.length * W(vn), S = () => Math.max(i - Y, c), _ = o.map(($) => m ? T($) : 0).map(($) => m ? Math.ceil($) + v : 0);
  let b = tt(S(), _);
  if (m && b.total > S() + 0.5) {
    const $ = o.map(
      (C) => Math.max(u(C.count), ...Ln(C.label).map((F) => d(F, a)))
    );
    b = tt(
      S(),
      $.map((C) => Math.ceil(C) + v)
    );
  }
  const z = Y + b.total, N = o.map(($, C) => {
    if (!m) return null;
    const F = b.widths[C] - v, q = An($.label, F, (V) => d(V, a)), j = d(`${q[q.length - 1]} `, a) + u($.count);
    return { lines: q, countBelow: h && j > F + 0.5 };
  }), rt = a * ze, et = Math.max(
    1,
    ...N.map(($) => $ ? $.lines.length + ($.countBelow ? 1 : 0) : 1)
  ), lt = k ? Math.round(a * os) : 0, ht = m ? Math.round(a * dn + (et - 1) * rt) : 0, ut = Math.max(
    lt + ht,
    M ? Math.round(a * os) : 0,
    Math.round(a * 0.5)
  ), nt = [];
  k && nt.push({ text: k, x: Y + v, y: Math.round(a * 1.05) }), M && nt.push({ text: M, x: 0, y: ut - Math.round(a * 0.6) });
  let ft = Y;
  const gt = o.map(($, C) => {
    const F = { band: $, x: ft, width: b.widths[C], perLine: b.perLine[C], label: null };
    if (m) {
      const { lines: q, countBelow: j } = N[C], V = q.length - 1 + (j ? 1 : 0);
      F.label = {
        lines: q,
        countBelow: j,
        x: ft + v,
        y: ut - Math.round(a * 0.6) - V * rt,
        middle: !1,
        cut: !1
      };
    }
    return ft += b.widths[C], F;
  }), xt = [], X = [];
  let dt = ut;
  const vt = s.map(($) => {
    const C = Math.max(
      1,
      ...$.cells.map((V, g) => is(V.count, b.perLine[g], O(V.count)))
    ), F = Math.max(
      2 * x + C * r + (C - 1) * l,
      Math.ceil(a * pn)
    ), q = dt + x + r / 2, j = { band: $, y: dt, height: F, label: null };
    if (w) {
      const V = K - u($.count) - d(" ", a), g = T($) <= K ? $.label : kn($.label, V, (E) => d(E, a));
      j.label = {
        lines: [g],
        countBelow: !1,
        x: 0,
        y: q,
        middle: !0,
        cut: g !== $.label
      };
    }
    return $.cells.forEach((V, g) => {
      const E = gt[g], R = E.x + v;
      if (V.units.forEach((mt, U) => {
        xt.push({
          unit: mt,
          x: R + U % E.perLine * f,
          y: dt + x + Math.floor(U / E.perLine) * f
        });
      }), !h || !V.count) return;
      const B = Math.ceil(V.count / E.perLine) - 1, G = V.count - B * E.perLine, J = E.perLine - G >= O(V.count);
      X.push({
        count: V.count,
        x: J ? R + G * f - l + ns : R,
        y: q + (J ? B : B + 1) * f
      });
    }), dt += F, j;
  });
  return {
    // The small allowance keeps a float sum from rounding a fitting chart up a pixel
    width: Math.max(i, Math.ceil(z - 0.01)),
    height: dt + 1,
    headerHeight: ut,
    plotLeft: Y,
    plotRight: z,
    titles: nt,
    columns: gt,
    rows: vt,
    units: xt,
    counts: X
  };
}
export {
  Tn as BarChart,
  Hn as BoxPlotChart,
  Ie as FONT_SIZES,
  Ot as Highlight,
  kt as MUTED_COLOR,
  Rn as ParallelSetsChart,
  En as ScatterPlot,
  Cn as StackedBarChart,
  Pt as Tooltip,
  On as TreeChart,
  Pn as UnitMatrixChart,
  he as barLabel,
  xs as bottomLabels,
  ho as boxStats,
  Mn as categoryColors,
  ms as chartFrame,
  $n as countBy,
  zn as countByStacked,
  wt as defaultColors,
  Ae as describeAxis,
  bs as drawCategoryAxis,
  _s as drawGridlines,
  zt as drawLegend,
  ws as drawPlotEdges,
  Bs as drawSequentialLegend,
  ge as drawTopTitle,
  vs as drawValueAxis,
  Lt as hasValue,
  ys as laneLayout,
  Sn as layoutUnitMatrix,
  yt as maxTextWidth,
  Et as measureText,
  Os as prepareBarChart,
  po as prepareBoxPlotChart,
  sn as prepareParallelSets,
  oo as prepareScatterPlot,
  qs as prepareStackedBarChart,
  ko as prepareTreeChart,
  un as prepareUnitMatrix,
  Rt as resolveFontSize,
  _t as titleLane,
  Jt as titleOnTop,
  Gt as topTitleLane
};
