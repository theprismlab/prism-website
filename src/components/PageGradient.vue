<template>
  <section :class="`${background}`">
      <slot></slot>
  </section>
</template>
<script>


export default {
    name: 'PageGradient',
    props: {
    background: {
      type: String,
      required: false
    },
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
<style>
.gradient-grey-lighten{
  background: linear-gradient(34deg, 
  var(--v-grey-lighten-5) 0%, 
  var(--v-grey-lighten-4) 50%, 
  var(--v-grey-lighten-3) 100%
  );
}
.solid-grey-lighten-2{
  background-color: var(--v-grey-lighten-2);
}


.gradient-dark{
  color: white;
  background: linear-gradient(34deg, #131219, #212329 40%, #545e7c);
}

.gradient-dark-lighten{
  background: linear-gradient(-34deg, rgba(19, 18, 25, .6), rgba(33, 35, 41, .2) 40%, rgba(84, 94, 124, .1));
}

.solid-primary-darken-3{
  background-color: var(--v-primary-darken-3);
  color: white !important;
}
.solid-primary-darken-4{
  background-color: var(--v-primary-darken-4);
  color: white !important;
}
/* https://csshero.org/mesher/ */
.solid-gray{
  background-color: #f5f5f5;

}

.gradient-PuBu{
  background-color:#ffffff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,90%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 37% 95%, hsla(209,93%,90%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(298,64%,80%,1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,81%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 87%, hsla(294,72%,81%,1) 0px, transparent 70%) /*bottom center*/
}

.gradient-BuPu{
  background-color: #ffffff;
  background-image:
  radial-gradient(at 59% 10%, hsla(225,89%,92%,1) 0px, transparent 50%),/*mid top*/
  radial-gradient(at 37% 95%, hsla(209,93%,97%,1) 0px, transparent 70%), /*bottom left*/
  radial-gradient(at 0% 32%, hsla(210, 94%, 90%, 1) 0px, transparent 90%), /*top left*/
  radial-gradient(at 72% 20%, hsla(294,72%,81%,1) 0px, transparent 70%), /*top right*/
  radial-gradient(at 44% 60%, hsla(210, 94%, 90%, 1) 0px, transparent 90%) /*bottom center*/
}

.gradient-BuPuOr{
  background-color:hsla(232,100%,94%,1);
  background-image:
  radial-gradient(at 40% 0%, hsla(211,94%,90%,1) 80px, transparent 70%),
  radial-gradient(at 0% 0%, hsl(232, 94%, 70%,1) 80px, transparent 70%),
  radial-gradient(at 60% 50%, hsla(28,100%,85%,1) 100px, transparent 50%),
  radial-gradient(at 100% 50%, hsla(340,100%,85%,1) 100px, transparent 70%),
  radial-gradient(at 80% 200%, hsla(242,100%,70%,1) 10px, transparent 80%);
}

.gradient-Blues{ 
  background-image: linear-gradient(180deg, 
  /* rgba(190, 219, 255, 0.0) 0%, */
  rgba(14, 122, 255, 0.0) 40%,
  rgba(14, 122, 255, 0.01) 80%,
  rgba(14, 122, 255, 0.25) 100%
  );
}

.gradient-Blues-lt{ 
  background-image: linear-gradient(160deg, 
  rgba(190, 219, 255, 0.05) 0%,
  rgba(190, 219, 255, 0.25) 50%,
  rgba(190, 219, 255, 0.25) 80%,
  rgba(190, 219, 255, 0.5) 100%
  );
}


.gradient-PiYl {
  background: linear-gradient(
    111.9deg,
    #fa709a,#fee140
  );
}

.gradient-PiYl-lt {
  background: linear-gradient(
    -90deg,
    hsl(340, 100%, 95%),
    hsl(54, 100%, 95%)
  );
}

.gradient-primary {
  background-image: linear-gradient(180deg, 
  #ffffff 0%,
  var(--v-primary-lighten-5) 50%,
  var(--v-primary-lighten-4) 100%
  );
}

.gradient-primary-lighten-1 {
  background-image: linear-gradient(180deg, 
  var(--v-primary-lighten-5) 0%,
  #ffffff 10%,
  #ffffff 50%,
  #ffffff 90%,
  var(--v-primary-lighten-5) 100%
  );
}

.gradient-primary-darken{
color: white;
  background-image: linear-gradient(133deg, 
  var(--v-primary-darken-4) 0%,
  var(--v-primary-darken-3) 100%
  );
}


.gradient-secondary {
  background-image: linear-gradient(180deg, 
  var(--v-secondary-lighten-5) 0%,
  var(--v-secondary-lighten-4) 50%,
  var(--v-secondary-lighten-3) 100%
  );
}
.gradient-secondary-darken-1 {
  background-image: linear-gradient(-33.33deg, 
  var(--v-secondary-darken-1) 0%,
  var(--v-secondary-darken-2) 50%,
  var(--v-secondary-darken-3) 100%
  );
}

.gradient-magma {
  /* background-image: linear-gradient( 111.9deg,   */
  background-image: linear-gradient( -90deg,  
  rgba(255,255,169,.8) 0.2%, 
  rgba(255,208,120,.8) 14.1%, 
  rgba(255,156,94,.8) 27.4%, 
  rgba(251,99,95,.8) 41.4%, 
  rgba(226,28,114,.9) 55.8%, 
  rgba(176,0,140,.9) 70.2%, 
  rgba(83,0,166,1) 84.1% );
}
.gradient-magma-2 {
  background-image: linear-gradient( 111.9deg,  
  rgba(255,255,169,1) 0.2%, 
  rgba(255,208,120,0.8) 14.1%, 
  rgba(255,156,94,0.7) 27.4%, 
  rgba(251,99,95,0.6) 41.4%, 
  rgba(226,28,114,0.5) 55.8%, 
  rgba(176,0,140,0.4) 70.2%, 
  rgba(83,0,166,0.3) 84.1% );
}

/* orange to salmon */
.gradient-OrPi{
  background: hsl(354, 100%, 70%);  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, hsl(36, 100%, 70%), hsl(354, 100%, 70%));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, hsl(36, 100%, 70%), hsl(354, 100%, 70%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.gradient-CyBu{
  background: linear-gradient(
    90deg,
    #9CECFB,#65C7F7,#0052D4
  );
}

.gradient-BuCy{
  background: linear-gradient(
    -90deg,
    #9CECFB, #65C7F7, #0E7AFF 
  );
}

.gradient-BuCy-lt{
  background: linear-gradient(
    -90deg,
    hsl(197, 100%, 97%), hsl(201, 89%, 95%), hsl(210, 100%, 80%)
  );
}
.solid-Blue{
  background-color: hsl(210, 100%, 85%);
}

/* .border-gradient-BuCy{ 
  background: none !important;
  border-image-source: linear-gradient(
    -90deg,
    #9CECFB, #65C7F7, #0E7AFF 
  );
} */


.gradient-YlOr{
  background: linear-gradient(90deg, rgba(255, 226, 89, 0.7), rgba(255, 167, 81, 0.7));

}

.gradient-RdOrYl{
  background: linear-gradient(90deg, rgba(254, 40, 24, 0.2), rgba(253, 117, 21, 0.4), rgba(250, 188, 10, 0.5));
}

/**light fusha to dark purple */
.gradient-Purples{
  background: hsl(240, 100%, 6%);  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, hsl(330, 100%, 97%), hsl(320, 79%, 56%), hsl(276, 97%, 39%), hsl(240, 100%, 6%));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, hsl(330, 100%, 97%), hsl(320, 79%, 56%), hsl(276, 97%, 39%), hsl(240, 100%, 6%)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}




</style>
  