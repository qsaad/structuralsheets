<template>
  <div>
    <div class="notification is-6 has-text-centered mx-0 px-0 py-2 mt-0 mb-2 pointer" :class="checkClass" v-if="!showPercent" @click.prevent="showPercent = !showPercent">
      <span class="pr-1" v-html="title"></span>
      <span class="pr-1">:</span>
      <span class="pr-1">{{ formatValue(actualOne/allowableOne) }}</span>
      <span class="pr-1">+</span>
      <span class="pr-1">{{ formatValue(actualTwo/allowableTwo) }}</span>
      <span class="pr-1" v-html="symbol"></span>
      <span class="pr-1">{{ formatValue(ratio) }}</span>
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
  name: "CustomInteractionNotification",
  components: {
   
  },
  mixins: [],
  props:{
    title:{type:String,default:''},
    actualOne:{type:Number,default:0},
    allowableOne:{type:Number,default:0},
    actualTwo:{type:Number,default:0},
    allowableTwo:{type:Number,default:0},
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
    ratio(){
      return this.actualOne/this.allowableOne +  this.actualTwo/this.allowableTwo
    },
    symbol(){
      return this.ratio < 1 ? '<' : '>'
    },
    status(){
      return this.ratio < 1 ? 'Ok' : 'Fail'
    },
    checkClass(){
      return this.ratio < 1 ? 'is-info' : 'is-danger'
    },
    percentage(){
      return (this.ratio*100).toFixed(0) + '%'
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