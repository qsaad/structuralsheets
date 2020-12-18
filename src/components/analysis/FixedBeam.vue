<template>
  <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      FIXED BEAM
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!--INPUTS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:inputs>
      <input-group title="PARAMETERS">
        <custom-text-field :label="`Span (ft)`">
				  <input type="text" class="input is-small" v-model.number="L">
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
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- UNIFORM LOA -->
        <rect x="30" :y="130-w*SF" width="240" :height="10+w*SF" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT SUPPORT -->
        <circle cx="32.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <text x="32.5" y="180" text-anchor="middle">{{(shear[0].value).toFixed(2)}} k</text>
        <!-- RIGHT SUPPORT -->
        <circle cx="267.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <text x="267.5" y="180" text-anchor="middle">{{(shear[1].value).toFixed(2)}} k</text>
        <!-- DEFLECTION -->
        <text x="150" y="200" text-anchor="middle">&delta; = {{(deflection[0].value).toFixed(4)}} in</text>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT VERTICAL -->
        <line x1="30"  y1="150" x2="30"   :y2="150 + Mend*SF" stroke-width="2" stroke="blue"/>
        <!-- LEFT SLOPE -->
        <line x1="30"  :y1="150 + Mend*SF"  x2="150"   :y2="150 + Ms*SF" stroke-width="2" stroke="blue"/>
        <!-- RIGHT VERTICAL -->
        <line x1="270"  y1="150" x2="270"   :y2="150 + Mend*SF" stroke-width="2" stroke="blue"/>  
        <!-- RIGHT SLOPE -->
        <line x1="270"  :y1="150 + Mend*SF" x2="150"   :y2="150 + Ms*SF" stroke-width="2" stroke="blue"/> 
        <!-- LEFT MOMENT -->
        <text x="10" y="180" text-anchor="start">{{ formatNumber(flexure[1].value,2) }} </text>
        <!-- SPAN MOMENT -->
        <text x="150" y="140" text-anchor="middle">{{ formatNumber(flexure[0].value,2) }} </text>
        <!-- RIGHT MOMENT -->
        <text x="290" y="180" text-anchor="end">{{ formatNumber(flexure[2].value,2) }} </text>
        <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="20">MOMENTS (k-ft)</text>
      </svg>

		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import FixedBeam from '../../classes/analysis/clsFixedBeam'
import { decimal } from "../../utils/mathLib";


export default {
  name: "FixedBeam",
  components: {
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 12,
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
      SF: 2,
      Ms: 0,
      V: 0,
      D: 0,
      Mend: 0
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
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        P: this.P,
        a: this.a
      }

      let obj = new FixedBeam(objData)

      //VALUES FOR OUTPUT
      this.flexure = [
        {name:'Ms', value: obj.Mmax(), decimal: 2, unit: 'k-ft'},
        {name:'ML', value: Math.abs(obj.ML()), decimal: 2, unit: 'k-ft'},
        {name:'MR', value: Math.abs(obj.MR()), decimal: 2, unit: 'k-ft'},
      ]
      this.shear = [
        {name:'RL', value: obj.RL(), decimal: 2, unit: 'k'},
        {name:'RR', value: obj.RR(), decimal: 2, unit: 'k'},
      ]
      this.deflection = [
        {name:'D', value: obj.Dmax(), decimal: 4, unit: 'in'},
      ]

      //VALUE FOR GRAPHICS
      
      this.Ms = obj.Mmax().toFixed(2)
      this.V = obj.Vmax().toFixed(2)
      this.D = obj.Dmax().toFixed(4)
      this.Mend = obj.ML()

      switch(true){
        case Math.abs(this.Mend) < 10:
          this.SF = 5
          break
        case Math.abs(this.Mend) < 40:
          this.SF = 1
          break
        case Math.abs(this.Mend) < 100:
          this.SF = 0.5
          break
        case Math.abs(this.Mend) > 100:
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
