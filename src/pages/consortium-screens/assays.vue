<template>
  <page>
    <app-container narrow>
      <prism-page-title>Assays</prism-page-title>
      <p class="prism-text-body-large">
        Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures
        in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality
        data, validation compounds are run on each assay plate.
      </p>
    </app-container>
    <app-container>
      <v-expansion-panels flat>
        <v-expansion-panel
          v-for="item in table.items"
          :key="item.id"
          class="assay-panel"
        >
          <v-expansion-panel-title>
            <v-row class="assay-panel__title" align="center" justify="start">
              <img
                :src="imgPath + 'Thumbnail_' + item.screen + '.svg'"
                :alt="item.screen + ' thumbnail'"
                class="assay-avatar"
              />
              <div class="assay-header">
                <div class="prism-text-title-large">{{ item.screen }} - {{ item.screen_full }}</div>
                <div class="prism-text-body-large text-grey-darken-1">{{ item.test_agents }}</div>
              </div>
              <div class="assay-time-point">{{ item.time_point }}</div>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row class="assay-panel__content" align="start" justify="space-around">
              <v-col cols="12" md="10">
                <h4 class="prism-text-headline-xs mb-2">{{ item.screen }} Workflow</h4>
              </v-col>
              <div class="media">
                <img :src="imgPath + item.image" class="media__img" />
              </div>
              <v-col cols="12" md="10">
                <h4 class="prism-text-headline-xs mb-2">Details</h4>
                <p class="prism-text-body-large" v-html="item.description"></p>
              </v-col>
            </v-row>

            <v-row class="assay-panel__content" align="start" justify="space-around">
              <v-col cols="12" md="10">
                <v-row justify="start">
                  <v-col cols="auto" md="6">
                    <h5 class="prism-text-overline prism-font-weight-semibold"">Dose scheme</h5>
                    <div class="prism-text-body-large" v-html="item.dose_scheme"></div>
                  </v-col>
                  <v-col cols="auto">
                    <h5 class="prism-text-overline prism-font-weight-semibold">Cell lines</h5>
                    <div class="prism-text-body-large">{{ item.num_cell_lines }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </app-container>
  </page>
</template>
<script>
  import { assetUrl } from '@/utils/assets';
  import { ASSAYS } from '@/utils/assays';

  export default {
    name: 'Assays',
    data() {
      return {
        table: {
          // groupBy:  [{ key: 'screen', order: 'asc' }],
          headers: [
            { title: 'Screen', key: 'screen', width: '10%', minWidth: '100px' },
            { title: 'Test Agents', key: 'test_agents', width: '30%', minWidth: '200px' },
            { title: 'Dose Scheme', key: 'dose_scheme', width: '30%', minWidth: '100px' },
            { title: 'Time-Point', key: 'time_point', width: '15%', minWidth: '100px' },
            { title: '# of Cell Lines', key: 'num_cell_lines', width: '15%', minWidth: '100px' },
          ],
          items: [
            {
              id: 'MTS',
              ...ASSAYS.MTS,
            },
            {
              id: 'CPS',
              ...ASSAYS.CPS,
            },
            {
              id: 'APS',
              ...ASSAYS.APS,
            },
            {
              id: 'AIR',
              ...ASSAYS.AIR,
            },
            {
              id: 'EPS',
              ...ASSAYS.EPS,
            },
          ],
        },
      };
    },
    mounted() {},
    computed: {
      imgPath() {
        return assetUrl('assay/');
      },
    },
    watch: {},
    methods: {},
  };
</script>

<style scoped>

  .v-expansion-panel {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-top:6px;
  }

  .v-expansion-panel.v-expansion-panel--active {
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }

  .assay-panel__content,
  .assay-panel__title {
    padding: 12px;
  }

  .assay-avatar {
    width: 64px;
    height: 64px;
    object-fit: contain;
    padding: 12px;
  }

  .assay-time-point {
    color: var(--prism-color-blue-lighten-2);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding-right:6px;
  }

  .media-title {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 10px;
  }
  .media {
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    overflow: hidden;
  }

  .media__img {
    height: auto;
    width: 100%;
    display: block;
  }

  /* Fixed size — won't grow or shrink */
  .assay-avatar {
    flex: 0 0 64px; /* flex-grow: 0, flex-shrink: 0, flex-basis: 64px */
  }

  /* Fills remaining space */
  .assay-header {
    flex: 1 1 0; /* grows to fill, shrinks if needed */
    min-width: 0; /* allows text truncation */
  }

  /* Fixed size, won't shrink */
  .assay-time-point {
    flex: 0 0 67px; /* grows to fill, shrinks if needed */
    min-width: 0;
    text-align: right;
  }
  @media (max-width: 960px) {
  }
  @media (max-width: 600px) {
  }
</style>
