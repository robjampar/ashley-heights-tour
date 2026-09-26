const assets={"image-manifest.json": "image-manifest.1a852bff56b5e71f.json", "images/01.png": "images/01.9c0f6e21bc213fee.png", "images/02.png": "images/02.0ce8f8e9852d0566.png", "images/03.png": "images/03.b8acaba8eade305a.png", "images/04.png": "images/04.006f7ebe643f5049.png", "images/05.png": "images/05.0da3ae66d6989ed6.png", "images/06.png": "images/06.4adbec965434b604.png", "images/07.png": "images/07.8e15da701f4f15b1.png", "images/08.png": "images/08.1f382642a9abd83d.png", "images/09.png": "images/09.a1a694a66a30d610.png", "images/10.png": "images/10.abbd0009a3c3c852.png", "layout-plan.svg": "layout-plan.272c2bb77efd1209.svg", "models/compact-suite.glb": "models/compact-suite.d221520001ce8bf6.glb", "models/compact-suite.json": "models/compact-suite.c6bd92d39d532267.json", "models/planning-suite.glb": "models/planning-suite.9921d79df8f8b434.glb", "models/planning-suite.json": "models/planning-suite.a756fe5054e68e7e.json", "options.json": "options.f67a961f5dc61645.json", "prompts.json": "prompts.c23afe02429ca187.json", "references/captures.json": "references/captures.b9a63a8390eeadb2.json", "references/planning-bedroom.png": "references/planning-bedroom.232183cc920eea4d.png", "references/planning-sitting.png": "references/planning-sitting.5f48e7bf88276bbc.png", "references/planning-study.png": "references/planning-study.3c52fa7173f8c05e.png", "references/proposed-bedroom.png": "references/proposed-bedroom.e9a355bdcbdf2fb8.png", "references/proposed-sitting.png": "references/proposed-sitting.29274e0085e2bbb6.png", "references/proposed-study.png": "references/proposed-study.e77eb6bafc270fab.png", "room-model.js": "room-model.d652519fb37a9374.js", "studio.css": "studio.fcd9fe47725a433e.css"};const asset=path=>assets[path]??path;
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const label=design=>design==='planning'?'Proposed · planning application':'Proposed';
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=x=>Math.max(0,Math.min(1,x));
let data,option,design='proposed',tool='circle',showCurrent=false,draft=null,undo=new Map(),loadVersion=0,storageOK=true;
let state={version:1,feedback:{},shortlist:[]};
const key=()=>option.id+':'+design;
const entry=()=>state.feedback[key()]??{notes:'',marks:[]};
const setEntry=value=>{state.feedback[key()]=value;save();};
function save(){
 try{localStorage.setItem(data.session,JSON.stringify(state));storageOK=true;$('saved').textContent='Saved in this browser · export to share.';}
 catch{storageOK=false;$('saved').textContent='Browser storage is unavailable. Export your feedback before closing.';}
 updateBadges();
}
function readState(){
 try{const saved=JSON.parse(localStorage.getItem(data.session));if(saved?.version===1&&typeof saved.feedback==='object'&&Array.isArray(saved.shortlist))state=saved;}
 catch{storageOK=false;}
}
function updateBadges(){
 document.querySelectorAll('.option').forEach(button=>{button.querySelector('b').hidden=!state.shortlist.includes(button.dataset.id);});
 $('shortlist-count').textContent=state.shortlist.length?`${state.shortlist.length} of 10 ideas shortlisted`:'Shortlist as many ideas as you like.';
}
function pathFor(mark){return mark.points.map((p,i)=>(i?'L':'M')+(p[0]*1000).toFixed(2)+','+(p[1]*1000).toFixed(2)).join(' ');}
function svgMarkup(marks,withLabels=true){
 return marks.map((m,i)=>{
  const common='fill="none" stroke="#ec553b" stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"';
  const shape=m.type==='circle'?`<ellipse cx="${(m.a[0]+m.b[0])*500}" cy="${(m.a[1]+m.b[1])*500}" rx="${Math.abs(m.b[0]-m.a[0])*500}" ry="${Math.abs(m.b[1]-m.a[1])*500}" ${common}/>`:`<path d="${pathFor(m)}" ${common}/>`;
  const p=m.type==='circle'?[Math.min(m.a[0],m.b[0]),Math.min(m.a[1],m.b[1])]:m.points[0];
  return shape+(withLabels?`<svg x="${clamp(p[0])*965}" y="${clamp(p[1])*955}" width="35" height="45" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><circle cx="12" cy="12" r="11" fill="#e44e34" stroke="white" stroke-width="1"/><text x="12" y="16" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white">${i+1}</text></svg>`:'');
 }).join('');
}
function renderMarks(){
 $('marks').innerHTML=svgMarkup([...entry().marks,...(draft?[draft]:[])]);
 $('undo').disabled=showCurrent||!(undo.get(key())?.length);
 $('clear').disabled=showCurrent||!entry().marks.length;
}
function pushUndo(){const history=undo.get(key())??[];history.push(structuredClone(entry().marks));if(history.length>50)history.shift();undo.set(key(),history);}
function commitMarks(marks){setEntry({...entry(),marks});renderMarks();}
function setTool(value){tool=value;$('stage').dataset.tool=showCurrent?'browse':tool;document.querySelectorAll('[data-tool][aria-pressed]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)));$('drawing-hint').textContent=showCurrent?'Current model reference. Return to the concept to mark your favourite details.':tool==='circle'?'Drag around a detail to circle it. Use Notes to say what you like.':tool==='pen'?'Draw directly on the image. Each stroke is numbered for your notes.':'Browse mode: scroll freely. Choose Circle or Draw to mark this image.';}
function point(event){const r=$('marks').getBoundingClientRect();return[clamp((event.clientX-r.left)/r.width),clamp((event.clientY-r.top)/r.height)];}
$('marks').addEventListener('pointerdown',event=>{
 if(showCurrent||tool==='browse'||event.button!==0||draft||!$('image-loading').hidden)return;
 event.preventDefault();$('marks').setPointerCapture(event.pointerId);const p=point(event);draft=tool==='circle'?{type:'circle',a:p,b:p}:{type:'pen',points:[p]};renderMarks();
});
$('marks').addEventListener('pointermove',event=>{if(!draft)return;const p=point(event);if(draft.type==='circle')draft.b=p;else {const last=draft.points.at(-1);if(Math.hypot(p[0]-last[0],p[1]-last[1])>.001)draft.points.push(p);}renderMarks();});
function finishStroke(event){
 if(!draft)return;const mark=draft;draft=null;
 if(event.type==='pointerup'&&(mark.type==='circle'?Math.abs(mark.a[0]-mark.b[0])>.006&&Math.abs(mark.a[1]-mark.b[1])>.006:mark.points.length>1)){pushUndo();commitMarks([...entry().marks,mark]);}else renderMarks();
 if($('marks').hasPointerCapture(event.pointerId))$('marks').releasePointerCapture(event.pointerId);
}
$('marks').addEventListener('pointerup',finishStroke);$('marks').addEventListener('pointercancel',finishStroke);
document.querySelectorAll('[data-tool][aria-pressed]').forEach(button=>button.onclick=()=>setTool(button.dataset.tool));
$('undo').onclick=()=>{const history=undo.get(key());if(history?.length)commitMarks(history.pop());};
$('clear').onclick=()=>{pushUndo();commitMarks([]);};
$('notes').oninput=()=>setEntry({...entry(),notes:$('notes').value});
$('shortlist').onclick=()=>{const index=state.shortlist.indexOf(option.id);index<0?state.shortlist.push(option.id):state.shortlist.splice(index,1);save();renderShortlist();};
function renderShortlist(){const selected=state.shortlist.includes(option.id);$('shortlist').textContent=selected?'★ Shortlisted':'☆ Add to shortlist';$('shortlist').setAttribute('aria-pressed',String(selected));}
function hash(){history.replaceState(null,'','#'+option.id+'-'+design);if($('view-model'))$('view-model').href='model.html?design='+(design==='planning'?'planning':'compact');document.querySelectorAll('[data-room-link]').forEach(a=>a.href=a.dataset.roomLink+'#01-'+design);}
async function render(){
 draft=null;hash();
 document.querySelectorAll('.option').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===option.id)));
 $('option-number').textContent='IDEA '+option.id+' / 10';$('option-title').textContent=option.title;$('description').textContent=option.description;
 $('notes').value=entry().notes;$('notes').setAttribute('aria-label',`Notes for ${option.title}, ${label(design)}`);
 $('counter').textContent=option.id+' / 10';$('house-link').href='../../?design='+design;
 $('image-caption').textContent=(showCurrent?'Current model':'AI concept')+' · '+label(design);
 $('current-toggle').textContent=showCurrent?'Return to concept':'Show current room';$('current-toggle').setAttribute('aria-pressed',String(showCurrent));
 $('stage').classList.toggle('current',showCurrent);renderShortlist();renderMarks();setTool(tool);
 const references=data.referenceViews??['kitchen-reverse','kitchen','dining'];
 ['reference-main','reference-reverse','reference-dining'].forEach((id,i)=>$(id).src=asset(`references/${design}-${references[i]}.png`));
 document.querySelectorAll('.option').forEach(button=>{const o=data.options.find(o=>o.id===button.dataset.id);button.querySelector('img').src=asset(o.images[design]);});
 const version=++loadVersion;$('image-loading').hidden=false;
 $('room-image').alt=showCurrent?`Current ${label(design)} ${data.title}`:`${option.title}: ${option.description} ${label(design)} ${data.title} concept.`;
 $('room-image').src=asset(showCurrent?`references/${design}-${references[0]}.png`:option.images[design]);
 try{await $('room-image').decode();if(version===loadVersion){$('stage').style.aspectRatio=`${$('room-image').naturalWidth} / ${$('room-image').naturalHeight}`;$('image-loading').hidden=true;}}
 catch{if(version===loadVersion)$('image-loading').textContent='This image could not load. Please refresh the page.';}
}
function select(id){option=data.options.find(o=>o.id===id)??data.options[0];showCurrent=false;render();}
function step(delta){select(data.options[(data.options.indexOf(option)+delta+data.options.length)%data.options.length].id);document.querySelector(`.option[data-id="${option.id}"]`)?.scrollIntoView({block:'nearest',inline:'nearest'});}
$('previous').onclick=()=>step(-1);$('next').onclick=()=>step(1);
$('design').onchange=()=>{design=$('design').value;render();};
$('current-toggle').onclick=()=>{showCurrent=!showCurrent;render();};
window.addEventListener('keydown',event=>{if(/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||$('export-dialog').open)return;if(event.key==='Escape')setTool('browse');if(event.key==='ArrowRight'){event.preventDefault();step(1);}if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}});
function feedback(){return {session:data.session,exportedAt:new Date().toISOString(),coordinateSpace:'normalized 0..1 relative to the full source image; never cropped',shortlist:state.shortlist,images:data.options.flatMap(o=>['proposed','planning'].map(d=>({option:o.id,title:o.title,design:d,image:o.images[d],...state.feedback[o.id+':'+d]??{notes:'',marks:[]}}))).filter(e=>e.notes||e.marks.length||state.shortlist.includes(e.option))};}
function download(blob,filename){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
async function dataURL(path){const response=await fetch(asset(path));if(!response.ok)throw Error('Unable to load '+path);const blob=await response.blob();return await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});}
function selectedFeedback(){const result=feedback();if(!result.images.length)result.images=[{option:option.id,title:option.title,design,image:option.images[design],...entry()}];return result;}
$('export-open').onclick=()=>{const f=feedback();$('export-count').textContent=`${state.shortlist.length} shortlisted ideas · ${f.images.filter(e=>e.marks.length||e.notes).length} images with feedback.`;$('export-status').textContent='';$('export-dialog').showModal();};
$('export-close').onclick=()=>$('export-dialog').close();
$('export-json').onclick=()=>{download(new Blob([JSON.stringify(selectedFeedback(),null,2)],{type:'application/json'}),`ashley-heights-${data.slug??'kitchen'}-feedback.json`);$('export-status').textContent='Feedback downloaded. Attach it in our chat to share your choices.';};
$('copy-summary').onclick=async()=>{const f=selectedFeedback(),text='Ashley Heights — '+data.title+'\nShortlist: '+(f.shortlist.join(', ')||'none yet')+'\n\n'+f.images.map(e=>`${e.option} ${e.title} / ${label(e.design)}\n${e.marks.length} marked details\n${e.notes||'(no notes)'}`).join('\n\n');try{await navigator.clipboard.writeText(text);$('export-status').textContent='Notes copied. Paste them in our chat; export images to share the circles too.';}catch{$('export-status').textContent='Clipboard is unavailable. Download the feedback file instead.';}};
$('export-sheet').onclick=async()=>{
 const button=$('export-sheet');button.disabled=true;$('export-status').textContent='Preparing your marked images…';
 try{
  const f=selectedFeedback(),sections=await Promise.all(f.images.map(async e=>`<section><h2>${esc(e.option+' · '+e.title)}</h2><p>${esc(label(e.design))}${f.shortlist.includes(e.option)?' · Shortlisted':''}</p><div class="image"><img src="${await dataURL(e.image)}" alt="${esc(e.title)}"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none">${svgMarkup(e.marks)}</svg></div><p class="notes">${esc(e.notes||'No notes yet.')}</p></section>`));
  const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashley Heights — ${esc(data.title)} feedback</title><style>body{font:16px/1.6 system-ui;color:#253e38;background:#f5f3ed;max-width:1200px;margin:auto;padding:30px}h1,h2{font-family:Georgia,serif;font-weight:400}.image{position:relative}.image>img{width:100%;display:block}.image>svg{position:absolute;inset:0;width:100%;height:100%}.notes{white-space:pre-wrap;background:white;padding:20px}section{margin:45px 0;break-inside:avoid}p{color:#526258}@media print{body{padding:0}section{break-after:page}}</style><h1>${esc(data.title)} · Your design direction</h1><p>Shortlist: ${esc(f.shortlist.join(', ')||'none yet')} · Exported ${esc(f.exportedAt)}</p>${sections.join('')}<script type="application/json" id="ashley-heights-feedback">${JSON.stringify(f).replaceAll('<','\\u003c')}</script></html>`;
  download(new Blob([html],{type:'text/html'}),`ashley-heights-${data.slug??'kitchen'}-review.html`);$('export-status').textContent='Review sheet downloaded. Attach it in our chat; it includes all your images, circles and notes.';
 }catch(error){$('export-status').textContent='Could not prepare the images. Your notes are safe; try downloading editable feedback.';console.error(error);}finally{button.disabled=false;}
};
$('save-image').onclick=async()=>{
 const button=$('save-image');button.disabled=true;
 try{
  const src=await dataURL(option.images[design]),img=new Image();img.src=src;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
  const overlay=new Image();overlay.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="${NS}" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 1000 1000" preserveAspectRatio="none">${svgMarkup(entry().marks)}</svg>`);await overlay.decode();ctx.drawImage(overlay,0,0);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('Export failed');download(blob,`${option.id}-${design}-marked.png`);$('saved').textContent='Marked image downloaded. Your notes stay saved here.';
 }catch{$('saved').textContent='Image export failed. Your marks remain saved; use Export feedback.';}finally{button.disabled=false;}
};
try{
 const response=await fetch(asset('options.json'));if(!response.ok)throw Error('Unable to load design ideas');data=await response.json();readState();
 for(const o of data.options){const button=document.createElement('button');button.className='option';button.dataset.id=o.id;button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',o.id+' '+o.title);button.innerHTML=`<img alt="" loading="lazy"><span><strong>${esc(o.id)}</strong>${esc(o.title)}</span><b hidden aria-label="Shortlisted">★</b>`;button.onclick=()=>select(o.id);$('options').append(button);}
 const parts=location.hash.slice(1).split('-');design=parts[1]==='planning'?'planning':'proposed';$('design').value=design;option=data.options.find(o=>o.id===parts[0])??data.options[0];updateBadges();await render();if(!storageOK)$('saved').textContent='Browser storage is unavailable. Export your feedback before closing.';
}catch(error){$('error').hidden=false;$('error').textContent='The design board could not load. Please refresh the page.';console.error(error);}
