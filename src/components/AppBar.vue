<template>

  <v-app-bar app dense color="white" light class="elevation-1">
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png"/>
      </router-link>
    </v-toolbar-title>
    <v-tabs hide-slider>

      <v-tab class="v-btn--size-large"> Demos <v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="demos" to="/demos/home-01">
              <v-list-item-title class="v-tab v-btn" >Home 01</v-list-item-title>
            </v-list-item>
            <v-list-item id="demos" to="/demos/home-02">
              <v-list-item-title class="v-tab v-btn" >Home 02</v-list-item-title>
            </v-list-item>
           
          
          </v-list>
        </v-menu>
      </v-tab>


      <v-tab class="v-btn--size-large"> About us <v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="background" to="/about-us/background">
              <v-list-item-title class="v-tab v-btn" >Background</v-list-item-title>
            </v-list-item>
            <v-list-item id="team" to="/about-us/team">
              <v-list-item-title>Team</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>

      <v-tab class="v-btn--size-large">Research<v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="publications" to="/research/publications">
              <v-list-item-title>Publications</v-list-item-title>
            </v-list-item>
            <v-list-item id="white-papers" to="/research/white-papers">
              <v-list-item-title>White papers</v-list-item-title>
            </v-list-item>
            <v-list-item id="conference-abstracts" to="/research/conference-abstracts">
              <v-list-item-title>Conference abstracts</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>

      <v-tab class="v-btn--size-large">Screening<v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="cell-line-collection" to="/screening/cell-line-collection">
              <v-list-item-title>Cell line collection</v-list-item-title>
            </v-list-item>
            <v-list-item id="screens" to="/screening/assay">
              <v-list-item-title>Assay</v-list-item-title>
            </v-list-item>
            <v-list-item id="data" to="/screening/data">
              <v-list-item-title>Data</v-list-item-title>
            </v-list-item>
            <v-list-item id="collaborate" to="/screening/collaborate">
              <v-list-item-title>Collaborate</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>

    <v-tabs hide-slider right> 
      <v-tab href="https://theprismlab.org/portal" target="_blank" class="text-primary text-uppercase v-btn--size-default">Portal <v-icon class="ml-1" style="font-size: 1em">mdi-open-in-new</v-icon></v-tab>
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
      mobile () {
        return this.$vuetify.display.mobile
      },
    }
  };
  </script>

<style lang="scss" scoped>
// .v-tab{
//   font-size: 1rem !important;
//   font-weight: 500 !important;
// }
  .v-app-bar{
    // border-bottom:2px solid var(--v-primary) !important;
    // box-shadow: 0.5px 0.5px 15px 0px rgba(220, 220, 220, 0.5) !important;
    z-index:1000;
  }
  
</style>
  