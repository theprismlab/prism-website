<template>
    <v-card elevation="1" class="fill-height" max-width="350px">
        <v-img height="200px" :src="image" cover></v-img>
        <v-card-item>
            <v-card-title>{{ name }}</v-card-title>
            <v-card-subtitle>{{ title }}</v-card-subtitle>
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


</style>