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
        <!-- LEFT VALUE -->
          <text x="10" :y="params.leftTextY" text-anchor="start" v-if="params.isLeftText">{{ formatNumber(ML, 2) }} k-ft</text>
        </g>

        <!-- CENTER VALUE -->
        <text :x="params.centerTextX" :y="params.centerTextY" text-anchor="middle" v-if="type != 'Cantilever'">{{ formatNumber(MC, 2) }} k-ft</text>
        
        <!-- RIGHT SUPPORT -->
        <circle :cx="params.rightSupportX" cy="157" r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
        <line x1="270"  y1="143" x2="270" y2="157" class="fixedSupport" v-else/>
        <!-- RIGHT VALUE -->
        <text :x="params.rightSupportX" :y="params.rightTextY" text-anchor="middle" v-if="params.isRightText">{{ formatNumber(MR, 2) }} k-ft </text>
        
        <!-- MAXIMUM SPAN MOMENT POINT VALUE -->
        <text x="150" y="210" text-anchor="middle" font-size="12" v-if="xm > 0">xm = {{ formatNumber(xm, 2) }} ft</text>
        <!-- INFLEXION POINT VALUE -->
        <text x="150" y="225" text-anchor="middle" font-size="12" v-if="xc > 0">xc = {{ formatNumber(xc, 2) }} ft</text>
        <text x="150" y="240" text-anchor="middle" font-size="12" v-if="xcr > 0">xcr = {{ formatNumber(xcr, 2) }} ft</text>
        
        <!-- MOMENT PLOT -->
        <path :d="plotPath(30,150, plotArr)" class="plotFill"/>
        
        <!-- TITLE -->
        <text x="150" y="280" class="titleText">{{ title }}</text>
      </svg>
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotBeamMoment",
  components: {
      
    },
  props: {
    title: { type: String, default: ''},
    type: { type: String, default: 'Simple'},
    L: { type: Number, default: 0},
    Lo: { type: Number, default: 0},
    plotArr: { type: Array, default: []},
    ML: { type: Number, default: 0},
    MC: { type: Number, default: 0},
    MR: { type: Number, default: 0},
    xm: { type: Number, default: 0},
    xc: { type: Number, default: 0},
    xcr: { type: Number, default: 0},
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
            centerTextX: 150,
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
            centerTextX: 150,
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
            centerTextX: 150,
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
            centerTextX: 150,
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
            centerTextX: (this.L)/(this.L+this.Lo) * 240 * 0.5 + 30 - 2.5,
            centerTextY: 140,
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
      return Math.max(Math.abs(this.ML), Math.abs(this.MC), Math.abs(this.MR))
    },
    plotPath(x, y, plotArr){
      switch(true){
        case (this. maxValue() < 10):
          this.SF = 5
          break
        case (this. maxValue() < 40):
          this.SF = 1
          break
        case (this. maxValue() < 100):
          this.SF = 0.5
          break
        case (this. maxValue() > 100):
          this.SF = 0.25
          break
      }

      let XF = 240/(this.L + this.Lo)
      let YF = this.SF
      let pathStr = `M ${x} ${y}`
    
      plotArr.forEach(item => pathStr += ` L ${(item.x*XF + x)} ${(item.y*YF + y)}`)

      if(this.type == 'Propped' || 'Cantilever' || 'Fixed'){
        pathStr += ` L ${(this.L*XF + x)} ${(y)}`
      }
      

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
  text-anchor: middle;
  stroke-width: 3; 
  font-size: 20px;
} 
</style>