"""Owner-approved return stair and level gallery, integrated with real finishes.

The small component asset is frozen from the measured owner-review study. Roof
planes are generated parametrically by proposal_roofs; this module coordinates
the floor opening, joinery, facade, furnishings, door and walking navigation.
"""
import json
import math
import re

REVISION = 'modern-loft-stair-2026-10-19'
PREFIX = 'Proposal | Level loft | '
PROJECTED = [9.70, -3.03, 2.60, 10.60, -.115, 8.40]
FLOOR_WORK = [5.50, -5.30, 5.15, 10.50, 4.95, 5.63]
KNEE_WORK = [7.30, -5.30, 5.40, 10.22, 4.95, 7.65]


def clip_half(poly, axis, value, greater):
    """Clip positions plus any interpolated per-corner attributes."""
    out = []
    for a, b in zip(poly, poly[1:] + poly[:1]):
        ai = a[axis] >= value if greater else a[axis] <= value
        bi = b[axis] >= value if greater else b[axis] <= value
        if ai:
            out.append(a)
        if ai != bi:
            t = (value - a[axis]) / (b[axis] - a[axis])
            out.append([x + t * (y - x) for x, y in zip(a, b)])
    return out


def subtract_box(poly, box, axes=3):
    inside, out = poly, []
    for k in range(axes):
        for value, greater in ((box[k], True), (box[k + axes], False)):
            part = clip_half(inside, k, value, not greater)
            if len(part) > 2:
                out.append(part)
            inside = clip_half(inside, k, value, greater)
            if len(inside) < 3:
                return out
    return out


