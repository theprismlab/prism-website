import { defineStore } from 'pinia';
import { findScreens } from './api.js';

function typeOf(screen) {
  return screen.screen_type?.endsWith('_SEQ')
    ? screen.screen_type.replace('_SEQ', '')
    : screen.screen_type;
}

export const useActiveScreenStore = defineStore('activeScreen', {
  state: () => ({
    screens: [], // raw findScreens() results, all EXTERNAL screens
    loading: false,
    loaded: false,
  }),
  getters: {
    // Newest ACTIVE screen for a screen type (e.g. 'MTS'), or null if none is open.
    // Matches sortScreens(activeScreens, 'date_created') in PRISM-data-portal's SubmissionsPage.
    activeScreenFor: (state) => (screenType) => {
      const matching = state.screens.filter(
        (screen) => typeOf(screen) === screenType && screen.status === 'ACTIVE',
      );
      if (matching.length === 0) return null;
      return matching.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))[0];
    },
  },
  actions: {
    async load(apiUrl) {
      if (this.loaded || this.loading) return;
      this.loading = true;
      try {
        this.screens = await findScreens(apiUrl);
        this.loaded = true;
      } catch (e) {
        console.error('Failed to load screens', e);
      } finally {
        this.loading = false;
      }
    },
  },
});
