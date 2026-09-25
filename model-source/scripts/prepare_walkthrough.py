"""Prepare navigation and locally served model assets from the R5 deliverable."""
import json,math,shutil,struct
from pathlib import Path
from circulation_geometry import furniture_footprints
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output-walkthrough';PUB=ROOT/'walkthrough/public'
PUB.mkdir(parents=True,exist_ok=True)
if (OUT/'Ashley Heights.glb').stat().st_mtime < max((OUT/'geometry.json').stat().st_mtime,(OUT/'Ashley Heights.blend').stat().st_mtime):
 raise RuntimeError('The native/geometry files are newer than the GLB. Finish the model export before preparing the walkthrough.')
g=json.loads((OUT/'geometry.json').read_text());surfaces=[];obstacles=[];hidden=[]
summer=next(r for r in g['rooms']if r['name']=='Summer house')
summer_y=(min(p[1]for p in summer['polygon_m'])+max(p[1]for p in summer['polygon_m']))/2

# Keep the native hinge assemblies for interactive doors. Hinge transforms are
# read from the same GLB that is served, so no parallel guessed pivots/export is
# needed. glTF uses (x, z, -y); navigation retains Blender's (x, y, z).
def gate_navigation(model):
 """Runtime-only hinges and a bounded road approach; native gates are open."""
 site=model['site'];a,b=site['gate_endpoints_m'];ra,rb=site['gate_road_endpoints_m']
 length=math.dist(a,b);u=[(b[k]-a[k])/length for k in range(2)]
 road_length=math.dist(ra,rb);road_u=[(rb[k]-ra[k])/road_length for k in range(2)]
 inward=[road_u[1],-road_u[0]];mid=[(a[k]+b[k])/2 for k in range(2)];road_mid=[(ra[k]+rb[k])/2 for k in range(2)]
 if sum((mid[k]-road_mid[k])*inward[k]for k in range(2))<0:inward=[-v for v in inward]
 hinges=[[a[k]+u[k]*.31 for k in range(2)],[b[k]-u[k]*.31 for k in range(2)]]
 moving=[o for o in model['objects']if o['name']in('Open gate horizontal rail','Open gate vertical bar','Gate finial','Gate iron scroll')]
 groups=[[],[]]
 for obj in moving:
  center=[sum(v[k]for v in obj['vertices'])/len(obj['vertices'])for k in range(2)]
  # Both original leaves point inward. Their perpendicular distance to each
  # native hinge line uniquely assigns every scroll/bar/finial to its leaf.
  index=min(range(2),key=lambda i:abs((center[0]-hinges[i][0])*u[0]+(center[1]-hinges[i][1])*u[1]))
  groups[index].append(obj)
 doors=[]
 for index,objects in enumerate(groups):
  if not objects:raise ValueError('Entrance gate leaf is missing')
  rails=[o for o in objects if o['name']=='Open gate horizontal rail']
  verts=[v for o in rails for v in o['vertices']]
  centre=[sum(v[k]for v in verts)/len(verts)for k in range(3)]
  current=[centre[k]-hinges[index][k]for k in range(2)];closed=[v*(1 if index==0 else -1)for v in u]
  delta=math.atan2(current[0]*closed[1]-current[1]*closed[0],sum(current[k]*closed[k]for k in range(2)))
  doors.append({'id':'Assembly | Entrance gate '+('south'if index==0 else'north'),
   'wall':'Entrance driveway gates','hinge':[*hinges[index],0],'members':[o['object_name']for o in objects],
   'openingCenter':[*mid,0],'apertureAxis':u,'apertureWidth':site['gate_clear_width_m'],
   'openDelta':0,'closedDelta':delta,'openDistance':2.9,'closeDistance':3.6,'responseRate':3.5,
   'nativeParent':None,'nativeLeafCentre':centre,
   'source':['2445684-1','2445684-3'],'motionEstimate':'Existing inward-open iron leaves swing about their observed inner gatepost axes; motor timing estimated'})
 # A runtime aperture record lets the existing doorway tests and navigation
 # treat this opening uniformly; it contributes no masonry across the drive.
 wall={'name':'Entrance driveway gates','floor':0,'a':list(a),'b':list(b),'thickness_m':.01,
       'external':True,'openings':[[length/2,length,0,2.9,'double']],
       'runtime_only':True,'basis':'Existing gatepost and iron-leaf coordinates; fixed posts are separate collision objects'}
 south=[ra[k]+road_u[k]*.235 for k in range(2)];north=[rb[k]-road_u[k]*.235 for k in range(2)]
 polygon=[[south[k]-inward[k]*3.2 for k in range(2)],
          [north[k]-inward[k]*3.2 for k in range(2)],
          [hinges[1][k]+inward[k]*1.0 for k in range(2)],
          [hinges[0][k]+inward[k]*1.0 for k in range(2)]]
 approach={'name':'Road-side gate approach','polygon':polygon,'z':0,
           'basis':'Narrow runtime walking apron derived from actual flared gate endpoints; road extent is estimated'}
 arrival={'id':'arrival','label':'Outside front gates','group':'Outside',
          'position':[*(road_mid[k]-inward[k]*2.2 for k in range(2)),0],'direction':inward}
 obstacles=[]
 for o in model['objects']:
  if o['name'].startswith('Entrance gate brick pier ')or(o['name'].startswith('Gate connector | ')and o['name'].endswith('outer terminal pier')):
   lo=[min(v[k]for v in o['vertices'])for k in range(3)];hi=[max(v[k]for v in o['vertices'])for k in range(3)]
   obstacles.append({'name':o['name'],'box':[lo[0],lo[1],hi[0],hi[1]],'bottom':lo[2],'top':hi[2]})
 return {'doors':doors,'wall':wall,'approachSurface':approach,'arrival':arrival,'obstacles':obstacles}

