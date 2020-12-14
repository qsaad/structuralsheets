<template>
	<custom-card 
    title="STEEL LINTEL DESIGN" 
    :inputCards="inputCards" 
    :outputCards="outputCards"
		:footerCards="footerCards" 
    :inputCardColumns="inputCardColumns"
    :outputCardColumns="outputCardColumns"
  >
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- INPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:input-one>
			<custom-select :label="`Level`">
			  <select v-model="level">
          <option v-for="item in levelList">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Method`">
			  <select v-model="method">
          <option v-for="item in methodList">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`L (ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
		</template>
		<template v-slot:input-two>
      <custom-select :label="`Section Type`">
				<select v-model="typeSelected" @change="updateDataList($event)">
          <option v-for="item in typeList">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Section Size`">
			  <select v-model="sectionSelected">
          <option v-for="item in dataList" v-bind:value="item.Shape" v-text="item.Shape">
          </option>
        </select>
			</custom-select>
      <custom-select :label="`Fy (ksi)`">
			  <select v-model="Fy">
          <option v-for="item in FyList" >{{ item }}</option>
        </select>
			</custom-select>
		</template>
		<template v-slot:input-three>
      <custom-text-field :label="`DL (k/ft)`">
				<input v-model.number="DL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`LL (k/ft)`">
				<input v-model.number="LL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`WL (k/ft)`">
				<input v-model.number="WL" class="input is-small">
      </custom-text-field>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <!-- FLEXURE -->
      <custom-check-notification
        title="M<sub>D+L</sub>"
        :actual= parseFloat(forces({DL:DL,LL:LL}).M)
        :allowable= parseFloat(capacity(L).fMnx)
        :deci=2
      ></custom-check-notification>
      <custom-check-notification
        title="M<sub>W</sub>"
        :actual= parseFloat(forces({WL:WL}).M)
        :allowable= parseFloat(capacity(L).fMny)
        :deci=2
      ></custom-check-notification>
      <custom-interaction-notification
        title="I<sub>M</sub>"
        :actualOne= parseFloat(forces({DL:DL,LL:LL}).M)
        :allowableOne= parseFloat(capacity(L).fMnx)
        :actualTwo= parseFloat(forces({WL:WL}).M)
        :allowableTwo= parseFloat(capacity(L).fMny)
        :deci=2
      ></custom-interaction-notification>
		</template>
    <!-- DEFLECTION -->
		<template v-slot:output-two>
      <custom-check-notification
        title="&Delta;<sub>DL</sub>"
        :actual= parseFloat(forces({DL:DL}).D)
        :allowable= parseFloat(allowableSpanDeflection.DL)
        :deci=2
      ></custom-check-notification>
      <custom-check-notification
        title="&Delta;<sub>LL</sub>"
        :actual= parseFloat(forces({LL:LL}).D)
        :allowable= parseFloat(allowableSpanDeflection.DL)
        :deci=2
      ></custom-check-notification>
      <custom-check-notification
        title="&Delta;<sub>TL</sub>"
        :actual= parseFloat(forces({DL:DL,LL:LL}).D)
        :allowable= parseFloat(allowableSpanDeflection.TL)
        :deci=2
      ></custom-check-notification>
      <custom-check-notification
        title="&Delta;<sub>WL</sub>"
        :actual= parseFloat(forces({WL:WL}).D)
        :allowable= parseFloat(allowableSpanDeflection.WL)
        :deci=2
      ></custom-check-notification>
		</template>
    <template v-slot:output-three>
      <custom-value-notification
        title="R<sub>DL</sub>"
        :value= parseFloat(forces({DL:DL}).RR)
        :deci=2
      ></custom-value-notification>
      <custom-value-notification
        title="R<sub>LL</sub>"
        :value= parseFloat(forces({LL:LL}).RR)
        :deci=2
      ></custom-value-notification>
      <custom-value-notification
        title="R<sub>WL</sub>"
        :value= parseFloat(forces({WL:WL}).RR)
        :deci=2
      ></custom-value-notification>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
			
		</template>
		<template v-slot:footer-two>
			
		</template>
	</custom-card>
</template>

<script>
//UI
import layoutMixin from "../../mixins/layoutMixin"
//DATA
import { dataW } from "../../data/steel/dataW";
import { dataHSS } from "../../data/steel/dataHSS";
//CLASSES
import CapacityW from "../../classes/steel/clsCapacityW";
import CapacityHSS from "../../classes/steel/clsCapacityHSS";
import SimpleBeam from '../../classes/analysis/clsSimpleBeam'
//UTIL
import { decimal } from "../../utils/mathLib";

export default {
  name: "SteelLintelDesign",
  components: {
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'SPAN'},
        {slotName:'input-two', title:'SIZE'},
        {slotName:'input-three', title:'LOADS'}
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE (k-ft)'},
        {slotName:'output-two', title:'DEFLECTION (in)'},
        {slotName:'output-three', title:'REACTION (k)'},
      ],
      footerCards: [
        {slotName:'footer-one'},
        {slotName:'footer-two'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      typeList: ["W", "HSS"],
      typeSelected: "W",
      sectionSelected: "W16X26",
      dataList: [],
      FyList: [36, 50],
      Fy: 50,
      levelList:['Floor', 'Roof'],
      level: 'Floor',
      methodList:['ASD','LRFD'],
      method: 'ASD',
      DL: 1,
      LL: 1,
      WL: 0.2,
      L: 12,
      warnings:[]
    }; //RETURN
  }, //DATA
  created() {
    this.dataList = dataW;
  }, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Load', status: this.DL < 0, title: "DL cannot be negative"},
        {type: 'Load', status: this.LL < 0, title: "LL cannot be negative"},
        {type: 'Load', status: this.WL < 0, title: "WL cannot be negative"},
        {type: 'Span', status: this.L < 0, title: "Span cannot be negative"},
      ]
    },//GENERATE WARNINGS
    allowableSpanDeflection(){
      let DL = 0
      let LL = 0
      let WL = 0
      let TL = 0

      switch (this.level) {
        case "Floor":
          DL = (this.L*12/240)- (this.L*12/360) 
          LL = (this.L*12/360) 
          WL = (this.L*12/500) 
          TL = (this.L*12/240) 
          break;
        case "Roof":
          DL = (this.L*12/180)-(this.L*12/240)
          LL = (this.L*12/240)
          WL = (this.L*12/500)
          TL = (this.L*12/180)
          break;
      }

      return {DL, LL, WL, TL}
      
    }//ALLOWABLE SPAN DEFLECTION
  }, //COMPUTED
  methods: {
     forces({DL=0, LL=0, WL=0}){
      let F = {}
      let D = {}

      //FIND SECTION AND DESTRUCTURE PROPERTIES IX IY and W
      const{IX : Ix, IY : Iy, W : wt}  = this.dataList.find(item => item.Shape == this.sectionSelected);
      //CREATE INPUT OBJECT FOR FORCES

      let objForce = {
        L: this.L,
        E: 29000,
        I: WL == 0 ? Ix : Iy, 
        w: this.method == 'ASD' ? (WL == 0 ? (DL + wt/1000) + LL : WL) : (WL == 0 ? 1.2*(DL + wt/1000) + 1.6*LL : 1.6*WL), 
        P: [],
        a: []
      }
      //CREATE INPUT OBJECT FOR DEFLECTION
      let objDeflection = {
        L: this.L,
        E: 29000,
        I: WL == 0 ? Ix : Iy, 
        w: WL == 0 ? (DL + wt/1000) + LL : WL, 
        P: [],
        a: []
      }
      //INTANTIATE CLASS FOR SELECTED SPAN TYPE
      F = new SimpleBeam(objForce);
      D = new SimpleBeam(objDeflection);
      
      //RETURN FORCES AND DEFLECTIONS FOR SELECTED SPAN TYPE
      return {
        M: F.Mmax(),
        RL: F.RL().toFixed(2),
        RR: F.RR().toFixed(2),
        D: D.Dmax(),
      }
    },//FORCES
    capacity(Lu){
      let B = {};
      //CREATE INPUT OBJECT FOR CAPACITY
      let objData = {
        shape: this.sectionSelected,
        method: this.method,
        Fy: this.Fy,
        Lu: Lu,
        Lx: 1, 
        Ly: 1, 
        Kx: 1,
        Ky: 1,
        Cb: 1
      }
      //INTANTIATE CLASS FOR SELECTED SHAPE TYPE
      switch (this.typeSelected) {
        case "W":
          B = new CapacityW(objData);
          break;
        case "HSS":
          B = new CapacityHSS(objData)
          break;
      }
    //RETURN SECTION CAPACITY FOR SELECTED SHAPE AND SECTION
      return{
        fMnx: B.fMnx(),
        fMny: B.fMny(),
        fVnx: B.fVnx(),
        fVny: B.fVny()
      }//RETURN
    },//CAPACITY
    updateDataList(event) {
      this.dataList = [];
      switch (event.target.value) {
        case "W":
          this.sectionSelected = "W16X26";
          this.FyList = [36,50];
          this.Fy = 50
          this.dataList = dataW;
          break;
        case "HSS":
          this.sectionSelected = "HSS6X6X3/8";
          this.FyList = [46]
          this.Fy = 46
          this.dataList = dataHSS;
          break;
      } //SWITCH
    }//UPDATE DATA LIST
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>