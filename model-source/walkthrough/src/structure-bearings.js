import {esc} from './structure-geometry.js';

const labels={
 'padstone-envelope':'Padstone + grout shown',
 'steel-seat-envelope':'Steel bearing seat shown',
 'concrete-seat-envelope':'Concrete bearing shown',
 'steel-connection-required':'Steel joint needs design',
 'masonry-bearing-unresolved':'Masonry bearing unresolved',
 'support-unresolved':'Support unresolved',
};
const button=ids=>ids?.length?`<button class="text-button" data-junction-pair="${esc(ids.join(','))}">Inspect this support ↗</button>`:'';
export function bearingEndFacts(e){
 const rows=e.endBearingReview??[];
 const top=e.upperMasonryTransfer;
 const retained=e.assumedRetainedContinuity?[e.assumedRetainedContinuity]:(e.assumedRetainedTransfer??[]);
 const heads=e.supersededOpeningHeads??[];
 return (rows.length?`<h2>Beam-end support review</h2>${rows.map(r=>`<p><strong>End ${r.end} · ${esc(labels[r.kind]??r.kind)}</strong><br>${esc(r.detail)}</p>${button([e.id,...r.supportIds])}`).join('')}`:'')+
  (top?`<h2>Upper masonry bearing</h2><p>${esc(top.basis)}</p><p>Floor loads alone do not size this transfer. Masonry, facade and any roof reactions must also be included.</p>${button([e.id,top.wallId,top.id])}`:'')+
  (retained.length?`<h2>Assumed existing pier continuity</h2><p>The grey pier band connects the aligned walls above and below. Concealed masonry, its condition and capacity have not been surveyed; it is excluded from new-work quantities.</p>${retained.map(r=>`<p>${esc(r.basis)}</p>${button([...new Set([e.id,r.beamId,r.memberId,r.bedId,r.lowerSourceId,r.upperSourceId].filter(Boolean))])}`).join('')}<p>Beam design must include the supported wall loads. Pockets and bearing beds are coordination allowances.</p>`:'')+
  (heads.length?`<h2>Combined opening head</h2>${heads.map(r=>`<p>${esc(r.basis)}</p><p>Replaces ${esc(r.memberId)}. Complete opening and floor loads, flange-width distribution and steel connections remain uncalculated.</p>`).join('')}`:'');
}
export function cavityFacts(e){
 const c=e.cavityClosure;
 const related=e.cavityClosures??[];
 if(c)return `<h2>Cavity termination</h2><p>${(c.cavityWidthM*1000).toFixed(0)} mm cavity, with a ${(c.nominalDepthM*1000).toFixed(0)} mm closure envelope. Insulation and moisture-resistant profile are separate selectable parts.</p><p>Product, seals, fixing and fire performance remain unselected. This detail carries no beam or masonry load.</p>${button([e.id,...(e.relatedMemberIds??[]),...c.penetrationMemberIds])}`;
 return related.length?`<h2>Cavity termination</h2>${related.map(r=>`<p>${esc(r.name)} · ${(r.cavityWidthM*1000).toFixed(0)} mm cavity.</p>${button([e.id,...r.detailIds])}`).join('')}`:'';
}
export function bearingReviewMarkup(members,state={}){
 const audit=members.beamEndBearings;if(!audit)return '';
 const by=new Map(members.elements.map(e=>[e.id,e]));
 const rows=audit.ends.filter(r=>{const e=by.get(r.beamId);return e&&
  (state.region==='all'||!state.region||e.region===state.region)&&
  (e.condition!=='roof-rebuild'||state.roofOption!=='retain')&&
  (e.scope!=='garage-rebuild'||state.garageRebuild!==false);});
 return `<article class="trial-card"><h2>Beam bearings and padstones</h2><p>${esc(audit.scope)}</p><details><summary>Review ${rows.length} beam ends</summary><div class="table-scroll"><table><thead><tr><th>Beam / end</th><th>Support detail</th><th>Review</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.beamId)} · end ${r.end}<br>${esc(r.beamName)}</td><td><strong>${esc(labels[r.kind]??r.kind)}</strong><br>${esc(r.detail)}</td><td>${button([r.beamId,...r.supportIds])}</td></tr>`).join('')}</tbody></table></div></details></article>`;
}
