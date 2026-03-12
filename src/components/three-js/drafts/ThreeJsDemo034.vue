<template>
    <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">
  
    </canvas>
  </template>
  
  <script>
  import * as THREE from 'three';
  import * as d3 from 'd3';
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
        this.init();
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
            data.forEach(function(d){
                d.x = cellLineToNumber[d.ccle_name]
                d.y = doseToNumber[d.pert_dose]
                d.c = d.viability
            })


            return data;

        },
        init(){
          const width = this.width, 
          height = this.height,
          canvas = this.canvas;
  
          // init
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 40 ); // Increased far clipping plane to 50
  
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
  
  
          const planeGeometry = new THREE.PlaneGeometry( 500, 500 );
          const planeMaterial = new THREE.MeshStandardMaterial( { color: '#e2e2e2' } );
          const plane = new THREE.Mesh( planeGeometry, planeMaterial );
          plane.rotation.x = - Math.PI / 2;
          plane.position.y = -5;
          plane.receiveShadow = false; // Enable receiving shadows for the plane
          scene.add( plane );
         
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
  
  
  
  
  
  
          renderer.setAnimationLoop( animate );
  
       //   generateVolcano();
          generateLayout01();
  
  
  
  
  
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
        
        function generateVolcano(){
            for (let i = 0; i < 600; i++) {
        
                const x = generateNormalDistribution(0, 1);
                const y = generateNormalDistribution(0, 1);
                const z = generateNormalDistribution(0, 1);
        
                //const radius = (z + 1) * 0.01 + (y + 1) * 0.01; // Scale radius based on z and y values
                const radius = (z + 1) * 0.02; // Scale radius based on z and y values
                const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
                const color = interpolateColor(x);
                const opacity = 0.1 + ((z + 1) / 2) * 0.7; // Normalize z to range [0.1, 0.8]
        
        
                const smallSphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: opacity
                }));
                smallSphere.position.set(x, y+1, z);
                smallSphere.castShadow = false;
                scene.add(smallSphere);
            }
        }
        
        function generateLayout01(){
            for (let i = 0; i < 600; i++) {
        
                const x = generateNormalDistribution(0, 3);
                const y = generateNormalDistribution(0, 3);
                const z = generateNormalDistribution(0, 3);
        
                //const radius = (z + 1) * 0.01 + (y + 1) * 0.01; // Scale radius based on z and y values
                const radius = Math.random() * .2;
                const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
                const color = interpolateColor(x);
                const distance = Math.sqrt(x * x + y * y + z * z);
                const opacity = Math.min(1, distance / 100); // Adjust the divisor to control the opacity scaling
        
        
                const smallSphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: opacity
                }));
                smallSphere.position.set(x, y+1, z);
                smallSphere.castShadow = true;
                scene.add(smallSphere);
            }
        }
          // animation
          function animate( time ) {
              scene.rotation.y = time / 8000;
  
              scene.traverse(function (object) {
                  if (object.isMesh) {
                      const distance = camera.position.distanceTo(object.position);
                      const maxDistance = 10; // Adjust this value to control the range
                      
                      object.material.opacity = Math.max(0.7, 1 - (distance / maxDistance) * 0.7); // Closest objects have opacity 1, farthest 0.3
                  }
              });
  
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
    