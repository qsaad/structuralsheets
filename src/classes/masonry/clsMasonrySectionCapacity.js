import Masonry from './clsMasonry'
import {masonryWallProperties} from '../../data/masonry/sectProp'

import {find,toString} from 'lodash'

export default class WallCapacity extends Masonry {
    constructor({fm=1500, thickness=8 , height=12 , rebarSize="#5", rebarSpa=32, rebarLoc="Center", grout="Partial", Pr=0, Vr=0, Mr=0, type="Wall"}) {
        super({ fm })
        this.thickness = thickness
        this.t = thickness - 0.375
        this.h = height
        this.rebarSize = rebarSize
        this.rebarSpa = rebarSpa
        this.rebarLoc = rebarLoc
        this.grout = grout
        

        //this.prop = this.getPropData()
        this.prop = masonryWallProperties(thickness, grout, rebarSpa)
        this.tf = this.thickness <= 6 ? 1 : 1.25
        this.FST = this.tf
        this.tw = 0.75
        this.bw = 8.25

        this.Pr = Pr
        this.Vr = Vr
        this.Mr = Mr

        this.Ag = this.prop.A 
        this.Ig = this.prop.I 
        this.S = this.prop.S 
        this.r = this.prop.r
        this.wt = this.prop.wt
  
    } // CONSTRUCTOR


    propParams(){
      return{
        A : this.Ag, 
        Ig : this.Ig, 
        S : this.S,
        r : this.r, 
        wt: this.wt,
        tf : this.tf,
        tw : this.tw,
        bw : this.bw,
        Fb : this.Fb(),
        Fs : this.Fs(),
        n : this.n(),
        Em : this.Em(),
        Fr : this.Fr(),
        kb : this.kb()
      }
    }

    //--------------------------------------
    //FLEXURE CAPACITY
    //--------------------------------------

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

    b(){
        return Math.min(this.rebarSpa, 72, 6*this.t)
    }//EFFECTIVE COMPRESSIVE WIDTH

    Ast(){
      return this.rebar(this.rebarSize).A 
    }//AREA OF TENSILE REINFORCING


    rho(){
      return this.Ast()/(this.b()*this.d())
    }//PERCENTAGE OF FLEXURE REINFORCING


    k1(){
      let m = this.rho()*this.n();
      return Math.pow(2*m+m*m,0.5)-m;
    }

    k(){
      if(this.k1()*this.d() <= this.tf){
        return this.k1()
      }
      else{
      //   let n1 = -this.tf*(this.b()-this.bw)-this.Ast()*this.n()
      //   let n2 = this.tf*(this.b()-this.bw)+this.Ast()*this.n()
      //   let n3 = this.bw*(Math.pow(this.tf,2)*(this.b()-this.bw)+2*this.Ast()*this.n()*this.d())
      //   let d1 = this.d()*this.bw

      //   return n1/d1 + Math.pow(n2 + n3,0.5)/d1
      let rnb = this.rho()*this.n()*this.b()
      return (Math.pow((Math.pow(rnb, 2) + 2* rnb * this.bw), 0.5) - rnb)/this.bw
      }
      
    }

    j(){
      return 1-this.k()/3;
    }

    kd(){
      return this.k()*this.d()
    }

    Cf(){
      return this.b() * this.tf * this.Fb() *((2* this.kd() - this.tf)/this.kd())/2
    }
    Cw(){
      return this.bw*this.Fb()*Math.pow(this.kd()-this.tf, 2)/(2*this.kd())
    }
    Zf(){
      return (3*this.kd() - 2*this.tf)/(2*this.kd() - this.tf) * (this.tf/3)
    }
    jwd(){
      return this.d() - (2*this.tf + this.kd())/3
    }
    jfd(){
      return this.d() - this.Zf()
    }

    //ACTUAL TENSILE STRESS IN REBAR
    fs1(){
      let m = this.n()*this.Fb()*((1-this.k())/this.k())
      
       return m < this.Fs() ? m : this.Fs()
    }



    //FLEXURE CAPACITY DUE TO MASONRY COMPRESSION
    Mm() {
      if(this.k()*this.d() < this.tf){
        return 0.5*this.Fb()*this.k()*this.j()*this.b()*Math.pow(this.d(),2)/12
      }
      else{
        return this.Cf()*this.jfd()/12 + this.Cw()*this.jwd()/12
      }
      
    }
  
    //FLEXURAL CAPACITY TO REBAR TENSION
    Ms() {
      if(this.k()*this.d() < this.tf){
        return this.Ast()*this.Fs()*this.j()*this.d()/12
      }
      else{
        return this.Ast()*this.fs1()*this.jfd()/12
      }
      
    } 
  
    //CMU CAPACITY PER FT
    M() {
      return Math.min(this.Mm(), this.Ms())/(this.b()/12)
    } 

    flexureParams(){
      if(this.k()*this.d() < this.tf){
        return{
          b : this.b(),
          d : this.d(),
          Fb : this.Fb(),
          Ast : this.Ast(),
          rho : this.rho(),
          k1 : this.k1(),
          kd : this.kd(),
          k : this.k(),
          j : this.j(),
          Fs : this.Fs(),
          fs1 : this.fs1(),
          Mm : this.Mm(),
          Ms : this.Ms(),
          M : this.M()
        }//RETURN
      }//IF
      else{
        return{
          b : this.b(),
          d : this.d(),
          Ast : this.Ast(),
          rho : this.rho(),
          k1 : this.k1(),
          kd : this.kd(),
          k : this.k(),
          Cf : this.Cf(),
          Cw : this.Cw(),
          Zf : this.Zf(),
          jwd : this.jwd(),
          jfd : this.jfd(),
          Mm : this.Mm(),
          Ms : this.Ms(),
          M : this.M()
        }//RETURN
      }//ELSE
    }//FLEXURE PARAMS

    //--------------------------------------
    //AXIAL CAPACITY
    //--------------------------------------
    h_r(){
      return this.h*12/this.r
    }
    Fa() {
        if(this.h_r() <= 99){
          return this.fm/4*(1-Math.pow((this.h*12)/(140*this.r),2))
        }
        else{
          return this.fm/4*(Math.pow((70*this.r)/(this.h*12),2))
        }
    } //rho_bal


    P() {
      return this.Fa()*this.Ag
    } //rho_min

    axialParams(){
      return{
        h_r : this.h_r(),
        Fa : this.Fa(),
        A : this.Ag,
        P : this.P()
      }
    }

  
    //--------------------------------------
    //SHEAR CAPACITY
    //--------------------------------------
    Fvm(){
      return 2*Math.pow(this.fm, 0.5)
    }

    V(){
        return this.Fvm()*12*this.d()
    }


    shearParams(){
      return{
        b : 12,
        d : this.d(),
        Fvm : this.Fvm,
        V : this.V()
      }
    }
    

   

  } //CLASS