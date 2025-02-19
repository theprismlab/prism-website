<template>
    <v-card :class="`elevation-${elevation} ${classes}`" max-width="1000px">
        <v-row>
            <v-col v-if="image" cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                <v-img style="border-radius:10px;" max-width="250px" :src="image"></v-img>
            </v-col>
            <v-col>
                <v-chip v-if="chip" class='mb-2 ml-2' :size="chip.size || 'default'" :color="chip.color || 'primary'">{{ chip.text}}</v-chip>
                <h3 v-if="suptitle" class="v-card-subtitle font-weight-bold text-overline" v-html="suptitle"></h3>
                <h2 v-if="title" :class="`v-card-title text-size-${titleSize}`" v-html="title"></h2>
                <h3 v-if="subtitle" class="v-card-subtitle" v-html="subtitle"></h3>
                <p v-if="text" :class="`v-card-text text-size-${textSize}`" v-html="text"></p>
                <v-btn v-if="button" :color="button.color || 'primary'" :variant="button.variant || 'outlined'" v-html="button.text" :href="button.url" target="_blank"></v-btn>
              
            </v-col>
        </v-row>
    </v-card>
  </template>
<script>


export default {
    name: "Card",
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
        chip: {
            type: Object,
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
.v-card-title > * {
    text-decoration: none !important;
    border-bottom: 1px solid #cccccc !important;
} 
/* .v-chip{
    font-weight: 600;
} */

</style>

