import Masonry from "./clsMasonry";
import { sin, sin_inv } from "../../utils/mathLib";

export default class MasonryAnchorBolt extends Masonry {
  constructor({fm = 1500, thickness = 8, da = 0.5, Fya = 36, lb = 4, lbe = 3.8125, location = "Top", method = "ASD"}) {
    super({ fm });
    this.t = thickness - 0.375;
    this.da = da;
    this.lb = lb;
    this.lbe = lbe;
    this.Fya = Fya * 1000;
    this.location = location;
    this.method = method;
    this.X = 0
    this.theta = 0
    this.phi_m = 0.5  //MASONRY STRENGTH REDUCTION FACTOR
    this.phi_s = 0.9  //STEEL STRENGTH REDUCTION FACTOR
  } // CONSTRUCTOR

  Ab() {
    //return (0.75 * Math.PI * Math.pow(this.da, 2)) / 4;
    return Math.PI * Math.pow(this.da, 2) / 4
  }
  //----------------------- //
  //TENSION
  //----------------------- //
  Apt(){
    if(this.lb > this.t/2){
      this.X = Math.pow(Math.pow(this.lb,2)-Math.pow(this.t/2,2), 0.5)
      this.theta = 2*sin_inv((this.t/2)/this.lb)
      return 2*this.X*this.t + Math.pow(this.lb,2)*((Math.PI*this.theta)/180 - sin(this.theta))
    }
    else{
      return Math.PI*Math.pow(this.lb,2)
    }
    
  }
  Bab(){
    let K = this.method == 'ASD' ? 1.25 : this.phi_m*4
    return K*this.Apt()*Math.pow(this.fm, 0.5)
  }
  Bas(){
    let K = this.method == 'ASD' ? 0.6 : this.phi_s
    return K*this.Ab()*this.Fya
  }
  T(){
    return Math.min(this.Bab(), this.Bas())
  }

  //----------------------- //
  //SHEAR
  //----------------------- //
  Apv(){
    return Math.PI*Math.pow(this.lbe,2)/2
  }

  Aptv(){
    return Math.PI*Math.pow(this.lb,2)
  }
  //MASONRY BREAKOUT
  Bvb(){
    let K = this.method == 'ASD' ? 1.25 : this.phi_m*4
    return K*this.Apv()*Math.pow(this.fm, 0.5)
  }
  //MASONRY CRUSHSING
  Bvc(){
    let K = this.method == 'ASD' ? 580 : this.phi_m*1750
    return K*Math.pow(this.fm*this.Ab(), 0.25)
  }
  //ANCHOR BOLT PRYOUT
  Bvp(){
    let K = this.method == 'ASD' ? 2.5 : this.phi_m*8
    return K*this.Aptv()*Math.pow(this.fm, 0.5)
  }
  //ANCHOR BOLT STEEL YIELDING
  Bvs(){
    let K = this.method == 'ASD' ? 0.36 : this.phi_s*0.6
    return K*this.Ab()*this.Fya
  }
  //SHEAR CAPACITY
  V(){
    return Math.min(this.Bvb(), this.Bvc(), this.Bvp(), this.Bvs())
  }

} //CLASS
