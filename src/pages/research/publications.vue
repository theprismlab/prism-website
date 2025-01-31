<template>
  <div>
  <v-container class="py-16">
    <h1 class="text-h1">Publications</h1>
    <page-section>
      <div v-for="each in featured">
        <!-- <PublicationFeatureCard :title="each.title" :publisher="each.publisher" :date="each.date" :authors="each.authors" :url="each.url" :abstract="each.abstract" :image="`../../assets/images/publications/${each.image}`"></PublicationFeatureCard> -->
        <PublicationFeatureCard :title="each.title" :publisher="each.publisher" :date="each.date" :authors="each.authors" :url="each.url" :abstract="each.abstract" :image="each.image"></PublicationFeatureCard>
      </div>

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

          // data: [
          //   {
          //     title: 'Genetic dependencies associated with transcription factor activities in human cancer cell lines',
          //     publisher: 'Thatikonda V, et al. Cell Reports, 2024',
          //     date: '2024',
          //     authors: 'Thatikonda V, et al.',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   },
          //   {
          //     title: 'Title',
          //     publisher: 'Publisher',
          //     date: '2024',
          //     authors: 'Authors',
          //     url: 'google.com'
          //   }
          // ]
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
  #feature-image-container {
      width: 100%;
      border: 1px solid #000;
    }
    #feature-image {
      /* height: 200px; */
      border: 1px solid #000;
    }
</style>
  