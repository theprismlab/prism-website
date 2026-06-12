<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="11" xs="11" sm="5" md="5" lg="5">
      <v-img eager class="align-end" :src="`${imgPath}${image}`" width="100%"></v-img>
    </v-col>
    <v-col>
      <v-card variant="transparent">
        <v-card-item>
          <h3 class="prism-text-h3 font-weight-bold">{{ title }}</h3>
          <p class="prism-text-body-1">{{ body }}</p>
          <v-btn :href="button.link" target="_blank" color="white" variant="outlined" rounded
            >{{ button.text }} <v-icon right>mdi-chevron-right</v-icon></v-btn
          >
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  import { ASSET_BASE } from '@/utils/assets';

  export default {
    name: 'OurPortal',
    props: {},
    data() {
      return {
        title: 'Explore and discover',
        body: 'Securely browse and discover insights from your screening results with interactive visualizations.',
        button: {
          text: 'PRISM portal',
          link: 'https://theprismlab.org/portal/projects',
        },
        image: 'macbook-portal.png',
      };
    },
    computed: {
      imgPath() {
        return ASSET_BASE;
      },
    },
    mounted() {},
  };
</script>
<style scoped></style>
