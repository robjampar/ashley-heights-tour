"""Repeatable placement corrections checked against reverse panorama views."""
import ast, math
from pathlib import Path
import bpy, bmesh
from mathutils import Vector

def refine_circulation(g):
    data=g.get('g',g); walls=data.get('walls',data.get('wall_specs'))
    env=dict(g,bpy=bpy,bmesh=bmesh,math=math,Vector=Vector,mats=g['materials'],
             palette=g['PALETTE'],assembly_counts={})
    tree=ast.parse(Path(__file__).with_name('refinement_details.py').read_text())
    body=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='refine').body
    names={'assembly','roundbox','sphere','tube','local_box','cabinet_run','chest'}
    exec(compile(ast.Module(body=[n for n in body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[]),'<circulation-tools>','exec'),env)
    box,beam=g['box'],g['beam'];cabinet,chest=env['cabinet_run'],env['chest']
    prefix='Circulation detail | '
    cornice_sides=set()
    wall_names={w['name'] for w in walls}
    for ob in bpy.data.objects:
        if ob.type!='MESH':continue
        if ob.get('cornice_wall'):
            # Earlier wall replacements leave custom trim tags behind; only
            # regenerate coving for walls that still exist in the native plan.
            if ob['cornice_wall'] in wall_names:
                cornice_sides.add((ob['cornice_wall'],ob['cornice_side']))
        elif ' cornice profile' in ob.name:
            w=next((w for w in walls if ob.name.startswith(w['name']+' cornice profile')),None)
            if not w:continue
            u=(Vector(w['b'])-Vector(w['a'])).normalized();normal=Vector((-u.y,u.x))
            centre=sum((ob.matrix_world@v.co for v in ob.data.vertices),Vector())/len(ob.data.vertices)
            side=1 if (Vector(centre[:2])-(Vector(w['a'])+Vector(w['b']))/2).dot(normal)>0 else -1
            cornice_sides.add((w['name'],side))
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and (ob.name.startswith((prefix,'Drawing bureau')) or ' cornice profile' in ob.name):
            bpy.data.objects.remove(ob,do_unlink=True)
    changes=[]

    def transform_group(starts, reference, target, axis, size=None):
        obs=[o for o in bpy.data.objects if o.type=='MESH' and o.name.startswith(tuple(starts))]
        ref=next(o for o in obs if o.get('source_name',o.name)==reference)
        points=[ref.matrix_world@v.co for v in ref.data.vertices]
        lo,hi=min(v[axis] for v in points),max(v[axis] for v in points)
        centre=(lo+hi)/2;factor=size/(hi-lo) if size else 1
        for ob in obs:
            inv=ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co;p[axis]=target+(p[axis]-centre)*factor;v.co=inv@p
            ob.data.update()
        changes.append({'parts':starts,'axis':axis,'target_centre_m':target,'scale':factor})

    # Kitchen utility aperture is y=6.49..7.47. The tall oven belongs beyond it,
    # toward the sink, as visible in the reverse kitchen photograph 2445662-3.
    transform_group(['Kitchen oven tower','Kitchen built-in oven','Oven horizontal handle'],
                    'Kitchen oven tower carcass',7.86,1)
    transform_group(['Kitchen built-in oven'],'Kitchen built-in oven glass',.885,0)
    transform_group(['Oven horizontal handle'],'Oven horizontal handle',.93,0)
    for ob in list(bpy.data.objects):
        if ob.type=='MESH' and ob.name.startswith(('Kitchen west return','Kitchen west wall cupboards')):
            bpy.data.objects.remove(ob,do_unlink=True)
    cabinet(prefix+'Kitchen west corner',(.42,8.43),.46,angle=math.pi/2)

    # Three utility fittings sit under the window, ending at the garden-door
    # jamb. Previously both the sink and rear counter extended across that door.
    transform_group(['Utility freezer'],'Utility freezer',-2.365,0,.54)
    transform_group(['Utility washer'],'Utility washer',-1.80,0,.54)
    transform_group(['Utility ceramic sink'],'Utility ceramic sink',-1.24,0,.50)
    transform_group(['Utility rear counter'],'Utility rear counter',-1.81,0,1.65)
    counter=next(o for o in bpy.data.objects if o.name=='Utility rear counter')
    if not counter.get('utility_aperture_v1'):
        cutter=g['cylinder'](prefix+'temporary utility sink cutter',(-1.24,8.37,.87),1,.45,
                             'Cream ceramic','16 Fittings and furniture',n=64,scale=(.221,.208))
        mod=counter.modifiers.new('Utility sink aperture','BOOLEAN');mod.operation='DIFFERENCE';mod.solver='EXACT';mod.object=cutter
        with bpy.context.temp_override(object=counter,active_object=counter):bpy.ops.object.modifier_apply(modifier=mod.name)
        counter['utility_aperture_v1']=True;bpy.data.objects.remove(cutter,do_unlink=True)

    # Keep the chest beside the bed entirely east of the entrance return.
    transform_group(['Principal right drawers'],'Principal right drawers carcass',10.40,0,.60)
    # Two bookcases are south of the balcony door, with a visible strip of wall.
    transform_group(['Bedroom 3 paired shelves A'],'Bedroom 3 paired shelves A back',6.30,1)
    transform_group(['Bedroom 3 paired shelves B'],'Bedroom 3 paired shelves B back',7.20,1)
    for label in ('Bedroom 3 paired shelves A','Bedroom 3 paired shelves B'):
        transform_group([label],label+' back',4.9625,0)

    # The original plan's opening is centred at row 264 (jambs about 247/281),
    # not at row 279. Moving the opening north clears the shower without shrinking it.
    from dimension_spec import point
    wall=next(w for w in walls if w['name']=='Principal en suite east')
    centre=wall['a'][1]-wall['openings'][0][0]
    target=centre if wall.get('jamb_source') else point(1391,264,1)[1]
    delta=target-centre;half=wall['openings'][0][1]/2+.12
    south,north=sorted([wall['a'][1],wall['b'][1]])
    def move_y(y):
        if y<centre-half:return y+delta*max(0,(y-south)/(centre-half-south))
        if y>centre+half:return y+delta*max(0,(north-y)/(north-centre-half))
        return y+delta
    if abs(delta)>1e-6:
        for ob in bpy.data.objects:
            if ob.type!='MESH' or not ob.name.startswith('Principal en suite east'):continue
            inv=ob.matrix_world.inverted()
            for v in ob.data.vertices:
                p=ob.matrix_world@v.co;p.y=move_y(p.y);v.co=inv@p
            ob.data.update()
        wall['openings'][0][0]=wall['a'][1]-target
    changes.append({'opening':'Principal en suite east','plan_row':264,'centre_y_m':target,
                    'evidence':'Visible jambs on supplied floorplan, and bedroom reverse view 2445673-1'})

    # Glazed bureau sits beyond the drawing-room door architrave. Its glass must
    # be in an open frame, not buried behind the previous solid cabinet doors.
    before=set(bpy.data.objects);name=prefix+'Drawing bureau';yc=5.80;layer='16 Fittings and furniture'
    chest(name+' drawers',9.30,yc,0,1.04,.46,.79,math.pi/2,'Dark walnut',layer)
    # Sloping writing fall, from the drawer top back toward the upper cabinet.
    ob=box(name+' sloping writing fall',(9.40,yc,.97),(.39,1.02,.035),'Dark walnut',layer)
    centre=Vector((9.40,yc,.97));angle=math.radians(37)
    for v in ob.data.vertices:
        q=v.co-centre;v.co=centre+Vector((q.x*math.cos(angle)+q.z*math.sin(angle),q.y,-q.x*math.sin(angle)+q.z*math.cos(angle)))
    box(name+' hutch back',(9.065,yc,1.70),(.028,1.02,1.14),'Dark walnut',layer)
    for y in (yc-.51,yc+.51):box(name+' hutch side',(9.20,y,1.70),(.29,.034,1.14),'Dark walnut',layer)
    for z in (1.15,1.49,1.83,2.23):box(name+' shelf',(9.20,yc,z),(.29,1.02,.025),'Dark walnut',layer)
    for z,depth,width in ((2.255,.33,1.09),(2.29,.36,1.12)):
        box(name+' cornice',(9.20,yc,z),(depth,width,.045),'Dark walnut',layer)
    for sign in (-1,1):
        cy=yc+sign*.25
        box(name+' clear glazed light',(9.36,cy,1.70),(.012,.455,1.05),'Glazing',layer)
        for y in (cy-.239,cy+.239):box(name+' glazed stile',(9.375,y,1.70),(.034,.037,1.10),'Dark walnut',layer)
        for z in (1.16,2.24):box(name+' glazed rail',(9.375,cy,z),(.034,.51,.045),'Dark walnut',layer)
        for mid in (1.42,1.96):
            pts=[(9.37,cy,mid+.25),(9.37,cy+.20,mid),(9.37,cy,mid-.25),(9.37,cy-.20,mid),(9.37,cy,mid+.25)]
            for a,b in zip(pts,pts[1:]):beam(name+' leaded diamond',a,b,.007,'Metal',layer)
    for tier,z in enumerate((1.165,1.505,1.845)):
        for j in range(18):
            h=.22+.045*((j*7+tier*3)%5)/4
            box(name+' book',(9.18,yc-.45+j*.052,z+h/2),(.17,.038,h),f'Book spine {(j+tier)%7}',layer)
    for ob in set(bpy.data.objects)-before:
        if ob.type=='MESH':ob['assembly']=name
    transform_group([name],name+' drawers carcass',yc,1,.88)
    changes.append({'fitting':'Drawing bureau','centre_y_m':yc,'reference':'2445667-1',
                    'note':'Clear of door surround; glazed upper cabinet and sloping writing surface rebuilt.'})
    # Replace separated floating strips with one closed cove profile touching
    # the ceiling. The old gaps made dark bands absent from the photographs.
    for wall_name,side in sorted(cornice_sides):
        w=next(w for w in walls if w['name']==wall_name)
        a,b=Vector(w['a']),Vector(w['b']);u=(b-a).normalized();normal=Vector((-u.y,u.x))*side
        ceiling=w['floor']*2.8+(2.45 if w['floor'] else 2.60)
        profile=[(0,-.12),(.020,-.12)]
        profile += [(.09-.07*math.cos(t*math.pi/24),-.12+.10*math.sin(t*math.pi/24)) for t in range(1,13)]
        profile +=[(.10,-.02),(.10,0),(0,0)]
        verts=[(*(end+normal*(w['thickness_m']/2+offset)),ceiling+dz) for end in (a,b) for offset,dz in profile]
        count=len(profile);faces=[tuple(reversed(range(count))),tuple(range(count,count*2))]
        faces +=[(i,(i+1)%count,(i+1)%count+count,i+count)for i in range(count)]
        ob=g['mesh'](prefix+'Cove '+wall_name+f' {side}',verts,faces,'White joinery',f'{w["floor"]+1}4 Trim')
        bm=bmesh.new();bm.from_mesh(ob.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(ob.data);bm.free()
        ob['cornice_wall']=wall_name;ob['cornice_side']=side
    return changes
