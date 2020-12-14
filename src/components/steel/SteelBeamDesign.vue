<template>
	<custom-card 
    title="STEEL BEAM DESIGN" 
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
      <custom-select :label="`Span Type`">
			  <select v-model="spanType">
          <option v-for="item in spanTypeList">{{ item }}</option>
        </select>
			</custom-select>
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
      <custom-text-field :label="`L (ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Lo (ft)`" v-if="spanType == 'Single Overhang'">
				<input v-model.number="Lo" class="input is-small">
      </custom-text-field>
		</template>

    <template v-slot:input-four>
      
      <custom-text-field :label="`Span Top Flange (ft)`" v-if="spanType != 'Cantilever'">
				<input v-model.number="Lt" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Span Bot Flange (ft)`" v-if="spanType != 'Cantilever'">
				<input v-model.number="Lb" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Canti. Bot Flange (ft)`" v-if="spanType == 'Cantilever' || spanType == 'Single Overhang'">
				<input v-model.number="Lob" class="input is-small">
      </custom-text-field>
		
		</template>

		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <!-- SIMPLE CHECK -->
      <custom-check-notification
        title="M<sub>s</sub>"
        :actual= parseFloat(forces({DL:DL,LL:LL}).Ms)
        :allowable= parseFloat(capacity(Lt).fMnx)
        :deci=2
        v-if="spanType != 'Cantilever'"
      >
      </custom-check-notification>

      <!-- FIXED OR SINGLE OVERHANG CHECK -->
      <custom-check-notification
        title="M<sub>e</sub>"
        :actual= Math.abs(parseFloat(forces({DL:DL,LL:LL}).Mend))
        :allowable= parseFloat(capacity(Lb).fMnx)
        :deci=2
        v-if="spanType == 'Fixed'"
      >
      </custom-check-notification>
       <custom-check-notification
        title="M<sub>sb</sub>"
        :actual= Math.abs(parseFloat(forces({DL:DL,LL:LL}).Mc))
        :allowable= parseFloat(capacity(Lb).fMnx)
        :deci=2
        v-if="spanType == 'Single Overhang'"
      >
      </custom-check-notification>

      <!-- CANTILEVER OR SINGLE OVERHANG CHECK -->
      <custom-check-notification
        title="M<sub>c</sub>"
        :actual= Math.abs(parseFloat(forces({DL:DL,LL:LL}).Mc))
        :allowable= parseFloat(capacity(Lob).fMnx)
        :deci=2
        v-if="spanType == 'Cantilever' || spanType == 'Single Overhang'"
      >
      </custom-check-notification>

		</template>

		<template v-slot:output-two>
      <custom-check-notification
        title="&Delta;<sub>DL</sub>"
        :actual= parseFloat(forces({DL:DL}).Ds)
        :allowable= parseFloat(allowableSpanDeflection.DL)
        :deci=2
      >
      </custom-check-notification>

      <custom-check-notification
        title="&Delta;<sub>LL</sub>"
        :actual= parseFloat(forces({LL:LL}).Ds)
        :allowable= parseFloat(allowableSpanDeflection.LL)
        :deci=2
      >
      </custom-check-notification>

      <custom-check-notification
        title="&Delta;<sub>TL</sub>"
        :actual= parseFloat(forces({DL:DL,LL:LL}).Ds)
        :allowable= parseFloat(allowableSpanDeflection.TL)
        :deci=2
      >
      </custom-check-notification>

		</template>

    <template v-slot:output-three>
			<div class="notification is-primary mx-0 px-0 py-2 mt-0 mb-2 is-flex is-flex-direction-row is-justify-content-space-between">
        <div class="">
          <span class="is-6 pl-1">DL &nbsp;: </span>
          <span class="is-6 px-1">{{ forces({DL:DL}).RL }}</span>
        </div>
        <div class="">
          <span class="is-6 pl-1">DL &nbsp;: </span>
          <span class="is-6 px-1">{{ forces({DL:DL}).RR }}</span>
        </div>
			</div>
      <div class="notification is-primary mx-0 px-0 py-2 mt-0 mb-2 is-flex is-flex-direction-row is-justify-content-space-between">
        <div class="">
          <span class="is-6 pl-1">LL : </span>
          <span class="is-6 px-1">{{ forces({LL:LL}).RL }}</span>
        </div>
        <div class="">
          <span class="is-6 pl-1">LL : </span>
          <span class="is-6 px-1">{{ forces({LL:LL}).RR }}</span>
        </div>
			</div>
      <div class="notification is-primary mx-0 px-0 py-2 mt-0 mb-2 is-flex is-flex-direction-row is-justify-content-space-between">
        <div class="">
          <span class="is-6 pl-1">TL : </span>
          <span class="is-6 px-1">{{ forces({DL:DL, LL:LL}).RL }}</span>
          
        </div>
        <div class="">
          <span class="is-6 pl-1">TL : </span>
          <span class="is-6 px-1">{{ forces({DL:DL, LL:LL}).RR }}</span>
        </div>
			</div>

		</template>

		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
			<!-- <div class="notification is-warning is-block py-1 my-1" v-if="L <= 0">
        L cannot be zero
      </div>
      <div v-if="spanType == 'Single Overhang'">
        <div class="notification is-warning is-block py-1 my-1" v-if="Lub > Lo">
          Lub cannot be greater then Lo
        </div>
      </div> -->
      {{generateWarnings}}
      <custom-warning-messages
        :messages = "warnings"
      ></custom-warning-messages>
      <!-- <template v-for="(item,i) in warnings" :key="i">
        <div class="notification is-warning is-block py-1 my-1" v-if="item.status">
          {{item.title}}
        </div>
      </template> -->
      
		</template>

	</custom-card>
