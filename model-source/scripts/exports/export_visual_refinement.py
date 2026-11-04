"""Export reversible visual overlays from current native proposal models.

Blender --background --python scripts/exports/export_visual_refinement.py -- compact
No native input is overwritten. A full editable derivative is saved in outputs/.
"""
import sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
import argparse, hashlib, json
import bpy
from scripts.build.build_support import native_name
from scripts.interiors.visual_refinement import refine_scene
from scripts.interiors.door_frame_details import refine_door_frames
from scripts.interiors.bar_lounge_details import refine_bar_lounge
from scripts.interiors.principal_fixture_lighting import restore_principal_fixture_lighting
from scripts.interiors.fixture_refinement import refine_linear_fixtures
from scripts.interiors.joinery_textile_details import refine_joinery_textiles
from scripts.interiors.architectural_details import refine_architectural_details
from scripts.interiors.proposal_kitchen_interiors import export_quiet_oak_gltf

p=argparse.ArgumentParser();p.add_argument('variant',choices=['compact','planning']);args=p.parse_args(sys.argv[sys.argv.index('--')+1:])
source=ROOT/f'outputs/output-proposed-{args.variant}'/(native_name(args.variant)+'.blend')
input_hash=hashlib.file_digest(source.open('rb'),'sha256').hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(source));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
bar_objects,bar_details=refine_bar_lounge(scene)
changed,report=refine_scene(scene)
changed.extend(bar_objects)
finish_objects,finish_report,finish_details=refine_joinery_textiles(scene,report)
changed.extend(finish_objects);report.extend(finish_report)
navigation=json.loads((ROOT/f'walkthrough/public/proposal-{args.variant}-navigation.json').read_text())
detail_objects,detail_report,details=refine_architectural_details(scene,navigation)
changed.extend(detail_objects);report.extend(detail_report)
frame_objects,frame_details=refine_door_frames(scene,navigation)
changed.extend(frame_objects)
fixtures=restore_principal_fixture_lighting(scene)
fixture_objects,fixture_report,linear_fixtures=refine_linear_fixtures(scene)
changed.extend(fixture_objects);report.extend(fixture_report)
out=ROOT/f'outputs/output-visual-realism-{args.variant}';out.mkdir(parents=True,exist_ok=True)
public=ROOT/'walkthrough/public/visual-quality';public.mkdir(exist_ok=True)
fixture_details={'addedObjects':[o.name for o in fixture_objects if o.name.startswith('Lighting detail | ')]}
manifest={'version':5,'variant':args.variant,'source':str(source.relative_to(ROOT)),'sourceSHA256':input_hash,'objects':report,'restoredFixtures':fixtures,'linearFixtures':linear_fixtures,'constructionDetails':details,'finishDetails':finish_details,'fixtureDetails':fixture_details,'frameDetails':frame_details,'barDetails':bar_details}
(out/'refinement-report.json').write_text(json.dumps(manifest,indent=2)+'\n')
bpy.ops.object.select_all(action='DESELECT')
for ob in changed:ob.hide_set(False);ob.select_set(True)
export_quiet_oak_gltf(filepath=str(public/(args.variant+'-furnishings.glb')),export_format='GLB',use_selection=True,use_active_scene=True,export_apply=True,export_cameras=False,export_lights=False,export_extras=True)
(public/(args.variant+'-furnishings.json')).write_text(json.dumps(manifest,indent=2)+'\n')
bpy.ops.wm.save_as_mainfile(filepath=str(out/(native_name(args.variant)+' — visual refinement.blend')))
assert hashlib.file_digest(source.open('rb'),'sha256').hexdigest()==input_hash
print('REFINED',args.variant,len(report),flush=True)
