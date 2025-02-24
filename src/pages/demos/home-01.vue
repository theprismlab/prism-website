<template>
<page class="mt-0">

  <section style="position: relative; height: 75vh; width: 100%;">
    <ThreeJsViabilityHeatmap :key="resizeCounter"/>
    <div style="position:absolute; width: 100%; height:100%;">
      <v-container class="fill-height">
      <v-row>
        <v-col cols="12" xs="12" sm="10" md="6" lg="6" xl="5" class="d-flex justify-center flex-column">
          <page-title>Revolutionize cancer drug discovery</page-title>
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
          <section-title>PRISM is a novel DNA barcoding technology</section-title>
          <p class="text-body-1">PRISM barcoding technology enables simultaneous high-throughput viability analysis of over 900 genomically characterized cell lines.</p>
          <p class="text-body-1">Large-scale cancer cell line screening is critical to oncology drug discovery and development to better understand how drugs work. Traditional phenotypic screening tests only one cell line at a time using a lot of resources and taking a lot of time. Generating data for a small subset of cell lines results in an incomplete understanding of your drug.
          <br><br>
          Using PRISM, we accelerate the screening process by employing a novel DNA barcode-based approach that enables simultaneous high-throughput viability analysis of over 900 cell lines from over 45 cancer subtypes. Our extensive cell line collection captures the diversity of human cancers to provide a comprehensive evaluation of oncology drug candidates.
          </p>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col v-for="card in cards" cols="10" xs="10" sm="6" md="3" lg="3" xl="3">
          <VerticalCard
            :title="card.title"
            :subtitle="card.subtitle"
            :image="`${imgPath}${card.image}`"
            :action="card.action"
          >
          </VerticalCard>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <page-gradient class="section-padding-default" background="gradient-primary">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
          <h1 class="text-overline text-secondary-darken-2 font-weight-black">Our Collaborators</h1>
          <section-title>Over 150 leading academic and industry partners</section-title>
          <p>We are excited to collaborate with you to advance the understanding of cancer therapeutics and accelerate the drug discovery process. Our working model is that of a scientific collaboration to further cancer research.
          </p>
        </v-col>
        <v-col>
          <v-row>
              <v-col cols="12" md="10" lg="12" xl="12">
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

  <page-gradient background="gradient-stolen">
    <v-container>
      <div class="d-flex flex-row">
        <h3 class="text-h4 mr-6">Interested in collaborating?</h3>
        <v-btn class="" to="/screening/collaborate">Learn more</v-btn>
      </div>
    </v-container>
  </page-gradient>

  <section class="section-padding-default">
    <v-container>
      <v-row class="mt-0 mb-8">
        <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
          <h1 class="text-overline text-secondary-darken-2 font-weight-black">Our impact</h1>
          <section-title>Dedicated to advancing oncology research</section-title>
        </v-col>
      </v-row>
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
            title: 'Genomic and functional characterization',
            subtitle: 'Over 150k genomic features and dependencies for hematopoietic and solid tumor cell lines covering 80 subtypes.',
            image: '2025 PRISM-website-graphics-about-01.png',
            action: {
              text: 'Learn more',
              url: '/screening/cell-line-collection'
            }
          },
          {
            title: 'Multiple screening offerings',
            subtitle: 'Small molecules, combinations, antibody-drug conjugates, antibodies, and cytokines at multiple time points.',
            image: '2025 PRISM-website-graphics-about-02.png',
            action: {
              text: 'Learn more',
              url: '/screening/assays'
            }
          },
          {
            title: 'Predictive modeling to identify patient population and targets',
            subtitle: 'Univariate and multivariate predictive models to compare the viability profile of your drug.',
            image: '2025 PRISM-website-graphics-about-03.png',
            action: {
              text: 'Learn more',
              url: '/screening/data'
            }
          },
          {
            title: 'Secure data portal',
            subtitle: 'Securely browse and discover insights from your screening results with interactive visualizations.',
            image: `2025 PRISM-website-graphics-about-04.png`,
            action: {
              text: 'Learn more',
              url: 'theprismlab.org/portal'
            }
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