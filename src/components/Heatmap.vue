<template>
  <div class="heatmap" @mouseleave="hover = null">
    <p v-if="title" class="heatmap__title prism-text-title-small">{{ title }}</p>

    <svg :viewBox="`0 0 ${width} ${height}`" :width="width" :height="height" class="heatmap__svg">
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <!-- Cells -->
        <rect
          v-for="cell in cells"
          :key="cell.key"
          :x="cell.col * size"
          :y="cell.row * size"
          :width="size"
          :height="size"
          :fill="color(cell.value)"
          stroke="#fff"
          @mousemove="onHover(cell, $event)"
        />

        <!-- X ticks and title -->
        <text
          v-for="(x, i) in xDomain"
          :key="`x-${x}`"
          :x="(i + 0.5) * size"
          :y="plotHeight + 14"
          class="heatmap__tick"
          text-anchor="middle"
        >
          {{ tick(x) }}
        </text>
        <text :x="plotWidth / 2" :y="plotHeight + 32" class="heatmap__label" text-anchor="middle">
          {{ xTitle }}
        </text>

        <!-- Y ticks and title (only when the plot has a y axis) -->
        <template v-if="yTitle">
          <text
            v-for="(y, i) in yDomain"
            :key="`y-${y}`"
            x="-6"
            :y="(yDomain.length - i - 0.5) * size"
            class="heatmap__tick"
            text-anchor="end"
            dominant-baseline="middle"
          >
            {{ tick(y) }}
          </text>
          <text
            :transform="`translate(${-margin.left + 14}, ${plotHeight / 2}) rotate(-90)`"
            class="heatmap__label"
            text-anchor="middle"
          >
            {{ yTitle }}
          </text>
        </template>

        <!-- Legend: gradient bar with ticks, under the x title -->
        <g v-if="legend" :transform="`translate(0, ${plotHeight + 48})`">
          <defs>
            <linearGradient :id="gradientId">
              <stop
                v-for="t in gradientStops"
                :key="t"
                :offset="`${t * 100}%`"
                :stop-color="legendColor(t)"
              />
            </linearGradient>
          </defs>
          <rect :width="plotWidth" height="10" :fill="`url(#${gradientId})`" />
          <text
            v-for="v in legendTicks"
            :key="`legend-${v}`"
            :x="legendX(v)"
            y="22"
            class="heatmap__tick"
            text-anchor="middle"
          >
            {{ v }}
          </text>
          <text :x="plotWidth / 2" y="40" class="heatmap__label" text-anchor="middle">
            {{ valueTitle }}
          </text>
        </g>
      </g>
    </svg>

    <div v-if="hover" class="heatmap__tooltip" :style="{ left: hover.left, top: hover.top }">
      <div>
        <b>{{ xTitle }}:</b> {{ tick(hover.cell.x) }}
      </div>
      <div v-if="yTitle">
        <b>{{ yTitle }}:</b> {{ tick(hover.cell.y) }}
      </div>
      <div>
        <b>{{ valueTitle }}:</b> {{ Math.round(hover.cell.value) }}
      </div>
    </div>
  </div>
</template>

