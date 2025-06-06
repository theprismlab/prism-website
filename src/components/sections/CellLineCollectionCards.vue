<template>
    <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
            <v-card class="pa-2 fill-height" style="background: none;" elevation="0" variant="outlined" color="primary-accent-2">
                <v-card-item class="d-flex align-center justify-center">
                    <h2 style="opacity: 1 !important;  line-height: 1.2em !important;" class="text-h2 font-weight-bold">{{card.title}}</h2>
                    <h3 style="opacity: 1 !important; line-height: 1.4em !important;" class="text-overline text-primary-accent-1 text-none font-weight-black" v-html="card.subtitle"></h3>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHexagonMultiple } from '@mdi/js';
import { mdiFileMultipleOutline } from '@mdi/js';
import { mdiAccountGroup } from '@mdi/js';

export default {
    name: "CellLineCollectionCards",
    components: {
        SvgIcon
    },
    data() {
        return {
            cards: [
                {
                    title: "900+",
                    subtitle: "Cancer cell lines",
                    text: "",
                    iconPath: ""
                },
                {
                    title: "45+",
                    subtitle: "Lineages",
                    text: "",
                    iconPath: "" 
                },
                {
                    title: "80+",
                    subtitle: "Subtypes",
                    text: "",
                    iconPath: ""
                },
                {
                    title: "100+",
                    subtitle: "Hematopoietic /<br> Pediatric",
                    text: "",
                    iconPath: ""
                },
            ]
        }
    }
}
</script>
<style scoped>
/* .v-card{
    border-radius: px;
    background-color: transparent !important;
}
.v-card-title{
    font-size: var(--body-2-size) !important;
    padding-bottom: 2px;
}
.v-card-subtitle{
    padding-left:42px;
    font-size: var(--body-2-size) !important;
    color: white !important;
} */


</style>