def interactive_doors(model, glb_path):
 import numpy as np
 payload=glb_path.read_bytes();size,kind=struct.unpack_from('<II',payload,12)
 if kind!=0x4e4f534a:raise ValueError('GLB must start with its JSON chunk')
 gltf=json.loads(payload[20:20+size]);nodes=gltf.get('nodes',[])
 parents={child:i for i,node in enumerate(nodes)for child in node.get('children',[])}
 objects={o['object_name']:o for o in model['objects']};worlds={}
 def world(i):
  if i in worlds:return worlds[i]
  n=nodes[i]
  if 'matrix'in n:local=np.asarray(n['matrix']).reshape(4,4,order='F')
  else:
   x,y,z,w=n.get('rotation',[0,0,0,1]);local=np.eye(4)
   local[:3,:3]=np.array([[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w)], [2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w)], [2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y)]])@np.diag(n.get('scale',[1,1,1]))
   local[:3,3]=n.get('translation',[0,0,0])
  worlds[i]=world(parents[i])@local if i in parents else local
  return worlds[i]
 def descendants(i):
  out=[]
  if 'mesh'in nodes[i]:out.append(nodes[i].get('name',''))
  for child in nodes[i].get('children',[]):out.extend(descendants(child))
  return out
 mappings=[('Assembly | Photo detail | Entrance leaf','House front centre',[0,1]),
           ('Assembly | Drawing door photo |','Drawing hall partition',[1,0]),
           ('Assembly | Dining door photo |','Dining hall doors',[0,1]),
           ('Rear bay detail | West French','Dining left bay',None),
           ('Rear bay detail | Centre French','Dining rear French doors',None),
           ('Rear bay detail | East French','Dining right bay',None),
           ('Rear bay detail | Bedroom 3','Bedroom 3 balcony door',None),
           ('Rear bay detail | Principal','Principal balcony door',None),
           ('Drawing rear detail | Pair','Drawing rear',[0,1])]
 doors=[]
 for i,node in enumerate(nodes):
  name=node.get('name','');match=next((m for m in mappings if name.startswith(m[0])and('children'in node)and(name.startswith('Assembly |')or name.endswith(' hinge'))),None)
  if not match:continue
  members=[n for n in descendants(i)if n in objects and not objects[n].get('walkthrough_keep_visible')]
  if not members:continue
  wall=next(w for w in model['walls']if w['name']==match[1]);op=next(op for op in wall['openings']if op[4]in('entry','double','door','french'))
  ax,ay=wall['a'];bx,by=wall['b'];length=math.hypot(bx-ax,by-ay);u=((bx-ax)/length,(by-ay)/length)
  target=match[2]or[-u[1],u[0]]
  p=world(i)[:3,3];hinge=[float(p[0]),float(-p[2]),float(p[1])]
  primary=next((objects[n]for n in members if any(k in n for k in('panelled leaf','leaf backing','clear glass'))),objects[members[0]])
  centre=[sum(v[k]for v in primary['vertices'])/len(primary['vertices'])for k in range(3)]
  d=[centre[0]-hinge[0],centre[1]-hinge[1]]
  delta=math.atan2(d[0]*target[1]-d[1]*target[0],d[0]*target[0]+d[1]*target[1])
  doors.append({'id':name,'hinge':hinge,'members':members,'openingCenter':[ax+u[0]*op[0],ay+u[1]*op[0],wall['floor']*2.8],
                'openDelta':delta,'openDistance':1.8,'closeDistance':2.4,'wall':wall['name'],'nativeParent':name,
                'apertureWidth':op[1],'nativeLeafCentre':centre})
  if name.startswith('Drawing rear detail | Pair'):
   review=model['drawing_rear_doors_review']
   leaf=next(v for v in review['leaves']if v['hinge']==name)
   passage=next(v for v in review['passages']if v['id']==leaf['pair_id'])
   doors[-1].update(openingCenter=passage['opening_center_m'],openDelta=leaf['open_delta_rad'],
                    apertureWidth=passage['clear_width_m'],activationSet=review['activation_set'],activationGroup=leaf['pair_id'])
 # Added exterior hardware was not parented by the native entrance helper.
 # Attach it to the correct moving leaf instead of leaving floating knobs.
 entrance=[d for d in doors if d['wall']=='House front centre']
 for o in model['objects']:
  if entrance and o['name'].startswith('Entrance exterior | Door ')and any(k in o['name']for k in('knob rose','peephole')):
   cx=sum(v[0]for v in o['vertices'])/len(o['vertices']);door=min(entrance,key=lambda d:abs(cx-d['nativeLeafCentre'][0]));door['members'].append(o['object_name'])
 # Original2445664-0/1/2/3 shows a rigid braced up-and-over leaf, side tracks
 # and an overhead opener. Keep every applied panel and brace on one assembly;
 # the fixed tracks, frame and opener remain part of the static house.
 garage=next((w for w in model['walls']if w['name']=='Garage front'),None)
 if garage:
  op=next(o for o in garage['openings']if o[4]=='garage')
  ax,ay=garage['a'];bx,by=garage['b'];length=math.hypot(bx-ax,by-ay);ux,uy=(bx-ax)/length,(by-ay)/length
  cx,cy=ax+ux*op[0],ay+uy*op[0]
  leaf=next(o for o in model['objects']if o['name']=='Garage front | garage door')
  lo=[min(v[k]for v in leaf['vertices'])for k in range(3)];hi=[max(v[k]for v in leaf['vertices'])for k in range(3)]
  members=[]
  for o in model['objects']:
   n=o['name']
   moving=(n.startswith(('Garage front | garage','Garage raised door panel','Garage central door stile','Photo detail | Garage inner door','Photo detail | Garage door diagonal'))
           or n.startswith('Garage front')and any(t in n.lower()for t in ('handle','knob','lock')))
   if moving:members.append(o['object_name'])
  mesh_nodes={n.get('name','')for n in nodes if 'mesh'in n}
  missing=set(members)-mesh_nodes
  if missing:raise ValueError('Garage moving pieces missing from GLB: '+', '.join(sorted(missing)))
  height=hi[2]-lo[2];inward=(uy,-ux)
  # The unknown linkage path is estimated. The rigid panel tilts outward then
  # retracts beneath the photographed tracks. Its complete depth envelope stays
  # below the fixed lintel and clears a standing visitor when overhead.
  vertices=[v for o in model['objects']if o['object_name']in members for v in o['vertices']]
  front_depth=max(-(v[0]-cx)*inward[0]-(v[1]-cy)*inward[1]for v in vertices)
  open_pivot_z=garage['floor']*2.8+op[3]-front_depth-.03
  doors.append({'id':'Assembly | Garage up-and-over door','motion':'retractable-garage',
                'hinge':[cx,cy,hi[2]],'members':members,'openingCenter':[cx,cy,garage['floor']*2.8],
                'rotationAxis':[ux,uy,0],'apertureAxis':[ux,uy],
                'openTranslation':[inward[0]*height*.93,inward[1]*height*.93,open_pivot_z-hi[2]],
                'openDelta':math.pi/2,'openDistance':3.2,'closeDistance':4.3,'responseRate':4,
                'wall':garage['name'],'nativeParent':None,'apertureWidth':op[1],
                'nativeLeafCentre':[(lo[k]+hi[k])/2 for k in range(3)],
                'source':['2445664-0','2445664-1','2445664-2','2445664-3'],
                'motionEstimate':'Rigid retractable up-and-over mechanism observed; linkage travel and motor speed estimated'})
 # Photographed internal door leaves (cloakroom, family room pair, kitchen) have no native hinge
 # helper: each becomes a hinged door from its own parts, hinged on the side away from its lever
 # and swinging into the room the door is named after.
 mesh_nodes={n.get('name','')for n in nodes if 'mesh'in n}
 taken={m for d in doors for m in d['members']}
 assemblies={}
 for o in model['objects']:
  a=o.get('assembly') or ''
  if a.startswith('Photo detail |') and ' door leaf ' in a:assemblies.setdefault(a,[]).append(o)
 for a,parts in sorted(assemblies.items()):
  members=[o['object_name'] for o in parts if o['object_name'] in mesh_nodes and o['object_name'] not in taken]
  body=[v for o in parts if not any(k in o['name'] for k in('lever','knob','rose')) for v in o['vertices']]   # panelled or glazed leaf
  wall=next((w for w in model['walls'] if w['name']==a[len('Photo detail | '):].rsplit(' leaf ',1)[0]),None)
  if not members or not body or wall is None:continue
  op=next((q for q in wall['openings'] if q[4] in('door','double','entry')),None)
  if op is None:continue
  ax,ay=wall['a'];bx,by=wall['b'];L=math.hypot(bx-ax,by-ay);u=((bx-ax)/L,(by-ay)/L)
  lv=[v for o in parts if any(k in o['name'] for k in('lever','knob')) for v in o['vertices']] or body
  along=lambda v:(v[0]-ax)*u[0]+(v[1]-ay)*u[1]
  s0=min(along(v) for v in body);s1=max(along(v) for v in body);sl=sum(along(v) for v in lv)/len(lv)
  sh=s1 if abs(sl-s0)<abs(sl-s1) else s0
  cx=sum(v[0] for v in body)/len(body);cy=sum(v[1] for v in body)/len(body)
  off=(cx-ax)*(-u[1])+(cy-ay)*u[0]
  hinge=[ax+u[0]*sh-u[1]*off,ay+u[1]*sh+u[0]*off,min(v[2] for v in body)]
  room=next((r for r in model['rooms'] if r.get('floor')==wall.get('floor',0) and r['name'].split()[0]==wall['name'].split()[0]),None)
  n=[-u[1],u[0]];oc=[ax+u[0]*op[0],ay+u[1]*op[0]]
  if room:
   rx=sum(q[0] for q in room['polygon_m'])/len(room['polygon_m']);ry=sum(q[1] for q in room['polygon_m'])/len(room['polygon_m'])
   if (rx-oc[0])*n[0]+(ry-oc[1])*n[1]<0:n=[-n[0],-n[1]]
  d=[cx-hinge[0],cy-hinge[1]]
  delta=math.atan2(d[0]*n[1]-d[1]*n[0],d[0]*n[0]+d[1]*n[1])
  doors.append({'id':'Assembly | '+a,'hinge':hinge,'members':members,'openingCenter':[oc[0],oc[1],wall.get('floor',0)*2.8],
                'openDelta':delta,'openDistance':1.8,'closeDistance':2.4,'wall':wall['name'],'nativeParent':None,
                'apertureWidth':op[1],'nativeLeafCentre':[cx,cy,hinge[2]+1.0],'source':'photographed leaf, hinge opposite its lever'})
 gates=gate_navigation(model)['doors']
 mesh_nodes={n.get('name','')for n in nodes if 'mesh'in n}
 missing={member for door in gates for member in door['members']}-mesh_nodes
 if missing:raise ValueError('Entrance gate moving pieces missing from GLB: '+', '.join(sorted(missing)))
 doors.extend(gates)
 return doors

