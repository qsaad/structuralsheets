<template>
  <div class="mx-3">
    <div class="subtitle is-5 my-0 pb-2" v-html="title"></div>
    <div class="calculation-content">
      <div class="calculation-value mb-2" v-for="item in items">
        <span class="has-background-primary has-text-white px-2" style="min-width : 50px;" v-html="item.name"></span>
        <span class="has-background-link-light is-flex-grow-1">{{ formatValue(item.value, item.decimal) }}</span>
        <span class="has-background-primary px-2" style="min-width : 30px;" v-html="item.unit"></span>
      </div>
    </div>
  </div>  
</template>

<script>
import { decimal } from "../../utils/mathLib";
export default {
  name: "CalculationGroup",
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
.calculation-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.calculation-value{
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  max-width: 150px;
  min-width: 125px;
  align-self: stretch;
  margin: auto;
}
</style>
