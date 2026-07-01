import { defineStore } from 'pinia';
import { findScreens, stripSeqSuffix } from './api.js';

export const useActiveScreenStore = defineStore('activeScreen', {
  state: () => ({
    screens: [], // raw findScreens() results, all EXTERNAL screens
    loading: false,
    loaded: false,
    _loadPromise: null,
  }),
  getters: {
    // Newest ACTIVE screen for a screen type (e.g. 'MTS'), or null if none is open.
    // Matches sortScreens(activeScreens, 'date_created') in PRISM-data-portal's SubmissionsPage.
    activeScreenFor: (state) => (screenType) => {
      const matching = state.screens.filter(
        (screen) => stripSeqSuffix(screen.screen_type) === screenType && screen.status === 'ACTIVE',
      );
      if (matching.length === 0) return null;
      return matching.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))[0];
    },
    // Convenience wrapper — just the name, and tolerates a falsy screenType.
    activeScreenNameFor() {
      return (screenType) => (screenType ? (this.activeScreenFor(screenType)?.name ?? null) : null);
    },
    // Is this exact screen name valid to submit against for this type? { status: null } means
    // valid; { status: 'INVALID', message } means not — same shape screen-type.vue's alert and
    // ReviewStep's submit dialog both expect. Only the screen activeScreenNameFor designates as
    // current for the type is viewable/submittable (not merely any ACTIVE screen sharing the
    // type) — but a screen that's simply not current right now (e.g. COMPLETE, window closed)
    // gets its own message distinct from a name/type that don't belong together at all
    // (whether that's because the name isn't registered or belongs to a different type).
    validationFor() {
      return (screenName, screenType) => {
        if (!screenName || !screenType) {
          return {
            status: 'INVALID',
            message: `Screen '${screenName}' is not associated with submission type '${screenType}'`,
          };
        }
        const found = this.screens.find((screen) => screen.name === screenName);
        const foundType = found ? stripSeqSuffix(found.screen_type) : null;
        if (foundType !== screenType) {
          return {
            status: 'INVALID',
            message: `Screen '${screenName}' is not associated with submission type '${screenType}'`,
          };
        }
        if (this.activeScreenNameFor(screenType) !== screenName) {
          return {
            status: 'INVALID',
            message: `Screen '${screenName}' is not currently open for submissions`,
          };
        }
        return { status: null, message: null };
      };
    },
  },
  actions: {
    // Returns a promise that resolves once screens are loaded. Concurrent callers share the
    // same in-flight promise instead of no-op'ing past a load that hasn't landed yet. Uses the
    // cache once loaded — call refresh() instead when you need genuinely current data.
    load(apiUrl) {
      if (this.loaded) return Promise.resolve();
      return this._fetch(apiUrl);
    },
    // Always re-fetches, bypassing the cache — for moments that need up-to-the-second data
    // (e.g. re-validating a screen right before submitting a form).
    refresh(apiUrl) {
      return this._fetch(apiUrl);
    },
    _fetch(apiUrl) {
      if (!this._loadPromise) {
        this.loading = true;
        this._loadPromise = findScreens(apiUrl)
          .then((screens) => {
            this.screens = screens;
            this.loaded = true;
          })
          .catch((e) => {
            console.error('Failed to load screens', e);
          })
          .finally(() => {
            this.loading = false;
            this._loadPromise = null;
          });
      }
      return this._loadPromise;
    },
  },
});
