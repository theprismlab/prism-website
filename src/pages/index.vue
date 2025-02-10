<template>
  <div>
    <v-parallax src="../../public/images/homepage-hero-02.png" :height="heroHeight">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="8" lg="7" xl="6">
            <h1 class="title text-h1 font-weight-black" style="text-shadow: white 3px 3px 3px;">Revolutionize cancer drug discovery</h1>
            <p class="text-h4 font-weight-medium" style="text-shadow: white 1px 1px 5px;">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>

    <page-gradient>
        <v-container>
          <v-row class="d-flex justify-center">
            <v-col cols="12" xs="12" sm="10" md="8" lg="8" xl="8">
              <p class="text-h4 text-center">PRISM is a novel DNA barcoding technology that enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines. </p>
            </v-col>
          </v-row>
        </v-container>
    </page-gradient>

    <page-section>
      <v-container>
        <v-row>
          <v-col v-for="card in cards" cols="12" xs="12" sm="6" md="6" lg="3" xl="3">
              <v-card class="fill-height" elevation="1">
                <v-img  class="align-end" cover height="90" alt="" :src="`${imgPath}${card.img}`"></v-img>
                <v-card-title class="font-weight-black">{{ card.title }}</v-card-title>
                <v-card-subtitle>{{ card.text }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="position-absolute ms-auto" style="right: 12px; bottom: 8px;" size="small" color="primary" variant="text" rounded>{{ card.linkText }}</v-btn>
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
            <p class="text-h4">Over 150 leading academic and industry partners have trusted PRISM to transform their research.</p>
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
    <PageBannerShort title="Collaborate with us!" buttonText="Learn more about working with us" buttonLink=""></PageBannerShort>
    <page-section>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="8" lg="7" xl="6">
            <p class="text-h4">We are devoted to moving cancer research forward.. sentence needed.</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="stat in stats">
            <v-card class="elevation-0 fill-height" style="border-radius: 0px; border-left: 3px solid var(--v-primary);">
              <v-card-title class="font-weight-black text-h2">{{ stat.number }}</v-card-title>
              <v-card-subtitle>{{ stat.text }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </page-section>

 
 </div>
</template>
<script>
  export default {
    data() {
      return {
        stats: [
          {
            number: "900+",
            text: "Genomically characterized cell lines"
          },
          {
            number: "4",
            text: "Months turnaround time from submission to data delivery"
          },
          {
            number: "7,000+",
            text: "Compounds screened in over 500 cell lines"
          },
          {
            number: "40+",
            text: "Publications in high-impact journals"
          },
          {
            number: "150+",
            text: "Academic and industry partners"
          },
          {
            number: "30+",
            text: "Years of experience"
          }
        ],
        cards: [
          {
            title: 'Complete genomic and functional characterization of cell lines',
            text: 'Over 150k genomic features and dependencies for hematopoietic and solid tumor cell lines covering 80 subtypes.',
            img: 'PRISM-website-graphics_about-02.png',
            linkText: 'Learn more',
            linkUrl: '/screening/cell-line-collection'
          },
          {
            title: 'Multiple screening offerings',
            text: 'Small molecules, combinations, antibody-drug conjugates, antibodies, and cytokines at multiple time points.',
            img: 'PRISM-website-graphics_about-03.png',
            linkText: 'Learn more',
            linkUrl: '/screening/screens'
          },
          {
            title: 'Predictive modeling to identify patient population and targets',
            text: 'Univariate and multivariate predictive models to compare the viability profile of your drug.',
            img: 'PRISM-website-graphics_about-04.png',
            linkText: 'Learn more',
            linkUrl: '/screening/data'
          },
          {
            title: 'Secure data portal',
            text: 'Securely browse and discover insights from your screening results with interactive visualizations.',
            img: 'PRISM-website-graphics_about-05.png',
            linkText: 'Learn more',
            linkUrl: '/portal'
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
      imgPath() {
        return "../../public/images/"
          // console.log(import.meta.env.PROD);
          // return import.meta.env.PROD ? import.meta.env.BASE_URL + "../assets/homepage/" : "../../images/homepage/"
        },
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