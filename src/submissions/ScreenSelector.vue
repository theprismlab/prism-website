<template>
  <v-select
    :model-value="$route.params.screen"
    :items="screens"
    :placeholder="$route.params.screen ? undefined : 'Select screen'"
    hide-details
    v-model:menu="menuOpen"
    @update:model-value="onScreenChange"
  >
    <template #item="{ item, props }">
      <v-list-item v-bind="props" :title="undefined">
        <div class="d-flex align-center justify-space-between w-100">
          <span>{{ item.value }}</span>
          <span
            v-if="currentStatuses[item.value]"
            class="status-dot"
            :style="{ backgroundColor: statusMeta(currentStatuses[item.value]).dotColor }"
          />
        </div>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
  import { fetchSubmissionMessage } from './submissions-page-api.js';
  import { normalizeStatus, statusMeta, SCREEN_STATUSES } from './status-utils.js';

  export default {
    name: 'ScreenSelector',
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
        useApiStatus: false, // flip to true when API is ready
        apiUrl: import.meta.env.VITE_API_URL,
        apiStatuses: {},
      };
    },
    computed: {
      currentStatuses() {
        return this.useApiStatus ? this.apiStatuses : SCREEN_STATUSES;
      },
    },
    async mounted() {
      if (!this.$route.params.screen) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
      if (this.useApiStatus) await this.fetchStatuses();
    },
    methods: {
      statusMeta,
      async fetchStatuses() {
        try {
          const messages = await fetchSubmissionMessage(this.apiUrl);
          const map = {};
          for (const msg of messages || []) {
            if (msg.submission_type) map[msg.submission_type] = normalizeStatus(msg.status);
          }
          this.apiStatuses = map;
        } catch (e) {
          console.error('ScreenSelector: failed to load statuses', e);
        }
      },
      onScreenChange(screen) {
        const segments = this.$route.path.split('/');
        const screenIndex = segments.indexOf(this.$route.params.screen);
        if (screenIndex !== -1) {
          segments[screenIndex] = screen;
          this.$router.push(segments.join('/'));
        } else {
          this.$router.push(`${this.$route.path}/${screen}`);
        }
      },
    },
  };
</script>

<style scoped>
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
