<template>

  <v-app-bar app color="white" light class="elevation-1 px-6">
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png"/>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tabs hide-slider>
      <v-tab class="v-btn--size-large"> About us <v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="about-prism" to="/about-us/about-prism">
              <v-list-item-title class="v-tab v-btn" >About PRISM</v-list-item-title>
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

      <v-tab class="v-btn--size-large">Consortium Screens<v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="cell-line-collection" to="/consortium-screens/cell-line-collection">
              <v-list-item-title>Cell line collection</v-list-item-title>
            </v-list-item>
            <v-list-item id="assays" to="/consortium-screens/assays">
              <v-list-item-title>Assays</v-list-item-title>
            </v-list-item>
            <v-list-item id="assays2" to="/consortium-screens/assays-2">
              <v-list-item-title>Assays 2</v-list-item-title>
            </v-list-item>
            <v-list-item id="assays3" to="/consortium-screens/assays-3">
              <v-list-item-title>Assays 3</v-list-item-title>
            </v-list-item>
            <v-list-item id="data-analysis" to="/consortium-screens/data-analysis">
              <v-list-item-title>Data Analysis</v-list-item-title>
            </v-list-item>
            <v-list-item id="deliverables" to="/consortium-screens/deliverables">
              <v-list-item-title>Deliverables</v-list-item-title>
            </v-list-item>
            <v-list-item id="collaborating" to="/consortium-screens/collaborating">
              <v-list-item-title>Collaborating</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>        
    <v-btn href="https://theprismlab.org/portal" target="_blank" class="text-uppercase" color="primary-base" variant="text" rounded>
      Portal <v-icon class="ml-1" style="font-size: 1em">mdi-open-in-new</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <v-btn to="/contact-us" color="primary-base" variant="flat" rounded>
      Contact us
    </v-btn>

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
  