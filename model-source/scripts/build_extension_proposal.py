"""P8 concept. Loads R5 read-only; writes only output-proposed/public proposal assets."""
import bpy, json, math, sys, ast, random, hashlib, time, os
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from build_support import Timings, modules_for, source_hashes, record_success
from blender_collections import collection_memberships
# A design variant (PROPOSAL_VARIANT=compact) overlays proposal/design-spec-<variant>.json
# on the base specification and writes its own output folder and public assets.
VARIANT=os.environ.get('PROPOSAL_VARIANT','').strip()
BASE=ROOT/'output-walkthrough'; OUT=ROOT/('output-proposed-'+VARIANT if VARIANT else 'output-proposed'); OUT.mkdir(exist_ok=True)
build_timer=Timings(OUT/'build-timings.json',variant=VARIANT)
# A failed/restarted build must not leave a reusable success marker.
(OUT/'build-cache.json').unlink(missing_ok=True)
spec=json.loads((ROOT/'proposal/design-spec.json').read_text())
if VARIANT == 'planning':
 spec.update(json.loads((ROOT/'proposal/design-spec-compact.json').read_text()))
if VARIANT:
 spec.update(json.loads((ROOT/('proposal/design-spec-%s.json'%VARIANT)).read_text()));spec['variant']=VARIANT
PLANNING=VARIANT == 'planning'
def planning_source_hashes():
 return source_hashes(ROOT,VARIANT)
build_inputs=planning_source_hashes()
planning_inputs=build_inputs if PLANNING else None
VARIANT_SUFFIX=('-'+VARIANT) if VARIANT else ''
g=json.loads((BASE/'geometry.json').read_text())
nav=json.loads((ROOT/'walkthrough/public/navigation.json').read_text())
build_timer.lap('read_inputs')
with build_timer.phase('load_blend'):
 bpy.ops.wm.open_mainfile(filepath=str(BASE/'Ashley Heights.blend'))
original=bpy.data.scenes['01 Exterior']
scene=bpy.data.scenes.new('08 Proposed extensions');scene.world=original.world.copy();scene.unit_settings.system='METRIC';scene.unit_settings.length_unit='METERS'
bpy.context.window.scene=scene
collections={};record=[];materials={m.name:m for m in bpy.data.materials};PALETTE=dict(g['materials'])
funcs={'collection','mesh','box','prism','cylinder','beam'}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text())
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in funcs],type_ignores=[]),'<proposal-primitives>','exec'))
retained=collection('P00 Existing retained structure');revised=collection('P01 Local roof and stair alterations')
original_objects=list(original.objects)
_initial_memberships=collection_memberships(bpy.data)
for o in original_objects:
 if o.type in ('MESH','EMPTY','LIGHT') and not any(c.name.startswith(('90','91')) for c in _initial_memberships.get(o.as_pointer(),())):retained.objects.link(o)
changes=[];excluded=set();proposed_doors=[];new_surfaces=[];new_obstacles=[];new_segments=[];new_rooms=[];new_views=[];new_ramps=[]
def mat(name,color,rough=.6,metal=0,emission=0):
 name='Proposal | '+name
 m=bpy.data.materials.new(name);m.diffuse_color=color;m.use_nodes=True;b=m.node_tree.nodes.get('Principled BSDF');b.inputs['Base Color'].default_value=color;b.inputs['Roughness'].default_value=rough;b.inputs['Metallic'].default_value=metal
 if color[3]<1:b.inputs['Alpha'].default_value=color[3];b.inputs['Transmission Weight'].default_value=.6;m.surface_render_method='DITHERED'
 if emission:b.inputs['Emission Color'].default_value=color;b.inputs['Emission Strength'].default_value=emission
 materials[name]=m;PALETTE[name]=color;return name
white=mat('Limestone render',(.78,.76,.69,1),.82);stone=mat('Limestone paving',(.54,.52,.45,1),.8);oak=mat('Pale oak',(.44,.29,.14,1),.62);black=mat('Bronze black frames',(.034,.040,.037,1),.36,.45);glass=mat('Clear glazing',(.55,.72,.77,.14),.08);plaster=mat('Loft plaster',(.83,.82,.76,1),.84);fabric=mat('Oatmeal linen',(.56,.53,.45,1),.94);warm=mat('Warm lamps',(.95,.59,.24,1),.3,0,3);water=mat('Pool water',(.08,.36,.44,.72),.16);pooltile=mat('Pool limestone blue',(.22,.40,.42,1),.35);soil=mat('Mulch',(.09,.066,.045,1),1);leaves=mat('Grasses',(.22,.29,.095,1),.85);resin=mat('Permeable court',(.32,.30,.26,1),.92)
L='P10 Front entrance wing';R='P20 Rear garden living';T='P30 Loft conversion';P='P40 Pool and pavilion';S='P50 Landscape and parking';F='P60 New furniture';I='P70 Lighting'

def slab(name,r,z,thick=.18,material=stone,layer=L,walk=True):
 x0,y0,x1,y1=r;ob=box(name,((x0+x1)/2,(y0+y1)/2,z-thick/2),(x1-x0,y1-y0,thick),material,layer)
 if walk:new_surfaces.append({'name':name,'polygon':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'z':z})
 return ob

