"""Stage the reviewed sw02 changes without overwriting active models.

Run with Blender --background --python this_file -- --source ... --output ...
"""
import argparse
import hashlib
import json
import sys
from datetime import datetime,timezone
from pathlib import Path
import bpy
import numpy as np
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_sw02 import apply_sw02


def main():
    p=argparse.ArgumentParser();p.add_argument('--source',type=Path,required=True);p.add_argument('--output',type=Path,required=True)
    a=p.parse_args(sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else [])
    source=a.source.resolve();out=a.output.resolve();out.mkdir(parents=True,exist_ok=True)
    if source==out:raise ValueError('Staged output must differ from source')
    files=[native_name('compact')+'.blend',native_name('compact')+'.glb','geometry.json','navigation.json']
    sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
    hashes={f:sha(source/f)for f in files};inputs=source_hashes(ROOT,'compact')
    bpy.ops.wm.open_mainfile(filepath=str(source/files[0]))
    scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
    def preserved_scenes():
        cache={};result={}
        for other in bpy.data.scenes:
            if other==scene or 'Proposal ·' in other.name:continue
            digest=hashlib.sha256()
            for ob in sorted(other.objects,key=lambda o:o.name):
                if ob.as_pointer() not in cache:
                    d=hashlib.sha256();d.update(ob.name.encode());d.update(str(tuple(tuple(r)for r in ob.matrix_world)).encode())
                    if ob.type=='MESH':
                        a=np.empty(len(ob.data.vertices)*3,dtype=np.float32);ob.data.vertices.foreach_get('co',a);d.update(a.tobytes())
                        d.update(str([m.name for m in ob.data.materials]).encode())
                    cache[ob.as_pointer()]=d.digest()
                digest.update(cache[ob.as_pointer()])
            result[other.name]=digest.hexdigest()
        return result
    before=preserved_scenes()
    nav=json.loads((source/'navigation.json').read_text());g=json.loads((source/'geometry.json').read_text())
    ns={'ROOT':ROOT,'OUT':out,'scene':scene,'nav':nav,'VARIANT':'compact','materials':{},'PALETTE':dict(g['materials']),'new_obstacles':nav['obstacles']}
    objects,report=apply_sw02(ns);repeat,again=apply_sw02(ns);assert repeat==[] and again==report
    for title,zmin,zmax in [('12 Proposal · Basements',-3,-.24),('09 Proposal · Ground floor',-.20,2.515),('10 Proposal · First floor',2.605,5.245),('11 Proposal · Loft',5.405,7.70)]:
        view=bpy.data.scenes.get(title)
        if not view:continue
        group=next(iter(view.collection.children))
        for ob in list(group.objects):
            if ob.type=='MESH'and ob.name not in scene.objects:group.objects.unlink(ob)
        for ob in objects:
            if ob.type!='MESH'or ob.name in view.objects:continue
            zs=[(ob.matrix_world@Vector(v)).z for v in ob.bound_box]
            if min(zs)<zmax and max(zs)>zmin:group.objects.link(ob)
    bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
    previous={o['object_name']:o for o in g['objects']};changed={o.name for o in objects};entries=[]
    for ob in scene.objects:
        if ob.type!='MESH':continue
        if ob.name in previous and ob.name not in changed:entries.append(previous[ob.name]);continue
        ev=ob.evaluated_get(deps);me=ev.to_mesh()
        entry=dict(previous.get(ob.name,{}));entry.update({'name':ob.get('source_name',ob.name),'object_name':ob.name,
            'layer':next((c.name for c in ob.users_collection if c.name.startswith('P')),ob.users_collection[0].name),
            'assembly':ob.get('assembly'),'structural_floor_datum':bool(ob.get('structural_floor_datum')),
            'structural_framing_reference':json.loads(ob.get('structural_framing_reference_json','null')),
            'structural_finish_detail':bool(ob.get('structural_finish_detail')),
            'walkthrough_opening_leaf':bool(ob.get('walkthrough_opening_leaf')),'walkthrough_keep_visible':bool(ob.get('walkthrough_keep_visible')),
            'vertices':[list(ob.matrix_world@v.co)for v in me.vertices],'faces':[list(f.vertices)for f in me.polygons],
            'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],
            'face_materials':[f.material_index for f in me.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
        entries.append(entry);ev.to_mesh_clear()
        for material in ob.data.materials:g['materials'][material.get('appearance_source_material',material.name)]=list(material.diffuse_color)
    g['rooms']=nav.get('planRooms',g.get('rooms',[]));g['objects']=entries;g['proposal']['sw02Integration']=report;nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
    (out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
    assert preserved_scenes()==before,'Preserved scenes changed'
    report['preservedScenes']=before
    (out/'sw02-report.json').write_text(json.dumps(report,indent=2)+'\n')
    (out/'sw02-source.json').write_text(json.dumps({'source':str(source),'files':hashes,'buildInputs':inputs},indent=2)+'\n')
    assert all(sha(source/f)==h for f,h in hashes.items()),'Source model changed during preparation'
    assert source_hashes(ROOT,'compact')==inputs,'Build inputs changed during preparation'
    bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/files[0]))
    print('SW02_NATIVE_PREPARED',len(changed),flush=True)
    from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf
    export_quiet_oak_gltf(filepath=str(out/files[1]),export_format='GLB',use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
    assert all(sha(source/f)==h for f,h in hashes.items()),'Source model changed during export'
    assert source_hashes(ROOT,'compact')==inputs,'Build inputs changed during export'
    print('SW02_NATIVE_EXPORTED',flush=True)


if __name__=='__main__':main()
