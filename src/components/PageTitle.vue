<template>
  <h1 class="text-h1 font-weight-bold"><slot></slot></h1>
  </template>
  
  <script>
    export default {
      name: 'PageTitle',
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
    h1{
      margin-bottom: 48px;
      margin-top:24px;
    }
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
  