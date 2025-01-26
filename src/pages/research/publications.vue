<template>
  <div>
  <v-container class="py-16">
    <h1 class="text-h1">Publications</h1>
    <page-section>
          <v-row>
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" xl="6">
              <v-row>
                <v-col cols="12" md="3">
                  <div id="feature-image-container">
                    <v-img id="feature-image" src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png" cover></v-img>
                  </div>
                </v-col>
                <v-col cols="12" md="9">
                  <h3 class="text-h3">Genetic dependencies associated with transcription factor activities in human cancer cell lines</h3>
                  <p>Thatikonda V, et al. Cell Reports, 2024</p>
                  <p>Developed by the Broad Institute of MIT and Harvard, PRISM (Profiling Relative Inhibition Simultaneously in Mixtures) is a novel DNA barcoding technology that allows for rapid, viability screening of cancer cell line models in mixtures. Our original efforts have been published by Channing Yu in 2016, that showed that mixing barcoded cell lines together is feasible and by Steven Corsello in 2020 showing that screening a large number of known drugs across over 500 barcoded cell lines identified new indications for non-oncology drugs.</p>
                  <v-btn color="primary" variant="outlined" rounded>Read our publication</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="8" lg="7" xl="6">
              <div v-for="each in data">
                <PublicationCard :title="each.title" :publisher="each.publisher" :date="each.date" :authors="each.authors" :url="each.url"></PublicationCard>
              </div>
             
       
            </v-col>
          </v-row>
        </page-section>
        </v-container>



  </div>
  </template>
  
  <script>
import PublicationCard from '@/components/PublicationCard.vue';

    export default {
      data() {
        return {
          data: [
            {
              title: 'Genetic dependencies associated with transcription factor activities in human cancer cell lines',
              publisher: 'Thatikonda V, et al. Cell Reports, 2024',
              date: '2024',
              authors: 'Thatikonda V, et al.',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            },
            {
              title: 'Title',
              publisher: 'Publisher',
              date: '2024',
              authors: 'Authors',
              url: 'google.com'
            }
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

     
      },
      methods: {
        handleResize () {
          this.setFeatureImageHeight();
      },
        setFeatureImageHeight() {
            const featureImageContainer = document.getElementById('feature-image-container');
            const featureImage = document.getElementById('feature-image');
          if (featureImageContainer && featureImage) {
            let featureImageContainerWidth = featureImageContainer.offsetWidth;
            if (featureImageContainerWidth >= 250) {
              featureImageContainerWidth = 250;
            } 
            featureImageContainer.style.height = featureImageContainerWidth + 'px'; 
            featureImage.style.height = featureImageContainerWidth + 'px';
          } else {
            console.error('Could not find feature image container or feature image');
            featureImageContainer.style.height = '200px'; 
            featureImage.style.height = '200px';
          }
        }
      },
      watch: {
  
      }
    }
  </script>

  <style scoped>
  #feature-image-container {
      width: 100%;
      border: 1px solid #000;
    }
    #feature-image {
      /* height: 200px; */
      border: 1px solid #000;
    }
</style>
  