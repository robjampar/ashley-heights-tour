"""Geometry/scope safeguards for the experimental member layer."""
import json
import math
import unittest
from pathlib import Path
from shapely.geometry import LineString, box
from scripts.structure.build_study import footprint
from scripts.structure.build_members import section_projection, upper_roof_surface, consolidate_roof_edges
from scripts.structure.junctions import solid,cuboid

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
ARCH=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
BY={e['id']:e for e in DATA['elements']}
ABY={e['id']:e for e in ARCH['elements']}

class MemberGeometryTests(unittest.TestCase):
    def test_no_approval_or_fabricated_existing_member_inventory(self):
        self.assertFalse(DATA['approvedForConstruction'])
        self.assertEqual(len(BY),len(DATA['elements']))
        assumed_ids={'M-RETAINED-GALLERY-W','M-RETAINED-GALLERY-MID','M-RETAINED-GALLERY-E'}
        self.assertEqual({e['id']for e in BY.values()if e['retained']},assumed_ids)
        for e in BY.values():
            self.assertFalse(e['design']['approvedForConstruction'])
            if e['retained']:
                r=e['assumedRetainedContinuity']
                self.assertEqual(e['scope'],'retained');self.assertIsNone(e['cost'])
                self.assertFalse(r['capacityVerified']);self.assertTrue(r['retainedQuantityExcluded'])
                self.assertIn('unsurveyed',e['status']);self.assertNotIn('unitCount',e)
                self.assertEqual(set(e['sourceIds']),{r['lowerSourceId'],r['upperSourceId']})
                self.assertEqual(r['zRange'],[2.6,2.8])
                for ident in e['sourceIds']:
                    self.assertLess(footprint(e['triangles']).difference(footprint(ABY[ident]['triangles'])).area,1e-7)
                continue
            self.assertNotEqual(e['scope'],'retained')
            if not e.get('calculationRef'):
                self.assertIn('not calculated',e['status'])
        existing_roofs=[e['id'] for e in ARCH['elements'] if 'retained original' in e['name'].lower()]
        self.assertGreater(len(existing_roofs),5)
        self.assertTrue(set(existing_roofs)<=set(DATA['retainedIds']))
        for e in BY.values():
            if set(e['sourceIds'])&set(existing_roofs):
                self.assertEqual(e.get('condition'),'roof-rebuild')

    def test_loft_walls_have_timber_not_masonry(self):
        self.assertFalse(any(e['category']=='masonry' and e['level']==3 for e in BY.values()))
        for ident in ['W-C5D458D','W-377E333']:
            members=[e for e in BY.values() if ident in e['sourceIds']]
            self.assertGreater(len(members),3)
            self.assertTrue(all(e['category'] in ('studs','partitions','framing-review') for e in members))

    def test_garage_and_entrance_missing_bodies_keep_exact_profiles(self):
        junction_spec=json.loads((ROOT/'proposal/specs/structural-junction-details.json').read_text())
        names=['Garage wing south return','Garage wing north return','Entrance bay south return',
               'Entrance bay north return','West upper principal facade above vault',
               'West upper principal facade above wing roof','Continued roof garage wing gable south head 0',
               'Continued roof garage wing gable north head 0','Continued roof garage wing gable window head head 0',
               'Continued roof garage wing gable window head head 1']
        for name in names:
            source=next(e for e in ABY.values() if e['name']=='Proposal | '+name)
            self.assertEqual(source['category'],'walls',name)
            leaves=[e for e in BY.values() if source['id'] in e['sourceIds'] and e['category']=='masonry']
            self.assertEqual({e['leaf'] for e in leaves},{'brick','block'},name)
            for leaf in leaves:
                axes=[1-leaf['wallNormal'],2]
                source_poly=section_projection(source,axes);leaf_poly=section_projection(leaf,axes)
                profile_start,profile_end=source['bounds'][0][axes[0]],source['bounds'][1][axes[0]]
                # Named cavity turns can intentionally shorten one leaf well
                # beyond the automatic corner tolerance. Apply that explicit
                # end plane; all other retained profile areas stay checked.
                for correction in junction_spec.get('masonryEndCorrections',[]):
                    if correction['memberId']!=leaf['id']:continue
                    self.assertEqual(correction['axis'],axes[0])
                    target=correction['targetM']
                    source_poly=source_poly.intersection(box(-100,-100,target,100)if correction['end']else box(target,-100,100,100))
                    if correction['end']:profile_end=target
                    else:profile_start=target
                if leaf.get('architecturalCoordination',{}).get('kind')=='flush-corner':
                    target=leaf['architecturalCoordination']['newEndX']
                    source_poly=source_poly.union(box(profile_end,source['bounds'][0][2],target,source['bounds'][1][2]))
                    profile_end=target
                for seat in leaf.get('bearingSeats',[]):
                    for key in ('padBounds','groutBounds','steelPocketBounds'):
                        lo,hi=seat[key]
                        source_poly=source_poly.difference(box(lo[axes[0]],lo[axes[1]],hi[axes[0]],hi[axes[1]]))
                if leaf.get('cornerCoordination'):
                    self.assertIn(leaf['id'],DATA['junctionReview']['masonry']['changedAssemblies'])
                    # Individual leaves exchange volume at bonded corners. The
                    # profile away from those junctions remains unchanged.
                    along=1-leaf['wallNormal'];lo,hi=source['bounds']
                    core=box(profile_start+.36,lo[2]+.36,profile_end-.36,hi[2]-.001)
                    if profile_end-profile_start>.72 and hi[2]-lo[2]>.36:
                        self.assertLess(source_poly.symmetric_difference(leaf_poly).intersection(core).area,.0001,name)
                else:self.assertLess(source_poly.symmetric_difference(leaf_poly).area,.0001,name)
        self.assertAlmostEqual(BY['M-BRICK-6FBC0C0']['bounds'][1][0],5.0325)
        self.assertAlmostEqual(BY['M-BLOCK-6FBC0C0']['bounds'][1][0],5.1825)
        self.assertIn('M-LP02-WEST-PAD',{r['padId']for r in BY['M-BLOCK-7C51DD7']['bearingSeats']})
        # The newly positioned corner is filled by alternating ownership,
        # not by a gap or two overlapping masonry quantities.
        a,b=(solid(BY[i]['triangles'])for i in ('M-BRICK-6FBC0C0','M-BRICK-7C51DD7'))
        joint=cuboid([4.93,-5.1025,0],[5.0325,-5,5.35])
        self.assertLess((a^b).volume(),1e-8)
        self.assertAlmostEqual(((a+b)^joint).volume(),joint.volume(),places=8)
        # The centre window is still open; gable masonry does not bridge its void.
        opening=box(-13.589,3.001,-12.291,4.049)
        for e in BY.values():
            if e['category']=='masonry' and 'garage wing gable' in e['name']:
                self.assertLess(section_projection(e,[1,2]).intersection(opening).area,1e-8)

    def test_entrance_corner_has_two_external_leaves_without_overlap(self):
        for suffix in ['94203D5','D8AE497']:
            leaves=[e for e in BY.values() if e['category']=='masonry' and 'W-'+suffix in e['sourceIds']]
            self.assertEqual(len(leaves),4)
            for kind in ('brick','block'):
                self.assertEqual({e['wallNormal'] for e in leaves if e['leaf']==kind},{0,1})
            shapes=[solid(e['triangles']) for e in leaves]
            # Alternating bonded courses overlap in plan but not in volume.
            for i,a in enumerate(shapes):
                for b in shapes[i+1:]:self.assertLess((a^b).volume(),1e-8)

    def test_roof_replacement_is_explicit_and_cannot_replace_walls_or_floors(self):
        replacement=[e for e in BY.values() if e.get('condition')=='roof-rebuild']
        self.assertEqual(len(replacement),DATA['roofOptions']['replacementMemberCount'])
        self.assertGreater(len(replacement),100)
        self.assertTrue(all(e['category'] in ('beams','rafters','trimmers','fascia') for e in replacement))
        self.assertTrue(all(e['scope']=='alteration' and not e['calculationRef'] for e in replacement))
        self.assertTrue(all(ABY[i]['category']=='roof' for e in replacement for i in e['sourceIds']))
        self.assertFalse(any('soffit' in ABY[i]['name'].lower() for i in DATA['retainedRoofIds']))
        self.assertGreater(DATA['roofOptions']['additionalReplacementRoofSurfaceM2'],90)
        self.assertLess(DATA['roofOptions']['additionalReplacementRoofSurfaceM2'],120)

    def test_replacement_rafters_stay_in_the_authored_roof_footprint(self):
        from shapely.ops import unary_union
        for e in BY.values():
            if e.get('condition')!='roof-rebuild' or e['category']!='rafters':continue
            poly=unary_union([footprint(ABY[i]['triangles']) for i in e['sourceIds']])
            axis=LineString([p[:2] for p in e['axis']])
            self.assertTrue(poly.buffer(.0001).covers(axis),e['id'])

    def test_joists_follow_actual_deck_not_its_bounding_rectangle(self):
        aperture=box(4.6,1.31,5.5,5.55).buffer(-.001)
        for e in BY.values():
            if e['category']!='joists':continue
            from shapely.ops import unary_union
            poly=unary_union([footprint(ABY[i].get('framingReferenceTriangles',ABY[i]['triangles'])) for i in e['sourceIds']])
            axis=LineString([p[:2] for p in e['axis']])
            self.assertTrue(poly.buffer(.00003).covers(axis),e['id'])
            if e['level']==3:self.assertFalse(axis.intersects(aperture),e['id'])
            self.assertAlmostEqual(e['bounds'][1][2],e['topZ'],places=4)
            self.assertAlmostEqual(e['bounds'][0][2],e['bottomZ'],places=4)
        self.assertGreater(len([e for e in BY.values() if e['category']=='joists']),100)

    def test_joist_direction_and_depth_are_local_and_conflicts_not_hidden(self):
        for e in BY.values():
            if e['category']!='joists' or not e['id'].startswith('M-J-'):continue
            a,b=e['axis']
            if e.get('cj01Joist'):
                self.assertAlmostEqual(a[0],b[0]);self.assertTrue(e['supplierSpanCheck']['withinTable'])
                self.assertAlmostEqual(e['topZ']-e['bottomZ'],.35 if e['id'].startswith('M-J-03')else .3)
            else:self.assertAlmostEqual(a[1],b[1])
            self.assertTrue(any(i.startswith('DEPTH-') for i in e['issueIds']))

    def test_each_hanger_belongs_to_one_end_and_matches_the_joist_underside(self):
        joists=[e for e in BY.values() if e['category']=='joists']
        hangers=[e for e in BY.values() if e['category']=='connections'and e.get('parentId')in {j['id']for j in joists}]
        self.assertEqual(len(hangers),sum(s['kind']=='receiver-reservation' for e in joists for s in e['endSupports']))
        for e in joists:
            for i in (1,2):
                if e['endSupports'][i-1]['kind']!='receiver-reservation':
                    self.assertNotIn(e['id']+f'-H{i}',BY);continue
                h=BY[e['id']+f'-H{i}'];self.assertEqual(h['parentId'],e['id'])
                self.assertEqual(h['receiverId'],e['endSupports'][i-1]['memberId'])
                self.assertAlmostEqual(h['bounds'][0][2],e['bottomZ']-.002,places=4)
                self.assertAlmostEqual(h['bounds'][1][2],e['topZ'],places=4)
                self.assertEqual(h['cost']['quantity'],1)
                self.assertIn('not a selected product',h['basis'].lower())

    def test_steel_is_a_profile_and_is_not_priced_twice_as_a_lintel(self):
        b=BY['M-B01'];s=b['steelProfile']
        self.assertAlmostEqual(b['bounds'][1][2]-b['bounds'][0][2],s['depthMm']/1000,places=4)
        self.assertAlmostEqual(b['cost']['quantity'],5.74*40.3,places=4)
        self.assertNotIn('M-L-482F42F',BY)
        # There is a web and two discrete flange ranges, not a solid envelope.
        self.assertGreater(len(set(round(p[2],4) for p in b['triangles'])),2)

    def test_rear_flat_roof_joists_do_not_span_the_whole_east_west_width(self):
        rear=[e for e in BY.values() if e['category']=='rafters' and ('Rear reference dormer' in e['name'] or 'Rear flat roof' in e['name'])]
        self.assertGreater(len(rear),20)
        for e in rear:
            a,b=e['axis'];self.assertAlmostEqual(a[0],b[0],places=4)
            self.assertLess(math.dist(a,b),5.4)

    def test_cavity_leaves_keep_outer_face_and_show_inward_encroachment(self):
        brick=BY['M-BRICK-8D5FD18'];block=BY['M-BLOCK-8D5FD18'];a=ABY['W-8D5FD18']
        self.assertAlmostEqual(brick['bounds'][0][1],a['bounds'][0][1])
        self.assertAlmostEqual(brick['bounds'][1][1]-brick['bounds'][0][1],.1025)
        self.assertAlmostEqual(block['bounds'][0][1]-brick['bounds'][1][1],.15)
        self.assertAlmostEqual(block['bounds'][1][1]-a['bounds'][1][1],.1225)
        self.assertGreater(brick['unitCount'],300)

    def test_existing_garage_option_does_not_replace_new_upper_floor(self):
        opt=[e for e in BY.values() if e['scope']=='garage-rebuild']
        self.assertGreater(len(opt),15)
        self.assertTrue(all(e['level'] in (-1,0) for e in opt))
        self.assertTrue(all(e['scope']=='new' for e in BY.values() if e['id'].startswith('M-J-04')))
        self.assertNotIn('M-RC-18C622F',BY) # washable finish is not concrete structure
        self.assertIn('M-RC-503FFED',BY)    # actual workshop floor body

    def test_solid_workshop_wall_uses_standard_bricks_in_both_orientations(self):
        walls=[e for e in BY.values() if e.get('leaf')=='solidbrick']
        self.assertGreater(len(walls),3)
        for e in walls:
            for unit in e['units']:
                self.assertEqual(sorted(unit[3:]),[.065,.1025,.215])

    def test_disjoint_finish_cuts_do_not_remove_structural_floor_or_joists(self):
        from shapely.geometry import Point
        from shapely.ops import unary_union
        gallery=footprint(ABY['F-4F2D55C']['triangles'])
        expected=box(5.585,-4.3,9.7,0)
        for notch in [box(5.585,-4.3,5.625,-4),box(5.585,-.33,5.8,0),
                      box(8.89,-.33,9.205,0),box(9.205,-.115,9.7,0)]:
            expected=expected.difference(notch)
        self.assertLess(gallery.symmetric_difference(expected).area,1e-7)
        self.assertAlmostEqual(gallery.area,17.450675,places=6)
        # The old full plate exists only to preserve reviewed receiver IDs.
        reference=footprint(ABY['F-4F2D55C']['framingReferenceTriangles'])
        self.assertLess(reference.symmetric_difference(box(5.5,-4.3,9.7,0)).area,1e-7)
        deck=footprint(BY['M-LAYER-INF-GALLERY-DECK']['triangles'])
        # WM01 shelves/bedding replace deck locally under the courtyard piers,
        # while the framing reference and full-length joists stay continuous.
        pier_support=unary_union([footprint(BY[k]['triangles'])for k in (
            'M-WM01-PIER-S-BRICK-BED','M-WM01-PIER-S-BLOCK-BED',
            'M-WM01-PIER-N-BRICK-BED','M-WM01-PIER-N-BLOCK-BED',
            'M-WM01-COURTYARD-RETURN-BED')])
        self.assertLess(gallery.difference(pier_support).symmetric_difference(deck).area,1e-7)
        for key in ('M-WM01-PIER-S-PLATE','M-WM01-PIER-N-PLATE'):
            self.assertLess((solid(BY['M-LAYER-INF-GALLERY-DECK']['triangles'])^solid(BY[key]['triangles'])).volume(),1e-8)
        self.assertTrue(gallery.covers(Point(8.8,-1.2)))
        wing=footprint(ABY['F-8A7A6AE']['triangles'])
        self.assertTrue(wing.covers(Point(12.5,-14)))
        self.assertLess(wing.intersection(box(5.17,-8.62,7.69,-5.52)).area,1e-8)
        spans=[e for e in BY.values() if e['id'].startswith('M-INF-GALLERY') and e['category']=='joists']
        self.assertGreater(len(spans),8)
        self.assertTrue(all(e['axis'][1][0]>9.6 for e in spans))
        self.assertGreater(len([e for e in BY.values() if e['id'].startswith('M-INF-HALL') and e['category']=='joists']),8)
        self.assertGreater(len([e for e in BY.values() if e['id'].startswith('M-J-02') and e['category']=='joists']),5)

    def test_gable_lower_piers_and_entrance_connection_are_not_furniture(self):
        for name in ['Principal gable wall | south pier','Principal gable wall | north pier','Principal gable wall | opening head','Proposal | West north oak band']:
            source=next(e for e in ABY.values() if e['name']==name)
            leaves=[e for e in BY.values() if source['id'] in e['sourceIds'] and e['category']=='masonry']
            self.assertEqual({e['leaf'] for e in leaves},{'brick','block'},name)
        self.assertIn('M-GABLE-FLOOR-BLOCK',BY)
        self.assertFalse(BY['M-GABLE-FLOOR-BLOCK']['design']['approvedForConstruction'])

    def test_loft_gallery_reaches_eaves_and_continuous_edge_beam(self):
        joist=next(e for e in BY.values() if e['category']=='joists' and e['id'].startswith('M-LOFT-GALLERY') and abs(e['axis'][0][1]+2)<.001)
        receiver=BY[joist['endSupports'][0]['memberId']]
        self.assertAlmostEqual(joist['axis'][0][0],receiver['axis'][0][0]+receiver['steelProfile']['widthMm']/2000+.005,places=4)
        edge=BY[joist['endSupports'][1]['memberId']]
        self.assertEqual(edge['id'],'M-FR-3-022')
        self.assertAlmostEqual(edge['bounds'][0][0]-joist['bounds'][1][0],.005,6)
        self.assertNotIn('cantilever',joist)
        self.assertIn(joist['id']+'-H2',BY)
        self.assertIn('eaves steel beam',receiver['name'])

    def test_receiver_contacts_do_not_assert_capacity_or_load_path_approval(self):
        self.assertEqual(DATA['supportAudit']['unmappedJoistEnds'],0)
        for e in BY.values():
            for s in e.get('endSupports',[]):
                self.assertFalse(s['verified'])
                if s['kind']=='receiver-reservation':self.assertTrue(BY[s['memberId']]['receiver'])
            if e.get('receiver'):
                self.assertEqual(len(e['endSupportCandidates']),2)
                self.assertTrue(all(not s['verified'] for s in e['endSupportCandidates']))
        loft=[e for e in BY.values() if e['category']=='joists' and e['id'].startswith('M-LOFT-WING')]
        for e in loft:
            self.assertEqual(len(e['endSupports']),2)
            self.assertTrue(all(s.get('memberId')in BY for s in e['endSupports']))
            self.assertFalse(e['design']['approvedForConstruction'])

    def test_primary_receivers_are_real_steel_profiles_with_steel_connections_flagged(self):
        spec=json.loads((ROOT/'proposal/specs/structural-floor-layout.json').read_text())
        expected={i for r in spec['primaryReceiverProposals'] for i in r['expectedMemberIds']}
        for r in spec['receiverRevisions']:
            expected-=set(r.get('merge',[]))
            if r['material']=='timber':expected.discard(r['id'])
        expected-=set(spec['networkCoordination']['retire'])
        actual={e['id'] for e in BY.values() if e.get('proposedBeamLine')}
        self.assertEqual(actual,expected)
        self.assertEqual(len(actual),9)  # 019 and035 are one continuous receiver.
        self.assertNotIn('M-FR-1-019',BY)
        merged=next(r for r in DATA['receiverRevisions']if r['id']=='M-FR-1-035')
        self.assertIn('M-FR-1-019',merged['current']['merge'])
        self.assertAlmostEqual(BY['M-FR-1-035']['axis'][0][1],-4.21)
        self.assertAlmostEqual(BY['M-FR-1-035']['axis'][1][1],.115)
        for ident in actual:
            e=BY[ident];s=e['steelProfile']
            self.assertEqual(e['material'],'steel');self.assertEqual(e['category'],'beams')
            self.assertEqual(e['cost']['rateKey'],'steel')
            self.assertAlmostEqual(e['cost']['quantity'],math.dist(*e['axis'])*s['kgPerM'],places=4)
            if e.get('loadRoute'):
                self.assertTrue(e['calculationRef'])
                self.assertFalse(e['loadRoute']['capacityVerified'])
            else:self.assertFalse(e['calculationRef'])
            self.assertFalse(e['design']['approvedForConstruction']);self.assertIn('PRIMARY-STEEL',e['issueIds'])
        hangers=[e for e in BY.values() if e.get('receiverId') in actual and e['category']=='connections']
        self.assertGreater(len(hangers),20)
        self.assertTrue(all(e['receiverMaterial']=='steel' and 'not a steel fixing detail' in e['connectionRequirement'] for e in hangers))

    def test_full_hip_floor_preserves_joist_identity_and_requires_intermediate_support(self):
        e=BY['M-LOFT-HOUSE-027']
        self.assertEqual(e['axis'],[[10.8,-.065,5.356],[10.8,8.655,5.356]])
        self.assertEqual(e['condition'],'loft-upgrade')
        self.assertEqual(e['intermediateSupports'],['W-3EF1AA0'])
        self.assertFalse(e['wallBearingSpanStudy']['capacityVerified'])
        self.assertEqual(e['existingWallBearings'][0]['wallHeadDeltaMm'],44.0)
        self.assertNotIn('M-HIP-FLOOR-BEARING-04',BY)
        west=[e for e in BY.values() if e['id'].startswith('M-LOFT-WEST-EXT') and e['category']=='joists']
        self.assertGreater(len(west),10)
        self.assertTrue(all(abs(e['axis'][0][1]-e['axis'][1][1])<.0001 for e in west))
        self.assertTrue(all(e['intermediateSupports']==[] for e in west))
        self.assertTrue(all({s['memberId'] for s in e['endSupports']}=={'M-FR-3-027','M-FR-3-031'} for e in west))

    def test_ground_floor_coverage_preserves_the_basement_stair_and_existing_house(self):
        floors=[e for e in BY.values() if e['category']=='joists' and e['level']==0]
        self.assertGreater(len(floors),20)  # Vehicle deck and entrance link are now concrete.
        slab=BY['M-G01-GARAGE-SLAB']
        self.assertTrue(all(e['bounds'][0][1]>slab['bounds'][1][1]for e in floors))
        self.assertEqual({e['id'].split('-')[2] for e in floors},{'WEST','EAST'})
        self.assertEqual({i for e in floors for i in e['sourceIds']},{'F-D08136B','F-BB00340'})
        self.assertEqual(BY['M-RC-GROUND-GALLERY']['sourceIds'],['F-07FF6EB'])
        self.assertTrue(all(e['bounds'][1][1]<=0 for e in floors))
        # Exact plate membership (including its stair aperture) is also checked
        # for every joist by test_joists_follow_actual_deck_not_its_bounding_rectangle.
        self.assertIn('GROUND-FLOOR',{i['id'] for i in DATA['issues']})

    def test_rear_upper_masonry_is_continuous_around_four_preserved_windows(self):
        from shapely.ops import unary_union
        sources=[e for e in ABY.values() if e['name'].startswith('Proposal | New wing east upper')]
        self.assertEqual(len(sources),12)
        leaves=[e for e in BY.values() if e['category']=='masonry' and set(e['sourceIds'])&{s['id'] for s in sources}]
        self.assertEqual(len(leaves),24)
        for leaf in ('brick','block'):
            poly=unary_union([section_projection(e,[1,2]) for e in leaves if e['leaf']==leaf])
            expected=box(-16.191,2.8,-3.4,5.35)
            lintels=unary_union([section_projection(e,[1,2]) for e in BY.values() if e['category']=='lintels' and set(e['sourceIds'])&{s['id'] for s in sources}])
            for y0,y1,z0 in [(-15.325,-13.875,3.65),(-12.87,-11.27,3.5),(-9.64,-7.84,3.55),(-5.04,-3.4,3.9)]:
                self.assertLess(box(y0,5.05,y1,5.23).difference(lintels).area,.0001)
                expected=expected.difference(box(y0,z0,y1,5.23))
            # The transfer's inner-leaf bearing pad and clearance pocket are
            # explicit openings; the outer brick skin remains uninterrupted.
            for wall in leaves:
                if wall['leaf']!=leaf:continue
                wall_profile=unary_union([section_projection(ABY[i],[1,2])for i in wall['sourceIds']])
                for passage in wall.get('beamPassages',[]):
                    lo,hi=passage['pocketBounds'];expected=expected.difference(box(lo[1],lo[2],hi[1],hi[2]).intersection(wall_profile))
                for seat in wall.get('bearingSeats',[]):
                    for key in ('padBounds','groutBounds','steelPocketBounds'):
                        lo,hi=seat[key];expected=expected.difference(box(lo[1],lo[2],hi[1],hi[2]).intersection(wall_profile))
            # The south return bonds into the corner. Away from its 352.5 mm
            # cavity-wall return, all four openings and the rear profile remain.
            self.assertLess(poly.symmetric_difference(expected).intersection(box(-15.831,2.8,-3.4,5.35)).area,.0001)

    def test_framing_roles_are_disjoint_and_nonbearing_walls_are_not_support_candidates(self):
        role_categories={'loadbearing-proposal':'studs','non-loadbearing':'partitions','unresolved':'framing-review'}
        spec=json.loads((ROOT/'proposal/specs/structural-wall-assemblies.json').read_text())
        for role,category in role_categories.items():
            group=[e for e in BY.values() if e['category']==category]
            self.assertGreater(len(group),100)
            self.assertTrue(all(e.get('framingRole')==role for e in group))
            self.assertTrue(all(e['cost']['rateKey']=='timber' for e in group))
        nonbearing={e['id'] for e in ABY.values() if spec['framingRoles'].get(e['name'])=='non-loadbearing'}
        for e in BY.values():
            for contact in e.get('endSupportCandidates',[]):
                self.assertFalse(nonbearing&set(contact['wallCandidates']))
        self.assertEqual(BY['M-TH-AE21020']['framingRole'],'loadbearing-proposal')
        self.assertTrue(any(e['category']=='fascia' and 'Rear reference dormer' in e['name'] for e in BY.values()))

    def test_upper_roof_skin_excludes_underside_and_tiny_triangle_slope_noise(self):
        triangles=[[0,0,2],[2,0,3],[2,2,3],[0,0,2],[2,2,3],[0,2,2],
                   [0,0,1.8],[2,2,2.8],[2,0,2.8],[0,0,1.8],[0,2,1.8],[2,2,2.8],
                   [2,0,3],[2.0001,0,3.00006],[2,2,3]]
        poly,plane=upper_roof_surface({'triangles':triangles})
        self.assertAlmostEqual(poly.area,4.0001)
        self.assertEqual(plane,(.5,0.,2.))

    def test_shared_roof_edges_merge_without_bridging_openings_or_options(self):
        def edge(ident,a,b,condition=None):
            return dict(id=ident,axis=[a,b],category='trimmers',scope='new',condition=condition,
                        roofEdgeRole='hip',sectionSizeM=[.09,.22],sourceIds=[ident],cost={'quantity':0},measurements={})
        es=[edge('A',[0,0,2],[4,4,4]),edge('B',[4,4,3.99],[1,1,2.49]),
            edge('C',[4.1,4.1,4.05],[5,5,4.5]),edge('D',[0,0,2],[4,4,4],'roof-rebuild'),
            edge('E',[0,0,1],[4,4,3])]
        audit=consolidate_roof_edges(es)
        self.assertEqual({e['id'] for e in es},{'A','C','D','E'})
        self.assertEqual(audit['mergedEdges'],[{'removed':'B','kept':'A'}])
        self.assertEqual(es[0]['sourceIds'],['A','B'])
        self.assertAlmostEqual(es[0]['cost']['quantity'],6*.09*.22,places=4)

    def test_generated_roof_edge_quantities_match_axes_and_shared_hips_are_not_doubled(self):
        edges=[e for e in BY.values() if e.get('roofEdgeRole')]
        self.assertGreater(len(DATA['roofEdgeAudit']['mergedEdges']),3)
        self.assertGreater(len(DATA['roofEdgeAudit']['ridgeReplacements']),10)
        for e in edges:
            self.assertAlmostEqual(e['cost']['quantity'],math.dist(*e['axis'])*math.prod(e['sectionSizeM']),places=4)
            a=LineString([p[:2] for p in e['axis']])
            for other in edges:
                if other['id']<=e['id'] or other.get('condition')!=e.get('condition'):continue
                b=LineString([p[:2] for p in other['axis']])
                overlap=a.intersection(b.buffer(.0001)).length
                if overlap<.1:continue
                z1=sum(p[2] for p in e['axis'])/2;z2=sum(p[2] for p in other['axis'])/2
                self.assertGreater(abs(z1-z2),.025,(e['id'],other['id']))

    def test_garage_roof_edge_is_first_floor_timber_not_loft_masonry(self):
        edges=[e for e in BY.values() if 'Garage gable north' in e['name'] and e['category'] in ('trimmers','fascia')]
        self.assertGreater(len(edges),2)
        self.assertTrue(all(e['level']==1 for e in edges))
        self.assertTrue(all(e['cost']['rateKey']=='timber' for e in edges))

if __name__=='__main__':unittest.main()
