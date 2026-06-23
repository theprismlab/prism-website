<template>
  <page>
    <app-container wide>
      <prism-page-title>Submission Hub</prism-page-title>
      <p class="prism-text-body-1">
        [BLURB NEEDED] Welcome to the PRISM Submission Hub. Here, you can explore upcoming screens,
        access detailed instructions, and submit your test agents to participateeee in our
        consortium screens.
      </p>
      <v-data-table
        :headers="headers"
        :items="schedule"
        :items-per-page="-1"
        hide-default-footer
        class="mt-4"
      >
        <template #item.status="{ item }">
          <v-chip v-if="item.status" :color="statusColor(item.status)" size="small" variant="flat">
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </app-container>

    <v-navigation-drawer
      v-model="drawerOpen"
      location="right"
      width="340"
      :order="2"
      floating
      id="submission-hub__navigation-drawer-right"
    >
      <button class="drawer-collapse-btn" aria-label="Collapse drawer" @click="drawerOpen = false">
        <v-icon size="20">mdi-chevron-right</v-icon>
      </button>

      <section class="drawer-section">
        <div class="drawer-section__eyebrow">Get started</div>
        <h3 class="drawer-section__title">How to participate in a PRISM screen</h3>

        <ol class="drawer-steps">
          <li class="drawer-steps__item">
            <span class="drawer-steps__num">1</span>
            <span class="drawer-steps__text">Complete a submission form</span>
          </li>
          <li class="drawer-steps__item">
            <span class="drawer-steps__num">2</span>
            <span class="drawer-steps__text">Provide funding to your quote (if applicable)</span>
          </li>
          <li class="drawer-steps__item">
            <span class="drawer-steps__num">3</span>
            <span class="drawer-steps__text">Ship your compounds to our lab</span>
          </li>
        </ol>

        <v-btn
          to="/consortium-screens/collaborating"
          append-icon="mdi-arrow-right"
          variant="outlined"
          color="primary"
          class="drawer-cta"
          rounded
          block
          >Learn about collaborating</v-btn
        >
      </section>

      <v-divider class="drawer-divider" />

      <section class="drawer-section">
        <div class="drawer-section__eyebrow">Screens</div>
        <h3 class="drawer-section__title">Screen — Test Agents</h3>

        <ul class="drawer-assays">
          <li v-for="key in Object.keys(assays)" :key="key" class="drawer-assays__item">
            <div class="drawer-assays__name">{{ key }}</div>
            <div class="drawer-assays__agents">{{ assays[key].test_agents }}</div>
          </li>
        </ul>

        <v-btn
          to="/consortium-screens/assays"
          append-icon="mdi-arrow-right"
          variant="outlined"
          color="primary"
          class="drawer-cta"
          rounded
          block
          >More about assays</v-btn
        >
      </section>
    </v-navigation-drawer>

    <v-btn
      v-if="!drawerOpen"
      icon="mdi-chevron-left"
      position="fixed"
      location="right center"
      :style="{ right: '0' }"
      variant="tonal"
      size="small"
      @click="drawerOpen = true"
    />
  </page>
</template>

<script>
  import { ASSAYS } from '@/utils/assays';
  export default {
    name: 'SubmissionsOverview',
    data() {
      return {
        drawerOpen: true,
        headers: [
          { title: 'Screen Name', key: 'screen', sortable: false },
          { title: 'Timepoint', key: 'time_point', sortable: false },
          { title: 'Submission Window', key: 'submission_window', sortable: false },
          { title: 'Status', key: 'status', sortable: false },
          { title: 'Estimated Data Delivery', key: 'data_delivery_date', sortable: false },
        ],
        // TODO: replace with API data
        schedule: [
          {
            screen: 'EPS008',
            time_point: '10 day',
            submission_window: 'June 15 – 26 2026',
            status: null,
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS033',
            time_point: '5 day',
            submission_window: 'July 13 – 24 2026',
            status: null,
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS034, CPS017, APS009, AIR003',
            time_point: '5 day',
            submission_window: 'September 7  18 2026',
            status: null,
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'EPS009 (PR1000)',
            time_point: '10 day',
            test_agents: 'Single agent, DMSO only',
            submission_window: 'November 2 – 13 2026',
            status: null,
            data_delivery_date: 'April 2027',
          },
        ],
        assays: ASSAYS,
      };
    },
    methods: {
      statusColor(status) {
        return { open: 'success', 'in-progress': 'warning', closed: 'error' }[status] ?? 'default';
      },
    },
  };
</script>

<style>
  #submission-hub__navigation-drawer-right {
    top: 64px;
    height: calc(100% - 64px);
    background-color: #fafafa;
    border-left: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: -8px 0 24px rgba(0, 0, 0, 0.04);
  }

  #submission-hub__navigation-drawer-right .v-navigation-drawer__content {
    padding: 8px 24px 32px;
    scrollbar-width: thin;
  }

  /* Collapse button — small, subtle, top-right inside drawer */
  #submission-hub__navigation-drawer-right .drawer-collapse-btn {
    position: sticky;
    top: 0;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.55);
    background: transparent;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    z-index: 1;
  }
  #submission-hub__navigation-drawer-right .drawer-collapse-btn:hover {
    background: rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.85);
  }

  /* Section layout */
  #submission-hub__navigation-drawer-right .drawer-section {
    padding: 8px 0 4px;
  }

  #submission-hub__navigation-drawer-right .drawer-section__eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--v-primary-darken-1, #1976d2);
    margin-bottom: 6px;
  }

  #submission-hub__navigation-drawer-right .drawer-section__title {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.35;
    color: rgba(0, 0, 0, 0.87);
    margin: 0 0 16px;
  }

  #submission-hub__navigation-drawer-right .drawer-divider {
    margin: 24px -24px;
    opacity: 0.7;
  }

  /* Numbered steps */
  #submission-hub__navigation-drawer-right .drawer-steps {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  #submission-hub__navigation-drawer-right .drawer-steps__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 8px;
  }

  #submission-hub__navigation-drawer-right .drawer-steps__num {
    flex: 0 0 24px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
    background: var(--v-primary-base, #1976d2);
    margin-top: 1px;
  }

  #submission-hub__navigation-drawer-right .drawer-steps__text {
    font-size: 0.875rem;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.78);
  }

  /* Assays list */
  #submission-hub__navigation-drawer-right .drawer-assays {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  #submission-hub__navigation-drawer-right .drawer-assays__item {
    padding: 10px 12px;
    border-radius: 8px;
  }

  #submission-hub__navigation-drawer-right .drawer-assays__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
    letter-spacing: 0.02em;
  }

  #submission-hub__navigation-drawer-right .drawer-assays__agents {
    font-size: 0.8rem;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 2px;
  }

  /* CTA buttons */
  #submission-hub__navigation-drawer-right .drawer-cta {
    text-transform: none;
    letter-spacing: 0.01em;
    font-weight: 500;
  }
</style>
