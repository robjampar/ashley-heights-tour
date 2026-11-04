"""Read-only verification of proposed native finishes and unchanged architecture."""
import json,hashlib,sys
from pathlib import Path
import numpy as np
import trimesh
from shapely.geometry import box,Polygon
from shapely.ops import unary_union
R=Path(__file__).resolve().parents[2];sys.path.insert(0,str(R))
from scripts.build.build_support import source_hashes
from scripts.structure.build_study import triangulate,footprint
from scripts.structure.junctions import solid
P=R/'outputs/output-structural-fit-compact';O=R/'revisions/structural-overnight-2026-10-27/original/outputs/output-proposed-compact';E=R/'walkthrough/test-results/structural-overnight-2026-10-27'
g=json.loads((P/'geometry.json').read_text());n=json.loads((P/'navigation.json').read_text());report=n['structuralFinishCoordination'];old=json.loads((O/'geometry.json').read_text());cfg=json.loads((R/'proposal/specs/structural-finish-coordination.json').read_text())
newby={o['object_name']:o for o in g['objects']};oldby={o['object_name']:o for o in old['objects']};changed=set(report['changed']+report['removed']);failures=[]
assert report==g['proposal']['structuralFinishCoordination'];assert json.loads((P/'source-inputs.json').read_text())==source_hashes(R,'compact')
preserved=[]
for name,o in oldby.items():
 if name not in changed:assert newby.get(name)==o,name;preserved.append(name)
for d in n['interactiveDoors']:assert set(d['members'])<=set(newby),d['id']
oldnav=json.loads((O/'navigation.json').read_text())
levels=sorted(set(s['z']for s in oldnav['surfaces']))
assert levels==sorted(set(s['z']for s in n['surfaces']))
for z in levels:
 before=unary_union([Polygon(s['polygon'])for s in oldnav['surfaces']if s['z']==z])
 after=unary_union([Polygon(s['polygon'])for s in n['surfaces']if s['z']==z])
 expected=before.difference(box(*cfg['basementStairOpening']['new']))if abs(z)<.05 else before
 assert expected.symmetric_difference(after).area<1e-7,('Unreviewed navigation floor change',z)

# Check real ventilation apertures, not only the service cabinet's envelope.
# A shortening must keep the cut-outs and louvres aligned in both vent zones.
service=[(o['object_name'],np.asarray(triangulate(o)).reshape(-1,3,3))for o in g['objects']if o['object_name'].startswith('Prep kitchen | service ')and o['vertices']]
def service_hits(y,z):
 hits=[]
 for name,tri in service:
  for t in tri:
   uv=np.column_stack((t[1,1:]-t[0,1:],t[2,1:]-t[0,1:]))
   if abs(np.linalg.det(uv))<1e-10:continue
   a,b=np.linalg.solve(uv,np.array([y,z])-t[0,1:])
   if a<-1e-7 or b<-1e-7 or a+b>1+1e-7:continue
   x=t[0,0]+a*(t[1,0]-t[0,0])+b*(t[2,0]-t[0,0])
   if -1<x<-.76:hits.append(name);break
 return hits
vent_tests=[]
for i in range(4):
 y=1.046+(i+.5)*(3.474-1.046)/4
 for z in (.1915,2.1666):
  aperture=service_hits(y,z);slat=service_hits(y,z+.0385)
  assert not aperture,('Blocked service ventilation',i,z,aperture)
  assert slat,('Missing ventilation louvre',i,z)
  vent_tests.append({'panel':i+1,'slotZ':z,'clear':True,'louvrePresent':True})

frames=json.loads((R/'walkthrough/public/structure/members.json').read_text())['elements']
frames=[(e,footprint(e['triangles'])) for e in frames if (e['category']in('beams','joists','trimmers')and e.get('axis')and abs(e['axis'][0][2]-e['axis'][1][2])<.001)or e.get('slabCoordination')]
measured=[]
closed_checks=[]
record_names={r['sourceObject']:r['objectName']for r in report['operations']}
for body in cfg.get('closedFinishMeshes',[]):
 name=record_names[body['sourceObject']];mesh=newby[name];tri=triangulate(mesh)
 vertices=np.asarray(tri);closed=trimesh.Trimesh(vertices=vertices,faces=np.arange(len(vertices)).reshape(-1,3),process=True)
 assert closed.is_watertight and closed.is_winding_consistent,('Broken covering mesh',name)
 shape=solid(tri);area=footprint(tri).area;volume=shape.volume()
 check={'objectName':name,'sourcePlanAreaM2':body['sourcePlanAreaM2'],'expectedPlanAreaM2':body['expectedPlanAreaM2'],
        'actualPlanAreaM2':area,'expectedVolumeM3':body['expectedVolumeM3'],'actualVolumeM3':volume,
        'passed':abs(area-body['expectedPlanAreaM2'])<2e-5 and abs(volume-body['expectedVolumeM3'])<2e-5}
 closed_checks.append(check)
 if not check['passed']:failures.append({'covering':name,'failure':'Closed mesh changed its reviewed area or volume',**check})
for o in report['operations']:
 name=o['objectName'];mesh=newby[name];v=np.array(mesh['vertices']);lo,hi=v.min(0),v.max(0)
 if o['kind']in('floor-body','basement-finish'):
  assert abs(hi[2]-o['before'][1][2])<1e-5,name
  assert mesh['structural_floor_datum'],name
 if o['kind']not in('floor-body','basement-finish','ceiling-body','ceiling-finish'):continue
 p=footprint(triangulate(mesh))
 for e,q in frames:
  a,b=e['bounds'];dz=min(hi[2],b[2])-max(lo[2],a[2])
  if hi[2]-lo[2]<1e-5 and a[2]+1e-5<lo[2]<b[2]-1e-5:dz=1e-4
  if dz>1e-5 and p.intersection(q).area>1e-5:failures.append({'covering':name,'memberId':e['id'],'penetrationMm':dz*1000})
 measured.append(name)
result={'passed':not failures,'geometrySHA256':hashlib.sha256((P/'geometry.json').read_bytes()).hexdigest(),'preservedUnrelatedObjects':len(preserved),'changed':len(report['changed']),'originalSharedObjectsCloned':report['removed'],'coveringsChecked':len(measured),'closedFinishMeshes':closed_checks,'coveringHorizontalFrameClashes':failures,'scope':'Closed covering solids checked against reviewed source-plan areas and volumes; exact authored covering footprints and real horizontal member elevations; unchanged FFL; only the reviewed basement stair opening changes navigation surfaces, interactive door members and unrelated geometry records. Pitched roof, wall/furniture/joint capacities are separate checks.'}
result['serviceVentilation']=vent_tests
(E/'native-geometry-check.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items()if k!='closedFinishMeshes'}))
assert not failures
