"""Run with Blender --background --python-exit-code 1 --python this-file.
Exercises real mesh booleans, source sharing/transforms and failure cleanup.
"""
import bpy,sys
from pathlib import Path
from mathutils import Matrix
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from blender_booleans import BooleanWorkspace
bpy.ops.wm.read_factory_settings(use_empty=True)
main=bpy.context.scene

def cube(name,location,scale):
    bpy.ops.mesh.primitive_cube_add(size=1,location=location)
    ob=bpy.context.object;ob.name=name;ob.scale=scale
    bpy.context.view_layer.update()
    return ob

def mesh_state(ob):
    return ([tuple(round(x,5)for x in v.co)for v in ob.data.vertices],[(tuple(f.vertices),f.material_index)for f in ob.data.polygons])

parent=bpy.data.objects.new('Retained transformed parent',None);main.collection.objects.link(parent);parent.location=(2,-1,.5)
source=cube('Proposal wall',(3,1,2),(4,.5,3));world=source.matrix_world.copy();source.parent=parent;source.matrix_world=world;bpy.context.view_layer.update()
retained=source.copy();retained.name='Unchanged original wall';main.collection.objects.link(retained)
retained_before=mesh_state(retained);links=tuple(source.users_collection);matrix=source.matrix_world.copy()
cutter=cube('Opening',(3,1,2),(1,2,2))
legacy=source.copy();legacy.data=source.data.copy();main.collection.objects.link(legacy)
BooleanWorkspace._cut(legacy,[cutter],'Reference')
expected=mesh_state(legacy)
counts=(len(bpy.data.scenes),len(bpy.data.objects),len(bpy.data.meshes))
with BooleanWorkspace([cutter]) as workspace:workspace.difference(source,[cutter])
assert mesh_state(source)==expected,'transformed wall matches normal exact Boolean'
assert mesh_state(retained)==retained_before,'linked original mesh unchanged'
assert tuple(source.users_collection)==links and source.matrix_world==matrix and source.parent==parent
assert bpy.context.window.scene==main and len(bpy.data.scenes)==counts[0] and len(bpy.data.objects)==counts[1]

class FailingWorkspace(BooleanWorkspace):
    @staticmethod
    def _cut(*_):raise RuntimeError('simulated Boolean error')
counts=(len(bpy.data.scenes),len(bpy.data.objects),len(bpy.data.meshes));unchanged=mesh_state(source)
try:
    with FailingWorkspace([cutter]) as workspace:workspace.difference(source,[cutter])
except RuntimeError:pass
else:raise AssertionError('expected cut failure')
assert mesh_state(source)==unchanged
assert bpy.context.window.scene==main
assert counts==(len(bpy.data.scenes),len(bpy.data.objects),len(bpy.data.meshes)),'failure leaves no work objects or meshes'

# Existing modifiers must retain the exact original-scene behavior.
bevel=source.modifiers.new('Existing bevel','BEVEL');bevel.width=.01;bevel.segments=1
legacy=source.copy();legacy.data=source.data.copy();main.collection.objects.link(legacy)
BooleanWorkspace._cut(legacy,[cutter],'Reference')
with BooleanWorkspace([cutter]) as workspace:workspace.difference(source,[cutter])
assert mesh_state(source)==mesh_state(legacy) and len(source.modifiers)==1
assert bpy.context.window.scene==main
print('PASS: exact geometry, retained shared source, transforms, modifier fallback and failure cleanup')
