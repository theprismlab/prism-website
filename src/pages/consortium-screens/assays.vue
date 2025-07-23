<template>
    <page id="" class="mb-0" style="min-height: 200vh;">
        <container-sm>
            <page-title>Assays</page-title>
                <p class="text-body-1">
                    Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality data, validation compounds are run on each assay plate.
                </p>
        </container-sm>
        <container-md>
            <v-data-table
            fixed-header
                :headers="table.headers"
                :items="table.items"
                item-key="id"
                class="elevation-1"
                show-expand
                :expanded.sync="expandedRows"
                @click:row="handleRowClick"
                >
                <template v-slot:item.dose_scheme="{ item }">
                    <span v-html="item['dose_scheme']"></span>
                </template>
                <template v-slot:expanded-row="{ columns, item }">
                <tr :class="{ 'expanded-blue-row': expandedRows.includes(item.id) }">
                    <td :colspan="columns.length">
                        <v-row class="justify-center">
                            <v-card class="pa-3" max-width="800px" flat>
                            <v-card-item >
                                <h3 class="text-h4 font-weight-bold text-center">{{ item.screen }} workflow</h3>
                                <v-img :src="imgPath + item.image" max-height="300px" class="mb-2"></v-img>
                            <p class="text-body-2"  style="margin:auto;" v-html="item.description"></p>
                            </v-card-item>
                           
                            </v-card>
                        </v-row>
                     
                    </td>
                </tr>
                </template>
                <template v-slot:item.data-table-expand="{ toggleExpand, isExpanded, item, internalItem }">
                                      <v-icon
                      :class="{'blue--text': isExpanded(internalItem)}"
                      @click="toggleExpand(internalItem)"
                    >
                      {{ isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </template>
            </v-data-table>
        </container-md>
    </page>
</template>
<script>

export default {
    name: 'Assays',
    data() {
        return {
            expandedRows: [],
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
                        'test_agents': 'small molecule single agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': 'We screen standard DMSO compounds at a top dose of your choice, diluted 3-fold over 8 dilutions. Compounds are plated with an Echo using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s).',
                        'image': 'workflow-01.png'
                    },
                    {
                        'id': "CPS",
                        'screen': 'CPS',
                        'test_agents': 'small molecule combinations',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `<ul>
                            <li>7-point dose, 3-fold dilution (treatment agent)</li>
                            <li>1-point dose (anchor agent)</li>
                            <li>Test agents are screened at dose alone and in combination</li>
                        </ul>`,
                        'time_point': '5-day',
                        'description': 'Combination screening in PRISM requires careful selection of drug doses which can be especially difficult in a pooled context. Therefore, it is only recommended to use this assay for test agents that have been screened in PRISM before as single agents. When selecting an anchor dose our recommendation is to select a dose that does not broadly affect cell viability but gives a reproducible phenotypic effect in a specific cell line or set of cell lines. <a href="https://theprismlab.org/white-papers/multiplexed-cancer-cell-line-combination-screening-using-prism" target="_blank">CPS white paper</a>  and explore our <a href="https://theprismlab.org/portal/projects/CPS009/CPS_WHITEPAPER/compounds" target="_blank">public dataset</a>  on the portal. Compounds are plated by Echo into plates and frozen prior to cell treatment. Cells are then thawed and plated onto the compound assay ready plates (ARP’s).',
                        'image': 'workflow-02.png'
                    },
                    {   'id': "APS",
                        'screen': 'APS',
                        'test_agents': 'antibodies, ADCs, growth-inhibiting cytokines, aqueous test agents',
                        'num_cell_lines': '~900 (full PRISM cell set)',
                        'dose_scheme': `8-point dose, 3-fold dilution`,
                        'time_point': '5-day',
                        'description': `For the aqueous assay, we plate the cells first into 384-well plates and then ECHO transfer the aqueous agents. This method gives us the highest quality data and does not freeze the aqueous reagents. For more information, review the <a href="https://theprismlab.org/white-papers/prism-high-throughput-screening-of-antibody-drug-conjugates-uncovers-clinically-relevant-targets" target="_blank">ADC white paper</a>  and explore our <a href="https://theprismlab.org/portal/projects/MRSN001/ADC_WHITEPAPER/compounds" target="_blank">public dataset</a>  on the portal.`,
                        'image': 'workflow-03.png'
                    },
                    {
                        'id': "EPS",
                        'screen': 'EPS',
                        'test_agents': 'small molecule single agents',
                        'num_cell_lines': 900,
                        'dose_scheme': `Single dose or custom dose`,
                        'time_point': '10-day',
                        'description': 'For the extended day PRISM screen, small molecules are plated onto 96-well plates and frozen. Cell pools are plated on assay ready plates on day 0 and drug is re-added on day 6. Cell pools are lysed on day 10, gDNA is then PCR’ed and then sequenced.',
                        'image': 'workflow-04.png'
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
        handleRowClick(item, event) {
            // console.log(item, event)
            //   // Remove 'selected' class from all rows
            //     document.querySelectorAll('tr[data-row-id]').forEach(row => {
            //     row.classList.remove('selected');
            //     });
            //     // Add 'selected' class to the clicked row
            //     const row = event.currentTarget;
            //     if (row) row.classList.add('selected');
            // Keep only the clicked row in the expandedRows array
            if (this.expandedRows.includes(event.item.id)) {
                // Collapse the row if it's already expanded
                this.expandedRows = [];
            } else {
                // Expand the clicked row and collapse others
                this.expandedRows = [event.item.id];
            }
        },
    }
};
</script>

<style>
.v-data-table {
    margin-top: 16px;

}
.v-data-table th {
    font-weight: 800 !important;
}
.v-data-table td {
    padding: 12px !important;
}
.v-card {
    min-height:300px !important;
}

/* Disable pointer events for the expand button */
.v-data-table__expand-icon {
    pointer-events: none !important;
}

</style>