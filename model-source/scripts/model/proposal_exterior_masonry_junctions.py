"""WM01 finished envelopes around the named masonry corrections, Compact only."""
import json

REVISION = 'WM01-native-2026-10-29'
FINISH_REVISION = 'WM01-west-brick-finish-2026-10-29'


def apply_west_recess_finish(ns, report):
    """Tag only the exterior skin; keep the room-side plaster and geometry."""
    import bpy
    scene, nav = ns['scene'], ns['nav']
    if scene.get('exterior_masonry_finish_revision') == FINISH_REVISION:
        return [], report
    material = bpy.data.materials['Appearance | wall | Red brown brick']
    assert material.get('appearance_role') == 'wall'
    changed, counts = [], {}
    for name in ('Proposal | West recess upper facade',
                 'WM01 | West recess exterior closure',
                 'WM01 | West recess floor-band closure'):
        ob = scene.objects[name]
        if any(name in s.objects for s in bpy.data.scenes if s != scene and 'Proposal ·' not in s.name):
            raise ValueError('Exterior finish is shared with a retained scene: ' + name)
        ob.data = ob.data.copy()
        index = next((i for i, m in enumerate(ob.data.materials) if m == material), None)
        if index is None:
            index = len(ob.data.materials); ob.data.materials.append(material)
        faces = [f for f in ob.data.polygons
                 if all(abs((ob.matrix_world @ ob.data.vertices[v].co).x - 4.93) < .0002 for v in f.vertices)]
        if not faces:
            raise ValueError('Missing west exterior face: ' + name)
        for face in faces: face.material_index = index
        counts[name] = len(faces); changed.append(ob)
    appearance = nav['exteriorAppearance']
    appearance['materials'][material.name] = {'role': 'wall', 'source': material['appearance_source_material']}
    appearance['objects']['wall'] = sorted(set(appearance['objects']['wall']) | set(counts))
    report['exteriorFinish'] = dict(revision=FINISH_REVISION, material=material.name,
                                   faces=counts, interiorPlasterPreserved=True, geometryChanged=False)
    report['changed'] = list(dict.fromkeys(report['changed'] + list(counts)))
    nav['exteriorMasonryCoordination'] = report
    scene['exterior_masonry_finish_revision'] = FINISH_REVISION
    scene['exterior_masonry_report'] = json.dumps(report)
    return changed, report


