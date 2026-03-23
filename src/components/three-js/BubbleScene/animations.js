/**
 * Animation registry for bubble-scene spheres.
 *
 * Each animation is an object with:
 *   init(sphere, ctx)        – called once per sphere during creation
 *   animate(sphere, elapsed) – called every frame
 *
 * ctx contains: { d, config, cellHeight, sizeScale }
 *   d          – the data point for this sphere
 *   config     – the full scene config
 *   cellHeight – computed cell height (for amplitude scaling)
 *   sizeScale  – depth-based size scale function
 *
 * To add a new animation, add an entry here and set `animation` in config.
 */

export const animations = {

    /**
     * Gentle vertical bobbing. Each sphere floats up and down
     * around its base position with randomised phase, speed, and amplitude.
     */
    float: {
        init(sphere, { d, config, cellHeight, sizeScale }) {
            const t = sizeScale(d.z);
            sphere.userData.floatPhase = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed =
                config.sphereFloatSpeedMin + Math.random() * config.sphereFloatSpeedRange;
            sphere.userData.floatAmplitude =
                cellHeight * (config.sphereFloatAmplitudeBase + Math.random() * config.sphereFloatAmplitudeRange) * t;
        },
        animate(sphere, elapsed) {
            const { basePosition, floatPhase, floatSpeed, floatAmplitude } = sphere.userData;
            sphere.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
        },
    },

    /**
     * Spheres gently pulse in size (scale) while staying in place.
     */
    pulse: {
        init(sphere, { d, config }) {
            sphere.userData.pulsePhase = Math.random() * Math.PI * 2;
            sphere.userData.pulseSpeed =
                (config.pulseSpeedMin ?? 0.3) + Math.random() * (config.pulseSpeedRange ?? 0.4);
            sphere.userData.pulseAmplitude = config.pulseAmplitude ?? 0.15;
        },
        animate(sphere, elapsed) {
            const { pulsePhase, pulseSpeed, pulseAmplitude } = sphere.userData;
            const s = 1 + Math.sin(elapsed * pulseSpeed + pulsePhase) * pulseAmplitude;
            sphere.scale.set(s, s, s);
        },
    },

    /** No animation – spheres remain static. */
    none: {
        init() {},
        animate() {},
    },
};
