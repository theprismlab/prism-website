import * as k from "d3";
const ws = [
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
function wt(o) {
  return o <= k.schemeTableau10.length ? k.schemeTableau10 : ws;
}
function Qo(o, t) {
  const e = k.rollup(
    o,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), n = Array.from(e).sort((s, i) => i[1] - s[1]).map(([s]) => s);
  return { domain: n, range: wt(n.length) };
}
const Ze = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, Qe = {
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
}, Je = {
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
}, ts = {
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
function re(o) {
  return o.showTitle === !1 ? null : o.title;
}
function es(o) {
  return o.showTicks === !1 ? null : o.showTitle === !1 ? o.title == null ? null : "" : o.title;
}
function ss(o, t) {
  return {
    category: o.category ?? (t ? o.y : o.x),
    value: o.value ?? (t ? o.x : o.y)
  };
}
function os(o) {
  return o == null ? null : typeof o == "function" ? o : (t) => t[o];
}
function q(o, t = {}) {
  const e = { ...o, ...t };
  return e.accessor = os(e.field), e;
}
function F(o, t) {
  return o.title ?? (typeof o.field == "string" ? o.field : t);
}
function lt(o, t) {
  return [.../* @__PURE__ */ new Set([...o ?? [], ...t])];
}
function Ae(o) {
  var t;
  return ((t = o.tickValues) == null ? void 0 : t.filter((e) => o.domain.includes(e))) ?? null;
}
function Ct(o) {
  switch (o) {
    case "log":
      return k.scaleLog();
    case "sqrt":
      return k.scaleSqrt();
    default:
      return k.scaleLinear();
  }
}
function Rt(o, t = [0, 1]) {
  const [e, n] = k.extent(o);
  return e === void 0 ? t : e === n ? [e - 1, n + 1] : [e, n];
}
function he(o, t, e) {
  return Ct(o).domain(t).nice(e ?? void 0).domain();
}
function Zt(o, t) {
  return t.tickValues ? t.tickValues : o.ticks ? o.ticks(t.ticks ?? void 0) : o.domain();
}
function Ht(o, t) {
  return t.tickValues ? o.tickValues(t.tickValues) : t.ticks != null && o.ticks(t.ticks), t.format && o.tickFormat(t.format), o;
}
function $e(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : wt(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function ks(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Ct(o.type).domain(o.domain).range(o.range);
}
const bs = { ...Qe, field: "count" };
function Jo(o, t, { sort: e, group: n } = {}) {
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
function le(o, t, e = "both") {
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
function Ls(o = [], t = {}) {
  const e = t.axis ?? {}, n = ss(e, t.orientation === "horizontal"), s = q(Ze, n.category), i = q(bs, n.value), a = q(Je, e.group), r = q(ts, e.color), l = r.accessor ?? s.accessor, h = (d) => ({
    count: k.sum(d, i.accessor),
    color: l(d[0])
  });
  let p;
  if (a.accessor) {
    const d = k.rollup(o, h, a.accessor, s.accessor);
    a.domain = lt(a.domain, d.keys()), p = a.domain.flatMap((w) => {
      const _ = d.get(w) ?? /* @__PURE__ */ new Map();
      return lt(s.domain, _.keys()).filter((m) => _.has(m)).map((m) => ({ group: w, label: m, ..._.get(m) }));
    }), s.domain = [...new Set(p.map((w) => w.label))];
  } else {
    const d = k.rollup(o, h, s.accessor);
    s.domain = lt(s.domain, d.keys()), p = s.domain.map((w) => {
      var _, m;
      return {
        group: null,
        label: w,
        count: ((_ = d.get(w)) == null ? void 0 : _.count) ?? 0,
        color: ((m = d.get(w)) == null ? void 0 : m.color) ?? w
      };
    });
  }
  s.tickValues = Ae(s), i.domain ?? (i.domain = he(i.type, [0, k.max(p, (d) => d.count) || 1], i.ticks)), r.domain = lt(
    r.domain,
    p.map((d) => d.color)
  ), r.range ?? (r.range = wt(r.domain.length));
  const f = t.total ?? k.sum(p, (d) => d.count);
  return { axes: { category: s, value: i, group: a, color: r }, bars: p, total: f };
}
const _t = "#cfcfcf";
class Vt {
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
    return this.includes(e, n, s) ? t : _t;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const At = 6, Pt = 12, ns = 8, is = 0.35, as = 0.3, ke = "rgba(0,0,0,0.7)", ue = "rgba(0,0,0,0.5)", Ss = "rgba(0,0,0,0.08)";
function rs(o, t, e) {
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
function ls(o, { grouped: t, padding: e, groupPadding: n, headingLanes: s = !0 }) {
  var p;
  const i = t ? n ?? e : 0, a = [];
  for (const f of o) {
    const d = t && f.group !== ((p = a.at(-1)) == null ? void 0 : p.group);
    d && s && a.push({ group: f.group, item: null, starts: !1 }), a.push({ group: f.group, item: f, starts: d });
  }
  const r = t && s ? (1 + e) / 2 + i / 2 : e;
  let l = 0;
  a.forEach((f, d) => {
    const w = !f.item;
    !s && d > 0 && f.starts && (l += i), w && d > 0 && (l += i / 2), f.offset = l, l += 1, w && (l += i / 2);
  });
  const h = 2 * r + l - e;
  return {
    lanes: a,
    totalSteps: h,
    firstFraction: (r + (1 - e) / 2) / h,
    place([f, d]) {
      const w = (d - f) / h, _ = w * (1 - e);
      for (const x of a)
        x.pos = f + (r + x.offset) * w + _ / 2, x.item && (x.item.pos = x.pos);
      const m = [];
      if (t) {
        for (const x of a) {
          if (!x.item) continue;
          const A = x.pos + _ / 2;
          x.starts ? m.push({ group: x.group, from: x.pos - _ / 2, to: A, sep: null }) : m.at(-1).to = A;
        }
        m.forEach((x, A) => {
          A > 0 && (x.sep = (m[A - 1].to + x.from) / 2);
        });
      }
      return { step: w, bandwidth: _, spans: m };
    }
  };
}
function cs({ fontSize: o, labelWidth: t, totalSteps: e, firstFraction: n, width: s, left: i, right: a }) {
  const r = (s - i - a) / e < t, l = At + 3 + o, h = r ? (t + At + 3 + 0.75 * o) * Math.SQRT1_2 + 0.3 * o : l;
  if (!r) return { tilt: r, depth: h, extra: 0, left: i };
  const p = Math.round(t * Math.SQRT1_2), f = n;
  return {
    tilt: r,
    depth: h,
    extra: h - l,
    left: Math.max(i, Math.ceil((p - f * (s - a)) / (1 - f)))
  };
}
function It(o, t, e) {
  return o.attr("x1", (n) => t(n)[0]).attr("y1", (n) => t(n)[1]).attr("x2", (n) => e(n)[0]).attr("y2", (n) => e(n)[1]);
}
function hs(o, t, e, n) {
  const s = o.append("g").selectAll("line").data(n).join("line");
  return s.attr("stroke", Ss), It(
    s,
    (i) => t.at(0, e(i)),
    (i) => t.at(t.catExtent, e(i))
  );
}
function us(o, t, e = !1) {
  const { innerWidth: n, innerHeight: s } = t;
  return o.append("path").attr("d", e ? `M0,0H${n}V${s}H0Z` : `M0,0V${s}H${n}`).attr("fill", "none").attr("stroke", ue);
}
function ds(o, t, e, { fontSize: n, tickValues: s, format: i }) {
  const a = t.horizontal ? k.axisBottom(e) : k.axisLeft(e), r = o.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(a.tickValues(s).tickFormat(i).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", n), r.selectAll("text").attr("fill", ke), r.selectAll(".tick line").attr("stroke", ue), r.select(".domain").remove(), r;
}
function ps(o, t, e, { fontSize: n, ticked: s, label: i, heading: a, tilt: r, groups: l }) {
  const { horizontal: h, at: p, axisAcross: f, outward: d, valExtent: w } = t, _ = o.append("g").attr("font-size", n), m = _.selectAll("g").data(e.filter((S) => !S.item || s(S.item))).join("g").attr("transform", (S) => `translate(${p(S.pos, f).join(",")})`);
  It(
    m.append("line"),
    () => p(0, d * At),
    (S) => p(0, S.item ? 0 : -d * w)
  );
  const [x, A] = p(0, d * (At + 3)), M = m.append("text").attr("x", x).attr("y", A).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em").attr("fill", ke).each(function(S) {
    const z = k.select(this);
    S.item ? i(z, S.item) : z.attr("font-weight", 600).text(a(S.group));
  });
  if (r && M.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: S, position: z, across: B } = l;
    It(
      _.selectAll(".separator").data(S.slice(1)).join("line"),
      (H) => p(H.sep, f),
      (H) => p(H.sep, f - d * w)
    );
    const E = _.selectAll(".heading").data(S).join("text").attr("font-weight", 600).attr("fill", ke).text((H) => a(H.group));
    z === "outside" ? E.attr("transform", (H) => {
      const [G, j] = p((H.from + H.to) / 2, B);
      return `translate(${G},${j})` + (h ? " rotate(90)" : "");
    }).attr("text-anchor", "middle") : E.attr("x", (H) => p((H.from + H.to) / 2, B)[0]).attr("y", (H) => p((H.from + H.to) / 2, B)[1]).attr("text-anchor", h ? "end" : "middle").attr("dy", h ? "0.32em" : "0.71em");
  }
  return _.selectAll("line").attr("stroke", ue), _;
}
const As = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function zt(o, t, e) {
  const { title: n, tickValues: s, fontSize: i, highlight: a, dimension: r = "color" } = e, l = e.format ?? ((x) => x), h = e.key ?? ((x) => x), p = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", f = (x) => As.has(p(x)) ? p(x) : "square";
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  o.attr("class", "chart-legend").style("display", null).style("font-size", i ? `${i}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const d = a != null, w = (x) => d && a.active && !a.isSelected(r, h(x)), _ = (x, A) => a.toggle(r, h(A), { extend: x.shiftKey || x.metaKey }), m = o.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", d).classed("chart-legend__item--muted", w);
  d && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (x) => a.isSelected(r, h(x))).on("click", _).on("keydown", (x, A) => {
    x.key !== "Enter" && x.key !== " " || (x.preventDefault(), _(x, A));
  }), m.append("i").attr("class", (x) => `chart-legend__swatch chart-legend__swatch--${f(x)}`).style("color", (x) => w(x) ? _t : t(x)), m.append("span").text((x) => l(x));
}
let $s = 0;
function Ms(o, t, e) {
  const { title: n, fontSize: s, width: i = 160 } = e;
  if (o.selectAll("*").remove(), n == null) {
    o.style("display", "none");
    return;
  }
  const a = s ?? 12;
  o.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), n && o.append("div").attr("class", "chart-legend__title").text(n);
  const [r, l] = t.domain(), h = Math.ceil(a * 1.5), p = Math.round(a * 0.67), f = o.append("svg").attr("class", "chart-legend__ramp").attr("width", i + h * 2).attr("height", p + 3 + Math.ceil(a * 1.4)), d = `chart-legend-ramp-${$s += 1}`;
  f.append("linearGradient").attr("id", d).selectAll("stop").data(k.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(r + m * (l - r)));
  const w = f.append("g").attr("transform", `translate(${h},0)`);
  w.append("rect").attr("width", i).attr("height", p).attr("fill", `url(#${d})`);
  const _ = k.axisBottom(k.scaleLinear([r, l], [0, i]));
  w.append("g").attr("transform", `translate(0,${p})`).call(Ht(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", a);
}
const Ee = { small: 10, medium: 12, large: 14 };
function Nt(o = "medium") {
  if (typeof o == "number") return o;
  if (!(o in Ee)) throw new Error(`Unknown chart font size "${o}"`);
  return Ee[o];
}
function mt(o, t) {
  return t ? o + 16 : 0;
}
const Ts = 0.5, zs = 0.72, Cs = 5, fs = 8;
function Qt(o) {
  return !!o.title && o.titlePosition === "top";
}
function Dt(o) {
  return o * 1.5 + fs;
}
function de(o, t, { fontSize: e, color: n }) {
  const s = e * Ts, i = -(e / 2 + fs), a = o.append("g").attr("class", "axis-title axis-title--top"), r = a.append("text").attr("x", s + Cs).attr("y", i).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, h = s / 2, p = i - e * zs, f = a.append("path").attr("d", `M${l},${i}V${p}M${l - h},${p + h}L${l},${p}L${l + h},${p + h}`).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return n && (r.attr("fill", n), f.attr("stroke", n)), a;
}
let Yt;
const Os = 0.55;
function Bt(o, t, e, n = 400) {
  if (Yt === void 0 && (Yt = document.createElement("canvas").getContext("2d")), !Yt) return String(o).length * t * Os;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Yt.font = `${n} ${t}px ${s}`, Yt.measureText(String(o)).width;
}
function dt(o, t, e, n) {
  let s = 0;
  for (const i of o)
    s = Math.max(s, Bt(i, t, e, n));
  return s;
}
class Ft {
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
const He = 6, ge = 0.85, Es = "rgba(0,0,0,0.55)", Re = "rgba(0,0,0,0.6)", Hs = {
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
class tn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Hs, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Ft(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: n, rangePadding: s, border: i } = this.options, a = this.options.orientation === "horizontal", r = this.svg.node(), l = Nt(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: h, bars: p, total: f } = Ls(this.options.data, this.options), { category: d, value: w, group: _, color: m } = h, x = !!_.accessor, A = d.domain, M = d.format ?? String, S = _.format ?? String, z = (T) => (x ? `${S(T.group)} / ` : "") + M(T.label), B = this.options.barLabel !== "none", E = (T) => le(T.count, f, this.options.barLabel);
    this._tooltipRows = (T) => {
      const Z = le(T.count, f, "percent"), bt = [
        [F(d, "category"), M(T.label)],
        [F(w, "count"), `${T.count} of ${f} (${Z})`]
      ];
      return x && bt.unshift([F(_, "group"), S(T.group)]), this.options.tooltip ? this.options.tooltip(T, bt) : bt;
    };
    const H = Ct(w.type).domain(w.domain), G = Zt(H, w), j = w.format ?? H.tickFormat(w.ticks ?? void 0), Q = new Set(d.tickValues ?? A), U = d.showTicks !== !1, Y = w.showTicks !== !1, V = x && _.showTicks !== !1 ? _.position : null, K = V === "inline", c = V === "axis", L = ls(p, {
      grouped: x,
      padding: a ? as : is,
      groupPadding: n,
      headingLanes: K
    }), { lanes: b, totalSteps: y } = L, v = x ? _.domain.map(S) : [], [$, R] = [re(d), re(w)], [ot, W] = a ? [R, $] : [$, R], J = !!W && Qt(a ? d : w), nt = J ? 0 : mt(l, W), ut = dt(v, l, r, 600), tt = Math.max(
      U ? dt(A.map(M), l, r) : 0,
      K ? ut : 0
    ), yt = U || K, pt = V === "outside" ? l + ns : 0, $t = dt(p.map(E), l * ge, r, 600);
    let D, ft, Mt = !1, it;
    if (a)
      it = yt ? tt + Pt : 0, D = {
        top: J ? Dt(l) : l,
        right: $t + He + 8 + pt,
        bottom: (Y ? l + 16 : 8) + mt(l, ot),
        left: nt + it + (c ? ut + Pt : 0)
      }, ft = D.top + (x ? y : b.length) * e + D.bottom;
    else {
      D = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((B ? l * ge : 0) + 16, J ? Dt(l) : 0) + pt,
        right: 16,
        bottom: 0,
        // below
        left: nt + (Y ? dt(G.map(j), l, r) + Pt : 0)
      };
      const T = yt ? cs({
        fontSize: l,
        labelWidth: tt,
        totalSteps: y,
        firstFraction: L.firstFraction,
        width: t,
        left: D.left,
        right: D.right
      }) : { tilt: !1, depth: 0, extra: 0, left: D.left };
      Mt = T.tilt, it = T.depth, D.bottom = it + (c ? At + 3 + l : 0) + 15 + mt(l, ot), D.left = T.left, ft = this.options.height + T.extra;
    }
    const I = t - D.left - D.right, at = ft - D.top - D.bottom, rt = rs(a, I, at), { at: ct, outward: gt } = rt, { bandwidth: g, spans: C } = L.place(d.range || [0, rt.catExtent]), P = H.range(
      w.range || (a ? [s, I - s] : [at - s, s])
    ), et = P(H.domain()[0]), st = k.scaleOrdinal(m.domain, m.range), ht = (T) => this.highlight.color(st(T.color), T, { color: T.color });
    this.root.style("max-width", `${t}px`);
    const Gt = this.svg.attr("viewBox", `0 0 ${t} ${ft}`).attr(
      "aria-label",
      `Bar chart of ${F(w, "count")} by ${F(d, "category")}` + (x ? ` within ${F(_, "group")}` : "") + `. ${p.map((T) => `${z(T)}: ${T.count}`).join(", ")}`
    );
    Gt.selectAll("*").remove();
    const N = Gt.append("g").attr("transform", `translate(${D.left},${D.top})`);
    hs(N, rt, P, G), Y && ds(N, rt, P, { fontSize: l, tickValues: G, format: j }), us(N, rt, i);
    const Jt = V && !K ? {
      spans: C,
      position: V,
      across: V === "outside" ? a ? I + D.right - l : -D.top + l : rt.axisAcross + gt * (it + At + 3)
    } : null;
    ps(N, rt, b, {
      fontSize: l,
      ticked: (T) => U && Q.has(T.label),
      label: (T, Z) => T.text(M(Z.label)),
      heading: S,
      tilt: Mt,
      groups: Jt
    });
    const kt = (T) => {
      const [Z, bt] = ct(T.pos - g / 2, Math.min(et, P(T.count))), [pe, Ot] = ct(g, Math.abs(P(T.count) - et));
      return { x: Z, y: bt, w: pe, h: Ot };
    }, qt = N.append("g").selectAll("g").data(p).join("g");
    if (qt.append("rect").attr("rx", 3).attr("fill", ht).attr("x", (T) => kt(T).x).attr("y", (T) => kt(T).y).attr("width", (T) => kt(T).w).attr("height", (T) => kt(T).h).on("mouseenter", (T, Z) => this._setHovered(Z, T)).on("mousemove", (T) => this.tooltip.move(T)).on("mouseleave", () => this._setHovered(null)), B) {
      const T = (Z) => ct(Z.pos, P(Z.count) - gt * He);
      qt.append("text").attr("x", (Z) => T(Z)[0]).attr("y", (Z) => T(Z)[1]).attr("dy", a ? "0.35em" : null).attr("text-anchor", a ? "start" : "middle").attr("font-size", l * ge).attr("font-weight", 600).attr("fill", Es).text(E);
    }
    const jt = (T) => Gt.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", Re).text(T || "");
    jt(ot).attr("x", D.left + I / 2).attr("y", ft - l), J ? de(N, W, { fontSize: l, color: Re }) : jt(W).attr(
      "transform",
      `translate(${l + 2},${D.top + at / 2}) rotate(-90)`
    ), zt(this.legend, st, {
      ...m,
      title: es(m),
      fontSize: l,
      highlight: this.highlight
    });
  }
}
const Rs = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Ps = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Is = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function en(o, t, e, { sort: n } = {}) {
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
function Bs(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(Rs, e.y), s = q(Ps, e.x), i = q(Is, e.color), a = k.rollup(
    o,
    (h) => k.sum(h, s.accessor),
    n.accessor,
    i.accessor
  );
  n.domain = lt(n.domain, a.keys()), n.tickValues = Ae(n), i.domain = lt(i.domain, o.map(i.accessor));
  const r = n.domain.map((h) => {
    const p = a.get(h);
    let f = 0;
    const d = [];
    for (const w of i.domain) {
      const _ = (p == null ? void 0 : p.get(w)) ?? 0;
      _ > 0 && d.push({ key: w, count: _, start: f, end: f += _ });
    }
    return { label: h, count: f, segments: d };
  });
  s.domain ?? (s.domain = he(s.type, [0, k.max(r, (h) => h.count) || 1], s.ticks)), i.range ?? (i.range = wt(i.domain.length));
  const l = t.total ?? k.sum(r, (h) => h.count);
  return { axes: { category: n, value: s, color: i }, bars: r, total: l };
}
const Ds = 12, Pe = 6, Ie = 0.85, Vs = "rgba(0,0,0,0.55)", Ns = {
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
class sn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...Ns, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Ft(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, n = this.svg.node(), s = Nt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: i, bars: a, total: r } = Bs(this.options.data, this.options), { category: l, value: h, color: p } = i, f = l.domain, d = l.format ?? String, w = p.format ?? String, _ = (y) => le(y.count, r, this.options.barLabel);
    this._tooltipRows = (y) => {
      const v = [
        [F(l, "category"), d(y.label)],
        [F(p, "group"), w(y.key)],
        [F(h, "count"), `${y.count} of ${y.barCount}`],
        ["Share of total", le(y.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(y, v) : v;
    };
    const m = Qt(l), x = dt(f.map(d), s, n), A = {
      top: m ? Dt(s) : s,
      right: dt(a.map(_), s * Ie, n, 600) + Pe + 8,
      bottom: s + 16 + mt(s, h.title),
      left: (m ? 0 : mt(s, l.title)) + x + Ds
    }, M = t - A.left - A.right, S = f.length * e, z = A.top + S + A.bottom, B = k.scaleBand().domain(f).range(l.range || [0, S]).padding(0.3), E = Ct(h.type).domain(h.domain).range(h.range || [0, M]), H = k.scaleOrdinal(p.domain, p.range), G = (y) => this.highlight.color(H(y.key), y, { color: y.key }), j = Zt(E, h), Q = h.format ?? E.tickFormat(h.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const U = a.map((y) => {
      const v = y.segments.map(($) => `${w($.key)} ${$.count}`).join(", ");
      return `${d(y.label)}: ${y.count} (${v})`;
    }).join("; "), Y = this.svg.attr("viewBox", `0 0 ${t} ${z}`).attr(
      "aria-label",
      `Stacked bar chart of ${F(h, "count")} by ${F(l, "category")}, split by ${F(p, "group")}. ${U}`
    );
    Y.selectAll("*").remove();
    const V = Y.append("g").attr("transform", `translate(${A.left},${A.top})`), K = V.append("g").call(
      k.axisLeft(B).tickValues(l.tickValues ?? f).tickFormat(d).tickSizeOuter(0)
    ), c = V.append("g").attr("transform", `translate(0,${S})`).call(k.axisBottom(E).tickValues(j).tickFormat(Q).tickSizeOuter(0));
    for (const y of [K, c])
      y.attr("font-family", null).attr("font-size", s), y.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), y.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    V.insert("g", ":first-child").selectAll("line").data(j).join("line").attr("y2", S).attr("x1", (y) => E(y)).attr("x2", (y) => E(y)).attr("stroke", "rgba(0,0,0,0.08)");
    const L = V.append("g").selectAll("g").data(a).join("g");
    L.selectAll("rect").data((y) => y.segments.map((v) => ({ ...v, label: y.label, barCount: y.count }))).join("rect").attr("x", (y) => E(y.start)).attr("y", (y) => B(y.label)).attr("width", (y) => Math.max(0, E(y.end) - E(y.start))).attr("height", B.bandwidth()).attr("fill", G).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (y, v) => this._setHovered(v, y)).on("mousemove", (y) => this.tooltip.move(y)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && L.append("text").attr("x", (y) => E(y.count) + Pe).attr("y", (y) => B(y.label) + B.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ie).attr("font-weight", 600).attr("fill", Vs).text(_);
    const b = (y) => Y.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(y || "");
    b(h.title).attr("x", A.left + M / 2).attr("y", z - s), m ? de(V, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : b(l.title).attr(
      "transform",
      `translate(${s + 2},${A.top + S / 2}) rotate(-90)`
    ), zt(this.legend, H, { ...p, fontSize: s, highlight: this.highlight });
  }
}
const Me = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), gs = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: Me
}, Fs = { ...gs, field: "y" }, Gs = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: Me
}, qs = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: Me
}, js = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function Xs(o = [{}], t = []) {
  const e = o.map((s, i) => ({
    ...js,
    ...s,
    data: i === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function Ws(o = [], t = {}) {
  const e = t.axis ?? {}, n = q(gs, e.x), s = q(Fs, e.y), i = q(Gs, e.color), a = q(qs, e.radius), r = Xs(t.layers, o), l = r.flatMap((h) => h.data);
  for (const h of [n, s]) h.domain ?? (h.domain = he(h.type, Rt(l.map(h.accessor))));
  if (i.accessor) {
    const h = r.filter((p) => !p.color).flatMap((p) => p.data.map(i.accessor));
    i.type === "sequential" ? (i.domain ?? (i.domain = Rt(h)), i.range ?? (i.range = k.interpolateViridis)) : (i.domain = lt(i.domain, h), i.range ?? (i.range = wt(i.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Rt(l.map(a.accessor)))), { axes: { x: n, y: s, color: i, radius: a }, layers: r };
}
const Us = {
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
}, Ys = 0.92;
function me(o, t, e) {
  return Ct(o.type).domain(t).range(o.range ?? e);
}
function Ks(o) {
  if (!o.accessor)
    return () => Array.isArray(o.range) ? o.range[0] : wt(1)[0];
  if (o.type === "sequential") {
    const t = typeof o.range == "function" ? o.range : k.interpolateRgbBasis(o.range);
    return k.scaleSequential(o.domain, t);
  }
  return k.scaleOrdinal(o.domain, o.range);
}
function Zs(o) {
  return !o.accessor || o.type === "constant" ? () => o.range[0] : Ct(o.type).domain(o.domain).range(o.range);
}
class on {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...Us }, this.axes = null, this.layers = [], this.highlight = new Vt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = Nt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: n } = Ws(this.options.data, this.options);
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
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new Ft(this.container);
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
    if (i.top ?? (i.top = s ? Dt(t) : 16), i.right ?? (i.right = 16), i.bottom ?? (i.bottom = t + 8 + mt(t, e.title)), i.left == null) {
      const a = me(n, this._viewDomain.y, [0, 1]), r = Zt(a, n).map(n.format), l = dt(r, t * Ys, this.container);
      i.left = (s ? 0 : mt(t, n.title)) + l + 8;
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
      x: me(n, r.x, [l, t - l]),
      y: me(s, r.y, [e - l, l]),
      color: Ks(i),
      radius: Zs(a)
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
      Ht(k.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      Ht(k.axisLeft(this.scales.y), i).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      Ht(k.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(Ht(k.axisLeft(this.scales.y), i).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + a.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), Qt(i) ? de(this.titleY, i.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -a.left + r + 2).text(i.title ?? "");
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
      return a.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(Ht(k.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
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
      i === "color" && e.color || a.accessor && n.push([F(a, i), a.format(a.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, n, e) : n;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const Qs = { ...Ze, context: null }, Js = { ...Qe, field: "value" };
function to(o) {
  const t = [...o].sort(k.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = k.quantile(t, 0.25), n = k.quantile(t, 0.5), s = k.quantile(t, 0.75), i = s - e, a = t.filter((h) => h >= e - 1.5 * i && h <= s + 1.5 * i), r = Math.min(a.length ? a[0] : t[0], e), l = Math.max(a.length ? a[a.length - 1] : t[t.length - 1], s);
  return { q1: e, median: n, q3: s, min: r, max: l, mean: k.mean(t) };
}
function eo(o, t) {
  const e = [], n = [];
  for (const s of o) {
    const i = t(s);
    if (i == null || i === "") continue;
    const a = Number(i);
    Number.isFinite(a) && (e.push(s), n.push(a));
  }
  return { records: e, values: n };
}
function so(o = [], t = {}) {
  const e = t.axis ?? {}, n = ss(e, t.orientation !== "vertical"), s = q(Qs, n.category), i = q(Js, n.value), a = q(Je, e.group), r = q(ts, e.color), l = os(s.context), h = (f, d, w) => {
    const { records: _, values: m } = eo(w, i.accessor), x = to(m), A = w[0];
    return {
      group: f,
      label: d,
      context: l && A ? l(A) ?? null : null,
      count: m.length,
      records: _,
      values: m,
      stats: x,
      outliers: m.map((M, S) => S).filter((M) => m[M] < x.min || m[M] > x.max),
      color: r.accessor && A ? r.accessor(A) ?? null : null
    };
  };
  let p;
  if (a.accessor) {
    const f = k.group(o, a.accessor, s.accessor);
    a.domain = lt(a.domain, f.keys()), p = a.domain.flatMap((d) => {
      const w = f.get(d) ?? /* @__PURE__ */ new Map();
      return lt(s.domain, w.keys()).filter((m) => w.has(m)).map((m) => h(d, m, w.get(m)));
    });
  } else {
    const f = k.group(o, s.accessor);
    p = lt(s.domain, f.keys()).map(
      (d) => h(null, d, f.get(d) ?? [])
    );
  }
  if (s.domain = [...new Set(p.map((f) => f.label))], s.tickValues = Ae(s), i.domain ?? (i.domain = he(i.type, Rt(p.flatMap((f) => f.values)))), r.accessor) {
    const f = p.map((d) => d.color).filter((d) => d != null);
    r.domain = lt(r.domain, f), r.range ?? (r.range = wt(r.domain.length));
  }
  return { axes: { category: s, value: i, group: a, color: r }, boxes: p };
}
const Be = "rgba(0,0,0,0.45)", ye = "rgba(0,0,0,0.6)", oo = {
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
}, no = 0.35, io = 0.55, ao = "rgba(0,0,0,0.87)", xe = 2, se = 2.5, De = 0.45, ro = 0.9;
function lo(o) {
  const t = Math.sin((o + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class nn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...oo, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = k.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const n = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = n.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = n.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Ft(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: n, points: s, showCounts: i, threshold: a, rangePadding: r, border: l } = this.options, h = this.options.orientation !== "vertical", p = this.svg.node(), f = Nt(this.options.fontSize);
    this.tooltip.fontSize(f), this._leave();
    const { axes: d, boxes: w } = so(this.options.data, this.options), { category: _, value: m, group: x, color: A } = d, M = !!x.accessor, S = _.format ?? String, z = x.format ?? String, B = m.format ?? k.format(".3~f"), E = (u) => u.context != null ? `${u.context} / ` : "", H = (u) => i ? ` (n=${u.count})` : "", G = (u) => E(u) + S(u.label) + H(u), j = (u) => (M ? `${z(u.group)} / ` : "") + G(u), Q = new Set(_.tickValues ?? _.domain), U = Ct(m.type).domain(m.domain), Y = Zt(U, m), V = m.format ?? U.tickFormat(m.ticks ?? void 0), K = (a == null ? void 0 : a.value) != null && a.value >= Math.min(...m.domain) && a.value <= Math.max(...m.domain), c = K && a.label ? a.label : null, L = _.showTicks !== !1, b = m.showTicks !== !1, y = M && x.showTicks !== !1 ? x.position : null, v = y === "inline", $ = y === "axis", R = ls(w, {
      grouped: M,
      padding: h ? as : is,
      groupPadding: n,
      headingLanes: v
    }), { lanes: ot, totalSteps: W } = R, J = M ? x.domain.map(z) : [], [nt, ut] = [re(_), re(m)], [tt, yt] = h ? [ut, nt] : [nt, ut], pt = !!yt && Qt(h ? _ : m), $t = pt ? 0 : mt(f, yt), D = dt(J, f, p, 600), ft = Math.max(
      L ? dt(w.map(G), f, p) : 0,
      v ? D : 0
    ), Mt = L || v, it = y === "outside" ? f + ns : 0;
    let I, at, rt = !1, ct;
    if (h)
      ct = Mt ? ft + Pt : 0, I = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(c ? 2 * f + 8 : f, pt ? Dt(f) : 0),
        right: 16 + it,
        bottom: (b ? f + 16 : 8) + mt(f, tt),
        left: $t + ct + ($ ? D + Pt : 0)
      }, at = I.top + (M ? W : ot.length) * e + I.bottom;
    else {
      I = {
        top: Math.max(f, pt ? Dt(f) : 0) + it,
        // The threshold label to the right of the plot
        right: 16 + (c ? dt([c], f, p) + 6 : 0),
        bottom: 0,
        // below
        left: $t + (b ? dt(Y.map(V), f, p) + Pt : 0)
      };
      const u = Mt ? cs({
        fontSize: f,
        labelWidth: ft,
        totalSteps: W,
        firstFraction: R.firstFraction,
        width: t,
        left: I.left,
        right: I.right
      }) : { tilt: !1, depth: 0, extra: 0, left: I.left };
      rt = u.tilt, ct = u.depth, I.bottom = ct + ($ ? At + 3 + f : 0) + 15 + mt(f, tt), I.left = u.left, at = this.options.height + u.extra;
    }
    const gt = t - I.left - I.right, g = at - I.top - I.bottom, C = rs(h, gt, g), { at: P, catExtent: et, outward: st } = C, { bandwidth: ht, spans: Gt } = R.place(_.range || [0, et]), N = U.range(
      m.range || (h ? [r, gt - r] : [g - r, r])
    ), Jt = $e(A), { highlight: kt } = this, qt = (u, O) => kt.includes(u.records[O], { color: u.color }, u), jt = new Map(
      w.map((u) => [u, !kt.active || u.records.some((O, X) => qt(u, X))])
    ), T = (u) => Jt(u.color), Z = (u) => jt.get(u) ? T(u) : _t, bt = (u) => jt.get(u) ? A.accessor ? ao : T(u) : _t, pe = A.accessor ? io : no, Ot = w.filter((u) => u.count), Te = (u, O, X) => {
      const [Lt, St] = P(X, N(u.values[O]));
      return { box: u, index: O, record: u.records[O], value: u.values[O], x: Lt, y: St, lit: qt(u, O) };
    }, Xt = Ot.flatMap(
      (u) => s ? u.values.map((O, X) => Te(u, X, u.pos + lo(X) * ht / 2)) : u.outliers.map((O) => Te(u, O, u.pos))
    ), ys = k.group(Xt, (u) => u.box), ze = (u) => u.lit ? T(u.box) : _t;
    this.root.style("max-width", `${t}px`);
    const xs = Ot.map((u) => `${j(u)}: median ${B(u.stats.median)}`).join("; "), fe = this.svg.attr("viewBox", `0 0 ${t} ${at}`).attr(
      "aria-label",
      `Box plot of ${F(m, "value")} by ${F(_, "category")}` + (M ? ` within ${F(x, "group")}` : "") + `. ${xs}`
    );
    fe.selectAll("*").remove();
    const xt = fe.append("g").attr("transform", `translate(${I.left},${I.top})`);
    hs(xt, C, N, Y), b && ds(xt, C, N, { fontSize: f, tickValues: Y, format: V }), us(xt, C, l);
    const _s = y && !v ? {
      spans: Gt,
      position: y,
      across: y === "outside" ? h ? gt + I.right - f : -I.top + f : C.axisAcross + st * (ct + At + 3)
    } : null;
    if (ps(xt, C, ot, {
      fontSize: f,
      ticked: (u) => L && Q.has(u.label),
      // A box's label in pieces, so the context and count are lighter
      label: (u, O) => {
        O.context != null && u.append("tspan").attr("fill", Be).text(E(O)), u.append("tspan").text(S(O.label)), i && u.append("tspan").attr("fill", Be).text(H(O));
      },
      heading: z,
      tilt: rt,
      groups: _s
    }), K) {
      const u = N(a.value), [O, X] = P(0, u), [Lt, St] = P(et, u);
      if (xt.append("line").attr("x1", O).attr("y1", X).attr("x2", Lt).attr("y2", St).attr("stroke", ue).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), c) {
        const [Wt, Ut] = P(h ? -6 : et + 6, u);
        xt.append("text").attr("x", Wt).attr("y", Ut).attr("text-anchor", h ? "middle" : "start").attr("dy", h ? null : "0.32em").attr("font-size", f).attr("fill", ye).text(c);
      }
    }
    const Et = xt.append("g").selectAll("g").data(Ot).join("g").attr("stroke", Z).attr("fill", Z);
    this.drawPoints(s ? Xt : [], {
      width: t,
      height: at,
      offset: [I.left, I.top],
      color: ze,
      emphasis: kt.active
    }), It(
      Et.append("line"),
      (u) => P(u.pos, N(u.stats.min)),
      (u) => P(u.pos, N(u.stats.max))
    ), It(
      Et.selectAll(".cap").data((u) => [u.stats.min, u.stats.max].map((O) => ({ pos: u.pos, v: O }))).join("line").attr("class", "cap"),
      (u) => P(u.pos - ht / 4, N(u.v)),
      (u) => P(u.pos + ht / 4, N(u.v))
    );
    const te = (u) => {
      const O = N(u.stats.q1), X = N(u.stats.q3), [Lt, St] = P(u.pos - ht / 2, Math.min(O, X)), [Wt, Ut] = P(ht, Math.max(1, Math.abs(X - O)));
      return { x: Lt, y: St, w: Wt, h: Ut };
    };
    Et.append("rect").attr("x", (u) => te(u).x).attr("y", (u) => te(u).y).attr("width", (u) => te(u).w).attr("height", (u) => te(u).h).attr("fill-opacity", pe), It(
      Et.append("line"),
      (u) => P(u.pos - ht / 2, N(u.stats.median)),
      (u) => P(u.pos + ht / 2, N(u.stats.median))
    ).attr("stroke", bt).attr("stroke-width", 2), Et.append("circle").attr("cx", (u) => P(u.pos, N(u.stats.mean))[0]).attr("cy", (u) => P(u.pos, N(u.stats.mean))[1]).attr("r", 3).attr("fill", bt), s || Et.selectAll(".outlier").data((u) => ys.get(u) ?? []).join("circle").attr("class", "outlier").attr("cx", (u) => u.x).attr("cy", (u) => u.y).attr("r", se).attr("fill", "#fff").attr("stroke", ze), this.hoverRing = xt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? xe : se) + 2.5).style("display", "none");
    const Ce = (u) => fe.append("text").attr("text-anchor", "middle").attr("font-size", f).attr("font-weight", 600).attr("fill", ye).text(u || "");
    Ce(tt).attr("x", I.left + gt / 2).attr("y", at - f), pt ? de(xt, yt, { fontSize: f, color: ye }) : Ce(yt).attr(
      "transform",
      `translate(${f + 2},${I.top + g / 2}) rotate(-90)`
    ), zt(this.legend, Jt, {
      ...A,
      title: A.accessor ? es(A) : null,
      fontSize: f,
      highlight: this.highlight
    });
    const { tooltip: ee } = this.options, Oe = F(_, "category"), vs = (u) => {
      const [O, X] = [N(u.stats.min), N(u.stats.max)];
      return [Math.min(O, X) - se, Math.max(O, X) + se];
    };
    this.hit = {
      margin: I,
      marks: Xt,
      delaunay: Xt.length ? k.Delaunay.from(
        Xt,
        (u) => u.x,
        (u) => u.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (u, O) => {
        const [X, Lt] = P(u, O);
        return Ot.find((St) => {
          const [Wt, Ut] = vs(St);
          return Math.abs(X - St.pos) <= ht / 2 && Lt >= Wt && Lt <= Ut;
        }) ?? null;
      },
      markRows: (u) => {
        const O = [
          [Oe, j(u.box)],
          [F(m, "value"), B(u.value)]
        ];
        return ee ? ee(u.record, O, u.box) : O;
      },
      boxRows: (u) => {
        const O = u.stats, X = [
          [Oe, j(u)],
          ["n", String(u.count)],
          ["Median", B(O.median)],
          ["Mean", B(O.mean)],
          ["Q1", B(O.q1)],
          ["Q3", B(O.q3)],
          ["Whiskers", `${B(O.min)} to ${B(O.max)}`]
        ];
        return ee ? ee(null, X, u) : X;
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
    const p = (m, x, A) => {
      l.globalAlpha = A, l.fillStyle = m, l.beginPath();
      for (const M of x) {
        const S = M.x + s, z = M.y + i;
        l.moveTo(S + xe, z), l.arc(S, z, xe, 0, 2 * Math.PI);
      }
      l.fill();
    }, f = k.group(t, a), d = f.get(_t);
    d && p(_t, d, De);
    for (const [m, x] of f)
      m !== _t && p(m, x, r ? ro : De);
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
const co = { field: null, title: null, format: null }, ho = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, uo = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function vt(o) {
  return o != null && o !== "" && !(typeof o == "number" && Number.isNaN(o));
}
function po(o = [], t = {}) {
  var f;
  const e = t.axis ?? {}, n = (t.levels ?? []).map((d) => q(co, d)), s = q(ho, e.color), i = q(uo, e.radius), a = s.accessor ?? i.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const d of o) {
    const w = [];
    for (const A of n) {
      const M = (f = A.accessor) == null ? void 0 : f.call(A, d);
      if (!vt(M)) break;
      w.push(M);
    }
    if (!w.length) continue;
    let _ = r;
    w.forEach((A, M) => {
      const S = JSON.stringify(w.slice(0, M + 1));
      let z = l.get(S);
      z || (z = { key: S, label: A, level: M, record: null, children: [] }, l.set(S, z), _.children.push(z)), _ = z;
    });
    const m = _, x = a && !vt(a(m.record ?? {})) && vt(a(d));
    (!m.record || x) && (m.record = d);
  }
  const h = [...l.values()].filter((d) => d !== r);
  for (const d of h)
    d.value = d.record && a ? a(d.record) : null, d.empty = !d.record || a != null && !vt(d.value), d.colorValue = !d.empty && s.accessor ? s.accessor(d.record) : null, d.radiusValue = !d.empty && i.accessor ? i.accessor(d.record) : null;
  const p = h.filter((d) => !d.empty);
  if (s.accessor) {
    const d = p.map((w) => w.colorValue).filter(vt);
    s.type === "sequential" ? (s.domain ?? (s.domain = Rt(d)), s.range ?? (s.range = k.interpolateViridis)) : (s.domain = lt(s.domain, d), s.range ?? (s.range = wt(s.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Rt(p.map((d) => d.radiusValue).filter(vt)))), { axes: { color: s, radius: i }, levels: n, root: r, nodes: h };
}
const Ve = 12, Ne = 2, fo = 1.5, go = 2.9, mo = 7, _e = 1.1, Fe = 4, Kt = 2, yo = 3.3, xo = 0.92, _o = (o) => typeof o == "number" ? k.format(".2f")(o) : String(o), vo = { color: "#b4b2aa", radius: 6, label: null }, wo = {
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
function ko(o, t, e, n) {
  const s = String(o ?? "").split(/\s+/).filter(Boolean), i = [];
  let a = "";
  for (const r of s) {
    const l = a ? `${a} ${r}` : r;
    a && Bt(l, e, n) > t ? (i.push(a), a = r) : a = l;
  }
  return a && i.push(a), i;
}
function bo(o) {
  const { l: t } = k.lab(o);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class an {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...wo, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Ft(t), this.draw(), this._observeResize();
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
    var gt;
    const { columnWidth: t, hover: e, valueLabel: n } = this.options, s = { ...vo, ...this.options.empty }, i = Nt(this.options.fontSize), a = this.options.width ?? (this.container.clientWidth || 640);
    this.width = a;
    const r = this.svg.node();
    this.tooltip.fontSize(i), this._setHovered(null);
    const { axes: l, levels: h, root: p } = po(this.options.data, this.options);
    this.axes = l;
    const f = $e(l.color), d = ks(l.radius), w = l.color.accessor ? l.color : l.radius, _ = w.format ?? _o, m = (g) => {
      const C = h[g.level];
      return C != null && C.format ? C.format(g.label) : g.label;
    };
    this._tooltipRows = (g) => {
      const C = [[F(h[g.level], `Level ${g.level + 1}`), m(g)]];
      return vt(g.value) && C.push([F(w, "value"), _(g.value)]), this.options.tooltip ? this.options.tooltip(g, C) : C;
    };
    const x = (g) => g.empty ? s.color : l.color.accessor ? f(g.colorValue) : f(), A = (g) => g.empty || l.radius.accessor && l.radius.type !== "constant" && !vt(g.radiusValue) ? s.radius : d(g.radiusValue), M = (g) => this.highlight.color(x(g.data), g.data, { color: g.data.colorValue }), S = k.hierarchy(p), z = S.descendants().filter((g) => g.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      f,
      i,
      s,
      z.some((g) => g.data.empty)
    ), !z.length) {
      this.svg.attr("width", a).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const B = _e * i, E = /* @__PURE__ */ new Map();
    for (const g of z) {
      const C = h[g.depth - 1], P = C != null && C.format ? C.format(g.data.label) : g.data.label, et = ko(P, mo * i, i, r), st = Math.max(0, ...et.map((ht) => Bt(ht, i, r)));
      E.set(g, { lines: et, width: st, height: et.length * B });
    }
    const H = (g) => A(g.data), G = (g) => Math.max(H(g), E.get(g).height / 2), j = (g) => H(g) + Fe + E.get(g).width + Kt, Q = S.height || 1, U = z.filter((g) => !g.children && g.depth === Q), Y = Math.ceil(Math.max(0, ...U.map(j))), V = Math.max(0, ...z.filter((g) => g.depth === 1 && g.children).map(j));
    let K = Ve, c = t;
    for (let g = 0; g < 3; g += 1)
      c = Math.max(1, Math.min(t, (a - K - Y) / Q)), K = Math.max(Ve, Math.ceil(V - c));
    const L = Math.round(go * i);
    k.tree().nodeSize([1, c]).separation((g, C) => {
      const P = G(g) + G(C) + Ne;
      return g.parent === C.parent ? P : P * fo;
    })(S);
    let b = 1 / 0, y = -1 / 0, v = 0;
    for (const g of z)
      b = Math.min(b, g.x), y = Math.max(y, g.x), v = Math.max(v, G(g));
    const $ = y - b, R = v + Ne, ot = L + $ + R * 2, W = Math.max(this.options.height, Math.ceil(ot)), J = W - L, nt = $ > 0 ? (J - R * 2) / $ : 1, ut = L + (J - $ * nt) / 2, tt = (g) => (g.x - b) * nt, yt = (g) => g.depth === 0 ? c - yo * i : g.y, pt = this.svg.attr("width", a).attr("height", W).attr("font-size", i).attr(
      "aria-label",
      `Tree of ${h.map((g, C) => F(g, `level ${C + 1}`)).join(", then ")}: ${z.length} nodes`
    ), $t = pt.append("g").attr("transform", `translate(${K},${ut})`), D = /* @__PURE__ */ new Map();
    for (const g of z)
      D.has(g.depth) || D.set(g.depth, ((gt = h[g.depth - 1]) == null ? void 0 : gt.title) ?? "");
    pt.append("g").selectAll("text").data([...D]).join("text").attr("class", "tree-chart__header").attr("x", ([g]) => K + g * c).attr("y", i * 1.2).attr("text-anchor", "middle").text(([, g]) => g);
    const ft = S.children.length > 1, Mt = $t.append("g").selectAll("path").data(S.links().filter((g) => ft || g.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", k.linkHorizontal().x(yt).y(tt)), it = $t.append("g").selectAll("g").data(z).join("g").attr("class", "tree-chart__node").attr("transform", (g) => `translate(${g.y},${tt(g)})`);
    it.append("circle").attr("class", "tree-chart__circle").attr("r", H).attr("fill", M), n && it.filter((g) => vt(g.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", i * xo).attr("fill", (g) => bo(M(g))).text((g) => _(g.data.value));
    const I = (g) => !!g.children, at = (g) => (I(g) ? -1 : 1) * (H(g) + Fe), rt = it.filter((g) => E.get(g).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (g) => g.data.empty);
    rt.append("rect").attr("class", "tree-chart__label-bg").attr("x", (g) => {
      const { width: C } = E.get(g);
      return (I(g) ? at(g) - C : at(g)) - Kt;
    }).attr("y", (g) => -E.get(g).height / 2 - Kt).attr("width", (g) => E.get(g).width + Kt * 2).attr("height", (g) => E.get(g).height + Kt * 2), rt.append("text").attr("text-anchor", (g) => I(g) ? "end" : "start").selectAll("tspan").data((g) => {
      const { lines: C } = E.get(g);
      return C.map((P, et) => ({ line: P, i: et, count: C.length, x: at(g) }));
    }).join("tspan").attr("x", (g) => g.x).attr(
      "dy",
      (g) => g.i === 0 ? `${0.31 - (g.count - 1) * _e / 2}em` : `${_e}em`
    ).text((g) => g.line);
    const ct = (g) => {
      if (!e) return;
      const C = g && /* @__PURE__ */ new Set([...g.ancestors(), ...g.descendants()]), P = (st) => !!(C && C.has(st)), et = (st) => P(st.source) && P(st.target);
      it.classed("tree-chart__node--off-path", (st) => !!C && !P(st)), Mt.classed("tree-chart__link--on-path", et).classed("tree-chart__link--off-path", (st) => !!C && !et(st));
    };
    it.on("mouseenter", (g, C) => {
      ct(C), this._setHovered(C.data, g);
    }).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => {
      ct(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, n, s) {
    const i = this.axes.color, a = { ...i, title: i.accessor ? i.title : null, fontSize: e };
    if (i.type === "sequential" ? Ms(this.legend, t, a) : zt(this.legend, t, { ...a, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !n.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", n.color), r.append("span").text(n.label);
  }
}
function Ge(o, t) {
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
function Lo(o, t) {
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
function ve(o, t) {
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
function So(o, t) {
  return o.sourceLinks.length ? o.depth : t - 1;
}
function oe(o) {
  return function() {
    return o;
  };
}
function qe(o, t) {
  return ce(o.source, t.source) || o.index - t.index;
}
function je(o, t) {
  return ce(o.target, t.target) || o.index - t.index;
}
function ce(o, t) {
  return o.y0 - t.y0;
}
function we(o) {
  return o.value;
}
function Ao(o) {
  return o.index;
}
function $o(o) {
  return o.nodes;
}
function Mo(o) {
  return o.links;
}
function Xe(o, t) {
  const e = o.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function We({ nodes: o }) {
  for (const t of o) {
    let e = t.y0, n = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = n + s.width / 2, n += s.width;
  }
}
function To() {
  let o = 0, t = 0, e = 1, n = 1, s = 24, i = 8, a, r = Ao, l = So, h, p, f = $o, d = Mo, w = 6;
  function _() {
    const c = { nodes: f.apply(null, arguments), links: d.apply(null, arguments) };
    return m(c), x(c), A(c), M(c), B(c), We(c), c;
  }
  _.update = function(c) {
    return We(c), c;
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
    return arguments.length ? (d = typeof c == "function" ? c : oe(c), _) : d;
  }, _.linkSort = function(c) {
    return arguments.length ? (p = c, _) : p;
  }, _.size = function(c) {
    return arguments.length ? (o = t = 0, e = +c[0], n = +c[1], _) : [e - o, n - t];
  }, _.extent = function(c) {
    return arguments.length ? (o = +c[0][0], e = +c[1][0], t = +c[0][1], n = +c[1][1], _) : [[o, t], [e, n]];
  }, _.iterations = function(c) {
    return arguments.length ? (w = +c, _) : w;
  };
  function m({ nodes: c, links: L }) {
    for (const [y, v] of c.entries())
      v.index = y, v.sourceLinks = [], v.targetLinks = [];
    const b = new Map(c.map((y, v) => [r(y, v, c), y]));
    for (const [y, v] of L.entries()) {
      v.index = y;
      let { source: $, target: R } = v;
      typeof $ != "object" && ($ = v.source = Xe(b, $)), typeof R != "object" && (R = v.target = Xe(b, R)), $.sourceLinks.push(v), R.targetLinks.push(v);
    }
    if (p != null)
      for (const { sourceLinks: y, targetLinks: v } of c)
        y.sort(p), v.sort(p);
  }
  function x({ nodes: c }) {
    for (const L of c)
      L.value = L.fixedValue === void 0 ? Math.max(ve(L.sourceLinks, we), ve(L.targetLinks, we)) : L.fixedValue;
  }
  function A({ nodes: c }) {
    const L = c.length;
    let b = new Set(c), y = /* @__PURE__ */ new Set(), v = 0;
    for (; b.size; ) {
      for (const $ of b) {
        $.depth = v;
        for (const { target: R } of $.sourceLinks)
          y.add(R);
      }
      if (++v > L) throw new Error("circular link");
      b = y, y = /* @__PURE__ */ new Set();
    }
  }
  function M({ nodes: c }) {
    const L = c.length;
    let b = new Set(c), y = /* @__PURE__ */ new Set(), v = 0;
    for (; b.size; ) {
      for (const $ of b) {
        $.height = v;
        for (const { source: R } of $.targetLinks)
          y.add(R);
      }
      if (++v > L) throw new Error("circular link");
      b = y, y = /* @__PURE__ */ new Set();
    }
  }
  function S({ nodes: c }) {
    const L = Ge(c, (v) => v.depth) + 1, b = (e - o - s) / (L - 1), y = new Array(L);
    for (const v of c) {
      const $ = Math.max(0, Math.min(L - 1, Math.floor(l.call(null, v, L))));
      v.layer = $, v.x0 = o + $ * b, v.x1 = v.x0 + s, y[$] ? y[$].push(v) : y[$] = [v];
    }
    if (h) for (const v of y)
      v.sort(h);
    return y;
  }
  function z(c) {
    const L = Lo(c, (b) => (n - t - (b.length - 1) * a) / ve(b, we));
    for (const b of c) {
      let y = t;
      for (const v of b) {
        v.y0 = y, v.y1 = y + v.value * L, y = v.y1 + a;
        for (const $ of v.sourceLinks)
          $.width = $.value * L;
      }
      y = (n - y + a) / (b.length + 1);
      for (let v = 0; v < b.length; ++v) {
        const $ = b[v];
        $.y0 += y * (v + 1), $.y1 += y * (v + 1);
      }
      Y(b);
    }
  }
  function B(c) {
    const L = S(c);
    a = Math.min(i, (n - t) / (Ge(L, (b) => b.length) - 1)), z(L);
    for (let b = 0; b < w; ++b) {
      const y = Math.pow(0.99, b), v = Math.max(1 - y, (b + 1) / w);
      H(L, y, v), E(L, y, v);
    }
  }
  function E(c, L, b) {
    for (let y = 1, v = c.length; y < v; ++y) {
      const $ = c[y];
      for (const R of $) {
        let ot = 0, W = 0;
        for (const { source: nt, value: ut } of R.targetLinks) {
          let tt = ut * (R.layer - nt.layer);
          ot += V(nt, R) * tt, W += tt;
        }
        if (!(W > 0)) continue;
        let J = (ot / W - R.y0) * L;
        R.y0 += J, R.y1 += J, U(R);
      }
      h === void 0 && $.sort(ce), G($, b);
    }
  }
  function H(c, L, b) {
    for (let y = c.length, v = y - 2; v >= 0; --v) {
      const $ = c[v];
      for (const R of $) {
        let ot = 0, W = 0;
        for (const { target: nt, value: ut } of R.sourceLinks) {
          let tt = ut * (nt.layer - R.layer);
          ot += K(R, nt) * tt, W += tt;
        }
        if (!(W > 0)) continue;
        let J = (ot / W - R.y0) * L;
        R.y0 += J, R.y1 += J, U(R);
      }
      h === void 0 && $.sort(ce), G($, b);
    }
  }
  function G(c, L) {
    const b = c.length >> 1, y = c[b];
    Q(c, y.y0 - a, b - 1, L), j(c, y.y1 + a, b + 1, L), Q(c, n, c.length - 1, L), j(c, t, 0, L);
  }
  function j(c, L, b, y) {
    for (; b < c.length; ++b) {
      const v = c[b], $ = (L - v.y0) * y;
      $ > 1e-6 && (v.y0 += $, v.y1 += $), L = v.y1 + a;
    }
  }
  function Q(c, L, b, y) {
    for (; b >= 0; --b) {
      const v = c[b], $ = (v.y1 - L) * y;
      $ > 1e-6 && (v.y0 -= $, v.y1 -= $), L = v.y0 - a;
    }
  }
  function U({ sourceLinks: c, targetLinks: L }) {
    if (p === void 0) {
      for (const { source: { sourceLinks: b } } of L)
        b.sort(je);
      for (const { target: { targetLinks: b } } of c)
        b.sort(qe);
    }
  }
  function Y(c) {
    if (p === void 0)
      for (const { sourceLinks: L, targetLinks: b } of c)
        L.sort(je), b.sort(qe);
  }
  function V(c, L) {
    let b = c.y0 - (c.sourceLinks.length - 1) * a / 2;
    for (const { target: y, width: v } of c.sourceLinks) {
      if (y === L) break;
      b += v + a;
    }
    for (const { source: y, width: v } of L.targetLinks) {
      if (y === c) break;
      b -= v;
    }
    return b;
  }
  function K(c, L) {
    let b = L.y0 - (L.targetLinks.length - 1) * a / 2;
    for (const { source: y, width: v } of L.targetLinks) {
      if (y === c) break;
      b += v + a;
    }
    for (const { target: y, width: v } of c.sourceLinks) {
      if (y === L) break;
      b -= v;
    }
    return b;
  }
  return _;
}
var be = Math.PI, Le = 2 * be, Tt = 1e-6, zo = Le - Tt;
function Se() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function ms() {
  return new Se();
}
Se.prototype = ms.prototype = {
  constructor: Se,
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
    else if (f > Tt) if (!(Math.abs(p * r - l * h) > Tt) || !s)
      this._ += "L" + (this._x1 = o) + "," + (this._y1 = t);
    else {
      var d = e - i, w = n - a, _ = r * r + l * l, m = d * d + w * w, x = Math.sqrt(_), A = Math.sqrt(f), M = s * Math.tan((be - Math.acos((_ + f - m) / (2 * x * A))) / 2), S = M / A, z = M / x;
      Math.abs(S - 1) > Tt && (this._ += "L" + (o + S * h) + "," + (t + S * p)), this._ += "A" + s + "," + s + ",0,0," + +(p * d > h * w) + "," + (this._x1 = o + z * r) + "," + (this._y1 = t + z * l);
    }
  },
  arc: function(o, t, e, n, s, i) {
    o = +o, t = +t, e = +e, i = !!i;
    var a = e * Math.cos(n), r = e * Math.sin(n), l = o + a, h = t + r, p = 1 ^ i, f = i ? n - s : s - n;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + h : (Math.abs(this._x1 - l) > Tt || Math.abs(this._y1 - h) > Tt) && (this._ += "L" + l + "," + h), e && (f < 0 && (f = f % Le + Le), f > zo ? this._ += "A" + e + "," + e + ",0,1," + p + "," + (o - a) + "," + (t - r) + "A" + e + "," + e + ",0,1," + p + "," + (this._x1 = l) + "," + (this._y1 = h) : f > Tt && (this._ += "A" + e + "," + e + ",0," + +(f >= be) + "," + p + "," + (this._x1 = o + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(o, t, e, n) {
    this._ += "M" + (this._x0 = this._x1 = +o) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +n + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function Ue(o) {
  return function() {
    return o;
  };
}
function Co(o) {
  return o[0];
}
function Oo(o) {
  return o[1];
}
var Eo = Array.prototype.slice;
function Ho(o) {
  return o.source;
}
function Ro(o) {
  return o.target;
}
function Po(o) {
  var t = Ho, e = Ro, n = Co, s = Oo, i = null;
  function a() {
    var r, l = Eo.call(arguments), h = t.apply(this, l), p = e.apply(this, l);
    if (i || (i = r = ms()), o(i, +n.apply(this, (l[0] = h, l)), +s.apply(this, l), +n.apply(this, (l[0] = p, l)), +s.apply(this, l)), r) return i = null, r + "" || null;
  }
  return a.source = function(r) {
    return arguments.length ? (t = r, a) : t;
  }, a.target = function(r) {
    return arguments.length ? (e = r, a) : e;
  }, a.x = function(r) {
    return arguments.length ? (n = typeof r == "function" ? r : Ue(+r), a) : n;
  }, a.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : Ue(+r), a) : s;
  }, a.context = function(r) {
    return arguments.length ? (i = r ?? null, a) : i;
  }, a;
}
function Io(o, t, e, n, s) {
  o.moveTo(t, e), o.bezierCurveTo(t = (t + n) / 2, e, t, s, n, s);
}
function Bo() {
  return Po(Io);
}
function Do(o) {
  return [o.source.x1, o.y0];
}
function Vo(o) {
  return [o.target.x0, o.y1];
}
function No() {
  return Bo().source(Do).target(Vo);
}
const Fo = "(blank)", Go = { field: null, title: null, domain: null, format: null, sort: "descending" }, qo = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, ne = (o, t) => {
  const e = o == null ? void 0 : o(t);
  return e == null || e === "" ? Fo : String(e);
};
function jo(o, t) {
  const e = [...o.keys()];
  t.sort === "descending" ? e.sort((s, i) => o.get(i) - o.get(s)) : t.sort === "ascending" && e.sort((s, i) => o.get(s) - o.get(i));
  const n = (t.domain ?? []).filter((s) => o.has(s));
  return [...n, ...e.filter((s) => !n.includes(s))];
}
function Xo(o = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((m) => q(Go, m)), n = q(qo, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((m) => m.field != null && m.field === n.field), i = Math.max(0, s), a = e.map((m, x) => {
    const A = k.rollup(
      o,
      (S) => S.length,
      (S) => ne(m.accessor, S)
    ), M = jo(A, m).map((S, z) => ({
      id: -1,
      dim: x,
      index: z,
      key: S,
      label: m.format ? m.format(S) : S,
      count: A.get(S)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: x,
      nodes: M,
      byKey: new Map(M.map((S) => [S.key, S]))
    };
  }), r = a.flatMap((m) => m.nodes);
  r.forEach((m, x) => {
    m.id = x;
  });
  const l = (m) => e.map((x) => ne(x.accessor, m)).join("\0"), h = k.rollups(o, (m) => m, l).map(([, m]) => {
    const x = e.map((M) => ne(M.accessor, m[0])), A = x.map((M, S) => a[S].byKey.get(M));
    return {
      keys: x,
      labels: A.map((M) => M.label),
      nodes: A,
      records: m,
      value: m.length
    };
  }), p = [i, ...e.map((m, x) => x).filter((m) => m !== i)];
  h.sort((m, x) => {
    for (const A of p) {
      const M = m.nodes[A].index - x.nodes[A].index;
      if (M) return M;
    }
    return 0;
  });
  const f = [];
  for (const m of h)
    for (let x = 1; x < e.length; x++)
      f.push({
        source: m.nodes[x - 1].id,
        target: m.nodes[x].id,
        pair: x - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[i]
      });
  const d = a[i], w = e[i];
  return w && (n.field ?? (n.field = w.field), n.accessor = (m) => ne(w.accessor, m), n.format ?? (n.format = w.format)), n.domain = lt(
    n.domain,
    d ? d.nodes.map((m) => m.key) : []
  ), n.range ?? (n.range = wt(n.domain.length)), {
    axes: { color: n },
    dimensions: e,
    colorIndex: i,
    columns: a.map(({ title: m, index: x, nodes: A }) => ({
      title: m,
      index: x,
      nodes: A
    })),
    nodes: r,
    paths: h,
    links: f,
    total: o.length
  };
}
const Wo = 2.3, Ye = 5, Ke = 6, Uo = 2, ie = 6, ae = 0.92, Yo = "#333", Ko = {
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
class rn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...Ko, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = k.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Ft(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: n, hover: s, unit: i } = this.options, a = Nt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(a);
    const l = Xo(this.options.data, this.options);
    this.prepared = l;
    const { axes: h, columns: p, colorIndex: f, total: d } = l, w = $e(h.color), _ = (c) => this.highlight.includes(c, { color: c.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(w, a), !l.nodes.length || p.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), x = p[p.length - 1], A = (c) => Bt(`${c.label} `, a, m) + Bt(c.count, a * ae, m), M = Math.ceil(
      Math.max(
        Bt(x.title, a * ae, m, 600),
        ...x.nodes.map(A)
      )
    ) + Ke + Uo, S = Math.round(Wo * a), z = Math.max(r - M, t * p.length), B = [
      [0, S + Ye],
      [z, S + this.options.height - Ye]
    ], E = To().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(B)({
      nodes: l.nodes.map((c) => ({ ...c })),
      links: l.links.map((c) => ({ ...c }))
    });
    n && Zo(E.nodes, p.length, B[0][1], B[1][1]);
    const H = No(), G = (c) => c.x1 + Ke, j = (c) => c.dim === f ? this.highlight.color(w(c.key), c, { color: c.key }) : !this.highlight.active || c.sourceLinks.some(_) || c.targetLinks.some(_) ? Yo : _t, Q = this.svg.attr("width", r).attr("height", S + this.options.height).attr("font-size", a).attr(
      "aria-label",
      `Parallel sets of ${d} ${i} across ${p.map((c) => c.title).join(", ")}`
    ), U = (c) => E.nodes.find((L) => L.dim === c.index);
    Q.append("g").selectAll("text").data(p.filter(U)).join("text").attr("class", "parallel-sets__header").attr("x", (c) => G(U(c))).attr("y", S - a * 0.9).attr("text-anchor", "start").attr("font-size", a * ae).text((c) => c.title);
    const Y = Q.append("g").attr("fill", "none").selectAll("path").data(E.links).join("path").attr("class", "parallel-sets__link").attr("d", H).attr("stroke", (c) => this.highlight.color(w(c.colorKey), c, { color: c.colorKey })).attr("stroke-width", (c) => Math.max(c.width, 1)), V = Q.append("g").selectAll("g").data(E.nodes).join("g").attr("class", "parallel-sets__node");
    V.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (c) => c.x0).attr("y", (c) => c.y0).attr("width", (c) => c.x1 - c.x0).attr("height", (c) => Math.max(c.y1 - c.y0, 1)).attr("fill", j), V.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (c) => c.x0 - ie).attr("y", (c) => c.y0 - ie / 2).attr("width", (c) => c.x1 - c.x0 + ie * 2).attr("height", (c) => Math.max(c.y1 - c.y0, 1) + ie), V.append("text").attr("class", "parallel-sets__label").attr("x", G).attr("y", (c) => (c.y0 + c.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((c) => `${c.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", a * ae).text((c) => c.count), s && this._bindHover(V, Y, E);
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
      const l = r.keys.slice(0, r.pair + 2), h = n.links.filter((d) => d.pair === r.pair && l.every((w, _) => d.keys[_] === w)).reduce((d, w) => d + w.value, 0), p = r.labels.slice(0, l.length), f = { type: "link", keys: l, labels: p, pair: r.pair, value: h };
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
    zt(this.legend, t, { ...n, fontSize: e, highlight: this.highlight });
  }
}
function Zo(o, t, e, n) {
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
  tn as BarChart,
  nn as BoxPlotChart,
  Ee as FONT_SIZES,
  Vt as Highlight,
  _t as MUTED_COLOR,
  rn as ParallelSetsChart,
  on as ScatterPlot,
  sn as StackedBarChart,
  Ft as Tooltip,
  an as TreeChart,
  le as barLabel,
  cs as bottomLabels,
  to as boxStats,
  Qo as categoryColors,
  rs as chartFrame,
  Jo as countBy,
  en as countByStacked,
  wt as defaultColors,
  ps as drawCategoryAxis,
  hs as drawGridlines,
  zt as drawLegend,
  us as drawPlotEdges,
  Ms as drawSequentialLegend,
  de as drawTopTitle,
  ds as drawValueAxis,
  vt as hasValue,
  ls as laneLayout,
  dt as maxTextWidth,
  Bt as measureText,
  Ls as prepareBarChart,
  so as prepareBoxPlotChart,
  Xo as prepareParallelSets,
  Ws as prepareScatterPlot,
  Bs as prepareStackedBarChart,
  po as prepareTreeChart,
  Nt as resolveFontSize,
  mt as titleLane,
  Qt as titleOnTop,
  Dt as topTitleLane
};
