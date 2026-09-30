"""Read-only checks of furniture footprints, floor contact, doors and bridge height."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/hobby/{variant}';native=out/'Hobby — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/hobby.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
    if ob.type!='MESH':continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
    finally:ev.to_mesh_clear()
    if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='hobby','component':ob.get('hobby_component')})
footprints=[]
for component,bb in[('project chair 0',cfg['chairs'][0]),('project chair 1',cfg['chairs'][1]),('reading chair',cfg['readingChair']),('sofa',cfg['sofa'])]:
    parts=[p for p in items if p['component']==component];assert parts,component
    vv=[v for p in parts for v in p['v']];actual=[min(v.x for v in vv),min(v.y for v in vv),max(v.x for v in vv),max(v.y for v in vv)]
    assert actual[0]>=bb[0]-.003 and actual[1]>=bb[1]-.003 and actual[2]<=bb[2]+.003 and actual[3]<=bb[3]+.003,(component,actual,bb)
    footprints.append({'component':component,'bounds':actual,'declared':bb})
feet=[]
for p in items:
    if p['authored']and(p['name'].endswith(' oak leg')or p['name']=='Hobby 01 | castor rubber wheel'):
        assert abs(p['bounds'][2]-(cfg['floorZ']+.004))<.002,(p['name'],p['bounds'][2]);feet.append({'name':p['name'],'bottom':p['bounds'][2]})
assert len(feet)==16,len(feet)
roof=[p for p in items if p['name'].startswith('Proposal | Joined roof lining ')]
roof_clashes=[]
for p in items:
    if not p['authored']or p['name'].startswith(('Hobby 01 | bridge','Hobby 01 | oak hobby floor','Hobby 01 | archive oak floor','Hobby 01 | landing oak floor','Hobby 01 | eaves store oak floor')):continue
    for r in roof:
        if clash(p,r):roof_clashes.append([p['name'],r['name']])
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Hobby 01 |')];assert len(doors)==2
moving_names={name for d in doors for name in d['members']};fixed=[p for p in items if p['modelName']not in moving_names and(p['authored']or p['name'].startswith(('Proposal | Original loft','Proposal | Loft passage','Proposal | Loft west store wall','Proposal | Joined roof lining')))]
reports=[];failures=[]
for d in doors:
    moving=[p for p in items if p['modelName']in d['members']];assert len(moving)==len(d['members'])
    hinge=Vector(d['hinge']);hits=[];poses={}
    for step in range(91):
        angle=d['openDelta']*step/90;tr=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);parts=[]
        for p in moving:
            moved=shape([tr@v for v in p['v']],p['f'])
            for other in fixed:
                if clash(moved,other):hits.append({'step':step,'moving':p['name'],'fixed':other['name']})
            if step in(0,90):
                points=[Vector(tuple(v[:2]))for v in moved['v']];parts.append({'name':p['name'],'polygon':[list(points[i])for i in convex_hull_2d(points)],'bottom':moved['bounds'][2],'top':moved['bounds'][5]})
        if step in(0,90):poses['closed'if step==0 else'open']=parts
    failures.extend(hits);reports.append({'door':d['id'],'positions':91,'members':len(moving),'clashes':hits,'poses':poses})
# This is deliberately reported separately from the full-height dormer room.
bridge=[]
for yy in(-3.5,-2.75,-2,-1.25,-.5,.25,1,1.75,2.5,3.25):
    for xx in(8.82,8.92,9.02):
        hit,foot,*_=scene.ray_cast(deps,Vector((xx,yy,5.7)),Vector((0,0,-1)),distance=.5);assert hit,(xx,yy,'missing bridge floor')
        hits=[]
        for r in roof:
            loc,normal,index,dist=r['tree'].ray_cast(Vector((xx,yy,5.7)),Vector((0,0,1)),3)
            if loc is not None:hits.append((loc.z,r['name']))
        assert hits,(xx,yy,'missing bridge lining');height,name=min(hits);bridge.append({'xy':[xx,yy],'floor':foot.z,'headroom':height-foot.z,'roof':name})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or roof_clashes else'PASS','variant':variant,'footprints':footprints,'floorContactParts':feet,'roofClashes':roof_clashes,'doorSweeps':reports,'bridge':{'samples':bridge,'minimum':min(r['headroom']for r in bridge),'fullHeightRoute':False,'note':'Retained route below 2 m; review separately from the hobby room.'},'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'hobby',len(failures),'door clashes',len(roof_clashes),'roof clashes; bridge min',result['bridge']['minimum'],flush=True)
for hit in failures[:12]+roof_clashes[:12]:print(hit)
assert not failures and not roof_clashes
