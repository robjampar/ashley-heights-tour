"""Owner-reviewed spatial edition: photos, room atlas, elevations and context."""
from pathlib import Path
from collections import OrderedDict
from copy import deepcopy
from html import escape
import json,shutil,zipfile
from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.utils import ImageReader
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPDF
import build_house_brochure_expanded as base
from house_brochure_content import PAGES as PREVIOUS,IMAGE_LABELS as PREVIOUS_LABELS

ROOT=base.ROOT;EDITION=ROOT/'revisions/brochure-spatial-2026-09-28'
CACHE=EDITION/'jpeg';PDF=base.PDF;WEB=base.WEB;DIST=base.DIST
W,H,M=base.W,base.H,base.M
INK,MUTED,PAPER,OAK,WHITE=base.INK,base.MUTED,base.PAPER,base.OAK,base.WHITE
RECORDS=json.loads((EDITION/'image-prompts.json').read_text())
AREAS=json.loads((EDITION/'plans/manifest.json').read_text())
VIEWS=json.loads((EDITION/'context/camera-manifest.json').read_text())
DECOR={r['replace']:r for r in RECORDS if r['status']=='selected' and r.get('replace') and r.get('kind')=='decor-study'}
LABELS=dict(PREVIOUS_LABELS)
LABELS.update({'arrival':'The front door and double-height gable','arrival-gallery':'The glazed link towards the original hall'})
EXTERIOR_COPY={
 'street-approach':('Approach along Ashley Close','The house appears beyond the front wall and timber gate. The neighbour on the left and the turning head explain how the entrance is approached from the road.'),
 'turning-head':('At the main gate','The entrance gable, garage and upper wing read together from the end of the close. Mature planting partly screens the front, as it does in the reconstructed model.'),
 'outward-street':('The view out along the close','Looking away from the house places the front boundary in its everyday street setting. Neighbouring gardens, trees and access points establish the outward view.'),
 'west-exterior':('Across the entrance courtyard','An elevated view connects the original house, glazed entrance link, gable and double garage. The courtyard tree remains part of the composition.'),
 'east-exterior':('The east side and roof connection','The principal wing, tiled dormer and tall glazed link can be read together. Boundary planting filters the lower elevations and creates a green edge.'),
 'rear-exterior':('The house from the garden','The arched bay, existing balcony and new garden room form a layered rear elevation. Above them, the roof terrace and long tiled dormer define the upper levels.'),
 'aerial-neighbourhood':('The house within Ashley Close','The wider aerial places the proposal between the close and the neighbouring apartment buildings. It is a reconstructed context view, with estimated detail beyond the plot.'),
 'aerial-plot':('The complete plot from above','The entrance court, garage, original house and garden read as one sequence. The rear strip leads west to the workshop; the pool and garden buildings occupy the opposite end.'),
 'aerial-rear':('From the pool garden towards the road','This reverse aerial shows how the garden room and roof terrace meet the original house. The front wing and entrance court sit beyond the main roof.'),
 'upper-outlook':('An upper-level neighbourhood outlook','This model viewpoint looks from the front wing towards the neighbouring house through established planting. It helps assess the character of the outlook, rather than suggesting an unobstructed landscape view.'),
}
ELEVATIONS={
 'W':('Entrance courtyard elevation','The projecting original side wing frames the recessed glazed link. The photographic study uses a slight angle to reveal the courtyard depth; the following scaled drawing is square-on.'),
 'S':('South-facing elevation','The southern projection shows the front wing against the original roof volumes. The entrance itself faces into the courtyard to the west.'),
 'E':('East-facing elevation','The tiled dormer, glazed connection and original-house flank are shown without perspective. Read this alongside the east-side photograph.'),
 'N':('Rear garden elevation','The long dormer, balcony, garden-room glazing and roof terrace establish the relationship between the original house and garden.'),
}

