// Bound Retina/large-window cost, then reduce raster resolution only when
// sustained frame times need it. Geometry and materials remain intact.
export class RenderBudget {
 constructor({mobile=false,dpr=1,quality='auto'}={}){this.mobile=mobile;this.dpr=dpr;this.scale=1;this.frames=[];this.lastCheck=null;this.recoveryWindows=0;this.lastReduction=-Infinity;this.setQuality(quality);}
 setQuality(value){this.quality=['auto','detail','fast'].includes(value)?value:'auto';this.scale=1;this.recoveryWindows=0;this.lastReduction=-Infinity;this.reset();}
 ratio(width,height){const cap=this.quality==='detail'?2:this.quality==='fast'?1:this.mobile?1.25:1.5,pixels=this.quality==='detail'?5000000:this.quality==='fast'?1400000:this.mobile?1000000:3200000;return Math.min(this.dpr,cap,Math.sqrt(pixels/Math.max(1,width*height)))*this.scale;}
 reset(){this.frames.length=0;this.lastCheck=null;}
 sample(ms,time){
  if(this.quality==='detail')return false;
  if(!Number.isFinite(ms)||ms<1||ms>150)return false;
  if(this.lastCheck===null)this.lastCheck=time;
  this.frames.push(ms);if(time-this.lastCheck<2400)return false;
  const samples=this.frames.sort((a,b)=>a-b);this.frames=[];this.lastCheck=time;
  if(samples.length<24)return false;
  const median=samples[Math.floor(samples.length/2)],previous=this.scale;
  if(median>27){this.scale=Math.max(.65,Math.round((this.scale-.15)*100)/100);this.recoveryWindows=0;this.lastReduction=time;}
  else if(median<20&&time-this.lastReduction>10000){
   // A transient shader/reflection hitch must not leave the image permanently
   // soft. Recover gradually, with hysteresis to avoid resolution oscillation.
   if(++this.recoveryWindows>=3){this.scale=Math.min(1,Math.round((this.scale+.1)*100)/100);this.recoveryWindows=0;}
  }else this.recoveryWindows=0;
  return this.scale!==previous;
 }
}
