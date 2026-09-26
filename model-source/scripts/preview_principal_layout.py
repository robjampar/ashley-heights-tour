"""Editable, isolated suite layout study. Never overwrites a completed house.

Blender --background --python-exit-code 1 --python scripts/preview_principal_layout.py -- compact
The candidate's architecture comes from the saved house; changes are explicit
native meshes with a separate collision/navigation record and source config.
"""
import bpy,json,math,sys,copy
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
from proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1]
assert variant in ('compact','planning')
cfg=json.loads((ROOT/'proposal/interiors/principal/layout.json').read_text())
base=ROOT/('output-proposed-'+variant);nav=json.loads((base/'navigation.json').read_text())
out=ROOT/'walkthrough/public/interiors/principal/models';out.mkdir(parents=True,exist_ok=True)
evidence=ROOT/'revisions/interiors-principal-2026-09-26/layout'/variant;evidence.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(base/(native_name(variant)+'.blend')))
source=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=source
prefix='Suite layout | ';owned=[];obstacles=[];segments=[];removed=[]
coll=bpy.data.collections.new('Principal suite — layout study');source.collection.children.link(coll)
z=cfg['floor_z']
remove_prefixes=('Proposal | Principal bed ','Proposal | Principal sitting sofa','Proposal | Principal dressing east',
 'Proposal | Principal dressing north','Proposal | Principal dressing west','Proposal | Principal east partition',
 'Proposal | Principal study desk','Proposal | Principal study bookcase','Proposal | Principal nook dressing table','Proposal | Principal nook stool')
for ob in list(source.objects):
 name=ob.get('source_name',ob.name)
 if name.startswith(remove_prefixes):
  removed.append(name)
  for c in tuple(ob.users_collection):
   if c.name.startswith('P'):c.objects.unlink(ob)
nav['obstacles']=[o for o in nav['obstacles']if not o['name'].startswith(remove_prefixes)]
nav['segments']=[o for o in nav['segments']if not o['name'].startswith(remove_prefixes)]
nav['interactiveDoors']=[o for o in nav['interactiveDoors']if not o['id'].startswith('Proposal | Principal east partition')]

