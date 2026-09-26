"""Build a furnished, isolated bedroom from each saved proposal's real shell.

Blender --background --python-exit-code 1 --python scripts/preview_principal_bedroom.py -- compact
The whole-house files are read only. All changes remain editable in the room .blend.
"""
import bpy, json, math, sys
from pathlib import Path
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
from proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];assert variant in ('compact','planning')
cfg=json.loads((ROOT/'proposal/interiors/principal/bedroom.json').read_text())
base=ROOT/('output-proposed-'+variant);nav=json.loads((base/'navigation.json').read_text())
out=ROOT/'walkthrough/public/interiors/principal/models';out.mkdir(parents=True,exist_ok=True)
evidence=ROOT/'revisions/interiors-principal-2026-09-26/bedroom'/variant;evidence.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(base/(native_name(variant)+'.blend')))
source=bpy.data.scenes['08 Proposed extensions'];source.view_layers[0].update()
study=bpy.data.scenes.new('Principal bedroom — south wall');bpy.context.window.scene=study
prefix='Bedroom 02 | ';owned=[];shell=[];removed=[];cutaway=[];obstacles=[]
coll=bpy.data.collections.new('Principal bedroom — furniture and partitions');study.collection.children.link(coll)
z=cfg['floor_z'];ceiling=cfg['ceiling_z']

def material(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(prefix+name);m.diffuse_color=color;m.use_nodes=True
 s=m.node_tree.nodes.get('Principled BSDF');s.inputs['Base Color'].default_value=color;s.inputs['Roughness'].default_value=rough;s.inputs['Metallic'].default_value=metal
 return m
oak=bpy.data.materials['Proposal | Quiet oak pale natural oak'];stone=bpy.data.materials['Proposal | Quiet oak honed limestone'];fabric=bpy.data.materials['Proposal | Quiet oak cream upholstery']
white=material('ivory plaster',(.82,.80,.75,1),.9);dark=material('charcoal',(.018,.023,.025,1),.5);screen=material('screen',(.012,.018,.020,1),.65,0);bronze=material('brushed bronze',(.39,.28,.16,1),.4,.7)
screen.node_tree.nodes.get('Principled BSDF').inputs['Specular IOR Level'].default_value=.025
linen=material('sand linen',(.55,.49,.40,1),.94);wool=material('ivory wool',(.72,.68,.60,1),.98);leaf=material('foliage',(.10,.16,.075,1),.82);soil=material('soil',(.045,.029,.015,1),1)
light=material('opal lens',(.96,.87,.67,1),.45);s=light.node_tree.nodes.get('Principled BSDF');s.inputs['Emission Color'].default_value=(1,.77,.46,1);s.inputs['Emission Strength'].default_value=.3

def mesh(label,verts,faces,mat):
 me=bpy.data.meshes.new(prefix+label);me.from_pydata(verts,[],faces);me.update();uv=me.uv_layers.new(name='UVMap')
 for p in me.polygons:
  axes=(0,1)if abs(p.normal.z)>.6 else(1,2)if abs(p.normal.x)>abs(p.normal.y)else(0,2)
  for l in p.loop_indices:
   v=me.vertices[me.loops[l].vertex_index].co;uv.data[l].uv=(v[axes[0]],v[axes[1]])
 ob=bpy.data.objects.new(prefix+label,me);coll.objects.link(ob);me.materials.append(mat);ob['source_name']=ob.name;ob['bedroom_revision']=2;owned.append(ob);return ob

def box(label,center,size,mat=oak,angle=0,bevel=.008):
 x,y,h=center;a,b,c=[v/2 for v in size];co,si=math.cos(angle),math.sin(angle)
 verts=[(x+dx*co-dy*si,y+dx*si+dy*co,h+dh)for dx,dy,dh in[(-a,-b,-c),(-a,-b,c),(-a,b,-c),(-a,b,c),(a,-b,-c),(a,-b,c),(a,b,-c),(a,b,c)]]
 ob=mesh(label,verts,[(2,6,4,0),(5,7,3,1),(4,5,1,0),(3,7,6,2),(1,3,2,0),(6,7,5,4)],mat)
 if bevel:
  mod=ob.modifiers.new('Soft edges','BEVEL');mod.width=min(bevel,min(size)/3);mod.segments=5
  mod=ob.modifiers.new('Corner normals','WEIGHTED_NORMAL');mod.keep_sharp=True
 return ob

def cylinder(label,center,radius,depth,mat,top=None):
 n=40;verts=[(center[0]+r*math.cos(i*2*math.pi/n),center[1]+r*math.sin(i*2*math.pi/n),center[2]+dz)for dz,r in[(-depth/2,radius),(depth/2,top if top is not None else radius)]for i in range(n)]
 faces=[tuple(reversed(range(n))),tuple(range(n,n*2))]+[(i,(i+1)%n,(i+1)%n+n,i+n)for i in range(n)]
 ob=mesh(label,verts,faces,mat)
 for p in ob.data.polygons[2:]:p.use_smooth=True
 bevel=ob.modifiers.new('Rim easing','BEVEL');bevel.width=.003;bevel.segments=3
 return ob

def part(label,c,offset,size,mat,angle=0,bevel=.008):
 dx,dy,dz=offset;co,si=math.cos(angle),math.sin(angle)
 return box(label,(c[0]+dx*co-dy*si,c[1]+dx*si+dy*co,z+dz),size,mat,angle,bevel)

def obstacle(label,r,height):obstacles.append({'name':prefix+label,'box':r,'bottom':z,'top':z+height})
def bounds(ob):
 pts=[ob.matrix_world@Vector(v)for v in ob.bound_box]
 return[min(p[i]for p in pts)for i in range(3)]+[max(p[i]for p in pts)for i in range(3)]
def in_polygon(p,poly):
 x,y=p;inside=False
 for i,(ax,ay)in enumerate(poly):
  bx,by=poly[i-1]
  if (ay>y)!=(by>y)and x<(bx-ax)*(y-ay)/(by-ay)+ax:inside=not inside
 return inside
def near_polygon(p,poly):
 if in_polygon(p,poly):return True
 for i,a in enumerate(poly):
  b=poly[i-1];dx,dy=b[0]-a[0],b[1]-a[1];l=dx*dx+dy*dy
  t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/l))if l else 0
  if math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)<.25:return True
 return False
