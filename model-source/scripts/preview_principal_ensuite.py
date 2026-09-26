"""Fit the accepted isolated bedroom's north wing, preserving its authored geometry.
Blender --background --python-exit-code 1 --python scripts/preview_principal_ensuite.py -- compact
"""
import bpy,json,math,sys,hashlib
from pathlib import Path
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from proposal_kitchen_interiors import export_quiet_oak_gltf
variant=sys.argv[sys.argv.index('--')+1];assert variant in ('compact','planning')
cfg=json.loads((ROOT/'proposal/interiors/principal/ensuite.json').read_text());z=cfg['floor_z'];ceiling=cfg['ceiling_z']
evidence=ROOT/'revisions/interiors-principal-2026-09-26/ensuite'/variant;evidence.mkdir(parents=True,exist_ok=True)
out=ROOT/'walkthrough/public/interiors/principal/models'
base=ROOT/'revisions/interiors-principal-2026-09-26/bedroom'/variant/'Principal bedroom — south wall.blend'
bpy.ops.wm.open_mainfile(filepath=str(base));study=bpy.data.scenes['Principal bedroom — south wall'];bpy.context.window.scene=study;study.name='Principal suite — bathroom and wardrobe'
meta=json.loads((out/(variant+'-bedroom.json')).read_text());cutaway=meta['cutawayObjects'][:]
coll=bpy.data.collections.new('Ensuite and dressing — editable fittings');study.collection.children.link(coll)
prefix='Ensuite 01 | ';owned=[];obstacles=[];mirrors=[]
def signature(ob):
 return hashlib.sha256(json.dumps({'vertices':[list(v.co) for v in ob.data.vertices], 'matrix':[list(row) for row in ob.matrix_world],'materials':[m.name for m in ob.data.materials]},sort_keys=True).encode()).hexdigest()
