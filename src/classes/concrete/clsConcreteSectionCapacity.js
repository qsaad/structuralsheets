import Concrete from './clsConcrete'
import {rebar} from '../../utils/rebar'

export default class ConcreteSectionCapacity extends Concrete {
    constructor({ b=12 , h=12 , rebarSpa=0, rebarQty=2 , rebarSize="#5" , fc=3000, rebarCov=1.5,  stirrupSize="#3", stirrupSpa=12, noStirrupLegs = 2}) {
        super({ fc })
        this.b = rebarSpa == 0 ? b : 12
        this.h = h
        this.rebarSize = rebarSize
        this.rebarSpa = rebarSpa
        this.rebarQty = rebarQty
        this.Fy = 60000
        this.rebarCov = rebarCov
        this.stirrupSize = stirrupSize
        this.stirrupSpa = stirrupSpa
        this.noStirrupLegs = noStirrupLegs
    } // CONSTRUCTOR

    db(){
      return rebar(this.rebarSize).d   
    }//DIAMETER OF REBAR

    ds(){
      return rebar(this.stirrupSize).d   
    }//DIAMETER OF STIRRUP

    d(){
      if(this.rebarSpa == 0){
        return this.h - this.rebarCov - rebar(this.stirrupSize).d - rebar(this.rebarSize).d/2
      }
      else{
        return this.h - this.rebarCov - rebar(this.rebarSize).d/2
      }
    }//EFFECTIVE DEPTH

    Ast(){
      if(this.rebarSpa == 0){
        return rebar(this.rebarSize).A * this.rebarQty
      }
      else{
        return rebar(this.rebarSize).A*(12/this.rebarSpa) 
      }
    }//AREA OF TENSILE REINFORCING

    Asv(){
      return rebar(this.stirrupSize).A * this.noStirrupLegs
    }//AREA OF SHEAR REINFORCING

    Asmin(){
      let k1 = 3*Math.pow(this.fc,0.5)/(this.Fy)
      let k2 = 200/(this.Fy)
      return Math.min(k1,k2)*this.b*this.d()
    }//AREA OF MINIMUM FLEXURE REINFORCING

    a(){
        return (this.Ast()*this.Fy)/(0.85*this.fc*this.b)
    }

    b1(){
       return Math.max(0.85-((this.fc-4000)/1000)*0.05,0.65) 
    }

    c(){
        return this.a()/this.b1()
    }

    et(){
       return ((this.d()-this.c())/this.c())*0.003
    }

    phi(){
       return this.et() >= 0.005 ? 0.9 : 0.483 + 83.33*this.et() 
    }

    rho() {
      return this.Ast() / (this.b * this.d())
    } //rho
  
    rho_min() {
      return Math.max(3 * Math.pow(this.fc, 0.5) / this.Fy, 200 / this.Fy)
    } //rho_min
  
    rho_bal() {
      return 0.85 * this.b1() * (this.fc / this.Fy) * 87000 / (87000 + this.Fy)
    } //rho_bal
  
    rho_max() {
      return (0.003 + this.Fy / this.Es) / (this.rho_bal() / 0.008)
    } //rho_max

  
    fMn() {
      return this.phi()*this.Ast()*this.Fy*(this.d() - this.a()/2)/12000
    } // FLEXURAL CAPACITY

    Vc(){
      return 2*Math.pow(this.fc,0.5)*this.b*this.d()/1000
    }

    Vs(){
      return Math.min(this.Asv()*(this.Fy/1000)*this.d()/this.stirrupSpa, 8*Math.pow(this.fc,0.5)*this.b*this.d())
    }

    fVn(){
       //let Vc = 2*Math.pow(this.f c,0.5)*this.b*this.d()/1000
        //let Vs = Math.min(this.Asv()*(this.Fy/1000)*this.d()/this.stirrupSpa, 8*Math.pow(this.fc,0.5)*this.b*this.d())
      return this.phi_v*(this.Vc() + this.Vs())
    }

    clrSpa(){
      return (this.b-2*this.rebarCov-this.noStirrupLegs*this.ds()-this.rebarQty*this.db())/(this.rebarQty-1)
    }

    flexureParams(){
      return {
        d : this.d(),
        Ast : this.Ast(),
        Asmin : this.Asmin(),
        a : this.a(),
        b1 : this.b1(),
        c : this.c(),
        et : this.et(),
        phi : this.phi(),
        fMn : this.fMn()
      }
    }

    rebarParams(){
      return {
        rho : this.rho(),
        rho_bal : this.rho_bal(),
        rho_min : this.rho_min(),
        rho_max : this.rho_max(),
        Sb : this.clrSpa(),
      }
    }

    shearParams(){
      return {
        Asv : this.Asv(),
        phi : this.phi_v,
        Vc : this.Vc(),
        Vs : this.Vs(),
        Vn : this.Vc() + this.Vs(),
        fVn : this.fVn()
      }
      

    }

   

  } //CLASS