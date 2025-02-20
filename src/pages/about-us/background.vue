<template>
  <page>
    <container-sm>
            <h2 class="title">Background</h2>
            <p class="text-body-1">
              Developed by the Broad Institute of MIT and Harvard, PRISM (Profiling Relative Inhibition Simultaneously in Mixtures) is a novel DNA barcoding technology that allows for rapid, viability screening of cancer cell line models in mixtures. Our original efforts have been published by Channing Yu in 2016, that showed that mixing barcoded cell lines together is feasible and by Steven Corsello in 2020 showing that screening a large number of known drugs across over 500 barcoded cell lines identified new indications for non-oncology drugs. 
              <br><br>
              First publication of the PRISM method from 2016. 102 cell lines were labeled with unique 24-nucleotide barcodes and used to screen 8400 compounds.             
            </p>
            <v-btn class="mt-1 mb-8" color="primary-accent-2" variant="tonal" rounded>Read our publication<v-icon class="ml-2">mdi-arrow-right-thin</v-icon></v-btn>
            <p class="text-body-1">
              An updated panel of 578 barcoded cancer cell lines were used to profile the activity of 4518 existing drugs. Results were used to begin the PRISM drug repurposing resource.
            </p>
            <v-btn class=" mt-1 mb-8" color="primary-accent-2" variant="tonal" rounded>Read our publication<v-icon class="ml-2">mdi-arrow-right-thin</v-icon></v-btn>
            <p class="text-body-1">
              Traditional cell line viability screening is done one cell line at a time, requiring lots of time and reagents, which can slow down drug discovery and development efforts. PRISM’s unique approach to barcoding and pooling cell lines for high-throughput screening overcomes the limitations of single cell line studies, helping researchers rapidly collect cancer cell line drug-sensitivity data on an unprecedented scale.
            </p>
      </container-sm>
    </page>
</template>
<script>



  export default {
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {

      },
      beforeDestroy() {
       
      },

    computed: {
      heroMinHeight () {
        return '100vh'
      },
   
    },
    methods: {
    
    },
    watch: {

    }
  }
</script>