def apply_level_loft(ns):
    import bpy
    import bmesh
    from mathutils import Matrix, Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    scene, nav, root = ns['scene'], ns['nav'], ns['ROOT']
    if scene.get('level_loft_revision') == REVISION:
        return [], json.loads(scene['level_loft_report'])
    cfg = json.loads((root / 'proposal/interiors/leisure/loft-stair.json').read_text())
    asset = json.loads((root / 'proposal/specs/level-loft-components.json').read_text())
    assert cfg['approvedStudySHA256'] == asset['approvedStudySHA256']
    shift_y = float(cfg.get('stairShiftY', 0))
    b = RoomBuilder(ns, 'level loft', PREFIX, 'P31 Level loft and return stair')
    owners = set(scene.collection.children_recursive)
    removed, changed, created, relocated = [], [], [], []
    bpy.context.view_layer.update()

    def bounds(ob):
        points = [ob.matrix_world @ Vector(v) for v in ob.bound_box]
        return [min(p[k] for p in points) for k in range(3)] + [max(p[k] for p in points) for k in range(3)]

    def overlap(a, c):
        return all(a[k] < c[k + 3] - 1e-7 and a[k + 3] > c[k] + 1e-7 for k in range(3))

    def unlink(ob):
        removed.append(ob.get('source_name', ob.name))
        for collection in tuple(ob.users_collection):
            if collection in owners:
                collection.objects.unlink(ob)
        if not ob.users_collection:
            bpy.data.objects.remove(ob)

    def isolate(ob):
        if any(ob.name in other.objects for other in bpy.data.scenes if other != scene):
            old = ob
            ob = old.copy()
            for collection in tuple(old.users_collection):
                if collection in owners:
                    collection.objects.unlink(old)
                    collection.objects.link(ob)
            ob['source_name'] = old.get('source_name', old.name)
        return ob

    # Capture the current variant's exterior finish, including its appearance
    # role, before replacing these particular facade assemblies.
    finish = {}
    for ob in scene.objects:
        if 'Landing garden-facing north panel' in ob.name:
            finish['wall'] = ob.data.materials[-1]
        if 'Loft garden dormer north panel' in ob.name:
            finish['dormer'] = ob.data.materials[-1]
    oak = bpy.data.materials.get('Interior | Landings natural oak') or bpy.data.materials['Proposal | Pale oak']
    plaster = bpy.data.materials.get('Interior | Landings warm ivory') or bpy.data.materials['Proposal | Loft plaster']
    mats = {'oak': oak, 'plaster': plaster,
            'glass': bpy.data.materials['Proposal | Clear glazing'],
            'metal': bpy.data.materials['Proposal | Bronze black frames']}

    def retired(name):
        return bool(re.search(r'Grand loft stair|Proposal \| Loft stair |Landing garden-facing|Loft garden dormer|attached landing east half|attached loft east half|Loft suite entry wall|Loftsuite 01 \| hall door|Central loft link rooflight|Original loft stair rooflight|Rooflight control', name, re.I))

    # The new suite opening has its own tested complete surround. Identify the
    # superseded frame by door membership, not its incidental numeric prefix.
    for ob in list(scene.objects):
        name = ob.get('source_name', ob.name)
        frame = any('Loftsuite 01 | hall door' in value for value in ob.get('frame_doors', []))
        bb = bounds(ob) if ob.type == 'MESH' else None
        guard = bb and bool(re.search(r'loft.*(guard|banister)|landing.*(guard|banister)', name, re.I)) and bb[2] > 5.30 and bb[3] > 7.1 and bb[0] < 10.5
        if retired(name) or frame or guard:
            unlink(ob)

    def trim_mesh(ob, cutters):
        # Interpolate UVs through every cut. Unaffected faces and finish scale
        # survive; source-scene objects/data are never edited in place.
        world = ob.matrix_world.copy()
        ob = isolate(ob)
        ob.matrix_world = world
        # Evaluated to_mesh() slots can refer to temporary evaluated materials.
        # Retain the persistent source IDs before freeing that mesh, otherwise
        # the rebuilt surface can save/export with empty material slots.
        materials = [slot.material for slot in ob.material_slots]
        deps = bpy.context.evaluated_depsgraph_get()
        evaluated = ob.evaluated_get(deps)
        mesh = evaluated.to_mesh()
        topology=bmesh.new();topology.from_mesh(mesh)
        solid=bool(topology.faces) and all(edge.is_manifold for edge in topology.edges)
        topology.free()
        if solid:
            # Exact differences retain a closed cut end on solid walls/slabs.
            # The polygon fallback below is only for already-open surface meshes.
            from scripts.geometry.blender_booleans import BooleanWorkspace
            result=bpy.data.meshes.new_from_object(evaluated,preserve_all_data_layers=True,depsgraph=deps)
            evaluated.to_mesh_clear();ob.modifiers.clear();ob.data=result
            assert len(result.materials) == len(materials)
            for i, material in enumerate(materials):result.materials[i] = material
            tools=[]
            for x0,y0,z0,x1,y1,z1 in cutters:
                vertices=[(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),(x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)]
                me=bpy.data.meshes.new('Level loft temporary cut')
                me.from_pydata(vertices,[],[(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]);me.update()
                tools.append(bpy.data.objects.new('Level loft temporary cut',me))
            try:
                with BooleanWorkspace(tools) as work:work.difference(ob,tools,'Coordinated loft opening')
            finally:
                for tool in tools:
                    data=tool.data;bpy.data.objects.remove(tool,do_unlink=True)
                    if data.users==0:bpy.data.meshes.remove(data)
            if not ob.data.polygons:
                unlink(ob);return
            # Assign physical UV scale to new cut faces only; original finishes
            # retain their UVs and material assignment through the Boolean.
            for face in ob.data.polygons:
                points=[ob.matrix_world @ ob.data.vertices[i].co for i in face.vertices]
                cap=any(all(abs(p[axis]-cut[axis+side])<1e-5 for p in points) for cut in cutters for axis in range(3) for side in (0,3))
                if cap:
                    normal=ob.matrix_world.to_3x3() @ face.normal
                    axes=sorted(range(3),key=lambda k:abs(normal[k]))[:2]
                    for layer in ob.data.uv_layers:
                        for loop in face.loop_indices:
                            p=ob.matrix_world @ ob.data.vertices[ob.data.loops[loop].vertex_index].co
                            layer.data[loop].uv=(p[axes[0]],p[axes[1]])
            changed.append(ob.get('source_name',ob.name));ob['level_loft_cut']=REVISION
            return
        uv_layers = list(mesh.uv_layers)
        polygons = []
        for face in mesh.polygons:
            poly = []
            for loop in face.loop_indices:
                p = ob.matrix_world @ mesh.vertices[mesh.loops[loop].vertex_index].co
                poly.append(list(p) + [v for layer in uv_layers for v in layer.data[loop].uv])
            pieces = [poly]
            for cutter in cutters:
                pieces = [q for p in pieces for q in subtract_box(p, cutter)]
            polygons.extend((p, face.material_index, face.use_smooth) for p in pieces)
        uv_names = [layer.name for layer in uv_layers]
        evaluated.to_mesh_clear()
        if not polygons:
            unlink(ob)
            return
        inv = ob.matrix_world.inverted()
        vertices, faces, corners = [], [], []
        for p, mi, smooth in polygons:
            start = len(vertices)
            vertices.extend(inv @ Vector(v[:3]) for v in p)
            faces.append(tuple(range(start, len(vertices))))
            corners.append((p, mi, smooth))
        result = bpy.data.meshes.new(ob.name + ' coordinated cuts')
        result.from_pydata(vertices, [], faces)
        for mat in materials:
            result.materials.append(mat)
        for name in uv_names:
            result.uv_layers.new(name=name)
        for face, (p, mi, smooth) in zip(result.polygons, corners):
            face.material_index = mi
            face.use_smooth = smooth
            for i, loop in enumerate(face.loop_indices):
                for j, layer in enumerate(result.uv_layers):
                    layer.data[loop].uv = p[i][3 + j * 2:5 + j * 2]
        result.update()
        ob.modifiers.clear()
        ob.data = result
        changed.append(ob.get('source_name', ob.name))
        ob['level_loft_cut'] = REVISION

    for ob in list(scene.objects):
        if ob.type != 'MESH':
            continue
        name, bb = ob.get('source_name', ob.name), bounds(ob)
        rebuilt_roof = re.search(r'Joined roof|Roof weathering|Roof drainage',name,re.I)
        cutters = [PROJECTED] if not rebuilt_roof and overlap(bb, PROJECTED) else []
        ceiling_member = re.search(r'floor|deck|ceiling|soffit', name, re.I) or 'Original first junction lintel' in name or 'Roof join | First front masonry head' in name
        if ceiling_member and bb[2] >= 5.15 and bb[5] <= 5.63 and overlap(bb, FLOOR_WORK):
            cutters.append(FLOOR_WORK)
        if re.search(r'knee wall|bridge.*west', name, re.I) and bb[2] > 5.4 and overlap(bb, KNEE_WORK):
            cutters.append(KNEE_WORK)
        if 'North west elevation closure' in name:
            # The shifted half landing crosses the former wing junction.
            # Carry the real stairwell through its old wall head as well.
            for x0,y0,x1,y1 in cfg['holes']:
                cutter=[x0,y0,5.15,x1,y1,7.65]
                if overlap(bb,cutter):cutters.append(cutter)
        if cutters:
            trim_mesh(ob, cutters)

    transform = Matrix.Translation((7.95, 2.50, 2.75)) @ Matrix.Rotation(math.pi / 2, 4, 'Z') @ Matrix.Translation((-8.12, 3.675, 0))
    for ob in list(scene.objects):
        if re.search(r'Landings 01 \|.*reading', ob.get('source_name', ob.name), re.I):
            ob = isolate(ob)
            ob.matrix_world = transform @ ob.matrix_world
            relocated.append(ob.get('source_name', ob.name))

    # Import only authored new components, never the study's simplified context.
    # Every material is an existing production material with its authored UVs.
    leaf_members, tread_objects = [], []
    for index, part in enumerate(asset['parts']):
        if part['tag'] in ('stair', 'stair-guard', 'guard'):
            continue
        vertices = [list(p) for p in part['vertices']]
        if part['tag'] in ('stair', 'stair-guard', 'guard'):
            for p in vertices:
                p[1] += shift_y
        elif part['tag'] == 'floor' or part['label'] == 'Scribed west loft lining':
            # Move only the opening's two edges; the room perimeter stays put.
            for p in vertices:
                if any(abs(p[1] - y) < 1e-5 for y in (-3.93, -.95)):
                    p[1] += shift_y
        vv, ff, lookup = [], [], {}
        for j in range(0, len(vertices), 3):
            face = []
            for p in vertices[j:j + 3]:
                key = tuple(round(v, 7) for v in p)
                if key not in lookup:
                    lookup[key] = len(vv)
                    vv.append(p)
                face.append(lookup[key])
            if len(set(face)) == 3:
                ff.append(face)
        label = f'{index:03d} {part["label"]}'
        ob = b.mesh(label, vv, ff, mats[part['material']])
        ob['level_loft_part'] = part['label']
        ob['level_loft_tag'] = part['tag']
        ob['approved_study'] = asset['approvedStudySHA256']
        ob['stair_followup_shift_y'] = shift_y
        # Consistent outward normals, retaining approved component proportions.
        bm = bmesh.new(); bm.from_mesh(ob.data)
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        bm.to_mesh(ob.data); bm.free(); ob.data.update(); b.uv(ob)
        if part['label'] in ('Flush courtyard pier', 'Flush storey closure', 'North loft return'):
            bb = bounds(ob)
            mat = finish.get('dormer' if bb[2] >= 5.55 else 'wall', plaster)
            ob.data.materials.append(mat)
            for face in ob.data.polygons:
                if face.normal.x > .8:
                    face.material_index = 1
            role = mat.get('appearance_role')
            if role:
                nav.setdefault('exteriorAppearance', {}).setdefault('objects', {}).setdefault(role, []).append(ob.name)
        if part['label'] in ('Suite 2032 mm door leaf open', 'Suite lever'):
            leaf_members.append(ob.name)
        if part['label'] == 'Suite 2032 mm door leaf open':
            ob['authored_complete_frame'] = True
            ob['walkthrough_opening_leaf'] = True
        if part['label'].startswith('32 mm oak tread'):
            tread_objects.append(ob)
        created.append(ob.name)

    from scripts.model.modern_loft_stair import build_modern_stair, repair_stairwell_linings
    new_start=len(b.objects)
    tread_objects,modern_guards=build_modern_stair(b,cfg,oak,mats['glass'])
    repairs=repair_stairwell_linings(b,cfg,plaster)
    created.extend(ob.name for ob in b.objects[new_start:])

    # Reconcile nav in both already-built and full-build (pending-list) modes.
    def lists(key, pending=None):
        result = [nav.setdefault(key, [])]
        if pending and pending in ns and ns[pending] is not result[0]:
            result.append(ns[pending])
        return result

    def add(key, pending, value):
        (ns[pending] if pending in ns else nav.setdefault(key, [])).append(value)

    def rect_poly(r):
        a, s, c, n = r
        return [[a, s], [c, s], [c, n], [a, n]]

    for key, pending in [('surfaces','new_surfaces'), ('segments','new_segments'), ('obstacles','new_obstacles'), ('ramps','new_ramps')]:
        for items in lists(key, pending):
            items[:] = [v for v in items if not retired(v.get('name','')) and v.get('name') != 'Proposal | First-to-loft stair beside garden glazing']
            if key == 'surfaces':
                revised = []
                for item in items:
                    pieces = [item['polygon']]
                    if abs(item['z'] - 5.55) < .025:
                        pieces = [q for p in pieces for q in subtract_box(p, [5.50,-5.30,10.50,4.95],2)]
                    if 2.60 < item['z'] < 8.40:
                        pieces = [q for p in pieces for q in subtract_box(p, [9.70,-3.03,10.60,-.115],2)]
                    revised.extend({**item,'polygon':p} for p in pieces)
                items[:] = revised
            elif key == 'segments':
                items[:] = [v for v in items if not (re.search(r'loft.*(guard|banister)|landing.*(guard|banister)|knee wall|bridge.*west', v['name'],re.I) and v['bottom'] >= 5.3 and max(v['a'][0],v['b'][0]) > 7.1 and min(v['a'][0],v['b'][0]) < 10.5)]
            elif key == 'obstacles':
                for item in items:
                    if re.search(r'Landings 01 \|.*reading', item['name'], re.I):
                        p = [transform @ Vector((x,y,0)) for x,y in rect_poly(item['box'])]
                        item.update(box=[min(v.x for v in p),min(v.y for v in p),max(v.x for v in p),max(v.y for v in p)],bottom=item['bottom']+2.75,top=item['top']+2.75)

    deck = [rect_poly([7.30,-5.30,10.50,4.95])]
    for cut in cfg['holes'] + [[9.70,-3.03,10.60,-.115]]:
        deck = [q for p in deck for q in subtract_box(p,cut,2)]
    for p in deck:
        add('surfaces','new_surfaces',{'name':PREFIX+'level gallery deck','polygon':p,'z':5.55})
    # Room footprints drive the map and interior detection as well as labels.
    # Replace the old bridge footprint with the actual filled gallery pieces.
    for rooms in lists('planRooms','new_rooms'):
        revised=[]
        for room in rooms:
            pieces=[room['polygon_m']]
            if room.get('floor')==3:
                pieces=[q for p in pieces for q in subtract_box(p,[5.50,-5.30,10.50,4.95],2)]
            revised.extend({**room,'polygon_m':p} for p in pieces)
        rooms[:]=revised
    for p in deck:
        add('planRooms','new_rooms',{'name':'Level loft gallery','floor':3,'base_z':5.55,'polygon_m':p,'proposal':True})
    turn = cfg['landings'][0]
    zm = 2.8 + turn['z']
    add('surfaces','new_surfaces',{'name':PREFIX+'rectangular half landing','polygon':rect_poly(turn['box']),'z':zm})
    rise = 2.75 / cfg['nTotal']
    treads, tread_index = [], 0
    for fi, flight in enumerate(cfg['flights']):
        ax, ay = flight['a']; cx, cy = flight['b']; length=math.dist(flight['a'],flight['b'])
        ux,uy=(cx-ax)/length,(cy-ay)/length; nx,ny=-uy,ux
        def point(t,q):return [ax+ux*t+nx*q,ay+uy*t+ny*q]
        low=2.8+flight['z']; high=low+flight['n']*rise; going=length/(flight['n']-1)
        poly=[point(-.03,-flight['w']/2),point(length+.03,-flight['w']/2),point(length+.03,flight['w']/2),point(-.03,flight['w']/2)]
        add('ramps','new_ramps',{'name':PREFIX+f'flight {fi+1}','polygon':poly,'start':[*flight['a'],low],'end':[*flight['b'],high]})
        for i in range(flight['n']-1):
            ob=tread_objects[tread_index];tread_index+=1
            treads.append({'name':ob.name,'flight':fi,'centre':point((i+.5)*going,0),'top':low+(i+1)*rise})
        # Guarding collision follows each rake in short segments.
        for side in (-1,1):
            for i in range(20):
                t=.05+(length-.05)*i/20;end=.05+(length-.05)*(i+1)/20
                za=low+rise+(high-low-rise)*i/20;zb=low+rise+(high-low-rise)*(i+1)/20
                add('segments','new_segments',{'name':PREFIX+f'flight {fi+1} guard {side} {i}','a':point(t,side*(flight['w']/2+cfg['modern']['guardOffsetM'])),'b':point(end,side*(flight['w']/2+cfg['modern']['guardOffsetM'])),'bottom':za,'top':zb+1.05+cfg['modern']['handrailWidthM']/2,'thickness':cfg['modern']['handrailWidthM']})
        r=[min(p[0] for p in poly),min(p[1] for p in poly),max(p[0] for p in poly),max(p[1] for p in poly)]
        if fi==0:r[3]=ay-going*2.5
        add('obstacles','new_obstacles',{'name':PREFIX+f'flight {fi+1} low soffit','box':r,'bottom':2.8,'top':high,'maxFootZ':3.04})
    add('obstacles','new_obstacles',{'name':PREFIX+'half landing low soffit','box':turn['box'],'bottom':2.8,'top':zm,'maxFootZ':3.04})
    for i,guard in enumerate(modern_guards[4:]):
        add('segments','new_segments',{'name':PREFIX+f'landing guard {i}',**guard})
    for z,top in [(2.80,5.25),(5.55,7.64)]:
        add('segments','new_segments',{'name':PREFIX+'flush courtyard facade','a':[9.655,-3.03],'b':[9.655,-.115],'bottom':z,'top':top,'thickness':.09})
    for a,c in [([11.25,-5.35],[9.55,-5.35]),([12.35,-5.35],[12.6,-5.35])]:
        add('segments','new_segments',{'name':PREFIX+'suite entry wall','a':a,'b':c,'bottom':5.55,'top':7.64,'thickness':.10})
    for r in [[7.225,-5.30,7.295,-3.93],[7.225,-.95,7.295,4.45]]:
        for k in (1,3):
            if r[k] in (-3.93,-.95):r[k]+=shift_y
        add('segments','new_segments',{'name':PREFIX+'west gallery lining','a':[sum((r[0],r[2]))/2,r[1]],'b':[sum((r[0],r[2]))/2,r[3]],'bottom':5.55,'top':7.64,'thickness':.07})
    door_id=PREFIX+'suite door'
    for items in lists('interactiveDoors','proposed_doors'):
        items[:]=[d for d in items if not retired(d['id'])]
    hinge=[11.265,-5.42,5.55]
    for name in leaf_members:
        scene.objects[name]['door_id']=door_id;scene.objects[name]['door_hinge']=hinge
    add('interactiveDoors','proposed_doors',{'id':door_id,'wall':door_id,'hinge':hinge,'members':leaf_members,'openingCenter':[11.8,-5.35,5.55],'apertureAxis':[1,0],'apertureWidth':1.064,'closedDelta':math.pi/2,'openDelta':0,'openDistance':1.5,'closeDistance':2.1,'authoredCompleteFrame':True})
    views={'proposal-old-house-loft-stair':([6.60,-.65,2.80],[0,-1,.25],'Loft staircase'),
           'proposal-joined-first-floor-landing':([7.60,-.65,2.80],[-.45,-1,-.10],'Joined first-floor landing'),
           'proposal-new-loft-landing':([9,-3.9,5.55],[0,1,0],'Loft gallery · suite side'),
           'proposal-original-loft-bridge':([9,.3,5.55],[0,1,0],'Loft gallery · hobby side'),
           'proposal-grand-loft-stair-approach':([6.60,-.65,2.80],[0,-1,.25],'Loft staircase · approach')}
    for items in lists('rooms','new_views'):
        for room in items:
            if room['id'] in views:
                p,d,label=views[room['id']];room.update(position=p,direction=d,label=label)
    existing_ids={r['id'] for items in lists('rooms','new_views') for r in items}
    for name,(p,d,label) in views.items():
        if name not in existing_ids:add('rooms','new_views',{'id':name,'position':p,'direction':d,'label':label,'group':'Proposal · Loft' if p[2]>5 else 'Proposal · First floor'})
    add('rooms','new_views',{'id':'proposal-level-loft-arrival','position':cfg['arrival'],'direction':[1,.25,0],'label':'Loft staircase · top landing','group':'Proposal · Loft'})
    for light in nav.get('proposalLights',[]):
        if re.search(r'Landings 01 \|.*reading', light['name'],re.I):
            key='position' if 'position' in light else 'point' if 'point' in light else None
            if key:light[key]=list(transform @ Vector(light[key]))
    report={'revision':REVISION,'approvedStudySHA256':asset['approvedStudySHA256'],'floorZ':2.8,'loftZ':5.55,'ceilingZ':7.60,'rises':15,'riserMetres':rise,'goingMetres':.26,'flightWidthMetres':cfg['flights'][0]['w'],'landingZ':zm,'openings':cfg['holes'],'flights':cfg['flights'],'treads':treads,'routes':cfg['routes'],'upperRoutes':cfg['upperRoutes'],'roof':cfg['roof'],'removed':removed,'trimmed':changed,'created':created,'relocatedReading':relocated}
    report.update(stairShiftY=shift_y,bottomLanding=cfg.get('bottomLanding'),modern=cfg['modern'],oakJoineryRevision=cfg['revision'],stairwellRepairs=[ob.name for ob in repairs])
    available={ob.name:ob for ob in scene.objects if ob.type=='MESH'}
    planning=nav.get('planningApplication',{})
    for key,material_key in [('matching_roof_objects','roof_material'),('tile_hung_dormer_objects','dormer_material')]:
        if key in planning:
            material=planning[material_key]
            planning[key]=[name for name,ob in available.items() if any(m and m.get('appearance_source_material',m.name)==material for m in ob.data.materials)]
            if key=='tile_hung_dormer_objects':
                # Elevation closures can combine brick, internal plaster and a
                # tile-hung end. Keep those mixed assemblies distinct from the
                # complete tile-hung dormers in the finish inventory.
                mixed=[name for name in planning[key] if any(m and m.get('appearance_source_material',m.name)=='Red brown brick' for m in available[name].data.materials)]
                planning['mixed_dormer_finish_objects']=mixed
                planning[key]=[name for name in planning[key] if name not in mixed]
    for values in nav.get('exteriorAppearance',{}).get('objects',{}).values():
        values[:]=[name for name in values if name in available]
    nav.pop('grandLoftStair',None)
    from scripts.model.modern_loft_stair import coordinate_light_stair_navigation
    coordinate_light_stair_navigation(ns,cfg,report)
    nav['levelLoftStair']=report
    nav.setdefault('proposalLoft',{}).update(stair_void=cfg['holes'][0],stair_voids=cfg['holes'],stair_ramp_name=PREFIX+'flight 1')
    nav.setdefault('proposalVariantRoutes',{})['stair']={'layout':'return','flights':cfg['flights'],'landing':turn['box'],'floorZ':5.55}
    scene['level_loft_revision']=REVISION;scene['level_loft_report']=json.dumps(report)
    for key in ('grand_loft_stair','grand_stair_guard_returns'):
        if key in scene:del scene[key]
    bpy.context.view_layer.update()
    return b.objects, report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning') and spec.get('loftLevelStair'):
    apply_level_loft(globals())