doors=interactive_doors(g,OUT/'Ashley Heights.glb')
dynamic_members={name for d in doors for name in d['members']}

def bounds(o):return [(min(v[i] for v in o['vertices']),max(v[i] for v in o['vertices'])) for i in range(3)]
def surface(o):
 z=max(v[2] for v in o['vertices'])
 for face in o['faces']:
  if all(abs(o['vertices'][i][2]-z)<1e-4 for i in face):surfaces.append({'polygon':[o['vertices'][i][:2]for i in face],'z':z,'name':o['name']})
for o in g['objects']:
 n=o['name'];layer=o['layer'];bb=bounds(o)
 if layer in ('10 Ground floor - floors','20 First floor - floors') or n=='Balcony deck' or (layer=='40 Outbuildings' and n.endswith('floor')):surface(o)
 # Leaves are omitted only from the presentation copy; all native editable doors remain.
 leaf=any(k in n for k in ('panelled leaf','raised door panel','panel bead','brass knob','glazed door '))
 leaf |= o.get('walkthrough_opening_leaf',False)
 leaf |= n.startswith('Photo detail | Garage inner door') or n.startswith('Photo detail | Garage door diagonal')
 leaf |= n in ('Outside WC door','Tool store door')
 leaf |= n.startswith('Garage front | garage') or n.startswith(('Garage raised door panel','Garage central door stile'))
 if layer=='40 Outbuildings' and n.startswith(('Summer house glazed light','Summer house lower panel','Summer house horizontal frame','Summer house vertical frame')):
  leaf |= summer_y-.87<(bb[1][0]+bb[1][1])/2<summer_y+.87
 # French-door glazing and applied Georgian bars go with the moving leaves.
 for w in g['walls']:
  if not n.startswith(w['name']):continue
  if any(op[4]=='french' for op in w['openings']) and layer.endswith('Doors and windows'):
   leaf |= any(k in n for k in ('clear glass','door stile','Georgian','door lever','fanlight glass','fanlight spoke'))
 # Hardware belonging to any legacy omitted architectural door follows it.
 for w in g['walls']:
  if n.startswith(w['name']) and any(op[4]in('entry','door','double','french')for op in w['openings']):
   leaf |= any(k in n.lower()for k in('door handle','door lever','handle backplate','brass knob','escutcheon','peephole','key slot'))
 # Photo-detail doors with no interactive replacement near them stay whole: hiding their
 # leaf and beads but not their raised panels left see-through, broken-looking doors.
 if leaf and n.startswith('Photo detail |') and not any(math.hypot((bb[0][0]+bb[0][1])/2-d['hinge'][0],(bb[1][0]+bb[1][1])/2-d['hinge'][1])<1.6 for d in doors):leaf=False
 if leaf and not o.get('walkthrough_keep_visible',False) and o['object_name']not in dynamic_members:hidden.append(o['object_name'])
 if o.get('walkthrough_keep_visible') and 'door leaf backing' in n:
  obstacles.append({'name':n,'box':[bb[0][0],bb[1][0],bb[0][1],bb[1][1]],'bottom':bb[2][0],'top':bb[2][1]})
 if o['object_name']in g.get('drawing_rear_doors_review',{}).get('fixed_divider_objects',[]):
  obstacles.append({'name':n,'box':[bb[0][0],bb[1][0],bb[0][1],bb[1][1]],'bottom':bb[2][0],'top':bb[2][1]})
 if n.startswith('Entrance porch round column'):
  obstacles.append({'name':n,'box':[bb[0][0],bb[1][0],bb[0][1],bb[1][1]],'bottom':bb[2][0],'top':bb[2][1]})
 # Garden room walls (not part of house wall_specs).
 if layer=='40 Outbuildings' and ('wall' in n or 'front pier' in n):
  obstacles.append({'name':n,'box':[bb[0][0],bb[1][0],bb[0][1],bb[1][1]],'bottom':bb[2][0],'top':bb[2][1]})
 if layer=='23 Balcony' and n.startswith('Balcony brick'):
  obstacles.append({'name':n,'box':[bb[0][0],bb[1][0],bb[0][1],bb[1][1]],'bottom':bb[2][0],'top':bb[2][1]})
