"""Verify material-only repairs preserve topology, transforms and authored UVs."""
import bpy,json,sys,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
from scripts.model.proposal_landing_oak_knee_wall import MATERIAL_REPAIRS,KNEE_NAME,KNEE_END_X

def read(path):
 bpy.ops.wm.open_mainfile(filepath=str(path));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
 result={}
 for name in MATERIAL_REPAIRS:
  ob=scene.objects[name]
  data={'matrix':[list(v)for v in ob.matrix_world],'vertices':[list(v.co)for v in ob.data.vertices],'polygons':[list(p.vertices)for p in ob.data.polygons],'indices':[p.material_index for p in ob.data.polygons],'uv':{l.name:[list(v.uv)for v in l.data]for l in ob.data.uv_layers}}
  result[name]={'geometryUV':hashlib.sha256(json.dumps(data).encode()).hexdigest(),'materials':[s.material.name if s.material else None for s in ob.material_slots]}
 knee=scene.objects[KNEE_NAME]
 result[KNEE_NAME]={'endX':max((knee.matrix_world@v.co).x for v in knee.data.vertices),'materials':[s.material.name if s.material else None for s in knee.material_slots]}
 return result
reports=[]
for v in ['compact','planning']:
 name=native_name(v)+'.blend'
 before=read(ROOT/f'revisions/landing-oak-knee-wall-2026-10-20/original/outputs/output-proposed-{v}'/name)
 after=read(ROOT/f'outputs/output-landing-oak-{v}'/name)
 for n,mat in MATERIAL_REPAIRS.items():
  assert before[n]['geometryUV']==after[n]['geometryUV'],n
  assert after[n]['materials']==[mat],n
 assert abs(after[KNEE_NAME]['endX']-KNEE_END_X)<1e-5
 assert all(after[KNEE_NAME]['materials'])
 reports.append({'variant':v,'unchangedGeometryAndUVs':list(MATERIAL_REPAIRS),'before':before,'after':after})
 print('NATIVE_FINISH_VERIFIED',v,flush=True)
(ROOT/'walkthrough/test-results/landing-oak-knee-wall-2026-10-20/native-finish-check.json').write_text(json.dumps(reports,indent=2))
