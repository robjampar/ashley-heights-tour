"""Build and check the owner's B choice in a separate proof, never the master."""
import ast
import bmesh
import bpy
import hashlib
import json
import math
import sys
from pathlib import Path
from mathutils import Vector

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
SOURCE=ROOT/'output-walkthrough/Ashley Heights.blend'
OUT=ROOT/'photo-review/rear-bay-selected-b'
OUT.mkdir(exist_ok=True)
source_hash=hashlib.sha256(SOURCE.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
scene=bpy.data.scenes['01 Exterior'];bpy.context.window.scene=scene
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[]
collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text())
names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)
     and n.name in names],type_ignores=[]),'<mesh-primitives>','exec'))
from refine_rear_bay_alignment import refine_rear_bay_alignment, P, BAY_NAMES

def snapshot():
    return {o.name:[tuple(o.matrix_world@v.co)for v in o.data.vertices]
            for o in bpy.data.objects if o.type=='MESH'}

def owned(name):
    return (name.startswith(P) or any(name.startswith(n) or
            name.startswith('Circulation detail | Cove '+n) for n in BAY_NAMES)
            or name in ('Dining room | floor','Dining room | ceiling','Balcony deck','Rear terrace paving')
            or name.startswith(('Balcony top rail','Balcony rear top rail','Balcony middle rail',
                                'Balcony bottom rail','Balcony baluster',
                                'Bedroom 3 balcony door glazed door ',
                                'Principal balcony door glazed door ')))

before=snapshot()
g['rear_bay_review']=refine_rear_bay_alignment(globals())
first=snapshot()
unchanged=[name for name in before if not owned(name)]
assert all(name in first and before[name]==first[name] for name in unchanged)
g['rear_bay_review']=refine_rear_bay_alignment(globals())
second=snapshot()
assert first==second, 'Repeated B refinement changed geometry'
issues=[]
for ob in bpy.data.objects:
    if ob.type!='MESH':continue
    bm=bmesh.new();bm.from_mesh(ob.data)
    bad=sum(not e.is_manifold for e in bm.edges)
    zero=sum(f.calc_area()<1e-10 for f in bm.faces)
    if bad or zero:issues.append({'object':ob.name,'open_edges':bad,'zero_faces':zero})
    bm.free()
assert not issues,issues
review=g['rear_bay_review'];centre=review['dining_center_x_m']
walls={w['name']:w for w in g['walls']}
for left_name,right_name in [('Dining left return','Dining right return'),('Dining left bay','Dining right bay')]:
    left=walls[left_name];right=walls[right_name]
    for a,b in zip((left['a'],left['b']),(right['b'],right['a'])):
        assert abs(a[0]+b[0]-2*centre)<1e-7 and abs(a[1]-b[1])<1e-7
    if left['openings']:
        assert left['openings'][0][1:]==right['openings'][0][1:]
        assert abs(left['openings'][0][0]-right['openings'][0][0])<1e-6
g['objects']=[{'name':o.get('source_name',o.name.split('.00')[0]),'object_name':o.name,
    'layer':o.users_collection[0].name,'assembly':o.get('assembly'),
    'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf')),
    'walkthrough_keep_visible':bool(o.get('walkthrough_keep_visible')),
    'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],
    'faces':[list(f.vertices)for f in o.data.polygons],
    'materials':[m.name for m in o.data.materials],
    'face_materials':[f.material_index for f in o.data.polygons]}
    for o in bpy.data.objects if o.type=='MESH']
(OUT/'geometry.json').write_text(json.dumps(g,separators=(',',':')))
(OUT/'review.json').write_text(json.dumps(review,indent=2))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
bpy.ops.export_scene.gltf(filepath=str(OUT/'Ashley Heights.glb'),export_format='GLB',
    use_active_scene=True,use_visible=True,export_cameras=False,export_lights=False,export_apply=True)
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest()==source_hash
proof={'source_native_sha256':source_hash,'mesh_count':len(second),
       'closed_meshes':len(second),'repeat_safe':first==second,
       'unchanged_unrelated_meshes':len(unchanged),'dining_left_right_symmetry':True,
       'canonical_unchanged':True,'selected_option':'B','projection_reduction_m':.30}
(OUT/'geometry-proof.json').write_text(json.dumps(proof,indent=2))
print('OWNER_SELECTED_B_PROOF_SAVED',json.dumps(proof),flush=True)
