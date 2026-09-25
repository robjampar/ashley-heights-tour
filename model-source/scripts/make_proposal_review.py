"""Local matched-camera review; native render files are displayed unchanged."""
from pathlib import Path
import json, os

ROOT=Path(__file__).resolve().parents[1]
revision=os.environ.get('PROPOSAL_REVIEW_RENDER_REV','P5-release')
camera_data=json.loads((ROOT/'output-proposed/review-cameras.json').read_text())
descriptions={
 'front-gates':('From the gates','The new entrance faces the existing gates. The old central entrance is absorbed into the attached link; the courtyard stays open to the west.'),
 'front-court':('Entrance court','The vaulted glazed entrance sits beside the new garage. The fountain and its planted island are removed.'),
 'front-context':('Driveway and front wing','Four outside spaces and two in the new double garage. The old garage becomes a two-storey side wing, with its forecourt retained as parking.'),
 'aerial-southwest':('Whole plot · front','The open internal garden reduces the front-wing comparison area to 154.1 m². The original house and gate positions are unchanged.'),
 'aerial-northeast':('Whole plot · rear','The western garden strip is retained. The shed expands west into the pavilion and the pool lies directly in front of it.'),
 'rear-pool':('Pool towards the house','An 8 × 3.5 m pool and expanded pavilion share the garden with the new rear living room. The original rear bay, balcony and masonry remain.'),
 'rear-house':('Garden towards the house','The rear dormer converts the original roof space. The glazed garden living addition connects through the existing rear openings.'),
 'courtyard':('Open courtyard','The west-open court brings daylight to the original rooms and the glazed connection. It is kept clear of parking.'),
 'outside-gates':('Outside the gates','The tour starts at this position outside the retained gates. The proposed entrance faces towards this approach.'),
 'family-room-courtyard':('Family room towards courtyard','The original family room becomes a four-seat cinema; its front bay stays in place. The new west-open courtyard sits beyond the existing window.'),
 'bedroom4-courtyard':('Bedroom 4 towards courtyard','The existing bedroom and its window remain in their original positions. This view shows the new wing beyond, from inside the retained room.'),
 'existing-landing-link':('Existing landing into new wing','The old arched front window and central front wall are removed only in the proposal. The existing landing connects directly to the new wing.'),
 'old-hall-connection':('Existing hall into new entrance','The old porch and front door give way to the attached entrance passage. The original hall and staircase retain their positions.'),
 'dining-to-garden-addition':('Dining room towards garden addition','The new glazed connection meets the existing dining bay opening. Its original rear masonry and door geometry are retained.'),
 'old-kitchen-garden-addition':('Existing kitchen towards garden room','The kitchen rear window stays in place and now overlooks the glazed garden room. Walking access uses the converted garage side wing and dining openings.'),
}
views=[]
for camera in camera_data:
 key=camera['id']
 if key not in descriptions:continue
 original=ROOT/'output-proposed/renders/P4-original-comparison'/f'{key}.png'
 proposed=ROOT/'output-proposed/renders'/revision/f'{key}.png'
 if original.exists() and proposed.exists():
  label,note=descriptions[key]
  views.append({**camera,'label':label,'note':note.replace('An8','An 8'),'original':'../'+str(original.relative_to(ROOT)),'proposed':'../'+str(proposed.relative_to(ROOT))})
