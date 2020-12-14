<template>
	<custom-card 
    title="SEISMIC BASE SHEAR" 
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
			<custom-text-field :label="`Ss`">
				<input v-model.number="Ss" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`S1`">
				<input v-model.number="S1" class="input is-small">
      </custom-text-field>
		
		</template>

    <template v-slot:input-two>
			<custom-text-field :label="`R`">
				<input v-model.number="R" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`h (ft)`">
				<input v-model.number="h" class="input is-small">
      </custom-text-field>
		
		</template>

    <template v-slot:input-three>
      <custom-select :label="`Site Class`">
				<select v-model="siteClass">
          <option v-for="(item, i) in siteClassList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
			<custom-select :label="`Category`">
				<select v-model="category">
          <option v-for="(item, i) in categoryList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		
		</template>

    <template v-slot:input-four>
			
			<custom-select :label="`Type`">
				<select v-model="type">
          <option v-for="(item, i) in typeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`TL`">
				<select v-model="TL">
          <option v-for="(item, i) in TLList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
		  <custom-value-notification
        title="C<sub>s</sub>"
        :value= parseFloat(design.Cs)
        :deci=2
        unit=""
      ></custom-value-notification>

      <custom-text-notification
        title="SDC"
        :text= design.SDC
        unit=""
      ></custom-text-notification>
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

import Seismic from '../../classes/seismic/clsSeismic'

export default {
  name: "SeismicBaseShear",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'COEFFICIENTS'},
        {slotName:'input-two', title:'PARAMETERS'},
        {slotName:'input-three', title:'CATEGORY'},
        {slotName:'input-four', title:'TYPE'},
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
      Ss:0.625,
      S1:1.234,
      siteClassList : ['A','B','C','D'],
      siteClass : 'B',
      categoryList : ['I','II','III','IV'],
      category : 'II',
      TLList : [6,8,10,12],
      TL : 10,
      typeList : ['Steel SMF','Concrete SMF','Steel EBF','Steel BRBF','Others'],
      type : 'Others',
      h : 20,
      R : 3,
      W : 100,
      //OUTPUT VALUES
      SDC:'A',
      warnings: []
      
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
          Ss : this.Ss,
          S1 : this.S1,
          R : this.R,
          h : this.h,
          siteClass : this.siteClass,
          category : this.category,
          type : this.type,
          TL : this.TL,
      }
      let obj = new Seismic(objData)
      
      return {
          //OUTPUT
          Cs : obj.Cs(),
          SDC : obj.SDC(),
      }
    },//DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.Ss < 0, title: "Ss cannot be negative"},
        {type: 'Parameters', status: this.S1 < 0, title: "S1 cannot be negative"},
        {type: 'Parameters', status: this.R < 0, title: "R cannot be negative"},
        {type: 'Parameters', status: this.h < 0, title: "h cannot be negative"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>