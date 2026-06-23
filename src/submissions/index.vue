<template>
  <page>
    <app-container wide>
      <div class="hub-layout">
        <div class="hub-layout__main">
          <prism-page-title>Submission Hub</prism-page-title>
          <p class="prism-text-body-1">
            [BLURB NEEDED] Welcome to the PRISM Submission Hub. Here, you can explore upcoming
            screens, access detailed instructions, and submit your test agents to participate in our
            consortium screens.
          </p>
          <v-data-table
            :headers="headers"
            :items="schedule"
            :items-per-page="-1"
            hide-default-footer
            class="mt-4"
            id="submission-hub__schedule-table"
          >
            <template #item.status="{ item }">
              <v-chip
                v-if="item.status"
                :color="statusColor(item.status)"
                size="small"
                variant="flat"
              >
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>

          <!-- xs: sidebar content flows below the table -->
          <template v-if="$vuetify.display.xs">
            <v-divider class="mt-8 mb-6" />
            <div class="hub-content">
              <section class="hub-section">
                <div class="hub-section__eyebrow">Get started</div>
                <h3 class="hub-section__title">How to participate in a PRISM screen</h3>
                <v-timeline
                  class="hub-steps"
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
                    <div class="hub-steps__text">{{ step }}</div>
                  </v-timeline-item>
                </v-timeline>
                <v-btn
                  to="/consortium-screens/collaborating"
                  append-icon="mdi-arrow-right"
                  variant="outlined"
                  color="primary"
                  class="hub-cta"
                  rounded
                  block
                  >Learn about collaborating</v-btn
                >
              </section>

              <section class="hub-section mt-6">
                <h3 class="hub-section__title">Screen — Test Agents</h3>
                <ul class="hub-assays">
                  <li v-for="key in Object.keys(assays)" :key="key" class="hub-assays__item">
                    <div class="hub-assays__name">{{ key }}</div>
                    <div class="hub-assays__agents">{{ assays[key].test_agents }}</div>
                  </li>
                </ul>
                <v-btn
                  to="/consortium-screens/assays"
                  append-icon="mdi-arrow-right"
                  variant="outlined"
                  color="primary"
                  class="hub-cta"
                  rounded
                  block
                  >More about assays</v-btn
                >
              </section>
            </div>
          </template>
        </div>

        <!-- Desktop sticky sidebar -->
        <aside v-if="!$vuetify.display.xs" class="hub-layout__sidebar hub-content">
          <section class="hub-section">
            <div class="hub-section__eyebrow">Get started</div>
            <h3 class="hub-section__title">How to participate in a PRISM screen</h3>
            <v-timeline
              class="hub-steps"
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
                <div class="hub-steps__text">{{ step }}</div>
              </v-timeline-item>
            </v-timeline>
            <v-btn
              to="/consortium-screens/collaborating"
              append-icon="mdi-arrow-right"
              variant="outlined"
              color="primary"
              class="hub-cta"
              rounded
              block
              >Learn about collaborating</v-btn
            >
          </section>

          <section class="hub-section mt-4">
            <h3 class="hub-section__title">Screen — Test Agents</h3>
            <ul class="hub-assays">
              <li v-for="key in Object.keys(assays)" :key="key" class="hub-assays__item">
                <div class="hub-assays__name">{{ key }}</div>
                <div class="hub-assays__agents">{{ assays[key].test_agents }}</div>
              </li>
            </ul>
            <v-btn
              to="/consortium-screens/assays"
              append-icon="mdi-arrow-right"
              variant="outlined"
              color="primary"
              class="hub-cta"
              rounded
              block
              >More about assays</v-btn
            >
          </section>
        </aside>
      </div>
    </app-container>
  </page>
</template>

<script>
  import { ASSAYS } from '@/utils/assays';
  export default {
    name: 'SubmissionsOverview',
    data() {
      return {
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
            submission_window: 'September 7 – 18 2026',
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
  /* ── Two-column layout ──────────────────────────────────────────── */
  .hub-layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .hub-layout__main {
    flex: 1;
    min-width: 0;
  }

  .hub-layout__sidebar {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 80px;
    background-color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    padding: 16px 20px 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  /* ── Shared content styles ──────────────────────────────────────── */
  .hub-content .hub-section {
    padding: 4px 0;
  }

  .hub-content .hub-section__eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--v-primary-darken-1, #1976d2);
    margin-bottom: 6px;
  }

  .hub-content .hub-section__title {
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.35;
    color: rgba(0, 0, 0, 0.87);
    margin: 0 0 16px;
  }

  .hub-content .hub-steps {
    margin: 0 4px 20px;
  }

  .hub-content .hub-steps.v-timeline--vertical.v-timeline {
    grid-row-gap: 8px;
  }

  .hub-content .hub-steps .v-timeline-item__body {
    padding-inline-start: 12px;
    padding-block: 2px;
  }

  .hub-content .hub-steps__text {
    font-size: 0.875rem;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.78);
  }

  .hub-content .hub-assays {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .hub-content .hub-assays__item {
    padding: 0 12px;
    border-radius: 8px;
  }

  .hub-content .hub-assays__name {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.87);
    letter-spacing: 0.02em;
  }

  .hub-content .hub-assays__agents {
    font-size: 0.8rem;
    line-height: 1.4;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 2px;
  }

  .hub-content .hub-cta {
    text-transform: none;
    letter-spacing: 0.01em;
    font-weight: 500;
  }

  /* ── Schedule table ─────────────────────────────────────────────── */
  #submission-hub__schedule-table {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

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

  #submission-hub__schedule-table tbody td,
  #submission-hub__schedule-table .v-data-table__td {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.82);
    height: 56px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  }

  #submission-hub__schedule-table tbody td:first-child,
  #submission-hub__schedule-table .v-data-table__td:first-child {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }

  #submission-hub__schedule-table tbody tr:nth-child(even) > td,
  #submission-hub__schedule-table tbody tr:nth-child(even) > .v-data-table__td {
    background: rgba(0, 0, 0, 0.015);
  }

  #submission-hub__schedule-table tbody tr:last-child > td,
  #submission-hub__schedule-table tbody tr:last-child > .v-data-table__td {
    border-bottom: 0 !important;
  }
</style>
