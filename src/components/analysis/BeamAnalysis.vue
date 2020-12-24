<template>
  <module-layout>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- HEADER -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:header>
      BEAM ANALYSIS
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!--INPUTS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:inputs>
      <input-group title="GEOMETRY">
        <custom-select :label="`Type`">
          <select v-model="type">
            <option v-for="(item, i) in typeList" :key="i">{{ item }}</option>
          </select>
        </custom-select>
        <custom-text-field :label="`Span (ft)`">
				  <input type="text" class="input is-small" v-model.number="L">
        </custom-text-field>
        <custom-text-field :label="`Parapet (ft)`" v-if="type == 'Overhang'">
				  <input type="text" class="input is-small" v-model.number="Lo">
        </custom-text-field>
      </input-group><!-- INPUT-GROUP -->

      <input-group title="UNIFORM LOADS">
       <custom-text-field :label="`Span Load (k/ft)`">
				  <input type="text" class="input is-small" v-model.number="w">
        </custom-text-field>
        <custom-text-field :label="`Overhang Load (k/ft)`" v-if="type == 'Overhang'">
				  <input type="text" class="input is-small" v-model.number="wo">
        </custom-text-field>
        <custom-text-field :label="`Lub Top Flg (ft)`">
				  <input type="text" class="input is-small" v-model="Lub_TF">
        </custom-text-field>
        <custom-text-field :label="`Lub Bot Flg (ft)`">
				  <input type="text" class="input is-small" v-model="Lub_BF">
        </custom-text-field>
        <custom-text-field :label="`Lub Shear (ft)`">
				  <input type="text" class="input is-small" v-model="Lub_V">
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

      <input-group title="PROPERTIES">
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
      
      <!-- <output-values title="FLEXURE" :items="flexure"></output-values>
      <output-values title="SHEAR" :items="shear"></output-values>
      <output-values title="DEFLECTION" :items="deflection"></output-values> -->
		</template>
    <!-- ++++++++++++++++++++++++++ -->
    <!-- GRAPHICS -->
    <!-- ++++++++++++++++++++++++++ -->
    <template v-slot:graphics>
      {{design}}
      <plot-beam-load
        title = "LOADS"
        :type = "type"
        :w = "w"
        :wo = "wo"
        :PL = "PL"
        :L = "L"
        :Lo = "Lc"
        :RL = "params.RL"
        :RR = "params.RR"
      ></plot-beam-load>

       <plot-beam-moment
        title = "MOMENT"
        :type = "type"
        :L = "L"
        :Lo = "Lc"
        :plotArr = "params.plotM"
        :ML = "params.ML"
        :MC = "params.MC"
        :MR = "params.MR"
        :xm = "params.xm"
        :xc = "params.xc"
        :xcr = "params.xcr"
        :capArrTop = "capArrTop"
        :capArrBot = "capArrBot"
      ></plot-beam-moment>

      <plot-beam-deflection
        title = "DEFLECTION"
        :type = "type"
        :L = "L"
        :Lo = "Lc"
        :plotArr = "params.plotD"
        :DL = "params.DL"
        :DC = "params.DC"
        :DR = "params.DR"
        :xd = "params.xd"
      ></plot-beam-deflection>

      <plot-beam-shear
        title = "SHEAR"
        :type = "type"
        :L = "L"
        :Lo = "Lc"
        :plotArr = "params.plotV"
        :VL = "params.VL"
        :VR = "params.VR"
        :VC = "params.VC"
        :capArrShear = "capArrShear"
      ></plot-beam-shear>

    
		</template>
  </module-layout>
</template>

<script>
import {zipWith, map, split, toNumber} from 'lodash'
import layoutMixin from "../../mixins/layoutMixin"

import PlotBeamLoad from "../plot/PlotBeamLoad.vue"
import PlotBeamMoment from "../plot/PlotBeamMoment.vue"
import PlotBeamShear from "../plot/PlotBeamShear.vue"
import PlotBeamDeflection from "../plot/PlotBeamDeflection.vue"

