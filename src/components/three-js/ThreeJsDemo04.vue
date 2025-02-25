<template>
  <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">

  </canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
export default {
name: 'ThreeJsDemo04',
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
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000 ); 
        camera.position.z = 1000;

        const renderer = new THREE.WebGLRenderer({canvas, antialias:true})
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize( width, height );



        // Define neon colors for the spheres
        const colorList = [0xef476f, 0xffd166, 0x06d6a0, 0x118ab2, 0x073b4c];
        const colors = colorList.map(hex => new THREE.Color(hex));

        const spheres = []; // Array to store multiple spheres
        const numSpheres = 15; // Number of neon spheres to create


        // Function to create a new neon sphere with random color and position
        function createNeonSphere() {
            const geometry = new THREE.SphereGeometry(50, 32, 32); // Sphere geometry
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                wireframe: true, // Wireframe effect for neon style
            });
            const sphere = new THREE.Mesh(geometry, material);

            // Set random initial position within a range
            sphere.position.set(
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000,
                (Math.random() - 0.5) * 1000
            );

            // Add movement properties
            sphere.userData = {
                direction: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ),
            };

            scene.add(sphere);
            spheres.push(sphere);
        }

        // Create multiple spheres
        for (let i = 0; i < numSpheres; i++) {
            createNeonSphere();
        }

        function animate() {
            requestAnimationFrame(animate);

            // Update each sphere's position and rotation for a neon effect
            spheres.forEach((sphere) => {
                // Move sphere in random direction
                const { direction } = sphere.userData;
                sphere.position.add(direction);

                // Bounce sphere if it goes out of bounds
                if (Math.abs(sphere.position.x) > 500) direction.x *= -1;
                if (Math.abs(sphere.position.y) > 500) direction.y *= -1;
                if (Math.abs(sphere.position.z) > 500) direction.z *= -1;

                // Slight rotation for visual effect
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        }

        animate();
     }
    },
    watch:{

    }
}
</script>
<style>





</style>
  