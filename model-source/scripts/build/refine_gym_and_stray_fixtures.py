"""Apply the owner's targeted layout correction to current generated assets.

Run through Blender with -- compact|planning. Original files are retained in
the dated revision, and this report explicitly records a partial refresh.
The gym specification and source modules reproduce the edits on a full build.
"""
import hashlib
import json
from pathlib import Path
import shutil
import struct
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from scripts.build.build_support import native_name

REVISION = ROOT / 'revisions/gym-fixture-refinement-2026-10-15'
OBSOLETE = ('Proposal | Double height pendant', 'Proposal | Garage wing uplight')


def backup(path):
    target = REVISION / 'original' / path.relative_to(ROOT)
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        shutil.copy2(path, target)


def offset(name):
    for prefix, delta in (('Gym 01 | treadmill 1 ', (.14, .63, 0)),
                          ('Gym 01 | treadmill 2 ', (.14, .68, 0))):
        if name.startswith(prefix):
            return delta


def patch_glb(path):
    backup(path)
    raw = path.read_bytes()
    length = struct.unpack_from('<I', raw, 12)[0]
    gltf = json.loads(raw[20:20+length])
    removed, moved = set(), []
    for index, node in enumerate(gltf['nodes']):
        name = node.get('name', '')
        if name.startswith(OBSOLETE):
            removed.add(index)
        delta = offset(name)
        if delta:
            assert 'matrix' not in node and not node.get('children'), name
            dx, dy, dz = delta
            node['translation'] = [a+b for a, b in zip(node.get('translation', [0, 0, 0]), [dx, dz, -dy])]
            moved.append(name)
    # Detach obsolete nodes, preserving all remaining indices and binary data.
    for scene in gltf['scenes']:
        scene['nodes'] = [i for i in scene.get('nodes', []) if i not in removed]
    for node in gltf['nodes']:
        if 'children' in node:
            node['children'] = [i for i in node['children'] if i not in removed]
    encoded = json.dumps(gltf, separators=(',', ':')).encode()
    encoded += b' ' * (-len(encoded) % 4)
    binary = raw[20+length:]
    path.write_bytes(struct.pack('<III', 0x46546c67, 2, 20+len(encoded)+len(binary))
                     + struct.pack('<II', len(encoded), 0x4e4f534a) + encoded + binary)
    assert binary == path.read_bytes()[20+len(encoded):]
    return {'asset': str(path.relative_to(ROOT)), 'moved': len(moved), 'detached': len(removed), 'binaryUnchanged': True}


def main():
    import bpy
    from mathutils import Matrix, Vector
    variant = sys.argv[sys.argv.index('--')+1]
    assert variant in ('compact', 'planning')
    out = ROOT / f'outputs/output-proposed-{variant}'
    reportpath = out / 'gym-fixture-refinement.json'
    if reportpath.exists():
        raise RuntimeError('Already applied; use the dated original files for a deliberate rerun')
    cfg = json.loads((ROOT/'proposal/interiors/leisure/gym.json').read_text())
    native = out / (native_name(variant)+'.blend')
    backup(native)
    # Keep Blender's previous recovery copy, too; saving must not replace it.
    recovery = native.with_suffix('.blend1')
    if recovery.exists():
        backup(recovery)
    bpy.ops.wm.open_mainfile(filepath=str(native))
    scene = bpy.data.scenes['08 Proposed extensions']
    bpy.context.window.scene = scene
    bpy.context.view_layer.update()
    moved, removed = [], []
    for ob in list(scene.objects):
        if ob.name.startswith(OBSOLETE):
            removed.append({'name': ob.name, 'type': ob.type})
            bpy.data.objects.remove(ob, do_unlink=True)
        elif (delta := offset(ob.name)):
            ob.matrix_world = Matrix.Translation(Vector(delta)) @ ob.matrix_world
            moved.append(ob.name)
    assert len(moved) > 40 and len(removed) >= 12, (len(moved), len(removed))
    bpy.context.view_layer.update()
    # Measure the full assemblies, not just their decorative deck surfaces.
    measured = []
    for number, tread in enumerate(cfg['treadmills'], 1):
        points = [ob.matrix_world @ Vector(p) for ob in scene.objects
                  if ob.name.startswith(f'Gym 01 | treadmill {number} ') for p in ob.bound_box]
        bounds = [min(p[i] for p in points) for i in range(3)] + [max(p[i] for p in points) for i in range(3)]
        assert abs(bounds[0]-tread['footprint'][0]) < .003, bounds
        assert bounds[1] > -6.405-.005 and bounds[4] < -4.605+.005, bounds
        measured.append(bounds)
    bpy.context.preferences.filepaths.save_version = 0
    bpy.ops.wm.save_as_mainfile(filepath=str(native))
    assets = []
    for path in [out/(native_name(variant)+'.glb'), ROOT/f'walkthrough/public/proposal-{variant}.glb',
                 *[ROOT/f'walkthrough/public/interiors/leisure/models/{variant}-{room}.glb'
                   for room in ('gym', 'arrival', 'landings')]]:
        assets.append(patch_glb(path))
    geometry = out/'geometry.json'
    backup(geometry)
    g = json.loads(geometry.read_text())
    g['objects'] = [o for o in g['objects'] if not o.get('object_name', o['name']).startswith(OBSOLETE)]
    for ob in g['objects']:
        if delta := offset(ob.get('object_name', ob['name'])):
            ob['vertices'] = [[v[i]+delta[i] for i in range(3)] for v in ob['vertices']]
    geometry.write_text(json.dumps(g, separators=(',', ':')))
    from datetime import datetime, timezone
    updated = datetime.now(timezone.utc).isoformat()
    for path in [out/'navigation.json', ROOT/f'walkthrough/public/proposal-{variant}-navigation.json']:
        backup(path)
        nav = json.loads(path.read_text())
        for ob in nav['obstacles']:
            if delta := offset(ob['name']):
                dx, dy, _ = delta
                ob['box'] = [round(v+d, 6) for v, d in zip(ob['box'], [dx, dy, dx, dy])]
        nav['proposalLights'] = [o for o in nav.get('proposalLights', []) if not o['name'].startswith(OBSOLETE)]
        nav['interiorRooms']['gym']['revision'] = cfg['revision']
        nav['modelUpdatedAt'] = updated
        path.write_text(json.dumps(nav, separators=(',', ':')))
    for path in [out/'gym-interior-report.json', ROOT/f'walkthrough/public/interiors/leisure/models/{variant}-gym.json']:
        backup(path)
        data = json.loads(path.read_text())
        data['configuration'] = cfg
        data['layoutRevision' if 'layoutRevision' in data else 'revision'] = cfg['revision']
        data['targetedRefresh'] = 'gym-fixture-refinement-2026-10-15'
        path.write_text(json.dumps(data, indent=2)+'\n')
    report = {'variant': variant, 'kind': 'targeted refresh; full build provenance unchanged',
              'movedNativeObjects': moved, 'removedObsoleteFixtures': removed, 'assets': assets,
              'measuredTreadmillBounds': measured, 'hallApertureClearance': .707,
              'rearRunOffMetres': 2, 'nativeSHA256': hashlib.file_digest(native.open('rb'), 'sha256').hexdigest()}
    reportpath.write_text(json.dumps(report, indent=2)+'\n')
    print('REFRESHED', variant, len(moved), 'moved;', len(removed), 'obsolete fixture parts removed', flush=True)


if __name__ == '__main__':
    main()
