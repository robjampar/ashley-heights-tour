import {foundationFacts} from './structure-foundations.js';
import {junctionFacts} from './structure-junctions.js';
import {esc,MEMBER_CATEGORIES} from './structure-geometry.js';
export const FRAMING_ROLE_LABELS={'loadbearing-proposal':'Load-bearing · proposed','non-loadbearing':'Non-load-bearing partition',unresolved:'Role unresolved'};
export const SCOPE_LABELS={new:'New work',alteration:'Alteration to existing', 'garage-rebuild':'Garage rebuild',retained:'Retained · survey required'};
export function costRows(members,{garageRebuild=true,loftUpgrade=true,roofOption='replace',region='house',scope='all',rates=members.rates}={}){
 return members.elements.filter(e=>!e.retained&&e.cost&&e.cost.quantity>0&&(e.condition!=='loft-upgrade'||loftUpgrade)&&(e.condition!=='roof-rebuild'||roofOption==='replace')&&(e.scope!=='garage-rebuild'||garageRebuild)&&(region==='all'||e.region===region)&&(scope==='all'||e.scope===scope)).map(e=>{
  const rate=rates[e.cost.rateKey];return {id:e.id,name:e.name,roofOption,scope:e.scope,category:e.category,framingRole:e.framingRole??null,material:e.material??null,quantity:e.cost.quantity,rateKey:e.cost.rateKey,unit:rate.unit,status:e.status,low:e.cost.quantity*rate.low,reference:e.cost.quantity*rate.reference,high:e.cost.quantity*rate.high};
 });
}
export function costTotals(rows){return rows.reduce((r,x)=>({low:r.low+x.low,reference:r.reference+x.reference,high:r.high+x.high}),{low:0,reference:0,high:0});}
export function timberFramingCosts(rows){
 return Object.entries(FRAMING_ROLE_LABELS).map(([role,label])=>{
  const es=rows.filter(e=>e.framingRole===role&&e.rateKey==='timber'&&e.unit==='m³');
  return {label,count:es.length,quantity:es.reduce((s,e)=>s+e.quantity,0),...costTotals(es)};
 }).filter(e=>e.count);
}
const money=n=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n);
function groundSolidCostMarkup(members,rates,visibleRows){
 const s=members.groundDeckStudy?.solidFloorStudy;
 if(!s||!visibleRows.some(r=>s.joistIds.includes(r.id)))return '';
 const alternatives=s.alternatives.map(a=>{const quantity=a.netJoistVolumeM3??a.netJoistLengthM,rate=a.netJoistVolumeM3!=null?rates.timber:rates.ijoist;return `<tr><td>${esc(a.label)}</td><td>${quantity.toFixed(2)} ${a.netJoistVolumeM3!=null?'m³':'m'}</td>${['low','reference','high'].map(k=>`<td>${money(quantity*rate[k])}</td>`).join('')}</tr>`}).join('');
 const stock=s.stockAllocation;
 return `<article class="trial-card"><h2>G02 · Short-span solid timber comparison</h2><p>${s.joistIds.length} joists and ${s.blockingIds.length} staggered midspan blocks are drawn. These are experimental members with limited gravity screens; vibration, restraint and connections remain unverified. This comparison uses the same ${s.netJoistLengthM.toFixed(1)} m of joists in each option and your current unit allowances. Blocking and hangers are excluded from this comparison table but included where priced in the main subtotal.</p><div class="table-scroll"><table><thead><tr><th>Option</th><th>Net joists</th><th>Lower</th><th>Reference</th><th>Higher</th></tr></thead><tbody>${alternatives}</tbody></table></div><p><strong>Illustrative stock allocation:</strong> ${stock.length} × 4.8 m lengths, including blocks cut from offcuts. Supplier-list supply benchmark ${money(s.stockSupplyBenchmarkExVAT)} ex VAT; separate from the installed allowance above.</p><p>${esc(s.stockBasis)}</p><details><summary>Review rough stock allocation · not fabrication-ready</summary><div class="table-scroll"><table><thead><tr><th>Stock</th><th>Rough pieces</th><th>Remaining</th></tr></thead><tbody>${stock.map((b,i)=>`<tr><td>${i+1} · 4.8 m</td><td>${b.pieces.map(p=>`<button class="text-button" data-focus-member="${esc(p.memberId)}">${esc(p.memberId)}</button> ${p.roughCutMm} mm`).join('<br>')}</td><td>${b.remainingMm} mm</td></tr>`).join('')}</tbody></table></div></details><a href="${esc(s.supplierReference.url)}" target="_blank" rel="noopener">UK stock-size / supply benchmark ↗</a></article>`;
}
export function costMarkup(members,state,rates){
 state={roofOption:'replace',loftUpgrade:true,garageRebuild:true,...state};
 const rows=costRows(members,{...state,rates}),totals=costTotals(rows),groups=Object.entries(rates).map(([id,r])=>({id,...r,quantity:rows.filter(x=>x.rateKey===id).reduce((s,x)=>s+x.quantity,0)})).filter(r=>r.quantity>0);
 const framingRows=timberFramingCosts(rows);
 const framingTable=`<article class="trial-card"><h2>Wall framing by role</h2><p>Separate quantities within the subtotal above, using the same timber allowance. Non-load-bearing partitions are kept separate from proposed bearing frames; unresolved roles remain a distinct allowance.</p><div class="table-scroll"><table><thead><tr><th>Role</th><th>References</th><th>Timber m³</th><th>Reference allowance</th></tr></thead><tbody>${framingRows.map(e=>`<tr><td>${esc(e.label)}</td><td>${e.count}</td><td>${e.quantity.toFixed(3)}</td><td>${money(e.reference)}</td></tr>`).join('')}</tbody></table></div></article>`;
 const delta=costTotals(costRows(members,{...state,garageRebuild:true,scope:'garage-rebuild',rates}));
 return `<div class="trial-head"><div><p class="eyebrow">M16 · QUANTITY-LED ALLOWANCES</p><h1>Explore the shell costs.</h1><p><strong>Roof option ${state.roofOption==='replace'?'B · Remove and rebuild':'A · Retain and adapt'}.</strong> Priced subset of modelled new and altered work. Retained structure is excluded. All levels in the selected building; drawing layer toggles do not change this subtotal. Full replacement of the original loft joists is ${state.loftUpgrade!==false?'included as an unverified allowance':'hidden and excluded in this comparison'}. The base scheme removes the existing loft joists and roof; lower floors remain retained.</p></div><button class="outline compact" id="export-cost">Export member CSV ↓</button></div><div class="trial-note"><strong>Partial subtotal — not a complete shell budget.</strong> Uncalculated member reservations are included as allowances. The missing work below has no price yet. ${esc(members.rateBasis)}</div><div class="trial-metrics">${[['low','Lower allowances'],['reference','Reference allowances'],['high','Higher allowances']].map(([k,l])=>`<div><small>${l} · ex VAT</small><strong>${money(totals[k])}</strong></div>`).join('')}</div><article class="trial-card"><h2>Original garage scenario</h2><p><strong>${state.garageRebuild!==false?'Rebuild included — base scheme':'Retain original garage shell, subject to survey'}</strong>. The modelled wall/foundation reservations account for ${money(delta.low)}–${money(delta.high)} (${money(delta.reference)} reference) to this priced subset. This is <strong>not the full demolition/rebuild premium</strong>: demolition, excavation, propping and unknown foundation requirements are unpriced. New upper-storey work is common to both options.</p><p>${esc(members.garageOption.basis)}</p></article><article class="trial-card"><h2>Editable unit allowances · GBP ex VAT</h2><p>Change any rate to test a quote or budget. Rates save in this browser. Net quantities exclude waste and are not an order list.</p><div class="table-scroll"><table><thead><tr><th>Package</th><th>Quantity</th><th>Low / unit</th><th>Reference / unit</th><th>High / unit</th><th>Reference subtotal</th></tr></thead><tbody>${groups.map(g=>`<tr><td>${esc(g.label)}</td><td>${g.quantity.toLocaleString('en-GB',{maximumFractionDigits:2})} ${esc(g.unit)}</td>${['low','reference','high'].map(k=>`<td><input type="number" min="0" step="0.1" data-rate="${g.id}" data-bound="${k}" value="${g[k]}" aria-label="${esc(g.label+' '+k+' rate')}"></td>`).join('')}<td>${money(g.quantity*g.reference)}</td></tr>`).join('')}</tbody></table></div><button class="text-button" id="reset-rates">Reset study allowances</button><p>${rows.length} priced member/assembly references. Concrete excludes reinforcing steel and formwork; hanger and lintel products remain unselected.</p></article>${framingTable}${groundSolidCostMarkup(members,rates,rows)}<article class="trial-card"><h2>Unpriced / outside this subtotal</h2><ul>${members.excludedCosts.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>`;
}
export function memberCSV(members,state,rates){
 const fields=['id','name','roofOption','scope','category','framingRole','material','status','quantity','unit','rateKey','low','reference','high'];const quote=x=>'"'+String(x??'').replaceAll('"','""')+'"';
 return '\uFEFF'+[fields.map(quote).join(','),...costRows(members,{...state,rates}).map(r=>fields.map(k=>quote(r[k])).join(','))].join('\r\n')+'\r\n';
}
export function issueMarkup(members){
 return `<p class="eyebrow">M11 · OPEN COORDINATION ITEMS</p><h1>See what still needs resolving.</h1><p class="intro">These are known issues and unverified assumptions, not an exhaustive clash or engineering audit. Select a reference to inspect its location in 3D.</p>${members.issues.map(i=>`<article class="trial-card"><span class="issue-kind">${esc(i.severity)}</span><h2>${esc(i.title)}</h2><p>${esc(i.detail)}</p><div class="issue-refs">${i.elementIds.slice(0,8).map(id=>`<button data-focus-member="${esc(id)}">${esc(id)}</button>`).join('')}${i.elementIds.length>8?`<small>+ ${i.elementIds.length-8} related references</small>`:''}</div></article>`).join('')}`;
}
function gardenSupportMarkup(e){
 const ends=e.gardenEndSupports?`<h2>Terrace member ends</h2>${e.gardenEndSupports.map((s,i)=>`<p>End ${i+1}: <button class="text-button" data-focus-member="${esc(s.memberId)}">${esc(s.memberId)}</button> · ${Math.round(s.gapM*1000)} mm model gap. Hanger/seat and capacity unverified.</p>`).join('')}`:'';
 const f=e.foundationCoordination;
 const foundation=f?`<h2>Below-ground reference</h2><p>${esc(f.datum)}. Upper face ${f.topZ.toFixed(2)} m; underside ${f.bottomZ.toFixed(2)} m. ${esc(f.basis)}</p>${f.bearingMemberId?`<button class="text-button" data-focus-member="${esc(f.bearingMemberId)}">Inspect footing ${esc(f.bearingMemberId)}</button>`:''}`:'';
 return ends+foundation;
}
export function memberFacts(e,members,rates){
 const supports=e.endSupports?`<h2>Joist ends</h2>${e.endSupports.map((s,i)=>`<p>End ${i+1}: ${s.kind==='receiver-reservation'?`<button class="text-button" data-focus-member="${esc(s.memberId)}">${esc(s.memberId)}</button> · receiver reservation; capacity unverified`:s.kind==='cantilever-tip'?'Free cantilever tip · no end hanger':'Unresolved support'}</p>`).join('')}`:'';
 const cant=e.cantilever?`<h2>Deliberate cantilever</h2><p>${e.cantilever.lengthM.toFixed(3)} m projection; ${e.cantilever.backspanM.toFixed(3)} m modelled backspan. <button class="text-button" data-focus-member="${esc(e.cantilever.supportMemberId)}">Inspect inboard bearing</button>. ${esc(e.cantilever.basis)}</p>`:'';
 const contacts=e.endSupportCandidates?`<h2>Receiver end contacts</h2>${e.endSupportCandidates.map((s,i)=>`<p>End ${i+1}: ${s.wallCandidates.length?'near wall envelope '+esc(s.wallCandidates.join(', ')):'no direct wall bearing identified'}; ${s.connectedReceivers.length} adjoining receivers. Geometric contact only; load path unverified.</p>`).join('')}`:'';
 const m=e.measurements;const rows=[['Work scope',SCOPE_LABELS[e.scope]??e.scope],['Roof strategy',e.condition==='roof-rebuild'?'Option B only':'Shared / retained basis'],['Material proposal',e.material],['Framing role',FRAMING_ROLE_LABELS[e.framingRole]??e.framingRole],['Displayed section',e.section],['Length',m.lengthM?m.lengthM.toFixed(3)+' m':null],['Top / underside',`${e.bounds[1][2].toFixed(3)} / ${e.bounds[0][2].toFixed(3)} m`],['Centres',e.spacingMm?e.spacingMm+' mm':null],['Calculation basis',e.calculationRef??'Uncalculated space reservation'],['Net area',e.areaM2?e.areaM2.toFixed(2)+' m²':null],['Visible masonry pieces',e.unitCount?e.unitCount.toLocaleString():null],['Quantity',e.cost?e.cost.quantity.toLocaleString('en-GB',{maximumFractionDigits:3})+' '+rates[e.cost.rateKey].unit:null],['Reference allowance',e.cost?money(e.cost.quantity*rates[e.cost.rateKey].reference)+' ex VAT':null],['Construction status','Not approved']];
 const issues=members.issues.filter(i=>e.issueIds?.includes(i.id));
 return `<p class="eyebrow">MEMBER / ASSEMBLY INSPECTOR</p><span class="ref">${esc(e.id)}</span><h2>${esc(e.name)}</h2><span class="badge">${esc(e.status)}</span><dl class="facts">${rows.filter(r=>r[1]!=null).map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><p>${esc(e.basis)}</p>${e.unitNote?`<p>${esc(e.unitNote)}</p>`:''}${e.supportStatus?`<p><strong>Supports:</strong> ${esc(e.supportStatus)}</p>`:''}${e.floorBandSupport?`<h2>Masonry through the floor</h2><p>Continues from ${e.floorBandSupport.bottomZ.toFixed(2)} to ${e.floorBandSupport.topZ.toFixed(2)} m onto the aligned wall/head below. Floor joists do not carry this leaf; capacity remains unverified.</p>${e.floorBandSupport.lowerWallIds.map(id=>`<button class="text-button" data-focus-member="${esc(id)}">${esc(id)}</button>`).join('')}`:''}${foundationFacts(e,members)}${gardenSupportMarkup(e)}${masonryBearingMarkup(e)}${wallBearingMarkup(e)}${supplierSpanMarkup(e.supplierSpanCheck)}${supportScreenMarkup(e.supportScreen)}${columnScreenMarkup(e.columnScreen)}${bearingSeatMarkup(e)}${loadRouteMarkup(e.loadRoute)}${vehicleDeckMarkup(e)}${junctionFacts(e,members)}${supports}${cant}${e.intermediateSupports?.length?`<h2>Intermediate bearing proposals</h2>${e.intermediateSupports.map(id=>`<button class="text-button" data-focus-member="${esc(id)}">${esc(id)}</button>`).join('')}`:''}${e.proposedBeamLine?`<h2>Proposed continuous beam line</h2><p>${esc(e.proposedBeamLine.id)} · ${esc(e.proposedBeamLine.name)}. Model segments on this line do not imply fabrication splices.</p>`:''}${e.connectionRequirement?`<p><strong>Connection:</strong> ${esc(e.connectionRequirement)}</p>`:''}${contacts}${e.receiverId?`<button class="text-button" data-focus-member="${esc(e.receiverId)}">Inspect receiver ${esc(e.receiverId)}</button>`:''}${e.parentId?`<button class="text-button" data-focus-member="${esc(e.parentId)}">Inspect parent joist ${esc(e.parentId)}</button>`:''}<button class="outline" id="focus-element">Focus in 3D</button><button class="outline" id="isolate-element" style="margin-top:8px">Isolate this assembly</button><h2>Open checks</h2>${issues.map(i=>`<p class="member-issue"><strong>${esc(i.title)}</strong><br>${esc(i.detail)}</p>`).join('')}<ul class="check-list">${e.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><p class="muted">Source objects: ${esc(e.sourceIds?.join(', ')||'Explicit trial layout')}</p>`;
}
// Convert masonry unit boxes to triangles only for rendering. Drawings use the
// exact assembly outline/cuts, avoiding illegible thousands of projected joints.
export function masonryTriangles(e){
 if(!e.units)return e.triangles;const tri=[...(e.cutUnitTriangles??[])];
 for(const [x,y,z,w,d,h]of e.units){const p=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(([a,b,c])=>[x+a*w/2,y+b*d/2,z+c*h/2]);for(const [a,b,c,d]of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]])tri.push(p[a],p[b],p[c],p[a],p[c],p[d]);}
 return tri;
}
export const ISOLATION={all:MEMBER_CATEGORIES.filter(k=>k!=='layers'),steel:['beams'],floors:['beams','joists','trimmers','connections','details'],roof:['beams','rafters','trimmers','fascia'],walls:['studs','partitions','framing-review','lintels','masonry'],partitions:['partitions'],bearing:['studs'],connections:['connections','details'],layers:['layers','joists','beams','connections','details'],concrete:['rc']};

