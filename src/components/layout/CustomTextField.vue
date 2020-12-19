<template>
  <div class="field">
    <label class="label is-small has-text-left has-text-weight-light" v-html="label">
    </label>
    
    <div class="control">
      <slot></slot>
      <!-- <input
        class="input is-small"
        type="text"
        :value="content"
        @input="$emit('input', $event.target.value)"
      > -->
    <!-- <input
      class="input is-small"
      type="text"
      ref="one"
      :value="value"
      @input="updateValue"
    /> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomTextField",
  props: ['label'],
  data() {
    return {
      
    }; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {
    // value:{
    //   immediate: true,
    //   handler(val){
    //     this.handleChange(val)
    //   }
    // }
  }, //WATCH
  computed: {}, //COMPUTED
  methods: {
    // updateValue() {
    //     //this.$emit('input', value);
    //     console.log(this.$refs.one.value)
    //     this.$emit('input', this.$refs.one.value);
    // }
  } //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped>
  html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
 *, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
  }
</style>
