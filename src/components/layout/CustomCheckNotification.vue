<template>
  <div>
    <div class="notification is-6 has-text-centered mx-0 px-0 py-2 mt-0 mb-2 pointer mt-2" :class="checkClass" v-if="!showPercent" @click.prevent="showPercent = !showPercent">
      <span class="pr-1" v-html="title"></span>
      <span class="pr-1">:</span>
      <span class="pr-1">{{ formatValue(actual) }}</span>
      <span class="pr-1" v-html="symbol"></span>
      <span class="pr-1">{{ formatValue(allowable) }}</span>
      <span>{{ status }}</span>
    </div>
    <div class="notification is-6 has-text-centered mx-0 px-0 py-2 mt-0 mb-2 pointer" :class="checkClass" v-if="showPercent" @click.prevent="showPercent = !showPercent">
      <span class="pr-1" v-html="title"></span>
      <span class="pr-1">:</span>
      <span class="pr-1">{{ percentage }}</span>
     
    </div>    
  </div>
</template>

<script>
import { decimal } from "../../utils/mathLib";

export default {
  name: "CustomCheckNotification",
  components: {
   
  },
  mixins: [],
  props:{
    title:{type:String,default:''},
    actual:{type:Number,default:0},
    allowable:{type:Number,default:0},
    deci:{type:Number,default:0},
    unit:{type:String,default:''},
  },
  data() {
    return {
      showPercent: false
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    symbol(){
      return this.actual < this.allowable ? '<' : '>'
    },
    status(){
      return this.actual < this.allowable ? 'Ok' : 'Fail'
    },
    checkClass(){
      return this.actual <= this.allowable ? 'is-info' : 'is-danger is-dark'
    },
    percentage(){
      return (this.actual/this.allowable*100).toFixed(0) + '%'
    }
  }, //COMPUTED
  methods: {
    formatValue(val){
      return decimal(val, this.deci)
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  .pointer {cursor: pointer;}
</style>