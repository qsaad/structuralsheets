<template>
   <div class="is-flex is-block is-flex-wrap-wrap">
      <div class="tags has-addons mb-1" v-for="(value, name, index) in items">
        <span class="tag is-info is-small ml-1">{{name}}</span>
        <span class="tag is-light is-small mr-1">{{value}}</span> 
      </div>
  </div>
</template>

<script>
import { decimal } from "../../utils/mathLib";

export default {
  name: "CustomPropertyTag",
  components: {
   
  },
  mixins: [],
  props:{
    items:{type:Array,default:[]},
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

</style>