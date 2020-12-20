<template>
  <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      PARAPET WALL
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!--INPUTS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:inputs>
      <input-group title="PARAMETERS">
        <custom-text-field :label="`Span (ft)`">
				  <input type="text" class="input is-small" v-model.number="L">
        </custom-text-field>
        <custom-text-field :label="`Parapet (ft)`">
				  <input type="text" class="input is-small" v-model.number="Lo">
        </custom-text-field>
       
      </input-group><!-- INPUT-GROUP -->

      <input-group title="LOADS">
       <custom-text-field :label="`Span Load (psf)`">
				  <input type="text" class="input is-small" v-model.number="w">
        </custom-text-field>
        <custom-text-field :label="`Parapet Load (psf)`">
				  <input type="text" class="input is-small" v-model.number="wo">
        </custom-text-field>
        
      </input-group><!-- INPUT-GROUP -->

      <input-group title="PARAMETERS">
        <custom-text-field :label="`Ix (in^4)`">
				  <input type="text" class="input is-small" v-model.number="Ix">
        </custom-text-field>
        <custom-text-field :label="`E (ksi)`">
          <input type="text" class="input is-small" v-model.number="E">
        </custom-text-field>
      </input-group><!-- INPUT-GROUP -->
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- WARNINGS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:warnings>
      {{generateWarnings}}
      <custom-warning-messages :messages="warnings"></custom-warning-messages>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- OUTPUT -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:outputs>
      {{design}}
      <output-values title="FLEXURE" :items="flexure"></output-values>
      <output-values title="SHEAR" :items="shear"></output-values>
      <output-values title="DEFLECTION" :items="deflection"></output-values>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- SPAN LOAD -->
        <rect x="30" y="130" :width="(L)/(L+Lo) * 240" height="10" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
         <!-- PARAPET LOAD -->
        <rect :x="(L)/(L+Lo) * 240 + 30" y="130 " :width="240 - (L)/(L+Lo) * 240" height="10" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1" v-if="wo == w"></rect>
        <rect :x="(L)/(L+Lo) * 240 + 30" :y="130 - 10*w/wo" :width="240 - (L)/(L+Lo) * 240" :height="10+10*w/wo" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1" v-if="wo > w"></rect>
        <rect :x="(L)/(L+Lo) * 240 + 30" :y="130 + 10*(1-wo/w)" :width="240 - (L)/(L+Lo) * 240" :height="10-10*(1-wo/w)" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1" v-else></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT SUPPORT -->
        <circle cx="32.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- LEFT REACTION -->
        <text x="32.5" y="180" text-anchor="middle">{{ formatNumber(RL, 2) }} k</text>
        <!-- RIGHT SUPPORT -->
        <circle :cx="(L)/(L+Lo) * 240 + 30 - 2.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- RIGHT REACTION -->
        <text :x="(L)/(L+Lo) * 240 + 30 - 2.5" y="180" text-anchor="middle">{{ formatNumber(RR,2) }} k</text>
        <!-- DEFLECTION VALUES -->
        <text :x="((L)/(L+Lo) * 240)*0.5 + 30 - 2.5" y="200" text-anchor="middle">{{ formatNumber(Ds,2) }} in</text>
        <text x="290" y="200" text-anchor="end">{{ formatNumber(Dc,2) }} in</text>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT SUPPORT -->
        <circle cx="32.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- RIGHT SUPPORT -->
        <circle :cx="(L)/(L+Lo) * 240 + 30 - 2.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- MOMENT PLOT -->
        <path :d="plotPath(30,150, plotM)" fill="blue" stroke="blue" stroke-width="1" fill-opacity="0.25"/>
        <!-- SPAN MOMENT -->
        <text :x="((xm)/(L+Lo) * 240) + 30 - 2.5" y="140" text-anchor="middle">{{ formatNumber(Ms, 2) }} k-ft</text>
        <!-- CANTILEVER MOMENT -->
        <text :x="(L)/(L+Lo) * 240 + 30 - 2.5" y="180" text-anchor="middle">{{ formatNumber(Mc, 2) }} k-ft</text>
        <!-- MAXIMUM SPAN MOMENT POINT VALUE -->
        <text x="150" y="220" text-anchor="middle" font-size="12">xm = {{ formatNumber(xm, 2) }} ft</text>
        <!-- INFLEXION POINT VALUE -->
        <text x="150" y="240" text-anchor="middle" font-size="12">xc = {{ formatNumber(xc, 2) }} ft</text>
        <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="20">MOMENT DIAGRAM</text>
      </svg>

		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import ParapetWall from '../../classes/analysis/clsParapetWall'
import { decimal } from "../../utils/mathLib"

export default {
  name: "ParapetWall",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 22,
      Lo: 4,
      w: 20,
      wo: 30,
      Ix: 360,
      E: 1800,
      PL: [],
      warnings: [],
      flexure:[],
      shear:[],
      deflection:[],
      //GRAPHICS
      SF: 10,
      Ms: 0,
      Mc: 0,
      xm: 0,
      xc: 0,
      RL: 0,
      RR: 0,
      Ds: 0,
      Dc: 0,
      plotM: []
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
        {type: 'Length', status: this.Lo <= 0, title: "Lo cannot be negative/zero"},
        {type: 'Load', status: this.w < 0, title: "w cannot be negative"},
        {type: 'Load', status: this.wo < 0, title: "wo cannot be negative"},
      ]
    },//GENERATE WARNINGS
    design(){
      let objData = {
        L: this.L,
        Lo: this.Lo,
        E: this.E,
        I: this.Ix, 
        w: this.w/1000, 
        wo: this.wo/1000,
        PL: this.PL
      }

      let obj = new ParapetWall(objData)

      this.flexure = [
        {name:'Ms', value: obj.Mmax(), decimal: 2, unit: 'k-ft'},
        {name:'Mc', value: obj.Mc(), decimal: 2, unit: 'k-ft'},
      ]
      this.shear = [
        {name:'RL', value: obj.RL(), decimal: 2, unit: 'k'},
        {name:'RR', value: obj.RR(), decimal: 2, unit: 'k'},
      ]
      this.deflection = [
        {name:'Ds', value: obj.Dmax(), decimal: 4, unit: 'in'},
        {name:'Dc', value: obj.Dc(), decimal: 4, unit: 'in'},
      ]

      this.Ms = obj.Mmax()
      this.Mc = obj.Mc()
      this.RL = obj.RL()
      this.RR = obj.RR()
      this.Ds = obj.Dmax()
      this.Dc = obj.Dc()
      this.xm = obj.xm()
      this.xc = obj.xc()
      this.plotM = obj.plotM()

      switch(true){
        case (Math.max(Math.abs(this.Ms), Math.abs(this.Mc)) < 10):
          this.SF = 5
          break
        case (Math.max(Math.abs(this.Ms), Math.abs(this.Mc)) < 40):
          this.SF = 1
          break
        case (Math.max(Math.abs(this.Ms), Math.abs(this.Mc)) < 100):
          this.SF = 0.5
          break
        case (Math.max(Math.abs(this.Ms), Math.abs(this.Mc)) > 100):
          this.SF = 0.25
          break
      }
    },//ANALYSIS
  }, //COMPUTED
  methods: {
    formatNumber(num, deci){
      return decimal(num, deci)
    },
    plotPath(x, y, plotArr){
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

</style>