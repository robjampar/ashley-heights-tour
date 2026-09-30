"""Evaluated family-lounge furniture and retained terrace-door movement checks."""

# Support direct Python/Blender entry points as well as package imports.
import sys as _sys
from pathlib import Path as _Path
_sys.path.insert(0, str(_Path(__file__).resolve().parents[2]))
import bpy,json,sys,math,hashlib
from pathlib import Path
from mathutils import Vector,Matrix
ROOT=Path(__file__).resolve().parents[2];variant=sys.argv[sys.argv.index('--')+1];out=ROOT/f'revisions/interiors-overnight-2026-09-27/family/{variant}'
native=out/'Family — interior study.blend';digest=hashlib.sha256(native.read_bytes()).hexdigest();cfg=json.loads((ROOT/'proposal/interiors/leisure/family.json').read_text())
bpy.ops.wm.open_mainfile(filepath=str(native));scene=next(s for s in bpy.data.scenes if'interior study'in s.name);bpy.context.window.scene=scene;scene.view_layers[0].update();deps=bpy.context.evaluated_depsgraph_get()
def vertices(ob):
 ev=ob.evaluated_get(deps);mesh=ev.to_mesh()
 try:return [ev.matrix_world@v.co for v in mesh.vertices]
 finally:ev.to_mesh_clear()
def bb(v):return [min(p[i]for p in v)for i in range(3)]+[max(p[i]for p in v)for i in range(3)]
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
   if min(max(aa),max(bb))-max(min(aa),min(bb))<.0005:return False
 return True
parts={};model_parts={};authored=set()
for ob in scene.objects:
 if ob.type!='MESH':continue
 name=ob.get('source_name',ob.name);vv=vertices(ob);parts.setdefault(name,[]).extend(vv)
 model_parts[ob.get('model_object_name',name)]=vv
 if ob.get('interior_room')=='family':authored.add(name)
nav=json.loads((out/'preview-navigation.json').read_text());doors=[d for d in nav['interactiveDoors']if d['id'].startswith('Proposal | Terrace access ')];assert len(doors)==(2 if variant=='compact'else 0)
moving=set(n for d in doors for n in d['members']);fixed={n:(bb(v),hull(v))for n,v in parts.items()if n in authored and n not in moving};sweeps=[];opened=[]
for d in doors:
 assert len(d['members'])==len(set(d['members'])) and len(d['members'])==9,(d['id'],d['members'])
 hinge=Vector(d['hinge']);samples=[]
 for step in range(91):
  angle=d['openDelta']*step/90;transform=Matrix.Translation(hinge)@Matrix.Rotation(angle,4,'Z')@Matrix.Translation(-hinge);clashes=[]
  for name in d['members']:
   vv=[transform@p for p in model_parts.get(name,parts.get(name,[]))];bounds=bb(vv);poly=hull(vv)
   for n,(other,outline)in fixed.items():
    if all(min(bounds[i+3],other[i+3])-max(bounds[i],other[i])>.0005 for i in range(3))and overlap(poly,outline):clashes.append((name,n))
   if step==90:opened.append({'name':name,'box':[bounds[0],bounds[1],bounds[3],bounds[4]],'bottom':bounds[2],'top':bounds[5]})
  assert not clashes,(d['id'],step,clashes)
  if step%15==0:samples.append({'degrees':math.degrees(angle),'fixtureClashes':clashes})
 sweeps.append({'door':d['id'],'members':len(d['members']),'samples':samples})
# Check full physical envelopes, not the nominal seat or tabletop dimensions.
footprints={}
for key,terms in {'sofa':('sofa ','rounded sofa arm','left sofa linen cushion','right sofa ivory cushion','draped sofa throw','left arm oak drinks tray'),'desk':('writing desk','desk leg','desk levelling','rear stationery','stationery drawer'),'chair':('desk chair',),'storage':('storage ','book and games shelf','sliding low storage','board game box','game box lid seam','bound book spine','book page block')}.items():
 vv=[p for n in authored if n.startswith(tuple('Family 01 | '+t for t in terms)) and not any(t in n for t in('sofa side table','sofa reading light','sofa reading glow'))for p in parts[n]]
 bounds=bb(vv);a,s,c,n=cfg[key];assert bounds[0]>=a-.005 and bounds[1]>=s-.005 and bounds[3]<=c+.005 and bounds[4]<=n+.005,(key,bounds,cfg[key]);footprints[key]=bounds
assert hashlib.sha256(native.read_bytes()).hexdigest()==digest
report={'status':'PASS','variant':variant,'nativeSha256':digest,'sourceUnchanged':True,'sweepAnglesPerDoor':91,'doorSweeps':sweeps,'openDoorParts':opened,'furnitureBounds':footprints,'note':'Sampled concept geometry; retained hinges/openings, with new handles attached to the original leaves.'}
(out/'details-audit.json').write_text(json.dumps(report,indent=2)+'\n');print('PASS family physical envelopes and terrace door sweeps',variant)
