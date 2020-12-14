<template>
	<custom-card 
    title="LIVE LOAD REDUCTION" 
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
			<custom-text-field :label="`Area(sq ft)`">
				<input v-model.number="area" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`KLL`">
				<input v-model.number="KLL" class="input is-small">
      </custom-text-field>
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-value-notification
        title="RF"
        :value= parseFloat(reductionFactor)
        :deci=2
        unit=""
      ></custom-value-notification>
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

export default {
  name: "Template",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TRIBUTARY AREA'},
      ],
      outputCards: [
        {slotName:'output-one', title:'REDUCTION FACTOR'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      area: 500,
      KLL: 1,
      warnings: []
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    reductionFactor(){
      return 0.25 + 15/Math.pow(this.KLL*this.area, 0.5)
    },
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.area < 400, title: "Area cannot be less than 400"},
        {type: 'Length', status: this.KLL < 1, title: "KLL cannot be less than 1"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>