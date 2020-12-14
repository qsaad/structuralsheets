import Masonry from './clsMasonry'
//import {masonryWallProperties} from '../../data/masonry/sectProp'

export default class MasonrySolidCapacity extends Masonry {
  constructor({fm=1500, b=8 , depth=8 , L= 12, stirrupSize="#3", stirrupSpa=0, stirrupLegs=1, rebarSize="#5", rebarQty=2, rebarCov=2, Pu=0,Vu=0,Mu=0}) {
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
    this.Pu = Pu
    this.Vu = Vu
    this.Mu = Mu

  }//CONSTRUCTOR


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

  a(){
      return (this.Ast()*this.Fy)/(0.8*this.fm*this.b)
  }

  Lub(){
    return Math.max(32*this.b, 120*Math.pow(this.b,2)/this.d())
  }

  Mcr(){
    return this.S * this.Fr()
  }

  //------------------------------------------------------
  //FLEXURE DESIGN
  //------------------------------------------------------
  a_req(){
    let k = Math.pow(this.d(),2) - (2*this.Mu)/(0.8*this.phi_f()*this.fm*this.b)
    return this.d() - Math.pow(k, 0.5)
  }

  Ast_req(){
    return 0.8*this.fm*this.b*this.a_req()/this.Fy
  }


  //------------------------------------------------------
  //FLEXURE CAPACITY
  //------------------------------------------------------
  fMn(){
    //return this.phi_f()
    return this.phi_f()*this.Ast()*this.Fy*(this.d() - this.a()/2)/12
  }//fMn

  //------------------------------------------------------
  //SHEAR DESIGN
  //------------------------------------------------------
  Vns_req(){
    return (this.Vu - this.phi_v()*this.Vnm())/this.phi_v()
  }

  s_req(){
    return 0.5*this.Asv()*this.Fy*this.d()/this.Vns_req()
  }

  //------------------------------------------------------
  //SHEAR CAPACITY
  //------------------------------------------------------
  Vnm(){
    return 2.25*this.Ag*Math.pow(this.fm, 0.5)
  }//MASONRY SHEAR CAPACITY

  Vns(){
    return 0.5*(this.Asv()/this.stirrupSpa)*this.Fy*this.d()
  }//STIRRUPS SHEAR CAPACITY

  fVn(){
    let Vn = Math.min(this.Vnm() + this.Vns(), 4*this.Asv()*Math.pow(this.fm,0.5))

    return this.phi_v()*Vn
  }//fVn

  //------------------------------------------------------
  //AXIAL CAPACITY
  //------------------------------------------------------
  h_r(){
      return this.L*12/this.r
  }

  fPn(){
    if(this.h_r() <= 99){
      return 0.8*(0.8*this.fm*(this.Ag-this.Ast())+this.Fy*this.Ast()*(1-Math.pow(((this.L*12)/(140*this.r)),2)))
    }
    else{
      return 0.8*(0.8*this.fm*(this.Ag-this.Ast())+this.Fy*this.Ast()*(Math.pow(((70*this.r)/(this.L*12)),2)))
    }
  }

}//CLASS