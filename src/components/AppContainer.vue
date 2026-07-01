<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
        cols="12"
        sm="12"
        :md="wide ? 12 : 10"
        :lg="wide ? 10 : 8"
        :xl="wide ? 10 : 8"
        :style="narrow ? { maxWidth: '720px', margin: '0 auto' } : undefined"
      >
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'AppContainer',
    props: {
      wide: { type: Boolean, default: false },
      narrow: { type: Boolean, default: false },
    },
  };
</script>
