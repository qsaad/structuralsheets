<template>
	<custom-card 
    title="MASONRY" 
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
      <div class="subtitle-2 is-flex-column">
        <div>ASTM C90</div>
        <div>1900 psi</div>
        <div>Typically 55% solid</div>
        <div>Type I and II</div>
      </div>
      
		</template>

		<template v-slot:input-two>
      <div class="subtitle-2 is-flex-column">
        <div>ASTM C270</div>
        <div>Portland Cement</div>
        <div>Masonry Cement</div>
        <div>Type M - 2500 psi</div>
        <div>Type S - 1800 psi</div>
        <div>Type N - 750 psi</div>
        <div>Type O - 350 psi</div>
      </div>
		</template>

		<template v-slot:input-three>
      <div class="subtitle-2 is-flex-column">
        <div>ASTM C476</div>
        
      </div>
		</template>

		<template v-slot:input-four>
      <custom-text-field :label="`fm (psi)`">
				<input v-model.number="fm" class="input is-small">
      </custom-text-field>
       <custom-value-notification
        title="Em"
        :value= parseFloat(design.Em)
        :deci=0
        :sizeClass="is-medium"
        unit="psi"
      ></custom-value-notification>

      <custom-value-notification
        title="Fb"
        :value= parseFloat(design.Fb)
        :deci=0
        :sizeClass="is-medium"
        unit="psi"
      ></custom-value-notification>

      <custom-value-notification
        title="Fs"
        :value= parseFloat(design.Fs)
        :deci=0
        :sizeClass="is-medium"
        unit="psi"
      ></custom-value-notification>

      <custom-value-notification
        title="Fbrg"
        :value= parseFloat(design.Fbrg)
        :deci=2
        :sizeClass="is-medium"
        unit=""
      ></custom-value-notification>

      <custom-value-notification
        title="n"
        :value= parseFloat(design.n)
        :deci=2
        :sizeClass="is-medium"
        unit=""
      ></custom-value-notification>

      <custom-value-notification
        title="k_bal"
        :value= parseFloat(design.kb)
        :deci=3
        :sizeClass="is-medium"
        unit=""
      ></custom-value-notification>

      <custom-value-notification
        title="ey"
        :value= parseFloat(design.ey)
        :deci=5
        :sizeClass="is-medium"
        unit=""
      ></custom-value-notification>

      <custom-value-notification
        title="es"
        :value= parseFloat(design.es)
        :deci=5
        :sizeClass="is-medium"
        unit=""
      ></custom-value-notification>

		</template>
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- <template v-slot:output-one>
    
		</template> -->

    
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
		
		</template>
		
	</custom-card>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import {masonryWallProperties} from '../../data/masonry/sectProp'

// import MasonrySolidCapacity from '../../classes/masonry/clsMasonrySolidCapacity'
// import MasonrySectionCapacity from '../../classes/masonry/clsMasonrySectionCapacity'
// import SimpleBeam from '../../classes/analysis/clsSimpleBeam'

import Masonry from '../../classes/masonry/clsMasonry'

export default {
  name: "MasonryPier",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'BLOCK'},
        {slotName:'input-two', title:'MORTAR'},
        {slotName:'input-three', title:'GROUT'},
        {slotName:'input-four', title:'PROPERTIES'}
      ],
      outputCards: [
        //{slotName:'output-one', title:'FLEXURE (lb-ft)'},
        
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      fm: 2000
   
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData={
        fm: this.fm
      }

      let b = new Masonry(objData)

      return{
        Em: b.Em(),
        Fb: b.Fb(),
        Fs: b.Fs(),
        n: b.n(),
        Fbrg: b.Fbrg(),
        Fr: b.Fr(),
        kb: b.kb(),
        ey: b.e_y(),
        es: b.e_s()

      }
    }
  }, //COMPUTED
  methods: {
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>