def editorial_pages():
 old=deepcopy(PREVIOUS)
 for p in old:
  if p.get('images') and any(k in DECOR for k in p['images']):p['decor']=True
 edits={
  20:('A darker room with a warmer centre.','Burgundy velvet gives the existing four-seat cinema a distinct identity. Charcoal acoustic fabric and bronze trim keep the attention on the screen; low-level lighting supports the evening setting.'),
  21:('Oak, limestone and warm light, connected to the games room.','The revised bar uses light oak fluting, ivory stool upholstery and a clearer bronze mirror. Lit shelves organise glasses and bottles while the counter, serving aisle and three seats retain their current positions.'),
  22:('A more considered games room, with a clear playing centre.','Oak wall panelling, stronger artwork and layered lighting give the pool-table room more character. The table and activity zones remain in their current places; shallow wall details keep the floor available for play.'),
  27:('A quiet guest room with soft sage textiles.','Sage upholstery and an olive-toned throw give the guest bedroom a gentle identity. The oak bed wall, pale carpet and ivory linen keep it connected to the rest of the house.'),
  29:('The original oak and ivory bedroom, with a small textile variation.','The oak bed wall and ivory upholstered headboard are retained. A softly blue-grey throw gives this room a small change of tone without replacing the joinery or altering the furniture arrangement.'),
  30:('Clay and flax textiles within the same warm material family.','Muted cinnamon upholstery and a clay-toned throw distinguish this bedroom. The light walls, oak joinery and bronze reading lights retain the simple modern character.'),
  31:('A compact bedroom with a softer plum accent.','Muted plum upholstery, ivory bedding and mushroom-toned storage give this room its own quiet mood. Furniture positions and the ensuite relationship remain those of the current model.'),
 }
 for number,(subtitle,copy) in edits.items():
  p=old[number-1];p['subtitle']=subtitle
  p['sections'][1]=('Decoration for review',copy)
  p['facts']=[f for f in p['facts'] if not any(s in f.lower() for s in ('ivory upholstery','oak and limestone dry bar'))]
 old[48]['title']='One family of materials'
 old[7].update(kind='arrival_pair',images=['arrival','arrival-gallery'],subtitle='The entrance as a sequence: tall daylight at the door, then a glazed route into the house.')
 old[7]['sections']=[('The entrance threshold','The oak front doors sit beneath the full-height gable window. The photograph shows the doorway and its upper glazing together.'),('The connection to the house','The glazed link carries daylight along the route towards the original hall and stair. Shallow corner storage keeps the arrival space clear.')]
 pages=[];starts={};ends={}
 for i,p in enumerate(old,1):
  starts[i]=len(pages)+1;p['oldPage']=i;pages.append(p)
  if i==3:
   pages.extend([
    dict(kind='site',chapter='Exteriors & context',title='The plot as a whole',subtitle='The original house, front wing, garden and detached workshop in one plan.',drawing='site-plan',images=[]),
    dict(kind='context',chapter='Exteriors & context',title='The house in its neighbourhood',subtitle='A guide to the eight additional viewpoints and the surrounding buildings.',drawing='neighbourhood-plan',images=[]),
   ])
   for key,(title,copy) in ELEVATIONS.items():
    imagekey=f'elevation-{key}-photo';LABELS[imagekey]=title+' / photographic study'
    pages.append(dict(kind='elevation_photo',chapter='Exteriors & context',title=title,subtitle='Architectural photographic study / Proposed in brick',view=key,copy=copy,images=[imagekey]))
    pages.append(dict(kind='elevation',chapter='Exteriors & context',title=title+' / drawing',subtitle='Architectural elevation / 1:200 at A4 / Proposed in brick',view=key,copy=copy,images=[]))
   for number,(key,v) in enumerate(VIEWS.items(),1):
    title,copy=EXTERIOR_COPY[key];imagekey=key+'-photo';LABELS[imagekey]=title
    pages.append(dict(kind='exterior',chapter='Exteriors & context',title=title,subtitle=f'View {number:02} / '+('Aerial study' if 'aerial' in key else 'Model-based exterior study'),images=[imagekey],copy=copy,view=key,viewNumber=number))
  for a in AREAS:
   if a['after']==i:pages.append(dict(kind='spatial',chapter=p['chapter'],title=a['title'],subtitle='How the space works / Current-model plan and room breakdown',area=a,images=[]))
  ends[i]=len(pages)
 return pages,starts,ends

