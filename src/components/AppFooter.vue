<template>
  <v-footer class="py-4 background">
    <v-container>
      <v-row class="justify-space-between align-center">
        <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="6">
          <section-overline color="white">Connect</section-overline>
          <v-row class="justify-start align-top pb-4">
            <v-col cols="6" xs="12" sm="auto" md="4" lg="4" xl="4">
              <a href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all"
                target="_blank" class="text-white"
                >LinkedIn <span class="mdi mdi-open-in-new"></span></a
              >
              <br />
              <a href="https://www.broadinstitute.org/" target="_blank" class="text-white"
                >Broad Institute <span class="mdi mdi-open-in-new"></span></a
                </a
              >
              <br />
              <a href="https://depmap.org/portal/" target="_blank" class="text-white"
                >Depmap Portal <span class="mdi mdi-open-in-new"></span></a
                </a
              >
            </v-col>

            <v-col cols="6" xs="12" sm="6" md="6" lg="4" xl="4">
              <v-btn to="/contact-us" rounded size="small" variant="outlined" color="white"
                >Contact us</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-col align-self="center">
          <v-row class="justify-end align-center">
            <v-col cols="6" xs="6" sm="6" md="6" lg="4" xl="4">
              <v-img
                eager
                :src="`${imgPath}PRISMLogo_All-White.png`"
                max-width="166"
                width="100%"
              ></v-img>
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6" lg="4" xl="4">
              <v-img
                eager
                :src="`${imgPath}BroadLogo_All-White.png`"
                max-width="166"
                width="100%"
              ></v-img>
            </v-col>
          </v-row>
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
    computed: {},
    mounted() {},
  };
</script>

<style scoped>
  .v-list {
    background: none;
    color: white;
  }
  .v-list-item {
    min-height: 1rem;
    color: white;
  }
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    opacity: 0.75;
  }
  /* .background{
  background: linear-gradient(15deg, #0e0c1b, #161730 40%, #24286e);
} */
  .background {
    background: linear-gradient(120deg, var(--prism-color-primary), var(--prism-color-blue-700));
  }
</style>
