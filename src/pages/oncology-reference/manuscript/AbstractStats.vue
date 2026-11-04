<template>
  <ul class="abstract-stats">
    <li v-for="stat in stats" :key="stat.label" class="abstract-stat">
      <span class="abstract-stat__icon" aria-hidden="true">
        <v-icon :icon="stat.icon" size="18" />
      </span>
      <div class="abstract-stat__value">{{ formatValue(stat.value) }}</div>
      <div class="abstract-stat__label">{{ stat.label }}</div>
      <p v-if="stat.detail" class="abstract-stat__detail">{{ stat.detail }}</p>
    </li>
  </ul>
</template>

<script>
  /**
   * AbstractStats
   *
   * Headline figures from the manuscript abstract, as a row of quiet cards
   * designed to sit on the page header's gradient. The number is the chart:
   * large proportional figures in the body sans, ink-colored, with a tinted
   * icon as the only accent.
   *
   * Props: stats — [{ value, label, icon, detail? }]
   */
  export default {
    name: 'AbstractStats',
    props: {
      stats: { type: Array, required: true },
    },
    methods: {
      formatValue(value) {
        return typeof value === 'number' ? value.toLocaleString('en-US') : value;
      },
    },
  };
</script>

<style scoped>
  .abstract-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Frosted surface so the header gradient shows through faintly */
  .abstract-stat {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px 22px 18px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    border-radius: var(--prism-radius-lg);
    background: rgba(255, 255, 255, 0.72);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  }

  .abstract-stat__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
    border-radius: 10px;
    background: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));
  }

  /* Hero figure: same sans as the page, proportional (not tabular) digits */
  .abstract-stat__value {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: proportional-nums;
    color: rgb(var(--v-theme-on-surface));
  }

  .abstract-stat__label {
    margin-top: 8px;
    font-size: 0.9375rem;
    font-weight: 600;
    line-height: 1.3;
    color: rgb(var(--v-theme-on-surface));
  }

  .abstract-stat__detail {
    margin: 4px 0 0;
    font-size: 0.8125rem;
    line-height: 1.45;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }

  @media (max-width: 600px) {
    .abstract-stat {
      padding: 16px 18px 14px;
    }
    .abstract-stat__value {
      font-size: 2.125rem;
    }
  }
</style>
