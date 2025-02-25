<template>
  <h3 :class= "`text-overline text-grey-lighten-1 font-weight-black ${classes}`"><slot></slot></h3>
</template>
  
  <script>
    export default {
      name: 'CardOverline',
      props: {
        classes: {
            type: String,
            required: false
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
  