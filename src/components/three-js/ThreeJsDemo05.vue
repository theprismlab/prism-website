<template>
  <canvas id="canvasElement" style="position: absolute;  width:100%;height:100%;">

  </canvas>
</template>

<script>
import * as THREE from 'three';
import * as d3 from 'd3';
export default {
name: 'ThreeJsDemo05',
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



     }
    },
    watch:{

    }
}
</script>
<style>





</style>
  