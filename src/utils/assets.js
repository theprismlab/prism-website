// Centralized asset base URL for remote images hosted on the Clue CDN.
// Use `assetUrl(path)` to build full URLs, or `ASSET_BASE` directly when
// you need just the prefix (e.g. for template string concatenation).
export const ASSET_BASE = 'https://assets.clue.io/theprismlab.org/';

export function assetUrl(path = '') {
  return `${ASSET_BASE}${path}`;
}
