import {concat, range, forEach, zipWith, split, map, toNumber, findIndex, filter, head, first, last, compact} from 'lodash'

export default class ProppedBeam {
    constructor({ L=20, E=29000, I=100, w=1, PL=[]}){
        this.L = L
        this.E = E
        this.I = I
        this.w = w  //UNIFORM LOAD
        
        //POINT LOAD
        this.PL = PL
        //INCREMENT
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

        Ri = 3/8*w*L
        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            let b = L - Pi.a
            Ri =  Ri + P*Math.pow(b,2)*(a+2*L)/(2*Math.pow(L,3))
        }) 
        return Ri
    }//RR


    RR(){
        let Ri = 0
        let w = this.w
        let L = this.L

        Ri = 5/8*w*L
        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            Ri =  Ri + P*a*(3*Math.pow(L,2)-Math.pow(a,2))/(2*Math.pow(L,3))
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
            Vi = 3/8*w*L-w*x
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
               
                if(x <= a){
                    Vi =  Vi + P*Math.pow(b,2)*(a+2*L)/(2*Math.pow(L,3))
                }//IF
                else{
                    Vi =  Vi + P*Math.pow(b,2)*(a+2*L)/(2*Math.pow(L,3)) - P
                }//ELSE
            })//P LOOP
            V.push(Vi)
        })//X LOOP

        return V
    }

    Vmax(){
        let V = map(this.Vx(), (x)=> Math.abs(x))
        return Math.max(...V)
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
            Mi = 3/8*w*L*x-w*Math.pow(x,2)/2
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                
                if(x <= a){
                    Mi =  Mi + P*Math.pow(b,2)*(a+2*L)*x/(2*Math.pow(L,3))
                }//IF
                else{
                    Mi =  Mi + P*Math.pow(b,2)*(a+2*L)*x/(2*Math.pow(L,3)) - P*(x-a)
                }//ELSE
            })//P LOOP
            M.push(Mi)
        })//X LOOP

        return M
    }

    //MAXIMUM SPAN MOMENT
    Mmax(){
      return Math.max(...this.Mx())
    }

    ML(){
      return 0
    }

    MC(){
      return Math.max(...this.Mx())
    }

    //MAXIMUM FIXED MOMENT
    MR(){
      let arrM = filter(this.Mx(), x => x < 0)
      let maxVal = Math.min(...arrM)

      return maxVal < 0 ? maxVal : 0
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
            if(arrM[i] > 0 && arrM[i+1] < 0){
                return x
            }
        })
        return parseFloat(first(compact(arrX)))
    }

    xcr(){
      return 0
    }

    //FLEXURE PLOT COORDINATE (X,M)
    plotM(){
        return zipWith(this.Lx(), this.Mx(),(x,M)=>{
            return {x:toNumber(x),y:M}
        })
    }

    //---------------------------------------------------
    //DEFLECTION
    //---------------------------------------------------
   
    Dx(){
        let D = []
        let Di = 0
        let L = this.L
        let w = this.w
        let E = this.E
        let I = this.I

        forEach(this.Lx(), (x,i) =>{
            Di = (w*x*(Math.pow(L,3)-3*L*Math.pow(x,2)+2*Math.pow(x,3))*1728)/(48*E*I)
            
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                if(x <= a){
                    Di =  Di + (P*Math.pow(b,2)*x*1728)*(3*a*Math.pow(L,2)-2*L*Math.pow(x,2)-a*Math.pow(x,2))/(12*E*I*Math.pow(L,3))
                }//IF
                else{
                    Di =  Di + (P*a*Math.pow(L-x,2)*1728)*(3*Math.pow(L,2)*x-Math.pow(a,2)*x-2*Math.pow(a,2)*L)/(12*E*I*Math.pow(L,3))
                }//ELSE
            })//P LOOP
            D.push(Di)
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