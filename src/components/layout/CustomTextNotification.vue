<template>
  <div>
    <div class="is-flex is-justify-content-center ">
       <div class="tags has-addons mb-1 mt-2">
          <span class="tag is-info ml-1" :class="sizeClass" v-html="title"></span>
          <span class="tag is-light has-text-weight-bold is-flex-grow-1" :class="sizeClass">{{ text }}</span> 
          <span class="tag is-light is-primary mr-1 has-text-weight-light" :class="sizeClass" v-html="unit" v-if="unit != ''"></span> 
      </div>
    </div>
    
  </div>
</template>

<script>
import { decimal } from "../../utils/mathLib";

export default {
  name: "CustomTextNotification",
  components: {
   
  },
  mixins: [],
  props:{
    title:{type:String,default:''},
    text:{type:String,default:''},
    unit:{type:String,default:''},
    sizeClass:{type:String,default:'is-large'},
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
  .tags{
  min-width: 250px;
  max-width: auto;
}

.tag:first-child {
  width: 50px;
}

.tag:last-child {
  width: 50px;
}
</style>