<template>
    <v-card class="elevation-1 px-4 py-4" max-width="1000px">
        <v-row>
            <v-col v-if="image" cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-img class="elevation-1" style="border-radius:10px;" max-width="250px" :src="image"></v-img>
            </v-col>
            <v-col>
                <v-chip v-if="chip">{{chip}}</v-chip>
                <h3 v-if="suptitle" class="v-card-subtitle font-weight-bold" v-html="suptitle"></h3>
                <h2 v-if="title" class="v-card-title text-size-h5" v-html="title"></h2>
                <p v-if="text" class="v-card-text" v-html="text"></p>
                <v-btn v-if="button" :color="button.color || 'primary'" :variant="button.variant || 'outlined'" class="primary" v-html="button.text" :href="button.url" target="_blank"></v-btn>
            </v-col>
        </v-row>
    </v-card>
  </template>
<script>


export default {
    name: "Card",
    props: {    
        image: {
            type: String,
            required: false
        },
        chip: {
            type: String,
            required: false
        },
        suptitle: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        button: {
            type: Object,
            required: false
        }

    },
    mounted(){
        console.log(this.button)
    }
}
</script>
<style scoped>
    
</style>

