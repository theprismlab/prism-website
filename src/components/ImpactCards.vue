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
          border: `3px solid color-mix(in srgb, ${card.color} 10%, white)`,
          borderTop: `3px solid ${card.color}`,
          background: `color-mix(in srgb, ${card.color} 2%, white)`,
        }"
      >
        <div
          class="icon-badge d-flex align-center justify-center"
          :style="{ backgroundColor: card.color }"
        >
          <svg-icon :size="28" type="mdi" :path="card.icon" color="white" />
        </div>
        <div class="card-stat" :style="{ color: card.color }">{{ card.title }}</div>
        <p class="card-label">{{ card.subtitle }}</p>
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

  .card-stat {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    font-family: 'Archivo Expanded', sans-serif;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .card-label {
    font-size: 0.975rem;
    font-weight: 500;
    color: #666;
    line-height: 1.5;
    margin: 0;
  }
</style>
