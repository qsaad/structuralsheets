<template>
    <custom-card 
      title="STEEL SECTION PROPERTIES" 
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
     
		</template>

		<template v-slot:input-two>
      <custom-select :label="`Section Size`">
			  <select v-model="sectionSelected">
          <option v-for="item in dataList" v-bind:value="item.Shape" v-text="item.Shape">
          </option>
        </select>
			</custom-select>
		</template>

		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-property-tag :items="properties"></custom-property-tag>
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

export default {
  name: "steel-shape-properties",
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TYPE'},
        {slotName:'input-two', title:'SIZE'},
      ],
      outputCards: [
        {slotName:'output-one', title:'PROPERTIES'},
      ],
      outputCardColumns:['is-full-mobile', 'is-full-tablet', 'is-half-desktop'],
      typeList: ["W", "WT", "C", "MC", "L", "LU", "HSS", "HSR", "Pipe"],
      typeSelected: "W",
      sectionSelected: "W16X26",
      dataList: [],
      sectionProperty: {}
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {
    this.dataList = dataW;
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
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
          this.dataList = dataW;
          break;
        case "WT":
          this.sectionSelected = "WT5X6";
          this.dataList = dataWT;
          break;
        case "C":
          this.sectionSelected = "C15X33.9";
          this.dataList = dataC;
          break;
        case "MC":
          this.sectionSelected = "MC6X12";
          this.dataList = dataMC;
          break;
        case "L":
          this.sectionSelected = "L4X4X1/4";
          this.dataList = dataL;
          break;
        case "LU":
          this.sectionSelected = "L4X3-1/2X5/16";
          this.dataList = dataLU;
          break;
        case "HSS":
          this.sectionSelected = "HSS6X6X3/8";
          this.dataList = dataHSS;
          break;
        case "HSR":
          this.sectionSelected = "HSS6X.250";
          this.dataList = dataHSR;
          break;
        case "Pipe":
          this.sectionSelected = "PIPE3-1/2STD";
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
