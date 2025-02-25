<template>
    <v-card :class="`elevation-${elevation} ${classes}`" max-width="1000px">
        <v-row>
            <v-col v-if="image" cols="12" xs="12" sm="3" md="3" lg="3" xl="3">
                <v-img style="border-radius:10px;" max-width="250px" :src="image" cover></v-img>
            </v-col>
            <v-col>
                <!-- <h3 v-if="suptitle" class="v-card-subtitle font-weight-bold text-overline" v-html="suptitle"></h3> -->
                <v-card-item v-if="suptitle" class="pt-0">
                    <card-overline class="text-grey" v-html="suptitle"></card-overline>
                </v-card-item>
 
                <h2 v-if="title" :class="`v-card-title text-size-${titleSize}`" v-html="title"></h2>
                <h3 v-if="subtitle" class="v-card-subtitle" v-html="subtitle"></h3>
                <p v-if="text" :class="`v-card-text text-size-${textSize}`" v-html="text"></p>
                <v-btn v-if="button" :color="button.color || 'primary-accent-2'" :variant="button.variant || 'outlined'" v-html="button.text" :href="button.url" target="_blank" rounded></v-btn>
              
            </v-col>
        </v-row>
    </v-card>
  </template>
<script>

import CardOverline from '@/components/CardOverline.vue'
export default {
    name: "PublicationCard",
    props: {    
        size: {
            type: String,
            required: false,
            default: "md"
        },
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
        },
        link: {
            type: String,
            required: false
        }

    },
    computed: {
        titleSize(){
            return this.size === "lg" ? "h4" : this.size === "md" ? "h5" : "h6"
        },
        textSize(){
            return this.size === "lg" ? "body-1" : this.size === "md" ? "body-1" : "body-2"
        }
    },
    mounted(){
        console.log(this.elevation)
    }
}
</script>
<style scoped>
.text-overline{
    line-height: normal !important;
}
/* To do: remove this, make a class for specifying the type of link (ie: title link) */
.v-card-title > * {
    text-decoration: none !important;
    border-bottom: 1px solid #cccccc !important;
} 
/* .v-chip{
    font-weight: 600;
} */

</style>

