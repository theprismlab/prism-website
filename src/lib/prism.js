import { openBlock as a, createElementBlock as i, normalizeClass as p, renderSlot as m, normalizeStyle as W, createElementVNode as s, toDisplayString as f, resolveComponent as D, createBlock as _, resolveDynamicComponent as C, mergeProps as H, withCtx as k, Fragment as g, renderList as y, createTextVNode as A, createCommentVNode as u, createVNode as F, Transition as J, withModifiers as R } from "vue";
const gt = {
  red: {
    base: "#f44336",
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
    a100: "#ff8a80",
    a200: "#ff5252",
    a400: "#ff1744",
    a700: "#d50000",
    lighten5: "#ffebee",
    lighten4: "#ffcdd2",
    lighten3: "#ef9a9a",
    lighten2: "#e57373",
    lighten1: "#ef5350",
    darken1: "#e53935",
    darken2: "#d32f2f",
    darken3: "#c62828",
    darken4: "#b71c1c",
    accent1: "#ff8a80",
    accent2: "#ff5252",
    accent3: "#ff1744",
    accent4: "#d50000"
  },
  pink: {
    base: "#e91e63",
    50: "#fce4ec",
    100: "#f8bbd0",
    200: "#f48fb1",
    300: "#f06292",
    400: "#ec407a",
    500: "#e91e63",
    600: "#d81b60",
    700: "#c2185b",
    800: "#ad1457",
    900: "#880e4f",
    a100: "#ff80ab",
    a200: "#ff4081",
    a400: "#f50057",
    a700: "#c51162",
    lighten5: "#fce4ec",
    lighten4: "#f8bbd0",
    lighten3: "#f48fb1",
    lighten2: "#f06292",
    lighten1: "#ec407a",
    darken1: "#d81b60",
    darken2: "#c2185b",
    darken3: "#ad1457",
    darken4: "#880e4f",
    accent1: "#ff80ab",
    accent2: "#ff4081",
    accent3: "#f50057",
    accent4: "#c51162"
  },
  purple: {
    base: "#9c27b0",
    50: "#f3e5f5",
    100: "#e1bee7",
    200: "#ce93d8",
    300: "#ba68c8",
    400: "#ab47bc",
    500: "#9c27b0",
    600: "#8e24aa",
    700: "#7b1fa2",
    800: "#6a1b9a",
    900: "#4a148c",
    a100: "#ea80fc",
    a200: "#e040fb",
    a400: "#d500f9",
    a700: "#aa00ff",
    lighten5: "#f3e5f5",
    lighten4: "#e1bee7",
    lighten3: "#ce93d8",
    lighten2: "#ba68c8",
    lighten1: "#ab47bc",
    darken1: "#8e24aa",
    darken2: "#7b1fa2",
    darken3: "#6a1b9a",
    darken4: "#4a148c",
    accent1: "#ea80fc",
    accent2: "#e040fb",
    accent3: "#d500f9",
    accent4: "#aa00ff"
  },
  deepPurple: {
    base: "#673ab7",
    50: "#ede7f6",
    100: "#d1c4e9",
    200: "#b39ddb",
    300: "#9575cd",
    400: "#7e57c2",
    500: "#673ab7",
    600: "#5e35b1",
    700: "#512da8",
    800: "#4527a0",
    900: "#311b92",
    a100: "#b388ff",
    a200: "#7c4dff",
    a400: "#651fff",
    a700: "#6200ea",
    lighten5: "#ede7f6",
    lighten4: "#d1c4e9",
    lighten3: "#b39ddb",
    lighten2: "#9575cd",
    lighten1: "#7e57c2",
    darken1: "#5e35b1",
    darken2: "#512da8",
    darken3: "#4527a0",
    darken4: "#311b92",
    accent1: "#b388ff",
    accent2: "#7c4dff",
    accent3: "#651fff",
    accent4: "#6200ea"
  },
  indigo: {
    base: "#3f51b5",
    50: "#e8eaf6",
    100: "#c5cae9",
    200: "#9fa8da",
    300: "#7986cb",
    400: "#5c6bc0",
    500: "#3f51b5",
    600: "#3949ab",
    700: "#303f9f",
    800: "#283593",
    900: "#1a237e",
    a100: "#8c9eff",
    a200: "#536dfe",
    a400: "#3d5afe",
    a700: "#304ffe",
    lighten5: "#e8eaf6",
    lighten4: "#c5cae9",
    lighten3: "#9fa8da",
    lighten2: "#7986cb",
    lighten1: "#5c6bc0",
    darken1: "#3949ab",
    darken2: "#303f9f",
    darken3: "#283593",
    darken4: "#1a237e",
    accent1: "#8c9eff",
    accent2: "#536dfe",
    accent3: "#3d5afe",
    accent4: "#304ffe"
  },
  blue: {
    base: "#2196f3",
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3",
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
    a100: "#82b1ff",
    a200: "#448aff",
    a400: "#2979ff",
    a700: "#2962ff",
    lighten5: "#e3f2fd",
    lighten4: "#bbdefb",
    lighten3: "#90caf9",
    lighten2: "#64b5f6",
    lighten1: "#42a5f5",
    darken1: "#1e88e5",
    darken2: "#1976d2",
    darken3: "#1565c0",
    darken4: "#0d47a1",
    accent1: "#82b1ff",
    accent2: "#448aff",
    accent3: "#2979ff",
    accent4: "#2962ff"
  },
  lightBlue: {
    base: "#03a9f4",
    50: "#e1f5fe",
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
    a100: "#80d8ff",
    a200: "#40c4ff",
    a400: "#00b0ff",
    a700: "#0091ea",
    lighten5: "#e1f5fe",
    lighten4: "#b3e5fc",
    lighten3: "#81d4fa",
    lighten2: "#4fc3f7",
    lighten1: "#29b6f6",
    darken1: "#039be5",
    darken2: "#0288d1",
    darken3: "#0277bd",
    darken4: "#01579b",
    accent1: "#80d8ff",
    accent2: "#40c4ff",
    accent3: "#00b0ff",
    accent4: "#0091ea"
  },
  cyan: {
    base: "#00bcd4",
    50: "#e0f7fa",
    100: "#b2ebf2",
    200: "#80deea",
    300: "#4dd0e1",
    400: "#26c6da",
    500: "#00bcd4",
    600: "#00acc1",
    700: "#0097a7",
    800: "#00838f",
    900: "#006064",
    a100: "#84ffff",
    a200: "#18ffff",
    a400: "#00e5ff",
    a700: "#00b8d4",
    lighten5: "#e0f7fa",
    lighten4: "#b2ebf2",
    lighten3: "#80deea",
    lighten2: "#4dd0e1",
    lighten1: "#26c6da",
    darken1: "#00acc1",
    darken2: "#0097a7",
    darken3: "#00838f",
    darken4: "#006064",
    accent1: "#84ffff",
    accent2: "#18ffff",
    accent3: "#00e5ff",
    accent4: "#00b8d4"
  },
  teal: {
    base: "#009688",
    50: "#e0f2f1",
    100: "#b2dfdb",
    200: "#80cbc4",
    300: "#4db6ac",
    400: "#26a69a",
    500: "#009688",
    600: "#00897b",
    700: "#00796b",
    800: "#00695c",
    900: "#004d40",
    a100: "#a7ffeb",
    a200: "#64ffda",
    a400: "#1de9b6",
    a700: "#00bfa5",
    lighten5: "#e0f2f1",
    lighten4: "#b2dfdb",
    lighten3: "#80cbc4",
    lighten2: "#4db6ac",
    lighten1: "#26a69a",
    darken1: "#00897b",
    darken2: "#00796b",
    darken3: "#00695c",
    darken4: "#004d40",
    accent1: "#a7ffeb",
    accent2: "#64ffda",
    accent3: "#1de9b6",
    accent4: "#00bfa5"
  },
  green: {
    base: "#4caf50",
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
    a100: "#b9f6ca",
    a200: "#69f0ae",
    a400: "#00e676",
    a700: "#00c853",
    lighten5: "#e8f5e9",
    lighten4: "#c8e6c9",
    lighten3: "#a5d6a7",
    lighten2: "#81c784",
    lighten1: "#66bb6a",
    darken1: "#43a047",
    darken2: "#388e3c",
    darken3: "#2e7d32",
    darken4: "#1b5e20",
    accent1: "#b9f6ca",
    accent2: "#69f0ae",
    accent3: "#00e676",
    accent4: "#00c853"
  },
  lightGreen: {
    base: "#8bc34a",
    50: "#f1f8e9",
    100: "#dcedc8",
    200: "#c5e1a5",
    300: "#aed581",
    400: "#9ccc65",
    500: "#8bc34a",
    600: "#7cb342",
    700: "#689f38",
    800: "#558b2f",
    900: "#33691e",
    a100: "#ccff90",
    a200: "#b2ff59",
    a400: "#76ff03",
    a700: "#64dd17",
    lighten5: "#f1f8e9",
    lighten4: "#dcedc8",
    lighten3: "#c5e1a5",
    lighten2: "#aed581",
    lighten1: "#9ccc65",
    darken1: "#7cb342",
    darken2: "#689f38",
    darken3: "#558b2f",
    darken4: "#33691e",
    accent1: "#ccff90",
    accent2: "#b2ff59",
    accent3: "#76ff03",
    accent4: "#64dd17"
  },
  lime: {
    base: "#cddc39",
    50: "#f9fbe7",
    100: "#f0f4c3",
    200: "#e6ee9c",
    300: "#dce775",
    400: "#d4e157",
    500: "#cddc39",
    600: "#c0ca33",
    700: "#afb42b",
    800: "#9e9d24",
    900: "#827717",
    a100: "#f4ff81",
    a200: "#eeff41",
    a400: "#c6ff00",
    a700: "#aeea00",
    lighten5: "#f9fbe7",
    lighten4: "#f0f4c3",
    lighten3: "#e6ee9c",
    lighten2: "#dce775",
    lighten1: "#d4e157",
    darken1: "#c0ca33",
    darken2: "#afb42b",
    darken3: "#9e9d24",
    darken4: "#827717",
    accent1: "#f4ff81",
    accent2: "#eeff41",
    accent3: "#c6ff00",
    accent4: "#aeea00"
  },
  yellow: {
    base: "#ffeb3b",
    50: "#fffde7",
    100: "#fff9c4",
    200: "#fff59d",
    300: "#fff176",
    400: "#ffee58",
    500: "#ffeb3b",
    600: "#fdd835",
    700: "#fbc02d",
    800: "#f9a825",
    900: "#f57f17",
    a100: "#ffff8d",
    a200: "#ffff00",
    a400: "#ffea00",
    a700: "#ffd600",
    lighten5: "#fffde7",
    lighten4: "#fff9c4",
    lighten3: "#fff59d",
    lighten2: "#fff176",
    lighten1: "#ffee58",
    darken1: "#fdd835",
    darken2: "#fbc02d",
    darken3: "#f9a825",
    darken4: "#f57f17",
    accent1: "#ffff8d",
    accent2: "#ffff00",
    accent3: "#ffea00",
    accent4: "#ffd600"
  },
  amber: {
    base: "#ffc107",
    50: "#fff8e1",
    100: "#ffecb3",
    200: "#ffe082",
    300: "#ffd54f",
    400: "#ffca28",
    500: "#ffc107",
    600: "#ffb300",
    700: "#ffa000",
    800: "#ff8f00",
    900: "#ff6f00",
    a100: "#ffe57f",
    a200: "#ffd740",
    a400: "#ffc400",
    a700: "#ffab00",
    lighten5: "#fff8e1",
    lighten4: "#ffecb3",
    lighten3: "#ffe082",
    lighten2: "#ffd54f",
    lighten1: "#ffca28",
    darken1: "#ffb300",
    darken2: "#ffa000",
    darken3: "#ff8f00",
    darken4: "#ff6f00",
    accent1: "#ffe57f",
    accent2: "#ffd740",
    accent3: "#ffc400",
    accent4: "#ffab00"
  },
  orange: {
    base: "#ff9800",
    50: "#fff3e0",
    100: "#ffe0b2",
    200: "#ffcc80",
    300: "#ffb74d",
    400: "#ffa726",
    500: "#ff9800",
    600: "#fb8c00",
    700: "#f57c00",
    800: "#ef6c00",
    900: "#e65100",
    a100: "#ffd180",
    a200: "#ffab40",
    a400: "#ff9100",
    a700: "#ff6d00",
    lighten5: "#fff3e0",
    lighten4: "#ffe0b2",
    lighten3: "#ffcc80",
    lighten2: "#ffb74d",
    lighten1: "#ffa726",
    darken1: "#fb8c00",
    darken2: "#f57c00",
    darken3: "#ef6c00",
    darken4: "#e65100",
    accent1: "#ffd180",
    accent2: "#ffab40",
    accent3: "#ff9100",
    accent4: "#ff6d00"
  },
  deepOrange: {
    base: "#ff5722",
    50: "#fbe9e7",
    100: "#ffccbc",
    200: "#ffab91",
    300: "#ff8a65",
    400: "#ff7043",
    500: "#ff5722",
    600: "#f4511e",
    700: "#e64a19",
    800: "#d84315",
    900: "#bf360c",
    a100: "#ff9e80",
    a200: "#ff6e40",
    a400: "#ff3d00",
    a700: "#dd2c00",
    lighten5: "#fbe9e7",
    lighten4: "#ffccbc",
    lighten3: "#ffab91",
    lighten2: "#ff8a65",
    lighten1: "#ff7043",
    darken1: "#f4511e",
    darken2: "#e64a19",
    darken3: "#d84315",
    darken4: "#bf360c",
    accent1: "#ff9e80",
    accent2: "#ff6e40",
    accent3: "#ff3d00",
    accent4: "#dd2c00"
  },
  brown: {
    base: "#795548",
    50: "#efebe9",
    100: "#d7ccc8",
    200: "#bcaaa4",
    300: "#a1887f",
    400: "#8d6e63",
    500: "#795548",
    600: "#6d4c41",
    700: "#5d4037",
    800: "#4e342e",
    900: "#3e2723",
    lighten5: "#efebe9",
    lighten4: "#d7ccc8",
    lighten3: "#bcaaa4",
    lighten2: "#a1887f",
    lighten1: "#8d6e63",
    darken1: "#6d4c41",
    darken2: "#5d4037",
    darken3: "#4e342e",
    darken4: "#3e2723"
  },
  grey: {
    base: "#9e9e9e",
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    lighten5: "#fafafa",
    lighten4: "#f5f5f5",
    lighten3: "#eeeeee",
    lighten2: "#e0e0e0",
    lighten1: "#bdbdbd",
    darken1: "#757575",
    darken2: "#616161",
    darken3: "#424242",
    darken4: "#212121"
  },
  blueGrey: {
    base: "#607d8b",
    50: "#eceff1",
    100: "#cfd8dc",
    200: "#b0bec5",
    300: "#90a4ae",
    400: "#78909c",
    500: "#607d8b",
    600: "#546e7a",
    700: "#455a64",
    800: "#37474f",
    900: "#263238",
    lighten5: "#eceff1",
    lighten4: "#cfd8dc",
    lighten3: "#b0bec5",
    lighten2: "#90a4ae",
    lighten1: "#78909c",
    darken1: "#546e7a",
    darken2: "#455a64",
    darken3: "#37474f",
    darken4: "#263238"
  },
  shades: {
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent"
  }
};
const v = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, d] of t)
    n[o] = d;
  return n;
}, Q = {
  name: "PrismButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (e) => [
        "primary",
        "secondary",
        "ghost",
        "danger",
        "gradient-primary",
        "gradient-sunset",
        "gradient-ocean",
        "gradient-forest",
        "gradient-aurora",
        "gradient-fire"
      ].includes(e)
    },
    size: {
      type: String,
      default: "md",
      validator: (e) => ["sm", "md", "lg"].includes(e)
    },
    type: {
      type: String,
      default: "button"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    }
  }
}, U = ["type", "disabled"];
function z(e, t, n, o, d, l) {
  return a(), i("button", {
    type: n.type,
    class: p(["prism-button", `prism-button--${n.variant}`, `prism-button--${n.size}`, { "is-disabled": n.disabled }]),
    disabled: n.disabled,
    onClick: t[0] || (t[0] = (...b) => l.onClick && l.onClick(...b))
  }, [
    m(e.$slots, "default", {}, void 0, !0)
  ], 10, U);
}
const w = /* @__PURE__ */ v(Q, [["render", z], ["__scopeId", "data-v-bf515133"]]);
w.install = function(t) {
  t.component(w.name, w);
};
const j = {
  name: "PrismHeroBanner",
  props: {
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    body: {
      type: String,
      default: ""
    },
    variant: {
      type: String,
      default: "primary"
    }
  }
}, E = { class: "hero__content" }, V = { class: "hero__title" }, q = { class: "hero__description" };
function Y(e, t, n, o, d, l) {
  return a(), i("section", {
    class: p(["hero__container", `hero__container--${n.variant} ${n.image ? "hero__container--image" : ""}`]),
    style: W(n.image ? {
      backgroundImage: `url(${n.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
    } : {})
  }, [
    s("div", E, [
      s("h2", V, f(n.title), 1),
      s("div", q, [
        s("p", null, f(n.body), 1),
        m(e.$slots, "default", {}, void 0, !0)
      ])
    ])
  ], 6);
}
const S = /* @__PURE__ */ v(j, [["render", Y], ["__scopeId", "data-v-e0d066b3"]]);
S.install = function(t) {
  t.component(S.name, S);
};
const Z = "data:image/png;base64,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";
function X() {
  try {
    const e = JSON.parse(localStorage.getItem("user_info"));
    return !!e && !e.isAnonymous;
  } catch {
    return !1;
  }
}
const G = { marketing: "", portal: "/portal" }, $ = [
  { title: "About us", children: [
    { title: "About PRISM", route: "/about-us/about-prism", id: "about-prism", site: "marketing" },
    { title: "Team", route: "/about-us/team", id: "team", site: "marketing" }
  ] },
  { title: "Resources", children: [
    { title: "Publications", route: "/publications", id: "publications", site: "marketing" },
    { title: "FAQ", route: "/faq", id: "faq", site: "marketing" },
    { title: "Webinars", route: "/webinars", id: "webinars", site: "marketing" }
  ] },
  { title: "Consortium Screens", children: [
    { title: "Cell line collection", route: "/consortium-screens/cell-line-collection", id: "cell-line-collection", site: "marketing" },
    { title: "Assays", route: "/consortium-screens/assays", id: "assays", site: "marketing" },
    { title: "Data Analysis", route: "/consortium-screens/data-analysis", id: "data-analysis", site: "marketing" },
    { title: "Deliverables", route: "/consortium-screens/deliverables", id: "deliverables", site: "marketing" },
    { title: "Collaborating", route: "/consortium-screens/collaborating", id: "collaborating", site: "marketing" },
    { title: "Submission Hub", route: "/submission-hub", id: "submission-hub", matchPrefix: !0, site: "marketing" }
  ] },
  { title: "Contact us", route: "/contact-us", id: "contact-us", site: "marketing" },
  { title: "Portal", route: "/portal", id: "portal", matchPrefix: !0, site: "portal", excludeRoutes: ["/portal/log-in"] }
], ee = { route: "/", site: "marketing" }, te = { route: "/portal/log-in", site: "portal" };
function T(e, t, n) {
  if (e.children)
    return {
      ...e,
      children: e.children.map((o) => T(o, t, n))
    };
  if (!e.route)
    return e;
  if (!e.site || e.site === t) {
    const o = G[t] || "", d = o && e.route.startsWith(o), l = d ? e.route.slice(o.length) || "/" : e.route;
    return {
      ...e,
      route: l,
      external: !1,
      // When matchPrefix and the base was stripped, preserve the original route so
      // active-state checking uses the real browser path prefix (e.g. '/portal'),
      // not '/' which would match every URL.
      ...e.matchPrefix && d && { activePrefix: e.route }
    };
  }
  return { ...e, route: `${n}${e.route}`, external: !0 };
}
const ae = {
  name: "PrismAppBar",
  props: {
    site: {
      type: String,
      default: "marketing",
      validator: (e) => ["marketing", "portal"].includes(e)
    },
    baseUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      prismLogo: Z,
      drawerOpen: !1,
      openGroups: [],
      isLoggedIn: X()
    };
  },
  mounted() {
    window.addEventListener("storage", this._onAuthChange);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this._onAuthChange);
  },
  computed: {
    resolvedLogo() {
      return T(ee, this.site, this.baseUrl);
    },
    resolvedItems() {
      return $.map((e) => T(e, this.site, this.baseUrl));
    },
    resolvedLoginItem() {
      return T(te, this.site, this.baseUrl);
    }
  },
  methods: {
    _onAuthChange(e) {
      (e.key === "user_info" || e.key === null) && (this.isLoggedIn = X());
    },
    _currentPath() {
      var e;
      return ((e = this.$route) == null ? void 0 : e.path) ?? window.location.pathname;
    },
    _matchPath(e) {
      if (!e)
        return !1;
      try {
        return new URL(e, window.location.href).pathname === this._currentPath();
      } catch {
        return e === this._currentPath();
      }
    },
    isParentActive(e) {
      return !e.children || !e.children.length ? !1 : e.children.some((t) => this.isItemActive(t));
    },
    isItemActive(e) {
      if (e.children && e.children.length)
        return this.isParentActive(e);
      if (e.matchPrefix) {
        const t = e.activePrefix || e.route;
        try {
          const n = new URL(t, window.location.href).pathname, o = window.location.pathname.startsWith(n);
          return o && e.excludeRoutes ? !e.excludeRoutes.includes(window.location.pathname) : o;
        } catch {
          return window.location.pathname.startsWith(t);
        }
      }
      return this._matchPath(e.route);
    },
    navigateTo(e, t) {
      t !== void 0 && (this.openGroups = [t]), this.drawerOpen = !1, this.$router.push(e).catch(() => {
      });
    },
    selectChild(e) {
      this.openGroups = [e], this.drawerOpen = !1;
    },
    toggleGroup(e) {
      this.openGroups.includes(e) ? this.openGroups = this.openGroups.filter((t) => t !== e) : this.openGroups.push(e);
    }
  }
}, ne = { class: "prism-app-bar-root" }, re = { class: "prism-app-bar" }, ie = { class: "prism-app-bar__inner" }, se = ["src"], le = ["aria-expanded"], de = {
  class: "prism-app-bar__desktop-nav",
  "aria-label": "Main navigation"
}, fe = ["href"], ce = {
  key: 3,
  class: "prism-app-bar__dropdown"
}, oe = ["href"], pe = { class: "prism-app-bar__cta" }, ue = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  width: "16",
  height: "16",
  "aria-hidden": "true"
}, be = {
  key: 0,
  class: "prism-nav-drawer",
  "aria-label": "Mobile navigation"
}, he = ["href"], ge = ["href", "onClick"], ve = ["onClick"], me = {
  key: 0,
  class: "prism-nav-drawer__children"
}, Ae = ["href", "onClick"], ke = ["href", "onClick"], _e = { class: "prism-nav-drawer__actions" }, ye = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  width: "16",
  height: "16",
  "aria-hidden": "true"
};
function we(e, t, n, o, d, l) {
  const b = D("router-link");
  return a(), i("div", ne, [
    s("header", re, [
      s("div", ie, [
        (a(), _(C(l.resolvedLogo.external ? "a" : "router-link"), H(l.resolvedLogo.external ? { href: l.resolvedLogo.route } : { to: l.resolvedLogo.route }, { class: "prism-app-bar__logo-link" }), {
          default: k(() => [
            s("img", {
              src: d.prismLogo,
              alt: "PRISM",
              class: "prism-app-bar__logo-img"
            }, null, 8, se)
          ]),
          _: 1
        }, 16)),
        s("button", {
          class: "prism-app-bar__hamburger",
          "aria-expanded": String(d.drawerOpen),
          "aria-label": "Toggle navigation",
          onClick: t[0] || (t[0] = (r) => d.drawerOpen = !d.drawerOpen)
        }, [...t[4] || (t[4] = [
          s("span", null, null, -1),
          s("span", null, null, -1),
          s("span", null, null, -1)
        ])], 8, le),
        s("nav", de, [
          (a(!0), i(g, null, y(l.resolvedItems, (r, h) => (a(), i("div", {
            key: h,
            class: p(["prism-app-bar__nav-item", { "prism-app-bar__nav-item--has-children": r.children && r.children.length }])
          }, [
            r.children && r.children.length ? (a(), i("button", {
              key: 0,
              type: "button",
              class: p(["prism-app-bar__nav-link", { "is-active": l.isParentActive(r) }])
            }, [
              A(f(r.title) + " ", 1),
              t[5] || (t[5] = s("svg", {
                class: "prism-app-bar__chevron",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                width: "16",
                height: "16",
                "aria-hidden": "true"
              }, [
                s("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                  "clip-rule": "evenodd"
                })
              ], -1))
            ], 2)) : r.external ? (a(), i("a", {
              key: 1,
              href: r.route,
              class: p(["prism-app-bar__nav-link", { "is-active": l.isItemActive(r) }])
            }, f(r.title), 11, fe)) : (a(), _(b, {
              key: 2,
              to: r.route,
              class: p(["prism-app-bar__nav-link", { "is-active": l.isItemActive(r) }])
            }, {
              default: k(() => [
                A(f(r.title), 1)
              ]),
              _: 2
            }, 1032, ["to", "class"])),
            r.children && r.children.length ? (a(), i("div", ce, [
              (a(!0), i(g, null, y(r.children, (c) => (a(), i(g, null, [
                c.external ? (a(), i("a", {
                  key: `ext-${c.id}`,
                  href: c.route,
                  class: p(["prism-app-bar__dropdown-link", { "is-active": l.isItemActive(c) }])
                }, f(c.title), 11, oe)) : (a(), _(b, {
                  key: c.id,
                  to: c.route,
                  class: p(["prism-app-bar__dropdown-link", { "is-active": l.isItemActive(c) }])
                }, {
                  default: k(() => [
                    A(f(c.title), 1)
                  ]),
                  _: 2
                }, 1032, ["to", "class"]))
              ], 64))), 256))
            ])) : u("", !0)
          ], 2))), 128)),
          s("div", pe, [
            (a(), _(C(l.resolvedLoginItem.external ? "a" : "router-link"), H(l.resolvedLoginItem.external ? { href: l.resolvedLoginItem.route } : { to: l.resolvedLoginItem.route }, { class: "prism-app-bar__login-btn" }), {
              default: k(() => [
                d.isLoggedIn ? (a(), i("svg", ue, [...t[6] || (t[6] = [
                  s("path", { d: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" }, null, -1)
                ])])) : u("", !0),
                A(" " + f(d.isLoggedIn ? "" : "Log In"), 1)
              ]),
              _: 1
            }, 16))
          ])
        ])
      ])
    ]),
    d.drawerOpen ? (a(), i("div", {
      key: 0,
      class: "prism-nav-drawer__backdrop",
      "aria-hidden": "true",
      onClick: t[1] || (t[1] = (r) => d.drawerOpen = !1)
    })) : u("", !0),
    F(J, { name: "prism-drawer-slide" }, {
      default: k(() => [
        d.drawerOpen ? (a(), i("nav", be, [
          (a(!0), i(g, null, y(l.resolvedItems, (r, h) => (a(), i("div", {
            key: h,
            class: "prism-nav-drawer__item"
          }, [
            !r.children || r.children.length === 0 ? (a(), i(g, { key: 0 }, [
              r.external ? (a(), i("a", {
                key: `ext-${r.id}`,
                href: r.route,
                class: p(["prism-nav-drawer__link", { "is-active": e.$route && e.$route.path === r.route }]),
                onClick: t[2] || (t[2] = (c) => d.drawerOpen = !1)
              }, f(r.title), 11, he)) : (a(), i("a", {
                key: r.id,
                href: r.route,
                class: p(["prism-nav-drawer__link", { "is-active": e.$route && e.$route.path === r.route }]),
                onClick: R((c) => l.navigateTo(r.route), ["prevent"])
              }, f(r.title), 11, ge))
            ], 64)) : (a(), i(g, { key: 1 }, [
              s("button", {
                class: p([
                  "prism-nav-drawer__group-btn",
                  { "is-active": l.isParentActive(r), "is-open": d.openGroups.includes(h) }
                ]),
                onClick: (c) => l.toggleGroup(h)
              }, [
                A(f(r.title) + " ", 1),
                t[7] || (t[7] = s("svg", {
                  class: "prism-nav-drawer__chevron",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  width: "16",
                  height: "16",
                  "aria-hidden": "true"
                }, [
                  s("path", {
                    "fill-rule": "evenodd",
                    d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                    "clip-rule": "evenodd"
                  })
                ], -1))
              ], 10, ve),
              d.openGroups.includes(h) ? (a(), i("div", me, [
                (a(!0), i(g, null, y(r.children, (c) => (a(), i(g, null, [
                  c.external ? (a(), i("a", {
                    key: `ext-${c.id}`,
                    href: c.route,
                    class: p(["prism-nav-drawer__child-link", { "is-active": l.isItemActive(c) }]),
                    onClick: (M) => l.selectChild(h)
                  }, f(c.title), 11, Ae)) : (a(), i("a", {
                    key: c.id,
                    href: c.route,
                    class: p(["prism-nav-drawer__child-link", { "is-active": l.isItemActive(c) }]),
                    onClick: R((M) => l.navigateTo(c.route, h), ["prevent"])
                  }, f(c.title), 11, ke))
                ], 64))), 256))
              ])) : u("", !0)
            ], 64))
          ]))), 128)),
          s("div", _e, [
            (a(), _(C(l.resolvedLoginItem.external ? "a" : "router-link"), H(l.resolvedLoginItem.external ? { href: l.resolvedLoginItem.route } : { to: l.resolvedLoginItem.route }, {
              class: "prism-app-bar__login-btn",
              onClick: t[3] || (t[3] = (r) => d.drawerOpen = !1)
            }), {
              default: k(() => [
                d.isLoggedIn ? (a(), i("svg", ye, [...t[8] || (t[8] = [
                  s("path", { d: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" }, null, -1)
                ])])) : u("", !0),
                A(" " + f(d.isLoggedIn ? "Account" : "Log In"), 1)
              ]),
              _: 1
            }, 16))
          ])
        ])) : u("", !0)
      ]),
      _: 1
    })
  ]);
}
const I = /* @__PURE__ */ v(ae, [["render", we], ["__scopeId", "data-v-21b38d56"]]);
I.install = function(t) {
  t.component(I.name, I);
};
const Se = {
  name: "PrismAlertBanner",
  props: {
    variant: {
      type: String,
      default: "info",
      validator: (e) => ["info", "success", "warning", "error", "neutral"].includes(e)
    },
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    },
    dismissible: {
      type: Boolean,
      default: !1
    },
    bordered: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return { visible: !0 };
  },
  methods: {
    dismiss() {
      this.visible = !1, this.$emit("dismiss");
    }
  }
}, Te = {
  class: "prism-alert__icon",
  "aria-hidden": "true"
}, Ie = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  width: "20",
  height: "20"
}, Pe = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  width: "20",
  height: "20"
}, Oe = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  width: "20",
  height: "20"
}, Be = {
  key: 3,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  width: "20",
  height: "20"
}, xe = { class: "prism-alert__body" }, Ne = {
  key: 0,
  class: "prism-alert__title"
}, Ke = { class: "prism-alert__message" };
function Le(e, t, n, o, d, l) {
  return d.visible ? (a(), i("div", {
    key: 0,
    class: p(["prism-alert", `prism-alert--${n.variant}`, { "prism-alert--bordered": n.bordered }]),
    role: "alert"
  }, [
    s("span", Te, [
      n.variant === "success" ? (a(), i("svg", Ie, [...t[1] || (t[1] = [
        s("path", {
          "fill-rule": "evenodd",
          d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
          "clip-rule": "evenodd"
        }, null, -1)
      ])])) : n.variant === "warning" ? (a(), i("svg", Pe, [...t[2] || (t[2] = [
        s("path", {
          "fill-rule": "evenodd",
          d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
          "clip-rule": "evenodd"
        }, null, -1)
      ])])) : n.variant === "error" ? (a(), i("svg", Oe, [...t[3] || (t[3] = [
        s("path", {
          "fill-rule": "evenodd",
          d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
          "clip-rule": "evenodd"
        }, null, -1)
      ])])) : (a(), i("svg", Be, [...t[4] || (t[4] = [
        s("path", {
          "fill-rule": "evenodd",
          d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
          "clip-rule": "evenodd"
        }, null, -1)
      ])]))
    ]),
    s("div", xe, [
      n.title ? (a(), i("p", Ne, f(n.title), 1)) : u("", !0),
      s("div", Ke, [
        m(e.$slots, "default", {}, () => [
          A(f(n.message), 1)
        ], !0)
      ])
    ]),
    n.dismissible ? (a(), i("button", {
      key: 0,
      class: "prism-alert__close",
      "aria-label": "Dismiss",
      onClick: t[0] || (t[0] = (...b) => l.dismiss && l.dismiss(...b))
    }, [...t[5] || (t[5] = [
      s("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        width: "16",
        height: "16",
        "aria-hidden": "true"
      }, [
        s("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
      ], -1)
    ])])) : u("", !0)
  ], 2)) : u("", !0);
}
const P = /* @__PURE__ */ v(Se, [["render", Le], ["__scopeId", "data-v-89ca1dc5"]]);
P.install = function(t) {
  t.component(P.name, P);
};
const Ce = {
  name: "PrismSplitSection",
  props: {
    image: {
      type: String,
      default: ""
    },
    imageAlt: {
      type: String,
      default: ""
    },
    eyebrow: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    body: {
      type: String,
      default: ""
    },
    reverse: {
      type: Boolean,
      default: !1
    }
  }
}, He = { class: "prism-split__image-col" }, Re = ["src", "alt"], Xe = { class: "prism-split__content-col" }, We = {
  key: 0,
  class: "prism-split__eyebrow"
}, De = {
  key: 1,
  class: "prism-split__title"
}, Me = {
  key: 2,
  class: "prism-split__body"
}, Fe = {
  key: 3,
  class: "prism-split__actions"
};
function Je(e, t, n, o, d, l) {
  return a(), i("section", {
    class: p(["prism-split", { "prism-split--reverse": n.reverse }])
  }, [
    s("div", He, [
      n.image ? (a(), i("img", {
        key: 0,
        src: n.image,
        alt: n.imageAlt,
        class: "prism-split__image"
      }, null, 8, Re)) : u("", !0),
      m(e.$slots, "image", {}, void 0, !0)
    ]),
    s("div", Xe, [
      n.eyebrow ? (a(), i("p", We, f(n.eyebrow), 1)) : u("", !0),
      n.title ? (a(), i("h2", De, f(n.title), 1)) : u("", !0),
      n.body || e.$slots.default ? (a(), i("div", Me, [
        m(e.$slots, "default", {}, () => [
          A(f(n.body), 1)
        ], !0)
      ])) : u("", !0),
      e.$slots.actions ? (a(), i("div", Fe, [
        m(e.$slots, "actions", {}, void 0, !0)
      ])) : u("", !0)
    ])
  ], 2);
}
const O = /* @__PURE__ */ v(Ce, [["render", Je], ["__scopeId", "data-v-844b1b37"]]);
O.install = function(t) {
  t.component(O.name, O);
};
const Qe = {
  name: "PrismTimeline",
  props: {
    steps: {
      type: Array,
      required: !0
    },
    activeStep: {
      type: Number,
      default: -1
    },
    variant: {
      type: String,
      default: "vertical",
      validator: (e) => ["vertical", "horizontal"].includes(e)
    }
  }
}, Ue = { class: "prism-timeline__marker" }, ze = {
  key: 0,
  class: "prism-timeline__check",
  "aria-hidden": "true"
}, je = {
  key: 1,
  class: "prism-timeline__number"
}, Ee = { class: "prism-timeline__content" }, Ve = { class: "prism-timeline__title" }, qe = {
  key: 0,
  class: "prism-timeline__caption"
};
function Ye(e, t, n, o, d, l) {
  return a(), i("ol", {
    class: p(["prism-timeline", `prism-timeline--${n.variant}`])
  }, [
    (a(!0), i(g, null, y(n.steps, (b, r) => (a(), i("li", {
      key: r,
      class: p(["prism-timeline__step", { "prism-timeline__step--active": r === n.activeStep, "prism-timeline__step--completed": r < n.activeStep }])
    }, [
      t[1] || (t[1] = s("div", {
        class: "prism-timeline__connector",
        "aria-hidden": "true"
      }, null, -1)),
      s("div", Ue, [
        r < n.activeStep ? (a(), i("span", ze, [...t[0] || (t[0] = [
          s("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            width: "14",
            height: "14"
          }, [
            s("path", {
              "fill-rule": "evenodd",
              d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
              "clip-rule": "evenodd"
            })
          ], -1)
        ])])) : (a(), i("span", je, f(r + 1), 1))
      ]),
      s("div", Ee, [
        s("p", Ve, f(b.title), 1),
        b.caption ? (a(), i("p", qe, f(b.caption), 1)) : u("", !0)
      ])
    ], 2))), 128))
  ], 2);
}
const B = /* @__PURE__ */ v(Qe, [["render", Ye], ["__scopeId", "data-v-fb40f417"]]);
B.install = function(t) {
  t.component(B.name, B);
};
const Ze = {
  name: "PrismAppNavDrawer",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    top: {
      type: String,
      default: "64px"
    }
  },
  data() {
    return {
      isExpanded: !1
    };
  },
  methods: {
    isActive(e) {
      var n;
      return (((n = this.$route) == null ? void 0 : n.path) ?? "") === e.route;
    }
  }
}, Ge = { class: "prism-app-nav-drawer__list" }, $e = ["href", "title"], et = ["innerHTML"], tt = { class: "prism-app-nav-drawer__label" }, at = ["innerHTML"], nt = { class: "prism-app-nav-drawer__label" };
function rt(e, t, n, o, d, l) {
  const b = D("router-link");
  return a(), i("nav", {
    class: p(["prism-app-nav-drawer", { "is-expanded": d.isExpanded }]),
    style: W({ top: n.top }),
    onMouseenter: t[0] || (t[0] = (r) => d.isExpanded = !0),
    onMouseleave: t[1] || (t[1] = (r) => d.isExpanded = !1),
    "aria-label": "Side navigation"
  }, [
    s("ul", Ge, [
      (a(!0), i(g, null, y(n.items, (r, h) => (a(), i("li", {
        key: h,
        class: "prism-app-nav-drawer__item"
      }, [
        r.external ? (a(), i("a", {
          key: 0,
          href: r.route,
          title: r.title,
          class: p(["prism-app-nav-drawer__link", { "is-active": l.isActive(r) }])
        }, [
          s("span", {
            class: "prism-app-nav-drawer__icon",
            innerHTML: r.icon,
            "aria-hidden": "true"
          }, null, 8, et),
          s("span", tt, f(r.title), 1)
        ], 10, $e)) : (a(), _(b, {
          key: 1,
          to: r.route,
          title: r.title,
          class: p(["prism-app-nav-drawer__link", { "is-active": e.$route && e.$route.path === r.route }])
        }, {
          default: k(() => [
            s("span", {
              class: "prism-app-nav-drawer__icon",
              innerHTML: r.icon,
              "aria-hidden": "true"
            }, null, 8, at),
            s("span", nt, f(r.title), 1)
          ]),
          _: 2
        }, 1032, ["to", "title", "class"]))
      ]))), 128))
    ])
  ], 38);
}
const x = /* @__PURE__ */ v(Ze, [["render", rt], ["__scopeId", "data-v-0dfe6ab6"]]);
x.install = function(t) {
  t.component(x.name, x);
};
const it = {
  name: "PrismPageTitle"
}, st = {
  class: "prism-text-h1",
  style: { "margin-bottom": "2rem" }
};
function lt(e, t, n, o, d, l) {
  return a(), i("h1", st, [
    m(e.$slots, "default")
  ]);
}
const N = /* @__PURE__ */ v(it, [["render", lt]]);
N.install = function(t) {
  t.component(N.name, N);
};
const dt = {
  name: "PrismSectionTitle"
}, ft = { class: "prism-text-h2" };
function ct(e, t, n, o, d, l) {
  return a(), i("h2", ft, [
    m(e.$slots, "default")
  ]);
}
const K = /* @__PURE__ */ v(dt, [["render", ct]]);
K.install = function(t) {
  t.component(K.name, K);
};
const ot = {
  name: "PrismSubSectionTitle"
}, pt = { class: "prism-text-h3" };
function ut(e, t, n, o, d, l) {
  return a(), i("h3", pt, [
    m(e.$slots, "default")
  ]);
}
const L = /* @__PURE__ */ v(ot, [["render", ut]]);
L.install = function(t) {
  t.component(L.name, L);
};
const bt = [w, S, I, P, O, B, x, N, K, L], vt = {
  install(e) {
    bt.forEach((t) => e.component(t.name, t));
  }
};
export {
  P as PrismAlertBanner,
  I as PrismAppBar,
  x as PrismAppNavDrawer,
  w as PrismButton,
  S as PrismHeroBanner,
  N as PrismPageTitle,
  K as PrismSectionTitle,
  O as PrismSplitSection,
  L as PrismSubSectionTitle,
  B as PrismTimeline,
  gt as colors,
  vt as default
};
