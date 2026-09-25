"""Reopen the deliverable and check units, geometry, visibility and export."""
import bpy, bmesh, json, math, struct, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/__import__('os').environ.get('ASHLEY_OUTPUT','output-final')
bpy.ops.wm.open_mainfile(filepath=str(OUT/'Ashley Heights.blend'))
data=json.loads((OUT/'geometry.json').read_text())
sys.path.insert(0,str(ROOT/'scripts'))
from dimension_spec import CHECKS
from dimension_allowances import accepted_target,classify_dimension
objects=[o for o in bpy.data.objects if o.type=='MESH']
assert len(objects)==len(data['objects'])
assert len(bpy.data.scenes)==7
assert all(s.unit_settings.system=='METRIC' for s in bpy.data.scenes)
bad=[];open_meshes=[]
for ob in objects:
    if any(not math.isfinite(c) for v in ob.data.vertices for c in v.co):bad.append([ob.name,'nonfinite'])
    if any(p.area<1e-9 for p in ob.data.polygons):bad.append([ob.name,'zero-area face'])
    bm=bmesh.new();bm.from_mesh(ob.data)
    if any(not e.is_manifold for e in bm.edges):open_meshes.append(ob.name)
    bm.free()
assert not bad,bad
# A closed-mesh check alone misses a wall that was deleted entirely. Every
# declared wall must also have native structural mesh pieces.
missing_walls=[]
for wall in data['walls']:
    prefix=wall['name']+(' ' if wall.get('area_scope')=='side_annex' else ' |')
    parts=[o for o in data['objects'] if o['name'].startswith(prefix) and o['layer'].endswith('walls')]
    if not parts:missing_walls.append(wall['name'])
assert not missing_walls,missing_walls
for saved in data['objects']:
    ob=bpy.data.objects[saved['object_name']]
    assert len(ob.data.vertices)==len(saved['vertices'])
    assert max(abs(a-b) for v,xyz in zip(ob.data.vertices,saved['vertices']) for a,b in zip(ob.matrix_world@v.co,xyz))<1e-5,ob.name
actual_checks=[]
def actual_bounds(name,axis):
    refs=[r for r in data['objects'] if (r['name']==name or r['name'].startswith(name+' |')) and (r['layer'].endswith('walls') or r['layer'] in ('23 Balcony','40 Outbuildings'))]
    values=[(bpy.data.objects[r['object_name']].matrix_world@v.co)[axis] for r in refs for v in bpy.data.objects[r['object_name']].data.vertices]
    return min(values),max(values)
for check in CHECKS:
    lo=actual_bounds(check['negative_wall'],check['axis'])[1]
    hi=actual_bounds(check['positive_wall'],check['axis'])[0]
    assert abs(hi-lo-accepted_target(check,data))<.001,check
    actual_checks.append({'room':check['room'],'axis':check['axis'],'actual_m':hi-lo,
                          **classify_dimension(check,hi-lo,data)})
# Circulation regression: actual tread vertices must rise towards the front.
treads=sorted((o for o in objects if o.name.startswith('Stair tread ')),key=lambda o:o.name)
assert len(treads)==14,len(treads)
centers=[sum((o.matrix_world@v.co for v in o.data.vertices),__import__('mathutils').Vector())/len(o.data.vertices) for o in treads]
tops=[max((o.matrix_world@v.co).z for v in o.data.vertices) for o in treads]
assert all(b.y<a.y and zb>za for a,b,za,zb in zip(centers,centers[1:],tops,tops[1:]))
winders=[o for o in objects if o.name.startswith('Stair winder ')]
assert len(winders)==3 and abs(max((o.matrix_world@v.co).z for o in winders for v in o.data.vertices)-data['level_height'])<.001
assert 'Landing connection at head of stairs' in bpy.data.objects
front=actual_bounds('Summer house front pier',0);rear=actual_bounds('Summer house rear wall',0)
assert front[1]<rear[0] and front[0]>13.0,(front,rear)
assert actual_bounds('Outside WC west wall',1)[0]>actual_bounds('Summer house east wall',1)[1]
assert not open_meshes,open_meshes
for scene,prefix in [(bpy.data.scenes['02 Ground floor'],'2'),(bpy.data.scenes['03 First floor'],'1')]:
    for lc in scene.view_layers[0].layer_collection.children:
        if lc.name.startswith(prefix):assert lc.exclude,(scene.name,lc.name)
im=bpy.data.images.get('floorplan.png');assert im and im.packed_file
# Inspect the GLB without importing into and changing the working model.
raw=(OUT/'Ashley Heights.glb').read_bytes()
magic,version,length=struct.unpack_from('<4sII',raw,0)
assert magic==b'glTF' and version==2 and length==len(raw)
n,kind=struct.unpack_from('<II',raw,12);gltf=json.loads(raw[20:20+n])
assert len(gltf['meshes'])==len(objects),(len(gltf['meshes']),len(objects))
assert len(gltf['scenes'])==1
report={'status':'passed','mesh_objects':len(objects),'faces':sum(len(o.data.polygons) for o in objects),
        'closed_meshes':len(objects)-len(open_meshes),'intentional_surface_meshes':open_meshes,
        'blender_scenes':[s.name for s in bpy.data.scenes],'units':'metres','packed_floorplan':True,
        'source_panoramas':len(list((ROOT/'source/panoramas').glob('*.jpg'))),
        'glb_meshes':len(gltf['meshes']),'glb_scenes':len(gltf['scenes']),
        'layout_checks':['Stairs rise south towards front entrance','Three upper winders reach landing height','Head-of-stair floor connection exists','Garden room entrance faces west','WC lies north of summer house'],
        'dimension_checks_from_reopened_blend':len(actual_checks),'dimension_checks':actual_checks,
        'printed_dimension_matches':sum(c['printed_match'] for c in actual_checks),
        'owner_approved_dimension_departures':sum(c['status']=='OWNER_APPROVED_DEPARTURE' for c in actual_checks),
        'accepted_dimension_checks':sum(c['accepted_match'] for c in actual_checks),
        'declared_walls_with_structural_meshes':len(data['walls']),'missing_structural_walls':missing_walls}
(OUT/'validation.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
