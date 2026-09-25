"""Idempotence, closed-solid and access proof; unsaved Blender scene only."""
import os,ast
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
os.environ['ASHLEY_VARIANT']='walkthrough';os.environ['ASHLEY_RENDER_DIR']='side-annex-proof'
source=(ROOT/'scripts/render_photo_views.py').read_text()
exec(compile(source.split('views=json.loads')[0],str(ROOT/'scripts/render_photo_views.py'),'exec'))
g=json.loads((ROOT/'output-walkthrough/geometry.json').read_text())
materials={m.name:m for m in bpy.data.materials};PALETTE=g['materials'];record=[];collections={c.name:c for c in bpy.data.collections}
tree=ast.parse((ROOT/'scripts/build_model.py').read_text());names={'collection','mesh','box','prism','cylinder','beam'}
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef)and n.name in names],type_ignores=[]),'<annex-primitives>','exec'))
from refine_side_annex import refine_side_annex,PREFIX
def snapshot(only=True):
    return {o.name:{'name':o.get('source_name',o.name),'object_name':o.name,'layer':o.users_collection[0].name,
                    'vertices':[list(o.matrix_world@v.co)for v in o.data.vertices],
                    'faces':[list(f.vertices)for f in o.data.polygons],
                    'materials':[m.name for m in o.data.materials],'face_materials':[f.material_index for f in o.data.polygons],
                    'walkthrough_opening_leaf':bool(o.get('walkthrough_opening_leaf'))}
            for o in bpy.data.objects if o.type=='MESH' and (not only or o.name.startswith(PREFIX))}
other_before={k:v for k,v in snapshot(False).items()if not k.startswith(PREFIX)}
report=refine_side_annex(globals());bpy.context.view_layer.update();first=snapshot();wall_first=json.loads(json.dumps(g['walls']))
report=refine_side_annex(globals());bpy.context.view_layer.update();second=snapshot()
assert first==second and g['walls']==wall_first,'Annex helper must be exactly repeatable'
assert other_before=={k:v for k,v in snapshot(False).items()if not k.startswith(PREFIX)},'Existing model geometry changed'
bad=[]
for n,o in second.items():
    edges=Counter(tuple(sorted((p[i],p[(i+1)%len(p)])))for p in o['faces']for i in range(len(p)))
    if any(v!=2 for v in edges.values()):bad.append(n)
    actual=bpy.data.objects[n]
    if any(p.area<1e-10 for p in actual.data.polygons):bad.append(n+' zero-area face')
assert not bad,bad
# A 250 mm radius walking path runs through both real end openings. Check all
# low solids, including their frames, handles and open leaves, using actual bounds.
cx=report['navigation']['suggested_shortcut']['position'][0];path_y=(.2,8.6);radius=.25;collisions=[]
for n,o in second.items():
    p=o['vertices'];lo=[min(v[i]for v in p)for i in range(3)];hi=[max(v[i]for v in p)for i in range(3)]
    if hi[2]<=.07 or lo[2]>=1.9:continue
    if hi[1]<path_y[0]or lo[1]>path_y[1]:continue
    distance=max(lo[0]-cx,cx-hi[0],0)
    if distance<radius:collisions.append({'name':n,'distance_m':distance})
assert not collisions,collisions
report['validation']={'exact_repeatability':True,'existing_meshes_unchanged':True,'closed_meshes':len(second),
                      'non_closed_or_degenerate_meshes':bad,'walking_path_radius_m':radius,'walking_path_collisions':collisions,
                      'wall_spec_count':len([w for w in g['walls']if w['name'].startswith(PREFIX)]),'canonical_files_saved':False}
(out/'annex-estimates-and-validation.json').write_text(json.dumps(report,indent=2))
(out/'annex-geometry.json').write_text(json.dumps({'objects':list(second.values()),'walls':[w for w in g['walls']if w['name'].startswith(PREFIX)],'annex':report},indent=2))
ld=bpy.data.lights.new('Annex proof interior light','AREA');ld.energy=45;ld.shape='RECTANGLE';ld.size=.55;ld.size_y=3.5
light=bpy.data.objects.new('Annex proof interior light',ld);scene.collection.objects.link(light);light.location=(cx,4.41,2.3)
proofs=[('Front approach',(14.62,-.9,1.65),(cx,1.5,1.25),63),
        ('East roof and hips',(18.6,4.4,5.6),(14.55,4.41,1.4),64),
        ('Rear approach',(14.62,9.3,1.65),(cx,7.3,1.25),63),
        ('Empty interior toward rear',(cx,1.36,1.58),(cx,7.82,1.58),78),
        ('Empty interior toward front',(cx,7.46,1.58),(cx,1.0,1.58),78)]
for name,pos,target,hfov in proofs:
    camera.location=pos;camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.data.type='PERSP';camera.data.sensor_fit='HORIZONTAL';camera.data.angle=math.radians(hfov)
    scene.render.resolution_x=1100;scene.render.resolution_y=800;scene.render.filepath=str(out/(name+'.png'))
    bpy.ops.render.render(write_still=True);print('ANNEX_PROOF_VIEW_DONE',name,flush=True)
print('SIDE_ANNEX_PROOF_PASS',flush=True)
