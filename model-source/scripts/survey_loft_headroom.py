"""Read-only measured roof clearance for the retained loft envelopes."""
import bpy, json, sys, hashlib
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
variant=sys.argv[sys.argv.index('--')+1]
base=ROOT/f'output-proposed-{variant}';native=base/(native_name(variant)+'.blend')
digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
vv=[];ff=[];names=[]
for ob in scene.objects:
    name=ob.get('source_name',ob.name)
    if ob.type!='MESH' or not name.startswith('Proposal | Joined roof lining '):continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh();offset=len(vv)
    vv.extend(ev.matrix_world@v.co for v in mesh.vertices)
    ff.extend(tuple(offset+i for i in p.vertices)for p in mesh.polygons);names.extend(name for p in mesh.polygons)
    ev.to_mesh_clear()
roof=BVHTree.FromPolygons(vv,ff);floor=5.55
areas={'loftsuite':[7.58,-13,12.42,-3.029],'hobby':[-3.55,2.2,12.31,8.05],'bridge':[7.45,-4,10.35,4.5]}
out=ROOT/f'revisions/interiors-overnight-2026-09-27/loftsuite/{variant}';out.mkdir(parents=True,exist_ok=True)
result={'variant':variant,'sourceSha256':digest,'floor':floor,'step':.10,'areas':{}}
for area,(x0,y0,x1,y1)in areas.items():
    points=[]
    for ix in range(round((x1-x0)/.10)+1):
        x=x0+ix*.10
        for iy in range(round((y1-y0)/.10)+1):
            y=y0+iy*.10;loc,normal,index,dist=roof.ray_cast(Vector((x,y,floor+.005)),Vector((0,0,1)),4)
            points.append({'x':round(x,3),'y':round(y,3),'height':round(loc.z-floor,4)if loc is not None else None,'roof':names[index]if index is not None else None})
    result['areas'][area]=points
result['sourceUnchanged']=hashlib.sha256(native.read_bytes()).hexdigest()==digest
assert result['sourceUnchanged']
(out/'headroom.json').write_text(json.dumps(result,indent=2)+'\n')
for y in(-12.0,-11.0,-10.0,-9.0,-8.0,-7.0,-6.0,-5.0):
    row=[]
    for x in(7.6,8.0,8.4,8.8,9.0,9.2,9.5,9.8,10.4,11,11.6,12.2):
        p,_,_,_=roof.ray_cast(Vector((x,y,floor+.005)),Vector((0,0,1)),4);row.append((x,round(p.z-floor,3)if p is not None else None))
    print('HEADROOM',y,row,flush=True)
print('PASS measured roof clearance',variant,len(ff),'faces',flush=True)
