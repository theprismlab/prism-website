/**
 * Animation registry for bubble-scene spheres.
 *
 * Each animation is self-contained — it owns its own defaults.
 * init(sphere, ctx) is called once per sphere; animate(sphere, elapsed) every frame.
 *
 * ctx: { d, sceneWidth, sceneHeight }
 */

import { simplex2 } from './simplex2.js';

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
     * Amplitude is highest on the left and tapers toward the right.
     * When it exits the right edge it wraps to the left.
     */
    stream: {
        init(sphere, { sceneWidth, sceneHeight }) {
            const hw = sceneWidth / 2;
            const hh = sceneHeight / 2;
            sphere.userData.xSpeed = 0.3 + Math.random() * 0.5;
            sphere.userData.xMin   = -hw;
            sphere.userData.xMax   =  hw;
            sphere.userData.zMin   = -hh;
            sphere.userData.zRange = sceneHeight;
            // vertical wave path
            sphere.userData.waveAmpMax = 0.5 + Math.random() * 0.6;
            sphere.userData.waveFreq   = 1.0 + Math.random() * 2.0;
            sphere.userData.wavePhase  = Math.random() * Math.PI * 2;
            // depth oscillation
            sphere.userData.zAmp   = 0.2 + Math.random() * 0.3;
            sphere.userData.zFreq  = 0.5 + Math.random() * 1.0;
            sphere.userData.zPhase = Math.random() * Math.PI * 2;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const range = u.xMax - u.xMin;

            // advance x, wrap around
            let x = bp.x + elapsed * u.xSpeed;
            x = u.xMin + ((x - u.xMin) % range + range) % range;
            sphere.position.x = x;

            // 0 at left edge → 1 at right edge
            const t = (x - u.xMin) / range;
            // amplitude tapers: full on the left, 20% on the right
            const amp = u.waveAmpMax * (1.0 - t * 0.8);

            // y wave + depth-dependent phase offset so front/back rows ripple at different times
            const depthT = (bp.z - u.zMin) / u.zRange;
            sphere.position.y = bp.y +
                Math.sin(x * u.waveFreq + u.wavePhase + depthT * Math.PI * 2) * amp;

            // z oscillation: gentle forward/back sway
            sphere.position.z = bp.z +
                Math.sin(elapsed * u.zFreq + u.zPhase) * u.zAmp;
        },
    },

    /** No animation — spheres stay put. */
    none: {
        init() {},
        animate() {},
    },

    /**
     * Spheres arc upward in a wave then fall under gravity, bouncing
     * when they hit their base y. Each sphere has its own launch timing
     * driven by a wave that sweeps left→right, so they ripple up in
     * sequence and rain back down.
     */
    gravity: {
        init(sphere, { sceneWidth }) {
            const bp = sphere.userData.basePosition;
            const hw = sceneWidth / 2;
            // normalised x position 0→1 left→right
            const nx = (bp.x + hw) / (hw * 2);

            sphere.userData.launchDelay  = nx * 2.0;           // stagger: left launches first
            sphere.userData.cyclePeriod  = 3.0 + Math.random() * 1.0;  // seconds per full cycle
            sphere.userData.launchForce  = 2.5 + Math.random() * 1.5;  // initial upward velocity
            sphere.userData.gravityAccel = 4.0 + Math.random() * 1.0;  // gravity strength
            sphere.userData.bounce       = 0.4 + Math.random() * 0.2;  // energy kept per bounce
            sphere.userData.phaseOffset  = Math.random() * 0.3;        // slight randomness
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;

            // time within this sphere's cycle
            const t = ((elapsed + u.phaseOffset - u.launchDelay) % u.cyclePeriod + u.cyclePeriod) % u.cyclePeriod;

            // simulate ballistic arc with bounces
            let y = 0;
            let vel = u.launchForce;
            let remaining = t;
            const dt = 1 / 60; // fixed simulation step

            while (remaining > 0) {
                const step = Math.min(dt, remaining);
                y += vel * step;
                vel -= u.gravityAccel * step;

                // bounce off base
                if (y < 0) {
                    y = 0;
                    vel = Math.abs(vel) * u.bounce;
                    // stop micro-bounces
                    if (Math.abs(vel) < 0.05) { vel = 0; y = 0; break; }
                }
                remaining -= step;
            }

            sphere.position.y = bp.y + y;
            sphere.position.x = bp.x;
            sphere.position.z = bp.z;
        },
    },

    /**
     * Organic undulating terrain driven by 2D simplex noise.
     * Each sphere's grid position is sampled through a noise field
     * that scrolls over time, producing a flowing landscape effect.
     */
    perlin: {
        init(sphere, { d }) {
            // store grid coords for noise sampling
            sphere.userData.gridX = d.x;
            sphere.userData.gridZ = d.z;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;

            const scale     = 0.06;   // noise spatial frequency
            const speed     = 0.15;   // scroll speed through noise field
            const height    = 2.5;    // max displacement
            const timeShift = elapsed * speed;

            const n = simplex2(u.gridX * scale + timeShift,
                               u.gridZ * scale + timeShift);

            sphere.position.y = bp.y + n * height;
        },
    },

    /**
     * Spheres orbit around their base position in unique elliptical paths,
     * like electrons around a nucleus. Each has its own radius, tilt, and speed.
     */
    orbit: {
        init(sphere) {
            sphere.userData.orbitRadX = 0.3 + Math.random() * 0.6;
            sphere.userData.orbitRadY = 0.2 + Math.random() * 0.4;
            sphere.userData.orbitRadZ = 0.2 + Math.random() * 0.5;
            sphere.userData.orbitSpeed = 0.5 + Math.random() * 1.0;
            sphere.userData.orbitPhase = Math.random() * Math.PI * 2;
            sphere.userData.tilt = (Math.random() - 0.5) * Math.PI * 0.6;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const angle = elapsed * u.orbitSpeed + u.orbitPhase;
            const cosT = Math.cos(u.tilt);
            const sinT = Math.sin(u.tilt);
            const lx = Math.cos(angle) * u.orbitRadX;
            const ly = Math.sin(angle) * u.orbitRadY;
            sphere.position.x = bp.x + lx * cosT - ly * sinT;
            sphere.position.y = bp.y + lx * sinT + ly * cosT;
            sphere.position.z = bp.z + Math.sin(angle * 0.7) * u.orbitRadZ;
        },
    },

    /**
     * Spheres spiral outward from their base, reset, and spiral again.
     * Creates a blooming / expanding particle effect.
     */
    spiral: {
        init(sphere) {
            sphere.userData.spiralSpeed = 0.4 + Math.random() * 0.6;
            sphere.userData.spiralGrowth = 0.3 + Math.random() * 0.3;
            sphere.userData.spiralPhase = Math.random() * Math.PI * 2;
            sphere.userData.cycleDuration = 4.0 + Math.random() * 2.0;
            sphere.userData.riseSpeed = 0.3 + Math.random() * 0.3;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const t = (elapsed % u.cycleDuration) / u.cycleDuration;
            const angle = t * Math.PI * 6 * u.spiralSpeed + u.spiralPhase;
            const radius = t * u.spiralGrowth;
            // fade-out near end of cycle via easing
            const fade = 1.0 - t * t;
            sphere.position.x = bp.x + Math.cos(angle) * radius * fade;
            sphere.position.z = bp.z + Math.sin(angle) * radius * fade;
            sphere.position.y = bp.y + t * u.riseSpeed * 3.0;
            sphere.scale.setScalar(fade * 0.8 + 0.2);
        },
    },

    /**
     * Spheres scatter outward from a central explosion point then
     * slowly drift back to their base position. Repeats on a cycle.
     */
    explode: {
        init(sphere) {
            const angle1 = Math.random() * Math.PI * 2;
            const angle2 = Math.random() * Math.PI - Math.PI / 2;
            const force = 1.5 + Math.random() * 2.0;
            sphere.userData.velX = Math.cos(angle1) * Math.cos(angle2) * force;
            sphere.userData.velY = Math.sin(angle2) * force + 1.0;
            sphere.userData.velZ = Math.sin(angle1) * Math.cos(angle2) * force;
            sphere.userData.cycleDuration = 5.0 + Math.random() * 1.0;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const t = (elapsed % u.cycleDuration) / u.cycleDuration;
            // ease out → ease back
            const outT = Math.min(t * 3.0, 1.0);
            const backT = Math.max((t - 0.5) * 2.0, 0.0);
            const easeOut = 1.0 - (1.0 - outT) * (1.0 - outT);
            const easeBack = backT * backT;
            const dx = u.velX * easeOut;
            const dy = u.velY * easeOut;
            const dz = u.velZ * easeOut;
            sphere.position.x = bp.x + dx * (1.0 - easeBack);
            sphere.position.y = bp.y + dy * (1.0 - easeBack);
            sphere.position.z = bp.z + dz * (1.0 - easeBack);
        },
    },

    /**
     * Spheres swirl around a vertical vortex axis.
     * Inner spheres rotate faster than outer ones.
     */
    vortex: {
        init(sphere) {
            const bp = sphere.userData.basePosition;
            const dist = Math.sqrt(bp.x * bp.x + bp.z * bp.z) + 0.01;
            sphere.userData.vortexDist  = dist;
            sphere.userData.vortexAngle = Math.atan2(bp.z, bp.x);
            sphere.userData.vortexSpeed = 1.5 / (dist * 0.3 + 0.5) + Math.random() * 0.2;
            sphere.userData.bobPhase = Math.random() * Math.PI * 2;
            sphere.userData.bobSpeed = 0.3 + Math.random() * 0.3;
            sphere.userData.bobAmp   = 0.15 + Math.random() * 0.2;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const angle = u.vortexAngle + elapsed * u.vortexSpeed;
            sphere.position.x = Math.cos(angle) * u.vortexDist;
            sphere.position.z = Math.sin(angle) * u.vortexDist;
            sphere.position.y = bp.y + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
        },
    },

    /**
     * A ripple expands outward from the centre like a stone dropped in water.
     * Height decays with distance from the wavefront.
     */
    ripple: {
        init(sphere) {
            const bp = sphere.userData.basePosition;
            sphere.userData.distFromCenter = Math.sqrt(bp.x * bp.x + bp.z * bp.z);
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const speed     = 2.0;
            const freq      = 3.0;
            const height    = 0.8;
            const decay     = 0.15;
            const wave = Math.sin(u.distFromCenter * freq - elapsed * speed);
            const envelope = Math.exp(-u.distFromCenter * decay);
            sphere.position.y = bp.y + wave * height * envelope;
        },
    },

    /**
     * Firefly-like motion: spheres wander randomly using noise-driven
     * paths that change gently over time. Each axis is driven by
     * independent noise offsets for a natural, drifting feel.
     */
    firefly: {
        init(sphere) {
            sphere.userData.noiseOffX = Math.random() * 100;
            sphere.userData.noiseOffY = Math.random() * 100;
            sphere.userData.noiseOffZ = Math.random() * 100;
            sphere.userData.wanderAmp = 0.5 + Math.random() * 0.5;
            sphere.userData.wanderSpeed = 0.3 + Math.random() * 0.3;
        },
        animate(sphere, elapsed) {
            const u  = sphere.userData;
            const bp = u.basePosition;
            const t = elapsed * u.wanderSpeed;
            sphere.position.x = bp.x + simplex2(t + u.noiseOffX, 0.0) * u.wanderAmp;
            sphere.position.y = bp.y + simplex2(t + u.noiseOffY, 1.7) * u.wanderAmp;
            sphere.position.z = bp.z + simplex2(t + u.noiseOffZ, 3.1) * u.wanderAmp;
        },
    },

    /**
     * Cubic-Bézier flow inspired by BAS (Buffer Animation System).
     * Each sphere travels along its own cubic Bézier curve through 3D
     * space with a staggered time offset so the particles stream in
     * sequence. Control points are randomised per sphere, producing
     * arching S-curve paths that loop continuously.
     */
    bezier: {
        init(sphere, { d, sceneWidth, sceneHeight }) {
            const hw = sceneWidth / 2;
            const hh = sceneHeight / 2;
            const duration = 10.0;

            // start: left edge, scattered y/z
            sphere.userData.s0x = -hw;
            sphere.userData.s0y = (Math.random() - 0.15) * hh * 0.3;
            sphere.userData.s0z = (Math.random() - 0.15) * hh * 0.3;

            // control point 1: upper-back quadrant
            sphere.userData.c1x = (Math.random() - 0.15) * sceneWidth * 0.8;
            sphere.userData.c1y = hh * (0.3 + Math.random() * 0.5);
            sphere.userData.c1z = -(0.6 + Math.random() * 0.4) * hh;

            // control point 2: lower-front quadrant
            sphere.userData.c2x = (Math.random() - 0.5) * sceneWidth * 0.8;
            sphere.userData.c2y = -hh * (0.3 + Math.random() * 0.5);
            sphere.userData.c2z = (0.6 + Math.random() * 0.4) * hh;

            // end: right edge, scattered y/z
            sphere.userData.e3x = hw;
            // sphere.userData.e3y = (Math.random() - 0.15) * hh * 0.3;
            // sphere.userData.e3z = (Math.random() - 0.15) * hh * 0.3;
                        sphere.userData.e3y = hh * 0.3;
            sphere.userData.e3z =  hh * 0.3;

            // stagger: each sphere starts at a different phase in the cycle
            sphere.userData.bzOffset   = Math.random() * duration;
            sphere.userData.bzDuration = duration;

            // gentle scale pulse so spheres aren't static during travel
            sphere.userData.pulsePhase = Math.random() * Math.PI * 2;
            sphere.userData.pulseSpeed = 0.2 + Math.random() * 0.3;
        },
        animate(sphere, elapsed) {
            const u = sphere.userData;

            // normalised progress [0,1] within the looping duration
            const t = ((elapsed + u.bzOffset) % u.bzDuration) / u.bzDuration;

            // cubic Bézier: B(t) = (1-t)³P₀ + 3(1-t)²tC₁ + 3(1-t)t²C₂ + t³P₃
            const nt  = 1 - t;
            const nt2 = nt * nt;
            const nt3 = nt2 * nt;
            const t2  = t * t;
            const t3  = t2 * t;
            const w0  = nt3;
            const w1  = 3 * nt2 * t;
            const w2  = 3 * nt * t2;
            const w3  = t3;

            sphere.position.x = w0 * u.s0x + w1 * u.c1x + w2 * u.c2x + w3 * u.e3x;
            sphere.position.y = w0 * u.s0y + w1 * u.c1y + w2 * u.c2y + w3 * u.e3y;
            sphere.position.z = w0 * u.s0z + w1 * u.c1z + w2 * u.c2z + w3 * u.e3z;

            // subtle scale pulse
            const pulse = 0.85 + 0.15 * Math.sin(elapsed * u.pulseSpeed + u.pulsePhase);
            sphere.scale.setScalar(pulse);
        },
    },
        bezier2: {
        init(sphere, { d, sceneWidth, sceneHeight }) {
            const hw = sceneWidth / 2;
            const hh = sceneHeight / 2;
            const duration = 10.0;

            // value (0-1) drives color — map it to an x band so similar
            // colours cluster together. Add a small random spread so they
            // don't collapse into a line.
            const v = d.value;                           // 0 → left, 1 → right
            const bandX = (v - 0.5) * sceneWidth * 0.9; // centre of the colour band
            const jitter = (Math.random() - 0.5) * sceneWidth * 0.15;

            // start: colour-grouped x, scattered y/z
            sphere.userData.s0x = bandX + jitter;
            sphere.userData.s0y = (Math.random() - 0.5) * hh * 0.3;
            sphere.userData.s0z = (Math.random() - 0.5) * hh * 0.3;

            // control point 1: stay near the colour band, arc upward & back
            sphere.userData.c1x = bandX + (Math.random() - 0.5) * sceneWidth * 0.25;
            sphere.userData.c1y = hh * (0.3 + Math.random() * 0.5);
            sphere.userData.c1z = -(0.6 + Math.random() * 0.4) * hh;

            // control point 2: stay near the colour band, arc downward & front
            sphere.userData.c2x = bandX + (Math.random() - 0.5) * sceneWidth * 0.25;
            sphere.userData.c2y = -hh * (0.3 + Math.random() * 0.5);
            sphere.userData.c2z = (0.6 + Math.random() * 0.4) * hh;

            // end: return to the same colour band neighbourhood
            sphere.userData.e3x = bandX + jitter * -1;   // mirror the jitter
            sphere.userData.e3y = (Math.random() - 0.5) * hh * 0.3;
            sphere.userData.e3z = (Math.random() - 0.5) * hh * 0.3;

            // stagger by value so each colour group phases together
            sphere.userData.bzOffset   = v * duration * 0.6 + Math.random() * duration * 0.4;
            sphere.userData.bzDuration = duration;

            // gentle scale pulse so spheres aren't static during travel
            sphere.userData.pulsePhase = Math.random() * Math.PI * 2;
            sphere.userData.pulseSpeed = 1.0 + Math.random() * 1.0;
        },
        animate(sphere, elapsed) {
            const u = sphere.userData;

            // normalised progress [0,1] within the looping duration
            const t = ((elapsed + u.bzOffset) % u.bzDuration) / u.bzDuration;

            // cubic Bézier: B(t) = (1-t)³P₀ + 3(1-t)²tC₁ + 3(1-t)t²C₂ + t³P₃
            const nt  = 1 - t;
            const nt2 = nt * nt;
            const nt3 = nt2 * nt;
            const t2  = t * t;
            const t3  = t2 * t;
            const w0  = nt3;
            const w1  = 3 * nt2 * t;
            const w2  = 3 * nt * t2;
            const w3  = t3;

            sphere.position.x = w0 * u.s0x + w1 * u.c1x + w2 * u.c2x + w3 * u.e3x;
            sphere.position.y = w0 * u.s0y + w1 * u.c1y + w2 * u.c2y + w3 * u.e3y;
            sphere.position.z = w0 * u.s0z + w1 * u.c1z + w2 * u.c2z + w3 * u.e3z;

            // subtle scale pulse
            const pulse = 0.85 + 0.15 * Math.sin(elapsed * u.pulseSpeed + u.pulsePhase);
            sphere.scale.setScalar(pulse);
        },
    },
        bezier3: {
        init(sphere, { d, sceneWidth, sceneHeight }) {
            const hw = sceneWidth / 2;
            const hh = sceneHeight / 2;
            const duration = 4.0;

            // start: left edge, scattered y/z
            sphere.userData.s0x = -hw;
            sphere.userData.s0y = (Math.random() - 0.5) * hh * 0.3;
            sphere.userData.s0z = (Math.random() - 0.5) * hh * 0.3;

            // control point 1: left-centre, arcing back
            sphere.userData.c1x = -hw * 0.3 + (Math.random() - 0.5) * hw * 0.4;
            sphere.userData.c1y = (Math.random() - 0.5) * hh * 0.4;
            sphere.userData.c1z = -(0.4 + Math.random() * 0.4) * hh;

            // control point 2: right-centre, arcing front
            sphere.userData.c2x = hw * 0.3 + (Math.random() - 0.5) * hw * 0.4;
            sphere.userData.c2y = (Math.random() - 0.5) * hh * 0.4;
            sphere.userData.c2z = (0.4 + Math.random() * 0.4) * hh;

            // end: right edge, scattered y/z
            sphere.userData.e3x = hw;
            sphere.userData.e3y = (Math.random() - 0.5) * hh * 0.3;
            sphere.userData.e3z = (Math.random() - 0.5) * hh * 0.3;

            // damped wave overlay
            sphere.userData.waveAmp   = 1.0 + Math.random() * 0.8;
            sphere.userData.waveFreq  = 3.0 + Math.random() * 2.0;
            sphere.userData.wavePhase = Math.random() * Math.PI * 2;

            // stagger: each sphere starts at a different phase in the cycle
            sphere.userData.bzOffset   = Math.random() * duration;
            sphere.userData.bzDuration = duration;
        },
        animate(sphere, elapsed) {
            const u = sphere.userData;

            // normalised progress [0,1] within the looping duration
            const t = ((elapsed + u.bzOffset) % u.bzDuration) / u.bzDuration;

            // cubic Bézier weights
            const nt  = 1 - t;
            const nt2 = nt * nt;
            const nt3 = nt2 * nt;
            const t2  = t * t;
            const t3  = t2 * t;
            const w0  = nt3;
            const w1  = 3 * nt2 * t;
            const w2  = 3 * nt * t2;
            const w3  = t3;

            sphere.position.x = w0 * u.s0x + w1 * u.c1x + w2 * u.c2x + w3 * u.e3x;
            sphere.position.z = w0 * u.s0z + w1 * u.c1z + w2 * u.c2z + w3 * u.e3z;

            // Bézier y baseline
            const baseY = w0 * u.s0y + w1 * u.c1y + w2 * u.c2y + w3 * u.e3y;
            // damped sine wave: strong at start (t≈0), fades toward end (t≈1)
            const amp = u.waveAmp * Math.exp(-t * 3.0);
            const wave = Math.sin(t * Math.PI * 2 * u.waveFreq + u.wavePhase) * amp;
            sphere.position.y = baseY + wave;
        },
    },

    /**
     * Spheres are bucketed into colour groups by value thresholds.
     * Each group shares a distinct Bézier curve so same-coloured
     * spheres travel together, with small per-sphere jitter for variety.
     */
    groupBezier: {
        // deterministic pseudo-random per group index (simple hash)
        _groupRand(groupIdx, salt) {
            const x = Math.sin(groupIdx * 127.1 + salt * 311.7) * 43758.5453;
            return x - Math.floor(x);
        },
        init(sphere, { d, sceneWidth, sceneHeight }) {
            const hw = sceneWidth / 2;
            const hh = sceneHeight / 2;
            const duration = 12.0;
            const numGroups = 5;

            // bucket value into a group 0…numGroups-1
            const group = Math.min(Math.floor(d.value * numGroups), numGroups - 1);
            const gr = (salt) => this._groupRand(group, salt);

            // ── per-group curve — all flow left→right, each with a unique arc ──

            // start: always left edge, each group at a different y and z
            const gs0x = -hw;
            const gs0y = (gr(0) - 0.5) * hh * 1.2;
            const gs0z = (gr(1) - 0.5) * hh * 0.8;

            // control 1: left-centre x, unique y/z arc per group
            const gc1x = -hw * (0.1 + gr(2) * 0.4);
            const gc1y = (gr(3) - 0.5) * hh * 1.6;
            const gc1z = (gr(4) - 0.5) * hh * 1.2;

            // control 2: right-centre x, unique y/z arc per group
            const gc2x = hw * (0.1 + gr(5) * 0.4);
            const gc2y = (gr(6) - 0.5) * hh * 1.6;
            const gc2z = (gr(7) - 0.5) * hh * 1.2;

            // end: always right edge, each group at a different y and z
            const ge3x = hw;
            const ge3y = (gr(8) - 0.5) * hh * 1.2;
            const ge3z = (gr(9) - 0.5) * hh * 0.8;

            // ── per-sphere jitter around the group curve ──
            const j = 0.1;
            sphere.userData.s0x = gs0x + (Math.random() - 0.5) * hw * j;
            sphere.userData.s0y = gs0y + (Math.random() - 0.5) * hh * j;
            sphere.userData.s0z = gs0z + (Math.random() - 0.5) * hh * j;

            sphere.userData.c1x = gc1x + (Math.random() - 0.5) * hw * j;
            sphere.userData.c1y = gc1y + (Math.random() - 0.5) * hh * j;
            sphere.userData.c1z = gc1z + (Math.random() - 0.5) * hh * j;

            sphere.userData.c2x = gc2x + (Math.random() - 0.5) * hw * j;
            sphere.userData.c2y = gc2y + (Math.random() - 0.5) * hh * j;
            sphere.userData.c2z = gc2z + (Math.random() - 0.5) * hh * j;

            sphere.userData.e3x = ge3x + (Math.random() - 0.5) * hw * j;
            sphere.userData.e3y = ge3y + (Math.random() - 0.5) * hh * j;
            sphere.userData.e3z = ge3z + (Math.random() - 0.5) * hh * j;

            // stagger within the group
            sphere.userData.bzOffset   = gr(11) * duration * 0.3 + Math.random() * duration * 0.7;
            sphere.userData.bzDuration = duration;
        },
        animate(sphere, elapsed) {
            const u = sphere.userData;

            const t = ((elapsed + u.bzOffset) % u.bzDuration) / u.bzDuration;

            const nt  = 1 - t;
            const nt2 = nt * nt;
            const nt3 = nt2 * nt;
            const t2  = t * t;
            const t3  = t2 * t;
            const w0  = nt3;
            const w1  = 3 * nt2 * t;
            const w2  = 3 * nt * t2;
            const w3  = t3;

            sphere.position.x = w0 * u.s0x + w1 * u.c1x + w2 * u.c2x + w3 * u.e3x;
            sphere.position.y = w0 * u.s0y + w1 * u.c1y + w2 * u.c2y + w3 * u.e3y;
            sphere.position.z = w0 * u.s0z + w1 * u.c1z + w2 * u.c2z + w3 * u.e3z;
        },
    },
};
