import bpy,json,sys
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from scripts.build.build_support import native_name
out=ROOT/'walkthrough/test-results/landing-oak-knee-wall-2026-10-20'
for variant in ['compact','planning']:
 bpy.ops.wm.open_mainfile(filepath=str(ROOT/f'outputs/output-proposed-{variant}'/(native_name(variant)+'.blend')))
 scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
 report=[]
 for ob in scene.objects:
  if ob.type!='MESH':continue
  if not ('continuous oak landing floor' in ob.name or 'Original loft front knee wall 2' in ob.name or ob.name=='Landings 01 | stair lower landing infill'):continue
  ps=[ob.matrix_world@v.co for v in ob.data.vertices]
  report.append({'name':ob.name,'bounds':[min(p[k] for p in ps)for k in range(3)]+[max(p[k]for p in ps)for k in range(3)],'dataMaterials':[m.name if m else None for m in ob.data.materials],'slots':[(s.link,s.material.name if s.material else None)for s in ob.material_slots],'materialIndices':sorted(set(f.material_index for f in ob.data.polygons)),'uvLayers':[l.name for l in ob.data.uv_layers],'scenes':[s.name for s in bpy.data.scenes if ob.name in s.objects]})
 (out/f'{variant}-before-native.json').write_text(json.dumps(report,indent=2));print(variant,json.dumps(report[-3:]),flush=True)
