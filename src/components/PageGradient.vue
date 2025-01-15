<template>
  <section class="py-12">
      <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'PageGradient',
    props: {
    title: {
    type: String,
    required: false
    }
},
    data () {
    return {

    }
    },
    methods: {
    },
    watch:{

    }
}
</script>
<style scoped>
  section {
    background: linear-gradient(300deg, rgba(190, 219, 255, .02), rgba(190, 219, 255, .25));
  }
</style>
  