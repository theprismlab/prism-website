<template>
  <section>
    <v-container class="py-0">
        <v-row class="d-flex align-center py-2">
            <v-col class="py-0">
                <h4 v-if="title" class="text-h4 mb-0 mt-0 font-weight-medium text-white mr-8">{{ title }}</h4>
                <p v-if="subtitle" class="body-2 font-weight-medium text-white">{{ subtitle }}</p>
            </v-col>
            <v-col class="py-0" cols="12" xs="12" sm="12" md="8" lg="8" xl="8">
                <v-btn v-if="buttonText" :to="buttonLink"variant="outlined" rounded color="white" :size="getSize">{{ buttonText }}</v-btn>
            </v-col>


        </v-row>

    </v-container>
   
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
        getSize(){
            if (this.buttonText.length > 20 && this.$vuetify.display.mobile ) {
                return 'x-small'
            } else {
                return 'small'
            }
           
        }
    },
    watch:{

    }
}
</script>
<style scoped>
  section {
    background: var(--v-primary);
  }
</style>
  