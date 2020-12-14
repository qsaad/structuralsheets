<template>
	<custom-card 
    title="MASONRY LAP SPLICE" 
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
      <custom-text-field :label="`fm (psi)`">
				<input v-model.number="fm" class="input is-small">
      </custom-text-field>
		</template>

    <template v-slot:input-two>
      <custom-select :label="`Rebar Spacing`">
				<select v-model.number="rebarSpa">
          <option v-for="(item, i) in rebarSpaList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-select :label="`Rebar Location`">
				<select v-model.number="rebarLoc">
          <option v-for="(item, i) in rebarLocList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
      <custom-text-field :label="`Cover (in)`" v-if="rebarLoc == 'Edge'">
				<input v-model.number="rebarCov" class="input is-small">
      </custom-text-field>
		</template>

		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <table class="table is-bordered is-striped is-narrow is-hoverable is-clickable mt-3" @click="showTable = !showTable" :class="[{ 'is-fullWidth': showTable }]">
        <tr class="title is-6 has-background-white-ter">
          <td class="">Rebar</td>
          <td v-if="showTable">db</td>
          <td v-if="rebarLoc == 'Edge' && showTable">Clr Spa</td>
          <td v-if="showTable">K</td>
          <td v-if="showTable">&gamma;</td>
          <td v-if="showTable">L<sub>act<sub></td>
          <td v-if="showTable">L<sub>min<sub></td>
          <td v-if="showTable">L<sub>max<sub></td>
          <td>L<sub>d<sub> </td>
        </tr>
        <tr v-for="item in rebarSizeList">
          <td>{{item}}</td>
          <td v-if="showTable">{{design(item).db}}</td>
          <td v-if="rebarLoc == 'Edge' && showTable">{{design(item).clr_spa}}</td>
          <td v-if="showTable">{{design(item).K}}</td>
          <td v-if="showTable">{{design(item).gamma}}</td>
          <td v-if="showTable">{{design(item).Ld}}</td>
          <td v-if="showTable">12</td>
          <td v-if="showTable">{{72*design(item).db}}</td>
          <td class="has-background-info-light has-text-black has-text-weight-bold">{{spliceLength(design(item).Ld,12,72*design(item).db)}}</td>
        </tr>
      </table>

		</template>

    
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
		
		</template>
		
	</custom-card>
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"
import {masonryMixin} from "../../mixins/masonryMixin"

import MasonryLapSplice from '../../classes/masonry/clsMasonryLapSplice'

import {clamp, decimal} from '../../utils/mathLib'

export default {
  name: "MasonryLintel",
  components: {
   
  },
  mixins: [layoutMixin, masonryMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'GEOMETRY'},
        {slotName:'input-two', title:'REINFORCING'},
      ],
      outputCards: [
        {slotName:'output-one', title:'REBAR LAP SPLICES'}
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-half-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-full-desktop'],
      showTable: false,
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    
   
  }, //COMPUTED
  methods: {
    design(rebarSize){
      let objData = {
        rebarSize: rebarSize,
        thickness: this.thickness,
        fm: this.fm,
        rebarSpa: this.rebarSpa,
        rebarLoc: this.rebarLoc,
        rebarCov: this.rebarCov,
      }

      let obj = new MasonryLapSplice(objData)

      return{
        db: obj.db(),
        clr_spa: obj.clr_spa(),
        K: obj.K(),
        gamma: obj.g(),
        Ld: obj.Ld().toFixed(2)
      }
    },// DESIGN

    spliceLength(num, min, max){
      let val = parseFloat(clamp(num, min, max))

      return decimal(val, 0)
    }
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  table{
    width:100%;
  }
</style>