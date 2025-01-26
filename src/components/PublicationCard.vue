<template>
    <v-card>
        <a href="google.com"><v-card-title>{{ title }}</v-card-title></a>
        <v-card-subtitle>{{ publisher }}</v-card-subtitle>
        <v-card-subtitle>{{ date }}</v-card-subtitle>
        <v-card-text>{{  }}</v-card-text>


    </v-card>
  </template>
  
<script>


export default {
    name: "PublicationCard",
    props: {
        title: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        date: {
            type: Number,
            required: false
        },
        authors: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    }
}
</script>

