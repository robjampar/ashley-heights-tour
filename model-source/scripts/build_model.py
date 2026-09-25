"""Reconstruct Ashley Heights from its published plan and original panoramas.

Run with Blender --background --python scripts/build_model.py.
Plan coordinates below refer to the supplied floorplan resized to 2048 px wide.
This is an editable architectural reconstruction, not measured scan geometry.
"""
import bpy, math, json, sys
from pathlib import Path
from mathutils import Vector, Quaternion

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from dimension_spec import point as calibrated_point, THICKNESS, X, Y
OUT = ROOT / __import__('os').environ.get('ASHLEY_OUTPUT','output-walkthrough')
OUT.mkdir(exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for c in list(bpy.data.collections):
    if c.name != 'Collection': bpy.data.collections.remove(c)
base = bpy.data.collections.get('Collection')
base.name = '00 Model information'
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.length_unit = 'METERS'
scene.unit_settings.scale_length = 1.0
collections = {}
record = []
wall_specs = []
materials = {}
PALETTE = {
    'Warm plaster': (0.86,0.83,0.71,1), 'White joinery': (0.92,0.93,0.90,1),
    'Red brown brick': (0.43,0.19,0.105,1), 'Slate roof': (0.13,0.145,0.14,1),
    'Blue carpet': (0.19,0.36,0.43,1), 'Rose carpet': (0.51,0.28,0.31,1),
    'Green carpet': (0.20,0.42,0.35,1), 'Oak': (0.43,0.23,0.085,1),
    'Dark walnut': (0.23,0.10,0.042,1), 'Stone': (0.54,0.51,0.42,1),
    'Concrete': (0.48,0.48,0.45,1), 'Glazing': (0.43,0.68,0.76,0.30),
    'Metal': (0.09,0.10,0.10,1), 'Porcelain': (0.91,0.91,0.84,1),
    'Cream tile': (0.76,0.72,0.60,1), 'Burgundy leather': (0.40,0.065,0.065,1),
    'Cream upholstery': (0.59,0.57,0.39,1), 'Bed linen': (0.56,0.60,0.62,1),
    'Gravel': (0.37,0.37,0.33,1), 'Grass': (0.28,0.39,0.15,1),
    'Foliage': (0.13,0.25,0.095,1), 'Water': (0.25,0.51,0.58,1),
    'Reference teal': (0.06,0.40,0.43,1), 'Book red': (0.43,0.16,0.13,1),
}
for name, color in PALETTE.items():
    m = bpy.data.materials.new(name); m.diffuse_color = color; m.use_nodes = True
    bsdf = m.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = 0.65
    if name == 'Glazing':
        bsdf.inputs['Transmission Weight'].default_value = .75
        bsdf.inputs['Roughness'].default_value = .12
        bsdf.inputs['Alpha'].default_value = .3
        m.surface_render_method = 'DITHERED'
    if name == 'Metal': bsdf.inputs['Metallic'].default_value = .65
    if name == 'Red brown brick':
        tex = m.node_tree.nodes.new('ShaderNodeTexBrick')
        tex.inputs['Color1'].default_value = (.47,.20,.10,1)
        tex.inputs['Color2'].default_value = (.26,.105,.045,1)
        tex.inputs['Mortar'].default_value = (.37,.33,.26,1)
        tex.inputs['Scale'].default_value = 3.2
        tex.inputs['Mortar Size'].default_value = .025
        tex.inputs['Brick Width'].default_value = .7
        tex.inputs['Row Height'].default_value = .24
        coord = m.node_tree.nodes.new('ShaderNodeTexCoord')
        m.node_tree.links.new(coord.outputs['Generated'],tex.inputs['Vector'])
        # Base colour remains portable in SketchUp / GLB. Detail is Blender-only.
        bump = m.node_tree.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = .13
        bump.inputs['Distance'].default_value = .025
        m.node_tree.links.new(tex.outputs['Fac'],bump.inputs['Height'])
        m.node_tree.links.new(bump.outputs['Normal'],bsdf.inputs['Normal'])
    materials[name] = m

def collection(name):
    if name not in collections:
        c=bpy.data.collections.new(name);scene.collection.children.link(c);collections[name]=c
    return collections[name]

def mesh(name, vertices, faces, mat, layer, face_mats=None):
    me=bpy.data.meshes.new(name);me.from_pydata(vertices,[],faces);me.update()
    ob=bpy.data.objects.new(name,me);collection(layer).objects.link(ob)
    mats = [mat] if isinstance(mat,str) else mat
    for m in mats: me.materials.append(materials[m])
    if face_mats:
        for p,idx in zip(me.polygons,face_mats):p.material_index=idx
    ob['source_name']=name
    ob['basis']='Floorplan traced; heights and visual details estimated from original panoramas'
    record.append({'name':name,'object_name':ob.name,'layer':layer,'vertices':[list(v) for v in vertices],
                   'faces':[list(f) for f in faces],'materials':mats,'face_materials':face_mats or [0]*len(faces)})
    return ob

def box(name, center, size, mat, layer, angle=0):
    x,y,z=center;a,b,c=[v/2 for v in size];co,si=math.cos(angle),math.sin(angle)
    vertices=[]
    for u,v,w in [(-a,-b,-c),(a,-b,-c),(a,b,-c),(-a,b,-c),(-a,-b,c),(a,-b,c),(a,b,c),(-a,b,c)]:
        vertices.append((x+u*co-v*si,y+u*si+v*co,z+w))
    return mesh(name,vertices,[(0,3,2,1),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7),(4,5,6,7)],mat,layer)

