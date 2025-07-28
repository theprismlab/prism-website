<template>
     <v-card :class="`pa-6 px-10 fill-height justify-start mb-6 ${colorScheme}-card`" 
     variant="tonal" color="secondary-lighten-3" max-width="700">
        <h3 class="text-h4 d-flex align-center justify-start">
        <svg-icon :path="icon.path"  type="mdi" :size="icon.size"  class="mr-2"></svg-icon>
        {{title}}
        </h3>
        <p class="text-grey-darken-2 text-body-2 ml-8 mt-4">
            <slot></slot>
        </p>
    </v-card>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';


export default {
    name: "DeliverableCard",
    components: {
        SvgIcon
    },
    props:{
        title: {
            type: Object,
            default: () => {}
        },
        icon: {
            type: Object,
            default: {}
        },
        colorScheme: {
            type: String,
            default: "secondary"
        }
    },
    data() {
        return {
        
        }
    }
}
</script>
<style scoped>

.deliverable-card {
    border: 1px solid var(--v-secondary-lighten-4);
}
.secondary-card{
    border: 1px solid var(--v-secondary-lighten-4); 
}
.secondary-card >.text-h4  {
    color: var(--v-secondary-darken-3);
}
</style>