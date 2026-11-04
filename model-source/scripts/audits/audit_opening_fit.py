"""Measure authored opening components against structural solids.

Bounding boxes only shortlist pairs; reported clashes are real solid volumes.
Roof and floor clashes remain distinct. This never alters structural members.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path
import numpy as np
from scripts.structure.build_study import triangulate
from scripts.structure.junctions import solid

ROOT = Path(__file__).resolve().parents[2]
COMPONENT = re.compile(r'\bglaz\w*|\bglass\b|\bmullion\b|\bsash\b|\bfanlight\b|\btransom\b|\bspandrel\b|window.*(?:frame|jamb|head|cill)|door.*(?:leaf|frame|jamb|head)|horizontal fram', re.I)
EXCLUDE = re.compile(r'glassware|wine glass|champagne|tumbler|bottle|pendant|lamp|mirror|picture|wardrobe|cupboard|cabinet', re.I)


def opening_objects(geometry):
    return [o for o in geometry['objects'] if o['vertices'] and COMPONENT.search(o['object_name'])
            and not EXCLUDE.search(o['object_name']) and o.get('layer','').startswith('P')]


def audit(geometry, members, names=None):
    objects = opening_objects(geometry) if names is None else [o for o in geometry['objects'] if o['object_name'] in names]
    frames = [e for e in members['elements'] if e['category'] in ('beams','joists','trimmers','rafters','lintels','rc')
              or e['category']=='layers' and e.get('layerRole') in ('ceiling','deck','finish')]
    bounds=np.asarray([e['bounds'] for e in frames]);cache={};hits=[];unmeasured=[];measured=[]
    for ob in objects:
        v=np.asarray(ob['vertices']);lo,hi=v.min(0),v.max(0)
        candidates=np.where(np.all(np.minimum(hi,bounds[:,1])-np.maximum(lo,bounds[:,0])>1e-6,axis=1))[0]
        if not len(candidates):
            measured.append({'objectName':ob['object_name'],'method':'disjoint-bounds','bounds':[lo.tolist(),hi.tolist()]});continue
        try:
            shape=solid(triangulate(ob))
            if shape.volume()<1e-10:raise ValueError('Opening component has no closed positive-volume body')
        except ValueError as exc:
            unmeasured.append({'objectName':ob['object_name'],'reason':str(exc)});continue
        measured.append({'objectName':ob['object_name'],'method':'closed-solid','bounds':[lo.tolist(),hi.tolist()]})
        for i in candidates:
            e=frames[i]
            if e['id'] not in cache:
                try:cache[e['id']]=solid(e['triangles'])
                except ValueError as exc:
                    unmeasured.append({'memberId':e['id'],'reason':str(exc)});cache[e['id']]=None
            if cache[e['id']] is None:continue
            overlap=(shape^cache[e['id']]).volume()
            if overlap<1e-8:continue
            roof=e['category']=='rafters' or e.get('roofEdgeRole') or any(s.startswith('R-') for s in e.get('sourceIds',[]))
            hits.append({'objectName':ob['object_name'],'memberId':e['id'],'memberName':e['name'],
                         'category':e['category'],'zone':'roof' if roof else 'floor-or-wall-head',
                         'overlapCm3':round(overlap*1e6,3),'condition':e.get('condition'),'scope':e.get('scope')})
    return dict(measured=measured,intersections=hits,unmeasured=unmeasured,approvedForConstruction=False,
                basis='Actual closed component / structural-solid overlap. Includes selected new-proposal opening components; all structural options are explicit. Bounding-box false positives are excluded. This is fit evidence, not window product, fire, structural or weatherproofing approval.')


def main():
    p=argparse.ArgumentParser();p.add_argument('--geometry',type=Path,default=ROOT/'outputs/output-proposed-compact/geometry.json')
    p.add_argument('--members',type=Path,default=ROOT/'walkthrough/public/structure/members.json');p.add_argument('--out',type=Path,required=True)
    args=p.parse_args();raw=args.geometry.read_bytes();member_raw=args.members.read_bytes()
    result=audit(json.loads(raw),json.loads(member_raw));result.update(geometrySHA256=hashlib.sha256(raw).hexdigest(),membersSHA256=hashlib.sha256(member_raw).hexdigest())
    args.out.parent.mkdir(parents=True,exist_ok=True);args.out.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({k:len(result[k]) for k in ('measured','intersections','unmeasured')}))
    for r in result['intersections']:print(r['zone'],r['objectName'],r['memberId'],r['overlapCm3'])


if __name__=='__main__':main()
