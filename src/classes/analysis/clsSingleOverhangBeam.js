import {concat, range, forEach, zipWith, split, map, toNumber, findIndex, first, last, compact, filter} from 'lodash'

export default class SingleOverhangBeam {
    constructor({ L=20, Lo=1, E=29000, I=100, w=1,  PL=[]}){
        this.L = L
        this.Lo = Lo
        this.E = E
        this.I = I
        this.w = w  //UNIFORM LOAD
        
        //POINT LOAD
        this.PL = PL
        this.inc = 0.25
    }

    Lx(){
        let arr1 = concat(range(0, this.L, this.inc), this.L)
        let arr2 = concat(range(this.L, this.L + this.Lo, this.inc), this.L + this.Lo)
        let arr = concat(arr1, arr2)

        return map(arr, x => x)
    }

    //POINT LOAD - CONVERT STRING TO ARRAY
    // PL(){
    //     let P = map(split(this.P,','), (x) => toNumber(x))
    //     let a = map(split(this.a,','), (x) => toNumber(x))

    //     return zipWith(P, a,(P,a)=>{
    //         return {P:P,a:a}
    //     })
    // }

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
        let Lo = this.Lo

        Ri = w*(Math.pow(L,2)-Math.pow(Lo,2))/(2*L)

        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            let b = L - Pi.a
            if(a <= L){
                Ri =  Ri + P*b/L
            }
            else{
                Ri =  Ri - P*(a-L)/L
            }
        }) 
        return Ri
    }//RR


    RR(){
        let Ri = 0
        let w = this.w
        let L = this.L
        let Lo = this.Lo

        Ri = w*(Math.pow(L+Lo,2))/(2*L)

        forEach(this.PL, (Pi,j)=>{
            let P = Pi.P
            let a = Pi.a
            if(a <= L){
                Ri =  Ri + P*a/L
            }
            else{
                Ri =  Ri + P*a/L
            }
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
        let Lo = this.Lo

        forEach(this.Lx(), (x,i) =>{
            if(x < L){
                Vi = w*(Math.pow(L,2)-Math.pow(Lo,2))/(2*L) - w*x
            }
            else{
                Vi = w*(Lo - (x - L))
            }
            
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
               
                if(x <= a){
                    Vi = Vi + P*Math.pow(b,2)/(2*Math.pow(L,3))*(a+2*L)
                }//IF
                else{
                    Vi = Vi + P*Math.pow(b,2)/(2*Math.pow(L,3))*(a+2*L) - P
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
        let L = this.L
        let Lo = this.Lo
        let w = this.w
       
        forEach(this.Lx(), (x,i) =>{
            if(x <= this.L){
                Mi = (w*x)*(Math.pow(L,2)-Math.pow(Lo,2)-x*L)/(2*L)
            }
            else{
                Mi = -w*(Math.pow(Lo-(x-L),2))/2
            }
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                
                if(a <= this.L){
                    if(x <= L){
                      if(x <= a){
                        Mi = Mi + P*b*x/L
                      }//IF
                      else{
                          Mi = Mi + P*b*x/L - P*(x-a)
                      }//ELSE
                    }
                    else{
                      Mi = Mi
                    }
                }//POINT LOAD IN SPAN PORTION
                else{
                  if(x <= L){
                    Mi = Mi - P*(a-L)*x/L
                  }
                  else{
                    Mi = Mi - P*(a-L)*((L+Lo-x)/Lo)
                  }
                }//POINT LOAD IN OVERHANG PORTION
            })//P LOOP
            M.push(Mi)
        })//X LOOP

        return M
    }

    //MAXIMUM MOMENT
    Mmax(){
        let arrM = filter(this.Mx(), x => x > 0)
        let maxVal = Math.max(...arrM)

        return maxVal > 0 ? maxVal : 0
    }

    Mc(){
      let arrM = filter(this.Mx(), x => x < 0)
      let maxVal = Math.min(...arrM)

      return maxVal < 0 ? maxVal : 0
    }

    //DISTANCE FROM LEFT SUPPORT TO MAXIMUM MOMENT
    xm(){
        let arrM = filter(this.Mx(), x => x > 0)
        let maxVal = Math.max(...arrM)
        let index = findIndex(arrM, x => x == maxVal)

        let arrX = this.Lx()

        return arrX[index]
    }

    xc(){
        let arrM = this.Mx()
        let arrX =  map(this.Lx(), (x,i) =>{
            if(arrM[i] > 0 && arrM[i+1] < 0){
                return x
            }
        })
        return first(compact(arrX))
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
        let L = this.L
        let Lo = this.Lo
        let w = this.w
        let E = this.E
        let I = this.I

        forEach(this.Lx(), (x,i) =>{
            if(x <= L){
                Di = w*x*1728*(Math.pow(L,4)-2*Math.pow(L,2)*Math.pow(x,2)+L*Math.pow(x,3)-2*Math.pow(Lo,2)*Math.pow(L,2)+2*Math.pow(Lo,2)*Math.pow(x,2))/(24*E*I*L)
            }
            else{
                Di = w*(x-L)*1728*(4*Math.pow(Lo,2)*L - Math.pow(L,3)+6*Math.pow(Lo,2)*(x-L)-4*Lo*Math.pow(x-L,2)+Math.pow(x-L,3))/(24*E*I)
            }
            
            forEach(this.PL, (Pi,j)=>{
                let P = Pi.P
                let a = Pi.a
                let b = L - a
                
                if(a <= L){
                  if(x <= a){
                    Di =  Di + (P*b*x*1728)*(Math.pow(L,2)-Math.pow(b,2)-Math.pow(x,2))/(6*E*I*L)
                  }//IF
                  else{
                    if(x <= L){
                      Di =  Di + (P*a*(L-x)*1728)*(2*L*x-Math.pow(x,2)-Math.pow(a,2))/(6*E*I*L)
                    }
                    else{
                      Di =  Di + (P*a*b*(x-L)*1728)*(L+a)/(6*E*I*L)
                    }
                  }//ELSE
                }//POINT LOAD IN SPAN PORTION
                else{
                  if(x <= L){
                    Di + Di + (P*a*x*1728)*(Math.pow(L,2)-Math.pow(x,2))/(6*E*I*L)
                  }//SPAN DEFLECTION
                  else{
                    Di + Di + (P*(x-L)*1728)*(2*a*L+3*a*(x-L)-Math.pow(x-L,2))/(6*E*I)
                  }//CANTILEVER DEFLECTION
                }//POINT LOAD IN CANTILEVER PORTION
            })//P LOOP
            D.push(Di)
        })//X LOOP

        return D
    }

    //MAXIMUM DEFLECTION
    Dmax(){
        return Math.max(...this.Dx())
    }
    Dc(){
        return last(this.Dx())
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
    lengthParams(){
        return{
            inc : this.inc,
            _ : " ",
            Lx : this.Lx(),
            //Vp : this.plotV()
        }
    }
    shearParams(){
        return{
            xv : this.xm(),
            _ : " ",
            Vx : this.Vx(),
            //Vp : this.plotV()
        }
    }
    flexureParams(){
        return{
            xm : this.xm(),
            xc : this.xc(),
            Mx : this.Mx(),
            //Mp : this.plotM()
        }
    }
    deflectionParams(){
        return{
            xd : this.xd(),
            _ : " ",
            Dx : this.Dx(),
            //Dp : this.plotD()
        }
    }
}//CLASS