PAGES,STARTS,ENDS=editorial_pages();PAGE_COUNT=len(PAGES)
IMAGE_COUNT=len({key for p in PAGES if p['kind'] in ('room','exterior','elevation_photo','arrival_pair') for key in p['images']})

def assets():
 selected=base.image_assets()
 for r in RECORDS:
  if r['status']!='selected':continue
  selected[r.get('replace',r['key'])]=ROOT/r['savedPath']
 CACHE.mkdir(exist_ok=True)
 for key,path in selected.items():
  target=CACHE/(key+'.jpg')
  if not target.exists() or target.stat().st_mtime<path.stat().st_mtime:
   with Image.open(path) as im:im.convert('RGB').save(target,quality=96,subsampling=0,optimize=True)
 return selected

class SpatialBrochure(base.Brochure):
 def __init__(self):
  super().__init__();self.c.setSubject(f'{PAGE_COUNT}-page local owner review. {IMAGE_COUNT} views, 31 floorplans, four elevation drawings and two site/context plans.')

 def svg(self,path,x,y,w,h):
  d=svg2rlg(str(path));scale=min(w/d.width,h/d.height)
  self.c.saveState();self.c.translate(x+(w-d.width*scale)/2,y+(h-d.height*scale)/2);self.c.scale(scale,scale);renderPDF.draw(d,self.c,0,0);self.c.restoreState()

 def base(self,item):
  self.rect(0,0,W,H,PAPER);self.text('ASHLEY HEIGHTS',M,H-26,8,'Bold');self.text(item['chapter'].upper(),565,H-26,8,colour=MUTED)
  fs=min(28,(W-2*M)*28/pdfmetrics.stringWidth(item['title'],'Serif',28));self.text(item['title'],M,H-66,fs,'Serif')
  if item.get('subtitle'):self.para(item['subtitle'],M,H-81,W-2*M,9.3,floor=485)
  self.c.setStrokeColor(OAK);self.c.setLineWidth(.4);self.c.line(M,32,W-M,32)
  self.text('PROPOSED / BRICK  |  LOCAL OWNER REVIEW  |  28 SEPTEMBER 2026',M,18,6.8,colour=MUTED)
  self.text(f'{self.page:02} / {PAGE_COUNT:02}',W-M-38,18,7,colour=MUTED)

 def cover(self,item):
  self.rect(0,0,W,H,INK);self.photo('front-brick',0,125,W,H-125,'cover')
  self.text('A S H L E Y   H E I G H T S',M,84,28,'Serif',PAPER);self.text('A considered home',M,53,19,'Serif',PAPER)
  self.text('PROPOSED IN BRICK / ROOMS, PLANS AND THE WIDER SETTING',M,25,8,colour=HexColor('#D4DACF'))
  self.text('LOCAL REVIEW',W-M-115,83,8,'Bold',PAPER);self.text(f'{PAGE_COUNT} PAGES / {IMAGE_COUNT} VIEWS',W-M-115,63,7.5,colour=HexColor('#D4DACF'));self.text('SEPTEMBER 2026',W-M-115,44,7.5,colour=HexColor('#D4DACF'))

 def contents(self,item):
  self.base(item)
  self.para('A full tour of Proposed in brick: its rooms, the space around the furniture, the four elevations and its place within Ashley Close.',M,486,474,13,INK,19)
  chapters=[('The house and its setting','Exteriors, neighbours, aerials and whole-floor plans',3,7),('Arrival and living','Entrance, kitchen, formal rooms and office',8,16),('Practical rooms and leisure','Gym, utility, garage, cinema, bar and games',17,22),('The principal suite','Bedroom, sitting room, study, wardrobe and bath',23,26),('Bedrooms and bathrooms','Guest and family rooms, ensuites and shared bath',27,36),('Landings and lofts','Reading corners, loft suite and hobby room',37,42),('Terrace and garden','Roof terrace, pool, garden buildings and workshop',43,48),('Materials and review','The shared palette and remaining design decisions',49,50)]
  y=389
  for title,detail,start,end in chapters:
   page,last=STARTS[start],ENDS[end];self.text(title,M,y,14.5,'Serif');self.text(detail,M,y-16,8.4,colour=MUTED);self.text(f'{page:02}-{last:02}',493,y,10)
   self.c.linkRect('',f'p{page:02}',(M,y-23,540,y+13),relative=0,thickness=0);y-=42
  self.rect(580,125,228,357,HexColor('#EAE8DE'));self.text('READ THE HOUSE AT THREE SCALES',596,457,7.4,'Bold')
  y=432
  for title,copy in [('The whole plot','Eight more exterior views, two setting plans and four elevations place the house among its neighbours.'),('Every room group','27 companion plans show furniture, door swings, overall spans and numbered activity zones.'),('The finish and feeling','Warm oak, limestone and ivory connect the home. Selected bedroom and leisure accents give individual rooms their own mood.')]:
   y=self.para(title,597,y,194,14,INK,17,'Serif')-8;y=self.para(copy,597,y,194,9.2,leading=13)-19
  self.para('The photographs explore atmosphere. Plans show model geometry. Revised decoration is labelled separately and remains for local review.',597,108,195,8.3,leading=12,floor=50)

 def room(self,item):
  self.active_decor=item.get('decor',False);super().room(item);self.active_decor=False

 def arrival_pair(self,item):
  self.base(item)
  self.photo('arrival',M,83,302,403)
  self.photo('arrival-gallery',358,244,W-M-358,242)
  self.text('FROM THE FRONT DOOR TO THE ORIGINAL HALL',358,224,7.5,'Bold')
  self.para('The tall gable window gives the entrance its height and light. Beyond it, the glazed link makes the route into the house clear.',358,206,W-M-358,10.5,INK,15)
  self.para('Shallow 320 mm corner storage and a shoe bench keep everyday essentials close without narrowing the entrance. See the companion plan for the complete arrival layout.',358,150,W-M-358,9.3,leading=13)
  self.para('Model-based photographic studies. Materials, planting and light are illustrative; the companion drawing shows current model geometry.',M,60,W-2*M,7.5,leading=10.5,floor=35)

 def elevation_photo(self,item):
  self.base(item);self.photo(item['images'][0],M,141,W-2*M,344)
  self.para(item['copy'],M,119,475,10.3,INK,14.5)
  self.para('Read with the drawing on the next page.',566,119,235,9.5,INK,13)
  self.c.linkRect('',f'p{self.page+1:02}',(566,101,W-M,123),relative=0,thickness=0)
  self.para('AI photographic visualisation from the model elevation. Materials, reflections, light and surrounding ground are illustrative. The reference drawing controls geometry.',M,65,W-2*M,7.6,leading=10.7,floor=35)

 def image_label(self,x,y,width):
  copy='Decor refinement for review. Current room layout; the new finishes have not yet been applied to the model.' if getattr(self,'active_decor',False) else 'Model-based, AI-enhanced presentation image. Materials, planting and light are illustrative.'
  self.para(copy,x,y,width,6.6,leading=9,floor=35)

 def spatial(self,item):
  self.base(item);a=item['area'];x=570;ww=W-M-x
  self.rect(M,116,512,366,WHITE);self.svg(EDITION/'plans'/(a['key']+'.svg'),M,116,512,366)
  self.text('MODEL ZONE',x,474,7.2,'Bold');self.text(f"{a['spanM'][0]:.2f} x {a['spanM'][1]:.2f} m",x,449,21,'Serif')
  y=self.para(f"Overall spans / approximately {a['areaM2']:.1f} m² of mapped zones",x,432,ww,8.2,leading=11.5)-16
  for marker in a['markers']:
   y=self.para(f"{marker['number']:02}  {marker['label']}",x,y,ww,12,INK,15,'Bold')-5
   y=self.para(marker['description'],x,y,ww,9.3,leading=13)-13
  y=self.para('MOVEMENT',x,y,ww,7.2,INK,10,'Bold')-6
  y=self.para(a['movement'],x,y,ww,9.2,leading=13)-13
  self.para(a['check'],x,y,ww,8.4,leading=12,floor=54)
  self.svg(EDITION/'plans'/(a['key']+'-locator.svg'),M,45,118,66)
  self.para('LOCATION ON THIS LEVEL',160,105,370,7,INK,10,'Bold')
  self.para('Dark walls / pale blue glazing / oak furniture / numbered activity zones. Furniture footprints do not include every occupied-use clearance.',160,90,375,7.8,leading=10.5,floor=55)
  self.para('Approximate model geometry; spans are bounding extents, not survey dimensions. Use the scale bar; roof slopes reduce usable loft space.',160,61,375,6.8,leading=9.2,floor=35)

 def elevation(self,item):
  self.rect(0,0,W,H,WHITE)
  self.svg(EDITION/'elevations'/(item['view']+'.svg'),0,0,W,H)

 def exterior(self,item):
  self.base(item);self.photo(item['images'][0],M,90,603,402)
  self.para(item['copy'],661,476,146,10,INK,14.5)
  v=VIEWS[item['view']]
  self.para('VIEWPOINT',661,285,146,7.2,INK,10,'Bold');self.para(f"View {item['viewNumber']:02} on the neighbourhood plan. Camera height approximately {v['position'][2]:.1f} m above model datum.",661,267,146,8.5,leading=12)
  self.para('AI-enhanced view of the Proposed model in reconstructed context. Neighbour heights and details include estimates; planting and light are illustrative.',M,72,603,7.8,leading=10.8,floor=39)

 def site(self,item):
  self.base(item);self.rect(M,46,518,445,WHITE);self.svg(EDITION/'context/site-plan.svg',M,46,518,445)
  x=575;w=231;y=478
  for title,copy in [('Arrive from the close','The angled front boundary and main gate lead into the forecourt. Four outdoor parking positions complement the double garage.'),('Live towards the garden','The entrance link connects the front wing to the original house. Kitchen and garden dining occupy the north side, with the terrace above.'),('Use the whole plot','The pool, spa and pavilion sit at the garden end. A narrow rear strip extends west to the workshop; the retained summer house, WC and stores support outdoor life.')]:
   y=self.para(title,x,y,w,16,INK,19,'Serif')-8;y=self.para(copy,x,y,w,9.8,leading=14)-24
  self.para('Registered site outline and current model zones. This is a spatial guide, not a legal boundary or land-survey plan.',x,102,w,8.3,leading=12)

 def context(self,item):
  self.base(item);self.rect(M,46,518,445,WHITE);self.svg(EDITION/'context/neighbourhood-plan.svg',M,46,518,445)
  x=575;w=231;y=479
  self.text('VIEW GUIDE',x,y,8,'Bold');y-=21
  for i,(key,v) in enumerate(VIEWS.items(),1):
   y=self.para(f'{i:02}  {EXTERIOR_COPY[key][0]}',x,y,w,9.5,INK,13)-7
  y-=6;self.para('Context uses the existing registered footprints and neighbouring-building studies. Several heights, facade details and vegetation dimensions remain estimates.',x,y,w,8.5,leading=12)
  self.para('Approximate north is shown. Camera arrows indicate viewing direction, including elevated aerial positions.',x,86,w,7.8,leading=11,floor=44)

 def palette(self,item):
  self.base(item);self.para('Pale oak, limestone and ivory remain the foundation. Variation comes mainly from texture, furniture detail and selected soft accents.',M,508,W-2*M,9.5)
  cards=[('kitchen-sink','The shared foundation','Honed limestone, pale oak and bronze connect kitchens, bathrooms and fitted joinery.'),('formal-lounge-final','Light living rooms','The formal lounge keeps ivory sofas and its earlier neutral rug. The accepted kitchen and principal suite remain the reference.'),('bedroom2','Small shifts of tone','Bedroom 2 retains its oak wall and ivory headboard. Only its throw changes; other selected bedrooms use sage, clay and soft plum textiles.'),('wine-bar','A warmer leisure setting','The bar returns to ivory, oak and stone. Games and cinema use richer finishes where their evening purpose supports them.')]
  width=(W-2*M-30)/4
  for i,(key,title,copy) in enumerate(cards):
   x=M+i*(width+10);self.photo(key,x,273,width,204,'cover');self.para(title,x,252,width,16,INK,19,'Serif');self.para(copy,x,221,width,9.4,leading=13.5)
  self.c.setStrokeColor(OAK);self.c.line(M,121,W-M,121);self.text('A room, not a colour theme',M,96,18,'Serif')
  self.para('Keep the house coherent through material quality and proportion. Give each room a useful furniture arrangement, then add restraint in texture, art and lighting. Revised decoration images remain separate from the current-model drawings.',290,105,W-M-290,9.4,leading=13.5)
  self.para('DECORATION REVIEW / The approved direction retains the lighter formal lounge and original Bedroom 2 headwall. Rejected strong-colour studies are excluded.',M,47,W-2*M,7,leading=9.5,floor=35)

 def review(self,item):
  self.base(item);self.para('This expanded edition pairs the atmosphere of each area with the model geometry and the wider setting of the house.',M,501,710,12.5,INK,18)
  columns=[('What is shown',[
   (f'{IMAGE_COUNT} presentation views','Model-based AI visualisations explore the finished atmosphere. Four photographic elevations sit beside their reference drawings; street views, outlooks and aerials explain the wider setting.'),
   ('Plans and elevations','Four whole-floor plans and 27 room-group plans show current geometry. Four orthographic elevations and two site/context plans explain the wider composition. Areas and spans are approximate model values.'),
   ('Decoration and context','Selected bedroom and leisure images refine finishes beyond the current model. Neighbour context uses registered footprints with estimated heights and details. The formal lounge and Bedroom 2 headwall retain their earlier direction.')]),
   ('Decisions to carry forward',[
   ('Loft connection','The bridge still has approximately 1.78-1.90 m headroom. Eaves and dormer clearances vary. The drawings do not make the bridge a resolved full-height route.'),
   ('Detailed design','Windows, drainage, structure, roof-terrace loading and weathering, pool safety and occupied furniture clearances need coordinated design. These studies are not a construction specification or evidence of planning approval.'),
   ('Review locally','Compare photographs with their companion plans, then review finish choices in the local model. This brochure task has not changed the model or published the design. Accepted decoration still needs model integration.')])]
  for i,(heading,sections) in enumerate(columns):
   x=M+i*397;self.text(heading,x,431,22,'Serif');y=402
   for title,copy in sections:
    y=self.para(title,x,y,371,12,INK,16,'Bold')-7;y=self.para(copy,x,y,371,9.6,leading=13.8)-19
  self.para('SOURCE GUIDE / Current Proposed model, room specifications and registered street context; accepted kitchen and principal-suite images; September 2026 image studies. Image sources, prompts and drawing provenance accompany this local edition.',M,72,W-2*M,7.6,leading=10.7,floor=40)

 def build(self):
  for self.page,item in enumerate(PAGES,1):
   self.bookmark(item);getattr(self,item['kind'])(item);self.c.showPage()
  self.c.save();return self.measured_blocks

