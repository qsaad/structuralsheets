<template>
	<custom-card 
    title="MASONRY BEARING WALL" 
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
      <custom-text-field :label="`fm (psi)`">
				<input v-model.number="fm" class="input is-small">
      </custom-text-field>
      <custom-select :label="`Grout `">
				<select v-model="grout">
          <option v-for="(item, i) in groutList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Method`">
				<select v-model="method">
          <option v-for="(item, i) in methodList" :key="`${i}-mth`">{{ item }}</option>
        </select>
			</custom-select>
		</template>

		<template v-slot:input-two>
      <custom-select :label="`Thickness (in)`">
				<select v-model.number="thickness">
          <option v-for="(item, i) in thicknessList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Height (ft)`">
				<input v-model.number="height" class="input is-small">
      </custom-text-field>
		</template>

		<template v-slot:input-three>
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

		<template v-slot:input-four>
      <custom-text-field :label="`DL (lb/ft)`">
				<input v-model.number="DL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`LL (lb/ft)`">
				<input v-model.number="LL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`WL (psf)`">
				<input v-model.number="WL" class="input is-small">
      </custom-text-field>
		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-check-notification
        title="M<sub>WL</sub>"
        :actual= parseFloat(forces({WL:WLF*WL}).M)
        :allowable= parseFloat(design.M)
        :deci=0
      ></custom-check-notification>

      <custom-check-notification
        title="P<sub>D+L</sub>"
        :actual= parseFloat(forces({DL:DLF*DL,LL:LLF*LL}).P)
        :allowable= parseFloat(design.P)
        :deci=0
      ></custom-check-notification>
      {{design.b}}
      {{design.d}}
		</template>

    <template v-slot:output-two>
      <custom-check-notification
        title="V<sub>WL</sub>"
        :actual= parseFloat(forces({WL:WLF*WL}).V)
        :allowable= parseFloat(design.V)
        :deci=0
      ></custom-check-notification>
		</template>

		<template v-slot:output-three>
      <custom-check-notification
        title="&Delta;<sub>TL</sub>"
        :actual= parseFloat(forces({DL:DL,LL:LL}).D)
        :allowable= 0.375
        :deci=2
      ></custom-check-notification>
		</template>

    <template v-slot:output-four>
      <custom-interaction-notification
        title="I<sub>M</sub>"
        :actualOne= parseFloat(forces({WL:WLF*WL}).M)
        :allowableOne= parseFloat(design.M)
        :actualTwo= parseFloat(forces({DL:DLF*DL,LL:DLF*LL}).P)
        :allowableTwo= parseFloat(design.P)
        :deci=2
      ></custom-interaction-notification>
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
import {loadMixin} from "../../mixins/loadMixin"

import {masonryWallProperties} from '../../data/masonry/sectProp'

import MasonrySolidCapacity from '../../classes/masonry/clsMasonrySolidCapacity'
import MasonrySectionCapacity from '../../classes/masonry/clsMasonrySectionCapacity'
import SimpleBeam from '../../classes/analysis/clsSimpleBeam'

export default {
  name: "MasonryPier",
  components: {
   
  },
  mixins: [layoutMixin, masonryMixin, loadMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'MATERIAL'},
        {slotName:'input-two', title:'GEOMETRY'},
        {slotName:'input-three', title:'REINFORCING'},
        {slotName:'input-four', title:'LOADS'}
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE (lb-ft)'},
        {slotName:'output-two', title:'SHEAR (lb)'},
        {slotName:'output-three', title:'DEFLECTION (in)'},
        {slotName:'output-four', title:'INTERACTION'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      height: 20,
      DL: 500,
      LL: 500,
      WL: 20,
      wt: 0,
      
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
        V: obj.V(),
        P: obj.P(),
        b: obj.b(),
        d: obj.d()
      }
    },// DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.fm < 1500, title: "fm cannot be less than 1500"},
        {type: 'Parameters', status: this.height < 0, title: "L cannot be negative"},
        {type: 'Parameters', status: this.DL < 0, title: "DL cannot be negative"},
        {type: 'Parameters', status: this.LL < 0, title: "LL cannot be negative"},
      

      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {
    forces({DL=0, LL=0, WL=0}){
      let F = {}
      let D = {}

      //FIND SECTION AND DESTRUCTURE PROPERTIES IX IY and W
      let prop = masonryWallProperties(this.thickness, this.grout, this.rebarSpa)
    
      let Ix = prop.I
      let wt = prop.wt

      this.wt = wt
      //CREATE INPUT OBJECT FOR FORCES

      let objForce = {
        L: this.height,
        E: 900*this.fm,
        I: Ix, 
        w: WL , 
        P: [],
        a: []
      }

      //CREATE INPUT OBJECT FOR DEFLECTION
      let objDeflection = {
        L: this.height,
        E: 900*this.fm,
        I: Ix , 
        w: WL , 
        P: [],
        a: []
      }
      //INTANTIATE CLASS FOR SELECTED SPAN TYPE
      F = new SimpleBeam(objForce);
      D = new SimpleBeam(objDeflection);
      
      //RETURN FORCES AND DEFLECTIONS FOR SELECTED SPAN TYPE
      return {
        P: this.DLF*this.DL + this.LLF*this.LL + this.DLF*wt * this.height/2,
        M: F.Mmax(),
        V: F.Vmax(),
        RL: F.RL().toFixed(2),
        RR: F.RR().toFixed(2),
        D: D.Dmax(),
      }
    },//FORCES
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>