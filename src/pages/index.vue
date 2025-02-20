<template>
<page class="mt-0">
  <page-gradient background="gradient-Blues" >
    <v-parallax :src="`${imgPath}PRISM-website-graphics_hero-01.png`" :height="heroHeight">
      <container-md class="fill-height">
        <v-row>
          <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
            <h1 class="text-h1 mb-12 font-weight-bold">Revolutionize cancer drug discovery</h1>
            <p class="text-h4">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
          </v-col>
        </v-row>
      </container-md>
    </v-parallax>
  </page-gradient>

  <section class="section-padding-default">
    <container-md>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <h3 class="heading-style-h5 title">PRISM is a novel DNA barcoding technology that enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines. 
          </h3>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col v-for="card in cards" cols="10" xs="10" sm="6" md="3" lg="3" xl="3">
          <v-card class="fill-height" elevation="1" style="border-radius: 0px;">
            <v-img  class="align-end"  width="100%" alt="" :src="`${imgPath}${card.img}`"></v-img>
            <v-card-title style="min-height:5rem;" class="font-weight-black">{{ card.title }}</v-card-title>
            <v-card-subtitle>{{ card.text }}</v-card-subtitle>
            <v-card-actions>
              <v-btn class="position-absolute ms-auto" style="right: 12px; bottom: 8px;" size="small" color="primary" variant="text" rounded>{{ card.linkText }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </container-md>
  </section>

  <page-gradient class="section-padding-default" background="solid-gray">
    <container-md>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
            <h3 class="title heading-style-h5">Over 150 leading academic and industry partners have trusted PRISM to transform their research.</h3>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
              <v-card elevation="1" class="fill-height px-4 py-3">
                <v-card-text>
                  “I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.”
                  <br><br>
                  <v-divider></v-divider>
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
            <v-col>
              <v-card elevation="1" class="fill-height py-3 px-4">
                <v-card-text>
                  “The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our
                  research process.”
                  <br><br>
                  <v-divider></v-divider>
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
        </v-col>
      </v-row>
    </container-md>     
  </page-gradient>

  <page-gradient background="gradient-secondary-darken-1">
    <container-md>
      <PageBannerShort title="Collaborate with us!" buttonText="Learn more" buttonLink="" textColor="white"></PageBannerShort>
    </container-md>
 
  </page-gradient>

  <section class="section-padding-default">
    <container-md>
      <h3 class="title heading-style-h5">Dedicated to advancing oncology research.</h3>
      <v-row>
        <v-col v-for="stat in stats" :key="stat.number" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-card class="pa-4 pb-8 fill-height" max-width="600px" elevation="1">
            <v-card-title style="line-height: 1.2em !important;" class="pb-0 text-size-h2">{{stat.number}}</v-card-title>
            <v-card-subtitle style="opacity: 1;" class="text-overline text-primary text-none font-weight-medium">{{stat.caption}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </container-md>
  </section>

</page>
</template>
<script>
  export default {
    data() {
      return {
        stats: [
          // {
          //   number: "7,000+",
          //   caption: "Compounds screened in over 500 cell lines"
          // },
          {
            number: "7,000+",
            caption: "Collaborator compounds screened"
          },
          {
            number: "40+",
            caption: "Publications in high-impact journals"
          },
          {
            number: "150+",
            caption: "Academic and industry partners"
          }
        ],
        cards: [
          {
            title: 'Complete genomic and functional characterization of cell lines',
            text: 'Over 150k genomic features and dependencies for hematopoietic and solid tumor cell lines covering 80 subtypes.',
            img: '2025 PRISM-website-graphics-about-01.png',
            linkText: 'Learn more',
            linkUrl: '/screening/cell-line-collection'
          },
          {
            title: 'Multiple screening offerings',
            text: 'Small molecules, combinations, antibody-drug conjugates, antibodies, and cytokines at multiple time points.',
            img: '2025 PRISM-website-graphics-about-02.png',
            linkText: 'Learn more',
            linkUrl: '/screening/screens'
          },
          {
            title: 'Predictive modeling to identify patient population and targets',
            text: 'Univariate and multivariate predictive models to compare the viability profile of your drug.',
            img: '2025 PRISM-website-graphics-about-03.png',
            linkText: 'Learn more',
            linkUrl: '/screening/data'
          },
          {
            title: 'Secure data portal',
            text: 'Securely browse and discover insights from your screening results with interactive visualizations.',
            img: '2025 PRISM-website-graphics-about-04.png',
            linkText: 'Learn more',
            linkUrl: '/portal'
          },
        ]
      }
    },
    mounted() {
   

      },
      beforeDestroy() {

      },
    computed: {
      imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/home/" : "../../public/images/home/"
        },
      mobile () {
        return this.$vuetify.display.mobile
      },
      heroHeight () {
        return this.mobile ? '80vh' : '75vh'
      },


    },
    methods: {

    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
// .tech-hero_text {
//     grid-column-gap: 2rem;
//     grid-row-gap: 2rem;
//     flex-flow: column;
//     justify-content: flex-start;
//     align-items: flex-start;
//     display: flex;
// }

</style>