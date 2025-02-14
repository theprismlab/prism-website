<template>
    <v-card elevation="1" class="fill-height" max-width="300px">
        <v-img max-heigh="200px" :src="image" cover></v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text>{{ title }}</v-card-text>
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