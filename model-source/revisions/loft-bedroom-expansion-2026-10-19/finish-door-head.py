import bpy,sys,json,hashlib,shutil,importlib.util
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name,source_hashes
loader=importlib.util.spec_from_file_location('patch_glb',ROOT/'revisions/modern-loft-stair-2026-10-19/replace-glb-mesh.py');patcher=importlib.util.module_from_spec(loader);loader.loader.exec_module(patcher)
variant=sys.argv[sys.argv.index('--')+1];REV='loft-bedroom-expansion-2026-10-19';out=ROOT/f'outputs/output-proposed-{variant}';native=out/(native_name(variant)+'.blend');E=ROOT/'walkthrough/test-results'/REV
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
prehead=ROOT/'revisions'/REV/'pre-head'/f'outputs/output-proposed-{variant}'
bpy.ops.wm.open_mainfile(filepath=str(prehead/native.name));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
changed=[]
for ob in scene.objects:
 part=ob.get('level_loft_part')
 if not ob.name.startswith('Proposal | Loft bedroom expansion |') or part not in ('Suite oak head lining','Suite head architrave'):continue
 world=ob.matrix_world.copy();inv=world.inverted();count=0
 for vertex in ob.data.vertices:
  p=world@vertex.co
  if abs(p.z-7.6)<1e-5:p.z=7.599 if part=='Suite oak head lining' else 7.596;vertex.co=inv@p;count+=1
 assert count>0
 ob.data.update();changed.append(ob)
assert len(changed)==3
bpy.context.view_layer.update();g=json.loads((out/'geometry.json').read_text());deps=bpy.context.evaluated_depsgraph_get()
for ob in changed:
 item=next(o for o in g['objects']if o['object_name']==ob.name);ev=ob.evaluated_get(deps);mesh=ev.to_mesh();item['vertices']=[list(ob.matrix_world@v.co)for v in mesh.vertices];item['faces']=[list(f.vertices)for f in mesh.polygons];ev.to_mesh_clear()
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native))
glb=out/(native_name(variant)+'.glb');shutil.copyfile(prehead/glb.name,glb);patches=[]
for ob in changed:
 for member in scene.objects:member.select_set(False)
 ob.select_set(True)
 parent=ob.parent
 while parent:parent.select_set(True);parent=parent.parent
 bpy.context.view_layer.objects.active=ob;patch=E/f'door-head-{variant}-{len(patches)}.glb'
 bpy.ops.export_scene.gltf(filepath=str(patch),export_format='GLB',export_materials='NONE',use_selection=True,use_active_scene=True,export_apply=True,export_extras=True,export_cameras=False,export_lights=False)
 patches.append(patcher.replace_mesh(glb,patch,ob.name))
nav=json.loads((out/'navigation.json').read_text());stamp=datetime.now(timezone.utc).isoformat();nav['modelUpdatedAt']=stamp;nav['loftBedroomDoorHeadFinish']={'objects':[o.name for o in changed],'liningUndersideZ':7.599,'architraveUndersideZ':7.596,'ceilingZ':7.60}
(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')));(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')))
shutil.copyfile(glb,ROOT/f'walkthrough/public/proposal-{variant}.glb');shutil.copyfile(out/'navigation.json',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json')
record={'revision':REV,'variant':variant,'updatedAt':stamp,'reason':'Screenshot-led removal of coplanar oak/plaster undersides at the ceiling-height doorway','sourceInputs':source_hashes(ROOT,variant),'patches':patches,'files':{n:sha(out/n)for n in [native.name,glb.name,'geometry.json','navigation.json']}}
(out/'loft-bedroom-door-head-refresh.json').write_text(json.dumps(record,indent=2)+'\n');print('DOOR_HEAD_FINISHED',variant,flush=True)
