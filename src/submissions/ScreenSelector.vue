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
  import { normalizeStatus, statusMeta, SCREEN_STATUSES } from './status-utils.js';
  import { useWindowStatusStore } from './window-status-store.js';

  export default {
    name: 'ScreenSelector',
    setup() {
      return { windowStore: useWindowStatusStore() };
    },
    data() {
      return {
        screens: ['MTS', 'CPS', 'APS', 'EPS', 'AIR'],
        menuOpen: false,
        useApiStatus: false, // flip to true when API is ready
      };
    },
    computed: {
      currentStatuses() {
        if (!this.useApiStatus) return SCREEN_STATUSES;
        return Object.fromEntries(
          Object.entries(this.windowStore.statuses).map(([type, msg]) => [
            type,
            normalizeStatus(msg.status),
          ]),
        );
      },
    },
    mounted() {
      if (!this.$route.params.screen) {
        this.$nextTick(() => {
          this.menuOpen = true;
        });
      }
      if (this.useApiStatus) this.windowStore.load(import.meta.env.VITE_API_URL);
    },
    methods: {
      statusMeta,
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
