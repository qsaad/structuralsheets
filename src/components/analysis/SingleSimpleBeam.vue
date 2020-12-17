<template>
  <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      MODULE NAME
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
    <!-- CALCULATIONS -->
    <!-- ++++++++++++++++++++++++++ -->
    <!-- <template v-slot:calculations>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
		</template> -->
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        
         <rect x="30" :y="130-w*SF" width="240" :height="10+w*SF" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
        <!-- BEAM SPAN -->
        <line x1="30"  y1="150" x2="270"   y2="150" stroke-width="3" stroke="black"/>
        <!-- LEFT SUPPORT -->
        <circle cx="32.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <text x="32.5" y="180" text-anchor="middle">{{(shear[0].value).toFixed(2)}} k</text>
        <!-- RIGHT SUPPORT -->
        <circle cx="267.5" cy="157" :r="5" stroke="black" fill="black" stroke-width="1"/>
        <text x="267.5" y="180" text-anchor="middle">{{(shear[0].value).toFixed(2)}} k</text>
         <!-- MOMENT -->
        <text x="150" y="180" text-anchor="middle">M = {{(flexure[0].value).toFixed(2)}} k-ft</text>

        <text x="150" y="200" text-anchor="middle">&delta; = {{(deflection[0].value).toFixed(4)}} in</text>

      </svg>

      
		</template>
  </module-layout>

  
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import SimpleBeam from '../../classes/analysis/clsSimpleBeam'

export default {
  name: "SingleSimpleBeam",
  components: {
   
  },
  mixins: [layoutMixin],
  data () {
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
      SF: 10
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

      let obj = new SimpleBeam(objData)

      this.flexure = [
        {name:'M', value: obj.Mmax(), decimal: 2, unit: 'k-ft'},
      ]
      this.shear = [
        {name:'V', value: obj.Vmax(), decimal: 2, unit: 'k'},
      ]
      this.deflection = [
        {name:'D', value: obj.Dmax(), decimal: 4, unit: 'in'},
      ]

      // return {
      //   M: obj.Mmax().toFixed(2),
      //   V: obj.Vmax().toFixed(2),
      //   D: obj.Dmax().toFixed(4),
      //   Mx: obj.plotM()
      // }
    },//ANALYSIS
  }, //COMPUTED
  methods: {
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>