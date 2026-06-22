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
      <div class="pa-6">
        <h3 class="prism-text-h4">How to participate in a PRISM screen</h3>
        <v-list class="pa-0 mt-4" nav>
          <v-list-item
            prepend-icon="mdi-numeric-1-circle-outline"
            title="Complete a submission form"
          />
          <v-list-item
            prepend-icon="mdi-numeric-2-circle-outline"
            title="Provide funding to your quote (if applicable)"
          />
          <v-list-item
            prepend-icon="mdi-numeric-3-circle-outline"
            title="Ship your compounds to our lab"
          />
        </v-list>
      </div>
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

<style lang="scss" scoped>
  #submission-hub__navigation-drawer-right {
    top: 64px;
    height: calc(100% - 64px);
    background-color: #f4f4f4;
  }
  .v-list-item__prepend {
    width: 32px !important;
  }
  .v-list-item__prepend > .v-icon > .v-list-item__spacer {
    width: 0px !important;
  }
</style>
