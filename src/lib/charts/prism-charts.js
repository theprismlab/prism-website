import * as k from "d3";
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
function _t(o) {
  return o <= k.schemeTableau10.length ? k.schemeTableau10 : Cs;
}
function Mn(o, t) {
  const e = k.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: n, range: _t(n.length) };
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
function ce(o) {
  return o.showTitle === !1 ? null : o.title;
}
function hs(o) {
  return o.showTicks === !1 ? null : o.showTitle === !1 ? o.title == null ? null : "" : o.title;
}
function us(o, t) {
  return {
    category: o.category ?? (t ? o.y : o.x),
    value: o.value ?? (t ? o.x : o.y)
  };
}
function ds(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function Z(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = ds(e.field), e;
}
function j(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function ft(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function Te(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function Ot(o) {
  switch (o) {
    case "log":
      return k.scaleLog();
    case "sqrt":
      return k.scaleSqrt();
    default:
      return k.scaleLinear();
  }
}
function Nt(o, t = [0, 1]) {
  const [e, n] = k.extent(o);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function de(o, t, e) {
  return Ot(o).domain(t).nice(e ?? void 0).domain();
}
function Zt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function Bt(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
function pe(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : _t(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function Es(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Ot(o.type).domain(o.domain).range(o.range);
}
const Os = { ...rs, field: "count" };
function Sn(o, t, { sort: e, group: n } = {}) {
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
function he(o, t, e = "both") {
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
function Hs(o = [], t = {}) {
  const e = t.axis ?? {}, n = us(e, t.orientation === "horizontal"), s = Z(as, n.category), i = Z(Os, n.value), a = Z(ls, e.group), r = Z(cs, e.color), l = r.accessor ?? s.accessor, h = (u) => ({
    count: k.sum(u, i.accessor),
    color: l(u[0])
  });
  let p;
  if (a.accessor) {
    const u = k.rollup(o, h, a.accessor, s.accessor);
    a.domain = ft(a.domain, u.keys()), p = a.domain.flatMap((w) => {
      const _ = u.get(w) ?? /* @__PURE__ */ new Map();
      return ft(s.domain, _.keys()).filter((g) => _.has(g)).map((g) => ({ group: w, label: g, ..._.get(g) }));
    }), s.domain = [...new Set(p.map((w) => w.label))];
  } else {
    const u = k.rollup(o, h, s.accessor);
    s.domain = ft(s.domain, u.keys()), p = s.domain.map((w) => {
      var _, g;
      return {
        group: null,
        label: w,
        count: ((_ = u.get(w)) == null ? void 0 : _.count) ?? 0,
        color: ((g = u.get(w)) == null ? void 0 : g.color) ?? w
      };
    });
  }
  s.tickValues = Te(s), i.domain ?? (i.domain = de(i.type, [0, k.max(p, (u) => u.count) || 1], i.ticks)), r.domain = ft(
    r.domain,
    p.map((u) => u.color)
  ), r.range ?? (r.range = _t(r.domain.length));
  const f = t.total ?? k.sum(p, (u) => u.count);
  return { axes: { category: s, value: i, group: a, color: r }, bars: p, total: f };
}
const bt = "#cfcfcf";
class Ht {
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
    return this.includes(e, n, s) ? t : bt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const $t = 6, Vt = 12, ps = 8, fs = 0.35, gs = 0.3, Me = "rgba(0,0,0,0.7)", fe = "rgba(0,0,0,0.5)", Rs = "rgba(0,0,0,0.08)";
function ms(o, t, e) {
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
function ys(o, { grouped: t, padding: e, groupPadding: n, headingLanes: s = !0 }) {
  var p;
  const i = t ? n ?? e : 0, a = [];
  for (const f of o) {
    const u = t && f.group !== ((p = a.at(-1)) == null ? void 0 : p.group);
    u && s && a.push({ group: f.group, item: null, starts: !1 }), a.push({ group: f.group, item: f, starts: u });
  }
  const r = t && s ? (1 + e) / 2 + i / 2 : e;
  let l = 0;
  a.forEach((f, u) => {
    const w = !f.item;
    !s && u > 0 && f.starts && (l += i), w && u > 0 && (l += i / 2), f.offset = l, l += 1, w && (l += i / 2);
  });
  const h = 2 * r + l - e;
  return {
    lanes: a,
    totalSteps: h,
    firstFraction: (r + (1 - e) / 2) / h,
    place([f, u]) {
      const w = (u - f) / h, _ = w * (1 - e);
      for (const d of a)
        d.pos = f + (r + d.offset) * w + _ / 2, d.item && (d.item.pos = d.pos);
      const g = [];
      if (t) {
        for (const d of a) {
          if (!d.item) continue;
          const L = d.pos + _ / 2;
          d.starts ? g.push({ group: d.group, from: d.pos - _ / 2, to: L, sep: null }) : g.at(-1).to = L;
        }
        g.forEach((d, L) => {
          L > 0 && (d.sep = (g[L - 1].to + d.from) / 2);
        });
      }
      return { step: w, bandwidth: _, spans: g };
    }
  };
}
function xs({ fontSize: o, labelWidth: t, totalSteps: e, firstFraction: n, width: s, left: i, right: a }) {
  const r = (s - i - a) / e < t, l = $t + 3 + o, h = r ? (t + $t + 3 + 0.75 * o) * Math.SQRT1_2 + 0.3 * o : l;
  if (!r) return { tilt: r, depth: h, extra: 0, left: i };
  const p = Math.round(t * Math.SQRT1_2), f = n;
  return {
    tilt: r,
    depth: h,
    extra: h - l,
    left: Math.max(i, Math.ceil((p - f * (s - a)) / (1 - f)))
  };
}
function Ft(o, t, e) {
  return o.attr("x1", (n) => t(n)[0]).attr("y1", (n) => t(n)[1]).attr("x2", (n) => e(n)[0]).attr("y2", (n) => e(n)[1]);
}
function _s(o, t, e, n) {
  const s = o.append("g").selectAll("line").data(n).join("line");
  return s.attr("stroke", Rs), Ft(
    s,
    (i) => t.at(0, e(i)),
    (i) => t.at(t.catExtent, e(i))
  );
}
function vs(o, t, e = !1) {
  const { innerWidth: n, innerHeight: s } = t;
  return o.append("path").attr("d", e ? `M0,0H${n}V${s}H0Z` : `M0,0V${s}H${n}`).attr("fill", "none").attr("stroke", fe);
}
function ws(o, t, e, { fontSize: n, tickValues: s, format: i }) {
  const a = t.horizontal ? k.axisBottom(e) : k.axisLeft(e), r = o.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(a.tickValues(s).tickFormat(i).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", n), r.selectAll("text").attr("fill", Me), r.selectAll(".tick line").attr("stroke", fe), r.select(".domain").remove(), r;
}
function bs(o, t, e, { fontSize: n, ticked: s, label: i, heading: a, tilt: r, groups: l }) {
  const { horizontal: h, at: p, axisAcross: f, outward: u, valExtent: w } = t, _ = o.append("g").attr("font-size", n), g = _.selectAll("g").data(e.filter((y) => !y.item || s(y.item))).join("g").attr("transform", (y) => `translate(${p(y.pos, f).join(",")})`);
  Ft(
    g.append("line"),
    () => p(0, u * $t),
    (y) => p(0, y.item ? 0 : -u * w)
  );
  const [d, L] = p(0, u * ($t + 3)), $ = g.append("text").attr("x", d).attr("y", L).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em").attr("fill", Me).each(function(y) {
    const C = k.select(this);
    y.item ? i(C, y.item) : C.attr("font-weight", 600).text(a(y.group));
  });
  if (r && $.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: y, position: C, across: D } = l;
    Ft(
      _.selectAll(".separator").data(y.slice(1)).join("line"),
      (B) => p(B.sep, f),
      (B) => p(B.sep, f - u * w)
    );
    const R = _.selectAll(".heading").data(y).join("text").attr("font-weight", 600).attr("fill", Me).text((B) => a(B.group));
    C === "outside" ? R.attr("transform", (B) => {
      const [U, q] = p((B.from + B.to) / 2, D);
      return `translate(${U},${q})` + (h ? " rotate(90)" : "");
    }).attr("text-anchor", "middle") : R.attr("x", (B) => p((B.from + B.to) / 2, D)[0]).attr("y", (B) => p((B.from + B.to) / 2, D)[1]).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em");
  }
  return _.selectAll("line").attr("stroke", fe), _;
}
const Ps = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function Tt(o, t, e) {
  const { title: n, tickValues: s, fontSize: i, highlight: a, dimension: r = "color" } = e, l = e.format ?? ((d) => d), h = e.key ?? ((d) => d), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", f = (d) => Ps.has(p(d)) ? p(d) : "square";
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const u = a != null, w = (d) => u && a.active && !a.isSelected(r, h(d)), _ = (d, L) => a.toggle(r, h(L), { extend: d.shiftKey || d.metaKey }), g = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", u).classed("chart-legend__item--muted", w);
  u && g.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (d) => a.isSelected(r, h(d))).on("click", _).on("keydown", (d, L) => {
    d.key !== "Enter" && d.key !== " " || (d.preventDefault(), _(d, L));
  }), g.append("i").attr("class", (d) => `chart-legend__swatch chart-legend__swatch--${f(d)}`).style("color", (d) => w(d) ? bt : t(d)), g.append("span").text((d) => l(d));
}
let Is = 0;
function Ds(o, t, e) {
  const { title: n, fontSize: s, width: i = 160 } = e;
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  const a = s ?? 12;
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const [r, l] = t.domain(), h = Math.ceil(a * 1.5), p = Math.round(a * 0.67), f = o.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), u = `chart-legend-ramp-${Is += 1}`;
  f.append("linearGradient").attr("id", u).selectAll("stop").data(k.ticks(0, 1, 10)).join("stop").attr("offset", (g) => g).attr("stop-color", (g) => t(r + g * (l - r)));
  const w = f.append("g").attr("transform", `translate(${h},0)`);
  w.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${u})`);
  const _ = k.axisBottom(k.scaleLinear([r, l], [0, i]));
  w.append("g").attr("transform", `translate(0,${p})`).call(Bt(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const Pe = { small: 10, medium: 12, large: 14 };
function Rt(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in Pe)) throw new Error(`Unknown chart font size "${o}"`);
  return Pe[o];
}
function xt(o, t) {
  return t ? o + 16 : 0;
}
const Bs = 0.5, Ns = 0.72, Vs = 5, ks = 8;
function Qt(o) {
  return !!o.title && o.titlePosition === "top";
}
function Gt(o) {
  return o * 1.5 + ks;
}
function ge(o, t, { fontSize: e, color: n }) {
  const s = e * Bs, i = -(e / 2 + ks), a = o.append("g").attr("class", "axis-title axis-title--top"), r = a.append("text").attr("x", s + Vs).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, h = s / 2, p = i - e * Ns, f = a.append("path").attr("d", `M${l},${i}V${p}M${l - h},${p + h}L${l},${p}L${l + h},${p + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (r.attr("fill", n), f.attr("stroke", n)), a;
}
let Kt;
const Fs = 0.55;
function Et(o, t, e, n = 400) {
  if (Kt === void 0 && (Kt = document.createElement("canvas").getContext("2d")), !Kt) return String(o).length * t * Fs;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Kt.font = `${n} ${t}px ${s}`, Kt.measureText(String(o)).width;
}
function mt(o, t, e, n) {
  let s = 0;
  for (const i of o)
    s = Math.max(s, Et(i, t, e, n));
  return s;
}
class Pt {
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
const Ie = 6, xe = 0.85, Gs = "rgba(0,0,0,0.55)", De = "rgba(0,0,0,0.6)", Xs = {
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
class An {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Xs, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Pt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: n, rangePadding: s, border: i } = this.options, a = this.options.orientation === "horizontal", r = this.svg.node(), l = Rt(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: h, bars: p, total: f } = Hs(this.options.data, this.options), { category: u, value: w, group: _, color: g } = h, d = !!_.accessor, L = u.domain, $ = u.format ?? String, y = _.format ?? String, C = (H) => (d ? `${y(H.group)} / ` : "") + $(H.label), D = this.options.barLabel !== "none", R = (H) => he(H.count, f, this.options.barLabel);
    this._tooltipRows = (H) => {
      const ut = he(H.count, f, "percent"), Mt = [
        [j(u, "category"), $(H.label)],
        [j(w, "count"), `${H.count} of ${f} (${ut})`]
      ];
      return d && Mt.unshift([j(_, "group"), y(H.group)]), this.options.tooltip ? this.options.tooltip(H, Mt) : Mt;
    };
    const B = Ot(w.type).domain(w.domain), U = Zt(B, w), q = w.format ?? B.tickFormat(w.ticks ?? void 0), at = new Set(u.tickValues ?? L), et = u.showTicks !== !1, Q = w.showTicks !== !1, F = d && _.showTicks !== !1 ? _.position : null, tt = F === "inline", c = F === "axis", S = ys(p, {
      grouped: d,
      padding: a ? gs : fs,
      groupPadding: n,
      headingLanes: tt
    }), { lanes: M, totalSteps: v } = S, b = d ? _.domain.map(y) : [], [z, I] = [ce(u), ce(w)], [st, J] = a ? [I, z] : [z, I], lt = !!J && Qt(a ? u : w), ct = lt ? 0 : xt(l, J), ht = mt(b, l, r, 600), ot = Math.max(
      et ? mt(L.map($), l, r) : 0,
      tt ? ht : 0
    ), pt = et || tt, gt = F === "outside" ? l + ps : 0, yt = mt(p.map(R), l * xe, r, 600);
    let V, dt, vt = !1, T;
    if (a)
      T = pt ? ot + Vt : 0, V = {
        top: lt ? Gt(l) : l,
        right: yt + Ie + 8 + gt,
        bottom: (Q ? l + 16 : 8) + xt(l, st),
        left: ct + T + (c ? ht + Vt : 0)
      }, dt = V.top + (d ? v : M.length) * e + V.bottom;
    else {
      V = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((D ? l * xe : 0) + 16, lt ? Gt(l) : 0) + gt,
        right: 16,
        bottom: 0,
        // below
        left: ct + (Q ? mt(U.map(q), l, r) + Vt : 0)
      };
      const H = pt ? xs({
        fontSize: l,
        labelWidth: ot,
        totalSteps: v,
        firstFraction: S.firstFraction,
        width: t,
        left: V.left,
        right: V.right
      }) : { tilt: !1, depth: 0, extra: 0, left: V.left };
      vt = H.tilt, T = H.depth, V.bottom = T + (c ? $t + 3 + l : 0) + 15 + xt(l, st), V.left = H.left, dt = this.options.height + H.extra;
    }
    const E = t - V.left - V.right, N = dt - V.top - V.bottom, W = ms(a, E, N), { at: nt, outward: K } = W, { bandwidth: m, spans: A } = S.place(u.range || [0, W.catExtent]), O = B.range(
      w.range || (a ? [s, E - s] : [N - s, s])
    ), G = O(B.domain()[0]), Y = k.scaleOrdinal(g.domain, g.range), rt = (H) => this.highlight.color(Y(H.color), H, { color: H.color });
    this.root.style("max-width", `${t}px`);
    const zt = this.svg.attr("viewBox", `0 0 ${t} ${dt}`).attr(
      "aria-label",
      `Bar chart of ${j(w, "count")} by ${j(u, "category")}` + (d ? ` within ${j(_, "group")}` : "") + `. ${p.map((H) => `${C(H)}: ${H.count}`).join(", ")}`
    );
    zt.selectAll("*").remove();
    const X = zt.append("g").attr("transform", `translate(${V.left},${V.top})`);
    _s(X, W, O, U), Q && ws(X, W, O, { fontSize: l, tickValues: U, format: q }), vs(X, W, i);
    const Jt = F && !tt ? {
      spans: A,
      position: F,
      across: F === "outside" ? a ? E + V.right - l : -V.top + l : W.axisAcross + K * (T + $t + 3)
    } : null;
    bs(X, W, M, {
      fontSize: l,
      ticked: (H) => et && at.has(H.label),
      label: (H, ut) => H.text($(ut.label)),
      heading: y,
      tilt: vt,
      groups: Jt
    });
    const Lt = (H) => {
      const [ut, Mt] = nt(H.pos - m / 2, Math.min(G, O(H.count))), [me, It] = nt(m, Math.abs(O(H.count) - G));
      return { x: ut, y: Mt, w: me, h: It };
    }, Xt = X.append("g").selectAll("g").data(p).join("g");
    if (Xt.append("rect").attr("rx", 3).attr("fill", rt).attr("x", (H) => Lt(H).x).attr("y", (H) => Lt(H).y).attr("width", (H) => Lt(H).w).attr("height", (H) => Lt(H).h).on("mouseenter", (H, ut) => this._setHovered(ut, H)).on("mousemove", (H) => this.tooltip.move(H)).on("mouseleave", () => this._setHovered(null)), D) {
      const H = (ut) => nt(ut.pos, O(ut.count) - K * Ie);
      Xt.append("text").attr("x", (ut) => H(ut)[0]).attr("y", (ut) => H(ut)[1]).attr("dy", a ? "0.35em" : null).attr("text-anchor", a ? "start" : "middle").attr("font-size", l * xe).attr("font-weight", 600).attr("fill", Gs).text(R);
    }
    const Ut = (H) => zt.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", De).text(H || "");
    Ut(st).attr("x", V.left + E / 2).attr("y", dt - l), lt ? ge(X, J, { fontSize: l, color: De }) : Ut(J).attr(
      "transform",
      `translate(${l + 2},${V.top + N / 2}) rotate(-90)`
    ), Tt(this.legend, Y, {
      ...g,
      title: hs(g),
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
}, qs = {
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
function $n(o, t, e, { sort: n } = {}) {
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
function Ws(o = [], t = {}) {
  const e = t.axis ?? {}, n = Z(Us, e.y), s = Z(qs, e.x), i = Z(js, e.color), a = k.rollup(
    o,
    (h) => k.sum(h, s.accessor),
    n.accessor,
    i.accessor
  );
  n.domain = ft(n.domain, a.keys()), n.tickValues = Te(n), i.domain = ft(i.domain, o.map(i.accessor));
  const r = n.domain.map((h) => {
    const p = a.get(h);
    let f = 0;
    const u = [];
    for (const w of i.domain) {
      const _ = (p == null ? void 0 : p.get(w)) ?? 0;
      _ > 0 && u.push({ key: w, count: _, start: f, end: f += _ });
    }
    return { label: h, count: f, segments: u };
  });
  s.domain ?? (s.domain = de(s.type, [0, k.max(r, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = _t(i.domain.length));
  const l = t.total ?? k.sum(r, (h) => h.count);
  return { axes: { category: n, value: s, color: i }, bars: r, total: l };
}
const Ks = 12, Be = 6, Ne = 0.85, Ys = "rgba(0,0,0,0.55)", Zs = {
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
class Tn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Zs, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Pt(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = Rt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: r } = Ws(this.options.data, this.options), { category: l, value: h, color: p } = i, f = l.domain, u = l.format ?? String, w = p.format ?? String, _ = (v) => he(v.count, r, this.options.barLabel);
    this._tooltipRows = (v) => {
      const b = [
        [j(l, "category"), u(v.label)],
        [j(p, "group"), w(v.key)],
        [j(h, "count"), `${v.count} of ${v.barCount}`],
        ["Share of total", he(v.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(v, b) : b;
    };
    const g = Qt(l), d = mt(f.map(u), s, n), L = {
      top: g ? Gt(s) : s,
      right: mt(a.map(_), s * Ne, n, 600) + Be + 8,
      bottom: s + 16 + xt(s, h.title),
      left: (g ? 0 : xt(s, l.title)) + d + Ks
    }, $ = t - L.left - L.right, y = f.length * e, C = L.top + y + L.bottom, D = k.scaleBand().domain(f).range(l.range || [0, y]).padding(0.3), R = Ot(h.type).domain(h.domain).range(h.range || [0, $]), B = k.scaleOrdinal(p.domain, p.range), U = (v) => this.highlight.color(B(v.key), v, { color: v.key }), q = Zt(R, h), at = h.format ?? R.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const et = a.map((v) => {
      const b = v.segments.map((z) => `${w(z.key)} ${z.count}`).join(", ");
      return `${u(v.label)}: ${v.count} (${b})`;
    }).join("; "), Q = this.svg.attr("viewBox", `0 0 ${t} ${C}`).attr(
      "aria-label",
      `Stacked bar chart of ${j(h, "count")} by ${j(l, "category")}, split by ${j(p, "group")}. ${et}`
    );
    Q.selectAll("*").remove();
    const F = Q.append("g").attr("transform", `translate(${L.left},${L.top})`), tt = F.append("g").call(
      k.axisLeft(D).tickValues(l.tickValues ?? f).tickFormat(u).tickSizeOuter(0)
    ), c = F.append("g").attr("transform", `translate(0,${y})`).call(k.axisBottom(R).tickValues(q).tickFormat(at).tickSizeOuter(0));
    for (const v of [tt, c])
      v.attr("font-family", null).attr("font-size", s), v.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), v.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    F.insert("g", ":first-child").selectAll("line").data(q).join("line").attr("y2", y).attr("x1", (v) => R(v)).attr("x2", (v) => R(v)).attr("stroke", "rgba(0,0,0,0.08)");
    const S = F.append("g").selectAll("g").data(a).join("g");
    S.selectAll("rect").data((v) => v.segments.map((b) => ({ ...b, label: v.label, barCount: v.count }))).join("rect").attr("x", (v) => R(v.start)).attr("y", (v) => D(v.label)).attr("width", (v) => Math.max(0, R(v.end) - R(v.start))).attr("height", D.bandwidth()).attr("fill", U).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (v, b) => this._setHovered(b, v)).on("mousemove", (v) => this.tooltip.move(v)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && S.append("text").attr("x", (v) => R(v.count) + Be).attr("y", (v) => D(v.label) + D.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ne).attr("font-weight", 600).attr("fill", Ys).text(_);
    const M = (v) => Q.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(v || "");
    M(h.title).attr("x", L.left + $ / 2).attr("y", C - s), g ? ge(F, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : M(l.title).attr(
      "transform",
      `translate(${s + 2},${L.top + y / 2}) rotate(-90)`
    ), Tt(this.legend, B, { ...p, fontSize: s, highlight: this.highlight });
  }
}
const ze = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), Ls = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: ze
}, Qs = { ...Ls, field: "y" }, Js = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: ze
}, to = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: ze
}, eo = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function so(o = [{}], t = []) {
  const e = o.map((s, i) => ({
    ...eo,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function oo(o = [], t = {}) {
  const e = t.axis ?? {}, n = Z(Ls, e.x), s = Z(Qs, e.y), i = Z(Js, e.color), a = Z(to, e.radius), r = so(t.layers, o), l = r.flatMap((h) => h.data);
  for (const h of [n, s]) h.domain ?? (h.domain = de(h.type, Nt(l.map(h.accessor))));
  if (i.accessor) {
    const h = r.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = Nt(h)), i.range ?? (i.range = k.interpolateViridis)) : (i.domain = ft(i.domain, h), i.range ?? (i.range = _t(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Nt(l.map(a.accessor)))), { axes: { x: n, y: s, color: i, radius: a }, layers: r };
}
const no = {
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
}, io = 0.92;
function _e(o, t, e) {
  return Ot(o.type).domain(t).range(o.range ?? e);
}
function ao(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : _t(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function ro(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Ot(o.type).domain(o.domain).range(o.range);
}
class zn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...no }, this.axes = null, this.layers = [], this.highlight = new Ht(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = Rt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = oo(this.options.data, this.options);
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
    const t = this.fontSize, { x: e, y: n } = this.axes, s = Qt(n), i = { ...this.options.margin };
    if (i.top ?? (i.top = s ? Gt(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + xt(t, e.title)), i.left == null) {
      const a = _e(n, this._viewDomain.y, [0, 1]), r = Zt(a, n).map(n.format), l = mt(r, t * io, this.container);
      i.left = (s ? 0 : xt(t, n.title)) + l + 8;
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
      x: _e(n, r.x, [l, t - l]),
      y: _e(s, r.y, [e - l, l]),
      color: ao(i),
      radius: ro(a)
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
      Bt(k.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      Bt(k.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      Bt(k.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(Bt(k.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), Qt(i) ? ge(this.titleY, i.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + r + 2).text(i.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(n) {
      e._drawLayer(k.select(this), n, t);
    });
  }
  _drawLayer(t, e, n) {
    const s = e.key ?? this.options.key, i = e.mark === "outline" ? "stroke" : "fill", a = (u) => this._px(u), r = (u) => this._py(u), l = (u) => this._pr(u), { highlight: h } = this, p = (u) => h.color(this._pcolor(u, e), u, this._keys(u, e)), f = t.selectAll("circle").data(e.data, s);
    f.exit().remove(), f.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", a).attr("cy", r).attr("r", l).attr(i, p), (n ? f.transition(n) : f).attr("cx", a).attr("cy", r).attr("r", l).attr(i, p), h.active && t.selectAll("circle").filter((u) => h.includes(u, this._keys(u, e))).raise();
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
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(Bt(k.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return Tt(this.legend, e, {
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
    return Tt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const n = Zt(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(n).join("span").attr("class", "scatter-plot__legend-item"), i = Math.max(...n.map(e));
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
      i === "color" && e.color || a.accessor && n.push([j(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const lo = { ...as, context: null }, co = { ...rs, field: "value" };
function ho(o) {
  const t = [...o].sort(k.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = k.quantile(t, 0.25), n = k.quantile(t, 0.5), s = k.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), r = Math.min(a.length ? a[0] : t[0], e), l = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: r, max: l, mean: k.mean(t) };
}
function uo(o, t) {
  const e = [], n = [];
  for (const s of o) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function po(o = [], t = {}) {
  const e = t.axis ?? {}, n = us(e, t.orientation !== "vertical"), s = Z(lo, n.category), i = Z(co, n.value), a = Z(ls, e.group), r = Z(cs, e.color), l = ds(s.context), h = (f, u, w) => {
    const { records: _, values: g } = uo(w, i.accessor), d = ho(g), L = w[0];
    return {
      group: f,
      label: u,
      context: l && L ? l(L) ?? null : null,
      count: g.length,
      records: _,
      values: g,
      stats: d,
      outliers: g.map(($, y) => y).filter(($) => g[$] < d.min || g[$] > d.max),
      color: r.accessor && L ? r.accessor(L) ?? null : null
    };
  };
  let p;
  if (a.accessor) {
    const f = k.group(o, a.accessor, s.accessor);
    a.domain = ft(a.domain, f.keys()), p = a.domain.flatMap((u) => {
      const w = f.get(u) ?? /* @__PURE__ */ new Map();
      return ft(s.domain, w.keys()).filter((g) => w.has(g)).map((g) => h(u, g, w.get(g)));
    });
  } else {
    const f = k.group(o, s.accessor);
    p = ft(s.domain, f.keys()).map(
      (u) => h(null, u, f.get(u) ?? [])
    );
  }
  if (s.domain = [...new Set(p.map((f) => f.label))], s.tickValues = Te(s), i.domain ?? (i.domain = de(i.type, Nt(p.flatMap((f) => f.values)))), r.accessor) {
    const f = p.map((u) => u.color).filter((u) => u != null);
    r.domain = ft(r.domain, f), r.range ?? (r.range = _t(r.domain.length));
  }
  return { axes: { category: s, value: i, group: a, color: r }, boxes: p };
}
const Ve = "rgba(0,0,0,0.45)", ve = "rgba(0,0,0,0.6)", fo = {
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
}, go = 0.35, mo = 0.55, yo = "rgba(0,0,0,0.87)", we = 2, se = 2.5, Fe = 0.45, xo = 0.9;
function _o(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class Cn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...fo, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = k.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const n = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = n.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = n.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Pt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: n, points: s, showCounts: i, threshold: a, rangePadding: r, border: l } = this.options, h = this.options.orientation !== "vertical", p = this.svg.node(), f = Rt(this.options.fontSize);
    this.tooltip.fontSize(f), this._leave();
    const { axes: u, boxes: w } = po(this.options.data, this.options), { category: _, value: g, group: d, color: L } = u, $ = !!d.accessor, y = _.format ?? String, C = d.format ?? String, D = g.format ?? k.format(".3~f"), R = (x) => x.context != null ? `${x.context} / ` : "", B = (x) => i ? ` (n=${x.count})` : "", U = (x) => R(x) + y(x.label) + B(x), q = (x) => ($ ? `${C(x.group)} / ` : "") + U(x), at = new Set(_.tickValues ?? _.domain), et = Ot(g.type).domain(g.domain), Q = Zt(et, g), F = g.format ?? et.tickFormat(g.ticks ?? void 0), tt = (a == null ? void 0 : a.value) != null && a.value >= Math.min(...g.domain) && a.value <= Math.max(...g.domain), c = tt && a.label ? a.label : null, S = _.showTicks !== !1, M = g.showTicks !== !1, v = $ && d.showTicks !== !1 ? d.position : null, b = v === "inline", z = v === "axis", I = ys(w, {
      grouped: $,
      padding: h ? gs : fs,
      groupPadding: n,
      headingLanes: b
    }), { lanes: st, totalSteps: J } = I, lt = $ ? d.domain.map(C) : [], [ct, ht] = [ce(_), ce(g)], [ot, pt] = h ? [ht, ct] : [ct, ht], gt = !!pt && Qt(h ? _ : g), yt = gt ? 0 : xt(f, pt), V = mt(lt, f, p, 600), dt = Math.max(
      S ? mt(w.map(U), f, p) : 0,
      b ? V : 0
    ), vt = S || b, T = v === "outside" ? f + ps : 0;
    let E, N, W = !1, nt;
    if (h)
      nt = vt ? dt + Vt : 0, E = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(c ? 2 * f + 8 : f, gt ? Gt(f) : 0),
        right: 16 + T,
        bottom: (M ? f + 16 : 8) + xt(f, ot),
        left: yt + nt + (z ? V + Vt : 0)
      }, N = E.top + ($ ? J : st.length) * e + E.bottom;
    else {
      E = {
        top: Math.max(f, gt ? Gt(f) : 0) + T,
        // The threshold label to the right of the plot
        right: 16 + (c ? mt([c], f, p) + 6 : 0),
        bottom: 0,
        // below
        left: yt + (M ? mt(Q.map(F), f, p) + Vt : 0)
      };
      const x = vt ? xs({
        fontSize: f,
        labelWidth: dt,
        totalSteps: J,
        firstFraction: I.firstFraction,
        width: t,
        left: E.left,
        right: E.right
      }) : { tilt: !1, depth: 0, extra: 0, left: E.left };
      W = x.tilt, nt = x.depth, E.bottom = nt + (z ? $t + 3 + f : 0) + 15 + xt(f, ot), E.left = x.left, N = this.options.height + x.extra;
    }
    const K = t - E.left - E.right, m = N - E.top - E.bottom, A = ms(h, K, m), { at: O, catExtent: G, outward: Y } = A, { bandwidth: rt, spans: zt } = I.place(_.range || [0, G]), X = et.range(
      g.range || (h ? [r, K - r] : [m - r, r])
    ), Jt = pe(L), { highlight: Lt } = this, Xt = (x, P) => Lt.includes(x.records[P], { color: x.color }, x), Ut = new Map(
      w.map((x) => [x, !Lt.active || x.records.some((P, it) => Xt(x, it))])
    ), H = (x) => Jt(x.color), ut = (x) => Ut.get(x) ? H(x) : bt, Mt = (x) => Ut.get(x) ? L.accessor ? yo : H(x) : bt, me = L.accessor ? mo : go, It = w.filter((x) => x.count), Ee = (x, P, it) => {
      const [St, At] = O(it, X(x.values[P]));
      return { box: x, index: P, record: x.records[P], value: x.values[P], x: St, y: At, lit: Xt(x, P) };
    }, qt = It.flatMap(
      (x) => s ? x.values.map((P, it) => Ee(x, it, x.pos + _o(it) * rt / 2)) : x.outliers.map((P) => Ee(x, P, x.pos))
    ), As = k.group(qt, (x) => x.box), Oe = (x) => x.lit ? H(x.box) : bt;
    this.root.style("max-width", `${t}px`);
    const $s = It.map((x) => `${q(x)}: median ${D(x.stats.median)}`).join("; "), ye = this.svg.attr("viewBox", `0 0 ${t} ${N}`).attr(
      "aria-label",
      `Box plot of ${j(g, "value")} by ${j(_, "category")}` + ($ ? ` within ${j(d, "group")}` : "") + `. ${$s}`
    );
    ye.selectAll("*").remove();
    const wt = ye.append("g").attr("transform", `translate(${E.left},${E.top})`);
    _s(wt, A, X, Q), M && ws(wt, A, X, { fontSize: f, tickValues: Q, format: F }), vs(wt, A, l);
    const Ts = v && !b ? {
      spans: zt,
      position: v,
      across: v === "outside" ? h ? K + E.right - f : -E.top + f : A.axisAcross + Y * (nt + $t + 3)
    } : null;
    if (bs(wt, A, st, {
      fontSize: f,
      ticked: (x) => S && at.has(x.label),
      // A box's label in pieces, so the context and count are lighter
      label: (x, P) => {
        P.context != null && x.append("tspan").attr("fill", Ve).text(R(P)), x.append("tspan").text(y(P.label)), i && x.append("tspan").attr("fill", Ve).text(B(P));
      },
      heading: C,
      tilt: W,
      groups: Ts
    }), tt) {
      const x = X(a.value), [P, it] = O(0, x), [St, At] = O(G, x);
      if (wt.append("line").attr("x1", P).attr("y1", it).attr("x2", St).attr("y2", At).attr("stroke", fe).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), c) {
        const [jt, Wt] = O(h ? -6 : G + 6, x);
        wt.append("text").attr("x", jt).attr("y", Wt).attr("text-anchor", h ? "middle" : "start").attr("dy", h ? null : "0.32em").attr("font-size", f).attr("fill", ve).text(c);
      }
    }
    const Dt = wt.append("g").selectAll("g").data(It).join("g").attr("stroke", ut).attr("fill", ut);
    this.drawPoints(s ? qt : [], {
      width: t,
      height: N,
      offset: [E.left, E.top],
      color: Oe,
      emphasis: Lt.active
    }), Ft(
      Dt.append("line"),
      (x) => O(x.pos, X(x.stats.min)),
      (x) => O(x.pos, X(x.stats.max))
    ), Ft(
      Dt.selectAll(".cap").data((x) => [x.stats.min, x.stats.max].map((P) => ({ pos: x.pos, v: P }))).join("line").attr("class", "cap"),
      (x) => O(x.pos - rt / 4, X(x.v)),
      (x) => O(x.pos + rt / 4, X(x.v))
    );
    const te = (x) => {
      const P = X(x.stats.q1), it = X(x.stats.q3), [St, At] = O(x.pos - rt / 2, Math.min(P, it)), [jt, Wt] = O(rt, Math.max(1, Math.abs(it - P)));
      return { x: St, y: At, w: jt, h: Wt };
    };
    Dt.append("rect").attr("x", (x) => te(x).x).attr("y", (x) => te(x).y).attr("width", (x) => te(x).w).attr("height", (x) => te(x).h).attr("fill-opacity", me), Ft(
      Dt.append("line"),
      (x) => O(x.pos - rt / 2, X(x.stats.median)),
      (x) => O(x.pos + rt / 2, X(x.stats.median))
    ).attr("stroke", Mt).attr("stroke-width", 2), Dt.append("circle").attr("cx", (x) => O(x.pos, X(x.stats.mean))[0]).attr("cy", (x) => O(x.pos, X(x.stats.mean))[1]).attr("r", 3).attr("fill", Mt), s || Dt.selectAll(".outlier").data((x) => As.get(x) ?? []).join("circle").attr("class", "outlier").attr("cx", (x) => x.x).attr("cy", (x) => x.y).attr("r", se).attr("fill", "#fff").attr("stroke", Oe), this.hoverRing = wt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? we : se) + 2.5).style("display", "none");
    const He = (x) => ye.append("text").attr("text-anchor", "middle").attr("font-size", f).attr("font-weight", 600).attr("fill", ve).text(x || "");
    He(ot).attr("x", E.left + K / 2).attr("y", N - f), gt ? ge(wt, pt, { fontSize: f, color: ve }) : He(pt).attr(
      "transform",
      `translate(${f + 2},${E.top + m / 2}) rotate(-90)`
    ), Tt(this.legend, Jt, {
      ...L,
      title: L.accessor ? hs(L) : null,
      fontSize: f,
      highlight: this.highlight
    });
    const { tooltip: ee } = this.options, Re = j(_, "category"), zs = (x) => {
      const [P, it] = [X(x.stats.min), X(x.stats.max)];
      return [Math.min(P, it) - se, Math.max(P, it) + se];
    };
    this.hit = {
      margin: E,
      marks: qt,
      delaunay: qt.length ? k.Delaunay.from(
        qt,
        (x) => x.x,
        (x) => x.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (x, P) => {
        const [it, St] = O(x, P);
        return It.find((At) => {
          const [jt, Wt] = zs(At);
          return Math.abs(it - At.pos) <= rt / 2 && St >= jt && St <= Wt;
        }) ?? null;
      },
      markRows: (x) => {
        const P = [
          [Re, q(x.box)],
          [j(g, "value"), D(x.value)]
        ];
        return ee ? ee(x.record, P, x.box) : P;
      },
      boxRows: (x) => {
        const P = x.stats, it = [
          [Re, q(x)],
          ["n", String(x.count)],
          ["Median", D(P.median)],
          ["Mean", D(P.mean)],
          ["Q1", D(P.q1)],
          ["Q3", D(P.q3)],
          ["Whiskers", `${D(P.min)} to ${D(P.max)}`]
        ];
        return ee ? ee(null, it, x) : it;
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
    var w, _;
    this.canvas.style("display", t.length ? null : "none");
    const l = (_ = (w = this.canvas.node()).getContext) == null ? void 0 : _.call(w, "2d");
    if (!l) return;
    const h = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * h)).attr("height", Math.round(n * h)), l.setTransform(h, 0, 0, h, 0, 0), l.clearRect(0, 0, e, n);
    const p = (g, d, L) => {
      l.globalAlpha = L, l.fillStyle = g, l.beginPath();
      for (const $ of d) {
        const y = $.x + s, C = $.y + i;
        l.moveTo(y + we, C), l.arc(y, C, we, 0, 2 * Math.PI);
      }
      l.fill();
    }, f = k.group(t, a), u = f.get(bt);
    u && p(bt, u, Fe);
    for (const [g, d] of f)
      g !== bt && p(g, d, r ? xo : Fe);
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
const vo = { field: null, title: null, format: null }, wo = {
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
function kt(o) {
  return o != null && o !== "" && !(typeof o == "number" && Number.isNaN(o));
}
function ko(o = [], t = {}) {
  var f;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((u) => Z(vo, u)), s = Z(wo, e.color), i = Z(bo, e.radius), a = s.accessor ?? i.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const u of o) {
    const w = [];
    for (const L of n) {
      const $ = (f = L.accessor) == null ? void 0 : f.call(L, u);
      if (!kt($)) break;
      w.push($);
    }
    if (!w.length) continue;
    let _ = r;
    w.forEach((L, $) => {
      const y = JSON.stringify(w.slice(0, $ + 1));
      let C = l.get(y);
      C || (C = { key: y, label: L, level: $, record: null, children: [] }, l.set(y, C), _.children.push(C)), _ = C;
    });
    const g = _, d = a && !kt(a(g.record ?? {})) && kt(a(u));
    (!g.record || d) && (g.record = u);
  }
  const h = [...l.values()].filter((u) => u !== r);
  for (const u of h)
    u.value = u.record && a ? a(u.record) : null, u.empty = !u.record || a != null && !kt(u.value), u.colorValue = !u.empty && s.accessor ? s.accessor(u.record) : null, u.radiusValue = !u.empty && i.accessor ? i.accessor(u.record) : null;
  const p = h.filter((u) => !u.empty);
  if (s.accessor) {
    const u = p.map((w) => w.colorValue).filter(kt);
    s.type === "sequential" ? (s.domain ?? (s.domain = Nt(u)), s.range ?? (s.range = k.interpolateViridis)) : (s.domain = ft(s.domain, u), s.range ?? (s.range = _t(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Nt(p.map((u) => u.radiusValue).filter(kt)))), { axes: { color: s, radius: i }, levels: n, root: r, nodes: h };
}
const Ge = 12, Xe = 2, Lo = 1.5, Mo = 2.9, So = 7, be = 1.1, Ue = 4, Yt = 2, Ao = 3.3, $o = 0.92, To = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), zo = { color: "#b4b2aa", radius: 6, label: null }, Co = {
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
function Eo(o, t, e, n) {
  const s = String(o ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const r of s) {
    const l = a ? `${a} ${r}` : r;
    a && Et(l, e, n) > t ? (i.push(a), a = r) : a = l;
  }
  return a && i.push(a), i;
}
function Oo(o) {
  const { l: t } = k.lab(o);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class En {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...Co, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
    var K;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...zo, ...this.options.empty }, i = Rt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const r = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: l, levels: h, root: p } = ko(this.options.data, this.options);
    this.axes = l;
    const f = pe(l.color), u = Es(l.radius), w = l.color.accessor ? l.color : l.radius, _ = w.format ?? To, g = (m) => {
      const A = h[m.level];
      return A != null && A.format ? A.format(m.label) : m.label;
    };
    this._tooltipRows = (m) => {
      const A = [[j(h[m.level], `Level ${m.level + 1}`), g(m)]];
      return kt(m.value) && A.push([j(w, "value"), _(m.value)]), this.options.tooltip ? this.options.tooltip(m, A) : A;
    };
    const d = (m) => m.empty ? s.color : l.color.accessor ? f(m.colorValue) : f(), L = (m) => m.empty || l.radius.accessor && l.radius.type !== "constant" && !kt(m.radiusValue) ? s.radius : u(m.radiusValue), $ = (m) => this.highlight.color(d(m.data), m.data, { color: m.data.colorValue }), y = k.hierarchy(p), C = y.descendants().filter((m) => m.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      f,
      i,
      s,
      C.some((m) => m.data.empty)
    ), !C.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const D = be * i, R = /* @__PURE__ */ new Map();
    for (const m of C) {
      const A = h[m.depth - 1], O = A != null && A.format ? A.format(m.data.label) : m.data.label, G = Eo(O, So * i, i, r), Y = Math.max(0, ...G.map((rt) => Et(rt, i, r)));
      R.set(m, { lines: G, width: Y, height: G.length * D });
    }
    const B = (m) => L(m.data), U = (m) => Math.max(B(m), R.get(m).height / 2), q = (m) => B(m) + Ue + R.get(m).width + Yt, at = y.height || 1, et = C.filter((m) => !m.children && m.depth === at), Q = Math.ceil(Math.max(0, ...et.map(q))), F = Math.max(0, ...C.filter((m) => m.depth === 1 && m.children).map(q));
    let tt = Ge, c = t;
    for (let m = 0; m < 3; m += 1)
      c = Math.max(1, Math.min(t, (a - tt - Q) / at)), tt = Math.max(Ge, Math.ceil(F - c));
    const S = Math.round(Mo * i);
    k.tree().nodeSize([1, c]).separation((m, A) => {
      const O = U(m) + U(A) + Xe;
      return m.parent === A.parent ? O : O * Lo;
    })(y);
    let M = 1 / 0, v = -1 / 0, b = 0;
    for (const m of C)
      M = Math.min(M, m.x), v = Math.max(v, m.x), b = Math.max(b, U(m));
    const z = v - M, I = b + Xe, st = S + z + I * 2, J = Math.max(this.options.height, Math.ceil(st)), lt = J - S, ct = z > 0 ? (lt - I * 2) / z : 1, ht = S + (lt - z * ct) / 2, ot = (m) => (m.x - M) * ct, pt = (m) => m.depth === 0 ? c - Ao * i : m.y, gt = this.svg.attr("width", a).attr("height", J).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((m, A) => j(m, `level ${A + 1}`)).join(", then ")}: ${C.length} nodes`
    ), yt = gt.append("g").attr("transform", `translate(${tt},${ht})`), V = /* @__PURE__ */ new Map();
    for (const m of C)
      V.has(m.depth) || V.set(m.depth, ((K = h[m.depth - 1]) == null ? void 0 : K.title) ?? "");
    gt.append("g").selectAll("text").data([...V]).join("text").attr("class", "tree-chart__header").attr("x", ([m]) => tt + m * c).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, m]) => m);
    const dt = y.children.length > 1, vt = yt.append("g").selectAll("path").data(y.links().filter((m) => dt || m.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", k.linkHorizontal().x(pt).y(ot)), T = yt.append("g").selectAll("g").data(C).join("g").attr("class", "tree-chart__node").attr("transform", (m) => `translate(${m.y},${ot(m)})`);
    T.append("circle").attr("class", "tree-chart__circle").attr("r", B).attr("fill", $), n && T.filter((m) => kt(m.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * $o).attr("fill", (m) => Oo($(m))).text((m) => _(m.data.value));
    const E = (m) => !!m.children, N = (m) => (E(m) ? -1 : 1) * (B(m) + Ue), W = T.filter((m) => R.get(m).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (m) => m.data.empty);
    W.append("rect").attr("class", "tree-chart__label-bg").attr("x", (m) => {
      const { width: A } = R.get(m);
      return (E(m) ? N(m) - A : N(m)) - Yt;
    }).attr("y", (m) => -R.get(m).height / 2 - Yt).attr("width", (m) => R.get(m).width + Yt * 2).attr("height", (m) => R.get(m).height + Yt * 2), W.append("text").attr("text-anchor", (m) => E(m) ? "end" : "start").selectAll("tspan").data((m) => {
      const { lines: A } = R.get(m);
      return A.map((O, G) => ({ line: O, i: G, count: A.length, x: N(m) }));
    }).join("tspan").attr("x", (m) => m.x).attr(
      "dy",
      (m) => m.i === 0 ? `${0.31 - (m.count - 1) * be / 2}em` : `${be}em`
    ).text((m) => m.line);
    const nt = (m) => {
      if (!e) return;
      const A = m && /* @__PURE__ */ new Set([...m.ancestors(), ...m.descendants()]), O = (Y) => !!(A && A.has(Y)), G = (Y) => O(Y.source) && O(Y.target);
      T.classed("tree-chart__node--off-path", (Y) => !!A && !O(Y)), vt.classed("tree-chart__link--on-path", G).classed("tree-chart__link--off-path", (Y) => !!A && !G(Y));
    };
    T.on("mouseenter", (m, A) => {
      nt(A), this._setHovered(A.data, m);
    }).on("mousemove", (m) => this.tooltip.move(m)).on("mouseleave", () => {
      nt(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Ds(this.legend, t, a) : Tt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), r.append("span").text(n.label);
  }
}
function qe(o, t) {
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
function Ho(o, t) {
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
function ke(o, t) {
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
function Ro(o, t) {
  return o.sourceLinks.length ? o.depth : t - 1;
}
function oe(o) {
  return function() {
    return o;
  };
}
function je(o, t) {
  return ue(o.source, t.source) || o.index - t.index;
}
function We(o, t) {
  return ue(o.target, t.target) || o.index - t.index;
}
function ue(o, t) {
  return o.y0 - t.y0;
}
function Le(o) {
  return o.value;
}
function Po(o) {
  return o.index;
}
function Io(o) {
  return o.nodes;
}
function Do(o) {
  return o.links;
}
function Ke(o, t) {
  const e = o.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function Ye({ nodes: o }) {
  for (const t of o) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function Bo() {
  let o = 0, t = 0, e = 1, n = 1, s = 24, i = 8, a, r = Po, l = Ro, h, p, f = Io, u = Do, w = 6;
  function _() {
    const c = { nodes: f.apply(null, arguments), links: u.apply(null, arguments) };
    return g(c), d(c), L(c), $(c), D(c), Ye(c), c;
  }
  _.update = function(c) {
    return Ye(c), c;
  }, _.nodeId = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : oe(c), _) : r;
  }, _.nodeAlign = function(c) {
    return arguments.length ? (l = typeof c == "function" ? c : oe(c), _) : l;
  }, _.nodeSort = function(c) {
    return arguments.length ? (h = c, _) : h;
  }, _.nodeWidth = function(c) {
    return arguments.length ? (s = +c, _) : s;
  }, _.nodePadding = function(c) {
    return arguments.length ? (i = a = +c, _) : i;
  }, _.nodes = function(c) {
    return arguments.length ? (f = typeof c == "function" ? c : oe(c), _) : f;
  }, _.links = function(c) {
    return arguments.length ? (u = typeof c == "function" ? c : oe(c), _) : u;
  }, _.linkSort = function(c) {
    return arguments.length ? (p = c, _) : p;
  }, _.size = function(c) {
    return arguments.length ? (o = t = 0, e = +c[0], n = +c[1], _) : [e - o, n - t];
  }, _.extent = function(c) {
    return arguments.length ? (o = +c[0][0], e = +c[1][0], t = +c[0][1], n = +c[1][1], _) : [[o, t], [e, n]];
  }, _.iterations = function(c) {
    return arguments.length ? (w = +c, _) : w;
  };
  function g({ nodes: c, links: S }) {
    for (const [v, b] of c.entries())
      b.index = v, b.sourceLinks = [], b.targetLinks = [];
    const M = new Map(c.map((v, b) => [r(v, b, c), v]));
    for (const [v, b] of S.entries()) {
      b.index = v;
      let { source: z, target: I } = b;
      typeof z != "object" && (z = b.source = Ke(M, z)), typeof I != "object" && (I = b.target = Ke(M, I)), z.sourceLinks.push(b), I.targetLinks.push(b);
    }
    if (p != null)
      for (const { sourceLinks: v, targetLinks: b } of c)
        v.sort(p), b.sort(p);
  }
  function d({ nodes: c }) {
    for (const S of c)
      S.value = S.fixedValue === void 0 ? Math.max(ke(S.sourceLinks, Le), ke(S.targetLinks, Le)) : S.fixedValue;
  }
  function L({ nodes: c }) {
    const S = c.length;
    let M = new Set(c), v = /* @__PURE__ */ new Set(), b = 0;
    for (; M.size; ) {
      for (const z of M) {
        z.depth = b;
        for (const { target: I } of z.sourceLinks)
          v.add(I);
      }
      if (++b > S) throw new Error("circular link");
      M = v, v = /* @__PURE__ */ new Set();
    }
  }
  function $({ nodes: c }) {
    const S = c.length;
    let M = new Set(c), v = /* @__PURE__ */ new Set(), b = 0;
    for (; M.size; ) {
      for (const z of M) {
        z.height = b;
        for (const { source: I } of z.targetLinks)
          v.add(I);
      }
      if (++b > S) throw new Error("circular link");
      M = v, v = /* @__PURE__ */ new Set();
    }
  }
  function y({ nodes: c }) {
    const S = qe(c, (b) => b.depth) + 1, M = (e - o - s) / (S - 1), v = new Array(S);
    for (const b of c) {
      const z = Math.max(0, Math.min(S - 1, Math.floor(l.call(null, b, S))));
      b.layer = z, b.x0 = o + z * M, b.x1 = b.x0 + s, v[z] ? v[z].push(b) : v[z] = [b];
    }
    if (h) for (const b of v)
      b.sort(h);
    return v;
  }
  function C(c) {
    const S = Ho(c, (M) => (n - t - (M.length - 1) * a) / ke(M, Le));
    for (const M of c) {
      let v = t;
      for (const b of M) {
        b.y0 = v, b.y1 = v + b.value * S, v = b.y1 + a;
        for (const z of b.sourceLinks)
          z.width = z.value * S;
      }
      v = (n - v + a) / (M.length + 1);
      for (let b = 0; b < M.length; ++b) {
        const z = M[b];
        z.y0 += v * (b + 1), z.y1 += v * (b + 1);
      }
      Q(M);
    }
  }
  function D(c) {
    const S = y(c);
    a = Math.min(i, (n - t) / (qe(S, (M) => M.length) - 1)), C(S);
    for (let M = 0; M < w; ++M) {
      const v = Math.pow(0.99, M), b = Math.max(1 - v, (M + 1) / w);
      B(S, v, b), R(S, v, b);
    }
  }
  function R(c, S, M) {
    for (let v = 1, b = c.length; v < b; ++v) {
      const z = c[v];
      for (const I of z) {
        let st = 0, J = 0;
        for (const { source: ct, value: ht } of I.targetLinks) {
          let ot = ht * (I.layer - ct.layer);
          st += F(ct, I) * ot, J += ot;
        }
        if (!(J > 0)) continue;
        let lt = (st / J - I.y0) * S;
        I.y0 += lt, I.y1 += lt, et(I);
      }
      h === void 0 && z.sort(ue), U(z, M);
    }
  }
  function B(c, S, M) {
    for (let v = c.length, b = v - 2; b >= 0; --b) {
      const z = c[b];
      for (const I of z) {
        let st = 0, J = 0;
        for (const { target: ct, value: ht } of I.sourceLinks) {
          let ot = ht * (ct.layer - I.layer);
          st += tt(I, ct) * ot, J += ot;
        }
        if (!(J > 0)) continue;
        let lt = (st / J - I.y0) * S;
        I.y0 += lt, I.y1 += lt, et(I);
      }
      h === void 0 && z.sort(ue), U(z, M);
    }
  }
  function U(c, S) {
    const M = c.length >> 1, v = c[M];
    at(c, v.y0 - a, M - 1, S), q(c, v.y1 + a, M + 1, S), at(c, n, c.length - 1, S), q(c, t, 0, S);
  }
  function q(c, S, M, v) {
    for (; M < c.length; ++M) {
      const b = c[M], z = (S - b.y0) * v;
      z > 1e-6 && (b.y0 += z, b.y1 += z), S = b.y1 + a;
    }
  }
  function at(c, S, M, v) {
    for (; M >= 0; --M) {
      const b = c[M], z = (b.y1 - S) * v;
      z > 1e-6 && (b.y0 -= z, b.y1 -= z), S = b.y0 - a;
    }
  }
  function et({ sourceLinks: c, targetLinks: S }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: M } } of S)
        M.sort(We);
      for (const { target: { targetLinks: M } } of c)
        M.sort(je);
    }
  }
  function Q(c) {
    if (p === void 0)
      for (const { sourceLinks: S, targetLinks: M } of c)
        S.sort(We), M.sort(je);
  }
  function F(c, S) {
    let M = c.y0 - (c.sourceLinks.length - 1) * a / 2;
    for (const { target: v, width: b } of c.sourceLinks) {
      if (v === S) break;
      M += b + a;
    }
    for (const { source: v, width: b } of S.targetLinks) {
      if (v === c) break;
      M -= b;
    }
    return M;
  }
  function tt(c, S) {
    let M = S.y0 - (S.targetLinks.length - 1) * a / 2;
    for (const { source: v, width: b } of S.targetLinks) {
      if (v === c) break;
      M += b + a;
    }
    for (const { target: v, width: b } of c.sourceLinks) {
      if (v === S) break;
      M -= b;
    }
    return M;
  }
  return _;
}
var Se = Math.PI, Ae = 2 * Se, Ct = 1e-6, No = Ae - Ct;
function $e() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Ms() {
  return new $e();
}
$e.prototype = Ms.prototype = {
  constructor: $e,
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
    else if (f > Ct) if (!(Math.abs(p * r - l * h) > Ct) || !s)
      this._ += "L" + (this._x1 = o) + "," + (this._y1 = t);
    else {
      var u = e - i, w = n - a, _ = r * r + l * l, g = u * u + w * w, d = Math.sqrt(_), L = Math.sqrt(f), $ = s * Math.tan((Se - Math.acos((_ + f - g) / (2 * d * L))) / 2), y = $ / L, C = $ / d;
      Math.abs(y - 1) > Ct && (this._ += "L" + (o + y * h) + "," + (t + y * p)), this._ += "A" + s + "," + s + ",0,0," + +(p * u > h * w) + "," + (this._x1 = o + C * r) + "," + (this._y1 = t + C * l);
    }
  },
  arc: function(o, t, e, n, s, i) {
    o = +o, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(n), r = e * Math.sin(n), l = o + a, h = t + r, p = 1 ^ i, f = i ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + h : (Math.abs(this._x1 - l) > Ct || Math.abs(this._y1 - h) > Ct) && (this._ += "L" + l + "," + h), e && (f < 0 && (f = f % Ae + Ae), f > No ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (o - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = l) + "," + (this._y1 = h) : f > Ct && (this._ += "A" + e + "," + e + ",0," + +(f >= Se) + "," + p + "," + (this._x1 = o + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(o, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Ze(o) {
  return function() {
    return o;
  };
}
function Vo(o) {
  return o[0];
}
function Fo(o) {
  return o[1];
}
var Go = Array.prototype.slice;
function Xo(o) {
  return o.source;
}
function Uo(o) {
  return o.target;
}
function qo(o) {
  var t = Xo, e = Uo, n = Vo, s = Fo, i = null;
  function a() {
    var r, l = Go.call(arguments), h = t.apply(this, l), p = e.apply(this, l);
    if (i || (i = r = Ms()), o(i, +n.apply(this, (l[0] = h, l)), +s.apply(this, l), +n.apply(this, (l[0] = p, l)), +s.apply(this, l)), r) return i = null, r + "" || null;
  }
  return a.source = function(r) {
    return arguments.length ? (t = r, a) : t;
  }, a.target = function(r) {
    return arguments.length ? (e = r, a) : e;
  }, a.x = function(r) {
    return arguments.length ? (n = typeof r == "function" ? r : Ze(+r), a) : n;
  }, a.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : Ze(+r), a) : s;
  }, a.context = function(r) {
    return arguments.length ? (i = r ?? null, a) : i;
  }, a;
}
function jo(o, t, e, n, s) {
  o.moveTo(t, e), o.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function Wo() {
  return qo(jo);
}
function Ko(o) {
  return [o.source.x1, o.y0];
}
function Yo(o) {
  return [o.target.x0, o.y1];
}
function Zo() {
  return Wo().source(Ko).target(Yo);
}
const Qo = "(blank)", Jo = { field: null, title: null, domain: null, format: null, sort: "descending" }, tn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, ne = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? Qo : String(e);
};
function en(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function sn(o = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((g) => Z(Jo, g)), n = Z(tn, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((g) => g.field != null && g.field === n.field), i = Math.max(0, s), a = e.map((g, d) => {
    const L = k.rollup(
      o,
      (y) => y.length,
      (y) => ne(g.accessor, y)
    ), $ = en(L, g).map((y, C) => ({
      id: -1,
      dim: d,
      index: C,
      key: y,
      label: g.format ? g.format(y) : y,
      count: L.get(y)
    }));
    return {
      title: g.title ?? (typeof g.field == "string" ? g.field : ""),
      index: d,
      nodes: $,
      byKey: new Map($.map((y) => [y.key, y]))
    };
  }), r = a.flatMap((g) => g.nodes);
  r.forEach((g, d) => {
    g.id = d;
  });
  const l = (g) => e.map((d) => ne(d.accessor, g)).join("\0"), h = k.rollups(o, (g) => g, l).map(([, g]) => {
    const d = e.map(($) => ne($.accessor, g[0])), L = d.map(($, y) => a[y].byKey.get($));
    return {
      keys: d,
      labels: L.map(($) => $.label),
      nodes: L,
      records: g,
      value: g.length
    };
  }), p = [i, ...e.map((g, d) => d).filter((g) => g !== i)];
  h.sort((g, d) => {
    for (const L of p) {
      const $ = g.nodes[L].index - d.nodes[L].index;
      if ($) return $;
    }
    return 0;
  });
  const f = [];
  for (const g of h)
    for (let d = 1; d < e.length; d++)
      f.push({
        source: g.nodes[d - 1].id,
        target: g.nodes[d].id,
        pair: d - 1,
        keys: g.keys,
        labels: g.labels,
        records: g.records,
        value: g.value,
        colorKey: g.keys[i]
      });
  const u = a[i], w = e[i];
  return w && (n.field ?? (n.field = w.field), n.accessor = (g) => ne(w.accessor, g), n.format ?? (n.format = w.format)), n.domain = ft(
    n.domain,
    u ? u.nodes.map((g) => g.key) : []
  ), n.range ?? (n.range = _t(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: g, index: d, nodes: L }) => ({
      title: g,
      index: d,
      nodes: L
    })),
    nodes: r,
    paths: h,
    links: f,
    total: o.length
  };
}
const on = 2.3, Qe = 5, Je = 6, nn = 2, ie = 6, ae = 0.92, an = "#333", rn = {
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
class On {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...rn, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: i } = this.options, a = Rt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(a);
    const l = sn(this.options.data, this.options);
    this.prepared = l;
    const { axes: h, columns: p, colorIndex: f, total: u } = l, w = pe(h.color), _ = (c) => this.highlight.includes(c, { color: c.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(w, a), !l.nodes.length || p.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const g = this.svg.node(), d = p[p.length - 1], L = (c) => Et(`${c.label} `, a, g) + Et(c.count, a * ae, g), $ = Math.ceil(
      Math.max(
        Et(d.title, a * ae, g, 600),
        ...d.nodes.map(L)
      )
    ) + Je + nn, y = Math.round(on * a), C = Math.max(r - $, t * p.length), D = [
      [0, y + Qe],
      [C, y + this.options.height - Qe]
    ], R = Bo().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(D)({
      nodes: l.nodes.map((c) => ({ ...c })),
      links: l.links.map((c) => ({ ...c }))
    });
    n && ln(R.nodes, p.length, D[0][1], D[1][1]);
    const B = Zo(), U = (c) => c.x1 + Je, q = (c) => c.dim === f ? this.highlight.color(w(c.key), c, { color: c.key }) : !this.highlight.active || c.sourceLinks.some(_) || c.targetLinks.some(_) ? an : bt, at = this.svg.attr("width", r).attr("height", y + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${u} ${i} across ${p.map((c) => c.title).join(", ")}`
    ), et = (c) => R.nodes.find((S) => S.dim === c.index);
    at.append("g").selectAll("text").data(p.filter(et)).join("text").attr("class", "parallel-sets__header").attr("x", (c) => U(et(c))).attr("y", y - a * 0.9).attr("text-anchor", "start").attr("font-size", a * ae).text((c) => c.title);
    const Q = at.append("g").attr("fill", "none").selectAll("path").data(R.links).join("path").attr("class", "parallel-sets__link").attr("d", B).attr("stroke", (c) => this.highlight.color(w(c.colorKey), c, { color: c.colorKey })).attr("stroke-width", (c) => Math.max(c.width, 1)), F = at.append("g").selectAll("g").data(R.nodes).join("g").attr("class", "parallel-sets__node");
    F.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (c) => c.x0).attr("y", (c) => c.y0).attr("width", (c) => c.x1 - c.x0).attr("height", (c) => Math.max(c.y1 - c.y0, 1)).attr("fill", q), F.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (c) => c.x0 - ie).attr("y", (c) => c.y0 - ie / 2).attr("width", (c) => c.x1 - c.x0 + ie * 2).attr("height", (c) => Math.max(c.y1 - c.y0, 1) + ie), F.append("text").attr("class", "parallel-sets__label").attr("x", U).attr("y", (c) => (c.y0 + c.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((c) => `${c.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * ae).text((c) => c.count), s && this._bindHover(F, Q, R);
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
      const l = r.keys.slice(0, r.pair + 2), h = n.links.filter((u) => u.pair === r.pair && l.every((w, _) => u.keys[_] === w)).reduce((u, w) => u + w.value, 0), p = r.labels.slice(0, l.length), f = { type: "link", keys: l, labels: p, pair: r.pair, value: h };
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
    Tt(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function ln(o, t, e, n) {
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
const cn = "(blank)", ts = { field: null, title: null, domain: null, format: null, sort: "descending" }, hn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, re = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? cn : String(e);
};
function Ss(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function es(o, t) {
  if (!t.accessor)
    return o.length ? [{ key: null, label: "", index: 0, count: o.length }] : [];
  const e = k.rollup(
    o,
    (n) => n.length,
    (n) => re(t.accessor, n)
  );
  return Ss(e, t).map((n, s) => ({
    key: n,
    label: t.format ? t.format(n) : n,
    index: s,
    count: e.get(n)
  }));
}
function un(o = [], t = {}) {
  var w, _, g;
  const e = Z(ts, (w = t.axis) == null ? void 0 : w.x), n = Z(ts, (_ = t.axis) == null ? void 0 : _.y), s = Z(hn, (g = t.axis) == null ? void 0 : g.color), i = es(o, e), a = es(o, n).map((d) => ({
    ...d,
    cells: i.map((L) => ({ row: d.index, column: L.index, count: 0, units: [] }))
  }));
  e.domain = i.map((d) => d.key), n.domain = a.map((d) => d.key);
  const r = s.accessor ? (d) => re(s.accessor, d) : () => null;
  if (s.accessor) {
    const d = k.rollup(o, (L) => L.length, r);
    s.domain = ft(s.domain, Ss(d, s)), s.range ?? (s.range = _t(s.domain.length));
  } else
    s.domain = [];
  const l = new Map(s.domain.map((d, L) => [d, L])), h = new Map(a.map((d) => [d.key, d.index])), p = new Map(i.map((d) => [d.key, d.index]));
  o.forEach((d, L) => {
    const $ = n.accessor ? re(n.accessor, d) : null, y = e.accessor ? re(e.accessor, d) : null, C = h.get($), D = p.get(y), R = a[C].cells[D];
    R.units.push({ record: d, index: L, row: C, column: D, rowKey: $, columnKey: y, colorKey: r(d) }), R.count += 1;
  });
  const f = (d) => l.get(d.colorKey) ?? l.size, u = [];
  for (const d of a)
    for (const L of d.cells)
      L.units.sort(($, y) => f($) - f(y) || $.index - y.index), u.push(...L.units);
  return { axes: { x: e, y: n, color: s }, columns: i, rows: a, units: u, total: o.length };
}
const le = 0.92, ss = 1.7, dn = 1.9, pn = 1.9, fn = 0.67, gn = 0.5, mn = 1, yn = 1.08, os = 3, xn = 0.4, Ce = 40, ns = Math.cos(Ce * Math.PI / 180), _n = Math.sin(Ce * Math.PI / 180), vn = 2, wn = 3, bn = {
  data: [],
  axis: {},
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
class Hn {
  constructor(t, e = {}) {
    if (!t) throw new Error("UnitMatrixChart: a container element is required");
    this.container = t, this.options = { ...bn, ...e }, this.highlight = new Ht(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("unit-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "unit-matrix__scroll").append("svg").attr("class", "unit-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new Pt(t), this.draw(), this._observeResize();
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
    const { unitSize: t, unitPadding: e, showCounts: n, unit: s } = this.options, i = Rt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a, this.tooltip.fontSize(i);
    const r = un(this.options.data, this.options);
    this.prepared = r;
    const { axes: l, columns: h, rows: p, total: f } = r;
    this._dropStaleSelection(l.color);
    const u = pe(l.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(u, i), !p.length || !h.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty unit matrix");
      return;
    }
    const w = this.svg.node(), _ = Ln(r, {
      width: a,
      fontSize: i,
      unitSize: t,
      unitPadding: e,
      showCounts: n,
      measure: (y, C, D) => Et(y, C, w, D)
    });
    this.layout = _;
    const g = [l.y, l.x].filter((y) => y.accessor).map((y, C) => j(y, C ? "column" : "row")), d = this.svg.attr("width", _.width).attr("height", _.height).attr("font-size", i).attr(
      "aria-label",
      `Unit matrix of ${f} ${s}${g.length ? ` by ${g.join(" and ")}` : ""}`
    );
    d.append("g").selectAll("line").data(_.columns).join("line").attr("class", "unit-matrix__rule unit-matrix__rule--column").attr("x1", (y) => y.x + 0.5).attr("x2", (y) => y.x + 0.5).attr("y1", _.headerHeight).attr("y2", _.height), d.append("g").selectAll("line").data(_.rows).join("line").attr("class", "unit-matrix__rule").classed("unit-matrix__rule--first", (y, C) => C === 0).attr("x1", 0).attr("x2", _.plotRight).attr("y1", (y) => y.y + 0.5).attr("y2", (y) => y.y + 0.5), d.append("g").selectAll("text").data(_.titles).join("text").attr("class", "unit-matrix__title").attr("x", (y) => y.x).attr("y", (y) => y.y).attr("text-anchor", "start").attr("font-size", i * le).text((y) => y.text);
    const L = d.append("g").selectAll("text").data([..._.columns, ..._.rows].filter((y) => y.label)).join("text").attr("class", "unit-matrix__label").attr("x", (y) => y.label.x).attr("y", (y) => y.label.y).attr("dy", (y) => y.label.middle ? "0.35em" : null).attr("text-anchor", "start").attr(
      "transform",
      (y) => y.label.tilt ? `rotate(${-Ce},${y.label.x},${y.label.y})` : null
    ).text((y) => `${y.label.text} `);
    n && L.append("tspan").attr("class", "unit-matrix__label-count").attr("font-size", i * le).text((y) => y.band.count), L.filter((y) => y.label.text !== y.band.label).append("title").text((y) => y.band.label);
    const $ = d.append("g").selectAll("rect").data(_.units).join("rect").attr("class", "unit-matrix__unit").attr("x", (y) => y.x + 0.5).attr("y", (y) => y.y + 0.5).attr("width", t - 1).attr("height", t - 1).attr("rx", vn).attr(
      "fill",
      (y) => this.highlight.color(u(y.unit.colorKey), y.unit.record, { color: y.unit.colorKey })
    );
    d.append("g").selectAll("text").data(_.counts).join("text").attr("class", "unit-matrix__count").attr("x", (y) => y.x).attr("y", (y) => y.y).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", i * le).text((y) => y.count), this._bindHover($);
  }
  // ── Highlight ───────────────────────────────────────────────────────────────
  // A legend selection only names categories of the color axis it was made on.
  // Once the axis has none of them (it was given another field), nothing could
  // be highlighted and every unit would be muted, so the selection is dropped.
  _dropStaleSelection(t) {
    var n, s;
    const e = this.highlight.selected("color");
    !e || [...e].some((i) => t.domain.includes(i)) || (this.highlight.selection.delete("color"), (s = (n = this.options).onHighlightChange) == null || s.call(n, this.highlight));
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _bindHover(t) {
    t.on("mouseenter", (e, n) => {
      this._setHovered(n.unit), this.tooltip.show(this._unitTooltip(n.unit), e, n.unit);
    }).on("mousemove", (e) => this.tooltip.move(e));
  }
  // The hovered unit: hides the tooltip when nothing is hovered, and reports a
  // change through onHover
  _setHovered(t) {
    var n, s;
    const e = t !== this.hovered;
    this.hovered = t, t || this.tooltip.hide(), e && ((s = (n = this.options).onHover) == null || s.call(n, t));
  }
  // Default rows: the unit's row, column and color categories, the color one
  // left out when it repeats the row or column field
  _unitTooltip(t) {
    const { axes: e, columns: n, rows: s } = this.prepared, i = [];
    e.y.accessor && i.push([j(e.y, "Row"), s[t.row].label]), e.x.accessor && i.push([j(e.x, "Column"), n[t.column].label]);
    const a = [e.x, e.y].some(
      (r) => typeof r.field == "string" && r.field === e.color.field
    );
    if (e.color.accessor && !a) {
      const r = e.color.format ?? ((l) => l);
      i.push([j(e.color, "Color"), r(t.colorKey)]);
    }
    return this.options.tooltip ? this.options.tooltip(t, i) : i;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const n = this.prepared.axes.color, s = n.accessor ? n.title : null;
    Tt(this.legend, t, { ...n, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("unit-matrix__legend", !0);
  }
}
function kn(o, t, e) {
  if (e(o) <= t) return o;
  let n = o.length - 1;
  for (; n > 1 && e(`${o.slice(0, n).trimEnd()}…`) > t; ) n -= 1;
  return `${o.slice(0, n).trimEnd()}…`;
}
function is(o, t, e) {
  if (!o) return 0;
  const n = Math.ceil(o / t), s = n * t - o;
  return e > s ? n + 1 : n;
}
function Ln(o, t) {
  const { axes: e, columns: n, rows: s } = o, { width: i, fontSize: a, unitSize: r, unitPadding: l, showCounts: h, measure: p } = t, f = r + l, u = a * le, w = Math.round(a * fn), _ = Math.round(a * gn), g = e.x.accessor != null, d = e.y.accessor != null, L = g && e.x.title || null, $ = d && e.y.title || null, y = (T) => h ? p(T, u) : 0, C = (T) => p(`${T.label} `, a) + y(T.count), D = (T) => T ? p(T.toUpperCase(), u, 600) * yn : 0, R = (T) => h ? Math.ceil((y(T) + os) / f) : 0, B = d ? Math.max(0, ...s.map(C)) : 0, U = Math.ceil(
    Math.max(Math.min(B, i * xn), D($))
  ), q = U ? U + Math.round(a * mn) : 0, at = n.map((T, E) => s.map((N) => N.cells[E])), et = (T, E) => Math.max(1, ...at[T].map((N) => is(N.count, E, R(N.count)))), Q = at.map(
    (T) => Math.max(1, ...T.map((E) => E.count + R(E.count)))
  ), F = (T) => 2 * w + T * r + (T - 1) * l, tt = (T, E) => {
    const N = (A, O) => Math.max(F(O), E[A]), W = n.map((A, O) => {
      const G = Math.floor((E[O] - 2 * w + l) / f);
      return Math.min(Q[O], Math.max(1, G));
    });
    let nt = W.reduce((A, O, G) => A + N(G, O), 0);
    for (; ; ) {
      let A = -1, O = 1;
      if (W.forEach((G, Y) => {
        if (G >= Q[Y] || nt + N(Y, G + 1) - N(Y, G) > T) return;
        const rt = et(Y, G);
        rt > O && (A = Y, O = rt);
      }), A < 0) break;
      nt += N(A, W[A] + 1) - N(A, W[A]), W[A] += 1;
    }
    const K = Math.max(0, T - nt) / n.length, m = W.map((A, O) => N(O, A) + K);
    return { perLine: W, widths: m, total: m.reduce((A, O) => A + O, 0) };
  }, c = n.reduce(
    (T, E, N) => T + F(Math.min(wn, Q[N])),
    0
  ), S = (T) => Math.max(i - q - T, c), M = n.map((T) => g ? C(T) : 0), v = M.map((T) => g ? Math.ceil(T) + w : 0);
  let b = tt(S(0), v);
  const z = g && b.total > S(0) + 0.5, I = w + a * 0.35;
  let st = 0;
  if (z) {
    let T = 0;
    for (let E = n.length - 1; E >= 0; E -= 1)
      T += F(1), st = Math.max(
        st,
        Math.ceil(I + ns * M[E] - T)
      );
    b = tt(
      S(st),
      n.map(() => 0)
    );
  }
  const J = q + b.total, lt = L ? Math.round(a * ss) : 0;
  let ct = 0;
  g && (ct = z ? Math.ceil(_n * Math.max(...M) + ns * a) + Math.round(a * 0.6) : Math.round(a * dn));
  const ht = Math.max(
    lt + ct,
    $ ? Math.round(a * ss) : 0,
    Math.round(a * 0.5)
  ), ot = [];
  L && ot.push({ text: L, x: q + w, y: Math.round(a * 1.05) }), $ && ot.push({ text: $, x: 0, y: ht - Math.round(a * 0.6) });
  let pt = q;
  const gt = n.map((T, E) => {
    const N = { band: T, x: pt, width: b.widths[E], perLine: b.perLine[E], label: null };
    return g && (N.label = z ? {
      text: T.label,
      x: pt + I,
      y: ht - Math.round(a * 0.45),
      tilt: !0,
      middle: !1
    } : {
      text: T.label,
      x: pt + w,
      y: ht - Math.round(a * 0.6),
      tilt: !1,
      middle: !1
    }), pt += b.widths[E], N;
  }), yt = [], V = [];
  let dt = ht;
  const vt = s.map((T) => {
    const E = Math.max(
      1,
      ...T.cells.map((K, m) => is(K.count, b.perLine[m], R(K.count)))
    ), N = Math.max(
      2 * _ + E * r + (E - 1) * l,
      Math.ceil(a * pn)
    ), W = dt + _ + r / 2, nt = { band: T, y: dt, height: N, label: null };
    if (d) {
      const K = U - y(T.count) - p(" ", a), m = C(T) <= U ? T.label : kn(T.label, K, (A) => p(A, a));
      nt.label = {
        text: m,
        x: 0,
        y: W,
        tilt: !1,
        middle: !0
      };
    }
    return T.cells.forEach((K, m) => {
      const A = gt[m], O = A.x + w;
      if (K.units.forEach((zt, X) => {
        yt.push({
          unit: zt,
          x: O + X % A.perLine * f,
          y: dt + _ + Math.floor(X / A.perLine) * f
        });
      }), !h || !K.count) return;
      const G = Math.ceil(K.count / A.perLine) - 1, Y = K.count - G * A.perLine, rt = A.perLine - Y >= R(K.count);
      V.push({
        count: K.count,
        x: rt ? O + Y * f - l + os : O,
        y: W + (rt ? G : G + 1) * f
      });
    }), dt += N, nt;
  });
  return {
    // The small allowance keeps a float sum from rounding a fitting chart up a pixel
    width: Math.max(i, Math.ceil(J + st - 0.01)),
    height: dt + 1,
    headerHeight: ht,
    plotLeft: q,
    plotRight: J,
    tilt: z,
    titles: ot,
    columns: gt,
    rows: vt,
    units: yt,
    counts: V
  };
}
export {
  An as BarChart,
  Cn as BoxPlotChart,
  Pe as FONT_SIZES,
  Ht as Highlight,
  bt as MUTED_COLOR,
  On as ParallelSetsChart,
  zn as ScatterPlot,
  Tn as StackedBarChart,
  Pt as Tooltip,
  En as TreeChart,
  Hn as UnitMatrixChart,
  he as barLabel,
  xs as bottomLabels,
  ho as boxStats,
  Mn as categoryColors,
  ms as chartFrame,
  Sn as countBy,
  $n as countByStacked,
  _t as defaultColors,
  bs as drawCategoryAxis,
  _s as drawGridlines,
  Tt as drawLegend,
  vs as drawPlotEdges,
  Ds as drawSequentialLegend,
  ge as drawTopTitle,
  ws as drawValueAxis,
  kt as hasValue,
  ys as laneLayout,
  Ln as layoutUnitMatrix,
  mt as maxTextWidth,
  Et as measureText,
  Hs as prepareBarChart,
  po as prepareBoxPlotChart,
  sn as prepareParallelSets,
  oo as prepareScatterPlot,
  Ws as prepareStackedBarChart,
  ko as prepareTreeChart,
  un as prepareUnitMatrix,
  Rt as resolveFontSize,
  xt as titleLane,
  Qt as titleOnTop,
  Gt as topTitleLane
};