polys=[cfg['bedroom_polygon'],cfg['alcove_polygon'],cfg['reserved_polygon']]
remove_prefixes=tuple('Proposal | '+s for s in ('Principal bed','Principal sitting sofa','Principal dressing','Principal east partition','Principal bathroom','Principal WC','Principal freestanding bath','Principal bath filler','Principal bath spout','Principal study desk','Principal study bookcase','Principal nook dressing','Principal nook stool','Principal suite north partition door'))
hidden=set(nav.get('hiddenObjects',[]))
for ob in source.objects:
 if ob.type!='MESH':continue
 name=ob.get('source_name',ob.name);b=bounds(ob);low=name.lower()
 if name.startswith(remove_prefixes):removed.append(name);continue
 if ob.name in hidden or name in hidden:continue
 if b[5]<z+.02 or b[2]>5.10:continue
 if any(s in low for s in ('mature tree','arrival upper gallery','loft stair','double height pendant','ceiling','rafter','first floor','storey band','eaves','fascia','downlight','cove ')):continue
 if 'roof'in low and 'facade'not in low and 'continued roof garage wing gable'not in low:continue
 if b[3]<3.18 or b[0]>14.02 or b[4]<-16.34 or b[1]>-3.03:continue
 pts=[((b[0]+b[3])/2,(b[1]+b[4])/2)]+[(xx,yy)for xx in(b[0]+.10,b[3]-.10)for yy in(b[1]+.10,b[4]-.10)]
 if any(near_polygon(p,poly)for p in pts for poly in polys):
  # Copy shell objects so the room's native file is independent of scene parents.
  duplicate=ob.copy();duplicate.data=ob.data.copy();duplicate.parent=None;duplicate.matrix_world=ob.matrix_world.copy();study.collection.objects.link(duplicate);shell.append(duplicate)

def slab(label,poly,height,mat):
 vs=[Vector((x,y,height))for x,y in poly];lookup={tuple(v):j for j,v in enumerate(vs)};tris=tessellate_polygon([vs]);return mesh(label,vs,[tuple(v if isinstance(v,int)else lookup[tuple(v)]for v in tri)for tri in tris],mat)
for i,poly in enumerate(polys):
 slab('floor '+str(i),poly,z+.002,oak if i<2 else white)
 if i!=1:cutaway.append(slab('ceiling '+str(i),poly,ceiling,white).name)
