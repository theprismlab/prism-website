<template>
  <v-footer class="mt-16 pt-2 pb-6" style="background-color: var(--v-primary)">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
              <v-list-subheader class="text-uppercase text-white font-weight-black">Learn more</v-list-subheader>
              <a style="line-height: 2rem" href="https://www.broadinstitute.org/" target="_blank">Broad Institute <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <a style="line-height: 2rem" href="https://depmap.org/portal/" target="_blank">Depmap Portal <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
              <v-list-subheader class="text-uppercase text-white font-weight-black">Connect</v-list-subheader>
              <a style="line-height: 2rem" href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all" target="_blank">LinkedIn <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <v-btn to="/contact-us" rounded size="small" class="text-primary mt-2" variant="flat">Contact us</v-btn>
            </v-col>
           
          </v-row>
        </v-col>


        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">

            <v-row align="center" justify="center" class="pt-6">
              <v-col>
                <v-img src="../../public/images/logo-white.png" max-width="130" width="100%"></v-img>
              </v-col>
              <v-col>
                <v-img src="../../public/images/BroadLogo_All-White.png"  max-width="130" width="100%"></v-img>
              </v-col>
            </v-row>
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
