<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" class="span" :transform="params.plotTransform"/>
        
         <!-- LEFT SUPPORT -->
        <g v-if="type != 'Cantilever'" :transform="params.plotTransform">
          <circle :cx="params.leftSupportX" :cy="params.leftSupportY" r="5" class="simpleSupport" v-if="params.isLeftSupportSimple"/>
          <line :x1="params.leftSupportX" :y1="params.leftSupportY-7" :x2="params.leftSupportX" :y2="params.leftSupportY+7" class="fixedSupport" v-else/>
        </g>
        
        <!-- RIGHT SUPPORT -->
        <g :transform="params.plotTransform">
          <circle :cx="params.rightSupportX" :cy="params.rightSupportY" :r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
          <line :x1="params.rightSupportX"  :y1="params.rightSupportY-7" :x2="params.rightSupportX"   :y2="params.rightSupportY+7" class="fixedSupport" v-else/>
        </g>
        
        <!-- LEFT VALUE -->
        <text :x="params.leftTextX" :y="params.leftTextY" text-anchor="start" v-if="params.isLeftText">{{ formatNumber(VL, 2) }} k</text>
        
        <!-- RIGHT VALUE -->
        <text :x="params.rightTextX" :y="params.rightTextY" text-anchor="start" v-if="params.isRightText">{{ formatNumber(VR, 2) }} k </text>
        <text :x="params.rightTextXc" :y="params.rightTextYc" text-anchor="start" v-if="params.isRightText" v-if="VC != 0">{{ formatNumber(VC, 2) }} k </text>
        
        <!-- MOMENT PLOT -->
        <path :d="plotPath(30,150, plotArr)" class="plotFill" :transform="params.plotTransform"/>
        
        <!-- TITLE -->
        <text x="20" y="20" text-anchor="start" class="titleText">SHEAR</text>
      </svg>
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotWallShear",
  components: {
      
    },
  props: {
    title: { type: String, default: ''},
    type: { type: String, default: 'Simple'},
    L: { type: Number, default: 0},
    Lo: { type: Number, default: 0},
    plotArr: { type: Array, default: []},
    VL: { type: Number, default: 0},
    VR: { type: Number, default: 0},
    VC: { type: Number, default: 0},
  },
  data() {
    return {
      SF: 0,
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
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 90,
            leftTextY: 275,
            centerTextX: 0,
            centerTextY: 0,
            rightTextX: 170,
            rightTextY: 35,
            //TRANSFORM
            plotTransform: 'rotate(-90 150 150)'
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
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 90,
            leftTextY: 35,
            centerTextX: 0,
            centerTextY: 0,
            rightTextX: 170,
            rightTextY: 275,
            //TRANSFORM
            plotTransform: 'rotate(90 150 150) scale(1,-1) translate(0, -300)'
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
            //TEXT VISIBILITY
            isLeftText: false,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 0,
            leftTextY: 0,
            centerTextX: 0,
            centerTextY: 0,
            rightTextX: 170,
            rightTextY: 275,
            //TRANSFORM
            plotTransform: 'rotate(90 150 150) scale(1,-1) translate(0, -300)'
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
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 170,
            leftTextY: 35,
            centerTextX: 0,
            centerTextY: 0,
            rightTextX: 90,
            rightTextY: 275,
            //TRANSFORM
            plotTransform: 'rotate(-90 150 150)'
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
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 90,
            leftTextY: 275,
            centerTextX: 0,
            centerTextY: 0,
            rightTextX: 90,
            rightTextY: 300-(this.L)/(this.L+this.Lo) * 240 - 40 + 2.5,
            rightTextXc: 170,
            rightTextYc: 300-(this.L)/(this.L+this.Lo) * 240 - 15 + 2.5,
            //TRANSFORM
            plotTransform: 'rotate(-90 150 150)'
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
      return Math.max(Math.abs(this.VL), Math.abs(this.VR), Math.abs(this.VC))
    },
    plotPath(x, y, plotArr){
      switch(true){
        case (this.maxValue() < 10):
          this.SF = 5
          break
        case (this.maxValue() < 40):
          this.SF = 1
          break
        case (this.maxValue() < 100):
          this.SF = 0.5
          break
        case (this.maxValue() > 100):
          this.SF = 0.25
          break
      }

      let XF = 240/(this.L + this.Lo)
      let YF = this.SF
      let pathStr = `M ${x} ${y}`
    
      plotArr.forEach(item => pathStr += ` L ${(item.x*XF + x)} ${(item.y*YF + y)}`)

      pathStr += ` L ${((this.L + this.Lo)*XF + x)} ${(y)}`

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
.plotFill{
  fill: blue; 
  stroke: blue; 
  stroke-width: 1px; 
  fill-opacity: 0.25;
}
.valueText{

}
.titleText{
  stroke-width: 3; 
  font-size: 20px;
}   
</style>