# Derive the vault soffit directly from the saved facade's lower boundary.
vault=next(o for o in shell if o.get('source_name','')=='Proposal | West upper principal facade above vault')
section={}
for vertex in vault.data.vertices:
 point=vault.matrix_world@vertex.co;yy=round(point.y,4);section[yy]=min(section.get(yy,99),point.z)
section=sorted(section.items())
assert len(section)==3,section
for (ya,za),(yb,zb) in zip(section,section[1:]):
 ob=mesh('retained vault soffit',[(3.49,ya,za),(5.16,ya,za),(5.16,yb,zb),(3.49,yb,zb)],[(0,1,2,3)],white);cutaway.append(ob.name)
# Genuine room boundary. Door in the western return leads to the reserved wing.
box('north media partition',(11.825,-10.26,z+1.24),(3.85,.12,2.48),white,bevel=0)
for ya,yb in[(-10.26,-9.975),(-9.025,-8.70)]:box('dressing return pier',(9.90,(ya+yb)/2,z+1.24),(.12,yb-ya,2.48),white,bevel=0)
box('dressing doorway header',(9.90,-9.50,5.165),(.12,.95,.23),white,bevel=0)
# Entry and dressing doors shown at 90 degrees with native handles and stops.
box('entry door open',(8.47,-9.175,z+1.14),(.044,.95,2.22),oak)
box('entry door handle',(8.51,-9.49,z+1.03),(.07,.12,.016),bronze)
box('dressing door open',(10.375,-9.975,z+1.14),(.95,.044,2.22),oak)
box('dressing door handle',(10.69,-9.93,z+1.03),(.12,.07,.016),bronze)
for yy in(-9.998,-9.002):box('dressing door jamb',(9.90,yy,z+1.13),(.145,.025,2.26),oak)
obstacle('entry open door',[8.448,-9.65,8.492,-8.7],2.25)
obstacle('dressing open door',[9.9,-9.997,10.85,-9.953],2.25)
# Full headboard composition, backed continuously by the existing solid wall.
c=cfg['bed']['center']
for j in range(7):box('headboard oak wall panel '+str(j),(9.6+j*.516,-16.056,z+1.24),(.511,.04,2.48),oak,bevel=.002)
box('wall-backed upholstered headboard',(11.15,-15.981,z+.70),(2.12,.11,1.32),linen,bevel=.033)
part('bed recessed plinth',c,(0,0,.115),(1.83,1.93,.20),dark,bevel=.026)
part('bed upholstered frame',c,(0,0,.30),(2.04,2.08,.30),fabric,bevel=.07)
part('bed mattress',c,(0,0,.51),(1.80,2.0,.24),fabric,bevel=.065)
part('bed duvet',c,(0,.20,.666),(1.98,1.54,.11),fabric,bevel=.035)
part('bed folded duvet edge',c,(0,-.50,.71),(1.96,.22,.075),fabric,bevel=.028)
for i,xx in enumerate((-.46,.46)):
 part('bed pillow '+str(i),c,(xx,-.72,.70),(.80,.43,.16),fabric,bevel=.05)
 part('bed linen cushion '+str(i),c,(xx,-.44,.78),(.58,.20,.29),linen,bevel=.055)
part('bed foot throw',c,(0,.74,.735),(2.0,.49,.035),linen,bevel=.01)
for side in(-1,1):part('throw drape',c,(side*.987,.74,.53),(.034,.49,.41),linen,bevel=.008)
obstacle('bed',[10.13,-15.926,12.17,-13.846],.9)
box('bed wool rug',(11.15,-14.31,z+.019),(3.5,3.18,.034),wool,bevel=.01)
for i,(x,y)in enumerate(cfg['bedsides']['centers']):
 box('bedside floating cabinet '+str(i),(x,y,z+.43),(.6,.5,.37),oak,bevel=.018)
 box('bedside limestone top '+str(i),(x,y,z+.63),(.61,.51,.035),stone,bevel=.008)
 for h in(.35,.525):box('bedside drawer '+str(i),(x,y+.253,z+h),(.572,.015,.158),oak)
 box('bedside shadow pull '+str(i),(x,y+.264,z+.436),(.48,.012,.012),dark,bevel=.002)
 obstacle('bedside '+str(i),[x-.305,y-.255,x+.305,y+.255],.66)
 cylinder('bedside lamp foot '+str(i),(x-.12,y-.02,z+.677),.075,.045,bronze)
 cylinder('bedside lamp stem '+str(i),(x-.12,y-.02,z+.80),.014,.22,bronze)
 cylinder('bedside lamp shade '+str(i),(x-.12,y-.02,z+1.0),.14,.22,fabric,top=.11)
 box('bedside book '+str(i),(x+.13,y+.05,z+.666),(.19,.25,.035),white,angle=.1)
 box('bedside switches '+str(i),(x,-16.015,z+.92),(.15,.018,.072),bronze)
 for j in range(3):box('switch rocker',(x+(j-1)*.043,-16.003,z+.92),(.037,.009,.057),dark,bevel=.002)
 box('reading light mount',(x,-16.008,z+1.4),(.09,.045,.10),bronze)
 box('reading light arm',(x,-15.92,z+1.39),(.022,.18,.022),bronze)
 box('reading light lens',(x,-15.821,z+1.365),(.05,.05,.035),light)
