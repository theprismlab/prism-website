import * as d3 from 'd3';

const dataPath = import.meta.env.BASE_URL + 'data/';
const jsonFile = 'OncRef_LandingPage_v3_data.json';
const csvFile = 'OncRefManuscript_Test_Agents.csv';

/**
 * Attach UMAP coordinates to each CSV agent row, matched by compound name
 * (case-insensitive). Agents with no UMAP point get null coordinates.
 */
function joinUmap(agents, compounds) {
  const byName = new Map(compounds.map((c) => [c.n.toUpperCase(), c]));
  return agents.map((row) => {
    const umap = byName.get(row.CompoundName.toUpperCase());
    return {
      ...row,
      umap: umap ? { x: umap.x, y: umap.y, umapCls: umap.umapCls, n: umap.n } : null,
    };
  });
}

/**
 * Load and parse the OncRef manuscript data.
 *
 * @returns {Promise<{agents: Object[], crisprGenes: Object[]}>}
 *   agents: one object per test agent — the CSV row plus UMAP fields from the
 *     JSON (umapX, umapY, umapClass are null for agents without a UMAP point).
 *   crisprGenes: CRISPR gene UMAP points from the JSON, kept separate for the
 *     scatter plot.
 */
let dataPromise = null;

export function getOncRefData() {
  // Cached so every component on the page shares one fetch; a failed load is retried
  if (!dataPromise) {
    dataPromise = loadOncRefData().catch((err) => {
      dataPromise = null;
      throw err;
    });
  }
  return dataPromise;
}

async function loadOncRefData() {
  const [testAgents, umap] = await Promise.all([
    d3.csv(`${dataPath}${csvFile}`),
    d3.json(`${dataPath}${jsonFile}`),
  ]);

  return {
    agents: joinUmap(testAgents, umap.compounds),
    crisprGenes: umap.crisprGenes,
  };
}

// Display labels for the CSV `Class` values. Anything not listed falls back to the
// raw value so a new class in the data still shows up.
export const CLASS_LABELS = {
  'targeted small molecule': 'Targeted small molecules',
  biologic: 'Biologics / ADCs',
  'cytotoxic/genotoxic': 'Cytotoxic agents',
  phenotypic: 'Phenotypic agents',
  control: 'Controls',
};

/**
 * Count rows by the distinct values of one field.
 *
 * @param {Object[]} rows - e.g. getOncRefData().agents
 * @param {string} field - column to group on, e.g. 'Class' or 'Modality'
 * @param {Object} [options]
 * @param {string[]} [options.exclude=[]] - values left out of the result
 * @param {Object<string,string>} [options.labels={}] - display name per value;
 *   anything unlisted falls back to the raw value
 * @returns {{value: string, count: number, label: string}[]}
 *   one entry per distinct value, sorted by count descending. Rows where the
 *   field is empty are skipped.
 */
export function countByField(rows, field, { exclude = [], labels = {} } = {}) {
  const counts = d3.rollup(
    rows.filter((r) => r[field] && !exclude.includes(r[field])),
    (group) => group.length,
    (r) => r[field],
  );
  return Array.from(counts, ([value, count]) => ({
    value,
    count,
    label: labels[value] ?? value,
  })).sort((a, b) => b.count - a.count);
}

/**
 * Number of rows where `field` equals `value`, e.g. countValue(agents, 'Class', 'biologic').
 *
 * @param {Object[]} rows
 * @param {string} field
 * @param {string} value
 * @returns {number}
 */
export function countValue(rows, field, value) {
  return rows.reduce((n, r) => (r[field] === value ? n + 1 : n), 0);
}

/**
 * Test agents counted by the CSV `Class` column, with display labels and
 * controls excluded. See countByField for the result shape.
 */
export function getTestAgentStats(agents, { exclude = ['control'] } = {}) {
  return countByField(agents, 'Class', { exclude, labels: CLASS_LABELS });
}

// -- Below are stats from Mustafas mockup --
//Targeted small molecules 211
// Biologics / ADCs 23
// Cytotoxic agents 26
// PROTAC degraders 18

// -- Below are stats from csv --
// Targeted small molecules	289
// Biologics / ADCs	55
// Cytotoxic agents	45
// Phenotypic agents	4

// Tile	Count
// Targeted small molecules	289
// Biologics / ADCs	55
// Cytotoxic agents	45
// Phenotypic agents	4
// Approved agents	131
// New to PRISM	260
