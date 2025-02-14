<template>

  <v-app-bar app dense color="white" light>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png"/>
      </router-link>
    </v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-tabs hide-slider right>
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

          <v-tab>Research<v-icon>mdi-menu-down</v-icon>
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

            <v-tab>Screening<v-icon>mdi-menu-down</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item id="cell-line-collection" to="/screening/cell-line-collection">
                  <v-list-item-title>Cell line collection</v-list-item-title>
                </v-list-item>
                <v-list-item id="screens" to="/screening/screens">
                  <v-list-item-title>Screens</v-list-item-title>
                </v-list-item>
                <v-list-item id="data" to="/screening/data">
                  <v-list-item-title>Data</v-list-item-title>
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
    // background-image: linear-gradient(45deg, 
    // rgba(14, 122, 255, 0.0) 40%,
    // rgba(14, 122, 255, 0.2) 100%
    // ) !important;
    border-bottom:2px solid #4699FF !important;
    box-shadow: 0.5px 0.5px 15px 0px rgba(220, 220, 220, 0.5) !important;
    z-index:1000;
  }
  
</style>
  