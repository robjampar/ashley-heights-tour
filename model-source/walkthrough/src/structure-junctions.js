import {garageDeckMarkup} from './structure-garage-deck.js';
import {bearingEndFacts,cavityFacts,bearingReviewMarkup} from './structure-bearings.js';
import {esc,CATEGORIES,resolveGarageDeck} from './structure-geometry.js';

export function optionIncludes(e,state={}){
 return !!e&&(!e.garageDeckOption||e.garageDeckOption===(state.garageDeck??'solid-rc'))&&(state.region==='all'||!state.region||e.region===state.region)&&
 (e.condition!=='roof-rebuild'||state.roofOption!=='retain')&&
 (e.condition!=='loft-upgrade'||state.loftUpgrade!==false)&&
 (e.scope!=='garage-rebuild'||state.garageRebuild!==false);
}
export function junctionRows(members,state={}){
 state={...state,garageDeck:resolveGarageDeck(members,state?.garageDeck)};
 const by=new Map(members.elements.map(e=>[e.id,e]));
 return members.junctionReview.clashAudit.intersections.filter(h=>[h.a,h.b].every(id=>optionIncludes(by.get(id),state)));
}
const pairButton=(a,b,label='Inspect junction')=>`<button class="pair text-button" data-junction-pair="${esc(a+','+b)}">${esc(label)} ↗</button>`;
function nextStep(categories){
 if(categories.every(c=>c==='masonry'))return 'Resolve the inner/outer leaf return and cavity alignment while preserving the opening and external face.';
 if(categories.includes('partitions'))return 'Coordinate non-bearing wall heads and studs around the beam, including movement and fire-lining space.';
 if(categories.includes('studs')||categories.includes('framing-review'))return 'Establish the wall’s bearing role before changing its head, studs or supporting steel.';
 if(categories.includes('masonry'))return 'Review the wall bearing or pocket, padstone and cavity detail; an overlap does not prove adequate support.';
 if(categories.includes('lintels'))return 'Resolve the competing lintel and beam arrangements and their loads; both are still provisional allowances.';
 if(categories.includes('rc'))return 'Coordinate the steel level, concrete bearing and basement construction detail.';
 if(categories.every(c=>c==='beams'))return 'Resolve the intersecting ridge lines for the selected roof option and design the connection.';
 return 'Review the bearing/end geometry and member levels. Intermediate roof bearings and crossings have not been notched to hide the clash.';
}
export function coveringFitMarkup(members,state={}){
 state={...state,garageDeck:resolveGarageDeck(members,state?.garageDeck)};
 const audit=members.coveringFit;if(!audit)return '';
 const by=new Map(members.elements.map(e=>[e.id,e]));
 const hits=audit.intersections.filter(h=>optionIncludes(by.get(h.memberId),state));
 const groups=new Map();for(const hit of hits){const key=hit.kind==='roof-lining'?'Upper roof linings':hit.kind.includes('floor')||hit.kind==='basement-finish'?'Floor coverings':'Ceiling coverings';if(!groups.has(key))groups.set(key,[]);groups.get(key).push(hit);}
 return `<article class="trial-card"><h2>Architecture: floor and ceiling fit</h2>${state.garageDeck==='beam-block'?'<p>BB01 is contained within the previous slab envelope and preserves the lining datums. Its own internal/shared-structure check is separate; these legacy covering measurements have not been recomputed for each precast part.</p>':''}<p>${audit.measured.length} authored coverings were measured. <strong>${hits.length} overlaps</strong> remain against the structural options currently selected; <strong>${audit.unmeasured.length} unmeasured items</strong> are listed separately. These counts include roof and bearing interfaces beyond the horizontal floor-framing check.</p><p>${esc(audit.scope)}</p>${[...groups].map(([label,rows])=>`<details><summary>${esc(label)} · ${rows.length} overlaps</summary><div class="table-scroll"><table><thead><tr><th>Authored covering</th><th>Member</th><th>Overlap</th></tr></thead><tbody>${rows.map(h=>`<tr><td>${esc(h.objectName)}</td><td><button class="text-button" data-focus-member="${esc(h.memberId)}">${esc(h.memberId)}</button><br>${esc(h.memberName)}</td><td>${h.overlapCm3==null?'Plane crossing':h.overlapCm3.toLocaleString('en-GB')+' cm³'}</td></tr>`).join('')}</tbody></table></div></details>`).join('')}${audit.unmeasured.length?`<details><summary>Unmeasured surfaces and members · ${audit.unmeasured.length}</summary>${audit.unmeasured.map(r=>`<p><strong>${esc(r.objectName??r.memberId)}</strong><br>${esc(r.reason)}</p>`).join('')}</details>`:''}<p><a href="./covering-fit.json" download>Complete finish-fit measurements · JSON ↓</a></p></article>`;
}
export function junctionsMarkup(members,state){
 state={...state,garageDeck:resolveGarageDeck(members,state?.garageDeck)};
 const j=members.junctionReview,by=new Map(members.elements.map(e=>[e.id,e])),pairs=junctionRows(members,state);
 const cuts=j.endCuts.filter(c=>optionIncludes(by.get(c.memberId),state)&&optionIncludes(by.get(c.supportId),state));
 const groups=new Map();for(const p of pairs){const key=p.categories.map(c=>CATEGORIES[c].label).sort().join(' / ');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);}
 const rows=pairs=>pairs.map(p=>`<tr><td><strong>${esc(p.a)} / ${esc(p.b)}</strong><div class="member-names">${esc(by.get(p.a).name)}<br>${esc(by.get(p.b).name)}</div></td><td>${p.overlapCm3.toLocaleString('en-GB')} cm³</td><td>${pairButton(p.a,p.b)}</td></tr>`).join('');
 return `<p class="eyebrow">M11 · GEOMETRY COORDINATION</p><h1>Inspect how the parts meet.</h1><p class="intro">This review follows the building and roof/garage/loft options selected on the left. It includes every level and system in that selection. Exact solid intersections identify overlaps; they do not establish bearing capacity or a complete load path.</p>
 <div class="trial-metrics"><div><small>Remaining solid overlaps · selected options</small><strong>${pairs.length}</strong></div><div><small>Coordinated end cuts · selected options</small><strong>${cuts.length}</strong></div><div><small>Corner junctions reviewed · whole study</small><strong>${j.masonry.corners.length}</strong></div></div>
 <div class="junction-actions"><button class="outline compact" id="export-cuts">Model dimensions · CSV ↓</button><a href="./junction-review.json" download>Full junction review · JSON ↓</a></div>
 ${bearingReviewMarkup(members,state)}
 ${coveringFitMarkup(members,state)}
 <article class="trial-card"><h2>Clearances and connections</h2><p>${esc(j.basis)}</p><p>The model reserves <strong>${j.assumptions.joistEndGapMm} mm</strong> between a joist end and the back plate of its generic hanger, a <strong>${j.assumptions.hangerPlateMm} mm</strong> hanger plate, <strong>${j.assumptions.beamEndClearanceMm} mm</strong> at coordinated secondary steel ends and <strong>${j.assumptions.rafterEndClearanceMm} mm</strong> at coordinated roof-member ends. These are model assumptions, not approved fabrication tolerances.</p><p>I-joist ends remain square with intact flanges. No flange notches, service holes, bolt patterns or weld sizes are inferred. Hanger products, bearing, restraint and steel connection design remain outstanding. The model dimension export is <strong>not a cutting or fabrication schedule</strong>.</p></article>
 <article class="trial-card"><h2>Joist and hanger fit check</h2><p>Across the whole study, ${j.connectionFit.assemblies} hanger assemblies and ${j.connectionFit.solidPairsChecked} linked solid pairs were checked. ${j.connectionFit.intersections.length} positive-volume overlaps and ${j.connectionFit.seatLevelErrors.length} seat-level discrepancies remain in this specific check.</p><p>${esc(j.connectionFit.scope)}</p></article>
 <article class="trial-card"><h2>Remaining overlaps</h2><p>${esc(j.clashAudit.method)} Some overlaps mark an intended bearing pocket; others need a changed assembly or level. Each pair remains visible for review. This is not a clash-free certificate.</p>${[...groups].sort((a,b)=>b[1].length-a[1].length).map(([label,hits])=>`<details><summary>${esc(label)} · ${hits.length}</summary><p>${esc(nextStep(hits[0].categories))}</p><div class="table-scroll"><table><thead><tr><th>Members</th><th>Overlap volume</th><th>3D detail</th></tr></thead><tbody>${rows(hits)}</tbody></table></div></details>`).join('')||'<p>No positive-volume overlaps in the selected audit scope.</p>'}<p class="muted">${esc(j.scopeLimit)}</p></article>
 <article class="trial-card"><h2>Coordinated end geometry</h2><p>Full-section end setbacks and plumb roof-member ends avoid passing through a steel face. The connection across each gap still needs to be designed.</p><details><summary>Review ${cuts.length} end cuts</summary><div class="table-scroll"><table><thead><tr><th>Member / receiver</th><th>End geometry</th><th>3D detail</th></tr></thead><tbody>${cuts.map(c=>`<tr><td>${esc(c.memberId)}<br>${esc(c.supportId)}</td><td>End ${c.end} · ${esc(c.cut)}<br>${c.setbackMm} mm setback; ${c.modelClearanceMm} mm nominal gap</td><td>${pairButton(c.memberId,c.supportId)}</td></tr>`).join('')}</tbody></table></div></details></article>
 <article class="trial-card"><h2>Non-bearing heads below steel</h2><p>Complete panel heads and their studs move together beneath parallel downstand beams. The ${j.assumptions.partitionSteelClearanceMm} mm gap is a combined movement/fire-lining space allowance; the actual movement, steel protection and head/sealing system remain to be designed. Cross-beam junctions remain in the overlap list.</p>${j.partitionHeads.filter(r=>optionIncludes(by.get(r.headId),state)&&optionIncludes(by.get(r.beamId),state)).map(r=>`<p><strong>${esc(r.headId)}</strong> · ${r.dropMm} mm lower, with ${r.studIds.length} shortened studs.</p>${pairButton([r.headId,...r.studIds].join(','),r.beamId,'Inspect complete partition head')}`).join('')}</article>
 ${state.garageDeck==='beam-block'?garageDeckMarkup(members,state):''}<article class="trial-card"><h2>Construction layers</h2><p>Use <strong>Floor build-ups</strong> to see selectable deck, finish, service-space and ceiling allowances. These layers follow the floor openings and are excluded from the cost subtotal. The schedule below records what remains missing.</p><div class="table-scroll"><table><thead><tr><th>System</th><th>Shown in the model</th><th>Still unresolved / not fully modelled</th></tr></thead><tbody>${j.layerSchedule.map(item=>{const r=state.garageDeck==='beam-block'&&item.system==='Basement and vehicle deck'?{...item,shown:'Selected beam-and-block system; provisional 150 mm precast beams and 100 mm nominal reinforced topping within the existing 250 mm structural envelope; original 75 mm finish/screed allowance and ceiling datum retained. Local RC edges retain the bearing-wall route.'}:item;return `<tr><td><strong>${esc(r.system)}</strong></td><td>${esc(r.shown)}</td><td>${esc(r.unresolved)}</td></tr>`;}).join('')}</tbody></table></div></article>
 <article class="trial-card"><h2>Joist material preference</h2><p>${esc(j.assumptions.materialPreference)}</p><p>The short ground-floor bays and west loft now have solid C24 candidates with limited floor-load screens. The ground-floor bays include staggered full-depth blocking and a rough stock comparison in Costs. Longer bays retain I-joist reservations pending complete manufacturer design; selected fire, acoustic, vibration and connection details remain open.</p></article>
 <div class="trial-sources">${j.assumptions.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join('')}</div>`;
}

