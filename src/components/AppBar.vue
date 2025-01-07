<template>
    <v-app-bar app color="white" light clipped-left>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="130px" src="../assets/logo.png"/>
      </router-link>
        <v-tabs hide-slider>
          <v-spacer></v-spacer>
          <v-tab color="primary" id="home" to="/">Home</v-tab>
          <v-tab> About us <v-icon>mdi-menu-down</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item id="background" to="/about-us/background">
                  <v-list-item-title>Background</v-list-item-title>
                </v-list-item>
                <v-list-item id="team" to="/about-us/team">
                  <v-list-item-title>Team</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-tab>

        


        </v-tabs>
    </v-app-bar>
  </template>
  <script>
  // import Vue from 'vue';
  export default {
    name: "AppBar",
  data(){
    return {
    }
  },
    methods: {

    },
    computed: {

    }
  };
  </script>


<style lang="scss">
  // @use '../styles/settings';

  // .my-button {
  //   height: settings.$button-height;
  // }
</style>
  