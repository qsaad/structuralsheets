<template>
  <div>
    <label v-html="label">
    </label>
    <input 
      class="input-text" 
      type="text" 
      :value="value"
      @input="handleInput"
    />
  </div>
</template>
<script>
export default {
  name: "CustomTextBox",
  props: ['label','value'],
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
    handleInput(event) {
    this.$emit("input", event.target.value);
    }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  label {
  display: block;
}
  .input-text {
    padding: 3px;
    margin:10px 0;
    margin-left:10px;
    margin-right:10px;
    border: 2px solid #eee;
    border-radius:5px;
    width:100%;
    font-family:inherit;
    font-size: inherit;
  }
  input-text:focus{
    border: 2px solid #ccc;
  }
  /* html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  } */
</style>
