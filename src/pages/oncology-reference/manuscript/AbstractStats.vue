<template>
  <ul class="abstract-stats">
    <li
      v-for="(stat, i) in stats"
      :key="stat.label"
      :class="['abstract-stat', { 'abstract-stat--step': sequence }]"
    >
      <span class="abstract-stat__icon" aria-hidden="true">
        <v-icon :icon="stat.icon" size="22" />
      </span>
      <div class="abstract-stat__body">
        <span v-if="sequence" class="abstract-stat__step">
          {{ String(i + 1).padStart(2, '0')
          }}<template v-if="stat.step"> · {{ stat.step }}</template>
        </span>
        <div class="abstract-stat__headline">
          <span v-if="hasValue(stat)" class="abstract-stat__value">
            {{ formatValue(stat.value) }}
          </span>
          <span class="abstract-stat__label">{{ stat.label }}</span>
        </div>
        <p v-if="stat.detail" class="abstract-stat__detail">{{ stat.detail }}</p>
      </div>
      <!-- Bridges the gap to the next card so the row reads left to right -->
      <v-icon
        v-if="sequence"
        icon="mdi-chevron-right"
        size="16"
        class="abstract-stat__connector"
        aria-hidden="true"
      />
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
   * Props:
   *   stats    — [{ value?, label, icon, detail?, step? }]. Leave `value` out for
   *              a text-only tile; the label then takes the headline slot.
   *   sequence — number the tiles (01, 02, …) with an optional `step` word after
   *              the number, and draw a chevron between cards so the row reads
   *              as an ordered story.
   */
  export default {
    name: 'AbstractStats',
    props: {
      stats: { type: Array, required: true },
      sequence: { type: Boolean, default: false },
    },
    methods: {
      hasValue(stat) {
        return stat.value !== undefined && stat.value !== null && stat.value !== '';
      },
      formatValue(value) {
        return typeof value === 'number' ? value.toLocaleString('en-US') : value;
      },
    },
  };
</script>

<style scoped>
  .abstract-stats {
    display: grid;
    /* 160px lets four cards share one row inside the 780px narrow container */
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* Compact horizontal card: icon at left, figure + label on one line, detail
     beneath. Frosted so the header gradient shows through faintly. */
  .abstract-stat {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    border-radius: var(--prism-radius-lg);
    background: rgba(255, 255, 255, 0.72);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  }

  .abstract-stat__icon {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));
  }

  .abstract-stat__body {
    min-width: 0;
  }

  /* Figure on its own line, label beneath */
  .abstract-stat__headline {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  /* Hero figure: same sans as the page, proportional (not tabular) digits */
  .abstract-stat__value {
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    font-variant-numeric: proportional-nums;
    color: rgb(var(--v-theme-on-surface));
  }

  .abstract-stat__label {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.3;
    color: rgb(var(--v-theme-on-surface));
  }

  .abstract-stat__detail {
    margin: 2px 0 0;
    font-size: 0.75rem;
    line-height: 1.4;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }

  /* ---- Sequence mode ----------------------------------------------------- */
  .abstract-stat--step {
    position: relative;
  }
  .abstract-stat__step {
    display: block;
    margin-bottom: 4px;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgb(var(--v-theme-primary));
  }
  /* Centered in the 12px grid gap: 20px wide, so its right edge sits 16px out */
  .abstract-stat__connector {
    position: absolute;
    top: 50%;
    right: -16px;
    z-index: 1;
    width: 20px;
    height: 20px;
    transform: translateY(-50%);
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    border-radius: 50%;
    background: #fff;
    color: rgba(var(--v-theme-on-surface), 0.5);
  }
  .abstract-stat--step:last-child .abstract-stat__connector {
    display: none;
  }
  @media (max-width: 600px) {
    /* Cards stack here, so a sideways arrow would point at nothing */
    .abstract-stat__connector {
      display: none;
    }
  }
</style>
