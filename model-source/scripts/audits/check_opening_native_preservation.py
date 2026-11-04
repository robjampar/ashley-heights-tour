"""Compare original scenes and unrelated native geometry after opening edits."""
import argparse
import hashlib
import json
import sys
from pathlib import Path
import bpy
import numpy as np

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name


def signatures(path,excluded):
    bpy.ops.wm.open_mainfile(filepath=str(path));result={}
    for scene in bpy.data.scenes:
        if 'Proposal ·'in scene.name:continue
        bpy.context.window.scene=scene
        for ob in scene.objects:ob.update_tag(refresh={'OBJECT'})
        scene.view_layers[0].update();digest=hashlib.sha256();count=0
        for ob in sorted(scene.objects,key=lambda x:x.name):
            if scene.name=='08 Proposed extensions' and ob.name in excluded:continue
            count+=1;digest.update(ob.name.encode());digest.update(str(tuple(tuple(r)for r in ob.matrix_world)).encode())
            if ob.type=='MESH':
                values=np.empty(len(ob.data.vertices)*3,dtype=np.float32);ob.data.vertices.foreach_get('co',values);digest.update(values.tobytes())
                digest.update(str([list(f.vertices) for f in ob.data.polygons]).encode())
                digest.update(str([m.name for m in ob.data.materials]).encode())
                for uv in ob.data.uv_layers:
                    values=np.empty(len(uv.data)*2,dtype=np.float32);uv.data.foreach_get('uv',values);digest.update(values.tobytes())
            digest.update(str([(m.name,m.type)for m in ob.modifiers]).encode())
        result[scene.name]={'sha256':digest.hexdigest(),'objects':count}
    return result


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',type=Path,required=True);p.add_argument('--out',type=Path,required=True)
    a=p.parse_args(sys.argv[sys.argv.index('--')+1:] if '--'in sys.argv else [])
    provenance=json.loads((a.stage/'opening-fit-source.json').read_text());source=Path(provenance['source']);name=native_name('compact')+'.blend'
    report=json.loads((a.stage/'opening-fit-report.json').read_text());excluded=set(report['changed']+report['created']+report['removed'])
    before=signatures(source/name,excluded);after=signatures(a.stage/name,excluded)
    sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
    r={'equal':before==after,'before':before,'after':after,'sourceSHA256':sha(source/name),'candidateSHA256':sha(a.stage/name)}
    a.out.parent.mkdir(parents=True,exist_ok=True);a.out.write_text(json.dumps(r,indent=2)+'\n');print('OPENING_NATIVE_PRESERVED',r['equal'],flush=True)
    assert r['equal'],'An unrelated native scene/object changed'