# Bed-end seat completes the sleeping group; circulation runs in front and beside it.
box('bed end bench',(11.15,-13.15,z+.42),(1.65,.42,.19),fabric,bevel=.05)
for x in(10.50,11.80):box('bench oak support',(x,-13.15,z+.18),(.07,.33,.36),oak)
obstacle('bed end bench',[10.325,-13.36,11.975,-12.94],.515)
# Sofa faces north. Both seats see one fixed screen head-on.
c=cfg['sofa']['center'];angle=math.pi
part('sofa recessed plinth',c,(0,0,.17),(2.13,.80,.20),oak,angle,.025)
for i in range(2):
 part('sofa seat '+str(i),c,((i-.5)*.98,-.07,.43),(.967,.76,.25),fabric,angle,.065)
 part('sofa back '+str(i),c,((i-.5)*.98,.33,.73),(.98,.22,.66),fabric,angle,.065)
for side in(-1,1):
 part('sofa arm',c,(side*1.055,0,.55),(.19,.95,.65),fabric,angle,.05)
 part('sofa loose cushion',c,(side*.79,.11,.74),(.40,.18,.43),linen,angle,.055)
obstacle('sofa',[5.83,-11.625,8.13,-10.675],1.06)
box('sofa wool rug',(6.94,-10.52,z+.017),(3.10,2.62,.03),wool,bevel=.009)
box('coffee table limestone',(6.98,-10.025,z+.385),(1.10,.5,.06),stone,bevel=.028)
for x in(6.66,7.30):cylinder('coffee table oak base',(x,-10.025,z+.18),.13,.35,oak)
obstacle('coffee table',[6.43,-10.275,7.53,-9.775],.415)
box('coffee table book',(7.18,-10.02,z+.435),(.27,.20,.035),linen,angle=.12)
cylinder('coffee cup',(6.77,-10.00,z+.461),.038,.086,white)
cylinder('sofa side table',(5.46,-11.32,z+.49),.22,.045,stone)
cylinder('side table pedestal',(5.46,-11.32,z+.24),.10,.46,oak)
obstacle('side table',[5.24,-11.54,5.68,-11.10],.53)
cylinder('reading floor lamp base',(5.49,-10.76,z+.02),.15,.04,bronze)
cylinder('reading floor lamp stem',(5.49,-10.76,z+.72),.012,1.4,bronze)
cylinder('reading floor lamp shade',(5.49,-10.76,z+1.45),.18,.20,fabric,top=.135)
# Fixed TVs and useful media joinery. Screen widths correspond to 85 and 55 inch class.
for tv in cfg['tvs']:
 label=tv['id'];x,y=tv['center'];sw,sh=tv['screen_m'];h=tv['height_m'];my=tv['cabinet_center_y'];width=2.4 if label=='bed'else 2.8
 box(label+' media cabinet',(x,my,z+.39),(width,.40,.38),oak,bevel=.017)
 box(label+' media limestone top',(x,my,z+.594),(width+.02,.41,.028),stone)
 for j in range(4):box(label+' media drawer '+str(j),(x+(j-1.5)*(width/4),my-.207,z+.39),(width/4-.012,.02,.34),oak)
 box(label+' TV fixed case',(x,y+.035,z+h),(sw+.030,.065,sh+.03),dark,bevel=.008)
 box(label+' TV screen',(x,y,z+h),(sw,.009,sh),screen,bevel=.002)
 box(label+' TV status light',(x+sw*.4,y-.007,z+h-sh/2-.008),(.009,.006,.003),light,bevel=.001)
 box(label+' soundbar',(x,my-.162,z+.66),(.92,.09,.06),dark,bevel=.018)
 for j in range(25):box(label+' soundbar grille',(x-.41+j*.034,my-.209,z+.66),(.006,.005,.035),bronze,bevel=.001)
 obstacle(label+' media cabinet',[x-width/2,my-.21,x+width/2,my+.20],.61)
