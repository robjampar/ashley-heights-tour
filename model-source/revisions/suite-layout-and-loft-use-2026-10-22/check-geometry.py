import json,hashlib
from pathlib import Path
from shapely.geometry import Polygon
R=Path(__file__).resolve().parents[2];E=R/'walkthrough/test-results/suite-layout-and-loft-use-2026-10-22';reports=[]
for v in ('compact','planning'):
 before=json.loads((R/f'revisions/suite-layout-and-loft-use-2026-10-22/original/outputs/output-proposed-{v}/geometry.json').read_text());after=json.loads((R/f'outputs/output-suite-layout-loft-{v}/geometry.json').read_text());rep=json.loads((R/f'outputs/output-suite-layout-loft-{v}/finish-report.json').read_text())['stair'];nav=json.loads((R/f'outputs/output-suite-layout-loft-{v}/navigation.json').read_text());oldnav=json.loads((R/f'revisions/suite-layout-and-loft-use-2026-10-22/original/outputs/output-proposed-{v}/navigation.json').read_text())
 a={o['object_name']:o for o in before['objects']};b={o['object_name']:o for o in after['objects']};allowed=set(rep['removed']+rep['changed']+rep['created'])|set(rep['replacements'])|set(rep['replacements'].values());unchanged=set(a)-allowed
 assert all(name in b and a[name]==b[name]for name in unchanged),[name for name in unchanged if name not in b or a[name]!=b[name]][:20]
 assert (set(a)^set(b))<=allowed,(set(a)^set(b))-allowed
 roof=[name for name in a if not name.startswith('Combined suite 01 | window') and any(t in name.lower()for t in ['joined roof ','joined roof lining','roof weathering','roof drainage','glazing','window'])]
 assert all(name in b and a[name]==b[name]for name in roof),'Exterior roof or glazing changed'
 stairs=[n for n in a if n.startswith('Arrival 01 |')or n.startswith('Proposal | Original house loft stair |')and not n in allowed]
 assert all(a[name]==b[name]for name in stairs),'Existing staircase or preserved floor changed'
 for k in ['stairLandingFloorFinish','rearGardenRoomChamfer','rearGardenRoomInset','basementRoofCorrections','principalGableWall','levelLoftStair']:assert nav.get(k)==oldnav.get(k),k
 assert rep['balcony']['maximumClearGapM']<.1
 assert not any(n.startswith(('Balcony top rail','Balcony bottom rail','Balcony middle rail','Balcony rear top rail','Rear bay detail | Balcony curved bar','Rear bay detail | Balcony post '))for n in b)
 assert a['Balcony deck']==b['Balcony deck']
 s=rep['configuration']['suite'];areas={name:Polygon(s[key]).area for name,key in [('bedroomAndSitting','bedroomAndSittingPolygon'),('bathroom','bathroomPolygon')]}
 reports.append({'variant':v,'passed':True,'unchangedMeshRecords':len(unchanged),'unchangedRoofAndGlazingRecords':len(roof),'preservedStairAndFloorRecords':len(stairs),'areasM2':areas,'wardrobeFrontageM':sum((w['bounds'][2]-w['bounds'][0])if w['angle']==0 else(w['bounds'][3]-w['bounds'][1])for w in s['wardrobes']),'balcony':rep['balcony']})
(E/'geometry-verification.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports,indent=2))
