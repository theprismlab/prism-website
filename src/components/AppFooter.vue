<template>
  <v-footer style="background-color: var(--v-primary)">
    <v-container>
      <v-row align="center" class="justify-start">
        <v-col cols="12" md="3" class="align-start">
          <v-img src="../../public/images/logo-white.png" max-width="150"></v-img>
        </v-col>
        <v-col cols="12" md="3">
          <v-img src="../../public/images/BroadLogo_All-White.png"  max-width="150"></v-img>
        </v-col>
        <v-col>
          <v-list>
            <v-list-subheader class="text-uppercase text-white font-weight-bold">Learn more</v-list-subheader>
            <v-list-item>
              <a href="https://www.broadinstitute.org/" target="_blank">Broad Institute <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
            </v-list-item>
            <v-list-item>
              <a href="https://depmap.org/portal/" target="_blank">Depmap Portal <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-list>
            <v-list-subheader class="text-uppercase text-white font-weight-bold">Connect</v-list-subheader>
            <v-list-item>
              <v-list-item-title><a href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all" target="_blank">LinkedIn <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn to="/contact-us" rounded class="text-primary">Contact us</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
 
</script>

<style scoped>
.v-list {
  background:none;
  color: white;
}
.v-list-item{
  min-height:1rem;
  color:white;
}
a{
  color:white;
  text-decoration: none;
}
a:hover{
  opacity:0.75;
}
</style>
