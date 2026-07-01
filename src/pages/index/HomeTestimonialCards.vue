<template>
  <v-row>
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
      <v-card class="testimonial-card fill-height d-flex flex-column" variant="flat">
        <svg-icon
          size="36"
          type="mdi"
          :path="mdiFormatQuoteOpenPath"
          class="testimonial-quote-mark"
        ></svg-icon>
        <p class="prism-text-title-large testimonial-quote flex-grow-1">{{ card.quote }}</p>
        <div class="testimonial-divider"></div>
        <div class="testimonial-author">
          <p class="prism-text-body-large font-weight-bold mb-0">{{ card.author }}</p>
          <span class="prism-text-body-medium text-medium-emphasis" v-html="card.company"></span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiFormatQuoteOpen } from '@mdi/js';

  export default {
    name: 'HomeTestimonialCards',
    components: {
      SvgIcon,
    },
    data() {
      return {
        mdiFormatQuoteOpenPath: mdiFormatQuoteOpen,
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
  .testimonial-card {
    padding: 44px 40px 36px;
    border-radius: 20px;
    background: #fff;
    background-color: var(--v-amber-lighten-5);
  }

  .testimonial-quote-mark {
    color: var(--prism-color-secondary-light);
    margin-bottom: 4px;
  }

  .testimonial-quote {
    line-height: 1.6;
    color: #2b2b2b;
  }

  .testimonial-divider {
    width: 40px;
    height: 3px;
    border-radius: 2px;
    background: var(--prism-color-secondary);
    margin: 28px 0 20px;
  }
</style>
