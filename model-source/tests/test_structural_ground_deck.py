"""Physical load-route/clearance safeguards for the experimental vehicle deck."""
import json,unittest
from pathlib import Path
import numpy as np
from scripts.structure.junctions import solid,cuboid
from scripts.structure.vehicle_deck_study import strip_sensitivities
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'walkthrough/public/structure/members.json').read_text());B={e['id']:e for e in M['elements']}
CFG=json.loads((R/'proposal/specs/structural-floor-layout.json').read_text())['groundDeckStrategy']

class GroundDeckTests(unittest.TestCase):
 def test_ground_girder_stays_below_ground_floor_and_has_concrete_seats(self):
  e=B['M-FR-0-005'];self.assertAlmostEqual(e['bounds'][1][2],-.044,6)
  self.assertAlmostEqual(e['bounds'][0][2],-.4074,6)
  self.assertEqual(e['loadRoute']['endDestinations'],['M-G01-CINEMA-NORTH','M-RC-3D10A2B'])
  for tag in ('S','N'):
   grout=B['M-G01-MAIN-PAD-'+tag+'-GROUT'];self.assertAlmostEqual(grout['bounds'][1][2],e['bounds'][0][2],6)
   self.assertAlmostEqual(grout['bounds'][1][1]-grout['bounds'][0][1],.2,6)
   self.assertLess((solid(grout['triangles'])^solid(e['triangles'])).volume(),1e-9)
  self.assertTrue(all(c['withinScreen']for c in e['supportScreen']['cases']))
  self.assertFalse(e['design']['approvedForConstruction'])

 def test_stair_opening_has_no_floor_member_or_slab_intrusion(self):
  opening=cuboid([6.2,-9.785,-.5],[9.11,-8.845,0])
  targets=[e for e in B.values()if e['level']==0 and e['category']in('joists','beams','trimmers','rc')]
  for e in targets:
   a,b=e['bounds']
   if min(b[2],0)<=max(a[2],-.5):continue
   self.assertLess((opening^solid(e['triangles'])).volume(),1e-8,e['id'])
  self.assertEqual(M['supportAudit']['unmappedJoistEnds'],0)

 def test_removed_column_space_has_continuous_supported_members(self):
  c=json.loads((R/'proposal/specs/structural-finish-coordination.json').read_text())['columnEnclosure']
  casing=cuboid([c['x']-c['outsideM']/2,c['southY'],c['bottomZ']],
                [c['x']+c['outsideM']/2,c['y']+c['outsideM']/2,c['topZ']])
  self.assertNotIn('M-SW02-POST',B)
  self.assertTrue(any(e.get('cj01Joist') and (casing^solid(e['triangles'])).volume()>1e-6 for e in B.values()))
  joists=[e for e in B.values()if e['id'].startswith('M-GROUND-WEST-')and e['category']=='joists']
  for e in joists:
   self.assertEqual(len(e['endSupports']),2)
   self.assertTrue(all(s.get('memberId')in B for s in e['endSupports']))

 def test_bearing_walls_start_on_raft_and_not_on_floor_insulation(self):
  raft=B['M-RC-EEBF948'];top=raft['bounds'][1][2]
  for e in B.values():
   if not e.get('foundationBearingMasonry'):continue
   self.assertAlmostEqual(e['bounds'][0][2],top,6)
   for f in B.values():
    if f['id'].startswith('M-BASEMENT-FLOOR-'):
     self.assertLess((solid(e['triangles'])^solid(f['triangles'])).volume(),1e-8,(e['id'],f['id']))

 def test_rc_strip_cases_use_support_centres_and_remain_unapproved(self):
  s=strip_sensitivities(CFG);self.assertFalse(s['approvedForConstruction'])
  self.assertEqual(len(s['cases']),108)
  for c in s['cases']:
   self.assertAlmostEqual(c['spanM'],3.99125 if c['bay']=='west' else 4.70625,6)
   self.assertLess(abs(c['equilibriumResidualKN']),1e-8)
   self.assertGreater(c['requiredFlexuralAsMm2PerM'],0)
  # A smaller assumed distribution width must increase per-metre demand;
  # it is not silently treated as an established effective width.
  c=[r for r in s['cases']if r['case']=='upper'and r['bay']=='east'and r['thicknessMm']==250 and r['loadAction']=='wheel-or-jack']
  c.sort(key=lambda r:r['stripWidthM'])
  self.assertGreater(c[0]['requiredFlexuralAsMm2PerM'],c[-1]['requiredFlexuralAsMm2PerM'])

 def test_solid_joists_use_support_centres_and_separate_point_loads(self):
  joists=[e for e in B.values()if e['category']=='joists'and e['id'].startswith(('M-GROUND-WEST-','M-GROUND-EAST-'))]
  self.assertTrue(joists)
  self.assertAlmostEqual(max(e['engineeringSpanM']for e in joists),4.3825,5)
  for e in joists:
   self.assertNotIn('profileM',e)
   self.assertEqual(e['sectionSizeM'],[.045,.295])
   self.assertGreater(e['engineeringSpanM'],e['measurements']['lengthM'])
   self.assertAlmostEqual(e['bounds'][1][2],-.044,6)
   cases=e['supportScreen']['cases'];self.assertEqual(len(cases),6)
   self.assertTrue(all(c['withinScreen']for c in cases),e['id'])
   small=e['supportScreen']['sectionToleranceCases'];self.assertEqual(len(small),6)
   self.assertTrue(all(c['withinScreen']for c in small),e['id'])
   for c in cases:
    self.assertFalse(c['approvedForConstruction'])
    if c['loadAction']=='concentrated':
     self.assertEqual(c['loads']['variableUDL'],[])
     self.assertAlmostEqual(sum(p[1]for p in c['loads']['variablePoints']),2)
    else:self.assertEqual(c['loads']['variablePoints'],[])

 def test_stock_allocation_contains_every_joist_and_block_once(self):
  study=M['groundDeckStudy']['solidFloorStudy'];expected=study['joistIds']+study['blockingIds']
  scheduled=[]
  for board in study['stockAllocation']:
   self.assertGreaterEqual(board['remainingMm'],0)
   used=sum(p['roughCutMm']+p['kerfMm']for p in board['pieces'])
   self.assertEqual(used+board['remainingMm']+board['endTrimTotalMm'],board['stockLengthMm'])
   for part in board['pieces']:
    scheduled.append(part['memberId'])
    self.assertGreaterEqual(part['roughCutMm'],B[part['memberId']]['measurements']['lengthM']*1000+9.99)
  self.assertCountEqual(scheduled,expected);self.assertEqual(len(scheduled),len(set(scheduled)))
  self.assertFalse(study['fabricationReady']);self.assertFalse(study['approvedForConstruction'])

 def test_blocking_fits_between_its_joists_and_preserves_ceiling_clearance(self):
  study=M['groundDeckStudy']['solidFloorStudy'];self.assertTrue(study['blockingIds'])
  for ident in study['blockingIds']:
   block=B[ident];a,b=[B[x]for x in block['restrainedJoistIds']]
   self.assertAlmostEqual(block['bounds'][0][1]-a['bounds'][1][1],.001,6)
   self.assertAlmostEqual(b['bounds'][0][1]-block['bounds'][1][1],.001,6)
   self.assertAlmostEqual(block['bounds'][0][2],a['bounds'][0][2],6)
   self.assertAlmostEqual(block['bounds'][1][2],a['bounds'][1][2],6)
   for e in (a,b):self.assertLess((solid(block['triangles'])^solid(e['triangles'])).volume(),1e-9)

if __name__=='__main__':unittest.main()
