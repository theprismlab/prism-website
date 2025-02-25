<template>
  <a :class="`text-button text-${color} ${classes}`" 
    :href="href" 
    :target="target"
    >
    {{ text }}
      <v-icon 
        :size="size"
        :icon="icon"
      ></v-icon>
    <!-- <svg-icon style="height:1em;" type="mdi" :path="svgPath"></svg-icon> -->
  </a>
  </template>
  
  <script>
import { color } from 'd3';

// import SvgIcon from '@jamescoyle/vue-icon';
// import { mdiOpenInNew } from '@mdi/js';
// import { mdiDownload } from '@mdi/js';


    export default {
      name: 'IconLink',
      components: {
        // SvgIcon
      },
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
        color: {
            type: String,
            required: false,
            default: "primary-accent-2"
        },
        icon: {
            type: String,
            required: false,
            default: "mdi-open-in-new"
        },
        size: {
            type: String,
            required: false,
            default: "x-small"
        },
        classes: {
            type: String,
            required: false
        },
      },
      data () {
        return {
          // mdiOpenInNew: mdiOpenInNew,
          // mdiDownload: mdiDownload
        }
      },
      computed: {
        // svgPath() {
        //   if (this.icon === 'open-in-new') {
        //     return this.mdiOpenInNew
        //   } else  if (this.icon === 'download') {
        //     return this.mdiDownload
        //   }
        // }
      },
      methods: {
        
      },
      watch:{

      }
    }
  </script>
  <style scoped>

    a.text-button{
      line-height: inherit !important;
    }
    .text-h4 a.text-button{
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
  