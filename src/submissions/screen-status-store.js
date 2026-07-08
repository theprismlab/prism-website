import { defineStore } from 'pinia';
import { getSubbmissionScreenInfo, stripSeqSuffix } from './api.js';
import { loadableState, loadableActions } from './loadable.js';

// Single source of truth for "what do we know about a submission type," keyed by screen_type
// (e.g. 'MTS'). Each entry answers two different questions, both resolved server-side now by
// submission-screen-info:
//   - name:   which screen is current for this type (newest 'ACTIVE' prism_screens row).
//   - status/message (+ rest): whether that screen currently accepts submissions, sourced from
//             prism_submission_window_message. That's the ONLY source for accessibility.
export const useScreenStatusStore = defineStore('screenStatus', {
  state: () => ({
    statuses: {}, // { [SCREEN_TYPE]: { ...raw submission-screen-info fields, name } }
    ...loadableState(),
  }),
  getters: {
    // Raw merged record for a screenType — accessibility status/message from
    // prism_submission_window_message plus the resolved screenName. Named "window" for the
    // submission window it comes from, so it doesn't collide with the API's own `.status`
    // field or the derived route-state vocabulary below.
    windowStatusFor: (state) => (screenType) =>
      screenType ? (state.statuses[screenType.toUpperCase()] ?? null) : null,
    // Convenience wrapper — just the current screen's name, tolerates a falsy screenType.
    activeScreenNameFor() {
      return (screenType) => this.windowStatusFor(screenType)?.name ?? null;
    },
    // submission-screen-info returns one row per real submission type, so its keys (after
    // stripSeqSuffix) are the canonical list of known screen types.
    isValidType: (state) => (screenType) =>
      !!screenType &&
      Object.prototype.hasOwnProperty.call(state.statuses, screenType.toUpperCase()),
    // Does this screenName even exist as the type's current screen? Pure identity check (from
    // prism_screens) — `valid` says nothing about accessibility. Whether that screen's window is
    // currently OPEN, CLOSED, or at MAX_CAPACITY lives on the type record itself
    // (windowStatusFor(screenType).status), not here — keeping the two questions separate
    // instead of collapsing them into one "valid" boolean.
    isValidScreen() {
      return (screenName, screenType) => {
        const invalid = {
          valid: false,
          message: `Screen '${screenName}' is not associated with submission type '${screenType}'`,
        };
        if (!screenName || !screenType) return invalid;
        const s = this.windowStatusFor(screenType);
        if (!s || s.name !== screenName) return invalid;
        return { valid: true, message: null };
      };
    },
    // Loading-aware wrapper for bare :screenType checks (instructions routes have no :screen
    // segment to further validate). `status` stays 'loading' until the store has fetched at
    // least once, so callers stop duplicating their own `!this.loaded` guard to avoid flashing
    // an error before data arrives.
    typeRouteStateFor() {
      return (screenType) => {
        if (!this.loaded) return { status: 'loading', message: null };
        const valid = this.isValidType(screenType);
        return {
          status: valid ? 'valid' : 'invalid',
          message: valid ? null : invalidScreenTypeMessage(screenType),
        };
      };
    },
    // Same shape as typeRouteStateFor, for :screenType + :screen pairs (forms routes) — combines
    // isValidScreen's identity check with the type's window status/message (OPEN vs.
    // CLOSED/MAX_CAPACITY/etc.), so callers get one tri-state answer for "should this render."
    screenRouteStateFor() {
      return (screenName, screenType) => {
        if (!this.loaded) return { status: 'loading', message: null };
        const identity = this.isValidScreen(screenName, screenType);
        if (!identity.valid) return { status: 'invalid', message: identity.message };
        const w = this.windowStatusFor(screenType);
        if (w?.status !== 'OPEN') return { status: 'invalid', message: w?.message };
        return { status: 'valid', message: null };
      };
    },
  },
  actions: loadableActions(async function (apiUrl) {
    const data = await getSubbmissionScreenInfo(apiUrl);
    console.log('[screenStatusStore] fetching statuses', data);
    const map = {};
    // Response is now an object keyed by screen_type (e.g. { AIR: {...}, MTS: {...} }),
    // rather than an array of rows carrying their own submission_type field.
    for (const [type, info] of Object.entries(data || {})) {
      const key = stripSeqSuffix(type)?.toUpperCase();
      if (key) map[key] = info;
    }
    this.statuses = map;
    console.log('[screenStatusStore] resolved statuses', this.statuses);
  }),
});

// Shared wording for an unrecognized :screenType — kept in one place since it's used by
// InstructionsSubDrawer.vue, test-agent.vue, and shipping.vue.
export function invalidScreenTypeMessage(screenType) {
  return `'${screenType}' is not a valid screen type. Please select one from the menu`;
}
