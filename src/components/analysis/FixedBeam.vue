<template>
  	<custom-card 
    title="FIXED BEAM" 
    :inputCards="inputCards" 
    :outputCards="outputCards"
    :inputCardColumns="inputCardColumns"
    :outputCardColumns="outputCardColumns"
	>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- INPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:input-one>
			<custom-text-field :label="`Span (ft)`">
				<input type="text" class="input is-small" v-model.number="L">
      </custom-text-field>
      <custom-text-field :label="`Load (k/ft)`">
				<input type="text" class="input is-small" v-model.number="w">
      </custom-text-field>
		</template>
		<template v-slot:input-two>
			<custom-text-field :label="`Ix (in^4)`">
				<input type="text" class="input is-small" v-model.number="Ix">
      </custom-text-field>
			<custom-text-field :label="`E (ksi)`">
				<input type="text" class="input is-small" v-model.number="E">
      </custom-text-field>
		</template>
  
	
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-value-notification
        title="M<sub>s</sub>"
        :value= parseFloat(analysis.Ms)
        :deci=2
        unit="k-ft"
      ></custom-value-notification>
      <custom-value-notification
        title="M<sub>e</sub>"
        :value= parseFloat(analysis.Mend)
        :deci=2
        unit="k-ft"
      ></custom-value-notification>
		</template>
		<template v-slot:output-two>
      <custom-value-notification
        title="V"
        :value= parseFloat(analysis.V)
        :deci=2
        unit="k"
      ></custom-value-notification>
		</template>
    <template v-slot:output-three>
      <custom-value-notification
        title="&Delta;"
        :value= parseFloat(analysis.D)
        :deci=3
        unit="in"
      ></custom-value-notification>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- <template v-slot:footer-one>
			Lorem, ipsum dolor sit amet
		</template> -->
	
	</custom-card>  
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import FixedBeam from '../../classes/analysis/clsFixedBeam'
import { decimal } from "../../utils/mathLib";

export default {
  name: "FixedBeam",
  components: {
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 6,
      w: 0.25,
      Ix: 100,
      E: 29000,
      P : [],
      a : [],
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    analysis(){
      let objData = {
        L: this.L,
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        P: this.P,
        a: this.a
      }

      let obj = new FixedBeam(objData)

      return {
        Ms: obj.Mmax().toFixed(2),
        V: obj.Vmax().toFixed(2),
        D: obj.Dmax().toFixed(4),
        Mend: decimal(obj.ML(), 2),
        //Mx: obj.plotM()
      }
    },//ANALYSIS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
table {
  margin: auto;
  width: 400px;
}
</style>
