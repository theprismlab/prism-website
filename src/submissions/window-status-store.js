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
    // `.statuses[type]` directly.
    messageFor: (state) => (submissionType) =>
      submissionType ? (state.statuses[submissionType] ?? null) : null,
    // `fetchSubmissionMessage` returns one row per real submission type, so its keys (after
    // stripSeqSuffix) are the canonical list of known screen types — used by Instructions
    // (which has no :screen to resolve, only a :screenType to validate) to reject a bogus or
    // typo'd type in the URL.
    isValidType: (state) => (submissionType) =>
      !!submissionType && submissionType in state.statuses,
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
