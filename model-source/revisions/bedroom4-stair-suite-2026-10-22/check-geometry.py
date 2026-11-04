import json,hashlib
from pathlib import Path
from collections import Counter
from shapely.geometry import Polygon
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/bedroom4-stair-suite-2026-10-22';reports=[]
for v in ['compact','planning']:
 before=json.loads((R/f'revisions/bedroom4-stair-suite-2026-10-22/original/outputs/output-proposed-{v}/geometry.json').read_text());after=json.loads((R/f'outputs/output-bedroom4-stair-suite-{v}/geometry.json').read_text());rep=json.loads((R/f'outputs/output-bedroom4-stair-suite-{v}/finish-report.json').read_text())['stair'];nav=json.loads((R/f'outputs/output-bedroom4-stair-suite-{v}/navigation.json').read_text());oldnav=json.loads((R/f'revisions/bedroom4-stair-suite-2026-10-22/original/outputs/output-proposed-{v}/navigation.json').read_text())
 a={o['object_name']:o for o in before['objects']};b={o['object_name']:o for o in after['objects']};allowed=set(rep['removed']+rep['changed']+rep['created'])|set(rep['replacements'])|set(rep['replacements'].values());unchanged=set(a)-allowed
 assert all(name in b and a[name]==b[name]for name in unchanged),[name for name in unchanged if name not in b or a[name]!=b[name]][:20]
 assert (set(a)^set(b))<=allowed,(set(a)^set(b))-allowed
 roof=[name for name in a if any(t in name.lower()for t in ['joined roof ','joined roof lining','roof weathering','roof drainage','glazing','window']) and not name.startswith(('Bedroom4 01 |','Sidebed 01 |'))]
 assert all(name in b and a[name]==b[name]for name in roof),'Exterior roof or glazing changed'
 assert all(a[name]==b[name]for name in a if name.startswith('Arrival 01 |')),'Existing stair changed'
 for k in ['stairLandingFloorFinish','rearGardenRoomChamfer','rearGardenRoomInset','basementRoofCorrections','principalGableWall']:assert nav.get(k)==oldnav.get(k),k
 strings=[o for name,o in b.items()if 'Housed ivory stair string'in o['name']];assert len(strings)==2
 for o in strings:
  for f in o['faces'][:2]:assert Polygon([(o['vertices'][i][1],o['vertices'][i][2])for i in f]).is_valid,o['object_name']
  edges=Counter(tuple(sorted((x,y)))for f in o['faces']for x,y in zip(f,f[1:]+f[:1]));assert all(k==2 for k in edges.values()),o['object_name']
 s=rep['configuration']['suite'];areas={name:Polygon(s[key]).area for name,key in [('dressing','dressingPolygon'),('bathroom','bathroomPolygon')]};areas['bedroom']=(s['sleeping'][2]-s['sleeping'][0])*(s['sleeping'][3]-s['sleeping'][1])
 reports.append({'variant':v,'passed':True,'unchangedMeshRecords':len(unchanged),'unchangedRoofAndGlazingRecords':len(roof),'existingMainStairPreserved':True,'previousAcceptedRevisionsPreserved':True,'closedSupportStrings':len(strings),'areasM2':areas,'wardrobeLinearMetres':sum(r[2]-r[0]for r in s['wardrobes'])})
(E/'geometry-verification.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports,indent=2))
