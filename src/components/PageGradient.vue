<template>
  <section class="py-8">
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
    background: linear-gradient(300deg, rgba(190, 219, 255, .1), rgba(190, 219, 255, .4));
  }
</style>
  