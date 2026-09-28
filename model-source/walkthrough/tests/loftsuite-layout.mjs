// Loft circulation includes measured roof clearance, not just a flat floor plan.
import fs from'node:fs';import assert from'node:assert/strict';
import{Navigation}from'../src/navigation.js';import{restrictNavigation}from'./restrict-navigation.mjs';
const root=new URL('../../',import.meta.url),variant=process.env.LOFTSUITE_VARIANT??'compact',z=5.55;
const cfg=JSON.parse(fs.readFileSync(new URL('proposal/interiors/leisure/loftsuite.json',root)));
const native=process.env.LOFTSUITE_NAV,base=JSON.parse(fs.readFileSync(native??new URL(`output-proposed-${variant}/navigation.json`,root)));
const exact=native?JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/loftsuite/${variant}/details-audit.json`,root))):null;
const survey=JSON.parse(fs.readFileSync(new URL(`revisions/interiors-overnight-2026-09-27/loftsuite/${variant}/headroom.json`,root)));
const measured=survey.areas.loftsuite,grid=new Map(measured.map(p=>[`${Math.round((p.x-7.58)*10)},${Math.round((p.y+13)*10)}`,p.height]));
function height(x,y){const gx=(x-7.58)*10,gy=(y+13)*10,ix=Math.floor(gx),iy=Math.floor(gy),tx=gx-ix,ty=gy-iy;const a=grid.get(`${ix},${iy}`),b=grid.get(`${ix+1},${iy}`),c=grid.get(`${ix},${iy+1}`),d=grid.get(`${ix+1},${iy+1}`);return[a,b,c,d].some(v=>v==null)?0:(1-ty)*(a*(1-tx)+b*tx)+ty*(c*(1-tx)+d*tx);}
const item=(name,box,top=z+1.5)=>({name,box,bottom:z,top});
function leaf(name,d,closed=false){const[hx,hy,hz]=d.hinge,[ax,ay]=d.axis,a=closed?0:d.openAngle,c=Math.cos(a),s=Math.sin(a),p=(u,v)=>{const x=ax*u-ay*v,y=ay*u+ax*v;return[hx+x*c-y*s,hy+x*s+y*c];};return{name,polygon:[p(0,-.065),p(d.width,-.065),p(d.width,.065),p(0,.065)],bottom:hz,top:hz+d.height};}
const furniture=[item('window pier planter',[12.0,-7.77,12.32,-7.45]),item('king bed',cfg.bed.envelope),...cfg.bedsides.map(b=>item('bedside',b)),item('wardrobe',cfg.wardrobe),...(cfg.includeEavesStorage?[item('eaves storage',cfg.eavesStorage)]:[]),item('vanity',cfg.vanity),item('WC',cfg.wcPan),item('cistern',cfg.cistern),item('fixed shower north glass',[11.30,-10.40,12.39,-10.38],z+1.9),item('fixed shower west glass',[11.29,-11.49,11.31,-11.17],z+1.9)];
const cases={ordinary:[],hallClosed:[],bathClosed:[],showerClosed:[],wardrobeUse:[item('person at wardrobe',[9.8,-6.61,10.4,-6.01])],basinUse:[item('person at basin',[10,-10.56,10.6,-9.96])],eavesDrawer:[item('open eaves drawer',[8.88,-8.55,9.20,-7.95],z+.85)]};
if(!cfg.includeEavesStorage)delete cases.eavesDrawer;
const reports=[];
for(const[state,extra]of Object.entries(cases)){
 const obstacles=base.obstacles.filter(o=>!/^Proposal \| Loft (bed|wardrobe|ensuite (shower|toilet|sanitary|vanity|basin|linen))/.test(o.name));
 const doors=exact?exact.doorSweeps.flatMap(d=>{const closed=state==='hallClosed'&&d.door.endsWith('| hall door')||state==='bathClosed'&&d.door.endsWith('| ensuite door')||state==='showerClosed'&&d.door.endsWith('| shower door');return d.poses[closed?'closed':'open'];}):[leaf('hall door',cfg.hallDoor,state==='hallClosed'),leaf('bath door',cfg.bathDoor,state==='bathClosed'),leaf('hip door',cfg.hipDoor),leaf('shower door',cfg.showerDoor,state==='showerClosed')];
 const segments=base.segments.filter(s=>!s.name.startsWith('Proposal | Loft ensuite shower'));
 const nav=new Navigation({...base,segments,obstacles:[...obstacles,...(native?[]:furniture),...doors,...extra]});nav.radius=.3;
 const x0=7.58,y0=-11.52,step=.02,nx=243,ny=313,point=i=>({x:x0+(i%nx)*step,y:y0+Math.floor(i/nx)*step,z});restrictNavigation(nav,[x0,y0,12.42,-5.25],z);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=height(p.x-.10,p.y)>2.00&&height(p.x+.10,p.y)>2.00&&Math.abs((nav.support(p.x,p.y,z)??99)-z)<.04&&!nav.blocked(p.x,p.y,z);}
 function nearest(x,y){let index=-1,distance=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),d=Math.hypot(x-p.x,y-p.y);if(d<distance){index=i;distance=d;}}return{index,distance};}
 const origin=nearest(...(state==='bathClosed'?[11.82,-10.00]:[11.80,-6.55]));assert(origin.distance<.05,`${state}: arrival ${origin.distance}`);const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['west bed side',9.30,-8.1],['east bed side',11.85,-8.1],['bed foot',10.35,-6.8],['wardrobe',10.1,-6.4],['eaves-side approach',9.3,-7.7],['bathroom arrival',11.83,-9.94],['vanity',10.3,-10.29],['WC approach',10.4,-10.34],['shower approach',10.92,-10.71],['inside shower',11.80,-10.97],['hip store doorway',9.37,-11.12]];
 if(state==='bathClosed')targets=targets.filter(t=>['bathroom arrival','vanity','WC approach','shower approach','inside shower','hip store doorway'].includes(t[0]));
 if(state==='showerClosed')targets=targets.filter(t=>t[0]!=='inside shower');
 if(state==='wardrobeUse')targets=targets.filter(t=>!['wardrobe','bed foot'].includes(t[0]));
 if(state==='basinUse')targets=targets.filter(t=>!['vanity','WC approach','hip store doorway'].includes(t[0]));
 if(state==='eavesDrawer')targets=targets.filter(t=>!['west bed side','eaves-side approach'].includes(t[0]));
 const checks=targets.map(([label,x,y])=>{const p=nearest(x,y);return{label,distance:p.distance,reachable:!!seen[p.index],headroom:height(x,y)};});reports.push({state,bodyWidth:.6,headWidth:.2,minimumHeadroom:2.0,checks});console.log(JSON.stringify(reports.at(-1)));
}
const status=reports.every(r=>r.checks.every(c=>c.distance<.05&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL(`revisions/interiors-overnight-2026-09-27/loftsuite/plan-${variant}.json`,root),JSON.stringify({status,variant,gridStep:.02,reports},null,2)+'\n');assert.equal(status,'PASS');
