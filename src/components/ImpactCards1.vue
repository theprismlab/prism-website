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
        class="impact-card fill-height d-flex flex-column align-center justify-center text-center"
        :elevation="0"
        flat
        :style="{ border: `1px solid ${card.color}` }"
      >
        <div
          :id="`icon-circle-${index}`"
          class="icon-circle d-flex align-center justify-center"
          :style="{ backgroundColor: card.color }"
        >
          <svg-icon :size="iconSize" type="mdi" :path="card.icon" color="white" />
        </div>
        <h2 class="text-h2 font-weight-light card-title">{{ card.title }}</h2>
        <p class="text-h4 font-weight-normal text-grey-darken-1 card-subtitle">
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
      cards: {
        type: Array,
        required: true,
      },
    },
    data() {
      return { iconSize: 54 };
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
    border-radius: 14px;
    padding: 32px 24px;
    gap: 16px;
  }

  .icon-circle {
    width: 54px;
    height: 54px;
    padding: 13.5px;
    border-radius: 50%;
  }

  .card-title {
    margin: 0;
    line-height: 1.2em !important;
  }

  .card-subtitle {
    margin: 0;
    opacity: 1;
    line-height: 1.4em !important;
    font-size: 1.12rem !important;
    font-weight: 600 !important;
    color: var(--v-grey) !important;
  }
</style>
