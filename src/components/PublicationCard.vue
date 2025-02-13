<template>
    <v-card class="elevation-0">
        <v-row>
            <v-col v-if="image" cols="4" md="4">
                <v-img class="elevation-1" style="border-radius:10px;" max-width="100%" :src="image"></v-img>
            </v-col>
            <v-col>
                <v-card-item :class="size" max-width="100%">
                    <a :href="url"><v-card-title>{{ title }}</v-card-title></a>
                    <v-card-subtitle>{{ publisher }}</v-card-subtitle>
                    <v-card-subtitle>{{ date }}</v-card-subtitle>
                </v-card-item>
                <v-card-text v-if="abstract">{{ abstract }}</v-card-text>
            </v-col>
        </v-row>
    </v-card>
  </template>
<script>


export default {
    name: "PublicationCard",
    props: {
        size: {
            type: String,
            required: false
        },
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
        },
        abstract: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    }
}
</script>
<style scoped>
    .v-card{
        margin-bottom: 1rem;
    }

    .large > * > * > .v-card-title{
        font-size: 1.25em !important;
    }

    /* .large > * > .v-card-subtitle{
        font-size: 1em !important;
    } */
</style>

