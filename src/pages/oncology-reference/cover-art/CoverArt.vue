<template>
  <div ref="wrapper" class="cover-art">
    <canvas ref="canvas" class="cover-art__canvas" />
  </div>
</template>

<script>
  import * as THREE from 'three';
  import * as d3 from 'd3';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  const DATA_PATH = import.meta.env.BASE_URL + 'data/';

  // ─── Config ─────────────────────────────────────────────────────────────────

  const CONFIG = {
    // Same seed, same artwork. Change it to reshuffle every heat map.
    seed: 12,

    // The grid of a generated plane. It also sets the footprint every plane fills.
    grid: {
      rows: 24,
      columns: 24,
      cellSize: 1, // world units; cells sit edge to edge
    },

    // Vertical distance between planes, in world units
    layerSpacing: 6,

    // One plane per entry, bottom to top. `scheme` is a d3 colour scheme: any
    // d3.interpolate* name, such as 'YlOrRd' or 'Viridis'.
    // A plane is generated unless it has `data`, which draws it from a CSV.
    layers: [
      { name: 'teal', scheme: 'BuGn' },
      { name: 'blue', scheme: 'Blues' },
      { name: 'violet', scheme: 'Purples' },
      { name: 'magenta', scheme: 'RdPu' },
      { name: 'orange', scheme: 'Oranges' },
      { name: 'amber', scheme: 'YlOrBr' },
      { name: 'red', scheme: 'Reds' },
      {
        name: 'viability',
        scheme: 'YlOrRd',
        data: {
          file: 'BRD-K05804044-viability-heatmap.csv',
          x: 'Cell line', // one column per value, ordered by mean `value`
          y: 'Dose', // one row per value, in ascending order
          value: 'Viability',
          // Values drawn as the start and end of the ramp; anything beyond is clamped
          domain: [1, 0],
        },
      },
    ],

    // What the generated heat maps look like: soft hot spots over row and column stripes
    heatmap: {
      hotSpots: 5,
      hotSpotRadius: [0.1, 0.3], // [min, max] as a fraction of the grid
      stripeStrength: 0.35, // row and column effects
      noiseStrength: 0.25, // cell to cell variation
    },

    camera: {
      direction: [1, 0.8, 1], // where the camera sits, looking at the stack centre
      padding: 1.15, // 1 fits the stack exactly, larger leaves a margin
    },

    maxPixelRatio: 2,
  };

  // ─── Heat maps ──────────────────────────────────────────────────────────────
  // A heat map is `{ rows, columns, values }`, with values row by row in 0…1.

  /**
   * A made-up heat map. Hot spots give it clusters, the row and column effects
   * give it the striping of a real one.
   */
  function createHeatmap(random, { rows, columns }, options) {
    const uniform = d3.randomUniform.source(random);
    const normal = d3.randomNormal.source(random);

    const hotSpots = Array.from({ length: options.hotSpots }, () => ({
      row: uniform(0, rows)(),
      column: uniform(0, columns)(),
      radius: uniform(...options.hotSpotRadius)() * Math.max(rows, columns),
      height: uniform(0.5, 1)(),
    }));
    const rowEffects = Array.from({ length: rows }, normal(0, options.stripeStrength));
    const columnEffects = Array.from({ length: columns }, normal(0, options.stripeStrength));
    const noise = normal(0, options.noiseStrength);

    const values = new Float32Array(rows * columns);
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const peaks = d3.sum(hotSpots, (spot) => {
          const distance = Math.hypot(row - spot.row, column - spot.column);
          return spot.height * Math.exp(-0.5 * (distance / spot.radius) ** 2);
        });
        values[row * columns + column] = peaks + rowEffects[row] + columnEffects[column] + noise();
      }
    }

    const normalise = d3.scaleLinear().domain(d3.extent(values)).range([0, 1]);
    return { rows, columns, values: values.map(normalise) };
  }

  /**
   * A heat map read from a CSV with one record per cell: `x` names the column,
   * `y` the row and `value` the colour. Records sharing a cell are averaged.
   */
  async function loadHeatmap({ file, x, y, value, domain }) {
    const records = await d3.csv(DATA_PATH + file);
    const missing = [x, y, value].filter((field) => !records.columns.includes(field));
    if (missing.length) throw new Error(`${file} has no column named ${missing.join(', ')}`);

    const mean = (group) => d3.mean(group, (record) => +record[value]);
    const cells = d3.rollup(
      records,
      mean,
      (record) => record[y],
      (record) => record[x],
    );
    const columnMeans = d3.rollup(records, mean, (record) => record[x]);

    const rowKeys = d3.sort(cells.keys(), (key) => +key);
    const columnKeys = d3.sort(columnMeans.keys(), (key) => columnMeans.get(key));

    // A cell with no record is drawn as the low end of the ramp
    const normalise = d3.scaleLinear().domain(domain).range([0, 1]).clamp(true);
    const values = Float32Array.from(
      d3.cross(rowKeys, columnKeys, (rowKey, columnKey) =>
        normalise(cells.get(rowKey).get(columnKey) ?? domain[0]),
      ),
    );

    return { rows: rowKeys.length, columns: columnKeys.length, values };
  }

  /** The colour ramp for a layer: a function from 0…1 to a CSS colour. */
  function createRamp({ name, scheme }) {
    const ramp = d3[`interpolate${scheme}`];
    if (!ramp) throw new Error(`Layer "${name}": d3 has no colour scheme named ${scheme}`);
    return ramp;
  }

  /** The heat map for every layer in the config, bottom to top, with its name and ramp. */
  function loadHeatmaps(config) {
    const random = d3.randomLcg(config.seed);
    return Promise.all(
      config.layers.map(async (layer) => {
        const heatmap = layer.data
          ? await loadHeatmap(layer.data)
          : createHeatmap(random, config.grid, config.heatmap);
        return { ...heatmap, name: layer.name, ramp: createRamp(layer) };
      }),
    );
  }

  // ─── Scene objects ──────────────────────────────────────────────────────────

  /**
   * One plane of the stack: a grid of flat cells, coloured by value. The cells
   * are sized to fill `footprint`, so they are only square when the heat map
   * has the footprint's proportions.
   */
  function createLayer({ geometry, material, heatmap, footprint }) {
    const { rows, columns, values, ramp } = heatmap;
    const cellWidth = footprint.width / columns;
    const cellDepth = footprint.depth / rows;

    const mesh = new THREE.InstancedMesh(geometry, material, rows * columns);
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        matrix
          .makeScale(cellWidth, 1, cellDepth)
          .setPosition(
            (column - (columns - 1) / 2) * cellWidth,
            0,
            (row - (rows - 1) / 2) * cellDepth,
          );
        mesh.setMatrixAt(index, matrix);
        mesh.setColorAt(index, color.set(ramp(values[index])));
      }
    }
    return mesh;
  }

  /** The whole stack, centred on the origin: one plane per heat map, bottom to top. */
  function createStack(heatmaps, config) {
    const { grid, layerSpacing } = config;
    const footprint = {
      width: grid.columns * grid.cellSize,
      depth: grid.rows * grid.cellSize,
    };

    // A unit cell shared by every plane; size and colour live on the instances
    const geometry = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });

    const group = new THREE.Group();
    heatmaps.forEach((heatmap, index) => {
      const mesh = createLayer({ geometry, material, heatmap, footprint });
      mesh.name = heatmap.name;
      mesh.position.y = (index - (heatmaps.length - 1) / 2) * layerSpacing;
      group.add(mesh);
    });

    // Radius of the sphere that encloses the stack, used to frame the camera
    const radius =
      Math.hypot(footprint.width, footprint.depth, (heatmaps.length - 1) * layerSpacing) / 2;

    const dispose = () => {
      group.children.forEach((mesh) => mesh.dispose());
      geometry.dispose();
      material.dispose();
    };

    return { group, radius, dispose };
  }

  // ─── Scene ──────────────────────────────────────────────────────────────────

  /**
   * Builds the scene on `canvas` from the heat maps and draws it. The view is
   * orthographic, so the planes stay parallel, and it only redraws when
   * something changes. Drag to orbit, scroll to zoom, right-drag to pan.
   *
   * Returns `resize(width, height)` and `dispose()`.
   */
  function createCoverArt(canvas, heatmaps, config = CONFIG) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.maxPixelRatio));

    const scene = new THREE.Scene();
    const stack = createStack(heatmaps, config);
    scene.add(stack.group);

    const camera = new THREE.OrthographicCamera();
    camera.position
      .set(...config.camera.direction)
      .normalize()
      .multiplyScalar(stack.radius * 4);
    camera.near = 0.1;
    camera.far = stack.radius * 8;
    camera.lookAt(0, 0, 0);

    const render = () => renderer.render(scene, camera);

    const controls = new OrbitControls(camera, canvas);
    controls.addEventListener('change', render);

    // Fits the stack inside the shorter side of the canvas
    const resize = (width, height) => {
      if (!width || !height) return;
      const aspect = width / height;
      const halfHeight = (stack.radius * config.camera.padding) / Math.min(1, aspect);
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.right = halfHeight * aspect;
      camera.left = -halfHeight * aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      render();
    };

    const dispose = () => {
      controls.dispose();
      stack.dispose();
      renderer.dispose();
    };

    return { resize, dispose };
  }

  // ─── Component ──────────────────────────────────────────────────────────────

  export default {
    name: 'CoverArt',
    async mounted() {
      const heatmaps = await loadHeatmaps(CONFIG);
      // The page may have been left while the data was loading
      if (!this.$refs.canvas) return;

      // Plain instance fields, deliberately not reactive
      this.coverArt = createCoverArt(this.$refs.canvas, heatmaps);
      this.resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        this.coverArt.resize(width, height);
      });
      this.resizeObserver.observe(this.$refs.wrapper);
    },
    beforeUnmount() {
      this.resizeObserver?.disconnect();
      this.coverArt?.dispose();
    },
  };
</script>

<style scoped>
  .cover-art {
    position: relative;
    width: 100%;
    /* Fill the viewport below the app bar */
    height: calc(100vh - var(--v-layout-top, 0px));
    background: #ffffff;
  }

  .cover-art__canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
