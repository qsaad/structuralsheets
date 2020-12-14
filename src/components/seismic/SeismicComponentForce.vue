<template>
	<custom-card 
    title="SEISMIC COMPONENT FORCE" 
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
			<custom-text-field :label="`Sds`">
				<input v-model.number="Sds" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Wp (lb)`">
				<input v-model.number="Wp" class="input is-small">
      </custom-text-field>
		
		</template>

    <template v-slot:input-two>
			<custom-text-field :label="`ap`">
				<input v-model.number="ap" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Rp`">
				<input v-model.number="Rp" class="input is-small">
      </custom-text-field>
		
		</template>

    <template v-slot:input-three>
      <custom-text-field :label="`Ip`">
				<input v-model.number="Ip" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`z (ft)`">
				<input v-model.number="z" class="input is-small">
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
        title="F<sub>p</sub>"
        :value= parseFloat(design.Fp)
        :deci=0
        unit="lbs"
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

import Component from '../../classes/seismic/clsComponent'

export default {
  name: "SeismicComponentForce",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'COEFFICIENTS'},
        {slotName:'input-two', title:'PARAMETERS'},
        {slotName:'input-three', title:'CATEGORY'},
      ],
      outputCards: [
        {slotName:'output-one', title:'PRESSURE'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      Sds : 1,
      Wp : 1000,
      ap : 2,
      Rp : 6,
      z : 20,
      Ip : 1,
      h : 20,
      warnings:[]
      
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
        Sds : this.Sds,
        Wp : this.Wp,
        ap : this.ap,
        Rp : this.Rp,
        z : this.z,
        Ip : this.Ip,
        h : this.h,
      }
      let obj = new Component(objData)
      
      return {
          Fp : obj.Fp(),
      }
    },//DESIGN
     generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.Sds < 0, title: "Sds cannot be negative"},
        {type: 'Parameters', status: this.Wp < 0, title: "Wp cannot be negative"},
        {type: 'Parameters', status: this.ap< 0, title: "ap cannot be negative"},
        {type: 'Parameters', status: this.Rp< 0, title: "Rp cannot be negative"},
        {type: 'Parameters', status: this.z< 0, title: "z cannot be negative"},
        {type: 'Parameters', status: this.Ip < 1, title: "Ip cannot be less than 1"},
        {type: 'Parameters', status: this.h < 0, title: "h cannot be negative"},
        {type: 'Parameters', status: this.z > this.h, title: "z cannot be greater than h"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>