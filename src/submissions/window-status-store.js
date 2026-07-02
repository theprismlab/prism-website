import { defineStore } from 'pinia';
import { fetchSubmissionMessage, stripSeqSuffix } from './api.js';
import { loadableState, loadableActions } from './loadable.js';

export const useWindowStatusStore = defineStore('windowStatus', {
  state: () => ({
    statuses: {}, // raw message objects keyed by submission_type (with '_SEQ' stripped)
    ...loadableState(),
  }),
  getters: {
    // Mirrors active-screen-store's getter-wrapped access instead of consumers reaching into
    // `.statuses[type]` directly. Normalized here (case-insensitive, own-keys-only lookup) so
    // every consumer gets that for free instead of each having to remember to uppercase a
    // route-param screenType before checking — that mismatch (some callers uppercased, some
    // didn't) was a real bug. `hasOwnProperty` instead of `in`/bracket access avoids matching
    // inherited Object.prototype keys (e.g. a URL segment literally named "constructor").
    messageFor: (state) => (submissionType) => {
      if (!submissionType) return null;
      const key = submissionType.toUpperCase();
      return Object.prototype.hasOwnProperty.call(state.statuses, key) ? state.statuses[key] : null;
    },
    // `fetchSubmissionMessage` returns one row per real submission type, so its keys (after
    // stripSeqSuffix) are the canonical list of known screen types — used by Instructions
    // (which has no :screen to resolve, only a :screenType to validate) to reject a bogus or
    // typo'd type in the URL.
    isValidType: (state) => (submissionType) =>
      !!submissionType &&
      Object.prototype.hasOwnProperty.call(state.statuses, submissionType.toUpperCase()),
  },
  // load()/refresh()/_fetch() come from loadable.js — same shared scaffolding
  // active-screen-store.js uses.
  actions: loadableActions(async function (apiUrl) {
    const messages = await fetchSubmissionMessage(apiUrl);
    const map = {};
    for (const msg of messages || []) {
      const key = stripSeqSuffix(msg.submission_type);
      if (key) map[key] = msg;
    }
    this.statuses = map;
  }),
});

// Shared wording for an unrecognized :screenType — kept in one place since it's used by
// InstructionsSubDrawer.vue, test-agent.vue, and shipping.vue.
export function invalidScreenTypeMessage(screenType) {
  return `'${screenType}' is not a valid screen type. Please select one from the menu`;
}
