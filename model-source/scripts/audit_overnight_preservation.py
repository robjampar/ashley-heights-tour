"""Check room integration against the full accepted house at start of this session."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'revisions/interiors-overnight-2026-09-27';reports=[]
for variant in ('compact','planning'):
    before=json.loads((OUT/'before'/variant/'geometry.json').read_text())
    after=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text())
    room_reports=[json.loads((ROOT/f'output-proposed-{variant}'/(area+'-interior-report.json')).read_text())for area in ('cinema','bar')]
    removed={o['object_name']for report in room_reports for o in report['removed_objects']}
    index={o['object_name']:o for o in after['objects']};unchanged=0;kitchen=0;suite=0;maximum=0
    for old in before['objects']:
        if old['object_name']in removed:continue
        new=index.get(old['object_name']);assert new is not None,('Unexpected removal',old['object_name'])
        assert old['faces']==new['faces'],old['object_name']
        assert len(old['vertices'])==len(new['vertices']),old['object_name']
        error=max((abs(x-y)for a,b in zip(old['vertices'],new['vertices'])for x,y in zip(a,b)),default=0)
        assert error<.00003,(old['object_name'],error)
        assert old['materials']==new['materials'] and old['face_materials']==new['face_materials'],('Material changed',old['name'])
        maximum=max(maximum,error);unchanged+=1
        kitchen+=old['name'].startswith('Proposal | Quiet oak | ')
        suite+=old['name'].startswith(('Bedroom 02 | ','Ensuite 01 | '))
    assert kitchen>900 and suite>850,(variant,kitchen,suite)
    for report in room_reports:
        count=sum(o['name'].startswith(report['area'].title()+' 01 | ')for o in after['objects'])
        assert count==report['mesh_objects'],(report['area'],count,report['mesh_objects'])
    nav=json.loads((ROOT/f'output-proposed-{variant}/navigation.json').read_text())
    assert nav['principalInterior']['integrated'] and nav['interiorDesign']['revision']==2
    assert all(area in nav['interiorRooms']for area in ('cinema','bar'))
    original=json.loads((ROOT/f'output-proposed-{variant}/original-preservation-check.json').read_text());assert all(original.values())
    reports.append({'variant':variant,'unchanged_previous_meshes':unchanged,'unchanged_kitchen_lounge_meshes':kitchen,'unchanged_principal_suite_meshes':suite,'maximum_vertex_difference_m':maximum,'source_reconstruction_preserved':True,'declared_replaced_parts':len(removed),'rooms':[{k:r[k]for k in ('area','mesh_objects','lights')}for r in room_reports]})
(OUT/'preservation.json').write_text(json.dumps({'status':'PASS','reports':reports},indent=2)+'\n')
print('PASS: accepted kitchen/lounge, principal suite and all other retained meshes unchanged',reports)
