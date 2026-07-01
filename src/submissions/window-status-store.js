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
