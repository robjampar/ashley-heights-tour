// Bound Retina/large-window cost, then reduce raster resolution only when
// sustained frame times need it. Geometry and materials remain intact.
export class RenderBudget {
 constructor({mobile=false,dpr=1}={}){this.mobile=mobile;this.dpr=dpr;this.scale=1;this.frames=[];this.lastCheck=null;}
 ratio(width,height){const cap=this.mobile?1.25:1.5,pixels=this.mobile?1000000:3200000;return Math.min(this.dpr,cap,Math.sqrt(pixels/Math.max(1,width*height)))*this.scale;}
 reset(){this.frames.length=0;this.lastCheck=null;}
 sample(ms,time){
  if(!Number.isFinite(ms)||ms<1||ms>150)return false;
  if(this.lastCheck===null)this.lastCheck=time;
  this.frames.push(ms);if(time-this.lastCheck<2400)return false;
  const samples=this.frames.sort((a,b)=>a-b);this.frames=[];this.lastCheck=time;
  if(samples.length<24)return false;
  const median=samples[Math.floor(samples.length/2)],previous=this.scale;
  if(median>27)this.scale=Math.max(.65,Math.round((this.scale-.15)*100)/100);
  return this.scale!==previous;
 }
}
