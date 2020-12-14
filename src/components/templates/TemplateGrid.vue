<template>
    <div class="module-container has-background-primary-light">
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- TITLE -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="title-container title is-3 has-background-info">
        MODULE NAME
      </div>
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- INPUT -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="input-container">
        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
        </input-group><!-- INPUT-GROUP -->

        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
        </input-group><!-- INPUT-GROUP -->

        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
        </input-group><!-- INPUT-GROUP -->

        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
        </input-group><!-- INPUT-GROUP -->
        
        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
        </input-group><!-- INPUT-GROUP -->
      </div><!-- INPUT-CONTAINER -->
      
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- WARNING -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="warning-container my-2">
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
      </div>
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- OUTPUT -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="output-container mt-4">
        <output-group title="STRENGTH" :items="output1"></output-group>
        <output-group title="STRENGTH" :items="output1"></output-group>
        <output-group title="STRENGTH" :items="output1"></output-group>
        <output-group title="STRENGTH" :items="output1"></output-group>
        <output-group title="STRENGTH" :items="output1"></output-group>
      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- CALCULATION -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="calculation-container mt-4">
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- GRAPHICS -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="graphics-container mt-4">
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 10"> GRAPHICS-10</div>
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 20"> GRAPHICS-20</div>
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 30"> GRAPHICS-30</div>
      </div>
      
    </div>
  <!-- MODULE-CONTAINER -->
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import InputGroup from "../layout/InputGroup"
import OutputGroup from "../layout/OutputGroup"
import CalculationGroup from "../layout/CalculationGroup"

export default {
  name: "TemplateGrid",
  components: {
    InputGroup, OutputGroup, CalculationGroup
  },
  mixins: [layoutMixin],
  data() {
    return {
      showCalculation: true,
      showGraphics: true,
      L: 20,

      M: 100,
      V: 30,
      D: 0.234,
      output1:[
        {name:'Mnx', value: 200, decimal: 0, unit: 'k-ft'},
        {name:'Vnx', value: 200, decimal: 0, unit: 'k'},
        {name:'Dx', value: 0.34, decimal: 2, unit: 'in'},
        {name:'Dy', value: 0.55, decimal: 2, unit: 'in'}
      ]
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
.output-group-content {
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
}
.value-output{
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  max-width: 200px;
}

.input-group{
  padding-left: 10px;
  padding-right:10px;
}

.output-group{
  padding-left: 10px;
  padding-right:10px;
}
.title-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.input-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.warning-container{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
}
.output-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.calculation-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.graphics-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1rem;
}
</style>