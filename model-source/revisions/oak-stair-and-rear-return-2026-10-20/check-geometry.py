"""Verify scope, retained geometry and joinery/slab closure in both derivatives."""
import json
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REV='oak-stair-and-rear-return-2026-10-20'
reports=[]
for variant in ('compact','planning'):
    old=ROOT/f'revisions/{REV}/original/outputs/output-proposed-{variant}'
    out=ROOT/f'outputs/output-oak-stair-return-{variant}'
    before=json.loads((old/'geometry.json').read_text());after=json.loads((out/'geometry.json').read_text())
    nav=json.loads((out/'navigation.json').read_text());oldnav=json.loads((old/'navigation.json').read_text())
    report=json.loads((out/'finish-report.json').read_text())
    bb={o['object_name']:o for o in before['objects']};aa={o['object_name']:o for o in after['objects']}
    allowed=set(report['stair']['removed']+report['stair']['created']+report['stair']['coordinated'])
    if variant=='compact':
        allowed.update(report['rear']['changed']+report['rear']['added']+report['rear']['removed'])
    unchanged=set(bb)-allowed
    assert all(n in aa and bb[n]==aa[n]for n in unchanged),'Unrelated geometry changed'
    assert (set(aa)^set(bb))<=allowed
    def bounds(name):
        vv=aa[name]['vertices'];return [min(p[k]for p in vv)for k in range(3)]+[max(p[k]for p in vv)for k in range(3)]
    def close(a,b):assert abs(a-b)<.00001,(a,b)
    for key in ('flights','routes','upperRoutes','openings','roof','bottomLanding','riserMetres','goingMetres','flightWidthMetres'):
        assert nav['levelLoftStair'][key]==oldnav['levelLoftStair'][key],key
    assert nav['loftJunctionCleanup']==oldnav['loftJunctionCleanup']
    closed=[n for n in aa if 'Continuous oak cut string' in n]
    assert len(closed)==4
    if variant=='compact':
        close(bounds('Proposal | Quiet oak | Proposal | Garden room floor')[3],4.0)
        close(bounds('Proposal | Garden living plaster ceiling')[3],3.975)
        close(bounds('Proposal | Rear flat roof')[3],4.18)
        close(bounds('Proposal | Rear inset | former kitchen window masonry infill')[0],3.878)
        close(report['rear']['appliedAdditionalInsetM'],.1)
        close(report['rear']['appliedOpeningReductionM'],.2)
        closed.extend(['Proposal | Quiet oak | Proposal | Garden room floor','Proposal | Rear flat roof',
                       'Proposal | Garden living plaster ceiling','Proposal | Terrace continuous stone finish',
                       'Proposal | Quiet oak | Proposal | Kitchen garden flush threshol',
                       'Proposal | Rear inset | former kitchen window masonry infill'])
        rooflights=[n for n in bb if n.startswith('Proposal | Terrace walk-on lantern')]
        assert all(bb[n]==aa[n]for n in rooflights)
    for name in closed:
        edges=Counter()
        for face in aa[name]['faces']:
            for a,b in zip(face,face[1:]+face[:1]):edges[tuple(sorted((a,b)))]+=1
        assert all(n==2 for n in edges.values()),('Unclosed mesh',name,Counter(edges.values()))
    reports.append({'variant':variant,'passed':True,'unchangedMeshRecords':len(unchanged),'scopeObjects':len(allowed),
                    'closedJoineryAndSlabs':closed,'approvedStairLayoutRetained':True,'previousLoftRepairsRetained':True})
out=ROOT/f'walkthrough/test-results/{REV}';out.mkdir(parents=True,exist_ok=True)
(out/'geometry-verification.json').write_text(json.dumps(reports,indent=2)+'\n')
print(json.dumps(reports,indent=2))
