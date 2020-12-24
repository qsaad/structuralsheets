<template>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" class="span"/>
        
        <!-- LEFT SUPPORT -->
        <g v-if="type != 'Cantilever'">
          <circle :cx="params.leftSupportX" :cy="params.leftSupportY" r="5" class="simpleSupport" v-if="params.isLeftSupportSimple"/>
          <line :x1="params.leftSupportX" :y1="params.leftSupportY-7" :x2="params.leftSupportX" :y2="params.leftSupportY+7" class="fixedSupport" v-else/>
        </g>
        
        <!-- RIGHT SUPPORT -->
        <g>
          <circle :cx="params.rightSupportX" :cy="params.rightSupportY" :r="5" class="simpleSupport" v-if="params.isRightSupportSimple"/>
          <line :x1="params.rightSupportX"  :y1="params.rightSupportY-7" :x2="params.rightSupportX"   :y2="params.rightSupportY+7" class="fixedSupport" v-else/>
        </g>
        <!-- LEFT VALUE -->
        <text :x="params.leftTextX" :y="params.leftTextY" text-anchor="start" v-if="params.isLeftText">{{ formatNumber(ML, 2) }} k-ft</text>

        <!-- CENTER VALUE -->
        <text :x="params.centerTextX" :y="params.centerTextY" text-anchor="middle" v-if="params.isCenterText">{{ formatNumber(MC, 2) }} k-ft</text>
        
        <!-- RIGHT VALUE -->
        <text :x="params.rightTextX" :y="params.rightTextY" text-anchor="middle" v-if="params.isRightText">{{ formatNumber(MR, 2) }} k-ft </text>
        
        <!-- MAXIMUM SPAN MOMENT POINT VALUE -->
        <text x="150" y="210" text-anchor="middle" font-size="12" v-if="xm > 0">xm = {{ formatNumber(xm, 2) }} ft</text>
        <!-- INFLEXION POINT VALUE -->
        <text x="150" y="225" text-anchor="middle" font-size="12" v-if="xc > 0">xc = {{ formatNumber(xc, 2) }} ft</text>
        <text x="150" y="240" text-anchor="middle" font-size="12" v-if="xcr > 0">xcr = {{ formatNumber(xcr, 2) }} ft</text>
        
        <!-- FORCE PLOT -->
        <path :d="plotPath(30,150, plotArr)" class="forceFill"/>

        
        <g class="capacityFill" v-if="capArrBot.length > 1">
          <!-- POSITIVE MOMENT CAPACITY PLOT -->
          <rect :x="item.x" y="150" :width="item.width" :height="item.height"  v-for="item in plotCapacity(30, 150, capArrBot)" ></rect>
        </g>

        <g class="capacityFill" v-if="capArrTop.length > 1">
          <!-- NEGATIVE MOMENT CAPACITY PLOT -->
          <rect :x="item.x" y="150" :width="item.width" :height="item.height" v-for="item in plotCapacity(30, 150, capArrTop)" transform="scale(1,-1) translate(0,-300)"></rect>
        </g>
        <!-- TITLE -->
        <text :x="titleX" :y="titleY" class="titleText">{{ title }}</text>
      </svg>
</template>

<script>
  import {zipWith} from 'lodash'
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotBeamMoment",
  components: {
      
    },
  props: {
    title: { type: String, default: ''},
    //BEAM PARAMETERS
    type: { type: String, default: 'Simple'},
    L: { type: Number, default: 0},     //SPAN LENGTH
    Lo: { type: Number, default: 0},    //OVERHANG SPAN LENGTH
    //BEAM FORCES
    plotArr: { type: Array, default: []},
    ML: { type: Number, default: 0},    //FIXED END MOMENT AT LEFT END
    MC: { type: Number, default: 0},    //SPAN MOMENT IN CENTER
    MR: { type: Number, default: 0},    //FIXED END MOMENT AT RIGHT RIGHT END
    xm: { type: Number, default: 0},    //DISTANCE TO MAXIMUM SPAN MOMENT
    xc: { type: Number, default: 0},    //DISTANCE TO POINT OF INFLEXION
    xcr: { type: Number, default: 0},   //DISTANCE TO SECOND POINT OF INFLEXION
    //BEAM FLEXURE CAPACITY
    capArrBot: { type: Array, default: []}, //MOMENT CAPACITY ARRAY FOR POSITIVE BENDING MOMENT
    capArrTop: { type: Array, default: []},  //MOMENT CAPACITY ARRAY FOR NEGATIVE BENDING MOMENT
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
            isLeftText: false,
            isCenterText: true,
            isRightText: false,
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
            //TEXT VISIBILITY
            isLeftText: false,
            isCenterText: true,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 255,
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
            //TEXT VISIBILITY
            isLeftText: false,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 255,
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
            //TEXT VISIBILITY
            isLeftText: true,
            isCenterText: true,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 255,
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
            //TEXT VISIBILITY
            isLeftText: false,
            isCenterText: true,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 180,
            centerTextX: (this.L)/(this.L+this.Lo) * 240 * 0.5 + 30 - 2.5,
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
     maxValue(){
      return Math.max(Math.abs(this.ML), Math.abs(this.MC), Math.abs(this.MR))
    },//MAX VALUE
    XSF(){
      return 240/(this.L + this.Lo)
    },//XSF
    YSF(){
      switch(true){
        case (this. maxValue() < 10):
          return 5
          break
        case (this. maxValue() < 40):
          return 1
          break
        case (this. maxValue() < 100):
          return 0.5
          break
        case (this. maxValue() > 100):
          return 0.25
          break
      }
    },//YSF
    plotCapacity(x, y, arr){
      let XF = this.XSF()
      let YF = this.YSF()
      let Lx = 0

        if(arr.length <= 1){
          return{
            x: x,
            width: arr == undefined ? 0 : arr[0].Lc * XF,
            height: arr == undefined ? 0 : arr[0].Mc * YF
          }
        }//IF
        else{
          return arr.map( (item, i, items) =>{
            Lx = i == 0 ? x : Lx + items[i-1].Lc * XF
            return{
              x: Lx,
              width: item == undefined ? 0 : item.Lc * XF,
              height: item == undefined ? 0 : item.Mc * YF
            }
          })
        }//ELSE
    },//PLOT CAPACITY
    plotPath(x, y, plotArr){
      let XF = this.XSF()
      let YF = this.YSF()

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
.capacityFill{
  fill: #090; 
  stroke: #090; 
  stroke-width: 1px; 
  fill-opacity: 0.1;
  stroke-opacity: 1;
  stroke-dasharray: 4 2;
}
.forceFill{
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