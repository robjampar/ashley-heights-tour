"""Regression checks for garage defaults and rear-extension coordination solids."""
import json
import unittest
from itertools import combinations
from pathlib import Path
from shapely.geometry import Polygon, box, Point
from shapely.ops import unary_union
from scripts.structure.build_study import footprint
from scripts.structure.build_members import upper_roof_surface
from scripts.structure.junctions import solid

ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in D['elements']}
A=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text())
ABY={e['id']:e for e in A['elements']}


class GardenGarageTests(unittest.TestCase):
    def test_garage_base_scheme_has_connected_foundations_to_both_wall_leaves(self):
        self.assertTrue(D['garageOption']['default'])
        feet=[BY[f'M-GF-{i}'] for i in (1,2,3)]
        stems=[BY[f'M-GS-{i}'] for i in (1,2,3)]
        base=unary_union([footprint(e['triangles']) for e in feet])
        head=unary_union([footprint(e['triangles']) for e in stems])
        self.assertEqual(base.geom_type,'Polygon');self.assertEqual(head.geom_type,'Polygon')
        self.assertLess(head.difference(base).area,1e-7)
        for e in feet:self.assertAlmostEqual(e['bounds'][0][2],-1.15);self.assertAlmostEqual(e['bounds'][1][2],-.85)
        for e in stems:self.assertAlmostEqual(e['bounds'][0][2],-.85);self.assertAlmostEqual(e['bounds'][1][2],0)
        walls=[e for e in BY.values() if e['category']=='masonry' and e['scope']=='garage-rebuild' and abs(e['bounds'][0][2])<1e-6]
        self.assertGreater(len(walls),10)
        for e in walls:self.assertLess(footprint(e['triangles']).difference(head).area,1e-7,e['id'])

    def test_slab_follows_chamfer_and_is_separate_from_stem_walls_and_pedestal(self):
        slab=BY['M-GARDEN-SLAB'];shape=solid(slab['triangles']);poly=footprint(slab['triangles'])
        nav=json.loads((ROOT/'outputs/output-proposed-compact/navigation.json').read_text())
        approved=Polygon(nav['rearGardenRoomChamfer']['floorPolygon'])
        self.assertLess(poly.difference(approved).area,1e-7)
        self.assertFalse(poly.covers(Point(3.9,14)))
        self.assertTrue(poly.covers(Point(3.5,12)))
        self.assertAlmostEqual(shape.volume(),slab['cost']['quantity'],places=5)
        self.assertAlmostEqual(shape.volume(),poly.area*.15,places=6)
        self.assertAlmostEqual(slab['bounds'][0][2],-.3)
        self.assertAlmostEqual(slab['bounds'][1][2],-.15)
        self.assertAlmostEqual(BY['M-GARDEN-LAYER-FINISH']['bounds'][1][2],0)
        for e in [BY['M-GARDEN-STEM'],*[BY[f'M-GS-{i}'] for i in (1,2,3)]]:
            self.assertLess((shape^solid(e['triangles'])).volume(),1e-8)
            self.assertGreaterEqual(poly.distance(footprint(e['triangles'])),.00999)

    def test_concrete_is_counted_once_and_posts_land_on_substructure(self):
        concrete=[e for e in BY.values() if e['id'] in D['gardenRoom']['garageFoundationIds'] or e['id'] in ('M-GARDEN-FOUNDATION','M-GARDEN-STEM','M-GARDEN-SLAB')]
        for e in concrete:self.assertAlmostEqual(solid(e['triangles']).volume(),e['cost']['quantity'],delta=5.1e-6)
        for a,b in combinations(concrete,2):self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-7,(a['id'],b['id']))
        stems=unary_union([footprint(e['triangles']) for e in concrete if e['bounds'][1][2]==0])
        beams=unary_union([footprint(e['triangles']) for e in BY.values() if e['id'].startswith('M-GARDEN-BEAM-')])
        for post in [e for e in BY.values() if e['id'].startswith('M-GARDEN-POST-')]:
            plan=footprint(post['triangles'])
            self.assertLess(plan.difference(stems).area,1e-7,post['id'])
            self.assertLess(plan.difference(beams).area,1e-7,post['id'])
            self.assertEqual(post['bounds'][0][2],0);self.assertEqual(post['bounds'][1][2],2.55)

    def test_wall_infill_and_rooflight_openings_are_real_and_no_local_solid_clashes(self):
        west=next(e for e in ABY.values() if e['name']=='Proposal | Garden west return')
        infill=next(e for e in ABY.values() if e['name']=='Proposal | Rear inset | former kitchen window masonry infill')
        related=[e for e in BY.values() if west['id'] in e['sourceIds']]
        leaves=[e for e in related if e['category']=='masonry']
        self.assertEqual({e['leaf'] for e in leaves},{'brick','block'})
        # Pads/grout now retain the same wall provenance but are separate
        # components, not extra masonry leaves or duplicate priced units.
        pads=[e for e in related if e['id']in('M-PAD-GARDEN-W-S','M-PAD-GARDEN-W-N')]
        self.assertEqual(len(pads),2)
        for pad in pads:
            self.assertEqual(pad['category'],'rc');self.assertFalse(pad['capacityVerified'])
            self.assertNotIn('leaf',pad)
            for leaf in leaves:self.assertLess((solid(pad['triangles'])^solid(leaf['triangles'])).volume(),1e-8)
        self.assertTrue(any(infill['id'] in e['sourceIds'] and e['category']=='masonry' for e in BY.values()))
        roof,_=upper_roof_surface(ABY[D['gardenRoom']['roofSourceId']])
        holes=unary_union([Polygon(r) for r in roof.interiors]);self.assertEqual(len(roof.interiors),3)
        frame=[e for e in BY.values() if e.get('structuralSystem')=='garden-terrace']
        for e in frame:
            self.assertLess(footprint(e['triangles']).intersection(holes).area,1e-7,e['id'])
            self.assertIsNone(e['calculationRef']);self.assertFalse(e['design']['approvedForConstruction'])
        for a,b in combinations(frame,2):
            if all(min(a['bounds'][1][i],b['bounds'][1][i])>max(a['bounds'][0][i],b['bounds'][0][i])+1e-6 for i in range(3)):
                self.assertLess((solid(a['triangles'])^solid(b['triangles'])).volume(),1e-7,(a['id'],b['id']))
        for e in frame:
            for s in e.get('gardenEndSupports',[]):
                self.assertIn(s['memberId'],BY);self.assertLess(s['gapM'],.04)
        self.assertFalse(set(D['gardenRoom']['retiredRoofMemberIds'])&set(BY))

    def test_terrace_roof_depth_and_foundation_uncertainties_are_not_hidden(self):
        for id in ('GARDEN-FRAME','GARDEN-FOUNDATIONS'):
            issue=next(i for i in D['issues'] if i['id']==id)
            self.assertEqual(issue['severity'],'unresolved')
        self.assertFalse(D['gardenRoom']['capacityVerified'])
        self.assertIn('225 mm',next(i for i in D['issues'] if i['id']=='GARDEN-FRAME')['detail'])


if __name__=='__main__':unittest.main()
