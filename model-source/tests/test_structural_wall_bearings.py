"""Geometry checks for wall continuity; no structural capacity is inferred."""
import json,unittest
from pathlib import Path
from scripts.structure.junctions import solid,cuboid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
class WallBearingTests(unittest.TestCase):
 def test_named_pier_continues_to_matching_lower_wall_without_floor_timber(self):
  e=BY['M-BLOCK-BDBECC2'];r=e['floorBandSupport']
  self.assertAlmostEqual(e['bounds'][0][2],2.6)
  self.assertEqual(r['unmatchedBaseAreaM2'],0)
  self.assertIn('M-BLOCK-DC23D41',r['lowerWallIds']);self.assertFalse(r['capacityVerified'])
  self.assertAlmostEqual(e['bounds'][1][0],13.7275)
  self.assertFalse(D['junctionReview']['masonryFloor']['timberIntersections'])
 def test_both_leaves_close_the_northeast_corner_and_preserve_window(self):
  for kind in ('BRICK','BLOCK'):
   north=solid(BY[f'M-{kind}-BDBECC2']['triangles']);east=solid(BY[f'M-{kind}-S-NE-UPPER-CORNER']['triangles'])
   self.assertLess((north^east).volume(),1e-7)
   union=north+east
   self.assertEqual(len(union.decompose()),1)
   self.assertLess((union^cuboid([13.6,-5.199,3.901],[14,-3.401,5.049])).volume(),1e-8)
 def test_east_ledger_is_room_side_of_masonry_and_joists_follow_it(self):
  r=BY['M-FR-1-014'];self.assertAlmostEqual(r['bounds'][1][0],13.6275)
  self.assertIn('Room-side ledger',r['basis'])
  js=[e for e in BY.values() if e['category']=='joists' and e['id'].startswith('M-J-03-')]
  self.assertGreater(len(js),5)
  self.assertTrue(all(e['bounds'][1][0]<r['bounds'][0][0] for e in js))
  for e in js:
   self.assertEqual(e['endSupports'][0]['memberId'],'M-CJ01-GROUND-HEAD')
   self.assertEqual(e['endSupports'][1]['memberId'],'M-FR-1-030'if e['axis'][0][0]<9.7 else'M-FR-1-013')
  self.assertFalse(D['junctionReview']['connectionFit']['intersections'])
 def test_all_reviewed_base_returns_align_and_the_cavity_stays_open(self):
  r=D['junctionReview']['masonryFloor'];self.assertEqual(len(r['continuations']),54)
  added={c['memberId']:c for c in r['continuations']if c['memberId']in('M-BRICK-34AD690','M-BLOCK-34AD690')}
  self.assertEqual(set(added),{'M-BRICK-34AD690','M-BLOCK-34AD690'})
  for ident,c in added.items():
   self.assertEqual((c['bottomZ'],c['topZ']),(2.6,2.8))
   self.assertTrue(c['lowerWallIds']);self.assertFalse(c['capacityVerified'])
   self.assertGreater(c['continuedAreaM2'],0)
  self.assertEqual(BY['M-BLOCK-34AD690']['beamTopBearing']['beamId'],'M-FR-1-030')
  self.assertAlmostEqual(BY['M-BLOCK-34AD690']['bounds'][0][2],BY['M-BED-GALLERY-CROSS-W']['bounds'][1][2])
  self.assertTrue(all(c['unmatchedBaseAreaM2']<1e-6 for c in r['continuations']))
  self.assertAlmostEqual(BY['M-BLOCK-36EE5E4']['bounds'][0][0],9.8375)
  cavity=cuboid([13.75,-3.27,2.65],[13.85,-3.15,3.3])
  for id in ['M-BLOCK-BDBECC2','M-BRICK-BDBECC2','M-BLOCK-S-NE-UPPER-CORNER','M-BRICK-S-NE-UPPER-CORNER']:
   self.assertLess((solid(BY[id]['triangles'])^cavity).volume(),1e-8)
