<template>
  <div
    class="scatter-grid"
    @mouseleave="hover = null"
  >
    <v-autocomplete
      v-model="selected"
      :items="ids"
      :label="`Search ${idTitle.toLowerCase()}s`"
      class="scatter-grid__search"
      variant="underlined"
      density="compact"
      multiple
      chips
      closable-chips
      clearable
      hide-details
    />

    <svg
      ref="svg"
      :viewBox="`0 0 ${width} ${height}`"
      class="scatter-grid__svg"
    >
      <!-- Column facet: title and one label per column -->
      <text
        v-if="column.title"
        :x="margin.left + gridWidth / 2"
        y="12"
        class="label"
        text-anchor="middle"
      >
        {{ column.title }}
      </text>
      <text
        v-for="(c, i) in columns"
        :key="`col-${c}`"
        :x="colX(i) + size / 2"
        :y="margin.top - 6"
        class="tick"
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
          :transform="`translate(${width - 12}, ${margin.top + gridHeight / 2}) rotate(90)`"
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
          <circle
            v-for="(p, k) in panel.points"
            :key="k"
            :cx="p.px"
            :cy="p.py"
            r="2.8"
            :fill="p.fill"
            class="point"
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
        <rect
          :width="size"
          :height="side"
          class="panel"
        />
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
        <rect
          :width="side"
          :height="size"
          class="panel"
        />
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
      <template
        v-for="(c, i) in columns"
        :key="`xt-${c}`"
      >
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
      <template
        v-for="(r, j) in rows"
        :key="`yt-${r}`"
      >
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
        <text
          :x="marginX + side / 2"
          :y="rowY(0) + size + 26"
          class="label"
          text-anchor="middle"
        >
          Cell lines
        </text>
        <text
          :transform="`translate(12, ${histY + side / 2}) rotate(-90)`"
          class="label"
          text-anchor="middle"
        >
          Cell lines
        </text>
      </template>

      <!-- Axis titles -->
      <text
        :x="margin.left + gridWidth / 2"
        :y="plotsBottom + 28"
        class="label"
        text-anchor="middle"
      >
        {{ x.title }}
      </text>
      <text
        :transform="`translate(12, ${margin.top + gridHeight / 2}) rotate(-90)`"
        class="label"
        text-anchor="middle"
      >
        {{ y.title }}
      </text>

      <!-- Color legend: swatches for an ordinal scale, a gradient otherwise -->
      <g
        :transform="`translate(${margin.left + gridWidth / 2 - legendWidth / 2}, ${plotsBottom + 56})`"
      >
        <template v-if="ordinal">
          <g
            v-for="item in legendItems"
            :key="`lg-${item.value}`"
            :transform="`translate(${item.x}, 0)`"
          >
            <rect
              width="10"
              height="10"
              :fill="colorScale(item.value)"
            />
            <text
              x="14"
              y="9"
              class="tick"
            >
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
          <rect
            :width="legendWidth"
            height="8"
            :fill="`url(#${gradientId})`"
          />
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
        <text
          :x="legendWidth / 2"
          y="34"
          class="label"
          text-anchor="middle"
        >
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
        :r="ring.fill ? 5 : 4.5"
        :fill="ring.fill || 'none'"
        class="ring"
      />
    </svg>

    <div
      v-if="hover"
      class="scatter-grid__tooltip"
      :style="{ left: hover.left, top: hover.top }"
    >
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
      <div>
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
  const PAD = 8; // inset between a panel's edge and its axis range; covers a selected marker
  const GAP = 6; // space between panels
  const HOVER_RADIUS = 8; // SVG units within which a point counts as hovered

  let instances = 0;
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
   * name a field with `key` and carry a `title`. Values are coerced to numbers
   * and records with a non-numeric x or y are left out.
   *
   *   x, y:   { key, title, domain?: [min, max], threshold?: number }
   *   color:  { key, title, scheme?: 'blues' | 'reds' | 'rdbu' | 'ordinal', domain?, values? }
   *   column: { key, title?, values? }
   *   row:    { key, title, values? } or null for a single row
   *
   * `values` fixes the order of a facet or of the ordinal color categories;
   * otherwise unique values are sorted, numerically when they are numbers.
   * An 'ordinal' color scheme keeps the raw field value, colors categories
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
      color: { type: Object, required: true },
      column: { type: Object, required: true },
      row: { type: Object, default: null },
      // Field that identifies a record across panels, and its tooltip label
      idKey: { type: String, default: 'id' },
      idTitle: { type: String, default: 'ID' },
      marginals: { type: Boolean, default: false },
      // Ids highlighted when the grid first renders
      initialSelected: { type: Array, default: () => [] },
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
      ordinal() {
        return this.color.scheme === 'ordinal';
      },
      columns() {
        return this.column.values || uniqueSorted(this.data.map((d) => d[this.column.key]));
      },
      // Highest row value at the top, like a y axis
      rows() {
        if (!this.row) return [null];
        return this.row.values || uniqueSorted(this.data.map((d) => d[this.row.key])).reverse();
      },
      points() {
        return this.data
          .map((d) => ({
            id: d[this.idKey],
            x: +d[this.x.key],
            y: +d[this.y.key],
            c: this.ordinal ? d[this.color.key] : +d[this.color.key],
            col: d[this.column.key],
            row: this.row ? d[this.row.key] : null,
          }))
          .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
      },
      xDomain() {
        return this.x.domain || extent(this.points, (p) => p.x);
      },
      yDomain() {
        return this.y.domain || extent(this.points, (p) => p.y);
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
        if (this.ordinal) {
          const values = this.color.values || uniqueSorted(this.points.map((p) => p.c));
          // Viridis from light to dark across the categories, as the original figures used
          const n = values.length + 2;
          const palette = values.map((_, i) => interpolateViridis(1 - (i + 1) / n));
          return scaleOrdinal().domain(values).range(palette);
        }
        const scheme = SCHEMES[this.color.scheme] || interpolateBlues;
        let domain = this.color.domain;
        if (!domain) {
          const [lo, hi] = extent(this.points, (p) => p.c);
          // A diverging scale is centered on zero
          const m = Math.max(Math.abs(lo), Math.abs(hi));
          domain = this.color.scheme === 'rdbu' ? [-m, m] : [0, hi];
        }
        return scaleSequential(scheme).domain(domain);
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
        const gaps = (cols - 1 + (this.marginals ? 1 : 0)) * GAP;
        const available = this.width - this.margin.left - this.margin.right - gaps;
        return available / (cols + (this.marginals ? 0.55 : 0));
      },
      side() {
        return this.marginals ? this.size * 0.55 : 0;
      },
      // Side margins hold the tick labels plus a rotated title; widths are
      // estimated from the longest label at the 13px tick font.
      margin() {
        const longest = (labels) => Math.max(0, ...labels.map((l) => String(l).length)) * 8.5;
        const left = longest(this.yTicks) + 32;
        const right = this.row ? longest(this.rows.map(this.sig)) + 32 : 8;
        return { top: 38, right, bottom: 108, left };
      },
      gridWidth() {
        return this.columns.length * this.size + (this.columns.length - 1) * GAP;
      },
      gridHeight() {
        return this.rows.length * this.size + (this.rows.length - 1) * GAP;
      },
      histY() {
        return this.margin.top + this.gridHeight + GAP;
      },
      marginX() {
        return this.margin.left + this.gridWidth + GAP;
      },
      plotsBottom() {
        return this.marginals ? this.histY + this.side : this.margin.top + this.gridHeight;
      },
      rowLabelX() {
        return this.marginX + (this.marginals ? this.side + GAP : 0) + 4;
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
        return scaleLinear().domain(this.xDomain).ticks(3);
      },
      yTicks() {
        return scaleLinear().domain(this.yDomain).ticks(3);
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
        if (this.ordinal) return null;
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
    },
    methods: {
      colX(i) {
        return this.margin.left + i * (this.size + GAP);
      },
      rowY(j) {
        return this.margin.top + j * (this.size + GAP);
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
  .scatter-grid {
    position: relative;
  }
  .scatter-grid__svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .panel {
    fill: #fafafa;
    stroke: #ddd;
  }
  .scatter-grid__search {
    max-width: 360px;
    margin-bottom: 12px;
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
  .tick,
  .label {
    font-size: 12px;
    fill: currentColor;
    pointer-events: none;
  }
  .label {
    font-size: 14px;
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
