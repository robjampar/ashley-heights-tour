import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
records=[]
for variant in ('compact','planning'):
    old=ROOT/f'revisions/loft-finish-review-2026-10-20/original/outputs/output-proposed-{variant}'
    new=ROOT/f'outputs/output-proposed-{variant}'
    before=json.loads((old/'geometry.json').read_text());after=json.loads((new/'geometry.json').read_text())
    a={o['object_name']:o for o in before['objects']};b={o['object_name']:o for o in after['objects']}
    report=json.loads((ROOT/f'outputs/output-loft-finish-{variant}/finish-report.json').read_text());allowed=set(report['changedObjects'])
    allowed.update(json.loads((new/'loft-finish-head-refresh.json').read_text())['changedObjects'])
    removed=set(a)-set(b);added=set(b)-set(a)
    assert removed<=set(report['removedObjects']),removed-set(report['removedObjects'])
    assert all(n.startswith('Loft finish | ')for n in added),added
    altered={n for n in a.keys()&b.keys() if a[n]!=b[n]}
    assert altered<=allowed,altered-allowed
    assert not any('Open oak tread' in n or 'Flush courtyard glass' in n for n in altered)
    oldnav=json.loads((old/'navigation.json').read_text());newnav=json.loads((new/'navigation.json').read_text())
    assert oldnav['proposalBasement']==newnav['proposalBasement']
    for name in ('flights','openings','roof','floorZ','loftZ','ceilingZ','bottomLanding'):
        assert oldnav['levelLoftStair'][name]==newnav['levelLoftStair'][name],name
    assert oldnav['interactiveDoors']==newnav['interactiveDoors'],'door geometry or operation changed'
    records.append({'variant':variant,'unchangedExistingMeshObjects':len(a.keys()&b.keys())-len(altered),'changed':sorted(altered),'removed':sorted(removed),'added':sorted(added),'stairRoofGlazingDoorsAndBasementPreserved':True})
(ROOT/'walkthrough/test-results/loft-finish-review-2026-10-20/geometry-preservation.json').write_text(json.dumps(records,indent=2))
print([(r['variant'],r['unchangedExistingMeshObjects'],len(r['changed']),len(r['added']))for r in records])
