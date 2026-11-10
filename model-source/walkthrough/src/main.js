import {buildingClipBoxes} from './vegetation-clipping.js';
import {loadModel} from './model-delivery.js';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {createSpatialBatcher} from './spatial-batches.js';
import {surfaceDetail,setLawnTexture} from './materials.js';
import {installVisualOverlay} from './visual-overlay.js';
import {ExteriorAppearance} from './exterior-appearance.js';
import lawnImage from '../node_modules/@dgreenheck/ez-tree/src/app/public/grass.jpg';   // MIT (ez-tree)
import daylightSettings from '../public/visual-quality/daylight-settings.json';
import {daylight} from './lighting.js';
import {roomLights} from './room-lights.js';
import {loadBakedDaylight} from './baked-daylight.js';
import {roomReflections} from './room-reflections.js';
import {qualityMaterial,finishQualityMaterial} from './quality-materials.js';
import {roomMirrors} from './room-mirrors.js';
import {RenderBudget} from './render-budget.js';
import {DoorMotion,applyDoorDetailOverrides} from './doors.js';
import {Navigation,pointInPolygon} from './navigation.js';
import {TouchControls,coarsePointer} from './touch.js';
import {EasterSession} from './easter-session.js';
import {WaveGame} from './wave-game.js';
import {flyPosition,walkingPosition} from './flight.js';
import {currentDesign,isProposal,comparisonURL,saveComparisonView,takeComparisonView,comparisonPosition,DESIGN_LABELS,DESIGN_ASSETS} from './design-comparison.js';
import {StreetContext,readStreetPreference,writeStreetPreference,disableStreetSafely,onStreet} from './street-context.js';
import {loadVehicle,preloadVehicles,captureVehicleReflections} from './vehicle-models.js';
import {VEHICLES} from './vehicle-specs.js';
import {Life,carTemplateFromMeshes} from './life.js';
import {loadResidentAssets,RealisticResidentFigure} from './realistic-residents.js';
import {createStructureWalkthrough} from './structure-walkthrough.js';
import {Inspector} from './inspect.js';
import {Vegetation,claims as vegetationClaims} from './vegetation.js';
import {STREET_DATA} from './street-context-data.js';
const $=id=>document.getElementById(id);

