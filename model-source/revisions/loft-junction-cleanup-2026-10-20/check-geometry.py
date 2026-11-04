"""Check actual exported triangles and preserve untouched scene records."""
import json,sys,numpy as np
from pathlib import Path
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
ROOT=Path(__file__).resolve().parents[2]
REV='loft-junction-cleanup-2026-10-20'
class Rays:
 def __init__(self,objects):
  triangles=[];names=[];materials=[]
  for o in objects:
   vs=o['vertices']
   for f,mi in zip(o['faces'],o['face_materials']):
    pts=[Vector(vs[i])for i in f]
    # Use the same Blender tessellator as the GLB export. Boolean aperture
    # faces are concave: a triangle fan falsely fills their cut-outs.
    for tri in tessellate_polygon([pts]):
     triangles.append([list(pts[p] if isinstance(p,int) else p)for p in tri])
     names.append(o['object_name']);materials.append(o['materials'][mi])
  self.t=np.array(triangles);self.names=names;self.materials=materials
  self.e1=self.t[:,1]-self.t[:,0];self.e2=self.t[:,2]-self.t[:,0]
 def hits(self,p,d):
  d=np.array(d);h=np.cross(d,self.e2);a=np.einsum('ij,ij->i',self.e1,h);valid=np.abs(a)>1e-10;f=np.divide(1,a,out=np.zeros_like(a),where=valid);s=np.array(p)-self.t[:,0];u=f*np.einsum('ij,ij->i',s,h);q=np.cross(s,self.e1);v=f*(q@d);t=f*np.einsum('ij,ij->i',self.e2,q);ok=valid&(u>=-1e-7)&(v>=-1e-7)&(u+v<=1+1e-7)&(t>1e-7)
  ids=sorted(np.where(ok)[0],key=lambda k:t[k]);return [(float(t[k]),self.names[k],self.materials[k])for k in ids]
def bounds(o):
 v=np.array(o['vertices']);return [*v.min(axis=0),*v.max(axis=0)]
