<template>
  <canvas id="canvasElement" style="width:100%;height:100%;">

  </canvas>
</template>

<script>
import * as THREE from 'three';
export default {
name: 'ThreeJsDemo01',
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

            const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
            camera.position.z = 1;

            const scene = new THREE.Scene();

            const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            const material = new THREE.MeshNormalMaterial();

            const mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            const renderer = new THREE.WebGLRenderer({canvas, antialias:true})
            renderer.setSize( width, height );
            renderer.setAnimationLoop( animate );


            // animation

            function animate( time ) {

                mesh.rotation.x = time / 2000;
                mesh.rotation.y = time / 1000;

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
  