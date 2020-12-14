<template>
	<custom-card 
    title="MASONRY SECTION CAPACITY" 
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
			<custom-select :label="`Thickness (in)`">
				<select v-model.number="thickness">
          <option v-for="(item, i) in thicknessList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Height (ft)`">
				<input v-model.number="height" class="input is-small">
      </custom-text-field>
		</template>
		<template v-slot:input-two>
      <custom-select :label="`Rebar Size`">
				<select v-model.number="rebarSize">
          <option v-for="(item, i) in rebarSizeList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Rebar Spacing (in)`">
				<select v-model.number="rebarSpa">
          <option v-for="(item, i) in rebarSpaList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Rebar Location `">
				<select v-model.number="rebarLoc">
          <option v-for="(item, i) in rebarLocList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		</template>
		<template v-slot:input-three>
      <custom-text-field :label="`fm (psi)`">
				<input v-model.number="fm" class="input is-small">
      </custom-text-field>
      <custom-select :label="`Grout `">
				<select v-model="grout">
          <option v-for="(item, i) in groutList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-value-notification
        title="M"
        :value= parseFloat(design.M)
        :deci=0
        unit="lb-ft"
      ></custom-value-notification>
		</template>
		<template v-slot:output-two>
      <custom-value-notification
        title="M"
        :value= parseFloat(design.P)
        :deci=0
        unit="lb"
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
import {masonryMixin} from "../../mixins/masonryMixin"

import MasonrySectionCapacity from '../../classes/masonry/clsMasonrySectionCapacity'

export default {
  name: "MasonrySectionCapacity",
  components: {
   
  },
  mixins: [layoutMixin, masonryMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'GEOMETRY'},
        {slotName:'input-two', title:'REINFORCING'},
        {slotName:'input-three', title:'STRENGTH'}
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE'},
        {slotName:'output-two', title:'AXIAL'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      
      
  
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
        thickness: this.thickness,
        height: this.height,
        fm: this.fm,
        rebarSize: this.rebarSize, 
        rebarSpa: this.rebarSpa, 
        rebarLoc: this.rebarLoc,
        grout: this.grout
      }

      let obj = new MasonrySectionCapacity(objData)

      return {
        M: obj.M(),
        P: obj.P(),
      }
    },// DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.height < 0, title: "Height cannot be negative"},
        {type: 'Parameters', status: this.fm < 1500, title: "fm cannot be less than 1500"},
      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {

  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>