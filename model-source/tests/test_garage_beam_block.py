"""Independent contacts, load conservation and option isolation for BB01."""
import json
import unittest
from pathlib import Path
from scripts.structure.junctions import solid, cuboid
from scripts.structure.garage_beam_block import build_alternative

ROOT=Path(__file__).resolve().parents[1]
BASE=json.loads((ROOT/'walkthrough/public/structure/members.json').read_text())
BY={e['id']:e for e in BASE['elements']}
STUDY=build_alternative(BASE)
ALT={e['id']:e for e in STUDY['elements']}

class BeamBlockTests(unittest.TestCase):
 def test_every_beam_has_two_complete_bearings_without_new_supports(self):
  beams=[e for e in ALT.values() if e['deckRole']=='beam']
  self.assertEqual(len(beams),32)
  self.assertEqual(len(STUDY['audit']['bearingSeats']),64)
  for seat in STUDY['audit']['bearingSeats']:
   self.assertAlmostEqual(seat['contactAreaM2'],seat['expectedAreaM2'],6)
   self.assertFalse(seat['capacityVerified'])
  for e in beams:
   self.assertAlmostEqual(e['nominalClearSpanM'],4.065,6)
   self.assertGreaterEqual(min(e['nominalBearingsMm']),100)
   self.assertTrue(all(i in BY for i in e['supportMemberIds']))

 def test_blocks_really_bear_on_two_flanges_and_cuts_are_not_slivers(self):
  for e in ALT.values():
   if e['deckRole']!='block':continue
   a,z=e['bounds'];self.assertGreaterEqual(z[0]-a[0],.2499)
   probe=cuboid([a[0],a[1],a[2]-.0001],[z[0],z[1],a[2]])
   for ident in e['supportMemberIds']:
    contact=(probe^solid(ALT[ident]['triangles'])).volume()/.0001
    self.assertAlmostEqual(contact,(z[0]-a[0])*.0175,6)

 def test_no_overlaps_no_extra_depth_and_continuous_top_surface(self):
  self.assertEqual(STUDY['audit']['internalIntersections'],[])
  self.assertLess(STUDY['audit']['outsideOriginalSlabM3'],1e-7)
  shapes=[solid(e['triangles']) for e in ALT.values()];whole=shapes[0]
  for shape in shapes[1:]:whole=whole+shape
  self.assertAlmostEqual(whole.volume(),sum(s.volume() for s in shapes),6)
  slice=cuboid([-99,-99,-.0751],[99,99,-.075])
  old_top=solid(BY['M-G01-GARAGE-SLAB']['triangles'])^slice
  self.assertLess((old_top-whole).volume(),1e-8)
  self.assertEqual(STUDY['quantities']['undersideZ'],-.325)
  self.assertAlmostEqual(STUDY['quantities']['basementCeilingZ'],-.4639)

 def test_upper_bearing_wall_keeps_its_concrete_strip(self):
  wall=solid(BY['M-BLOCK-4D5245A']['triangles'])
  bottom=(wall^cuboid([-99,-99,-.075],[99,99,-.0749])).translate([0,0,-.0001])
  edge=solid(ALT['M-BB01-EDGE-RC']['triangles'])
  self.assertGreater(bottom.volume(),0)
  self.assertLess((bottom-edge).volume(),1e-8)

 def test_no_zero_thickness_caps_hide_the_beams_in_the_renderer(self):
  from shapely.geometry import Polygon,box
  tri=ALT['M-BB01-EDGE-RC']['triangles']
  fields=box(5.2825,-15.695,9.3475,-10.355).union(box(9.5625,-15.695,13.6275,-10.355))
  for i in range(0,len(tri),3):
   t=tri[i:i+3]
   if all(abs(p[2]+.075)<1e-7 for p in t):
    self.assertLess(Polygon([p[:2] for p in t]).intersection(fields).area,1e-7)

 def test_vehicle_sensitivity_conserves_load_and_does_not_invent_sharing(self):
  rows=STUDY['demandCases'];self.assertEqual(len(rows),156)
  for c in rows:
   for r in (c['sls'],c['uls']):self.assertLess(abs(sum(r['reactionsKN'])-r['totalLoadKN']),1e-8)
   self.assertFalse(c['approvedForConstruction']);self.assertFalse(c['capacityVerified'])
   self.assertNotIn('deflectionMm',c['sls'])
  singles=[c for c in rows if c['assumedSharingBeams']==1]
  self.assertTrue(any(not c['belowLegacyBenchmarks'] for c in singles))
  self.assertEqual(STUDY['defaultOption'],'beam-block')
  self.assertTrue(STUDY['selection']['ownerSelectedSystem'])
  self.assertFalse(STUDY['selection']['detailedSizingAccepted'])
  self.assertFalse(STUDY['selection']['approvedForConstruction'])

 def test_quantities_and_buoyancy_change_once_only(self):
  q=STUDY['quantities'];self.assertEqual(q['blockCount'],300);self.assertEqual(q['cutBlockCount'],60)
  self.assertAlmostEqual(q['beamLengthM'],137.28,5)
  self.assertGreater(q['siteConcreteReductionPercent'],48)
  self.assertLess(q['alternativeWeightKN'],q['baselineWeightKN'])
  for before,after in zip(BASE['foundations']['cases'],STUDY['foundations']['cases']):
   self.assertAlmostEqual(after['completedIllustrativeBalanceKN']-before['completedIllustrativeBalanceKN'],q['weightDeltaKN'])
   self.assertEqual(after['emptyBoxBalanceKN'],before['emptyBoxBalanceKN'])
   self.assertLess(after['completedIllustrativeBalanceKN'],before['completedIllustrativeBalanceKN'])
  self.assertFalse(any(e['id'].startswith('M-BB01-') for e in BASE['elements']))

if __name__=='__main__':unittest.main()
