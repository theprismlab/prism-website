<template>
  <div class="scatter-grid" @mouseleave="hover = null">
    <!-- Toolbar strip across the top of the card -->
    <div class="scatter-grid__toolbar">
      <v-autocomplete
        v-model="selected"
        :items="ids"
        :label="`Search ${idTitle.toLowerCase()}s`"
        prepend-inner-icon="mdi-magnify"
        class="scatter-grid__search"
        variant="outlined"
        density="compact"
        bg-color="white"
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
        class="scatter-grid__toggle"
        density="compact"
        hide-details
        @update:model-value="toggleDefaults"
      />
    </div>

    <svg ref="svg" :viewBox="`0 0 ${width} ${height}`" class="scatter-grid__svg">
      <!-- Column facet: title and one label per column. With no title, the
           labels are the panels' titles and are set at title size. -->
      <text
        v-if="column.title"
        :x="margin.left + gridWidth / 2"
        y="14"
        class="label"
        text-anchor="middle"
      >
        {{ column.title }}
      </text>
      <text
        v-for="(c, i) in columns"
        :key="`col-${c}`"
        :x="colX(i) + size / 2"
        :y="margin.top - (column.title ? 6 : 8)"
        :class="column.title ? 'tick' : 'label'"
        text-anchor="middle"
      >
        {{ sig(c) }}
      </text>

      <!-- Row facet: one label per row at the right, and a rotated title -->
      <template v-if="row">
        <text
          v-for="(r, j) in rows"
          :key="`row-${r}`"
          :x="rowLabelX"
          :y="rowY(j) + size / 2"
          class="tick"
          dominant-baseline="middle"
        >
          {{ sig(r) }}
        </text>
        <text
          :transform="`translate(${width - 14}, ${margin.top + gridHeight / 2}) rotate(90)`"
          class="label"
          text-anchor="middle"
        >
          {{ row.title }}
        </text>
      </template>

      <!-- Scatter panels. Points never change after load, so each panel is
           memoized; the dimming class sits on the wrapper so it still updates. -->
      <g :class="{ 'is-dimmed': selected.length }">
        <g
          v-for="panel in panels"
          :key="panel.key"
          v-memo="[panel]"
          :transform="`translate(${panel.x}, ${panel.y})`"
        >
          <rect
            :width="size"
            :height="size"
            class="panel"
            @mousemove="onMove(panel, $event)"
            @click="onClick(panel, $event)"
          />
          <!-- Light gridlines at the tick positions -->
          <line
            v-for="v in xTicks"
            :key="`gx-${v}`"
            :x1="xScale(v)"
            :x2="xScale(v)"
            y1="0"
            :y2="size"
            class="gridline"
          />
          <line
            v-for="v in yTicks"
            :key="`gy-${v}`"
            x1="0"
            :x2="size"
            :y1="yScale(v)"
            :y2="yScale(v)"
            class="gridline"
          />
          <circle
            v-for="(p, k) in panel.points"
            :key="k"
            :cx="p.px"
            :cy="p.py"
            :r="pointRadius"
            :fill="p.fill"
            class="point"
          />
          <!-- Reference lines sit above the points so they stay visible in dense regions -->
          <line
            v-if="x.threshold != null"
            :x1="xScale(x.threshold)"
            :x2="xScale(x.threshold)"
            y1="0"
            :y2="size"
            class="threshold"
          />
          <line
            v-if="y.threshold != null"
            x1="0"
            :x2="size"
            :y1="yScale(y.threshold)"
            :y2="yScale(y.threshold)"
            class="threshold"
          />
        </g>
      </g>

      <!-- Histogram of x per column, under the panels -->
      <g
        v-for="h in xHistograms"
        :key="h.key"
        v-memo="[h]"
        :transform="`translate(${h.x}, ${h.y})`"
      >
        <rect :width="size" :height="side" class="panel" />
        <rect
          v-for="(b, k) in h.bars"
          :key="k"
          :x="b.x"
          :y="b.y"
          :width="b.w"
          :height="b.h"
          :fill="b.fill"
        />
        <line
          v-if="x.threshold != null"
          :x1="xScale(x.threshold)"
          :x2="xScale(x.threshold)"
          y1="0"
          :y2="side"
          class="threshold"
        />
      </g>

      <!-- Histogram of y per row, right of the panels -->
      <g
        v-for="h in yHistograms"
        :key="h.key"
        v-memo="[h]"
        :transform="`translate(${h.x}, ${h.y})`"
      >
        <rect :width="side" :height="size" class="panel" />
        <rect
          v-for="(b, k) in h.bars"
          :key="k"
          :x="b.x"
          :y="b.y"
          :width="b.w"
          :height="b.h"
          fill="#c8c8c8"
        />
        <line
          v-if="y.threshold != null"
          x1="0"
          :x2="side"
          :y1="yScale(y.threshold)"
          :y2="yScale(y.threshold)"
          class="threshold"
        />
      </g>

      <!-- Axis ticks on the outer edges only -->
      <template v-for="(c, i) in columns" :key="`xt-${c}`">
        <text
          v-for="v in xTicks"
          :key="v"
          :x="colX(i) + xScale(v)"
          :y="plotsBottom + 11"
          class="tick"
          text-anchor="middle"
        >
          {{ v }}
        </text>
      </template>
      <template v-for="(r, j) in rows" :key="`yt-${r}`">
        <text
          v-for="v in yTicks"
          :key="v"
          :x="margin.left - 4"
          :y="rowY(j) + yScale(v)"
          class="tick"
          text-anchor="end"
          dominant-baseline="middle"
        >
          {{ v }}
        </text>
      </template>
      <template v-if="marginals">
        <text
          v-for="v in countTicksX"
          :key="`cx-${v}`"
          :x="margin.left - 4"
          :y="histY + xHistograms[0].yScale(v)"
          class="tick"
          text-anchor="end"
          dominant-baseline="middle"
        >
          {{ v }}
        </text>
        <text
          v-for="v in countTicksY"
          :key="`cy-${v}`"
          :x="marginX + yHistograms[0].xScale(v)"
          :y="rowY(0) + size + 11"
          class="tick"
          text-anchor="middle"
        >
          {{ v }}
        </text>
        <text :x="marginX + side / 2" :y="rowY(0) + size + 29" class="label" text-anchor="middle">
          Cell lines
        </text>
        <text
          :transform="`translate(14, ${histY + side / 2}) rotate(-90)`"
          class="label"
          text-anchor="middle"
        >
          Cell lines
        </text>
      </template>

      <!-- Axis titles -->
      <text
        :x="margin.left + gridWidth / 2"
        :y="plotsBottom + 31"
        class="label"
        text-anchor="middle"
      >
        {{ x.title }}
      </text>
      <text
        :transform="`translate(14, ${margin.top + gridHeight / 2}) rotate(-90)`"
        class="label"
        text-anchor="middle"
      >
        {{ y.title }}
      </text>

      <!-- Color legend: swatches for an ordinal scale, a gradient otherwise -->
      <g
        v-if="color"
        :transform="`translate(${margin.left + gridWidth / 2 - legendWidth / 2}, ${plotsBottom + 59})`"
      >
        <template v-if="ordinal">
          <g
            v-for="item in legendItems"
            :key="`lg-${item.value}`"
            :transform="`translate(${item.x}, 0)`"
          >
            <rect width="10" height="10" :fill="colorScale(item.value)" />
            <text x="14" y="9" class="tick">
              {{ item.label }}
            </text>
          </g>
        </template>
        <template v-else>
          <defs>
            <linearGradient :id="gradientId">
              <stop
                v-for="t in gradientStops"
                :key="t"
                :offset="`${t * 100}%`"
                :stop-color="colorScale(legendScale.invert(t * legendWidth))"
              />
            </linearGradient>
          </defs>
          <rect :width="legendWidth" height="8" :fill="`url(#${gradientId})`" />
          <text
            v-for="v in legendScale.ticks(4)"
            :key="`lg-${v}`"
            :x="legendScale(v)"
            y="19"
            class="tick"
            text-anchor="middle"
          >
            {{ v }}
          </text>
        </template>
        <text :x="legendWidth / 2" y="37" class="label" text-anchor="middle">
          {{ color.title }}
        </text>
      </g>

      <!-- Selected ids are drawn in color over the dimmed points; the hovered
           id gets an empty ring. Both appear in every panel. -->
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
    </svg>

    <div v-if="hover" class="scatter-grid__tooltip" :style="{ left: hover.left, top: hover.top }">
      <div>
        <b>{{ idTitle }}:</b> {{ hover.point.id }}
      </div>
      <div v-if="column.title">
        <b>{{ column.title }}:</b> {{ sig(hover.point.col) }}
      </div>
      <div v-if="row">
        <b>{{ row.title }}:</b> {{ sig(hover.point.row) }}
      </div>
      <div>
        <b>{{ x.title }}:</b> {{ num(hover.point.x) }}
      </div>
      <div>
        <b>{{ y.title }}:</b> {{ num(hover.point.y) }}
      </div>
      <div v-if="color">
        <b>{{ color.title }}:</b> {{ num(hover.point.c) }}
      </div>
    </div>
  </div>