export function roofOptionsMarkup(members,state,rates){
 const extraIds=new Set(members.elements.filter(e=>e.condition==='roof-rebuild').map(e=>e.id));
 const extra=costTotals(costRows(members,{roofOption:'replace',region:'house',rates}).filter(e=>extraIds.has(e.id)));
 const info=members.roofOptions;
 return `<p class="eyebrow">M11 · TWO STRUCTURAL STRATEGIES</p><h1>Keep the roof, or rebuild it.</h1><p class="intro">${esc(info.externalForm)} Roof B and a completely new loft floor are the agreed base scheme. Option A remains available as a comparison. Existing lower floors and walls remain except for agreed alterations; the original garage rebuild is included by default and can be switched off for comparison.</p><div class="roof-option-grid">${info.options.map((option,i)=>`<article class="trial-card roof-option ${state.roofOption===option.id?'active':''}"><span class="eyebrow">OPTION ${i?'B':'A'} ${state.roofOption===option.id?'· SELECTED':''}</span><h2>${esc(option.label.slice(4))}</h2><p>${esc(option.description)}</p><dl class="facts"><div><dt>Original roof frame</dt><dd>${i?'Entirely replaced':'Retain where verified'}</dd></div><div><dt>New wings / dormers</dt><dd>Included in both options</dd></div><div><dt>Exterior shape</dt><dd>Agreed design retained</dd></div></dl><p>${esc(option.risks)}</p><button class="outline" data-roof-choice="${option.id}">${state.roofOption===option.id?'Selected':'Select option '+(i?'B':'A')}</button><div class="roof-actions"><button data-roof-model="${option.id}">View in 3D</button><button data-roof-plan="${option.id}">Roof plan</button></div></article>`).join('')}</div><article class="trial-card"><h2>What Option B adds to the current model</h2><p><strong>${info.replacementMemberCount} replacement framing references</strong> cover the surviving original-roof zones shown grey in Option A, approximately <strong>${info.additionalReplacementRoofSurfaceM2.toFixed(1)} m²</strong> of modelled roof surface. Roof areas already removed/altered for the agreed extensions and dormers are common to both options. This additional area is not the total original-roof demolition quantity.</p><p>Additional modelled framing allowance: <strong>${money(extra.low)}–${money(extra.high)} ex VAT</strong>; reference ${money(extra.reference)}. These are uncalculated member reservations at editable study rates. <strong>This is not the full replacement premium.</strong> Demolition, scaffolding, temporary covering, coverings/insulation, strengthening and connection design remain unpriced.</p><p>Use the roof selector to compare the same camera, plan or section. The register, quantities, cost subtotal and CSV export follow the selected option.</p></article>`;
}

