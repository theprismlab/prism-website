<template>
    <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">
  
    </canvas>
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
            heatmapData: []
          }
      },
      computed: {
        path(){
          return import.meta.env.PROD ? import.meta.env.BASE_URL + "data/" : "../../public/data/"
        },
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
      async mounted(){
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
               // this.heatmapData = heatmapData;
                this.init(heatmapData);
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
                return d3.ascending(a.mean, b.mean)
            })
            console.log("cellLineGroups", cellLineGroups)

            let cellLineToNumber = {}
           cellLineGroups.forEach(function(d, i){
                cellLineToNumber[d.key] = i;
            })


            let doses = [...new Set(data.map(d=>d.pert_dose))].sort(function(a, b){ return a - b})
            let doseToNumber = {}
            doses.forEach(function(d, i){
                doseToNumber[d] = i;
            })

            const colorScale = d3.scaleSequential(d3.interpolateRdYlBu).domain(d3.extent(data, d=>d.viability))


            data.forEach(function(d){
                d.x = cellLineToNumber[d.ccle_name]
                d.z = doseToNumber[d.pert_dose]
                d.y = 0;
                d.c = colorScale(d.viability),
                d.rgba = new THREE.Color(d.c)
            })


            return data;

        },
        init(heatmapData){
          const width = this.width, 
          height = this.height,
          canvas = this.canvas;
            console.log("heatmapData", heatmapData)
  
          // init
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 200 ); // Increased far clipping plane to 50
        
          camera.position.z = 10; // Zoomed out by increasing the z position
          camera.position.y = 1;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
  
          const light = new THREE.DirectionalLight( 0xffffff, 1 );
          light.position.set(5, 5, 5); 
          light.castShadow = true; // Enable casting shadows for the light
          scene.add( light );
  
          const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 2); // Add ambient light for softer shadows
          scene.add( ambientLight );
  
        //   const planeGeometry = new THREE.PlaneGeometry( 500, 500 );
        //   const planeMaterial = new THREE.MeshStandardMaterial( { color: '#e2e2e2' } );
        //   const plane = new THREE.Mesh( planeGeometry, planeMaterial );
        //   plane.rotation.x = - Math.PI / 2;
        //   plane.position.y = -5;
        //   plane.receiveShadow = false; // Enable receiving shadows for the plane
        //   scene.add( plane );
         
          const gridHelper = new THREE.GridHelper(100, 100, 0x888888, 0x888888);
          gridHelper.material.opacity = 0.5;
          gridHelper.material.transparent = true;
          gridHelper.position.y = -5;
          scene.add(gridHelper);
  
          const renderer = new THREE.WebGLRenderer({canvas, antialias:true})
          renderer.setSize( width, height );
          renderer.setClearColor(0xffffff, 0); // Set clear color to white with full alpha
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.shadowMap.enabled = true; // Enable shadow maps
  
          let controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;

          const planeWidth = 0.05;
          const planeHeight = 4;
          const zExtent = d3.extent(heatmapData, d => d.z);
          const xExtent = d3.extent(heatmapData, d => d.x);
          const xScale = d3.scaleLinear()
              .domain(xExtent)
              .range([0, planeWidth * xExtent[1]]);
        
              const zScale = d3.scaleLinear()
                .domain(zExtent)
                .range([0, planeHeight * zExtent[1]]);
        

          const xOffset = (xScale.range()[1] - xScale.range()[0]) / 2;
          const zOffset = (zScale.range()[1] - zScale.range()[0]) / 2;

          heatmapData.forEach(d => {
              const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
              const material = new THREE.MeshBasicMaterial({ color: d.rgba, side: THREE.DoubleSide });
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

        
        
        function animate() {
            controls.update();
            requestAnimationFrame(animate);
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
    