reports=[]
variants=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
for variant in variants or ['compact','planning']:
 out=ROOT/f'outputs/output-loft-junction-{variant}'
 old=json.loads((ROOT/f'revisions/{REV}/original/outputs/output-proposed-{variant}/geometry.json').read_text())
 g=json.loads((out/'geometry.json').read_text());obs={o['object_name']:o for o in g['objects']}
 oldobs={o['object_name']:o for o in old['objects']}
 report=json.loads((out/'finish-report.json').read_text());allowed=set(report['changed']+report['removed']);unexpected=[]
 for name,o in oldobs.items():
  if name not in allowed and obs.get(name)!=o:unexpected.append(name)
 assert not unexpected,unexpected
 n=json.loads((out/'navigation.json').read_text());before=json.loads((ROOT/f'revisions/{REV}/original/outputs/output-proposed-{variant}/navigation.json').read_text())
 assert n['levelLoftStair']['routes']==before['levelLoftStair']['routes']
 assert n['levelLoftStair']['upperRoutes']==before['levelLoftStair']['upperRoutes']
 knee1=bounds(obs['Proposal | Original loft front knee wall 1']);knee2=bounds(obs['Proposal | Original loft front knee wall 2'])
 assert knee1[5]>6.9 and abs(knee2[3]-5.8)<1e-5
 leaf=next(o for name,o in obs.items()if 'Loft bedroom expansion | 085 Suite' in name);bb=bounds(leaf)
 assert abs(bb[4]-bb[1]-.826)<1e-5 and abs(bb[5]-bb[2]-2.032)<1e-5
 jambs=[o for name,o in obs.items()if 'Loft bedroom expansion' in name and 'Suite oak jamb lining' in name];jambs.sort(key=lambda o:bounds(o)[0])
 left,right=map(bounds,jambs)
 assert bounds(obs['Proposal | Loft bedroom expansion | entrance left pier'])[3] <= left[0]-.0019
 assert bounds(obs['Proposal | Loft bedroom expansion | entrance right pier'])[0] >= right[3]+.0019
 door=next(d for d in n['interactiveDoors']if d['id']=='Proposal | Level loft | suite door')
 hinge=door['hinge'];closed_left=hinge[0]-.826;closed_right=hinge[0]
 assert closed_left>left[3]+.003 and closed_right<right[0]-.002
 roofobs=[o for name,o in obs.items()if name.startswith(('Proposal | Joined roof','Proposal | Roof weathering | wing dormer link')) or 'Rooflight reveal' in name or 'Rooflight glass' in name]
 # Actual part names have lowercase rooflight in these exports.
 roofobs += [o for name,o in obs.items()if name.startswith('Proposal | Level loft |') and any(s in name.lower()for s in ('rooflight','continuous 2.05')) and o not in roofobs]
 rays=Rays(roofobs);roofchecks=0
 for x0,y0,x1,y1 in n['levelLoftStair']['roof']['rooflights']:
  for yy in (y0+.05,(y0+y1)/2,y1-.05):
   hits=rays.hits(((x0+x1)/2,yy,7.605),(0,0,1))
   solid=[h for h in hits if h[0]<.5 and 'glaz' not in h[2].lower()]
   assert not solid,solid
   for zz in (7.65,7.8):
    for direction in (-1,1):
     hits=rays.hits(((x0+x1)/2,yy,zz),(direction,0,0));assert hits,hits
     nearest=hits[0];assert 'reveal' in nearest[1].lower(),nearest
     duplicates={h[1]for h in hits if abs(h[0]-nearest[0])<.0005}
     assert len(duplicates)==1,duplicates
     roofchecks+=1
 facadeobs=[o for name,o in obs.items()if name in ('Proposal | Entrance first floor continuation','Formal 01 | ivory ceiling','Proposal | Courtyard ground return','Proposal | North ground facade east pier 0') or name.startswith('Proposal | Junction finish | courtyard')]
 rays=Rays(facadeobs)
 assert 'Bronze black' in rays.hits((10,-1.5,2.7),(-1,0,0))[0][2]
 for yy in (-2.8,-.3):
  h=rays.hits((10,yy,2.7),(-1,0,0))[0];assert h[2]==('Red brown brick' if variant=='planning' else 'Proposal | Limestone render') and abs(h[0]-.3)<1e-5,h
 cornerhits=rays.hits((9.75,-2.8,1.5),(0,-1,0));assert len({h[1]for h in cornerhits if abs(h[0]-cornerhits[0][0])<.0005})==1,cornerhits
 ceiling=Rays([obs['Formal 01 | ivory ceiling']]);assert not ceiling.hits((10,-.25,2.65),(0,0,-1))
 pocket=Rays([o for name,o in obs.items()if (name.startswith('Proposal | Junction finish |') and 'plaster' in name) or name=='Proposal | Original loft front knee wall 2'])
 for yy in (.2,1,2):
  h=pocket.hits((6.5,yy,5.8),(-1,0,0))[0];assert 'warm ivory' in h[2],h
 for yy in (2.18,2.19,2.21,2.25):
  hits=pocket.hits((6.5,yy,5.8),(-1,0,0));assert len({h[1]for h in hits if abs(h[0]-hits[0][0])<.0005})==1,hits
 reports.append({'variant':variant,'unchangedObjects':len(oldobs)-len(allowed),'unexpectedChanges':unexpected,'knee1MaxZ':knee1[5],'knee2MaxX':knee2[3],'doorLeafWidthM':bb[4]-bb[1],'doorHeightM':bb[5]-bb[2],'rooflightRevealRays':roofchecks,'stairRoutesPreserved':True,'courtyardBandFinished':True,'plasterBehindDoorFrame':True})
 print('GEOMETRY_PASS',variant,flush=True)
suffix='-'+variants[0] if len(variants)==1 else ''
path=ROOT/f'walkthrough/test-results/{REV}/geometry-verification{suffix}.json';path.write_text(json.dumps(reports,indent=2))
