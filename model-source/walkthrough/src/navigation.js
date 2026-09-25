// Navigation coordinates use the editable model: x east, y north, z up, metres.
export function pointInPolygon(x,y,p) {
  let inside=false;
  for(let i=0,j=p.length-1;i<p.length;j=i++) {
    const [xi,yi]=p[i], [xj,yj]=p[j];
    if(((yi>y)!=(yj>y)) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
function distanceToSegment(x,y,a,b) {
 const dx=b[0]-a[0],dy=b[1]-a[1];
 const t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));
 return Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy);
}
function distanceToWall(x,y,s) {
 const dx=s.b[0]-s.a[0],dy=s.b[1]-s.a[1],len=Math.hypot(dx,dy);
 const along=((x-s.a[0])*dx+(y-s.a[1])*dy)/len;
 const across=Math.abs(((x-s.a[0])*dy-(y-s.a[1])*dx)/len);
 // Masonry has square ends at a door jamb. A capsule incorrectly extends each
 // wall by half its thickness along the opening, narrowing every doorway.
 return Math.hypot(Math.max(-along,along-len,0),Math.max(across-s.thickness/2,0));
}
export class Navigation {
 constructor(data) {
  this.data=data;this.radius=.18;this.position={x:6.98,y:4.1,z:0};this.segments=[...data.segments];
  for(const wall of data.walls) {
   const [ax,ay]=wall.a,[bx,by]=wall.b, len=Math.hypot(bx-ax,by-ay),ux=(bx-ax)/len,uy=(by-ay)/len;
   const gaps=wall.openings.filter(o=>o[2]<.15 && o[3]>1.65).map(o=>[Math.max(0,o[0]-o[1]/2),Math.min(len,o[0]+o[1]/2)]).sort((a,b)=>a[0]-b[0]);
   let prev=0;const spans=[];
   for(const [l,r] of gaps){if(l>prev)spans.push([prev,l]);prev=Math.max(prev,r);}if(prev<len)spans.push([prev,len]);
   for(const [s,e]of spans) {
    let cuts=[s,e];
    if(wall.projected_x_span) for(const x of wall.projected_x_span){const t=(x-ax)/ux;if(t>s&&t<e)cuts.push(t);}
    cuts.sort((a,b)=>a-b);
    for(let i=0;i<cuts.length-1;i++) {
     const l=cuts[i],r=cuts[i+1],mx=ax+ux*(l+r)/2;
     const projection=wall.projected_x_span && mx>wall.projected_x_span[0]&&mx<wall.projected_x_span[1]?wall.front_projection_m:0;
     const base=wall.base_z??wall.floor*data.levelHeight;
     this.segments.push({a:[ax+ux*l,ay+uy*l-projection/2],b:[ax+ux*r,ay+uy*r-projection/2],thickness:wall.thickness_m+projection,bottom:base,top:base+(wall.height_m??(wall.floor?2.45:2.6)),name:wall.name});
    }
   }
  }
 }
 stairHeight(x,y) {
  const [left,right]=this.data.stair?.boundsX??[7.92,8.815],level=this.data.levelHeight;
  if(x<left||x>right||y<.115||y>3.56)return null;
  if(y>=1.01)return level/17+(3.56-y)/2.55*(13*level/17);
  // A smooth walk surface across the three winders, following their radial turn.
  const angle=Math.atan2(1.01-y,x-left);
  return (14+3*angle/(Math.PI/2))*level/17;
 }
 rampHeights(x,y) {
  const heights=[];
  for(const ramp of this.data.ramps??[])if(pointInPolygon(x,y,ramp.polygon)){
   const [ax,ay,az]=ramp.start,[bx,by,bz]=ramp.end,dx=bx-ax,dy=by-ay;
   const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));
   heights.push(az+(bz-az)*t);
  }
  return heights;
 }
 // Garden ground follows the site's real levels (EA LIDAR grid, relative to the ground round the house).
 groundHeight(x,y) {
  const T=this.data.terrain;if(!T)return 0;
  // Beyond the title boundary the street context is drawn level, so walkers there stay at ±0.00.
  if(this.data.site?.outline_m&&!pointInPolygon(x,y,this.data.site.outline_m))return 0;
  const fx=(x-T.x0)/T.step,fy=(y-T.y0)/T.step;if(fx<0||fy<0||fx>=T.nx-1||fy>=T.ny-1)return 0;
  const j=Math.floor(fx),i=Math.floor(fy),a=fx-j,b=fy-i,z=(ii,jj)=>T.z[ii*T.nx+jj];
  return z(i,j)*(1-a)*(1-b)+z(i,j+1)*a*(1-b)+z(i+1,j)*(1-a)*b+z(i+1,j+1)*a*b;
 }
 support(x,y,currentZ) {
  const street=this.data.streetContext;
  if(this.data.site?.outline_m&&!pointInPolygon(x,y,this.data.site.outline_m)&&!(this.data.approachSurface&&pointInPolygon(x,y,this.data.approachSurface.polygon))&&!(street?.enabled&&street.walkPolygons.some(p=>pointInPolygon(x,y,p))))return null;
  const stair=this.stairHeight(x,y);
  const groundVoid=(this.data.groundOpenings??[]).some(o=>pointInPolygon(x,y,o.polygon??o));
  const floorOverridesTerrain=this.data.surfaces.some(s=>s.overridesTerrain&&pointInPolygon(x,y,s.polygon));
  let heights=this.rampHeights(x,y);
  if(!groundVoid&&!floorOverridesTerrain)heights.push(this.groundHeight(x,y));
  for(const s of this.data.surfaces)if((s.z!==0||!groundVoid)&&pointInPolygon(x,y,s.polygon))heights.push(s.z);
  if(stair!==null)heights.push(stair);
  const candidates=heights.filter(z=>z<=currentZ+(this.stepUp??.30) && z>=currentZ-(this.stepDown??.38));
  return candidates.length?Math.max(...candidates):null;
 }
 blocked(x,y,z) {
  const street=this.data.streetContext,r=this.radius, [xmin,ymin,xmax,ymax]=street?.enabled?street.bounds:this.data.bounds;
  if(x<xmin+r||x>xmax-r||y<ymin+r||y>ymax-r)return true;
  for(const s of this.segments) {
   if(z+1.5<=s.bottom+.04 || z>=s.top-.04)continue;
   // The landing rail's underside must not block the lower stair approach.
   if(s.name==='Landing rear rail' && z<1.0)continue;
   if(distanceToWall(x,y,s)<r)return true;
  }
  for(const o of street?.enabled?[...this.data.obstacles,...street.obstacles]:this.data.obstacles) {
   if(o.maxFootZ!==undefined&&z>o.maxFootZ)continue;
   if(z+1.5<o.bottom+.02||z>=o.top-.04)continue;
   if(o.polygon) {
    if(pointInPolygon(x,y,o.polygon))return true;
    for(let i=0;i<o.polygon.length;i++)if(distanceToSegment(x,y,o.polygon[i],o.polygon[(i+1)%o.polygon.length])<r)return true;
    continue;
   }
   const [a,b,c,d]=o.box;const dx=x-Math.max(a,Math.min(c,x)),dy=y-Math.max(b,Math.min(d,y));
   if(dx*dx+dy*dy<r*r)return true;
  }
  return false;
 }
 canStand(p) {return !this.blocked(p.x,p.y,p.z);}
 teleport(room) {const [x,y,z]=room.position;this.position={x,y,z};return this.position;}
 move(dx,dy) {
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dy)/.04));
  for(let i=0;i<count;i++)for(const [sx,sy]of [[dx/count,0],[0,dy/count]]) {
   const p=this.position,x=p.x+sx,y=p.y+sy,z=this.support(x,y,p.z);
   if(z!==null&&!this.blocked(x,y,z))this.position={x,y,z};
  }
  return this.position;
 }
}