# Side-lit 1.8 m desk: occupied chair and passing space are separate.
x0,y0,x1,y1=cfg['desk']['bounds'];cx,cy=(x0+x1)/2,(y0+y1)/2
box('desk top',(cx,cy,z+.745),(.70,1.8,.055),oak,bevel=.018)
for yy in(y0+.06,y1-.06):box('desk panel leg',(cx,yy,z+.36),(.62,.065,.72),oak)
box('desk drawer',(cx,y0+.30,z+.625),(.60,.44,.16),oak)
box('desk drawer pull',(x1+.008,y0+.30,z+.65),(.018,.26,.025),bronze)
box('desk laptop base',(5.76,-14.90,z+.786),(.25,.36,.014),dark)
box('desk laptop display',(5.65,-14.90,z+.91),(.015,.34,.24),dark)
box('desk notebook',(5.81,-14.39,z+.79),(.23,.29,.025),linen,angle=-.14)
cylinder('desk lamp base',(5.64,-15.56,z+.8),.08,.035,bronze)
cylinder('desk lamp stem',(5.64,-15.56,z+.97),.012,.34,bronze)
cylinder('desk lamp shade',(5.64,-15.56,z+1.15),.115,.07,white)
obstacle('desk',[x0,y0,x1,y1],.80)
cx,cy=cfg['desk']['chair_center']
box('desk chair seat',(cx,cy,z+.46),(.52,.53,.13),fabric,bevel=.052)
box('desk chair back',(cx+.22,cy,z+.74),(.075,.53,.53),fabric,bevel=.029)
for dx in(-.19,.19):
 for dy in(-.19,.19):box('desk chair leg',(cx+dx,cy+dy,z+.22),(.035,.035,.44),oak)
for side in(-1,1):
 box('desk chair armrest',(cx-.025,cy+side*.30,z+.68),(.40,.055,.065),fabric,bevel=.018)
 box('desk chair arm support',(cx+.12,cy+side*.30,z+.56),(.03,.025,.23),bronze)
obstacle('desk chair',[cx-.27,cy-.34,cx+.27,cy+.34],1.01)
# Curtains park beside the actual window openings, never across the headboard.
def curtain(label,x,y,width,angle=0):
 for j in range(10):
  t=(j+.5)*width/10-width/2
  part(label+' fold '+str(j),(x,y),(t,(-1 if j%2 else 1)*.018,1.24),(width/10+.010,.075,2.43),fabric,angle,.018)
for x in(6.12,8.37):curtain('south linen curtain',x,-15.94,.34)
for y in(-15.57,-13.64,-12.35):curtain('east linen curtain',13.61,y,.30,math.pi/2)
curtain('east north linen curtain',13.61,-10.425,.16,math.pi/2)
# Interior plaster returns cover the room-side half of each window reveal.
# The retained planning shell otherwise exposes narrow exterior-brick edges here.
for ya,yb,sill in[(-15.325,-13.875,3.65),(-12.12,-10.52,3.50),(-8.89,-7.09,3.55)]:
 for yy in(ya+.005,yb-.005):box('east window plaster jamb',(13.795,yy,(sill+5.05)/2),(.09,.010,5.05-sill),white,bevel=.001)
 box('east window plaster head',(13.795,(ya+yb)/2,5.045),(.09,yb-ya,.01),white,bevel=.001)
 box('east window limestone sill',(13.785,(ya+yb)/2,sill+.009),(.11,yb-ya,.018),stone,bevel=.003)
