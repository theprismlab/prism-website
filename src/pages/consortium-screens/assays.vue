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
                        <v-row class="assay-panel__title" align="center" justify="start">
                            <img :src="imgPath + 'Thumbnail_' + item.screen + '.svg'" :alt="item.screen + ' thumbnail'" class="assay-avatar" />
                            <div class="assay-header">
                                <div class="assay-name text-h5">{{ item.screen }} - {{ item.screen_full }}</div>
                                <div class="assay-text-agents">{{ item.test_agents }}</div>
                            </div>
                            <div class="assay-time-point">{{ item.time_point }}</div>
                         
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
                                <p class="text-body-2 mb-0" v-html="item.description"></p>
                            </v-col>
                        </v-row>
                        
                        <v-row class="assay-panel__content" align="start" justify="space-around">
          
                            <v-col cols="12" md="10">
                                <v-row justify="start">
                                    <v-col cols="auto" md="6">
                                        <div class="label">Dose scheme</div>
                                        <div class="text-body-2" v-html="item.dose_scheme"></div>
                                    </v-col>
                                    <v-col cols="auto">
                                        <div class="label">Cell lines</div>
                                        <div class="text-body-2">{{ item.num_cell_lines }}</div>
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
                        'screen_full': 'Medium Throughput Screen',
                        'test_agents': 'Small molecule single agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': 'DMSO-soluble small molecules are plated with an Echo Acoustic Liquid handler using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s).',
                        'image': 'PRISM_Assay_Workflow_MTS.png'
                    },
                    {
                        'id': "CPS",
                        'screen': 'CPS',
                        'screen_full': 'Combination PRISM Screen',
                        'test_agents': 'Small molecule combinations',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `<ul>
                            <li>7-point dose, 3-fold dilution (treatment agent)</li>
                            <li>1-point dose (anchor agent)</li>
                            <li>Test agents are screened at dose alone and in combination</li>
                        </ul>`,
                        'time_point': '5-day',
                        'description': `Like the 5-day, single agent assay, DMSO-soluble small molecules in combination are plated with an Echo Acoustic Liquid handler using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s). For more information, review the <a href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" target="_blank">CPS white paper</a> and explore our <a href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" target="_blank">public dataset</a> on the PRISM Portal.`,
                        'image': 'PRISM_Assay_Workflow_CPS.png'
                    },
                    {   'id': "APS",
                        'screen': 'APS',
                        'screen_full': 'Aqueous PRISM Screen',
                        'test_agents': 'Antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `Cells are plated first into 384-well plates followed by the Echo transfer of aqueous test agents. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, review the <a href='https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets' target='_blank'>ADC white paper</a> and explore our <a href='https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds' target='_blank'>public dataset</a> on the PRISM Portal.`,
                        'image': 'PRISM_Assay_Workflow_APS.png'
                    },
                    {   'id': "AIR",
                        'screen': 'AIR',
                        'screen_full': 'Antibody Internalization Reporter',
                        'test_agents': 'Antibodies (IgG isotype, containing human or humanized Fc region)',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        
                        'description': `Unconjugated antibodies are first mixed with a cytotoxic payload via a secondary drug-conjugate prior to screening. Like the APS assay, cells are then plated into 384-well plates followed by the Echo transfer of test agents. For more information, review the <a href='https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets' target='_blank'>ADC white paper</a> and explore our <a href='https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds' target='_blank'>public dataset</a> on the PRISM Portal.`,
                        'image': 'PRISM_Assay_Workflow_AIR.png'
                    },
                    {
                        'id': "EPS",
                        'screen': 'EPS',
                        'screen_full': 'Extended PRISM Screen',
                        'test_agents': 'Small molecule single agents',
                        'num_cell_lines': '+500',
                        'dose_scheme': `5-pt dose, custom dilution `,
                        'time_point': '10-day',
                        'description': `For the extended day assay, DMSO-soluble small molecules are plated into 96-well plates and then frozen. Cell pools are plated on assay ready plates on day 0, and drug is re-added on day 6. Cell pools are lysed on day 10, after which gDNA is PCR'ed and then sequenced.`,
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
    --assay-time-point-color: var(--v-cyan-darken-1);
        --assay-time-point-color: var(--v-primary-darken-2);
        --assay-time-point-color: var(--v-secondary-darken-2);
        --assay-time-point-color: var(--v-grey);
        --assay-time-point-color: var(--v-blue-lighten-2);


    --assay-time-point-font-size: 0.9rem;
    --assay-time-point-font-weight: 400;
    --assay-label-color: var(--v-grey-darken-1);
    --assay-avatar-size: 65px;
    --assay-avatar-pad: 4px;
    --assay-pad: 16px 32px 16px 12px;
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

.assay-panel__content,
.assay-panel__title {
    padding: var(--assay-pad);
}

.assay-panel__title {
    display: flex;
    align-items: center;
    gap: 10px;
}

.label {
    font-weight:400;
    color: var(--assay-label-color);
    font-size: 0.9rem !important;
    text-transform: uppercase !important;

}

.value {
    font-size: 0.95rem;
    line-height: 1.4;
}

.assay-avatar {
    width: var(--assay-avatar-size);
    height: var(--assay-avatar-size);
    object-fit: contain;
    padding: var(--assay-avatar-pad);
}
.assay-name{
    font-size: 1.1rem;
    line-height:1.4em;
    font-weight: 600;
    margin-bottom:0.25em;
}
.assay-text-agents{
    font-size: 1rem;
    line-height:1.4em;
    font-weight: 400;
    color: var(--v-grey-darken-1);
 
}
.assay-time-point{
    color: var(--v-primary-darken-1);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
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

/* Fixed size — won't grow or shrink */
.assay-avatar {
    flex: 0 0 65px;          /* flex-grow: 0, flex-shrink: 0, flex-basis: 65px */
}

/* Fills remaining space */
.assay-header {
    flex: 1 1 0;             /* grows to fill, shrinks if needed */
    min-width: 0;            /* allows text truncation */
}

/* Fixed size, won't shrink */
.assay-time-point {
    flex:  0 0 67px;             /* grows to fill, shrinks if needed */
    min-width: 0; 
    text-align: right;
}
@media (max-width: 960px) {
    .assay-panel__title,
    .assay-panel__content {
        /* padding: 12px 24px 12px 6px; */
        /* padding:12px; */
    }
}
@media (max-width: 600px) {

}
</style>