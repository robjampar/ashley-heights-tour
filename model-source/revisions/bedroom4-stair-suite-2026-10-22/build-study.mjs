import fs from 'node:fs';
import crypto from 'node:crypto';
import * as T from '../../walkthrough/node_modules/three/build/three.module.js';
import {inspectGlb} from '../../walkthrough/tests/helpers/glb-geometry.mjs';
const here=new URL('../../walkthrough/test-results/bedroom4-stair-suite-2026-10-22/',import.meta.url),cfg=JSON.parse(fs.readFileSync(new URL('./study.json',import.meta.url))),source=new URL('../../walkthrough/public/proposal-compact.glb',import.meta.url),bytes=fs.readFileSync(source),scene=inspectGlb(source),groups=[],removed=[],altered=[];
const crop=[-5.35,-5.3,2.64,10.5,8.25,8.2];
function half(p,k,v,greater){const out=[];for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],ai=greater?a[k]>=v:a[k]<=v,bi=greater?b[k]>=v:b[k]<=v;if(ai)out.push(a);if(ai!==bi){const t=(v-a[k])/(b[k]-a[k]);out.push(a.map((x,j)=>x+(b[j]-x)*t))}}return out;}
function clip(p,box){for(let k=0;k<3;k++){p=half(p,k,box[k],true);p=half(p,k,box[k+3],false);if(p.length<3)return []}return p;}
function subtract(p,box){let inside=p,out=[];for(let k=0;k<3;k++)for(const [v,g]of [[box[k],true],[box[k+3],false]]){const part=half(inside,k,v,!g);if(part.length>2)out.push(part);inside=half(inside,k,v,g);if(inside.length<3)return out}return out;}
function cuts(polys,boxes){for(const b of boxes)polys=polys.flatMap(p=>subtract(p,b));return polys;}
const colors={oak:[.64,.47,.29],plaster:[.88,.87,.82],carpet:[.65,.62,.55],stone:[.78,.77,.7],linen:[.87,.84,.76],dark:[.20,.23,.22],glass:[.58,.76,.76],roof:[.79,.81,.79],brick:[.5,.29,.20]};
function add(name,polys,material='plaster',tag='new'){const positions=[];for(const p of polys)for(let i=1;i<p.length-1;i++){const a=new T.Vector3(...p[1]).sub(new T.Vector3(...p[0])),b=new T.Vector3(...p[2]).sub(new T.Vector3(...p[0]));if(a.cross(b).lengthSq()<1e-14)continue;for(const [x,y,z]of [p[0],p[i],p[i+1]])positions.push(x,z,-y)}if(positions.length)groups.push({name,tag,material:{color:colors[material]??colors.plaster,roughness:.8,opacity:material==='glass'?.22:1},positions});}
function box(name,r,low,high,mat='plaster',tag='new'){const[a,b,c,d]=r,v=[[a,b,low],[c,b,low],[c,d,low],[a,d,low],[a,b,high],[c,b,high],[c,d,high],[a,d,high]];add(name,[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]].map(f=>f.map(i=>v[i])),mat,tag);}
function prism(name,poly,bottom,top,mat,tag){const a=poly.map(([x,y])=>[x,y,bottom]),b=poly.map(([x,y])=>[x,y,top]);add(name,[a.slice().reverse(),b,...a.map((p,i)=>[p,a[(i+1)%a.length],b[(i+1)%b.length],b[i]])],mat,tag)}
function beam(name,a,b,w,mat='oak',tag='stair'){const A=new T.Vector3(...a),B=new T.Vector3(...b),d=B.clone().sub(A),g=new T.BoxGeometry(w,w,d.length());g.applyMatrix4(new T.Matrix4().compose(A.clone().add(B).multiplyScalar(.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),d.normalize()),new T.Vector3(1,1,1)));const p=g.attributes.position,ix=g.index,polys=[];for(let i=0;i<ix.count;i+=3)polys.push([0,1,2].map(j=>new T.Vector3().fromBufferAttribute(p,ix.getX(i+j)).toArray()));add(name,polys,mat,tag);}
const hole=[4.53,.28,5.10,5.57,4.55,5.64];
const retire=/^Bedroom4 01 \||^Sidebed 01 \||Bedroom 4 en suite|Bedroom 4 shower return|Linen cupboard|Bedroom 4 hall|Frame detail.*Bedroom 4|^Landing radiator|^Landings 01 \| hall artwork|^Proposal \| Loft bedroom expansion \| returned landing|^Proposal \| Level loft \|.*(Stairwell|Stair opening)/i;
scene.traverse(ob=>{if(!ob.isMesh)return;const n=ob.name,b=new T.Box3().setFromObject(ob);if(b.max.x<crop[0]||b.min.x>crop[3]||-b.min.z<crop[1]||-b.max.z>crop[4]||b.max.y<crop[2]||b.min.y>crop[5])return;
 const roomFixture=/^Frame detail/.test(n)&&b.min.y>=2.79&&b.max.y<5.15&&((b.min.x<5.98&&b.max.x>3.8&&-b.max.z<3.4)|| (b.min.x<0&&b.max.x>-4&&-b.max.z<4.5));
 if(ob.userData.modern_loft_stair||retire.test(n)||roomFixture){removed.push(n);return;}
 let cutters=[];
 // Local openings only; the original roof and all external glazing remain.
 if(b.min.y>5.1&&b.max.y<5.65)cutters.push(hole);
 if(/Original loft front knee wall/.test(n))cutters.push([4.53,2.1,5.54,5.57,2.4,7.3]);
 if(/^Hobby 01 \|.*archive/i.test(n))cutters.push([4.48,3.2,5.5,5.6,3.95,6.6]);
 // The former external cross-wall receives one doorway linking the suite.
 if(b.min.x<.13&&b.max.x>-.13&&b.max.y>2.79&&b.min.y<5.17)cutters.push([-.14,1.575,2.795,.14,2.625,4.95]);
 cutters.push([0,3.1,2.795,5.83,3.28,5.25],[-2.88,4.20,2.795,0,4.36,5.17],[3.65,3.125,2.79,3.91,4.53,5.05]);
 // Clear replaced room finishes, internal walls and door trims. The source
 // external envelope survives because these are inner-face rectangles.
 cutters.push([.12,.12,2.79,5.83,3.125,5.245],[-5.06,1.02,2.79,-.12,4.22,5.17],[-5.06,3.1,2.79,-2.94,5.04,5.17]);
 const p=ob.geometry.attributes.position,ix=ob.geometry.index,polys=[];for(let i=0;i<(ix?.count??p.count);i+=3){let tri=[0,1,2].map(j=>{const v=new T.Vector3().fromBufferAttribute(p,ix?ix.getX(i+j):i+j).applyMatrix4(ob.matrixWorld);return[v.x,-v.z,v.y]});tri=clip(tri,crop);if(tri.length>2)polys.push(tri)}
 const after=cuts(polys,cutters);if(cutters.length)altered.push(n);
 const mat=ob.userData.materialName??n,tag=/roof|ceiling/i.test(n)?'roof':/floor|deck/i.test(n)?'floor':'context';add(n,after,/oak|timber/i.test(mat)?'oak':/glass|glazing/i.test(mat)?'glass':/brick/i.test(mat)?'brick':/carpet/i.test(mat)?'carpet':tag==='roof'?'roof':'plaster',tag);
});
// Close the former mezzanine stair opening, leaving the accepted roof/profile.
box('Restored loft deck at old stair',[7.3,-4.58,8.47,-1.6],5.35,5.55,'oak','floor');
box('Restored first-floor ceiling at old stair',[6,-4.58,8.47,-1.6],5.237,5.35,'plaster','roof');
// New floor finishes and floor opening.
const suite=cfg.suite;
for(const[label,r,mat]of[['Suite bedroom',suite.sleeping,'carpet'],['Suite dressing room',suite.dressing,'oak'],['Suite bathroom',suite.bathroom,'stone']])box(label+' floor',r,2.8,2.812,mat,'floor');
box('Bedroom former ensuite infill floor',[4.28,.115,5.835,3.125],2.79,2.8,'oak','floor');
// Rebuilt hall wall has one relocated suite door, clear of the upper flight.
box('Suite north partition west',[.0,3.125,3.6,3.255],2.8,5.237);

