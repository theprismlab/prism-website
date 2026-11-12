<template>
  <div
    class="line-chart"
    @mouseleave="hover = null"
  >
    <svg
      ref="svg"
      :viewBox="`0 0 ${width} ${height}`"
      class="line-chart__svg"
    >
      <text
        v-if="title"
        :x="width / 2"
        y="17"
        class="label label--title"
        text-anchor="middle"
      >
        {{ title }}
      </text>

      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <rect
          :width="plotWidth"
          :height="plotHeight"
          class="panel"
          @mousemove="onMove($event)"
        />
        <line
          v-for="v in yTicks"
          :key="`gy-${v}`"
          x1="0"
          :x2="plotWidth"
          :y1="yScale(v)"
          :y2="yScale(v)"
          class="gridline"
        />
        <line
          v-for="v in xTicks"
          :key="`gx-${v}`"
          :x1="xScale(v)"
          :x2="xScale(v)"
          y1="0"
          :y2="plotHeight"
          class="gridline"
        />

        <!-- One group per series: the mean line and the replicate points -->
        <g
          v-for="s in seriesData"
          :key="s.name"
          class="series"
          :class="{ 'is-muted': hover && hover.series !== s.name }"
        >
          <path
            :d="s.path"
            :stroke="s.color"
            class="series__line"
          />
          <circle
            v-for="(p, k) in s.points"
            :key="k"
            :cx="p.px"
            :cy="p.py"
            :r="pointRadius"
            :fill="s.color"
            class="series__point"
          />
        </g>

        <!-- Ticks -->
        <text
          v-for="v in xTicks"
          :key="`xt-${v}`"
          :transform="`translate(${xScale(v)}, ${plotHeight + 8}) rotate(-40)`"
          class="tick"
          text-anchor="end"
        >
          {{ sig(v) }}
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
        <text
          :x="plotWidth / 2"
          :y="plotHeight + 58"
          class="label"
          text-anchor="middle"
        >
          {{ x.title }}
        </text>
        <text
          :transform="`translate(${-margin.left + 14}, ${plotHeight / 2}) rotate(-90)`"
          class="label"
          text-anchor="middle"
        >
          {{ y.title }}
        </text>

        <!-- Legend: a line swatch per series, centered under the x title -->
        <g :transform="`translate(${plotWidth / 2 - legendWidth / 2}, ${plotHeight + 78})`">
          <g
            v-for="item in legendItems"
            :key="item.name"
            :transform="`translate(${item.x}, 0)`"
            class="series"
          >
            <line
              x1="0"
              x2="18"
              y1="5"
              y2="5"
              :stroke="item.color"
              class="series__line"
            />
            <circle
              cx="9"
              cy="5"
              r="3"
              :fill="item.color"
            />
            <text
              x="24"
              y="9"
              class="tick"
            >{{ item.name }}</text>
          </g>
          <text
            :x="legendWidth / 2"
            y="28"
            class="label"
            text-anchor="middle"
          >
            {{ series.title }}
          </text>
        </g>
      </g>
    </svg>

    <div
      v-if="hover"
      class="line-chart__tooltip"
      :style="{ left: hover.left, top: hover.top }"
    >
      <div>
        <b>{{ series.title }}:</b> {{ hover.series }}
      </div>
      <div>
        <b>{{ x.title }}:</b> {{ sig(hover.point.x) }}
      </div>
      <div>
        <b>{{ y.title }}:</b> {{ hover.point.y.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script>
  import {
    curveMonotoneX,
    extent,
    line,
    mean,
    rollups,
    scaleLinear,
    scaleLog,
    schemeTableau10,
  } from 'd3';

  const PAD = 10; // inset between the panel edge and the axis range
  const HOVER_RADIUS = 10; // SVG units within which a point counts as hovered

  const uniqueSorted = (values) => [...new Set(values)].sort((a, b) => a - b);

  /**
   * LineChart
   *
   * One panel of lines, one per `series` value, drawn as an SVG that scales to
   * its container. Every record is drawn as a point; the line runs through
   * the mean y at each x, so replicate measurements show as points around it.
   * Hovering a point shows a tooltip and mutes the other series.
   *
   * Props follow the axis config shape used by the charts in src/lib/charts:
   *
   *   x:      { field, title, type?: 'linear' | 'log', domain? }
   *           ticks sit at the distinct x values, labeled to 3 significant digits
   *   y:      { field, title, domain? }  linear, rounded out from the data
   *   series: { field, title, domain?, range? }
   *           `domain` fixes the series order; `range` is a list of colors
   */
  export default {
    name: 'LineChart',
    props: {
      data: { type: Array, required: true },
      x: { type: Object, required: true },
      y: { type: Object, required: true },
      series: { type: Object, required: true },
      title: { type: String, default: '' },
      pointRadius: { type: Number, default: 3 },
      // Number of y ticks, spread evenly over the y domain
      yTickCount: { type: Number, default: 5 },
      // Size in SVG units; the SVG scales to its container
      width: { type: Number, default: 460 },
      height: { type: Number, default: 400 },
    },
    data() {
      return { hover: null };
    },
    computed: {
      margin() {
        return { top: this.title ? 32 : 12, right: 14, bottom: 118, left: 54 };
      },
      plotWidth() {
        return this.width - this.margin.left - this.margin.right;
      },
      plotHeight() {
        return this.height - this.margin.top - this.margin.bottom;
      },
      records() {
        return this.data
          .map((d) => ({ x: +d[this.x.field], y: +d[this.y.field], series: d[this.series.field] }))
          .filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
      },
      xTicks() {
        return uniqueSorted(this.records.map((d) => d.x));
      },
      xScale() {
        const scale = this.x.type === 'log' ? scaleLog() : scaleLinear();
        return scale.domain(this.x.domain || extent(this.xTicks)).range([PAD, this.plotWidth - PAD]);
      },
      // An explicit y domain is used as given; an automatic one is rounded out
      yScale() {
        const scale = scaleLinear().range([this.plotHeight - PAD, PAD]);
        if (this.y.domain) return scale.domain(this.y.domain);
        return scale.domain([0, Math.max(...this.records.map((d) => d.y))]).nice();
      },
      // Exactly `yTickCount` ticks, evenly spaced, so charts with the same
      // domain show the same ticks
      yTicks() {
        const [lo, hi] = this.yScale.domain();
        const n = Math.max(2, this.yTickCount);
        return Array.from({ length: n }, (_, i) =>
          parseFloat((lo + ((hi - lo) * i) / (n - 1)).toFixed(3)),
        );
      },
      seriesNames() {
        return this.series.domain || [...new Set(this.records.map((d) => d.series))];
      },
      seriesData() {
        const colors = this.series.range || schemeTableau10;
        const path = line()
          .x((d) => this.xScale(d.x))
          .y((d) => this.yScale(d.y))
          .curve(curveMonotoneX);
        return this.seriesNames.map((name, i) => {
          const points = this.records
            .filter((d) => d.series === name)
            .map((d) => ({ ...d, px: this.xScale(d.x), py: this.yScale(d.y) }));
          // One point per x at the mean y, in x order, for the line
          const means = rollups(points, (g) => mean(g, (d) => d.y), (d) => d.x)
            .map(([x, y]) => ({ x, y }))
            .sort((a, b) => a.x - b.x);
          return { name, color: colors[i % colors.length], points, path: path(means) };
        });
      },
      legendItems() {
        let x = 0;
        return this.seriesData.map((s) => {
          const item = { name: s.name, color: s.color, x };
          x += 24 + String(s.name).length * 7 + 16;
          return item;
        });
      },
      legendWidth() {
        const last = this.legendItems[this.legendItems.length - 1];
        return last ? last.x + 24 + String(last.name).length * 7 : 0;
      },
    },
    methods: {
      // Three significant digits, for dose labels
      sig(v) {
        return String(parseFloat((+v).toPrecision(3)));
      },
      onMove(event) {
        const svgBox = this.$refs.svg.getBoundingClientRect();
        const k = this.width / svgBox.width; // CSS px -> SVG units
        const mx = (event.clientX - svgBox.left) * k - this.margin.left;
        const my = (event.clientY - svgBox.top) * k - this.margin.top;
        let best = null;
        let bestDist = HOVER_RADIUS * HOVER_RADIUS;
        for (const s of this.seriesData) {
          for (const p of s.points) {
            const dist = (p.px - mx) ** 2 + (p.py - my) ** 2;
            if (dist < bestDist) {
              bestDist = dist;
              best = { point: p, series: s.name };
            }
          }
        }
        if (!best) {
          this.hover = null;
          return;
        }
        const box = this.$el.getBoundingClientRect();
        this.hover = {
          ...best,
          left: `${event.clientX - box.left + 12}px`,
          top: `${event.clientY - box.top - 12}px`,
        };
      },
    },
  };
</script>

<style scoped>
  .line-chart {
    position: relative;
  }
  .line-chart__svg {
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
  .series {
    pointer-events: none;
    transition: opacity 0.15s;
  }
  .series.is-muted {
    opacity: 0.2;
  }
  .series__line {
    fill: none;
    stroke-width: 2;
  }
  .series__point {
    fill-opacity: 0.6;
  }
  .tick,
  .label {
    font-size: 12px;
    fill: currentColor;
    pointer-events: none;
  }
  /* 15 here matches 16 in ScatterGrid and BoxPlot on screen: this chart is 460
     units wide and drawn two to a row, so it is scaled up slightly more */
  .label {
    font-size: 15px;
  }
  .label--title {
    font-size: 15px;
    font-weight: 600;
  }
  .line-chart__tooltip {
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