def material(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(prefix+name);m.diffuse_color=color;m.use_nodes=True
 s=m.node_tree.nodes.get('Principled BSDF');s.inputs['Base Color'].default_value=color;s.inputs['Roughness'].default_value=rough;s.inputs['Metallic'].default_value=metal
 return m
oak=bpy.data.materials['Proposal | Quiet oak pale natural oak'];stone=bpy.data.materials['Proposal | Quiet oak honed limestone'];fabric=bpy.data.materials['Proposal | Quiet oak cream upholstery']
white=material('warm chalk',(.82,.8,.75,1),.87);dark=material('shadow',(.018,.023,.025,1),.5);glass=material('screen glass',(.013,.019,.022,1),.15,.3);bronze=material('bronze',(.49,.35,.18,1),.33,.75)
linen=material('sand linen',(.61,.56,.47,1),.94);rug=material('ivory wool',(.78,.73,.65,1),.96)
def box(label,center,size,mat=oak,angle=0,bevel=.008):
 x,y,h=center;a,b,c=[v/2 for v in size];co,si=math.cos(angle),math.sin(angle)
 verts=[(x+dx*co-dy*si,y+dx*si+dy*co,h+dh)for dx,dy,dh in[(-a,-b,-c),(-a,-b,c),(-a,b,-c),(-a,b,c),(a,-b,-c),(a,-b,c),(a,b,-c),(a,b,c)]]
 # Outward winding matters for normal-offset shadow maps as well as native lighting.
 faces=[(2,6,4,0),(5,7,3,1),(4,5,1,0),(3,7,6,2),(1,3,2,0),(6,7,5,4)]
 me=bpy.data.meshes.new(prefix+label);me.from_pydata(verts,[],faces);me.update();uv=me.uv_layers.new(name='UVMap')
 for p in me.polygons:
  axes=(0,1)if abs(p.normal.z)>.6 else(1,2)if abs(p.normal.x)>abs(p.normal.y)else(0,2)
  for l in p.loop_indices:
   v=me.vertices[me.loops[l].vertex_index].co;uv.data[l].uv=(v[axes[0]],v[axes[1]])
 ob=bpy.data.objects.new(prefix+label,me);coll.objects.link(ob);me.materials.append(mat);ob['source_name']=ob.name;ob['suite_layout_revision']=cfg['revision'];owned.append(ob)
 if bevel:
  mod=ob.modifiers.new('Eased edges','BEVEL');mod.width=min(bevel,min(size)/3);mod.segments=4
  mod=ob.modifiers.new('Corner normals','WEIGHTED_NORMAL');mod.keep_sharp=True
 return ob
def obstacle(label,r,height):obstacles.append({'name':prefix+label,'box':r,'bottom':z,'top':z+height})
def rotated_box(label,c,size,angle,height):
 co,si=math.cos(angle),math.sin(angle);a,b=size[0]/2,size[1]/2
 v=[(c[0]+x*co-y*si,c[1]+x*si+y*co)for x,y in[(-a,-b),(a,-b),(a,b),(-a,b)]]
 obstacle(label,[min(p[0]for p in v),min(p[1]for p in v),max(p[0]for p in v),max(p[1]for p in v)],height)
 obstacles[-1]['polygon']=v
def part(label,c,offset,size,mat,angle=0,bevel=.008):
 dx,dy,dz=offset;co,si=math.cos(angle),math.sin(angle)
 return box(label,(c[0]+dx*co-dy*si,c[1]+dx*si+dy*co,z+dz),size,mat,angle,bevel)
def partition(label,x,ya,yb,bottom=0,top=2.55):
 box(label,(x,(ya+yb)/2,z+(bottom+top)/2),(.12,yb-ya,top-bottom),white,bevel=0)
 segments.append({'name':prefix+label,'a':[x,ya],'b':[x,yb],'bottom':z+bottom,'top':z+top,'thickness':.12})
wall=cfg['bedroom_partition'];x=wall['x'];ds=wall['door_center_y']-wall['door_width_m']/2;dn=ds+wall['door_width_m']
partition('bedroom east south pier',x,wall['south'],ds)
partition('bedroom east wall',x,dn,wall['north'])
partition('dressing doorway head',x,ds,dn,2.25,2.55)
box('north corner infill',(10.155,-8.70,z+1.275),(.39,.12,2.55),white,bevel=0)
segments.append({'name':prefix+'north corner infill','a':[9.96,-8.7],'b':[10.35,-8.7],'bottom':z,'top':z+2.55,'thickness':.12})
# Show the relocated door fully open into the dressing room, clear of its
# bathroom connection. The room-view model is an orbitable layout, not a walk mode.
box('dressing door open',(x+.45,ds,z+1.1375),(.9,.048,2.225),oak)
box('dressing door lever',(x+.77,ds+.036,z+1.03),(.115,.026,.022),bronze)
obstacle('dressing door held open',[x,ds-.024,x+.90,ds+.024],2.25)
nav['interactiveDoors'].append({'id':prefix+'dressing doorway','wall':prefix+'dressing doorway','hinge':[x,ds,z],'members':[],
 'openingCenter':[x,wall['door_center_y'],z],'apertureAxis':[0,1],'apertureWidth':.9,'openDelta':-math.pi/2,'openDistance':1.5,'closeDistance':2.0})

# New sleeping bay. Mattress dimensions stay 1.8 by 2.0 metres.
c=cfg['bed']['center'];angle=math.radians(cfg['bed']['angle_deg'])
part('bed recessed base',c,(0,0,.20),(1.90,2.06,.30),oak,angle,.04)
part('bed mattress',c,(0,0,.45),(1.80,2.0,.25),fabric,angle,.075)
part('bed duvet',c,(0,-.15,.59),(1.83,1.67,.10),fabric,angle,.045)
part('bed headboard',c,(0,1.055,.76),(2.00,.12,1.32),fabric,angle,.04)
for side in(-1,1):
 part('bed pillow '+str(side),c,(side*.45,.66,.69),(.77,.47,.18),fabric,angle,.065)
 part('bed cushion '+str(side),c,(side*.42,.40,.76),(.60,.19,.44),linen,angle,.06)
part('bed folded throw',c,(0,-.61,.66),(1.82,.48,.055),linen,angle,.02)
rotated_box('bed',c,(2.00,2.18),angle,1.42)
for i,y in enumerate((-9.03,-11.58)):
 box('bedside '+str(i),(9.96,y,z+.51),(.49,.42,.24),oak)
 box('bedside stone '+str(i),(9.96,y,z+.642),(.50,.43,.024),stone)
 box('reading light mount '+str(i),(10.271,y,z+1.01),(.026,.08,.15),bronze)
 obstacle('bedside '+str(i),[9.715,y-.215,10.21,y+.215],.66)
box('bed wool rug',(8.65,-10.34,z+.013),(2.60,2.90,.024),rug,bevel=.006)

# The sofa faces the shared television, while leaving the gable-window route clear.
c=cfg['sofa']['center'];tv=cfg['tv']['center'];angle=math.atan2(tv[1]-c[1],tv[0]-c[0])+math.pi/2
part('sofa recessed plinth',c,(0,0,.18),(2.15,.80,.20),oak,angle,.025)
for i in range(3):
 px=(i-1)*.66
 part('sofa seat '+str(i),c,(px,-.07,.43),(.65,.75,.24),fabric,angle,.065)
 part('sofa back '+str(i),c,(px,.33,.72),(.66,.21,.62),fabric,angle,.065)
for side in(-1,1):part('sofa arm '+str(side),c,(side*1.055,0,.54),(.19,.95,.62),fabric,angle,.055)
part('sofa scatter cushion',c,(-.64,.11,.72),(.5,.18,.40),linen,angle,.045)
rotated_box('sofa',c,(2.3,.95),angle,1.06)
box('sofa wool rug',(6.85,-13.37,z+.012),(2.85,2.52,.023),rug,bevel=.006)
box('sofa side table',(8.0,-12.76,z+.45),(.44,.44,.90),stone,bevel=.04)
obstacle('sofa side table',[7.78,-12.98,8.22,-12.54],.90)

# Fixed angled media joinery: both seats see the same face simultaneously.
angle=math.radians(cfg['tv']['normal_angle_deg'])+math.pi/2
c=tv;sw,sh=cfg['tv']['screen_m'];th=cfg['tv']['screen_center_height_m']
part('media backing',c,(0,.12,1.035),(2.05,.10,2.05),white,angle)
part('floating media console',c,(0,-.08,.38),(2.05,.38,.36),oak,angle,.018)
for i in range(4):part('media drawer '+str(i),c,((i-1.5)*.5,-.279,.38),(.491,.019,.31),oak,angle,.006)
part('TV case',c,(0,0,th),(sw+.035,.065,sh+.035),dark,angle,.009)
part('TV screen',c,(0,-.035,th),(sw,.009,sh),glass,angle,.003)
part('TV status light',c,(sw*.42,-.042,th-sh/2-.009),(.009,.006,.004),bronze,angle,.001)
part('soundbar',c,(0,-.14,.72),(1.08,.12,.065),dark,angle,.02)
for i in range(35):part('soundbar grille '+str(i),c,(-.49+i*.029,-.204,.72),(.008,.005,.035),bronze,angle,.001)
rotated_box('media joinery',c,(2.10,.60),angle,2.10)

def fitted_run(run):
 x0,y0,x1,y1=run['bounds'];height=run['height_m'];label='wardrobe '+run['id'];face=run['front'];length=y1-y0;count=max(1,round(length/.58));bay=length/count
 # Open carcasses expose the actual hanging/shelving arrangement in the study.
 back=x0+.013 if face=='east' else x1-.013;front=x1 if face=='east' else x0;sign=1 if face=='east'else -1
 box(label+' back',(back,(y0+y1)/2,z+height/2),(.026,length,height),oak)
 for h in(.05,height-.018):box(label+' shelf',( (x0+x1)/2,(y0+y1)/2,z+h),(x1-x0,length,.036),oak)
 for j in range(count+1):box(label+' divider '+str(j),((x0+x1)/2,y0+j*bay,z+height/2),(x1-x0,.026,height),oak)
 for j in range(count):
  yc=y0+(j+.5)*bay
  if height<1:
   for h in range(3):box(label+' drawer '+str(j)+' '+str(h),(front,yc,z+(h+.5)*(height-.08)/3+.05),(.025,bay-.034,(height-.08)/3-.014),oak)
  else:
   box(label+' upper shelf '+str(j),((x0+x1)/2,yc,z+1.92),(x1-x0,bay-.028,.028),oak)
   if j%3==2:
    for h in(.46,.87,1.27,1.63):
     box(label+' folded shelf '+str(j),((x0+x1)/2,yc,z+h),(x1-x0,bay-.028,.023),oak)
     box(label+' folded linen '+str(j),((x0+x1)/2,yc,z+h+.07),(.36,bay-.11,.11),fabric,bevel=.022)
   else:
    box(label+' hanging rail '+str(j),((x0+x1)/2,yc,z+1.80),(.023,bay-.06,.023),bronze,bevel=.005)
    for k in range(4):
     yy=yc+(k-1.5)*bay/5
     box(label+' hanging garment '+str(j)+' '+str(k),((x0+x1)/2,yy,z+1.29),(.40,.055,.82),fabric if k%2 else linen,bevel=.017)
    for h in(.17,.39):box(label+' lower drawer '+str(j),(front,yc,z+h),(.025,bay-.035,.20),oak)
   box(label+' warm light channel '+str(j),(front-sign*.035,yc,z+height-.066),(.018,bay-.04,.01),bronze,bevel=.001)
 obstacle(label,run['bounds'],height)
for run in cfg['wardrobes']:fitted_run(run)
x0,y0,x1,y1=cfg['island']['bounds'];height=cfg['island']['height_m']
box('dressing island',((x0+x1)/2,(y0+y1)/2,z+height/2),(x1-x0,y1-y0,height),oak)
box('dressing island stone',((x0+x1)/2,(y0+y1)/2,z+height+.018),(x1-x0+.02,y1-y0+.02,.036),stone)
for side in(-1,1):
 for j in range(3):box('island drawer',((x0+x1)/2+side*(x1-x0)/2,(y0+y1)/2,z+.18+j*.23),(.02,y1-y0-.03,.215),oak)
obstacle('dressing island',cfg['island']['bounds'],height+.04)

# Compact window work niche: 1.5 × 0.6 m rather than a separate office.
x0,y0,x1,y1=cfg['desk']['bounds'];c=((x0+x1)/2,(y0+y1)/2)
box('desk top',(*c,z+.745),(x1-x0,y1-y0,.05),oak)
for xx in(x0+.06,x1-.06):box('desk side',(xx,c[1],z+.36),(.08,y1-y0-.06,.72),oak)
box('desk closed laptop',(c[0],c[1],z+.79),(.35,.24,.015),dark)
box('desk lamp stem',(x1-.17,c[1]+.10,z+.96),(.025,.025,.37),bronze)
box('desk lamp head',(x1-.17,c[1]+.06,z+1.14),(.17,.16,.04),white,bevel=.014)
obstacle('desk',cfg['desk']['bounds'],.81)
cx,cy=cfg['desk']['chair'];box('desk chair seat',(cx,cy,z+.46),(.49,.50,.10),fabric,bevel=.045)
box('desk chair back',(cx,cy-.21,z+.73),(.49,.075,.53),fabric,bevel=.025)
for dx in(-.18,.18):
 for dy in(-.18,.18):box('desk chair leg',(cx+dx,cy+dy,z+.22),(.035,.035,.44),oak)
obstacle('desk chair',[cx-.26,cy-.26,cx+.26,cy+.26],1.02)

nav['obstacles'].extend(obstacles);nav['segments'].extend(segments)
nav['principalLayout']={'revision':cfg['revision'],'configuration':cfg,'collisionObjects':obstacles,'newSegments':segments,'removedObjects':removed}
(evidence/'navigation.json').write_text(json.dumps(nav)+'\n')

def bounds(ob):
 pts=[ob.matrix_world@Vector(v)for v in ob.bound_box]
 return[min(p[i]for p in pts)for i in range(3)]+[max(p[i]for p in pts)for i in range(3)]
def in_polygon(p,poly):
 x,y=p;inside=False
 for i,(ax,ay)in enumerate(poly):
  bx,by=poly[i-1]
  if (ay>y)!=(by>y) and x<(bx-ax)*(y-ay)/(by-ay)+ax:inside=not inside
 return inside
def near_polygon(p,poly):
 if in_polygon(p,poly):return True
 for i,a in enumerate(poly):
  b=poly[i-1];dx,dy=b[0]-a[0],b[1]-a[1];l=dx*dx+dy*dy
  t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l))if l else 0
  if math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)<.28:return True
 return False
