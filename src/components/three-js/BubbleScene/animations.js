/**
 * Animation registry for bubble-scene spheres.
 *
 * Each animation is an object with:
 *   init(sphere, ctx)        – called once per sphere during creation
 *   animate(sphere, elapsed) – called every frame
 *
 * ctx contains: { d, config, cellHeight, depthScale }
 *   d          – the data point for this sphere
 *   config     – the full scene config
 *   cellHeight – computed cell height (for amplitude scaling)
 *   depthScale – z → depth multiplier scale function
 *
 * To add a new animation, add an entry here and set `animation` in config.
 */

export const animations = {

    /**
     * Gentle vertical bobbing. Each sphere floats up and down
     * around its base position with randomised phase, speed, and amplitude.
     */
    float: {
        init(sphere, { d, config, cellHeight, depthScale }) {
            const t = depthScale(d.z);
            const [speedMin, speedRange] = config.floatSpeed;
            const [ampBase, ampRange] = config.floatAmplitude;
            sphere.userData.floatPhase = Math.random() * Math.PI * 2;
            sphere.userData.floatSpeed = speedMin + Math.random() * speedRange;
            sphere.userData.floatAmplitude = cellHeight * (ampBase + Math.random() * ampRange) * t;
        },
        animate(sphere, elapsed) {
            const { basePosition, floatPhase, floatSpeed, floatAmplitude } = sphere.userData;
            sphere.position.y = basePosition.y + Math.sin(elapsed * floatSpeed + floatPhase) * floatAmplitude;
        },
    },

    /**
     * A sine wave that rolls from back (high z) to front (low z).
     * All spheres share the same wave; their z-position determines phase offset.
     */
    wave: {
        init(sphere, { config }) {
            sphere.userData.waveSpeed = config.waveSpeed;
            sphere.userData.waveAmplitude = config.waveAmplitude;
            sphere.userData.waveLength = config.waveLength;
        },
        animate(sphere, elapsed) {
            const { basePosition, waveSpeed, waveAmplitude, waveLength } = sphere.userData;
            sphere.position.y = basePosition.y +
                Math.sin(elapsed * waveSpeed - basePosition.z / waveLength) * waveAmplitude;
        },
    },

    /** No animation – spheres remain static. */
    none: {
        init() {},
        animate() {},
    },
};
