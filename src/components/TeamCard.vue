<template>
    <v-card elevation="0" class="fill-height" align="center" justify="center" >
        <v-card-item>
            <v-img :src="image" height="auto" width="90%" aspect-ratio="1/1" class="rounded-circle"></v-img>
            <h3 class="text-h5 mt-2">{{ name }}</h3>
            <p class="v-card-subtitle">{{ title }}</p>
        </v-card-item>
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