</template>

<script>
  import {
    bin,
    extent,
    interpolateBlues,
    interpolateRdBu,
    interpolateReds,
    interpolateViridis,
    scaleLinear,
    scaleOrdinal,
    scaleSequential,
  } from 'd3';

  const SCHEMES = { blues: interpolateBlues, reds: interpolateReds, rdbu: interpolateRdBu };
  // Histogram bar colors either side of the x threshold (schemeRdBu[7][5] and [1])
  const ABOVE = '#67a9cf';
  const BELOW = '#ef8a62';
  const SINGLE = '#4c78a8'; // point color when no color scale is given
  const PAD = 8; // inset between a panel's edge and its axis range; covers a selected marker
  const HOVER_RADIUS = 8; // SVG units within which a point counts as hovered

  let instances = 0;

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

  // Data extent rounded outward to round numbers
  const niceExtent = (points, accessor) =>
    scaleLinear().domain(extent(points, accessor)).nice().domain();
  // Unique values, sorted numerically when they all parse as numbers
  const uniqueSorted = (values) => {
    const unique = [...new Set(values)];
    return unique.every((v) => Number.isFinite(+v)) ? unique.sort((a, b) => a - b) : unique;
  };

  /**
   * ScatterGrid
   *
   * A lattice of small scatter plots, one per `column` value (and per `row`
   * value when `row` is given), drawn as one SVG. Every panel shares the x, y
   * and color scales; ticks sit on the outer edges only. Hovering a point
   * rings that id in every panel and shows a tooltip. Ids picked in the
   * search box, or by clicking a point, stay highlighted in every panel
   * while the other points are dimmed.
   *
   * `data` is a flat list of records; `x`, `y`, `color`, `column`, `row` each
   * name a field with `field` and carry a `title`, following the axis config
   * shape used by the charts in src/lib/charts. Values are coerced to numbers
   * and records with a non-numeric x or y are left out.
   *
   *   x, y:   { field, title, domain?: [min, max], threshold?: number, tickValues?: number[] }
   *           tickValues replaces the automatic ticks (and their gridlines)
   *   color:  { field, title, type?: 'sequential' | 'categorical', domain?, range?, reverse? }
   *           sequential range: 'blues' (default) | 'reds' | 'rdbu' or a d3
   *           interpolator, flipped end to end by `reverse: true`;
   *           categorical range: a list of colors
   *           or omitted for one color and no legend
   *   column: { field, title?, domain? }
   *           without a title, the column labels are drawn as panel titles
   *   row:    { field, title, domain? } or null for a single row
   *
   * A categorical `domain` fixes the order of a facet or of the color
   * categories; otherwise unique values are sorted, numerically when they are
   * numbers. A categorical color keeps the raw field value, colors categories
   * along a viridis ramp (darker for later ones) and draws a swatch legend.
   *
   * `marginals` adds a histogram of x under each column (bars colored by the
   * side of the x threshold they fall on) and a histogram of y, one entry per
   * id, to the right of each row.
   */
  export default {
    name: 'ScatterGrid',
    props: {
      data: { type: Array, required: true },
      x: { type: Object, required: true },
      y: { type: Object, required: true },
      // Omit for a single point color and no legend
      color: { type: Object, default: null },
      column: { type: Object, required: true },
      row: { type: Object, default: null },
      // Field that identifies a record across panels, and its tooltip label
      idField: { type: String, default: 'id' },
      idTitle: { type: String, default: 'ID' },
      marginals: { type: Boolean, default: false },
      // Point radius in SVG units; highlight rings grow with it
      pointRadius: { type: Number, default: 2.8 },
      // Space between panels in SVG units
      gap: { type: Number, default: 6 },
      // Ids highlighted when the grid first renders, and the label of the
      // button that restores them
      initialSelected: { type: Array, default: () => [] },
      initialSelectedLabel: { type: String, default: 'Reset highlights' },
      // Write each selected id beside its point (once per panel, at its highest point)
      labelSelected: { type: Boolean, default: false },
      // Total width in SVG units. Panels are sized to fill it, so grids with
      // different column counts scale to the container by the same factor
      // and their text renders at the same size.
      width: { type: Number, default: 960 },
    },
    data() {
      return {
        hover: null,
        selected: [...this.initialSelected],
        gradientId: `scatter-grid-gradient-${++instances}`,
      };
    },
    computed: {
      ids() {
        return [...new Set(this.points.map((p) => p.id))].sort();
      },
      // Whether every default id is currently selected
      defaultsOn() {
        return this.initialSelected.every((id) => this.selected.includes(id));
      },
      ordinal() {
        return this.color?.type === 'categorical';
      },
      columns() {
        return this.column.domain || uniqueSorted(this.data.map((d) => d[this.column.field]));
      },
      // Highest row value at the top, like a y axis
      rows() {
        if (!this.row) return [null];
        return this.row.domain || uniqueSorted(this.data.map((d) => d[this.row.field])).reverse();
      },
      points() {
        return this.data
          .map((d) => ({
            id: d[this.idField],
            x: +d[this.x.field],
            y: +d[this.y.field],
            c: !this.color ? null : this.ordinal ? d[this.color.field] : +d[this.color.field],
            col: d[this.column.field],
            row: this.row ? d[this.row.field] : null,
          }))
          .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
      },
      // An automatic domain is rounded out to tick-friendly ends
      xDomain() {
        return this.x.domain || niceExtent(this.points, (p) => p.x);
      },
      yDomain() {
        return this.y.domain || niceExtent(this.points, (p) => p.y);
      },
      xScale() {
        return scaleLinear()
          .domain(this.xDomain)
          .range([PAD, this.size - PAD]);
      },
      yScale() {
        return scaleLinear()
          .domain(this.yDomain)
          .range([this.size - PAD, PAD]);
      },
      colorScale() {
        if (!this.color) return () => SINGLE;
        if (this.ordinal) {
          const values = this.color.domain || uniqueSorted(this.points.map((p) => p.c));
          // Viridis from light to dark across the categories, as the original figures used
          const n = values.length + 2;
          const palette =
            this.color.range || values.map((_, i) => interpolateViridis(1 - (i + 1) / n));
          return scaleOrdinal().domain(values).range(palette);
        }
        const range = this.color.range;
        const scheme = typeof range === 'function' ? range : SCHEMES[range] || SCHEMES.blues;
        const interpolator = this.color.reverse ? (t) => scheme(1 - t) : scheme;
        let domain = this.color.domain;
        if (!domain) {
          const [lo, hi] = extent(this.points, (p) => p.c);
          // A diverging scale is centered on zero
          const m = Math.max(Math.abs(lo), Math.abs(hi));
          domain = range === 'rdbu' ? [-m, m] : [0, hi];
        }
        return scaleSequential(interpolator).domain(domain);
      },
      panels() {
        const list = [];
        this.rows.forEach((r, j) => {
          this.columns.forEach((c, i) => {
            const pts = this.points
              .filter((p) => p.col === c && p.row === r)
              .map((p) => ({
                ...p,
                px: this.xScale(p.x),
                py: this.yScale(p.y),
                fill: this.colorScale(p.c),
              }));
            // An id may appear more than once in a panel (e.g. a feature at several doses)
            const byId = new Map();
            pts.forEach((p) => {
              if (!byId.has(p.id)) byId.set(p.id, []);
              byId.get(p.id).push(p);
            });
            list.push({ key: `${c}/${r}`, x: this.colX(i), y: this.rowY(j), points: pts, byId });
          });
        });
        return list;
      },

      // Layout. A marginal histogram is 0.55 of a panel thick.
      size() {
        const cols = this.columns.length;
        const gaps = (cols - 1 + (this.marginals ? 1 : 0)) * this.gap;
        const available = this.width - this.margin.left - this.margin.right - gaps;
        return available / (cols + (this.marginals ? 0.55 : 0));
      },
      side() {
        return this.marginals ? this.size * 0.55 : 0;
      },
      // Side margins hold the tick labels plus a rotated 16px title; widths are
      // estimated from the longest label at the 13px tick font.
      margin() {
        const longest = (labels) => Math.max(0, ...labels.map((l) => String(l).length)) * 8.5;
        const left = longest(this.yTicks) + 34;
        const right = this.row ? longest(this.rows.map(this.sig)) + 34 : 8;
        // The bottom holds x ticks and title, plus the legend when there is a color scale
        return { top: 40, right, bottom: this.color ? 114 : 51, left };
      },
      gridWidth() {
        return this.columns.length * this.size + (this.columns.length - 1) * this.gap;
      },
      gridHeight() {
        return this.rows.length * this.size + (this.rows.length - 1) * this.gap;
      },
      histY() {
        return this.margin.top + this.gridHeight + this.gap;
      },
      marginX() {
        return this.margin.left + this.gridWidth + this.gap;
      },
      plotsBottom() {
        return this.marginals ? this.histY + this.side : this.margin.top + this.gridHeight;
      },
      rowLabelX() {
        return this.marginX + (this.marginals ? this.side + this.gap : 0) + 4;
      },
      height() {
        return this.plotsBottom + this.margin.bottom;
      },

      // Marginal histograms
      xHistograms() {
        if (!this.marginals) return [];
        const binner = bin().domain(this.xDomain).thresholds(25);
        const hists = this.columns.map((c) =>
          binner(this.points.filter((p) => p.col === c).map((p) => p.x)),
        );
        const max = Math.max(...hists.flat().map((b) => b.length));
        const yScale = scaleLinear()
          .domain([0, max])
          .range([this.side - PAD, PAD]);
        const split = this.x.threshold ?? 0;
        return hists.map((bins, i) => ({
          key: `xh-${i}`,
          x: this.colX(i),
          y: this.histY,
          yScale,
          bars: bins.map((b) => ({
            x: this.xScale(b.x0),
            w: Math.max(0, this.xScale(b.x1) - this.xScale(b.x0) - 1),
            y: yScale(b.length),
            h: this.side - PAD - yScale(b.length),
            fill: b.x0 >= split ? ABOVE : BELOW,
          })),
        }));
      },
      yHistograms() {
        if (!this.marginals) return [];
        const binner = bin().domain(this.yDomain).thresholds(25);
        const hists = this.rows.map((r) => {
          const perId = new Map();
          this.points.filter((p) => p.row === r).forEach((p) => perId.set(p.id, p.y));
          return binner([...perId.values()]);
        });
        const max = Math.max(...hists.flat().map((b) => b.length));
        const xScale = scaleLinear()
          .domain([0, max])
          .range([PAD, this.side - PAD]);
        return hists.map((bins, j) => ({
          key: `yh-${j}`,
          x: this.marginX,
          y: this.rowY(j),
          xScale,
          bars: bins.map((b) => ({
            x: PAD,
            y: this.yScale(b.x1),
            w: Math.max(0, xScale(b.length) - PAD),
            h: Math.max(0, this.yScale(b.x0) - this.yScale(b.x1) - 1),
          })),
        }));
      },

      // Ticks and legend
      // Ticks depend on the domain only, so they can size the margins before
      // the panel size is known.
      xTicks() {
        return this.x.tickValues || scaleLinear().domain(this.xDomain).ticks(3);
      },
      yTicks() {
        return this.y.tickValues || scaleLinear().domain(this.yDomain).ticks(3);
      },
      countTicksX() {
        return this.xHistograms.length ? this.xHistograms[0].yScale.ticks(2) : [];
      },
      countTicksY() {
        return this.yHistograms.length ? this.yHistograms[0].xScale.ticks(2) : [];
      },
      // Ordinal legend: swatch plus label per category, laid out in a row
      legendItems() {
        if (!this.ordinal) return [];
        let x = 0;
        return this.colorScale.domain().map((value) => {
          const label = this.sig(value);
          const item = { value, label, x };
          x += 14 + label.length * 7.5 + 14;
          return item;
        });
      },
      legendWidth() {
        if (!this.ordinal) return 160;
        const last = this.legendItems[this.legendItems.length - 1];
        return last ? last.x + 14 + last.label.length * 7.5 : 0;
      },
      legendScale() {
        if (!this.color || this.ordinal) return null;
        return scaleLinear().domain(this.colorScale.domain()).range([0, this.legendWidth]);
      },
      gradientStops() {
        return Array.from({ length: 11 }, (_, i) => i / 10);
      },
      rings() {
        const wanted = this.selected.map((id) => ({ id, keep: true }));
        if (this.hover) wanted.push({ id: this.hover.point.id, keep: false });
        return this.panels.flatMap((panel) =>
          wanted.flatMap(({ id, keep }) =>
            (panel.byId.get(id) || []).map((p, k) => ({
              key: `${panel.key}/${id}/${keep}/${k}`,
              cx: panel.x + p.px,
              cy: panel.y + p.py,
              fill: keep ? p.fill : null,
            })),
          ),
        );
      },
      labels() {
        if (!this.labelSelected || !this.selected.length) return [];
        return this.panels.flatMap((panel) => {
          // One label per id per panel, on its highest point
          const items = this.selected
            .map((id) => {
              const pts = panel.byId.get(id) || [];
              const top = pts.reduce((a, p) => (!a || p.py < a.py ? p : a), null);
              return top && { key: `${panel.key}/${id}`, cx: top.px, cy: top.py, text: id };
            })
            .filter(Boolean);
          const bounds = { width: this.size, height: this.size };
          return placeLabels(items, bounds, this.pointRadius + 2.2).map((l) => ({
            ...l,
            x: panel.x + l.x,
            y: panel.y + l.y,
            connector: l.connector && {
              x1: panel.x + l.connector.x1,
              y1: panel.y + l.connector.y1,
              x2: panel.x + l.connector.x2,
              y2: panel.y + l.connector.y2,
            },
          }));
        });
      },
    },
    methods: {
      // Checking adds the default ids to the selection; unchecking removes them
      toggleDefaults(on) {
        this.selected = on
          ? [...new Set([...this.selected, ...this.initialSelected])]
          : this.selected.filter((id) => !this.initialSelected.includes(id));
      },
      colX(i) {
        return this.margin.left + i * (this.size + this.gap);
      },
      rowY(j) {
        return this.margin.top + j * (this.size + this.gap);
      },
      // Three significant digits, for dose labels
      sig(v) {
        return Number.isFinite(+v) ? String(parseFloat((+v).toPrecision(3))) : v;
      },
      num(v) {
        if (typeof v !== 'number') return this.sig(v);
        return Number.isInteger(v) ? v : v.toFixed(2);
      },
      // Nearest point in a panel to a mouse event, within HOVER_RADIUS
      nearest(panel, event) {
        const svgBox = this.$refs.svg.getBoundingClientRect();
        const k = this.width / svgBox.width; // CSS px -> SVG units
        const mx = (event.clientX - svgBox.left) * k - panel.x;
        const my = (event.clientY - svgBox.top) * k - panel.y;
        let best = null;
        let bestDist = HOVER_RADIUS * HOVER_RADIUS;
        for (const p of panel.points) {
          const dist = (p.px - mx) ** 2 + (p.py - my) ** 2;
          if (dist < bestDist) {
            bestDist = dist;
            best = p;
          }
        }
        return best;
      },
      onMove(panel, event) {
        const best = this.nearest(panel, event);
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
      // Clicking a point toggles it in the selection
      onClick(panel, event) {
        const best = this.nearest(panel, event);
        if (!best) return;
        this.selected = this.selected.includes(best.id)
          ? this.selected.filter((id) => id !== best.id)
          : [...this.selected, best.id];
      },
    },
  };
</script>

<style scoped>
  /* A card like the oncology reference's agent explorer: hairline border,
     soft shadow, and a tinted toolbar strip over the plot. Nothing is clipped
     (no overflow: hidden), so the tooltip can cross the card's edge. */
  .scatter-grid {
    position: relative;
    margin-top: 1.5rem;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }
  .scatter-grid__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    /* Inside the card's 1px border */
    border-radius: 7px 7px 0 0;
  }
  .scatter-grid__search {
    flex: 1 1 280px;
    max-width: 480px;
  }
  .scatter-grid__toggle {
    flex: 0 0 auto;
    margin-left: auto;
  }
  .scatter-grid__toggle :deep(.v-label) {
    font-size: 0.8125rem;
  }
  /* The plot is inset from the card's edges by its margin */
  .scatter-grid__svg {
    display: block;
    width: calc(100% - 32px);
    height: auto;
    margin: 12px 16px;
    overflow: visible;
  }
  .panel {
    fill: #fafafa;
    stroke: #ddd;
  }
  .point {
    fill-opacity: 0.75;
    pointer-events: none;
  }
  .is-dimmed .point {
    fill-opacity: 0.35;
  }
  .panel {
    cursor: crosshair;
  }
  .gridline {
    stroke: #e4e4e4;
    stroke-width: 0.75;
    pointer-events: none;
  }
  .threshold {
    stroke: #333;
    stroke-width: 0.75;
    stroke-dasharray: 3 3;
    pointer-events: none;
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
  .scatter-grid__tooltip {
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
