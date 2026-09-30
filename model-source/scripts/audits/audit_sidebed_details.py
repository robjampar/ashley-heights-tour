"""Side-wing pair: native furniture fit, rebuilt junctions and complete doors."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/sidebed/{variant}';native=out/'Sidebed — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest()
cfg=json.loads((ROOT/'proposal/interiors/leisure/sidebed.json').read_text());bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):return{'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
    if ob.type!='MESH':continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
    finally:ev.to_mesh_clear()
    if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='sidebed','component':ob.get('suite_component')})
bed=[p for p in items if p['component']=='bed'];assert len(bed)>12
vv=[v for p in bed for v in p['v']];bb=[min(v[i]for v in vv)for i in range(3)]+[max(v[i]for v in vv)for i in range(3)];a,s,c,n=cfg['bed']['envelope']
assert bb[0]>=a-.003 and bb[3]<=c+.003 and bb[1]>=s-.003 and bb[4]<=n+.003,bb
wardrobe=[p for p in items if p['name'].startswith(('Sidebed 01 | wardrobe ','Sidebed 01 | sliding wardrobe','Sidebed 01 | wooden clothes hanger','Sidebed 01 | hanger hook','Sidebed 01 | folded wardrobe'))]
wardrobe_min_y=min(v.y for p in wardrobe for v in p['v']);assert wardrobe_min_y>=2.375,('Wardrobe overlaps the retained west-window aperture',wardrobe_min_y)
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Sidebed 01 |')];assert len(doors)==3
moving_names={name for d in doors for name in d['members']}
fixed=[p for p in items if p['modelName']not in moving_names and(p['authored']or p['name'].startswith(('Proposal | Side bedrooms','Proposal | Side hall','Proposal | Side bedroom south hall','Proposal | Side shared bathroom north')))]
reports=[];failures=[]
for door in doors:
    moving=[p for p in items if p['modelName']in door['members']];assert len(moving)==len(door['members']),(door['id'],len(moving),len(door['members']))
    hinge=Vector(door['hinge']);hits=[];poses={}
    for step in range(91):
        angle=door['openDelta']*step/90;tr=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);parts=[]
        for p in moving:
            moved=shape([tr@v for v in p['v']],p['f'])
            for other in fixed:
                if p['name']=='Sidebed 01 | shower door hinge'and other['name']in('Sidebed 01 | shower north corner channel','Sidebed 01 | shower short north return'):continue
                if clash(moved,other):hits.append({'step':step,'degrees':math.degrees(angle),'moving':p['name'],'fixed':other['name']})
            if step in(0,90):
                points=[Vector(tuple(v[:2]))for v in moved['v']];hull=[list(points[i])for i in convex_hull_2d(points)];parts.append({'name':p['name'],'polygon':hull,'bottom':moved['bounds'][2],'top':moved['bounds'][5]})
        if step in(0,90):poses['closed'if step==0 else'open']=parts
    failures.extend(hits);reports.append({'door':door['id'],'members':len(moving),'positions':91,'clashes':hits,'poses':poses})
# Solid infills must meet the moved east partition with no vertical crack.
junction=[]
parts=[p for p in items if p['name']in('Sidebed 01 | shifted ensuite east partition','Sidebed 01 | hall west jamb infill','Sidebed 01 | ensuite south east pier')]
for x,y in((-2.88,4.28),(-2.83,4.28),(-2.88,3.04),(-2.90,5.06)):
    hits=[]
    for p in parts:
        loc,normal,index,d=p['tree'].ray_cast(Vector((x,y,5.24)),Vector((0,0,-1)),.2)
        if loc is not None:hits.append(p['name'])
    assert hits,('open partition junction',x,y);junction.append({'point':[x,y],'hits':hits})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
lining=[]
for yy,zz in((1.025,3.2),(4.212,4.6),(2.0,5.12)):
    hit,loc,normal,face,ob,matrix=scene.ray_cast(deps,Vector((-.4,yy,zz)),Vector((1,0,0)),distance=.5)
    name=ob.get('source_name',ob.name)if hit else None
    assert name=='Sidebed 01 | east ivory wall lining',(yy,zz,name)
    assert all('warm ivory'in mat.name for mat in ob.data.materials)
    lining.append({'point':[-.4,yy,zz],'hit':name})
result={'status':'REWORK'if failures else'PASS','variant':variant,'westWindowWardrobeClearance':wardrobe_min_y-2.37,'bedBounds':bb,'doorSweeps':reports,'junctionRays':junction,'sourceSha256':digest,'sourceUnchanged':True}
result['ivoryWallRays']=lining
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n');print(result['status'],'side bedroom',len(failures),'clashes',flush=True)
for hit in failures[:20]:print(hit)
assert not failures
