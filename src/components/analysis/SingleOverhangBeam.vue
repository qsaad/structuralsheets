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

      <input-group title="POINT LOADS">
        <label class="label is-small has-text-left has-text-weight-light">P(k) @ a(ft)</label>
        <div class="field has-addons">
          <div class="control">
            <input class="input is-small" type="text" placeholder="P (k)" v-model.number="P">
          </div>
          <div class="control">
            <input class="input is-small" type="text" placeholder="a (ft)" v-model.number="a">
          </div>
          <div class="control">
            <a class="button is-info is-small" @click="addPL" v-if="editedIndex < 0">
              <span class="icon has-text-white">
                <i class="fas fa-plus"></i>
              </span>
            </a>
            <a class="button is-info is-small" @click="updatePL" v-else>
              <span class="icon has-text-white">
                <i class="fas fa-pen"></i>
              </span>
            </a>
          </div>
        </div>
        <div>
          <a class="button is-info is-small" @click="cancelEdit" v-if="editedIndex > 0">
              Cancel Update
          </a>
        </div>
        <div v-for="item in sortedPL">
          <div class="control pb-1 is-flex is-justify-content-space-between is-clickable" >
              <div class="tag is-info-light is-flex is-justify-content-space-evenly" style="min-width: 120px;" @click.prevent="editPL(item)">
                <span> {{ item.P }} k</span>
                <span> @ </span>
                <span> {{ item.a }} ft</span>
              </div>
              <button class="delete is-danger" @click.prevent="deletePL(item)"></button>
          </div>
        </div>
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
         <!-- POINT LOAD -->
        <g v-for="item in PL" >
          <line :x1="30 + (item.a/(L+Lo))*240" y1="105" :x2="30 + (item.a/(L+Lo))*240" y2="125" stroke-width="2" stroke="green"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 - 5" y2="120" stroke-width="2" stroke="green"/>
          <line :x1="30 + (item.a/(L+Lo))*240" y1="125" :x2="30 + (item.a/(L+Lo))*240 + 5" y2="120" stroke-width="2" stroke="green"/>
          <text :x="30 + (item.a/(L+Lo))*240" y="90" text-anchor="middle" font-size="10">{{ formatNumber(item.P, 1)}} k</text>
          <text :x="30 + (item.a/(L+Lo))*240" y="100" text-anchor="middle" font-size="10">{{ formatNumber(item.a, 1)}} ft</text>
        </g>
        <!-- UNIFORM LOAD -->
        <rect x="30" y="130" width="240" height="10" fill="#adc454" stroke="#000" stroke-width="1" fill-opacity="1"></rect>
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
        <!-- DEFLECTION VALUES -->
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
        <!-- MOMENT PLOT -->
        <path :d="plotPath(30,150, plotM)" fill="blue" stroke="blue" stroke-width="1" fill-opacity="0.25"/>
        <!-- SPAN MOMENT -->
        <text :x="((xm)/(L+Lo) * 240) + 30 - 2.5" y="140" text-anchor="middle">{{ formatNumber(flexure[0].value,2) }}</text>
        <!-- CANTILEVER MOMENT -->
        <text :x="(L)/(L+Lo) * 240 + 30 - 2.5" y="180" text-anchor="middle">{{ formatNumber(flexure[1].value,2) }} </text>
        <!-- MAXIMUM SPAN MOMENT POINT VALUE -->
        <text x="150" y="220" text-anchor="middle" font-size="12">xm = {{ xm }} ft</text>
        <!-- INFLEXION POINT VALUE -->
        <text x="150" y="240" text-anchor="middle" font-size="12">xc = {{ xc }} ft</text>
        <!-- TITLE -->
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
      P: 0,
      a: 0,
      PL: [],
      editedPL: {id: 0,P: 0,a: 0},
      editedIndex: -1,
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
        {type: 'Load', status: this.a > this.L + this.Lo, title: "a cannot be greater than L + L"},
        {type: 'Load', status: this.P < 0, title: "P cannot be negative"},
      ]
    },//GENERATE WARNINGS
    design(){
      let objData = {
        L: this.L,
        Lo: this.Lo,
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        PL: this.PL
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
    sortedPL(){
      return this.PL.sort((a,b) => a.a - b.a)
    }//SORTED PL
 
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
    addPL(){
      let id = Math.floor(Math.random() * 10000)
      this.PL.push({id: id, P: this.P, a: this.a})
      this.P = 0
      this.a = 0
    },//ADD PL
    editPL(item){
      this.editedIndex = item.id
      this.editedPL = Object.assign({}, item)
      this.P = this.editedPL.P
      this.a = this.editedPL.a
    },//EDIT PL
    cancelEdit(){
      this.P = 0
      this.a = 0
      this.editedIndex = -1
      this.editedPL = {id: 0, P: 0, a: 0}
    },//CANCEL EDIT
    updatePL(){
      let index = this.PL.findIndex(x => x.id == this.editedIndex)
      this.PL.splice(index, 1, {...this.editedPL, P: this.P, a: this.a})
      this.cancelEdit()
    },//UPDATE PL
    deletePL(item){
      let index = this.PL.findIndex(x => x.id == item.id)
      this.PL.splice(index,1)
    },//DELETE PL
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>

</style>
