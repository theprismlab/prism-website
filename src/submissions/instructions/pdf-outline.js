import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
// Same-origin path, proxied to assets.clue.io by vite.config.mjs (dev) and
// website.conf (prod nginx) — see the comment on fetchOutline() below for why.
const PDF_BASE_URL = '/pdf-assets/prism/compound-submission/';
export const PDF_PATHS = {
  TEST_AGENT: {
    AIR: `${PDF_BASE_URL}PRISM-AIR-Submission-Information.pdf`,
    APS: `${PDF_BASE_URL}PRISM-APS-Submission-Information.pdf`,
    MTS: `${PDF_BASE_URL}PRISM-MTS-Submission-Information.pdf`,
    CPS: `${PDF_BASE_URL}PRISM-CPS-Submission-Information.pdf`,
    EPS: `${PDF_BASE_URL}PRISM-EPS-Submission-Information.pdf`,
  },
  SHIPPING: `${PDF_BASE_URL}Shipping-Information-for-PRISM-Screens.pdf`,
};

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

// assets.clue.io's CloudFront distribution intermittently serves cached PDF
// responses missing Access-Control-Allow-Origin — its cache key doesn't vary
// on the Origin request header, so whichever request first populated the
// cache for a given PDF "wins" for everyone afterward regardless of whether
// their own request carried an Origin header. That's sticky per edge node,
// not random per-request, so there's no reliable per-request fix (retries,
// cache-busting query params) — hence PDF_BASE_URL routing this same-origin
// through our own proxy instead of hitting assets.clue.io directly from the
// browser, sidestepping CORS entirely.
async function fetchOutline(url) {
  const pdf = await pdfjsLib.getDocument({ url, disableRange: true, disableStream: true }).promise;
  const outline = await pdf.getOutline();
  if (!outline || outline.length === 0) return [];
  const namedDestIndex = await buildNamedDestIndex(pdf);
  return buildItems(pdf, outline, namedDestIndex);
}

/**
 * Build two lookup structures from the PDF's named destinations:
 *   byKey  — exact coord key → name (fast exact match)
 *   byPage — page-ref key → [{y, name}] sorted desc (fuzzy nearest-y match)
 *
 * Google Docs sometimes exports outline bookmarks with slightly different
 * coordinates than the named destinations they conceptually correspond to,
 * so we need both strategies.
 */
async function buildNamedDestIndex(pdf) {
  const byKey = new Map();
  const byPage = new Map();
  const dests = await pdf.getDestinations();
  if (!dests) return { byKey, byPage };
  for (const [name, destArray] of Object.entries(dests)) {
    if (!destArray?.[0]) continue;
    const key = destArrayKey(destArray);
    if (!byKey.has(key)) byKey.set(key, name);
    const pageKey = `${destArray[0].num}:${destArray[0].gen}`;
    const y = destArray[3] ?? 0;
    if (!byPage.has(pageKey)) byPage.set(pageKey, []);
    byPage.get(pageKey).push({ y, name });
  }
  // Sort each page's entries descending by y (top of page first in PDF coords).
  for (const entries of byPage.values()) entries.sort((a, b) => b.y - a.y);
  return { byKey, byPage };
}

/** Stable string key for a destination array based on page ref + position. */
function destArrayKey(destArray) {
  const ref = destArray[0];
  const x = destArray[2] != null ? Math.round(destArray[2]) : '';
  const y = destArray[3] != null ? Math.round(destArray[3]) : '';
  return `${ref.num}:${ref.gen}:${x}:${y}`;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function buildItems(pdf, nodes, namedDestIndex, level = 0, slugCounts = new Map()) {
  const items = [];
  for (const node of nodes) {
    const resolved = await resolveDest(pdf, node.dest, namedDestIndex);
    if (!resolved) continue;
    const base = slugify(node.title) || resolved.key;
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count}`;
    const children = node.items?.length
      ? await buildItems(pdf, node.items, namedDestIndex, level + 1, slugCounts)
      : [];
    items.push({ title: node.title, slug, level, ...resolved, children });
  }
  return items;
}

async function resolveDest(pdf, dest, namedDestIndex) {
  // Named destination string — pass straight through.
  if (typeof dest === 'string') {
    const d = dest.trim();
    return { key: d, hash: `nameddest=${encodeURIComponent(d)}` };
  }

  if (!Array.isArray(dest)) return null;

  // Exact coordinate match against the named-destination index.
  const name = namedDestIndex.byKey.get(destArrayKey(dest));
  if (name) {
    return { key: name, hash: `nameddest=${encodeURIComponent(name)}` };
  }

  // Fuzzy match: find the named destination on the same page whose y is
  // closest to this bookmark's y. Google Docs sometimes stores outline
  // bookmarks at slightly different coordinates than the named destinations.
  const ref = dest[0];
  const pageKey = `${ref.num}:${ref.gen}`;
  const pageEntries = namedDestIndex.byPage.get(pageKey);
  if (pageEntries?.length) {
    const y = dest[3] ?? 0;
    const closest = pageEntries.reduce((a, b) => (Math.abs(a.y - y) <= Math.abs(b.y - y) ? a : b));
    return { key: closest.name, hash: `nameddest=${encodeURIComponent(closest.name)}` };
  }

  // Last resort: page number.
  try {
    const pageIndex = await pdf.getPageIndex(dest[0]);
    const pageNumber = pageIndex + 1;
    return { key: `page-${pageNumber}`, hash: `page=${pageNumber}` };
  } catch {
    return null;
  }
}
