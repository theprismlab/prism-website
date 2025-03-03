<template>
<page>
    <container-sm>
            <page-title>Collaborate with us!</page-title>
            <p class="text-body-1">The Broad Institute and PRISM’s mission is to help improve cancer patients’ lives. To that end, we are excited to collaborate with you to advance the understanding of cancer therapeutics and accelerate the drug discovery process. Our working model is that of a scientific collaboration to further cancer research.
            </p>
            <h4 class="text-h4">Key collaboration points</h4>
            <div class="mt-8 mb-16">
                <v-card  v-for="card in cards" :key="card.title" class="pa-4  card-border" elevation="0" max-width="600px">   
                    <v-card-title class="d-flex align-center justify-start text-primary-accent-2">
                        <v-icon size="large" class="mr-4">{{ card.icon }}</v-icon>
                        {{card.title}}</v-card-title>
                    <v-card-subtitle>{{card.text}}</v-card-subtitle>
                </v-card>
            </div>    
            <p class="text-body-1">For more information on our collaboration agreements for biotechnology and pharmaceutical companies, please 
                <icon-link text="contact our team" icon="mdi-arrow-right-thin" size="small"/>
            </p>
    </container-sm>
</page>
</template>
<script>
export default {
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
.card-border{
    border: 1px solid var(--v-primary-lighten-4) !important;
    border-radius: 8px;
    margin-bottom: 16px;
}
</style>