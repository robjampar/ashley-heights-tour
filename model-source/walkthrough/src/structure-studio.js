import {foundationMarkup} from './structure-foundations.js';
import {SYSTEM_KEYS,toggleSystem,categoriesForSystems} from './structure-systems.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {loadModel} from './model-delivery.js';
import {CATEGORIES,MEMBER_CATEGORIES,esc,centre,filteredElements,makeDrawing} from './structure-geometry.js';
import {trialMarkup,directionSVG} from './structure-trials.js';
import {costMarkup,memberCSV,issueMarkup,memberFacts,masonryTriangles,mortarTriangles,ISOLATION,roofOptionsMarkup} from './structure-members.js';
import {junctionsMarkup,cutCSV} from './structure-junctions.js';
export async function createStructureStudio({root=document,baseURL=new URL('./',location.href),embed=null}={}){
const $=id=>root.querySelector('#'+id);
const resource=name=>new URL(name,baseURL);
const rootClass=embed?root.host.classList:document.body.classList;
$('layers-toggle').onclick=()=>{const on=rootClass.toggle('layers-open');$('layers-toggle').setAttribute('aria-expanded',String(on));};
const state={view:'model',level:'all',region:'house',retained:true,categories:[...ISOLATION.all],representation:'members',scope:'all',garageRebuild:true,loftUpgrade:true,roofOption:new URLSearchParams(location.search).get('roof')==='retain'?'retain':'replace',systemFilters:SYSTEM_KEYS.filter(k=>k!=='layers'),focusSystem:null,isolated:null,isolatedIds:null,mode:'solid',selected:null,trialOverlay:false,sectionAt:9.455};
const response=await fetch(resource('model.json'));if(!response.ok)throw Error('Structural register failed to load');
const data=await response.json();
const trialResponse=await fetch(resource('trials.json'));if(!trialResponse.ok)throw Error('UK trial study failed to load');
const trials=await trialResponse.json();data.elements.push(...trials.visualStudies);let trialScenario='reference';
const memberResponse=await fetch(resource('members.json'));if(!memberResponse.ok)throw Error('Detailed members failed to load');
const members=await memberResponse.json();
state.garageRebuild=members.garageOption.default!==false;
const emptySelection=$('selection').innerHTML;
for(const e of data.elements){e.roofContext=members.retainedRoofIds.includes(e.id);if(members.retainedIds.includes(e.id)){e.retained=true;e.scope='retained';}if(members.garageContextIds.includes(e.id)){e.retained=true;e.scope='retained';e.garageContext=true;}}
data.elements.push(...members.elements);
let rates=structuredClone(members.rates);try{const saved=JSON.parse(localStorage.getItem('ashley-member-rates-'+members.revision));if(saved)for(const k of Object.keys(rates))for(const b of ['low','reference','high'])if(Number.isFinite(saved[k]?.[b])&&saved[k][b]>=0)rates[k][b]=saved[k][b];}catch{}
const saveRates=()=>{try{localStorage.setItem('ashley-member-rates-'+members.revision,JSON.stringify(rates));}catch{}};

const scene=embed?new THREE.Group():new THREE.Scene();scene.name='Structural member layer';
if(embed)embed.scene.add(scene);else scene.background=new THREE.Color('#0c2138');
const renderer=embed?.renderer??new THREE.WebGLRenderer({canvas:$('model'),antialias:true});if(!embed)renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.localClippingEnabled=true;
const pickCanvas=embed?.canvas??$('model');
const camera=embed?.camera??new THREE.PerspectiveCamera(42,1,.05,350),controls=embed?{target:new THREE.Vector3(),update(){embed.focus(camera.position.clone(),this.target.clone());}}:new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.dampingFactor=.12;controls.maxDistance=150;controls.minDistance=.15;
const clipping=new THREE.Plane(new THREE.Vector3(0,-1,0),9),architectureClipping=new THREE.Plane(new THREE.Vector3(0,-1,0),9),meshes=new Map(),lines=new Map();
const cutPlaneFor=e=>e.member||e.trial?clipping:architectureClipping;
if(!embed)scene.add(new THREE.HemisphereLight(0xdcefff,0x446079,3));const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(-10,25,20);if(!embed)scene.add(sun);
const vector=p=>new THREE.Vector3(p[0],p[2],-p[1]);
const grid=new THREE.GridHelper(80,80,0x284661,0x18324c);grid.position.y=-3.12;if(!embed)scene.add(grid);
for(const e of data.elements){
 const color=e.retained?'#718a9f':e.leaf==='block'?'#b9b9ac':CATEGORIES[e.category].color;
 const cutPlane=cutPlaneFor(e);
 if(e.triangles?.length){
  const unitTriangles=masonryTriangles(e),mortar=mortarTriangles(e),displayTriangles=[...unitTriangles,...mortar];
  const geometry=new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(displayTriangles.flatMap(p=>[p[0],p[2],-p[1]]),3));geometry.computeVertexNormals();
  const unitColor=new THREE.Color(e.category==='masonry'?color:'#ffffff'),mortarColor=new THREE.Color('#b4b0a2');
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(displayTriangles.flatMap((_,i)=>(i<unitTriangles.length?unitColor:mortarColor).toArray()),3));
  const material=e.member?new THREE.MeshLambertMaterial({color:e.category==='masonry'?'#ffffff':color,vertexColors:true,transparent:false,side:THREE.DoubleSide,clippingPlanes:[cutPlane]}):new THREE.MeshBasicMaterial({color,transparent:true,opacity:.06,side:THREE.DoubleSide,depthWrite:false,clippingPlanes:[cutPlane]});
  const mesh=new THREE.Mesh(geometry,material);mesh.userData.element=e;scene.add(mesh);meshes.set(e.id,mesh);
  const edgePositions=(e.edges??[]).flatMap(s=>s.flatMap(p=>[p[0],p[2],-p[1]]));
  const edge=new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(edgePositions,3)),new THREE.LineBasicMaterial({color,transparent:true,opacity:e.retained?.35:.85,clippingPlanes:[cutPlane]}));
  edge.userData.element=e;scene.add(edge);lines.set(e.id,edge);
 }else if(e.line){
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(e.line.map(vector)),new THREE.LineDashedMaterial({color,dashSize:.16,gapSize:.09,clippingPlanes:[cutPlane]}));line.computeLineDistances();line.userData.element=e;scene.add(line);lines.set(e.id,line);
 }
}
// Batch equal display/filter states while retaining every member identity.
// A selected/isolated member uses its own mesh; picking a batch resolves its
// triangle range back to the same register ID. No thousands of draw calls.
const batches=[],batchGroups=new Map();
for(const e of data.elements){
 if(!meshes.has(e.id))continue;
 const key=JSON.stringify([e.category,e.region,e.level,e.scope,e.retained,e.condition,e.garageContext,e.roofContext,e.leaf,e.trial]);
 if(!batchGroups.has(key))batchGroups.set(key,[]);batchGroups.get(key).push(e);
}
for(const es of batchGroups.values()){
 for(const kind of ['mesh','line']){
  const map=kind==='mesh'?meshes:lines,originals=es.map(e=>map.get(e.id)).filter(Boolean);if(!originals.length)continue;
  const geo=mergeGeometries(originals.map(o=>o.geometry),false),mat=originals[0].material.clone();
  mat.clippingPlanes=originals[0].material.clippingPlanes;
  const object=kind==='mesh'?new THREE.Mesh(geo,mat):new THREE.LineSegments(geo,mat);
  let end=0;const ranges=originals.map(o=>({end:end+=o.geometry.attributes.position.count/(kind==='mesh'?3:1),id:o.userData.element.id}));
  object.userData={batch:true,ranges,kind};scene.add(object);batches.push({object,es,kind});
 }
}
let architecture=null,architecturePromise=null;
async function context(on){
 if(embed){embed.context(on,Number($('context-opacity').value)/100,architectureClipping);return;}
 if(on&&!architecture){
  $('loading').textContent='Loading architectural overlay…';$('loading').hidden=false;
  try{
   architecturePromise??=(async()=>{const loader=new GLTFLoader();loader.setMeshoptDecoder(MeshoptDecoder);const model=await loadModel(loader,resource('../proposal-compact.glb').href);
    const material=new THREE.MeshBasicMaterial({color:'#dce8f0',transparent:true,opacity:Number($('context-opacity').value)/100,side:THREE.DoubleSide,depthWrite:false,clippingPlanes:[architectureClipping]});
    const names=new Set(data.elements.filter(e=>!e.member&&!e.trial).flatMap(e=>[e.name,e.sourceObject]).filter(Boolean)),geometries=[];
    model.scene.updateMatrixWorld(true);
    model.scene.traverse(o=>{if(!o.isMesh)return;let owner=o;while(owner&&!owner.userData.source_name)owner=owner.parent;const name=owner?.userData.source_name??o.name;
     const shell=names.has(name)||(/window|glaz|door|stair|tread|ceiling|plaster/i.test(name)&&!/cabinet|cupboard|wardrobe|shower|car |van |tesla|fiat|plant|tree|hedge|picture|artwork/i.test(name));
     if(!shell)return;let geometry=o.geometry.clone().applyMatrix4(o.matrixWorld);if(geometry.index)geometry=geometry.toNonIndexed();for(const key of Object.keys(geometry.attributes))if(key!=='position')geometry.deleteAttribute(key);geometry.clearGroups();geometries.push(geometry);
    });
    if(!geometries.length)throw Error('Architectural overlay has no matched shell geometry');
    const geometry=mergeGeometries(geometries,false),group=new THREE.Group();group.name='Architectural overlay';group.userData.overlayObjectCount=geometries.length;
    const mesh=new THREE.Mesh(geometry,material);mesh.name='Architectural surfaces';group.add(mesh);
    const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,35),new THREE.LineBasicMaterial({color:'#dce8f0',transparent:true,opacity:.55,depthWrite:false,clippingPlanes:[architectureClipping]}));edges.name='Architectural outlines';group.add(edges);
    for(const geometry of geometries)geometry.dispose();return group;})();
   architecture=await architecturePromise;scene.add(architecture);
  }catch(error){architecturePromise=null;$('context').checked=false;$('loading').textContent='Overlay unavailable. The structural register is still usable.';console.error(error);return;}
  $('loading').hidden=true;
 }
 if(architecture){architecture.visible=$('context').checked;setOverlayOpacity();}
}
function setOverlayOpacity(){
 const opacity=Number($('context-opacity').value)/100;if(embed)embed.context($('context').checked,opacity,architectureClipping);$('context-opacity-value').textContent=Math.round(opacity*100)+'%';
 architecture?.traverse(o=>{if(o.material)o.material.opacity=o.isLineSegments?Math.min(.85,opacity+.27):opacity;});
}
function current(){const es=filteredElements(data,{...state,level:state.view==='model'?state.level:'all'});return state.isolated?es.filter(e=>e.id===state.isolated||e.parentId===state.isolated):es;}
function fit(){
 const es=current();if(!es.length)return;const box=new THREE.Box3();for(const e of es){box.expandByPoint(vector(e.bounds[0]));box.expandByPoint(vector(e.bounds[1]));}
 const c=box.getCenter(new THREE.Vector3()),dir=new THREE.Vector3(1,.8,1.2).normalize(),right=new THREE.Vector3(dir.z,0,-dir.x).normalize(),up=new THREE.Vector3().crossVectors(dir,right);
 const tanV=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),tanH=tanV*camera.aspect;let distance=3;
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){const p=new THREE.Vector3(x,y,z).sub(c);distance=Math.max(distance,Math.abs(p.dot(right))/tanH+p.dot(dir),Math.abs(p.dot(up))/tanV+p.dot(dir));}
 controls.target.copy(c);camera.position.copy(c).add(dir.multiplyScalar(distance*1.12));camera.near=.05;camera.far=350;camera.updateProjectionMatrix();controls.update();
}
function refresh(){
 syncSystemButtons();
 for(const label of root.querySelectorAll('#systems .check')){const category=label.querySelector('input').value;label.querySelector('.system-count').textContent=filteredElements(data,{...state,categories:[category],systemFilters:null,retained:false}).length;}
 const ids=new Set(current().map(e=>e.id));
 for(const e of data.elements){const mesh=meshes.get(e.id),line=lines.get(e.id),selected=e.id===state.selected,color=selected?'#fff1bc':e.retained?'#718a9f':e.leaf==='block'?'#b9b9ac':CATEGORIES[e.category].color;
  if(mesh){mesh.visible=ids.has(e.id);mesh.material.color.set(e.category==='masonry'&&!selected?'#ffffff':color);mesh.material.opacity=e.retained?(e.category==='walls'&&state.mode==='solid'?.3:.055):e.member?(state.mode==='solid'?1:.14):(selected?.4:state.mode==='solid'?.6:.055);mesh.material.transparent=e.retained||state.mode!=='solid'||!e.member;mesh.material.depthWrite=!e.retained&&state.mode==='solid';}
  if(line){line.visible=ids.has(e.id);line.material.color.set(color);line.material.opacity=selected?1:e.retained?.2:state.mode==='solid'?.28:.9;}
 }
 for(const {object,es,kind}of batches){
  const all=es.every(e=>ids.has(e.id));object.visible=all;
  if(!all)continue;
  const e=es[0],source=(kind==='mesh'?meshes:lines).get(e.id);
  object.material.copy(source.material);
  // Material.copy clones planes. Keep the live plane shared with the sliders.
  object.material.clippingPlanes=source.material.clippingPlanes;
  object.material.color.set(kind==='mesh'&&e.category==='masonry'?'#ffffff':e.retained?'#718a9f':e.leaf==='block'?'#b9b9ac':CATEGORIES[e.category].color);
  object.material.opacity=kind==='mesh'?(e.retained?(e.category==='walls'&&state.mode==='solid'?.3:.055):e.member?(state.mode==='solid'?1:.14):state.mode==='solid'?.6:.055):(e.retained?.2:state.mode==='solid'?.28:.9);
  for(const item of es){const original=(kind==='mesh'?meshes:lines).get(item.id);if(original){original.visible=item.id===state.selected;original.renderOrder=2;}}
 }
 $('model').hidden=state.view!=='model';$('drawing').hidden=['model','schedule','trials','costs','issues','roof-options','junctions','foundations'].includes(state.view);$('register').hidden=state.view!=='schedule';$('trials').hidden=state.view!=='trials';$('costs').hidden=state.view!=='costs';$('member-issues').hidden=state.view!=='issues';$('roof-options').hidden=state.view!=='roof-options';$('junctions').hidden=state.view!=='junctions';$('foundations').hidden=state.view!=='foundations';
 const elev=['front','rear','west','east'].includes(state.view);$('elevation').hidden=!elev;$('section-control').hidden=state.view!=='section';
 $('view-title').textContent=({junctions:'Junctions, cuts and construction layers',model:'Structure in context',plan:'Floor plan',front:'Front / south elevation',rear:'Rear / north elevation',west:'West elevation',east:'East elevation',section:'Section through the building',schedule:'Coordinated element register',trials:'UK assumptions and trial calculations',costs:'Quantities and shell cost allowances',issues:'Fit and unresolved coordination',foundations:'Foundation assumptions and sensitivity','roof-options':'Retain or rebuild the existing roof'})[state.view];
 $('level').disabled=['costs','issues','section','roof-options','junctions','foundations'].includes(state.view);
 $('view-meta').textContent=(['costs','issues','section','roof-options','junctions','foundations'].includes(state.view)||state.level==='all'?'All levels':data.floorLevels.find(f=>f.id===Number(state.level))?.label)+' · '+(state.region==='house'?'Main house':state.region==='workshop'?'Garden workshop':'Both buildings')+' · Roof '+(state.roofOption==='replace'?'B — rebuild':'A — retain');
 if(state.view==='plan'&&state.focusSystem==='roof'){$('view-title').textContent='Roof framing plan';$('level').disabled=true;$('view-meta').textContent='All roof levels · '+(state.region==='house'?'Main house':state.region==='workshop'?'Garden workshop':'Both buildings')+' · Roof '+(state.roofOption==='replace'?'B — rebuild':'A — retain');}
 $('view-hint').textContent=state.view==='model'?(embed?'Walk / fly · Click a member to inspect · Esc releases the mouse':'Drag to orbit · Scroll to zoom · Click an element'):['schedule','trials','costs','issues','roof-options','junctions','foundations'].includes(state.view)?'':'Click a line to inspect · Dashed lines are support studies';
 if(!['model','schedule','trials','costs','issues','roof-options','junctions','foundations'].includes(state.view)){
  const drawing=makeDrawing(data,{...state,level:state.view==='plan'?(state.level==='all'?0:Number(state.level)):state.level});$('drawing').innerHTML=drawing.svg;
  $('visible-count').textContent=drawing.count+' element references in this view';
 }else{$('visible-count').textContent=ids.size+(state.representation==='members'?' members / assemblies & retained context':' architectural envelopes & studies');}
 if(state.view==='foundations'){$('foundations').innerHTML=foundationMarkup(members);$('visible-count').textContent='Reference geometry · illustrative assumptions · not a construction design';}
 if(state.view==='junctions'){$('junctions').innerHTML=junctionsMarkup(members,state);$('visible-count').textContent='Measured geometry · model dimensions only';}
 if(state.view==='schedule')renderRegister();
 if(state.view==='trials'){renderTrials();$('visible-count').textContent='4 floor bays · timber bearing-wall study · 3 scenarios';}
 if(state.view==='roof-options'){$('roof-options').innerHTML=roofOptionsMarkup(members,state,rates);$('visible-count').textContent='Two options · shared exterior design · experimental framing';}
 if(state.view==='costs')renderCosts();if(state.view==='issues'){$('member-issues').innerHTML=issueMarkup(members);$('visible-count').textContent=members.issues.length+' open coordination items';}
 for(const id of ['cut','architecture-cut','context','context-opacity'])$(id).disabled=state.view!=='model';
 for(const b of root.querySelectorAll('.tabs button'))b.setAttribute('aria-pressed',String(b.dataset.view===state.view||(b.dataset.view==='front'&&elev)));
 if(embed){root.host.classList.toggle('document-view',state.view!=='model');embed.onView(state.view);}
 resize();
}
function select(id){
 state.selected=id;const e=data.elements.find(e=>e.id===id);if(!e)return;
 if(e.member){
  $('selection').innerHTML=memberFacts(e,members,rates);
  $('focus-element').onclick=()=>focusElement(e);
  $('isolate-element').onclick=()=>{state.isolated=e.id;state.retained=false;focusElement(e);};
  const url=new URL(location.href);url.searchParams.set('element',id);history.replaceState(null,'',url);refresh();return;
 }
 const m=e.measurements;const values=[];
 if(m.envelopeM)values.push(['Model envelope',m.envelopeM.map(x=>x.toFixed(3)).join(' × ')+' m']);
 if(m.projectedAreaM2)values.push(['Projected model area',m.projectedAreaM2.toFixed(2)+' m²']);
 if(m.headEnvelopeLengthM)values.push(['Head envelope length',m.headEnvelopeLengthM.toFixed(3)+' m']);
 if(m.axisLengthM)values.push(['Study axis length',m.axisLengthM.toFixed(3)+' m']);
 const related=[...trials.floors,...trials.beams,...trials.timberHeaders].filter(t=>t.elementIds?.includes(e.id)||e.id==='TR-'+t.id||e.id.startsWith('TR-'+t.id+'-'));
 values.push(['Structural size','No approved design'],['Design loading','Assumptions only'],['Trial calculations',related.length?'UK-T01: '+related.map(t=>t.id).join(', '):'Not assessed in UK-T01'],['Construction approval','Not approved']);
 $('selection').innerHTML=`<p class="eyebrow">ELEMENT INSPECTOR</p><span class="ref">${esc(e.id)}</span><h2>${esc(e.name.replace(/^Proposal \| /,''))}</h2><span class="badge">${esc(e.status)}</span><p>${esc(e.basis)}</p><dl class="facts">${values.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><h2>Required design checks</h2><ul class="check-list">${e.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><button id="focus-element" class="outline">Focus in 3D</button>${related.length?'<button id="show-trials" class="outline" style="margin-top:8px">View UK trial calculations</button>':''}`;
 if(related.length)$('show-trials').onclick=()=>{state.view='trials';refresh();};
 $('focus-element').onclick=()=>{state.systemFilters=null;state.representation=e.retained?'members':'envelopes';state.isolated=null;state.isolatedIds=null;state.categories=Object.keys(CATEGORIES);renderSystems();state.view='model';if(e.trial){state.trialOverlay=true;$('trial-overlay').checked=true;}if(!state.categories.includes(e.category))state.categories.push(e.category);state.region=e.region;state.level='all';state.retained=true;syncInputs();refresh();controls.target.copy(vector(centre(e)));const size=Math.max(...e.bounds[1].map((v,i)=>v-e.bounds[0][i]),2);camera.position.copy(controls.target).add(new THREE.Vector3(size*.9,size*.7,size*.9));};
 const url=new URL(location.href);url.searchParams.set('element',id);history.replaceState(null,'',url);refresh();
}
function focusElement(e){
 state.systemFilters=null;
 state.isolatedIds=null;
 const roofMember=e.structuralSystem==='garden-terrace'||['rafters','fascia','roof'].includes(e.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(e.id);
 if((state.focusSystem==='floors'&&roofMember)||(state.focusSystem==='roof'&&!roofMember)||!e.member)state.focusSystem=null;
 if(e.condition==='roof-rebuild')state.roofOption='replace';if(e.roofContext)state.roofOption='retain';
 // Keep upper floors from hiding the selected member when moving the camera
 // close to a lower beam. All levels remain available in the level selector.
 state.view='model';state.representation=e.member||e.retained?'members':'envelopes';state.region=e.region;state.level=e.member?String(e.level):'all';
 if(e.scope==='garage-rebuild')state.garageRebuild=true;if(e.condition==='loft-upgrade')state.loftUpgrade=true;if(e.retained)state.retained=true;
 state.scope='all';if(!state.categories.includes(e.category))state.categories.push(e.category);
 renderSystems();syncInputs();refresh();clipping.constant=9;$('cut').value='9';$('cut-value').textContent='9.00 m';
 controls.target.copy(vector(centre(e)));const size=Math.max(...e.bounds[1].map((v,i)=>v-e.bounds[0][i]),.6);
 const distance=Math.max(size*1.8,1.3);camera.position.copy(controls.target).add(new THREE.Vector3(.9,.55,1).normalize().multiplyScalar(distance));controls.update();
}
function inspectJunction(ids){
 state.systemFilters=null;
 const es=ids.map(id=>data.elements.find(e=>e.id===id)).filter(Boolean);if(es.length<2)return;
 const parents=new Set(es.map(e=>e.parentId??e.id));
 const extra=data.elements.filter(e=>['connections','details'].includes(e.category)&&parents.has(e.parentId));
 state.focusSystem=null;state.isolated=null;state.isolatedIds=[...new Set([...ids,...extra.map(e=>e.id)])];
 state.retained=es.some(e=>e.retained);state.region='all';state.level='all';state.scope='all';state.representation='members';state.categories=[...new Set([...es,...extra].map(e=>e.category))];state.view='model';
 if(es.some(e=>e.condition==='roof-rebuild'))state.roofOption='replace';if(es.some(e=>e.condition==='loft-upgrade'))state.loftUpgrade=true;if(es.some(e=>e.scope==='garage-rebuild'))state.garageRebuild=true;
 renderSystems();syncInputs();select(es[0].id);clipping.constant=9;$('cut').value='9';$('cut-value').textContent='9.00 m';
 const lo=[0,1,2].map(i=>Math.max(...es.map(e=>e.bounds[0][i]))),hi=[0,1,2].map(i=>Math.min(...es.map(e=>e.bounds[1][i])));
 controls.target.copy(vector(lo.map((v,i)=>(v+hi[i])/2)));const distance=Math.max(1.1,Math.min(4,Math.max(...hi.map((v,i)=>Math.abs(v-lo[i])))*2.5));
 // Look from the first member's side of the joint so the receiver does not
 // hide the end being reviewed (notably rafters meeting a ridge).
 const toward=vector(centre(es[0])).sub(controls.target);toward.y=0;
 if(toward.lengthSq()<.0001)toward.set(.9,0,1);toward.normalize();
 const side=new THREE.Vector3(-toward.z,0,toward.x).multiplyScalar(.45);
 toward.add(side);toward.y=.75;
 camera.position.copy(controls.target).add(toward.normalize().multiplyScalar(distance));controls.update();
}
function isolate(key){state.systemFilters=null;state.focusSystem=['roof','floors'].includes(key)?key:null;state.isolated=null;state.isolatedIds=null;state.selected=null;$('selection').innerHTML=emptySelection;state.retained=false;state.representation='members';state.categories=[...(ISOLATION[key]??MEMBER_CATEGORIES)];state.view='model';renderSystems();syncInputs();refresh();fit();}
function setRoofOption(option){
 if(!['retain','replace'].includes(option))return;state.roofOption=option;state.isolated=null;state.isolatedIds=null;
 const selected=data.elements.find(e=>e.id===state.selected);if((selected?.condition==='roof-rebuild'&&option==='retain')||(selected?.roofContext&&option==='replace')){state.selected=null;$('selection').innerHTML=emptySelection;}
 syncInputs();refresh();const url=new URL(location.href);url.searchParams.set('roof',option);history.replaceState(null,'',url);
}
$('roof-option').onchange=()=>setRoofOption($('roof-option').value);
$('roof-options').onclick=event=>{const b=event.target.closest('[data-roof-choice],[data-roof-model],[data-roof-plan]');if(!b)return;const option=b.dataset.roofChoice??b.dataset.roofModel??b.dataset.roofPlan;setRoofOption(option);if(b.dataset.roofModel||b.dataset.roofPlan){isolate('roof');state.retained=true;state.level=b.dataset.roofPlan?'3':'all';state.view=b.dataset.roofPlan?'plan':'model';syncInputs();refresh();fit();}};
function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function renderCosts(){
 $('costs').innerHTML=costMarkup(members,state,rates);
 $('costs').querySelectorAll('[data-rate]').forEach(input=>input.onchange=()=>{const value=Number(input.value);if(Number.isFinite(value)&&value>=0){rates[input.dataset.rate][input.dataset.bound]=value;saveRates();renderCosts();}});
 $('reset-rates').onclick=()=>{rates=structuredClone(members.rates);saveRates();renderCosts();};
 $('export-cost').onclick=()=>download(memberCSV(members,state,rates),`Ashley-Heights-M15-roof-${state.roofOption}-partial-member-costs-ex-VAT.csv`,'text/csv;charset=utf-8');
 $('visible-count').textContent='Partial subtotal · net geometry · unpriced work excluded';
}
function renderTrials(){$('trials').innerHTML=trialMarkup(data,trials,trialScenario);$('trial-scenario').onchange=event=>{trialScenario=event.target.value;renderTrials();};}
$('trials').onclick=event=>{const b=event.target.closest('[data-trial-element]');if(b){select(b.dataset.trialElement);$('focus-element').click();}};
function renderRegister(){const query=$('search').value.trim().toLowerCase();const es=filteredElements(data,state).filter(e=>(e.id+' '+e.name+' '+(e.section??'')+' '+(e.scope??'')).toLowerCase().includes(query));$('register-list').innerHTML=es.map(e=>`<button class="register-row ${e.id===state.selected?'selected':''}" data-element="${esc(e.id)}"><strong>${esc(e.id)}</strong><span>${esc(e.name.replace(/^Proposal \| /,''))}</span><small>${esc(CATEGORIES[e.category].label+' · '+e.status)}</small></button>`).join('');$('visible-count').textContent=es.length+' references · trial geometry, not an order list';}
function syncInputs(){for(const id of ['region','level','representation','scope'])$(id).value=state[id];$('retained').checked=state.retained;$('roof-option').value=state.roofOption;$('garage-rebuild').checked=state.garageRebuild;$('loft-upgrade').checked=state.loftUpgrade;for(const c of root.querySelectorAll('#systems input'))c.checked=state.categories.includes(c.value);}
function resize(){if(embed||state.view!=='model')return;const rect=$('viewport').getBoundingClientRect();renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/Math.max(1,rect.height);camera.updateProjectionMatrix();}
if(!embed)new ResizeObserver(resize).observe($('viewport'));
function renderSystems(){const keys=state.representation==='members'?MEMBER_CATEGORIES:Object.keys(CATEGORIES).filter(k=>!MEMBER_CATEGORIES.includes(k));$('systems').innerHTML=keys.map(id=>{const c=CATEGORIES[id];return `<label class="check"><input type="checkbox" value="${id}" ${state.categories.includes(id)?'checked':''}><i class="swatch" style="background:${c.color}"></i>${esc(c.label)}<span class="system-count">${data.elements.filter(e=>e.category===id).length}</span></label>`;}).join('');}
renderSystems();
function syncSystemButtons(){
 for(const button of root.querySelectorAll('#isolation [data-isolate]')){
  const key=button.dataset.isolate,active=state.systemFilters??[];
  button.setAttribute('aria-pressed',String(key==='all'?SYSTEM_KEYS.every(k=>active.includes(k)):active.includes(key)));
 }
}
function toggleVisibleSystem(key){
 state.systemFilters=toggleSystem(state.systemFilters??[],key);
 state.categories=categoriesForSystems(state.systemFilters);state.representation='members';
 state.focusSystem=state.systemFilters.length===1&&state.systemFilters[0]==='roof'?'roof':null;
 state.isolated=null;state.isolatedIds=null;
 renderSystems();syncInputs();refresh();
}
$('isolation').onclick=event=>{const b=event.target.closest('[data-isolate]');if(b)toggleVisibleSystem(b.dataset.isolate);};
$('representation').onchange=()=>{state.systemFilters=null;state.focusSystem=null;state.representation=$('representation').value;state.isolated=null;state.isolatedIds=null;state.categories=state.representation==='members'?[...ISOLATION.all]:Object.keys(CATEGORIES).filter(k=>!MEMBER_CATEGORIES.includes(k));renderSystems();refresh();if(!embed)fit();};
$('scope').onchange=()=>{state.scope=$('scope').value;state.isolated=null;state.isolatedIds=null;if(state.scope==='garage-rebuild')state.garageRebuild=true;syncInputs();refresh();if(!embed)fit();};
$('loft-upgrade').onchange=()=>{state.loftUpgrade=$('loft-upgrade').checked;state.isolated=null;state.isolatedIds=null;refresh();};
$('garage-rebuild').onchange=()=>{state.garageRebuild=$('garage-rebuild').checked;state.isolated=null;state.isolatedIds=null;refresh();};
for(const el of [$('selection'),$('member-issues'),$('junctions'),$('foundations'),$('costs')])el.addEventListener('click',event=>{if(event.target.closest('[data-foundation-study]')){state.view='foundations';refresh();return;}const pair=event.target.closest('[data-junction-pair]');if(pair){inspectJunction(pair.dataset.junctionPair.split(','));return;}if(event.target.closest('#export-cuts')){download(cutCSV(members,state),'Ashley-Heights-M15-model-dimensions-NOT-FOR-FABRICATION.csv','text/csv;charset=utf-8');return;}const b=event.target.closest('[data-focus-member]');if(b){state.isolated=null;state.isolatedIds=null;select(b.dataset.focusMember);focusElement(data.elements.find(e=>e.id===b.dataset.focusMember));}});
$('systems').onchange=()=>{state.systemFilters=null;state.focusSystem=null;state.isolated=null;state.isolatedIds=null;state.categories=[...root.querySelectorAll('#systems input:checked')].map(x=>x.value);refresh();};
for(const id of ['region','level'])$(id).onchange=()=>{state[id]=$(id).value;if(state.view==='plan'&&state.level==='all')state.level='0';syncInputs();refresh();if(!embed)fit();};
$('trial-overlay').onchange=()=>{state.trialOverlay=$('trial-overlay').checked;refresh();};
$('retained').onchange=()=>{state.retained=$('retained').checked;refresh();};
for(const b of root.querySelectorAll('.tabs button'))b.onclick=()=>{state.view=b.dataset.view;if(state.view==='plan'&&state.level==='all')state.level='0';syncInputs();refresh();};
for(const b of root.querySelectorAll('#appearance button'))b.onclick=()=>{state.mode=b.dataset.mode;for(const other of root.querySelectorAll('#appearance button'))other.setAttribute('aria-pressed',String(other===b));refresh();};
$('cut').oninput=()=>{clipping.constant=Number($('cut').value);$('cut-value').textContent=clipping.constant.toFixed(2)+' m';};
$('architecture-cut').oninput=()=>{architectureClipping.constant=Number($('architecture-cut').value);$('architecture-cut-value').textContent=architectureClipping.constant.toFixed(2)+' m';};
$('context-opacity').oninput=setOverlayOpacity;
$('context').onchange=()=>context($('context').checked);$('fit').onclick=fit;
$('elevation').onchange=()=>{state.view=$('elevation').value;refresh();};
$('section-at').oninput=()=>{const n=Number($('section-at').value);if(Number.isFinite(n)){state.sectionAt=n;refresh();}};
$('search').oninput=renderRegister;
for(const el of [$('drawing'),$('register-list')]){el.onclick=event=>{const row=event.target.closest('[data-element]');if(row)select(row.dataset.element);};el.onkeydown=event=>{if(['Enter',' '].includes(event.key)){const row=event.target.closest('[data-element]');if(row){event.preventDefault();select(row.dataset.element);}}};}
let start=null;const ray=new THREE.Raycaster();ray.params.Line.threshold=.08;
pickCanvas.addEventListener('pointerdown',e=>{if(embed&&!embed.active())return;start=[e.clientX,e.clientY];});
pickCanvas.addEventListener('pointerup',event=>{if(embed&&(!embed.active()||state.view!=='model'))return;if(!start||Math.hypot(event.clientX-start[0],event.clientY-start[1])>5)return;const r=pickCanvas.getBoundingClientRect();const ndc=document.pointerLockElement===pickCanvas?new THREE.Vector2():new THREE.Vector2((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);if(embed?.canPick&&!embed.canPick(ndc))return;camera.updateMatrixWorld();scene.updateMatrixWorld(true);ray.setFromCamera(ndc,camera);const picks=ray.intersectObjects([...batches.map(b=>b.object),...meshes.values(),...lines.values()].filter(m=>m.visible),false).filter(p=>p.point.y<=(p.object.material.clippingPlanes?.[0]?.constant??9)+.001);if(picks.length){const p=picks[0],u=p.object.userData;const id=u.batch?u.ranges.find(r=>(u.kind==='mesh'?p.faceIndex:p.index)<r.end)?.id:u.element.id;if(id)select(id);}});
$('download-svg').onclick=()=>{if(state.view==='trials'){const url=URL.createObjectURL(new Blob([directionSVG(data,trials)],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download='Ashley-Heights-span-direction-study.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}const view=['model','schedule','costs','issues','roof-options','junctions','foundations'].includes(state.view)?'plan':state.view;const {svg}=makeDrawing(data,{...state,view,level:state.level==='all'?0:Number(state.level),light:true});const blob=new Blob([svg],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`Ashley-Heights-${view}-${state.representation==='members'?'M15-roof-'+state.roofOption:'P01'}-NOT-FOR-CONSTRUCTION.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('issues').innerHTML=[...data.coordinationItems,...members.issues].map(x=>`<p><strong>${esc(x.id+' · '+x.title)}</strong><br>${esc(x.detail)}</p>`).join('');
$('coverage').innerHTML=['M01 adds detailed trial members and wall assemblies. Existing hidden framing is not surveyed. '+members.elements.length+' member/assembly references. Priced quantities cover a subset only.',...members.excludedCosts].map(x=>`<p>${esc(x)}</p>`).join('');
$('sources').innerHTML=[...data.sources,...members.sources].map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title)} ↗</a>`).join('');
$('loading').hidden=true;const initialView=new URLSearchParams(location.search).get('view');if(['trials','issues','costs','roof-options','junctions','foundations'].includes(initialView))state.view=initialView;syncInputs();refresh();if(!embed)fit();
const initial=new URLSearchParams(location.search).get('element');if(data.elements.some(e=>e.id===initial))select(initial);
const packResponse=await fetch(resource('pack.json'));if(packResponse.ok){const pack=await packResponse.json();if(!pack.available){const link=root.querySelector('a[href="./coordination-pack.pdf"]');link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.textContent='PDF awaits current drawing issue';}}
const trialPackResponse=await fetch(resource('trial-pack.json'));if(trialPackResponse.ok){const p=await trialPackResponse.json();if(!p.available){const link=root.querySelector('a[href="./trial-study.pdf"]');link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.textContent='Trial PDF awaits current issue';}}
if(!embed)renderer.setAnimationLoop(()=>{if(state.view==='model'&&!document.hidden){controls.update();renderer.render(scene,camera);}});
const api={ready:true,data,trials,members,setRoofOption,inspectJunction,toggleVisibleSystem,get rates(){return rates;},isolate,focusElement,visible:()=>current().map(e=>e.id),setGarageRebuild(on){state.garageRebuild=on;syncInputs();refresh();},controls,directionSVG:()=>directionSVG(data,trials),state,select,fit,setView(view){state.view=view;refresh();},setRegion(region){state.region=region;syncInputs();refresh();fit();},setLevel(level){state.level=String(level);syncInputs();refresh();fit();},drawing:options=>makeDrawing(data,{...state,...options}),renderer,scene,camera,get architecture(){return architecture;},cutawayPlanes:{structure:clipping,architecture:architectureClipping}};

if(!embed)window.structureStudio=api;
return api;
}
