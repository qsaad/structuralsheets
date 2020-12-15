<template>
  <div class="mx-3">
    <div class="subtitle is-4 my-0 pb-2" v-html="title"></div>
    <div class="output-check-content subtitle is-4">
      <div class="output-check-value mb-2" v-for="item in items">
        <span class="start-radius has-text-white px-2" :class="checkClass(item.actual, item.allowable)" style="min-width : 70px;" v-html="item.name"></span>
        <span class="has-text-white px-2" :class="checkClass(item.actual, item.allowable)" style="min-width : 70px;" v-html="`(${item.unit})`"></span>
        <span class="has-background-link-light has-text-weight-bold is-flex-grow-1">{{ formatValue(item.actual, item.decimal) }}</span>
        <span class="has-background-link-light is-flex-grow-1" v-html="symbol(item.actual, item.allowable)"></span>
        <span class="has-background-link-light has-text-weight-bold is-flex-grow-1">{{ formatValue(item.allowable, item.decimal) }}</span>
        <span class="icon end-radius" style="min-width : 40px; height: 30px" :class="checkClass(item.actual, item.allowable)">
          <i class="fas fa-check" v-if="item.actual <= item.allowable"></i>
          <i class="fas fa-times" v-else></i>
        </span>
      </div>
    </div>
  </div>  
</template>

<script>
import { decimal } from "../../utils/mathLib";
export default {
  name: "OutputCheck",
  props: {
    title:{type:String,default:''},
    items:{type:Array,default:[]},
  },
  data() {
    return {
      showPercent: false
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {
  }, //WATCH
  computed: {
    
  }, //COMPUTED
  methods: {
    symbol(actual, allowable){
      return actual <= allowable ? '<' : '>'
    },
    status(actual, allowable){
      return actual <= allowable ? 'Ok' : 'Fail'
    },
    checkClass(actual, allowable){
      return actual <= allowable ? 'has-background-info' : 'has-background-danger'
    },
   
    percentage(actual, allowable){
      return (actual/allowable*100).toFixed(0) + '%'
    },
    formatValue(val, deci){
      return decimal(val, deci)
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
.output-check-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.output-check-value{
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content:space-between;
  max-width: 400px;
  min-width: 350px;
  align-self: stretch;
  align-items: stretch;
  margin: auto;
}

.start-radius{
  border-radius: 3px 0 0 3px; /* top left, top right, bottom right, bottom left */
}

.end-radius{
  border-radius: 0 3px 3px 0; /* top left, top right, bottom right, bottom left */
}
</style>
