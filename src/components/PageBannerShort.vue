<template>
  <section>
        <v-row class="justify-start" no-gutters>
            <div class="pr-4">
                <h4 v-if="title" :class="`text-h4 mb-0 mt-0 font-weight-medium text-${textColor}`">{{ title }}</h4>
                <p v-if="subtitle" :class="`body-2 font-weight-medium text-${textColor}`">{{ subtitle }}</p>
            </div>  
            <v-btn v-if="buttonText" :to="buttonLink" variant="outlined" rounded :color="textColor">{{ buttonText }}</v-btn>
        </v-row>
  </section>
</template>

<script>
export default {
    name: 'PageBannerShort',
    props: {
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    buttonText: {
        type: String,
        required: false
    },
    buttonLink: {
        type: String,
        required: false
    },
    textColor: {
        type: String,
        required: true
    }
},
    data () {
        return {

        }
    },
    methods: {
        
    },
    computed:{
        mobile () {
        return this.$vuetify.display.mobile
      },
    },
    watch:{

    }
}
</script>
<style scoped>
  section {
    /* background: var(--v-primary); */
  }
</style>
  