export function junctionFacts(e,members){
 const j=members.junctionReview;if(!j)return '';
 const related=j.clashAudit.intersections.filter(p=>p.a===e.id||p.b===e.id);
 const h=e.connectionDetail,coverings=e.coveringFitClashes??[];
 return `${bearingEndFacts(e)}${cavityFacts(e)}${e.layoutAdjustment?`<h2>Layout adjustment</h2><p>Joist grid line moved from ${e.layoutAdjustment.originalCrossM.toFixed(3)} m to ${e.layoutAdjustment.currentCrossM.toFixed(3)} m (${Math.round(Math.abs(e.layoutAdjustment.currentCrossM-e.layoutAdjustment.originalCrossM)*1000)} mm). ${esc(e.layoutAdjustment.reason)}</p>`:''}
 ${h?`<h2>Hanger coordination</h2><p>${h.modelEndGapMm} mm nominal joist-end gap; ${h.plateMm} mm back plate; ${h.modelBearingLengthMm} mm modelled seat contact. Product and load capacity unverified.</p><p>${esc(h.joistCut??'I-joist flanges stay intact; no site notches approved.')}</p>${pairButton(e.parentId,e.receiverId,'Inspect joist, hanger and receiver')}${h.infillMemberId?`<button class="text-button" data-focus-member="${esc(h.infillMemberId)}">Inspect timber infill block</button>`:''}${h.infillStatus?`<p>${esc(h.infillStatus)}</p>`:''}`:''}
 ${e.endCutDetails?.length?`<h2>Model end cuts</h2>${e.endCutDetails.map(c=>`<p>End ${c.end}: ${esc(c.cut)}. ${c.setbackMm} mm setback with ${c.modelClearanceMm} mm nominal clearance.</p>${pairButton(e.id,c.supportId)}`).join('')}<p>Model dimensions only. Connection and fabrication design outstanding.</p>`:''}
 ${e.partitionHeadCoordination?`<h2>Non-bearing head adjustment</h2><p>${e.partitionHeadCoordination.dropMm} mm lower with ${e.partitionHeadCoordination.nominalSteelClearanceMm} mm nominal clearance below steel. ${esc(e.partitionHeadCoordination.basis)}</p>${pairButton([e.partitionHeadCoordination.headId,...e.partitionHeadCoordination.studIds].join(','),e.partitionHeadCoordination.beamId,'Inspect complete panel head')}`:''}
 ${e.cornerCoordination?`<h2>Masonry corner</h2><p>${esc(e.cornerCoordination.basis)}</p>`:''}
 ${coverings.length?`<h2>Architectural covering overlaps</h2><p>${coverings.length} authored floor, ceiling or roof-lining intersections require coordination. The architecture remains visible when inspecting this member in the walkthrough.</p><details><summary>Covering names and measured overlap</summary>${coverings.map(c=>`<p><strong>${esc(c.objectName)}</strong><br>${c.overlapCm3==null?'Plane crossing':c.overlapCm3.toLocaleString('en-GB')+' cm³'}</p>`).join('')}</details>`:''}
 ${related.length?`<h2>Measured overlaps · all options</h2><p>${related.length} overlapping solid pair${related.length===1?'':'s'}. Inspecting a pair enables its required options.</p>${related.slice(0,8).map(p=>pairButton(p.a,p.b,(p.a===e.id?p.b:p.a)+' · '+p.overlapCm3+' cm³')).join('')}${related.length>8?'<p>All pairs are listed in Junctions.</p>':''}`:''}`;
}

export function cutCSV(members,state){
 state={...state,garageDeck:resolveGarageDeck(members,state?.garageDeck)};
 const by=new Map(members.elements.map(e=>[e.id,e]));
 const fields=['id','section','modelLengthMm','endTreatment','ends','headAdjustment','fabricationReady'];
 const quote=x=>'"'+String(typeof x==='object'?JSON.stringify(x):x??'').replaceAll('"','""')+'"';
 return '\uFEFF'+[fields.map(quote).join(','),...members.junctionReview.cutSchedule.filter(r=>optionIncludes(by.get(r.id),state)).map(r=>fields.map(k=>quote(r[k])).join(','))].join('\r\n')+'\r\n';
}
