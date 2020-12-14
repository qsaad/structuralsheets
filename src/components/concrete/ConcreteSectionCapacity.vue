<template>
	<custom-card 
    title="CONCRETE SECTION CAPACITY" 
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
		  <custom-select :label="`Size`">
				<select v-model.number="elementType">
          <option v-for="(item, i) in elementTypeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`fc (psi)`">
				<select v-model.number="fc">
          <option v-for="(item, i) in FcList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		</template>

		<template v-slot:input-two>
			<custom-text-field :label="`b (in)`">
				<input v-model.number="b" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`h (in)`">
				<input v-model.number="h" class="input is-small">
      </custom-text-field>
		</template>

		<template v-slot:input-three>
			<custom-select :label="`Size`">
				<select v-model.number="rebarSize">
          <option v-for="(item, i) in rebarSizeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Spacing (in)`" v-if="elementType != 'Beam' || elementType == 'Column'">
				<input v-model.number="rebarSpa" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Quantity`" v-else>
				<input v-model.number="rebarQty" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Cover (in)`">
				<input v-model.number="rebarCov" class="input is-small">
      </custom-text-field>
		</template>

		<template v-slot:input-four">
		  <custom-select :label="`Size`">
				<select v-model.number="stirrupSize">
          <option v-for="(item, i) in rebarSizeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Spacing (in)`">
				<input v-model.number="stirrupSpa" class="input is-small">
      </custom-text-field>
		</template>

    
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-value-notification
        title="M"
        :value= parseFloat(design.M)
        :deci=0
        unit="k-ft"
      ></custom-value-notification>
		</template>

    <template v-slot:output-two>
      <custom-value-notification
        title="V"
        :value= parseFloat(design.V)
        :deci=0
        unit="k"
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

import ConcreteSectionCapacity from '../../classes/concrete/clsConcreteSectionCapacity'

export default {
  name: "ConcreteSectionCapacity",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'TYPE'},
        {slotName:'input-two', title:'GEOMETRY'},
        {slotName:'input-three', title:'REBAR'},
        {slotName:'input-four', title:'STIRRUP'},
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE'},
        {slotName:'output-two', title:'SHEAR'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      b: 12,
      h: 12,
      rebarSizeList:["#3","#4","#5","#6","#7",'#8','#9'],
      rebarSize: "#5",
      rebarSpa: 0,
      rebarCov: 1.5,
      rebarQty: 2,
      stirrupSize: "#3",
      stirrupSpa: 12,
      elementTypeList: ['Beam','Column','Wall','Slab'],
      elementType: "Beam",
      FyList: [40, 60],
      Fy: 60,
      FcList: [3000, 4000, 5000],
      fc: 3000,
      warnings:[]
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
       let objData = {
        b: this.b,
        h: this.h,
        fc: this.fc,
        rebarSize: this.rebarSize, 
        // rebarSpa: this.rebarSpa, 
        // rebarQty: this.rebarQty,
        rebarSpa: this.elementType == ('Beam' || 'Column') ? 0 : this.rebarSpa, 
        rebarQty: this.elementType == ('Beam' || 'Column') ? this.rebarQty : 0, 
        rebarCov: this.rebarCov,
        stirrupSize: this.stirrupSize, 
        stirrupSpa: this.stirrupSpa,
      }

      let obj = new ConcreteSectionCapacity(objData)

      return {
        M: obj.fMn().toFixed(2),
        V: obj.fVn().toFixed(2),
        clrSpa : obj.clrSpa(),
        Ast : obj.Ast(),
        Asmin : obj.Asmin()
      }
    },//design
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.b < 0, title: "b cannot be negative"},
        {type: 'Parameters', status: this.h < 0, title: "h cannot be negative"},
        {type: 'Concrete', status: this.fc < 2500, title: "fc cannot be less than 2500"},
        {type: 'Rebar', status: this.rebarCov < 0.75, title: "Cover cannot be less than 3/4"},
        {type: 'Rebar', status: this.rebarSpa < 2 && this.elementType == ('Wall' || 'Slab'), title: "Spacing cannot be less than 2"},
        {type: 'Rebar', status: this.design.clrSpa < 0.75 && this.elementType == ('Beam' || 'Column'), title: `Rebar Clear Spacing (${(this.design.clrSpa).toFixed(2)} in) cannot be less than 3/4`},
        {type: 'Rebar', status: this.design.Ast < this.design.Asmin, title: "Rebar quantity less than Asmin"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>