<template>
  <div>
    <section class="drawer-section">
      <div class="drawer-section__eyebrow">Get started</div>
      <h3 class="drawer-section__title">How to participate in a PRISM screen</h3>

      <v-timeline
        class="drawer-steps"
        direction="vertical"
        side="end"
        align="start"
        density="compact"
        truncate-line="both"
        line-color="grey-lighten-2"
      >
        <v-timeline-item
          v-for="(step, i) in participationSteps"
          :key="i"
          dot-color="teal-accent-4"
          size="small"
          :icon="`mdi-numeric-${i + 1}`"
          icon-color="white"
          fill-dot
        >
          <div class="drawer-steps__text">{{ step }}</div>
        </v-timeline-item>
      </v-timeline>

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

    <section class="drawer-section mt-4">
      <!-- <div class="drawer-section__eyebrow">Cheat sheet</div> -->
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
  </div>
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
        participationSteps: [
          'Complete a submission form',
          'Provide funding to your quote (if applicable)',
          'Ship your compounds to our lab',
        ],
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

  /* Timeline steps */
  #submission-hub__navigation-drawer-right .drawer-steps {
    margin: 0 4px 20px;
  }

  #submission-hub__navigation-drawer-right .drawer-steps.v-timeline--vertical.v-timeline {
    grid-row-gap: 8px;
  }

  #submission-hub__navigation-drawer-right .drawer-steps .v-timeline-item__body {
    padding-inline-start: 12px;
    padding-block: 2px;
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
    padding: 0px 12px;
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

  #submission-hub__schedule-table {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  /* Header row */
  #submission-hub__schedule-table thead,
  #submission-hub__schedule-table .v-data-table__thead {
    background: rgba(0, 0, 0, 0.015);
  }

  #submission-hub__schedule-table thead tr {
    border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  }

  #submission-hub__schedule-table thead th,
  #submission-hub__schedule-table .v-data-table__th {
    font-size: 0.75rem !important;
    font-weight: 600 !important;

    letter-spacing: 0.06em;
    color: rgba(0, 0, 0, 0.6) !important;
    height: 48px !important;

    vertical-align: middle !important;
    background: rgba(0, 0, 0, 0.015);
  }

  /* Body cells */
  #submission-hub__schedule-table tbody td,
  #submission-hub__schedule-table .v-data-table__td {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.82);
    height: 56px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  }

  /* First column emphasis */
  #submission-hub__schedule-table tbody td:first-child,
  #submission-hub__schedule-table .v-data-table__td:first-child {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }

  /* Zebra striping */
  #submission-hub__schedule-table tbody tr:nth-child(even) > td,
  #submission-hub__schedule-table tbody tr:nth-child(even) > .v-data-table__td {
    background: rgba(0, 0, 0, 0.015);
  }

  /* Strip the last row's bottom border so it sits flush with the rounded container */
  #submission-hub__schedule-table tbody tr:last-child > td,
  #submission-hub__schedule-table tbody tr:last-child > .v-data-table__td {
    border-bottom: 0 !important;
  }
</style>
