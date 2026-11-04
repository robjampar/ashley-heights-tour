import {systemMatches} from './structure-systems.js';
// Shared geometry for plans, sections, elevations and exported drawing sheets.
// Metres throughout; no member capacity or construction suitability is inferred.
export const CATEGORIES={beams:{label:'Steel & ridge beams',color:'#83b9d5'},joists:{label:'Floor joists',color:'#dcb781'},rafters:{label:'Roof rafters / joists',color:'#e4ce9f'},trimmers:{label:'Headers & trimmers',color:'#d99865'},studs:{label:'Load-bearing timber · proposed',color:'#c8b085'},partitions:{label:'Non-load-bearing partitions',color:'#83bca1'},'framing-review':{label:'Framing · role unresolved',color:'#e4a7c4'},fascia:{label:'Eaves / fascia backing',color:'#afc3c8'},details:{label:'Connection, blocking & cavity details',color:'#a49b7e'},layers:{label:'Floor build-up allowances',color:'#d1dbe2'},connections:{label:'Hanger reservations',color:'#c5d8e3'},lintels:{label:'Lintel reservations',color:'#b8a0d6'},masonry:{label:'Brick & block leaves',color:'#c78366'},rc:{label:'Concrete envelopes',color:'#adb7be'},concrete:{label:'Basement & foundations',color:'#c595e7'},walls:{label:'Wall envelopes',color:'#81d6e0'},openings:{label:'Opening envelopes',color:'#ffc879'},floors:{label:'Floor zones',color:'#84b8fa'},roof:{label:'Roof zones',color:'#a3dba0'},steel:{label:'Support studies',color:'#ff9388'}};
export const MEMBER_CATEGORIES=['beams','joists','rafters','trimmers','studs','partitions','framing-review','fascia','connections','details','layers','lintels','masonry','rc'];
export const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const centre=e=>e.bounds[0].map((x,i)=>(x+e.bounds[1][i])/2);
export function filteredElements(data,{categories=Object.keys(CATEGORIES),region='house',retained=true,level='all',trialOverlay=false,representation='all',garageRebuild=true,loftUpgrade=true,roofOption='replace',focusSystem=null,scope='all',isolatedIds=null,systemFilters=null}={}){
 return data.elements.filter(e=>(!isolatedIds||isolatedIds.includes(e.id))&&(!systemFilters||systemFilters.some(key=>systemMatches(e,key)))&&(!e.trial||trialOverlay)&&
 (representation==='all'||representation==='envelopes'&&!e.member||representation==='members'&&(e.member||e.retained||e.trial))&&
 (categories.includes(e.category)||(e.masonryDetail&&categories.includes('masonry'))||(representation==='members'&&retained&&e.retained&&(!systemFilters||systemFilters.some(key=>systemMatches(e,key)))))&&
 (e.condition!=='loft-upgrade'||loftUpgrade)&&(e.condition!=='roof-rebuild'||roofOption==='replace')&&(!e.roofContext||roofOption!=='replace')&&
 (!focusSystem||focusSystem!=='roof'||e.retained||e.structuralSystem==='garden-terrace'||['rafters','roof'].includes(e.category)||/^M-(RE\d|RIDGE-|ROOF-B)/.test(e.id))&&
 (!focusSystem||focusSystem!=='floors'||e.retained||(e.structuralSystem!=='garden-terrace'&&(['joists','connections','details','layers'].includes(e.category)||(e.category==='trimmers'&&!/^M-RE\d/.test(e.id))||(e.category==='beams'&&!/^M-(RIDGE-|ROOF-B)/.test(e.id)))))&&
 (e.scope!=='garage-rebuild'||garageRebuild)&&(!e.garageContext||!garageRebuild)&&
 (scope==='all'||e.scope===scope||e.retained)&&
 (region==='all'||e.region===region)&&(retained||!e.retained)&&levelMatches(e,level));
}
export function levelMatches(e,level){
 if(level==='all'||e.level===Number(level))return true;
 // Tall masonry/retained wall fragments may be authored at their lowest level.
 // They still belong in the upper-storey view they physically cross.
 if(!e.masonryDetail&&!['walls','openings','masonry','studs','partitions','framing-review'].includes(e.category))return false;
 const bands={'-1':[-2.8,0],'0':[0,2.8],'1':[2.8,5.55],'3':[5.55,20]};
 const band=bands[String(level)];return !!band&&e.bounds[0][2]<band[1]-.001&&e.bounds[1][2]>band[0]+.001;
}
export function cutTriangles(triangles,axis,at){
 const segments=[],other=[0,1,2].filter(x=>x!==axis),seen=new Set();
 for(let i=0;i<triangles.length;i+=3){
  const t=triangles.slice(i,i+3),hits=[];
  for(let j=0;j<3;j++){const a=t[j],b=t[(j+1)%3],da=a[axis]-at,db=b[axis]-at;
   if(Math.abs(da)<1e-6)hits.push(other.map(k=>a[k]));
   if((da<0&&db>0)||(da>0&&db<0)){const q=da/(da-db);hits.push(other.map(k=>a[k]+q*(b[k]-a[k])));}
  }
  const unique=[...new Map(hits.map(p=>[p.map(x=>x.toFixed(5)).join(','),p])).values()];
  if(unique.length===2&&Math.hypot(unique[0][0]-unique[1][0],unique[0][1]-unique[1][1])>1e-5){const key=unique.map(p=>p.map(x=>x.toFixed(4)).join(',')).sort().join('|');if(!seen.has(key)){seen.add(key);segments.push(unique);}}
 }
 return segments;
}
export function drawingSegments(e,{view='plan',level=0,sectionAt=9.455,focusSystem=null}={}){
 const floor={[-1]:-2.8,0:0,1:2.8,3:5.55}[level]??0;
 if(view==='section'){return e.triangles?cutTriangles(e.triangles,0,sectionAt):[];}
 if(view==='plan'){
  if(e.foundationSubstructure&&[-1,0].includes(Number(level)))return e.planEdges??[];
  if(e.line)return e.level===Number(level)?[e.line.map(p=>p.slice(0,2))]:[];
  if((e.member&&(e.category==='rafters'||e.category==='fascia'||/^M-RE\d/.test(e.id))&&(focusSystem==='roof'||e.level===Number(level)))||(focusSystem==='roof'&&e.category==='roof'))return (e.edges??[]).map(s=>s.map(p=>p.slice(0,2)));
  if(e.member&&['beams','joists','rafters','trimmers','studs','partitions','framing-review','fascia','connections','details','layers','lintels','rc'].includes(e.category)&&e.level===Number(level))return e.planEdges??[];
  if(['floors','openings'].includes(e.category)&&e.level===Number(level))return e.planEdges??[];
  if(e.category==='concrete'&&Number(level)===-1&&e.bounds[1][2]<=-2.79)return e.planEdges??[];
  return cutTriangles(e.triangles??[],2,floor+1.2);
 }
 const u=(view==='front'||view==='rear')?0:1,sign=(view==='rear'||view==='east')?-1:1;
 return (e.line?[e.line]:(e.edges??[])).map(s=>s.map(p=>[sign*p[u],p[2]]));
}
export function makeDrawing(data,options={}){
 options={roofOption:'replace',loftUpgrade:true,...options};
 const {view='plan',level=0,region='house',selected=null,width=1100,height=760,light=false}=options;
 // Plans cut the model at the chosen level, including tall walls crossing it.
 const es=filteredElements(data,{...options,level:view==='plan'||view==='section'?'all':options.level??'all'});
 const groups=es.map(e=>({e,segments:drawingSegments(e,{...options,view,level})})).filter(g=>g.segments.length);
 const pts=groups.flatMap(g=>g.segments.flat());
 const regionBox=region==='workshop'?[-25,20.8,-17,26.5]:[-6,-17,15,14];
 const ext=pts.length?pts.reduce((b,p)=>[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[0]),Math.max(b[3],p[1])],[Infinity,Infinity,-Infinity,-Infinity]):regionBox;
 const margin=46,scale=Math.min((width-margin*2)/Math.max(1,ext[2]-ext[0]),(height-margin*2)/Math.max(1,ext[3]-ext[1]));
 const ox=(width-(ext[2]-ext[0])*scale)/2,oy=(height-(ext[3]-ext[1])*scale)/2;
 const xy=p=>[ox+(p[0]-ext[0])*scale,height-oy-(p[1]-ext[1])*scale];
 const bg=light?'#ffffff':'#0c2138',ink=light?'#163a57':'#bdd9ee';
 const parts=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Structural coordination ${esc(view)}"><rect width="${width}" height="${height}" fill="${bg}"/>`];
 if(!light){for(let x=0;x<width;x+=24)parts.push(`<path d="M${x} 0V${height}" stroke="#19314a" stroke-width=".5"/>`);for(let y=0;y<height;y+=24)parts.push(`<path d="M0 ${y}H${width}" stroke="#19314a" stroke-width=".5"/>`);}
 for(const {e,segments}of groups){
  const color=selected===e.id?(light?'#ba3030':'#ffffff'):e.retained?(light?'#6d7c87':'#738da4'):light?({concrete:'#80549c',walls:'#167782',openings:'#a76a1c',floors:'#426f9f',roof:'#497747',steel:'#bc584a'}[e.category]??'#40596a'):CATEGORIES[e.category].color;
  const path=segments.map(s=>{const a=xy(s[0]),b=xy(s[1]);return `M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${b[0].toFixed(2)} ${b[1].toFixed(2)}`;}).join('');
  parts.push(`<g data-element="${esc(e.id)}" tabindex="0" role="button" aria-label="${esc(e.id+' '+e.name)}"><title>${esc(e.id+' | '+e.name+' | '+e.status)}</title><path d="${path}" fill="none" stroke="${color}" stroke-width="${selected===e.id?2.5:1.1}" ${e.line?'stroke-dasharray="6 4"':''}/><path d="${path}" fill="none" stroke="transparent" stroke-width="8"/></g>`);
 }
 if(view==='plan'&&options.focusSystem!=='roof'&&groups.length)for(const r of data.rooms??[]){
  if(r.floor!==Number(level)||!r.labelPoint)continue;
  const p=r.labelPoint;if((region==='house'&&(p[0]<-6||p[1]>15))||(region==='workshop'&&(p[0]>-15||p[1]<18)))continue;
  const [x,y]=xy(p);if(x<30||x>width-30||y<30||y>height-50)continue;
  const label=r.name.replace(/^New |^Original |^Proposal /,'').slice(0,28);
  parts.push(`<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="9" fill="${ink}" opacity=".65" pointer-events="none">${esc(label)}</text>`);
 }
 if(selected){const e=data.elements.find(e=>e.id===selected);if(groups.some(g=>g.e.id===selected)){parts.push(`<text x="24" y="28" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="${ink}">${esc(e.id+' · '+e.name)}</text>`);}}
 if(view!=='plan'&&view!=='section')for(const f of data.floorLevels){const y=xy([ext[0],f.z])[1];parts.push(`<path d="M24 ${y.toFixed(2)}H${width-24}" stroke="${ink}" opacity=".3" stroke-dasharray="4 4"/><text x="24" y="${(y-5).toFixed(2)}" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${ink}">${esc(f.label)} ${f.z.toFixed(2)} m</text>`);}
 const bx=28,by=height-22;parts.push(`<path d="M${bx} ${by-5}v10m0 -5h${(5*scale).toFixed(2)}m0 -5v10" stroke="${ink}" fill="none"/><text x="${bx}" y="${by-10}" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${ink}">5 m · model geometry</text>`);
 parts.push(`<text x="${width-24}" y="${height-14}" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="10" fill="${ink}">${options.representation==='members'?'M16 · ROOF '+(options.roofOption==='replace'?'B — REBUILD':'A — RETAIN'):'P01'} - COORDINATION ONLY - NOT FOR CONSTRUCTION</text>`);
 parts.push('</svg>');return {svg:parts.join(''),count:groups.length,ids:groups.map(g=>g.e.id),scale};
}
