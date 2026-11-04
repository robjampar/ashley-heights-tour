import bpy,sys,json,subprocess
from pathlib import Path
from datetime import datetime,timezone
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-suite-layout-loft-{v}';name=native_name(v);backup=R/f'revisions/suite-layout-and-loft-use-2026-10-22/pre-balcony-post-correction/{v}';backup.mkdir(parents=True,exist_ok=True)
for f in(name+'.blend',name+'.glb','geometry.json','navigation.json','source-inputs.json','finish-report.json'):
 if not(backup/f).exists():subprocess.run(['cp','-c',str(out/f),str(backup/f)],check=True)
bpy.ops.wm.open_mainfile(filepath=str(out/(name+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
owners=set(c for s in bpy.data.scenes if 'Proposed'in s.name or 'Proposal ·'in s.name for c in s.collection.children_recursive)
removed=[]
for ob in list(scene.objects):
 if not ob.name.startswith('Rear bay detail | Balcony post '):continue
 removed.append(ob.name)
 for c in tuple(ob.users_collection):
  if c in owners:c.objects.unlink(ob)
 if not ob.users_collection:bpy.data.objects.remove(ob)
assert len(removed)==6
nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=nav['suiteLayoutLoft'];report['removed'].extend(removed);g['objects']=[o for o in g['objects']if o['object_name']not in removed];g['proposal']['suiteLayoutLoft']=report
nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat();scene['suite_layout_loft_report']=json.dumps(report)
(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')));(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
f=json.loads((out/'finish-report.json').read_text());f['stair']=report;(out/'finish-report.json').write_text(json.dumps(f,indent=2));(out/'source-inputs.json').write_text(json.dumps(source_hashes(R,v),indent=2))
(out/'balcony-post-correction.json').write_text(json.dumps({'variant':v,'removed':removed,'sceneReport':scene['suite_layout_loft_report']},indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(name+'.blend')));print('OLD_POSTS_REMOVED',v,len(removed),flush=True)
