<template>
  <div class="portal-section">
    <div class="portal-orb portal-orb--1" aria-hidden="true"></div>
    <div class="portal-orb portal-orb--2" aria-hidden="true"></div>

    <v-row class="d-flex align-center" :gutter="0">
      <v-col cols="12" sm="6" md="5" order="2" order-sm="1">
        <div class="portal-image-wrapper">
          <v-img eager :src="`${imgPath}${image}`" width="100%" class="portal-image"></v-img>
        </div>
      </v-col>

      <v-col cols="12" sm="6" md="6" offset-md="1" order="1" order-sm="2">
        <div class="portal-content">
          <p class="text-overline portal-overline">{{ overline }}</p>
          <h3 class="prism-text-h3 font-weight-bold portal-title">{{ title }}</h3>
          <p class="prism-text-body-1 portal-body">{{ body }}</p>

          <!-- <div class="portal-features">
            <div v-for="feature in features" :key="feature" class="portal-feature-chip">
              <v-icon size="14" class="mr-1">mdi-check-circle-outline</v-icon>{{ feature }}
            </div>
          </div> -->

          <v-btn
            :href="button.link"
            target="_blank"
            color="white"
            variant="flat"
            rounded
            class="portal-cta mt-6"
          >
            {{ button.text }}
            <v-icon end size="16">mdi-arrow-top-right</v-icon>
          </v-btn>
        </div>
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
  }

  /* Decorative background orbs */
  .portal-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  .portal-orb--1 {
    width: 480px;
    height: 480px;
    top: -160px;
    right: -120px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.07) 0%, transparent 70%);
  }
  .portal-orb--2 {
    width: 320px;
    height: 320px;
    bottom: -100px;
    left: 30%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  }

  /* Image */
  .portal-image-wrapper {
    position: relative;
  }
  .portal-image {
    border-radius: 12px;
    filter: drop-shadow(0 24px 48px rgba(0, 0, 0, 0.35));
  }

  /* Content */
  .portal-content {
    padding-left: 24px;
  }

  .portal-overline {
    letter-spacing: 0.18em;
    opacity: 0.6;
    margin-bottom: 8px;
    color: white;
  }

  .portal-title {
    color: white;
    line-height: 1.25em;
    margin-bottom: 16px;
  }

  .portal-body {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
  }

  /* Feature chips */
  .portal-features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .portal-feature-chip {
    display: inline-flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 99px;
    padding: 4px 14px 4px 10px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
  }

  /* CTA */
  .portal-cta {
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--v-primary-darken-3) !important;
  }

  @media (max-width: 600px) {
    .portal-content {
      padding-left: 0;
    }
  }
</style>
