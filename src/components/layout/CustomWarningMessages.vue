<template>
  <div>
    <template v-for="(item,i) in messages" :key="i">
        <div class="notification is-warning is-block py-1 my-1" v-if="item.status">
          {{item.title}}
    </div>
  </div>
</template>

<script>
import { decimal } from "../../utils/mathLib";

export default {
  name: "CustomWarningMessages",
  components: {
   
  },
  mixins: [],
  props:{
    messages:{type:Array,default:[]},
  },
  data() {
    return {
      
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    
  }, //COMPUTED
  methods: {
    
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  .pointer {cursor: pointer;}
</style>