<template>
	<custom-card 
    title="Template" 
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
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
			<custom-select :label="`F<sub>y</sub> (ksi)`">
				<select v-model.number="Fy">
          <option v-for="(item, i) in FyList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
			<custom-select :label="`F<sub>c</sub> (psi)`">
				<select v-model.number="Fc">
          <option v-for="(item, i) in FcList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		</template>
		<template v-slot:input-two>
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
		</template>
		<template v-slot:input-three>
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
				<custom-text-field :label="`Span(ft)`">
					<input v-model.number="L" class="input is-small">
      </custom-text-field>
			<custom-text-field :label="`Span(ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nesciunt maxime sapiente veritatis!
			Sint maxime, natus ut unde laudantium, quibusdam dignissimos cum incidunt mollitia, voluptas illum ducimus
			soluta quidem quis?
		</template>
		<template v-slot:output-two>
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nesciunt maxime sapiente veritatis!
			Sint maxime, natus ut unde laudantium, quibusdam dignissimos cum incidunt mollitia, voluptas illum ducimus
			soluta quidem quis?
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
        {slotName:'input-one', title:'PARAMETER A'},
        {slotName:'input-two', title:'PARAMETER B'},
        {slotName:'input-three', title:'PARAMETER C'}
      ],
      outputCards: [
        {slotName:'output-one', title:'Calculation A'},
        {slotName:'output-two', title:'Calculation B'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      L: 12,
      w: 1,
      Ix: 100,
      E: 29000,
      FyList: [36, 50],
      Fy: 36,
      FcList: [3000, 4000, 5000],
      Fc: 3000,
      warnings: []
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    generateWarnings(){
      this.warnings = [
        {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>