# Derive collision outlines from the same furniture meshes used by the doorway
# audit, including individual chairs and bookcases and their actual rotations.
# The closed lift cover and its rim support a foot across their 4 mm clearance.
# A point-only sampler would otherwise treat this construction joint as a hole.
cover=[o for o in g['objects'] if o['name'].startswith('Through-floor lift | Floor cover carpeted upper face')]
rims=[o for o in g['objects'] if o['name'].startswith('Through-floor lift | Upper cover rim')]
if cover and rims:
 vertices=[v for o in rims for v in o['vertices']]
 xa,xb=min(v[0]for v in vertices),max(v[0]for v in vertices)
 ya,yb=min(v[1]for v in vertices),max(v[1]for v in vertices)
 surfaces.append({'name':'Closed lift cover and rim walk surface',
                  'polygon':[[xa,ya],[xb,ya],[xb,yb],[xa,yb]],
                  'z':max(v[2]for v in cover[0]['vertices'])})
for f in furniture_footprints(g):
 obstacles.append({'name':f['name'],'polygon':list(f['polygon'].exterior.coords)[:-1],
                   'bottom':f['bottom'],'top':f['top']})
# Raised landing rails and ground-level sloping side of the staircase.
segments=g.get('site',{}).get('boundary_segments',[])+[{'a':[7.82,1.04],'b':[7.82,3.10],'thickness':.045,'bottom':2.72,'top':3.8,'name':'Landing rail'},
 {'a':[7.82,3.10],'b':[8.88,3.10],'thickness':.045,'bottom':2.72,'top':3.8,'name':'Landing rear rail'},
 {'a':[7.84,1.03],'b':[7.84,3.55],'thickness':.035,'bottom':0,'top':2.7,'name':'Stair side'}]
