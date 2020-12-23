import {concat, range, forEach, zipWith, split, map, toNumber, findIndex, head, last, first, compact} from 'lodash'

export default class FixedBeam {
    constructor({ L=20, E=29000, I=100, w=1, PL=[]}){
        this.L = L
        this.E = E
        this.I = I
        this.w = w

         //POINT LOAD
         this.PL = PL

         this.inc = 0.25
    }

    Lx(){
        let arr = concat(range(0, this.L, this.inc),this.L)

        return map(arr, x => x.toFixed(4))
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
    RL(){
        let Ri = 0
        let w = this.w
        let L = this.L
        
        Ri = w*L/2
        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            let b = L - a
            Ri =  Ri + (P*Math.pow(b,2)*(3*a+b))/Math.pow(L,3)
        }) 
        return Ri
    }//RR


    RR(){
        let Ri = 0
        let w = this.w
        let L = this.L
        
        Ri = w*L/2
        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            let b = L - a
            Ri =  Ri + (P*Math.pow(a,2)*(a+3*b))/Math.pow(L,3)
        }) 
        return Ri
    }//RR

    
    //---------------------------------------------------
    //SHEAR
    //---------------------------------------------------
    
    Vx(){
        let V = []
        let Vi = 0
        let w = this.w
        let L = this.L

        forEach(this.Lx(), (x,i) =>{
            Vi = w*(L/2 - x)
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
               
                if(x <= a){
                    Vi =  Vi + P*b/L
                }//IF
                else{
                    Vi =  Vi + P*b/L - P
                }//ELSE
            })//P LOOP
            V.push(Vi.toFixed(4))
        })//X LOOP

        return V
    }

    Vmax(){
        let V = map(this.Vx(), (x)=> Math.abs(x))
        return Math.max(...V)
    }

    VL(){
        let arr = this.Vx()
        return parseFloat(head(arr))
    }

    VR(){
        let arr = this.Vx()
        return parseFloat(last(arr))
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
            Mi = w/12*(6*L*x - Math.pow(L,2) - 6*Math.pow(x,2))
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                
                if(x <= a){
                    Mi = Mi + (P*Math.pow(b,2)*(3*a+b)*x)/Math.pow(L,3) - P*a*Math.pow(b,2)/Math.pow(L,2)
                }//IF
                else{
                    Mi = Mi + (P*Math.pow(b,2)*(3*a+b)*x)/Math.pow(L,3) - P*a*Math.pow(b,2)/Math.pow(L,2) - P*(x-a)
                }//ELSE
            })//P LOOP
            M.push(Mi.toFixed(4))
        })//X LOOP

        return M
    }

    //MAXIMUM MOMENT
    Mmax(){
        return Math.max(...this.Mx())
    }

    MC(){
      return Math.max(...this.Mx())
    }

    ML(){
        let arr = this.Mx()
        return parseFloat(head(arr))
    }

    MR(){
        let arr = this.Mx()
        return parseFloat(last(arr))
    }

    //DISTANCE FROM LEFT SUPPORT TO MAXIMUM MOMENT
    xm(){
        let index = findIndex(this.Mx(), (x) => x == this.Mmax())
        let arr = this.Lx()

        return parseFloat(arr[index])
    }

    xc(){
        let arrM = this.Mx()
        let arrX =  map(this.Lx(), (x,i) =>{
            if(arrM[i] < 0 && arrM[i+1] > 0){
                return x
            }
        })
        return parseFloat(first(compact(arrX)))
    }

    xcr(){
        let arrM = this.Mx()
        let arrX =  map(this.Lx(), (x,i) =>{
            if(arrM[i] > 0 && arrM[i+1] < 0){
                return x
            }
        })
        return parseFloat(last(compact(arrX)))
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
            Di = (w*Math.pow(x,2)*Math.pow(L-x,2)*1728)/(24*E*I)
            
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                if(x <= a){
                    Di =  Di + (P*Math.pow(b,2)*Math.pow(x,2)*(3*a*L-3*a*x-b*x)*1728)/(3*E*I*Math.pow(L,3))
                    //Di =  Di + ((P*1728)/(6*E*I))*(Math.pow(b,2)*Math.pow(x,3)*(L+2*a)/Math.pow(L,3) - (3*a*Math.pow(b,2)*Math.pow(x,2))/Math.pow(L,2))
                }//IF
                else{
                    Di =  Di + ((P*1728)/(6*E*I))*(Math.pow(b,2)*Math.pow(x,3)*(L+2*a)/Math.pow(L,3) - (3*a*Math.pow(b,2)*Math.pow(x,2))/Math.pow(L,2) - Math.pow(x-a,3))
                }//ELSE
            })//P LOOP
            D.push(Di.toFixed(4))
        })//X LOOP

        return D
    }

    //MAXIMUM DEFLECTION
    Dmax(){
        return Math.max(...this.Dx())
    }

    DL(){
      return 0
    }

    DC(){
      return Math.max(...this.Dx())
    }

    DR(){
      return 0
    }

    //DISTANCE FROM LEFT SUPPORT TO MAXIMUM MOMENT
    xd(){
        let index = findIndex(this.Dx(), (x) => x == this.Dmax())
        let arr = this.Lx()

        return arr[index]
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