box('Suite entrance head',[3.6,3.125,4.5,3.255],4.95,5.237);
box('Suite stair dividing wall',[4.5,.115,4.6,3.125],2.8,5.237);
box('Dressing north partition',[-2.88,4.22,0,4.34],2.8,5.168);
for(const[a,b]of[[1.015,2.25],[3.15,5.04]])box('Bathroom east privacy partition',[-2.94,a,-2.82,b],2.8,5.168);
box('Bathroom door head',[-2.94,2.25,-2.82,3.15],4.95,5.168);
// Continuous ceilings retain the original levels, with one trimmed new void.
for(const[r,z]of[[[.115,.115,5.835,3.125],5.237],[[-5.065,1.015,-.115,4.22],5.168],[[-5.065,3.1,-2.94,5.04],5.168]]){
 const p=[[r[0],r[1],z],[r[2],r[1],z],[r[2],r[3],z],[r[0],r[3],z]];add('Suite retained ceiling',cuts([p],[hole]),'plaster','roof');}
// Three balanced quarter winders, then one uninterrupted straight flight.
box('Suite connecting threshold',[-.14,1.575,.14,2.625],2.8,2.812,'oak','floor');
box('Expanded landing connection floor',[3.63,3.125,3.93,4.53],2.79,2.8,'oak','floor');
box('Suite entry threshold',[3.6,3.09,4.5,3.29],2.8,2.812,'oak','floor');
box('Bathroom threshold',[-2.94,2.25,-2.82,3.15],2.8,2.812,'oak','floor');
const z=cfg.floorZ,rise=(cfg.loftZ-z)/16,steps=[];
for(let k=0;k<3;k++){const a=-Math.PI/2-k*Math.PI/6,b=a-Math.PI/6,angles=[a,...(a>-3*Math.PI/4&&b<-3*Math.PI/4?[-3*Math.PI/4]:[]),b],outer=angles.map(t=>{const r=1/Math.max(Math.abs(Math.cos(t)),Math.abs(Math.sin(t)));return[5.6+r*Math.cos(t),1.31+r*Math.sin(t)]}),inner=[b,a].map(t=>[5.6+.1*Math.cos(t),1.31+.1*Math.sin(t)]),poly=[...outer,...inner];prism('Quarter winder '+(k+1),poly,z+(k+1)*rise-.05,z+(k+1)*rise,'oak','stair');steps.push({kind:'winder',poly,top:z+(k+1)*rise});}
for(let k=0;k<12;k++){const y=1.31+k*.27,top=z+(k+4)*rise;box('Straight oak tread '+(k+4),[4.6,y-.02,5.5,y+.27],top-.05,top,'oak','stair');box('Recessed oak riser nib '+(k+4),[4.61,y+.002,5.49,y+.022],top-.09,top-.05,'oak','stair');steps.push({kind:'straight',box:[4.6,y,5.5,y+.27],top});}
// Ivory strings and oak handrails follow the existing stair language.
for(const x of[4.56,5.54]){beam('Ivory housed string',[x,1.31,3.46],[x,4.55,5.52],.065,'plaster');beam('Continuous oak rail',[x,1.31,4.44],[x,4.55,6.50],.05);for(let i=0;i<=29;i++){const y=1.31+(4.55-1.31)*i/29,k=Math.min(11,Math.floor((y-1.31)/.27)),top=z+(k+4)*rise;beam('Oak stair spindle',[x,y,top-.06],[x,y,4.44+(6.50-4.44)*i/29],.022)}}
// The bottom newel forms the inside of the winder; the outside is enclosed.
prism('Winder newel',Array.from({length:24},(_,i)=>[5.6+.095*Math.cos(i*Math.PI/12),1.31+.095*Math.sin(i*Math.PI/12)]),2.8,4.44,'oak','stair');
// Suite dividing wall also encloses the west side of the winders.
box('Winder front integrated enclosure',[4.5,.21,5.6,.31],2.8,5.237);
// Under-stair storage closes the low underside without narrowing the hall.
add('Under-stair cupboard side',[[[5.55,1.31,2.8],[5.55,3.33,2.8],[5.55,3.33,4.45],[5.55,1.31,3.27]]],'plaster','wall');
box('Under-stair cupboard north end',[4.53,3.30,5.57,3.36],2.8,4.45);
// Closed plaster edges to the new trimmed loft opening.
for(const x of[4.53,5.57])box('New stairwell plaster reveal',[x-.003,2.286,x+.003,4.55],5.10,5.55,'plaster','roof');
box('New stairwell top landing fascia',[4.53,4.55,5.57,4.556],5.10,5.55,'plaster','roof');
// Landing guarding stops at the stair mouth. No glass balustrade.
for(const x of[4.53,5.57]){beam('Loft stairwell oak rail',[x,2.4,6.57],[x,4.55,6.57],.05,'oak','guard');for(let y=2.42;y<4.55;y+=.105)beam('Loft stairwell oak spindle',[x,y,5.55],[x,y,6.55],.022,'oak','guard')}
// Indicative complete suite furniture, separate from dimensional room checks.
const B=suite.bed;box('Super king upholstered bed',B,2.96,3.32,'linen','furniture');box('Super king mattress',[B[0]+.08,B[1]+.06,B[2]-.08,B[3]-.08],3.32,3.59,'linen','furniture');box('Bedroom headboard',[.95,3.06,3.05,3.12],2.8,4.1,'oak','furniture');for(const x of[.55,3.1])box('Bedside cabinet',[x,2.65,x+.4,3.08],2.8,3.35,'oak','furniture');
for(const r of suite.wardrobes){box('Full depth dressing wardrobe',r,2.8,5.04,'oak','furniture');const modules=Math.ceil((r[2]-r[0])/.55);for(let j=1;j<modules;j++){const x=r[0]+(r[2]-r[0])*j/modules;box('Wardrobe door joint',[x-.002,r[1]===1.015?r[3]-.005:r[1]-.002,x+.002,r[1]===1.015?r[3]+.002:r[1]+.005],2.91,4.98,'dark','furniture')}}
box('Freestanding bath',suite.bath,2.83,3.38,'linen','furniture');box('Bath interior',[suite.bath[0]+.1,suite.bath[1]+.1,suite.bath[2]-.1,suite.bath[3]-.1],3.37,3.385,'stone','furniture');
box('Double vanity',suite.vanity,3.1,3.66,'oak','furniture');for(const y of[2.5,3.3])box('Vanity basin',[-4.92,y-.25,-4.54,y+.25],3.66,3.71,'linen','furniture');
box('Walk in shower tray',suite.shower,2.81,2.84,'stone','furniture');box('Walk in shower screen',[-3.85,4.05,-3.83,5.0],2.84,4.88,'glass','furniture');
box('Bathroom WC',suite.wc,2.8,3.24,'linen','furniture');
const total=groups.reduce((n,g)=>n+g.positions.length,0),arr=new Float32Array(total);let offset=0;for(const g of groups){g.offset=offset;g.count=g.positions.length/3;arr.set(g.positions,offset);offset+=g.positions.length;delete g.positions}
fs.writeFileSync(new URL('study.bin',here),Buffer.from(arr.buffer));fs.writeFileSync(new URL('study-meshes.json',here),JSON.stringify({meshes:groups}));
const result={...cfg,source:'walkthrough/public/proposal-compact.glb',sourceSHA256:crypto.createHash('sha256').update(bytes).digest('hex'),studySHA256:crypto.createHash('sha256').update(Buffer.from(arr.buffer)).digest('hex'),removed:[...new Set(removed)],altered:[...new Set(altered)],steps,hole,scope:'Cropped isolated spatial study with simplified materials. Roof and exterior glazing retained. Main proposal not edited.',dimensions:{rise,straightGoing:.27,winderCentreGoing:.55*Math.PI/6,winderNarrowChord:.2*Math.sin(Math.PI/12),bedroomArea:(4.5-.115)*(3.125-.115),dressingArea:(2.82-.115)*(4.22-1.015),bathroomArea:(5.065-2.94)*(5.04-1.015),wardrobeLength:2*(2.82-.115)}};
fs.writeFileSync(new URL('study.json',here),JSON.stringify(result,null,2));console.log(JSON.stringify({objects:groups.length,vertices:total/3,dimensions:result.dimensions,sourceUnchanged:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex')===result.sourceSHA256},null,2));
