<template>
  <section :class="`${className} py-8`">
      <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'PageGradient',
    props: {
    title: {
      type: String,
      required: false
    },
    className: {
      type: String,
      required: false
    }
},
    data () {
    return {

    }
    },
    methods: {
    },
    watch:{

    }
}
</script>
<style scoped>

/* https://csshero.org/mesher/ */
.mesh-1{
  background-color:hsla(0,100%,50%,1);
background-image:
radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%),
radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%),
radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%);
}

.mesh-2{
  background-color:hsla(232,100%,74%,1);
background-image:
radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%),
radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%),
radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%),
radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%);
} 
.mesh-3{
  background-color:#a899ff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,88%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 17% 42%, hsla(25,86%,92%,1) 0px, transparent 50%),/*mid left*/
  radial-gradient(at 95% 63%, hsla(198,70%,93%,1) 0px, transparent 70%),/*bottom-center right*/
  radial-gradient(at 37% 95%, hsla(209,93%,83%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,81%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,71%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 87%, hsla(133,68%,90%,1) 0px, transparent 70%)
}

/* mesh-4 looks good */
.mesh-4{
  background-color:#a899ff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,88%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 17% 42%, hsla(25,86%,99%,1) 0px, transparent 50%),/*mid left*/
  radial-gradient(at 95% 63%, hsla(198,70%,93%,1) 0px, transparent 70%),/*bottom-center right*/
  radial-gradient(at 37% 95%, hsla(209,93%,93%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,99%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,71%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 87%, hsla(133,68%,90%,1) 0px, transparent 70%)
}
.mesh-5{
  background-color:#ffffff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,90%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 37% 95%, hsla(209,93%,90%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,80%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,81%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 87%, hsla(294,72%,81%,1) 0px, transparent 70%) /*bottom center*/
}


.mesh-6{
  background-color:#d199ff;
  background-image:
  radial-gradient(at 29% 3%, hsla(187,65%,68%,1) 0px, transparent 50%),
  radial-gradient(at 44% 59%, hsla(214,65%,61%,1) 0px, transparent 50%),
  radial-gradient(at 37% 3%, hsla(286,79%,64%,1) 0px, transparent 50%),
  radial-gradient(at 90% 5%, hsla(192,87%,75%,1) 0px, transparent 50%),
  radial-gradient(at 56% 10%, hsla(249,71%,68%,1) 0px, transparent 50%),
  radial-gradient(at 84% 27%, hsla(257,71%,60%,1) 0px, transparent 50%),
  radial-gradient(at 62% 53%, hsla(155,91%,79%,1) 0px, transparent 50%);
}
.mesh-7{
  background-color:#99a8ff;
  background-image:
  radial-gradient(at 36% 50%, hsla(286,82%,73%,1) 0px, transparent 50%),
  radial-gradient(at 44% 55%, hsla(288,94%,67%,1) 0px, transparent 50%),
  radial-gradient(at 88% 13%, hsla(209,89%,68%,1) 0px, transparent 50%),
  radial-gradient(at 18% 89%, hsla(77,70%,74%,1) 0px, transparent 50%),
  radial-gradient(at 99% 10%, hsla(62,61%,65%,1) 0px, transparent 50%),
  radial-gradient(at 35% 78%, hsla(95,94%,68%,1) 0px, transparent 50%),
  radial-gradient(at 63% 84%, hsla(3,76%,60%,1) 0px, transparent 50%);
}
.mesh-8{
  background-color:#e499ff;
  background-image:
  radial-gradient(at 3% 91%, hsla(67,73%,76%,1) 0px, transparent 50%),
  radial-gradient(at 28% 14%, hsla(7,68%,68%,1) 0px, transparent 50%),
  radial-gradient(at 72% 71%, hsla(205,65%,76%,1) 0px, transparent 50%),
  radial-gradient(at 6% 86%, hsla(215,88%,69%,1) 0px, transparent 50%),
  radial-gradient(at 3% 79%, hsla(339,65%,62%,1) 0px, transparent 50%),
  radial-gradient(at 29% 48%, hsla(334,83%,74%,1) 0px, transparent 50%),
  radial-gradient(at 73% 13%, hsla(173,92%,79%,1) 0px, transparent 50%);
}
.mesh-9{
  background-color:#99ffff;
  background-image:
  radial-gradient(at 56% 90%, hsla(48,90%,68%,1) 0px, transparent 50%),
  radial-gradient(at 83% 74%, hsla(324,90%,74%,1) 0px, transparent 50%),
  radial-gradient(at 80% 26%, hsla(232,80%,73%,1) 0px, transparent 50%),
  radial-gradient(at 68% 30%, hsla(321,92%,79%,1) 0px, transparent 50%),
  radial-gradient(at 67% 25%, hsla(103,95%,73%,1) 0px, transparent 50%),
  radial-gradient(at 15% 28%, hsla(234,92%,71%,1) 0px, transparent 50%),
  radial-gradient(at 2% 65%, hsla(165,98%,75%,1) 0px, transparent 50%);
}
.mesh-10{
  background-color:#c999ff;
  background-image:
  radial-gradient(at 63% 83%, hsla(38,70%,61%,1) 0px, transparent 50%),
  radial-gradient(at 81% 40%, hsla(307,75%,65%,1) 0px, transparent 50%),
  radial-gradient(at 31% 59%, hsla(195,95%,63%,1) 0px, transparent 50%),
  radial-gradient(at 2% 73%, hsla(246,63%,72%,1) 0px, transparent 50%),
  radial-gradient(at 10% 98%, hsla(248,86%,65%,1) 0px, transparent 50%),
  radial-gradient(at 13% 35%, hsla(183,99%,72%,1) 0px, transparent 50%),
  radial-gradient(at 71% 11%, hsla(258,68%,68%,1) 0px, transparent 50%);
}
.mesh-11{
  background-color:#ffffff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,92%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 37% 95%, hsla(209,93%,97%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,99%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,81%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 60%, hsla(211, 94%, 90%, 1) 0px, transparent 90%) /*bottom center*/
}

/* mesh-12 looks good */
.mesh-12{
  background-color: #ffffff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,92%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 37% 95%, hsla(209,93%,97%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(210, 94%, 90%, 1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,81%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 60%, hsla(210, 94%, 90%, 1) 0px, transparent 90%) /*bottom center*/
}
/* looks great */
.mesh-13{
  background-color: #0E7AFF;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,88%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 17% 42%, hsla(25,86%,99%,1) 0px, transparent 50%),/*mid left*/
  radial-gradient(at 95% 63%, hsla(198,70%,93%,1) 0px, transparent 70%),/*bottom-center right*/
  radial-gradient(at 37% 95%, hsla(209,93%,93%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,99%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,71%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 87%, hsla(133,68%,90%,1) 0px, transparent 70%)
}
.mesh-14{
  /* background-color: hsla(25,86%,90%,1); */
  background-color:#0E7AFF;
  background-image:
  radial-gradient(at 59% 10%, hsla(211,94%,90%,1) 0px, transparent 30%),/*mid top*/
  radial-gradient(at 17% 42%, hsla(25,86%,96%,1) 0px, transparent 60%),/*mid left orange*/
  radial-gradient(at 95% 63%, hsla(198,70%,88%,1) 0px, transparent 70%),/*bottom-center right*/
  radial-gradient(at 37% 95%, hsla(294,72%,90%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,90%,1) 0px, transparent 80%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,88%,1) 0px, transparent 90%), /*top right*/
  radial-gradient(at 44% 87%, hsla(211,94%,80%,1) 0px, transparent 90%)
}


.mesh-15{
  background-color: #0E7AFF;
  background-image:
  radial-gradient(at 17% 42%, hsla(211,94%,98%,1) 0px, transparent 80%),/*mid left orange*/
  radial-gradient(at 95% 63%, hsla(198,70%,90%,1) 0px, transparent 80%),/*bottom-center right*/
  radial-gradient(at 72% 20%, hsla(294,72%,80%,0.9) 0px, transparent 80%), /*top right*/
  radial-gradient(at 44% 87%, hsla(177,94%,98%,0.9) 0px, transparent 90%)
}

.mesh-16{
  background-color:hsla(232,100%,94%,1);
  background-image:
  /* radial-gradient(at 40% 20%, hsla(232,100%,90%,1) 200px, transparent 50%), */
  radial-gradient(at 40% 0%, hsla(211,94%,90%,1) 80px, transparent 70%),
  radial-gradient(at 0% 0%, hsl(232, 94%, 70%,1) 80px, transparent 70%),
  radial-gradient(at 60% 50%, hsla(28,100%,85%,1) 100px, transparent 50%),
  /* radial-gradient(at 0% 50%, hsla(355,100%,85%,1) 10px, transparent 70%), */
  radial-gradient(at 100% 50%, hsla(340,100%,85%,1) 100px, transparent 70%),
  radial-gradient(at 80% 200%, hsla(242,100%,70%,1) 10px, transparent 80%);
  /* radial-gradient(at 0% 80%, hsla(211,94%,90%,1) 200px, transparent 70%); */
}


.mesh-17{
  background-color:hsla(232,100%,99%,1);
  background-image:
  radial-gradient(at 40% 20%, hsla(232,100%,90%,1) 200px, transparent 50%),
  radial-gradient(at 40% 0%, hsla(211,94%,90%,1) 80px, transparent 70%),
  radial-gradient(at 0% 0%, hsl(232, 94%, 70%,1) 80px, transparent 70%),
  radial-gradient(at 60% 50%, hsla(28,100%,85%,1) 100px, transparent 50%),
  /* radial-gradient(at 0% 50%, hsla(355,100%,85%,1) 10px, transparent 70%), */
  radial-gradient(at 100% 50%, hsla(340,100%,85%,1) 100px, transparent 70%),
  radial-gradient(at 80% 200%, hsla(242,100%,70%,1) 10px, transparent 80%);
  /* radial-gradient(at 0% 80%, hsla(211,94%,90%,1) 200px, transparent 70%); */
}
.mesh-18{
  background-color:hsla(232,100%,94%,1);
  background-image:
  /* radial-gradient(at 40% 20%, hsla(232,100%,90%,1) 200px, transparent 50%), */
  radial-gradient(at 40% 0%, hsla(211,94%,90%,1) 80px, transparent 70%),
  radial-gradient(at 0% 0%, hsl(232, 94%, 70%,1) 80px, transparent 70%),
  radial-gradient(at 60% 50%, hsla(28,100%,85%,1) 100px, transparent 50%),
  /* radial-gradient(at 0% 50%, hsla(355,100%,85%,1) 10px, transparent 70%), */
  radial-gradient(at 100% 50%, hsla(340,100%,85%,1) 100px, transparent 70%),
  radial-gradient(at 80% 200%, hsla(242,100%,70%,1) 10px, transparent 80%);
  /* radial-gradient(at 0% 80%, hsla(211,94%,90%,1) 200px, transparent 70%); */
}

.Bl-1{ 
  background-image: linear-gradient(133deg, 
  rgba(190, 219, 255, 0.1) 0%,
  rgba(14, 122, 255, 0.25) 50%,
  rgba(14, 122, 255, 0.5) 80%,
  rgba(14, 122, 255, 0.9) 100%
  );
}
.truesunset {
  background: linear-gradient(
    111.9deg,
    #fa709a,#fee140
  );
}

.sweetperid{
  background: linear-gradient(
    111.9deg,
    #3f51b1,#5a55ae,#7b5fac,#8f6aae,#a86aa4,#cc6b8e,#f18271,#f3a469,#f7c978
  );

}
.plasma-1 {
  background-image: linear-gradient( 111.9deg,  
  rgba(255,255,169,1) 0.2%, 
  rgba(255,208,120,1) 14.1%, 
  rgba(255,156,94,1) 27.4%, 
  rgba(251,99,95,1) 41.4%, 
  rgba(226,28,114,1) 55.8%, 
  rgba(176,0,140,1) 70.2%, 
  rgba(83,0,166,1) 84.1% );
}
.plasma-2 {
  background-image: linear-gradient( 111.9deg,  
  rgba(255,255,169,1) 0.2%, 
  rgba(255,208,120,0.8) 14.1%, 
  rgba(255,156,94,0.7) 27.4%, 
  rgba(251,99,95,0.6) 41.4%, 
  rgba(226,28,114,0.5) 55.8%, 
  rgba(176,0,140,0.4) 70.2%, 
  rgba(83,0,166,0.3) 84.1% );
}


.plasma-3 {
  background-image: linear-gradient( 133deg,  
  rgba(255,255,169,0.7) 40%, 
  rgba(251,99,95,0.6) 80%, 
  rgba(226,28,114,0.9) 100%
  );
}

.jodhpur{
  background: linear-gradient(
    90deg,
    #9CECFB,#65C7F7,#0052D4
  );
}
.mango{
  background: linear-gradient(90deg, rgba(255, 226, 89, 0.7), rgba(255, 167, 81, 0.7));
}
 .Bl{
    background: linear-gradient(300deg, rgba(190, 219, 255, .1), rgba(190, 219, 255, .4));
  }

.YlOr{
    background: linear-gradient(300deg, rgba(237, 111, 69, .5), rgba(255, 255, 165, .5));
  }

  .RdOrYl{
    background: linear-gradient(90deg, rgba(254, 40, 24, 0.2), rgba(253, 117, 21, 0.4), rgba(250, 188, 10, 0.5));
  }
  .PkOr{
    background: linear-gradient(300deg, #e233ff, #ff6b00);
  }
  section{
    /* background: linear-gradient(300deg, rgb(226, 51, 255), rgb(255, 107, 0)); */
    /* background: linear-gradient(300deg, hsl(291, 100%, 60%), hsl(24, 100%, 50%)); */
  
  }

  .test{
    background: linear-gradient(300deg, hsl(291, 100%, 80%), hsl(291, 100%, 90%), hsl(24, 100%, 70%));
  }
  /**light fusha to dark purple */
  .argon{
    background: hsl(240, 100%, 6%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(330, 100%, 97%), hsl(320, 79%, 56%), hsl(276, 97%, 39%), hsl(240, 100%, 6%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(330, 100%, 97%), hsl(320, 79%, 56%), hsl(276, 97%, 39%), hsl(240, 100%, 6%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* plumb to gold */
  .tranquil{
    background: hsl(30, 70%, 80%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(330, 83%, 67%), hsl(30, 70%, 80%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(330, 83%, 67%), hsl(30, 70%, 80%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* orange to salmon */
  .sweetmorning{
    background: hsl(354, 100%, 70%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(36, 100%, 70%), hsl(354, 100%, 70%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(36, 100%, 70%), hsl(354, 100%, 70%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* blood orange to blood orange */
  .haikus{
    background: hsl(4, 98%, 70%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(14, 100%, 88%), hsl(4, 98%, 80%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(14, 100%, 88%), hsl(4, 98%, 80%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* bright blood orange to pink blood orange */
  .burningorange{
    background: hsl(348, 100%, 66%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(5, 100%, 60%), hsl(348, 100%, 66%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(5, 100%, 60%), hsl(348, 100%, 66%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  /* red to purple to blue teal */
  .jshine{
    background: hsl(192, 85%, 47%);  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, hsl(348, 89%, 54%), hsl(276, 71%, 67%), hsl(192, 85%, 47%));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, hsl(348, 89%, 54%), hsl(276, 71%, 67%), hsl(192, 85%, 47%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

</style>
  