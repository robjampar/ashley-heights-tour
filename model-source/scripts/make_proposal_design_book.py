"""Assemble native renders and measured model drawings into a local review PDF."""
from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,os
import pymupdf as fitz

ROOT=Path(__file__).resolve().parents[1];P=ROOT/'proposal'
REV=os.environ.get('PROPOSAL_REVIEW_RENDER_REV','P5-release')
DAY=ROOT/'output-proposed/renders'/REV
NIGHT=ROOT/'output-proposed/renders'/os.environ.get('PROPOSAL_NIGHT_RENDER_REV','P5-release-evening')
OLD=ROOT/'output-proposed/renders/P4-original-comparison'
NAV=json.loads((ROOT/'output-proposed/navigation.json').read_text())
GEOMETRY=ROOT/'output-proposed/geometry.json'
native_sha=hashlib.sha256((ROOT/'output-proposed/Ashley Heights — Proposed.blend').read_bytes()).hexdigest()
for folder in [DAY]+([NIGHT]if (NIGHT/'front-gates.png').exists()else[]):
    settings=json.loads((folder/'render-settings.json').read_text())
    assert settings['source_native_sha256']==native_sha, f'Outdated render set: {folder}'
    assert not settings['geometry_modified'], f'Unsaved preview geometry: {folder}'
WIDTH,HEIGHT=1190.551,841.890
INK=(.13,.28,.24);MUTED=(.37,.44,.39);PAPER=(.980,.976,.953)
doc=fitz.open();bookmarks=[]

def text(page,rect,value,size=13,color=INK,bold=False):
    result=page.insert_textbox(fitz.Rect(rect),value,fontsize=size,
        fontname='hebo'if bold else'helv',color=color,lineheight=1.32)
    assert result>=0,(value[:80],result)

def page(title,subtitle=None):
    p=doc.new_page(width=WIDTH,height=HEIGHT)
    p.draw_rect(p.rect,color=None,fill=PAPER)
    text(p,(38,24,WIDTH-38,43),'ASHLEY HEIGHTS  /  PROPOSED EXTENSIONS',10,MUTED,True)
    text(p,(38,53,WIDTH-38,101),title,27,INK,True)
    if subtitle:text(p,(38,101,WIDTH-38,139),subtitle,11,MUTED)
    text(p,(38,805,WIDTH-38,830),
        f'P5 architectural concept  |  Model saved {NAV["modelUpdatedAt"][:16].replace("T"," ")} UTC  |  {len(doc)}',9,MUTED)
    bookmarks.append([1,title,len(doc)])
    return p

def picture(p,file,rect):
    assert file.exists(),file
    p.insert_image(fitz.Rect(rect),filename=str(file),keep_proportion=True)

p=page('A new arrival, a connected home',
       'An attached gate-facing wing, usable loft rooms and a garden pavilion built around the existing house and plot.')
picture(p,DAY/'front-gates.png',(38,147,860,699))
text(p,(890,157,1151,202),'The design',19,INK,True)
text(p,(890,207,1151,650),
    'The original house remains in its existing position. The new entrance turns towards the gates and joins through the old central front entrance.\n\n'
    'A courtyard opens west between the wings. Pitched roofs connect the two buildings and give access to both lofts.\n\n'
    'The revised front wing and connection provide about 154.1 m² of comparison area; the new internal garden reduces the enclosed footprint.\n\n'
    'Four outside parking spaces and two in the new double garage fit within the reconstructed plot.',13)
text(p,(38,724,1151,783),
    'The separate original model is preserved. Compare either design from the same tour using View original / View proposal. '
    'These pages show real editable model geometry; dimensions and site levels remain estimates from the supplied plans and photographs.',12,MUTED)

p=page('The garden grows from what is already there',
       'The existing shed stays in place and expands west. The pool sits directly in front of it; the original rear masonry and openings remain.')
