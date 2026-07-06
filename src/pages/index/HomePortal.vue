<template>
  <div class="portal-section">
    <v-row class="d-flex align-center" :gutter="0">
      <v-col cols="12" sm="6" md="5" order="2" order-sm="1">
        <div class="portal-image-wrapper">
          <v-img eager :src="`${imgPath}${image}`" width="100%" class="portal-image"></v-img>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="6" offset-md="1" order="1" order-sm="2">
        <p class="prism-text-overline prism-text-fade">{{ overline }}</p>
        <h3 class="prism-text-display-small">{{ title }}</h3>
        <p class="prism-text-body-xlarge my-4 prism-text-fade">{{ body }}</p>
        <v-btn :href="button.link" target="_blank" variant="outlined" size="large" rounded>
          {{ button.text }}
          <v-icon end size="16">mdi-arrow-top-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';

  export default {
    name: 'HomePortal',
    data() {
      return {
        overline: 'PRISM Portal',
        title: 'Explore and discover',
        // body: 'Securely browse and discover insights from your screening results with interactive visualizations and integrated genomic context.',
        body: 'Securely browse and discover insights from your screening results with interactive visualizations.',
        button: {
          text: 'Explore the PRISM portal',
          link: 'https://theprismlab.org/portal/projects',
        },
        image: 'macbook-portal.png',
        features: ['Interactive visualizations', 'Secure access', 'Feature correlations'],
      };
    },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
    },
  };
</script>

<style scoped lang="scss">
  .portal-section {
    position: relative;
    overflow: hidden;
  }

  /* Image */
  .portal-image-wrapper {
    position: relative;
  }

  /* Content */
  .portal-title {
    color: white;
    line-height: 1.25em;
    margin-bottom: 16px;
  }
  .prism-text-fade {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    .portal-content {
      padding-left: 0;
    }
  }
  .v-btn {
    text-transform: none;
  }
</style>
