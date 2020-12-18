<template>
  <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      SINGLE OVERHANG BEAM
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!--INPUTS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:inputs>
      <input-group title="PARAMETERS">
        <custom-text-field :label="`Span (ft)`">
				  <input type="text" class="input is-small" v-model.number="L">
        </custom-text-field>
        <custom-text-field :label="`Overhang (ft)`">
				  <input type="text" class="input is-small" v-model.number="Lo">
        </custom-text-field>
        <custom-text-field :label="`Load (k/ft)`">
				  <input type="text" class="input is-small" v-model.number="w">
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
        <!-- UNIFORM LOAD -->
        <rect x="30" :y="130-w*SF" width="240" :height="10+w*SF" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT SUPPORT -->
        <circle cx="32.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- LEFT REACTION -->
        <text x="32.5" y="180" text-anchor="middle">{{ formatNumber(shear[0].value, 2) }} k</text>
        <!-- RIGHT SUPPORT -->
        <circle :cx="(L)/(L+Lo) * 240 + 30 - 2.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <!-- RIGHT REACTION -->
        <text :x="(L)/(L+Lo) * 240 + 30 - 2.5" y="180" text-anchor="middle">{{ formatNumber(shear[1].value,2) }} k</text>
        
        <!-- MOMENT -->
        <!-- <text x="150" y="180" text-anchor="middle">M = {{(flexure[0].value).toFixed(2)}} k-ft</text> -->
        <!-- DEFLECTION -->
        <text :x="((L)/(L+Lo) * 240)*0.5 + 30 - 2.5" y="200" text-anchor="middle">{{(deflection[0].value).toFixed(2)}} in</text>
        <text x="290" y="200" text-anchor="end">{{(deflection[0].value).toFixed(2)}} in</text>
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

        <!-- LEFT DIAGONAL -->
        <line x1="30"  y1="150" :x2="xm/(L+Lo) * 240 + 30"   :y2="150 + Ms*SF" stroke-width="2" stroke="blue"/>
         <!-- MIDDLE DIAGONAL -->
        <line :x1="xm/(L+Lo) * 240 + 30"  :y1="150 + Ms*SF" :x2="(L)/(L+Lo) * 240 + 30"   :y2="150 - Mc*SF" stroke-width="2" stroke="blue"/>
        <!-- RIGHT DIAGONAL -->
        <line :x1="(L)/(L+Lo) * 240 + 30"  :y1="150 - Mc*SF" x2="270"   y2="150" stroke-width="2" stroke="blue"/>
        <!-- SPAN MOMENT -->
        <text :x="((xm)/(L+Lo) * 240) + 30 - 2.5" y="140" text-anchor="middle">{{ formatNumber(flexure[0].value,2) }}</text>
        <!-- CANTILEVER MOMENT -->
        <text :x="(L)/(L+Lo) * 240 + 30 - 2.5" y="180" text-anchor="middle">{{ formatNumber(flexure[1].value,2) }} </text>

        <text x="150" y="220" text-anchor="middle" font-size="12">xm = {{ xm }} ft</text>
        <text x="150" y="240" text-anchor="middle" font-size="12">xc = {{ xc }} ft</text>
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="20">MOMENT (k-ft)</text>
      </svg>

      
		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import SingleOverhangBeam from '../../classes/analysis/clsSingleOverhangBeam'
import { decimal } from "../../utils/mathLib"

export default {
  name: "SingleOverhangBeam",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 12,
      Lo: 4,
      w: 1,
      Ix: 100,
      E: 29000,
      P : [],
      a : [],
      warning: [],
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
      Dc: 0
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
        {type: 'Load', status: this.w < 0, title: "w cannot be negative"},
      ]
    },//GENERATE WARNINGS
    design(){
      let objData = {
        L: this.L,
        Lo: this.Lo,
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        P: this.P,
        a: this.a
      }

      let obj = new SingleOverhangBeam(objData)

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

      this.Ms = decimal(obj.Mmax(),2)
      this.Mc = decimal(obj.Mc(),2)
      this.RL = decimal(obj.RL(),2)
      this.RR = decimal(obj.RR(),2)
      this.Ds = decimal(obj.Dmax(),4)
      this.Dc = decimal(obj.Dc(),4)
      this.xm = decimal(obj.xm(),2)
      this.xc = decimal(obj.xc(),2)

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
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>

</style>
