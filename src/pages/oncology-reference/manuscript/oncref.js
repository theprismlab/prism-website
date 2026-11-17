import * as d3 from 'd3';
import { FIELDS } from './fields.js';

const dataPath = import.meta.env.BASE_URL + 'data/';
const umapFile = '20261104_OncRef_UMAP_coordinates.csv';
const csvFile = 'OncRefManuscript_Test_Agents.csv';

// UMAP CSV rows with this CompoundName are CRISPR gene points, not test agents
const GENE_COMPOUND_NAME = 'NA';

/**
 * Turn a UMAP CSV row into a point: V1/V2 are the coordinates, LabelName the text
 * shown beside the point when show_label is TRUE.
 */
function umapPoint(row) {
  return {
    x: +row.V1,
    y: +row.V2,
    label: row.LabelName,
    showLabel: row.show_label === 'TRUE',
  };
}

/**
 * Attach UMAP coordinates to each test agent row, matched by CompoundName
 * (case-insensitive). Agents with no UMAP point get `umap: null`.
 */
function joinUmap(agents, umapRows) {
  const byName = new Map(umapRows.map((r) => [r.CompoundName.toUpperCase(), r]));
  return agents.map((row) => {
    const umap = byName.get(row.CompoundName.toUpperCase());
    return { ...row, umap: umap ? umapPoint(umap) : null };
  });
}

/**
 * Load and parse the OncRef manuscript data.
 *
 * @returns {Promise<{agents: Object[], crisprGenes: Object[]}>}
 *   agents: one object per test agent: the metadata CSV row plus `umap`
 *     ({ x, y, label, showLabel } from the UMAP CSV, or null without a point).
 *   crisprGenes: `{ n, x, y, label, showLabel }` CRISPR gene points from the
 *     UMAP CSV, kept separate for the scatter plot.
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
  const [testAgents, umapRows] = await Promise.all([
    d3.csv(`${dataPath}${csvFile}`),
    d3.csv(`${dataPath}${umapFile}`),
  ]);

  const isGene = (r) => r.CompoundName === GENE_COMPOUND_NAME;
  return {
    agents: joinUmap(
      testAgents,
      umapRows.filter((r) => !isGene(r)),
    ),
    crisprGenes: umapRows.filter(isGene).map((r) => ({ n: r.LabelName, ...umapPoint(r) })),
  };
}

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
  return countByField(agents, 'Class', { exclude, labels: FIELDS.Class.values });
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
