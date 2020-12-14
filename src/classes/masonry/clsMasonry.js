export default class Masonry {
    constructor({ fm = 1500}){
        //MASONRY
        this.fm = fm
        //STEEL
        this.Fy = 60000
        this.e_m = 0.0025
    }

    //CONCRETE MODULUS OF ELASTICITY (ksi)
    Em(){
        return 900*this.fm
    }
    //STEEL MODULUS OF ELASTICITY
    Es(){
        return 29000000
    }
    e_y(){
      return this.Fy/this.Es()
    }
    e_s(){
      return 1.5*this.e_y()
    }
    //ALLOWABLE BENDING STRESS
    Fb(){
        return 0.45*this.fm
    }
    //ALLOWABLE REBAR TENSILE STRESS
    Fs(){
        return 32000
    }
    //ALLOWABLE SHEAR STRESS
    Fv(){
        return Math.pow(this.fm, 0.5)
    }
    //ALLOWABLE BEARING STRESS
    Fbrg(){
        return 0.25*this.fm
    }
    //MODULUS OF RUPTURE
    Fr(){
        return 2.5*Math.pow(this.fm,0.5)
    }
    //MODULAR RATIO
    n(){
        return this.Es()/this.Em()
    }
    //BALANCED
    kb(){
        return this.Fb()/(this.Fb() + this.Fs()/this.n())
    }

    //STRENGTH DESIGN PARAMETERS
    phi_f(){
      return 0.9
    }//FLEXURE + AXIAL IN REINFORCED MASONRY

    phi_fu(){
      return 0.6
    }//FLEXURE + AXIAL IN UNREINFORCED MASONRY

    phi_v(){
      return 0.8
    }// SHEAR

    phi_brg(){
      return 0.6
    }//BEARING

    rho_max(){
      return (0.8*0.8*this.fm / this.Fy)*(this.e_m/(this.e_m + this.e_s()))
    }

     //MODULUS OD RUPTURE
    

    //REBAR SIZE
    rebar(size){
        switch (size){
            case '#3':
                return {Wt:0.376,d:0.375,A:0.11}
                break
            case '#4':
                return {Wt:0.668,d:0.5,A:0.20}
                break
            case '#5':
                return {Wt:1.043,d:0.625,A:0.31}
                break
            case '#6':
                return {Wt:1.502,d:0.75,A:0.44}
                break
            case '#7':
                return {Wt:2.044,d:0.875,A:0.6}
                break
            case '#8':
                return {Wt:2.67,d:1,A:0.79}
                break
            case '#9':
                return {Wt:3.40,d:1.128,A:1}
                break
            case '#10':
                return {Wt:4.303,d:1.27,A:1.27}
                break
            case '#11':
                return {Wt:5.313,d:1.41,A:1.56}
                break
            case '#14':
                return {Wt:7.65,d:1.693,A:2.25}
                break
            case '#18':
                return {Wt:13.6,d:2.257,A:4}
                break
        }//SWITCH
    }//REBAR SIZE
   

}//CLASS