room_names={'New principal suite','Principal window alcove','New dressing room','New principal bathroom','Principal WC','Principal study'}
polys=[r['polygon_m']for r in nav['planRooms']if r['name']in room_names]
visible=[];hidden=set(nav.get('hiddenObjects',[]))
source.view_layers[0].update()
for ob in source.objects:
 if ob.type!='MESH' or ob.name in hidden or ob.get('source_name')in hidden:continue
 if ob in owned:visible.append(ob);continue
 name=ob.get('source_name',ob.name).lower();b=bounds(ob)
 if any(s in name for s in ('mature tree','arrival upper gallery','loft stair','double height pendant')):continue
 if b[5]<z+.02 or b[2]>5.10:continue
 if ('roof'in name and 'facade'not in name)or any(s in name for s in ('ceiling','rafter','first floor','storey band','eaves','fascia','downlight','cove ')):continue
 # Test corners and centre against the existing room polygons with a small
 # outward allowance so boundary walls/window frames are retained.
 if b[3]<3.18 or b[0]>14.02 or b[4]<-16.34 or b[1]>-3.03:continue
 pts=[((b[0]+b[3])/2,(b[1]+b[4])/2)]+[(xx,yy)for xx in(b[0]+.10,b[3]-.10)for yy in(b[1]+.10,b[4]-.10)]
 if any(near_polygon(p,poly)for p in pts for poly in polys):visible.append(ob)
