<template>
	<custom-card 
    title="WOOD MODIFICATION FACTORS" 
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
			<custom-select :label="``">
				<select v-model="method">
          <option v-for="item in methodList">{{ item }}</option>
        </select>
			</custom-select>
		</template>

		<template v-slot:input-two>
			<custom-select :label="``">
				<select v-model="duration">
          <option v-for="item in durationList">{{ item }}</option>
        </select>
			</custom-select>
		</template>

		<template v-slot:input-three>
			<custom-select :label="``">
				<select v-model="moisture">
          <option v-for="item in moistureList">{{ item }}</option>
        </select>
			</custom-select>
		</template>

    <template v-slot:input-four>
			<custom-select :label="``">
				<select v-model="temperature">
          <option v-for="item in temperatureList">{{ item }}</option>
        </select>
			</custom-select>
		</template>

		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <div class="is-2 has-text-left">&phi;</div>
      <custom-property-tag :items="design.phi"></custom-property-tag>

      <div class="subtitle has-text-left">KF - Conversion</div>
      <custom-property-tag :items="design.KF"></custom-property-tag>

      <div class="subtitle has-text-left">TE - Time Effect</div>
      <custom-property-tag :items="design.TE"></custom-property-tag>
		</template>

		<template v-slot:output-two>
      <div class="notification is-success mx-1 px-1 py-1 mt-0 mb-2 has-text-centered is-light" >
        <span>{{ design.CD }}</span>
      </div>
		</template>

    <template v-slot:output-three>
      <custom-property-tag :items="design.CM"></custom-property-tag>
		</template>

    <template v-slot:output-four>
      <custom-property-tag :items="design.Ct"></custom-property-tag>
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

//CLASSES
import Wood from "../../classes/wood/clsWood";

export default {
  name: "WoodModificationFactors",
  components: {
   
  },
  mixins: [layoutMixin],
  data() {
    return {
      inputCards: [
        {slotName:'input-one', title:'METHOD'},
        {slotName:'input-two', title:'DURATION'},
        {slotName:'input-three', title:'MOISTURE'},
        {slotName:'input-four', title:'TEMPERATURE'}
      ],
      outputCards: [
        {slotName:'output-one', title:'FACTORS'},
        {slotName:'output-two', title:'CD'},
        {slotName:'output-three', title:'CM'},
        {slotName:'output-four', title:'Ct'},
      ],
      footerCards: [
        {slotName:'footer-one'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      methodList : ['ASD','LRFD'],
      method : 'ASD',
      durationList : ['DL','SL','LL','EL','WL','Impact'],
      duration : 'LL',
      moistureList : ['Dry','Wet'],
      moisture : 'Dry',
      temperatureList : ['<100','<125','<150'],
      temperature : '<100',
      
      warnings: []
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    design(){
      let objData = {
        method : this.method,
        duration : this.duration,
        moisture: this.moisture,
        temperature: this.temperature
      }
      let B = new Wood(objData)

      return{
        phi: B.phi(),
        KF: B.KF(),
        TE: B.TE(),
        CD: B.CD(),
        CM: B.CM(),
        Ct: B.Ct()
      }
    },//DESIGN
    generateWarnings(){
      this.warnings = [
        // {type: 'Length', status: this.L < 0, title: "L cannot be negative"},
      ]
    },//GENERATE WARNINGS

  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>