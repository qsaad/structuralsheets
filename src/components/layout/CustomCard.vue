<template>
	<div class="container fluid">
		<div class="card">
			<!-- HEADER -->
			<div class="card-header has-background-primary ">
				<div class="card-header-title title is-4 is-capitalized" v-html="title"></div>
			</div>
			<!-- CARD-CONTENT-START -->
			<div class="card-content">
				<!-- INPUT-START -->
				<div class="columns is-mobile is-multiline is-centered">
          <div class="column" :class="[cardLayout.inputMobile, cardLayout.inputTablet, cardLayout.inputDesktop]"
						v-for="(item,i) in inputCards" :key="i">
						<div class="subtitle is-6 mb-1 has-text-weight-bold">
							{{ item.title }}
						</div>
						<slot :name="item.slotName"></slot>
					</div>
				</div>
				<!-- INPUT-END -->
				<!-- OUTPUT-START -->
				<div class="columns is-mobile is-multiline is-centered">
					<div class="column" :class="[cardLayout.outputMobile, cardLayout.outputTablet, cardLayout.outputDesktop]"
						v-for="(item,j) in outputCards" :key="j">
						<div class="subtitle is-6 mb-0 has-text-weight-bold">
							{{ item.title }}
						</div>
						<slot :name="item.slotName"></slot>
					</div>
					<slot name="footer"></slot>
				</div>
				<!-- OUTPUT-END -->
			</div>
			<!-- CARD-CONTENT-END -->
			<!-- CARD-FOOTER-START -->
			<div class="card-footer">
				<div class="card-footer-item" v-for="item in footerCards">
					<slot :name="item.slotName"></slot>
				</div>
			</div>
			<!-- CARD-FOOTER-END -->
		</div>
		<!-- CARD-END -->
	</div>
	<!-- CONTAINER-END -->
</template>
<script>
	export default {
  name: "custom-card",
  props: {
    title: { type: String, required: true },
    inputCards: { type: Array, required: true },
    outputCards: { type: Array, required: true },
    footerCards: { type: Array },
    inputCardColumns : { type: Array, default:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'] },
    outputCardColumns : { type: Array, default:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'] }
  },
  data() {
    return {}; //RETURN
  }, //DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {
    cardLayout(){
      return{
        inputMobile: this.inputCardColumns[0],
        inputTablet: this.inputCardColumns[1],
        inputDesktop: this.inputCardColumns[2],
        outputMobile: this.outputCardColumns[0],
        outputTablet: this.outputCardColumns[1],
        outputDesktop: this.outputCardColumns[2],
      }
    },
  }, //COMPUTED
  methods: {} //METHODS
}; //EXPORT DEFAULT
</script>

<style scoped></style>