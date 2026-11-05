<template>
  <div>
    <div class="case-studies">
      <image-card
        v-for="(study, i) in caseStudies"
        :key="study.title"
        v-bind="study"
        layout="horizontal"
        :reverse="i % 2 === 1"
      />
    </div>
  </div>
</template>
<script>
  import { CASE_STUDIES } from './content.js';
  export default {
    name: 'ManuscriptVignettes',
    data() {
      return {
        caseStudies: CASE_STUDIES,
      };
    },
  };
</script>
