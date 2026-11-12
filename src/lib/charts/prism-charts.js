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
function Tt(n) {
  return n <= M.schemeTableau10.length ? M.schemeTableau10 : Ps;
}
function Kn(n, t) {
  const e = M.rollup(
    n,
    (s) => s.length,
    (s) => s[t] || "(blank)"
  ), o = Array.from(e).sort((s, a) => a[1] - s[1]).map(([s]) => s);
  return { domain: o, range: Tt(o.length) };
}
const gs = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, ms = {
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
}, xs = {
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
}, ys = {
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
function be(n) {
  return n.showTitle === !1 ? null : n.title;
}
function _s(n) {
  return n.showTicks === !1 ? null : n.showTitle === !1 ? n.title == null ? null : "" : n.title;
}
function ws(n, t) {
  return {
    category: n.category ?? (t ? n.y : n.x),
    value: n.value ?? (t ? n.x : n.y)
  };
}
function vs(n) {
  return n == null ? null : typeof n == "function" ? n : (t) => t[n];
}
function it(n, t = {}) {
  const e = { ...n, ...t };
  return e.accessor = vs(e.field), e;
}
function st(n, t) {
  return n.title ?? (typeof n.field == "string" ? n.field : t);
}
function _t(n, t) {
  return [.../* @__PURE__ */ new Set([...n ?? [], ...t])];
}
function je(n) {
  var t;
  return ((t = n.tickValues) == null ? void 0 : t.filter((e) => n.domain.includes(e))) ?? null;
}
function qt(n) {
  switch (n) {
    case "log":
      return M.scaleLog();
    case "sqrt":
      return M.scaleSqrt();
    default:
      return M.scaleLinear();
  }
}
function te(n, t = [0, 1]) {
  const [e, o] = M.extent(n);
  return e === void 0 ? t : e === o ? [e - 1, o + 1] : [e, o];
}
function Me(n, t, e) {
  return qt(n).domain(t).nice(e ?? void 0).domain();
}
function fe(n, t) {
  return t.tickValues ? t.tickValues : n.ticks ? n.ticks(t.ticks ?? void 0) : n.domain();
}
function Qt(n, t) {
  return t.tickValues ? n.tickValues(t.tickValues) : t.ticks != null && n.ticks(t.ticks), t.format && n.tickFormat(t.format), n;
}
function me(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : Tt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : M.interpolateRgbBasis(n.range);
    return M.scaleSequential(n.domain, t);
  }
  return M.scaleOrdinal(n.domain, n.range);
}
function Bs(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : qt(n.type).domain(n.domain).range(n.range);
}
const Ds = { ...ms, field: "count" };
function Yn(n, t, { sort: e, group: o } = {}) {
  const s = (i) => (r) => r[i] || "(blank)", a = (i, r) => {
    const l = M.rollup(i, (u) => u.length, s(t)), c = Array.from(
      l,
      ([u, f]) => o == null ? { label: u, count: f } : { group: r, label: u, count: f }
    );
    return e === "descending" ? c.sort((u, f) => f.count - u.count) : e === "ascending" && c.sort((u, f) => u.count - f.count), c;
  };
  return o == null ? a(n) : Array.from(
    M.group(n, s(o)),
    ([i, r]) => a(r, i)
  ).flat();
}
function ke(n, t, e = "both") {
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
function Ns(n = [], t = {}) {
  const e = t.axis ?? {}, o = ws(e, t.orientation === "horizontal"), s = it(gs, o.category), a = it(Ds, o.value), i = it(xs, e.group), r = it(ys, e.color), l = r.accessor ?? s.accessor, c = (d) => ({
    count: M.sum(d, a.accessor),
    color: l(d[0])
  });
  let u;
  if (i.accessor) {
    const d = M.rollup(n, c, i.accessor, s.accessor);
    i.domain = _t(i.domain, d.keys()), u = i.domain.flatMap((v) => {
      const _ = d.get(v) ?? /* @__PURE__ */ new Map();
      return _t(s.domain, _.keys()).filter((x) => _.has(x)).map((x) => ({ group: v, label: x, ..._.get(x) }));
    }), s.domain = [...new Set(u.map((v) => v.label))];
  } else {
    const d = M.rollup(n, c, s.accessor);
    s.domain = _t(s.domain, d.keys()), u = s.domain.map((v) => {
      var _, x;
      return {
        group: null,
        label: v,
        count: ((_ = d.get(v)) == null ? void 0 : _.count) ?? 0,
        color: ((x = d.get(v)) == null ? void 0 : x.color) ?? v
      };
    });
  }
  s.tickValues = je(s), a.domain ?? (a.domain = Me(a.type, [0, M.max(u, (d) => d.count) || 1], a.ticks)), r.domain = _t(
    r.domain,
    u.map((d) => d.color)
  ), r.range ?? (r.range = Tt(r.domain.length));
  const f = t.total ?? M.sum(u, (d) => d.count);
  return { axes: { category: s, value: a, group: i, color: r }, bars: u, total: f };
}
const Ht = "#cfcfcf";
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
    return this.includes(e, o, s) ? t : Ht;
  }
  _changed() {
    var t;
    (t = this.onChange) == null || t.call(this, this);
  }
}
const Nt = 6, ee = 12, bs = 8, ks = 0.35, Ls = 0.3, Pe = "rgba(0,0,0,0.7)", Ae = "rgba(0,0,0,0.5)", Vs = "rgba(0,0,0,0.08)";
function Ms(n, t, e) {
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
function As(n, { grouped: t, padding: e, groupPadding: o, headingLanes: s = !0 }) {
  var u;
  const a = t ? o ?? e : 0, i = [];
  for (const f of n) {
    const d = t && f.group !== ((u = i.at(-1)) == null ? void 0 : u.group);
    d && s && i.push({ group: f.group, item: null, starts: !1 }), i.push({ group: f.group, item: f, starts: d });
  }
  const r = t && s ? (1 + e) / 2 + a / 2 : e;
  let l = 0;
  i.forEach((f, d) => {
    const v = !f.item;
    !s && d > 0 && f.starts && (l += a), v && d > 0 && (l += a / 2), f.offset = l, l += 1, v && (l += a / 2);
  });
  const c = 2 * r + l - e;
  return {
    lanes: i,
    totalSteps: c,
    firstFraction: (r + (1 - e) / 2) / c,
    place([f, d]) {
      const v = (d - f) / c, _ = v * (1 - e);
      for (const b of i)
        b.pos = f + (r + b.offset) * v + _ / 2, b.item && (b.item.pos = b.pos);
      const x = [];
      if (t) {
        for (const b of i) {
          if (!b.item) continue;
          const L = b.pos + _ / 2;
          b.starts ? x.push({ group: b.group, from: b.pos - _ / 2, to: L, sep: null }) : x.at(-1).to = L;
        }
        x.forEach((b, L) => {
          L > 0 && (b.sep = (x[L - 1].to + b.from) / 2);
        });
      }
      return { step: v, bandwidth: _, spans: x };
    }
  };
}
function Ss({ fontSize: n, labelWidth: t, totalSteps: e, firstFraction: o, width: s, left: a, right: i }) {
  const r = (s - a - i) / e < t, l = Nt + 3 + n, c = r ? (t + Nt + 3 + 0.75 * n) * Math.SQRT1_2 + 0.3 * n : l;
  if (!r) return { tilt: r, depth: c, extra: 0, left: a };
  const u = Math.round(t * Math.SQRT1_2), f = o;
  return {
    tilt: r,
    depth: c,
    extra: c - l,
    left: Math.max(a, Math.ceil((u - f * (s - i)) / (1 - f)))
  };
}
function se(n, t, e) {
  return n.attr("x1", (o) => t(o)[0]).attr("y1", (o) => t(o)[1]).attr("x2", (o) => e(o)[0]).attr("y2", (o) => e(o)[1]);
}
function Ts(n, t, e, o) {
  const s = n.append("g").selectAll("line").data(o).join("line");
  return s.attr("stroke", Vs), se(
    s,
    (a) => t.at(0, e(a)),
    (a) => t.at(t.catExtent, e(a))
  );
}
function $s(n, t, e = !1) {
  const { innerWidth: o, innerHeight: s } = t;
  return n.append("path").attr("d", e ? `M0,0H${o}V${s}H0Z` : `M0,0V${s}H${o}`).attr("fill", "none").attr("stroke", Ae);
}
function zs(n, t, e, { fontSize: o, tickValues: s, format: a }) {
  const i = t.horizontal ? M.axisBottom(e) : M.axisLeft(e), r = n.append("g").attr("transform", t.horizontal ? `translate(0,${t.innerHeight})` : null).call(i.tickValues(s).tickFormat(a).tickSizeOuter(0));
  return r.attr("font-family", null).attr("font-size", o), r.selectAll("text").attr("fill", Pe), r.selectAll(".tick line").attr("stroke", Ae), r.select(".domain").remove(), r;
}
function Es(n, t, e, { fontSize: o, ticked: s, label: a, heading: i, tilt: r, groups: l }) {
  const { horizontal: c, at: u, axisAcross: f, outward: d, valExtent: v } = t, _ = n.append("g").attr("font-size", o), x = _.selectAll("g").data(e.filter((p) => !p.item || s(p.item))).join("g").attr("transform", (p) => `translate(${u(p.pos, f).join(",")})`);
  se(
    x.append("line"),
    () => u(0, d * Nt),
    (p) => u(0, p.item ? 0 : -d * v)
  );
  const [b, L] = u(0, d * (Nt + 3)), S = x.append("text").attr("x", b).attr("y", L).attr("text-anchor", c ? "end" : "middle").attr("dy", c ? "0.32em" : "0.71em").attr("fill", Pe).each(function(p) {
    const z = M.select(this);
    p.item ? a(z, p.item) : z.attr("font-weight", 600).text(i(p.group));
  });
  if (r && S.attr("transform", "rotate(-45)").attr("text-anchor", "end").attr("dx", "-0.6em").attr("dy", "0.15em"), l) {
    const { spans: p, position: z, across: N } = l;
    se(
      _.selectAll(".separator").data(p.slice(1)).join("line"),
      (B) => u(B.sep, f),
      (B) => u(B.sep, f - d * v)
    );
    const R = _.selectAll(".heading").data(p).join("text").attr("font-weight", 600).attr("fill", Pe).text((B) => i(B.group));
    z === "outside" ? R.attr("transform", (B) => {
      const [K, Y] = u((B.from + B.to) / 2, N);
      return `translate(${K},${Y})` + (c ? " rotate(90)" : "");
    }).attr("text-anchor", "middle") : R.attr("x", (B) => u((B.from + B.to) / 2, N)[0]).attr("y", (B) => u((B.from + B.to) / 2, N)[1]).attr("text-anchor", c ? "end" : "middle").attr("dy", c ? "0.32em" : "0.71em");
  }
  return _.selectAll("line").attr("stroke", Ae), _;
}
const Xs = /* @__PURE__ */ new Set(["square", "circle", "ring"]);
function Rt(n, t, e) {
  const { title: o, tickValues: s, fontSize: a, highlight: i, dimension: r = "color" } = e, l = e.format ?? ((b) => b), c = e.key ?? ((b) => b), u = typeof e.shape == "function" ? e.shape : () => e.shape ?? "square", f = (b) => Xs.has(u(b)) ? u(b) : "square";
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  n.attr("class", "chart-legend").style("display", null).style("font-size", a ? `${a}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const d = i != null, v = (b) => d && i.active && !i.isSelected(r, c(b)), _ = (b, L) => i.toggle(r, c(L), { extend: b.shiftKey || b.metaKey }), x = n.append("div").attr("class", "chart-legend__items").selectAll("span").data(s || t.domain()).join("span").attr("class", "chart-legend__item").classed("chart-legend__item--toggle", d).classed("chart-legend__item--muted", v);
  d && x.attr("role", "button").attr("tabindex", 0).attr("aria-pressed", (b) => i.isSelected(r, c(b))).on("click", _).on("keydown", (b, L) => {
    b.key !== "Enter" && b.key !== " " || (b.preventDefault(), _(b, L));
  }), x.append("i").attr("class", (b) => `chart-legend__swatch chart-legend__swatch--${f(b)}`).style("color", (b) => v(b) ? Ht : t(b)), x.append("span").text((b) => l(b));
}
let js = 0;
function Fs(n, t, e) {
  const { title: o, fontSize: s, width: a = 160 } = e;
  if (n.selectAll("*").remove(), o == null) {
    n.style("display", "none");
    return;
  }
  const i = s ?? 12;
  n.attr("class", "chart-legend").style("display", null).style("font-size", s ? `${s}px` : null), o && n.append("div").attr("class", "chart-legend__title").text(o);
  const [r, l] = t.domain(), c = Math.ceil(i * 1.5), u = Math.round(i * 0.67), f = n.append("svg").attr("class", "chart-legend__ramp").attr("width", a + c * 2).attr("height", u + 3 + Math.ceil(i * 1.4)), d = `chart-legend-ramp-${js += 1}`;
  f.append("linearGradient").attr("id", d).selectAll("stop").data(M.ticks(0, 1, 10)).join("stop").attr("offset", (x) => x).attr("stop-color", (x) => t(r + x * (l - r)));
  const v = f.append("g").attr("transform", `translate(${c},0)`);
  v.append("rect").attr("width", a).attr("height", u).attr("fill", `url(#${d})`);
  const _ = M.axisBottom(M.scaleLinear([r, l], [0, a]));
  v.append("g").attr("transform", `translate(0,${u})`).call(Qt(_, e).tickSize(3).tickSizeOuter(0)).attr("font-family", null).attr("font-size", i);
}
const Ue = { small: 10, medium: 12, large: 14 };
function Xt(n = "medium") {
  if (typeof n == "number") return n;
  if (!(n in Ue)) throw new Error(`Unknown chart font size "${n}"`);
  return Ue[n];
}
function Et(n, t) {
  return t ? n + 16 : 0;
}
const Gs = 0.5, Us = 0.72, Ws = 5, Cs = 8;
function ge(n) {
  return !!n.title && n.titlePosition === "top";
}
function oe(n) {
  return n * 1.5 + Cs;
}
function Se(n, t, { fontSize: e, color: o }) {
  const s = e * Gs, a = -(e / 2 + Cs), i = n.append("g").attr("class", "axis-title axis-title--top"), r = i.append("text").attr("x", s + Ws).attr("y", a).attr("text-anchor", "start").attr("font-size", e).attr("font-weight", 600).text(t), l = s / 2, c = s / 2, u = a - e * Us, f = i.append("path").attr(
    "d",
    `M${l},${a}V${u}M${l - c},${u + c}L${l},${u}L${l + c},${u + c}`
  ).attr("fill", "none").attr("stroke-width", 1.5).attr("stroke-linecap", "round").attr("stroke-linejoin", "round");
  return o && (r.attr("fill", o), f.attr("stroke", o)), i;
}
let le;
const qs = 0.55;
function Dt(n, t, e, o = 400) {
  if (le === void 0 && (le = document.createElement("canvas").getContext("2d")), !le) return String(n).length * t * qs;
  const s = e ? getComputedStyle(e).fontFamily : "sans-serif";
  return le.font = `${o} ${t}px ${s}`, le.measureText(String(n)).width;
}
function St(n, t, e, o) {
  let s = 0;
  for (const a of n)
    s = Math.max(s, Dt(a, t, e, o));
  return s;
}
function he(n, t, e) {
  if (e(n) <= t) return n;
  let o = n.length - 1;
  for (; o > 1 && e(`${n.slice(0, o).trimEnd()}…`) > t; ) o -= 1;
  return `${n.slice(0, o).trimEnd()}…`;
}
function Ks(n) {
  return String(n).split(/\s+/).flatMap((t) => t.split(new RegExp("(?<=\\/)"))).filter(Boolean);
}
function Hs(n, t, e) {
  const o = [];
  let s = "";
  for (const a of String(n).split(/\s+/).filter(Boolean))
    a.split(new RegExp("(?<=\\/)")).forEach((i, r) => {
      const l = s === "" ? i : `${s}${r ? "" : " "}${i}`;
      s !== "" && e(l) > t ? (o.push(s), s = i) : s = l;
    });
  return (s !== "" || !o.length) && o.push(s), o;
}
class jt {
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
const We = 6, $e = 0.85, Ys = "rgba(0,0,0,0.55)", qe = "rgba(0,0,0,0.6)", Zs = {
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
class Zn {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarChart: a container element is required");
    this.container = t, this.options = { ...Zs, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "bar-chart__svg").attr("role", "img"), this.tooltip = new jt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: o, rangePadding: s, border: a } = this.options, i = this.options.orientation === "horizontal", r = this.svg.node(), l = Xt(this.options.fontSize);
    this.tooltip.fontSize(l), this._setHovered(null);
    const { axes: c, bars: u, total: f } = Ns(this.options.data, this.options), { category: d, value: v, group: _, color: x } = c, b = !!_.accessor, L = d.domain, S = d.format ?? String, p = _.format ?? String, z = (H) => (b ? `${p(H.group)} / ` : "") + S(H.label), N = this.options.barLabel !== "none", R = (H) => ke(H.count, f, this.options.barLabel);
    this._tooltipRows = (H) => {
      const dt = ke(H.count, f, "percent"), At = [
        [st(d, "category"), S(H.label)],
        [st(v, "count"), `${H.count} of ${f} (${dt})`]
      ];
      return b && At.unshift([st(_, "group"), p(H.group)]), this.options.tooltip ? this.options.tooltip(H, At) : At;
    };
    const B = qt(v.type).domain(v.domain), K = fe(B, v), Y = v.format ?? B.tickFormat(v.ticks ?? void 0), at = new Set(d.tickValues ?? L), rt = d.showTicks !== !1, lt = v.showTicks !== !1, G = b && _.showTicks !== !1 ? _.position : null, ct = G === "inline", h = G === "axis", $ = As(u, {
      grouped: b,
      padding: i ? Ls : ks,
      groupPadding: o,
      headingLanes: ct
    }), { lanes: T, totalSteps: w } = $, m = b ? _.domain.map(p) : [], [A, P] = [be(d), be(v)], [nt, D] = i ? [P, A] : [A, P], Z = !!D && ge(i ? d : v), Q = Z ? 0 : Et(l, D), et = St(m, l, r, 600), ot = Math.max(
      rt ? St(L.map(S), l, r) : 0,
      ct ? et : 0
    ), ht = rt || ct, ft = G === "outside" ? l + bs : 0, xt = St(u.map(R), l * $e, r, 600);
    let U, mt, Lt = !1, C;
    if (i)
      C = ht ? ot + ee : 0, U = {
        top: Z ? oe(l) : l,
        right: xt + We + 8 + ft,
        bottom: (lt ? l + 16 : 8) + Et(l, nt),
        left: Q + C + (h ? et + ee : 0)
      }, mt = U.top + (b ? w : T.length) * e + U.bottom;
    else {
      U = {
        // The label above the tallest bar, or the title above the top tick
        top: Math.max((N ? l * $e : 0) + 16, Z ? oe(l) : 0) + ft,
        right: 16,
        bottom: 0,
        // below
        left: Q + (lt ? St(K.map(Y), l, r) + ee : 0)
      };
      const H = ht ? Ss({
        fontSize: l,
        labelWidth: ot,
        totalSteps: w,
        firstFraction: $.firstFraction,
        width: t,
        left: U.left,
        right: U.right
      }) : { tilt: !1, depth: 0, extra: 0, left: U.left };
      Lt = H.tilt, C = H.depth, U.bottom = C + (h ? Nt + 3 + l : 0) + 15 + Et(l, nt), U.left = H.left, mt = this.options.height + H.extra;
    }
    const E = t - U.left - U.right, F = mt - U.top - U.bottom, J = Ms(i, E, F), { at: tt, outward: j } = J, { bandwidth: y, spans: O } = $.place(d.range || [0, J.catExtent]), V = B.range(
      v.range || (i ? [s, E - s] : [F - s, s])
    ), X = V(B.domain()[0]), q = M.scaleOrdinal(x.domain, x.range), ut = (H) => this.highlight.color(q(H.color), H, { color: H.color });
    this.root.style("max-width", `${t}px`);
    const yt = this.svg.attr("viewBox", `0 0 ${t} ${mt}`).attr(
      "aria-label",
      `Bar chart of ${st(v, "count")} by ${st(d, "category")}` + (b ? ` within ${st(_, "group")}` : "") + `. ${u.map((H) => `${z(H)}: ${H.count}`).join(", ")}`
    );
    yt.selectAll("*").remove();
    const W = yt.append("g").attr("transform", `translate(${U.left},${U.top})`);
    Ts(W, J, V, K), lt && zs(W, J, V, { fontSize: l, tickValues: K, format: Y }), $s(W, J, a);
    const Mt = G && !ct ? {
      spans: O,
      position: G,
      across: G === "outside" ? i ? E + U.right - l : -U.top + l : J.axisAcross + j * (C + Nt + 3)
    } : null;
    Es(W, J, T, {
      fontSize: l,
      ticked: (H) => rt && at.has(H.label),
      label: (H, dt) => H.text(S(dt.label)),
      heading: p,
      tilt: Lt,
      groups: Mt
    });
    const wt = (H) => {
      const [dt, At] = tt(H.pos - y / 2, Math.min(X, V(H.count))), [Kt, vt] = tt(y, Math.abs(V(H.count) - X));
      return { x: dt, y: At, w: Kt, h: vt };
    }, It = W.append("g").selectAll("g").data(u).join("g");
    if (It.append("rect").attr("rx", 3).attr("fill", ut).attr("x", (H) => wt(H).x).attr("y", (H) => wt(H).y).attr("width", (H) => wt(H).w).attr("height", (H) => wt(H).h).on("mouseenter", (H, dt) => this._setHovered(dt, H)).on("mousemove", (H) => this.tooltip.move(H)).on("mouseleave", () => this._setHovered(null)), N) {
      const H = (dt) => tt(dt.pos, V(dt.count) - j * We);
      It.append("text").attr("x", (dt) => H(dt)[0]).attr("y", (dt) => H(dt)[1]).attr("dy", i ? "0.35em" : null).attr("text-anchor", i ? "start" : "middle").attr("font-size", l * $e).attr("font-weight", 600).attr("fill", Ys).text(R);
    }
    const $t = (H) => yt.append("text").attr("text-anchor", "middle").attr("font-size", l).attr("font-weight", 600).attr("fill", qe).text(H || "");
    $t(nt).attr("x", U.left + E / 2).attr("y", mt - l), Z ? Se(W, D, { fontSize: l, color: qe }) : $t(D).attr(
      "transform",
      `translate(${l + 2},${U.top + F / 2}) rotate(-90)`
    ), Rt(this.legend, q, {
      ...x,
      title: _s(x),
      fontSize: l,
      highlight: this.highlight
    });
  }
}
const Qs = {
  field: "label",
  title: null,
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
}, Js = {
  field: "count",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: null
}, to = {
  field: "key",
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: null,
  tickValues: null,
  format: null
};
function Qn(n, t, e, { sort: o } = {}) {
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
function eo(n = [], t = {}) {
  const e = t.axis ?? {}, o = it(Qs, e.y), s = it(Js, e.x), a = it(to, e.color), i = M.rollup(
    n,
    (c) => M.sum(c, s.accessor),
    o.accessor,
    a.accessor
  );
  o.domain = _t(o.domain, i.keys()), o.tickValues = je(o), a.domain = _t(a.domain, n.map(a.accessor));
  const r = o.domain.map((c) => {
    const u = i.get(c);
    let f = 0;
    const d = [];
    for (const v of a.domain) {
      const _ = (u == null ? void 0 : u.get(v)) ?? 0;
      _ > 0 && d.push({ key: v, count: _, start: f, end: f += _ });
    }
    return { label: c, count: f, segments: d };
  });
  s.domain ?? (s.domain = Me(s.type, [0, M.max(r, (c) => c.count) || 1], s.ticks)), a.range ?? (a.range = Tt(a.domain.length));
  const l = t.total ?? M.sum(r, (c) => c.count);
  return { axes: { category: o, value: s, color: a }, bars: r, total: l };
}
const so = 12, Ke = 6, Ye = 0.85, oo = "rgba(0,0,0,0.55)", no = {
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
class Jn {
  constructor(t, e = {}) {
    if (!t) throw new Error("StackedBarChart: a container element is required");
    this.container = t, this.options = { ...no, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("stacked-bar-chart", !0), this.legend = this.root.append("div"), this.svg = this.root.append("svg").attr("class", "stacked-bar-chart__svg").attr("role", "img"), this.tooltip = new jt(t), this.draw();
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
    const { width: t, rowHeight: e } = this.options, o = this.svg.node(), s = Xt(this.options.fontSize);
    this.tooltip.fontSize(s), this._setHovered(null);
    const { axes: a, bars: i, total: r } = eo(this.options.data, this.options), { category: l, value: c, color: u } = a, f = l.domain, d = l.format ?? String, v = u.format ?? String, _ = (w) => ke(w.count, r, this.options.barLabel);
    this._tooltipRows = (w) => {
      const m = [
        [st(l, "category"), d(w.label)],
        [st(u, "group"), v(w.key)],
        [st(c, "count"), `${w.count} of ${w.barCount}`],
        ["Share of total", ke(w.count, r, "percent")]
      ];
      return this.options.tooltip ? this.options.tooltip(w, m) : m;
    };
    const x = ge(l), b = St(f.map(d), s, o), L = {
      top: x ? oe(s) : s,
      right: St(i.map(_), s * Ye, o, 600) + Ke + 8,
      bottom: s + 16 + Et(s, c.title),
      left: (x ? 0 : Et(s, l.title)) + b + so
    }, S = t - L.left - L.right, p = f.length * e, z = L.top + p + L.bottom, N = M.scaleBand().domain(f).range(l.range || [0, p]).padding(0.3), R = qt(c.type).domain(c.domain).range(c.range || [0, S]), B = M.scaleOrdinal(u.domain, u.range), K = (w) => this.highlight.color(B(w.key), w, { color: w.key }), Y = fe(R, c), at = c.format ?? R.tickFormat(c.ticks ?? void 0);
    this.root.style("max-width", `${t}px`);
    const rt = i.map((w) => {
      const m = w.segments.map((A) => `${v(A.key)} ${A.count}`).join(", ");
      return `${d(w.label)}: ${w.count} (${m})`;
    }).join("; "), lt = this.svg.attr("viewBox", `0 0 ${t} ${z}`).attr(
      "aria-label",
      `Stacked bar chart of ${st(c, "count")} by ${st(l, "category")}, split by ${st(u, "group")}. ${rt}`
    );
    lt.selectAll("*").remove();
    const G = lt.append("g").attr("transform", `translate(${L.left},${L.top})`), ct = G.append("g").call(
      M.axisLeft(N).tickValues(l.tickValues ?? f).tickFormat(d).tickSizeOuter(0)
    ), h = G.append("g").attr("transform", `translate(0,${p})`).call(M.axisBottom(R).tickValues(Y).tickFormat(at).tickSizeOuter(0));
    for (const w of [ct, h])
      w.attr("font-family", null).attr("font-size", s), w.selectAll("text").attr("fill", "rgba(0,0,0,0.7)"), w.selectAll(".domain, .tick line").attr("stroke", "rgba(0,0,0,0.5)");
    G.insert("g", ":first-child").selectAll("line").data(Y).join("line").attr("y2", p).attr("x1", (w) => R(w)).attr("x2", (w) => R(w)).attr("stroke", "rgba(0,0,0,0.08)");
    const $ = G.append("g").selectAll("g").data(i).join("g");
    $.selectAll("rect").data((w) => w.segments.map((m) => ({ ...m, label: w.label, barCount: w.count }))).join("rect").attr("x", (w) => R(w.start)).attr("y", (w) => N(w.label)).attr("width", (w) => Math.max(0, R(w.end) - R(w.start))).attr("height", N.bandwidth()).attr("fill", K).attr("stroke", "#fff").attr("stroke-width", 1).on("mouseenter", (w, m) => this._setHovered(m, w)).on("mousemove", (w) => this.tooltip.move(w)).on("mouseleave", () => this._setHovered(null)), this.options.barLabel !== "none" && $.append("text").attr("x", (w) => R(w.count) + Ke).attr("y", (w) => N(w.label) + N.bandwidth() / 2).attr("dy", "0.35em").attr("font-size", s * Ye).attr("font-weight", 600).attr("fill", oo).text(_);
    const T = (w) => lt.append("text").attr("text-anchor", "middle").attr("font-size", s).attr("font-weight", 600).attr("fill", "rgba(0,0,0,0.6)").text(w || "");
    T(c.title).attr("x", L.left + S / 2).attr("y", z - s), x ? Se(G, l.title, { fontSize: s, color: "rgba(0,0,0,0.6)" }) : T(l.title).attr(
      "transform",
      `translate(${s + 2},${L.top + p / 2}) rotate(-90)`
    ), Rt(this.legend, B, { ...u, fontSize: s, highlight: this.highlight });
  }
}
const Fe = (n) => typeof n == "number" ? M.format(".2f")(n) : String(n), Os = {
  field: "x",
  title: null,
  type: "linear",
  domain: null,
  range: null,
  ticks: 6,
  tickValues: null,
  format: Fe
}, io = { ...Os, field: "y" }, ao = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  ticks: 5,
  tickValues: null,
  format: Fe
}, ro = {
  field: null,
  title: null,
  type: "constant",
  domain: null,
  range: [4, 4],
  ticks: 3,
  tickValues: null,
  format: Fe
}, lo = {
  id: "points",
  data: null,
  label: null,
  mark: "filled",
  color: null,
  key: null,
  tooltip: null
};
function co(n = [{}], t = []) {
  const e = n.map((s, a) => ({
    ...lo,
    ...s,
    data: a === 0 ? t : s.data ?? []
  }));
  if (new Set(e.map((s) => s.id)).size !== e.length) throw new Error("ScatterPlot: layer ids must be unique");
  return e;
}
function ho(n = [], t = {}) {
  const e = t.axis ?? {}, o = it(Os, e.x), s = it(io, e.y), a = it(ao, e.color), i = it(ro, e.radius), r = co(t.layers, n), l = r.flatMap((c) => c.data);
  for (const c of [o, s]) c.domain ?? (c.domain = Me(c.type, te(l.map(c.accessor))));
  if (a.accessor) {
    const c = r.filter((u) => !u.color).flatMap((u) => u.data.map(a.accessor));
    a.type === "sequential" ? (a.domain ?? (a.domain = te(c)), a.range ?? (a.range = M.interpolateViridis)) : (a.domain = _t(a.domain, c), a.range ?? (a.range = Tt(a.domain.length)));
  }
  return i.accessor && i.type !== "constant" && (i.domain ?? (i.domain = te(l.map(i.accessor)))), { axes: { x: o, y: s, color: a, radius: i }, layers: r };
}
const uo = {
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
}, po = 0.92;
function ze(n, t, e) {
  return qt(n.type).domain(t).range(n.range ?? e);
}
function fo(n) {
  if (!n.accessor)
    return () => Array.isArray(n.range) ? n.range[0] : Tt(1)[0];
  if (n.type === "sequential") {
    const t = typeof n.range == "function" ? n.range : M.interpolateRgbBasis(n.range);
    return M.scaleSequential(n.domain, t);
  }
  return M.scaleOrdinal(n.domain, n.range);
}
function go(n) {
  return !n.accessor || n.type === "constant" ? () => n.range[0] : qt(n.type).domain(n.domain).range(n.range);
}
class ti {
  constructor(t, e = {}) {
    if (!t) throw new Error("ScatterPlot: a container element is required");
    this.container = t, this.options = { ...uo }, this.axes = null, this.layers = [], this.highlight = new Vt(() => this._onHighlightChange()), this.zoomDomain = null, this.margin = null, this.scales = null, this.nodes = [], this.delaunay = null, this.brushing = !1, this.panning = !1, this.width = 0, this.hovered = null, this._build(), this.update(e), this._observeResize();
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
    this.options = { ...this.options, ...t }, this.fontSize = Xt(this.options.fontSize), this.root.style("font-size", `${this.fontSize}px`), this.tooltip.fontSize(this.fontSize);
    const { axes: e, layers: o } = ho(this.options.data, this.options);
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
    const { x: o, y: s } = this.scales, [a, i] = o.domain(), [r, l] = s.domain(), c = o.invert(0) - o.invert(t), u = s.invert(0) - s.invert(e);
    this._setZoomDomain({ x: [a + c, i + c], y: [r + u, l + u] }, !1);
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
    }), this.svg.on("mousemove", (t) => this._onMouseMove(t)).on("mouseleave", () => this._hideTooltip()).on("dblclick", () => this.resetZoom()), this.footer = this.root.append("div").attr("class", "scatter-plot__footer"), this.legend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.layerLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.sizeLegend = this.footer.append("div").attr("class", "scatter-plot__legend"), this.footer.append("div").attr("class", "scatter-plot__hint").text("Drag to zoom · shift+drag to pan · double-click to reset"), this.tooltip = new jt(this.container);
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
    const t = this.fontSize, { x: e, y: o } = this.axes, s = ge(o), a = { ...this.options.margin };
    if (a.top ?? (a.top = s ? oe(t) : 16), a.right ?? (a.right = 16), a.bottom ?? (a.bottom = t + 8 + Et(t, e.title)), a.left == null) {
      const i = ze(o, this._viewDomain.y, [0, 1]), r = fe(i, o).map(o.format), l = St(r, t * po, this.container);
      a.left = (s ? 0 : Et(t, o.title)) + l + 8;
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
      x: ze(o, r.x, [l, t - l]),
      y: ze(s, r.y, [e - l, l]),
      color: fo(a),
      radius: go(i)
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
      Qt(M.axisBottom(this.scales.x), s).tickSize(e).tickFormat("")
    ), l(this.gridY).call(
      Qt(M.axisLeft(this.scales.y), a).tickSize(-t).tickFormat("")
    ), l(this.axisX.attr("transform", `translate(0,${e})`)).call(
      Qt(M.axisBottom(this.scales.x), s).tickSizeOuter(0)
    ), l(this.axisY).call(Qt(M.axisLeft(this.scales.y), a).tickSizeOuter(0)), this.axisX.select(".domain").remove(), this.axisY.select(".domain").remove(), this.frame.attr(
      "d",
      this.options.border ? `M0,0H${t}V${e}H0Z` : `M0,0V${e}H${t}`
    ), this.titleX.attr("x", t / 2).attr("y", e + i.bottom - 8).text(s.title ?? ""), this.titleY.selectAll("*").remove(), ge(a) ? Se(this.titleY, a.title, { fontSize: r }) : this.titleY.append("text").attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("x", -e / 2).attr("y", -i.left + r + 2).text(a.title ?? "");
  }
  _drawPoints(t) {
    const e = this;
    this.layerGroups.each(function(o) {
      e._drawLayer(M.select(this), o, t);
    });
  }
  _drawLayer(t, e, o) {
    const s = e.key ?? this.options.key, a = e.mark === "outline" ? "stroke" : "fill", i = (d) => this._px(d), r = (d) => this._py(d), l = (d) => this._pr(d), { highlight: c } = this, u = (d) => c.color(this._pcolor(d, e), d, this._keys(d, e)), f = t.selectAll("circle").data(e.data, s);
    f.exit().remove(), f.enter().append("circle").attr("class", `scatter-plot__point scatter-plot__point--${e.mark}`).attr("cx", i).attr("cy", r).attr("r", l).attr(a, u), (o ? f.transition(o) : f).attr("cx", i).attr("cy", r).attr("r", l).attr(a, u), c.active && t.selectAll("circle").filter((d) => c.includes(d, this._keys(d, e))).raise();
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
      return i.append("g").attr("class", "scatter-plot__axis").attr("transform", "translate(0,8)").call(Qt(M.axisBottom(l), t).tickSize(3).tickSizeOuter(0)), this.legend;
    }
    return Rt(this.legend, e, {
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
    return Rt(this.layerLegend, (e) => e.color ?? "currentColor", {
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
    const o = fe(e, t), s = this.sizeLegend.selectAll(".scatter-plot__legend-item").data(o).join("span").attr("class", "scatter-plot__legend-item"), a = Math.max(...o.map(e));
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
      a === "color" && e.color || i.accessor && o.push([st(i, a), i.format(i.accessor(t))]);
    }
    const s = e.tooltip ?? this.options.tooltip;
    return s ? s(t, o, e) : o;
  }
  _hideTooltip() {
    this.tooltip.hide(), this.hoverRing.style("display", "none"), this._setHovered(null);
  }
}
const mo = { ...gs, context: null }, xo = { ...ms, field: "value" };
function yo(n) {
  const t = [...n].sort(M.ascending);
  if (!t.length) return { q1: NaN, median: NaN, q3: NaN, min: NaN, max: NaN, mean: NaN };
  const e = M.quantile(t, 0.25), o = M.quantile(t, 0.5), s = M.quantile(t, 0.75), a = s - e, i = t.filter((c) => c >= e - 1.5 * a && c <= s + 1.5 * a), r = Math.min(i.length ? i[0] : t[0], e), l = Math.max(i.length ? i[i.length - 1] : t[t.length - 1], s);
  return { q1: e, median: o, q3: s, min: r, max: l, mean: M.mean(t) };
}
function _o(n, t) {
  const e = [], o = [];
  for (const s of n) {
    const a = t(s);
    if (a == null || a === "") continue;
    const i = Number(a);
    Number.isFinite(i) && (e.push(s), o.push(i));
  }
  return { records: e, values: o };
}
function wo(n = [], t = {}) {
  const e = t.axis ?? {}, o = ws(e, t.orientation !== "vertical"), s = it(mo, o.category), a = it(xo, o.value), i = it(xs, e.group), r = it(ys, e.color), l = vs(s.context), c = (f, d, v) => {
    const { records: _, values: x } = _o(v, a.accessor), b = yo(x), L = v[0];
    return {
      group: f,
      label: d,
      context: l && L ? l(L) ?? null : null,
      count: x.length,
      records: _,
      values: x,
      stats: b,
      outliers: x.map((S, p) => p).filter((S) => x[S] < b.min || x[S] > b.max),
      color: r.accessor && L ? r.accessor(L) ?? null : null
    };
  };
  let u;
  if (i.accessor) {
    const f = M.group(n, i.accessor, s.accessor);
    i.domain = _t(i.domain, f.keys()), u = i.domain.flatMap((d) => {
      const v = f.get(d) ?? /* @__PURE__ */ new Map();
      return _t(s.domain, v.keys()).filter((x) => v.has(x)).map((x) => c(d, x, v.get(x)));
    });
  } else {
    const f = M.group(n, s.accessor);
    u = _t(s.domain, f.keys()).map(
      (d) => c(null, d, f.get(d) ?? [])
    );
  }
  if (s.domain = [...new Set(u.map((f) => f.label))], s.tickValues = je(s), a.domain ?? (a.domain = Me(a.type, te(u.flatMap((f) => f.values)))), r.accessor) {
    const f = u.map((d) => d.color).filter((d) => d != null);
    r.domain = _t(r.domain, f), r.range ?? (r.range = Tt(r.domain.length));
  }
  return { axes: { category: s, value: a, group: i, color: r }, boxes: u };
}
const Ze = "rgba(0,0,0,0.45)", Ee = "rgba(0,0,0,0.6)", vo = {
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
}, bo = 0.35, ko = 0.55, Lo = "rgba(0,0,0,0.87)", Ce = 2, xe = 2.5, Qe = 0.45, Mo = 0.9;
function Ao(n) {
  const t = Math.sin((n + 1) * 12.9898) * 43758.5453;
  return 2 * (t - Math.floor(t)) - 1;
}
class ei {
  constructor(t, e = {}) {
    if (!t) throw new Error("BoxPlotChart: a container element is required");
    this.container = t, this.options = { ...vo, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = { record: null, box: null }, this.hit = null, this.root = M.select(t).classed("box-plot-chart", !0), this.legend = this.root.append("div");
    const o = this.root.append("div").attr("class", "box-plot-chart__layer");
    this.canvas = o.append("canvas").attr("class", "box-plot-chart__canvas"), this.svg = o.append("svg").attr("class", "box-plot-chart__svg").attr("role", "img").on("mousemove", (s) => this._onMouseMove(s)).on("mouseleave", () => this._leave()), this.tooltip = new jt(t), this.draw();
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
    const { width: t, rowHeight: e, groupPadding: o, points: s, showCounts: a, threshold: i, rangePadding: r, border: l } = this.options, c = this.options.orientation !== "vertical", u = this.svg.node(), f = Xt(this.options.fontSize);
    this.tooltip.fontSize(f), this._leave();
    const { axes: d, boxes: v } = wo(this.options.data, this.options), { category: _, value: x, group: b, color: L } = d, S = !!b.accessor, p = _.format ?? String, z = b.format ?? String, N = x.format ?? M.format(".3~f"), R = (g) => g.context != null ? `${g.context} / ` : "", B = (g) => a ? ` (n=${g.count})` : "", K = (g) => R(g) + p(g.label) + B(g), Y = (g) => (S ? `${z(g.group)} / ` : "") + K(g), at = new Set(_.tickValues ?? _.domain), rt = qt(x.type).domain(x.domain), lt = fe(rt, x), G = x.format ?? rt.tickFormat(x.ticks ?? void 0), ct = (i == null ? void 0 : i.value) != null && i.value >= Math.min(...x.domain) && i.value <= Math.max(...x.domain), h = ct && i.label ? i.label : null, $ = _.showTicks !== !1, T = x.showTicks !== !1, w = S && b.showTicks !== !1 ? b.position : null, m = w === "inline", A = w === "axis", P = As(v, {
      grouped: S,
      padding: c ? Ls : ks,
      groupPadding: o,
      headingLanes: m
    }), { lanes: nt, totalSteps: D } = P, Z = S ? b.domain.map(z) : [], [Q, et] = [be(_), be(x)], [ot, ht] = c ? [et, Q] : [Q, et], ft = !!ht && ge(c ? _ : x), xt = ft ? 0 : Et(f, ht), U = St(Z, f, u, 600), mt = Math.max(
      $ ? St(v.map(K), f, u) : 0,
      m ? U : 0
    ), Lt = $ || m, C = w === "outside" ? f + bs : 0;
    let E, F, J = !1, tt;
    if (c)
      tt = Lt ? mt + ee : 0, E = {
        // The threshold label above the plot, or the title above the top tick
        top: Math.max(h ? 2 * f + 8 : f, ft ? oe(f) : 0),
        right: 16 + C,
        bottom: (T ? f + 16 : 8) + Et(f, ot),
        left: xt + tt + (A ? U + ee : 0)
      }, F = E.top + (S ? D : nt.length) * e + E.bottom;
    else {
      E = {
        top: Math.max(f, ft ? oe(f) : 0) + C,
        // The threshold label to the right of the plot
        right: 16 + (h ? St([h], f, u) + 6 : 0),
        bottom: 0,
        // below
        left: xt + (T ? St(lt.map(G), f, u) + ee : 0)
      };
      const g = Lt ? Ss({
        fontSize: f,
        labelWidth: mt,
        totalSteps: D,
        firstFraction: P.firstFraction,
        width: t,
        left: E.left,
        right: E.right
      }) : { tilt: !1, depth: 0, extra: 0, left: E.left };
      J = g.tilt, tt = g.depth, E.bottom = tt + (A ? Nt + 3 + f : 0) + 15 + Et(f, ot), E.left = g.left, F = this.options.height + g.extra;
    }
    const j = t - E.left - E.right, y = F - E.top - E.bottom, O = Ms(c, j, y), { at: V, catExtent: X, outward: q } = O, { bandwidth: ut, spans: yt } = P.place(_.range || [0, X]), W = rt.range(
      x.range || (c ? [r, j - r] : [y - r, r])
    ), Mt = me(L), { highlight: wt } = this, It = (g, I) => wt.includes(g.records[I], { color: g.color }, g), $t = new Map(
      v.map((g) => [g, !wt.active || g.records.some((I, pt) => It(g, pt))])
    ), H = (g) => Mt(g.color), dt = (g) => $t.get(g) ? H(g) : Ht, At = (g) => $t.get(g) ? L.accessor ? Lo : H(g) : Ht, Kt = L.accessor ? ko : bo, vt = v.filter((g) => g.count), ne = (g, I, pt) => {
      const [Pt, Bt] = V(pt, W(g.values[I]));
      return { box: g, index: I, record: g.records[I], value: g.values[I], x: Pt, y: Bt, lit: It(g, I) };
    }, Ft = vt.flatMap(
      (g) => s ? g.values.map((I, pt) => ne(g, pt, g.pos + Ao(pt) * ut / 2)) : g.outliers.map((I) => ne(g, I, g.pos))
    ), Te = M.group(Ft, (g) => g.box), ie = (g) => g.lit ? H(g.box) : Ht;
    this.root.style("max-width", `${t}px`);
    const zt = vt.map((g) => `${Y(g)}: median ${N(g.stats.median)}`).join("; "), Yt = this.svg.attr("viewBox", `0 0 ${t} ${F}`).attr(
      "aria-label",
      `Box plot of ${st(x, "value")} by ${st(_, "category")}` + (S ? ` within ${st(b, "group")}` : "") + `. ${zt}`
    );
    Yt.selectAll("*").remove();
    const bt = Yt.append("g").attr("transform", `translate(${E.left},${E.top})`);
    Ts(bt, O, W, lt), T && zs(bt, O, W, { fontSize: f, tickValues: lt, format: G }), $s(bt, O, l);
    const Gt = w && !m ? {
      spans: yt,
      position: w,
      across: w === "outside" ? c ? j + E.right - f : -E.top + f : O.axisAcross + q * (tt + Nt + 3)
    } : null;
    if (Es(bt, O, nt, {
      fontSize: f,
      ticked: (g) => $ && at.has(g.label),
      // A box's label in pieces, so the context and count are lighter
      label: (g, I) => {
        I.context != null && g.append("tspan").attr("fill", Ze).text(R(I)), g.append("tspan").text(p(I.label)), a && g.append("tspan").attr("fill", Ze).text(B(I));
      },
      heading: z,
      tilt: J,
      groups: Gt
    }), ct) {
      const g = W(i.value), [I, pt] = V(0, g), [Pt, Bt] = V(X, g);
      if (bt.append("line").attr("x1", I).attr("y1", pt).attr("x2", Pt).attr("y2", Bt).attr("stroke", Ae).attr("stroke-width", 1.5).attr("stroke-dasharray", "4,3"), h) {
        const [ae, re] = V(c ? -6 : X + 6, g);
        bt.append("text").attr("x", ae).attr("y", re).attr("text-anchor", c ? "middle" : "start").attr("dy", c ? null : "0.32em").attr("font-size", f).attr("fill", Ee).text(h);
      }
    }
    const Ut = bt.append("g").selectAll("g").data(vt).join("g").attr("stroke", dt).attr("fill", dt);
    this.drawPoints(s ? Ft : [], {
      width: t,
      height: F,
      offset: [E.left, E.top],
      color: ie,
      emphasis: wt.active
    }), se(
      Ut.append("line"),
      (g) => V(g.pos, W(g.stats.min)),
      (g) => V(g.pos, W(g.stats.max))
    ), se(
      Ut.selectAll(".cap").data((g) => [g.stats.min, g.stats.max].map((I) => ({ pos: g.pos, v: I }))).join("line").attr("class", "cap"),
      (g) => V(g.pos - ut / 4, W(g.v)),
      (g) => V(g.pos + ut / 4, W(g.v))
    );
    const Zt = (g) => {
      const I = W(g.stats.q1), pt = W(g.stats.q3), [Pt, Bt] = V(g.pos - ut / 2, Math.min(I, pt)), [ae, re] = V(ut, Math.max(1, Math.abs(pt - I)));
      return { x: Pt, y: Bt, w: ae, h: re };
    };
    Ut.append("rect").attr("x", (g) => Zt(g).x).attr("y", (g) => Zt(g).y).attr("width", (g) => Zt(g).w).attr("height", (g) => Zt(g).h).attr("fill-opacity", Kt), se(
      Ut.append("line"),
      (g) => V(g.pos - ut / 2, W(g.stats.median)),
      (g) => V(g.pos + ut / 2, W(g.stats.median))
    ).attr("stroke", At).attr("stroke-width", 2), Ut.append("circle").attr("cx", (g) => V(g.pos, W(g.stats.mean))[0]).attr("cy", (g) => V(g.pos, W(g.stats.mean))[1]).attr("r", 3).attr("fill", At), s || Ut.selectAll(".outlier").data((g) => Te.get(g) ?? []).join("circle").attr("class", "outlier").attr("cx", (g) => g.x).attr("cy", (g) => g.y).attr("r", xe).attr("fill", "#fff").attr("stroke", ie), this.hoverRing = bt.append("circle").attr("class", "box-plot-chart__hover-ring").attr("r", (s ? Ce : xe) + 2.5).style("display", "none");
    const k = (g) => Yt.append("text").attr("text-anchor", "middle").attr("font-size", f).attr("font-weight", 600).attr("fill", Ee).text(g || "");
    k(ot).attr("x", E.left + j / 2).attr("y", F - f), ft ? Se(bt, ht, { fontSize: f, color: Ee }) : k(ht).attr(
      "transform",
      `translate(${f + 2},${E.top + y / 2}) rotate(-90)`
    ), Rt(this.legend, Mt, {
      ...L,
      title: L.accessor ? _s(L) : null,
      fontSize: f,
      highlight: this.highlight
    });
    const { tooltip: gt } = this.options, kt = st(_, "category"), Ct = (g) => {
      const [I, pt] = [W(g.stats.min), W(g.stats.max)];
      return [Math.min(I, pt) - xe, Math.max(I, pt) + xe];
    };
    this.hit = {
      margin: E,
      marks: Ft,
      delaunay: Ft.length ? M.Delaunay.from(
        Ft,
        (g) => g.x,
        (g) => g.y
      ) : null,
      radius: this.options.hoverRadius,
      boxAt: (g, I) => {
        const [pt, Pt] = V(g, I);
        return vt.find((Bt) => {
          const [ae, re] = Ct(Bt);
          return Math.abs(pt - Bt.pos) <= ut / 2 && Pt >= ae && Pt <= re;
        }) ?? null;
      },
      markRows: (g) => {
        const I = [
          [kt, Y(g.box)],
          [st(x, "value"), N(g.value)]
        ];
        return gt ? gt(g.record, I, g.box) : I;
      },
      boxRows: (g) => {
        const I = g.stats, pt = [
          [kt, Y(g)],
          ["n", String(g.count)],
          ["Median", N(I.median)],
          ["Mean", N(I.mean)],
          ["Q1", N(I.q1)],
          ["Q3", N(I.q3)],
          ["Whiskers", `${N(I.min)} to ${N(I.max)}`]
        ];
        return gt ? gt(null, pt, g) : pt;
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
    var v, _;
    this.canvas.style("display", t.length ? null : "none");
    const l = (_ = (v = this.canvas.node()).getContext) == null ? void 0 : _.call(v, "2d");
    if (!l) return;
    const c = window.devicePixelRatio || 1;
    this.canvas.attr("width", Math.round(e * c)).attr("height", Math.round(o * c)), l.setTransform(c, 0, 0, c, 0, 0), l.clearRect(0, 0, e, o);
    const u = (x, b, L) => {
      l.globalAlpha = L, l.fillStyle = x, l.beginPath();
      for (const S of b) {
        const p = S.x + s, z = S.y + a;
        l.moveTo(p + Ce, z), l.arc(p, z, Ce, 0, 2 * Math.PI);
      }
      l.fill();
    }, f = M.group(t, i), d = f.get(Ht);
    d && u(Ht, d, Qe);
    for (const [x, b] of f)
      x !== Ht && u(x, b, r ? Mo : Qe);
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
const So = { field: null, title: null, format: null }, To = {
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
function Ot(n) {
  return n != null && n !== "" && !(typeof n == "number" && Number.isNaN(n));
}
function zo(n = [], t = {}) {
  var f;
  const e = t.axis ?? {}, o = (t.levels ?? []).map((d) => it(So, d)), s = it(To, e.color), a = it($o, e.radius), i = s.accessor ?? a.accessor, r = { key: "", label: "", level: -1, record: null, children: [] }, l = /* @__PURE__ */ new Map([[r.key, r]]);
  for (const d of n) {
    const v = [];
    for (const L of o) {
      const S = (f = L.accessor) == null ? void 0 : f.call(L, d);
      if (!Ot(S)) break;
      v.push(S);
    }
    if (!v.length) continue;
    let _ = r;
    v.forEach((L, S) => {
      const p = JSON.stringify(v.slice(0, S + 1));
      let z = l.get(p);
      z || (z = { key: p, label: L, level: S, record: null, children: [] }, l.set(p, z), _.children.push(z)), _ = z;
    });
    const x = _, b = i && !Ot(i(x.record ?? {})) && Ot(i(d));
    (!x.record || b) && (x.record = d);
  }
  const c = [...l.values()].filter((d) => d !== r);
  for (const d of c)
    d.value = d.record && i ? i(d.record) : null, d.empty = !d.record || i != null && !Ot(d.value), d.colorValue = !d.empty && s.accessor ? s.accessor(d.record) : null, d.radiusValue = !d.empty && a.accessor ? a.accessor(d.record) : null;
  const u = c.filter((d) => !d.empty);
  if (s.accessor) {
    const d = u.map((v) => v.colorValue).filter(Ot);
    s.type === "sequential" ? (s.domain ?? (s.domain = te(d)), s.range ?? (s.range = M.interpolateViridis)) : (s.domain = _t(s.domain, d), s.range ?? (s.range = Tt(s.domain.length)));
  }
  return a.accessor && a.type !== "constant" && (a.domain ?? (a.domain = te(u.map((d) => d.radiusValue).filter(Ot)))), { axes: { color: s, radius: a }, levels: o, root: r, nodes: c };
}
const Je = 12, ts = 2, Eo = 1.5, Co = 2.9, Ho = 7, He = 1.1, es = 4, ce = 2, Oo = 3.3, Ro = 0.92, Io = (n) => typeof n == "number" ? M.format(".2f")(n) : String(n), Po = { color: "#b4b2aa", radius: 6, label: null }, Bo = {
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
function Do(n, t, e, o) {
  const s = String(n ?? "").split(/\s+/).filter(Boolean), a = [];
  let i = "";
  for (const r of s) {
    const l = i ? `${i} ${r}` : r;
    i && Dt(l, e, o) > t ? (a.push(i), i = r) : i = l;
  }
  return i && a.push(i), a;
}
function No(n) {
  const { l: t } = M.lab(n);
  return Number.isFinite(t) && t > 60 ? "rgba(0,0,0,0.87)" : "#fff";
}
class si {
  constructor(t, e = {}) {
    if (!t) throw new Error("TreeChart: a container element is required");
    this.container = t, this.options = { ...Bo, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("tree-chart", !0), this.svg = this.root.append("svg").attr("class", "tree-chart__svg").attr("role", "img"), this.footer = this.root.append("div").attr("class", "tree-chart__footer"), this.legend = this.footer.append("div"), this.emptyLegend = this.footer.append("div").attr("class", "chart-legend"), this.tooltip = new jt(t), this.draw(), this._observeResize();
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
    var j;
    const { columnWidth: t, hover: e, valueLabel: o } = this.options, s = { ...Po, ...this.options.empty }, a = Xt(this.options.fontSize), i = this.options.width ?? (this.container.clientWidth || 640);
    this.width = i;
    const r = this.svg.node();
    this.tooltip.fontSize(a), this._setHovered(null);
    const { axes: l, levels: c, root: u } = zo(this.options.data, this.options);
    this.axes = l;
    const f = me(l.color), d = Bs(l.radius), v = l.color.accessor ? l.color : l.radius, _ = v.format ?? Io, x = (y) => {
      const O = c[y.level];
      return O != null && O.format ? O.format(y.label) : y.label;
    };
    this._tooltipRows = (y) => {
      const O = [[st(c[y.level], `Level ${y.level + 1}`), x(y)]];
      return Ot(y.value) && O.push([st(v, "value"), _(y.value)]), this.options.tooltip ? this.options.tooltip(y, O) : O;
    };
    const b = (y) => y.empty ? s.color : l.color.accessor ? f(y.colorValue) : f(), L = (y) => y.empty || l.radius.accessor && l.radius.type !== "constant" && !Ot(y.radiusValue) ? s.radius : d(y.radiusValue), S = (y) => this.highlight.color(b(y.data), y.data, { color: y.data.colorValue }), p = M.hierarchy(u), z = p.descendants().filter((y) => y.depth > 0);
    if (this.svg.selectAll("*").remove(), this._drawLegend(
      f,
      a,
      s,
      z.some((y) => y.data.empty)
    ), !z.length) {
      this.svg.attr("width", i).attr("height", 0).attr("aria-label", "Empty tree");
      return;
    }
    const N = He * a, R = /* @__PURE__ */ new Map();
    for (const y of z) {
      const O = c[y.depth - 1], V = O != null && O.format ? O.format(y.data.label) : y.data.label, X = Do(V, Ho * a, a, r), q = Math.max(0, ...X.map((ut) => Dt(ut, a, r)));
      R.set(y, { lines: X, width: q, height: X.length * N });
    }
    const B = (y) => L(y.data), K = (y) => Math.max(B(y), R.get(y).height / 2), Y = (y) => B(y) + es + R.get(y).width + ce, at = p.height || 1, rt = z.filter((y) => !y.children && y.depth === at), lt = Math.ceil(Math.max(0, ...rt.map(Y))), G = Math.max(0, ...z.filter((y) => y.depth === 1 && y.children).map(Y));
    let ct = Je, h = t;
    for (let y = 0; y < 3; y += 1)
      h = Math.max(1, Math.min(t, (i - ct - lt) / at)), ct = Math.max(Je, Math.ceil(G - h));
    const $ = Math.round(Co * a);
    M.tree().nodeSize([1, h]).separation((y, O) => {
      const V = K(y) + K(O) + ts;
      return y.parent === O.parent ? V : V * Eo;
    })(p);
    let T = 1 / 0, w = -1 / 0, m = 0;
    for (const y of z)
      T = Math.min(T, y.x), w = Math.max(w, y.x), m = Math.max(m, K(y));
    const A = w - T, P = m + ts, nt = $ + A + P * 2, D = Math.max(this.options.height, Math.ceil(nt)), Z = D - $, Q = A > 0 ? (Z - P * 2) / A : 1, et = $ + (Z - A * Q) / 2, ot = (y) => (y.x - T) * Q, ht = (y) => y.depth === 0 ? h - Oo * a : y.y, ft = this.svg.attr("width", i).attr("height", D).attr("font-size", a).attr(
      "aria-label",
      `Tree of ${c.map((y, O) => st(y, `level ${O + 1}`)).join(", then ")}: ${z.length} nodes`
    ), xt = ft.append("g").attr("transform", `translate(${ct},${et})`), U = /* @__PURE__ */ new Map();
    for (const y of z)
      U.has(y.depth) || U.set(y.depth, ((j = c[y.depth - 1]) == null ? void 0 : j.title) ?? "");
    ft.append("g").selectAll("text").data([...U]).join("text").attr("class", "tree-chart__header").attr("x", ([y]) => ct + y * h).attr("y", a * 1.2).attr("text-anchor", "middle").text(([, y]) => y);
    const mt = p.children.length > 1, Lt = xt.append("g").selectAll("path").data(p.links().filter((y) => mt || y.source.depth > 0)).join("path").attr("class", "tree-chart__link").attr("d", M.linkHorizontal().x(ht).y(ot)), C = xt.append("g").selectAll("g").data(z).join("g").attr("class", "tree-chart__node").attr("transform", (y) => `translate(${y.y},${ot(y)})`);
    C.append("circle").attr("class", "tree-chart__circle").attr("r", B).attr("fill", S), o && C.filter((y) => Ot(y.data.value)).append("text").attr("class", "tree-chart__value").attr("dy", "0.31em").attr("text-anchor", "middle").attr("font-size", a * Ro).attr("fill", (y) => No(S(y))).text((y) => _(y.data.value));
    const E = (y) => !!y.children, F = (y) => (E(y) ? -1 : 1) * (B(y) + es), J = C.filter((y) => R.get(y).lines.length).append("g").attr("class", "tree-chart__label").classed("tree-chart__label--empty", (y) => y.data.empty);
    J.append("rect").attr("class", "tree-chart__label-bg").attr("x", (y) => {
      const { width: O } = R.get(y);
      return (E(y) ? F(y) - O : F(y)) - ce;
    }).attr("y", (y) => -R.get(y).height / 2 - ce).attr("width", (y) => R.get(y).width + ce * 2).attr("height", (y) => R.get(y).height + ce * 2), J.append("text").attr("text-anchor", (y) => E(y) ? "end" : "start").selectAll("tspan").data((y) => {
      const { lines: O } = R.get(y);
      return O.map((V, X) => ({ line: V, i: X, count: O.length, x: F(y) }));
    }).join("tspan").attr("x", (y) => y.x).attr(
      "dy",
      (y) => y.i === 0 ? `${0.31 - (y.count - 1) * He / 2}em` : `${He}em`
    ).text((y) => y.line);
    const tt = (y) => {
      if (!e) return;
      const O = y && /* @__PURE__ */ new Set([...y.ancestors(), ...y.descendants()]), V = (q) => !!(O && O.has(q)), X = (q) => V(q.source) && V(q.target);
      C.classed("tree-chart__node--off-path", (q) => !!O && !V(q)), Lt.classed("tree-chart__link--on-path", X).classed("tree-chart__link--off-path", (q) => !!O && !X(q));
    };
    C.on("mouseenter", (y, O) => {
      tt(O), this._setHovered(O.data, y);
    }).on("mousemove", (y) => this.tooltip.move(y)).on("mouseleave", () => {
      tt(null), this._setHovered(null);
    });
  }
  /**
   * The color axis legend below the tree: swatches for categories, a ramp for a
   * sequential scale, and after it the `empty` entry when the tree has empty
   * nodes and a label for them.
   */
  _drawLegend(t, e, o, s) {
    const a = this.axes.color, i = { ...a, title: a.accessor ? a.title : null, fontSize: e };
    if (a.type === "sequential" ? Fs(this.legend, t, i) : Rt(this.legend, t, { ...i, shape: "circle", highlight: this.highlight }), this.emptyLegend.selectAll("*").remove(), !o.label || !s) {
      this.emptyLegend.style("display", "none");
      return;
    }
    const r = this.emptyLegend.style("display", null).style("font-size", `${e}px`).append("span").attr("class", "chart-legend__item");
    r.append("i").attr("class", "chart-legend__swatch chart-legend__swatch--circle").style("color", o.color), r.append("span").text(o.label);
  }
}
function ss(n, t) {
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
function Vo(n, t) {
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
function Oe(n, t) {
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
function Xo(n, t) {
  return n.sourceLinks.length ? n.depth : t - 1;
}
function ye(n) {
  return function() {
    return n;
  };
}
function os(n, t) {
  return Le(n.source, t.source) || n.index - t.index;
}
function ns(n, t) {
  return Le(n.target, t.target) || n.index - t.index;
}
function Le(n, t) {
  return n.y0 - t.y0;
}
function Re(n) {
  return n.value;
}
function jo(n) {
  return n.index;
}
function Fo(n) {
  return n.nodes;
}
function Go(n) {
  return n.links;
}
function is(n, t) {
  const e = n.get(t);
  if (!e) throw new Error("missing: " + t);
  return e;
}
function as({ nodes: n }) {
  for (const t of n) {
    let e = t.y0, o = e;
    for (const s of t.sourceLinks)
      s.y0 = e + s.width / 2, e += s.width;
    for (const s of t.targetLinks)
      s.y1 = o + s.width / 2, o += s.width;
  }
}
function Uo() {
  let n = 0, t = 0, e = 1, o = 1, s = 24, a = 8, i, r = jo, l = Xo, c, u, f = Fo, d = Go, v = 6;
  function _() {
    const h = { nodes: f.apply(null, arguments), links: d.apply(null, arguments) };
    return x(h), b(h), L(h), S(h), N(h), as(h), h;
  }
  _.update = function(h) {
    return as(h), h;
  }, _.nodeId = function(h) {
    return arguments.length ? (r = typeof h == "function" ? h : ye(h), _) : r;
  }, _.nodeAlign = function(h) {
    return arguments.length ? (l = typeof h == "function" ? h : ye(h), _) : l;
  }, _.nodeSort = function(h) {
    return arguments.length ? (c = h, _) : c;
  }, _.nodeWidth = function(h) {
    return arguments.length ? (s = +h, _) : s;
  }, _.nodePadding = function(h) {
    return arguments.length ? (a = i = +h, _) : a;
  }, _.nodes = function(h) {
    return arguments.length ? (f = typeof h == "function" ? h : ye(h), _) : f;
  }, _.links = function(h) {
    return arguments.length ? (d = typeof h == "function" ? h : ye(h), _) : d;
  }, _.linkSort = function(h) {
    return arguments.length ? (u = h, _) : u;
  }, _.size = function(h) {
    return arguments.length ? (n = t = 0, e = +h[0], o = +h[1], _) : [e - n, o - t];
  }, _.extent = function(h) {
    return arguments.length ? (n = +h[0][0], e = +h[1][0], t = +h[0][1], o = +h[1][1], _) : [[n, t], [e, o]];
  }, _.iterations = function(h) {
    return arguments.length ? (v = +h, _) : v;
  };
  function x({ nodes: h, links: $ }) {
    for (const [w, m] of h.entries())
      m.index = w, m.sourceLinks = [], m.targetLinks = [];
    const T = new Map(h.map((w, m) => [r(w, m, h), w]));
    for (const [w, m] of $.entries()) {
      m.index = w;
      let { source: A, target: P } = m;
      typeof A != "object" && (A = m.source = is(T, A)), typeof P != "object" && (P = m.target = is(T, P)), A.sourceLinks.push(m), P.targetLinks.push(m);
    }
    if (u != null)
      for (const { sourceLinks: w, targetLinks: m } of h)
        w.sort(u), m.sort(u);
  }
  function b({ nodes: h }) {
    for (const $ of h)
      $.value = $.fixedValue === void 0 ? Math.max(Oe($.sourceLinks, Re), Oe($.targetLinks, Re)) : $.fixedValue;
  }
  function L({ nodes: h }) {
    const $ = h.length;
    let T = new Set(h), w = /* @__PURE__ */ new Set(), m = 0;
    for (; T.size; ) {
      for (const A of T) {
        A.depth = m;
        for (const { target: P } of A.sourceLinks)
          w.add(P);
      }
      if (++m > $) throw new Error("circular link");
      T = w, w = /* @__PURE__ */ new Set();
    }
  }
  function S({ nodes: h }) {
    const $ = h.length;
    let T = new Set(h), w = /* @__PURE__ */ new Set(), m = 0;
    for (; T.size; ) {
      for (const A of T) {
        A.height = m;
        for (const { source: P } of A.targetLinks)
          w.add(P);
      }
      if (++m > $) throw new Error("circular link");
      T = w, w = /* @__PURE__ */ new Set();
    }
  }
  function p({ nodes: h }) {
    const $ = ss(h, (m) => m.depth) + 1, T = (e - n - s) / ($ - 1), w = new Array($);
    for (const m of h) {
      const A = Math.max(0, Math.min($ - 1, Math.floor(l.call(null, m, $))));
      m.layer = A, m.x0 = n + A * T, m.x1 = m.x0 + s, w[A] ? w[A].push(m) : w[A] = [m];
    }
    if (c) for (const m of w)
      m.sort(c);
    return w;
  }
  function z(h) {
    const $ = Vo(h, (T) => (o - t - (T.length - 1) * i) / Oe(T, Re));
    for (const T of h) {
      let w = t;
      for (const m of T) {
        m.y0 = w, m.y1 = w + m.value * $, w = m.y1 + i;
        for (const A of m.sourceLinks)
          A.width = A.value * $;
      }
      w = (o - w + i) / (T.length + 1);
      for (let m = 0; m < T.length; ++m) {
        const A = T[m];
        A.y0 += w * (m + 1), A.y1 += w * (m + 1);
      }
      lt(T);
    }
  }
  function N(h) {
    const $ = p(h);
    i = Math.min(a, (o - t) / (ss($, (T) => T.length) - 1)), z($);
    for (let T = 0; T < v; ++T) {
      const w = Math.pow(0.99, T), m = Math.max(1 - w, (T + 1) / v);
      B($, w, m), R($, w, m);
    }
  }
  function R(h, $, T) {
    for (let w = 1, m = h.length; w < m; ++w) {
      const A = h[w];
      for (const P of A) {
        let nt = 0, D = 0;
        for (const { source: Q, value: et } of P.targetLinks) {
          let ot = et * (P.layer - Q.layer);
          nt += G(Q, P) * ot, D += ot;
        }
        if (!(D > 0)) continue;
        let Z = (nt / D - P.y0) * $;
        P.y0 += Z, P.y1 += Z, rt(P);
      }
      c === void 0 && A.sort(Le), K(A, T);
    }
  }
  function B(h, $, T) {
    for (let w = h.length, m = w - 2; m >= 0; --m) {
      const A = h[m];
      for (const P of A) {
        let nt = 0, D = 0;
        for (const { target: Q, value: et } of P.sourceLinks) {
          let ot = et * (Q.layer - P.layer);
          nt += ct(P, Q) * ot, D += ot;
        }
        if (!(D > 0)) continue;
        let Z = (nt / D - P.y0) * $;
        P.y0 += Z, P.y1 += Z, rt(P);
      }
      c === void 0 && A.sort(Le), K(A, T);
    }
  }
  function K(h, $) {
    const T = h.length >> 1, w = h[T];
    at(h, w.y0 - i, T - 1, $), Y(h, w.y1 + i, T + 1, $), at(h, o, h.length - 1, $), Y(h, t, 0, $);
  }
  function Y(h, $, T, w) {
    for (; T < h.length; ++T) {
      const m = h[T], A = ($ - m.y0) * w;
      A > 1e-6 && (m.y0 += A, m.y1 += A), $ = m.y1 + i;
    }
  }
  function at(h, $, T, w) {
    for (; T >= 0; --T) {
      const m = h[T], A = (m.y1 - $) * w;
      A > 1e-6 && (m.y0 -= A, m.y1 -= A), $ = m.y0 - i;
    }
  }
  function rt({ sourceLinks: h, targetLinks: $ }) {
    if (u === void 0) {
      for (const { source: { sourceLinks: T } } of $)
        T.sort(ns);
      for (const { target: { targetLinks: T } } of h)
        T.sort(os);
    }
  }
  function lt(h) {
    if (u === void 0)
      for (const { sourceLinks: $, targetLinks: T } of h)
        $.sort(ns), T.sort(os);
  }
  function G(h, $) {
    let T = h.y0 - (h.sourceLinks.length - 1) * i / 2;
    for (const { target: w, width: m } of h.sourceLinks) {
      if (w === $) break;
      T += m + i;
    }
    for (const { source: w, width: m } of $.targetLinks) {
      if (w === h) break;
      T -= m;
    }
    return T;
  }
  function ct(h, $) {
    let T = $.y0 - ($.targetLinks.length - 1) * i / 2;
    for (const { source: w, width: m } of $.targetLinks) {
      if (w === h) break;
      T += m + i;
    }
    for (const { target: w, width: m } of h.sourceLinks) {
      if (w === $) break;
      T -= m;
    }
    return T;
  }
  return _;
}
var Be = Math.PI, De = 2 * Be, Wt = 1e-6, Wo = De - Wt;
function Ne() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function Rs() {
  return new Ne();
}
Ne.prototype = Rs.prototype = {
  constructor: Ne,
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
    var a = this._x1, i = this._y1, r = e - n, l = o - t, c = a - n, u = i - t, f = c * c + u * u;
    if (s < 0) throw new Error("negative radius: " + s);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = n) + "," + (this._y1 = t);
    else if (f > Wt) if (!(Math.abs(u * r - l * c) > Wt) || !s)
      this._ += "L" + (this._x1 = n) + "," + (this._y1 = t);
    else {
      var d = e - a, v = o - i, _ = r * r + l * l, x = d * d + v * v, b = Math.sqrt(_), L = Math.sqrt(f), S = s * Math.tan((Be - Math.acos((_ + f - x) / (2 * b * L))) / 2), p = S / L, z = S / b;
      Math.abs(p - 1) > Wt && (this._ += "L" + (n + p * c) + "," + (t + p * u)), this._ += "A" + s + "," + s + ",0,0," + +(u * d > c * v) + "," + (this._x1 = n + z * r) + "," + (this._y1 = t + z * l);
    }
  },
  arc: function(n, t, e, o, s, a) {
    n = +n, t = +t, e = +e, a = !!a;
    var i = e * Math.cos(o), r = e * Math.sin(o), l = n + i, c = t + r, u = 1 ^ a, f = a ? o - s : s - o;
    if (e < 0) throw new Error("negative radius: " + e);
    this._x1 === null ? this._ += "M" + l + "," + c : (Math.abs(this._x1 - l) > Wt || Math.abs(this._y1 - c) > Wt) && (this._ += "L" + l + "," + c), e && (f < 0 && (f = f % De + De), f > Wo ? this._ += "A" + e + "," + e + ",0,1," + u + "," + (n - i) + "," + (t - r) + "A" + e + "," + e + ",0,1," + u + "," + (this._x1 = l) + "," + (this._y1 = c) : f > Wt && (this._ += "A" + e + "," + e + ",0," + +(f >= Be) + "," + u + "," + (this._x1 = n + e * Math.cos(s)) + "," + (this._y1 = t + e * Math.sin(s))));
  },
  rect: function(n, t, e, o) {
    this._ += "M" + (this._x0 = this._x1 = +n) + "," + (this._y0 = this._y1 = +t) + "h" + +e + "v" + +o + "h" + -e + "Z";
  },
  toString: function() {
    return this._;
  }
};
function rs(n) {
  return function() {
    return n;
  };
}
function qo(n) {
  return n[0];
}
function Ko(n) {
  return n[1];
}
var Yo = Array.prototype.slice;
function Zo(n) {
  return n.source;
}
function Qo(n) {
  return n.target;
}
function Jo(n) {
  var t = Zo, e = Qo, o = qo, s = Ko, a = null;
  function i() {
    var r, l = Yo.call(arguments), c = t.apply(this, l), u = e.apply(this, l);
    if (a || (a = r = Rs()), n(a, +o.apply(this, (l[0] = c, l)), +s.apply(this, l), +o.apply(this, (l[0] = u, l)), +s.apply(this, l)), r) return a = null, r + "" || null;
  }
  return i.source = function(r) {
    return arguments.length ? (t = r, i) : t;
  }, i.target = function(r) {
    return arguments.length ? (e = r, i) : e;
  }, i.x = function(r) {
    return arguments.length ? (o = typeof r == "function" ? r : rs(+r), i) : o;
  }, i.y = function(r) {
    return arguments.length ? (s = typeof r == "function" ? r : rs(+r), i) : s;
  }, i.context = function(r) {
    return arguments.length ? (a = r ?? null, i) : a;
  }, i;
}
function tn(n, t, e, o, s) {
  n.moveTo(t, e), n.bezierCurveTo(t = (t + o) / 2, e, t, s, o, s);
}
function en() {
  return Jo(tn);
}
function sn(n) {
  return [n.source.x1, n.y0];
}
function on(n) {
  return [n.target.x0, n.y1];
}
function nn() {
  return en().source(sn).target(on);
}
const an = "(blank)", rn = { field: null, title: null, domain: null, format: null, sort: "descending" }, ln = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null
}, _e = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? an : String(e);
};
function cn(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, a) => n.get(a) - n.get(s)) : t.sort === "ascending" && e.sort((s, a) => n.get(s) - n.get(a));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function hn(n = [], t = {}) {
  var _;
  const e = (t.dimensions ?? []).map((x) => it(rn, x)), o = it(ln, (_ = t.axis) == null ? void 0 : _.color), s = e.findIndex((x) => x.field != null && x.field === o.field), a = Math.max(0, s), i = e.map((x, b) => {
    const L = M.rollup(
      n,
      (p) => p.length,
      (p) => _e(x.accessor, p)
    ), S = cn(L, x).map((p, z) => ({
      id: -1,
      dim: b,
      index: z,
      key: p,
      label: x.format ? x.format(p) : p,
      count: L.get(p)
    }));
    return {
      title: x.title ?? (typeof x.field == "string" ? x.field : ""),
      index: b,
      nodes: S,
      byKey: new Map(S.map((p) => [p.key, p]))
    };
  }), r = i.flatMap((x) => x.nodes);
  r.forEach((x, b) => {
    x.id = b;
  });
  const l = (x) => e.map((b) => _e(b.accessor, x)).join("\0"), c = M.rollups(n, (x) => x, l).map(([, x]) => {
    const b = e.map((S) => _e(S.accessor, x[0])), L = b.map((S, p) => i[p].byKey.get(S));
    return {
      keys: b,
      labels: L.map((S) => S.label),
      nodes: L,
      records: x,
      value: x.length
    };
  }), u = [a, ...e.map((x, b) => b).filter((x) => x !== a)];
  c.sort((x, b) => {
    for (const L of u) {
      const S = x.nodes[L].index - b.nodes[L].index;
      if (S) return S;
    }
    return 0;
  });
  const f = [];
  for (const x of c)
    for (let b = 1; b < e.length; b++)
      f.push({
        source: x.nodes[b - 1].id,
        target: x.nodes[b].id,
        pair: b - 1,
        keys: x.keys,
        labels: x.labels,
        records: x.records,
        value: x.value,
        colorKey: x.keys[a]
      });
  const d = i[a], v = e[a];
  return v && (o.field ?? (o.field = v.field), o.accessor = (x) => _e(v.accessor, x), o.format ?? (o.format = v.format)), o.domain = _t(
    o.domain,
    d ? d.nodes.map((x) => x.key) : []
  ), o.range ?? (o.range = Tt(o.domain.length)), {
    axes: { color: o },
    dimensions: e,
    colorIndex: a,
    columns: i.map(({ title: x, index: b, nodes: L }) => ({
      title: x,
      index: b,
      nodes: L
    })),
    nodes: r,
    paths: c,
    links: f,
    total: n.length
  };
}
const un = 2.3, ls = 5, cs = 6, dn = 2, we = 6, ve = 0.92, pn = "#333", fn = {
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
class oi {
  constructor(t, e = {}) {
    if (!t) throw new Error("ParallelSetsChart: a container element is required");
    this.container = t, this.options = { ...fn, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("parallel-sets", !0), this.svg = this.root.append("svg").attr("class", "parallel-sets__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.legend = this.root.append("div").attr("class", "parallel-sets__legend"), this.tooltip = new jt(t), this.draw(), this._observeResize();
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
    const { nodeWidth: t, nodePadding: e, fillColumns: o, hover: s, unit: a } = this.options, i = Xt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(i);
    const l = hn(this.options.data, this.options);
    this.prepared = l;
    const { axes: c, columns: u, colorIndex: f, total: d } = l, v = me(c.color), _ = (h) => this.highlight.includes(h, { color: h.colorKey });
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(v, i), !l.nodes.length || u.length < 2) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty parallel sets");
      return;
    }
    const x = this.svg.node(), b = u[u.length - 1], L = (h) => Dt(`${h.label} `, i, x) + Dt(h.count, i * ve, x), S = Math.ceil(
      Math.max(
        Dt(b.title, i * ve, x, 600),
        ...b.nodes.map(L)
      )
    ) + cs + dn, p = Math.round(un * i), z = Math.max(r - S, t * u.length), N = [
      [0, p + ls],
      [z, p + this.options.height - ls]
    ], R = Uo().nodeSort(null).linkSort(null).nodeWidth(t).nodePadding(e).extent(N)({
      nodes: l.nodes.map((h) => ({ ...h })),
      links: l.links.map((h) => ({ ...h }))
    });
    o && gn(R.nodes, u.length, N[0][1], N[1][1]);
    const B = nn(), K = (h) => h.x1 + cs, Y = (h) => h.dim === f ? this.highlight.color(v(h.key), h, { color: h.key }) : !this.highlight.active || h.sourceLinks.some(_) || h.targetLinks.some(_) ? pn : Ht, at = this.svg.attr("width", r).attr("height", p + this.options.height).attr("font-size", i).attr(
      "aria-label",
      `Parallel sets of ${d} ${a} across ${u.map((h) => h.title).join(", ")}`
    ), rt = (h) => R.nodes.find(($) => $.dim === h.index);
    at.append("g").selectAll("text").data(u.filter(rt)).join("text").attr("class", "parallel-sets__header").attr("x", (h) => K(rt(h))).attr("y", p - i * 0.9).attr("text-anchor", "start").attr("font-size", i * ve).text((h) => h.title);
    const lt = at.append("g").attr("fill", "none").selectAll("path").data(R.links).join("path").attr("class", "parallel-sets__link").attr("d", B).attr("stroke", (h) => this.highlight.color(v(h.colorKey), h, { color: h.colorKey })).attr("stroke-width", (h) => Math.max(h.width, 1)), G = at.append("g").selectAll("g").data(R.nodes).join("g").attr("class", "parallel-sets__node");
    G.append("rect").attr("class", "parallel-sets__node-rect").attr("x", (h) => h.x0).attr("y", (h) => h.y0).attr("width", (h) => h.x1 - h.x0).attr("height", (h) => Math.max(h.y1 - h.y0, 1)).attr("fill", Y), G.append("rect").attr("class", "parallel-sets__node-hit").attr("x", (h) => h.x0 - we).attr("y", (h) => h.y0 - we / 2).attr("width", (h) => h.x1 - h.x0 + we * 2).attr("height", (h) => Math.max(h.y1 - h.y0, 1) + we), G.append("text").attr("class", "parallel-sets__label").attr("x", K).attr("y", (h) => (h.y0 + h.y1) / 2).attr("dy", "0.35em").attr("text-anchor", "start").text((h) => `${h.label} `).append("tspan").attr("class", "parallel-sets__label-count").attr("font-size", i * ve).text((h) => h.count), s && this._bindHover(G, lt, R);
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
      const l = r.keys.slice(0, r.pair + 2), c = o.links.filter((d) => d.pair === r.pair && l.every((v, _) => d.keys[_] === v)).reduce((d, v) => d + v.value, 0), u = r.labels.slice(0, l.length), f = { type: "link", keys: l, labels: u, pair: r.pair, value: c };
      this._setHovered(f), this.tooltip.show(this._linkTooltip(f), i, r);
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
    Rt(this.legend, t, { ...o, fontSize: e, highlight: this.highlight });
  }
}
function gn(n, t, e, o) {
  for (let s = 0; s < t; s++) {
    const a = n.filter((c) => c.dim === s).sort((c, u) => c.y0 - u.y0);
    if (a.length < 2) continue;
    const i = a.reduce((c, u) => c + (u.y1 - u.y0), 0), r = (o - e - i) / (a.length - 1);
    let l = e;
    for (const c of a) {
      const u = c.y1 - c.y0;
      c.y0 = l, c.y1 = l + u, l += u + r;
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
const mn = "(blank)", Ve = {
  field: null,
  title: null,
  domain: null,
  format: null,
  sort: "descending"
}, xn = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, de = (n, t) => {
  const e = n == null ? void 0 : n(t);
  return e == null || e === "" ? mn : String(e);
};
function Ge(n, t) {
  const e = [...n.keys()];
  t.sort === "descending" ? e.sort((s, a) => n.get(a) - n.get(s)) : t.sort === "ascending" && e.sort((s, a) => n.get(s) - n.get(a));
  const o = (t.domain ?? []).filter((s) => n.has(s));
  return [...o, ...e.filter((s) => !o.includes(s))];
}
function Jt(n, t) {
  if (!t.accessor)
    return n.length ? [{ key: null, label: "", index: 0, count: n.length }] : [];
  const e = M.rollup(
    n,
    (o) => o.length,
    (o) => de(t.accessor, o)
  );
  return Ge(e, t).map((o, s) => ({
    key: o,
    label: t.format ? t.format(o) : o,
    index: s,
    count: e.get(o)
  }));
}
function pe(n = [], t = {}, e = !1) {
  const o = n.find((i) => i.field != null && i.field === (t == null ? void 0 : t.field));
  if (!o) return t;
  const { color: s, ...a } = o;
  return e ? { ...a, ...s, ...t } : { ...a, ...t };
}
function yn(n = [], t = {}) {
  var _, x, b;
  const e = t.dimensions ?? [], o = it(Ve, pe(e, (_ = t.axis) == null ? void 0 : _.x)), s = it(Ve, pe(e, (x = t.axis) == null ? void 0 : x.y)), a = it(xn, pe(e, (b = t.axis) == null ? void 0 : b.color, !0)), i = Jt(n, o), r = Jt(n, s).map((L) => ({
    ...L,
    cells: i.map((S) => ({ row: L.index, column: S.index, count: 0, units: [] }))
  }));
  o.domain = i.map((L) => L.key), s.domain = r.map((L) => L.key);
  const l = a.accessor ? (L) => de(a.accessor, L) : () => null;
  if (a.accessor) {
    const L = M.rollup(n, (S) => S.length, l);
    a.domain = _t(a.domain, Ge(L, a)), a.range ?? (a.range = Tt(a.domain.length));
  } else
    a.domain = [];
  const c = new Map(a.domain.map((L, S) => [L, S])), u = new Map(r.map((L) => [L.key, L.index])), f = new Map(i.map((L) => [L.key, L.index]));
  n.forEach((L, S) => {
    const p = s.accessor ? de(s.accessor, L) : null, z = o.accessor ? de(o.accessor, L) : null, N = u.get(p), R = f.get(z), B = r[N].cells[R];
    B.units.push({ record: L, index: S, row: N, column: R, rowKey: p, columnKey: z, colorKey: l(L) }), B.count += 1;
  });
  const d = (L) => c.get(L.colorKey) ?? c.size, v = [];
  for (const L of r)
    for (const S of L.cells)
      S.units.sort((p, z) => d(p) - d(z) || p.index - z.index), v.push(...S.units);
  return { axes: { x: o, y: s, color: a }, columns: i, rows: r, units: v, total: n.length };
}
const ue = 0.92, hs = 1.7, _n = 1.9, wn = 1.9, vn = 0.67, bn = 0.5, kn = 1, Ln = 1.08, us = 3, Mn = 0.4, Xe = 1.25, An = 2, Sn = 0.6, Tn = 3, $n = {
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
class ni {
  constructor(t, e = {}) {
    if (!t) throw new Error("UnitMatrixChart: a container element is required");
    this.container = t, this.options = { ...$n, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("unit-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "unit-matrix__scroll").append("svg").attr("class", "unit-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new jt(t), this.draw(), this._observeResize();
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
    const { unitSize: t, unitPadding: e, showCounts: o, unit: s } = this.options, a = Xt(this.options.fontSize), i = this.options.width ?? (this.container.clientWidth || 640);
    this.width = i, this.tooltip.fontSize(a);
    const r = yn(this.options.data, this.options);
    this.prepared = r;
    const { axes: l, columns: c, rows: u, total: f } = r;
    this._dropStaleSelection(l.color);
    const d = me(l.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(d, a), !u.length || !c.length) {
      this.svg.attr("width", i).attr("height", 0).attr("aria-label", "Empty unit matrix");
      return;
    }
    const v = this.svg.node(), _ = zn(r, {
      width: i,
      fontSize: a,
      unitSize: t,
      unitPadding: e,
      showCounts: o,
      measure: (p, z, N) => Dt(p, z, v, N)
    });
    this.layout = _;
    const x = [l.y, l.x].filter((p) => p.accessor).map((p, z) => st(p, z ? "column" : "row")), b = this.svg.attr("width", _.width).attr("height", _.height).attr("font-size", a).attr(
      "aria-label",
      `Unit matrix of ${f} ${s}${x.length ? ` by ${x.join(" and ")}` : ""}`
    );
    b.append("g").selectAll("line").data(_.columns).join("line").attr("class", "unit-matrix__rule unit-matrix__rule--column").attr("x1", (p) => p.x + 0.5).attr("x2", (p) => p.x + 0.5).attr("y1", _.headerHeight).attr("y2", _.height), b.append("g").selectAll("line").data(_.rows).join("line").attr("class", "unit-matrix__rule").classed("unit-matrix__rule--first", (p, z) => z === 0).attr("x1", 0).attr("x2", _.plotRight).attr("y1", (p) => p.y + 0.5).attr("y2", (p) => p.y + 0.5), b.append("g").selectAll("text").data(_.titles).join("text").attr("class", "unit-matrix__title").attr("x", (p) => p.x).attr("y", (p) => p.y).attr("text-anchor", "start").attr("font-size", a * ue).text((p) => p.text);
    const L = b.append("g").selectAll("text").data([..._.columns, ..._.rows].filter((p) => p.label)).join("text").attr("class", "unit-matrix__label").attr("x", (p) => p.label.x).attr("y", (p) => p.label.y).attr("dy", (p) => p.label.middle ? "0.35em" : null).attr("text-anchor", "start");
    L.selectAll("tspan").data((p) => p.label.lines.map((z, N) => ({ text: z, i: N, x: p.label.x }))).join("tspan").attr("x", (p) => p.x).attr("dy", (p) => p.i ? `${Xe}em` : null).text((p) => p.text), o && L.append("tspan").attr("class", "unit-matrix__label-count").attr("font-size", a * ue).attr("x", (p) => p.label.countBelow ? p.label.x : null).attr("dy", (p) => p.label.countBelow ? `${Xe / ue}em` : null).text((p) => p.label.countBelow ? p.band.count : ` ${p.band.count}`), L.filter((p) => p.label.cut).append("title").text((p) => p.band.label);
    const S = b.append("g").selectAll("rect").data(_.units).join("rect").attr("class", "unit-matrix__unit").attr("x", (p) => p.x + 0.5).attr("y", (p) => p.y + 0.5).attr("width", t - 1).attr("height", t - 1).attr("rx", An).attr(
      "fill",
      (p) => this.highlight.color(d(p.unit.colorKey), p.unit.record, { color: p.unit.colorKey })
    );
    b.append("g").selectAll("text").data(_.counts).join("text").attr("class", "unit-matrix__count").attr("x", (p) => p.x).attr("y", (p) => p.y).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", a * ue).text((p) => p.count), this._bindHover(S);
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
    e.y.accessor && a.push([st(e.y, "Row"), s[t.row].label]), e.x.accessor && a.push([st(e.x, "Column"), o[t.column].label]);
    const i = [e.x, e.y].some(
      (r) => typeof r.field == "string" && r.field === e.color.field
    );
    if (e.color.accessor && !i) {
      const r = e.color.format ?? ((l) => l);
      a.push([st(e.color, "Color"), r(t.colorKey)]);
    }
    return this.options.tooltip ? this.options.tooltip(t, a) : a;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color, s = o.accessor ? o.title : null;
    Rt(this.legend, t, { ...o, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("unit-matrix__legend", !0);
  }
}
function ds(n, t, e) {
  if (!n) return 0;
  const o = Math.ceil(n / t), s = o * t - n;
  return e > s ? o + 1 : o;
}
function zn(n, t) {
  const { axes: e, columns: o, rows: s } = n, { width: a, fontSize: i, unitSize: r, unitPadding: l, showCounts: c, measure: u } = t, f = r + l, d = i * ue, v = Math.round(i * vn), _ = Math.round(i * bn), x = e.x.accessor != null, b = e.y.accessor != null, L = x && e.x.title || null, S = b && e.y.title || null, p = (C) => c ? u(C, d) : 0, z = (C) => u(`${C.label} `, i) + p(C.count), N = (C) => C ? u(C.toUpperCase(), d, 600) * Ln : 0, R = (C) => c ? Math.ceil((p(C) + us) / f) : 0, B = b ? Math.max(0, ...s.map(z)) : 0, K = Math.ceil(
    Math.max(Math.min(B, a * Mn), N(S))
  ), Y = K ? K + Math.round(i * kn) : 0, at = o.map((C, E) => s.map((F) => F.cells[E])), rt = (C, E) => Math.max(1, ...at[C].map((F) => ds(F.count, E, R(F.count)))), lt = at.map(
    (C) => Math.max(1, ...C.map((E) => E.count + R(E.count)))
  ), G = (C) => 2 * v + C * r + (C - 1) * l, ct = (C, E) => {
    const F = Sn * C / o.length, J = E.map((X) => Math.max(X, F)), tt = (X, q) => Math.max(G(q), J[X]), j = o.map(
      (X, q) => Math.max(1, Math.floor((J[q] - 2 * v + l) / f))
    );
    let y = j.reduce((X, q, ut) => X + tt(ut, q), 0);
    for (; ; ) {
      let X = -1, q = 1;
      if (j.forEach((ut, yt) => {
        if (ut >= lt[yt] || y + tt(yt, ut + 1) - tt(yt, ut) > C) return;
        const W = rt(yt, ut);
        W > q && (X = yt, q = W);
      }), X < 0) break;
      y += tt(X, j[X] + 1) - tt(X, j[X]), j[X] += 1;
    }
    const O = Math.max(0, C - y) / o.length, V = j.map((X, q) => tt(q, X) + O);
    return { perLine: j, widths: V, total: V.reduce((X, q) => X + q, 0) };
  }, h = o.length * G(Tn), $ = () => Math.max(a - Y, h), w = o.map((C) => x ? z(C) : 0).map((C) => x ? Math.ceil(C) + v : 0);
  let m = ct($(), w);
  if (x && m.total > $() + 0.5) {
    const C = o.map(
      (E) => Math.max(p(E.count), ...Ks(E.label).map((F) => u(F, i)))
    );
    m = ct(
      $(),
      C.map((E) => Math.ceil(E) + v)
    );
  }
  const A = Y + m.total, P = o.map((C, E) => {
    if (!x) return null;
    const F = m.widths[E] - v, J = Hs(C.label, F, (j) => u(j, i)), tt = u(`${J[J.length - 1]} `, i) + p(C.count);
    return { lines: J, countBelow: c && tt > F + 0.5 };
  }), nt = i * Xe, D = Math.max(
    1,
    ...P.map((C) => C ? C.lines.length + (C.countBelow ? 1 : 0) : 1)
  ), Z = L ? Math.round(i * hs) : 0, Q = x ? Math.round(i * _n + (D - 1) * nt) : 0, et = Math.max(
    Z + Q,
    S ? Math.round(i * hs) : 0,
    Math.round(i * 0.5)
  ), ot = [];
  L && ot.push({ text: L, x: Y + v, y: Math.round(i * 1.05) }), S && ot.push({ text: S, x: 0, y: et - Math.round(i * 0.6) });
  let ht = Y;
  const ft = o.map((C, E) => {
    const F = { band: C, x: ht, width: m.widths[E], perLine: m.perLine[E], label: null };
    if (x) {
      const { lines: J, countBelow: tt } = P[E], j = J.length - 1 + (tt ? 1 : 0);
      F.label = {
        lines: J,
        countBelow: tt,
        x: ht + v,
        y: et - Math.round(i * 0.6) - j * nt,
        middle: !1,
        cut: !1
      };
    }
    return ht += m.widths[E], F;
  }), xt = [], U = [];
  let mt = et;
  const Lt = s.map((C) => {
    const E = Math.max(
      1,
      ...C.cells.map((j, y) => ds(j.count, m.perLine[y], R(j.count)))
    ), F = Math.max(
      2 * _ + E * r + (E - 1) * l,
      Math.ceil(i * wn)
    ), J = mt + _ + r / 2, tt = { band: C, y: mt, height: F, label: null };
    if (b) {
      const j = K - p(C.count) - u(" ", i), y = z(C) <= K ? C.label : he(C.label, j, (O) => u(O, i));
      tt.label = {
        lines: [y],
        countBelow: !1,
        x: 0,
        y: J,
        middle: !0,
        cut: y !== C.label
      };
    }
    return C.cells.forEach((j, y) => {
      const O = ft[y], V = O.x + v;
      if (j.units.forEach((yt, W) => {
        xt.push({
          unit: yt,
          x: V + W % O.perLine * f,
          y: mt + _ + Math.floor(W / O.perLine) * f
        });
      }), !c || !j.count) return;
      const X = Math.ceil(j.count / O.perLine) - 1, q = j.count - X * O.perLine, ut = O.perLine - q >= R(j.count);
      U.push({
        count: j.count,
        x: ut ? V + q * f - l + us : V,
        y: J + (ut ? X : X + 1) * f
      });
    }), mt += F, tt;
  });
  return {
    // The small allowance keeps a float sum from rounding a fitting chart up a pixel
    width: Math.max(a, Math.ceil(A - 0.01)),
    height: mt + 1,
    headerHeight: et,
    plotLeft: Y,
    plotRight: A,
    titles: ot,
    columns: ft,
    rows: Lt,
    units: xt,
    counts: U
  };
}
const En = {
  field: null,
  title: null,
  type: "categorical",
  domain: null,
  range: null,
  tickValues: null,
  format: null,
  sort: "descending"
}, Cn = {
  field: null,
  title: null,
  domain: null,
  ticks: null,
  format: null,
  showTicks: !0,
  showTitle: !0
}, Is = {
  ...Ve,
  shared: !1,
  showTicks: !0,
  showTitle: !0,
  position: "column"
}, Hn = { ...Is, showTicks: !1 };
function On(n = [], t = {}) {
  var w;
  const e = t.dimensions ?? [], o = t.axis ?? {}, s = (m) => it(
    m === "series" ? Hn : Is,
    pe(e, o[m])
  ), a = s("x"), i = s("y"), r = s("group"), l = s("series"), c = it(Cn, o.value), u = ((w = o.color) == null ? void 0 : w.field) != null, f = l.field != null ? l : r, d = {};
  !u && f.title != null && (d.title = f.title), !u && f.format != null && (d.format = f.format);
  const v = it(
    En,
    pe(
      e,
      { ...d, ...o.color, field: u ? o.color.field : f.field },
      !0
    )
  ), _ = Jt(n, a), x = Jt(n, r), b = Jt(n, l), L = Jt(n, i).map((m) => ({
    ...m,
    cells: _.map((A) => ({ row: m.index, column: A.index, bars: [] }))
  }));
  a.domain = _.map((m) => m.key), i.domain = L.map((m) => m.key), r.domain = x.map((m) => m.key), l.domain = b.map((m) => m.key);
  const S = (m) => m.accessor ? (A) => de(m.accessor, A) : () => null, p = S(v);
  if (v.accessor) {
    const m = M.rollup(n, (A) => A.length, p);
    v.domain = _t(v.domain, Ge(m, v)), v.range ?? (v.range = Tt(v.domain.length));
  } else
    v.domain = [];
  const z = new Map(v.domain.map((m, A) => [m, A])), N = c.accessor ? (m) => +c.accessor(m) || 0 : () => 1, R = (m) => new Map(m.map((A) => [A.key, A.index])), [B, K, Y, at] = [L, _, x, b].map(
    R
  ), [rt, lt, G, ct] = [i, a, r, l].map(S), h = [], $ = M.group(n, rt, lt, G, ct);
  for (const [m, A] of $)
    for (const [P, nt] of A)
      for (const [D, Z] of nt)
        for (const [Q, et] of Z) {
          const ot = {
            row: B.get(m),
            column: K.get(P),
            group: Y.get(D),
            series: at.get(Q),
            rowKey: m,
            columnKey: P,
            groupKey: D,
            seriesKey: Q,
            value: M.sum(et, N),
            records: et,
            segments: []
          };
          let ht = 0;
          ot.segments = M.groups(et, p).sort((ft, xt) => (z.get(ft[0]) ?? 0) - (z.get(xt[0]) ?? 0)).map(([ft, xt]) => {
            const U = ht;
            return ht += M.sum(xt, N), { bar: ot, colorKey: ft, value: ht - U, start: U, end: ht, records: xt };
          }), h.push(ot);
        }
  h.sort(
    (m, A) => m.row - A.row || m.column - A.column || m.group - A.group || m.series - A.series
  );
  for (const m of h) L[m.row].cells[m.column].bars.push(m);
  for (const m of L) {
    const A = m.cells.flatMap((D) => D.bars), P = M.rollup(
      A,
      (D) => new Set(D.map((Z) => Z.series)),
      (D) => D.group
    );
    m.groups = x.filter((D) => r.shared || P.has(D.index)).map((D, Z) => ({
      ...D,
      slot: Z,
      series: b.filter((Q) => {
        var et;
        return l.shared || ((et = P.get(D.index)) == null ? void 0 : et.has(Q.index));
      }).map((Q, et) => ({ ...Q, slot: et }))
    }));
    const nt = new Map(m.groups.map((D) => [D.index, D]));
    for (const D of A) {
      const Z = nt.get(D.group);
      D.groupSlot = Z.slot, D.seriesSlot = Z.series.find((Q) => Q.index === D.series).slot;
    }
  }
  const T = M.max(h, (m) => m.value) || 1;
  return c.domain ?? (c.domain = M.scaleLinear().domain([0, T]).nice(c.ticks ?? 4).domain()), {
    axes: { x: a, y: i, group: r, series: l, color: v, value: c },
    columns: _,
    rows: L,
    groups: x,
    series: b,
    bars: h,
    total: n.length
  };
}
const Rn = 0.92, Ie = 1.7, In = 1.9, ps = 1.25, Pn = 1.9, Bn = 1.9, Dn = 1.6, Nn = 0.67, Vn = 0.67, Xn = 1, jn = 1.08, Fn = 0.22, Gn = 9, Un = 5, fs = 4, Wn = 1, qn = {
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
class ii {
  constructor(t, e = {}) {
    if (!t) throw new Error("BarMatrixChart: a container element is required");
    this.container = t, this.options = { ...qn, ...e }, this.highlight = new Vt(() => this._onHighlightChange()), this.hovered = null, this.root = M.select(t).classed("bar-matrix", !0), this.legend = this.root.append("div"), this.svg = this.root.append("div").attr("class", "bar-matrix__scroll").append("svg").attr("class", "bar-matrix__svg").attr("role", "img").on("mouseleave", () => this._setHovered(null)), this.tooltip = new jt(t), this.draw(), this._observeResize();
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
    const { barSize: t, barPadding: e, groupPadding: o, showValues: s, unit: a } = this.options, i = Xt(this.options.fontSize), r = this.options.width ?? (this.container.clientWidth || 640);
    this.width = r, this.tooltip.fontSize(i);
    const l = On(this.options.data, this.options);
    this.prepared = l;
    const { axes: c, columns: u, rows: f, groups: d, series: v, bars: _, total: x } = l;
    this._dropStaleSelection(c.color);
    const b = me(c.color);
    if (this.svg.selectAll("*").remove(), this._setHovered(null), this._drawLegend(b, i), !f.length || !u.length) {
      this.svg.attr("width", r).attr("height", 0).attr("aria-label", "Empty bar matrix");
      return;
    }
    const L = this.svg.node(), S = (k, gt = i, kt) => Dt(k, gt, L, kt), p = i * Rn, z = Math.round(i * Nn), N = Math.round(i * Vn), R = Math.round(i * Xn), B = (k) => k.accessor != null && k.showTicks !== !1, K = B(c.y), Y = B(c.x), at = B(c.group), rt = B(c.series), lt = c.value.showTicks !== !1, G = (k, gt) => gt && k.showTitle !== !1 && k.title || null, ct = (k) => k ? S(k.toUpperCase(), p, 600) * jn : 0, h = Math.min(p, t + e), $ = (k, gt, kt, Ct, g) => k ? Math.ceil(
      Math.max(
        Math.min(
          Math.max(0, ...gt.map((I) => S(I.label, Ct, g))),
          r * Fn
        ),
        ct(kt)
      )
    ) : 0, T = G(c.y, K), w = G(c.group, at), m = G(c.series, rt), A = at && c.group.position === "heading", P = A ? Math.round(i * Dn) : 0, nt = A ? [w, m].filter(Boolean).join(" / ") : m, D = $(K, f, T, i, 600), Z = $(at && !A, d, w, i), Q = Math.max(
      $(rt, v, nt, h),
      $(A, d, nt, i, 600)
    ), et = D ? D + R : 0, ot = et + (Z ? Z + R : 0), ht = ot + (Q ? Q + R : 0), ft = Math.max((r - ht) / u.length, i * Gn), xt = ht + ft * u.length, [, U] = c.value.domain, mt = (k) => c.value.format ?? M.scaleLinear().domain(c.value.domain).tickFormat(k), Lt = s ? Math.ceil(S(mt(4)(U), p)) + fs + 2 : 0, C = Math.max(ft - 2 * z - Lt, i * 2), E = M.scaleLinear().domain(c.value.domain).range([0, C]), F = c.value.ticks ?? Math.max(2, Math.floor(C / (i * Un))), J = mt(F), tt = st(c.value, a.charAt(0).toUpperCase() + a.slice(1)), j = c.value.showTitle !== !1 ? tt : null, y = G(c.x, c.x.accessor != null), O = i * ps, V = u.map(
      (k) => Y ? Hs(k.label, ft - z, (gt) => S(gt)) : []
    ), X = Math.max(1, ...V.map((k) => k.length)), q = y ? Math.round(i * Ie) : 0, ut = Y ? Math.round(i * In + (X - 1) * O) : 0, yt = Math.max(
      q + ut,
      T || w || m ? Math.round(i * Ie) : 0,
      Math.round(i * 0.5)
    ), W = yt - Math.round(i * 0.6), Mt = [];
    y && Mt.push({ text: y, x: ht + z, y: Math.round(i * 1.05) }), T && Mt.push({ text: T, x: 0, y: W }), w && !A && Mt.push({ text: w, x: et, y: W }), nt && Mt.push({ text: nt, x: ot, y: W });
    const wt = t + e, It = (k) => Math.max(1, k.series.length) * wt - e;
    let $t = yt;
    const H = f.map((k) => {
      let gt = N;
      const kt = k.groups.map((I) => {
        const pt = $t + gt + P;
        return gt += P + It(I) + o, pt;
      }), Ct = gt - (k.groups.length ? o : 0) + N, g = { y: $t, height: Math.max(Ct, Math.ceil(i * Bn)), groupY: kt };
      return $t += g.height, g;
    }), dt = (k) => ht + k * ft, At = (k) => H[k.row].groupY[k.groupSlot] + k.seriesSlot * wt, Kt = (k) => dt(k.column) + z, vt = $t, ne = lt ? Math.round(i * Pn) : 0, Ft = j ? Math.round(i * Ie) : 0, Te = vt + ne + Ft + 1, ie = [c.y, c.x, c.group, c.series].filter((k) => k.accessor).map((k) => st(k, "category")), zt = this.svg.attr("width", Math.max(r, Math.ceil(xt - 0.01))).attr("height", Te).attr("font-size", i).attr(
      "aria-label",
      `Bar matrix of ${x} ${a}${ie.length ? ` by ${ie.join(", ")}` : ""}`
    );
    zt.append("g").selectAll("line").data(u).join("line").attr("class", "bar-matrix__rule bar-matrix__rule--column").attr("x1", (k) => dt(k.index) + 0.5).attr("x2", (k) => dt(k.index) + 0.5).attr("y1", yt).attr("y2", vt), zt.append("g").selectAll("line").data(f).join("line").attr("class", "bar-matrix__rule").classed("bar-matrix__rule--first", (k) => k.index === 0).attr("x1", 0).attr("x2", xt).attr("y1", (k) => H[k.index].y + 0.5).attr("y2", (k) => H[k.index].y + 0.5);
    const Yt = E.ticks(F), bt = zt.append("g").selectAll("g").data(u).join("g").attr("transform", (k) => `translate(${dt(k.index) + z},0)`);
    bt.selectAll("line").data(lt ? Yt : [0]).join("line").attr("class", (k) => k === 0 ? "bar-matrix__baseline" : "bar-matrix__grid").attr("x1", (k) => Math.round(E(k)) + 0.5).attr("x2", (k) => Math.round(E(k)) + 0.5).attr("y1", yt).attr("y2", vt), lt && bt.append("g").attr("class", "bar-matrix__axis").attr("transform", `translate(0.5,${vt})`).call(M.axisBottom(E).tickValues(Yt).tickFormat(J).tickSizeOuter(0)).attr("font-family", null).attr("font-size", p), j && Mt.push({
      text: j,
      x: ht + z,
      y: vt + ne + Math.round(i * 1.05)
    }), zt.append("g").selectAll("text").data(Mt).join("text").attr("class", "bar-matrix__title").attr("x", (k) => k.x).attr("y", (k) => k.y).attr("text-anchor", "start").attr("font-size", p).text((k) => k.text), Y && zt.append("g").selectAll("text").data(u).join("text").attr("class", "bar-matrix__label").attr("text-anchor", "start").attr("y", (k) => W - (V[k.index].length - 1) * O).selectAll("tspan").data(
      (k) => V[k.index].map((gt, kt) => ({ text: gt, i: kt, x: dt(k.index) + z }))
    ).join("tspan").attr("x", (k) => k.x).attr("dy", (k) => k.i ? `${ps}em` : null).text((k) => k.text);
    const Gt = [];
    for (const k of f) {
      const { y: gt, height: kt, groupY: Ct } = H[k.index];
      K && Gt.push({
        band: k,
        kind: "row",
        size: i,
        x: 0,
        y: gt + kt / 2,
        text: he(k.label, D, (g) => S(g, i, 600))
      });
      for (const g of k.groups)
        if (A ? Gt.push({
          band: g,
          kind: "heading",
          size: i,
          x: ot,
          y: Ct[g.slot] - P / 2,
          text: he(g.label, Q, (I) => S(I, i, 600))
        }) : at && Gt.push({
          band: g,
          kind: "group",
          size: i,
          x: et,
          y: Ct[g.slot] + It(g) / 2,
          text: he(g.label, Z, (I) => S(I))
        }), !!rt)
          for (const I of g.series)
            Gt.push({
              band: I,
              kind: "series",
              size: h,
              x: ot,
              y: Ct[g.slot] + I.slot * wt + t / 2,
              text: he(I.label, Q, (pt) => S(pt, h))
            });
    }
    zt.append("g").selectAll("text").data(Gt).join("text").attr("class", (k) => `bar-matrix__label bar-matrix__label--${k.kind}`).attr("x", (k) => k.x).attr("y", (k) => k.y).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", (k) => k.size).text((k) => k.text).filter((k) => k.text !== k.band.label).append("title").text((k) => k.band.label);
    const Zt = zt.append("g").selectAll("rect").data(_.flatMap((k) => k.segments)).join("rect").attr("class", "bar-matrix__segment").attr("x", (k) => Kt(k.bar) + E(k.start)).attr("y", (k) => At(k.bar)).attr("width", (k) => Math.max(E(k.end) - E(k.start), 0)).attr("height", t).attr("rx", Wn).attr("fill", (k) => this.highlight.color(b(k.colorKey), k, { color: k.colorKey }));
    s && zt.append("g").selectAll("text").data(_).join("text").attr("class", "bar-matrix__value").attr("x", (k) => Kt(k) + E(k.value) + fs).attr("y", (k) => At(k) + t / 2).attr("dy", "0.35em").attr("text-anchor", "start").attr("font-size", Math.min(p, t + 2)).text((k) => J(k.value)), this.format = J, this.valueTitle = tt, this._bindHover(Zt);
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
    for (const [d, v, _] of c)
      d.accessor && l.push([st(d, _), v.label]);
    const u = c.some(
      ([d]) => typeof d.field == "string" && d.field === e.color.field
    );
    if (e.color.accessor && !u) {
      const d = e.color.format ?? ((v) => v);
      l.push([st(e.color, "Color"), d(t.colorKey)]);
    }
    const f = e.value.format ?? M.format(",");
    return l.push([this.valueTitle, f(t.value)]), r.segments.length > 1 && l.push(["Bar total", f(r.value)]), this.options.tooltip ? this.options.tooltip(t, l) : l;
  }
  /** The color axis legend above the plot, when the axis has a title. */
  _drawLegend(t, e) {
    const o = this.prepared.axes.color, s = o.accessor ? o.title : null;
    Rt(this.legend, t, { ...o, title: s, fontSize: e, highlight: this.highlight }), this.legend.classed("bar-matrix__legend", !0);
  }
}
export {
  Zn as BarChart,
  ii as BarMatrixChart,
  ei as BoxPlotChart,
  Ue as FONT_SIZES,
  Vt as Highlight,
  Ht as MUTED_COLOR,
  oi as ParallelSetsChart,
  ti as ScatterPlot,
  Jn as StackedBarChart,
  jt as Tooltip,
  si as TreeChart,
  ni as UnitMatrixChart,
  ke as barLabel,
  Ss as bottomLabels,
  yo as boxStats,
  Kn as categoryColors,
  Ms as chartFrame,
  Yn as countBy,
  Qn as countByStacked,
  Tt as defaultColors,
  pe as describeAxis,
  Es as drawCategoryAxis,
  Ts as drawGridlines,
  Rt as drawLegend,
  $s as drawPlotEdges,
  Fs as drawSequentialLegend,
  Se as drawTopTitle,
  zs as drawValueAxis,
  he as fitText,
  Ot as hasValue,
  As as laneLayout,
  zn as layoutUnitMatrix,
  St as maxTextWidth,
  Dt as measureText,
  Ns as prepareBarChart,
  On as prepareBarMatrix,
  wo as prepareBoxPlotChart,
  hn as prepareParallelSets,
  ho as prepareScatterPlot,
  eo as prepareStackedBarChart,
  zo as prepareTreeChart,
  yn as prepareUnitMatrix,
  Xt as resolveFontSize,
  Et as titleLane,
  ge as titleOnTop,
  oe as topTitleLane,
  Hs as wrapText
};
