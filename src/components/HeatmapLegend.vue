<template>
  <div class="heatmap-legend" :style="{ fontSize: `${tickSize}px` }">
    <span v-if="title" class="heatmap-legend__title">{{ title }}</span>
    <svg
      :viewBox="`0 0 ${width + 2 * pad} ${height}`"
      :width="width + 2 * pad"
      :height="height"
      class="heatmap-legend__svg"
      role="img"
      :aria-label="`${title || 'Color scale'}: ${domain[0]} to ${domain[1]}`"
    >
      <defs>
        <linearGradient :id="gradientId">
          <stop
            v-for="t in gradientStops"
            :key="t"
            :offset="`${t * 100}%`"
            :stop-color="color(scale.invert(t * width))"
          />
        </linearGradient>
      </defs>
      <g :transform="`translate(${pad}, 0)`">
        <rect :width="width" height="8" :fill="`url(#${gradientId})`" />
        <text
          v-for="v in ticks"
          :key="v"
          :x="scale(v)"
          :y="tickY"
          class="heatmap-legend__tick"
          text-anchor="middle"
        >
          {{ v }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
  import { scaleLinear, scaleSymlog } from 'd3';
  import { heatmapColor } from '@/utils/heatmap-color';

  // Tick font size in px for each `fontSize` preset, as on Heatmap
  const FONT_SIZES = { small: 10, medium: 12, large: 14 };
  const BAR = 8; // gradient bar height, as drawn in the template

  let instances = 0;

  /**
   * HeatmapLegend
   *
   * The color scale of one or more <heatmap>s: a title beside a gradient bar
   * with tick labels. Pass the same `domain` and `log` as the heatmaps it
   * describes, and the same `fontSize`: the ticks are that size and the title
   * 7/6 of it, as on Heatmap.
   */
  export default {
    name: 'HeatmapLegend',
    props: {
      // Color domain [min, max]
      domain: { type: Array, required: true },
      title: { type: String, default: '' },
      // Symlog scale, as on Heatmap
      log: { type: Boolean, default: false },
      // Length of the gradient bar in px
      width: { type: Number, default: 140 },
      fontSize: {
        type: [String, Number],
        default: 'medium',
        validator: (v) => typeof v === 'number' || v in FONT_SIZES,
      },
    },
    data() {
      return { gradientId: `heatmap-legend-gradient-${++instances}` };
    },
    computed: {
      tickSize() {
        return typeof this.fontSize === 'number' ? this.fontSize : FONT_SIZES[this.fontSize];
      },
      // Room either side of the bar for the end tick labels
      pad() {
        return this.tickSize;
      },
      // Tick baseline, one line below the bar, and the height that holds it
      tickY() {
        return BAR + this.tickSize;
      },
      height() {
        return this.tickY + this.tickSize / 3;
      },
      color() {
        return heatmapColor(this.domain, this.log);
      },
      // Value to position along the bar, on the same curve as `color`
      scale() {
        const scale = this.log ? scaleSymlog() : scaleLinear();
        return scale.domain(this.domain).range([0, this.width]);
      },
      gradientStops() {
        return Array.from({ length: 11 }, (_, i) => i / 10);
      },
      ticks() {
        if (!this.log) return this.scale.ticks(4);
        // Powers of ten between the domain ends, plus the ends themselves.
        // A power of ten that would collide with the end label is dropped.
        const [d0, d1] = this.domain;
        const minGap = this.tickSize * 2.8;
        const ticks = [d0];
        for (let p = 1; p < d1; p *= 10) {
          if (this.scale(d1) - this.scale(p) >= minGap) ticks.push(p);
        }
        ticks.push(d1);
        return [...new Set(ticks)];
      },
    },
  };
</script>

<style scoped>
  .heatmap-legend {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 8px;
  }
  /* Sizes are relative to the root's font size, the tick size set from the
     fontSize prop; the title is 7/6 of it, as the axis titles in Heatmap */
  .heatmap-legend__title {
    font-size: calc(7em / 6);
    line-height: 1.3;
  }
  .heatmap-legend__svg {
    display: block;
    flex: none;
  }
  .heatmap-legend__tick {
    fill: currentColor;
  }
</style>