def prism(name, xy, z0, z1, mat, layer):
    # Ensure footprint is counterclockwise.
    if sum(xy[i][0]*xy[(i+1)%len(xy)][1]-xy[(i+1)%len(xy)][0]*xy[i][1] for i in range(len(xy)))<0: xy=xy[::-1]
    n=len(xy);v=[(x,y,z) for z in (z0,z1) for x,y in xy]
    f=[tuple(reversed(range(n))),tuple(range(n,2*n))]
    f += [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    return mesh(name,v,f,mat,layer)

def cylinder(name,center,radius,depth,mat,layer,n=20,scale=(1,1)):
    xy=[(center[0]+radius*scale[0]*math.cos(i*math.tau/n),center[1]+radius*scale[1]*math.sin(i*math.tau/n)) for i in range(n)]
    return prism(name,xy,center[2]-depth/2,center[2]+depth/2,mat,layer)

def beam(name,a,b,width,mat,layer):
    d=Vector(b)-Vector(a);mid=(Vector(a)+Vector(b))/2
    ob=box(name,(0,0,0),(width,width,d.length),mat,layer)
    rot=Vector((0,0,1)).rotation_difference(d.normalized())
    transformed=[]
    for vert in ob.data.vertices:vert.co=rot@vert.co+mid;transformed.append(list(vert.co))
    record[-1]['vertices']=transformed
    return ob

from height_spec import LEVEL, GROUND_CEILING as HEIGHT, FIRST_CEILING, CEILINGS, EAVES, ROOF_RISE
def pt(x,y,floor=0):return calibrated_point(x,y,floor)
def pbox(name,rect,z,h,mat,layer,floor=0):
    x1,y1,x2,y2=rect;a=pt(x1,y1,floor);b=pt(x2,y2,floor)
    return box(name,((a[0]+b[0])/2,(a[1]+b[1])/2,z+h/2),(abs(b[0]-a[0]),abs(b[1]-a[1]),h),mat,layer)
def ppoly(name,poly,z,h,mat,layer,floor=0):return prism(name,[pt(*p,floor) for p in poly],z,z+h,mat,layer)

rooms=[]
def room(name,poly,floor,finish,dimensions=None):
    z=floor*LEVEL
    ppoly(name+' | floor',poly,z-.14,.14,finish,f'{floor+1}0 {"Ground" if floor==0 else "First"} floor - floors',floor)
    ppoly(name+' | ceiling',poly,z+CEILINGS[floor],.10,'Warm plaster',f'{floor+1}5 Ceilings',floor)
    rooms.append({'name':name,'floor':floor,'polygon':poly,'polygon_m':[list(pt(*p,floor)) for p in poly],'published_dimensions_m':dimensions})

room('Garage',[(65,181),(182,181),(182,314),(303,314),(303,579),(65,579)],0,'Concrete',[4.95,5.76])
room('Utility',[(182,181),(303,181),(303,314),(182,314)],0,'Blue carpet',[2.56,2.70])
room('Kitchen breakfast room',[(303,181),(534,181),(534,347),(501,347),(501,400),(303,400)],0,'Blue carpet',[4.80,4.63])
bay_dining=[(534,347),(534,149),(574,103),(667,103),(707,149),(707,347)]
room('Dining room',bay_dining,0,'Rose carpet',[3.56,5.20])
room('Drawing room',[(707,181),(936,181),(936,579),(889,579),(861,592),(842,598),(800,598),(781,592),(754,579),(707,579)],0,'Rose carpet',[4.85,8.92])
room('Family room',[(303,400),(501,400),(501,579),(481,579),(455,592),(436,598),(394,598),(374,592),(348,579),(303,579)],0,'Rose carpet',[4.14,4.13])
room('Cloakroom',[(501,461),(579,461),(579,579),(501,579)],0,'Blue carpet',[1.47,2.41])
room('Entrance hall',[(501,347),(707,347),(707,579),(579,579),(579,461),(501,461)],0,'Blue carpet')
# Preserve the stair opening through the hall ceiling.
bpy.data.objects.remove(bpy.data.objects['Entrance hall | ceiling'],do_unlink=True)
record[:]=[ob for ob in record if ob['name']!='Entrance hall | ceiling']
for label,poly in [
    ('rear',[(501,347),(707,347),(707,416),(501,416)]),
    ('west',[(501,416),(659,416),(659,579),(579,579),(579,461),(501,461)]),
    ('front',[(659,556),(707,556),(707,579),(659,579)]),
]:ppoly('Entrance hall ceiling '+label,poly,HEIGHT,.10,'Warm plaster','15 Ceilings')
room('Bedroom 3',[(990,168),(1222,168),(1222,214),(1222,367),(1166,367),(1166,317),(990,317)],1,'Green carpet',[4.86,2.96])
room('Bedroom 5',[(990,317),(1166,317),(1166,427),(990,427)],1,'Green carpet',[3.60,2.36])
room('Bedroom 4',[(990,427),(1223,427),(1223,481),(1187,481),(1187,579),(990,579)],1,'Green carpet',[4.10,3.01])
room('Bedroom 4 en suite',[(1223,441),(1266,441),(1266,579),(1187,579),(1187,481),(1223,481)],1,'Green carpet',[1.49,2.01])
room('Linen cupboard',[(1223,427),(1266,427),(1266,441),(1223,441)],1,'Warm plaster')
room('Bathroom',[(1222,214),(1317,214),(1317,297),(1346,297),(1346,367),(1222,367)],1,'Blue carpet',[2.57,3.18])
room('Principal en suite',[(1317,214),(1391,214),(1391,329),(1346,329),(1346,297),(1317,297)],1,'Cream tile')
room('Principal bedroom',[(1391,168),(1618,168),(1618,395),(1436,395),(1436,367),(1391,367)],1,'Green carpet',[4.72,4.79])
room('Bedroom 2',[(1436,395),(1618,395),(1618,579),(1385,579),(1385,439),(1436,439)],1,'Green carpet',[4.85,3.64])
# Landing slab is split around the staircase rather than covering the stairwell.
room('Landing',[(1166,367),(1346,367),(1346,329),(1391,329),(1391,367),(1436,367),(1436,439),(1385,439),(1385,438),(1347,438),(1347,534),(1326,534),(1326,579),(1266,579),(1266,427),(1166,427)],1,'Blue carpet')
balcony=[(1222,214),(1391,214),(1391,130),(1349,88),(1263,88),(1222,130)]
ppoly('Balcony deck',balcony,LEVEL-.18,.18,'Stone','23 Balcony',1)

def wall(name,a,b,floor=0,external=False,openings=(),height=None,thick=None,layer=None):
    """Openings are (distance from a in metres, width, sill, head, kind)."""
    height=CEILINGS[floor] if height is None else height
    a=Vector(pt(*a,floor));b=Vector(pt(*b,floor));delta=b-a;length=delta.length;u=delta/length;n=Vector((-u.y,u.x))
    angle=math.atan2(u.y,u.x);z=floor*LEVEL;t=thick or THICKNESS.get(name,.23 if external else .13)
    wall_specs.append({'name':name,'floor':floor,'a':list(a),'b':list(b),'thickness_m':t,'external':external,'openings':list(openings)})
    layer=layer or f'{floor+1}1 {"Ground" if floor==0 else "First"} floor - walls'
    def seg(start,end,lo,hi,suffix):
        if end-start<.004 or hi-lo<.004:return
        pos=a+u*((start+end)/2)
        ob=box(name+' | '+suffix,(pos.x,pos.y,z+(lo+hi)/2),(end-start,t,hi-lo),'Warm plaster',layer,angle)
        if external:
            ob.data.materials.append(materials['Red brown brick']);ob.data.polygons[3].material_index=1
            # Outside faces are on the left of the clockwise perimeter trace.
            record[-1]['materials']=['Warm plaster','Red brown brick'];record[-1]['face_materials']=[0,0,0,1,0,0]
        # Skirting and cornice are separate objects and remain editable.
        if lo==0:
            for side in (-1,1):
                if external and side==1:continue
                p=pos+n*side*(t/2+.012)
                box(name+' | skirting '+suffix+str(side),(p.x,p.y,z+.07),(end-start,.025,.14),'White joinery',f'{floor+1}4 Trim',angle)
        if hi==height:
            for side in (-1,1):
                if external and side==1:continue
                p=pos+n*side*(t/2+.035)
                box(name+' | cornice '+suffix+str(side),(p.x,p.y,z+height-.055),(end-start,.07,.10),'White joinery',f'{floor+1}4 Trim',angle)
    prev=0
    for i,(center,w,sill,head,kind) in enumerate(sorted(openings)):
        left=max(0,center-w/2);right=min(length,center+w/2);w=right-left;center=(left+right)/2
        seg(prev,left,0,height,'pier '+str(i));seg(left,right,0,sill,'below '+str(i));seg(left,right,head,height,'lintel '+str(i))
        centerpt=a+u*center
        frame_layer=f'{floor+1}2 Doors and windows'
        if kind in ('window','french','garage'):
            if kind=='garage':
                box(name+' | garage door',(centerpt.x,centerpt.y,z+(sill+head)/2),(w-.025,.065,head-sill-.02),'White joinery',frame_layer,angle)
                for off in [-.32,0,.32]:
                    p=centerpt+u*w*off
                    box(name+' | garage panel moulding',(p.x,p.y,z+(sill+head)/2),(w*.30,.085,head-sill-.18),'White joinery',frame_layer,angle)
            else:
                glass=box(name+' | glazing',(centerpt.x,centerpt.y,z+(sill+head)/2),(w-.09,.02,head-sill-.10),'Glazing',frame_layer,angle)
                for off in (-w/2+.035,w/2-.035):
                    p=centerpt+u*off
                    box(name+' | jamb',(p.x,p.y,z+(sill+head)/2),(.07,.115,head-sill),'White joinery',frame_layer,angle)
                for elev in (sill+.035,head-.035):
                    box(name+' | frame rail',(centerpt.x,centerpt.y,z+elev),(w,.12,.07),'White joinery',frame_layer,angle)
                count=max(2,round(w/.55))
                for q in range(1,count):
                    p=centerpt+u*(-w/2+w*q/count)
                    box(name+' | mullion '+str(q),(p.x,p.y,z+(sill+head)/2),(.045,.10,head-sill-.08),'White joinery',frame_layer,angle)
                elev=sill+(head-sill)*.70
                box(name+' | transom',(centerpt.x,centerpt.y,z+elev),(w,.10,.045),'White joinery',frame_layer,angle)
                box(name+' | sill',(centerpt.x,centerpt.y,z+sill-.025),(w+.10,t+.13,.05),'White joinery',frame_layer,angle)
        elif kind in ('door','double','entry'):
            leafmat='Dark walnut' if floor==0 else 'White joinery'
            for off in (-w/2,w/2):
                p=centerpt+u*off
                box(name+' | door architrave',(p.x,p.y,z+head/2),(.075,t+.05,head),'White joinery',frame_layer,angle)
            box(name+' | door architrave head',(centerpt.x,centerpt.y,z+head),(w+.075,t+.07,.075),'White joinery',frame_layer,angle)
            leaves=2 if kind in ('double','entry') else 1
            for leaf in range(leaves):
                width=w/leaves-.035;hinge=a+u*(left if leaf==0 else right)
                leafangle=angle+(math.radians(65) if leaf==0 else math.pi-math.radians(65))
                direction=Vector((math.cos(leafangle),math.sin(leafangle)))
                centerleaf=hinge+direction*width/2
                box(name+' | door leaf '+str(leaf),(centerleaf.x,centerleaf.y,z+head/2),(width,.04,head-.04),leafmat,frame_layer,leafangle)
                for elev in (.55,1.5):
                    box(name+' | door panel',(centerleaf.x,centerleaf.y,z+elev),(width-.13,.057,.64),leafmat,frame_layer,leafangle)
                knob=hinge+direction*(width-.10)
                cylinder(name+' | handle',(knob.x,knob.y,z+1.0),.035,.035,'Metal',frame_layer,12)
        prev=right
    seg(prev,length,0,height,'end')

def openings_px(a,b,items,floor=0):
    # items: centre coordinate along the wall, width in plan px, sill, head, type
    horizontal=a[1]==b[1]
    origin=Vector(pt(*a,floor))
    def mapped(value):return Vector(pt(value,a[1],floor) if horizontal else pt(a[0],value,floor))
    return [((mapped(center)-origin).length,(mapped(center+width/2)-mapped(center-width/2)).length,sill,head,kind) for center,width,sill,head,kind in items]
def pw(name,a,b,items=(),floor=0,external=False,**kw):return wall(name,a,b,floor,external,openings_px(a,b,items,floor),**kw)

# Ground-floor perimeter, counterclockwise in model space.
pw('Garage west',(65,579),(65,181),[(362,93,1.0,2.15,'window')],external=True)
pw('Garage rear',(65,181),(182,181),[(124,39,0,2.1,'door'),(91,30,.9,2.15,'window'),(157,27,.9,2.15,'window')],external=True)
pw('Utility rear',(182,181),(303,181),[(227,67,1.0,2.2,'window'),(279,37,0,2.15,'door')],external=True)
pw('Kitchen rear',(303,181),(534,181),[(425,154,1.05,2.10,'window')],external=True)
pw('Dining left return',(534,181),(534,149),external=True)
wall('Dining left bay',(534,149),(574,103),external=True,openings=[(.70,1.18,0,2.48,'french')])
pw('Dining rear French doors',(574,103),(667,103),[(620,61,0,2.48,'french')],external=True)
wall('Dining right bay',(667,103),(707,149),external=True,openings=[(.70,1.18,0,2.48,'french')])
pw('Dining right return',(707,149),(707,181),external=True)
pw('Drawing rear',(707,181),(936,181),[(817,168,0,2.45,'french')],external=True)
pw('Drawing east',(936,181),(936,579),external=True)
pw('Drawing front east',(936,579),(889,579),external=True)
for j,(a,b) in enumerate(zip([(889,579),(861,592),(842,598),(800,598),(781,592)],[(861,592),(842,598),(800,598),(781,592),(754,579)])):
    length=(Vector(pt(*b))-Vector(pt(*a))).length
    wall('Drawing bay '+str(j),a,b,external=True,openings=[(length/2,length-.12,.65,2.3,'window')])
pw('House front centre',(754,579),(481,579),[(620,72,0,2.49,'entry'),(546,19,.95,2.05,'window'),(684,23,.95,2.05,'window')],external=True)
for j,(a,b) in enumerate(zip([(481,579),(455,592),(436,598),(394,598),(374,592)],[(455,592),(436,598),(394,598),(374,592),(348,579)])):
    length=(Vector(pt(*b))-Vector(pt(*a))).length
    wall('Family bay '+str(j),a,b,external=True,openings=[(length/2,length-.12,.65,2.3,'window')])
pw('Family front west',(348,579),(303,579),external=True)
pw('Garage front',(303,579),(65,579),[(186,211,0,2.35,'garage')],external=True)

# Ground-floor internal partitions and actual door openings.
pw('Garage utility partition',(182,181),(182,314))
pw('Utility south',(182,314),(303,314))
pw('Garage kitchen partition',(303,181),(303,400),[(266,45,0,2.1,'door'),(332,38,0,2.1,'door')])
pw('Garage family partition',(303,400),(303,579),thick=.23)
pw('Kitchen family partition',(303,400),(501,400))
pw('Kitchen dining partition',(534,181),(534,347))
pw('Dining hall doors',(534,347),(707,347),[(622,79,0,2.35,'double')])
pw('Kitchen hall return',(501,347),(534,347))
pw('Kitchen hall door',(501,347),(501,400),[(377,39,0,2.1,'door')])
pw('Family hall door',(501,400),(501,461),[(430,46,0,2.1,'double')])
pw('Family cloakroom partition',(501,461),(501,579))
pw('Cloakroom hall door',(501,461),(579,461),[(548,38,0,2.1,'door')])
pw('Cloakroom east',(579,461),(579,579))
pw('Drawing hall partition',(707,347),(707,579),[(376,53,0,2.35,'double')])
pw('Dining drawing partition',(707,181),(707,347))

# Upper floor perimeter and partitions.
pw('First west',(990,579),(990,168),[(367,87,.82,2.17,'window')],floor=1,external=True)
pw('Bedroom 3 rear',(990,168),(1222,168),[(1102,113,.80,2.18,'window')],floor=1,external=True)
pw('Bathroom balcony',(1222,214),(1317,214),[(1274,68,1.22,2.02,'window')],floor=1,external=True)
pw('En suite balcony',(1317,214),(1391,214),[(1364,34,1.16,2.04,'window')],floor=1,external=True)
pw('Bedroom 3 balcony door',(1222,168),(1222,214),[(192,37,0,2.2,'door')],floor=1,external=True)
pw('Principal balcony door',(1391,214),(1391,168),[(192,37,0,2.2,'door')],floor=1,external=True)
pw('Principal rear',(1391,168),(1618,168),[(1512,123,.78,2.18,'window')],floor=1,external=True)
pw('First east',(1618,168),(1618,579),floor=1,external=True)
pw('First front',(1618,579),(990,579),[(1514,110,.75,2.2,'window'),(1311,58,.83,2.35,'window'),(1233,32,1.0,2.15,'window'),(1366,30,.84,1.98,'window'),(1095,105,.75,2.2,'window')],floor=1,external=True)
pw('Bedroom 3 to 5',(990,317),(1166,317),floor=1)
pw('Bedroom 3 hall door',(1166,367),(1222,367),[(1193,37,0,2.10,'door')],floor=1)
pw('Bedroom 5 hall',(1166,317),(1166,427),[(394,40,0,2.1,'door')],floor=1)
pw('Bedroom 5 to 4',(990,427),(1166,427),floor=1)
pw('Bedroom 4 hall',(1166,427),(1223,427),[(1190,39,0,2.1,'door')],floor=1)
pw('Linen cupboard hall',(1223,427),(1266,427),[(1243,33,0,2.1,'door')],floor=1)
pw('Linen cupboard back',(1223,441),(1266,441),floor=1)
pw('Bedroom 4 shower return',(1223,427),(1223,481),floor=1)
pw('Bedroom 4 en suite jog',(1187,481),(1223,481),floor=1)
pw('Bedroom 4 en suite divider',(1187,481),(1187,579),[(524,36,0,2.1,'door')],floor=1)
pw('Bedroom 4 en suite hall',(1266,427),(1266,579),floor=1)
pw('Bathroom bedroom 3',(1222,214),(1222,367),floor=1)
pw('Bathroom hall',(1222,367),(1346,367),[(1306,39,0,2.1,'door')],floor=1)
pw('Bathroom en suite',(1317,214),(1317,297),floor=1)
pw('Bathroom jog',(1317,297),(1346,297),floor=1)
pw('Bathroom east',(1346,297),(1346,367),floor=1)
pw('Principal en suite south',(1346,329),(1391,329),floor=1)
pw('Principal en suite east',(1391,214),(1391,367),[(264,36,0,2.1,'door')],floor=1)
pw('Principal hall entrance',(1391,367),(1436,367),[(1414,39,0,2.1,'door')],floor=1)
pw('Principal hall return',(1436,367),(1436,395),floor=1)
pw('Principal bedroom 2',(1436,395),(1618,395),floor=1)
pw('Bedroom 2 hall',(1436,395),(1436,439),floor=1)
pw('Bedroom 2 door',(1385,439),(1436,439),[(1413,38,0,2.1,'door')],floor=1)
pw('Bedroom 2 stair partition',(1385,439),(1385,579),floor=1)

# Stair run from the front hall to landing: 17 risers, open stairwell.
stair='13 Staircase'
x0,y0=pt(663,572);run=pt(663,438)[1]-y0;width=.91;steps=17
for i in range(steps):
    rise=(i+1)*LEVEL/steps
    box(f'Stair tread {i+1:02}',(x0+width/2,y0+run*(i+.5)/steps,rise/2),(width,run/steps,rise),'Blue carpet',stair)
    box(f'Stair nosing {i+1:02}',(x0+width/2,y0+run*i/steps,rise-.015),(width,.035,.03),'White joinery',stair)
beam('Stair handrail',(x0-.045,y0,.9),(x0-.045,y0+run,LEVEL+.9),.07,'Oak',stair)
for i in range(steps+1):
    rise=min(LEVEL,(i+.5)*LEVEL/steps)
    beam(f'Stair baluster {i}',(x0-.045,y0+run*i/steps,rise),(x0-.045,y0+run*i/steps,rise+.85),.035,'Metal',stair)
for x,y,z in [(x0-.045,y0,0),(x0-.045,y0+run,LEVEL)]:
    cylinder('Stair newel',(x,y,z+.5),.065,1.0,'White joinery',stair)
for ap,bp in [((1347,438),(1347,534)),((1347,534),(1326,534)),((1326,534),(1326,574))]:
    a=Vector(pt(*ap,1));b=Vector(pt(*bp,1));dist=(b-a).length
    beam('Landing handrail',(*a,LEVEL+.95),(*b,LEVEL+.95),.065,'Oak','24 Trim')
    for i in range(math.ceil(dist/.14)+1):
        p=a.lerp(b,i/math.ceil(dist/.14));beam('Landing baluster',(*p,LEVEL),(*p,LEVEL+.93),.03,'Metal','24 Trim')
# Balcony ironwork follows its chamfered front.
railpts=[(1222,214),(1222,130),(1263,88),(1349,88),(1391,130),(1391,214)]
for a,b in zip(railpts,railpts[1:]):
    av=Vector(pt(*a,1));bv=Vector(pt(*b,1));dist=(bv-av).length
    beam('Balcony rear top rail' if a[1]==88 and b[1]==88 else 'Balcony top rail',(*av,LEVEL+1.05),(*bv,LEVEL+1.05),.04,'Metal','23 Balcony')
    beam('Balcony bottom rail',(*av,LEVEL+.10),(*bv,LEVEL+.10),.03,'Metal','23 Balcony')
    for i in range(math.ceil(dist/.13)+1):
        p=av.lerp(bv,i/math.ceil(dist/.13));beam('Balcony baluster',(*p,LEVEL+.10),(*p,LEVEL+1.05),.02,'Metal','23 Balcony')
for side,p in [('left',(1222,130)),('right',(1391,130))]:
    x,y=pt(*p,1);box('Balcony brick pier '+side,(x,y,LEVEL+FIRST_CEILING/2),(.23,.23,FIRST_CEILING),'Red brown brick','23 Balcony')

# Kitchen and fixed furniture, simplified from the original photographs.
def cabinet(name,x,y,w,d,h,z,layer,mat='Oak',angle=0):
    box(name+' carcass',(x,y,z+h/2),(w,d,h),mat,layer,angle)
    co,si=math.cos(angle),math.sin(angle)
    # Worktop and door panel stand as separate edit objects.
    box(name+' worktop',(x,y,z+h+.02),(w+.025,d+.035,.04),'Stone',layer,angle)
    count=max(1,round(w/.55))
    for i in range(count):
        off=-w/2+w*(i+.5)/count;px=x+off*co+(d/2+.015)*si;py=y+off*si-(d/2+.015)*co
        box(name+f' front {i+1}',(px,py,z+h/2),(w/count-.025,.025,h-.05),mat,layer,angle)
def cabp(name,rect,floor=0,h=.87,mat='Oak',angle=0):
    a=pt(rect[0],rect[1],floor);b=pt(rect[2],rect[3],floor)
    cabinet(name,(a[0]+b[0])/2,(a[1]+b[1])/2,abs(b[0]-a[0]),abs(b[1]-a[1]),h,floor*LEVEL,f'{floor+1}6 Fittings and furniture',mat,angle)
cabp('Kitchen rear cabinets',(311,186,526,215))
cabp('Kitchen west cabinets',(309,215,339,242),angle=math.pi/2)
cabp('Kitchen short return',(472,349,497,388),angle=-math.pi/2)
cabp('Utility cabinets',(188,185,260,211),mat='White joinery')
cabp('Utility washing machine',(267,185,295,211),mat='Porcelain')
for x in (369,381):
    for y in (191,204):
        px,py=pt(x,y);cylinder('Kitchen hob burner',(px,py,.922),.075,.014,'Metal','16 Fittings and furniture')
px,py=pt(435,202);box('Kitchen sink',(px,py,.917),(.70,.40,.018),'Metal','16 Fittings and furniture')
beam('Kitchen mixer tap',(px,py+.14,.92),(px,py+.14,1.24),.025,'Metal','16 Fittings and furniture')
pbox('Kitchen fridge',(312,302,340,332),0,1.90,'White joinery','16 Fittings and furniture')

def table(name,x,y,z,w=1.45,d=.9,roundtop=False,layer='16 Fittings and furniture'):
    if roundtop:cylinder(name+' top',(x,y,z+.76),w/2,.07,'Oak',layer,32,scale=(1,d/w))
    else:box(name+' top',(x,y,z+.76),(w,d,.065),'Dark walnut',layer)
    for dx in [-w*.35,w*.35]:
        for dy in [-d*.32,d*.32]:box(name+' leg',(x+dx,y+dy,z+.365),(.055,.055,.73),'Dark walnut',layer)
def chair(name,x,y,z,angle=0,mat='Cream upholstery',layer='16 Fittings and furniture'):
    co,si=math.cos(angle),math.sin(angle)
    def local(dx,dy):return (x+dx*co-dy*si,y+dx*si+dy*co)
    box(name+' seat',(x,y,z+.45),(.48,.48,.12),mat,layer,angle)
    px,py=local(0,.23);box(name+' back',(px,py,z+.77),(.48,.07,.60),'Oak',layer,angle)
    for dx in [-.19,.19]:
        for dy in [-.19,.19]:
            px,py=local(dx,dy);box(name+' leg',(px,py,z+.20),(.04,.04,.40),'Oak',layer,angle)
def sofa(name,x,y,z,w=1.9,angle=0,mat='Burgundy leather',layer='16 Fittings and furniture'):
    co,si=math.cos(angle),math.sin(angle)
    def part(label,dx,dy,elev,size):
        box(name+' '+label,(x+dx*co-dy*si,y+dx*si+dy*co,z+elev),size,mat,layer,angle)
    part('base',0,0,.25,(w,.85,.35));part('back',0,.34,.65,(w,.22,.72))
    for dx in (-w/2+.10,w/2-.10):part('arm',dx,0,.55,(.20,.86,.46))
    for dx in (-w*.23,w*.23):part('seat cushion',dx,-.05,.48,(w*.43,.64,.15))
def bed(name,rect,floor=1):
    a=pt(rect[0],rect[1],floor);b=pt(rect[2],rect[3],floor);x=(a[0]+b[0])/2;y=(a[1]+b[1])/2
    w=abs(a[0]-b[0]);d=abs(a[1]-b[1]);z=LEVEL*floor;l=f'{floor+1}6 Fittings and furniture'
    box(name+' bed base',(x,y,z+.24),(w,d,.32),'Oak',l)
    box(name+' mattress',(x,y,z+.49),(w-.06,d-.05,.27),'Bed linen',l)
    box(name+' headboard',(x,y+d/2,z+.68),(w+.08,.10,1.15),'Oak',l)
    for dx in [-w*.24,w*.24]:box(name+' pillow',(x+dx,y+d*.34,z+.68),(w*.42,.44,.14),'Porcelain',l)
def bookshelf(name,rect,floor=1):
    a=pt(rect[0],rect[1],floor);b=pt(rect[2],rect[3],floor);x=(a[0]+b[0])/2;y=(a[1]+b[1])/2;w=abs(a[0]-b[0]);d=abs(a[1]-b[1]);z=LEVEL*floor;l=f'{floor+1}6 Fittings and furniture'
    box(name+' back',(x,y+d/2,z+1.0),(w,.04,2.0),'Oak',l)
    for dx in [-w/2,w/2]:box(name+' side',(x+dx,y,z+1.0),(.04,d,2.0),'Oak',l)
    for k in range(6):
        box(name+' shelf',(x,y,z+k*.38+.06),(w,d,.035),'Oak',l)
        if k<5:
            for j in range(max(1,int(w/.09))):
                xx=x-w/2+.07+j*.09
                box(name+' books',(xx,y,z+k*.38+.22),(.07,d*.7,.28),'Book red' if (j+k)%3==0 else 'Blue carpet',l)
px,py=pt(408,315);table('Breakfast table',px,py,0,1.40,1.25,True)
for a in (0,math.pi/2,math.pi,3*math.pi/2):chair('Breakfast chair',px+math.cos(a),py+math.sin(a),0,a-math.pi/2)
px,py=pt(622,250);table('Dining table',px,py,0,1.30,2.0,True)
for dx in (-.95,.95):
    for dy in (-.60,.60):chair('Dining chair',px+dx,py+dy,0,-math.pi/2 if dx<0 else math.pi/2)
for y,w,ang,mat in [(507,2.10,math.pi,'Burgundy leather'),(465,1.85,0,'Cream upholstery'),(297,1.60,math.pi,'Cream upholstery')]:
    x,yw=pt(823,y);sofa('Drawing room seating',x,yw,0,w,ang,mat)
x,y=pt(758,500);sofa('Drawing armchair',x,y,0,.95,-math.pi/2)
x,y=pt(820,484);table('Drawing coffee table',x,y,-.33,1.35,.62)
pbox('Drawing fireplace breast',(909,369,932,415),0,2.78,'Warm plaster','16 Fittings and furniture')
pbox('Drawing fireplace hearth',(894,367,932,417),0,.05,'Metal','16 Fittings and furniture')
pbox('Drawing fire surround',(904,373,933,409),0,1.13,'Metal','16 Fittings and furniture')
bookshelf('Family bookshelf',(310,453,359,468),0)
x,y=pt(459,498);chair('Family chair',x,y,0,math.pi/2)
bed('Principal',(1468,252,1545,349))
cabp('Principal fitted wardrobe',(1580,194,1611,370),1,2.35,'Oak')
bed('Bedroom 4',(1090,454,1155,553))
cabp('Bedroom 4 wardrobe',(997,438,1044,464),1,2.10,'White joinery')
bookshelf('Bedroom 2 library',(1531,410,1609,426))
bookshelf('Bedroom 3 bookshelf',(1000,237,1048,251))
x,y=pt(1086,245,1);sofa('Bedroom 3 sofa',x,y,LEVEL,1.65,0,'Metal','26 Fittings and furniture')
x,y=pt(1511,489,1);chair('Bedroom 2 armchair',x,y,LEVEL,0,'Cream upholstery','26 Fittings and furniture')

def bathroom(name,x,y,floor=1,kind='toilet'):
    x,y=pt(x,y,floor);z=LEVEL*floor;l=f'{floor+1}6 Fittings and furniture'
    if kind=='toilet':
        cylinder(name+' pedestal',(x,y,z+.18),.18,.36,'Porcelain',l,20,scale=(.8,1.15))
        cylinder(name+' bowl',(x,y-.08,z+.39),.24,.16,'Porcelain',l,24,scale=(.82,1.22))
        cylinder(name+' seat',(x,y-.08,z+.48),.235,.045,'White joinery',l,24,scale=(.82,1.22))
        box(name+' cistern',(x,y+.23,z+.61),(.44,.20,.61),'Porcelain',l)
    elif kind=='vanity':
        cabinet(name,x,y,.95,.49,.80,z,l,'White joinery')
        cylinder(name+' basin',(x,y,z+.85),.24,.05,'Porcelain',l,24,scale=(1,.7))
        beam(name+' tap',(x,y+.16,z+.84),(x,y+.16,z+1.03),.025,'Metal',l)
        box(name+' mirror',(x,y+.26,z+1.35),(.90,.025,.65),'Glazing',l)
    elif kind=='shower':
        box(name+' tray',(x,y,z+.06),(.88,.88,.12),'Porcelain',l)
        for dx in (-.43,.43):box(name+' screen',(x+dx,y,z+1.05),(.025,.86,2.0),'Glazing',l)
        box(name+' screen front',(x,y-.43,z+1.05),(.86,.025,2.0),'Glazing',l)
        beam(name+' riser',(x,y+.38,z+1),(x,y+.38,z+2.08),.025,'Metal',l)
    elif kind=='bath':
        box(name+' bath plinth',(x,y,z+.28),(1.65,.75,.56),'Porcelain',l)
        cylinder(name+' inset tub',(x,y,z+.575),.66,.03,'Cream tile',l,32,scale=(1,.40))
bathroom('Cloakroom WC',558,560,0);bathroom('Cloakroom vanity',538,489,0,'vanity')
bathroom('Family bath',1277,235,1,'bath');bathroom('Family bathroom WC',1240,332)
bathroom('Family bathroom vanity',1322,339,1,'vanity')
bathroom('Principal en suite WC',1370,234);bathroom('Principal en suite vanity',1370,302,1,'vanity');bathroom('Principal shower',1337,276,1,'shower')
bathroom('Bedroom 4 en suite WC',1207,496);bathroom('Bedroom 4 vanity',1235,561,1,'vanity');bathroom('Bedroom 4 shower',1243,462,1,'shower')

# Radiators under the main windows, as seen in the tour.
for name,x,y,w,f in [('Family',416,572,1.6,0),('Drawing',822,572,1.6,0),('Bedroom 2',1514,572,1.5,1),('Bedroom 4',1094,572,1.5,1),('Bedroom 3',1104,175,1.5,1),('Principal',1512,175,1.5,1)]:
    px,py=pt(x,y,f);l=f'{f+1}6 Fittings and furniture';z=f*LEVEL
    box(name+' radiator',(px,py,z+.37),(w,.10,.56),'White joinery',l)
    for i in range(int(w/.065)):
        box(name+' radiator fin',(px-w/2+.04+i*.065,py-.06,z+.37),(.025,.035,.51),'White joinery',l)

def hiproof(name,x1,y1,x2,y2,z,rise,layer):
    # All dimensions are model-space metres.
    h=(y2-y1)/2;ridge1=x1+min(h,(x2-x1)*.25);ridge2=x2-min(h,(x2-x1)*.25)
    vs=[(x1,y1,z),(x2,y1,z),(x2,y2,z),(x1,y2,z),(ridge1,(y1+y2)/2,z+rise),(ridge2,(y1+y2)/2,z+rise)]
    mesh(name,vs,[(0,1,5,4),(1,2,5),(2,3,4,5),(3,0,4)],'Slate roof',layer)
    for i in range(4):beam(name+' gutter',vs[i],vs[(i+1)%4],.13,'White joinery',layer)
    beam(name+' ridge',vs[4],vs[5],.12,'Slate roof',layer)
    # Thickness added as a native, editable modifier in Blender.
    ob=bpy.data.objects[name];mod=ob.modifiers.new('Roof thickness','SOLIDIFY');mod.thickness=.12
hiproof('Main hipped roof',-.27,-.28,14.25,9.09,EAVES,ROOF_RISE,'30 Roof')
hiproof('Garage hipped roof',-5.45,-.28,.03,9.09,HEIGHT+.15,1.02,'30 Roof')
# Covered balcony roof, on its own tag for inspection.
ppoly('Balcony soffit',balcony,LEVEL+FIRST_CEILING,.12,'White joinery','30 Roof',1)
balconyxy=[pt(*p,1) for p in balcony]
bx0=min(p[0] for p in balconyxy);bx1=max(p[0] for p in balconyxy);by0=min(p[1] for p in balconyxy);by1=max(p[1] for p in balconyxy)
box('Balcony flat roof',((bx0+bx1)/2,(by0+by1)/2,LEVEL+FIRST_CEILING+.17),(bx1-bx0+.2,by1-by0+.2,.14),'Slate roof','30 Roof')
# Front entrance gable, seen from the driveway.
g1=pt(583,579);g2=pt(707,579)
mesh('Entrance pediment',[(g1[0],-.14,5.30),(g2[0],-.14,5.30),((g1[0]+g2[0])/2,-.14,6.65)],[(0,1,2)],'Red brown brick','30 Roof')
for a,b in [((g1[0],-.18,5.30),((g1[0]+g2[0])/2,-.18,6.65)),(((g1[0]+g2[0])/2,-.18,6.65),(g2[0],-.18,5.30))]:beam('Pediment fascia',a,b,.15,'White joinery','30 Roof')
box('Chimney',(10.4,5.8,EAVES+1.68),(.72,.85,1.70),'Red brown brick','30 Roof')
box('Chimney cap',(10.4,5.8,EAVES+2.58),(.86,.99,.10),'Stone','30 Roof')
for x in (10.20,10.57):cylinder('Chimney pot',(x,5.8,EAVES+2.82),.115,.42,'Red brown brick','30 Roof')

# Outbuildings: dimensions from the plan. Location in the garden is estimated.
OBX=-3.9;OBY=24.0
oblayer='40 Outbuildings'
for name,left,w,front,tleft,tright,published in [
    ('Outside WC',OBX,1.72,OBY,.17,.13,[1.57,1.80]),
    ('Tool store',OBX+1.72,1.04,OBY,.13,.13,None),
    ('Summer house',OBX+2.76,3.93,OBY+.04,.13,.17,[3.78,1.76]),
]:
    x=left+w/2;rear=OBY+1.97;depth=rear-front
    poly=[(left,front),(left+w,front),(left+w,rear),(left,rear)]
    prism(name+' floor',poly,-.15,0,'Cream tile',oblayer)
    rooms.append({'name':name,'floor':2,'polygon_m':poly,'published_dimensions_m':published})
    box(name+' rear wall',(x,rear,1.20),(w,.17,2.4),'Red brown brick',oblayer)
    box(name+' west wall',(left,(front+rear)/2,1.20),(tleft,depth,2.4),'Warm plaster',oblayer)
    box(name+' east wall',(left+w,(front+rear)/2,1.20),(tright,depth,2.4),'Warm plaster',oblayer)
    doorw=.79 if name!='Summer house' else 1.48
    for sign in (-1,1):
        pierw=(w-doorw)/2
        box(name+' front pier',(x+sign*(doorw/2+pierw/2),front,1.20),(pierw,.17,2.4),'Red brown brick',oblayer)
    box(name+' front lintel',(x,front,2.30),(doorw,.17,.20),'Red brown brick',oblayer)
    if name=='Summer house':
        box('Summer house glazed doors',(x,front,1.10),(doorw,.03,2.20),'Glazing',oblayer)
        for xx in [x-doorw/2,x,x+doorw/2]:box('Summer house door frame',(xx,front,1.10),(.065,.08,2.20),'White joinery',oblayer)
    else:box(name+' door',(x,front+.12,1.04),(doorw-.04,.04,2.08),'White joinery',oblayer)
box('Outbuilding roof',(OBX+3.345,OBY+.985,2.48),(6.99,2.29,.14),'Slate roof','41 Outbuilding roof')
box('Outbuilding fascia',(OBX+3.345,OBY-.17,2.44),(6.99,.07,.25),'White joinery','41 Outbuilding roof')

# Site massing is deliberately separate: there is no measured site plan.
box('Garden - approximate extent',(4,18,-.27),(24,25,.20),'Grass','50 Site - approximate')
box('Driveway - approximate extent',(4,-10,-.25),(26,20,.20),'Gravel','50 Site - approximate')
box('Rear terrace',(5.8,11.7,-.06),(18,2.7,.12),'Stone','50 Site - approximate')
box('Outbuilding path',(OBX+3.31,OBY-1.0,-.06),(7.4,1.8,.12),'Stone','50 Site - approximate')
for x in (-6.0,16.0):
    box('Garden boundary - approximate',(x,20,.55),(.20,19,1.2),'Red brown brick','50 Site - approximate')
for x in (-5.4,14.4):
    box('Front gate pier',(x,-16,1.30),(.62,.62,2.6),'Red brown brick','50 Site - approximate')
    cylinder('Gate pier cap',(x,-16,2.66),.44,.10,'Stone','50 Site - approximate')

# Refine visible details against the original panorama projections.
from refinement_details import refine
refine(globals())
from floor_finishes import apply_floor_finishes
apply_floor_finishes()
from refine_user_feedback import apply_feedback
apply_feedback(wall_specs)
from refine_site import refine_site
from align_outbuilding import align_outbuilding
align_outbuilding({'rooms':rooms})
site_data=refine_site(globals())
from refine_gate_wings import refine_gate_wings
gate_wings_review=refine_gate_wings(globals())
from refine_photo_feedback import refine_photo_feedback
refine_photo_feedback(globals())
from refine_plan_openings import refine_plan_openings
refine_plan_openings(globals())
from refine_fitted_details import refine_fitted_details
refine_fitted_details(globals())
from refine_circulation import refine_circulation
refine_circulation(globals())
from refine_drawing_opening import refine_drawing_opening
refine_drawing_opening(globals())
from refine_kitchen_comparison import refine_kitchen_comparison
refine_kitchen_comparison(globals())
from refine_kitchen_small_details import refine_kitchen_small_details
refine_kitchen_small_details(globals())
from refine_lift import refine_lift
refine_lift(globals())
from restore_shower_partition import restore_shower_partition
shower_partition_review=restore_shower_partition(globals())
from refine_upstairs_comparison import refine_upstairs_comparison
refine_upstairs_comparison(globals(),bedroom4_variant='proposal')
from refine_roof_joins import refine_roof_joins
refine_roof_joins(globals())
from refine_entrance_exterior import refine_entrance_exterior
entrance_exterior_review=refine_entrance_exterior(globals())
from refine_exterior_feedback import refine_exterior_feedback
exterior_owner_review=refine_exterior_feedback(globals())
from refine_garden_flat_roof import refine_garden_flat_roof
garden_flat_roof_review=refine_garden_flat_roof(globals())
from refine_drawing_comparison import refine_drawing_comparison
refine_drawing_comparison(globals())
from refine_family_comparison import refine_family_comparison
refine_family_comparison(globals())
from refine_trim_comparison import refine_trim_comparison
refine_trim_comparison(globals())
from refine_hall_fittings import refine_hall_fittings
refine_hall_fittings(globals())
from refine_front_bays import refine_front_bays
front_bay_review=refine_front_bays(globals())
from refine_surface_joins import refine_surface_joins
refine_surface_joins(globals())
from refine_small_placements import refine_small_placements
refine_small_placements(globals())
from refine_stair_ironwork import refine_stair_ironwork
refine_stair_ironwork(globals())
from refine_balcony_surface import refine_balcony_surface
refine_balcony_surface(globals())
from refine_drawing_doors import refine_drawing_doors
refine_drawing_doors(globals(),pose='open')
refine_drawing_doors(globals(),pose='open',wall_name='Dining hall doors',opening_angle=65)
from refine_stair_dining_owner import refine_stair_dining_owner
stair_dining_owner_review=refine_stair_dining_owner(globals())

from refine_side_annex import refine_side_annex
side_annex=refine_side_annex(globals())
from refine_oven_orientation import refine_oven_orientation
oven_orientation_review=refine_oven_orientation(globals())
from refine_rear_bay_alignment import refine_rear_bay_alignment
rear_bay_review=refine_rear_bay_alignment(globals())
from refine_front_arch_windows import refine_front_arch_windows
front_arch_review=refine_front_arch_windows(globals())
from refine_porch_width import refine_porch_width
porch_width_review=refine_porch_width(globals())
from refine_entrance_height import refine_entrance_height
entrance_height_review=refine_entrance_height(globals())
from refine_garage_moving_details import refine_garage_moving_details
garage_motion_review=refine_garage_moving_details(globals())
from refine_drawing_rear_doors import refine_drawing_rear_doors
drawing_rear_doors_review=refine_drawing_rear_doors(globals())
from refine_dining_small_details import refine_dining_small_details
dining_small_details_review=refine_dining_small_details(globals())
from refine_entrance_details_v2 import apply as entrance_details_v2
entrance_details_v2_review=entrance_details_v2(globals())
from refine_dining_wall_v2 import apply as dining_wall_v2
dining_wall_v2_review=dining_wall_v2(globals())
from refine_stair_landing_join import apply as stair_landing_join
stair_landing_join_review=stair_landing_join(globals())

# Camera markers retain the measured-plan positions and the original panorama IDs.
data=json.loads((ROOT/'source/tour-data.json').read_text())
links=data['floorplans'][0]['links']
camera_data=[]
for pic in data['pictures']:
    key='id_'+str(pic['id']);link=links.get(key)
    if not link:continue
    px=link['x']/100*2048;py=link['y']/100*(2358/6681*2048)
    if px>1630:continue
    f=1 if px>950 else 0
    x,y=pt(px,py,f)
    camd=bpy.data.cameras.new(pic['title']);cam=bpy.data.objects.new(f'{pic["id"]} | {pic["title"]}',camd)
    collection('90 Reference cameras').objects.link(cam);cam.location=(x,y,LEVEL*f+1.48)
    # Floorplan heading + initial panorama longitude specify the initial facing direction.
    heading=float(link['angle'])-float(pic['longitude'])
    direction=Vector((math.sin(heading),-math.cos(heading),0))
    cam.rotation_euler=direction.to_track_quat('-Z','Y').to_euler();camd.angle=math.radians(86);camd.clip_start=.05
    cam['source_panorama']=f'../source/panoramas/{pic["url"].rsplit("/",1)[-1]}'
    cam['heading_note']='Initial heading approximate; camera position traced from tour floorplan hotspot'
    camera_data.append({'id':pic['id'],'title':pic['title'],'location':list(cam.location),'image':pic['url'].rsplit('/',1)[-1]})

# Adopt the individually photo-fitted positions where available.
posefile=ROOT/'photo-review/pose-overrides.json'
if posefile.exists():
    poses=json.loads(posefile.read_text())
    for cam in collection('90 Reference cameras').objects:
        key=cam.name.split(' | ')[0]
        if key in poses:
            cam.location=poses[key]['position'];cam['heading_note']=poses[key]['basis']
            pic=next(p for p in data['pictures'] if str(p['id'])==key)
            heading=poses[key]['yaw']-float(pic['longitude'])
            cam.rotation_euler=Vector((math.sin(heading),-math.cos(heading),0)).to_track_quat('-Z','Y').to_euler()

# A packed floorplan is available as an image reference, hidden initially.
im=bpy.data.images.load(str(ROOT/'source/floorplan.png'));im.pack()
ref=bpy.data.objects.new('Original floorplan - packed reference',None);ref.empty_display_type='IMAGE';ref.data=im
ref.empty_display_size=42;ref.location=(5,10,-.3);collection('91 Floorplan reference').objects.link(ref)

# Keep the source photographs attached to the matching reference cameras.
# Background images are never included in renders or portable geometry exports.
for cam in collection('90 Reference cameras').objects:
    photo=ROOT/'photo-review/originals'/(cam.name.split(' | ')[0]+'-0.jpg')
    if cam.type=='CAMERA' and photo.exists():
        refim=bpy.data.images.load(str(photo));refim.pack()
        bg=cam.data.background_images.new();bg.image=refim;bg.alpha=.35
        cam.data.show_background_images=False

# Useful saved cameras and scenes; users can orbit or edit freely in all of them.
def camera(name,eye,target,ortho=None):
    cd=bpy.data.cameras.new(name);ob=bpy.data.objects.new(name,cd);base.objects.link(ob)
    ob.location=eye;ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler()
    if ortho:cd.type='ORTHO';cd.ortho_scale=ortho
    else:cd.lens=40
    cd.clip_end=300;return ob
overview=camera('Camera | Exterior',(27,-30,22),(4,5,2),36)
groundcam=camera('Camera | Ground floor',(24,-24,30),(4,4.7,0),25)
firstcam=camera('Camera | First floor',(24,-24,32),(6.5,4.7,LEVEL),21)
gardencam=camera('Camera | Garden layout',(40,60,45),(-5,8,0),68)
hallcam=camera('Camera | Hall stairs',(6.98,4.28,1.58),(6.98,.1,1.58))
landingcam=camera('Camera | Landing stairs',(6.8,4.1,LEVEL+1.47),(6.8,.1,LEVEL+1.47))
for cam,key in [(hallcam,'2445658-3'),(landingcam,'2445670-3')]:
    cam.data.lens=19.3
    imref=bpy.data.images.load(str(ROOT/'photo-review/originals'/(key+'.jpg')));imref.pack()
    bg=cam.data.background_images.new();bg.image=imref;bg.alpha=.35;cam.data.show_background_images=False
scene.camera=overview
scene.render.engine='BLENDER_EEVEE_NEXT'
scene.render.resolution_x=1600;scene.render.resolution_y=1200;scene.render.resolution_percentage=100
scene.world.color=(.7,.7,.7)
world=bpy.data.worlds.new('Daylight');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.68,.75,.82,1);world.node_tree.nodes['Background'].inputs[1].default_value=.5;scene.world=world
ld=bpy.data.lights.new('Sun','SUN');sun=bpy.data.objects.new('Sun',ld);base.objects.link(sun);ld.energy=2.7;ld.angle=.12;sun.rotation_euler=(math.radians(26),math.radians(-23),math.radians(-28))
ld=bpy.data.lights.new('Soft fill','AREA');light=bpy.data.objects.new('Soft fill',ld);base.objects.link(light);light.location=(5,3,18);ld.energy=1800;ld.shape='DISK';ld.size=18
scene.view_settings.view_transform='AgX'
scene.render.image_settings.file_format='PNG'
scene['Revision']='R5 — walkable model, user-confirmed roofs, front elevation and site'
scene['Project']='Ashley Heights | editable reconstruction from the original 360 tour'
scene['Accuracy']='34 printed linear dimensions are matched by calibrated wall positions. Source figures are approximate. Unlabelled sizes, heights, wall thicknesses, roof and site remain inferred; see Dimension validation.md for separate area discrepancies.'
scene['Floor_to_floor_m']=LEVEL;scene['Ceiling_height_m']=HEIGHT;scene['First_floor_ceiling_m']=FIRST_CEILING
scene['Source_URL']='https://robjampar.github.io/ashley-heights-tour/'