</template>

<script>
//LAYOUT
import layoutMixin from "../../mixins/layoutMixin"


//DATA
import { dataW } from "../../data/steel/dataW";
import { dataWT } from "../../data/steel/dataWT";
import { dataHSS } from "../../data/steel/dataHSS";
import { dataC } from "../../data/steel/dataC";
import { dataMC } from "../../data/steel/dataMC";
import { dataPipe } from "../../data/steel/dataPipe";
import { dataHSR } from "../../data/steel/dataHSR";
//import { dataSLBB } from "../../data/steel/dataSLBB";
import { dataL } from "../../data/steel/dataL";
import { dataLU } from "../../data/steel/dataLU";

//CLASSES
import CapacityW from "../../classes/steel/clsCapacityW";
import CapacityWT from "../../classes/steel/clsCapacityWT";
import CapacityHSS from "../../classes/steel/clsCapacityHSS";
import CapacityHSR from "../../classes/steel/clsCapacityHSR";
import CapacityC from "../../classes/steel/clsCapacityC";
import CapacityMC from "../../classes/steel/clsCapacityMC";
import CapacityPipe from "../../classes/steel/clsCapacityPipe";
import CapacityLLBB from "../../classes/steel/clsCapacityLLBB";
import CapacityLU from "../../classes/steel/clsCapacityLU";

import SimpleBeam from '../../classes/analysis/clsSimpleBeam'
import CantileverBeam from '../../classes/analysis/clsCantileverBeam'
import FixedBeam from '../../classes/analysis/clsFixedBeam'
import SingleOverhangBeam from '../../classes/analysis/clsSingleOverhangBeam'

//UTIL
import { decimal } from "../../utils/mathLib";


