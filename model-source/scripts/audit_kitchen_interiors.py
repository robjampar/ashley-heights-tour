"""Check the fitted room against the accepted pre-interior house geometry."""
import json,math
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
    for detail in ('rotary dial','illuminated digit','touch control','Sink drain slot','Tap aerator','upholstered back','seat piping','tapered oak leg','Linen hand towel','Chopping board hanging eye','olive leaves','TV inset glass','Remote button','Soundbar grille slot','Sofa seat welt','Sofa scatter cushion','Sofa draped linen throw','planter','soil pebble'):
        assert any(detail in o['name'] for o in owned),detail
    # Check attachment from the exported geometry itself: cap-ring centroids
    # reconstruct tube centrelines without calling any modelling helper.
    def centres(ob,sides):
        vv=ob['vertices'];assert len(vv)%sides==0,ob['name']
        return [tuple(sum(p[k]for p in vv[i:i+sides])/sides for k in range(3))for i in range(0,len(vv),sides)]
    def distance_to_stems(p,stems):
        best=float('inf')
        for points in stems:
            for a,b in zip(points,points[1:]):
                d=[b[k]-a[k]for k in range(3)];length=sum(v*v for v in d)
                t=max(0,min(1,sum((p[k]-a[k])*d[k]for k in range(3))/length))if length else 0
                best=min(best,math.dist(p,[a[k]+t*d[k]for k in range(3)]))
        return best
    joins=[];leaf_roots=0;branch_roots=0
    for ob in owned:
        for suffix,parent_suffix,child_sides,parent_sides in (
            (' fine stem',' olive twig',6,7),(' secondary trunk',' olive trunk',10,12)):
            if not ob['name'].endswith(suffix):continue
            family=ob['name'][:-len(suffix)]
            parents=[centres(q,parent_sides)for q in owned if q['name']==family+parent_suffix]
            gap=distance_to_stems(centres(ob,child_sides)[0],parents)
            assert gap<.0001,(ob['name'],'detached stem',gap)
            joins.append(gap);branch_roots+=1
        if ob['name'].endswith(' olive leaves'):
            family=ob['name'][:-len(' olive leaves')]
            parents=[centres(q,6)for q in owned if q['name']==family+' fine stem']
            assert len(ob['vertices'])%55==0,ob['name']
            for i in range(0,len(ob['vertices']),55):
                gap=distance_to_stems(ob['vertices'][i],parents)
                assert gap<.0001,(ob['name'],'detached leaf',gap)
                joins.append(gap);leaf_roots+=1
    assert leaf_roots>1000 and branch_roots>100
    # Media panel and screen must be wholly clear of the retained west window.
    for ob in owned:
        if any(t in ob['name'] for t in ('TV plaster panel','TV thin aluminium body','Media console')):
            assert min(v[1]for v in ob['vertices'])>5.841,ob['name']
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
        'unintended_furniture_overlaps':overlaps,'visible_detail_checks':19,
        'plant_connections':{'branch_roots':branch_roots,'leaf_roots':leaf_roots,'maximum_gap_m':max(joins)}})
(EVIDENCE/'native-audit.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
