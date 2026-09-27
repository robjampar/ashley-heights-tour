"""Read-only full-house checks: developed room geometry and occupied screen views."""
import bpy,json,sys,hashlib
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT/'scripts'))
from build_support import native_name
variant=sys.argv[sys.argv.index('--')+1]
base=ROOT/f'output-proposed-{variant}';native=base/(native_name(variant)+'.blend')
digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene
scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();reports=[]
def signature(ob):
    evaluated=ob.evaluated_get(deps);mesh=evaluated.to_mesh()
    try:
        # Compare actual evaluated world vertices and faces, including bevels and handles.
        data={'vertices':[[float(v)for v in evaluated.matrix_world@p.co]for p in mesh.vertices],
              'faces':[list(p.vertices)for p in mesh.polygons]}
        return data
    finally:evaluated.to_mesh_clear()
def inventory(active,prefix):
    groups={}
    for ob in active.objects:
        name=ob.get('source_name',ob.name)
        if ob.type=='MESH' and name.startswith(prefix):groups.setdefault(name,[]).append(signature(ob))
    return groups

def compare_meshes(full,isolated,area):
    assert full.keys()==isolated.keys(),(area,full.keys()-isolated.keys(),isolated.keys()-full.keys())
    maximum=0
    for name,parts in full.items():
        candidates=list(isolated[name]);assert len(parts)==len(candidates),(name,len(parts),len(candidates))
        for part in parts:
            matches=[]
            for i,candidate in enumerate(candidates):
                if part['faces']!=candidate['faces']or len(part['vertices'])!=len(candidate['vertices']):continue
                error=max((abs(x-y)for a,b in zip(part['vertices'],candidate['vertices'])for x,y in zip(a,b)),default=0)
                matches.append((error,i))
            assert matches,(area,name,'topology differs')
            error,i=min(matches);assert error<.00003,(area,name,'world-vertex difference',error)
            maximum=max(maximum,error);candidates.pop(i)
    return maximum
for area in ('cinema','bar','gym','utility','guest','guestbath','family','cloakroom','bedroom2','bedroom3'):
    prefix=area.title()+' 01 | '
    full=inventory(scene,prefix)
    study_path=ROOT/f'revisions/interiors-overnight-2026-09-27/{area}/{variant}'/(area.title()+' — interior study.blend')
    with bpy.data.libraries.load(str(study_path),link=False)as(src,dst):dst.scenes=[s for s in src.scenes if 'interior study' in s]
    study=dst.scenes[0];bpy.context.window.scene=study;study.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
    isolated=inventory(study,prefix)
    context=[n for n in full if n.startswith('Guestbath 01 | retained skirting outside ensuite ')]
    for name in context:
        assert all(v[1]<=5.50501 for part in full[name]for v in part['vertices'])
    maximum=compare_meshes({k:v for k,v in full.items()if k not in context},{k:v for k,v in isolated.items()if k not in context},area)
    bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
    cfg=json.loads((ROOT/f'proposal/interiors/leisure/{area}.json').read_text());rays=[]
    if area=='cinema':eyes=cfg['eyes'];sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    elif area=='guest':eyes=cfg['eyes'];sx,sy,sz=cfg['screen']['center'];sw,sh=cfg['screen']['size']
    elif area=='bar':eyes=[(7.52,y,-1.67)for y in(-7.26,-6.50,-5.74)]
    else:eyes=[]
    for seat,eye in enumerate(eyes):
        for u,v in((0,0),(-.46,-.46),(-.46,.46),(.46,-.46),(.46,.46)):
            target=Vector((sx+u*sw,sy+.009,sz+v*sh)if area=='cinema'else(sx+.0135,sy+u*sw,sz+v*sh)if area=='guest'else(5.255,-6.50+u*1.44,-1.42+v*.81));delta=target-Vector(eye)
            hit,loc,n,f,ob,m=scene.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length+.03)
            name=ob.get('source_name',ob.name)if hit else None
            expected=prefix+('fixed projection screen'if area=='cinema'else'fixed TV screen'if area=='guest'else'fixed media TV screen')
            assert hit and name.startswith(expected),(area,seat,list(target),name)
            rays.append({'seat':seat+1,'target':list(target),'hit':name})
    reports.append({'area':area,'matching_study_meshes':sum(map(len,full.values())),'preserved_context_parts_outside_room':context,'maximum_world_vertex_difference_m':maximum,'screen_rays':rays})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
out=ROOT/f'revisions/interiors-overnight-2026-09-27/native-{variant}.json'
out.write_text(json.dumps({'status':'PASS','variant':variant,'source_sha256':digest,'source_unchanged':True,'reports':reports},indent=2)+'\n')
print('PASS native leisure rooms',variant,[(r['area'],r['matching_study_meshes'],r['maximum_world_vertex_difference_m'],len(r['screen_rays']))for r in reports],flush=True)