// Recess each mortar surface behind its own face, including corner returns
// and horizontal course cuts. Scaling only the wall thickness left return
// faces coplanar with brick ends and produced flickering at bonded corners.
// This is a display backing; unit geometry and priced quantities are unchanged.
export function mortarTriangles(e,recess=.002){
 if(e.category!=='masonry'||!e.units)return [];
 // Authored wall prisms and boolean-rebuilt walls use opposite windings.
 // Resolve the closed leaf's orientation before offsetting its display faces.
 const origin=e.bounds[0];let signedVolume6=0;
 for(let i=0;i<e.triangles.length;i+=3){
  const [a,b,c]=e.triangles.slice(i,i+3).map(p=>p.map((x,k)=>x-origin[k]));
  signedVolume6+=a[0]*(b[1]*c[2]-b[2]*c[1])+a[1]*(b[2]*c[0]-b[0]*c[2])+a[2]*(b[0]*c[1]-b[1]*c[0]);
 }
 const orientation=signedVolume6<0?-1:1;
 const result=[];
 for(let i=0;i<e.triangles.length;i+=3){
  const face=e.triangles.slice(i,i+3),[a,b,c]=face,u=b.map((v,k)=>v-a[k]),v=c.map((x,k)=>x-a[k]);
  const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],length=Math.hypot(...n);
  let faceOrientation=orientation;
  // Some cut return faces also have inconsistent winding. An outermost
  // face must always recess towards the leaf interior, never over the units.
  for(let axis=0;axis<3;axis++)for(const side of [0,1]){
   if(face.every(p=>Math.abs(p[axis]-e.bounds[side][axis])<1e-8)&&length&&Math.abs(n[axis])/length>1-1e-6){
    faceOrientation=(side?1:-1)*Math.sign(n[axis]);
   }
  }
  result.push(...face.map(p=>p.map((x,k)=>x-(length?faceOrientation*n[k]*recess/length:0))));
 }
 return result;
}

