<template>
    <v-card elevation="0" variant="tonal"  color="cyan-lighten-4" class="pa-5 pb-7">
        <div v-for="item in agreements" :key="item.title" class="mt-2">
            <h3 class="text-h5 d-flex align-center justify-start text-cyan-darken-1">
            <svg-icon :path="item.path"  type="mdi" :size="item.size"  class="mr-2"></svg-icon>
            {{item.title}}
            </h3>
            <p class="text-grey-darken-2 text-body-2 ml-8">{{item.text}}</p>
        </div>
    </v-card>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDatabaseOutline } from '@mdi/js';
import { mdiFileMultipleOutline } from '@mdi/js';
import { mdiLightbulbOnOutline } from '@mdi/js';
export default {
    name: "CollaborateCard",
    components: {
        SvgIcon
    },
    props:{

    },
    data() {
        return {
            
            agreements: [
                {
                    title: "Data Ownership",
                    text: "PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform. The structure and identity of your compound will not be shared with us. Unique identifiers are given to all test agents.",
                    path: mdiDatabaseOutline,
                    size: 24
                },
                {
                    title: "Intellectual Property",
                    text: "Non-exclusive royalty-free licenses are granted.",
                    path: mdiLightbulbOnOutline,
                    size: 26
                },
                {
                    title: "Publication",
                    text: "Data may be jointly published when both partners agree.",
                    path: mdiFileMultipleOutline,
                    size: 20
                },
            ]
        }
    }
}
</script>
<style scoped>
    .v-card {
        border: 1px solid var(--v-cyan-lighten-4);
    }


</style>