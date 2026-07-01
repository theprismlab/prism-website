import { defineStore } from 'pinia';
import { fetchSubmissionMessage, stripSeqSuffix } from './api.js';

export const useWindowStatusStore = defineStore('windowStatus', {
  state: () => ({
    statuses: {}, // raw message objects keyed by submission_type (with '_SEQ' stripped)
    loading: false,
    loaded: false,
    _loadPromise: null,
  }),
  actions: {
    // Returns a promise that resolves once statuses are loaded. Concurrent callers share the
    // same in-flight promise instead of no-op'ing past a load that hasn't landed yet.
    load(apiUrl) {
      if (this.loaded) return Promise.resolve();
      if (!this._loadPromise) {
        this.loading = true;
        this._loadPromise = fetchSubmissionMessage(apiUrl)
          .then((messages) => {
            const map = {};
            for (const msg of messages || []) {
              const key = stripSeqSuffix(msg.submission_type);
              if (key) map[key] = msg;
            }
            this.statuses = map;
            this.loaded = true;
          })
          .catch((e) => {
            console.error('Failed to load window statuses', e);
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