notes=bpy.data.texts.new('START HERE - Ashley Heights')
notes.write('ASHLEY HEIGHTS — PHOTO-COMPARED REVISION\n\n32 printed linear dimensions match; two rear-bay depths follow owner-selected option B.\nSee Dimension validation.md and dimension-audit.csv next to this file.\nThe plan says it is not to scale and its measurements are approximate.\nIndividual floor areas do not match exactly; heights, wall thicknesses and unlabelled details remain inferred.\n\nUse the Scene menu for Exterior, Ground floor, First floor and Whole house.\nAll geometry is named and separated in the Outliner.\nTab = edit mesh; G = move; R = rotate; S = scale.\nThe original floorplan is packed; original panoramas are in ../source/panoramas.\nPrevious model files are retained in ../output and ../output-scaled. Photo comparisons are in ../photo-review.\n')

# Shared geometry scene views. Collection excludes are per scene, not global.
scene.name='01 Exterior'
scenes=[scene]
for name,cam in [('02 Ground floor',groundcam),('03 First floor',firstcam),('04 Whole house',overview),('05 Garden layout',gardencam),('06 Hall stairs',hallcam),('07 Landing stairs',landingcam)]:
    s=scene.copy();s.name=name;s.camera=cam;scenes.append(s)
def set_visibility(s,predicate):
    for lc in s.view_layers[0].layer_collection.children:
        lc.exclude=predicate(lc.name)
