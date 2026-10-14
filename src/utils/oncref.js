// Loading, filtering, and counting helpers for the OncRef dataset.
// Source files live in public/data/oncref/ and are fetched once per session.
//
//   const { compounds } = await loadOncrefData();
//   countWhere(compounds, { drugClass: 'biologic' });              // 23
//   countBy(compounds, 'pathway');                                  // [{ name, count }, ...]
//   filterCompounds(compounds, { modality: ['PROTAC', 'degrader'], search: 'BRD4' });

const DATA_PATH = '/data/oncref';

let dataPromise = null;

async function fetchJSON(file) {
  const res = await fetch(`${DATA_PATH}/${file}`);
  if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
  return res.json();
}

/**
 * Fetch compounds, CRISPR genes, and category metadata.
 * The result is cached; a failed load is not, so it can be retried.
 * @returns {Promise<{ compounds: object[], crisprGenes: object[], categories: object }>}
 */
export function loadOncrefData() {
  if (!dataPromise) {
    dataPromise = Promise.all([
      fetchJSON('compounds.json'),
      fetchJSON('crispr-genes.json'),
      fetchJSON('categories.json'),
    ])
      .then(([compounds, crisprGenes, categories]) => ({ compounds, crisprGenes, categories }))
      .catch((err) => {
        dataPromise = null;
        throw err;
      });
  }
  return dataPromise;
}

// Treat single values and arrays uniformly
const toArray = (value) => (Array.isArray(value) ? value : [value]);

function matchesSearch(compound, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [compound.name, ...compound.synonyms, ...compound.targets].some((v) =>
    v.toLowerCase().includes(q),
  );
}

/**
 * Subset compounds. Each key in `filters` is a compound field; its value is a single
 * value or an array of accepted values. Array fields (e.g. `targets`) match if any
 * element is accepted. `search` matches name, synonyms, and targets (case-insensitive).
 * Filters with null/undefined/empty values are ignored.
 */
export function filterCompounds(compounds, filters = {}) {
  const { search, ...fields } = filters;
  const active = Object.entries(fields).filter(
    ([, value]) => value != null && value !== '' && !(Array.isArray(value) && !value.length),
  );

  return compounds.filter((compound) => {
    if (search && !matchesSearch(compound, search)) return false;
    return active.every(([field, value]) => {
      const accepted = toArray(value);
      return toArray(compound[field]).some((v) => accepted.includes(v));
    });
  });
}

/** Number of compounds matching `filters` (see filterCompounds). */
export function countWhere(compounds, filters) {
  return filterCompounds(compounds, filters).length;
}

/**
 * Count compounds per value of `field`, sorted by count (descending).
 * For array fields, each element is counted. Missing values (null or an empty
 * array) are skipped, or counted under `missingLabel` when one is given.
 * @returns {{ name: string, count: number }[]}
 */
export function countBy(compounds, field, { missingLabel } = {}) {
  const counts = new Map();
  const add = (key) => counts.set(key, (counts.get(key) || 0) + 1);
  for (const compound of compounds) {
    const values = toArray(compound[field]).filter((v) => v != null);
    if (!values.length && missingLabel) add(missingLabel);
    values.forEach(add);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Sorted distinct non-null values of `field` (array fields are flattened). */
export function uniqueValues(compounds, field) {
  return countBy(compounds, field)
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));
}