retained={o.name:signature(o) for o in study.objects if o.type=='MESH' and o.name!='Bedroom 02 | floor 2'}
# Replace only the formerly reserved wing floor; retain bedroom, shell and ceiling.
old=bpy.data.objects.get('Bedroom 02 | floor 2');bpy.data.objects.remove(old,do_unlink=True)
oak=bpy.data.materials['Proposal | Quiet oak pale natural oak'];stone=bpy.data.materials['Proposal | Quiet oak honed limestone'];fabric=bpy.data.materials['Proposal | Quiet oak cream upholstery'];white=bpy.data.materials['Bedroom 02 | ivory plaster'];bronze=bpy.data.materials['Bedroom 02 | brushed bronze']
def material(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(prefix+name);m.diffuse_color=color;m.use_nodes=True;s=m.node_tree.nodes.get('Principled BSDF');s.inputs['Base Color'].default_value=color;s.inputs['Roughness'].default_value=rough;s.inputs['Metallic'].default_value=metal;return m
ceramic=material('warm white ceramic',(.9,.885,.84,1),.22);dark=material('recess shadow',(.042,.033,.024,1),.8);grout=material('limestone grout',(.43,.39,.32,1),.85)
linen=material('folded ivory towels',(.77,.735,.65,1),.94);taupe=material('taupe clothes',(.34,.29,.23,1),.97);cream=material('ivory clothes',(.77,.74,.67,1),.94);charcoal=material('charcoal clothes',(.052,.065,.061,1),.96)
glass=material('Shower Glass',(.85,.94,.91,.16),.12);glass.surface_render_method='DITHERED'
mirror=material('mirror backing',(.72,.75,.73,1),.04,1);opal=material('warm light lens',(.96,.85,.65,1),.4)
s=opal.node_tree.nodes.get('Principled BSDF');s.inputs['Emission Color'].default_value=(1,.83,.58,1);s.inputs['Emission Strength'].default_value=.7
privacy=material('obscure privacy pane',(.76,.82,.77,.85),.8)

def mesh(label,verts,faces,mat,smooth=False):
 me=bpy.data.meshes.new(prefix+label);me.from_pydata(verts,[],faces);me.update();uv=me.uv_layers.new(name='UVMap')
 for p in me.polygons:
  axes=(0,1)if abs(p.normal.z)>.6 else(1,2)if abs(p.normal.x)>abs(p.normal.y)else(0,2)
  for l in p.loop_indices:
   v=me.vertices[me.loops[l].vertex_index].co;uv.data[l].uv=(v[axes[0]],v[axes[1]])
  p.use_smooth=smooth
 ob=bpy.data.objects.new(prefix+label,me);coll.objects.link(ob);me.materials.append(mat);ob['source_name']=ob.name;ob['ensuite_revision']=1;owned.append(ob);return ob

def box(label,c,size,mat=oak,angle=0,bevel=.006):
 x,y,h=c;a,b,d=[v/2 for v in size];co,si=math.cos(angle),math.sin(angle)
 verts=[(x+dx*co-dy*si,y+dx*si+dy*co,h+dz)for dx,dy,dz in[(-a,-b,-d),(-a,-b,d),(-a,b,-d),(-a,b,d),(a,-b,-d),(a,-b,d),(a,b,-d),(a,b,d)]]
 ob=mesh(label,verts,[(2,6,4,0),(5,7,3,1),(4,5,1,0),(3,7,6,2),(1,3,2,0),(6,7,5,4)],mat)
 if bevel:
  mod=ob.modifiers.new('Eased edges','BEVEL');mod.width=min(bevel,min(size)/3);mod.segments=4;ob.modifiers.new('Corner normals','WEIGHTED_NORMAL')
 return ob

def tube(label,points,r,mat,sides=16):
 pts=[Vector(p)for p in points];verts=[]
 for i,p in enumerate(pts):
  tangent=(pts[min(i+1,len(pts)-1)]-pts[max(0,i-1)]).normalized();axis=Vector((0,0,1))if abs(tangent.z)<.9 else Vector((1,0,0));u=tangent.cross(axis).normalized();v=tangent.cross(u)
  verts.extend(tuple(p+r*(u*math.cos(j*2*math.pi/sides)+v*math.sin(j*2*math.pi/sides)))for j in range(sides))
 faces=[tuple(reversed(range(sides))),tuple(range((len(pts)-1)*sides,len(pts)*sides))]
 faces += [(i*sides+j,i*sides+(j+1)%sides,(i+1)*sides+(j+1)%sides,(i+1)*sides+j)for i in range(len(pts)-1)for j in range(sides)]
 return mesh(label,verts,faces,mat,True)

def lathe(label,c,profile,scale,mat,n=72):
 verts=[(c[0]+r*scale[0]*math.cos(j*2*math.pi/n),c[1]+r*scale[1]*math.sin(j*2*math.pi/n),c[2]+h)for r,h in profile for j in range(n)]
 faces=[(i*n+j,i*n+(j+1)%n,(i+1)*n+(j+1)%n,(i+1)*n+j)for i in range(len(profile)-1)for j in range(n)]
 return mesh(label,verts,faces,mat,True)

def sphere(label,c,size,mat):
 return lathe(label,c,[(math.sin(math.pi*j/20),-math.cos(math.pi*j/20)*size[2]/2)for j in range(21)],(size[0]/2,size[1]/2),mat,48)
def slab(label,poly,h,mat):
 vs=[Vector((x,y,h))for x,y in poly];lookup={tuple(v):i for i,v in enumerate(vs)};tris=tessellate_polygon([vs]);return mesh(label,vs,[tuple(v if isinstance(v,int)else lookup[tuple(v)]for v in tri)for tri in tris],mat)
def bounds(ob):
 pts=[ob.matrix_world@Vector(v)for v in ob.bound_box];return[min(p[i]for p in pts)for i in range(3)]+[max(p[i]for p in pts)for i in range(3)]
def register(label,keys):obstacles.append({'name':label,'objects':[o.name for o in owned if any(o.name.startswith(prefix+k)for k in keys)]})
def block(label,rect,h,mat=oak,bottom=0):
 xa,ya,xb,yb=rect;return box(label,((xa+xb)/2,(ya+yb)/2,z+(bottom+h)/2),(xb-xa,yb-ya,h-bottom),mat)
f=cfg['fixtures'];slab('limestone floor',cfg['bathroom_polygon'],z+.006,stone);slab('dressing oak floor',cfg['dressing_polygon'],z+.004,oak)
slab('bathroom stone threshold',[(11.45,-7.01),(12.40,-7.01),(12.40,-6.89),(11.45,-6.89)],z+.005,stone)
# Large-format floor joints remain fine and flush.
for xx in(10.50,11.10,11.70,12.30,12.90,13.50):box('floor tile joint',(xx,-5.07,z+.0065),(.0018,3.61,.0008),grout,bevel=0)
for yy in(-6.86,-6.26,-5.66,-5.06,-4.46,-3.86):box('floor cross joint',(12.11,yy,z+.0065),(3.27,.0018,.0008),grout,bevel=0)
for xa,xb in((9.96,11.45),(12.40,13.75)):box('bathroom dividing wall',((xa+xb)/2,-6.95,z+1.24),(xb-xa,.12,2.48),white,bevel=0)
box('bathroom doorway header',(11.925,-6.95,5.165),(.95,.12,.23),white,bevel=0)
for xx in(11.4375,12.4125):box('bathroom door jamb',(xx,-6.95,z+1.13),(.025,.145,2.26),oak)
box('bathroom door open',(12.40,-7.425,z+1.14),(.044,.95,2.22),oak)
for xx in(12.36,12.44):tube('bathroom lever handle',[(xx,-7.7,z+1.02),(xx,-7.82,z+1.02)],.009,bronze)
for h in(.25,1.1,1.95):tube('bathroom hinge',[(12.40,-6.95,z+h),(12.40,-6.95,z+h+.08)],.009,bronze)
register('Bathroom open leaf',['bathroom door open','bathroom lever handle'])
# Thin interior stone linings retain the actual north openings.
box('west stone lining',(10.478,-5.015,z+1.24),(.016,3.45,2.48),stone,bevel=.001)
box('east stone lining',(13.742,-5.075,z+1.24),(.016,3.63,2.48),stone,bevel=.001)
for xa,xb in((10.47,10.705),(11.705,12.185),(13.185,13.75)):box('north stone pier',((xa+xb)/2,-3.268,z+1.24),(xb-xa,.018,2.48),stone,bevel=.001)
for xa,xb in((10.705,11.705),(12.185,13.185)):
 box('north stone below window',((xa+xb)/2,-3.268,z+.425),(xb-xa,.018,.85),stone,bevel=.001)
 box('north stone above window',((xa+xb)/2,-3.268,5.19),(xb-xa,.018,.18),stone,bevel=.001)
 for xx in(xa+.005,xb-.005):box('north tiled reveal',(xx,-3.213,4.375),(.01,.09,1.45),stone,bevel=.001)
 box('north window stone sill',((xa+xb)/2,-3.215,3.661),(xb-xa,.11,.022),stone,bevel=.002)
 box('north window tiled head',((xa+xb)/2,-3.213,5.095),(xb-xa,.09,.01),stone,bevel=.001)
 # Separate privacy lining preserves original glass objects and openings.
 box('north obscure privacy pane',((xa+xb)/2,-3.183,4.375),(xb-xa-.11,.006,1.34),privacy,bevel=0)
# Full-size hollow bath: continuous outer wall, eased rim, inner bowl and base.
lathe('oval bath hollow shell',(13.16,-4.30,z),[(0,.035),(.69,.035),(.77,.075),(.84,.20),(.94,.43),(1,.565),(1,.585),(.986,.598),(.955,.598),(.935,.575),(.885,.43),(.77,.23),(.64,.15),(.30,.145),(0,.145)],(.4,.9),ceramic)
tube('bath waste',[(13.16,-4.30,z+.146),(13.16,-4.30,z+.151)],.035,bronze,40)
box('bath overflow slot',(13.16,-3.493,z+.49),(.09,.011,.008),dark,bevel=.002)
tube('bath floor filler',[(13.60,-4.34,z+.01),(13.60,-4.34,z+.84),(13.58,-4.34,z+.89),(13.45,-4.34,z+.89),(13.43,-4.34,z+.86)],.018,bronze,24)
tube('bath filler base',[(13.60,-4.34,z+.01),(13.60,-4.34,z+.024)],.065,bronze,40)
tube('bath filler control',[(13.6,-4.34,z+.69),(13.6,-4.25,z+.69)],.012,bronze)
box('bath oak bridge',(13.16,-4.87,z+.63),(.85,.22,.035),oak,bevel=.015)
box('bath folded towel',(13.19,-4.86,z+.675),(.26,.19,.055),linen,bevel=.018)
register('Bath',['oval bath hollow shell','bath oak bridge'])
# Vanity: floating oak drawers, stone top and two ceramic bowls.
block('vanity carcass',f['vanity'],.81,oak,.30)
box('vanity stone countertop',(10.745,-5.94,z+.835),(.55,1.80,.05),stone,bevel=.008)
for j,yy in enumerate((-6.39,-5.49)):
 for h in(.43,.68):
  box('vanity drawer front',(11.023,yy,z+h),(.018,.878,.23),oak)
  box('vanity recessed pull',(11.034,yy,z+h+.093),(.010,.76,.012),dark,bevel=.002)
 lathe('basin hollow bowl '+str(j),(10.78,yy,z+.86),[(0,0),(.65,0),(.82,.035),(1,.105),(1,.12),(.94,.122),(.90,.1),(.71,.025),(0,.025)],(.20,.30),ceramic)
 tube('basin waste',[(10.78,yy,z+.887),(10.78,yy,z+.891)],.026,bronze,32)
 tube('basin wall spout',[(10.49,yy,z+1.12),(10.71,yy,z+1.12),(10.74,yy,z+1.09)],.014,bronze,24)
 for dy in(-.105,.105):tube('basin wall control',[(10.49,yy+dy,z+1.11),(10.54,yy+dy,z+1.11)],.026,bronze,32)
 box('vanity mirror bronze surround',(10.50,yy,z+1.73),(.027,.78,1.05),bronze,bevel=.015)
 box('vanity mirror face',(10.518,yy,z+1.73),(.008,.754,1.024),mirror,bevel=.012)
 mirrors.append({'name':'Basin mirror '+str(j),'position':[10.523,yy,z+1.73],'normal':[1,0,0],'width':.754,'height':1.024})
 for edge in(-.415,.415):box('mirror vertical light',(10.507,yy+edge,z+1.73),(.025,.022,.89),opal)
 # Soap bottle and pump remain outside bowl.
 tube('soap bottle',[(10.84,yy+.34,z+.862),(10.84,yy+.34,z+.972)],.029,ceramic,32)
 tube('soap pump',[(10.84,yy+.34,z+.98),(10.84,yy+.34,z+1.01),(10.88,yy+.34,z+1.01)],.006,bronze)
box('vanity undershelf',(10.745,-5.94,z+.19),(.49,1.72,.024),oak)
for yy in(-6.40,-5.47):
 for i in range(3):box('vanity folded towel',(10.77,yy,z+.235+i*.054),(.35,.43,.05),linen,bevel=.012)
box('vanity underlight',(10.99,-5.94,z+.295),(.015,1.7,.012),opal)
register('Vanity',['vanity carcass','vanity stone countertop','vanity drawer front','vanity recessed pull','vanity undershelf'])
# Doorless shower: fixed glazing with a 900 mm nominal opening.
box('shower east fixed Glass',(11.90,-4.11,z+1.075),(.010,1.68,2.13),glass,bevel=.001)
box('shower south fixed Glass',(10.735,-4.96,z+1.075),(.53,.010,2.13),glass,bevel=.001)
for y in(-4.90,-3.34):box('shower glass foot clamp',(11.9,y,z+.025),(.035,.05,.05),bronze)
box('shower west glass channel',(10.49,-4.96,z+1.075),(.025,.022,2.13),bronze)
tube('shower glass support',[(11.90,-3.80,z+2.07),(10.49,-3.80,z+2.07)],.006,bronze)
tube('rainhead drop',[(11.15,-3.93,ceiling-.02),(11.15,-3.93,z+2.18)],.013,bronze)
tube('rainhead disc',[(11.15,-3.93,z+2.15),(11.15,-3.93,z+2.17)],.15,bronze,64)
for rr,count in((.045,10),(.087,18),(.127,26)):
 for i in range(count):
  a=i*2*math.pi/count;tube('rainhead nozzle',[(11.15+rr*math.cos(a),-3.93+rr*math.sin(a),z+2.146),(11.15+rr*math.cos(a),-3.93+rr*math.sin(a),z+2.151)],.003,ceramic,8)
for yy in(-4.62,-4.48):tube('shower thermostatic control',[(10.49,yy,z+1.12),(10.54,yy,z+1.12)],.028,bronze,32)
tube('handshower rail',[(10.54,-4.30,z+.90),(10.54,-4.30,z+1.84)],.01,bronze)
tube('handshower head',[(10.55,-4.30,z+1.55),(10.60,-4.30,z+1.75)],.024,bronze)
tube('handshower hose',[(10.54,-4.30,z+1.55),(10.57,-4.30,z+.85),(10.60,-4.41,z+.68),(10.56,-4.57,z+.80),(10.54,-4.57,z+1.12)],.006,bronze)
box('shower linear drain',(11.15,-3.35,z+.009),(1.1,.06,.009),bronze)
for i in range(30):box('drain slot',(10.64+i*.035,-3.35,z+.014),(.012,.035,.002),dark,bevel=.001)
# Shallow mounted shelf, not an unmodelled hole in an exterior wall.
box('shower stone shelf',(10.55,-3.95,z+1.11),(.14,.49,.028),stone)
for j in range(3):tube('shower bottle',[(10.56,-4.12+j*.16,z+1.135),(10.56,-4.12+j*.16,z+1.29+j*.022)],.034,ceramic if j!=1 else taupe,24)
register('Shower glass',['shower east fixed Glass','shower south fixed Glass','shower west glass channel'])
# Privacy return and concealed cistern; WC faces north into a generous front zone.
block('WC privacy return',f['wc_screen'],1.72,stone)
block('WC cistern boxing',f['cistern'],1.16,stone)
box('WC flush plate',(13.245,-6.672,z+1.00),(.23,.014,.15),bronze)
for xx,w in((13.197,.084),(13.299,.066)):box('WC flush button',(xx,-6.662,z+1.00),(w,.009,.094),bronze,bevel=.006)
lathe('WC hollow bowl',(13.245,-6.40,z),[(0,.18),(.7,.18),(.82,.22),(1,.37),(1,.405),(.96,.42),(.80,.42),(.74,.385),(.50,.24),(0,.23)],(.20,.28),ceramic)
lathe('WC seat ring',(13.245,-6.40,z),[(.79,.424),(.99,.424),(1,.435),(.985,.446),(.80,.446),(.78,.438),(.79,.424)],(.20,.28),ceramic)
box('WC rear mount',(13.245,-6.6575,z+.255),(.26,.045,.11),ceramic,bevel=.012)
sphere('WC raised lid',(13.245,-6.665,z+.67),(.4,.024,.47),ceramic)
for xx in(13.13,13.36):tube('WC seat hinge',[(xx,-6.60,z+.425),(xx,-6.56,z+.425)],.017,bronze)
tube('toilet roll holder',[(13.70,-6.43,z+.68),(13.63,-6.43,z+.68),(13.63,-6.28,z+.68)],.009,bronze)
tube('toilet roll',[(13.63,-6.405,z+.68),(13.63,-6.30,z+.68)],.056,linen,40)
tube('WC brush canister',[(13.65,-6.72,z+.01),(13.65,-6.72,z+.28)],.052,bronze,40)
register('WC screen',['WC privacy return']);register('WC bowl',['WC hollow bowl','WC seat ring','WC rear mount','WC raised lid']);register('Cistern',['WC cistern boxing'])
# Towel warmer on the east wall below the window-free middle section.
for yy in(-6.02,-5.48):tube('towel rail upright',[(13.69,yy,z+.64),(13.69,yy,z+1.67)],.012,bronze)
for h in(.69,.86,1.03,1.30,1.47,1.64):tube('towel warmer rung',[(13.69,-6.02,z+h),(13.69,-5.48,z+h)],.009,bronze)
box('hanging bath towel',(13.668,-5.76,z+1.10),(.025,.36,.69),linen,bevel=.01)
# Wardrobe modules in local coordinates: u across the bay, v from back to front.
def wardrobe(label,origin,width,angle,kind):
 ox,oy=origin;co,si=math.cos(angle),math.sin(angle)
 def p(u,v,h):return(ox+u*co-v*si,oy+u*si+v*co,z+h)
 def b(n,u,v,h,size,mat=oak,bevel=.004):return box(label+' '+n,p(u,v,h),size,mat,angle,bevel)
 def t(n,pts,r,mat):return tube(label+' '+n,[p(*q)for q in pts],r,mat)
 b('back',0,.016,1.20,(width,.032,2.30));b('base',0,.325,.105,(width,.65,.09));b('top',0,.325,2.325,(width,.65,.05))
 for u in(-width/2+.01,width/2-.01):b('side',u,.325,1.205,(.02,.65,2.31));b('vertical light',u,.60,1.20,(.01,.012,2.04),opal)
 b('luggage shelf',0,.32,2.02,(width-.04,.60,.025))
 b('linen box',0,.32,2.16,(width*.70,.40,.23),linen,.012)
 b('linen box pull',0,.527,2.16,(.105,.012,.035),bronze)
 if kind=='shelves':
  for h in(.42,.72,1.02,1.32,1.62):
   b('shoe shelf',0,.34,h,(width-.04,.57,.022))
   if h<1.1:
    for u in(-.125,.125):
     shoe=sphere(label+' shoe',p(u,.38,h+.05),(.105,.28,.09),taupe);# footwear remains individually editable
   else:
    for j in range(3):b('folded knit',0,.36,h+.04+j*.05,(width*.65,.39,.046),cream if j%2 else taupe,.012)
 else:
  levels=(.99,1.88)if kind=='double'else(1.88,)
  if kind=='drawers':
   for h in(.27,.47,.67):
    b('drawer',0,.61,h,(width-.045,.04,.186));b('drawer pull',0,.635,h+.07,(width-.15,.016,.012),dark)
  for h in levels:
   t('hanging rail',[(-width/2+.02,.34,h),(width/2-.02,.34,h)],.013,bronze)
   for i in range(5):
    u=-width*.34+i*width*.17
    t('hanger hook',[(u,.34,h+.005),(u,.36,h+.036),(u,.40,h+.025),(u,.40,h-.08)],.004,bronze)
    t('oak hanger',[(u,.15,h-.20),(u,.39,h-.085),(u,.60,h-.20),(u,.15,h-.20)],.011,oak)
    length=.62 if kind in('double','drawers')else 1.18
    cloth=[cream,taupe,charcoal,cream,taupe][i]
    # A cloth shell shaped from shoulders to hem, rather than a wardrobe-sized block.
    verts=[p(u+du,vv,hh)for du in(-.025,.025)for vv,hh in[(.17,h-.20),(.34,h-.13),(.56,h-.20),(.57,h-.34),(.50,h-.39),(.49,h-length),(.22,h-length),(.20,h-.39),(.14,h-.34)]]
    n=9;faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(j,(j+1)%n,(j+1)%n+n,j+n)for j in range(n)]
    ob=mesh(label+' hanging garment',verts,faces,cloth);mod=ob.modifiers.new('Soft cloth edges','BEVEL');mod.width=.018;mod.segments=4;ob.modifiers.new('Cloth corner normals','WEIGHTED_NORMAL')
  if kind=='long':b('shoe shelf',0,.32,.30,(width-.04,.60,.025))
