<template>
  <div>
    <v-parallax src="../../public/images/PRISM-homepage-hero-01.png" :height="heroHeight">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="8" lg="7" xl="6">
            <h1 class="text-h1">Revolutionize cancer drug discovery</h1>
            <h4 class="font-weight-regular">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</h4>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
    <page-gradient>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" xs="12" sm="10" md="8" lg="7" xl="6">
              <h4 class="text-center font-weight-regular">PRISM is a novel DNA barcoding technology that enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines. </h4>
            </v-col>
          </v-row>
        </v-container>
    </page-gradient>

    <page-section>
      <v-container>
        <v-row>
          
          <v-col v-for="card in cards" cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
              <v-card class="fill-height" elevation="1">
                <v-img  class="align-end" cover height="90" alt="" :src="card.img"></v-img>
                <v-card-title>{{ card.title }}</v-card-title>
                <v-card-subtitle>{{ card.text }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn size="x-small" color="primary" variant="text" rounded>{{ card.linkText }}</v-btn>
                </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </page-section>

    
    <page-gradient>
      <v-container>
  
        <v-row class="d-flex justify-center">
          <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
            <h3 class="font-weight-regular">Over 150 leading academic and industry partners have trusted PRISM to transform their research.</h3>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="elevation-0">
                <v-card-text>
                “I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.”
                </v-card-text>
                <v-card-item>
                <v-card-subtitle>
                  Florian Muller<br>
                  Head of Chemistry<br>
                  Lindonlight Collective
                </v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>

          <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
            <v-card class="elevation-0 fill-height">
              <v-card-text>
                “The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our
                research process.”
              </v-card-text>
              <v-card-item>
                <v-card-subtitle>
                  Discovery Oncology Scientist<br>
                  Fortune 500<br>
                  Pharmaceutical Company
                </v-card-subtitle>
              </v-card-item>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </page-gradient>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cards: [
          {
            title: 'Complete genomic and functional characterization of cell lines',
            text: 'Over 150k genomic features and dependencies for hematopoietic and solid tumor cell lines covering 80 subtypes.',
            img: '../../public/images/PRISM-about-graphic-01.png',
            linkText: 'Learn more',
            linkUrl: 'google.com'
          },
          {
            title: 'Multiple screening offerings',
            text: 'Small molecules, combinations, antibody-drug conjugates, antibodies, and cytokines at multiple time points.',
            img: '../../public/images/PRISM-about-graphic-01.png',
            linkText: 'Learn more',
            linkUrl: 'google.com'
          },
          {
            title: 'Predictive modeling to identify patient population and targets',
            text: 'Univariate and multivariate predictive models to compare the viability profile of your drug.',
            img: '../../public/images/PRISM-about-graphic-01.png',
            linkText: 'Learn more',
            linkUrl: 'google.com'
          },
          {
            title: 'Secure data portal',
            text: 'Securely browse and discover insights from your screening results with interactive visualizations.',
            img: '../../public/images/PRISM-about-graphic-01.png',
            linkText: 'Learn more',
            linkUrl: 'google.com'
          },
        ]
      }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      },
      beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
      },

    computed: {
      mobile () {
        return this.$vuetify.display.mobile
      },
      heroHeight () {
        return this.mobile ? '70vh' : '60vh'
      },
      cardImgHeight () {
        return '200px'
      },
      ySpacer () {
        return this.$vuetify.theme.themes.prismTheme.variables['y-spacer'] + 'px'
      }
    },
    methods: {
      handleResize () {
        this.setMaxCardHeight('prism-card')
        this.setMaxCardHeight('quote-card')
      },
      setMaxCardHeight (className) {
        const cards = this.$el.querySelectorAll(`.${className}`);
        cards.forEach(card => {
          card.style.height = `auto`;
        });
        let maxHeight = 0;
        cards.forEach(card => {
          const cardHeight = card.clientHeight;
          if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
          }
        });
        cards.forEach(card => {
          card.style.height = `${maxHeight}px`;
        });
      }
    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
  .primary-text {
    color: var(--v-primary);
  }


blockquote:before {
  content: '\0201C';
  font-size: 5rem;
  position: absolute;
  left: -1.8rem;
  top: -1rem;
  color: #c8ccd0;
}

</style>