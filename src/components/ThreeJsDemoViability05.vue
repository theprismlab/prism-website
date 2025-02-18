<template>
    <canvas id="canvasElement" style="position: absolute;  width:100%; height:100%;"></canvas>
  </template>
  
  <script>
  import * as THREE from 'three';
  import * as d3 from 'd3';
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  const fileName = "BRD-K05804044-viability-heatmap.csv";

  export default {
  name: 'ThreeJsDemo02',
      props: {
  
      },
      data () {
          return {
            heatmapData: [],
            width: undefined,
            height: undefined,
          }
      },
      computed: {
        path(){
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "data/" : "../../public/data/"
        },
        // canvas(){
        //     return document.getElementById('canvasElement');
        // },
        // width(){
        //     return this.canvas.clientWidth;
        //     if (!document.getElementById('canvasElement')) return window.innerWidth;
        //     else return document.getElementById('canvasElement').clientWidth;
        // },
        // height(){
        //     if (!document.getElementById('canvasElement')) return window.innerHeight;
        //     else return document.getElementById('canvasElement').clientHeight;
        // },

      },
      async mounted(){
        this.canvas = document.getElementById('canvasElement');
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        await this.loadData();
       
      },
      methods: {
        async loadData(){
            Promise.all([
                d3.csv(`${this.path}${fileName}`, function(d){
                    return {
                        ccle_name: d["Cell line"],
                        viability: +d["Viability"],
                        pert_dose: +d["Dose"]
                    
                    }
                }),
            ]).then(response=>{
                let heatmapData = this.parseHeatmapData(response[0]);
                this.heatmapData = heatmapData;
                this.init(this.heatmapData);
            })
        },
        parseHeatmapData(data){

            let cellLineGroups = d3.groups(data, d=>d.ccle_name).map(function(d){
                return {
                    key: d[0],
                    values: d[1],
                    mean: d3.mean(d[1], e=> e.viability )
                }
            })


            cellLineGroups = cellLineGroups.sort(function(a, b){
                return d3.descending(a.mean, b.mean)
            })


            let cellLineToNumber = {}
           cellLineGroups.forEach(function(d, i){
                cellLineToNumber[d.key] = i;
            })


            let doses = [...new Set(data.map(d=>d.pert_dose))].sort(function(a, b){ return b - a})
            let doseToNumber = {}
            doses.forEach(function(d, i){
                doseToNumber[d] = i;
            })

            const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([1,0.2])

            data.forEach(function(d){
                d.x = cellLineToNumber[d.ccle_name]
                d.z = doseToNumber[d.pert_dose]
                d.y = 0;
                d.c = colorScale(d.viability),
                d.rgba = new THREE.Color(d.c)
            })


            return data;

        },
        init(){
            const self = this;


            let width = this.width, 
                height = this.height,
                canvas = this.canvas;
            const heatmapData = this.heatmapData;
  

          // init
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(70, width / height, 1.01, 200 ); // Increased far clipping plane to 50
        
          camera.position.z = 25; // Zoomed out by increasing the z position
          camera.position.y = 5;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
  

          const light = new THREE.DirectionalLight( 0xffffff, 1 );
          light.position.set(5, 5, 5); 
          light.castShadow = true; // Enable casting shadows for the light
          scene.add( light );
  
          const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 2); // Add ambient light for softer shadows
          scene.add( ambientLight );
  
  
          const renderer = new THREE.WebGLRenderer({canvas, antialias:true})
          renderer.setSize( width, height );
          renderer.setClearColor(0xffffff, 0); // Set clear color to white with full alpha
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.shadowMap.enabled = true; // Enable shadow maps
  

          function onWindowResize() {
            self.width = self.canvas.clientWidth;
            self.height = self.canvas.clientHeight;

            camera.aspect = self.width / self.height;
            camera.updateProjectionMatrix();
            renderer.setSize(self.width, self.height);
            
            renderScene();
          }

          window.addEventListener('resize', onWindowResize);
            

 
        //   let controls = new OrbitControls(camera, renderer.domElement);
        //   controls.enableDamping = true;

            function renderScene(){
                const zExtent = d3.extent(heatmapData, d => d.z);
                const xExtent = d3.extent(heatmapData, d => d.x);
                const planeWidth = width/xExtent[1];
                const planeHeight = 4;

                const xScale = d3.scaleLinear()
                    .domain(xExtent)
                    .range([0, width]);
            
                const zScale = d3.scaleLinear()
                    .domain(zExtent)
                    .range([0, planeHeight * zExtent[1]]);
            

            const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
            const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

            heatmapData.forEach(d => {
                const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                const material = new THREE.MeshBasicMaterial({ color: d.rgba, side: THREE.DoubleSide, opacity: 1 });
                const plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = -Math.PI / 2;
                plane.position.set(xScale(d.x) - xOffset, d.y, zScale(d.z) - zOffset); // Align with the grid and plane
                scene.add(plane);
            });

            //   heatmapData.forEach(d => {
            //     const geometry = new THREE.CircleGeometry(0.1, 32); // Circle with radius 0.1
            //     const material = new THREE.MeshBasicMaterial({ color: d.rgba }); // Color based on viability
            //     const circle = new THREE.Mesh(geometry, material);
            //     circle.position.set(d.x, d.y, d.z); // Align with the grid and plane
            //     scene.add(circle);
            //   });
            
            // function animate(time) {
            //    // controls.update();
            //     requestAnimationFrame(animate);

            //     scene.rotation.y = time / 100000; // Slow down the rotation by increasing the divisor

            //     scene.traverse(function (object) {
            //     if (object.isMesh) {
            //         const distance = camera.position.distanceTo(object.position);
            //         const maxDistance = 1; // Adjust this value to control the range
                    
            //         object.material.opacity = Math.max(0.7, 1 - (distance / maxDistance) * 0.7); // Closest objects have opacity 1, farthest 0.3
            //     }
            //     });

            //     renderer.render(scene, camera);
            // }

        //   renderer.setAnimationLoop( animate );

            renderer.render( scene, camera );


            }
           renderScene();
           


       }
     
      },
      watch:{
        // width(){
        //     console.log("width changed")
        //     this.init();
        //  },
  
      }
  }
  </script>
  <style>
  
  
  
  
  
  </style>
    