function vehicleDeckMarkup(e){
 const study=e.vehicleDeckStudy;if(!study)return '';
 const thickness=e.slabCoordination.thicknessMm,cases=study.cases.filter(c=>c.thicknessMm===thickness);
 const rows=cases.map(c=>`<tr><td>${esc(c.case)} · ${esc(c.bay)}</td><td>${c.spanM.toFixed(3)} m</td><td>${c.stripWidthM.toFixed(1)} m</td><td>${c.loadAction==='distributed'?c.vehicleUDLKPa.toFixed(1)+' kPa':c.singleWheelOrJackKN.toFixed(0)+' kN local'}</td><td>${c.ulsMomentKNmPerM.toFixed(1)} kNm/m</td><td>${c.requiredFlexuralAsMm2PerM==null?'Beyond assumed block':c.requiredFlexuralAsMm2PerM.toFixed(0)+' mm²/m'}</td></tr>`).join('');
 return `<h2>Garage vehicle deck · strip study</h2><p><strong>${esc(study.status)}</strong></p><p>${esc(study.supportSpanBasis)}</p><p>Trial materials: ${esc(study.materialAssumptions.concrete)}, ${esc(study.materialAssumptions.reinforcement)}; assumed ${study.materialAssumptions.coverMm} mm cover and ${study.materialAssumptions.trialBarDiameterMm} mm bars define effective depth only.</p><details><summary>${thickness} mm slab · ${cases.length} load/distribution cases</summary><div class="table-scroll"><table><thead><tr><th>Case / bay</th><th>Span</th><th>Assumed strip</th><th>Vehicle action</th><th>ULS moment</th><th>Flexural As only</th></tr></thead><tbody>${rows}</tbody></table></div></details><p>${esc(study.limits)}</p><a href="${esc(study.flexureSource)}" target="_blank" rel="noopener">Flexural calculation reference ↗</a>`;
}