for i,kind in enumerate(('double','drawers','shelves')):wardrobe('west wardrobe bay '+str(i),(9.96,-7.10-(i+.5)*(1.90/3)),1.90/3,-math.pi/2,kind)
for i,kind in enumerate(('double','long','drawers')):wardrobe('south wardrobe bay '+str(i),(11.70+(i+.5)*2/3,-10.20),2/3,0,kind)
register('West wardrobe',['west wardrobe']);register('South wardrobe',['south wardrobe'])
block('window drawers carcass',f['window_drawers'],.59,oak,.07)
box('window drawer stone top',(13.45,-8,z+.605),(.60,1.60,.03),stone)
for yy in(-8.40,-7.60):
 for h in(.20,.43):
  box('window drawer front',(13.145,yy,z+h),(.015,.777,.21),oak)
  box('window drawer pull',(13.134,yy,z+h+.079),(.012,.63,.013),dark)
register('Window drawers',['window drawers carcass','window drawer stone top','window drawer front','window drawer pull'])
# Full-length mirror faces into the dressing room from the bathroom divider.
box('dressing mirror bronze surround',(10.99,-7.036,z+1.18),(.69,.03,1.98),bronze)
box('dressing mirror face',(10.99,-7.056,z+1.18),(.66,.01,1.95),mirror)
mirrors.append({'name':'Dressing mirror','position':[10.99,-7.063,z+1.18],'normal':[0,-1,0],'width':.66,'height':1.95})
# A shallow valet tray leaves the window ledge useful; no furniture in the route.
box('dressing jewellery tray',(13.43,-7.48,z+.64),(.30,.37,.035),taupe,bevel=.012)
for yy in(-7.61,-7.36):box('tray compartment',(13.43,yy,z+.66),(.27,.014,.025),oak)
for yy in(-7.0,-9.2):
 box('wardrobe switchplate',(12.66 if yy==-7 else 9.977,yy,z+1.05),(.08 if yy==-7 else .014,.014 if yy==-7 else .08,.10),bronze)
