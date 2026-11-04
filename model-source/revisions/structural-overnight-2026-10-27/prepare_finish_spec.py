"""Freeze a reviewable native change schedule against the preserved architecture."""
import json,re,sys,hashlib
from pathlib import Path
import numpy as np
from shapely.geometry import Point,box
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.structure.finish_coordination import schedule,bounds
from scripts.structure.build_study import footprint,triangulate
source=R/'revisions/structural-overnight-2026-10-27/original/outputs/output-proposed-compact'
g=json.loads((source/'geometry.json').read_text());nav=json.loads((source/'navigation.json').read_text())
m=json.loads((R/'walkthrough/public/structure/model.json').read_text());members=json.loads((R/'walkthrough/public/structure/members.json').read_text());j=json.loads((R/'proposal/specs/structural-junction-details.json').read_text())
r=schedule(g,m,members,j['layers']);assert r['summary']['intersectionsAfter']==0
by={o['object_name']:o for o in g['objects'] if o['vertices']};ops=r['operations'];cop=[o for o in ops if o['kind'].startswith('ceiling')]
# Use one board datum on each reconstructed floor, avoiding 3–18 mm accidental
# ceiling steps between adjoining rooms. Existing ground-house ceilings are not
# in this schedule because their structure remains retained.
faces={-1:-.4639,0:2.3961,1:5.1315}
for o in cop:
 z=o['oldZ'][0];level=-1 if z<0 else 0 if z<3 else 1;face=faces[level]
 assert face<=o['ceilingBoardFaceM']+1e-5
 depth=max(.002,o['oldZ'][1]-o['oldZ'][0]);cosmetic=o['kind']=='ceiling-finish';bottom=face-depth if cosmetic else face
 o['ceilingBoardFaceM']=face;o['newZ']=[bottom,bottom if o['oldZ'][1]-o['oldZ'][0]<.0001 else face if cosmetic else face+.0315]
 row=next(c for c in r['ceilings']if c['objectName']==o['objectName']);row['newFaceM']=bottom;row['deltaM']=bottom-o['oldZ'][0]
for o in ops:o['method']='bounds-z'
polys={o['objectName']:footprint(triangulate(by[o['objectName']])) for o in cop}
def ceiling_at(x,y,z,limit=.2):
 hits=[o for o in cop if abs(o['oldZ'][0]-z)<limit and polys[o['objectName']].buffer(.015).covers(Point(x,y))]
 return min(hits,key=lambda o:(abs(o['oldZ'][0]-z),o['kind']!='ceiling-finish')) if hits else None
# The basement source becomes the finish body; the raft has an independent,
# explicit datum. The already authored room flooring remains at the same FFL.
n='Proposal | Entertainment basement floor';lo,hi=bounds(by[n]);ops.append({'objectName':n,'method':'bounds-z','kind':'basement-finish','oldZ':[lo[2],hi[2]],'newZ':[-2.82,-2.8]})
# Ceiling-mounted equipment follows the finished face; pendant lengths shorten
# at the top so the bar shades keep their existing height above the island.
fixture=re.compile(r'downlight|ceiling.*(?:light|speaker|fitting|diffuser|rail|opal|housing|fixing|rim|rose)|(?:light|pendant).*ceiling|basement stair landing diffuser',re.I)
for n,o in by.items():
 if not fixture.search(n) or n in {p['objectName']for p in ops}:continue
 lo,hi=bounds(o);x,y=(lo[0]+hi[0])/2,(lo[1]+hi[1])/2;c=ceiling_at(x,y,hi[2])
 if not c:continue
 delta=c['newZ'][0]-c['oldZ'][0]
 if abs(delta)<.0001:continue
 ops.append({'objectName':n,'method':'translate-z','kind':'ceiling-fixture','deltaM':delta,'ceiling':c['objectName']})
 if 'ceiling rose'in n.lower() and 'pendant'in n.lower():
  prefix=n[:n.lower().index('ceiling rose')]
  for sn,so in by.items():
   if sn.startswith(prefix) and re.search('stem|suspension',sn,re.I):
    sl,sh=bounds(so);newtop=sh[2]+delta
    if newtop<=sl[2]+.05:raise ValueError('Pendant suspension has insufficient room: '+sn)
    ops.append({'objectName':sn,'method':'bounds-z','kind':'pendant-length','oldZ':[sl[2],sh[2]],'newZ':[sl[2],newtop]})
