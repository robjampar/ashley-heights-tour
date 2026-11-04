"""Compare retained native scenes with their pre-integration recovery copies."""
import hashlib,json,sys,os
from pathlib import Path
import bpy,numpy as np
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name

def signatures(path, excluded):
    bpy.ops.wm.open_mainfile(filepath=str(path))
    cache={};result={}
    for scene in bpy.data.scenes:
        if 'Proposal ·' in scene.name:continue
        bpy.context.window.scene=scene
        # Inactive originals lose their evaluated matrix cache after the
        # proposal detaches them. Evaluate their stored transforms explicitly.
        for ob in scene.objects:ob.update_tag(refresh={'OBJECT'})
        scene.view_layers[0].update()
        digest=hashlib.sha256()
        for ob in sorted(scene.objects,key=lambda o:o.name):
            if scene.name=='08 Proposed extensions'and ob.name in excluded:continue
            if ob.as_pointer() not in cache:
                d=hashlib.sha256();d.update(ob.name.encode());d.update(str(tuple(tuple(r)for r in ob.matrix_world)).encode())
                if ob.type=='MESH':
                    a=np.empty(len(ob.data.vertices)*3,dtype=np.float32);ob.data.vertices.foreach_get('co',a);d.update(a.tobytes())
                    d.update(str([m.name for m in ob.data.materials]).encode())
                cache[ob.as_pointer()]=d.digest()
            digest.update(cache[ob.as_pointer()])
        result[scene.name]={'sha256':digest.hexdigest(),'objects':sum(scene.name!='08 Proposed extensions'or ob.name not in excluded for ob in scene.objects)}
    return result

reports=[]
variants=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
for variant in variants or ['compact','planning']:
    rel=Path(f'outputs/output-proposed-{variant}')/(native_name(variant)+'.blend')
    revision=json.loads((ROOT/f'outputs/output-symmetric-wing-roof-{variant}/navigation.json').read_text())['symmetricWingRoof']
    excluded=set(revision['changed']+revision['removed']+revision['created'])
    before=signatures(ROOT/'revisions'/os.environ.get('LOFT_AUDIT_REVISION','symmetric-wing-roof-2026-10-25')/'original'/rel,excluded)
    after=signatures(ROOT/f'outputs/output-symmetric-wing-roof-{variant}'/(native_name(variant)+'.blend'),excluded)
    reports.append({'variant':variant,'before':before,'after':after,'equal':before==after,'sourceSHA256':hashlib.file_digest((ROOT/'revisions'/'symmetric-wing-roof-2026-10-25'/'original'/rel).open('rb'),'sha256').hexdigest(),'candidateSHA256':hashlib.file_digest((ROOT/f'outputs/output-symmetric-wing-roof-{variant}'/(native_name(variant)+'.blend')).open('rb'),'sha256').hexdigest()})
    print('ORIGINAL_SCENES',variant,before==after,flush=True)
out=ROOT/'walkthrough/test-results'/os.environ.get('LOFT_AUDIT_REVISION','symmetric-wing-roof-2026-10-25')/('native-preservation-'+('-'.join(variants)or'both')+'.json');out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(reports,indent=2)+'\n')
assert all(r['equal'] for r in reports),'A retained original scene changed'
