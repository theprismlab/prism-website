<template>
  <page>
    <container-xs>
      <page-title>Design Playground</page-title>
    </container-xs>

    <!-- <div class="bkg halftone-01"></div>
    <div class="bkg background-01"></div>
    <div class="bkg background-02"></div> -->
    <div class="bkg background-03"></div>
    <div class="bkg background-04"></div>
    <div class="bkg background-05"></div>
    <div class="bkg background-06"></div>
    <div class="bkg background-07"></div>
    <div class="bkg background-08"></div>

</page>
</template>
<script>


// https://toolsweekly.com/resource/gradienta/
  export default {
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {

      },


    computed: {

   
    },
    methods: {
    
    },
    watch: {

    }
  }
</script>
<style scoped>
.bkg {
    height:400px;
    width: 100%;
}
.halftone-01{
    height: 30vh;
    background: /* 1 */
		var(--pattern, 
			radial-gradient(closest-side, #777, #fff) 
				0/ 1em 1em space), 
		var(--map, 
			linear-gradient(90deg, #888, #fff));
	background-blend-mode: multiply /* 2 */;
	filter: contrast(21) /* 3 */
}
.background-01{
    color: white;
    background: linear-gradient(120deg, var(--v-primary-accent-3), var(--v-primary-darken-4));
}
.background-02{
    background: linear-gradient(289.28deg, rgb(86, 36, 231) -30.61%, rgba(86, 36, 231, 0) 48.57%), 
    linear-gradient(270deg, rgba(24, 185, 220, 0) 35.78%, rgb(0, 120, 255) 157.41%, rgb(24, 185, 220) 0px), rgb(24, 116, 220);
    overflow: hidden;
    --tw-ring-offset-width: 10px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
}


.background-03{
    background: linear-gradient(115deg, #000000 0%, #00C508 55%, #000000 100%), linear-gradient(115deg, #0057FF 0%, #020077 100%), 
    conic-gradient(from 110deg at -5% 35%, #000000 0deg, #FAFF00 360deg), 
    conic-gradient(from 220deg at 30% 30%, #FF0000 0deg, #0000FF 220deg, #240060 360deg), 
    conic-gradient(from 235deg at 60% 35%, #0089D7 0deg, #0000FF 180deg, #240060 360deg);
    background-blend-mode: soft-light, soft-light, overlay, screen, normal;
}
.background-04{
    background: linear-gradient(120deg, #FF0000 0%, #2400FF 100%), linear-gradient(120deg, #FA00FF 0%, #208200 100%), linear-gradient(130deg, #00F0FF 0%, #000000 100%), radial-gradient(110% 140% at 15% 90%, #ffffff 0%, #1700A4 100%), radial-gradient(100% 100% at 50% 0%, #AD00FF 0%, #00FFE0 100%), radial-gradient(100% 100% at 50% 0%, #00FFE0 0%, #7300A9 80%), linear-gradient(30deg, #7ca304 0%, #2200AA 100%);
background-blend-mode: overlay, color, overlay, difference, color-dodge, difference, normal;
}
.background-05{
    background: linear-gradient(121deg, #FF0000 0%, #ff0000 100%), linear-gradient(140deg, #ff5454 27%, #223DCB 100%), linear-gradient(140deg, #4E9C51 0%, #001AFF 72%), linear-gradient(64deg, #6e00ff 0%, #0038FF 100%), radial-gradient(52% 101.79% at 50% 50%, #707300 0%, #ff0000 100%), radial-gradient(100% 100% at 70% 0%, #7A3B00 0%, #1DAC92 100%);
background-blend-mode: overlay, overlay, difference, difference, color-burn, exclusion;
}
.background-06{
    background: linear-gradient(301.28deg, #630000 0%, #000000 100%), linear-gradient(121.28deg, #207A00 0%, #950000 100%), linear-gradient(238.72deg, #FFB800 0%, #000000 100%), linear-gradient(238.72deg, #00D1FF 0%, #A80000 100%), linear-gradient(58.72deg, #B80000 0%, #1B00C2 100%), linear-gradient(125.95deg, #00E0FF 10.95%, #87009D 100%), linear-gradient(263.7deg, #B60000 3.43%, #B100A0 96.57%), linear-gradient(320.54deg, #800000 0%, #00C2FF 72.37%), linear-gradient(130.22deg, #8FA600 18.02%, #5A31FF 100%);
background-blend-mode: overlay, color-dodge, difference, lighten, difference, color-dodge, difference, difference, normal;
}
.background-07{
    background: radial-gradient(50% 123.47% at 50% 50%, #000000 0%, #FFFFFF 100%), radial-gradient(100% 100% at 50% 100%, #E9FFD8 0%, #001356 100%), linear-gradient(238.72deg, #0066FF 0%, #00CD21 100%), radial-gradient(100% 188.01% at 76.14% 0%, #00CAF7 0%, #FF00C7 100%), linear-gradient(0deg, #00C2FF 0%, #FFC700 100%), radial-gradient(59.2% 100% at 50% 0%, #8000FF 0%, #0085FF 100%), radial-gradient(100% 148.07% at 0% 0%, #FC8800 0%, #00FF94 100%);
background-blend-mode: overlay, multiply, hard-light, color-dodge, color-burn, color-burn, normal;
}
.background-08{
    background: linear-gradient(121.28deg, #010012 0%, #00FF94 100%), linear-gradient(238.72deg, #00227A 0%, #FFFFFF 100%), linear-gradient(244.35deg, #FFB26A 0%, #C15151 50.58%, #00A3FF 100%), linear-gradient(326.45deg, #E46262 0.54%, #000000 38.51%, #FF0000 75.69%), radial-gradient(100% 216.55% at 0% 0%, #2400FF 0%, #FF0000 44.27%, #610051 100%), linear-gradient(307.27deg, #096F5C 0.37%, #687EB5 52.78%, #6944FF 100%), radial-gradient(56.34% 100% at 36.02% 0%, #FF00C7 0%, #006C7A 38.54%, #FF9900 100%);
background-blend-mode: overlay, difference, color-dodge, overlay, difference, color-dodge, normal;
}
.background-09{
    background: linear-gradient(301.28deg, #FF0000 0%, #1D0027 100%), linear-gradient(121.28deg, #207A00 0%, #950000 100%), linear-gradient(238.72deg, #FFB800 0%, #000000 100%), linear-gradient(238.72deg, #00D1FF 0%, #A80000 100%), linear-gradient(125.95deg, #00E0FF 10.95%, #87009D 100%), linear-gradient(263.7deg, #B60000 3.43%, #B100A0 96.57%), linear-gradient(320.54deg, #800000 0%, #00C2FF 72.37%), linear-gradient(130.22deg, #8FA600 18.02%, #5A31FF 100%);
background-blend-mode: difference, color-dodge, difference, lighten, color-dodge, difference, difference, normal;
}
.background-10{
    background: linear-gradient(219.46deg, #110036 27.63%, #170059 100%), linear-gradient(219.46deg, #FFFFFF 27.63%, #19004E 100%), radial-gradient(100% 246.94% at 100% 100%, #FFFFFF 0%, #000353 100%), linear-gradient(121.18deg, #1400FF 0.45%, #3A0000 100%), linear-gradient(337.69deg, #DC52FF 8.44%, #00BDBD 84.19%), linear-gradient(222.34deg, #FFFFFF 12.99%, #008171 87.21%), linear-gradient(150.76deg, #0015D5 15.35%, #000B6C 89.57%);
background-blend-mode: screen, overlay, overlay, difference, difference, difference, normal;
}
.background-11{
    background: linear-gradient(151.44deg, #1F009B 0%, #FFFFFF 36.75%), linear-gradient(140.54deg, #FFFFFF 27.63%, #860000 100%), linear-gradient(140.54deg, #FFFFFF 27.63%, #510000 100%), linear-gradient(127.43deg, #BECE00 0%, #FFFFFF 100%), radial-gradient(111.5% 111.5% at 83.93% 106%, #FFFFFF 0%, #20009F 100%), radial-gradient(111% 111% at 74.29% -11%, #0500FF 0%, #FFD600 100%), linear-gradient(127.43deg, #B7D500 0%, #2200AA 100%);
background-blend-mode: multiply, difference, overlay, overlay, difference, difference, normal;
}
</style>
