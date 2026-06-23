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
      width="320"
      :order="2"
      floating
      id="submission-hub__navigation-drawer-right"
    >
      <h3 class="prism-text-h6">How to participate in a PRISM screen</h3>
      <v-list nav>
        <v-list-item
          lines="ten"
          prepend-icon="mdi-numeric-1-circle-outline"
          title="Complete a submission form"
        />
        <v-list-item
          lines="ten"
          prepend-icon="mdi-numeric-2-circle-outline"
          title="Provide funding to your quote (if applicable)"
        />
        <v-list-item
          lines="ten"
          prepend-icon="mdi-numeric-3-circle-outline"
          title="Ship your compounds to our lab"
        />
      </v-list>
      <v-btn
        to="/consortium-screens/collaborating"
        append-icon="mdi-arrow-right"
        variant="outlined"
        class="mt-4"
        rounded
        >Learn about collaborating</v-btn
      >

      <h3 class="prism-text-h6 mt-6">Screen - Test Agents</h3>
      <v-list nav>
        <v-list-item
          v-for="key in Object.keys(assays)"
          :key="key"
          :title="key"
          lines="ten"
          :subtitle="assays[key].test_agents"
        />
      </v-list>
      <v-btn
        to="/consortium-screens/assays"
        append-icon="mdi-arrow-right"
        variant="outlined"
        class="mt-4"
        rounded
        >More about assays</v-btn
      >
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
    padding: 24px;
    top: 64px;
    height: calc(100% - 64px);
    background-color: #f4f4f4;
  }
  #submission-hub__navigation-drawer-right > * > * .v-list-item__prepend {
    width: 32px !important;
  }
  .v-list-item__prepend > .v-icon > .v-list-item__spacer {
    width: 0px !important;
  }
</style>