# Exact footprint floors replace oversized source storey slabs in the cutaway.
from mathutils.geometry import tessellate_polygon
for i,poly in enumerate(polys):
 verts=[Vector((x,y,z+.002))for x,y in poly];tris=tessellate_polygon([verts]);lookup={tuple(v):j for j,v in enumerate(verts)}
 me=bpy.data.meshes.new(prefix+'floor');me.from_pydata(verts,[],[tuple(v if isinstance(v,int)else lookup[tuple(v)]for v in tri)for tri in tris]);me.update();uv=me.uv_layers.new(name='UVMap')
 for l in me.loops:uv.data[l.index].uv=(me.vertices[l.vertex_index].co.x,me.vertices[l.vertex_index].co.y)
 ob=bpy.data.objects.new(prefix+'floor '+str(i),me);coll.objects.link(ob);me.materials.append(oak);visible.append(ob)
# Floor under the removed dressing/study wall.
visible.append(box('continuous dressing floor',(12.08,-10.3,z+.005),(3.34,.12,.01),oak,bevel=0))
bpy.ops.object.select_all(action='DESELECT')
for ob in visible:ob.select_set(True)
export_quiet_oak_gltf(filepath=str(out/(variant+'-suite.glb')),export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False)
study=bpy.data.scenes.new('Principal suite — layout study')
for ob in visible:study.collection.objects.link(ob)
bpy.data.libraries.write(str(evidence/'Principal suite — layout study.blend'),{study},fake_user=True)
materials={m.name:list(m.diffuse_color)for m in bpy.data.materials}
for room in nav['planRooms']:
 if room['name']=='New dressing room':room['polygon_m']=[[10.41,-12.64],[13.75,-12.64],[13.75,-4.7],[10.47,-4.7],[10.47,-6.71],[9.96,-6.71],[9.96,-8.76],[10.41,-8.76]]
 if room['name']=='Principal study':room['name']='Compact principal desk';room['polygon_m']=[[10.47,-4.7],[13.75,-4.7],[13.75,-3.259],[10.47,-3.259]]