def apply_exterior_masonry_junctions(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.geometry.blender_booleans import BooleanWorkspace
    from scripts.model.proposal_level_loft import subtract_box
    scene, nav = ns['scene'], ns['nav']
    if scene.get('exterior_masonry_revision') == REVISION:
        return apply_west_recess_finish(ns, json.loads(scene['exterior_masonry_report']))
    b = RoomBuilder(ns, 'exterior masonry coordination', 'WM01 | ', 'P48 Exterior masonry coordination')
    cfg=json.loads((ns['ROOT']/'proposal/specs/exterior-masonry-junctions.json').read_text())
    changed = []
    # Keep the existing exterior plane and glazing. Only the inner plaster face
    # moves to cover the 100 mm block leaf and 15 mm lining behind the cavity.
    names=['Proposal | Level loft | '+suffix+' Flush courtyard pier'for suffix in ('067','068')]
    names += ['Proposal | Internal garden gallery '+side+' panel'for side in ('south','north')]
    for name in names:
        ob = scene.objects[name]
        if any(ob.name in s.objects for s in bpy.data.scenes if s != scene and 'Proposal ·' not in s.name):
            raise ValueError('WM01 pier is shared with a retained scene: ' + ob.name)
        ob.data = ob.data.copy()
        inv = ob.matrix_world.inverted()
        for v in ob.data.vertices:
            p = ob.matrix_world @ v.co
            if p.x < 9.5: p.x = 9.3325
            v.co = inv @ p
        ob.data.update(); changed.append(ob)
        for key in ('obstacles', 'segments'):
            for item in nav.get(key, []):
                if item.get('name') != ob.name: continue
                if 'box' in item: item['box'][0] = 9.3325
                elif 'a' in item and 'b' in item:
                    item['a'][0] = item['b'][0] = (9.3325+9.7)/2
                    item['thickness'] = 9.7-9.3325
    # Recess the fixed terminal frames, retaining the external glazing planes.
    for r in cfg['windowReveals']:
        ob=scene.objects[r['objectName']];lo,hi=r['low'],r['high']
        cutter=b.box('temporary frame pocket',tuple((a+c)/2 for a,c in zip(lo,hi)),tuple(c-a for a,c in zip(lo,hi)),ob.data.materials[0])
        with BooleanWorkspace([cutter])as work:work.difference(ob,[cutter],'Window jamb reveal')
        b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
    white = next(m for m in scene.objects['Proposal | West recess upper facade'].data.materials
                 if 'white' in m.name.lower() or 'plaster' in m.name.lower())
    ivory = bpy.data.materials['Interior | Landings warm ivory']
    boxes = [
        ('West recess exterior closure', [4.93,-9.59,2.6], [5.145,-9.4,5.35], white),
        ('West recess floor-band closure', [4.93,-9.79,2.6], [5.145,-9.59,2.8], white),
        ('West recess upper lining return', [5.145,-9.59,5.0715], [5.295,-9.4,5.35], ivory),
        ('Courtyard south inner corner', [9.3325,-3.3965,2.8], [9.7,-3.03,5.25], ivory),
        ('Courtyard south return lining', [9.7,-3.3965,2.8], [9.8525,-3.259,5.25], ivory),
        ('Courtyard ground inner corner', [9.3325,-3.3965,0], [9.7,-3.029,2.6], ivory),
        ('Courtyard ground return lining', [9.7,-3.3965,0], [9.8525,-3.259,2.6], ivory),
    ]
    for label,lo,hi,material in boxes:
        ob = b.box(label, tuple((a+c)/2 for a,c in zip(lo,hi)), tuple(c-a for a,c in zip(lo,hi)), material)
        ob['structural_finish_detail'] = True
        changed.append(ob)
        nav.setdefault('obstacles', []).append(dict(name=ob.name, box=[*lo[:2],*hi[:2]], bottom=lo[2], top=hi[2]))
    cuts=[([9.3325,-3.3965,-.01],[9.7,-2.53,5.25]),([9.3325,-.61,-.01],[9.7,-.115,5.25]),
          ([9.7,-3.3965,-.01],[9.8525,-3.259,5.25])]
    # Finish/deck pockets above the full-section joists; keep the previous
    # framing outline so these wall footprints do not renumber or notch joists.
    deck_names=['Proposal | Entrance first floor continuation','Proposal | Wing first floor courtyard notch']
    deck_names += [o.name for o in scene.objects if o.name.startswith('Proposal | Stair landing finish | courtyard junction closed flo')]
    for name in deck_names:
        ob=scene.objects[name]
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            raise ValueError('WM01 deck shared with retained scene: '+name)
        ob.data=ob.data.copy()
        if not ob.get('structural_framing_reference_json'):
            ob['structural_framing_reference_json']=json.dumps(dict(vertices=[list(ob.matrix_world@v.co)for v in ob.data.vertices],
                faces=[list(f.vertices)for f in ob.data.polygons],basis='Pre-WM01 framing outline retained. The physical deck has local pier/shelf pockets above unchanged full-section joists.'))
        for lo,hi in [([9.3275,-3.3815,2.7559],[9.8575,-2.53,2.801]),([9.3275,-.61,2.7559],[9.8025,-.115,2.801])]:
            cutter=b.box('temporary deck pocket',tuple((a+c)/2 for a,c in zip(lo,hi)),tuple(c-a for a,c in zip(lo,hi)),ob.data.materials[0])
            with BooleanWorkspace([cutter])as work:work.difference(ob,[cutter],'Pier support / deck perimeter')
            b.objects.remove(cutter);bpy.data.objects.remove(cutter,do_unlink=True)
        changed.append(ob)
    floor_names=['Arrival 01 | continuous limestone floor.002','Arrival 01 | garden passage ivory ceiling',
                 'Landings 01 | continuous oak landing floor.002','Landings 01 | continuous oak landing floor.009',
                 'Gym 01 | continuous rubber floor','Formal 01 | wide oak floor']
    floor_names += [o.name for o in scene.objects if o.name.startswith('Proposal | Stair landing finish | courtyard junction continuous')]
    for name in floor_names:
        ob=scene.objects[name]
        if any(ob.name in s.objects for s in bpy.data.scenes if s!=scene and 'Proposal ·'not in s.name):
            raise ValueError('WM01 finish is shared with a retained scene: '+name)
        old=ob.data;old.calc_loop_triangles();layers=list(old.uv_layers);polygons=[]
        for tri in old.loop_triangles:
            parts=[[list(ob.matrix_world@old.vertices[old.loops[i].vertex_index].co)+[v for uv in layers for v in uv.data[i].uv]for i in tri.loops]]
            for lo,hi in cuts:parts=[q for p in parts for q in subtract_box(p,lo+hi)if len(q)>2]
            polygons.extend((p,tri.material_index)for p in parts)
        inv=ob.matrix_world.inverted();verts=[];faces=[]
        for points,_ in polygons:
            start=len(verts);verts.extend(inv@Vector(p[:3])for p in points);faces.append(tuple(range(start,len(verts))))
        me=bpy.data.meshes.new(name+' WM01 pier perimeter');me.from_pydata(verts,[],faces)
        for m in old.materials:me.materials.append(m)
        for uv in layers:me.uv_layers.new(name=uv.name)
        for face,(points,mi)in zip(me.polygons,polygons):
            face.material_index=mi
            for j,li in enumerate(face.loop_indices):
                for k,uv in enumerate(me.uv_layers):uv.data[li].uv=points[j][3+2*k:5+2*k]
        me.update();ob.data=me;changed.append(ob)
    report = dict(revision=REVISION, changed=[o.name for o in changed], removed=[],
                  exteriorGlazingPreserved=True, insidePierFaceX=9.3325,
                  approvedForConstruction=False, published=False)
    nav['exteriorMasonryCoordination'] = report
    scene['exterior_masonry_revision'] = REVISION
    scene['exterior_masonry_report'] = json.dumps(report)
    bpy.context.view_layer.update()
    finished, report = apply_west_recess_finish(ns, report)
    return list(dict.fromkeys(changed + finished)), report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') == 'compact':
    apply_exterior_masonry_junctions(globals())
