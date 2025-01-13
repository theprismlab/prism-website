<template>
  <v-layout>
    <div id="hero-section">
      
      <div id="hero-section-img">
        <!-- <v-img v-if="mobile" cover src="../assets/hero-mobile.png" alt="Hero image" id="hero-image" />
        <v-img v-else cover src="../assets/hero-desktop.png" alt="Hero image" id="hero-image" /> -->
        <v-img cover src="../assets/hero-desktop.png" alt="Hero image" id="hero-image" />
      </div>
     
      <div id="hero-section-text">
        <v-container fluid class="container-custom">
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="6">
              <h1>Accelerate the understanding of cancer treatments </h1>
              <h3 class="light">Rapid, comprehensive cancer drug-sensitivity screening enhanced by predictive modeling</h3>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-layout>
</template>


<script>
  export default {
    mounted () {
      console.log(this.$vuetify.display.mobile)
    },
    computed: {
      mobile () {
        return this.$vuetify.display.mobile
      }
    }
  }
</script>

<style scoped>
  .container-custom{
    width:80%;
  }
  #hero-section {
    
    height: 80vh;
    width: 100%;
    position: relative;
  }
  #hero-section-img {
    width: 100%;
    min-width: 1200px;
    max-width: 1800px;
    position: absolute;
    bottom:0px;
    right:0px;
    z-index: -1;
  }
  #hero-section-text {
    margin-top:120px;
    z-index:0;
  }

  @media (max-width: 600px) {
    #hero-section {
      height: 88vh;
    }
    #hero-section-img {
      min-width: 1000px;
    }
    #hero-image {
      right:-200px;
    }
    #hero-section-text {
      margin-top:2em;
    }
  }

</style>