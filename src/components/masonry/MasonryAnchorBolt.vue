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
          <select v-model="anchorBoltDia">
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
      <!-- ++++++++++++++++++++++++++ -->
      <!-- SIDE VIEW -->
      <!-- ++++++++++++++++++++++++++ -->
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- X AXIS -->
        <!-- <line x1="0"  y1="150" x2="300"   y2="150" stroke-width="1" style="stroke:#006600;"/> -->
        <!-- Y AXIS -->
        <!-- <line x1="150"  y1="0" x2="150"   y2="300" stroke-width="1" style="stroke:#006600;"/> -->
        <!-- X GRID LINES -->
        <!-- <line x1="0"  :y1="i*10" x2="300"   :y2="i*10" stroke-width="1" style="stroke:#e6f5ea;" v-for="i in 30"/> -->
        <!-- Y GRID LINES -->
        <!-- <line :x1="i*10"  y1="0" :x2="i*10"   y2="300" stroke-width="1" style="stroke:#e6f5ea;" v-for="i in 30"/> -->
       
        <!-- HATCH PATTERN -->
        <pattern id="diagonalHatch" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke-width="1" stroke="black"/>
          <line x1="0" y1="0" x2="20" y2="0" stroke-width="1" stroke="black"/>
        </pattern>
        <!-- BLOCK WALL -->
        <rect x="10" :y="150 - t/2*SF" width="280" :height="t*SF" fill="url(#diagonalHatch)" stroke="#000" stroke-width="2" fill-opacity="0.2"></rect>
        <!-- PULL OUT CONE -->
        <circle cx="150" :cy="150 + t/2*SF - lbe*SF" :r="lb*SF" stroke="blue" stroke-width="1" stroke-dasharray="10 5" fill="yellow" fill-opacity="0.2" />
        <!-- ANCHOR -->
        <circle cx="150" :cy="150 + t/2*SF - lbe*SF" :r="da*SF" stroke="black" stroke-width="1"  fill="black" fill-opacity="1" />
        <!-- SHEAR ARROW -->
        <line x1="150"  y1="10" x2="150"   y2="80" stroke-width="3" stroke="black"/>
        <line x1="150"  y1="80" x2="140"   y2="70" stroke-width="3" stroke="black"/>
        <line x1="150"  y1="80" x2="160"   y2="70" stroke-width="3" stroke="black"/>
        <text x="160" y="40">V = {{V}} k</text>
        <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="30">TOP VIEW</text>
      </svg>
      <!-- ++++++++++++++++++++++++++ -->
      <!-- TOP VIEW -->
      <!-- ++++++++++++++++++++++++++ -->
       <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
        <!-- BORDER -->
        <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
        <!-- X AXIS -->
        <!-- <line x1="0"  y1="150" x2="300"   y2="150" stroke-width="1" style="stroke:#006600;"/> -->
        <!-- Y AXIS -->
        <!-- <line x1="150"  y1="0" x2="150"   y2="300" stroke-width="1" style="stroke:#006600;"/> -->
        <!-- X GRID LINES -->
        <!-- <line x1="0"  :y1="i*10" x2="300"   :y2="i*10" stroke-width="1" style="stroke:#e6f5ea;" v-for="i in 30"/> -->
        <!-- Y GRID LINES -->
        <!-- <line :x1="i*10"  y1="0" :x2="i*10"   y2="300" stroke-width="1" style="stroke:#e6f5ea;" v-for="i in 30"/> -->
       
        <!-- HATCH PATTERN -->
        <pattern id="diagonalHatch" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="20" stroke-width="1" stroke="black"/>
          <line x1="0" y1="0" x2="20" y2="0" stroke-width="1" stroke="black"/>
        </pattern>
        <!-- BLOCK WALL -->
        <rect :x="150 - t/2*SF" y="80" :width="t*SF" height="150" fill="url(#diagonalHatch)" stroke="#000" stroke-width="2" fill-opacity="0.2"></rect>
        <!-- ANCHOR -->
        <line :x1="150 - t/2*SF + lbe*SF"  y1="75" :x2="150 - t/2*SF + lbe*SF"   :y2="80 + lb*SF" :stroke-width="da*SF" stroke="black"/>
        <!-- SHEAR ARROW -->
        <line x1="10"  y1="80" x2="100"  y2="80" stroke-width="3" stroke="black"/>
        <line x1="10"  y1="80" x2="20"   y2="90" stroke-width="3" stroke="black"/>
        <line x1="10"  y1="80" x2="20"   y2="70" stroke-width="3" stroke="black"/>
        <text x="10" y="60">V = {{V}} k</text>
        <!-- TENSION ARROW -->
        <line x1="150"  y1="10" x2="150"  y2="60" stroke-width="3" stroke="black"/>
        <line x1="150"  y1="10" x2="140"   y2="20" stroke-width="3" stroke="black"/>
        <line x1="150"  y1="10" x2="160"   y2="20" stroke-width="3" stroke="black"/>
        <text x="170" y="30">T = {{T}} k</text>
        <!-- TITLE -->
        <text x="150" y="280" text-anchor="middle" stroke-width="3" font-size="30">SIDE VIEW</text>
        
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
      da: this.diameter(this.anchorBoltDia),
      t: this.thickness - 0.375,
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
      SF: 10
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
      //NEED FOR GRAPHICS
      this.da = this.diameter(this.anchorBoltDia)
      this.t =  this.thickness - 0.375

      let objData = {
        method: this.method,
        fm: this.fm,
        thickness: this.thickness,
        Fya: this.Fya,
        da: this.diameter(this.anchorBoltDia),
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
    diameter(size){
      let numArr = size.split("/")
      return numArr.length == 2 ? parseFloat(numArr[0])/parseFloat(numArr[1]) : 1
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  
</style>