<template>
  <page>
    <container-xs>
      <page-title>About PRISM</page-title>
      <section>
        <p class="text-body-1">
        Developed by the Broad Institute of MIT and Harvard, PRISM (Profiling Relative Inhibition Simultaneously in Mixtures) is a novel DNA barcoding technology that allows for rapid, viability screening of cancer cell line models in mixtures. Our original efforts have been published by Channing Yu in 2016, which showed that mixing barcoded cell lines together and adding drugs to the pools showed the same drug response as screening in individual cell lines. In 2020, Steven Corsello showed that screening 5,000 known drugs across over 500 barcoded cell lines confirmed the expected drug response and also identified new indications for non-oncology drugs.
        <br><br>
        The true power of PRISM is using genomically characterized cell lines that have also been profiled in the Dependency Map with CRISPR genome-wide knockout screening. Correlating the PRISM viability profile to the baseline genomic features and functional genetic readouts identifies the target, patient population, and off-target effects of drugs. 
        <br><br>
        Since 2018, PRISM has been working with external collaborators, when we first offered PRISM to a biotech company. Now,  PRISM has worked with dozens of pharmaceutical and biotech companies and academics to uncover the true mechanism of action of their drugs. PRISM has helped identify new patient populations for clinical trials, our data has been used in Investigational New Drug (IND) filings, and we have been a part of over 40 publications. 
        </p>
    </section>  
  </container-xs>
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
<style scoped>
  a.text-button{
    line-height: var(--body-1-line-height);
  }
</style>
