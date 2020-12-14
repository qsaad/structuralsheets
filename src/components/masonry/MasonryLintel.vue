<template>
	<custom-card 
    title="MASONRY LINTEL DESIGN" 
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
      <custom-select :label="`Width (in)`">
				<select v-model.number="thickness">
          <option v-for="(item, i) in thicknessList" :key="`${i}-thk`">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Depth (in)`">
				<select v-model.number="depth">
          <option v-for="(item, i) in depthList" :key="`${i}-dpt`">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`fm (psi)`">
				<input v-model.number="fm" class="input is-small">
      </custom-text-field>
      <custom-select :label="`Method`">
				<select v-model="method">
          <option v-for="(item, i) in methodList" :key="`${i}-mth`">{{ item }}</option>
        </select>
			</custom-select>
		</template>

    <template v-slot:input-two>
      <custom-select :label="`Method`">
				<select v-model="method">
          <option v-for="(item, i) in methodList" :key="`${i}-mtd`">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`DL (lb/ft)`">
				<input v-model.number="DL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`LL (lb/ft)`">
				<input v-model.number="LL" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`L (ft)`">
				<input v-model.number="L" class="input is-small">
      </custom-text-field>
		</template>

		<template v-slot:input-three>
      <custom-select :label="`Rebar Size`">
				<select v-model.number="rebarSize">
          <option v-for="(item, i) in rebarSizeList" :key="`${i}-sz`">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Rebar Qty`">
				<input v-model.number="rebarQty" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`Cover (in)`">
				<input v-model.number="rebarCov" class="input is-small">
      </custom-text-field>
		</template>

    <template v-slot:input-four>
      <custom-select :label="`Stirrup Size`">
				<select v-model.number="stirrupSize">
          <option v-for="(item, i) in rebarSizeList" :key="`${i}-str`">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Stirrup Spa`">
				<input v-model.number="stirrupSpa" class="input is-small">
      </custom-text-field>
      <custom-text-field :label="`No Legs`">
				<input v-model.number="stirrupLegs" class="input is-small">
      </custom-text-field>
		</template>

		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
       <custom-check-notification
        title="M<sub>D+L</sub>"
        :actual= parseFloat(forces({DL:DLF*DL,LL:LLF*LL}).M)
        :allowable= parseFloat(design.M)
        :deci=0
      ></custom-check-notification>

      <div>fMn = {{design.fMn}}</div>
      <div>fVn = {{design.fVn}}</div>
      

      <custom-params-list :items="design.flexureParams"></custom-params-list>

		</template>

    <template v-slot:output-two>
      <custom-check-notification
        title="V<sub>D+L</sub>"
        :actual= parseFloat(forces({DL:DLF*DL,LL:LLF*LL}).V)
        :allowable= parseFloat(design.V)
        :deci=0
      ></custom-check-notification>

      <custom-params-list :items="design.shearParams"></custom-params-list>
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
     <custom-value-notification
        title="R<sub>DL</sub>"
        :value= parseFloat(forces({DL:DLF*DL}).RR)
        :deci=0
      ></custom-value-notification>
      <custom-value-notification
        title="R<sub>LL</sub>"
        :value= parseFloat(forces({LL:LLF*LL}).RR)
        :deci=0
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
import {loadMixin} from "../../mixins/loadMixin"

import MasonrySolidCapacity from '../../classes/masonry/clsMasonrySolidCapacity'
import MasonryStrengthCapacity from '../../classes/masonry/clsMasonryStrengthCapacity'

import SimpleBeam from '../../classes/analysis/clsSimpleBeam'
import {masonryWallProperties} from '../../data/masonry/sectProp'

export default {
  name: "MasonryLintel",
  components: {
   
  },
  mixins: [layoutMixin, masonryMixin, loadMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'GEOMETRY'},
        {slotName:'input-two', title:'UNFACTORED LOADS'},
        {slotName:'input-three', title:'REINFORCING'},
        {slotName:'input-four', title:'STIRRUPS'}
      ],
      outputCards: [
        {slotName:'output-one', title:'FLEXURE (lb-ft)'},
        {slotName:'output-two', title:'SHEAR (lb)'},
        {slotName:'output-three', title:'DEFLECTION (in)'},
        {slotName:'output-four', title:'REACTION (lb)'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      L: 6,
      DL: 500,
      LL: 500,
      wt: 0,
      stirrupSize: '#3',
      stirrupSpa: 0,
      stirrupLegs: 2,
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
        b: this.thickness,
        h: this.depth,
        fm: this.fm,
        rebarSize: this.rebarSize, 
        rebarQty: this.rebarQty, 
        rebarCov: this.rebarCov,
        stirrupSize: this.stirrupSize,
        stirrupSpa: this.stirrupSpa,
        stirrupLegs: this.stirrupLegs,
        Pr: 0,
        Mr: this.forces({DL:this.DL,LL:this.LL}).M,
        Vr: this.forces({DL:this.DL,LL:this.LL}).V,
        Mu: this.forces({DL:1.2*this.DL,LL:1.6*this.LL}).M,
        Vu: this.forces({DL:1.2*this.DL,LL:1.6*this.LL}).V * 1000,
      }

      let obj = new MasonrySolidCapacity(objData)

      let obj_s = new MasonryStrengthCapacity(objData)

      return {
        M: obj.Mc(),
        V: obj.Vc(),
        fMn: obj_s.fMn(),
        fVn: obj_s.fVn(),
        rho_max: obj_s.rho_max(),
        flexureParams: obj.flexureParams(),
        shearParams: obj.shearParams()
      }
    },// DESIGN
    generateWarnings(){
      this.warnings = [
        {type: 'Parameters', status: this.fm < 1500, title: "fm cannot be less than 1500"},
        {type: 'Parameters', status: this.L < 0, title: "L cannot be negative"},
        {type: 'Parameters', status: this.DL < 0, title: "DL cannot be negative"},
        {type: 'Parameters', status: this.LL < 0, title: "LL cannot be negative"},
        {type: 'Parameters', status: this.rebarQty < 1, title: "Rebar Qty cannot be less than 1"},
        {type: 'Parameters', status: this.rebarCov < 1.5, title: "Rebar Cover cannot be less than 1 1/2"},

      ]
    },//GENERATE WARNINGS
  }, //COMPUTED
  methods: {
    forces({DL=0, LL=0, WL=0}){
      let F = {}
      let D = {}

      //FIND SECTION AND DESTRUCTURE PROPERTIES IX IY and W
      let b = this.thickness - 0.375
      let h = this.depth
      let Ix = b *Math.pow(h, 3)/12
      let wt = masonryWallProperties(this.thickness, "Solid", 0).wt * ( h /12 )

      this.wt = wt
      //CREATE INPUT OBJECT FOR FORCES

      let objForce = {
        L: this.L,
        E: 900*this.fm,
        I: Ix, 
        w: (DL + wt) + LL , 
        P: [],
        a: []
      }
      //CREATE INPUT OBJECT FOR DEFLECTION
      let objDeflection = {
        L: this.L,
        E: 900*this.fm,
        I: Ix , 
        w: (DL + wt) + LL , 
        P: [],
        a: []
      }
      //INTANTIATE CLASS FOR SELECTED SPAN TYPE
      F = new SimpleBeam(objForce);
      D = new SimpleBeam(objDeflection);
      
      //RETURN FORCES AND DEFLECTIONS FOR SELECTED SPAN TYPE
      return {
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