export default {
  name: "SteelBeamDesign",
  components: {
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TYPE'},
        {slotName:'input-two', title:'SIZE'},
        {slotName:'input-three', title:'LOADS'},
        {slotName:'input-four', title:'FLANGE BRACING'},
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE (k-ft)'},
        {slotName:'output-two', title:'DELFLECTION (in)'},
        {slotName:'output-three', title:'REACTIONS (k)'},
      ],
      footerCards: [
        {slotName:'footer-one'},
        //{slotName:'footer-two'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-quarter-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-full-mobile', 'is-one-third-tablet', 'is-one-third-desktop'],
      typeList: ["W", "WT", "C", "MC", "L", "LU", "HSS", "HSR", "Pipe"],
      typeSelected: "W",
      sectionSelected: "W16X26",
      dataList: [],
      FyList: [36, 50],
      Fy: 50,
      levelList:['Floor', 'Roof'],
      level: 'Floor',
      spanTypeList: ['Simple','Cantilever','Fixed','Single Overhang'],
      spanType: 'Simple',
      methodList:['ASD','LRFD'],
      method: 'ASD',
      DL: 1,
      LL: 1,
      L: 12,
      Lo: 4,
      Lt: 1,
      Lb: 12,
      Lob: 4,
      warnings:[]
    }; //RETURN
  }, //DATA
  created() {
    this.dataList = dataW;
  }, //CREATED
  mounted() {
   
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'bracing', status: this.Lob > this.Lo && this.spanType == ("Single Overhang" || "Cantilever"), title: "Overhang bottom flange bracing cannot be greater than Lo"},
        {type: 'bracing', status: this.Lb > this.L, title: "Span bottom flange bracing cannot be greater than Span"},
        {type: 'bracing', status: this.Lt > this.L, title: "Span top flange bracing cannot be greater than Span"},
        {type: 'Bracing', status: this.Lob < 0 && this.spanType == ("Single Overhang" || "Cantilever"), title: "Lob cannot be negative"},
        {type: 'Bracing', status: this.Lt < 0, title: "Lt cannot be negative"},
        {type: 'Bracing', status: this.Lb < 0, title: "Lb cannot be negative"},
        {type: 'Load', status: this.DL < 0, title: "DL cannot be negative"},
        {type: 'Load', status: this.LL < 0, title: "LL cannot be negative"},
        {type: 'Span', status: this.L < 0, title: "Span cannot be negative"},
        {type: 'Span', status: this.Lo < 0 && this.spanType == "Single Overhang", title: "Span cannot be negative"},
        {type: 'Span', status: this.L < 0, title: "Span cannot be negative"},
      ]
    },//GENERATE WARNINGS
    properties() {
      let obj = this.dataList.filter(
        item => item.Shape == this.sectionSelected
      )[0];

      return obj
    }, //PROPERTIES
    allowableSpanDeflection(){
      let DL = 0
      let LL = 0
      let TL = 0

      switch (this.level) {
        case "Floor":
          DL = (this.L*12/240)- (this.L*12/360) 
          LL = (this.L*12/360) 
          TL = (this.L*12/240) 
          break;
        case "Roof":
          DL = (this.L*12/180)-(this.L*12/240)
          LL = (this.L*12/240)
          TL = (this.L*12/180)
          break;
      }

      return {DL, LL, TL}
      
    }//ALLOWABLE SPAN DEFLECTION
  }, //COMPUTED
  methods: {
    forces({DL=0,LL=0}){
      let F = {}
      let FD = {}

      //FIND SECTION AND DESTRUCTURE PROPERTIES IX IY and W
      const{IX : Ix, IY : Iy, W : wt}  = this.dataList.find(item => item.Shape == this.sectionSelected);
      //CREATE INPUT OBJECT FOR FORCES
      let objForce = {
        L: this.L,
        Lo: this.Lo,
        E: 29000,
        I: Ix, 
        w: this.method == 'ASD' ? (DL + wt/1000) + LL : 1.2*(DL + wt/1000) + 1.6*LL, 
        P: [],
        a: []
      }
      //CREATE INPUT OBJECT FOR DEFLECTION
      let objDeflection = {
        L: this.L,
        Lo: this.Lo,
        E: 29000,
        I: Ix, 
        w: (DL + wt/1000) + LL, 
        P: [],
        a: []
      }
      //INTANTIATE CLASS FOR SELECTED SPAN TYPE
      switch (this.spanType) {
        case "Simple":
          F = new SimpleBeam(objForce);
          FD = new SimpleBeam(objDeflection);
          break;
        case "Fixed":
          F = new FixedBeam(objForce);
          FD = new FixedBeam(objDeflection);
          break;
        case "Cantilever":
          F = new CantileverBeam(objForce);
          FD = new CantileverBeam(objDeflection);
          break;
        case "Single Overhang":
          F = new SingleOverhangBeam(objForce);
          FD = new SingleOverhangBeam(objDeflection);
          break;
      }
      //RETURN FORCES AND DEFLECTIONS FOR SELECTED SPAN TYPE
      return {
        Ms: this.spanType == 'Cantilever' ? 0 : F.Mmax(),
        Mend: this.spanType == 'Fixed' ? F.ML() : 0,
        Mc: this.spanType == ('Cantilever' || 'Single Overhang') ? F.Mc() : 0,
        RL: this.spanType == 'Cantilever' ? 0 : F.RL().toFixed(2),
        RR: F.RR().toFixed(2),
        Ds: this.spanType == 'Cantilever' ? 0 : FD.Dmax(),
        Dc: this.spanType == ('Cantilever' || 'Single Overhang') ? FD.Dc() : 0,
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
        case "WT":
          B = new CapacityWT(objData)
          break;
        case "C":
          B = new CapacityC(objData)
          break;
        case "MC":
          B = new CapacityMC(objData)
          break;
        case "L":
          B = new CapacityL(objData)
          break;
        case "LU":
          B = new CapacityLU(objData)
          break;
        case "HSS":
          B = new CapacityHSS(objData)
          break;
        case "HSR":
          B = new CapacityHSR(objData)
          break;
        case "Pipe":
          B = new CapacityPipe(objData)
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
        case "WT":
          this.sectionSelected = "WT5X6";
          this.FyList = [36,50];
          this.Fy = 50
          this.dataList = dataWT;
          break;
        case "C":
          this.sectionSelected = "C15X33.9";
          this.FyList = [36,50]
          this.Fy = 36
          this.dataList = dataC;
          break;
        case "MC":
          this.sectionSelected = "MC6X12";
          this.FyList = [36,50]
          this.Fy = 36
          this.dataList = dataMC;
          break;
        case "L":
          this.sectionSelected = "L4X4X1/4";
          this.FyList = [36]
          this.Fy = 36
          this.dataList = dataL;
          break;
        case "LU":
          this.sectionSelected = "L4X3-1/2X5/16";
          this.FyList = [36]
          this.Fy = 36
          this.dataList = dataLU;
          break;
        case "HSS":
          this.sectionSelected = "HSS6X6X3/8";
          this.FyList = [46]
          this.Fy = 46
          this.dataList = dataHSS;
          break;
        case "HSR":
          this.sectionSelected = "HSS6X.250";
          this.FyList = [42]
          this.Fy = 42
          this.dataList = dataHSR;
          break;
        case "Pipe":
          this.sectionSelected = "PIPE3-1/2STD";
          this.FyList = [35]
          this.Fy = 35
          this.dataList = dataPipe;
          break;
      } //SWITCH
    }//UPDATE DATA LIST
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>