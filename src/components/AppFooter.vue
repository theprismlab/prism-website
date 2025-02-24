<template>
  <v-footer class="py-4" style="background-color: var(--v-primary-darken-2)">
    <container-md>
      <v-row class="justify-space-between align-center">
        <!-- <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" align-self="center">
          <h4 class="text-white text-overline">Connect</h4>
          <v-row class="justify-start pb-6">
            <v-col cols="6" xs="12" sm="6" md="6" lg="4" xl="4">
              <a style="line-height: 2rem" href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all" target="_blank">LinkedIn <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <v-btn to="/contact-us" rounded size="small" class="text-primary mt-2" variant="flat">Contact us</v-btn>
            </v-col>
            <v-col cols="6" xs="12" sm="6" md="6" lg="4" xl="4">      
              <a style="line-height: 2rem" href="https://www.broadinstitute.org/" target="_blank">Broad Institute <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <a style="line-height: 2rem" href="https://depmap.org/portal/" target="_blank">Depmap Portal <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
            </v-col>
          </v-row>
        </v-col> -->
        <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="6">
          <h4 class="text-white text-overline font-weight-bold">Connect</h4>
          <v-row class="justify-start align-top pb-4">
            <v-col cols="6" xs="12" sm="auto" md="4" lg="4" xl="4">
              <a style="line-height: 2rem" href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all" target="_blank">LinkedIn <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <a style="line-height: 2rem" href="https://www.broadinstitute.org/" target="_blank">Broad Institute <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
              <br>
              <a style="line-height: 2rem" href="https://depmap.org/portal/" target="_blank">Depmap Portal <v-icon style="font-size:1em;">mdi-open-in-new</v-icon></a>
            
            </v-col>
            <v-col cols="6" xs="12" sm="6" md="6" lg="4" xl="4">      
              <v-btn to="/contact-us" rounded size="small" class="text-primary mt-2" variant="flat">Contact us</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col align-self="center">
            <v-row class="justify-end align-center">
              <v-col cols="6" xs="6" sm="6" md="6" lg="4" xl="4">
                <v-img src="../../public/images/logo-white.png" max-width="166" width="100%" ></v-img>
              </v-col>
              <v-col cols="6" xs="6" sm="6" md="6" lg="4" xl="4">
                <v-img src="../../public/images/BroadLogo_All-White.png"  max-width="166" width="100%" ></v-img>
              </v-col>
            </v-row>
        </v-col>
      </v-row>
    </container-md>
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
