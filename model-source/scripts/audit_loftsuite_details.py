"""Native loft details: complete door sweeps, actual roof clearance and basin well."""
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[1];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/loftsuite/{variant}';native=out/'Loftsuite — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest()
cfg=json.loads((ROOT/'proposal/interiors/leisure/loftsuite.json').read_text());bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
    if ob.type!='MESH':continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
    finally:ev.to_mesh_clear()
    if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='loftsuite','component':ob.get('suite_component')})
bed=[p for p in items if p['component']=='bed'];assert len(bed)>12
vv=[v for p in bed for v in p['v']];bb=[min(v[i]for v in vv)for i in range(3)]+[max(v[i]for v in vv)for i in range(3)];a,s,c,n=cfg['bed']['envelope'];assert bb[0]>=a-.003 and bb[3]<=c+.003 and bb[1]>=s-.003 and bb[4]<=n+.003,bb
roof=[p for p in items if p['name'].startswith('Proposal | Joined roof lining ')]
roof_clashes=[];clearances=[]
for part in items:
    if not part['authored'] or not any(t in part['name']for t in('wardrobe','eaves','hip store oak','hip store shelf','hip store linen','linen box','rain shower','shower riser','headwall'))and part['component']!='bed':continue
    for r in roof:
        if clash(part,r):roof_clashes.append([part['name'],r['name']])
    for v in part['v']:
        hits=[]
        for r in roof:
            loc,normal,index,dist=r['tree'].ray_cast(Vector((v.x,v.y,cfg['floorZ']+.002)),Vector((0,0,1)),3)
            if loc is not None:hits.append(loc.z)
        if hits and v.z>min(hits)+.001:roof_clashes.append([part['name'],'vertex above inner roof',list(v),min(hits)])
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Loftsuite 01 |')];assert len(doors)==4
moving_names={name for d in doors for name in d['members']}
fixed=[p for p in items if p['modelName']not in moving_names and(p['authored']or p['name'].startswith(('Proposal | Loft suite','Proposal | Loft ensuite north','Proposal | Loft hip store wall','Proposal | Wing dormer','Proposal | Joined roof lining')))]
reports=[];failures=[]
for door in doors:
    moving=[p for p in items if p['modelName']in door['members']];assert len(moving)==len(door['members']),(door['id'],len(moving),len(door['members']))
    hinge=Vector(door['hinge']);hits=[];poses={}
    for step in range(91):
        angle=door['openDelta']*step/90;tr=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);parts=[]
        for p in moving:
            moved=shape([tr@v for v in p['v']],p['f'])
            for other in fixed:
                if p['name']=='Loftsuite 01 | shower door hinge'and other['name']in('Loftsuite 01 | shower north west channel','Loftsuite 01 | shower north glass','Loftsuite 01 | shower west short north return'):continue
                if clash(moved,other):hits.append({'step':step,'degrees':math.degrees(angle),'moving':p['name'],'fixed':other['name']})
            if step in(0,90):
                points=[Vector(tuple(v[:2]))for v in moved['v']];hull=[list(points[i])for i in convex_hull_2d(points)];parts.append({'name':p['name'],'polygon':hull,'bottom':moved['bounds'][2],'top':moved['bounds'][5]})
        if step in(0,90):poses['closed'if step==0 else'open']=parts
    failures.extend(hits);reports.append({'door':door['id'],'members':len(moving),'positions':91,'clashes':hits,'poses':poses})
well=[]
for dx,dy in((0,0),(.07,0),(-.07,0),(0,.045),(0,-.045)):
    point=Vector((10.3+dx,-9.705+dy,6.43));hit,loc,normal,face,ob,matrix=scene.ray_cast(deps,point,Vector((0,0,-1)),distance=.4)
    name=ob.get('source_name',ob.name)if hit else None
    assert hit and name.startswith(('Loftsuite 01 | hollow ceramic basin','Loftsuite 01 | basin bronze pop-up waste')),(name,list(loc));assert loc.z<6.36,list(loc)
    well.append({'origin':list(point),'hit':name,'z':loc.z})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures or roof_clashes else'PASS','variant':variant,'bedBounds':bb,'doorSweeps':reports,'roofClashes':roof_clashes,'basinWell':well,'sourceSha256':digest,'sourceUnchanged':True}
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'loft suite',len(failures),'door clashes',len(roof_clashes),'roof clashes',flush=True)
for hit in failures[:15]:print(hit)
for hit in roof_clashes[:15]:print(hit)
assert not failures and not roof_clashes
