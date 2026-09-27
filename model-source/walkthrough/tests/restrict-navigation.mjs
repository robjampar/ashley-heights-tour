// Room tests query a bounded grid. Distant features cannot intersect those
// points; discard them only in the test copy, retaining a one-metre margin.
import assert from 'node:assert/strict';
export function restrictNavigation(nav,bounds,z){
 const margin=Math.max(1,nav.radius),[x0,y0,x1,y1]=bounds;
 const overlap=(b,pad=margin)=>b[2]>=x0-pad&&b[0]<=x1+pad&&b[3]>=y0-pad&&b[1]<=y1+pad;
 const box=points=>[Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))];
 const feature=o=>overlap(o.box??box(o.polygon));
 const probes=[];
 for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){
  const x=x0+(x1-x0)*i/20,y=y0+(y1-y0)*j/20;
  probes.push({x,y,blocked:nav.blocked(x,y,z),support:nav.support(x,y,z)});
 }
 const before={segments:nav.segments.length,obstacles:nav.data.obstacles.length,surfaces:nav.data.surfaces.length};
 nav.segments=nav.segments.filter(s=>overlap(box([s.a,s.b]),margin+s.thickness/2));
 nav.data={...nav.data,obstacles:nav.data.obstacles.filter(feature),surfaces:nav.data.surfaces.filter(feature),ramps:(nav.data.ramps??[]).filter(feature)};
 if(nav.data.streetContext?.enabled)nav.data.streetContext={...nav.data.streetContext,obstacles:nav.data.streetContext.obstacles.filter(feature)};
 for(const p of probes){assert.equal(nav.blocked(p.x,p.y,z),p.blocked,'room crop changed collision');assert.equal(nav.support(p.x,p.y,z),p.support,'room crop changed floor support');}
 return {before,after:{segments:nav.segments.length,obstacles:nav.data.obstacles.length,surfaces:nav.data.surfaces.length},equivalentProbes:probes.length,margin};
}
