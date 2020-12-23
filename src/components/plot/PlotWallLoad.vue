<template>
     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
        <!-- POINT LOAD -->
        <g v-for="item in PL" transform="rotate(90 150 150">
          <line :x1="30 + (item.a/(L+Lo))*240" y1="105" :x2="30 + (item.a/(L+Lo))*240" y2="125" class="pointLoad"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 - 5" y2="120" class="pointLoad"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 + 5" y2="120" class="pointLoad"/>
          <text :x="30 + (item.a/(L+Lo))*240" y="90" class="pointLoadText">{{ formatNumber(item.P, 1)}} k</text>
          <text :x="30 + (item.a/(L+Lo))*240" y="100" class="pointLoadText">{{ formatNumber(item.a, 1)}} ft</text>
        </g>

        <!-- UNIFORM LOAD -->
        <g transform="rotate(90 150 150">
          <rect x="30" y="130" :width="params.loadWidth" height="10" class="uniformLoad"></rect>
          <rect :x="30+params.loadWidth" :y="130 + 10*(1-wo/w)" :width="240 - params.loadWidth" :height="10*wo/w" class="uniformLoad" v-if="type == 'Overhang'"></rect>
        </g>

        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270" y2="150" class="span" transform="rotate(90 150 150"/>

        <!-- LEFT SUPPORT -->
        <g v-if="type != 'Cantilever'" transform="rotate(90 150 150">
          <circle :cx="params.leftSupportX" :cy="params.leftSupportY" r="5" class="simpleSupport" v-if="params.isLeftSupportSimple"/>
          <line :x1="params.leftSupportX" :y1="params.leftSupportY-7" :x2="params.leftSupportX" :y2="params.leftSupportY+7" class="fixedSupport" v-else/>
        </g>
        
        <!-- RIGHT SUPPORT -->
        <g >
          <circle :cx="params.rightSupportX" :cy="params.rightSupportY" :r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
          <line :x1="params.rightSupportX"  :y1="params.rightSupportY-7" :x2="params.rightSupportX"   :y2="params.rightSupportY+7" class="fixedSupport" v-else/>
        </g>
        <!-- LEFT REACTION -->
        <text :x="params.leftTextX" :y="params.leftTextY" text-anchor="start" v-if="params.isLeftText">{{ formatNumber(RL, 2) }} k</text>
        
        <!-- RIGHT REACTION -->
        <text :x="params.rightTextX" :y="params.rightTextY" text-anchor="middle" v-if="params.isRightText">{{ formatNumber(RR, 2)}} k</text>

        <!-- TITLE -->
        <text :x="titleX" :y="titleY" class="titleText">{{ title }}</text>
    </svg>
  
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotWallLoad",
  components: {
      
  },
  props: {
    title: { type: String, default: ''},
    type: { type: String, default: ''},
    PL: { type: Array, default: []},
    L: { type: Number, default: 0},
    Lo: { type: Number, default: 0},
    w: { type: Number, default: 0},
    wo: { type: Number, default: 0},
    RL: { type: Number, default: 0},
    RR: { type: Number, default: 0},
    Ds: { type: Number, default: 0},
  },
  data() {
    return {
      titleX: 150,
      titleY: 280,  
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    params(){
      switch(true){
        case (this. type == 'Simple'):
          return {
            //SUPPORT VISIBILITY
            isLeftSupportSimple: true,
            isRightSupportSimple: true,
            //SUPPORT LOCATION
            leftSupportX: 32.5,
            leftSupportY: 157,
            rightSupportX: 267.5,
            rightSupportY: 157,
            //UNIFORM LOAD
            loadWidth: 240,
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 267.5,
            rightTextY: 180,
          }
          break
        case (this. type == 'Propped'):
          return {
            //SUPPORT VISIBILITY
            isLeftSupportSimple: true,
            isRightSupportSimple: false,
            //SUPPORT LOCATION
            leftSupportX: 32.5,
            leftSupportY: 157,
            rightSupportX: 270,
            rightSupportY: 150,
            //UNIFORM LOAD
            loadWidth: 240,
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 267.5,
            rightTextY: 180,
          }
          break
        case (this. type == 'Cantilever'):
          return {
            //SUPPORT VISIBILITY
            isLeftSupportSimple: false,
            isRightSupportSimple: false,
            //SUPPORT LOCATION
            leftSupportX: 32.5,
            leftSupportY: 157,
            rightSupportX: 270,
            rightSupportY: 150,
            //UNIFORM LOAD
            loadWidth: 240,
            //TEXT VISIBILITY
            isLeftText: false,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 270,
            rightTextY: 180,
          }
          break
        case (this. type == 'Fixed'):
          return {
            //SUPPORT VISIBILITY
            isLeftSupportSimple: false,
            isRightSupportSimple: false,
            //SUPPORT LOCATION
            leftSupportX: 30,
            leftSupportY: 150,
            rightSupportX: 270,
            rightSupportY: 150,
            //UNIFORM LOAD
            loadWidth: 240,
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 270,
            rightTextY: 180,
          }
          break
        case (this. type == 'Overhang'):
          return {
            //SUPPORT VISIBILITY
            isLeftSupportSimple: true,
            isRightSupportSimple: true,
            //SUPPORT LOCATION
            leftSupportX: 32.5,
            leftSupportY: 157,
            rightSupportX: (this.L)/(this.L+this.Lo) * 240 + 30 - 2.5,
            rightSupportY: 157,
            //UNIFORM LOAD
            loadWidth: (this.L)/(this.L+this.Lo) * 240,
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: (this.L)/(this.L+this.Lo) * 240 + 30 - 2.5,
            rightTextY: 180,
          }
          break
      }//SWITCH
    },//PARAMS
  }, //COMPUTED
  methods: {
    formatNumber(num, deci){
      return decimal(num, deci)
    },//FORMAT NUMBER
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
.pointLoad{
  stroke: #adc454;
  stroke-width: 2px;
}
.pointLoadText{
  text-anchor: middle;
  font-size: 10px;
}
.uniformLoad{
  stroke: #000;
  stroke-width: 1px;
  fill: #adc454;
  fill-opacity: 1px;
}
.span{
  stroke: #000;
  stroke-width: 3px;
}
.simpleSupport{
  stroke: #000; 
  stroke-width: 1px;
  fill: #000; 
}
.fixedSupport{
  stroke: #000;
  stroke-width: 5px; 
}
.valueText{

}
.titleText{
  text-anchor: middle;
  stroke-width: 3; 
  font-size: 20px;
}
</style>