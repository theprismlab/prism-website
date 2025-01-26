<template>
    <v-card>
        <v-img src="../assets/team/lia_petronio.JPG" cover></v-img>
        <v-card-title>{{ name }}</v-card-title>
        <v-card-text>{{ title }}</v-card-text>
        <v-card-actions>
            <v-btn text color="primary">Read bio</v-btn>
        </v-card-actions>
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
    }
}
</script>

<style scoped>


</style>