def gallery(selected):
 for folder in (WEB,WEB/'images',WEB/'originals',WEB/'plans',WEB/'elevations',WEB/'context',WEB/'room-plans'):folder.mkdir(exist_ok=True,parents=True)
 shutil.copy2(PDF,WEB/PDF.name)
 groups=OrderedDict();images=[];seen=set();drawings=[]
 for number,p in enumerate(PAGES,1):
  if p['kind'] not in ('room','exterior','elevation_photo','arrival_pair'):continue
  for i,key in enumerate(p['images']):
   if key in seen:continue
   seen.add(key);description=p['copy'] if p['kind'] in ('exterior','elevation_photo') else p['sections'][i if len(p['images'])>1 else 0][1]
   record=dict(key=key,title=LABELS[key],page=number,description=description,chapter=p['chapter'],source=str(selected[key].relative_to(ROOT)),sha256=base.digest(selected[key]),kind='elevation-photo' if p['kind']=='elevation_photo' else 'exterior-study' if p['kind']=='exterior' else 'decor-study' if p.get('decor') else 'model-presentation')
   if p.get('oldPage',0)>=8:
    area=next((a for a in AREAS if a['after']>=p['oldPage']),None)
    if area:record['roomPlan']='room-plans/'+area['key']+'.svg'
   if p['kind']=='elevation_photo':record['referenceDrawing']='elevations/'+p['view']+'.svg'
   groups.setdefault(p['chapter'],[]).append(record);images.append(record)
   shutil.copy2(CACHE/(key+'.jpg'),WEB/'images'/(key+'.jpg'));shutil.copy2(selected[key],WEB/'originals'/(key+'.png'))
 def fig(r):
  key=r['key'];status='Photographic elevation study' if r['kind']=='elevation-photo' else 'Reconstructed context' if r['kind']=='exterior-study' else 'Revised decoration / model integration pending' if r['kind']=='decor-study' else 'Model-based presentation'
  with Image.open(selected[key]) as im:iw,ih=im.size
  related=(' / <a class="image-link" href="'+r['roomPlan']+'">Room plan</a>') if r.get('roomPlan') else (' / <a class="image-link" href="'+r['referenceDrawing']+'">Reference elevation</a>') if r.get('referenceDrawing') else ''
  return f'<figure id="view-{key}"><a href="originals/{key}.png"><img src="images/{key}.jpg" alt="{escape(r["title"])}" width="{iw}" height="{ih}" loading="lazy"></a><figcaption><span class="page">Page {r["page"]:02} / {status}</span><span class="title">{escape(r["title"])}</span><span class="description">{escape(r["description"])}</span><a class="image-link" href="originals/{key}.png">Full-resolution image</a> / <a class="image-link" href="{PDF.name}#page={r["page"]}">Brochure page</a>{related}</figcaption></figure>'
 nav=''.join(f'<a href="#{base.slug(k)}">{escape(k)}</a>'for k in groups)
 html=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ashley Heights | Proposed in brick</title><link rel="icon" href="data:,"><style>{base.CSS}</style></head><body><a class="skip" href="#gallery">Skip to photographs</a><main id="top"><header><div class="eyebrow">Proposed in brick / Local owner review</div><h1>A considered home</h1><p>{PAGE_COUNT} pages, {len(images)} presentation views, 27 room-group plans, four whole-floor plans, four elevations and two site/context plans.</p><nav class="actions"><a href="{PDF.name}">Open the {PAGE_COUNT}-page brochure</a><a href="ashley-heights-presentation-images.zip" download>Download all {len(images)} images</a><a href="ashley-heights-drawings.zip" download>Download the drawings</a><a href="ashley-heights-elevations-A3.pdf">A3 elevations / 1:100</a><a href="/?design=proposed">Explore Proposed</a></nav><p>The house stays in brick with dark grey tiles. Interiors retain the warm oak, limestone and ivory foundation, with the selected bedroom and leisure refinements. AI images explore finishes and atmosphere; the plans show current model geometry. Updated decoration is not yet integrated into the model.</p><nav class="chapters">{nav}<a href="#drawings">Plans and elevations</a></nav></header><div id="gallery">'
 for chapter,rows in groups.items():html+=f'<section id="{base.slug(chapter)}"><h2>{escape(chapter)}</h2><div class="grid">'+''.join(fig(r) for r in rows)+'</div><a class="top" href="#top">Back to contents</a></section>'
 html+='</div><section id="drawings"><h2>Plans and elevations</h2><p>Open the drawings at full size. Furniture footprints, room areas and dimensions are approximate model values. Context and site outlines are reconstructed, not a land survey.</p><div class="grid">'
 for number,p in enumerate(PAGES,1):
  if p['kind']=='plan':source=base.ORIGINAL/'plans'/('compact-'+p['level']);dest='plans/'+p['level']
  elif p['kind']=='spatial':source=EDITION/'plans'/p['area']['key'];dest='room-plans/'+p['area']['key']
  elif p['kind']=='elevation':source=EDITION/'elevations'/p['view'];dest='elevations/'+p['view']
  elif p['kind'] in ('site','context'):source=EDITION/'context'/p['drawing'];dest='context/'+p['drawing']
  else:continue
  for ext in ('svg','png'):shutil.copy2(source.with_suffix('.'+ext),WEB/(dest+'.'+ext))
  drawings.append(dict(title=p['title'],page=number,path=dest+'.svg',source=str(source.with_suffix('.svg').relative_to(ROOT))))
  html+=f'<figure><a href="{dest}.svg"><img src="{dest}.png" alt="{escape(p["title"])} drawing" loading="lazy"></a><figcaption><span class="page">Page {number:02}</span><span class="title">{escape(p["title"])}</span><a class="image-link" href="{dest}.svg">Open full-size drawing</a> / <a class="image-link" href="{PDF.name}#page={number}">Plan and breakdown</a></figcaption></figure>'
 html+='</div></section><footer><p>Photographic images are AI-enhanced visualisations. Neighbour heights and detail include estimates. All work remains local. No model geometry was changed for this brochure. The loft bridge headroom remains an unresolved design constraint.</p></footer></main></body></html>'
 (WEB/'index.html').write_text(html)
 with zipfile.ZipFile(WEB/'ashley-heights-presentation-images.zip','w',zipfile.ZIP_STORED) as z:
  for r in images:z.write(selected[r['key']],f'{r["page"]:02}-{r["key"]}.png')
  z.writestr('image-index.json',json.dumps(images,indent=2));z.writestr('README.txt','Ashley Heights - Proposed in brick\nModel-based AI-enhanced visualisations, not photographs of a completed house.\nDecoration refinements are not yet integrated into the native model.\nNeighbour context includes estimated heights and details.\nLocal owner review only. Filenames begin with the brochure page number.\n')
 with zipfile.ZipFile(WEB/'ashley-heights-drawings.zip','w',zipfile.ZIP_DEFLATED) as z:
  z.write(ROOT/'output/pdf/ashley-heights-elevations-A3.pdf','ashley-heights-elevations-A3.pdf')
  for d in drawings:
   for ext in ('svg','png'):z.write((WEB/d['path']).with_suffix('.'+ext),str(Path(d['path']).with_suffix('.'+ext)))
  z.writestr('drawing-index.json',json.dumps(drawings,indent=2));z.writestr('README.txt','Current-model spatial studies. Approximate dimensions; use scale bars. Not survey, planning approval or construction documents.\n')
 shutil.copy2(ROOT/'output/pdf/ashley-heights-elevations-A3.pdf',WEB/'ashley-heights-elevations-A3.pdf')
 shutil.copytree(WEB,DIST,dirs_exist_ok=True)
 return images,drawings

def main():
 selected=assets();base.CACHE=CACHE
 blocks=SpatialBrochure().build();images,drawings=gallery(selected)
 manifest=dict(pdf=str(PDF.relative_to(ROOT)),pages=PAGE_COUNT,selectedImages=len(images),roomGroupPlans=27,wholeFloorPlans=4,elevations=4,siteContextPlans=2,primaryDesign='Proposed',exterior='brick',roof='dark grey tile',dormers='tiled faces and cheeks',publication='local owner review only',newExteriorViews=len(VIEWS),revisedInteriorViews=len(DECOR),modelChanged=False,imageMethod='Built-in image generation; model-based visualisations',pdfSha256=base.digest(PDF),assets=images,drawings=drawings,excludedImages=[r['key']for r in RECORDS if r['status']!='selected'])
 for name,value in [('brochure-manifest',manifest),('page-content',PAGES),('layout-blocks',blocks)]: (EDITION/(name+'.json')).write_text(json.dumps(value,indent=2)+'\n')
 print(json.dumps({'pages':PAGE_COUNT,'images':len(images),'drawings':len(drawings),'pdfMB':round(PDF.stat().st_size/1e6,1)}))

if __name__=='__main__':main()
