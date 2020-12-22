<template>
     <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
        <!-- POINT LOAD -->
        <g v-for="item in PL" >
          <line :x1="30 + (item.a/(L+Lo))*240" y1="105" :x2="30 + (item.a/(L+Lo))*240" y2="125" class="pointLoad"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 - 5" y2="120" class="pointLoad"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 + 5" y2="120" class="pointLoad"/>
          <text :x="30 + (item.a/(L+Lo))*240" y="90" class="pointLoadText">{{ formatNumber(item.P, 1)}} k</text>
          <text :x="30 + (item.a/(L+Lo))*240" y="100" class="pointLoadText">{{ formatNumber(item.a, 1)}} ft</text>
        </g>

        <!-- UNIFORM LOAD -->
        <rect x="30" y="130" width="240" height="10" class="uniformLoad"></rect>

        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" class="span"/>

        <!-- LEFT SUPPORT -->
        <g v-if="type != 'Cantilever'">
          <circle cx="32.5" cy="157" :r="5" class="simpleSupport" v-if="params.isLeftSupportSimple"/>
          <line x1="30"  y1="143" x2="30"   y2="157" class="fixedSupport" v-else/>

          <!-- LEFT REACTION -->
          <text x="10" y="180" text-anchor="start" >{{ formatNumber(RL, 2) }} k</text>
        </g>
        
        <!-- RIGHT SUPPORT -->
        <circle :cx="params.rightSupportX" cy="157" :r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
        <line x1="270"  y1="143" x2="270"   y2="157" class="fixedSupport" v-else/>
        
        <!-- RIGHT REACTION -->
        <text :x="params.rightSupportX" y="180" text-anchor="middle">{{ formatNumber(RR, 2)}} k</text>

        <!-- TITLE -->
        <text x="150" y="280" class="titleText">{{ title }}</text>
    </svg>
  
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotBeamLoad",
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
            isLeftSupportSimple: true,
            isRightSupportSimple: true,
            rightSupportX: 267.5,
            isLeftText: false,
            leftTextY: 0,
            isCenterText: true,
            centerTextY: 140,
            isRightText: true,
            rightTextY: 0,
          }
          break
        case (this. type == 'Propped'):
          return {
            isLeftSupportSimple: true,
            isRightSupportSimple: false,
            rightSupportX: 267.5,
            isLeftText: false,
            leftTextY: 0,
            isCenterText: true,
            centerTextY: 140,
            isRightText: true,
            rightTextY: 180,
          }
          break
        case (this. type == 'Cantilever'):
          return {
            isLeftSupportSimple: false,
            isRightSupportSimple: false,
            rightSupportX: 267.5,
            isLeftText: false,
            leftTextY: 0,
            isCenterText: false,
            centerTextY: 0,
            isRightText: true,
            rightTextY: 180,
          }
          break
        case (this. type == 'Fixed'):
          return {
            isLeftSupportSimple: false,
            isRightSupportSimple: false,
            rightSupportX: 267.5,
            isLeftText: true,
            leftTextY: 180,
            isCenterText: true,
            centerTextY: 140,
            isRightText: true,
            rightTextY: 180,
          }
          break
        case (this. type == 'Overhang'):
          return {
            isLeftSupportSimple: true,
            isRightSupportSimple: true,
            rightSupportX: (this.L)/(this.L+this.Lo) * 240 + 30 - 2.5,
            isLeftText: false,
            leftTextY: 0,
            isCenterText: true,
            centerTextY: 180,
            isRightText: true,
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