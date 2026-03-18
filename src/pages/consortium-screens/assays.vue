<template>
    <page id="" class="mb-0">
        <container-sm>
            <page-title>Assays</page-title>
                <p class="text-body-1">
                    Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality data, validation compounds are run on each assay plate.
                </p>
        </container-sm>
        <container-sm class="mb-12">
            <v-expansion-panels v-model="expandedRows" variant="accordion" class="assays-accordion">
                <v-expansion-panel
                    v-for="item in table.items"
                    :key="item.id"
                    :value="item.id"
                    class="assay-panel"
                >
                    <v-expansion-panel-title>
                        <v-row class="assay-panel__title" align="start">
                            <v-col cols="12" md="12" class="pa-0">
                                <div class="screen-row">
                                    <img :src="imgPath + 'Thumbnail_' + item.screen + '.svg'" :alt="item.screen + ' thumbnail'" class="avatar" />
                                    <div class="ml-3">
                                        <div class="value value-title">{{ item.screen }}</div>
                                        <div class="value value-subtitle">{{ item.test_agents }}</div>
                                    </div>
                                </div>
                            </v-col>

                         
                        </v-row>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="assay-panel__text py-4">
                        <v-row class="assay-panel__content pb-0" align="start" justify="space-around">
                            <v-col cols="12" md="10">
                                <div class="section-title mb-0">{{ item.screen }} Workflow</div>
                            </v-col>
                                <div class="media">
                                    <img :src="imgPath + item.image" class="media__img" />
                                </div>
                            <v-col cols="12" md="10">
                                <div class="section-title">Details</div>
                                <p class="description mb-0" v-html="item.description"></p>
                            </v-col>
                        </v-row>
                        <v-row class="assay-panel__content" align="start" justify="space-around">
                            <v-col cols="12" md="10">
                                <v-row justify="space-between">
                                    <v-col cols="12" md="5" lg="5" sm="12" xs="12">
                                        <div class="label">Dose scheme</div>
                                        <div class="value" v-html="item.dose_scheme"></div>
                                    </v-col>
                                    <v-col cols="12" md="3" lg="3" sm="12" xs="12">
                                        <div class="label">Time-point</div>
                                        <div class="value">{{ item.time_point }}</div>
                                    </v-col>
                                    <v-col cols="12" md="4" lg="4" sm="12" xs="12">
                                        <div class="label">Cell lines</div>
                                        <div class="value">{{ item.num_cell_lines }}</div>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </container-sm>
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
                        'image': 'PRISM_Assay_Workflow_MTS.png'
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
                        'image': 'PRISM_Assay_Workflow_CPS.png'
                    },
                    {   'id': "APS",
                        'screen': 'APS',
                        'test_agents': 'Antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `For the aqueous assay, we plate the cells first into 384-well plates and then ECHO transfer the aqueous agents. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, review the <a href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" target="_blank">ADC white paper</a>  and explore our <a href="https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" target="_blank">public dataset</a>  on the portal.`,
                        'image': 'PRISM_Assay_Workflow_APS.png'
                    },
                    {   'id': "AIR",
                        'screen': 'AIR',
                        'test_agents': 'Antibodies (IgG isotype, containing human or humanized Fc region)',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `For more information, review the <a href="https://assets.clue.io/prism/Overview-of-PRISM-AIR-Assay-for-Collaborators.pdf" target="_blank">AIR overview slides</a>`,
                        'image': 'PRISM_Assay_Workflow_AIR.png'
                    },
                    {
                        'id': "EPS",
                        'screen': 'EPS',
                        'test_agents': 'Small molecule single agents',
                        'num_cell_lines': '+500',
                        'dose_scheme': `5-pt dose, custom dilution `,
                        'time_point': '10-day',
                        'description': 'For the extended day PRISM screen, small molecules are plated onto 96-well plates and frozen. Cell pools are plated on assay ready plates on day 0 and drug is re-added on day 6. Cell pools are lysed on day 10, gDNA is then PCR’ed and then sequenced.',
                        'image': 'PRISM_Assay_Workflow_EPS.png'
                    },
                ],
            },
        };
    },
    mounted() {
   
    },
    computed: {
    imgPath() {
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "images/assay/" : "../../public/images/assay/"
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
    --assay-label-color: var(--v-grey-darken-1);
    --assay-avatar-size: 65px;
    --assay-avatar-pad: 4px;
    --assay-pad: 12px;
    --assay-gap: 0px;
    --assay-border: 1px solid rgba(240, 240, 240, 1);
    --assay-bg: linear-gradient(0deg, rgb(250, 250, 250) 0%, rgb(252, 252, 252) 40%);
    --assay-bg-dark: linear-gradient(0deg, rgb(243, 243, 243) 0%, rgb(246, 246, 246) 40%);
    border: var(--assay-border);
    background: var(--assay-bg);
    overflow: hidden;
    box-shadow:
        0 10px 24px rgba(50, 50, 50, 0.08);
}

.v-expansion-panel-title:not(.v-expansion-panel-title--static){
    background: var(--assay-bg);
    border-bottom: var(--assay-border);
    border-left: var(--assay-border);
    border-right: var(--assay-border);
}

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
    background: var(--assay-bg-dark);
    border-bottom: var(--assay-border);
}

/* spacing between panel buttons */
.assay-panel + .assay-panel {
    margin-top: 8px;
}

.assay-panel__content {
    padding: var(--assay-pad);
}

.assay-panel__title {
    padding: var(--assay-pad);
}


.label {
 font-size: 0.8rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    margin-bottom: 6px;
    color: var(--assay-label-color);
    margin-bottom: 6px;
}

.value {
    font-size: 0.95rem;

    line-height: 1.4;
}

.value-title{
    font-size: 1.15rem;
    font-weight: 700;

}

.screen-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar {
    width: var(--assay-avatar-size);
    height: var(--assay-avatar-size);
    object-fit: contain;
    padding: var(--assay-avatar-pad);
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 10px;

}

.description {
    font-size: 1rem;
    line-height: 1.65;
    margin: 0;
}

.media-title {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 10px;
}
.media {
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    overflow: hidden;
}

.media__img {
    height: auto;
    width: 100%;
    display: block;
}
@media (max-width: 960px) {
    .assay-panel__title,
    .assay-panel__content {
        padding: 12px;
    }
    
}
</style>