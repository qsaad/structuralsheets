<template>
	<custom-card 
    title="WIND PRESSURE" 
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
			<custom-text-field :label="`V (mph)`">
				<input v-model.number="V" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Z (ft)`">
				<input v-model.number="z" class="input is-small">
      </custom-text-field>
			<custom-select :label="`Exposure`">
				<select v-model.number="exposure">
          <option v-for="(item, i) in exposureList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
		  <custom-value-notification
        title="q"
        :value= parseFloat(design.qh)
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

import Wind from '../../classes/wind/clsWind'

export default {
  name: "WindPressure",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'PARAMETERS'},
      ],
      outputCards: [
        {slotName:'output-one', title:'PRESSURE'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      V:115,
      z:15,
      exposureList : ['B','C','D'],
      exposure : 'B',
      warnings: []
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
          V : this.V,
          exposure : this.exposure,
          z : this.z,
          Kzt : 1,
          Kd : 0.85
      }
      let obj = new Wind(objData)
      
      return {
          //OUTPUT
          qh : obj.qh(),
      }
    },//DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.V < 0, title: "V cannot be negative"},
        {type: 'Parameters', status: this.z < 0, title: "z cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>