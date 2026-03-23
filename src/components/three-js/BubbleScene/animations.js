/**
 * Animation registry for bubble-scene spheres.
 *
 * Each animation is self-contained — it owns its own defaults.
 * init(sphere, ctx) is called once per sphere; animate(sphere, elapsed) every frame.
 *
 * ctx: { d, sceneWidth, sceneHeight }
 */

export const animations = {

    /**
     * Gentle vertical bobbing in place.
     */
    float: {
        init(sphere) {
            sphere.userData.phase = Math.random() * Math.PI * 2;
            sphere.userData.speed = 0.4 + Math.random() * 0.4;
            sphere.userData.amp   = 0.3 + Math.random() * 0.3;
        },
        animate(sphere, elapsed) {
            const { basePosition, phase, speed, amp } = sphere.userData;
            sphere.position.y = basePosition.y + Math.sin(elapsed * speed + phase) * amp;
        },
    },

    /**
     * Each sphere drifts left→right along its own sine-wave path.
     * When it exits the right edge it wraps to the left.
     */
    stream: {
        init(sphere, { sceneWidth }) {
            const hw = sceneWidth / 2;
            // horizontal travel
            sphere.userData.xSpeed = 0.3 + Math.random() * 0.5;
            sphere.userData.xMin   = -hw;
            sphere.userData.xMax   =  hw;
            // vertical wave path
            sphere.userData.waveAmp   = 0.3 + Math.random() * 0.5;
            sphere.userData.waveFreq  = 1.0 + Math.random() * 2.0;
            sphere.userData.wavePhase = Math.random() * Math.PI * 2;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const range = u.xMax - u.xMin;

            // advance x, wrap around
            let x = bp.x + elapsed * u.xSpeed;
            x = u.xMin + ((x - u.xMin) % range + range) % range;
            sphere.position.x = x;

            // y follows a sine wave keyed to current x
            sphere.position.y = bp.y + Math.sin(x * u.waveFreq + u.wavePhase) * u.waveAmp;
        },
    },

    /** No animation — spheres stay put. */
    none: {
        init() {},
        animate() {},
    },
};
