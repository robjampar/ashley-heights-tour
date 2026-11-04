"""Coordinate authored suspended-floor bodies and flat ceilings to member levels.

This writes an explicit, reviewable native-model change schedule. It does not
claim fire/acoustic performance, or change a structural member to clear a finish.
"""
from pathlib import Path
import hashlib,json,re
import numpy as np
from shapely.geometry import box
from shapely.ops import unary_union
from scripts.structure.build_study import triangulate,footprint

ROOT=Path(__file__).resolve().parents[2]
REVISION='structural-finish-coordination-2026-10-27'


def bounds(o):
    v=np.array(o['vertices']);return [v.min(axis=0).tolist(),v.max(axis=0).tolist()]


def schedule(geometry,model,members,layers):
    objects={o['object_name']:o for o in geometry['objects'] if o['vertices']}
    source={e['id']:e for e in model['elements']}
    decks=[e for e in members['elements'] if e['category']=='layers' and e.get('layerRole')=='deck']
    ceilings=[e for e in members['elements'] if e['category']=='layers' and e.get('layerRole')=='ceiling']
    floor_ids=set(i for e in decks for i in e['sourceIds'])
    ops=[];native_floors=[];ceiling_records=[]
    for ident in sorted(floor_ids):
        s=source.get(ident,{});name=s.get('sourceObject');o=objects.get(name)
        if o is None or s.get('category')!='floors':continue
        lo,hi=bounds(o);ffl=round(hi[2],4);bottom=ffl-(layers['finishMm']+layers['deckMm'])/1000
        if hi[2]-lo[2]<.08:continue
        ops.append({'objectName':name,'sourceId':ident,'kind':'floor-body','oldZ':[lo[2],hi[2]],'newZ':[bottom,ffl],
            'basis':'Keep the finished floor datum and exact plan/voids; the authored floor body now represents deck plus finish, leaving the joist zone empty.'})
        native_floors.append({'objectName':name,'fflM':ffl,'oldDepthMm':(hi[2]-lo[2])*1000,'newDepthMm':(ffl-bottom)*1000})
    cp=[(e,footprint(e['triangles'])) for e in ceilings]
    frames=[(e,footprint(e['triangles'])) for e in members['elements'] if
            (e['category'] in ('joists','beams','trimmers') and e.get('axis') and abs(e['axis'][0][2]-e['axis'][1][2])<.001)
            or e.get('slabCoordination')]
    fixture=re.compile(r'light|diffuser|fitting|speaker|rose|filler|rail|opal|bezel|trim|housing|lens|plinth|pendant',re.I)
    for name,o in objects.items():
        if 'ceiling' not in name.lower() or fixture.search(name):continue
        lo,hi=bounds(o)
        if hi[2]-lo[2]>.151 or lo[2]>5.6 or hi[2]<-.8:continue
        poly=footprint(triangulate(o))
        if poly.area<.12:continue
        matches=[(e,p.intersection(poly).area) for e,p in cp if abs(e['bounds'][0][2]-lo[2])<.6 and p.intersects(poly)]
        matches=[(e,a) for e,a in matches if a>.01]
        if not matches:continue
        covered=unary_union([p for e,p in cp if any(e['id']==m['id'] for m,a in matches)]).intersection(poly).area
        cosmetic=hi[2]-lo[2]<.019 or bool(re.search(r'finish|lining',name,re.I))
        face=min(hi[2] if cosmetic else lo[2],min(e['bounds'][0][2] for e,a in matches))
        overhead=[e for e,p in frames if lo[2]-.65<e['bounds'][0][2] and e['bounds'][1][2]<lo[2]+.7 and p.intersection(poly).area>1e-5]
        if overhead:face=min(face,min(e['bounds'][0][2] for e in overhead)-(layers['serviceZoneMm']+layers['ceilingMm'])/1000)
        # Authored zero/thin room finishes sit just below the board body.
        depth=max(.002,hi[2]-lo[2])
        bottom=face-depth if cosmetic else face
        top=bottom if hi[2]-lo[2]<.0001 else face if cosmetic else face+layers['ceilingMm']/1000
        ops.append({'objectName':name,'kind':'ceiling-finish' if cosmetic else 'ceiling-body','oldZ':[lo[2],hi[2]],'newZ':[bottom,top],
            'ceilingBoardFaceM':face,'layerIds':[e['id'] for e,a in matches],'basis':'Flat ceiling follows the lowest overlapping horizontal floor member with the service gap and lining depth. Preserve separate acoustic/cosmetic lining thickness. Adjacent overlapping ceiling surfaces are coordinated as a group.'})
        ceiling_records.append({'objectName':name,'oldFaceM':lo[2],'newFaceM':bottom,'deltaM':bottom-lo[2],
            'planAreaM2':poly.area,'coveredAreaM2':covered,'uncoveredAreaM2':max(0,poly.area-covered),
            'polygon':list(poly.exterior.coords) if poly.geom_type=='Polygon' and not poly.interiors else None})
    # Main ceiling bodies and room linings often overlap. They must share one
    # board face, otherwise changing an individual room leaves hidden clashes.
    cops=[o for o in ops if o['kind'].startswith('ceiling')]
    polys={o['objectName']:footprint(triangulate(objects[o['objectName']])) for o in cops}
    for _ in range(len(cops)):
        changed=False
        for a in cops:
            adjacent=[b for b in cops if abs(a['oldZ'][0]-b['oldZ'][0])<.25 and polys[a['objectName']].intersection(polys[b['objectName']]).area>.005]
            face=min(b['ceilingBoardFaceM'] for b in adjacent)
            if face<a['ceilingBoardFaceM']-1e-8:a['ceilingBoardFaceM']=face;changed=True
        if not changed:break
    for o in cops:
        face=o['ceilingBoardFaceM'];depth=max(.002,o['oldZ'][1]-o['oldZ'][0]);cosmetic=o['kind']=='ceiling-finish'
        bottom=face-depth if cosmetic else face
        o['newZ']=[bottom,bottom if o['oldZ'][1]-o['oldZ'][0]<.0001 else face if cosmetic else face+layers['ceilingMm']/1000]
        r=next(c for c in ceiling_records if c['objectName']==o['objectName']);r['newFaceM']=bottom;r['deltaM']=bottom-o['oldZ'][0]
    # Strict geometry audit: coverings may meet the framing boundary, but may
    # not penetrate it. Use exact plan polygons, preserving the authored voids.
    audit=[]
    for op in ops:
        o=objects[op['objectName']];poly=footprint(triangulate(o));old=op['oldZ'];new=op['newZ'];before=[];after=[]
        for e,p in frames:
            if min(old[1],e['bounds'][1][2])-max(old[0],e['bounds'][0][2])<=.00001 and min(new[1],e['bounds'][1][2])-max(new[0],e['bounds'][0][2])<=.00001:continue
            area=poly.intersection(p).area
            if area<.00001:continue
            for zs,rows in ((old,before),(new,after)):
                dz=min(zs[1],e['bounds'][1][2])-max(zs[0],e['bounds'][0][2])
                # A zero-thickness decorative surface can still cut a member.
                if zs[0]==zs[1] and e['bounds'][0][2]+1e-5<zs[0]<e['bounds'][1][2]-1e-5:dz=1e-6
                if dz>1e-5 or dz==1e-6:rows.append({'memberId':e['id'],'verticalPenetrationMm':dz*1000,'overlapPlanAreaM2':area})
        audit.append({'objectName':op['objectName'],'kind':op['kind'],'before':before,'after':after})
    return {'revision':REVISION,'status':'Proposed native coordination; not installed until reviewed','layers':layers,'operations':ops,
        'floorBodies':native_floors,'ceilings':ceiling_records,'framingFit':audit,
        'summary':{'floorBodies':len(native_floors),'ceilings':len(ceiling_records),'intersectionsBefore':sum(len(a['before']) for a in audit),'intersectionsAfter':sum(len(a['after']) for a in audit)},
        'limits':'Geometric fit only. Board/resilient-bar/insulation system, fire/acoustic performance, fixings, service routes and penetrations require product-specific design. Deep beams, fixture attachment, door heads and stair clearances are separate checks. Finished floor levels and original retained lower-storey structure are preserved.'}


def main():
    paths={'geometry':ROOT/'outputs/output-proposed-compact/geometry.json','model':ROOT/'walkthrough/public/structure/model.json','members':ROOT/'walkthrough/public/structure/members.json'}
    data={k:json.loads(p.read_text()) for k,p in paths.items()}
    layers=json.loads((ROOT/'proposal/specs/structural-junction-details.json').read_text())['layers']
    report=schedule(**data,layers=layers);report['inputHashes']={k:hashlib.sha256(p.read_bytes()).hexdigest() for k,p in paths.items()}
    out=ROOT/'revisions/structural-overnight-2026-10-27/finish-coordination-proposal.json';out.write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report['summary']))


if __name__=='__main__':main()