picture(p,DAY/'rear-pool.png',(38,147,764,635))
picture(p,DAY/'pavilion-pool.png',(786,147,1151,392))
picture(p,DAY/'rear-house.png',(786,413,1151,658))
text(p,(38,679,1151,773),
    'An 8 × 3.5 m pool and its level terrace connect to the expanded pavilion. The glazed garden living room joins through existing rear openings. '
    'Dark rear frames bring the retained windows and French doors into the same finish family as the new glazing, while preserving their original geometry. '
    'The ornamental tree relocation is a concept assumption; feasibility and tree constraints remain to be checked.',13)

for title,photo,key,note in [
    ('Front reference and site-specific response','front-inspiration.png','front-gates',
     'A glazed pitched entrance, pale render, timber garage doors and dark frames interpret the reference. The real gates, old house and plot determine the new orientation and proportions.'),
    ('Rear reference and site-specific response','rear-inspiration.jpeg','rear-pool',
     'The brick house, dormer, dark glazing, pool and expanded pavilion follow the reference direction. The existing house geometry, shed position and reconstructed garden levels determine the actual layout.')]:
    p=page(title,'Design inspiration and proposed model: different designs and camera positions, not an alignment overlay.')
    picture(p,P/'reference'/photo,(38,164,582,608))
    picture(p,DAY/(key+'.png'),(608,164,1151,608))
    text(p,(38,627,582,656),'Supplied inspiration',13,INK,True)
    text(p,(608,627,1151,656),'Proposed model on the existing plot',13,INK,True)
    text(p,(38,681,1151,770),note,14)

if (NIGHT/'front-gates.png').exists()and(NIGHT/'rear-pool.png').exists():
    p=page('Evening lighting',
           'The same geometry, with a twilight sky and the modelled luminaires. Presentation lighting is not a daylight-performance calculation.')
    picture(p,NIGHT/'front-gates.png',(38,160,582,638))
    picture(p,NIGHT/'rear-pool.png',(608,160,1151,638))
    text(p,(38,676,1151,770),
        'Small up/down wall lights mark the entrance and rear brick piers. A fixed soffit strip washes the garage doors without entering their movement envelope. '
        'Recessed pool lights and low path lights define the garden route. The browser tour keeps its daytime lighting; Blender contains the editable fixtures.',13)

matched=[('From the gates','front-gates'),('Entrance court','front-court'),
    ('Whole plot from the front','aerial-southwest'),('Whole plot from the rear','aerial-northeast'),
    ('Driveway and front wing','front-context'),('Pool towards the house','rear-pool'),
    ('Garden towards the house','rear-house'),('Open courtyard','courtyard'),
    ('Cinema towards courtyard','family-room-courtyard'),('Bedroom 4 towards courtyard','bedroom4-courtyard'),
    ('Old hall into new entrance','old-hall-connection'),('Existing landing into new wing','existing-landing-link'),
    ('Dining room towards garden addition','dining-to-garden-addition'),('Kitchen towards garden addition','old-kitchen-garden-addition')]
