<template>
	<custom-card 
    title="WOOD SPECIES" 
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
			<custom-select :label="`Type`">
				<select v-model="typeSelected" @change="updateSpeciesList($event)">
          <option v-for="(item, i) in typeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		</template>
		<template v-slot:input-two>
			<custom-select :label="`Species`">
				<select v-model="speciesSelected">
          <option v-for="(item, j) in speciesList" :key="j" v-bind:value="item.species" v-text="item.species">

          </option>
        </select>
			</custom-select>
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-property-tag :items="properties"></custom-property-tag>
				<!-- <div class="is-flex is-block is-flex-wrap-wrap">
        <div class="notification is-success mx-1 px-1 py-1 mt-0 mb-2 has-text-centered is-light" 
            v-for="(value, name, index) in properties"
        >
          <span class="title is-6 has-text-black">{{ name }}</span> :
          <span>{{ value }}</span>
        </div>
      </div> -->
		</template>
	
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
      {{generateWarnings}}
		</template>
	</custom-card>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

//DATA SPECIES
import { sawnSpecies } from "../../data/wood/sawnSpecies";
import { glulamSpecies } from "../../data/wood/glulamSpecies";
import { glulamHardwoodSpecies } from "../../data/wood/glulamHardwoodSpecies";
import { engineeredSpecies } from "../../data/wood/engineeredSpecies";
//DATA SIZE
import { sawnSize } from "../../data/wood/sawnSize";
import { glulamSouthernSize } from "../../data/wood/glulamSouthernSize";
import { glulamWesternSize } from "../../data/wood/glulamWesternSize";
import { engineeredSize } from "../../data/wood/engineeredSize";

export default {
  name: "WoodSpecies",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TYPE'},
        {slotName:'input-two', title:'SPECIES'},
      ],
      outputCards: [
        {slotName:'output-one', title:'ALLOWABLE STRESSES'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-full-mobile', 'is-full-tablet', 'is-full-desktop'],
      typeList: ['Sawn', 'Engineered', 'Glulam', 'Glulam Hardwood'],
      typeSelected: 'Sawn',
      speciesList: [],
      speciesSelected: 'DFL#1',
    
      warnings: []
    }; //RETURN
  }, //DATA
  created() {
    
  }, //CREATED
  mounted() {
    this.speciesList = sawnSpecies;
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
    properties() {
      let obj = this.speciesList.filter(
        item => item.species == this.speciesSelected
      )[0];

      return obj;
    }, //PROPERTIES
    generateWarnings(){
      this.warnings = [
        //{type: 'Length', status: this.L < 0, title: "L cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {
    updateSpeciesList(event) {
      this.speciesList = [];
      switch (event.target.value) {
        case "Sawn":
          this.speciesSelected = "DFL#1";
          this.speciesList = sawnSpecies;
          this.sizeList = sawnSize
          break;
        case "Engineered":
          this.speciesSelected = "2.0E Microllam LVL";
          this.speciesList = engineeredSpecies;
          break;
        case "Glulam":
          this.speciesSelected = "16F-1.3E";
          this.speciesList = glulamSpecies;
          break;
        case "Glulam Hardwood":
          this.speciesSelected = "12F-V1";
          this.speciesList = glulamHardwoodSpecies;
          break;
      }//SWITCH
    },//UPDATE DATA LIST
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>