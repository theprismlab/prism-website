<template>
    <v-card elevation="0" variant="tonal"  color="teal-cyan-lighten-4" class="pa-5 pb-7">  
        <div v-for="card in cards" :key="card.title">
            <v-card-title class="d-flex align-center justify-start text-teal-cyan-darken-1">
            <v-icon size="medium" class="mr-2">{{ card.icon }}</v-icon>
            {{card.title}}
            </v-card-title>
            <v-card-subtitle class="text-grey-darken-4 mb-2">{{card.text}}</v-card-subtitle>
        </div>
    </v-card>
</template>
<script>
export default {
    name: "CollaborateCards",
    data() {
        return {
            cards: [
                {
                    title: "Data Ownership",
                    text: "PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform. The structure and identity of your compound will not be shared with us. Unique identifiers are given to all test agents.",
                    icon: "mdi-database"
                },
                {
                    title: "Intellectual Property",
                    text: "Non-exclusive royalty-free licenses are granted.",
                    icon: "mdi-head-snowflake"
                },
                {
                    title: "Publication",
                    text: "Data may be jointly published when both partners agree.",
                    icon: "mdi-newspaper"
                },
            ]
        }
    }
}
</script>
<style scoped>
.v-card{
    border-radius: 0px;
    background-color: transparent !important;
}
.v-card-title{
    font-size: var(--body-2-size) !important;
    padding-bottom: 2px;
}
.v-card-subtitle{
    padding-left:42px;
    font-size: 0.85rem !important;
    /* font-size: var(--body-2-size) !important; */
}


</style>