# Ceiling lights and extraction faceplates; duct routes not asserted by this model.
for xx,yy in((11.62,-6.16),(12.36,-4.50),(11.3,-8.25),(12.35,-9.0)):
 cutaway.append(tube('ceiling downlight trim',[(xx,yy,ceiling-.018),(xx,yy,ceiling-.01)],.045,bronze,40).name)
 cutaway.append(tube('ceiling downlight lens',[(xx,yy,ceiling-.023),(xx,yy,ceiling-.019)],.034,opal,32).name)
cutaway.append(box('extract grille',(12.4,-6.45,ceiling-.014),(.23,.23,.022),white).name)
for i in range(9):cutaway.append(box('extract slot',(12.4,-6.53+i*.02,ceiling-.027),(.18,.008,.003),dark,bevel=.001).name)
study.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();rays=[]
for eye in((11.80,-7.18,z+1.6),(11.90,-7.55,z+1.65),(11.55,-6.95,z+1.6)):
 for target_h in(.43,1.15,1.30):
  target=Vector((13.245,-6.40,z+target_h));delta=target-Vector(eye);hit,loc,n,face,ob,mat=study.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length)
  ok=hit and any(ob.get('source_name',ob.name).startswith(prefix+k) for k in ('WC privacy return','bathroom door open','bathroom dividing wall'));rays.append({'eye':eye,'target':list(target),'screened':ok,'hit':ob.name if hit else None});assert ok,rays[-1]

