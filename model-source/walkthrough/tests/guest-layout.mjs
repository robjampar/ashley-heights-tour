// Occupied guest-room routes, including the retained narrow doorway openings.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {Navigation} from '../src/navigation.js';
import {restrictNavigation} from './restrict-navigation.mjs';
const cfg=JSON.parse(fs.readFileSync(new URL('../../proposal/interiors/leisure/guest.json',import.meta.url)));
const native=process.env.GUEST_NAV,variant=process.env.GUEST_VARIANT??'compact';
const bytes=fs.readFileSync(native??new URL('../../output-proposed-compact/navigation.json',import.meta.url));
const base=JSON.parse(bytes),sourceSha256=createHash('sha256').update(bytes).digest('hex');
const removed=['Principal bed','Principal right drawers','Principal left bedside','Principal pine wardrobe','Principal television','Upstairs photo detail | Principal wardrobe','Upstairs photo detail | Principal narrow CD tower'];
const item=(name,box,top=4.2)=>({name,box,bottom:2.8,top});
const furniture=[item('guest bed',cfg.bed.envelope),item('south sliding wardrobe',cfg.wardrobe,5.17),...cfg.bedsides.map(b=>item('bedside',b)),item('TV console',cfg.tvConsole),item('reading chair',cfg.readingChair),item('reading table',cfg.readingTable),...cfg.curtains.map(b=>item('parked curtain',b,5.12)),item('plant pot',cfg.plant.footprint,3.16)];
const doors=[item('open entrance door',[9.184,4.53,9.272,5.248],4.89),item('open ensuite door',[9.08,6.403,9.797,6.537],4.89),item('open retained balcony door',[8.349,7.934,9.081,8.045],4.98)];
const states={ordinary:[],wardrobeUse:[item('person choosing clothes',[12.25,4.59,12.85,5.19])],reading:[item('reader feet',[10.16,7.09,10.84,7.61])],southBedOccupied:[item('person dressing beside bed',[12.38,4.83,12.98,5.43])],northBedOccupied:[item('person dressing beside bed',[12.35,7.37,12.95,7.97])]};
const results=[];
for(const[state,extra]of Object.entries(states)){
 const existing=base.obstacles.filter(o=>o.bottom<4.3&&o.top>2.84&&(native||!removed.some(p=>o.name.startsWith(p))));
 const nav=new Navigation({...base,obstacles:[...existing,...(native?[]:furniture),...doors,...extra],surfaces:base.surfaces.filter(s=>Math.abs(s.z-2.8)<.2)});
 nav.radius=.3;nav.segments=nav.segments.filter(s=>s.bottom<4.3&&s.top>2.84);
 const x0=8.0,y0=4.0,step=.015,nx=388,ny=317,point=i=>({x:x0+i%nx*step,y:y0+Math.floor(i/nx)*step,z:2.8});
 const crop=restrictNavigation(nav,[x0,y0,x0+(nx-1)*step,y0+(ny-1)*step],2.8);
 const free=new Uint8Array(nx*ny),seen=new Uint8Array(nx*ny);
 for(let i=0;i<free.length;i++){const p=point(i);free[i]=Math.abs((nav.support(p.x,p.y,2.8)??99)-2.8)<.02&&!nav.blocked(p.x,p.y,2.8);}
 function nearest(x,y){let best=-1,d=Infinity;for(let i=0;i<free.length;i++)if(free[i]){const p=point(i),v=Math.hypot(p.x-x,p.y-y);if(v<d){d=v;best=i;}}return{index:best,distance:d};}
 const origin=nearest(9.58,4.25);assert(origin.distance<.04,'hall approach blocked');const queue=[origin.index];seen[origin.index]=1;
 for(let q=0;q<queue.length;q++){const i=queue[q],p=point(i),ix=i%nx,iy=Math.floor(i/nx);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=ix+dx,y=iy+dy,j=x+y*nx;if(x<0||y<0||x>=nx||y>=ny||seen[j]||!free[j])continue;const t=point(j);nav.position={...p};nav.move(t.x-p.x,t.y-p.y);if(Math.hypot(nav.position.x-t.x,nav.position.y-t.y)<.001){seen[j]=1;queue.push(j);}}}
 let targets=[['south bedside',12.85,5.01],['north bedside',12.85,7.85],['ensuite entrance',8.79,6.86],['balcony approach',9.65,8.33],['balcony doorway',9.08,8.375],['balcony landing',8.65,8.375],['window approach',11.98,8.20],['west wardrobe',10.65,4.99],['bed foot',11.1,6.4]];
 if(['wardrobeUse','southBedOccupied'].includes(state))targets=targets.filter(t=>t[0]!=='south bedside');
 if(state==='northBedOccupied')targets=targets.filter(t=>t[0]!=='north bedside');
 const checks=targets.map(([label,x,y])=>{const n=nearest(x,y);return{label,distance:n.distance,reachable:!!seen[n.index]};});
 results.push({state,bodyWidth:.6,crop,checks});console.log(JSON.stringify(results.at(-1)));
}
const status=results.every(r=>r.checks.every(c=>c.distance<.06&&c.reachable))?'PASS':'FAIL';
fs.writeFileSync(new URL('../../revisions/interiors-overnight-2026-09-27/guest/'+(native?'native-circulation-'+variant:'plan-circulation')+'.json',import.meta.url),JSON.stringify({status,variant,source:native??'plan fixtures',sourceSha256,southBedAisle:cfg.bed.envelope[1]-cfg.wardrobe[3],note:'A person using the wardrobe or dressing beside the bed occupies that side aisle; routes to the other side, ensuite and balcony are checked.',results},null,2)+'\n');
assert.equal(status,'PASS');