if g.get('stair_dining_owner_review'):
 stair=g['stair_dining_owner_review']
 side=next(s for s in segments if s['name']=='Stair side')
 side['a'][0]=side['b'][0]=stair['stair_hall_side_x_m']+.0375;side['thickness']=.075
# Display recesses are solid corner walls as well as fittings. Their true
# footprint must block walking rather than letting the viewer enter them.
from shapely.geometry import MultiPoint
for o in g['objects']:
 if o['name'].startswith('Owner interior detail | ') and o['name'].endswith('chamfered wall'):
  bb=bounds(o);poly=MultiPoint([v[:2]for v in o['vertices']]).convex_hull
  obstacles.append({'name':o['name'],'polygon':list(poly.exterior.coords)[:-1],'bottom':bb[2][0],'top':bb[2][1]})
balcony=next(o for o in g['objects'] if o['name']=='Balcony deck');poly=next(s['polygon'] for s in surfaces if s['name']=='Balcony deck')
for a,b in zip(poly,poly[1:]+poly[:1]):
 cutoff=g.get('exterior_owner_review',{}).get('balcony_side_rail_start_y_m',8.84)
 if max(a[1],b[1])<=cutoff:continue
 a,b=list(a),list(b)
 if min(a[1],b[1])<cutoff:
  low,high=(a,b) if a[1]<b[1] else (b,a)
  t=(cutoff-low[1])/(high[1]-low[1]);low[0]+=t*(high[0]-low[0]);low[1]=cutoff
 segments.append({'a':a,'b':b,'thickness':.035,'bottom':2.8,'top':3.86,'name':'Balcony rail'})
