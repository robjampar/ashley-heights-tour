import json
from pathlib import Path
from shapely.geometry import Polygon
R=Path(__file__).resolve().parents[2];REV='open-suite-eaves-storage-2026-10-23';E=R/'walkthrough/test-results'/REV;records=[]
for v in ('compact','planning'):
 current=R/'revisions'/REV/'original'/f'outputs/output-proposed-{v}'
 base=R/'revisions/suite-layout-and-loft-use-2026-10-22/original'/f'outputs/output-proposed-{v}'
 out=R/f'outputs/output-open-suite-eaves-{v}'
 g=json.loads((out/'geometry.json').read_text());nav=json.loads((out/'navigation.json').read_text());report=nav['openSuiteEavesStorage']
 oldnav=json.loads((current/'navigation.json').read_text());oldreport=oldnav['suiteLayoutLoft']
 before={o['object_name']:o for o in json.loads((current/'geometry.json').read_text())['objects']};after={o['object_name']:o for o in g['objects']}
 allowed=set()
 for q in [oldreport,report]:
  for key in ['removed','changed','created']:allowed.update(q.get(key,[]))
  allowed.update(q.get('replacements',{}));allowed.update(q.get('replacements',{}).values())
 unchanged=set(before)-allowed
 assert all(n in after and before[n]==after[n] for n in unchanged),[n for n in unchanged if n not in after or before[n]!=after[n]][:20]
 assert (set(before)^set(after))<=allowed,(set(before)^set(after))-allowed
 roof=[n for n in before if any(t in n.lower()for t in ['joined roof ','joined roof lining','roof drainage','roof weathering','glazing'])]
 assert all(before[n]==after[n]for n in roof)
 for key in ['levelLoftStair','stairLandingFloorFinish','rearGardenRoomChamfer','rearGardenRoomInset','basementRoofCorrections','principalGableWall']:assert oldnav.get(key)==nav.get(key),key
 # The earlier accepted wardrobe, bath and bed are restored without moving windows.
 original={o['object_name']:o for o in json.loads((base/'geometry.json').read_text())['objects']}
 suite=[n for n in original if n.startswith('Combined suite 01 |') and n not in report['changed']]
 assert all(original[n]==after[n]for n in suite)
 assert not any(n.startswith(('Loft reading nook |','Suite refinement |','Rear bay detail | Balcony post '))for n in after)
 assert original['Balcony deck']==after['Balcony deck']
 s=report['configuration']['suite'];assert s['bathroom'][0]==s['dressing'][0] and s['bathroom'][2]==s['dressing'][2]
 assert len([d for d in nav['interactiveDoors']if d['id']=='Combined suite 01 | bathroom entry'])==1
 assert not any('dressing'in d['id'].lower() and d['id'].startswith('Combined suite 01')for d in nav['interactiveDoors'])
 records.append({'variant':v,'passed':True,'unchangedMeshRecords':len(unchanged),'unchangedRoofAndGlazingRecords':len(roof),'restoredSuiteMeshRecords':len(suite),'bathroomWidthM':s['bathroom'][2]-s['bathroom'][0],'bathroomAreaM2':Polygon(s['bathroomPolygon']).area,'wardrobeFrontageM':report['wardrobeFrontageM'],'storageFrontageM':report['storageFrontageM'],'recoveredFloorClearM2':(8.47-7.3)*(4.58-1.6)})
(E/'geometry-verification.json').write_text(json.dumps(records,indent=2)+'\n');print(json.dumps(records,indent=2))
