<template>
  <v-app-bar density="comfortable" app color="white" light class="elevation-1 px-8">
      <!-- Menu icon for mobile -->
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
    <v-app-bar-title>
      <router-link to="/" tag="span" style="cursor: pointer; text-decoration: none; border: none;">
        <v-img id="prism_logo" alt="PRISM Logo" width="160px" src="../assets/logo.png" />
      </router-link>
    </v-app-bar-title>
    <!-- Tabs for desktop -->
    <v-tabs class="d-none d-md-flex" hide-slider color="grey-darken-3">
      <v-tab v-for="(item, index) in items" :key="index" :id="item.title.toLowerCase().replace(/\s+/g, '-')" :class="`v-btn--size-large ${item.class || ''}`" :to="item.route || '#'" :exact="!item.children || item.children.length === 0">
        {{ item.title }}
        <v-menu v-if="item.children && item.children.length > 0" offset-y activator="parent">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-menu-down</v-icon>
          </template>
          <v-list>
            <v-list-item v-for="child in item.children" :key="child.id" :to="child.route">
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>

    <!-- <v-btn to="/contact-us" color="primary-base" variant="flat" rounded>
      Contact us
    </v-btn> -->
    <v-spacer></v-spacer>
    <v-btn href="https://theprismlab.org/portal" target="_blank" class="text-uppercase" color="primary-base" variant="text" rounded>
      Portal <v-icon class="ml-1" style="font-size: 1em">mdi-open-in-new</v-icon>
      </v-btn>
  </v-app-bar>

  <!-- Navigation Drawer for mobile -->
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item>
        <v-list-group v-for="item in items" :value="item.title" :key="item.title" no-action>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="item.title"
          ></v-list-item>
        </template>
        <v-list-item v-for="child in item.children" :key="child.id" :to="child.route">
          <v-list-item-title>{{ child.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
      </v-list-item>
    
      <v-list-item>
        <v-btn href="https://theprismlab.org/portal" target="_blank" class="text-uppercase" color="primary-base" variant="text" rounded>
        Portal <v-icon class="ml-1" style="font-size: 1em">mdi-open-in-new</v-icon>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn to="/contact-us" color="primary-base" variant="flat" rounded>
          Contact us
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  
</template>

<script>
export default {
name: 'AppBar',
data() {
  return {
    drawer: false,
    items: [
      {
        title: 'About us',
        children: [
          {
            title: 'About PRISM',
            route: '/about-us/about-prism',
            id: 'about-prism'
          },
          {
            title: 'Team',
            route: '/about-us/team',
            id: 'team'
          }
        ]
      },
      {
        title: 'Research',
        children: [
          {
            title: 'Publications',
            route: '/research/publications',
            id: 'publications'
          },
          {
            title: 'White papers',
            route: '/research/white-papers',
            id: 'white-papers'
          },
          {
            title: 'Conference abstracts',
            route: '/research/conference-abstracts',
            id: 'conference-abstracts'
          }
        ]
      },
      {
        title: 'Consortium Screens',
        children: [
          {
            title: 'Cell line collection',
            route: '/consortium-screens/cell-line-collection',
            id: 'cell-line-collection'
          },
          {
            title: 'Assays',
            route: '/consortium-screens/assays',
            id: 'assays'
          },
          {
            title: 'Data Analysis',
            route: '/consortium-screens/data-analysis',
            id: 'data-analysis'
          },
          {
            title: 'Deliverables',
            route: '/consortium-screens/deliverables',
            id: 'deliverables'
          },
          {
            title: 'Collaborating',
            route: '/consortium-screens/collaborating',
            id: 'collaborating'
          }
        ],
        
      },
      {
        title: 'Contact us',
        route: '/contact-us',
        id: 'contact-us',
        class: 'v-btn--text'
      }
    ],
      
  };
},
};
</script>

<style scoped>
/* Ensure the navigation drawer is styled properly */
.v-navigation-drawer {
width: 250px;
}
.v-app-bar{
/*  border-bottom:2px solid var(--v-primary) !important;
  box-shadow: 0.5px 0.5px 15px 0px rgba(220, 220, 220, 0.5) !important; */
  z-index:1000;
}


.v-tabs, .v-tab{
  cursor: pointer;
  height: var(--v-toolbar-height) !important;
}
/* .v-tab-item--selected .v-tab--selected{
  color: var(--v-primary-base) !important;
  font-weight: bold;
} */
</style>