for s in scenes:
    s.use_fake_user=True
    def hide(name):
        if name.startswith(('90','91')):return True
        if s.name.startswith('02'):return name.startswith(('2','30','35','15','50'))
        if s.name.startswith('03'):return name.startswith(('1','30','35','25','4','50'))
        if s.name.startswith('04'):return name.startswith(('15','25','30','41','50'))
        return False
    set_visibility(s,hide)

# Friendly initial viewport, independent of a mouse with a middle button.
for screen in bpy.data.screens:
    for area in screen.areas:
        if area.type=='VIEW_3D':
            sp=area.spaces.active;sp.clip_end=300;sp.shading.type='MATERIAL'
            sp.shading.type='SOLID';sp.shading.color_type='MATERIAL';sp.shading.light='STUDIO';sp.shading.show_shadows=True;sp.shading.show_cavity=True
            sp.overlay.show_floor=False;sp.overlay.show_extras=False
            reg=sp.region_3d;reg.view_distance=32;reg.view_location=(4,5,2)
            reg.view_rotation=overview.rotation_euler.to_quaternion();reg.view_perspective='CAMERA'

# Furniture assemblies move as one object; their component meshes stay editable.
assembly_parents={}
for ob in list(bpy.data.objects):
    name=ob.get('assembly')
    if not name:continue
    key=(ob.users_collection[0].name,name)
    if key not in assembly_parents:
        parent=bpy.data.objects.new('Assembly | '+name,None)
        ob.users_collection[0].objects.link(parent);parent.empty_display_type='PLAIN_AXES';parent.empty_display_size=.15
        parent['editing']='Select this parent to move the whole fitting; expand it to edit individual parts.'
        assembly_parents[key]=parent
    if ob.parent is None:ob.parent=assembly_parents[key]
