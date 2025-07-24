<template>
  <section :class="`background-${number}`">
      <slot></slot>
  </section>
</template>
<script>


export default {
    name: 'BackgroundGradient',
    props: {
    number: {
      type: number,
      required: false,
        default: 1
    },
},
    data () {
        return {

        }
    },
    methods: {
        lightenRGB(color, amount){
            let r = Math.min(255, Math.floor(color.r + amount));
            let g = Math.min(255, Math.floor(color.g + amount));
            let b = Math.min(255, Math.floor(color.b + amount));
            return `rgb(${r}, ${g}, ${b})`;
        },
        darkenRGB(color, amount){
            let r = Math.max(0, Math.floor(color.r - amount));
            let g = Math.max(0, Math.floor(color.g - amount));
            let b = Math.max(0, Math.floor(color.b - amount));
            return `rgb(${r}, ${g}, ${b})`;
        },
        mixRGB(color1, color2, weight) {
            let r = Math.floor(color1.r * (1 - weight) + color2.r * weight);
            let g = Math.floor(color1.g * (1 - weight) + color2.g * weight);
            let b = Math.floor(color1.b * (1 - weight) + color2.b * weight);
            return `rgb(${r}, ${g}, ${b})`;
        }
    },
    computed: {
        imgPath() {
            return this.$store.state.imgPath;
        },

    },
    watch:{

    }
}
</script>
<style>

/* 
.background-2{
    background: linear-gradient(289.28deg, rgb(86, 36, 231) -30.61%, rgba(86, 36, 231, 0) 48.57%), linear-gradient(270deg, rgba(24, 185, 220, 0) 35.78%, rgb(0, 120, 255) 157.41%, rgb(24, 185, 220) 0px), rgb(24, 116, 220);
    overflow: hidden;
}

.background-1{
    color: white;
  background: linear-gradient(120deg, var(--v-primary-accent-3), var(--v-primary-darken-4));
} */
</style>
  