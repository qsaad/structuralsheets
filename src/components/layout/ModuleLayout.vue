<template>
  <div class="module-container has-background-primary-light">
    <div class="title-container title is-3 has-background-info">
      <slot name="header"></slot>
    </div>
    <div class="input-container px-2">
      <slot name="inputs"></slot>
    </div>
    <div class="warning-container my-2 px-2">
      <slot name="warnings"></slot>
    </div>
    <div class="output-container mt-4 px-2">
      <slot name="outputs"></slot>
    </div>  
    <div class="calculation-container mt-4 px-2">
      <slot name="calculations"></slot>
    </div>  
    <div class="graphics-container mt-4 px-2 pb-4">
      <slot name="graphics"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleLayout",
  components: {
   
  },
  props: {
    
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
   
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
.title-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 1rem;
}
.input-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  grid-gap: 1rem;
}
.warning-container{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0;
}
.output-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
.calculation-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
.graphics-container{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
}
</style>
