"""Add reviewed wall meshes to local GLB previews without rebuilding Blender.

Uses the same mesh generator as the native build. Original assets are backed
up, existing GLB nodes/buffers remain untouched, and pending native rebuilds
are explicitly recorded. No publishing or canonical .blend mutation.
"""
from pathlib import Path
import hashlib
import json
import shutil
import struct
import numpy as np
from principal_gable_wall import mesh_parts, PREFIX

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'revisions/principal-gable-wall-2026-09-28'


def read_glb(path):
    data = path.read_bytes()
    magic, version, length = struct.unpack_from('<III',data)
    assert magic == 0x46546c67 and version == 2 and length == len(data)
    n, kind = struct.unpack_from('<II',data,12)
    assert kind == 0x4e4f534a
    doc = json.loads(data[20:20+n])
    size, kind = struct.unpack_from('<II',data,20+n)
    assert kind == 0x004e4942
    binary = bytearray(data[28+n:28+n+size])
    assert len(doc['buffers']) == 1
    return doc, binary


def write_glb(path, doc, binary):
    doc['buffers'][0]['byteLength'] = len(binary)
    j = json.dumps(doc,separators=(',',':')).encode()
    j += b' ' * (-len(j)%4)
    binary += b'\0' * (-len(binary)%4)
    data = (struct.pack('<III',0x46546c67,2,28+len(j)+len(binary)) +
            struct.pack('<II',len(j),0x4e4f534a)+j +
            struct.pack('<II',len(binary),0x004e4942)+binary)
    path.write_bytes(data)


def append_parts(doc, binary, parts, material):
    def accessor(data):
        data = np.asarray(data,dtype='<f4')
        binary.extend(b'\0' * (-len(binary)%4))
        start = len(binary); binary.extend(data.tobytes())
        view = len(doc['bufferViews'])
        doc['bufferViews'].append(dict(buffer=0,byteOffset=start,byteLength=data.nbytes,target=34962))
        index = len(doc['accessors'])
        doc['accessors'].append(dict(bufferView=view,componentType=5126,count=len(data),type='VEC3',min=data.min(0).tolist(),max=data.max(0).tolist()))
        return index
    for part in parts:
        vertices = np.asarray(part['vertices'])
        vertices = vertices[:,[0,2,1]] * [1,1,-1] # Blender Z-up -> glTF Y-up
        points=[]; normals=[]
        for face in part['faces']:
            for i in range(1,len(face)-1):
                tri=vertices[[face[0],face[i],face[i+1]]]
                normal=np.cross(tri[1]-tri[0],tri[2]-tri[0]); normal/=np.linalg.norm(normal)
                points.extend(tri);normals.extend([normal]*3)
        position, normal = accessor(points), accessor(normals)
        mesh_index=len(doc['meshes'])
        doc['meshes'].append(dict(name=part['name'],primitives=[dict(attributes=dict(POSITION=position,NORMAL=normal),material=material,mode=4)]))
        node_index=len(doc['nodes'])
        doc['nodes'].append(dict(name=part['name'],mesh=mesh_index,extras={'source_name':part['name'],'native_rebuild_pending':True}))
        doc['scenes'][doc.get('scene',0)]['nodes'].append(node_index)


def main():
    OUT.mkdir(exist_ok=True)
    config=json.loads((ROOT/'proposal/interiors/principal/gable-wall.json').read_text())
    reports=[]
    for variant in config['enabled_variants']:
        public=ROOT/'walkthrough/public'
        glb=public/f'proposal-{variant}.glb'
        navpath=public/f'proposal-{variant}-navigation.json'
        backup=OUT/(variant+'-before');backup.mkdir(exist_ok=True)
        for path in (glb,navpath):
            target=backup/path.name
            if not target.exists():shutil.copy2(path,target)
        # Re-running is safe only on this revision's output or its unchanged base.
        previous=OUT/(variant+'-preview-report.json')
        if previous.exists():
            old=json.loads(previous.read_text())
            for path in (glb,navpath):
                digest=hashlib.sha256(path.read_bytes()).hexdigest()
                assert digest in (old['output_sha256'][path.name],old['input_sha256'][path.name]), 'Preview changed externally; do not overwrite it'
        spec=json.loads((ROOT/'proposal/design-spec.json').read_text())
        spec.update(json.loads((ROOT/'proposal/design-spec-compact.json').read_text()))
        if variant=='planning':spec.update(json.loads((ROOT/'proposal/design-spec-planning.json').read_text()))
        result,parts=mesh_parts(spec,config)
        doc,binary=read_glb(backup/glb.name)
        assert not any(n.get('name','').startswith(PREFIX) for n in doc['nodes'])
        original_nodes=len(doc['nodes']);original_meshes=len(doc['meshes'])
        material=next(i for i,m in enumerate(doc['materials']) if m.get('name')==config['finish_material'])
        append_parts(doc,binary,parts,material)
        candidate=OUT/glb.name
        write_glb(candidate,doc,binary)
        # Re-read serialization before exposing anything to the viewer.
        check,buf=read_glb(candidate)
        assert len(check['nodes'])==original_nodes+len(parts)
        assert len(check['meshes'])==original_meshes+len(parts)
        base,basebuf=read_glb(backup/glb.name)
        assert check['nodes'][:original_nodes]==base['nodes']
        assert check['meshes'][:original_meshes]==base['meshes']
        assert buf[:len(basebuf)]==basebuf
        nav=json.loads((backup/navpath.name).read_text())
        nav['obstacles'].extend(p['obstacle'] for p in parts)
        result.update(native_rebuild_pending=True,structural_status=config['structural_status'],low_opening_notice='1.7 m opening: ducking required; not a normal standing doorway')
        nav['principalGableWall']=result
        navcandidate=OUT/navpath.name
        navcandidate.write_text(json.dumps(nav,indent=2)+'\n')
        for source,target in ((candidate,glb),(navcandidate,navpath)):
            shutil.copy2(source,target)
            dist=ROOT/'walkthrough/dist'/target.name
            if dist.parent.exists():shutil.copy2(source,dist)
        report=dict(variant=variant,wall=result,added_objects=[p['name'] for p in parts],
                    preserved_nodes=original_nodes,preserved_meshes=original_meshes,
                    native_rebuild_pending=True,garage_and_roof_unchanged=True,
                    input_sha256={p.name:hashlib.sha256((backup/p.name).read_bytes()).hexdigest() for p in (glb,navpath)},
                    output_sha256={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in (glb,navpath)})
        previous.write_text(json.dumps(report,indent=2)+'\n');reports.append(report)
        print(variant, len(parts),'wall pieces; original meshes and binary preserved',flush=True)
    return reports


if __name__=='__main__':main()
