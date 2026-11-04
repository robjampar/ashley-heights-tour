"""Coordinate the accepted loft's finished enclosure and bedroom furniture."""
import json
import math

PREFIX = 'Loft finish | '


def fit_eaves_trim_to_ceiling(scene, ceiling=7.60):
    """Keep the fixed head trims below the lowered finished lining."""
    from mathutils import Vector
    changed=[]
    for ob in scene.objects:
        if ob.type!='MESH' or 'head architrave' not in ob.name:continue
        if not any(str(d).startswith('Hobby 01 | ')for d in ob.get('frame_doors',[])):continue
        if not any((ob.matrix_world@v.co).z>ceiling-.006 for v in ob.data.vertices):continue
        ob.data=ob.data.copy();inv=ob.matrix_world.inverted()
        for vertex in ob.data.vertices:
            p=ob.matrix_world@vertex.co;p.z=min(p.z,ceiling-.006);vertex.co=inv@p
        ob.data.update();changed.append(ob)
    return changed


def finish_loft(ns):
    import bpy
    from mathutils import Matrix, Vector
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene, nav, root = ns['scene'], ns['nav'], ns['ROOT']
    cfg = json.loads((root/'proposal/interiors/leisure/loft-bedroom-finish.json').read_text())
    if scene.get('loft_finish_revision') == cfg['revision']:
        return [], json.loads(scene['loft_finish_report'])
    b = RoomBuilder(ns, 'loft finish', PREFIX, 'P33 Loft finished enclosure and bedroom')
    owners = set(scene.collection.children_recursive)
    changed, removed = [], []
    z, ceiling = cfg['floorZ'], cfg['ceilingZ']
    ivory = bpy.data.materials['Interior | Landings warm ivory']
    mats = {k:bpy.data.materials['Interior | Loftsuite '+v] for k,v in {
        'oak':'natural oak','linen':'ivory upholstery','white':'cotton bedding',
        'stone':'honed limestone','dark':'recess and drain','bronze':'satin bronze',
        'taupe':'woven taupe','light':'warm diffuser','mirror':'mirror glass',
    }.items()}
    def lists(key, pending):
        result=[nav.setdefault(key,[])]
        if pending in ns and ns[pending] is not result[0]:result.append(ns[pending])
        return result
    def retire(ob):
        removed.append(ob.name)
        for collection in tuple(ob.users_collection):
            if collection in owners:collection.objects.unlink(ob)
        if not ob.users_collection:bpy.data.objects.remove(ob)
    def mark(ob):
        if ob not in changed:changed.append(ob)
        ob['loft_finish_revision']=cfg['revision']
    def bounds(ob):
        pts=[ob.matrix_world@Vector(p) for p in ob.bound_box]
        return [min(p[k]for p in pts)for k in range(3)]+[max(p[k]for p in pts)for k in range(3)]
    def mesh_edit(ob, fn):
        ob.data=ob.data.copy();inv=ob.matrix_world.inverted()
        for vertex in ob.data.vertices:vertex.co=inv@Vector(fn(ob.matrix_world@vertex.co))
        ob.data.update();mark(ob)

    # The old knee wall was sized to the superseded low roof. Close the void
    # to the current dormer lining; leave the exterior roof and stair untouched.
    knee=scene.objects['Proposal | Loft knee wall 1']
    mesh_edit(knee,lambda p:(p.x,p.y,7.62 if p.z>6.59 else p.z))
    knee.data.materials.clear();knee.data.materials.append(ivory)
    for face in knee.data.polygons:face.material_index=0
    b.box_bounds('knee wall to stair enclosure return',[7.295,-5.33,7.46,-5.30],z,7.62,ivory)
    b.box_bounds('knee wall oak skirting',[7.58,-9.35,7.595,-5.30],z+.014,z+.094,mats['oak'],.002)
    b.box_bounds('return oak skirting',[7.295,-5.30,7.595,-5.285],z+.014,z+.094,mats['oak'],.002)
    for values in lists('segments','new_segments'):
        for item in values:
            if item['name']=='Proposal | Loft knee wall 1':item['top']=7.62
    if not any(item['name']=='Proposal | Loft knee wall 1' for values in lists('segments','new_segments') for item in values):
        ns.get('new_segments',nav['segments']).append({'name':'Proposal | Loft knee wall 1','a':[7.52,-11.60],'b':[7.52,-5.30],'bottom':z,'top':7.62,'thickness':.12})
    ns.get('new_segments',nav['segments']).append({'name':PREFIX+'knee wall to stair enclosure return','a':[7.295,-5.315],'b':[7.58,-5.315],'bottom':z,'top':7.62,'thickness':.03})

    # Bring the older horizontal linings to the gallery's finished datum.
    # Trim their overlap first: two coplanar ceiling sheets cause flickering.
    cutter=b.box_bounds('temporary gallery ceiling overlap',[7.30,-5.30,9.60,4.95],7.50,7.75,ivory)
    ceiling_names=[]
    candidates=[ob for ob in scene.objects if ob.type=='MESH' and
                ob.name.startswith('Proposal | Joined roof lining ') and
                any(t in ob.name for t in ('Wing east dormer','Rear reference dormer'))]
    with BooleanWorkspace([cutter]) as workspace:
        for ob in candidates:
            bb=bounds(ob)
            if abs(bb[2]-7.64)>.005 or abs(bb[5]-7.66)>.005:continue
            if bb[0]<9.6 and bb[3]>7.3 and bb[1]<4.95 and bb[4]>-5.3:
                workspace.difference(ob,[cutter],'No duplicate ceiling sheets')
            if not ob.data.polygons:
                retire(ob);continue
            mesh_edit(ob,lambda p:(p.x,p.y,p.z-.04))
            ob.data.materials.clear();ob.data.materials.append(ivory)
            for face in ob.data.polygons:face.material_index=0
            ceiling_names.append(ob.name)
    b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    # The 10 mm gallery sheet ended short of the surrounding plaster on its
    # east edge. Its small return is behind the exterior frame, not over it.
    b.box_bounds('gallery ceiling east plaster closure',[9.60,-3.03,9.61,4.45],ceiling,ceiling+.02,ivory)
    for ob in fit_eaves_trim_to_ceiling(scene,ceiling):mark(ob)
    # These tiny remnants are interior roof-junction closures, not glazing.
    closure_faces=[]
    for ob in scene.objects:
        if ob.type!='MESH' or not ob.name.startswith('Proposal | Full dormer front roof closure '):continue
        bb=bounds(ob)
        if bb[0]<7.15 or bb[3]>7.45 or bb[2]<7.50:continue
        ob.data=ob.data.copy();ob.data.materials.append(ivory);slot=len(ob.data.materials)-1
        for face in ob.data.polygons:
            normal=ob.matrix_world.to_3x3()@face.normal
            if normal.z<-.3 or normal.y<-.7:face.material_index=slot
        mark(ob);closure_faces.append(ob.name)
    # Keep all trims and their emitters on the finished ceiling plane.
    shifted_lights=[]
    for ob in scene.objects:
        name=ob.name
        if not (name.startswith('Loftsuite 01 | ceiling ') or
                name.startswith('Proposal | Rear dormer downlight') or
                name.startswith('Hobby 01 | dormer ceiling glow') or
                name.startswith('Proposal | Loft bedroom expansion | ceiling ')):continue
        bb=bounds(ob) if ob.type=='MESH' else None
        # The gallery fixture at y=-2.5 is already at 7.60 m.
        if name.startswith('Proposal | Loft bedroom expansion |') and (bb[1] if bb else ob.location.y)>-3:continue
        ob.matrix_world.translation.z-=.04;mark(ob);shifted_lights.append(name)
    for item in nav.get('proposalLights',[]):
        if item['name'] in shifted_lights:item['position'][2]-=.04

    # Boolean-created facade caps had lost their exterior finish role. Only
    # the courtyard-facing faces change; the bedroom-side plaster stays white.
    # The old cheek and its storey band also duplicated the masonry cap here.
    cutter=b.box_bounds('temporary duplicated cheek removal',[9.69,-3.12,10.60,-2.92],5.34,7.65,ivory)
    with BooleanWorkspace([cutter]) as workspace:
        for name in ('Proposal | Wing dormer north cheek','Proposal | Wing dormer north cheek storey band'):
            ob=scene.objects[name];workspace.difference(ob,[cutter],'Butt tiled cheek to masonry return');mark(ob)
    b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    ob=scene.objects['Proposal | Courtyard upper return']
    mesh_edit(ob,lambda p:(p.x,min(p.y,-3.259),p.z))
    facade_faces=[]
    for name in ('Proposal | North upper facade east pier 0','Proposal | North east elevation closure 0'):
        ob=scene.objects[name];ob.data=ob.data.copy()
        planning=ns.get('VARIANT')=='planning' or bool(nav.get('planningApplication'))
        base=bpy.data.materials['Red brown brick' if planning else 'Proposal | Limestone render']
        role=next((m for m in bpy.data.materials if m.get('appearance_role')=='wall' and m.get('appearance_source_material')==base.name),None)
        if role is None:
            role=base.copy();role.name='Appearance | wall | '+base.name
            role['appearance_role']='wall';role['appearance_source_material']=base.name
        ob.data.materials.append(role);index=len(ob.data.materials)-1
        for face in ob.data.polygons:
            normal=ob.matrix_world.to_3x3()@face.normal
            centre=ob.matrix_world@face.center
            if normal.y>.7 and centre.y>=-3.031:
                face.material_index=index;facade_faces.append([name,face.index])
                for layer in ob.data.uv_layers:
                    for loop in face.loop_indices:
                        p=ob.matrix_world@ob.data.vertices[ob.data.loops[loop].vertex_index].co
                        layer.data[loop].uv=(p.x,p.z)
        mark(ob)
        names=nav.setdefault('exteriorAppearance',{}).setdefault('objects',{}).setdefault('wall',[])
        if name not in names:names.append(name)

    # Move the actual bed, cloth and stitching as an assembly, preserving the
    # authored upholstery. Replace asymmetric old headwall fittings coherently.
    tr=Matrix.Translation((*cfg['bedHead'],0))@Matrix.Rotation(-math.pi/2,4,'Z')@Matrix.Translation((-10.395,9.33,0))
    bed_names=[]
    old_fittings=('Loftsuite 01 | oak headwall','Loftsuite 01 | headwall fine joint',
                  'Loftsuite 01 | floating bedside','Loftsuite 01 | bedside ')
    for ob in list(scene.objects):
        if ob.get('suite_component')=='bed' and ob.name.startswith('Loftsuite 01 | '):
            ob.matrix_world=tr@ob.matrix_world;mark(ob);bed_names.append(ob.name)
        elif ob.name.startswith(old_fittings):retire(ob)
    for values in lists('obstacles','new_obstacles'):
        values[:]=[v for v in values if not v['name'].startswith('Loftsuite 01 | bedside ')]
        for item in values:
            if item['name']=='Loftsuite 01 | complete upholstered double bed':item['box']=cfg['bedEnvelope']
    nav['proposalLights']=[v for v in nav.get('proposalLights',[])if not v['name'].startswith('Loftsuite 01 | bedside ')]
    oak,bronze,dark,stone,linen=[mats[k]for k in ('oak','bronze','dark','stone','linen')]
    b.box_bounds('wardrobe fitted ceiling filler',[10,-3.86,11.97,-3.28],7.54,7.61,oak,.002)
    b.box('bed oak wall panel',(7.595,-7.35,z+.745),(.024,2.95,1.46),oak,.003)
    for yy in (-8.54,-7.95,-7.35,-6.75,-6.16):b.box('headwall fine joint',(7.608,yy,z+.745),(.0015,.002,1.43),dark)
    for j,yy in enumerate((-8.43,-6.27)):
        box=[7.61,yy-.23,8.05,yy+.23]
        b.box_bounds('bedside oak cabinet '+str(j),box,z+.22,z+.52,oak,.012)
        b.box('bedside limestone top '+str(j),(7.83,yy,z+.535),(.46,.48,.03),stone,.006)
        b.box('bedside drawer recess '+str(j),(8.052,yy,z+.44),(.002,.40,.012),dark)
        b.cylinder('reading backplate '+str(j),(7.622,yy,z+1.13),.034,.018,bronze,(1,0,0))
        b.tube('reading arm '+str(j),[(7.63,yy,z+1.13),(7.79,yy,z+1.13),(7.84,yy,z+1.04)],.008,bronze)
        b.cylinder('reading shade '+str(j),(7.84,yy,z+1.01),.029,.07,bronze)
        b.cylinder('reading lens '+str(j),(7.84,yy,z+.973),.024,.004,mats['light'])
        b.light('bedside reading light '+str(j),(7.85,yy,z+.95),.16,10,1.5)
        b.box('bedside control plate '+str(j),(7.618,yy,z+.77),(.012,.10,.11),bronze,.006)
        for dy in (-.022,.022):b.cylinder('bedside switch',(7.628,yy+dy,z+.79),.009,.006,dark,(1,0,0),20)
        b.obstacle('bedside cabinet '+str(j),box,z,z+.55)
    b.box('bedside book pages',(7.83,-8.43,z+.574),(.24,.17,.035),mats['white'],.002)
    for zz in (z+.554,z+.594):b.box('bedside book cover',(7.83,-8.43,zz),(.25,.18,.005),mats['taupe'],.001)
    b.lathe('bedside ceramic carafe',(7.82,-6.30,z+.55),[(.045,0),(.052,.025),(.052,.12),(.027,.17),(.027,.21),(.022,.21)],ivory)

    # Window desk: the top sits just below the existing sill, with a clear
    # knee space and a separate chair collision footprint facing the glazing.
    a,s,c,n=cfg['desk'];cy=(s+n)/2;desk_z=cfg['deskTopZ']
    b.box_bounds('window desk oak top',cfg['desk'],desk_z-.028,desk_z,oak,.009)
    for yy in (s+.065,n-.065):
        for xx in (a+.065,c-.065):b.box('desk tapered leg',(xx,yy,(z+desk_z-.035)/2),(.034,.034,desk_z-z-.035),oak,.005)
    b.box('desk rear rail',(c-.025,cy,desk_z-.095),(.025,n-s-.08,.10),oak,.003)
    b.box('desk shallow drawer',(a+.16,cy,desk_z-.09),(.29,n-s-.15,.09),oak,.005)
    b.box('desk drawer pull',(a-.003,cy,desk_z-.075),(.015,.17,.012),bronze,.004)
    b.obstacle('window desk',cfg['desk'],z,desk_z)
    b.box('desk leather writing pad',(12.10,-6.27,desk_z+.002),(.34,.66,.004),mats['taupe'],.008)
    b.box('desk notebook pages',(12.09,-6.25,desk_z+.017),(.22,.30,.024),mats['white'],.002)
    b.box('desk notebook cover',(12.09,-6.25,desk_z+.031),(.23,.31,.004),dark,.001)
    b.cylinder('desk pen',(12.04,-6.07,desk_z+.037),.004,.14,bronze,(0,1,0),16)
    b.cylinder('desk lamp foot',(12.14,-6.76,desk_z+.012),.07,.024,bronze)
    b.tube('desk lamp arm',[(12.14,-6.76,desk_z+.025),(12.14,-6.76,desk_z+.35),(12.01,-6.70,desk_z+.47)],.009,bronze)
    b.lathe('desk lamp shade',(12.01,-6.70,desk_z+.34),[(.10,0),(.10,.012),(.055,.13),(.045,.14)],ivory)
    b.cylinder('desk lamp diffuser',(12.01,-6.70,desk_z+.341),.085,.003,mats['light'])
    b.light('desk task light',(12.01,-6.70,desk_z+.32),.15,10,1.7)
    # Rounded upholstered chairs with curved backs, real seams and oak legs.
    def chair(label,centre,angle,scale=1):
        start=len(b.objects);x,y=centre
        for xx in (-.25,.25):
            for yy in (-.24,.24):b.box(label+' oak leg',(xx,yy,z+.215),(.035,.035,.40),oak,.004)
        b.box(label+' upholstered seat',(0,0,z+.46),(.64,.62,.14),linen,.065)
        vv=[];steps=40
        for height,radius in ((.43,.33),(.82,.35),(.82,.31),(.43,.29)):
            for i in range(steps+1):
                t=math.radians(0+180*i/steps)
                vv.append((radius*math.cos(t),-radius*math.sin(t),z+height))
        faces=[]
        for k in range(4):
            for i in range(steps):faces.append((k*(steps+1)+i,k*(steps+1)+i+1,((k+1)%4)*(steps+1)+i+1,((k+1)%4)*(steps+1)+i))
        faces.extend([(0,41,82,123),(163,122,81,40)])
        b.mesh(label+' curved upholstered back',vv,faces,linen,True)
        b.tube(label+' tailored seam',[(.35*math.cos(t),-.35*math.sin(t),z+.816)for t in [math.pi*i/40 for i in range(41)]],.002,mats['taupe'])
        tr=Matrix.Translation((x,y,z))@Matrix.Rotation(math.radians(angle),4,'Z')@Matrix.Diagonal((scale,scale,1,1))@Matrix.Translation((0,0,-z))
        for ob in b.objects[start:]:ob.matrix_world=tr@ob.matrix_world
        half=.35*scale;b.obstacle(label,[x-half,y-half,x+half,y+half],z,z+.83)
    chair('desk chair',cfg['deskChair'],-90,.91)
    chair('window reading chair',cfg['readingChair'],90,1.12)
    b.cylinder('reading side table base',(11.21,-7.65,z+.025),.17,.035,bronze)
    b.cylinder('reading side table stem',(11.21,-7.65,z+.255),.025,.46,bronze)
    b.cylinder('reading side table stone top',(11.21,-7.65,z+.50),.23,.035,stone, sides=64)
    b.obstacle('reading side table',[10.98,-7.88,11.44,-7.42],z,z+.53)
    b.lathe('reading cup',(11.21,-7.65,z+.519),[(.035,0),(.04,.07),(.036,.075),(.031,.068),(.029,.01)],ivory)

    # Storage on the former headboard wall and decorative, everyday detail.
    a,s,c,n=cfg['dresser'];cx=(a+c)/2
    b.box_bounds('dresser recessed plinth',[a+.05,s+.04,c-.05,n-.04],z+.02,z+.10,dark)
    b.box_bounds('dresser oak cabinet',cfg['dresser'],z+.10,z+.78,oak,.006)
    b.box('dresser limestone top',(cx,(s+n)/2,z+.795),(c-a+.02,n-s+.02,.03),stone,.006)
    for j in range(3):
        zz=z+.21+j*.215
        b.box('dresser drawer front',(cx,n+.012,zz),(c-a-.025,.024,.197),oak,.003)
        b.box('dresser bronze pull',(cx,n+.031,zz+.065),(.24,.018,.012),bronze,.003)
    b.obstacle('dresser',cfg['dresser'],z,z+.81)
    b.lathe('dresser ceramic vase',(8.35,-9.12,z+.813),[(.06,0),(.09,.06),(.075,.18),(.035,.24),(.03,.24),(.035,.19)],ivory)
    for j in range(3):
        b.tube('vase branch',[(8.35,-9.12,z+1.01),(8.32+j*.04,-9.1,z+1.20+j*.04)],.0025,bronze)
    b.box('dresser folded linen',(9.20,-9.10,z+.85),(.48,.30,.07),linen,.028)
    art=b.material('muted olive artwork',(.25,.30,.24,1),.9)
    for j,xx in enumerate((8.45,9.15)):
        b.box('oak artwork frame',(xx,-9.325,z+1.48),(.51,.035,.65),oak,.005)
        b.box('artwork ivory mount',(xx,-9.305,z+1.48),(.47,.004,.61),ivory)
        b.box('artwork colour field',(xx,-9.301,z+1.48),(.30,.002,.39),art)
        b.cylinder('artwork stone circle',(xx+.035,-9.299,z+1.54),.105,.002,stone,(0,1,0),48)
    # Clear route from the entry around the new desk chair to the ensuite.
    route=[[7.85,-1,z],[9.07,-1,z],[9.02,-2.15,z],[9.02,-4.78,z],[10.45,-4.78,z],[10.45,-6.10,z],[10.45,-8.90,z],[11.82,-8.90,z]]
    nav['loftBedroomFinish']={'revision':cfg['revision'],'configuration':cfg,'route':route}
    nav['loftBedroomExpansion']['route']=route
    loft=nav['levelLoftStair'];loft['upperRoutes']['suite']=route
    old_route=loft['routes']['suite'];arrival=old_route.index([7.85,-1,z])
    loft['routes']['suite']=old_route[:arrival]+route
    scene['level_loft_report']=json.dumps(loft)
    for values in lists('rooms','new_views'):
        for room in values:
            if room.get('id')=='proposal-new-loft-studio':
                room.update(position=[10.65,-4.60,z],direction=[-.70,-1,-.05])
    # Resolve tubes to actual meshes for consistent native/GLB/geometry output.
    b.finish(cfg)
    for ob in b.objects:mark(ob)
    report={'revision':cfg['revision'],'changedObjects':[ob.name for ob in changed],
            'removedObjects':removed,'bedAssembly':bed_names,'ceilingObjects':ceiling_names,
            'closureFaces':closure_faces,'facadeFaces':facade_faces,'configuration':cfg}
    scene['loft_finish_revision']=cfg['revision'];scene['loft_finish_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning') and spec.get('loftLevelStair'):
    finish_loft(globals())
