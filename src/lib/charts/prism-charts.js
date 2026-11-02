import * as k from "d3";
const ls = [
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
function _t(o) {
  return o <= k.schemeTableau10.length ? k.schemeTableau10 : ls;
}
function Do(o, t) {
  const e = k.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: n, range: _t(n.length) };
}
const Ne = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ve = {
  field: null,
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Fe = {
  field: null,
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  position: "inline"
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
function qe(o, t) {
  return {
    category: o.category ?? (t ? o.y : o.x),
    value: o.value ?? (t ? o.x : o.y)
  };
}
function je(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function q(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = je(e.field), e;
}
function F(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function it(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function ge(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function Lt(o) {
  switch (o) {
    case "log":
      return k.scaleLog();
    case "sqrt":
      return k.scaleSqrt();
    default:
      return k.scaleLinear();
  }
}
function Mt(o, t = [0, 1]) {
  const [e, n] = k.extent(o);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function te(o, t, e) {
  return Lt(o).domain(t).nice(e ?? void 0).domain();
}
function Vt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function $t(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
function me(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : _t(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function cs(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Lt(o.type).domain(o.domain).range(o.range);
}
const hs = { ...Ve, field: "count" };
function No(o, t, { sort: e, group: n } = {}) {
  const s = (a) => (r) => r[a] || "(blank)", i = (a, r) => {
    const l = k.rollup(a, (p) => p.length, s(t)), h = Array.from(
      l,
      ([p, f]) => n == null ? { label: p, count: f } : { group: r, label: p, count: f }
    );
    return e === "descending" ? h.sort((p, f) => f.count - p.count) : e === "ascending" && h.sort((p, f) => p.count - f.count), h;
  };
  return n == null ? i(o) : Array.from(
    k.group(o, s(n)),
    ([a, r]) => i(r, a)
  ).flat();
}
function Kt(o, t, e = "both") {
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
function us(o = [], t = {}) {
  const e = t.axis ?? {}, n = qe(e, t.orientation === "horizontal"), s = q(Ne, n.category), i = q(hs, n.value), a = q(Fe, e.group), r = q(Ge, e.color), l = r.accessor ?? s.accessor, h = (d) => ({
    count: k.sum(d, i.accessor),
    color: l(d[0])
  });
  let p;
  if (a.accessor) {
    const d = k.rollup(o, h, a.accessor, s.accessor);
    a.domain = it(a.domain, d.keys()), p = a.domain.flatMap((v) => {
      const x = d.get(v) ?? /* @__PURE__ */ new Map();
      return it(s.domain, x.keys()).filter((m) => x.has(m)).map((m) => ({ group: v, label: m, ...x.get(m) }));
    }), s.domain = [...new Set(p.map((v) => v.label))];
  } else {
    const d = k.rollup(o, h, s.accessor);
    s.domain = it(s.domain, d.keys()), p = s.domain.map((v) => {
      var x, m;
      return {
        group: null,
        label: v,
        count: ((x = d.get(v)) == null ? void 0 : x.count) ?? 0,
        color: ((m = d.get(v)) == null ? void 0 : m.color) ?? v
      };
    });
  }
  s.tickValues = ge(s), i.domain ?? (i.domain = te(i.type, [0, k.max(p, (d) => d.count) || 1], i.ticks)), r.domain = it(
    r.domain,
    p.map((d) => d.color)
  ), r.range ?? (r.range = _t(r.domain.length));
  const f = t.total ?? k.sum(p, (d) => d.count);
  return { axes: { category: s, value: i, group: a, color: r }, bars: p, total: f };
}
const mt = "#cfcfcf";
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
    return this.includes(e, n, s) ? t : mt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Zt = 6, Qt = 12, Xe = 8, Ue = 0.35, We = 0.3, ue = "rgba(0,0,0,0.7)", ee = "rgba(0,0,0,0.5)", ds = "rgba(0,0,0,0.08)";
function Ye(o, t, e) {
  return {
    horizontal: o,
    innerWidth: t,
    innerHeight: e,
    at: (n, s) => o ? [s, n] : [n, s],
    catExtent: o ? e : t,
    valExtent: o ? t : e,
    axisAcross: o ? 0 : e,
    outward: o ? -1 : 1
  };
}
function Ke(o, { grouped: t, padding: e, groupPadding: n, outside: s = !1 }) {
  var p;
  const i = t ? n ?? e : 0, a = [];
  for (const f of o) {
    const d = t && f.group !== ((p = a.at(-1)) == null ? void 0 : p.group);
    d && !s && a.push({ group: f.group, item: null, starts: !1 }), a.push({ group: f.group, item: f, starts: d });
  }
  const r = t && !s ? (1 + e) / 2 + i / 2 : e;
  let l = 0;
  a.forEach((f, d) => {
    const v = !f.item;
    s && d > 0 && f.starts && (l += i), v && d > 0 && (l += i / 2), f.offset = l, l += 1, v && (l += i / 2);
  });
  const h = 2 * r + l - e;
  return {
    lanes: a,
    totalSteps: h,
    firstFraction: (r + (1 - e) / 2) / h,
    place([f, d]) {
      const v = (d - f) / h, x = v * (1 - e);
      for (const _ of a)
        _.pos = f + (r + _.offset) * v + x / 2, _.item && (_.item.pos = _.pos);
      const m = [];
      if (t) {
        for (const _ of a) {
          if (!_.item) continue;
          const A = _.pos + x / 2;
          _.starts ? m.push({ group: _.group, from: _.pos - x / 2, to: A, sep: null }) : m.at(-1).to = A;
        }
        m.forEach((_, A) => {
          A > 0 && (_.sep = (m[A - 1].to + _.from) / 2);
        });
      }
      return { step: v, bandwidth: x, spans: m };
    }
  };
}
function Ze({ fontSize: o, labelWidth: t, totalSteps: e, firstFraction: n, width: s, left: i, right: a }) {
  const r = (s - i - a) / e < t, l = Zt + 3 + o, h = r ? (t + Zt + 3 + 0.75 * o) * Math.SQRT1_2 + 0.3 * o : l;
  if (!r) return { tilt: r, depth: h, extra: 0, left: i };
  const p = Math.round(t * Math.SQRT1_2), f = n;
  return {
    tilt: r,
    depth: h,
    extra: h - l,
    left: Math.max(i, Math.ceil((p - f * (s - a)) / (1 - f)))
  };
}
function zt(o, t, e) {
  return o.attr("x1", (n) => t(n)[0]).attr("y1", (n) => t(n)[1]).attr("x2", (n) => e(n)[0]).attr("y2", (n) => e(n)[1]);
}
function Qe(o, t, e, n) {
  const s = o.append("g").selectAll("line").data(n).join("line");
  return s.attr("stroke", ds), zt(
    s,
    (i) => t.at(0, e(i)),
    (i) => t.at(t.catExtent, e(i))
  );
}
function Je(o, t, e = !1) {
  const { innerWidth: n, innerHeight: s } = t;
  return o.append("path").attr("d", e ? `M0,0H${n}V${s}H0Z` : `M0,0V${s}H${n}`).attr("fill", "none").attr("stroke", ee);
}
function ts(o, t, e, { fontSize: n, tickValues: s, format: i }) {
  const a = t.horizontal ? k.axisBottom(e) : k.axisLeft(e), r = o.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(a.tickValues(s).tickFormat(i).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", n), r.selectAll("text").attr("fill", ue), r.selectAll(".tick line").attr("stroke", ee), r.select(".domain").remove(), r;
}
function es(o, t, e, { fontSize: n, ticked: s, label: i, heading: a, tilt: r, outside: l }) {
  const { horizontal: h, at: p, axisAcross: f, outward: d, valExtent: v } = t, x = o.append("g").attr("font-size", n), m = x.selectAll("g").data(e.filter((S) => !S.item || s(S.item))).join("g").attr("transform", (S) => `translate(${p(S.pos, f).join(",")})`);
  zt(
    m.append("line"),
    () => p(0, d * Zt),
    (S) => p(0, S.item ? 0 : -d * v)
  );
  const [_, A] = p(0, d * (Zt + 3)), M = m.append("text").attr("x", _).attr("y", A).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em").attr("fill", ue).each(function(S) {
    const T = k.select(this);
    S.item ? i(T, S.item) : T.attr("font-weight", 600).text(a(S.group));
  });
  if (r && M.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: S, across: T } = l;
    zt(
      x.selectAll(".separator").data(S.slice(1)).join("line"),
      (H) => p(H.sep, f),
      (H) => p(H.sep, f - d * v)
    ), x.selectAll(".heading").data(S).join("text").attr("transform", (H) => {
      const [E, V] = p((H.from + H.to) / 2, T);
      return `translate(${E},${V})` + (h ? " rotate(90)" : "");
    }).attr("text-anchor", "middle").attr("font-weight", 600).attr("fill", ue).text((H) => a(H.group));
  }
  return x.selectAll("line").attr("stroke", ee), x;
}
const ps = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function bt(o, t, e) {
  const { title: n, tickValues: s, fontSize: i, highlight: a, dimension: r = "color" } = e, l = e.format ?? ((_) => _), h = e.key ?? ((_) => _), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", f = (_) => ps.has(p(_)) ? p(_) : "square";
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const d = a != null, v = (_) => d && a.active && !a.isSelected(r, h(_)), x = (_, A) => a.toggle(r, h(A), { extend: _.shiftKey || _.metaKey }), m = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", d).classed("chart-legend__item--muted", v);
  d && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (_) => a.isSelected(r, h(_))).on("click", x).on("keydown", (_, A) => {
    _.key !== "Enter" && _.key !== " " || (_.preventDefault(), x(_, A));
  }), m.append("i").attr("class", (_) => `chart-legend__swatch chart-legend__swatch--${f(_)}`).style("color", (_) => v(_) ? mt : t(_)), m.append("span").text((_) => l(_));
}
let fs = 0;
function gs(o, t, e) {
  const { title: n, fontSize: s, width: i = 160 } = e;
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  const a = s ?? 12;
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const [r, l] = t.domain(), h = Math.ceil(a * 1.5), p = Math.round(a * 0.67), f = o.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), d = `chart-legend-ramp-${fs += 1}`;
  f.append("linearGradient").attr("id", d).selectAll("stop").data(k.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(r + m * (l - r)));
  const v = f.append("g").attr("transform", `translate(${h},0)`);
  v.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${d})`);
  const x = k.axisBottom(k.scaleLinear([r, l], [0, i]));
  v.append("g").attr("transform", `translate(0,${p})`).call($t(x, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const ke = { small: 10, medium: 12, large: 14 };
function Et(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in ke)) throw new Error(`Unknown chart font size "${o}"`);
  return ke[o];
}
function ut(o, t) {
  return t ? o + 16 : 0;
}
const ms = 0.5, ys = 0.72, _s = 5, ss = 8;
function Ft(o) {
  return !!o.title && o.titlePosition === "top";
}
function Ct(o) {
  return o * 1.5 + ss;
}
function se(o, t, { fontSize: e, color: n }) {
  const s = e * ms, i = -(e / 2 + ss), a = o.append("g").attr("class", "axis-title axis-title--top"), r = a.append("text").attr("x", s + _s).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, h = s / 2, p = i - e * ys, f = a.append("path").attr("d", `M${l},${i}V${p}M${l - h},${p + h}L${l},${p}L${l + h},${p + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (r.attr("fill", n), f.attr("stroke", n)), a;
}
let Dt;
const xs = 0.55;
function Tt(o, t, e, n = 400) {
  if (Dt === void 0 && (Dt = document.createElement("canvas").getContext("2d")), !Dt) return String(o).length * t * xs;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Dt.font = `${n} ${t}px ${s}`, Dt.measureText(String(o)).width;
}
function ct(o, t, e, n) {
  let s = 0;
  for (const i of o)
    s = Math.max(s, Tt(i, t, e, n));
  return s;
}
class Ht {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = k.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
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
    const [e, n] = k.pointer(t, this.root), s = this.div.node(), i = 14, a = e + i + s.offsetWidth > this.root.clientWidth ? e - i - s.offsetWidth : e + i, r = n + i + s.offsetHeight > this.root.clientHeight ? n - i - s.offsetHeight : n + i;
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
const be = 6, ne = 0.85, vs = "rgba(0,0,0,0.55)", Le = "rgba(0,0,0,0.6)", ws = {
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
class Vo {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...ws, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Ht(t), this.draw();
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
   * category axis, one per bar, and the counts along the value axis (see
   * chartLanes.js). Everything is placed as a position `along` the category
   * axis and one `across` it, and the frame's `at` maps the pair to screen
   * coordinates: the one place the orientation turns the layout.
   */
  draw() {
    const { width: t, rowHeight: e, groupPadding: n, rangePadding: s, border: i } = this.options, a = this.options.orientation === "horizontal", r = this.svg.node(), l = Et(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: h, bars: p, total: f } = us(this.options.data, this.options), { category: d, value: v, group: x, color: m } = h, _ = !!x.accessor, A = d.domain, M = d.format ?? String, S = x.format ?? String, T = ($) => (_ ? `${S($.group)} / ` : "") + M($.label), H = this.options.barLabel !== "none", E = ($) => Kt($.count, f, this.options.barLabel);
    this._tooltipRows = ($) => {
      const B = Kt($.count, f, "percent"), j = [
        [F(d, "category"), M($.label)],
        [F(v, "count"), `${$.count} of ${f} (${B})`]
      ];
      return _ && j.unshift([F(x, "group"), S($.group)]), this.options.tooltip ? this.options.tooltip($, j) : j;
    };
    const V = Lt(v.type).domain(v.domain), U = Vt(V, v), Y = v.format ?? V.tickFormat(v.ticks ?? void 0), Q = new Set(d.tickValues ?? A), W = _ && x.position === "outside", K = Ke(p, {
      grouped: _,
      padding: a ? We : Ue,
      groupPadding: n,
      outside: W
    }), { lanes: G, totalSteps: J } = K, c = _ ? x.domain.map(S) : [], [L, b] = a ? [v.title, d.title] : [d.title, v.title], y = Ft(a ? d : v), w = y ? 0 : ut(l, b), z = Math.max(
      ct(A.map(M), l, r),
      W ? 0 : ct(c, l, r, 600)
    ), R = W ? l + Xe : 0, ot = ct(p.map(E), l * ne, r, 600);
    let P, Z, st = !1;
    if (a)
      P = {
        top: y ? Ct(l) : l,
        right: ot + be + 8 + R,
        bottom: l + 16 + ut(l, L),
        left: w + z + Qt
      }, Z = P.top + (_ ? J : G.length) * e + P.bottom;
    else {
      P = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((H ? l * ne : 0) + 16, y ? Ct(l) : 0) + R,
        right: 16,
        bottom: 0,
        // below
        left: w + ct(U.map(Y), l, r) + Qt
      };
      const $ = Ze({
        fontSize: l,
        labelWidth: z,
        totalSteps: J,
        firstFraction: K.firstFraction,
        width: t,
        left: P.left,
        right: P.right
      });
      st = $.tilt, P.bottom = $.depth + 15 + ut(l, L), P.left = $.left, Z = this.options.height + $.extra;
    }
    const nt = t - P.left - P.right, I = Z - P.top - P.bottom, tt = Ye(a, nt, I), { at: dt, outward: pt } = tt, { bandwidth: ht, spans: ft } = K.place(d.range || [0, tt.catExtent]), D = V.range(
      v.range || (a ? [s, nt - s] : [I - s, s])
    ), at = D(V.domain()[0]), et = k.scaleOrdinal(m.domain, m.range), wt = ($) => this.highlight.color(et($.color), $, { color: $.color });
    this.root.style("max-width", `${t}px`);
    const N = this.svg.attr("viewBox", `0 0 ${t} ${Z}`).attr(
      "aria-label",
      `Bar chart of ${F(v, "count")} by ${F(d, "category")}` + (_ ? ` within ${F(x, "group")}` : "") + `. ${p.map(($) => `${T($)}: ${$.count}`).join(", ")}`
    );
    N.selectAll("*").remove();
    const rt = N.append("g").attr("transform", `translate(${P.left},${P.top})`);
    Qe(rt, tt, D, U), ts(rt, tt, D, { fontSize: l, tickValues: U, format: Y }), Je(rt, tt, i), es(rt, tt, G, {
      fontSize: l,
      ticked: ($) => Q.has($.label),
      label: ($, B) => $.text(M(B.label)),
      heading: S,
      tilt: st,
      outside: W ? { spans: ft, across: a ? nt + P.right - l : -P.top + l } : null
    });
    const lt = ($) => {
      const [B, j] = dt($.pos - ht / 2, Math.min(at, D($.count))), [Rt, St] = dt(ht, Math.abs(D($.count) - at));
      return { x: B, y: j, w: Rt, h: St };
    }, g = rt.append("g").selectAll("g").data(p).join("g");
    if (g.append("rect").attr("rx", 3).attr("fill", wt).attr("x", ($) => lt($).x).attr("y", ($) => lt($).y).attr("width", ($) => lt($).w).attr("height", ($) => lt($).h).on("mouseenter", ($, B) => this._setHovered(B, $)).on("mousemove", ($) => this.tooltip.move($)).on("mouseleave", () => this._setHovered(null)), H) {
      const $ = (B) => dt(B.pos, D(B.count) - pt * be);
      g.append("text").attr("x", (B) => $(B)[0]).attr("y", (B) => $(B)[1]).attr("dy", a ? "0.35em" : null).attr("text-anchor", a ? "start" : "middle").attr("font-size", l * ne).attr("font-weight", 600).attr("fill", vs).text(E);
    }
    const C = ($) => N.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", Le).text($ || "");
    C(L).attr("x", P.left + nt / 2).attr("y", Z - l), y ? se(rt, b, { fontSize: l, color: Le }) : C(b).attr(
      "transform",
      `translate(${l + 2},${P.top + I / 2}) rotate(-90)`
    ), bt(this.legend, et, { ...m, fontSize: l, highlight: this.highlight });
  }
}
const ks = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, bs = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Ls = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Fo(o, t, e, { sort: n } = {}) {
  const s = k.group(o, (a) => a[t] || "(blank)"), i = Array.from(s, ([a, r]) => ({ label: a, count: r.length, group: r }));
  return n === "descending" ? i.sort((a, r) => r.count - a.count) : n === "ascending" && i.sort((a, r) => a.count - r.count), i.flatMap(
    ({ label: a, group: r }) => Array.from(
      k.rollup(
        r,
        (l) => l.length,
        (l) => l[e] || "(blank)"
      ),
      ([l, h]) => ({ label: a, key: l, count: h })
    )
  );
}
function Ss(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(ks, e.y), s = q(bs, e.x), i = q(Ls, e.color), a = k.rollup(
    o,
    (h) => k.sum(h, s.accessor),
    n.accessor,
    i.accessor
  );
  n.domain = it(n.domain, a.keys()), n.tickValues = ge(n), i.domain = it(i.domain, o.map(i.accessor));
  const r = n.domain.map((h) => {
    const p = a.get(h);
    let f = 0;
    const d = [];
    for (const v of i.domain) {
      const x = (p == null ? void 0 : p.get(v)) ?? 0;
      x > 0 && d.push({ key: v, count: x, start: f, end: f += x });
    }
    return { label: h, count: f, segments: d };
  });
  s.domain ?? (s.domain = te(s.type, [0, k.max(r, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = _t(i.domain.length));
  const l = t.total ?? k.sum(r, (h) => h.count);
  return { axes: { category: n, value: s, color: i }, bars: r, total: l };
}
const As = 12, Se = 6, Ae = 0.85, $s = "rgba(0,0,0,0.55)", Ms = {
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
class Go {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Ms, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Ht(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = Et(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: r } = Ss(this.options.data, this.options), { category: l, value: h, color: p } = i, f = l.domain, d = l.format ?? String, v = p.format ?? String, x = (y) => Kt(y.count, r, this.options.barLabel);
    this._tooltipRows = (y) => {
      const w = [
        [F(l, "category"), d(y.label)],
        [F(p, "group"), v(y.key)],
        [F(h, "count"), `${y.count} of ${y.barCount}`],
        ["Share of total", Kt(y.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(y, w) : w;
    };
    const m = Ft(l), _ = ct(f.map(d), s, n), A = {
      top: m ? Ct(s) : s,
      right: ct(a.map(x), s * Ae, n, 600) + Se + 8,
      bottom: s + 16 + ut(s, h.title),
      left: (m ? 0 : ut(s, l.title)) + _ + As
    }, M = t - A.left - A.right, S = f.length * e, T = A.top + S + A.bottom, H = k.scaleBand().domain(f).range(l.range || [0, S]).padding(0.3), E = Lt(h.type).domain(h.domain).range(h.range || [0, M]), V = k.scaleOrdinal(p.domain, p.range), U = (y) => this.highlight.color(V(y.key), y, { color: y.key }), Y = Vt(E, h), Q = h.format ?? E.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const W = a.map((y) => {
      const w = y.segments.map((z) => `${v(z.key)} ${z.count}`).join(", ");
      return `${d(y.label)}: ${y.count} (${w})`;
    }).join("; "), K = this.svg.attr("viewBox", `0 0 ${t} ${T}`).attr(
      "aria-label",
      `Stacked bar chart of ${F(h, "count")} by ${F(l, "category")}, split by ${F(p, "group")}. ${W}`
    );
    K.selectAll("*").remove();
    const G = K.append("g").attr("transform", `translate(${A.left},${A.top})`), J = G.append("g").call(
      k.axisLeft(H).tickValues(l.tickValues ?? f).tickFormat(d).tickSizeOuter(0)
    ), c = G.append("g").attr("transform", `translate(0,${S})`).call(k.axisBottom(E).tickValues(Y).tickFormat(Q).tickSizeOuter(0));
    for (const y of [J, c])
      y.attr("font-family", null).attr("font-size", s), y.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), y.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    G.insert("g", ":first-child").selectAll("line").data(Y).join("line").attr("y2", S).attr("x1", (y) => E(y)).attr("x2", (y) => E(y)).attr("stroke", "rgba(0,0,0,0.08)");
    const L = G.append("g").selectAll("g").data(a).join("g");
    L.selectAll("rect").data((y) => y.segments.map((w) => ({ ...w, label: y.label, barCount: y.count }))).join("rect").attr("x", (y) => E(y.start)).attr("y", (y) => H(y.label)).attr("width", (y) => Math.max(0, E(y.end) - E(y.start))).attr("height", H.bandwidth()).attr("fill", U).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (y, w) => this._setHovered(w, y)).on("mousemove", (y) => this.tooltip.move(y)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && L.append("text").attr("x", (y) => E(y.count) + Se).attr("y", (y) => H(y.label) + H.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ae).attr("font-weight", 600).attr("fill", $s).text(x);
    const b = (y) => K.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(y || "");
    b(h.title).attr("x", A.left + M / 2).attr("y", T - s), m ? se(G, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : b(l.title).attr(
      "transform",
      `translate(${s + 2},${A.top + S / 2}) rotate(-90)`
    ), bt(this.legend, V, { ...p, fontSize: s, highlight: this.highlight });
  }
}
const ye = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), os = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: ye
}, zs = { ...os, field: "y" }, Ts = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: ye
}, Cs = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: ye
}, Os = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Es(o = [{}], t = []) {
  const e = o.map((s, i) => ({
    ...Os,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Hs(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(os, e.x), s = q(zs, e.y), i = q(Ts, e.color), a = q(Cs, e.radius), r = Es(t.layers, o), l = r.flatMap((h) => h.data);
  for (const h of [n, s]) h.domain ?? (h.domain = te(h.type, Mt(l.map(h.accessor))));
  if (i.accessor) {
    const h = r.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = Mt(h)), i.range ?? (i.range = k.interpolateViridis)) : (i.domain = it(i.domain, h), i.range ?? (i.range = _t(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Mt(l.map(a.accessor)))), { axes: { x: n, y: s, color: i, radius: a }, layers: r };
}
const Rs = {
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
}, Ps = 0.92;
function ie(o, t, e) {
  return Lt(o.type).domain(t).range(o.range ?? e);
}
function Is(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : _t(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function Bs(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Lt(o.type).domain(o.domain).range(o.range);
}
class qo {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...Rs }, this.axes = null, this.layers = [], this.highlight = new Ot(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = Et(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = Hs(this.options.data, this.options);
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
    const { x: n, y: s } = this.scales, [i, a] = n.domain(), [r, l] = s.domain(), h = n.invert(0) - n.invert(t), p = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [i + h, a + h], y: [r + p, l + p] }, !1);
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
    this.root = k.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = k.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = k.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
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
    const t = this.fontSize, { x: e, y: n } = this.axes, s = Ft(n), i = { ...this.options.margin };
    if (i.top ?? (i.top = s ? Ct(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + ut(t, e.title)), i.left == null) {
      const a = ie(n, this._viewDomain.y, [0, 1]), r = Vt(a, n).map(n.format), l = ct(r, t * Ps, this.container);
      i.left = (s ? 0 : ut(t, n.title)) + l + 8;
    }
    return i;
  }
  _render(t) {
    const { height: e, duration: n } = this.options, s = this.margin = this._resolveMargin(), i = this.options.width ?? (this.container.clientWidth || 640), a = Math.max(i - s.left - s.right, 10), r = Math.max(e - s.top - s.bottom, 10);
    this.width = i, this.innerSize = [a, r], this.svg.attr("width", i).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", a).attr("height", r), this._updateScales(a, r), this.brush.extent([
      [0, 0],
      [a, r]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const l = t ? this.svg.transition().duration(n) : null;
    this._drawAxes(a, r, l), this._drawPoints(l), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: n, y: s, color: i, radius: a } = this.axes, r = this._viewDomain, l = this.options.rangePadding;
    this.scales = {
      x: ie(n, r.x, [l, t - l]),
      y: ie(s, r.y, [e - l, l]),
      color: Is(i),
      radius: Bs(a)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? k.Delaunay.from(
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
    const { x: s, y: i } = this.axes, { margin: a, fontSize: r } = this, l = (h) => n ? h.transition(n) : h;
    l(this.gridX).call(
      $t(k.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      $t(k.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      $t(k.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call($t(k.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), Ft(i) ? se(this.titleY, i.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + r + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(n) {
      e._drawLayer(k.select(this), n, t);
    });
  }
  _drawLayer(t, e, n) {
    const s = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (d) => this._px(d), r = (d) => this._py(d), l = (d) => this._pr(d), { highlight: h } = this, p = (d) => h.color(this._pcolor(d, e), d, this._keys(d, e)), f = t.selectAll("circle").data(e.data, s);
    f.exit().remove(), f.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", r).attr("r", l).attr(i, p), (n ? f.transition(n) : f).attr("cx", a).attr("cy", r).attr("r", l).attr(i, p), h.active && t.selectAll("circle").filter((d) => h.includes(d, this._keys(d, e))).raise();
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
      const [n, s] = e.domain(), i = 160, a = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", i).attr("height", 30), r = `${this.clipId}-ramp`;
      a.append("linearGradient").attr("id", r).selectAll("stop").data(k.ticks(0, 1, 10)).join("stop").attr("offset", (h) => h).attr("stop-color", (h) => e(n + h * (s - n))), a.append("rect").attr("width", i).attr("height", 8).attr("fill", `url(#${r})`);
      const l = k.scaleLinear([n, s], [0, i]);
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call($t(k.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return bt(this.legend, e, {
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
    return bt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const n = Vt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(n).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...n.map(e));
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
    const { x: a, y: r } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([a.invert(e), a.invert(s)], [r.invert(i), r.invert(n)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, n] = k.pointer(t, this.plot.node()), [s, i] = this.innerSize;
    if (e < 0 || e > s || n < 0 || n > i) return this._hideTooltip();
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
    for (const i of ["x", "y", "color"]) {
      const a = this.axes[i];
      i === "color" && e.color || a.accessor && n.push([F(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const Ds = { ...Ne, context: null }, Ns = { ...Ve, field: "value" };
function Vs(o) {
  const t = [...o].sort(k.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = k.quantile(t, 0.25), n = k.quantile(t, 0.5), s = k.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), r = Math.min(a.length ? a[0] : t[0], e), l = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: r, max: l, mean: k.mean(t) };
}
function Fs(o, t) {
  const e = [], n = [];
  for (const s of o) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function Gs(o = [], t = {}) {
  const e = t.axis ?? {}, n = qe(e, t.orientation !== "vertical"), s = q(Ds, n.category), i = q(Ns, n.value), a = q(Fe, e.group), r = q(Ge, e.color), l = je(s.context), h = (f, d, v) => {
    const { records: x, values: m } = Fs(v, i.accessor), _ = Vs(m), A = v[0];
    return {
      group: f,
      label: d,
      context: l && A ? l(A) ?? null : null,
      count: m.length,
      records: x,
      values: m,
      stats: _,
      outliers: m.map((M, S) => S).filter((M) => m[M] < _.min || m[M] > _.max),
      color: r.accessor && A ? r.accessor(A) ?? null : null
    };
  };
  let p;
  if (a.accessor) {
    const f = k.group(o, a.accessor, s.accessor);
    a.domain = it(a.domain, f.keys()), p = a.domain.flatMap((d) => {
      const v = f.get(d) ?? /* @__PURE__ */ new Map();
      return it(s.domain, v.keys()).filter((m) => v.has(m)).map((m) => h(d, m, v.get(m)));
    });
  } else {
    const f = k.group(o, s.accessor);
    p = it(s.domain, f.keys()).map(
      (d) => h(null, d, f.get(d) ?? [])
    );
  }
  if (s.domain = [...new Set(p.map((f) => f.label))], s.tickValues = ge(s), i.domain ?? (i.domain = te(i.type, Mt(p.flatMap((f) => f.values)))), r.accessor) {
    const f = p.map((d) => d.color).filter((d) => d != null);
    r.domain = it(r.domain, f), r.range ?? (r.range = _t(r.domain.length));
  }
  return { axes: { category: s, value: i, group: a, color: r }, boxes: p };
}
const $e = "rgba(0,0,0,0.45)", ae = "rgba(0,0,0,0.6)", qs = {
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
}, js = 0.35, Xs = 0.55, Us = "rgba(0,0,0,0.87)", re = 2, jt = 2.5, Me = 0.45, Ws = 0.9;
function Ys(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class jo {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...qs, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = k.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
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
  /**
   * The layout is the same whichever way the chart is turned: lanes along the
   * category axis, one per box, and the values along the value axis (see
   * chartLanes.js). Everything is placed as a position `along` the category
   * axis and one `across` it, and the frame's `at` maps the pair to screen
   * coordinates: the one place the orientation turns the layout.
   */
  draw() {
    const { width: t, rowHeight: e, groupPadding: n, points: s, showCounts: i, threshold: a, rangePadding: r, border: l } = this.options, h = this.options.orientation !== "vertical", p = this.svg.node(), f = Et(this.options.fontSize);
    this.tooltip.fontSize(f), this._leave();
    const { axes: d, boxes: v } = Gs(this.options.data, this.options), { category: x, value: m, group: _, color: A } = d, M = !!_.accessor, S = x.format ?? String, T = _.format ?? String, H = m.format ?? k.format(".3~f"), E = (u) => u.context != null ? `${u.context} / ` : "", V = (u) => i ? ` (n=${u.count})` : "", U = (u) => E(u) + S(u.label) + V(u), Y = (u) => (M ? `${T(u.group)} / ` : "") + U(u), Q = new Set(x.tickValues ?? x.domain), W = Lt(m.type).domain(m.domain), K = Vt(W, m), G = m.format ?? W.tickFormat(m.ticks ?? void 0), J = (a == null ? void 0 : a.value) != null && a.value >= Math.min(...m.domain) && a.value <= Math.max(...m.domain), c = J && a.label ? a.label : null, L = M && _.position === "outside", b = Ke(v, {
      grouped: M,
      padding: h ? We : Ue,
      groupPadding: n,
      outside: L
    }), { lanes: y, totalSteps: w } = b, z = M ? _.domain.map(T) : [], [R, ot] = h ? [m.title, x.title] : [x.title, m.title], P = Ft(h ? x : m), Z = P ? 0 : ut(f, ot), st = Math.max(
      ct(v.map(U), f, p),
      L ? 0 : ct(z, f, p, 600)
    ), nt = L ? f + Xe : 0;
    let I, tt, dt = !1;
    if (h)
      I = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(c ? 2 * f + 8 : f, P ? Ct(f) : 0),
        right: 16 + nt,
        bottom: f + 16 + ut(f, R),
        left: Z + st + Qt
      }, tt = I.top + (M ? w : y.length) * e + I.bottom;
    else {
      I = {
        top: Math.max(f, P ? Ct(f) : 0) + nt,
        // The threshold label to the right of the plot
        right: 16 + (c ? ct([c], f, p) + 6 : 0),
        bottom: 0,
        // below
        left: Z + ct(K.map(G), f, p) + Qt
      };
      const u = Ze({
        fontSize: f,
        labelWidth: st,
        totalSteps: w,
        firstFraction: b.firstFraction,
        width: t,
        left: I.left,
        right: I.right
      });
      dt = u.tilt, I.bottom = u.depth + 15 + ut(f, R), I.left = u.left, tt = this.options.height + u.extra;
    }
    const pt = t - I.left - I.right, ht = tt - I.top - I.bottom, ft = Ye(h, pt, ht), { at: D, catExtent: at } = ft, { bandwidth: et, spans: wt } = b.place(x.range || [0, at]), N = W.range(
      m.range || (h ? [r, pt - r] : [ht - r, r])
    ), rt = me(A), { highlight: lt } = this, g = (u, O) => lt.includes(u.records[O], { color: u.color }, u), C = new Map(
      v.map((u) => [u, !lt.active || u.records.some((O, X) => g(u, X))])
    ), $ = (u) => rt(u.color), B = (u) => C.get(u) ? $(u) : mt, j = (u) => C.get(u) ? A.accessor ? Us : $(u) : mt, Rt = A.accessor ? Xs : js, St = v.filter((u) => u.count), _e = (u, O, X) => {
      const [xt, vt] = D(X, N(u.values[O]));
      return { box: u, index: O, record: u.records[O], value: u.values[O], x: xt, y: vt, lit: g(u, O) };
    }, Pt = St.flatMap(
      (u) => s ? u.values.map((O, X) => _e(u, X, u.pos + Ys(X) * et / 2)) : u.outliers.map((O) => _e(u, O, u.pos))
    ), is = k.group(Pt, (u) => u.box), xe = (u) => u.lit ? $(u.box) : mt;
    this.root.style("max-width", `${t}px`);
    const as = St.map((u) => `${Y(u)}: median ${H(u.stats.median)}`).join("; "), oe = this.svg.attr("viewBox", `0 0 ${t} ${tt}`).attr(
      "aria-label",
      `Box plot of ${F(m, "value")} by ${F(x, "category")}` + (M ? ` within ${F(_, "group")}` : "") + `. ${as}`
    );
    oe.selectAll("*").remove();
    const gt = oe.append("g").attr("transform", `translate(${I.left},${I.top})`);
    if (Qe(gt, ft, N, K), ts(gt, ft, N, { fontSize: f, tickValues: K, format: G }), Je(gt, ft, l), es(gt, ft, y, {
      fontSize: f,
      ticked: (u) => Q.has(u.label),
      // A box's label in pieces, so the context and count are lighter
      label: (u, O) => {
        O.context != null && u.append("tspan").attr("fill", $e).text(E(O)), u.append("tspan").text(S(O.label)), i && u.append("tspan").attr("fill", $e).text(V(O));
      },
      heading: T,
      tilt: dt,
      outside: L ? { spans: wt, across: h ? pt + I.right - f : -I.top + f } : null
    }), J) {
      const u = N(a.value), [O, X] = D(0, u), [xt, vt] = D(at, u);
      if (gt.append("line").attr("x1", O).attr("y1", X).attr("x2", xt).attr("y2", vt).attr("stroke", ee).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), c) {
        const [It, Bt] = D(h ? -6 : at + 6, u);
        gt.append("text").attr("x", It).attr("y", Bt).attr("text-anchor", h ? "middle" : "start").attr("dy", h ? null : "0.32em").attr("font-size", f).attr("fill", ae).text(c);
      }
    }
    const At = gt.append("g").selectAll("g").data(St).join("g").attr("stroke", B).attr("fill", B);
    this.drawPoints(s ? Pt : [], {
      width: t,
      height: tt,
      offset: [I.left, I.top],
      color: xe,
      emphasis: lt.active
    }), zt(
      At.append("line"),
      (u) => D(u.pos, N(u.stats.min)),
      (u) => D(u.pos, N(u.stats.max))
    ), zt(
      At.selectAll(".cap").data((u) => [u.stats.min, u.stats.max].map((O) => ({ pos: u.pos, v: O }))).join("line").attr("class", "cap"),
      (u) => D(u.pos - et / 4, N(u.v)),
      (u) => D(u.pos + et / 4, N(u.v))
    );
    const Gt = (u) => {
      const O = N(u.stats.q1), X = N(u.stats.q3), [xt, vt] = D(u.pos - et / 2, Math.min(O, X)), [It, Bt] = D(et, Math.max(1, Math.abs(X - O)));
      return { x: xt, y: vt, w: It, h: Bt };
    };
    At.append("rect").attr("x", (u) => Gt(u).x).attr("y", (u) => Gt(u).y).attr("width", (u) => Gt(u).w).attr("height", (u) => Gt(u).h).attr("fill-opacity", Rt), zt(
      At.append("line"),
      (u) => D(u.pos - et / 2, N(u.stats.median)),
      (u) => D(u.pos + et / 2, N(u.stats.median))
    ).attr("stroke", j).attr("stroke-width", 2), At.append("circle").attr("cx", (u) => D(u.pos, N(u.stats.mean))[0]).attr("cy", (u) => D(u.pos, N(u.stats.mean))[1]).attr("r", 3).attr("fill", j), s || At.selectAll(".outlier").data((u) => is.get(u) ?? []).join("circle").attr("class", "outlier").attr("cx", (u) => u.x).attr("cy", (u) => u.y).attr("r", jt).attr("fill", "#fff").attr("stroke", xe), this.hoverRing = gt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? re : jt) + 2.5).style("display", "none");
    const ve = (u) => oe.append("text").attr("text-anchor", "middle").attr("font-size", f).attr("font-weight", 600).attr("fill", ae).text(u || "");
    ve(R).attr("x", I.left + pt / 2).attr("y", tt - f), P ? se(gt, ot, { fontSize: f, color: ae }) : ve(ot).attr(
      "transform",
      `translate(${f + 2},${I.top + ht / 2}) rotate(-90)`
    ), bt(this.legend, rt, {
      ...A,
      title: A.accessor ? A.title : null,
      fontSize: f,
      highlight: this.highlight
    });
    const { tooltip: qt } = this.options, we = F(x, "category"), rs = (u) => {
      const [O, X] = [N(u.stats.min), N(u.stats.max)];
      return [Math.min(O, X) - jt, Math.max(O, X) + jt];
    };
    this.hit = {
      margin: I,
      marks: Pt,
      delaunay: Pt.length ? k.Delaunay.from(
        Pt,
        (u) => u.x,
        (u) => u.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (u, O) => {
        const [X, xt] = D(u, O);
        return St.find((vt) => {
          const [It, Bt] = rs(vt);
          return Math.abs(X - vt.pos) <= et / 2 && xt >= It && xt <= Bt;
        }) ?? null;
      },
      markRows: (u) => {
        const O = [
          [we, Y(u.box)],
          [F(m, "value"), H(u.value)]
        ];
        return qt ? qt(u.record, O, u.box) : O;
      },
      boxRows: (u) => {
        const O = u.stats, X = [
          [we, Y(u)],
          ["n", String(u.count)],
          ["Median", H(O.median)],
          ["Mean", H(O.mean)],
          ["Q1", H(O.q1)],
          ["Q3", H(O.q3)],
          ["Whiskers", `${H(O.min)} to ${H(O.max)}`]
        ];
        return qt ? qt(null, X, u) : X;
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
  drawPoints(t, { width: e, height: n, offset: [s, i], color: a, emphasis: r }) {
    var v, x;
    this.canvas.style("display", t.length ? null : "none");
    const l = (x = (v = this.canvas.node()).getContext) == null ? void 0 : x.call(v, "2d");
    if (!l) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(n * h)), l.setTransform(h, 0, 0, h, 0, 0), l.clearRect(0, 0, e, n);
    const p = (m, _, A) => {
      l.globalAlpha = A, l.fillStyle = m, l.beginPath();
      for (const M of _) {
        const S = M.x + s, T = M.y + i;
        l.moveTo(S + re, T), l.arc(S, T, re, 0, 2 * Math.PI);
      }
      l.fill();
    }, f = k.group(t, a), d = f.get(mt);
    d && p(mt, d, Me);
    for (const [m, _] of f)
      m !== mt && p(m, _, r ? Ws : Me);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [n, s] = k.pointer(t, this.svg.node()), i = n - e.margin.left, a = s - e.margin.top, r = e.delaunay ? e.marks[e.delaunay.find(i, a)] : null;
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
    var n, s;
    t === this.hovered.record && e === this.hovered.box || (this.hovered = { record: t, box: e }, (s = (n = this.options).onHover) == null || s.call(n, t, e));
  }
}
const Ks = { field: null, title: null, format: null }, Zs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Qs = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function yt(o) {
  return o != null && o !== "" && !(typeof o == "number" && Number.isNaN(o));
}
function Js(o = [], t = {}) {
  var f;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((d) => q(Ks, d)), s = q(Zs, e.color), i = q(Qs, e.radius), a = s.accessor ?? i.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const d of o) {
    const v = [];
    for (const A of n) {
      const M = (f = A.accessor) == null ? void 0 : f.call(A, d);
      if (!yt(M)) break;
      v.push(M);
    }
    if (!v.length) continue;
    let x = r;
    v.forEach((A, M) => {
      const S = JSON.stringify(v.slice(0, M + 1));
      let T = l.get(S);
      T || (T = { key: S, label: A, level: M, record: null, children: [] }, l.set(S, T), x.children.push(T)), x = T;
    });
    const m = x, _ = a && !yt(a(m.record ?? {})) && yt(a(d));
    (!m.record || _) && (m.record = d);
  }
  const h = [...l.values()].filter((d) => d !== r);
  for (const d of h)
    d.value = d.record && a ? a(d.record) : null, d.empty = !d.record || a != null && !yt(d.value), d.colorValue = !d.empty && s.accessor ? s.accessor(d.record) : null, d.radiusValue = !d.empty && i.accessor ? i.accessor(d.record) : null;
  const p = h.filter((d) => !d.empty);
  if (s.accessor) {
    const d = p.map((v) => v.colorValue).filter(yt);
    s.type === "sequential" ? (s.domain ?? (s.domain = Mt(d)), s.range ?? (s.range = k.interpolateViridis)) : (s.domain = it(s.domain, d), s.range ?? (s.range = _t(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Mt(p.map((d) => d.radiusValue).filter(yt)))), { axes: { color: s, radius: i }, levels: n, root: r, nodes: h };
}
const ze = 12, Te = 2, to = 1.5, eo = 2.9, so = 7, le = 1.1, Ce = 4, Nt = 2, oo = 3.3, no = 0.92, io = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), ao = { color: "#b4b2aa", radius: 6, label: null }, ro = {
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
function lo(o, t, e, n) {
  const s = String(o ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const r of s) {
    const l = a ? `${a} ${r}` : r;
    a && Tt(l, e, n) > t ? (i.push(a), a = r) : a = l;
  }
  return a && i.push(a), i;
}
function co(o) {
  const { l: t } = k.lab(o);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class Xo {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...ro, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Ht(t), this.draw(), this._observeResize();
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
    var lt;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...ao, ...this.options.empty }, i = Et(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const r = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: l, levels: h, root: p } = Js(this.options.data, this.options);
    this.axes = l;
    const f = me(l.color), d = cs(l.radius), v = l.color.accessor ? l.color : l.radius, x = v.format ?? io, m = (g) => {
      const C = h[g.level];
      return C != null && C.format ? C.format(g.label) : g.label;
    };
    this._tooltipRows = (g) => {
      const C = [[F(h[g.level], `Level ${g.level + 1}`), m(g)]];
      return yt(g.value) && C.push([F(v, "value"), x(g.value)]), this.options.tooltip ? this.options.tooltip(g, C) : C;
    };
    const _ = (g) => g.empty ? s.color : l.color.accessor ? f(g.colorValue) : f(), A = (g) => g.empty || l.radius.accessor && l.radius.type !== "constant" && !yt(g.radiusValue) ? s.radius : d(g.radiusValue), M = (g) => this.highlight.color(_(g.data), g.data, { color: g.data.colorValue }), S = k.hierarchy(p), T = S.descendants().filter((g) => g.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      f,
      i,
      s,
      T.some((g) => g.data.empty)
    ), !T.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const H = le * i, E = /* @__PURE__ */ new Map();
    for (const g of T) {
      const C = h[g.depth - 1], $ = C != null && C.format ? C.format(g.data.label) : g.data.label, B = lo($, so * i, i, r), j = Math.max(0, ...B.map((Rt) => Tt(Rt, i, r)));
      E.set(g, { lines: B, width: j, height: B.length * H });
    }
    const V = (g) => A(g.data), U = (g) => Math.max(V(g), E.get(g).height / 2), Y = (g) => V(g) + Ce + E.get(g).width + Nt, Q = S.height || 1, W = T.filter((g) => !g.children && g.depth === Q), K = Math.ceil(Math.max(0, ...W.map(Y))), G = Math.max(0, ...T.filter((g) => g.depth === 1 && g.children).map(Y));
    let J = ze, c = t;
    for (let g = 0; g < 3; g += 1)
      c = Math.max(1, Math.min(t, (a - J - K) / Q)), J = Math.max(ze, Math.ceil(G - c));
    const L = Math.round(eo * i);
    k.tree().nodeSize([1, c]).separation((g, C) => {
      const $ = U(g) + U(C) + Te;
      return g.parent === C.parent ? $ : $ * to;
    })(S);
    let b = 1 / 0, y = -1 / 0, w = 0;
    for (const g of T)
      b = Math.min(b, g.x), y = Math.max(y, g.x), w = Math.max(w, U(g));
    const z = y - b, R = w + Te, ot = L + z + R * 2, P = Math.max(this.options.height, Math.ceil(ot)), Z = P - L, st = z > 0 ? (Z - R * 2) / z : 1, nt = L + (Z - z * st) / 2, I = (g) => (g.x - b) * st, tt = (g) => g.depth === 0 ? c - oo * i : g.y, dt = this.svg.attr("width", a).attr("height", P).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((g, C) => F(g, `level ${C + 1}`)).join(", then ")}: ${T.length} nodes`
    ), pt = dt.append("g").attr("transform", `translate(${J},${nt})`), ht = /* @__PURE__ */ new Map();
    for (const g of T)
      ht.has(g.depth) || ht.set(g.depth, ((lt = h[g.depth - 1]) == null ? void 0 : lt.title) ?? "");
    dt.append("g").selectAll("text").data([...ht]).join("text").attr("class", "tree-chart__header").attr("x", ([g]) => J + g * c).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, g]) => g);
    const ft = S.children.length > 1, D = pt.append("g").selectAll("path").data(S.links().filter((g) => ft || g.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", k.linkHorizontal().x(tt).y(I)), at = pt.append("g").selectAll("g").data(T).join("g").attr("class", "tree-chart__node").attr("transform", (g) => `translate(${g.y},${I(g)})`);
    at.append("circle").attr("class", "tree-chart__circle").attr("r", V).attr("fill", M), n && at.filter((g) => yt(g.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * no).attr("fill", (g) => co(M(g))).text((g) => x(g.data.value));
    const et = (g) => !!g.children, wt = (g) => (et(g) ? -1 : 1) * (V(g) + Ce), N = at.filter((g) => E.get(g).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (g) => g.data.empty);
    N.append("rect").attr("class", "tree-chart__label-bg").attr("x", (g) => {
      const { width: C } = E.get(g);
      return (et(g) ? wt(g) - C : wt(g)) - Nt;
    }).attr("y", (g) => -E.get(g).height / 2 - Nt).attr("width", (g) => E.get(g).width + Nt * 2).attr("height", (g) => E.get(g).height + Nt * 2), N.append("text").attr("text-anchor", (g) => et(g) ? "end" : "start").selectAll("tspan").data((g) => {
      const { lines: C } = E.get(g);
      return C.map(($, B) => ({ line: $, i: B, count: C.length, x: wt(g) }));
    }).join("tspan").attr("x", (g) => g.x).attr(
      "dy",
      (g) => g.i === 0 ? `${0.31 - (g.count - 1) * le / 2}em` : `${le}em`
    ).text((g) => g.line);
    const rt = (g) => {
      if (!e) return;
      const C = g && /* @__PURE__ */ new Set([...g.ancestors(), ...g.descendants()]), $ = (j) => !!(C && C.has(j)), B = (j) => $(j.source) && $(j.target);
      at.classed("tree-chart__node--off-path", (j) => !!C && !$(j)), D.classed("tree-chart__link--on-path", B).classed("tree-chart__link--off-path", (j) => !!C && !B(j));
    };
    at.on("mouseenter", (g, C) => {
      rt(C), this._setHovered(C.data, g);
    }).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => {
      rt(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? gs(this.legend, t, a) : bt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), r.append("span").text(n.label);
  }
}
function Oe(o, t) {
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
function ho(o, t) {
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
function ce(o, t) {
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
function uo(o, t) {
  return o.sourceLinks.length ? o.depth : t - 1;
}
function Xt(o) {
  return function() {
    return o;
  };
}
function Ee(o, t) {
  return Jt(o.source, t.source) || o.index - t.index;
}
function He(o, t) {
  return Jt(o.target, t.target) || o.index - t.index;
}
function Jt(o, t) {
  return o.y0 - t.y0;
}
function he(o) {
  return o.value;
}
function po(o) {
  return o.index;
}
function fo(o) {
  return o.nodes;
}
function go(o) {
  return o.links;
}
function Re(o, t) {
  const e = o.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function Pe({ nodes: o }) {
  for (const t of o) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function mo() {
  let o = 0, t = 0, e = 1, n = 1, s = 24, i = 8, a, r = po, l = uo, h, p, f = fo, d = go, v = 6;
  function x() {
    const c = { nodes: f.apply(null, arguments), links: d.apply(null, arguments) };
    return m(c), _(c), A(c), M(c), H(c), Pe(c), c;
  }
  x.update = function(c) {
    return Pe(c), c;
  }, x.nodeId = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Xt(c), x) : r;
  }, x.nodeAlign = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : Xt(c), x) : l;
  }, x.nodeSort = function(c) {
    return arguments.length ? (h = c, x) : h;
  }, x.nodeWidth = function(c) {
    return arguments.length ? (s = +c, x) : s;
  }, x.nodePadding = function(c) {
    return arguments.length ? (i = a = +c, x) : i;
  }, x.nodes = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : Xt(c), x) : f;
  }, x.links = function(c) {
    return arguments.length ? (d = typeof c == "function" ? c : Xt(c), x) : d;
  }, x.linkSort = function(c) {
    return arguments.length ? (p = c, x) : p;
  }, x.size = function(c) {
    return arguments.length ? (o = t = 0, e = +c[0], n = +c[1], x) : [e - o, n - t];
  }, x.extent = function(c) {
    return arguments.length ? (o = +c[0][0], e = +c[1][0], t = +c[0][1], n = +c[1][1], x) : [[o, t], [e, n]];
  }, x.iterations = function(c) {
    return arguments.length ? (v = +c, x) : v;
  };
  function m({ nodes: c, links: L }) {
    for (const [y, w] of c.entries())
      w.index = y, w.sourceLinks = [], w.targetLinks = [];
    const b = new Map(c.map((y, w) => [r(y, w, c), y]));
    for (const [y, w] of L.entries()) {
      w.index = y;
      let { source: z, target: R } = w;
      typeof z != "object" && (z = w.source = Re(b, z)), typeof R != "object" && (R = w.target = Re(b, R)), z.sourceLinks.push(w), R.targetLinks.push(w);
    }
    if (p != null)
      for (const { sourceLinks: y, targetLinks: w } of c)
        y.sort(p), w.sort(p);
  }
  function _({ nodes: c }) {
    for (const L of c)
      L.value = L.fixedValue === void 0 ? Math.max(ce(L.sourceLinks, he), ce(L.targetLinks, he)) : L.fixedValue;
  }
  function A({ nodes: c }) {
    const L = c.length;
    let b = new Set(c), y = /* @__PURE__ */ new Set(), w = 0;
    for (; b.size; ) {
      for (const z of b) {
        z.depth = w;
        for (const { target: R } of z.sourceLinks)
          y.add(R);
      }
      if (++w > L) throw new Error("circular link");
      b = y, y = /* @__PURE__ */ new Set();
    }
  }
  function M({ nodes: c }) {
    const L = c.length;
    let b = new Set(c), y = /* @__PURE__ */ new Set(), w = 0;
    for (; b.size; ) {
      for (const z of b) {
        z.height = w;
        for (const { source: R } of z.targetLinks)
          y.add(R);
      }
      if (++w > L) throw new Error("circular link");
      b = y, y = /* @__PURE__ */ new Set();
    }
  }
  function S({ nodes: c }) {
    const L = Oe(c, (w) => w.depth) + 1, b = (e - o - s) / (L - 1), y = new Array(L);
    for (const w of c) {
      const z = Math.max(0, Math.min(L - 1, Math.floor(l.call(null, w, L))));
      w.layer = z, w.x0 = o + z * b, w.x1 = w.x0 + s, y[z] ? y[z].push(w) : y[z] = [w];
    }
    if (h) for (const w of y)
      w.sort(h);
    return y;
  }
  function T(c) {
    const L = ho(c, (b) => (n - t - (b.length - 1) * a) / ce(b, he));
    for (const b of c) {
      let y = t;
      for (const w of b) {
        w.y0 = y, w.y1 = y + w.value * L, y = w.y1 + a;
        for (const z of w.sourceLinks)
          z.width = z.value * L;
      }
      y = (n - y + a) / (b.length + 1);
      for (let w = 0; w < b.length; ++w) {
        const z = b[w];
        z.y0 += y * (w + 1), z.y1 += y * (w + 1);
      }
      K(b);
    }
  }
  function H(c) {
    const L = S(c);
    a = Math.min(i, (n - t) / (Oe(L, (b) => b.length) - 1)), T(L);
    for (let b = 0; b < v; ++b) {
      const y = Math.pow(0.99, b), w = Math.max(1 - y, (b + 1) / v);
      V(L, y, w), E(L, y, w);
    }
  }
  function E(c, L, b) {
    for (let y = 1, w = c.length; y < w; ++y) {
      const z = c[y];
      for (const R of z) {
        let ot = 0, P = 0;
        for (const { source: st, value: nt } of R.targetLinks) {
          let I = nt * (R.layer - st.layer);
          ot += G(st, R) * I, P += I;
        }
        if (!(P > 0)) continue;
        let Z = (ot / P - R.y0) * L;
        R.y0 += Z, R.y1 += Z, W(R);
      }
      h === void 0 && z.sort(Jt), U(z, b);
    }
  }
  function V(c, L, b) {
    for (let y = c.length, w = y - 2; w >= 0; --w) {
      const z = c[w];
      for (const R of z) {
        let ot = 0, P = 0;
        for (const { target: st, value: nt } of R.sourceLinks) {
          let I = nt * (st.layer - R.layer);
          ot += J(R, st) * I, P += I;
        }
        if (!(P > 0)) continue;
        let Z = (ot / P - R.y0) * L;
        R.y0 += Z, R.y1 += Z, W(R);
      }
      h === void 0 && z.sort(Jt), U(z, b);
    }
  }
  function U(c, L) {
    const b = c.length >> 1, y = c[b];
    Q(c, y.y0 - a, b - 1, L), Y(c, y.y1 + a, b + 1, L), Q(c, n, c.length - 1, L), Y(c, t, 0, L);
  }
  function Y(c, L, b, y) {
    for (; b < c.length; ++b) {
      const w = c[b], z = (L - w.y0) * y;
      z > 1e-6 && (w.y0 += z, w.y1 += z), L = w.y1 + a;
    }
  }
  function Q(c, L, b, y) {
    for (; b >= 0; --b) {
      const w = c[b], z = (w.y1 - L) * y;
      z > 1e-6 && (w.y0 -= z, w.y1 -= z), L = w.y0 - a;
    }
  }
  function W({ sourceLinks: c, targetLinks: L }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: b } } of L)
        b.sort(He);
      for (const { target: { targetLinks: b } } of c)
        b.sort(Ee);
    }
  }
  function K(c) {
    if (p === void 0)
      for (const { sourceLinks: L, targetLinks: b } of c)
        L.sort(He), b.sort(Ee);
  }
  function G(c, L) {
    let b = c.y0 - (c.sourceLinks.length - 1) * a / 2;
    for (const { target: y, width: w } of c.sourceLinks) {
      if (y === L) break;
      b += w + a;
    }
    for (const { source: y, width: w } of L.targetLinks) {
      if (y === c) break;
      b -= w;
    }
    return b;
  }
  function J(c, L) {
    let b = L.y0 - (L.targetLinks.length - 1) * a / 2;
    for (const { source: y, width: w } of L.targetLinks) {
      if (y === c) break;
      b += w + a;
    }
    for (const { target: y, width: w } of c.sourceLinks) {
      if (y === L) break;
      b -= w;
    }
    return b;
  }
  return x;
}
var de = Math.PI, pe = 2 * de, kt = 1e-6, yo = pe - kt;
function fe() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function ns() {
  return new fe();
}
fe.prototype = ns.prototype = {
  constructor: fe,
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
    var i = this._x1, a = this._y1, r = e - o, l = n - t, h = i - o, p = a - t, f = h * h + p * p;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = o) + "," + (this._y1 = t);
    else if (f > kt) if (!(Math.abs(p * r - l * h) > kt) || !s)
      this._ += "L" + (this._x1 = o) + "," + (this._y1 = t);
    else {
      var d = e - i, v = n - a, x = r * r + l * l, m = d * d + v * v, _ = Math.sqrt(x), A = Math.sqrt(f), M = s * Math.tan((de - Math.acos((x + f - m) / (2 * _ * A))) / 2), S = M / A, T = M / _;
      Math.abs(S - 1) > kt && (this._ += "L" + (o + S * h) + "," + (t + S * p)), this._ += "A" + s + "," + s + ",0,0," + +(p * d > h * v) + "," + (this._x1 = o + T * r) + "," + (this._y1 = t + T * l);
    }
  },
  arc: function(o, t, e, n, s, i) {
    o = +o, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(n), r = e * Math.sin(n), l = o + a, h = t + r, p = 1 ^ i, f = i ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + h : (Math.abs(this._x1 - l) > kt || Math.abs(this._y1 - h) > kt) && (this._ += "L" + l + "," + h), e && (f < 0 && (f = f % pe + pe), f > yo ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (o - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = l) + "," + (this._y1 = h) : f > kt && (this._ += "A" + e + "," + e + ",0," + +(f >= de) + "," + p + "," + (this._x1 = o + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(o, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Ie(o) {
  return function() {
    return o;
  };
}
function _o(o) {
  return o[0];
}
function xo(o) {
  return o[1];
}
var vo = Array.prototype.slice;
function wo(o) {
  return o.source;
}
function ko(o) {
  return o.target;
}
function bo(o) {
  var t = wo, e = ko, n = _o, s = xo, i = null;
  function a() {
    var r, l = vo.call(arguments), h = t.apply(this, l), p = e.apply(this, l);
    if (i || (i = r = ns()), o(i, +n.apply(this, (l[0] = h, l)), +s.apply(this, l), +n.apply(this, (l[0] = p, l)), +s.apply(this, l)), r) return i = null, r + "" || null;
  }
  return a.source = function(r) {
    return arguments.length ? (t = r, a) : t;
  }, a.target = function(r) {
    return arguments.length ? (e = r, a) : e;
  }, a.x = function(r) {
    return arguments.length ? (n = typeof r == "function" ? r : Ie(+r), a) : n;
  }, a.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : Ie(+r), a) : s;
  }, a.context = function(r) {
    return arguments.length ? (i = r ?? null, a) : i;
  }, a;
}
function Lo(o, t, e, n, s) {
  o.moveTo(t, e), o.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function So() {
  return bo(Lo);
}
function Ao(o) {
  return [o.source.x1, o.y0];
}
function $o(o) {
  return [o.target.x0, o.y1];
}
function Mo() {
  return So().source(Ao).target($o);
}
const zo = "(blank)", To = { field: null, title: null, domain: null, format: null, sort: "descending" }, Co = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, Ut = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? zo : String(e);
};
function Oo(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function Eo(o = [], t = {}) {
  var x;
  const e = (t.dimensions ?? []).map((m) => q(To, m)), n = q(Co, (x = t.axis) == null ? void 0 : x.color), s = e.findIndex((m) => m.field != null && m.field === n.field), i = Math.max(0, s), a = e.map((m, _) => {
    const A = k.rollup(
      o,
      (S) => S.length,
      (S) => Ut(m.accessor, S)
    ), M = Oo(A, m).map((S, T) => ({
      id: -1,
      dim: _,
      index: T,
      key: S,
      label: m.format ? m.format(S) : S,
      count: A.get(S)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: _,
      nodes: M,
      byKey: new Map(M.map((S) => [S.key, S]))
    };
  }), r = a.flatMap((m) => m.nodes);
  r.forEach((m, _) => {
    m.id = _;
  });
  const l = (m) => e.map((_) => Ut(_.accessor, m)).join("\0"), h = k.rollups(o, (m) => m, l).map(([, m]) => {
    const _ = e.map((M) => Ut(M.accessor, m[0])), A = _.map((M, S) => a[S].byKey.get(M));
    return {
      keys: _,
      labels: A.map((M) => M.label),
      nodes: A,
      records: m,
      value: m.length
    };
  }), p = [i, ...e.map((m, _) => _).filter((m) => m !== i)];
  h.sort((m, _) => {
    for (const A of p) {
      const M = m.nodes[A].index - _.nodes[A].index;
      if (M) return M;
    }
    return 0;
  });
  const f = [];
  for (const m of h)
    for (let _ = 1; _ < e.length; _++)
      f.push({
        source: m.nodes[_ - 1].id,
        target: m.nodes[_].id,
        pair: _ - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const d = a[i], v = e[i];
  return v && (n.field ?? (n.field = v.field), n.accessor = (m) => Ut(v.accessor, m), n.format ?? (n.format = v.format)), n.domain = it(
    n.domain,
    d ? d.nodes.map((m) => m.key) : []
  ), n.range ?? (n.range = _t(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: _, nodes: A }) => ({
      title: m,
      index: _,
      nodes: A
    })),
    nodes: r,
    paths: h,
    links: f,
    total: o.length
  };
}
const Ho = 2.3, Be = 5, De = 6, Ro = 2, Wt = 6, Yt = 0.92, Po = "#333", Io = {
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
class Uo {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...Io, ...e }, this.highlight = new Ot(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Ht(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: i } = this.options, a = Et(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(a);
    const l = Eo(this.options.data, this.options);
    this.prepared = l;
    const { axes: h, columns: p, colorIndex: f, total: d } = l, v = me(h.color), x = (c) => this.highlight.includes(c, { color: c.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(v, a), !l.nodes.length || p.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), _ = p[p.length - 1], A = (c) => Tt(`${c.label} `, a, m) + Tt(c.count, a * Yt, m), M = Math.ceil(
      Math.max(
        Tt(_.title, a * Yt, m, 600),
        ..._.nodes.map(A)
      )
    ) + De + Ro, S = Math.round(Ho * a), T = Math.max(r - M, t * p.length), H = [
      [0, S + Be],
      [T, S + this.options.height - Be]
    ], E = mo().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(H)({
      nodes: l.nodes.map((c) => ({ ...c })),
      links: l.links.map((c) => ({ ...c }))
    });
    n && Bo(E.nodes, p.length, H[0][1], H[1][1]);
    const V = Mo(), U = (c) => c.x1 + De, Y = (c) => c.dim === f ? this.highlight.color(v(c.key), c, { color: c.key }) : !this.highlight.active || c.sourceLinks.some(x) || c.targetLinks.some(x) ? Po : mt, Q = this.svg.attr("width", r).attr("height", S + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${d} ${i} across ${p.map((c) => c.title).join(", ")}`
    ), W = (c) => E.nodes.find((L) => L.dim === c.index);
    Q.append("g").selectAll("text").data(p.filter(W)).join("text").attr("class", "parallel-sets__header").attr("x", (c) => U(W(c))).attr("y", S - a * 0.9).attr("text-anchor", "start").attr("font-size", a * Yt).text((c) => c.title);
    const K = Q.append("g").attr("fill", "none").selectAll("path").data(E.links).join("path").attr("class", "parallel-sets__link").attr("d", V).attr("stroke", (c) => this.highlight.color(v(c.colorKey), c, { color: c.colorKey })).attr("stroke-width", (c) => Math.max(c.width, 1)), G = Q.append("g").selectAll("g").data(E.nodes).join("g").attr("class", "parallel-sets__node");
    G.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (c) => c.x0).attr("y", (c) => c.y0).attr("width", (c) => c.x1 - c.x0).attr("height", (c) => Math.max(c.y1 - c.y0, 1)).attr("fill", Y), G.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (c) => c.x0 - Wt).attr("y", (c) => c.y0 - Wt / 2).attr("width", (c) => c.x1 - c.x0 + Wt * 2).attr("height", (c) => Math.max(c.y1 - c.y0, 1) + Wt), G.append("text").attr("class", "parallel-sets__label").attr("x", U).attr("y", (c) => (c.y0 + c.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((c) => `${c.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * Yt).text((c) => c.count), s && this._bindHover(G, K, E);
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
      return r ? r.type === "link" ? r.keys.every((l, h) => a.keys[h] === l) : a.keys[r.node.dim] === r.node.key : !0;
    }, i = () => {
      const a = this.hovered != null, r = /* @__PURE__ */ new Set();
      if (a)
        for (const l of n.links)
          s(l) && (r.add(l.source.id), r.add(l.target.id));
      e.classed("parallel-sets__link--active", (l) => a && s(l)).classed("parallel-sets__link--muted", (l) => a && !s(l)), t.classed("parallel-sets__node--muted", (l) => a && !r.has(l.id));
    };
    this._applyHover = i, t.on("mouseenter", (a, r) => {
      const l = { type: "node", node: r };
      this._setHovered(l), this.tooltip.show(this._nodeTooltip(l), a, r);
    }).on("mousemove", (a) => this.tooltip.move(a)), e.on("mouseenter", (a, r) => {
      const l = r.keys.slice(0, r.pair + 2), h = n.links.filter((d) => d.pair === r.pair && l.every((v, x) => d.keys[x] === v)).reduce((d, v) => d + v.value, 0), p = r.labels.slice(0, l.length), f = { type: "link", keys: l, labels: p, pair: r.pair, value: h };
      this._setHovered(f), this.tooltip.show(this._linkTooltip(f), a, r);
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
    bt(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function Bo(o, t, e, n) {
  for (let s = 0; s < t; s++) {
    const i = o.filter((h) => h.dim === s).sort((h, p) => h.y0 - p.y0);
    if (i.length < 2) continue;
    const a = i.reduce((h, p) => h + (p.y1 - p.y0), 0), r = (n - e - a) / (i.length - 1);
    let l = e;
    for (const h of i) {
      const p = h.y1 - h.y0;
      h.y0 = l, h.y1 = l + p, l += p + r;
    }
  }
  for (const s of o) {
    let i = s.y0;
    for (const r of s.sourceLinks)
      r.y0 = i + r.width / 2, i += r.width;
    let a = s.y0;
    for (const r of s.targetLinks)
      r.y1 = a + r.width / 2, a += r.width;
  }
}
export {
  Vo as BarChart,
  jo as BoxPlotChart,
  ke as FONT_SIZES,
  Ot as Highlight,
  mt as MUTED_COLOR,
  Uo as ParallelSetsChart,
  qo as ScatterPlot,
  Go as StackedBarChart,
  Ht as Tooltip,
  Xo as TreeChart,
  Kt as barLabel,
  Ze as bottomLabels,
  Vs as boxStats,
  Do as categoryColors,
  Ye as chartFrame,
  No as countBy,
  Fo as countByStacked,
  _t as defaultColors,
  es as drawCategoryAxis,
  Qe as drawGridlines,
  bt as drawLegend,
  Je as drawPlotEdges,
  gs as drawSequentialLegend,
  se as drawTopTitle,
  ts as drawValueAxis,
  yt as hasValue,
  Ke as laneLayout,
  ct as maxTextWidth,
  Tt as measureText,
  us as prepareBarChart,
  Gs as prepareBoxPlotChart,
  Eo as prepareParallelSets,
  Hs as prepareScatterPlot,
  Ss as prepareStackedBarChart,
  Js as prepareTreeChart,
  Et as resolveFontSize,
  ut as titleLane,
  Ft as titleOnTop,
  Ct as topTitleLane
};
