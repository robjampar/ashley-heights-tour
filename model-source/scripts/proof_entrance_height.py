"""Build a separate taller-entrance candidate without changing the master."""
import bpy,json,sys,ast,math
from collections import Counter
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
OUT=ROOT/'photo-review/entrance-height-proof';OUT.mkdir(exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/'output-walkthrough/Ashley Heights.blend'))
bpy.context.window.scene=bpy.data.scenes['01 Exterior']
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[]
collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[]),'<primitives>','exec'))
from refine_entrance_height import refine_entrance_height
porch_before={ob.name:[list(ob.matrix_world@v.co)for v in ob.data.vertices]for ob in bpy.data.objects if ob.type=='MESH' and ob.name.startswith('Entrance porch ')}
report=refine_entrance_height(globals())
first={ob.name:[list(ob.matrix_world@v.co)for v in ob.data.vertices]for ob in bpy.data.objects if ob.type=='MESH'}
refine_entrance_height(globals())
second={ob.name:[list(ob.matrix_world@v.co)for v in ob.data.vertices]for ob in bpy.data.objects if ob.type=='MESH'}
assert first==second,'Entrance helper is not repeat-safe'
assert all(second[n]==v for n,v in porch_before.items()),'Porch A changed'
bad=[]
for ob in bpy.data.objects:
    if ob.type!='MESH':continue
    edges=Counter(tuple(sorted((a,b)))for f in ob.data.polygons for a,b in zip(list(f.vertices),list(f.vertices)[1:]+list(f.vertices)[:1]))
    if any(v!=2 for v in edges.values()):bad.append(ob.name)
assert not bad,bad
report.update(all_meshes_closed=True,porch_a_unchanged=True,repeat_geometry_identical=True,mesh_count=len(second))
(OUT/'review.json').write_text(json.dumps(report,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Taller entrance.blend'))
print('ENTRANCE_HEIGHT_CANDIDATE_SAVED')
