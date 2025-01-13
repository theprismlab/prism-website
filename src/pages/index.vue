<template>
  <v-layout>
    <span class="bg"></span>
      <v-container fluid  id="hero-section" class="container-custom" :style="{paddingTop: heroPadding, height: heroHeight, zIndex: 1}">
        <v-row>
          <v-col cols="12" xs="12" sm="12" md="10" lg="8" xl="6">
            <h1>Accelerate the understanding of cancer treatments </h1>
            <h3 class="light">Rapid, comprehensive cancer drug-sensitivity screening enhanced by predictive modeling</h3>
          </v-col>
        </v-row>
      </v-container>
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
      },
      heroPadding () {
        return this.mobile ? '64px' : '128px'
      },
      heroHeight () {
        return this.mobile ? 'calc(100vh - 64px)' : 'calc(100vh - 128px)'
      }
    }
  }
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( '../assets/hero-desktop.png') no-repeat center center;
    background-size: cover;
    transform: scale(1);
  }
  .container-custom{
    width:80%;
  }




</style>