from editable_origins import set_editable_origins
set_editable_origins()
# Serialize the final edited meshes so all exports carry the refinements.
record=[]
for ob in bpy.data.objects:
    if ob.type!='MESH':continue
    record.append({'name':ob.get('source_name',ob.name.split('.00')[0]),'object_name':ob.name,
        'layer':ob.users_collection[0].name,'assembly':ob.get('assembly'),'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),'vertices':[list(ob.matrix_world@v.co) for v in ob.data.vertices],
        'faces':[list(f.vertices) for f in ob.data.polygons],
        'materials':[m.name for m in ob.data.materials],
        'face_materials':[f.material_index for f in ob.data.polygons]})
(OUT/'geometry.json').write_text(json.dumps({'materials':PALETTE,'objects':record,'rooms':rooms,'walls':wall_specs,'cameras':camera_data,'level_height':LEVEL,'site':site_data,'side_annex':side_annex,'ancillary_spaces':ancillary_spaces,'gate_wings_review':gate_wings_review,'entrance_exterior_review':entrance_exterior_review,'front_bay_review':front_bay_review,'exterior_owner_review':exterior_owner_review,'garden_flat_roof_review':garden_flat_roof_review,'oven_orientation_review':oven_orientation_review,'rear_bay_review':rear_bay_review,'front_arch_review':front_arch_review,'porch_width_review':porch_width_review,'entrance_height_review':entrance_height_review,'garage_motion_review':garage_motion_review,'drawing_rear_doors_review':drawing_rear_doors_review,'dining_small_details_review':dining_small_details_review,'entrance_details_v2_review':entrance_details_v2_review,'dining_wall_v2_review':dining_wall_v2_review,'stair_landing_join_review':stair_landing_join_review,'shower_partition_review':shower_partition_review,'stair_dining_owner_review':stair_dining_owner_review},separators=(',',':')))
(OUT/'model-info.json').write_text(json.dumps({'objects':len(record),'rooms':rooms,'source':scene['Source_URL'],'accuracy':scene['Accuracy'],'level_height':LEVEL,'ceiling_height':HEIGHT,'first_floor_ceiling_height':FIRST_CEILING,'eaves_height':EAVES,'scale_method':'Printed metric dimensions constrain clear room spans; raster coordinates interpolated between calibrated wall lines','wall_coordinate_knots':{'x':X,'y':Y},'wall_thickness_overrides_m':THICKNESS},indent=2))
bpy.context.window.scene=scenes[0]
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
# GLB carries the editable meshes, object names and plain materials to other tools.
for lc in scene.view_layers[0].layer_collection.children:lc.exclude=lc.name.startswith(('90','91'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
set_visibility(scene,lambda name:name.startswith(('90','91')))
for s,filename in [(scenes[0],'Exterior.png'),(scenes[1],'Ground floor.png'),(scenes[2],'First floor.png')]:
    bpy.context.window.scene=s;s.render.filepath=str(OUT/filename)
    bpy.ops.render.render(write_still=True)
bpy.context.window.scene=scenes[0]
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
print('MODEL_COMPLETE',len(record),'objects')