document.body.classList.toggle('touch-ui',coarsePointer());
const canvas=$('view'), scene=new THREE.Scene();scene.background=new THREE.Color('#dce5e5');
const viewportSize=()=>({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
const initialViewport=viewportSize();
const camera=new THREE.PerspectiveCamera(60,initialViewport.width/initialViewport.height,.045,150);
let renderer,nav,data,doors,easter=null,yaw=0,pitch=0,ready=false,active=false,dragging=false,lastPointer=null,mode='drag',lastTime=0,mapTime=0,chaseShadowTime=0,pageFocused=true;
const keys=new Set();const stats={sourceMeshes:0,batches:0,hiddenMeshes:0};
const diagnostics=new URLSearchParams(location.search).has('diagnostics'),frameSamples=[];let diagnosticRoom=null,diagnosticSince=0;
let flying=false,lastWalkingPosition=null,takeoffTime=0;const verticalPointers=new Map();
let localLights=null;
let bakedDaylight=null,reflections=null,presentation=false,viewLens='natural';
let mirrors=null;
let appearance=null,appearanceBatches=[];
let vegetation=null,pendingStreetGroup=null,streetContext=null,settingsPrevious=null,life=null,lifeShadowTime=0,inspector=null,pressPoint=null;
let structureView=null,structureLoading=null,structureDocument=false,structureInspectBefore=false;
const LIFE_KEYS={people:'ashley-heights-life-people',cars:'ashley-heights-life-cars'};
function readLifePreference(kind){try{return localStorage.getItem(LIFE_KEYS[kind])==='1';}catch{return false;}}
function writeLifePreference(kind,on){try{localStorage.setItem(LIFE_KEYS[kind],on?'1':'0');}catch{}}
const clearVertical=()=>{verticalPointers.clear();};
try{renderer=new THREE.WebGLRenderer({canvas,antialias:!coarsePointer(),powerPreference:'high-performance'});}
catch(e){$('load-status').textContent='3D graphics could not start. Open this walkthrough in Safari or Chrome with hardware acceleration enabled.';throw e;}
let savedQuality='auto';try{savedQuality=localStorage.getItem('ashley-heights-visual-quality')??'auto';}catch{}
const renderBudget=new RenderBudget({mobile:coarsePointer(),dpr:devicePixelRatio,quality:savedQuality});
renderer.setPixelRatio(renderBudget.ratio(initialViewport.width,initialViewport.height));renderer.setSize(initialViewport.width,initialViewport.height,false);
renderer.outputColorSpace=THREE.SRGBColorSpace;
const lighting=daylight(renderer,scene,camera);
$('visual-quality').value=renderBudget.quality;
$('visual-quality').onchange=()=>{renderBudget.setQuality($('visual-quality').value);try{localStorage.setItem('ashley-heights-visual-quality',renderBudget.quality);}catch{}resize();};
function setViewLens(value){viewLens=['natural','wide','detail'].includes(value)?value:'natural';camera.fov=({natural:60,wide:72,detail:48})[viewLens];if(viewLens==='natural'&&camera.aspect<.8)camera.fov=70;camera.updateProjectionMatrix();$('view-lens').value=viewLens;}
function setPresentation(value){presentation=!!value;document.body.classList.toggle('presentation',presentation);$('restore-controls').hidden=!presentation;$('presentation-toggle').setAttribute('aria-pressed',String(presentation));if(presentation){closeSettings({focus:false});setInspect(false,{persist:false});if(!active&&ready)start(false);}canvas.focus();}
$('view-lens').onchange=e=>setViewLens(e.target.value);
$('presentation-toggle').onclick=()=>setPresentation(true);$('restore-controls').onclick=()=>setPresentation(false);
setViewLens('natural');
{const tex=new THREE.TextureLoader().load(lawnImage);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;setLawnTexture(tex);}
const touch=new TouchControls(canvas,$('move-pad'),$('move-thumb'),(dx,dy)=>{if(!ready||!active)return;yaw-=dx*.004;pitch=Math.max(-1.35,Math.min(1.35,pitch-dy*.004));syncCamera();},()=>{if(structureView?.enabled)return;if(inspector?.enabled&&!easter?.game.started)inspectAt();else easter?.game.tapFire();});
function setMapVisible(show){$('map').hidden=!show;$('map-panel').classList.toggle('collapsed',!show);$('map-toggle').textContent=touch.enabled?(show?'×':'Map +'):(show?'−':'+');$('map-toggle').setAttribute('aria-expanded',String(show));$('map-toggle').setAttribute('aria-label',show?'Hide floorplan':'Show floorplan');}
setMapVisible(!touch.enabled);
function toast(text){$('toast').textContent=text;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').hidden=true,4200);}
function syncCamera(){const p=nav.position;camera.position.set(p.x,p.z+data.eyeHeight,-p.y);camera.rotation.set(pitch,yaw,0,'YXZ');}
function setDirection(d){yaw=Math.atan2(-d[0],d[1]);pitch=Math.atan2(d[2]||0,Math.hypot(d[0],d[1]));}
function upperBalcony(p){return p.z>2&&p.z<3.3&&p.y>7.89&&p.y<10.64&&p.x>5.04&&p.x<9.08;}
function floorAt(z){return [...(data.floorLevels??[{id:0,z:0,label:'Ground floor'},{id:1,z:2.8,label:'First floor'}])].reverse().find(f=>z>=f.z-.35)??{id:0,z:0,label:'Ground floor'};}
function roomLabel(){const p=nav.position;if(flying){const h=p.z+data.eyeHeight;return 'Flying · '+Math.round(Math.abs(h))+' m '+(h<0?'below ground':'high');}if(onStreet(data,p))return 'Ashley Close';if(data.approachSurface&&pointInPolygon(p.x,p.y,data.approachSurface.polygon)&&!pointInPolygon(p.x,p.y,data.site.outline_m))return 'Outside gates';const floor=floorAt(p.z).id;const room=data.planRooms.find(r=>(r.floor===floor||(floor===0&&r.floor===2))&&pointInPolygon(p.x,p.y,r.polygon_m));return room?.name || (upperBalcony(p)?'Balcony':null) || (p.y>10?'Garden':p.y<0?'Front of house':p.z>.2&&p.z<2.7?'Stairs':'Outside');}
function updateMap(){
 const p=nav.position,level=floorAt(p.z),out=p.y>11&&p.z<1;const floor=level.id;
 $('location').textContent=roomLabel();$('floor-label').textContent=flying?'Site view':out?'Garden':Math.abs(p.z-level.z)>.35?'Stairs':level.label;
 const ctx=$('map').getContext('2d'),w=480,h=310;ctx.clearRect(0,0,w,h);
 const contextVisible=data.streetContext?.enabled,streetView=contextVisible&&(flying||onStreet(data,p));
 const extent=streetView?[-72,-51,31,34]:flying?[data.bounds[0]-4,data.bounds[1]-4,data.bounds[2]+4,data.bounds[3]+4]:out?[-28,8,19,33]:p.y<-.5?[-9,-24,19,11]:[-5.8,-1,14.7,11.2];const scale=Math.min((w-24)/(extent[2]-extent[0]),(h-24)/(extent[3]-extent[1]));
 const ox=(w-(extent[2]-extent[0])*scale)/2,oy=(h-(extent[3]-extent[1])*scale)/2;
 const xy=([x,y])=>[ox+(x-extent[0])*scale,h-oy-(y-extent[1])*scale];
 const drawPoly=(poly,fill,stroke)=>{ctx.beginPath();poly.forEach((v,i)=>{const[a,b]=xy(v);i?ctx.lineTo(a,b):ctx.moveTo(a,b);});ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=1.6;ctx.stroke();};
 if(streetView){drawPoly(data.streetContext.road,'#a1aaa2','#808d83');for(const house of data.streetContext.obstacles)drawPoly(house.polygon,'#d6d0c3','#a39a8b');$('floor-label').textContent='Street context';}
 if((flying||out||p.y<-.5)&&data.site?.outline_m)drawPoly(data.site.outline_m,'#d8e2cf','#9aaa96');
 for(const r of data.planRooms)if(flying?(r.floor===0||r.floor===2):out?r.floor===2:r.floor===floor)drawPoly(r.polygon_m,r.name===roomLabel()?'#c0dacf':'#e9ece3','#8c9d90');
 if(!out&&!flying)for(const s of nav.segments)if(Math.abs(s.bottom-level.z)<.1){const a=xy(s.a),b=xy(s.b);ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.strokeStyle='#62766b';ctx.lineWidth=2;ctx.stroke();}
 const [x,y]=xy([p.x,p.y]);ctx.save();ctx.translate(x,y);ctx.rotate(-yaw);ctx.fillStyle='#2c7864';ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(-8,7);ctx.lineTo(0,3);ctx.lineTo(8,7);ctx.closePath();ctx.fill();ctx.restore();
}
function syncFlightUI(){
 document.body.classList.toggle('flying',flying);$('flight-toggle').textContent=flying?'↓ Walk':'↑ Fly';$('flight-toggle').setAttribute('aria-pressed',String(flying));$('flight-toggle').setAttribute('aria-label',flying?'Return to walking':'Fly around the house');$('flight-height').hidden=!flying;
 if(!easter?.game.started){
  $('hint').textContent=flying?'W A S D · E up / Q down · Shift faster · F walk · Esc controls':'W A S D / arrows · Shift faster · E fly · Esc controls';
  $('welcome').querySelector('h1').textContent=flying?'Fly around.':'Come inside.';
  $('welcome').querySelector('.keys span').innerHTML=flying?'W A S D move towards your view.<br>E up · Q down · Shift faster · F walk':'Move with these or the arrow keys.<br>Move your mouse to look around.';
  $('welcome').querySelector('.touch-instructions p').textContent=flying?'Move and look together. Hold Up or Down to change height. Push the pad farther to fly faster.':'Use both together. Push the movement pad farther to sprint.';
  if(ready)$('start').textContent=flying?'Start flying':'Start walking';
 }
}
function setFlying(value,{quiet=false}={}){
 if(!ready||easter?.game.started)return;
 if(value&&!flying)lastWalkingPosition=walkingPosition(nav,nav.position,lastWalkingPosition).position;
 if(!value&&flying){const restored=walkingPosition(nav,nav.position,lastWalkingPosition);nav.position=restored.position;}
 flying=!!value;keys.clear();touch.reset();clearVertical();syncFlightUI();syncCamera();updateMap();
}
function goTo(id){const room=data.rooms.find(r=>r.id===id);if(!room)return;if(flying)setFlying(false,{quiet:true});touch.reset();nav.teleport(room);lastWalkingPosition={...nav.position};setDirection(room.direction);if(doors?.snap(nav.position))lighting.updateShadows();syncCamera();updateMap();$('rooms').value=id;keys.clear();}
function showMenu(show){if(easter?.clock.phase==='caught')return;if(show)easter?.game.cancelFire();$('welcome').hidden=!show;$('resume').hidden=touch.enabled||show||document.pointerLockElement===canvas;document.body.classList.toggle('walking',!show);active=!show;touch.setActive(active);keys.clear();clearVertical();}
function duration(seconds){return Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0');}
function caught(){
 easter.clock.catch();active=false;keys.clear();touch.setActive(false);dragging=false;document.body.classList.remove('walking');
 $('chase-status').hidden=true;$('welcome').hidden=true;$('resume').hidden=true;
 if(document.pointerLockElement)document.exitPointerLock();
 const score=easter.game.state;$('caught-score').textContent=`Wave ${score.wave} · ${score.kills} defeated · ${score.score.toLocaleString()} points. Best: ${easter.game.best.toLocaleString()}.`;
 $('caught').showModal();$('play-again').focus();
}
$('caught').addEventListener('cancel',event=>event.preventDefault());
$('play-again').onclick=()=>{if(!easter)return;easter.game.reset();easter.clock.reset();$('caught').close();$('chase-status').hidden=true;goTo('arrival');lighting.updateShadows();lastTime=performance.now();start(mode==='lock');};
async function start(lock){if(!ready)return;lock=lock&&!touch.enabled;mode=lock?'lock':'drag';showMenu(false);canvas.focus();if(lock){try{await canvas.requestPointerLock();}catch(e){mode='drag';toast('Click and drag to look around; use W A S D to move.');$('resume').hidden=false;}}}
$('start').onclick=()=>start(true);$('drag').onclick=()=>start(false);$('resume').onclick=()=>start(true);
$('help').onclick=()=>{if(document.pointerLockElement)document.exitPointerLock();showMenu(true);};
$('rooms').onchange=e=>{if(easter?.game.started)return;goTo(e.target.value);if(!$('welcome').hidden)return;canvas.focus();};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('Use your browser’s fullscreen control.');}};
function closeSettings({focus=true}={}){
 if(!settingsPrevious)return;const previous=settingsPrevious;settingsPrevious=null;$('settings-panel').hidden=true;$('settings-toggle').setAttribute('aria-expanded','false');active=previous.active;touch.setActive(active);keys.clear();
 if(focus)$('settings-toggle').focus();
 if(active&&previous.mode==='lock')$('resume').hidden=false;
}
function openSettings(){
 if(!ready)return;if(settingsPrevious){closeSettings();return;}
 settingsPrevious={active,mode};mode='drag';active=false;keys.clear();clearVertical();touch.setActive(false);easter?.game.cancelFire();dragging=false;
 if(document.pointerLockElement)document.exitPointerLock();
 $('settings-panel').hidden=false;$('settings-toggle').setAttribute('aria-expanded','true');
 selectSettingsTab(easter?.game.started?'view':settingsTab,{focus:true});
}
let settingsTab='design';
function selectSettingsTab(name,{focus=false}={}){
 settingsTab=easter?.game.started?'view':name;
 for(const button of document.querySelectorAll('[data-settings-tab]')){
  const selected=button.dataset.settingsTab===settingsTab;
  button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;
  $(button.getAttribute('aria-controls')).hidden=!selected;
  if(selected&&focus)button.focus();
 }
 $('settings-panel').querySelector('.settings-body').scrollTop=0;
}
for(const button of document.querySelectorAll('[data-settings-tab]')){
 button.onclick=()=>selectSettingsTab(button.dataset.settingsTab);
 button.onkeydown=event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const tabs=[...document.querySelectorAll('[data-settings-tab]')].filter(b=>b.getClientRects().length);
  const index=tabs.indexOf(button),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  selectSettingsTab(tabs[next].dataset.settingsTab,{focus:true});
 };
}
function setStreetVisible(enabled,{persist=true}={}){
 if(!streetContext)return;let moved=false;
 if(enabled)streetContext.setVisible(true);else {moved=disableStreetSafely(nav,{flying});streetContext.setVisible(data.streetContext.enabled);}
 $('street-context').checked=data.streetContext.enabled;if(persist){try{writeStreetPreference(localStorage,data.streetContext.enabled);}catch{}}
 stats.streetContext={...streetContext.stats,enabled:data.streetContext.enabled};keys.clear();touch.reset();clearVertical();if(moved){lastWalkingPosition={...nav.position};doors?.snap(nav.position);toast('Street hidden. Returned to the front gates.');}
 syncCamera();updateMap();lighting.updateShadows();
}
function setExteriorAppearance(value){
 if(!appearance?.enabled)return;
 const state=appearance.set(value);
 $('exterior-walls').value=state.walls;$('exterior-roof').value=state.roof;
 for(const mesh of appearanceBatches)mesh.visible=appearance.visible(mesh.material);
 lighting.updateShadows();return state;
}
$('exterior-walls').onchange=e=>setExteriorAppearance({walls:e.target.value});
$('exterior-roof').onchange=e=>setExteriorAppearance({roof:e.target.value});
$('settings-toggle').onclick=openSettings;$('settings-close').onclick=()=>closeSettings();$('street-context').onchange=e=>setStreetVisible(e.target.checked);
let peopleRequest=0;
async function setLife(kind,on,{persist=true}={}){
 if(!life)return;
 if(kind==='people'){
  const request=++peopleRequest,targetLife=life;
  $('life-people').checked=on;
  if(persist)writeLifePreference(kind,on);
  if(on&&!life.residents.length){
   $('people-description').textContent='Loading detailed people…';
   stats.life={...stats.life,loadingPeople:true};
   try{
    const assets=await loadResidentAssets();
    if(request!==peopleRequest||life!==targetLife)return;
    life.figureFactory=(index,style)=>new RealisticResidentFigure(assets.get(style),index,style,{scene,bakedDaylight});
   }catch(error){
    if(request!==peopleRequest||life!==targetLife)return;
    console.warn('Detailed people unavailable',error);
    $('life-people').checked=false;$('people-description').textContent='People could not load. Switch on to retry.';
    stats.life={...stats.life,loadingPeople:false};return;
   }
  }
  $('people-description').textContent='Detailed residents going about the house.';
  life.setPeople(on);
 }else{
  if(on&&!life.cars.length){toast(isProposal(currentDesign)?'No car paths are available for this design.':'Cars belong to the proposed design: switch to Proposed.');$('life-cars').checked=false;return;}
  life.setCars(on);
 }
 $(kind==='people'?'life-people':'life-cars').checked=kind==='people'?life.people:life.carsOn;
 if(persist)writeLifePreference(kind,on);
 stats.life={people:life.people,cars:life.carsOn,residents:life.residents.length,carCount:life.cars.length,loadingPeople:false};
 lighting.updateShadows();
}
$('life-people').onchange=e=>setLife('people',e.target.checked);$('life-cars').onchange=e=>setLife('cars',e.target.checked);
// Identify objects: click anything and read its unique model name.
function setInspect(on,{persist=true}={}){
 if(on&&structureView?.enabled)return;
 if(!inspector)return;inspector.setEnabled(on);document.body.classList.toggle('inspecting',inspector.enabled);$('inspect-mode').checked=inspector.enabled;
 if(!inspector.enabled)$('inspect-card').hidden=true;
 streetContext?.setLabels(inspector.enabled);   // tree/building ID labels (M2, T9, H3) only while identifying
 if(persist){try{localStorage.setItem('ashley-heights-inspect',inspector.enabled?'1':'0');}catch{}}
}
function describePick(pick){
 if(!pick)return;
 $('inspect-name').textContent=pick.name;
 const kind={model:'',door:'Door · ',car:'Car · ',person:'Person · ',street:'Street · ',other:''}[pick.kind]??'';
 const size=pick.size?`${pick.size.size.map(v=>v.toFixed(2)).join(' × ')} m · `:'';
 // The storey is the highest level at or below the object's lowest point, so
 // a ceiling reads as its own room's storey rather than the one above.
 const p=pick.point,base=pick.size?pick.size.min[2]:p.z,levels=data.floorLevels??[{z:0,label:'Ground floor'},{z:2.8,label:'First floor'}];
 const level=[...levels].filter(l=>l.z<=base+.06).sort((a,b)=>b.z-a.z)[0]??levels[0];
 const storey=base<-.4&&level.label==='Cellar'&&isProposal(currentDesign)?'Basement':base>levels.at(-1).z+2.6?'Roof':level.label;
 $('inspect-meta').textContent=`${kind}${size}at x ${p.x.toFixed(2)}, y ${p.y.toFixed(2)}, z ${p.z.toFixed(2)} · ${storey}`;
 $('inspect-card').hidden=false;window.walkthrough&&(window.walkthrough.lastPick=pick);
}
function inspectAt(clientX,clientY){
 if(!inspector?.enabled||!ready||easter?.game.started)return null;
 const {width,height}=viewportSize();
 const ndc=document.pointerLockElement===canvas||clientX===undefined?[0,0]:[clientX/width*2-1,-(clientY/height*2-1)];
 const pick=inspector.pick(ndc);
 if(pick)describePick(pick);else toast('Nothing there to identify.');
 return pick;
}
$('inspect-mode').onchange=e=>setInspect(e.target.checked);
$('inspect-close').onclick=()=>{$('inspect-card').hidden=true;inspector?.clear();};
$('inspect-copy').onclick=async()=>{const name=$('inspect-name').textContent;try{await navigator.clipboard.writeText(name);toast('Copied: '+name);}catch{toast('Select the name to copy it.');}};
document.addEventListener('pointerdown',e=>{if(settingsPrevious&&!$('settings-panel').contains(e.target)&&!$('settings-toggle').contains(e.target))closeSettings({focus:false});},true);
const goToDesign=target=>{if(!ready)return;saveComparisonView(target,{...nav.position,yaw,pitch,active:settingsPrevious?.active??active,flying,lastWalkingPosition});location.assign(comparisonURL(target));};
$('design-switch').onchange=e=>goToDesign(e.target.value);
$('structure-open-proposed').onclick=()=>goToDesign('proposed');
async function toggleStructure(force){
 if(!ready||currentDesign!=='proposed')return;
 if(document.pointerLockElement)document.exitPointerLock();
 if(!structureView){
  $('structure-toggle').disabled=true;$('structure-status').textContent='Loading…';
  try{structureLoading??=createStructureWalkthrough({scene,renderer,camera,canvas,
   controlsMount:$('structure-settings-mount'),
   renderHouse(){mirrors?.update(camera);return lighting.render({toScreen:false});},
   focus(position,target){setFlying(true,{quiet:true});nav.position={x:position.x,y:-position.z,z:position.y-data.eyeHeight};const d=target.clone().sub(position);setDirection([d.x,-d.z,d.y]);syncCamera();updateMap();},
   onView(view,on){structureDocument=on&&view!=='model';keys.clear();touch.reset();if(structureDocument){closeSettings({focus:false});if(document.pointerLockElement)document.exitPointerLock();}},
   onActive(on){if(on){structureInspectBefore=!!inspector?.enabled;setInspect(false,{persist:false});setMapVisible(false);if(!settingsPrevious)start(false);}else setInspect(structureInspectBefore,{persist:false});$('structure-toggle').setAttribute('aria-pressed',String(on));$('structure-status').textContent=on?'On':'Off';$('structure-off-note').hidden=on;lighting.updateShadows();}
  });structureView=await structureLoading;window.walkthrough.structure=structureView;
  }catch(error){structureLoading=null;console.error(error);toast('Structure could not load. Try again.');}
  finally{$('structure-toggle').disabled=false;$('structure-status').textContent=structureView?.enabled?'On':'Off';}
 }
 if(structureView)structureView.setEnabled(force??!structureView.enabled);
}
$('structure-toggle').onclick=()=>toggleStructure();

$('map-toggle').onclick=()=>setMapVisible($('map').hidden);
$('flight-toggle').onclick=()=>{setFlying(!flying);if(!active)start(false);canvas.focus();};
for(const [id,direction]of [['fly-up',1],['fly-down',-1]]){
 const button=$(id);
 button.addEventListener('pointerdown',e=>{if(!flying||!active)return;e.preventDefault();verticalPointers.set(e.pointerId,direction);button.setPointerCapture(e.pointerId);});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,e=>verticalPointers.delete(e.pointerId));
 button.addEventListener('click',e=>{if(e.detail===0&&flying&&active){nav.position=flyPosition(data,nav.position,{vertical:direction,dt:.04});syncCamera();}button.blur();});
 button.addEventListener('contextmenu',e=>e.preventDefault());
}
for(const event of ['blur','resize'])window.addEventListener(event,clearVertical);document.addEventListener('visibilitychange',clearVertical);
document.addEventListener('pointerlockchange',()=>{if(document.pointerLockElement===canvas){showMenu(false);mode='lock';}else if(mode==='lock'&&ready){mode='drag';showMenu(false);}});
document.addEventListener('pointerlockerror',()=>{mode='drag';showMenu(false);});
canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'||!ready||!active)return;canvas.focus();dragging=true;lastPointer=[e.clientX,e.clientY];pressPoint=[e.clientX,e.clientY,e.timeStamp];canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointerup',e=>{
 dragging=false;lastPointer=null;
 // A click without a drag identifies what is under the pointer (or the crosshair when the mouse is captured).
 if(pressPoint&&inspector?.enabled&&e.pointerType!=='touch'&&e.pointerType!=='pen'){const moved=document.pointerLockElement===canvas?0:Math.hypot(e.clientX-pressPoint[0],e.clientY-pressPoint[1]);if(moved<5&&e.timeStamp-pressPoint[2]<600)inspectAt(e.clientX,e.clientY);}
 pressPoint=null;
});
canvas.addEventListener('pointercancel',()=>{dragging=false;});
document.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||e.pointerType==='pen'||!active)return;let dx=0,dy=0;if(document.pointerLockElement===canvas){dx=e.movementX;dy=e.movementY;}else if(dragging&&lastPointer){dx=e.clientX-lastPointer[0];dy=e.clientY-lastPointer[1];lastPointer=[e.clientX,e.clientY];}else return;yaw-=dx*.0025;pitch=Math.max(-1.35,Math.min(1.35,pitch-dy*.0025));syncCamera();});
const moveKeys=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'];
document.addEventListener('keydown',e=>{const editing=e.composedPath().some(el=>['SELECT','INPUT','BUTTON','TEXTAREA'].includes(el.tagName));if(e.code==='KeyH'&&ready&&!e.repeat&&!editing&&!easter?.game.started){setPresentation(!presentation);return;}if(e.code==='KeyI'&&ready&&!editing&&!easter?.game.started){setInspect(!inspector?.enabled);toast(inspector?.enabled?'Identify objects · click anything to see its name':'Identify objects off');return;}if(e.code==='Escape'){if(presentation){e.preventDefault();setPresentation(false);return;}if(settingsPrevious){e.preventDefault();closeSettings();return;}if(document.pointerLockElement)document.exitPointerLock();showMenu(true);return;}if(structureDocument||editing||!active)return;if(e.code==='KeyF'&&!e.repeat&&!easter?.game.started){e.preventDefault();setFlying(!flying);return;}if(e.code==='KeyE'&&!flying&&!e.repeat&&!easter?.game.started){e.preventDefault();setFlying(true);takeoffTime=performance.now();keys.add('KeyE');return;}if(moveKeys.includes(e.code)||(flying&&['KeyE','KeyQ'].includes(e.code))){e.preventDefault();keys.add(e.code);}});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>{keys.clear();dragging=false;pageFocused=false;});window.addEventListener('focus',()=>{pageFocused=true;lastTime=performance.now();});document.addEventListener('visibilitychange',()=>{keys.clear();lastTime=performance.now();});
function resize(){const {width,height}=viewportSize();camera.aspect=width/height;setViewLens(viewLens);renderBudget.dpr=devicePixelRatio;renderer.setPixelRatio(Math.min(easter?.game.started?1.25:Infinity,renderBudget.ratio(width,height)));renderer.setSize(width,height,false);lighting.resize(width,height);}
window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);
async function load(){
 const qualityVariant=currentDesign==='proposed'?'compact':currentDesign==='planning'?'planning':null;
 const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
 const modelTask=loadModel(loader,(new URL('./'+DESIGN_ASSETS[currentDesign].model,import.meta.url)).href,e=>{const pc=e.total?Math.round(e.loaded/e.total*75):35;$('progress').style.width=pc+'%';$('load-status').textContent='Loading model · '+pc+'%';});
 modelTask.catch(()=>{});
 const daylightTask=qualityVariant?loadBakedDaylight(new URL('./visual-quality/'+qualityVariant+'-daylight.json',import.meta.url)).catch(error=>{console.warn('Using live lighting fallback',error);return null;}):Promise.resolve(null);
 const detailTask=qualityVariant?Promise.all([
  loadModel(loader,new URL('./visual-quality/'+qualityVariant+'-furnishings.glb',import.meta.url).href),
  fetch(new URL('./visual-quality/'+qualityVariant+'-furnishings.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Detail manifest missing');return r.json();})
 ]).catch(error=>{console.warn('Using original furnishings',error);return null;}):Promise.resolve(null);
 if(qualityVariant)preloadVehicles(VEHICLES);
 document.body.classList.add('loading');data=await fetch(new URL('./'+DESIGN_ASSETS[currentDesign].navigation,import.meta.url)).then(r=>{if(!r.ok)throw Error('Navigation file missing');return r.json();});nav=new Navigation(data);
 streetContext=new StreetContext(scene,data);
 streetContext.onBuilt=g=>{for(const m of g.children)if(/^Street context (leaf|bark)$/.test(m.name))m.visible=false;if(vegetation?.siteDone)vegetation.buildStreet(STREET_DATA.trees,g).then(()=>lighting.updateShadows());else pendingStreetGroup=g;};let streetEnabled=false;try{streetEnabled=readStreetPreference(localStorage);}catch{}streetContext.setVisible(streetEnabled);$('street-context').checked=streetEnabled;stats.streetContext={...streetContext.stats,enabled:streetEnabled};
 bakedDaylight=await daylightTask;if(bakedDaylight)lighting.info.bakedDaylight=bakedDaylight.info;
 localLights=roomLights(scene,bakedDaylight?[]:[
  {name:'Kitchen daylight bounce',position:[2.15,6.40,1.55],range:4.2,intensity:1.65},
  {name:'Hall daylight bounce',position:[6.55,2.70,1.60],range:3.4,intensity:1.45},
  ...(data.proposalLights??[]),
 ],{budget:touch.enabled?4:6});
 lighting.info.localBounceLights=localLights.info.budget;lighting.info.roomFills=localLights.info;
 if(data.modelUpdatedAt){const stamp=new Date(data.modelUpdatedAt);$('model-version').textContent='Updated '+new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Europe/London'}).format(stamp);$('model-version').title=stamp.toLocaleString('en-GB',{timeZone:'Europe/London'})+' · London time';}
 const gltf=await modelTask,detail=await detailTask;
 if(detail){
  try{
   const [overlay,detailManifest]=detail;
   const result=installVisualOverlay(gltf.scene,overlay.scene,{removedObjects:[...(detailManifest.barDetails?.removedObjects??[]),...(detailManifest.frameDetails?.removedObjects??[])]});
   const extra=detailManifest.barDetails?.navigationExtras;
   if(extra){const removed=new Set([...(extra.removeObstacles??[]),...(extra.obstacles??[]).map(o=>o.name)]);data.obstacles=data.obstacles.filter(o=>!removed.has(o.name));data.obstacles.push(...(extra.obstacles??[]));const mirrors=new Map(data.mirrors.map(o=>[o.name,o]));for(const mirror of extra.mirrors??[])mirrors.set(mirror.name,mirror);data.mirrors=[...mirrors.values()];nav=new Navigation(data);}
   applyDoorDetailOverrides(data.interactiveDoors,overlay.scene);stats.refinedObjects=result.replaced;
  }catch(error){console.warn('Using original furnishings',error);}
 }
 const vehicles=new Map(),vehicleBays=qualityVariant?new Set(VEHICLES.map(v=>v.bay)):null;
 if(vehicleBays)await Promise.all(VEHICLES.map(async spec=>{try{vehicles.set(spec.bay,await loadVehicle(scene,bakedDaylight,spec));}catch(error){console.warn(spec.model+' unavailable; using original parked car',error);}}));
 $('load-status').textContent='Preparing the rooms…';$('progress').style.width='85%';await new Promise(r=>setTimeout(r,20));
 gltf.scene.updateMatrixWorld(true);const hide=new Set(data.hiddenObjects),batches=createSpatialBatcher({cellSize:6,floorHeight:2.8,minMaterialTriangles:20000,indexVertices:false}),materials=new Map();
 doors=new DoorMotion(scene,data.interactiveDoors);
 mirrors=roomMirrors(scene,data.mirrors);
 vegetation=new Vegetation(scene,{mobile:touch.enabled});
 // Trees stop at the building: every room's volume (0.15 m out for the walls) clips the canopy.
 vegetation.setClipBoxes(buildingClipBoxes(data));
 vegetation.ground=(x,y)=>nav?.groundHeight?nav.groundHeight(x,y):0;
 // The outside-bay cars stay separate objects so the "Cars" setting can drive them.
 const dynamicBays=new Set((data.proposalSite?.driveway_bay_bounds_m??[]).map(b=>b.id).filter(id=>data.life?.drive?.[id]));const carMeshes=new Map();
 let appearanceStorage;try{appearanceStorage=localStorage;}catch{}
 appearance=new ExteriorAppearance({design:currentDesign,definition:data.exteriorAppearance,storage:appearanceStorage});
 $('exterior-finish-controls').hidden=!appearance.enabled;$('exterior-finish-controls').disabled=!appearance.enabled;
 $('exterior-walls').value=appearance.state.walls;$('exterior-roof').value=appearance.state.roof;
 function displayMaterial(material){
  const name=material.name;if(materials.has(name))return materials.get(name);
  const mat=qualityMaterial(material,{mobile:touch.enabled});const rgba=data.materials[name]||data.materials[name.replaceAll('_',' ')];if(rgba){mat.color.setRGB(...rgba.slice(0,3));mat.opacity=rgba[3];}mat.side=THREE.DoubleSide;
  if(mat.map)mat.map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  if(/Mirror/i.test(name)){mat.transparent=false;mat.opacity=1;mat.metalness=1;mat.roughness=.06;}
  else if(mat.transparent||mat.opacity<1||/Glazing|Glass/i.test(name)){mat.transparent=true;mat.depthWrite=false;mat.transmission=0;mat.roughness=.09;mat.metalness=0;mat.side=THREE.FrontSide;}
  surfaceDetail(mat,name);appearance.register(mat,name);finishQualityMaterial(mat);bakedDaylight?.attach(mat);materials.set(name,mat);return mat;
 }
 function isHidden(ob){for(let p=ob;p;p=p.parent)if(hide.has(p.userData.name||p.name))return true;return false;}
 gltf.scene.traverse(ob=>{
  if(!ob.isMesh)return;stats.sourceMeshes++;
  const car=/^Proposal \| Compact car (\w+)(?: |$)/.exec(ob.userData.name||ob.name);
  if(car&&vehicleBays&&(!vehicleBays.has(car[1])||vehicles.has(car[1])))return;
  const door=doors.owner(ob);if(!door&&isHidden(ob)){stats.hiddenMeshes++;return;}
  // Foliage and site trees are rebuilt as realistic vegetation instead of being batched.
  {const vname=ob.userData.name||ob.name,vmat=(Array.isArray(ob.material)?ob.material[0]:ob.material).name,vk=!door&&vegetationClaims(vname,vmat);if(vk){vegetation.collect(vk,ob,vmat);stats.vegetationSources=(stats.vegetationSources||0)+1;return;}}
  const geom=ob.geometry.clone();geom.applyMatrix4(ob.matrixWorld);
  if(!geom.attributes.normal)geom.computeVertexNormals();
  const sourceMaterial=Array.isArray(ob.material)?ob.material[0]:ob.material;
  // Keep authored UVs for the fitted interiors; original untextured pieces
  // still carry only position/normal into the static batches.
  const keep=sourceMaterial.map?['position','normal','uv']:['position','normal'];
  for(const attr of Object.keys(geom.attributes))if(!keep.includes(attr))geom.deleteAttribute(attr);
  const material=displayMaterial(sourceMaterial);
  if(door){doors.add(door,geom,material);return;}
  if(car&&dynamicBays.has(car[1])){const list=carMeshes.get(car[1])??[];list.push({geometry:geom,material});carMeshes.set(car[1],list);return;}
  batches.add(geom,material,ob.userData.name||ob.name);
 });
 const staticBatches=batches.finish({disposeSources:true});appearanceBatches=staticBatches.meshes.filter(mesh=>mesh.material.userData.exteriorRole==='oak-detail');for(const mesh of staticBatches.meshes){mesh.visible=appearance.visible(mesh.material);scene.add(mesh);mesh.updateMatrixWorld(true);mesh.matrixAutoUpdate=false;mesh.matrixWorldAutoUpdate=false;}stats.batches+=staticBatches.meshes.length;stats.spatial=staticBatches.stats;
 // Vegetation grows in after the tour opens; shadows are refreshed once it is in.
 {const t0=performance.now();vegetation.buildSite(STREET_DATA.siteTrees).then(async()=>{if(pendingStreetGroup){const g=pendingStreetGroup;pendingStreetGroup=null;await vegetation.buildStreet(STREET_DATA.trees,g);}stats.vegetation={...vegetation.stats,ms:Math.round(performance.now()-t0)};lighting.updateShadows();for(const vehicle of vehicles.values())captureVehicleReflections(renderer,scene,vehicle);});}
 if(data.approachSurface){
  const shape=new THREE.Shape(data.approachSurface.polygon.map(([x,y])=>new THREE.Vector2(x,y)));
  // Sit clear of the drive surface (top -0.02 m) so the two never z-fight.
  const geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);geometry.translate(0,.012,0);
  const mat=new THREE.MeshStandardMaterial({color:0x626461,roughness:.97,side:THREE.DoubleSide});surfaceDetail(mat,'Tarmac');
  const apron=new THREE.Mesh(geometry,mat);apron.name='Gate roadside approach';apron.receiveShadow=true;scene.add(apron);stats.batches++;
 }
 stats.doorBatches=doors.finish();stats.interactiveDoors=doors.doors.length;stats.batches+=stats.doorBatches;
 {const templates=new Map();
  for(const [id,meshes] of carMeshes){
   const info=(data.proposalSite?.cars??[]).find(c=>c.bay===id),obstacle=data.obstacles.find(o=>o.name==='Proposal | Compact car '+id);
   if(!info||!obstacle)continue;
   const group=carTemplateFromMeshes(meshes,obstacle.box,info.heading_radians);group.userData.lifeCar='Proposal | Compact car '+id;scene.add(group);stats.batches+=group.children.length;
   templates.set(id,{group,obstacle});
  }
  stats.vehicles=[];
  for(const [bay,vehicle] of vehicles){
   const info=data.proposalSite.cars.find(c=>c.bay===bay),obstacle=data.obstacles.find(o=>o.name==='Proposal | Compact car '+bay);
   vehicle.group.position.set(info.centre_m[0],nav?.groundHeight(info.centre_m[0],info.centre_m[1])??0,-info.centre_m[1]);vehicle.group.rotation.y=info.heading_radians;scene.add(vehicle.group);
   if(data.life?.drive?.[bay])templates.set(bay,{...vehicle,obstacle});
   stats.vehicles.push(vehicle.dimensions);
  }
  life=new Life(data,{scene,doors,carTemplates:templates,mobile:touch.enabled});
  inspector=new Inspector({scene,camera,canvas,doors,life,data});
  for(const [id,{group}] of templates){const car=life.cars.find(c=>c.id===id);if(car)car.apply();else group.visible=true;}
 }
 stats.geometryBytes=0;const measuredGeometries=new Set();scene.traverse(object=>{const geometry=object.geometry;if(!geometry||measuredGeometries.has(geometry))return;measuredGeometries.add(geometry);for(const attr of Object.values(geometry.attributes))stats.geometryBytes+=attr.array.byteLength;if(geometry.index)stats.geometryBytes+=geometry.index.array.byteLength;});
 lighting.updateShadows();
 {const game=new WaveGame(data,{scene,camera,doors,bakedDaylight,mobile:touch.enabled,isActive:()=>active&&!flying&&pageFocused&&!document.hidden,onDeath:caught,onArm:()=>{if(easter.clock.arm(nav.position)){lighting.setActionMode(true);renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));resize();easter.game.arm(nav.position);easter.game.updateHUD(easter.clock);}},onReset:()=>{easter?.clock.reset();lighting.setActionMode(false);renderer.setPixelRatio(Math.min(devicePixelRatio,touch.enabled?1.25:1.5));resize();},toast});easter={clock:new EasterSession(data),game,pursuit:game.horde};}
 // Static room batching and small moving hinge batches; the editable source keeps every separate object.
 // Keep the passage shortcuts on the clearer route beside the relocated flight.
 const courtyardOffset=(data.proposal?.specification?.courtyard?.upper_glazing_x??10.35)-10.35;
 if(qualityVariant&&courtyardOffset>0&&!data.grandLoftStair)for(const room of data.rooms){
  if(['proposal-new-loft-landing','proposal-original-loft-bridge'].includes(room.id))room.position=[room.position[0]+courtyardOffset,...room.position.slice(1)];
 }
 const options=new Map();$('rooms').replaceChildren();
 if(vehicles.size)data.rooms.push({id:'driveway-vehicles',label:'Driveway · vehicles',group:'Outside',position:[2,-7,-.009],direction:[-4,.7,0]});
 const entrancePair=data.interactiveDoors.filter(d=>d.id.startsWith('Proposal | Entrance solid door '));
 if(qualityVariant&&entrancePair.length===2){const [a,b]=entrancePair;data.rooms.push({id:'front-entrance-detail',label:'Front entrance',group:'Outside',position:[a.openingCenter[0]-2.1,(a.openingCenter[1]+b.openingCenter[1])/2,a.openingCenter[2]],direction:[1,0,-.14]});}
 for(const room of data.rooms){if(!options.has(room.group)){const group=document.createElement('optgroup');group.label=room.group;options.set(room.group,group);$('rooms').append(group);}const option=document.createElement('option');option.value=room.id;option.textContent=room.label;options.get(room.group).append(option);}
 $('rooms').disabled=false;ready=true;
 const roomParameter=new URLSearchParams(location.search).get('room');
 const requestedRoom=data.rooms.some(r=>r.id===roomParameter)?roomParameter:null;
 goTo(requestedRoom??'arrival');
 $('review-link').href='./redesigns/'+(['i1','i2','i3','e1','e2','e3'].includes(currentDesign)?'#'+currentDesign:'');
 if(readLifePreference('people'))setLife('people',true,{persist:false});
 try{if(localStorage.getItem('ashley-heights-inspect')==='1')setInspect(true,{persist:false});}catch{}
 if(readLifePreference('cars')&&life.cars.length)setLife('cars',true,{persist:false});
 const comparisonView=takeComparisonView();if(comparisonView&&!requestedRoom){const restore=comparisonPosition(nav,comparisonView);nav.position=restore.position;flying=comparisonView.flying===true;const saved=comparisonView.lastWalkingPosition;if(saved&&['x','y','z'].every(k=>Number.isFinite(saved[k])))lastWalkingPosition=walkingPosition(nav,saved,lastWalkingPosition).position;syncFlightUI();yaw=comparisonView.yaw;pitch=comparisonView.pitch;doors.snap(nav.position);lighting.updateShadows();syncCamera();updateMap();if(restore.moved)toast('Moved to '+(restore.room??'a safe viewpoint')+' for this design.');if(comparisonView.active)start(false);}
 {$('design-switch').value=currentDesign;$('design-switch').disabled=false;$('flight-toggle').disabled=false;}
