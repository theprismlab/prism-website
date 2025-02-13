<template>
    <v-card class="elevation-0">
        <v-row>
            <v-col v-if="image">
                <v-img class="elevation-1" style="border-radius:10px;" max-width="250px" :src="image"></v-img>
            </v-col>
            <v-col v-if="image" cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                <v-card-item :class="size" max-width="100%">
                    <v-card-subtitle><span class="date">{{  date  }}  </span><span class="publisher">{{ publisher }}</span></v-card-subtitle>
                    <a :href="url" target="_blank"><v-card-title>{{ title }}</v-card-title></a>
                    <v-card-subtitle>{{ author }}</v-card-subtitle>
                </v-card-item>
                <v-card-text v-if="abstract">{{ abstract }}</v-card-text>
            </v-col>


            <v-col  v-if="!image">
                <v-card-item :class="size" max-width="100%">
                    <v-card-subtitle><span class="date">{{  date  }}  </span><span class="publisher">{{ publisher }}</span></v-card-subtitle>
                    <a :href="url" target="_blank"><v-card-title>{{ title }}</v-card-title></a>
                    <v-card-subtitle>{{ author }}</v-card-subtitle>
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
        author: {
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
    .v-card-title{
        margin-bottom:0.5rem;
    }
    .date, .publisher{
        font-weight: bold;
        margin-right:.5rem;
    }

    /* .large > * > .v-card-subtitle{
        font-size: 1em !important;
    } */
</style>

