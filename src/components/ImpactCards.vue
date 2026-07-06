<template>
  <v-row>
    <v-col
      v-for="(card, index) in cards"
      :key="card.title"
      cols="12"
      :sm="smCols"
      :md="mdCols"
      :lg="mdCols"
      :xl="mdCols"
    >
      <v-card
        class="impact-card fill-height d-flex flex-column align-center text-center"
        :elevation="0"
        :style="{
          borderTop: `3px solid ${card.color}`,
          background: `color-mix(in srgb, ${card.color} 5%, white)`,
        }"
      >
        <div
          class="icon-badge d-flex align-center justify-center"
          :style="{ backgroundColor: card.color }"
        >
          <svg-icon :size="28" type="mdi" :path="card.icon" color="white" />
        </div>
        <h4 class="prism-text-display-large card-title" :style="{ color: card.color }">
          {{ card.title }}
        </h4>
        <p class="prism-text-body-xlarge text-grey-darken-1 card-subtitle">
          {{ card.subtitle }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';

  export default {
    name: 'ImpactCards',
    components: { SvgIcon },
    props: {
      cards: { type: Array, required: true },
    },
    computed: {
      mdCols() {
        return Math.floor(12 / this.cards.length);
      },
      smCols() {
        return this.cards.length >= 4 ? 6 : Math.floor(12 / this.cards.length);
      },
    },
  };
</script>

<style scoped>
  .impact-card {
    border-radius: 16px;
    padding: 36px 28px 32px;
    gap: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  }

  .icon-badge {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    flex-shrink: 0;
  }
  .card-title {
    font-weight: 600;
    font-variation-settings: 'wdth' 120;
    line-height: 1em;
    margin: 0;
  }
  .card-subtitle {
    font-weight: 500;
    line-height: 1.5rem;
    margin: 0;
  }
</style>
