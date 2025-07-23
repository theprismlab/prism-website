<template>
      <v-footer class="py-4 background">
    <v-container>
      <v-row class="justify-space-between align-center">
        <v-col cols="12" xs="12" sm="12" md="7" lg="7" xl="6">
          <section-overline color="white">Connect</section-overline>
          <v-row class="justify-start align-top pb-4">
            <v-col cols="6" xs="12" sm="auto" md="4" lg="4" xl="4">
              <icon-link
                href="https://www.linkedin.com/company/prism-cancer-cell-line-screening/posts/?feedView=all"
                text="LinkedIn"
                color="white"
              />

              <br>
              <icon-link
                href="https://www.broadinstitute.org/"
                text="Broad Institute"
                color="white"
              />
              <br>
              <icon-link
                href="https://depmap.org/portal/"
                text="Depmap Portal"
                color="white"
              />
            </v-col>
            <v-col cols="6" xs="12" sm="6" md="6" lg="4" xl="4">      
              <v-btn to="/contact-us" rounded size="small" class="text-primary-base mt-2" variant="flat">Contact us</v-btn>
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
    </v-container>
  </v-footer>
</template>

<script setup>
import { link } from 'd3';

 
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
/* .background{
  background: linear-gradient(15deg, #0e0c1b, #161730 40%, #24286e);
} */
.background{
  background: linear-gradient(120deg, var(--v-primary-base), var(--v-primary-darken-4));
}
</style>
