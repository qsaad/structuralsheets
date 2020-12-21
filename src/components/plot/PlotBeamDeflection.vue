<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" class="span"/>
        
       <!-- LEFT SUPPORT -->
        <g v-if="type != 'Cantilever'">
          <circle cx="32.5" cy="157" r="5" class="simpleSupport" v-if="params.isLeftSupportSimple"/>
          <line x1="30"  y1="143" x2="30" y2="157" class="fixedSupport" v-else/>
        </g>

        <text x="10" :y="params.leftTextY" text-anchor="start" v-if="type == 'Cantilever'">{{ formatNumber(DL, 2) }} in</text>

        <!-- CENTER VALUE -->
        <text x="150" :y="params.centerTextY" text-anchor="middle" v-if="type != 'Cantilever'">{{ formatNumber(DC, 2) }} in</text>
        
        !-- RIGHT SUPPORT -->
        <circle cx="267.5" cy="157" r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
        <line x1="270"  y1="143" x2="270" y2="157" class="fixedSupport" v-else/>
        
        <!-- RIGHT VALUE -->
        <!-- <text x="290" :y="params.rightTextY" text-anchor="end" v-if="params.isRightText">{{ formatNumber(DR, 2) }} in </text> -->
        
        
        
        <!-- DEFLECTION PLOT -->
        <path :d="plotPath(30,150, plotArr)" class="deflectionFill"/>
        
        <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" class="titleText">{{ title }}</text>
      </svg>
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotBeamDeflection",
  components: {
      
    },
  props: {
    title: { type: String, default: ''},
    type: { type: String, default: 'Simple'},
    L: { type: Number, default: 0},
    Lo: { type: Number, default: 0},
    plotArr: { type: Array, default: []},
    DL: { type: Number, default: 0},
    DC: { type: Number, default: 0},
    DR: { type: Number, default: 0},
  },
  data() {
    return {
      SF: 0
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
            isLeftText: true,
            leftTextY: 180,
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
            rightSupportX: 267.5,
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
    maxValue(){
      return Math.max(Math.abs(this.DL), Math.abs(this.DC), Math.abs(this.DR))
    },
    plotPath(x, y, plotArr){
      switch(true){
        case (this.maxValue() < 10):
          this.SF = 50
          break
        case (this.maxValue() < 40):
          this.SF = 10
          break
        case (this.maxValue() < 100):
          this.SF = 5
          break
        case (this.maxValue() > 100):
          this.SF = 2.5
          break
      }

      let XF = 240/(this.L + this.Lo)
      let YF = this.SF
      let pathStr = `M ${x} ${y}`
    
      plotArr.forEach(item => pathStr += ` L ${(item.x*XF + x)} ${(item.y*YF + y)}`)

      return pathStr
    },//MOMENT PATH
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
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
.deflectionFill{
  fill: white; 
  stroke: blue; 
  stroke-width: 1px;
  fill-opacity: 1px;
  stroke-dasharray: 4 2;
}
.valueText{

}
.titleText{
  text-anchor: middle;
  stroke-width: 3; 
  font-size: 20px;
}  
</style>