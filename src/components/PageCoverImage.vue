<template>
  <section class="py-8">
      <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'PageCoverImage',
  props: {
  url: {
    type: String,
    required: true
  },
  
  },
  computed:{
  background(){
    return `url(${this.url}) no-repeat center center`
  }
  }
}
</script>
<style scoped lang="scss">
  section{
  background: v-bind('background');
  background-size: cover;
  }
</style>
