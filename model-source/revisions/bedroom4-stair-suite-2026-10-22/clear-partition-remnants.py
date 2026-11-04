"""Remove planning-only remnants of the fully superseded ensuite partitions."""
import bpy,json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_bedroom4_stair_suite import superseded_suite_partition
results=[]
for v in ('compact','planning'):
 out=R/f'outputs/output-bedroom4-stair-suite-{v}';old=json.loads((out/'source-inputs.json').read_text());new=source_hashes(R,v)
 assert [k for k in old if old[k]!=new[k]]==['scripts/model/proposal_bedroom4_stair_suite.py']
 native=out/(native_name(v)+'.blend');bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
 owners=set(scene.collection.children_recursive);removed=[]
 for ob in list(scene.objects):
  if not superseded_suite_partition(ob.name):continue
  removed.append(ob.name)
  for col in tuple(ob.users_collection):
   if col in owners or any(col in other.collection.children_recursive for other in bpy.data.scenes if 'Proposal ·'in other.name):col.objects.unlink(ob)
  if not ob.users_collection:bpy.data.objects.remove(ob)
 if removed:
  g=json.loads((out/'geometry.json').read_text());nav=json.loads((out/'navigation.json').read_text());report=json.loads((out/'finish-report.json').read_text());report['stair']['removed']+=removed
  g['objects']=[o for o in g['objects']if o['object_name']not in removed];g['proposal']['bedroom4StairSuite']=report['stair'];g['proposal']['loftStairFinish']=report['stair'];nav['bedroom4StairSuite']=report['stair'];scene['bedroom4_stair_suite_report']=json.dumps(report['stair'])
  for fn,data in [('geometry.json',g),('navigation.json',nav),('finish-report.json',report)]: (out/fn).write_text(json.dumps(data,separators=(',',':')))
  bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native))
 (out/'source-inputs.json').write_text(json.dumps(new,indent=2));results.append({'variant':v,'removed':removed,'savedNative':bool(removed)});print('REMNANTS_REMOVED',v,len(removed),flush=True)
(R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22/partition-remnants.json').write_text(json.dumps(results,indent=2))
