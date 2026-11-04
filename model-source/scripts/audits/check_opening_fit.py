"""Verify a staged opening revision before installing it in the walkthrough."""
import argparse
import hashlib
import json
from pathlib import Path
import numpy as np
from scripts.audits.audit_opening_fit import audit
from scripts.structure.build_study import triangulate,footprint
from scripts.structure.junctions import solid,cuboid
from shapely.geometry import Polygon,box
from shapely.ops import unary_union

ROOT=Path(__file__).resolve().parents[2]


def check(stage,members_path):
    provenance=json.loads((stage/'opening-fit-source.json').read_text());source=Path(provenance['source'])
    before=json.loads((source/'geometry.json').read_text());after=json.loads((stage/'geometry.json').read_text())
    bn=json.loads((source/'navigation.json').read_text());an=json.loads((stage/'navigation.json').read_text())
    spec=json.loads((ROOT/'proposal/specs/structural-opening-fit.json').read_text())
    report=after['proposal']['structuralOpeningFit'];assert report==an['structuralOpeningFit']
    by0={o['object_name']:o for o in before['objects']};by1={o['object_name']:o for o in after['objects']}
    changed=set(report['changed']+report['removed']);preserved=[]
    for name,o in by0.items():
        if name not in changed:assert by1[name]==o,('Unrelated geometry changed',name);preserved.append(name)
    cut_names={r['name']for r in spec.get('navigationCuts',[])}
    assert [s for s in bn['surfaces']if s['name']not in cut_names]==[s for s in an['surfaces']if s['name']not in cut_names],'Unrelated floor navigation changed'
    mask=unary_union([box(*lo[:2],*hi[:2])for r in spec.get('floorCuts',[])for lo,hi in r['boxes']])
    for name in cut_names:
        old=unary_union([Polygon(s['polygon'])for s in bn['surfaces']if s['name']==name]);new=unary_union([Polygon(s['polygon'])for s in an['surfaces']if s['name']==name])
        assert old.difference(mask).symmetric_difference(new).area<1e-7,('Navigation cut differs from agreed exterior ledge / corner',name)
    assert bn['floorLevels']==an['floorLevels'],'Finished floor datums changed'
    assert bn['interactiveDoors']==an['interactiveDoors'],'Door hinges, swings or members changed'
    assert not report['removed'],'Original-shared objects need an explicit rename review'
    bounds=lambda o:(np.asarray(o['vertices']).min(0),np.asarray(o['vertices']).max(0))
    for op in spec['operations']:
        a,b=bounds(by1[op['objectName']]);expected=np.asarray(op['newBounds'])
        assert np.max(np.abs(np.asarray([a,b])-expected))<2e-5,('Wrong opening bounds',op['objectName'])
        if op['kind']not in ('opaque-head-band','cavity-wall-depth','cavity-jamb-fit','wall-finish-offset'):
            oa,ob=bounds(by0[op['objectName']])
            assert np.max(np.abs(a[:2]-oa[:2]))<2e-5 and np.max(np.abs(b[:2]-ob[:2]))<2e-5,('Glazing plan changed',op['objectName'])
    # The door still gives a 2.2 m full-height leaf. Handle heights and hinge
    # positions are untouched while the former almost-closed fanlight opens up.
    leaf=by1['Proposal | Courtyard edge passage entry leaf mullion']
    assert abs(bounds(leaf)[1][2]-2.2)<2e-5
    fan=by1['Proposal | Courtyard edge passage fanlight glass'];a,b=bounds(fan)
    assert b[2]-a[2]>.08
    for name in by0:
        if name.startswith('Proposal | Courtyard edge passage entry leaf pull'):assert by0[name]==by1[name]
    # All first-bay mullions remain equal width and equally spaced after the
    # cavity wall gets its actual inside face. No narrow sliver of glass.
    mullions=[bounds(o)for n,o in by1.items()if n.startswith('Proposal | Garden north glazing fixed left mullion')]
    centres=sorted((a[0]+b[0])/2 for a,b in mullions)
    assert np.ptp(np.diff(centres))<2e-5 and min(np.diff(centres))>.9
    assert all(abs(b[0]-a[0]-.048)<2e-5 for a,b in mullions)
    assert abs(min(a[0]for a,b in mullions)-(-4.6475))<2e-5
    wall_a,wall_b=bounds(by1['Proposal | Garden west return']);assert abs(wall_a[0]+5.015)<2e-5 and abs(wall_b[0]+4.6475)<2e-5
    floor_checks=[]
    for r in spec.get('floorCuts',[]):
        old,new=by0[r['objectName']],by1[r['objectName']];a,b=bounds(new);oa,ob=bounds(old)
        before_plan=footprint(triangulate(old));after_plan=footprint(triangulate(new))
        assert abs(after_plan.area-r['expectedPlanAreaM2'])<2e-5,(r['objectName'],after_plan.area,r['expectedPlanAreaM2'])
        if r.get('physicalReplacement'):
            approved=Polygon(r['physicalReplacement']['polygon'])
            assert after_plan.symmetric_difference(approved).area<1e-6,'Complete deck differs from approved physical plate'
            named_nav=unary_union([Polygon(s['polygon'])for s in an['surfaces']if s['name']==r['objectName']]).intersection(box(5.5,-4.3,9.7,0))
            assert named_nav.symmetric_difference(approved).area<1e-6,'Gallery navigation does not match corrected physical floor'
        else:assert after_plan.difference(before_plan).area<1e-7,'Floor edit added unreviewed area'
        assert abs(b[2]-ob[2])<1e-6,'Floor finish level changed'
        if b[2]-a[2]>1e-5:
            actual=solid(triangulate(new)).volume();expected=after_plan.area*(b[2]-a[2])
            assert abs(actual-expected)<2e-6,('Floor body is not the expected closed sheet',r['objectName'])
        if r.get('framingReference'):assert new['structural_framing_reference']==r['framingReference']
        floor_checks.append({'objectName':r['objectName'],'beforePlanAreaM2':before_plan.area,'afterPlanAreaM2':after_plan.area,'approvedAddedPlanAreaM2':after_plan.difference(before_plan).area,'removedPlanAreaM2':before_plan.difference(after_plan).area,'floorDatumPreserved':True})
    reveal_frames={
        'Proposal | North ground facade pier 0':'Proposal | Courtyard edge passage fixed left mullion',
        'Proposal | North upper facade pier 0':'Proposal | Courtyard upper landing mullion',
        'Proposal revision | House front centre | corrected wall 4':'Proposal | Courtyard edge passage fixed right mullion.002',
        'Proposal revision | First front | corrected wall 5':'Proposal | Courtyard upper landing mullion.003',
        'Proposal revision | First front | corrected wall 6':'Proposal | Courtyard upper landing mullion.003'}
    reveal_checks=[]
    for r in spec.get('revealPockets',[]):
        frame=reveal_frames[r['objectName']]
        overlap=(solid(triangulate(by1[r['objectName']]))^solid(triangulate(by1[frame]))).volume()
        assert overlap<1e-8,('Frame still intersects its native masonry reveal',frame,r['objectName'],overlap)
        reveal_checks.append({'wallObject':r['objectName'],'frameObject':frame,'actualSolidOverlapM3':overlap})
    seal_checks=[]
    frame_prefixes=('Proposal | Courtyard edge passage','Proposal | Internal garden gallery glazing 1','Proposal | Courtyard upper landing')
    frames=[o for name,o in by1.items()if name.startswith(frame_prefixes)and ('mullion'in name or'horizontal fram'in name)]
    for seal in [r for r in spec['boxes']if r['kind']=='compressible-head-seal']:
        obj=by1[seal['objectName']];lo,hi=bounds(obj);plan=footprint(triangulate(obj));shape=solid(triangulate(obj))
        assert abs(hi[2]-lo[2]-.0075)<2e-5,'Unexpected perimeter seal depth'
        rail_plans=[footprint(triangulate(f))for f in frames if 'horizontal fram'in f['object_name']and abs(bounds(f)[1][2]-lo[2])<2e-5]
        assert plan.difference(unary_union(rail_plans)).area<1e-7,'Perimeter seal does not sit on a head rail'
        closure_plans=[box(*r['bounds'][0][:2],*r['bounds'][1][:2])for r in spec['boxes']if r['kind']!='compressible-head-seal'and abs(r['bounds'][0][2]-hi[2])<2e-5]
        assert plan.difference(unary_union(closure_plans)).area<1e-7,'Perimeter seal does not close to the opaque head'
        for f in frames:
            a,b=bounds(f)
            if all(min(hi[k],b[k])-max(lo[k],a[k])>1e-7 for k in range(3)):
                assert (shape^solid(triangulate(f))).volume()<1e-8,('Seal cuts through frame',seal['objectName'],f['object_name'])
        seal_checks.append({'objectName':seal['objectName'],'depthMm':round(float(hi[2]-lo[2])*1000,4),'railAndOpaqueHeadContact':True,'frameSolidOverlaps':0})
    names={o['objectName']for o in spec['operations']if o['kind']!='cavity-wall-depth'}|{o['objectName']for o in spec['boxes']}
    raw=members_path.read_bytes();members=json.loads(raw);scoped=audit(after,members,names);broad=audit(after,members)
    assert not scoped['intersections'],scoped['intersections'];assert not scoped['unmeasured'],scoped['unmeasured']
    # The masonry wall body is an architectural assembly envelope. Padstones
    # replace material within it, while its internal/external faces enclose it.
    envelope=audit(after,members,{'Proposal | Garden west return'})
    unexpected=[r for r in envelope['intersections']if not r['memberId'].startswith('M-PAD-GARDEN-W-')]
    assert not unexpected,unexpected
    member_by={e['id']:e for e in members['elements']};pocket_checks=[]
    for r in spec.get('retainedBearingPockets',[]):
        old=solid(triangulate(by0[r['sourceObject']]));new=solid(triangulate(by1[r['sourceObject']]))
        expected=old
        for row in spec.get('retainedBearingPockets',[]):
            if row['sourceObject']==r['sourceObject']:
                for lo,hi in row.get('cutBoxes',[[row['low'],row['high']]]):expected=expected-cuboid(lo,hi)
        for reveal in spec.get('revealPockets',[]):
            if reveal['objectName']==r['sourceObject']:expected=expected-cuboid(reveal['low'],reveal['high'])
        removed=old-new
        assert (new-expected).volume()+(expected-new).volume()<1e-7,('Native pier pocket differs from reviewed cuts',r['sourceObject'])
        assert (new-old).volume()<1e-7,'Pocket edit added masonry'
        beam_overlap=(new^solid(member_by[r['beamId']]['triangles'])).volume()
        assert beam_overlap<1e-8,('Native pier/head still intersects beam',r['sourceObject'],r['beamId'],beam_overlap)
        for proxy in r['proxies']:
            # Blender truncates native object names to63 bytes. RoomBuilder's
            # exact source_name is preserved as the canonical export name.
            matches=[o for o in by1.values()if o.get('name')==proxy['name']or o['object_name']==proxy['name']]
            assert len(matches)==1,('Missing or ambiguous canonical bearing proxy',proxy['name'])
            drawn_object=matches[0]
            reported=[n for pocket in report['retainedBearingPockets']if pocket['sourceObject']==r['sourceObject']and pocket['beamId']==r['beamId']for n in pocket['proxyNames']]
            assert drawn_object['object_name']in reported,'Proxy does not match native stage report'
            drawn=solid(triangulate(drawn_object));member=solid(member_by[proxy['id']]['triangles'])
            assert (drawn-member).volume()+(member-drawn).volume()<1e-7,'Normal-view bearing proxy differs from structural member'
            assert drawn_object['structural_finish_detail'],'Proxy would be counted as another structural assembly'
        pocket_checks.append({'wallObject':r['sourceObject'],'removedCoreM3':removed.volume(),'beamId':r['beamId'],'proxyMemberIds':[p['id']for p in r['proxies']]})
    return {'passed':True,'geometrySHA256':hashlib.sha256((stage/'geometry.json').read_bytes()).hexdigest(),
        'membersSHA256':hashlib.sha256(raw).hexdigest(),'preservedUnrelatedGeometryRecords':len(preserved),
        'changed':len(report['changed']),'created':len(report['created']),'scoped':scoped,'broad':broad,
        'expectedArchitecturalWallEnvelopeReplacements':envelope['intersections'],
        'floorEdgeChecks':floor_checks,'retainedPierPocketChecks':pocket_checks,'frameRevealChecks':reveal_checks,'perimeterSealChecks':seal_checks,
        'floorDatumsAndUnrelatedNavigationPreserved':True,'doorHardwareAndHingesPreserved':True,
        'limits':'The scoped result verifies edited opening/finish components. Broader unresolved roof and masonry-head envelope conflicts are still listed. It is not a whole-building or product/structural approval.'}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',type=Path,required=True);p.add_argument('--members',type=Path,default=ROOT/'walkthrough/public/structure/members.json');p.add_argument('--out',type=Path,required=True)
    a=p.parse_args();r=check(a.stage,a.members);a.out.parent.mkdir(parents=True,exist_ok=True);a.out.write_text(json.dumps(r,indent=2)+'\n')
    print(json.dumps({k:r[k]for k in ('passed','preservedUnrelatedGeometryRecords','changed','created')}))
    print('Scoped overlaps',len(r['scoped']['intersections']),'broader remaining',len(r['broad']['intersections']))
