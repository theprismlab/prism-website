<template>
  <v-container>
     <v-row justify="space-around">
          <v-col cols="12" xs="12" sm="12" md="12" lg="10" xl="10">
            <slot></slot>
        </v-col>
     </v-row>
  </v-container>
  </template>
  
  <script>
    export default {
      name: 'ContainerMd',
      props: {
     
      },
      data () {
        return {

        }
      },
      methods: {
      },
      watch:{

      }
    }
  </script>
  <style scoped>
   
      /* xxl  */
    @media (min-width:  2560px) {

    }
    /* xl */
    @media (min-width: 1920px) and (max-width: 2560px) {

    }
    /* lg */
    @media (min-width: 1280px) and (max-width: 1920px) {

    }
      /* md */
    @media (min-width: 960px) and (max-width: 1280px) {
        /* .v-container{
            max-width: 92% !important;
        } */
    }

    /* sm */
    @media (min-width: 600px) and (max-width: 960px) {
        /* .v-container{
            max-width: 92% !important;
        } */
    }
    /* xs */
    @media (max-width: 600px) {
        /* .v-container{
            max-width: 92% !important;
        } */
    }
</style>
  