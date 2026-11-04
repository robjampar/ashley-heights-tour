"""Run with Blender --background --python-exit-code 1 --python this_file.py."""
import sys
from pathlib import Path
import bpy

ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT))
from scripts.interiors.interior_furnishing import RoomBuilder
from scripts.interiors.door_frame_details import refine_door_frames

bpy.ops.wm.read_factory_settings(use_empty=True)
scene=bpy.context.scene
nav={'interactiveDoors':[{
    'id':'Proposal | Side entrance door','members':['Proposal | Side entrance door leaf'],
    'hinge':[0,0,0],'apertureAxis':[0,1],'openDelta':1.5707963267948966,
}], 'walls':[{'name':'Garage west','a':[0,0],'thickness_m':.23}]}
ns={'ROOT':ROOT,'scene':scene,'nav':nav,'materials':{},'PALETTE':{}}
b=RoomBuilder(ns,'test','Proposal | ','Test proposal')
mat=b.material('oak',(.5,.3,.15,1))
b.box('Side entrance door leaf',(0,.45,1.05),(.04,.9,2.1),mat)
for y in (0,.9):b.box('Side entrance door jamb',(0,y,1.05),(.15,.05,2.1),mat)
scene.view_layers[0].update()
first,report=refine_door_frames(scene,nav)
assert report['solidDoorCount']==1
assert 'Proposal | Side entrance door jamb' not in scene.objects
assert 'Proposal | Side entrance door jamb.001' not in scene.objects
assert len(first)==12
names={o.name for o in first}
second,again=refine_door_frames(scene,nav)
assert {o.name for o in second}==names
assert again['frames'][0]['wallDepth']==report['frames'][0]['wallDepth']
print('DOOR_FRAME_RETIREMENT_PASS: deleted legacy jambs, complete replacement and repeat build')
