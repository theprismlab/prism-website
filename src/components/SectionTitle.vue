<template>
  <h2 class="text-h2 font-weight-bold section-title"><slot></slot></h2>
  </template>
  
  <script>
    export default {
      name: 'SectionTitle',
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
    .section-title{
      margin-bottom: 36px;
      line-height: 1.175em !important;
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
  