"""Apply the exact final canonical joinery dimensions to the prepared natives."""
import bpy,json,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.model.proposal_bedroom4_stair_suite import PREFIX,SUITE
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-bedroom4-stair-suite-{v}';native=out/(native_name(v)+'.blend')
old=json.loads((out/'source-inputs.json').read_text());new=source_hashes(R,v);assert [k for k in old if old[k]!=new[k]]==['scripts/model/proposal_bedroom4_stair_suite.py']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=json.loads((out/'finish-report.json').read_text());ns={'ROOT':R,'OUT':out,'scene':scene,'nav':nav,'materials':{},'PALETTE':g['materials']};b=RoomBuilder(ns,'original house loft stair',PREFIX,'P38 Original house loft staircase and suite')
changed=[]
def move(ob,axis,before,after):
 for p in ob.data.vertices:
  if abs(p.co[axis]-before)<1e-5:p.co[axis]=after
for ob in scene.objects:
 label=ob.get('interior_assembly','')
 if label=='Oak floor in former ensuite':move(ob,0,5.835,5.90)
 elif label=='Fitted under-stair enclosure side':
  move(ob,0,5.53,5.51);move(ob,0,5.57,5.53);move(ob,1,3.36,3.30)
 elif label=='Fitted under-stair enclosure end':move(ob,0,5.57,5.53)
 elif label=='double vanity lower carcass':
  move(ob,0,-1.9,-1.882);move(ob,0,-.3,-.318);move(ob,1,3.67,3.694)
 elif label=='double vanity drawer fronts':move(ob,2,3.13,3.10);move(ob,2,3.60,3.636)
 elif label=='double vanity side':
  move(ob,1,3.67,3.694);move(ob,2,3.13,3.10);move(ob,2,3.60,3.636)
 else:continue
 ob.data.update();b.uv(ob);changed.append(ob)
assert len(changed)==7,len(changed)
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();lookup={o['object_name']:o for o in g['objects']}
for ob in changed:
 ev=ob.evaluated_get(deps);me=ev.to_mesh();entry=lookup[ob.name];entry.update(vertices=[list(ob.matrix_world@p.co)for p in me.vertices],faces=[list(p.vertices)for p in me.polygons],face_materials=[p.material_index for p in me.polygons]);ev.to_mesh_clear()
report['finalJoineryCorrections']=[ob.name for ob in changed]
for filename,data in [('geometry.json',g),('navigation.json',nav),('finish-report.json',report),('source-inputs.json',new)]: (out/filename).write_text(json.dumps(data,separators=(',',':')))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));print('JOINERY_FINISHED',v,len(changed),flush=True)