function loadRouteMarkup(route){
 if(!route)return '';
 const link=id=>id.startsWith('M-')?`<button class="text-button" data-focus-member="${esc(id)}">${esc(id)} ↗</button>`:esc(id.replaceAll('-',' '))+' · bearing unverified';
 return `<h2>Load path · ${esc(route.study)}</h2><p>Loads from the floor and ${route.receivedFrom.length?route.receivedFrom.map(link).join(', '):'this member’s self-weight'} pass to:</p><ol>${route.endDestinations.map((id,i)=>`<li>Support ${i+1}: ${link(id)}</li>`).join('')}</ol><p>These are proposed reaction routes. The next member, connection and final foundation still need verification.</p>`;
}
function columnScreenMarkup(screen){
 if(!screen)return '';
 const comparison=screen.cases.some(c=>c.hypotheticalStoreyRestraint),axial=s=>s?`${(s.axialUtilisation*100).toFixed(0)}% at ${s.effectiveLengthM.toFixed(2)} m`:'—';
 return `<h2>Column · axial sensitivity</h2><p>${esc(screen.basis)}</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Floor + column ULS</th><th>Full-height axial utilisation</th>${comparison?'<th>With hypothetical floor restraint</th>':''}</tr></thead><tbody>${screen.cases.map(c=>`<tr><td>${esc(c.scenario+(c.pattern?' · '+c.pattern:''))}</td><td>${c.fullLength.axialULSKN.toFixed(1)} kN</td><td>${axial(c.fullLength)}</td>${comparison?`<td>${axial(c.hypotheticalStoreyRestraint)}</td>`:''}</tr>`).join('')}</tbody></table></div><p>${esc(screen.limits)}</p><a href="${esc(screen.section.source)}" target="_blank" rel="noopener">Section property source ↗</a>`;
}
function bearingSeatMarkup(e){
 const seats=e.bearingSeats??(e.bearingSeat?[e.bearingSeat]:[]);
 if(!seats.length)return '';
 return `<h2>Modelled bearing seats</h2>${seats.map(s=>`<p><strong>${esc(s.wallId)}</strong><br>${(s.nominalBearingM*1000).toFixed(0)} mm nominal bearing; ${(s.contactAreaM2*1e6).toFixed(0)} mm² geometric contact. Underside at Z${s.bearingZ.toFixed(3)} m.</p><button class="text-button" data-junction-pair="${esc([e.id,s.padId,s.groutId].join(','))}">Inspect beam, pad and grout ↗</button><p>${esc(s.basis)}</p>`).join('')}<p>Pad strength, masonry compression, eccentricity and support below are unverified.</p>`;
}
function supplierSpanMarkup(s){
 if(!s)return '';
 return `<h2>Supplier span-table comparison</h2><p>${s.engineeringSpanM.toFixed(3)} m between modelled receivers; table limit ${s.tableSpanM.toFixed(3)} m at ${s.spacingMm} mm centres. <strong>${s.withinTable?'Within table span only':'Exceeds table span'}</strong>.</p><p>${esc(s.limits)}</p><a href="${esc(s.source)}" target="_blank" rel="noopener">James Jones JJI manual · ${esc(s.table)} ↗</a>`;
}
function supportScreenMarkup(screen){
 if(!screen)return '';
 const rows=cases=>cases.map(c=>`<tr><td>${esc(c.scenario)}</td><td>${c.sls.deflectionMm.toFixed(1)} mm</td><td>${(c.uls.reactionsKN??[c.uls.reactionKN,c.uls.reactionKN]).map(n=>n.toFixed(1)).join(' / ')} kN</td><td>${c.withinScreen?'Within limited screen':'Fails screen'}</td></tr>`).join('');
 const policy=screen.serviceability;
 const policyView=policy?`<h2>UK design basis · provisional</h2><p><strong>Building Regulations compliance is not demonstrated.</strong> A result within these limited checks is not construction approval.</p><p>Variable-action limit: span/${policy.variableSpanDivisor}. Total-movement target: the smaller of span/${policy.totalSpanDivisor} and ${policy.totalAbsoluteMm} mm.</p><p>${esc(policy.basis)}</p>`:'';
 const patterns=screen.patternCases??[],holdDown=Math.max(0,...patterns.map(c=>c.upliftSensitivity?.holdDownDemandKN??0));
 const patternView=patterns.length?`<details><summary>Adverse live-load patterns</summary><p>${esc(screen.patternBasis??'Each gallery span is loaded separately, with linked reactions carried into the receiving beams. The isolated north-span case also removes live load from the other loft bays.')}</p><div class="table-scroll"><table><thead><tr><th>Pattern / case</th><th>Deflection</th><th>ULS reactions</th><th>Result</th></tr></thead><tbody>${rows(patterns.map(c=>({...c,scenario:c.variablePattern.replaceAll('gallery-','').replaceAll('-',' ')+' · '+c.scenario})))}</tbody></table></div>${holdDown?`<p><strong>Connection reversal:</strong> the 0.90 Gk + 1.50 Qk sensitivity gives up to ${holdDown.toFixed(2)} kN uplift at a support. A positive steel connection must carry this; connection capacity is not verified.</p>`:''}</details>`:'';
 return `${policyView}<h2>Limited floor-load screen</h2><p>${esc(screen.basis)}</p><p>${esc(screen.loadBasis)}</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Total deflection</th><th>Support reactions · ULS</th><th>Result</th></tr></thead><tbody>${rows(screen.cases)}</tbody></table></div>${patternView}${screen.sectionToleranceCases?.length?`<details><summary>Smaller-section sensitivity</summary><p>Assumed 44 × 293.5 mm section, compared with the 45 × 295 mm model. This is a sensitivity, not a supplier tolerance guarantee.</p><div class="table-scroll"><table><thead><tr><th>Case</th><th>Final deflection</th><th>ULS reactions</th><th>Result</th></tr></thead><tbody>${rows(screen.sectionToleranceCases)}</tbody></table></div></details>`:''}<p>${esc(screen.limits)}</p>${screen.intermediateStudy?`<h2>Intermediate support comparison</h2><p>${esc(screen.intermediateStudy.basis)}</p><p>Spans ${screen.intermediateStudy.spansM.map(n=>n.toFixed(3)+' m').join(' + ')}.</p>${screen.intermediateStudy.cases.map(c=>`<p>${esc(c.scenario)}: deflections ${c.segments.map(s=>s.sls.deflectionMm.toFixed(1)+' mm').join(' / ')}; combined intermediate ULS reaction ${c.intermediateReactionULSKN.toFixed(1)} kN.</p>`).join('')}`:''}`;
}

