<template>
   <div>
          <div class="subtitle is-7 my-0 has-text-weight-bold" v-html="title"></div>
          <div class="input-content">
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
.input-content {
  max-width: 150px;
  margin: auto;
}

</style>
