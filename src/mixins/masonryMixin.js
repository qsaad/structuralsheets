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
          warnings: [],
        }
    },//DATA
    computed:{
     
    },
    methods:{
       
    }//METHODS
}//EXPORT