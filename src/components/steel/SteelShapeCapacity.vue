<template>
  <custom-card 
      title="STEEL SECTION CAPACITY" 
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
		</template>

		<template v-slot:input-two>
      <custom-select :label="`Method`">
			  <select v-model="method">
          <option v-for="item in methodList">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Fy (ksi)`">
			  <select v-model="Fy">
          <option v-for="item in FyList" >{{ item }}</option>
        </select>
			</custom-select>
		</template>

    <template v-slot:input-three>
      <custom-text-field :label="`Lu (ft)`">
				<input v-model.number="Lu" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Lx (ft)`">
				<input v-model.number="Lx" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Ly (ft)`">
				<input v-model.number="Ly" class="input is-small">
      </custom-text-field>
		</template>

    <template v-slot:input-four>
      <custom-text-field :label="`Kx`">
				<input v-model.number="Kx" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Ky`">
				<input v-model.number="Ky" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Cb`">
				<input v-model.number="Cb" class="input is-small">
      </custom-text-field>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- FLEXURE -->
		<template v-slot:output-one>
      <custom-value-notification
        title="M<sub>x</sub>"
        :value= parseFloat(design.fMnx)
        :deci=2
        unit="k-ft"
      ></custom-value-notification>
      <custom-value-notification
        title="M<sub>y</sub>"
        :value= parseFloat(design.fMny)
        :deci=2
        unit="k-ft"
      ></custom-value-notification>
		</template>
    <!-- AXIAL -->
		<template v-slot:output-two>
      <custom-value-notification
        title="P"
        :value= parseFloat(design.fPn)
        :deci=2
        unit="k"
      ></custom-value-notification>
		</template>
    <!-- SHEAR -->
    <template v-slot:output-three>
      <custom-value-notification
        title="V<sub>x</sub>"
        :value= parseFloat(design.fVnx)
        :deci=2
        unit="k"
      ></custom-value-notification>
      <custom-value-notification
        title="V<sub>y</sub>"
        :value= parseFloat(design.fVny)
        :deci=2
        unit="k"
      ></custom-value-notification>
		</template>
	
	</custom-card>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

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

export default {
  name: "SteelShapeCapacity",
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TYPE'},
        {slotName:'input-two', title:'METHOD'},
        {slotName:'input-three', title:'LENGTHS'},
        {slotName:'input-four', title:'FACTORS'},
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE'},
        {slotName:'output-two', title:'AXIAL'},
        {slotName:'output-three', title:'SHEAR'},
      ],
      typeList: ["W", "WT", "C", "MC", "L", "LU", "HSS", "HSR", "Pipe"],
      typeSelected: "W",
      sectionSelected: "W16X26",
      dataList: [],
      sectionProperty: {},
      Lu: 12,
      Lx: 12,
      Ly: 12,
      Kx: 1,
      Ky: 1,
      Cb: 1,
      FyList: [36,50],
      Fy: 50,
      methodList:['ASD','LRFD'],
      method: 'ASD',
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {
    this.dataList = dataW;
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let B = {};
      let objData = {
        shape: this.sectionSelected,
        method: this.method,
        Fy: this.Fy,
        Lu: this.Lu,
        Lx: this.Lx, 
        Ly: this.Ly, 
        Kx: this.Kx,
        Ky: this.Ky,
        Cb: this.Cb
      }

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

      return{
        fMnx: B.fMnx().toFixed(2),
        fMny: B.fMny().toFixed(2),
        fPn: B.fPn().toFixed(2),
        fVnx: B.fVnx().toFixed(2),
        fVny: B.fVny().toFixed(2)
      }
    },
    
    properties() {
      let obj = this.dataList.filter(
        item => item.Shape == this.sectionSelected
      )[0];

      //delete obj["Shape"];
      //delete item.Shape;

      return obj;
    } //PROPERTIES
  }, //COMPUTED
  methods: {
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
      }
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
table {
  margin: auto;
}
</style>
