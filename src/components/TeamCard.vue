<template>
    <v-card elevation="0" class="fill-height" max-width="350px">
        <v-row class="fill-height" align="center" justify="center" style="text-align: center;">
            <v-col>
                <v-img :src="image" :height="200" :width="200" aspect-ratio="1/1" cover class="rounded-circle"></v-img>
                <v-card-item>
                    <h3 class="v-card-title">{{ name }}</h3>
                    <p class="v-card-subtitle">{{ title }}</p>
                </v-card-item>
            </v-col>
        </v-row>


    </v-card>
  </template>
  
<script>


export default {
    name: "TeamCard",
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        bio: {
            type: String,
            required: false
        }
    },
    computed: {

    }
}
</script>

<style scoped>
.v-card-title{
    font-size: 1.15rem !important;
}
.v-card-subtitle{
    font-size: 0.95rem !important;
    line-height: 1.3rem !important;
    margin-top:4px;
}

</style>