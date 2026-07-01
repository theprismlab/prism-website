<template>
  <page>
    <app-container wide>
      <div class="hub-layout">
        <div class="hub-layout__main">
          <prism-page-title>Submission Hub</prism-page-title>
          <p class="prism-text-body-1">
            Welcome to the PRISM Submission Hub. Explore upcoming screens, review submission
            instructions and guidelines, and submit your test agents to one of our consortium
            screens.
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
            <template #item.status="{ item }">
              <v-chip
                :to="
                  item.status === 'OPEN'
                    ? `/submission-hub/forms/${item.screen_type}/${item.screen_name}`
                    : undefined
                "
                :color="item.statusMeta.color"
                size="small"
                variant="flat"
                :append-icon="item.status === 'OPEN' ? 'mdi-arrow-top-right' : ''"
              >
                {{ item.statusMeta.label }}
              </v-chip>
            </template>
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
  import { enrichedSchedule, FIELD_LABELS, TABLE_FIELD_KEYS } from './schedule.js';

  export default {
    name: 'SubmissionsOverview',
    data() {
      return {
        headers: TABLE_FIELD_KEYS.map((key) => ({
          title: FIELD_LABELS[key],
          key,
          sortable: false,
        })),
        schedule: enrichedSchedule(),
        assays: ASSAYS,
        participationSteps: [
          'Complete a submission form',
          'Provide funding to your quote (if applicable)',
          'Ship your compounds to our lab',
        ],
      };
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
