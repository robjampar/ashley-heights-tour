import * as THREE from 'three';
import {createStructureStudio} from './structure-studio.js';
import {createStructureComposite} from './structure-composite.js';

// One scene/camera/navigation and one member register. The compact controls
// live in a shadow root; drawings and calculations expand only when requested.
export async function createStructureWalkthrough({scene,renderer,camera,canvas,renderHouse,focus,onView,onActive}){
 const baseURL=new URL('./structure/',location.href),host=document.createElement('section');
 host.id='walkthrough-structure';host.setAttribute('aria-label','Structure over the house');host.hidden=true;
 const root=host.attachShadow({mode:'open'});document.body.append(host);
 const response=await fetch(new URL('index.html',baseURL));if(!response.ok)throw Error('Structural controls unavailable');
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');doc.querySelectorAll('script').forEach(s=>s.remove());
 const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('studio.css',baseURL);
 const styles=new Promise((resolve,reject)=>{link.onload=resolve;link.onerror=()=>reject(Error('Structural styles unavailable'));});root.append(link,...doc.body.childNodes);
 const style=document.createElement('style');style.textContent=`
 :host{font:13px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#253d4d;--muted:#687c89;--line:#dce3e8;--blue:#183e61;position:fixed;inset:0;z-index:15;pointer-events:none;display:block}
 :host([hidden]),[hidden]{display:none!important}
 header,.status-strip{display:none}main{display:block;height:auto;min-height:0}
 .control-rail{position:absolute;left:26px;top:154px;bottom:90px;width:286px;overflow:auto;pointer-events:none;scrollbar-width:thin}
 .overlay-card,.left-panel{pointer-events:auto;background:#fffffff5;border:1px solid #e3e8e5;box-shadow:0 4px 24px #15364d18;border-radius:14px;padding:16px;margin-bottom:10px}
 .overlay-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px;font-weight:650;margin-bottom:12px}
 #collapse-overlay{border:0;background:#eff3f2;border-radius:6px;font-size:18px;width:28px;height:28px;color:#315e55}
 .overlay-card .segmented{margin:0 0 12px}.overlay-card .cut-label{margin:12px 0}.overlay-card .cut-label input{margin-top:8px}
 .overlay-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.overlay-actions button,.overlay-actions select{width:100%;min-width:0;padding:8px;font-size:11px;border:1px solid #d3dde4;background:#fff;border-radius:6px;color:#31536a}
 .overlay-note{font-size:10px;line-height:1.5;color:#687c89;margin:12px 0 0}.overlay-note strong{font-weight:500;color:#866533}
 :host(.appearance-collapsed) .overlay-body{display:none}:host(.appearance-collapsed) .overlay-heading{margin-bottom:0}
 .left-panel{display:none;overflow:visible}.left-panel h1,.left-panel .intro{display:none}:host(.layers-open) .left-panel{display:block}
 .right-panel{display:none;position:absolute;right:26px;top:154px;bottom:90px;width:310px;min-height:0;padding:18px;pointer-events:auto;border:1px solid var(--line);border-radius:14px;box-shadow:0 4px 24px #15364d22;background:#fffffff5;overflow:auto}
 .right-panel.has-selection{display:block}.right-panel>.divider{display:block}:host(.inspector-hidden) .right-panel{display:none}
 .workspace{display:none}#model{display:none!important}#loading{pointer-events:auto}.view-hint{display:none}
 :host(.document-view) .control-rail{display:none}:host(.document-view) header{display:flex;position:absolute;inset:150px 26px auto;height:44px;padding:0 14px;border-radius:10px 10px 0 0;pointer-events:auto;gap:12px}
 header .brand,header #layers-toggle{display:none}header .back{font-size:12px;margin-left:auto}header .issue{margin:0;font-size:10px;display:block}
 :host(.document-view) .workspace{display:flex;position:absolute;inset:194px 26px 90px;height:auto;min-height:0;pointer-events:auto;border:1px solid var(--line);border-radius:0 0 10px 10px;overflow:hidden}
 :host(.document-view:not(.inspector-hidden)) .right-panel.has-selection{z-index:2}
 :host(.document-view:not(.inspector-hidden)) .workspace:has(+.has-selection){right:346px}
 .tabs{height:44px;padding:0 6px;overflow:auto}.tabs button{padding:0 10px}.view-toolbar{height:50px;padding:0 14px}footer{height:28px}footer span:last-child{display:none}
 #viewport{min-height:0}#return-model{font:inherit;border:1px solid var(--line);border-radius:6px;padding:7px 12px;background:#fff;color:#315e55}
 .split-ui{display:none;position:absolute;top:154px;bottom:90px;left:var(--split-position,50%);border-left:2px solid #ffffffd9;filter:drop-shadow(0 1px 3px #102c4e66)}
 :host(.split-view:not(.document-view)) .split-ui{display:block}
 #split-handle{position:absolute;top:50%;left:-22px;transform:translateY(-50%);width:44px;height:50px;background:#fffffff5;color:#315e55;border:1px solid #d0ded9;border-radius:10px;pointer-events:auto;touch-action:none;cursor:col-resize;font-size:20px}
 .split-label{position:absolute;top:8px;white-space:nowrap;font-size:11px;background:#fffffff0;color:#31536a;padding:7px 10px;border-radius:5px}.split-label.house{right:12px}.split-label.members{left:12px}
 @media(max-width:700px){.control-rail{left:12px;top:150px;bottom:138px;width:240px}.overlay-card{padding:12px}.overlay-heading{font-size:12px}.right-panel{right:12px;top:150px;bottom:138px;width:min(310px,calc(100vw - 24px));z-index:3}:host(.document-view) header{inset:150px 12px auto}:host(.document-view) .workspace,:host(.document-view:not(.inspector-hidden)) .workspace:has(+.has-selection){inset:194px 12px 138px}.split-ui{top:150px;bottom:138px}.split-label{top:auto;bottom:12px;font-size:9px;padding:5px}.trial-head h1{font-size:20px}}
 `;root.append(style);
 const $=id=>root.getElementById(id),rail=document.createElement('div');rail.className='control-rail';
 const card=document.createElement('section');card.className='overlay-card';card.setAttribute('aria-label','Structure overlay controls');
 card.innerHTML=`<div class="overlay-heading">Structure on the house<button id="collapse-overlay" aria-expanded="true" aria-label="Collapse overlay controls">−</button></div>
 <div class="overlay-body"><div class="segmented" role="group" aria-label="Compare house and structure"><button id="overlay-mode" aria-pressed="true">Overlay</button><button id="split-mode" aria-pressed="false">Split view</button></div>
 <label class="field cut-label">Structure opacity <output id="structure-opacity-value">65%</output><input id="structure-opacity" type="range" min="0" max="100" value="65" aria-label="Structure opacity"></label>
 <div id="house-opacity-control"></div><label class="check"><input type="checkbox" id="vivid-structure"> Vivid structure · stronger colours</label><div class="overlay-actions"><button id="overlay-layers" aria-expanded="false">Layers &amp; cutaways</button><select id="review-view" aria-label="Drawings and structural data"><option value="model">Drawings &amp; data…</option><option value="plan">Floor plans</option><option value="front">Elevations</option><option value="section">Sections</option><option value="schedule">Member register</option><option value="costs">Build costs</option><option value="foundations">Foundations</option><option value="junctions">Connections &amp; fit</option><option value="roof-options">Roof options</option><option value="issues">Open issues</option><option value="trials">UK trials</option></select></div>
 <p class="overlay-note">X-ray overlay · click a member to inspect.<br><strong>Experimental · not for construction.</strong></p></div>`;
 rail.append(card,root.querySelector('.left-panel'));root.append(rail);
 const context=$('context');context.checked=true;context.closest('label').hidden=true;context.closest('label').nextElementSibling.hidden=true;
 const opacityInput=$('context-opacity');opacityInput.min='0';opacityInput.max='100';opacityInput.value='100';opacityInput.setAttribute('aria-label','House opacity');
 const opacityLabel=opacityInput.closest('label');opacityLabel.childNodes[0].textContent='House opacity ';$('context-opacity-value').textContent='100%';$('house-opacity-control').append(opacityLabel);
 const splitUI=document.createElement('div');splitUI.className='split-ui';splitUI.innerHTML='<span class="split-label house">Finished house</span><span class="split-label members">Structure overlay</span><button id="split-handle" role="slider" aria-label="Split view divider" aria-valuemin="5" aria-valuemax="95" aria-valuenow="50" aria-orientation="horizontal">↔</button>';root.append(splitUI);
 const close=root.querySelector('.back');close.href='#';close.textContent='Structure off';
 const returnModel=document.createElement('button');returnModel.id='return-model';returnModel.textContent='← Back to walkaround';root.querySelector('header').prepend(returnModel);
 const panel=root.querySelector('.right-panel'),dismiss=document.createElement('button');dismiss.className='outline';dismiss.textContent='Close inspector';panel.prepend(dismiss);dismiss.onclick=()=>{panel.classList.remove('has-selection');host.classList.add('inspector-hidden');};
 host.classList.add('inspector-hidden');
 let enabled=false,studio=null,architectureOn=true,opacity=1,clip=null,clipApplied=false,mode='overlay',structureOpacity=.65,divider=.5,vivid=false;
 const architecture=new THREE.Group();architecture.name='Walkthrough architecture context';scene.add(architecture);
 const materialPlanes=new Map();
 function registerMaterials(object){object.traverse(o=>{for(const material of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){if(materialPlanes.has(material))continue;materialPlanes.set(material,material.clippingPlanes);if(clipApplied){material.clippingPlanes=[...(material.clippingPlanes??[]),clip];material.needsUpdate=true;}}});}
 function capture(){
  // Reuse the actual model, including late-loaded cars/trees. Materials, maps,
  // sunlight and interior lighting are never replaced with ghost materials.
  for(const object of [...scene.children])if(object!==architecture&&object!==studio?.scene&&!object.isLight&&!object.isCamera){architecture.add(object);registerMaterials(object);}
 }
 function updateClip(){
  const cutting=!!clip&&clip.constant<8.999;if(cutting===clipApplied)return;clipApplied=cutting;
  registerMaterials(architecture);
  for(const [material,planes]of materialPlanes){material.clippingPlanes=cutting?[...(planes??[]),clip]:planes;material.needsUpdate=true;}
 }
 function applyContext(on,value,plane){architectureOn=on;opacity=value;clip=plane;if(enabled){capture();updateClip();}}
 function refreshArchitecture(){if(enabled){capture();updateClip();}}
 function canPick(ndc){return structureOpacity>0&&(mode!=='split'||(ndc.x+1)/2>=divider);}
 const composite=createStructureComposite({renderer,camera,renderHouse});
 const api=await createStructureStudio({root,baseURL,embed:{scene,renderer,camera,canvas,focus,active:()=>enabled,canPick,context:applyContext,onView(view){onView(view,enabled);if($('review-view'))$('review-view').value=view;}}});studio=api;
 studio.scene.traverse(object=>{object.userData.noPick=true;});studio.scene.visible=false;await styles;
 $('architecture-cut').addEventListener('input',refreshArchitecture);
 for(const a of root.querySelectorAll('a[href]'))if(a.getAttribute('href').startsWith('./'))a.href=new URL(a.getAttribute('href'),baseURL);
 const revealSelection=()=>{if(studio.state.selected){panel.classList.add('has-selection');host.classList.remove('inspector-hidden');}};
 const observer=new MutationObserver(revealSelection);observer.observe($('selection'),{childList:true});revealSelection();
 $('overlay-layers').onclick=()=>{host.classList.toggle('layers-open');$('overlay-layers').setAttribute('aria-expanded',String(host.classList.contains('layers-open')));};
 $('collapse-overlay').onclick=()=>{const collapsed=host.classList.toggle('appearance-collapsed');$('collapse-overlay').textContent=collapsed?'+':'−';$('collapse-overlay').setAttribute('aria-expanded',String(!collapsed));$('collapse-overlay').setAttribute('aria-label',collapsed?'Expand overlay controls':'Collapse overlay controls');};
 $('review-view').onchange=()=>studio.setView($('review-view').value);returnModel.onclick=()=>studio.setView('model');
 function setMode(value){mode=value==='split'?'split':'overlay';host.classList.toggle('split-view',mode==='split');$('overlay-mode').setAttribute('aria-pressed',String(mode==='overlay'));$('split-mode').setAttribute('aria-pressed',String(mode==='split'));}
 $('overlay-mode').onclick=()=>setMode('overlay');$('split-mode').onclick=()=>setMode('split');
 $('structure-opacity').oninput=()=>{structureOpacity=Number($('structure-opacity').value)/100;$('structure-opacity-value').textContent=Math.round(structureOpacity*100)+'%';};
 $('vivid-structure').onchange=()=>{vivid=$('vivid-structure').checked;};
 function setDivider(value){divider=Math.max(.05,Math.min(.95,value));host.style.setProperty('--split-position',divider*100+'%');$('split-handle').setAttribute('aria-valuenow',String(Math.round(divider*100)));}
 const handle=$('split-handle');handle.onpointerdown=event=>{event.preventDefault();handle.setPointerCapture(event.pointerId);};handle.onpointermove=event=>{if(handle.hasPointerCapture(event.pointerId)){const r=canvas.getBoundingClientRect();setDivider((event.clientX-r.left)/r.width);}};handle.onpointerup=event=>handle.releasePointerCapture(event.pointerId);
 handle.onkeydown=event=>{const step=event.shiftKey?.1:.02;if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();event.stopPropagation();setDivider(event.key==='Home'?.05:event.key==='End'?.95:divider+(event.key==='ArrowRight'?step:-step));}};
 function setEnabled(on){
  enabled=!!on;host.hidden=!enabled;studio.scene.visible=enabled;
  if(enabled){capture();applyContext(context.checked,Number(opacityInput.value)/100,studio.cutawayPlanes.architecture);}
  else{for(const [material,planes]of materialPlanes){if(material.clippingPlanes!==planes){material.clippingPlanes=planes;material.needsUpdate=true;}}materialPlanes.clear();clipApplied=false;for(const object of [...architecture.children])scene.add(object);}
  document.body.classList.toggle('structure-active',enabled);onActive(enabled);onView(studio.state.view,enabled);
  const url=new URL(location.href);if(enabled)url.searchParams.set('structure','1');else{url.searchParams.delete('structure');url.searchParams.delete('element');}history.replaceState(null,'',url);
 }
 close.onclick=event=>{event.preventDefault();setEnabled(false);};
 function render(){refreshArchitecture();composite.render(studio.scene,{houseOpacity:architectureOn?opacity:0,structureOpacity,vivid,mode,divider});}
 return {studio,root,host,setEnabled,setMode,setDivider,refreshArchitecture,render,canPick,get enabled(){return enabled;},get architecture(){return architecture;},get appearance(){return {mode,houseOpacity:opacity,structureOpacity,divider,vivid};}};
}