assert views,'No matched render pairs'
interior_names={'entrance-gallery':'Entrance gallery','new-stair-first':'Open upper gallery','new-loft-landing':'Loft connection','original-loft-stair':'Original house · new loft stair','original-dormer':'Rear dormer room','rear-living':'Garden living room','pavilion-pool':'Expanded pavilion','principal-suite':'Principal bedroom','principal-bathroom':'Principal bathroom','new-loft-studio':'New loft studio','library-landing':'Library and landing','new-study':'Reading alcove','garage-workshop':'Garage workshop','cinema':'Four-seat cinema','gym':'Gym in former garage','wine-room':'Underground wine cellar','side-bedroom':'New side bedroom','side-hall':'Shared side landing','internal-garden':'Internal garden outside retained bay','garden-connection':'Glazed connection','roof-connection':'Unified pitched roof join'}
interiors=''.join(f'<a href="../output-proposed/renders/{revision}/{key}.png"><img loading="lazy" src="../output-proposed/renders/{revision}/{key}.png" alt="Native proposed model: {label}"><span>{label}</span></a>'for key,label in interior_names.items()if(ROOT/'output-proposed/renders'/revision/f'{key}.png').exists())
elevation_names={key+'-elevation':key.capitalize()+' elevation' for key in ('west','east','south','north')}
elevations=''.join(f'<a href="../output-proposed/renders/{revision}/{key}.png"><img loading="lazy" src="../output-proposed/renders/{revision}/{key}.png" alt="{label}, trees, hedges and cars omitted"><span>{label}</span></a>'for key,label in elevation_names.items()if(ROOT/'output-proposed/renders'/revision/f'{key}.png').exists())
elevations=('<h2>Building elevations</h2><p>Orthographic views of the model. Trees, hedges and cars are omitted so the building proportions are visible.</p><div class="grid">'+elevations+'</div>')if elevations else''
night_revision=os.environ.get('PROPOSAL_NIGHT_RENDER_REV','P5-release-evening')
evening=''.join(f'<a href="../output-proposed/renders/{night_revision}/{key}.png"><img loading="lazy" src="../output-proposed/renders/{night_revision}/{key}.png" alt="Native proposed model at twilight: {label}"><span>{label} · evening</span></a>'for key,label in [('front-gates','Arrival'),('rear-pool','Pool and rear elevation'),('pavilion-pool','Pavilion')]if(ROOT/'output-proposed/renders'/night_revision/f'{key}.png').exists())
evening=('<h2>Evening lighting</h2><p>The same model with its fixtures lit at twilight. The browser walkthrough uses daytime lighting.</p><div class="grid">'+evening+'</div>')if evening else''
reference_pairs=[
 ('Front arrival','front-inspiration.png','front-gates','The entrance turns towards the existing gates. Pale render, timber, dark frames and a glazed pitched gable carry the reference design into the fixed plot; the original house joins behind it.'),
 ('Rear garden','rear-inspiration.jpeg','rear-pool','The original brick rear, bay and balcony remain. The dormer and garden living addition join that house; the pool sits directly in front of the expanded shed. The reconstructed garden levels are retained.'),
]
references=''.join(f'<section class="reference"><h3>{title}</h3><div class="reference-pair"><a href="reference/{photo}"><img loading="lazy" src="reference/{photo}" alt="Your supplied {title.lower()} inspiration"><span>Your inspiration</span></a><a href="../output-proposed/renders/{revision}/{key}.png"><img loading="lazy" src="../output-proposed/renders/{revision}/{key}.png" alt="Proposed model of {title.lower()} on the existing plot"><span>Proposed geometry on the existing plot</span></a></div><p>{note}</p></section>' for title,photo,key,note in reference_pairs)
template='''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ashley Heights · original and proposed</title>
<style>
:root{font-family:system-ui,-apple-system,sans-serif;color:#21483e;background:#f6f5ee}*{box-sizing:border-box}body{margin:0}main{max-width:1440px;margin:auto;padding:30px}header{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:22px}h1{font-size:clamp(24px,3vw,38px);margin:0 0 8px;font-weight:650;letter-spacing:-.025em}h2{font-size:24px;margin-top:44px}p{line-height:1.55;margin:8px 0;color:#53655c}a{color:#1d6c59}header a{white-space:nowrap}button,select{font:inherit;min-height:44px;padding:10px 15px;border:1px solid #c6d0c7;border-radius:8px;background:white;color:#21483e}button{cursor:pointer}button:hover,button:focus-visible{background:#dce9e1}select{max-width:100%;min-width:250px}label{font-size:14px}nav{display:flex;gap:16px;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap}.stage{position:relative;aspect-ratio:1440/965;background:#e1e4dc;overflow:hidden;border-radius:10px}.stage img{position:absolute;width:100%;height:100%;object-fit:contain}.proposal{clip-path:inset(0 50% 0 0)}.divider{position:absolute;left:50%;top:0;bottom:0;width:3px;background:white;pointer-events:none;box-shadow:0 0 3px #0009}.tag{position:absolute;top:14px;padding:6px 10px;background:#ffffffed;border-radius:5px;font-size:13px}.left{left:14px}.right{right:14px}.controls{display:flex;gap:16px;align-items:center;flex-wrap:wrap;padding:16px 0}.range{display:flex;align-items:center;gap:12px;flex:1;min-width:230px}input[type=range]{width:100%;min-height:44px;accent-color:#256650}input[type=checkbox]{width:20px;height:20px;vertical-align:middle;margin:0 5px 0 0}.buttons{display:flex;gap:8px}.note{font-size:17px;color:#244d40;max-width:1050px}.technical{font-size:12px;color:#6e7c73}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.grid a{text-decoration:none;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px #173b3215}.grid img{width:100%;display:block}.grid span{display:block;padding:12px;font-size:14px}.links{display:flex;gap:12px;flex-wrap:wrap}.links a{padding:10px 13px;background:#e5ece3;border-radius:7px;min-height:44px}.footnote{font-size:13px;margin-top:36px;max-width:1050px}button:focus-visible,a:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid #a57438;outline-offset:3px}@media(max-width:700px){main{padding:16px}header{display:block}header a{display:inline-block;margin-top:8px}.grid{grid-template-columns:1fr 1fr}.range{flex-basis:100%}.buttons{width:100%}.buttons button{flex:1}}@media print{header a,.controls,nav,.grid{display:none}main{padding:0}.stage{height:auto;aspect-ratio:auto;display:flex;gap:10px}.stage img{position:static;width:49%;height:auto}.proposal{clip-path:none!important;opacity:1!important}.divider,.tag{display:none}h2{break-before:avoid}.footnote{font-size:10px}}
</style>
<main><header><div><h1>Ashley Heights</h1><p>Original house and proposed extensions · matched model renders</p></div><a href="https://robjampar.github.io/ashley-heights-tour/model/?design=proposed">Open proposed walkthrough ↗</a></header>
<nav><label>View <select id="view"></select></label><span class="technical">Same camera, lens and lighting in each pair</span></nav>
<div class="stage"><img id="original" alt="Original reconstructed house"><img id="proposed" class="proposal" alt="Proposed extension design"><div class="divider" aria-hidden="true"></div><span class="tag left">Proposal</span><span class="tag right">Original</span></div>
<div class="controls"><div class="range"><label for="reveal">Proposal</label><input id="reveal" type="range" min="0" max="100" value="50" aria-valuetext="50 percent proposal revealed"></div><div class="buttons"><button data-value="0">Original</button><button data-value="50">Split</button><button data-value="100">Proposal</button></div><label><input id="overlay" type="checkbox"> Overlay</label></div>
<p id="note" class="note"></p><p id="camera" class="technical"></p>
<h2>Inside the proposal</h2><div class="grid">INTERIOR_CONTENT</div>
EVENING_CONTENT
ELEVATION_CONTENT
<h2>Adapting your references</h2><p>These pairs explain the design direction. Unlike the comparisons above, they use different designs and camera positions, so they are not alignment overlays.</p>REFERENCE_CONTENT
<h2>Plans and editing</h2><div class="links"><a href="Ashley Heights - Proposed Design Review.pdf">Complete design review PDF</a><a href="P5_site-parking-garden-presentation.pdf">Site and parking plan</a><a href="P5_whole-house-floorplans.pdf">Detailed floor plans</a><a href="P5_sections.pdf">Roof and stair sections</a><a href="P4_chimney_options.pdf">Earlier chimney options (unresolved)</a><a href="START-HERE.md">Opening and editing guide</a></div>
<p class="footnote">These are renders of the editable geometry, not photographs or image-generated designs. The existing house, shed and plot are fixed to the reconstruction. Room heights, roof construction and unmeasured details remain estimates; this is a design concept. The original file is preserved independently.</p>
</main><script>
const views=VIEW_DATA,choose=document.getElementById('view'),range=document.getElementById('reveal'),overlay=document.getElementById('overlay'),proposal=document.getElementById('proposed'),original=document.getElementById('original'),line=document.querySelector('.divider');
views.forEach((v,i)=>choose.add(new Option(v.label,String(i))));
function reveal(){const n=Number(range.value);proposal.style.clipPath=overlay.checked?'none':`inset(0 ${100-n}% 0 0)`;proposal.style.opacity=overlay.checked?n/100:1;line.style.left=n+'%';line.hidden=overlay.checked||n===0||n===100;document.querySelector('.left').hidden=n===0;document.querySelector('.right').hidden=n===100;range.setAttribute('aria-valuetext',n+' percent proposal '+(overlay.checked?'opacity':'revealed'));}
function view(){const v=views[Number(choose.value)];original.src=v.original;proposal.src=v.proposed;original.alt=v.label+' — original reconstructed house';proposal.alt=v.label+' — proposed design';document.getElementById('note').textContent=v.note;document.getElementById('camera').textContent='Camera '+v.position.map(n=>n.toFixed(2)).join(', ')+' m · horizontal field of view '+v.fov+'°';}
choose.addEventListener('change',view);range.addEventListener('input',reveal);overlay.addEventListener('change',reveal);document.querySelectorAll('[data-value]').forEach(b=>b.addEventListener('click',()=>{range.value=b.dataset.value;reveal();}));view();reveal();
</script></html>'''
output=ROOT/'proposal/P5-render-review.html'
template=template.replace('</style>','.reference h3{font-size:19px;margin:24px 0 12px}.reference-pair{display:grid;grid-template-columns:1fr 1fr;gap:18px}.reference-pair a{background:white;text-decoration:none;border-radius:8px;overflow:hidden}.reference-pair img{width:100%;aspect-ratio:1.5;object-fit:contain;background:#e4e5de;display:block}.reference-pair span{display:block;padding:12px;font-size:14px}.reference p{max-width:1000px}@media(max-width:600px){.reference-pair{grid-template-columns:1fr}}@media print{.reference{break-inside:avoid}}\n</style>')
output.write_text(template.replace('INTERIOR_CONTENT',interiors).replace('EVENING_CONTENT',evening).replace('ELEVATION_CONTENT',elevations).replace('REFERENCE_CONTENT',references).replace('VIEW_DATA',json.dumps(views)))
print(f'{output}: {len(views)} matched pairs, {len(interior_names)} interior/exterior details')
