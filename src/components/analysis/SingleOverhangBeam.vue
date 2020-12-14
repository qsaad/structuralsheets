<template>
  <custom-card 
    title="SINGLE OVERHANG BEAM" 
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
      	<custom-text-field :label="`Right Overhang (ft)`">
				<input type="text" class="input is-small" v-model.number="Lo">
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
        title="M<sub>c</sub>"
        :value= parseFloat(analysis.Mc)
        :deci=2
        unit="k-ft"
      ></custom-value-notification>
		</template>
		<template v-slot:output-two>
      <custom-value-notification
        title="RL"
        :value= parseFloat(analysis.RL)
        :deci=2
        unit="k"
      ></custom-value-notification>
      <custom-value-notification
        title="RR"
        :value= parseFloat(analysis.RR)
        :deci=2
        unit="k"
      ></custom-value-notification>
		</template>
    <template v-slot:output-three>
      <custom-value-notification
        title="&Delta;<sub>s</sub>"
        :value= parseFloat(analysis.Ds)
        :deci=3
        unit="in"
      ></custom-value-notification>
      <custom-value-notification
        title="&Delta;<sub>c</sub>"
        :value= parseFloat(analysis.Dc)
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

import SingleOverhangBeam from '../../classes/analysis/clsSingleOverhangBeam'
import { decimal } from "../../utils/mathLib"

export default {
  name: "SingleOverhangBeam",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'PARAMETER'},
        {slotName:'input-two', title:'PROPERTY'},
      ],
      outputCards: [
        {slotName:'output-one', title:'MOMENT'},
        {slotName:'output-two', title:'SHEAR'},
        {slotName:'output-three', title:'DEFLECTION'},
      ],
      footerCards: [
        {slotName:'footer-one'},
        {slotName:'footer-two'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      L: 6,
      Lo: 2,
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
        Lo: this.Lo,
        E: this.E,
        I: this.Ix, 
        w: this.w, 
        P: this.P,
        a: this.a
      }

      let obj = new SingleOverhangBeam(objData)

      return {
        Ms: decimal(obj.Mmax(),2),
        Mc: decimal(obj.Mc(),2),
        RL: decimal(obj.RL(),2),
        RR: decimal(obj.RR(),2),
        Ds: decimal(obj.Dmax(),2),
        Dc: decimal(obj.Dc(),2),
        //Mx: obj.plotM()
      }
    },//ANALYSIS
    // Mc() {
    //   let M = (this.w * this.a * this.a) / 2;
    //   return M.toFixed(2);
    // },
    // RL() {
    //   let R =
    //     (this.w * (Math.pow(this.L, 2) - Math.pow(this.a, 2))) / (2 * this.L);
    //   return R.toFixed(2);
    // },
    // RR() {
    //   let R1 = this.w * this.a;
    //   let R2 =
    //     (this.w * (Math.pow(this.L, 2) + Math.pow(this.a, 2))) / (2 * this.L);
    //   let R = R1 + R2;
    //   return R.toFixed(2);
    // },
    // Ms() {
    //   let x = (this.L / 2) * (1 - Math.pow(this.a, 2) / Math.pow(this.L, 2));
    //   let M = this.RL * x - (this.w * x * x) / 2;
    //   return M.toFixed(2);
    // },
    // ds() {
    //   let x = (this.L / 2) * (1 - Math.pow(this.a, 2) / Math.pow(this.L, 2));
    //   let d1 = (this.w * x * 1728) / (24 * this.E * this.Ix * this.L);
    //   let d2 = Math.pow(this.L, 4);
    //   let d3 = 2 * Math.pow(this.L, 2) * Math.pow(x, 2);
    //   let d4 = this.L * Math.pow(x, 3);
    //   let d5 = 2 * Math.pow(this.a, 2) * Math.pow(this.L, 2);
    //   let d6 = 2 * Math.pow(this.a, 2) * Math.pow(x, 2);

    //   let d = d1 * (d2 - d3 + d4 - d5 + d6);

    //   return d.toFixed(4);
    // },
    // dc() {
    //   let d1 = (this.w * this.a * 1728) / (24 * this.E * this.Ix);
    //   let d2 = 4 * Math.pow(this.a, 2) * this.L;
    //   let d3 = Math.pow(this.L, 3);
    //   let d4 = 3 * Math.pow(this.a, 3);

    //   let d = d1 * (d2 - d3 + d4);

    //   return d.toFixed(4);
    // }
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
table {
  margin: auto;
}
</style>
