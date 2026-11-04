"""Owner-approved 2 m northeast chamfer, coordinated through room and terrace."""
import json
import math

REVISION = 'garden-corner-chamfer-2026-10-20'
PREFIX = 'Proposal | Garden chamfer | '


def clip_polygon(polygon, limit):
    """Keep x+y <= limit, preserving winding and inserting real intersections."""
    result = []
    for a, b in zip(polygon, polygon[1:]+polygon[:1]):
        da, db = sum(a[:2])-limit, sum(b[:2])-limit
        if da <= 1e-8:
            result.append(list(a))
        if (da < -1e-8 and db > 1e-8) or (da > 1e-8 and db < -1e-8):
            t = da/(da-db)
            result.append([a[i]+t*(b[i]-a[i]) for i in range(len(a))])
    return result


def chamfer_garden_room(ns):
    import bpy
    import bmesh
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder

    scene, nav = ns['scene'], ns['nav']
    if scene.get('garden_chamfer_revision') == REVISION:
        return [], json.loads(scene['garden_chamfer_report'])
    cfg = ns['spec']['rearGardenRoomChamfer']
    east = float(nav['rearGardenRoomInset']['eastGlazingX'])
    north, setback = 14.1, float(cfg['setbackAlongEachWallM'])
    limit = east+north-setback
    roof_limit = limit+.20*math.sqrt(2)
    ceiling_limit = limit-.025*math.sqrt(2)
    guard_limit = limit+.035*math.sqrt(2)
    b = RoomBuilder(ns, 'garden chamfer', PREFIX, 'P36 Garden corner chamfer')
    changed, removed = [], []
    worlds = {o.name: o.matrix_world.copy() for o in scene.objects}
    black = scene.objects['Proposal | Garden fascia'].data.materials[0]
    glass = scene.objects['Proposal | Garden north glazing fixed right glass'].data.materials[0]
    wood = scene.objects['Proposal | Terrace north guard top rail'].data.materials[0]
    stone = scene.objects['Proposal | Terrace continuous stone finish'].data.materials[0]

    def mark(ob):
        ob['garden_chamfer_revision'] = REVISION
        if ob not in changed:
            changed.append(ob)

    def assert_proposal(ob):
        assert not any(ob.name in s.objects for s in bpy.data.scenes
                       if 'Proposed' not in s.name and 'Proposal ·' not in s.name), ob.name

    def bounds(ob):
        points = [worlds[ob.name] @ Vector(p) for p in ob.bound_box]
        return [min(p[k] for p in points) for k in range(3)]+[max(p[k] for p in points) for k in range(3)]

    def retire(ob):
        assert_proposal(ob)
        removed.append(ob.name)
        bpy.data.objects.remove(ob, do_unlink=True)

    def trim(ob, plane):
        assert_proposal(ob)
        coords = [worlds[ob.name] @ v.co for v in ob.data.vertices]
        if max(p.x+p.y for p in coords) <= plane+1e-6:
            return
        if min(p.x+p.y for p in coords) >= plane-1e-6:
            retire(ob)
            return
        ob.data = ob.data.copy()
        bm = bmesh.new()
        try:
            bm.from_mesh(ob.data)
            world = worlds[ob.name]
            bmesh.ops.transform(bm, matrix=world, verts=list(bm.verts))
            cut = bmesh.ops.bisect_plane(bm, geom=list(bm.verts)+list(bm.edges)+list(bm.faces),
                  dist=1e-6, plane_co=(plane, 0, 0), plane_no=(1, 1, 0), clear_outer=True)
            edges = [e for e in cut['geom_cut'] if isinstance(e, bmesh.types.BMEdge) and e.is_boundary]
            if edges:
                filled = bmesh.ops.holes_fill(bm, edges=edges, sides=0)['faces']
                # Use the parent finish on the new cut, not an unrelated slot.
                for face in filled:
                    face.material_index = 0
            bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
            bmesh.ops.transform(bm, matrix=world.inverted(), verts=list(bm.verts))
            bm.to_mesh(ob.data)
        finally:
            bm.free()
        ob.data.update()
        mark(ob)

    def prism(label, poly, z0, z1, material):
        n = len(poly)
        return b.mesh(label, [(x,y,z) for z in (z0,z1) for x,y in poly],
            [tuple(reversed(range(n))), tuple(range(n,2*n))]+
            [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)], material)

    def ribbon(label, path, width, z0, z1, material):
        # True mitres: shared section at each bend, without coplanar boxes.
        tangents = [(Vector(c)-Vector(a)).normalized() for a,c in zip(path,path[1:])]
        normals = [Vector((-t.y,t.x)) for t in tangents]
        sections = []
        for i,p in enumerate(path):
            normal = normals[0] if i==0 else normals[-1] if i==len(path)-1 else (normals[i-1]+normals[i]).normalized()
            offset = normal*(width/2/(normal.dot(normals[min(i,len(normals)-1)])))
            sections.append((Vector(p)+offset,Vector(p)-offset))
        objects=[]
        for i,(s,t) in enumerate(zip(sections,sections[1:])):
            objects.append(prism(label+' '+str(i+1), [s[1],t[1],t[0],s[0]],z0,z1,material))
        return objects

    def bar(label,a,c,width,z0,z1,material):
        return ribbon(label,[a,c],width,z0,z1,material)[0]

    def lists(key,pending):
        values=[nav.setdefault(key,[])]
        if pending in ns and ns[pending] is not values[0]:
            values.append(ns[pending])
        return values

    def append_item(key, pending, item):
        # The full builder merges pending rows at the end. A targeted refresh
        # writes directly to navigation, so append to exactly one owner.
        ns.get(pending, nav.setdefault(key, [])).append(item)

    floor_name = 'Proposal | Quiet oak | Proposal | Garden room floor'
    for name, plane in [(floor_name,limit),('Proposal | Rear flat roof',roof_limit),
                        ('Proposal | Terrace continuous stone finish',roof_limit),
                        ('Proposal | Garden living plaster ceiling',ceiling_limit)]:
        trim(scene.objects[name], plane)
    for ob in list(scene.objects):
        if ob.name.startswith('Proposal | Quiet oak | Floor grout 4-1-'):
            trim(ob,limit-.028*math.sqrt(2))

    # Keep the two original fixed door jambs; rebuild only the affected bays.
    keep = {'Proposal | Garden north glazing fixed right mullion',
            'Proposal | Garden east glazing fixed left mullion.002'}
    retired_prefixes = ('Proposal | Garden north glazing fixed right',
                        'Proposal | Garden east glazing fixed left',
                        'Proposal | Garden north glazing fixed upper header',
                        'Proposal | Garden east glazing fixed upper header',
                        'Proposal | Terrace north guard','Proposal | Terrace east guard',
                        'Proposal | Garden fascia','Proposal | Terrace perimeter drain')
    for ob in list(scene.objects):
        if ob.name.startswith(retired_prefixes) and ob.name not in keep:
            retire(ob)
    corner_n,corner_e=[east-setback,north],[east,north-setback]
    glazing_path=[[1.1,north],corner_n,corner_e,[east,11.325]]
    for i,(a,c,panes) in enumerate(zip(glazing_path,glazing_path[1:],[1,2,1])):
        length=math.dist(a,c);u=(Vector(c)-Vector(a))/length
        for j in range(panes):
            p=Vector(a)+u*(j*length/panes+.026)
            q=Vector(a)+u*((j+1)*length/panes-.026)
            bar('fixed glass %d.%d'%(i+1,j+1),p,q,.024,.063,2.437,glass)
        if panes==2:
            p=(Vector(a)+Vector(c))/2
            bar('diagonal centre mullion',p-u*.024,p+u*.024,.048,0,2.5,black)
    for label,p in [('north',corner_n),('east',corner_e)]:
        # Bisector-oriented corner section covers both glass/frame seals.
        angle=math.pi/8
        poly=[(p[0]+x*math.cos(angle)-y*math.sin(angle),p[1]+x*math.sin(angle)+y*math.cos(angle))
              for x,y in [(-.026,-.026),(.026,-.026),(.026,.026),(-.026,.026)]]
        prism(label+' angled corner post',poly,0,2.5,black)
    ribbon('glazing sill frame',glazing_path,.055,0,.0625,black)
    ribbon('glazing head frame',glazing_path,.055,2.4375,2.5,black)
    ribbon('solid upper header',[[-4.78,north],corner_n,corner_e,[east,8.92]],.055,2.5,2.55,black)
    for values in lists('segments','new_segments'):
        values[:]=[s for s in values if not s['name'].startswith(retired_prefixes)]
    for i,(a,c) in enumerate(zip(glazing_path,glazing_path[1:])):
        append_item('segments','new_segments',{'name':PREFIX+'fixed glass '+str(i+1),'a':list(a),'b':list(c),'bottom':0,'top':2.5,'thickness':.055})
    for i,(a,c) in enumerate(zip([[-4.78,north],corner_n,corner_e],[corner_n,corner_e,[east,8.92]])):
        append_item('segments','new_segments',{'name':PREFIX+'solid upper header '+str(i+1),'a':a,'b':c,'bottom':2.5,'top':2.55,'thickness':.055})

    # Same clipped edge through slab, finish, fascia and terrace balustrade.
    roof_e=east+.18;roof_n=north+.22
    fascia=[[-5.02,roof_n],[roof_limit-roof_n,roof_n],[roof_e,roof_limit-roof_e],[roof_e,8.935]]
    ribbon('roof fascia',fascia,.10,2.55,2.775,black)
    drain_n=14.245;drain_limit=roof_limit-.075*math.sqrt(2)
    drain=[[-4.84,drain_n],[drain_limit-drain_n,drain_n],[roof_e-.075,drain_limit-(roof_e-.075)]]
    ribbon('perimeter drainage channel',drain,.065,2.8,2.806,black)
    guard_n=north+.04;guard_e=east+.03
    guard=[[-4.87,guard_n],[guard_limit-guard_n,guard_n],[guard_e,guard_limit-guard_e],[guard_e,9.02]]
    ribbon('terrace guard top rail',guard,.09,3.83,3.92,wood)
    ribbon('terrace guard bottom rail',guard,.06,2.89,2.95,wood)
    posts=[]
    for i,(a,c) in enumerate(zip(guard,guard[1:])):
        length=math.dist(a,c);u=(Vector(c)-Vector(a))/length
        bays=math.ceil(length/1.6)
        stations=[k*length/bays for k in range(bays+1)]
        for k,t in enumerate(stations):
            if i and k==0:continue
            p=Vector(a)+u*t
            # All shared corner posts occur once; rotated to adjacent path.
            bar('terrace guard post %d.%d'%(i,k),p-u*.045,p+u*.045,.09,2.8,3.9,wood)
            posts.append(list(p))
        count=math.ceil(length/.115)
        for k in range(1,count):
            t=k*length/count
            if any(abs(t-s)<.065 for s in stations):continue
            p=Vector(a)+u*t
            bar('terrace guard baluster %d.%d'%(i,k),p-u*.016,p+u*.016,.032,2.83,3.87,wood)
    for i,(a,c) in enumerate(zip(guard,guard[1:])):
        append_item('segments','new_segments',{'name':PREFIX+'terrace guard '+str(i+1),'a':a,'b':c,'bottom':2.8,'top':3.92,'thickness':.09})

    # Exterior cutout receives a stone apron, with a 4 mm joint to the
    # existing rear patio and an 8 mm gap beyond the 55 mm glazing frame.
    apron_limit=limit+.036*math.sqrt(2)
    apron=[[east,apron_limit-east],[east,14.196],[apron_limit-14.196,14.196]]
    prism('external stone apron',apron,-.10,-.004,stone)
    for values in lists('surfaces','new_surfaces'):
        for item in values:
            if item['name']=='Proposal | Garden room floor':item['polygon']=clip_polygon(item['polygon'],limit)
            if item['name']=='Proposal | Terrace continuous stone finish':item['polygon']=clip_polygon(item['polygon'],roof_limit)
    append_item('surfaces','new_surfaces',{'name':PREFIX+'external stone apron','polygon':apron,'z':-.004})
    for values in lists('planRooms','new_rooms'):
        for room in values:
            if room['name']=='Garden living and dining':room['polygon_m']=clip_polygon(room['polygon_m'],limit)
            if room['name']=='Shared roof terrace':room['polygon_m']=clip_polygon(room['polygon_m'],guard_limit-.06*math.sqrt(2))

    def move(ob,delta):
        assert_proposal(ob)
        if ob.type=='MESH':
            ob.data=ob.data.copy();world=worlds[ob.name];inverse=world.inverted()
            for v in ob.data.vertices:v.co=inverse@(world@v.co+Vector((*delta,0)))
            ob.data.update()
        else:
            mat=worlds[ob.name].copy();mat.translation+=Vector((*delta,0));ob.matrix_world=mat
        mark(ob)

    moved_groups={'dining':[],'terraceCafe':[],'edgeLights':[]}
    dining_delta=(-.45,-.2);cafe_delta=(-.8,.4)
    for ob in list(scene.objects):
        if ob.name not in worlds:continue
        delta=None;group=None
        if ob.name.startswith(('Proposal | Quiet oak | Garden dining','Proposal | Quiet oak | Garden table')):
            delta=dining_delta;group='dining'
        elif ob.name.startswith('Terrace 01 |'):
            if ob.type=='MESH':bb=bounds(ob);inside=bb[0]>0 and bb[1]>10.5
            else:inside=worlds[ob.name].translation.x>0 and worlds[ob.name].translation.y>10.5
            if inside:delta=cafe_delta;group='terraceCafe'
        elif ob.name.startswith('Proposal | Terrace east low light'):
            delta=(-.87,-1.03);group='edgeLights'  # 3.00,12.90: inside diagonal guard
        elif ob.name.startswith('Proposal | Garden edge light') and ob.name.endswith('.003'):
            delta=(-.70,-1.24);group='edgeLights'  # 3.20,13.00: outside new diagonal
        if delta:
            move(ob,delta);moved_groups[group].append(ob.name)
    for values in lists('obstacles','new_obstacles'):
        for item in values:
            delta=dining_delta if item['name'].startswith('Proposal | Quiet oak | Garden dining') else cafe_delta if item['name'].startswith('Terrace 01 | café') else None
            if delta:
                if 'polygon' in item:item['polygon']=[[p[0]+delta[0],p[1]+delta[1]]for p in item['polygon']]
                if 'box' in item:item['box']=[p+delta[k%2]for k,p in enumerate(item['box'])]
    for light in nav.get('proposalLights',[]):
        if light['name'] in moved_groups['terraceCafe']:
            light['position']=[light['position'][0]+cafe_delta[0],light['position'][1]+cafe_delta[1],light['position'][2]]
    for values in lists('rooms', 'new_views'):
        for room in values:
            if room['id']=='proposal-garden-living-and-dining':
                room['position']=[3.3,10.55,0]
                room['direction']=[-1,.5,0]
    terrace=nav['proposalRoofTerrace']
    terrace['roof_polygon_m']=clip_polygon([[-5.02,8.935],[roof_e,8.935],[roof_e,roof_n],[-5.02,roof_n]],roof_limit)
    terrace['usable_polygon_m']=next(r['polygon_m']for r in nav['planRooms'] if r['name']=='Shared roof terrace') if any(r['name']=='Shared roof terrace' for r in nav['planRooms']) else clip_polygon([[-4.845,9.05],[4.005,9.05],[4.005,14.115],[-4.845,14.115]],guard_limit-.06*math.sqrt(2))
    terrace['guard_paths']=[p for p in terrace['guard_paths'] if p[0]=='west']+[[label,a,c]for label,a,c in zip(['north','diagonal','east'],guard,guard[1:])]
    terrace['clear_routes_m']['cafe']=[[-2.59,10.15,2.8],[-.45,10.15,2.8],[.2,10.65,2.8],[.3,11.1,2.8]]
    ns['spec']['rearGardenRoomPolygon']=clip_polygon([[-4.9,8.92],[east,8.92],[east,north],[-4.9,north]],limit)
    ns['spec']['roofTerrace']=terrace
    report={'revision':REVISION,'setbackAlongEachWallM':setback,'cornerBefore':[east,north],
            'glazingEndpoints':[corner_n,corner_e],'diagonalLengthM':math.dist(corner_n,corner_e),
            'internalAnglesDeg':[135,135],'glassPanesAcrossDiagonal':2,'removedFloorAreaM2':setback**2/2,
            'glazingPlaneXY':limit,'roofPlaneXY':roof_limit,'ceilingPlaneXY':ceiling_limit,'guardPlaneXY':guard_limit,
            'floorPolygon':ns['spec']['rearGardenRoomPolygon'],'roofPolygon':terrace['roof_polygon_m'],
            'guardPath':guard,'movedGroups':moved_groups,'diningDelta':list(dining_delta),'terraceCafeDelta':list(cafe_delta),
            'changed':[o.name for o in changed],'removed':removed,'added':[o.name for o in b.objects],
            'retained':['garden door assemblies and hinges','terrace access doors','three walk-on rooflights','loft oak stair','500 mm east inset and internal masonry return']}
    for ob in b.objects:ob['garden_chamfer_revision']=REVISION
    nav['rearGardenRoomChamfer']=report
    scene['garden_chamfer_revision']=REVISION;scene['garden_chamfer_report']=json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects,report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT')=='compact':
    chamfer_garden_room(globals())
