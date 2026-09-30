"""Native formal-room checks: full moving door meshes against room fixtures."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,math,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
from mathutils.geometry import convex_hull_2d
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1]
out=ROOT/f'revisions/interiors-overnight-2026-09-27/formal/{variant}';native=out/'Formal — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def shape(v,f):
    return {'v':v,'f':f,'bounds':[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)],'tree':BVHTree.FromPolygons(v,f)}
def clash(a,b):
    return all(min(a['bounds'][i+3],b['bounds'][i+3])-max(a['bounds'][i],b['bounds'][i])>.0005 for i in range(3))and bool(a['tree'].overlap(b['tree']))
items=[]
for ob in scene.objects:
    if ob.type!='MESH':continue
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:v=[ev.matrix_world@p.co for p in mesh.vertices];f=[tuple(p.vertices)for p in mesh.polygons]
    finally:ev.to_mesh_clear()
    if v:items.append({**shape(v,f),'name':ob.get('source_name',ob.name),'modelName':ob.get('model_object_name',ob.name),'authored':ob.get('interior_room')=='formal','chair':ob.get('formal_chair',-1)})
chairs=[]
for i in range(6):
    parts=[p for p in items if p['chair']==i];assert len(parts)>=12,(i,len(parts))
    v=[v for p in parts for v in p['v']];size=[max(p[k]for p in v)-min(p[k]for p in v)for k in range(3)]
    width,depth=(size[0],size[1])if i<4 else(size[1],size[0]);assert width<=.502 and depth<=.542,(i,width,depth)
    chairs.append({'chair':i,'width':width,'depth':depth,'height':size[2],'parts':len(parts)})
stored=[p for p in items if p['name'].startswith(('Formal 01 | stored extension leaf','Formal 01 | stored folding guest chair'))]
assert len(stored)>40
for p in stored:
    bb=p['bounds'];assert bb[0]>13.305 and bb[3]<13.845 and bb[1]>1.47 and bb[4]<3.13 and bb[2]>.153 and bb[5]<.868,(p['name'],bb)
nav=json.loads((out/'preview-navigation.json').read_text())
doors=[d for d in nav['interactiveDoors']if d['id'].startswith(('Formal 01 |','Drawing rear detail |','Dining rear detail |'))]
all_moving={name for d in doors for name in d['members']}
fixed=[p for p in items if p['modelName']not in all_moving and(p['authored']or p['name'].startswith(('Dining hall doors |','Drawing hall partition |','Dining wall v2 |','Dining detail | West dining display','Dining southwest')))]
reports=[];failures=[];open_hulls=[]
for door in doors:
    moving=[p for p in items if p['modelName']in door['members']];assert len(moving)==len(door['members']),(door['id'],len(moving),len(door['members']))
    hinge=Vector(door['hinge']);hits=[]
    for step in range(91):
        angle=door['openDelta']*step/90;tr=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge)
        for p in moving:
            moved=shape([tr@v for v in p['v']],p['f'])
            for other in fixed:
                if clash(moved,other):hits.append({'step':step,'angleDegrees':round(math.degrees(angle),3),'moving':p['name'],'fixed':other['name']})
    if hits:failures.extend(hits)
    reports.append({'door':door['id'],'meshes':len(moving),'positions':91,'clashes':hits})
    if door['id'].startswith('Formal 01 |'):
        points=[Vector(tuple((tr@v)[:2]))for p in moving for v in p['v']];hull=[list(points[i])for i in convex_hull_2d(points)]
        open_hulls.append({'name':door['id'],'polygon':hull,'openDelta':door['openDelta'],'members':len(moving)})
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
result={'status':'REWORK'if failures else'PASS','variant':variant,'sourceUnchanged':True,'sourceSha256':digest,'doorSweeps':reports,'note':'New oak hall doors are tested from fully shut to fully open. Retained rear garden doors are tested through their complete opening. Complete furnishing geometry is included.'}
result.update(chairGeometry=chairs,storedChairAndLeafParts=len(stored))
(out/'details-audit.json').write_text(json.dumps(result,indent=2)+'\n')
(out/'open-hall-doors.json').write_text(json.dumps(open_hulls,indent=2)+'\n')
if variant=='compact':(out.parent/'open-hall-doors.json').write_text(json.dumps(open_hulls,indent=2)+'\n')
print(result['status'],'formal native door movements',len(doors),'doors',len(failures),'clashes',flush=True)
for hit in failures[:15]:print(hit)
assert not failures
