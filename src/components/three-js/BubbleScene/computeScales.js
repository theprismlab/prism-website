import * as THREE from 'three';
import * as d3 from 'd3';
import { markRaw } from 'vue';

/**
 * Pure function: compute all positional scales from data + config + viewport.
 */
export function computeScales(data, config, width, height) {
    const { fov, cameraDistance, ySpread, ySpreadOffset } = config;

    const zExtent = d3.extent(data, d => d.z);
    const xExtent = d3.extent(data, d => d.x);

    const vFov = THREE.MathUtils.degToRad(fov);
    const visibleHeight = 2 * Math.tan(vFov / 2) * cameraDistance;
    const visibleWidth = visibleHeight * (width / height);

    const sceneWidth = visibleWidth;
    const planeWidth = sceneWidth / xExtent[1];
    const planeHeight = visibleHeight / Math.max(zExtent[1], 1);

    const xScale = d3.scaleLinear().domain(xExtent).range([0, sceneWidth]);
    const zScale = d3.scaleLinear().domain(zExtent).range([0, visibleHeight]);
    const opacityScale = d3.scaleLinear().domain(zExtent).range(config.planeOpacityRange);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.viability))
        .range([ySpread, -ySpread + ySpreadOffset]);

    const xOffset = sceneWidth / 2;
    const zOffset = visibleHeight / 2;

    return markRaw({
        xScale, zScale, opacityScale, yScale,
        xOffset, zOffset,
        xExtent, zExtent,
        planeWidth, planeHeight,
        sceneWidth, visibleHeight,
    });
}
