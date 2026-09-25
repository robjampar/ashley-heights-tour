// Two independent pointers: left movement pad and drag-to-look on the scene.
// No pointer lock or third-party control library is required.
export const coarsePointer = () => matchMedia('(pointer: coarse)').matches;

export class TouchControls {
 constructor(canvas, pad, thumb, onLook, onTap=()=>{}) {
  this.enabled=coarsePointer();this.active=false;this.axes={forward:0,right:0};
  this.movePointer=null;this.lookPointer=null;this.lookPoint=null;this.lookElement=null;this.lookGesture=null;this.sprinting=false;
  this.pad=pad;this.thumb=thumb;this.canvas=canvas;
  document.body.classList.toggle('touch-ui',this.enabled);
  const usable=e=>this.enabled&&this.active&&e.pointerType!=='mouse';
  const updateMove=e=>{
   const bounds=pad.getBoundingClientRect(),radius=bounds.width*.34;
   let dx=e.clientX-bounds.left-bounds.width/2,dy=e.clientY-bounds.top-bounds.height/2;
   const length=Math.hypot(dx,dy),scale=Math.min(1,radius/(length||1));dx*=scale;dy*=scale;
   this.sprinting=length>radius*(this.sprinting?1.08:1.28);
   pad.classList.toggle('sprinting',this.sprinting);
   pad.querySelector('.pad-label').textContent=this.sprinting?'Sprinting':'Push farther to sprint';
   const strength=Math.hypot(dx,dy)/radius;
   this.axes.forward=strength<.13?0:-dy/radius;
   this.axes.right=strength<.13?0:dx/radius;
   thumb.style.transform=`translate(${dx}px,${dy}px)`;
  };
  pad.addEventListener('pointerdown',e=>{
   if(!usable(e)||this.movePointer!==null)return;
   e.preventDefault();this.movePointer=e.pointerId;pad.setPointerCapture(e.pointerId);
   pad.classList.add('engaged');updateMove(e);
  });
  pad.addEventListener('pointermove',e=>{if(e.pointerId===this.movePointer){e.preventDefault();updateMove(e);}});
  const stopMove=e=>{if(e.pointerId===this.movePointer)this.resetMovement();};
  for(const event of ['pointerup','pointercancel','lostpointercapture'])pad.addEventListener(event,stopMove);
  canvas.addEventListener('pointerdown',e=>{
   if(!usable(e)||!this.claimLook(e.pointerId,canvas))return;
   e.preventDefault();this.lookPoint=[e.clientX,e.clientY];
   this.lookGesture={x:e.clientX,y:e.clientY,time:e.timeStamp,dragged:false};
   canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove',e=>{
   if(e.pointerId!==this.lookPointer||!this.lookPoint||!this.active)return;
   if(Math.hypot(e.clientX-this.lookGesture.x,e.clientY-this.lookGesture.y)>10)this.lookGesture.dragged=true;
   e.preventDefault();onLook(e.clientX-this.lookPoint[0],e.clientY-this.lookPoint[1]);
   document.getElementById('look-hint').hidden=true;
   this.lookPoint=[e.clientX,e.clientY];
  });
  const stopLook=e=>{
   if(e.pointerId!==this.lookPointer)return;
   const g=this.lookGesture;
   const tapped=e.type==='pointerup'&&this.active&&g&&!g.dragged&&e.timeStamp-g.time<=350&&Math.hypot(e.clientX-g.x,e.clientY-g.y)<=10;
   this.releaseLook(e.pointerId);
   if(tapped)onTap();
  };
  for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,stopLook);
  window.addEventListener('blur',()=>this.reset());
  window.addEventListener('resize',()=>this.reset());
  document.addEventListener('visibilitychange',()=>this.reset());
  pad.addEventListener('contextmenu',e=>e.preventDefault());
 }
 claimLook(id,element){if(!this.active||this.lookPointer!==null)return false;this.lookPointer=id;this.lookElement=element;return true;}
 releaseLook(id){if(id!==this.lookPointer)return;const element=this.lookElement;this.lookPointer=null;this.lookPoint=null;this.lookElement=null;this.lookGesture=null;if(element?.hasPointerCapture(id))element.releasePointerCapture(id);}
 resetMovement(){this.axes.forward=0;this.axes.right=0;this.movePointer=null;this.sprinting=false;this.thumb.style.transform='';this.pad.classList.remove('engaged','sprinting');this.pad.querySelector('.pad-label').textContent='Push farther to sprint';}
 reset(){
  const move=this.movePointer;this.resetMovement();this.releaseLook(this.lookPointer);
  if(move!==null&&this.pad.hasPointerCapture(move))this.pad.releasePointerCapture(move);
 }
 setActive(active){this.active=active;if(!active)this.reset();}
}
