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
      
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      {{design}}
      <plot-beam-load
        title = "LOADS"
        type = "Overhang"
        :w = "w"
        :wo = "w"
        :PL = "PL"
        :L = "L"
        :Lo = "Lo"
        :RL = "params.RL"
        :RR = "params.RR"
      ></plot-beam-load>

      <plot-beam-moment
        title = "MOMENT DIAGRAM"
        type = "Overhang"
        :L = "L"
        :Lo = "Lo"
        :plotArr = "params.plotM"
        :ML = "params.ML"
        :MC = "params.MC"
        :MR = "params.MR"
        :xm = "params.xm"
        :xc = "params.xc"
        :xcr = "params.xcr"
      ></plot-beam-moment>

      <plot-beam-deflection
        title = "DEFLECTION DIAGRAM"
        type = "Overhang"
        :L = "L"
        :Lo = "Lo"
        :plotArr = "params.plotD"
        :DL = "params.DL"
        :DC = "params.DC"
        :DL = "params.DR"
        :xd = "params.xd"
      ></plot-beam-deflection>

      <plot-beam-shear
        title = "SHEAR DIAGRAM"
        type = "Overhang"
        :L = "L"
        :Lo = "Lo"
        :plotArr = "params.plotV"
        :VL = "params.VL"
        :VR = "params.VR"
        :VC = "params.VC"
      ></plot-beam-shear>

		</template>
  </module-layout>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"
import PlotBeamLoad from "../plot/PlotBeamLoad.vue"
import PlotBeamMoment from "../plot/PlotBeamMoment.vue"
import PlotBeamShear from "../plot/PlotBeamShear.vue"
import PlotBeamDeflection from "../plot/PlotBeamDeflection.vue"
import SingleOverhangBeam from '../../classes/analysis/clsSingleOverhangBeam'
import { decimal } from "../../utils/mathLib"

export default {
  name: "SingleOverhangBeam",
  components: {
    PlotBeamLoad, PlotBeamMoment, PlotBeamShear, PlotBeamDeflection
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 12,
      Lo: 4,
      w: 1.15,
      Ix: 48,
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
      params: {},
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

      this.params = obj.params()

    },//ANALYSIS
    sortedPL(){
      return this.PL.sort((a,b) => a.a - b.a)
    }//SORTED PL
 
  }, //COMPUTED
  methods: {
    formatNumber(num, deci){
      return decimal(num, deci)
    },//FORMAT NUMBER
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
