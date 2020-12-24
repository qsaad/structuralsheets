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
        <text :x="params.leftTextX" :y="params.leftTextY" text-anchor="start" v-if="params.isLeftText">{{ formatNumber(VL, 2) }} k</text>
        
        <!-- RIGHT VALUE -->
        <text :x="params.rightTextX" :y="params.rightTextY" text-anchor="end" v-if="params.isRightText">{{ formatNumber(VR, 2) }} k </text>
        <text :x="params.rightTextX" :y="params.rightTextY -40" text-anchor="start" v-if="params.isRightText" v-if="VC != 0">{{ formatNumber(VC, 2) }} k </text>
        
        <!-- SHEAR PLOT -->
        <path :d="plotPath(30,150, plotArr)" class="plotFill"/>

        <g class="capacityFill" v-if="capArrShear.length > 1">
          <!-- POSITIVE SHEAR CAPACITY PLOT -->
          <rect :x="item.x" y="150" :width="item.width" :height="item.height"  v-for="item in plotCapacity(30, 150, capArrShear)" ></rect>
          <!-- NEGATIVE SHEAR CAPACITY PLOT -->
          <rect :x="item.x" y="150" :width="item.width" :height="item.height" v-for="item in plotCapacity(30, 150, capArrShear)" transform="scale(1,-1) translate(0,-300)"></rect>
        </g>
        
        <!-- TITLE -->
        <text :x="titleX" :y="titleY" text-anchor="middle" class="titleText">{{ title }}</text>
      </svg>
</template>

<script>
  import { decimal } from "../../utils/mathLib";
  
	export default {
  name: "PlotBeamShear",
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
    //BEAM SHEAR CAPACITY
    capArrShear: { type: Array, default: []}, //SHEAR CAPACITY ARRAY FOR POSITIVE BENDING MOMENT
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
            leftTextX: 10,
            leftTextY: 140,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 290,
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
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 140,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 290,
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
            rightTextX: 290,
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
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 140,
            centerTextX: 150,
            centerTextY: 140,
            rightTextX: 290,
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
            isLeftText: true,
            isCenterText: false,
            isRightText: true,
            //TEXT LOCATION
            leftTextX: 10,
            leftTextY: 140,
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
    maxValue(){
      return Math.max(Math.abs(this.VL), Math.abs(this.VR), Math.abs(this.VC))
    },
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
            height: arr == undefined ? 0 : arr[0].Vc * YF
          }
        }//IF
        else{
          return arr.map( (item, i, items) =>{
            Lx = i == 0 ? x : Lx + items[i-1].Lc * XF
            return{
              x: Lx,
              width: item == undefined ? 0 : item.Lc * XF,
              height: item == undefined ? 0 : item.Vc * YF
            }
          })
        }//ELSE
    },//PLOT CAPACITY

    plotPath(x, y, plotArr){
      let XF = this.XSF()
      let YF = this.YSF()

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
.capacityFill{
  fill: #090; 
  stroke: #090; 
  stroke-width: 1px; 
  fill-opacity: 0.1;
  stroke-opacity: 1;
  stroke-dasharray: 4 2;
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