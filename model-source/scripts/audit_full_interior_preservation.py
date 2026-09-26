"""Check integration changes against the complete pre-publication models."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
evidence=ROOT/'revisions/interiors-principal-integration-2026-09-27';reports=[]
for variant in ('compact','planning'):
    before=json.loads((evidence/f'{variant}-before/geometry.json').read_text())
    after=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text())
    integration=json.loads((ROOT/f'output-proposed-{variant}/principal-interior-report.json').read_text())
    removed={o['object_name']for o in integration['removed_objects']}
    index={o['object_name']:o for o in after['objects']};unchanged=0;kitchen=0;maximum=0
    for old in before['objects']:
        if old['object_name']in removed:continue
        new=index.get(old['object_name']);assert new is not None,old['object_name']
        assert old['faces']==new['faces'],old['object_name']
        assert len(old['vertices'])==len(new['vertices']),old['object_name']
        error=max((abs(x-y)for a,b in zip(old['vertices'],new['vertices'])for x,y in zip(a,b)),default=0)
        assert error<.00003,(old['object_name'],error)
        maximum=max(maximum,error);unchanged+=1
        if old['name'].startswith('Proposal | Quiet oak | '):
            assert old['materials']==new['materials'] and old['face_materials']==new['face_materials'],old['name']
            kitchen+=1
    assert kitchen>900,(variant,kitchen)
    nav=json.loads((ROOT/f'output-proposed-{variant}/navigation.json').read_text())
    assert nav['interiorDesign']['revision']==2 and nav['principalInterior']['integrated']
    original=json.loads((ROOT/f'output-proposed-{variant}/original-preservation-check.json').read_text());assert all(original.values())
    reports.append({'variant':variant,'unchanged_previous_meshes':unchanged,'unchanged_kitchen_lounge_meshes':kitchen,'maximum_vertex_difference_m':maximum,'source_reconstruction_preserved':True,'replaced_old_suite_meshes':len(removed)})
(evidence/'preservation.json').write_text(json.dumps({'status':'PASS','reports':reports},indent=2)+'\n')
print('PASS: kitchen/lounge and every non-suite mesh retain their geometry; original reconstruction preserved',reports)
