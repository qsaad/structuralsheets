import { decimal } from "../utils/mathLib"; 

export const beamAnalysisMixin =  {
    data(){
        return{
          L: 12,
          w: 1,
          Ix: 100,
          E: 29000,
          P: 0,
          a: 0,
          PL: [],
          editedPL: {id: 0,P: 0,a: 0},
          editedIndex: -1,
          warning: [],
        }
    },//DATA
    computed:{
      // sortedPL(){
      //   return this.PL.sort((a,b) => a.a - b.a)
      // }
    },
    methods:{
      // formatNumber(num, deci){
      //   return decimal(num, deci)
      // },
      // addPL(){
      //   let id = Math.floor(Math.random() * 10000)
      //   this.PL.push({id: id, P: this.P, a: this.a})
      //   this.P = 0
      //   this.a = 0
      // },
      // editPL(item){
      //   this.editedIndex = item.id
      //   this.editedPL = Object.assign({}, item)
      //   this.P = this.editedPL.P
      //   this.a = this.editedPL.a
      // },
      // cancelEdit(){
      //   this.P = 0
      //   this.a = 0
      //   this.editedIndex = -1
      //   this.editedPL = {id: 0, P: 0, a: 0}
      // },
      // updatePL(){
      //   let index = this.PL.findIndex(x => x.id == this.editedIndex)
      //   this.PL.splice(index, 1, {...this.editedPL, P: this.P, a: this.a})
      //   this.cancelEdit()
      // },
      // deletePL(item){
      //   let index = this.PL.findIndex(x => x.id == item.id)
      //   this.PL.splice(index,1)
      // }
     
      
    }//METHODS
}//EXPORT