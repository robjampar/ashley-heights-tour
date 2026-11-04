"""Compare retained native scenes with their pre-integration recovery copies."""
import hashlib,json,sys,os
from pathlib import Path
import bpy,numpy as np
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name

def signatures(path):
    bpy.ops.wm.open_mainfile(filepath=str(path))
    cache={};result={}
    for scene in bpy.data.scenes:
        if 'Proposed' in scene.name or 'Proposal ·' in scene.name:continue
        bpy.context.window.scene=scene
        # Inactive originals lose their evaluated matrix cache after the
        # proposal detaches them. Evaluate their stored transforms explicitly.
        for ob in scene.objects:ob.update_tag(refresh={'OBJECT'})
        scene.view_layers[0].update()
        digest=hashlib.sha256()
        for ob in sorted(scene.objects,key=lambda o:o.name):
            if ob.as_pointer() not in cache:
                d=hashlib.sha256();d.update(ob.name.encode());d.update(str(tuple(tuple(r)for r in ob.matrix_world)).encode())
                if ob.type=='MESH':
                    a=np.empty(len(ob.data.vertices)*3,dtype=np.float32);ob.data.vertices.foreach_get('co',a);d.update(a.tobytes())
                    d.update(str([m.name for m in ob.data.materials]).encode())
                cache[ob.as_pointer()]=d.digest()
            digest.update(cache[ob.as_pointer()])
        result[scene.name]={'sha256':digest.hexdigest(),'objects':len(scene.objects)}
    return result

reports=[]
variants=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
for variant in variants or ['compact','planning']:
    rel=Path(f'outputs/output-proposed-{variant}')/(native_name(variant)+'.blend')
    before=signatures(ROOT/'revisions'/os.environ.get('LOFT_AUDIT_REVISION','oak-stair-and-rear-return-2026-10-20')/'original'/rel)
    after=signatures(ROOT/f'outputs/output-oak-stair-return-{variant}'/(native_name(variant)+'.blend'))
    reports.append({'variant':variant,'before':before,'after':after,'equal':before==after})
    print('ORIGINAL_SCENES',variant,before==after,flush=True)
out=ROOT/'walkthrough/test-results'/os.environ.get('LOFT_AUDIT_REVISION','oak-stair-and-rear-return-2026-10-20')/'native-preservation.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(reports,indent=2)+'\n')
assert all(r['equal'] for r in reports),'A retained original scene changed'
