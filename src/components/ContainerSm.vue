<template>
  <v-container>
     <v-row>
        <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="8" offset-sm="0" offset-md="1" offset-lg="1" offset-xl="2">
            <slot></slot>
        </v-col>
     </v-row>
  </v-container>
  </template>
  
  <script>
    export default {
      name: 'ContainerSm',
      props: {
        alignment: {
          type: String,
          required: false,
          default: 'center'
        }
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
    /* .v-container{
      width: 100% !important;
      max-width: var(--container-sm-max-width) !important;
      margin-left: auto !important;
      margin-right: auto !important;
    } */

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
 
    }

    /* sm */
    @media (min-width: 600px) and (max-width: 960px) {

    }
    /* xs */
    @media (max-width: 600px) {

    }
</style>
  