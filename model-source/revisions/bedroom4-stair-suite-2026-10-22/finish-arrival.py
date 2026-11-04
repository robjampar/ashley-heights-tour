"""Final canonical arrival finish: remove the work mat and complete the oak corner."""
import bpy,json,sys
from pathlib import Path
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.model.proposal_bedroom4_stair_suite import PREFIX,finish_stair_arrival
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-bedroom4-stair-suite-{v}';native=out/(native_name(v)+'.blend')
old=json.loads((out/'source-inputs.json').read_text());new=source_hashes(R,v);assert [k for k in old if old[k]!=new[k]]==['scripts/model/proposal_bedroom4_stair_suite.py']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=json.loads((out/'finish-report.json').read_text());ns={'ROOT':R,'OUT':out,'scene':scene,'nav':nav,'materials':{},'PALETTE':g['materials']};b=RoomBuilder(ns,'original house loft stair',PREFIX,'P38 Original house loft staircase and suite');removed=finish_stair_arrival(ns,b);ob=b.objects[0];scene.view_layers[0].update()
for view in bpy.data.scenes:
 if 'Proposal ·'not in view.name:continue
 for name in removed:
  item=view.objects.get(name)
  if item:
   for col in tuple(item.users_collection):
    if col in view.collection.children_recursive:col.objects.unlink(item)
view=bpy.data.scenes.get('10 Proposal · First floor')
if view:next(iter(view.collection.children)).objects.link(ob)
report['stair']['created'].append(ob.name);report['stair']['removed']+=removed;g['objects']=[o for o in g['objects']if o['object_name']not in removed]
g['objects'].append({'name':ob['source_name'],'object_name':ob.name,'layer':b.collection.name,'assembly':None,'walkthrough_opening_leaf':False,'walkthrough_keep_visible':False,'vertices':[list(ob.matrix_world@p.co)for p in ob.data.vertices],'faces':[list(p.vertices)for p in ob.data.polygons],'materials':[m.name for m in ob.data.materials],'face_materials':[p.material_index for p in ob.data.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
nav['bedroom4StairSuite']=report['stair'];g['proposal']['bedroom4StairSuite']=report['stair'];g['proposal']['loftStairFinish']=report['stair'];scene['bedroom4_stair_suite_report']=json.dumps(report['stair'])
nav['interiorRooms']['original house loft stair']['objects']+=1
repfile=out/'original house loft stair-interior-report.json';interior=json.loads(repfile.read_text());interior['objects']+=1;interior['mesh_objects']+=1;repfile.write_text(json.dumps(interior,indent=2))
for filename,data in [('geometry.json',g),('navigation.json',nav),('finish-report.json',report),('source-inputs.json',new)]: (out/filename).write_text(json.dumps(data,separators=(',',':')))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));print('ARRIVAL_FINISHED',v,removed,flush=True)