def segment(name,a,b,z0,z1,th=.16):new_segments.append({'name':name,'a':a,'b':b,'bottom':z0,'top':z1,'thickness':th})
def wall(name,a,b,z0,z1,material=white,layer=L,th=.20,collision=True):
 mid=[(a[k]+b[k])/2 for k in range(2)];ob=box(name,(*mid,(z0+z1)/2),(math.dist(a,b),th,z1-z0),material,layer,math.atan2(b[1]-a[1],b[0]-a[0]));
 if collision:segment(name,a,b,z0,z1,th)
 return ob

def glazing(name,a,b,z0,z1,layer=L,panes=3,door=False,mullion=.048):
 dx,dy=b[0]-a[0],b[1]-a[1];length=math.hypot(dx,dy);u=(dx/length,dy/length);before=len(record)
 wall(name+' glass',a,b,z0+.055,z1-.055,glass,layer,.024,not door)
 for z in(z0+.035,z1-.035):beam(name+' horizontal frame',(*a,z),(*b,z),.055,black,layer)
 for i in range(panes+1):
  p=(a[0]+dx*i/panes,a[1]+dy*i/panes);beam(name+' mullion',(*p,z0),(*p,z1),mullion,black,layer)
 if door:
  proposed_doors.append({'id':name,'wall':name,'hinge':[*a,z0],'members':[v['object_name']for v in record[before:]],'openingCenter':[(a[0]+b[0])/2,(a[1]+b[1])/2,z0],'apertureAxis':list(u),'apertureWidth':length,'openDelta':math.pi/2,'openDistance':1.65,'closeDistance':2.1})
 return

def glazed_wall(name,a,b,z0,z1,layer=L,door_at=None,door_width=1.4,panes=4,mullion=.048):
 if door_at is None:return glazing(name,a,b,z0,z1,layer,panes,mullion=mullion)
 length=math.dist(a,b);u=((b[0]-a[0])/length,(b[1]-a[1])/length);p=lambda t:[a[0]+u[0]*t,a[1]+u[1]*t];l=door_at-door_width/2;r=door_at+door_width/2;head=min(z1,2.5+z0)
 if l>.05:glazing(name+' fixed left',a,p(l),z0,z1,layer,max(1,round(l/1.15)),mullion=mullion)
 if length-r>.05:glazing(name+' fixed right',p(r),b,z0,z1,layer,max(1,round((length-r)/1.15)),mullion=mullion)
 if head<z1:glazing(name+' fanlight',p(l),p(r),head,z1,layer,2,mullion=mullion)
 if door_width<1.2:
  glazing(name+' entry leaf',p(l),p(r),z0,head,layer,1,True,mullion)
  return
 glazing(name+' entry left',p(l),p(door_at),z0,head,layer,1,True,mullion)
 # Second leaf hinges at the opposite jamb; each opens independently about its jamb.
 glazing(name+' entry right',p(r),p(door_at),z0,head,layer,1,True,mullion)
 proposed_doors[-1]['openDelta']=-math.pi/2

def remove_from_proposal(o,reason):
 if o.name not in excluded:
  if o.name in retained.objects:retained.objects.unlink(o)
  excluded.add(o.name);changes.append({'original':o.name,'action':'omitted in proposal only','reason':reason})

def revised_copy(o,reason):
 remove_from_proposal(o,reason);n=o.copy();n.data=o.data.copy();n.name='Proposal revision | '+o.name;n['source_name']=n.name;revised.objects.link(n);return n