views={v['key']:v for v in json.loads((ROOT/'photo-review/views.json').read_text())}
room_keys=['2445658-3','2445659-0','2445666-0','2445661-0','2445662-0','2445663-0','2445660-0','2445664-0','2445670-3','2445673-0','2445675-0','2445672-0','2445679-0','2445676-0','2445677-0','2445678-0','2445671-0','2445674-1','2445694-0']
rooms=[]
for key in room_keys:
 v=views[key];f=1 if v['floor']==1 else 0
 rooms.append({'id':key,'label':v['room'],'group':'First floor' if f else ('Garden' if v['id']==2445694 else 'Ground floor'),'position':[v['position'][0],v['position'][1],2.8 if f else 0],'direction':v['direction'][:2]})
rooms += [{'id':'front','label':'Front of house','group':'Outside','position':[2,-14,0],'direction':[.24,.97]}, {'id':'garden','label':'Back garden','group':'Garden','position':[5.2,18,0],'direction':[.12,-1]},{'id':'outbuildings','label':'Garden building','group':'Garden','position':[10.6,21.5,0],'direction':[1,0]}]
# Natural walking start, away from door leaves and walls.
rooms[0]['position']=[6.98,4.1,0]
rooms[1]['position']=[7.8,6.2,0]
next(r for r in rooms if r['id']=='2445663-0')['position']=[-1.05,7.62,0]
rooms[10]['label']='Principal en suite'
rooms[14]['label']='Bedroom 4 en suite'
rooms += [{'id':'fountain','label':'Driveway fountain','group':'Outside','position':[6.2,-9,0],'direction':[1,-.3]},{'id':'rearstrip','label':'Rear garden strip','group':'Garden','position':[-13,23.4,0],'direction':[-1,0]},{'id':'gates','label':'Entrance gates','group':'Outside','position':[1,-14.2,0],'direction':[-1,-.6]}]
fc=g['site']['fountain_center_m']
gc=g['site']['gate_center_m']
for r in rooms:
 if r['id']=='fountain':r.update(position=[fc[0]-3.6,fc[1]+1.4,0],direction=[3.6,-1.4])
 if r['id']=='gates':r.update(position=[gc[0]+3.4,gc[1]+1.8,0],direction=[-3.4,-1.8])
