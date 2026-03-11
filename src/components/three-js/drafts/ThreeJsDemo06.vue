<template>
  <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">

  </canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default {
name: 'ThreeJsDemo06',
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
        // let renderer = new THREE.WebGLRenderer({
        // antialias: true
        // });
        // renderer.setSize(innerWidth, innerHeight);
        //renderer.setClearColor(0x404040);
      //  document.body.appendChild(renderer.domElement);
        // window.addEventListener("resize", (event) => {
        // camera.aspect = innerWidth / innerHeight;
        // camera.updateProjectionMatrix();
        // renderer.setSize(innerWidth, innerHeight);
        // });

        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        let dummy = new THREE.GridHelper(20, 20, 0x202020, 0x303030);
        scene.add(dummy);

        let amount = 10000;
        let groups = [
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
        let pts = new Array(amount).fill().map(_ => {
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

        let g = new THREE.BufferGeometry().setFromPoints(pts);
        g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        let m = new THREE.PointsMaterial({size: 0.1, vertexColors: true});
        let points = new THREE.Points(g, m);
        scene.add(points);

        renderer.setAnimationLoop((_) => {
        controls.update();
        
        pts.forEach((p, idx) => {
            let pd = pointsData[idx];
            let normal = pd.normal;
            let group = pd.group;
            //console.log(pd, group);
            let center = groups[group].center;
            p.applyAxisAngle(normal, 0.001);
            g.attributes.position.setXYZ(idx, p.x + center.x, p.y + center.y, p.z + center.z);
        })
        g.attributes.position.needsUpdate = true;
        
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
  