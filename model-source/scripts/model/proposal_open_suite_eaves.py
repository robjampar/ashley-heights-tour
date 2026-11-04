"""Restore the walk-through suite and fit storage behind the loft wall line."""
import json

REVISION = 'open-suite-eaves-storage-2026-10-23'
PREFIX = 'Eaves storage | '


def apply_open_suite_eaves(ns):
    import bpy
    from mathutils import Vector
    from scripts.interiors.interior_furnishing import RoomBuilder
    from scripts.model.proposal_suite_layout_loft import match_balcony

    scene, nav = ns['scene'], ns['nav']
    if scene.get('open_suite_eaves_revision') == REVISION:
        return [], json.loads(scene['open_suite_eaves_report'])
    cfg = json.loads((ns['ROOT'] / 'proposal/specs/open-suite-eaves-storage.json').read_text())
    original = json.loads((ns['ROOT'] / 'proposal/specs/bedroom4-stair-suite-components.json').read_text())['configuration']['suite']
    balcony = json.loads((ns['ROOT'] / 'proposal/specs/suite-layout-loft-use.json').read_text())['balcony']
    owners = set(c for s in bpy.data.scenes if s == scene or 'Proposal ·' in s.name for c in s.collection.children_recursive)
    removed, changed = [], []
    def retire(ob):
        removed.append(ob.name)
        for col in tuple(ob.users_collection):
            if col in owners:
                col.objects.unlink(ob)
        if not ob.users_collection:
            bpy.data.objects.remove(ob)
    for ob in list(scene.objects):
        if ob.name.startswith(('Proposal | Original house loft stair | Suite connection oak', 'Loft reading nook | ')):
            retire(ob)
    # Keep the suite entrance and private bathroom door; dressing is open.
    bpy.context.view_layer.update()
    doors = ns.get('proposed_doors', nav.get('interactiveDoors', []))
    for door in doors:
        if door['id'] not in ('Combined suite 01 | suite entry', 'Combined suite 01 | bathroom entry'):
            continue
        normal = Vector((-door['apertureAxis'][1], door['apertureAxis'][0], 0))
        leaf = scene.objects[door['id'] + ' oak leaf']
        face = [(leaf.matrix_world @ Vector(p)).dot(normal) for p in leaf.bound_box]
        for ob in scene.objects:
            if not ob.name.startswith(door['id']) or not ('rebated stop' in ob.name or 'head stop' in ob.name):
                continue
            stop = [(ob.matrix_world @ Vector(p)).dot(normal) for p in ob.bound_box]
            delta = min(face)-.001-max(stop) if door['openDelta'] > 0 else max(face)+.001-min(stop)
            ob.matrix_world.translation += normal*delta
            ob['door_stop_clearance_m'] = .001
            changed.append(ob)
    b = RoomBuilder(ns, 'open suite eaves', 'Open suite | ', 'P40 Open suite and eaves storage')
    ivory = bpy.data.materials['Interior | Landings warm ivory']
    oak = bpy.data.materials['Interior | Sidebed natural oak']
    floor_oak = bpy.data.materials['Interior | Landings natural oak']
    dark = bpy.data.materials['Interior | Sidebed recess and drain']
    bronze = bpy.data.materials['Interior | Sidebed satin bronze']
    # Flush plaster reveals, without door surrounds or projecting stops.
    for y in (1.10, 2.02):
        b.box('dressing open jamb', (0, y + (.003 if y < 1.5 else -.003), 3.875), (.29, .006, 2.15), ivory)
    b.box('dressing open head', (0, 1.56, 4.947), (.29, .92, .006), ivory)
    for i, (x, y, X, Y) in enumerate(original['wardrobes']):
        b.box_bounds('wardrobe ceiling filler ' + str(i), [x, y, X, Y], 5.05, 5.165, oak, .002)
        b.box_bounds('wardrobe flush frieze ' + str(i), [x-.009, y-.0125, X+.009, y+.0125], 5.029, 5.165, oak, .001)
    # A shallow sloping carcass uses the eaves; every face stays behind x=7.295.
    b.prefix = PREFIX
    s = cfg['storage']; back, front, y0, y1, z = s['backX'], s['frontX'], s['startY'], s['endY'], s['floorZ']
    back_top, front_top = s['backTopZ'], s['frontTopZ']
    b.box_bounds('supported platform', [back, y0, 7.30, y1], 5.35, z, floor_oak)
    b.box_bounds('recessed plinth', [back + .02, y0 + .02, front - .045, y1 - .02], z, z + .085, dark)
    b.box_bounds('oak base', [back, y0, front - .025, y1], z + .075, z + .097, oak, .001)
    b.box_bounds('oak back', [back, y0, back + .018, y1], z + .097, back_top, oak)
    def section(label, y, width, material):
        profile = [(back, z + .097), (front - .025, z + .097), (front - .025, front_top), (back, back_top)]
        vertices = [(x, yy, zz) for yy in (y, y + width) for x, zz in profile]
        return b.mesh(label, vertices, [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)], material)
    length = y1 - y0; bay_width = length / 3
    for i in range(4):
        yy = y0 + i * bay_width - (.018 if i == 3 else 0)
        section('scribed oak side ' + str(i), yy, .018, oak)
    # The lid follows the pitch with clearance beneath the actual roof lining.
    v = [(back, y0, back_top), (front-.025,y0,front_top), (front-.025,y1,front_top), (back,y1,back_top)]
    b.mesh('sloping oak lid', v + [(x,y,zz-.018) for x,y,zz in v], [(0,1,2,3),(7,6,5,4),(0,4,5,1),(1,5,6,2),(2,6,7,3),(3,7,4,0)], oak)
    for i in range(3):
        a = y0 + i * bay_width + .020; c = y0 + (i+1) * bay_width - .020
        for level, depth in [(z+.46,.96),(z+.92,.60),(z+1.38,.22)]:
            b.box_bounds('adjustable oak shelf', [front-.03-depth,a,front-.03,c], level, level+.018, oak, .001)
    # Six paired, push-latch doors read as a flush wall, with 3 mm joints.
    door_bottom, door_top = z + .09, front_top - .025
    step = length / 6
    for i in range(6):
        a, c = y0 + i*step + .002, y0 + (i+1)*step - .002
        ob = b.box_bounds('flush ivory door ' + str(i+1), [front-.022,a,front,c], door_bottom, door_top, ivory, .0015)
        ob['eaves_storage_door'] = True; ob['opening_method'] = 'Concealed hinge and push latch'
        hinge_y = a + .014 if i % 2 == 0 else c - .014
        for zz in (door_bottom+.14, (door_bottom+door_top)/2, door_top-.14):
            b.box('concealed hinge plate', (front-.028,hinge_y,zz), (.012,.035,.05), bronze, .002)
    b.box_bounds('top scribed frieze', [front-.025,y0,front,y1], door_top+.003, 7.600, ivory, .001)
    for yy in (y0, y1-.018):
        b.box_bounds('flush end filler', [front-.025,yy,front,yy+.018], z+.01,7.600,ivory,.001)
    b.obstacle('built-in eaves cupboards', [back,y0,front,y1], z,7.60)
    balcony_report = match_balcony(b, ns, balcony, retire)
    b.finish({'revision': REVISION})
    def groups(key, pending=None):
        values = [nav.setdefault(key, [])]
        extra = ns.get(pending or 'new_'+key)
        if extra is not None and all(extra is not v for v in values): values.append(extra)
        return values
    for key, pending in [('interactiveDoors','proposed_doors'),('obstacles',None),('segments',None),('proposalLights',None),('mirrors',None)]:
        for values in groups(key,pending):
            values[:] = [o for o in values if not o.get('id',o.get('name','')).startswith('Loft reading nook | ') and o.get('name') != 'Balcony rail']
    for values in groups('rooms','new_views'):
        values[:] = [o for o in values if o.get('id') not in ('proposal-loft-reading-nook','proposal-original-balcony','proposal-eaves-storage')]
    add = ns.get('new_views',nav.setdefault('rooms',[]))
    add.extend([
        {'id':'proposal-eaves-storage','label':'Loft eaves storage','position':[8.25,-2.1,5.55],'direction':[-1,-.2,-.2],'floor':2},
        {'id':'proposal-original-balcony','label':'Original balcony · matching railing','position':[7.1,9.6,2.8],'direction':[0,1,-.15],'floor':1},
    ])
    report = {'revision':REVISION,'configuration':{'suite':original,**cfg},'removed':removed,'changed':[o.name for o in changed],'created':[o.name for o in b.objects],'replacements':{},'balcony':balcony_report,'dressingConnectionOpen':True,'bathroomDoorRetained':True,'wardrobeFrontageM':sum(r[2]-r[0] for r in original['wardrobes']),'storageFrontageM':length,'storageMaximumDepthM':front-back,'floorKeptClear':[7.3,-4.58,8.47,-1.6],'doorStopClearanceM':.001}
    nav['suiteLayoutLoft'] = report
    nav['openSuiteEavesStorage'] = report
    scene['open_suite_eaves_revision'] = REVISION
    scene['open_suite_eaves_report'] = json.dumps(report)
    bpy.context.view_layer.update()
    return changed+b.objects, report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_open_suite_eaves(globals())
