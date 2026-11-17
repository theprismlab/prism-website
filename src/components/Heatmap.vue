<template>
  <div class="heatmap" @mouseleave="hover = null">
    <p v-if="title" class="heatmap__title prism-text-title-small">{{ title }}</p>

    <svg
      :viewBox="`0 0 ${width} ${height}`"
      :width="width"
      :height="height"
      class="heatmap__svg"
      :style="{ fontSize: `${tickSize}px` }"
    >
      <!-- A plot narrower than its x title (a one-cell strip) is centered under it -->
      <g :transform="`translate(${margin.left + plotOffset}, ${margin.top})`">
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
        <!-- Ticks hang diagonally from each cell's center -->
        <text
          v-for="(x, i) in xDomain"
          :key="`x-${x}`"
          :x="(i + 0.5) * size"
          :y="plotHeight + offsets.tick"
          :transform="`rotate(-45, ${(i + 0.5) * size}, ${plotHeight + offsets.tick})`"
          class="heatmap__tick"
          text-anchor="end"
        >
          {{ tick(x) }}
        </text>
        <text
          :x="plotWidth / 2"
          :y="plotHeight + xTickHeight + offsets.axisTitle"
          class="heatmap__axis-title"
          text-anchor="middle"
        >
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
          <!-- Rotated and centered on the rows; the margins grow to hold a
               title longer than the plot is tall (a one-row strip) -->
          <text
            :transform="`translate(${-margin.left + offsets.lane}, ${plotHeight / 2}) rotate(-90)`"
            class="heatmap__axis-title"
            text-anchor="middle"
          >
            {{ yTitle }}
          </text>
        </template>
      </g>
    </svg>

    <div
      v-if="tooltip && hover"
      class="heatmap__tooltip"
      :style="{ left: hover.left, top: hover.top }"
    >
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
  import { heatmapColor } from '@/utils/heatmap-color';

  // Font sizing, as in ScatterGrid and BoxPlot (see `fontSize` in the
  // component doc). The tick size is the one size everything else follows:
  // titles are TITLE_EM of it, and every text offset below is written for a
  // 12px tick and multiplied by the font scale `k = tick size / 12`.
  const FONT_SIZES = { small: 10, medium: 12, large: 14 };
  const TITLE_EM = 7 / 6; // matches .heatmap__axis-title in the styles
  // Rough width of text at a font size, in the units of the size: narrow
  // glyphs, then capitals, digits and wide letters, then everything else
  const textWidth = (text, size) =>
    size *
    [...String(text)].reduce(
      (w, ch) =>
        w + (/[iljtfrI .,:;'|()[\]-]/.test(ch) ? 0.28 : /[A-Z0-9mw]/.test(ch) ? 0.69 : 0.56),
      0,
    );

  /**
   * Heatmap
   *
   * A grid of colored squares with x/y tick labels, axis titles and an
   * optional hover tooltip (`tooltip`, off by default). Nothing else: the
   * color scale is drawn by <heatmap-legend>, given the same `domain` and `log`.
   *
   * `data` is a flat list of cells: [{ x, y, value }]. x and y may be numbers
   * or numeric strings; they are sorted numerically to form the axes and
   * printed with three significant digits. A plot with a single y value and
   * no `yTitle` renders as a one-row strip without a y axis.
   *
   * `fontSize` is 'small' | 'medium' (default) | 'large' (ticks of 10, 12 or
   * 14px, as in prism-charts) or a tick size in px. Axis titles are 7/6 of
   * the tick size, and the margins and text positions grow with it. The SVG
   * is drawn at its own size, so these are real pixels unless the container
   * is narrower than the plot. Give <heatmap-legend> the same `fontSize`.
   */
  export default {
    name: 'Heatmap',
    props: {
      data: { type: Array, required: true },
      xTitle: { type: String, required: true },
      yTitle: { type: String, default: '' },
      // Label for the cell value in the tooltip
      valueTitle: { type: String, default: 'Value' },
      // Color domain [min, max]; pass the same one to several heatmaps to
      // share a scale. Defaults to [0, max of the data].
      domain: { type: Array, default: null },
      title: { type: String, default: '' },
      // Symlog color scale: like log, but zero is allowed. Use when most values
      // are small and a linear scale would wash them out.
      log: { type: Boolean, default: false },
      // Cell size in SVG units
      size: { type: Number, default: 40 },
      // Show the cell's doses and value in a tooltip on hover
      tooltip: { type: Boolean, default: false },
      fontSize: {
        type: [String, Number],
        default: 'medium',
        validator: (v) => typeof v === 'number' || v in FONT_SIZES,
      },
    },
    data() {
      return { hover: null };
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
        return heatmapColor(this.colorDomain, this.log);
      },
      tickSize() {
        return typeof this.fontSize === 'number' ? this.fontSize : FONT_SIZES[this.fontSize];
      },
      // Font scale: text offsets are written for a 12px tick
      fontScale() {
        return this.tickSize / 12;
      },
      // Where text sits, in SVG units
      offsets() {
        const k = this.fontScale;
        return {
          lane: 14 * k, // the rotated y title's baseline in from the left edge
          tick: 10 * k, // x tick anchor below the plot
          axisTitle: 16 * k, // x title baseline below the x ticks
        };
      },
      // Approximate widths of the widest tick labels, to size the margins
      tickWidth() {
        return Math.max(...this.yDomain.map((y) => textWidth(this.tick(y), this.tickSize)));
      },
      xTickWidth() {
        return Math.max(...this.xDomain.map((x) => textWidth(this.tick(x), this.tickSize)));
      },
      // Vertical room taken by the 45° x ticks, plus the gap to the x title
      xTickHeight() {
        return this.xTickWidth * 0.71 + this.offsets.tick;
      },
      // How far the rotated y title reaches above and below the plot when it
      // is longer than the plot is tall
      yTitleOverflow() {
        if (!this.yTitle) return 0;
        const length = textWidth(this.yTitle, this.tickSize * TITLE_EM);
        return Math.max(0, (length - this.plotHeight) / 2);
      },
      margin() {
        const k = this.fontScale;
        // The first x tick hangs down-left past the plot's left edge
        const overhang = this.xTickWidth * 0.71 - this.size / 2;
        let left = Math.max(8, overhang + 4);
        if (this.yTitle) {
          // The tick labels and the 6 units between them and the plot, plus a
          // lane for the rotated title. A title that reaches below the plot
          // also stays left of the hanging x tick.
          const lane = 26 * k;
          left = Math.max(left, this.tickWidth + 6 + lane);
          if (this.yTitleOverflow) left = Math.max(left, overhang + 4 + lane);
        }
        return {
          top: Math.max(4, this.yTitleOverflow + 4),
          right: 8,
          bottom: Math.max(this.xTickHeight + 25 * k, this.yTitleOverflow + 4),
          left,
        };
      },
      plotWidth() {
        return this.xDomain.length * this.size;
      },
      plotHeight() {
        return this.yDomain.length * this.size;
      },
      // Approximate title widths, so the SVG grows to fit a title wider than
      // the plot instead of clipping it
      xTitleWidth() {
        return textWidth(this.xTitle, this.tickSize * TITLE_EM);
      },
      contentWidth() {
        return Math.max(this.plotWidth, this.xTitleWidth);
      },
      // Shift that centers the plot within the content width
      plotOffset() {
        return (this.contentWidth - this.plotWidth) / 2;
      },
      width() {
        return this.margin.left + this.contentWidth + this.margin.right;
      },
      height() {
        return this.margin.top + this.plotHeight + this.margin.bottom;
      },
    },
    methods: {
      tick(v) {
        return Number.isFinite(+v) ? String(parseFloat((+v).toPrecision(3))) : v;
      },
      onHover(cell, event) {
        if (!this.tooltip) return;
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
  /* Text sizes are relative to the svg's font size, which is the tick size
     set from the fontSize prop. Ticks inherit it as is. */
  .heatmap__tick,
  .heatmap__axis-title {
    fill: currentColor;
  }
  /* TITLE_EM in the script */
  .heatmap__axis-title {
    font-size: calc(7em / 6);
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