function wallBearingMarkup(e){
 if(!e.wallBearingSpanStudy)return '';
 const contacts=e.existingWallBearings??[];
 return `<h2>Existing-wall bearing study</h2><p>${contacts.length?'Retained solid walls are proposed as the intermediate supports.':'No retained intermediate wall crosses this joist; a local transfer or verified longer-span member is still needed.'}</p>${contacts.map(c=>`<p><button class="text-button" data-focus-member="${esc(c.wallId)}">${esc(c.wallId)}</button> · ${esc(c.wallName)}<br>${(c.bearingRunM*1000).toFixed(0)} mm geometric crossing; wall head ${c.wallHeadDeltaMm>=0?'above':'below'} joist underside by ${Math.abs(c.wallHeadDeltaMm).toFixed(0)} mm. Seat/hanger detail and capacity unverified.</p>`).join('')}<p>Modelled clear runs: ${e.wallBearingSpanStudy.clearRunsM.map(n=>n.toFixed(2)+' m').join(' + ')}. These are geometry measurements, not approved spans.</p>`;
}

function masonryBearingMarkup(e){
 const a=e.masonryBearingAudit;if(!a)return '';
 const percent=a.baseAreaM2?100*a.contactAreaM2/a.baseAreaM2:0;
 const refs=a.contacts.map(c=>c.memberId);
 return `<h2>Wall base contact</h2><p>${percent.toFixed(1)}% of the sampled base meets masonry, concrete or a transfer/lintel envelope. ${a.unmatchedAreaM2.toFixed(3)} m² has no matching support in this check. Contact is geometric; capacity and the load path below remain unverified.</p>${refs.map(id=>`<button class="text-button" data-focus-member="${esc(id)}">${esc(id)}</button>`).join('')}${refs.length?`<button class="text-button" data-junction-pair="${esc([e.id,...refs].join(','))}">Inspect wall and bearing together</button>`:''}${a.timberBelow.length?`<p><strong>Timber beneath this wall is not an approved wall support.</strong> ${a.timberBelow.length} floor members lie below its footprint; resolve the transfer independently.</p>`:''}`;
}
