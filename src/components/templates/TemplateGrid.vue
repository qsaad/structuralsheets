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
            <custom-text-field label="w (k/ft)">
              <input type="text" v-model="w" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-select :label="`Level`">
              <select v-model="level">
                <option v-for="item in levelList">{{ item }}</option>
              </select>
            </custom-select>
           
          </input-group><!-- INPUT-GROUP -->

          <input-group title="PARAMETERS">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </input-group><!-- INPUT-GROUP -->

          <input-group title="PARAMETERS">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </input-group><!-- INPUT-GROUP -->

          <input-group title="PARAMETERS">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
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
      <output-values title="STRENGTH" :items="output1"></output-values>
      <output-values title="STRENGTH" :items="output1"></output-values>
      <output-checks title="STRESSES" :items="checks"></output-checks>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- CALCULATIONS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:calculations>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      <calculation-group title="STRENGTH" :items="output1"></calculation-group>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 10">
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <rect :x="50 + 40*i" :y="50 " :width="L" :height="L" fill="#dd6" v-for="i in 4"  stroke="#000" stroke-width="1"></rect>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 20">
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 30">
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
      </svg>
		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

export default {
  name: "TemplateGrid",
  components: {
    
  },
  mixins: [layoutMixin],
  data() {
    return {
      warnings: [],
      showCalculation: true,
      showGraphics: true,
      w: 1,
      L: 20,
      K: 'L3 1/2x3 1/2x5/16',
      levelList:['HSS8x8x5/16', 'HSS6x6x5/16', 'HSS4x4x5/16', 'HSS2x2x5/16'],
      level:'HSS8x8x5/16',

      M: 100,
      V: 30,
      D: 0.234,
      output1:[],
      checks:[]
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {
   
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
      ]
    },//GENERATE WARNINGS
    design(){
      let M = this.w*this.L*this.L/8
      let V = this.w*this.L/2
      this.output1 = [
        {name:'&phi;M<sub>nx</sub>', value: M, decimal: 0, unit: 'k-ft'},
        {name:'Vnx', value: V, decimal: 0, unit: 'k'},
        {name:'Dx', value: 0.34, decimal: 2, unit: 'in'},
        {name:'Dy', value: 0.55, decimal: 2, unit: 'in'}
      ]
      this.checks = [
        {name:'Mnx', actual: 200, allowable: 220, decimal: 0, unit: 'k-ft'},
        {name:'Vnx', actual: 40, allowable: 35, decimal: 0, unit: 'k'},
        {name:'Dx', actual: 0.34, allowable: 0.50, decimal: 2, unit: 'in'},
        {name:'Dy', actual: 0.68, allowable: 0.55, decimal: 2, unit: 'in'}
      ]


    },//DESIGN
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>

</style>