for xx in(6.350,8.140):box('south window plaster jamb',(xx,-16.121,4.35),(.01,.09,1.40),white,bevel=.001)
box('south window plaster head',(7.245,-16.121,5.045),(1.8,.09,.01),white,bevel=.001)
box('south window limestone sill',(7.245,-16.111,3.659),(1.8,.11,.018),stone,bevel=.003)
# Ceiling lighting and subtle perimeter details; ceiling-only fittings follow cutaway mode.
for x,y in[(9.02,-11.5),(9.02,-14.15),(12.90,-12.65),(6.65,-13.30),(6.98,-10.1)]:
 for label,r,d,h,mat in[('downlight bezel',.045,.012,ceiling-.009,bronze),('downlight lens',.034,.010,ceiling-.018,light)]:cutaway.append(cylinder(label,(x,y,h),r,d,mat).name)
box('headboard concealed light',(11.15,-16.025,5.22),(3.61,.03,.015),light)
# Reuse the detailed native olive from the approved kitchen palette.
# Copy editable geometry, including stems, cupped leaves, pot rim and pebbles.
plant_origin=Vector((-.62,8.03,0));plant_target=Vector((13.365,-12.60,z))
for ob in source.objects:
 name=ob.get('source_name',ob.name)
 if not name.startswith('Proposal | Quiet oak | Kitchen corner olive'):continue
 duplicate=ob.copy();duplicate.data=ob.data.copy();duplicate.parent=None
 duplicate.matrix_world=ob.matrix_world.copy();duplicate.matrix_world.translation+=plant_target-plant_origin
 duplicate.name=prefix+name.split('Kitchen corner olive',1)[1].strip();duplicate['source_name']=duplicate.name;duplicate['bedroom_revision']=2
 coll.objects.link(duplicate);owned.append(duplicate)
obstacle('planter and canopy',[13.009,-12.910,13.740,-12.168],1.71)
# Exposed, full-height architectural walls retain the actual glazing and openings.
study.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();rays=[]
for tv in cfg['tvs']:
 for seat,eye in enumerate(tv['eyes']):
  for u,v in[(0,0),(-.45,-.45),(-.45,.45),(.45,-.45),(.45,.45)]:
   target=Vector((tv['center'][0]+u*tv['screen_m'][0],tv['center'][1]-.005,z+tv['height_m']+v*tv['screen_m'][1]));delta=target-Vector(eye)
   hit,location,norm,face,ob,matrix=study.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length+.03)
   ok=hit and ob.get('source_name',ob.name)==prefix+tv['id']+' TV screen'
   rays.append({'group':tv['id'],'seat':seat,'sample':[u,v],'clear':ok,'hit':ob.name if hit else None,'distance_m':round(delta.length,3)})
   assert ok,(tv['id'],seat,u,v,ob.name if hit else None)
visible=shell+owned
bpy.ops.object.select_all(action='DESELECT')
for ob in visible:ob.select_set(True)
export_quiet_oak_gltf(filepath=str(out/(variant+'-bedroom.glb')),export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False)
bpy.data.libraries.write(str(evidence/'Principal bedroom — south wall.blend'),{study},fake_user=True)
meta={'variant':variant,'room':'Principal bedroom','status':cfg['status'],'layoutRevision':2,'materials':{m.name:list(m.diffuse_color)for m in bpy.data.materials},'planRooms':[{'name':'Bedroom','floor':1,'polygon_m':cfg['bedroom_polygon']}],'cutawayObjects':cutaway,'configuration':cfg,'objects':len(visible),'authored_objects':len(owned),'proposalLights':[{'name':'Bedroom bounce','position':[11.15,-14.0,4.7],'range':5,'intensity':2.0},{'name':'Sitting bounce','position':[7,-10.5,4.7],'range':4,'intensity':1.8},{'name':'Desk bounce','position':[6.7,-14.7,4.6],'range':4,'intensity':1.2}],'sourceModelUpdatedAt':nav['modelUpdatedAt']}
(out/(variant+'-bedroom.json')).write_text(json.dumps(meta,indent=2)+'\n')
report={'variant':variant,'configuration':cfg,'exported_objects':len(visible),'authored_objects':len(owned),'new_obstacles':obstacles,'removed_objects':removed,'native_tv_sightlines':rays,'shell_objects':[{'name':o.get('source_name',o.name),'bounds':bounds(o)}for o in shell],'cutaway_objects':cutaway,'authored_bounds':[{'name':o.name,'bounds':bounds(o)}for o in owned],'source_house_overwritten':False}
(evidence/'report.json').write_text(json.dumps(report,indent=2)+'\n')
print('BEDROOM_EXPORTED',variant,len(visible),'meshes',len(owned),'authored; 20 native viewing rays clear',flush=True)
