<template>
	<custom-card 
    title="SNOW FLAT ROOF" 
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

    
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
		  <custom-value-notification
        title="P<sub>f</sub>"
        :value= parseFloat(design.Pf)
        :deci=2
        unit="psf"
      ></custom-value-notification>

      <custom-value-notification
        title="P<sub>m</sub>"
        :value= parseFloat(design.Pm)
        :deci=2
        unit="psf"
      ></custom-value-notification>

      <custom-value-notification
        title="P<sub>rs</sub>"
        :value= parseFloat(design.Prs)
        :deci=2
        unit="psf"
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
  name: "SnowFlatRoof",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'PARAMETERS'},
        {slotName:'input-two', title:'CONDITION'},
      ],
      outputCards: [
        {slotName:'output-one', title:'SNOW LOAD'},
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
      }
      let obj = new Snow(objData)

      return {
        Pf : obj.Pf(),
        Pm : obj.Pm(),
        Prs : obj.Prs(),
    }
    },//DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.Pg < 0, title: "Pg cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>