<template>
  <page>
    <app-container wide>
      <prism-page-title>Submissions</prism-page-title>
      <p class="prism-text-body-1">
        Welcome to the PRISM submission portal. Here you can find information about upcoming
        submission windows and submit your screen proposal when the window is open.
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

    <v-navigation-drawer v-model="drawerOpen" location="right" width="320" :order="2" floating>
      <h3>How to participate in a PRISM screen</h3>
      <v-list lines="two" class="pa-2">
        <v-list-item
          prepend-icon="mdi-numeric-1-circle-outline"
          title="Choose a screen"
          subtitle="Browse the schedule and select a screen that fits your research goals."
        />
        <v-list-item
          prepend-icon="mdi-numeric-2-circle-outline"
          title="Submit your proposal"
          subtitle="Complete the submission form during the open window for your chosen screen."
        />
        <v-list-item
          prepend-icon="mdi-numeric-3-circle-outline"
          title="Receive your data"
          subtitle="After the screen runs, processed data will be delivered by the estimated date."
        />
      </v-list>
      <v-divider />
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
  export default {
    name: 'SubmissionsOverview',
    data() {
      return {
        drawerOpen: true,
        headers: [
          { title: 'Screen Name', key: 'screen', sortable: false },
          { title: 'Timepoint', key: 'time_point', sortable: false },
          { title: 'Types of Test Agents', key: 'test_agents', sortable: false },
          { title: 'Submission Window', key: 'submission_window', sortable: false },
          { title: 'Status', key: 'status', sortable: false },
          { title: 'Estimated Data Delivery', key: 'data_delivery_date', sortable: false },
        ],
        // TODO: replace with API data
        schedule: [
          {
            screen: 'EPS008',
            time_point: '10 day',
            test_agents: 'Single agent, DMSO only',
            submission_window: 'June 15 – 26',
            status: null,
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS033',
            time_point: '5 day',
            test_agents: 'Single agent, DMSO only',
            submission_window: 'July 13 – 24',
            status: null,
            data_delivery_date: 'November 2026',
          },
          {
            screen: 'MTS034, CPS017, APS009, AIR003',
            time_point: '5 day',
            test_agents: "Single agent and combination DMSO, ADC's, antibodies and cytokines",
            submission_window: 'September 7 – 18',
            status: null,
            data_delivery_date: 'January 2027',
          },
          {
            screen: 'EPS009 (PR1000)',
            time_point: '10 day',
            test_agents: 'Single agent, DMSO only',
            submission_window: 'November 2 – 13',
            status: null,
            data_delivery_date: 'April 2027',
          },
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

<style scoped></style>
