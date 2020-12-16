export const masonryMixin =  {
    data(){
        return{
          methodList:['ASD', 'LRFD'],
          method: 'ASD',
          thicknessList :[4,6,8,10,12],
          thickness : 8,
          rebarLocList :["Center","Edge"],
          rebarLoc: "Center",
          rebarSizeList :["#3","#4","#5","#6","#7","#8"],
          rebarSize: "#5",
          rebarGradeList : [40,60],
          rebarGrade : 60,
          rebarSpaList :[8,16,24,32,40,48,56,64,72],
          rebarSpa : 32,
          groutList: ["Solid", "Partial"],
          grout: "Partial",
          fm : 2000,
          height: 12,
          depthList :[8,16,24,32,40,48,56,64,72],
          depth : 8,
          rebarQty: 2,
          rebarCov: 2,
          anchorBoltDiaList:["1/2","5/8","3/4","1"],
          anchorBoltDia: "1/2",
          warnings: [],
        }
    },//DATA
    computed:{
      
    },
    methods:{
      anchorSize(size){
        switch (size){
          case '1/2':
            return {A:0.196,Ab:0.142, db:0.425}
            break
          case '5/8':
            return {A:0.307,Ab:0.226, db:0.536}
            break
          case '3/4':
            return {A:0.442,Ab:0.334, db:0.653}
            break
          case '7/8':
            return {A:0.601,Ab:0.462, db:0.767}
            break
          case '1':
            return {A:0.785,Ab:0.606, db:0.878}
            break
        }
      }//da
    }//METHODS
}//EXPORT