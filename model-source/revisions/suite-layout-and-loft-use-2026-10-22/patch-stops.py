"""Fit six existing fixed stops to their closed leaves; save candidate only."""
import bpy,json,sys,hashlib,subprocess
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-suite-layout-loft-{v}';name=native_name(v);backup=R/f'revisions/suite-layout-and-loft-use-2026-10-22/pre-stop-correction/{v}';backup.mkdir(parents=True,exist_ok=True)
for f in (name+'.blend',name+'.glb','geometry.json','navigation.json','source-inputs.json','finish-report.json'):
 if not(backup/f).exists():subprocess.run(['cp','-c',str(out/f),str(backup/f)],check=True)
bpy.ops.wm.open_mainfile(filepath=str(out/(name+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert not scene.get('door_stop_refresh_revision')
nav=json.loads((out/'navigation.json').read_text());from datetime import datetime,timezone
nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat();g=json.loads((out/'geometry.json').read_text());records=[]
for d in nav['interactiveDoors']:
 if d['id']not in('Combined suite 01 | suite entry','Suite refinement | bathroom entry'):continue
 axis=d['apertureAxis'];n=Vector((-axis[1],axis[0],0));leaf=scene.objects[d['id']+' oak leaf'];lp=[(leaf.matrix_world@Vector(p)).dot(n)for p in leaf.bound_box]
 stops=[ob for ob in scene.objects if ob.name.startswith(d['id'])and ('rebated stop'in ob.name or 'head stop'in ob.name or ob.name.startswith(d['id']+' stop'))]
 assert len(stops)==3
 for ob in stops:
  assert ob.parent is None
  assert not any(ob.name in s.objects for s in bpy.data.scenes if 'Proposed'not in s.name and 'Proposal ·'not in s.name)
  sp=[(ob.matrix_world@Vector(p)).dot(n)for p in ob.bound_box]
  distance=(min(lp)-.001-max(sp))if d['openDelta']>0 else(max(lp)+.001-min(sp))
  delta=n*distance;ob.matrix_world.translation+=delta;ob['door_stop_clearance_m']=.001
  entry=next(o for o in g['objects']if o['object_name']==ob.name)
  entry['vertices']=[[p[k]+delta[k]for k in range(3)]for p in entry['vertices']]
  records.append({'name':ob.name,'worldDelta':list(delta),'closedLeafClearanceM':.001})
report=nav['suiteLayoutLoft'];report['doorStopClearanceM']=.001
for item in records:
 if item['name'].startswith('Combined suite 01 |')and item['name']not in report['changed']:report['changed'].append(item['name'])
scene['suite_layout_loft_report']=json.dumps(report);scene['door_stop_refresh_revision']='fitted-stops-2026-10-22'
g['proposal']['suiteLayoutLoft']=report
(out/'navigation.json').write_text(json.dumps(nav,separators=(',',':')));(out/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
finish=json.loads((out/'finish-report.json').read_text());finish['stair']=report;(out/'finish-report.json').write_text(json.dumps(finish,indent=2))
(out/'source-inputs.json').write_text(json.dumps(source_hashes(R,v),indent=2))
(out/'stop-correction.json').write_text(json.dumps({'variant':v,'records':records,'sceneExtras':{k:scene[k]for k in('suite_layout_loft_report','door_stop_refresh_revision')}},indent=2))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(out/(name+'.blend')))
print('FIXED_STOPS',v,len(records),flush=True)
