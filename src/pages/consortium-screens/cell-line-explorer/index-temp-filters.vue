<template>
  <div>
    <prism-page-title>Cell Line Explorer</prism-page-title>
    <v-row>
      <v-col cols="12" sm="4">
        <v-autocomplete
          v-model="selectedLineages"
          :items="lineageOptionsWithCounts"
          item-title="title"
          item-value="value"
          label="Cell Lineage"
          multiple
          chips
          clearable
          closable-chips
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-autocomplete
          v-model="selectedDiseases"
          :items="diseaseOptionsWithCounts"
          item-title="title"
          item-value="value"
          label="Primary Disease"
          multiple
          chips
          clearable
          closable-chips
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-autocomplete
          v-model="selectedCellLineNames"
          :items="cellLineOptionsWithCounts"
          item-title="title"
          item-value="value"
          label="Cell Line"
          multiple
          chips
          clearable
          closable-chips
          hide-details
        />
      </v-col>
    </v-row>
    <div class="viz-toggle">
      <button type="button" :class="{ active: vizType === 'tree' }" @click="setViz('tree')">
        Tree
      </button>
      <button type="button" :class="{ active: vizType === 'pack' }" @click="setViz('pack')">
        Pack
      </button>
    </div>
    <div
      class="chart-container"
      :class="vizType"
      :style="vizType === 'tree' ? { height: computedHeight + 'px' } : {}"
    >
      <svg ref="chart" id="cell-line-explorer-svg" font-family="sans-serif"></svg>
    </div>
  </div>
