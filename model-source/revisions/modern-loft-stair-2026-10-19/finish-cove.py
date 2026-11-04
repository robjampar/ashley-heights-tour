"""Add the screenshot-led molding repair without altering completed build history."""
import bpy,sys,json,hashlib,subprocess,copy,struct,importlib.util
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.model.modern_loft_stair import repair_landing_cove
loader=importlib.util.spec_from_file_location('glb_patch',Path(__file__).with_name('replace-glb-mesh.py'));gp=importlib.util.module_from_spec(loader);loader.loader.exec_module(gp)
REV='modern-loft-stair-2026-10-19';variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'outputs/output-proposed-{variant}';native=out/(native_name(variant)+'.blend');glb=out/(native_name(variant)+'.glb')
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
name='Proposal | Level loft | Landing cupboard continuous cove';assert name not in scene.objects
b=RoomBuilder({'scene':scene,'ROOT':ROOT},'level loft','Proposal | Level loft | ','P31 Level loft and return stair')
ob=repair_landing_cove(b)[0];bpy.context.view_layer.update()
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native))
for member in scene.objects:member.select_set(False)
ob.select_set(True);bpy.context.view_layer.objects.active=ob
patch=ROOT/'walkthrough/test-results'/REV/f'cove-native-{variant}.glb'
bpy.ops.export_scene.gltf(filepath=str(patch),export_format='GLB',use_active_scene=True,use_selection=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
base,data=gp.read_glb(glb);part,pdata=gp.read_glb(patch)
assert len(part['nodes'])==len(part['meshes'])==1 and not part.get('images')
assert not any(n.get('name')==name for n in base['nodes'])
vshift,ashift=len(base['bufferViews']),len(base['accessors']);offset=len(data)
for view in part['bufferViews']:
 view=copy.deepcopy(view);view['byteOffset']=view.get('byteOffset',0)+offset;base['bufferViews'].append(view)
for ac in part['accessors']:
 ac=copy.deepcopy(ac);assert not ac.get('sparse');ac['bufferView']+=vshift;base['accessors'].append(ac)
mesh=copy.deepcopy(part['meshes'][0])
for prim in mesh['primitives']:
 prim['attributes']={k:v+ashift for k,v in prim['attributes'].items()}
 if 'indices' in prim:prim['indices']+=ashift
 material=part['materials'][prim['material']];matches=[i for i,m in enumerate(base['materials']) if m['name']==material['name']];assert len(matches)==1
 prim['material']=matches[0]
node=copy.deepcopy(part['nodes'][0]);node['mesh']=len(base['meshes']);base['meshes'].append(mesh)
base['scenes'][base.get('scene',0)]['nodes'].append(len(base['nodes']));base['nodes'].append(node)
newdata=data+pdata;base['buffers'][0]['byteLength']=len(newdata);encoded=json.dumps(base,separators=(',',':'),ensure_ascii=False).encode();encoded+=b' '*((-len(encoded))%4);newdata+=b'\0'*((-len(newdata))%4)
glb.write_bytes(struct.pack('<III',0x46546c67,2,28+len(encoded)+len(newdata))+struct.pack('<II',len(encoded),0x4e4f534a)+encoded+struct.pack('<II',len(newdata),0x004e4942)+newdata)
geometry=json.loads((out/'geometry.json').read_text());template=copy.deepcopy(next(o for o in geometry['objects'] if o['object_name']=='Circulation detail | Cove Bathroom hall -1'))
template.update(name=name,object_name=name,vertices=[list(ob.matrix_world@v.co) for v in ob.data.vertices],faces=[list(p.vertices) for p in ob.data.polygons]);geometry['objects'].append(template)
(out/'geometry.json').write_text(json.dumps(geometry,separators=(',',':')))
stamp=datetime.now(timezone.utc).isoformat();nav=json.loads((out/'navigation.json').read_text());nav['modelUpdatedAt']=stamp;nav['stairLandingCoveRepair']={'revision':REV,'object':name,'updatedAt':stamp}
for p in [out/'navigation.json',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json']:p.write_text(json.dumps(nav,separators=(',',':')))
subprocess.run(['cp','-c',str(glb),str(ROOT/f'walkthrough/public/proposal-{variant}.glb')],check=True)
record={'revision':REV,'variant':variant,'kind':'post-build one-object addition; earlier full-build and gutter reports unchanged','addedObject':name,'preservedGLBBinaryBytes':len(data),'updatedAt':stamp,'nativeSHA256':sha(native),'glbSHA256':sha(glb),'geometrySHA256':sha(out/'geometry.json'),'navigationSHA256':sha(out/'navigation.json'),'sourceSHA256':sha(ROOT/'scripts/model/modern_loft_stair.py')}
(out/'modern-stair-cove-refresh.json').write_text(json.dumps(record,indent=2)+'\n');print('LANDING_COVE_REPAIRED',variant,flush=True)
