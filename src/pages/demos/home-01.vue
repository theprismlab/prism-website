<template>
<page class="mt-0">

  <section style="position: relative; height: 75vh; width: 100%;">
    <ThreeJsViabilityHeatmap :key="resizeCounter"/>
    <div style="position:absolute; width: 100%; height:100%;">
      <v-container class="fill-height">
      <v-row>
        <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
          <h1 class="text-h1 mb-12 font-weight-medium">Revolutionize cancer drug discovery</h1>
          <p class="text-h4  font-weight-medium">Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.</p>
        </v-col>
      </v-row>
    </v-container>
    </div>
  </section>

  <section>
    <v-container>
      <v-row class="mt-0 mb-8">
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <h1 class="text-overline text-secondary-darken-2 font-weight-black">Our technology</h1>
          <h2 class="text-h2 font-weight-medium">PRISM is a novel DNA barcoding technology</h2>
          <p class="text-body-1">PRISM barcoding technology enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines.</p>
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
    </v-container>
  </section>

  <page-gradient class="section-padding-default" background="gradient-primary">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
          <h1 class="text-overline text-secondary-darken-2 font-weight-black">Our Collaborators</h1>
          <h2 class="text-h2">Over 150 leading academic and industry partners</h2>
          <p>We are excited to collaborate with you to advance the understanding of cancer therapeutics and accelerate the drug discovery process. Our working model is that of a scientific collaboration to further cancer research.
          </p>
        </v-col>
        <v-col>
          <v-row>
              <v-col cols="12" md="8">
                <v-list style="background: transparent; "lines="auto">
                  <v-list-item>
                    <v-list-item-title class="font-weight-medium">
                      "I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation."
                    </v-list-item-title>
                    <v-list-item-subtitle class="pt-2 text-black text-opacity-1">
                      Florian Muller<br>
                      Head of Chemistry<br>
                      Lindonlight Collective
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-divider class="mt-4 mb-4"></v-divider>
                  <v-list-item>
                    <v-list-item-title class="font-weight-medium">
                      "The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process."
                    </v-list-item-title>
                    <v-list-item-subtitle class="pt-2 text-black text-opacity-1">
                    <!-- <v-list-item-subtitle class="pt-2 font-weight-bold text-grey-darken-1"> -->
                      Discovery Oncology Scientist<br>
                      Fortune 500<br>
                      Pharmaceutical Company
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              
            </v-col>
           
          </v-row>
        </v-col>
      </v-row>
    </v-container>     
  </page-gradient>

  <page-gradient background="gradient-secondary-darken-1">
    <container-sm>
      <PageBannerShort title="Collaborate with us!" buttonText="Learn more" buttonLink="" textColor="white"></PageBannerShort>
    </container-sm>
  </page-gradient>

  <section class="section-padding-default">
    <v-container>
      <h3 class="title heading-style-h5">Dedicated to advancing oncology research.</h3>
      <v-row>
        <v-col v-for="stat in stats" :key="stat.number" cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-card class="pa-4 pb-8 fill-height" max-width="600px" elevation="1">
            <v-card-title style="line-height: 1.2em !important;" class="pb-0 text-size-h2">{{stat.number}}</v-card-title>
            <v-card-subtitle style="opacity: 1;" class="text-overline text-primary text-none font-weight-medium">{{stat.caption}}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

</page>
</template>
<script>
  export default {
    data() {
      return {
        resizeCounter: 0,
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
    created() {
      window.addEventListener("resize", this.debounce(this.onWindowResize));

    },
    destroyed() {
        window.removeEventListener("resize", this.onWindowResize);
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
      debounce(func){
          var timer;
          return function(event){
            if(timer) clearTimeout(timer);
            timer = setTimeout(func,100,event);
          };
        },
      onWindowResize() {

        this.resizeCounter++;
            
        console.log("resize event");

        },

    },
    watch: {

    }
  }
</script>

<style scoped lang="scss">
.tech-hero_text {
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
}

</style>