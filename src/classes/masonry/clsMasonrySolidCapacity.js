import Masonry from './clsMasonry'
//import {masonryWallProperties} from '../../data/masonry/sectProp'

export default class MasonrySolidCapacity extends Masonry {
    constructor({fm=1500, b=8 , depth=8 , L= 12, stirrupSize="#3", stirrupSpa=0, stirrupLegs=1, rebarSize="#5", rebarQty=2, rebarCov=2, Pr=0, Vr=0, Mr=0}) {
        super({ fm })
        //SIZE
        this.b = b - 0.375
        this.h = depth
        this.L = L
        //FLEXURE REINFORCING
        this.rebarSize = rebarSize
        this.rebarQty = rebarQty
        this.rebarCov = rebarCov
        //SHEAR REINFORCING
        this.stirrupSize = stirrupSize
        this.stirrupSpa = stirrupSpa
        this.stirrupLegs = stirrupLegs
        //PROPERTIES
        this.Ag = this.b * this.h
        this.Ig = this.b * Math.pow(this.h, 3)/12
        this.S = this.b * Math.pow(this.h, 2)/6
        this.r = Math.pow(this.Ig/this.Ag, 0.5)
        this.wt = this.b * this.h * 135 / 144
        //this.wt = masonryWallProperties(this.b, "Solid", 0).wt * ( this.h /12 )
        //LOADS
        this.Pr = Pr
        this.Vr = Vr
        this.Mr = Mr
  
    } // CONSTRUCTOR

    //--------------------------------------
    //FLEXURE CAPACITY
    //--------------------------------------

    db(){
      return this.rebar(this.rebarSize).d   
    }//DIAMETER OF REBAR

    d(){
      return this.h - this.rebarCov - this.rebar(this.rebarSize).d/2
    }//EFFECTIVE DEPTH

    Ast(){
      return this.rebar(this.rebarSize).A * this.rebarQty
    }//AREA OF TENSILE REINFORCING

    Asv(){
        return this.rebar(this.stirrupSize).A * this.stirrupLegs 
    }//AREA OF SHEAR REINFFORCING

    rho(){
      return this.Ast()/(this.b*this.d())
    }//PERCENTAGE OF FLEXURE REINFORCING

    np(){
      return this.rho()*this.n()
    }

    k(){
      //let m = this.rho()*this.n();
      return Math.pow(2*this.np()+this.np()*this.np(),0.5)-this.np();
    }


    j(){
      return 1-this.k()/3;
    }

    //ACTUAL TENSILE STRESS IN REBAR
    fs1(){
      let m = this.n()*this.Fb()*((1-this.k())/this.k())
      
       return m < this.Fs() ? m : this.Fs()
    }

    //FLEXURE CAPACITY DUE TO MASONRY COMPRESSION
    Mm() {
      return 0.5*this.Fb()*this.k()*this.j()*this.b*Math.pow(this.d(),2)/12
    }
  
    //FLEXURAL CAPACITY TO REBAR TENSION
    Ms() {
      return this.Ast()*this.Fs()*this.j()*this.d()/12
    } 
  
    //CMU CAPACITY 
    Mc() {
      return Math.min(this.Mm(), this.Ms())
    } 

    flexureParams(){
        return{
          wt: this.wt,
          b: this.b.toFixed(2),
          d: this.d().toFixed(3),
          Ast: this.Ast().toFixed(2),
          n: this.n().toFixed(2),
          Em: this.Em().toFixed(0),
          Fb: this.Fb().toFixed(0),
          Fs: this.Fs().toFixed(0),
          Fbrg: this.Fbrg(),
          rho: this.rho().toFixed(4),
          np: this.np().toFixed(4),
          k: this.k().toFixed(3),
          j: this.j().toFixed(3),
          Fs: this.Fs().toFixed(0),
          fs1: this.fs1().toFixed(0),
          Mm: this.Mm().toFixed(0),
          Ms: this.Ms().toFixed(0),
          Mc: this.Mc().toFixed(0)
        }//RETURN
    }//FLEXURE PARAMS

    //--------------------------------------
    //AXIAL CAPACITY
    //--------------------------------------
    h_r(){
      return this.L*12/this.r
    }
    Fa() {
      if(this.h_r() <= 99){
        return this.fm/4*(1-Math.pow((this.L*12)/(140*this.r),2))
      }
      else{
        return this.fm/4*(Math.pow((70*this.r)/(this.L*12),2))
      }
    } //Fa


    Pc() {
      return this.Fa()*this.Ag
    } //rho_min

    axialParams(){
      return{
        h_r : this.h_r().toFixed(3),
        Fa : this.Fa().toFixed(0),
        A : this.Ag,
        P : this.P()
      }
    }

    //--------------------------------------
    //SHEAR CAPACITY
    //--------------------------------------
    //MASONRY SHEAR CAPACITY
    M_Vd(){
      return this.Mr != 0 && this.Vr != 0 ? (this.Mr*12)/(this.Vr*this.d()) : 0
    }

    Fvm(){
      if(this.Pr == 0){
        return 0.5*2.25*Math.pow(this.fm, 0.5)
      }
      else{
        let k = (this.M_Vd() <= 0.25) ? 3 : (this.M_Vd() >= 1) ? 2 :  2/3*(5-2*this.M_Vd())

        return (k*Math.pow(this.fm, 0.5))+0.25*this.Pr/this.Ag
      }
    }//Fvm

    //SHEAR REINF CAPACITY
    Fvs(){
      if(this.stirrupSpa == 0){
        return 0
      }
      else{
        return 0.5*(this.Asv() * this.Fs()*this.d())/(this.Ag * this.stirrupSpa)
      }
    }//Fvs

    Vm(){
      return this.Fvm() * this.Ag
    }

    Vs(){
      if(this.stirrupSpa == 0){
        return 0
      }
      else{
        return 0.5*(this.Asv()/this.stirrupSpa)*this.Fy*this.d()
      }
    }

    //TOTAL SHEAR CAPACITY
    Vc(){
      return this.Vm() + this.Vs()
      //return (this.Fvs() + this.Fvm())*this.b * this.d()
    }//Vc

    shearParams(){
      return{
        Fvm : this.Fvm().toFixed(2),
        //Fvs : this.Fvs().toFixed(0),
        M_Vd: this.M_Vd().toFixed(2),
        Ag: this.Ag.toFixed(2),
        Vm: this.Vm().toFixed(0),
        Vs: this.Vs().toFixed(0),
        Asv : this.Asv().toFixed(2),
      }
    }

  } //CLASS