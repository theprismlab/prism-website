<template>
  <div>
  <v-container>
    <h1 class="text-h1 title font-weight-bold">Publications</h1>
    <page-section>
      <v-list>
        <v-list-subheader class="text-uppercase subtitle-1 font-weight-bold">Featured</v-list-subheader>
      </v-list>
      <v-row>
        <v-col cols="12" md="8" v-for="each in featured.filter((item, index) => index == 0)">
          <PublicationFeatureCard :title="each.title" :publisher="each.publisher" :date="each.date" :authors="each.authors" :url="each.url" :abstract="each.abstract" :image="`${imgPath}${each.image}`"></PublicationFeatureCard>
        </v-col>
      
        <v-col cols="12" md="4">
          <div v-for="each in featured.filter((item, index) => index > 0)" class="py-1">
            <PublicationCard :title="each.title" :publisher="each.publisher" :date="each.date" :authors="each.authors" :url="each.url"></PublicationCard>
          </div>
        </v-col>
      </v-row>
    
    </page-section>
    <page-section>
          <v-row>
            <v-col cols="12" xs="12" sm="8" md="8" lg="7" xl="6">

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
import * as PublicationData from '@/assets/data/publications.js';
import PublicationFeatureCard from '@/components/PublicationFeatureCard.vue';

    export default {
      data() {
        return {
          data: PublicationData.publications,
          featured: PublicationData.publications_featured

         
        }
      },
      mounted() {
        console.log(this.data);
        // window.addEventListener('resize', this.handleResize);
        // this.handleResize();
      },
      // beforeDestroy() {
      //   window.removeEventListener('resize', this.handleResize);
      // },
      computed: {
        imgPath() {
          console.log(import.meta.env.PROD);
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "/images/publications/" : "../../public/images/publications/"
        }
      },
      methods: {
      //   handleResize () {
      //     this.setFeatureImageHeight();
      // },
      //   setFeatureImageHeight() {
      //       const featureImageContainer = document.getElementById('feature-image-container');
      //       const featureImage = document.getElementById('feature-image');
      //     if (featureImageContainer && featureImage) {
      //       let featureImageContainerWidth = featureImageContainer.offsetWidth;
      //       if (featureImageContainerWidth >= 250) {
      //         featureImageContainerWidth = 250;
      //       } 
      //       featureImageContainer.style.height = featureImageContainerWidth + 'px'; 
      //       featureImage.style.height = featureImageContainerWidth + 'px';
      //     } else {
      //       console.error('Could not find feature image container or feature image');
      //       featureImageContainer.style.height = '200px'; 
      //       featureImage.style.height = '200px';
      //     }
      //   }
      },
      watch: {
  
      }
    }
  </script>

  <style scoped>

</style>
  