for view in nav['rooms']:
 if view['label']=='Principal study':view.update(label='Compact principal desk',position=[11.8,-4.5,z],direction=[1,1,0])
nav['rooms'].append({'id':'suite-layout-dressing','label':'Walk-in dressing','group':'Proposal · First floor','position':[12.55,-9.0,z],'direction':[0,1,0]})
room_names.add('Compact principal desk')
(evidence/'navigation.json').write_text(json.dumps(nav)+'\n')
meta={'variant':variant,'room':'Principal suite layout study','status':cfg['status'],'layoutRevision':cfg['revision'],'materials':materials,'planRooms':[r for r in nav['planRooms']if r['name']in room_names],
 'proposalLights':[{'name':'Suite study fill','position':[8,-11,4.85],'range':7,'intensity':1.6},{'name':'Dressing fill','position':[12,-8,4.85],'range':6,'intensity':1.5},{'name':'Ensuite fill','position':[11,-14.3,4.9],'range':4,'intensity':1.1}],
 'configuration':cfg,'objects':len(visible),'authored_objects':len(owned),'sourceModelUpdatedAt':nav['modelUpdatedAt']}
(out/(variant+'-suite.json')).write_text(json.dumps(meta,indent=2)+'\n')
report={'variant':variant,'configuration':cfg,'new_obstacles':obstacles,'new_segments':segments,'removed_objects':removed,'exported_objects':len(visible),'authored_objects':len(owned),'native_candidate':str(evidence.relative_to(ROOT)/'Principal suite — layout study.blend'),'source_house_overwritten':False}
source.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();rays=[]
normal=Vector((math.cos(math.radians(cfg['tv']['normal_angle_deg'])),math.sin(math.radians(cfg['tv']['normal_angle_deg'])),0));side=Vector((-normal.y,normal.x,0))
screen_center=Vector((*tv,z+th))+normal*.040
for label,eye in [('bed',Vector((9.62,-10.32,z+1.06))),('sofa',Vector((7.0,-14.0,z+1.11)))]:
 for u,v in[(0,0),(-.45,-.45),(-.45,.45),(.45,-.45),(.45,.45)]:
  target=screen_center+side*(u*sw)+Vector((0,0,v*sh));delta=target-eye
  hit,location,norm,face,ob,matrix=source.ray_cast(deps,eye,delta.normalized(),distance=delta.length+.1)
  ok=hit and ob.name==prefix+'TV screen'
  rays.append({'seat':label,'screen_sample':[u,v],'hit':ob.name if hit else None,'clear':ok,'distance_m':round(delta.length,3)})
  assert ok,(label,u,v,'sightline blocked',ob.name if hit else None)
report['native_tv_sightlines']=rays
(evidence/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print('PRINCIPAL_LAYOUT_EXPORTED',variant,len(visible),'meshes',len(owned),'new',flush=True)
