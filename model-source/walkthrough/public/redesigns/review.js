// Replaced with a content-addressed mapping by the deployment stage.
const asset=path=>path;
const $=id=>document.getElementById(id);
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let options=[],selected=null,floor='Ground floor',camera='front';
function floorPlan(title){
 const p=selected.plans.find(p=>p.title===title)??selected.plans[0];floor=p.title;
 document.querySelectorAll('[data-floor]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.floor===floor)));
 const sheet=`plans/${selected.id}/${p.file}`,detail=`plans/${selected.id}/${p.detail??p.file}`;
 $('plan').src=asset(detail);$('plan').alt=`${selected.code} ${selected.name}, ${p.title.toLowerCase()} with furniture, room labels and scale`;
 $('plan-link').href=asset(sheet);$('sheet-link').href=asset(sheet);
 $('room-schedule').hidden=floor==='Site';$('site-notes').hidden=floor!=='Site';
 $('rooms').innerHTML=p.rooms.map(r=>`<tr><td><span class="room-number">${String(r.number).padStart(2,'0')}</span>${esc(r.name)}</td><td>${r.area_m2.toFixed(1)}</td></tr>`).join('');
 $('parking-note').textContent=selected.parkingNote;
 $('site-groundworks').textContent=selected.groundworks?'The forecourt is regraded to a level concept datum, with retaining edges; the reconstructed terrain implies up to about '+selected.groundworks.maximum_cut_from_terrain_m.toFixed(2)+' m of local cut. Pool terraces also have retaining edges and garden steps. This is real groundworks scope, subject to survey.':'The current Proposed landscape and pool stay, with a fourth outside parking bay and courtyard furniture moved clear of it.';
}
function viewpoint(value){camera=value;document.querySelectorAll('[data-camera]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.camera===camera)));$('hero').src=asset(`images/${selected.id}-${camera}.jpg`);$('hero').alt=`${selected.code} ${selected.name}, ${camera==='front'?'front arrival':camera==='rear'?'rear garden and pool':'interior highlight'} model view`;}
function choose(id,{scroll=false,updateHash=true}={}){
 selected=options.find(o=>o.id===id)??options.find(o=>o.id==='e1');
 document.querySelectorAll('.option-card').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.select===selected.id)));
 $('selected-option').hidden=false;$('selected-group').textContent=selected.group.toUpperCase();$('selected-title').textContent=selected.code+' / '+selected.name;$('selected-tagline').textContent=selected.tagline;
 $('open-tour').href=selected.tourUrl+(selected.tourView?'&room='+encodeURIComponent(selected.tourView):'');
 $('facts').innerHTML=`<span><strong>7 bedrooms</strong>${selected.id==='e3'?'All on the first floor':'Including a loft guest'}</span><span><strong>${selected.ensuites} en suites</strong>Private bathrooms for most bedrooms</span><span><strong>Pool + leisure</strong>Gym · cinema · wine bar</span><span><strong>6 car spaces</strong>Double garage + 4 outside</span>`;
 $('best-for').textContent=selected.bestFor;$('why').innerHTML=selected.why.map(t=>`<li>${esc(t)}</li>`).join('');$('compromises').innerHTML=selected.compromises.map(t=>`<li>${esc(t)}</li>`).join('');$('principal').textContent=selected.principal;
 $('retained').textContent=selected.retained;$('construction').textContent=selected.construction;$('planning-focus').textContent=selected.planningFocus;
 if(selected.id.startsWith('e')&&selected.footprint?.added_ground_footprint_m2!==undefined)$('construction').textContent+=' The plan indicates about '+Math.round(selected.footprint.added_ground_footprint_m2)+' m² of added ground footprint compared with the original house (approximate room envelopes, not surveyed floor area).';
 $('floor-buttons').innerHTML=selected.plans.map(p=>`<button data-floor="${esc(p.title)}" aria-pressed="false">${esc(p.title)}</button>`).join('');
 $('floor-buttons').querySelectorAll('button').forEach(b=>b.onclick=()=>floorPlan(b.dataset.floor));
 const checks=[];
 if(selected.checks.circulation?.passed)checks.push('Every scheduled room has a connected walking route in the model at a 44 cm body width; saved room viewpoints are clear.');
 if(selected.checks.ensuiteAccess?.passed)checks.push(`${selected.checks.ensuiteAccess.ensuite_bedrooms} bedrooms have bathroom routes contained within their own suite, without crossing a shared landing.`);
 if(selected.checks.privateAccess?.passed)checks.push('All seven bedrooms and shared rooms have routes that avoid the other sleeping rooms.');
 if(selected.checks.stairs?.passed)checks.push('New stairs tested continuously up and down at a 50 cm body width.');
 if(selected.checks.pool?.passed)checks.push('A continuous 50 cm-wide walking test passes both sides of the pool, past the loungers and up/down the garden steps.');
 if(selected.checks.garageAccess?.passed)checks.push('A 50 cm-wide pedestrian can reach the forecourt from each nominal right-hand-drive seat position with both garage cars parked. Actual car-door opening still needs checking.');
 if(selected.checks.parking?.passed)checks.push((selected.checks.parking.positions??6)+' compact-car parking positions tested on arrival and exit with the other cars occupied. Swept-body samples taken every 10 cm.');
 const sideGap=selected.checks.site?.clearances?.['Side upper roof']?.minimum_boundary_gap_m;
 if(sideGap!==undefined)checks.push('The side roof eaves are about '+sideGap.toFixed(2)+' m from the drawn title boundary at their closest point. Boundary position and neighbour distances need survey.');
 if(selected.id.startsWith('i'))checks.push('The four outside compact-car bays were tracked with the other outside cars occupied. The current house envelope and existing stairs are retained.');
 checks.push('Original source files preserved. Room schedules and plans come from this option’s model.');
 $('check-results').innerHTML='<ul>'+checks.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>';
 floorPlan(floor);viewpoint(camera);
 if(updateHash)history.replaceState(null,'','#'+selected.id);
 if(scroll)$('selected-option').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 document.title=`${selected.code} ${selected.name} · Ashley Heights options`;
}
try{
 const response=await fetch(asset('options.json'));if(!response.ok)throw Error('Review data unavailable');({options}=await response.json());
 $('options').innerHTML=[['Internal layout','Three layouts · Current Proposed envelope'],['Complete redesign','Three complete redesigns · Retain the original house']].map(([group,label])=>`<div class="option-group"><h3>${label}</h3><div class="cards">${options.filter(o=>o.group===group).map(o=>`<button class="option-card" data-select="${o.id}" aria-pressed="false" aria-controls="selected-option"><img src="${asset(`images/${o.id}-${o.id.startsWith('i')?'interior':'front'}.jpg`)}" alt="" width="640" height="400" loading="lazy"><span class="card-copy"><strong>${esc(o.code+' · '+o.name)}</strong><span>${esc(o.tagline)}</span><small>7 bedrooms · ${o.ensuites} en suites${o.id==='e1'?' · Retained garage':o.id==='e2'?' · No basement':o.id==='e3'?' · Cellar under new wing':''}</small></span></button>`).join('')}</div></div>`).join('');
 document.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>choose(b.dataset.select,{scroll:true}));
 document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>viewpoint(b.dataset.camera));
 addEventListener('hashchange',()=>choose(location.hash.slice(1),{updateHash:false}));choose(location.hash.slice(1));
 window.redesignReview={options,get selected(){return selected.id},get floor(){return floor},get camera(){return camera}};
}catch(error){console.error(error);$('load-error').hidden=false;}
