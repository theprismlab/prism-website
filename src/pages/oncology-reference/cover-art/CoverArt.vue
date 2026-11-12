<template>
  <div ref="wrapper" class="cover-art">
    <canvas ref="canvas" class="cover-art__canvas" />
  </div>
</template>

<script>
  import * as THREE from 'three';
  import * as d3 from 'd3';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  // ─── Config ─────────────────────────────────────────────────────────────────

  const CONFIG = {
    // Same seed, same artwork. Change it to reshuffle every heat map.
    seed: 12,

    grid: {
      rows: 24,
      columns: 24,
      cellSize: 1, // world units; cells sit edge to edge
    },

    // Vertical distance between planes, in world units
    layerSpacing: 6,

    // One plane per entry, bottom to top. Each ramps from `low` to `high`.
    layers: [
      { name: 'teal', low: '#e3f6f3', high: '#0f766e' },
      { name: 'blue', low: '#e6effe', high: '#1d4ed8' },
      { name: 'violet', low: '#f0e9fe', high: '#6d28d9' },
      { name: 'magenta', low: '#fde7f2', high: '#be185d' },
      { name: 'orange', low: '#ffeede', high: '#c2410c' },
      { name: 'amber', low: '#fff6d6', high: '#b45309' },
      { name: 'red', low: '#fff600', high: '#b45300' },
    ],

    // What the heat maps look like: soft hot spots over row and column stripes
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

  // ─── Heat map values ────────────────────────────────────────────────────────

  /**
   * Values for one plane, row by row, each in 0…1. Hot spots give the map its
   * clusters, the row and column effects give it the striping of a real one.
   */
  function createHeatmapValues(random, { rows, columns }, options) {
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
    return values.map(normalise);
  }

  // ─── Scene objects ──────────────────────────────────────────────────────────

  /** One plane of the stack: a grid of flat cells, coloured by value. */
  function createLayer({ geometry, material, values, ramp, grid }) {
    const { rows, columns, cellSize } = grid;
    const mesh = new THREE.InstancedMesh(geometry, material, rows * columns);
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        matrix.setPosition(
          (column - (columns - 1) / 2) * cellSize,
          0,
          (row - (rows - 1) / 2) * cellSize,
        );
        mesh.setMatrixAt(index, matrix);
        mesh.setColorAt(index, color.set(ramp(values[index])));
      }
    }
    return mesh;
  }

  /** The whole stack, centred on the origin. */
  function createStack(config) {
    const { grid, layers, layerSpacing } = config;
    const random = d3.randomLcg(config.seed);

    // Shared by every plane; colour lives on the instances
    const geometry = new THREE.PlaneGeometry(grid.cellSize, grid.cellSize).rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });

    const group = new THREE.Group();
    layers.forEach((layer, index) => {
      const mesh = createLayer({
        geometry,
        material,
        grid,
        values: createHeatmapValues(random, grid, config.heatmap),
        ramp: d3.interpolateLab(layer.low, layer.high),
      });
      mesh.name = layer.name;
      mesh.position.y = (index - (layers.length - 1) / 2) * layerSpacing;
      group.add(mesh);
    });

    // Radius of the sphere that encloses the stack, used to frame the camera
    const radius =
      Math.hypot(
        grid.columns * grid.cellSize,
        grid.rows * grid.cellSize,
        (layers.length - 1) * layerSpacing,
      ) / 2;

    const dispose = () => {
      group.children.forEach((mesh) => mesh.dispose());
      geometry.dispose();
      material.dispose();
    };

    return { group, radius, dispose };
  }

  // ─── Scene ──────────────────────────────────────────────────────────────────

  /**
   * Builds the scene on `canvas` and draws it. The view is orthographic, so the
   * planes stay parallel, and it only redraws when something changes. Drag to
   * orbit, scroll to zoom, right-drag to pan.
   *
   * Returns `resize(width, height)` and `dispose()`.
   */
  function createCoverArt(canvas, config = CONFIG) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.maxPixelRatio));

    const scene = new THREE.Scene();
    const stack = createStack(config);
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
    mounted() {
      // Plain instance fields, deliberately not reactive
      this.coverArt = createCoverArt(this.$refs.canvas);
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
