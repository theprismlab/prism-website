import * as pdfjsLib from 'pdfjs-dist';
import PdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = PdfWorker;

const cache = new Map();

/**
 * Load a PDF and return its outline as a nested array.
 * Each node is `{ title, key, hash, children }`:
 *   - `title`    is the bookmark label.
 *   - `key`      is a stable identifier used in the route query.
 *   - `hash`     is the URL fragment to append to the PDF src so the
 *                embedded viewer scrolls to that section.
 *   - `children` is an array of nested nodes (same shape).
 *
 * Google Docs exports headings with auto-generated named destinations
 * (e.g. `h.abc123`), not the human-readable header text, so we resolve
 * them from the PDF itself instead of hard-coding them.
 */
export function loadPdfOutline(url) {
  if (!cache.has(url)) {
    const pending = fetchOutline(url).catch((err) => {
      // Don't cache failures: drop from the cache so the next call retries.
      cache.delete(url);
      // eslint-disable-next-line no-console
      console.error(`[pdf-outline] Failed to load outline for ${url}:`, err);
      return [];
    });
    cache.set(url, pending);
  }
  return cache.get(url);
}

/** Flatten a nested outline into a single list, depth-first. */
export function flattenOutline(items) {
  console.log('Flattening outline', items);
  const out = [];
  for (const item of items) {
    out.push(item);
    if (item.children && item.children.length) {
      out.push(...flattenOutline(item.children));
    }
  }
  return out;
}

async function fetchOutline(url) {
  const pdf = await pdfjsLib.getDocument({ url }).promise;
  const outline = await pdf.getOutline();
  if (!outline || outline.length === 0) return [];
  const namedDestIndex = await buildNamedDestIndex(pdf);
  return buildItems(pdf, outline, namedDestIndex);
}

/**
 * Build a reverse map from dest-array signature → named destination string.
 * This lets us resolve explicit array destinations back to `nameddest=` keys
 * rather than falling back to bare page numbers.
 */
async function buildNamedDestIndex(pdf) {
  const index = new Map();
  const dests = await pdf.getDestinations();
  if (!dests) return index;
  for (const [name, destArray] of Object.entries(dests)) {
    if (destArray?.[0]) {
      const key = destArrayKey(destArray);
      if (!index.has(key)) index.set(key, name);
    }
  }
  return index;
}

/** Stable string key for a destination array based on page ref + position. */
function destArrayKey(destArray) {
  const ref = destArray[0];
  const x = destArray[2] != null ? Math.round(destArray[2]) : '';
  const y = destArray[3] != null ? Math.round(destArray[3]) : '';
  return `${ref.num}:${ref.gen}:${x}:${y}`;
}

async function buildItems(pdf, nodes, namedDestIndex, level = 0) {
  const items = [];
  for (const node of nodes) {
    const resolved = await resolveDest(pdf, node.dest, namedDestIndex);
    if (!resolved) continue;
    const children = node.items?.length ? await buildItems(pdf, node.items, namedDestIndex, level + 1) : [];
    items.push({ title: node.title, level, ...resolved, children });
  }
  return items;
}

async function resolveDest(pdf, dest, namedDestIndex) {
  // Named destination -> a string we can pass straight through.
  if (typeof dest === 'string') {
    return { key: dest, hash: `nameddest=${encodeURIComponent(dest)}` };
  }

  // Explicit destination array: try reverse-lookup into named destinations first.
  if (!Array.isArray(dest)) return null;

  const name = namedDestIndex.get(destArrayKey(dest));
  if (name) {
    return { key: name, hash: `nameddest=${encodeURIComponent(name)}` };
  }

  // Last resort: fall back to page number.
  try {
    const pageIndex = await pdf.getPageIndex(dest[0]);
    const pageNumber = pageIndex + 1;
    return { key: `page-${pageNumber}`, hash: `page=${pageNumber}` };
  } catch {
    return null;
  }
}
