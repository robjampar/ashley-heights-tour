"""Add the final shared-wall infill identified in the native bathroom review."""
import bpy,json,sys,hashlib
from pathlib import Path
from datetime import datetime,timezone
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.model.proposal_bedroom4_stair_suite import close_suite_crosswall,PREFIX,REVISION
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-bedroom4-stair-suite-{v}';native=out/(native_name(v)+'.blend')
before=json.loads((out/'source-inputs.json').read_text());after=source_hashes(R,v)
different=[k for k in set(before)|set(after)if before.get(k)!=after.get(k)]
assert different==['scripts/model/proposal_bedroom4_stair_suite.py'],different
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
assert not any('Suite cross-wall closure' in o.get('source_name','')for o in scene.objects)
nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=json.loads((out/'finish-report.json').read_text())
ns={'ROOT':R,'OUT':out,'scene':scene,'nav':nav,'materials':{},'PALETTE':dict(g['materials'])}
b=RoomBuilder(ns,'original house loft stair',PREFIX,'P38 Original house loft staircase and suite');ob=close_suite_crosswall(ns,b);scene.view_layers[0].update()
nav['segments'].append({'name':ob.name,'a':[0,2.02],'b':[0,4.34],'bottom':2.8,'top':5.237,'thickness':.242})
for title in ['10 Proposal · First floor']:
 view=bpy.data.scenes.get(title)
 if view:next(iter(view.collection.children)).objects.link(ob)
report['stair']['created'].append(ob.name);nav['bedroom4StairSuite']=report['stair'];scene['bedroom4_stair_suite_report']=json.dumps(report['stair'])
scene['loft_stair_finish_report']=json.dumps(nav['loftStairFinish'])
g['objects'].append({'name':ob.get('source_name',ob.name),'object_name':ob.name,'layer':b.collection.name,'assembly':None,'walkthrough_opening_leaf':False,'walkthrough_keep_visible':False,'vertices':[list(ob.matrix_world@p.co)for p in ob.data.vertices],'faces':[list(p.vertices)for p in ob.data.polygons],'materials':[m.get('appearance_source_material',m.name)for m in ob.data.materials],'face_materials':[p.material_index for p in ob.data.polygons],'material_appearance':[m.get('appearance_role')for m in ob.data.materials]})
g['proposal']['bedroom4StairSuite']=report['stair'];g['proposal']['loftStairFinish']=report['stair']
nav['interiorRooms']['original house loft stair']['objects']+=1
repfile=out/'original house loft stair-interior-report.json';interior=json.loads(repfile.read_text());interior['objects']+=1;interior['mesh_objects']+=1;repfile.write_text(json.dumps(interior,indent=2))
nav['modelUpdatedAt']=datetime.now(timezone.utc).isoformat()
for filename,value in [('geometry.json',g),('navigation.json',nav),('finish-report.json',report),('source-inputs.json',after)]:
 (out/filename).write_text(json.dumps(value,separators=(',',':')))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));print('CROSSWALL_CLOSED',v,flush=True)
