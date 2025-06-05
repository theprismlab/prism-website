<template>
    <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" xs="6" sm="6" md="4" lg="4" xl="4">
            <v-card class="pa-2 fill-height" style="background: none;" elevation="0" variant="outlined" color="primary-accent-2">
                <v-card-item>
                    <div class="d-flex align-center justify-start text-primary-accent-1 mb-2">
                        <!-- <div class="icon-circle mr-2 d-flex align-center justify-center">
                            <svg-icon  type="mdi" :path="card.iconPath"></svg-icon>
                        </div> -->
                        <svg-icon type="mdi" :path="card.iconPath" class="text-primary-accent-2 mr-4"></svg-icon>
                        <h2 style="line-height: 1.2em !important;" class="text-h2 text-primary-accent-2 font-weight-bold">{{card.title}}</h2>
                    </div>
                    <h3 style="opacity: 1; line-height: 1.4em !important;" class="text-overline text-primary-accent-2 text-none font-weight-medium" v-html="card.subtitle"></h3>
                </v-card-item>

                <!-- <v-card-item>
                    <div class="icon-block mr-2 d-flex align-center justify-center">
                        <svg-icon  type="mdi" :path="card.iconPath"></svg-icon>
                    </div>
                    <h2 style="line-height: 1.2em !important;" class="text-h2 text-primary-accent-2 font-weight-bold">{{card.title}}</h2>
                    <h3 style="opacity: 1; line-height: 1.4em !important;" class="text-overline text-primary-accent-2 text-none font-weight-medium" v-html="card.subtitle"></h3>
                </v-card-item> -->
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
                    iconPath: mdiHexagonMultiple
                },
                {
                    title: "7,000+",
                    subtitle: "Compounds screened in over 500 cell lines",
                    text: "",
                    iconPath: mdiAccountGroup 
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
    background-color: var(--v-primary-accent-2) !important;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color:white ;
}

.icon-block{
    background-color: var(--v-primary-accent-1) !important;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    color:var(--v-primary-accent-2) !important; ;
}

</style>