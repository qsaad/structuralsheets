import {concat, range, forEach, zipWith, split, map, toNumber, findIndex, last, first, head} from 'lodash'

export default class CantileverBeam {
    constructor({ L=20, E=29000, I=100, w=1,PL=[]}){
        this.L = L
        this.E = E
        this.I = I
        this.w = w

        //POINT LOAD
        this.PL = PL
        // this.P = P  //POINT LOAD STRING
        // this.a = a  //POINT LOAD DISTANCES STRING

        this.inc = 0.25
        
    }//CONSTRUCTOR

    Lx(){
        let arr = concat(range(0, this.L, this.inc),this.L)

        return map(arr, x => x)
    }

    //LOADING DIAGRAM
    plotL(){
        return map(this.PL, (item)=>{
            return {x:item.a,y:item.P}
        })
    }

    //---------------------------------------------------
    //REACTION
    //---------------------------------------------------
    RR(){
        let Ri = 0
        let w = this.w
        let L = this.L
        
        Ri = w*L
        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            Ri =  Ri + P
        }) 
        return Ri
    }//RR

    RL(){
      return 0
    }

    //---------------------------------------------------
    //SHEAR
    //---------------------------------------------------
    
    Vx(){
        let V = []
        let Vi = 0
        let w = this.w
        let L = this.L

        forEach(this.Lx(), (x,i) =>{
            Vi = -w*x
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                if(x <= a){
                    Vi = Vi 
                }//IF
                else{
                    Vi = Vi - P
                }//ELSE
            })//P LOOP
            //V.push(Vi.toFixed(4))
            V.push(Vi)
        })//X LOOP

        return V
    }

    Vmax(){
        let arr = this.Vx()
        return last(arr)
    }

    VL(){
        let arr = this.Vx()
        return head(arr)
    }

    VR(){
        let arr = this.Vx()
        return last(arr)
    }

    VC(){
      return 0
    }
   
    plotV(){
        return zipWith(this.Lx(), this.Vx(),(x,V)=>{
            return {x:x,y:V}
        })
    }

    //---------------------------------------------------
    //FLEXURE
    //---------------------------------------------------
    Mx(){
        let M = []
        let Mi = 0
        let w = this.w
        let L = this.L
       
        forEach(this.Lx(), (x,i) =>{
            Mi = - w*Math.pow(x,2)/2
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a

                if(a == 0){
                  Mi = Mi - P*x
                }
                else{
                  if(x <= a){
                    Mi = Mi 
                    //Mi = Mi - P*(a-x)
                  }//IF
                  else{
                      Mi = Mi - P*(x-a)
                  }//ELSE
                }
                
            })//P LOOP
            //M.push(Mi.toFixed(4))
            M.push(Mi)
        })//X LOOP

        return M
    }

    //MAXIMUM MOMENT
    Mmax(){
        let arr = this.Mx()
        return last(arr)
    }

    ML(){
      return 0
    }

    MC(){
      return 0
    }

    MR(){
      let arr = this.Mx()
      return last(arr)
    }

    xm(){
      return 0
    }

    xc(){
      return 0
    }

    xcr(){
      return 0
    }

    //FLEXURE PLOT COORDINATE (X,M)
    plotM(){
        return zipWith(this.Lx(), this.Mx(),(x,M)=>{
            return {x:x,y:M}
        })
    }
     //---------------------------------------------------
    //DEFLECTION
    //---------------------------------------------------
   
    Dx(){
        let D = []
        let Di = 0
        let w = this.w
        let L = this.L
        let E = this.E
        let I = this.I

        forEach(this.Lx(), (x,i) =>{
            Di = w*1728*(Math.pow(x,4)-4*Math.pow(L,3)*x+3*Math.pow(L,4))/(24*E*I)
            
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                if(a == 0){
                  Di =  Di + (P*(2*Math.pow(L,3) - 3*Math.pow(L,2)*x+Math.pow(x,3))*1728)/(6*E*I)
                }
                else{
                  if(x <= a){
                    Di =  Di + (P*Math.pow(b,2)*1728*(3*L-3*x-b))/(6*E*I)
                  }//IF
                  else{
                      Di =  Di + (P*Math.pow(L-x,2)*1728*(3*b-L+x))/(6*E*I)
                  }//ELSE
                }
                
            })//P LOOP
            //D.push(Di.toFixed(4))
            D.push(Di)
        })//X LOOP

        return D
    }

    //MAXIMUM DEFLECTION
    Dmax(){
        let arr = this.Dx()
        return first(arr)
    }
    
    DL(){
      return this.Dmax()
    }

    DC(){
      return 0
    }

    DR(){
      return 0
    }

    xd(){
      return 0
    }

    //DEFLECTION PLOT COORDINATE (X,D)
    plotD(){
        return zipWith(this.Lx(), this.Dx(),(x,D)=>{
            return {x:x,y:D}
        })
    }

    //---------------------------------------------------
    //PARAMETERS
    //---------------------------------------------------
    params(){
      return{
        Lx: this.Lx(),
        Mmax: this.Mmax(),
        ML: this.ML(),
        MC: this.MC(),
        MR: this.MR(),
        Mx: this.Mx(),
        xm: this.xm(),
        xc: this.xc(),
        xcr: this.xcr(),
        RL: this.RL(),
        RR: this.RR(),
        VL: this.VL(),
        VR: this.VR(),
        VC: this.VC(),
        Vx: this.Vx(),
        Dmax: this.Dmax(),
        DL: this.DL(),
        DC: this.DC(),
        DR: this.DR(),
        Dx: this.Dx(),
        plotM: this.plotM(),
        plotV: this.plotV(),
        plotD: this.plotD(),
      }
    }

    lengthParams(){
        return{
            inc : this.inc,
            Lx : this.Lx(),
            //Vp : this.plotV()
        }
    }
    shearParams(){
        return{
            xv : this.xm(),
            Vx : this.Vx(),
            //Vp : this.plotV()
        }
    }
    flexureParams(){
        return{
            xm : this.xm(),
            Mx : this.Mx(),
            //Mp : this.plotM()
        }
    }
    deflectionParams(){
        return{
            xd : this.xd(),
            Dx : this.Dx(),
            //Dp : this.plotD()
        }
    }


}//CLASS