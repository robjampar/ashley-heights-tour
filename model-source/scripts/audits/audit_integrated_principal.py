"""Read-only native check: accepted geometry and sightlines in the whole house."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,math
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts'))
from scripts.build.build_support import native_name
variant=sys.argv[-1];assert variant in ('compact','planning')
asset=ROOT/'proposal/interiors/principal/accepted'/variant
bed=json.loads((asset/'bedroom-report.json').read_text());bath=json.loads((asset/'ensuite-report.json').read_text())
prefixes=('Bedroom 02 | ','Ensuite 01 | ','Proposal | New wing east upper ')
def capture(scene):
    scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get();items={}
    for ob in scene.objects:
        name=ob.get('source_name',ob.name)
        if ob.type!='MESH' or not name.startswith(prefixes):continue
        evaluated=ob.evaluated_get(deps);mesh=evaluated.to_mesh()
        value={'vertices':[list(ob.matrix_world@v.co)for v in mesh.vertices],'faces':[list(f.vertices)for f in mesh.polygons]}
        evaluated.to_mesh_clear();items.setdefault(name,[]).append(value)
    return items
bpy.ops.wm.open_mainfile(filepath=str(asset/'suite.blend'))
scene=bpy.data.scenes['Principal suite — bathroom and wardrobe'];bpy.context.window.scene=scene;accepted=capture(scene)
bpy.ops.wm.open_mainfile(filepath=str(ROOT/f'outputs/output-proposed-{variant}'/(native_name(variant)+'.blend')))
scene=bpy.data.scenes['08 Proposed extensions'];bpy.context.window.scene=scene;actual=capture(scene)
assert accepted.keys()==actual.keys(),(accepted.keys()-actual.keys(),actual.keys()-accepted.keys())
maximum=0
for name,reference in accepted.items():
    current=actual[name];assert len(reference)==len(current),(name,len(reference),len(current))
    key=lambda o:tuple(round(sum(v[i]for v in o['vertices'])/len(o['vertices']),4)for i in range(3))
    for a,b in zip(sorted(reference,key=key),sorted(current,key=key)):
        assert a['faces']==b['faces'],name
        assert len(a['vertices'])==len(b['vertices']),name
        error=max((abs(x-y)for p,q in zip(a['vertices'],b['vertices'])for x,y in zip(p,q)),default=0)
        assert error<.00003,(name,error)
        maximum=max(maximum,error)
deps=bpy.context.evaluated_depsgraph_get();rays=[];cfg=bed['configuration']
for tv in cfg['tvs']:
    eyes=tv['eyes']+([cfg['desk']['tv_eye']]if tv['id']=='sofa'else[])
    for eye in eyes:
        for u,v in((0,0),(-.45,-.45),(-.45,.45),(.45,-.45),(.45,.45)):
            target=Vector((tv['center'][0]+tv.get('screenOffsetX',0)+u*tv['screen_m'][0],tv['center'][1],cfg['floor_z']+tv['height_m']+v*tv['screen_m'][1]))
            delta=target-Vector(eye);hit,loc,n,f,ob,m=scene.ray_cast(deps,Vector(eye),delta.normalized(),distance=delta.length+.06)
            name=ob.get('source_name',ob.name)if hit else None
            assert hit and name.startswith('Bedroom 02 | '+tv['id']+' TV screen'),(eye,list(target),name)
            rays.append({'group':tv['id'],'eye':eye,'hit':name})
privacy=[]
for test in bath['native_privacy_rays']:
    delta=Vector(test['target'])-Vector(test['eye']);hit,loc,n,f,ob,m=scene.ray_cast(deps,Vector(test['eye']),delta.normalized(),distance=delta.length)
    name=ob.get('source_name',ob.name)if hit else ''
    assert hit and any(name.startswith('Ensuite 01 | '+s)for s in('WC privacy return','bathroom door open','bathroom dividing wall')),name
    privacy.append(name)
out=ROOT/'revisions/interiors-principal-integration-2026-09-27'/variant;out.mkdir(exist_ok=True)
report={'status':'PASS','variant':variant,'accepted_meshes_matched':sum(map(len,accepted.values())),'maximum_vertex_difference_m':maximum,'full_house_tv_rays':len(rays),'full_house_privacy_rays':len(privacy),'read_only':True}
(out/'native-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('FULL_SUITE_NATIVE_AUDIT',report,flush=True)
