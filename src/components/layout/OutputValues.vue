<template>
  <div class="mx-3">
    <div class="subtitle is-4 my-0 pb-2" v-html="title"></div>
    <div class="output-content subtitle is-4">
      <div class="output-value mb-2" v-for="item in items">
        <span class="start-radius has-background-info has-text-white px-2" style="min-width : 70px;" v-html="item.name"></span>
        <span class="has-background-link-light has-text-weight-bold is-flex-grow-1">{{ formatValue(item.value, item.decimal) }}</span>
        <span class="end-radius has-background-grey-lighter px-2" style="min-width : 60px;" v-html="item.unit"></span>
      </div>
    </div>
  </div>  
</template>

<script>
import { decimal } from "../../utils/mathLib";
export default {
  name: "OutputValues",
  props: {
    title:{type:String,default:''},
    items:{type:Array,default:[]},
  },
  data() {
    return {
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {
  }, //WATCH
  computed: {}, //COMPUTED
  methods: {
    formatValue(val, deci){
      return decimal(val, deci)
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
.output-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.output-value{
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  max-width: 250px;
  min-width: 225px;
  align-self: stretch;
  margin: auto;
  
}

.start-radius{
  border-radius: 3px 0 0 3px; /* top left, top right, bottom right, bottom left */
}

.end-radius{
  border-radius: 0 3px 3px 0; /* top left, top right, bottom right, bottom left */
}
</style>
