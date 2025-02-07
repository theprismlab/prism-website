<template>
    <v-card>
        <v-card-item>
            <v-row>
                <v-col cols="12" md="4">
                    <v-img max-width="100%" :src="image"></v-img>
                </v-col>
                <v-col cols="12" md="8">
                    <v-card-item max-width="100%">
                        <a :href="url"><v-card-title>{{ title }}</v-card-title></a>
                        <v-card-subtitle>{{ publisher }}</v-card-subtitle>
                        <v-card-subtitle>{{ date }}</v-card-subtitle>
                    </v-card-item>
                    <v-card-text>{{ abstract }}</v-card-text>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
  </template>
  
<script>

export default {
    name: "PublicationFeatureCard",
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
        },
        abstract: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    },
    computed: {

        // imgUrl () {
        //     return new URL(`../assets/${this.image}`, import.meta.url).href
        // }
    },
    mounted() {
     //   console.log(this.image, this.imgUrl);
    }
}
</script>

