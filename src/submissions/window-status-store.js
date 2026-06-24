import { defineStore } from 'pinia';
import { fetchSubmissionMessage } from './api.js';

export const useWindowStatusStore = defineStore('windowStatus', {
  state: () => ({
    statuses: {}, // raw message objects keyed by submission_type
    loading: false,
    loaded: false,
  }),
  actions: {
    async load(apiUrl) {
      if (this.loaded || this.loading) return;
      this.loading = true;
      try {
        const messages = await fetchSubmissionMessage(apiUrl);
        console.log('Fetched window statuses', messages);
        const map = {};
        for (const msg of messages || []) {
          if (msg.submission_type) map[msg.submission_type] = msg;
        }
        this.statuses = map;
        this.loaded = true;
      } catch (e) {
        console.error('Failed to load window statuses', e);
      } finally {
        this.loading = false;
      }
    },
  },
});
