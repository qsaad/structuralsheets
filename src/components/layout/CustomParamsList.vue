<template>
   <div class="is-flex-direction-column">
      <div class="tags has-addons mb-1" v-for="(value, name, index) in items">
        <span class="tag is-primary is-small ml-1">{{name}}</span>
        <span class="tag is-light is-small mr-1">{{value}}</span> 
      </div>
  </div>
</template>

<script>
import { decimal } from "../../utils/mathLib";

export default {
  name: "CustomParamsList",
  components: {
   
  },
  mixins: [],
  props:{
    items:{type:Object,default:{}},
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