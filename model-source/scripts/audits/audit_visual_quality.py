"""Check visual overlays against the accepted browser assets and native inputs."""
import hashlib
import argparse
import itertools
import json
from pathlib import Path
import struct
import numpy as np

ROOT = Path(__file__).resolve().parents[2]


def digest(path):
    with path.open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def mesh_bounds(path, surface_names=()):
    surface_names = set(surface_names)
    with path.open('rb') as stream:
        stream.seek(12)
        length, _ = struct.unpack('<II', stream.read(8))
        data = json.loads(stream.read(length))
        binary = None
        if surface_names:
            size, kind = struct.unpack('<II', stream.read(8))
            assert kind == 0x004E4942, 'Expected GLB binary chunk'
            binary = stream.read(size)
    result = {}

    def accessor(index):
        a = data['accessors'][index]
        view = data['bufferViews'][a['bufferView']]
        dtype = np.dtype({5126:'<f4',5125:'<u4',5123:'<u2',5121:'u1'}[a['componentType']])
        width = {'VEC3':3,'SCALAR':1}[a['type']]
        return np.ndarray((a['count'],width),dtype=dtype,buffer=binary,
                          offset=view.get('byteOffset',0)+a.get('byteOffset',0),
                          strides=(view.get('byteStride',width*dtype.itemsize),dtype.itemsize))

    def visit(index, parent):
        node = data['nodes'][index]
        if 'matrix' in node:
            matrix = np.array(node['matrix']).reshape(4, 4, order='F')
        else:
            x, y, z, w = node.get('rotation', [0, 0, 0, 1])
            matrix = np.eye(4)
            matrix[:3, :3] = np.array([
                [1-2*y*y-2*z*z, 2*x*y-2*z*w, 2*x*z+2*y*w],
                [2*x*y+2*z*w, 1-2*x*x-2*z*z, 2*y*z-2*x*w],
                [2*x*z-2*y*w, 2*y*z+2*x*w, 1-2*x*x-2*y*y]]) @ np.diag(node.get('scale', [1, 1, 1]))
            matrix[:3, 3] = node.get('translation', [0, 0, 0])
        world = parent @ matrix
        if 'mesh' in node:
            points = []
            name = node.get('extras', {}).get('name', node['name'])
            for primitive in data['meshes'][node['mesh']]['primitives']:
                if name in surface_names:
                    # Open-surface cuts can leave zero-area triangles whose
                    # vertices extend into the removed opening. Floorboards
                    # correctly omit them; compare actual surface bounds.
                    assert primitive.get('mode',4) == 4
                    vertices = accessor(primitive['attributes']['POSITION'])
                    indices = (accessor(primitive['indices']).reshape(-1,3)
                               if 'indices' in primitive else np.arange(len(vertices)).reshape(-1,3))
                    vertices = (np.column_stack((vertices,np.ones(len(vertices)))) @ world.T)[:,:3]
                    triangles = vertices[indices]
                    area = np.linalg.norm(np.cross(triangles[:,1]-triangles[:,0],
                                                   triangles[:,2]-triangles[:,0]),axis=1)/2
                    points.extend(triangles[area>1e-10].reshape(-1,3))
                    continue
                a = data['accessors'][primitive['attributes']['POSITION']]
                corners = np.array([list(p)+[1] for p in itertools.product(*zip(a['min'], a['max']))])
                points.extend((corners @ world.T)[:, :3])
            points = np.array(points)
            assert len(points), 'No measurable surface: '+name
            result[name] = np.array([points.min(axis=0), points.max(axis=0)])
        for child in node.get('children', []):
            visit(child, world)
    for node in data['scenes'][data.get('scene', 0)]['nodes']:
        visit(node, np.eye(4))
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, default=ROOT/'logs/visual-quality-audit.json')
    args = parser.parse_args()
    report = []
    for variant in ['compact', 'planning']:
        public = ROOT/'walkthrough/public'
        quality = public/'visual-quality'
        furnishings = json.loads((quality/f'{variant}-furnishings.json').read_text())
        bake = json.loads((quality/f'{variant}-daylight.json').read_text())
        assert digest(ROOT/furnishings['source']) == furnishings['sourceSHA256'], 'Native input changed'
        assert digest(public/f'proposal-{variant}.glb') == bake['modelSHA256'], 'Base geometry mismatch'
        assert digest(public/f'proposal-{variant}-navigation.json') == bake['navigationSHA256'], 'Navigation mismatch'
        assert digest(quality/f'{variant}-furnishings.glb') == bake['furnishingsSHA256'], 'Detail geometry and bake mismatch'
        derivative = ROOT/f'outputs/output-visual-realism-{variant}'/(Path(furnishings['source']).stem+' — visual refinement.blend')
        assert digest(derivative) == bake['sourceSHA256'], 'Visual native derivative and bake mismatch'
        floors = furnishings.get('finishDetails',{}).get('floorObjects',[])
        original = mesh_bounds(public/f'proposal-{variant}.glb', floors)
        overlay = mesh_bounds(quality/f'{variant}-furnishings.glb', floors)
        additions = set().union(*(set(furnishings.get(k, {}).get('addedObjects', []))
                                  for k in ('constructionDetails','finishDetails','fixtureDetails','frameDetails','barDetails')))
        assert overlay and all(name in original or name in additions for name in overlay), 'Overlay adds an undeclared object'
        assert additions <= overlay.keys(), 'Declared construction detail missing from export'
        removals = set(furnishings.get('barDetails', {}).get('removedObjects', []))
        integrated=furnishings.get('barDetails',{}).get('sourceIntegrated',False)
        if not integrated:assert removals <= original.keys(), 'Retired bar object is absent from the original model'
        assert not removals.intersection(overlay), 'Retired bar object remains in the visual overlay'
        for move in furnishings.get('barDetails',{}).get('relocatedObjects',[]):
            if integrated:
                assert move['original'] not in original and move['replacement'] in original, 'Accepted relocation missing from base model'
                assert np.max(np.abs(overlay[move['replacement']]-original[move['replacement']]))<.003
                continue
            dx,dy,dz=move['translation']
            expected=original[move['original']]+np.array([dx,dz,-dy])
            assert np.max(np.abs(overlay[move['replacement']]-expected))<.003, 'Relocation differs from declared position: '+move['original']
        changes = {name: float(np.max(np.abs(bounds-original[name]))) for name, bounds in overlay.items() if name in original}
        assert max(changes.values()) < .12, sorted(changes.items(), key=lambda item: -item[1])[:5]
        values = np.array(bake['coefficients'])
        assert np.isfinite(values).all() and bake['probes'] > 1000
        report.append({'variant': variant, 'nativeUnchanged': True, 'navigationMatched': True,
                       'baseModelMatched': True, 'matchedOverlayObjects': len(changes), 'addedConstructionDetails': len(additions),
                       'retiredBarObjects': len(removals),
                       'maximumBoundsChangeMetres': round(max(changes.values()), 5),
                       'probes': bake['probes'], 'samples': bake['samples']})
    destination = args.output
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(report, indent=2)+'\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
