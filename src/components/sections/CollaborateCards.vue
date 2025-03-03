<template>
    <v-row>
        <v-col v-for="card in cards" :key="card.title" cols="12" xs="6" sm="6" md="3" lg="3" xl="3">
            <v-card class="fill-height" elevation="0" >   
            <v-card-title class="d-flex align-center justify-start text-primary-accent-1">
                <v-icon size="medium" class="mr-2">{{ card.icon }}</v-icon>
                {{card.title}}
            </v-card-title>
            <v-card-subtitle>{{card.text}}</v-card-subtitle>
    </v-card>
    </v-col>
</v-row>
</template>
<script>
export default {
    name: "CollaborateCards",
    data() {
        return {
            cards: [
                {
                    title: "Data Ownership",
                    text: "PRISM retains the right to use collaboratively generated data to validate and improve the PRISM platform.",
                    icon: "mdi-database"
                },
                {
                    title: "Confidentiality",
                    text: "The structure and identity of your compound will not be shared with us. Unique identifiers are given to all test agents.",
                    icon: "mdi-lock"
                },
                {
                    title: "Intellectual Property",
                    text: "Non-exclusive royalty free licenses are granted.",
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
    font-size: var(--body-2-size) !important;
    color: white !important;
}


</style>