<template>
  <div
    class="box-plot"
    @mouseleave="hover = null"
  >
    <div class="box-plot__toolbar">
      <v-autocomplete
        v-model="selected"
        :items="ids"
        :label="`Search ${idTitle.toLowerCase()}s`"
        class="box-plot__search"
        variant="underlined"
        density="compact"
        multiple
        chips
        closable-chips
        clearable
        hide-details
      />
      <v-btn
        v-if="initialSelected.length"
        size="small"
        variant="outlined"
        rounded
        @click="selected = [...initialSelected]"
      >
        {{ initialSelectedLabel }}
      </v-btn>
    </div>

    <svg
      ref="svg"
      :viewBox="`0 0 ${width} ${height}`"
      class="box-plot__svg"
    >
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

        <!-- One box per category: the points first, then whiskers, box and
             median drawn over them so the box outline stays readable -->
        <g :class="{ 'is-dimmed': selected.length }">
          <g
            v-for="box in boxes"
            :key="box.name"
            :transform="`translate(${box.x}, 0)`"
          >
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
        <text
          :x="plotWidth / 2"
          :y="plotHeight + 34"
          class="label"
          text-anchor="middle"
        >
          {{ x.title }}
        </text>
        <text
          :transform="`translate(${-margin.left + 12}, ${plotHeight / 2}) rotate(-90)`"
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
        <!-- Labels for selected ids, placed so they never overlap -->
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

    <div
      v-if="hover"
      class="box-plot__tooltip"
      :style="{ left: hover.left, top: hover.top }"
    >
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
  const LABEL_OFFSETS = [0, -12, 12, -24, 24, -36, 36];
  function placeLabels(items, bounds, gap) {
    const placed = [];
    const labels = [];
    for (const item of [...items].sort((a, b) => a.cy - b.cy)) {
      const w = String(item.text).length * LABEL_CHAR;
      let x = item.cx + gap + 3;
      let anchor = 'start';
      if (x + w > bounds.width) {
        x = item.cx - gap - 3;
        anchor = 'end';
      }
      const x0 = anchor === 'start' ? x : x - w;
      for (const dy of LABEL_OFFSETS) {
        const y = item.cy + dy;
        const box = { x0, x1: x0 + w, y0: y - LABEL_HEIGHT / 2, y1: y + LABEL_HEIGHT / 2 };
        if (box.y0 < 0 || box.y1 > bounds.height) continue;
        const clear = placed.every(
          (b) => box.x1 < b.x0 || box.x0 > b.x1 || box.y1 < b.y0 || box.y0 > b.y1,
        );
        if (clear) {
          placed.push(box);
          // A nudged label gets a connector from its point to its near edge
          const lx = anchor === 'start' ? x - 2 : x + 2;
          labels.push({
            key: item.key,
            x,
            y,
            anchor,
            text: item.text,
            connector: dy ? { x1: item.cx, y1: item.cy, x2: lx, y2: y } : null,
          });
          break;
        }
      }
    }
    return labels;
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
        return { top: 12, right: 12, bottom: 48, left: 52 };
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
    font-size: 14px;
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
