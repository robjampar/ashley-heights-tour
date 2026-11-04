"""Read-only fit audit of authored finishes against proposed structural solids.

Reports geometry and unmeasured surfaces. It never cuts a structural member,
changes the architecture or claims a fire/acoustic/structural approval.
"""
import hashlib,json
import manifold3d as mf
import numpy as np
from scripts.structure.build_study import triangulate,footprint
from scripts.structure.junctions import solid


def audit_coverings(geometry_path,elements):
    raw=geometry_path.read_bytes();geometry=json.loads(raw)
    coordination=geometry.get('proposal',{}).get('structuralFinishCoordination',{})
    kinds={r['objectName']:r['kind']for r in coordination.get('operations',[])
           if r['kind']in('floor-body','basement-finish','ceiling-body','ceiling-finish')}
    selected=[]
    for ob in geometry['objects']:
        name=ob['object_name']
        if not ob['vertices']:continue
        v=np.asarray(ob['vertices']);lo,hi=v.min(0),v.max(0)
        kind=kinds.get(name)
        if not kind and hi[2]>5.6 and ('ceiling'in name.lower()or name.startswith(('Proposal | Joined roof lining ','Continuous wing | lining ','Symmetric wing | lining '))):kind='roof-lining'
        if kind:selected.append((ob,kind,lo,hi))
    frames=[e for e in elements if e['category']in('beams','joists','trimmers','rafters','lintels','rc')
            or e['category']=='details'and('-PAD'in e['id']or e['id'].startswith('M-G02-BLOCK-'))]
    bounds=np.asarray([e['bounds']for e in frames]);cache={};hits=[];unmeasured=[];measured=[]
    for ob,kind,lo,hi in selected:
        indices=np.where(np.all(np.minimum(hi,bounds[:,1])-np.maximum(lo,bounds[:,0])>1e-6,axis=1))[0]
        tri=triangulate(ob);plane=hi[2]-lo[2]<1e-5
        if plane:
            indices=np.where((bounds[:,0,2]+1e-5<lo[2])&(bounds[:,1,2]-1e-5>lo[2])&
                             np.all(np.minimum(hi[:2],bounds[:,1,:2])-np.maximum(lo[:2],bounds[:,0,:2])>1e-6,axis=1))[0]
            shape=None;plan=footprint(tri)
            polys=[plan]if plan.geom_type=='Polygon'else list(plan.geoms)
            contours=[list(r.coords)[:-1]for p in polys if p.geom_type=='Polygon'for r in [p.exterior,*p.interiors]]
            plane_plan=mf.CrossSection(contours,mf.FillRule.EvenOdd)
        else:
            try:
                shape=solid(tri)
                if shape.volume()<1e-10:raise ValueError('Open or zero-volume covering')
            except ValueError as exc:
                unmeasured.append({'objectName':ob['object_name'],'kind':kind,'reason':str(exc)});continue
        measured.append({'objectName':ob['object_name'],'kind':kind,'method':'horizontal-solid-slice'if plane else'closed-solid','bounds':[lo.tolist(),hi.tolist()]})
        for index in indices:
            e=frames[index]
            try:
                if e['id']not in cache:cache[e['id']]=solid(e['triangles'])
            except ValueError as exc:
                unmeasured.append({'memberId':e['id'],'reason':str(exc)});continue
            if plane:
                # Intersect the actual solid at the sheet datum. Projecting
                # a whole sloping rafter falsely reports crossings at its
                # opposite end, even when the actual section is outside.
                area=(plane_plan^cache[e['id']].slice(float(lo[2]))).area()
                if area<1e-6:continue
                volume=None
            else:
                volume=(shape^cache[e['id']]).volume()
                if volume<1e-8:continue
                area=None
            row={'objectName':ob['object_name'],'kind':kind,'memberId':e['id'],'memberName':e['name'],
                 'memberCategory':e['category'],'overlapCm3':None if volume is None else round(volume*1e6,3),
                 'planeOverlapM2':area,'method':'horizontal-solid-slice'if plane else'closed-solid'}
            hits.append(row);e.setdefault('coveringFitClashes',[]).append(row)
    return {'sourceGeometrySHA256':hashlib.sha256(raw).hexdigest(),'nativeRevision':coordination.get('revision'),
            'measured':measured,'intersections':sorted(hits,key=lambda h:h['overlapCm3']or 0,reverse=True),'unmeasured':unmeasured,
            'scope':'Authored coordinated horizontal floor/ceiling coverings and identified upper roof linings against actual beam, joist, trimmer, rafter, lintel, concrete, pad and blocking solids. Zero-thickness horizontal sheets use a separate plane-crossing check. Wall leaves, studs, furniture, fixings and unmeasured surfaces are outside this audit. A zero count is not a whole-building clearance or construction approval.',
            'approvedForConstruction':False}
