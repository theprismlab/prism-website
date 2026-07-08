// Shared "load once, share in-flight fetches, refresh on demand" scaffolding for Pinia stores
// whose state is built from a single cached API fetch. Used by screen-status-store.js so the
// load/cache bookkeeping only lives in one place.

export function loadableState() {
  return { loaded: false, _loadPromise: null };
}

// `applyFetch(apiUrl)` runs with `this` bound to the store — it should await the API call(s) and
// assign the result directly onto store state (e.g. `this.screens = await findScreens(apiUrl)`).
// Store-specific shaping (e.g. array-to-map keying) stays in the store; this only owns the
// load-once/share-in-flight bookkeeping around it.
export function loadableActions(applyFetch) {
  return {
    // Resolves once loaded. Concurrent callers share the same in-flight promise. Uses the
    // cache once loaded — call refresh() instead when you need genuinely current data.
    load(apiUrl) {
      if (this.loaded) return Promise.resolve();
      return this._fetch(apiUrl);
    },
    // Always re-fetches, bypassing the cache, sharing in-flight-ness the same way load() does.
    refresh(apiUrl) {
      return this._fetch(apiUrl);
    },
    _fetch(apiUrl) {
      if (!this._loadPromise) {
        this._loadPromise = applyFetch
          .call(this, apiUrl)
          .then(() => {
            this.loaded = true;
          })
          .catch((e) => {
            console.error('Failed to load', e);
          })
          .finally(() => {
            this._loadPromise = null;
          });
      }
      return this._loadPromise;
    },
  };
}
