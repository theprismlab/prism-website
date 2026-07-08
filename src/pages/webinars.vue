<template>
  <page>
    <app-container narrow>
      <prism-page-title>Webinars</prism-page-title>
      <section class="webinar-list">
        <resource-card
          v-for="webinar in webinars"
          :key="webinar.title"
          color="#277ffd"
          eyebrow="Webinar"
          eyebrow-icon="mdi-play-circle-outline"
          card-link
          :href="webinar.url"
        >
          <h3 class="prism-text-headline-small font-weight-light">
            {{ webinar.title }}
          </h3>
          <p class="prism-text-body-large text-medium-emphasis">
            {{ webinar.description }}
          </p>
          <template #links>
            <span class="resource-card__link">
              Watch Webinar
              <v-icon size="14" class="resource-card__link-icon">mdi-arrow-top-right</v-icon>
            </span>
          </template>
        </resource-card>
      </section>
    </app-container>
  </page>
</template>

<script>
  export default {
    name: 'Webinars',
    data() {
      return {
        webinars: [
          {
            title: 'PRISM Sequencing Assay Updates Webinar (July 2025)',
            description: 'An overview of the updated PRISM assay using a sequencing readout.',
            url: 'https://assets.clue.io/prism/DMC-portal-resources/PRISM_MTS_Sequencing_Assay_Updates.mp4',
          },
          {
            title: 'Single Agents (DMSO + Aqueous) Screening Webinar',
            description: 'A walkthrough of MTS024 & APS002 validation compounds.',
            url: 'https://assets.clue.io/webinar/MTS024/mts024-data-webinar.mp4',
          },
          {
            title: 'Combinations (DMSO) Screening Webinar',
            description: 'A walkthrough of CPS014 validation compounds.',
            url: 'https://assets.clue.io/prism/portal/PRISM-CPS-Webinar.mp4',
          },
        ],
      };
    },
  };
</script>

<style scoped>
  .webinar-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
