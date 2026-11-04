"""Apply canonical string joins and remove the coplanar duplicate loft finish."""
import bpy,bmesh,json,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import native_name,source_hashes
from scripts.model.proposal_bedroom4_stair_suite import hobby_floor_overlap_cut,housed_string_profile
from scripts.model.proposal_level_loft import subtract_box
v=sys.argv[sys.argv.index('--')+1];out=R/f'outputs/output-bedroom4-stair-suite-{v}';native=out/(native_name(v)+'.blend')
old=json.loads((out/'source-inputs.json').read_text());new=source_hashes(R,v);assert [k for k in old if old[k]!=new[k]]==['scripts/model/proposal_bedroom4_stair_suite.py']
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
nav=json.loads((out/'navigation.json').read_text());g=json.loads((out/'geometry.json').read_text());report=json.loads((out/'finish-report.json').read_text())
changed=[]
for ob in scene.objects:
 if 'Housed ivory stair string' not in ob.get('source_name',ob.name):continue
 profile=housed_string_profile(2.75/16);N=len(profile);x=4.59 if ob.get('interior_assembly','').endswith('west')else 5.51
 vv=[(x+off,y,h)for off in(-.02,.02)for y,h in profile]
 ff=[tuple(range(N-1,-1,-1)),tuple(range(N,2*N))]+[(i,(i+1)%N,(i+1)%N+N,i+N)for i in range(N)]
 mesh=bpy.data.meshes.new(ob.name+' fitted riser joins');mesh.from_pydata(vv,[],ff)
 for m in ob.data.materials:mesh.materials.append(m)
 bm=bmesh.new();bm.from_mesh(mesh);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(mesh);bm.free();mesh.update();ob.data=mesh;changed.append(ob)
assert len(changed)==2
ob=scene.objects['Hobby 01 | oak hobby floor'];me=ob.data;me.calc_loop_triangles();uv=list(me.uv_layers);names=[l.name for l in uv];materials=list(me.materials);world=ob.matrix_world;cut=hobby_floor_overlap_cut(scene);polys=[]
for tri in me.loop_triangles:
 p=[list(world@me.vertices[me.loops[i].vertex_index].co)+[v for layer in uv for v in layer.data[i].uv]for i in tri.loops]
 polys.extend((q,tri.material_index)for q in subtract_box(p,cut)if len(q)>2)
inv=world.inverted();vs=[];fs=[]
for p,mi in polys:
 a=len(vs);vs.extend(inv@Vector(v[:3])for v in p);fs.append(tuple(range(a,len(vs))))
mesh=bpy.data.meshes.new(ob.name+' single finish');mesh.from_pydata(vs,[],fs)
for m in materials:mesh.materials.append(m)
for name in names:mesh.uv_layers.new(name=name)
for face,(p,mi)in zip(mesh.polygons,polys):
 face.material_index=mi
 for j,i in enumerate(face.loop_indices):
  for k,layer in enumerate(mesh.uv_layers):layer.data[i].uv=p[j][3+k*2:5+k*2]
mesh.update();ob.data=mesh;changed.append(ob)
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();lookup={o['object_name']:o for o in g['objects']}
for ob in changed:
 ev=ob.evaluated_get(deps);me=ev.to_mesh();entry=lookup[ob.name];entry.update(vertices=[list(ob.matrix_world@p.co)for p in me.vertices],faces=[list(p.vertices)for p in me.polygons],face_materials=[p.material_index for p in me.polygons]);ev.to_mesh_clear()
report['finalSurfaceJoins']={'changed':[ob.name for ob in changed],'reason':'Close 20 mm notches between housed strings and enclosure; remove duplicate coplanar hobby floor finish while retaining its unique south edge.'}
for filename,data in [('geometry.json',g),('navigation.json',nav),('finish-report.json',report),('source-inputs.json',new)]: (out/filename).write_text(json.dumps(data,separators=(',',':')))
bpy.context.preferences.filepaths.save_version=0;bpy.ops.wm.save_as_mainfile(filepath=str(native));print('SURFACE_JOINS_FINISHED',v,[ob.name for ob in changed],flush=True)
