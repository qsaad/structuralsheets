<template>
   <div class="mx-3">
          <div class="subtitle is-5 my-0" v-html="title"></div>
          <div>
            <slot></slot>
        </div>
</template>

<script>

export default {
  name: "InputGroup",
  props: {
    title:{type:String,default:''},
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
  max-width: 150px;
  min-width: 125px;
  margin: auto;
}
</style>