assert all(signature(study.objects[name])==digest for name,digest in retained.items()),'Accepted bedroom/shell changed'
visible=[o for o in study.objects if o.type=='MESH'];bpy.ops.object.select_all(action='DESELECT')
for ob in visible:ob.select_set(True)
export_quiet_oak_gltf(filepath=str(out/(variant+'-ensuite.glb')),export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False)
bpy.data.libraries.write(str(evidence/'Principal suite — bathroom and wardrobe.blend'),{study},fake_user=True)
meta.update({'room':'Principal bathroom and walk-through wardrobe','status':cfg['status'],'layoutRevision':1,'configuration':cfg,'materials':{m.name:list(m.diffuse_color)for m in bpy.data.materials},'cutawayObjects':cutaway,'mirrors':mirrors,'objects':len(visible),'authored_objects':len(owned),'proposalLights':meta['proposalLights']+[{'name':'Vanity light bounce','position':[11.30,-5.9,4.6],'range':3,'intensity':1.65},{'name':'Bath daylight bounce','position':[12.40,-4.0,4.6],'range':3,'intensity':1.4},{'name':'Dressing light bounce','position':[11.90,-8.5,4.8],'range':4,'intensity':1.6}]})
(out/(variant+'-ensuite.json')).write_text(json.dumps(meta,indent=2)+'\n')
report={'variant':variant,'authored_objects':len(owned),'exported_objects':len(visible),'configuration':cfg,'native_privacy_rays':rays,'accepted_objects_preserved':len(retained),'source_bedroom_sha256':hashlib.sha256(base.read_bytes()).hexdigest(),'source_house_overwritten':False,'obstacle_groups':obstacles,'authored_bounds':[{'name':o.name,'bounds':bounds(o)}for o in owned],'retained_bounds':[{'name':o.get('source_name',o.name),'bounds':bounds(o)}for o in visible if o not in owned]}
(evidence/'report.json').write_text(json.dumps(report,indent=2)+'\n');print('ENSUITE_EXPORTED',variant,len(owned),'new editable meshes;',len(retained),'accepted objects preserved',flush=True)
