import bpy,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-open-suite-eaves-{v}'
bpy.ops.wm.open_mainfile(filepath=str(out/(native_name(v)+'.blend')));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
bpy.ops.object.select_all(action='DESELECT')
for ob in scene.objects:
 if ob.type!='MESH':continue
 p=[ob.matrix_world@Vector(v)for v in ob.bound_box];lo=[min(q[k]for q in p)for k in range(3)];hi=[max(q[k]for q in p)for k in range(3)]
 if all(lo[k]<[12,11,8][k]and hi[k]>[-6,-5.5,2.6][k]for k in range(3)):ob.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(out/'qa-region.glb'),export_format='GLB',use_active_scene=True,use_selection=True,use_visible=True,export_materials='NONE',export_cameras=False,export_lights=False,export_apply=True,export_extras=True)
