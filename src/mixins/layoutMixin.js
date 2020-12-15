import ModuleLayout from "../components/layout/ModuleLayout.vue";
import InputGroup from "../components/layout/InputGroup"
import OutputValues from "../components/layout/OutputValues"
import OutputChecks from "../components/layout/OutputChecks"
import CalculationGroup from "../components/layout/CalculationGroup"

import CustomCard from "../components/layout/CustomCard.vue";
import CustomTextField from "../components/layout/CustomTextField.vue";
import CustomSelect from "../components/layout/CustomSelect.vue";

import CustomCheckNotification from "../components/layout/CustomCheckNotification"
import CustomValueNotification from "../components/layout/CustomValueNotification"
import CustomTextNotification from "../components/layout/CustomTextNotification"
import CustomInteractionNotification from "../components/layout/CustomInteractionNotification"
import CustomWarningMessages from "../components/layout/CustomWarningMessages"
import CustomPropertyTag from "../components/layout/CustomPropertyTag"
import CustomParamsList from "../components/layout/CustomParamsList"

export default{
  components: {
    ModuleLayout,
    InputGroup, OutputValues, OutputChecks, CalculationGroup,
    CustomCard, CustomTextField, CustomSelect,
    CustomCheckNotification, CustomValueNotification, CustomTextNotification, 
    CustomInteractionNotification, CustomWarningMessages, CustomPropertyTag, CustomParamsList
  },
  data(){
    return{
      inputCards: [
        {slotName:'input-one', title:'PARAMETER'},
        {slotName:'input-two', title:'PROPERTY'},
      ],
      outputCards: [
        {slotName:'output-one', title:'MOMENT'},
        {slotName:'output-two', title:'SHEAR'},
        {slotName:'output-three', title:'DEFLECTION'},
      ],
      footerCards: [
        {slotName:'footer-one'},
        {slotName:'footer-two'},
      ],
      inputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
      outputCardColumns:['is-half-mobile', 'is-one-third-tablet', 'is-one-quarter-desktop'],
    }//RETURN
  },// DATA
  created() {}, //CREATED
  mounted() {}, //MOUNTED
  watch: {}, //WATCH
  computed: {},//COMPUTED
  methods:{} //METHODS
}