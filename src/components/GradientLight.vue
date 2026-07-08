<template>
  <section>
      <slot></slot>
  </section>
</template>
<script>


export default {
    name: 'GradientLight',
    methods: {
    },
    watch:{

    }
}
</script>
<style scoped>
section{
  background: linear-gradient(34deg, 
  var(--v-grey-lighten-5) 0%, 
  var(--v-grey-lighten-4) 50%, 
  var(--v-grey-lighten-3) 100%
  );
}
</style>
  