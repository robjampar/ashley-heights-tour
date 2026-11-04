"""Solid/void and junction regressions for the coordination model."""
import json
import math
import unittest
from pathlib import Path
from shapely.geometry import box
from scripts.structure.junctions import solid,triangles,cuboid,intersections,connection_fit
from scripts.structure.build_study import footprint

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in DATA['elements']}
REVIEW=DATA['junctionReview']

class JunctionTests(unittest.TestCase):
    def test_solid_roundtrip_preserves_enclosed_voids(self):
        shell=cuboid([0,0,0],[3,3,3])-cuboid([1,1,1],[2,2,2])
        restored=solid(triangles(shell))
        self.assertAlmostEqual(restored.volume(),26)
        self.assertLess((restored^cuboid([1.1,1.1,1.1],[1.9,1.9,1.9])).volume(),1e-10)

    def test_solid_audit_does_not_report_empty_space_between_steel_flanges(self):
        profile=cuboid([0,0,0],[4,.2,.02])+cuboid([0,0,.28],[4,.2,.3])+cuboid([0,.095,.02],[4,.105,.28])
        void_box=cuboid([1,.12,.05],[2,.18,.25])
        es=[{'id':'steel','category':'beams','steelProfile':{},'bounds':[[0,0,0],[4,.2,.3]],'triangles':triangles(profile)},
            {'id':'inside-web-pocket','category':'trimmers','bounds':[[1,.12,.05],[2,.18,.25]],'triangles':triangles(void_box)}]
        self.assertFalse(intersections(es)['intersections'])

    def test_each_cut_preserves_a_whole_section_end_and_option_scope(self):
        self.assertGreater(len(REVIEW['endCuts']),100)
        for c in REVIEW['endCuts']:
            child=BY[c['memberId']];support=BY[c['supportId']]
            self.assertFalse(c['fabricationReady'])
            self.assertNotEqual(child['category'],'joists')
            if support.get('condition'):self.assertEqual(support['condition'],child.get('condition'))
            # Every vertex stays on the kept side of the recorded end plane.
            self.assertGreaterEqual(min(sum(v*n for v,n in zip(p,c['planeNormal']))-c['planeOffsetM'] for p in child['triangles']),-2e-6)
            self.assertLess((solid(child['triangles'])^solid(support['triangles'])).volume(),1e-7)

    def test_joists_remain_square_and_hanger_assemblies_fit(self):
        audit=connection_fit(DATA['elements'])
        self.assertEqual(audit['assemblies'],sum(s['kind']=='receiver-reservation' for e in BY.values() if e['category']=='joists' for s in e['endSupports']))
        self.assertFalse(audit['intersections'])
        self.assertFalse(audit['seatLevelErrors'])
        self.assertEqual(audit,REVIEW['connectionFit'])
        for j in [e for e in BY.values() if e['category']=='joists']:
            self.assertFalse(j.get('endCutDetails'))
            b,d=j['sectionSizeM']
            if j.get('profileM'):
                web,flange=j['profileM'];area=b*flange*2+web*(d-2*flange)
            else:
                self.assertEqual(j['material'],'timber');area=b*d
            expected=math.dist(*j['axis'])*area
            self.assertAlmostEqual(solid(j['triangles']).volume(),expected,places=6)
        # LP03 hangs both joist ends from the continuous edge beam, removing
        # the former downstand/cantilever bearing.
        self.assertNotIn('M-EDGE-01',BY)
        self.assertNotIn('M-CANT-GALLERY-BEARING',BY)
        self.assertAlmostEqual(BY['M-FR-3-022']['bounds'][1][2],5.55-.044,places=5)

    def test_measured_remaining_clashes_are_reported_not_hidden(self):
        audit=intersections(DATA['elements'])
        self.assertEqual(audit,REVIEW['clashAudit'])
        self.assertFalse(audit['invalidSolids'])
        self.assertGreater(len(audit['intersections']),0)
        self.assertNotIn('beams / joists',audit['counts'])
        # Remaining cross-leaf cavity junctions stay flagged; same-leaf
        # bonded corners have no duplicated solid volume.
        for p in audit['intersections']:
            if p['categories']==['masonry','masonry']:
                self.assertNotEqual(BY[p['a']]['leaf'],BY[p['b']]['leaf'])

    def test_floor_layers_preserve_the_loft_stair_void_and_show_real_depth(self):
        aperture=box(4.6,1.31,5.5,5.55).buffer(-.001)
        layers=[e for e in BY.values() if e['category']=='layers']
        self.assertTrue({'M-G01-FLOOR-SCREED','M-BASEMENT-FLOOR-INSULATION','M-BASEMENT-BLINDING'}<={e['id']for e in layers})
        for e in layers:
            self.assertIsNone(e['cost'])
            if e['level']==3:self.assertLess(footprint(e['triangles']).intersection(aperture).area,1e-7)
            if 'LOFT-HOUSE' in e['id']:self.assertEqual(e['condition'],'loft-upgrade')
        deck=BY['M-LAYER-LOFT-GALLERY-DECK'];ceiling=BY['M-LAYER-LOFT-GALLERY-CEILING']
        self.assertAlmostEqual(deck['bounds'][0][2],5.506,places=5)
        self.assertAlmostEqual(ceiling['bounds'][0][2],5.1315,places=5)

    def test_exports_explicitly_exclude_fabrication_and_missing_layers(self):
        self.assertTrue(all(not r['fabricationReady'] for r in REVIEW['cutSchedule']))
        missing=' '.join(r['unresolved'] for r in REVIEW['layerSchedule']).lower()
        for term in ['reinforcement','waterproofing','fire','cavity trays','restraint','service']:
            self.assertIn(term,missing)
        self.assertIn('solid timber',REVIEW['assumptions']['materialPreference'])
        self.assertIn('I-joists',REVIEW['assumptions']['materialPreference'])

    def test_nonbearing_heads_move_with_their_studs_and_keep_clear_of_steel(self):
        # Generic beam conflicts and the explicit G01 slab-head correction
        # must both keep the complete plate/stud assembly intact.
        for r in REVIEW['partitionHeads']:
            head=BY[r['headId']];beam=BY[r['beamId']]
            self.assertAlmostEqual(beam['bounds'][0][2]-head['bounds'][1][2],.025,places=6)
            self.assertFalse(r['fabricationReady'])
            for ident in [r['headId'],*r['studIds']]:
                e=BY[ident];self.assertEqual(e['framingRole'],'non-loadbearing');self.assertEqual(e['category'],'partitions')
                self.assertLess((solid(e['triangles'])^solid(beam['triangles'])).volume(),1e-9)
                if ident!=r['headId']:
                    self.assertAlmostEqual(e['bounds'][1][2],head['bounds'][0][2],places=6)
                    self.assertGreater(math.dist(*e['axis']),.045)
                row=next(c for c in REVIEW['cutSchedule'] if c['id']==ident)
                self.assertEqual(row['headAdjustment'],r)
        group=[e for e in BY.values()if e.get('groundDeckCoordination')and e['category']=='partitions']
        self.assertTrue(group)
        head=max((e for e in group if e['id'].startswith('M-SP-')),key=lambda e:e['bounds'][1][2])
        self.assertAlmostEqual(head['bounds'][1][2],BY['M-G01-GARAGE-SLAB']['bounds'][0][2]-.025,6)
        for e in group:
            self.assertLess((solid(e['triangles'])^solid(BY['M-G01-GARAGE-SLAB']['triangles'])).volume(),1e-8)
            if e['id'].startswith('M-S-'):self.assertAlmostEqual(e['bounds'][1][2],head['bounds'][0][2],6)

if __name__=='__main__':unittest.main()
