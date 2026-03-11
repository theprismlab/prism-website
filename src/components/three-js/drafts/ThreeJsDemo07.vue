<template>
  <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;"></canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default {

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

        camera.position.set(3, 5, 8).setLength(20);
        camera.lookAt(scene.position);


        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        let grid = new THREE.GridHelper(20, 20, 0x202020, 0x303030);
        scene.add(grid);

        let numPoints = 1000; // change this to number of cell lines per group
        let groups = [ // change this to groups of cell lines by lineage
        {
            color: "red",
            center: new THREE.Vector3().random().subScalar(0.5).multiplyScalar(10)
        },
        {
            color: "aqua",
            center: new THREE.Vector3().random().subScalar(0.5).multiplyScalar(10)
        }
        ];

        
        let pointsData = [];
        let q = new THREE.Quaternion();
        let c = new THREE.Color();
        let front = new THREE.Vector3(0, 0, 1);
        let colors = [];
        // pts is a list of _Vector3 points with x, y, and z coordinates
        let pts = new Array(numPoints).fill().map(_ => {
            let randAngle = Math.random() * Math.PI * 2;
            let randRadius = Math.random();
            let p = new THREE.Vector3(
                Math.cos(randAngle) * (2 + randRadius * 0.25),
                Math.sin(randAngle) * (2 + randRadius * 0.25),
                0
            );
            
            let randNorm = new THREE.Vector3().randomDirection();
            q.setFromUnitVectors(front, randNorm);
            p.applyQuaternion(q);
            
            let randGroup = Math.floor(Math.random() * groups.length);
            let group = groups[randGroup];
            c.set(group.color);
            colors.push(c.r, c.g, c.b);
            
            pointsData.push({
                normal: randNorm,
                group: randGroup
            });
            return p;
        })

        pts.forEach((p, idx) => {
            const radius = Math.random() * 0.2;
            const opacity = 0.5;
            const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
            const sphereMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color(colors[idx * 3], colors[idx * 3 + 1], colors[idx * 3 + 2]),
                transparent: true,
                opacity: opacity
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.copy(p);
            scene.add(sphere);

            pointsData[idx].sphere = sphere;
        });

        renderer.setAnimationLoop((_) => {
            controls.update();
            pts.forEach((p, idx) => {
            let pd = pointsData[idx];
            let normal = pd.normal;
            let group = pd.group;
            let center = groups[group].center;
            p.applyAxisAngle(normal, 0.001);
            pd.sphere.position.set(p.x + center.x, p.y + center.y, p.z + center.z);
            });
            
            renderer.render(scene, camera);
        });

     }
    },
    watch:{

    }
}
</script>
<style>





</style>
  