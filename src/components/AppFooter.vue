<template>
  <v-footer class="app-footer">
    <v-container class="py-8">
      <v-row class="align-center" no-gutters>
        <v-col cols="12" md="7" class="app-footer__connect">
          <h2 class="prism-text-overline mb-1">Connect</h2>

          <div class="app-footer__links mb-4">
            <a
              href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all"
              target="_blank"
              class="app-footer__link"
              >LinkedIn <span class="mdi mdi-open-in-new"></span
            ></a>
            <a href="https://www.broadinstitute.org/" target="_blank" class="app-footer__link"
              >Broad Institute <span class="mdi mdi-open-in-new"></span
            ></a>
            <a href="https://depmap.org/portal/" target="_blank" class="app-footer__link"
              >Depmap Portal <span class="mdi mdi-open-in-new"></span
            ></a>
          </div>

          <v-btn to="/contact-us" rounded size="small" variant="outlined" color="white"
            >Contact us</v-btn
          >
        </v-col>

        <v-col cols="12" md="5" class="app-footer__logos">
          <img
            :src="`${imgPath}PRISMLogo_All-White.png`"
            alt="PRISM"
            class="app-footer__logo app-footer__logo--prism"
          />
          <span class="app-footer__logo-divider"></span>
          <img
            :src="`${imgPath}BroadLogo_All-White.png`"
            alt="Broad Institute"
            class="app-footer__logo app-footer__logo--broad"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  import { ASSET_BASE } from '@/utils/assets';

  export default {
    name: 'AppFooter',
    data() {
      return {
        imgPath: ASSET_BASE,
      };
    },
  };
</script>

<style scoped>
  .app-footer {
    background: var(--prism-gradient-primary);
    color: white;
  }

  .app-footer__connect {
    text-align: center;
  }

  .prism-text-overline {
    margin: 0;
  }

  .app-footer__links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .app-footer__link {
    color: white;
    text-decoration: none;
    font-size: 0.95rem;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }

  .app-footer__link:hover {
    opacity: 0.65;
  }

  .app-footer__logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin-top: 32px;
  }

  .app-footer__logo {
    display: block;
    width: auto;
    height: 36px;
  }

  .app-footer__logo--prism {
    padding: 6px 0 6px 0;
  }
  .app-footer__logo-divider {
    width: 1px;
    height: 36px;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (min-width: 600px) {
    .app-footer__logo,
    .app-footer__logo-divider {
      height: 34px;
    }
  }

  @media (min-width: 960px) {
    .app-footer__connect {
      text-align: left;
    }

    .app-footer__links {
      align-items: flex-start;
    }

    .app-footer__logos {
      justify-content: flex-end;
      margin-top: 0;
    }

    .app-footer__logo,
    .app-footer__logo-divider {
      height: 48px;
    }
  }
</style>
