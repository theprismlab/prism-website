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
export async function getOncRefData() {
  const [testAgents, umap] = await Promise.all([
    d3.csv(`${dataPath}${csvFile}`),
    d3.json(`${dataPath}${jsonFile}`),
  ]);

  return {
    agents: joinUmap(testAgents, umap.compounds),
    crisprGenes: umap.crisprGenes,
  };
}
