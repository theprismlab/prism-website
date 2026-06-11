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
  return buildItems(pdf, outline);
}

async function buildItems(pdf, nodes) {
  const items = [];
  for (const node of nodes) {
    const resolved = await resolveDest(pdf, node.dest);
    if (!resolved) continue;
    const children = node.items && node.items.length ? await buildItems(pdf, node.items) : [];
    items.push({ title: node.title, ...resolved, children });
  }
  return items;
}

async function resolveDest(pdf, dest) {
  // Named destination -> a string we can pass straight through.
  if (typeof dest === 'string') {
    return { key: dest, hash: `nameddest=${encodeURIComponent(dest)}` };
  }

  // Explicit destination array: [pageRef, {name: 'XYZ'|'Fit'|...}, ...args]
  let destArray = dest;
  if (!Array.isArray(destArray)) return null;

  try {
    const pageIndex = await pdf.getPageIndex(destArray[0]);
    const pageNumber = pageIndex + 1;
    return { key: `page-${pageNumber}`, hash: `page=${pageNumber}` };
  } catch {
    return null;
  }
}
