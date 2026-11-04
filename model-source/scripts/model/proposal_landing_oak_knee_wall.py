"""Restore cut-surface finishes and stop the old knee wall at the roof junction."""
import json

REVISION = 'landing-oak-knee-wall-2026-10-20'
KNEE_NAME = 'Proposal | Original loft front knee wall 2'
KNEE_END_X = 6.200611591339111
MATERIAL_REPAIRS = {
    'Bedroom 02 | ceiling 2': 'Bedroom 02 | ivory plaster',
    'Guest 01 | ivory ceiling finish': 'Interior | Guest warm ivory',
    'Bedroom2 01 | ivory ceiling finish': 'Interior | Bedroom2 warm ivory',
    'Familybath 01 | ivory ceiling finish': 'Interior | Familybath warm ivory',
    'Bedroom4 01 | ivory ceiling': 'Interior | Bedroom4 warm ivory',
    'Hobby 01 | oak hobby floor': 'Interior | Hobby natural oak',
    'Hobby 01 | archive oak floor': 'Interior | Hobby natural oak',
    'Hobby 01 | bridge oak deck.003': 'Interior | Hobby natural oak',
    'Hobby 01 | bridge oak deck.004': 'Interior | Hobby natural oak',
    'Hobby 01 | landing oak floor': 'Interior | Hobby natural oak',
    'Hobby 01 | eaves store oak floor': 'Interior | Hobby natural oak',
    'Landings 01 | continuous oak landing floor.009': 'Interior | Landings natural oak',
}


def apply_landing_oak_knee_wall(ns):
    import bpy
    from mathutils import Vector
    from scripts.geometry.blender_booleans import BooleanWorkspace

    scene, nav = ns['scene'], ns['nav']
    if scene.get('landing_oak_knee_revision') == REVISION:
        return [], json.loads(scene['landing_oak_knee_report'])
    changed, restored = [], []
    for name, material_name in MATERIAL_REPAIRS.items():
        ob = scene.objects.get(name)
        if ob is None or all(s.material for s in ob.material_slots):
            continue
        assert len(ob.material_slots) == 1, name
        ob.data = ob.data.copy()
        ob.data.materials[0] = bpy.data.materials[material_name]
        changed.append(ob)
        restored.append({'name': name, 'material': material_name,
                         'geometryAndUVsUnchanged': True})

    knee = scene.objects[KNEE_NAME]
    knee.data = knee.data.copy()
    # The planning version passed through the same surface-cut fallback.
    original_slots = ['Proposal | Loft plaster', 'Red brown brick',
                      'Proposal | White internal walls',
                      'Appearance | wall | Red brown brick']
    for i, slot in enumerate(knee.material_slots):
        if slot.material is None:
            knee.data.materials[i] = bpy.data.materials[original_slots[i]]
    before = max((knee.matrix_world @ v.co).x for v in knee.data.vertices)
    me = bpy.data.meshes.new('Knee wall end trim temporary')
    x0, x1, y0, y1, z0, z1 = KNEE_END_X, 8., 2., 2.5, 5., 7.
    me.from_pydata([(x0,y0,z0),(x1,y0,z0),(x1,y1,z0),(x0,y1,z0),
                   (x0,y0,z1),(x1,y0,z1),(x1,y1,z1),(x0,y1,z1)], [],
                  [(0,3,2,1),(4,5,6,7),(0,1,5,4),
                   (1,2,6,5),(2,3,7,6),(3,0,4,7)])
    me.update()
    cutter = bpy.data.objects.new(me.name, me)
    try:
        with BooleanWorkspace([cutter]) as work:
            work.difference(knee, [cutter], 'Stop knee wall at sloping roof junction')
    finally:
        bpy.data.objects.remove(cutter, do_unlink=True)
        if not me.users:bpy.data.meshes.remove(me)
    assert knee.data.polygons
    assert max((knee.matrix_world @ v.co).x for v in knee.data.vertices) <= KNEE_END_X + 1e-5
    cap_index = 2 if len(knee.material_slots) == 4 else 0
    cap_faces = []
    for face in knee.data.polygons:
        if all(abs((knee.matrix_world @ knee.data.vertices[i].co).x-KNEE_END_X) < 1e-5
               for i in face.vertices):
            face.material_index = cap_index
            cap_faces.append(face.index)
    assert cap_faces, 'Knee wall must have a finished cut end'
    knee['landing_oak_knee_revision'] = REVISION
    changed.append(knee)
    # Preserve the existing retained eaves collision, if authored at this stage.
    values = [nav.setdefault('segments', [])]
    if ns.get('new_segments') is not None and ns['new_segments'] is not values[0]:
        values.append(ns['new_segments'])
    for items in values:
        for segment in items:
            if segment['name'] == KNEE_NAME:
                segment['a'][0] = min(segment['a'][0], KNEE_END_X)
                segment['b'][0] = min(segment['b'][0], KNEE_END_X)
    report = {'revision': REVISION, 'restoredMaterials': restored,
              'kneeWall': {'name': KNEE_NAME, 'oldEndX': before,
                           'newEndX': KNEE_END_X, 'removedLengthM': before-KNEE_END_X,
                           'finishedEndFaces': len(cap_faces)}}
    scene['landing_oak_knee_revision'] = REVISION
    scene['landing_oak_knee_report'] = json.dumps(report)
    nav['landingOakKneeWall'] = report
    return changed, report


if 'scene' in globals() and 'nav' in globals() and globals().get('VARIANT') in ('compact','planning'):
    apply_landing_oak_knee_wall(globals())
