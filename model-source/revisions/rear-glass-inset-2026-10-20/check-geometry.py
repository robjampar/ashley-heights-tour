"""Check the isolated native geometry against its immediate recovery copy."""
import json
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
r=ROOT/'revisions/rear-glass-inset-2026-10-20'
a=ROOT/'outputs/output-rear-inset-compact'
before=json.loads((r/'original/outputs/output-proposed-compact/geometry.json').read_text())
after=json.loads((a/'geometry.json').read_text());nav=json.loads((a/'navigation.json').read_text())
report=json.loads((a/'finish-report.json').read_text())
bb={o['object_name']:o for o in before['objects']};aa={o['object_name']:o for o in after['objects']}
def bounds(name):
    vv=aa[name]['vertices'];return [min(p[k]for p in vv)for k in range(3)]+[max(p[k]for p in vv)for k in range(3)]
def close(a,b):assert abs(a-b)<.00001,(a,b)
changed=set(report['changed']);added=set(report['added']);removed=set(report['removed'])
assert set(aa)-set(bb)==added
assert set(bb)-set(aa)==removed
unchanged=set(bb)-changed-removed
assert all(bb[n]==aa[n] for n in unchanged),'Unrelated object geometry changed'
close(bounds('Proposal | Quiet oak | Proposal | Garden room floor')[3],4.1)
close(bounds('Proposal | Garden living plaster ceiling')[3],4.075)
close(bounds('Proposal | Rear flat roof')[3],4.28)
close(bounds('Proposal | Rear inset | former kitchen window masonry infill')[0],4.078)
closed_slabs=[]
for name in ('Proposal | Quiet oak | Proposal | Garden room floor',
             'Proposal | Rear flat roof', 'Proposal | Garden living plaster ceiling',
             'Proposal | Terrace continuous stone finish',
             'Proposal | Quiet oak | Proposal | Kitchen garden flush threshol'):
    edges=Counter()
    for f in aa[name]['faces']:
        for i in range(len(f)):edges[tuple(sorted((f[i],f[(i+1)%len(f)])))]+=1
    assert all(n==2 for n in edges.values()),('Unclosed slab edge',name,Counter(edges.values()))
    closed_slabs.append(name)
for o in after['objects']:
    if o['object_name'].startswith('Proposal | Garden east glazing'):
        b=bounds(o['object_name']);assert b[0]>=4.031-.0001 and b[3]<=4.169+.0001,(o['object_name'],b)
rooflights=[n for n in bb if n.startswith('Proposal | Terrace walk-on lantern')]
assert all(bb[n]==aa[n] for n in rooflights)
for room in nav['planRooms']:
    if room['name']=='Garden living and dining':close(max(p[0]for p in room['polygon_m']),4.1)
    if room['name']=='Shared roof terrace':close(max(p[0]for p in room['polygon_m']),4.105)
assert nav['loftJunctionCleanup']==json.loads((r/'original/outputs/output-proposed-compact/navigation.json').read_text())['loftJunctionCleanup']
result={'revision':report['revision'],'unchangedObjects':len(unchanged),'changedObjects':len(changed),'addedObjects':len(added),'removedDuplicateCornerObjects':sorted(removed),'retainedRooflightComponents':len(rooflights),'closedSlabs':closed_slabs,'eastGlazingX':4.1,'roofEastX':4.28,'infillWestX':4.078,'retainedKitchenOpeningWidthM':report['kitchenOpening'][1]-report['kitchenOpening'][0],'precedingLoftCorrectionsRetained':True,'passed':True}
out=ROOT/'walkthrough/test-results/rear-glass-inset-2026-10-20';out.mkdir(parents=True,exist_ok=True);(out/'geometry-verification.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
