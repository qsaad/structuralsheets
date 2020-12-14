import Masonry from './clsMasonry'

export default class MasonryLapSplice extends Masonry {
    constructor({fm=1500, thickness=8 , rebarSize="#5", rebarSpa=32,rebarCov=2, rebarLoc="Center"}) {
        super({ fm })
        this.t = thickness - 0.375
        this.rebarSize = rebarSize
        this.rebarSpa = rebarSpa
        this.rebarLoc = rebarLoc
        this.rebarCov = rebarCov
        this.tf = 1.25

    } // CONSTRUCTOR


    db(){
      return this.rebar(this.rebarSize).d   
    }//DIAMETER OF REBAR

    d(){
      if(this.rebarLoc == "Center"){
        return this.t / 2
      }
      else{
          return this.t - this.tf - 0.5 - this.rebar(this.rebarSize).d/2
      }
    }//EFFECTIVE DEPTH

    clr_spa(){
      if(this.rebarLoc == "Edge"){
        console.log('CLR')
        return this.t - 2*this.rebarCov - 2*this.db()
      }
    }//CLEAR SPACING

    gamma(size){
      switch(size){
            case '#3':
                return 1
                break
            case '#4':
                return 1
                break
            case '#5':
                return 1
                break
            case '#6':
                return 1.3
                break
            case '#7':
                return 1.3
                break
            case '#8':
                return 1.5
                break
        }//SWITCH
    }//GAMMA

    g(){
      return this.gamma(this.rebarSize)
    }

    K(){
      if(this.rebarLoc == "Edge"){
        return Math.min(this.rebarCov, 9*this.db(), this.clr_spa())
      }
      else{
        return Math.min((this.t-this.db())/2, 9*this.db())
      }
    }

    Ld(){
      return (0.13*Math.pow(this.db(),2)*this.Fy*this.gamma(this.rebarSize))/(this.K() * Math.pow(this.fm, 0.5))
    }
   

   
   

  } //CLASS