export const loadMixin =  {
    data(){
        return{
          
        }
    },//DATA
    computed:{
      DLF(){
        return this.method == 'ASD' ? 1 : 1.2
      },//DEAD LOAD FACTOR
      LLF(){
        return this.method == 'ASD' ? 1 : 1.6
      },//LIVE LOAD FACTOR
      WLF(){
        return this.method == 'ASD' ? 1 : 1.6
      },//WIND LOAD FACTOR
      ELF(){
        return this.method == 'ASD' ? 1 : 1.6
      },//EARTHQUAKE LOAD FACTOR
    },
    methods:{
      //FACTORED LOAD FOR ASD OR LRFD
      ULF({DL=0,LL=0,WL=0,EL=0,wt=0}){
        return this.DLF*DL + this.DLF*wt + this.LLF*LL + this.WLF*WL + this.ELF*EL
      },
      //UNFACTORED LOAD FOR SERVICEABILITY (DEFLECTION OR BEARING PRESSURE)
      ULS({DL=0,LL=0,WL=0,EL=0,wt=0}){
        return DL + wt + LL + WL + EL
      },
      PL(){

      },
      LC({DL=0,LL=0,WL=0,EL=0,wt=0,method='ASD'}){
        // if(method == 'ASD'){
        //   return[
        //     {name:'DL + LL', value: DL + LL },
        //     {name:'DL + 0.75LL + 0.75WL', value: DL + 0.75*LL + 0.75*WL},
        //     {name:'0.6DL + LL', value: DL + LL },
        //     {name:'DL + LL', value: DL + LL },
        //   ]
        // }
        // else{

        // }
       
      }
    }//METHODS
}//EXPORT