<template>
  <div>
    <h2>{{  title  }}</h2>
      <slot></slot>
  </div>
  </template>
  
  <script>
    export default {
      name: 'PageSection',
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
  h2{
    font-weight:700;
    margin-bottom:14px !important;
  }
  </style>
  