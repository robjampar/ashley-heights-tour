"""Measured evaluated meshes: shower sweep, bowl recess and door metadata."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,math,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/guestbath/{variant}'
native=out/'Guestbath — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/guestbath.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def vertices(ob):
    ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
    try:return [ev.matrix_world@v.co for v in mesh.vertices]
    finally:ev.to_mesh_clear()
def bb(v):return[min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)]
def hull(verts):
    pts=sorted(set((round(v.x,7),round(v.y,7))for v in verts))
    def cross(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
    sides=[]
    for seq in(pts,list(reversed(pts))):
        chain=[]
        for p in seq:
            while len(chain)>1 and cross(chain[-2],chain[-1],p)<=0:chain.pop()
            chain.append(p)
        sides.extend(chain[:-1])
    return sides

def overlap(a,b):
    for poly in(a,b):
        for j,p in enumerate(poly):
            q=poly[(j+1)%len(poly)];axis=(q[1]-p[1],p[0]-q[0]);mag=math.hypot(*axis)
            if mag<1e-8:continue
            aa=[(v[0]*axis[0]+v[1]*axis[1])/mag for v in a];bb=[(v[0]*axis[0]+v[1]*axis[1])/mag for v in b]
            if min(max(aa),max(bb))-max(min(aa),min(bb))<.0002:return False
    return True

def distance(point,poly):
    inside=True;best=99
    for j,p in enumerate(poly):
        q=poly[(j+1)%len(poly)];dx=q[0]-p[0];dy=q[1]-p[1];u=max(0,min(1,((point[0]-p[0])*dx+(point[1]-p[1])*dy)/(dx*dx+dy*dy)))
        best=min(best,math.hypot(point[0]-p[0]-u*dx,point[1]-p[1]-u*dy))
        if dx*(point[1]-p[1])-dy*(point[0]-p[0])<0:inside=False
    return 0 if inside else best
parts={}
for ob in scene.objects:
    if ob.type=='MESH'and ob.get('interior_room')=='guestbath':parts.setdefault(ob.get('source_name',ob.name),[]).extend(vertices(ob))
nav=json.loads((out/'preview-navigation.json').read_text());door=next(d for d in nav['interactiveDoors']if d['id']=='Guestbath 01 | shower door');assert len(door['openingCenter'])==3
assert len(door['members'])==len(set(door['members']))
fixed={n:(bb(v),hull(v))for n,v in parts.items()if n not in door['members']}
standing=[8.15,5.85];hinge=Vector(door['hinge']);minimum=99;sweeps=[]
for step in range(91):
    angle=door['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);clashes=[];clearance=99
    for name in door['members']:
        vv=[transform@p for p in parts[name]];bounds=bb(vv);poly=hull(vv);clearance=min(clearance,distance(standing,poly))
        for n,(other,outline)in fixed.items():
            if min(bounds[5],other[5])-max(bounds[2],other[2])<.0002:continue
            if all(min(bounds[i+3],other[i+3])-max(bounds[i],other[i])>.0002 for i in range(2))and overlap(poly,outline):clashes.append((name,n))
    assert not clashes,(step,clashes)
    assert clearance>=.30,(step,clearance);minimum=min(minimum,clearance)
    if step%15==0:sweeps.append({'degrees':math.degrees(angle),'standingBodyClearance':clearance-.30,'fixtureClashes':clashes})
# Native opening at the glass edge is at least the declared net opening.
assert cfg['shower']['clearEntry']>=.612
closedleaf=bb(parts['Guestbath 01 | shower door glass']);assert closedleaf[2]>2.828
basin=parts['Guestbath 01 | hollow inset ceramic basin'];bowl=bb(basin);assert bowl[5]-bowl[2]>.17
assert not any(n.startswith(('Principal west-wall vanity','Principal south shower','Principal en suite toilet'))for n in parts)
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'showerDoorMembers':len(door['members']),'sweepAnglesChecked':91,'standingPosition':standing,'bodyWidth':.6,'minimumBodyToMovingPartClearance':minimum-.3,'sweeps':sweeps,'basinDepth':bowl[5]-bowl[2],'doorBottom':closedleaf[2],'note':'Concept geometry, not a selected enclosure or construction clearance approval.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS guest ensuite door sweep and standing body',variant,minimum-.3)
