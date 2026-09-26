"""Integrate the accepted editable suite asset into the complete proposal.

Only the reviewed furnishings, partitions and east-wall cells are imported.
The asset is frozen separately from ongoing room experiments and fingerprinted
by the normal full-model builder.
"""
def apply_principal_suite(ns):
    import bpy, json, math, re, hashlib
    from mathutils import Vector
    root, scene, nav, variant = (ns[k] for k in ('ROOT', 'scene', 'nav', 'VARIANT'))
    if variant not in ('compact', 'planning'):
        return
    manifest = json.loads((root/'proposal/interiors/principal/accepted/manifest.json').read_text())
    entry = manifest['variants'][variant]; asset = root/entry['directory']
    for filename, digest in entry['sha256'].items():
        assert hashlib.sha256((asset/filename).read_bytes()).hexdigest() == digest, filename
    bed = json.loads((asset/'bedroom-report.json').read_text())
    bath = json.loads((asset/'ensuite-report.json').read_text())
    meta = json.loads((asset/'metadata.json').read_text())
    bedroom, ensuite = bed['configuration'], bath['configuration']
    authored = ('Bedroom 02 | ', 'Ensuite 01 | ')
    east = 'Proposal | New wing east upper '
    old_prefixes = tuple('Proposal | '+s for s in (
        'Principal bed', 'Principal sitting sofa', 'Principal dressing',
        'Principal east partition', 'Principal bathroom', 'Principal WC',
        'Principal freestanding bath', 'Principal bath filler', 'Principal bath spout',
        'Principal study desk', 'Principal study bookcase', 'Principal nook dressing',
        'Principal nook stool', 'Principal nook downlight', 'Dressing downlight',
        'Principal suite north partition door'))
    removed = []
    def source(ob): return ob.get('source_name', ob.name)
    def obsolete(name): return name.startswith(old_prefixes + authored + (east,))
    proposal_collections = set(scene.collection.children_recursive)
    for ob in list(scene.objects):
        if not obsolete(source(ob)): continue
        removed.append({'name':source(ob), 'object_name':ob.name})
        for owner in tuple(ob.users_collection):
            if owner in proposal_collections: owner.objects.unlink(ob)
        if not ob.users_collection: bpy.data.objects.remove(ob)
    collection = ns['collection']('P62 Principal suite — accepted interior')
    existing_materials = {m.name:m for m in bpy.data.materials}
    with bpy.data.libraries.load(str(asset/'suite.blend'), link=False) as (available, loaded):
        loaded.objects = [n for n in available.objects if n.startswith(authored+(east,))]
    imported = []
    for ob in loaded.objects:
        if ob is None or ob.type != 'MESH': continue
        collection.objects.link(ob); imported.append(ob)
    # Linked library objects need a dependency update before matrix_world is
    # evaluated. Reading it earlier loses centred shell objects' translations.
    scene.view_layers[0].update()
    for ob in imported:
        matrix = ob.matrix_world.copy(); ob.parent = None; ob.matrix_world = matrix
        ob['principal_suite_revision'] = manifest['bedroom_revision']
        ob['basis'] = 'Owner accepted principal room design; full-model integration'
        for i, material in enumerate(ob.data.materials):
            canonical = re.sub(r'\.\d+$', '', material.name)
            if canonical in existing_materials:
                ob.data.materials[i] = existing_materials[canonical]
            else:
                ns['materials'][material.name] = material
                ns['PALETTE'][material.name] = list(material.diffuse_color)
    scene.view_layers[0].update()
    def bounds(ob):
        p = [ob.matrix_world@Vector(v) for v in ob.bound_box]
        return [min(v[i] for v in p) for i in range(3)] + [max(v[i] for v in p) for i in range(3)]
    owned = [o for o in imported if source(o).startswith(authored)]
    expected = bed['authored_objects'] - 1 + bath['authored_objects']
    assert len(owned) == expected, (len(owned), expected)
    # Fail before exporting if library evaluation has changed any placement.
    expected_bounds = bath['authored_bounds'] + bath['retained_bounds']
    for ob in imported:
        candidates = [r['bounds'] for r in expected_bounds if r['name']==source(ob)]
        actual = bounds(ob)
        assert candidates and min(max(abs(a-b) for a,b in zip(actual,c)) for c in candidates)<.00003, ('Accepted part moved',source(ob),actual,candidates)
    # Drop obsolete movement records before new lists are merged by export.
    for key, pending in (('segments','new_segments'), ('obstacles','new_obstacles'), ('surfaces','new_surfaces')):
        for items in (nav[key], ns[pending]): items[:] = [x for x in items if not obsolete(x['name'])]
    for items in (nav['interactiveDoors'], ns['proposed_doors']):
        items[:] = [d for d in items if not obsolete(d['id'])]
    # Walls/collision come from the actual revised rectangular wall cells.
    collision = []
    def obstacle(name, b):
        item = {'name':name, 'box':[b[0],b[1],b[3],b[4]], 'bottom':b[2], 'top':b[5]}
        ns['new_obstacles'].append(item); collision.append(item)
    wall_terms = ('north media partition','dressing return pier','dressing doorway header',
                  'bathroom dividing wall','bathroom doorway header')
    for ob in imported:
        name = source(ob); b = bounds(ob)
        if name.startswith(east) and any(t in name for t in ('pier','sill ','head ',' glass')):
            obstacle(name, b)
        elif any(name.startswith(p+t) for p in authored for t in wall_terms):
            obstacle(name,b)
    ns['new_obstacles'].extend(bed['new_obstacles'])
    # Group solid joinery; keep individual shower-glass planes so its entry stays open.
    by_source = {source(o):o for o in owned}
    for group in bath['obstacle_groups']:
        parts = [by_source[n] for n in group['objects']]
        sets = [[p] for p in parts] if group['name']=='Shower glass' else [parts]
        for j, members in enumerate(sets):
            boxes = [bounds(o) for o in members]
            b = [min(p[k] for p in boxes) for k in range(3)] + [max(p[k] for p in boxes) for k in range(3,6)]
            obstacle('Ensuite 01 | '+group['name']+' '+str(j),b)
    # Update complete room identities, retaining established menu IDs where possible.
    old_rooms = {'New principal suite','New dressing room','New principal bathroom','Principal WC','Principal study'}
    for items in (nav['planRooms'],ns['new_rooms']):items[:] = [r for r in items if r['name'] not in old_rooms]
    for name, poly in (('New principal suite',bedroom['bedroom_polygon']),('New dressing room',ensuite['dressing_polygon']),('New principal bathroom',ensuite['bathroom_polygon'])):
        ns['new_rooms'].append({'name':name,'floor':1,'base_z':2.8,'polygon_m':poly,'proposal':True})
        ns['new_surfaces'].append({'name':'Principal suite | '+name,'polygon':poly,'z':2.8})
    ids = {'proposal-new-principal-suite','proposal-new-dressing-room','proposal-new-principal-bathroom','proposal-principal-wc','proposal-principal-study'}
    for items in (nav['rooms'],ns['new_views']):items[:] = [r for r in items if r['id'] not in ids]
    views = [
        ('proposal-new-principal-suite','Principal bedroom',[8.96,-10.15,2.8],[2.14,-5.05,-.75]),
        ('proposal-principal-study','Principal corner desk',[8.45,-12.9,2.8],[-2.30,-2.15,-.95]),
        ('proposal-new-dressing-room','Walk-through wardrobe',[11.17,-10.12,2.8],[.38,1.77,-.51]),
        ('proposal-new-principal-bathroom','Principal bathroom',[11.89,-7.39,2.8],[.26,2.89,-.53]),
    ]
    for id,label,position,direction in views:ns['new_views'].append({'id':id,'label':label,'group':'Proposal · First floor','position':position,'direction':direction})
    # The accepted mesh leaves are already open. Explicit closed deltas restore
    # their closed pose at a distance and zero restores the reviewed open pose.
    for id,hinge,center,axis,delta,terms in (
        ('Principal suite entrance',[8.47,-8.7,2.8],[8.945,-8.7,2.8],[1,0],math.pi/2,('Bedroom 02 | entry door open','Bedroom 02 | entry door handle')),
        ('Principal wardrobe door',[9.9,-10.725,2.8],[9.9,-10.25,2.8],[0,1],math.pi/2,('Bedroom 02 | dressing door open','Bedroom 02 | dressing door handle')),
        ('Principal bathroom door',[12.4,-7.70,2.8],[11.925,-7.70,2.8],[-1,0],-math.pi/2,('Ensuite 01 | bathroom door open','Ensuite 01 | bathroom lever handle')),
    ):
        members = [o.name for o in owned if source(o).startswith(terms)]
        assert len(members)>=2,(id,members)
        ns['proposed_doors'].append({'id':id,'wall':id,'hinge':hinge,'members':members,'openingCenter':center,'apertureAxis':axis,'apertureWidth':.95,'closedDelta':delta,'openDelta':0,'openDistance':1.5,'closeDistance':2.0})
    nav['proposalLights'] = [l for l in nav.get('proposalLights',[]) if not l['name'].startswith(('Principal bedroom','Principal bathroom','Principal nook','Dressing'))] + meta['proposalLights']
    nav['mirrors'] = meta['mirrors']
    nav['principalInterior'] = {'bedroomRevision':3,'ensuiteRevision':2,'nativeAssetSHA256':entry['sha256']['suite.blend'],'integrated':True,'rooms':[v[0] for v in views]}
    # Keep appearance membership consistent with the replacement facade objects.
    appearance = nav.get('exteriorAppearance')
    if appearance:
        for role,names in appearance['objects'].items():
            names[:] = [n for n in names if not n.startswith(east)]
        for ob in imported:
            for mat in ob.data.materials:
                role = mat.get('appearance_role')
                if role:
                    appearance['materials'][mat.name] = {'role':role,'source':mat.get('appearance_source_material',mat.name)}
                    names = appearance['objects'].setdefault(role,[])
                    if ob.name not in names:names.append(ob.name)
    report = {'variant':variant,'asset_sha256':entry['sha256']['suite.blend'],'imported_meshes':len(imported),'authored_meshes':len(owned),'removed_objects':removed,'new_collision_records':len(collision),'bedroom_revision':3,'ensuite_revision':2,'original_scenes_preserved':True}
    (ns['OUT']/'principal-interior-report.json').write_text(json.dumps(report,indent=2)+'\n')
    print('PRINCIPAL_SUITE_INTEGRATED',variant,len(imported),'meshes',flush=True)
    return report

if 'scene' in globals() and 'nav' in globals():
    principal_interior_report = apply_principal_suite(globals())