$('start').disabled=false;$('drag').disabled=false;$('settings-toggle').disabled=false;$('start').textContent=flying?'Start flying':'Start walking';$('load-status').textContent=data.redesign?`${DESIGN_LABELS[currentDesign]} · ${data.redesign.group} · Concept`:currentDesign==='planning'?'Proposed (planning application) · House and forecourt':currentDesign==='proposed'?'Proposed · New wing · Loft · Pool':'Existing · Start at the gates · Both floors · Garden';$('progress').style.width='100%';document.body.classList.remove('loading');
 if(!active)start(false);   // straight into the model: no welcome card
 reflections=roomReflections(renderer,scene,data.planRooms,{mobile:touch.enabled});lighting.info.roomReflections=reflections.info;
 // Exposed only for local validation / reproducible viewpoint screenshots.
 window.walkthrough={ready:true,toggleStructure,stats,appearance,setExteriorAppearance,nav,data,doors,mirrors:mirrors.mirrors,camera,renderer,lighting:lighting.info,touch,easter,life,setLife,inspector,setInspect,inspectAt,goTo,setFlying,setStreetVisible,setPresentation,setViewLens,setView(p,d){touch.reset();nav.position={x:p[0],y:p[1],z:p[2]};setDirection(d);if(doors.snap(nav.position))lighting.updateShadows();syncCamera();updateMap();},getState(){return {...nav.position,yaw,pitch,active,flying,presentation,viewLens,room:roomLabel(),streetContext:data.streetContext.enabled,calls:renderer.info.render.calls};},startDrag:()=>start(false)};
 $('settings-design-name').textContent=DESIGN_LABELS[currentDesign]??currentDesign;
 $('structure-available').hidden=currentDesign!=='proposed';$('structure-unavailable').hidden=currentDesign==='proposed';$('structure-toggle').disabled=currentDesign!=='proposed';
 if(currentDesign==='proposed'&&new URLSearchParams(location.search).has('structure'))await toggleStructure(true);
}
function frame(time){
 requestAnimationFrame(frame);const elapsed=Math.max(0,(time-lastTime)/1000),dt=Math.min(elapsed,.04);lastTime=time;
 vegetation?.tick(time/1000);
 if(ready){
  const running=active&&!document.hidden&&(!easter?.game.started||pageFocused);
  if(running&&renderBudget.sample(elapsed*1000,time)){resize();lighting.info.renderScale=renderBudget.scale;}
  if(!running)renderBudget.reset();
  if(running&&!structureDocument){
   const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'))+touch.axes.forward;
   const r=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'))+touch.axes.right;
   if(flying){const vertical=Number(keys.has('KeyE'))-Number(keys.has('KeyQ'))+[...verticalPointers.values()].reduce((a,b)=>a+b,0);const before=nav.position;nav.position=flyPosition(data,nav.position,{forward:f,right:r,vertical,yaw,pitch,fast:keys.has('ShiftLeft')||keys.has('ShiftRight')||touch.sprinting,dt});
    // Coming down onto a floor, terrace or the lawn lands you: back to walking (not straight after take-off).
    if(nav.position.z<before.z-1e-4&&performance.now()-takeoffTime>500&&!easter?.game.started){const h=nav.support(nav.position.x,nav.position.y,before.z);
     if(h!==null&&nav.position.z<=h+.02&&nav.canStand({x:nav.position.x,y:nav.position.y,z:h})){nav.position={x:nav.position.x,y:nav.position.y,z:h};setFlying(false,{quiet:true});}}}
   else {const n=Math.max(1,Math.hypot(f,r)),s=(keys.has('ShiftLeft')||keys.has('ShiftRight')||touch.sprinting?3.2:easter?.game.started?2.15:1.65)*dt/n;
   const dx=(-Math.sin(yaw)*f+Math.cos(yaw)*r)*s,dy=(Math.cos(yaw)*f+Math.sin(yaw)*r)*s;for(const [mx,my]of [[dx,0],[0,dy]]){const before={...nav.position};nav.move(mx,my);if(easter?.game.horde.blocks(nav.position,nav.radius))nav.position=before;}}syncCamera();
  }
  if(easter){
   if(easter.clock.advance(elapsed,running&&!flying,nav.position))easter.game.startWave(nav.position);
   if(running&&!flying&&easter.clock.phase!=='caught'){
    easter.game.step(dt,nav.position,easter.clock);
    if(easter.clock.phase==='chasing'&&time-chaseShadowTime>120){lighting.updateShadows();chaseShadowTime=time;}
   }else easter.game.cancelFire();
  }
  const lifeMoving=life&&!document.hidden&&life.step(dt,nav.position);
  const visitors=[...(easter?.clock.phase==='chasing'?easter.pursuit.positions:[]),...(lifeMoving?life.visitorPositions:[])];
  if(doors.update(nav.position,dt,false,visitors))lighting.updateShadows();
  else if(lifeMoving&&time-lifeShadowTime>(touch.enabled?350:200)){lighting.updateShadows();lifeShadowTime=time;}
  if(time-mapTime>160){updateMap();if(easter?.clock.phase==='chasing')$('chase-time').textContent=(running?'Keep moving':'Paused')+' · '+duration(easter.clock.survived);mapTime=time;}
 }
 if(localLights)localLights.update(camera,time);
 if(bakedDaylight&&ready&&!easter?.game.started){const exposure=flying?daylightSettings.exteriorExposure:bakedDaylight.exposures.get(roomLabel())??daylightSettings.exteriorExposure;renderer.toneMappingExposure+=(exposure-renderer.toneMappingExposure)*(1-Math.exp(-dt*2.8));lighting.info.exposure=renderer.toneMappingExposure;}
 if(structureView?.enabled){structureView.render();}else{mirrors?.update(camera);lighting.render();}
 if(ready&&!structureView?.enabled&&!easter?.game.started&&!document.hidden)reflections?.update(camera,time);
 if(diagnostics&&ready&&!document.hidden&&elapsed>0){
  const room=roomLabel();if(room!==diagnosticRoom){frameSamples.length=0;diagnosticRoom=room;diagnosticSince=time;}
  if(time-diagnosticSince<3000||frameSamples.length>=120)return;
  frameSamples.push(elapsed*1000);
  if(frameSamples.length===120){const sorted=[...frameSamples].sort((a,b)=>a-b);console.info('VISUAL_QUALITY_QA',JSON.stringify({room,design:currentDesign,refinedObjects:stats.refinedObjects,bakedDaylight:lighting.info.bakedDaylight,reflections:reflections?.info,medianFrameMs:+sorted[60].toFixed(2),p95FrameMs:+sorted[114].toFixed(2),pixelRatio:renderer.getPixelRatio(),programs:renderer.info.programs.length,viewport:[canvas.clientWidth,canvas.clientHeight]}));}
 }
}
load().catch(e=>{console.error(e);$('start').textContent='Try again';$('start').disabled=false;$('start').onclick=()=>location.reload();$('load-status').textContent='The house could not load. Check your connection and try again.';$('progress').style.width='0';});requestAnimationFrame(frame);
