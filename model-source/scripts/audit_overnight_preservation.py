"""Check room integration against the full accepted house at start of this session."""
from pathlib import Path
import json,math
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'revisions/interiors-overnight-2026-09-27';reports=[]
for variant in ('compact','planning'):
    before=json.loads((OUT/'before'/variant/'geometry.json').read_text())
    after=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text())
    areas=('cinema','bar','gym','utility','guest','guestbath','family')
    room_reports=[json.loads((ROOT/f'output-proposed-{variant}'/(area+'-interior-report.json')).read_text())for area in areas]
    removed={o['object_name']for report in room_reports for o in report['removed_objects']}
    transforms={name:t for report in room_reports for t in report.get('declared_transforms',[])for name in t['object_names']}
    index={o['object_name']:o for o in after['objects']};unchanged=0;kitchen=0;suite=0;maximum=0
    for old in before['objects']:
        if old['object_name']in removed:continue
        new=index.get(old['object_name']);assert new is not None,('Unexpected removal',old['object_name'])
        assert old['faces']==new['faces'],old['object_name']
        assert len(old['vertices'])==len(new['vertices']),old['object_name']
        expected=old['vertices']
        if old['object_name']in transforms:
            t=transforms[old['object_name']];cx,cy,cz=t['centre'];angle=t['rotation_z'];co,si=math.cos(angle),math.sin(angle)
            expected=[[cx+(x-cx)*co-(y-cy)*si,cy+(x-cx)*si+(y-cy)*co,z]for x,y,z in expected]
        error=max((abs(x-y)for a,b in zip(expected,new['vertices'])for x,y in zip(a,b)),default=0)
        assert error<.00003,(old['object_name'],error)
        assert old['materials']==new['materials'] and old['face_materials']==new['face_materials'],('Material changed',old['name'])
        maximum=max(maximum,error);unchanged+=old['object_name']not in transforms
        kitchen+=old['name'].startswith('Proposal | Quiet oak | ')
        suite+=old['name'].startswith(('Bedroom 02 | ','Ensuite 01 | '))
    assert kitchen>900 and suite>850,(variant,kitchen,suite)
    for report in room_reports:
        count=sum(o['name'].startswith(report['area'].title()+' 01 | ')for o in after['objects'])
        assert count==report['mesh_objects'],(report['area'],count,report['mesh_objects'])
    # Shared skirting profiles continue into the neighbouring room. Verify the
    # retained portion against the accepted baseline, including its cut plane.
    retained_profiles=[]
    for name in('Bathroom east | skirting end1','Principal en suite east | skirting end-1'):
        old=next(o for o in before['objects']if o['name']==name)
        new=next(o for o in after['objects']if o['name']=='Guestbath 01 | retained skirting outside ensuite '+name)
        ov=old['vertices'];nv=new['vertices'];kept=[v for v in ov if v[1]<5.505-.00001]
        assert all(min(max(abs(a-b)for a,b in zip(v,q))for q in nv)<.00003 for v in kept),name
        assert all(abs(v[1]-5.505)<.00003 or min(max(abs(a-b)for a,b in zip(v,q))for q in ov)<.00003 for v in nv),name
        assert max(v[1]for v in nv)<=5.50503 and new['materials']==old['materials'],name
        retained_profiles.append({'source':name,'verified_retained_source_vertices':len(kept),'cut_plane_y':5.505})
    nav=json.loads((ROOT/f'output-proposed-{variant}/navigation.json').read_text())
    assert nav['principalInterior']['integrated'] and nav['interiorDesign']['revision']==2
    assert all(area in nav['interiorRooms']for area in areas)
    garage=next(d for d in nav['interactiveDoors']if d['id']=='Proposal | Garage east separation door 0')
    assert garage['hinge']==[11.315,-12.95,0] and abs(garage['openDelta']-math.pi/2)<1e-9
    utility_cfg=json.loads((ROOT/'proposal/interiors/leisure/utility.json').read_text())
    utility_room=next(r for r in nav['planRooms']if r['name']==utility_cfg['room'])
    x0,y0,x1,y1=utility_cfg['bounds']
    assert utility_room['polygon_m']==[[x0,y0],[x1,y0],[x1,y1],[x0,y1]],('Utility plan footprint',utility_room)
    bath_cfg=json.loads((ROOT/'proposal/interiors/leisure/guestbath.json').read_text())
    assert next(r for r in nav['planRooms']if r['name']==bath_cfg['room'])['polygon_m']==bath_cfg['polygon']
    assert len(nav['mirrors'])==4 and any(m['name']=='Guestbath 01 | basin mirror'for m in nav['mirrors'])
    original=json.loads((ROOT/f'output-proposed-{variant}/original-preservation-check.json').read_text());assert all(original.values())
    reports.append({'variant':variant,'unchanged_previous_meshes':unchanged,'unchanged_kitchen_lounge_meshes':kitchen,'unchanged_principal_suite_meshes':suite,'maximum_expected_vertex_difference_m':maximum,'source_reconstruction_preserved':True,'declared_replaced_parts':len(removed),'exactly_verified_rehung_door_parts':len(transforms),'retained_shared_skirtings':retained_profiles,'rooms':[{k:r[k]for k in ('area','mesh_objects','lights')}for r in room_reports]})
(OUT/'preservation.json').write_text(json.dumps({'status':'PASS','reports':reports},indent=2)+'\n')
print('PASS: accepted kitchen/lounge, principal suite and all other retained meshes unchanged',reports)
