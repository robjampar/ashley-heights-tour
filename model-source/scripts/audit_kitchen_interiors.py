"""Check the fitted room against the accepted pre-interior house geometry."""
import json
from pathlib import Path
from collections import Counter
from shapely.geometry import Polygon, box

ROOT=Path(__file__).resolve().parents[1]
EVIDENCE=ROOT/'revisions/interiors-kitchen-2026-09-25'
results=[]
for variant in ('compact','planning'):
    out=ROOT/f'output-proposed-{variant}'
    before=json.loads((EVIDENCE/f'{variant}-before-geometry.json').read_text())
    after=json.loads((out/'geometry.json').read_text())
    nav=json.loads((out/'navigation.json').read_text())
    report=json.loads((out/'kitchen-interior-report.json').read_text())
    assert all(json.loads((out/'original-preservation-check.json').read_text()).values())
    owned=[o for o in after['objects'] if o['name'].startswith('Proposal | Quiet oak | ')]
    assert len(owned)>500 and nav['interiorDesign']['scheme']=='01 Quiet oak'
    # No structural or non-room mesh may disappear or change its shape.
    index={o['object_name']:o for o in after['objects']}
    removed=set(report['removed_objects']);kept=0;max_error=0
    for old in before['objects']:
        if old['name'] in removed:continue
        new=index.get(old['object_name']);assert new is not None,old['object_name']
        assert old['faces']==new['faces'],old['name']
        assert len(old['vertices'])==len(new['vertices']),old['name']
        delta=max((abs(a-b) for x,y in zip(old['vertices'],new['vertices']) for a,b in zip(x,y)),default=0)
        assert delta<.0001,(old['name'],delta)
        max_error=max(max_error,delta);kept+=1
    names=Counter(o['name'].split(' | ')[-1].split('.')[0] for o in owned)
    for detail in ('rotary dial','illuminated digit','touch control','Sink drain slot','Tap aerator','upholstered back','seat piping','tapered oak leg','Linen hand towel','Chopping board hanging eye','olive leaf'):
        assert any(detail in o['name'] for o in owned),detail
    # Furniture uses its actual floor envelope, including the curved chairs.
    furniture=report['furniture'];shapes=[]
    for f in furniture:
        shapes.append((f['name'],Polygon(f['polygon']) if 'polygon' in f else box(*f['box'])))
    overlaps=[]
    for i,(a,p) in enumerate(shapes):
        for b,q in shapes[i+1:]:
            area=p.intersection(q).area
            # A rear/east L-run shares its corner carcass. Table/chair seating
            # deliberately tucks the chair seat under the tabletop edge.
            seating=('chair' in a and 'table' in b) or ('chair' in b and 'table' in a)
            corner='working run' in a and 'working run' in b
            if area>.001 and not (seating or corner):overlaps.append((a,b,area))
    assert not overlaps,overlaps
    results.append({'variant':variant,'original_preserved':True,'unchanged_previous_meshes':kept,
        'maximum_vertex_difference_m':max_error,'interior_meshes':len(owned),'collision_items':len(furniture),
        'unintended_furniture_overlaps':overlaps,'visible_detail_checks':11})
(EVIDENCE/'native-audit.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
