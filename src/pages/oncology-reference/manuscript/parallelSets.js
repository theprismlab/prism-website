// Parallel sets layout on top of d3-sankey, after the Observable example
// (https://observablehq.com/@d3/parallel-sets): one column of category nodes
// per dimension, and a link between adjacent columns for every distinct path
// through the data, colored by the first column.
//
// Pure functions, no DOM: ParallelSetsChart.vue renders the result.
import { rollups } from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

export const BLANK = '(blank)';

const valueOf = (row, field) => row[field] || BLANK;

// Category order for a dimension: the explicit `order` list first (keeping only
// values present), then anything else by count descending.
function orderCategories(counts, dim) {
  const byCount = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([key]) => key);
  if (!dim.order) return byCount;
  const listed = dim.order.filter((key) => counts.has(key));
  return [...listed, ...byCount.filter((key) => !listed.includes(key))];
}

/**
 * Build the sankey graph: nodes per dimension in display order, and one link per
 * adjacent column pair per distinct path (full tuple of categories). Keying links
 * by the full path, rather than the Observable example's prefix, lets a hover on
 * any node light up exactly the strands passing through it.
 *
 * @param {Object[]} rows
 * @param {{ field: string, label?: string, order?: string[], labels?: Object }[]} dimensions
 * @param {{ primary?: number }} [opts] - index of the dimension to sort strands by
 *   first (normally the one they are colored by), so same-colored strands stay
 *   together inside every node. Remaining dimensions follow in column order.
 * @returns {{ nodes: Object[], links: Object[] }}
 */
export function parallelSetsGraph(rows, dimensions, { primary = 0 } = {}) {
  const nodes = [];
  const indexByKey = new Map();
  const nodeId = (dim, key) => `${dim}\u0000${key}`;

  dimensions.forEach((dim, i) => {
    const counts = new Map(
      rollups(
        rows,
        (v) => v.length,
        (r) => valueOf(r, dim.field),
      ),
    );
    for (const key of orderCategories(counts, dim)) {
      indexByKey.set(nodeId(i, key), nodes.length);
      nodes.push({
        dim: i,
        key,
        name: dim.labels?.[key] ?? key,
        count: counts.get(key),
        // Position within the column, used to order links so strands nest
        index: nodes.filter((n) => n.dim === i).length,
      });
    }
  });

  const tupleKey = (row) => dimensions.map((d) => valueOf(row, d.field)).join('\u0000');
  const paths = rollups(rows, (v) => v, tupleKey).map(([, members]) => {
    const keys = dimensions.map((d) => valueOf(members[0], d.field));
    return {
      keys,
      names: keys.map((key, i) => nodes[indexByKey.get(nodeId(i, key))].name),
      nodeIndexes: keys.map((key, i) => indexByKey.get(nodeId(i, key))),
      rows: members,
      value: members.length,
    };
  });
  // Lexicographic by node position, primary (color) column first, so links
  // leaving a node stay grouped by color and the strands don't tangle.
  const sortOrder = [primary, ...dimensions.map((_, i) => i).filter((i) => i !== primary)];
  paths.sort((a, b) => {
    for (const i of sortOrder) {
      const d = nodes[a.nodeIndexes[i]].index - nodes[b.nodeIndexes[i]].index;
      if (d) return d;
    }
    return 0;
  });

  const links = [];
  for (const path of paths) {
    for (let i = 1; i < dimensions.length; i++) {
      links.push({
        source: path.nodeIndexes[i - 1],
        target: path.nodeIndexes[i],
        pair: i - 1,
        keys: path.keys,
        names: path.names,
        rows: path.rows,
        value: path.value,
      });
    }
  }
  return { nodes, links };
}

/**
 * Run the sankey layout over the graph.
 *
 * @param {Object[]} rows
 * @param {Object[]} dimensions - see parallelSetsGraph
 * @param {{ width: number, height: number, nodeWidth?: number, nodePadding?: number,
 *           fillColumns?: boolean, primary?: number }} opts
 *   `nodePadding` is the minimum gap between nodes. With `fillColumns` (default
 *   true) each column gets its own, larger gap so its nodes span the full height;
 *   otherwise every column uses `nodePadding` and shorter columns end early.
 *   `primary` is passed to parallelSetsGraph.
 * @returns {{ nodes: Object[], links: Object[], columns: { label: string, nodes: Object[] }[], total: number }}
 *   nodes carry x0/x1/y0/y1 and links carry y0/y1/width plus a `path` string
 *   from sankeyLinkHorizontal.
 */
export function parallelSetsLayout(rows, dimensions, opts) {
  const { width, height, nodeWidth = 4, nodePadding = 20, fillColumns = true, primary = 0 } = opts;
  const graph = parallelSetsGraph(rows, dimensions, { primary });
  const extent = [
    [0, 5],
    [width, height - 5],
  ];

  const sankey = d3Sankey()
    .nodeSort(null) // keep the column order from parallelSetsGraph
    .linkSort(null) // keep the strand order from parallelSetsGraph
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent(extent);

  const { nodes, links } = sankey({
    nodes: graph.nodes.map((d) => ({ ...d })),
    links: graph.links.map((d) => ({ ...d })),
  });

  if (fillColumns) spreadColumns(nodes, dimensions.length, extent[0][1], extent[1][1]);

  const linkPath = sankeyLinkHorizontal();
  for (const link of links) link.path = linkPath(link);

  return {
    nodes,
    links,
    columns: dimensions.map((dim, i) => ({
      label: dim.label ?? dim.field,
      nodes: nodes.filter((n) => n.dim === i),
    })),
    total: rows.length,
  };
}

// d3-sankey uses one node padding everywhere and sizes the vertical scale from
// the column with the most nodes, so columns with fewer nodes stop short of the
// bottom. Re-stack each column with its own padding so the nodes span y0..y1
// (node heights are untouched, so values stay comparable across columns), then
// re-stack the link ends the way d3-sankey's computeLinkBreadths does.
function spreadColumns(nodes, columnCount, y0, y1) {
  for (let dim = 0; dim < columnCount; dim++) {
    const column = nodes.filter((n) => n.dim === dim).sort((a, b) => a.y0 - b.y0);
    if (column.length < 2) continue;
    const used = column.reduce((sum, n) => sum + (n.y1 - n.y0), 0);
    const gap = (y1 - y0 - used) / (column.length - 1);
    let y = y0;
    for (const node of column) {
      const h = node.y1 - node.y0;
      node.y0 = y;
      node.y1 = y + h;
      y += h + gap;
    }
  }
  for (const node of nodes) {
    let out = node.y0;
    for (const link of node.sourceLinks) {
      link.y0 = out + link.width / 2;
      out += link.width;
    }
    let inY = node.y0;
    for (const link of node.targetLinks) {
      link.y1 = inY + link.width / 2;
      inY += link.width;
    }
  }
}
