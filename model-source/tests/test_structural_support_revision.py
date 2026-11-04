import json,unittest,math
from pathlib import Path
from scripts.structure.support_screen import point_screen
ROOT=Path(__file__).resolve().parents[1]
D=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text());BY={e['id']:e for e in D['elements']}
class RevisedReceiverTests(unittest.TestCase):
 def test_entrance_endpoints_have_explicit_receiving_candidates(self):
  e=BY['M-FR-1-026'];a,b=e['endSupportCandidates']
  self.assertIn('W-4D5245A',a['wallCandidates']);self.assertIn('M-FR-1-030',b['connectedReceivers'])
  self.assertGreater(e['measurements']['lengthM'],5.5)
  for id in ['M-FR-1-027','M-FR-1-033']:
   self.assertEqual(BY[id]['material'],'timber')
   self.assertTrue(any(s.get('memberId')==id for j in BY.values() for s in j.get('endSupports',[])))
   self.assertTrue(all(c['withinScreen']for c in BY[id]['supportScreen']['cases']))
 def test_loft_transfer_is_one_through_member_and_receives_the_girder(self):
  e=BY['M-FR-3-010'];self.assertAlmostEqual(math.dist(*e['axis']),8.545)
  self.assertNotIn('M-FR-3-011',BY);self.assertNotIn('M-FR-3-012',BY)
  main=BY['M-FR-3-009'];self.assertIn(e['id'],main['endSupportCandidates'][1]['connectedReceivers'])
  self.assertLess(main['bounds'][1][1],e['bounds'][0][1])
  self.assertTrue(all(s['wallCandidates'] for s in e['endSupportCandidates']))
 def test_cross_beams_have_drawn_bearings_and_remain_unapproved(self):
  self.assertNotIn('M-SW02-POST',BY);self.assertNotIn('M-LP02-NORTH',BY)
  for id in ['M-FR-3-001','M-FR-3-010','M-CJ01-GROUND-HEAD']:
   e=BY[id];self.assertTrue(all(c['withinScreen']for c in e['supportScreen']['cases']+e['supportScreen']['patternCases']))
   self.assertFalse(e['design']['approvedForConstruction']);self.assertEqual(e['calculationRef'],'CJ01 · linked floor gravity sensitivity')
   self.assertEqual(len(e['bearingSeats']),2)
   self.assertTrue(all(s['baseSupportedFraction']>.99999 for s in e['bearingSeats']))
  self.assertFalse(D['loftLoadpath']['approvedForConstruction'])
 def test_point_load_factors_reactions_and_deflection_are_consistent(self):
  s=BY['M-FR-3-010']['steelProfile'];r=point_screen(s,8,0,0,10,20)
  sw=s['kgPerM']*9.81/1000
  self.assertAlmostEqual(r['uls']['reactionKN'],(1.35*sw*8+1.35*10+1.5*20)/2)
  expected=20000*8000**3/(48*210000*s['ImajorCm4']*1e4)
  self.assertAlmostEqual(r['variableDeflectionMm'],expected)
 def test_no_changed_receiver_passes_through_joists_or_loses_hangers(self):
  audit=D['junctionReview'];self.assertEqual(audit['connectionFit']['intersections'],[])
  self.assertEqual(audit['connectionFit']['seatLevelErrors'],[])
  self.assertEqual(D['supportAudit']['unmappedJoistEnds'],0)
  self.assertFalse(any('joists' in c['categories'] for c in audit['clashAudit']['intersections']))
