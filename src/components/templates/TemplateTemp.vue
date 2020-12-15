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
        </template>
      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- GRAPHICS -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="graphics-container mt-4 px-2">
        
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 10">
            <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
            <rect :x="50 + 40*i" :y="50 " :width="L" :height="L" fill="#dd6" v-for="i in 4"  stroke="#000" stroke-width="1"></rect>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 20">
            <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" v-if="L > 30">
            <rect width="300" height="300" fill="#fff" stroke="#000" stroke-width="1"></rect>
          </svg>
       
      </div>
      
    </div>
  <!-- MODULE-CONTAINER -->
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

// import InputGroup from "../layout/InputGroup"
// import OutputGroup from "../layout/OutputGroup"
// import OutputCheck from "../layout/OutputCheck"
// import CalculationGroup from "../layout/CalculationGroup"

export default {
  name: "TemplateGrid",
  components: {
    //InputGroup, OutputGroup, OutputCheck, CalculationGroup
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
  mounted() {
   
  }, //MOUNTED
  watch: {}, //WATCH
  computed: {
    
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
}
</style>