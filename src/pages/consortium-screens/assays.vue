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
                    class="assay-panel"
                >
                    <v-expansion-panel-title>
                        <v-row class="align-top assay-panel__header" no-gutters>
                            <v-col cols="12" md="2" class="assay-panel__cell assay-panel__cell--screen">
                                <div class="assay-panel__label">Screen</div>
                                <div class="assay-panel__value assay-panel__value--screen">{{ item.screen }}</div>
                            </v-col>
                            <v-col cols="12" md="3" class="assay-panel__cell">
                                <div class="assay-panel__label">Test agents</div>
                                <div class="assay-panel__value">{{ item.test_agents }}</div>
                            </v-col>
                            <v-col cols="12" md="3" class="assay-panel__cell">
                                <div class="assay-panel__label">Dose scheme</div>
                                <div class="assay-panel__value" v-html="item.dose_scheme"></div>
                            </v-col>
                            <v-col cols="6" md="2" class="assay-panel__cell">
                                <div class="assay-panel__label">Time-point</div>
                                <div class="assay-panel__value">{{ item.time_point }}</div>
                            </v-col>
                            <v-col cols="6" md="2" class="assay-panel__cell">
                                <div class="assay-panel__label">Cell lines</div>
                                <div class="assay-panel__value">{{ item.num_cell_lines }}</div>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-row class="justify-center">
                            <v-col>
                                <h3 class="text-h4 font-weight-bold text-center">{{ item.screen }} workflow</h3>
                                <img :src="imgPath + item.image" class="mb-2 row-img" />
                                <p class="text-body-2" style="margin:auto; max-width:800px;" v-html="item.description"></p>
                            </v-col>
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

    }
};
</script>

<style scoped>

.assay-panel {
    border: 1px solid rgba(9, 36, 64, 0.12);
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(245, 250, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 60%);
    box-shadow:
        0 10px 24px rgba(9, 36, 64, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.assay-panel + .assay-panel {
    margin-top: 8px;
}
.assay-panel__header {
    padding: 18px 12px;
}


.assay-panel__label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(9, 36, 64, 0.55);
    margin-bottom: 6px;
}
.assay-panel__value {
    font-size: 0.95rem;
    color: #0b2340;
    line-height: 1.4;
}
.assay-panel__value--screen {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0b3a66;
}
.assay-panel__body {
    background: none !important;
    border-top: 1px solid rgba(9, 36, 64, 0.08);
}


.row-img{
    max-height:250px !important;
}

@media (max-width: 960px) {
    .assay-panel__header {
        padding: 12px 8px;
    }
    .assay-panel__cell {
        border-left: none;
        border-top: 1px solid rgba(9, 36, 64, 0.08);
    }
    .assay-panel__cell:first-child {
        border-top: none;
    }
}
</style>