<template>
    <page id="" class="mb-0">
        <v-container>
            <v-row class="mb-4 mt-4">
                <v-col cols="12" xs="12" sm="12" md="8" lg="8" xl="8" offset-sm="0" offset-md="2" offset-lg="2" offset-xl="2">
                    <page-title>Assays</page-title>
                    <p class="text-body-1">
                        Our viability assays are performed using ~900 PRISM barcoded cell lines plated in mixtures in 384- or 96-well plates at either 5- or 10-day assay timepoints. To ensure high-quality data, validation compounds are run on each assay plate.
                    </p>
                    <section>
                        <v-data-table
                            :headers="table.headers"
                            :items="table.items"
                            item-key="id"
                            item-value="id"
                            class="elevation-1"
                            show-expand
                            :single-expand="true"
                            >
                            <template
                            v-slot:expanded-row="{ columns, item, isExpanded, toggleExpand }"
                            >
                            <tr>
                                <td :colspan="columns.length">
                                    <p class="test-body-2" v-html="item.description"> </p>
                                </td>
                            </tr>
                            </template>


                        </v-data-table>
                    </section>
                </v-col>
            </v-row>
        </v-container>
    </page>
</template>

<script>
export default {
    name: 'Assays',
    data() {
        return {
            table: {
                groupBy:  [{ key: 'screen', order: 'asc' }],
                headers: [
                    { title: 'Screen', key: 'screen' },
                    { title: 'Test Agents', key: 'test agents' },
                    { title: '# of Cell Lines', key: 'num_cell_lines' },
                    { title: 'Dose Scheme', key: 'dose scheme' },
                    { title: 'Time-Point', key: 'time-point' },
                ],
                items: [
                    {
                        'id': 1,
                        'screen': 'MTS',
                        'test agents': 'Small molecule single agents',
                        'num_cell_lines': 900,
                        'dose scheme': `8-point dose, 3-fold dilution`,
                        'time-point': '5-day',
                        'description': 'We screen standard DMSO compounds at a top dose of your choice, diluted 3-fold over 8 dilutions. Compounds are plated with an Echo using acoustic transfer and frozen prior to cell plating. Cells are then thawed and plated onto compound assay ready plates (ARP’s).',
                    },
                    {
                        'id': 2,
                        'screen': 'CPS',
                        'test agents': 'Small molecule combinations',
                        'num_cell_lines': 900,
                        'dose scheme': `7-point dose, 3-fold dilution of treatment test agent and 1 dose of anchor test agent alone and in combination`,
                        'time-point': '5-day',
                        'description': 'Combination screening in PRISM requires careful selection of drug doses which can be especially difficult in a pooled context. Therefore, it is only recommended to use this assay for test agents that have been screened in PRISM before as single agents.',
                    },
                    {   'id': 3,
                        'screen': 'APS',
                        'test agents': 'Antibodies, ADCs, growth-inhibiting cytokines, peptides',
                        'num_cell_lines': 900,
                        'dose scheme': `Single dose or custom dose`,
                        'time-point': '5-day',
                        'description': 'For the aqueous assay, we plate the cells first into 384-well plates and then ECHO transfer the aqueous agents. This method gives us the highest quality data and does not freeze the aqueous reagents.',
                    },
                    {
                        'id': 4,
                        'screen': 'EPS',
                        'test agents': 'Small molecule single agents',
                        'num_cell_lines': 900,
                        'dose scheme': `Single dose or custom dose`,
                        'time-point': '10-day',
                        'description': 'For the extended day PRISM screen, small molecules are plated onto 96-well plates and frozen. Cell pools are plated on assay ready plates on day 0 and drug is re-added on day 6. Cell pools are lysed on day 10, gDNA is then PCR’ed and then sequenced.',
                    },
                ],
            },
        };
    },
    methods: {

    }
};
</script>

<style>
.v-data-table {
    margin-top: 16px;
}
.v-data-table th {
    font-weight: bold;
}
.v-data-table td {
    padding: 8px;
}
</style>