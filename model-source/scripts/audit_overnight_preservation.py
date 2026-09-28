"""Check room integration against the full accepted house at start of this session."""
from pathlib import Path
import json,math
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'revisions/interiors-overnight-2026-09-27';reports=[]
for variant in ('compact','planning'):
    before=json.loads((OUT/'before'/variant/'geometry.json').read_text())
    after=json.loads((ROOT/f'output-proposed-{variant}/geometry.json').read_text())
    areas=('cinema','bar','gym','utility','guest','guestbath','family','cloakroom','bedroom2','bedroom3','familybath','bedroom4','formal','sidebed','loftsuite','hobby','arrival','landings','garage','gardenhouse','office')+(('terrace','poolgarden','workshop')if variant=='compact'else())
    room_reports=[json.loads((ROOT/f'output-proposed-{variant}'/(area+'-interior-report.json')).read_text())for area in areas]
    nav=json.loads((ROOT/f'output-proposed-{variant}/navigation.json').read_text())
    corrections=nav.get('sourceGeometryCorrections',{});bounded={r['source_object']:r for r in corrections.get('gardenBuildingClearance',[])};correction_checks=[]
    removed={o['object_name']for report in room_reports for o in report['removed_objects']}
    transforms={name:t for report in room_reports for t in report.get('declared_transforms',[])for name in t['object_names']}
    index={o['object_name']:o for o in after['objects']};unchanged=0;kitchen=0;suite=0;maximum=0
    for old in before['objects']:
        if variant=='compact' and old['name'].startswith('Proposal | Workshop approach stepping stone'):
            assert old['object_name']not in index,('Owner-requested stepping stone remains',old['object_name'])
            assert not any(o['name'].startswith('Proposal | Workshop approach stepping stone')for o in after['objects'])
            correction_checks.append({'source':old['object_name'],'owner_requested_removal':'Workshop approach stepping stones, 27 September'})
            continue
        if old['object_name']in removed:continue
        if old['object_name']in bounded:
            r=bounded[old['object_name']];new=index.get(r['replacement_object']);assert new is not None,('Missing bounded correction',r)
            assert new['materials']==old['materials'],('Bounded correction changed materials',old['object_name'])
            volumes=r['cutter_volumes']
            inside=lambda v,bb:all(bb[i]+.00003<v[i]<bb[i+3]-.00003 for i in range(3))
            outside=[v for v in old['vertices']if not any(all(bb[i]-.00003<=v[i]<=bb[i+3]+.00003 for i in range(3))for bb in volumes)]
            assert all(min(max(abs(a-b)for a,b in zip(v,q))for q in new['vertices'])<.00003 for v in outside),('Lost source vertex outside bounded correction',old['object_name'])
            assert not any(any(inside(v,bb)for bb in volumes)for v in new['vertices']),('Geometry remains inside clipped volume',old['object_name'])
            for v in new['vertices']:
                original_vertex=min(max(abs(a-b)for a,b in zip(v,q))for q in old['vertices'])<.00003
                on_cut=any(all(bb[i]-.00003<=v[i]<=bb[i+3]+.00003 for i in range(3))and any(abs(v[i]-bb[i])<.00003 or abs(v[i]-bb[i+3])<.00003 for i in range(3))for bb in volumes)
                assert original_vertex or on_cut,('Unexpected new vertex outside bounded correction',old['object_name'],v)
            correction_checks.append({'source':old['object_name'],'retained_outside_vertices':len(outside),'cutter_volumes':volumes});continue
        step=corrections.get('loggiaStep')
        if step and old['object_name']==step['object_name']:
            new=index[old['object_name']];bb=step['bounds'];expected=[[x,y,z]for z in(bb[2],bb[5])for y in(bb[1],bb[4])for x in(bb[0],bb[3])]
            assert len(new['vertices'])==8 and len(new['faces'])==6 and new['materials']==old['materials']
            assert all(min(max(abs(a-b)for a,b in zip(v,q))for q in new['vertices'])<.00003 for v in expected)
            assert all(.16<h<.18 for h in step['risers'])and abs(step['lower_floor']-.2)<1e-9
            correction_checks.append({'source':old['object_name'],'verified_step_bounds':bb,'risers':step['risers']});continue
        new=index.get(old['object_name']);assert new is not None,('Unexpected removal',old['object_name'])
        assert old['faces']==new['faces'],old['object_name']
        assert len(old['vertices'])==len(new['vertices']),old['object_name']
        expected=old['vertices']
        if old['object_name']in transforms:
            t=transforms[old['object_name']];cx,cy,cz=t['centre'];angle=t['rotation_z'];co,si=math.cos(angle),math.sin(angle)
            dx,dy,dz=t.get('translation',[0,0,0])
            expected=[[cx+(x-cx)*co-(y-cy)*si+dx,cy+(x-cx)*si+(y-cy)*co+dy,z+dz]for x,y,z in expected]
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
    assert len(nav['mirrors'])==11 and any(m['name']=='Guestbath 01 | basin mirror'for m in nav['mirrors'])
    original=json.loads((ROOT/f'output-proposed-{variant}/original-preservation-check.json').read_text());assert all(original.values())
    reports.append({'variant':variant,'unchanged_previous_meshes':unchanged,'unchanged_kitchen_lounge_meshes':kitchen,'unchanged_principal_suite_meshes':suite,'maximum_expected_vertex_difference_m':maximum,'source_reconstruction_preserved':True,'declared_replaced_parts':len(removed),'exactly_verified_declared_transform_parts':len(transforms),'bounded_source_corrections':correction_checks,'retained_shared_skirtings':retained_profiles,'rooms':[{k:r[k]for k in ('area','mesh_objects','lights')}for r in room_reports]})
(OUT/'preservation.json').write_text(json.dumps({'status':'PASS','reports':reports},indent=2)+'\n')
print('PASS: accepted interiors and retained meshes preserved, with declared transforms and bounded garden corrections verified',reports)
