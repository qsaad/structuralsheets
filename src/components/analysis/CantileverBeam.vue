<template>
   <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      CANTILEVER BEA
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
        <!-- UNIFORM LOAD -->
        <rect x="30" :y="130-w*SF" width="240" :height="10+w*SF" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- RIGHT SUPPORT -->
        <line x1="270"  y1="143" x2="270"   y2="157" stroke-width="5" stroke="black"/>
        <!-- REACTION VALUE -->
        <text x="290" y="180" text-anchor="end">{{(shear[0].value).toFixed(2)}} k</text>
        <!-- DEFLECTION VALUE -->
        <text x="10" y="180" text-anchor="start">&delta; = {{(deflection[0].value).toFixed(4)}} in</text>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- SVG BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- RIGHT SUPPORT -->
        <line x1="270"  y1="143" x2="270"   y2="157" stroke-width="5" stroke="black"/>
        <!-- MOMENT DIAGONAL -->
        <line x1="30"  y1="150" x2="270"   :y2="150 + Mc*SF" stroke-width="3" stroke="blue"/>
        <!-- MOMENT VERTICAL -->
        <line x1="270"  :y1="150 + Mc*SF" x2="270"   y2="150" stroke-width="3" stroke="blue"/>
        <!-- MOMENT VALUE -->
        <text x="290" y="200" text-anchor="end">{{formatNumber(flexure[0].value,2) }} </text>
         <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="20">MOMENTS (k-ft)</text>
        
      </svg>
		</template>
  </module-layout>

</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import CantileverBeam from '../../classes/analysis/clsCantileverBeam'
import { decimal } from "../../utils/mathLib";

export default {
  name: "cantilever-beam",
  components: {
  
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 6,
      w: 0.25,
      Ix: 100,
      E: 29000,
      P: [],
      a: [],
      warning: [],
      flexure:[],
      shear:[],
      deflection:[],
      //GRAPHICS
      SF: 10,
      Mc: 0
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

      let obj = new CantileverBeam(objData)

      this.flexure = [
        {name:'M', value: obj.Mmax(), decimal: 2, unit: 'k-ft'},
      ]
      this.shear = [
        {name:'V', value: obj.Vmax(), decimal: 2, unit: 'k'},
      ]
      this.deflection = [
        {name:'D', value: obj.Dmax(), decimal: 4, unit: 'in'},
      ]

      this.Mc = obj.Mmax()

      switch(true){
        case Math.abs(this.Mc) < 10:
          this.SF = 5
          break
        case Math.abs(this.Mc) < 40:
          this.SF = 1
          break
        case Math.abs(this.Mc) < 100:
          this.SF = 0.5
          break
        case Math.abs(this.Mc) > 100:
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
