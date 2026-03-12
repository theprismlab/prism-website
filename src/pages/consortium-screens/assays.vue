<template>
    <page id="" class="mb-0">
        <container-xs>
            <page-title>Assays</page-title>
                <p class="text-body-1">
                    Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality data, validation compounds are run on each assay plate.
                </p>
        </container-xs>
        <container-md class="mb-12">
            <v-expansion-panels v-model="expandedRows" variant="accordion" class="assays-accordion">
                <v-expansion-panel
                    v-for="item in table.items"
                    :key="item.id"
                    :value="item.id"
                >
                    <v-expansion-panel-title>
                        <v-row class="align-center" no-gutters>
                            <v-col cols="12" md="2" class="text-subtitle-1 font-weight-bold">
                                {{ item.screen }}
                            </v-col>
                            <v-col cols="12" md="4" class="text-body-2">
                                {{ item.test_agents }}
                            </v-col>
                            <v-col cols="12" md="3" class="text-body-2">
                                <span v-html="item.dose_scheme"></span>
                            </v-col>
                            <v-col cols="6" md="2" class="text-body-2">
                                {{ item.time_point }}
                            </v-col>
                            <v-col cols="6" md="1" class="text-body-2">
                                {{ item.num_cell_lines }}
                            </v-col>
                        </v-row>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="justify-center">
                            <v-card class="pa-3" flat>
                                <v-card-item>
                                    <h3 class="text-h4 font-weight-bold text-center">{{ item.screen }} workflow</h3>
                                    <img :src="imgPath + item.image" class="mb-2 row-img" />
                                    <p class="text-body-2" style="margin:auto; max-width:800px;" v-html="item.description"></p>
                                </v-card-item>
                            </v-card>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </container-md>
    </page>
</template>
<script>

export default {
    name: 'Assays',
    data() {
        return {
            expandedRows: null,
            table: {
                // groupBy:  [{ key: 'screen', order: 'asc' }],
                headers: [
                    { title: 'Screen', key: 'screen', width: '10%', minWidth: '100px' },
                    { title: 'Test Agents', key: 'test_agents', width: '30%', minWidth: '200px'  },
                    { title: 'Dose Scheme', key: 'dose_scheme', width: '30%', minWidth: '100px'  },
                    { title: 'Time-Point', key: 'time_point', width: '15%', minWidth: '100px'  },
                    { title: '# of Cell Lines', key: 'num_cell_lines',  width: '15%', minWidth: '100px'  },
                ],
                items: [
                    {
                        'id': "MTS",
                        'screen': 'MTS',
                        'test_agents': 'Small molecule single agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': 'We screen standard DMSO compounds at a top dose of your choice, diluted 3-fold over 8 dilutions. Compounds are plated with an Echo using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s).',
                        'image': 'PRISM Cell Line Workflow_MTS.png'
                    },
                    {
                        'id': "CPS",
                        'screen': 'CPS',
                        'test_agents': 'Small molecule combinations',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `<ul>
                            <li>7-point dose, 3-fold dilution (treatment agent)</li>
                            <li>1-point dose (anchor agent)</li>
                            <li>Test agents are screened at dose alone and in combination</li>
                        </ul>`,
                        'time_point': '5-day',
                        'description': 'Combination screening in PRISM requires careful selection of drug doses which can be especially difficult in a pooled context. Therefore, it is only recommended to use this assay for test agents that have been screened in PRISM before as single agents. When selecting an anchor dose our recommendation is to select a dose that does not broadly affect cell viability but gives a reproducible phenotypic effect in a specific cell line or set of cell lines. <a href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" target="_blank">CPS white paper</a>  and explore our <a href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" target="_blank">public dataset</a>  on the portal. Compounds are plated by Echo into plates and frozen prior to cell treatment. Cells are then thawed and plated onto the compound assay ready plates (ARP’s).',
                        'image': 'PRISM Cell Line Workflow_CPS.png'
                    },
                    {   'id': "APS",
                        'screen': 'APS',
                        'test_agents': 'Antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `For the aqueous assay, we plate the cells first into 384-well plates and then ECHO transfer the aqueous agents. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, review the <a href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" target="_blank">ADC white paper</a>  and explore our <a href="https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" target="_blank">public dataset</a>  on the portal.`,
                        'image': 'PRISM Cell Line Workflow_APS.png'
                    },
                    {   'id': "AIR",
                        'screen': 'AIR',
                        'test_agents': 'Antibodies (IgG isotype, containing human or humanized Fc region)',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `TBD...... For more information, review the <a href="https://assets.clue.io/prism/Overview-of-PRISM-AIR-Assay-for-Collaborators.pdf" target="_blank">AIR overview slides</a>`,
                        'image': 'PRISM Cell Line Workflow_AIR.png'
                    },
                    {
                        'id': "EPS",
                        'screen': 'EPS',
                        'test_agents': 'Small molecule single agents',
                        'num_cell_lines': '+500',
                        'dose_scheme': `5-pt dose, custom dilution `,
                        'time_point': '10-day',
                        'description': 'For the extended day PRISM screen, small molecules are plated onto 96-well plates and frozen. Cell pools are plated on assay ready plates on day 0 and drug is re-added on day 6. Cell pools are lysed on day 10, gDNA is then PCR’ed and then sequenced.',
                        'image': 'PRISM Cell Line Workflow_EPS.png'
                    },
                ],
            },
        };
    },
    mounted() {
   
    },
    computed: {
    imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/" : "../../public/images/"
        },
    },
    watch: {

        
    },
    methods: {
        // clickColumn(slotData) {
        // const indexRow = slotData.index;
        // const indexExpanded = this.expanded.findIndex(i => i === slotData.item);
        // if (indexExpanded > -1) {
        //     this.expanded.splice(indexExpanded, 1)
        // } else {
        //     this.expanded.push(slotData.item);
        // }
        // },
    }
};
</script>

<style scoped>
.assays-accordion {
    margin-top: 16px;
}
.v-card {
    min-height:300px !important;
}

.row-img{
    max-height:250px !important;
}
</style>