for index in range(0,len(matched),2):
    p=page('Original and proposal - '+str(index//2+1),
           'Identical camera position, field of view and daylight lighting in each pair. Original reconstruction on the left; proposed design on the right.')
    for row,(label,key)in enumerate(matched[index:index+2]):
        y=147+row*315
        text(p,(38,y,1151,y+24),label,14,INK,True)
        picture(p,OLD/(key+'.png'),(38,y+28,582,y+306))
        picture(p,DAY/(key+'.png'),(608,y+28,1151,y+306))

for title,keys,note in [
 ('Spaces for the whole house',['cinema','gym'], 'A four-seat cinema fits the original family room. The former garage becomes a gym, connected to the garden living room through wide opening doors.'),
 ('An underground cellar and new bedrooms',['wine-room','side-bedroom'], 'Wine racks and tasting space sit beneath the former garage, reached from a dedicated stair in the gym. Two bedrooms above the gym share access through the former Bedroom 5, bringing the house to seven bedrooms plus flexible loft space.'),
 ('The revised connection',['internal-garden','garden-connection'], 'The original drawing-room bay overlooks a small open-to-sky internal garden. Glazing opens the central connection to it; the new-wing staircase is removed and its openings filled.')]:
    p=page(title,'Current P5 model: actual fitted spaces, retained room positions and connected circulation.')
    for i,key in enumerate(keys):picture(p,DAY/(key+'.png'),(38+i*570,160,582+i*570,638))
    text(p,(38,679,1151,778),note,14)

for filename,title in [
    ('P5_site-parking-garden-presentation.pdf','Site and six parking spaces'),
    ('P5_whole-house-floorplans.pdf','Cellar, ground, first and loft plans'),
    ('P5_sections.pdf','Actual roof and stair sections')]:
    start=len(doc)+1
    with fitz.open(P/filename)as other:doc.insert_pdf(other)
    bookmarks.append([1,title,start])

p=page('What is fixed, and what needs further design',
       'A clear distinction between the reviewed geometry and the work needed to turn this concept into a measured construction design.')
columns=[
 ('Retained and checked',
  'Original house, staircase, shed and gate positions remain.\n\n'
  'The central entrance joins the wings. Only the original stairs and the loft flight above serve the upper floors; a dedicated stair descends to the cellar.\n\n'
  'The front-wing comparison envelope is now 154.1 m². The small garden outside the retained drawing bay is open to the sky.\n\n'
  'Four 2.5 × 5 m outside bays plus two new-garage spaces have been checked with 4.4 × 1.8 m compact cars and occupied adjacent bays.'),
 ('Useful tradeoffs',
  'The former garage becomes a gym with two bedrooms above and a wine cellar below. Its old forecourt remains parking; the new double garage provides the two indoor spaces.\n\n'
  'The open courtyard is kept free of parking. The route across the private forecourt is shared with vehicles.\n\n'
  'Low loft eaves are storage, not all standing-height accommodation. Consult the sections and named room areas rather than treating the whole loft deck as usable living area.\n\n'
  'The supplied plot estimate is about 0.3 acres; the reconstructed polygon is about 0.308 acres.'),
 ('Still to resolve',
  'A measured building and boundary survey, roof/floor structure, support for openings and the new storey over the former garage.\n\n'
  'The retained chimney/flue terminal relationship to the new dormer roof. A wider lateral gap does not establish an acceptable terminal height or approved flashing detail.\n\n'
  'Cellar excavation, foundations, underpinning, groundwater and waterproofing; pool plant and drainage.\n\n'
  'Tree roots, relocation feasibility and applicable tree constraints.\n\n'
  'These are specific design-stage limitations; the model is not construction or approval documentation.')]
for i,(heading,body)in enumerate(columns):
    x=38+i*378
    text(p,(x,157,x+350,196),heading,19,INK,True)
    text(p,(x,211,x+350,778),body,13)

doc.set_toc(bookmarks)
doc.set_metadata({'title':'Ashley Heights - P5 proposed extensions','subject':'Editable model design review, matched comparisons and measured model drawings','author':'Ashley Heights','keywords':'architectural concept, original and proposed, P5'})
output=P/'Ashley Heights - Proposed Design Review.pdf'
doc.save(output,garbage=4,deflate=True)
manifest={'created_utc':datetime.now(timezone.utc).isoformat(),'native_model_updated_at':NAV['modelUpdatedAt'],
 'daylight_revision':REV,'evening_revision':NIGHT.name,'pages':len(doc),
 'source_geometry_sha256':hashlib.sha256(GEOMETRY.read_bytes()).hexdigest(),
 'source_native_sha256':native_sha,
 'render_sha256':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()for folder in (DAY,NIGHT)for p in folder.glob('*.png')},
 'output':str(output.relative_to(ROOT)),'bytes':output.stat().st_size,
 'scope':'Local review document; not included in public tour deployment.'}
(P/'P5_design-book-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
