"""West loft layout and front-wall continuity: geometry, not build approval."""
import json,math,unittest
from pathlib import Path
from scripts.structure.junctions import solid,cuboid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
JS=[e for e in D['elements'] if e['category']=='joists' and e['id'].startswith('M-LOFT-WEST-EXT-')]
FRONT=[e for e in D['elements'] if e['category']=='masonry' and e['name'].startswith('Aligned front windows')]
class WestLoftFrontTests(unittest.TestCase):
 def test_short_span_replaces_transfer_without_reusing_retired_joist_ids(self):
  self.assertNotIn('M-HIP-FLOOR-BEARING-01',BY)
  self.assertTrue(all(i not in BY for i in D['westLoftShortSpanStudy']['retiredJoistIds']))
  self.assertEqual(len(JS),25)
  for j in JS:
   self.assertNotIn('profileM',j);self.assertEqual(j['sectionSizeM'],[.089,.235]);self.assertEqual(j['spacingMm'],300)
   self.assertAlmostEqual(j['measurements']['lengthM'],4.6375)
   self.assertEqual(j['axis'][0][1],j['axis'][1][1]);self.assertFalse(j['intermediateSupportRequired'])
   self.assertEqual({s['memberId'] for s in j['endSupports']},{'M-FR-3-027','M-FR-3-031'})
   self.assertEqual(j['cost']['rateKey'],'timber');self.assertAlmostEqual(j['cost']['quantity'],4.6375*.089*.235,places=5)
  ys=sorted(j['axis'][0][1] for j in JS)
  self.assertLessEqual(max(b-a for a,b in zip(ys,ys[1:])),.300001)
  self.assertGreaterEqual(min(ys)-BY['M-FR-3-030']['bounds'][1][1],.0494)
  self.assertFalse(D['junctionReview']['connectionFit']['intersections']);self.assertFalse(D['junctionReview']['connectionFit']['seatLevelErrors'])
 def test_solid_timber_screen_recomputes_loads_reactions_and_final_deflection(self):
  b,h,L=89.,235.,4737.5;A=b*h;I=b*h**3/12
  for c in JS[0]['supportScreen']['cases']:
   g=c['floorGk']*.3+A/1e6*4.2;q=c['floorQk']*.3
   coefficient=5*L**4/(384*11000*I)+L**2/(8*(5/6)*690*A)
   final=(g*1.6+q*1.18)*coefficient
   self.assertAlmostEqual(c['finalDeflectionMm'],final,places=8)
   self.assertAlmostEqual(c['uls']['reactionKN'],(1.35*g+1.5*q)*L/1000/2,places=8)
   self.assertTrue(c['withinScreen']);self.assertFalse(c['approvedForConstruction'])
  self.assertIn('vibration',JS[0]['supportScreen']['limits'])
 def test_front_brick_block_band_and_glazing_apertures(self):
  self.assertEqual(len(FRONT),10)
  for e in FRONT:
   self.assertAlmostEqual(e['bounds'][0][2],2.6)
   self.assertLess(e['floorBandSupport']['unmatchedBaseAreaM2'],1e-7)
   for x1,x2 in [(-4.25,-3.05),(-2.13,-.93)]:
    self.assertLess((solid(e['triangles'])^cuboid([x1,.78,3.60001],[x2,1.14,5.04999])).volume(),1e-7)
  brick=BY['M-BRICK-BBA80C9'];block=BY['M-BLOCK-BBA80C9']
  self.assertAlmostEqual(brick['bounds'][0][0],-5.295)
  self.assertAlmostEqual(block['bounds'][0][0],-5.0425)
 def test_lintel_pockets_and_floor_timbers_do_not_cut_the_new_masonry(self):
  lintels=[BY[i] for i in ['M-L-B1E09EB','M-L-DB5F863']]
  walls=FRONT+[BY[i] for i in ['M-BRICK-F9476C7','M-BLOCK-F9476C7']]
  for head in lintels:
   self.assertAlmostEqual(head['bounds'][1][1]-head['bounds'][0][1],.3525)
   for wall in walls:self.assertLess((solid(head['triangles'])^solid(wall['triangles'])).volume(),1e-8)
  for wall in FRONT:
   for j in JS+[BY[i] for i in ['M-FR-3-026','M-FR-3-027','M-FR-3-030','M-FR-3-031']]:
    self.assertLess((solid(wall['triangles'])^solid(j['triangles'])).volume(),1e-8)
