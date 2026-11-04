import json,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/loft-dormer-alignment-2026-10-19';result=[]
for v in ['compact','planning']:
 before=json.loads((R/f'revisions/loft-dormer-alignment-2026-10-19/original/outputs/output-proposed-{v}/geometry.json').read_text())
 after=json.loads((R/f'outputs/output-loft-dormer-alignment-{v}/geometry.json').read_text())
 a={o['object_name']:o for o in before['objects']};b={o['object_name']:o for o in after['objects']}
 changed=[n for n in a.keys()&b.keys()if a[n]!=b[n]];removed=sorted(a.keys()-b.keys());added=sorted(b.keys()-a.keys())
 allow=lambda n:n.startswith(('Proposal | Loft bedroom expansion |','Proposal | Loft hip store wall ','Proposal | Wing dormer south cheek','Loftsuite 01 | hip store','Frame detail | 24 '))
 unexpected=[n for n in changed+removed+added if not allow(n)]
 exterior=[n for n in a if any(t in n.lower()for t in ['window','glazing','mullion','joined roof']) and not n.startswith(('Frame detail','Loftsuite 01 | hip store'))]
 exterior_changed=[n for n in exterior if n not in b or a[n]!=b[n]]
 result.append({'variant':v,'changed':sorted(changed),'removed':removed,'added':added,'unexpected':unexpected,'exteriorMeshCount':len(exterior),'exteriorChanged':exterior_changed})
 print(v,'changed',len(changed),'removed',len(removed),'added',len(added),'unexpected',unexpected,'exterior changes',exterior_changed)
(E/'targeted-preservation.json').write_text(json.dumps(result,indent=2)+'\n')
assert not any(r['unexpected']or r['exteriorChanged']for r in result)
