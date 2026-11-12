import * as M from "d3";
const Ps = [
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
function Mt(n) {
  return n <= M.schemeTableau10.length ? M.schemeTableau10 : Ps;
}
function Xn(n, t) {
  const e = M.rollup(
    n,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), o = Array.from(e).sort((s, a) => a[1] - s[1]).map(([s]) => s);
  return { domain: o, range: Mt(o.length) };
}
const us = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, ds = {
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
}, ps = {
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
}, fs = {
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
function fe(n) {
  return n.showTitle === !1 ? null : n.title;
}
function gs(n) {
  return n.showTicks === !1 ? null : n.showTitle === !1 ? n.title == null ? null : "" : n.title;
}
function ms(n, t) {
  return {
    category: n.category ?? (t ? n.y : n.x),
    value: n.value ?? (t ? n.x : n.y)
  };
}
function xs(n) {
  return n == null ? null : typeof n == "function" ? n : (t) => t[n];
}
function ot(n, t = {}) {
  const e = { ...n, ...t };
  return e.accessor = xs(e.field), e;
}
function Q(n, t) {
  return n.title ?? (typeof n.field == "string" ? n.field : t);
}
function _t(n, t) {
  return [.../* @__PURE__ */ new Set([...n ?? [], ...t])];
}
function Pe(n) {
  var t;
  return ((t = n.tickValues) == null ? void 0 : t.filter((e) => n.domain.includes(e))) ?? null;
}
function Ft(n) {
  switch (n) {
    case "log":
      return M.scaleLog();
    case "sqrt":
      return M.scaleSqrt();
    default:
      return M.scaleLinear();
  }
}
function Ut(n, t = [0, 1]) {
  const [e, o] = M.extent(n);
  return e === void 0 ? t : e === o ? [e - 1, o + 1] : [e, o];
}
function xe(n, t, e) {
  return Ft(n).domain(t).nice(e ?? void 0).domain();
}
function oe(n, t) {
  return t.tickValues ? t.tickValues : n.ticks ? n.ticks(t.ticks ?? void 0) : n.domain();
}
function Gt(n, t) {
  return t.tickValues ? n.tickValues(t.tickValues) : t.ticks != null && n.ticks(t.ticks), t.format && n.tickFormat(t.format), n;
}
function ie(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : Mt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : M.interpolateRgbBasis(n.range);
    return M.scaleSequential(n.domain, t);
  }
  return M.scaleOrdinal(n.domain, n.range);
}
function Is(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : Ft(n.type).domain(n.domain).range(n.range);
}
const Bs = { ...ds, field: "count" };
function Un(n, t, { sort: e, group: o } = {}) {
  const s = (i) => (r) => r[i] || "(blank)", a = (i, r) => {
    const l = M.rollup(i, (d) => d.length, s(t)), c = Array.from(
      l,
      ([d, p]) => o == null ? { label: d, count: p } : { group: r, label: d, count: p }
    );
    return e === "descending" ? c.sort((d, p) => p.count - d.count) : e === "ascending" && c.sort((d, p) => d.count - p.count), c;
  };
  return o == null ? a(n) : Array.from(
    M.group(n, s(o)),
    ([i, r]) => a(r, i)
  ).flat();
}
function ge(n, t, e = "both") {
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
function Ds(n = [], t = {}) {
  const e = t.axis ?? {}, o = ms(e, t.orientation === "horizontal"), s = ot(us, o.category), a = ot(Bs, o.value), i = ot(ps, e.group), r = ot(fs, e.color), l = r.accessor ?? s.accessor, c = (u) => ({
    count: M.sum(u, a.accessor),
    color: l(u[0])
  });
  let d;
  if (i.accessor) {
    const u = M.rollup(n, c, i.accessor, s.accessor);
    i.domain = _t(i.domain, u.keys()), d = i.domain.flatMap((w) => {
      const _ = u.get(w) ?? /* @__PURE__ */ new Map();
      return _t(s.domain, _.keys()).filter((m) => _.has(m)).map((m) => ({ group: w, label: m, ..._.get(m) }));
    }), s.domain = [...new Set(d.map((w) => w.label))];
  } else {
    const u = M.rollup(n, c, s.accessor);
    s.domain = _t(s.domain, u.keys()), d = s.domain.map((w) => {
      var _, m;
      return {
        group: null,
        label: w,
        count: ((_ = u.get(w)) == null ? void 0 : _.count) ?? 0,
        color: ((m = u.get(w)) == null ? void 0 : m.color) ?? w
      };
    });
  }
  s.tickValues = Pe(s), a.domain ?? (a.domain = xe(a.type, [0, M.max(d, (u) => u.count) || 1], a.ticks)), r.domain = _t(
    r.domain,
    d.map((u) => u.color)
  ), r.range ?? (r.range = Mt(r.domain.length));
  const p = t.total ?? M.sum(d, (u) => u.count);
  return { axes: { category: s, value: a, group: i, color: r }, bars: d, total: p };
}
const Tt = "#cfcfcf";
class It {
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
    let a;
    o ? (a = new Set(s), a.has(e) ? a.delete(e) : a.add(e)) : a = s.size === 1 && s.has(e) ? /* @__PURE__ */ new Set() : /* @__PURE__ */ new Set([e]), a.size ? this.selection.set(t, a) : this.selection.delete(t), this._changed();
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
    for (const [s, a] of this.selection)
      if (!a.has(e[s])) return !1;
    return !0;
  }
  /** The color to draw a mark in: `base` when highlighted, MUTED_COLOR otherwise. */
  color(t, e, o, s) {
    return this.includes(e, o, s) ? t : Tt;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Pt = 6, Wt = 12, ys = 8, _s = 0.35, ws = 0.3, Te = "rgba(0,0,0,0.7)", ye = "rgba(0,0,0,0.5)", Ns = "rgba(0,0,0,0.08)";
function vs(n, t, e) {
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
function bs(n, { grouped: t, padding: e, groupPadding: o, headingLanes: s = !0 }) {
  var d;
  const a = t ? o ?? e : 0, i = [];
  for (const p of n) {
    const u = t && p.group !== ((d = i.at(-1)) == null ? void 0 : d.group);
    u && s && i.push({ group: p.group, item: null, starts: !1 }), i.push({ group: p.group, item: p, starts: u });
  }
  const r = t && s ? (1 + e) / 2 + a / 2 : e;
  let l = 0;
  i.forEach((p, u) => {
    const w = !p.item;
    !s && u > 0 && p.starts && (l += a), w && u > 0 && (l += a / 2), p.offset = l, l += 1, w && (l += a / 2);
  });
  const c = 2 * r + l - e;
  return {
    lanes: i,
    totalSteps: c,
    firstFraction: (r + (1 - e) / 2) / c,
    place([p, u]) {
      const w = (u - p) / c, _ = w * (1 - e);
      for (const v of i)
        v.pos = p + (r + v.offset) * w + _ / 2, v.item && (v.item.pos = v.pos);
      const m = [];
      if (t) {
        for (const v of i) {
          if (!v.item) continue;
          const L = v.pos + _ / 2;
          v.starts ? m.push({ group: v.group, from: v.pos - _ / 2, to: L, sep: null }) : m.at(-1).to = L;
        }
        m.forEach((v, L) => {
          L > 0 && (v.sep = (m[L - 1].to + v.from) / 2);
        });
      }
      return { step: w, bandwidth: _, spans: m };
    }
  };
}
function ks({ fontSize: n, labelWidth: t, totalSteps: e, firstFraction: o, width: s, left: a, right: i }) {
  const r = (s - a - i) / e < t, l = Pt + 3 + n, c = r ? (t + Pt + 3 + 0.75 * n) * Math.SQRT1_2 + 0.3 * n : l;
  if (!r) return { tilt: r, depth: c, extra: 0, left: a };
  const d = Math.round(t * Math.SQRT1_2), p = o;
  return {
    tilt: r,
    depth: c,
    extra: c - l,
    left: Math.max(a, Math.ceil((d - p * (s - i)) / (1 - p)))
  };
}
function qt(n, t, e) {
  return n.attr("x1", (o) => t(o)[0]).attr("y1", (o) => t(o)[1]).attr("x2", (o) => e(o)[0]).attr("y2", (o) => e(o)[1]);
}
function Ls(n, t, e, o) {
  const s = n.append("g").selectAll("line").data(o).join("line");
  return s.attr("stroke", Ns), qt(
    s,
    (a) => t.at(0, e(a)),
    (a) => t.at(t.catExtent, e(a))
  );
}
function Ms(n, t, e = !1) {
  const { innerWidth: o, innerHeight: s } = t;
  return n.append("path").attr("d", e ? `M0,0H${o}V${s}H0Z` : `M0,0V${s}H${o}`).attr("fill", "none").attr("stroke", ye);
}
function As(n, t, e, { fontSize: o, tickValues: s, format: a }) {
  const i = t.horizontal ? M.axisBottom(e) : M.axisLeft(e), r = n.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(i.tickValues(s).tickFormat(a).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", o), r.selectAll("text").attr("fill", Te), r.selectAll(".tick line").attr("stroke", ye), r.select(".domain").remove(), r;
}
function Ss(n, t, e, { fontSize: o, ticked: s, label: a, heading: i, tilt: r, groups: l }) {
  const { horizontal: c, at: d, axisAcross: p, outward: u, valExtent: w } = t, _ = n.append("g").attr("font-size", o), m = _.selectAll("g").data(e.filter((f) => !f.item || s(f.item))).join("g").attr("transform", (f) => `translate(${d(f.pos, p).join(",")})`);
  qt(
    m.append("line"),
    () => d(0, u * Pt),
    (f) => d(0, f.item ? 0 : -u * w)
  );
  const [v, L] = d(0, u * (Pt + 3)), S = m.append("text").attr("x", v).attr("y", L).attr("text-anchor", c ? "end" : "middle").attr("dy", c ? "0.32em" : "0.71em").attr("fill", Te).each(function(f) {
    const z = M.select(this);
    f.item ? a(z, f.item) : z.attr("font-weight", 600).text(i(f.group));
  });
  if (r && S.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: f, position: z, across: I } = l;
    qt(
      _.selectAll(".separator").data(f.slice(1)).join("line"),
      (P) => d(P.sep, p),
      (P) => d(P.sep, p - u * w)
    );
    const R = _.selectAll(".heading").data(f).join("text").attr("font-weight", 600).attr("fill", Te).text((P) => i(P.group));
    z === "outside" ? R.attr("transform", (P) => {
      const [q, K] = d((P.from + P.to) / 2, I);
      return `translate(${q},${K})` + (c ? " rotate(90)" : "");
    }).attr("text-anchor", "middle") : R.attr("x", (P) => d((P.from + P.to) / 2, I)[0]).attr("y", (P) => d((P.from + P.to) / 2, I)[1]).attr("text-anchor", c ? "end" : "middle").attr("dy", c ? "0.32em" : "0.71em");
  }
  return _.selectAll("line").attr("stroke", ye), _;
}
const Vs = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function Et(n, t, e) {
  const { title: o, tickValues: s, fontSize: a, highlight: i, dimension: r = "color" } = e, l = e.format ?? ((v) => v), c = e.key ?? ((v) => v), d = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", p = (v) => Vs.has(d(v)) ? d(v) : "square";
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  n.attr("class", "chart-legend").style("display", null).style("font-size", a ? `${a}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const u = i != null, w = (v) => u && i.active && !i.isSelected(r, c(v)), _ = (v, L) => i.toggle(r, c(L), { extend: v.shiftKey || v.metaKey }), m = n.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", u).classed("chart-legend__item--muted", w);
  u && m.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (v) => i.isSelected(r, c(v))).on("click", _).on("keydown", (v, L) => {
    v.key !== "Enter" && v.key !== " " || (v.preventDefault(), _(v, L));
  }), m.append("i").attr("class", (v) => `chart-legend__swatch chart-legend__swatch--${p(v)}`).style("color", (v) => w(v) ? Tt : t(v)), m.append("span").text((v) => l(v));
}
let Fs = 0;
function js(n, t, e) {
  const { title: o, fontSize: s, width: a = 160 } = e;
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  const i = s ?? 12;
  n.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const [r, l] = t.domain(), c = Math.ceil(i * 1.5), d = Math.round(i * 0.67), p = n.append("svg").attr("class", "chart-legend__ramp").attr("width", a + c * 2).attr("height", d + 3 + Math.ceil(i * 1.4)), u = `chart-legend-ramp-${Fs += 1}`;
  p.append("linearGradient").attr("id", u).selectAll("stop").data(M.ticks(0, 1, 10)).join("stop").attr("offset", (m) => m).attr("stop-color", (m) => t(r + m * (l - r)));
  const w = p.append("g").attr("transform", `translate(${c},0)`);
  w.append("rect").attr("width", a).attr("height", d).attr("fill", `url(#${u})`);
  const _ = M.axisBottom(M.scaleLinear([r, l], [0, a]));
  w.append("g").attr("transform", `translate(0,${d})`).call(Gt(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", i);
}
const Fe = { small: 10, medium: 12, large: 14 };
function Bt(n = "medium") {
  if (typeof n == "number") return n;
  if (!(n in Fe)) throw new Error(`Unknown chart font size "${n}"`);
  return Fe[n];
}
function At(n, t) {
  return t ? n + 16 : 0;
}
const Gs = 0.5, Xs = 0.72, Us = 5, $s = 8;
function ne(n) {
  return !!n.title && n.titlePosition === "top";
}
function Kt(n) {
  return n * 1.5 + $s;
}
function _e(n, t, { fontSize: e, color: o }) {
  const s = e * Gs, a = -(e / 2 + $s), i = n.append("g").attr("class", "axis-title axis-title--top"), r = i.append("text").attr("x", s + Us).attr("y", a).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, c = s / 2, d = a - e * Xs, p = i.append("path").attr(
    "d",
    `M${l},${a}V${d}M${l - c},${d + c}L${l},${d}L${l + c},${d + c}`
  ).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return o && (r.attr("fill", o), p.attr("stroke", o)), i;
}
let Qt;
const Ws = 0.55;
function Rt(n, t, e, o = 400) {
  if (Qt === void 0 && (Qt = document.createElement("canvas").getContext("2d")), !Qt) return String(n).length * t * Ws;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return Qt.font = `${o} ${t}px ${s}`, Qt.measureText(String(n)).width;
}
function Lt(n, t, e, o) {
  let s = 0;
  for (const a of n)
    s = Math.max(s, Rt(a, t, e, o));
  return s;
}
function ze(n, t, e) {
  if (e(n) <= t) return n;
  let o = n.length - 1;
  for (; o > 1 && e(`${n.slice(0, o).trimEnd()}…`) > t; ) o -= 1;
  return `${n.slice(0, o).trimEnd()}…`;
}
function qs(n) {
  return String(n).split(/\s+/).flatMap((t) => t.split(new RegExp("(?<=\\/)"))).filter(Boolean);
}
function Ts(n, t, e) {
  const o = [];
  let s = "";
  for (const a of String(n).split(/\s+/).filter(Boolean))
    a.split(new RegExp("(?<=\\/)")).forEach((i, r) => {
      const l = s === "" ? i : `${s}${r ? "" : " "}${i}`;
      s !== "" && e(l) > t ? (o.push(s), s = i) : s = l;
    });
  return (s !== "" || !o.length) && o.push(s), o;
}
class Dt {
  /** @param {Element} root the chart's root element */
  constructor(t) {
    this.root = t, this.target = null, this.div = M.select(t).append("div").attr("class", "chart-tooltip").style("display", "none");
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
        s.append("th").text(([a]) => a), s.append("td").text(([, a]) => a);
      }
    this.div.style("display", null), this.move(e);
  }
  /** Place the tooltip beside the cursor of `event`, flipping to stay inside the root. */
  move(t) {
    const [e, o] = M.pointer(t, this.root), s = this.div.node(), a = 14, i = e + a + s.offsetWidth > this.root.clientWidth ? e - a - s.offsetWidth : e + a, r = o + a + s.offsetHeight > this.root.clientHeight ? o - a - s.offsetHeight : o + a;
    this.div.style("left", `${Math.max(0, i)}px`).style("top", `${Math.max(0, r)}px`);
  }
  hide() {
    this.target = null, this.div.style("display", "none");
  }
  /** Whether the tooltip is showing. */
  get visible() {
    return this.target !== null;
  }
}
const je = 6, ve = 0.85, Ks = "rgba(0,0,0,0.55)", Ge = "rgba(0,0,0,0.6)", Ys = {
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
class Wn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Ys, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new Dt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: o, rangePadding: s, border: a } = this.options, i = this.options.orientation === "horizontal", r = this.svg.node(), l = Bt(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: c, bars: d, total: p } = Ds(this.options.data, this.options), { category: u, value: w, group: _, color: m } = c, v = !!_.accessor, L = u.domain, S = u.format ?? String, f = _.format ?? String, z = (O) => (v ? `${f(O.group)} / ` : "") + S(O.label), I = this.options.barLabel !== "none", R = (O) => ge(O.count, p, this.options.barLabel);
    this._tooltipRows = (O) => {
      const ft = ge(O.count, p, "percent"), k = [
        [Q(u, "category"), S(O.label)],
        [Q(w, "count"), `${O.count} of ${p} (${ft})`]
      ];
      return v && k.unshift([Q(_, "group"), f(O.group)]), this.options.tooltip ? this.options.tooltip(O, k) : k;
    };
    const P = Ft(w.type).domain(w.domain), q = oe(P, w), K = w.format ?? P.tickFormat(w.ticks ?? void 0), ct = new Set(u.tickValues ?? L), at = u.showTicks !== !1, nt = w.showTicks !== !1, U = v && _.showTicks !== !1 ? _.position : null, et = U === "inline", h = U === "axis", A = bs(d, {
      grouped: v,
      padding: i ? ws : _s,
      groupPadding: o,
      headingLanes: et
    }), { lanes: $, totalSteps: b } = A, x = v ? _.domain.map(f) : [], [T, B] = [fe(u), fe(w)], [J, st] = i ? [B, T] : [T, B], lt = !!st && ne(i ? u : w), ht = lt ? 0 : At(l, st), rt = Lt(x, l, r, 600), tt = Math.max(
      at ? Lt(L.map(S), l, r) : 0,
      et ? rt : 0
    ), ut = at || et, dt = U === "outside" ? l + ys : 0, pt = Lt(d.map(R), l * ve, r, 600);
    let X, xt, bt = !1, E;
    if (i)
      E = ut ? tt + Wt : 0, X = {
        top: lt ? Kt(l) : l,
        right: pt + je + 8 + dt,
        bottom: (nt ? l + 16 : 8) + At(l, J),
        left: ht + E + (h ? rt + Wt : 0)
      }, xt = X.top + (v ? b : $.length) * e + X.bottom;
    else {
      X = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((I ? l * ve : 0) + 16, lt ? Kt(l) : 0) + dt,
        right: 16,
        bottom: 0,
        // below
        left: ht + (nt ? Lt(q.map(K), l, r) + Wt : 0)
      };
      const O = ut ? ks({
        fontSize: l,
        labelWidth: tt,
        totalSteps: b,
        firstFraction: A.firstFraction,
        width: t,
        left: X.left,
        right: X.right
      }) : { tilt: !1, depth: 0, extra: 0, left: X.left };
      bt = O.tilt, E = O.depth, X.bottom = E + (h ? Pt + 3 + l : 0) + 15 + At(l, J), X.left = O.left, xt = this.options.height + O.extra;
    }
    const C = t - X.left - X.right, F = xt - X.top - X.bottom, Y = vs(i, C, F), { at: Z, outward: V } = Y, { bandwidth: g, spans: H } = A.place(u.range || [0, Y.catExtent]), D = P.range(
      w.range || (i ? [s, C - s] : [F - s, s])
    ), N = D(P.domain()[0]), G = M.scaleOrdinal(m.domain, m.range), it = (O) => this.highlight.color(G(O.color), O, { color: O.color });
    this.root.style("max-width", `${t}px`);
    const yt = this.svg.attr("viewBox", `0 0 ${t} ${xt}`).attr(
      "aria-label",
      `Bar chart of ${Q(w, "count")} by ${Q(u, "category")}` + (v ? ` within ${Q(_, "group")}` : "") + `. ${d.map((O) => `${z(O)}: ${O.count}`).join(", ")}`
    );
    yt.selectAll("*").remove();
    const W = yt.append("g").attr("transform", `translate(${X.left},${X.top})`);
    Ls(W, Y, D, q), nt && As(W, Y, D, { fontSize: l, tickValues: q, format: K }), Ms(W, Y, a);
    const vt = U && !et ? {
      spans: H,
      position: U,
      across: U === "outside" ? i ? C + X.right - l : -X.top + l : Y.axisAcross + V * (E + Pt + 3)
    } : null;
    Ss(W, Y, $, {
      fontSize: l,
      ticked: (O) => at && ct.has(O.label),
      label: (O, ft) => O.text(S(ft.label)),
      heading: f,
      tilt: bt,
      groups: vt
    });
    const kt = (O) => {
      const [ft, k] = Z(O.pos - g / 2, Math.min(N, D(O.count))), [gt, wt] = Z(g, Math.abs(D(O.count) - N));
      return { x: ft, y: k, w: gt, h: wt };
    }, Ct = W.append("g").selectAll("g").data(d).join("g");
    if (Ct.append("rect").attr("rx", 3).attr("fill", it).attr("x", (O) => kt(O).x).attr("y", (O) => kt(O).y).attr("width", (O) => kt(O).w).attr("height", (O) => kt(O).h).on("mouseenter", (O, ft) => this._setHovered(ft, O)).on("mousemove", (O) => this.tooltip.move(O)).on("mouseleave", () => this._setHovered(null)), I) {
      const O = (ft) => Z(ft.pos, D(ft.count) - V * je);
      Ct.append("text").attr("x", (ft) => O(ft)[0]).attr("y", (ft) => O(ft)[1]).attr("dy", i ? "0.35em" : null).attr("text-anchor", i ? "start" : "middle").attr("font-size", l * ve).attr("font-weight", 600).attr("fill", Ks).text(R);
    }
    const St = (O) => yt.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", Ge).text(O || "");
    St(J).attr("x", X.left + C / 2).attr("y", xt - l), lt ? _e(W, st, { fontSize: l, color: Ge }) : St(st).attr(
      "transform",
      `translate(${l + 2},${X.top + F / 2}) rotate(-90)`
    ), Et(this.legend, G, {
      ...m,
      title: gs(m),
      fontSize: l,
      highlight: this.highlight
    });
  }
}
const Zs = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Qs = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, Js = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function qn(n, t, e, { sort: o } = {}) {
  const s = M.group(n, (i) => i[t] || "(blank)"), a = Array.from(s, ([i, r]) => ({ label: i, count: r.length, group: r }));
  return o === "descending" ? a.sort((i, r) => r.count - i.count) : o === "ascending" && a.sort((i, r) => i.count - r.count), a.flatMap(
    ({ label: i, group: r }) => Array.from(
      M.rollup(
        r,
        (l) => l.length,
        (l) => l[e] || "(blank)"
      ),
      ([l, c]) => ({ label: i, key: l, count: c })
    )
  );
}
function to(n = [], t = {}) {
  const e = t.axis ?? {}, o = ot(Zs, e.y), s = ot(Qs, e.x), a = ot(Js, e.color), i = M.rollup(
    n,
    (c) => M.sum(c, s.accessor),
    o.accessor,
    a.accessor
  );
  o.domain = _t(o.domain, i.keys()), o.tickValues = Pe(o), a.domain = _t(a.domain, n.map(a.accessor));
  const r = o.domain.map((c) => {
    const d = i.get(c);
    let p = 0;
    const u = [];
    for (const w of a.domain) {
      const _ = (d == null ? void 0 : d.get(w)) ?? 0;
      _ > 0 && u.push({ key: w, count: _, start: p, end: p += _ });
    }
    return { label: c, count: p, segments: u };
  });
  s.domain ?? (s.domain = xe(s.type, [0, M.max(r, (c) => c.count) || 1], s.ticks)), a.range ?? (a.range = Mt(a.domain.length));
  const l = t.total ?? M.sum(r, (c) => c.count);
  return { axes: { category: o, value: s, color: a }, bars: r, total: l };
}
const eo = 12, Xe = 6, Ue = 0.85, so = "rgba(0,0,0,0.55)", oo = {
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
class Kn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...oo, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new Dt(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, o = this.svg.node(), s = Bt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: a, bars: i, total: r } = to(this.options.data, this.options), { category: l, value: c, color: d } = a, p = l.domain, u = l.format ?? String, w = d.format ?? String, _ = (b) => ge(b.count, r, this.options.barLabel);
    this._tooltipRows = (b) => {
      const x = [
        [Q(l, "category"), u(b.label)],
        [Q(d, "group"), w(b.key)],
        [Q(c, "count"), `${b.count} of ${b.barCount}`],
        ["Share of total", ge(b.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(b, x) : x;
    };
    const m = ne(l), v = Lt(p.map(u), s, o), L = {
      top: m ? Kt(s) : s,
      right: Lt(i.map(_), s * Ue, o, 600) + Xe + 8,
      bottom: s + 16 + At(s, c.title),
      left: (m ? 0 : At(s, l.title)) + v + eo
    }, S = t - L.left - L.right, f = p.length * e, z = L.top + f + L.bottom, I = M.scaleBand().domain(p).range(l.range || [0, f]).padding(0.3), R = Ft(c.type).domain(c.domain).range(c.range || [0, S]), P = M.scaleOrdinal(d.domain, d.range), q = (b) => this.highlight.color(P(b.key), b, { color: b.key }), K = oe(R, c), ct = c.format ?? R.tickFormat(c.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const at = i.map((b) => {
      const x = b.segments.map((T) => `${w(T.key)} ${T.count}`).join(", ");
      return `${u(b.label)}: ${b.count} (${x})`;
    }).join("; "), nt = this.svg.attr("viewBox", `0 0 ${t} ${z}`).attr(
      "aria-label",
      `Stacked bar chart of ${Q(c, "count")} by ${Q(l, "category")}, split by ${Q(d, "group")}. ${at}`
    );
    nt.selectAll("*").remove();
    const U = nt.append("g").attr("transform", `translate(${L.left},${L.top})`), et = U.append("g").call(
      M.axisLeft(I).tickValues(l.tickValues ?? p).tickFormat(u).tickSizeOuter(0)
    ), h = U.append("g").attr("transform", `translate(0,${f})`).call(M.axisBottom(R).tickValues(K).tickFormat(ct).tickSizeOuter(0));
    for (const b of [et, h])
      b.attr("font-family", null).attr("font-size", s), b.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), b.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    U.insert("g", ":first-child").selectAll("line").data(K).join("line").attr("y2", f).attr("x1", (b) => R(b)).attr("x2", (b) => R(b)).attr("stroke", "rgba(0,0,0,0.08)");
    const A = U.append("g").selectAll("g").data(i).join("g");
    A.selectAll("rect").data((b) => b.segments.map((x) => ({ ...x, label: b.label, barCount: b.count }))).join("rect").attr("x", (b) => R(b.start)).attr("y", (b) => I(b.label)).attr("width", (b) => Math.max(0, R(b.end) - R(b.start))).attr("height", I.bandwidth()).attr("fill", q).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (b, x) => this._setHovered(x, b)).on("mousemove", (b) => this.tooltip.move(b)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && A.append("text").attr("x", (b) => R(b.count) + Xe).attr("y", (b) => I(b.label) + I.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ue).attr("font-weight", 600).attr("fill", so).text(_);
    const $ = (b) => nt.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(b || "");
    $(c.title).attr("x", L.left + S / 2).attr("y", z - s), m ? _e(U, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : $(l.title).attr(
      "transform",
      `translate(${s + 2},${L.top + f / 2}) rotate(-90)`
    ), Et(this.legend, P, { ...d, fontSize: s, highlight: this.highlight });
  }
}
const Ie = (n) => typeof n == "number" ? M.format(".2f")(n) : String(n), zs = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: Ie
}, no = { ...zs, field: "y" }, io = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: Ie
}, ao = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: Ie
}, ro = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function lo(n = [{}], t = []) {
  const e = n.map((s, a) => ({
    ...ro,
    ...s,
    data: a === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function co(n = [], t = {}) {
  const e = t.axis ?? {}, o = ot(zs, e.x), s = ot(no, e.y), a = ot(io, e.color), i = ot(ao, e.radius), r = lo(t.layers, n), l = r.flatMap((c) => c.data);
  for (const c of [o, s]) c.domain ?? (c.domain = xe(c.type, Ut(l.map(c.accessor))));
  if (a.accessor) {
    const c = r.filter((d) => !d.color).flatMap((d) => d.data.map(a.accessor));
    a.type === "sequential" ? (a.domain ?? (a.domain = Ut(c)), a.range ?? (a.range = M.interpolateViridis)) : (a.domain = _t(a.domain, c), a.range ?? (a.range = Mt(a.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = Ut(l.map(i.accessor)))), { axes: { x: o, y: s, color: a, radius: i }, layers: r };
}
const ho = {
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
}, uo = 0.92;
function be(n, t, e) {
  return Ft(n.type).domain(t).range(n.range ?? e);
}
function po(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : Mt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : M.interpolateRgbBasis(n.range);
    return M.scaleSequential(n.domain, t);
  }
  return M.scaleOrdinal(n.domain, n.range);
}
function fo(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : Ft(n.type).domain(n.domain).range(n.range);
}
class Yn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...ho }, this.axes = null, this.layers = [], this.highlight = new It(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
  }
  // ── Public API ──────────────────────────────────────────────────────────────
  /**
   * Replace the records of one layer (the first layer by default) and redraw. The
   * current zoom is preserved.
   */
  setData(t = [], e = this.layers[0].id) {
    const o = this.layers.findIndex((a) => a.id === e);
    if (o < 0) throw new Error(`ScatterPlot: unknown layer "${e}"`);
    if (o === 0) return this.update({ data: t });
    const s = this.options.layers.map(
      (a, i) => i === o ? { ...a, data: t } : a
    );
    return this.update({ layers: s });
  }
  /**
   * Change any of the constructor options and redraw. Each option given replaces
   * the old one whole. The current zoom is preserved.
   */
  update(t = {}) {
    this.options = { ...this.options, ...t }, this.fontSize = Bt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: o } = co(this.options.data, this.options);
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
    const { x: o, y: s } = this.scales, [a, i] = o.domain(), [r, l] = s.domain(), c = o.invert(0) - o.invert(t), d = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [a + c, i + c], y: [r + d, l + d] }, !1);
  }
  _setZoomDomain(t, e) {
    var s, a;
    const o = this.zoomed;
    this.zoomDomain = t, this._hideTooltip(), this._render(e), o || (a = (s = this.options).onZoomChange) == null || a.call(s, !0);
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
    this.root = M.select(this.container).classed("scatter-plot", !0), this.svg = this.root.append("svg").attr("class", "scatter-plot__svg"), this.clipId = `scatter-plot-clip-${Math.random().toString(36).slice(2, 9)}`, this.clipRect = this.svg.append("defs").append("clipPath").attr("id", this.clipId).append("rect"), this.plot = this.svg.append("g").attr("class", "scatter-plot__plot"), this.gridX = this.plot.append("g").attr("class", "scatter-plot__grid"), this.gridY = this.plot.append("g").attr("class", "scatter-plot__grid"), this.frame = this.plot.append("path").attr("class", "scatter-plot__frame"), this.axisX = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--x"), this.axisY = this.plot.append("g").attr("class", "scatter-plot__axis scatter-plot__axis--y"), this.titleX = this.plot.append("text").attr("class", "scatter-plot__axis-title").attr("text-anchor", "middle"), this.titleY = this.plot.append("g").attr("class", "scatter-plot__axis-title"), this.brushG = this.plot.append("g").attr("class", "scatter-plot__brush"), this.pointsG = this.plot.append("g").attr("class", "scatter-plot__points").attr("clip-path", `url(#${this.clipId})`), this.hoverRing = this.plot.append("circle").attr("class", "scatter-plot__hover-ring").style("display", "none"), this.brush = M.brush().filter((t) => !t.ctrlKey && !t.button && !t.shiftKey).on("start", () => {
      this.brushing = !0, this._hideTooltip();
    }).on("end", (t) => this._onBrushEnd(t)), this.pan = M.drag().filter((t) => t.shiftKey && !t.button).on("start", () => {
      this.panning = !0, this.root.classed("scatter-plot--panning", !0), this._hideTooltip();
    }).on("drag", (t) => this.panBy(t.dx, t.dy)).on("end", () => {
      this.panning = !1, this.root.classed("scatter-plot--panning", !1);
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new Dt(this.container);
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
    const t = this.fontSize, { x: e, y: o } = this.axes, s = ne(o), a = { ...this.options.margin };
    if (a.top ?? (a.top = s ? Kt(t) : 16), a.right ?? (a.right = 16), a.bottom ?? (a.bottom = t + 8 + At(t, e.title)), a.left == null) {
      const i = be(o, this._viewDomain.y, [0, 1]), r = oe(i, o).map(o.format), l = Lt(r, t * uo, this.container);
      a.left = (s ? 0 : At(t, o.title)) + l + 8;
    }
    return a;
  }
  _render(t) {
    const { height: e, duration: o } = this.options, s = this.margin = this._resolveMargin(), a = this.options.width ?? (this.container.clientWidth || 640), i = Math.max(a - s.left - s.right, 10), r = Math.max(e - s.top - s.bottom, 10);
    this.width = a, this.innerSize = [i, r], this.svg.attr("width", a).attr("height", e), this.plot.attr("transform", `translate(${s.left},${s.top})`), this.clipRect.attr("width", i).attr("height", r), this._updateScales(i, r), this.brush.extent([
      [0, 0],
      [i, r]
    ]), this.brushG.call(this.brush), this.brushG.select(".overlay").call(this.pan);
    const l = t ? this.svg.transition().duration(o) : null;
    this._drawAxes(i, r, l), this._drawPoints(l), this._drawLegends(), this._buildDelaunay();
  }
  _updateScales(t, e) {
    const { x: o, y: s, color: a, radius: i } = this.axes, r = this._viewDomain, l = this.options.rangePadding;
    this.scales = {
      x: be(o, r.x, [l, t - l]),
      y: be(s, r.y, [e - l, l]),
      color: po(a),
      radius: fo(i)
    };
  }
  _buildDelaunay() {
    this.nodes = this.layers.flatMap((t) => t.data.map((e) => ({ d: e, layer: t }))), this.delaunay = this.nodes.length ? M.Delaunay.from(
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
    const { x: s, y: a } = this.axes, { margin: i, fontSize: r } = this, l = (c) => o ? c.transition(o) : c;
    l(this.gridX).call(
      Gt(M.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      Gt(M.axisLeft(this.scales.y), a).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      Gt(M.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(Gt(M.axisLeft(this.scales.y), a).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + i.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), ne(a) ? _e(this.titleY, a.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -i.left + r + 2).text(a.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(o) {
      e._drawLayer(M.select(this), o, t);
    });
  }
  _drawLayer(t, e, o) {
    const s = e.key ?? this.options.key, a = e.mark === "outline" ? "stroke" : "fill", i = (u) => this._px(u), r = (u) => this._py(u), l = (u) => this._pr(u), { highlight: c } = this, d = (u) => c.color(this._pcolor(u, e), u, this._keys(u, e)), p = t.selectAll("circle").data(e.data, s);
    p.exit().remove(), p.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", i).attr("cy", r).attr("r", l).attr(a, d), (o ? p.transition(o) : p).attr("cx", i).attr("cy", r).attr("r", l).attr(a, d), c.active && t.selectAll("circle").filter((u) => c.includes(u, this._keys(u, e))).raise();
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
      const [o, s] = e.domain(), a = 160, i = this.legend.append("svg").attr("class", "scatter-plot__ramp").attr("width", a).attr("height", 30), r = `${this.clipId}-ramp`;
      i.append("linearGradient").attr("id", r).selectAll("stop").data(M.ticks(0, 1, 10)).join("stop").attr("offset", (c) => c).attr("stop-color", (c) => e(o + c * (s - o))), i.append("rect").attr("width", a).attr("height", 8).attr("fill", `url(#${r})`);
      const l = M.scaleLinear([o, s], [0, a]);
      return i.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(Gt(M.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return Et(this.legend, e, {
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
    return Et(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const o = oe(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(o).join("span").attr("class", "scatter-plot__legend-item"), a = Math.max(...o.map(e));
    return s.append("svg").attr("width", a * 2 + 2).attr("height", a * 2 + 2).append("circle").attr("class", "scatter-plot__swatch-circle").attr("cx", a + 1).attr("cy", a + 1).attr("r", (i) => e(i)), s.append("span").text((i) => t.format(i)), this.sizeLegend;
  }
  // ── Zoom (brush) ────────────────────────────────────────────────────────────
  _onBrushEnd(t) {
    if (this.brushing = !1, !t.selection) return;
    const [[e, o], [s, a]] = t.selection;
    if (Math.abs(s - e) < 4 || Math.abs(a - o) < 4) {
      this.brushG.call(this.brush.move, null);
      return;
    }
    const { x: i, y: r } = this.scales;
    this.brushG.call(this.brush.move, null), this.zoomTo([i.invert(e), i.invert(s)], [r.invert(a), r.invert(o)]);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    if (this.brushing || this.panning || !this.delaunay) return this._hideTooltip();
    const [e, o] = M.pointer(t, this.plot.node()), [s, a] = this.innerSize;
    if (e < 0 || e > s || o < 0 || o > a) return this._hideTooltip();
    const i = this.nodes[this.delaunay.find(e, o)];
    if (!i) return this._hideTooltip();
    const r = this._px(i.d), l = this._py(i.d);
    if (Math.hypot(r - e, l - o) > this.options.hoverRadius) return this._hideTooltip();
    this.hoverRing.style("display", null).attr("cx", r).attr("cy", l).attr("r", this._pr(i.d) + 3), this.tooltip.show(this._tooltipRows(i), t, i.d), this._setHovered(i);
  }
  _setHovered(t) {
    var e, o, s;
    ((t == null ? void 0 : t.d) ?? null) !== (((e = this.hovered) == null ? void 0 : e.d) ?? null) && (this.hovered = t, (s = (o = this.options).onHover) == null || s.call(o, (t == null ? void 0 : t.d) ?? null, (t == null ? void 0 : t.layer.id) ?? null));
  }
  _tooltipRows({ d: t, layer: e }) {
    const o = [];
    for (const a of ["x", "y", "color"]) {
      const i = this.axes[a];
      a === "color" && e.color || i.accessor && o.push([Q(i, a), i.format(i.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, o, e) : o;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const go = { ...us, context: null }, mo = { ...ds, field: "value" };
function xo(n) {
  const t = [...n].sort(M.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = M.quantile(t, 0.25), o = M.quantile(t, 0.5), s = M.quantile(t, 0.75), a = s - e, i = t.filter((c) => c >= e - 1.5 * a && c <= s + 1.5 * a), r = Math.min(i.length ? i[0] : t[0], e), l = Math.max(i.length ? i[i.length - 1] : t[t.length - 1], s);
  return { q1: e, median: o, q3: s, min: r, max: l, mean: M.mean(t) };
}
function yo(n, t) {
  const e = [], o = [];
  for (const s of n) {
    const a = t(s);
    if (a == null || a === "") continue;
    const i = Number(a);
    Number.isFinite(i) && (e.push(s), o.push(i));
  }
  return { records: e, values: o };
}
function _o(n = [], t = {}) {
  const e = t.axis ?? {}, o = ms(e, t.orientation !== "vertical"), s = ot(go, o.category), a = ot(mo, o.value), i = ot(ps, e.group), r = ot(fs, e.color), l = xs(s.context), c = (p, u, w) => {
    const { records: _, values: m } = yo(w, a.accessor), v = xo(m), L = w[0];
    return {
      group: p,
      label: u,
      context: l && L ? l(L) ?? null : null,
      count: m.length,
      records: _,
      values: m,
      stats: v,
      outliers: m.map((S, f) => f).filter((S) => m[S] < v.min || m[S] > v.max),
      color: r.accessor && L ? r.accessor(L) ?? null : null
    };
  };
  let d;
  if (i.accessor) {
    const p = M.group(n, i.accessor, s.accessor);
    i.domain = _t(i.domain, p.keys()), d = i.domain.flatMap((u) => {
      const w = p.get(u) ?? /* @__PURE__ */ new Map();
      return _t(s.domain, w.keys()).filter((m) => w.has(m)).map((m) => c(u, m, w.get(m)));
    });
  } else {
    const p = M.group(n, s.accessor);
    d = _t(s.domain, p.keys()).map(
      (u) => c(null, u, p.get(u) ?? [])
    );
  }
  if (s.domain = [...new Set(d.map((p) => p.label))], s.tickValues = Pe(s), a.domain ?? (a.domain = xe(a.type, Ut(d.flatMap((p) => p.values)))), r.accessor) {
    const p = d.map((u) => u.color).filter((u) => u != null);
    r.domain = _t(r.domain, p), r.range ?? (r.range = Mt(r.domain.length));
  }
  return { axes: { category: s, value: a, group: i, color: r }, boxes: d };
}
const We = "rgba(0,0,0,0.45)", ke = "rgba(0,0,0,0.6)", wo = {
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
}, vo = 0.35, bo = 0.55, ko = "rgba(0,0,0,0.87)", Le = 2, ce = 2.5, qe = 0.45, Lo = 0.9;
function Mo(n) {
  const t = Math.sin((n + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class Zn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...wo, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = M.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const o = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = o.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = o.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new Dt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: o, points: s, showCounts: a, threshold: i, rangePadding: r, border: l } = this.options, c = this.options.orientation !== "vertical", d = this.svg.node(), p = Bt(this.options.fontSize);
    this.tooltip.fontSize(p), this._leave();
    const { axes: u, boxes: w } = _o(this.options.data, this.options), { category: _, value: m, group: v, color: L } = u, S = !!v.accessor, f = _.format ?? String, z = v.format ?? String, I = m.format ?? M.format(".3~f"), R = (y) => y.context != null ? `${y.context} / ` : "", P = (y) => a ? ` (n=${y.count})` : "", q = (y) => R(y) + f(y.label) + P(y), K = (y) => (S ? `${z(y.group)} / ` : "") + q(y), ct = new Set(_.tickValues ?? _.domain), at = Ft(m.type).domain(m.domain), nt = oe(at, m), U = m.format ?? at.tickFormat(m.ticks ?? void 0), et = (i == null ? void 0 : i.value) != null && i.value >= Math.min(...m.domain) && i.value <= Math.max(...m.domain), h = et && i.label ? i.label : null, A = _.showTicks !== !1, $ = m.showTicks !== !1, b = S && v.showTicks !== !1 ? v.position : null, x = b === "inline", T = b === "axis", B = bs(w, {
      grouped: S,
      padding: c ? ws : _s,
      groupPadding: o,
      headingLanes: x
    }), { lanes: J, totalSteps: st } = B, lt = S ? v.domain.map(z) : [], [ht, rt] = [fe(_), fe(m)], [tt, ut] = c ? [rt, ht] : [ht, rt], dt = !!ut && ne(c ? _ : m), pt = dt ? 0 : At(p, ut), X = Lt(lt, p, d, 600), xt = Math.max(
      A ? Lt(w.map(q), p, d) : 0,
      x ? X : 0
    ), bt = A || x, E = b === "outside" ? p + ys : 0;
    let C, F, Y = !1, Z;
    if (c)
      Z = bt ? xt + Wt : 0, C = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(h ? 2 * p + 8 : p, dt ? Kt(p) : 0),
        right: 16 + E,
        bottom: ($ ? p + 16 : 8) + At(p, tt),
        left: pt + Z + (T ? X + Wt : 0)
      }, F = C.top + (S ? st : J.length) * e + C.bottom;
    else {
      C = {
        top: Math.max(p, dt ? Kt(p) : 0) + E,
        // The threshold label to the right of the plot
        right: 16 + (h ? Lt([h], p, d) + 6 : 0),
        bottom: 0,
        // below
        left: pt + ($ ? Lt(nt.map(U), p, d) + Wt : 0)
      };
      const y = bt ? ks({
        fontSize: p,
        labelWidth: xt,
        totalSteps: st,
        firstFraction: B.firstFraction,
        width: t,
        left: C.left,
        right: C.right
      }) : { tilt: !1, depth: 0, extra: 0, left: C.left };
      Y = y.tilt, Z = y.depth, C.bottom = Z + (T ? Pt + 3 + p : 0) + 15 + At(p, tt), C.left = y.left, F = this.options.height + y.extra;
    }
    const V = t - C.left - C.right, g = F - C.top - C.bottom, H = vs(c, V, g), { at: D, catExtent: N, outward: G } = H, { bandwidth: it, spans: yt } = B.place(_.range || [0, N]), W = at.range(
      m.range || (c ? [r, V - r] : [g - r, r])
    ), vt = ie(L), { highlight: kt } = this, Ct = (y, j) => kt.includes(y.records[j], { color: y.color }, y), St = new Map(
      w.map((y) => [y, !kt.active || y.records.some((j, mt) => Ct(y, mt))])
    ), O = (y) => vt(y.color), ft = (y) => St.get(y) ? O(y) : Tt, k = (y) => St.get(y) ? L.accessor ? ko : O(y) : Tt, gt = L.accessor ? bo : vo, wt = w.filter((y) => y.count), ae = (y, j, mt) => {
      const [Ht, Ot] = D(mt, W(y.values[j]));
      return { box: y, index: j, record: y.records[j], value: y.values[j], x: Ht, y: Ot, lit: Ct(y, j) };
    }, Nt = wt.flatMap(
      (y) => s ? y.values.map((j, mt) => ae(y, mt, y.pos + Mo(mt) * it / 2)) : y.outliers.map((j) => ae(y, j, y.pos))
    ), Cs = M.group(Nt, (y) => y.box), De = (y) => y.lit ? O(y.box) : Tt;
    this.root.style("max-width", `${t}px`);
    const Hs = wt.map((y) => `${K(y)}: median ${I(y.stats.median)}`).join("; "), we = this.svg.attr("viewBox", `0 0 ${t} ${F}`).attr(
      "aria-label",
      `Box plot of ${Q(m, "value")} by ${Q(_, "category")}` + (S ? ` within ${Q(v, "group")}` : "") + `. ${Hs}`
    );
    we.selectAll("*").remove();
    const $t = we.append("g").attr("transform", `translate(${C.left},${C.top})`);
    Ls($t, H, W, nt), $ && As($t, H, W, { fontSize: p, tickValues: nt, format: U }), Ms($t, H, l);
    const Os = b && !x ? {
      spans: yt,
      position: b,
      across: b === "outside" ? c ? V + C.right - p : -C.top + p : H.axisAcross + G * (Z + Pt + 3)
    } : null;
    if (Ss($t, H, J, {
      fontSize: p,
      ticked: (y) => A && ct.has(y.label),
      // A box's label in pieces, so the context and count are lighter
      label: (y, j) => {
        j.context != null && y.append("tspan").attr("fill", We).text(R(j)), y.append("tspan").text(f(j.label)), a && y.append("tspan").attr("fill", We).text(P(j));
      },
      heading: z,
      tilt: Y,
      groups: Os
    }), et) {
      const y = W(i.value), [j, mt] = D(0, y), [Ht, Ot] = D(N, y);
      if ($t.append("line").attr("x1", j).attr("y1", mt).attr("x2", Ht).attr("y2", Ot).attr("stroke", ye).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), h) {
        const [Yt, Zt] = D(c ? -6 : N + 6, y);
        $t.append("text").attr("x", Yt).attr("y", Zt).attr("text-anchor", c ? "middle" : "start").attr("dy", c ? null : "0.32em").attr("font-size", p).attr("fill", ke).text(h);
      }
    }
    const jt = $t.append("g").selectAll("g").data(wt).join("g").attr("stroke", ft).attr("fill", ft);
    this.drawPoints(s ? Nt : [], {
      width: t,
      height: F,
      offset: [C.left, C.top],
      color: De,
      emphasis: kt.active
    }), qt(
      jt.append("line"),
      (y) => D(y.pos, W(y.stats.min)),
      (y) => D(y.pos, W(y.stats.max))
    ), qt(
      jt.selectAll(".cap").data((y) => [y.stats.min, y.stats.max].map((j) => ({ pos: y.pos, v: j }))).join("line").attr("class", "cap"),
      (y) => D(y.pos - it / 4, W(y.v)),
      (y) => D(y.pos + it / 4, W(y.v))
    );
    const re = (y) => {
      const j = W(y.stats.q1), mt = W(y.stats.q3), [Ht, Ot] = D(y.pos - it / 2, Math.min(j, mt)), [Yt, Zt] = D(it, Math.max(1, Math.abs(mt - j)));
      return { x: Ht, y: Ot, w: Yt, h: Zt };
    };
    jt.append("rect").attr("x", (y) => re(y).x).attr("y", (y) => re(y).y).attr("width", (y) => re(y).w).attr("height", (y) => re(y).h).attr("fill-opacity", gt), qt(
      jt.append("line"),
      (y) => D(y.pos - it / 2, W(y.stats.median)),
      (y) => D(y.pos + it / 2, W(y.stats.median))
    ).attr("stroke", k).attr("stroke-width", 2), jt.append("circle").attr("cx", (y) => D(y.pos, W(y.stats.mean))[0]).attr("cy", (y) => D(y.pos, W(y.stats.mean))[1]).attr("r", 3).attr("fill", k), s || jt.selectAll(".outlier").data((y) => Cs.get(y) ?? []).join("circle").attr("class", "outlier").attr("cx", (y) => y.x).attr("cy", (y) => y.y).attr("r", ce).attr("fill", "#fff").attr("stroke", De), this.hoverRing = $t.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? Le : ce) + 2.5).style("display", "none");
    const Ne = (y) => we.append("text").attr("text-anchor", "middle").attr("font-size", p).attr("font-weight", 600).attr("fill", ke).text(y || "");
    Ne(tt).attr("x", C.left + V / 2).attr("y", F - p), dt ? _e($t, ut, { fontSize: p, color: ke }) : Ne(ut).attr(
      "transform",
      `translate(${p + 2},${C.top + g / 2}) rotate(-90)`
    ), Et(this.legend, vt, {
      ...L,
      title: L.accessor ? gs(L) : null,
      fontSize: p,
      highlight: this.highlight
    });
    const { tooltip: le } = this.options, Ve = Q(_, "category"), Rs = (y) => {
      const [j, mt] = [W(y.stats.min), W(y.stats.max)];
      return [Math.min(j, mt) - ce, Math.max(j, mt) + ce];
    };
    this.hit = {
      margin: C,
      marks: Nt,
      delaunay: Nt.length ? M.Delaunay.from(
        Nt,
        (y) => y.x,
        (y) => y.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (y, j) => {
        const [mt, Ht] = D(y, j);
        return wt.find((Ot) => {
          const [Yt, Zt] = Rs(Ot);
          return Math.abs(mt - Ot.pos) <= it / 2 && Ht >= Yt && Ht <= Zt;
        }) ?? null;
      },
      markRows: (y) => {
        const j = [
          [Ve, K(y.box)],
          [Q(m, "value"), I(y.value)]
        ];
        return le ? le(y.record, j, y.box) : j;
      },
      boxRows: (y) => {
        const j = y.stats, mt = [
          [Ve, K(y)],
          ["n", String(y.count)],
          ["Median", I(j.median)],
          ["Mean", I(j.mean)],
          ["Q1", I(j.q1)],
          ["Q3", I(j.q3)],
          ["Whiskers", `${I(j.min)} to ${I(j.max)}`]
        ];
        return le ? le(null, mt, y) : mt;
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
  drawPoints(t, { width: e, height: o, offset: [s, a], color: i, emphasis: r }) {
    var w, _;
    this.canvas.style("display", t.length ? null : "none");
    const l = (_ = (w = this.canvas.node()).getContext) == null ? void 0 : _.call(w, "2d");
    if (!l) return;
    const c = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * c)).attr("height", Math.round(o * c)), l.setTransform(c, 0, 0, c, 0, 0), l.clearRect(0, 0, e, o);
    const d = (m, v, L) => {
      l.globalAlpha = L, l.fillStyle = m, l.beginPath();
      for (const S of v) {
        const f = S.x + s, z = S.y + a;
        l.moveTo(f + Le, z), l.arc(f, z, Le, 0, 2 * Math.PI);
      }
      l.fill();
    }, p = M.group(t, i), u = p.get(Tt);
    u && d(Tt, u, qe);
    for (const [m, v] of p)
      m !== Tt && d(m, v, r ? Lo : qe);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _onMouseMove(t) {
    const { hit: e } = this;
    if (!e) return;
    const [o, s] = M.pointer(t, this.svg.node()), a = o - e.margin.left, i = s - e.margin.top, r = e.delaunay ? e.marks[e.delaunay.find(a, i)] : null;
    if (r && Math.hypot(r.x - a, r.y - i) <= e.radius) {
      this.hoverRing.style("display", null).attr("cx", r.x).attr("cy", r.y), this.tooltip.show(e.markRows(r), t, r), this._setHovered(r.record, r.box);
      return;
    }
    this.hoverRing.style("display", "none");
    const l = e.boxAt(a, i);
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
const Ao = { field: null, title: null, format: null }, So = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, $o = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [6, 6],
  ticks: 3,
  tickValues: null,
  format: null
};
function zt(n) {
  return n != null && n !== "" && !(typeof n == "number" && Number.isNaN(n));
}
function To(n = [], t = {}) {
  var p;
  const e = t.axis ?? {}, o = (t.levels ?? []).map((u) => ot(Ao, u)), s = ot(So, e.color), a = ot($o, e.radius), i = s.accessor ?? a.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const u of n) {
    const w = [];
    for (const L of o) {
      const S = (p = L.accessor) == null ? void 0 : p.call(L, u);
      if (!zt(S)) break;
      w.push(S);
    }
    if (!w.length) continue;
    let _ = r;
    w.forEach((L, S) => {
      const f = JSON.stringify(w.slice(0, S + 1));
      let z = l.get(f);
      z || (z = { key: f, label: L, level: S, record: null, children: [] }, l.set(f, z), _.children.push(z)), _ = z;
    });
    const m = _, v = i && !zt(i(m.record ?? {})) && zt(i(u));
    (!m.record || v) && (m.record = u);
  }
  const c = [...l.values()].filter((u) => u !== r);
  for (const u of c)
    u.value = u.record && i ? i(u.record) : null, u.empty = !u.record || i != null && !zt(u.value), u.colorValue = !u.empty && s.accessor ? s.accessor(u.record) : null, u.radiusValue = !u.empty && a.accessor ? a.accessor(u.record) : null;
  const d = c.filter((u) => !u.empty);
  if (s.accessor) {
    const u = d.map((w) => w.colorValue).filter(zt);
    s.type === "sequential" ? (s.domain ?? (s.domain = Ut(u)), s.range ?? (s.range = M.interpolateViridis)) : (s.domain = _t(s.domain, u), s.range ?? (s.range = Mt(s.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = Ut(d.map((u) => u.radiusValue).filter(zt)))), { axes: { color: s, radius: a }, levels: o, root: r, nodes: c };
}
const Ke = 12, Ye = 2, zo = 1.5, Eo = 2.9, Co = 7, Me = 1.1, Ze = 4, Jt = 2, Ho = 3.3, Oo = 0.92, Ro = (n) => typeof n == "number" ? M.format(".2f")(n) : String(n), Po = { color: "#b4b2aa", radius: 6, label: null }, Io = {
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
function Bo(n, t, e, o) {
  const s = String(n ?? "").split(/\s+/).filter(Boolean), a = [];
  let i = "";
  for (const r of s) {
    const l = i ? `${i} ${r}` : r;
    i && Rt(l, e, o) > t ? (a.push(i), i = r) : i = l;
  }
  return i && a.push(i), a;
}
function Do(n) {
  const { l: t } = M.lab(n);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class Qn {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...Io, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new Dt(t), this.draw(), this._observeResize();
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
    const { columnWidth: t, hover: e, valueLabel: o } = this.options, s = { ...Po, ...this.options.empty }, a = Bt(this.options.fontSize), i = this.options.width ?? (this.container.clientWidth || 640);
    this.width = i;
    const r = this.svg.node();
    this.tooltip.fontSize(a), this._setHovered(null);
    const { axes: l, levels: c, root: d } = To(this.options.data, this.options);
    this.axes = l;
    const p = ie(l.color), u = Is(l.radius), w = l.color.accessor ? l.color : l.radius, _ = w.format ?? Ro, m = (g) => {
      const H = c[g.level];
      return H != null && H.format ? H.format(g.label) : g.label;
    };
    this._tooltipRows = (g) => {
      const H = [[Q(c[g.level], `Level ${g.level + 1}`), m(g)]];
      return zt(g.value) && H.push([Q(w, "value"), _(g.value)]), this.options.tooltip ? this.options.tooltip(g, H) : H;
    };
    const v = (g) => g.empty ? s.color : l.color.accessor ? p(g.colorValue) : p(), L = (g) => g.empty || l.radius.accessor && l.radius.type !== "constant" && !zt(g.radiusValue) ? s.radius : u(g.radiusValue), S = (g) => this.highlight.color(v(g.data), g.data, { color: g.data.colorValue }), f = M.hierarchy(d), z = f.descendants().filter((g) => g.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      p,
      a,
      s,
      z.some((g) => g.data.empty)
    ), !z.length) {
      this.svg.attr("width", i).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const I = Me * a, R = /* @__PURE__ */ new Map();
    for (const g of z) {
      const H = c[g.depth - 1], D = H != null && H.format ? H.format(g.data.label) : g.data.label, N = Bo(D, Co * a, a, r), G = Math.max(0, ...N.map((it) => Rt(it, a, r)));
      R.set(g, { lines: N, width: G, height: N.length * I });
    }
    const P = (g) => L(g.data), q = (g) => Math.max(P(g), R.get(g).height / 2), K = (g) => P(g) + Ze + R.get(g).width + Jt, ct = f.height || 1, at = z.filter((g) => !g.children && g.depth === ct), nt = Math.ceil(Math.max(0, ...at.map(K))), U = Math.max(0, ...z.filter((g) => g.depth === 1 && g.children).map(K));
    let et = Ke, h = t;
    for (let g = 0; g < 3; g += 1)
      h = Math.max(1, Math.min(t, (i - et - nt) / ct)), et = Math.max(Ke, Math.ceil(U - h));
    const A = Math.round(Eo * a);
    M.tree().nodeSize([1, h]).separation((g, H) => {
      const D = q(g) + q(H) + Ye;
      return g.parent === H.parent ? D : D * zo;
    })(f);
    let $ = 1 / 0, b = -1 / 0, x = 0;
    for (const g of z)
      $ = Math.min($, g.x), b = Math.max(b, g.x), x = Math.max(x, q(g));
    const T = b - $, B = x + Ye, J = A + T + B * 2, st = Math.max(this.options.height, Math.ceil(J)), lt = st - A, ht = T > 0 ? (lt - B * 2) / T : 1, rt = A + (lt - T * ht) / 2, tt = (g) => (g.x - $) * ht, ut = (g) => g.depth === 0 ? h - Ho * a : g.y, dt = this.svg.attr("width", i).attr("height", st).attr("font-size", a).attr(
      "aria-label",
      `Tree of ${c.map((g, H) => Q(g, `level ${H + 1}`)).join(", then ")}: ${z.length} nodes`
    ), pt = dt.append("g").attr("transform", `translate(${et},${rt})`), X = /* @__PURE__ */ new Map();
    for (const g of z)
      X.has(g.depth) || X.set(g.depth, ((V = c[g.depth - 1]) == null ? void 0 : V.title) ?? "");
    dt.append("g").selectAll("text").data([...X]).join("text").attr("class", "tree-chart__header").attr("x", ([g]) => et + g * h).attr("y", a * 1.2).attr("text-anchor", "middle").text(([, g]) => g);
    const xt = f.children.length > 1, bt = pt.append("g").selectAll("path").data(f.links().filter((g) => xt || g.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", M.linkHorizontal().x(ut).y(tt)), E = pt.append("g").selectAll("g").data(z).join("g").attr("class", "tree-chart__node").attr("transform", (g) => `translate(${g.y},${tt(g)})`);
    E.append("circle").attr("class", "tree-chart__circle").attr("r", P).attr("fill", S), o && E.filter((g) => zt(g.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", a * Oo).attr("fill", (g) => Do(S(g))).text((g) => _(g.data.value));
    const C = (g) => !!g.children, F = (g) => (C(g) ? -1 : 1) * (P(g) + Ze), Y = E.filter((g) => R.get(g).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (g) => g.data.empty);
    Y.append("rect").attr("class", "tree-chart__label-bg").attr("x", (g) => {
      const { width: H } = R.get(g);
      return (C(g) ? F(g) - H : F(g)) - Jt;
    }).attr("y", (g) => -R.get(g).height / 2 - Jt).attr("width", (g) => R.get(g).width + Jt * 2).attr("height", (g) => R.get(g).height + Jt * 2), Y.append("text").attr("text-anchor", (g) => C(g) ? "end" : "start").selectAll("tspan").data((g) => {
      const { lines: H } = R.get(g);
      return H.map((D, N) => ({ line: D, i: N, count: H.length, x: F(g) }));
    }).join("tspan").attr("x", (g) => g.x).attr(
      "dy",
      (g) => g.i === 0 ? `${0.31 - (g.count - 1) * Me / 2}em` : `${Me}em`
    ).text((g) => g.line);
    const Z = (g) => {
      if (!e) return;
      const H = g && /* @__PURE__ */ new Set([...g.ancestors(), ...g.descendants()]), D = (G) => !!(H && H.has(G)), N = (G) => D(G.source) && D(G.target);
      E.classed("tree-chart__node--off-path", (G) => !!H && !D(G)), bt.classed("tree-chart__link--on-path", N).classed("tree-chart__link--off-path", (G) => !!H && !N(G));
    };
    E.on("mouseenter", (g, H) => {
      Z(H), this._setHovered(H.data, g);
    }).on("mousemove", (g) => this.tooltip.move(g)).on("mouseleave", () => {
      Z(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, o, s) {
    const a = this.axes.color, i = { ...a, title: a.accessor ? a.title : null, fontSize: e };
    if (a.type === "sequential" ? js(this.legend, t, i) : Et(this.legend, t, { ...i, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !o.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", o.color), r.append("span").text(o.label);
  }
}
function Qe(n, t) {
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
function No(n, t) {
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
function Ae(n, t) {
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
function Vo(n, t) {
  return n.sourceLinks.length ? n.depth : t - 1;
}
function he(n) {
  return function() {
    return n;
  };
}
function Je(n, t) {
  return me(n.source, t.source) || n.index - t.index;
}
function ts(n, t) {
  return me(n.target, t.target) || n.index - t.index;
}
function me(n, t) {
  return n.y0 - t.y0;
}
function Se(n) {
  return n.value;
}
function Fo(n) {
  return n.index;
}
function jo(n) {
  return n.nodes;
}
function Go(n) {
  return n.links;
}
function es(n, t) {
  const e = n.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function ss({ nodes: n }) {
  for (const t of n) {
    let e = t.y0, o = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = o + s.width / 2, o += s.width;
  }
}
function Xo() {
  let n = 0, t = 0, e = 1, o = 1, s = 24, a = 8, i, r = Fo, l = Vo, c, d, p = jo, u = Go, w = 6;
  function _() {
    const h = { nodes: p.apply(null, arguments), links: u.apply(null, arguments) };
    return m(h), v(h), L(h), S(h), I(h), ss(h), h;
  }
  _.update = function(h) {
    return ss(h), h;
  }, _.nodeId = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : he(h), _) : r;
  }, _.nodeAlign = function(h) {
    return arguments.length ? (l = typeof h == "function" ? h : he(h), _) : l;
  }, _.nodeSort = function(h) {
    return arguments.length ? (c = h, _) : c;
  }, _.nodeWidth = function(h) {
    return arguments.length ? (s = +h, _) : s;
  }, _.nodePadding = function(h) {
    return arguments.length ? (a = i = +h, _) : a;
  }, _.nodes = function(h) {
    return arguments.length ? (p = typeof h == "function" ? h : he(h), _) : p;
  }, _.links = function(h) {
    return arguments.length ? (u = typeof h == "function" ? h : he(h), _) : u;
  }, _.linkSort = function(h) {
    return arguments.length ? (d = h, _) : d;
  }, _.size = function(h) {
    return arguments.length ? (n = t = 0, e = +h[0], o = +h[1], _) : [e - n, o - t];
  }, _.extent = function(h) {
    return arguments.length ? (n = +h[0][0], e = +h[1][0], t = +h[0][1], o = +h[1][1], _) : [[n, t], [e, o]];
  }, _.iterations = function(h) {
    return arguments.length ? (w = +h, _) : w;
  };
  function m({ nodes: h, links: A }) {
    for (const [b, x] of h.entries())
      x.index = b, x.sourceLinks = [], x.targetLinks = [];
    const $ = new Map(h.map((b, x) => [r(b, x, h), b]));
    for (const [b, x] of A.entries()) {
      x.index = b;
      let { source: T, target: B } = x;
      typeof T != "object" && (T = x.source = es($, T)), typeof B != "object" && (B = x.target = es($, B)), T.sourceLinks.push(x), B.targetLinks.push(x);
    }
    if (d != null)
      for (const { sourceLinks: b, targetLinks: x } of h)
        b.sort(d), x.sort(d);
  }
  function v({ nodes: h }) {
    for (const A of h)
      A.value = A.fixedValue === void 0 ? Math.max(Ae(A.sourceLinks, Se), Ae(A.targetLinks, Se)) : A.fixedValue;
  }
  function L({ nodes: h }) {
    const A = h.length;
    let $ = new Set(h), b = /* @__PURE__ */ new Set(), x = 0;
    for (; $.size; ) {
      for (const T of $) {
        T.depth = x;
        for (const { target: B } of T.sourceLinks)
          b.add(B);
      }
      if (++x > A) throw new Error("circular link");
      $ = b, b = /* @__PURE__ */ new Set();
    }
  }
  function S({ nodes: h }) {
    const A = h.length;
    let $ = new Set(h), b = /* @__PURE__ */ new Set(), x = 0;
    for (; $.size; ) {
      for (const T of $) {
        T.height = x;
        for (const { source: B } of T.targetLinks)
          b.add(B);
      }
      if (++x > A) throw new Error("circular link");
      $ = b, b = /* @__PURE__ */ new Set();
    }
  }
  function f({ nodes: h }) {
    const A = Qe(h, (x) => x.depth) + 1, $ = (e - n - s) / (A - 1), b = new Array(A);
    for (const x of h) {
      const T = Math.max(0, Math.min(A - 1, Math.floor(l.call(null, x, A))));
      x.layer = T, x.x0 = n + T * $, x.x1 = x.x0 + s, b[T] ? b[T].push(x) : b[T] = [x];
    }
    if (c) for (const x of b)
      x.sort(c);
    return b;
  }
  function z(h) {
    const A = No(h, ($) => (o - t - ($.length - 1) * i) / Ae($, Se));
    for (const $ of h) {
      let b = t;
      for (const x of $) {
        x.y0 = b, x.y1 = b + x.value * A, b = x.y1 + i;
        for (const T of x.sourceLinks)
          T.width = T.value * A;
      }
      b = (o - b + i) / ($.length + 1);
      for (let x = 0; x < $.length; ++x) {
        const T = $[x];
        T.y0 += b * (x + 1), T.y1 += b * (x + 1);
      }
      nt($);
    }
  }
  function I(h) {
    const A = f(h);
    i = Math.min(a, (o - t) / (Qe(A, ($) => $.length) - 1)), z(A);
    for (let $ = 0; $ < w; ++$) {
      const b = Math.pow(0.99, $), x = Math.max(1 - b, ($ + 1) / w);
      P(A, b, x), R(A, b, x);
    }
  }
  function R(h, A, $) {
    for (let b = 1, x = h.length; b < x; ++b) {
      const T = h[b];
      for (const B of T) {
        let J = 0, st = 0;
        for (const { source: ht, value: rt } of B.targetLinks) {
          let tt = rt * (B.layer - ht.layer);
          J += U(ht, B) * tt, st += tt;
        }
        if (!(st > 0)) continue;
        let lt = (J / st - B.y0) * A;
        B.y0 += lt, B.y1 += lt, at(B);
      }
      c === void 0 && T.sort(me), q(T, $);
    }
  }
  function P(h, A, $) {
    for (let b = h.length, x = b - 2; x >= 0; --x) {
      const T = h[x];
      for (const B of T) {
        let J = 0, st = 0;
        for (const { target: ht, value: rt } of B.sourceLinks) {
          let tt = rt * (ht.layer - B.layer);
          J += et(B, ht) * tt, st += tt;
        }
        if (!(st > 0)) continue;
        let lt = (J / st - B.y0) * A;
        B.y0 += lt, B.y1 += lt, at(B);
      }
      c === void 0 && T.sort(me), q(T, $);
    }
  }
  function q(h, A) {
    const $ = h.length >> 1, b = h[$];
    ct(h, b.y0 - i, $ - 1, A), K(h, b.y1 + i, $ + 1, A), ct(h, o, h.length - 1, A), K(h, t, 0, A);
  }
  function K(h, A, $, b) {
    for (; $ < h.length; ++$) {
      const x = h[$], T = (A - x.y0) * b;
      T > 1e-6 && (x.y0 += T, x.y1 += T), A = x.y1 + i;
    }
  }
  function ct(h, A, $, b) {
    for (; $ >= 0; --$) {
      const x = h[$], T = (x.y1 - A) * b;
      T > 1e-6 && (x.y0 -= T, x.y1 -= T), A = x.y0 - i;
    }
  }
  function at({ sourceLinks: h, targetLinks: A }) {
    if (d === void 0) {
      for (const { source: { sourceLinks: $ } } of A)
        $.sort(ts);
      for (const { target: { targetLinks: $ } } of h)
        $.sort(Je);
    }
  }
  function nt(h) {
    if (d === void 0)
      for (const { sourceLinks: A, targetLinks: $ } of h)
        A.sort(ts), $.sort(Je);
  }
  function U(h, A) {
    let $ = h.y0 - (h.sourceLinks.length - 1) * i / 2;
    for (const { target: b, width: x } of h.sourceLinks) {
      if (b === A) break;
      $ += x + i;
    }
    for (const { source: b, width: x } of A.targetLinks) {
      if (b === h) break;
      $ -= x;
    }
    return $;
  }
  function et(h, A) {
    let $ = A.y0 - (A.targetLinks.length - 1) * i / 2;
    for (const { source: b, width: x } of A.targetLinks) {
      if (b === h) break;
      $ += x + i;
    }
    for (const { target: b, width: x } of h.sourceLinks) {
      if (b === A) break;
      $ -= x;
    }
    return $;
  }
  return _;
}
var Ee = Math.PI, Ce = 2 * Ee, Vt = 1e-6, Uo = Ce - Vt;
function He() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Es() {
  return new He();
}
He.prototype = Es.prototype = {
  constructor: He,
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
  bezierCurveTo: function(n, t, e, o, s, a) {
    this._ += "C" + +n + "," + +t + "," + +e + "," + +o + "," + (this._x1 = +s) + "," + (this._y1 = +a);
  },
  arcTo: function(n, t, e, o, s) {
    n = +n, t = +t, e = +e, o = +o, s = +s;
    var a = this._x1, i = this._y1, r = e - n, l = o - t, c = a - n, d = i - t, p = c * c + d * d;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = n) + "," + (this._y1 = t);
    else if (p > Vt) if (!(Math.abs(d * r - l * c) > Vt) || !s)
      this._ += "L" + (this._x1 = n) + "," + (this._y1 = t);
    else {
      var u = e - a, w = o - i, _ = r * r + l * l, m = u * u + w * w, v = Math.sqrt(_), L = Math.sqrt(p), S = s * Math.tan((Ee - Math.acos((_ + p - m) / (2 * v * L))) / 2), f = S / L, z = S / v;
      Math.abs(f - 1) > Vt && (this._ += "L" + (n + f * c) + "," + (t + f * d)), this._ += "A" + s + "," + s + ",0,0," + +(d * u > c * w) + "," + (this._x1 = n + z * r) + "," + (this._y1 = t + z * l);
    }
  },
  arc: function(n, t, e, o, s, a) {
    n = +n, t = +t, e = +e, a = !!a;
    var i = e * Math.cos(o), r = e * Math.sin(o), l = n + i, c = t + r, d = 1 ^ a, p = a ? o - s : s - o;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + c : (Math.abs(this._x1 - l) > Vt || Math.abs(this._y1 - c) > Vt) && (this._ += "L" + l + "," + c), e && (p < 0 && (p = p % Ce + Ce), p > Uo ? this._ += "A" + e + "," + e + ",0,1," + d + "," + (n - i) + "," + (t - r) + "A" + e + "," + e + ",0,1," + d + "," + (this._x1 = l) + "," + (this._y1 = c) : p > Vt && (this._ += "A" + e + "," + e + ",0," + +(p >= Ee) + "," + d + "," + (this._x1 = n + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(n, t, e, o) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +o + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function os(n) {
  return function() {
    return n;
  };
}
function Wo(n) {
  return n[0];
}
function qo(n) {
  return n[1];
}
var Ko = Array.prototype.slice;
function Yo(n) {
  return n.source;
}
function Zo(n) {
  return n.target;
}
function Qo(n) {
  var t = Yo, e = Zo, o = Wo, s = qo, a = null;
  function i() {
    var r, l = Ko.call(arguments), c = t.apply(this, l), d = e.apply(this, l);
    if (a || (a = r = Es()), n(a, +o.apply(this, (l[0] = c, l)), +s.apply(this, l), +o.apply(this, (l[0] = d, l)), +s.apply(this, l)), r) return a = null, r + "" || null;
  }
  return i.source = function(r) {
    return arguments.length ? (t = r, i) : t;
  }, i.target = function(r) {
    return arguments.length ? (e = r, i) : e;
  }, i.x = function(r) {
    return arguments.length ? (o = typeof r == "function" ? r : os(+r), i) : o;
  }, i.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : os(+r), i) : s;
  }, i.context = function(r) {
    return arguments.length ? (a = r ?? null, i) : a;
  }, i;
}
function Jo(n, t, e, o, s) {
  n.moveTo(t, e), n.bezierCurveTo(t = (t + o) / 2, e, t, s, o, s);
}
function tn() {
  return Qo(Jo);
}
function en(n) {
  return [n.source.x1, n.y0];
}
function sn(n) {
  return [n.target.x0, n.y1];
}
function on() {
  return tn().source(en).target(sn);
}
const nn = "(blank)", an = { field: null, title: null, domain: null, format: null, sort: "descending" }, rn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, ue = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? nn : String(e);
};
function ln(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, a) => n.get(a) - n.get(s)) : t.sort === "ascending" && e.sort((s, a) => n.get(s) - n.get(a));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function cn(n = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((m) => ot(an, m)), o = ot(rn, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((m) => m.field != null && m.field === o.field), a = Math.max(0, s), i = e.map((m, v) => {
    const L = M.rollup(
      n,
      (f) => f.length,
      (f) => ue(m.accessor, f)
    ), S = ln(L, m).map((f, z) => ({
      id: -1,
      dim: v,
      index: z,
      key: f,
      label: m.format ? m.format(f) : f,
      count: L.get(f)
    }));
    return {
      title: m.title ?? (typeof m.field == "string" ? m.field : ""),
      index: v,
      nodes: S,
      byKey: new Map(S.map((f) => [f.key, f]))
    };
  }), r = i.flatMap((m) => m.nodes);
  r.forEach((m, v) => {
    m.id = v;
  });
  const l = (m) => e.map((v) => ue(v.accessor, m)).join("\0"), c = M.rollups(n, (m) => m, l).map(([, m]) => {
    const v = e.map((S) => ue(S.accessor, m[0])), L = v.map((S, f) => i[f].byKey.get(S));
    return {
      keys: v,
      labels: L.map((S) => S.label),
      nodes: L,
      records: m,
      value: m.length
    };
  }), d = [a, ...e.map((m, v) => v).filter((m) => m !== a)];
  c.sort((m, v) => {
    for (const L of d) {
      const S = m.nodes[L].index - v.nodes[L].index;
      if (S) return S;
    }
    return 0;
  });
  const p = [];
  for (const m of c)
    for (let v = 1; v < e.length; v++)
      p.push({
        source: m.nodes[v - 1].id,
        target: m.nodes[v].id,
        pair: v - 1,
        keys: m.keys,
        labels: m.labels,
        records: m.records,
        value: m.value,
        colorKey: m.keys[a]
      });
  const u = i[a], w = e[a];
  return w && (o.field ?? (o.field = w.field), o.accessor = (m) => ue(w.accessor, m), o.format ?? (o.format = w.format)), o.domain = _t(
    o.domain,
    u ? u.nodes.map((m) => m.key) : []
  ), o.range ?? (o.range = Mt(o.domain.length)), {
    axes: { color: o },
    dimensions: e,
    colorIndex: a,
    columns: i.map(({ title: m, index: v, nodes: L }) => ({
      title: m,
      index: v,
      nodes: L
    })),
    nodes: r,
    paths: c,
    links: p,
    total: n.length
  };
}
const hn = 2.3, ns = 5, is = 6, un = 2, de = 6, pe = 0.92, dn = "#333", pn = {
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
class Jn {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...pn, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new Dt(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: o, hover: s, unit: a } = this.options, i = Bt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(i);
    const l = cn(this.options.data, this.options);
    this.prepared = l;
    const { axes: c, columns: d, colorIndex: p, total: u } = l, w = ie(c.color), _ = (h) => this.highlight.includes(h, { color: h.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(w, i), !l.nodes.length || d.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const m = this.svg.node(), v = d[d.length - 1], L = (h) => Rt(`${h.label} `, i, m) + Rt(h.count, i * pe, m), S = Math.ceil(
      Math.max(
        Rt(v.title, i * pe, m, 600),
        ...v.nodes.map(L)
      )
    ) + is + un, f = Math.round(hn * i), z = Math.max(r - S, t * d.length), I = [
      [0, f + ns],
      [z, f + this.options.height - ns]
    ], R = Xo().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(I)({
      nodes: l.nodes.map((h) => ({ ...h })),
      links: l.links.map((h) => ({ ...h }))
    });
    o && fn(R.nodes, d.length, I[0][1], I[1][1]);
    const P = on(), q = (h) => h.x1 + is, K = (h) => h.dim === p ? this.highlight.color(w(h.key), h, { color: h.key }) : !this.highlight.active || h.sourceLinks.some(_) || h.targetLinks.some(_) ? dn : Tt, ct = this.svg.attr("width", r).attr("height", f + this.options.height).attr("font-size", i).attr(
      "aria-label",
      `Parallel sets of ${u} ${a} across ${d.map((h) => h.title).join(", ")}`
    ), at = (h) => R.nodes.find((A) => A.dim === h.index);
    ct.append("g").selectAll("text").data(d.filter(at)).join("text").attr("class", "parallel-sets__header").attr("x", (h) => q(at(h))).attr("y", f - i * 0.9).attr("text-anchor", "start").attr("font-size", i * pe).text((h) => h.title);
    const nt = ct.append("g").attr("fill", "none").selectAll("path").data(R.links).join("path").attr("class", "parallel-sets__link").attr("d", P).attr("stroke", (h) => this.highlight.color(w(h.colorKey), h, { color: h.colorKey })).attr("stroke-width", (h) => Math.max(h.width, 1)), U = ct.append("g").selectAll("g").data(R.nodes).join("g").attr("class", "parallel-sets__node");
    U.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (h) => h.x0).attr("y", (h) => h.y0).attr("width", (h) => h.x1 - h.x0).attr("height", (h) => Math.max(h.y1 - h.y0, 1)).attr("fill", K), U.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (h) => h.x0 - de).attr("y", (h) => h.y0 - de / 2).attr("width", (h) => h.x1 - h.x0 + de * 2).attr("height", (h) => Math.max(h.y1 - h.y0, 1) + de), U.append("text").attr("class", "parallel-sets__label").attr("x", q).attr("y", (h) => (h.y0 + h.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((h) => `${h.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", i * pe).text((h) => h.count), s && this._bindHover(U, nt, R);
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  /**
   * Node hover: every strand through that node. Link hover: every strand sharing
   * the hovered link's category path up to its target column, i.e. the whole
   * visible band between those two nodes, traced across the chart.
   */
  _bindHover(t, e, o) {
    const s = (i) => {
      const r = this.hovered;
      return r ? r.type === "link" ? r.keys.every((l, c) => i.keys[c] === l) : i.keys[r.node.dim] === r.node.key : !0;
    }, a = () => {
      const i = this.hovered != null, r = /* @__PURE__ */ new Set();
      if (i)
        for (const l of o.links)
          s(l) && (r.add(l.source.id), r.add(l.target.id));
      e.classed("parallel-sets__link--active", (l) => i && s(l)).classed("parallel-sets__link--muted", (l) => i && !s(l)), t.classed("parallel-sets__node--muted", (l) => i && !r.has(l.id));
    };
    this._applyHover = a, t.on("mouseenter", (i, r) => {
      const l = { type: "node", node: r };
      this._setHovered(l), this.tooltip.show(this._nodeTooltip(l), i, r);
    }).on("mousemove", (i) => this.tooltip.move(i)), e.on("mouseenter", (i, r) => {
      const l = r.keys.slice(0, r.pair + 2), c = o.links.filter((u) => u.pair === r.pair && l.every((w, _) => u.keys[_] === w)).reduce((u, w) => u + w.value, 0), d = r.labels.slice(0, l.length), p = { type: "link", keys: l, labels: d, pair: r.pair, value: c };
      this._setHovered(p), this.tooltip.show(this._linkTooltip(p), i, r);
    }).on("mousemove", (i) => this.tooltip.move(i));
  }
  // The hovered target: applies the emphasis, hides the tooltip when nothing is
  // hovered, and reports a change through onHover
  _setHovered(t) {
    var o, s, a;
    const e = t !== this.hovered;
    this.hovered = t, (o = this._applyHover) == null || o.call(this), t || this.tooltip.hide(), e && ((a = (s = this.options).onHover) == null || a.call(s, t));
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
    Et(this.legend, t, { ...o, fontSize: e, highlight: this.highlight });
  }
}
function fn(n, t, e, o) {
  for (let s = 0; s < t; s++) {
    const a = n.filter((c) => c.dim === s).sort((c, d) => c.y0 - d.y0);
    if (a.length < 2) continue;
    const i = a.reduce((c, d) => c + (d.y1 - d.y0), 0), r = (o - e - i) / (a.length - 1);
    let l = e;
    for (const c of a) {
      const d = c.y1 - c.y0;
      c.y0 = l, c.y1 = l + d, l += d + r;
    }
  }
  for (const s of n) {
    let a = s.y0;
    for (const r of s.sourceLinks)
      r.y0 = a + r.width / 2, a += r.width;
    let i = s.y0;
    for (const r of s.targetLinks)
      r.y1 = i + r.width / 2, i += r.width;
  }
}
const gn = "(blank)", Oe = {
  field: null,
  title: null,
  domain: null,
  format: null,
  sort: "descending"
}, mn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, ee = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? gn : String(e);
};
function Be(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, a) => n.get(a) - n.get(s)) : t.sort === "ascending" && e.sort((s, a) => n.get(s) - n.get(a));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function Xt(n, t) {
  if (!t.accessor)
    return n.length ? [{ key: null, label: "", index: 0, count: n.length }] : [];
  const e = M.rollup(
    n,
    (o) => o.length,
    (o) => ee(t.accessor, o)
  );
  return Be(e, t).map((o, s) => ({
    key: o,
    label: t.format ? t.format(o) : o,
    index: s,
    count: e.get(o)
  }));
}
function se(n = [], t = {}, e = !1) {
  const o = n.find((i) => i.field != null && i.field === (t == null ? void 0 : t.field));
  if (!o) return t;
  const { color: s, ...a } = o;
  return e ? { ...a, ...s, ...t } : { ...a, ...t };
}
function xn(n = [], t = {}) {
  var _, m, v;
  const e = t.dimensions ?? [], o = ot(Oe, se(e, (_ = t.axis) == null ? void 0 : _.x)), s = ot(Oe, se(e, (m = t.axis) == null ? void 0 : m.y)), a = ot(mn, se(e, (v = t.axis) == null ? void 0 : v.color, !0)), i = Xt(n, o), r = Xt(n, s).map((L) => ({
    ...L,
    cells: i.map((S) => ({ row: L.index, column: S.index, count: 0, units: [] }))
  }));
  o.domain = i.map((L) => L.key), s.domain = r.map((L) => L.key);
  const l = a.accessor ? (L) => ee(a.accessor, L) : () => null;
  if (a.accessor) {
    const L = M.rollup(n, (S) => S.length, l);
    a.domain = _t(a.domain, Be(L, a)), a.range ?? (a.range = Mt(a.domain.length));
  } else
    a.domain = [];
  const c = new Map(a.domain.map((L, S) => [L, S])), d = new Map(r.map((L) => [L.key, L.index])), p = new Map(i.map((L) => [L.key, L.index]));
  n.forEach((L, S) => {
    const f = s.accessor ? ee(s.accessor, L) : null, z = o.accessor ? ee(o.accessor, L) : null, I = d.get(f), R = p.get(z), P = r[I].cells[R];
    P.units.push({ record: L, index: S, row: I, column: R, rowKey: f, columnKey: z, colorKey: l(L) }), P.count += 1;
  });
  const u = (L) => c.get(L.colorKey) ?? c.size, w = [];
  for (const L of r)
    for (const S of L.cells)
      S.units.sort((f, z) => u(f) - u(z) || f.index - z.index), w.push(...S.units);
  return { axes: { x: o, y: s, color: a }, columns: i, rows: r, units: w, total: n.length };
}
const te = 0.92, as = 1.7, yn = 1.9, _n = 1.9, wn = 0.67, vn = 0.5, bn = 1, kn = 1.08, rs = 3, Ln = 0.4, Re = 1.25, Mn = 2, An = 0.6, Sn = 3, $n = {
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
class ti {
  constructor(t, e = {}) {
    if (!t) throw new Error("UnitMatrixChart: a container element is required");
    this.container = t, this.options = { ...$n, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("unit-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "unit-matrix__scroll").append("svg").attr("class", "unit-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new Dt(t), this.draw(), this._observeResize();
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
    const { unitSize: t, unitPadding: e, showCounts: o, unit: s } = this.options, a = Bt(this.options.fontSize), i = this.options.width ?? (this.container.clientWidth || 640);
    this.width = i, this.tooltip.fontSize(a);
    const r = xn(this.options.data, this.options);
    this.prepared = r;
    const { axes: l, columns: c, rows: d, total: p } = r;
    this._dropStaleSelection(l.color);
    const u = ie(l.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(u, a), !d.length || !c.length) {
      this.svg.attr("width", i).attr("height", 0).attr("aria-label", "Empty unit matrix");
      return;
    }
    const w = this.svg.node(), _ = Tn(r, {
      width: i,
      fontSize: a,
      unitSize: t,
      unitPadding: e,
      showCounts: o,
      measure: (f, z, I) => Rt(f, z, w, I)
    });
    this.layout = _;
    const m = [l.y, l.x].filter((f) => f.accessor).map((f, z) => Q(f, z ? "column" : "row")), v = this.svg.attr("width", _.width).attr("height", _.height).attr("font-size", a).attr(
      "aria-label",
      `Unit matrix of ${p} ${s}${m.length ? ` by ${m.join(" and ")}` : ""}`
    );
    v.append("g").selectAll("line").data(_.columns).join("line").attr("class", "unit-matrix__rule unit-matrix__rule--column").attr("x1", (f) => f.x + 0.5).attr("x2", (f) => f.x + 0.5).attr("y1", _.headerHeight).attr("y2", _.height), v.append("g").selectAll("line").data(_.rows).join("line").attr("class", "unit-matrix__rule").classed("unit-matrix__rule--first", (f, z) => z === 0).attr("x1", 0).attr("x2", _.plotRight).attr("y1", (f) => f.y + 0.5).attr("y2", (f) => f.y + 0.5), v.append("g").selectAll("text").data(_.titles).join("text").attr("class", "unit-matrix__title").attr("x", (f) => f.x).attr("y", (f) => f.y).attr("text-anchor", "start").attr("font-size", a * te).text((f) => f.text);
    const L = v.append("g").selectAll("text").data([..._.columns, ..._.rows].filter((f) => f.label)).join("text").attr("class", "unit-matrix__label").attr("x", (f) => f.label.x).attr("y", (f) => f.label.y).attr("dy", (f) => f.label.middle ? "0.35em" : null).attr("text-anchor", "start");
    L.selectAll("tspan").data((f) => f.label.lines.map((z, I) => ({ text: z, i: I, x: f.label.x }))).join("tspan").attr("x", (f) => f.x).attr("dy", (f) => f.i ? `${Re}em` : null).text((f) => f.text), o && L.append("tspan").attr("class", "unit-matrix__label-count").attr("font-size", a * te).attr("x", (f) => f.label.countBelow ? f.label.x : null).attr("dy", (f) => f.label.countBelow ? `${Re / te}em` : null).text((f) => f.label.countBelow ? f.band.count : ` ${f.band.count}`), L.filter((f) => f.label.cut).append("title").text((f) => f.band.label);
    const S = v.append("g").selectAll("rect").data(_.units).join("rect").attr("class", "unit-matrix__unit").attr("x", (f) => f.x + 0.5).attr("y", (f) => f.y + 0.5).attr("width", t - 1).attr("height", t - 1).attr("rx", Mn).attr(
      "fill",
      (f) => this.highlight.color(u(f.unit.colorKey), f.unit.record, { color: f.unit.colorKey })
    );
    v.append("g").selectAll("text").data(_.counts).join("text").attr("class", "unit-matrix__count").attr("x", (f) => f.x).attr("y", (f) => f.y).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", a * te).text((f) => f.count), this._bindHover(S);
  }
  // ── Highlight ───────────────────────────────────────────────────────────────
  // A legend selection only names categories of the color axis it was made on.
  // Once the axis has none of them (it was given another field), nothing could
  // be highlighted and every unit would be muted, so the selection is dropped.
  _dropStaleSelection(t) {
    var o, s;
    const e = this.highlight.selected("color");
    !e || [...e].some((a) => t.domain.includes(a)) || (this.highlight.selection.delete("color"), (s = (o = this.options).onHighlightChange) == null || s.call(o, this.highlight));
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
    const { axes: e, columns: o, rows: s } = this.prepared, a = [];
    e.y.accessor && a.push([Q(e.y, "Row"), s[t.row].label]), e.x.accessor && a.push([Q(e.x, "Column"), o[t.column].label]);
    const i = [e.x, e.y].some(
      (r) => typeof r.field == "string" && r.field === e.color.field
    );
    if (e.color.accessor && !i) {
      const r = e.color.format ?? ((l) => l);
      a.push([Q(e.color, "Color"), r(t.colorKey)]);
    }
    return this.options.tooltip ? this.options.tooltip(t, a) : a;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color, s = o.accessor ? o.title : null;
    Et(this.legend, t, { ...o, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("unit-matrix__legend", !0);
  }
}
function ls(n, t, e) {
  if (!n) return 0;
  const o = Math.ceil(n / t), s = o * t - n;
  return e > s ? o + 1 : o;
}
function Tn(n, t) {
  const { axes: e, columns: o, rows: s } = n, { width: a, fontSize: i, unitSize: r, unitPadding: l, showCounts: c, measure: d } = t, p = r + l, u = i * te, w = Math.round(i * wn), _ = Math.round(i * vn), m = e.x.accessor != null, v = e.y.accessor != null, L = m && e.x.title || null, S = v && e.y.title || null, f = (E) => c ? d(E, u) : 0, z = (E) => d(`${E.label} `, i) + f(E.count), I = (E) => E ? d(E.toUpperCase(), u, 600) * kn : 0, R = (E) => c ? Math.ceil((f(E) + rs) / p) : 0, P = v ? Math.max(0, ...s.map(z)) : 0, q = Math.ceil(
    Math.max(Math.min(P, a * Ln), I(S))
  ), K = q ? q + Math.round(i * bn) : 0, ct = o.map((E, C) => s.map((F) => F.cells[C])), at = (E, C) => Math.max(1, ...ct[E].map((F) => ls(F.count, C, R(F.count)))), nt = ct.map(
    (E) => Math.max(1, ...E.map((C) => C.count + R(C.count)))
  ), U = (E) => 2 * w + E * r + (E - 1) * l, et = (E, C) => {
    const F = An * E / o.length, Y = C.map((N) => Math.max(N, F)), Z = (N, G) => Math.max(U(G), Y[N]), V = o.map(
      (N, G) => Math.max(1, Math.floor((Y[G] - 2 * w + l) / p))
    );
    let g = V.reduce((N, G, it) => N + Z(it, G), 0);
    for (; ; ) {
      let N = -1, G = 1;
      if (V.forEach((it, yt) => {
        if (it >= nt[yt] || g + Z(yt, it + 1) - Z(yt, it) > E) return;
        const W = at(yt, it);
        W > G && (N = yt, G = W);
      }), N < 0) break;
      g += Z(N, V[N] + 1) - Z(N, V[N]), V[N] += 1;
    }
    const H = Math.max(0, E - g) / o.length, D = V.map((N, G) => Z(G, N) + H);
    return { perLine: V, widths: D, total: D.reduce((N, G) => N + G, 0) };
  }, h = o.length * U(Sn), A = () => Math.max(a - K, h), b = o.map((E) => m ? z(E) : 0).map((E) => m ? Math.ceil(E) + w : 0);
  let x = et(A(), b);
  if (m && x.total > A() + 0.5) {
    const E = o.map(
      (C) => Math.max(f(C.count), ...qs(C.label).map((F) => d(F, i)))
    );
    x = et(
      A(),
      E.map((C) => Math.ceil(C) + w)
    );
  }
  const T = K + x.total, B = o.map((E, C) => {
    if (!m) return null;
    const F = x.widths[C] - w, Y = Ts(E.label, F, (V) => d(V, i)), Z = d(`${Y[Y.length - 1]} `, i) + f(E.count);
    return { lines: Y, countBelow: c && Z > F + 0.5 };
  }), J = i * Re, st = Math.max(
    1,
    ...B.map((E) => E ? E.lines.length + (E.countBelow ? 1 : 0) : 1)
  ), lt = L ? Math.round(i * as) : 0, ht = m ? Math.round(i * yn + (st - 1) * J) : 0, rt = Math.max(
    lt + ht,
    S ? Math.round(i * as) : 0,
    Math.round(i * 0.5)
  ), tt = [];
  L && tt.push({ text: L, x: K + w, y: Math.round(i * 1.05) }), S && tt.push({ text: S, x: 0, y: rt - Math.round(i * 0.6) });
  let ut = K;
  const dt = o.map((E, C) => {
    const F = { band: E, x: ut, width: x.widths[C], perLine: x.perLine[C], label: null };
    if (m) {
      const { lines: Y, countBelow: Z } = B[C], V = Y.length - 1 + (Z ? 1 : 0);
      F.label = {
        lines: Y,
        countBelow: Z,
        x: ut + w,
        y: rt - Math.round(i * 0.6) - V * J,
        middle: !1,
        cut: !1
      };
    }
    return ut += x.widths[C], F;
  }), pt = [], X = [];
  let xt = rt;
  const bt = s.map((E) => {
    const C = Math.max(
      1,
      ...E.cells.map((V, g) => ls(V.count, x.perLine[g], R(V.count)))
    ), F = Math.max(
      2 * _ + C * r + (C - 1) * l,
      Math.ceil(i * _n)
    ), Y = xt + _ + r / 2, Z = { band: E, y: xt, height: F, label: null };
    if (v) {
      const V = q - f(E.count) - d(" ", i), g = z(E) <= q ? E.label : ze(E.label, V, (H) => d(H, i));
      Z.label = {
        lines: [g],
        countBelow: !1,
        x: 0,
        y: Y,
        middle: !0,
        cut: g !== E.label
      };
    }
    return E.cells.forEach((V, g) => {
      const H = dt[g], D = H.x + w;
      if (V.units.forEach((yt, W) => {
        pt.push({
          unit: yt,
          x: D + W % H.perLine * p,
          y: xt + _ + Math.floor(W / H.perLine) * p
        });
      }), !c || !V.count) return;
      const N = Math.ceil(V.count / H.perLine) - 1, G = V.count - N * H.perLine, it = H.perLine - G >= R(V.count);
      X.push({
        count: V.count,
        x: it ? D + G * p - l + rs : D,
        y: Y + (it ? N : N + 1) * p
      });
    }), xt += F, Z;
  });
  return {
    // The small allowance keeps a float sum from rounding a fitting chart up a pixel
    width: Math.max(a, Math.ceil(T - 0.01)),
    height: xt + 1,
    headerHeight: rt,
    plotLeft: K,
    plotRight: T,
    titles: tt,
    columns: dt,
    rows: bt,
    units: pt,
    counts: X
  };
}
const zn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, En = { field: null, title: null, domain: null, ticks: null, format: null };
function Cn(n = [], t = {}) {
  var b;
  const e = t.dimensions ?? [], o = t.axis ?? {}, s = (x) => ot(Oe, se(e, o[x])), a = s("x"), i = s("y"), r = s("group"), l = s("series"), c = ot(En, o.value), d = ((b = o.color) == null ? void 0 : b.field) != null, p = l.field != null ? l : r, u = {};
  !d && p.title != null && (u.title = p.title), !d && p.format != null && (u.format = p.format);
  const w = ot(
    zn,
    se(
      e,
      { ...u, ...o.color, field: d ? o.color.field : p.field },
      !0
    )
  ), _ = Xt(n, a), m = Xt(n, r), v = Xt(n, l), L = Xt(n, i).map((x) => ({
    ...x,
    cells: _.map((T) => ({ row: x.index, column: T.index, bars: [] }))
  }));
  a.domain = _.map((x) => x.key), i.domain = L.map((x) => x.key), r.domain = m.map((x) => x.key), l.domain = v.map((x) => x.key);
  const S = (x) => x.accessor ? (T) => ee(x.accessor, T) : () => null, f = S(w);
  if (w.accessor) {
    const x = M.rollup(n, (T) => T.length, f);
    w.domain = _t(w.domain, Be(x, w)), w.range ?? (w.range = Mt(w.domain.length));
  } else
    w.domain = [];
  const z = new Map(w.domain.map((x, T) => [x, T])), I = c.accessor ? (x) => +c.accessor(x) || 0 : () => 1, R = (x) => new Map(x.map((T) => [T.key, T.index])), [P, q, K, ct] = [L, _, m, v].map(
    R
  ), [at, nt, U, et] = [i, a, r, l].map(S), h = [], A = M.group(n, at, nt, U, et);
  for (const [x, T] of A)
    for (const [B, J] of T)
      for (const [st, lt] of J)
        for (const [ht, rt] of lt) {
          const tt = {
            row: P.get(x),
            column: q.get(B),
            group: K.get(st),
            series: ct.get(ht),
            rowKey: x,
            columnKey: B,
            groupKey: st,
            seriesKey: ht,
            value: M.sum(rt, I),
            records: rt,
            segments: []
          };
          let ut = 0;
          tt.segments = M.groups(rt, f).sort((dt, pt) => (z.get(dt[0]) ?? 0) - (z.get(pt[0]) ?? 0)).map(([dt, pt]) => {
            const X = ut;
            return ut += M.sum(pt, I), { bar: tt, colorKey: dt, value: ut - X, start: X, end: ut, records: pt };
          }), h.push(tt);
        }
  h.sort(
    (x, T) => x.row - T.row || x.column - T.column || x.group - T.group || x.series - T.series
  );
  for (const x of h) L[x.row].cells[x.column].bars.push(x);
  const $ = M.max(h, (x) => x.value) || 1;
  return c.domain ?? (c.domain = M.scaleLinear().domain([0, $]).nice(c.ticks ?? 4).domain()), {
    axes: { x: a, y: i, group: r, series: l, color: w, value: c },
    columns: _,
    rows: L,
    groups: m,
    series: v,
    bars: h,
    total: n.length
  };
}
const Hn = 0.92, $e = 1.7, On = 1.9, cs = 1.25, Rn = 1.9, Pn = 0.67, In = 0.67, Bn = 1, Dn = 1.08, Nn = 0.22, Vn = 9, Fn = 5, hs = 4, jn = 1, Gn = {
  data: [],
  axis: {},
  dimensions: [],
  onAxisChange: null,
  barSize: 10,
  barPadding: 2,
  groupPadding: 8,
  showValues: !0,
  tooltip: null,
  onHover: null,
  unit: "records",
  fontSize: "medium",
  width: null,
  onHighlightChange: null
};
class ei {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarMatrixChart: a container element is required");
    this.container = t, this.options = { ...Gn, ...e }, this.highlight = new It(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("bar-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "bar-matrix__scroll").append("svg").attr("class", "bar-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new Dt(t), this.draw(), this._observeResize();
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
  /** Trade the row and column fields and redraw. Nothing happens without a column field. */
  swapAxes() {
    var o, s;
    const { x: t, y: e } = this.options.axis;
    (t == null ? void 0 : t.field) != null && (this.options.axis = { ...this.options.axis, x: e ?? {}, y: t }, this.draw(), (s = (o = this.options).onAxisChange) == null || s.call(o, this.options.axis));
  }
  _onHighlightChange() {
    var t, e;
    this.draw(), (e = (t = this.options).onHighlightChange) == null || e.call(t, this.highlight);
  }
  destroy() {
    var t;
    (t = this.resizeObserver) == null || t.disconnect(), this.root.selectAll("*").remove(), this.root.classed("bar-matrix", !1);
  }
  _observeResize() {
    typeof ResizeObserver > "u" || (this.resizeObserver = new ResizeObserver(() => {
      this.options.width == null && this.container.clientWidth !== this.width && this.draw();
    }), this.resizeObserver.observe(this.container));
  }
  draw() {
    const { barSize: t, barPadding: e, groupPadding: o, showValues: s, unit: a } = this.options, i = Bt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(i);
    const l = Cn(this.options.data, this.options);
    this.prepared = l;
    const { axes: c, columns: d, rows: p, groups: u, series: w, bars: _, total: m } = l;
    this._dropStaleSelection(c.color);
    const v = ie(c.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(v, i), !p.length || !d.length) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty bar matrix");
      return;
    }
    const L = this.svg.node(), S = (k, gt = i, wt) => Rt(k, gt, L, wt), f = i * Hn, z = Math.round(i * Pn), I = Math.round(i * In), R = Math.round(i * Bn), P = c.x.accessor != null, q = c.y.accessor != null, K = c.group.accessor != null, ct = (k) => k ? S(k.toUpperCase(), f, 600) * Dn : 0, at = (k, gt, wt, ae) => k ? Math.ceil(
      Math.max(
        Math.min(
          Math.max(0, ...gt.map((Nt) => S(Nt.label, i, ae))),
          r * Nn
        ),
        ct(wt)
      )
    ) : 0, nt = at(q, p, c.y.title, 600), U = at(K, u, c.group.title), et = nt ? nt + R : 0, h = et + (U ? U + R : 0), A = Math.max((r - h) / d.length, i * Vn), $ = h + A * d.length, [, b] = c.value.domain, x = (k) => c.value.format ?? M.scaleLinear().domain(c.value.domain).tickFormat(k), T = s ? Math.ceil(S(x(4)(b), f)) + hs + 2 : 0, B = Math.max(A - 2 * z - T, i * 2), J = M.scaleLinear().domain(c.value.domain).range([0, B]), st = c.value.ticks ?? Math.max(2, Math.floor(B / (i * Fn))), lt = x(st), ht = Q(c.value, a.charAt(0).toUpperCase() + a.slice(1)), rt = P && c.x.title || null, tt = q && c.y.title || null, ut = K && c.group.title || null, dt = i * cs, pt = d.map(
      (k) => P ? Ts(k.label, A - z, (gt) => S(gt)) : []
    ), X = Math.max(1, ...pt.map((k) => k.length)), xt = rt ? Math.round(i * $e) : 0, bt = P ? Math.round(i * On + (X - 1) * dt) : 0, E = Math.max(
      xt + bt,
      tt || ut ? Math.round(i * $e) : 0,
      Math.round(i * 0.5)
    ), C = E - Math.round(i * 0.6), F = [];
    rt && F.push({ text: rt, x: h + z, y: Math.round(i * 1.05) }), tt && F.push({ text: tt, x: 0, y: C }), ut && F.push({ text: ut, x: et, y: C });
    const Y = w.length * t + (w.length - 1) * e, Z = 2 * I + u.length * Y + (u.length - 1) * o, V = (k) => h + k * A, g = (k) => E + k * Z, H = (k, gt) => g(k) + I + gt * (Y + o), D = (k) => H(k.row, k.group) + k.series * (t + e), N = (k) => V(k.column) + z, G = g(p.length), it = Math.round(i * Rn), yt = G + it + Math.round(i * $e) + 1, W = [c.y, c.x, c.group, c.series].filter((k) => k.accessor).map((k) => Q(k, "category")), vt = this.svg.attr("width", Math.max(r, Math.ceil($ - 0.01))).attr("height", yt).attr("font-size", i).attr(
      "aria-label",
      `Bar matrix of ${m} ${a}${W.length ? ` by ${W.join(", ")}` : ""}`
    );
    vt.append("g").selectAll("line").data(d).join("line").attr("class", "bar-matrix__rule bar-matrix__rule--column").attr("x1", (k) => V(k.index) + 0.5).attr("x2", (k) => V(k.index) + 0.5).attr("y1", E).attr("y2", G), vt.append("g").selectAll("line").data(p).join("line").attr("class", "bar-matrix__rule").classed("bar-matrix__rule--first", (k) => k.index === 0).attr("x1", 0).attr("x2", $).attr("y1", (k) => g(k.index) + 0.5).attr("y2", (k) => g(k.index) + 0.5);
    const kt = J.ticks(st), Ct = vt.append("g").selectAll("g").data(d).join("g").attr("transform", (k) => `translate(${V(k.index) + z},0)`);
    Ct.selectAll("line").data(kt).join("line").attr("class", (k) => k === 0 ? "bar-matrix__baseline" : "bar-matrix__grid").attr("x1", (k) => Math.round(J(k)) + 0.5).attr("x2", (k) => Math.round(J(k)) + 0.5).attr("y1", E).attr("y2", G), Ct.append("g").attr("class", "bar-matrix__axis").attr("transform", `translate(0.5,${G})`).call(M.axisBottom(J).tickValues(kt).tickFormat(lt).tickSizeOuter(0)).attr("font-family", null).attr("font-size", f), F.push({
      text: ht,
      x: h + z,
      y: G + it + Math.round(i * 1.05)
    }), vt.append("g").selectAll("text").data(F).join("text").attr("class", "bar-matrix__title").attr("x", (k) => k.x).attr("y", (k) => k.y).attr("text-anchor", "start").attr("font-size", f).text((k) => k.text), P && vt.append("g").selectAll("text").data(d).join("text").attr("class", "bar-matrix__label").attr("text-anchor", "start").attr("y", (k) => C - (pt[k.index].length - 1) * dt).selectAll("tspan").data(
      (k) => pt[k.index].map((gt, wt) => ({ text: gt, i: wt, x: V(k.index) + z }))
    ).join("tspan").attr("x", (k) => k.x).attr("dy", (k) => k.i ? `${cs}em` : null).text((k) => k.text);
    const St = [];
    for (const k of p)
      if (q && St.push({
        band: k,
        isRow: !0,
        x: 0,
        y: g(k.index) + Z / 2,
        text: ze(k.label, nt, (gt) => S(gt, i, 600))
      }), K)
        for (const gt of u)
          St.push({
            band: gt,
            isRow: !1,
            x: et,
            y: H(k.index, gt.index) + Y / 2,
            text: ze(gt.label, U, (wt) => S(wt))
          });
    vt.append("g").selectAll("text").data(St).join("text").attr("class", "bar-matrix__label").classed("bar-matrix__label--row", (k) => k.isRow).attr("x", (k) => k.x).attr("y", (k) => k.y).attr("dy", "0.35em").attr("text-anchor", "start").text((k) => k.text).filter((k) => k.text !== k.band.label).append("title").text((k) => k.band.label);
    const ft = vt.append("g").selectAll("rect").data(_.flatMap((k) => k.segments)).join("rect").attr("class", "bar-matrix__segment").attr("x", (k) => N(k.bar) + J(k.start)).attr("y", (k) => D(k.bar)).attr("width", (k) => Math.max(J(k.end) - J(k.start), 0)).attr("height", t).attr("rx", jn).attr("fill", (k) => this.highlight.color(v(k.colorKey), k, { color: k.colorKey }));
    s && vt.append("g").selectAll("text").data(_).join("text").attr("class", "bar-matrix__value").attr("x", (k) => N(k) + J(k.value) + hs).attr("y", (k) => D(k) + t / 2).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", Math.min(f, t + 2)).text((k) => lt(k.value)), this.format = lt, this.valueTitle = ht, this._bindHover(ft);
  }
  // ── Highlight ───────────────────────────────────────────────────────────────
  // A legend selection only names categories of the color axis it was made on.
  // Once the axis has none of them (it was given another field), nothing could
  // be highlighted and every bar would be muted, so the selection is dropped.
  _dropStaleSelection(t) {
    var o, s;
    const e = this.highlight.selected("color");
    !e || [...e].some((a) => t.domain.includes(a)) || (this.highlight.selection.delete("color"), (s = (o = this.options).onHighlightChange) == null || s.call(o, this.highlight));
  }
  // ── Hover / tooltip ─────────────────────────────────────────────────────────
  _bindHover(t) {
    t.on("mouseenter", (e, o) => {
      this._setHovered(o), this.tooltip.show(this._segmentTooltip(o), e, o);
    }).on("mousemove", (e) => this.tooltip.move(e));
  }
  // The hovered segment: hides the tooltip when nothing is hovered, and reports
  // a change through onHover
  _setHovered(t) {
    var o, s;
    const e = t !== this.hovered;
    this.hovered = t, t || this.tooltip.hide(), e && ((s = (o = this.options).onHover) == null || s.call(o, t));
  }
  // Default rows: the segment's row, column, group, series and color categories
  // (the color one left out when it repeats another field), then its value, and
  // its bar's total when the bar is stacked
  _segmentTooltip(t) {
    const { axes: e, columns: o, rows: s, groups: a, series: i } = this.prepared, { bar: r } = t, l = [], c = [
      [e.y, s[r.row], "Row"],
      [e.x, o[r.column], "Column"],
      [e.group, a[r.group], "Group"],
      [e.series, i[r.series], "Series"]
    ];
    for (const [u, w, _] of c)
      u.accessor && l.push([Q(u, _), w.label]);
    const d = c.some(
      ([u]) => typeof u.field == "string" && u.field === e.color.field
    );
    if (e.color.accessor && !d) {
      const u = e.color.format ?? ((w) => w);
      l.push([Q(e.color, "Color"), u(t.colorKey)]);
    }
    const p = e.value.format ?? M.format(",");
    return l.push([this.valueTitle, p(t.value)]), r.segments.length > 1 && l.push(["Bar total", p(r.value)]), this.options.tooltip ? this.options.tooltip(t, l) : l;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color, s = o.accessor ? o.title : null;
    Et(this.legend, t, { ...o, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("bar-matrix__legend", !0);
  }
}
export {
  Wn as BarChart,
  ei as BarMatrixChart,
  Zn as BoxPlotChart,
  Fe as FONT_SIZES,
  It as Highlight,
  Tt as MUTED_COLOR,
  Jn as ParallelSetsChart,
  Yn as ScatterPlot,
  Kn as StackedBarChart,
  Dt as Tooltip,
  Qn as TreeChart,
  ti as UnitMatrixChart,
  ge as barLabel,
  ks as bottomLabels,
  xo as boxStats,
  Xn as categoryColors,
  vs as chartFrame,
  Un as countBy,
  qn as countByStacked,
  Mt as defaultColors,
  se as describeAxis,
  Ss as drawCategoryAxis,
  Ls as drawGridlines,
  Et as drawLegend,
  Ms as drawPlotEdges,
  js as drawSequentialLegend,
  _e as drawTopTitle,
  As as drawValueAxis,
  ze as fitText,
  zt as hasValue,
  bs as laneLayout,
  Tn as layoutUnitMatrix,
  Lt as maxTextWidth,
  Rt as measureText,
  Ds as prepareBarChart,
  Cn as prepareBarMatrix,
  _o as prepareBoxPlotChart,
  cn as prepareParallelSets,
  co as prepareScatterPlot,
  to as prepareStackedBarChart,
  To as prepareTreeChart,
  xn as prepareUnitMatrix,
  Bt as resolveFontSize,
  At as titleLane,
  ne as titleOnTop,
  Kt as topTitleLane,
  Ts as wrapText
};
