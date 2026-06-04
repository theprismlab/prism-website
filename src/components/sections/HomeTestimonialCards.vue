<template>
  <v-row class="mt-6 mb-6">
    <v-col
      v-for="(card, index) in testimonialCards"
      :key="index"
      cols="12"
      xs="12"
      sm="6"
      md="6"
      lg="6"
      xl="6"
    >
      <v-card
        class="pa-6 px-10 fill-height justify-start mb-2"
        variant="tonal"
        color="secondary-lighten-3"
      >
        <v-card-item>
          <p class="text-body-1 text-black">
            <svg-icon
              size="34"
              type="mdi"
              :path="mdiFormatQuoteOpenPath"
              class="text-secondary"
            ></svg-icon>
            {{ card.quote }}
            <svg-icon
              size="34"
              type="mdi"
              :path="mdiFormatQuoteClosePath"
              class="text-secondary"
              style="float: right"
            ></svg-icon>
          </p>
          <p
            class="text-body-2 mb-0 font-weight-bold text-secondary-darken-2"
            v-html="card.author"
          ></p>
          <p class="text-body-2 mb-0 mt-0 text-grey-darken-1" v-html="card.company"></p>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiFormatQuoteOpen } from '@mdi/js';
  import { mdiFormatQuoteClose } from '@mdi/js';

  export default {
    name: 'HomeTestimonialCards',
    components: {
      SvgIcon,
    },
    data() {
      return {
        mdiFormatQuoteOpenPath: mdiFormatQuoteOpen,
        mdiFormatQuoteClosePath: mdiFormatQuoteClose,
        testimonialCards: [
          {
            quote:
              'I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.',
            author: 'Florian Muller',
            company: 'Head of Chemistry<br>Lindonlight Collective',
          },
          {
            quote:
              'The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.',
            author: 'Discovery Oncology Scientist',
            company: 'Fortune 500<br>Pharmaceutical Company',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .v-card {
    border: 1px solid var(--v-secondary-lighten-4);
  }
</style>


