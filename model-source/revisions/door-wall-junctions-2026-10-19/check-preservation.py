import json
from pathlib import Path
R=Path(__file__).resolve().parents[2];rev='door-wall-junctions-2026-10-19';reports=[]
for v in ('compact','planning'):
 old=R/'revisions'/rev/'original/outputs'/f'output-proposed-{v}';new=R/f'outputs/output-door-wall-junctions-{v}';f=json.loads((new/'frame-report.json').read_text())
 a={o['object_name']:o for o in json.loads((old/'geometry.json').read_text())['objects']};b={o['object_name']:o for o in json.loads((new/'geometry.json').read_text())['objects']}
 allowed=set(f['removedObjects'])|set(f['addedObjects'])|{m['object']for j in f['junctions']for m in j['modifications']}
 changed=[n for n in a.keys()&b.keys()if a[n]!=b[n]];removed=list(a.keys()-b.keys());added=list(b.keys()-a.keys());bad=[n for n in changed+removed+added if n not in allowed]
 assert not bad,(v,bad)
 nav0=json.loads((old/'navigation.json').read_text());nav1=json.loads((new/'navigation.json').read_text());nav1.pop('doorWallJunctionRefresh');nav1['modelUpdatedAt']=nav0['modelUpdatedAt'];assert nav0==nav1
 reports.append({'variant':v,'changed':changed,'removed':removed,'added':added,'unrelatedChanges':bad,'navigationPreserved':True})
(R/'walkthrough/test-results'/rev/'geometry-preservation.json').write_text(json.dumps(reports,indent=2)+'\n');print('Unrelated geometry and all navigation preserved')
