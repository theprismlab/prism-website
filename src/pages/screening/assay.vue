<template>
<page id="screening-assay" class="">
  <container-sm>
      <page-title>Assay</page-title>
        <p>
          Our viability assays are performed using the PRISM barcoding technology, which allows for the simultaneous measurement of the effects of test agents on hundreds of pooled cell lines. We offer a few  assay types and time-points. For all of our assays, test agents are added to 384-well plates for a number of dose-dilutions and screened in replicate. At the end of incubation, cells are lysed, and mRNA or gDNA is isolated. Barcode sequences are amplified by PCR and quantified using a Luminex FlexMap 3D® scanner or NextGen sequencing. Relative barcode abundance (compared to vehicle control) is then used to generate cell line sensitivity profiles for each test agent and concentration tested. 
        </p>
        <section id="screening-assay-mts">
          <h2 class="text-h3 mt-12">MTS</h2>
          <h3 class="text-overline text-primary-accent-1">Small molecule single agents</h3>
          <p class="text-body-1">Our most popular screen is a small molecule single agent screen called Medium Throughput Screening (MTS). We screen standard DMSO compounds at a top dose of your choice,  diluted 3-fold over 8 dilutions.</p>
          <v-row>
            <v-col cols="12" md="10">
              <v-table class="elevation-1 mb-0 mt-4" style = "border: 1px solid #e0e0e0 !important" density="compact">
                <tbody>
                  <tr>
                    <td class="text-body-2 font-weight-bold td-0">Screen name</td>
                    <td class="text-body-2">MTS</td>
                </tr>
                <tr>
                    <td class="text-body-2 font-weight-bold td-0">Test agents</td>
                    <td class="text-body-2">small molecule single agents</td>
                </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Media</td>
                      <td class="text-body-2">DMSO</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Dose scheme</td>
                      <td class="text-body-2">8-point dose, 3-fold dilution</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Time-point</td>
                      <td class="text-body-2">5-day</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </section>
        <section id="screening-assay-cps">
          <h2 class="text-h3  mt-12">CPS</h2>
          <h3 class="text-overline text-primary-accent-1">Small molecule combinations</h3>
          <p class="text-body-1">Combination screening in PRISM requires careful selection of drug doses which can be especially difficult in a pooled context. Therefore, it is only recommended to use this assay for test agents that have been screened in PRISM before as single agents. When selecting an anchor dose our recommendation is to select a dose that does not broadly affect cell viability but gives a reproducible phenotypic effect in a specific cell line or set of cell lines. 

            <open-in-new-link 
            href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" 
            target="_blank" 
            text="CPS white paper"
          />
            and explore our 
            <open-in-new-link 
            href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" 
            target="_blank" 
            text="public dataset"
          /> on the portal.

          </p>
          <v-row>
            <v-col cols="12" md="10">
              <v-table class="elevation-1 mb-0 mt-4" style = "border: 1px solid #e0e0e0 !important" density="compact">
                <tbody>
                  <tr>
                    <td class="text-body-2 font-weight-bold td-0">Screen name</td>
                    <td class="text-body-2">CPS</td>
                </tr>
                <tr>
                    <td class="text-body-2 font-weight-bold td-0">Test agents</td>
                    <td class="text-body-2">small molecule combination</td>
                </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Media</td>
                      <td class="text-body-2">DMSO</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Dose scheme</td>
                      <td class="text-body-2">

                        7-point dose, 3-fold dilution (treatment agent)<br>
                        1-point dose (anchor agent)<br>
                        Test agents are screened at dose alone and in combination.
                      </td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Time-point</td>
                      <td class="text-body-2">5-day</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </section>
        <section id="screening-assay-aps">
          <h2 class="text-h3  mt-12">APS</h2>
           <h3 class="text-overline text-primary-accent-1">Antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents</h3>
          <p class="text-body-1">The main difference between our aqueous screen and the DMSO-based screen is that we plate the cells first in the aqueous screen followed by the aqueous agents by ECHO transfer. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, checkout our 
          <open-in-new-link 
            href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" 
            target="_blank" 
            text="ADC white paper"
          />
            and explore our 
            <open-in-new-link 
            href="https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" 
            target="_blank" 
            text="public dataset"
          /> on the portal.
          </p>
          <v-row>
            <v-col cols="12" md="10">
              <v-table class="elevation-1 mb-0 mt-4" style = "border: 1px solid #e0e0e0 !important" density="compact">
                <tbody>
                  <tr>
                    <td class="text-body-2 font-weight-bold td-0">Screen name</td>
                    <td class="text-body-2">APS</td>
                </tr>
                <tr>
                    <td class="text-body-2 font-weight-bold td-0">Test agents</td>
                    <td class="text-body-2">antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents</td>
                </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Media</td>
                      <td class="text-body-2">AQUEOUS</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Dose scheme</td>
                      <td class="text-body-2">8-point does, 3-fold dilution</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Time-point</td>
                      <td class="text-body-2">5-day</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </section>
        <section id="screening-assay-eps">
          <h2 class="text-h3  mt-12">EPS (Extended day)</h2>
          <h3 class="text-overline text-primary-accent-1">Small molecule single agents</h3>
          <p class="text-body-1">TEXT??</p>
          <v-row>
            <v-col cols="12" md="10">
              <v-table class="elevation-1 mb-0 mt-4" style = "border: 1px solid #e0e0e0 !important" density="compact">
                <tbody>
                  <tr>
                    <td class="text-body-2 font-weight-bold td-0">Screen name</td>
                    <td class="text-body-2">EPS</td>
                </tr>
                <tr>
                    <td class="text-body-2 font-weight-bold td-0">Test agents</td>
                    <td class="text-body-2">small molecule single agents</td>
                </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Media</td>
                      <td class="text-body-2">DMSO</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Dose scheme</td>
                      <td class="text-body-2">5-point does, custom dilution</td>
                  </tr>
                  <tr>
                      <td class="text-body-2 font-weight-bold  td-0">Time-point</td>
                      <td class="text-body-2">10-day</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </section>
        <v-row>
          <v-col cols="12" md="10">
            <page-gradient class="pa-16 pb-8  mt-16" style="border-radius:10px;" background="gradient-primary-darken">
                <h2 class="text-h3 font-weight-bold">Interested in submitting?</h2>
                <p class="text-h4">Checkout our <open-in-new-link href="https://theprismlab.org/portal/submissions" target="_blank" text="submissions page" classes="text-primary-lighten-4"/></p>
            </page-gradient>
          </v-col>
        </v-row>
      </container-sm>
</page>
</template>
  
<script>
  export default {
    name: 'Assay',
    data() {
      return {
        screens: [
          {
            'screen': 'MTS',
            'test agents': 'Small molecule single agents',
            'media': 'DMSO',
            'time-point': '5-day',
            'dose scheme': `8-point dose, 3-fold dilution`,
          },
          {
            name: 'CPS',
            description: 'Small molecule combinations',
            media: 'DMSO',
            timepoint: '5-day',
            dose_scheme: `7-point dose, 3-fold dilution of treatment test agent and 1 dose of anchor test agent alone and in combination`,
          }
        ]
      }
    }
  }
</script>
<style>
.v-table tbody tr td{
  padding: 12px !important;
}
.td-0{
  width:25%;
  min-width:fit-content !important;
  border-right: 1px solid #e0e0e0;
}

</style>