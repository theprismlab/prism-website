<template>
  <h2 :class="`text-overline text-${color} font-weight-black`"><slot></slot></h2>
</template>
  
  <script>
    export default {
      name: 'SectionOverline',
      props: {
        color: {
          type: String,
          required: false,
          default: 'secondary-darken-2'
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
/* .text-overline{
  font-size: .85rem !important;  
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
  