obstacles.append({'name':'Fountain basin','box':[fc[0]-1.49,fc[1]-1.49,fc[0]+1.49,fc[1]+1.49],'bottom':0,'top':1.12})
if g.get('side_annex'):
 rooms.append(g['side_annex']['navigation']['suggested_shortcut'])
_terrain={k:v for k,v in (g.get('site',{}).get('terrain') or {}).items() if k in ('x0','y0','step','nx','ny','z','source','datum')} or None   # real ground levels (EA LIDAR), walkers follow them
if _terrain:
    # Inside the house the ground-floor slab is the floor: the grid is held at ±0.00 under the
    # ground-floor rooms (0.35 m out, for the walls), so garden levels never lift a room.
    from shapely.geometry import Polygon as _TPoly, Point as _TPt
    from shapely.ops import unary_union as _tunion
    _house=_tunion([_TPoly(r['polygon_m']).buffer(.35) for r in g['rooms'] if r.get('floor')==0 and len(r.get('polygon_m',[]))>=3])
    _tz=list(_terrain['z'])
    for _i in range(_terrain['ny']):
        for _j in range(_terrain['nx']):
            if _house.contains(_TPt(_terrain['x0']+_j*_terrain['step'],_terrain['y0']+_i*_terrain['step'])):_tz[_i*_terrain['nx']+_j]=0.0
    _terrain['z']=_tz
    def _tground(x,y):
        T=_terrain;fx=(x-T['x0'])/T['step'];fy=(y-T['y0'])/T['step']
        if fx<0 or fy<0 or fx>=T['nx']-1 or fy>=T['ny']-1:return 0.0
        j,i=int(fx),int(fy);a_,b_=fx-j,fy-i;z=lambda ii,jj:T['z'][ii*T['nx']+jj]
        return z(i,j)*(1-a_)*(1-b_)+z(i,j+1)*a_*(1-b_)+z(i+1,j)*(1-a_)*b_+z(i+1,j+1)*a_*b_
    _plot=_TPoly(g['site']['outline_m'])
    for r in rooms:   # viewpoints written at ±0.00 stand on the garden's own level
        x,y,z=r['position']
        if abs(z)<.05 and _plot.contains(_TPt(x,y)):r['position']=[x,y,round(_tground(x,y),3)]
data={'revision':'R5','terrain':_terrain,'walls':g['walls'],'surfaces':surfaces,'obstacles':obstacles,'segments':segments,'rooms':rooms,'planRooms':g['rooms'],'hiddenObjects':hidden,'interactiveDoors':doors,'eyeHeight':1.60,'levelHeight':2.80,'bounds':[-29,-23,21,34],'site':g.get('site',{}),'materials':g['materials']}
gate_data=gate_navigation(g)
data['walls']=[*data['walls'],gate_data['wall']]
data['obstacles'].extend(gate_data['obstacles'])
data['rooms'].append(gate_data['arrival'])
data['approachSurface']=gate_data['approachSurface']
if g.get('stair_dining_owner_review'):
 data['stair']={'boundsX':g['stair_dining_owner_review']['stair_bounds_x_m']}
from datetime import datetime, timezone
data['modelUpdatedAt']=datetime.fromtimestamp((OUT/'Ashley Heights.blend').stat().st_mtime,timezone.utc).isoformat()
(PUB/'navigation.json').write_text(json.dumps(data,separators=(',',':')))
shutil.copy2(OUT/'Ashley Heights.glb',PUB/'house.glb')
print('NAVIGATION',len(surfaces),'surfaces',len(obstacles),'obstacles',len(hidden),'legacy door parts omitted;',len(doors),'native hinge assemblies interactive')
