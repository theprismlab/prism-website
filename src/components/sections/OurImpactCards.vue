<template>
    <v-row class="mt-6 mb-6">
        <v-col v-for="(card, index) in cards" :key="card.title" cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
            <v-card class="pa-2 fill-height d-flex align-center justify-center flex-column" align="center" elevation="1">
                <v-card-item>
                    <div :id="`icon-circle-${index}`" class="icon-circle pa-6 d-flex align-center justify-center">
                        <svg-icon size="54" type="mdi" :path="card.iconPath"></svg-icon>
                    </div>
                    <h2 style="line-height: 1.2em !important;" class="text-h2 font-weight-light">{{card.title}}</h2>
                    <h3 style="opacity: 1; line-height: 1.4em !important;" class="text-body-2 text-none font-weight-normal text-grey-darken-1" v-html="card.subtitle"></h3>
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
    name: "OurImpactCards",
    components: {
        SvgIcon
    },
    data() {
        return {
            cards: [
                {
                    title: "150+",
                    subtitle: "Academic and industry partners",
                    text: "",
                    iconPath: mdiAccountGroup 
                   
                },
                {
                    title: "7,000+",
                    subtitle: "Compounds screened in over 500 cell lines",
                    text: "",
                    iconPath: mdiHexagonMultiple
                },
                {
                    title: "40+",
                    subtitle: "Publications in high-impact journals",
                    text: "",
                    iconPath: mdiFileMultipleOutline
                },

          
            ]
        }
    }
}
</script>
<style scoped>
.icon-circle{
    background-color: var(--v-primary-lighten-5);
    border-radius: 50%;
    width:100px;
    height:100px;
    color:white ;
}
#icon-circle-0{
    background-color: var(--v-red-accent-2) !important;
}
#icon-circle-1{
    background-color: var(--v-secondary-accent-4) !important;
}
#icon-circle-2{
    background-color: var(--v-teal-accent-4) !important;
}

.icon-block{
    background-color: var(--v-primary-accent-1) !important;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    color:var(--v-primary-accent-2) !important; ;
}

</style>