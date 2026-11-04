"""Update the visual native panels; revalidate and retain the unaffected overlay."""
import bpy,sys,json,hashlib,struct
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
from scripts.interiors.door_frame_details import clear_frame_junctions
from scripts.interiors.interior_furnishing import RoomBuilder
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-visual-realism-{v}';native=out/(native_name(v)+' — visual refinement.blend');public=R/'walkthrough/public/visual-quality';manifest=json.loads((public/f'{v}-furnishings.json').read_text());panels={'Proposal | Entrance solid panel south','Proposal | Entrance solid panel north'}
sha=lambda p:hashlib.file_digest(p.open('rb'),'sha256').hexdigest();overlay=public/f'{v}-furnishings.glb';overlay_hash=sha(overlay)
with overlay.open('rb')as f:f.seek(12);size=struct.unpack('<I',f.read(4))[0];f.read(4);gltf=json.loads(f.read(size))
assert not panels.intersection(n.get('name')for n in gltf['nodes'])
old_native_hash=sha(native);old_source_hash=manifest['sourceSHA256'];initial=json.loads((R/f'outputs/output-proposed-{v}/door-wall-junctions-refresh.json').read_text());assert old_source_hash==initial['files'][native_name(v)+'.blend']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;nav=json.loads((R/f'walkthrough/public/proposal-{v}-navigation.json').read_text());ns={'ROOT':R,'scene':scene,'nav':nav,'materials':{},'PALETTE':{}};b=RoomBuilder(ns,'door frames','Frame detail | ','Visual complete door surrounds');report=manifest['frameDetails'];frames=[f for f in report['frames']if any(d.startswith('Proposal | Entrance solid door')for d in f['doors'])]
objects,records=clear_frame_junctions(scene,frames,b,set(report['removedObjects']));assert {o.name for o in objects}==panels
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));assert sha(overlay)==overlay_hash
manifest['sourceSHA256']=sha(R/manifest['source']);manifest['targetedSourceRefresh']={'updatedAt':datetime.now(timezone.utc).isoformat(),'method':'Revalidated unchanged furnishing overlay after a two-panel native/GLB correction. Visual native panels updated; no furnishing overlay re-export performed.','previousSourceSHA256':old_source_hash,'previousVisualNativeSHA256':old_native_hash,'visualNativeSHA256':sha(native),'unchangedOverlaySHA256':overlay_hash,'changedBaseObjects':sorted(panels),'changedObjectsAbsentFromOverlay':True,'junctions':records}
for p in [public/f'{v}-furnishings.json',out/'refinement-report.json']:p.write_text(json.dumps(manifest,indent=2)+'\n')
print('VISUAL_PANELS_REFRESHED',v,flush=True)
