<template>

  <v-app-bar app dense color="white" light class="elevation-1">
    <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        <img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png"/>
      </router-link>
    </v-toolbar-title>

    <v-tabs hide-slider>
      <v-tab v-for="item in items" :key="item.title" class="v-btn--size-large">
          {{ item.title }}
          <v-icon>{{ item.icon }}</v-icon>
   
        <v-menu v-if="item.items" activator="parent">
          <v-list>
            <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.to">
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
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
      items: [
      {
        title: 'About us', 
        icon: 'mdi-menu-down', 
        items: [
          { 
            title: 'Background', 
            to: '/about-us/background' 
          },
          { 
            title: 'Team', 
            to: '/about-us/team' 
          }
        ]  
      },
      { 
        title: 'Research', 
        icon: 'mdi-menu-down', 
        items: [
          { 
            title: 'Publications', 
            to: '/research/publications' 
          },
          { 
            title: 'White papers', 
            to: '/research/white-papers' 
          },
          { 
            title: 'Conference abstracts', 
            to: '/research/conference-abstracts' 
          }
        ] 
      },
      { 
        title: 'Screening', 
        icon: 'mdi-menu-down', 
        items: [
          { 
            title: 'Cell line collection', 
            to: '/screening/cell-line-collection' 
          },
          { 
            title: 'Assay',
            to: '/screening/assay'
          },
          { 
            title: 'Data', 
            to: '/screening/data' 
          },
          { 
            title: 'Collaborate', 
            to: '/screening/collaborate' 
          }
        ]
      },
      // { 
      //   title: 'Portal', 
      //   icon: 'mdi-open-in-new', 
      //   href: 'https://theprismlab.org/portal' 
      // }
    ]
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
  