def cut(ob,r,z0,z1):
 x0,y0,x1,y1=r
 bpy.ops.mesh.primitive_cube_add(size=1,location=((x0+x1)/2,(y0+y1)/2,(z0+z1)/2));c=bpy.context.object;c.dimensions=(x1-x0,y1-y0,z1-z0);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 bpy.context.view_layer.objects.active=ob;mod=ob.modifiers.new('Explicit proposal opening','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=c
 bpy.ops.object.modifier_apply(modifier=mod.name);bpy.data.objects.remove(c,do_unlink=True)

def cut_surface(ob,r,z0,z1):
 # A ground surface (lawn, drive) is not a closed solid: a boolean can empty it. Slice it along
 # the rectangle's edges and delete the faces inside instead - exact, and it cannot fail.
 import bmesh
 x0,y0,x1,y1=r;mw=ob.matrix_world;inv=mw.inverted_safe();nrm=inv.to_3x3().transposed().inverted_safe()
 bm=bmesh.new();bm.from_mesh(ob.data)
 for co,no in (((x0,0,0),(1,0,0)),((x1,0,0),(1,0,0)),((0,y0,0),(0,1,0)),((0,y1,0),(0,1,0))):
  bmesh.ops.bisect_plane(bm,geom=bm.verts[:]+bm.edges[:]+bm.faces[:],plane_co=inv@Vector(co),plane_no=(nrm@Vector(no)).normalized())
 gone=[f for f in bm.faces if (lambda c:x0<c.x<x1 and y0<c.y<y1 and z0<c.z<z1)(mw@f.calc_center_median())]
 bmesh.ops.delete(bm,geom=gone,context='FACES');bm.to_mesh(ob.data);bm.free();ob.data.update()

def roof(name,x0,x1,y0,y1,eave,ridge,layer=L):
 ym=(y0+y1)/2
 for suffix,ya,yb,za,zb in [('south',y0,ym,eave,ridge),('north',ym,y1,ridge,eave)]:
  vertices=[(x0,ya,za),(x1,ya,za),(x1,yb,zb),(x0,yb,zb)];vertices +=[(x,y,z-.18)for x,y,z in vertices]
  mesh(name+' '+suffix,vertices,[(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)],'Slate roof',layer)
 return

def room(name,r,z=0,floor=0,group='Proposal · Ground floor',view=None):
 x0,y0,x1,y1=r;new_rooms.append({'name':name,'floor':floor,'base_z':z,'polygon_m':[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],'proposal':True})
 if view:new_views.append({'id':'proposal-'+name.lower().replace(' ','-'),'label':name,'group':group,'position':view[:3],'direction':view[3:]})

def obstacle(name,r,z0,z1):new_obstacles.append({'name':name,'box':r,'bottom':z0,'top':z1})
def lamp(name,x,y,z):
 cylinder(name+' bronze base',(x,y,z),.035,.12,black,I,12);cylinder(name+' warm lens',(x,y,z+.08),.037,.055,warm,I,12)
 ld=bpy.data.lights.new(name,'POINT');ld.energy=18;ld.color=(1,.68,.36);ld.shadow_soft_size=.15;ob=bpy.data.objects.new(name,ld);collection(I).objects.link(ob);ob.location=(x,y,z+.16)
def sofa(name,x,y,width=2.2,angle=0,z=0):
 def part(suffix,dx,dy,h,size,material,bevel=0):
  ob=box(name+' '+suffix,(x+dx*math.cos(angle)-dy*math.sin(angle),y+dx*math.sin(angle)+dy*math.cos(angle),z+h),size,material,F,angle)
  if bevel:
   m=ob.modifiers.new('Soft upholstery edge','BEVEL');m.width=bevel;m.segments=3
  return ob
 part('oak underframe',0,0,.24,(width-.14,.77,.13),oak,.018)
 for dx in(-width/2+.16,width/2-.16):
  for dy in(-.30,.30):part('foot',dx,dy,.115,(.055,.055,.23),black,.006)
 seats=max(2,round(width/.8));sw=(width-.30)/seats
 for j in range(seats):part('seat cushion',-width/2+.15+(j+.5)*sw,-.06,.43,(sw-.018,.72,.22),fabric,.048)
 for j in range(seats):part('back cushion',-width/2+.15+(j+.5)*sw,.31,.76,(sw-.018,.22,.65),fabric,.05)
 for dx in(-width/2+.07,width/2-.07):part('arm',dx,0,.58,(.17,.89,.59),fabric,.04)
 obstacle(name,[x-width/2,y-.45,x+width/2,y+.45],z,z+1.15)
def table(name,x,y,w=2.2,d=1.0):
 box(name+' top',(x,y,.76),(w,d,.07),oak,F)
 for dx in(-w/2+.15,w/2-.15):
  for dy in(-d/2+.15,d/2-.15):box(name+' leg',(x+dx,y+dy,.37),(.055,.055,.74),black,F)
 obstacle(name,[x-w/2,y-d/2,x+w/2,y+d/2],0,.8)
 seats=max(2,round(w/.68))
 for i in range(seats):
  for side in(-1,1):
   xx=x-w/2+(i+.5)*w/seats;yy=y+side*(d/2+.4)
   for suffix,c,size,material in [('chair seat',(xx,yy,.47),(.46,.48,.10),fabric),('chair back',(xx,yy+side*.20,.73),(.46,.085,.48),oak)]:
    ob=box(name+' '+suffix,c,size,material,F);m=ob.modifiers.new('Rounded furniture edge','BEVEL');m.width=.025;m.segments=3
   for dx in(-.17,.17):
    for dy in(-.17,.17):beam(name+' chair leg',(xx+dx*1.1,yy+dy*1.1,.025),(xx+dx,yy+dy,.45),.037,black,F)
   obstacle(name+' dining chair',[xx-.23,yy-.25,xx+.23,yy+.25],0,.98)


# Shared helpers and independently reviewable design modules.
build_timer.lap('initialize_scene')
_build_succeeded=False
try:
 for module in modules_for(VARIANT):
  path=ROOT/'scripts'/module
  with build_timer.phase(module):
   exec(compile(path.read_text(),str(path),'exec'))
  print('MODULE_TIME %s %.1fs'%(module,build_timer.events[-1]['seconds']),flush=True)
 with build_timer.phase('verify_and_record_outputs'):
  record_success(ROOT,VARIANT,bpy.app.binary_path,build_inputs)
 _build_succeeded=True
finally:
 build_timer.write(success=_build_succeeded)
