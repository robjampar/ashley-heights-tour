"""P5 original front modernisation; original drawing bay retained at the garden."""
# Original room footprints/stair positions remain. All edits are proposal-only mesh copies.
demolition=[5.80,-1.40,8.89,.245]
front_report={'central_opening':demolition,'removed':[],'modernised':[],'retained_drawing_bay':[],'basis':'Owner directs removal of old central door, porch, arched window and front wall to form attached entrance/landing; P5 retains the complete drawing-room bay at the open internal garden'}
def _bounds(ob):
 vs=[ob.matrix_world@v.co for v in ob.data.vertices]
 return [min(v[i] for v in vs) for i in range(3)]+[max(v[i] for v in vs) for i in range(3)]
def _overlap(b,r,z0=0,z1=10):return b[3]>r[0] and b[0]<r[2] and b[4]>r[1] and b[1]<r[3] and b[5]>z0 and b[2]<z1

for ob in original_objects:
 if ob.type!='MESH':continue
 name=ob.name;b=_bounds(ob);layers=[c.name for c in ob.users_collection]
 # Remove the complete ornamental porch assembly, its door and arched landing window.
 remove=(name.startswith(('Entrance porch','Entrance exterior |','House front centre arched','Entrance height |','Entrance detail v2 | Fanlight','Entrance detail v2 | Leaf','Photo detail | Entrance leaf','Front gable roof','Front gable brickwork','Roof join | Continuous front gable fascia','Roof join | Continuous porch fascia')) or name=='Landing front radiator')
 if name.startswith('Front arch correction | Landing'):remove=True   # owner: side lights bricked up too
 if 'House front centre fanlight glass' in name:remove=True
 # Owner (22 September, proposal B): the old stone step now inside the
 # entrance gallery goes; the gallery floor runs level to the old wall line.
 if name.startswith('Entrance stone step') and spec['entranceBay'].get('remove_original_step'):remove=True
 if remove:
  remove_from_proposal(ob,'P4 central front demolition: old door, porch, arch and gable replaced by continuous entrance/landing');front_report['removed'].append(name);continue
 # Keep the original bay, panes, frames, shallow roof and curtains intact.
 # This side of the link is now an outdoor garden, not an enclosed anteroom.
 if name.startswith(('Drawing bay','Front bay correction | Drawing','Drawing front curtain')) or 'Drawing bay continuous window board' in name:
  # Owner: the walls around the retained bay are rendered like the rest of the
  # modernised front; its glazing, frames, roof and curtains stay original.
  if any(m and 'brick' in m.name.lower() for m in ob.data.materials):
   n=revised_copy(ob,'Render finish on the retained drawing bay walls; geometry unchanged')
   for i,m in enumerate(n.data.materials):
    if m and 'brick' in m.name.lower():n.data.materials[i]=materials[white]
   front_report['modernised'].append(name)
  else:front_report['retained_drawing_bay'].append(name)
  continue
 # Remove all local central-front wall/window pieces within opening, trim pieces that span farther.
 eligible=any(layer.startswith(('11','12','14','21','22','24')) for layer in layers) and b[1]<.20 and b[4]<.45
 if eligible and _overlap(b,demolition,0,5.6):
  if b[0]>=demolition[0] and b[3]<=demolition[2]:
   remove_from_proposal(ob,'Open central front facade through ground and first floors');front_report['removed'].append(name);continue
  if any(layer.startswith(('11','14','21','24')) for layer in layers):
   n=revised_copy(ob,'Cut central front opening while preserving adjacent original room wall positions');cut(n,demolition,-.1,5.6);front_report['removed'].append(name)
   # Proposal render to remaining exterior brick faces.
   for i,m in enumerate(n.data.materials):
    if m and 'brick' in m.name.lower():n.data.materials[i]=materials[white]
   continue
 # Modernise only front-facing original envelope, never original interior furniture.
 if eligible and b[0]<14.15 and b[3]>-5.4:
  exterior=('front' in name.lower() or 'bay' in name.lower()) and any(layer.startswith(('11','12','21','22')) for layer in layers)
  if not exterior:continue
  # Original subdivided front windows are replaced below by simpler units in same apertures.
  window_part=any(layer.startswith(('12','22')) for layer in layers) and any(s in name.lower() for s in ['glazing','glass','frame','mullion','vent rail','window board','window latch','casement'])
  if window_part and name.startswith(('First front','Family bay','Drawing bay','House front centre','Front bay correction | Family','Front bay correction | Drawing')):
   remove_from_proposal(ob,'Modern front window frames in retained opening; original model retains historic design');front_report['modernised'].append(name);continue
  if any(m and 'brick' in m.name.lower() for m in ob.data.materials):
   n=revised_copy(ob,'Modernise original front with render finish, preserving wall geometry')
   for i,m in enumerate(n.data.materials):
    if m and 'brick' in m.name.lower():n.data.materials[i]=materials[white]
   front_report['modernised'].append(name)
# Collision apertures match the actual demolition, including removed arch sill at first floor.
for ob in original_objects:
 if ob.type!='MESH' or ob.name in excluded:continue
 if ob.name not in ('Garage front curved parapet','Roof join | Garage front masonry head'):continue
 n=revised_copy(ob,'Render the retained garage parapet and masonry head to match the modernised original front; shape unchanged')
 for i,m in enumerate(n.data.materials):
  if m and 'brick' in m.name.lower():n.data.materials[i]=materials[white]
 front_report['modernised'].append(ob.name)

