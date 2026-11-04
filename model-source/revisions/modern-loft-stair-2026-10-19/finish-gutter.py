"""One-object native repair after the full build; preserve its provenance."""
import bpy,sys,json,hashlib,subprocess
from pathlib import Path
from datetime import datetime,timezone
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
import importlib.util
loader=importlib.util.spec_from_file_location("replace_glb_mesh",Path(__file__).with_name("replace-glb-mesh.py"));glb_patch=importlib.util.module_from_spec(loader);loader.loader.exec_module(glb_patch)
REV='modern-loft-stair-2026-10-19';rev=ROOT/'revisions'/REV;variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'outputs/output-proposed-{variant}';native=out/(native_name(variant)+'.blend')
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest()
source=ROOT/'scripts/model/proposal_roof_weathering.py'
saved=rev/'pre-gutter/scripts/model/proposal_roof_weathering.py';saved.parent.mkdir(parents=True,exist_ok=True)
if not saved.exists():subprocess.run(['cp','-c',str(source),str(saved)],check=True)
# This runs only after both full builds have verified their unchanged inputs.
s=source.read_text();old="_rw_gutter('original front east',(9.205,_original_gy0,gz+.014)";new="_rw_gutter('original front east',(9.76 if spec.get('loftLevelStair') else 9.205,_original_gy0,gz+.014)"
if old in s:source.write_text(s.replace(old,new))
else:assert new in s
pre=rev/f'pre-gutter/outputs/output-proposed-{variant}';pre.parent.mkdir(parents=True,exist_ok=True)
if not pre.exists():subprocess.run(['cp','-cR',str(out),str(pre)],check=True)
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
ob=scene.objects['Proposal | Roof drainage | original front east'];world=ob.matrix_world.copy();inv=world.inverted()
assert not any(ob.name in other.objects for other in bpy.data.scenes if 'Proposed' not in other.name and 'Proposal ·' not in other.name)
points=[world@v.co for v in ob.data.vertices];minimum=min(p.x for p in points);assert abs(minimum-9.205)<.0001,minimum
moved=0
for v in ob.data.vertices:
 p=world@v.co
 if abs(p.x-minimum)<.0001:p.x=9.76;v.co=inv@p;moved+=1
ob.data.update();bpy.context.view_layer.update();assert moved==26,moved
ob['stair_corner_gutter_repair']=REV
stamp=datetime.now(timezone.utc).isoformat();record={'revision':REV,'kind':'post-build gutter-end correction; historical full-build inputs and cache retained','variant':variant,'updatedAt':stamp,'object':ob.name,'movedVertices':moved,'oldStartX':9.205,'newStartX':9.76,'sourceBeforeSHA256':sha(saved),'sourceAfterSHA256':sha(source)}
nav=json.loads((out/'navigation.json').read_text());nav['modelUpdatedAt']=stamp;nav['stairCornerGutterRepair']=record
geometry=json.loads((out/'geometry.json').read_text());item=next(p for p in geometry['objects'] if p['object_name']==ob.name)
for p in item['vertices']:
 if abs(p[0]-minimum)<.0001:p[0]=9.76
bpy.context.preferences.filepaths.save_version=0
bpy.ops.wm.save_as_mainfile(filepath=str(native))
file=out/(native_name(variant)+'.glb')
for member in scene.objects:member.select_set(False)
ob.select_set(True);bpy.context.view_layer.objects.active=ob
patch=ROOT/'walkthrough/test-results'/REV/f'gutter-native-{variant}.glb'
bpy.ops.export_scene.gltf(filepath=str(patch),export_format='GLB',use_active_scene=True,use_selection=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
record['glbMeshReplacement']=glb_patch.replace_mesh(file,patch,ob.name)
subprocess.run(['cp','-c',str(file),str(ROOT/f'walkthrough/public/proposal-{variant}.glb')],check=True)
(out/'geometry.json').write_text(json.dumps(geometry,separators=(',',':')))
for p in [out/'navigation.json',ROOT/f'walkthrough/public/proposal-{variant}-navigation.json']:p.write_text(json.dumps(nav,separators=(',',':')))
record.update(nativeSHA256=sha(native),glbSHA256=sha(file),geometrySHA256=sha(out/'geometry.json'),navigationSHA256=sha(out/'navigation.json'))
(out/'modern-stair-gutter-refresh.json').write_text(json.dumps(record,indent=2)+'\n')
print('GUTTER_CORNER_REPAIRED',variant,moved,flush=True)
