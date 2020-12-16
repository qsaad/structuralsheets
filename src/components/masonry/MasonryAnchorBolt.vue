<template>
   <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      MASONRY ANCHOR BOLT
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!--INPUTS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:inputs>
      <input-group title="LOADS">
        <custom-text-field label="V (lb)">
          <input type="text" v-model.number="V" class="input is-small">
        </custom-text-field>
        <custom-text-field label="T (lb)">
          <input type="text" v-model.number="T" class="input is-small">
        </custom-text-field>
      </input-group><!-- INPUT-GROUP -->

      <input-group title="PARAMETERS">
        <custom-select :label="`Method`">
          <select v-model.number="method">
            <option v-for="(item, i) in methodList" :key="i">{{ item }}</option>
          </select>
			  </custom-select>
        <custom-select :label="`Thickness (in)`">
          <select v-model.number="thickness">
            <option v-for="(item, i) in thicknessList" :key="i">{{ item }}</option>
          </select>
			  </custom-select>
        <custom-text-field :label="`fm (psi)`">
          <input v-model.number="fm" class="input is-small">
        </custom-text-field>
      </input-group><!-- INPUT-GROUP -->

      <input-group title="ANCHOR">
         <custom-select :label="`Dia (in)`">
          <select v-model.number="anchorBoltDia">
            <option v-for="(item, i) in anchorBoltDiaList" :key="i">{{ item }}</option>
          </select>
			  </custom-select>
        <custom-text-field label="Embed (in)">
          <input type="text" v-model="lb" class="input is-small">
        </custom-text-field>
        <custom-text-field label="Fya (ksi)">
          <input type="text" v-model="Fya" class="input is-small">
        </custom-text-field>
      </input-group><!-- INPUT-GROUP -->

      <input-group title="LAYOUT">
        <custom-select :label="`Location`">
          <select v-model.number="location">
            <option v-for="(item, i) in locationList" :key="i">{{ item }}</option>
          </select>
			  </custom-select>
        <custom-text-field label="Edge Dist (in)">
          <input type="text" v-model="lbe" class="input is-small">
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
      <output-values title="STRENGTH" :items="outputs"></output-values>
      <output-checks title="CHECK" :items="checks"></output-checks>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- CALCULATIONS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:calculations>
      <calculation-group title="TENSION AREA" :items="tensionAreas"></calculation-group>
      <calculation-group title="TENSION PARAMS" :items="tensionParams"></calculation-group>
      <calculation-group title="SHEAR AREAS" :items="shearAreas"></calculation-group>
      <calculation-group title="SHEAR PARAMS" :items="shearParams"></calculation-group>
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
      </svg>
		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"
import {masonryMixin} from "../../mixins/masonryMixin"

import MasonryAnchorBolt from '../../classes/masonry/clsMasonryAnchorBolt'

import {clamp, decimal} from '../../utils/mathLib'

export default {
  name: "MasonryAnchorBolt",
  components: {
   
  },
  mixins: [layoutMixin, masonryMixin],
  data() {
    return {
      V: 100,
      T: 100,
      lb: 4,
      lbe: 3.8125,
      locationList: ['Top', 'Side'],
      location: 'Top',
      Fya: 36,
      outputs: [],
      checks:[],
      tensionParams: [],
      tensionAreas: [],
      shearParams: [],  
      shearAreas: [],
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Load', status: this.V < 0, title: "V cannot be negative"},
        {type: 'Load', status: this.T < 0, title: "T cannot be negative"},
        {type: 'Layout', status: this.lb < 0, title: "Embed cannot be negative"},
        {type: 'Layout', status: this.lbe < 0, title: "Edge Dist cannot be negative"},
      ]
    },//GENERATE WARNINGS
    design(){
      let objData = {
        method: this.method,
        fm: this.fm,
        thickness: this.thickness,
        Fya: this.Fya,
        da: this.anchorSize(this.anchorBoltDia).db,
        location: this.location,
        lb: this.lb,
        lbe: this.lbe,
      }

      let obj = new MasonryAnchorBolt(objData)

      this.outputs = [
        {name:'V', value: obj.V(), decimal: 0, unit: 'lb'},
        {name:'T', value: obj.T(), decimal: 0, unit: 'lb'},
      ]

      this.checks = [
        {name:'V', actual: this.V, allowable: obj.V(), decimal: 0, unit: 'lb'},
        {name:'T', actual: this.T, allowable: obj.T(), decimal: 0, unit: 'lb'},
      ]

      this.tensionParams = [
        {name:'X', value: obj.X, decimal: 3, unit: 'in'},
        {name:'&theta;', value: obj.theta, decimal: 2, unit: '&deg;'},
        {name:'B<sub>ab</sub>', value: obj.Bab(), decimal: 0, unit: 'lb'},
        {name:'B<sub>as</sub>', value: obj.Bas(), decimal: 0, unit: 'lb'},
      ]
      this.tensionAreas = [
        {name:'A<sub>b</sub>', value: obj.Ab(), decimal: 3, unit: 'in<sup>2</sup>'},
        {name:'A<sub>pt</sub>', value: obj.Apt(), decimal: 3, unit: 'in<sup>2</sup>'},
      ]

      this.shearParams = [
        {name:'B<sub>vb</sub>', value: obj.Bvb(), decimal: 0, unit: 'lb'},
        {name:'B<sub>vc</sub>', value: obj.Bvc(), decimal: 0, unit: 'lb'},
        {name:'B<sub>vp</sub>', value: obj.Bvp(), decimal: 0, unit: 'lb'},
        {name:'B<sub>vs</sub>', value: obj.Bvs(), decimal: 0, unit: 'lb'},
      ]
      this.shearAreas = [
        {name:'A<sub>b</sub>', value: obj.Ab(), decimal: 3, unit: 'in<sup>2</sup>'},
        {name:'A<sub>pv</sub>', value: obj.Apv(), decimal: 3, unit: 'in<sup>2</sup>'},
        {name:'A<sub>pt</sub>', value: obj.Aptv(), decimal: 3, unit: 'in<sup>2</sup>'},
      ]
    },// DESIGN
  }, //COMPUTED
  methods: {
  
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  
</style>