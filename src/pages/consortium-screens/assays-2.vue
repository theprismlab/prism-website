<template>
    <page id="" class="mb-0">
        <v-container>
          <v-row class="mb-4 mt-4">
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
              <page-title>Assays</page-title>
              <p class="text-body-1">
                Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality data, validation compounds are run on each assay plate.
              </p>
              <section class="mt-6 mb-6">
                <div style="height:100px; background-color:#e2e2e2; margin-bottom:4px;">
                <h2 class="text-center text-white pt-8"> 5 day-assay workflow graphics</h2>
                </div>
        
                <div style="height:100px; background-color:#e2e2e2; margin-bottom:4px;">
                <h2 class="text-center text-white pt-8">10 day-assay workflow graphic</h2>
                </div>
            </section>
            <section>
                  <v-card elevation="0" variant="outlined" color="grey-lighten-2" class="mb-4 mt-4">
                    <v-table>
                      <thead>
                        <tr>
                            <th class="td-0">Screen</th>
                            <th>Test Agents</th>
                            <th># of Cell Lines</th>
                            <th>Dose Scheme</th>
                            <th>Time-Point</th>
                          </tr>
                      </thead>
                      <tbody class="">
                        <tr v-for="(item, index) in table.items" :key="index">
                          <td class="td-0">{{ item.screen }}</td>
                          <td class="td-1">{{ item['test agents'] }}</td>
                          <td class="td-2">{{ item['num_cell_lines'] }}</td>
                          <td class="td-3">{{ item['dose scheme'] }}</td>
                          <td class="td-4">{{ item['time-point'] }}</td>
                        </tr>
                      </tbody>
                      </v-table>
                  </v-card>
                </section>
          </v-col>
        </v-row>
      </v-container>
        <v-container>
          <v-row class="mb-4 mt-4">
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
              <section>
                <v-expansion-panels>
                <v-expansion-panel elevation="0">
                  <v-expansion-panel-title>
                    <div>
                        <h2 class="text-h5 expansion-panel-title">MTS</h2>
                        <h3 class="expansion-panel-subtitle">Small molecule single agents</h3>
                    </div>
                  
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-1">
                      We screen standard DMSO compounds at a top dose of your choice, diluted 3-fold over 8 dilutions. Compounds are plated with an Echo using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s). 
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>
    
                <v-expansion-panel elevation="0">
                  <v-expansion-panel-title>
                    <div>
                        <h2 class="text-h5 expansion-panel-title">CPS</h2>
                        <h3 class="expansion-panel-subtitle">Small molecule combinations</h3>
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-1">
                      Combination screening in PRISM requires careful selection of drug doses which can be especially difficult in a pooled context. Therefore, it is only recommended to use this assay for test agents that have been screened in PRISM before as single agents. When selecting an anchor dose our recommendation is to select a dose that does not broadly affect cell viability but gives a reproducible phenotypic effect in a specific cell line or set of cell lines. Compounds are plated by Echo into plates and frozen prior to cell treatment. Cells are then thawed and plated onto the compound assay ready plates (ARP’s).
                      <br><br>
                      For more information, review the
                      <icon-link 
                      href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" 
                      target="_blank" 
                      text="CPS white paper"
                    />
                      and explore our 
                      <icon-link 
                      href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" 
                      target="_blank" 
                      text="public dataset"
                    /> on the portal.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>
    
                <v-expansion-panel  elevation="0">
                  <v-expansion-panel-title>
                   <div>
                    <h2 class="text-h5 expansion-panel-title">APS (Aqueous PRISM Screen)</h2>
                    <h3 class="expansion-panel-subtitle">Test agents dissolved in aqueous buffers: Antibodies, ADCs, growth-inhibiting cytokines, peptides and other aqueous test agents</h3>
                   </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-1">
                      For the aqueous assay, we plate the cells first into 384-well plates and then ECHO transfer the aqueous agents. This method gives us the highest quality data and does not freeze the aqueous reagents. 
                      <br><br>
                      For more information, review the
                      <icon-link 
                        href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" 
                        text="ADC white paper"
                      />
                      and explore our 
                      <icon-link 
                        href="https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" 
                        text="public dataset"
                      /> on the portal.
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>
    
                <v-expansion-panel  elevation="0">
                  <v-expansion-panel-title>
                    <div>
                      <h2 class="text-h5 expansion-panel-title">EPS (Extended day PRISM Screen)</h2>
                      <h3 class="expansion-panel-subtitle">Small molecule single agents</h3>
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p class="text-body-1">
                      For the extended day PRISM screen, small molecules are plated onto 96-well plates and frozen. Cell pools are plated on assay ready plates on day 0 and drug is re-added on day 6. Cell pools are lysed on day 10, gDNA is then PCR’ed and then sequenced. 
                    </p>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
              </section>

            </v-col>
          </v-row>
        </v-container>

        <section>
          <page-gradient class="pa-16 pb-8  mt-16" background="gradient-dark">
            <container-sm>
              <h2 class="text-h3 font-weight-bold text-white">Interested in submitting?</h2>
              <p class="text-h4  text-white">Checkout the 
                <icon-link 
                href="https://theprismlab.org/portal/submissions"  
                text="PRISM submission hub" 
                color="primary-lighten-2"
                />
              </p>


            </container-sm>                 
          </page-gradient>
        </section>


    </page>
    </template>
      
    <script>
      export default {
        name: 'Assays',
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
            ],
            table: {
                headers: [
                    { text: 'Screen', value: 'screen', class: 'td-0' },
                    { text: 'Test Agents', value: 'test agents' },
                    { text: '# of Cell Lines', value: 'num_cell_lines' },
                    { text: 'Dose Scheme', value: 'dose scheme' },
                    { text: 'Time-Point', value: 'time-point' },
                ],
                items: [
                    {
                        screen: 'MTS',
                        'test agents': 'Small molecule single agents',
                        'num_cell_lines': 900,
                        'dose scheme': `8-point dose, 3-fold dilution`,
                        'time-point': '5-day',
                    },
                    {
                        screen: 'CPS',
                        'test agents': 'Small molecule combinations',
                        'num_cell_lines': 900,
                        'dose scheme': `7-point dose, 3-fold dilution of treatment test agent and 1 dose of anchor test agent alone and in combination`,
                        'time-point': '5-day',
                    },
                    {
                        screen: 'APS',
                        'test agents': 'Antibodies, ADCs, growth-inhibiting cytokines, peptides',
                        'num_cell_lines': 900,
                        'dose scheme': `Single dose or custom dose`,
                        'time-point': '5-day',
                    },
                    {
                        screen: 'EPS',
                        'test agents': 'Small molecule single agents',
                        'num_cell_lines': 900,
                        'dose scheme': `Single dose or custom dose`,
                        'time-point': '10-day',
                    },
                ],
            },
          }
        }
      }
    </script>
    <style>
    .td-0{
      border-right: 1px solid #e0e0e0;
      font-weight: 600 !important;
    } 
    /* .td-1{
      color: var(--v-primary-lighten-1) !important;
    } */
     tr{
      font-size: 0.8rem !important;
     
     }
     td{
      padding-top:6px !important;
      padding-bottom:6px !important;
     }


    .v-expansion-panel{
      margin: 0px !important;
      /* padding: 0px 0px 12px 0px !important; */
      /* background-color: var(--v-primary-lighten-5) !important; */
    }
    .v-expansion-panel-title{
      padding: 16px 16px 0px 16px !important;
    }
    .expansion-panel-title{
      margin:0px !important; 
      font-weight: 600 !important;
    }
    .expansion-panel-subtitle{
      padding: 0px 0px 16px 0px !important;
      margin:0px !important;
      font-weight: 400 !important;
      color: var(--v-primary-lighten-1) !important;
      font-size: 0.875rem !important;
      max-width: 450px;
      line-height: 1.5em !important;
    }
    /* h3{
      font-weight:700 !important;
      line-height:1.5em !important;
    } */
    </style>