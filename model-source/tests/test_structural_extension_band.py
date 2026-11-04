"""The named garage pier must join the wall above without occupying the floor header."""
import json,unittest
from pathlib import Path
from scripts.structure.junctions import solid,cuboid
D=json.loads((Path(__file__).resolve().parents[1]/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in D['elements']}

class ExtensionFloorBandTests(unittest.TestCase):
 def test_brick_and_block_have_continuous_supported_floor_band(self):
  leaves=[e for e in BY.values() if e['name'].startswith('Side bedrooms west') and e.get('floorBandSupport')]
  self.assertEqual(len(leaves),14)
  self.assertTrue(any('M-BRICK-DDF9501' in e['floorBandSupport']['lowerWallIds'] for e in leaves))
  for e in leaves:
   self.assertEqual(e['floorBandSupport']['unmatchedBaseAreaM2'],0)
   self.assertAlmostEqual(e['bounds'][0][2],2.6)
   self.assertFalse(e['floorBandSupport']['capacityVerified'])
  for kind,x,depth in [('BRICK',-5.295,.1025),('BLOCK',-5.0425,.1)]:
   walls=[solid(e['triangles']) for e in leaves if e['id'].startswith('M-'+kind)]
   union=walls[0]
   for wall in walls[1:]:union=union+wall
   # Continuous 200 mm floor band through former pier/sill/window-head seams.
   check=cuboid([x,1.175,2.6],[x+depth,8.5,2.8])
   self.assertLess((check-union).volume(),1e-8)

 def test_room_side_header_and_linked_joists_clear_both_wall_leaves(self):
  r=BY['M-FR-1-023'];self.assertAlmostEqual(r['bounds'][0][0],-4.9425)
  members=[e for e in BY.values() if e['id'].startswith('M-J-04-') or e['id'] in ['M-FR-1-020','M-FR-1-021','M-FR-1-022','M-FR-1-023']]
  walls=[e for e in BY.values() if e['category']=='masonry' and e['bounds'][1][0]<-.1 and e['bounds'][0][2]<2.8 and e['bounds'][1][2]>2.45]
  for member in members:
   for wall in walls:
    if all(min(member['bounds'][1][k],wall['bounds'][1][k])>max(member['bounds'][0][k],wall['bounds'][0][k])+1e-7 for k in range(3)):
     self.assertLess((solid(member['triangles'])^solid(wall['triangles'])).volume(),1e-7,(member['id'],wall['id']))
  joists=[e for e in members if e['category']=='joists']
  self.assertEqual(len(joists),18)
  self.assertTrue(all(e['endSupports'][0]['memberId']==r['id'] for e in joists))
  self.assertTrue(all(e['bounds'][0][0]>r['bounds'][1][0] for e in joists))
