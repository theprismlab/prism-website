<template>
    <v-card class="pa-2 fill-height d-flex align-center justify-center flex-column" align="center" elevation="1">
        <v-card-item>
            <div :id="`icon-circle-${index}`" class="d-flex align-center justify-center" 
                :style="{ 
                    backgroundColor: icon.backgroundColor, 
                    width: icon.size + 'px', 
                    height: icon.size + 'px',
                    padding: icon.size / 4 + 'px',
                    borderRadius: icon.borderRadius,
                    marginBottom: '8px',
                     }">
                <svg-icon 
                    :size="icon.size" type="mdi" 
                    :path="icon.path" 
                    :style="{ 
                        color: icon.color
                    }">
                    </svg-icon>
            </div>
            <h2 style="line-height: 1.2em !important;" class="text-h2 font-weight-light">{{title}}</h2>
            <p style="opacity: 1; line-height: 1.4em !important;" class="text-body-2 font-weight-normal text-grey-darken-1" v-html="subtitle"></p>
        </v-card-item>
    </v-card>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHexagonMultiple } from '@mdi/js';


export default {
    name: "OurImpactCards",
    components: {
        SvgIcon
    },
    props: {
        index: {
            type: Number,
            required: true,
            default: 0
        }, 
        title: {
            type: String,
            required: false,
            default: ""
        },
        subtitle: {
            type: String,
            required: false,
            default: ""
        },
        icon: {
            type: Object,
            required: false,
            default: () => (
                { 
                    path: mdiHexagonMultiple, 
                    color: "var(--v-secondary-lighten-2)" ,
                    backgroundColor: "var(--v-secondary-lighten-5)",
                    size: 64,
                    borderRadius: "50%"
                }
            )

        },
        iconPath: {
            type: String,
            required: false,
            default: mdiHexagonMultiple
        },
        iconColor: {
            type: String,
            required: false,
            default: "var(--v-secondary-lighten-2)"
        },
        iconBackgroundColor: {
            type: String,
            required: false,
            default: "var(--v-secondary-lighten-5)"
        },
        iconSize: {
            type: Number,
            required: false,
            default: 64
        },
        iconBorderRadius: {
            type: String,
            required: false,
            default: "50%"
        }
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>


</style>