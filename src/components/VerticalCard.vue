<template>
    <v-card class="fill-height" :elevation="elevation">
        <v-img v-if="image" class="align-end"  width="100%" alt="" :src="image"></v-img>
        <h3 v-if="title" class="v-card-title text-h5 font-weight-bold" v-html="title"></h3>
        <h4 v-if="subtitle" class="v-card-subtitle" v-html="subtitle"></h4>
        <p v-if="text" class="v-card-text" v-html="text"></p>
        <v-card-actions v-if="action">
            <v-btn class="position-absolute ms-auto" 
                style="left: 12px; bottom: 8px;" 
                size="small" 
                color="primary" 
                variant="text" 
                rounded
                :href="action.url"
                v-html="action.text">
            </v-btn>
        </v-card-actions> 
    </v-card>
  </template>
<script>

export default {
    name: "VerticalCard",
    props: {    
        classes: {
            type: String,
            required: false
        },
        elevation: {
            type: Number,
            required: false,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
        subtitle: {
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
        action: {
            type: Object,
            required: false
        },
    },
    computed: {
    },
    mounted(){
        console.log(this.elevation)
    }
}
</script>
<style scoped>
.v-card-title{
    min-height:5rem !important;
    line-height:1.33em !important;
}
</style>