import SimpleBeam from '../../classes/analysis/clsSimpleBeam'
import CantileverBeam from '../../classes/analysis/clsCantileverBeam'
import FixedBeam from '../../classes/analysis/clsFixedBeam'
import ProppedBeam from '../../classes/analysis/clsProppedBeam'
import SingleOverhangBeam from '../../classes/analysis/clsSingleOverhangBeam'

import { decimal } from "../../utils/mathLib"

export default {
  name: "ParapetWall",
  components: {
    PlotBeamLoad, PlotBeamMoment, PlotBeamShear, PlotBeamDeflection
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 12,
      Lo: 4,
      w: 1,
      wo: 1,
      Ix: 48,
      E: 29000,
      P: 0,
      a: 0,
      PL: [],
      editedPL: {id: 0,P: 0,a: 0},
      editedIndex: -1,
      typeList: ['Simple', 'Cantilever','Propped','Fixed','Overhang'],
      type: 'Simple',
      warnings: [],
      //GRAPHICS
      params: {},
      //CAPACITY
      Lub_TF: [],
      capArrBot:[],
      Lub_BF: [],
      capArrTop: [],
      Lub_V: [],
      capArrShear:[]
    }; //RETURN
  }, //DATA
  created() {
    // this.Lub_V = [2,4,4,2,4]
    //this.Lub_TF = [2,4,6,4]
    // this.Lub_BF  =[4,8,4]

    this.Lub_V = []
    this.Lub_TF = []
    this.Lub_BF  =[]

  }, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
        {type: 'Length', status: this.Lo <= 0, title: "Lo cannot be negative/zero"},
        {type: 'Load', status: this.w < 0, title: "w cannot be negative"},
        {type: 'Load', status: this.wo < 0, title: "wo cannot be negative"},
        {type: 'Length', status: this.checkUnbracedLengthSum(this.Lub_V), title: "Sum of Shear unbraced Lengths must be equal to Total Beam Span"},
        {type: 'Length', status: this.checkUnbracedLengthSum(this.Lub_TF), title: "Sum of Top Flg unbraced Lengths must be equal to Total Beam Span"},
        {type: 'Length', status: this.checkUnbracedLengthSum(this.Lub_BF), title: "Sum of Bot Flg unbraced Lengths must be equal to Total Beam Span"},
      ]
    },//GENERATE WARNINGS
    Lc(){
      return this.type == "Overhang" ? this.Lo : 0
    },
   
    design(){
      let objData = {
        L: this.L,
        Lo: this.Lc,
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        wo: this.wo,
        PL: this.PL
      }

      let obj = {}

      switch(true){
        case (this.type == 'Cantilever'):
          obj = new CantileverBeam(objData)
          break
        case (this.type == 'Fixed'):
          obj = new FixedBeam(objData)
          break
        case (this.type == 'Overhang'):
          obj = new SingleOverhangBeam(objData)
          break
        case (this.type == 'Propped'):
          obj = new ProppedBeam(objData)
          break
        case (this.type == 'Simple'):
          obj = new SimpleBeam(objData)
          break
      }

      //MEMBER ANALYSIS PARAMETERS
      this.params = obj.params()

      //-----------------------------------------
      //POSTIVE BENDING MEMBER CAPACITY
      //------------------------------------------
      //1. CONVERT UNBRACED LENGTH STRING TO ARRAY
      let Lub_TF_Arr = map(split(this.Lub_TF,','), (x) => toNumber(x))
      //2. TYPE OF UNBRACED LENGTH
      if(Lub_TF_Arr.length == 1){
        //UNIFORM UNBRACED LENGTH
        if(Lub_TF_Arr[0] < this.L && Lub_TF_Arr[0] > 0){
          //3. DETERMINE MEMBER CAPACITY
          let Mcu = Math.random()*100
          //4. CREATE PLOT ARRAY
          this.capArrBot = [
            {Lc: 0, Mc: Mcu},
            {Lc: this.L, Mc: Mcu}
          ]
        }
        //FULLY BRACED
        else{
          //3. DETERMINE MEMBER CAPACITY
          let Mcb = Math.random()*10
          //4. CREATE PLOT ARRAY
          this.capArrBot = [
            {Lc: 0, Mc: Mcb},
            {Lc: this.L, Mc: Mcb}
          ]
        }
      }
      //MULTIPLE UNBRACED LENGTH
      else{
        //3. DETERMINE MEMBER CAPACITY ARRAY
        let Mc_BF_Arr = Lub_TF_Arr.map(item => Math.random()*100)
        //3. COMBINE ARRAY FOR CAPACITY AND UNBRACED LENGTH
        this.capArrBot = zipWith(Lub_TF_Arr, Mc_BF_Arr,(Li, Mi)=>{
              return {Lc: Li, Mc: Mi}
        })
      }

      //-----------------------------------------
      //NEGATIVE BENDING MEMBER CAPACITY
      //------------------------------------------
       //1. CONVERT UNBRACED LENGTH STRING TO ARRAY
      let Lub_BF_Arr = map(split(this.Lub_BF,','), (x) => toNumber(x))
      //2. TYPE OF UNBRACED LENGTH
      if(Lub_BF_Arr.length == 1){
        //UNIFORM UNBRACED LENGTH
        if(Lub_BF_Arr[0] < this.L && Lub_BF_Arr[0] > 0){
          //3. DETERMINE MEMBER CAPACITY
          let Mcu = Math.random()*100
          //4. CREATE PLOT ARRAY
          this.capArrTop = [
            {Lc: 0, Mc: Mcu},
            {Lc: this.L, Mc: Mcu}
          ]
        }
        //FULLY BRACED
        else{
          //3. DETERMINE MEMBER CAPACITY
          let Mcb = Math.random()*10
          //4. CREATE PLOT ARRAY
          this.capArrTop = [
            {Lc: 0, Mc: Mcb},
            {Lc: this.L, Mc: Mcb}
          ]
        }
      }
      //MULTIPLE UNBRACED LENGTH
      else{
        //3. DETERMINE MEMBER CAPACITY ARRAY
        let Mc_TF_Arr = Lub_BF_Arr.map(item => Math.random()*100)
        //3. COMBINE ARRAY FOR CAPACITY AND UNBRACED LENGTH
        this.capArrTop = zipWith(Lub_BF_Arr, Mc_TF_Arr,(Li, Mi)=>{
              return {Lc: Li, Mc: Mi}
        })
      }

      //-----------------------------------------
      //SHEAR MEMBER CAPACITY
      //------------------------------------------
      //1. CONVERT UNBRACED LENGTH STRING TO ARRAY
      let Lub_V_Arr = map(split(this.Lub_V,','), (x) => toNumber(x))
      //1. CREATE MEMBER CAPACITY ARRAY FROM BOTTOM FLANGE UNBRACED LENGTH
      let Vc_Arr = Lub_V_Arr.map(item => Math.random()*10)
      //2. COMBINE ARRAY FOR CAPACITY AND UNBRACED LENGTH
      this.capArrShear = zipWith(Lub_V_Arr, Vc_Arr,(Li, Vi)=>{
            return {Lc: Li, Vc: Vi}
        })
    
    },//ANALYSIS
    sortedPL(){
      return this.PL.sort((a,b) => a.a - b.a)
    }//SORTED PL
  }, //COMPUTED
  methods: {
    formatNumber(num, deci){
      return decimal(num, deci)
    },
    checkUnbracedLengthSum(str){
      let arr = map(split(str,','), (x) => toNumber(x))
      let total = arr.reduce((acc, x) => acc + x)
      if(this.type == 'Overhang'){
        return total == this.L + this.Lo ? false : true
      }
      else{
        return total == this.L ? false : true
      }
    },
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