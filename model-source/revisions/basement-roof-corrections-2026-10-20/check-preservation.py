import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];reports=[]
for v in ('compact','planning'):
 old=ROOT/f'revisions/basement-roof-corrections-2026-10-20/original/outputs/output-proposed-{v}'
 new=ROOT/f'outputs/output-basement-roof-{v}'
 a={o['object_name']:o for o in json.loads((old/'geometry.json').read_text())['objects']}
 b={o['object_name']:o for o in json.loads((new/'geometry.json').read_text())['objects']}
 report=json.loads((new/'finish-report.json').read_text())
 added=set(b)-set(a);removed=set(a)-set(b);changed={k for k in a.keys()&b.keys() if a[k]!=b[k]}
 assert added<=set(report['newObjects']),added-set(report['newObjects'])
 assert removed<=set(report['removedObjects']),removed-set(report['removedObjects'])
 assert changed<=set(report['changedObjects'])|set(report['newObjects']),changed-set(report['changedObjects'])-set(report['newObjects'])
 oldnav=json.loads((old/'navigation.json').read_text());nav=json.loads((new/'navigation.json').read_text())
 assert oldnav['interactiveDoors']==nav['interactiveDoors']
 assert oldnav['levelLoftStair']==nav['levelLoftStair']
 for name in a.keys()&b.keys():
  if name.startswith(('Cinema 01 |','Loftsuite 01 |','Loft finish |','Bar 01 | stool','Bar 01 | bar ','Bar 01 | pool ')):assert a[name]==b[name],name
 reports.append({'variant':v,'unchangedMeshObjects':len(a.keys()&b.keys())-len(changed),'changed':sorted(changed),'removed':sorted(removed),'added':sorted(added),'acceptedStairsDoorsBedroomCinemaBarIslandAndPoolPreserved':True})
(ROOT/'walkthrough/test-results/basement-roof-corrections-2026-10-20/geometry-preservation.json').write_text(json.dumps(reports,indent=2))
print([(r['variant'],r['unchangedMeshObjects'],len(r['changed']),len(r['added'])) for r in reports])
