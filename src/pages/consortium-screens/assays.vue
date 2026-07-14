<template>
  <page>
    <app-container narrow>
      <prism-page-title>Assays</prism-page-title>
      <p class="prism-text-body-large mb-8">
        Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures
        in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality
        data, validation compounds are run on each assay plate.
      </p>
      <v-expansion-panels variant="accordion" flat>
        <v-expansion-panel v-for="item in items" :key="item.id">
          <v-expansion-panel-title>
            <img
              :src="imgPath + 'Thumbnail_' + item.screen + '.svg'"
              :alt="item.screen + ' thumbnail'"
              class="assay-avatar"
            />
            <div class="assay-header">
              <h2 class="prism-text-headline-xs">{{ item.screen }} - {{ item.screen_full }}</h2>
              <h3 class="prism-text-body-large text-medium-emphasis">{{ item.test_agents }}</h3>
            </div>

            <div class="time-point eyebrow">{{ item.time_point }}</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="my-5">
            <div class="mb-6">
              <!-- <h5 class="header eyebrow">{{ item.screen }} Workflow</h5> -->
              <h5 class="prism-text-title-medium panel-section-title">
                {{ item.screen }} Workflow
              </h5>
              <v-img :src="imgPath + item.image" class="assay-workflow-img my-4" />
              <p class="prism-text-body-large" v-html="item.description"></p>
            </div>

            <v-row>
              <v-col cols="12" sm="6">
                <h5 class="prism-text-title-medium panel-section-title">Dose Scheme</h5>
                <!-- <h5 class="header eyebrow">Dose Scheme</h5> -->
                <div class="prism-text-body-medium" v-html="item.dose_scheme"></div>
              </v-col>
              <v-col cols="12" sm="6">
                <h5 class="prism-text-title-medium panel-section-title">Cell Lines</h5>
                <!-- <h5 class="header eyebrow">Cell Lines</h5> -->
                <div class="prism-text-body-medium">{{ item.num_cell_lines }}</div>
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
        items: ASSAYS,
      };
    },
    computed: {
      imgPath() {
        return assetUrl('assay/');
      },
    },
  };
</script>

<style scoped>
  .v-expansion-panel {
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    margin: 8px 0;
    border-radius: 8px;
  }

  .v-expansion-panel-title.v-expansion-panel-title--active {
    background-color: rgba(var(--v-theme-on-surface), 0.03);
  }
  .panel-section-title {
    border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.5);
    margin-bottom: 1em;
  }
  /* .panel-section-title {
    border-left: 6px solid var(--prism-color-blue-lighten-2);
    padding-left: 0.5em;
    line-height: 1;
    margin-bottom: 1em;
  } */

  .eyebrow {
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .header.eyebrow {
    color: var(--prism-color-blue-darken-3);
  }
  .time-point.eyebrow {
    color: var(--prism-color-amber-darken-2);
  }
  .assay-avatar {
    width: 64px;
    height: 64px;
    object-fit: contain;
    flex: 0 0 64px;
    padding: 12px;
  }
  .time-point {
    padding-right: 14px;
  }
  .assay-header {
    flex: 1 1 0;
    padding-right: 24px;
  }

  .assay-workflow-img {
    border-radius: 12px;
    /* border: 1px solid rgba(var(--v-theme-on-surface), 0.08); */
    overflow: hidden;
  }
</style>