</template>
<script>
  import { getCellLines } from '@/submissions/api.js';
  import * as d3 from 'd3';

  const DURATION = 250;
  const TREE_MARGIN = { top: 10, right: 160, bottom: 10, left: 40 };

  export default {
    name: 'CellLineExplorer',
    data() {
      return {
        cellLines: [],
        chartWidth: 1000,
        computedHeight: 600,
        vizType: 'tree',
        selectedLineages: [],
        selectedDiseases: [],
        selectedCellLineNames: [],
      };
    },
    computed: {
      lineageOptions() {
        return [...new Set(this.cellLines.map((d) => d.cell_lineage))].filter(Boolean).sort();
      },
      diseaseOptions() {
        return [...new Set(this.cellLines.map((d) => d.primary_disease))].filter(Boolean).sort();
      },
      cellLineOptions() {
        return [...new Set(this.cellLines.map((d) => d.cell_line))].filter(Boolean).sort();
      },
      // Full option lists annotated with how many rows would match if this
      // option were also selected (in addition to whatever else is already
      // picked in its own dropdown), using the same hierarchical semantics
      // as `filteredCellLines` - not a flat AND, so a disease pick that
      // doesn't pertain to a given lineage won't zero out that lineage's
      // count. Non-zero counts sort first (each alphabetical).
      lineageOptionsWithCounts() {
        return this.buildCountedOptions(this.lineageOptions, (value) =>
          this.countFor(
            (d) => d.cell_lineage,
            value,
            this.withOption(this.selectedLineages, value),
            this.selectedDiseases,
            this.selectedCellLineNames,
          ),
        );
      },
      diseaseOptionsWithCounts() {
        return this.buildCountedOptions(this.diseaseOptions, (value) =>
          this.countFor(
            (d) => d.primary_disease,
            value,
            this.selectedLineages,
            this.withOption(this.selectedDiseases, value),
            this.selectedCellLineNames,
          ),
        );
      },
      cellLineOptionsWithCounts() {
        return this.buildCountedOptions(this.cellLineOptions, (value) =>
          this.countFor(
            (d) => d.cell_line,
            value,
            this.selectedLineages,
            this.selectedDiseases,
            this.withOption(this.selectedCellLineNames, value),
          ),
        );
      },
      // Lineage -> set of diseases that occur under it, and
      // "lineage||disease" -> set of cell lines that occur under that pair.
      // Used to tell whether a selected disease/cell-line actually pertains
      // to a given row's lineage/disease group, so an unrelated selection
      // doesn't spuriously narrow it.
      lineageDiseaseMap() {
        const map = new Map();
        this.cellLines.forEach((d) => {
          if (!map.has(d.cell_lineage)) map.set(d.cell_lineage, new Set());
          map.get(d.cell_lineage).add(d.primary_disease);
        });
        return map;
      },
      lineageDiseaseCellLineMap() {
        const map = new Map();
        this.cellLines.forEach((d) => {
          const key = `${d.cell_lineage}||${d.primary_disease}`;
          if (!map.has(key)) map.set(key, new Set());
          map.get(key).add(d.cell_line);
        });
        return map;
      },
      filteredCellLines() {
        return this.cellLines.filter((d) =>
          this.rowMatches(
            d,
            this.selectedLineages,
            this.selectedDiseases,
            this.selectedCellLineNames,
          ),
        );
      },
    },
    watch: {
      selectedLineages() {
        this.rebuild();
      },
      selectedDiseases() {
        this.rebuild();
      },
      selectedCellLineNames() {
        this.rebuild();
      },
    },
    async mounted() {
      try {
        await this.loadData();
        this.rebuild();
      } catch (err) {
        console.error('Error building/rendering hierarchy:', err);
      }
    },
    methods: {
      // Core hierarchical match, shared by `filteredCellLines` and the
      // option-count helpers below so they can never disagree: selecting a
      // whole lineage (with no disease chosen within it) shows all of its
      // data, while a lineage that's also been narrowed by a disease shows
      // only that disease - and the same one level down for cell line. A
      // selection only narrows the level(s) it actually pertains to; it's a
      // no-op for groups it has nothing to do with, rather than a blanket
      // AND across the whole dataset.
      rowMatches(d, lineages, diseases, cellLineNames) {
        if (lineages.length && !lineages.includes(d.cell_lineage)) return false;
        const lineageExplicit = lineages.includes(d.cell_lineage);

        let diseaseNarrowed = false;
        if (diseases.length) {
          const diseasesInLineage = this.lineageDiseaseMap.get(d.cell_lineage) || new Set();
          const relevantDiseases = diseases.filter((v) => diseasesInLineage.has(v));
          if (relevantDiseases.length) {
            if (!relevantDiseases.includes(d.primary_disease)) return false;
            diseaseNarrowed = true;
          } else if (!lineageExplicit) {
            return false;
          }
        }
        const diseaseExplicit = diseases.includes(d.primary_disease);
        const groupFullySelected = lineageExplicit && !diseaseNarrowed ? true : diseaseExplicit;

        if (cellLineNames.length) {
          const key = `${d.cell_lineage}||${d.primary_disease}`;
          const cellLinesInGroup = this.lineageDiseaseCellLineMap.get(key) || new Set();
          const relevantCellLines = cellLineNames.filter((v) => cellLinesInGroup.has(v));
          if (relevantCellLines.length) {
            if (!relevantCellLines.includes(d.cell_line)) return false;
          } else if (!groupFullySelected) {
            return false;
          }
        }

        return true;
      },
      // Returns `selected` unchanged if `value` is already in it, otherwise
      // a new array with `value` appended - used to build the "what if this
      // option were also picked" hypothetical for option counts.
      withOption(selected, value) {
        return selected.includes(value) ? selected : [...selected, value];
      },
      // Counts rows whose own field equals `value` and that would match
      // under the given (hypothetical) selections.
      countFor(getField, value, lineages, diseases, cellLineNames) {
        let count = 0;
        for (const d of this.cellLines) {
          if (getField(d) === value && this.rowMatches(d, lineages, diseases, cellLineNames)) {
            count++;
          }
        }
        return count;
      },
      // Builds `{ value, count, title }` items from `values`, sorting
      // zero-count options to the bottom (each group alphabetical).
      buildCountedOptions(values, countFn) {
        return values
          .map((value) => {
            const count = countFn(value);
            return { value, count, title: `${value} (${count})` };
          })
          .sort((a, b) => {
            if ((a.count === 0) !== (b.count === 0)) return a.count === 0 ? 1 : -1;
            return a.value.localeCompare(b.value);
          });
      },
      async loadData() {
        try {
          const response = await getCellLines(import.meta.env.VITE_API_URL);
          this.cellLines = response;
        } catch (error) {
          console.error('Error loading data:', error);
        }
      },
      buildHierarchy() {
        return d3.hierarchy([null, this.groups], ([, values]) =>
          values instanceof Map ? Array.from(values) : null,
        );
      },
      clearChart() {
        const svg = d3.select(this.$refs.chart);
        svg.selectAll('*').remove();
        svg.attr('style', null).attr('text-anchor', null).on('click', null);
      },
      // Rebuilds the grouped hierarchy from the currently filtered cell
      // lines and redraws whichever visualization is active.
      rebuild() {
        this.groups = d3.group(
          this.filteredCellLines,
          (d) => d.cell_lineage,
          (d) => d.primary_disease,
          (d) => d.cell_line,
        );
        this.clearChart();
        if (this.vizType === 'tree') this.renderTree();
        else this.renderPack();
      },
      setViz(type) {
        if (this.vizType === type) return;
        this.vizType = type;
        this.clearChart();
        if (type === 'tree') this.renderTree();
        else this.renderPack();
      },
      renderTree() {
        const root = this.buildHierarchy();

        // Fixed vertical spacing between sibling nodes; horizontal spacing is
        // derived from chartWidth so depth always fits within it.
        const dx = 18;
        const dy = this.chartWidth / (root.height + 1);
        this.tree = d3.tree().nodeSize([dx, dy]);
        this.diagonal = d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x);

        root.x0 = 0;
        root.y0 = 0;
        let id = 0;
        root.descendants().forEach((d) => {
          d.id = id++;
          d._children = d.children;
          // Start with only the top-level lineage branches expanded.
          if (d.depth > 1) d.children = null;
        });
        this.rootNode = root;

        const svg = d3.select(this.$refs.chart);
        this.gLink = svg
          .append('g')
          .attr('fill', 'none')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 1.5);
        this.gNode = svg.append('g').attr('pointer-events', 'all');

        this.update(this.rootNode);
      },
      update(source) {
        const nodes = this.rootNode.descendants().reverse();
        const links = this.rootNode.links();

        this.tree(this.rootNode);

        let left = this.rootNode;
        let right = this.rootNode;
        this.rootNode.eachBefore((d) => {
          if (d.x < left.x) left = d;
          if (d.x > right.x) right = d;
        });
        const height = right.x - left.x + TREE_MARGIN.top + TREE_MARGIN.bottom;
        this.computedHeight = height;

        const svg = d3.select(this.$refs.chart);
        const transition = svg
          .transition()
          .duration(DURATION)
          .attr('viewBox', [-TREE_MARGIN.left, left.x - TREE_MARGIN.top, this.chartWidth, height])
          .attr('width', this.chartWidth)
          .attr('height', height);

        // Nodes.
        const node = this.gNode.selectAll('g').data(nodes, (d) => d.id);

        const nodeEnter = node
          .enter()
          .append('g')
          .attr('transform', () => `translate(${source.y0},${source.x0})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0)
          .style('cursor', (d) => (d._children ? 'pointer' : 'default'))
          .on('click', (_event, d) => {
            d.children = d.children ? null : d._children;
            this.update(d);
          });

        nodeEnter
          .append('circle')
          .attr('r', 5)
          .attr('fill', (d) => (d.children ? 'steelblue' : d._children ? 'orange' : '#999'));

        nodeEnter
          .append('text')
          .attr('dy', '0.31em')
          .attr('x', (d) => (d._children ? -8 : 8))
          .attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
          .attr('font-size', '10px')
          .text((d) => d.data[0] ?? '')
          .clone(true)
          .lower()
          .attr('stroke-linejoin', 'round')
          .attr('stroke-width', 3)
          .attr('stroke', 'white');

        node
          .merge(nodeEnter)
          .transition(transition)
          .attr('transform', (d) => `translate(${d.y},${d.x})`)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 1)
          .select('circle')
          .attr('fill', (d) => (d.children ? 'steelblue' : d._children ? 'orange' : '#999'));

        node
          .exit()
          .transition(transition)
          .remove()
          .attr('transform', () => `translate(${source.y},${source.x})`)
          .attr('fill-opacity', 0)
          .attr('stroke-opacity', 0);

        // Links.
        const link = this.gLink.selectAll('path').data(links, (d) => d.target.id);

        const linkEnter = link
          .enter()
          .append('path')
          .attr('d', () => {
            const o = { x: source.x0, y: source.y0 };
            return this.diagonal({ source: o, target: o });
          });

        link.merge(linkEnter).transition(transition).attr('d', this.diagonal);

        link
          .exit()
          .transition(transition)
          .remove()
          .attr('d', () => {
            const o = { x: source.x, y: source.y };
            return this.diagonal({ source: o, target: o });
          });

        this.rootNode.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      },
      renderPack() {
        const width = this.chartWidth;
        const height = width;
        const format = d3.format(',d');

        const root = d3.pack().size([width, height]).padding(3)(
          this.buildHierarchy()
            .sum(([, values]) => (Array.isArray(values) ? values.length : 0))
            .sort((a, b) => b.value - a.value),
        );

        const color = d3
          .scaleLinear()
          .domain([0, root.height || 1])
          .range(['hsl(152,80%,80%)', 'hsl(228,30%,40%)'])
          .interpolate(d3.interpolateHcl);

        this.packWidth = width;
        this.packRoot = root;
        this.packFocus = root;

        // No width/height attrs: the container's CSS (a square via
        // aspect-ratio) sizes the element, and the viewBox scales the
        // pack's internal coordinate system to fit it.
        const svg = d3
          .select(this.$refs.chart)
          .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
          .attr(
            'style',
            `width: 100%; height: 100%; display: block; background: ${color(0)}; cursor: pointer;`,
          );

        this.packNode = svg
          .append('g')
          .selectAll('circle')
          .data(root.descendants().slice(1))
          .join('circle')
          .attr('fill', (d) => (d.children ? color(d.depth) : 'white'))
          .attr('pointer-events', (d) => (!d.children ? 'none' : null))
          .on('mouseover', function () {
            d3.select(this).attr('stroke', '#000');
          })
          .on('mouseout', function () {
            d3.select(this).attr('stroke', null);
          })
          .on('click', (event, d) => {
            if (this.packFocus !== d) {
              this.zoomPack(event, d);
              event.stopPropagation();
            }
          });

        this.packNode.append('title').text((d) => format(d.value));

        this.packLabel = svg
          .append('g')
          .style('font', '10px sans-serif')
          .attr('pointer-events', 'none')
          .attr('text-anchor', 'middle')
          .selectAll('text')
          .data(root.descendants())
          .join('text')
          .style('fill-opacity', (d) => (d.parent === root ? 1 : 0))
          .style('display', (d) => (d.parent === root ? 'inline' : 'none'))
          .text((d) => d.data[0] ?? '');

        svg.on('click', (event) => this.zoomPack(event, root));

        this.updatePack([root.x, root.y, root.r * 2]);
      },
      // Repositions/rescales nodes+labels for the given view box [x, y, diameter].
      updatePack(v) {
        const k = this.packWidth / v[2];
        this.packView = v;

        this.packLabel.attr(
          'transform',
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`,
        );
        this.packNode.attr(
          'transform',
          (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`,
        );
        this.packNode.attr('r', (d) => d.r * k);
      },
      // Animates the zoom from the current focus to node `d`.
      zoomPack(event, d) {
        this.packFocus = d;

        const svg = d3.select(this.$refs.chart);
        const transition = svg
          .transition()
          .duration(event?.altKey ? 7500 : 750)
          .tween('zoom', () => {
            const i = d3.interpolateZoom(this.packView, [
              this.packFocus.x,
              this.packFocus.y,
              this.packFocus.r * 2,
            ]);
            return (t) => this.updatePack(i(t));
          });

        const focus = this.packFocus;
        this.packLabel
          .filter(function (d) {
            return d.parent === focus || this.style.display === 'inline';
          })
          .transition(transition)
          .style('fill-opacity', (d) => (d.parent === focus ? 1 : 0))
          .on('start', function (d) {
            if (d.parent === focus) this.style.display = 'inline';
          })
          .on('end', function (d) {
            if (d.parent !== focus) this.style.display = 'none';
          });
      },
    },
  };
</script>
<style scoped>
  .viz-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  .viz-toggle button {
    padding: 4px 12px;
    border: 1px solid #999;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
  }

  .viz-toggle button.active {
    background: steelblue;
    border-color: steelblue;
    color: #fff;
  }

  .chart-container {
    width: 100%;
    overflow-x: auto;
  }

  .chart-container svg {
    display: block;
  }

  .chart-container.pack {
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }
</style>
