<template>
	<custom-card 
    title="SNOW DRIFT" 
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
			<custom-text-field :label="`Pg (psf)`">
				<input v-model.number="Pg" class="input is-small">
      </custom-text-field>

      <custom-select :label="`Category`">
				<select v-model="category">
          <option v-for="(item, i) in categoryList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      
		</template>

    <template v-slot:input-two>
      <custom-select :label="`Exposure`">
				<select v-model="exposure">
          <option v-for="(item, i) in exposureList" :key="i">{{ item }}</option>
        </select>
			</custom-select>

      <custom-select :label="`Terrain`">
				<select v-model="terrain">
          <option v-for="(item, i) in terrainList" :key="i">{{ item }}</option>
        </select>
			</custom-select>


		  <custom-select :label="`Thermal`">
				<select v-model="thermal">
          <option v-for="(item, i) in thermalList" :key="i">{{ item }}</option>
        </select>
			</custom-select>

      
		
		</template>

    <template v-slot:input-three>
      	<custom-text-field :label="`Luh (ft) - Leeward`">
				<input v-model.number="Luh" class="input is-small">
      </custom-text-field>

      <custom-text-field :label="`Lul (ft) - Windward`">
				<input v-model.number="Lul" class="input is-small">
      </custom-text-field>

      <custom-text-field :label="`h (ft)`">
				<input v-model.number="h" class="input is-small">
      </custom-text-field>
		
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
		  <custom-value-notification
        title="P<sub>d</sub>"
        :value= parseFloat(design.Pd)
        :deci=2
        unit="psf"
      ></custom-value-notification>

      <custom-value-notification
        title="W<sub>d</sub>"
        :value= parseFloat(design.wd)
        :deci=2
        unit="ft"
      ></custom-value-notification>

      <custom-value-notification
        title="h<sub>d</sub>"
        :value= parseFloat(design.hd)
        :deci=2
        unit="ft"
      ></custom-value-notification>
      
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
      {{generateWarnings}}
      <custom-warning-messages
        :messages="warnings"
      ></custom-warning-messages>
		</template>
	
	</custom-card>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import Snow from '../../classes/snow/clsSnow'

export default {
  name: "SnowDrift",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'PARAMETERS'},
        {slotName:'input-two', title:'CONDITION'},
        {slotName:'input-three', title:'GEOMETRY'},
      ],
      outputCards: [
        {slotName:'output-one', title:'SNOW DRIFT'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      Pg:20,
      exposureList : ['Full','Partial','Sheltered'],
      exposure : 'Full',
      terrainList : ['B','C','D'],
      terrain : 'B',
      thermalList : ['Others','Above Freezing','Unheated','Below Freezing','Greenhouses'],
      thermal : 'Others',
      categoryList : ['I','II','III','IV'],
      category : 'II',
      Luh : 75,
      Lul : 100,
      h : 6,
      warnings: []
      
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
        Pg : this.Pg,
        exposure : this.exposure,
        terrain : this.terrain,
        thermal : this.thermal,
        category : this.category,
        Luh : this.Luh,
        Lul : this.Lul,
        h : this.h
      }
      let obj = new Snow(objData)

      return {
        Pd : obj.Pd(),
        wd : obj.wd(),
        hd : obj.hd(),
    }
    },//DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.Pg < 0, title: "Pg cannot be negative"},
        {type: 'Parameters', status: this.Luh < 25, title: "Luh cannot be less than 25"},
        {type: 'Parameters', status: this.Lul < 25, title: "Lul cannot be less than 25"},
        {type: 'Parameters', status: this.h < 0, title: "h cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>