for w in nav['walls']:
 if w['name'] in ('House front centre','First front'):
  ax,ay=w['a'];bx,by=w['b'];length=math.dist(w['a'],w['b']);ux=(bx-ax)/length
  d0=(5.80-ax)/ux;d1=(8.89-ax)/ux;left,right=sorted((d0,d1))
  kept=[]
  for hole in w['openings']:
   l=hole[0]-hole[1]/2;r=hole[0]+hole[1]/2
   if r<=left or l>=right:kept.append(hole)
  w['openings']=kept+[[.5*(left+right),right-left,0,2.60 if w['floor']==0 else 2.45,'open']]
  w['projected_x_span']=None;w['front_projection_m']=0
# Remove the old original front door's interactive leaf definition; it no longer exists here.
nav['interactiveDoors']=[d for d in nav['interactiveDoors'] if any(m not in excluded for m in d['members'])]
nav['obstacles']=[o for o in nav['obstacles'] if o.get('name') not in excluded and not any(t in o.get('name','').lower() for t in ['porch column','porch plinth','landing front radiator'])]
# Modern windows share original plan apertures. Central original entrance is now fully open.
for w in nav['walls']:
 if w['name']=='First front':
  length=math.dist(w['a'],w['b']);u=[(w['b'][k]-w['a'][k])/length for k in (0,1)]
  for index,(center,width,sill,head,kind) in enumerate(w['openings']):
   if kind!='window':continue
   a=[w['a'][k]+u[k]*(center-width/2) for k in (0,1)];b=[w['a'][k]+u[k]*(center+width/2) for k in (0,1)]
   glazing('Proposal | Modern original upper window '+str(index),a,b,2.8+sill,2.8+head,L,3 if width>1 else 1)
 if w['name'].startswith('Family bay') or w['name']=='House front centre':
  length=math.dist(w['a'],w['b']);u=[(w['b'][k]-w['a'][k])/length for k in (0,1)]
  for index,(center,width,sill,head,kind) in enumerate(w['openings']):
   if kind!='window':continue
   a=[w['a'][k]+u[k]*(center-width/2) for k in (0,1)];b=[w['a'][k]+u[k]*(center+width/2) for k in (0,1)]
   if w['name']=='House front centre' and width<.6:
    # Owner: the narrow window fragment beside the new link is bricked up.
    # Its aperture (x 5.20..5.60) sits in the 440 mm projected facade, so the
    # infill fills that exact aperture and depth, not the 230 mm plan line.
    box('Proposal | Bricked-up front centre window',(5.40,-.11,(sill+head)/2),(.40,.44,head-sill),white,L)
    w['openings'][index]=[center,width,sill,head,'blocked']
    front_report['removed'].append('House front centre window '+str(index)+' (bricked up)');continue
   glazing('Proposal | Modern retained bay '+w['name']+str(index),a,b,sill,head,L,1)
  w['openings']=[o for o in w['openings'] if o[4]!='blocked']
# Owner: the west landing side light above it is bricked up too. Its window
# parts are already removed; fill the aperture left between the corrected
# wall pieces 5 and 6 (x 5.18..5.82, z 3.55..4.77) to the projected depth.
box('Proposal | Bricked-up landing side light',(5.50,-.11,4.16),(.64,.44,1.22),white,L)
front_report['removed'].append('First front west side light (bricked up)')
# The drawing bay retains the original wall/window collision apertures.
# Fully close central arrival floor/ceiling across former front-wall line; no false exterior arch.
slab('Proposal | Ground entrance junction threshold',[5.8,-.3,8.89,.28],0,.16,stone,L)
slab('Proposal | First landing junction threshold',[5.8,-.3,7.74,.28],2.8,.20,oak,L)
# Framing depths are indicative architecture; a structural engineer must design actual load transfer.
wall('Proposal | Original ground junction lintel',[5.80,0],[8.89,0],2.60,2.80,plaster,L,.23,False)
wall('Proposal | Original first junction lintel',[5.80,0],[8.89,0],5.25,5.45,plaster,L,.23,False)
# Seamless modern finish on original garage door, without changing its retractable motion.
for d in nav['interactiveDoors']:
 if d.get('motion')!='retractable-garage':continue
 mapped=[]
 for name in d['members']:
  ob=bpy.data.objects.get(name)
  if not ob or ob.type!='MESH':mapped.append(name);continue
  n=revised_copy(ob,'Re-finish retained original garage door in timber to match new entrance wing')
  for i,m in enumerate(n.data.materials):
   if m and ('White' in m.name or 'plaster' in m.name.lower()):n.data.materials[i]=materials[oak]
  mapped.append(n.name)
 d['members']=mapped
# Keep original hidden legacy pieces hidden even when a proposal copy is created.
for change in changes:
 if change['original'] in nav['hiddenObjects']:
  candidate='Proposal revision | '+change['original']
  if bpy.data.objects.get(candidate):nav['hiddenObjects'].append(candidate)
g['proposal_front_review']=front_report
(OUT/'front-review.json').write_text(json.dumps(front_report,indent=2))

if spec['entranceBay'].get('remove_original_step'):
 nav['surfaces']=[q for q in nav['surfaces'] if not q.get('name','').startswith('Entrance stone step')]
