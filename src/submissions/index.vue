<template>
  <page>
    <app-container wide>
      <div class="hub-layout">
        <div class="hub-layout__main">
          <prism-page-title>Submission Hub</prism-page-title>
          <p class="prism-text-body-1">
            [BLURB NEEDED] Welcome to the PRISM Submission Hub. Here, you can explore upcoming
            screens, access detailed instructions, and submit your test agents to participate in our
            consortium screens.<br /><br />
            <!-- The next PRISM screens will be in July 2026 for DMSO-soluble single agents only (MTS)
            and Fall 2026 for DMSO-soluble single agents and combinations, as well as single aqueous
            test agents. Data delivery for the current screens (MTS032, CPS016, APS008, and AIR002)
            is planned for September 2026.
            <br /><br /> -->
          </p>

          <h2 class="prism-text-h3">Screening Schedule 2026</h2>
          <v-data-table
            :headers="headers"
            :items="schedule"
            :items-per-page="-1"
            hide-default-footer
            class="mt-4"
            id="submission-hub__schedule-table"
          >
            <template #item.submission_window="{ item }">
              {{ formatWindow(item) }}
            </template>

            <template #item.status="{ item }">
              <v-chip
                :to="
                  computedStatus(item) === 'OPEN'
                    ? `/submission-hub/forms/${item.screen}`
                    : undefined
                "
                :color="statusMeta(computedStatus(item)).color"
                size="small"
                variant="flat"
                :append-icon="computedStatus(item) === 'OPEN' ? 'mdi-arrow-top-right' : ''"
              >
                {{ statusMeta(computedStatus(item)).label }}
              </v-chip>
            </template>

            <!-- <template #item.window_status="{ item }">
              <v-progress-circular
                v-if="windowStore.loading"
                size="16"
                width="2"
                indeterminate
                color="grey"
              />
              <template v-else-if="windowStore.statuses[item.screen]">
                <div>{{ windowStore.statuses[item.screen].status }}</div>
                <div
                  v-if="windowStore.statuses[item.screen].message"
                  class="text-caption text-medium-emphasis mt-1"
                >
                  {{ windowStore.statuses[item.screen].message }}
                </div>
              </template>
              <span v-else class="text-grey-lighten-1">—</span>
            </template> -->
          </v-data-table>
        </div>

        <aside class="hub-layout__sidebar hub-content">
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
  import { statusMeta } from './status-utils.js';
  import { useWindowStatusStore } from './window-status-store.js';

  export default {
    name: 'SubmissionsOverview',
    setup() {
      return { windowStore: useWindowStatusStore() };
    },
    data() {
      return {
        headers: [
          { title: 'Screen Name', key: 'screen_name', sortable: false },
          { title: 'Timepoint', key: 'time_point', sortable: false },
          { title: 'Submission Window', key: 'submission_window', sortable: false },
          { title: 'Screen Status', key: 'status', sortable: false },
          // { title: 'API Status', key: 'window_status', sortable: false },
          { title: 'Estimated Data Delivery', key: 'data_delivery_date', sortable: false },
        ],
        schedule: [
          {
            screen: 'EPS',
            screen_name: 'EPS008',
            time_point: ASSAYS.EPS.time_point,
            window_start: '2026-06-15',
            window_end: '2026-06-26',
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS',
            screen_name: 'MTS033',
            time_point: ASSAYS.MTS.time_point,
            window_start: '2026-07-13',
            window_end: '2026-07-24',
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS',
            screen_name: 'MTS034',
            time_point: ASSAYS.MTS.time_point,
            window_start: '2026-09-07',
            window_end: '2026-09-18',
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'CPS',
            screen_name: 'CPS017',
            time_point: ASSAYS.CPS.time_point,
            window_start: '2026-09-07',
            window_end: '2026-09-18',
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'APS',
            screen_name: 'APS009',
            time_point: ASSAYS.APS.time_point,
            window_start: '2026-09-07',
            window_end: '2026-09-18',
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'AIR',
            screen_name: 'AIR003',
            time_point: ASSAYS.AIR.time_point,
            window_start: '2026-09-07',
            window_end: '2026-09-18',
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'EPS',
            screen_name: 'EPS009 (PR1000)',
            time_point: ASSAYS.EPS.time_point,
            window_start: '2026-11-02',
            window_end: '2026-11-13',
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
    mounted() {
      this.windowStore.load(import.meta.env.VITE_API_URL);
      console.log('windowStore', this.windowStore);
    },
    methods: {
      statusMeta,
      todayET() {
        // Returns 'YYYY-MM-DD' in US Eastern Time for lexicographic date comparison
        return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
      },
      computedStatus(item) {
        const today = this.todayET();
        if (today < item.window_start) return 'SCHEDULED';
        if (today <= item.window_end) return 'OPEN';
        return 'IN-PROGRESS';
      },
      formatWindow(item) {
        const start = new Date(item.window_start + 'T00:00:00Z');
        const end = new Date(item.window_end + 'T00:00:00Z');
        const startStr = start.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        });
        const endStr =
          start.getMonth() === end.getMonth()
            ? end.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })
            : end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });
        return `${startStr} – ${endStr}`;
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

  @media (max-width: 599px) {
    .hub-layout {
      flex-direction: column;
    }

    .hub-layout__sidebar {
      width: 100%;
      position: static;
      background: none;
      border: none;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 0;
      padding: 32px 0 0;
      box-shadow: none;
    }
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
