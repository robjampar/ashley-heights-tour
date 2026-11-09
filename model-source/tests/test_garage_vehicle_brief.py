import copy
import json
import unittest
from pathlib import Path
from scripts.structure.garage_vehicle_brief import vehicle_brief, apply_vehicle_brief, paired_axle_cases, statics_response
from scripts.structure.vehicle_deck_study import strip_sensitivities
from scripts.structure.garage_beam_block import demand_cases

ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
GROUND=BASE['groundDeckStudy']
CFG=json.loads((ROOT/'proposal/specs/garage-beam-block.json').read_text())
SPANS={'west':(5.22,9.3975),'east':(9.5125,13.69)}

class VehicleBriefTests(unittest.TestCase):
 def test_axle_statics_matches_independent_symmetric_solution(self):
  # Two 8 kN wheels at 1.2 / 3.0 m on a 4.2 m span, plus 2 kN/m.
  r=statics_response(4.2,2,[],[(1.2,8),(3.0,8)])
  self.assertAlmostEqual(r['momentKNm'],2*4.2**2/8+8*1.2)
  self.assertAlmostEqual(r['momentStationM'],2.1)
  for reaction in r['reactionsKN']:self.assertAlmostEqual(reaction,(2*4.2+16)/2)

 def test_laden_weights_and_two_vehicle_total_are_explicit(self):
  b=vehicle_brief();v=b['vehicles']
  self.assertEqual([r['maximumGrossMassKg'] for r in v],[3500,3100])
  self.assertAlmostEqual(b['combinedStaticWeightKN'],64.746)
  self.assertAlmostEqual(v[0]['movementHeavyAxleKN'],26.7813)
  self.assertAlmostEqual(v[0]['movementHeavyWheelKN'],16.06878)
  self.assertTrue(b['simultaneousParking'])
  self.assertFalse(b['approvedForConstruction'])

 def test_brief_is_idempotent_and_does_not_mutate_geometry(self):
  old=copy.deepcopy(GROUND);new=apply_vehicle_brief(GROUND)
  self.assertEqual(GROUND,old);self.assertEqual(new,apply_vehicle_brief(new))
  self.assertEqual(new['geometry'],old['geometry'])
  self.assertEqual(new['loads']['vehicleUDLKPa'],[5,5,5])
  self.assertEqual(new['loads']['singleWheelOrJackKN'],[20,25,30])

 def test_rc_and_precast_use_same_brief_without_double_counting(self):
  rc=strip_sensitivities(GROUND);pc=demand_cases(CFG,GROUND,SPANS)
  self.assertEqual(rc['vehicleBrief'],vehicle_brief())
  for row in rc['cases']:
   self.assertEqual(row['vehicleUDLKPa'],5 if row['loadAction']=='distributed' else None)
   if row['loadAction']=='distributed':self.assertIsNone(row['singleWheelOrJackKN'])
  for row in pc:
   self.assertEqual(row['vehicleUDLKPa'],5 if row['action']=='distributed' else None)
   if row['action']=='distributed':self.assertIsNone(row['localLoadKN'])

 def test_axle_envelopes_preserve_pair_loads_and_equilibrium(self):
  rows=paired_axle_cases(CFG,GROUND,SPANS);self.assertEqual(len(rows),20)
  for c in rows:
   for name in ('worstUlsMoment','worstSlsMoment','worstLeftReaction','worstRightReaction'):
    sample=c[name];points=sample['variablePointsKN']
    self.assertEqual(len(points),2)
    self.assertAlmostEqual(sum(p for _,p in points)*c['assumedSharingBeams'],c['axleBeforeSharingKN'])
    self.assertAlmostEqual(points[1][0]-points[0][0],sample['trackWidthM'])
    for result in (sample['sls'],sample['uls']):
     self.assertAlmostEqual(sum(result['reactionsKN']),result['totalLoadKN'])
     self.assertNotIn('deflectionMm',result)
   self.assertFalse(c['capacityVerified']);self.assertFalse(c['approvedForConstruction'])
  for bay in SPANS:
   for vehicle in ('van','tesla'):
    group=sorted([c for c in rows if c['bay']==bay and c['vehicleId']==vehicle],key=lambda c:c['assumedSharingBeams'])
    self.assertGreater(group[0]['worstUlsMoment']['uls']['momentKNm'],group[-1]['worstUlsMoment']['uls']['momentKNm'])

if __name__=='__main__':unittest.main()
