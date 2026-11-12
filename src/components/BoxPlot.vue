<template>
  <div class="box-plot" @mouseleave="hover = null">
    <div class="box-plot__toolbar">
      <v-autocomplete
        v-model="selected"
        :items="ids"
        :label="`Search ${idTitle.toLowerCase()}s`"
        variant="underlined"
        multiple
        chips
        closable-chips
        clearable
        hide-details
      />
      <v-checkbox
        v-if="initialSelected.length"
        :model-value="defaultsOn"
        :label="initialSelectedLabel"
        density="compact"
        hide-details
        @update:model-value="toggleDefaults"
      />
    </div>

    <svg ref="svg" :viewBox="`0 0 ${width} ${height}`" class="box-plot__svg">
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <rect :width="plotWidth" :height="plotHeight" class="panel" @mousemove="onMove($event)" />
        <line
          v-for="v in yTicks"
          :key="`gy-${v}`"
          x1="0"
          :x2="plotWidth"
          :y1="yScale(v)"
          :y2="yScale(v)"
          class="gridline"
        />

        <!-- One box per category: the points first, then whiskers, box and
             median drawn over them so the box outline stays readable -->
        <g :class="{ 'is-dimmed': selected.length }">
          <g v-for="box in boxes" :key="box.name" :transform="`translate(${box.x}, 0)`">
            <circle
              v-for="p in box.points"
              :key="p.id"
              :cx="p.px"
              :cy="p.py"
              :r="pointRadius"
              class="point"
            />
            <line
              :x1="band / 2"
              :x2="band / 2"
              :y1="yScale(box.stats.low)"
              :y2="yScale(box.stats.high)"
              class="whisker"
            />
            <line
              :x1="band / 2 - boxWidth / 4"
              :x2="band / 2 + boxWidth / 4"
              :y1="yScale(box.stats.low)"
              :y2="yScale(box.stats.low)"
              class="whisker"
            />
            <line
              :x1="band / 2 - boxWidth / 4"
              :x2="band / 2 + boxWidth / 4"
              :y1="yScale(box.stats.high)"
              :y2="yScale(box.stats.high)"
              class="whisker"
            />
            <rect
              :x="(band - boxWidth) / 2"
              :y="yScale(box.stats.q3)"
              :width="boxWidth"
              :height="yScale(box.stats.q1) - yScale(box.stats.q3)"
              class="box"
            />
            <line
              :x1="(band - boxWidth) / 2"
              :x2="(band + boxWidth) / 2"
              :y1="yScale(box.stats.median)"
              :y2="yScale(box.stats.median)"
              class="median"
            />
          </g>
        </g>

        <!-- Category labels and y ticks -->
        <text
          v-for="box in boxes"
          :key="`xt-${box.name}`"
          :x="box.x + band / 2"
          :y="plotHeight + 14"
          class="tick"
          text-anchor="middle"
        >
          {{ box.name }}
        </text>
        <text
          v-for="v in yTicks"
          :key="`yt-${v}`"
          x="-6"
          :y="yScale(v)"
          class="tick"
          text-anchor="end"
          dominant-baseline="middle"
        >
          {{ v }}
        </text>

        <!-- Axis titles -->
        <text :x="plotWidth / 2" :y="plotHeight + 36" class="label" text-anchor="middle">
          {{ x.title }}
        </text>
        <text
          :transform="`translate(${-margin.left + 14}, ${plotHeight / 2}) rotate(-90)`"
          class="label"
          text-anchor="middle"
        >
          {{ y.title }}
        </text>

        <!-- Selected ids drawn in color over the dimmed points; the hovered id
             gets an empty ring -->
        <circle
          v-for="ring in rings"
          :key="ring.key"
          :cx="ring.cx"
          :cy="ring.cy"
          :r="pointRadius + (ring.fill ? 2.2 : 1.7)"
          :fill="ring.fill || 'none'"
          class="ring"
        />
        <!-- Labels for selected ids, placed so they never overlap; a label that
             was moved away from its point gets a connector line -->
        <template v-for="l in labels" :key="`c-${l.key}`">
          <line
            v-if="l.connector"
            :x1="l.connector.x1"
            :y1="l.connector.y1"
            :x2="l.connector.x2"
            :y2="l.connector.y2"
            class="point-label-line"
          />
        </template>
        <text
          v-for="l in labels"
          :key="l.key"
          :x="l.x"
          :y="l.y"
          :text-anchor="l.anchor"
          dominant-baseline="middle"
          class="point-label"
        >
          {{ l.text }}
        </text>
      </g>
    </svg>

    <div v-if="hover" class="box-plot__tooltip" :style="{ left: hover.left, top: hover.top }">
      <div>
        <b>{{ idTitle }}:</b> {{ hover.point.id }}
      </div>
      <div>
        <b>{{ x.title }}:</b> {{ hover.point.x }}
      </div>
      <div>
        <b>{{ y.title }}:</b> {{ hover.point.y.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
  import { quantile, scaleLinear } from 'd3';

  const POINT = '#4c78a8';
  const PAD = 8; // inset between the panel edge and the y range
  const HOVER_RADIUS = 8; // SVG units within which a point counts as hovered

  // Label layout: each label sits beside its point and is nudged up or down
  // until clear of the labels placed before it; one with no clear slot is
  // dropped, so labels never overlap. Coordinates are local to `bounds`.
  const LABEL_HEIGHT = 11;
  const LABEL_CHAR = 6.2;
  const LABEL_STEPS = [0, 12, 24, 36, 48, 60, 72];
  // Costs: 'cost' of a candidate is its distance from the point plus side
  // penalties; connectors that cross another connector, a point or a label
  // add these on top
  const CROSS_CONNECTOR = 40;
  const CROSS_OBSTACLE = 20;

  const overlaps = (a, b) => !(a.x1 < b.x0 || a.x0 > b.x1 || a.y1 < b.y0 || a.y0 > b.y1);
  const orient = (p, q, r) => Math.sign((q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y));
  const segmentsCross = (a, b) =>
    orient(a.p, a.q, b.p) !== orient(a.p, a.q, b.q) &&
    orient(b.p, b.q, a.p) !== orient(b.p, b.q, a.q);
  const inside = (p, b) => p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1;
  const segmentHitsBox = (s, b) => {
    if (inside(s.p, b) || inside(s.q, b)) return true;
    const c = [
      { x: b.x0, y: b.y0 },
      { x: b.x1, y: b.y0 },
      { x: b.x1, y: b.y1 },
      { x: b.x0, y: b.y1 },
    ];
    return c.some((p, i) => segmentsCross(s, { p, q: c[(i + 1) % 4] }));
  };

  // Candidate spots for one label, cheapest first: directly above or below the
  // point, beside it on either side, then nudged up or down in growing steps.
  // `side` penalises the busier side so labels spread away from a cluster.
  function labelCandidates(item, gap, side) {
    const right = item.cx + gap + 3;
    const left = item.cx - gap - 3;
    const list = [
      { x: item.cx, y: item.cy - gap - 7, anchor: 'middle', cost: 2 },
      { x: item.cx, y: item.cy + gap + 7, anchor: 'middle', cost: 2 },
    ];
    for (const step of LABEL_STEPS) {
      for (const dy of step ? [-step, step] : [0]) {
        list.push({ x: right, y: item.cy + dy, anchor: 'start', cost: step + side.start });
        list.push({ x: left, y: item.cy + dy, anchor: 'end', cost: step + side.end });
      }
    }
    return list;
  }

  // Label layout. Every point is an obstacle. Labels are placed greedily at
  // their cheapest clear candidate, then refined for a few passes in which
  // each label may move to a cheaper spot given all the others, which untangles
  // connectors. A label with no clear candidate is dropped, so labels never
  // overlap points or each other. Coordinates are local to `bounds`.
  function placeLabels(items, bounds, gap) {
    const obstacles = items.map((p) => ({
      key: p.key,
      x0: p.cx - gap,
      x1: p.cx + gap,
      y0: p.cy - gap,
      y1: p.cy + gap,
    }));
    // How crowded each side of a point is, to prefer the emptier side
    const sideFor = (item) => {
      const near = (o, lo, hi) => {
        const ox = (o.x0 + o.x1) / 2;
        const oy = (o.y0 + o.y1) / 2;
        return (
          o.key !== item.key &&
          ox > item.cx + lo &&
          ox <= item.cx + hi &&
          Math.abs(oy - item.cy) < 30
        );
      };
      const right = obstacles.filter((o) => near(o, 0, 70)).length;
      const left = obstacles.filter((o) => near(o, -70, 0)).length;
      return { start: right * 6, end: 4 + left * 6 };
    };
    const placement = (item, c, w) => {
      const x0 = c.anchor === 'start' ? c.x : c.anchor === 'end' ? c.x - w : c.x - w / 2;
      const box = { x0, x1: x0 + w, y0: c.y - LABEL_HEIGHT / 2, y1: c.y + LABEL_HEIGHT / 2 };
      const nudged = Math.abs(c.y - item.cy) >= LABEL_STEPS[1];
      const lx = c.anchor === 'start' ? c.x - 2 : c.x + 2;
      const connector = nudged ? { p: { x: item.cx, y: item.cy }, q: { x: lx, y: c.y } } : null;
      return { key: item.key, box, connector, c };
    };
    // Cost of a placement against the others, or Infinity when it collides
    const score = (item, pl, others) => {
      const { box, connector } = pl;
      if (box.x0 < 0 || box.x1 > bounds.width || box.y0 < 0 || box.y1 > bounds.height)
        return Infinity;
      if (others.some((o) => overlaps(box, o.box))) return Infinity;
      if (obstacles.some((o) => o.key !== item.key && overlaps(box, o))) return Infinity;
      let cost = pl.c.cost;
      if (connector) {
        for (const o of others) {
          if (o.connector && segmentsCross(connector, o.connector)) cost += CROSS_CONNECTOR;
          if (segmentHitsBox(connector, o.box)) cost += CROSS_OBSTACLE;
        }
        for (const o of obstacles) {
          if (o.key !== item.key && segmentHitsBox(connector, o)) cost += CROSS_OBSTACLE;
        }
      }
      // A label box that another connector runs through is penalised too
      for (const o of others) {
        if (o.connector && segmentHitsBox(o.connector, box)) cost += CROSS_OBSTACLE;
      }
      return cost;
    };
    const best = (item, others) => {
      const w = String(item.text).length * LABEL_CHAR;
      let found = null;
      for (const c of labelCandidates(item, gap, sideFor(item))) {
        const pl = placement(item, c, w);
        const cost = score(item, pl, others);
        if (cost < (found ? found.cost : Infinity)) found = { ...pl, cost };
      }
      return found;
    };

    const sorted = [...items].sort((a, b) => a.cy - b.cy);
    const chosen = new Map();
    for (const item of sorted) {
      const pl = best(item, [...chosen.values()]);
      if (pl) chosen.set(item.key, pl);
    }
    for (let pass = 0; pass < 4; pass++) {
      let moved = false;
      for (const item of sorted) {
        const current = chosen.get(item.key);
        const others = [...chosen.values()].filter((o) => o.key !== item.key);
        const pl = best(item, others);
        if (pl && (!current || pl.cost < current.cost - 1)) {
          chosen.set(item.key, pl);
          moved = true;
        }
      }
      if (!moved) break;
    }

    return sorted
      .filter((item) => chosen.has(item.key))
      .map((item) => {
        const { c, connector } = chosen.get(item.key);
        return {
          key: item.key,
          x: c.x,
          y: c.y,
          anchor: c.anchor,
          text: item.text,
          connector: connector && {
            x1: connector.p.x,
            y1: connector.p.y,
            x2: connector.q.x,
            y2: connector.q.y,
          },
        };
      });
  }

  // Deterministic jitter in [-1, 1] from a string, so points stay put across redraws
  function jitter(id) {
    let h = 0;
    for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) | 0;
    return (Math.abs(h) % 1000) / 500 - 1;
  }

  /**
   * BoxPlot
   *
   * One box per `x` category along the bottom, values on the y axis, with
   * every record drawn as a jittered point inside its box. Boxes span the
   * quartiles with the median marked; whiskers reach the furthest points
   * within 1.5 interquartile ranges. Drawn as one SVG that scales to its
   * container, in the same style as ScatterGrid and LineChart.
   *
   * Props follow the axis config shape used by the charts in src/lib/charts:
   *
   *   x: { field, title, domain? }  categories; `domain` fixes their order
   *   y: { field, title, domain? }  linear, rounded out from the data
   *
   * Ids picked in the search box, or by clicking a point, stay highlighted
   * while the other points are dimmed. Hovering a point shows a tooltip.
   */
  export default {
    name: 'BoxPlot',
    props: {
      data: { type: Array, required: true },
      x: { type: Object, required: true },
      y: { type: Object, required: true },
      // Field that identifies a record, and its tooltip label
      idField: { type: String, default: 'id' },
      idTitle: { type: String, default: 'ID' },
      pointRadius: { type: Number, default: 2.8 },
      // Ids highlighted when the plot first renders, and the label of the
      // button that restores them
      initialSelected: { type: Array, default: () => [] },
      initialSelectedLabel: { type: String, default: 'Reset highlights' },
      // Write each selected id beside its point
      labelSelected: { type: Boolean, default: false },
      // Size in SVG units; the SVG scales to its container
      width: { type: Number, default: 960 },
      height: { type: Number, default: 420 },
    },
    data() {
      return { hover: null, selected: [...this.initialSelected] };
    },
    computed: {
      margin() {
        return { top: 12, right: 12, bottom: 51, left: 54 };
      },
      plotWidth() {
        return this.width - this.margin.left - this.margin.right;
      },
      plotHeight() {
        return this.height - this.margin.top - this.margin.bottom;
      },
      records() {
        return this.data
          .map((d) => ({ id: d[this.idField], x: d[this.x.field], y: +d[this.y.field] }))
          .filter((d) => d.x != null && d.x !== '' && Number.isFinite(d.y));
      },
      ids() {
        return [...new Set(this.records.map((d) => d.id))].sort();
      },
      // Whether every default id is currently selected
      defaultsOn() {
        return this.initialSelected.every((id) => this.selected.includes(id));
      },
      categories() {
        return this.x.domain || [...new Set(this.records.map((d) => d.x))].sort();
      },
      band() {
        return this.plotWidth / this.categories.length;
      },
      boxWidth() {
        return this.band * 0.6;
      },
      yScale() {
        const scale = scaleLinear().range([this.plotHeight - PAD, PAD]);
        if (this.y.domain) return scale.domain(this.y.domain);
        return scale.domain([0, Math.max(...this.records.map((d) => d.y))]).nice();
      },
      yTicks() {
        return this.yScale.ticks(5);
      },
      boxes() {
        return this.categories.map((name, i) => {
          const members = this.records.filter((d) => d.x === name);
          const values = members.map((d) => d.y).sort((a, b) => a - b);
          const q1 = quantile(values, 0.25);
          const median = quantile(values, 0.5);
          const q3 = quantile(values, 0.75);
          const iqr = q3 - q1;
          const inside = values.filter((v) => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr);
          const stats = { q1, median, q3, low: inside[0], high: inside[inside.length - 1] };
          const x = i * this.band;
          const points = members.map((d) => ({
            ...d,
            px: this.band / 2 + jitter(d.id) * (this.boxWidth / 2) * 0.7,
            py: this.yScale(d.y),
          }));
          return { name, x, stats, points };
        });
      },
      rings() {
        const wanted = this.selected.map((id) => ({ id, keep: true }));
        if (this.hover) wanted.push({ id: this.hover.point.id, keep: false });
        return this.boxes.flatMap((box) =>
          wanted.flatMap(({ id, keep }) =>
            box.points
              .filter((p) => p.id === id)
              .map((p) => ({
                key: `${box.name}/${id}/${keep}`,
                cx: box.x + p.px,
                cy: p.py,
                fill: keep ? POINT : null,
              })),
          ),
        );
      },
      labels() {
        if (!this.labelSelected || !this.selected.length) return [];
        const ids = new Set(this.selected);
        const items = this.boxes.flatMap((box) =>
          box.points
            .filter((p) => ids.has(p.id))
            .map((p) => ({ key: `${box.name}/${p.id}`, cx: box.x + p.px, cy: p.py, text: p.id })),
        );
        const bounds = { width: this.plotWidth, height: this.plotHeight };
        return placeLabels(items, bounds, this.pointRadius + 2.2);
      },
    },
    methods: {
      // Checking adds the default ids to the selection; unchecking removes them
      toggleDefaults(on) {
        this.selected = on
          ? [...new Set([...this.selected, ...this.initialSelected])]
          : this.selected.filter((id) => !this.initialSelected.includes(id));
      },
      // Nearest point to a mouse event, within HOVER_RADIUS
      nearest(event) {
        const svgBox = this.$refs.svg.getBoundingClientRect();
        const k = this.width / svgBox.width; // CSS px -> SVG units
        const mx = (event.clientX - svgBox.left) * k - this.margin.left;
        const my = (event.clientY - svgBox.top) * k - this.margin.top;
        let best = null;
        let bestDist = HOVER_RADIUS * HOVER_RADIUS;
        for (const box of this.boxes) {
          for (const p of box.points) {
            const dist = (box.x + p.px - mx) ** 2 + (p.py - my) ** 2;
            if (dist < bestDist) {
              bestDist = dist;
              best = p;
            }
          }
        }
        return best;
      },
      onMove(event) {
        const best = this.nearest(event);
        if (!best) {
          this.hover = null;
          return;
        }
        const box = this.$el.getBoundingClientRect();
        this.hover = {
          point: best,
          left: `${event.clientX - box.left + 12}px`,
          top: `${event.clientY - box.top - 12}px`,
        };
      },
    },
  };
</script>

<style scoped>
  .box-plot {
    position: relative;
  }
  .box-plot__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 12px;
  }
  .box-plot__search {
    flex: 1 1 260px;
    max-width: 360px;
  }
  .box-plot__svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .panel {
    fill: #fafafa;
    stroke: #ddd;
    cursor: crosshair;
  }
  .gridline {
    stroke: #e4e4e4;
    stroke-width: 0.75;
    pointer-events: none;
  }
  .whisker,
  .median {
    stroke: #444;
    stroke-width: 1.25;
    pointer-events: none;
  }
  .median {
    stroke: #222;
    stroke-width: 2;
  }
  .box {
    fill: rgba(76, 120, 168, 0.2);
    stroke: #444;
    stroke-width: 1.25;
    pointer-events: none;
  }
  .point {
    fill: #4c78a8;
    fill-opacity: 0.45;
    pointer-events: none;
  }
  .is-dimmed .point {
    fill-opacity: 0.3;
  }
  .ring {
    stroke: #000;
    stroke-width: 1.5;
    pointer-events: none;
  }
  .point-label-line {
    stroke: #555;
    stroke-width: 0.75;
    pointer-events: none;
  }
  .point-label {
    font-size: 11px;
    font-weight: 600;
    fill: #222;
    paint-order: stroke;
    stroke: #fff;
    stroke-width: 3px;
    stroke-linejoin: round;
    pointer-events: none;
  }
  .tick,
  .label {
    font-size: 12px;
    fill: currentColor;
    pointer-events: none;
  }
  .label {
    font-size: 16px;
  }
  .box-plot__tooltip {
    position: absolute;
    z-index: 1;
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.4;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    pointer-events: none;
    white-space: nowrap;
  }
</style>
