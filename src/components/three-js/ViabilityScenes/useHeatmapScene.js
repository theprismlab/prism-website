import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw, reactive, ref } from 'vue';

const fileName = "BRD-K05804044-viability-heatmap.csv";

export function useHeatmapScene(options = {}) {
    const {
        cameraZoom = 35,
        fov = 35,
        minCellLine = 300,
    } = options;

    const state = reactive({
        heatmapData: [],
        width: 0,
        height: 0,
        scene: null,
        camera: null,
        renderer: null,
        clock: null,
        scales: null,
    });

    const animationCallbacks = ref([]);
    let animationFrameId = null;

    const path = import.meta.env.PROD
        ? import.meta.env.BASE_URL + "data/"
        : "../../public/data/";

    async function loadData() {
        const data = await d3.csv(`${path}${fileName}`, d => ({
            ccle_name: d["Cell line"],
            viability: +d["Viability"],
            pert_dose: +d["Dose"]
        }));
        state.heatmapData = parseHeatmapData(data);
    }

    function parseHeatmapData(data) {
        let cellLineGroups = d3.groups(data, d => d.ccle_name).map(d => ({
            key: d[0],
            values: d[1],
            mean: d3.mean(d[1], e => e.viability)
        }));

        cellLineGroups.sort((a, b) => d3.descending(a.mean, b.mean));

        let cellLineToNumber = {};
        cellLineGroups.forEach((d, i) => {
            cellLineToNumber[d.key] = i;
        });

        let doses = [...new Set(data.map(d => d.pert_dose))].sort((a, b) => b - a);
        let doseToNumber = {};
        doses.forEach((d, i) => {
            doseToNumber[d] = i;
        });

        const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1, 0.2]);

        data.forEach(d => {
            d.x = cellLineToNumber[d.ccle_name];
            d.z = doseToNumber[d.pert_dose];
            d.y = 0;
            d.c = colorScale(d.viability);
            d.rgba = new THREE.Color(d.c);
        });

        return data.filter(d => d.x > minCellLine);
    }

    let canvas = null;

    function initThreeJs(canvasEl) {
        canvas = canvasEl;
        state.width = canvas.clientWidth;
        state.height = canvas.clientHeight;

        state.scene = markRaw(new THREE.Scene());
        state.camera = markRaw(new THREE.PerspectiveCamera(fov, state.width / state.height, 1.01, 200));
        state.camera.position.set(0, 6, cameraZoom);
        state.camera.updateProjectionMatrix();

        const light = markRaw(new THREE.DirectionalLight(0xffffff, 0.5));
        light.position.set(5, 10, 5);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.left = -30;
        light.shadow.camera.right = 30;
        light.shadow.camera.top = 30;
        light.shadow.camera.bottom = -30;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 60;
        light.shadow.radius = 8;
        light.shadow.blurSamples = 25;
        state.scene.add(light);

        const ambientLight = markRaw(new THREE.AmbientLight('rgb(255, 255, 255)', 2.5));
        state.scene.add(ambientLight);

        state.renderer = markRaw(new THREE.WebGLRenderer({ canvas, antialias: true }));
        state.renderer.setSize(state.width, state.height);
        state.renderer.setClearColor(0xffffff, 0);
        state.renderer.setPixelRatio(window.devicePixelRatio);
        state.renderer.shadowMap.enabled = true;
        state.renderer.shadowMap.type = THREE.VSMShadowMap;

        state.clock = markRaw(new THREE.Clock());
    }

    function computeScales() {
        const data = state.heatmapData;
        const zExtent = d3.extent(data, d => d.z);
        const xExtent = d3.extent(data, d => d.x);

        const vFov = THREE.MathUtils.degToRad(fov);
        const visibleHeight = 2 * Math.tan(vFov / 2) * cameraZoom;
        const visibleWidth = visibleHeight * (state.width / state.height);

        const sceneWidth = visibleWidth;
        const planeWidth = sceneWidth / xExtent[1];
        const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

        const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
        const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
        const opacityScale = d3.scaleLinear().domain(zExtent).range([0.5, 1]);

        const ySpread = 16;
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.viability))
            .range([ySpread, -ySpread + 8]);

        const xOffset = sceneWidth / 2;
        const zOffset = visibleHeight / 2;

        state.scales = markRaw({
            xScale, zScale, opacityScale, yScale,
            xOffset, zOffset,
            xExtent, zExtent,
            planeWidth, planeHeight,
            sceneWidth, visibleHeight
        });

        return state.scales;
    }

    function onAnimate(callback) {
        animationCallbacks.value.push(callback);
    }

    function startAnimation() {
        if (animationFrameId) return;
        const animate = () => {
            const elapsed = state.clock.getElapsedTime();
            animationCallbacks.value.forEach(cb => cb(elapsed));
            state.renderer.render(state.scene, state.camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }

    function render() {
        state.renderer.render(state.scene, state.camera);
    }

    function resize() {
        if (!canvas || !state.renderer) return;
        state.width = canvas.clientWidth;
        state.height = canvas.clientHeight;
        state.camera.aspect = state.width / state.height;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(state.width, state.height);
        computeScales();
    }

    return {
        state,
        loadData,
        initThreeJs,
        computeScales,
        onAnimate,
        startAnimation,
        stopAnimation,
        render,
        resize,
    };
}
