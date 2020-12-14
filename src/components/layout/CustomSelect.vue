<template>
  <div class="field">
    <label
      class="label is-small has-text-left has-text-weight-light"
      v-html="label"
    ></label>
    <div class="control">
      <div class="select is-small is-fullwidth">
        <slot></slot>
        <!-- <select :value="value" @input="$emit('input', $event.target.value)">
          <option v-for="(item, i) in items" :key="i">{{ item }}</option>
        </select> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "custom-select",
  props: {
    label: { type: String, required: true }
    //value: { type: String },
    //items: { type: Array }
  },
  data() {
    return {}; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {}, //COMPUTED
  methods: {} //METHODS
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
