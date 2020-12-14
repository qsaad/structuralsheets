<template>
	<custom-card 
    title="GRAVITY LOADS" 
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
      <custom-select :label="`Material`">
				<select v-model.number="material">
          <option v-for="(item, i) in MaterialList" :key="i">{{ item }}</option>
        </select>
			</custom-select>
			<custom-text-field :label="`Thickness (in)`">
				<input v-model.number="thickness" class="input is-small">
      </custom-text-field>
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- OUTPUT -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:output-one>
      <custom-value-notification
        title="W"
        :value= parseFloat(weight)
        :deci=2
        unit="psf"
      ></custom-value-notification>
		</template>
		
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<!-- FOOTER -->
		<!-- ++++++++++++++++++++++++++++++++++++++++++ -->
		<template v-slot:footer-one>
			
		</template>
		<template v-slot:footer-two>
			
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
        {slotName:'input-one', title:'Material'},
      
      ],
      outputCards: [
        {slotName:'output-one', title:'Weight'},
       
      ],
      footerCards: [
        {slotName:'footer-one'},
        {slotName:'footer-two'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      thickness: 0.75,
      MaterialList:['Cement board','Gypboard','Gypcrete','Mortar Bed','Plywood','Rigid Insulation','Tempered Glass','Tectum Deck' ],
      MaterialWeightList:[
        {name: 'Plywood', value: 0.4},
        {name: 'Gypboard', value: 0.5},
        {name: 'Gypcrete', value: 1.125},
        {name: 'Rigid Insulation', value: 0.1875},
        {name: 'Cement board', value: 0.4},
        {name: 'Tectum Deck', value: 0.25},
        {name: 'Tempered Glass', value: 2},
        {name: 'Mortar Bed', value: 1.5},
      ],
      material: 'Plywood'
     
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    weight(){
      
      let data =  this.MaterialWeightList.filter(item =>{
        return (item.name == this.material)
      })

      let wt = parseFloat(data[0].value) * (this.thickness/0.125)

      return wt.toFixed(2)
    }
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>