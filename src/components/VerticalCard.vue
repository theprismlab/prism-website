<template>
    <v-card class="fill-height" :elevation="elevation" style="max-width:350px">
        <v-img v-if="image" class="align-end technology-card-image" alt="" :src="image"></v-img>
        <h3 v-if="title" class="v-card-title text-h4 font-weight-bold" v-html="title"></h3>
        <h4 v-if="subtitle" class="v-card-subtitle" v-html="subtitle"></h4>
        <p v-if="text" class="v-card-text" v-html="text"></p>
        <v-card-actions v-if="action">
            <v-btn class="position-absolute ms-auto" 
                style="left: 12px; bottom: 8px;" 
                size="small" 
                color="primary-base" 
                variant="text" 
                rounded
                :href="action.url"
                v-html="action.text"
                :target="action.target"
                >
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
.technology-card-image{
    width:80%;
    max-width: 250px !important;
    min-width:175px !important;
}

/* xxl  */
@media (min-width:  2560px) {

}
/* xl */
@media (min-width: 1920px) and (max-width: 2560px) {

}
/* lg */
@media (min-width: 1280px) and (max-width: 1920px) {

}
/* md */
@media (min-width: 960px) and (max-width: 1280px) {



}

/* sm */
@media (min-width: 600px) and (max-width: 960px) {

}
/* xs */
@media (max-width: 600px) {
.technology-card-image{
width:90%;
max-width: 225px !important;
}
}
</style>

