<template>
  <v-row>
    <!-- Figure A: cell lines per lineage -->
    <v-col cols="12" md="6">
      <v-card class="figure-card fill-height" elevation="0">
        <div class="figure-label">Figure A</div>
        <h3 class="prism-text-title-large mb-1">Cell lines by lineage</h3>
        <p class="prism-text-body-medium text-medium-emphasis mb-6">
          Select a lineage to see its subtype composition.
        </p>

        <button
          v-for="lineage in sortedLineages"
          :key="lineage.name"
          type="button"
          class="bar-row"
          :class="{ 'bar-row--active': lineage.name === selected }"
          :aria-pressed="lineage.name === selected"
          @click="selected = lineage.name"
        >
          <span class="bar-name">{{ lineage.name }}</span>
          <span class="bar-track">
            <span
              class="bar-fill"
              :style="{
                width: `${(lineageTotal(lineage) / maxLineageTotal) * 100}%`,
                backgroundColor: lineage.color,
              }"
            ></span>
          </span>
          <span class="bar-value">{{ lineageTotal(lineage) }}</span>
        </button>
      </v-card>
    </v-col>

    <!-- Figure B: subtypes within the selected lineage -->
    <v-col cols="12" md="6">
      <v-card class="figure-card fill-height" elevation="0">
        <div class="figure-label">Figure B</div>
        <h3 class="prism-text-title-large mb-1">{{ selected }} subtypes</h3>
        <p class="prism-text-body-medium text-medium-emphasis mb-6">
          {{ lineageTotal(selectedLineage) }} cell lines across
          {{ selectedLineage.subtypes.length }} subtypes
        </p>

        <div class="stacked-bar mb-6" role="img" :aria-label="`${selected} subtype proportions`">
          <span
            v-for="(subtype, i) in selectedLineage.subtypes"
            :key="subtype.name"
            class="stacked-segment"
            :style="{
              width: `${(subtype.count / lineageTotal(selectedLineage)) * 100}%`,
              backgroundColor: selectedLineage.color,
              opacity: 1 - i * (0.6 / selectedLineage.subtypes.length),
            }"
          ></span>
        </div>

        <div v-for="(subtype, i) in selectedLineage.subtypes" :key="subtype.name" class="legend-row">
          <span
            class="legend-swatch"
            :style="{
              backgroundColor: selectedLineage.color,
              opacity: 1 - i * (0.6 / selectedLineage.subtypes.length),
            }"
          ></span>
          <span class="legend-name">{{ subtype.name }}</span>
          <span class="legend-value">
            {{ subtype.count }}
            <span class="text-medium-emphasis">
              ({{ Math.round((subtype.count / lineageTotal(selectedLineage)) * 100) }}%)
            </span>
          </span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'SubtypeBreakdown',
    props: {
      // [{ name, color, subtypes: [{ name, count }] }]
      lineages: { type: Array, required: true },
    },
    data() {
      return {
        selected: null,
      };
    },
    computed: {
      sortedLineages() {
        return [...this.lineages].sort((a, b) => this.lineageTotal(b) - this.lineageTotal(a));
      },
      maxLineageTotal() {
        return Math.max(...this.lineages.map(this.lineageTotal));
      },
      selectedLineage() {
        return this.lineages.find((l) => l.name === this.selected) || this.sortedLineages[0];
      },
    },
    created() {
      this.selected = this.sortedLineages[0]?.name ?? null;
    },
    methods: {
      lineageTotal(lineage) {
        return lineage.subtypes.reduce((sum, s) => sum + s.count, 0);
      },
    },
  };
</script>

<style scoped>
  .figure-card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 28px 32px;
  }

  .figure-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--v-grey-darken-1);
    margin-bottom: 4px;
  }

  .bar-row {
    display: grid;
    grid-template-columns: 130px 1fr 40px;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 6px 8px;
    border-radius: 6px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .bar-row:hover,
  .bar-row--active {
    background-color: #f5f5f5;
  }

  .bar-row--active .bar-name {
    font-weight: 700;
  }

  .bar-name,
  .legend-name {
    font-size: 0.9rem;
    color: var(--v-grey-darken-3);
  }

  .bar-track {
    height: 14px;
    background: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-fill {
    display: block;
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s;
  }

  .bar-value,
  .legend-value {
    font-size: 0.9rem;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  .stacked-bar {
    display: flex;
    height: 28px;
    border-radius: 6px;
    overflow: hidden;
    gap: 2px;
  }

  .stacked-segment {
    height: 100%;
  }

  .legend-row {
    display: grid;
    grid-template-columns: 14px 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
  }

  /* xs */
  @media (max-width: 600px) {
    .figure-card {
      padding: 20px 16px;
    }
    .bar-row {
      grid-template-columns: 100px 1fr 32px;
      gap: 8px;
    }
  }
</style>
