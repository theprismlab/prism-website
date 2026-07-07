import { defineStore } from 'pinia';
import { findScreens, stripSeqSuffix } from './api.js';
import { loadableState, loadableActions } from './loadable.js';

export const useActiveScreenStore = defineStore('activeScreen', {
  state: () => ({
    screens: [], // raw findScreens() results, all EXTERNAL screens
    ...loadableState(),
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
    // current for the type is viewable/submittable — not merely any ACTIVE screen sharing the
    // type, and not a screen that used to be current but no longer is (e.g. COMPLETE, window
    // closed). Whatever the reason screenName isn't that exact match — wrong type, not
    // registered, or simply no longer current — it's the same single INVALID message below;
    // none of those reasons get their own distinct wording.
    validationFor() {
      return (screenName, screenType) => {
        const invalid = {
          status: 'INVALID',
          message: `Screen '${screenName}' is not associated with submission type '${screenType}'`,
        };
        if (!screenName || !screenType) return invalid;
        if (this.activeScreenNameFor(screenType) === screenName) {
          return { status: null, message: null };
        }
        return invalid;
      };
    },
  },
  // load()/refresh()/_fetch() come from loadable.js — shared load-once/share-in-flight/error
  // scaffolding. refresh() always re-fetches, bypassing the cache, for moments that need
  // up-to-the-second data (e.g. re-validating a screen right before submitting a form).
  actions: loadableActions(async function (apiUrl) {
    this.screens = await findScreens(apiUrl);
    console.log(
      '[activeScreenStore] fetched screens',
      this.screens.map((s) => ({ screen_type: s.screen_type, name: s.name, status: s.status })),
    );
  }),
});
