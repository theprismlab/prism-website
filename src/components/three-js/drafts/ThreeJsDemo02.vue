<template>
  <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">

  </canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
export default {
name: 'ThreeJsDemo02',
    props: {

    },
    data () {
        return {

        }
    },
    computed: {
        canvas(){
            return document.getElementById('canvasElement');
        },
        width(){
            return window.innerWidth;
        },
        height(){
            return window.innerHeight;
        }
    },
    mounted(){
        this.init();
    },
    methods: {
    init(){
        const width = this.width, 
        height = this.height,
        canvas = this.canvas;

        // init
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );

        camera.position.z = 1;
        // camera.position.y = 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();


    
        const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );


        const renderer = new THREE.WebGLRenderer({canvas, antialias:true})
        renderer.setSize( width, height );
        renderer.setClearColor(0xffffff, 0); // Set clear color to white with full alpha
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.shadowMap.enabled = true; // Enable shadow maps

        renderer.setAnimationLoop( animate );

        generateTransSpheresVolcano();





function generateNormalDistribution(mean, stdDev) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-1.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function interpolateColor(x) {
	const t = (x + 1) * 0.2 + 0.3; // Normalize x to range [0.3, 0.7]
	const color = d3.interpolatePlasma(t);
    return new THREE.Color(color);
}

function generateTransSpheresVolcano(){
	for (let i = 0; i < 600; i++) {

		const x = generateNormalDistribution(0, 1);
		const y = generateNormalDistribution(0, 1);
		const z = generateNormalDistribution(0, 1);

		//const radius = (z + 1) * 0.01 + (y + 1) * 0.01; // Scale radius based on z and y values
		const radius = (z + 1) * 0.02; // Scale radius based on z and y values
		const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
		const color = interpolateColor(x);
		const opacity = 0.1 + ((z + 1) / 2) * 0.7; // Normalize z to range [0.1, 0.8]

		const sphereMaterial = new THREE.MeshPhysicalMaterial({ 
			color: color, 
			transparent: true, 
			opacity: opacity, 
			metalness: .25,
			roughness: .05,
			envMapIntensity: 1,
			clearcoat: 1,
			transparent: true,
			clearcoatRoughness: 0.1,
			reflectivity: 0.2,
			refractionRatio: 0.985, 
			transmission:.7
		});
		const smallSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		smallSphere.position.set(x, y+1, z);
		smallSphere.castShadow = false;
		scene.add(smallSphere);
	}
}





        // animation
        function animate( time ) {

            mesh.rotation.x = time / 2000;
            mesh.rotation.y = time / 1000;

            scene.rotation.x = time / 2000;

            renderer.render( scene, camera );

        }
     }
    },
    watch:{

    }
}
</script>
<style>





</style>
  