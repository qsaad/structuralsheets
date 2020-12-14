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
      <div class="input-container px-2">
        <input-group title="PARAMETERS">
          <custom-text-field label="L (ft)">
            <input type="text" v-model="L" class="input is-small">
          </custom-text-field>
          <custom-select :label="`Level`">
            <select v-model="level">
              <option v-for="item in levelList">{{ item }}</option>
            </select>
          </custom-select>
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
      <div class="warning-container my-2 px-2">
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
        <div class="notification is-warning py-0 mx-2 mb-2" v-if="L < 0"> L cannot be negative</div>
      </div>
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- OUTPUT -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="output-container mt-4 px-2">
        <output-group title="STRENGTH" :items="output1"></output-group>
        <output-group title="STRENGTH" :items="output1"></output-group>
       <output-check title="STRESSES" :items="checks"></output-check>
      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- CALCULATION -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="calculation-container mt-4 px-2">
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
        <calculation-group title="STRENGTH" :items="output1"></calculation-group>
      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- GRAPHICS -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="graphics-container mt-4 px-2">
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
import OutputCheck from "../layout/OutputCheck"
import CalculationGroup from "../layout/CalculationGroup"

export default {
  name: "TemplateGrid",
  components: {
    InputGroup, OutputGroup, OutputCheck, CalculationGroup
  },
  mixins: [layoutMixin],
  data() {
    return {
      showCalculation: true,
      showGraphics: true,
      L: 20,
      K: 'L3 1/2x3 1/2x5/16',
      levelList:['HSS8x8x5/16', 'HSS6x6x5/16', 'HSS4x4x5/16', 'HSS2x2x5/16'],
      level:'HSS8x8x5/16',

      M: 100,
      V: 30,
      D: 0.234,
      output1:[
        {name:'&phi;M<sub>nx</sub>', value: 200, decimal: 0, unit: 'k-ft'},
        {name:'Vnx', value: 200, decimal: 0, unit: 'k'},
        {name:'Dx', value: 0.34, decimal: 2, unit: 'in'},
        {name:'Dy', value: 0.55, decimal: 2, unit: 'in'}
      ],
      checks:[
        {name:'Mnx', actual: 200, allowable: 220, decimal: 0, unit: 'k-ft'},
        {name:'Vnx', actual: 40, allowable: 35, decimal: 0, unit: 'k'},
        {name:'Dx', actual: 0.34, allowable: 0.50, decimal: 2, unit: 'in'},
        {name:'Dy', actual: 0.68, allowable: 0.55, decimal: 2, unit: 'in'}
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
/* .output-group-content {
  
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
} */

/* .input-group{
  padding-left: 10px;
  padding-right:10px;
} */

/* .output-group{
  padding-left: 10px;
  padding-right:10px;
} */
.title-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 1rem;
}
.input-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 1rem;
}
.warning-container{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
}
.output-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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