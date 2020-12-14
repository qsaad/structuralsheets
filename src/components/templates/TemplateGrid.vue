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
        <div class="input-group">
          <div class="input-group-title subtitle is-5 my-0">One</div>
          <div class="input-group-content">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-title subtitle is-5 my-0">One</div>
          <div class="input-group-content">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-title subtitle is-5 my-0">One</div>
          <div class="input-group-content">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-title subtitle is-5 my-0">One</div>
          <div class="input-group-content">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </div>
        </div>

         <div class="input-group">
          <div class="input-group-title subtitle is-5 my-0">One</div>
          <div class="input-group-content">
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
            <custom-text-field label="L (ft)">
              <input type="text" v-model="L" class="input is-small">
            </custom-text-field>
          </div>
        </div>
     
      </div>
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
      <div class="output-container">
        <div class="output-group">
          <div class="output-group-title subtitle is-5 my-0">FLEXURE</div>
          <div class="output-group-content">

            <div class="value-output mb-2">
              <span class="has-background-info has-text-white px-2" style="min-width : 50px;">M</span>
              <span class="has-background-link-light is-flex-grow-1">{{M}}</span>
              <span class="has-background-primary px-2" style="min-width : 30px;">k-ft</span>
            </div>

            <div class="value-output mb-2">
              <span class="has-background-info px-2 has-text-white px-2" style="min-width : 50px;">C</span>
              <span class="has-background-link-light is-flex-grow-1">{{M}}</span>
              <span class="has-background-primary px-2" style="min-width : 30px;">k-ft</span>
            </div>

          </div>
        </div>  

        <div class="output-group">
          <div class="output-group-title subtitle is-5 my-0">SHEAR</div>
          <div class="output-group-content">
            
            <div class="value-output is-flex mb-2">
              <span class="has-background-info px-2" style="min-width : 50px;">M</span>
              <span class="has-background-link-light is-flex-grow-1">{{M}}</span>
              <span class="has-background-primary px-2" style="min-width : 30px;">k-ft</span>
            </div>

            <div class="value-output is-flex mb-2">
              <span class="has-background-info px-2" style="min-width : 50px;">Moment</span>
              <span class="has-background-link-light is-flex-grow-1">{{M}}</span>
              <span class="has-background-primary px-2" style="min-width : 30px;">k-ft</span>
            </div>

          </div>
        </div>  

        <div class="output-group">
          <div class="outut-group-title subtitle is-5 my-0">DEFLECTION</div>
          <div class="output-group-content">
            <custom-value-notification
              title="M<sub>x</sub>"
              :value= parseFloat(D)
              :deci=2
              unit="in"
            ></custom-value-notification>
          </div>
        </div> 

      </div>  
      <!-- +++++++++++++++++++++++++++++++++ -->
      <!-- GRAPHICS -->
      <!-- +++++++++++++++++++++++++++++++++ -->
      <div class="graphics-container">
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 10"> GRAPHICS-10</div>
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 20"> GRAPHICS-20</div>
        <div class="notification is-link py-0 mx-2 mb-2" v-if="L > 30"> GRAPHICS-30</div>
      </div>
      
    </div>
  <!-- MODULE-CONTAINER -->
</template>

<script>
import layoutMixin from "../../mixins/layoutMixin"

import CustomTextBox from "../layout/CustomTextBox"

export default {
  name: "TemplateGrid",
  components: {
    CustomTextBox
  },
  mixins: [layoutMixin],
  data() {
    return {
      L: 20,

      M: 100,
      V: 30,
      D: 0.234,
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

.graphics-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 1rem;
}


</style>