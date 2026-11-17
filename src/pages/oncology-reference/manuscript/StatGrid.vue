<template>
  <div class="stat-grid" :style="{ '--stat-min-width': `${minWidth}px` }">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="stat"
      :style="{ '--stat-color': stat.color }"
    >
      <div class="stat-value">{{ stat.value }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StatGrid',
    props: {
      // [{ value, label, color? }] — tiles without a color render in grey
      stats: { type: Array, required: true },
      // Minimum tile width before the grid wraps to a new row
      minWidth: { type: Number, default: 150 },
    },
  };
</script>

<style scoped>
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--stat-min-width), 1fr));
    gap: 16px;
  }

  .stat {
    /* --stat-color is set per tile from stat.color; unset falls back to grey */
    --tile-color: var(--stat-color, var(--v-grey-darken-1));
    border-top: 3px solid var(--tile-color);
    background: color-mix(in srgb, var(--tile-color) 5%, white);
    border-radius: 12px;
    padding: 20px 20px 18px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
    color: var(--tile-color);
  }

  .stat-label {
    margin-top: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--v-grey-darken-1);
  }
</style>