<script>
  import {
    interpolateYlOrRd,
    scaleLinear,
    scaleSequential,
    scaleSequentialSymlog,
    scaleSymlog,
  } from 'd3';

  let instances = 0;

  /**
   * Heatmap
   *
   * A grid of colored squares with x/y tick labels, axis titles, an optional
   * legend and a hover tooltip. Nothing else.
   *
   * `data` is a flat list of cells: [{ x, y, value }]. x and y may be numbers
   * or numeric strings; they are sorted numerically to form the axes and
   * printed with three significant digits. A plot with a single y value and
   * no `yTitle` renders as a one-row strip without a y axis.
   */
  export default {
    name: 'Heatmap',
    props: {
      data: { type: Array, required: true },
      xTitle: { type: String, required: true },
      yTitle: { type: String, default: '' },
      // Label for the color scale, used in the legend and the tooltip
      valueTitle: { type: String, default: 'Value' },
      // Color domain [min, max]; pass the same one to several heatmaps to
      // share a scale. Defaults to [0, max of the data].
      domain: { type: Array, default: null },
      title: { type: String, default: '' },
      legend: { type: Boolean, default: false },
      // Symlog color scale: like log, but zero is allowed. Use when most values
      // are small and a linear scale would wash them out.
      log: { type: Boolean, default: false },
      // Cell size in SVG units
      size: { type: Number, default: 40 },
    },
    data() {
      return { hover: null, gradientId: `heatmap-gradient-${++instances}` };
    },
    computed: {
      xDomain() {
        return [...new Set(this.data.map((d) => d.x))].sort((a, b) => a - b);
      },
      yDomain() {
        return [...new Set(this.data.map((d) => d.y))].sort((a, b) => a - b);
      },
      cells() {
        // Rows are drawn top-down, so the largest y sits in row 0
        return this.data.map((d) => ({
          ...d,
          key: `${d.x}-${d.y}`,
          col: this.xDomain.indexOf(d.x),
          row: this.yDomain.length - 1 - this.yDomain.indexOf(d.y),
        }));
      },
      colorDomain() {
        return this.domain || [0, Math.max(...this.data.map((d) => d.value))];
      },
      color() {
        const scale = this.log
          ? scaleSequentialSymlog(interpolateYlOrRd)
          : scaleSequential(interpolateYlOrRd);
        return scale.domain(this.colorDomain);
      },
      // Value to position along the legend bar, on the same curve as `color`
      legendScale() {
        const scale = this.log ? scaleSymlog() : scaleLinear();
        return scale.domain(this.colorDomain).range([0, this.plotWidth]);
      },
      margin() {
        return {
          top: 4,
          right: 8,
          bottom: 40 + (this.legend ? 52 : 0),
          left: this.yTitle ? 64 : 8,
        };
      },
      plotWidth() {
        return this.xDomain.length * this.size;
      },
      plotHeight() {
        return this.yDomain.length * this.size;
      },
      width() {
        return this.margin.left + this.plotWidth + this.margin.right;
      },
      height() {
        return this.margin.top + this.plotHeight + this.margin.bottom;
      },
      gradientStops() {
        return Array.from({ length: 11 }, (_, i) => i / 10);
      },
      legendTicks() {
        if (!this.log) return this.legendScale.ticks(4);
        // Powers of ten between the domain ends, plus the ends themselves.
        // A power of ten that would collide with the end label is dropped.
        const [d0, d1] = this.colorDomain;
        const minGap = 28;
        const ticks = [d0];
        for (let p = 1; p < d1; p *= 10) {
          if (this.legendScale(d1) - this.legendScale(p) >= minGap) ticks.push(p);
        }
        ticks.push(d1);
        return [...new Set(ticks)];
      },
    },
    methods: {
      tick(v) {
        return Number.isFinite(+v) ? String(parseFloat((+v).toPrecision(3))) : v;
      },
      legendX(v) {
        return this.legendScale(v);
      },
      // Color at a fraction t along the legend bar
      legendColor(t) {
        return this.color(this.legendScale.invert(t * this.plotWidth));
      },
      onHover(cell, event) {
        const box = this.$el.getBoundingClientRect();
        this.hover = {
          cell,
          left: `${event.clientX - box.left + 12}px`,
          top: `${event.clientY - box.top - 12}px`,
        };
      },
    },
  };
</script>

<style scoped>
  .heatmap {
    position: relative;
    display: inline-block;
    max-width: 100%;
  }
  .heatmap__title {
    margin: 0 0 4px;
  }
  .heatmap__svg {
    display: block;
    max-width: 100%;
    height: auto;
    overflow: visible;
  }
  .heatmap__tick,
  .heatmap__label {
    font-size: 11px;
    fill: currentColor;
  }
  .heatmap__label {
    font-size: 12px;
  }
  .heatmap__tooltip {
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
