"""Geometric support intent and junction checks, never capacity approval."""
import json,unittest
from pathlib import Path
from scripts.structure.junctions import solid
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
A=json.loads((ROOT/'walkthrough/public/structure/model.json').read_text());WALLS={e['id']:e for e in A['elements']}
class ExistingBearingTests(unittest.TestCase):
 def test_original_house_reuses_retained_wall_candidates_without_invented_hip_steels(self):
  for i in range(2,5):self.assertNotIn(f'M-HIP-FLOOR-BEARING-{i:02d}',BY)
  self.assertNotIn('M-HIP-FLOOR-BEARING-01',BY)
  joists=[e for e in BY.values() if e.get('condition')=='loft-upgrade' and e['category']=='joists']
  self.assertTrue(all('wallBearingSpanStudy' in e for e in joists))
  self.assertTrue(any(not e['existingWallBearings'] for e in joists))
  for e in joists:
   self.assertFalse(e['wallBearingSpanStudy']['capacityVerified'])
   for c in e['existingWallBearings']:
    self.assertIn(c['wallId'],D['retainedIds']);self.assertEqual(WALLS[c['wallId']]['category'],'walls')
    self.assertFalse(c['capacityVerified']);self.assertGreaterEqual(c['bearingRunM'],.09)
 def test_named_long_joist_uses_actual_offset_wall_and_exposes_seat_mismatch(self):
  e=BY['M-LOFT-HOUSE-027'];c=e['existingWallBearings'][0]
  self.assertEqual(c['wallId'],'W-3EF1AA0');self.assertEqual(c['wallHeadDeltaMm'],44)
  self.assertAlmostEqual(c['bearingRunM'],.16)
  self.assertEqual(e['wallBearingSpanStudy']['clearRunsM'],[3.82,4.74])
 def test_gallery_notch_is_closed_without_the_old_cantilever_return(self):
  from shapely.geometry import box
  from scripts.structure.build_study import footprint
  self.assertNotIn('M-FR-3-023',BY);self.assertNotIn('M-FR-3-024',BY)
  self.assertNotIn('GALLERY-RETURN',[i['id'] for i in D['issues']])
  deck=footprint(BY['M-LAYER-LOFT-GALLERY-DECK']['triangles'])
  self.assertLess(box(5.615,-5.3,7.35,-4.3).difference(deck).area,1e-7)
  self.assertLess(deck.intersection(box(5.2325,-8.63,7.35,-5.301)).area,1e-7)
  receiver=BY['M-FR-3-025'];transfer=BY['M-FR-3-010']
  self.assertIn(transfer['id'],[c['supportId'] for c in receiver['endCutDetails']])
  self.assertLess((solid(receiver['triangles'])^solid(transfer['triangles'])).volume(),1e-7)
 def test_extended_gallery_joists_and_hangers_reach_the_eaves_receiver(self):
  r=BY['M-FR-3-025'];js=[e for e in BY.values() if e['category']=='joists' and e['id'].startswith('M-LOFT-GALLERY') and e['axis'][0][1]<-4.3]
  self.assertEqual(len(js),3)
  self.assertTrue(all(e['endSupports'][0]['memberId']==r['id'] for e in js))
  self.assertTrue(all(abs(e['bounds'][0][0]-r['bounds'][1][0]-.005)<1e-6 for e in js))
  east=BY['M-FR-3-022']
  self.assertTrue(all(e['endSupports'][1]['memberId']==east['id']for e in js))
  self.assertTrue(all(abs(east['bounds'][0][0]-e['bounds'][1][0]-.005)<1e-6 for e in js))
  self.assertFalse(D['junctionReview']['connectionFit']['intersections'])
  self.assertFalse(D['junctionReview']['connectionFit']['seatLevelErrors'])
  self.assertEqual(D['supportAudit']['unmappedJoistEnds'],0)
