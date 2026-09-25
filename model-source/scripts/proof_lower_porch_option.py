"""Review-only coherent 150 mm lower canopy, with fixed entrance door aperture."""
import ast,json,math,sys
from pathlib import Path
import bpy,bmesh
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'));OUT=ROOT/'photo-review/front-arch-proof'
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Front arch proof.blend'));scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text());materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_front_arch_windows import refine_front_arch_windows
r=refine_front_arch_windows(globals(),porch_drop=.15)
for name in r['porch_changed']:
 ob=bpy.data.objects[name];bm=bmesh.new();bm.from_mesh(ob.data);assert all(e.is_manifold for e in bm.edges)and all(f.calc_area()>1e-9 for f in bm.faces),name;bm.free()
(OUT/'porch-option-b.json').write_text(json.dumps(r,indent=2));bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Porch B lower canopy.blend'));print('PORCH_B_PASS',len(r['porch_changed']),flush=True)
