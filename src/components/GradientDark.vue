<template>
  <section>
      <slot></slot>
  </section>
</template>
<script>


export default {
    name: 'GradientDark',
    methods: {
    },
    watch:{

    }
}
</script>
<style scoped>
section{
  color: white;
  background: linear-gradient(34deg, #131219, #212329 40%, #545e7c);
}
</style>
  