# Curtains and fitted joinery fillers are explicitly checked near the new face.
for n,o in by.items():
 if 'ceiling filler'not in n.lower():continue
 lo,hi=bounds(o);c=ceiling_at((lo[0]+hi[0])/2,(lo[1]+hi[1])/2,hi[2])
 if c and hi[2]>c['newZ'][0]-.003:
  top=c['newZ'][0]-.003
  if top<=lo[2]:raise ValueError('Joinery body requires more than filler trimming: '+n)
  ops.append({'objectName':n,'method':'bounds-z','kind':'joinery-filler','oldZ':[lo[2],hi[2]],'newZ':[lo[2],top]})
# Complete principal entry wall head lowered, with a normal 2100 mm leaf.
for n in ['Proposal | Principal suite north partition pier 0','Proposal | Principal suite north partition pier 1']:
 lo,hi=bounds(by[n]);ops.append({'objectName':n,'method':'bounds-z','kind':'partition-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2],5.163]})
n='Proposal | Principal suite north partition head 0';lo,hi=bounds(by[n]);ops.append({'objectName':n,'method':'bounds-z','kind':'door-opening-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2]-.12,5.163]})
n='Bedroom 02 | entry door open';lo,hi=bounds(by[n]);ops.append({'objectName':n,'method':'bounds-z','kind':'door-leaf','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]-.12]})
for n,o in by.items():
 if not n.startswith('Frame detail | 23 '):continue
 lo,hi=bounds(o)
 if 'head'in n:ops.append({'objectName':n,'method':'translate-z','kind':'door-frame-head','deltaM':-.12})
 elif hi[2]>4.9:ops.append({'objectName':n,'method':'bounds-z','kind':'door-frame-jamb','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]-.12]})
 # This jamb meets the column box: a 35 mm flat oak trim leaves a 2 mm joint.
 if 'left architrave'in n:ops.append({'objectName':n,'method':'bounds-axis','kind':'door-frame-column-junction','axis':0,'old':[lo[0],hi[0]],'new':[hi[0]-.035,hi[0]]})
# Keep both skins around the gallery edge steel, clear of its flange.
# The other suite doors use the same 2100 mm leaf and a complete frame below
# the coordinated ceiling. A tall architectural header is not a beam recess.
for leaf,head,frame in [
 ('Bedroom 02 | dressing door open','Bedroom 02 | dressing doorway header','03'),
 ('Ensuite 01 | bathroom door open','Ensuite 01 | bathroom doorway header','28')]:
 lo,hi=bounds(by[leaf]);ops.append({'objectName':leaf,'method':'bounds-z','kind':'door-leaf','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]-.12]})
 lo,hi=bounds(by[head]);ops.append({'objectName':head,'method':'bounds-z','kind':'door-opening-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2]-.12,5.163]})
 for n,o in by.items():
  if not n.startswith('Frame detail | '+frame+' '):continue
  lo,hi=bounds(o)
  if 'head'in n:ops.append({'objectName':n,'method':'translate-z','kind':'door-frame-head','deltaM':-.12})
  elif hi[2]>4.9:ops.append({'objectName':n,'method':'bounds-z','kind':'door-frame-jamb','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]-.12]})
# Wall return notches must follow the door-head level separately from the
# overall wall height. Uniform wall scaling moved those notches out of line.
for prefix in ('Proposal | Principal suite north partition pier','Bedroom 02 | dressing return pier','Ensuite 01 | bathroom dividing wall'):
 for n,o in by.items():
  if not n.startswith(prefix):continue
  lo,hi=bounds(o)
  ops[:]=[p for p in ops if not(p['objectName']==n and p['kind']=='partition-head')]
  ops.append({'objectName':n,'method':'piecewise-z','kind':'door-wall-return',
              'oldLevels':[lo[2],5.083,hi[2]],'newLevels':[lo[2],4.963,5.163]})
# Fit room finishes and joinery to the ceiling. These named decorative parts
# carry no building loads; masonry/structural wall heads are handled separately.
for n,o in by.items():
 if n in {p['objectName']for p in ops}:continue
 lo,hi=bounds(o);c=ceiling_at((lo[0]+hi[0])/2,(lo[1]+hi[1])/2,hi[2],.4)
 if not c:continue
 face=c['newZ'][0]
 if 'curtain' in n.lower() and hi[2]>face-.025:
  target=face-.025
  if hi[2]-lo[2]>.3:ops.append({'objectName':n,'method':'bounds-z','kind':'curtain-length','oldZ':[lo[2],hi[2]],'newZ':[lo[2],target]})
  else:ops.append({'objectName':n,'method':'translate-z','kind':'curtain-track','deltaM':target-hi[2]})
 elif (n.startswith('Bedroom 02 | headboard oak wall panel') or n=='Bar 01 | media wall oak panel' or
       ('panelling' in n.lower() and ('cream wall lining' in n or 'full height finish' in n)) or
       n in ['Cinema 01 | rear doorway dark wall finish','Cinema 01 | east doorway head finish','Proposal | Quiet oak | TV plaster panel','Familybath 01 | south doorway ivory head']) and hi[2]>face-.002:
  assert face-.002>lo[2]+.01,n
  ops.append({'objectName':n,'method':'bounds-z','kind':'wall-finish-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2],face-.002]})
 elif n.startswith('Ensuite 01 | ') and 'wardrobe bay' in n and hi[2]>face-.01:
  if hi[2]-lo[2]<.1:ops.append({'objectName':n,'method':'translate-z','kind':'wardrobe-top','deltaM':face-.01-hi[2]})
  else:ops.append({'objectName':n,'method':'bounds-z','kind':'wardrobe-panel','oldZ':[lo[2],hi[2]],'newZ':[lo[2],face-.01]})
# Preserve the electrical equipment positions. Only its enclosure is shortened;
# upper ventilation slots and hinge move with the door's shortened top zone.
for n,o in by.items():
 if not n.startswith('Prep kitchen | '):continue
 lo,hi=bounds(o)
 if n.startswith(('Prep kitchen | service cabinet','Prep kitchen | service access')):
  delta=2.3811-2.536
  if lo[2]>2:
   ops.append({'objectName':n,'method':'translate-z','kind':'service-cabinet-upper-part','deltaM':delta})
  elif hi[2]>2:
   ops.append({'objectName':n,'method':'piecewise-z','kind':'service-cabinet-height',
               'oldLevels':[lo[2],2.,2.2,hi[2]],'newLevels':[lo[2],2.,2.2+delta,hi[2]+delta]})
 elif n.startswith('Prep kitchen | door transom'):
  # Retain the door below the transom; rebuild a 97 mm fanlight above it.
  delta=2.3761-2.51
  if lo[2]>2.4:ops.append({'objectName':n,'method':'translate-z','kind':'prep-transom-head','deltaM':delta})
  elif hi[2]>2.4:ops.append({'objectName':n,'method':'bounds-z','kind':'prep-transom-height','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]+delta]})
 elif n in ['Prep kitchen | tall pantry carcass','Prep kitchen | tall pantry door']:
  ops.append({'objectName':n,'method':'bounds-z','kind':'pantry-height','oldZ':[lo[2],hi[2]],'newZ':[lo[2],hi[2]-.05]})
 elif n=='Prep kitchen | tall pantry top filler':
  ops.append({'objectName':n,'method':'bounds-z','kind':'pantry-head-filler','oldZ':[lo[2],hi[2]],'newZ':[2.375,2.3811]})

# Restore the accepted Art Deco joinery proportions beneath the lower ceiling.
# Move shelves and contents together; shorten only fixed panels, never bottles.
for n,o in by.items():
 lo,hi=bounds(o)
 def add_z(kind,low,high):
  ops.append({'objectName':n,'method':'bounds-z','kind':kind,'oldZ':[lo[2],hi[2]],'newZ':[low,high]})
 def move_z(kind,delta):
  ops.append({'objectName':n,'method':'translate-z','kind':kind,'deltaM':delta})
 if n.startswith('Bar detail | panelling '):
  if 'cornice' in n:move_z('bar-cornice-height',faces[-1]+.267)
  elif 'picture moulding' in n and hi[2]>-.55:
   if hi[2]-lo[2]>.1:add_z('bar-picture-moulding-height',lo[2],faces[-1]-.133)
   else:move_z('bar-picture-moulding-rail',faces[-1]-.133+.48)
  elif 'full height finish' in n:
   existing=next((p for p in ops if p['objectName']==n and p['method']=='bounds-z'),None)
   if existing:existing['newZ'][1]=faces[-1]-.115
 elif n=='Bar detail | back bar walnut crown':add_z('bar-crown-height',faces[-1]-.05,faces[-1]-.01)
 elif n=='Bar detail | crown brass inlay':move_z('bar-crown-inlay',faces[-1]-.032-(lo[2]+hi[2])/2)
 elif n.startswith('Bar detail | back bar ') and ('mirror' in n or 'pilaster' in n):add_z('bar-display-panel-height',lo[2],faces[-1]-.05)
 elif n.startswith('Bar detail | back bar ') and 'crossrail' in n and lo[2]>-.5:move_z('bar-display-head-rail',faces[-1]-.059-(lo[2]+hi[2])/2)
 elif n.startswith('Bar detail | display bay ') and 'LED 2.37' in n:move_z('bar-display-upper-light',faces[-1]-.084-(lo[2]+hi[2])/2)
 elif n.startswith(('Bar detail |','Bar 01 |')) and 9.9<lo[0]<13.7 and -16.1<lo[1]<-15.5 and -.95<lo[2] and hi[2]<-.49:
  move_z('bar-upper-display-group',-.08)
 elif n.startswith('Bar 01 | pool light suspension'):add_z('pool-light-suspension',lo[2],faces[-1])
 elif n.startswith(('Gym 01 |','Utility 01 |')) and 'blind cassette' in n:
  move_z('blind-cassette-height',faces[0]-.025-hi[2])
 elif n=='Ensuite 01 | rainhead drop':add_z('shower-suspension',lo[2],faces[1])

# G01: cinema bearing-wall faces, floor edges and decorative linings follow
# the 215 mm structural core. Keep the bar-side finish face at X9.220.
ground=members.get('groundDeckStudy')
if ground:
 for n in ground['sourceWallNames']:
  lo,hi=bounds(by[n]);normal=1 if 'north wall' in n else 0
  new=[-10.0275,-9.7825]if normal==1 else[8.975,9.22]
  ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-bearing-wall-face','axis':normal,'old':[lo[normal],hi[normal]],'new':new})
  if normal==1:ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-bearing-wall-return','axis':0,'old':[lo[0],hi[0]],'new':[lo[0],9.45]})
  # Room walls extend above the ceiling to the slab. Low doorway soffits stay.
  ops.append({'objectName':n,'method':'bounds-z','kind':'cinema-bearing-wall-height','oldZ':[lo[2],hi[2]],'newZ':[lo[2],-.325]})
 n='Proposal | Cinema south wall';lo,hi=bounds(by[n])
 ops.append({'objectName':n,'method':'bounds-z','kind':'cinema-partition-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2],-.35]})
 ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-partition-return','axis':0,'old':[lo[0],hi[0]],'new':[lo[0],8.975]})
 for n,o in by.items():
  lo,hi=bounds(o)
  if n.startswith(('Cinema 01 | east acoustic','Cinema 01 | east doorway')):
   ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-wall-finish','axis':0,'old':[lo[0],hi[0]],'new':[lo[0]-.125,hi[0]-.125]})
  elif n.startswith(('Cinema 01 | screen wall fabric','Cinema 01 | rear doorway dark','Cinema 01 | acoustic ceiling')):
   ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-wall-finish-edge','axis':0,'old':[lo[0],hi[0]],'new':[lo[0],hi[0]-.125]})
  elif n.startswith(('Frame detail | 00 ','Frame detail | 02 ')):
   if 'front ' in n:ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-door-trim','axis':0,'old':[lo[0],hi[0]],'new':[lo[0]-.125,hi[0]-.125]})
   elif 'lining' in n:ops.append({'objectName':n,'method':'bounds-axis','kind':'cinema-door-jamb-depth','axis':0,'old':[lo[0],hi[0]],'new':[lo[0]-.125,hi[0]]})
 # Keep ceiling panels and acoustic wall finishes below the new uniform face.
 for n,o in by.items():
  if not n.startswith('Cinema 01 | ')or 'acoustic lining'not in n:continue
  lo,hi=bounds(o)
  if hi[2]>faces[-1]-.002 and not any(p['objectName']==n and p['method']=='bounds-z'for p in ops):
   ops.append({'objectName':n,'method':'bounds-z','kind':'cinema-wall-finish-head','oldZ':[lo[2],hi[2]],'newZ':[lo[2],faces[-1]-.002]})

for e in members['floorBandEnclosures']:
 n=e['name'];lo,hi=bounds(by[n]);axis=0 if hi[0]-lo[0]<hi[1]-lo[1] else 1
 if n=='Proposal | Loft passage east wall base':
  ops.append({'objectName':n,'method':'bounds-axis','kind':'edge-lining-width','axis':0,'old':[lo[0],hi[0]],'new':[10.22,10.42]});lo[0]=10.22
 ops.append({'objectName':n,'method':'hollow-band','kind':'floor-edge-lining','normal':axis,'thicknessM':.02})
# Loft wall frames now start on the deck, so remove their legacy under-floor body.
for e in m['elements']:
 n=e.get('sourceObject')
 if n not in by:continue
 lo,hi=bounds(by[n])
 if n in by and e['category']=='walls' and 5.19<=lo[2]<5.528 and hi[2]>5.618:
  ops.append({'objectName':n,'method':'clip-bottom','kind':'loft-wall-seat','z':5.528})
# The western transfer has a real pier down to its RC wall return.
n='Proposal | Entrance bay north return';lo,hi=bounds(by[n]);ops.append({'objectName':n,'method':'bounds-axis','kind':'pier-extension','axis':0,'old':[lo[0],hi[0]],'new':[lo[0],5.5]})
# Move only synthetic light sources that would now sit in/above the new ceiling;
# emitter-linked sources use the same fixture displacement when available.
light_changes=[]
for light in nav['proposalLights']:
 x,y,z=light['position'];c=ceiling_at(x,y,z,.35)
 if c and z>c['newZ'][0]-.04:
  light_changes.append({'name':light['name'],'oldPosition':light['position'],'newPosition':[x,y,min(z+c['newZ'][0]-c['oldZ'][0],c['newZ'][0]-.04)]})
# Keep a documentary audit with full exact-polygon checks outside the build spec.
r['summary']['fixtureObjects']=sum(o['kind']=='ceiling-fixture' for o in ops);r['summary']['lightSources']=len(light_changes)
(R/'revisions/structural-overnight-2026-10-27/finish-coordination-proposal.json').write_text(json.dumps(r,indent=2)+'\n')
spec={'revision':'structural-finish-coordination-2026-10-27','status':'Experimental dimensional coordination; no construction approval',
 'sourceGeometrySHA256':hashlib.sha256((source/'geometry.json').read_bytes()).hexdigest(),'layers':j['layers'],
 'ceilingFacesByLevel':faces,
 'operations':ops,'lightSources':light_changes,
 'columnEnclosure':{'x':8.32,'y':-8.63,'outsideM':.210,'southY':-8.745,'depthM':.220,'boardM':.025,'gapToSteelM':.005,'bottomZ':-2.8,'topZ':5.1315,'penetrationBottomZ':-3.001,'penetrationTopZ':5.193,
 'basis':'25 mm encasement space with at least 5 mm nominal clearance to the steel; south face stands 5 mm clear of the ground-floor trimmer and 6.5 mm clear of the first-floor joist. A separate 15 mm first-floor closing strip meets the existing partition face above the floor. A British Gypsum FireCase family provides a dimensional reference; required resistance, section factor, critical temperature, fixings and continuity at connections require project-specific selection. No fire rating is assigned.',
 'source':'https://www.british-gypsum.com/documents/technical-specification/british-gypsum-ts-d120001-l-en.pdf'},
 'groundDeckStrategy':ground,
 'basementReturn':{'lo':[5.16,-5.4025,-3.0],'hi':[5.5,-4.95,0]},
 'basementStairOpening':{'old':[6.2,-9.785,8.6,-8.845],'new':[6.2,-9.785,9.11,-8.845],
 'basis':'Extend the low end of the opening to the main ground-floor girder. The new lining datum otherwise reduces clearance over the lower treads below 2 m. Remove the short end trimmer and two stub joists; extend the side trimmers to the steel. Keep all treads and floor levels; move the ground-level guard and landing light to suit.'},
 'limits':r['limits'],'summary':r['summary']}
# Rebuild closed horizontal finish bodies from their retained plan, not a
# sequence of Blender Booleans on thin concave meshes. The source plan and
# every allowed penetration are explicit and can be independently checked.
from scripts.structure.junctions import horizontal_layer,solid,triangles
from shapely import set_precision
closed=[];column=spec['columnEnclosure'];cx,cy=column['x'],column['y'];hw=column['outsideM']/2
for op in ops:
 if op['kind']not in('floor-body','basement-finish','ceiling-body','ceiling-finish'):continue
 low,high=op['newZ']
 if high-low<1e-5:continue
 poly=footprint(triangulate(by[op['objectName']])).buffer(0);source_area=poly.area
 if low<column['penetrationTopZ']and high>column['penetrationBottomZ']:poly=poly.difference(box(cx-hw,column['southY'],cx+hw,cy+hw))
 if low<5.35 and high>-3:poly=poly.difference(box(5.16,-5.4025,5.5,-4.95))
 if -2.83<=high<=-2.77 or -0.6<low<0:
  for wall in [box(5.16,-10.0275,9.45,-9.7825),box(8.975,-15.35,9.22,-10.85)]:poly=poly.difference(wall)
 if low>-.6 and high<.1:poly=poly.difference(box(*spec['basementStairOpening']['new']))
 # Float32-authored coincident edges can leave zero-area triangles when the
 # closed extrusion is reconstructed. One-micron plan snapping removes that
 # numerical ambiguity without a visible design change; retain analytical
 # area × depth as the independent volume expectation.
 unsnapped_area=poly.area;poly=set_precision(poly,1e-6)
 if abs(poly.area-unsnapped_area)>1e-4:raise ValueError('Unreviewed plan-rounding change: '+op['objectName'])
 if op['kind']=='floor-body'and abs(high)<.005:
  from shapely.geometry import Polygon
  vehicle=Polygon(ground['geometry']['slabClearPolygon']);a=poly.difference(vehicle);b=poly.intersection(vehicle)
  parts=[solid(horizontal_layer(p,z,high))for p,z in [(a,low),(b,-.022)]if not p.is_empty and p.area>1e-9]
  shape=parts[0]
  for part in parts[1:]:shape=shape+part
  expected_volume=a.area*(high-low)+b.area*(high+.022)
 else:
  shape=solid(horizontal_layer(poly,low,high));expected_volume=poly.area*(high-low)
 if abs(shape.volume()-expected_volume)>1e-6:raise ValueError('Closed finish volume changed: '+op['objectName'])
 closed.append({'sourceObject':op['objectName'],'kind':op['kind'],'oldZ':op['oldZ'],'newZ':[low,high],
                'triangles':triangles(shape),'sourcePlanAreaM2':source_area,'expectedPlanAreaM2':poly.area,
                'expectedVolumeM3':expected_volume,'planRoundingM':1e-6,'basis':'Original authored plan, unchanged FFL, reviewed column/pier/bearing-wall/stair penetrations only. Closed constant-depth sheet, with a 22 mm finish over the vehicle-deck region. One-micron plan precision avoids degenerate coincident edges; expected volume is calculated independently from plan area and layer depth.'})
spec['closedFinishMeshes']=closed
(R/'proposal/specs/structural-finish-coordination.json').write_text(json.dumps(spec,indent=2)+'\n')
print(json.dumps({'operations':len(ops),**spec['summary']}))
