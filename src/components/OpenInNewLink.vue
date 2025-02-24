<template>
  <a :class="`text-button ${classes}`" 
    :href="href" 
    :target="target">
    {{ text }}
     <v-icon style="font-size: 1em;">mdi-open-in-new</v-icon>
  </a>
  </template>
  
  <script>
import { text } from 'd3';

    export default {
      name: 'OpenInNewLink',
      props: {
        href: {
            type: String,
            required: true
        },
        target: {
            type: String,
            required: false,
            default: "_blank"
        },
        text: {
            type: String,
            required: true
        },
        classes: {
            type: String,
            required: false,
            default: "text-primary-accent-2"
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

    a.text-button {
      font-size: inherit !important;
      letter-spacing: inherit !important;
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
  