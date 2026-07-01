<template>
  <page>
    <app-container narrow>
      <prism-page-title>Webinars</prism-page-title>
      <section class="webinar-list">
        <a
          v-for="webinar in webinars"
          :key="webinar.title"
          class="webinar-card"
          :href="webinar.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="webinar-card__accent" />
          <div class="webinar-card__body">
            <div class="webinar-card__eyebrow">
              <v-icon class="webinar-card__eyebrow-icon" size="14">mdi-play-circle-outline</v-icon>
              <span>Webinar</span>
            </div>
            <h3 class="prism-text-headline-small font-weight-light">
              {{ webinar.title }}
            </h3>
            <p class="prism-text-body-large text-medium-emphasis">
              {{ webinar.description }}
            </p>
            <div class="webinar-card__footer">
              <span class="webinar-card__link">
                Watch Webinar
                <v-icon size="14" class="webinar-card__link-icon">mdi-arrow-top-right</v-icon>
              </span>
            </div>
          </div>
        </a>
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

  .webinar-card {
    position: relative;
    display: flex;
    align-items: stretch;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    overflow: hidden;
    padding: 1.1rem 1.75rem 1.1rem 2rem;
    box-shadow:
      0 1px 2px rgba(20, 30, 60, 0.06),
      0 3px 8px rgba(20, 30, 60, 0.07);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
    border-color: rgba(39, 127, 253, 0.1);
    text-decoration: none;
    color: inherit;
  }

  .webinar-card:hover {
    cursor: pointer;
    border-color: rgba(39, 127, 253, 0.4);
    box-shadow:
      0 2px 4px rgba(20, 30, 60, 0.07),
      0 10px 24px rgba(20, 30, 60, 0.11);
  }

  .webinar-card__accent {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background-color: #277ffd;
  }

  .webinar-card__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .webinar-card__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #277ffd;
    margin-bottom: 0.1rem;
  }

  .webinar-card__eyebrow-icon {
    color: #277ffd;
  }

  .webinar-card__footer {
    margin-top: 0.4rem;
  }

  .webinar-card__link {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-size: 0.825rem;
    font-weight: 600;
    color: #277ffd;
    transition: opacity 150ms ease;
  }

  .webinar-card:hover .webinar-card__link {
    opacity: 0.75;
  }

  .webinar-card__link-icon {
    transition: transform 150ms ease;
    color: #277ffd;
  }

  .webinar-card:hover .webinar-card__link-icon {
    transform: translate(1px, -1px);
  }
</style>
