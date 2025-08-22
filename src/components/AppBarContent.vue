<template>
<v-tabs hide-slider class="d-none d-md-flex">
      <v-tab class="v-btn--size-large"> About us <v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item id="about-prism" to="/about-us/about-prism">
              <v-list-item-title class="v-tab v-btn">About PRISM</v-list-item-title>
            </v-list-item>
            <v-list-item id="team" to="/about-us/team">
              <v-list-item-title>Team</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>

      <v-list-item class="v-btn--size-large">Research<v-icon>mdi-menu-down</v-icon>
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
      </v-list-item>
      <v-tab class="v-btn--size-large">Consortium Screens<v-icon>mdi-menu-down</v-icon>
        <v-menu activator="parent">
          <v-list>
              <v-list-item id="cell-line-collection" to="/consortium-screens/cell-line-collection">
                  <v-list-item-title>Cell line collection</v-list-item-title>
                </v-list-item>
                <v-list-item id="assays" to="/consortium-screens/assays">
                  <v-list-item-title>Assays</v-list-item-title>
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
      <v-tab>
        <v-btn href="https://theprismlab.org/portal" target="_blank" class="text-uppercase" color="primary-base" variant="text" rounded>
        Portal <v-icon class="ml-1" style="font-size: 1em">mdi-open-in-new</v-icon>
        </v-btn>
        <v-btn to="/contact-us" color="primary-base" variant="flat" rounded>
          Contact us
        </v-btn>
      </v-tab>
    </v-tabs>
    </template>
    <script>
    // import Vue from 'vue';
    export default {
      name: "AppBarContent",
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
  
